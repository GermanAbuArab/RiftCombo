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

  it("never compose a variant no legend could run, so the matcher's guard cuts nothing (#64)", () => {
    // Domain Identity, 103.1.b: every legend has exactly two domains, and 103.1.b.4 only lets a
    // card into an identity that holds all of its own. Measured on the 2026-09-06 catalogue of
    // 135 entries, generateVariants used to emit 280 variants and matchDeck threw away the 134
    // whose card pool spanned three or more domains, leaving 146. The filter now runs while the
    // variants are being composed, so the guard at src/matcher.ts:55 fires on nothing — that is
    // what this asserts, and it is why the guard may stay as a cheap safety net.
    expect(variants.filter((v) => v.domains.length > 2).map((v) => v.id)).toEqual([]);
    // Every entry the catalogue authors is inside one identity, so no authored line was hidden:
    // the 134 dropped were all compositions, never a variant standing on a single combo.
    expect(combos.filter((c) => c.status !== "refuted")
      .filter((c) => new Set(c.uses.flatMap((u) => cards.domainsOf(u.card))).size > 2)).toEqual([]);
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
    // The three verified Lux lines must all be found and composed through `needs`. Other combos
    // that ride the same loop (Ashe hand-strip, Promising Future, Ruination) are correct extra
    // hits, so assert containment, not the exact list.
    expect(ids(r.included)).toEqual(expect.arrayContaining([
      "lux-infinite-energy",
      "lux-infinite-power+lux-infinite-energy",
      "renata-mastermind-points+lux-infinite-energy+lux-infinite-power",
    ]));
    for (const h of r.included) expect(h.illegal).toEqual([]);
    expect(r.includedByChangingLegend).toEqual([]);
    // Grand Plaza is one of the three battlefields but the deck has no Recruit the Vanguard.
    const plaza = r.almostIncluded.find((h) => h.variant.comboIds.includes("grand-plaza-recruit-vanguard"));
    expect(plaza).toBeDefined();
    expect(plaza!.missing).toEqual([{ card: "OGS-015", quantity: 2 }]);
  });

  it("finds nothing in a mono-Fury deck except an in-domain near miss", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(r.included).toEqual([]);
    expect(r.includedByChangingLegend).toEqual([]);
    // The fixture holds 2 Red Brambleback and its legend, Relentless Storm, is Fury/Body — so the
    // 2026-09-05 equipment walk put a second line in reach: boneshiver-brambleback-channel wants
    // those same 2 Bramblebacks plus 2 Boneshiver, which is exactly the default ceiling of 2.
    // Asserted by membership, not as the whole list: this fixture keeps acquiring near misses as
    // the catalogue grows (2026-09-07: relentless-storm-ambush-mighty-off-turn-channel, which the
    // fixture's own legend heads), and pinning the list makes every walk break an unrelated test.
    expect(ids(r.almostIncluded)).toContain("boneshiver-brambleback-channel");
    const bone = r.almostIncluded.find((h) => h.variant.id === "boneshiver-brambleback-channel")!;
    expect(bone.missing).toEqual([{ card: "SFD-118", quantity: 2 }]);
    // Tryndamere is 3 away: since the 2026-09-04 BURST audit corrected that line to 2 Tryndamere +
    // 3 Brambleback the shortfall is 3, outside the default ceiling — so widen it to see that one.
    const r3 = matchDeck(deck, variants, cards, { format: "constructed", maxMissing: 3 });
    expect(ids(r3.almostIncluded)).toContain("tryndamere-brambleback-conquer");
    const tryn = r3.almostIncluded.find((h) => h.variant.id === "tryndamere-brambleback-conquer")!;
    expect(tryn.missing).toEqual([{ card: "OGN-034", quantity: 2 }, { card: "UNL-029", quantity: 1 }]);
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
    const r3 = matchDeck(deck, variants, cards, { format: "constructed", maxMissing: 3 });
    const ahri = r3.almostIncluded.find((h) => h.variant.comboIds.includes("ahri-blue-sentinel-hold"));
    expect(ahri).toBeDefined();
    expect(ahri!.missingCount).toBe(3); // needs 3 Ahri + 2 Sentinel, has 1 + 1: a multiset shortfall of 3
    const r2 = matchDeck(deck, variants, cards, { format: "constructed", maxMissing: 2 });
    expect(ids(r2.almostIncluded)).not.toContain("ahri-blue-sentinel-hold");
  });

  it("treats alt-art printings as the same card", () => {
    const deck = loadDeck("Legend\n1 Nine-Tailed Fox\nMain\n3 Ahri, Alluring (OGN-066a)\n2 Blue Sentinel", cards);
    const r = matchDeck(deck, variants, cards, { format: "constructed" });
    expect(ids(r.included)).toEqual(["ahri-blue-sentinel-hold"]);
  });
});
