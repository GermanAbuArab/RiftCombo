// Which Core Rules sub-rules carry a worked Example in their own block and are cited by NOTHING?
//   node scripts/uncited-examples.mjs            prints the non-vacuity lines, then every row
//   node scripts/uncited-examples.mjs --count    prints the same lines as JSON, for test/rules-veins.test.ts
//
// This is Vein B of #187 / #191 (closed by #229). A worked example is Riot telling you a paragraph has
// a consequence worth spelling out, so an uncited one is the cheapest place a finding can hide. The
// haystack is the catalogue, CLAUDE.md and every walk document: a paragraph a walk already disposed
// of (promoted or refused, with the reason) is cited there, and that is what "closed" means here.
//
// Two traps this probe inherits and must not lose:
//  - HEADINGS: anchor on a line start with [ \t\f]*, never a bare caret. 89 headings sit right after
//    a form-feed page break and `^NNN\.` cannot see them (CLAUDE.md, measured 2026-09-09).
//  - CITATIONS: the five-trap form CLAUDE.md prescribes. It rejects a preceding hyphen (OGN-304), a
//    "#" (issue numbers), a sub-part dot (a parent absorbing its own block), letters/=/_ , and a slash
//    after a letter (issues/115), and it accepts a sentence-closing period.
// A probe that silently matches nothing prints a clean pass, so the population is printed FIRST and
// the test asserts it is non-zero.
import fs from "fs";
import { citeRe } from "./citation-form.mjs";

const R = fs.readFileSync("data/Riftbound-Core-Rules-2026-07-16.txt", "utf8");
const walkDir = "docs/phase0/walks";
const walks = fs.readdirSync(walkDir).filter(f => f.endsWith(".md")).map(f => fs.readFileSync(`${walkDir}/${f}`, "utf8"));
const catalogue = fs.readFileSync("data/combos.json", "utf8") + fs.readFileSync("data/synergies.json", "utf8");
const hay = [catalogue, fs.readFileSync("CLAUDE.md", "utf8"), ...walks].join("\n");

// Every heading line, in file order, so each sub-rule's block ends at the next heading of any depth.
const headRe = /(?:^|[\n])[ \t\f]*(\d{3}(?:\.[0-9a-z]+)*)\.[ \t]/g;
const heads = [...R.matchAll(headRe)].map(m => ({ h: m[1], at: m.index }));
const subs = [];
for (let i = 0; i < heads.length; i++) {
  if (!heads[i].h.includes(".")) continue;
  const block = R.slice(heads[i].at, i + 1 < heads.length ? heads[i + 1].at : R.length);
  subs.push({ h: heads[i].h, example: /Example:/.test(block) });
}
const withExample = subs.filter(s => s.example);

const cite = h => citeRe(h);
const tokens = (catalogue.match(/(?<![-#=_0-9.A-Za-z])\d{3}(?:\.[0-9a-z]+)+/g) || []).length;
const rows = withExample.filter(s => !cite(s.h).test(hay)).map(s => s.h);

const result = { subRuleHeadings: subs.length, withExample: withExample.length, catalogueCitationTokens: tokens, walkFiles: walks.length, uncited: rows.length, rows };
if (process.argv.includes("--count")) {
  console.log(JSON.stringify(result));
} else {
  console.log(`NON-VACUITY: ${subs.length} sub-rule headings parsed; ${withExample.length} carry an Example; ${tokens} citation tokens in the catalogue; ${walks.length} walk documents read.`);
  console.log(`Sub-rules with an Example cited by nothing: ${rows.length}`);
  for (const r of rows) console.log(`  ${r}`);
}
