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
 * A RATCHET, and it shipped at 18 — today's count — rather than at zero, because the repair is
 * `data/combos.json`, that file is the manager's, and a red suite would have blocked four lanes
 * over work this lane may not do. rc-manager7 merged the rows within the hour (`341ecd7`), so the
 * count is now ZERO and the ceiling comes down with it, which is the rule this project already
 * applies to its other ratchet: lower CEILING in the same commit that lowers the count.
 *
 * At zero it is an assertion rather than a ratchet, and that is the stronger form now that it can
 * be honest. Raising it is papering over the defect: give the entry an `anyBodies` instead.
 */
const CEILING = 0;

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

/**
 * The other half of a zero-ceiling check, and it is what makes one honest. A count of DEFECTS that
 * can only go down says nothing if the predicate quietly stops matching; a count of REPAIRS that can
 * only go up cannot be faked the same way, because it reads the field rather than the predicate. So
 * the two ratchet in opposite directions and a silent failure of either shows up in the other.
 *
 * 27 entries carry the field as of 341ecd7. The 28th staged row,
 * `irelia-fervent-forgotten-signpost-choose`, was staged with the doubt written beside it and
 * overruled — its `uses` already carries two units, so Keeper-pays-while-Irelia-moves runs without a
 * third body, and what the third buys is the option of moving somebody else while she stays put.
 */
const REPAIRS = 65;

describe("predicate E: a controlled battlefield with no body to take it", () => {
  it("reads a non-trivial population, so a broken sweep cannot read as green", () => {
    // A probe that silently matches nothing prints a clean pass. Assert the inputs first.
    expect(live.filter((c) => c.anyBodies).length).toBeGreaterThanOrEqual(REPAIRS);
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

/**
 * PREDICATES G AND H — the two shapes predicate E structurally cannot reach, shipped beside it so
 * the floor covers the class rather than the one shape that happened to be found first.
 *
 * E asks whether a line must CONTROL a battlefield it names. It is blind twice over. 485.4.a has
 * each player bring three battlefields from the deck, so a line can turn on a Conquer or a Hold and
 * name none of them; and E keys on ZERO units, so a line that holds one body and needs two is
 * invisible to it. Both gaps were real and both were productive.
 *
 * **G — a card whose own text needs a unit you control, with no unit in `uses`.** The rule is one
 * paragraph: **818.1.c.2** — *"Equip is functionally short for '[Cost]: Attach this gear to a unit
 * you control.'"* Those last four words are the whole clause: an Equipment line with no body
 * requires one BY THE KEYWORD'S OWN DEFINITION,
 * and the same holds for a card acting on a friendly unit or scoring on a Conquer or a Hold
 * (469.1, 469.2, 190.1). Read entry by entry: 31 fresh rows, **29 exposed, 2 refused** —
 * `dragons-rage-discipline-reflexive-double-kill`, which reads entirely on ENEMY bodies and says so
 * in its own step 5, and `crumbling-sands-decree-of-focus-conditional-reactions`, whose primary
 * half needs no body at all.
 *
 * **THE TOKEN EXCLUSION IS CORRECT FOR G AND WRONG FOR E, AND ONE RULE SEPARATES THEM.** 355.2.a
 * plays a token to *"the controller's Base or a battlefield the controller CONTROLS"*, so a token
 * can HOLD ground you already took and can never TAKE it — E therefore has none, and its three
 * novel rows all mint tokens and are all exposed anyway. 818.1.c.2 asks only for a unit you
 * control, and 185.2.d makes a token follow all rules for its type, so a token IS a legal carrier —
 * G therefore must have one. `blade-ruined-king-detach-recovery` is the case: it mints three
 * Recruits with the Vanguard Armory and its [Equip] even KILLS one, citing 185.2.d in its own step.
 *
 * **H — a line that holds ONE body and needs TWO**, on the card's own words: *another*, *other*, *a
 * different* unit you control. 203 entries hold exactly one unit copy, 15 use such a card, **8 are
 * exposed**. The seven refusals carry the sharpest rule in this whole investigation, and it is the
 * test for every future row — **is the body being SPENT, or asked for?** An EFFECT that wants
 * another friendly unit is NOT a requirement, because 055.1 and 359.3.e.11 ignore an impossible
 * instruction and it simply fizzles (`SFD-132 Beast Below`'s ETB, which its entry calls a
 * drawback). A COST that wants one IS, because 203.3 makes an impossible cost unpayable
 * (`UNL-142 Heedless Resurrection`, whose mandatory *"kill a friendly unit"* means the card cannot
 * legally be PLAYED with no body).
 *
 * Both are pinned at today's count for the reason E was: `data/combos.json` is the manager's, and a
 * red suite would block four lanes over work this lane may not do. **Lower each CEILING in the same
 * commit that lowers its count**, exactly as for E. The `REPAIRS` floor above guards all three, for
 * the same reason it guards E: it reads the FIELD where these read the PREDICATE.
 */
const G_CEILING = 22;
const H_CEILING = 15;

const needsABody = (base: string) => {
  const c = cards.get(base);
  const t = `${c?.text ?? ""} ${c?.effect ?? ""}`;
  return /\[Equip\]|\bfriendly unit\b|\bunit you control\b|when (you|i) (conquer|hold)|\[Hunt/i.test(t);
};
// A plural is a word character, so `\bunit token\b` does not match "unit tokenS" and let the one
// genuinely self-supplying entry through. Second appearance of that trap in one session.
const makesToken = (base: string) => {
  const c = cards.get(base);
  return /\bunit tokens?\b/i.test(`${c?.text ?? ""} ${c?.effect ?? ""}`);
};
const wantsASecond = (base: string) => {
  const c = cards.get(base);
  const t = `${c?.text ?? ""} ${c?.effect ?? ""}`;
  // Two forms, and dropping the second cost a real case on the first run: "your OTHER units here"
  // has no "friendly" and no "you control" between the word and the noun, so only the adjacent form
  // catches `UNL-056 Yuumi, Magical Cat`. The enemy lookahead is what keeps "another enemy unit" out.
  return /\b(another|other|a different|one other)\b[^.]{0,40}\b(friendly units?|units? you control)\b/i.test(t)
    || /\b(another|other|a different|one other)\s+(friendly\s+)?units?\b(?![^.]{0,30}\benemy\b)/i.test(t);
};
const unitCopies = (c: Combo) =>
  c.uses.filter((u) => isType(u.card, "unit")).reduce((n, u) => n + u.quantity, 0);

const open = live.filter((c) => c.needs.length === 0 && !c.anyBodies && !c.uses.some((u) => makesToken(u.card)));
const gFlagged = open.filter((c) => unitCopies(c) === 0 && c.uses.some((u) => needsABody(u.card)));
const hFlagged = open.filter((c) => unitCopies(c) === 1 && c.uses.some((u) => wantsASecond(u.card)));

describe("predicates G and H: a card that needs a body the line does not hold", () => {
  it("pins each predicate against a named card, which a population floor cannot do", () => {
    // Once the catalogue is repaired both counts go to zero, and at zero a population floor says
    // NOTHING about whether the regexes still match anything. So the predicates themselves are
    // pinned against cards chosen because each one broke something:
    expect(needsABody("UNL-188"), "Hextech Gauntlets prints [Equip]").toBe(true);
    expect(needsABody("SFD-144"), "Spirit Wheel fires on choosing a friendly unit").toBe(true);
    expect(needsABody("OGN-044"), "Clockwork Keeper needs no body of yours").toBe(false);
    // The plural that let the one self-supplying entry through: "Play three ... Recruit unit tokenS".
    expect(makesToken("SFD-168"), "Vanguard Armory mints its own carriers").toBe(true);
    expect(makesToken("UNL-044"), "Flurry of Feathers plays four Bird tokens").toBe(true);
    // Yuumi grants [Tank] to "one of your OTHER units here" and is herself Might 1.
    expect(wantsASecond("UNL-056")).toBe(true);
    expect(wantsASecond("OGN-293"), "The Grand Plaza counts units and asks for no second one").toBe(false);
    // And the populations the two sweeps run over, so a filter that empties them is visible too.
    expect(open.length).toBeGreaterThan(80);
    expect(live.filter((c) => unitCopies(c) === 1).length).toBeGreaterThan(150);
  });

  it(`does not add a line whose card needs a body it has none of (G, ratchet at ${G_CEILING})`, () => {
    expect(gFlagged.length).toBeLessThanOrEqual(G_CEILING);
  });

  it(`does not add a line that holds one body and needs two (H, ratchet at ${H_CEILING})`, () => {
    expect(hFlagged.length).toBeLessThanOrEqual(H_CEILING);
  });

  it("still reaches the cases read by hand, however the predicates are narrowed", () => {
    // The same guard the E block carries, for the same reason: a narrowing that drops a known
    // defect is a bug, and one did on the morning this class was found. Either the predicate still
    // sees the entry or it has been repaired; anything else means a narrowing lost a defect.
    const known: [string, typeof gFlagged][] = [
      ["skyfall-cull-hold-gold", gFlagged], ["strike-down-blighted-battleaxe-detach-before-it-bites", gFlagged],
      ["tricksy-tentacles-yuumi-forced-defend-subset", hFlagged], ["spectral-centaur-deathgrip-reaction-spike", hFlagged],
    ];
    for (const [id, bucket] of known) {
      const c = live.find((x) => x.id === id);
      expect(c, `${id} is gone from the catalogue`).toBeDefined();
      expect(!!c!.anyBodies || bucket.includes(c!), `${id} is neither flagged nor repaired`).toBe(true);
    }
  });
});
