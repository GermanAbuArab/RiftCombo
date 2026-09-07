// My decks (#43): the library of saved lists, and the detail that edits one.
//
// Everything that can answer without a network lives in src/ and has tests — src/saved.ts for names and
// ordering, src/build.ts for the construction rules, src/deck.ts for parsing, serialising and encoding,
// src/builder.ts for the caps a click respects. This file is the DOM around them.
//
// Since #101 the detail is the visual builder in `web/builder.ts`, not a textarea. What is STORED did
// not change: a saved deck is still `text` + `name` + `format`, and the builder writes that same
// plaintext on every click. Pasting is still how a list arrives, behind Import.

import { checkBuild, LEGALITY_RULE, type BuildReport } from "../src/build.js";
import { deckRestrictions, deckToText, encodeDeckCode, loadDeck, type DeckEntry } from "../src/deck.js";
import { checkSave, sortSaved, MAX_NAME, type SavedDeck } from "../src/saved.js";
import type { CardIndex } from "../src/cards.js";
import type { Deck, Domain, Format } from "../src/types.js";
import { esc } from "../src/html.js";
import { accountsEnabled, createDeck, deleteDeck, listDecks, onAccount, updateDeck, type Account } from "./supabase.js";
import { builderHtml, initBuilder, openImport, openList, refreshBuilder } from "./builder.js";
import { thumb } from "./graph.js";
import { go, onRoute, type Route } from "./router.js";

export interface DeckHooks {
  cards(): CardIndex;
  /** Open Combos with this list loaded, and name it in the strip above the deck input. */
  analyze(deck: SavedDeck): void;
  /** The card modal the Combos view owns, so a name in the builder opens the card. */
  showCard(base: string): void;
}

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const maybe = <T extends Element>(sel: string) => document.querySelector<T>(sel);

let hooks: DeckHooks;
let account: Account | null = null;
let decks: SavedDeck[] = [];
/** True once the first listDecks() has answered, so "no decks" is told apart from "not asked yet". */
let loaded = false;
let message = "";
let host: HTMLElement | null = null;
let current: Route = { view: "combos", deckId: null, analyzing: null, legacyDeck: null };

/** What the editor holds right now. Null when no detail is open. */
let draft: { id: string | null; name: string; text: string; format: Format } | null = null;
let confirmingDelete = false;
let copied = false;

/** The list Combos handed over through "Save to My decks". Survives the view switch, nothing else. */
const HANDOFF = "riftcombo:draft";

export function initDecks(h: DeckHooks): void {
  if (!accountsEnabled) return;
  hooks = h;
  host = $<HTMLElement>("#decks-host");
  host.addEventListener("click", onClick);
  host.addEventListener("submit", (ev) => {
    // The library's import row is a form so Enter in the URL box works; it must never reload the
    // page. The builder's Import dialog is a form too (method="dialog", which closes it), so this
    // only claims the one it owns.
    if (!(ev.target as Element).classList.contains("decks-import")) return;
    ev.preventDefault();
    void guard(importFromPiltover);
  });
  host.addEventListener("input", onInput);
  host.addEventListener("change", onChange);
  initBuilder(host, {
    cards: () => hooks.cards(),
    format: () => draft?.format ?? "constructed",
    showCard: (base) => hooks.showCard(base),
    onEdit: (text) => { if (draft) { draft.text = text; copied = false; refreshActions(); } },
    saveLabel: () => (draft?.id ? "Update" : "Save"),
    dirty: () => dirtyNow(),
    say: (msg) => { message = msg; const el = maybe<HTMLElement>("#decks-msg"); if (el) el.textContent = msg; },
  });

  onAccount((next) => {
    account = next;
    decks = [];
    draft = null;
    loaded = false;
    if (!account) { render(); return; }
    void guard(async () => {
      decks = sortSaved(await listDecks());
      loaded = true;
      // Somebody with saved lists almost always came back for one of them; somebody with none has
      // nothing to see there. Only ever on a bare entry, so a shared link still wins.
      if (!location.hash && decks.length) go("#/decks");
      // A page opened straight on #/combos?deck=<id> asked for a list we only have now.
      handOver(current);
    });
  });

  onRoute(onRouteChange);
}

function onRouteChange(next: Route): void {
  if (!guardUnsaved(next)) return;
  current = next;
  if (next.view === "decks") render();
  else handOver(next);
}

/**
 * `#/combos?deck=<id>` is an address, not a souvenir: opening it loads that saved list into Combos. The
 * id last handed over is remembered so returning to the tab does not overwrite an edit made there, and so
 * the route we write ourselves does not bounce straight back through here.
 */
let handedOver: string | null = null;

function handOver(r: Route): void {
  if (r.view !== "combos" || !r.analyzing || r.analyzing === handedOver) return;
  const d = decks.find((x) => x.id === r.analyzing);
  if (!d) return;
  handedOver = d.id;
  hooks.analyze(d);
}

/**
 * Leaving the detail with an unsaved edit asks once. The guard sits on the route rather than on
 * `beforeunload`, because switching views is the way out a player actually takes.
 * Returns false when it put the route back, so the caller stops.
 */
function guardUnsaved(next: Route): boolean {
  if (!draft) return true;
  const here = `${draft.id ?? "new"}`;
  if (next.view === "decks" && next.deckId === here) return true;
  const saved = decks.find((d) => d.id === draft!.id);
  const dirty = saved
    ? saved.deckText !== draft.text || saved.name !== draft.name.trim() || saved.format !== draft.format
    : Boolean(draft.text.trim() || draft.name.trim());
  if (dirty && !confirm("This deck has changes you have not saved. Leave and lose them?")) {
    go(`#/decks/${encodeURIComponent(here)}`);
    return false;
  }
  draft = null;
  return true;
}

/**
 * A dropped connection reaches here as the raw `TypeError: Failed to fetch` of `fetch` (Safari says
 * "Load failed"), which tells a player nothing and — worse — not whether their list survived. Every
 * write in this file is a single request that either happened or did not, so saying nothing changed
 * is true for all of them.
 */
function readable(err: unknown): string {
  const msg = (err as Error)?.message ?? String(err);
  const offline = err instanceof TypeError || /failed to fetch|load failed|networkerror/i.test(msg);
  return offline ? "Could not reach the server. Nothing was changed — check your connection and try again." : msg;
}

/** Every call that can fail says so in the view instead of only in the console. */
async function guard(fn: () => Promise<void>): Promise<void> {
  try { message = ""; await fn(); }
  catch (err) { message = readable(err); }
  render();
}

function render(): void {
  if (!accountsEnabled || !host || current.view !== "decks") return;
  // The library reads best in a column; the builder needs the width of two.
  host.classList.toggle("building", Boolean(account && current.deckId));
  host.innerHTML = !account ? "" : current.deckId ? detailView(current.deckId) : libraryView();
  if (account && !current.deckId) wireArt(host);
}

/**
 * The one failure `deckCard` cannot see (#177). `image` is in the payload, so the `<img>` is written;
 * whether the CDN answers it is a different question, and a 404 draws the browser's own broken-image
 * glyph — `alt=""` suppresses the alt TEXT, not the icon. The CSP forbids an inline `onerror=`, so
 * the swap to the empty state is a real listener, attached to the images this render just drew.
 */
function wireArt(root: HTMLElement): void {
  root.querySelectorAll<HTMLImageElement>(".deck-card-art img").forEach((img) => {
    img.addEventListener("error", () => {
      const box = img.parentElement;
      if (!box) return;
      box.classList.add("noart");
      box.textContent = "—";
    }, { once: true });
  });
}

// --- the library ----------------------------------------------------------------------

/** How long ago, in the words a player uses. */
function ago(iso: string): string {
  const secs = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  const scale: [number, number, string][] = [
    [60, 1, "second"], [3600, 60, "minute"], [86400, 3600, "hour"],
    [2592000, 86400, "day"], [31536000, 2592000, "month"],
  ];
  const step = scale.find(([limit]) => secs < limit);
  const [, div, unit] = step ?? [0, 31536000, "year"];
  const n = Math.floor(secs / div);
  return n <= 0 ? "just now" : `${n} ${unit}${n === 1 ? "" : "s"} ago`;
}

const DOMAIN_ORDER: Domain[] = ["fury", "calm", "mind", "body", "chaos", "order"];

function libraryView(): string {
  return `<header class="decks-head">
      <div>
        <h1 class="decks-title">My decks</h1>
        <p class="decks-sub">${decks.length ? `${decks.length} saved list${decks.length === 1 ? "" : "s"}, readable only by you.` : "Nothing saved yet."}</p>
      </div>
      <button type="button" class="primary" data-act="new">New deck</button>
    </header>
    <form class="decks-import">
      <label class="field-label" for="decks-url">Import from Piltover Archive</label>
      <div class="url-row">
        <input id="decks-url" type="url" inputmode="url" placeholder="https://piltoverarchive.com/decks/view/…" autocomplete="off" spellcheck="false">
        <button type="submit" class="ghost">Import</button>
      </div>
      <p class="fine">Public decks only. The link is fetched once through this site's own server, and the list is saved to your account under the title Piltover gives it.</p>
    </form>
    <p class="acct-msg" id="decks-msg" role="status" aria-live="polite">${esc(message)}</p>
    ${decks.length
      ? `<div class="deck-grid">${decks.map(deckCard).join("")}</div>`
      : loaded
        ? `<p class="plan-note">Press <strong>New deck</strong> to write one out, or paste a Piltover Archive link above.</p>`
        : `<p class="plan-note">Loading your decks…</p>`}`;
}

/**
 * The window on a legend's art (#177).
 *
 * Riot serves FULL-CARD scans: frame, cost pips, name plate and the whole rules box. A square box
 * with `object-fit: cover` trims only what the box has proportionally less of, and 744x1039 against
 * 1:1 is 28% of the height — not enough to lose a name plate that starts at 64% of the scan. The
 * crop is therefore asked of the image CDN, which takes a `rect=x,y,w,h` in SOURCE pixels, and the
 * source's own size is in its filename (`…-744x1039.png`): a square of side 0.52H taken at 0.05H
 * down is the illustration, measured on the scan rather than on whatever height a tile happens to be.
 *
 * A URL whose filename does not name its size — nothing in today's payload — comes through whole and
 * `object-position` biases it upward. If the CDN ever stops honouring `rect` the answer is the same
 * full card, not a broken tile, and a URL it refuses outright is caught by `wireArt`.
 */
function legendArt(image: string | null | undefined, px: number): string | null {
  const src = thumb(image, px);
  if (!src) return null;
  const size = /-(\d+)x(\d+)\.[a-z]+/i.exec(src);
  if (!size) return src;
  const w = Number(size[1]);
  const h = Number(size[2]);
  const side = Math.round(h * 0.52);
  if (side > w) return src;
  return `${src}&rect=${Math.round((w - side) / 2)},${Math.round(h * 0.05)},${side},${side}`;
}

/**
 * One saved list in the library (#177).
 *
 * It was five lines of the same text in the same shape, so a dozen lists read as one wall and nothing
 * said which was which until you opened it. The legend is what a player calls a list by, so its art
 * leads the tile as a square thumbnail: recognisable at a glance, and already in the payload —
 * `image` is in `scripts/web-card-fields.mjs` and every other view draws it through the same `thumb`.
 *
 * The art is decorative (`alt=""`, and the strip is `aria-hidden`): the legend's name is on the line
 * beside it, so a screen reader that announced the portrait would only repeat it. A deck with no
 * legend, and a legend whose art never arrives, get the thumbnail's own empty state rather than a
 * broken image frame — a dash, which is how this project already renders an empty value (a typeless
 * card's type reads "-", never a blank column). `wireArt` extends that to a URL the CDN refuses.
 *
 * The tile stays ONE link and the thumbnail is not a second target inside it: the art is the same
 * card the legend line names, so a click on either has the same one answer, opening the deck.
 */
function deckCard(d: SavedDeck): string {
  const cards = hooks.cards();
  const deck = loadDeck(d.deckText, cards);
  const report = checkBuild(deck, cards, d.format);
  const card = deck.legend ? cards.get(deck.legend)! : null;
  const legend = card ? card.name.replace(/ - Starter$/, "") : "No legend";
  // A 72px square, so 160 is the width that is sharp on a 2x screen and no wider.
  const art = legendArt(card?.image, 160);
  // The legend has its own line with its domain dots, so the meta line does not repeat it.
  const total = Object.values(deck.main).reduce((a, b) => a + b, 0);
  const dots = (deck.legend ? cards.domainsOf(deck.legend) : [])
    .slice()
    .sort((a, b) => DOMAIN_ORDER.indexOf(a) - DOMAIN_ORDER.indexOf(b))
    .map((dm) => `<span class="dom-dot dom-${esc(dm)}" title="${esc(dm)}"></span>`)
    .join("");
  return `<a class="deck-card" href="#/decks/${encodeURIComponent(d.id)}">
    <span class="deck-card-art${art ? "" : " noart"}" aria-hidden="true">${art ? `<img src="${esc(art)}" alt="" loading="lazy">` : "—"}</span>
    <span class="deck-card-body">
      <span class="deck-card-top">
        <span class="deck-card-name">${esc(d.name)}</span>
        <span class="badge ${report.legal ? "ok" : "bad"}">${report.legal ? "Legal" : "Illegal"}</span>
      </span>
      <span class="deck-card-legend">${dots}${esc(legend)}</span>
      <span class="deck-card-meta">${total} card${total === 1 ? "" : "s"} · ${esc(d.format === "2v2" ? "2v2" : "Constructed")}</span>
      ${whyIllegal(report, deck, d.format)}
      <span class="deck-card-when">Edited ${esc(ago(d.updatedAt))}</span>
    </span>
  </a>`;
}

/**
 * Why the badge says Illegal, in one line, out of the report the card already computed (#93).
 *
 * A grid of 25 lists carried 14 red badges and not one word of a reason, so finding out what was wrong
 * with the library meant opening 14 decks. The rows were right there: `checkBuild` returns nine of them
 * and this card was using `report.legal` alone. Nothing is reworded — the failing row's own `label` and
 * paragraph are what a player then reads again, identically, inside Construction.
 *
 * A legal list gets the row anyway, empty (#177). It used to return "" and the tile lost a line, so a
 * row of the grid held three tiles of three heights and each art crop landed on a different window.
 * The row is reserved in CSS (`.deck-card-why` has a min-height); an empty span announces nothing.
 */
function whyIllegal(report: BuildReport, deck: Deck, format: Format): string {
  const broken = report.rules.filter((r) => r.status === "fail");
  if (!broken.length) return `<span class="deck-card-why"></span>`;
  const first = broken[0]!;
  const more = broken.length > 1 ? ` · +${broken.length - 1} more` : "";
  // The ban row names its cards but not the date they went on the list, and that date is the whole
  // answer for a list registered at an event: 14 of the 25 lists Riot published were legal the day
  // they were played and lost a card in July. `deckRestrictions` is the same call `legalityRule`
  // makes, so this reads the date off the row rather than deciding anything new about it.
  if (first.rule === LEGALITY_RULE) {
    const banned = deckRestrictions(deck, hooks.cards(), format).filter((r) => r.entry.status === "banned");
    const one = banned[0];
    if (one) {
      const rest = banned.length > 1 ? ` · +${banned.length - 1} more` : more;
      return `<span class="deck-card-why">${esc(one.entry.name)} banned since ${esc(one.entry.since)}${esc(rest)}</span>`;
    }
  }
  return `<span class="deck-card-why">${esc(first.detail)} · <span class="mono">${esc(first.rule)}</span>${esc(more)}</span>`;
}

/**
 * Fetch, serialise and save in one press, then open the new deck. The row still stores `deck_text` —
 * importing changes where the text came from, not the schema.
 */
async function importFromPiltover(): Promise<void> {
  if (!account) return;
  const url = $<HTMLInputElement>("#decks-url").value.trim();
  if (!url) { message = "Paste a Piltover Archive deck link first."; return; }
  const res = await fetch(`/api/deck-url?url=${encodeURIComponent(url)}`);
  const payload = (await res.json().catch(() => ({}))) as { entries?: DeckEntry[]; title?: string; error?: string };
  if (!res.ok || !payload.entries) throw new Error(payload.error ?? "Could not read that deck.");
  const text = deckToText(payload.entries, hooks.cards());
  const check = checkSave(payload.title || "Imported deck", text, decks);
  if (!check.ok) { message = check.message; return; }
  const created = await createDeck(account.id, check.name, text, "constructed");
  decks = sortSaved([created, ...decks]);
  go(`#/decks/${encodeURIComponent(created.id)}`);
}

// --- the detail -----------------------------------------------------------------------

function detailView(id: string): string {
  const saved = id === "new" ? null : decks.find((d) => d.id === id) ?? null;
  if (id !== "new" && !saved) {
    // Deleted in another browser, or a stale link. Say so instead of drawing an empty editor. Before the
    // first listDecks() answers we do not know which of the two it is, so we do not claim either.
    if (!loaded) return `<p class="plan-note">Opening that deck…</p>`;
    message = "That deck is not in your account any more.";
    queueMicrotask(() => go("#/decks"));
    return "";
  }
  if (!draft || draft.id !== (saved?.id ?? null)) {
    const handoff = saved ? null : sessionStorage.getItem(HANDOFF);
    if (handoff !== null) sessionStorage.removeItem(HANDOFF);
    draft = {
      id: saved?.id ?? null,
      name: saved?.name ?? "",
      text: saved?.deckText ?? handoff ?? "",
      format: saved?.format ?? "constructed",
    };
    confirmingDelete = false;
    copied = false;
    openList(draft.text);
  }

  return `<nav class="detail-back"><a href="#/decks">← My decks</a></nav>
  <div class="detail-top">
    <input id="deck-name" class="detail-name" type="text" maxlength="${MAX_NAME}" autocomplete="off" spellcheck="false"
      placeholder="Name this deck" aria-label="Deck name" value="${esc(draft.name)}">
    <fieldset class="segmented small" aria-label="Format">
      <label><input type="radio" name="deck-format" value="constructed"${draft.format === "constructed" ? " checked" : ""}><span>Constructed</span></label>
      <label><input type="radio" name="deck-format" value="2v2"${draft.format === "2v2" ? " checked" : ""}><span>2v2</span></label>
    </fieldset>
  </div>
  <p class="notice">Nothing is written to your account until you press ${saved ? "Update" : "Save"}. There is no auto-save.</p>
  <p class="acct-msg" id="decks-msg" role="status" aria-live="polite">${esc(message)}</p>
  ${builderHtml(actions(), barActions())}`;
}

const dirtyNow = (): boolean => {
  if (!draft) return false;
  const saved = decks.find((d) => d.id === draft!.id);
  if (!saved) return Boolean(draft.text.trim() || draft.name.trim());
  return saved.deckText !== draft.text || saved.name !== draft.name.trim() || saved.format !== draft.format;
};

function actions(): string {
  if (!draft) return "";
  const saved = decks.find((d) => d.id === draft!.id);
  const hasText = Boolean(draft.text.trim());
  return `<button type="button" class="primary" data-act="save"${dirtyNow() ? "" : " disabled"}>${saved ? "Update" : "Save"}</button>
    <button type="button" class="ghost" data-act="analyze"${hasText ? "" : " disabled"}>Analyze combos</button>
    <button type="button" class="ghost" data-act="export"${hasText ? "" : " disabled"}>${copied ? "Copied" : "Export deck code"}</button>
    <button type="button" class="ghost" data-act="import">Import</button>
    ${saved
      ? confirmingDelete
        ? `<button type="button" class="linklike danger" data-act="delete-confirm">Delete for good</button>
           <button type="button" class="linklike" data-act="delete-cancel">Keep</button>`
        : `<button type="button" class="linklike danger" data-act="delete">Delete</button>`
      : ""}`;
}

/**
 * The same three non-destructive actions, compact, for the fixed bar below 900px (#127). Below
 * that width `.bld-deck` — and `.detail-acts` inside it — is hidden on the Pool tab, which used to
 * leave a player who arrives with a list to paste unable to find Import without switching tabs
 * first. These ride in `.bld-bar` next to Save, so all three are one tap away from either tab; the
 * `data-act` values are the same ones `onClick` below already switches on, so no new wiring is
 * needed for the click itself, only for keeping this second copy in sync with the first.
 */
function barActions(): string {
  if (!draft) return "";
  const hasText = Boolean(draft.text.trim());
  return `<button type="button" class="ghost" data-act="analyze"${hasText ? "" : " disabled"}>Analyze</button>
    <button type="button" class="ghost" data-act="export"${hasText ? "" : " disabled"}>${copied ? "Copied" : "Export"}</button>
    <button type="button" class="ghost" data-act="import">Import</button>`;
}

/** The buttons and the message line, which is all this file still draws inside the editor. */
function refreshActions(): void {
  const acts = maybe<HTMLElement>("#detail-acts");
  if (acts) acts.innerHTML = actions();
  const barActs = maybe<HTMLElement>("#bld-bar-acts");
  if (barActs) barActs.innerHTML = barActions();
  const msg = maybe<HTMLElement>("#decks-msg");
  if (msg) msg.textContent = message;
}

/** Everything that reads the draft, WITHOUT touching the name box. */
function refresh(): void {
  refreshActions();
  refreshBuilder();
}

function onInput(ev: Event): void {
  const t = ev.target as HTMLElement;
  if (!draft) return;
  if (t.id === "deck-name") { draft.name = (t as HTMLInputElement).value; copied = false; refreshActions(); }
}

function onChange(ev: Event): void {
  const t = ev.target as HTMLInputElement;
  // The format scopes the ban marks in the pool and the legality row of Construction, so the whole
  // builder is redrawn rather than only the buttons.
  if (draft && t.name === "deck-format") { draft.format = t.value as Format; refresh(); }
}

function onClick(ev: Event): void {
  const el = (ev.target as Element).closest<HTMLElement>("[data-act]");
  if (!el) return;
  ev.preventDefault();
  switch (el.dataset["act"]) {
    case "new": go("#/decks/new"); return;
    case "save": void guard(saveDraft); return;
    case "analyze": analyzeDraft(); return;
    case "export": void guard(exportCode); return;
    case "import": openImport(); return;
    case "delete": confirmingDelete = true; refreshActions(); return;
    case "delete-cancel": confirmingDelete = false; refreshActions(); return;
    case "delete-confirm": void guard(removeDraft); return;
  }
}

async function saveDraft(): Promise<void> {
  if (!account || !draft) return;
  const check = checkSave(draft.name, draft.text, decks, draft.id ?? undefined);
  if (!check.ok) { message = check.message; return; }
  if (draft.id) {
    const updated = await updateDeck(draft.id, { name: check.name, deckText: draft.text, format: draft.format });
    decks = sortSaved(decks.map((d) => (d.id === updated.id ? updated : d)));
    draft = { id: updated.id, name: updated.name, text: updated.deckText, format: updated.format };
    message = `Updated "${updated.name}".`;
  } else {
    const created = await createDeck(account.id, check.name, draft.text, draft.format);
    decks = sortSaved([created, ...decks]);
    draft = { id: created.id, name: created.name, text: created.deckText, format: created.format };
    message = `Saved "${created.name}".`;
    go(`#/decks/${encodeURIComponent(created.id)}`);
  }
}

/** An unsaved edit is still worth analysing, so Combos is handed the text under the name being edited. */
function analyzeDraft(): void {
  if (!draft) return;
  const saved = decks.find((d) => d.id === draft!.id);
  const handing = saved && saved.deckText === draft.text
    ? saved
    : { id: draft.id ?? "", name: draft.name.trim() || "This list", deckText: draft.text, format: draft.format, createdAt: "", updatedAt: "" };
  handedOver = handing.id || null;
  hooks.analyze(handing);
}

async function exportCode(): Promise<void> {
  if (!draft) return;
  const code = encodeDeckCode(loadDeck(draft.text, hooks.cards()));
  await navigator.clipboard.writeText(code);
  copied = true;
  message = "Deck code copied to the clipboard.";
}

async function removeDraft(): Promise<void> {
  const id = draft?.id;
  if (!id) return;
  await deleteDeck(id);
  decks = decks.filter((d) => d.id !== id);
  draft = null;
  confirmingDelete = false;
  go("#/decks");
}
