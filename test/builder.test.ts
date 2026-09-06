import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { checkBuild } from "../src/build.js";
import { loadDeck } from "../src/deck.js";
import {
  addCard,
  autoRunes,
  builderText,
  capOf,
  copiesOf,
  costCurve,
  emptyDeck,
  filterPool,
  isEmptyDeck,
  poolOf,
  removeCard,
  setChampion,
  zoneOf,
  zoneCounts,
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

describe("the pool the builder draws from", () => {
  const pool = poolOf(cards);

  it("holds one cell per base code, never one per printing", () => {
    expect(new Set(pool.map((c) => c.base)).size).toBe(pool.length);
    // 1189 printings collapse to 1042 bases; the alt-arts are not their own cell.
    expect(pool.length).toBeLessThan(cards.cards.length);
  });

  /**
   * A decklist can never hold a token or one of the two typeless helpers, so offering them would be
   * offering an illegal card. Same filter the synergy lists use: no domain and not a battlefield.
   */
  it("leaves out the tokens and the two typeless helpers", () => {
    expect(pool.length).toBe(1030);
    for (const c of pool) expect(c.domains.length > 0 || c.type.includes("battlefield"), c.base).toBe(true);
    expect(pool.find((c) => c.base === "UNL-T05")).toBeUndefined();  // Gold
    expect(pool.find((c) => c.base === "UNL-T08")).toBeUndefined();  // XP Tracker, no type at all
  });

  it("carries all 94 legends and all 66 battlefields", () => {
    expect(pool.filter((c) => c.type.includes("legend")).length).toBe(94);
    expect(pool.filter((c) => c.type.includes("battlefield")).length).toBe(66);
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

  it("scopes the Champion zone to the legend's champion tag", () => {
    const hits = filterPool(cards, { zone: "champion", legend: LADY });
    expect(hits.map((c) => c.base)).toContain(LUX);
    for (const c of hits) expect(c.tags, c.base).toContain("Lux");
  });

  it("says so rather than guessing when the Champion zone has no legend to scope to", () => {
    expect(filterPool(cards, { zone: "champion", legend: null })).toEqual([]);
  });

  it("shows the six runes under the Runes zone, and only those printed in Origins and Vendetta", () => {
    const runes = filterPool(cards, { zone: "runes" });
    expect(runes.length).toBe(12);
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
    for (const c of filterPool(cards, { domains: ["fury"] })) expect(c.domains, c.base).toContain("fury");
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
   * 103.2.b counts NAMES, and Riot reprints a card under a second base code — `Lux, Crownguard` is
   * both OGS-014 and VEN-SP6. Two cells, one cap between them, or the builder would happily offer
   * six copies of one card.
   */
  it("counts the two printings of one name against the same three", () => {
    const twins = poolOf(cards).filter((c) => c.name === "Lux, Crownguard");
    expect(twins.length).toBe(2);
    let deck = emptyDeck();
    for (let i = 0; i < 3; i++) deck = addCard(deck, twins[0]!.base, cards);
    expect(capOf(deck, twins[1]!.base, cards).full).toBe(true);
    deck = addCard(deck, twins[1]!.base, cards);
    expect(copiesOf(deck, twins[1]!.base)).toBe(0);
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
