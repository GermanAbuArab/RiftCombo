// The three limits on `/api/deck-url`, kept out of the route so they can be tested: the route itself
// is an Edge function and only runs on a Vercel deploy. Decided 2026-09-20: harden WITHOUT a counter
// (no rate limiter, no Upstash, no firewall rule), so these three are the whole defence.
//
//   1. a timeout, so a slow upstream cannot hold an Edge invocation open;
//   2. a byte cap counted off the stream, because `content-length` is the upstream's claim, not a
//      measurement — it can be absent, and a chunked response carries none;
//   3. the host re-checked AFTER the fetch, because `fetch` follows redirects and the allowlist was
//      only ever checked on the URL we asked for.

export const ALLOWED_HOSTS: ReadonlySet<string> = new Set(["piltoverarchive.com", "www.piltoverarchive.com"]);

/** Milliseconds before the upstream fetch is aborted. A deck page answers in well under a second. */
export const UPSTREAM_TIMEOUT_MS = 8_000;

/** The largest upstream body we will read. A Piltover deck page is a few hundred KB. */
export const MAX_UPSTREAM_BYTES = 5 * 1024 * 1024;

export function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOSTS.has(hostname.toLowerCase());
}

/**
 * Where the response actually came from. `Response.url` is the final URL after redirects; it is the
 * empty string for a response that was constructed rather than fetched, in which case the requested
 * URL is the only one there is.
 */
export function hostAfterRedirectAllowed(finalUrl: string, requested: URL): boolean {
  if (!finalUrl) return isAllowedHost(requested.hostname);
  let url: URL;
  try { url = new URL(finalUrl); } catch { return false; }
  return url.protocol === "https:" && isAllowedHost(url.hostname);
}

export function withinByteCap(bytes: number, cap: number = MAX_UPSTREAM_BYTES): boolean {
  return bytes <= cap;
}

/** Thrown by `readCapped` so the route can answer 502 with a message rather than a stack. */
export class TooLargeError extends Error {
  constructor(cap: number) { super(`the page is larger than ${cap} bytes`); this.name = "TooLargeError"; }
}

/**
 * Read a body as text, counting bytes as they arrive and cancelling the stream the moment the cap is
 * passed — so an oversized response costs us at most `cap` bytes, never the whole thing.
 */
export async function readCapped(body: ReadableStream<Uint8Array> | null, cap: number = MAX_UPSTREAM_BYTES): Promise<string> {
  if (!body) return "";
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (!withinByteCap(bytes, cap)) {
      await reader.cancel();
      throw new TooLargeError(cap);
    }
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}
