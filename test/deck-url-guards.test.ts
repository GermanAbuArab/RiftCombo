// The three limits on /api/deck-url (sub-project B item 5). The route is an Edge function and only
// runs on a Vercel deploy, so each guard is pinned here in both directions: what it lets through and
// what it stops. A guard tested only on its happy path passes just as well when it stops nothing.
import { describe, expect, it } from "vitest";
import {
  MAX_REDIRECTS, MAX_UPSTREAM_BYTES, TooLargeError, UPSTREAM_TIMEOUT_MS,
  isAllowedHost, isAllowedUrl, readCapped, redirectTarget, withinByteCap,
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

describe("isAllowedUrl (the port and userinfo, not only the host)", () => {
  it("accepts the default port, written or implied", () => {
    expect(isAllowedUrl(new URL("https://piltoverarchive.com/decks/view/abc"))).toBe(true);
    expect(isAllowedUrl(new URL("https://piltoverarchive.com:443/decks/view/abc"))).toBe(true);
  });
  it("refuses any other port on the right host — the scan's port-oracle finding", () => {
    expect(isAllowedUrl(new URL("https://piltoverarchive.com:31337/decks/view/abc"))).toBe(false);
    expect(isAllowedUrl(new URL("https://www.piltoverarchive.com:8443/decks/view/abc"))).toBe(false);
  });
  it("refuses userinfo and plain http", () => {
    expect(isAllowedUrl(new URL("https://user:pw@piltoverarchive.com/decks/view/abc"))).toBe(false);
    expect(isAllowedUrl(new URL("http://piltoverarchive.com/decks/view/abc"))).toBe(false);
  });
});

describe("redirectTarget (checked BEFORE the next hop is requested)", () => {
  it("follows a redirect that stays on Piltover Archive, absolute or relative", () => {
    expect(redirectTarget("https://www.piltoverarchive.com/decks/view/abc", requested)?.href).toBe("https://www.piltoverarchive.com/decks/view/abc");
    expect(redirectTarget("/decks/view/xyz", requested)?.href).toBe("https://piltoverarchive.com/decks/view/xyz");
  });
  it("refuses a redirect that leaves the allowlist, so that host is never contacted", () => {
    expect(redirectTarget("https://evil.com/steal", requested)).toBeNull();
    expect(redirectTarget("//evil.com/steal", requested)).toBeNull();
    expect(redirectTarget("http://169.254.169.254/latest/meta-data", requested)).toBeNull();
  });
  it("refuses a downgrade to plain http even on the right host", () => {
    expect(redirectTarget("http://piltoverarchive.com/decks/view/abc", requested)).toBeNull();
    expect(redirectTarget("https://piltoverarchive.com:9443/decks/view/abc", requested)).toBeNull();
  });
  it("refuses a redirect with no Location, or one that is not a URL", () => {
    expect(redirectTarget(null, requested)).toBeNull();
    expect(redirectTarget("", requested)).toBeNull();
    expect(redirectTarget("https://", requested)).toBeNull();
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
  it("are the decided values: 8 s, 5 MB, three hops", () => {
    expect(MAX_REDIRECTS).toBe(3);
    expect(UPSTREAM_TIMEOUT_MS).toBe(8_000);
    expect(MAX_UPSTREAM_BYTES).toBe(5 * 1024 * 1024);
  });
});

describe("the route, with fetch stubbed (the redirect loop itself)", () => {
  const call = async (responses: Record<string, () => Response>) => {
    const { default: handler } = await import("../api/deck-url.js");
    const seen: string[] = [];
    const real = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      seen.push(url);
      expect(init?.redirect).toBe("manual");
      const make = responses[url];
      return make ? make() : new Response("not stubbed", { status: 599 });
    }) as typeof fetch;
    try {
      const res = await handler(new Request(`https://riftcombo.app/api/deck-url?url=${encodeURIComponent("https://piltoverarchive.com/decks/view/abc")}`));
      return { res, seen };
    } finally { globalThis.fetch = real; }
  };
  const redirect = (to: string) => () => new Response(null, { status: 302, headers: { location: to } });

  it("never contacts a host a redirect points at when it is off the allowlist", async () => {
    const { res, seen } = await call({ "https://piltoverarchive.com/decks/view/abc": redirect("https://evil.com/steal") });
    expect(res.status).toBe(502);
    expect(seen).toEqual(["https://piltoverarchive.com/decks/view/abc"]);
  });

  it("follows an allowed hop to the page and reads the deck from it", async () => {
    const page = `<script>self.__next_f.push([1,${JSON.stringify('"deck":{"name":"T","champions":[],"battlefields":[],"runes":[],"maindeck":[],"sideboard":[]}')}])</script>`;
    const { res, seen } = await call({
      "https://piltoverarchive.com/decks/view/abc": redirect("https://www.piltoverarchive.com/decks/view/abc"),
      "https://www.piltoverarchive.com/decks/view/abc": () => new Response(page, { status: 200 }),
    });
    expect(seen.length).toBe(2);
    expect(res.status).toBe(200);
    expect(((await res.json()) as { title: string }).title).toBe("T");
  });

  it("stops after three hops even when every one stays on the allowlist", async () => {
    const a = "https://piltoverarchive.com/decks/view/abc", b = "https://www.piltoverarchive.com/decks/view/abc";
    const { res, seen } = await call({ [a]: redirect(b), [b]: redirect(a) });
    expect(res.status).toBe(502);
    expect(seen.length).toBe(4); // the original request plus three followed hops
  });
});
