-- Deleting your account is something you do, not something you write in asking for (#31). The Neon
-- twin of supabase/migrations/20260905130000_delete_account.sql, which it replaces. Everything that
-- made the original safe is kept; only the table it deletes from changes.
--
-- WHY A DATABASE FUNCTION AND NOT AN ENDPOINT. Three routes were considered for Neon and two were
-- measured dead or worse:
--
--   * Better Auth's own self-service `POST /delete-user` is NOT MOUNTED under Neon's Managed Better
--     Auth. Measured: it answers 404 with an empty body, byte-identical to a route that does not
--     exist, and `PATCH /projects/{p}/branches/{b}/auth/config` accepts only `name`, so there is no
--     toggle to turn it on. Neon's own SDK still advertises the method; it does not work.
--   * The Management API's `DELETE .../auth/users/{id}` does work, but it needs a Neon API key in
--     the deployed environment -- a key that can also delete the project -- and an Edge endpoint to
--     hold it. This function needs no secret at all.
--
-- What makes this possible is that the cascade is already in the database. Every foreign key into
-- `neon_auth.user` is ON DELETE CASCADE -- session, account, member, invitation, and our own decks
-- -- so deleting the one row takes the sessions, the OAuth links and the decks with it. That was
-- measured, not assumed: deleting a user through the Management API left zero rows in all of them,
-- which is the same cascade this function fires.
--
-- This is the most dangerous function in the repository, so it is nailed down on every side, and
-- each of these is the same defence the Supabase original used:
--
--   * SECURITY DEFINER, because `authenticated` has no DELETE on neon_auth.user (verified:
--     has_table_privilege('authenticated', 'neon_auth."user"', 'DELETE') is false) and the owner
--     does (neondb_owner, true). The function runs as its owner and the caller borrows nothing else;
--   * `set search_path = ''` and fully qualified names, because a mutable search_path on a definer
--     function lets a caller put their own `user` table in front of the real one;
--   * no parameter. The row is chosen by auth.uid() alone, so there is nothing to aim: a caller
--     cannot ask for an id, and passing one is not a thing the signature allows;
--   * execute revoked from everyone and granted back only to the signed-in role, so a visitor
--     cannot reach it at all. The anonymous role here is called `anonymous`, NOT `anon`.
--
-- auth.uid() is null when nobody is signed in, and `where id = null` deletes no rows. It returns
-- uuid, and neon_auth.user.id is uuid, so the comparison is a real one rather than a silent NULL.

create function public.delete_account() returns void
  language plpgsql
  security definer
  set search_path = ''
as $$
begin
  delete from neon_auth."user" where id = (select auth.uid());
end;
$$;

revoke execute on function public.delete_account() from public;
revoke execute on function public.delete_account() from anonymous;
grant execute on function public.delete_account() to authenticated;
