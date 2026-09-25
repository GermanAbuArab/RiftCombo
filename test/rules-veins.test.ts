import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * The two rules veins of #187 and #191 are closed (#229), and this keeps them closed.
 *
 * Vein A: rules the catalogue cites 10+ times that CLAUDE.md never carries (`scripts/claude-md-gap.mjs`).
 * Vein B: Core Rules sub-rules with a worked Example that nothing cites (`scripts/uncited-examples.mjs`).
 * Every row of both was disposed in `docs/phase0/walks/2026-09-25-rules-veins-final-slice.md`.
 *
 * Both assertions are ZERO, and a zero from a probe that matched nothing looks exactly like a pass, so
 * each population is asserted non-trivial first. If this goes red, do not raise a ceiling: read the new
 * paragraph, promote it into CLAUDE.md or refuse it in a walk document with the reason.
 */
describe("rules veins stay closed", () => {
  it("Vein A: no rule cited 10+ times by the catalogue is missing from CLAUDE.md", () => {
    const out = execFileSync("node", ["scripts/claude-md-gap.mjs"], { encoding: "utf8" });
    const nv = out.match(/NON-VACUITY: (\d+) headings parsed; catalogue blob (\d+) bytes; CLAUDE\.md (\d+) bytes/);
    expect(nv).not.toBeNull();
    const [, heads, blob, claude] = nv!.map(Number);
    expect(heads).toBeGreaterThan(2000);
    expect(blob).toBeGreaterThan(1_000_000);
    expect(claude).toBeGreaterThan(100_000);
    const pop = out.match(/ZERO times in CLAUDE\.md: (\d+)/);
    expect(pop).not.toBeNull();
    expect(Number(pop![1])).toBe(0);
  }, 60_000); // the gap script scans 2,381 headings against 7 MB; ~5s alone, more under load

  it("Vein B: every sub-rule with a worked Example is cited somewhere", () => {
    const out = execFileSync("node", ["scripts/uncited-examples.mjs", "--count"], { encoding: "utf8" });
    const r = JSON.parse(out) as {
      subRuleHeadings: number; withExample: number; catalogueCitationTokens: number; walkFiles: number; rows: string[];
    };
    expect(r.subRuleHeadings).toBeGreaterThan(1500);
    expect(r.withExample).toBeGreaterThan(100);
    expect(r.catalogueCitationTokens).toBeGreaterThan(10_000);
    expect(r.walkFiles).toBeGreaterThan(50);
    expect(r.rows).toEqual([]);
  }, 60_000);
});
