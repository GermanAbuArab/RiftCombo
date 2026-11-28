// Pick the next run play by MEASUREMENT: a line whose interesting property is a SEQUENCE, and whose
// single `terminatesIn` provably cannot carry it. No taste, and the predicate is stated.
//
//   node scripts/sequence-pick.mjs              non-vacuity line, queue size, top ten of the queue
//   node scripts/sequence-pick.mjs --count      non-vacuity line, then the queue size alone
//   node scripts/sequence-pick.mjs --pair a/b   the whole queue restricted to one identity
//   node scripts/sequence-pick.mjs --unplayed   the whole queue in rank order, skipping every entry
//                                               that is the Subject of a play in docs/plays/,
//                                               with its GLOBAL rank printed beside it
//
// The QUEUE is every entry whose `steps` carry forced-ordering language (FORCED) AND whose
// `terminatesIn` is a bare quantity with no ordering word (QTY and not ORD). Identity is the union
// of the domains of the entry's non-legend `uses` rows (103.1.b), "colourless" when there are none.
// Rank: most forced-ordering hits, then most steps. First committed for #231 (2026-09-25); the
// instrument was written for #200 on 2026-09-14 and read 771 entries / 262 / 102 then.
import { readFileSync, readdirSync } from "node:fs";
const db = JSON.parse(readFileSync("data/combos.json", "utf8")).combos;
const cards = JSON.parse(readFileSync("data/cards.json", "utf8")).cards;
const dom = new Map(), isLeg = new Map();
for (const c of cards) if (!dom.has(c.base)) { dom.set(c.base, c.domains); isLeg.set(c.base, c.type.includes("legend")); }

// ORDER words that mean the SEQUENCE is load-bearing, not merely narrated.
const FORCED = /\bbefore\b|\bnever after\b|\bin response\b|\bin that same window\b|\bcount forward\b|\bmust be cast\b|\bno window\b|\bwith no gap\b|\bfirst\b/gi;
// A terminatesIn that is a bare quantity: a number, and NO ordering language at all.
const QTY = /\b\d+\b|\bone\b|\btwo\b|\bthree\b|\beight\b|\bnine\b|\bten\b/i;
const ORD = /\bbefore\b|\bafter\b|\bresponse\b|\bwindow\b|\border\b|\bsequence\b|\bphase\b|\bturn\b/i;

const args = process.argv.slice(2);
const pairIdx = args.indexOf("--pair");
if (pairIdx !== -1 && !/^[a-z]+\/[a-z]+$/.test(args[pairIdx + 1] ?? "")) {
  console.error("usage: --pair <domain>/<domain>, e.g. --pair calm/chaos");
  process.exit(2);
}
const pairArg = pairIdx !== -1 ? args[pairIdx + 1].split("/").sort().join("/") : null;

const rows = [];
for (const e of db) {
  const steps = (e.steps ?? []).join(" ");
  const hits = [...steps.matchAll(FORCED)].map(m => m[0].toLowerCase());
  if (!hits.length) continue;
  const t = e.terminatesIn ?? "";
  rows.push({
    id: e.id, cls: e.class, n: hits.length, steps: (e.steps ?? []).length,
    kinds: [...new Set(hits)].join(","),
    bareQty: QTY.test(t) && !ORD.test(t),
    dom: [...new Set((e.uses ?? []).filter(u => !isLeg.get(u.card)).flatMap(u => dom.get(u.card) ?? []))].sort().join("/") || "colourless",
    t: t.slice(0, 80),
  });
}
const queue = rows.filter(r => r.bareQty).sort((a, b) => b.n - a.n || b.steps - a.steps);
console.log(`NON-VACUITY: ${db.length} entries scanned, ${rows.length} carry forced-ordering language in their steps`);
if (args.includes("--count")) { console.log(`QUEUE: ${queue.length}`); process.exit(0); }
console.log(`of those, ${queue.length} have a terminatesIn that is a BARE QUANTITY with no ordering word\n`);
queue.forEach((r, i) => { r.rank = i + 1; });
let pick, head;
if (args.includes("--unplayed")) {
  // A play names its subject as **Subject: `<entry-id>`** (or **Subject:** `<entry-id>`).
  const SUBJECT = /\*\*Subject:\s*\**\s*`([^`]+)`/;
  const files = readdirSync("docs/plays").filter(f => f.endsWith(".md"));
  const played = new Set(files.map(f => readFileSync(`docs/plays/${f}`, "utf8").match(SUBJECT)?.[1]).filter(Boolean));
  pick = queue.filter(r => !played.has(r.id));
  const inQueue = queue.filter(r => played.has(r.id)).length;
  head = `PLAYS: ${files.length} files, ${played.size} distinct subjects, ${inQueue} of them in the queue
UNPLAYED: ${pick.length} of ${queue.length}, global rank beside each:`;
} else {
  pick = pairArg ? queue.filter(r => r.dom === pairArg) : queue.slice(0, 10);
  head = pairArg ? `QUEUE IN ${pairArg}: ${pick.length}` : "TOP CANDIDATES — most forced-ordering language, terminatesIn a bare quantity:";
}
console.log(head);
for (const r of pick) console.log(`  #${String(r.rank).padStart(3)} ${String(r.n).padStart(2)}x  ${r.cls.padEnd(8)} ${r.dom.padEnd(12)} ${r.id.padEnd(46)} [${r.kinds}]\n        terminatesIn: ${r.t}`);
