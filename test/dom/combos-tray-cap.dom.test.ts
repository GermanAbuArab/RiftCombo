// @vitest-environment happy-dom
//
// The near-miss tray had no cap, and catalogue growth made that matter. Measured 2026-09-07 over the
// 223 registered lists in test/fixtures/tournament-lists: in near-miss mode `shownHits()`
// concatenates five buckets and the tray drew a median of 24 chips, 38 at p90 and 51 at worst — in
// Chrome that was 13,668px of SIDEWAYS scroll in a 1,082px tray, 12.6 screens. At a 340-entry
// catalogue the p90 was 16, so this is growth and it continues.
//
// The cap is 12 with an expander rather than a bare count line, because a tray scrolls sideways
// rather than down and this project's rule is that hiding an answer hides a real answer — so the
// rest expands in place. What this file pins is that the cap holds, that the twelve shown are the
// CLOSEST twelve, and that the total is still told truthfully.
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
const chips = () => [...document.querySelectorAll<HTMLElement>("#tray .chip")];
const more = () => document.querySelector<HTMLButtonElement>("#tray .tray-more");

const setView = async (value: "network" | "suggestions") => {
  for (const r of document.querySelectorAll<HTMLInputElement>("input[name=view]")) r.checked = r.value === value;
  $<HTMLInputElement>(`input[name=view][value="${value}"]`).dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

beforeAll(async () => {
  const html = file("web/index.html");
  document.documentElement.innerHTML = html.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  const data = file("data/cards.json");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(data) })));
  await import("../../web/main.js");
  await settle();
  $<HTMLTextAreaElement>("#deck-input").value = file("test/fixtures/lux.txt");
  $<HTMLFormElement>("#deck-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
});

describe("the near-miss tray's cap", () => {
  it("draws at most twelve chips and offers the rest, without understating the total", async () => {
    await setView("suggestions");
    const total = Number($("#route-count").textContent);
    // Search for the state rather than assume this fixture has one: a fixture the catalogue outgrows
    // is the failure mode this project has already hit twice.
    expect(total, "the lux fixture no longer overflows the tray; pick a list that does").toBeGreaterThan(12);
    expect(chips()).toHaveLength(12);
    const btn = more()!;
    expect(btn, "an overflowing tray offers the rest").not.toBeNull();
    expect(btn.textContent).toBe(`${total - 12} more near misses`);
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    // The count above the diagram is the honest signal and is NOT capped.
    expect(total).toBeGreaterThan(chips().length);
  });

  it("shows the CLOSEST twelve, so a cap can never hide the nearest miss", async () => {
    await setView("suggestions");
    const shown = chips().map((c) => c.querySelector(".chip-meta")?.textContent ?? "");
    // Distance is the count of missing copies, which is the unit `#max-missing` speaks in. A chip
    // one card away names one card; the ordering is non-decreasing across the twelve.
    const distance = (meta: string) => (meta.match(/(\d+)×/g) ?? []).reduce((a, m) => a + Number(m.slice(0, -1)), 0);
    const ds = shown.map(distance);
    expect(ds).toEqual([...ds].sort((a, b) => a - b));
    expect(ds[0], "the closest miss is on screen").toBeLessThanOrEqual(ds[ds.length - 1]!);
  });

  it("expands in place and folds back, as a real control", async () => {
    await setView("suggestions");
    const total = Number($("#route-count").textContent);
    more()!.click();
    expect(chips()).toHaveLength(total);
    expect(more()!.textContent).toBe("Show fewer");
    expect(more()!.getAttribute("aria-expanded")).toBe("true");

    more()!.click();
    expect(chips()).toHaveLength(12);
    expect(more()!.getAttribute("aria-expanded")).toBe("false");
  });

  it("starts capped again when the view changes, rather than remembering an expansion", async () => {
    await setView("suggestions");
    more()!.click();
    expect(more()!.getAttribute("aria-expanded")).toBe("true");
    await setView("network");
    await setView("suggestions");
    expect(chips()).toHaveLength(12);
    expect(more()!.getAttribute("aria-expanded")).toBe("false");
  });

  /**
   * The point of the cap, and the reason it is twelve rather than a number chosen for the diagram:
   * the tray and the diagram are two views of ONE list. Before this they disagreed — the tray drew
   * 12 of 51 while the diagram beside it drew all 51.
   *
   * They are compared through the ROUTE/ENTRY distinction rather than by counting nodes: a chip is
   * a route (`Variant.comboIds`) and a diagram node is an entry, so 12 chips legitimately draw more
   * than 12 nodes when a route has `needs`. What must hold is that the diagram draws the entries of
   * the shown routes and NOTHING ELSE.
   */
  it("draws the diagram from the same twelve routes the tray shows", async () => {
    await setView("suggestions");
    const shownNames = new Set(chips().flatMap((c) =>
      (c.querySelector(".chip-title")?.textContent ?? "").split(" + ").map((n) => n.trim())));
    const svg = document.querySelector("#graph-host svg");
    expect(svg, "the diagram is drawn").not.toBeNull();
    const drawn = [...svg!.querySelectorAll("g.node.combo, g.node.route")];
    expect(drawn.length, "an entry per route leg, never the whole uncapped list").toBeGreaterThan(0);
    expect(drawn.length).toBeLessThanOrEqual(Number($("#route-count").textContent));
    // Every entry the diagram draws belongs to a route the tray is showing.
    for (const node of drawn) {
      const label = (node.textContent ?? "").trim();
      if (!label) continue;
      const belongs = [...shownNames].some((n) => n.length > 3 && label.includes(n.slice(0, 12)));
      expect(belongs, `the diagram drew "${label.slice(0, 40)}", which no shown chip names`).toBe(true);
    }
  });

  it("leaves a tray that fits alone — no control where there is no overflow", async () => {
    await setView("network");
    // Complete lines are few (measured 2 at the median, 6 at most over 223 lists), so this is the
    // under-the-cap case and it must carry no furniture at all.
    expect(chips().length).toBeLessThanOrEqual(12);
    expect(more()).toBeNull();
  });
});
