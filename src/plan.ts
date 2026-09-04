import type { CardIndex } from "./cards.js";
import { CLASS_RANK } from "./combos.js";
import type { Deck, Domain, Format, Variant } from "./types.js";

export interface Addition {
  /** Base card code to add. */
  card: string;
  /** Copies to add on top of what the list already holds. */
  quantity: number;
}

/** One catalogued line, priced against this deck: what it would cost to complete. */
export interface Route {
  variant: Variant;
  add: Addition[];
  /** Total copies to add. 0 means the list already has the line. */
  cost: number;
  /** Distinct ingredient cards the list already holds. */
  havePieces: number;
  totalPieces: number;
  /** Copies among `add` that are battlefields: they take one of the three battlefield slots. */
  battlefieldCopies: number;
}

export interface DeckPlan {
  /** The legend's two domains, or [] when the list names no legend. */
  domains: Domain[];
  /** Catalogued variants that fit inside those domains at all. 0 is a gap in the catalogue. */
  legalHere: number;
  /** Lines the list already completes. */
  have: Route[];
  /** Lines it does not, cheapest first, one per combo. */
  routes: Route[];
  /** Base codes in the list that appear in some line playable under this legend. */
  pieces: string[];
}

export interface PlanOptions {
  format: Format;
}

/**
 * Price every catalogued line against one deck and rank what it would take to complete the first
 * one. Domain Identity (103.1.b) caps a deck at its legend's two domains, so a card outside them
 * can never be suggested — that filter runs over the whole ingredient list, held pieces included.
 *
 * Unlike matchDeck's near-miss buckets there is no distance cap: a six-card route is still shown,
 * because the count itself says how far away it is, and hiding it would hide a real answer.
 */
export function planDeck(deck: Deck, variants: Variant[], cards: CardIndex, opts: PlanOptions): DeckPlan {
  if (!deck.legend) return { domains: [], legalHere: 0, have: [], routes: [], pieces: [] };

  const domains = cards.domainsOf(deck.legend);
  const identity = new Set<Domain>(domains);
  const inIdentity = (base: string) => cards.domainsOf(base).every((d) => identity.has(d));

  // Owned copies by base code, counting alt printings under other numbers as the same card.
  // The sideboard is excluded, matching what the deck panel says about matching.
  const owned = new Map<string, number>();
  for (const bag of [deck.main, deck.battlefields]) {
    for (const [base, n] of Object.entries(bag)) {
      for (const eq of cards.equivalents(base)) owned.set(eq, (owned.get(eq) ?? 0) + n);
    }
  }
  owned.set(deck.legend, 1);

  const priced: Route[] = [];
  const pieces = new Set<string>();
  for (const v of variants) {
    const bases = Object.keys(v.cards);
    if (!bases.every(inIdentity)) continue;
    // This view never proposes changing legend; the matcher's own buckets already cover that.
    if (v.legends && !v.legends.includes(deck.legend)) continue;
    // Never recommend buying a card that cannot be played in the format being matched.
    if (bases.some((b) => cards.legality(b, opts.format))) continue;

    for (const b of bases) if ((owned.get(b) ?? 0) > 0) pieces.add(b);

    const add: Addition[] = [];
    for (const [card, need] of Object.entries(v.cards)) {
      const have = owned.get(card) ?? 0;
      if (have < need) add.push({ card, quantity: need - have });
    }
    add.sort((a, b) => b.quantity - a.quantity || (cards.get(a.card)?.name ?? a.card).localeCompare(cards.get(b.card)?.name ?? b.card));
    priced.push({
      variant: v,
      add,
      cost: add.reduce((n, a) => n + a.quantity, 0),
      havePieces: bases.length - add.length,
      totalPieces: bases.length,
      battlefieldCopies: add.reduce((n, a) => n + (cards.get(a.card)?.type.includes("battlefield") ? a.quantity : 0), 0),
    });
  }

  // Cheapest first. Class only breaks a tie, so a line that wins outranks an engine of equal price.
  priced.sort((a, b) =>
    a.cost - b.cost ||
    CLASS_RANK[b.variant.class] - CLASS_RANK[a.variant.class] ||
    Number(b.variant.status === "verified") - Number(a.variant.status === "verified") ||
    a.totalPieces - b.totalPieces ||
    a.variant.id.localeCompare(b.variant.id));

  // One row per combo: the DAG flattens a single line into several variants, and listing each
  // flattening would fill the panel with the same recommendation at different prices.
  const have: Route[] = [];
  const routes: Route[] = [];
  const seen = new Set<string>();
  for (const r of priced) {
    const key = r.variant.comboIds[0]!;
    if (seen.has(key)) continue;
    seen.add(key);
    (r.cost === 0 ? have : routes).push(r);
  }

  return { domains, legalHere: priced.length, have, routes, pieces: [...pieces] };
}
