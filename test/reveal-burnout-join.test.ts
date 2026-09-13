import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Combo } from "../src/types.js";

/**
 * AN ENTRY THAT ARGUES THE CONSEQUENCE OWES THE MECHANISM, and this is the third instance of that
 * shape `CLAUDE.md` records.
 *
 * **431.1.c** is the CONSEQUENCE — a player looking at or Revealing past the end of their deck
 * *"does not Burn Out"*. **424.1.a.2** is why: *"Cards remain in the zone they are being Revealed
 * from"*, with Riot's own example that a card revealed off the top of the Main Deck is still the top
 * card of that deck. **Revealing cannot Burn Out BECAUSE NOTHING LEAVES THE DECK.** An entry that
 * cites the protection without the mechanism has reasoned from an exception to a rule it never
 * opened — the same shape as citing 355.10.d without 355.7, and 811.1.b's tail without 811.6.
 *
 * PINNED BECAUSE IT IS CLEAN, NOT BECAUSE IT IS BROKEN. rc-gap2 measured sixteen entries owing this
 * in the morning and rc-manager8 applied the upgrade in `703f305`, so it reads ZERO tonight. This
 * project's rule is that a check coming back clean is exactly the one worth pinning, because pinning
 * costs nothing at a clean state and can only ever be paid for once.
 *
 * TWO TRAPS, BOTH TESTED RATHER THAN AVOIDED BY HABIT, and both reproduce here independently of
 * rc-gap2's numbers:
 *
 *  - **A bare three-digit token matches a prose quantity**, so accepting `424` alone would let an
 *    entry read as citing the block and shrink the owed set silently. The form below demands a
 *    SUB-paragraph, and its lookbehind excludes a HYPHEN (or `OGN-424` counts) and a HASH (or an
 *    issue number does) — the counting trap `CLAUDE.md` records three separate times. Measured: of
 *    the 26, ZERO cite only a bare `424`, so the strict form costs nothing.
 *  - **A card matching "reveal" only inside reminder parentheses** would inflate the population,
 *    since 051 makes reminder text non-operative. Measured: stripping parenthesised text leaves the
 *    population at 38, unchanged, so every member matches on its operative text.
 *
 * Denominators re-measured here, not inherited: 766 live entries, 29 printings whose text says
 * reveal, 38 entries using one, 26 of those citing 431.1.c, 0 owed.
 */
const combos = JSON.parse(readFileSync("data/combos.json", "utf8")).combos as Combo[];
const cards = JSON.parse(readFileSync("data/cards.json", "utf8")).cards as { base: string; text: string | null; effect: string | null }[];
const textOf = new Map(cards.map((c) => [c.base, `${c.text ?? ""} ${c.effect ?? ""}`]));

const live = combos.filter((c) => c.status !== "refuted");
const reveals = (base: string) => /\breveal/i.test(textOf.get(base) ?? "");
/** 051: reminder text is not operative, so a match inside parentheses is not the card saying it. */
const revealsOperative = (base: string) => /\breveal/i.test((textOf.get(base) ?? "").replace(/\([^)]*\)/g, " "));

/** The entry's OWN argument. `sources[].quote` is Riot's words and is excluded; measured, it changes
 *  none of the three numbers, so the narrower predicate is free. */
const prose = (c: Combo) => [...c.steps, ...(c.prerequisites?.notable ?? []), c.terminatesIn ?? "",
  c.netPerIteration ?? "", c.notes ?? ""].join("\n");

const CITES_424_SUB = /(?<![-#0-9.])424\.[0-9a-z]+(?:\.[0-9a-z]+)*(?![0-9a-z.])/;
const CITES_424_BARE = /(?<![-#0-9.])424(?![0-9a-z.])/;
const CITES_431_1_C = /(?<![-#0-9.])431\.1\.c(?![0-9a-z])/;

const users = live.filter((c) => c.uses.some((u) => reveals(u.card)));
const arguers = users.filter((c) => CITES_431_1_C.test(prose(c)));
const owed = arguers.filter((c) => !CITES_424_SUB.test(prose(c)));

describe("an entry arguing 431.1.c owes 424, the mechanism under it", () => {
  it("measures a real population, so a tokenizer that matches nothing cannot pass green", () => {
    // FLOORS, not pins, at every stage - the shape that stops a silent no-op reading as a result.
    expect(live.length).toBeGreaterThan(700);
    expect(cards.filter((c) => reveals(c.base)).length).toBeGreaterThan(20);
    expect(users.length, "no entry uses a reveal card").toBeGreaterThanOrEqual(30);
    expect(arguers.length, "no entry argues 431.1.c").toBeGreaterThanOrEqual(20);
  });

  it("counts a card on its OPERATIVE text, not on its reminder parentheses (051)", () => {
    // If these ever diverge, the population has grown a member that only MENTIONS revealing in a
    // reminder, and the join would be asking it for a citation it does not owe.
    expect(live.filter((c) => c.uses.some((u) => revealsOperative(u.card))).length).toBe(users.length);
  });

  it("demands a SUB-paragraph, and that costs nothing today", () => {
    // A bare 424 would also match a prose quantity, so it is refused. Measured: no entry leans on
    // one, so the strict form removes no correct citation - which is what makes it safe to demand.
    expect(arguers.filter((c) => !CITES_424_SUB.test(prose(c)) && CITES_424_BARE.test(prose(c)))).toEqual([]);
    // And the lookbehind really does exclude a hyphen and a hash, or a collector number and an
    // issue number would both read as citations. This is the counting trap CLAUDE.md records.
    expect(CITES_424_SUB.test("OGN-424.1")).toBe(false);
    expect(CITES_424_SUB.test("#424.1")).toBe(false);
    expect(CITES_424_SUB.test("424.1.a.2")).toBe(true);
  });

  it("names every entry that owes it, and the catalogue owes none", () => {
    // A NAMED SET rather than a bare zero: a future exception has to be recorded here with its
    // reason, instead of a number quietly going up.
    const KNOWN_OWED: string[] = [];
    expect(owed.map((c) => c.id).sort()).toEqual([...KNOWN_OWED].sort());
  });
});
