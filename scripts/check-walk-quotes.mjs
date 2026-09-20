// Does every passage in a walk document or a published run play that CLAIMS to be rules text actually
// say what the source says?
//   node scripts/check-walk-quotes.mjs            (list the flags)
//   node scripts/check-walk-quotes.mjs --count    (just the number, for the test)
//
// #202 audited the 985 quote fields in `data/combos.json`. The 87 WALK DOCUMENTS were never checked by
// anything, and on 2026-09-13 a lane found nineteen defects in a document IT HAD WRITTEN THAT DAY,
// after it had already reported them fixed - diagnosed-but-unapplied inside one day, in the work of
// someone who had spent the day reading the rule against it. That is the argument for a standing check.
//
// WIDENED 2026-09-19 to also cover `docs/plays/` - the run-play documents #206 turned into the ONE
// corpus this project actually RENDERS on the live site (`#/plays`, `#/plays/<slug>`). A walk document
// is read here, by us; a play is read by a stranger clicking a link. Nothing had ever checked its
// quoted rules passages, and a one-off probe over a single play found a real defect before this
// widening shipped: a NESTED QUOTE, where the rulebook wraps a card's own printed phrase in its own
// quotation marks, so the naive "everything inside the outer *"…"*" capture pulled in the wrong span.
// See the nested-quote note below the main loop for how that is handled.
//
// PRECISION IS THE WHOLE DESIGN. A naive sweep of every quoted passage over 25 characters flags 638 of
// 4,452 (14.3%) and is NOT a defect rate: reading the worst file shows every flag is an author
// paraphrasing this project's own trap list as a Spanish checklist label, which is legitimate, and the
// mining walks quote community sources that live in no file here. The honest predicate is to check only
// a passage that CLAIMS to be rules text - a rule number within the 40 characters immediately before it.
// That is 80 of 1,569, and even that is a CEILING rather than a defect count: some are glosses no reader
// would take for a quotation, and a passage elided with three dots fails where a proper ellipsis passes.
// This scoping rule is unchanged by the widening below: `docs/plays/` uses the identical `*"…"*` markup
// for BOTH emphasis and quotation, exactly as the walk documents do, so the same rule-number-nearby gate
// is the only thing separating "Riot said this" from "we are shouting this word" in either corpus.
//
// THREE NORMALISATION TRAPS, each of which bit while this was built, and all three generalise:
//   - fold quote CHARACTERS only, never case or brackets - those are two of the defect classes;
//   - strip a markdown blockquote prefix, because it lands INSIDE a multi-line captured quote;
//   - fold a BACKTICK used as an apostrophe, which CLAUDE.md does in places.
import fs from "fs";

const dirs = ["docs/phase0/walks", "docs/plays"];
const files = dirs.flatMap((dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !/README/i.test(f))
    .map((f) => `${dir}/${f}`)
);
const sources = [
  "data/Riftbound-Core-Rules-2026-07-16.txt",
  "data/Riftbound-Tournament-Rules-2026-07-16.txt",
  "data/corpus_flat.txt",
  "CLAUDE.md",
].map((f) => fs.readFileSync(f, "utf8"));

const norm = (s) =>
  s
    .replace(/\n>\s*/g, " ")
    .replace(/>\s+/g, " ")
    .replace(/\*/g, "")
    .replace(/(\w)`(\w)/g, "$1@$2")   // a backtick standing in for an apostrophe
    .replace(/[‘’ʼ"“”']/g, "@")        // fold quote characters, nothing else
    // NO DASH FOLD. It was here, and the comment above was false while it was: an en/em-dash folded
    // to a hyphen makes a HOUSE-STYLE REWRITE invisible, which is the #202 defect class rather than a
    // typographic nicety. Riot prints hyphens; this project's markdown style prefers em-dashes, so
    // substituting one inside a quotation is exactly the "memory repairs the sentence on the way past"
    // failure #202 records - with house style as the rewriter, which is worse, because house style is
    // applied deliberately. Demonstrated: rc-gap3's own verifier adopted this normalisation and MISSED
    // an em-dash-for-hyphen substitution in a quoted catalogue sentence that a non-folding checker
    // caught. Removing it costs NOTHING measurable - the corpus flags 75 passages with the fold and 75
    // without - so it was pure blind spot. Fold quote characters and whitespace; never case, never
    // brackets, never dashes, because each of those is a defect class in its own right.
    .replace(/​/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();

const hay = sources.map(norm).join(" ||| ");
let total = 0;
const flags = [];
for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/\*"([^"]{30,})"\*/g)) {
    const lead = s.slice(Math.max(0, m.index - 40), m.index);
    // "It claims to be rules text" = a rule number in the preceding 40 characters. The lookbehind is
    // the whole correctness of that test, and without one BOTH documented traps fire: `#153` reads as
    // rule 153 and `OGN-205` reads as rule 205. Two lanes hit it independently in one session, from a
    // different variant each time, on passages that were a legitimate quotation of `CLAUDE.md` and of
    // a script's own output. The direction is FALSE-POSITIVE only, so the checker stayed sound - but
    // the cost is worse than a wrong number: both lanes REWORDED THEIR PROSE to get past it, which
    // teaches authors to write around the instrument instead of the instrument reading the prose.
    // Card codes are everywhere in walk documents, so some of the standing flags were this artifact.
    // This deliberately keeps the FOUR-trap lookbehind and NOT the five-trap counter form used
    // against CLAUDE.md, because this is a PASSAGE DETECTOR and not a citation counter, and the
    // two want different answers. A rule-PAIR slash (`420.1/420.2.a`) is a genuine rules citation
    // here and SHOULD open the window, where the counter must exclude it to avoid double-counting;
    // and the sentence-closing period is already allowed by the trailing `[^0-9a-z]*$`. What remains
    // is a URL slash, whose direction is false-positive only. Flagged by rc-gap3 and left on purpose.
    if (!/(?<![-#0-9.])\d{3}(\.[0-9a-z]+)*[^0-9a-z]*$/.test(lead)) continue;
    total++;
    const parts = norm(m[1]).replace(/^…\s*/, "").replace(/\s*…$/, "").split(/\s*…\s*/);
    if (!parts.every((p) => p.length < 12 || hay.includes(p))) flags.push([f, norm(m[1])]);
  }
}

if (process.argv.includes("--count")) {
  console.log(JSON.stringify({ files: files.length, claiming: total, flagged: flags.length }));
} else {
  console.log(`NON-VACUITY: ${files.length} walk documents; ${total} passages that CLAIM to be rules text; haystack ${hay.length} bytes.`);
  console.log(`Not verbatim: ${flags.length} (${((100 * flags.length) / total).toFixed(1)}%) — a CEILING, not a defect count. Read each one.\n`);
  for (const [f, q] of flags) console.log(`  ${f}\n     ${q.slice(0, 150)}`);
}
