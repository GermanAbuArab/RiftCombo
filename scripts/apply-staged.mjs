#!/usr/bin/env node
/**
 * Apply a lane's staged edit list to a file the manager owns (CLAUDE.md today).
 *
 *   node scripts/apply-staged.mjs <apply.json> <target>            # validate only
 *   node scripts/apply-staged.mjs <apply.json> <target> --write    # validate, write, retire the list
 *
 * Item shape: {"id", "mode":"splice", "old", "new"} or {"id", "mode":"append", "anchor", "new"}.
 * An `append` inserts `new` BEFORE `anchor`. A `splice` replaces `old` with `new`.
 *
 * WHY THIS FILE EXISTS. Two managers in two days have hand-applied a lane's staged corrections to
 * CLAUDE.md, and on 2026-09-14 the ad-hoc version produced two near-misses within an hour. Both are
 * guarded here, and both are worth reading because neither is obvious:
 *
 * 1. A DRY RUN THAT RE-READS ITS INPUT AT WRITE TIME IS NOT A DRY RUN. The manager validated SIX
 *    items, then ran the same command with --write and applied TWENTY-ONE, because the lane had
 *    backfilled the list in between. It happened to land on the lane's predicted state, which is luck.
 *    Guard: --write requires the SHA-256 the validation pass printed, so the bytes that were checked
 *    are the bytes that get applied.
 *
 * 2. THE LIST IS NOT IDEMPOTENT, AND ITS UNSAFE DIRECTION IS INVISIBLE TO A UNIQUENESS GATE.
 *    Measured on the real batch: re-running an already-applied list would have re-applied 17 of 21.
 *      - an APPEND never consumes its anchor, so the anchor is still unique afterwards;
 *      - an EXTENSION splice has `new` CONTAINING `old`, so `old` still occurs exactly once afterwards;
 *      - only a TRUE REPLACEMENT is idempotent, and only by accident.
 *    The result would be two copies of the CORRECTION standing together - the partial-correction
 *    defect this project calls its worst, in its least recognisable costume.
 *    Guard: refuse any item whose `new` is ALREADY present. Exact, one line, fails safe. And after a
 *    successful write the list is RETIRED to `<name>.applied.json`, because the list is a QUEUE and
 *    the record is git.
 *
 * The structural check is deliberately aware of the extension case: a splice is INTRA-LINE, so the
 * line it lands in legitimately changes. A flat "every original line must survive" test reported eight
 * correct edits as defects on its first run. A structural guard is as capable of being wrong as the
 * thing it guards.
 */
import { readFileSync, writeFileSync, renameSync } from "node:fs";
import { createHash } from "node:crypto";

const [listPath, targetPath, ...rest] = process.argv.slice(2);
if (!listPath || !targetPath) {
  console.error("usage: apply-staged.mjs <apply.json> <target> [--write --expect <sha256>]");
  process.exit(64);
}
const write = rest.includes("--write");
const expect = rest.includes("--expect") ? rest[rest.indexOf("--expect") + 1] : null;

const raw = readFileSync(listPath);
const listSha = createHash("sha256").update(raw).digest("hex").slice(0, 16);
const items = JSON.parse(raw.toString());
const before = readFileSync(targetPath, "utf8");

console.log(`NON-VACUITY: ${items.length} items from ${listPath} (sha ${listSha})`);
console.log(`             ${targetPath} is ${before.length} chars, ${before.split("\n").length} lines`);

if (write && expect !== listSha) {
  console.error(`ABORT: --write needs --expect ${listSha}; the list must be the one you validated.`);
  process.exit(3);
}

let t = before;
for (const it of items) {
  const needle = it.mode === "splice" ? it.old : it.anchor;
  if (typeof needle !== "string" || !needle.length) { console.error(`ABORT ${it.id}: no needle`); process.exit(3); }
  // GUARD 2, before uniqueness: an item whose payload is already in the file has been applied.
  const probe = it.new.length > 280 ? it.new.slice(60, 220) : it.new.trim();
  if (t.includes(probe)) { console.error(`ABORT ${it.id}: its \`new\` content is ALREADY PRESENT - this list has been applied.`); process.exit(3); }
  const n = t.split(needle).length - 1;
  if (n !== 1) { console.error(`ABORT ${it.id}: needle occurs ${n} times, need exactly 1`); process.exit(3); }
  t = it.mode === "splice" ? t.replace(needle, it.new) : t.replace(needle, it.new + needle);
  const kind = it.mode === "splice" ? (it.new.includes(it.old) ? "splice/extend" : "splice/replace") : "append";
  console.log(`  ok ${String(it.id).padEnd(14)} ${kind}`);
}

const olds = items.filter((i) => i.mode === "splice").map((i) => i.old);
const after = new Set(t.split("\n"));
const lost = before.split("\n").filter((l) => l.trim() && !after.has(l) && !olds.some((o) => l.includes(o.split("\n")[0])));
console.log(`\nlines ${before.split("\n").length} -> ${t.split("\n").length}; chars ${before.length} -> ${t.length}`);
console.log(`original lines lost OUTSIDE a spliced span: ${lost.length}`);
if (lost.length) { lost.slice(0, 5).forEach((l) => console.error("  LOST: " + l.slice(0, 120))); process.exit(4); }

if (!write) { console.log(`\nvalidated. to apply:  --write --expect ${listSha}`); process.exit(0); }
writeFileSync(targetPath, t);
renameSync(listPath, listPath.replace(/\.json$/, "") + ".applied.json");
console.log(`WRITTEN. list retired to ${listPath.replace(/\.json$/, "")}.applied.json - a queue, not a record.`);
