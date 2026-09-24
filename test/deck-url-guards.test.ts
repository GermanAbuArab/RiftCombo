// The three limits on /api/deck-url (sub-project B item 5). The route is an Edge function and only
// runs on a Vercel deploy, so each guard is pinned here in both directions: what it lets through and
// what it stops. A guard tested only on its happy path passes just as well when it stops nothing.
import { describe, expect, it } from "vitest";
import {
  MAX_UPSTREAM_BYTES, TooLargeError, UPSTREAM_TIMEOUT_MS,
  hostAfterRedirectAllowed, isAllowedHost, readCapped, withinByteCap,
} from "../api/_deck-url-guards.js";

const requested = new URL("https://piltoverarchive.com/decks/view/abc");

function stream(chunks: number[]): { body: ReadableStream<Uint8Array>; cancelled: () => boolean; pulled: () => number } {
  let i = 0, cancelled = false, pulled = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(ctrl) {
      if (i >= chunks.length) { ctrl.close(); return; }
      pulled++;
      ctrl.enqueue(new TextEncoder().encode("x".repeat(chunks[i++]!)));
    },
    cancel() { cancelled = true; },
  });
  return { body, cancelled: () => cancelled, pulled: () => pulled };
}

describe("isAllowedHost", () => {
  it("lets Piltover Archive through, with or without www and in any case", () => {
    expect(isAllowedHost("piltoverarchive.com")).toBe(true);
    expect(isAllowedHost("www.piltoverarchive.com")).toBe(true);
    expect(isAllowedHost("PiltoverArchive.com")).toBe(true);
  });
  it("stops everything else, including a lookalike suffix", () => {
    expect(isAllowedHost("evil.com")).toBe(false);
    expect(isAllowedHost("piltoverarchive.com.evil.com")).toBe(false);
    expect(isAllowedHost("xpiltoverarchive.com")).toBe(false);
    expect(isAllowedHost("169.254.169.254")).toBe(false);
  });
});

describe("hostAfterRedirectAllowed", () => {
  it("accepts a response that stayed on Piltover Archive, redirected or not", () => {
    expect(hostAfterRedirectAllowed("https://piltoverarchive.com/decks/view/abc", requested)).toBe(true);
    expect(hostAfterRedirectAllowed("https://www.piltoverarchive.com/decks/view/abc", requested)).toBe(true);
  });
  it("rejects a redirect that left the allowlist", () => {
    expect(hostAfterRedirectAllowed("https://evil.com/steal", requested)).toBe(false);
    expect(hostAfterRedirectAllowed("http://169.254.169.254/latest/meta-data", requested)).toBe(false);
  });
  it("rejects a redirect down to plain http even on the right host", () => {
    expect(hostAfterRedirectAllowed("http://piltoverarchive.com/decks/view/abc", requested)).toBe(false);
  });
  it("falls back to the requested URL when the response carries none, and rejects garbage", () => {
    expect(hostAfterRedirectAllowed("", requested)).toBe(true);
    expect(hostAfterRedirectAllowed("", new URL("https://evil.com/"))).toBe(false);
    expect(hostAfterRedirectAllowed("not a url", requested)).toBe(false);
  });
});

describe("withinByteCap", () => {
  it("is inclusive at the cap and false one byte past it", () => {
    expect(withinByteCap(MAX_UPSTREAM_BYTES)).toBe(true);
    expect(withinByteCap(MAX_UPSTREAM_BYTES + 1)).toBe(false);
    expect(withinByteCap(10, 10)).toBe(true);
    expect(withinByteCap(11, 10)).toBe(false);
  });
});

describe("readCapped", () => {
  it("reads a body under the cap in full", async () => {
    const s = stream([3, 4]);
    expect(await readCapped(s.body, 10)).toBe("x".repeat(7));
    expect(s.cancelled()).toBe(false);
  });

  it("throws past the cap and cancels the stream instead of reading the rest", async () => {
    const s = stream([6, 6, 6, 6, 6]);
    await expect(readCapped(s.body, 10)).rejects.toBeInstanceOf(TooLargeError);
    expect(s.cancelled()).toBe(true);
    // The control: it stopped at the chunk that crossed the cap, not after draining all five.
    expect(s.pulled()).toBeLessThan(5);
  });

  it("counts bytes, not characters, so multi-byte text cannot slip under the cap", async () => {
    const body = new ReadableStream<Uint8Array>({
      start(c) { c.enqueue(new TextEncoder().encode("é".repeat(6))); c.close(); }, // 12 bytes, 6 chars
    });
    await expect(readCapped(body, 10)).rejects.toBeInstanceOf(TooLargeError);
  });

  it("returns empty text for a response with no body", async () => {
    expect(await readCapped(null)).toBe("");
  });
});

describe("the limits themselves", () => {
  it("are the decided values: 8 s and 5 MB", () => {
    expect(UPSTREAM_TIMEOUT_MS).toBe(8_000);
    expect(MAX_UPSTREAM_BYTES).toBe(5 * 1024 * 1024);
  });
});
