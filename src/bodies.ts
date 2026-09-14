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
 * WHICH DIRECTION IT FAILS IN, MEASURED AT CORPUS SCALE (#218; rc-emit2, 2026-09-14). The two
 * directions are not equally bad - over-reporting costs a player a card they did not need, while
 * under-reporting tells them their deck is closer than it is, which is this very defect wearing a
 * smaller number. THE ARITHMETIC CAN ONLY FLATTER: `Math.max(0, count - spare)` is floored at zero
 * and capped at the authored count, and `spare` counts every unit CARD in the list. Over the 222
 * registered tournament lists in `test/fixtures/tournament-lists/`, **477 matched routes across 190
 * of the 222 lists carry a body requirement and 477 of 477 report a shortfall of ZERO** (predicate:
 * `matchDeck` at `maxMissing: 2`, included + almostIncluded, constructed). That is the corpus-scale
 * companion to the three fixtures' 24 of 24 - twenty times the population, same answer.
 *
 * AND YET IT IS ONE BODY FROM FIRING, WHICH IS THE HALF THE WORD "VACUOUS" HIDES. Slack per row
 * (spare minus count) over those 477: **min 0, p10 5, median 16, max 30**; 11 rows sit at 2 or
 * less. ONE row is at exactly zero - `barcelona-31.txt` against
 * `targons-peak-defy-delayed-ready+amateur-recital-free-evacuation`, spare 2 and needs 2 - and that
 * list is an Azir deck with exactly TWO unit cards in its Main Deck, every other body a Sand
 * Soldier token. So this check is vacuous in the MEDIAN and live at the TAIL, and the tail is
 * precisely the shape it was written for: a list whose bodies are tokens, which it deliberately
 * does not count. "It fires nowhere" and "it fires nowhere, and one body stricter it fires" are
 * different facts, and only the second says where this sits.
 *
 * THE ONE MECHANISM THAT CAN OVER-REPORT IS ON THE INPUT SIDE, NOT IN THE ARITHMETIC, and it is
 * reachable in this repo today. `held` reads the parsed bags, so a unit line the parser could not
 * resolve is invisible to it: `sydney-07.txt` carries `x2 Adaptatron`, which lands in
 * `deck.unresolved`, and `OGN-056 Adaptatron` is a UNIT - two unit copies the check cannot see, on
 * a real registered list. The arithmetic claim stands; the sentence "it flatters and cannot do
 * otherwise" is true of the ARITHMETIC and not of the INPUT. Latent by a wide margin there (that
 * list's tightest slack is 14), and the honest statement is that the direction is one-way in every
 * path except a parse failure. `test/tournament-lists.test.ts` pins those four unresolved lines by
 * name, so this cannot grow silently.
 *
 * TWO FLATTERING PATHS THAT LOOK REACHABLE AND ARE NOT, checked so nobody re-opens them. A unit in
 * the `battlefields` bag would inflate `held`; it cannot get there, because BOTH construction paths
 * classify by the CARD'S OWN TYPE before any section header - `normalizeDeck` since #133, and
 * `zoneOf` in `src/builder.ts`. And `deck.champion` is not a bag here, which would UNDER-count by
 * one; it cannot, because both paths also put the champion in `main` (`normalizeDeck` falls through
 * to `add(deck.main, ...)`, and `setChampion` bumps it in when absent). 0 of 222 lists exhibit
 * either, which is corroboration rather than the proof. Two unit `uses` rows that are equivalents
 * of each other would make `committed` double-count and therefore OVER-report: 0 of 1,641 variants.
 *
 * A BANNED UNIT STILL COUNTS AS A BODY, DELIBERATELY - and the coverage argument is `deckRestrictions`
 * rather than `hit.illegal`, which is the correction #218 needs. There are TWO such cards, not one:
 * `OGN-177 Stealthy Pursuer` and `SFD-020 Draven, Vanquisher`, both banned in both formats
 * (measured two ways - `data/legality.json`'s own `entity` field, and the card's type - which agree;
 * 0 of the 222 lists hold either). `hit.illegal` reads only the LINE'S cards, so it cannot see a
 * banned unit sitting in the list as a SPARE body, which is exactly the flattering case.
 * `deckRestrictions` can: it reads main, battlefields, runes, sideboard and the legend, and the
 * panel it feeds is the FIRST thing in the deck column. So the player is told, and making this
 * function format-aware would couple it to a concern it does not have for a case already covered.
 *
 * Returns a factory, because the deck-side total is the same for every variant and the callers walk
 * 1,638 of them.
 */
export function bodyCheck(deck: Deck, cards: CardIndex, opts: { includeSideboard?: boolean } = {}): (v: Variant) => BodyShortfall | null {
  const isUnit = (base: string) => cards.get(base)?.type.includes("unit") ?? false;

  // THE SAME BAGS THE CALLER COUNTS, or this check disagrees with the match it is part of.
  // `matchDeck` takes `includeSideboard` and `planDeck` deliberately does not offer it, and the
  // first version of this function silently ignored the option: a list whose units were all in the
  // sideboard would have been reported as holding the CARDS and short of the BODIES, from one call.
  // Nothing passes the flag today, which is exactly why it was invisible and why it is fixed now.
  const bags = [deck.main, deck.battlefields, ...(opts.includeSideboard ? [deck.sideboard] : [])];

  // Counted from the raw bags rather than from an equivalents-expanded map: `equivalents` maps one
  // printing onto every base sharing its name+type, so summing an expanded map counts a Daring Poro
  // twice (OGN-210 and UNL-225).
  //
  // Battlefields hold no units, and a LEGEND is never one of these bodies. The paragraphs that make
  // that true are 107.4.b, "This is not a location", and 107.4.d, "The Champion Legend cannot be
  // removed, moved, or displaced from this zone" — and .d is the sharper of the two here, because a
  // body that can never leave its zone can never walk to a battlefield, so it can never be the body
  // an `anyBodies` requirement wants. 107.4.c is the CONTRAST and not the argument: "The Champion
  // Legend here is a Game Object" is the paragraph that makes a legend look MOST like a body, and
  // citing it alone — which this comment did until rc-gap2 read it — argues the other way.
  // Behaviour never depended on the citation: `isUnit` is type-based and a legend's type is legend.
  let held = 0;
  for (const bag of bags) for (const [base, n] of Object.entries(bag)) if (isUnit(base)) held += n;

  // Copies of a base the list actually holds, alt printings folded in — the same reading of
  // `equivalents` the matcher uses (601.2.a: legality travels with the name, so two printings of a
  // name are interchangeable by rule).
  const owned = new Map<string, number>();
  for (const bag of bags) for (const [base, n] of Object.entries(bag)) {
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
