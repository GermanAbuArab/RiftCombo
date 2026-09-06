// The account layer (#31, #39): sign in with Google, and say who is signed in. Since #43 the saved lists
// live in their own view (web/decks.ts) rather than in a panel under the deck input, so this file is only
// the session: `gate()` marks <body data-auth> as soon as the session is known and the stylesheet shows
// either the entrance or the app; the header shows the name and the way out. A build with no Supabase
// project configured has no gate to open, so it marks the body "open" and behaves as before.

import { accountsEnabled, deleteAccount, onAccount, signIn, signOut, type Account } from "./supabase.js";

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;

let account: Account | null = null;
/** Deleting the account is two clicks, and it is never the default one. */
let closing = false;
let message = "";

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
  }
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
      : `<p class="acct-foot"><button type="button" class="linklike" data-act="close">Delete account</button> · <a href="/privacy">Privacy</a></p>`;
  $<HTMLElement>("#account-msg").textContent = message;
}
