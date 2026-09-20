# Moving RiftCombo off Supabase and onto Neon

**Status: DESIGN ONLY. Nothing here has been executed.** No Neon project exists, no live database was
touched, no application code was changed. German approved the *decision* on 2026-09-19 and said
explicitly that it is information, not an order to execute.

Date: 2026-09-19 · Decision: [[personal/projects/_infra/decisions/2026-09-19-todo-a-neon-salvo-sir-loin]]
· Owner of this file while it was written: rc-manager12, working beside rc-manager11.

---

## 0. The one correction to the approved decision

The decision note and the project README both say, in the same words:

> Cuatro policies de propietario sobre una tabla son un `where user_id = <usuario de la sesión>` en la app.

**That sentence describes a security regression, and this plan does not do it.** It is the only thing
in the recorded decision that is wrong, and it is wrong for a reason the repository states about
itself, in `supabase/migrations/20260905120000_decks.sql:9-12`:

> Isolation is RLS, not a server: the browser talks to PostgREST directly with the anon key and the
> signed-in user's own JWT, so each of the four verbs needs its own policy.

There is no server in the request path. "In the app" therefore means "in the browser", and a
`where user_id = …` written in the browser is enforced by nobody — anyone holding the public anon
key could ask for every row and get them. The privacy page promises the opposite in as many words
(`web/privacy.html`): *"Only you can read your rows. That is enforced in the database itself by
row-level security, which checks the signed-in account against the owner of every row on every read,
insert, change and delete."*

**The good news is that the downgrade is unnecessary.** Neon ships the same shape Supabase does:

- **Neon Data API** — "exposes your Postgres database as a REST endpoint secured by JWT
  authentication and Row-Level Security" (fetched from <https://neon.com/docs/data-api/get-started>,
  2026-09-19). It is PostgREST-derived and **included on every plan, Free among them** — the pricing
  page's "All plans include" list ends *"and a Data API for querying over HTTP"*.
- **`pg_session_jwt`** — provides `auth.user_id() → text` (the JWT `sub`) and `auth.uid() → uuid`
  (NULL when `sub` is not a valid UUID), inside RLS policies, exactly as `auth.uid()` works today
  (<https://neon.com/docs/extensions/pg_session_jwt>).
- What used to be marketed as *Neon RLS / Neon Authorize* was **folded into the Data API**; it was
  not withdrawn.

So the four policies move nearly verbatim, the security boundary stays in the database, and the
privacy page's sentence stays true. **The rest of this plan is mostly about the two places where the
move is genuinely not like-for-like: account deletion, and the identity behind `auth.uid()`.**

The rest of the decision note stands. Nothing below argues with the cost case or with keeping
`sir-loin` on Supabase.

---

## 1. What was measured, and the command behind each number

Measured on the working tree at `826b38f`, 2026-09-19. Re-run any of these before trusting them.

| Claim | Number | Command |
|---|---|---|
| Migrations | 2 | `ls supabase/migrations/` |
| Tables created | 1 (`public.decks`) | `grep -c "^create table" supabase/migrations/*.sql` |
| RLS policies | 4 | `grep -h "^create policy" supabase/migrations/*.sql \| wc -l` |
| Database functions | 2 (`touch_updated_at`, `delete_account`) | `grep -h "^create function" supabase/migrations/*.sql` |
| Source files importing `@supabase/supabase-js` | **3** | `grep -rl "@supabase/supabase-js" web/ src/ test/ scripts/ api/` |
| Checks in the RLS proof | 14 | `grep -c "check(" scripts/check-rls.mjs` |
| DOM tests that mock the module by path | **9** | `grep -rl 'vi.mock("../../web/supabase.js"' test/` |
| Times `web/privacy.html` names Supabase | **3** | `grep -oi supabase web/privacy.html \| wc -l` |
| Realtime · Storage · Edge Functions in use | none | no `.channel(`, no `.storage`, no `supabase/functions/` |

**The brief said "all eleven Supabase calls live in `web/supabase.ts` alone". That is true of the
application and it is not true of the repository.** `web/supabase.ts` holds `createClient` plus ten
`db().` call sites — eleven — and no other file under `web/` or `src/` imports the SDK. But two more
files do:

- `scripts/check-rls.mjs` — uses `createClient`, `auth.admin.createUser`, `signInWithPassword`,
  `auth.admin.deleteUser`, `auth.admin.getUserById`. This is the *proof* the migration has to
  reproduce, so it is a deliverable, not a detail.
- `test/supabase-account.test.ts:3` — imports the `Session` **type**. Removing the dependency breaks
  this import even though no runtime call is involved.

---

## 2. Six couplings the summary does not mention

Each of these was found by reading the repository, and each will stop the migration or ship a
falsehood if it is skipped.

**2.1 `scripts/site-config.mjs:32-36` refuses to build against a non-Supabase origin.**

```js
const hosted = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/;
const local  = /^http:\/\/(127\.0\.0\.1|localhost):\d{2,5}$/;
if (url && !hosted.test(url) && !local.test(url)) {
  throw new Error(`SUPABASE_URL is not a Supabase project origin: ${url}`);
}
```

Point the environment at a Neon host and `npm run build:web` **throws**. This guard is doing real
work and should not be deleted — it should be retargeted, because a typo'd origin would otherwise
switch the account layer off silently, which is exactly what its comment says it exists to prevent.

**2.2 `test/headers.test.ts:45` asserts the same regex against the shipped CSP.**

```js
expect(src).toMatch(/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/);
```

So the CSP is pinned to a Supabase origin by a test, not merely by the generator. Both move together
or the suite goes red.

**2.3 `web/privacy.html` is a dated, published legal document that names Supabase three times.**

It says sign-in goes *"through Supabase Auth"*, that *"Sign-in and the saved decks run on Supabase,
in a Postgres database hosted in the United States"*, and it is stamped *"Last changed 6 September
2026"*. A migration that leaves it untouched publishes a false statement about who processes the
user's data. **It also contains the hardest constraint in this whole document — see §5.**

**2.4 Nine DOM tests mock `../../web/supabase.js` by path.** This is the single most useful fact for
sequencing the work. `test/dom/gate.dom.test.ts:24` and eight siblings replace the module wholesale
and assert against this exported surface:

```
accountsEnabled · onAccount · signIn · signOut · deleteAccount · updateDisplayName
listDecks · createDeck · updateDeck · deleteDeck
```

**Keep the file path and every exported name and signature identical, and all nine tests keep
passing across the migration for free.** They become a regression harness that proves the rest of the
app never noticed the swap. Renaming the module to `web/neon.ts` buys nothing and costs nine
rewrites; do not do it. (The *docblock* inside it must change — it currently explains Supabase.)

**2.5 `accountOf()` reads a Supabase-shaped session.** `web/supabase.ts:44-52` destructures
`session.user.user_metadata.{display_name, full_name, name}` and `session.user.email`. Better Auth's
user object is flat (`user.name`, `user.email`, `user.image`). So `accountOf` needs a shim, and
`test/supabase-account.test.ts` — which builds fake sessions in that exact shape — is the test that
proves the shim preserves the fallback chain.

**2.6 `updateDisplayName` has no obvious counterpart and is the most likely thing to get quietly
dropped.** Today it writes to Supabase's `user_metadata` (`web/supabase.ts:66`), which the docblock
correctly explains is kept apart from the provider's `full_name` precisely because Supabase re-merges
the provider identity on every sign-in. Better Auth has no `user_metadata`. The honest answers are
(a) Better Auth's own `updateUser({ name })`, accepting that the "fall back to the provider's name"
behaviour changes, or (b) a `display_name` column on a small `public.profiles` table under the same
RLS pattern, which preserves today's semantics exactly. **(b) is recommended** — it keeps issue #178's
behaviour, and it costs one table and four more policies that are copies of the four we already have.

---

## 3. Architecture

### 3.1 What replaces what

| Today | After |
|---|---|
| Supabase Auth (Google) | **Neon Auth** (Managed Better Auth), Google provider |
| Supabase PostgREST + anon key | **Neon Data API** (per branch), anonymous + authenticated roles |
| `@supabase/supabase-js` | `@neondatabase/postgrest-js` + the Neon auth client |
| `auth.uid()` in policies | `auth.user_id()` from `pg_session_jwt` |
| `auth.users` | `neon_auth.users_sync` (a managed mirror — see §5) |
| `public.delete_account()` (SECURITY DEFINER) | a new Vercel Edge Function at `api/delete-account.ts` |
| `scripts/check-rls.mjs` (14 checks) | the same 14 checks against Neon |

**`@neondatabase/postgrest-js` is a thin wrapper over Supabase's own query builder.** From the npm
registry, 2026-09-19: version **`0.2.0-beta`**, and its dependency list is a single entry,
`@supabase/postgrest-js@2.79.0`. That means `.from().select().insert().update().delete().eq()
.order().single()` behave identically and the bodies of `listDecks`, `createDeck`, `updateDeck` and
`deleteDeck` barely change. **State the version plainly: the browser client is a beta package.** That
is a real risk and it is the strongest argument for keeping the module surface unchanged — if the
beta misbehaves, the blast radius is one file.

### 3.2 The auth fork, and the recommendation

Three options were considered. Two are live.

**Option A — Neon Auth (Managed Better Auth). RECOMMENDED.**
Identities live in the `neon_auth` schema in your own database, queryable with SQL and compatible
with RLS. Google OAuth is supported out of the box. Free to **60,000 MAU**. AWS regions only.
Sessions, refresh and persistence are handled, so today's `autoRefreshToken: true` behaviour survives
and a signed-in player stays signed in. This is the like-for-like move and it is why it is
recommended: it preserves the *account* concept that `web/privacy.html` promises to be able to delete.

**Option B — Google Identity as the JWT issuer directly.**
Neon's Data API accepts any JWKS. Google Identity is named explicitly: JWKS
`https://www.googleapis.com/oauth2/v3/certs`, audience = the OAuth 2.0 Client ID
(<https://neon.com/docs/data-api/custom-authentication-providers>). No auth service at all, no user
table, `auth.user_id()` is the Google `sub`. It is genuinely simpler and it **dissolves the
delete-account problem**, because there is no account record to delete — only rows.

It is not recommended for two measurable reasons. First, a Google ID token lives one hour and the
browser Sign-In flow issues no refresh token, so the player is signed out hourly; today they are not.
That is a UX regression on the *only* gate into the app (`<body data-auth>` hides everything until
signed in). Second, "Delete account … deletes the account" stops being a true sentence, and
`web/privacy.html` would need rewording rather than a name swap.

**Option C — keep Supabase Auth, move only the database, point Neon's Data API at Supabase's JWKS.**
Technically fine and named here only so nobody re-derives it: it keeps the Supabase project alive and
therefore keeps the US$10/month, which is the entire point of the move. Rejected.

### 3.3 The schema decision that makes the auth fork non-load-bearing

`auth.uid()` returns `uuid`, **or NULL when the `sub` claim is not a valid UUID**. Today's policies
are `auth.uid() = user_id` against a `uuid` column. If the migration keeps that shape and the issued
`sub` is not a UUID, every policy evaluates `NULL = user_id`, which is NULL, which denies everything —
**a total, silent lockout that looks to the player like "you have no decks" rather than like an
error.** Better Auth's documented default is UUIDs, and for Postgres adapters it lets the database
generate them, so this would *probably* work; "probably" is not good enough for a failure this quiet.

**Decision: `user_id` becomes `text` and the policies use `auth.user_id()`.** `text` is correct for a
UUID `sub` and for a Google numeric `sub` alike, so the column type stops depending on which auth
option is chosen, and Option B stays available as a fallback without a second data migration. The
cost is one column type change and the loss of `uuid` storage compactness on a table that will hold
tens of rows.

### 3.4 The schema, as it will be written

```sql
-- Saved decks. Identical in intent to supabase/migrations/20260905120000_decks.sql; three changes,
-- each of which is deliberate and explained where it sits.
create table public.decks (
  id         uuid primary key default gen_random_uuid(),
  -- 1. text, not uuid, and no foreign key. See §3.3 for the type and §5 for the missing FK.
  --    The default is new: today the browser sends user_id and the policy checks it. Letting the
  --    database supply it means the common path cannot get it wrong. The with-check below stays
  --    anyway, because a client can still send a value and override a default.
  user_id    text not null default auth.user_id(),
  name       text not null,
  deck_text  text not null,
  format     text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint decks_name_length check (char_length(name) between 1 and 60),
  constraint decks_text_length check (char_length(deck_text) between 1 and 20000),
  constraint decks_format_known check (format in ('constructed', '2v2'))
);

create index decks_user_updated_idx on public.decks (user_id, updated_at desc);
create unique index decks_user_name_idx on public.decks (user_id, lower(name));

alter table public.decks enable row level security;

-- The four policies, one per verb, unchanged in shape. auth.uid() becomes auth.user_id().
create policy "owner reads own decks"   on public.decks for select using (user_id = auth.user_id());
create policy "owner inserts own decks" on public.decks for insert with check (user_id = auth.user_id());
create policy "owner updates own decks" on public.decks for update using (user_id = auth.user_id()) with check (user_id = auth.user_id());
create policy "owner deletes own decks" on public.decks for delete using (user_id = auth.user_id());

-- Unchanged from the Supabase migration, including `security invoker` and the empty search_path.
create function public.touch_updated_at() returns trigger
  language plpgsql security invoker set search_path = ''
as $$ begin new.updated_at = pg_catalog.now(); return new; end; $$;

create trigger decks_touch_updated_at
  before update on public.decks for each row execute function public.touch_updated_at();
```

**Grants.** Neon's Data API applies, when schema access is enabled
(<https://neon.com/docs/data-api/get-started>):

```sql
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, UPDATE, INSERT, DELETE ON TABLES TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```

That grant is **blanket across the schema**, which means RLS is the only thing between a signed-in
player and every table in `public`. This is the same posture PostgREST gives Supabase today, so it is
not a regression — but it is the reason §4's proof matters more than the policy text does, and it is
the reason any future table added to `public` is exposed the moment it exists. Note the role is
`anonymous`, **not** `anon`: a grant written from Supabase muscle memory will silently apply to a role
that does not exist.

---

## 4. Replacing the 14 RLS checks, and proving the replacement is as tight

`scripts/check-rls.mjs` is the only artefact in the repository that *proves* isolation rather than
asserting it, and its own header says why: *"Prove the isolation between two real users instead of
assuming it because the policies were written."* It must survive the migration check-for-check.

The 14 checks, and what each becomes:

| # | Check today | Under Neon |
|---|---|---|
| 1 | a signed-in user can save a deck at all | unchanged |
| 2 | the second user can save one too | unchanged |
| 3 | a user's list holds only their own decks | unchanged |
| 4 | the other user cannot read that row even knowing its id | unchanged |
| 5 | the other user cannot rename it | unchanged |
| 6 | the other user cannot delete it | unchanged |
| 7 | the other user cannot plant a row under someone else's id | unchanged — **keep this one even though `user_id` now defaults**, because the default does not stop a client sending a forged value |
| 8 | the owner's row survived all of that unchanged | unchanged |
| 9 | a signed-out visitor reads nothing | **mechanism changes**: an unauthenticated Data API request, asserting 401/empty against the `anonymous` role |
| 10 | a signed-out visitor cannot call `delete_account` at all | **rewritten**: an unauthenticated POST to `api/delete-account` must be refused |
| 11 | a signed-in user can delete their own account | **rewritten against the new endpoint** |
| 12 | that account is really gone | **this is the check that changes meaning — see §5** |
| 13 | deleting one account leaves the other user alone | unchanged in intent |
| 14 | and leaves the other user's decks alone | unchanged in intent |

**Two new checks the Neon architecture requires and Supabase did not:**

15. **A JWT whose `sub` does not match any row returns nothing rather than erroring.** This is the
    guard against the §3.3 silent-lockout failure: it distinguishes "correctly denied" from
    "`auth.user_id()` returned NULL and denied everything".
16. **`auth.user_id()` inside a policy equals the `sub` of the presented token.** One `select`
    through the Data API, asserted against the token the script minted. Without it, checks 1-8 can
    all pass on a database where every policy is accidentally `true` — they only prove that *some*
    separation exists, not that it is keyed to the right claim.

**How the two test users are created is the part that has no drop-in.** Today `check-rls.mjs` uses
`SUPABASE_SERVICE_ROLE_KEY` with `auth.admin.createUser` and `signInWithPassword`. There is no
service-role key in Neon. The replacement is Neon's Management API with a `NEON_API_KEY` — the same
credential §5 needs — creating two users on the branch and deleting them in the `finally` block. The
header comment's rule stays exactly as written: *credentials come from the environment only, nothing
here is ever written to a file or printed*, and this script remains the only file in the repository
that reads a privileged key.

---

## 5. `delete_account`, in full — the hard part, and the one that can stop the migration

### 5.1 What exists today

`public.delete_account()` is `SECURITY DEFINER` with `set search_path = ''`, takes **no parameter**,
and deletes `from auth.users where id = (select auth.uid())`. Execute is revoked from `public` and
`anon` and granted only to `authenticated`. The decks go with it through
`user_id references auth.users(id) on delete cascade`. The migration's own header calls it *"the most
dangerous function in the repository"* and nails it down on five separate sides.

It is reached from `web/supabase.ts:130` via `.rpc("delete_account")`, wired at
`web/account.ts:67`, and it is described to the user at `web/privacy.html`:

> Delete account, under Account at the foot of the deck panel in Combos, deletes the account and
> every deck attached to it **at once and for good; there is no copy kept and no waiting period**.
> Each of them asks once and then does it. **You do not have to write to anybody to make either
> happen.**

That sentence is a promise, it is published, and it is the tightest constraint in this document.

### 5.2 What Neon offers, verified

Deleting a Neon Auth user is a **control-plane** operation, not a SQL one:

```
DELETE /api/v2/projects/{project_id}/branches/{branch_id}/auth/users/{auth_user_id}
Authorization: Bearer $NEON_API_KEY
→ 204 No Content
```

Two properties of it matter, and both cut against the promise above:

1. **It needs `NEON_API_KEY`, a server secret.** It cannot be called from the browser. So
   `delete_account` stops being a database function and becomes a server endpoint.
2. **It is documented as a soft delete in `neon_auth.users_sync`** — the row is marked with a
   `deleted_at` timestamp rather than removed, and consumers are told to filter deleted users out.

Generic Better Auth does expose `authClient.deleteUser()`, but it is **disabled by default** and
requires `user.deleteUser.enabled` in server config. **Neon's own JavaScript SDK reference does not
document a `deleteUser` method at all.** Under a *managed* Better Auth it is not established that the
application can set that flag.

### 5.3 The design

There is a home for this already: `api/` runs a Vercel Edge Function today (`api/deck-url.ts`).

**New file: `api/delete-account.ts`.**

1. Read the caller's JWT from the `Authorization` header. **Verify it** against the issuer's JWKS —
   do not trust the claims unverified. Extract `sub`.
2. `delete from public.decks where user_id = $sub`, over a direct Postgres connection using a
   server-side connection string. **This step is why losing the FK cascade is affordable, and it is
   the step that must happen first**: if the identity is deleted first and this fails, the rows are
   orphaned with no owner who can ever reach them, and RLS guarantees nobody can clean them up
   through the app.
3. Call the Neon Management API to delete the auth user.
4. Return 204. The browser then does what it does today: clear the local session.

`web/supabase.ts`'s `deleteAccount()` keeps its exact signature — `Promise<void>`, no argument — so
`web/account.ts` and all nine DOM mocks are untouched. Only the body changes, from `.rpc(...)` to a
`fetch` of the new endpoint.

**What this costs, stated plainly rather than hidden:**

- **The `api/` directory gains a secret.** `api/deck-url.ts` needs none today. Adding `NEON_API_KEY`
  and a connection string changes the security posture of that directory and means
  `test/headers.test.ts:147` — *"never mentions the service_role key or the database password in
  `web/`"* — should be widened to cover the new names, not just the Supabase ones.
- **The `on delete cascade` safety property is gone.** Today the database guarantees that deleting a
  user removes their decks; after the migration it is guaranteed by two statements in an endpoint,
  in the right order. That is strictly weaker and check 14 of §4 is what stops it rotting.
- **The function's best property is gone: it took no argument.** The whole `SECURITY DEFINER` design
  rests on there being nothing to aim. The endpoint *does* take an identity — the `sub` of a token —
  so the JWT verification in step 1 is now load-bearing in a way nothing was before. A bug there is a
  "delete anybody's account" bug. **This is the single most dangerous line of code the migration
  introduces and it should be reviewed as such.**

### 5.4 The blocking question

**Does a Neon Auth deletion leave "a copy kept"?** If `neon_auth.users_sync` retains a `deleted_at`
row carrying the email and name, then `web/privacy.html`'s *"there is no copy kept"* is false as
written, and one of these must happen before the migration ships:

- confirm that the identity itself is hard-deleted and only the local *mirror* keeps a tombstone,
  and say so precisely in the privacy page; or
- reword the privacy page to describe what actually happens; or
- choose Option B (§3.2), where there is no user record at all — at the cost of hourly sign-outs.

**This is the gate. It is a published promise, not an implementation detail, and it is the reason
this plan is not a cutover checklist yet.**

---

## 6. Data migration and rollback

The dataset is one table of a few dozen rows of text. This is the easiest part of the migration and
the plan should not pretend otherwise — the risk is entirely in the identity mapping, not the bytes.

**The only hard problem: existing rows are keyed to Supabase user UUIDs, and after the move the same
human has a different id.** There is no way to preserve a Supabase `auth.users.id` into Neon Auth.
So:

1. **Export** from Supabase: `select id, user_id, name, deck_text, format, created_at, updated_at
   from public.decks` **and** the email for each distinct `user_id` from `auth.users`. The email is
   the join key, because it is the only stable thing Google gives both systems.
2. **Import** into Neon with `user_id` left NULL-able temporarily, or into a staging table.
3. **Re-key on first sign-in.** Each player signs in once through Neon Auth; a one-shot claim step
   matches their verified email to the staged rows and stamps the new `sub` onto them.
4. Drop the staging table when it is empty.

**Preferred alternative, and it should be checked first:** count the distinct `user_id` values in
`public.decks`. **If it is one — German's own account — every word of steps 1-4 collapses into a
single `update ... set user_id = '<his new sub>'`,** and the whole re-keying design is unnecessary
complexity. Measure before building it.

**Rollback.** Reversible at every point below, and this is the reason for the ordering in §7:

- The Supabase project is **not deleted** until the Neon side has been live and correct for at least
  one full week. Reverting is then a rebuild of `vercel.json` with the old origin and a redeploy.
- The export is kept as a file outside the repository (it contains user data — it must never be
  committed; `.env*` discipline applies to it as well).
- The point of no return is **the first write to Neon by a real user**, because from then on the two
  databases diverge. Nothing before that is irreversible.

---

## 7. What changes in `vercel.json`, the CSP, and the build

`vercel.json` is generated by `scripts/build-headers.mjs` and **committed**, because Vercel reads it
before the build command runs. Four coordinated changes:

**7.1 `scripts/site-config.mjs`** — retarget the validator (§2.1), do not delete it. The Neon Data
API hostname takes the shape `https://ep-<endpoint>.apirest.<region>.aws.neon.tech`, and the Data API
is enabled **per branch**, so the origin is a property of the branch and not of the project. Keep a
loopback form for local work. Rename `SUPABASE_URL` / `SUPABASE_ANON_KEY` to names that describe what
they now are; the comment explaining that both are public by design stays true and stays.

**7.2 `scripts/build-headers.mjs`** — `connect-src` currently carries exactly one origin because
Supabase serves Auth and PostgREST from the same host. **Under Neon this is very likely two
origins**: the Data API host and the auth host. The generator's comment (`build-headers.mjs:19-20`)
asserts the one-origin fact and must be rewritten, or the next reader will trust it. A wildcard
remains forbidden for exactly the reason already written there.

**7.3 `test/headers.test.ts`** — the regex at line 45 and the `SUPABASE_URL` read at line 50 both
move. The *assertion* that a wildcard is refused must survive unchanged; it is the valuable half.
Widen line 150's secret-name check to cover `NEON_API_KEY` and the connection string.

**7.4 `package.json`** — drop `@supabase/supabase-js`, add `@neondatabase/postgrest-js` and the Neon
auth client. Rename the `check:rls` script's target if the filename changes; **prefer keeping the
filename `scripts/check-rls.mjs`**, since RLS is still exactly what it proves.

Nothing else in `vercel.json` moves. In particular the `ignoreCommand` path list is untouched: `api`
is already on it, so a new `api/delete-account.ts` correctly triggers a build.

---

## 8. Cutover order, and what is reversible at each step

Each step ends in a state that either works or is one `git revert` from working. **Do not start step
1 until §9 is answered.**

| # | Step | Reversible? |
|---|---|---|
| 1 | Create the Neon project, one branch, enable the Data API on it. | Yes — delete the project. Costs nothing, touches nothing. |
| 2 | Apply the §3.4 schema. Configure Neon Auth with Google. | Yes — nothing points at it. |
| 3 | Write the Neon `check-rls.mjs` (16 checks) and **run it against an empty Neon database**. Do not proceed until all 16 pass. | Yes. **This is the highest-value step and it must come before any application code.** A policy set proved on an empty database costs nothing to fix; one discovered after cutover costs a user's data. |
| 4 | Build `api/delete-account.ts`. Prove checks 10-14 against it. | Yes — no caller yet. |
| 5 | Swap the body of `web/supabase.ts`, keeping every export identical. Run the full suite: the nine DOM tests must pass untouched. | Yes — one file, one `git revert`. |
| 6 | Update `site-config.mjs`, `build-headers.mjs`, `test/headers.test.ts`; regenerate and commit `vercel.json`. | Yes. |
| 7 | Rewrite `web/privacy.html` (§2.3, §5.4) and move its "Last changed" date. | Yes. |
| 8 | Export from Supabase, import into Neon, re-key (§6). | Yes, until step 9. |
| 9 | Deploy. **Point of no return** — the first real write diverges the two databases. | No. |
| 10 | Wait one week with both alive. Then delete the Supabase project. | No, after this. |
| 11 | Update the Obsidian README's **Infraestructura** section and the decision note, including the §0 correction. | — |

**Gate at every step:** `npm run typecheck` **and** `npm test` **and** `npm run build:web`. A passing
vitest run is not evidence the code typechecks; that has bitten this project.

---

## 9. What is UNVERIFIED, and must be answered before step 1

Each of these was searched for and not found in Neon's own documentation. None should be assumed.

1. **Can a signed-in user delete their own account without a server secret** — i.e. does Neon's
   managed Better Auth expose `deleteUser()`? Neon's SDK reference does not document it. **If the
   answer is yes, §5's endpoint shrinks to almost nothing.** Check first; it is the cheapest possible
   win in this document.
2. **Does deleting a Neon Auth user leave a copy?** §5.4. This is the gate.
3. **Is the `sub` issued by Neon Auth a UUID?** §3.3 chooses `text` so that the answer stops
   mattering, but it should still be known.
4. **`neon_auth.users_sync`'s exact columns and types, and whether a foreign key onto it is
   supported or warned against.** §3.4 drops the FK on the assumption that it is not safe against a
   managed, soft-deleting mirror. If an FK *is* supported, the cascade can be restored and §5's
   ordering risk goes away.
5. **Is the Data API hostname stable across a branch reset?** It is enabled per branch. If a reset
   changes the host, the CSP is stale and every request fails closed. This decides whether §7.1's
   validator can be strict.
6. **Does an idle signed-in tab wake the compute?** See §10.

---

## 10. Cost, with the arithmetic

Verified from <https://neon.com/pricing>, 2026-09-19:

- **Free:** US$0 · 100 projects · **0.5 GB** and **100 CU-hours** per project · scale to zero after
  5 minutes, *"Always enabled on Free (suspends after 5 min, cannot be turned off)"*.
- **Launch:** *"Pay for what you use"*, *"no monthly minimum"* · **US$0.106/CU-hour** ·
  **US$0.35/GB-month**.
- The Data API is on the "All plans include" list, so it is available on Free.
- Neon Auth is free to **60,000 MAU**.

**Storage is not close to a limit:** one table of decklists, each around 1 KB
(`src/saved.ts:25` caps a list at 20,000 characters and notes a 40-card list is ~1 KB). 0.5 GB is
five orders of magnitude of headroom.

**Compute is the only thing that could bite, and it does not.** The Free default compute is 0.25 CU,
so 100 CU-hours is **400 compute-hours a month**. With a 5-minute idle suspend, a burst of activity
costs at least 5 minutes, so the budget is about **4,800 five-minute windows a month — roughly 160 a
day**. A personal tool with a handful of signed-in players is nowhere near that.

**The one way to lose that headroom is a background poller.** If anything wakes the database on a
timer — a health check, or a token-refresh path that touches the Data API rather than the auth
service — the compute never sleeps, 730 hours of wall clock at 0.25 CU is 182.5 CU-hours, and Free is
exceeded. That is item 6 of §9. At Launch prices the overrun would be about US$9 a month, which is
the Supabase bill this migration exists to remove — **so it is worth measuring rather than assuming.**

**Saving:** US$10/month, US$120/year, plus a slot under Supabase Free's two-active-project cap.

---

## 11. What this plan deliberately does not do

- **It does not replace RLS with an application-level `where` clause.** §0.
- **It does not rename `web/supabase.ts`.** §2.4 — nine tests are worth more than a tidy filename.
- **It does not estimate the work in hours.** The decision note says *"horas de trabajo, no
  semanas"*, and for the table, the policies and the four CRUD functions that is right. It is not
  right for §5: account deletion goes from a 6-line SQL function to a JWT-verifying server endpoint
  holding a privileged key, and it carries a published promise that may not survive the move.
- **It does not delete the Supabase project at cutover.** §8 step 10.

---

## Links

- [[personal/projects/riftcombo/README]]
- [[personal/projects/_infra/decisions/2026-09-19-todo-a-neon-salvo-sir-loin]]
- `supabase/migrations/20260905120000_decks.sql` · `supabase/migrations/20260905130000_delete_account.sql`
- `web/supabase.ts` · `scripts/check-rls.mjs` · `scripts/site-config.mjs` · `scripts/build-headers.mjs`
- <https://neon.com/pricing> · <https://neon.com/docs/data-api/get-started>
  · <https://neon.com/docs/extensions/pg_session_jwt>
  · <https://neon.com/docs/data-api/custom-authentication-providers>
