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
    // Modal abilities ship as <ul><li>; stripping the tags bare glues the modes into one
    // clause ("...this turn —Ready 2 runes.Channel 1 rune exhausted."). Keep the bullets.
    .replace(/<li>/gi, "\n\u2022 ")
    .replace(/<[^>]+>/g, "")
    // Riot's only entities are &gt; and &quot;; the rest are decoded because they are cheap
    // to cover. &quot; must run before &amp; so a literal "&amp;quot;" is not double-decoded.
    .replace(/&quot;/g, '"')
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

// #660: since 2026-11 the gallery ships the epithet as a separate `subtitle` ("Draven" +
// "Vanquisher"), where it used to ship one `name` ("Draven, Vanquisher"). Every name in the pool,
// errata, legality, signature and every saved deck uses the joined form, so it is rebuilt here:
// - a Signature card's subtitle is the champion it belongs to ("Tibbers" + "Annie"), not part of
//   its name, which stays bare as it always was;
// - a legend's subtitle ("Dark Child" + "Starter") is joined with " - ", the gallery's old spelling
//   of the four Proving Grounds legends (normalizeName in src/cards.ts accepts ", Starter" too);
// - any other subtitle is joined with ", ".
// Measured over the 1189 printings built before the change: this reproduces 1186 names exactly;
// the other three are Riot's renames (OGS-004/009 "Yi" -> "Master Yi", VEN-T04 "Recruit (NX)" ->
// "Recruit"), listed on #660.
const isSignature = (item) => (item.cardType.superType ?? []).some((t) => t.id === "signature");
export function displayName(item) {
  if (!item.subtitle || isSignature(item)) return item.name;
  const sep = item.cardType.type.some((t) => t.id === "legend") ? " - " : ", ";
  return `${item.name}${sep}${item.subtitle}`;
}

// #660: since 2026-11 the gallery also fills `might` on Equipment with the same number as
// `mightBonus` (all 40 Equipment printings, read 2026-11-16; `might` was null on every gear until
// then). A gear has no Might of its own, and `might` is what the corpus prints as `M` and the web
// shows as a unit's Might, so a gear keeps `might: null` and the bonus stays in `mightBonus`. A gear
// whose two numbers differ would be a new shape, so it fails the build instead of being guessed.
export function gearMight(item) {
  const might = num(item.might);
  if (might === null || !item.cardType.type.some((t) => t.id === "gear")) return might;
  if (might !== num(item.mightBonus)) throw new Error(`${item.publicCode}: gear might ${might} differs from mightBonus ${num(item.mightBonus)}`);
  return null;
}

function normalize(item) {
  const code = shortCode(item.publicCode);
  const { base, variant } = splitVariant(code);
  return {
    id: item.id,
    code,
    base,
    variant,
    publicCode: item.publicCode,
    name: displayName(item),
    set: item.set.value.id,
    collectorNumber: item.collectorNumber,
    type: item.cardType.type.map((t) => t.id),
    rarity: val(item.rarity),
    // Riot lists domainless cards (battlefields, tokens) as "colorless"; we model that as no domain,
    // which is what Domain Identity's subset rule needs.
    domains: (item.domain?.values ?? []).map((d) => d.id).filter((d) => d !== "colorless"),
    energy: num(item.energy),
    power: num(item.power),
    might: gearMight(item),
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

export function applyErrata(cards, errata) {
  const byName = new Map();
  for (const c of cards) {
    if (!byName.has(c.name)) byName.set(c.name, []);
    byName.get(c.name).push(c);
  }
  for (const e of errata) {
    const targets = byName.get(e.name);
    if (!targets) throw new Error(`errata: no card named ${JSON.stringify(e.name)}`);
    // A reprint may already carry the errata'd text (Sona VEN-SP2, Void Burrower SFD-243). That is
    // named per printing in the entry's own `alreadyReprinted` list, never inferred from content —
    // a coincidental match of the replace-text must not be able to disguise a mistyped find-string.
    const alreadyReprinted = new Set(e.alreadyReprinted ?? []);
    for (const c of targets) {
      const field = e.field ?? "text";
      const cur = c[field] ?? "";
      if (alreadyReprinted.has(c.code)) {
        if (!cur.includes(e.replace)) {
          throw new Error(
            `errata: ${c.code} ${c.name} is listed in alreadyReprinted but its ${field} does not contain the replace-text\n  replace: ${e.replace}\n  text: ${cur}`,
          );
        }
        alreadyReprinted.delete(c.code);
        continue;
      }
      const n = cur.split(e.find).length - 1;
      if (n !== 1) {
        throw new Error(
          `errata: expected exactly 1 match of find-text in ${c.code} ${c.name}.${field}, got ${n}\n  find: ${e.find}\n  text: ${cur}`,
        );
      }
      c[field] = cur.replace(e.find, e.replace);
      c.errata = [...(c.errata ?? []), { effective: e.effective, source: e.source }];
    }
    if (alreadyReprinted.size > 0) {
      throw new Error(
        `errata: ${JSON.stringify(e.name)} alreadyReprinted names printings not found among its cards: ${[...alreadyReprinted].join(", ")}`,
      );
    }
  }
}

// --- legality ---------------------------------------------------------------

const normName = (s) => s.replace(/[’‘']/g, "'").replace(/\s+/g, " ").trim().toLowerCase();

// `notInPool` (#647) records a ban on a card Riot has announced but our pool does not hold yet: the
// entry carries the code Riot's gallery gives it and skips the lookup. It fails the build the moment
// the pool does hold the name, so the field is removed by whoever ingests the set (#664, #665).
export function resolveLegality(cards, src) {
  const byName = new Map();
  for (const c of cards) {
    const k = normName(c.name);
    if (!byName.has(k)) byName.set(k, []);
    byName.get(k).push(c);
  }
  const out = { source: src.source, retrieved: src.retrieved, entries: [] };
  for (const fmt of src.formats) {
    for (const ban of fmt.banned) {
      const found = (byName.get(normName(ban.name)) ?? []).filter((c) => c.type.includes(ban.entity));
      if (ban.notInPool && found.length) {
        throw new Error(`legality: ${ban.entity} ${JSON.stringify(ban.name)} is in the pool now; remove its notInPool`);
      }
      const matches = ban.notInPool ? [{ name: ban.name, code: ban.notInPool, base: ban.notInPool }] : found;
      if (matches.length === 0) throw new Error(`legality: ${ban.entity} ${JSON.stringify(ban.name)} not found`);
      out.entries.push({
        format: fmt.id,
        entity: ban.entity,
        name: matches[0].name,
        // Sorted so the result does not depend on the pool's order: the live build resolves before it
        // sorts cards.json, and --legality-only reads the sorted file (#647).
        codes: matches.map((c) => c.code).sort(),
        bases: [...new Set(matches.map((c) => c.base))].sort(),
        status: ban.status ?? "banned",
        since: ban.since ?? fmt.lastUpdated,
        source: ban.source ?? fmt.source,
      });
    }
  }
  return out;
}

// --- signature (#103) --------------------------------------------------------
//
// Until 2026-11 Riot's gallery shipped no Signature marker (Core Rules 133.7.b / 103.2.d), so two
// independent mirrors (Piltover Archive's `card.super`, dotgg's `supertype`) that agree on the same
// 51 names became data/signature.src.json, and this resolves each to exactly one base code — zero or
// two-or-more is a build failure. The gallery now ships `cardType.superType` "signature" (#660), and
// that is the source `Card.signature` is read from: read 2026-11-16 it marks exactly those 51 bases
// in the sets built here (and nine Radiance cards, held below). The mirrors' list stays as a
// cross-check in both directions: the build fails if the gallery stops marking one of the 51, or
// marks a base the mirrors do not list, so a new Signature card needs a second source too.
//
// resolveLegality does NOT apply that discipline, and must not: 104 names in this pool already span
// two or more base codes (Vi, Destructive is OGN-036 + VEN-167; Ahri, Inquisitive is OGN-119 +
// SFD-227 + VEN-SP3), and a ban is on the CARD, so it has to reach every printing family of it.
// That is why it collects `bases` as a set instead of insisting on one. A 2026-09-06 review read the
// sentence that used to be here — "the same discipline resolveLegality already applies" — and
// proposed adding the throw; it would fail the build the first time a reprinted card is banned.
//
// The asymmetry is a live risk in the other direction: the day a Signature card is reprinted under a
// second base, this throws and the build stops until someone decides whether Signature is a property
// of the card (widen to a set, like legality) or of the printing (list both names). None of the 51
// spans two bases today.

function resolveSignature(cards, src) {
  const byName = new Map();
  for (const c of cards) {
    const k = normName(c.name);
    if (!byName.has(k)) byName.set(k, []);
    byName.get(k).push(c);
  }
  const bases = new Set();
  for (const name of src.names) {
    const matches = byName.get(normName(name)) ?? [];
    const distinctBases = [...new Set(matches.map((c) => c.base))];
    if (distinctBases.length === 0) throw new Error(`signature: no card named ${JSON.stringify(name)}`);
    if (distinctBases.length > 1) {
      throw new Error(`signature: ${JSON.stringify(name)} resolves to ${distinctBases.length} base cards: ${distinctBases.join(", ")}`);
    }
    bases.add(distinctBases[0]);
  }
  if (bases.size !== src.names.length) {
    throw new Error(`signature: ${src.names.length} names resolved to only ${bases.size} distinct base cards`);
  }
  return bases;
}

// --- main -------------------------------------------------------------------
//
// Gated on direct execution (never on import) so test/errata.test.ts can import applyErrata above
// without triggering a live fetch of Riot's gallery as a side effect of loading the module.

// Sets the gallery publishes that are not built yet. Radiance (RAD, 219 printings read 2026-11-16)
// is held until #664 ingests it: it brings new pins to read (synergy lists, or-pairs, the turn
// clock) and 20 printings whose type or domain contradicts their own text.
const HELD_SETS = new Set(["RAD"]);

const isMain = import.meta.url === `file://${process.argv[1]}`;
// `--legality-only` (#647) re-resolves data/legality.src.json over the COMMITTED pool and writes only
// data/legality.json, for a ban-list update that must not wait on a gallery rebuild.
if (isMain && args.includes("--legality-only")) {
  const { cards } = JSON.parse(readFileSync(join(DATA, "cards.json"), "utf8"));
  const legality = resolveLegality(cards, JSON.parse(readFileSync(join(DATA, "legality.src.json"), "utf8")));
  writeFileSync(join(DATA, "legality.json"), JSON.stringify(legality, null, 1));
  console.log(`legality entries: ${legality.entries.length} (resolved over the committed data/cards.json, ${cards.length} printings)`);
} else if (isMain) {
  const { items: all, updatedAt } = await fetchAll();
  const items = all.filter((i) => !HELD_SETS.has(i.set.value.id));
  const cards = items.map(normalize);
  const signatureIds = new Set(items.filter(isSignature).map((i) => i.id));

  const ids = new Set(cards.map((c) => c.id));
  if (ids.size !== cards.length) throw new Error("duplicate ids in gallery payload");

  const errata = JSON.parse(readFileSync(join(DATA, "errata.json"), "utf8"));
  applyErrata(cards, errata.entries);

  const legalitySrc = JSON.parse(readFileSync(join(DATA, "legality.src.json"), "utf8"));
  const legality = resolveLegality(cards, legalitySrc);

  const signatureSrc = JSON.parse(readFileSync(join(DATA, "signature.src.json"), "utf8"));
  const mirrorBases = resolveSignature(cards, signatureSrc);
  const signatureBases = new Set(cards.filter((c) => signatureIds.has(c.id)).map((c) => c.base));
  const unmarked = [...mirrorBases].filter((b) => !signatureBases.has(b));
  if (unmarked.length > 0) throw new Error(`signature: the gallery does not mark ${unmarked.join(", ")} as Signature`);
  const unlisted = [...signatureBases].filter((b) => !mirrorBases.has(b));
  if (unlisted.length > 0) throw new Error(`signature: the gallery marks ${unlisted.join(", ")} as Signature; data/signature.src.json does not list them`);
  for (const c of cards) c.signature = signatureBases.has(c.base);

  cards.sort((a, b) => (a.set + a.code).localeCompare(b.set + b.code));
  mkdirSync(DATA, { recursive: true });
  writeFileSync(
    join(DATA, "cards.json"),
    JSON.stringify({ source: API, resultsUpdatedAt: updatedAt, built: new Date().toISOString(), count: cards.length, cards }, null, 1),
  );
  writeFileSync(join(DATA, "legality.json"), JSON.stringify(legality, null, 1));

  const withEffect = cards.filter((c) => c.effect).length;
  const errataApplied = cards.filter((c) => c.errata).length;
  console.log(`held: ${all.length - items.length} printings of ${[...HELD_SETS].join(", ")} not built`);
  console.log(`cards: ${cards.length} (${new Set(cards.map((c) => c.base)).size} unique printings ignoring alt-art)`);
  console.log(`equipment effects: ${withEffect}; errata applied to ${errataApplied} printings; legality entries: ${legality.entries.length}`);
  console.log(`signature: ${signatureBases.size} base cards`);
}
