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
create policy "owner reads own decks"   on public.decks for select using (auth.uid() = user_id);
create policy "owner inserts own decks" on public.decks for insert with check (auth.uid() = user_id);
create policy "owner updates own decks" on public.decks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner deletes own decks" on public.decks for delete using (auth.uid() = user_id);

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

**Verify that role name against the real project rather than trusting it here.** Neon's own FAQ
hedges `neondb_owner` as the *typical* owner, not a guaranteed one. `select current_user;` on the
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

**`scripts/check-rls.mjs` is safe from it by luck.** Checks 5 and 6 chain `.select("id")` after the
update and the delete, which forces `return=representation` and produces the row array the assertion
reads. **Nothing in the file says that is why**, and a port that dropped the `.select` — an obviously
harmless tidy-up, since the value is discarded — would silently turn both checks into assertions that
can no longer fail. The Neon port sends the header explicitly and says so in a comment.

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
and anything else must be **named and failed** rather than counted as a denial. One calibration, since
it is an inference rather than a quotation: the error page maps `42501` to *insufficient privileges*
and does **not** say in so many words that an RLS `with check` violation returns it. Requiring it
exactly is still right, because if the real code differs the check fails and names what it saw —
**which is the safe direction for a guess about a security assertion.**

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
| **A — the browser does it** | nothing | Better Auth's `authClient.deleteUser()`, **open item 3**; if it works there is no endpoint at all |
| **B — an endpoint runs one SQL delete** | a driver (§5.5) | `delete from neon_auth.user where id = auth.uid()` — a real delete, per §5.2 |
| **C — an endpoint calls the Management API** | `NEON_API_KEY` | only `fetch`, no driver — **but this is the control-plane path whose tombstone behaviour is UNVERIFIED** |

**C is what §5.2 argued against and its attraction is real**: no driver, so the Edge constraint of
§5.5 never bites and nothing is added to the bundle. **Its price is that the privacy promise goes
back to being unverified.** §5.2 established that Managed Better Auth keeps identities in ordinary
tables in the project's own database precisely so that a delete can be a delete; routing around that
through the control plane re-inherits the question of whether a tombstone is left. panel3 says so
themselves — *"sigue UNVERIFIED … solo se mide creando un usuario descartable"* — which is the right
flag and the right measurement, and it is a reason to prefer B rather than a reason to accept C.

**So the Edge runtime constraint is NOT off the critical path.** It is off it only under route C, and
route C is the one that owes an answer about `web/privacy.html`. Under B it is squarely on the path
and §5.5 is what makes B buildable. Under A neither applies. **Resolve open item 3 first; it can
delete this whole section.**

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
anybody guessed contained. **The design conclusion does not depend on which wins, and
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
`.neon.tech`**, and nothing finer until somebody measures it against a real project. The Data API is
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
| 1 | Create the Neon project, one branch, enable the Data API on it. | Yes — delete the project. Costs nothing, touches nothing. |
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
2. **Is the Data API available on the Free plan?** The pricing page's "All plans include" list ends
   *"and a Data API for querying over HTTP"* (fetched 2026-09-19), which is the basis for §10 and for
   the whole cost case. It is a marketing line rather than a plan-matrix row, and **panel3 is right
   that the dashboard settles it in two minutes.** Do that before step 1: if it is wrong, the plan
   needs Launch and §10's arithmetic changes.
3. **How is the delete actually issued?** Generic Better Auth's `authClient.deleteUser()` is disabled
   by default behind `user.deleteUser.enabled`, and Neon's own JavaScript SDK reference does not
   document the method. If a managed deployment cannot set that flag, the delete is a server-side
   SQL statement (§5.3). Either way the promise in §5.1 holds; this decides how much code it costs.
4. ~~**Is the `sub` issued by Neon Auth a UUID?**~~ **ANSWERED — yes, in the one example available
   (§3.3), which is why the column is `uuid` again.** Recorded as answered rather than closed,
   because one example JWT is one sample; §4's checks 15 and 16 are the instrument that would notice
   if a real token ever disagreed, and they stay for that reason.
5. **What is the Data API hostname, is it stable across a branch reset, and is the Auth origin the
   same host?** Three questions with one answer each, all read off the console in the same minute —
   and §7.1 documents two official Neon pages that disagree about the first. The validator stays loose
   until then (§7.1) and the CSP generator takes a list (§7.2), so **nothing is blocked on this**; it
   is here to be closed cheaply rather than guessed. If a branch reset changes the host, the committed
   CSP is stale and every request fails closed.
6. **Does an idle signed-in tab wake the compute?** See §10.
7. **Does `@neondatabase/serverless` fit the Edge code-size limit?** 1 MB gzipped on Hobby, covering
   the function's JavaScript and everything bundled with it (§5.5). **Only under route B of §5.3** —
   route A adds nothing and route C needs only `fetch`. Do not close this by choosing route C, which
   is trading a measurable question for an unmeasured one.

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
  semanas"*, and for the table, the policies and the four CRUD functions that is right. §5's
  correction moved account deletion much closer to that estimate than the first draft claimed — it
  is a SQL delete, not a control-plane dance — but it is still the one piece that turns a database
  function taking **no argument** into something that must verify a JWT and act on the identity
  inside it. Price that line on its own.
- **It does not treat its own refuted section as embarrassing.** §5.2 and §5.4 keep the wrong
  verdict, the evidence that killed it, and the reason it survived review. A plan that quietly
  deletes its mistakes teaches the next reader nothing about which of its remaining claims to
  distrust.
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
