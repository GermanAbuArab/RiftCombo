// @vitest-environment happy-dom
//
// #158: a tray chip is a ROUTE — `Variant` is one catalogued entry plus the entries that satisfy
// its `needs`, carrying the merged card set and the best class among them (`src/combos.ts`). The
// drawer used to render only `comboIds[0]`, so a chip reading "INFINITE · 9 CARDS" opened a drawer
// reading "ENGINE" with two pieces: 23 of the routes generated from today's catalogue put a
// different class in the two places and 75 showed fewer pieces than the chip's own count. This
// mounts the real view, matches the Lux list (whose hits are mostly multi-entry) and reads the two
// numbers back off the same click.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: false,
  onAccount: () => {},
  signIn: async () => {},
  signOut: async () => {},
  deleteAccount: async () => {},
  listDecks: async () => [],
  createDeck: async () => {},
  updateDeck: async () => {},
  deleteDeck: async () => {},
}));

const file = (p: string) => readFileSync(`${process.cwd()}/${p}`, "utf8");
const LIST = file("test/fixtures/lux.txt");
const settle = () => new Promise((r) => setTimeout(r, 60));
const chips = () => [...document.querySelectorAll<HTMLElement>(".chip")];
const drawer = () => document.querySelector<HTMLElement>("#detail")!;

/** The chip's own headline numbers, as a player reads them: the class and the card count. */
const chipFacts = (c: HTMLElement) => ({
  cls: c.querySelector(".chip-meta")!.textContent!.split(" · ")[0]!,
  cards: Number(/(\d+) CARD/.exec(c.querySelector(".pill")!.textContent!)![1]),
});

beforeAll(async () => {
  const html = file("web/index.html");
  document.documentElement.innerHTML = html.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  const data = file("data/cards.json");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(data) })));
  await import("../../web/main.js");
  await settle();
  document.querySelector<HTMLTextAreaElement>("#deck-input")!.value = LIST;
  document.querySelector<HTMLFormElement>("#deck-form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
});

describe("the drawer shows the route the chip is", () => {
  it("agrees with every chip on the class and the card count", async () => {
    expect(chips().length).toBeGreaterThan(0);
    for (const chip of chips()) {
      const want = chipFacts(chip);
      chip.click();
      await settle();
      expect(drawer().hidden).toBe(false);
      expect(drawer().querySelector(".route-class")!.textContent).toContain(want.cls);
      expect(drawer().querySelector(".meta")!.textContent).toContain(`${want.cards} card`);
      chip.click(); // the same chip closes it again
      await settle();
    }
  });

  it("gives a multi-entry route one section per catalogued entry, only the first one open", async () => {
    // The Lux list is the reason this bug was visible at all: most of its hits merge two or three
    // entries. If none did, this file would be testing nothing, so that is asserted first.
    let multi = 0;
    for (const chip of chips()) {
      chip.click();
      await settle();
      const steps = [...drawer().querySelectorAll<HTMLDetailsElement>(".route-step")];
      if (steps.length) {
        multi++;
        expect(steps.length).toBeGreaterThan(1);
        expect(steps.filter((s) => s.open)).toHaveLength(1);
        expect(steps[0]!.open).toBe(true);
        // Each section carries its own entry: its own class tag and its own steps.
        for (const s of steps) {
          expect(s.querySelector(".rstep-class")!.textContent!.length).toBeGreaterThan(0);
          expect(s.querySelectorAll("ol li").length).toBeGreaterThan(0);
        }
      }
      chip.click();
      await settle();
    }
    expect(multi).toBeGreaterThan(0);
  });

  it("prints every piece of the route, not only the head entry's", async () => {
    const chip = chips()[0]!;
    chip.click();
    await settle();
    const rows = drawer().querySelectorAll(".card-list .card-row").length;
    expect(rows).toBeGreaterThan(0);
    // Every row states what the card costs, which is the fact a player is pricing the route with.
    const subs = [...drawer().querySelectorAll(".card-list .csub")].map((e) => e.textContent!);
    expect(subs.every((s) => /energy|power|no cost|battlefield slot/.test(s))).toBe(true);
  });

  it("renders how the line ends, which no view used to show at all", async () => {
    chips()[0]!.click();
    await settle();
    expect(drawer().querySelector(".ends")!.textContent!.length).toBeGreaterThan(0);
  });
});
