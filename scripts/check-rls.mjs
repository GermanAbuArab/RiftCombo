#!/usr/bin/env node
// Prove the isolation between two real users instead of assuming it because the policies were
// written. Creates two throwaway accounts, has each save a deck, then tries every way one of them
// could reach the other's row: read it, list it, rename it, delete it, or insert a row under the
// other's id. Every one of those must fail. The two accounts are deleted at the end, and deleting
// a user cascades to the decks the migration attached to it.
//
// Credentials come from the environment only — nothing here is ever written to a file or printed:
//
//   set -a && . ./.env.local && set +a && node scripts/check-rls.mjs
//
// SUPABASE_SERVICE_ROLE_KEY is needed to create and delete the two test users. It is a server key:
// it bypasses RLS, it belongs nowhere near the browser bundle, and this script is the only place in
// the repository that reads it.

import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./site-config.mjs";

loadEnvLocal(join(dirname(fileURLToPath(import.meta.url)), ".."));
const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("need SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY in the environment");
  process.exit(2);
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

let failures = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

/** A signed-in browser: the anon key plus one user's own JWT, exactly what the app uses. */
async function makeUser(tag) {
  const email = `rls-${tag}-${randomUUID()}@riftcombo.test`;
  const password = randomUUID();
  const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (createError) throw new Error(`could not create ${tag}: ${createError.message}`);
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: signInError } = await client.auth.signInWithPassword({ email, password });
  if (signInError) throw new Error(`could not sign ${tag} in: ${signInError.message}`);
  return { id: created.user.id, client };
}

const a = await makeUser("a");
const b = await makeUser("b");
try {
  const save = (u, name) => u.client.from("decks")
    .insert({ user_id: u.id, name, deck_text: "1 Lux, Illuminated", format: "constructed" })
    .select("id").single();

  const { data: aDeck, error: aError } = await save(a, "A's deck");
  check("a signed-in user can save a deck at all (the insert policy exists)", !aError, aError?.message ?? "");
  const { error: bError } = await save(b, "B's deck");
  check("the second user can save one too", !bError, bError?.message ?? "");
  if (!aDeck) throw new Error("nothing to test isolation against");

  const { data: aList } = await a.client.from("decks").select("id,name");
  check("a user's list holds only their own decks", aList?.length === 1 && aList[0].id === aDeck.id, `${aList?.length ?? 0} rows`);

  const { data: bSees } = await b.client.from("decks").select("id").eq("id", aDeck.id);
  check("the other user cannot read that row even knowing its id", (bSees?.length ?? 0) === 0, `${bSees?.length ?? 0} rows`);

  const { data: bRenames } = await b.client.from("decks").update({ name: "stolen" }).eq("id", aDeck.id).select("id");
  check("the other user cannot rename it", (bRenames?.length ?? 0) === 0);

  const { data: bDeletes } = await b.client.from("decks").delete().eq("id", aDeck.id).select("id");
  check("the other user cannot delete it", (bDeletes?.length ?? 0) === 0);

  const { error: forged } = await b.client.from("decks")
    .insert({ user_id: a.id, name: "planted", deck_text: "1 Lux, Illuminated", format: "constructed" });
  check("the other user cannot plant a row under someone else's id", Boolean(forged), forged?.message ?? "the insert was accepted");

  const { data: stillThere } = await a.client.from("decks").select("id,name").eq("id", aDeck.id).single();
  check("the owner's row survived all of that unchanged", stillThere?.name === "A's deck", stillThere?.name ?? "gone");

  const { data: anon } = await createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } })
    .from("decks").select("id");
  check("a signed-out visitor reads nothing", (anon?.length ?? 0) === 0, `${anon?.length ?? 0} rows`);
} finally {
  for (const u of [a, b]) await admin.auth.admin.deleteUser(u.id);
  console.log("cleaned up both test users");
}

process.exit(failures ? 1 : 0);
