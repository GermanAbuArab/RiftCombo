import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs, imported by the two node-run dev scripts, which cannot import TypeScript.
import { devListenArgs, devNodeOptions, headerRules, headersFor, requestPath } from "../scripts/dev-support.mjs";
import { readFileSync } from "node:fs";

// vercel dev applies the /decks/:path* rewrite, then appends the unused capture as a query ENCODED into the
// path: GET /decks/x reached scripts/dev-static.mjs as /app%3Fpath=x and answered 404 (measured 2026-11-12, #597).
describe("dev-static request path (#597)", () => {
  it("drops a query vercel dev encoded into the path", () => {
    expect(requestPath("/app%3Fpath=x")).toBe("/app");
    expect(requestPath("/app%3Fpath=a%2Fb")).toBe("/app");
  });

  it("drops a real query and keeps an ordinary path", () => {
    expect(requestPath("/app?path=x")).toBe("/app");
    expect(requestPath("/decks/x")).toBe("/decks/x");
    expect(requestPath("/")).toBe("/");
    expect(requestPath("/fonts/inter%20var.woff2")).toBe("/fonts/inter var.woff2");
  });

  it("answers null for a path that does not decode", () => {
    expect(requestPath("/%E0%A4%A")).toBeNull();
  });
});

// The CLI's builder install (vlt) dialled IPv6 on a Mac whose IPv6 default route goes into a tunnel that
// drops it: Node's happy-eyeballs gave each IPv4 attempt 250 ms, IPv4 connects took ~300 ms, so the last
// attempt was IPv6 and hung for the OS TCP timeout until vlt's "Request failed" (#597).
describe("dev NODE_OPTIONS (#597)", () => {
  it("adds IPv4-first resolution and a longer per-address attempt", () => {
    const opts = devNodeOptions(undefined);
    expect(opts).toContain("--dns-result-order=ipv4first");
    expect(opts).toMatch(/--network-family-autoselection-attempt-timeout=(\d+)/);
    expect(Number(opts.match(/attempt-timeout=(\d+)/)?.[1])).toBeGreaterThan(250);
  });

  it("keeps what the caller already set, in front", () => {
    expect(devNodeOptions("--max-old-space-size=4096").startsWith("--max-old-space-size=4096 --dns-result-order")).toBe(true);
  });
});

// vercel dev proxies HTML to scripts/dev-static.mjs and does not add vercel.json's headers to what it returns,
// so /, /app and /decks/x came back with no CSP, COOP, HSTS, nosniff or X-Frame-Options (#605).
describe("dev-static headers from vercel.json (#605)", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  const at = (path: string, cfg: object): Record<string, string> => headersFor(path, headerRules(cfg));
  const all = config.headers.find((r: { source: string }) => r.source === "/(.*)");

  it("gives every page the /(.*) rule, keys and values as vercel.json has them", () => {
    for (const path of ["/", "/app", "/app.html", "/fonts/inter.woff2"]) {
      const got = at(path, config);
      for (const { key, value } of all.headers) expect(got[key]).toBe(value);
    }
    expect(Object.keys(at("/", config))).toEqual(all.headers.map((h: { key: string }) => h.key));
  });

  it("matches /(.*) on a path that decodes to a line break", () => {
    expect(at("/x\r\nX-Evil:1", config)["Content-Security-Policy"]).toBe(all.headers[0].value);
  });

  it("adds a rule scoped to one path only on that path, a later rule winning", () => {
    expect(at("/manifest.webmanifest", config)["Content-Type"]).toBe("application/manifest+json");
    expect(at("/app", config)["Content-Type"]).toBeUndefined();
    expect(at("/manifest.webmanifestx", config)["Content-Type"]).toBeUndefined();
    const two = { headers: [
      { source: "/(.*)", headers: [{ key: "X-A", value: "1" }] },
      { source: "/a", headers: [{ key: "X-A", value: "2" }] },
    ] };
    expect(at("/a", two)["X-A"]).toBe("2");
    expect(at("/b", two)["X-A"]).toBe("1");
  });

  it("lets a later rule win a key whatever its case, as production does", () => {
    const cased = { headers: [
      { source: "/(.*)", headers: [{ key: "X-A", value: "1" }] },
      { source: "/(.*)", headers: [{ key: "x-a", value: "2" }] },
      { source: "/(.*)", headers: [{ key: "X-A", value: "3" }] },
    ] };
    expect(at("/", cased)).toEqual({ "X-A": "3" });
  });

  it("matches named parameters the way path-to-regexp does", () => {
    const cfg = { headers: [
      { source: "/decks/:path*", headers: [{ key: "X-D", value: "1" }] },
      { source: "/u/:id", headers: [{ key: "X-U", value: "1" }] },
    ] };
    expect(at("/decks", cfg)["X-D"]).toBe("1");
    expect(at("/decks/a/b", cfg)["X-D"]).toBe("1");
    expect(at("/decksx", cfg)["X-D"]).toBeUndefined();
    expect(at("/u/7", cfg)["X-U"]).toBe("1");
    expect(at("/u/7/8", cfg)["X-U"]).toBeUndefined();
  });

  // Vercel compiles a header source strict and case-sensitive (sourceToRegex in CLI 65.11.0, path-to-regexp
  // 6.1.0 with strict: true, sensitive: true): a trailing slash is part of the source, never optional.
  it("matches a trailing slash only as written, as Vercel compiles a source strict", () => {
    expect(at("/manifest.webmanifest/", config)["Content-Type"]).toBeUndefined();
    expect(at("/a/", config)["Content-Security-Policy"]).toBe(all.headers[0].value);
    const cfg = { headers: [
      { source: "/u/:id", headers: [{ key: "X-U", value: "1" }] },
      { source: "/x/", headers: [{ key: "X-X", value: "1" }] },
      { source: "/", headers: [{ key: "X-R", value: "1" }] },
    ] };
    expect(at("/u/7/", cfg)["X-U"]).toBeUndefined();
    expect(at("/x", cfg)["X-X"]).toBeUndefined();
    expect(at("/x/", cfg)["X-X"]).toBe("1");
    expect(at("/", cfg)["X-R"]).toBe("1");
    expect(at("//", cfg)["X-R"]).toBeUndefined();
    expect(at("/Manifest.webmanifest", config)["Content-Type"]).toBeUndefined();
  });

  it("reads a group as a regular expression, escapes and braces included", () => {
    const cfg = { headers: [
      { source: "/y/(\\d{4})", headers: [{ key: "X-Y", value: "1" }] },
      { source: "/p/(a\\)b)", headers: [{ key: "X-P", value: "1" }] },
    ] };
    expect(at("/y/2026", cfg)["X-Y"]).toBe("1");
    expect(at("/y/26", cfg)["X-Y"]).toBeUndefined();
    expect(at("/p/a)b", cfg)["X-P"]).toBe("1");
  });

  it("refuses source syntax it would otherwise match as literal text", () => {
    for (const source of ["/file.:ext", ":x", "/a\\b", "/{a}", "/a)", "/(.*"]) {
      expect(() => headerRules({ headers: [{ source, headers: [] }] })).toThrow(/does not evaluate/);
    }
  });

  it("refuses a rule with has or missing, which it cannot evaluate", () => {
    const cfg = { headers: [{ source: "/(.*)", has: [{ type: "host", value: "x" }], headers: [] }] };
    expect(() => headerRules(cfg)).toThrow(/has/);
  });

  it("answers nothing when vercel.json has no headers", () => {
    expect(at("/", {})).toEqual({});
  });
});

// vercel dev's router listens on 0.0.0.0:3000 by default (`vercel dev --help`, CLI 65.11.0), so the dev
// server was reachable from the network (#605). The CLI accepts --listen <host:port>.
describe("dev router bound to loopback (#605)", () => {
  it("adds --listen 127.0.0.1:3000 when the caller named no address", () => {
    expect(devListenArgs([])).toEqual(["--listen", "127.0.0.1:3000"]);
    expect(devListenArgs(["--debug"])).toEqual(["--debug", "--listen", "127.0.0.1:3000"]);
  });

  it("puts a bare port on 127.0.0.1, in each spelling", () => {
    expect(devListenArgs(["--listen", "3597"])).toEqual(["--listen", "127.0.0.1:3597"]);
    expect(devListenArgs(["--listen=3597"])).toEqual(["--listen=127.0.0.1:3597"]);
    expect(devListenArgs(["-l", "3597"])).toEqual(["-l", "127.0.0.1:3597"]);
    expect(devListenArgs(["--listen", ":3597"])).toEqual(["--listen", "127.0.0.1:3597"]);
    expect(devListenArgs(["--listen=:3597"])).toEqual(["--listen=127.0.0.1:3597"]);
  });

  it("leaves a --listen with no value for vercel dev to refuse, adding no second one", () => {
    expect(devListenArgs(["--listen"])).toEqual(["--listen"]);
    expect(devListenArgs(["-l"])).toEqual(["-l"]);
  });

  it("keeps an address the caller named with a host", () => {
    expect(devListenArgs(["--listen", "0.0.0.0:4000"])).toEqual(["--listen", "0.0.0.0:4000"]);
    expect(devListenArgs(["--listen=localhost:4000"])).toEqual(["--listen=localhost:4000"]);
  });
});
