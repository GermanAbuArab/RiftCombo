import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * Nothing checked the 87 walk documents, and that is how nineteen defects sat in one written today.
 *
 * `test/source-quotes.test.ts` proves every quoted passage in `data/combos.json` is verbatim (#202).
 * The walk documents were never in that population. On 2026-09-13 a lane ran a checker over its own
 * walk document — written that day, by someone who had spent the day reading the rule against this
 * exact defect — and found nineteen, AFTER it had already reported them fixed in a different slice.
 * Diagnosed-but-unapplied, inside one day, in the work of the person who diagnosed it.
 *
 * This is a RATCHET, not a clean bill of health, and the distinction is the whole design. The corpus
 * flags 75 passages today; most are not defects (a gloss no reader would take for a quotation, or an
 * elision written with three dots where a proper ellipsis would pass), and cleaning 88 historical
 * documents is not worth the churn. What matters is that the number can only go DOWN: a new walk
 * cannot add a mis-transcribed rule quotation without turning this red.
 *
 * When you legitimately lower it, lower CEILING in the same commit. If you raise it, you are papering
 * over a defect — fix the quotation instead.
 */
const CEILING = 75;

const out = execFileSync("node", ["scripts/check-walk-quotes.mjs", "--count"], { encoding: "utf8" });
const { files, claiming, flagged } = JSON.parse(out) as { files: number; claiming: number; flagged: number };

describe("quoted rules text in the walk documents", () => {
  // A probe that silently matches nothing prints a clean pass. Assert the population first.
  it("reads a non-trivial corpus, so a broken sweep cannot read as green", () => {
    expect(files).toBeGreaterThan(50);
    expect(claiming).toBeGreaterThan(1000);
  });

  it(`does not add a mis-transcribed rule quotation (ratchet at ${CEILING})`, () => {
    expect(flagged).toBeLessThanOrEqual(CEILING);
  });
});
