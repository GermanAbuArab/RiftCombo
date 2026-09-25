#!/usr/bin/env node
// Prove the isolation between two real users on NEON instead of assuming it because the policies
// were written. The Neon twin of `scripts/check-rls.mjs`, which it replaces at cutover; both exist
// only while the migration is in flight.
//
// It creates throwaway accounts, has each save a deck, then tries every way one of them could reach
// the other's row: read it, list it, rename it, delete it, or insert a row under the other's id.
// Every one of those must fail. The accounts are deleted at the end.
//
// RUN IT ON A THROWAWAY BRANCH, NEVER ON PRODUCTION `main`. It creates its users through
// `/sign-up/email`, and production has email-and-password turned OFF (review of PR #225: an open
// email sign-up lets anyone pre-register a player's Gmail address, and the managed server then
// refuses that player's Google sign-in with `account_not_linked` -- measured 2026-09-25). A child
// branch inherits that setting, so turn it back on for the branch first:
//
//   neonctl branches create --project-id <p> --parent <main> --name rls-<date>
//   neonctl neon-auth config email-password update --project-id <p> --branch <child> --enabled true
//
// Two locks, so neither alone is load-bearing: the script refuses the project's default branch
// before creating anyone (exit 2), and even past that production would refuse the first sign-up
// (EMAIL_PASSWORD_SIGN_UP_DISABLED) and the run would THROW before any check.
//
// Credentials come from the environment only -- nothing here is ever written to a file or printed:
//
//   NEON_DATA_API_URL=... NEON_AUTH_URL=... NEON_PROJECT_ID=... NEON_BRANCH_ID=... \
//     node scripts/check-rls-neon.mjs
//
// NO KEY IS HANDLED. The four values above are public coordinates (the two URLs ship in the browser
// bundle). The two things that need operator rights -- deleting the test users at the end, and
// reading the foreign key and the victim's row count in SQL (checks 17 and 18) -- go through
// `neonctl`, which is already authenticated on the operator's machine, so no secret ever enters an
// environment variable or a transcript (the posture rc-neon2 established, 2026-09-21).
//
// Cleanup goes through `neonctl neon-auth user delete` and NOT through `public.delete_account()` on
// purpose: tidying up through the code path being verified would let a broken delete_account erase
// its own evidence.
//
// ---------------------------------------------------------------------------------------------
// THE RULE THIS FILE IS BUILT AROUND, because the Supabase original got it wrong five times:
//
//   A POSITIVE ASSERTION FAILS SAFE WHEN THE REQUEST BREAKS. A NEGATIVE ONE PASSES.
//
// `Boolean(undefined)` is false, so a positive check goes red on its own if the call dies. A
// negative check reads the same broken answer as proof of denial. Four of the fourteen Supabase
// checks compared `(data?.length ?? 0) === 0` with the error thrown away, so "you were correctly
// denied" and "the request exploded" were the same answer, and all four PASSED against a database
// where the table did not exist. That is not a historical curiosity here: THIS SCRIPT IS SPECIFIED
// TO RUN AGAINST AN EMPTY DATABASE, which is exactly the state those checks reported green on.
//
// Hence: the positive controls run FIRST and THROW rather than print, the non-vacuity banner must be
// non-zero, and `denied()` demands a specific successful shape rather than an absence of rows.
// ---------------------------------------------------------------------------------------------

const {
  NEON_DATA_API_URL,      // https://ep-xxx.<...>.neon.tech/<db>/rest/v1   (read off the Data API page)
  NEON_AUTH_URL,          // https://ep-xxx.<...>.neon.tech/<db>/auth      (read off the Auth page)
  NEON_PROJECT_ID,
  NEON_BRANCH_ID,
} = process.env;

const missing = Object.entries({
  NEON_DATA_API_URL, NEON_AUTH_URL, NEON_PROJECT_ID, NEON_BRANCH_ID,
}).filter(([, v]) => !v).map(([k]) => k);

if (missing.length) {
  // Exit 2, not 0. A run that could not test deletion must never read as a green run: checks 10-13
  // are the ones guarding a published privacy promise, and skipping them silently is the same class
  // of lie as a vacuous check.
  console.error(`missing from the environment: ${missing.join(", ")}`);
  process.exit(2);
}

import { execFileSync } from "node:child_process";

/** `neonctl <head> --project-id … --branch … <tail>`; the tail is what follows psql's `--`. */
const neonctl = (head, tail = []) => execFileSync("neonctl",
  [...head, "--project-id", NEON_PROJECT_ID, "--branch", NEON_BRANCH_ID, ...tail],
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

// The runtime half of the header's rule. Production's email-and-password setting is what stops this
// script today, and a configuration can be flipped back; so refuse the project's default branch here
// too, before any account is created. Exit 2 like a missing variable: this run tested nothing.
const branch = JSON.parse(execFileSync("neonctl",
  ["branches", "get", NEON_BRANCH_ID, "--project-id", NEON_PROJECT_ID, "-o", "json"],
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
if ((branch.branch ?? branch).default !== false) {
  console.error(`refusing: ${NEON_BRANCH_ID} is the project's default branch (production). Run this on a throwaway child branch.`);
  process.exit(2);
}

/**
 * One SQL value, as the table owner. Only for what RLS rightly hides from every Data API caller.
 * The value is TAGGED in the query and only the tagged line is read, so a banner or a warning line
 * on stdout can never be mistaken for the answer (post-commit review of 008c0bb). No tagged line is
 * an empty string, which every caller treats as a failure.
 */
const sql = (query) => {
  const out = neonctl(["psql", "--role-name", "neondb_owner"], ["--", "-Atc", `select 'v:' || (${query})`]);
  const line = out.split("\n").map((l) => l.trim()).find((l) => l.startsWith("v:"));
  return line ? line.slice(2) : "";
};

let failures = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${detail ? `  -- ${detail}` : ""}`);
};

/** A positive control. It THROWS, because everything after it is only meaningful if it held. */
function require(condition, message) {
  if (!condition) throw new Error(`cannot prove isolation: ${message}`);
}

/**
 * One Data API request, normalised to `{ data, error, status }`.
 *
 * Written on `fetch` rather than a PostgREST client on purpose: this file's whole job is to classify
 * responses exactly, and borrowing a library's idea of what counts as an error is the thing that
 * went wrong last time. Everything it decides is visible right here.
 */
async function rest(jwt, path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers ?? {}) };
  if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
  // `return=representation` on every write, never the default `return=minimal`. Minimal answers 204
  // with no body whether it changed one row or none, so a write checked under it cannot tell the two
  // apart -- the same indistinguishability this file exists to eliminate.
  if (options.method && options.method !== "GET") headers["Prefer"] = "return=representation";

  const res = await fetch(`${NEON_DATA_API_URL}${path}`, { ...options, headers: headers });
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }

  if (!res.ok) return { data: null, error: body ?? { message: res.statusText }, status: res.status };
  return { data: body, error: null, status: res.status };
}

/**
 * A NEGATIVE check on a read, update or delete.
 *
 * Under RLS a denial is NOT an error: PostgREST filters the rows and answers 200 with `[]` and no
 * error. So the only shape that proves denial is SUCCESS WITH ZERO ROWS. Anything else is named and
 * fails -- an error means the request never got far enough to be denied, and rows mean RLS let it
 * through.
 */
const denied = (name, { data, error, status }) => {
  if (error) {
    return check(name, false, `the request FAILED, it was not denied (${status} ${error.code ?? "?"}: ${error.message ?? ""})`);
  }
  if (!Array.isArray(data)) {
    return check(name, false, `unexpected response, expected an array and got ${typeof data} (${status})`);
  }
  check(name, data.length === 0, `${data.length} rows`);
};

/** A NEGATIVE check on an insert, where denial DOES arrive as an error, and only one code will do. */
const refused = (name, { data, error, status }) => {
  const code = error?.code;
  if (code === "42501") return check(name, true);
  if (error) {
    return check(name, false, `unexpected code, expected 42501 (${status} ${code ?? "?"}: ${error.message ?? ""})`);
  }
  check(name, false, `RLS did NOT refuse the insert, rows inserted: ${Array.isArray(data) ? data.length : "?"} rows`);
};

/**
 * A NEGATIVE check on a request that carries NO credentials at all.
 *
 * Measured against the real Data API, not assumed: it answers 400 with
 * `{"message":"missing authentication credentials: ...","code":null}`. The gateway refuses the
 * request before PostgREST ever sees it, which is why `code` is null and why none of the PGRST*
 * codes apply here. That is STRICTER than RLS filtering, not weaker -- but it is a different shape,
 * and `denied()` is right to call it a broken request rather than a denial.
 *
 * Two shapes are accepted and each is named: the identified gateway refusal, or a 200 with zero
 * rows should Neon ever start admitting anonymous callers as the `anonymous` role. Anything else --
 * a 503, a missing table, rows -- fails.
 *
 * This helper is NOT self-sufficient and must not be used alone: the gateway rejects a
 * credential-less request before it looks at the table, so a database with no `decks` table answers
 * exactly the same 400. The caller pairs it with a positive control on the identical URL.
 */
const GATEWAY_REFUSALS = [
  "missing authentication credentials",
  "not a valid JWT encoding",
  "missing key id",
];

const noCredentials = (name, { data, error, status }) => {
  if (!error) {
    if (!Array.isArray(data)) {
      return check(name, false, `unexpected response with no error, got ${typeof data} (${status})`);
    }
    return check(name, data.length === 0, `${data.length} rows`);
  }
  const message = String(error.message ?? "");
  const recognised = (status === 400 || status === 401) && GATEWAY_REFUSALS.some((r) => message.includes(r));
  check(name, recognised, recognised ? "" : `unrecognised refusal (${status} ${error.code ?? "no code"}: ${message})`);
};

const sub = (jwt) => JSON.parse(Buffer.from(jwt.split(".")[1], "base64url")).sub;

/** A signed-in browser: a real account, signed in the same way the app signs one in. */
async function createUser(tag) {
  const email = `rls-${tag}-${crypto.randomUUID()}@riftcombo.test`;
  const password = crypto.randomUUID();
  const origin = new URL(NEON_AUTH_URL).origin;
  const json = { "Content-Type": "application/json", Origin: origin };

  const signUp = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
    method: "POST", headers: json,
    body: JSON.stringify({ email, password, name: `rls ${tag}`, callbackURL: origin }),
  });
  require(signUp.ok, `could not create ${tag}: ${signUp.status} ${await signUp.text()}`);

  const login = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
    method: "POST", headers: json, body: JSON.stringify({ email, password }),
  });
  require(login.ok, `could not sign in ${tag}: ${login.status}`);

  const session = await fetch(`${NEON_AUTH_URL}/get-session`, {
    headers: { Cookie: login.headers.get("set-cookie") ?? "" },
  });
  // The JWT rides in a RESPONSE HEADER, not in the body. Reading the body here would yield a session
  // object with no token and the failure would look like a permissions problem three checks later.
  const jwt = session.headers.get("Set-Auth-Jwt");
  require(jwt, `${tag} has no JWT: get-session returned no Set-Auth-Jwt`);

  return { id: sub(jwt), jwt, email, password, cookie: login.headers.get("set-cookie") ?? "" };
}

const deleteUser = async (id) => { neonctl(["neon-auth", "user", "delete", id]); };

const saveDeck = (u, name, extra = {}) => rest(u.jwt, "/decks", {
  method: "POST",
  body: JSON.stringify({ name: name, deck_text: "1 Lux, Illuminated", format: "constructed", ...extra }),
});

const a = await createUser("a");
const b = await createUser("b");
const c = await createUser("c");

// Mutable, because check 12 proves the deletion by signing the freed email UP AGAIN, and the
// account that creates has to be cleaned up like the other three.
const created = [a, b, c];

try {
  // ---- POSITIVE CONTROLS. These throw. Everything below is an absence, and an absence only means
  // ---- something once the thing being hidden is known to be there.
  const { data: rowsA, error: errorA } = await saveDeck(a, "A's deck", { user_id: a.id });
  require(!errorA, `A could not save a deck: ${errorA?.code ?? ""} ${errorA?.message ?? ""}`);
  const deckA = rowsA?.[0];
  require(deckA?.id, "A's insert did not return the row");
  check("1. a signed-in user can save a deck (the insert policy exists)", true);

  const { error: errorB } = await saveDeck(b, "B's deck", { user_id: b.id });
  check("2. the second user can save too", !errorB, errorB?.message ?? "");

  const { data: listA, error: errorList } = await rest(a.jwt, "/decks?select=id,name");
  require(!errorList, `A cannot read their own list: ${errorList?.message ?? ""}`);
  require(listA?.length === 1 && listA[0].id === deckA.id,
    `A does not see their own row (${listA?.length ?? 0} rows), so nothing below proves anything`);
  check("3. a user's list holds only their own decks", true);

  // ---- NON-VACUITY BANNER. If any of these is zero the run is red no matter what the checks say.
  const host = new URL(NEON_DATA_API_URL).host;
  console.log(`\nnon-vacuity: 3 users created | 1 row of A visible to A | host ${host}\n`);
  require(host && a.id && b.id && c.id, "non-vacuity banner incomplete");

  // ---- 17. THE FOREIGN KEY. The cascade is what makes account deletion remove every deck, which is
  // ---- the published privacy promise; a Neon-side re-creation of neon_auth would take it silently.
  const fk = sql("select pg_get_constraintdef(oid) from pg_constraint where conname = 'decks_user_id_fkey'");
  check("17. the FK from decks to neon_auth.user exists and cascades on delete",
    fk.includes('REFERENCES neon_auth."user"(id) ON DELETE CASCADE'), fk || "missing");

  // ---- NEGATIVE CHECKS.
  denied("4. the other user cannot read that row even knowing its id",
    await rest(b.jwt, `/decks?select=id&id=eq.${deckA.id}`));

  denied("5. the other user cannot rename it",
    await rest(b.jwt, `/decks?id=eq.${deckA.id}&select=id`, { method: "PATCH", body: JSON.stringify({ name: "stolen" }) }));

  denied("6. the other user cannot delete it",
    await rest(b.jwt, `/decks?id=eq.${deckA.id}&select=id`, { method: "DELETE" }));

  // Kept even though `user_id` now defaults to auth.uid(): a default does not stop a client from
  // sending a forged value, and the with-check is what refuses it.
  refused("7. the other user cannot plant a row under someone else's id",
    await saveDeck(b, "planted", { user_id: a.id }));

  const { data: survivor, error: errorSurvivor } = await rest(a.jwt, `/decks?select=id,name&id=eq.${deckA.id}`);
  check("8. the owner's row survived all of that unchanged",
    !errorSurvivor && survivor?.[0]?.name === "A's deck", errorSurvivor?.message ?? survivor?.[0]?.name ?? "missing");

  // The url is A's own row rather than the whole table, and it is requested TWICE: once with A's
  // token and once with none. The authenticated call is a positive control and it throws, because
  // the gateway refuses a credential-less request BEFORE it looks at the table -- a database with no
  // `decks` table answers the anonymous call with the very same 400. Proving that this exact url
  // returns the row when a token is attached is what makes the refusal mean "no credentials" rather
  // than "nothing here to read".
  const visitorPath = `/decks?select=id&id=eq.${deckA.id}`;
  const { data: withToken, error: errorWithToken } = await rest(a.jwt, visitorPath);
  require(!errorWithToken && withToken?.length === 1,
    `the control for check 9 does not hold: with a token the same url returned ${errorWithToken?.message ?? `${withToken?.length ?? 0} rows`}`);

  noCredentials("9. a signed-out visitor reads nothing", await rest(null, visitorPath));

  // ---- THE TWO CHECKS NEON NEEDS AND SUPABASE DID NOT.
  const { data: listC, error: errorC } = await rest(c.jwt, "/decks?select=id");
  check("15. a user with no rows gets an empty list, not an error",
    errorC === null && Array.isArray(listC) && listC.length === 0,
    errorC ? `${errorC.code ?? "?"}: ${errorC.message ?? ""}` : `${listC?.length ?? "?"} rows`);

  // The one that stops checks 1-8 from passing on a database where every policy is accidentally
  // `true`. Insert WITHOUT user_id and let the column default fill it: if what lands is C's own sub,
  // then auth.uid() really is reading the presented token and the policies are keyed to it.
  const { data: ownRows, error: errorOwnRows } = await saveDeck(c, "C's deck");
  check("16. auth.uid() inside the policy is the sub of the presented token",
    !errorOwnRows && ownRows?.[0]?.user_id === c.id,
    errorOwnRows?.message ?? `user_id=${ownRows?.[0]?.user_id ?? "?"} sub=${c.id}`);

  // ---- ACCOUNT DELETION. Runs last: it ends B's session.
  //
  // There is NO endpoint. Deleting an account is `public.delete_account()`, a SECURITY DEFINER
  // function reached through the Data API's rpc path -- the same shape the Supabase original used,
  // so no secret rides in the browser and none sits in a deployed function either.
  // neon/migrations/0002_delete_account.sql records why the three endpoint routes were rejected.
  const deleteAccount = (jwt) => rest(jwt, "/rpc/delete_account", { method: "POST", body: "{}" });

  // Both calls are made before either is judged, because 10 is only meaningful if 11 worked: the
  // gateway refuses a credential-less caller BEFORE it looks up the function, so "400 missing
  // credentials" is also the answer a database with no `delete_account` would give. 11 succeeding
  // on the identical path is what makes the refusal mean "no credentials" and not "no function".
  const register = (u) => fetch(`${NEON_AUTH_URL}/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: new URL(NEON_AUTH_URL).origin },
    body: JSON.stringify({ email: u.email, password: u.password, name: "rls again", callbackURL: new URL(NEON_AUTH_URL).origin }),
  });

  // The first half of check 12's flip, taken WHILE B still exists. It throws: if the endpoint does
  // not say USER_ALREADY_EXISTS here, then the 200 it gives after the delete proves nothing, and
  // check 12 would be reporting on a sign-up endpoint rather than on a deletion.
  const taken = await register(b);
  require(taken.status === 422,
    `the control for check 12 does not hold: signing up B's email while B exists returned ${taken.status}, expected 422`);

  // 18's BEFORE half: B's rows are counted while B exists, so "zero after" cannot mean "there were
  // never any" -- without it, deleted-nothing and deleted-everything read the same.
  const rowsOfBBefore = sql(`select count(*) from public.decks where user_id = '${b.id}'`);
  require(rowsOfBBefore === "1", `the control for check 18 does not hold: B had ${rowsOfBBefore} rows before deletion, expected 1`);

  const anonymous = await deleteAccount(null);
  const own = await deleteAccount(b.jwt);

  check("11. a signed-in user can delete their own account",
    !own.error && (own.status === 204 || own.status === 200),
    own.error ? `${own.status} ${own.error.code ?? "no code"}: ${own.error.message ?? ""}` : "");

  noCredentials("10. a signed-out visitor cannot delete an account", anonymous);

  // Proving the account is GONE. The Management API cannot answer this: it has no GET for a single
  // user -- measured, that path returns 405, not 404 -- so the lookup this check used to do could
  // never have worked, and a 405 misread as "not found" would have been a green light for nothing.
  //
  // Signing in again as the deleted user was the next idea and it is WRONG: Neon Auth rate-limits
  // sign-in, and the first run of this file proved it by answering 429 to a user that had NOT been
  // deleted. A 429 is indistinguishable from a refusal, so that probe would have called a live
  // account gone the moment the run got slightly too fast.
  //
  // So the probe is the email itself, and it is the same request before and after, required to
  // FLIP. While the account exists the endpoint answers 422 USER_ALREADY_EXISTS; once the row is
  // gone the address is free and the very same call succeeds. The 422 is taken first and throws,
  // which is what makes the 200 mean "the row is gone" instead of "sign-up is broken today" -- a
  // broken endpoint cannot produce the flip, only one of the two halves.
  // A is untouched, so A's session must still resolve. This is check 13 and it is also the control
  // that stops 12 from passing on an auth service that is simply down.
  const sessionA = await fetch(`${NEON_AUTH_URL}/get-session`, { headers: { Cookie: a.cookie } });
  const bodyA = await sessionA.text();
  require(sessionA.status === 200 && bodyA !== "null" && Boolean(sessionA.headers.get("Set-Auth-Jwt")),
    `the control for checks 12 and 13 does not hold: A's session, which was not deleted, does not resolve (${sessionA.status} ${bodyA.slice(0, 60)})`);
  check("13. deleting one account leaves the other alone", true);

  // B's session should have gone with the row: neon_auth.session has an ON DELETE CASCADE onto the
  // user. Measured shape after a delete: 200 with the body `null` and no Set-Auth-Jwt header.
  const sessionB = await fetch(`${NEON_AUTH_URL}/get-session`, { headers: { Cookie: b.cookie } });
  const bodyB = await sessionB.text();
  const sessionGone = sessionB.status === 200 && bodyB === "null" && !sessionB.headers.get("Set-Auth-Jwt");

  const retry = await register(b);
  if (retry.ok) {
    const body = await retry.json().catch(() => null);
    if (body?.user?.id) created.push({ id: body.user.id });
  }
  // The detail is built ONLY when the check fails. A passing line that still prints "the session
  // survived" reads like a warning nobody has to act on, and this file is in the business of making
  // its own output mean exactly one thing.
  const gone = retry.status === 200 && sessionGone;
  check("12. that account is really gone", gone, gone ? "" :
    retry.status === 422
      ? "signing up the same email still gives USER_ALREADY_EXISTS: the row was not deleted"
      : retry.status !== 200
        ? `signing up the freed email was not accepted (${retry.status}), so it proves nothing`
        : `the deleted account's session still resolves (${sessionB.status} ${bodyB.slice(0, 40)})`);

  const rowsOfBAfter = sql(`select count(*) from public.decks where user_id = '${b.id}'`);
  check("18. the deleted account's decks went with it (1 before, 0 after)",
    rowsOfBAfter === "0", `${rowsOfBAfter} rows after`);

  const { data: decksA, error: errorDecks } = await rest(a.jwt, `/decks?select=id&id=eq.${deckA.id}`);
  check("14. and leaves the other user's decks alone",
    !errorDecks && decksA?.length === 1, errorDecks?.message ?? `${decksA?.length ?? 0} rows`);
} finally {
  for (const u of created) await deleteUser(u.id).catch(() => {});
  console.log(`cleanup: all ${created.length} test users deleted`);
}

process.exit(failures ? 1 : 0);
