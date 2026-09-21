# Neon migration — the cutover plan

Date: 2026-09-21 · Author: rc-neon2 · Branch: `neon-migration`
Spec: `docs/superpowers/specs/2026-09-19-neon-migration.md` — **read §12 first**, it carries the
measurements this plan rests on and supersedes §5.3's delete-account route.
Program plan: `~/.personal-claude/plans/effervescent-imagining-globe.md` §C.

**Every step below is `step → verify:`. A step is not done until its check has been RUN and has
passed.** The order is the spec's §8 order; where this plan departs from §8 it says so and why.

---

## 0. Coordinates, so no step has to re-derive them

| | |
|---|---|
| Org | `org-billowing-dawn-47109886` (personal). **Not** the Vercel-managed org — it refuses `projects create`. |
| Project | `round-waterfall-07137684` (`riftcombo`), `aws-sa-east-1`, Postgres 18 |
| Branch | `main` = `br-tiny-bird-aczxgj3q` · Endpoint `ep-lucky-shadow-acwqx6jp` |
| Data API | `https://ep-lucky-shadow-acwqx6jp.apirest.sa-east-1.aws.neon.tech/neondb/rest/v1` |
| Auth origin | `https://ep-lucky-shadow-acwqx6jp.neonauth.sa-east-1.aws.neon.tech` — **re-read it at step 2; do not template it** (§7.1) |
| Credential | **`neonctl` is already authenticated on this machine.** Use `neonctl api <path>` as an authenticated passthrough; no `NEON_API_KEY` needs to be handled, and per §12.6 none is deployed. |

**Three standing rules for every step.**

1. **The gate is three checks, not one** (`CLAUDE.md`): `npm run typecheck` **and** `npm test` **and**
   `npm run build:web`. A green vitest run is not evidence the code typechecks; that has bitten this
   project. A hang reports as a worker crash, not as a failure — require a `Tests N passed` summary
   line as well as exit 0.
2. **A negative assertion passes when the request breaks.** Spec §4 records seven instances. Every
   check that proves something is *refused* must be paired with a positive control on the same URL.
3. **Nothing on `main` is written until step 3.** Destructive probing goes on a throwaway branch,
   which is free (`neonctl branches create --parent br-tiny-bird-aczxgj3q`) and deletable.

---

## OWNER-ONLY — three things no session can do

| # | What | Where it blocks |
|---|---|---|
| **O1** | **Create a Google OAuth client for Neon Auth** (client id + secret) and enter it in the Neon console, plus the redirect URI Neon prints. **Never pasted into a transcript** — the 2026-09-05 secret-inspection lesson. Google can take minutes to hours to apply a new redirect URI. | **Step 2.** Everything from step 3 on is blocked until this exists. |
| **O2** | **Go/no-go at step 9** — the deploy. First real write diverges the two databases; nothing after it is reversible. | Step 9 |
| **O3** | **Go/no-go at step 10** — delete the Supabase project, one week after step 9. | Step 10 |

**O1 has a decision attached that the owner should make with it:** `web/privacy.html` says today that
the data lives *"in a Postgres database hosted in the United States"*. The Neon project is in
**`sa-east-1`, which is São Paulo**. Either the sentence changes to name Brazil, or the project is
recreated in a US region before step 2 — **and recreating is cheap now and expensive after step 9**,
because a new project is a new endpoint and therefore a new Data API origin, a new CSP and a new
`neon_auth`. **Ask this before step 2, not after.**

---

## Step 1 — the project exists and is healthy. Mostly already done.

The project, branch, endpoint, Data API and the `0001`/`0002` schema are **already live** (§12.5).
This step is a re-read rather than a creation.

**verify:** `neonctl projects list --org-id org-billowing-dawn-47109886` names `riftcombo`;
`neonctl data-api get --project-id round-waterfall-07137684 --branch br-tiny-bird-aczxgj3q` prints
`"status": "active"`, `db_anon_role: "anonymous"`, `db_schemas: ["public"]`.

**verify (the three things §12.5 did NOT read back, so they are checked here rather than assumed):**
`decks_user_updated_idx` and `decks_user_name_idx` exist in `pg_indexes`; a trigger named
`decks_touch_updated_at` exists on `public.decks`; and
`select defaclrole::regrole, defaclacl from pg_default_acl` shows the `authenticated` grant is
attached to **`neondb_owner`** — the §3.4 hole. If any is missing, re-apply that part of `0001`.

---

## Step 2 — enable Neon Auth (Managed Better Auth) with Google, BEFORE any schema work

**Neon Auth is currently NOT configured on the branch** — `neonctl neon-auth status` answers *"Neon
Auth is not configured for this branch"* — while the `neon_auth` schema and its rows survive from an
earlier enablement (§12.4). So this step is a re-enable, and §8's ordering warning still governs:
**enabling Managed Better Auth is what creates `neon_auth`, and `0001`'s foreign key needs it.**

Blocked on **O1**.

1. `neonctl neon-auth enable --project-id round-waterfall-07137684 --branch br-tiny-bird-aczxgj3q`
2. Add the Google provider (`neonctl neon-auth oauth-provider ...` or the console) using O1's client.
3. Add the redirect trusted domain for `https://riftcombo.app` (`neonctl neon-auth domain`).

**verify:** `neonctl neon-auth status --branch br-tiny-bird-aczxgj3q` reports configured, Google
listed. **verify:** the `neon_auth` tables and the two user rows still exist and
`select pg_get_constraintdef(oid) from pg_constraint where conname='decks_user_id_fkey'` still prints
`REFERENCES neon_auth."user"(id) ON DELETE CASCADE` — **this is the live test of open item 1**, since
an enable that recreated the schema would take the FK with it. **If the FK is gone, STOP**: the
cascade is what makes §12.6's delete-account route and `web/privacy.html`'s promise true.

**verify:** read the Auth origin off the platform — `neonctl neon-auth status --output json` — and
**do not template it**. §7.1: two Neon doc pages printed different shapes and the label count varies
between projects.

**verify:** a real Google sign-in through Neon Auth produces a JWT whose `sub` is a **UUID** (§9 item
4 is answered on one sample only). Decode the token's payload locally; never print it.

---

## Step 3 — port and RUN `scripts/check-rls-neon.mjs`. The highest-value step.

The script exists on this branch, 16 checks, **written and never run** — its author's own caveat.
Env: `NEON_DATA_API_URL`, `NEON_AUTH_URL`, `NEON_PROJECT_ID`, `NEON_BRANCH_ID`, `NEON_API_KEY`,
`DELETE_ACCOUNT_URL`.

**Three amendments this session's measurements force, and each has a reason:**

1. **Check 16 must NOT read `auth.uid()` directly.** §12.7(a): `authenticated` has `EXECUTE` on
   `auth.uid()` and **no `USAGE` on schema `auth`**, so a direct call answers *permission denied for
   schema auth* — which is one more way for a check to come back looking like a denial. Keep panel3's
   implementation: **insert without `user_id`, let `default auth.uid()` fill it, compare what landed
   against the token's `sub`.**
2. **Check 9's expectation changes shape.** §12.7(b): `anonymous` holds **no grant at all** on
   `public.decks`, so the SQL-level answer is `permission denied for table decks`, not an empty array.
   At the HTTP layer the Data API refuses a credential-less request at the door with `400` (§4's
   seventh instance). **Both hold; assert the refusal AND a positive control on the same URL**, or an
   empty project passes.
3. **Checks 10–12 point at the RPC, not at an endpoint.** §12.6 replaced the Edge function with
   `public.delete_account()`. `DELETE_ACCOUNT_URL` becomes
   `<NEON_DATA_API_URL>/rpc/delete_account`, called `POST` with the user's JWT. Keep the **exit 2**
   when it is unset.

**Add one cheap check (17): the FK still exists.** One `select pg_get_constraintdef(oid) ... where
conname='decks_user_id_fkey'` asserting `ON DELETE CASCADE`. It costs nothing and it is the standing
instrument for open item 1 (§12.4).

**verify — and "16 of 16" is NOT the gate (§8 step 3):**
- a. The positive controls run **first** and **throw**, not print.
- b. The **non-vacuity line is non-zero** — users created, rows present, and the branch host printed.
- c. The run **exits 2** if `DELETE_ACCOUNT_URL` is absent.
- d. Only then does 17 of 17 mean anything.

**verify (the two things §12.6 left unproven, and they are the ones that can fail quietly):**
`POST /rpc/delete_account` with a real JWT returns success — proving PostgREST **exposes** the
function — **and** the caller's deck count was **non-zero before** and is zero after, proving
`auth.uid()` was non-NULL inside it. Without the before-count, "deleted nothing" and "deleted
everything" are the same answer.

---

## Step 4 — (was: build `api/delete-account.ts`) — **DELETED. Nothing to build.**

§12.6: the route is the SQL function. `api/` gains no file and no secret, `@neondatabase/serverless`
is not added, and §5.5's Edge-runtime constraint bites nothing.

**verify:** `git diff --stat origin/master...HEAD -- api/` is empty at the end of the migration.

---

## Step 5 — swap the body of `web/supabase.ts`, keeping every export identical

Keep the **file path** and all ten exported names and signatures: `accountsEnabled`, `onAccount`,
`signIn`, `signOut`, `deleteAccount`, `updateDisplayName`, `listDecks`, `createDeck`, `updateDeck`,
`deleteDeck`. Do **not** rename the module (§2.4) — nine DOM tests mock it by path and are the
regression harness that proves the rest of the app never noticed.

Three bodies genuinely change: `accountOf()` needs a shim for Better Auth's **flat** user object
(§2.5); `updateDisplayName` has no `user_metadata` counterpart (§2.6 — **a `public.profiles` table
under the same four-policy pattern is the recommended answer**, because it preserves issue #178's
behaviour exactly); `deleteAccount()` stays `Promise<void>` with no argument and becomes
`.rpc("delete_account")` against the Data API — **the same call shape it has today.**

**verify:** the nine `test/dom/*.dom.test.ts` files pass **with no edit to any of them**. That is the
whole point of keeping the surface; if one needs changing, the surface moved.
**verify:** `test/supabase-account.test.ts` proves the `accountOf` fallback chain still resolves
display name → provider name → email.
**verify:** typecheck 0 · full suite green · `build:web` 0.

---

## Step 6 — `site-config.mjs`, `build-headers.mjs`, `test/headers.test.ts`, regenerate `vercel.json`

- **Retarget the origin validator, do not delete it** (§2.1). Require **`https` and a host ending
  `.neon.tech`, nothing finer** — §12.3 measured two endpoints on this one project whose ids differ,
  and §7.1 measured a `c-2` label present in Neon's docs and absent here. A regex fitted to either
  rejects the other.
- **`connect-src` takes a LIST and joins it** (§7.2): **two** origins, `apirest` and `neonauth` on the
  same endpoint id. Rewrite the generator's comment, which asserts the one-origin fact as a reason.
- Rename `SUPABASE_URL` / `SUPABASE_ANON_KEY`; `scripts/build-web.mjs`'s esbuild `define` block and
  its build-time log move with them (§7.5). **Grep for the identifiers, not for line numbers.**
- Widen `test/headers.test.ts`'s secret-name check. Per §12.6 there is **no `NEON_API_KEY` in the
  deployed environment**, so the widening is the connection string alone.

**verify:** `npm run build:web` succeeds against the Neon origin and **throws** against a junk one —
run both, because the throw is the half that proves the guard still works.
**verify:** the shipped CSP contains exactly the two origins and **no wildcard**; the wildcard-refusal
assertion in `test/headers.test.ts` survives unchanged.
**verify:** `vercel.json` is regenerated and **committed** — Vercel reads it before the build runs.

---

## Step 7 — `web/privacy.html`

Swap the three Supabase names (§2.3). **The deletion paragraph stands as written** — §5.2 and §12.6:
the row is really gone and four other tables go with it. **The hosting sentence does not stand**: the
project is in São Paulo, not the United States (see **O1**). Move the "Last changed" date.

**verify:** `grep -oi supabase web/privacy.html | wc -l` is **0**.
**verify:** `public/privacy.html` regenerates from it — **no manual edit**.
**verify:** the region named on the page matches `neonctl projects list`'s `region_id`.

---

## Step 8 — export, re-key, import

**Measure before building anything** (§6): `select count(distinct user_id) from public.decks` on
Supabase. **If it is 1 — German's own account — the whole staging design collapses into one
`update ... set user_id = '<his new sub>'`.** Build the staging table only if the count is >1.

Either way one ordering constraint survives: **he must sign in to Neon Auth once before the rows can
carry his id**, because until then there is no `neon_auth.user` row for the FK to point at.

The export is user data: **kept outside the repository, never committed**; `.env*` discipline applies.

**verify:** row counts match between the Supabase export and `public.decks` on Neon.
**verify:** **zero rows with a `user_id` that is not a real `neon_auth.user`** — which the FK makes
impossible to insert, so this verifies the import did not drop rows silently.
**verify:** sign in as the owner in a real browser and see every deck.

---

## Step 8b — `security-scan`

`.security-gate` is present, so a push is blocked until a run exists newer than the branch's
merge-base. **Do not reach for the skip variable.** If neither the gate file nor the skill is found
under those names, `~/.personal-claude/settings.json` holds the hook path (§8 step 8b — the names
changed once already, mid-document).

**verify:** the scan ran and its findings are triaged in writing, not merely that it exited.

---

## Step 9 — deploy. **POINT OF NO RETURN. Blocked on O2.**

The first real write diverges the two databases.

**verify (before):** the three gates green at the exact sha being promoted, in a throwaway worktree
checked out at that sha — not on the shared tree.
**verify (after):** the production smoke of program-plan §A.6, repeated against Neon: sign in, list
decks, create one, rename it, delete it, delete the account, sign in again and land on an empty
account. Console clean.
**verify (after):** `docs/status.md` re-photographed at the deployed sha.

---

## Step 9b — the idle-tab measurement (§12.2, open item 6). First thing after step 9.

Sign in, leave **one tab open and untouched for an hour**, then read
`neonctl api /projects/round-waterfall-07137684/endpoints`.

**verify:** `suspended_at` is ~5 minutes after `last_active` and `current_state` is `idle`. **If
`last_active` keeps advancing, something is polling** — find it before it runs for a month: 730 hours
of wall clock exceeds Free at every compute size, and at 0.25 CU that is about US$9/month, which is
the Supabase bill this migration exists to remove.

---

## Step 10 — delete the Supabase project, one week after step 9. **Blocked on O3.**

**verify:** a week of real use has passed with no rollback.
**verify:** the export file still exists outside the repository.
**verify:** after deletion, `npm test` and `npm run build:web` still pass with no Supabase
environment variable set at all — proving nothing still reads it.

---

## Step 11 — the records

- Obsidian `personal/projects/riftcombo/README.md` **Infraestructura**: the Neon row (Free, 0.25 CU,
  100 CU-hours, 0.5 GB, `sa-east-1`), and the Vercel Hobby row with the 100-deploys-a-day cap, which
  is missing today.
- `personal/projects/_infra/decisions/` — a dated note for **the delete-account route** (§12.6: the
  SQL function, and why the Route C selection was superseded).
- The **§0 correction** — the decision note's *"un `where user_id` en la app"* is a security
  regression and was not done.
- `docs/status.md` §8 and the Supabase references throughout (§7.6).
- Retire the `neon-migration` branch and the `/private/tmp/rc-neon` worktree.

**verify:** `grep -rli supabase . --exclude-dir=node_modules --exclude-dir=.git
--exclude=package-lock.json` returns **only** the files §7.6 names as history — `docs/plan.md`,
`docs/reviews/`, the 2026-09-05 and 2026-09-06 specs, `tasks/lessons.md`. **Dated records are not
retro-edited.**

---

## Links

- `docs/superpowers/specs/2026-09-19-neon-migration.md` (§12 is this plan's evidence base)
- `docs/handoffs/2026-09-21-rc-neon2.md`
- `neon/migrations/0001_decks.sql` · `neon/migrations/0002_delete_account.sql` ·
  `scripts/check-rls-neon.mjs`
- [[personal/projects/riftcombo/README]] ·
  [[personal/projects/_infra/decisions/2026-09-19-todo-a-neon-salvo-sir-loin]]
