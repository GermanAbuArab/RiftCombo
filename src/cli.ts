#!/usr/bin/env tsx
// Usage: npm run find -- <deck code | path to decklist.txt> [--format constructed|2v2] [--max-missing N]
import { readFileSync, existsSync } from "node:fs";
import { CardIndex } from "./cards.js";
import { loadDeck } from "./deck.js";
import { generateVariants, loadCombos, validateCombos } from "./combos.js";
import { matchDeck, type Hit, type MatchResult } from "./matcher.js";
import type { Format } from "./types.js";

const args = process.argv.slice(2);
const flag = (name: string) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const target = args.find((a) => !a.startsWith("--") && a !== flag("--format") && a !== flag("--max-missing"));
if (!target) { console.error("usage: find <deck code | decklist file> [--format constructed|2v2] [--max-missing N]"); process.exit(2); }

const format = (flag("--format") ?? "constructed") as Format;
const maxMissing = Number(flag("--max-missing") ?? 2);

const cards = CardIndex.load();
const { combos, features } = loadCombos();
const errors = validateCombos(combos, features, cards);
if (errors.length) { console.error("combos.json invalid:\n  " + errors.join("\n  ")); process.exit(1); }
const variants = generateVariants(combos, cards);

const input = existsSync(target) ? readFileSync(target, "utf8") : target;
const deck = loadDeck(input, cards);
const result = matchDeck(deck, variants, cards, { format, maxMissing });

const name = (base: string) => cards.get(base)?.name ?? base;
const total = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);
console.log(`Legend: ${deck.legend ? `${name(deck.legend)} [${cards.domainsOf(deck.legend).join("/")}]` : "(none)"}`);
console.log(`Main ${total(deck.main)} · Battlefields ${total(deck.battlefields)} · Runes ${total(deck.runes)} · Sideboard ${total(deck.sideboard)}`);
if (deck.unresolved.length) console.log(`Unresolved: ${deck.unresolved.map((u) => `${u.count}x ${u.raw}`).join(", ")}`);

const printHit = (h: Hit) => {
  const v = h.variant;
  const cardsList = Object.entries(v.cards).map(([b, n]) => `${n}x ${name(b)}`).join(", ");
  let line = `  - [${v.class}${v.status !== "verified" ? `, ${v.status}` : ""}] ${v.id}: ${cardsList}`;
  if (h.missing.length) line += `\n      missing: ${h.missing.map((m) => `${m.quantity}x ${name(m.card)}`).join(", ")}`;
  if (h.offDomain.length) line += `\n      off-domain: ${h.offDomain.map(name).join(", ")}`;
  if (h.illegal.length) line += `\n      ${format}: ${h.illegal.map((e) => `${e.name} ${e.status} since ${e.since}`).join("; ")}`;
  console.log(line);
};
const sections: [keyof MatchResult, string][] = [
  ["included", "Included"],
  ["includedByChangingLegend", "Included by changing legend"],
  ["almostIncluded", `Almost included (≤${maxMissing} cards)`],
  ["almostIncludedByAddingDomains", "Almost included by adding domains"],
  ["almostIncludedByChangingLegend", "Almost included by changing legend"],
  ["almostIncludedByAddingDomainsAndChangingLegend", "Almost included by adding domains and changing legend"],
];
for (const [key, label] of sections) {
  const hits = result[key];
  if (!hits.length) continue;
  console.log(`\n${label} (${hits.length})`);
  hits.forEach(printHit);
}
if (Object.values(result).every((b) => b.length === 0)) console.log("\nNo known combos within reach of this deck.");
