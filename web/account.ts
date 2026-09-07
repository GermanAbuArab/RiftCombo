// The account layer (#31, #39): sign in with Google, and say who is signed in. Since #43 the saved lists
// live in their own view (web/decks.ts) rather than in a panel under the deck input, so this file is only
// the session: `gate()` marks <body data-auth> as soon as the session is known and the stylesheet shows
// either the entrance or the app; the header shows the name and the way out. A build with no Supabase
// project configured has no gate to open, so it marks the body "open" and behaves as before.

import { esc } from "../src/html.js";
import { accountsEnabled, deleteAccount, onAccount, signIn, signOut, updateDisplayName, type Account } from "./supabase.js";

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const maybe = <T extends Element>(sel: string) => document.querySelector<T>(sel);

let account: Account | null = null;
/** Deleting the account is two clicks, and it is never the default one. */
let closing = false;
/** The rename field is opt-in: the header is read-only until the player asks to change it (#178). */
let renaming = false;
let message = "";

/** Mirrors the deck-name cap in `src/saved.ts`; this one is only ever shown to its owner. */
export const MAX_DISPLAY_NAME = 40;

/**
 * What a display name may be (#178). Trimmed, inner runs of whitespace collapsed, capped — the same
 * treatment `normalizeName` gives a deck name. Whitespace alone normalises to "", which is not stored
 * as a name at all: it CLEARS the override, and the header falls back to the name Google supplied.
 */
export function normalizeDisplayName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_DISPLAY_NAME);
}

/**
 * Decide what the visitor sees, before anything else loads. "pending" (the HTML default) shows
 * neither the app nor the entrance, so the page never flashes one and then swaps to the other;
 * supabase-js reports the initial session — including the one it just exchanged a `?code=` for —
 * through the same listener as later changes.
 */
export function gate(): void {
  if (!accountsEnabled) { document.body.dataset["auth"] = "open"; return; }
  $<HTMLButtonElement>("#gate-signin").addEventListener("click", () => void signIn());
  onAccount((next) => { document.body.dataset["auth"] = next ? "in" : "out"; });
}

export function initAccount(): void {
  if (!accountsEnabled) return;
  $<HTMLElement>("#account-top").hidden = false;
  $<HTMLButtonElement>("#acct-signout").addEventListener("click", () => void guard(signOut));
  $<HTMLElement>("#account-body").addEventListener("click", onPanelClick);
  $<HTMLElement>("#account-body").addEventListener("submit", onRename);
  onAccount((next) => { account = next; render(); });
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
  switch (el.dataset["act"]) {
    case "close": closing = true; render(); return;
    case "close-cancel": closing = false; render(); return;
    case "close-confirm": void guard(async () => { await deleteAccount(); closing = false; }); return;
    case "rename": renaming = true; message = ""; render(); maybe<HTMLInputElement>("#acct-name")?.focus(); return;
    case "rename-cancel": renaming = false; message = ""; render(); return;
  }
}

/**
 * Save the new name. The field is a boundary — it is typed by a person — so the value is normalised
 * here and an empty one is written as `null`, which removes the override rather than blanking the
 * header. The account is set from what the call returns, so the panel and the header are right
 * whether or not supabase-js also reports the change through the session listener.
 */
function onRename(ev: Event): void {
  ev.preventDefault();
  const field = maybe<HTMLInputElement>("#acct-name");
  if (!field) return;
  const name = normalizeDisplayName(field.value);
  void guard(async () => {
    account = await updateDisplayName(name || null);
    renaming = false;
    message = name ? `You are now ${name}.` : "Back to the name on your Google account.";
  });
}

function render(): void {
  if (!accountsEnabled) return;
  $<HTMLElement>("#acct-who").hidden = account === null;
  $<HTMLElement>("#acct-label").textContent = account?.label ?? "";
  // Without a session the entrance is on screen and the deck panel is not, so there is nothing to draw.
  $<HTMLElement>("#account").hidden = account === null;
  $<HTMLElement>("#account-body").innerHTML = !account
    ? ""
    : closing
      ? `<p class="acct-note">Deleting the account removes it and every deck saved to it at once, with nothing kept. <button type="button" class="linklike danger" data-act="close-confirm">Delete for good</button> · <button type="button" class="linklike" data-act="close-cancel">Keep it</button></p>`
      : renaming
        ? renameForm(account)
        : `<p class="acct-foot"><button type="button" class="linklike" data-act="rename">Change name</button> · <button type="button" class="linklike" data-act="close">Delete account</button> · <a href="/privacy">Privacy</a></p>`;
  $<HTMLElement>("#account-msg").textContent = message;
}

/**
 * The rename field (#178). It lives in the Account panel, not inline in the header: the header is a
 * strip that already carries the format switch and collapses to a two-row grid under 720px, and this
 * panel is where the rest of the account already is (Delete account, Privacy) with the one status
 * line — `#account-msg`, which is `aria-live` — that says whether the write landed.
 *
 * The field is prefilled with the player's OWN name only, so the placeholder can show what the header
 * reads today, and clearing the field is the documented way back to the Google one.
 *
 * Both actions sit in the field's own row. Cancel used to trail the help sentence, where it read as a
 * word in the paragraph rather than as something to press; beside Save it is plainly an action, and
 * the weights say which is which — Save is the bordered one, Cancel is plain text.
 */
function renameForm(who: Account): string {
  return `<form class="acct-name-form">
    <label class="field-label" for="acct-name">Display name</label>
    <div class="url-row">
      <input id="acct-name" class="field-input" type="text" maxlength="${MAX_DISPLAY_NAME}" autocomplete="off"
        value="${esc(who.displayName)}" placeholder="${esc(who.label)}">
      <button type="submit" class="ghost">Save</button>
      <button type="button" class="linklike" data-act="rename-cancel">Cancel</button>
    </div>
    <p class="fine">Only you see this. Leave it empty to go back to the name on your Google account.</p>
  </form>`;
}
