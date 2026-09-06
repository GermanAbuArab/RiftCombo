import { getCodeFromDeck, getDeckFromCode } from "@piltoverarchive/riftbound-deck-codes";
import type { CardIndex } from "./cards.js";
import type { Deck, Format, LegalityEntry } from "./types.js";

export interface DeckEntry {
  /** A card code ("OGN-212", "OGN-212/298", "OGN-212-1") if the source gave one. */
  code?: string;
  /** A card name if the source gave one. */
  name?: string;
  count: number;
  /** Section header the line appeared under, lower-cased, if any. */
  section?: string;
}

const SECTION_ALIASES: Record<string, string> = {
  legend: "legend", legends: "legend",
  champion: "champion", champions: "champion", chosenchampion: "champion",
  maindeck: "main", main: "main", mainboard: "main", deck: "main",
  battlefield: "battlefields", battlefields: "battlefields",
  rune: "runes", runes: "runes", runedeck: "runes", runepool: "runes",
  sideboard: "sideboard", side: "sideboard",
};

const CODE_RE = /^([A-Z]{3})-([A-Z]*\d{1,3}[a-z*]?)(?:\/\d+)?(?:-(\d+))?$/i;

/** Parse the plaintext dialects seen on Piltover Archive, riftbound.gg, TTS exports and articles. */
export function parseDeckText(text: string): DeckEntry[] {
  const out: DeckEntry[] = [];
  let section: string | undefined;
  for (const rawLine of text.split(/\r?\n/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("//")) continue;
    const header = line.replace(/^~~|~~$/g, "").replace(/[:\-–—\s()]+$/g, "").toLowerCase().replace(/[^a-z]/g, "");
    if (SECTION_ALIASES[header]) { section = SECTION_ALIASES[header]; continue; }
    // Inline header: "Legend: Heart of the Tempest", "Battlefields: The Grand Plaza"
    const inline = line.match(/^([A-Za-z ]+):\s*(.+)$/);
    if (inline) {
      const alias = SECTION_ALIASES[inline[1]!.toLowerCase().replace(/[^a-z]/g, "")];
      if (alias) { section = alias; line = inline[2]!.trim(); }
    }

    // TTS token dump: "OGN-265-1 OGN-110-1 UNL-165-2 ...". The variant class must match CODE_RE's
    // ([a-z*], not [a-z]): 45 printings are alt-arts whose code ends in "*", and this guard is a
    // whole-line test, so one of them made every code on the line fall through as a bogus name.
    if (/^(?:[A-Z]{3}-[A-Z]*\d{1,3}[a-z*]?-\d+\s*)+$/i.test(line)) {
      for (const tok of line.split(/\s+/)) {
        const m = tok.match(CODE_RE);
        if (m) out.push({ code: `${m[1]}-${m[2]}`, count: 1, section });
      }
      continue;
    }

    let count = 1;
    let m = line.match(/^(\d+)\s*[xX×]?\s+(.+)$/);
    if (m) { count = Number(m[1]); line = m[2]!.trim(); }
    else if ((m = line.match(/^(.+?)\s+[xX×]\s*(\d+)$/))) { line = m[1]!.trim(); count = Number(m[2]); }

    // "Name (OGN-001)" or "Name [OGN-001]" or bare code
    const trailing = line.match(/^(.*?)\s*[([]\s*([A-Z]{3}-[A-Z]*\d{1,3}[a-z*]?(?:\/\d+)?)\s*[)\]]\s*$/i);
    if (trailing) {
      out.push({ code: trailing[2]!.toUpperCase(), name: trailing[1]!.trim() || undefined, count, section });
    } else if (CODE_RE.test(line)) {
      const c = line.match(CODE_RE)!;
      out.push({ code: `${c[1]}-${c[2]}`.toUpperCase(), count, section });
    } else {
      out.push({ name: line, count, section });
    }
  }
  return out;
}

/** Decode a Piltover Archive style deck code into entries. Runes/legend/battlefields are mixed into mainDeck. */
export function decodeDeckCode(code: string): DeckEntry[] {
  const deck = getDeckFromCode(code.trim());
  const out: DeckEntry[] = [];
  for (const c of deck.mainDeck) out.push({ code: c.cardCode, count: c.count, section: "main" });
  for (const c of deck.sideboard ?? []) out.push({ code: c.cardCode, count: c.count, section: "sideboard" });
  if (deck.chosenChampion) out.push({ code: deck.chosenChampion, count: 1, section: "champion" });
  return out;
}

export function isDeckCode(input: string): boolean {
  return /^[A-Z2-7]{20,}=*$/.test(input.trim());
}

const add = (bag: Record<string, number>, k: string, n: number) => { bag[k] = (bag[k] ?? 0) + n; };

/** Resolve entries to base codes and classify by card type. */
export function normalizeDeck(entries: DeckEntry[], cards: CardIndex): Deck {
  const deck: Deck = { legend: null, champion: null, battlefields: {}, runes: {}, main: {}, sideboard: {}, unresolved: [] };
  for (const e of entries) {
    const base = (e.code && cards.resolveCode(e.code)) || (e.name && cards.resolveName(e.name)) || null;
    if (!base) { deck.unresolved.push({ raw: e.code ?? e.name ?? "?", count: e.count }); continue; }
    const card = cards.get(base)!;
    if (e.section === "sideboard") { add(deck.sideboard, base, e.count); continue; }
    if (e.section === "champion") { deck.champion = base; add(deck.main, base, e.count); continue; }
    if (card.type.includes("legend")) { deck.legend = base; continue; }
    if (card.type.includes("battlefield")) { add(deck.battlefields, base, e.count); continue; }
    if (card.type.includes("rune")) { add(deck.runes, base, e.count); continue; }
    add(deck.main, base, e.count);
  }
  return deck;
}

export function loadDeck(input: string, cards: CardIndex): Deck {
  const entries = isDeckCode(input) ? decodeDeckCode(input) : parseDeckText(input);
  return normalizeDeck(entries, cards);
}

/** A banned or restricted card the pasted list actually holds, in one format. */
export interface DeckRestriction {
  entry: LegalityEntry;
  /** Base code as the list resolved it. */
  base: string;
  /** Copies across every zone of the list, sideboard included. */
  count: number;
}

/**
 * The restricted cards a parsed list holds. Legality is format-scoped, so this is a read over the
 * deck taking the format, never a flag baked into the parse: the same list is legal or not
 * depending on which format the player picked. Same shape as `matchDeck`'s per-variant `illegal`.
 * Banned first, then restricted, each group by name.
 */
export function deckRestrictions(deck: Deck, cards: CardIndex, format: Format): DeckRestriction[] {
  const found = new Map<string, DeckRestriction>();
  const seen = (base: string, count: number) => {
    const entry = cards.legality(base, format);
    if (!entry) return;
    const prev = found.get(base);
    if (prev) prev.count += count;
    else found.set(base, { entry, base, count });
  };
  // The champion is already counted inside main; the legend is the only card outside the bags.
  if (deck.legend) seen(deck.legend, 1);
  for (const bag of [deck.main, deck.battlefields, deck.runes, deck.sideboard]) {
    for (const [base, n] of Object.entries(bag)) seen(base, n);
  }
  const rank = (r: DeckRestriction) => (r.entry.status === "banned" ? 0 : 1);
  return [...found.values()].sort((a, b) => rank(a) - rank(b) || a.entry.name.localeCompare(b.entry.name));
}

/**
 * The sections a written-out list carries, in the order a player reads them. Every header here is one
 * SECTION_ALIASES already accepts, so anything this writes, `parseDeckText` reads back.
 */
const SECTION_ORDER: [string, string][] = [
  ["legend", "Legend"],
  ["champion", "Champion"],
  ["battlefields", "Battlefields"],
  ["runes", "Runes"],
  ["main", "Main Deck"],
  ["sideboard", "Sideboard"],
];

/**
 * Serialise entries — an `/api/deck-url` payload, or anything else shaped like one — into the plaintext
 * dialect the textarea accepts. Every line carries BOTH the name and the base code
 * ("3 Sacrifice (UNL-173)"), because the name is what a player recognises and the code is what survives a
 * reprint. An entry the card index does not know keeps whatever it arrived with, so importing a deck
 * never silently loses a line.
 */
export function deckToText(entries: readonly DeckEntry[], cards: CardIndex): string {
  const bySection = new Map<string, string[]>();
  for (const e of entries) {
    const base = (e.code && cards.resolveCode(e.code)) || (e.name && cards.resolveName(e.name)) || null;
    const card = base ? cards.get(base) : undefined;
    const section = e.section && SECTION_ORDER.some(([k]) => k === e.section) ? e.section : "main";
    const line = card ? `${e.count} ${card.name} (${card.base})` : `${e.count} ${e.name ?? e.code ?? "?"}`;
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section)!.push(line);
  }
  return SECTION_ORDER
    .filter(([key]) => bySection.get(key)?.length)
    .map(([key, header]) => `${header}\n${bySection.get(key)!.join("\n")}`)
    .join("\n\n");
}

/**
 * A Piltover Archive deck code for a parsed list. The codec takes one flat array for everything that is
 * not a sideboard — legend, runes and battlefields included — plus the Chosen Champion separately, and it
 * counts that champion as a Main Deck card on the way back out. `deck.main` already holds it (see
 * `normalizeDeck`, and Tournament Rules 402.1's "40 cards including a chosen champion"), so the one copy
 * in the champion slot is taken out of the array here or it would come back doubled. Extra copies of the
 * same card stay, which is exactly what 103.2.b.1 allows.
 */
export function encodeDeckCode(deck: Deck): string {
  const main: { cardCode: string; count: number }[] = [];
  const push = (bag: Record<string, number>) => {
    for (const [cardCode, count] of Object.entries(bag)) if (count > 0) main.push({ cardCode, count });
  };
  if (deck.legend) main.push({ cardCode: deck.legend, count: 1 });
  const mainless = { ...deck.main };
  const chosen = deck.champion ? mainless[deck.champion] : undefined;
  if (deck.champion && chosen) mainless[deck.champion] = chosen - 1;
  push(mainless);
  push(deck.runes);
  push(deck.battlefields);
  const side = Object.entries(deck.sideboard).map(([cardCode, count]) => ({ cardCode, count }));
  return getCodeFromDeck(main, side, deck.champion ?? undefined);
}
