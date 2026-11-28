-- Deleting your account is something you do, not something you write in asking for (#31). Without
-- this the privacy page would have to name a mailbox, and a mailbox is a promise a person has to
-- keep by hand; the cascade on decks.user_id makes the deck rows go with it.
--
-- This is the most dangerous function in the repository, so it is nailed down on every side:
--
--   * SECURITY DEFINER, because deleting from auth.users needs privileges the caller does not have;
--   * `set search_path = ''` and fully qualified names, because a mutable search_path on a definer
--     function lets a caller put their own `users` table in front of the real one;
--   * no parameter. The row is chosen by auth.uid() alone, so there is nothing to aim: a caller
--     cannot ask for an id, and passing one is not a thing the signature allows;
--   * execute revoked from everyone and granted back only to a signed-in role, so a visitor with
--     nothing but the anon key cannot reach it at all.
--
-- auth.uid() is null when nobody is signed in, and `where id = null` deletes no rows.

create function public.delete_account() returns void
  language plpgsql
  security definer
  set search_path = ''
as $$
begin
  delete from auth.users where id = (select auth.uid());
end;
$$;

revoke execute on function public.delete_account() from public;
revoke execute on function public.delete_account() from anon;
grant execute on function public.delete_account() to authenticated;
