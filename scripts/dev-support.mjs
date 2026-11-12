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

// The headers vercel.json gives `path`, in production's order: every rule whose source matches, a later rule
// winning a key an earlier one set. vercel dev adds them to its own api/ responses but not to what it proxies
// from the devCommand, so scripts/dev-static.mjs applies them itself (#605). `config` is vercel.json as parsed,
// which scripts/build-headers.mjs writes; nothing here repeats a header. `path` is the one dev-static sees,
// after vercel dev's rewrites: production matches the path before the rewrite, which for /decks/x is /decks/x
// and here is /app. The only rule keyed to one path today is /manifest.webmanifest, which no rewrite touches.
export function headersFor(path, config) {
  const out = {};
  for (const rule of config.headers ?? []) {
    if (rule.has || rule.missing) throw new Error(`vercel.json header rule ${rule.source}: has/missing is not evaluated by dev-static`);
    if (!sourceRegExp(rule.source).test(path)) continue;
    for (const { key, value } of rule.headers) out[key] = value;
  }
  return out;
}

// path-to-regexp's grammar, as far as a vercel.json source uses it: `(...)` is a regular expression, `:name`
// one segment, `:name*` / `:name+` / `:name?` zero-or-more / one-or-more / optional segments with their `/`.
function sourceRegExp(source) {
  let re = "";
  for (let i = 0; i < source.length;) {
    if (source[i] === "(") {
      let depth = 0, j = i;
      for (; j < source.length; j++) { if (source[j] === "(") depth++; else if (source[j] === ")" && --depth === 0) break; }
      re += source.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    const param = /^\/:\w+([*+?]?)/.exec(source.slice(i));
    if (param) {
      re += { "": "/[^/]+", "*": "(?:/[^/]+)*", "+": "(?:/[^/]+)+", "?": "(?:/[^/]+)?" }[param[1]];
      i += param[0].length;
      continue;
    }
    re += source[i].replace(/[.*+?^${}|[\]\\]/g, "\\$&");
    i++;
  }
  return new RegExp(`^${re}$`);
}

// The vercel dev arguments with the router on loopback: vercel dev listens on 0.0.0.0:3000 unless told
// otherwise (`vercel dev --help`, CLI 65.11.0), and accepts `--listen <host:port>` (#605). A bare port the
// caller gave is put on 127.0.0.1; an address with a host is the caller's choice and stays.
export function devListenArgs(argv) {
  const loopback = (v) => (/^\d+$/.test(v) ? `127.0.0.1:${v}` : v);
  const out = [...argv];
  for (let i = 0; i < out.length; i++) {
    if ((out[i] === "--listen" || out[i] === "-l") && i + 1 < out.length) { out[i + 1] = loopback(out[i + 1]); return out; }
    if (out[i].startsWith("--listen=")) { out[i] = `--listen=${loopback(out[i].slice(9))}`; return out; }
  }
  return [...out, "--listen", "127.0.0.1:3000"];
}
