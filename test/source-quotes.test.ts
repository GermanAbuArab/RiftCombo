import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * A `sources[].quote` is defined by CLAUDE.md as "the verbatim passage the entry stands on". When the
 * source is one of the three files we ship, that is checkable, and until now nothing checked it — the
 * #202 cross-audit found `sources[].quote` was the only field in the catalogue that no test and no
 * audit had ever opened, and reported a card-text quote with two parentheticals silently dropped
 * mid-sentence, a rules quote with emphasis added inside the quotation marks, and 105 fields holding
 * agent-report markdown.
 *
 * Swept when this test was written: 1,579 verifiable passages across 585 in-scope quote fields, of
 * which 63 did not appear in the file they claimed. They were repaired from the source, and the
 * classes are worth knowing because they are what this test exists to stop coming back:
 *
 *   - a bracketed gist standing in for the source's words (`cannot [complete it]...`, `to the
 *     [Battlefield].`) — 13 of them;
 *   - EMPHASIS ADDED inside the quotation marks, which changes what the source looks like it stressed;
 *   - a trailing period on a source line that has none, which is how a truncation disguises itself as
 *     a complete sentence (195 reads "...instructs them to do so, or if they are the only player
 *     remaining in the game", and an entry quoted it as "...instructs them to do so.");
 *   - a skipped Example with no ellipsis (709 has two, and two entries quoted the second as if it
 *     followed the first sentence);
 *   - and outright paraphrase inside quotation marks (206 "even if that cost has been altered" for
 *     "even if that cost is increased, decreased, or ignored as the card is played").
 *
 * WHAT IS NORMALISED, AND WHY EACH ONE IS SAFE RATHER THAN CONVENIENT.
 *
 * 1. Whitespace, because the rules file is a PDF extraction and wraps mid-sentence.
 * 2. Quote characters, ALL of them, to one sentinel. The rules file uses curly quotes and the
 *    catalogue is JSON, where a double quote costs an escape, so authors reach for `'`. #202 called
 *    the inner `"`→`'` swap a defect and it is — but it changes no word, and enforcing it would fight
 *    the file format forever while catching nothing that matters. Folded deliberately, recorded here
 *    so the decision is visible rather than implicit.
 * 3. En/em dashes, same typographic family.
 * 4. INVISIBLE CHARACTERS. The Core Rules contain eleven U+200B ZERO WIDTH SPACEs, one of them inside
 *    359.3.f.2.a, which a correct quote of that paragraph cannot reproduce. Without this the test
 *    fails a verbatim quote and someone "fixes" the data. Same family as the form-feed trap that
 *    `test/rule-refs.test.ts` documents: the shipped text has characters you cannot see.
 *
 * Case is NOT normalised, because ALL-CAPS emphasis inside a quotation is one of the defect classes.
 * Brackets are NOT normalised, because a bracketed gist is another.
 */
const root = new URL("..", import.meta.url);
const FILES = {
  core: "data/Riftbound-Core-Rules-2026-07-16.txt",
  tournament: "data/Riftbound-Tournament-Rules-2026-07-16.txt",
  corpus: "data/corpus_flat.txt",
} as const;
type FileKey = keyof typeof FILES;

export const normalise = (s: string): string =>
  s
    .replace(/[​‌‍﻿­]/g, "")
    .replace(/[‘’′'‚]/g, '"')
    .replace(/[“”″„]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const TEXT = Object.fromEntries(
  Object.entries(FILES).map(([k, f]) => [k, normalise(readFileSync(new URL(f, root), "utf8"))]),
) as Record<FileKey, string>;

/** Which shipped file a source title claims. A title may name more than one. */
const CLAIMS: [RegExp, FileKey][] = [
  [/Core Rules|Riftbound-Core-Rules/i, "core"],
  [/Tournament Rules|Riftbound-Tournament-Rules/i, "tournament"],
  [/corpus_flat/i, "corpus"],
];

/**
 * Quoted spans, found by a left-to-right scanner rather than by regex alternation.
 *
 * The regex version over-spanned: with four alternating patterns a straight-single opener could pair
 * with a closer several sentences later, swallowing the author's own prose between two quotations and
 * then failing for a reason that was not a defect. The scanner pairs each opener with its own closer.
 *
 * The straight apostrophe is the hard case — `player's` must not open a span — so an opening `'` has
 * to be preceded by start/space/bracket/colon/comma/dash and a closing `'` followed by end/space or
 * sentence punctuation.
 */
export function quotedSpans(s: string): string[] {
  const out: string[] = [];
  const opensSingle = (k: number) => k === 0 || /[\s(\[:,—-]/.test(s[k - 1] ?? "");
  const closesSingle = (k: number) => k === s.length - 1 || /[\s).,;:\]—-]/.test(s[k + 1] ?? "");
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const close = c === "“" ? "”" : c === "‘" ? "’" : c === '"' ? '"' : c === "'" && opensSingle(i) ? "'" : null;
    if (!close) { i++; continue; }
    let j = i + 1;
    while (j < s.length && !(s[j] === close && (close !== "'" || closesSingle(j)))) j++;
    if (j >= s.length) { i++; continue; }
    out.push(s.slice(i + 1, j));
    i = j + 1;
  }
  return out;
}

/** A passage short enough to be a term rather than a quotation is not checked. */
const MIN = 25;
/** `355.10.d. `, `RULE 827.1: ` — a label the author added in front of the source's own words. */
const RULE_LABEL = /^(?:RULE\s+)?\d{3}(?:\.[0-9a-z]+)+[.:]?\s+/i;
/** `OGN-235 | Karma, Channeler | ...` — a pasted line of `corpus_flat.txt`. */
const CARD_LABEL = /^[A-Z]{3}-[0-9A-Za-z*]{2,5}\s*\|/;
/** Several fields paste consecutive paragraphs with no separator; split before an embedded label. */
const EMBEDDED_LABEL = /(?=\b\d{3}(?:\.[0-9a-z]+)+\.\s+[A-Z“"])/;

/**
 * The verifiable units of a quote field. If it contains quotations, those are what it claims; the
 * prose between them is the author's own voice and is deliberately not checked. If it contains none,
 * the field is a pasted passage, and the manager's segment separators — ` / ` and ` || ` — split it.
 */
export function verifiableUnits(quote: string): string[] {
  const spans = [...new Set(quotedSpans(quote))].filter((x) => x.length >= MIN && /\s/.test(x));
  if (spans.length) return spans;
  return quote
    .split(/\s+\/\s+|\s*\|\|\s*/)
    .flatMap((s) => s.split(EMBEDDED_LABEL))
    .map((s) => s.trim())
    .filter((s) => s.length >= MIN && (RULE_LABEL.test(s) || CARD_LABEL.test(s)));
}

/** An ellipsis is the only licensed elision: every part either side of one must appear. */
export function appearsIn(text: string, keys: FileKey[]): boolean {
  const parts = normalise(text)
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map((p) => p.trim())
    .filter((p) => p.length >= MIN);
  if (!parts.length) return true;
  return parts.every((p) => keys.some((k) => TEXT[k].includes(p) || TEXT[k].includes(p.replace(RULE_LABEL, ""))));
}

type Combo = { id: string; sources?: { title?: string; quote?: string }[] };
const combos = (
  JSON.parse(readFileSync(new URL("data/combos.json", root), "utf8")) as { combos: Combo[] }
).combos;

const checks: { id: string; keys: FileKey[]; text: string }[] = [];
let inScope = 0;
for (const e of combos)
  for (const s of e.sources ?? []) {
    if (typeof s.quote !== "string") continue;
    const keys = CLAIMS.filter(([re]) => re.test(s.title ?? "")).map(([, k]) => k);
    if (!keys.length) continue;
    inScope++;
    for (const text of verifiableUnits(s.quote)) checks.push({ id: e.id, keys, text });
  }

describe("every quote attributed to a file we ship appears in that file", () => {
  it("checks enough passages to be meaningful", () => {
    // Floors, not pins: the catalogue grows. They exist because a tokenizer that silently matched
    // nothing would pass green, which is how a check dies without anyone noticing. Measured at 766
    // entries: 585 in-scope fields, 1,579 verifiable passages.
    expect(inScope).toBeGreaterThan(500);
    expect(checks.length).toBeGreaterThan(1_400);
  });

  it("resolves every verifiable passage", () => {
    const unresolved = checks.filter((c) => !appearsIn(c.text, c.keys));
    expect(
      unresolved.map((c) => `${c.id}: ${JSON.stringify(c.text.slice(0, 120))}`),
      "quotes that do not appear in the file their source names",
    ).toEqual([]);
  });

  it("strips the invisible characters the shipped rules actually contain", () => {
    // 359.3.f.2.a carries a U+200B. A correct quote of it cannot reproduce that character, so
    // without the strip this test would fail a verbatim quote.
    const raw = readFileSync(new URL(FILES.core, root), "utf8");
    expect(raw.includes("​")).toBe(true);
    expect(appearsIn('that referent will return "null" and all instructions related to it will be ignored', ["core"])).toBe(true);
  });

  it("pairs each quotation with its own closer instead of running past it", () => {
    // The over-spanning bug: a regex alternation swallowed the prose between two quotations.
    const field = "718.3: 'While in this state, the card's text is appended.' 416.6: the player chooses. 167: 'the pool empties.'";
    expect(quotedSpans(field)).toEqual([
      "While in this state, the card's text is appended.",
      "the pool empties.",
    ]);
  });

  it("does not treat an apostrophe inside a word as a quotation mark", () => {
    expect(quotedSpans("the player's turn and the card's cost")).toEqual([]);
  });

  it("accepts an ellipsis as an elision and nothing else", () => {
    // 465.2.c.4, elided in the middle, is legal.
    expect(appearsIn("Units cannot have more damage assigned to them … to have damage assigned to them.", ["core"])).toBe(true);
    // The same passage with the middle simply removed is not.
    expect(appearsIn("Units cannot have more damage assigned to them to have damage assigned to them.", ["core"])).toBe(false);
  });

  it("fails emphasis added inside the quotation marks", () => {
    // 436.4.a, which an entry shouted as "in their DECK" until this test was written.
    expect(appearsIn("as a result of Predicting with too few cards in their deck", ["core"])).toBe(true);
    expect(appearsIn("as a result of Predicting with too few cards in their DECK", ["core"])).toBe(false);
  });

  it("fails a bracketed gist standing in for the source's words", () => {
    expect(appearsIn("The Attacker is the player whose unit(s) applied the Contested status to the Battlefield.", ["core"])).toBe(true);
    expect(appearsIn("The Attacker is the player whose unit(s) applied the Contested status to the [Battlefield].", ["core"])).toBe(false);
  });

  it("reads corpus_flat.txt and the Tournament Rules, not only the Core Rules", () => {
    expect(appearsIn("OGN-133 | Flurry of Blades | Spell | Body | E1 |", ["corpus"])).toBe(true);
    expect(appearsIn("OGN-133 | Flurry of Blades | Spell | Body | E1 |", ["core"])).toBe(false);
    expect(TEXT.tournament.length).toBeGreaterThan(10_000);
  });
});
