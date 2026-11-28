// The one dated read of data/legality.json for scripts (#668). It is the rule `CardIndex` applies in
// src/cards.ts: a row whose `since` is later than the day being read is announced, not in force.
// Today is the UTC calendar day, as `banDay` in src/cards.ts: Riot names a date and no hour (#671).
export const localDate = (d = new Date()) => d.toISOString().slice(0, 10);

/** `--as-of YYYY-MM-DD` (or `--as-of=YYYY-MM-DD`) from an argv list; default today. Returns `{asOf, rest}`. */
export function parseAsOf(argv) {
  const rest = [];
  let asOf = localDate();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const v = a === "--as-of" ? argv[++i] : a.startsWith("--as-of=") ? a.slice(8) : null;
    if (v === null) { rest.push(a); continue; }
    const real = typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && new Date(`${v}T00:00:00Z`).toISOString().startsWith(v);
    if (!real) throw new Error(`--as-of wants YYYY-MM-DD, got ${JSON.stringify(v)}`);
    asOf = v;
  }
  return { asOf, rest };
}

/** The rows in force on `asOf`. */
export const inForce = (entries, asOf) => entries.filter((r) => !(r.since > asOf));
