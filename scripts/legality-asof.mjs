// The one dated read of data/legality.json for scripts (#668). It is the rule `CardIndex` applies in
// src/cards.ts: a row whose `since` is later than the day being read is announced, not in force.
export const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** `--as-of YYYY-MM-DD` (or `--as-of=YYYY-MM-DD`) from an argv list; default today. Returns `{asOf, rest}`. */
export function parseAsOf(argv) {
  const rest = [];
  let asOf = localDate();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const v = a === "--as-of" ? argv[++i] : a.startsWith("--as-of=") ? a.slice(8) : null;
    if (v === null) { rest.push(a); continue; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v ?? "")) throw new Error(`--as-of wants YYYY-MM-DD, got ${JSON.stringify(v)}`);
    asOf = v;
  }
  return { asOf, rest };
}

/** The rows in force on `asOf`. */
export const inForce = (entries, asOf) => entries.filter((r) => !(r.since > asOf));
