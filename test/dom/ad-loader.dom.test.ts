// @vitest-environment happy-dom
/**
 * The ad surface's one inline script (#290): with no `google-adsense-account` tag it inserts nothing;
 * with one it inserts the privacy-choices script and Google's ad script for that publisher, and pushes
 * once per slot. Run as the page runs it: its source text, on DOMContentLoaded.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { AD_LOADER } from "../../src/render/ad-loader.js";

const w = window as unknown as { adsbygoogle?: unknown[] };

function run(head: string, body: string) {
  document.head.innerHTML = head;
  document.body.innerHTML = body;
  const added: HTMLScriptElement[] = [];
  vi.spyOn(document.head, "appendChild").mockImplementation((n) => { added.push(n as HTMLScriptElement); return n; });
  // The listener is captured and called, rather than an event dispatched: a dispatched one would also
  // run every earlier test's listener, which stays on this one document.
  let ready: (() => void) | undefined;
  vi.spyOn(document, "addEventListener").mockImplementation((type, fn) => { if (type === "DOMContentLoaded") ready = fn as () => void; });
  new Function(AD_LOADER)();
  expect(added, "nothing runs before the document is parsed").toEqual([]);
  expect(ready, "it waits for DOMContentLoaded").toBeDefined();
  ready!();
  return added;
}

afterEach(() => {
  vi.restoreAllMocks();
  delete w.adsbygoogle;
});

describe("the ad loader", () => {
  it("does nothing while the page has no publisher tag (the dark launch)", () => {
    expect(run("", `<ins class="adsbygoogle"></ins>`)).toEqual([]);
    expect(w.adsbygoogle).toBeUndefined();
  });

  it("inserts the privacy-choices script and the publisher's ad script, and pushes once per slot", () => {
    const added = run(`<meta name="google-adsense-account" content="ca-pub-0000000000000000">`,
      `<main><ins class="adsbygoogle"></ins><p>text</p><ins class="adsbygoogle"></ins></main>`);
    expect(added.map((s) => s.getAttribute("src"))).toEqual([
      "/privacy-choices.js",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000",
    ]);
    expect(added.map((s) => s.async)).toEqual([true, true]);
    expect(added[0]!.getAttribute("crossorigin")).toBeNull();
    expect(added[1]!.getAttribute("crossorigin")).toBe("anonymous");
    expect(w.adsbygoogle).toEqual([{}, {}]);
  });

  it("keeps a queue Google's script already started, and escapes the id into the URL", () => {
    w.adsbygoogle = ["earlier"];
    const added = run(`<meta name="google-adsense-account" content="ca-pub-1&x=y">`, `<ins class="adsbygoogle"></ins>`);
    expect(added[1]!.getAttribute("src")).toBe("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1%26x%3Dy");
    expect(w.adsbygoogle).toEqual(["earlier", {}]);
  });
});
