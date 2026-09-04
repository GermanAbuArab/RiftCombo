#!/usr/bin/env tsx
// Print every synergy rule's whole match list, so a human can read it card by card before the rule
// ships. The rule is what gets verified; the instances below are text matches, and a rule whose
// list cannot be read in full is a rule written too loosely.
//
//   npm run synergies              # every rule
//   npm run synergies -- <id…>     # just these
//   npm run synergies -- --terse   # counts only
//   npm run synergies -- --match   # show only the fragment the predicate caught, ±30 chars
import { loadCardIndex, loadSynergies } from "./load.js";
import { partnersOf, synergyText, validateSynergies } from "./synergies.js";

const args = process.argv.slice(2);
const terse = args.includes("--terse");
const fragment = args.includes("--match");
const wanted = args.filter((a) => !a.startsWith("--"));

const cards = loadCardIndex();
const synergies = loadSynergies();
// The count guard is skipped here on purpose: a rule whose list has grown is exactly the one this
// tool has to print, and refusing to start would hide it. `npm test` still fails on it.
const errors = validateSynergies(synergies, cards, { skipReviewCount: true });
if (errors.length) { console.error("synergies.json invalid:\n  " + errors.join("\n  ")); process.exit(1); }

const selected = wanted.length ? synergies.filter((s) => wanted.includes(s.id)) : synergies;
if (!selected.length) { console.error(`no rule matches ${wanted.join(", ")}`); process.exit(2); }

let total = 0;
const stale: string[] = [];
for (const s of selected) {
  const anchor = cards.get(s.anchor)!;
  const partners = partnersOf(s, cards);
  total += partners.length;
  console.log(`\n${s.id} — ${s.name}`);
  console.log(`  anchor    ${s.anchor} ${anchor.name} [${anchor.type.join(",")}] {${anchor.domains.join(",")}}`);
  console.log(`  predicate ${s.partner.textMatches ? `/${s.partner.textMatches}/` : "any text"}${s.partner.textExcludes ? ` minus /${s.partner.textExcludes}/` : ""}` +
    `${s.partner.tags ? ` · tags ${s.partner.tags.join(",")}` : ""}` +
    `${s.partner.types ? ` · types ${s.partner.types.join(",")}` : ""}${s.partner.minMightBonus !== undefined ? ` · Might bonus >= ${s.partner.minMightBonus}` : ""}`);
  console.log(`  basis     rules ${s.basis.rules.join(", ")}${s.basis.readings?.length ? ` · readings ${s.basis.readings.join(", ")}` : ""} · ${s.basis.combos.length} combo(s)`);
  const drift = partners.length - s.reviewedCount;
  console.log(`  reviewed  ${s.reviewed} · ${partners.length} partners in the pool` +
    (drift === 0 ? "" : `  ** ${drift > 0 ? "+" : ""}${drift} since it was read (${s.reviewedCount}); read the list again and restamp **`));
  if (drift !== 0) stale.push(s.id);
  for (const x of s.partner.excludes ?? []) {
    console.log(`  excluded  ${x.card} ${cards.get(x.card)?.name ?? "?"} — ${x.why}`);
  }
  if (terse) continue;
  const re = s.partner.textMatches ? new RegExp(s.partner.textMatches) : null;
  for (const c of partners) {
    const head = `    ${c.base.padEnd(8)}${c.name.padEnd(32)}${c.type.join(",").padEnd(12)}{${c.domains.join(",")}}`;
    const flat = synergyText(c).replace(/\s*\n\s*/g, " / ").trim();
    let body = flat.slice(0, 150);
    if (fragment) {
      const m = re?.exec(flat);
      body = m ? flat.slice(Math.max(0, m.index - 12), m.index + m[0].length + 60) : flat.slice(0, 90);
    }
    console.log(head.padEnd(74) + body);
  }
}
console.log(`\n${selected.length} rules · ${total} anchor\u2013partner pairs`);
if (stale.length) {
  console.log(`${stale.length} rule(s) drifted since they were read: ${stale.join(", ")}`);
  process.exit(1);
}
