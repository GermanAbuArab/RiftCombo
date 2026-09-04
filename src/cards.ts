import type { Card, Domain, Format, LegalityEntry } from "./types.js";

export const normalizeName = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    // Riot's gallery writes "Dark Child - Starter"; Riot's own errata pages write "Dark Child,
    // Starter". Accept either separator so both dialects land on the same key.
    .replace(/\s*[-–—,]\s*starter$/, "")
    .replace(/[^a-z0-9]/g, "");

/** "UNL-079a" -> "UNL-079"; "SFD-227*" -> "SFD-227"; "OGN-212" -> "OGN-212" */
export const baseOf = (code: string): string => code.replace(/[a-z*]$/, "");

// Release order, matching the deck codec's SET_MAP.
const SET_ORDER = ["OGN", "OGS", "ARC", "SFD", "UNL", "VEN", "RAD"];
const setOrder = (set: string) => { const i = SET_ORDER.indexOf(set); return i < 0 ? SET_ORDER.length : i; };

// Piltover Archive encodes the Spiritforged rune reprints as SFD-R0x; Riot's gallery
// lists runes under their Origins numbers (and VEN-R0x for Vendetta).
const RUNE_ALIAS: Record<string, string> = {
  "SFD-R01": "OGN-007", "SFD-R02": "OGN-042", "SFD-R03": "OGN-089",
  "SFD-R04": "OGN-126", "SFD-R05": "OGN-166", "SFD-R06": "OGN-214",
};

export class CardIndex {
  readonly cards: Card[];
  private readonly byCode = new Map<string, Card>();
  private readonly byBase = new Map<string, Card>();
  private readonly byName = new Map<string, Card[]>();
  private readonly banned = new Map<Format, Map<string, LegalityEntry>>();

  constructor(cards: Card[], legality: LegalityEntry[]) {
    this.cards = cards;
    for (const c of cards) {
      this.byCode.set(c.code, c);
      // Prefer the base printing for the base lookup; alt-arts sometimes drop reminder text.
      const cur = this.byBase.get(c.base);
      if (!cur || (cur.variant && !c.variant)) this.byBase.set(c.base, c);
      const k = normalizeName(c.name);
      if (!this.byName.has(k)) this.byName.set(k, []);
      this.byName.get(k)!.push(c);
    }
    for (const e of legality) {
      if (!this.banned.has(e.format)) this.banned.set(e.format, new Map());
      for (const b of e.bases) this.banned.get(e.format)!.set(b, e);
    }
  }

  get(code: string): Card | undefined {
    return this.byCode.get(code) ?? this.byBase.get(baseOf(code));
  }

  /** Resolve any printed/deck-code form to a base code, or null if unknown. */
  resolveCode(code: string): string | null {
    const c = code.trim().toUpperCase().replace(/\/\d+$/, "");
    const aliased = RUNE_ALIAS[c] ?? RUNE_ALIAS[baseOf(c)];
    if (aliased) return aliased;
    const card = this.byCode.get(c) ?? this.byBase.get(baseOf(c));
    return card ? card.base : null;
  }

  /** Resolve a card name (any common dialect) to a base code. Returns null if unknown. */
  resolveName(name: string): string | null {
    const direct = this.pickByName(name);
    if (direct) return direct;
    // Riot's gallery names every legend as a bare epithet ("Deceiver"), but Riot's own errata pages
    // and players write them as "Champion, Epithet" ("LeBlanc, Deceiver"). Retry on the epithet.
    // Measured 2026-09-04: all 94 legends are bare epithets and no card name matches another card's
    // "X, Y" suffix, so this can only rescue a line that would otherwise be dropped entirely.
    const comma = name.indexOf(",");
    return comma > 0 ? this.pickByName(name.slice(comma + 1)) : null;
  }

  private pickByName(name: string): string | null {
    const hits = this.byName.get(normalizeName(name));
    if (!hits || hits.length === 0) return null;
    const bases = [...new Set(hits.map((c) => c.base))];
    if (bases.length === 1) return bases[0]!;
    // Same name printed under several base codes (reprinted runes, promo legends under a higher
    // number). Prefer the earliest set's non-variant printing, then the lowest collector number.
    const sorted = hits
      .filter((c) => !c.variant)
      .sort((a, b) => setOrder(a.set) - setOrder(b.set) || a.collectorNumber - b.collectorNumber);
    return (sorted[0] ?? hits[0])!.base;
  }

  /** All base codes that share this card's name and type (alt printings under other numbers). */
  equivalents(base: string): string[] {
    const card = this.byBase.get(base);
    if (!card) return [base];
    const hits = this.byName.get(normalizeName(card.name)) ?? [];
    return [...new Set(hits.filter((c) => c.type.join() === card.type.join()).map((c) => c.base))];
  }

  domainsOf(base: string): Domain[] {
    return this.byBase.get(base)?.domains ?? [];
  }

  legality(base: string, format: Format): LegalityEntry | undefined {
    return this.banned.get(format)?.get(base);
  }
}
