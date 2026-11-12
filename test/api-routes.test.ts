// Checks 1 and 2 of #585, the suite checks the security scan's auth and access-control roles run
// (personal-claude-issues#808), modelled on peak-panel#351. Everything here is in process: `fetch`
// is replaced by a function that records the URL and throws a marker, so a request to any server is
// both impossible and visible.
//
// 1. Every deployable function under `api/` is in the table in `scripts/api-routes.mjs`. A `token`
//    route refuses every exported method with no, a wrong and an empty credential before any
//    upstream fetch; the `public` route `api/deck-url.ts` refuses a foreign host, a foreign redirect
//    and an oversized body at or before the upstream fetch.
// 2. `scripts/check-functions.mjs`, which `npm run build:web` runs last, fails when the set Vercel
//    would deploy differs from the table, and prints both lists.
import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error plain .mjs shared with scripts/check-functions.mjs.
import { ROUTES, compareWithTable, deployableFunctions } from "../scripts/api-routes.mjs";
// @ts-expect-error same.
import { checkFunctions } from "../scripts/check-functions.mjs";
import { MAX_UPSTREAM_BYTES } from "../api/_deck-url-guards.js";
import { guarded, open } from "./fixtures/token-routes.js";

type Route = { kind: "public"; reason: string } | { kind: "token"; env: string };
type Handler = (request: Request) => Promise<Response> | Response;

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const table = ROUTES as Record<string, Route>;
const UPSTREAM = "upstream fetch reached (test #585)";
const METHODS = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] as const;

let fetched: string[] = [];
/** The default stub: every request is recorded and refused with the marker. */
const refuseAll = async (input: unknown): Promise<Response> => {
  fetched.push(String(input));
  throw new Error(`${UPSTREAM}: ${String(input)}`);
};
beforeEach(() => {
  fetched = [];
  vi.stubGlobal("fetch", vi.fn(refuseAll));
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

/** Every method a route module answers: its named exports, and a default export for each method. */
function methodsOf(mod: Record<string, unknown>): { method: string; handler: Handler }[] {
  const out: { method: string; handler: Handler }[] = [];
  for (const m of METHODS) if (typeof mod[m] === "function") out.push({ method: m, handler: mod[m] as Handler });
  if (typeof mod["default"] === "function") for (const m of METHODS) out.push({ method: m, handler: mod["default"] as Handler });
  return out;
}

/**
 * What a token route does wrong, one line per method and credential; empty when it refuses all of
 * them with 401 or 403 and fetches nothing. The env var holds a known value for the "none" and
 * "wrong" cases, and is EMPTY for the last one, where the caller presents an empty bearer.
 */
async function tokenFailures(mod: Record<string, unknown>, env: string): Promise<string[]> {
  const failures: string[] = [];
  const cases = [
    { name: "no Authorization", value: "t585-expected", header: null },
    { name: "a wrong Authorization", value: "t585-expected", header: "Bearer t585-wrong" },
    { name: "an empty credential", value: "", header: "Bearer " },
  ];
  const methods = methodsOf(mod);
  if (!methods.length) failures.push("exports no handler");
  for (const { method, handler } of methods) {
    for (const c of cases) {
      vi.stubEnv(env, c.value);
      fetched = [];
      const headers = new Headers();
      if (c.header !== null) headers.set("authorization", c.header);
      const body = method === "GET" || method === "HEAD" ? undefined : "{}";
      let status: number | string;
      try { status = (await handler(new Request("https://riftcombo.app/api/route", { method, headers, body }))).status; }
      catch (err) { status = (err as Error).message; }
      if (fetched.length) failures.push(`${method} with ${c.name} fetched ${fetched.join(", ")} before refusing`);
      else if (status !== 401 && status !== 403) failures.push(`${method} with ${c.name} answered ${status}, not 401 or 403`);
    }
  }
  return failures;
}

describe("check 1: every route is classified (#585)", () => {
  const found: string[] = deployableFunctions(root);

  it("finds the routes by reading the tree, and finds at least the deck import", () => {
    expect(found).toContain("api/deck-url.ts");
    // The guards file is a module, not a route: the underscore keeps it from deploying.
    expect(found).not.toContain("api/_deck-url-guards.ts");
  });

  it.each(found)("%s is in the table", (path) => {
    expect(table[path], `classify this route: ${path} is deployed and is not in scripts/api-routes.mjs`).toBeDefined();
  });

  it("names a reason for every public route and an env var for every token route", () => {
    for (const [path, r] of Object.entries(table)) {
      if (r.kind === "public") expect(r.reason.length, `${path} needs a one-line reason`).toBeGreaterThan(20);
      else expect(r.env, `${path} needs the env var that guards it`).toMatch(/^[A-Z][A-Z0-9_]+$/);
    }
  });

  const tokenRoutes = Object.entries(table).filter(([, r]) => r.kind === "token") as [string, { kind: "token"; env: string }][];
  if (!tokenRoutes.length) it("deploys no token route today, so the harness control below is what runs", () => expect(tokenRoutes).toEqual([]));
  for (const [path, r] of tokenRoutes) {
    it(`token route ${path} refuses with no, a wrong and an empty credential before any upstream fetch`, async () => {
      const mod = await import(join(root, path)) as Record<string, unknown>;
      const failures = await tokenFailures(mod, r.env);
      expect(failures, `${path}: ${failures.join("; ")}`).toEqual([]);
    });
  }

  it("the token harness is not vacuous: it passes a guarded route and names an open one", async () => {
    expect(await tokenFailures(guarded, "FIXTURE_TOKEN")).toEqual([]);
    const failures = await tokenFailures(open, "FIXTURE_TOKEN");
    expect(failures).toContain("GET with no Authorization answered 200, not 401 or 403");
    expect(failures).toHaveLength(3);
  });
});

describe("check 1: api/deck-url.ts, classified public, holds its guards in process (#585)", () => {
  const call = async (target: string, method = "GET") => {
    const { default: handler } = await import("../api/deck-url.js");
    return handler(new Request(`https://riftcombo.app/api/deck-url?url=${encodeURIComponent(target)}`, { method }));
  };

  it("is classified public", () => {
    expect(table["api/deck-url.ts"]?.kind).toBe("public");
  });

  it("refuses a foreign host before any upstream fetch", async () => {
    for (const target of ["https://evil.example/decks/view/abc", "https://piltoverarchive.com:31337/decks/view/abc", "http://piltoverarchive.com/decks/view/abc", "https://piltoverarchive.com/admin"]) {
      const res = await call(target);
      expect(res.status, target).toBe(400);
    }
    expect(fetched).toEqual([]);
  });

  it("refuses every method but GET before any upstream fetch", async () => {
    for (const method of ["POST", "PUT", "DELETE"]) expect((await call("https://piltoverarchive.com/decks/view/abc", method)).status).toBe(405);
    expect(fetched).toEqual([]);
  });

  /** Piltover answers every deck page with a 302 to `location`, and the hop it is sent to with 200. */
  const redirectingTo = (location: string) => {
    const redirectModes: unknown[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: unknown, init?: RequestInit) => {
      fetched.push(String(input));
      redirectModes.push(init?.redirect);
      if (String(input) === "https://piltoverarchive.com/decks/view/abc") return new Response(null, { status: 302, headers: { location } });
      if (String(input).startsWith("https://piltoverarchive.com/")) return new Response("ok", { status: 200 });
      throw new Error(`${UPSTREAM}: ${String(input)}`);
    }));
    return redirectModes;
  };

  it("refuses a redirect off the allowlist without requesting it", async () => {
    const modes = redirectingTo("https://evil.example/steal");
    const res = await call("https://piltoverarchive.com/decks/view/abc");
    expect(res.status).toBe(502);
    expect(fetched).toEqual(["https://piltoverarchive.com/decks/view/abc"]);
    // The platform must not follow it on its own, or the hop would never be checked.
    expect(modes).toEqual(["manual"]);
  });

  it("is not vacuous: the same stub follows a redirect that stays on the allowlist", async () => {
    const modes = redirectingTo("/decks/view/def");
    await call("https://piltoverarchive.com/decks/view/abc");
    // The second request is the evidence; the stub's "ok" page holds no deck, so the status is not.
    expect(fetched).toEqual(["https://piltoverarchive.com/decks/view/abc", "https://piltoverarchive.com/decks/view/def"]);
    expect(modes).toEqual(["manual", "manual"]);
  });

  it("refuses an oversized body at the upstream read, and stops reading it", async () => {
    let pulled = 0, cancelled = false;
    const chunk = new Uint8Array(1024 * 1024);
    vi.stubGlobal("fetch", vi.fn(async (input: unknown) => {
      fetched.push(String(input));
      return new Response(new ReadableStream<Uint8Array>({
        pull(ctrl) { pulled++; ctrl.enqueue(chunk); },
        cancel() { cancelled = true; },
      }), { status: 200 });
    }));
    const res = await call("https://piltoverarchive.com/decks/view/abc");
    expect(res.status).toBe(502);
    expect(((await res.json()) as { error: string }).error).toMatch(/too large/);
    expect(cancelled).toBe(true);
    expect(pulled).toBeLessThanOrEqual(MAX_UPSTREAM_BYTES / chunk.byteLength + 2);
  });
});

describe("check 2: the build exposes no function outside the table (#585)", () => {
  const fixture = (files: Record<string, string>) => {
    const dir = mkdtempSync(join(tmpdir(), "rc585-"));
    for (const [p, body] of Object.entries(files)) {
      mkdirSync(join(dir, p, ".."), { recursive: true });
      writeFileSync(join(dir, p), body);
    }
    return dir;
  };

  it("passes on this tree and prints both lists", () => {
    const { ok, lines } = checkFunctions(root);
    expect(lines).toContain("functions in the table: api/deck-url.ts");
    expect(lines).toContain("functions Vercel would deploy: api/deck-url.ts");
    expect(ok).toBe(true);
  });

  it("fails on a function nobody classified, by name", () => {
    const dir = fixture({ "api/deck-url.ts": "", "api/_deck-url-guards.ts": "", "api/admin/leak.ts": "", "api/tsconfig.json": "{}" });
    const { ok, lines } = checkFunctions(dir);
    expect(ok).toBe(false);
    expect(lines).toContain("FAIL unclassified function: api/admin/leak.ts (classify this route in scripts/api-routes.mjs)");
  });

  it("counts the ways outside api/: root middleware, a Build Output tree and vercel.json builds", () => {
    const dir = fixture({
      "api/deck-url.ts": "",
      "middleware.ts": "",
      ".vercel/output/functions/x.func/index.js": "",
      "vercel.json": JSON.stringify({ builds: [{ src: "server.js", use: "@vercel/node" }] }),
    });
    expect(compareWithTable(deployableFunctions(dir)).unclassified).toEqual([
      ".vercel/output/functions/x.func", "middleware.ts", "vercel.json builds: server.js",
    ]);
  });

  it("counts a function that is a symlink, which a plain file filter misses (scan RiftCombo_3d7d8559)", () => {
    const dir = fixture({ "api/deck-url.ts": "", "outside/evil.ts": "" });
    symlinkSync(join(dir, "outside/evil.ts"), join(dir, "api/linked.ts"));
    const { ok, lines } = checkFunctions(dir);
    expect(ok).toBe(false);
    expect(lines).toContain("FAIL unclassified function: api/linked.ts (classify this route in scripts/api-routes.mjs)");
  });

  it("counts the functions inside a symlinked directory", () => {
    const dir = fixture({ "api/deck-url.ts": "", "lib/routes/hidden.ts": "" });
    symlinkSync(join(dir, "lib/routes"), join(dir, "api/shared"));
    expect(compareWithTable(deployableFunctions(dir)).unclassified).toEqual(["api/shared/hidden.ts"]);
  });

  it("names a function under every link to its directory, not only the first", () => {
    const dir = fixture({ "api/deck-url.ts": "", "lib/routes/x.ts": "" });
    symlinkSync(join(dir, "lib/routes"), join(dir, "api/a"));
    symlinkSync(join(dir, "lib/routes"), join(dir, "api/b"));
    expect(compareWithTable(deployableFunctions(dir), { "api/deck-url.ts": {}, "api/a/x.ts": {} }).unclassified).toEqual(["api/b/x.ts"]);
  });

  it("ends a symlink loop and names each function once", () => {
    const dir = fixture({ "api/deck-url.ts": "" });
    symlinkSync(join(dir, "api"), join(dir, "api/loop"));
    expect(deployableFunctions(dir)).toEqual(["api/deck-url.ts"]);
  });

  it("counts a vercel.json functions entry with its own runtime, whatever its extension (scan RiftCombo_3d7d8559)", () => {
    const dir = fixture({
      "api/deck-url.ts": "",
      "api/admin.php": "<?php echo 1;",
      "vercel.json": JSON.stringify({ functions: { "api/*.php": { runtime: "vercel-php@0.7.4" }, "api/deck-url.ts": { maxDuration: 10 } } }),
    });
    expect(compareWithTable(deployableFunctions(dir)).unclassified).toEqual(["vercel.json functions runtime: api/*.php"]);
  });

  it("fails when the table names a route the tree no longer has", () => {
    const { ok, lines } = checkFunctions(fixture({ "api/_only-a-module.ts": "" }));
    expect(ok).toBe(false);
    expect(lines).toContain("FAIL in the table but not deployed: api/deck-url.ts");
  });

  it("runs as the last step of build:web", async () => {
    const pkg = (await import("../package.json", { with: { type: "json" } })).default as { scripts: Record<string, string> };
    expect(pkg.scripts["build:web"]).toMatch(/scripts\/check-functions\.mjs$/);
  });
});
