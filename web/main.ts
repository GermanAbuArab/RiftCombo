import combosJson from "../data/combos.json" with { type: "json" };
import featuresJson from "../data/features.json" with { type: "json" };
import legalityJson from "../data/legality.json" with { type: "json" };
import synergiesJson from "../data/synergies.json" with { type: "json" };
import { CardIndex, readableCardText } from "../src/cards.js";
import { generateVariants, sourceHref } from "../src/combos.js";
import { checkBuild, LEGALITY_RULE } from "../src/build.js";
import { deckCountLine, deckRestrictions, deckToText, isDeckCode, loadDeck, normalizeDeck, type DeckEntry, type DeckRestriction } from "../src/deck.js";
import { matchDeck, type Hit, type MatchResult } from "../src/matcher.js";
import { planDeck, type Route } from "../src/plan.js";
import { matchSynergies, planSynergies, type SynergyGap, type SynergyHit } from "../src/synergies.js";
import type { Card, Combo, Deck, Domain, Feature, Format, LegalityEntry, Synergy, Variant } from "../src/types.js";
import { gate, initAccount } from "./account.js";
import { initDecks } from "./decks.js";
import { accountsEnabled } from "./supabase.js";
import type { SavedDeck } from "../src/saved.js";
import { OUTCOME_PALETTE, renderGraph, thumb, type GraphView, type Layout } from "./graph.js";
import { go, onRoute, route, startRouter } from "./router.js";

const combos = (combosJson as { combos: Combo[] }).combos;
const features = (featuresJson as { features: Feature[] }).features;
const { entries: legality, retrieved: legalityRetrieved } = legalityJson as { entries: LegalityEntry[]; retrieved: string };
const synergies = (synergiesJson as unknown as { synergies: Synergy[] }).synergies;
const combosById = new Map(combos.map((c) => [c.id, c]));
// Cards a verified combo already uses. A suggestion carrying one has a hand-walked line behind it,
// which is a different kind of evidence from "the predicate caught its text".
const cataloguedCards = new Set(combos.filter((c) => c.status === "verified").flatMap((c) => c.uses.map((u) => u.card)));
/** Rules the "One card away" panel shows before it becomes a list of the catalogue. */
const GAP_LIMIT = 5;
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
const planPanel = $<HTMLElement>("#plan");
const planBody = $<HTMLElement>("#plan-body");
const banPanel = $<HTMLElement>("#bans");
const banBody = $<HTMLElement>("#bans-body");
const banFoot = $<HTMLElement>("#bans-foot");
const synergyPanel = $<HTMLElement>("#synergy");
const synergyBody = $<HTMLElement>("#synergy-body");
const gapPanel = $<HTMLElement>("#gaps");
const gapBody = $<HTMLElement>("#gaps-body");

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
/** The saved deck Combos is showing, when My decks handed it over. Null for a list pasted here. */
let analyzing: SavedDeck | null = null;

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
/**
 * The live tally of what is in the box, by zone. Called from `run` as well as from the keystroke
 * listener: "Load example" and "Load" assign `input.value` directly, which fires no `input` event,
 * so the counter used to still read "0 cards" beside a full list.
 */
const showCount = () => {
  $<HTMLElement>("#card-count").textContent = cards ? deckCountLine(loadDeck(input.value, cards)) : "0 cards";
};
const setStatus = (title: string, body: string, kind: "" | "ok" | "error" = "") => {
  $<HTMLElement>("#status-title").textContent = title;
  $<HTMLElement>("#status-body").textContent = body;
  statusCard.classList.remove("ok", "error");
  if (kind) statusCard.classList.add(kind);
};

async function boot() {
  gate();
  setStatus("Loading", "Fetching the card index…");
  const res = await fetch("/data/cards.json");
  const data = (await res.json()) as { cards: Card[]; resultsUpdatedAt: string };
  cards = new CardIndex(data.cards, legality);
  variants = generateVariants(combos, cards);
  const verified = combos.filter((c) => c.status === "verified").length;
  // The word "candidate" only means something while the catalogue holds one; with every entry
  // walked, the sentences explaining it would point at nothing, so they stay out of the page.
  for (const el of document.querySelectorAll<HTMLElement>('[data-when="candidates"]')) el.hidden = verified === combos.length;
  const tally = verified === combos.length ? `${combos.length} combos, every one walked by hand` : `${combos.length} combos (${verified} verified)`;
  $<HTMLElement>("#data-note").insertAdjacentHTML("beforeend", ` Card data as of ${esc(data.resultsUpdatedAt.slice(0, 10))}: ${cards.cards.length} printings, ${tally}.`);
  setStatus("Ready", "Paste a deck list to begin.");
  // A `#deck=<list>` link shared before the views existed still opens Combos with that list.
  const opened = route();
  if (opened.legacyDeck) { input.value = opened.legacyDeck; void run(); }
  initAccount();
  initDecks({
    cards: () => cards,
    analyze: (saved) => {
      $<HTMLInputElement>(`input[name=format][value="${saved.format}"]`).checked = true;
      input.value = saved.deckText;
      urlInput.value = "";
      analyzing = saved;
      input.dispatchEvent(new Event("input"));
      // Switch tabs BEFORE matching: the diagram measures its own box to fit, and a hidden container
      // measures zero, which renders the SVG with a NaN viewBox.
      go(saved.id ? `#/combos?deck=${encodeURIComponent(saved.id)}` : "#/combos");
      void run("text");
    },
  });
  // Last, so every listener above is registered before the opening route is dispatched.
  startRouter();
}

async function fromUrl(url: string): Promise<Deck> {
  const res = await fetch(`/api/deck-url?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "could not fetch that deck");
  const payload = (await res.json()) as { entries: DeckEntry[]; title?: string };
  // The imported list goes into the textarea before anything is matched (#74). Everything that hangs
  // off the textarea reads from there and nowhere else: the card counter, which used to say "0 cards"
  // beside a status card reading "40 in the main deck", and the offer to save the list to My decks,
  // which never appeared at all — so a deck imported by URL was a dead end. `deckToText` is the same
  // serialisation My decks' own Piltover import writes, so the two paths produce identical text, and
  // `test/deck.test.ts` pins that our parser reads it back as the very deck it came from.
  input.value = deckToText(payload.entries, cards);
  input.dispatchEvent(new Event("input"));
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
    showCount();
    // Keep the address honest: a deck code travels in the hash itself, a list opened from My decks
    // keeps its id there, and a list pasted here has nothing to put in a link.
    if (source === "text") {
      if (isDeckCode(text)) go(`#deck=${encodeURIComponent(text)}`);
      else go(analyzing?.id ? `#/combos?deck=${encodeURIComponent(analyzing.id)}` : "#/combos");
    }
  } catch (err) {
    setStatus("Could not read that", (err as Error).message, "error");
  } finally {
    analyze.disabled = false;
  }
}

/**
 * The lines the card index could not place, named rather than counted. `parseDeck` keeps the raw text
 * of each one (`src/deck.ts`) and the CLI has always printed it; the web used to show only how many
 * there were, which left the player to diff a 40-line list by eye for their own typo (#67). Two names
 * is where a status line stops being readable, so the rest are counted.
 */
const unresolvedLine = (d: Deck): string => {
  if (!d.unresolved.length) return "";
  const named = d.unresolved.slice(0, 2).map((u) => `${u.count}× ${u.raw}`).join(", ");
  const rest = d.unresolved.length - Math.min(2, d.unresolved.length);
  const what = `${named}${rest ? ` and ${rest} more` : ""}`;
  return ` · ${d.unresolved.length === 1 ? "1 line" : `${d.unresolved.length} lines`} not recognised: ${what}`;
};

/**
 * What the status card says about the list on screen. This lives here rather than in `run()` because
 * the format toggle and the "cards away" selector both re-run the matcher without going through it:
 * the card kept the numbers of the previous run, so "complete only" still claimed 11 near misses while
 * the tab beside it said there were none (#66). Everything here is derived from `deck` and `result`,
 * so it is correct wherever `render()` is reached from. The transient states — "Matching", and the
 * errors — stay in `run()`, since they are not derivable from a result.
 */
function showStatus() {
  if (!deck || !result) return;
  const included = result.included.length;
  const near = Object.values(result).reduce((n, b) => n + b.length, 0) - included;
  const total = Object.values(deck.main).reduce((a, b) => a + b, 0);
  setStatus(
    included ? `${included} combo${included === 1 ? "" : "s"} found` : "No complete combos",
    `${total} in the main deck${deck.legend ? ` · ${name(deck.legend).replace(/ - Starter$/, "")}` : ""}${near ? ` · ${near} near miss${near === 1 ? "" : "es"}` : ""}${unresolvedLine(deck)}`,
    included || near ? "ok" : "",
  );
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
 * How many known combos are even legal under this deck's legend, in the format being matched.
 * Domain Identity (103.1.b) means every card in a combo must sit inside the legend's two domains,
 * and a combo holding a banned card cannot be built at all — pursuer-herald-recruits is Mind + Order
 * and dead in both formats, because Stealthy Pursuer has been banned since 2026-07-24. Counting it
 * would put two numbers called "legal" on the same screen with different meanings, since
 * planDeck already drops the banned ones (#23).
 */
const playableUnderLegend = (format: Format): number | null => {
  if (!deck?.legend) return null;
  const dom = new Set(cards.domainsOf(deck.legend));
  return combos.filter((c) =>
    c.uses.every((u) => cards.domainsOf(u.card).every((d) => dom.has(d)) && !cards.legality(u.card, format))).length;
};

const DOMAINS: Domain[] = ["fury", "calm", "mind", "body", "chaos", "order"];
const titleCase = (d: string) => d.charAt(0).toUpperCase() + d.slice(1);
/** Legends carry exactly two domains, so a pair is the unit of coverage. Order them consistently. */
const asPair = (ds: Domain[]): Domain[] => [...new Set(ds)].sort((a, b) => DOMAINS.indexOf(a) - DOMAINS.indexOf(b));
const pairLabel = (p: Domain[]) => p.map(titleCase).join(" + ");

/**
 * How many catalogued combos each legend domain pair could ever run. Domain Identity (103.1.b) caps
 * a deck at its legend's two domains, so this is the map of where the catalogue actually has depth.
 * An empty result on a thin pair is our gap, and the reader deserves to see which pairs are thick.
 */
const coverageByPair = (): { pair: Domain[]; count: number }[] => {
  const needs = combos.map((c) => new Set(c.uses.flatMap((u) => cards.domainsOf(u.card))));
  const out: { pair: Domain[]; count: number }[] = [];
  for (const [i, a] of DOMAINS.entries()) {
    for (const b of DOMAINS.slice(i + 1)) {
      const pair = [a, b];
      out.push({ pair, count: needs.filter((n) => [...n].every((d) => pair.includes(d))).length });
    }
  }
  return out.sort((a, b) => b.count - a.count || pairLabel(a.pair).localeCompare(pairLabel(b.pair)));
};

/** Name the deck's own pair and the pairs that are actually deep, so an empty result points somewhere. */
function showCoverage(own: Domain[] | null) {
  const host = $<HTMLElement>("#empty-coverage");
  const all = coverageByPair();
  const ownKey = own?.length === 2 ? own.join("/") : null;
  const top = all.filter((p) => p.count > 0 && p.pair.join("/") !== ownKey).slice(0, 4);
  if (!top.length) { host.hidden = true; return; }
  host.innerHTML = `Other legend pairs: ${top.map((p) => `${esc(pairLabel(p.pair))} <strong>${p.count}</strong>`).join(" · ")}.`;
  host.hidden = false;
}

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
  const legalHere = playableUnderLegend(fmt());
  const verified = combos.filter((c) => c.status === "verified").length;
  const own = deck?.legend ? asPair(cards.domainsOf(deck.legend)) : null;

  if (mode() !== "network") {
    title.textContent = "Nothing within reach";
    body.textContent = `No known combo is within ${maxMissing()} card${maxMissing() === 1 ? "" : "s"} of this list. Raising that distance in the panel will widen the search.`;
    $<HTMLElement>("#empty-coverage").hidden = true;
  } else if (legalHere === 0 && legend) {
    title.textContent = "No catalogued combos for this legend yet";
    body.innerHTML = `Not one of the ${combos.length} combos RiftCombo knows fits inside <strong>${esc(own ? pairLabel(own) : legend)}</strong>, so there is nothing here to match against. This is a gap in our catalogue, not a judgement on your deck.`;
    showCoverage(own);
  } else {
    title.textContent = "No complete combo in this list";
    body.innerHTML = legend
      ? `RiftCombo knows ${combos.length} combos (${verified} walked by hand), of which <strong>${legalHere}</strong> fit inside ${esc(own ? pairLabel(own) : `${legend}'s domains`)} — and this list has all the pieces for none of them. Try <strong>Near misses</strong> to see what it is short of.`
      : `RiftCombo knows ${combos.length} combos and this list has all the pieces for none of them. Try <strong>Near misses</strong> to see what it is short of.`;
    showCoverage(own);
  }
  note.hidden = false;
  note.textContent = "The catalogue is hand-built and still small, so an empty result usually means the archetype has not been swept yet rather than that no combo exists.";
}

// --- what to add (#18) ----------------------------------------------------------------
// The diagram answers "which combos does this list have". This answers the question a player
// actually asks next: "which cards would give it one". Ranked by copies to add, so the number
// carries the honesty — a six-card route is still shown, because hiding it hides a real answer.
const ALT_LIMIT = 4;
const routeName = (r: Route) => r.variant.comboIds.map((id) => combosById.get(id)!.name).join(" + ");
const routeShort = (r: Route) => r.variant.comboIds.map((id) => combosById.get(id)!.name.replace(/\s[—–-]\s.*$/, "")).join(" + ");
const routeOutcome = (r: Route) =>
  r.variant.produces.map((f) => featuresById.get(f)).find((f) => f?.status === "STANDALONE")?.name ?? null;

const addRow = (a: { card: string; quantity: number }) => {
  const card = cards.get(a.card)!;
  const src = thumb(card.image, 120);
  const sub = [card.code, card.type.join("/"), card.domains.join("/")].filter(Boolean).join(" · ");
  return `<div class="card-row" data-base="${esc(a.card)}">
    ${src ? `<img src="${esc(src)}" alt="" loading="lazy" title="Click to read the card">` : `<span></span>`}
    <div><div class="cname">${esc(card.name)}</div><div class="csub">${esc(sub)}</div></div>
    <span class="have short">+${a.quantity}</span>
  </div>`;
};

const FORMAT_LABEL: Record<Format, string> = { constructed: "Constructed", "2v2": "2v2" };

/**
 * The ban list, first thing in the panel, because somebody bringing a list to a tournament wants
 * that before any combo. Legality is format-scoped, so this is read again on every format change
 * and a card banned in one format is silent in the other.
 */
function renderBans() {
  if (!deck) { banPanel.hidden = true; return; }
  const found = deckRestrictions(deck, cards, fmt());
  // A Main Deck that is not 40 is not a ban and does not render as one, but it belongs in the panel a
  // player reads to find out whether this list can be brought (#71): the panel used to name a banned
  // card to the copy while saying nothing about a 36-card list.
  //
  // #92 finished that argument. Showing only the size row left the rest of `checkBuild` unsaid here
  // while My decks printed all nine, so one list answered twice: the Utrecht Lee Sin list resolves to
  // 2 battlefields — Riot's own article writes `Trapping Ground` for `UNL-217 Trapping Grounds` — and
  // this panel called it clean while Construction called it `FIX · 103.4.a · 103.4.c`. Every failing
  // row now lands here in the words and the citation the rule wrote for itself, so neither view has a
  // sentence the other lacks. `LEGALITY_RULE` is the one exception: the ban rows below already say it
  // card by card, with the copy count, the format and a link to Riot's notice.
  const broken = checkBuild(deck, cards, fmt()).rules
    .filter((r) => r.status === "fail" && r.rule !== LEGALITY_RULE);
  const sizeRow = broken.map((r) => `<div class="size-row">
    <p class="ban-name">${esc(r.label)}</p>
    <p class="ban-meta">${esc(r.detail)} · <span class="mono">${esc(r.rule)}</span></p>
  </div>`).join("");
  banBody.innerHTML = sizeRow + found.map(banRow).join("");
  banFoot.textContent = found.length
    ? `Riot's ban list for ${FORMAT_LABEL[fmt()]}, transcribed from the Rules Hub on ${legalityRetrieved.slice(0, 10)}. Switch format above to check the other one.`
    : "";
  banPanel.hidden = found.length === 0 && !sizeRow;
}

function banRow(r: DeckRestriction): string {
  const copies = `${r.count} ${r.count === 1 ? "copy" : "copies"}`;
  return `<div class="ban-row ${r.entry.status}">
    <p class="ban-name">${esc(r.entry.name)} <span class="ban-tag">${r.entry.status}</span></p>
    <p class="ban-meta">${copies} in your list · ${esc(FORMAT_LABEL[r.entry.format])} · since ${esc(r.entry.since)} · <a href="${esc(r.entry.source)}" target="_blank" rel="noopener noreferrer">Riot's notice</a></p>
  </div>`;
}

/** What adding these cards costs the list: deck slots, battlefield slots, or a rebuild. */
function leadFootnote(r: Route): string {
  const parts: string[] = [];
  if (r.havePieces > 0) parts.push(`You already have <strong>${r.havePieces} of ${r.totalPieces}</strong> pieces.`);
  const deckCopies = r.cost - r.battlefieldCopies;
  if (deckCopies > 0) parts.push(`${deckCopies} card${deckCopies === 1 ? "" : "s"} in means ${deckCopies} out.`);
  if (r.battlefieldCopies > 0) {
    parts.push(r.battlefieldCopies === 1
      ? "One of them is a battlefield, so it takes one of your three battlefield slots."
      : `${r.battlefieldCopies} of them are battlefields, so they take ${r.battlefieldCopies} of your three battlefield slots.`);
  }
  if (r.cost >= 5) parts.push("At that distance this is a rebuild rather than an addition.");
  return parts.join(" ");
}

function renderPlan() {
  if (!deck) { planPanel.hidden = true; return; }
  const plan = planDeck(deck, variants, cards, { format: fmt() });
  const pair = plan.domains.length ? pairLabel(asPair(plan.domains)) : null;
  const out: string[] = [];

  if (plan.have.length) {
    out.push(`<section class="plan-sec"><p class="plan-lab">Already in this list</p>
      ${plan.have.map((r) => `<div class="plan-had"><span class="plan-had-name">${esc(routeShort(r))}</span><span class="plan-alt-class">${esc(r.variant.class.replace("_", " "))}</span></div>`).join("")}</section>`);
  } else if (plan.pieces.length) {
    // No line closes yet, but naming the catalogued pieces the list already holds is true and
    // useful — it says the deck is on a road, not that it is empty.
    const named = plan.pieces.map((b) => name(b)).sort((a, b) => a.localeCompare(b));
    out.push(`<section class="plan-sec"><p class="plan-lab">Already in this list</p>
      <p class="plan-note">No complete line yet. Pieces of one that are already here: <strong>${esc(named.slice(0, 6).join(", "))}</strong>${named.length > 6 ? ` and ${named.length - 6} more` : ""}.</p></section>`);
  }

  const lead = plan.routes[0];
  if (!deck.legend) {
    out.push(`<p class="plan-note">Name a legend in your list and this scopes to the two domains it can play.</p>`);
  } else if (plan.legalHere === 0) {
    const deep = coverageByPair().filter((p) => p.count > 0).slice(0, 3);
    out.push(`<p class="plan-note">Not one of the ${combos.length} combos RiftCombo knows fits inside <strong>${esc(pair!)}</strong>, so there is nothing here to build toward. This is a gap in our catalogue, not a judgement on your deck.</p>
      <p class="plan-note">Deeper pairs: ${deep.map((p) => `${esc(pairLabel(p.pair))} <strong>${p.count}</strong>`).join(" · ")}.</p>`);
  } else if (!lead) {
    out.push(`<p class="plan-note">This list already has every catalogued line that fits inside <strong>${esc(pair!)}</strong>.</p>`);
  } else {
    const outcome = routeOutcome(lead);
    out.push(`<section class="plan-sec"><p class="plan-lab">First complete line</p>
      <div class="plan-lead">
        <div class="plan-lead-top">
          <div>
            <button type="button" class="plan-name" data-combo="${esc(lead.variant.comboIds[0]!)}">${esc(routeName(lead))}</button>
            <p class="plan-out">${esc([outcome, lead.variant.class.replace("_", " ")].filter(Boolean).join(" · "))}</p>
          </div>
          <span class="pill plan-cost">+${lead.cost} CARD${lead.cost === 1 ? "" : "S"}</span>
        </div>
        <div class="plan-adds">${lead.add.map(addRow).join("")}</div>
        <p class="plan-foot">${leadFootnote(lead)}</p>
      </div></section>`);

    const alts = plan.routes.slice(1, 1 + ALT_LIMIT);
    if (alts.length) {
      const rest = plan.routes.length - 1 - alts.length;
      out.push(`<section class="plan-sec"><p class="plan-lab">Other routes</p>
        <div class="plan-alts">${alts.map((r) => `<button type="button" class="plan-alt" data-combo="${esc(r.variant.comboIds[0]!)}">
          <span class="plan-alt-cost">+${r.cost}</span>
          <span class="plan-alt-name">${esc(routeShort(r))}</span>
          <span class="plan-alt-class">${esc(r.variant.class.replace("_", " "))}</span></button>`).join("")}</div>
        ${rest > 0 ? `<p class="plan-note">${rest} more line${rest === 1 ? "" : "s"} inside ${esc(pair!)} are further away.</p>` : ""}</section>`);
    }
  }

  planBody.innerHTML = out.join("");
  planPanel.hidden = out.length === 0;
}

/**
 * The pairs a deck already runs. This is a different guarantee from everything else on the page and
 * the panel says so in its own words: the rule was walked by hand once, the instances are text
 * matches over the pool. Nothing here is counted as a combo or drawn in the diagram.
 */
function renderSynergies() {
  if (!deck) { synergyPanel.hidden = true; return; }
  const hits = matchSynergies(deck, synergies, cards, { format: fmt() });
  synergyBody.innerHTML = hits.map(synergyRow).join("");
  synergyPanel.hidden = hits.length === 0;
}

/**
 * The rules this list is ONE card short of. matchSynergies only speaks when a deck holds both
 * halves, which is silence for most lists — and silence reads as "no synergies here" when the truth
 * is "you are one card in". Same guarantee as the panel above, same Domain Identity and ban-list
 * bar as the plan: nothing named here is outside the legend's two domains or illegal in the format.
 */
function renderGaps() {
  if (!deck) { gapPanel.hidden = true; return; }
  const gaps = planSynergies(deck, synergies, cards, { format: fmt(), catalogued: cataloguedCards });
  const rest = gaps.length - GAP_LIMIT;
  // Say how many were cut. #18 settled that the count itself is the honest signal, and a panel that
  // silently truncates reads as "that is all there is".
  gapBody.innerHTML = gaps.slice(0, GAP_LIMIT).map(gapRow).join("") +
    (rest > 0 ? `<p class="gap-wide gap-rest">${rest} more rule${rest === 1 ? " is" : "s are"} one card away.</p>` : "");
  gapPanel.hidden = gaps.length === 0;
}

/** House vocabulary for a card's price, matching the card drawer: "2 energy · 1 power". */
function priceOf(base: string): string {
  const c = cards.get(base);
  if (!c) return "";
  if (c.type.includes("battlefield")) return "one battlefield slot";
  const bits = [c.energy !== null ? `${c.energy} energy` : "", c.power ? `${c.power} power` : ""].filter(Boolean);
  return bits.length ? bits.join(" \u00b7 ") : "no cost";
}

function gapRow(g: SynergyGap): string {
  const s = g.synergy;
  const held = g.partners
    .map((p) => `<button type="button" class="syn-card" data-card="${esc(p.card)}"><span class="syn-n">${p.copies}\u00d7</span> ${esc(name(p.card))}</button>`)
    .join("");
  const adds = g.add.map((a) => `<li>
      <button type="button" class="syn-card gap-add" data-card="${esc(a.card)}">${esc(name(a.card))}</button>
      <span class="gap-cost">${esc(priceOf(a.card))}</span>
      ${a.catalogued ? `<span class="gap-tag">in a walked combo</span>` : ""}
    </li>`).join("");
  // The anchor's name is already on the add row below, so the lead does not repeat it.
  const lead = g.missing === "anchor"
    ? `Switches on ${g.partners.length} card${g.partners.length === 1 ? "" : "s"} this list already runs:`
    : `The list runs ${g.anchorCopies}\u00d7 <strong>${esc(name(s.anchor))}</strong> and nothing the rule pairs it with. The cheapest that fit:`;
  const rules = s.basis.rules.map((r) => `<span class="syn-ref">${esc(r)}</span>`).join("");
  const readings = (s.basis.readings ?? []).map((r) => `<span class="syn-ref">${esc(r)}</span>`).join("");
  return `<details class="syn gap">
    <summary class="syn-sum">
      <span class="syn-name">${esc(s.name)}</span>
      <span class="gap-lead">${lead}</span>
      ${g.missing === "anchor" ? `<span class="syn-pair">${held}</span>` : ""}
      <ul class="gap-list">${adds}</ul>
    </summary>
    <div class="syn-open">
      <p class="syn-why">${esc(s.why)}</p>
      <p class="gap-wide">${g.partnersAvailable} card${g.partnersAvailable === 1 ? "" : "s"} in the pool fit this rule inside ${esc(pairLabel(asPair(cards.domainsOf(deck!.legend!))))}.</p>
      <p class="syn-basis"><span class="syn-lab">Core Rules</span>${rules}${readings ? `<span class="syn-lab">Readings</span>${readings}` : ""}</p>
    </div>
  </details>`;
}

function synergyRow(h: SynergyHit): string {
  const s = h.synergy;
  const chip = (base: string, copies: number) =>
    `<button type="button" class="syn-card" data-card="${esc(base)}"><span class="syn-n">${copies}\u00d7</span> ${esc(name(base))}</button>`;
  const partners = h.partners.map((p) => chip(p.card, p.copies)).join("");
  const rules = s.basis.rules.map((r) => `<span class="syn-ref">${esc(r)}</span>`).join("");
  const readings = (s.basis.readings ?? []).map((r) => `<span class="syn-ref">${esc(r)}</span>`).join("");
  // The whole provenance, not a first entry and a count: which walked combos this rule was pulled
  // out of is the only thing standing behind it, and each one opens in the drawer.
  const from = s.basis.combos.length
    ? `<div class="syn-from"><span class="syn-lab">Taken from</span>
        <ul class="syn-from-list">${s.basis.combos.map((id) => `<li><button type="button" class="syn-link" data-combo="${esc(id)}">${esc(combosById.get(id)?.name ?? id)}</button></li>`).join("")}</ul></div>`
    : `<p class="syn-alone">Not taken from a catalogued combo — this one stands on the rules text alone.</p>`;
  return `<details class="syn">
    <summary class="syn-sum">
      <span class="syn-name">${esc(s.name)}</span>
      <span class="syn-pair">${chip(s.anchor, h.anchorCopies)}<span class="syn-plus">+</span>${partners}</span>
    </summary>
    <div class="syn-open">
      <p class="syn-why">${esc(s.why)}</p>
      ${from}
      <p class="syn-basis"><span class="syn-lab">Core Rules</span>${rules}${readings ? `<span class="syn-lab">Readings</span>${readings}` : ""}</p>
    </div>
  </details>`;
}

function render() {
  if (!deck || !result) return;
  showStatus();
  const hits = shownHits();
  routeCount.textContent = String(hits.length);
  empty.hidden = hits.length > 0;
  const legalHere = playableUnderLegend(fmt());
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
  renderBans();
  renderPlan();
  renderSynergies();
  renderGaps();
  renderAnalyzing();
  showDetail(selected);
}

/**
 * Which list is on screen and what can be done about it. A list opened from My decks names itself and
 * links back to its detail; a list pasted here offers to become one — and offers it rather than doing it,
 * because nothing about a list is stored until the player presses Save.
 */
function renderAnalyzing() {
  const strip = $<HTMLElement>("#analyzing");
  const save = $<HTMLElement>("#save-here");
  const shown = analyzing !== null && analyzing.deckText === input.value;
  strip.hidden = !shown;
  if (shown && analyzing!.id) {
    strip.innerHTML = `Analyzing <strong>${esc(analyzing!.name)}</strong> · <a href="#/decks/${esc(encodeURIComponent(analyzing!.id))}">edit it</a>`;
  } else if (shown) {
    strip.innerHTML = `Analyzing <strong>${esc(analyzing!.name)}</strong>, which is not saved yet.`;
  }
  save.hidden = shown || !accountsEnabled || !input.value.trim();
}

const outcomeColors = (hits: Hit[]) => {
  const ids = [...new Set(hits.flatMap((h) => h.variant.comboIds).flatMap((id) => combosById.get(id)?.produces ?? []))].filter((f) => featuresById.get(f)?.status === "STANDALONE");
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, CHAIN: 2, ALT_WIN: 3, ENGINE: 4 };
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
    <h3>Sources</h3><ul class="sources">${c.sources.map((s) => { const href = sourceHref(s); return `<li>${href ? `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(s.title)}</a>` : esc(s.title)}${s.date ? ` <span class="csub">${esc(s.date)}</span>` : ""}</li>`; }).join("")}</ul>
    ${c.notes ? `<details class="audit"><summary>How this entry was audited</summary>
      <p class="audit-key">${AUDIT_KEY}</p><p>${esc(c.notes)}</p></details>` : ""}
    <p class="rules-version">Walked against Core Rules ${esc(c.rulesVersion)}</p>`;
  for (const pill of detail.querySelectorAll<HTMLElement>(".pills .pill")) { const col = colors.get(pill.dataset.feature!) ?? "#8b93a4"; pill.style.color = col; pill.style.borderColor = col; }
  detail.querySelector("#close-detail")!.addEventListener("click", closeDetail);
}

/** Letting the drawer go is the same four steps wherever it is asked for: the ×, or Escape (#76). */
function closeDetail(): void { selected = null; view?.select(null); showDetail(null); markChips(); }

/**
 * The audit register speaks its own language, and the player is not expected to know it (#72). The
 * notes stay verbatim — they are the record this catalogue stands on and their precision is worth more
 * than their prose — so the four terms are translated beside them instead of being edited out of
 * `data/combos.json`.
 */
const AUDIT_KEY = "REFUTE = a refutation pass, with its date and verdict · WOUNDED = the pass found a flaw and the entry was rewritten · BUDGETED = the pass checked the recycle-and-draw ledger · lens = the hunt that proposed it.";

// --- card preview ---------------------------------------------------------------------
// The drawer thumbnails are 34px wide, which is enough to recognise a card and not enough to
// read it. The preview shows the art large AND the rules text from the data, so the answer to
// "what does this card do" never depends on the image resolution.
const preview = $<HTMLElement>("#card-preview");
const previewBox = $<HTMLElement>("#card-preview-box");
let previewReturnFocus: HTMLElement | null = null;

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
      <div class="cp-text">${esc(readableCardText(card.text ?? ""))}</div>
      ${card.effect ? `<div class="cp-effect"><span class="cp-label">Granted to the equipped unit</span>${esc(readableCardText(card.effect))}</div>` : ""}
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
/**
 * The two keys the overlays owe the keyboard (#75, #76).
 *
 * Escape belongs to the top layer only: with a card open it closes the card and leaves the drawer
 * underneath standing, which is the state the player came from.
 *
 * Tab is trapped inside the card. `aria-modal="true"` is a promise that the rest of the page is out
 * of reach and the browser does not keep it on its own: without this the first Tab off the close
 * button landed on BODY and then walked the top bar and the deck panel *behind* an opaque overlay,
 * with nothing on screen showing where the focus had gone. Focus that is already outside is pulled
 * back in rather than corrected later, so the trap also repairs a stray click.
 */
document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") {
    if (!preview.hidden) hideCard();
    else if (!detail.hidden) closeDetail();
    return;
  }
  if (ev.key !== "Tab" || preview.hidden) return;
  const stops = [...previewBox.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
  const first = stops[0], last = stops.at(-1);
  if (!first || !last) return;
  const inside = previewBox.contains(document.activeElement);
  const edge = ev.shiftKey ? first : last;
  if (!inside || document.activeElement === edge) {
    ev.preventDefault();
    (ev.shiftKey ? last : first).focus();
  }
});
// An overlay belongs to the view that opened it. Left open across a tab switch it stays on top of the
// next view and swallows every click there, with nothing on screen saying Esc is the way out.
onRoute(hideCard);
// The plan panel reuses the drawer for detail and the preview for card text: a route name opens
// its steps and sources, a thumbnail opens the card.
planBody.addEventListener("click", (ev) => {
  const t = ev.target as Element;
  const row = t.closest<HTMLElement>(".card-row");
  if (row?.dataset.base && t.closest("img")) { showCard(row.dataset.base); return; }
  const btn = t.closest<HTMLElement>("[data-combo]");
  if (btn?.dataset.combo) { selected = btn.dataset.combo; view?.select(selected); showDetail(selected); markChips(); }
});
// A pair's card chip opens that card; the combo it descends from opens in the same drawer a combo
// name would, which is the whole point of showing where the rule came from.
for (const host of [synergyBody, gapBody]) host.addEventListener("click", (ev) => {
  const t = ev.target as Element;
  const card = t.closest<HTMLElement>("[data-card]");
  if (card?.dataset.card) { ev.preventDefault(); showCard(card.dataset.card); return; }
  const combo = t.closest<HTMLElement>("[data-combo]");
  if (combo?.dataset.combo) { ev.preventDefault(); selected = combo.dataset.combo; view?.select(selected); showDetail(selected); markChips(); }
});
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
$<HTMLButtonElement>("#load-example").addEventListener("click", () => { input.value = EXAMPLE; analyzing = null; void run("text"); });
// A list pasted here becomes a new deck in the library, opened for naming rather than saved behind the
// player's back: nothing is written until they press Save there.
$<HTMLButtonElement>("#save-to-decks").addEventListener("click", () => {
  sessionStorage.setItem("riftcombo:draft", input.value);
  go("#/decks/new");
});
input.addEventListener("input", () => { showCount(); renderAnalyzing(); });
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
// A resize that lands while another view is on screen finds the stage with no box to measure. The fit
// is not skipped and forgotten — the diagram is still sized for the old window — so it is held and
// replayed the moment Combos comes back (#57).
let refitPending = false;
const refit = () => { refitPending = view ? !view.fit() : false; };
window.addEventListener("resize", () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(refit, 150); });
onRoute((r) => { if (r.view === "combos" && refitPending) refit(); });

void boot();
