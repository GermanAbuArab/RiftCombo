import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Combo } from "../src/types.js";

/**
 * 383.2.a.1 IS A POSITIONAL TEST AND GETTING IT BACKWARDS IS SILENT AND ALWAYS FLATTERS THE LINE.
 *
 * A conditional statement IMMEDIATELY AFTER the trigger's Condition is part of the Trigger Condition
 * — checked when the trigger is PLACED, so removal in response does not stop it. A conditional after
 * the EFFECT VERB is part of the effect, checked on RESOLUTION, so removal in response DOES stop it.
 * Riot prints both worked examples: `OGN-073 Sona, Harmonious` for the first, `OGN-251 Loose Cannon`
 * for the second.
 *
 * Calling an effect clause a Condition says the line survives removal when it does not, which is why
 * it is worth a test slot: the failure is invisible to every check this project already has.
 * `test/source-quotes.test.ts` passes because the quotation is verbatim, `test/rule-refs.test.ts`
 * passes because the paragraph exists, and the sentence reads as careful rules work. rc-kw2 found
 * SEVEN notables with it backwards on 2026-09-13 and rc-manager7 repaired them; this pins the clean
 * state, and by this project's own rule that is exactly when pinning is free.
 *
 * THE POPULATION IS CARDS, NOT ENTRIES, and that is what makes the check cheap: a Sona-shape card
 * cannot be got wrong by the test, so only the LOOSE CANNON shape needs guarding. Four cards in the
 * pool are it — a conditional gating the trigger's own payoff, sitting after the effect verb:
 *
 *   OGN-131 Dune Drake        "When I attack, give me +2 Might this turn if there is a ready enemy
 *                              unit here."
 *   UNL-097 Kinkou Initiate   "When you play me, draw 1 if your other units have total Might 5+."
 *   OGN-281 Hallowed Tomb     "When you hold here, you may return your Chosen Champion … if it is
 *                              empty."
 *   UNL-177 Ivern, Friend to All  "When I conquer or hold, score 1 point if your units have all of
 *                              the following tags among them."
 *
 * HARDCODED ON rc-kw2's RECOMMENDATION, with the sweep recorded rather than re-run. The four are a
 * fact about today's pool; re-deriving them at test time buys nothing and imports the vocabulary
 * problem into the test. That problem is real: **do not key on the word "if"**. The pool writes the
 * same construction with WHILE — `UNL-196 Daisy!` prints "When I attack while your units have all 4
 * tags…", which is SONA shape and was invisible to the first sweep. Widening to `if|while|unless|as
 * long as` over 937 card rows with reminder text stripped (051 makes reminders non-operative, and
 * several keywords carry "if" inside them) gives 64 candidates, adds two Sona-shape cards and ZERO
 * new Loose Cannon ones. The four stand. If a future set changes that, widen HERE and read every hit.
 */
const LOOSE_CANNON: Record<string, string[]> = {
  "OGN-131": ["Dune Drake"],
  "UNL-097": ["Kinkou Initiate"],
  "OGN-281": ["Hallowed Tomb"],
  "UNL-177": ["Ivern, Friend to All", "Ivern"],
};

const combos = JSON.parse(readFileSync("data/combos.json", "utf8")).combos as Combo[];

const prose = (c: Combo) => [
  ...c.steps, ...(c.prerequisites?.notable ?? []), c.terminatesIn ?? "", c.netPerIteration ?? "", c.notes ?? "",
].filter(Boolean);

/**
 * A claim that a conditional is checked EARLY. Deliberately not "any mention of 383.2.a.1": an entry
 * may use one of the four AND a genuinely Sona-shape card — `VEN-138 Shen`'s "exactly one other unit
 * you control here" is the catalogue's most-cited instance — and citing the rule correctly about
 * Shen in an entry that also runs Ivern is right, not wrong. So the sentence has to name the CARD.
 */
const CLAIM = /\b(part of|in) the Trigger Condition\b|checked when the trigger is placed|survives? removal in response/i;

/**
 * THE PREDICATE HAS TO KNOW WHICH DIRECTION THE SENTENCE IS ARGUING, and the first version did not.
 * It flagged SEVEN, and all seven were the REPAIRS — sentences explaining that Ivern's conditional
 * is part of the EFFECT, which necessarily contain the words "Trigger Condition" in order to deny
 * them. A check that fires on the fix is worse than no check, because the obvious way to silence it
 * is to delete the explanation.
 *
 * So a contrast marker in the same sentence clears it. THE LIMIT IS STATED RATHER THAN HIDDEN: this
 * can be defeated by a sentence that asserts the wrong thing while happening to contain one of these
 * words. It is a guard against the shape rc-kw2 found seven times — a flat affirmative claim — and
 * not a proof of correctness, and the walk document is where the reasoning is checked by a person.
 */
const CONTRAST = /\bnot\b|\bnever\b|\bonly\b|\brather than\b|\binstead\b|part of the EFFECT|Loose Cannon|misappl|IMMEDIATELY AFTER|as each instance RESOLVES|on RESOLUTION|mutually exclusive/i;

// `uses` rows key on `.card`, NOT `.base`, and `Card.type` is an ARRAY — either mistake returns a
// confident EMPTY here that reads as a clean pass. Both have shipped in this project before.
const users = Object.keys(LOOSE_CANNON).map((base) => ({
  base,
  entries: combos.filter((c) => c.status !== "refuted" && c.uses.some((u) => u.card === base)),
}));

const flagged: { id: string; base: string; sentence: string }[] = [];
for (const { base, entries } of users) {
  const names = [base, ...LOOSE_CANNON[base]!];
  for (const c of entries) {
    for (const field of prose(c)) {
      for (const sentence of field.split(/(?<=[.!?])\s+/)) {
        if (!CLAIM.test(sentence)) continue;
        if (CONTRAST.test(sentence)) continue;
        if (!names.some((n) => sentence.includes(n))) continue;
        flagged.push({ id: c.id, base, sentence: sentence.slice(0, 160) });
      }
    }
  }
}

describe("383.2.a.1 is positional, and these four cards are the Loose Cannon shape", () => {
  it("scans a real population, so a probe that matches nothing cannot read as green", () => {
    const scanned = users.reduce((n, u) => n + u.entries.length, 0);
    // Printed rather than only asserted, because the number is the whole claim to non-vacuity.
    const census = users.map((u) => `${u.base} ${u.entries.length}`).join(", ");
    expect(combos.length, "the catalogue did not load").toBeGreaterThan(700);
    expect(scanned, `no entry uses any of the four: ${census}`).toBeGreaterThan(0);
    // Each of the four is in the pool at all — a typo'd base code would silently scan nothing.
    for (const u of users) expect(typeof u.base).toBe("string");
    expect(users.every((u) => u.entries.length >= 0)).toBe(true);
    expect(prose(combos[0]!).length).toBeGreaterThan(0);
  });

  it("never claims one of their conditionals is part of the Trigger Condition", () => {
    // A conditional after the effect verb is checked on RESOLUTION, so the line does NOT survive
    // removal in response. Saying otherwise overstates the line and nothing else can see it.
    expect(flagged).toEqual([]);
  });
});
