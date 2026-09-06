import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadDeck } from "../src/deck.js";
import { loadCardIndex, loadCombos, loadSynergies } from "../src/load.js";
import { matchSynergies, partnersOf, planSynergies, validateSynergies } from "../src/synergies.js";

const cards = loadCardIndex();
const synergies = loadSynergies();
const { combos } = loadCombos();
const catalogued = new Set(combos.filter((c) => c.status === "verified").flatMap((c) => c.uses.map((u) => u.card)));
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

  it("lets a tribal rule stand on tags alone, and pairs only cards carrying the tag", () => {
    // Mega-Mech is a Mech with no rules text at all, so a tribe has no text signature to match on.
    const mech = synergies.find((s) => s.id === "rumble-scrapper-mech")!;
    expect(mech.partner.textMatches).toBeUndefined();
    const partners = partnersOf(mech, cards);
    expect(partners.map((c) => c.base)).toContain("OGN-088");
    for (const c of partners) expect(c.tags, c.base).toContain("Mech");
  });

  it("rejects a partner predicate that narrows on nothing", () => {
    const wide = synergies.map((s, i) => (i === 0 ? { ...s, partner: { excludes: [] } } : s));
    const errors = validateSynergies(wide, cards, { skipReviewCount: true });
    expect(errors.some((e) => e.includes("needs textMatches or tags"))).toBe(true);
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

describe("one card away", () => {
  const plan = (text: string, format: "constructed" | "2v2" = "constructed") =>
    planSynergies(loadDeck(text, cards), synergies, cards, { format, catalogued });

  it("answers the Fury deck that the matcher had nothing to say to", () => {
    // The list holds 2x Red Brambleback and no Fury or Body conquer effect, so matchSynergies is
    // silent on it. That silence is the whole issue: the deck is one card from the rule.
    const deck = loadDeck(fixture("fury.txt"), cards);
    expect(matchSynergies(deck, synergies, cards, constructed)).toEqual([]);

    const gaps = plan(fixture("fury.txt"));
    expect(gaps.length).toBeGreaterThan(0);
    const brambleback = gaps.find((g) => g.synergy.id === "red-brambleback-conquer")!;
    expect(brambleback).toBeDefined();
    expect(brambleback.missing).toBe("partner");
    expect(brambleback.anchorCopies).toBe(2);
    expect(brambleback.add.length).toBeGreaterThan(0);
  });

  it("never names a card outside the legend's two domains", () => {
    // Domain Identity, 103.1.b — the same bar test/plan.test.ts holds planDeck to.
    for (const f of ["fury.txt", "lux.txt", "recruits.txt"]) {
      const deck = loadDeck(fixture(f), cards);
      const domains = cards.domainsOf(deck.legend!);
      for (const g of plan(fixture(f))) {
        for (const a of g.add) {
          expect(cards.domainsOf(a.card).every((d) => domains.includes(d)), `${g.synergy.id} -> ${a.card}`).toBe(true);
        }
        expect(cards.domainsOf(g.synergy.anchor).every((d) => domains.includes(d)), g.synergy.id).toBe(true);
      }
    }
  });

  it("never suggests a card that cannot be played in the format being matched", () => {
    // Stealthy Pursuer (OGN-177) is banned in constructed and this list runs three of it.
    for (const g of plan(fixture("recruits.txt"))) {
      for (const a of g.add) expect(cards.legality(a.card, "constructed"), a.card).toBeUndefined();
      expect(g.add.map((a) => a.card)).not.toContain("OGN-177");
      expect(g.partners.map((p) => p.card)).not.toContain("OGN-177");
    }
  });

  it("reports a gap only when exactly one half is missing", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const hits = matchSynergies(deck, synergies, cards, constructed).map((h) => h.synergy.id);
    const gaps = plan(fixture("lux.txt"));

    // A rule the list already runs is a hit, not a gap: the two lists never name the same rule.
    for (const g of gaps) expect(hits, g.synergy.id).not.toContain(g.synergy.id);
    for (const g of gaps) {
      if (g.missing === "anchor") {
        expect(g.anchorCopies, g.synergy.id).toBe(0);
        expect(g.partners.length, g.synergy.id).toBeGreaterThan(0);
      } else {
        expect(g.anchorCopies, g.synergy.id).toBeGreaterThan(0);
        expect(g.partners, g.synergy.id).toEqual([]);
      }
    }
  });

  it("puts a missing anchor first, then the rule that switches on the most cards held", () => {
    const gaps = plan(fixture("lux.txt"));
    const rank = (m: string) => (m === "anchor" ? 0 : 1);
    for (let i = 1; i < gaps.length; i++) {
      const prev = gaps[i - 1]!, cur = gaps[i]!;
      expect(rank(prev.missing)).toBeLessThanOrEqual(rank(cur.missing));
      if (prev.missing === cur.missing && prev.missing === "anchor") {
        expect(prev.partners.length).toBeGreaterThanOrEqual(cur.partners.length);
      }
    }
  });

  it("names at most three partners, cheapest first and every battlefield behind every card", () => {
    for (const f of ["fury.txt", "lux.txt", "recruits.txt"]) {
      for (const g of plan(fixture(f))) {
        expect(g.add.length, g.synergy.id).toBeLessThanOrEqual(3);
        if (g.missing === "anchor") expect(g.add.map((a) => a.card)).toEqual([g.synergy.anchor]);
        for (let i = 1; i < g.add.length; i++) {
          const prev = g.add[i - 1]!, cur = g.add[i]!;
          expect(Number(prev.battlefield), `${g.synergy.id} -> ${cur.card}`).toBeLessThanOrEqual(Number(cur.battlefield));
          if (prev.battlefield === cur.battlefield) expect(prev.cost).toBeLessThanOrEqual(cur.cost);
        }
      }
    }
  });

  it("marks a suggestion the verified catalogue already uses, and leaves the rest unmarked", () => {
    const gaps = plan(fixture("fury.txt"));
    const wallop = gaps.find((g) => g.synergy.id === "wallop-buff-spend")!;
    // OGN-146 Wallop is an ingredient of verified combos, so the mark is not decoration.
    expect(wallop.add[0]!.card).toBe("OGN-146");
    expect(wallop.add[0]!.catalogued).toBe(true);
    // Without the set nothing is marked: the flag is data, not a guess about the card.
    const unmarked = planSynergies(loadDeck(fixture("fury.txt"), cards), synergies, cards, constructed);
    for (const g of unmarked) for (const a of g.add) expect(a.catalogued, a.card).toBe(false);
  });

  it("says nothing when the list names no legend, because identity is unknown", () => {
    expect(plan("Main\n3 Red Brambleback\n2 Wallop")).toEqual([]);
  });
});

describe("a rule whose partner is a legend", () => {
  // Three rules of the 2026-09-06 batch (#60) ready your legend, so their partner list is the 24
  // legends carrying an ability with exhaust in its cost. A deck holds exactly one legend and it is
  // the one that fixes the identity, so the matcher must never present a second legend as a card
  // the list "runs" — two legends with the same domain pair would otherwise read as a pairing.
  const legendRules = synergies.filter((s) => s.partner.types?.length === 1 && s.partner.types[0] === "legend");

  it("exists, and only ever names the deck's own legend as the partner it holds", () => {
    expect(legendRules.length).toBeGreaterThan(0);
    // VEN-155 Heart of the Tempest carries "Disempower me, exhaust: ...", and SFD-210 Hall of
    // Legends is colourless, so this list is the smallest one that actually fires such a rule.
    const decks = [
      loadDeck("Legend: Heart of the Tempest\nBattlefields: Hall of Legends\nMain\n3 Gust", cards),
      loadDeck(fixture("fury.txt"), cards),
      loadDeck(fixture("lux.txt"), cards),
      loadDeck(fixture("recruits.txt"), cards),
    ];
    let fired = 0;
    for (const deck of decks) {
      for (const h of matchSynergies(deck, synergies, cards, constructed)) {
        if (!legendRules.some((s) => s.id === h.synergy.id)) continue;
        fired++;
        expect(h.partners.map((p) => p.card), h.synergy.id).toEqual([deck.legend]);
      }
    }
    expect(fired).toBeGreaterThan(0);
  });

  it("only ever pairs with a legend that has an ability costing its own exhaust", () => {
    for (const s of legendRules) {
      for (const c of partnersOf(s, cards)) {
        expect(c.type, `${s.id} -> ${c.base}`).toContain("legend");
        expect([c.text ?? "", c.effect ?? ""].join("\n"), `${s.id} -> ${c.base}`).toContain(":rb_exhaust::");
      }
    }
  });
});

describe("a battlefield never pairs with another battlefield", () => {
  // 485.4.a: "Each player provides three (3) Battlefields, included in their deck during deck
  // building. Only 1 will be used, chosen during setup." (486.4.a, 487.4.a for the other formats.)
  // A deck holds three, so two of them are legal together in a list and impossible together on a
  // board. `grand-plaza-unit-tokens` used to offer Altar to Unity, Emperor's Dais and Trapping
  // Grounds; `shadow-temple-trash-fuel` used to offer Hallowed Tomb. Four pairs that never fire.
  const isBattlefield = (base: string) => !!cards.get(base)?.type.includes("battlefield");

  it("holds for every rule in the file, including the ones written after this test", () => {
    const anchored = synergies.filter((s) => isBattlefield(s.anchor));
    // If this ever reads 0 the assertion below is vacuous and the guard has stopped being tested.
    expect(anchored.length).toBeGreaterThan(0);
    for (const s of anchored) {
      const offenders = partnersOf(s, cards).filter((c) => c.type.includes("battlefield"));
      expect(offenders.map((c) => `${s.id} -> ${c.base} ${c.name}`)).toEqual([]);
    }
  });

  it("leaves the rules anchored on anything else untouched", () => {
    // The guard keys on the anchor, so a unit or gear rule may still name a battlefield partner —
    // you do get one battlefield, and pairing a card with it is a real pairing.
    const others = synergies.filter((s) => !isBattlefield(s.anchor));
    const withBattlefieldPartner = others.filter((s) => partnersOf(s, cards).some((c) => c.type.includes("battlefield")));
    expect(withBattlefieldPartner.length).toBeGreaterThan(0);
  });
});

describe("an exclude reaches every printing of the card it names", () => {
  // An exclude names one base code, but a card reprinted under a second one is the same card, and
  // partnersOf collapses reprints onto the earliest printing. Banning only the named code let the
  // reprint through and then relabelled it with the excluded base, so the list showed the very card
  // the author had ruled out. Six shipped excludes were silently dead this way — Yone and Swain in
  // `skyfall-hold-conquer-bridge` and `reckoners-arena-conquer-on-hold`, Vayne and Zed in
  // `svellsongur-copy` — while every exclude on a single-printing card kept working, which is why
  // nothing looked wrong. Fixed 2026-09-06 by expanding the ban over cards.equivalents.
  it("drops Yone under Reckoner's Arena, whose SFD-233 reprint used to slip back in", () => {
    const rule = synergies.find((s) => s.id === "reckoners-arena-conquer-on-hold")!;
    // Guard the fixture itself: the bug only exists for a card with two printings.
    expect(cards.equivalents("SFD-116")).toEqual(expect.arrayContaining(["SFD-116", "SFD-233"]));
    expect(rule.partner.excludes?.map((x) => x.card)).toContain("SFD-116");
    const named = partnersOf(rule, cards).flatMap((c) => cards.equivalents(c.base));
    expect(named).not.toContain("SFD-116");
    expect(named).not.toContain("SFD-233");
  });

  it("holds for every exclude in the file, on every printing", () => {
    const withReprintedExclude = synergies.filter((s) =>
      (s.partner.excludes ?? []).some((x) => cards.equivalents(x.card).length > 1));
    // If this reads 0 the assertion below stops testing the bug it was written for.
    expect(withReprintedExclude.length).toBeGreaterThan(0);
    for (const s of synergies) {
      const named = new Set(partnersOf(s, cards).flatMap((c) => cards.equivalents(c.base)));
      for (const x of s.partner.excludes ?? []) {
        for (const printing of cards.equivalents(x.card)) {
          expect(named, `${s.id} excludes ${x.card} but lists ${printing}`).not.toContain(printing);
        }
      }
    }
  });
});
