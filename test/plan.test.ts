import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CLASS_RANK, generateVariants } from "../src/combos.js";
import { loadDeck } from "../src/deck.js";
import { loadCardIndex, loadCombos } from "../src/load.js";
import { planDeck } from "../src/plan.js";

const cards = loadCardIndex();
const { combos } = loadCombos();
const variants = generateVariants(combos, cards);
const fixture = (n: string) => readFileSync(new URL(`./fixtures/${n}`, import.meta.url), "utf8");
const constructed = { format: "constructed" as const };

describe("deck plan", () => {
  it("reports the lines the Lux deck already completes and stays inside Mind + Order", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const plan = planDeck(deck, variants, cards, constructed);

    expect(plan.domains.sort()).toEqual(["mind", "order"]);
    expect(plan.have.length).toBeGreaterThan(0);
    for (const r of plan.have) expect(r.cost).toBe(0);
    expect(plan.have.map((r) => r.variant.comboIds[0])).toContain("lux-infinite-energy");
    // Domain Identity (103.1.b): nothing outside the legend's two domains may be suggested.
    for (const r of [...plan.have, ...plan.routes]) {
      for (const base of Object.keys(r.variant.cards)) {
        expect(cards.domainsOf(base).every((d) => plan.domains.includes(d))).toBe(true);
      }
    }
  });

  it("never suggests a card outside a mono-Fury legend's domains", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const plan = planDeck(deck, variants, cards, constructed);

    expect(plan.routes.length).toBeGreaterThan(0);
    for (const r of plan.routes) {
      for (const a of r.add) {
        expect(cards.domainsOf(a.card).every((d) => plan.domains.includes(d))).toBe(true);
      }
    }
  });

  it("ranks by cards to add, breaking ties toward the line that wins", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const plan = planDeck(deck, variants, cards, constructed);

    for (let i = 1; i < plan.routes.length; i++) {
      const prev = plan.routes[i - 1]!, cur = plan.routes[i]!;
      expect(prev.cost).toBeLessThanOrEqual(cur.cost);
      if (prev.cost === cur.cost) {
        expect(CLASS_RANK[prev.variant.class]).toBeGreaterThanOrEqual(CLASS_RANK[cur.variant.class]);
      }
    }
  });

  it("lists one route per combo, not one per flattening of the DAG", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const plan = planDeck(deck, variants, cards, constructed);
    const primaries = [...plan.have, ...plan.routes].map((r) => r.variant.comboIds[0]!);
    expect(primaries.length).toBe(new Set(primaries).size);
  });

  it("prices the Ornn gear deck at the two cards the L6 hunt named by hand", () => {
    // docs/phase0/hunt2/L6-equipment-legends.md §C4 worked this deck out card by card and called
    // for Ahri, Alluring plus Blue Sentinel. The plan has to reach the same pair from the data.
    const deck = loadDeck(
      "Legend\n1 Fire Below the Mountain\nMain\n3 Svellsongur\n3 Hwei, Brooding Painter\n3 Time Warp",
      cards,
    );
    const plan = planDeck(deck, variants, cards, constructed);
    const burst = plan.routes.find((r) => r.variant.comboIds[0] === "svellsongur-copy-hold")!;

    expect(burst).toBeDefined();
    expect(burst.variant.class).toBe("BURST");
    expect(burst.add.map((a) => a.card).sort()).toEqual(["OGN-066", "UNL-087"]);
    expect(burst.cost).toBe(2);
    expect(burst.havePieces).toBe(1); // Svellsongur is already in the list
    expect(burst.totalPieces).toBe(3);
  });

  it("counts a missing battlefield separately, since it costs a battlefield slot", () => {
    const deck = loadDeck("Legend\n1 Fire Below the Mountain\nMain\n3 Blue Sentinel", cards);
    const plan = planDeck(deck, variants, cards, constructed);
    const nexus = plan.routes.find((r) => r.variant.comboIds[0] === "power-nexus-sentinel")!;

    expect(nexus).toBeDefined();
    expect(nexus.battlefieldCopies).toBe(1); // SFD-214 Power Nexus
  });

  it("suggests nothing when the list names no legend, because identity is unknown", () => {
    const deck = loadDeck("Main\n3 Ahri, Alluring\n2 Blue Sentinel", cards);
    const plan = planDeck(deck, variants, cards, constructed);

    expect(deck.legend).toBeNull();
    expect(plan.domains).toEqual([]);
    expect(plan.legalHere).toBe(0);
    expect(plan.routes).toEqual([]);
  });

  it("drops a line whose ingredient is banned in the format being matched", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    const plan = planDeck(deck, variants, cards, constructed);
    const ids = [...plan.have, ...plan.routes].map((r) => r.variant.comboIds[0]);

    // Stealthy Pursuer (OGN-177) is banned in constructed, so the loop it anchors is not a
    // recommendation — even though the deck holds it and the matcher does report the hit.
    expect(ids).not.toContain("pursuer-herald-recruits");
  });
});
