import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadDeck } from "../src/deck.js";
import { loadCardIndex, loadCombos, loadSynergies } from "../src/load.js";
import { matchSynergies, partnersOf, validateSynergies } from "../src/synergies.js";

const cards = loadCardIndex();
const synergies = loadSynergies();
const { combos } = loadCombos();
const fixture = (n: string) => readFileSync(new URL(`./fixtures/${n}`, import.meta.url), "utf8");
const constructed = { format: "constructed" as const };

describe("synergy rules", () => {
  it("passes its own validation", () => {
    expect(validateSynergies(synergies, cards)).toEqual([]);
  });

  it("fails when a rule's match list has drifted since somebody read it", () => {
    // The whole guarantee is that a human read the list. A new set silently widening a predicate is
    // the one way that decays without anyone noticing, so the stamped count has to be load-bearing.
    const drifted = synergies.map((s, i) => (i === 0 ? { ...s, reviewedCount: s.reviewedCount + 6 } : s));
    const errors = validateSynergies(drifted, cards);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(synergies[0]!.id);
    expect(errors[0]).toContain("-6");
    // The review tool has to be able to run on exactly that file, or the list stays unread.
    expect(validateSynergies(drifted, cards, { skipReviewCount: true })).toEqual([]);
  });

  it("stamped every rule with the size of the list that was read", () => {
    for (const s of synergies) expect(s.reviewedCount, s.id).toBe(partnersOf(s, cards).length);
  });

  it("cites combos that exist, and only verified ones", () => {
    const byId = new Map(combos.map((c) => [c.id, c]));
    for (const s of synergies) {
      for (const id of s.basis.combos) {
        expect(byId.get(id), `${s.id} cites ${id}`).toBeDefined();
        expect(byId.get(id)!.status, `${s.id} cites ${id}`).toBe("verified");
      }
    }
  });

  it("never pairs a card with itself, and never names a token", () => {
    for (const s of synergies) {
      const anchorNames = new Set(cards.equivalents(s.anchor));
      for (const p of partnersOf(s, cards)) {
        expect(anchorNames.has(p.base), `${s.id} matched its own anchor`).toBe(false);
        // Tokens and the two helper cards carry no domain and are not battlefields; a decklist
        // can never hold one, so surfacing one would be a dead recommendation.
        expect(p.domains.length > 0 || p.type.includes("battlefield"), `${s.id} matched token ${p.base}`).toBe(true);
      }
    }
  });

  it("every rule matches something and no rule matches the whole pool", () => {
    for (const s of synergies) {
      const n = partnersOf(s, cards).length;
      expect(n, s.id).toBeGreaterThan(0);
      // A predicate this wide is not a pattern, it is a fact about the card pool. The review tool
      // exists so a human can read a rule's whole list; keep the lists readable.
      expect(n, s.id).toBeLessThan(150);
    }
  });
});

describe("matching a deck", () => {
  it("finds the token engine in the Recruits deck and nothing outside Chaos + Order", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    const hits = matchSynergies(deck, synergies, cards, constructed);
    const ids = hits.map((h) => h.synergy.id);

    expect(ids).toContain("grand-plaza-unit-tokens");
    expect(ids).toContain("renata-industrialist-tokens");

    const domains = cards.domainsOf(deck.legend!);
    for (const h of hits) {
      expect(cards.domainsOf(h.synergy.anchor).every((d) => domains.includes(d)), h.synergy.id).toBe(true);
      for (const p of h.partners) {
        expect(cards.domainsOf(p.card).every((d) => domains.includes(d)), `${h.synergy.id} -> ${p.card}`).toBe(true);
        expect(p.copies).toBeGreaterThan(0);
      }
    }
  });

  it("names Eye of the Herald among the Plaza's token makers", () => {
    const deck = loadDeck(fixture("recruits.txt"), cards);
    const hits = matchSynergies(deck, synergies, cards, constructed);
    const plaza = hits.find((h) => h.synergy.id === "grand-plaza-unit-tokens")!;
    expect(plaza.partners.map((p) => p.card)).toContain("SFD-153");
    // Stealthy Pursuer is in this list and banned in constructed, so nothing may name it.
    for (const h of hits) expect(h.partners.map((p) => p.card)).not.toContain("OGN-177");
  });

  it("never surfaces a partner outside a mono-Fury legend's domains", () => {
    const deck = loadDeck(fixture("fury.txt"), cards);
    const hits = matchSynergies(deck, synergies, cards, constructed);
    for (const h of hits) {
      for (const p of h.partners) {
        expect(cards.domainsOf(p.card), `${h.synergy.id} -> ${p.card}`).toEqual(["fury"]);
      }
    }
  });

  it("reports nothing for a list with no legend", () => {
    const deck = loadDeck("3 Blue Sentinel\n3 Ahri, Alluring", cards);
    expect(deck.legend).toBeNull();
    expect(matchSynergies(deck, synergies, cards, constructed)).toEqual([]);
  });
});
