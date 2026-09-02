#!/usr/bin/env node
// Flatten data/cards.json into data/corpus_flat.txt — one line per distinct card
// (name + type), for LLM reading. Includes Equipment effect text and Might bonus,
// full domain names (never initials: Calm, Chaos and Colorless all start with C),
// and errata-applied text.
//
//   node scripts/build-corpus.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data");

const { cards, resultsUpdatedAt } = JSON.parse(readFileSync(join(DATA, "cards.json"), "utf8"));
const legality = JSON.parse(readFileSync(join(DATA, "legality.json"), "utf8"));

// Prefer the base printing (no variant suffix); among those, the one with the
// longest text (alt-arts sometimes drop reminder text).
const byKey = new Map();
for (const c of cards) {
  const k = `${c.name}|${c.type.join("/")}`;
  const cur = byKey.get(k);
  const better =
    !cur ||
    (cur.variant && !c.variant) ||
    (cur.variant === c.variant && (c.text ?? "").length > (cur.text ?? "").length);
  if (better) byKey.set(k, c);
}

const banned = new Map();
for (const e of legality.entries) {
  for (const code of e.codes) {
    if (!banned.has(code)) banned.set(code, []);
    banned.get(code).push(`${e.format}:${e.status}`);
  }
}

const cost = (c) => {
  const parts = [];
  if (c.energy !== null) parts.push(`E${c.energy}`);
  if (c.power !== null) parts.push(`P${c.power}`);
  if (c.might !== null) parts.push(`M${c.might}`);
  if (c.mightBonus !== null) parts.push(`M+${c.mightBonus}`);
  return parts.join(" ") || "-";
};
const oneLine = (s) => (s ?? "").replace(/\s*\n\s*/g, " ").trim();

const rows = [...byKey.values()].sort((a, b) => a.code.localeCompare(b.code));
const lines = [
  `# Riftbound card corpus — ${rows.length} distinct cards (${cards.length} printings incl. alt-art), Riot gallery API data as of ${resultsUpdatedAt}, errata applied.`,
  `# Columns: code | name | type | domains | cost | text   (cost: E=Energy, P=Power, M=Might, M+=Equipment Might bonus)`,
  `# Icons: :rb_energy_N: = N Energy; :rb_rune_<domain>: = 1 Power of that domain; :rb_rune_rainbow: = 1 Power of any domain; :rb_exhaust: = exhaust; :rb_might: = Might.`,
  `# Equipment: the [Effect] clause is the text granted to the unit it is attached to ("I" = that unit).`,
  `# [BANNED format:status] marks cards on Riot's current ban list (Rules Hub).`,
  `code | name | type | domains | cost | text`,
];
for (const c of rows) {
  let text = oneLine(c.text) || "(no text)";
  if (c.effect) text += ` [Effect] ${oneLine(c.effect)}`;
  if (c.tags?.length) text += ` [Tags: ${c.tags.join(", ")}]`;
  if (banned.has(c.code)) text = `[BANNED ${banned.get(c.code).join(", ")}] ${text}`;
  lines.push(
    `${c.code} | ${c.name} | ${c.type.map((t) => t[0].toUpperCase() + t.slice(1)).join("/")} | ${c.domains.map((d) => d[0].toUpperCase() + d.slice(1)).join("/") || "Colorless"} | ${cost(c)} | ${text}`,
  );
}
writeFileSync(join(DATA, "corpus_flat.txt"), lines.join("\n") + "\n");
console.log(`corpus_flat.txt: ${rows.length} cards, ${lines.join("\n").length} chars`);
