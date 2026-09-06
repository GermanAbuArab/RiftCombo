// @vitest-environment happy-dom
//
// #120: a BURST is one scoring event reaching 8 and a CHAIN reaches 8 across several, because 194.3
// puts the Victory Score at 8 — and 489.3 puts 2v2's at 11. The catalogue is walked against 8 and
// carries no format, so the UI is what has to say it. This mounts the whole Combos view, matches a
// real tournament list, and reads what the toggle changes.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

// The account layer needs a network and a project; an "open" build has neither and behaves as the
// app did before #31, which is all this view needs.
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
/** A registered list whose hits include a CHAIN, which is what the note is about. */
const LIST = file("test/fixtures/tournament-lists/atlanta-06.txt");
const NOTE = "2v2 needs 11 points (Core Rules 489.3); this line reaches 8.";

const settle = () => new Promise((r) => setTimeout(r, 60));
const chips = () => [...document.querySelectorAll<HTMLElement>(".chip")];
const chipFor = (cls: string) => chips().find((c) => c.querySelector(".chip-meta")?.textContent?.startsWith(cls));

const setFormat = async (value: "constructed" | "2v2") => {
  // happy-dom does not clear the rest of a radio group when one is set from script, and `fmt()`
  // reads `input[name=format]:checked` — which would keep answering with the first one.
  for (const r of document.querySelectorAll<HTMLInputElement>("input[name=format]")) r.checked = r.value === value;
  const radio = document.querySelector<HTMLInputElement>(`input[name=format][value="${value}"]`)!;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

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

describe("the class tag carries its threshold", () => {
  it("prints the points a BURST or CHAIN has to reach, and nothing for the classes it does not describe", async () => {
    await setFormat("constructed");
    expect(chips().length).toBeGreaterThan(0);
    expect(chipFor("CHAIN")!.querySelector(".chip-meta")!.textContent).toBe("CHAIN · 8 points · VERIFIED");
    // ENGINE does not close a game, so a Victory Score says nothing about it.
    expect(chipFor("ENGINE")!.querySelector(".chip-meta")!.textContent).toBe("ENGINE · VERIFIED");
  });
});

describe("the 2v2 toggle", () => {
  it("says nothing extra in the format the catalogue was walked in", async () => {
    await setFormat("constructed");
    expect(document.querySelectorAll(".score-short")).toHaveLength(0);
  });

  it("tells every BURST and CHAIN what it is short of in 2v2", async () => {
    await setFormat("2v2");
    const chain = chipFor("CHAIN")!;
    expect(chain.querySelector(".score-short")!.textContent).toBe(NOTE);
    // And only those: an ENGINE chip is left alone.
    expect(chipFor("ENGINE")!.querySelector(".score-short")).toBeNull();
  });

  it("puts the same note in the drawer of the route it opens", async () => {
    await setFormat("2v2");
    chipFor("CHAIN")!.click();
    await settle();
    const drawer = document.querySelector<HTMLElement>("#detail")!;
    expect(drawer.hidden).toBe(false);
    // The class is the drawer's headline now, not a fragment of the meta line (#158).
    expect(drawer.querySelector(".route-class")!.textContent).toContain("CHAIN · 8 points");
    expect(drawer.querySelector(".score-short")!.textContent).toBe(NOTE);
  });

  it("takes the note back off when the format goes back to Constructed", async () => {
    await setFormat("2v2");
    expect(document.querySelectorAll(".score-short").length).toBeGreaterThan(0);
    await setFormat("constructed");
    expect(document.querySelectorAll(".score-short")).toHaveLength(0);
    expect(chipFor("CHAIN")!.querySelector(".chip-meta")!.textContent).toContain("8 points");
  });
});

describe("the Guide", () => {
  it("gives both numbers with the paragraph each comes from", () => {
    const guide = file("web/index.html");
    expect(guide).toContain("The Victory Score is 8 points by default");
    expect(guide).toContain("194.3");
    expect(guide).toContain("489.3");
    expect(guide).toMatch(/<strong>11<\/strong> in 2v2/);
  });
});
