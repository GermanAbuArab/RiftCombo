import combosJson from "../data/combos.json" with { type: "json" };
import featuresJson from "../data/features.json" with { type: "json" };
import legalityJson from "../data/legality.json" with { type: "json" };
import { CardIndex } from "../src/cards.js";
import { generateVariants } from "../src/combos.js";
import { isDeckCode, loadDeck, normalizeDeck, type DeckEntry } from "../src/deck.js";
import { matchDeck, type Hit, type MatchResult } from "../src/matcher.js";
import type { Card, Combo, Deck, Feature, Format, LegalityEntry, Variant } from "../src/types.js";
import { renderGraph, type GraphView } from "./graph.js";

const combos = (combosJson as { combos: Combo[] }).combos;
const features = (featuresJson as { features: Feature[] }).features;
const legality = (legalityJson as { entries: LegalityEntry[] }).entries;
const combosById = new Map(combos.map((c) => [c.id, c]));
const featuresById = new Map(features.map((f) => [f.id, f]));

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const form = $<HTMLFormElement>("#deck-form");
const input = $<HTMLTextAreaElement>("#deck-input");
const status = $<HTMLElement>("#status");
const summary = $<HTMLElement>("#summary");
const results = $<HTMLElement>("#results");
const graphHost = $<HTMLElement>("#graph-host");
const empty = $<HTMLElement>("#empty");
const detail = $<HTMLElement>("#detail");
const submit = $<HTMLButtonElement>("#deck-form button[type=submit]");

const EXAMPLE = `Legend
1 Lady of Luminosity - Starter

Champion
1 Lux, Illuminated

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Runes
6 Mind Rune
6 Order Rune

Main Deck
3 Watchful Sentry
3 Lecturing Yordle
3 Progress Day
3 Retreat
3 Forge of the Future
3 Sacrifice
3 Soaring Scout
3 Shadow's Call
3 Ekko - Recurrent
2 Sumpworks Map
1 Promising Future
1 The Ruination
2 Ashe, Focused
2 Renata Glasc, Mastermind
2 Fiora, Worthy
2 Rally the Troops`;

let cards: CardIndex;
let variants: Variant[];
let view: GraphView | null = null;
let lastHits: Hit[] = [];
let lastDeck: Deck | null = null;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const setStatus = (msg: string, error = false) => { status.textContent = msg; status.classList.toggle("error", error); };
const name = (base: string) => cards.get(base)?.name ?? base;
const fmt = () => (form.querySelector<HTMLInputElement>("input[name=format]:checked")!.value as Format);
const maxMissing = () => Number($<HTMLSelectElement>("#max-missing").value);
const own = (deck: Deck, base: string) => {
  let n = 0;
  for (const eq of cards.equivalents(base)) n += (deck.main[eq] ?? 0) + (deck.battlefields[eq] ?? 0) + (deck.legend === eq ? 1 : 0);
  return n;
};

async function boot() {
  setStatus("loading cards…");
  const res = await fetch("/data/cards.json");
  const data = (await res.json()) as { cards: Card[]; resultsUpdatedAt: string; built: string };
  cards = new CardIndex(data.cards, legality);
  variants = generateVariants(combos, cards);
  const verified = combos.filter((c) => c.status === "verified").length;
  $<HTMLElement>("#data-note").insertAdjacentHTML(
    "beforeend",
    ` Card data as of ${esc(data.resultsUpdatedAt.slice(0, 10))}; ${cards.cards.length} printings, ${combos.length} combos (${verified} verified).`,
  );
  setStatus("");
  const hash = decodeURIComponent(location.hash.replace(/^#deck=/, ""));
  if (location.hash.startsWith("#deck=") && hash) { input.value = hash; void run(); }
}

async function resolveInput(text: string): Promise<Deck> {
  const trimmed = text.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    const res = await fetch(`/api/deck-url?url=${encodeURIComponent(trimmed)}`);
    if (!res.ok) throw new Error((await res.json().catch(() => ({ error: res.statusText }))).error ?? "could not fetch that deck");
    const payload = (await res.json()) as { entries: DeckEntry[] };
    return normalizeDeck(payload.entries, cards);
  }
  return loadDeck(trimmed, cards);
}

async function run() {
  if (!cards) return;
  const text = input.value;
  if (!text.trim()) { setStatus("paste a decklist first", true); return; }
  submit.disabled = true;
  setStatus("matching…");
  try {
    const deck = await resolveInput(text);
    const result = matchDeck(deck, variants, cards, { format: fmt(), maxMissing: maxMissing() });
    lastDeck = deck;
    render(deck, result);
    location.hash = isDeckCode(text.trim()) ? `deck=${encodeURIComponent(text.trim())}` : "";
    const total = Object.values(result).reduce((n, b) => n + b.length, 0);
    setStatus(total ? `${total} result${total === 1 ? "" : "s"}` : "no known combos within reach");
  } catch (err) {
    setStatus((err as Error).message, true);
  } finally {
    submit.disabled = false;
  }
}

const BUCKETS: [keyof MatchResult, string][] = [
  ["included", "Included"],
  ["includedByChangingLegend", "Included by changing legend"],
  ["almostIncluded", "Almost included"],
  ["almostIncludedByAddingDomains", "Almost included by adding a domain"],
  ["almostIncludedByChangingLegend", "Almost included by changing legend"],
  ["almostIncludedByAddingDomainsAndChangingLegend", "Almost included by adding a domain and changing legend"],
];

function render(deck: Deck, result: MatchResult) {
  const total = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);
  summary.hidden = false;
  summary.innerHTML = `
    <div><dt>Legend</dt><dd>${deck.legend ? `${esc(name(deck.legend))} <span class="sub">${cards.domainsOf(deck.legend).join(" / ")}</span>` : "none"}</dd></div>
    <div><dt>Main deck</dt><dd>${total(deck.main)} cards</dd></div>
    <div><dt>Battlefields</dt><dd>${total(deck.battlefields)}</dd></div>
    <div><dt>Runes</dt><dd>${total(deck.runes)}</dd></div>
    ${deck.unresolved.length ? `<div class="wide"><dt>Not recognised</dt><dd class="warn">${deck.unresolved.map((u) => `${u.count}× ${esc(u.raw)}`).join(", ")}</dd></div>` : ""}`;

  lastHits = BUCKETS.flatMap(([k]) => result[k]);
  results.innerHTML = "";
  if (lastHits.length === 0) {
    results.innerHTML = `<p class="nothing">No known combo is within ${maxMissing()} card${maxMissing() === 1 ? "" : "s"} of this list. The database is small and hand-verified; that is a statement about the database as much as about the deck.</p>`;
  }
  for (const [key, label] of BUCKETS) {
    const hits = result[key];
    if (!hits.length) continue;
    const sec = document.createElement("section");
    sec.innerHTML = `<h2 class="bucket-title"><span>${label}</span><span class="count">${hits.length}</span></h2>`;
    for (const hit of hits) sec.append(hitCard(hit, deck));
    results.append(sec);
  }

  empty.hidden = true;
  detail.hidden = true;
  view = renderGraph(graphHost, lastHits, {
    combos: combosById,
    features: featuresById,
    cardName: name,
    owned: (base) => own(deck, base),
    illegal: (base) => !!cards.legality(base, fmt()),
    onSelectCombo: showDetail,
  });
}

function hitCard(hit: Hit, deck: Deck): HTMLElement {
  const v = hit.variant;
  const primary = combosById.get(v.comboIds[0]!)!;
  const el = document.createElement("article");
  el.className = "hit";
  el.dataset.combo = primary.id;
  const tags = [
    `<span class="tag class">${esc(v.class.replace("_", " "))}</span>`,
    v.status !== "verified" ? `<span class="tag candidate">${esc(v.status)}</span>` : "",
    ...hit.illegal.map((e) => `<span class="tag illegal">${esc(e.name)} ${e.status}</span>`),
    v.comboIds.length > 1 ? `<span class="tag">${v.comboIds.length} combos chained</span>` : "",
  ].join("");
  const chips = Object.entries(v.cards).map(([base, need]) => {
    const have = own(deck, base);
    const missing = have < need;
    const off = hit.offDomain.includes(base);
    return `<span class="chip${missing ? " missing" : ""}${off ? " off" : ""}"><span class="qty">${Math.min(have, need)}/${need}</span>${esc(name(base))}</span>`;
  }).join("");
  const notes: string[] = [];
  if (hit.missing.length) notes.push(`Missing ${hit.missing.map((m) => `${m.quantity}× ${esc(name(m.card))}`).join(", ")}.`);
  if (hit.offDomain.length) notes.push(`${hit.offDomain.map((b) => esc(name(b))).join(", ")} ${hit.offDomain.length === 1 ? "is" : "are"} outside this legend's domains.`);
  el.innerHTML = `
    <h3 class="hit-name">${esc(v.comboIds.map((id) => combosById.get(id)!.name).join(" → "))}</h3>
    <div class="tags">${tags}</div>
    <div class="chips">${chips}</div>
    ${notes.length ? `<p class="hit-note">${notes.join(" ")}</p>` : ""}
    ${hit.illegal.length ? `<p class="hit-note illegal">Not legal in ${esc(fmt())}: ${hit.illegal.map((e) => `${esc(e.name)} ${e.status} since ${e.since}`).join("; ")}.</p>` : ""}`;
  el.addEventListener("click", () => { view?.select(primary.id); showDetail(primary.id); });
  return el;
}

function showDetail(id: string | null) {
  for (const a of results.querySelectorAll<HTMLElement>(".hit")) a.classList.toggle("active", a.dataset.combo === id);
  if (!id) { detail.hidden = true; return; }
  const c = combosById.get(id)!;
  const deck = lastDeck!;
  const cardRows = c.uses.map((u) => {
    const card = cards.get(u.card)!;
    const have = own(deck, u.card);
    return `<div class="card-row">
      <div><div class="card-name">${esc(card.name)}</div><div class="card-code">${esc(card.code)} · ${esc(card.type.join("/"))}${card.domains.length ? " · " + esc(card.domains.join("/")) : ""} · have ${have}/${u.quantity}</div></div>
      <div class="card-code">${esc(u.role)}</div>
      <div class="card-text">${esc(card.text ?? "")}${card.effect ? `\n<span class="effect">Effect: ${esc(card.effect)}</span>` : ""}</div>
    </div>`;
  }).join("");
  detail.hidden = false;
  detail.innerHTML = `
    <div class="detail-head">
      <div>
        <h2>${esc(c.name)}</h2>
        <div class="tags"><span class="tag class">${esc(c.class.replace("_", " "))}</span>${c.status !== "verified" ? `<span class="tag candidate">${esc(c.status)}</span>` : ""}</div>
      </div>
      <button type="button" class="close" aria-label="Close details">×</button>
    </div>
    <h3>Result</h3><p>${esc(c.terminatesIn)}</p>
    ${c.netPerIteration ? `<h3>Per iteration</h3><p class="net">${esc(c.netPerIteration)}</p>` : ""}
    ${c.needs.length ? `<h3>Needs first</h3><p>${c.needs.map((n) => esc(featuresById.get(n)?.name ?? n)).join(", ")}</p>` : ""}
    <h3>Steps</h3><ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    ${c.prerequisites.notable.length ? `<h3>Before you start</h3><ul>${c.prerequisites.notable.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
    ${c.prerequisites.easy.length ? `<h3>Deck requirements</h3><ul>${c.prerequisites.easy.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
    <h3>Cards</h3>${cardRows}
    <h3>Sources</h3><ul class="sources">${c.sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" rel="noopener">${esc(s.title)}</a>` : esc(s.title)}${s.date ? ` <span class="card-code">${esc(s.date)}</span>` : ""}</li>`).join("")}</ul>
    ${c.notes ? `<h3>Notes</h3><p>${esc(c.notes)}</p>` : ""}
    <p class="rules-version">Walked against Core Rules ${esc(c.rulesVersion)}</p>`;
  detail.querySelector(".close")!.addEventListener("click", () => { view?.select(null); showDetail(null); });
}

form.addEventListener("submit", (ev) => { ev.preventDefault(); void run(); });
$<HTMLButtonElement>("#load-example").addEventListener("click", () => { input.value = EXAMPLE; void run(); });
$<HTMLButtonElement>("#fit").addEventListener("click", () => view?.fit());
form.querySelectorAll("input[name=format]").forEach((r) => r.addEventListener("change", () => { if (lastDeck) void run(); }));
$<HTMLSelectElement>("#max-missing").addEventListener("change", () => { if (lastDeck) void run(); });
let resizeTimer = 0;
window.addEventListener("resize", () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(() => { if (lastHits.length) render(lastDeck!, matchDeck(lastDeck!, variants, cards, { format: fmt(), maxMissing: maxMissing() })); }, 150); });

void boot();
