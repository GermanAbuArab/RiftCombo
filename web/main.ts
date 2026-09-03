import combosJson from "../data/combos.json" with { type: "json" };
import featuresJson from "../data/features.json" with { type: "json" };
import legalityJson from "../data/legality.json" with { type: "json" };
import { CardIndex } from "../src/cards.js";
import { generateVariants } from "../src/combos.js";
import { isDeckCode, loadDeck, normalizeDeck, parseDeckText, type DeckEntry } from "../src/deck.js";
import { matchDeck, type Hit, type MatchResult } from "../src/matcher.js";
import type { Card, Combo, Deck, Feature, Format, LegalityEntry, Variant } from "../src/types.js";
import { OUTCOME_PALETTE, renderGraph, thumb, type GraphView, type Layout } from "./graph.js";

const combos = (combosJson as { combos: Combo[] }).combos;
const features = (featuresJson as { features: Feature[] }).features;
const legality = (legalityJson as { entries: LegalityEntry[] }).entries;
const combosById = new Map(combos.map((c) => [c.id, c]));
const featuresById = new Map(features.map((f) => [f.id, f]));

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const shell = $<HTMLElement>("#shell");
const form = $<HTMLFormElement>("#deck-form");
const input = $<HTMLTextAreaElement>("#deck-input");
const urlInput = $<HTMLInputElement>("#deck-url");
const analyze = $<HTMLButtonElement>("#analyze");
const statusCard = $<HTMLElement>("#status-card");
const graphHost = $<HTMLElement>("#graph-host");
const empty = $<HTMLElement>("#empty");
const detail = $<HTMLElement>("#detail");
const tray = $<HTMLElement>("#tray");
const routeCount = $<HTMLElement>("#route-count");
const zoomLabel = $<HTMLElement>("#zoom-label");
const dimToggle = $<HTMLButtonElement>("#dim-toggle");

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
let deck: Deck | null = null;
let result: MatchResult | null = null;
let selected: string | null = null;
let dim = true;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const name = (base: string) => cards.get(base)?.name ?? base;
const fmt = () => document.querySelector<HTMLInputElement>("input[name=format]:checked")!.value as Format;
const mode = () => document.querySelector<HTMLInputElement>("input[name=view]:checked")!.value as "network" | "suggestions";
const layout = () => document.querySelector<HTMLInputElement>("input[name=layout]:checked")!.value as Layout;
const maxMissing = () => Number($<HTMLSelectElement>("#max-missing").value);
const own = (base: string) => {
  if (!deck) return 0;
  let n = 0;
  for (const eq of cards.equivalents(base)) n += (deck.main[eq] ?? 0) + (deck.battlefields[eq] ?? 0) + (deck.legend === eq ? 1 : 0);
  return n;
};
const setStatus = (title: string, body: string, kind: "" | "ok" | "error" = "") => {
  $<HTMLElement>("#status-title").textContent = title;
  $<HTMLElement>("#status-body").textContent = body;
  statusCard.classList.remove("ok", "error");
  if (kind) statusCard.classList.add(kind);
};

async function boot() {
  setStatus("Loading", "Fetching the card index…");
  const res = await fetch("/data/cards.json");
  const data = (await res.json()) as { cards: Card[]; resultsUpdatedAt: string };
  cards = new CardIndex(data.cards, legality);
  variants = generateVariants(combos, cards);
  const verified = combos.filter((c) => c.status === "verified").length;
  $<HTMLElement>("#data-note").insertAdjacentHTML("beforeend", ` Card data as of ${esc(data.resultsUpdatedAt.slice(0, 10))}: ${cards.cards.length} printings, ${combos.length} combos (${verified} verified).`);
  setStatus("Ready", "Paste a deck list to begin.");
  const hash = decodeURIComponent(location.hash.replace(/^#deck=/, ""));
  if (location.hash.startsWith("#deck=") && hash) { input.value = hash; void run(); }
}

async function fromUrl(url: string): Promise<Deck> {
  const res = await fetch(`/api/deck-url?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "could not fetch that deck");
  const payload = (await res.json()) as { entries: DeckEntry[]; title?: string };
  const d = normalizeDeck(payload.entries, cards);
  if (payload.title) urlInput.dataset.title = payload.title;
  return d;
}

async function run(source: "text" | "url" = "text") {
  if (!cards) return;
  const text = input.value.trim();
  const url = urlInput.value.trim();
  if (source === "url" && !url) { setStatus("No link", "Paste a Piltover Archive deck link first.", "error"); return; }
  if (source === "text" && !text) { setStatus("No deck", "Paste a deck list or deck code first.", "error"); return; }
  analyze.disabled = true;
  setStatus("Matching", "Reading the list and checking known combos…");
  try {
    deck = source === "url" ? await fromUrl(url) : /^https?:\/\//i.test(text) ? await fromUrl(text) : loadDeck(text, cards);
    result = matchDeck(deck, variants, cards, { format: fmt(), maxMissing: maxMissing() });
    selected = null;
    // The deck panel stays open after analysing. Collapsing it here used to hide the list the
    // user just pasted, and it widened the stage enough to make the diagram fit at ~54%.
    render();
    if (source === "text") location.hash = isDeckCode(text) ? `deck=${encodeURIComponent(text)}` : "";
    const included = result.included.length;
    const near = Object.values(result).reduce((n, b) => n + b.length, 0) - included;
    const total = Object.values(deck.main).reduce((a, b) => a + b, 0);
    setStatus(
      included ? `${included} combo${included === 1 ? "" : "s"} found` : "No complete combos",
      `${total} cards${deck.legend ? ` · ${name(deck.legend).replace(/ - Starter$/, "")}` : ""}${near ? ` · ${near} near miss${near === 1 ? "" : "es"}` : ""}${deck.unresolved.length ? ` · ${deck.unresolved.length} line${deck.unresolved.length === 1 ? "" : "s"} not recognised` : ""}`,
      included || near ? "ok" : "",
    );
  } catch (err) {
    setStatus("Could not read that", (err as Error).message, "error");
  } finally {
    analyze.disabled = false;
  }
}

const shownHits = (): Hit[] => {
  if (!result) return [];
  if (mode() === "network") return result.included;
  return [
    ...result.includedByChangingLegend, ...result.almostIncluded, ...result.almostIncludedByAddingDomains,
    ...result.almostIncludedByChangingLegend, ...result.almostIncludedByAddingDomainsAndChangingLegend,
  ];
};

/**
 * How many known combos are even legal under this deck's legend. Domain Identity (103.1.b) means
 * every card in a combo must sit inside the legend's two domains, so this is the honest ceiling on
 * what the deck could ever match.
 */
const playableUnderLegend = (): number | null => {
  if (!deck?.legend) return null;
  const dom = new Set(cards.domainsOf(deck.legend));
  return combos.filter((c) => c.uses.every((u) => cards.domainsOf(u.card).every((d) => dom.has(d)))).length;
};

/**
 * An empty result is almost always thin coverage, not a verdict on the deck — say so. Blaming the
 * list ("no combos in this list") reads as "your deck is bad" when the truth is "we have not
 * catalogued your archetype yet".
 */
function showEmptyState() {
  const title = $<HTMLElement>("#empty .empty-title");
  const body = $<HTMLElement>("#empty .empty-body");
  const note = $<HTMLElement>("#empty-note");
  const legend = deck?.legend ? name(deck.legend).replace(/ - Starter$/, "") : null;
  const legalHere = playableUnderLegend();
  const verified = combos.filter((c) => c.status === "verified").length;

  if (mode() !== "network") {
    title.textContent = "Nothing within reach";
    body.textContent = `No known combo is within ${maxMissing()} card${maxMissing() === 1 ? "" : "s"} of this list. Raising that distance in the panel will widen the search.`;
  } else if (legalHere === 0 && legend) {
    title.textContent = "No catalogued combos for this legend yet";
    body.innerHTML = `Not one of the ${combos.length} combos RiftCombo knows is even legal under <strong>${esc(legend)}</strong>'s two domains, so there is nothing here to match against. This is a gap in our catalogue, not a judgement on your deck.`;
  } else {
    title.textContent = "No complete combo in this list";
    body.innerHTML = legend
      ? `RiftCombo knows ${combos.length} combos (${verified} walked by hand), of which <strong>${legalHere}</strong> are legal under ${esc(legend)}'s domains — and this list has all the pieces for none of them. Try <strong>Near misses</strong> to see what it is short of.`
      : `RiftCombo knows ${combos.length} combos and this list has all the pieces for none of them. Try <strong>Near misses</strong> to see what it is short of.`;
  }
  note.hidden = false;
  note.textContent = "The catalogue is hand-built and still small, so an empty result usually means the archetype has not been swept yet rather than that no combo exists.";
}

function render() {
  if (!deck || !result) return;
  const hits = shownHits();
  routeCount.textContent = String(hits.length);
  empty.hidden = hits.length > 0;
  const legalHere = playableUnderLegend();
  $<HTMLElement>("#ws-sub").textContent = legalHere === null
    ? `${combos.length} combos catalogued`
    : `${legalHere} of ${combos.length} catalogued combos are legal in this legend's domains`;
  if (hits.length === 0) {
    view?.destroy(); view = null;
    showEmptyState();
  } else {
    view = renderGraph(graphHost, hits, layout(), {
      combos: combosById, features: featuresById,
      card: (b) => cards.get(b), owned: own, illegal: (b) => !!cards.legality(b, fmt()), legend: deck.legend,
      onSelect: (id) => { selected = id; showDetail(id); markChips(); },
      onZoom: (p) => { zoomLabel.textContent = `${p}%`; },
    }, dim);
    if (selected) view.select(selected);
  }
  renderTray(hits);
  showDetail(selected);
}

const outcomeColors = (hits: Hit[]) => {
  const ids = [...new Set(hits.flatMap((h) => h.variant.comboIds).flatMap((id) => combosById.get(id)?.produces ?? []))].filter((f) => featuresById.get(f)?.status === "STANDALONE");
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, ALT_WIN: 2, ENGINE: 3 };
  const sortedCombos = [...new Set(hits.flatMap((h) => h.variant.comboIds))].map((id) => combosById.get(id)!).filter(Boolean)
    .sort((a, b) => Number(b.status === "verified") - Number(a.status === "verified") || order[a.class]! - order[b.class]! || a.name.localeCompare(b.name));
  const inOrder = [...new Set(sortedCombos.flatMap((c) => c.produces))].filter((f) => ids.includes(f));
  return new Map(inOrder.map((f, i) => [f, OUTCOME_PALETTE[i % OUTCOME_PALETTE.length]!]));
};

function renderTray(hits: Hit[]) {
  tray.innerHTML = "";
  if (!hits.length) { tray.innerHTML = `<p class="tray-empty">${mode() === "network" ? "No complete combos to show." : "No near misses to show."}</p>`; return; }
  const colors = outcomeColors(hits);
  for (const hit of hits) {
    const v = hit.variant;
    const primary = combosById.get(v.comboIds[0]!)!;
    const outcome = v.produces.map((f) => featuresById.get(f)).find((f) => f?.status === "STANDALONE");
    const color = outcome ? colors.get(outcome.id) ?? "#8b93a4" : "#8b93a4";
    const cardsN = Object.values(v.cards).reduce((a, b) => a + b, 0);
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.combo = primary.id;
    const meta = hit.illegal.length
      ? `<span class="chip-meta illegal">${esc(hit.illegal.map((e) => `${e.name} ${e.status} in ${fmt()}`).join(" · "))}</span>`
      : hit.missing.length
        ? `<span class="chip-meta">MISSING ${esc(hit.missing.map((m) => `${m.quantity}× ${name(m.card)}`).join(", "))}</span>`
        : `<span class="chip-meta">${esc(v.class.replace("_", " "))}${v.status === "verified" ? " · VERIFIED" : " · " + v.status.toUpperCase()}</span>`;
    b.innerHTML = `
      <div class="chip-head"><span class="chip-title">${esc(v.comboIds.map((id) => combosById.get(id)!.name.replace(/\s[—–-]\s.*$/, "")).join(" + "))}</span>
        <span class="pill">${cardsN} CARD${cardsN === 1 ? "" : "S"}</span></div>
      <span class="chip-outcome"><span class="swatch"></span>${esc(outcome?.name ?? "Engine only")}</span>
      ${meta}`;
    const pill = b.querySelector<HTMLElement>(".pill")!; pill.style.color = color; pill.style.borderColor = color;
    b.querySelector<HTMLElement>(".swatch")!.style.background = color;
    b.addEventListener("click", () => { selected = selected === primary.id ? null : primary.id; view?.select(selected); showDetail(selected); markChips(); });
    tray.append(b);
  }
  markChips();
}
const markChips = () => { for (const c of tray.querySelectorAll<HTMLElement>(".chip")) c.classList.toggle("active", c.dataset.combo === selected); };

function showDetail(id: string | null) {
  if (!id || !deck) { detail.hidden = true; return; }
  const c = combosById.get(id)!;
  const colors = outcomeColors(shownHits());
  const rows = c.uses.map((u) => {
    const card = cards.get(u.card)!;
    const have = own(u.card);
    const src = thumb(card.image, 120);
    return `<div class="card-row${have < u.quantity ? " missing" : ""}" data-base="${esc(u.card)}">
      ${src ? `<img src="${esc(src)}" alt="" loading="lazy" title="Click to read the card">` : `<span></span>`}
      <div><div class="cname">${esc(card.name)}</div><div class="csub">${esc(card.code)} · ${esc(u.role)}${card.domains.length ? " · " + esc(card.domains.join("/")) : ""}</div></div>
      <span class="have${have < u.quantity ? " short" : ""}">${Math.min(have, u.quantity)}/${u.quantity}</span>
    </div>`;
  }).join("");
  const title = c.uses.slice(0, 3).map((u) => esc(name(u.card))).join('<span class="plus">+</span>') + (c.uses.length > 3 ? `<span class="plus">+</span>${c.uses.length - 3} more` : "");
  const legendDomains = [...new Set(c.uses.flatMap((u) => cards.domainsOf(u.card)))];
  detail.hidden = false;
  detail.innerHTML = `
    <div class="drawer-head">
      <div><p class="eyebrow">Selected route</p><h2>${title}</h2></div>
      <button type="button" class="icon-btn" id="close-detail" aria-label="Close">×</button>
    </div>
    <p class="meta">${esc(c.name)} · ${esc(legendDomains.join(" + ") || "any legend")} · ${esc(c.class.replace("_", " "))}${c.status === "verified" ? "" : " · " + esc(c.status)}</p>
    <h3>Pieces</h3><div class="card-list">${rows}</div>
    ${c.prerequisites.notable.length ? `<h3>Prerequisites</h3><ul>${c.prerequisites.notable.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
    ${c.needs.length ? `<h3>Needs first</h3><p>${c.needs.map((n) => esc(featuresById.get(n)?.name ?? n)).join(", ")}</p>` : ""}
    <h3>Steps</h3><ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    ${c.netPerIteration ? `<h3>Per iteration</h3><p class="net">${esc(c.netPerIteration)}</p>` : ""}
    <h3>Payoff</h3><div class="pills">${c.produces.map((f) => featuresById.get(f)).filter((f): f is Feature => !!f && f.status === "STANDALONE").map((f) => `<span class="pill" data-feature="${esc(f.id)}">${esc(f.name)}</span>`).join("")}</div>
    ${c.prerequisites.easy.length ? `<h3>Deck</h3><ul>${c.prerequisites.easy.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
    <h3>Sources</h3><ul class="sources">${c.sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a>` : esc(s.title)}${s.date ? ` <span class="csub">${esc(s.date)}</span>` : ""}</li>`).join("")}</ul>
    ${c.notes ? `<h3>Notes</h3><p>${esc(c.notes)}</p>` : ""}
    <p class="rules-version">Walked against Core Rules ${esc(c.rulesVersion)}</p>`;
  for (const pill of detail.querySelectorAll<HTMLElement>(".pills .pill")) { const col = colors.get(pill.dataset.feature!) ?? "#8b93a4"; pill.style.color = col; pill.style.borderColor = col; }
  detail.querySelector("#close-detail")!.addEventListener("click", () => { selected = null; view?.select(null); showDetail(null); markChips(); });
}

// --- card preview ---------------------------------------------------------------------
// The drawer thumbnails are 34px wide, which is enough to recognise a card and not enough to
// read it. The preview shows the art large AND the rules text from the data, so the answer to
// "what does this card do" never depends on the image resolution.
const preview = $<HTMLElement>("#card-preview");
const previewBox = $<HTMLElement>("#card-preview-box");
let previewReturnFocus: HTMLElement | null = null;

/** Riot's card text carries icon tokens like `:rb_might:`; spell them out rather than show them raw. */
const readable = (s: string) =>
  s.replace(/:rb_([a-z0-9_]+):/g, (_, tok: string) => {
    const energy = /^energy_(\d+)$/.exec(tok);
    if (energy) return `${energy[1]} Energy`;
    const rune = /^rune_(\w+)$/.exec(tok);
    if (rune) return rune[1] === "rainbow" ? "any Rune" : `${rune[1]![0]!.toUpperCase()}${rune[1]!.slice(1)} Rune`;
    if (tok === "might") return "Might";
    if (tok === "exhaust") return "Exhaust";
    return tok.replace(/_/g, " ");
  });

function showCard(base: string) {
  const card = cards.get(base);
  if (!card) return;
  const land = card.orientation === "landscape";
  const src = thumb(card.image, land ? 940 : 660);
  const stats = [
    card.energy !== null ? `${card.energy} energy` : "",
    card.power ? `${card.power} power` : "",
    card.might !== null ? `${card.might} might` : "",
    card.mightBonus ? `+${card.mightBonus} might` : "",
  ].filter(Boolean).join(" · ");
  const meta = [card.code, card.type.join(" / "), card.domains.join(" / "), stats].filter(Boolean).join(" · ");
  previewReturnFocus = document.activeElement as HTMLElement | null;
  previewBox.innerHTML = `
    <button type="button" class="icon-btn cp-close" aria-label="Close card">×</button>
    ${src ? `<img src="${esc(src)}" alt="${esc(card.name)}"${land ? ' class="landscape"' : ""}>` : ""}
    <div>
      <h2 class="cp-name">${esc(card.name)}</h2>
      <p class="cp-meta">${esc(meta)}</p>
      <div class="cp-text">${esc(readable(card.text ?? ""))}</div>
      ${card.effect ? `<div class="cp-effect"><span class="cp-label">Granted to the equipped unit</span>${esc(readable(card.effect))}</div>` : ""}
      <p class="cp-hint">Esc or click outside to close.</p>
    </div>`;
  preview.hidden = false;
  previewBox.querySelector<HTMLButtonElement>(".cp-close")!.focus();
}
function hideCard() {
  if (preview.hidden) return;
  preview.hidden = true;
  previewReturnFocus?.focus();
  previewReturnFocus = null;
}
preview.addEventListener("click", (ev) => {
  const t = ev.target as Element;
  if (t === preview || t.closest(".cp-close")) hideCard();
});
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") hideCard(); });
detail.addEventListener("click", (ev) => {
  const t = ev.target as Element;
  const row = t.closest<HTMLElement>(".card-row");
  if (row?.dataset.base && t.closest("img")) showCard(row.dataset.base);
});
// Single click on a node selects it (that is the map's own gesture); double click reads it.
graphHost.addEventListener("dblclick", (ev) => {
  const node = (ev.target as Element).closest<SVGGElement>(".node.card");
  if (node?.dataset.id) { ev.preventDefault(); showCard(node.dataset.id); }
});

// --- wiring ---------------------------------------------------------------------------
form.addEventListener("submit", (ev) => { ev.preventDefault(); void run("text"); });
$<HTMLButtonElement>("#load-url").addEventListener("click", () => void run("url"));
$<HTMLButtonElement>("#load-example").addEventListener("click", () => { input.value = EXAMPLE; void run("text"); });
input.addEventListener("input", () => {
  const n = parseDeckText(input.value).reduce((a, e) => a + e.count, 0);
  $<HTMLElement>("#card-count").textContent = `${n} card${n === 1 ? "" : "s"}`;
});
// Collapsing changes the stage's aspect ratio, and the layered layout picks its column count from
// that — so re-render rather than just refit.
const setPanel = (open: boolean) => {
  shell.classList.toggle("collapsed", !open);
  $<HTMLButtonElement>("#enter-deck").hidden = open;
  if (result) render(); else view?.fit();
};
$<HTMLButtonElement>("#close-panel").addEventListener("click", () => setPanel(false));
$<HTMLButtonElement>("#enter-deck").addEventListener("click", () => setPanel(true));
document.querySelectorAll("input[name=view], input[name=layout]").forEach((r) => r.addEventListener("change", () => { selected = null; render(); }));
document.querySelectorAll("input[name=format]").forEach((r) => r.addEventListener("change", () => { if (deck) { result = matchDeck(deck, variants, cards, { format: fmt(), maxMissing: maxMissing() }); render(); } }));
$<HTMLSelectElement>("#max-missing").addEventListener("change", () => { if (deck) { result = matchDeck(deck, variants, cards, { format: fmt(), maxMissing: maxMissing() }); render(); } });
$<HTMLButtonElement>("#fit").addEventListener("click", () => view?.fit());
$<HTMLButtonElement>("#zoom-in").addEventListener("click", () => view?.zoomBy(1 / 1.25));
$<HTMLButtonElement>("#zoom-out").addEventListener("click", () => view?.zoomBy(1.25));
dimToggle.addEventListener("click", () => { dim = !dim; dimToggle.classList.toggle("on", dim); dimToggle.setAttribute("aria-pressed", String(dim)); view?.setDim(dim); });
$<HTMLButtonElement>("#fullscreen").addEventListener("click", () => { const st = $<HTMLElement>("#stage"); document.fullscreenElement ? void document.exitFullscreen() : void st.requestFullscreen(); });
let resizeTimer = 0;
window.addEventListener("resize", () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(() => view?.fit(), 150); });

void boot();
