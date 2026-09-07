// @vitest-environment happy-dom
//
// The deck form folds away once it has done its job (2026-09-07).
//
// Measured on lux.txt before the change: the deck panel was 3,409px in a 652px viewport and 860px of
// it — panel head, the 721px form, the status card — sat above "What to add", so pressing Find
// combos left the answer below the fold with the form the player had just used as the only thing on
// screen. The form was 21.1% of the panel. After: panel 2,742px, answer at 252px, above the fold.
//
// An earlier attempt at this was reverted because it collapsed the whole PANEL and took the pasted
// list off screen with it (the comment it left behind is in `run()`'s history). So the three things
// pinned here are the three that make the difference: it becomes a SUMMARY that says what was
// analysed, the text survives a reopen unchanged, and anything that went wrong leaves it open.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: false,
  onAccount: () => {},
  signIn: async () => {}, signOut: async () => {}, deleteAccount: async () => {},
  listDecks: async () => [], createDeck: async () => {}, updateDeck: async () => {}, deleteDeck: async () => {},
}));

const file = (p: string) => readFileSync(`${process.cwd()}/${p}`, "utf8");
const settle = () => new Promise((r) => setTimeout(r, 60));
const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const form = () => $<HTMLFormElement>("#deck-form");
const row = () => $<HTMLElement>("#deck-collapsed");
const editBtn = () => $<HTMLButtonElement>("#edit-list");
const input = () => $<HTMLTextAreaElement>("#deck-input");

const analyse = async (text: string) => {
  input().value = text;
  input().dispatchEvent(new Event("input", { bubbles: true }));
  $<HTMLFormElement>("#deck-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
};

beforeAll(async () => {
  const html = file("web/index.html");
  document.documentElement.innerHTML = html.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(file("data/cards.json")) })));
  await import("../../web/main.js");
  await settle();
});

describe("the deck form after a run", () => {
  it("starts open, with no summary row in the way", () => {
    expect(form().hidden).toBe(false);
    expect(row().hidden).toBe(true);
  });

  it("folds into a summary that says what was analysed", async () => {
    await analyse(file("test/fixtures/lux.txt"));
    expect(form().hidden).toBe(true);
    expect(row().hidden).toBe(false);
    // The size of the list, since this harness has no saved deck to take a name from; the named case
    // is the `analyzing` path, which needs an account and is covered where that path is exercised.
    expect($("#deck-collapsed-what").textContent).toMatch(/\d+ main/);
    expect(editBtn().getAttribute("aria-expanded")).toBe("false");
    expect(editBtn().getAttribute("aria-controls")).toBe("deck-form");
    expect(editBtn().textContent).toBe("Edit list");
  });

  it("gives the list back byte for byte, and puts the cursor in it", async () => {
    const list = file("test/fixtures/lux.txt");
    await analyse(list);
    expect(form().hidden).toBe(true);
    editBtn().click();
    expect(form().hidden).toBe(false);
    expect(row().hidden).toBe(true);
    expect(editBtn().getAttribute("aria-expanded")).toBe("true");
    // The whole reason the earlier attempt was reverted.
    expect(input().value).toBe(list);
    expect(document.activeElement).toBe(input());
  });

  it("survives a re-analyse of the same text", async () => {
    const list = file("test/fixtures/lux.txt");
    await analyse(list);
    editBtn().click();
    await analyse(list);
    expect(form().hidden).toBe(true);
    expect(input().value).toBe(list);
  });

  /**
   * The two ways a run can succeed and still leave the player with work to do in the textarea. A
   * one-rune deck is the zero-result case, and it was SEARCHED for rather than assumed: no list in
   * test/fixtures/tournament-lists has zero hits in every bucket (0 of 222, measured 2026-09-07), so
   * a registered list could not have carried this assertion.
   */
  it("stays open when the list matched nothing at all", async () => {
    await analyse("Main Deck:\n1 Mind Rune\n");
    expect(form().hidden, "nothing to read means the next move is in the textarea").toBe(false);
    expect(row().hidden).toBe(true);
  });

  it("stays open when lines could not be recognised", async () => {
    await analyse("3 Not A Real Card\n2 Nor Is This One\n");
    expect(form().hidden, "the status card names the bad lines; hiding the text hides the evidence").toBe(false);
    expect(row().hidden).toBe(true);
  });

  /**
   * Reached the way a player would: the Find combos button lives INSIDE the form, so it cannot be
   * pressed while the form is folded. Clearing the box therefore starts by reopening it.
   */
  it("stays open when the button is pressed with nothing pasted", async () => {
    await analyse(file("test/fixtures/lux.txt"));
    editBtn().click();
    await analyse("");
    expect(form().hidden).toBe(false);
    expect($("#status-title").textContent).toBe("No deck");
  });
});
