import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Every `source` in the hand-transcribed legality file ends up as an href in the ban-list notice
 * (`banRow` in web/main.ts, which also runs it through `safeHref`). A future transcription with a
 * `javascript:` or `data:` source must fail HERE, by name, before it reaches the data build.
 */
const root = new URL("..", import.meta.url);
const legality = JSON.parse(readFileSync(new URL("data/legality.src.json", root), "utf8")) as unknown;

/** Every string under a key named `source`, with the path that names it. */
export function collectSources(node: unknown, path = "$"): { path: string; source: string }[] {
  if (Array.isArray(node)) return node.flatMap((v, i) => collectSources(v, `${path}[${i}]`));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) =>
      k === "source" && typeof v === "string" ? [{ path: `${path}.${k}`, source: v }] : collectSources(v, `${path}.${k}`),
    );
  }
  return [];
}

const badSchemes = (data: unknown) =>
  collectSources(data).filter(({ source }) => {
    try { return new URL(source).protocol !== "https:"; } catch { return true; }
  });

describe("legality.src.json source schemes", () => {
  it("every source is https:", () => {
    const all = collectSources(legality);
    console.log(`legality.src.json: ${all.length} sources checked, all must be https:`);
    expect(all.length).toBeGreaterThan(0);
    expect(badSchemes(legality).map((b) => `${b.path} = ${b.source}`)).toEqual([]);
  });

  it("names an injected javascript: source (fixture copy)", () => {
    const copy = structuredClone(legality) as { formats: { banned: { source: string }[] }[] };
    copy.formats[0]!.banned[0]!.source = "javascript:alert(1)";
    expect(badSchemes(copy).map((b) => b.path)).toEqual(["$.formats[0].banned[0].source"]);
  });
});
