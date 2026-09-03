#!/usr/bin/env node
// Build data/cards.json from Riot's public gallery content API, then apply
// data/errata.json (text changes Riot announced but has not reprinted) and
// resolve data/legality.src.json (names) to data/legality.json (card codes).
//
//   node scripts/build-cards.mjs            # fetch live
//   node scripts/build-cards.mjs --from DIR # reuse saved api_page_*.json in DIR
//
// The API is the same one playriftbound.com/en-us/card-gallery uses for SSR.
// It carries a separate `effect` field for Equipment (the text granted to the
// equipped unit), which the RiftScribe mirror drops entirely — that omission
// hid the Eye of the Herald engine from the Phase 0 hunt.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data");
const API =
  "https://content.publishing.riotgames.com/publishing-content/v2.0/public/channel/riftbound_website/list/riftbound_gallery_cards";
const UA = "RiftCombo/0.1 (personal fan project; +https://github.com/GermanAbuArab)";
const PAGE = 200;

const args = process.argv.slice(2);
const fromDir = args.includes("--from") ? args[args.indexOf("--from") + 1] : null;

async function fetchPage(from) {
  if (fromDir) {
    return JSON.parse(readFileSync(join(fromDir, `api_page_${from}.json`), "utf8"));
  }
  const url = `${API}?locale=en_US&from=${from}&limit=${PAGE}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function fetchAll() {
  const first = await fetchPage(0);
  const total = first.metadata.totalItems;
  const items = [...first.data];
  for (let from = PAGE; from < total; from += PAGE) {
    const page = await fetchPage(from);
    items.push(...page.data);
  }
  return { items, updatedAt: first.metadata.resultsUpdatedAt };
}

// --- normalization ----------------------------------------------------------

const stripHtml = (html) =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

const rich = (field) => (field?.richText?.body ? stripHtml(field.richText.body) : null);
const val = (field) => (field?.value && typeof field.value === "object" ? field.value.id : field?.value ?? null);
const num = (field) => {
  const v = val(field);
  return v === null || v === undefined ? null : Number(v);
};

// "OGN-002/298" -> "OGN-002"; "UNL-079a/219" -> "UNL-079a"; "VEN-R01" -> "VEN-R01"
const shortCode = (publicCode) => publicCode.split("/")[0];
// "UNL-079a" -> { base: "UNL-079", variant: "a" }; "SFD-227*" (alt-art) -> variant "*";
// "VEN-SP3", "UNL-T01", "VEN-R04" (special / token / rune prefixes) -> no variant.
const splitVariant = (code) => {
  const m = code.match(/^([A-Z]{3}-(?:[A-Z]*\d+))([a-z*]?)$/);
  if (!m) throw new Error(`unparseable code ${code}`);
  return { base: m[1], variant: m[2] || "" };
};

function normalize(item) {
  const code = shortCode(item.publicCode);
  const { base, variant } = splitVariant(code);
  return {
    id: item.id,
    code,
    base,
    variant,
    publicCode: item.publicCode,
    name: item.name,
    set: item.set.value.id,
    collectorNumber: item.collectorNumber,
    type: item.cardType.type.map((t) => t.id),
    rarity: val(item.rarity),
    // Riot lists domainless cards (battlefields, tokens) as "colorless"; we model that as no domain,
    // which is what Domain Identity's subset rule needs.
    domains: (item.domain?.values ?? []).map((d) => d.id).filter((d) => d !== "colorless"),
    energy: num(item.energy),
    power: num(item.power),
    might: num(item.might),
    mightBonus: num(item.mightBonus),
    text: rich(item.text),
    effect: rich(item.effect),
    tags: item.tags?.tags ?? [],
    orientation: item.orientation,
    artist: (item.illustrator?.values ?? []).map((a) => a.label).join(", ") || null,
    image: item.cardImage?.url ?? null,
  };
}

// --- errata overlay ---------------------------------------------------------

function applyErrata(cards, errata) {
  const byName = new Map();
  for (const c of cards) {
    if (!byName.has(c.name)) byName.set(c.name, []);
    byName.get(c.name).push(c);
  }
  for (const e of errata) {
    const targets = byName.get(e.name);
    if (!targets) throw new Error(`errata: no card named ${JSON.stringify(e.name)}`);
    for (const c of targets) {
      const field = e.field ?? "text";
      const cur = c[field] ?? "";
      // A reprint may already carry the errata'd text (Sona VEN-SP2, Void Burrower SFD-243): skip it.
      if (!cur.includes(e.find) && cur.includes(e.replace)) continue;
      const n = cur.split(e.find).length - 1;
      if (n !== 1) {
        throw new Error(
          `errata: expected exactly 1 match of find-text in ${c.code} ${c.name}.${field}, got ${n}\n  find: ${e.find}\n  text: ${cur}`,
        );
      }
      c[field] = cur.replace(e.find, e.replace);
      c.errata = [...(c.errata ?? []), { effective: e.effective, source: e.source }];
    }
  }
}

// --- legality ---------------------------------------------------------------

const normName = (s) => s.replace(/[’‘']/g, "'").replace(/\s+/g, " ").trim().toLowerCase();

function resolveLegality(cards, src) {
  const byName = new Map();
  for (const c of cards) {
    const k = normName(c.name);
    if (!byName.has(k)) byName.set(k, []);
    byName.get(k).push(c);
  }
  const out = { source: src.source, retrieved: src.retrieved, entries: [] };
  for (const fmt of src.formats) {
    for (const ban of fmt.banned) {
      const matches = (byName.get(normName(ban.name)) ?? []).filter((c) => c.type.includes(ban.entity));
      if (matches.length === 0) throw new Error(`legality: ${ban.entity} ${JSON.stringify(ban.name)} not found`);
      out.entries.push({
        format: fmt.id,
        entity: ban.entity,
        name: matches[0].name,
        codes: matches.map((c) => c.code),
        bases: [...new Set(matches.map((c) => c.base))],
        status: ban.status ?? "banned",
        since: ban.since ?? fmt.lastUpdated,
        source: ban.source ?? fmt.source,
      });
    }
  }
  return out;
}

// --- main -------------------------------------------------------------------

const { items, updatedAt } = await fetchAll();
const cards = items.map(normalize);

const ids = new Set(cards.map((c) => c.id));
if (ids.size !== cards.length) throw new Error("duplicate ids in gallery payload");

const errata = JSON.parse(readFileSync(join(DATA, "errata.json"), "utf8"));
applyErrata(cards, errata.entries);

const legalitySrc = JSON.parse(readFileSync(join(DATA, "legality.src.json"), "utf8"));
const legality = resolveLegality(cards, legalitySrc);

cards.sort((a, b) => (a.set + a.code).localeCompare(b.set + b.code));
mkdirSync(DATA, { recursive: true });
writeFileSync(
  join(DATA, "cards.json"),
  JSON.stringify({ source: API, resultsUpdatedAt: updatedAt, built: new Date().toISOString(), count: cards.length, cards }, null, 1),
);
writeFileSync(join(DATA, "legality.json"), JSON.stringify(legality, null, 1));

const withEffect = cards.filter((c) => c.effect).length;
const errataApplied = cards.filter((c) => c.errata).length;
console.log(`cards: ${cards.length} (${new Set(cards.map((c) => c.base)).size} unique printings ignoring alt-art)`);
console.log(`equipment effects: ${withEffect}; errata applied to ${errataApplied} printings; legality entries: ${legality.entries.length}`);
