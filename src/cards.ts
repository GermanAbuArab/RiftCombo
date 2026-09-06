import type { Card, Domain, Format, LegalityEntry } from "./types.js";

export const normalizeName = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    // Riot's gallery writes "Dark Child - Starter"; Riot's own errata pages write "Dark Child,
    // Starter". Accept either separator so both dialects land on the same key.
    .replace(/\s*[-–—,]\s*starter$/, "")
    .replace(/[^a-z0-9]/g, "");

/**
 * "UNL-079a" -> "UNL-079"; "SFD-227*" -> "SFD-227"; "OGN-212" -> "OGN-212"
 *
 * The `i` is load-bearing (#87). `resolveCode` upper-cases the whole code before it gets here, so a
 * case-sensitive match left "UNL-113a" as "UNL-113A" and found neither the printing (the gallery
 * spells it lower-case) nor the base — 102 of the 1189 printings are alt-arts with an `a` suffix,
 * and every one of them was dropped on the way through the parser. riftbound.gg writes the same
 * suffix in upper case, which is how it was noticed. No code in the pool ends in a letter that is
 * part of the code itself: over all 1189, the shapes are `###`, `###a`, `###*`, `T##`, `R##`
 * and `SP#`, so upper or lower this can only strip a variant marker.
 */
export const baseOf = (code: string): string => code.replace(/[a-z*]$/i, "");

// Release order, matching the deck codec's SET_MAP.
const SET_ORDER = ["OGN", "OGS", "ARC", "SFD", "UNL", "VEN", "RAD"];
const setOrder = (set: string) => { const i = SET_ORDER.indexOf(set); return i < 0 ? SET_ORDER.length : i; };

// Piltover Archive encodes the Spiritforged rune reprints as SFD-R0x and riftbound.gg the Unleashed
// ones as UNL-R0x; Riot's gallery lists runes under their Origins numbers and reprints them only in
// Vendetta (VEN-R0x), so neither SFD-R0x nor UNL-R0x exists there. Without the Unleashed row a list
// lost its whole Rune Deck: 696 of the 775 rune lines across 452 riftbound.gg tournament lists (#90).
// The number is the same domain in all three sets — read off riftbound.gg's own 1427-card index on
// 2026-09-06, where every R01 is a Fury Rune, every R02 a Calm Rune, and so on to R06 Order — not
// inferred from the order of the Spiritforged row.
const RUNE_ALIAS: Record<string, string> = {
  "SFD-R01": "OGN-007", "SFD-R02": "OGN-042", "SFD-R03": "OGN-089",
  "SFD-R04": "OGN-126", "SFD-R05": "OGN-166", "SFD-R06": "OGN-214",
  "UNL-R01": "OGN-007", "UNL-R02": "OGN-042", "UNL-R03": "OGN-089",
  "UNL-R04": "OGN-126", "UNL-R05": "OGN-166", "UNL-R06": "OGN-214",
};

export class CardIndex {
  readonly cards: Card[];
  private readonly byCode = new Map<string, Card>();
  private readonly byBase = new Map<string, Card>();
  private readonly byName = new Map<string, Card[]>();
  /** Every tag printed in the pool, normalised. Read by `resolveName` and nothing else. */
  private readonly tags = new Set<string>();
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
      for (const t of c.tags) this.tags.add(normalizeName(t));
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
    if (comma <= 0) return null;
    const epithet = name.slice(comma + 1);
    const byEpithet = this.pickByName(epithet);
    if (byEpithet) return byEpithet;
    // The other direction (#86). Riot printed the same champion under two heads: `OGS-004 Yi,
    // Meditative` and `OGS-009 Yi, Honed` in the starter set, `UNL-059 Master Yi, Unstoppable` and
    // `UNL-113 Master Yi, Tempered` in Unleashed — and Riot's own "<City>'s Top Decks" articles
    // write the long head for all four, so `Master Yi, Honed` matched nothing. Retry on the last
    // word of the head, but only when the head is a tag the pool actually prints, which is what
    // makes this a rescue and not a guess. Measured over the whole pool: eleven tags are more than
    // one word, and `Master Yi` is the only one whose last word heads a card name at all, so for
    // the other ten this branch looks up a name that does not exist and changes nothing.
    const head = name.slice(0, comma).trim();
    const words = head.split(/\s+/);
    if (words.length < 2 || !this.tags.has(normalizeName(head))) return null;
    return this.pickByName(`${words[words.length - 1]},${epithet}`);
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

// --- card text for humans ---------------------------------------------------------------
// Riot's card text carries icon tokens like `:rb_might:`. `data/cards.json` and
// `data/corpus_flat.txt` keep them raw on purpose — they are what a grep matches — so the
// spelling-out belongs here, at the presentation edge.

const DOMAIN_LABEL: Record<string, string> = {
  fury: "Fury", body: "Body", mind: "Mind", calm: "Calm", chaos: "Chaos", order: "Order",
};

/**
 * One `:rb_*:` token, given how many identical ones sit next to it. A domain symbol is
 * Power, NOT a Rune: 135.2.e.4 makes it "Power of a specific Domain" and 135.2.e.5 makes the
 * rainbow "Power of any Domain". The distinction is load-bearing, since a Rune is a card on
 * the board that recycling sends to the Rune Deck (161.2.b), while Power is what you spend.
 */
const spellRb = (tok: string, n: number): string => {
  const energy = /^energy_(\d+)$/.exec(tok);
  if (energy) return `${energy[1]} Energy`;
  const rune = /^rune_([a-z]+)$/.exec(tok);
  if (rune) {
    const d = rune[1]!;
    if (d === "rainbow") return `${n} Power of any domain`;
    return `${n} ${DOMAIN_LABEL[d] ?? d[0]!.toUpperCase() + d.slice(1)} Power`;
  }
  if (tok === "might") return "Might";
  if (tok === "exhaust") return "Exhaust";
  return tok.replace(/_/g, " ");
};

/**
 * Spell out the icon tokens in a card's text. Adjacent tokens are a single cost and are
 * joined with " + " — replacing them one by one glued the words together (`1 EnergyFury
 * Rune`). Repeats of the same domain symbol collapse into a count, because four Mind symbols
 * are 4 Power of Mind, not four separate clauses.
 */
export const readableCardText = (s: string): string =>
  s.replace(/(?::rb_[a-z0-9_]+:)+/g, (run) => {
    const toks = run.match(/:rb_[a-z0-9_]+:/g)!.map((t) => t.slice(4, -1));
    const parts: string[] = [];
    for (let i = 0; i < toks.length; i++) {
      const tok = toks[i]!;
      // Only domain symbols collapse: each one means exactly 1 Power, so N of them is a
      // quantity. An energy token already carries its own number, so it is never merged.
      let n = 1;
      if (tok.startsWith("rune_")) while (toks[i + n] === tok) n++;
      parts.push(spellRb(tok, n));
      i += n - 1;
    }
    return parts.join(" + ");
  });
