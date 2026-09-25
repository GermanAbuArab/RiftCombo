-- Saved decks (#31), on Neon. Same intent as supabase/migrations/20260905120000_decks.sql, which
-- this replaces. See docs/superpowers/specs/2026-09-19-neon-migration.md for the full reasoning.
--
-- The architecture does not change: the browser still talks to an auto-generated REST layer
-- directly -- Neon's Data API instead of Supabase's PostgREST -- carrying the signed-in player's
-- own JWT. Isolation is still RLS and nothing else, because there is still no server in the
-- request path. That is why every one of the four verbs needs its own policy: without the insert
-- policy nobody can save at all, and without the delete policy anybody could delete anybody's row.
--
-- Two things differ from the Supabase version, each deliberate:
--
--   1. `user_id` gains a default. Today the browser sends it and the policy checks it; letting the
--      database supply it means the common path cannot get it wrong. The `with check` stays anyway,
--      because a client can still send a value and override a default.
--
--   2. The foreign key points at `neon_auth.user(id)` instead of `auth.users(id)`. Everything else
--      about it -- the type, the cascade, the guarantee -- is unchanged, and that is the point.
--
-- ORDER MATTERS: THIS MIGRATION REQUIRES NEON AUTH TO BE ENABLED FIRST. The `neon_auth` schema is
-- created by enabling Managed Better Auth on the branch, so applying this against a project without
-- it fails at the foreign key. That inverts step 2 of the cutover plan, which had the schema and the
-- auth setup in the other order.
--
-- Why the FK is here at all, after a first draft deliberately left it out: the draft assumed Neon's
-- auth identities lived in a managed, soft-deleting mirror that it would be unsafe to reference.
-- That is the LEGACY product (`neon_auth.users_sync`), deprecated with removal announced for
-- 1 March 2026. Under Managed Better Auth the identity is an ordinary row in this same database, and
-- referencing it is the pattern Neon documents:
--
--     id uuid NOT NULL REFERENCES neon_auth.user ON DELETE CASCADE
--     -- https://neon.com/docs/data-api/database-advisor
--
-- The one documented restriction does not apply here: "Foreign keys referencing unique constraints
-- (rather than primary keys) in the neon_auth schema are not supported [...] these unique
-- constraints may change in future updates". This references the primary key.
--
-- The cascade is worth insisting on. `web/privacy.html` promises that deleting an account removes
-- every deck "at once and for good; there is no copy kept". With the cascade that is a property of
-- the database. Without it, it is two statements in an endpoint that have to run in the right order,
-- and the failure mode is orphaned rows that RLS then makes unreachable by anyone -- including the
-- person whose rows they are.
--
-- `uuid` rather than `text`, and `auth.uid()` rather than `auth.user_id()`: an earlier draft chose
-- text to stay safe against a `sub` claim that might not be a UUID, because `auth.uid()` returns
-- NULL for a non-UUID sub and a policy comparing NULL denies every row -- a silent total lockout
-- that reads to the player as "you have no decks". That risk is now measured rather than guessed.
-- Neon's own JWT example shows `id` and `sub` carrying the same UUID:
--
--     "id": "41a5f680-89d2-474d-ae59-e27bfbbbd293", "sub": "41a5f680-89d2-474d-ae59-e27bfbbbd293"
--     -- https://neon.com/docs/data-api/troubleshooting
--
-- And the foreign key turns that measurement into an assertion the database enforces: if
-- `neon_auth.user.id` were not a uuid, THIS MIGRATION WOULD FAIL TO APPLY, loudly, before anything
-- depends on it. The quiet failure the text column was defending against can no longer happen
-- quietly.

create table public.decks (
  id         uuid primary key default gen_random_uuid(),
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

-- Every read this app makes is "my decks, most recently edited first".
create index decks_user_updated_idx on public.decks (user_id, updated_at desc);
-- A name is unique to one player, not to the table: two players may both keep a "Lux ramp".
create unique index decks_user_name_idx on public.decks (user_id, lower(name));

alter table public.decks enable row level security;

-- The four policies, one per verb, unchanged in shape AND in expression from the Supabase original:
-- `auth.uid()` means the same thing on both platforms.
--
-- `to authenticated` is new and is not in the original. It is belt-and-braces: the grants below go
-- only to `authenticated`, so the anonymous role could not reach this table anyway, but naming the
-- role on the policy means a future grant widened by accident does not silently widen these too.
-- This is also the shape Neon's own Data API documentation uses.
create policy "owner reads own decks"   on public.decks for select to authenticated using (user_id = auth.uid());
create policy "owner inserts own decks" on public.decks for insert to authenticated with check (user_id = auth.uid());
create policy "owner updates own decks" on public.decks for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "owner deletes own decks" on public.decks for delete to authenticated using (user_id = auth.uid());

-- The list is ordered by updated_at, so the database keeps it rather than the client: a client that
-- forgot to send it -- or sent a wrong one -- would silently reorder somebody's saved decks.
-- Unchanged from the Supabase migration, including `security invoker` and the empty search_path.
create function public.touch_updated_at() returns trigger
  language plpgsql
  security invoker
  set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

create trigger decks_touch_updated_at
  before update on public.decks
  for each row execute function public.touch_updated_at();

-- Grants the Data API needs in order to see this schema at all.
--
-- Note the anonymous role is called `anonymous`, NOT `anon`: a grant written from Supabase muscle
-- memory names a role that does not exist here and fails. Nothing below grants to it -- a visitor
-- who is not signed in has no business reading any row of this table -- but the name is recorded
-- because the next person to add a public table will need it.
--
-- This grant is blanket across the schema, which means RLS is the only thing between a signed-in
-- player and every table in `public`. That is the same posture PostgREST gives us on Supabase
-- today, so it is not a regression -- but it is why a future table added to `public` must ship with
-- its own policies in the same migration that creates it.
--
-- `for role` on the default-privileges line is deliberate and is NOT what Neon's own examples show.
-- Written without it, `alter default privileges` silently means "for the role running this
-- statement", so it covers future tables only when the same role creates them. A later migration
-- run as a different role would produce a table with no grant, and the failure is not obvious from
-- here: it surfaces as the Data API answering "permission denied" for a table that plainly exists.
-- Neon documents that symptom and its remedy -- re-run these grants -- at
-- <https://neon.com/docs/data-api/access-control>, which is the same bug seen from the far end.
--
-- `neondb_owner` is the role Neon creates with a project, and Neon's own FAQ hedges it as
-- "typically" that name. VERIFY IT against the real project when the schema is first applied
-- (`select current_user`) and correct this line if it differs. The two ways it can be wrong do not
-- look alike: a name that matches no role at all fails loudly right here, with
-- `ERROR: role "..." does not exist`, so a typo cannot reach production. A name that IS a real role
-- but is not the one that creates future tables is the silent one -- it applies cleanly and then
-- covers nothing, which is the failure this whole `for role` clause exists to make visible.
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
alter default privileges for role neondb_owner in schema public
  grant select, insert, update, delete on tables to authenticated;
grant usage, select on all sequences in schema public to authenticated;
