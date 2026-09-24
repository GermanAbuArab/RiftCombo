-- Carrying the decks saved on Supabase across to Neon (spec §6). Measured 2026-09-24: 2 decks,
-- 2 different owners, 7 Google accounts on Supabase. So the one-line re-key the spec hoped for does
-- not apply, and the staging design does.
--
-- A deck cannot be inserted into public.decks before its owner exists in neon_auth."user" (the FK),
-- and an owner exists only after they sign in through Neon Auth once. So the rows wait here, keyed to
-- the owner's GOOGLE ACCOUNT ID, and each player's first sign-in claims their own.
--
-- WHY THE GOOGLE ID AND NOT THE EMAIL, which is what the spec proposed. This Neon Auth accepts
-- email-and-password sign-ups (the RLS verifier creates its test users that way), and nothing stops
-- a stranger signing up with another player's Gmail address. Keyed by email, that stranger would
-- claim the player's decks. Keyed by the Google `sub`, the caller must hold that exact Google
-- identity: `neon_auth.account` records it as "accountId" for "providerId" = 'google', and only a
-- real Google sign-in can create that row.
--
-- The schema is NOT `public`, so the Data API (db_schemas = public) never exposes the table, and no
-- role but the owner holds any privilege on it. The only way in or out is the function below.

create schema migration;
revoke all on schema migration from public;

create table migration.staged_decks (
  google_sub text not null,
  name       text not null,
  deck_text  text not null,
  format     text not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

revoke all on migration.staged_decks from public;

-- Moves the caller's staged decks into public.decks under their Neon id, and returns how many.
-- Idempotent: once claimed, a row is gone from staging, so a second call moves nothing. Called by the
-- app before it lists decks, which is why it must be cheap when there is nothing to do.
--
-- A staged name that collides with a deck the player already has on Neon (the unique index is per
-- player, case-insensitive) is kept under the first free suffixed name — "X (moved)", then
-- "X (moved 2)" and so on — rather than dropped, and row by row, so one awkward collision can never
-- abort the whole claim (post-commit review of 7f31d80). Losing a deck in a migration is the one
-- outcome this function exists to prevent.
create or replace function public.claim_staged_decks() returns integer
  language plpgsql
  security definer
  set search_path = ''
as $$
declare
  me uuid := (select auth.uid());
  r record;
  candidate text;
  n integer;
  moved integer := 0;
begin
  if me is null then
    return 0;
  end if;

  for r in
    delete from migration.staged_decks s
    using neon_auth.account a
    where a."userId" = me and a."providerId" = 'google' and s.google_sub = a."accountId"
    returning s.name, s.deck_text, s.format, s.created_at, s.updated_at
  loop
    candidate := r.name;
    n := 1;
    while exists (select 1 from public.decks d where d.user_id = me and lower(d.name) = lower(candidate)) loop
      candidate := left(r.name, 45) || case when n = 1 then ' (moved)' else ' (moved ' || n || ')' end;
      n := n + 1;
    end loop;
    insert into public.decks (user_id, name, deck_text, format, created_at, updated_at)
    values (me, candidate, r.deck_text, r.format, r.created_at, r.updated_at);
    moved := moved + 1;
  end loop;

  return moved;
end;
$$;

revoke execute on function public.claim_staged_decks() from public;
revoke execute on function public.claim_staged_decks() from anonymous;
grant execute on function public.claim_staged_decks() to authenticated;

-- When migration.staged_decks is empty, the whole thing goes (spec §6 step 4):
--   drop function public.claim_staged_decks(); drop schema migration cascade;
