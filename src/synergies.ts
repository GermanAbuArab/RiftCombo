import type { CardIndex } from "./cards.js";
import { CARD_TYPES, SYNERGY_BASIS_KEYS, SYNERGY_EXCLUDE_KEYS, SYNERGY_KEYS, SYNERGY_PARTNER_KEYS } from "./types.js";
import type { Card, Deck, Domain, Format, Synergy } from "./types.js";

/** Rules text plus, for Equipment, the text it grants the unit it is attached to. */
export const synergyText = (c: Card): string => [c.text ?? "", c.effect ?? ""].join("\n");

export interface SynergyHit {
  synergy: Synergy;
  /** Copies of the anchor the list holds. */
  anchorCopies: number;
  /** Partners the list holds, by canonical base code, most copies first. */
  partners: { card: string; copies: number }[];
}

export interface SynergyOptions {
  format: Format;
}

export interface ValidateOptions {
  /**
   * Let a stale `reviewedCount` through. Only the review tool sets this: its whole job is to print
   * the list that has drifted so a human can read it, and refusing to run would hide it.
   */
  skipReviewCount?: boolean;
}

/**
 * FNV-1a over the sorted base codes. Stable across runs and across machines, independent of the
 * order `partnersOf` happens to return, and eight characters wide — see `Synergy.reviewedSet` for
 * why a real hash would be over-engineering on lists this size.
 */
export function fingerprintOf(partners: { base: string }[]): string {
  const joined = partners.map((c) => c.base).sort().join(",");
  let h = 0x811c9dc5;
  for (let i = 0; i < joined.length; i++) {
    h ^= joined.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/** Sanity checks the authored file must pass before anything is matched against it. */
export function validateSynergies(synergies: Synergy[], cards: CardIndex, opts: ValidateOptions = {}): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const s of synergies) {
    if (ids.has(s.id)) errors.push(`${s.id}: duplicate id`);
    ids.add(s.id);
    // AN EXTRA KEY IS THE SHAPE NOTHING ELSE CAN NOTICE, and the nested lists matter more than the
    // top-level one here: `textExclude` for `textExcludes` would simply not exclude anything, the
    // match list would be wider than intended, and a rule stamped in the same edit would carry that
    // as its reviewed baseline - the exact failure `reviewedSet` exists to catch, arriving through a
    // door it cannot watch. Closes the last class `validateCombos` checks and this did not.
    const keys = (obj: object | undefined, allowed: readonly string[], where: string) => {
      for (const k of Object.keys(obj ?? {})) {
        if (!allowed.includes(k)) errors.push(`${s.id}: unknown field ${where}${k}`);
      }
    };
    keys(s, SYNERGY_KEYS, "");
    keys(s.partner, SYNERGY_PARTNER_KEYS, "partner.");
    keys(s.basis, SYNERGY_BASIS_KEYS, "basis.");
    for (const x of s.partner?.excludes ?? []) keys(x, SYNERGY_EXCLUDE_KEYS, "partner.excludes[].");
    // `partner.types` was read straight into a filter and validated by nothing, so a mistyped type
    // would silently match NOTHING rather than fail - and a rule stamped in the same edit would
    // carry the mistake as its reviewed baseline.
    for (const t of s.partner?.types ?? []) {
      if (!(CARD_TYPES as readonly string[]).includes(t)) errors.push(`${s.id}: unknown card type ${t} in partner.types`);
    }
    const anchor = cards.get(s.anchor);
    if (!anchor) errors.push(`${s.id}: unknown anchor ${s.anchor}`);
    else if (anchor.base !== s.anchor) errors.push(`${s.id}: anchor ${s.anchor} is not a base code (use ${anchor.base})`);
    // A predicate that narrows on nothing is the whole pool wearing a rule's name.
    if (!s.partner.textMatches && !s.partner.tags) errors.push(`${s.id}: partner needs textMatches or tags`);
    for (const src of [s.partner.textMatches, s.partner.textExcludes]) {
      if (src === undefined) continue;
      try { new RegExp(src); } catch (e) { errors.push(`${s.id}: bad regex ${JSON.stringify(src)} — ${(e as Error).message}`); }
    }
    for (const x of s.partner.excludes ?? []) {
      const c = cards.get(x.card);
      if (!c) errors.push(`${s.id}: excludes unknown card ${x.card}`);
      else if (c.base !== x.card) errors.push(`${s.id}: excludes ${x.card}, not a base code (use ${c.base})`);
      if (!x.why.trim()) errors.push(`${s.id}: excludes ${x.card} with no reason`);
    }
    // The whole guarantee is that a human read the match list, so the rule has to say when.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.reviewed)) errors.push(`${s.id}: reviewed must be a YYYY-MM-DD date`);
    if (s.basis.rules.length === 0) errors.push(`${s.id}: basis.rules is empty`);
    // A rule anchored on a card banned everywhere can never fire, so it is dead weight in the UI.
    const formats: Format[] = ["constructed", "2v2"];
    if (anchor && formats.every((f) => cards.legality(s.anchor, f))) {
      errors.push(`${s.id}: anchor ${s.anchor} is banned in every format`);
    }
    const partners = partnersOf(s, cards);
    const found = partners.length;
    const fingerprint = fingerprintOf(partners);
    if (found === 0) errors.push(`${s.id}: partner predicate matches nothing`);
    else if (found !== s.reviewedCount && !opts.skipReviewCount) {
      // SIZE changed: a widening or a shrink. A new set legitimately widens many lists, so this is
      // the one an author often accepts after re-reading.
      const delta = found - s.reviewedCount;
      errors.push(`${s.id}: match list is ${s.reviewedCount} -> ${found} (${delta > 0 ? "+" : ""}${delta}) since ${s.reviewed}. ` +
        `Run \`npm run synergies -- ${s.id} --match\`, read it again, then update reviewed, reviewedCount and reviewedSet (now ${fingerprint}).`);
    } else if (!s.reviewedSet) {
      errors.push(`${s.id}: no reviewedSet — stamp it as ${fingerprint} (#219)`);
    } else if (fingerprint !== s.reviewedSet && !opts.skipReviewCount) {
      // SAME SIZE, DIFFERENT MEMBERS. A new set cannot do this: it only adds cards, which moves the
      // count. A swap is always a predicate change and always has to be read - this is the case
      // `reviewedCount` alone could never see (#219).
      errors.push(`${s.id}: the match list is still ${found} cards and is NOT THE SAME ${found} cards ` +
        `(${s.reviewedSet} -> ${fingerprint}) since ${s.reviewed}. A swap is a predicate change, never a new set. ` +
        `Run \`npm run synergies -- ${s.id} --match\`, read it again, then update reviewed and reviewedSet.`);
    }
  }
  return errors;
}

/**
 * Every card in the pool this rule pairs its anchor with, one row per printing family. Reprints
 * under a second base code collapse onto the earliest printing, the way a decklist does, so the
 * list a human reviews is the list of distinct cards.
 */
export function partnersOf(s: Synergy, cards: CardIndex): Card[] {
  const match = s.partner.textMatches ? new RegExp(s.partner.textMatches) : null;
  const reject = s.partner.textExcludes ? new RegExp(s.partner.textExcludes) : null;
  // Expanded over every printing, exactly like the anchor below: an exclude names one base code, but
  // a reprint under a second one carries the same card and collapses onto that base in the canonical
  // map further down, so banning the named code alone let the excluded card back into the list.
  const banned = new Set((s.partner.excludes ?? []).flatMap((x) => cards.equivalents(x.card)));
  const anchor = new Set(cards.equivalents(s.anchor));
  // 485.4.a: "Each player provides three (3) Battlefields ... Only 1 will be used, chosen during
  // setup." (486.4.a and 487.4.a say the same for the other formats.) So two of your battlefields
  // never share a board, and a rule anchored on one can never pair with another. This is a fact
  // about the format rather than about four cards, so it belongs here and not in `excludes`.
  const anchorIsBattlefield = !!cards.get(s.anchor)?.type.includes("battlefield");

  const canonical = new Map<string, Card>();
  for (const c of cards.cards) {
    if (c.base !== c.code) continue; // one row per base code; alt-art printings repeat the text
    // Tokens and the two helper cards are never in a decklist. Battlefields have no domains either,
    // and they are deckable, so the test has to spare them.
    if (c.domains.length === 0 && !c.type.includes("battlefield")) continue;
    if (anchorIsBattlefield && c.type.includes("battlefield")) continue;
    if (anchor.has(c.base) || banned.has(c.base)) continue;
    if (s.partner.types && !s.partner.types.some((t) => c.type.includes(t))) continue;
    if (s.partner.tags && !s.partner.tags.some((t) => c.tags.includes(t))) continue;
    if (s.partner.minMightBonus !== undefined && (c.mightBonus ?? -1) < s.partner.minMightBonus) continue;
    // Printed cost, per 206: a card that prints no Energy (or no Power) reads as absent, not as 0,
    // so it fails any floor a rule sets. `?? -1` is what makes `minEnergy: 0` still mean "prints one".
    if (s.partner.minEnergy !== undefined && (c.energy ?? -1) < s.partner.minEnergy) continue;
    if (s.partner.minPower !== undefined && (c.power ?? -1) < s.partner.minPower) continue;
    const text = synergyText(c);
    if ((match && !match.test(text)) || (reject && reject.test(text))) continue;
    const key = cards.resolveName(c.name) ?? c.base;
    if (!canonical.has(key)) canonical.set(key, cards.get(key) ?? c);
  }
  return [...canonical.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Copies of each base code the list holds, counting alt printings under other numbers as the same
 * card and the legend as one copy of itself. The sideboard is excluded, matching what the deck
 * panel says about matching.
 */
function ownedCopies(deck: Deck, cards: CardIndex): (base: string) => number {
  const owned = new Map<string, number>();
  for (const bag of [deck.main, deck.battlefields]) {
    for (const [base, n] of Object.entries(bag)) {
      for (const eq of cards.equivalents(base)) owned.set(eq, (owned.get(eq) ?? 0) + n);
    }
  }
  if (deck.legend) owned.set(deck.legend, 1);
  return (base) => owned.get(base) ?? 0;
}

/**
 * Whether this deck could play a card at all: Domain Identity (103.1.b) caps it at its legend's two
 * domains, and a card BANNED in the format being matched is never named — the same bar `src/plan.ts`
 * holds card suggestions to, so nothing here recommends buying an illegal card.
 *
 * `status === "banned"`, not the presence of a legality entry. A RESTRICTED card is a cap and not an
 * illegal card (#135, and plan.ts says so in its own comment), and treating the two alike was wrong
 * in both directions at once: `matchSynergies` dropped a partner the deck legally runs, and
 * `planSynergies` then reported a gap and told the player to add a card they already had. Today that
 * reaches exactly one row — `OGS-019 Wuju Bladesman - Starter`, the pool's only restricted printing,
 * restricted in 2v2 alone — so the same deck matched in Constructed and in 2v2 disagreed about a
 * synergy it runs either way. The docblock above claimed parity with plan.ts before this line did.
 */
function playableUnder(deck: Deck, cards: CardIndex, format: Format): (base: string) => boolean {
  const identity = new Set<Domain>(deck.legend ? cards.domainsOf(deck.legend) : []);
  return (base) => cards.domainsOf(base).every((d) => identity.has(d)) && cards.legality(base, format)?.status !== "banned";
}

/**
 * Report the patterns a deck already runs: the anchor is in the list and so is at least one card
 * its predicate catches. Domain Identity (103.1.b) caps a deck at its legend's two domains, so
 * anything outside them is dropped even when the list somehow holds it, and a card banned in the
 * format being matched is never named.
 */
export function matchSynergies(deck: Deck, synergies: Synergy[], cards: CardIndex, opts: SynergyOptions): SynergyHit[] {
  if (!deck.legend) return [];
  const playable = playableUnder(deck, cards, opts.format);
  const copies = ownedCopies(deck, cards);

  const hits: SynergyHit[] = [];
  for (const s of synergies) {
    const anchorCopies = Math.max(...cards.equivalents(s.anchor).map(copies));
    if (anchorCopies === 0 || !playable(s.anchor)) continue;
    const partners = partnersOf(s, cards)
      .filter((c) => playable(c.base))
      .map((c) => ({ card: c.base, copies: Math.max(...cards.equivalents(c.base).map(copies)) }))
      .filter((p) => p.copies > 0)
      .sort((a, b) => b.copies - a.copies || (cards.get(a.card)?.name ?? "").localeCompare(cards.get(b.card)?.name ?? ""));
    if (partners.length === 0) continue;
    hits.push({ synergy: s, anchorCopies, partners });
  }

  // Most partners first: a rule the list feeds from several angles is the one worth reading.
  return hits.sort((a, b) => b.partners.length - a.partners.length || a.synergy.id.localeCompare(b.synergy.id));
}

/** How many partners a rule names when the anchor is in the list and no partner is. */
const SUGGEST_PARTNERS = 3;

/** One card the list could add, with what it costs and whether the catalogue already uses it. */
export interface SynergySuggestion {
  /** Base code to add. */
  card: string;
  /** Energy plus Power printed on the card. A battlefield prints neither and reads 0. */
  cost: number;
  /** Battlefields cost one of the three battlefield slots instead of resources. */
  battlefield: boolean;
  /** True when a verified combo in the catalogue already uses this card. */
  catalogued: boolean;
}

/**
 * A rule the list is exactly one card short of: it holds the anchor and no partner, or partners and
 * no anchor. Rules it holds neither half of are not gaps, they are the rest of the catalogue.
 */
export interface SynergyGap {
  synergy: Synergy;
  /** Which half is missing. "anchor" means one card switches on everything the list already holds. */
  missing: "anchor" | "partner";
  /** Cards to add, cheapest first: the anchor, or up to three partners. */
  add: SynergySuggestion[];
  /** Partners the list already holds, most copies first. Empty when the anchor is what it holds. */
  partners: { card: string; copies: number }[];
  /** Copies of the anchor the list holds. 0 when the anchor is the missing half. */
  anchorCopies: number;
  /** Partners this legend could play at all, held or not. Says how wide the rule is here. */
  partnersAvailable: number;
}

export interface PlanSynergyOptions {
  format: Format;
  /** Base codes used by verified combos, so a suggestion can say the catalogue already walked it. */
  catalogued?: ReadonlySet<string>;
}

/**
 * Name the one card that would complete a pattern. `matchSynergies` only speaks when the list holds
 * both halves, which is silence for most decks — the fixture that motivated this holds two Red
 * Brambleback and no conquer effect, and heard nothing. This is the same job `planDeck` does for
 * catalogued lines: price what is missing and rank it, never leaving Domain Identity (103.1.b) or
 * suggesting a card that cannot be played in the format being matched.
 *
 * A missing anchor outranks a missing partner: one card there switches on every partner the list
 * already holds, while a missing partner only opens the rule from one side.
 */
export function planSynergies(
  deck: Deck,
  synergies: Synergy[],
  cards: CardIndex,
  opts: PlanSynergyOptions,
): SynergyGap[] {
  if (!deck.legend) return [];
  const playable = playableUnder(deck, cards, opts.format);
  const copies = ownedCopies(deck, cards);
  const held = (base: string) => Math.max(...cards.equivalents(base).map(copies));
  const catalogued = opts.catalogued ?? new Set<string>();

  const suggestion = (base: string): SynergySuggestion => {
    const c = cards.get(base);
    return {
      card: base,
      cost: (c?.energy ?? 0) + (c?.power ?? 0),
      battlefield: !!c?.type.includes("battlefield"),
      catalogued: cards.equivalents(base).some((eq) => catalogued.has(eq)),
    };
  };
  // Cheapest first, but every battlefield behind every card. A battlefield prints no Energy and no
  // Power at all, so on cost alone it would sweep the top of every list — and it is the opposite of
  // cheap: a deck has three battlefield slots against forty main-deck ones, which is why #18 counts
  // battlefield copies as their own currency instead of adding them to the price.
  const byCost = (a: SynergySuggestion, b: SynergySuggestion) =>
    Number(a.battlefield) - Number(b.battlefield) ||
    a.cost - b.cost ||
    (cards.get(a.card)?.name ?? a.card).localeCompare(cards.get(b.card)?.name ?? b.card);

  const gaps: SynergyGap[] = [];
  for (const s of synergies) {
    if (!playable(s.anchor)) continue;
    const anchorCopies = held(s.anchor);
    const available = partnersOf(s, cards).filter((c) => playable(c.base));
    if (available.length === 0) continue;

    const partners = available
      .map((c) => ({ card: c.base, copies: held(c.base) }))
      .filter((p) => p.copies > 0)
      .sort((a, b) => b.copies - a.copies || (cards.get(a.card)?.name ?? "").localeCompare(cards.get(b.card)?.name ?? ""));

    // Both halves present is a hit, not a gap; neither half is two cards away, not one.
    if (anchorCopies > 0 && partners.length > 0) continue;
    if (anchorCopies === 0 && partners.length === 0) continue;

    gaps.push({
      synergy: s,
      missing: anchorCopies === 0 ? "anchor" : "partner",
      add: anchorCopies === 0
        ? [suggestion(s.anchor)]
        : available.map((c) => suggestion(c.base)).sort(byCost).slice(0, SUGGEST_PARTNERS),
      partners,
      anchorCopies,
      partnersAvailable: available.length,
    });
  }

  return gaps.sort((a, b) =>
    // A missing anchor first, then the one that switches on the most cards already in the list.
    Number(a.missing === "partner") - Number(b.missing === "partner") ||
    b.partners.length - a.partners.length ||
    b.anchorCopies - a.anchorCopies ||
    (a.add[0]?.cost ?? 0) - (b.add[0]?.cost ?? 0) ||
    a.synergy.id.localeCompare(b.synergy.id));
}
