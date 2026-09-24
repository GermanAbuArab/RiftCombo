// @vitest-environment happy-dom
//
// D6 of the 2026-09-20 review: below 900px the deck panel stacks ABOVE the stage and runs to roughly
// 1,800px of status card, What to add and Pairs, so the diagram — the thing the page is for — is off
// the bottom of a phone with nothing pointing at it.
//
// The two things a unit test can prove about a jump link are the two that go wrong silently: that it
// points at an element that EXISTS (an anchor to a missing id is a link that does nothing, and no
// visual test reports it), and that it does not offer a jump to a stage with nothing on it. The
// scrolling itself is geometry and is measured in a browser at 375; see the review's verification
// section.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: false, onAccount: () => {}, signIn: async () => {}, signOut: async () => {},
  deleteAccount: async () => {}, listDecks: async () => [], createDeck: async () => {},
  updateDeck: async () => {}, deleteDeck: async () => {},
}));

const file = (p: string) => readFileSync(`${process.cwd()}/${p}`, "utf8");
const settle = () => new Promise((r) => setTimeout(r, 60));
const link = () => document.querySelector<HTMLAnchorElement>("#jump-to-diagram")!;

beforeAll(async () => {
  document.documentElement.innerHTML = file("web/index.html")
    .replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  const data = file("data/cards.json");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(data) })));
  await import("../../web/main.js");
  await settle();
});

describe("the mobile jump to the diagram (D6)", () => {
  it("points at an element that is really on the page", () => {
    const href = link().getAttribute("href")!;
    expect(href.startsWith("#")).toBe(true);
    expect(document.querySelector(href)).not.toBeNull();
    expect(document.querySelector(href)!.id).toBe("stage");
  });

  it("offers nothing to jump to while the stage is empty, and appears once it is not", async () => {
    expect(link().hidden).toBe(true);

    document.querySelector<HTMLTextAreaElement>("#deck-input")!.value = file("test/fixtures/lux.txt");
    document.querySelector<HTMLFormElement>("#deck-form")!
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await settle();

    // The control: the run really did draw something, so the assertion below is not passing because
    // nothing happened.
    expect(document.querySelector<HTMLElement>("#empty")!.hidden).toBe(true);
    expect(link().hidden).toBe(false);
  });

  /**
   * The reason the click handler calls `preventDefault` instead of letting the browser follow the
   * href: `#stage` is not a route, `parseHash` falls it back to Combos, and the fall-back carries no
   * `?deck=`. `test/router.test.ts` pins that; this pins that the page does not take the hash.
   */
  it("scrolls without touching the address, so #/combos?deck=<id> survives the jump", () => {
    const before = location.hash;
    const st = document.querySelector<HTMLElement>("#stage")!;
    let scrolled = false;
    st.scrollIntoView = () => { scrolled = true; };
    const ev = new Event("click", { bubbles: true, cancelable: true });
    link().dispatchEvent(ev);
    expect(scrolled).toBe(true);
    expect(ev.defaultPrevented).toBe(true);
    expect(location.hash).toBe(before);
  });
});
