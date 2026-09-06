import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
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
/** Find a row by the first paragraph number it cites, so "103.2" reaches "103.2 · Tournament Rules 402.1"
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

describe("103.2 and Tournament Rules 402.1 — Main Deck size", () => {
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
      "103.2 · Tournament Rules 402.1",
      "103.2.b",
      "103.2.d",
      "103.3.a · 103.3.a.1",
      "103.4.a · 103.4.c",
      "103.2.e",
    ]);
  });
});
