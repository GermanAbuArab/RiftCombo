// Saved decks (#31): everything about a stored list that can be decided without a network call.
//
// The client of the database lives in `web/supabase.ts`; this file holds the part that has an
// answer on its own — what a name may be, what a row means, and which order a list comes back in —
// so it can be tested the way `planDeck` is, instead of only against a live project.

import { loadDeck } from "./deck.js";
import type { CardIndex } from "./cards.js";
import type { Format } from "./types.js";

/** A row of `public.decks`, in the shape the app uses. */
export interface SavedDeck {
  id: string;
  name: string;
  /** The list exactly as the player pasted it. Never a match result — see the migration. */
  deckText: string;
  format: Format;
  createdAt: string;
  updatedAt: string;
}

/** Mirrors `decks_name_length` in the migration. The database is the real guard; this is the message. */
export const MAX_NAME = 60;
/** Mirrors `decks_text_length`. A 40-card list is ~1 KB, so this only stops a paste accident. */
export const MAX_DECK_TEXT = 20_000;

/** One line of a saved list, trimmed and with its inner runs of whitespace collapsed. */
export function normalizeName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_NAME);
}

export type SaveCheck = { ok: true; name: string } | { ok: false; message: string };

/**
 * Whether this name and this list may be saved. `existing` is the player's own list of saved decks;
 * `id` is set when renaming or overwriting one of them, so a deck is never a duplicate of itself.
 * The unique index on (user_id, lower(name)) enforces the same rule in the database.
 */
export function checkSave(
  rawName: string,
  deckText: string,
  existing: readonly SavedDeck[],
  id?: string,
): SaveCheck {
  const name = normalizeName(rawName);
  if (!name) return { ok: false, message: "Give the deck a name first." };
  if (!deckText.trim()) return { ok: false, message: "Paste a deck list before saving it." };
  if (deckText.length > MAX_DECK_TEXT) return { ok: false, message: "That list is too long to save." };
  const clash = existing.find((d) => d.id !== id && d.name.toLowerCase() === name.toLowerCase());
  if (clash) return { ok: false, message: `You already have a deck called "${clash.name}".` };
  return { ok: true, name };
}

/** Most recently edited first, which is the order the database index is built for. */
export function sortSaved(rows: readonly SavedDeck[]): SavedDeck[] {
  return [...rows].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.name.localeCompare(b.name));
}

/** A PostgREST row. The column names are snake_case; the app is not. */
export interface DeckRow {
  id: string;
  name: string;
  deck_text: string;
  format: string;
  created_at: string;
  updated_at: string;
}

export function fromRow(row: DeckRow): SavedDeck {
  return {
    id: row.id,
    name: row.name,
    deckText: row.deck_text,
    format: row.format === "2v2" ? "2v2" : "constructed",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * The one line shown under a saved deck's name. It is computed from the stored text against the
 * current card index rather than stored, so a row saved before a set was added still counts right.
 */
export function savedSummary(deckText: string, cards: CardIndex): string {
  const deck = loadDeck(deckText, cards);
  const total = Object.values(deck.main).reduce((a, b) => a + b, 0);
  const legend = deck.legend ? cards.get(deck.legend)?.name.replace(/ - Starter$/, "") : null;
  return `${total} card${total === 1 ? "" : "s"}${legend ? ` · ${legend}` : ""}`;
}

/**
 * A name to pre-fill the save box with: the legend, since that is how players talk about a list,
 * numbered if they already keep one under that name.
 */
export function suggestName(deckText: string, cards: CardIndex, existing: readonly SavedDeck[]): string {
  const deck = loadDeck(deckText, cards);
  const legend = deck.legend ? cards.get(deck.legend)?.name.replace(/ - Starter$/, "") : null;
  const base = normalizeName(legend ?? "My deck");
  const taken = new Set(existing.map((d) => d.name.toLowerCase()));
  if (!taken.has(base.toLowerCase())) return base;
  for (let n = 2; n < 1000; n++) {
    const candidate = normalizeName(`${base} ${n}`);
    if (!taken.has(candidate.toLowerCase())) return candidate;
  }
  return base;
}
