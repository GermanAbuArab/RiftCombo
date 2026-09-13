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

/** Every string value in the prose fields, walked as PARSED values — never over JSON text, where an
 *  escaped quote is still a quote character to a scanner and span pairing breaks. */
function proseStrings(): string[] {
  const out: string[] = [];
  const combos = JSON.parse(readFileSync("data/combos.json", "utf8")).combos as Record<string, any>[];
  for (const c of combos) {
    for (const s of c.steps ?? []) out.push(s);
    for (const s of c.prerequisites?.notable ?? []) out.push(s);
    for (const s of c.prerequisites?.easy ?? []) out.push(s);
    if (c.terminatesIn) out.push(c.terminatesIn);
    if (c.netPerIteration) out.push(c.netPerIteration);
    if (c.notes) out.push(c.notes);
  }
  const syn = JSON.parse(readFileSync("data/synergies.json", "utf8"));
  for (const r of syn.synergies ?? syn) {
    if (r.why) out.push(r.why);
    for (const e of r.partner?.excludes ?? []) if (e.why) out.push(e.why);
  }
  return out;
}

const hay = fold(SOURCES.map((f) => readFileSync(f, "utf8")).join("\n"));
const hayLower = hay.toLowerCase();

const strings = proseStrings();
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
const KNOWN = ["for each rune you CONTROL"];

describe("quoted passages in the catalogue's own prose", () => {
  it("walks a corpus big enough that a broken tokenizer cannot pass green", () => {
    // FLOORS, not pins, and measured over the field list this file actually walks: `steps`,
    // `prerequisites.notable`, `prerequisites.easy`, `terminatesIn`, `netPerIteration`, `notes`,
    // and the synergies' `why` and `partner.excludes[].why`. A tokenizer that silently matches
    // nothing passes a zero-flag assertion forever, which is the whole failure mode of a clean
    // check — so every stage of the pipeline carries its own floor.
    expect(strings.length).toBeGreaterThan(12000);
    expect(all.length).toBeGreaterThan(4000);
    expect(found).toBeGreaterThan(3000);
    // The fold must not have eaten the haystack, and toLowerCase must not have moved its indices —
    // if it did, every offset computed above would be comparing the wrong characters.
    // 635k after folding, from ~1.1 MB of source: the whitespace collapse is most of the
    // difference, and the rules file is laid out with heavy indentation.
    expect(hay.length).toBeGreaterThan(500_000);
    expect(hayLower.length).toBe(hay.length);
  });

  it("adds no passage that is verbatim except for emphasis", () => {
    expect(flagged.sort()).toEqual([...KNOWN].sort());
  });
});
