# Moving RiftCombo off Supabase and onto Neon

**Status: DESIGN ONLY. Nothing here has been executed.** No Neon project exists, no live database was
touched, no application code was changed. German approved the *decision* on 2026-09-19 and said
explicitly that it is information, not an order to execute.

Date: 2026-09-19 · Decision: [[personal/projects/_infra/decisions/2026-09-19-todo-a-neon-salvo-sir-loin]]
· Owner of this file while it was written: rc-manager12, working beside rc-manager11.

**An implementation branch already exists and you should read it before this document's §3 and §4.**
`neon-migration` in this repo, written by panel3 in a worktree at `/private/tmp/rc-neon`, carrying
`neon/migrations/0001_decks.sql` and `scripts/check-rls-neon.mjs`. **It agrees with §3.4 line for
line** — `user_id uuid not null default auth.uid() references neon_auth.user (id) on delete cascade`,
policies on `auth.uid()` — **and is ahead of it in one place, now folded back in above: the policies
carry `to authenticated`.** The RLS verifier there is the port of §4, and its author's own caveat
governs it: **written, not tested**, because no Neon project exists yet. Neither session that wrote
these two artifacts is still running, so the branch and this file are the record.

**That verifier has now been read against §4, because nobody had read it and its author is gone**
(rc-manager12, 2026-09-19). It is complete and faithful: **all sixteen checks are present with none
silently dropped** — the numbering runs 1 to 16 with 15 and 16 placed before 10 to 14, which is
correct, since the keying checks are what make 1 to 8 mean anything and the deletion checks end a
session and must go last. It sets **`Prefer: return=representation` explicitly on every non-`GET`**
rather than relying on the incidental `.select` (§4), guards with **`Array.isArray`**, makes the
positive controls **throw**, prints the **non-vacuity banner**, and **exits 2** when
`DELETE_ACCOUNT_URL` is missing. **A port that quietly loses a check is the vacuity family in its
purest form, so the count was the thing to verify and it holds.** What that review CANNOT establish
is that any assertion behaves correctly against a live database — that is still step 3 of §8, and the
author's caveat stands.

---

## Status at a glance — read this before anything else

**This document keeps its own refuted sections on purpose (§11), so a fresh reader cannot tell a live
claim from a corrected one by reading forward. This block is the index of what is currently true.**

**DECIDED, each on a measurement rather than an argument:**

| | |
|---|---|
| Replaces Supabase | Neon **Data API** (PostgREST-derived) + **Neon Auth** with Google. §3.1, §3.2 |
| Schema | `user_id uuid not null default auth.uid() references neon_auth.user (id) on delete cascade`. §3.4 |
| Policies | **A verbatim port of the four Supabase ones**, on `auth.uid()`, plus `to authenticated`. §3.4 |
| Deck deletion | The **cascade**. No statement to write, no order to get wrong. §3.3 |
| Identity deletion | **SUPERSEDED 2026-09-21 — it is the SQL function, not Route C.** `public.delete_account()`, `SECURITY DEFINER`, no parameter, no endpoint and **no deployed secret**; `authenticated` was measured able to call it and the five cascades were measured end to end. §12.6 is the live decision; the Route C reasoning is kept at §5.3. |
| `connect-src` | **Two origins** — `apirest` and `neonauth` on one endpoint id — and the generator takes a list. §7.2 |
| Origin validator | **`https` + a host ending `.neon.tech`, nothing finer.** The label count varies between projects. §7.1 |
| Cutover order | **Auth before schema** (auth creates `neon_auth`), staging table **mandatory** (the FK forbids the alternative), `security-scan` before the push. §8, §6 |
| Cost | Free tier, demonstrated by a working project rather than read off the pricing page. §10 — **but the headroom arithmetic rests on an unsourced compute size; see open item 8** |

**OPEN — SUPERSEDED 2026-09-21. All four were measured; §12 carries the answers and the commands.
The list below is kept as written, per §11, so a reader can see what was open and for how long.**

1. ~~Can a Neon upgrade recreate `neon_auth` and take the FK with it?~~ **§12.4 — partly answered.**
   The integration record and the schema have independent lifetimes (the integration is *not found*
   while the schema, its rows and all five cascading FKs are intact), and `--delete-data` is the
   documented, **opt-in** flag that drops it. **Still open:** `neon_auth` is owned by a platform role,
   so a Neon-side upgrade is outside this repository's control. Two measured mitigations are recorded.
2. ~~Does the Data API hostname survive a **branch reset**?~~ **YES — §12.3, measured on a throwaway
   branch. The URL and the endpoint id are byte-identical across `branches reset --parent`.** A NEW
   branch, however, mints a new endpoint and therefore a **new origin**.
3. ~~Does an idle signed-in tab **wake the compute**?~~ **§12.2 — the autosuspend is measured (5 min
   13 s from `last_active` to `suspended_at`); the idle-tab half is NOT measurable before cutover and
   the exact instrument is named in the plan rather than predicted here.**
4. ~~**What compute size does a new Free project default to?**~~ **0.25 CU, min and max — §12.1.**
   §10's unsourced figure was right and its top row is the live one: 400 compute-hours, ~160
   five-minute wake windows a day. The factor-of-eight uncertainty is gone.

**DECIDED 2026-09-21, on measurement — the delete-account route is the SQL function (§12.6), which
supersedes §5.3's Route C.** No `NEON_API_KEY` is deployed and `api/delete-account.ts` is not built.

**The cutover plan is `docs/superpowers/plans/2026-09-21-neon-migration-plan.md`.**

**KEPT AS REFUTED HISTORY, not as instructions** — §5.2 and §5.4 (an account-deletion gate that was
false), §3.3's opening (a `text` column decision, right on its premise and reversed when the premise
was measured), and §5.3's two-statement endpoint (superseded by the cascade). §11 says why they are
still here.

**Nothing in this document has been executed by its author.** An implementation branch exists — the
paragraph describing it is at the head of this file, above §0 — and a live Neon project exists, which
is where the measurements above come from.

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

So the four policies move — and by the end of the day's editing, **verbatim rather than nearly**
(§3.3): `sub` is a UUID, `neon_auth.user` is an ordinary table the foreign key can reference, and the
`on delete cascade` comes back with it. The security boundary stays in the database and the privacy
page's sentence stays true.

**Everything this plan expected to be hard turned out to be settleable, and all of it was settled by
measurement rather than by argument.** The identity behind `auth.uid()` was the open risk and closed
on evidence (§3.3); account deletion had three candidate routes and closed on evidence (§5.3); the
`api/` runtime cannot open a Postgres connection at all, which was found on a third review pass and
would otherwise have failed at deploy rather than at review — and then stopped being on the critical
path when the selected route turned out to need only `fetch` (§5.5). **What is left is three questions
that need the live project and nothing else. See the status block below.**

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

**And that grep was itself short, which is the more useful half of this row.** It was scoped to a
**named list of directories** (`web/ src/ test/ scripts/ api/`). A walk of the whole repository —
`grep -rli supabase . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=supabase
--exclude=package-lock.json --exclude=app.js` — returns **seven more files this plan would otherwise
have missed**: `web/account.ts`, `web/decks.ts` and `web/main.ts` (which import the *module*, not the
SDK — see §2.4), `test/xss.test.ts` (a comment), and `README.md`, `docs/status.md` and
`scripts/build-web.mjs`, all of which carry real setup instructions or build wiring. They are handled
in §7.5 and §7.6. **A named directory list is a guess about where things are; a walk is a
measurement.**

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
| `auth.uid()` in policies | **`auth.uid()` from `pg_session_jwt` — unchanged, see §3.3** |
| `auth.users` | **`neon_auth.user`, an ordinary table the FK can reference (§3.3)** |
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

### 3.3 The schema decision — reversed 2026-09-19, and the reversal is the good news

**This section first chose `text`. It is `uuid`, and the whole of §5 shrinks because of it.** The
reasoning that produced `text` was sound and its premise was an unknown that has since been measured:
`auth.uid()` returns `uuid` **or NULL when `sub` is not a valid UUID**, so a verbatim port of today's
`auth.uid() = user_id` policies would deny everything if the issued `sub` were not a UUID — **a total,
silent lockout that reads to the player as "you have no decks" rather than as an error.** `text` with
`auth.user_id()` dodged that and kept Option B (§3.2) alive as a fallback.

**Two measurements from `neon.com/docs/data-api`, brought by panel3 and re-fetched here rather than
taken on trust, retire it.** The example JWT in `troubleshooting` carries `"sub":
"41a5f680-89d2-474d-ae59-e27bfbbbd293"` and an `"id"` of the same value — **a UUID** — and
`database-advisor` prints the application-table pattern outright:

```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES neon_auth.user ON DELETE CASCADE,
  display_name text,
  PRIMARY KEY (id)
);
```

**`uuid`, referencing `neon_auth.user`, `ON DELETE CASCADE` — Neon documents the exact thing §5.3
was designed around not having.** The one prohibition on the page is narrow and is not this: *"Foreign
keys referencing unique constraints (rather than primary keys) in the `neon_auth` schema are not
supported"*, with the resolution being to reference the primary key, which is what this does.

**Decision: `user_id` is `uuid`, carries the foreign key with `on delete cascade`, and the four
policies are a VERBATIM port of the Supabase ones.** What that buys is not tidiness: **the database
guarantees again that deleting a user removes their decks**, which §5.3 correctly called a strictly
weaker property when an endpoint had to do it in two ordered statements.

**The cost, stated because panel3's message did not weigh it: this re-couples the schema to Neon Auth
and kills Option B as a cheap fallback.** A Google-numeric `sub` will not fit a `uuid` column, so
switching later is a second data migration rather than a config change. That is worth paying — Option
B was already not recommended for an independent reason (hourly sign-outs, §3.2) — but it is a real
door being closed and the next reader should know it was closed deliberately.

**And the check stays even though the risk is retired.** §4's checks 15 and 16 exist because
`auth.uid()` returning NULL is a *silent* failure, and evidence that it will not happen is not the
same as an instrument that would notice if it did. One example JWT is one sample.

### 3.4 The schema, as it will be written

```sql
-- Saved decks. Identical in intent to supabase/migrations/20260905120000_decks.sql; three changes,
-- each of which is deliberate and explained where it sits.
create table public.decks (
  id         uuid primary key default gen_random_uuid(),
  -- 1. uuid with the foreign key and the cascade, matching the pattern Neon prints in
  --    docs/data-api/database-advisor. See §3.3 for why this reversed from text.
  --    The default is new: today the browser sends user_id and the policy checks it. Letting the
  --    database supply it means the common path cannot get it wrong. The with-check below stays
  --    anyway, because a client can still send a value and override a default.
  user_id    uuid not null default auth.uid() references neon_auth.user (id) on delete cascade,
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

-- The four policies, VERBATIM from the Supabase migration: auth.uid() means the same thing under
-- pg_session_jwt that it meant under Supabase, now that §3.3 has established sub is a uuid.
-- `to authenticated` is panel3's, from the implementation branch, and it is a real hardening this
-- section did not have: Postgres defaults a policy with no TO clause to PUBLIC, so the policy would
-- also apply to `anonymous` the day anybody granted that role anything. Today `anonymous` has no
-- grants and it changes nothing; it is the day it does that this costs nothing and saves you.
create policy "owner reads own decks"   on public.decks for select to authenticated using (auth.uid() = user_id);
create policy "owner inserts own decks" on public.decks for insert to authenticated with check (auth.uid() = user_id);
create policy "owner updates own decks" on public.decks for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner deletes own decks" on public.decks for delete to authenticated using (auth.uid() = user_id);

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

**Do not paste that block as written — the third statement has a silent hole.** Found by panel3 and
confirmed against the **Postgres** documentation rather than Neon's. `ALTER DEFAULT PRIVILEGES` with
no `FOR ROLE` clause applies to *"objects created by the target_role, or the **current role if
unspecified**"*, and the manual is blunter still about what does not rescue you: *"at object creation
time, new object permissions are only affected by the default privileges of the current role, and
are **not inherited from any roles in which the current role is a member**."*

So the future-tables grant covers only tables created by **whichever role ran that statement**. If a
later migration runs as a different role — even one that is a member of it — the new table is created
with no grant to `authenticated`, and **the symptom looks nothing like the cause**: the Data API
answers `permission denied` for a table that plainly exists and whose RLS policies are correct. Neon
documents that symptom and its remedy under `/docs/data-api/access-control` without connecting it to
this clause.

Name the role instead of letting it default:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner IN SCHEMA public
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLES TO authenticated;
```

**VERIFIED against the live project: `current_user` is `neondb_owner`, so the line above is correct
as written and needs no change.** The hedge below is kept because it was the right posture and remains
right for any *other* project. Neon's own FAQ calls `neondb_owner` the *typical* owner, not a
guaranteed one. `select current_user;` on the
connection the migrations actually run through settles it, and getting it wrong reintroduces exactly
the hole this paragraph closes, with the same misleading symptom.

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
    "`auth.uid()` returned NULL and denied everything". §3.3 retires the *risk* on evidence; this
    retires the *silence*, which is a different thing and is why it stays.
16. **`auth.uid()` inside a policy equals the `sub` of the presented token.** Without it, checks 1-8
    can all pass on a database where every policy is accidentally `true` — they prove that *some*
    separation exists, not that it is keyed to the right claim. **panel3's implementation is better
    than the one this section first described and is the one to build**: insert a row **without**
    `user_id`, let the `default auth.uid()` fill it, then compare what landed against the `sub` of the
    token that was presented. A `select` merely reads what RLS allows; this proves the *default* and
    the *policies* are both reading the presented token, in one statement.

**The suite must refuse to pass vacuously, and today's one only does so by accident.** Checks 3, 4,
6 and 9 are all of the form *"X cannot see / cannot change this row"*, and **every one of them passes
against a database where the row does not exist, the table does not exist, or the Data API is
pointed at the wrong branch.**

**The root cause is one step past "vacuous", and rc-manager11 named it while fixing this on the
Supabase side (`3603382`): under RLS a denied read, update or delete is NOT AN ERROR.** PostgREST
filters the rows out and returns an empty array with `error` null, and the checks destructure the
error away — so *"correctly denied"* and *"the request blew up"* arrive at the assertion as the same
answer. That is why the fix is not merely a louder log: the helper has to assert **that the request
SUCCEEDED and returned zero rows**, and the precondition has to **throw** rather than print a failure
line. The same property holds on Neon, because the Data API is PostgREST-derived, so port the fixed
predicate rather than the original one.

**The general rule underneath, and it is why this class exists at all: A POSITIVE ASSERTION FAILS
SAFE WHEN THE REQUEST BREAKS; A NEGATIVE ONE PASSES.** If the call fails, `Boolean(undefined)` is
false and a positive check goes red on its own. A negative check reads the same broken answer as
proof. **That is why four of the fourteen were wrong while the positives beside them were fine all
along, and it is the rule to apply to any new check rather than a fact about these four.**

**A fifth instance was then found in the file that had just been fixed for four** (`8b69ab7`), and
it matters to the port because **it needs a DIFFERENT fix.** Check 12 read
`admin.auth.admin.getUserById(b.id)` and destructured the error away, so *"that account is really
gone"* printed pass whether the account was deleted or the admin call had simply failed. Demanding
`error === null` would be wrong here: **deleting the user is exactly what makes the lookup answer
404**, so the success case carries an error. The shape that works accepts **either** a clean response
with no user **or** a 404, and fails anything else by name. Port that shape too, not only the
`denied()` helper — the Neon equivalent of check 12 has the same structure. What rescues them is that checks 1, 2 and 8 are positive controls —
a deck really was saved, and it really survived — so the negatives are measured against something
known to be there. That is currently an accident of ordering rather than a stated property. Make it
explicit: **the script prints a non-vacuity line before any negative check** — how many users it
created, how many rows exist, and which branch host it is talking to — and exits non-zero if any of
those is zero. A probe that silently matches nothing must not be able to read as a pass.

**A SIXTH INSTANCE OF THE SAME CLASS, AND IT IS THE ONE THE SUPABASE SCRIPT SURVIVED BY ACCIDENT.**
Found by panel3 writing the port, re-verified here against PostgREST's own reference. **`Prefer:
return=minimal` is the default for every write**: *"With `Prefer: return=minimal`, no response body
will be returned. This is the default mode for all write requests."* A `204` with no body is what you
get **whether the `UPDATE` touched a row or touched none** — so a negative check on an update or a
delete, written the obvious way, cannot tell *denied* from *applied*. That is the same defect as the
other five, one layer lower: not in the assertion, in the protocol.

**This was true of `scripts/check-rls.mjs` until `3603382` and is no longer — and the correction is
the more useful half.** Checks 5 and 6 chain `.select("id")`, which forces `return=representation`,
and **nothing in the file says that is why**; under the original predicate `(data?.length ?? 0) === 0`
dropping it would have turned both into assertions that can never fail. Measured by running four
response shapes through both predicates: **without the `.select`, the original passes for a denial AND
for a row that was actually changed — indistinguishable — while today's helper fails both.** **The
load-bearing token is not the `.select`, it is the `Array.isArray(data)`**: `return=minimal` yields
`null`, an array test rejects it, a `?? 0` test converts it to a passing zero. **So the rule for the
port is about how the assertion is written, not about the header: require a POSITIVE SHAPE — an array
of length zero — never a numeric comparison a missing value can satisfy.** Sending the header
explicitly, as the Neon port does, is right as well; it is belt to the array test's braces.

**The response shapes the port must distinguish, verified against PostgREST's error reference:**

| Situation | Shape |
|---|---|
| Read denied by RLS | **`200` with `[]` and `error` null — NOT an error** |
| Write denied by RLS `with check` | Postgres `42501`, *"insufficient privileges"*, → `403` authenticated |
| Table missing or not exposed | `PGRST205` (404) |
| Schema not exposed | `PGRST106` (406) |
| JWT invalid | `PGRST301` (401) |
| Database unreachable | `PGRST000`–`PGRST003` (503/504) |

**The point of the table is the first row and the last four**: every one of those four is a way for a
negative check to come back looking like a denial, and each has a distinguishable code. So a *denied*
helper must require **success with zero rows**, a *rejected* helper must require **exactly `42501`**,
and anything else must be **named and failed** rather than counted as a denial. **The one inference in that table is now a measurement.** It read that the error page maps `42501` to
*insufficient privileges* without saying an RLS `with check` violation returns it, and that requiring
it exactly was right anyway because a wrong guess fails loudly. **Check 7 passed against the live
database**, so the violation does return exactly `42501` and the line hardens from *require it and
accept the risk* to *require it*. **The flagged inference was the thing that got measured first, which
is the argument for flagging them.**

**AND A SEVENTH INSTANCE OF THE VACUITY CLASS WAS FOUND HERE AND AVOIDED RATHER THAN SHIPPED.** Check 9
— *a signed-out visitor reads nothing* — does not behave as the table above predicts. **The Data API
rejects a credential-less request at the door with `400` and a null code, before PostgREST is reached
at all**, rather than filtering to zero rows. The trap is the next sentence: **a database with no
table answers that same `400`**, so a check that accepted a bare `400` as proof of denial would pass
against an empty project — the exact failure this section exists to prevent, arriving in the one shape
the table could not predict because it is *upstream of PostgREST*. The fix is the general one and is
worth copying: **pair the rejection with a positive control on the SAME EXACT URL carrying a token.**
If the credential-less call is refused and the credentialled call succeeds, the refusal was about the
credential; if both fail, nothing was proved. **A rejection at the edge is indistinguishable from a
missing resource, and only a positive control on the same address tells them apart.**

**Two of the sixteen checks could never have worked and were fixed against reality**: the Management
API has **no GET-user-by-id endpoint — it answers `405`** — so checks 12 and 13 as written could not
have passed at any time. That is not a defect of the port so much as a demonstration of the author's
own caveat: **written, not tested, is a real distinction, and this is what it cost when the two were
finally compared.**

**How the two test users are created is the part that has no drop-in.** Today `check-rls.mjs` uses
`SUPABASE_SERVICE_ROLE_KEY` with `auth.admin.createUser` and `signInWithPassword`. There is no
service-role key in Neon. The replacement is Neon's Management API with a `NEON_API_KEY` — the same
credential §5 needs — creating two users on the branch and deleting them in the `finally` block. The
header comment's rule stays exactly as written: *credentials come from the environment only, nothing
here is ever written to a file or printed*, and this script remains the only file in the repository
that reads a privileged key.

---

## 5. `delete_account`, in full — the hard part, and the section that was wrong

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

### 5.2 What Neon offers — corrected 2026-09-19, after this section was wrong

**The first version of this section said account deletion was a control-plane call that soft-deletes
a row in `neon_auth.users_sync`, and declared that the gate on the whole migration. That was wrong.**
panel3 challenged it with evidence; the challenge was verified at source before being accepted, and
it holds.

`neon_auth.users_sync` and the control-plane delete belong to the **legacy** Neon Auth product. The
page documenting that endpoint lives under `/docs/reference/api/auth-legacy/` and carries its own
banner: *"Deprecated. Use `/projects/{project_id}/branches/{branch_id}/auth/users/{auth_user_id}`
instead. Removal scheduled for March 1, 2026."*

The current product, **Managed Better Auth**, keeps authentication in ordinary tables inside the
project's own database. From <https://neon.com/docs/auth/authentication-flow>, fetched 2026-09-19:

> All authentication data (users, sessions, OAuth configurations) lives in your database's
> `neon_auth` schema.

…that you can *"query these tables directly with SQL"*, that *"Changes are immediate (no sync
delays)"*, and *"You own your data"*. The tables are named: **`neon_auth.user`,
`neon_auth.account`, `neon_auth.session`, `neon_auth.verification`.** `users_sync` is not mentioned
on that page at all.

**CONFIRMED AGAINST THE LIVE PROJECT, and the confirmation is sharper than the argument.** `neon_auth`
holds real Better Auth tables — **`user`, `session`, `account`, `verification`, `jwks`** — and
**`users_sync` does not exist in it at all.** The reason this was ever in doubt is worth recording,
because it will mislead the next reader too: **Neon's own Management API reference for the DELETE
endpoint STILL says it removes the user from `users_sync`.** That page is stale against the product;
measured behaviour is a delete from `neon_auth.user`, with §3.3's cascade taking the decks. **A
vendor's reference page can describe a table its own product no longer has** — the third distinct way
this migration was misled by Neon's documentation, after two pages disagreeing about a hostname (§7.1)
and the legacy deprecation banner below.

**So deleting an account is a real SQL `DELETE` against `neon_auth.user`, not a tombstone.** Three
consequences, all of them good:

1. **`web/privacy.html` line 53 can stand unchanged.** *"At once and for good; there is no copy
   kept"* remains true. The page still needs its Supabase names swapped (§2.3), but the deletion
   paragraph does not need rewording.
2. **The `on delete cascade` may be recoverable.** §5.3 gave it up on the assumption that the
   identity lived in a managed mirror. If a foreign key from `public.decks` onto `neon_auth.user`
   is supported, the database can guarantee again that deleting a user removes their decks. This is
   open item 1 of §9 and it is worth the check, because it restores a safety property rather than
   an optimisation.
3. **The migration is no longer gated.** It has open questions; it does not have a blocker.

**Why the error happened, because the cause is more reusable than the correction.** The soft-delete
claim came from a **web-search result summary that was never fetched and read.** This project's own
rule covers it exactly — *a URL you haven't read is not a citation*, and *pessimistic verdicts are
extra load-bearing*. The verdict was the most pessimistic one available, it went into the document
as the gate, and it survived a first review because it was written with a citation-shaped sentence.
**The fetched page said the opposite of the summary, and my own earlier fetch of the Neon Auth
overview had already said "There is no separate synced users table" — I had the refuting evidence in
hand and went with the search summary anyway.**

One thing genuinely does not survive the correction, and it is worth keeping: generic Better Auth's
`authClient.deleteUser()` is **disabled by default** behind `user.deleteUser.enabled`, and Neon's own
JavaScript SDK reference does not document a `deleteUser` method. So *how* the delete is issued is
still open — see §5.3.

### 5.3 The design

**Rewritten 2026-09-19, after §3.3 got the cascade back. The decks half of this section is gone.**
`public.decks.user_id` now carries `references neon_auth.user (id) on delete cascade`, so **deleting
the identity deletes the decks, in the database, with no statement to write and no order to get
right.** Everything below about orphaned rows and two ordered statements is retained only as the
record of what the cascade buys.

**What remains is ONE question: how is the identity row deleted?** There are three routes and they
differ in what they cost, not in what they achieve. **panel3 picked the third and, in doing so, put
back the one uncertainty §5.2 had just removed** — which is the thing to notice before building it.

| Route | Needs | Status |
|---|---|---|
| **A — the browser does it** | nothing | **DEAD, measured twice.** `POST delete-user` answers **404 with an empty body — identical to a route that does not exist** — and the auth-config `PATCH` accepts only `name`, proved by sending false fields and getting *"invalid, name field required"*. **There is no toggle to turn on.** |
| **B — an endpoint runs one SQL delete** | a driver (§5.5) | Works, and is now the fallback rather than the recommendation |
| **C — an endpoint calls the Management API** | a **project-scoped** `NEON_API_KEY` | **SELECTED.** Only `fetch`, no driver — and the tombstone objection is measured and false |

**THE RECOMMENDATION FLIPPED, AND IT FLIPPED AGAINST THE ARGUMENT THIS SECTION MADE TWICE.** This
plan argued for B over C on the ground that routing through the control plane re-inherits the
tombstone question §5.2 had removed. **That was the right thing to say while it was unmeasured and it
is now simply wrong.** Measured against the live project: after a Management API delete there are
**zero rows in `user`, `session`, `account` and `decks`** — the cascade from §3.3 carrying the decks —
and **`neon_auth.user` has no `deleted_at` column at all**, so a tombstone is **impossible by
structure rather than merely absent**, which is a stronger result than the one being asked for. The
remaining objection was the secret, and that is smaller than stated too: **a Neon API key can be
scoped to a single project**, so `api/` gains a key that can reach one project rather than the
account.

**C therefore wins on every axis that was ever in dispute**: no driver, so §5.5 never bites and
nothing enters the bundle; a smaller secret than B's database credential; and a deletion whose
completeness is measured rather than argued. **B stays documented as the fallback** — it is what you
build if the Management API endpoint is ever withdrawn — and §5.5 stays for the same reason plus the
general one, that it is a property of `api/` anybody putting anything there will meet.

**So the Edge runtime constraint IS off the critical path, by the route that was selected** — which
is the opposite of what this paragraph said an hour earlier, and the reason is that the thing making
C unattractive was measured and disappeared. It remains on the path for route B, and §5.5 remains the
section that makes B buildable. **Route A would have deleted this whole section and it is dead.**

The two-design framing below predates the cascade and is kept because its cost analysis still
applies to whichever endpoint gets built.

**Design A — the database does it. SELECTED: §3.3 confirmed the FK and restored the cascade.**
`user_id uuid references neon_auth.user (id) on delete cascade` is in §3.4. Account deletion is then a
single `delete from neon_auth.user where id = auth.uid()`, and the decks go with it exactly as they do
today. This is the closest thing to the current `SECURITY DEFINER` function and it keeps the
property that made that function safe: **the row is chosen by the session, so there is nothing to
aim.** Whether the browser may issue that delete directly is a separate question — `neon_auth` is not
the `public` schema the Data API exposes by default, and exposing an auth schema to the browser is
not obviously wise — so the likely shape is still a small server endpoint, but one that runs *one*
statement and needs no control-plane key.

**Design B — a server endpoint does it in two steps (fallback, if the FK is not supported).**
There is a home for this already: `api/` runs a Vercel Edge Function today (`api/deck-url.ts`).
**Read §5.5 before writing a line of it — the obvious implementation cannot run in that directory.**

**New file: `api/delete-account.ts`.**

1. Read the caller's JWT from the `Authorization` header. **Verify it** against the issuer's JWKS —
   do not trust the claims unverified. Extract `sub`.
2. ~~`delete from public.decks`~~ — **DELETED. The cascade does it (§3.3).** Kept struck through
   because the reason it existed is the reason the cascade is worth having: without it, the identity
   could be deleted first and this could fail, leaving rows orphaned with no owner who can ever reach
   them and RLS guaranteeing nobody can clean them up through the app. **That failure mode is now
   unreachable rather than merely unlikely.**
3. `delete from neon_auth.user where id = auth.uid()` — a real SQL delete, per §5.2, **not** the
   deprecated control-plane endpoint. Under route B this needs the driver of §5.5; under route C it
   is replaced by a `fetch` and a `NEON_API_KEY`.
4. Return 204. The browser then does what it does today: clear the local session.

`web/supabase.ts`'s `deleteAccount()` keeps its exact signature — `Promise<void>`, no argument — so
`web/account.ts` and all nine DOM mocks are untouched. Only the body changes, from `.rpc(...)` to a
`fetch` of the new endpoint.

**What this costs, stated plainly rather than hidden:**

- **The `api/` directory gains a secret.** `api/deck-url.ts` needs none today. Adding a privileged
  connection string changes the security posture of that directory and means
  `test/headers.test.ts:150` — *"never mentions the service_role key or the database password in
  `web/`"* — should be widened to cover the new names, not just the Supabase ones. Note this cost is
  **smaller than the first draft claimed**: with §5.2 corrected, no `NEON_API_KEY` is needed in the
  request path at all.
- ~~**The `on delete cascade` safety property is at risk.**~~ **Settled: it survives (§3.3), and the
  two-ordered-statements version never has to be built.** Check 14 of §4 still earns its place, now as
  the thing that would notice if a Neon upgrade ever recreated `neon_auth` and took the FK with it —
  which is the half of open item 1 nobody has answered.
- **The privileged credential shrinks, and which one it is depends on the route.** Route B puts a
  database connection string in `api/`; route C puts a `NEON_API_KEY` there instead, which is a
  control-plane credential rather than one with write access to your tables. **Route C is genuinely
  the smaller secret**, and that is its second real argument after the missing driver — it is only
  the tombstone question that makes it the worse choice.
- **Under Design B the function's best property is gone: it took no argument.** The whole
  `SECURITY DEFINER` design rests on there being nothing to aim, and Design A keeps that — the row is
  still chosen by the session. Design B's endpoint *does* take an identity, the `sub` of a token, so
  the JWT verification in step 1 becomes load-bearing in a way nothing was before. A bug there is a
  "delete anybody's account" bug. **That is the single most dangerous line of code the migration
  would introduce, it exists only in Design B, and it is a third reason to prefer Design A** — after
  the cascade and the absent secret.

### 5.4 The question that was the gate, and is not

**Resolved 2026-09-19. There is no gate.** The question was whether a Neon Auth deletion leaves *"a
copy kept"* and so falsifies `web/privacy.html`. §5.2 answers it: identities are ordinary rows in
`neon_auth.user` inside the project's own database, a delete is a delete, and the privacy page's
deletion paragraph stands as written.

**What remains is an open question, not a blocker:** *how* the delete is issued — Design A or Design
B of §5.3 — which open item 1 of §9 decides. Either way the promise holds.

Kept deliberately, because a refuted claim is worth more than a deleted one: **the shape to distrust
in this document is a pessimistic verdict wearing a citation.** This section carried one for several
hours. It read as the most careful paragraph in the plan precisely because it was the most alarming,
and that is what stopped it being checked.

---

### 5.5 The runtime constraint — `api/` cannot open a Postgres connection at all

**Scope, after §3.3 restored the cascade: this section is live only under route B of §5.3** — the
endpoint that issues a SQL delete. Route A needs no endpoint and route C needs only `fetch`. It is
kept in full because route B is the route that keeps the privacy promise verified, and because the
constraint is a property of the `api/` directory that the next person to put anything there will
meet.

**`api/deck-url.ts` line 9 declares `export const config = { runtime: "edge" }`, and the Vercel Edge
runtime has no TCP.** Its documentation lists the Node modules that *are* importable — `async_hooks`,
`events`, `buffer`, `assert`, `util` — and then says of everything else: *"Some Node.js APIs other
than the ones listed above **are not supported**"*, adding that `node_modules` may be used *"as long
as they implement ES Modules and do not use native Node.js APIs"*. There is no `net`, so **`pg`,
`postgres` and every ordinary driver are unusable in that directory.** `api/tsconfig.json` agrees
with the posture in its own way: it sets `"types": []`, so no Node typings are present either.

The first draft of §5.3 said *"over a direct Postgres connection using a server-side connection
string"*. **That sentence describes something that cannot run**, and it would have failed at deploy
rather than at review — the kind of defect this plan exists to catch before anyone writes code.

**Two ways out; take the first.**

**(a) `@neondatabase/serverless` — recommended.** Neon publishes a driver for exactly this problem:
*"a low-latency Postgres driver for JavaScript and TypeScript that allows you to query data from
serverless and edge environments over **HTTP** or **WebSockets** in place of TCP"*, and a one-shot
HTTP query is precisely the shape delete-account needs:

```ts
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env["NEON_DATABASE_URL"]!);
await sql`delete from public.decks where user_id = ${sub}`;
```

It keeps `api/` on Edge, changes no runtime config, and adds one dependency. **Check its gzipped
size against the Edge code-size limit, which is 1 MB on Hobby** and covers the function's JavaScript
and everything it bundles.

**(b) Move the one file to the Node runtime.** Vercel's own page now opens *"We recommend migrating
from edge to Node.js for improved performance and reliability"*, so this is the direction the
platform is going and an ordinary driver would then work. It costs more here than it sounds: the
`"types": []` in `api/tsconfig.json` would have to change, and `api/deck-url.ts` shares that config,
so the change is not scoped to the new file. **Not recommended for this migration** — it converts a
one-line dependency into a build-configuration change touching a working endpoint.

**Either way the JWT verification of step 1 is unaffected**: the Edge runtime provides `crypto` and
`SubtleCrypto`, which is what a JWKS signature check needs, and `fetch` to retrieve the key set.

## 6. Data migration and rollback

The dataset is one table of a few dozen rows of text. This is the easiest part of the migration and
the plan should not pretend otherwise — the risk is entirely in the identity mapping, not the bytes.

**The only hard problem: existing rows are keyed to Supabase user UUIDs, and after the move the same
human has a different id.** There is no way to preserve a Supabase `auth.users.id` into Neon Auth.
So:

1. **Export** from Supabase: `select id, user_id, name, deck_text, format, created_at, updated_at
   from public.decks` **and** the email for each distinct `user_id` from `auth.users`. The email is
   the join key, because it is the only stable thing Google gives both systems.
2. **Import into a STAGING TABLE. The foreign key makes this mandatory rather than a choice, and an
   earlier draft of this step offered the alternative it forecloses.** §3.3 made `user_id` `uuid not
   null references neon_auth.user (id)`, so a deck row **cannot be inserted before its owner exists
   in `neon_auth.user`** — and "leave `user_id` NULL-able temporarily" would now mean dropping the
   `not null` and the FK, importing, and adding both back, which is a schema mutation performed
   mid-migration on the one constraint the whole deletion design rests on. **Stage the rows in a table
   with no FK, keyed by email.**
3. **Re-key on first sign-in.** Each player signs in once through Neon Auth — **which is what creates
   their `neon_auth.user` row and therefore what makes the insert legal at all** — and a one-shot
   claim step matches their verified email to the staged rows and inserts them with the new `sub`.
4. Drop the staging table when it is empty.

**Preferred alternative, and it should be checked first:** count the distinct `user_id` values in
`public.decks`. **If it is one — German's own account — every word of steps 1-4 collapses into a
single `update ... set user_id = '<his new sub>'`,** and the whole re-keying design is unnecessary
complexity. Measure before building it. **The one ordering constraint survives even in that
collapsed form**: he has to sign in to Neon Auth once before the rows can carry his id, because until
then there is no row for the foreign key to point at. **That is the same dependency as §8 step 2** —
auth before schema, auth before data — and it is worth noticing that the FK, which is a safety
property, is also the thing that makes the migration's order rigid. Both facts come from the same
constraint.

**Rollback.** Reversible at every point below, and this is the reason for the ordering in **§8**:

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

**7.1 `scripts/site-config.mjs`** — retarget the validator (§2.1), do not delete it. **Do NOT pin a
subdomain pattern, and an earlier draft of this section did.** It asserted the Data API hostname takes
the shape `https://ep-<endpoint>.apirest.<region>.aws.neon.tech`; panel3 challenged the `apirest`
segment, and re-fetching both pages shows **two official Neon pages printing different shapes for the
same URL**:

| Source | Printed URL |
|---|---|
| `neon.com/docs/data-api/get-started` | `https://ep-example.apirest.us-east-1.aws.neon.tech/neondb/rest/v1/posts?select=*` |
| `neon.com/guides/react-neon-auth-data-api` | `https://ep-xxx.us-east-1.aws.neon.tech/neondb/rest/v1` |

**RESOLVED the same day, and in favour of `apirest`.** panel3 withdrew their challenge and supplied
the deciding evidence: the example JWT in `neon.com/docs/data-api/troubleshooting` carries `iss` and
`aud` of **`https://ep-spring-silence-ad3hu80n.neonauth.c-2.us-east-1.aws.neon.tech`** — a concrete
hostname rather than a placeholder, carrying a **`neonauth`** service segment in exactly the slot
`apirest` occupies. So the shape is `ep-<id>.<service>.<region>.aws.neon.tech` with the service naming
the product, the guide's `ep-xxx.us-east-1.aws.neon.tech` was an abbreviation, and **the page that
looked like a contradiction was a simplification.** Note also the `c-2` label, which no template
anybody guessed contained.

**MEASURED AGAINST THE LIVE PROJECT, and it settles the question while strengthening the conclusion.**
The real issuer is **`ep-lucky-shadow-acwqx6jp.neonauth.sa-east-1.aws.neon.tech`** and the Data API is
**the same endpoint id with `apirest`** in the service slot. So `apirest` is real, the service segment
is real, and **`connect-src` carries two origins differing in one label.** **And the `c-2` is ABSENT
here** — present in the documented host, missing from this one. **That is the argument against pinning
a regex, made stronger rather than weaker by finally knowing the shape**: it is not merely that the
labels are unguessable, it is that **the NUMBER of labels varies between projects**, so a pattern
fitted to either host rejects the other. Read the URL; do not derive it. **The design conclusion does not depend on which wins, and
it is panel3's: the validator must not encode a guessed subdomain at all.** Both pages agree the URL
is *read* rather than templated — *"You can find the matching Data API URL on the Data API page in the
Neon Console or with `neon data-api get`"* — so a template is guessing at something the platform hands
you. **And the failure mode is the reason to care, which is why the resolution above changes nothing
here**: guess wrong and either the build throws or the correct origin is rejected, and a rejected
origin means the CSP blocks every request the browser makes — **which presents as a dead app, and
which `site-config.mjs`'s own comment says the validator exists to prevent** (*"a typo here would
disable the account layer without saying so"*). Knowing the shape is not the same as being able to
write a regex for it that a real project will satisfy; the `c-2` label is the standing evidence that
these hostnames carry segments nobody predicted. Require **`https` and a host ending in
`.neon.tech`**, and nothing finer. **Somebody has now measured it against a real project and the answer
is that the loose check was right** — see the paragraph above. The Data API is
enabled **per branch**, so the origin is a property of the branch and not of the project. Keep a
loopback form for local work. Rename `SUPABASE_URL` / `SUPABASE_ANON_KEY` to names that describe what
they now are; the comment explaining that both are public by design stays true and stays.

**7.2 `scripts/build-headers.mjs`** — `connect-src` carries exactly one origin today because Supabase
serves Auth and PostgREST from the same host. **Under Neon it is TWO, and that is now evidence rather
than an expectation.** The service segment identified in §7.1 is what separates them: `apirest` for the
Data API, **`neonauth`** for Auth, in the same slot of the same hostname shape. A same-origin reading
was proposed and **withdrawn by its own author**, who had read an abbreviated hostname in a guide as a
literal one. **Write the generator to take a LIST and join it** — which the two-origin answer now
requires, and which would have been the safe shape under either. The generator's comment
(`build-headers.mjs:19-20`) asserts the one-origin fact as a *reason* and must be rewritten whichever
way it lands, or the next reader will trust it. A wildcard remains forbidden for exactly the reason
already written there.

**7.3 `test/headers.test.ts`** — the regex at line 45 and the `SUPABASE_URL` read at line 50 both
move. The *assertion* that a wildcard is refused must survive unchanged; it is the valuable half.
Widen line 150's secret-name check to cover `NEON_API_KEY` and the connection string.

**7.4 `package.json`** — drop `@supabase/supabase-js`, add `@neondatabase/postgrest-js`, the Neon
auth client, and — if §5.3 Design B is the one built — **`@neondatabase/serverless`**, for the reason
in §5.5. Rename the `check:rls` script's target if the filename changes; **prefer keeping the
filename `scripts/check-rls.mjs`**, since RLS is still exactly what it proves.

**7.5 `scripts/build-web.mjs`** — the esbuild `define` block substitutes `__SUPABASE_URL__` and
`__SUPABASE_ANON_KEY__` into the bundle, and the build-time `console.log` prints the configured
origin. All three move with the environment variables in §7.1. This file was missing from the first
draft of this list; it was found by the walk described in §1.

**Grep for those three identifiers rather than for a line number.** An earlier draft cited
`:80-81` and `:93`. Re-measured after rc-manager11 committed to that file twice, those numbers are
**still correct** — so this is not a stale-citation correction — but the reasoning for dropping them
does not depend on whether they happen to be right today: **this is a shared tree with several
sessions writing to it, and a line number is a claim about a file's state at an instant, while an
identifier is a claim about its contents.** Cite identifiers in a plan that will be executed later.

**7.6 The documentation set, which is not optional.** Six files describe the Supabase setup to a
human and will be wrong the moment the migration lands:

| File | What is in it |
|---|---|
| `web/privacy.html` | Names Supabase 3 times. Published, dated, legally load-bearing. §2.3 |
| `public/privacy.html` | The built copy — regenerates from the above, no manual edit |
| `README.md:52-79` | The setup instructions, including `supabase db push` and the three env vars |
| `docs/status.md` | 8 references, including the hosted project ref. CLAUDE.md says this file is the measured state of the project and is read first |
| `test/xss.test.ts:9` | A comment describing where a deck name comes from |
| `web/account.ts`, `web/decks.ts` | Docblocks that explain supabase-js behaviour by name |

`docs/plan.md`, `docs/reviews/`, `docs/superpowers/specs/2026-09-05*`, `2026-09-06*` and
`tasks/lessons.md` also name Supabase and are **history — leave them alone.** The project's rule is
that dated records are not retro-edited.

Nothing else in `vercel.json` moves. In particular the `ignoreCommand` path list is untouched: `api`
is already on it, so a new `api/delete-account.ts` correctly triggers a build.

---

## 8. Cutover order, and what is reversible at each step

Each step ends in a state that either works or is one `git revert` from working. **Do not start step
1 until §9 is answered.**

| # | Step | Reversible? |
|---|---|---|
| 1 | Create the Neon project, one branch, enable the Data API on it. **NOT in the Vercel-managed org** — `neonctl projects create` there fails with *"action restricted, organization is managed by Vercel"*, which is the platform refusing, not a local misconfiguration. Use the Neon-console-managed org; both are on Free. The live project sits in **`sa-east-1`**. | Yes — delete the project. Costs nothing, touches nothing. |
| 2 | **Enable Neon Auth (Managed Better Auth) with Google FIRST, and only then apply the §3.4 schema.** The order is not cosmetic and an earlier draft had it backwards: **enabling Managed Better Auth is what CREATES the `neon_auth` schema**, and §3.4's `user_id` now carries `references neon_auth.user (id)`, so applying the schema to a project without it fails on the foreign key. Caught by panel3. | Yes — nothing points at it. |
| 3 | Write the Neon `check-rls.mjs` (16 checks) and run it. **"All 16 pass" is NOT the gate — see below.** | Yes. **This is the highest-value step and it must come before any application code.** A policy set proved before cutover costs nothing to fix; one discovered after costs a user's data. |
| 4 | Build `api/delete-account.ts`. Prove checks 10-14 against it. | Yes — no caller yet. |
| 5 | Swap the body of `web/supabase.ts`, keeping every export identical. Run the full suite: the nine DOM tests must pass untouched. | Yes — one file, one `git revert`. |
| 6 | Update `site-config.mjs`, `build-headers.mjs`, `test/headers.test.ts`; regenerate and commit `vercel.json`. | Yes. |
| 7 | Rewrite `web/privacy.html` (§2.3, §5.4) and move its "Last changed" date. | Yes. |
| 8 | Export from Supabase, import into Neon, re-key (§6). | Yes, until step 9. |
| 8b | **Run the `security-scan` skill.** This repo carries a **`.security-gate`**, so a push and `gh pr create` are blocked until a run exists newer than the branch's merge-base — and a commit that puts a privileged credential into `api/` is exactly what that gate is for. Do not reach for the skip variable. **Names verified 2026-09-19 and they changed during the writing of this plan**: the gate was `.strix-gate` with a `strix-scan` skill, was measured as present, fired on this session, and was replaced by `8ab00bb` *"Remove Strix gate (replaced by security-scan skill)"* while §8 was being edited. If a future reader finds neither name, `~/.personal-claude/settings.json` holds the hook path and is the thing to read. | Yes. |
| 9 | Deploy. **Point of no return** — the first real write diverges the two databases. | No. |
| 10 | Wait one week with both alive. Then delete the Supabase project. | No, after this. |
| 11 | Update the Obsidian README's **Infraestructura** section and the decision note, including the §0 correction. | — |

**Step 3 needs its own gate, and the first draft of this plan got it wrong.** It said *"run it
against an empty Neon database, do not proceed until all 16 pass"* — and panel3 pointed out that **an
empty database is precisely the state the vacuous checks report green on**, so as written, step 3
would have announced sixteen of sixteen against a branch with no table. The gate that does not
collapse is:

0. **The script is WRITTEN, not TESTED, until a Neon project exists** — panel3 says so of their own
   port and it belongs in the gate rather than in a footnote. Everything in it is request and response
   shapes taken from documentation; the only path exercised so far is the missing-configuration one.
   **A script whose assertions have never run is not evidence, and step 3 is where that changes.**
   Relatedly: if `DELETE_ACCOUNT_URL` is absent the run must exit **2**, not 0 — checks 10 to 12 are
   the ones guarding `web/privacy.html`, and a run that could not test deletion must not read green.
1. **The positive controls run first and THROW**, not print, if they fail. A deck really was
   created and read back, so the negatives that follow are measured against something known to be
   there. rc-manager11 made exactly this change on the Supabase script (`3603382`).
2. **The non-vacuity line is non-zero** — users created, rows present, branch host — or the run is
   red regardless of what the checks say.
3. Only then does *"16 of 16"* mean anything.

**Gate at every other step:** `npm run typecheck` **and** `npm test` **and** `npm run build:web`. A
passing vitest run is not evidence the code typechecks; that has bitten this project.

---

## 9. What is UNVERIFIED, and must be answered before step 1

Each was searched for and not settled from Neon's own documentation. None should be assumed.
**Item 2 of the first draft — "does a deletion leave a copy" — is resolved and removed; see §5.2.**
Ordered by what they block.

1. ~~**Can `public.decks` carry a foreign key onto `neon_auth.user` with `on delete cascade`?**~~
   **ANSWERED 2026-09-19 — Neon documents the exact pattern (§3.3), the cascade is back, and §5.3's
   decks half is gone.** **The second half of the question was never answered and is still live**:
   *does Neon manage that schema in a way that could drop or recreate it on an upgrade, taking the FK
   with it?* Nothing on the advisor page addresses it. It no longer selects a design — it decides
   whether a future Neon upgrade can break the migration — so ask it, and do not let the first half's
   answer stand in for it.
2. ~~**Is the Data API available on the Free plan?**~~ **ANSWERED — yes, demonstrated rather than
   read.** The live project is in a Free org with the Data API enabled and a verifier talking to it,
   which is stronger evidence than the pricing page's *"All plans include … a Data API for querying
   over HTTP"* that §10 was resting on. **This was the item the entire cost case depended on**, and it
   was the right thing to be nervous about: it was a marketing line, not a plan-matrix row. It is now
   a working endpoint.
3. ~~**How is the delete actually issued?**~~ **ANSWERED, and it closed in the opposite direction to
   this plan's recommendation (§5.3).** Route A is dead — `POST delete-user` answers `404` with an
   empty body and the auth-config `PATCH` takes only `name`, so there is no flag to set. Route C is
   selected, because the tombstone objection this document raised against it was measured and is
   false: zero rows left in `user`, `session`, `account` and `decks`, and **no `deleted_at` column
   exists**, so a tombstone is structurally impossible. The key is project-scoped.
4. ~~**Is the `sub` issued by Neon Auth a UUID?**~~ **ANSWERED — yes, in the one example available
   (§3.3), which is why the column is `uuid` again.** Recorded as answered rather than closed,
   because one example JWT is one sample; §4's checks 15 and 16 are the instrument that would notice
   if a real token ever disagreed, and they stay for that reason.
5. **Partly answered.** The hostname and the Auth origin are measured (§7.1): `apirest` and `neonauth`
   in the service slot of one endpoint id, two origins, and a label count that varies between projects.
   **What is still open is only whether the host survives a BRANCH RESET** — if it changes, the
   committed CSP is stale and every request fails closed. If a branch reset changes the host, the committed
   CSP is stale and every request fails closed.
6. **Does an idle signed-in tab wake the compute?** See §10. Independent of item 8 and the more
   dangerous of the two, because a poller exceeds Free at every compute size.
8. **What compute size does a new Free project default to?** §10's arithmetic was written on an
   unsourced `0.25 CU` and the honest range is 0.25 to the documented Free ceiling of 2 CU, which is a
   factor of eight in headroom. **One glance at the console answers it**, and the project exists.
7. ~~**Does `@neondatabase/serverless` fit the Edge code-size limit?**~~ **MOOT: route C was selected
   and needs only `fetch`.** Note how it stopped mattering, because the reasoning was wrong even though
   the outcome is right: this item warned against *"closing this by choosing route C, which is trading
   a measurable question for an unmeasured one"* — and route C's unmeasured question then got measured
   and came back clean. **The warning was correct at the time and the decision is correct now.** It
   reopens only if route B is ever built.

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

**Compute is the only thing that could bite, and HOW MUCH headroom there is rests on a number this
section asserted without a source.** An earlier draft opened *"the Free default compute is 0.25 CU"*
and did the whole arithmetic on it. **That figure appears in nothing this plan fetched** — the pricing
page gives the 100 CU-hours and not the compute size, and `neon.com/docs/manage/computes` states only
that *"The Neon Free plan supports computes with up to 2 CU (8 GB of RAM)"*, without saying what a new
project is created at. **It was almost certainly recalled rather than read, which is the one thing
this project's research rules forbid outright, and it sits under the entire reason for the
migration.** Corrected to a range rather than deleted, because the conclusion may well survive:

| If a new Free project defaults to | 100 CU-hours buys | 5-minute wake windows per day |
|---|---|---|
| **0.25 CU** (the asserted figure) | 400 compute-hours | ~160 |
| **1 CU** | 100 compute-hours | ~40 |
| **2 CU** (the documented Free ceiling) | 50 compute-hours | ~20 |

**A personal tool is comfortably inside the first row and probably inside the third, so the cost case
is likely fine either way — but "likely" is doing real work in that sentence and it did not need to.**
The measurement is one glance at the compute size in a console that now exists (§9 item 8).

**The one way to lose the headroom outright is a background poller**, and that is independent of which
row is true. If anything wakes the database on a timer — a health check, or a token-refresh path that
touches the Data API rather than the auth service — the compute never sleeps, and 730 hours of wall
clock exceeds Free at **every** size in the table. That is item 6 of §9. At Launch prices the overrun
is roughly US$9 a month at 0.25 CU, which is the Supabase bill this migration exists to remove — **so
it is worth measuring rather than assuming**, which is advice this section failed to take itself.

**Saving:** US$10/month, US$120/year, plus a slot under Supabase Free's two-active-project cap.

---

## 11. What this plan deliberately does not do

- **It does not replace RLS with an application-level `where` clause.** §0.
- **It does not rename `web/supabase.ts`.** §2.4 — nine tests are worth more than a tidy filename.
- **It does not estimate the work in hours.** The decision note says *"horas de trabajo, no
  semanas"*, and for the table, the policies and the four CRUD functions that is right. §5's
  correction moved account deletion much closer to that estimate than the first draft claimed — it
  is a SQL delete, not a control-plane dance — but it is still the one piece that turns a database
  function taking **no argument** into something that must verify a JWT and act on the identity
  inside it. Price that line on its own.
- **It does not treat its own refuted sections as embarrassing, and there are now three.** §5.2 and
  §5.4 keep the account-deletion verdict that was wrong, the evidence that killed it, and the reason
  it survived review; §3.3 keeps the `text` decision that was right on its premise and reversed the
  moment the premise was measured; §5.5 records a design that could not have run. **All three were
  overturned by somebody bringing evidence rather than by anybody being careful in the abstract**,
  which is the only reason to keep them legible. A plan that quietly deletes its mistakes teaches the
  next reader nothing about which of its remaining claims to distrust.
- **It does not claim any of its numbers are safe to quote.** Two Neon doc pages disagreed about a
  hostname (§7.1), a gate file was renamed mid-document (§8 step 8b), and the schema decision reversed
  inside one day. Re-measure before relying on anything here.
- **It does not delete the Supabase project at cutover.** §8 step 10.

---

---

## 12. The measurements of 2026-09-21, and the fork they settle

**Measured by rc-neon2 against the live project, read-only on `main` and destructively only on a
throwaway branch that was created and deleted inside this session.** Nothing on `main` was written.
Every command below is reproducible; run it before trusting the number, as §11 asks.

**The credential question is answered and it is not an environment variable.** `neonctl` on this
machine is already authenticated — `neonctl projects list` prompts for an organisation rather than
for a login — so no `NEON_API_KEY` had to be handled, printed or stored by this session. That is the
better posture and it should be kept: **`neonctl api <path>` is an authenticated passthrough to the
Management API**, so every measurement below was taken without a secret ever entering a transcript.
A deployed `NEON_API_KEY` is a separate question and, per the decision in §12.6, is no longer needed.

**The coordinates, so nobody re-derives them:**

| | |
|---|---|
| Org | `org-billowing-dawn-47109886` — the personal one. **Not** `org-square-field-00979315`, which is the Vercel-managed org §8 step 1 says refuses `projects create`. |
| Project | `riftcombo` = `round-waterfall-07137684`, `aws-sa-east-1`, Postgres **18**, created 2026-09-20T02:07:57Z |
| Branch | `main` = `br-tiny-bird-aczxgj3q` (primary, default, unprotected) |
| Endpoint | `ep-lucky-shadow-acwqx6jp` |
| Data API | `https://ep-lucky-shadow-acwqx6jp.apirest.sa-east-1.aws.neon.tech/neondb/rest/v1`, status **active** |
| Roles on the branch | `authenticator`, `anonymous`, `authenticated`, `neondb_owner` |
| Schemas | `auth` (owner `cloud_admin`), `neon_auth` (owner `neon_auth`), `pgrst` (owner `neon_service`), `public` |
| Extensions | `pg_session_jwt 0.5.0`, `plpgsql 1.0` — and nothing else |

**`neonctl data-api get` also prints the settings, and two of them are load-bearing:**
`db_anon_role` is **`anonymous`** — the spec's warning against Supabase muscle memory is confirmed
from the platform's own mouth — and `db_schemas` is **`["public"]` alone**, so `neon_auth` is not
reachable through the Data API at all. That second one is not a detail; §12.6 rests on it.

### 12.1 Open item 8 — the default compute size is 0.25 CU. ANSWERED.

```
neonctl api /projects/round-waterfall-07137684/endpoints
  → "autoscaling_limit_min_cu": 0.25, "autoscaling_limit_max_cu": 0.25
neonctl projects list --org-id org-billowing-dawn-47109886
  → default_endpoint_settings: { autoscaling_limit_min_cu: 0.25, autoscaling_limit_max_cu: 0.25 }
```

Min and max are **both 0.25**, so it is a fixed size rather than an autoscaling range. **§10's
unsourced figure was right, and the top row of its table is the live one**: 100 CU-hours ÷ 0.25 CU =
**400 compute-hours**, about **160 five-minute wake windows a day**. The factor-of-eight uncertainty
is gone and the cost case holds with the headroom §10 hoped for. **The correction §10 made to itself
stands as the more useful half** — the figure was recalled rather than read, and it happened to be
right, which is not the same as having been safe to state.

### 12.2 Open item 6 — scale-to-zero is measured; the poller half is not, and cannot be yet.

```
"last_active":   "2026-09-20T02:26:34Z"
"suspended_at":  "2026-09-20T02:31:47Z"     → 5 min 13 s
"suspend_timeout_seconds": 0                → platform default, which on Free is 5 minutes
"current_state": "idle"
```

**The compute really does suspend, on the documented 5-minute timer, on this project.** Project
lifetime totals at the time of measurement: `active_time 1424 s` and `cpu_used_sec 358 s` — about
0.1 CU-hours against 100, after a day of somebody building and probing it.

**What is NOT answered is the question as §9 asked it**, and it cannot be until the app runs against
Neon: *does an idle signed-in tab wake the compute?* The architecture predicts no — a Neon Auth token
refresh addresses the **`neonauth`** host, which is the auth service, while only the **`apirest`**
host reaches Postgres, and the compute wakes on database traffic — **but that is a prediction, and
§10's own history is what a recalled number costs.** The instrument is named in the plan instead:
after cutover, sign in, leave one tab open and untouched for an hour, then read `last_active` and
`suspended_at` off the endpoint. If they stay 5 minutes apart the tab is not a poller; if
`last_active` keeps advancing, it is, and 730 hours of wall clock exceeds Free at every compute size.

### 12.3 Open item 5 — the Data API hostname SURVIVES a branch reset. ANSWERED.

Measured on a throwaway branch (`rc-neon2-probe`, `br-winter-sun-acazjjuv`), created from `main` and
deleted afterwards, so that `main` was never reset:

| | Before `branches reset --parent` | After |
|---|---|---|
| Data API URL | `https://ep-noisy-rain-acnusu71.apirest.sa-east-1.aws.neon.tech/neondb/rest/v1` | **identical** |
| Endpoint id | `ep-noisy-rain-acnusu71` | **identical** |
| Data | 1 user deleted, 1 probe deck present | restored to the parent: 2 users, 1 deck |

**A reset restores the DATA and leaves the ENDPOINT alone, so the committed CSP does not go stale.**
The reason is structural rather than incidental and is worth keeping: the Data API URL is derived
from the **endpoint** id, and a reset acts on the branch's data, not on the compute attached to it.

**The finding beside it is the one that can still bite, and it is new.** Creating the probe branch
minted a **new endpoint** (`ep-noisy-rain-acnusu71`, against `main`'s `ep-lucky-shadow-acwqx6jp`) and
the child **inherited the Data API already active**, with its own URL. So **a new branch is a new
origin.** The CSP is pinned to a branch, not to a project: branching for a test is free, and pointing
the deployed app at a branch is a `vercel.json` change. That is an argument for §7.1's loose validator
all over again — `https` plus a host ending `.neon.tech` accepts both hosts, and any regex fitted to
one endpoint id rejects the other by construction.

### 12.4 Open item 1 — partly answered, and the residual is named rather than waved away.

**What is measured:** `neonctl neon-auth status` answers *"Neon Auth is not configured for this
branch"* and `neonctl neon-auth disable` answers *"Neon Auth integration not found for branch"* —
**while `neon_auth` holds nine live tables, two user rows, three sessions, and all five cascading
foreign keys are intact.** So **the integration record and the schema have independent lifetimes, and
losing the integration does not touch the schema, the data or the FK.** That is the reassuring half
and it was not obvious.

**What is documented by Neon's own tooling, and is the sharpest evidence available short of doing
it:** `neonctl neon-auth disable --help` carries

```
--delete-data    Permanently delete all Neon Auth data and schema from the database
                 [boolean] [default: false]
```

**So the operation that would drop the schema exists, is named, and is OPT-IN.** An ordinary disable
does not reach it.

**What is unmeasured and stays open:** whether a **Neon-side** upgrade can recreate the schema. The
ownership measurement is why the question is legitimate rather than paranoid —

```sql
select n.nspname, pg_get_userbyid(n.nspowner) from pg_namespace n;
  → neon_auth | neon_auth      auth | cloud_admin      pgrst | neon_service      public | pg_database_owner
select c.relname, pg_get_userbyid(c.relowner) from pg_class c ... where n.nspname='neon_auth';
  → all nine tables owned by neon_auth
```

**`neon_auth` and every table in it are owned by a platform role, not by `neondb_owner`.** The
project owner cannot stop Neon migrating that schema, so "could an upgrade take the FK with it" is a
question about Neon's release practice and not about anything in this repository.

**Two structural mitigations, both measured, and the first is the one nobody had noticed:** the
foreign key is a **two-way** guard — while `decks_user_id_fkey` exists, a plain
`drop table neon_auth."user"` **fails** on the dependent constraint, so the destructive path has to
be an explicit `cascade` and cannot happen by omission. And there are **no event triggers, no rules
and no user-defined triggers** on `neon_auth."user"` (the ten triggers present are all internal
`RI_ConstraintTrigger` cascade and no-action pairs), so nothing in that schema is watching or
rewriting a delete.

**Standing instrument rather than a standing worry:** §4's check 14 — *deleting one account leaves
the other user's decks alone* — is what would notice if the cascade ever stopped existing, and §12.6
below adds a cheaper one: a single `select pg_get_constraintdef` assertion in
`scripts/check-rls-neon.mjs` costs nothing and fails loudly the day the FK is not there.

### 12.5 The schema is already applied on `main`, and it matches §3.4.

`neon/migrations/0001_decks.sql` and `0002_delete_account.sql` are **live on `br-tiny-bird-aczxgj3q`**
— presumably applied by panel3 — and were read back rather than assumed:

- `decks.user_id` is `uuid`, `not null`, `default auth.uid()`, and
  `FOREIGN KEY (user_id) REFERENCES neon_auth."user"(id) ON DELETE CASCADE`. ✓ §3.4
- The three CHECK constraints (`decks_name_length`, `decks_text_length`, `decks_format_known`) are
  present with the printed bounds. ✓
- **Four policies, every one `to authenticated`**, `using`/`with check` exactly
  `(user_id = auth.uid())` on the four verbs. ✓ §3.4
- `public.delete_account()` — **`prosecdef = t`**, `proconfig = {search_path=""}`, owner
  `neondb_owner`. ✓ `public.touch_updated_at()` — `prosecdef = f`, same empty search path. ✓
- Grants on `public.decks`: `authenticated` has `SELECT, INSERT, UPDATE, DELETE`; **`anonymous` has
  nothing at all.** ✓
- `has_function_privilege`: `authenticated` → `delete_account` **true**; `anonymous` **false**;
  `authenticator` **false**. ✓ matches the `revoke`/`grant` block of `0002`.

**Stated as a limit rather than left implied: three things in `0001` were NOT read back** — the two
indexes (`decks_user_updated_idx`, `decks_user_name_idx`), the `decks_touch_updated_at` trigger, and
the `ALTER DEFAULT PRIVILEGES FOR ROLE neondb_owner` line. They are cheap to check and the plan does
it at step 3 rather than this section claiming them.

### 12.6 THE FORK — the delete-account route is the SQL FUNCTION. §5.3's Route C is superseded.

**§5.3 selected Route C (an Edge function calling the Management API with a project-scoped
`NEON_API_KEY`). That selection is superseded by measurement, and the worktree's
`neon/migrations/0002_delete_account.sql` — a `SECURITY DEFINER` function, no endpoint, no secret —
is the route to build.** §5.3 is kept unedited above, as §11 requires; this is the live decision.

**Route C was chosen on the strength of two claims. The first is still true and the second stopped
being a reason.** It is true that the Management API delete works and leaves no tombstone. But §5.3's
argument for it over Design A was that *"whether the browser may issue that delete directly is a
separate question"* and that `neon_auth` is not exposed to the Data API — **and both of those are
arguments against the browser doing it, not against a database function doing it.** A `SECURITY
DEFINER` function in `public` is reachable through the Data API's `/rpc/` surface precisely because
`public` is exposed and `neon_auth` is not; the function is the door, and it is the only one.

**What was measured, on the throwaway branch, in this order:**

```
set role authenticated;  select public.delete_account();   → SUCCEEDS (returns void)
set role anonymous;      select public.delete_account();   → ERROR: permission denied for function delete_account
```

The first line is the whole decision. `authenticated` has **no `USAGE` on schema `neon_auth`** and
**no `DELETE` on `neon_auth."user"`** (both measured false, `neondb_owner`'s DELETE measured true),
and the call still succeeds — **so the `SECURITY DEFINER` escalation works through the Data API's own
role, which is the one thing that was genuinely unknown.** It deleted zero rows because `auth.uid()`
is NULL with no JWT presented, which is the safe no-op the migration's header claims.

**The cascade, measured end to end rather than inferred from the constraint definitions:**

| | users | sessions | accounts | decks |
|---|---|---|---|---|
| victim before `delete from neon_auth."user" where id = <victim>` | 1 | 1 | 1 | 1 |
| victim after | **0** | **0** | **0** | **0** |
| the other user, after | 1 | 2 | 1 | 1 |
| orphans anywhere (`session`, `account`, `decks`) | | | | **0** |

**Five foreign keys cascade from `neon_auth."user"`** — `session`, `account`, `member`, `invitation`
and `public.decks` — so one delete takes the sessions, the OAuth links, the org memberships and the
decks. The worktree migration's header asserted exactly this from a Management API delete; it is now
confirmed from the SQL side, which is the side the function actually uses.

**Why the SQL function wins, on each axis §5.3 argued:**

| Axis | Route C (Management API) | The SQL function |
|---|---|---|
| Secret in the deployed environment | a `NEON_API_KEY` in Vercel | **none** |
| New attack surface | a new Edge endpoint | **none** — `api/` gains nothing |
| What aims the delete | the `sub` of a token the endpoint verifies | **`auth.uid()` alone. The function takes no parameter, so there is nothing to aim.** |
| Worst bug it can have | "delete anybody's account" | a no-op |
| Distance from today's code | a new file plus JWT verification | `.rpc("delete_account")` → `.rpc("delete_account")` |
| Completeness of the deletion | measured: zero rows | measured: the same five cascades, from the same one row |

**The last row of that table is the one §5.3 could not have known.** It preferred C because C's
completeness had been measured and A's had not. A's is measured now, it is the *same* cascade, and
everything else on the table favours A. §5.3's own words — *"that is a third reason to prefer Design
A"* — were right and were overruled by an asymmetry in evidence that no longer exists.

**`web/privacy.html`'s promise is kept by the database rather than by an endpoint**, which is the
sentence §0 spent its length defending: *"there is no copy kept"* is true because the row is gone and
four other tables went with it, not because a server was careful.

**What remains unproven and is a plan step, not a doubt:** the function has been called **as the
`authenticated` role in SQL** and **not yet through PostgREST's `/rpc/delete_account` with a real
JWT**. That is check 11 of §4 and it is step 3 of the cutover. Two specific things to assert there,
because they are the ways this can still fail quietly:

1. **PostgREST must expose the function.** `db_schemas` is `["public"]` and the function is in
   `public` with `EXECUTE` granted to `authenticated`, so it should appear at `/rpc/delete_account` —
   *should*, and the word is doing work.
2. **`auth.uid()` must be non-NULL inside it.** With a JWT presented, the function deletes the
   caller's row; with none, it deletes nothing. **A test that does not first prove the row existed
   cannot tell those apart** — the vacuity class, in the one place where a false pass means an
   account that was never deleted while the UI said it was.

**`api/delete-account.ts` is therefore NOT built, `NEON_API_KEY` is NOT deployed, and §7.3's widening
of the secret-name check shrinks to the connection string alone.** §5.5's Edge-runtime constraint
stays refuted-history: it bites nothing, because nothing is built in `api/`.

### 12.7 Two facts that are not in this spec and would each have cost a debugging session

**(a) `authenticated` can EXECUTE `auth.uid()` and has NO `USAGE` on schema `auth`.**

```sql
select r.rolname, has_schema_privilege(r.rolname,'auth','USAGE'), has_function_privilege(r.rolname,'auth.uid()','EXECUTE')
  → authenticated | f | t        anonymous | f | t        authenticator | f | t        neondb_owner | t | t
set role authenticated; select auth.uid();
  → ERROR: permission denied for schema auth
set role authenticated; select count(*) from public.decks;
  → 0 rows, NO ERROR
```

**A direct call to `auth.uid()` is refused and the RLS policy that calls it works.** The reason is
ordinary Postgres and is worth stating so nobody "fixes" the grants: **schema `USAGE` is checked when
a name is RESOLVED, and a stored policy expression already holds the function's OID**, so only
`EXECUTE` is checked at run time. Neon has granted exactly the narrower privilege on purpose.

**The consequence lands on `scripts/check-rls-neon.mjs` check 16** — *`auth.uid()` inside a policy
equals the `sub` of the presented token*. **Do not implement it as a read of `auth.uid()`** through
an `/rpc/` wrapper or a view: it fails with a permission error, and §4's own table is the reason that
matters — a permission error is one more way for a check to come back looking like a denial. panel3's
implementation — **insert a row without `user_id`, let `default auth.uid()` fill it, compare what
landed against the token's `sub`** — is immune to this, and this is a second and independent reason
to keep it.

**(b) A signed-out visitor is refused at the GRANT, not filtered by RLS.**

```sql
set role anonymous; select count(*) from public.decks;
  → ERROR: permission denied for table decks
```

`anonymous` holds no privilege on `public.decks` at all. **That is a stronger property than RLS
filtering to zero rows** and it is what commit `e458b70` on the implementation branch means. It does
**not** contradict §4's seventh vacuity instance, which observed the Data API rejecting a
credential-less request at the door with `400` before PostgREST is reached — **the two are different
layers and both hold**, and check 9 must still pair its rejection with a positive control on the same
URL, because a `400` from an empty project is indistinguishable from a `400` from a refused one.

### 12.8 What this session did NOT touch

`main` was read from and never written to. The destructive tests ran on `rc-neon2-probe`
(`br-winter-sun-acazjjuv`), created from `main` at `0/1BF9CB0` and **deleted at the end of the
session**; `neonctl branches list` afterwards returns `main` alone. Neon Auth was not enabled, no
OAuth client was created, no application code was changed, no Supabase project was touched, and
nothing was deployed.


## Links

- [[personal/projects/riftcombo/README]]
- [[personal/projects/_infra/decisions/2026-09-19-todo-a-neon-salvo-sir-loin]]
- `supabase/migrations/20260905120000_decks.sql` · `supabase/migrations/20260905130000_delete_account.sql`
- `web/supabase.ts` · `scripts/check-rls.mjs` · `scripts/site-config.mjs` · `scripts/build-headers.mjs`
  · `api/deck-url.ts` (the Edge-runtime precedent, §5.5) · `api/tsconfig.json`
- <https://neon.com/pricing> · <https://neon.com/docs/data-api/get-started>
  · <https://neon.com/docs/extensions/pg_session_jwt>
  · <https://neon.com/docs/data-api/custom-authentication-providers>
- Load-bearing and added on later passes: <https://neon.com/docs/data-api/database-advisor> (the FK
  and cascade pattern, §3.3) · <https://neon.com/docs/data-api/troubleshooting> (the example JWT —
  `sub` as a UUID, and the `neonauth` hostname segment, §3.3 and §7.1)
  · <https://neon.com/docs/auth/authentication-flow> (identities are ordinary tables, §5.2)
  · <https://vercel.com/docs/functions/runtimes/edge> (no TCP, §5.5)
  · <https://neon.com/docs/serverless/serverless-driver> (HTTP/WebSockets in place of TCP, §5.5)
  · <https://docs.postgrest.org/en/stable/references/api/preferences.html> (`return=minimal` is the
  default for writes, §4) · <https://docs.postgrest.org/en/stable/references/errors.html>
