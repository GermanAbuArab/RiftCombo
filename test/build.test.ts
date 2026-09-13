import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
import { CardIndex } from "../src/cards.js";
import { championTagOf, checkBuild, type BuildReport } from "../src/build.js";

const cards = loadCardIndex();

/**
 * A list that satisfies every rule: Lady of Luminosity (Mind + Order), Lux, Illuminated as the Chosen
 * Champion, 40 Main Deck cards counting it, 12 runes in the two domains, 3 differently named battlefields.
 * Every test below breaks exactly one thing about it, so a failure names the rule it is about.
 */
const LEGAL = `Legend
1 Lady of Luminosity - Starter

Champion
1 Lux, Illuminated

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Runes
6 Mind Rune
6 Order Rune

Main Deck
3 Forge of the Future
3 Ekko, Recurrent
3 Shadow's Call
3 Sacrifice
3 Retreat
3 Lux, Crownguard
3 Watchful Sentry
3 Lecturing Yordle
3 Progress Day
3 Soaring Scout
3 Rally the Troops
3 Fiora, Worthy
2 Sumpworks Map
1 Promising Future`;

const rows = (text: string, format: "constructed" | "2v2" = "constructed"): BuildReport =>
  checkBuild(loadDeck(text, cards), cards, format);
/** Find a row by the first paragraph number it cites, so "103.2" reaches "103.2 · Tournament Rules 601.1.b"
 * without also matching "103.2.b". */
const row = (r: BuildReport, rule: string) =>
  r.rules.find((x) => x.rule === rule || x.rule.startsWith(`${rule} `))!;

describe("103.1 — one Champion Legend", () => {
  it("passes on a list that names one legend, and prints its domains", () => {
    const r = row(rows(LEGAL), "103.1");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Lady of Luminosity");
    expect(r.detail).toContain("mind");
  });

  it("fails when no legend is named", () => {
    const r = row(rows(LEGAL.replace("1 Lady of Luminosity - Starter", "")), "103.1");
    expect(r.status).toBe("fail");
    expect(r.detail).toMatch(/no legend/i);
  });
});

describe("103.2 and Tournament Rules 601.1.b — Main Deck size", () => {
  it("passes on exactly 40, counting the Chosen Champion", () => {
    const r = row(rows(LEGAL), "103.2");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("40");
  });

  it("fails below 40 and names the Core Rules floor", () => {
    const r = row(rows(LEGAL.replace("1 Promising Future", "")), "103.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("39");
    expect(r.detail).toMatch(/at least 40/);
  });

  it("fails above 40 and names the registration rule instead", () => {
    const r = row(rows(`${LEGAL}\n2 Promising Future`), "103.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("42");
    expect(r.detail).toMatch(/exactly 40/);
  });

  it("counts unrecognised lines separately instead of pretending they are not there", () => {
    const r = row(rows(`${LEGAL}\n1 Totally Fake Card`), "103.2");
    expect(r.detail).toMatch(/1 line not recognised/);
  });
});

describe("103.2.b — up to 3 copies of a name", () => {
  it("passes a list with no name over three", () => {
    expect(row(rows(LEGAL), "103.2.b").status).toBe("pass");
  });

  it("fails a fourth copy and names the card", () => {
    const r = row(rows(LEGAL.replace("3 Retreat", "4 Retreat").replace("1 Promising Future", "")), "103.2.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Retreat");
    expect(r.detail).toContain("4");
  });

  it("counts copies by name across different printings, not by code", () => {
    // OGS-014 and VEN-SP6 are both named "Lux, Crownguard". 103.2.b.2 says two cards of the same
    // character are different names; the corollary is that two printings of one name are not.
    const r = row(rows(`${LEGAL}\n2 VEN-SP6`), "103.2.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Lux, Crownguard");
    expect(r.detail).toContain("5");
  });

  it("lets Spiderling past the cap, because its own text says so (002)", () => {
    const eight = `Legend
1 Gloomist

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Runes
12 Chaos Rune

Main Deck
8 Spiderling`;
    const r = row(rows(eight), "103.2.b");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Spiderling");
    expect(r.detail).toContain("002");
  });
});

/**
 * A second legal list, needed because the Unique cards are Calm/Mind Ornn Signature Equipment and
 * LEGAL above is Mind/Order. Fire Below the Mountain is the only Ornn legend, Ornn, Blacksmith is a
 * champion unit carrying the tag, and the Main Deck is 40 counting it: 1 champion + 3 Forgefire Cape
 * + 36 filler. Substituting into the Cape line is what every test below varies.
 */
const ORNN = `Legend
1 Fire Below the Mountain

Champion
1 Ornn, Blacksmith

Battlefields
1 Back-Alley Bar
1 Bandle Tree
1 Fortified Position

Runes
6 Calm Rune
6 Mind Rune

Main Deck
3 Forgefire Cape
3 Charm
3 Clockwork Keeper
3 Defy
3 En Garde
3 Find Your Center
3 Meditation
3 Playful Phantom
3 Rune Prison
3 Solari Shieldbearer
3 Stalwart Poro
3 Stand United`;

/**
 * 825.3.a — one of each Unique name (#208). The defect this row exists for was reachable precisely
 * BECAUSE the other rows pass: all three cards printing the keyword are Ornn Signature Equipment, so
 * three copies of one satisfied 103.2.b, 103.2.d.1, 103.2.d.2 and 103.1.b at once and `checkBuild`
 * reported `legal: true`. The third test below is the regression guard and the point of the row:
 * 825.3.b makes the Unique cap and the Signature cap INDEPENDENT, so the other two must keep passing
 * while this one fails, or the checklist would name the wrong rule.
 */
describe("825.3.a — one of each Unique name (#208)", () => {
  it("passes, and says so, on a list holding no Unique card at all", () => {
    const r = row(rows(LEGAL), "825.3.a");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("No card in this list has Unique");
  });

  it("passes on a single copy, naming it", () => {
    const r = row(rows(ORNN.replace("3 Forgefire Cape", "1 Forgefire Cape\n2 Sunlit Guardian")), "825.3.a");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Forgefire Cape");
  });

  it("fails on three copies WHILE 103.2.b and 103.2.d still pass — the whole of 825.3.b", () => {
    const report = rows(ORNN);
    const unique = row(report, "825.3.a");
    expect(unique.status).toBe("fail");
    expect(unique.detail).toContain("3× Forgefire Cape");
    expect(unique.detail).toContain("825.3.b");
    // The two rows that made the deck look legal have to keep saying what they said.
    expect(row(report, "103.2.b").status).toBe("pass");
    expect(row(report, "103.2.d").status).toBe("pass");
    // And the report as a whole must now refuse it, which is the bug this closes.
    expect(report.legal).toBe(false);
  });

  it("counts the sideboard with the Main Deck, because 825.3.a says 'a deck'", () => {
    const withSide = `${ORNN.replace("3 Forgefire Cape", "1 Forgefire Cape\n2 Sunlit Guardian")}

Sideboard
1 Forgefire Cape`;
    const r = row(rows(withSide), "825.3.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("2× Forgefire Cape");
  });
});

describe("103.3.a — twelve runes inside the identity", () => {
  it("passes on 6 + 6 in the legend's two domains", () => {
    const r = row(rows(LEGAL), "103.3.a");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("12");
  });

  it("fails on eleven and says how many there are", () => {
    const r = row(rows(LEGAL.replace("6 Order Rune", "5 Order Rune")), "103.3.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("11");
  });

  it("fails a rune outside the legend's domains and names it", () => {
    const r = row(rows(LEGAL.replace("6 Order Rune", "5 Order Rune\n1 Fury Rune")), "103.3.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Fury Rune");
  });
});

describe("103.4 — three battlefields, all named differently", () => {
  it("passes on three different names", () => {
    const r = row(rows(LEGAL), "103.4.a");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("3");
  });

  it("fails on two", () => {
    const r = row(rows(LEGAL.replace("1 Startipped Peak", "")), "103.4.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("2");
  });

  it("fails two copies of one name and cites 103.4.c", () => {
    const r = row(rows(LEGAL.replace("1 Startipped Peak", "2 The Grand Plaza").replace("1 The Grand Plaza\n", "")), "103.4.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("The Grand Plaza");
    expect(r.detail).toContain("103.4.c");
  });

  it("asks for three in 2v2 as well, since 489.4.a says three too", () => {
    expect(row(rows(LEGAL, "2v2"), "103.4.a").status).toBe("pass");
  });
});

describe("103.1.b — Domain Identity", () => {
  it("passes a Mind + Order list", () => {
    expect(row(rows(LEGAL), "103.1.b").status).toBe("pass");
  });

  it("fails a Chaos card under a Mind + Order legend and names it", () => {
    const r = row(rows(LEGAL.replace("3 Watchful Sentry", "3 Stealthy Pursuer")), "103.1.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Stealthy Pursuer");
  });

  it("does not blame a battlefield for having no domain at all", () => {
    // All 66 battlefield printings carry no domain; 103.1.b.3 and b.4 speak of the domains a card
    // indicates, and there are none to fail.
    expect(row(rows(LEGAL), "103.1.b").detail).not.toContain("Grand Plaza");
  });

  it("is unknown rather than failed when the list names no legend", () => {
    expect(row(rows(LEGAL.replace("1 Lady of Luminosity - Starter", "")), "103.1.b").status).toBe("unknown");
  });
});

describe("the champion tag, derived rather than flagged", () => {
  /**
   * Riot's data has no "this tag is the champion" field. A tag T is a champion tag when some card is
   * named "T, <epithet>" — which is 103.2.a.2's own example, "Jinx, Rebel" for Jinx. Measured 2026-09-06:
   * all 127 legend printings resolve to exactly one. This test re-measures it over the whole pool, so a
   * set that broke the derivation fails the build instead of silently mislabelling a legend.
   */
  it("gives exactly one champion tag to every legend printing in the pool", () => {
    const legends = cards.cards.filter((c) => c.type.includes("legend"));
    expect(legends.length).toBeGreaterThan(120);
    const without = legends.filter((c) => championTagOf(c.code, cards) === null);
    expect(without.map((c) => `${c.code} ${c.name}`)).toEqual([]);
  });

  it("picks the champion out of a legend carrying a creature tag too", () => {
    // VEN-155 Heart of the Tempest is tagged Yordle and Kennen.
    expect(championTagOf("VEN-155", cards)).toBe("Kennen");
  });

  it("says a card with no champion tag has none", () => {
    expect(championTagOf("OGN-104", cards)).toBeNull(); // Retreat
  });
});

/**
 * #134: the tag set was cached in one module-level variable that ignored WHICH index asked, so the
 * first CardIndex to reach `championTagOf` decided the answer for the whole process. A small or
 * trimmed index answering first left an empty set behind and the real pool then reported no
 * champion tag for any legend, degrading 103.2.a.2 and 103.2.d.2 with no error at all.
 */
describe("the champion-tag cache", () => {
  it("answers per index, so a small pool cannot speak for the real one", () => {
    const jinx = cards.cards.find((c) => c.tags.includes("Jinx"))!;
    // A pool holding one card whose name carries no ", epithet" has no champion tags at all.
    const tiny = new CardIndex([{ ...jinx, name: "Nothing In Particular" }], []);
    expect(championTagOf(jinx.base, tiny)).toBeNull();
    expect(championTagOf(jinx.base, cards)).toBe("Jinx");
    // And the other way round: the real pool must not fill the small one's answer either.
    expect(championTagOf(jinx.base, tiny)).toBeNull();
  });
});

describe("103.2.a.2 — the Chosen Champion carries the legend's tag", () => {
  it("passes Lux, Illuminated under Lady of Luminosity", () => {
    const r = row(rows(LEGAL), "103.2.a.2");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Lux");
  });

  it("fails a champion of another legend", () => {
    const r = row(rows(LEGAL.replace("Champion\n1 Lux, Illuminated", "Champion\n1 Ekko, Recurrent")), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Ekko");
  });

  it("fails when no champion section names one", () => {
    const r = row(rows(LEGAL.replace("Champion\n1 Lux, Illuminated", "")), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toMatch(/no Chosen Champion/i);
  });

  // #103: Riot's gallery carries no Signature marker, but two independent mirrors (Piltover
  // Archive's `card.super`, dotgg's `supertype`) agree on the same 51 names, resolved by
  // data/signature.src.json into `Card.signature`. Tibbers is 103.2.a.2's own worked example:
  // tagged Annie, but a Signature card, not a champion unit, so it cannot be Dark Child's Chosen
  // Champion even though the tag matches (103.2.d.3).
  it("fails a Signature card as Chosen Champion even when its tag matches (103.2.d.3, Tibbers)", () => {
    const list = LEGAL.replace("Legend\n1 Lady of Luminosity - Starter", "Legend\n1 Dark Child - Starter").replace(
      "Champion\n1 Lux, Illuminated",
      "Champion\n1 Tibbers",
    );
    const r = row(rows(list), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Tibbers");
    expect(r.detail).toMatch(/signature/i);
  });
});

/**
 * #133: `championRule` checked the tag and the Signature flag and never the card's TYPE, so a Deck
 * carrying a legend as its Chosen Champion was certified legal. `normalizeDeck` no longer builds
 * such a deck, but `checkBuild` is the app's whole answer to "is this list legal" and must refuse it
 * however the Deck was assembled — which is what `setChampion` does on the click path.
 */
describe("103.2.a.2 — the Chosen Champion is a unit, not a legend", () => {
  it("refuses a Champion Legend card however well its tag matches", () => {
    const deck = { ...loadDeck(LEGAL, cards), champion: "OGS-021" };  // Lady of Luminosity, the legend itself
    const r = row(checkBuild(deck, cards, "constructed"), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("not a champion unit");
    expect(r.detail).toContain("legend");
  });
});

describe("103.2.d — the Signature cap, now computed (#103)", () => {
  it("carries exactly 51 Signature base cards, each with exactly one champion tag", () => {
    const signature = cards.cards.filter((c) => c.signature);
    const bases = new Set(signature.map((c) => c.base));
    expect(bases.size).toBe(51);
    const withoutTag = signature.filter((c) => championTagOf(c.base, cards) === null);
    expect(withoutTag.map((c) => `${c.code} ${c.name}`)).toEqual([]);
  });

  it("passes a list with no Signature cards", () => {
    const r = row(rows(LEGAL), "103.2.d");
    expect(r.status).toBe("pass");
    expect(r.detail).toMatch(/no signature cards/i);
  });

  it("fails at 4 Signature cards total, regardless of name (103.2.d.1)", () => {
    const list = LEGAL.replace(
      "1 Promising Future",
      "1 Promising Future\n1 Final Spark\n1 Highlander\n1 Danger Zone\n1 Tibbers",
    );
    const r = row(rows(list), "103.2.d");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("4 Signature cards");
  });

  it("fails a Signature card that does not carry the legend's champion tag (103.2.d.2)", () => {
    // Final Spark is tagged Lux, which matches Lady of Luminosity's champion tag; Highlander is
    // tagged Master Yi, which does not.
    const list = LEGAL.replace("1 Promising Future", "1 Promising Future\n1 Highlander");
    const r = row(rows(list), "103.2.d");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Highlander");
    expect(r.detail).toMatch(/not tagged Lux/i);
  });

  it("passes 3 Signature cards that all carry the legend's champion tag", () => {
    const list = LEGAL.replace("1 Promising Future", "1 Promising Future\n1 Final Spark");
    const r = row(rows(list), "103.2.d");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("1 Signature card");
    expect(r.detail).toContain("Lux");
  });

  it("checks the 3-total cap even with no legend named, without falling back to unknown", () => {
    const list = LEGAL.replace("1 Promising Future", "1 Promising Future\n1 Final Spark").replace(
      "Legend\n1 Lady of Luminosity - Starter",
      "",
    );
    const r = row(rows(list), "103.2.d");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("1 Signature card");
  });
});

describe("103.2.e — card legality of the format", () => {
  it("passes a clean list", () => {
    expect(row(rows(LEGAL), "103.2.e").status).toBe("pass");
  });

  it("fails a banned card and names it", () => {
    const r = row(rows(LEGAL.replace("1 Ripper's Bay", "1 Obelisk of Power")), "103.2.e");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Obelisk of Power");
    expect(r.detail).toContain("banned");
  });

  it("does not call a restricted card illegal, and says so only in the format that restricts it", () => {
    const list = LEGAL.replace("1 Lady of Luminosity - Starter", "1 Wuju Bladesman - Starter");
    expect(row(rows(list, "constructed"), "103.2.e").status).toBe("pass");
    const duo = row(rows(list, "2v2"), "103.2.e");
    expect(duo.status).toBe("unknown");
    expect(duo.detail).toContain("restricted");
  });

  /**
   * #124: the row returned on the first non-empty bucket, so a restriction went unmentioned as soon
   * as anything was banned — and the player who deleted the banned card met a second problem they
   * had never been told about. Both are named now, and the status is the worse of the two.
   */
  it("names the restricted card as well when the list also holds a banned one", () => {
    const list = LEGAL
      .replace("1 Lady of Luminosity - Starter", "1 Wuju Bladesman - Starter")
      .replace("1 Ripper's Bay", "1 Obelisk of Power");
    const duo = row(rows(list, "2v2"), "103.2.e");
    expect(duo.status).toBe("fail");
    expect(duo.detail).toContain("Obelisk of Power is banned");
    expect(duo.detail).toContain("Wuju Bladesman - Starter is restricted");
    expect(duo.detail).toContain("a cap, not a ban");
  });
});

describe("the badge", () => {
  it("calls the reference list legal", () => {
    const r = rows(LEGAL);
    expect(r.legal).toBe(true);
    expect(r.rules.filter((x) => x.status === "fail")).toEqual([]);
  });

  it("calls a 39-card list illegal", () => {
    expect(rows(LEGAL.replace("1 Promising Future", "")).legal).toBe(false);
  });

  it("prints every rule the spec asked for, in a stable order", () => {
    expect(rows(LEGAL).rules.map((x) => x.rule)).toEqual([
      "103.1",
      "103.1.b",
      "103.2.a.2",
      "103.2 · Tournament Rules 601.1.b",
      "103.2.b",
      // 825.3.a sits next to 103.2.b because it is the same axis — copies of a name — and the two are
      // independent caps by 825.3.b, so the checklist shows them side by side (#208).
      "825.3.a · 825.3.b",
      "103.2.d",
      "103.3.a · 103.3.a.1",
      "103.4.a · 103.4.c",
      "103.2.e",
    ]);
  });
});

describe("601.1.c — the sideboard (#197)", () => {
  const BROKEN_SIDEBOARD = `Sideboard
2 Watchful Sentry
1 Order Rune
1 Sumpworks Map
1 Promising Future
1 The Ruination
1 Ashe, Focused
1 Fiora, Worthy
1 Rally the Troops
1 Progress Day
1 Retreat
1 Sacrifice
1 Soaring Scout`;

  const LEGAL_SIDEBOARD = `Sideboard
1 The Ruination
1 Ashe, Focused
1 Renata Glasc, Mastermind`;

  it("adds no sideboard rows when the deck carries no sideboard", () => {
    const r = rows(LEGAL);
    expect(r.rules.some((x) => x.rule.startsWith("Tournament Rules 601.1.c"))).toBe(false);
  });

  it("reproduces #197: a 13-card sideboard with a rune and an over-cap name is certified illegal", () => {
    const r = rows(`${LEGAL}\n\n${BROKEN_SIDEBOARD}`);
    const size = row(r, "Tournament Rules 601.1.c.1");
    const contents = row(r, "Tournament Rules 601.1.c.2");
    const copies = row(r, "Tournament Rules 601.1.c.3");
    expect(size.status).toBe("fail");
    expect(size.detail).toContain("13");
    expect(contents.status).toBe("fail");
    expect(contents.detail).toContain("Order Rune");
    expect(copies.status).toBe("fail");
    expect(copies.detail).toContain("Watchful Sentry");
    expect(copies.detail).toContain("5");
    expect(r.legal).toBe(false);
  });

  it("passes a 10-or-fewer sideboard of valid Main Deck cards with no combined name over the cap", () => {
    const r = rows(`${LEGAL}\n\n${LEGAL_SIDEBOARD}`);
    expect(row(r, "Tournament Rules 601.1.c.1").status).toBe("pass");
    expect(row(r, "Tournament Rules 601.1.c.2").status).toBe("pass");
    expect(row(r, "Tournament Rules 601.1.c.3").status).toBe("pass");
    expect(r.legal).toBe(true);
  });

  it("fails size alone past 10 cards", () => {
    const eleven = `Sideboard\n${Array.from({ length: 11 }, (_, i) => `1 ${["The Ruination", "Ashe, Focused", "Renata Glasc, Mastermind"][i % 3]}`).join("\n")}`;
    // Overlapping names are fine here — size counts cards, not distinct names.
    const r = rows(`${LEGAL}\n\n${eleven}`);
    expect(row(r, "Tournament Rules 601.1.c.1").status).toBe("fail");
  });

  it("fails contents alone when a rune or battlefield sits in the sideboard", () => {
    const r = rows(`${LEGAL}\n\nSideboard\n1 Order Rune`);
    const contents = row(r, "Tournament Rules 601.1.c.2");
    expect(contents.status).toBe("fail");
    expect(contents.detail).toContain("Order Rune");
    expect(row(r, "Tournament Rules 601.1.c.1").status).toBe("pass");
    expect(row(r, "Tournament Rules 601.1.c.3").status).toBe("pass");
  });

  it("fails combined copies alone when Main Deck already has 3 and the sideboard adds a 4th", () => {
    const r = rows(`${LEGAL}\n\nSideboard\n1 Watchful Sentry`);
    const copies = row(r, "Tournament Rules 601.1.c.3");
    expect(copies.status).toBe("fail");
    expect(copies.detail).toContain("Watchful Sentry");
    expect(copies.detail).toContain("4");
    expect(row(r, "Tournament Rules 601.1.c.1").status).toBe("pass");
    expect(row(r, "Tournament Rules 601.1.c.2").status).toBe("pass");
  });

  it("lets Spiderling past the combined cap too, because its own text says so (002)", () => {
    const eight = `Legend
1 Gloomist

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Runes
12 Chaos Rune

Main Deck
6 Spiderling

Sideboard
2 Spiderling`;
    const r = row(rows(eight), "Tournament Rules 601.1.c.3");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Spiderling");
  });
});

/**
 * 403.4.b — the sideboard inside the Domain Identity (#215). The editor has refused an off-identity
 * card in the sideboard since #101 and this report called such a list LEGAL, because `identityRule`
 * reads `deck.main` and `deck.battlefields` and not `deck.sideboard`. That was the one disagreement
 * the 2026-09-13 tier audit found between the two layers, and the button was the one that was right.
 *
 * It is a TOURNAMENT RULES row rather than part of 103.1.b's because at registration a sideboard card
 * is not in the deck: Tournament Rules 601.1.b makes the Main Deck exactly 40 and 601.1.c keeps the
 * sideboard beside it. What makes an off-identity one illegal is what it is FOR — 403.4, "Sideboard
 * cards must be exchanged 1 for 1 with Main Deck cards", read with 403.4.b, "a player may not change
 * their Runes, Legend, or Battlefields at any point after deck registration". The Legend is frozen
 * for the match, so the identity the card would be swapped into is frozen with it.
 *
 * LEGAL is Mind + Order, so every subject below is chosen outside those two domains and inside the
 * Main Deck card types, or 601.1.c.2 would be the row refusing it instead — the precedence trap the
 * census paid for, in a new place.
 */
describe("Tournament Rules 403.4.b — the sideboard inside the identity (#215)", () => {
  const SIDE = (...names: string[]) => `${LEGAL}\n\nSideboard\n${names.map((n) => `1 ${n}`).join("\n")}`;

  it("fails on a sideboard card outside the legend's domains, and names it", () => {
    const r = row(rows(SIDE("Blazing Scorcher")), "Tournament Rules 403.4.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Blazing Scorcher");
    expect(r.detail).toContain("mind + order");
    // The reason, not just the verdict: the citation a reader can follow.
    expect(r.detail).toContain("403.4");
    expect(rows(SIDE("Blazing Scorcher")).legal).toBe(false);
  });

  it("passes when every sideboard card is inside them", () => {
    const r = row(rows(SIDE("The Ruination", "Ashe, Focused")), "Tournament Rules 403.4.b");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("mind + order");
    expect(rows(SIDE("The Ruination", "Ashe, Focused")).legal).toBe(true);
  });

  /**
   * The same shape `identityRule` uses for the Main Deck: four names, then a count. Without this the
   * detail of a ten-card off-identity sideboard would be a wall of names in a player-facing panel.
   */
  it("names four and counts the rest", () => {
    const five = SIDE("Abandon", "Acceptable Losses", "Adaptatron", "Affectionate Poro", "Against the Odds");
    const r = row(rows(five), "Tournament Rules 403.4.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("and 1 more");
    expect(r.detail).not.toContain("Against the Odds");
  });

  it("judges nothing with no legend named, exactly as 103.1.b's row does", () => {
    const r = row(rows("Sideboard\n1 Blazing Scorcher"), "Tournament Rules 403.4.b");
    expect(r.status).toBe("unknown");
    expect(r.detail).toContain("no Domain Identity");
  });

  it("is not drawn at all when the deck carries no sideboard", () => {
    expect(rows(LEGAL).rules.some((x) => x.rule === "Tournament Rules 403.4.b")).toBe(false);
  });

  /**
   * It reports FIRST of the four sideboard rows, for the reason `capOf` reports identity first: no
   * quantity of an off-identity card is ever legal there, while the other three are caps. Pinned as
   * an ORDER rather than an index, so inserting a fifth sideboard row later cannot silently move it.
   */
  it("is the first of the sideboard rows", () => {
    const ids = rows(SIDE("Blazing Scorcher")).rules.map((x) => x.rule).filter((x) => x.startsWith("Tournament Rules"));
    expect(ids[0]).toBe("Tournament Rules 403.4.b");
    expect(ids).toContain("Tournament Rules 601.1.c.1");
  });

  /**
   * And it is a DOMAIN row, not a card-type row: an off-identity card that is also the wrong type is
   * reported by 601.1.c.2 as before, and this row has nothing to say about it. That is the 825.3.a
   * precedent — the checklist names the rule the list actually broke, and a domain is not a type.
   */
  /**
   * THE ROW'S KNOWN LIMIT, pinned so it is discoverable rather than surprising (#217). It measures the
   * DOMAIN and nothing else, so a Signature card that is INSIDE the identity but carries another
   * champion's tag passes it — `OGN-256 Fox-Fire` is calm + mind under a calm + mind Ornn legend and
   * is tagged Ahri, so 103.2.d.2 forbids it and nothing here says so. The main-deck button refuses the
   * same card; the sideboard button takes it.
   *
   * Its pass sentence used to read "so any of them can be swapped in", which was a claim about
   * SWAPPABILITY on a row that measured only the DOMAIN. That was a player-facing over-claim and is
   * fixed; whether the row or `signatureRule` should widen is #217, and turns on whether 103.2.d.1's
   * count wants the same treatment as 103.2.d.2's tag. Change this test when that is decided.
   */
  it("measures the domain and not the champion tag, which is #217", () => {
    // The legend has to be the ORNN one, not LEGAL's: Fox-Fire is calm + mind, so under LEGAL's
    // Mind + Order it is off-DOMAIN and the row catches it correctly. The gap only exists where the
    // card is INSIDE the identity and outside the champion tag, which is what Ornn provides. The
    // deck is deliberately minimal — this is a claim about one row, not about a legal list.
    const ORNN_SIDE = "Legend\n1 Fire Below the Mountain\n\nSideboard\n1 Fox-Fire\n";
    const r = rows(ORNN_SIDE);
    expect(row(r, "Tournament Rules 403.4.b").status).toBe("pass");
    // What it says is now only what it measured: no promise that the card can be swapped in.
    expect(row(r, "Tournament Rules 403.4.b").detail).not.toContain("swapped in");
    // The gap is real rather than theoretical: the same card in the MAIN deck is refused by 103.2.d.
    expect(row(rows("Legend\n1 Fire Below the Mountain\n\nMain Deck\n1 Fox-Fire\n"), "103.2.d").status).toBe("fail");
    // And the control that makes the first line mean something: an off-DOMAIN card there still fails.
    expect(row(rows("Legend\n1 Fire Below the Mountain\n\nSideboard\n1 Blazing Scorcher\n"), "Tournament Rules 403.4.b").status).toBe("fail");
  });

  it("leaves a rune in the sideboard to 601.1.c.2, which is a different rule", () => {
    const r = rows(`${LEGAL}\n\nSideboard\n1 Fury Rune`);
    expect(row(r, "Tournament Rules 601.1.c.2").status).toBe("fail");
    expect(row(r, "Tournament Rules 601.1.c.2").detail).toContain("Fury Rune");
    // A rune is off-identity here too, so this row may fire as well — what it may NOT do is be the
    // only thing reported, which is what a widening of 601.1.c.2 would have produced.
    expect(row(r, "Tournament Rules 403.4.b")).toBeDefined();
  });
});
