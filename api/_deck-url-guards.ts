// The three limits on `/api/deck-url`, kept out of the route so they can be tested: the route itself
// is an Edge function and only runs on a Vercel deploy. Decided 2026-09-20: harden WITHOUT a counter
// (no rate limiter, no Upstash, no firewall rule), so these three are the whole defence.
//
//   1. a timeout, so a slow upstream cannot hold an Edge invocation open;
//   2. a byte cap counted off the stream, because `content-length` is the upstream's claim, not a
//      measurement — it can be absent, and a chunked response carries none;
//   3. redirects followed BY HAND, one hop at a time, each target checked against the allowlist
//      BEFORE it is requested. Letting `fetch` follow them and checking afterwards is not a defence:
//      the request to the off-list host has already been sent by then (post-commit review of af89a4a).

export const ALLOWED_HOSTS: ReadonlySet<string> = new Set(["piltoverarchive.com", "www.piltoverarchive.com"]);

/** Milliseconds before the upstream fetch is aborted. A deck page answers in well under a second. */
export const UPSTREAM_TIMEOUT_MS = 8_000;

/** The largest upstream body we will read. A Piltover deck page is a few hundred KB. */
export const MAX_UPSTREAM_BYTES = 5 * 1024 * 1024;

export function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOSTS.has(hostname.toLowerCase());
}

/** How many redirects one import may follow. Piltover answers a deck page directly or in one hop. */
export const MAX_REDIRECTS = 3;

/**
 * Where a redirect points, or null if we must not go there. A relative `Location` resolves against
 * the URL that answered; the result has to be https and on the allowlist, checked BEFORE the next
 * request is made.
 */
export function redirectTarget(location: string | null, from: URL): URL | null {
  if (!location) return null;
  let url: URL;
  try { url = new URL(location, from); } catch { return null; }
  return url.protocol === "https:" && isAllowedHost(url.hostname) ? url : null;
}

export function withinByteCap(bytes: number, cap: number = MAX_UPSTREAM_BYTES): boolean {
  return bytes <= cap;
}

/** Thrown by `readCapped` so the route can answer 502 with a message rather than a stack. */
export class TooLargeError extends Error {
  constructor(cap: number) { super(`the page is larger than ${cap} bytes`); this.name = "TooLargeError"; }
}

/**
 * Read a body as text, counting bytes as they arrive and cancelling the stream at the first chunk
 * that takes the total past the cap. The check is per chunk, so an oversized response costs at most
 * the cap plus one chunk — never the whole body.
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
