// The visual deckbuilder (#101). Two columns: the pool on the left, the list on the right.
//
// The arithmetic is in `src/builder.ts` and has tests; this file is the DOM around it. It owns a
// `Deck` and nothing else — every mutation writes the list straight back out as the same plaintext
// a player pastes, which is what `web/decks.ts` saves, exports and hands to Combos. Opening a saved
// list does NOT write back: `loadDeck` then `builderText` is stable in what it means but not
// character for character, and marking a deck dirty the moment it is opened would be a lie.
//
// CSP forbids inline `style=`, so the cost curve is an SVG coloured by attributes and everything
// else is a class.

import {
  addCard,
  autoRunes,
  builderText,
  canonicalizeDeck,
  capOf,
  copiesOf,
  costCurve,
  emptyDeck,
  filterPool,
  inIdentity,
  isEmptyDeck,
  otherBasesOf,
  removeCard,
  setChampion,
  zoneCounts,
  zoneRows,
  COST_BUCKETS,
  SETS,
  type PoolFilters,
  type PoolType,
  type PoolZone,
  type SortKey,
} from "../src/builder.js";
import { championTagOf, checkBuild, type BuildRule } from "../src/build.js";
import { loadDeck, type DeckEntry } from "../src/deck.js";
import { deckToText } from "../src/deck.js";
import { thumb } from "./graph.js";
import type { CardIndex } from "../src/cards.js";
import type { Card, Deck, Domain, Format } from "../src/types.js";

export interface BuilderEnv {
  cards(): CardIndex;
  format(): Format;
  /** The card modal the Combos view already owns. */
  showCard(base: string): void;
  /** The list changed. `text` is what the draft now holds; nothing is stored until Save. */
  onEdit(text: string): void;
  /** "Save" or "Update", so the bar under a phone says the same word as the button above it. */
  saveLabel(): string;
  /** Whether the draft differs from what is stored, so the bar's Save reads like the one above it. */
  dirty(): boolean;
  /** Say something in the editor's own message line. */
  say(message: string): void;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);

const DOMAINS: Domain[] = ["fury", "calm", "mind", "body", "chaos", "order"];
const ZONES: [PoolZone, string][] = [
  ["all", "All"], ["legend", "Legend"], ["champion", "Champion"],
  ["main", "Main"], ["battlefields", "Battlefields"], ["runes", "Runes"],
];
const TYPES: [PoolType, string][] = [["unit", "Unit"], ["spell", "Spell"], ["gear", "Gear"], ["equipment", "Equipment"]];
const SORTS: [SortKey, string][] = [["name", "Name"], ["cost", "Cost"], ["code", "Code"]];

/** How many cells the grid draws before it offers the rest. 1030 at once is a second of layout. */
const PAGE = 48;

let env: BuilderEnv;
let deck: Deck = emptyDeck();
let filters: PoolFilters = blankFilters();
let shown = PAGE;
/** Which column a phone is looking at. Ignored above 900px, where both are on screen. */
let tab: "pool" | "deck" = "pool";
let searchTimer: number | undefined;
/**
 * Whether the filters under the search box are unfolded. Open on a desktop, where they cost nothing;
 * folded on a phone, where six domain chips, six zones, three selects and eight cost chips are 500px
 * of controls above the first card. It is state rather than a media query because the block is
 * rebuilt on every click, and a `<details>` re-rendered with a fixed `open` would snap shut under a
 * player who had just opened it.
 */
let filtersOpen = true;

function blankFilters(): PoolFilters {
  return { search: "", domains: [], zone: "all", type: null, set: null, cost: null, sort: "name", legend: null };
}

const cards = () => env.cards();

// --- what the editor holds -------------------------------------------------------------

/** Load the list the editor opened on. Never writes back: see the note at the top of the file. */
export function openList(text: string): void {
  deck = text.trim() ? canonicalizeDeck(loadDeck(text, cards()), cards()) : emptyDeck();
  filters = blankFilters();
  filters.legend = deck.legend;
  if (deck.legend) filters.domains = [...cards().domainsOf(deck.legend)];
  shown = PAGE;
  tab = "pool";
  filtersOpen = window.innerWidth >= 900;
}

/** Every mutation goes through here, so the draft and the two columns never disagree. */
function edit(next: Deck): void {
  const hadLegend = deck.legend;
  deck = canonicalizeDeck(next, cards());
  // Picking a legend scopes the pool to its Domain Identity (103.1.b), which is the filter a player
  // would set by hand on the very next click. "All domains" is one press away.
  if (deck.legend && deck.legend !== hadLegend) {
    filters.legend = deck.legend;
    filters.domains = [...cards().domainsOf(deck.legend)];
    shown = PAGE;
  }
  if (!deck.legend) filters.legend = null;
  env.onEdit(builderText(deck, cards()));
  render();
}

// --- the markup ------------------------------------------------------------------------

/** The whole editor body. `actions` is the row `web/decks.ts` owns; it rides in the deck column. */
export function builderHtml(actions: string): string {
  return `<div class="builder" id="builder" data-tab="${tab}">
    <fieldset class="segmented small builder-tabs" aria-label="Editor column">
      ${(["pool", "deck"] as const).map((t) => `<label><input type="radio" name="bld-tab" value="${t}"${tab === t ? " checked" : ""}><span>${t === "pool" ? "Pool" : "Deck"}</span></label>`).join("")}
    </fieldset>
    <section class="bld-pool" aria-label="Card pool">${poolHtml()}</section>
    <section class="bld-deck" aria-label="Deck">
      <p class="bld-totals" id="bld-totals" aria-live="polite">${esc(totalsLine())}</p>
      <div id="deck-zones">${deckHtml()}</div>
      <div class="detail-acts" id="detail-acts">${actions}</div>
    </section>
    <div class="bld-bar">
      <p class="bld-bar-counts">${esc(shortTotals())}</p>
      <button type="button" class="primary" data-act="save"${env.dirty() ? "" : " disabled"}>${esc(env.saveLabel())}</button>
    </div>
    ${importDialog()}
  </div>`;
}

// --- the pool --------------------------------------------------------------------------

function poolHtml(): string {
  return `<div class="bld-filters">
      <input id="bld-search" class="bld-search" type="search" autocomplete="off" spellcheck="false"
        placeholder="Search a name or rules text" aria-label="Search the pool by name or rules text" value="${esc(filters.search)}">
      <details class="bld-more"${filtersOpen ? " open" : ""}>
      <summary class="bld-more-sum">Filters</summary>
      <div class="dom-chips" role="group" aria-label="Domains">
        ${DOMAINS.map((d) => {
          const name = d[0]!.toUpperCase() + d.slice(1);
          // Selected is FILLED, unselected is a ring: a chip must not say what it says with colour
          // alone. The six colours are Riot's and are reserved for domains, which is the one thing
          // they are used for here.
          return `<button type="button" class="dom-chip${filters.domains.includes(d) ? " on" : ""}" data-b="domain" data-domain="${d}" aria-pressed="${filters.domains.includes(d)}" title="${name}"><span class="sr-only">${name}</span></button>`;
        }).join("")}
        <button type="button" class="linklike bld-clear" data-b="all-domains"${filters.domains.length ? "" : " disabled"}>All domains</button>
      </div>
      <fieldset class="segmented small bld-zones" aria-label="Zone">
        ${ZONES.map(([z, label]) => `<label><input type="radio" name="bld-zone" value="${z}"${filters.zone === z ? " checked" : ""}><span>${label}</span></label>`).join("")}
      </fieldset>
      <div class="bld-selects">
        <label class="bld-select">Type <select data-b="type">
          <option value=""${filters.type ? "" : " selected"}>Any</option>
          ${TYPES.map(([t, label]) => `<option value="${t}"${filters.type === t ? " selected" : ""}>${label}</option>`).join("")}
        </select></label>
        <label class="bld-select">Set <select data-b="set">
          <option value=""${filters.set ? "" : " selected"}>Any</option>
          ${SETS.map((s) => `<option value="${s}"${filters.set === s ? " selected" : ""}>${s}</option>`).join("")}
        </select></label>
        <label class="bld-select">Sort <select data-b="sort">
          ${SORTS.map(([s, label]) => `<option value="${s}"${filters.sort === s ? " selected" : ""}>${label}</option>`).join("")}
        </select></label>
      </div>
      <div class="cost-chips" role="group" aria-label="Energy cost">
        <span class="cost-label">Cost</span>
        ${Array.from({ length: COST_BUCKETS }, (_, i) => {
          const on = filters.cost === i;
          const label = i === COST_BUCKETS - 1 ? `${i}+` : String(i);
          return `<button type="button" class="cost-chip${on ? " on" : ""}" data-b="cost" data-cost="${i}" aria-pressed="${on}">${label}</button>`;
        }).join("")}
      </div>
      </details>
    </div>
    <p class="pool-count" id="pool-count" aria-live="polite">${esc(countLine())}</p>
    <div class="pool-grid" id="pool-grid">${gridHtml()}</div>`;
}

/**
 * How many cards the filters left, in its own element OUTSIDE the grid. A live region has to survive
 * the update it is announcing: written inside `#pool-grid`, it was destroyed and rebuilt on every
 * click and announced nothing at all.
 */
function countLine(): string {
  const n = filterPool(cards(), filters).length;
  return `${n} card${n === 1 ? "" : "s"}${n > shown ? ` · showing ${shown}` : ""}`;
}

/** The cells themselves. Redrawn on its own after every click. */
function gridHtml(): string {
  const hits = filterPool(cards(), filters);
  const page = hits.slice(0, shown);
  const rest = hits.length - page.length;
  const note = filters.zone === "champion" && !deck.legend
    ? `<p class="pool-note">Name a legend first: a Chosen Champion has to carry its champion tag (103.2.a.2).</p>`
    : hits.length === 0
      ? `<p class="pool-note">Nothing in the pool matches those filters.</p>`
      : "";
  return `${note}
    <div class="pool-cells">${page.map(cellHtml).join("")}</div>
    ${rest > 0 ? `<button type="button" class="ghost pool-more" data-b="more">Show ${Math.min(rest, PAGE)} more</button>` : ""}`;
}

const identity = (): Domain[] => (deck.legend ? cards().domainsOf(deck.legend) : []);

function cellHtml(card: Card): string {
  const cap = capOf(deck, card.base, cards());
  const held = copiesOf(deck, card.base);
  const off = deck.legend !== null && !inIdentity(card, identity());
  const land = card.orientation === "landscape";
  const src = thumb(card.image, land ? 320 : 240);
  const legality = cards().legality(card.base, env.format());
  const stats = [
    card.energy !== null ? `${card.energy} Energy` : "",
    card.power ? `${card.power} Power` : "",
    card.might !== null ? `${card.might} Might` : "",
  ].filter(Boolean).join(", ");
  // Domain Identity is a mark, not a filter: hiding a card is hiding the answer, so an out-of-domain
  // card stays in the grid, dimmed, with the reason on the button that will not take it.
  const why = off ? `Outside ${identity().join(" + ")} — Domain Identity (103.1.b).` : cap.why;
  const blocked = off || cap.full;
  const setChamp = filters.zone === "champion";
  // #104: the cell is one NAME, and 101 of them reprint under a second (or third) base. The other
  // bases ride only in the accessible name and a title — there is nothing to click differently.
  const others = otherBasesOf(cards(), card.base);
  const also = others.length ? `, also printed as ${others.join(", ")}` : "";
  const label = `${card.name}${stats ? `, ${stats}` : ""}, ${held} in deck.${blocked ? ` ${why}` : setChamp ? " Make this the Chosen Champion." : " Add a copy."}${also}`;
  return `<div class="pool-cell${off ? " off" : ""}${land ? " land" : ""}"${others.length ? ` title="${esc(`Also printed as ${others.join(", ")}`)}"` : ""}>
    <button type="button" class="pool-add" data-b="${setChamp ? "champion" : "add"}" data-base="${esc(card.base)}"
      aria-disabled="${blocked}" aria-label="${esc(label)}">
      ${src ? `<img src="${esc(src)}" alt="" loading="lazy">` : `<span class="pool-noart">${esc(card.name)}</span>`}
      ${held ? `<span class="pool-n mono">${held}×</span>` : ""}
      ${blocked ? `<span class="pool-full">${esc(off ? "Off domain" : `${cap.held} of ${cap.max === Infinity ? "∞" : cap.max}`)}</span>` : ""}
    </button>
    <p class="pool-name"><span class="pool-name-txt">${esc(card.name)}</span>${card.signature ? `<span class="sig-tag" title="Signature card">S</span>` : ""}${legality ? `<span class="ban-tag${legality.status === "restricted" ? " restricted" : ""}">${legality.status}</span>` : ""}</p>
    <button type="button" class="linklike pool-view" data-b="view" data-base="${esc(card.base)}">View<span class="sr-only"> ${esc(card.name)}</span></button>
  </div>`;
}

// --- the list --------------------------------------------------------------------------

const TARGETS = { battlefields: 3, runes: 12, main: 40 } as const;

function totalsLine(): string {
  const n = zoneCounts(deck);
  return `Main ${n.main}/40 · Runes ${n.runes}/12 · Battlefields ${n.battlefields}/3`;
}

/** The same three counts for the fixed bar, where 390px does not hold the word "Battlefields". */
function shortTotals(): string {
  const n = zoneCounts(deck);
  return `Main ${n.main}/40 · Runes ${n.runes}/12 · BF ${n.battlefields}/3`;
}

function deckHtml(): string {
  return `${zoneHtml("legend", "Legend", 1)}
    ${championHtml()}
    ${zoneHtml("battlefields", "Battlefields", TARGETS.battlefields)}
    ${runesHtml()}
    ${mainHtml()}
    ${sideboardHtml()}
    ${checkHtml()}`;
}

/**
 * A sideboard the list arrived with. There is no zone to build one from — the pool adds to the Main
 * Deck, the rules count 40 there and nothing here — but a list that HAS one must show it: those
 * cards ride through every save, and a zone that is silently invisible is a zone that is silently
 * lost. Rows only, with the one control that cannot be wrong.
 */
function sideboardHtml(): string {
  const rows = zoneRows(deck, cards(), "sideboard");
  if (!rows.length) return "";
  const n = zoneCounts(deck).sideboard;
  return `<section class="dzone">
    <h3 class="dzone-head">Sideboard<span class="dzone-n mono">${n}</span></h3>
    ${rows.map((r) => `<div class="drow">
      <span class="drow-cost mono">${r.card.energy ?? ""}</span>
      <button type="button" class="drow-name" data-b="view" data-base="${esc(r.card.base)}">${esc(r.card.name)}</button>
      <span class="drow-n mono">${r.count}×</span>
    </div>`).join("")}
    <p class="dzone-empty">Came in with the list and is saved with it. Nothing in the pool adds here.</p>
  </section>`;
}

function zoneHtml(zone: "legend" | "battlefields", label: string, target: number): string {
  const rows = zoneRows(deck, cards(), zone);
  const held = zone === "legend" ? (deck.legend ? 1 : 0) : zoneCounts(deck).battlefields;
  return `<section class="dzone">
    <h3 class="dzone-head">${label}<span class="dzone-n mono">${held}/${target}</span></h3>
    ${rows.length ? rows.map((r) => rowHtml(r.card, r.count, zone)).join("") : `<p class="dzone-empty">${zone === "legend" ? "Pick one from the Legend zone of the pool." : "Three, each with a different name (103.4.c)."}</p>`}
  </section>`;
}

function championHtml(): string {
  const champ = deck.champion ? cards().get(deck.champion) : null;
  const tag = deck.legend ? championTagOf(deck.legend, cards()) : null;
  return `<section class="dzone">
    <h3 class="dzone-head">Champion<span class="dzone-n mono">${champ ? 1 : 0}/1</span></h3>
    ${champ
      ? `<div class="drow">
          <span class="drow-cost mono">${champ.energy ?? ""}</span>
          <button type="button" class="drow-name" data-b="view" data-base="${esc(champ.base)}">${esc(champ.name)}</button>
          <button type="button" class="linklike drow-drop" data-b="unchampion">Clear</button>
        </div>`
      : `<p class="dzone-empty">${tag ? `A unit tagged ${esc(tag)}, from the Champion zone of the pool.` : "Name a legend and its champions appear in the pool."}</p>`}
  </section>`;
}

function runesHtml(): string {
  const rows = zoneRows(deck, cards(), "runes");
  const n = zoneCounts(deck).runes;
  return `<section class="dzone">
    <h3 class="dzone-head">Runes<span class="dzone-n mono">${n}/${TARGETS.runes}</span>
      <button type="button" class="ghost tiny" data-b="auto-runes"${deck.legend ? "" : " disabled"}>Auto</button>
    </h3>
    ${rows.length ? rows.map((r) => rowHtml(r.card, r.count, "runes")).join("") : `<p class="dzone-empty">${deck.legend ? "Auto splits twelve across the legend's two domains." : "Auto needs a legend: the split follows its two domains (103.3.a.1)."}</p>`}
  </section>`;
}

function mainHtml(): string {
  const rows = zoneRows(deck, cards(), "main");
  const n = zoneCounts(deck).main;
  return `<section class="dzone">
    <h3 class="dzone-head">Main deck<span class="dzone-n mono">${n}/${TARGETS.main}</span></h3>
    ${curveHtml()}
    ${rows.length ? rows.map((r) => rowHtml(r.card, r.count, "main")).join("") : `<p class="dzone-empty">Forty cards, the Chosen Champion counted among them (Tournament Rules 402.1).</p>`}
  </section>`;
}

/**
 * The curve, drawn by hand: eight bars, no library. Heights are attributes because the CSP forbids
 * an inline style, and the whole thing carries one text alternative rather than eight.
 */
function curveHtml(): string {
  const bars = costCurve(deck, cards());
  const peak = Math.max(1, ...bars.map((b) => b.count));
  const W = 26, H = 40, GAP = 4;
  const rects = bars.map((b, i) => {
    const h = Math.round((b.count / peak) * (H - 12));
    const x = i * (W + GAP);
    return `<rect class="curve-bar" x="${x}" y="${H - 12 - h}" width="${W}" height="${Math.max(b.count ? 2 : 0, h)}" rx="2"></rect>
      <text class="curve-tick" x="${x + W / 2}" y="${H - 2}" text-anchor="middle">${b.label}</text>`;
  }).join("");
  const alt = bars.filter((b) => b.count).map((b) => `${b.count} at ${b.label}`).join(", ") || "no cards yet";
  return `<svg class="curve" viewBox="0 0 ${COST_BUCKETS * (W + GAP) - GAP} ${H}" role="img" aria-label="Energy curve: ${esc(alt)}">${rects}</svg>`;
}

function rowHtml(card: Card, count: number, zone: "legend" | "battlefields" | "runes" | "main"): string {
  const champ = deck.champion === card.base;
  const tag = deck.legend ? championTagOf(deck.legend, cards()) : null;
  const eligible = zone === "main" && !champ && !card.signature && card.type.includes("unit") && tag !== null && card.tags.includes(tag);
  const cap = capOf(deck, card.base, cards());
  return `<div class="drow${champ ? " champ" : ""}">
    <span class="drow-cost mono">${card.energy ?? ""}</span>
    <button type="button" class="drow-name" data-b="view" data-base="${esc(card.base)}">${esc(card.name)}</button>
    ${card.signature ? `<span class="sig-tag" title="Signature card">S</span>` : ""}
    ${champ ? `<span class="drow-tag">Champion</span>` : ""}
    ${eligible ? `<button type="button" class="linklike drow-champ" data-b="champion" data-base="${esc(card.base)}">Champion</button>` : ""}
    ${zone === "legend"
      ? `<button type="button" class="icon-btn tiny" data-b="minus" data-base="${esc(card.base)}" aria-label="Remove ${esc(card.name)} as the legend">−</button>`
      : `<span class="drow-n mono">${count}×</span>
         <button type="button" class="icon-btn tiny" data-b="minus" data-base="${esc(card.base)}" aria-label="One less ${esc(card.name)}">−</button>
         <button type="button" class="icon-btn tiny" data-b="add" data-base="${esc(card.base)}" aria-label="One more ${esc(card.name)}"${cap.full ? ` aria-disabled="true" title="${esc(cap.why)}"` : ""}>+</button>`}
  </div>`;
}

// --- Construction ----------------------------------------------------------------------

const MARK: Record<BuildRule["status"], string> = { pass: "✓", fail: "✗", unknown: "–" };
const WORD: Record<BuildRule["status"], string> = { pass: "ok", fail: "to fix", unknown: "unchecked" };

/** The count a row carries when the rule is a count. Presentation only: the figures are the zones'. */
function ruleCount(rule: BuildRule): string {
  const n = zoneCounts(deck);
  if (rule.rule.startsWith("103.2 ")) return `${n.main}/40`;
  if (rule.rule.startsWith("103.3.a")) return `${n.runes}/12`;
  if (rule.rule.startsWith("103.4.a")) return `${n.battlefields}/3`;
  if (rule.rule === "103.1") return `${n.legend}/1`;
  if (rule.rule === "103.2.a.2") return `${n.champion}/1`;
  if (rule.rule === "103.2.d") {
    const sig = Object.entries(deck.main).reduce((a, [base, c]) => a + (cards().get(base)?.signature ? c : 0), 0);
    return `${sig}/3`;
  }
  return "";
}

function checkHtml(): string {
  const format = env.format();
  const formatName = format === "2v2" ? "2v2" : "Constructed";
  // An untouched list breaks all nine rules and says nothing by saying it nine times. One sentence.
  if (isEmptyDeck(deck)) {
    return `<section class="bld-check">
      <h3 class="bld-check-head">Construction<span class="bld-check-fmt">${formatName}</span></h3>
      <p class="dzone-empty">A legal list needs a legend, a champion, 40 main-deck cards, 12 runes and 3 battlefields.</p>
    </section>`;
  }
  const report = checkBuild(deck, cards(), format);
  const broken = report.rules.filter((r) => r.status === "fail").length;
  const rows = report.rules.map((r) => {
    const count = ruleCount(r);
    return `<details class="chk-row ${r.status}">
      <summary>
        <span class="chk-mark" aria-hidden="true">${MARK[r.status]}</span>
        <span class="chk-label">${esc(r.label)}</span>
        <span class="sr-only">${WORD[r.status]}</span>
        ${count ? `<span class="chk-n mono">${count}</span>` : ""}
      </summary>
      <p class="chk-detail">${esc(r.detail)}</p>
      <p class="chk-rule mono">${esc(r.rule)}</p>
    </details>`;
  }).join("");
  return `<section class="bld-check">
    <h3 class="bld-check-head">Construction<span class="bld-check-fmt">${formatName}</span><span class="bld-check-n ${broken ? "bad" : "ok"}">${broken ? `${broken} to fix` : "Legal"}</span></h3>
    <div class="chk-rows">${rows}</div>
    <p class="fine">Every row cites the paragraph it stands on, in Riot's Core Rules of 2026-07-16 and the Tournament Rules of the same date. A row marked <strong>unchecked</strong> is a rule this site can state but cannot verify from Riot's card data.</p>
  </section>`;
}

// --- import ----------------------------------------------------------------------------

function importDialog(): string {
  return `<dialog class="bld-dialog" id="bld-import" aria-label="Import a list">
    <form method="dialog" class="bld-dialog-head">
      <h2 class="bld-dialog-title">Import</h2>
      <button type="submit" class="icon-btn" aria-label="Close">×</button>
    </form>
    <p class="fine">A written-out list, a deck code, a Tabletop Simulator dump, or a public Piltover Archive link. It replaces what is in the editor; nothing is written to your account until you press Save.</p>
    <textarea id="bld-import-text" rows="12" spellcheck="false" autocomplete="off"
      placeholder="Legend&#10;1 Lady of Luminosity - Starter&#10;&#10;Champion&#10;1 Lux, Illuminated&#10;&#10;Main Deck&#10;3 Forge of the Future&#10;…"></textarea>
    <p class="acct-msg" id="bld-import-msg"></p>
    <div class="detail-acts">
      <button type="button" class="primary" data-b="import-go">Load into the editor</button>
      <button type="button" class="linklike" data-b="import-close">Cancel</button>
    </div>
  </dialog>`;
}

export function openImport(): void {
  const dialog = $<HTMLDialogElement>("#bld-import");
  if (!dialog) return;
  const msg = $<HTMLElement>("#bld-import-msg");
  if (msg) msg.textContent = "";
  dialog.showModal();
  $<HTMLTextAreaElement>("#bld-import-text")?.focus();
}

const isUrl = (s: string) => /^https?:\/\//i.test(s);

async function runImport(): Promise<void> {
  const box = $<HTMLTextAreaElement>("#bld-import-text");
  const msg = $<HTMLElement>("#bld-import-msg");
  const raw = box?.value.trim() ?? "";
  if (!raw) { if (msg) msg.textContent = "Paste a list, a deck code or a link first."; return; }
  let next: Deck;
  if (isUrl(raw)) {
    if (msg) msg.textContent = "Reading that deck…";
    const res = await fetch(`/api/deck-url?url=${encodeURIComponent(raw)}`);
    const payload = (await res.json().catch(() => ({}))) as { entries?: DeckEntry[]; error?: string };
    if (!res.ok || !payload.entries) { if (msg) msg.textContent = payload.error ?? "Could not read that deck."; return; }
    next = loadDeck(deckToText(payload.entries, cards()), cards());
  } else {
    next = loadDeck(raw, cards());
  }
  if (isEmptyDeck(next)) { if (msg) msg.textContent = "Nothing in that paste was recognised as a card."; return; }
  $<HTMLDialogElement>("#bld-import")?.close();
  const lost = next.unresolved.length;
  edit(next);
  env.say(lost ? `Imported. ${lost} line${lost === 1 ? "" : "s"} were not recognised and were kept as written.` : "Imported into the editor. Press Save to keep it.");
}

// --- redraw ----------------------------------------------------------------------------

/**
 * Redraw the two columns WITHOUT touching the search box: replacing the element somebody is typing
 * into loses the caret and any composition in flight, which is the same reason the old textarea was
 * never re-rendered either.
 */
function render(): void {
  // A click destroys the button it came from, and the focus with it. Remembered by what the control
  // IS rather than by index, so the same cell keeps the focus even when the grid reflows around it.
  const active = document.activeElement as HTMLElement | null;
  const was = active?.dataset["b"] ? `[data-b="${active.dataset["b"]}"][data-base="${active.dataset["base"] ?? ""}"]` : null;

  const grid = $<HTMLElement>("#pool-grid");
  if (grid) grid.innerHTML = gridHtml();
  const count = $<HTMLElement>("#pool-count");
  if (count) count.textContent = countLine();
  const zones = $<HTMLElement>("#deck-zones");
  if (zones) zones.innerHTML = deckHtml();
  const totals = $<HTMLElement>("#bld-totals");
  if (totals) totals.textContent = totalsLine();
  const bar = document.querySelector<HTMLElement>(".bld-bar-counts");
  if (bar) bar.textContent = shortTotals();
  const save = document.querySelector<HTMLButtonElement>(".bld-bar [data-act='save']");
  if (save) { save.disabled = !env.dirty(); save.textContent = env.saveLabel(); }
  markFilters();

  if (was) $<HTMLElement>(was)?.focus();
}

/** Filter state that lives on elements the grid does not redraw. */
function markFilters(): void {
  for (const chip of document.querySelectorAll<HTMLElement>(".dom-chip")) {
    const on = filters.domains.includes(chip.dataset["domain"] as Domain);
    chip.classList.toggle("on", on);
    chip.setAttribute("aria-pressed", String(on));
  }
  for (const chip of document.querySelectorAll<HTMLElement>(".cost-chip")) {
    const on = filters.cost === Number(chip.dataset["cost"]);
    chip.classList.toggle("on", on);
    chip.setAttribute("aria-pressed", String(on));
  }
  const clear = document.querySelector<HTMLButtonElement>(".bld-clear");
  if (clear) clear.disabled = filters.domains.length === 0;
}

/** Only the pool: a filter changed, the list did not. */
function renderPool(): void {
  shown = PAGE;
  const grid = $<HTMLElement>("#pool-grid");
  if (grid) grid.innerHTML = gridHtml();
  const count = $<HTMLElement>("#pool-count");
  if (count) count.textContent = countLine();
  markFilters();
}

// --- events ----------------------------------------------------------------------------

/**
 * One set of delegated listeners on the host `web/decks.ts` owns. Every control here carries
 * `data-b`, and every control that file owns carries `data-act`, so the two never collide.
 */
export function initBuilder(host: HTMLElement, e: BuilderEnv): void {
  env = e;
  host.addEventListener("click", onClick);
  host.addEventListener("input", onInput);
  host.addEventListener("change", onChange);
  host.addEventListener("keydown", onKeydown);
  // `toggle` does not bubble in the DOM sense, but it is captured here so the fold survives a redraw.
  host.addEventListener("toggle", (ev) => {
    const el = ev.target as HTMLElement;
    if (el.classList.contains("bld-more")) filtersOpen = (el as HTMLDetailsElement).open;
  }, true);
}

function onClick(ev: Event): void {
  const el = (ev.target as Element).closest<HTMLElement>("[data-b]");
  if (!el) return;
  const base = el.dataset["base"] ?? "";
  switch (el.dataset["b"]) {
    case "view": ev.preventDefault(); env.showCard(base); return;
    case "add":
      ev.preventDefault();
      if (el.getAttribute("aria-disabled") === "true") return;
      edit(addCard(deck, base, cards()));
      return;
    case "minus": ev.preventDefault(); edit(removeCard(deck, base, cards())); return;
    case "champion":
      ev.preventDefault();
      if (el.getAttribute("aria-disabled") === "true") return;
      edit(setChampion(deck, base, cards()));
      return;
    case "unchampion": ev.preventDefault(); edit(setChampion(deck, null, cards())); return;
    case "auto-runes": ev.preventDefault(); edit(autoRunes(deck, cards())); return;
    case "domain": {
      ev.preventDefault();
      const d = el.dataset["domain"] as Domain;
      filters.domains = filters.domains.includes(d) ? filters.domains.filter((x) => x !== d) : [...filters.domains, d];
      renderPool();
      return;
    }
    case "all-domains": ev.preventDefault(); filters.domains = []; renderPool(); return;
    case "cost": {
      ev.preventDefault();
      const c = Number(el.dataset["cost"]);
      filters.cost = filters.cost === c ? null : c;
      renderPool();
      return;
    }
    case "more": {
      ev.preventDefault();
      shown += PAGE;
      const grid = $<HTMLElement>("#pool-grid");
      if (grid) grid.innerHTML = gridHtml();
      const count = $<HTMLElement>("#pool-count");
      if (count) count.textContent = countLine();
      // The button that was pressed is gone; the first newly drawn cell is where a keyboard was going.
      [...document.querySelectorAll<HTMLElement>(".pool-add")][shown - PAGE]?.focus();
      return;
    }
    case "import-go": ev.preventDefault(); void runImport(); return;
    case "import-close": ev.preventDefault(); $<HTMLDialogElement>("#bld-import")?.close(); return;
  }
}

function onInput(ev: Event): void {
  const t = ev.target as HTMLElement;
  if (t.id !== "bld-search") return;
  // 150ms, so a search over 1030 cards' rules text does not run on every keystroke.
  window.clearTimeout(searchTimer);
  const value = (t as HTMLInputElement).value;
  searchTimer = window.setTimeout(() => { filters.search = value; renderPool(); }, 150);
}

function onChange(ev: Event): void {
  const t = ev.target as HTMLInputElement | HTMLSelectElement;
  if (t.name === "bld-zone") { filters.zone = t.value as PoolZone; renderPool(); return; }
  if (t.name === "bld-tab") {
    tab = t.value as "pool" | "deck";
    document.querySelector<HTMLElement>("#builder")?.setAttribute("data-tab", tab);
    return;
  }
  const kind = (t as HTMLElement).dataset["b"];
  if (kind === "type") { filters.type = (t.value || null) as PoolType | null; renderPool(); }
  if (kind === "set") { filters.set = t.value || null; renderPool(); }
  if (kind === "sort") { filters.sort = t.value as SortKey; renderPool(); }
}

/**
 * The grid is a grid, so the arrow keys walk it. Without this the only way past a cell is Tab, and
 * a pool of 1030 cards is 1030 tab stops between the filters and the deck column.
 */
function onKeydown(ev: KeyboardEvent): void {
  if (!ev.key.startsWith("Arrow")) return;
  const here = (ev.target as Element).closest<HTMLElement>(".pool-add");
  if (!here) return;
  const cells = [...document.querySelectorAll<HTMLElement>(".pool-add")];
  const i = cells.indexOf(here);
  if (i < 0) return;
  const top = cells[0]!.getBoundingClientRect().top;
  const cols = Math.max(1, cells.findIndex((c) => c.getBoundingClientRect().top > top + 1));
  const step = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : ev.key === "ArrowDown" ? cols : -cols;
  const next = cells[i + step];
  if (!next) return;
  ev.preventDefault();
  next.focus();
}

/** Redraw both columns from the outside — the format toggle changes the ban marks and Construction. */
export const refreshBuilder = (): void => render();
