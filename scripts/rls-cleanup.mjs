// Cleanup of check-rls-neon.mjs (#590): delete every test user, count what actually went, and say so
// truthfully. Returns the number of failures, which the caller adds to its own so the run exits 1.
export async function cleanupUsers(users, deleteUser, log = console.log) {
  let deleted = 0;
  for (const u of users) {
    try { await deleteUser(u.id); deleted++; } catch (err) { log(`FAIL  could not delete test user ${u.id}: ${String(err.message ?? err).split("\n")[0]}`); }
  }
  const ok = deleted === users.length;
  log(`${ok ? "pass" : "FAIL"}  cleanup: ${deleted} of ${users.length} test users deleted`);
  return ok ? 0 : 1;
}
