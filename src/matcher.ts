import { bodyCheck, type BodyShortfall } from "./bodies.js";
import type { CardIndex } from "./cards.js";
import type { Deck, Domain, Format, LegalityEntry, Variant } from "./types.js";

export interface Hit {
  variant: Variant;
  missing: { card: string; quantity: number }[];
  /**
   * Bodies the line needs that no card supplies, still to be added — the `anyBodies` half of
   * `missing`. It is a separate channel because a `missing` row is keyed on a base code and this
   * requirement names no card; putting a synthetic code in there would make the UI look up a card
   * that does not exist. Its `count` IS folded into `missingCount`, so the buckets below and the
   * caller's distance cap see the real distance.
   */
  missingBodies?: BodyShortfall;
  missingCount: number;
  /** Ingredient cards outside the deck legend's domain identity. */
  offDomain: string[];
  /** Ingredient cards banned or restricted in the requested format. */
  illegal: LegalityEntry[];
}

export interface MatchResult {
  included: Hit[];
  includedByChangingLegend: Hit[];
  almostIncluded: Hit[];
  almostIncludedByAddingDomains: Hit[];
  almostIncludedByChangingLegend: Hit[];
  almostIncludedByAddingDomainsAndChangingLegend: Hit[];
}

export interface MatchOptions {
  format: Format;
  /** Show near-misses up to this many missing copies (default 2). */
  maxMissing?: number;
  includeSideboard?: boolean;
}

const emptyResult = (): MatchResult => ({
  included: [], includedByChangingLegend: [], almostIncluded: [], almostIncludedByAddingDomains: [],
  almostIncludedByChangingLegend: [], almostIncludedByAddingDomainsAndChangingLegend: [],
});

/**
 * Six-bucket matcher (shape borrowed from Commander Spellbook, identity axes replaced with
 * Riftbound's): multisets, near-miss by count, domain identity by subset of the legend's domains.
 */
export function matchDeck(deck: Deck, variants: Variant[], cards: CardIndex, opts: MatchOptions): MatchResult {
  const maxMissing = opts.maxMissing ?? 2;
  const result = emptyResult();

  // Owned copies by base code, counting alt printings under other numbers as the same card.
  const owned = new Map<string, number>();
  const bags = [deck.main, deck.battlefields, ...(opts.includeSideboard ? [deck.sideboard] : [])];
  for (const bag of bags) for (const [base, n] of Object.entries(bag)) {
    for (const eq of cards.equivalents(base)) owned.set(eq, (owned.get(eq) ?? 0) + n);
  }
  if (deck.legend) owned.set(deck.legend, 1);

  const bodies = bodyCheck(deck, cards, { includeSideboard: opts.includeSideboard });
  const legendDomains = deck.legend ? new Set<Domain>(cards.domainsOf(deck.legend)) : null;
  const inIdentity = (base: string) => !legendDomains || cards.domainsOf(base).every((d) => legendDomains.has(d));

  for (const v of variants) {
    // Safety net only: since #64 `generateVariants` refuses to compose a pool spanning more than
    // one legend's two domains (103.1.b), so this cuts nothing — pinned by a test in
    // test/matcher.test.ts over the whole catalogue. It stays because the matcher takes its
    // variants as an argument and cannot assume the caller built them with that filter.
    if (v.domains.length > 2) continue; // no legend can run it
    const missing: Hit["missing"] = [];
    let missingCount = 0;
    for (const [base, need] of Object.entries(v.cards)) {
      const have = owned.get(base) ?? 0;
      if (have < need) { missing.push({ card: base, quantity: need - have }); missingCount += need - have; }
    }
    // Bodies no card names, priced before the distance cap: a line needing three spare units in a
    // list with none is three cards away, and letting it through as "complete" is exactly the
    // defect (a deck of ONE battlefield card matched `power-nexus-rune-recycle-any-identity`).
    const short = bodies(v);
    const missingBodies = short && short.count > 0 ? short : undefined;
    if (missingBodies) missingCount += missingBodies.count;
    if (missingCount > maxMissing) continue;
    // A near miss needs at least one piece in hand; otherwise every 1–2 card combo is "almost" in every deck.
    // A body shortfall does not change that: the pieces in question are still cards.
    const ownedPieces = Object.keys(v.cards).filter((b) => (owned.get(b) ?? 0) > 0).length;
    if (missingCount > 0 && ownedPieces === 0) continue;

    const ownedOff = Object.keys(v.cards).filter((b) => (owned.get(b) ?? 0) > 0 && !inIdentity(b));
    const missingOff = missing.filter((m) => !inIdentity(m.card)).map((m) => m.card);
    const legendMismatch = !!(v.legends && deck.legend && !v.legends.includes(deck.legend));
    const changeLegend = ownedOff.length > 0 || legendMismatch;
    const addDomains = missingOff.length > 0;

    const hit: Hit = {
      variant: v,
      missing,
      missingBodies,
      missingCount,
      offDomain: [...ownedOff, ...missingOff],
      illegal: Object.keys(v.cards).map((b) => cards.legality(b, opts.format)).filter((e): e is LegalityEntry => !!e),
    };

    if (missingCount === 0) {
      (changeLegend ? result.includedByChangingLegend : result.included).push(hit);
    } else if (changeLegend && addDomains) {
      result.almostIncludedByAddingDomainsAndChangingLegend.push(hit);
    } else if (changeLegend) {
      result.almostIncludedByChangingLegend.push(hit);
    } else if (addDomains) {
      result.almostIncludedByAddingDomains.push(hit);
    } else {
      result.almostIncluded.push(hit);
    }
  }

  for (const bucket of Object.values(result) as Hit[][]) {
    bucket.sort((a, b) => a.missingCount - b.missingCount || a.variant.id.localeCompare(b.variant.id));
  }
  return result;
}
