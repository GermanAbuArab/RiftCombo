// My decks (#43): the library of saved lists, and the detail that edits one.
//
// Everything that can answer without a network lives in src/ and has tests — src/saved.ts for names and
// ordering, src/build.ts for the construction rules, src/deck.ts for parsing, serialising and encoding.
// This file is the DOM around them.
//
// The editor re-renders the validation column on every keystroke but never the textarea itself: replacing
// the box somebody is typing into loses the caret, the undo history and any IME composition in flight.

import { checkBuild, type BuildRule } from "../src/build.js";
import { deckToText, encodeDeckCode, loadDeck, type DeckEntry } from "../src/deck.js";
import { checkSave, savedSummary, sortSaved, MAX_NAME, type SavedDeck } from "../src/saved.js";
import type { CardIndex } from "../src/cards.js";
import type { Domain, Format } from "../src/types.js";
import { accountsEnabled, createDeck, deleteDeck, listDecks, onAccount, updateDeck, type Account } from "./supabase.js";
import { go, onRoute, type Route } from "./router.js";

export interface DeckHooks {
  cards(): CardIndex;
  /** Open Combos with this list loaded, and name it in the strip above the deck input. */
  analyze(deck: SavedDeck): void;
}

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const maybe = <T extends Element>(sel: string) => document.querySelector<T>(sel);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

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
    // The import row is a form so Enter in the URL box works; it must never reload the page.
    ev.preventDefault();
    void guard(importFromPiltover);
  });
  host.addEventListener("input", onInput);
  host.addEventListener("change", onChange);

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

/** Every call that can fail says so in the view instead of only in the console. */
async function guard(fn: () => Promise<void>): Promise<void> {
  try { message = ""; await fn(); }
  catch (err) { message = (err as Error).message; }
  render();
}

function render(): void {
  if (!accountsEnabled || !host || current.view !== "decks") return;
  host.innerHTML = !account ? "" : current.deckId ? detailView(current.deckId) : libraryView();
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
    <p class="acct-msg" id="decks-msg">${esc(message)}</p>
    ${decks.length
      ? `<div class="deck-grid">${decks.map(deckCard).join("")}</div>`
      : loaded
        ? `<p class="plan-note">Press <strong>New deck</strong> to write one out, or paste a Piltover Archive link above.</p>`
        : `<p class="plan-note">Loading your decks…</p>`}`;
}

function deckCard(d: SavedDeck): string {
  const cards = hooks.cards();
  const deck = loadDeck(d.deckText, cards);
  const report = checkBuild(deck, cards, d.format);
  const legend = deck.legend ? cards.get(deck.legend)!.name.replace(/ - Starter$/, "") : "No legend";
  const dots = (deck.legend ? cards.domainsOf(deck.legend) : [])
    .slice()
    .sort((a, b) => DOMAIN_ORDER.indexOf(a) - DOMAIN_ORDER.indexOf(b))
    .map((dm) => `<span class="dom-dot dom-${esc(dm)}" title="${esc(dm)}"></span>`)
    .join("");
  return `<a class="deck-card" href="#/decks/${encodeURIComponent(d.id)}">
    <span class="deck-card-top">
      <span class="deck-card-name">${esc(d.name)}</span>
      <span class="badge ${report.legal ? "ok" : "bad"}">${report.legal ? "Legal" : "Illegal"}</span>
    </span>
    <span class="deck-card-legend">${dots}${esc(legend)}</span>
    <span class="deck-card-meta">${esc(savedSummary(d.deckText, cards))} · ${esc(d.format === "2v2" ? "2v2" : "Constructed")}</span>
    <span class="deck-card-when">Edited ${esc(ago(d.updatedAt))}</span>
  </a>`;
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
    // Deleted in another browser, or a stale link. Say so instead of drawing an empty editor.
    if (loaded) { message = "That deck is not in your account any more."; queueMicrotask(() => go("#/decks")); }
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
  }

  return `<nav class="detail-back"><a href="#/decks">← My decks</a></nav>
  <div class="detail">
    <section class="detail-edit">
      <input id="deck-name" class="detail-name" type="text" maxlength="${MAX_NAME}" autocomplete="off" spellcheck="false"
        placeholder="Name this deck" aria-label="Deck name" value="${esc(draft.name)}">
      <fieldset class="segmented small" aria-label="Format">
        <label><input type="radio" name="deck-format" value="constructed"${draft.format === "constructed" ? " checked" : ""}><span>Constructed</span></label>
        <label><input type="radio" name="deck-format" value="2v2"${draft.format === "2v2" ? " checked" : ""}><span>2v2</span></label>
      </fieldset>
      <textarea id="deck-text" rows="18" spellcheck="false" autocomplete="off"
        placeholder="Legend&#10;1 Lady of Luminosity - Starter&#10;&#10;Champion&#10;1 Lux, Illuminated&#10;&#10;Main Deck&#10;3 Forge of the Future&#10;…&#10;&#10;or a deck code: CMAAAAAAAAAACAQAABM5MAIA…">${esc(draft.text)}</textarea>
      <p class="fine" id="deck-summary">${esc(summaryLine())}</p>
      <p class="notice">Nothing is written to your account until you press ${saved ? "Update" : "Save"}. There is no auto-save.</p>
      <div class="detail-acts" id="detail-acts">${actions()}</div>
      <p class="acct-msg" id="decks-msg">${esc(message)}</p>
    </section>
    <aside class="detail-check">
      <h2 class="plan-head">Construction</h2>
      ${checkPanel()}
      <p class="fine">Every row cites the paragraph it stands on, in Riot's Core Rules of 2026-07-16 and the Tournament Rules of the same date. A row marked <strong>unchecked</strong> is a rule this site can state but cannot verify from Riot's card data.</p>
    </aside>
  </div>`;
}

const summaryLine = (): string => {
  if (!draft?.text.trim()) return "Plain lists, Piltover Archive exports, TTS dumps and deck codes all work.";
  return `${savedSummary(draft.text, hooks.cards())} · plain lists, Piltover Archive exports, TTS dumps and deck codes all work.`;
};

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
    ${saved
      ? confirmingDelete
        ? `<button type="button" class="linklike danger" data-act="delete-confirm">Delete for good</button>
           <button type="button" class="linklike" data-act="delete-cancel">Keep</button>`
        : `<button type="button" class="linklike danger" data-act="delete">Delete</button>`
      : ""}`;
}

const STATUS_WORD: Record<BuildRule["status"], string> = { pass: "ok", fail: "fix", unknown: "unchecked" };

function checkPanel(): string {
  if (!draft) return "";
  const cards = hooks.cards();
  const report = checkBuild(loadDeck(draft.text, cards), cards, draft.format);
  const rows = report.rules.map((r) => `<div class="build-row ${r.status}">
      <p class="build-label">${esc(r.label)}<span class="build-rule">${esc(r.rule)}</span></p>
      <span class="build-state">${STATUS_WORD[r.status]}</span>
      <p class="build-detail">${esc(r.detail)}</p>
    </div>`).join("");
  return `<p class="build-badge ${report.legal ? "ok" : "bad"}" id="build-badge">${report.legal ? "Legal" : "Illegal"}<span>${draft.format === "2v2" ? "2v2" : "Constructed"}</span></p>
    <div class="build-rows">${rows}</div>`;
}

/** Update everything that reads the draft, WITHOUT touching the name box or the textarea. */
function refresh(): void {
  const acts = maybe<HTMLElement>("#detail-acts");
  if (acts) acts.innerHTML = actions();
  const summary = maybe<HTMLElement>("#deck-summary");
  if (summary) summary.textContent = summaryLine();
  const check = maybe<HTMLElement>(".detail-check");
  if (check) {
    const badge = check.querySelector("#build-badge");
    const rows = check.querySelector(".build-rows");
    badge?.remove();
    rows?.remove();
    check.querySelector("h2")!.insertAdjacentHTML("afterend", checkPanel());
  }
  const msg = maybe<HTMLElement>("#decks-msg");
  if (msg) msg.textContent = message;
}

function onInput(ev: Event): void {
  const t = ev.target as HTMLElement;
  if (!draft) return;
  if (t.id === "deck-name") { draft.name = (t as HTMLInputElement).value; copied = false; refresh(); }
  if (t.id === "deck-text") { draft.text = (t as HTMLTextAreaElement).value; copied = false; refresh(); }
}

function onChange(ev: Event): void {
  const t = ev.target as HTMLInputElement;
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
    case "delete": confirmingDelete = true; refresh(); return;
    case "delete-cancel": confirmingDelete = false; refresh(); return;
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
