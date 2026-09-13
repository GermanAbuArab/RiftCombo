import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import type { Deck } from "../src/types.js";
import { ANY_NUMBER, UNIQUE, championTagOf, checkBuild } from "../src/build.js";
import { loadDeck } from "../src/deck.js";
import {
  addCard,
  addToSideboard,
  autoRunes,
  builderText,
  canonicalBase,
  canonicalizeDeck,
  capOf,
  championCapOf,
  copiesOf,
  costCurve,
  emptyDeck,
  filterPool,
  isEmptyDeck,
  otherBasesOf,
  poolOf,
  removeCard,
  removeFromSideboard,
  setChampion,
  sideboardCapOf,
  zoneOf,
  zoneCounts,
  zoneRows,
} from "../src/builder.js";

const cards = loadCardIndex();

// Codes the tests lean on, each read out of data/cards.json rather than remembered.
const LADY = "OGS-021";        // Lady of Luminosity - Starter, legend, Mind + Order
const LUX = "OGS-006";         // Lux, Illuminated, 6 Energy unit, tagged Lux
const FORGE = "OGN-212";       // Forge of the Future, 2 Energy gear
const PLAZA = "OGN-293";       // The Grand Plaza, battlefield
const MIND_RUNE = "OGN-089";
const ORDER_RUNE = "OGN-214";
const SPIDERLING = "VEN-097";  // "Your deck can have any number of cards named Spiderling"
const VI = "OGN-036";          // Vi, Destructive
const VI_VEN = "VEN-167";      // Vi, Destructive — the Vendetta reprint
// 103.2.d (#211). Ornn is the one champion tag with three Signature names, and all three are Unique,
// which is why a deck can reach exactly three on-tag Signature cards and no more.
const ORNN_LEGEND = "SFD-189";  // Fire Below the Mountain, the only Ornn legend, calm + mind
const CAPE = "SFD-190";         // Forgefire Cape — Signature, tagged Ornn, [Unique]
const DEATHCROWN = "SFD-191";   // Rabadon's Deathcrown — Signature, tagged Ornn, [Unique]
const REQUIEM = "SFD-192";      // Shurelya's Requiem — Signature, tagged Ornn, [Unique]
const FOXFIRE = "OGN-256";      // Fox-Fire — Signature, calm + mind, tagged Ahri, NOT Ornn
// Master Yi is the only OTHER champion with more than one Signature name, and neither of his is
// Unique — measured over all 51 Signature names, 2026-09-13. That makes him the one shell in the pool
// where 103.2.d.1 can still bind on an ON-TAG card once 825.3.a caps a Unique name at one (#210):
// three Highlanders are legal, and Alpha Strike is a legal fourth Signature card that 103.2.d.1 stops.
// The legend is UNL-191 and not OGS-019, which carries the same tag and is the pool's one restricted
// row (2v2 only, data/legality.json) — a fixture has no business depending on that.
const YI_LEGEND = "UNL-191";    // Wuju Master, calm + body
const HIGHLANDER = "OGS-020";   // Highlander — Signature, tagged Master Yi, NOT Unique
const ALPHA_STRIKE = "UNL-192"; // Alpha Strike — Signature, tagged Master Yi, NOT Unique
/** A Main Deck card inside calm + mind that is neither Signature nor exempt, read out of the pool. */
const inCalmMind = () => poolOf(cards).find(
  (c) => zoneOf(c) === "main" && !c.signature && c.domains.length > 0
    && c.domains.every((d) => d === "calm" || d === "mind") && !/any number/i.test(c.text ?? ""),
)!;

describe("the pool the builder draws from", () => {
  const pool = poolOf(cards);

  /**
   * One cell per NAME, never per base or per printing (#104): 101 playable names carry two or three
   * bases — `Vi, Destructive` is OGN-036 and VEN-167 — and the pool showed a cell for each until now.
   */
  it("holds one cell per name, and every cell's base is unique", () => {
    expect(new Set(pool.map((c) => c.base)).size).toBe(pool.length);
    expect(new Set(pool.map((c) => c.name)).size).toBe(pool.length);
    expect(pool.length).toBeLessThan(cards.cards.length);
  });

  /**
   * A decklist can never hold a token or one of the two typeless helpers, so offering them would be
   * offering an illegal card. Same filter the synergy lists use: no domain and not a battlefield.
   */
  it("leaves out the tokens and the two typeless helpers", () => {
    expect(pool.length).toBe(926);
    for (const c of pool) expect(c.domains.length > 0 || c.type.includes("battlefield"), c.base).toBe(true);
    expect(pool.find((c) => c.base === "UNL-T05")).toBeUndefined();  // Gold
    expect(pool.find((c) => c.base === "UNL-T08")).toBeUndefined();  // XP Tracker, no type at all
  });

  // 94 legend bases are only 49 names — 45 of them print a main-set base AND a starter reissue.
  it("carries 49 legend names and all 66 battlefields", () => {
    expect(pool.filter((c) => c.type.includes("legend")).length).toBe(49);
    expect(pool.filter((c) => c.type.includes("battlefield")).length).toBe(66);
  });

  it("shows exactly one cell for Vi, Destructive: the canonical, earlier OGN-036", () => {
    const hits = pool.filter((c) => c.name === "Vi, Destructive");
    expect(hits.length).toBe(1);
    expect(hits[0]!.base).toBe(VI);
  });

  // Runes are printed only under Origins and reprinted in Vendetta (VEN-R0x) — one name each.
  it("shows six runes, not twelve", () => {
    expect(pool.filter((c) => c.type.includes("rune")).length).toBe(6);
  });
});

describe("a name's other printings (#104)", () => {
  it("lists a reprint's other base, canonical order, excluding itself", () => {
    expect(otherBasesOf(cards, VI)).toEqual([VI_VEN]);
    expect(otherBasesOf(cards, VI_VEN)).toEqual([VI]);
  });

  it("returns nothing for a name with only one base", () => {
    expect(otherBasesOf(cards, FORGE)).toEqual([]);
  });

  it("resolves the canonical base for any printing of a name", () => {
    expect(canonicalBase(cards, VI)).toBe(VI);
    expect(canonicalBase(cards, VI_VEN)).toBe(VI);
    expect(canonicalBase(cards, FORGE)).toBe(FORGE);
  });
});

describe("which deck zone a card belongs to", () => {
  it("reads the zone off the card's own type", () => {
    expect(zoneOf(cards.get(LADY)!)).toBe("legend");
    expect(zoneOf(cards.get(PLAZA)!)).toBe("battlefields");
    expect(zoneOf(cards.get(MIND_RUNE)!)).toBe("runes");
    expect(zoneOf(cards.get(LUX)!)).toBe("main");
    expect(zoneOf(cards.get(FORGE)!)).toBe("main");
  });
});

describe("filtering the pool", () => {
  it("matches a search against the card's name", () => {
    const hits = filterPool(cards, { search: "grand plaza" });
    expect(hits.map((c) => c.base)).toContain(PLAZA);
  });

  it("matches a search against the rules text, with the icon tokens spelled out", () => {
    // SFD-088 prints ":rb_energy_4::rb_rune_mind:…"; a player searching "4 Energy" means that card.
    const hits = filterPool(cards, { search: "4 energy + 4 mind power" });
    expect(hits.length).toBeGreaterThan(0);
    for (const c of hits) expect(`${c.text ?? ""}${c.effect ?? ""}`).toMatch(/:rb_energy_4:/);
  });

  /**
   * #109: a player looking for the Lux legend types "lux", and every one of the 94 legends is
   * printed as a bare epithet — the champion's name is only ever a tag. The Legend zone answered
   * "0 cards" to `lux`, `ahri` and `master yi` until the tags joined the haystack.
   */
  it("matches a search against the tags, which is where a champion's name lives", () => {
    const legends = filterPool(cards, { search: "lux", zone: "legend" });
    expect(legends.map((c) => c.base)).toContain(LADY);
    expect(cards.get(LADY)!.name).not.toMatch(/lux/i);
    // The same line answers a tribal search: OGN-088 Mega-Mech is a Mech with no rules text at all.
    const mechs = filterPool(cards, { search: "mech" });
    expect(mechs.map((c) => c.base)).toContain("OGN-088");
    expect(cards.get("OGN-088")!.text).toBeNull();
  });

  /**
   * #112: picking a legend preselects its two domains, and every one of the 66 battlefields
   * indicates none, so a `some` test emptied the Battlefields zone the moment a list had a legend.
   * A card that indicates no domain is inside every identity — which is what `inIdentity` says with
   * its `every` over an empty list — so it passes every domain filter too.
   */
  it("keeps the domainless cards under a domain filter, which is all 66 battlefields", () => {
    const fields = filterPool(cards, { zone: "battlefields", domains: ["calm", "mind"] });
    expect(fields.length).toBe(filterPool(cards, { zone: "battlefields" }).length);
    expect(fields.length).toBe(66);
    for (const c of fields) expect(c.domains, c.base).toEqual([]);
    // A card that DOES indicate a domain is still filtered on it.
    for (const c of filterPool(cards, { domains: ["calm"] })) {
      expect(c.domains.length === 0 || c.domains.includes("calm"), c.base).toBe(true);
    }
  });

  it("scopes the Champion zone to the legend's champion tag", () => {
    const hits = filterPool(cards, { zone: "champion", legend: LADY });
    expect(hits.map((c) => c.base)).toContain(LUX);
    for (const c of hits) expect(c.tags, c.base).toContain("Lux");
  });

  it("says so rather than guessing when the Champion zone has no legend to scope to", () => {
    expect(filterPool(cards, { zone: "champion", legend: null })).toEqual([]);
  });

  // Runes are printed only under Origins and reprinted in Vendetta — one cell per name, not one per
  // base (#104): the zone showed twelve until the pool started grouping by name.
  it("shows six runes under the Runes zone, not twelve", () => {
    const runes = filterPool(cards, { zone: "runes" });
    expect(runes.length).toBe(6);
    expect(new Set(runes.map((c) => c.name)).size).toBe(6);
  });

  it("keeps a card outside the legend's identity in the list rather than hiding it", () => {
    // Domain Identity is a mark on the cell, not a filter: hiding the answer is what "What to add"
    // is forbidden from doing, and the same rule holds here.
    const all = filterPool(cards, { zone: "main" });
    const fury = all.filter((c) => c.domains.includes("fury"));
    expect(fury.length).toBeGreaterThan(0);
  });

  it("filters by domain, by set and by cost, and treats 7 as 7 or more", () => {
    for (const c of filterPool(cards, { domains: ["fury"] })) expect(c.domains.length === 0 || c.domains.includes("fury"), c.base).toBe(true);
    for (const c of filterPool(cards, { set: "VEN" })) expect(c.set, c.base).toBe("VEN");
    for (const c of filterPool(cards, { cost: 2 })) expect(c.energy, c.base).toBe(2);
    const big = filterPool(cards, { cost: 7 });
    expect(big.length).toBeGreaterThan(0);
    for (const c of big) expect(c.energy ?? -1, c.base).toBeGreaterThanOrEqual(7);
  });

  it("tells Equipment apart from the rest of the gear, since Equipment is not a type", () => {
    const equip = filterPool(cards, { type: "equipment" });
    expect(equip.length).toBe(40);
    for (const c of equip) {
      expect(c.type, c.base).toContain("gear");
      expect(c.tags, c.base).toContain("Equipment");
    }
    const gear = filterPool(cards, { type: "gear" });
    expect(gear.length).toBeGreaterThan(equip.length);
  });

  it("sorts by name, by cost and by code, and always deterministically", () => {
    const byName = filterPool(cards, { zone: "battlefields", sort: "name" }).map((c) => c.name);
    expect(byName).toEqual([...byName].sort((a, b) => a.localeCompare(b)));
    const byCost = filterPool(cards, { zone: "main", sort: "cost" }).map((c) => c.energy ?? 0);
    expect(byCost).toEqual([...byCost].sort((a, b) => a - b));
    expect(filterPool(cards, { sort: "code" })).toEqual(filterPool(cards, { sort: "code" }));
  });
});

/**
 * #135: `Deck.unresolved` discarded the section its line was written under, and `deckEntries`
 * re-emitted every one of them as "main" — so a misspelling in a sideboard silently moved into the
 * Main Deck the first time the list was saved through the builder. No counted bag changes (an
 * unresolved line never enters one), but it rewrites what the player typed.
 */
describe("a line the pool does not recognise", () => {
  it("comes back under the header it was written under", () => {
    const deck = loadDeck("Legend\n1 Nine-Tailed Fox\nMain Deck\n3 Fox-Fire\nSideboard\n2 Some Totally Unknown Card Name\n", cards);
    expect(deck.unresolved).toEqual([{ raw: "Some Totally Unknown Card Name", count: 2, section: "sideboard" }]);
    const text = builderText(deck, cards);
    const [beforeSide, afterSide] = text.split(/^Sideboard$/m) as [string, string];
    expect(afterSide, "the unrecognised line is not under Sideboard").toContain("2 Some Totally Unknown Card Name");
    expect(beforeSide).not.toContain("Some Totally Unknown Card Name");
  });
});

describe("the caps a click has to respect", () => {
  it("stops at three of a name in the Main Deck (103.2.b)", () => {
    let deck = emptyDeck();
    for (let i = 0; i < 5; i++) deck = addCard(deck, FORGE, cards);
    expect(copiesOf(deck, FORGE)).toBe(3);
    const cap = capOf(deck, FORGE, cards);
    expect(cap).toMatchObject({ held: 3, max: 3, full: true });
    expect(cap.why).toContain("3");
  });

  /**
   * 103.2.b counts NAMES, and Riot reprints a card under a second base code — `Vi, Destructive` is
   * both OGN-036 and VEN-167. The pool shows one cell (OGN-036, #104), but the cap has to hold even
   * when a paste names three of one base and one of the other, or the builder would let six copies
   * of one card through.
   */
  it("counts a reprint's other base against the same three (#104)", () => {
    expect(otherBasesOf(cards, VI)).toEqual([VI_VEN]);
    let deck = emptyDeck();
    for (let i = 0; i < 3; i++) deck = addCard(deck, VI, cards);
    expect(capOf(deck, VI_VEN, cards).full).toBe(true);
    deck = addCard(deck, VI_VEN, cards);
    expect(copiesOf(deck, VI_VEN)).toBe(0);
  });

  it("lets a card past three when its own text says so (002)", () => {
    let deck = emptyDeck();
    for (let i = 0; i < 6; i++) deck = addCard(deck, SPIDERLING, cards);
    expect(copiesOf(deck, SPIDERLING)).toBe(6);
    expect(capOf(deck, SPIDERLING, cards).max).toBe(Infinity);
  });

  it("takes one battlefield of a name and three battlefields in all (103.4.a, 103.4.c)", () => {
    let deck = emptyDeck();
    deck = addCard(deck, PLAZA, cards);
    deck = addCard(deck, PLAZA, cards);
    expect(copiesOf(deck, PLAZA)).toBe(1);
    const others = poolOf(cards).filter((c) => c.type.includes("battlefield") && c.base !== PLAZA);
    for (const c of others.slice(0, 4)) deck = addCard(deck, c.base, cards);
    expect(zoneCounts(deck).battlefields).toBe(3);
  });

  /**
   * #123: the badge across a blocked cell has to name the rule that BINDS. A fourth battlefield is
   * refused by the three already in the list, not by the one copy of its own name, and the cell
   * used to read "0 of 1" there while the accessible name said "3 of 3 battlefields".
   */
  it("badges a blocked cell with the count of the rule that refuses it", () => {
    let deck = emptyDeck();
    const fields = poolOf(cards).filter((c) => c.type.includes("battlefield"));
    for (const c of fields.slice(0, 3)) deck = addCard(deck, c.base, cards);
    const fourth = capOf(deck, fields[3]!.base, cards);
    expect(fourth).toMatchObject({ held: 0, full: true, badge: "3 of 3" });
    expect(capOf(deck, fields[0]!.base, cards).badge).toBe("1 of 1");

    let main = emptyDeck();
    for (let i = 0; i < 3; i++) main = addCard(main, FORGE, cards);
    expect(capOf(main, FORGE, cards).badge).toBe("3 of 3");
    expect(capOf(main, PLAZA, cards).badge).toBe("");

    let runes = emptyDeck();
    for (let i = 0; i < 12; i++) runes = addCard(runes, MIND_RUNE, cards);
    expect(capOf(runes, ORDER_RUNE, cards).badge).toBe("12 of 12");
  });

  it("takes twelve runes and no more (103.3.a)", () => {
    let deck = emptyDeck();
    for (let i = 0; i < 20; i++) deck = addCard(deck, MIND_RUNE, cards);
    expect(copiesOf(deck, MIND_RUNE)).toBe(12);
    expect(capOf(deck, ORDER_RUNE, cards).full).toBe(true);
  });

  it("does not cap the Main Deck at 40, because 103.2 is a floor and the checklist reports the rest", () => {
    let deck = emptyDeck();
    const units = poolOf(cards).filter((c) => zoneOf(c) === "main").slice(0, 20);
    for (const c of units) for (let i = 0; i < 3; i++) deck = addCard(deck, c.base, cards);
    expect(zoneCounts(deck).main).toBe(60);
  });

  it("replaces the legend instead of refusing the click, since only one is ever wanted", () => {
    let deck = addCard(emptyDeck(), LADY, cards);
    const other = poolOf(cards).find((c) => c.type.includes("legend") && c.base !== LADY)!;
    deck = addCard(deck, other.base, cards);
    expect(deck.legend).toBe(other.base);
  });

  it("removes a copy at a time and drops the row at the last one", () => {
    let deck = addCard(addCard(emptyDeck(), FORGE, cards), FORGE, cards);
    deck = removeCard(deck, FORGE, cards);
    expect(copiesOf(deck, FORGE)).toBe(1);
    deck = removeCard(deck, FORGE, cards);
    expect(deck.main[FORGE]).toBeUndefined();
  });

  it("never mutates the deck it was handed", () => {
    const deck = emptyDeck();
    const after = addCard(deck, FORGE, cards);
    expect(deck.main).toEqual({});
    expect(after).not.toBe(deck);
  });
});

/**
 * A list a player pastes can name either printing of a reprint — `loadDeck` resolves whatever code
 * is written — so a Deck can arrive holding two bags of the same name side by side: two OGN-036 Vi
 * and one VEN-167 Vi, both real entries neither `addCard` nor `removeCard` ever produced (#104).
 * `canonicalizeDeck` is the one place that folds them back onto one base.
 */

/**
 * 103.2.d at click time (#211), the sibling of the 825.3.a hole #208 closed in the checklist. The
 * editor let a fourth Signature card in with no block and no mark: the `S` badge says a card IS a
 * Signature card and never that you already hold three.
 *
 * Every subject here is INSIDE calm + mind, because Domain Identity is reported before any other
 * reason and an off-domain subject would report the wrong rule — the precedence trap that made the
 * first pass of `docs/phase0/walks/2026-09-13-builder-vs-checkbuild.md` wrong in three rows.
 */
describe("103.2.d — Signature cards at click time (#211)", () => {
  const ornn = (): Deck => ({ ...emptyDeck(), legend: ORNN_LEGEND });

  /**
   * The subject is Master Yi and not Ornn, and the move is the whole point of #210's precedence. All
   * three Ornn Signature names are Unique, so on an Ornn board 825.3.a refuses a second copy of one
   * of them BEFORE this rule can count to three — and reporting "3 of 3 Signature cards" there would
   * name a rule the player cannot fix by dropping one. Master Yi's two Signature names carry no
   * Unique, so three Highlanders are legal and Alpha Strike is a genuine on-tag fourth.
   */
  it("refuses a fourth Signature card, counting the DECK rather than the name (103.2.d.1)", () => {
    let deck: Deck = { ...emptyDeck(), legend: YI_LEGEND };
    for (let i = 0; i < 3; i++) deck = addCard(deck, HIGHLANDER, cards);
    expect(copiesOf(deck, HIGHLANDER)).toBe(3);
    // A different NAME, so 103.2.b is nowhere near its cap and only 103.2.d.1 can bind.
    const cap = capOf(deck, ALPHA_STRIKE, cards);
    expect(cap).toMatchObject({ held: 3, full: true, badge: "3 of 3" });
    expect(cap.why).toContain("103.2.d.1");
    expect(cap.why).toContain("regardless of name");
    expect(copiesOf(addCard(deck, ALPHA_STRIKE, cards), ALPHA_STRIKE)).toBe(0);
  });

  it("refuses a Signature card that does not carry the legend's champion tag (103.2.d.2)", () => {
    // At ZERO copies and with only one Signature card in the deck, so neither count can be binding.
    const deck = addCard(ornn(), CAPE, cards);
    const cap = capOf(deck, FOXFIRE, cards);
    expect(cap).toMatchObject({ held: 1, full: true, badge: "Not Ornn" });
    expect(cap.why).toContain("103.2.d.2");
    expect(copiesOf(addCard(deck, FOXFIRE, cards), FOXFIRE)).toBe(0);
  });

  /**
   * The precedence is stated in `signatureCap` and pinned here because getting it wrong is silent: an
   * off-tag Signature card can never be in this deck at ANY quantity, so answering "3 of 3" would name
   * a rule the player has not broken.
   */
  it("reports the tag before the count when both would bind", () => {
    let deck = ornn();
    for (const b of [CAPE, DEATHCROWN, REQUIEM]) deck = addCard(deck, b, cards);
    expect(capOf(deck, FOXFIRE, cards).why).toContain("103.2.d.2");
  });

  it("judges nothing until a legend is named, exactly as the checklist row does", () => {
    // `signatureRule` passes 103.2.d.2 with "Name a legend to also check"; the cell must not guess.
    expect(capOf(emptyDeck(), FOXFIRE, cards).full).toBe(false);
    expect(copiesOf(addCard(emptyDeck(), FOXFIRE, cards), FOXFIRE)).toBe(1);
  });

  /**
   * The subject is read out of the pool rather than named, and it has to be INSIDE calm + mind: the
   * old fixture was Forge of the Future, which is mono-Order, so once `capOf` learned 103.1.b (#212)
   * this test would have passed for the wrong reason — a refusal, dressed as a fall-through.
   */
  it("leaves a card that is not Signature on the 103.2.b path", () => {
    let deck = ornn();
    for (const b of [CAPE, DEATHCROWN, REQUIEM]) deck = addCard(deck, b, cards);
    const cap = capOf(deck, inCalmMind().base, cards);
    expect(cap.full).toBe(false);
    expect(cap.why).toBe("");
  });

  /**
   * SCOPE, and this pin was inverted on 2026-09-13 when #210 shipped. It used to record that the
   * Signature cap could NOT close 825.3.a — the Signature cap stops the FOURTH Signature card while
   * 825.3.a is already broken at the SECOND copy of a Unique one, so a deck whose only Signature cards
   * are copies of one Unique name never reaches three in time. That reasoning still holds and is why
   * 825.3.a needed a cap of its own; what changed is that the cap now exists.
   */
  it("closes #210 through 825.3.a, which the Signature cap could never have reached", () => {
    let deck = ornn();
    for (let i = 0; i < 4; i++) deck = addCard(deck, CAPE, cards);
    expect(copiesOf(deck, CAPE)).toBe(1);
    const unique = checkBuild(deck, cards, "constructed").rules.find((r) => r.rule.startsWith("825.3.a"))!;
    expect(unique.status).toBe("pass");
    // And it is 825.3.a doing it, not the Signature count: one copy is nowhere near three.
    expect(capOf(deck, CAPE, cards).why).toContain("825.3.a");
  });
});

/**
 * 825.3.a at click time (#210): "A deck can contain only one card of a given name if the card has
 * Unique". The editor capped a Unique name at three like any other and only the Construction checklist
 * objected — the first instance of the omission the census found, 103.2.d (#211) the second.
 */
describe("825.3.a — one of each Unique name at click time (#210)", () => {
  const ornn = (): Deck => ({ ...emptyDeck(), legend: ORNN_LEGEND });

  it("refuses the second copy, and names the rule that refuses it", () => {
    const deck = addCard(ornn(), CAPE, cards);
    const cap = capOf(deck, CAPE, cards);
    expect(cap).toMatchObject({ held: 1, max: 1, full: true, badge: "1 of 1", offIdentity: false });
    expect(cap.why).toContain("825.3.a");
    expect(cap.why).toContain("Unique");
  });

  it("is a no-op through addCard, so no consumer of the module can climb past one", () => {
    let deck = ornn();
    for (let i = 0; i < 5; i++) deck = addCard(deck, CAPE, cards);
    expect(copiesOf(deck, CAPE)).toBe(1);
  });

  /**
   * The sideboard counts, unlike 103.2.b's own cap. 825.3.a says "a deck", and Tournament Rules 403.3
   * puts limits on copies of named cards on "the combination of Main Deck and sideboard" — which is
   * exactly the pair of bags `uniqueRule` reads, so the cell and the checklist row cannot drift.
   */
  it("counts the sideboard with the Main Deck, in both directions", () => {
    const inMain = addCard(ornn(), CAPE, cards);
    expect(sideboardCapOf(inMain, CAPE, cards).full).toBe(true);
    expect(sideboardCapOf(inMain, CAPE, cards).why).toContain("825.3.a");
    expect(zoneCounts(addToSideboard(inMain, CAPE, cards)).sideboard).toBe(0);

    const inSide = addToSideboard(ornn(), CAPE, cards);
    expect(zoneCounts(inSide).sideboard).toBe(1);
    expect(capOf(inSide, CAPE, cards).full).toBe(true);
    expect(copiesOf(addCard(inSide, CAPE, cards), CAPE)).toBe(0);
  });

  /**
   * PRECEDENCE, and the case is the canonical Ornn list rather than a corner: one of each of his three
   * Signature names is three Signature cards AND one of a Unique name, so a second Forgefire Cape is
   * refused by 103.2.d.1 and 825.3.a at once. The answer has to be 825.3.a, because 825.3.b keeps the
   * two caps independent — "any combination of three Signature cards, but still only one of each named
   * Unique card" — so dropping Shurelya's Requiem would NOT make room for a second Cape, and pointing a
   * player at the Signature count would send them to fix a rule that is not what stopped them.
   */
  it("reports 825.3.a ahead of the Signature count when both bind", () => {
    let deck = ornn();
    for (const b of [CAPE, DEATHCROWN, REQUIEM]) deck = addCard(deck, b, cards);
    const cap = capOf(deck, CAPE, cards);
    expect(cap.why).toContain("825.3.a");
    expect(cap.why).not.toContain("103.2.d.1");
    // And the tag still outranks both: an off-tag Signature card can never be here at any quantity.
    expect(capOf(deck, FOXFIRE, cards).why).toContain("103.2.d.2");
  });

  /**
   * The whole population of 825.3.a is three cards, so the thing worth pinning is that it fires for
   * those and for nothing else: a Signature name without the keyword still goes to three copies.
   * Which of the OTHER caps then reports the fourth click is not this rule's business — three
   * Highlanders are three copies of a name AND three Signature cards, so 103.2.b and 103.2.d.1 both
   * bind and the message names the second. What must not appear is 825.3.a.
   */
  it("leaves a Signature name that is NOT Unique on the three-copy path", () => {
    let deck: Deck = { ...emptyDeck(), legend: YI_LEGEND };
    for (let i = 0; i < 4; i++) deck = addCard(deck, HIGHLANDER, cards);
    expect(copiesOf(deck, HIGHLANDER)).toBe(3);
    expect(capOf(deck, HIGHLANDER, cards).why).not.toContain("825.3.a");
    expect(capOf(deck, HIGHLANDER, cards).full).toBe(true);
  });

  /**
   * The two card-text caps — Spiderling's "any number" and `[Unique]` — are DISJOINT over this pool, so
   * which of them wins has never been decided and `capOf` does not pretend otherwise. Pinned as a
   * tripwire rather than as a fact: the day one card prints both, this goes red and the question gets
   * asked, instead of the answer falling out of whichever branch happens to run first.
   */
  it("holds the two card-text copy caps disjoint over the whole pool", () => {
    const printings = cards.cards;
    expect(printings.length).toBeGreaterThan(1000);          // non-vacuity: the sweep has a haystack
    const unique = printings.filter((c) => UNIQUE.test(c.text ?? ""));
    const anyNumber = printings.filter((c) => ANY_NUMBER.test(c.text ?? ""));
    expect(unique.map((c) => c.base)).toEqual([CAPE, DEATHCROWN, REQUIEM]);
    expect(new Set(unique.map((c) => c.name)).size).toBe(3);
    expect(anyNumber.length).toBeGreaterThan(0);
    expect(unique.filter((c) => ANY_NUMBER.test(c.text ?? ""))).toEqual([]);
  });

  it("agrees with the Construction checklist on the deck it produces", () => {
    let deck = ornn();
    for (let i = 0; i < 3; i++) deck = addCard(deck, CAPE, cards);
    const row = checkBuild(deck, cards, "constructed").rules.find((r) => r.rule.startsWith("825.3.a"))!;
    expect(row.status).toBe("pass");
  });
});

/**
 * 103.1.b at click time (#212). The rule used to live in `web/builder.ts` alone, so it reached a player
 * clicking the POOL and no other consumer of this module — including the deck column's own `+`, which
 * reads `capOf`. These are the model half; `test/dom/builder.dom.test.ts` reads both buttons.
 */
describe("103.1.b — Domain Identity at click time (#212)", () => {
  const ornn = (): Deck => ({ ...emptyDeck(), legend: ORNN_LEGEND });   // calm + mind
  const OFF = "OGN-001";                                                // Blazing Scorcher, mono-fury

  it("refuses an off-domain card in the model, not only in the DOM", () => {
    const cap = capOf(ornn(), OFF, cards);
    expect(cap).toMatchObject({ full: true, offIdentity: true, badge: "" });
    expect(cap.why).toContain("Outside calm + mind");
    expect(cap.why).toContain("103.1.b");
    expect(addCard(ornn(), OFF, cards).main).toEqual({});
  });

  /** An imported list can already hold copies, and the cap reports the real number rather than zero. */
  it("keeps refusing a card an imported list already holds, and counts it honestly", () => {
    const imported: Deck = { ...emptyDeck(), legend: ORNN_LEGEND, main: { [OFF]: 2 } };
    const cap = capOf(imported, OFF, cards);
    expect(cap).toMatchObject({ held: 2, max: 0, full: true, offIdentity: true });
    expect(addCard(imported, OFF, cards).main).toEqual({ [OFF]: 2 });
  });

  /**
   * The Rune Deck has its own checklist row, so a rune is refused under its own paragraph: 103.3.a.1,
   * "Cards in the Rune Deck must be of the Domain Identity of your Champion Legend". The button may not
   * cite a different rule from the one the checklist would cite for the same card.
   */
  /**
   * 103.4.b, "Subject to Domain Identity if applicable", is the battlefields' own paragraph and it
   * bites NOTHING today — for a measured reason, not an assumed one. Two docblocks now lean on that
   * (`identityCap` here and `identityRule` in src/build.ts), so the day a set prints a battlefield
   * carrying a domain, this goes red and says so rather than leaving both of them silently wrong.
   */
  it("has no battlefield that Domain Identity could reach (103.4.b, 'if applicable')", () => {
    const fields = cards.cards.filter((c) => c.type.includes("battlefield"));
    expect(cards.cards.length).toBeGreaterThan(1000);       // non-vacuity: the sweep has a haystack
    expect(fields.length).toBe(66);
    expect(new Set(fields.map((c) => c.name)).size).toBe(66);
    expect(fields.filter((c) => c.domains.length > 0)).toEqual([]);
    // And the gate agrees: a battlefield is never refused, whatever the legend's domains are.
    for (const f of fields.slice(0, 12)) expect(capOf(ornn(), f.base, cards).offIdentity, f.base).toBe(false);
  });

  it("cites the Rune Deck's own paragraph for a rune", () => {
    const fury = poolOf(cards).find((c) => c.type.includes("rune") && c.domains.includes("fury"))!;
    const cap = capOf(ornn(), fury.base, cards);
    expect(cap.offIdentity).toBe(true);
    expect(cap.why).toContain("103.3.a.1");
    expect(cap.why).not.toContain("103.1.b");
  });

  /**
   * A legend DICTATES the identity (103.1.b.2) rather than obeying it, and `addCard` replaces the one
   * already named. Until 2026-09-13 the editor refused an off-domain legend in the Legend zone, so
   * switching legends meant removing one first — a zone the census had not probed.
   */
  it("never refuses a legend, and swapping one replaces it", () => {
    const cap = capOf(ornn(), LADY, cards);            // Mind + Order, nothing in common with calm + mind
    expect(cap).toMatchObject({ full: false, offIdentity: false });
    expect(addCard(ornn(), LADY, cards).legend).toBe(LADY);
  });

  /**
   * The consequence of that, pinned because it is the thing a reader would worry about: a one-click
   * legend swap on a BUILT deck can invalidate most of the list at once. It is still right, and the
   * last assertion is why — the one click reaches exactly the state the old two-step route reached,
   * since a player who could not click the new legend simply removed the old one first and then
   * clicked it. The refusal bought nothing and cost a step.
   *
   * What the swap must NOT do is drop anything, because then the checklist would certify a list the
   * player does not have. It drops nothing, both identity rows report the breakage under their own
   * paragraphs, the `+` refuses the now-off-domain cards, and Auto runes repairs the Rune Deck.
   */
  it("swaps the legend on a built deck without dropping a card, and says what broke", () => {
    const built: Deck = {
      ...emptyDeck(),
      legend: ORNN_LEGEND,                                        // calm + mind
      runes: { [poolOf(cards).find((c) => c.type.includes("rune") && c.domains.includes("calm"))!.base]: 12 },
      main: { "OGN-043": 3, [CAPE]: 1 },
    };
    const NEW_LEGEND = "OGN-251";                                 // Loose Cannon, fury + chaos
    const swapped = addCard(built, NEW_LEGEND, cards);
    expect(swapped.legend).toBe(NEW_LEGEND);
    expect(zoneCounts(swapped).main).toBe(zoneCounts(built).main);
    expect(zoneCounts(swapped).runes).toBe(zoneCounts(built).runes);

    const rules = checkBuild(swapped, cards, "constructed").rules;
    expect(rules.find((r) => r.rule === "103.1.b")!.status).toBe("fail");
    expect(rules.find((r) => r.rule.startsWith("103.3.a"))!.detail).toContain("103.3.a.1");
    expect(capOf(swapped, "OGN-043", cards).offIdentity).toBe(true);
    expect(autoRunes(swapped, cards).runes).not.toEqual(swapped.runes);

    // The justification for allowing the click at all: it is the old route in one step, not a new one.
    expect(addCard(removeCard(built, ORNN_LEGEND, cards), NEW_LEGEND, cards)).toEqual(swapped);
  });

  it("judges nothing until a legend is named, exactly as identityRule does", () => {
    const cap = capOf(emptyDeck(), OFF, cards);
    expect(cap.offIdentity).toBe(false);
    expect(copiesOf(addCard(emptyDeck(), OFF, cards), OFF)).toBe(1);
  });

  /**
   * The sideboard is refused too, which is what the pool cell already did before the rule moved down a
   * layer. Not a guess: Tournament Rules 403.4 exchanges a sideboard card "1 for 1 with Main Deck
   * cards" and 403.4.b says a player "may not change their Runes, Legend, or Battlefields at any point
   * after deck registration", so the identity it would be swapped into is fixed for the whole match.
   */
  it("reaches the sideboard", () => {
    const cap = sideboardCapOf(ornn(), OFF, cards);
    expect(cap.offIdentity).toBe(true);
    expect(zoneCounts(addToSideboard(ornn(), OFF, cards)).sideboard).toBe(0);
  });

  /**
   * #215: the button refused an off-identity sideboard card and the checklist called the list legal,
   * which was the ONE disagreement the tier audit found between the two layers. The checklist now
   * carries its own row for it, cited to the Tournament Rules because a sideboard card is not in the
   * deck at registration — TR 601.1.b makes the Main Deck exactly 40 and 601.1.c keeps the sideboard
   * beside it — and what makes it illegal is what it is FOR: TR 403.4 swaps it 1 for 1 into the Main
   * Deck and TR 403.4.b freezes the Legend for the match.
   *
   * This asserts the AGREEMENT, which is what the issue was about. The row's own cases — no legend,
   * the wording, its place in the order — belong in `test/build.test.ts` beside the other three
   * sideboard rows, and that file is not this lane's to write in.
   */
  it("agrees with the checklist about the sideboard, which it did not before #215", () => {
    const held: Deck = { ...ornn(), sideboard: { [OFF]: 1 } };
    const rules = checkBuild(held, cards, "constructed").rules;
    const row = rules.find((r) => r.rule === "Tournament Rules 403.4.b")!;
    expect(row, "the row has to exist for the agreement to mean anything").toBeDefined();
    expect(row.status).toBe("fail");
    expect(row.detail).toContain(cards.get(OFF)!.name);
    expect(sideboardCapOf(ornn(), OFF, cards).full).toBe(true);

    // The control: an IN-identity sideboard card passes the row and the button takes it, so the row
    // is not simply failing for everything.
    const ok = poolOf(cards).find(
      (c) => zoneOf(c) === "main" && c.domains.length > 0
        && c.domains.every((d) => cards.domainsOf(ORNN_LEGEND).includes(d)),
    )!;
    const fine: Deck = { ...ornn(), sideboard: { [ok.base]: 1 } };
    expect(checkBuild(fine, cards, "constructed").rules.find((r) => r.rule === "Tournament Rules 403.4.b")!.status).toBe("pass");
    expect(sideboardCapOf(ornn(), ok.base, cards).full).toBe(false);
  });

  /**
   * The cross-layer sweep, and the reason the rule was worth moving rather than copying: for EVERY
   * card the pool offers, the button refuses exactly what the Construction checklist's identity rows
   * fail, under the paragraph those rows cite. A disagreement between the two is the defect class this
   * issue is about, and it is now measured over the whole pool rather than on one subject.
   */
  it("refuses exactly what the checklist's identity rows fail, over the whole pool", () => {
    const empty = ornn();
    let refused = 0, allowed = 0, checked = 0;
    for (const card of poolOf(cards)) {
      if (card.type.includes("legend")) continue;
      const zone = zoneOf(card);
      const cap = capOf(empty, card.base, cards);
      const held: Deck = { ...empty, [zone]: { [card.base]: 1 } };
      const rules = checkBuild(held, cards, "constructed").rules;
      // A rune's row also fails for the COUNT (one rune is not twelve), so the identity half of that
      // row is read from its detail; every other zone reports 103.1.b on its own row.
      const checklistSaysOff = zone === "runes"
        ? rules.find((r) => r.rule.startsWith("103.3.a"))!.detail.includes("103.3.a.1")
        : rules.find((r) => r.rule === "103.1.b")!.status === "fail";
      expect(cap.offIdentity, `${card.base} ${card.name}`).toBe(checklistSaysOff);
      checked++;
      if (cap.offIdentity) refused++; else allowed++;
    }
    // Non-vacuity: the sweep saw the whole pool bar the legends, and both answers really occur.
    expect(checked).toBe(poolOf(cards).filter((c) => !c.type.includes("legend")).length);
    expect(refused).toBeGreaterThan(100);
    expect(allowed).toBeGreaterThan(100);
  });
});

/**
 * 103.2.a.2 and 103.2.d.3 at click time. The census named TWO rules living in `web/builder.ts` and in
 * no model — Domain Identity and the champion tag — and #212 moved the first. This is the second, and
 * with it 103.2.d.3, because `setChampion` never consulted `capOf` at all: the Champion button had the
 * same shape of defect as the `+`, one step less reachable because the pool zone filters its cells.
 *
 * The player-facing half is the opposite direction, and it is the one that shipped a wrong refusal: a
 * Champion click DESIGNATES rather than adds, so a full copy cap must NOT refuse it.
 */
describe("the Chosen Champion at click time (103.2.a.2, 103.2.d.3)", () => {
  const ANNIE_LEGEND = "OGS-017";   // Dark Child - Starter, champion tag Annie
  const STUBBORN = "OGS-010";       // Annie, Stubborn — unit, tagged Annie, not Signature
  const TIBBERS = "OGS-018";        // Tibbers — unit, tagged Annie, SIGNATURE
  const annie = (): Deck => ({ ...emptyDeck(), legend: ANNIE_LEGEND });

  /**
   * The defect this fix is really for: three copies of your own champion candidate is the ORDINARY
   * build, and the cell refused the designation with "3 of 3 · a Main Deck takes three of a name
   * (103.2.b)" — a cap answering a question nobody asked, since designating adds nothing when the
   * copies are already there. Measured on the live editor before the change.
   */
  it("designates a champion the list already holds a playset of", () => {
    let deck = annie();
    for (let i = 0; i < 3; i++) deck = addCard(deck, STUBBORN, cards);
    expect(capOf(deck, STUBBORN, cards).full, "the copy cap IS full — that is the point").toBe(true);
    expect(championCapOf(deck, STUBBORN, cards).full).toBe(false);
    const after = setChampion(deck, STUBBORN, cards);
    expect(after.champion).toBe(STUBBORN);
    expect(after.main[STUBBORN]).toBe(3);        // designating moved no copies
  });

  /**
   * And it still binds where the list holds NO copy of that card, because there the designation really
   * does add one. 103.2.b counts a NAME, so three of one printing bar a designation of another.
   */
  it("refuses a designation that would add a fourth copy of a name", () => {
    let deck: Deck = { ...emptyDeck(), legend: LADY };
    for (let i = 0; i < 3; i++) deck = addCard(deck, LUX, cards);
    const other = otherBasesOf(cards, LUX)[0];
    if (!other) return;                          // only meaningful while Lux has a second printing
    expect(copiesOf(deck, other)).toBe(0);
    expect(championCapOf(deck, other, cards).full).toBe(true);
    expect(setChampion(deck, other, cards).champion).toBeNull();
  });

  it("refuses a Signature card, which is 103.2.d.3's own worked example", () => {
    const cap = championCapOf(annie(), TIBBERS, cards);
    expect(cap).toMatchObject({ full: true, badge: "Signature" });
    expect(cap.why).toContain("103.2.d.3");
    expect(setChampion(annie(), TIBBERS, cards).champion).toBeNull();
  });

  it("refuses a unit that does not carry the legend's champion tag (103.2.a.2)", () => {
    const offTag = poolOf(cards).find(
      (c) => zoneOf(c) === "main" && c.type.includes("unit") && !c.signature && !c.tags.includes("Annie")
        && c.domains.length > 0 && c.domains.every((d) => cards.domainsOf(ANNIE_LEGEND).includes(d)),
    )!;
    const cap = championCapOf(annie(), offTag.base, cards);
    expect(cap).toMatchObject({ full: true, badge: "Not Annie" });
    expect(cap.why).toContain("103.2.a.2");
    expect(setChampion(annie(), offTag.base, cards).champion).toBeNull();
  });

  it("refuses an off-domain card before it asks about the tag", () => {
    const off = poolOf(cards).find(
      (c) => zoneOf(c) === "main" && c.domains.length > 0
        && !c.domains.every((d) => cards.domainsOf(ANNIE_LEGEND).includes(d)),
    )!;
    const cap = championCapOf(annie(), off.base, cards);
    expect(cap.offIdentity).toBe(true);
    expect(setChampion(annie(), off.base, cards).champion).toBeNull();
  });

  /**
   * The "unit" half of 103.2.a.2 is REAL and is currently unreachable as the reported reason, which is
   * worth knowing rather than discovering by rewriting the test. Measured 2026-09-13: 48 main-deck
   * non-unit cards carry a champion tag and ALL 48 are Signature cards, so 103.2.d.3 always answers
   * first. The clause stays because it is the rule; this pins why nobody ever sees it.
   */
  it("has no non-unit champion candidate to refuse, because every tagged non-unit is Signature", () => {
    const tags = new Set<string>();
    for (const c of cards.cards) if (c.type.includes("legend")) {
      const t = championTagOf(c.base, cards);
      if (t) tags.add(t);
    }
    expect(tags.size).toBeGreaterThan(40);                       // non-vacuity
    const taggedNonUnits = poolOf(cards).filter(
      (c) => zoneOf(c) === "main" && !c.type.includes("unit") && c.tags.some((t) => tags.has(t)),
    );
    expect(taggedNonUnits.length).toBeGreaterThan(0);            // non-vacuity
    expect(taggedNonUnits.filter((c) => !c.signature)).toEqual([]);
  });

  /**
   * With no legend there is no tag to compare against, so the model judges nothing — exactly as
   * `championRule` reports `unknown` rather than guessing. The UI does not OFFER the button in that
   * state, which is a separate and deliberate decision made in `web/builder.ts`.
   */
  it("judges nothing until a legend is named", () => {
    expect(championCapOf(emptyDeck(), STUBBORN, cards).full).toBe(false);
    expect(setChampion(emptyDeck(), STUBBORN, cards).champion).toBe(STUBBORN);
  });

  it("agrees with the Construction checklist on the deck it produces", () => {
    const deck = setChampion(annie(), STUBBORN, cards);
    const row = checkBuild(deck, cards, "constructed").rules.find((r) => r.rule === "103.2.a.2")!;
    expect(row.status).toBe("pass");
  });
});

/**
 * THE IMPORT PATH, which passes through none of the caps by design: a list arriving by paste, deck code
 * or Piltover Archive import goes `loadDeck` -> `canonicalizeDeck` and never near `capOf`. That is
 * right — a pasted list is the player's, and silently "fixing" it would be the worst outcome of all,
 * because the checklist would then certify a list the player does not have. So the contract for an
 * already-illegal list is three things, and this pins all three: it arrives INTACT, the checklist
 * reports every break, and no button can make it worse.
 *
 * The fixture is illegal nine ways at once: off-domain card, off-tag champion, under 40 with an
 * unreadable line, four of a name, two of a Unique name, five Signature cards, thirteen runes, four
 * battlefields, and a banned card.
 */
describe("a list that arrives already illegal (the import path)", () => {
  const ILLEGAL = `Legend
1 Fire Below the Mountain

Champion
1 Clockwork Keeper

Battlefields
1 The Grand Plaza
1 Aspirant's Climb
1 Back-Alley Bar
1 Power Nexus

Runes
7 Calm Rune
6 Mind Rune

Main Deck
2 Forgefire Cape
1 Rabadon's Deathcrown
1 Shurelya's Requiem
1 Fox-Fire
4 Charm
1 Blazing Scorcher
2 Some Totally Unknown Card Name
`;
  const imported = () => canonicalizeDeck(loadDeck(ILLEGAL, cards), cards);

  it("arrives intact — nothing is silently clamped on the way in", () => {
    const deck = imported();
    expect(deck.main[CAPE]).toBe(2);              // 825.3.a says one
    expect(deck.main["OGN-043"]).toBe(4);         // 103.2.b says three
    expect(deck.main["OGN-001"]).toBe(1);         // outside calm + mind
    expect(zoneCounts(deck).battlefields).toBe(4);// 103.4.a says three
    expect(zoneCounts(deck).runes).toBe(13);      // 103.3.a says twelve
    // And the line the card index could not read is still the player's (#135).
    expect(deck.unresolved).toEqual([{ raw: "Some Totally Unknown Card Name", count: 2, section: "main" }]);
  });

  it("is reported break by break, each under its own paragraph", () => {
    const rules = checkBuild(imported(), cards, "constructed").rules;
    const failed = new Set(rules.filter((r) => r.status === "fail").map((r) => r.rule));
    for (const id of [
      "103.1.b",                          // Blazing Scorcher is mono-fury
      "103.2.a.2",                        // Clockwork Keeper is not tagged Ornn
      "103.2 · Tournament Rules 601.1.b", // under 40, and one line unreadable
      "103.2.b",                          // 4x Charm
      "825.3.a · 825.3.b",                // 2x Forgefire Cape
      "103.2.d",                          // five Signature cards
      "103.3.a · 103.3.a.1",              // thirteen runes
      "103.4.a · 103.4.c",                // four battlefields
      "103.2.e",                          // Aspirant's Climb is banned
    ]) expect(failed.has(id), id).toBe(true);
    // Non-vacuity in the other direction: the legend itself is fine, so not every row simply fails.
    expect(rules.find((r) => r.rule === "103.1")!.status).toBe("pass");
  });

  it("cannot be made worse by any button", () => {
    const deck = imported();
    const main = zoneCounts(deck).main;
    for (const [what, next] of [
      ["a third Unique copy", addCard(deck, CAPE, cards)],
      ["a fifth of a name", addCard(deck, "OGN-043", cards)],
      ["a second off-domain card", addCard(deck, "OGN-001", cards)],
      ["designating the off-tag champion", setChampion(deck, "OGN-044", cards)],
    ] as const) expect(zoneCounts(next).main, what).toBe(main);
    expect(zoneCounts(addCard(deck, "OGN-089", cards)).runes).toBe(13);    // no fourteenth rune
    expect(zoneCounts(addCard(deck, PLAZA, cards)).battlefields).toBe(4);  // no fifth battlefield
  });

  /**
   * And it survives being written back out. `builderText` is what the site stores, so a list that lost
   * a card by being opened in the editor would lose it permanently — compared by CONTENT here, because
   * a first pass compared `JSON.stringify` of the two bags, which is key-ORDER sensitive, and reported
   * a loss that was not there.
   */
  it("survives a round trip through the editor unchanged", () => {
    const deck = imported();
    const back = canonicalizeDeck(loadDeck(builderText(deck, cards), cards), cards);
    const norm = (b: Record<string, number>) => Object.entries(b).sort(([a], [c]) => a.localeCompare(c));
    for (const k of ["main", "battlefields", "runes", "sideboard"] as const) {
      expect(norm(back[k]), k).toEqual(norm(deck[k]));
    }
    expect(back.legend).toBe(deck.legend);
    expect(back.champion).toBe(deck.champion);
    expect(back.unresolved).toEqual(deck.unresolved);
  });
});

describe("folding a reprint split across two bases (#104)", () => {
  it("merges both bags onto the canonical base", () => {
    const deck = canonicalizeDeck({ ...emptyDeck(), main: { [VI]: 2, [VI_VEN]: 1 } }, cards);
    expect(deck.main).toEqual({ [VI]: 3 });
  });

  it("draws one Deck-column row for the merged split", () => {
    const deck = canonicalizeDeck({ ...emptyDeck(), main: { [VI]: 2, [VI_VEN]: 1 } }, cards);
    const rows = zoneRows(deck, cards, "main").filter((r) => r.card.name === "Vi, Destructive");
    expect(rows.length).toBe(1);
    expect(rows[0]!.count).toBe(3);
  });

  it("folds the legend and champion pointers too, so they still match a main-deck key", () => {
    const deck = canonicalizeDeck({ ...emptyDeck(), champion: VI_VEN, main: { [VI]: 2, [VI_VEN]: 1 } }, cards);
    expect(deck.champion).toBe(VI);
  });

  it("stays legal under 103.2.b whichever base the count is split across, even unfolded", () => {
    const deck = { ...emptyDeck(), main: { [VI]: 2, [VI_VEN]: 1 } };
    const copies = checkBuild(deck, cards, "constructed").rules.find((r) => r.rule === "103.2.b")!;
    expect(copies.status).toBe("pass");
  });
});

describe("the Chosen Champion", () => {
  it("puts the champion in the Main Deck as well, which is where 402.1 counts it", () => {
    const deck = setChampion(emptyDeck(), LUX, cards);
    expect(deck.champion).toBe(LUX);
    expect(deck.main[LUX]).toBe(1);
  });

  it("keeps the extra copies when the champion was already in the list", () => {
    let deck = emptyDeck();
    for (let i = 0; i < 3; i++) deck = addCard(deck, LUX, cards);
    deck = setChampion(deck, LUX, cards);
    expect(deck.main[LUX]).toBe(3);
  });

  it("leaves the copies behind when the designation is cleared", () => {
    let deck = setChampion(emptyDeck(), LUX, cards);
    deck = setChampion(deck, null, cards);
    expect(deck.champion).toBeNull();
    expect(deck.main[LUX]).toBe(1);
  });

  it("clears the designation when the last copy is removed", () => {
    let deck = setChampion(emptyDeck(), LUX, cards);
    deck = removeCard(deck, LUX, cards);
    expect(deck.champion).toBeNull();
  });
});

describe("Runes · Auto", () => {
  it("splits twelve runes evenly across a two-domain legend", () => {
    const deck = autoRunes(addCard(emptyDeck(), LADY, cards), cards);
    expect(deck.runes).toEqual({ [MIND_RUNE]: 6, [ORDER_RUNE]: 6 });
    expect(checkBuild(deck, cards, "constructed").rules.find((r) => r.rule.startsWith("103.3.a"))!.status).toBe("pass");
  });

  it("gives all twelve to a single domain", () => {
    // No legend in the pool has one domain, so the split itself is what is measured here.
    const deck = autoRunes({ ...emptyDeck(), legend: LADY }, cards, ["mind"]);
    expect(deck.runes).toEqual({ [MIND_RUNE]: 12 });
  });

  it("replaces whatever was in the Rune Deck rather than adding to it", () => {
    let deck = addCard(emptyDeck(), LADY, cards);
    for (let i = 0; i < 5; i++) deck = addCard(deck, MIND_RUNE, cards);
    deck = autoRunes(deck, cards);
    expect(Object.values(deck.runes).reduce((a, b) => a + b, 0)).toBe(12);
  });

  it("does nothing without a legend, because there are no domains to split between", () => {
    const deck = autoRunes(emptyDeck(), cards);
    expect(deck.runes).toEqual({});
  });
});

describe("the cost curve", () => {
  it("counts the Main Deck by printed Energy and folds everything from 7 up into one bar", () => {
    let deck = emptyDeck();
    deck = addCard(deck, FORGE, cards);                       // 2 Energy
    const dear = poolOf(cards).find((c) => zoneOf(c) === "main" && (c.energy ?? 0) >= 8)!;
    deck = addCard(deck, dear.base, cards);
    const curve = costCurve(deck, cards);
    expect(curve.length).toBe(8);
    expect(curve.map((b) => b.energy)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(curve[2]!.count).toBe(1);
    expect(curve[7]!.count).toBe(1);
    expect(curve[7]!.label).toBe("7+");
  });

  it("counts only the Main Deck: runes and battlefields have no Energy cost to plot", () => {
    let deck = addCard(addCard(emptyDeck(), PLAZA, cards), MIND_RUNE, cards);
    expect(costCurve(deck, cards).every((b) => b.count === 0)).toBe(true);
  });
});

describe("what the builder writes out", () => {
  const LIST = readFileSync(new URL("./fixtures/tournament-lists/atlanta-01.txt", import.meta.url), "utf8");

  /**
   * The builder never invents a storage format: it edits a `Deck` and serialises it with `deckToText`,
   * which is the same text a player pastes. A registered tournament list is the hardest case there is,
   * so it is the one this round-trips.
   */
  it("round-trips a registered list through text without losing a card", () => {
    const deck = loadDeck(LIST, cards);
    const again = loadDeck(builderText(deck, cards), cards);
    expect(again.legend).toBe(deck.legend);
    expect(again.champion).toBe(deck.champion);
    expect(again.main).toEqual(deck.main);
    expect(again.runes).toEqual(deck.runes);
    expect(again.battlefields).toEqual(deck.battlefields);
    expect(again.sideboard).toEqual(deck.sideboard);
  });

  it("round-trips a list built click by click, and that list is legal", () => {
    let deck = addCard(emptyDeck(), LADY, cards);
    deck = setChampion(deck, LUX, cards);
    deck = autoRunes(deck, cards);
    const fields = poolOf(cards).filter((x) => x.type.includes("battlefield") && !cards.legality(x.base, "constructed"));
    for (const c of fields.slice(0, 3)) deck = addCard(deck, c.base, cards);
    // 39 more Main Deck cards inside Mind + Order, three of a name at a time. Banned cards are
    // skipped here rather than blocked by the builder: 103.2.e is the checklist's row to report, and
    // the pool marks them without refusing the click (#23's panel is what warns).
    const legal = poolOf(cards).filter(
      (c) => zoneOf(c) === "main"
        && c.base !== LUX
        && !cards.legality(c.base, "constructed")
        && c.domains.every((d) => d === "mind" || d === "order"),
    );
    for (const c of legal) {
      if (zoneCounts(deck).main >= 40) break;
      for (let i = 0; i < 3 && zoneCounts(deck).main < 40; i++) deck = addCard(deck, c.base, cards);
    }
    expect(zoneCounts(deck).main).toBe(40);
    const report = checkBuild(deck, cards, "constructed");
    expect(report.rules.filter((r) => r.status === "fail").map((r) => `${r.rule}: ${r.detail}`)).toEqual([]);
    expect(loadDeck(builderText(deck, cards), cards).main).toEqual(deck.main);
  });

  it("knows an untouched deck from one with a single card in it", () => {
    expect(isEmptyDeck(emptyDeck())).toBe(true);
    expect(isEmptyDeck(addCard(emptyDeck(), FORGE, cards))).toBe(false);
    expect(isEmptyDeck(addCard(emptyDeck(), LADY, cards))).toBe(false);
  });
});

describe("the sideboard (Tournament Rules 403, 601.1.c)", () => {
  const legend = loadDeck("Legend\n1 Lady of Luminosity - Starter\n", cards);
  // A Main Deck unit legal under Mind + Order, read out of the pool rather than remembered.
  const unit = poolOf(cards).find((c) => zoneOf(c) === "main" && c.domains.every((d) => ["mind", "order"].includes(d)) && c.domains.length === 1 && !/any number/i.test(c.text ?? ""))!;

  /**
   * Every subject is inside Mind + Order. `sideboardCapOf` learned 103.1.b on 2026-09-13 (#212) —
   * Tournament Rules 403.4 swaps a sideboard card "1 for 1 with Main Deck cards" and 403.4.b freezes
   * the Legend for the match, so an off-identity sideboard card can never be played — and the old
   * fixture took the first ten Main Deck cards in set order, most of them outside the identity.
   */
  const inIdentityMain = poolOf(cards).filter(
    (c) => zoneOf(c) === "main" && c.domains.length > 0 && c.domains.every((d) => ["mind", "order"].includes(d)),
  );

  it("caps at ten cards (601.1.c.1)", () => {
    let deck = legend;
    expect(inIdentityMain.length).toBeGreaterThan(11);
    for (const c of inIdentityMain.slice(0, 10)) deck = addToSideboard(deck, c.base, cards);
    expect(zoneCounts(deck).sideboard).toBe(10);
    const eleventh = inIdentityMain[10]!;
    const cap = sideboardCapOf(deck, eleventh.base, cards);
    expect(cap.full).toBe(true);
    expect(cap.why).toContain("601.1.c.1");
    expect(addToSideboard(deck, eleventh.base, cards)).toBe(deck);
  });

  it("counts the copy limit across Main Deck and sideboard together (403.3)", () => {
    let deck = addCard(addCard(legend, unit.base, cards), unit.base, cards);   // 2 in main
    deck = addToSideboard(deck, unit.base, cards);                              // 1 in side -> 3 named
    expect(zoneCounts(deck).sideboard).toBe(1);
    expect(sideboardCapOf(deck, unit.base, cards).full).toBe(true);
    expect(sideboardCapOf(deck, unit.base, cards).why).toContain("403.3");
    // And the main is full too, from the same count.
    expect(capOf(deck, unit.base, cards).full).toBe(true);
    expect(addCard(deck, unit.base, cards).main[unit.base]).toBe(2);
  });

  it("admits Main Deck cards only (601.1.c.2), and the pool's Sideboard zone shows only those", () => {
    const rune = poolOf(cards).find((c) => c.type.includes("rune"))!;
    expect(sideboardCapOf(legend, rune.base, cards).full).toBe(true);
    expect(addToSideboard(legend, rune.base, cards)).toBe(legend);
    const shown = filterPool(cards, { zone: "sideboard" });
    expect(shown.length).toBeGreaterThan(0);
    expect(shown.every((c) => zoneOf(c) === "main")).toBe(true);
  });

  it("takes a copy back, and an empty bag stays empty", () => {
    const deck = addToSideboard(legend, unit.base, cards);
    expect(removeFromSideboard(deck, unit.base).sideboard[unit.base]).toBeUndefined();
    expect(zoneCounts(removeFromSideboard(legend, unit.base)).sideboard).toBe(0);
  });
});
