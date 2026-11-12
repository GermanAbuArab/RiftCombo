import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs, imported by the two node-run dev scripts, which cannot import TypeScript.
import { devNodeOptions, requestPath } from "../scripts/dev-support.mjs";

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
