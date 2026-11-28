-- Saved decks (#31). One row per list a signed-in player chose to keep.
--
-- The row stores the LIST AS PASTED, never the match result. Matching runs in the browser against
-- the catalogue of the day, so a stored result would start rotting the moment a combo is added;
-- storing the text means an old row gets re-matched against the current catalogue on every load.
--
-- Isolation is RLS, not a server: the browser talks to PostgREST directly with the anon key and the
-- signed-in user's own JWT, so each of the four verbs needs its own policy. Without the insert
-- policy nobody can save at all; without the delete policy anybody could delete anybody's row.

create table public.decks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
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

create policy "owner reads own decks"   on public.decks for select using (auth.uid() = user_id);
create policy "owner inserts own decks" on public.decks for insert with check (auth.uid() = user_id);
create policy "owner updates own decks" on public.decks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner deletes own decks" on public.decks for delete using (auth.uid() = user_id);

-- The list is ordered by updated_at, so the database keeps it rather than the client: a client that
-- forgot to send it — or sent a wrong one — would silently reorder somebody's saved decks.
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
