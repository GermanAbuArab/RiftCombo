import type { CardIndex } from "./cards.js";
import type { Deck, Domain, Format, LegalityEntry, Variant } from "./types.js";

export interface Hit {
  variant: Variant;
  missing: { card: string; quantity: number }[];
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

  const legendDomains = deck.legend ? new Set<Domain>(cards.domainsOf(deck.legend)) : null;
  const inIdentity = (base: string) => !legendDomains || cards.domainsOf(base).every((d) => legendDomains.has(d));

  for (const v of variants) {
    if (v.domains.length > 2) continue; // no legend can run it
    const missing: Hit["missing"] = [];
    let missingCount = 0;
    for (const [base, need] of Object.entries(v.cards)) {
      const have = owned.get(base) ?? 0;
      if (have < need) { missing.push({ card: base, quantity: need - have }); missingCount += need - have; }
    }
    if (missingCount > maxMissing) continue;
    // A near miss needs at least one piece in hand; otherwise every 1–2 card combo is "almost" in every deck.
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
