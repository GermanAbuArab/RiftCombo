// The deckbuilder's arithmetic (#101). Everything a click does to a list lives here, so it can be
// tested the way `planDeck` and `checkBuild` are; `web/builder.ts` is the DOM around it.
//
// Two things this file deliberately does NOT do. It invents no storage format: it edits the same
// `Deck` the parser produces and writes it back out through `deckToText`, so a list built click by
// click and one pasted from a tournament report are the same string. And it never decides whether a
// deck is legal — `checkBuild` is the only place that answers that, row by row with its paragraph.
// What it enforces are the caps a click has to respect to keep the editor honest: three of a name
// (103.2.b), one battlefield of a name and three in all (103.4.c, 103.4.a), twelve runes (103.3.a),
// one legend. The Main Deck's own 40 is NOT one of them — 103.2 is a floor, not a ceiling, and the
// Construction checklist is what reports the difference.

import { ANY_NUMBER, championTagOf, copiesByName } from "./build.js";
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
}

export function capOf(deck: Deck, base: string, cards: CardIndex): Cap {
  const card = cards.get(base);
  if (!card) return { held: 0, max: 0, full: true, why: "Not a card in this pool.", badge: "Not in the pool" };
  const zone = zoneOf(card);
  if (zone === "legend") {
    const held = deck.legend === base ? 1 : 0;
    return { held, max: 1, full: held === 1, why: held ? "Already the legend of this list." : "", badge: held ? "The legend" : "" };
  }
  if (zone === "battlefields") {
    const held = deck.battlefields[base] ?? 0;
    const total = sum(deck.battlefields);
    if (held >= 1) return { held, max: 1, full: true, why: "1 of 1 · a deck holds one battlefield of each name (103.4.c).", badge: "1 of 1" };
    if (total >= BATTLEFIELDS) return { held, max: 1, full: true, why: `${total} of 3 battlefields (103.4.a).`, badge: `${total} of 3` };
    return { held, max: 1, full: false, why: "", badge: "" };
  }
  if (zone === "runes") {
    const held = deck.runes[base] ?? 0;
    const total = sum(deck.runes);
    const full = total >= RUNES;
    return { held, max: RUNES, full, why: full ? `${total} of 12 runes (103.3.a).` : "", badge: full ? `${total} of 12` : "" };
  }
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
    why: full ? `${held} of 3 · a Main Deck takes three of a name (103.2.b).` : "",
    badge: full ? `${held} of 3` : "",
  };
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
 * What stops a card going into the sideboard: 601.1.c.1 caps it at ten, 601.1.c.2 admits only Main
 * Deck cards, and 403.3 counts the copy limit across Main Deck and sideboard together -- the same
 * `mainCopiesOfName` the main cap reads, which is what keeps the two zones from adding up to six.
 */
export function sideboardCapOf(deck: Deck, base: string, cards: CardIndex): Cap {
  const card = cards.get(base);
  if (!card) return { held: 0, max: 0, full: true, why: "Not a card in this pool.", badge: "Not in the pool" };
  if (zoneOf(card) !== "main") return { held: 0, max: 0, full: true, why: "A sideboard holds Main Deck cards only (Tournament Rules 601.1.c.2).", badge: "Main Deck only" };
  const total = sum(deck.sideboard);
  const held = deck.sideboard[base] ?? 0;
  if (total >= SIDEBOARD) return { held, max: SIDEBOARD, full: true, why: `${total} of ${SIDEBOARD} in the sideboard (Tournament Rules 601.1.c.1).`, badge: `${total} of ${SIDEBOARD}` };
  const max = ANY_NUMBER.test(card.text ?? "") ? Infinity : MAIN_COPIES;
  const named = mainCopiesOfName(deck, cards, card.name);
  if (named >= max) return { held, max, full: true, why: `${named} of ${max} across Main Deck and sideboard (Tournament Rules 403.3).`, badge: `${named} of ${max}` };
  return { held, max, full: false, why: "", badge: "" };
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
 * Designate the Chosen Champion. It is a Main Deck card, and Tournament Rules 402.1 counts it inside
 * the 40 ("40 cards including a chosen champion"), so designating one that is not in the list yet
 * puts a copy there. Clearing the designation leaves the copies alone: the card is still playable.
 */
export function setChampion(deck: Deck, base: string | null, cards: CardIndex): Deck {
  if (!base) return { ...deck, champion: null };
  const card = cards.get(base);
  if (!card || zoneOf(card) !== "main") return deck;
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
