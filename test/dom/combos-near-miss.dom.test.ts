// @vitest-environment happy-dom
//
// #163. A player's report: *"we have to fix the near-missed: when they put 'show combos you are x
// cards away' — maybe we can move that selector to only appear when Near misses is selected?"*
//
// The audit behind that: `#max-missing` is read in exactly four places in `web/main.ts` — the two
// `matchDeck` calls and one sentence of near-miss empty-state copy. `result.included` is the bucket
// with `missingCount === 0` (`src/matcher.ts`), so a distance cap can never filter it; measured over
// four fixtures at every option value, the number of complete combos never moved (lux 5/5/5/5,
// atlanta-06 2/2/2/2, recruits 3/3/3/3, fury 0/0/0/0). Under **Complete** the control re-ran the
// matcher over all 431 variants and changed two words of a status card on the other side of the
// window — and a `complete only` option let it contradict the segmented control outright, leaving
// the Near misses view permanently empty under the sentence "No known combo is within 0 cards".
//
// This mounts the whole Combos view and reads what the control does now.
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
const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const chips = () => document.querySelectorAll(".chip").length;
const status = () => $("#status-body").textContent ?? "";

/** happy-dom does not clear the rest of a radio group when one is set from script, and `mode()` reads `:checked`. */
const setView = async (value: "network" | "suggestions") => {
  for (const r of document.querySelectorAll<HTMLInputElement>("input[name=view]")) r.checked = r.value === value;
  $<HTMLInputElement>(`input[name=view][value="${value}"]`).dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

const setDistance = async (value: string) => {
  $<HTMLSelectElement>("#max-missing").value = value;
  $<HTMLSelectElement>("#max-missing").dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

beforeAll(async () => {
  const html = file("web/index.html");
  document.documentElement.innerHTML = html.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  const data = file("data/cards.json");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(data) })));
  await import("../../web/main.js");
  await settle();

  $<HTMLTextAreaElement>("#deck-input").value = LIST;
  $<HTMLFormElement>("#deck-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
});

describe("where the near-miss distance lives", () => {
  it("sits beside the view it qualifies, not in the deck form on the other side of the window", () => {
    const label = $("#near-miss");
    expect(label.closest(".ws-controls"), "the distance is not in the workspace controls").not.toBeNull();
    expect(label.closest("#deck-form"), "the distance is still inside the deck form").toBeNull();
    // Immediately after the control it qualifies, so the two read as one phrase.
    expect(label.previousElementSibling?.querySelector('input[name=view]')).toBeTruthy();
  });

  it("is on screen exactly while the near misses it measures are", async () => {
    await setView("network");
    expect($("#near-miss").hidden, "shown under Complete, where it changes nothing").toBe(true);
    await setView("suggestions");
    expect($("#near-miss").hidden).toBe(false);
    await setView("network");
    expect($("#near-miss").hidden).toBe(true);
  });

  it("offers no option that contradicts the segmented control beside it", () => {
    const values = [...document.querySelectorAll<HTMLOptionElement>("#max-missing option")].map((o) => o.value);
    // `complete only` was a second copy of the Complete segment, and the two could be set against
    // each other: the result was an empty view under "No known combo is within 0 cards of this list".
    expect(values).toEqual(["1", "2", "3"]);
    expect($("#max-missing").textContent).not.toContain("complete only");
  });
});

describe("what the distance changes", () => {
  it("leaves the complete combos alone at every distance, which is why it is hidden there", async () => {
    await setView("network");
    const counts: number[] = [];
    for (const d of ["1", "2", "3"]) { await setDistance(d); counts.push(chips()); }
    expect(counts[0]).toBeGreaterThan(0);
    expect(new Set(counts).size, `complete combos moved with the distance: ${counts}`).toBe(1);
    expect($("#route-count").textContent).toBe(String(counts[0]));
  });

  /**
   * Counted off `#route-count`, not off the chips. The tray caps at twelve and offers the rest
   * (2026-09-07), so a chip count stopped being a measure of how many near misses there ARE — which
   * is what this test is about — the moment the catalogue grew past that cap at every distance.
   */
  it("widens the near misses monotonically", async () => {
    await setView("suggestions");
    const counts: number[] = [];
    for (const d of ["1", "2", "3"]) { await setDistance(d); counts.push(Number($("#route-count").textContent)); }
    expect(counts[0]).toBeLessThan(counts[1]!);
    expect(counts[1]).toBeLessThan(counts[2]!);
  });

  /**
   * The invariant #66 was opened for, now stated in the copy rather than only held by the code: the
   * count in the status card is exactly what the other view holds, and it names the distance it was
   * counted at — because the control that sets that distance is not on screen while Complete is.
   */
  it("names the distance in the status card, and counts what the other view will show", async () => {
    for (const d of ["1", "2", "3"]) {
      await setView("suggestions");
      await setDistance(d);
      // The number the other view HOLDS, which since the tray cap is no longer the number of chips
      // it draws. `#route-count` is the uncapped total and is what the status card must agree with.
      const held = Number($("#route-count").textContent);
      expect(document.querySelectorAll("#tray .chip").length, "the tray shows at most the cap").toBeLessThanOrEqual(Math.min(held, 7));
      await setView("network");
      expect(status(), `at ${d}`).toContain(`${held} near miss${held === 1 ? "" : "es"} within ${d} card${d === "1" ? "" : "s"}`);
    }
  });

  it("points the empty near-miss state at the control's new home", async () => {
    // A deck with NO near misses is what the sentence is written for, and no fixture list has one any
    // more: the catalogue grew past every fixture at every distance on 2026-09-07. A list that is only
    // a legend is the thinnest deck there is -- at distance 1 its near misses are exactly the
    // one-card, one-copy entries inside that legend's identity -- so the legend is searched for
    // rather than assumed, and the test fails loudly only if every identity in the pool has one.
    const legends = JSON.parse(file("data/cards.json")).cards.filter((c: { type: string[] }) => c.type.includes("legend"));
    let empty: string | null = null;
    for (const l of legends as { name: string; base: string }[]) {
      $<HTMLTextAreaElement>("#deck-input").value = `Legend\n1 ${l.name} (${l.base})\n`;
      $<HTMLFormElement>("#deck-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await settle();
      await setView("suggestions");
      await setDistance("1");
      if (chips() === 0) { empty = "1"; break; }
    }
    expect(empty, "every legend has a one-copy, one-card entry within 1 card -- the empty state needs a different deck").not.toBeNull();
    const body = $("#empty .empty-body").textContent ?? "";
    expect(body).toContain(`within ${empty} card${empty === "1" ? "" : "s"} of this list`);
    expect(body).toContain("beside the view switch above");
    expect(body, "the deck panel no longer holds it").not.toContain("in the panel");
  });
});
