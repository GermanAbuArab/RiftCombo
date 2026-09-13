import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * THE PROSE OF `data/combos.json` AND `data/synergies.json` WAS UNGUARDED, AND 290 DISTINCT
 * EMPHASIS DEFECTS ACCUMULATED IN IT BEFORE rc-gap REPAIRED 326 SPANS ON 2026-09-13.
 *
 * `test/source-quotes.test.ts` (#202) proves every `sources[].quote` is verbatim. It has never
 * looked at `steps`, `prerequisites.notable`, `terminatesIn` or `netPerIteration` — which is where
 * this catalogue does most of its quoting. The defect is always the same and it is always invisible:
 * a passage reproduced word for word with a clause SHOUTED inside the quotation marks, so a reader
 * cannot tell whether Riot stressed it or we did. #202 records that on 432.1 and 766 the shouted
 * word IS the finding, which is exactly when it matters. The remedy is to bold outside the quotes.
 *
 * THE PREDICATE IS TWO CONDITIONS AND HAS ZERO FALSE POSITIVES BY CONSTRUCTION: a quoted span of 25+
 * characters that matches a source case-INsensitively but NOT case-sensitively. Symbol rendering,
 * truncation and paraphrase all fail the case-insensitive test too, so nothing but a recasing can
 * reach the flag. It can under-report and it cannot cry wolf.
 *
 * POSITION 0 IS ALLOWED, IN BOTH DIRECTIONS, and that is what makes it correct rather than pedantic.
 * #202 sanctions lowercasing a capital to splice a quotation mid-sentence, and capitalising a
 * mid-sentence word when a quotation begins at it. So the comparison starts at index 1.
 *
 * THE HAYSTACK IS THREE FILES AND `data/combos.json` IS DELIBERATELY NOT ONE OF THEM. rc-manager7
 * recorded that as a decision and rc-gap2 re-measured why: 20 walk passages that currently fail
 * would go green the day the catalogue entered a haystack, because a propagated misquote would
 * validate itself. The more widely a misquote spreads the more sources appear to confirm it, so the
 * check gets WEAKER exactly as the problem gets worse. `CLAUDE.md` is excluded for the same reason.
 *
 * EVERY OCCURRENCE IS TRIED, NOT THE FIRST, and this trap bit rc-gap2 today on this very check. The
 * phrase "a battlefield you control" occurs nine times across the three sources in two casings: the
 * Core Rules capitalise Battlefield and `SFD-111 Here to Help` prints it lower case. Taking the
 * first hit compared a CORRECT quotation of a card against an unrelated sentence in the rulebook and
 * reported a defect that was not there. Right file, wrong sentence — the shape `CLAUDE.md` already
 * records from the garrison-column case.
 */
const SOURCES = [
  "data/Riftbound-Core-Rules-2026-07-16.txt",
  "data/Riftbound-Tournament-Rules-2026-07-16.txt",
  "data/corpus_flat.txt",
];
const MIN = 25;

/**
 * Fold what is NOT the defect and nothing else. Quote characters, dashes, whitespace runs and the
 * invisible characters the rules file carries (it holds form feeds, and #202 found eleven U+200B
 * zero-width spaces, one of them inside 359.3.f.2.a) — but NEVER case, which is the defect being
 * hunted, and NEVER brackets, which are a different defect class with their own check.
 */
const fold = (s: string) =>
  s.replace(/[“”‘’«»]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/[​‌‍﻿\f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Pair each quotation with its own closer with a SCANNER rather than a regex alternation: an
 * alternation over-spans and swallows the author's prose between two quotations, which fails
 * CORRECT fields. An apostrophe inside a word is refused, or every possessive opens a span.
 */
function spans(text: string): string[] {
  const OPEN = new Set(['"', "“", "‘", "'"]);
  const CLOSE: Record<string, string[]> = {
    '"': ['"'], "“": ["”", "“"], "‘": ["’", "‘"], "'": ["'"],
  };
  const word = (ch: string | undefined) => !!ch && /[A-Za-z0-9]/.test(ch);
  const out: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (!OPEN.has(ch)) continue;
    // An apostrophe or a right single quote between two word characters is punctuation, not a mark.
    if ((ch === "'" || ch === "‘") && word(text[i - 1]) && word(text[i + 1])) continue;
    const closers = CLOSE[ch]!;
    let j = -1;
    for (let k = i + 1; k < text.length; k++) {
      const c = text[k]!;
      if (!closers.includes(c)) continue;
      if ((c === "'" || c === "’") && word(text[k - 1]) && word(text[k + 1])) continue;
      j = k; break;
    }
    if (j === -1) continue;
    const inner = text.slice(i + 1, j);
    if (inner.length >= MIN) out.push(inner);
    i = j;
  }
  return out;
}

/**
 * EVERY string value in both data files, MINUS a named exclusion list — and the direction of that
 * default is the whole point.
 *
 * The first version named the six fields it walked and looked complete. It was not: it missed
 * `uses[].note`, which at 440,413 characters across 1,898 values is the FOURTH-LARGEST prose field
 * in the catalogue, and `combos[].anyBodies.note`, a field created on the day the guard shipped and
 * outside it from the moment it was born. Also `combos[].notable[]` and `sources[].note`, which
 * nobody had noticed at all. **A GUARD THAT ENUMERATES ITS FIELDS BY NAME STOPS COVERING THE SCHEMA
 * THE MOMENT THE SCHEMA GROWS, and it goes on looking complete while it does.** Nobody did anything
 * wrong and the coverage lapsed anyway (found by rc-gap2).
 *
 * Walking everything and excluding by name fails the other way: a new field is covered by default
 * and an author has to opt it out DELIBERATELY, with a reason, in the list below. Every exclusion
 * here was chosen against a measured path census rather than from memory of the schema.
 *
 * Parsed values, never JSON text — an escaped quote is still a quote character to a scanner and
 * span pairing breaks on it.
 */
const EXCLUDED = new Map<string, string>([
  // Guarded already, and more strictly, by test/source-quotes.test.ts (#202).
  ["combos[].sources[].quote", "has its own verbatim guard"],
  // Not prose: identifiers, enums, dates, URLs, base codes and regular expressions. A quote
  // character in a regex would also confuse the span scanner rather than mean anything.
  ["combos[].id", "identifier"], ["combos[].class", "enum"], ["combos[].status", "enum"],
  ["combos[].rulesVersion", "date"], ["combos[].produces[]", "feature id"],
  ["combos[].needs[]", "feature id"], ["combos[].legends[]", "base code"],
  ["combos[].uses[].card", "base code"], ["combos[].uses[].zone", "enum"],
  ["combos[].uses[].role", "enum"], ["combos[].sources[].kind", "enum"],
  ["combos[].sources[].url", "URL"], ["combos[].sources[].date", "date"],
  ["combos[].sources[].accessed", "date"],
  ["synergies[].id", "identifier"], ["synergies[].anchor", "base code"],
  ["synergies[].status", "enum"], ["synergies[].reviewed", "date"],
  ["synergies[].reviewedSet", "fingerprint"], ["synergies[].basis.rules[]", "rule number"],
  ["synergies[].basis.readings[]", "reading id"], ["synergies[].basis.combos[]", "combo id"],
  ["synergies[].partner.textMatches", "regular expression"],
  ["synergies[].partner.textExcludes", "regular expression"],
  ["synergies[].partner.types[]", "enum"], ["synergies[].partner.tags[]", "tag"],
  ["synergies[].partner.excludes[].card", "base code"],
  ["rulesVersion", "date"],
]);

function proseStrings(): { paths: number; strings: string[] } {
  const strings: string[] = [];
  const seen = new Set<string>();
  const walk = (node: unknown, path: string): void => {
    if (typeof node === "string") {
      seen.add(path);
      if (!EXCLUDED.has(path)) strings.push(node);
      return;
    }
    if (Array.isArray(node)) { for (const v of node) walk(v, `${path}[]`); return; }
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
    }
  };
  for (const f of ["data/combos.json", "data/synergies.json"]) walk(JSON.parse(readFileSync(f, "utf8")), "");
  return { paths: seen.size, strings };
}

const hay = fold(SOURCES.map((f) => readFileSync(f, "utf8")).join("\n"));
const hayLower = hay.toLowerCase();

const { paths, strings } = proseStrings();
const all = strings.flatMap(spans).map(fold).filter((s) => s.length >= MIN);
let found = 0;
const flagged: string[] = [];
for (const span of all) {
  const lower = span.toLowerCase();
  let at = hayLower.indexOf(lower), exact = false, any = false;
  while (at !== -1) {
    any = true;
    // Position 0 is free in both directions (#202). Compare everything after it.
    if (hay.slice(at + 1, at + span.length) === span.slice(1)) { exact = true; break; }
    at = hayLower.indexOf(lower, at + 1);
  }
  if (!any) continue;                       // not a quotation of a source: paraphrase, or our own prose
  found++;
  if (!exact) flagged.push(span);
}

/**
 * THE ONE DEFECT THIS CHECK FOUND ON ITS FIRST RUN, named rather than counted so the test ships
 * green in a tree four lanes share, and so a reader knows exactly what is owed.
 *
 * `startipped-peak-rune-count-empower` quotes `for each rune you CONTROL`. The corpus prints it
 * lower case, twice. `data/combos.json` is rc-manager7's file, so the repair is his: lowercase the
 * word inside the quotation marks and bold it outside if the stress is wanted, and delete the entry
 * from this array in the same commit.
 *
 * IT IS ALSO WHY THE BOUNDARY IS `>=` AND NOT `>`. The span is EXACTLY 25 characters, which is how
 * it survived a previous sweep of the same subject that reported zero. A minimum length is a
 * judgement, and the entry sitting on the boundary is the one that proves which way to round.
 */
const KNOWN: string[] = [];

describe("quoted passages in the catalogue's own prose", () => {
  it("walks a corpus big enough that a broken tokenizer cannot pass green", () => {
    // FLOORS, not pins, and measured over the field list this file actually walks: `steps`,
    // `prerequisites.notable`, `prerequisites.easy`, `terminatesIn`, `netPerIteration`, `notes`,
    // and the synergies' `why` and `partner.excludes[].why`. A tokenizer that silently matches
    // nothing passes a zero-flag assertion forever, which is the whole failure mode of a clean
    // check — so every stage of the pipeline carries its own floor.
    // Re-measured after the widening, not carried over: 18,914 strings, 8,307 spans of 25+, 6,154
    // found verbatim. Floors left below those so a growing catalogue does not turn them red, and
    // raised with the population so they do not quietly stop being floors - which is exactly what
    // would have happened had the old numbers been kept after the field list doubled.
    expect(strings.length).toBeGreaterThan(16000);
    expect(all.length).toBeGreaterThan(7000);
    expect(found).toBeGreaterThan(5000);
    // The fold must not have eaten the haystack, and toLowerCase must not have moved its indices —
    // if it did, every offset computed above would be comparing the wrong characters.
    // 635k after folding, from ~1.1 MB of source: the whitespace collapse is most of the
    // difference, and the rules file is laid out with heavy indentation.
    expect(hay.length).toBeGreaterThan(500_000);
    expect(hayLower.length).toBe(hay.length);
  });

  it("excludes only paths that exist, so a rename cannot leave a dead exclusion behind", () => {
    // An exclusion naming a path the data no longer has is dead weight, and a TYPO in one is worse
    // in a quiet way: it excludes nothing, so the guard silently widens rather than narrows. That
    // direction is safe, which is why it would never be noticed. 47 string paths across the two
    // files today, 29 excluded and 18 walked.
    expect(paths).toBeGreaterThan(40);
    const { paths: _p } = proseStrings();
    const seenPaths = new Set<string>();
    const collect = (node: unknown, path: string): void => {
      if (typeof node === "string") { seenPaths.add(path); return; }
      if (Array.isArray(node)) { for (const v of node) collect(v, `${path}[]`); return; }
      if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) collect(v, path ? `${path}.${k}` : k);
    };
    for (const f of ["data/combos.json", "data/synergies.json"]) collect(JSON.parse(readFileSync(f, "utf8")), "");
    expect([...EXCLUDED.keys()].filter((k) => !seenPaths.has(k))).toEqual([]);
  });

  it("adds no passage that is verbatim except for emphasis", () => {
    expect(flagged.sort()).toEqual([...KNOWN].sort());
  });
});
