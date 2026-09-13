import type { CardIndex } from "./cards.js";
import type { Deck, Variant } from "./types.js";

/** What a variant's `anyBodies` requirement costs this deck: 0 means the deck already covers it. */
export interface BodyShortfall {
  /** Unit cards still to add. */
  count: number;
  /** Every contributing entry's requirement, in its own words. */
  notes: string[];
}

/**
 * Price a line's `anyBodies` requirement against a deck — AND THE CHECK IS DELIBERATELY WEAK.
 *
 * The honest question a DECKLIST can answer is *"does this list hold N unit cards beyond the ones
 * this line already commits?"*, and that is all this asks. It cannot ask the question the entries
 * actually state — *"is one of them standing at a battlefield besides the Apothecary"* — because
 * `matchDeck` and `planDeck` read a list of cards and never a board: nothing here knows where a
 * body is, whether it is ready, or which card it is standing next to. A check that is honest about
 * its own limit beats one that silently over-reports, which is what the catalogue had.
 *
 * So it is nearly vacuous on a real deck, and that is fine, because the case it exists for is not a
 * real deck. Measured 2026-09-13 through the matcher before any of this existed: `3x UNL-044` plus
 * one `OGN-293` **with no units in the list at all** returned `flurry-of-feathers-grand-plaza-win`
 * as INCLUDED, a deck of `3x UNL-088` returned `gutter-palace`, and a **ONE-CARD** deck holding
 * only `SFD-214` returned `power-nexus-rune-recycle-any-identity`. Three lines the site called
 * complete for boards that cannot take a single step, two of them ALT_WIN, i.e. the sentence the
 * player reads is *"you win the game"*.
 *
 * TOKENS ARE NOT COUNTED HERE, ON PURPOSE. A line's own cards may play unit tokens, and reading
 * that out of card text is the instrument that under-reported its own supply in rc-gap's sweep (it
 * cannot see `SFD-059 Svellsongur` multiplying a token play). The author nets tokens out when they
 * write the count: `flurry-of-feathers-grand-plaza-win` needs seven bodies at the Plaza, `UNL-044`
 * supplies four Birds, and the authored count is 3. Keeping the parser out of the matcher keeps one
 * number authored and checkable instead of two numbers disagreeing.
 *
 * Returns a factory, because the deck-side total is the same for every variant and the callers walk
 * 1,638 of them.
 */
export function bodyCheck(deck: Deck, cards: CardIndex): (v: Variant) => BodyShortfall | null {
  const isUnit = (base: string) => cards.get(base)?.type.includes("unit") ?? false;

  // Counted from the raw bag rather than from an equivalents-expanded map: `equivalents` maps one
  // printing onto every base sharing its name+type, so summing an expanded map counts a Daring Poro
  // twice (OGN-210 and UNL-225). Battlefields hold no units and the legend is not one (107.4.c
  // makes it a Game Object on the board, and 143.4 exhausts units — it is neither a unit card nor a
  // body this list could add), so the main deck is the whole population.
  let held = 0;
  for (const [base, n] of Object.entries(deck.main)) if (isUnit(base)) held += n;

  // Copies of a base the list actually holds, alt printings folded in — the same reading of
  // `equivalents` the matcher uses (601.2.a: legality travels with the name, so two printings of a
  // name are interchangeable by rule).
  const owned = new Map<string, number>();
  for (const bag of [deck.main, deck.battlefields]) for (const [base, n] of Object.entries(bag)) {
    for (const eq of cards.equivalents(base)) owned.set(eq, (owned.get(eq) ?? 0) + n);
  }

  return (v: Variant) => {
    if (!v.anyBodies) return null;
    // Copies of the line's own unit cards that this list is already spending on the line. Capped at
    // what the list holds: a unit the deck does not own is reported by the ordinary `missing` path
    // and must not also be charged here, or a near miss would pay for the same card twice.
    let committed = 0;
    for (const [base, need] of Object.entries(v.cards)) {
      if (isUnit(base)) committed += Math.min(owned.get(base) ?? 0, need);
    }
    const spare = held - committed;
    return { count: Math.max(0, v.anyBodies.count - spare), notes: v.anyBodies.notes };
  };
}
