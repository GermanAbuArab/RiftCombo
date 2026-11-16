/**
 * The day the suite reads the ban list for, wherever a test's fixture is a real tournament list
 * (#647). Those lists were played and read before 2026-09-18, when Riot banned Ekko, Recurrent and
 * Stacked Deck, and `test/fixtures/lux.txt`, the reference "legal list", registers Ekko. Read as of
 * today the suite would also turn red by itself on every future ban date (the Radiance bans start
 * 2026-11-23), so it reads one fixed day instead. What the later bans change is pinned in
 * test/legality-dates.test.ts and in the "today" test of test/tournament-lists.test.ts.
 */
export const FIXTURE_DAY = "2026-09-17";

/** The same day as a local noon `Date`, for the DOM tests whose app builds its own index from the clock. */
export const fixtureClock = (): Date => {
  const [y, m, d] = FIXTURE_DAY.split("-").map(Number) as [number, number, number];
  return new Date(y, m - 1, d, 12);
};
