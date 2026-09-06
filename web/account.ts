// The account layer of the deck panel (#31): sign in with Google, save the list you pasted, and
// load one back. Everything here is additive — with no session, and in a build with no Supabase
// project configured, the panel is hidden and the rest of the app behaves exactly as before.

import { checkSave, savedSummary, sortSaved, suggestName, MAX_NAME, type SavedDeck } from "../src/saved.js";
import type { CardIndex } from "../src/cards.js";
import type { Format } from "../src/types.js";
import { accountsEnabled, accountOf, createDeck, deleteDeck, listDecks, onAccount, signIn, signOut, updateDeck, type Account } from "./supabase.js";

export interface AccountHooks {
  /** The list currently in the textarea, exactly as the player typed or pasted it. */
  deckText(): string;
  format(): Format;
  /** Put a saved list back in the textarea, in its own format, and match it. */
  restore(deckText: string, format: Format): void;
  cards(): CardIndex;
}

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

let hooks: AccountHooks;
let account: Account | null = null;
let decks: SavedDeck[] = [];
/** The saved deck the textarea was last filled from, so Save can offer to update it. */
let loadedId: string | null = null;
let renaming: string | null = null;
let confirming: string | null = null;
let message = "";

export function initAccount(h: AccountHooks): void {
  if (!accountsEnabled) return;
  hooks = h;
  $<HTMLElement>("#account-top").hidden = false;
  $<HTMLButtonElement>("#acct-signin").addEventListener("click", () => void guard(signIn));
  $<HTMLButtonElement>("#acct-signout").addEventListener("click", () => void guard(async () => {
    await signOut();
    // Signing out empties the list in memory too. Leaving the rows on screen would show one
    // player's decks to whoever sits down next.
    decks = []; loadedId = null;
  }));
  $<HTMLElement>("#account-body").addEventListener("click", onPanelClick);
  onAccount((next) => {
    account = next;
    if (account) void guard(async () => { decks = sortSaved(await listDecks()); });
    else { decks = []; loadedId = null; render(); }
  });
  render();
}

/** Every call that can fail says so in the panel instead of only in the console. */
async function guard(fn: () => Promise<void>): Promise<void> {
  try { message = ""; await fn(); }
  catch (err) { message = (err as Error).message; }
  render();
}

function onPanelClick(ev: Event): void {
  const el = (ev.target as Element).closest<HTMLElement>("[data-act]");
  if (!el) return;
  const id = el.dataset["id"] ?? "";
  switch (el.dataset["act"]) {
    case "signin": void guard(signIn); return;
    case "save": void guard(save); return;
    case "load": {
      const d = decks.find((x) => x.id === id);
      if (d) { loadedId = d.id; message = ""; hooks.restore(d.deckText, d.format); render(); }
      return;
    }
    case "overwrite": void guard(() => overwrite(id)); return;
    case "rename": renaming = id; confirming = null; render(); focusInput("#acct-rename"); return;
    case "rename-cancel": renaming = null; render(); return;
    case "rename-save": void guard(() => rename(id)); return;
    case "delete": confirming = id; renaming = null; render(); return;
    case "delete-cancel": confirming = null; render(); return;
    case "delete-confirm": void guard(() => remove(id)); return;
  }
}

const focusInput = (sel: string) => {
  const el = document.querySelector<HTMLInputElement>(sel);
  if (el) { el.focus(); el.select(); }
};

async function save(): Promise<void> {
  if (!account) return;
  const text = hooks.deckText();
  const check = checkSave($<HTMLInputElement>("#acct-name").value, text, decks);
  if (!check.ok) { message = check.message; return; }
  const created = await createDeck(account.id, check.name, text, hooks.format());
  decks = sortSaved([created, ...decks]);
  loadedId = created.id;
  message = `Saved "${created.name}".`;
}

async function overwrite(id: string): Promise<void> {
  const target = decks.find((d) => d.id === id);
  if (!target) return;
  const updated = await updateDeck(id, { deckText: hooks.deckText(), format: hooks.format() });
  decks = sortSaved(decks.map((d) => (d.id === id ? updated : d)));
  message = `Updated "${updated.name}".`;
}

async function rename(id: string): Promise<void> {
  const raw = $<HTMLInputElement>("#acct-rename").value;
  const check = checkSave(raw, decks.find((d) => d.id === id)?.deckText ?? "x", decks, id);
  if (!check.ok) { message = check.message; return; }
  const updated = await updateDeck(id, { name: check.name });
  decks = sortSaved(decks.map((d) => (d.id === id ? updated : d)));
  renaming = null;
}

async function remove(id: string): Promise<void> {
  await deleteDeck(id);
  decks = decks.filter((d) => d.id !== id);
  if (loadedId === id) loadedId = null;
  confirming = null;
}

function render(): void {
  if (!accountsEnabled) return;
  const panel = $<HTMLElement>("#account");
  const body = $<HTMLElement>("#account-body");
  $<HTMLButtonElement>("#acct-signin").hidden = account !== null;
  $<HTMLElement>("#acct-who").hidden = account === null;
  $<HTMLElement>("#acct-label").textContent = account?.label ?? "";
  panel.hidden = false;

  body.innerHTML = account ? signedIn() : signedOut();
  $<HTMLElement>("#account-msg").textContent = message;
  if (account && !renaming) {
    const input = $<HTMLInputElement>("#acct-name");
    if (!input.value) input.value = suggestName(hooks.deckText(), hooks.cards(), decks);
  }
}

function signedOut(): string {
  return `<p class="acct-note">Sign in to keep your lists and open them from any browser. Nothing is stored until you press Save.</p>
    <button type="button" class="ghost acct-google" data-act="signin">Sign in with Google</button>`;
}

function signedIn(): string {
  const loaded = decks.find((d) => d.id === loadedId);
  const changed = loaded && loaded.deckText !== hooks.deckText();
  return `<div class="acct-save">
      <input id="acct-name" type="text" maxlength="${MAX_NAME}" autocomplete="off" spellcheck="false" aria-label="Name for this deck" placeholder="Name this deck">
      <button type="button" class="ghost" data-act="save">Save</button>
    </div>
    ${changed ? `<p class="acct-note">This list no longer matches <strong>${esc(loaded.name)}</strong> as saved. <button type="button" class="linklike" data-act="overwrite" data-id="${esc(loaded.id)}">Update it</button> or save the new one under its own name.</p>` : ""}
    ${decks.length ? decks.map(deckRow).join("") : `<p class="acct-note">No saved decks yet.</p>`}`;
}

function deckRow(d: SavedDeck): string {
  if (renaming === d.id) {
    return `<div class="acct-row">
      <input id="acct-rename" type="text" maxlength="${MAX_NAME}" value="${esc(d.name)}" aria-label="New name" autocomplete="off">
      <div class="acct-acts">
        <button type="button" class="linklike" data-act="rename-save" data-id="${esc(d.id)}">Save name</button>
        <button type="button" class="linklike" data-act="rename-cancel">Cancel</button>
      </div>
    </div>`;
  }
  const acts = confirming === d.id
    ? `<button type="button" class="linklike danger" data-act="delete-confirm" data-id="${esc(d.id)}">Delete for good</button>
       <button type="button" class="linklike" data-act="delete-cancel">Keep</button>`
    : `<button type="button" class="linklike" data-act="load" data-id="${esc(d.id)}">Load</button>
       <button type="button" class="linklike" data-act="rename" data-id="${esc(d.id)}">Rename</button>
       <button type="button" class="linklike" data-act="delete" data-id="${esc(d.id)}">Delete</button>`;
  return `<div class="acct-row${loadedId === d.id ? " on" : ""}">
    <div class="acct-meta">
      <p class="acct-name">${esc(d.name)}</p>
      <p class="acct-sum">${esc(savedSummary(d.deckText, hooks.cards()))} · ${esc(d.format === "2v2" ? "2v2" : "Constructed")}</p>
    </div>
    <div class="acct-acts">${acts}</div>
  </div>`;
}

/** The textarea changed under us, so the "this no longer matches" line has to be recomputed. */
export function accountDeckChanged(): void {
  if (accountsEnabled && account) render();
}
