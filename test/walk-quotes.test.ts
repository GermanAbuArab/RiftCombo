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
 * WIDENED 2026-09-19 to also cover `docs/plays/` — the run-play documents #206 turned into the ONE
 * corpus this project actually RENDERS on the live site (`#/plays`, `#/plays/<slug>`). A walk document
 * is read here, by us; a play is read by a stranger clicking a link, and its quoted rules passages had
 * never been checked by anything either. Reading (not the gated regex, which is intentionally narrow —
 * see the header comment in `scripts/check-walk-quotes.mjs`) found one real defect the same day this
 * widening shipped: `docs/plays/2026-09-13-the-defenders-chair.md` dropped the nested quotation marks
 * from 355.10.d's own worked example — the rule reads `"Kill all units at battlefields" doesn't target
 * anything`, quoting a card phrase inside its own sentence, and the play had merged the two into one
 * unquoted run. The same dropped nesting already sat in `CLAUDE.md`, which is IN this checker's own
 * haystack, so the play's copy of the error validated against the source's copy of the SAME error —
 * the exact "misquote validates itself" failure this project's own rules name as the reason
 * `data/combos.json` is never added to a checker's haystack. Fixed in the play with a nested SINGLE
 * quote (which the normalizer folds identically to a double one), and left un-touched in `CLAUDE.md`,
 * which is contended manager-owned content outside this file's remit.
 *
 * This is a RATCHET, not a clean bill of health, and the distinction is the whole design. The corpus
 * flags 74 passages today across both directories combined; most are not defects (a gloss no reader
 * would take for a quotation, or an elision written with three dots where a proper ellipsis would
 * pass), and cleaning every historical document is not worth the churn. What matters is that the
 * number can only go DOWN: a new walk or a new play cannot add a mis-transcribed rule quotation
 * without turning this red.
 *
 * When you legitimately lower it, lower CEILING in the same commit. If you raise it, you are papering
 * over a defect — fix the quotation instead.
 */
const CEILING = 74;  // Unchanged by the 2026-09-19 widening: docs/plays added 20 more passages that
// claim to be rules text (claiming 1590 -> 1610) and zero of them were flagged after the one nested-
// quote defect above was repaired in place — proved out of band by corrupting a genuine docs/plays
// quote (323.6 in `2026-09-12-what-the-idle-mana-buys.md`) and watching flagged go 74 -> 75, then
// restoring it. Lowered from 75 on 2026-09-14 in the same commit as the lookbehind fix in
// scripts/check-walk-quotes.mjs: one standing flag was the instrument's own artifact, a passage whose
// lead contained `#153` and was read as rule 153. Two lanes hit that trap independently and BOTH
// REWORDED THEIR PROSE to get past it, which is the real cost - a false positive that teaches authors
// to write around the checker rather than the checker to read the prose.

const out = execFileSync("node", ["scripts/check-walk-quotes.mjs", "--count"], { encoding: "utf8" });
const { files, claiming, flagged } = JSON.parse(out) as { files: number; claiming: number; flagged: number };

describe("quoted rules text in the walk documents and published run plays", () => {
  // A probe that silently matches nothing prints a clean pass. Assert the population first.
  it("reads a non-trivial corpus, so a broken sweep cannot read as green", () => {
    expect(files).toBeGreaterThan(50);
    expect(claiming).toBeGreaterThan(1000);
  });

  it(`does not add a mis-transcribed rule quotation (ratchet at ${CEILING})`, () => {
    expect(flagged).toBeLessThanOrEqual(CEILING);
  });
});
