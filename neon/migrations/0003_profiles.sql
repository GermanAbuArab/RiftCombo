-- The player's own display name (#178), on Neon. Supabase kept it in the user's `user_metadata`;
-- Better Auth has no such bag. Its `name` column is the provider's name, and overwriting it would
-- destroy the value an empty override is supposed to fall back to. So the override lives here, keyed
-- to the same identity and guarded by the same four-policy pattern as `public.decks`. Spec
-- docs/superpowers/specs/2026-09-19-neon-migration.md §2.6, option (b).
--
-- One row per player at most, created on the first rename. No row, or a null name, means "use the
-- name Google sent", which is exactly the Supabase behaviour the header and #178's tests pin.
--
-- The cascade matters for the same reason it does on decks: `web/privacy.html` promises account
-- deletion removes everything "at once and for good", and `public.delete_account()` deletes only
-- the `neon_auth."user"` row. Everything else must follow it by foreign key.

create table public.profiles (
  user_id      uuid primary key default auth.uid() references neon_auth.user (id) on delete cascade,
  display_name text,
  updated_at   timestamptz not null default now(),
  -- web/account.ts MAX_DISPLAY_NAME is 40; the client trims and collapses before it gets here.
  constraint profiles_display_name_length check (display_name is null or char_length(display_name) between 1 and 40)
);

alter table public.profiles enable row level security;

create policy "owner reads own profile" on public.profiles
  for select to authenticated using (user_id = auth.uid());
create policy "owner inserts own profile" on public.profiles
  for insert to authenticated with check (user_id = auth.uid());
create policy "owner updates own profile" on public.profiles
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "owner deletes own profile" on public.profiles
  for delete to authenticated using (user_id = auth.uid());

-- Explicit, like decks: the default privileges from 0001 would also cover a table created by
-- neondb_owner, but a grant that is written down does not depend on who ran the migration.
grant select, insert, update, delete on public.profiles to authenticated;
