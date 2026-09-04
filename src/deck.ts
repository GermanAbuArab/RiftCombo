import { getDeckFromCode } from "@piltoverarchive/riftbound-deck-codes";
import type { CardIndex } from "./cards.js";
import type { Deck } from "./types.js";

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
