// The only file that talks to the account layer. Everything here needs a network and a signed-in
// user, which is why the parts that can be decided without one live in `src/saved.ts` and have tests.
//
// The layer is NEON since the 2026 migration (docs/superpowers/specs/2026-09-19-neon-migration.md):
// Neon Auth (Managed Better Auth, Google) for sign-in, and the Neon Data API for `public.decks` and
// `public.profiles`, with isolation enforced by RLS in the database. The file keeps its old name
// and its exact exports on purpose: nine DOM tests mock it by path, and keeping the surface is what
// lets them prove the rest of the app never noticed the swap (spec §2.4).
//
// Auth uses the REDIRECT flow, never a popup: `vercel.json` sends
// `Cross-Origin-Opener-Policy: same-origin`, which severs a popup from the window that opened it, so
// a popup sign-in would hang forever without printing an error. The SDK opens a popup only when it
// runs inside an iframe; at the top level `signInWithOAuth` is a full-page redirect.
//
// The session lives in a PARTITIONED cookie on the Neon Auth host (CHIPS, `SameSite=None;
// Partitioned`), which is why it survives a reload even where third-party cookies are blocked.
// Measured 2026-09-24 in Chrome and in WebKit before this file was written.

import { createClient, SupabaseAuthAdapter } from "@neondatabase/neon-js";
import { fromRow, type DeckRow, type SavedDeck } from "../src/saved.js";
import type { Format } from "../src/types.js";

// esbuild substitutes both at build time from the environment (see scripts/build-web.mjs). They are
// public by design — every browser that signs in calls them — and what keeps one player out of
// another's rows is RLS in the database. No key and no connection string ever reaches this
// directory; a test asserts as much.
declare const __NEON_AUTH_URL__: string;
declare const __NEON_DATA_API_URL__: string;

const AUTH_URL = typeof __NEON_AUTH_URL__ === "string" ? __NEON_AUTH_URL__ : "";
const DATA_URL = typeof __NEON_DATA_API_URL__ === "string" ? __NEON_DATA_API_URL__ : "";

/** A build without the two variables set has no account layer at all, and the rest of the app is untouched. */
export const accountsEnabled = Boolean(AUTH_URL && DATA_URL);

type Client = ReturnType<typeof makeClient>;
const makeClient = () => createClient({
  auth: { adapter: SupabaseAuthAdapter(), url: AUTH_URL },
  dataApi: { url: DATA_URL },
});
let client: Client | null = null;
function db(): Client {
  client ??= makeClient();
  return client;
}

/** The part of a session this file reads. Supabase-shaped, which is what the SDK's adapter returns. */
export interface AuthSession {
  user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> | null };
}

export interface Account {
  id: string;
  /** What to call the player in the header. Google always gives us one of these. */
  label: string;
  /** The name the player chose for themselves (#178), "" while they are using the provider's. */
  displayName: string;
}

/**
 * What to call the player. `chosen` is the override from `public.profiles` (#178); when the caller
 * has none to pass, a legacy `display_name` in the metadata is honoured, which is the shape the
 * Supabase sessions had and the shape `test/supabase-account.test.ts` builds.
 *
 * The provider's name arrives as `full_name` or `name` from Supabase and as `displayName` from Neon
 * Auth's adapter (Better Auth's flat `user.name`), so the fallback chain reads all three.
 */
export function accountOf(session: AuthSession | null, chosen?: string | null): Account | null {
  if (!session) return null;
  const meta = (session.user.user_metadata ?? null) as
    { display_name?: string | null; full_name?: string; name?: string; displayName?: string } | null;
  const own = (chosen === undefined ? meta?.display_name : chosen) || "";
  return {
    id: session.user.id,
    label: own || meta?.full_name || meta?.name || meta?.displayName || session.user.email || "Signed in",
    displayName: own,
  };
}

/** The player's override, or "" for none. A failed read is "" too: the header falls back, sign-in does not break. */
async function chosenName(userId: string): Promise<string> {
  const { data, error } = await db().from("profiles").select("display_name").eq("user_id", userId).maybeSingle();
  if (error) return "";
  return (data as { display_name: string | null } | null)?.display_name ?? "";
}

/**
 * Rename the player (#178). The override lives in `public.profiles` and NOT in Better Auth's `name`:
 * `name` is what Google supplied, and overwriting it would destroy the name an empty override is
 * supposed to fall back to. `null` clears the override, which is how the fallback is reached.
 * `user_id` defaults to `auth.uid()` in the table, and the policies refuse any other value.
 */
export async function updateDisplayName(name: string | null): Promise<Account> {
  const { data: got, error: sessionError } = await db().auth.getSession();
  const session = got?.session as AuthSession | null | undefined;
  if (sessionError || !session) throw new Error(sessionError?.message ?? "Not signed in.");
  const { error } = await db().from("profiles")
    .upsert({ user_id: session.user.id, display_name: name, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw new Error(error.message);
  return accountOf(session, name ?? "")!;
}

// Every subscriber, each with ITS OWN counter so a later event wins over an earlier one whose
// profile read is still in flight. The counter must be per subscriber: `web/account.ts` subscribes
// twice (the gate and the header), and one shared counter let the second subscription's events mark
// the first one's reads as stale, so the header never learned who was signed in. Module-level so
// deleteAccount can reach them (see there).
const listeners = new Set<{ cb: (account: Account | null) => void; seq: number }>();

/** Fires once with the session restored on load, then on every sign-in and sign-out. */
export function onAccount(cb: (account: Account | null) => void): void {
  const sub = { cb, seq: 0 };
  listeners.add(sub);
  db().auth.onAuthStateChange((_event, raw) => {
    const mine = ++sub.seq;
    const session = raw as AuthSession | null;
    if (!session) { cb(null); return; }
    void chosenName(session.user.id).then((chosen) => { if (mine === sub.seq) cb(accountOf(session, chosen)); });
  });
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

/**
 * Tell every subscriber the player is signed out. The SDK's adapter does not report a sign-out to
 * the tab that performed it — measured 2026-09-24: after a successful `signOut` the page stayed
 * signed in until a reload — so this file does it itself for both ways out.
 */
function signedOut(): void {
  for (const sub of listeners) { sub.seq++; sub.cb(null); }
}

export async function signOut(): Promise<void> {
  const { error } = await db().auth.signOut();
  if (error) throw new Error(error.message);
  signedOut();
}

/** Postgres says 23505 when the (user_id, lower(name)) index rejects a second deck of that name. */
const readable = (error: { code?: string; message: string }, name: string): Error =>
  new Error(error.code === "23505" ? `You already have a deck called "${name}".` : error.message);

export async function listDecks(): Promise<SavedDeck[]> {
  // First, carry across any decks this player saved on Supabase before the move (spec §6,
  // neon/migrations/0004_staged_decks.sql). It is keyed to their Google identity and is a no-op once
  // they have been claimed, so it costs one tiny call. A failure here must not hide the decks they
  // already have on Neon, so it is not allowed to throw.
  await db().rpc("claim_staged_decks").then(() => undefined, () => undefined);
  const { data, error } = await db().from("decks")
    .select("id,name,deck_text,format,created_at,updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as DeckRow[]).map(fromRow);
}

export async function createDeck(userId: string, name: string, deckText: string, format: Format): Promise<SavedDeck> {
  // user_id is sent explicitly although the column defaults to auth.uid(): the insert policy checks
  // `user_id = auth.uid()`, so a row claiming somebody else's id is refused by the database, not by
  // this function.
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
 * Delete the account and, through the cascades onto `neon_auth."user"`, every deck and the profile
 * attached to it. `public.delete_account()` takes no argument on purpose — it acts on auth.uid() and
 * nothing else — so there is no id here to get wrong. See neon/migrations/0002_delete_account.sql.
 */
export async function deleteAccount(): Promise<void> {
  const { error } = await db().rpc("delete_account");
  if (error) throw new Error(error.message);
  // The account is already gone and its sessions went with it by cascade, so the server has nothing
  // to sign out and may answer with an error. The call is still made for the SDK's own bookkeeping;
  // the listeners are told directly either way, which is the part the player sees.
  await db().auth.signOut().catch(() => {});
  signedOut();
}

export async function deleteDeck(id: string): Promise<void> {
  const { error } = await db().from("decks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
