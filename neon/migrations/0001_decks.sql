-- Saved decks (#31), on Neon. Same intent as supabase/migrations/20260905120000_decks.sql, which
-- this replaces. See docs/superpowers/specs/2026-09-19-neon-migration.md for the full reasoning.
--
-- The architecture does not change: the browser still talks to an auto-generated REST layer
-- directly -- Neon's Data API instead of Supabase's PostgREST -- carrying the signed-in player's
-- own JWT. Isolation is still RLS and nothing else, because there is still no server in the
-- request path. That is why every one of the four verbs needs its own policy: without the insert
-- policy nobody can save at all, and without the delete policy anybody could delete anybody's row.
--
-- Three things differ from the Supabase version, each deliberate:
--
--   1. `user_id` is `text`, not `uuid`, and the policies call `auth.user_id()`, not `auth.uid()`.
--      `auth.uid()` returns NULL when the JWT's `sub` claim is not a valid UUID, and a policy
--      comparing NULL denies every row -- which reads to the player as "you have no decks" rather
--      than as an error. A silent total lockout is the worst failure this table can have, so the
--      column type is chosen to make it impossible instead of unlikely. `text` is right for a UUID
--      `sub` and for a provider's numeric `sub` alike.
--
--   2. `user_id` gains a default. Today the browser sends it and the policy checks it; letting the
--      database supply it means the common path cannot get it wrong. The `with check` stays anyway,
--      because a client can still send a value and override a default.
--
--   3. There is no foreign key to the user, so there is no `on delete cascade` either. Under
--      Supabase this pointed at `auth.users`. Neon's Managed Better Auth does keep its identities
--      in a real table in this same database (`neon_auth.user`), so an FK looks possible -- but
--      whether Neon permits one into a schema it manages, and whether it survives Neon recreating
--      that schema on an upgrade, is UNVERIFIED. Betting the migration on it is not worth it for a
--      table that will hold tens of rows. Deleting the rows is therefore the job of the
--      delete-account endpoint, in the documented order. See §5 of the spec.

create table public.decks (
  id         uuid primary key default gen_random_uuid(),
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

-- Every read this app makes is "my decks, most recently edited first".
create index decks_user_updated_idx on public.decks (user_id, updated_at desc);
-- A name is unique to one player, not to the table: two players may both keep a "Lux ramp".
create unique index decks_user_name_idx on public.decks (user_id, lower(name));

alter table public.decks enable row level security;

-- The four policies, one per verb, unchanged in shape from the Supabase original.
--
-- `to authenticated` is new and is not in the original. It is belt-and-braces: the grants below go
-- only to `authenticated`, so the anonymous role could not reach this table anyway, but naming the
-- role on the policy means a future grant widened by accident does not silently widen these too.
-- This is also the shape Neon's own Data API documentation uses.
create policy "owner reads own decks"   on public.decks for select to authenticated using (user_id = auth.user_id());
create policy "owner inserts own decks" on public.decks for insert to authenticated with check (user_id = auth.user_id());
create policy "owner updates own decks" on public.decks for update to authenticated using (user_id = auth.user_id()) with check (user_id = auth.user_id());
create policy "owner deletes own decks" on public.decks for delete to authenticated using (user_id = auth.user_id());

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
-- today, so it is not a regression -- but it is why any future table added to `public` is exposed
-- the moment it exists, and why it must ship with its own policies in the same migration.
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
grant usage, select on all sequences in schema public to authenticated;
