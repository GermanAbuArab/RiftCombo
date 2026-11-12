// Helpers for `npm run dev` (#597), kept apart from the two dev scripts so they have tests.

// The path under public/ that a request to scripts/dev-static.mjs asks for, or null when it does not decode.
// vercel dev applies vercel.json's rewrites before proxying here, and it appends a capture the destination
// does not use as a query, ENCODED into the path: GET /decks/x reaches this server as `/app%3Fpath=x`
// (measured 2026-11-12, #597). Decoded, that is a file named `app?path=x` and a 404, so everything from the
// first `?` of the decoded path is dropped; no file under public/ has a `?` in its name.
export function requestPath(url) {
  let path;
  try { path = decodeURIComponent(new URL(url, "http://x").pathname); } catch { return null; }
  const query = path.indexOf("?");
  return query === -1 ? path : path.slice(0, query);
}

// The CLI installs its builders with vlt, whose undici connects through Node's happy-eyeballs. On a Mac
// whose IPv6 default route goes into a tunnel that drops IPv6, each IPv4 attempt got the default 250 ms,
// IPv4 connects took ~300 ms, so the last attempt was IPv6 and hung for the OS TCP timeout until vlt failed
// with "Request failed" and vercel dev never listened (#597). IPv4 first, and 2 s per address, fixes that
// without changing anything machine-wide; an IPv6-only network still falls through to IPv6 after 2 s.
export function devNodeOptions(existing) {
  const ours = "--dns-result-order=ipv4first --network-family-autoselection-attempt-timeout=2000";
  return existing ? `${existing} ${ours}` : ours;
}
