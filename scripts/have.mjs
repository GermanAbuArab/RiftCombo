// Two questions at once, because the first version answered only one of them and its wording read
// like the other (reported by rc-walk-blocks, 2026-09-12):
//
//   1. Is the card set I am about to walk already an entry, or a SUPERSET of one?
//   2. Which entries use these cards at all?
//
//   node .scratch/have.mjs OGN-066 UNL-087
import { readFileSync } from "node:fs";
const db = JSON.parse(readFileSync("data/combos.json", "utf8"));
// Split on whitespace as well as on argv, because `have.mjs "OGN-066 UNL-087"` (one quoted word) used
// to answer "in no entry" for a card that is in twenty — a SILENT false negative in the one tool whose
// job is to stop a lane walking a line twice. Reported by rc-walk-mid, 2026-09-12; same argument-passing
// shape that made a range probe print two identical ranges the same day. The parsed list is echoed for
// the same reason: a probe that does not show you what it parsed cannot be caught being wrong.
const want = new Set(process.argv.slice(2).flatMap((a) => a.split(/[\s,]+/)).filter(Boolean));
if (!want.size) { console.error("usage: node .scratch/have.mjs <base codes...>"); process.exit(2); }
console.log(`parsed ${want.size} base code(s): ${[...want].join(" ")}`);
const key = (s) => [...s].sort().join("+");

console.log(`Q1 — is ${key(want)} already walked, in whole or in part?`);
let hit = 0;
for (const e of db.combos) {
  const set = new Set((e.uses || []).map((u) => u.card));
  if (!set.size) continue;
  if (key(set) === key(want)) { console.log("   EXACT    ", e.id, e.class, "->", key(set)); hit++; continue; }
  let sub = true;
  for (const c of set) if (!want.has(c)) { sub = false; break; }
  if (sub) { console.log("   CONTAINS ", e.id, e.class, "->", key(set)); hit++; }
}
if (!hit) console.log("   no entry uses that card set or a subset of it");

console.log(`\nQ2 — which entries use any of these cards, in any company?`);
let any = 0;
for (const c of [...want].sort()) {
  const users = db.combos.filter((e) => (e.uses || []).some((u) => u.card === c));
  console.log(`   ${c}: ${users.length ? users.map((e) => e.id).join(", ") : "in no entry"}`);
  any += users.length;
}
if (!any) console.log("   none of these cards is in any entry yet");
