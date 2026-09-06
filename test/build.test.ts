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

  it("says out loud that it cannot tell a signature unit from a champion unit", () => {
    expect(row(rows(LEGAL), "103.2.a.2").detail).toMatch(/signature/i);
  });
});
