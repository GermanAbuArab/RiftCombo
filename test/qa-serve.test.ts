// The server behind the "Signed-in QA" procedure in docs/rules-notes/method.md (#533). It hands a
// credential to a page, so what it refuses matters more than what it serves.
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs: it runs under node, which cannot import TypeScript.
import { createQaServer, isBuiltFor, isThrowaway, publicFile, qaHeaders, SIGN_IN_PAGE, SIGN_IN_SCRIPT, urlsOfBranch } from "../scripts/qa-serve.mjs";

const CHILD = ["https://child.neonauth.example.neon.tech", "https://child.apirest.example.neon.tech"];
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));

describe("isThrowaway", () => {
  it("accepts only a branch that says it is not the default", () => {
    expect(isThrowaway({ branch: { default: false } })).toBe(true);
    expect(isThrowaway({ default: false })).toBe(true);
    expect(isThrowaway({ branch: { default: true } })).toBe(false);
    // A negative check must not pass on a broken answer: no field is not "not default".
    expect(isThrowaway({ branch: {} })).toBe(false);
    expect(isThrowaway({})).toBe(false);
  });
});

describe("urlsOfBranch", () => {
  const given = { authUrl: `${CHILD[0]}/neondb/auth`, dataUrl: `${CHILD[1]}/neondb/rest/v1` };
  const auth = { base_url: `${CHILD[0]}/neondb/auth/` };
  const data = { url: `${CHILD[1]}/neondb/rest/v1` };

  it("accepts only the URLs Neon names for the branch that was checked", () => {
    expect(urlsOfBranch(given, auth, data)).toBe(true);
    // A child's id with production's URL passes the branch check alone, and would send the credential there.
    expect(urlsOfBranch({ ...given, authUrl: "https://main.neonauth.example.neon.tech/neondb/auth" }, auth, data)).toBe(false);
    expect(urlsOfBranch({ ...given, dataUrl: "https://main.apirest.example.neon.tech/neondb/rest/v1" }, auth, data)).toBe(false);
    expect(urlsOfBranch(given, {}, data)).toBe(false);
    expect(urlsOfBranch(given, auth, {})).toBe(false);
  });
});

describe("isBuiltFor", () => {
  const urls = { authUrl: `${CHILD[0]}/neondb/auth`, dataUrl: `${CHILD[1]}/neondb/rest/v1` };

  it("wants both of the branch's URLs in the bundle, not just the auth one", () => {
    expect(isBuiltFor(`"${urls.authUrl}","${urls.dataUrl}"`, urls)).toBe(true);
    expect(isBuiltFor(`"${urls.authUrl}","https://main.apirest.example.neon.tech/neondb/rest/v1"`, urls)).toBe(false);
    expect(isBuiltFor(`"https://main.neonauth.example.neon.tech/neondb/auth","${urls.dataUrl}"`, urls)).toBe(false);
  });
});

describe("qaHeaders", () => {
  const headers = qaHeaders(vercel, CHILD);

  it("keeps production's policy and swaps only the Neon origins", () => {
    const csp = headers["Content-Security-Policy"]!;
    expect(csp).toContain(`connect-src 'self' ${CHILD.join(" ")}`);
    expect(csp).not.toContain("ep-shiny-feather");
    expect(csp).toContain("script-src 'self'");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
  });

  it("drops HSTS, which means nothing on plain http", () => {
    expect(headers["Strict-Transport-Security"]).toBeUndefined();
  });
});

describe("publicFile", () => {
  const root = mkdtempSync(join(tmpdir(), "qa-public-"));
  writeFileSync(join(root, "index.html"), "home");
  writeFileSync(join(root, "combos.html"), "combos");
  writeFileSync(join(root, "app.js"), "js");

  it("resolves the root, a file and a clean URL", () => {
    expect(publicFile(root, "/")).toBe(join(root, "index.html"));
    expect(publicFile(root, "/app.js")).toBe(join(root, "app.js"));
    expect(publicFile(root, "/combos")).toBe(join(root, "combos.html"));
  });

  it("refuses to leave the directory and answers null for a missing file", () => {
    expect(publicFile(root, "/../package.json")).toBeNull();
    expect(publicFile(root, "/%2e%2e/package.json")).toBeNull();
    expect(publicFile(root, "/%zz")).toBeNull();
    expect(publicFile(root, "/nothing")).toBeNull();
  });
});

describe("createQaServer", () => {
  // What a browser sends for the page's own module script, and for the page opened from no other page.
  const OWN_SCRIPT = { "Sec-Fetch-Site": "same-origin", "Sec-Fetch-Mode": "cors", "Sec-Fetch-Dest": "script" };
  const OPENED = { "Sec-Fetch-Site": "none", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Dest": "document" };
  let close = () => {};
  afterEach(() => close());

  async function start() {
    const root = mkdtempSync(join(tmpdir(), "qa-serve-"));
    writeFileSync(join(root, "index.html"), "home");
    const server = createQaServer({
      root, headers: { "X-Frame-Options": "DENY" }, authUrl: `${CHILD[0]}/neondb/auth`, email: "e", password: "p-value",
    });
    await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
    close = () => server.close();
    return `http://localhost:${(server.address() as AddressInfo).port}`;
  }

  it("serves the site with the headers it was given", async () => {
    const res = await fetch(`${await start()}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-frame-options")).toBe("DENY");
  });

  it("hands the credential out once, then never again", async () => {
    const base = await start();
    const first = await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT });
    expect(first.status).toBe(200);
    expect(await first.text()).toContain("p-value");
    const second = await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT });
    expect(second.status).toBe(410);
    expect(await second.text()).not.toContain("p-value");
  });

  it("refuses any other page before the credential is spent", async () => {
    const base = await start();
    const others = [
      { ...OWN_SCRIPT, "Sec-Fetch-Site": "cross-site" },
      { ...OWN_SCRIPT, "Sec-Fetch-Site": "same-site" },
      { ...OWN_SCRIPT, "Sec-Fetch-Dest": "empty" },
      { ...OWN_SCRIPT, "Sec-Fetch-Mode": "no-cors" },
      { "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Mode": "navigate", "Sec-Fetch-Dest": "document" },
      {},
    ];
    // Not fetch: it writes its own Sec-Fetch-Mode over the one asked for.
    const { request } = await import("node:http");
    const answer = (headers: Record<string, string>) => new Promise<[number | undefined, string]>((done, fail) => {
      request(`${base}${SIGN_IN_SCRIPT}`, { headers }, async (res) => {
        let body = "";
        for await (const chunk of res) body += chunk;
        done([res.statusCode, body]);
      }).on("error", fail).end();
    });
    for (const headers of others) {
      const [status, body] = await answer(headers);
      expect(status).toBe(403);
      expect(body).not.toContain("p-value");
    }
    expect((await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT })).status).toBe(200);
  });

  it("spends the credential only on a GET", async () => {
    const base = await start();
    expect((await fetch(`${base}${SIGN_IN_SCRIPT}`, { method: "HEAD", headers: OWN_SCRIPT })).status).toBe(403);
    expect((await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT })).status).toBe(200);
  });

  it("runs the sign-in only when the page was opened directly, never from another page", async () => {
    const base = await start();
    expect((await fetch(`${base}${SIGN_IN_PAGE}`, { headers: OPENED })).status).toBe(200);
    expect((await fetch(`${base}${SIGN_IN_PAGE}`, { headers: { ...OPENED, "Sec-Fetch-Site": "cross-site" } })).status).toBe(403);
    expect((await fetch(`${base}${SIGN_IN_PAGE}`)).status).toBe(403);
  });

  it("says what a page stuck on its first line means, and reports a failed request", async () => {
    const base = await start();
    expect(await (await fetch(`${base}${SIGN_IN_PAGE}`, { headers: OPENED })).text()).toContain("restart qa-serve");
    const script = await (await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT })).text();
    expect(script).toContain("catch");
    expect(script).toContain("Sign-in failed: no answer from the auth host");
  });

  it("answers a request target that is not a path, and stays up", async () => {
    const base = await start();
    const { request } = await import("node:http");
    const statusOf = (path: string) => new Promise<number | undefined>((done, fail) => {
      request(base, { path }, (res) => {
        res.resume();
        done(res.statusCode);
      }).on("error", fail).end();
    });
    for (const path of ["http://[::1", "*"]) expect(await statusOf(path)).toBe(400);
    for (const path of ["//", "///", "//a:99999", "//?x"]) expect(await statusOf(path)).toBeLessThan(500);
    expect((await fetch(`${base}/`)).status).toBe(200);
  });

  it("refuses a Host that is not this server, so a rebound name cannot read the credential", async () => {
    const base = await start();
    const { request } = await import("node:http");
    const status = await new Promise<number | undefined>((done) => {
      request(`${base}${SIGN_IN_SCRIPT}`, { headers: { Host: "evil.example" } }, (res) => {
        res.resume();
        done(res.statusCode);
      }).end();
    });
    expect(status).toBe(403);
    expect(await (await fetch(`${base}${SIGN_IN_SCRIPT}`, { headers: OWN_SCRIPT })).text()).toContain("p-value");
  });

  it("answers only GET", async () => {
    const res = await fetch(`${await start()}/`, { method: "POST" });
    expect(res.status).toBe(405);
  });
});

describe("the QA sign-in stays out of the product", () => {
  it("is named nowhere in web/", () => {
    const files = readdirSync("web", { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile());
    expect(files.some((entry) => entry.parentPath !== "web")).toBe(true);
    for (const entry of files) expect(readFileSync(join(entry.parentPath, entry.name), "latin1")).not.toContain("__qa");
  });
});
