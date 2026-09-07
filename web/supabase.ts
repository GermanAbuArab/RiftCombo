// The only file that talks to Supabase. Everything here needs a network and a signed-in user, which
// is why the parts that can be decided without one live in `src/saved.ts` and have tests.
//
// Auth uses the REDIRECT flow, never a popup: `vercel.json` sends
// `Cross-Origin-Opener-Policy: same-origin`, which severs a popup from the window that opened it, so
// a popup sign-in would hang forever without printing an error. A redirect needs no header change.

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { fromRow, type DeckRow, type SavedDeck } from "../src/saved.js";
import type { Format } from "../src/types.js";

// esbuild substitutes both at build time from the environment (see scripts/build-web.mjs). They are
// public by design — the anon key ships inside every Supabase browser bundle — and what keeps one
// player out of another's rows is RLS in the database, not the key being secret. Supabase's
// privileged server key is a different thing entirely and never reaches this directory; a test
// asserts as much, so do not name it here either.
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

const URL_ = typeof __SUPABASE_URL__ === "string" ? __SUPABASE_URL__ : "";
const ANON = typeof __SUPABASE_ANON_KEY__ === "string" ? __SUPABASE_ANON_KEY__ : "";

/** A build without the two variables set has no account layer at all, and the rest of the app is untouched. */
export const accountsEnabled = Boolean(URL_ && ANON);

let client: SupabaseClient | null = null;
function db(): SupabaseClient {
  client ??= createClient(URL_, ANON, {
    auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
  });
  return client;
}

export interface Account {
  id: string;
  /** What to call the player in the header. Google always gives us one of these. */
  label: string;
  /** The name the player chose for themselves (#178), "" while they are using the provider's. */
  displayName: string;
}

export function accountOf(session: Session | null): Account | null {
  if (!session) return null;
  const meta = session.user.user_metadata as { display_name?: string; full_name?: string; name?: string } | null;
  // `display_name` is the player's own (#178) and wins; the rest is what the provider sent, which is
  // what an empty display name falls back to.
  const chosen = meta?.display_name || "";
  return {
    id: session.user.id,
    label: chosen || meta?.full_name || meta?.name || session.user.email || "Signed in",
    displayName: chosen,
  };
}

/**
 * Rename the player (#178). It writes to the user's OWN `user_metadata`, which the session already
 * carries, so there is no table, no migration and no policy to change — `scripts/check-rls.mjs` is
 * untouched by this.
 *
 * The key is `display_name` and deliberately NOT `full_name`: `full_name` is what Google supplied,
 * Supabase re-merges the provider's identity into the metadata on every sign-in, and overwriting it
 * would both destroy the name an empty value is supposed to fall back to and be undone by the next
 * sign-in. `null` clears the override, which is how the fallback is reached.
 */
export async function updateDisplayName(name: string | null): Promise<Account> {
  const { data, error } = await db().auth.updateUser({ data: { display_name: name } });
  if (error) throw new Error(error.message);
  return accountOf({ user: data.user } as Session)!;
}

/** Fires once with the session restored from storage, then on every sign-in and sign-out. */
export function onAccount(cb: (account: Account | null) => void): void {
  db().auth.onAuthStateChange((_event, session) => cb(accountOf(session)));
}

export async function signIn(): Promise<void> {
  // Land back on the page itself with no hash: a `#deck=` left over from a deck code would be
  // re-analysed on return, which is not what pressing sign-in asked for.
  const { error } = await db().auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${location.origin}${location.pathname}` },
  });
  if (error) throw new Error(error.message);
}

export async function signOut(): Promise<void> {
  const { error } = await db().auth.signOut();
  if (error) throw new Error(error.message);
}

/** Postgres says 23505 when the (user_id, lower(name)) index rejects a second deck of that name. */
const readable = (error: { code?: string; message: string }, name: string): Error =>
  new Error(error.code === "23505" ? `You already have a deck called "${name}".` : error.message);

export async function listDecks(): Promise<SavedDeck[]> {
  const { data, error } = await db().from("decks")
    .select("id,name,deck_text,format,created_at,updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as DeckRow[]).map(fromRow);
}

export async function createDeck(userId: string, name: string, deckText: string, format: Format): Promise<SavedDeck> {
  // user_id is sent explicitly because the insert policy checks `auth.uid() = user_id`: a row
  // claiming somebody else's id is refused by the database, not by this function.
  const { data, error } = await db().from("decks")
    .insert({ user_id: userId, name, deck_text: deckText, format })
    .select("id,name,deck_text,format,created_at,updated_at").single();
  if (error) throw readable(error, name);
  return fromRow(data as DeckRow);
}

export async function updateDeck(id: string, patch: { name?: string; deckText?: string; format?: Format }): Promise<SavedDeck> {
  const row: Record<string, string> = {};
  if (patch.name !== undefined) row["name"] = patch.name;
  if (patch.deckText !== undefined) row["deck_text"] = patch.deckText;
  if (patch.format !== undefined) row["format"] = patch.format;
  const { data, error } = await db().from("decks").update(row).eq("id", id)
    .select("id,name,deck_text,format,created_at,updated_at").single();
  if (error) throw readable(error, patch.name ?? "");
  return fromRow(data as DeckRow);
}

/**
 * Delete the account and, through the cascade on decks.user_id, every deck attached to it. The
 * function takes no argument on purpose — it acts on auth.uid() and nothing else — so there is no
 * id here to get wrong. See supabase/migrations/20260905130000_delete_account.sql.
 */
export async function deleteAccount(): Promise<void> {
  const { error } = await db().rpc("delete_account");
  if (error) throw new Error(error.message);
  // The account is already gone, so revoking its token server-side answers 403 and the browser logs
  // that as a failed request. supabase-js treats 401/403/404 here as success and clears the stored
  // session anyway, which is the part that matters: the app comes back signed out. Local scope
  // because there are no other sessions left to end.
  await db().auth.signOut({ scope: "local" });
}

export async function deleteDeck(id: string): Promise<void> {
  const { error } = await db().from("decks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
