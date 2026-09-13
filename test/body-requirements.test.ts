import { describe, expect, it } from "vitest";
import { generateVariants, validateCombos } from "../src/combos.js";
import { loadCardIndex, loadCombos } from "../src/load.js";
import { matchDeck } from "../src/matcher.js";
import { planDeck } from "../src/plan.js";
import type { Combo, Deck } from "../src/types.js";

const cards = loadCardIndex();
const { combos, features } = loadCombos();

const deck = (o: Partial<Deck>): Deck =>
  ({ legend: null, champion: null, battlefields: {}, runes: {}, main: {}, sideboard: {}, unresolved: [], ...o });

/** A minimal authored entry, so the mechanism is tested on data this file owns. Real cards: the
 *  matcher resolves types and domains off the index, and a fixture with invented codes would not. */
const combo = (o: Partial<Combo>): Combo => ({
  id: "synthetic", name: "Synthetic", class: "ENGINE", status: "verified",
  uses: [], needs: [], produces: [], prerequisites: { easy: [], notable: [] },
  steps: [], terminatesIn: "n/a", sources: [], rulesVersion: "2026-07-16", ...o,
});

describe("bodies a line needs that no card supplies (Combo.anyBodies)", () => {
  // OGN-293 The Grand Plaza (battlefield, colourless), UNL-044 Flurry of Feathers (spell, calm),
  // OGN-044 Clockwork Keeper (unit, calm) — the real shape of the defect, in three cards.
  const plazaLine = combo({
    id: "synthetic-plaza",
    uses: [{ card: "OGN-293", quantity: 1, role: "battlefield" }, { card: "UNL-044", quantity: 1, role: "enabler" }],
    anyBodies: { count: 3, note: "Get three of your units onto The Grand Plaza and keep Control of it." },
  });
  const vs = generateVariants([plazaLine], cards);

  it("is carried onto every variant the combo flattens into", () => {
    expect(vs).toHaveLength(1);
    expect(vs[0]!.anyBodies).toEqual({ count: 3, notes: [plazaLine.anyBodies!.note] });
  });

  it("keeps a line OUT of `included` for a deck holding every card and no units", () => {
    // The defect, reproduced 2026-09-13 on the real catalogue before this field existed: this exact
    // list came back with `flurry-of-feathers-grand-plaza-win` INCLUDED, and the word the site puts
    // in front of the player for that entry is "you win the game".
    const noUnits = deck({ battlefields: { "OGN-293": 1 }, main: { "UNL-044": 3 } });
    const r = matchDeck(noUnits, vs, cards, { format: "constructed", maxMissing: 5 });
    expect(r.included).toEqual([]);
    expect(r.almostIncluded).toHaveLength(1);
    expect(r.almostIncluded[0]!.missingBodies).toEqual({ count: 3, notes: [plazaLine.anyBodies!.note] });
    // The shortfall is real distance, so the caller's cap sees it: at the default of 2 the line is
    // three cards away and does not appear at all.
    expect(matchDeck(noUnits, vs, cards, { format: "constructed" }).almostIncluded).toEqual([]);
  });

  it("lets the same line in once the deck holds spare units", () => {
    const withUnits = deck({ battlefields: { "OGN-293": 1 }, main: { "UNL-044": 3, "OGN-044": 3 } });
    const r = matchDeck(withUnits, vs, cards, { format: "constructed" });
    expect(r.included.map((h) => h.variant.id)).toEqual(["synthetic-plaza"]);
    expect(r.included[0]!.missingBodies).toBeUndefined();
  });

  it("does not let the line's OWN units pay for its spare bodies", () => {
    // The subtraction is the whole point: a body committed to the line is not spare. One copy of
    // the unit the line uses leaves nothing over; two leave one.
    const line = combo({
      id: "synthetic-spare",
      uses: [{ card: "OGN-044", quantity: 1, role: "engine" }],
      anyBodies: { count: 1, note: "attach the Sword to a spare unit" },
    });
    const one = generateVariants([line], cards);
    expect(matchDeck(deck({ main: { "OGN-044": 1 } }), one, cards, { format: "constructed" }).included).toEqual([]);
    expect(matchDeck(deck({ main: { "OGN-044": 2 } }), one, cards, { format: "constructed" })
      .included.map((h) => h.variant.id)).toEqual(["synthetic-spare"]);
  });

  it("is priced by planDeck, so the panel can finally name what is missing", () => {
    // SFD-195 Blade Dancer is Calm/Chaos, which holds colourless OGN-293 and Calm UNL-044.
    const noUnits = deck({ legend: "SFD-195", battlefields: { "OGN-293": 1 }, main: { "UNL-044": 1 } });
    const plan = planDeck(noUnits, vs, cards, { format: "constructed" });
    // Every card is present, so before this the route cost 0 and sat in `have` — a line the deck
    // holds every piece of and cannot run.
    expect(plan.have).toEqual([]);
    expect(plan.routes).toHaveLength(1);
    expect(plan.routes[0]!.add).toEqual([]);
    expect(plan.routes[0]!.cost).toBe(3);
    expect(plan.routes[0]!.addBodies!.notes).toEqual([plazaLine.anyBodies!.note]);

    const withUnits = deck({ legend: "SFD-195", battlefields: { "OGN-293": 1 }, main: { "UNL-044": 1, "OGN-044": 3 } });
    expect(planDeck(withUnits, vs, cards, { format: "constructed" }).have).toHaveLength(1);
  });

  it("refuses an authored requirement a reader could not check", () => {
    expect(validateCombos([combo({ anyBodies: { count: 0, note: "x" } })], features, cards))
      .toEqual(["synthetic: anyBodies.count must be an integer >= 1"]);
    expect(validateCombos([combo({ anyBodies: { count: 2, note: "  " } })], features, cards))
      .toEqual(["synthetic: anyBodies.note must quote the requirement"]);
  });
});

/**
 * PREDICATE E — THE RATCHET, AND IT READS THE RULES RATHER THAN THE PROSE.
 *
 * Four predicates were written for this defect class on 2026-09-13 and the first three all read HOW
 * AN AUTHOR PHRASED SOMETHING — a body count, an instruction to bring a body, a precondition with a
 * counting word. Each needed three or four narrowings, each still carries a false-positive
 * taxonomy, and the one that mattered most was invisible to all three: `apothecary-pridestalker-
 * buff` opens *"Have a friendly unit at a battlefield besides the Apothecary"*, with no counting
 * word in it at all. A human found that one by reading.
 *
 * This one consults no prose, so no phrasing can defeat it:
 *
 *   190.1  "Control is established over Battlefields through the course of play." — you take a
 *          battlefield by walking a body onto it (144.4.a), and 323.6 strips Control the moment
 *          your last body leaves. So a line whose payoff sits on a battlefield it must CONTROL
 *          requires a unit.
 *   190.6.d blanks only the WORD "you": "If the battlefield has no Controller, 'you' refers to no
 *          one, and all such instructions are ignored." So a battlefield printing neither "you" nor
 *          "your" works with no Controller and needs no body. That is the ONE narrowing, and it did
 *          not have to be invented — CLAUDE.md already records that 26 of the 64 non-token
 *          battlefields print no "you" at all.
 *
 * Two conditions and no prose: zero units in `uses`, and a battlefield in `uses` whose own text
 * says "you" or "your". Entries declaring `needs` are out by rule — they inherit bodies from the
 * engine they fold in.
 *
 * MEASURED, WITH THE PREDICATE STATED BESIDE THE NUMBER, because this investigation has moved a
 * count four times by changing one: over 766 entries, 112 use no unit and declare no `needs`, 32 of
 * those use a battlefield, and **18** use one whose text says "you". rc-gap's own run of the same
 * idea reported 27 and 14; that is a different predicate and neither number is wrong, but nobody
 * should quote 14 against this file. Of the 18, fifteen are on the manager's confirmed list and the
 * three that were not — `grand-plaza-recruit-vanguard`, `arise-sand-soldiers-plaza`,
 * `vanguard-armory-dusk-rose-lab-altar-draw` — were read and are all genuine. `arise-sand-soldiers-
 * plaza` says it out loud in its own step 2: *"Take control of The Grand Plaza with ANY BODY"*.
 *
 * A TOKEN CARVE-OUT WOULD BE A BUG, AND ALL THREE NOVEL ROWS ARE THE PROOF. The obvious narrowing
 * is to forgive an entry whose cards play unit tokens; all three of them do, and all three are
 * exposed anyway, because 355.2.a plays a token to *"the controller's Base or a battlefield the
 * controller controls"* — a token can HOLD a battlefield you already took and can never TAKE one.
 *
 * A RATCHET, not a clean bill of health, and it is pinned at today's count rather than at zero on
 * purpose: five sessions share this working tree, the repair is `data/combos.json` and that file is
 * the manager's, so a red suite here would block four lanes over work this lane is not allowed to
 * do. What the ceiling buys is the thing that matters — the number can only go DOWN, so entry
 * twelve cannot ship. Lower CEILING in the same commit that lowers the count. Raising it is
 * papering over the defect: give the entry an `anyBodies` instead.
 */
const CEILING = 18;

const isType = (base: string, t: string) => cards.get(base)?.type.includes(t as never) ?? false;
const saysYou = (base: string) => {
  const c = cards.get(base);
  return /\byour?\b/i.test(`${c?.text ?? ""} ${c?.effect ?? ""}`);
};
const live = combos.filter((c) => c.status !== "refuted");
// `Card.type` is an ARRAY and a `uses` row keys on `.card`, not `.base`. Either mistake returns a
// confident EMPTY that reads as a clean pass; both have shipped in this project before.
const flagged = live.filter((c) =>
  c.needs.length === 0 &&
  !c.anyBodies &&
  !c.uses.some((u) => isType(u.card, "unit")) &&
  c.uses.some((u) => isType(u.card, "battlefield") && saysYou(u.card)));

describe("predicate E: a controlled battlefield with no body to take it", () => {
  it("reads a non-trivial population, so a broken sweep cannot read as green", () => {
    // A probe that silently matches nothing prints a clean pass. Assert the inputs first.
    expect(live.length).toBeGreaterThan(700);
    expect(live.flatMap((c) => c.uses).filter((u) => isType(u.card, "unit")).length).toBeGreaterThan(900);
    expect(new Set(live.flatMap((c) => c.uses).filter((u) => isType(u.card, "battlefield")).map((u) => u.card)).size)
      .toBeGreaterThan(40);
  });

  it(`does not add an entry that must control a battlefield with no body (ratchet at ${CEILING})`, () => {
    expect(flagged.length).toBeLessThanOrEqual(CEILING);
  });

  it("still reaches the four cases read by hand, however the predicate is narrowed", () => {
    // rc-gap's own lesson from the morning of 2026-09-13: "A narrowing that drops a known defect is
    // a bug, and one did." These four were each read against their own steps. Either the predicate
    // still sees them or the entry has been given an `anyBodies` — anything else means a narrowing
    // quietly lost a defect, which is how the first sweep nearly lost `gutter-palace`.
    const known = ["flurry-of-feathers-grand-plaza-win", "power-nexus-rune-recycle-any-identity",
      "arise-sand-soldiers-plaza", "grand-plaza-recruit-vanguard"];
    for (const id of known) {
      const c = live.find((x) => x.id === id);
      expect(c, `${id} is gone from the catalogue`).toBeDefined();
      expect(!!c!.anyBodies || flagged.includes(c!), `${id} is neither flagged nor repaired`).toBe(true);
    }
  });
});
