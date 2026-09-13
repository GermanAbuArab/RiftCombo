// The deckbuilder's arithmetic (#101). Everything a click does to a list lives here, so it can be
// tested the way `planDeck` and `checkBuild` are; `web/builder.ts` is the DOM around it.
//
// Two things this file deliberately does NOT do. It invents no storage format: it edits the same
// `Deck` the parser produces and writes it back out through `deckToText`, so a list built click by
// click and one pasted from a tournament report are the same string. And it never decides whether a
// deck is legal — `checkBuild` is the only place that answers that, row by row with its paragraph.
// What it enforces is the user's contract of 2026-09-13, which splits the rules `checkBuild` scores
// by INVARIANT versus FORMAT. A rule no format exempts is BLOCKED at the button, with the reason on
// it: Domain Identity (103.1.b, and 103.3.a.1 for the Rune Deck), three of a name (103.2.b), one of
// each Unique name (825.3.a), three Signature cards each carrying the legend's champion tag
// (103.2.d) — plus the caps that keep the arithmetic honest: one battlefield of a name and three in
// all (103.4.c, 103.4.a), twelve runes (103.3.a), one legend. A rule that IS format-dependent is
// MARKED and the click is taken anyway: 103.2.e legality, which `web/builder.ts` badges on the cell
// and which this file deliberately says nothing about (#213). The Main Deck's own 40 is in neither
// tier — 103.2 is a floor, not a ceiling, and only the Construction checklist reports the difference.
//
// The checklist remains the authority and the block is a convenience that must never disagree with
// it, so every refusal below mirrors the row that scores the same rule in `src/build.ts`, reading the
// same predicate and the same bags rather than reasoning independently.
//
// Domain Identity used to live in `web/builder.ts` alone, where it reached a player clicking the POOL
// and nobody else — the deck column's own `+` read `capOf` and let an imported off-domain card climb
// (#212, measured in docs/phase0/walks/2026-09-13-builder-vs-checkbuild.md §3). Moving it here is why
// `capOf` now answers "may this card be here at all" and not only "how many copies of it".

import { ANY_NUMBER, SIGNATURE_CAP, UNIQUE, championTagOf, copiesByName } from "./build.js";
import { readableCardText } from "./cards.js";
import { deckToText, type DeckEntry } from "./deck.js";
import type { CardIndex } from "./cards.js";
import type { Card, CardType, Deck, Domain } from "./types.js";

/** Where a card goes when it is clicked. The Chosen Champion is a designation on a Main Deck card. */
export type DeckZone = "legend" | "battlefields" | "runes" | "main";
/** What the pool is scoped to. `champion` is the only one that needs a legend to mean anything. */
export type PoolZone = "all" | "legend" | "champion" | "main" | "battlefields" | "runes" | "sideboard";
/** Equipment is NOT a card type: it is gear carrying the Equipment tag, so it is its own option. */
export type PoolType = "unit" | "spell" | "gear" | "equipment";
export type SortKey = "name" | "cost" | "code";

export interface PoolFilters {
  /** Matched against the card's name and its rules text, with the icon tokens spelled out. */
  search: string;
  /** A card passes when it indicates one of these domains. Empty means no domain filter. */
  domains: Domain[];
  zone: PoolZone;
  type: PoolType | null;
  set: string | null;
  /** Printed Energy. 7 means 7 or more, which is where the curve's last bar sits too. */
  cost: number | null;
  sort: SortKey;
  /** Base code of the legend being built around. Scopes `champion` and nothing else. */
  legend: string | null;
}

export const COST_BUCKETS = 8;
/** Every set the pool prints, in release order. */
export const SETS = ["OGN", "OGS", "SFD", "UNL", "VEN"] as const;
const setOrder = (set: string) => {
  const i = (SETS as readonly string[]).indexOf(set);
  return i < 0 ? SETS.length : i;
};

export const emptyDeck = (): Deck => ({
  legend: null,
  champion: null,
  battlefields: {},
  runes: {},
  main: {},
  sideboard: {},
  unresolved: [],
});

const sum = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);

export interface ZoneCounts {
  legend: number;
  champion: number;
  battlefields: number;
  runes: number;
  main: number;
  sideboard: number;
}

export const zoneCounts = (deck: Deck): ZoneCounts => ({
  legend: deck.legend ? 1 : 0,
  champion: deck.champion ? 1 : 0,
  battlefields: sum(deck.battlefields),
  runes: sum(deck.runes),
  main: sum(deck.main),
  sideboard: sum(deck.sideboard),
});

export const isEmptyDeck = (deck: Deck): boolean => {
  const n = zoneCounts(deck);
  return !n.legend && !n.champion && !n.battlefields && !n.runes && !n.main && !n.sideboard;
};

/**
 * A decklist can never hold a token or one of the two typeless helpers (`UNL-T04 Buff`,
 * `UNL-T08 XP Tracker`), so the pool leaves them out — the same test the synergy lists use: no
 * domain indicated and not a battlefield. One cell per NAME, never per base or per printing (#104):
 * 101 playable names carry two or three bases — Riot reprints a card across sets (`Vi, Destructive`
 * is OGN-036 and VEN-167) and even within one set (94 legend bases are only 49 names, a main-set
 * printing plus a starter reissue) — and Core Rules 103.2.b counts copies by name, not by code. The
 * canonical printing of a name is the earliest by release order (`SETS`) and then collector number;
 * `otherBasesOf` hands back the rest for a "also VEN-167" mention.
 */
const pools = new WeakMap<CardIndex, Card[]>();
const nameBases = new WeakMap<CardIndex, Map<string, string[]>>();

/** Every base a name prints, canonical (earliest) first. Computed once per `CardIndex`. */
function basesByName(cards: CardIndex): Map<string, string[]> {
  const cached = nameBases.get(cards);
  if (cached) return cached;
  const seen = new Map<string, Set<string>>();
  for (const c of cards.cards) {
    if (!c.domains.length && !c.type.includes("battlefield")) continue;
    const card = cards.get(c.base);
    if (!card) continue;
    (seen.get(card.name) ?? seen.set(card.name, new Set()).get(card.name)!).add(card.base);
  }
  const rank = (base: string): number => {
    const c = cards.get(base)!;
    return setOrder(c.set) * 10000 + c.collectorNumber;
  };
  const map = new Map<string, string[]>();
  for (const [name, bases] of seen) map.set(name, [...bases].sort((a, b) => rank(a) - rank(b)));
  nameBases.set(cards, map);
  return map;
}

/** The other bases that print this same name, canonical order, excluding `base` itself. */
export function otherBasesOf(cards: CardIndex, base: string): string[] {
  const card = cards.get(base);
  if (!card) return [];
  return (basesByName(cards).get(card.name) ?? []).filter((b) => b !== base);
}

/** The canonical base for whatever name `base` prints — itself, unless an earlier printing exists. */
export function canonicalBase(cards: CardIndex, base: string): string {
  const card = cards.get(base);
  if (!card) return base;
  return basesByName(cards).get(card.name)?.[0] ?? base;
}

export function poolOf(cards: CardIndex): Card[] {
  const cached = pools.get(cards);
  if (cached) return cached;
  const out = [...basesByName(cards).values()]
    .map((bases) => cards.get(bases[0]!)!)
    .sort((a, b) => setOrder(a.set) - setOrder(b.set) || a.collectorNumber - b.collectorNumber);
  pools.set(cards, out);
  return out;
}

export function zoneOf(card: Card): DeckZone {
  if (card.type.includes("legend")) return "legend";
  if (card.type.includes("battlefield")) return "battlefields";
  if (card.type.includes("rune")) return "runes";
  return "main";
}

/** 103.1.b.1: a card is inside the identity when every domain it indicates is one of the legend's. */
export const inIdentity = (card: Card, identity: readonly Domain[]): boolean =>
  card.domains.every((d) => identity.includes(d));

// The haystack a search runs against, spelled out once per card index. `readableCardText` is what
// the player reads on the card, so it is what a search for "4 Energy" has to match — the raw text
// says `:rb_energy_4:`.
//
// The TAGS are in there too, and they carry the search a player actually types (#109). All 94
// legends are printed as a bare epithet — `Lady of Luminosity`, `Nine-Tailed Fox` — and the
// champion's name is only ever a tag, so `lux` and `ahri` in the Legend zone found nothing at all
// until now. The same line answers a tribal search: `OGN-088 Mega-Mech` is a Mech with no rules
// text, and `mech`, `yordle`, `equipment` or `noxus` reach it through no other field.
const haystacks = new WeakMap<CardIndex, Map<string, string>>();

function haystack(cards: CardIndex, card: Card): string {
  let map = haystacks.get(cards);
  if (!map) { map = new Map(); haystacks.set(cards, map); }
  const hit = map.get(card.base);
  if (hit !== undefined) return hit;
  const text = `${card.name}\n${card.tags.join(" ")}\n${readableCardText(card.text ?? "")}\n${readableCardText(card.effect ?? "")}`.toLowerCase();
  map.set(card.base, text);
  return text;
}

const typeMatches = (card: Card, type: PoolType): boolean =>
  type === "equipment"
    ? card.type.includes("gear") && card.tags.includes("Equipment")
    : card.type.includes(type as CardType);

export function filterPool(cards: CardIndex, filters: Partial<PoolFilters> = {}): Card[] {
  const { search = "", domains = [], zone = "all", type = null, set = null, cost = null, sort = "name", legend = null } = filters;

  // The Champion zone is the one scope that cannot be guessed: without a legend there is no champion
  // tag to compare against, and showing the whole pool would be answering a different question.
  const tag = zone === "champion" ? (legend ? championTagOf(legend, cards) : null) : null;
  if (zone === "champion" && !tag) return [];

  const needle = search.trim().toLowerCase();
  let out = poolOf(cards).filter((card) => {
    if (zone === "legend" && !card.type.includes("legend")) return false;
    if (zone === "battlefields" && !card.type.includes("battlefield")) return false;
    if (zone === "runes" && !card.type.includes("rune")) return false;
    if (zone === "main" && zoneOf(card) !== "main") return false;
    // 601.1.c.2: "A sideboard can consist only of valid Main Deck cards."
    if (zone === "sideboard" && zoneOf(card) !== "main") return false;
    if (zone === "champion" && !(card.type.includes("unit") && card.tags.includes(tag!))) return false;
    // A card that indicates NO domain passes every domain filter (#112). All 66 battlefields are
    // domainless, so a `some` test dropped the whole zone the moment a legend preselected its two
    // chips — and `inIdentity`, three lines up in this same file, already calls a battlefield legal
    // under any identity (`every` over an empty list). The filter may not hide what the cell would
    // happily add.
    if (domains.length && card.domains.length && !card.domains.some((d) => domains.includes(d))) return false;
    if (type && !typeMatches(card, type)) return false;
    if (set && card.set !== set) return false;
    if (cost !== null) {
      const e = card.energy;
      if (e === null) return false;
      if (cost >= COST_BUCKETS - 1 ? e < COST_BUCKETS - 1 : e !== cost) return false;
    }
    if (needle && !haystack(cards, card).includes(needle)) return false;
    return true;
  });

  const byName = (a: Card, b: Card) => a.name.localeCompare(b.name);
  if (sort === "name") out = out.sort(byName);
  else if (sort === "cost") out = out.sort((a, b) => (a.energy ?? 0) - (b.energy ?? 0) || (a.power ?? 0) - (b.power ?? 0) || byName(a, b));
  else out = out.sort((a, b) => setOrder(a.set) - setOrder(b.set) || a.collectorNumber - b.collectorNumber);
  return out;
}

// --- the caps -------------------------------------------------------------------------

const MAIN_COPIES = 3;
const BATTLEFIELDS = 3;
const RUNES = 12;
/** Tournament Rules 601.1.c.1: "A player's sideboard can include 10 or fewer cards." */
const SIDEBOARD = 10;

/** Copies of this exact card the list holds, in whichever zone the card belongs to. */
export function copiesOf(deck: Deck, base: string): number {
  if (deck.legend === base) return 1;
  return deck.battlefields[base] ?? deck.runes[base] ?? deck.main[base] ?? 0;
}

/**
 * Copies of a NAME the Main Deck holds. 103.2.b caps names, not codes, and Riot reprints a card
 * under a second base — `Lux, Crownguard` is OGS-014 and VEN-SP6 — so the two cells share one cap.
 */
/**
 * Copies of a NAME across the Main Deck and the sideboard together. Tournament Rules 403.3: "Limits
 * on copies of named cards as defined by competition format apply to the combination of Main Deck
 * and sideboard" -- so three in the sideboard leave no room in the main, and the other way round.
 * `copiesByName` (src/build.ts) is the one place that groups a name across bags and applies the
 * Spiderling exemption (002); `checkBuild`'s sideboard row (601.1.c.3 · 403.3, #197) reads the same
 * function, so the click-time cap here and the report's verdict can never drift apart.
 */
function mainCopiesOfName(deck: Deck, cards: CardIndex, name: string): number {
  return copiesByName(cards, [deck.main, deck.sideboard]).get(name)?.count ?? 0;
}

export interface Cap {
  /** Copies already held that count against this cap. */
  held: number;
  /** How many the rule allows. `Infinity` for a card whose own text lifts the cap (002). */
  max: number;
  /** Nothing more of this card can be added right now. */
  full: boolean;
  /** Why, in the sentence the cell shows. Empty when there is still room. */
  why: string;
  /**
   * The same refusal in three words, for the badge across a cell (#123). It is the count of the
   * rule that BINDS, which is not always the card's own: a fourth battlefield is refused by the
   * three in the list, not by the one copy of its name, and a cell that read "0 of 1" there was
   * answering a question nobody asked while the accessible name said the right thing.
   */
  badge: string;
  /**
   * The refusal is Domain Identity, which is the one the editor DIMS instead of badging (user
   * decision 2026-09-06: the "Off domain" bar across the artwork went, and the reason lives in the
   * button's accessible label and title). It is a flag rather than a `badge` string because that is
   * the only way the cell can dim on the same decision that refuses the click — before #212 it
   * re-tested the identity itself, which is exactly how the two buttons came to disagree.
   */
  offIdentity: boolean;
}

/**
 * 103.1.b at click time (#212). 103.1.b.1: "Cards included in your deck must abide by your Domain
 * Identity", with 103.1.b.2 making that identity the legend's own domains. With no legend there is no
 * identity to break — a different answer from "it is broken", and the same one `identityRule` gives
 * as `unknown`.
 *
 * The paragraph cited is the one the Construction checklist would cite for the same card, because the
 * button may not disagree with the checklist: the Rune Deck has its own row, so a rune is refused
 * under 103.3.a.1 ("Cards in the Rune Deck must be of the Domain Identity of your Champion Legend")
 * and everything else under 103.1.b.
 *
 * The SIDEBOARD is refused too, which preserves what the pool cell already did and is not a guess:
 * Tournament Rules 403.4 exchanges a sideboard card "1 for 1 with Main Deck cards" and 403.4.b says a
 * player "may not change their Runes, Legend, or Battlefields at any point after deck registration",
 * so the identity a sideboard card would be swapped into is fixed for the whole match. `identityRule`
 * does NOT read the sideboard today, which makes the button stricter than the checklist there; that is
 * a gap in the checklist rather than a licence to loosen the button, and it is filed as its own issue.
 */
function identityCap(deck: Deck, card: Card, cards: CardIndex, zone: DeckZone | "sideboard"): Cap | null {
  if (!deck.legend) return null;
  const identity = cards.domainsOf(deck.legend);
  if (inIdentity(card, identity)) return null;
  const rule = zone === "runes" ? "103.3.a.1" : "103.1.b";
  return {
    held: zone === "sideboard" ? (deck.sideboard[card.base] ?? 0) : copiesOf(deck, card.base),
    max: 0,
    full: true,
    offIdentity: true,
    why: `Outside ${identity.join(" + ")} — Domain Identity (${rule}).`,
    badge: "",
  };
}

/**
 * 825.3.a at click time (#210): "A deck can contain only one card of a given name if the card has
 * Unique". The editor capped a Unique name at three like any other and only the Construction checklist
 * objected — the first instance of the omission the census found, with 103.2.d (#211) the second.
 *
 * It mirrors `uniqueRule` (`src/build.ts`) deliberately, so a cell and its checklist row can never
 * disagree about one deck: the same exported `UNIQUE` predicate over the same two bags. 825.3.a says
 * "a deck" and Tournament Rules 403.3 puts limits on copies of named cards on "the combination of Main
 * Deck and sideboard", which is why the sideboard counts here where 103.2.b's own cap does not count it.
 *
 * Measured 2026-09-13 over all 1189 printings: three carry the keyword (SFD-190 Forgefire Cape,
 * SFD-191 Rabadon's Deathcrown, SFD-192 Shurelya's Requiem), they are three distinct names, and NO card
 * prints both `[Unique]` and Spiderling's "any number" clause — so those two card-text caps are
 * disjoint in this pool and their precedence is UNTESTED rather than decided. `test/builder.test.ts`
 * asserts the disjointness, so the day a card prints both, a red test asks the question instead of one
 * branch answering it silently.
 */
function uniqueCap(deck: Deck, card: Card, cards: CardIndex): Cap | null {
  if (!UNIQUE.test(card.text ?? "")) return null;
  const held = mainCopiesOfName(deck, cards, card.name);
  if (held < 1) return null;
  return { held, max: 1, full: true, offIdentity: false, why: `${held} of 1 · a Unique card is capped at one per deck (825.3.a).`, badge: `${held} of 1` };
}

export function capOf(deck: Deck, base: string, cards: CardIndex): Cap {
  const card = cards.get(base);
  if (!card) return { held: 0, max: 0, full: true, offIdentity: false, why: "Not a card in this pool.", badge: "Not in the pool" };
  const zone = zoneOf(card);
  // A legend is the one card Domain Identity can never refuse, so the gate below sits AFTER this
  // branch: 103.1.b.2 makes the identity "dictated by the domains of your Champion Legend", i.e. the
  // legend defines it rather than sitting inside it, and 103.1.b.1's "cards included in your deck" is
  // about the rest of the list. Until 2026-09-13 the editor refused an off-domain legend in the Legend
  // zone with "Outside calm + mind — Domain Identity (103.1.b)", so switching legends meant removing
  // one first — measured, and the census had not probed that zone. `addCard` replaces it instead.
  if (zone === "legend") {
    const held = deck.legend === base ? 1 : 0;
    return { held, max: 1, full: held === 1, offIdentity: false, why: held ? "Already the legend of this list." : "", badge: held ? "The legend" : "" };
  }
  const offDomain = identityCap(deck, card, cards, zone);
  if (offDomain) return offDomain;
  if (zone === "battlefields") {
    const held = deck.battlefields[base] ?? 0;
    const total = sum(deck.battlefields);
    if (held >= 1) return { held, max: 1, full: true, offIdentity: false, why: "1 of 1 · a deck holds one battlefield of each name (103.4.c).", badge: "1 of 1" };
    if (total >= BATTLEFIELDS) return { held, max: 1, full: true, offIdentity: false, why: `${total} of 3 battlefields (103.4.a).`, badge: `${total} of 3` };
    return { held, max: 1, full: false, offIdentity: false, why: "", badge: "" };
  }
  if (zone === "runes") {
    const held = deck.runes[base] ?? 0;
    const total = sum(deck.runes);
    const full = total >= RUNES;
    return { held, max: RUNES, full, offIdentity: false, why: full ? `${total} of 12 runes (103.3.a).` : "", badge: full ? `${total} of 12` : "" };
  }
  // PRECEDENCE among the Main Deck's four refusals, stated because getting it wrong is silent. The
  // order is "which rule would STILL refuse this click once the others were relieved", so the most
  // binding is reported first and a player is never sent to fix a rule they have not broken:
  //   103.1.b   — above, before the zones: no quantity of this card is ever legal in this list.
  //   103.2.d.2 — an off-tag Signature card can never be in THIS deck at any quantity either.
  //   825.3.a   — this NAME is capped at one; dropping some other card does not lift it.
  //   103.2.d.1 — three Signature cards in all; dropping another Signature card DOES lift it.
  //   103.2.b   — three of this name.
  // The middle pair had to be ordered rather than left to fall out, and Ornn is why. Measured over all
  // 51 Signature names, he is the only champion with three, and all three are Unique — so the
  // canonical Ornn list holding one of each refuses a second Forgefire Cape under BOTH rules, and
  // answering "3 of 3 Signature cards" there would name a rule the player cannot fix by dropping one:
  // 825.3.b keeps the two caps independent, "any combination of three Signature cards, but still only
  // one of each named Unique card".
  const tag = signatureTagCap(deck, card, cards);
  if (tag) return tag;
  const unique = uniqueCap(deck, card, cards);
  if (unique) return unique;
  const sig = signatureCountCap(deck, card, cards);
  if (sig) return sig;
  // 002 — card text supersedes rules text. `VEN-097 Spiderling` prints "Your deck can have any number
  // of cards named Spiderling", which is the whole of the exception today; matching the clause rather
  // than keeping a list of codes means the next card printing it is exempt the day it ships.
  const max = ANY_NUMBER.test(card.text ?? "") ? Infinity : MAIN_COPIES;
  const held = mainCopiesOfName(deck, cards, card.name);
  const full = held >= max;
  return {
    held,
    max,
    full,
    offIdentity: false,
    why: full ? `${held} of 3 · a Main Deck takes three of a name (103.2.b).` : "",
    badge: full ? `${held} of 3` : "",
  };
}

/**
 * 103.2.d at click time (#211). The editor let a fourth Signature card in with no block and no mark:
 * the `S` badge says a card IS a Signature card and never that you already hold three, so a player got
 * no signal at all until they read the Construction checklist. `docs/phase0/walks/2026-09-13-builder-vs-checkbuild.md`
 * measured the editor's three enforcement tiers and this rule was in none of them; 103.2.d admits no
 * format in which it does not apply, which puts it with 103.2.b rather than with legality.
 *
 * It mirrors `signatureRule` (`src/build.ts`) deliberately, down to reading `deck.main` alone and
 * counting COPIES rather than names, so the cell and the checklist row can never disagree about the
 * same deck. Two consequences of mirroring rather than reasoning independently: the sideboard is NOT
 * counted, because that row does not count it (103.2.d.1 caps a category, not copies of a name, so
 * Tournament Rules 403.3 does not reach it); and `SIGNATURE_CAP` is imported rather than repeated.
 *
 * The rule is TWO functions rather than one because 825.3.a has to sit between its halves: the tag is
 * an absolute prohibition and outranks every count, while the count of three is outranked by a Unique
 * name's count of one. `capOf` states the whole ordering and why.
 */
function signatureHeld(deck: Deck, cards: CardIndex): number {
  return Object.entries(deck.main)
    .map(([code, n]) => ({ card: cards.get(code), n }))
    .filter((x): x is { card: Card; n: number } => Boolean(x.card?.signature))
    .reduce((a, x) => a + x.n, 0);
}

/**
 * 103.2.d.2 — every Signature card carries the legend's champion tag. With no legend named there is no
 * tag to compare against, and `signatureRule` passes that case too rather than guessing.
 */
function signatureTagCap(deck: Deck, card: Card, cards: CardIndex): Cap | null {
  if (!card.signature) return null;
  const tag = deck.legend ? championTagOf(deck.legend, cards) : null;
  if (!tag || card.tags.includes(tag)) return null;
  return { held: signatureHeld(deck, cards), max: SIGNATURE_CAP, full: true, offIdentity: false, why: `A Signature card must carry the legend's ${tag} tag (103.2.d.2).`, badge: `Not ${tag}` };
}

/**
 * 103.2.d.1 — three in all, "regardless of name", so the count that binds is the deck's and not this
 * card's. Same shape as the battlefield branch above, where a fourth battlefield is refused by the
 * three already in the list rather than by the one copy of its own name (#123).
 */
function signatureCountCap(deck: Deck, card: Card, cards: CardIndex): Cap | null {
  if (!card.signature) return null;
  const held = signatureHeld(deck, cards);
  if (held < SIGNATURE_CAP) return null;
  return { held, max: SIGNATURE_CAP, full: true, offIdentity: false, why: `${held} of 3 · a deck takes three Signature cards, regardless of name (103.2.d.1).`, badge: `${held} of 3` };
}

const bump = (bag: Record<string, number>, base: string, by: number): Record<string, number> => {
  const next = { ...bag };
  const n = (next[base] ?? 0) + by;
  if (n > 0) next[base] = n; else delete next[base];
  return next;
};

/** Add one copy. A legend REPLACES the one already named — refusing that click helps nobody. */
export function addCard(deck: Deck, base: string, cards: CardIndex): Deck {
  const card = cards.get(base);
  if (!card) return deck;
  const zone = zoneOf(card);
  if (zone === "legend") return { ...deck, legend: base };
  if (capOf(deck, base, cards).full) return deck;
  if (zone === "battlefields") return { ...deck, battlefields: bump(deck.battlefields, base, 1) };
  if (zone === "runes") return { ...deck, runes: bump(deck.runes, base, 1) };
  return { ...deck, main: bump(deck.main, base, 1) };
}

/**
 * What stops a card going into the sideboard: Domain Identity (103.1.b, see `identityCap` for why it
 * reaches this zone), 601.1.c.1 caps it at ten, 601.1.c.2 admits only Main Deck cards, and 403.3
 * counts the copy limit across Main Deck and sideboard together -- the same `mainCopiesOfName` the
 * main cap reads, which is what keeps the two zones from adding up to six. 825.3.a joins that last
 * pair because it is the same axis, copies of a name, split off only because it cites a different
 * paragraph and caps at one (#210).
 */
export function sideboardCapOf(deck: Deck, base: string, cards: CardIndex): Cap {
  const card = cards.get(base);
  if (!card) return { held: 0, max: 0, full: true, offIdentity: false, why: "Not a card in this pool.", badge: "Not in the pool" };
  if (zoneOf(card) !== "main") return { held: 0, max: 0, full: true, offIdentity: false, why: "A sideboard holds Main Deck cards only (Tournament Rules 601.1.c.2).", badge: "Main Deck only" };
  const offDomain = identityCap(deck, card, cards, "sideboard");
  if (offDomain) return offDomain;
  const total = sum(deck.sideboard);
  const held = deck.sideboard[base] ?? 0;
  if (total >= SIDEBOARD) return { held, max: SIDEBOARD, full: true, offIdentity: false, why: `${total} of ${SIDEBOARD} in the sideboard (Tournament Rules 601.1.c.1).`, badge: `${total} of ${SIDEBOARD}` };
  const unique = uniqueCap(deck, card, cards);
  if (unique) return unique;
  const max = ANY_NUMBER.test(card.text ?? "") ? Infinity : MAIN_COPIES;
  const named = mainCopiesOfName(deck, cards, card.name);
  if (named >= max) return { held, max, full: true, offIdentity: false, why: `${named} of ${max} across Main Deck and sideboard (Tournament Rules 403.3).`, badge: `${named} of ${max}` };
  return { held, max, full: false, offIdentity: false, why: "", badge: "" };
}

export function addToSideboard(deck: Deck, base: string, cards: CardIndex): Deck {
  if (sideboardCapOf(deck, base, cards).full) return deck;
  return { ...deck, sideboard: bump(deck.sideboard, base, 1) };
}

export function removeFromSideboard(deck: Deck, base: string): Deck {
  return { ...deck, sideboard: bump(deck.sideboard, base, -1) };
}

/** Take one copy away. The last copy of the Chosen Champion takes the designation with it. */
export function removeCard(deck: Deck, base: string, cards: CardIndex): Deck {
  const card = cards.get(base);
  if (!card) return deck;
  const zone = zoneOf(card);
  if (zone === "legend") return deck.legend === base ? { ...deck, legend: null } : deck;
  if (zone === "battlefields") return { ...deck, battlefields: bump(deck.battlefields, base, -1) };
  if (zone === "runes") return { ...deck, runes: bump(deck.runes, base, -1) };
  const main = bump(deck.main, base, -1);
  return { ...deck, main, champion: deck.champion === base && !main[base] ? null : deck.champion };
}

/**
 * What stops a card being the Chosen Champion. The census (#212) named TWO rules that lived in
 * `web/builder.ts` and in no model: Domain Identity, which moved into `capOf`, and the champion tag,
 * which is this — and with it went 103.2.d.3, since `setChampion` never consulted `capOf` at all. So
 * the Champion button had the same shape of defect as the `+` did, one step less reachable because the
 * pool's Champion zone filters the cells and `rowHtml` repeats the test. This is that fix for the
 * third button: one function decides, the UI reads it back, and they cannot disagree.
 *
 * THE COPY CAP IS NOT ONE OF THEM, and that is the player-facing half. A Champion click DESIGNATES
 * rather than adds — `setChampion` puts a copy in the Main Deck only when the list holds none — so a
 * full 103.2.b refuses nothing when the copies are already there, and running a playset of your own
 * champion candidate is the ORDINARY build, not a corner. Measured 2026-09-13: three `Annie, Stubborn`
 * made her own Champion cell read "3 of 3 · a Main Deck takes three of a name (103.2.b)" and refuse the
 * designation. It still binds where the list holds NO copy of that card, because there the designation
 * really does add one — 103.2.b counts a NAME, so three of one printing bar a designation of another.
 *
 * With no legend named there is no tag to compare against and this judges nothing, exactly as
 * `championRule` reports `unknown` rather than guessing. The UI does not OFFER the button in that
 * state (the pool's Champion zone draws no cells without a legend, and `rowHtml` asks for a tag), which
 * is the honest division: the model does not guess and the UI does not offer what it cannot check.
 */
export function championCapOf(deck: Deck, base: string, cards: CardIndex): Cap {
  const card = cards.get(base);
  if (!card) return { held: 0, max: 0, full: true, offIdentity: false, why: "Not a card in this pool.", badge: "Not in the pool" };
  // 103.2.a.1 puts the Chosen Champion in the Champion Zone from the Main Deck before play.
  if (zoneOf(card) !== "main") return { held: 0, max: 0, full: true, offIdentity: false, why: "The Chosen Champion is a Main Deck card (103.2.a.1).", badge: "Main Deck only" };
  const held = copiesOf(deck, base);
  const offDomain = identityCap(deck, card, cards, "main");
  if (offDomain) return offDomain;
  // 103.2.d.3 — a Signature card is never the Chosen Champion, and Tibbers is the rule's own example.
  if (card.signature) return { held, max: 1, full: true, offIdentity: false, why: "A Signature card is never the Chosen Champion (103.2.d.3).", badge: "Signature" };
  // 103.2.a.2 — the Chosen Champion is a unit carrying the legend's champion tag.
  const tag = deck.legend ? championTagOf(deck.legend, cards) : null;
  if (tag && !(card.type.includes("unit") && card.tags.includes(tag))) {
    return { held, max: 1, full: true, offIdentity: false, why: `The Chosen Champion is a unit carrying the legend's ${tag} tag (103.2.a.2).`, badge: `Not ${tag}` };
  }
  // Only now does the copy cap matter, and only because designating would ADD the missing copy.
  if (!held) {
    const copies = capOf(deck, base, cards);
    if (copies.full) return copies;
  }
  return { held, max: 1, full: false, offIdentity: false, why: "", badge: "" };
}

/**
 * Designate the Chosen Champion. It is a Main Deck card, and Tournament Rules 402.1 counts it inside
 * the 40 ("40 cards including a chosen champion"), so designating one that is not in the list yet
 * puts a copy there. Clearing the designation leaves the copies alone: the card is still playable.
 */
export function setChampion(deck: Deck, base: string | null, cards: CardIndex): Deck {
  if (!base) return { ...deck, champion: null };
  const card = cards.get(base);
  if (!card || zoneOf(card) !== "main") return deck;
  if (championCapOf(deck, base, cards).full) return deck;
  const main = deck.main[base] ? deck.main : bump(deck.main, base, 1);
  return { ...deck, champion: base, main };
}

/**
 * Fold every zone bag onto the canonical base of its name (#104). A list a player pastes can name
 * either printing of a reprint (`loadDeck` resolves whatever code is written), so a Deck coming in
 * from text can hold two bags of the same name side by side — three OGN-036 Vi and one VEN-167 Vi,
 * both real entries. This is the one place that merges them, so the pool's single cell can read
 * `copiesOf` correctly and the deck column draws one row instead of two. Nothing is lost: only the
 * printing (never the count) is folded, and `deckToText` is free to write the canonical base back
 * out — the issue's own words are "el texto guardado puede conservar la base canónica".
 */
export function canonicalizeDeck(deck: Deck, cards: CardIndex): Deck {
  const fold = (bag: Record<string, number>): Record<string, number> => {
    const out: Record<string, number> = {};
    for (const [base, count] of Object.entries(bag)) {
      const canon = canonicalBase(cards, base);
      out[canon] = (out[canon] ?? 0) + count;
    }
    return out;
  };
  return {
    ...deck,
    legend: deck.legend ? canonicalBase(cards, deck.legend) : deck.legend,
    champion: deck.champion ? canonicalBase(cards, deck.champion) : deck.champion,
    battlefields: fold(deck.battlefields),
    runes: fold(deck.runes),
    main: fold(deck.main),
    sideboard: fold(deck.sideboard),
  };
}

// --- the Rune Deck --------------------------------------------------------------------

/**
 * The rune of each domain. Runes are printed under Origins and reprinted in Vendetta, and the two
 * are the same card to a deck, so the Origins printing is the one Auto reaches for. Read off the
 * pool rather than written down, so a third printing changes nothing here.
 */
export function runeOf(cards: CardIndex, domain: Domain): string | null {
  const runes = poolOf(cards).filter((c) => c.type.includes("rune") && c.domains.includes(domain));
  return (runes.find((c) => c.set === "OGN") ?? runes[0])?.base ?? null;
}

/**
 * Fill the Rune Deck with 12 runes split as evenly as the domains allow — 6/6 for the two every
 * legend has (103.1.a.1), 12 for one. It REPLACES what was there: Auto is a starting point a player
 * then edits with −/+, not something that adds to a half-built rune deck.
 */
export function autoRunes(deck: Deck, cards: CardIndex, domains?: readonly Domain[]): Deck {
  const identity = domains ?? (deck.legend ? cards.domainsOf(deck.legend) : []);
  if (!identity.length) return deck;
  const runes: Record<string, number> = {};
  identity.forEach((d, i) => {
    const base = runeOf(cards, d);
    if (!base) return;
    // The remainder goes to the first domains, so 12 across five would be 3/3/2/2/2.
    const share = Math.floor(RUNES / identity.length) + (i < RUNES % identity.length ? 1 : 0);
    if (share > 0) runes[base] = (runes[base] ?? 0) + share;
  });
  return { ...deck, runes };
}

// --- the curve ------------------------------------------------------------------------

export interface CostBar {
  /** 0 to 7, where 7 is every card costing 7 Energy or more. */
  energy: number;
  label: string;
  count: number;
}

/**
 * The Main Deck by printed Energy. Only the Main Deck: a battlefield prints no cost and a rune is
 * paid for by being recycled, so neither has a bar to stand in.
 */
export function costCurve(deck: Deck, cards: CardIndex): CostBar[] {
  const bars: CostBar[] = Array.from({ length: COST_BUCKETS }, (_, i) => ({
    energy: i,
    label: i === COST_BUCKETS - 1 ? `${i}+` : String(i),
    count: 0,
  }));
  for (const [base, n] of Object.entries(deck.main)) {
    const e = cards.get(base)?.energy;
    if (e === null || e === undefined) continue;
    bars[Math.min(e, COST_BUCKETS - 1)]!.count += n;
  }
  return bars;
}

// --- writing the list out --------------------------------------------------------------

/** One row of a zone in the deck column: the card, how many, and whether it is the Chosen Champion. */
export interface DeckRow {
  card: Card;
  count: number;
  champion: boolean;
}

/** A zone's rows, by cost and then by name, which is the order a player scans a list in. */
export function zoneRows(deck: Deck, cards: CardIndex, zone: DeckZone | "sideboard"): DeckRow[] {
  const bag = zone === "legend"
    ? (deck.legend ? { [deck.legend]: 1 } : {})
    : zone === "battlefields" ? deck.battlefields
    : zone === "runes" ? deck.runes
    : zone === "main" ? deck.main
    : deck.sideboard;
  return Object.entries(bag)
    .map(([base, count]) => ({ card: cards.get(base), count, champion: deck.champion === base }))
    .filter((r): r is DeckRow => Boolean(r.card))
    .sort((a, b) => (a.card.energy ?? 0) - (b.card.energy ?? 0) || a.card.name.localeCompare(b.card.name));
}

/**
 * The list as `deckToText` entries. The Chosen Champion is written under its own header with one
 * copy and the rest ride in the Main Deck, which is exactly how `normalizeDeck` reads it back: the
 * champion line adds a copy to `main` on the way in, so writing all of them twice would double it.
 */
export function deckEntries(deck: Deck, cards: CardIndex): DeckEntry[] {
  const out: DeckEntry[] = [];
  if (deck.legend) out.push({ code: deck.legend, count: 1, section: "legend" });
  if (deck.champion) out.push({ code: deck.champion, count: 1, section: "champion" });
  for (const zone of ["battlefields", "runes", "main"] as const) {
    for (const row of zoneRows(deck, cards, zone)) {
      const count = zone === "main" && row.champion ? row.count - 1 : row.count;
      if (count > 0) out.push({ code: row.card.base, count, section: zone });
    }
  }
  for (const row of zoneRows(deck, cards, "sideboard")) out.push({ code: row.card.base, count: row.count, section: "sideboard" });
  // A line the card index never recognised is still the player's: it goes back out as it came in,
  // under the header it was written under (#135) — a sideboard misspelling used to come back main.
  for (const u of deck.unresolved) out.push({ name: u.raw, count: u.count, section: u.section ?? "main" });
  return out;
}

/** The list as the plaintext a player pastes, which is the only thing this site ever stores. */
export const builderText = (deck: Deck, cards: CardIndex): string => deckToText(deckEntries(deck, cards), cards);
