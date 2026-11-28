// @vitest-environment happy-dom
//
// #670: between an announced ban and its effective date a list reads legal (#647 holds the row back
// until its `since`), so the Banned and restricted panel adds one line, "Banned from <date>", for each
// card in the list whose ban is announced. It must render as neither a banned row nor a restricted
// one. This mounts the Combos view on 2026-11-20 with a registered list holding Stellacorn Herder
// (SFD-048) and Zhonya's Hourglass (OGN-077), both banned from 2026-11-23, and reads the panel back.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { BUDGET_MS } from "../budget.js";

vi.mock("../../web/neon.js", () => ({
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
const LIST = file("test/fixtures/tournament-lists/atlanta-06.txt");
const settle = () => new Promise((r) => setTimeout(r, 60));

beforeAll(async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 10, 20, 12));
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

vi.setConfig({ testTimeout: BUDGET_MS });

describe("the Banned and restricted panel names an announced ban (#670)", () => {
  it("prints one Banned from line per card, in markup that is neither a banned nor a restricted row", () => {
    const panel = document.querySelector<HTMLElement>("#bans")!;
    expect(panel.hidden).toBe(false);
    const lines = [...panel.querySelectorAll<HTMLElement>(".ban-upcoming")];
    expect(lines.map((l) => l.querySelector("strong")!.textContent)).toEqual(["Stellacorn Herder", "Zhonya's Hourglass"]);
    for (const line of lines) {
      expect(line.textContent).toContain("Banned from 2026-11-23 · 3 copies in your list");
      expect(line.classList.contains("ban-row")).toBe(false);
      expect(line.closest(".ban-row")).toBeNull();
      expect(line.querySelector(".ban-tag")).toBeNull();
    }
    // Not in force yet: no banned row for either.
    const rows = [...panel.querySelectorAll<HTMLElement>(".ban-row")].map((r) => r.querySelector(".ban-name")!.textContent!);
    expect(rows.some((t) => t.includes("Zhonya") || t.includes("Stellacorn"))).toBe(false);
  });
});
