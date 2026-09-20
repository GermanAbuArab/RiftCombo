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

/**
 * A NEGATIVE check, and the reason it is not just `check(..., rows.length === 0)`.
 *
 * Under RLS a denied read, update or delete is not an error: PostgREST filters the rows and returns
 * an empty array with `error` null. So "you were correctly denied" and "the request blew up" both
 * arrive as no rows — and the four negative checks below used to destructure the error away and
 * compare `(data?.length ?? 0) === 0`, which is TRUE when `data` is null because the request failed.
 * Every one of them therefore PASSED against a database where the table does not exist, the row was
 * never inserted, or the client is pointed at the wrong project. Four of fourteen checks in a script
 * whose entire job is to prove isolation.
 *
 * What rescued it in practice was ordering — the positive controls above run first and would have
 * failed — but that is an accident of sequence rather than a property anything enforces, which is
 * why the precondition below is now a hard throw rather than a printed FAIL. Asserting the request
 * SUCCEEDED and returned zero rows is what makes the absence of rows evidence of anything.
 */
const denied = (name, { data, error }) => {
  if (error) return check(name, false, `the request itself failed, so nothing was proved: ${error.message}`);
  check(name, Array.isArray(data) && data.length === 0, `${data?.length ?? "no"} rows`);
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

  const { data: aList, error: aListError } = await a.client.from("decks").select("id,name");
  check("a user's list holds only their own decks", aList?.length === 1 && aList[0].id === aDeck.id, `${aList?.length ?? 0} rows`);
  // NON-VACUITY GATE. Everything below is an absence — no rows, no rename, no delete — and an
  // absence only means something once the thing being hidden is known to be there. If the row this
  // whole script is about is not readable by its own owner, the negatives below would all print
  // "pass" while testing nothing, so stop here instead of reporting a green run.
  if (aListError || aList?.length !== 1 || aList[0].id !== aDeck.id) {
    throw new Error(`cannot prove isolation: the owner cannot see their own row (${aListError?.message ?? `${aList?.length ?? 0} rows`})`);
  }

  denied("the other user cannot read that row even knowing its id",
    await b.client.from("decks").select("id").eq("id", aDeck.id));

  denied("the other user cannot rename it",
    await b.client.from("decks").update({ name: "stolen" }).eq("id", aDeck.id).select("id"));

  denied("the other user cannot delete it",
    await b.client.from("decks").delete().eq("id", aDeck.id).select("id"));

  const { error: forged } = await b.client.from("decks")
    .insert({ user_id: a.id, name: "planted", deck_text: "1 Lux, Illuminated", format: "constructed" });
  check("the other user cannot plant a row under someone else's id", Boolean(forged), forged?.message ?? "the insert was accepted");

  const { data: stillThere } = await a.client.from("decks").select("id,name").eq("id", aDeck.id).single();
  check("the owner's row survived all of that unchanged", stillThere?.name === "A's deck", stillThere?.name ?? "gone");

  denied("a signed-out visitor reads nothing",
    await createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } })
      .from("decks").select("id"));

  // delete_account() is the one function that reaches auth.users, so it gets the hardest look.
  // It takes no argument: the row is chosen by auth.uid(), which is why B calling it can only ever
  // delete B. This runs last because it ends B's session.
  const { error: anonDelete } = await createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } })
    .rpc("delete_account");
  check("a signed-out visitor cannot call delete_account at all", Boolean(anonDelete), anonDelete?.message ?? "the call was accepted");

  const { error: bDeletesSelf } = await b.client.rpc("delete_account");
  check("a signed-in user can delete their own account", !bDeletesSelf, bDeletesSelf?.message ?? "");
  const { data: bGone } = await admin.auth.admin.getUserById(b.id);
  check("that account is really gone", !bGone?.user, bGone?.user ? "still there" : "");
  const { data: aSurvives } = await admin.auth.admin.getUserById(a.id);
  check("deleting one account leaves the other user alone", Boolean(aSurvives?.user));
  const { data: aDeckSurvives } = await a.client.from("decks").select("id").eq("id", aDeck.id);
  check("and leaves the other user's decks alone", aDeckSurvives?.length === 1, `${aDeckSurvives?.length ?? 0} rows`);
} finally {
  for (const u of [a, b]) await admin.auth.admin.deleteUser(u.id).catch(() => {});
  console.log("cleaned up both test users");
}

process.exit(failures ? 1 : 0);
