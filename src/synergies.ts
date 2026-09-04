import type { CardIndex } from "./cards.js";
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

/** Sanity checks the authored file must pass before anything is matched against it. */
export function validateSynergies(synergies: Synergy[], cards: CardIndex, opts: ValidateOptions = {}): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const s of synergies) {
    if (ids.has(s.id)) errors.push(`${s.id}: duplicate id`);
    ids.add(s.id);
    const anchor = cards.get(s.anchor);
    if (!anchor) errors.push(`${s.id}: unknown anchor ${s.anchor}`);
    else if (anchor.base !== s.anchor) errors.push(`${s.id}: anchor ${s.anchor} is not a base code (use ${anchor.base})`);
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
    const found = partnersOf(s, cards).length;
    if (found === 0) errors.push(`${s.id}: partner predicate matches nothing`);
    else if (found !== s.reviewedCount && !opts.skipReviewCount) {
      const delta = found - s.reviewedCount;
      errors.push(`${s.id}: match list is ${s.reviewedCount} -> ${found} (${delta > 0 ? "+" : ""}${delta}) since ${s.reviewed}. ` +
        `Run \`npm run synergies -- ${s.id} --match\`, read it again, then update reviewed and reviewedCount.`);
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
  const match = new RegExp(s.partner.textMatches);
  const reject = s.partner.textExcludes ? new RegExp(s.partner.textExcludes) : null;
  const banned = new Set((s.partner.excludes ?? []).map((x) => x.card));
  const anchor = new Set(cards.equivalents(s.anchor));

  const canonical = new Map<string, Card>();
  for (const c of cards.cards) {
    if (c.base !== c.code) continue; // one row per base code; alt-art printings repeat the text
    // Tokens and the two helper cards are never in a decklist. Battlefields have no domains either,
    // and they are deckable, so the test has to spare them.
    if (c.domains.length === 0 && !c.type.includes("battlefield")) continue;
    if (anchor.has(c.base) || banned.has(c.base)) continue;
    if (s.partner.types && !s.partner.types.some((t) => c.type.includes(t))) continue;
    if (s.partner.minMightBonus !== undefined && (c.mightBonus ?? -1) < s.partner.minMightBonus) continue;
    const text = synergyText(c);
    if (!match.test(text) || (reject && reject.test(text))) continue;
    const key = cards.resolveName(c.name) ?? c.base;
    if (!canonical.has(key)) canonical.set(key, cards.get(key) ?? c);
  }
  return [...canonical.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Report the patterns a deck already runs: the anchor is in the list and so is at least one card
 * its predicate catches. Domain Identity (103.1.b) caps a deck at its legend's two domains, so
 * anything outside them is dropped even when the list somehow holds it, and a card banned in the
 * format being matched is never named.
 */
export function matchSynergies(deck: Deck, synergies: Synergy[], cards: CardIndex, opts: SynergyOptions): SynergyHit[] {
  if (!deck.legend) return [];
  const identity = new Set<Domain>(cards.domainsOf(deck.legend));
  const playable = (base: string) =>
    cards.domainsOf(base).every((d) => identity.has(d)) && !cards.legality(base, opts.format);

  const owned = new Map<string, number>();
  for (const bag of [deck.main, deck.battlefields]) {
    for (const [base, n] of Object.entries(bag)) {
      for (const eq of cards.equivalents(base)) owned.set(eq, (owned.get(eq) ?? 0) + n);
    }
  }
  owned.set(deck.legend, 1);
  const copies = (base: string) => owned.get(base) ?? 0;

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
