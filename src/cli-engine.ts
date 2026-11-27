#!/usr/bin/env tsx
// The model-free combo engine (#736): tag card text, search the trigger/effect graph for 2-5-card
// lines, rank them, write out/engine/candidates.json and print the top 30. It suggests where to look;
// nothing it prints is a verified combo. The heavy run belongs on GitHub Actions
// (.github/workflows/engine.yml), not on the Mac (#451).
//
//   npm run engine                   # search, write candidates.json, print the top 30
//   npm run engine -- --recall       # also print recall against the catalogue's non-ENGINE entries,
//                                    # and exit 1 below RECALL_FLOOR (src/engine/rank.ts, #750) at default options
//   npm run engine -- --coverage     # also print how many deckable cards the tagger tags, and the rest
//   npm run engine -- --max-cards=4 --budget=1000000
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCardIndex, loadCombos } from "./load.js";
import { isTagged, tagCard } from "./engine/tags.js";
import { deckablePool, search } from "./engine/search.js";
import { RECALL_FLOOR, markKnown, rank, recallExitCode } from "./engine/rank.js";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const num = (name: string) => {
  const v = args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  if (v === undefined) return undefined;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) { console.error(`--${name} wants a positive integer, got ${v}`); process.exit(2); }
  return n;
};

const cards = loadCardIndex();
const pool = deckablePool(cards);

if (flag("coverage")) {
  const untagged = pool.filter((c) => !isTagged(tagCard(c)));
  console.log(`coverage: ${pool.length - untagged.length}/${pool.length} deckable cards carry a trigger or an effect`);
  console.log(`untagged (${untagged.length}):`);
  for (const c of untagged.sort((a, b) => a.base.localeCompare(b.base))) console.log(`  ${c.base.padEnd(8)} ${c.name}`);
}

const started = Date.now();
const result = search(pool, { maxCards: num("max-cards"), budget: num("budget"), maxCandidates: num("max-candidates") });
const ranked = rank(result.candidates);
const { combos } = loadCombos();
const recall = markKnown(ranked, combos, cards);
console.log(`graph: ${result.nodes} abilities, ${result.edges} edges; ${result.expansions} expansions; ` +
  `complete to ${result.completeDepth} cards${result.stoppedBy ? ` (stopped by ${result.stoppedBy})` : ""}; ${ranked.length} candidates in ${((Date.now() - started) / 1000).toFixed(1)} s`);

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "out", "engine");
mkdirSync(outDir, { recursive: true });
// The file keeps the head of the ranking plus each catalogued entry's first (best-ranked) line, so it
// stays bounded at KEEP + the entry count: millions of rows would pass V8's string limit, and no
// reader goes past the first few thousand.
const KEEP = 20_000;
const firstHits = new Set(recall.found.map((f) => f.rank));
const kept = ranked.map((c, i) => ({ rank: i + 1, ...c })).filter((c) => c.rank <= KEEP || firstHits.has(c.rank));
writeFileSync(join(outDir, "candidates.json"), JSON.stringify({
  note: "Engine output (#736): text-graph candidates, not verified combos. A catalogue entry still needs a hand walk.",
  completeDepth: result.completeDepth,
  stoppedBy: result.stoppedBy,
  total: ranked.length,
  recall: { found: recall.found.length, total: recall.total, medianRank: recall.medianRank, missed: recall.missed },
  candidates: kept,
}) + "\n");

const name = (b: string) => cards.get(b)?.name ?? b;
console.log("\ntop 30:");
ranked.slice(0, 30).forEach((c, i) => {
  console.log(`${String(i + 1).padStart(3)}. ${c.class.padEnd(8)} ${c.cards.map((b) => `${b} ${name(b)}`).join(" -> ")}` +
    `  [${c.energy}E, ${c.domains.join("/") || "no domain"}${c.oneIdentity ? "" : ", no one identity"}${c.limiters.length ? `, ${c.limiters.join("/")}` : ""}]` +
    (c.known ? `  known: ${c.known}` : ""));
  for (const e of c.edges) console.log(`       ${e.from} "${e.effectSpan}" -> ${e.to} "${e.triggerSpan}" (${e.effect} -> ${e.trigger})`);
});

if (flag("recall")) {
  console.log(`\nrecall: ${recall.found.length}/${recall.total}, median rank ${recall.medianRank ?? "n/a"}`);
  for (const f of recall.found) console.log(`  found  #${f.rank} ${f.id}`);
  console.log(`missed (${recall.missed.length}): ${recall.missed.join(", ")}`);
  // The floor was measured at default search options, so a run that overrides one is not held to it.
  if (["max-cards", "budget", "max-candidates"].some((n) => num(n) !== undefined)) console.log(`floor ${RECALL_FLOOR} not applied: search options differ from the measured defaults`);
  else {
    process.exitCode = recallExitCode(recall.found.length);
    if (process.exitCode) console.error(`recall ${recall.found.length}/${recall.total} is below the floor of ${RECALL_FLOOR} (src/engine/rank.ts)`);
  }
}
