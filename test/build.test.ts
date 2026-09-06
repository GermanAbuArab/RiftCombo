import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
import { checkBuild, type BuildReport } from "../src/build.js";

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
