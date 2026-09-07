// @vitest-environment happy-dom
//
// #138: `src/builder.ts` has 48 tests and `web/builder.ts` had none, so every refusal the player
// actually sees was pinned only as source text. The review's own example: reverting the cap badge
// interpolation would put "0 of 1" back on a fourth battlefield with the whole suite green. These
// mount the editor and read what a player would read.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex } from "../../src/load.js";

const cards = loadCardIndex();
// `import.meta.url` is a page URL under happy-dom, not a file one, so fixtures are read from the
// repo root the way src/load.ts reads the card data.
const fixture = (n: string) => readFileSync(`${process.cwd()}/test/fixtures/${n}`, "utf8");

let edits: string[] = [];
const shown: string[] = [];

/** Mount the editor on a fresh module, so the deck and the filters never leak between tests. */
async function mount(list: string) {
  vi.resetModules();
  edits = [];
  shown.length = 0;
  document.body.innerHTML = `<div id="host"></div>`;
  const host = document.querySelector<HTMLElement>("#host")!;
  const mod = await import("../../web/builder.js");
  mod.initBuilder(host, {
    cards: () => cards,
    format: () => "constructed",
    showCard: (base) => shown.push(base),
    onEdit: (text) => edits.push(text),
    saveLabel: () => "Save",
    dirty: () => edits.length > 0,
    say: () => {},
  });
  mod.openList(list);
  host.innerHTML = mod.builderHtml("");
  return { host, mod };
}

const cells = () => [...document.querySelectorAll<HTMLElement>(".pool-cell")];
const cellNamed = (name: string) => cells().find((c) => c.querySelector(".pool-name-txt")?.textContent === name);
const zoneCount = (label: string) =>
  [...document.querySelectorAll<HTMLElement>(".dzone-head")].find((h) => h.textContent?.startsWith(label))
    ?.querySelector(".dzone-n")?.textContent;

/** The pool's zone is a radio group read through a delegated change listener. */
const setZone = (zone: string) => {
  const radio = document.querySelector<HTMLInputElement>(`input[name="bld-zone"][value="${zone}"]`)!;
  radio.checked = true;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
};

describe("the editor drawn from a real list", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("draws every zone of a tournament list, with its counts", async () => {
    await mount(fixture("lux.txt"));
    expect(zoneCount("Legend")).toBe("1/1");
    expect(zoneCount("Battlefields")).toBe("3/3");
    expect(zoneCount("Runes")).toBe("12/12");
    expect(zoneCount("Main deck")).toBe("40/40");
    expect(document.querySelector("#bld-totals")!.textContent)
      .toBe("Main 40/40 · Runes 12/12 · Battlefields 3/3");
    // Construction has a verdict, and the .sr-only line beside the totals says it out loud (#129).
    expect(document.querySelector(".bld-check-n")!.textContent).toBe("Legal");
    expect(document.querySelector("#chk-status")!.textContent).toBe("Construction: legal.");
  });

  it("names a card in a row, and opens the card modal from it", async () => {
    await mount(fixture("lux.txt"));
    const row = [...document.querySelectorAll<HTMLElement>(".drow")]
      .find((r) => r.querySelector(".drow-name")?.textContent === "Forge of the Future")!;
    expect(row.querySelector(".drow-n")!.textContent).toBe("3×");
    // Every row carries the card's art and its domain bar since #113.
    expect(row.querySelector(".drow-art")).not.toBeNull();
    row.querySelector<HTMLButtonElement>(".drow-name")!.click();
    expect(shown).toEqual(["OGN-212"]);
  });

  it("adds a copy on a click and writes the list back out", async () => {
    await mount("Legend\n1 Nine-Tailed Fox\n");
    setZone("main");
    // The first cell inside the legend's identity: an off-domain one is dimmed and refuses the click.
    const cell = cells().find((c) => !c.classList.contains("off"))!;
    const name = cell.querySelector(".pool-name-txt")!.textContent!;
    cell.querySelector<HTMLButtonElement>(".pool-add")!.click();
    expect(edits).toHaveLength(1);
    expect(edits[0]).toContain(name);
    expect(document.querySelector("#bld-totals")!.textContent).toContain("Main 1/40");
  });
});

describe("what the pool refuses, and what it says", () => {
  /**
   * #123: the badge has to name the rule that BINDS. A fourth battlefield is refused by the three
   * already in the list, not by the one copy of its own name — it read "0 of 1" while the accessible
   * name said "3 of 3 battlefields (103.4.a)".
   */
  it("refuses a fourth battlefield and blames the three already there", async () => {
    await mount(fixture("lux.txt"));
    setZone("battlefields");
    const held = new Set([...document.querySelectorAll(".drow-name")].map((b) => b.textContent));
    const fourth = cells().find((c) => !held.has(c.querySelector(".pool-name-txt")!.textContent))!;
    const button = fourth.querySelector<HTMLButtonElement>(".pool-add")!;

    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(fourth.querySelector(".pool-full")!.textContent).toBe("3 of 3");
    expect(button.getAttribute("aria-label")).toContain("3 of 3 battlefields (103.4.a)");

    button.click();
    expect(edits).toEqual([]);
    expect(zoneCount("Battlefields")).toBe("3/3");
  });

  it("says 1 of 1 for a battlefield of a name the list already holds", async () => {
    await mount(fixture("lux.txt"));
    setZone("battlefields");
    const zone = [...document.querySelectorAll<HTMLElement>(".dzone")]
      .find((z) => z.querySelector(".dzone-head")?.textContent?.startsWith("Battlefields"))!;
    const held = zone.querySelector(".drow-name")!.textContent!;
    expect(cellNamed(held)!.querySelector(".pool-full")!.textContent).toBe("1 of 1");
  });

  /**
   * #122: 103.2.d.3 — a Signature card is never the Chosen Champion, and Tibbers is the rule's own
   * worked example. The deck column has always refused to offer it; the pool used to hand it over.
   */
  it("refuses a Signature card in the Champion zone", async () => {
    await mount("Legend\n1 Dark Child - Starter\n");
    setZone("champion");
    expect(cells().map((c) => c.querySelector(".pool-name-txt")!.textContent))
      .toEqual(["Annie, Fiery", "Annie, Stubborn", "Tibbers"]);

    const tibbers = cellNamed("Tibbers")!;
    const button = tibbers.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(tibbers.querySelector(".pool-full")!.textContent).toBe("Signature");
    expect(button.getAttribute("aria-label")).toContain("103.2.d.3");
    button.click();
    expect(edits).toEqual([]);
    expect(zoneCount("Champion")).toBe("0/1");

    // The champion beside it is offered, and taking it designates one.
    cellNamed("Annie, Stubborn")!.querySelector<HTMLButtonElement>(".pool-add")!.click();
    expect(zoneCount("Champion")).toBe("1/1");
    expect(document.querySelector(".drow.champ")).not.toBeNull();
  });

  it("dims a card outside the legend's domains instead of hiding it, and paints nothing over the art", async () => {
    await mount("Legend\n1 Nine-Tailed Fox\n");  // calm + mind
    setZone("main");
    const off = cells().find((c) => c.classList.contains("off"))!;
    // User decision 2026-09-06: the "Off domain" bar across the artwork went. The card stays, dimmed,
    // the button refuses, and the reason is in the accessible label and the title -- the cap and
    // Signature badges are a different thing (they mark a full zone) and stay.
    expect(off.querySelector(".pool-full")).toBeNull();
    const add = off.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(add.getAttribute("aria-disabled")).toBe("true");
    expect(add.getAttribute("aria-label")).toContain("Domain Identity (103.1.b)");
    expect(add.getAttribute("title")).toContain("Domain Identity (103.1.b)");
    // And a battlefield indicates no domain at all, so the zone is never empty (#112).
    setZone("battlefields");
    expect(cells().length).toBeGreaterThan(40);
  });
});

describe("the sideboard (Tournament Rules 403, 601.1.c)", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("is a zone of the pool that adds to the sideboard, with its own count and controls", async () => {
    await mount("Legend\n1 Lady of Luminosity - Starter\n");  // mind + order
    // Nothing arrived with the list, so the section is not drawn until the zone is chosen.
    expect(zoneCount("Sideboard")).toBeUndefined();
    setZone("sideboard");
    expect(zoneCount("Sideboard")).toBe("0/10");
    const cell = cells().find((c) => !c.classList.contains("off") && c.querySelector(".pool-add")?.getAttribute("aria-disabled") === "false")!;
    const add = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(add.dataset.b).toBe("side-add");
    expect(add.getAttribute("aria-label")).toContain("to the sideboard");
    add.click();
    expect(zoneCount("Sideboard")).toBe("1/10");
    // The Main Deck did not move: the pool's target was the sideboard.
    expect(zoneCount("Main Deck") ?? zoneCount("Main")).toMatch(/^0\//);
    // The row takes it back.
    document.querySelector<HTMLButtonElement>('.drow [data-b="side-minus"]')!.click();
    expect(zoneCount("Sideboard")).toBe("0/10");
  });

  it("only offers Main Deck cards there (601.1.c.2)", async () => {
    await mount("Legend\n1 Lady of Luminosity - Starter\n");
    setZone("sideboard");
    const kinds = cells().map((c) => c.querySelector(".pool-name-txt")!.textContent!);
    expect(kinds.some((n) => /Rune$/.test(n))).toBe(false);
    expect(kinds).not.toContain("The Grand Plaza");
  });

  it("draws every row control as a stroke, not a glyph, so it sits centred in its box", async () => {
    await mount(fixture("lux.txt"));
    const tiny = [...document.querySelectorAll<HTMLElement>(".icon-btn.tiny")];
    expect(tiny.length).toBeGreaterThan(0);
    for (const b of tiny) {
      expect(b.querySelector("svg")).not.toBeNull();
      expect(b.textContent!.trim()).toBe("");
    }
  });
});
