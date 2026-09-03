import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex, loadCombos } from "../src/load.js";
import { generateVariants, validateCombos } from "../src/combos.js";
import { loadDeck } from "../src/deck.js";
import { matchDeck } from "../src/matcher.js";

const cards = loadCardIndex();
const { combos, features } = loadCombos();
const variants = generateVariants(combos, cards);
const fixture = (n: string) => readFileSync(new URL(`./fixtures/${n}`, import.meta.url), "utf8");
const ids = (hits: { variant: { id: string } }[]) => hits.map((h) => h.variant.id).sort();

describe("authored combos", () => {
  it("validate against the card index and feature vocabulary", () => {
    expect(validateCombos(combos, features, cards)).toEqual([]);
  });

  it("flatten the needs/produces DAG into variants with merged card multisets", () => {
    const power = variants.find((v) => v.id === "lux-infinite-power+lux-infinite-energy")!;
    expect(power).toBeDefined();
    expect(power.cards).toEqual({
      "OGN-212": 1, "OGN-104": 1, "OGN-087": 1, "OGN-110": 1, "UNL-165": 2, "UNL-173": 2,
    });
    expect(power.produces).toContain("infinite-energy");
    expect(power.produces).toContain("infinite-power");
    expect(power.domains.sort()).toEqual(["mind", "order"]);
    const kill = variants.find((v) => v.comboIds.includes("renata-mastermind-points"))!;
    expect(kill.comboIds).toContain("lux-infinite-energy");
    expect(kill.comboIds).toContain("lux-infinite-power");
    expect(kill.class).toBe("INFINITE");
    expect(kill.status).toBe("verified");
  });

  it("does not emit a variant for a combo whose needs cannot be satisfied", () => {
    const orphan = generateVariants(
      [{ ...combos.find((c) => c.id === "lux-infinite-power")! }],
      cards,
    );
    expect(orphan).toEqual([]);
  });
});

describe("matcher", () => {
  it("finds the whole Lux line in the tournament deck, all legal", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(ids(r.included)).toEqual([
      "lux-infinite-energy",
      "lux-infinite-power+lux-infinite-energy",
      "renata-mastermind-points+lux-infinite-energy+lux-infinite-power",
    ]);
    for (const h of r.included) expect(h.illegal).toEqual([]);
    expect(r.includedByChangingLegend).toEqual([]);
    // Grand Plaza is one of the three battlefields but the deck has no Recruit the Vanguard.
    expect(ids(r.almostIncluded)).toEqual(["grand-plaza-recruit-vanguard"]);
    expect(r.almostIncluded[0]!.missing).toEqual([{ card: "OGS-015", quantity: 2 }]);
  });

  it("finds nothing in a mono-Fury deck except an in-domain near miss", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(r.included).toEqual([]);
    expect(r.includedByChangingLegend).toEqual([]);
    expect(ids(r.almostIncluded)).toEqual(["tryndamere-brambleback-conquer"]);
    expect(r.almostIncluded[0]!.missing).toEqual([{ card: "OGN-034", quantity: 1 }]);
  });

  it("reports the banned Recruits loop as included but illegal in the format", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    const hit = r.included.find((h) => h.variant.id === "pursuer-herald-recruits")!;
    expect(hit).toBeDefined();
    expect(hit.illegal.map((e) => e.name)).toEqual(["Stealthy Pursuer"]);
    expect(hit.illegal[0]!.since).toBe("2026-07-24");
    expect(ids(r.included)).toContain("grand-plaza-recruit-vanguard");
  });

  it("moves an off-domain combo to the changing-legend bucket", () => {
    const text = fixture("recruits.txt").replace("Legend: Heart of the Tempest", "Legend: Lady of Luminosity - Starter");
    const deck = loadDeck(text, cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(ids(r.included)).toEqual(["grand-plaza-recruit-vanguard"]);
    const hit = r.includedByChangingLegend.find((h) => h.variant.id === "pursuer-herald-recruits")!;
    expect(hit.offDomain).toEqual(["OGN-177"]); // Stealthy Pursuer is Chaos
  });

  it("respects the near-miss ceiling and counts copies as a multiset", () => {
    const deck = loadDeck("Legend\n1 Nine-Tailed Fox\nMain\n1 Ahri, Alluring\n1 Blue Sentinel", cards);
    // Assert on the one line this deck is built around, not on the whole near-miss list —
    // any other Calm/Mind combo that is two cards away is a correct answer too.
    const r2 = matchDeck(deck, variants, cards, { format: "constructed", maxMissing: 2 });
    const ahri = r2.almostIncluded.find((h) => h.variant.comboIds.includes("ahri-blue-sentinel-hold"));
    expect(ahri).toBeDefined();
    expect(ahri!.missingCount).toBe(2); // needs 2 Ahri + 2 Sentinel, has 1 + 1: a multiset shortfall of 2
    const r1 = matchDeck(deck, variants, cards, { format: "constructed", maxMissing: 1 });
    expect(ids(r1.almostIncluded)).not.toContain("ahri-blue-sentinel-hold");
  });

  it("treats alt-art printings as the same card", () => {
    const deck = loadDeck("Legend\n1 Nine-Tailed Fox\nMain\n2 Ahri, Alluring (OGN-066a)\n2 Blue Sentinel", cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(ids(r.included)).toEqual(["ahri-blue-sentinel-hold"]);
  });
});
