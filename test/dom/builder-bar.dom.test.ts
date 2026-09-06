// @vitest-environment happy-dom
//
// #127: below 900px `.builder[data-tab="pool"] .bld-deck { display: none }` hides the whole Deck
// column — and `.detail-acts` inside it — while the Pool tab is open, so a player who arrives with
// a list to paste could not find Import without switching tabs first. The fix mirrors Import (and
// Analyze/Export) into `.bld-bar`, which `web/builder.ts` renders as a SIBLING of both `.bld-pool`
// and `.bld-deck`, never a descendant of either — so no tab's CSS ever hides it. `web/decks.ts`
// supplies the compact copy through `builderHtml`'s second argument; this mounts `web/builder.ts`
// alone (as `builder.dom.test.ts` does) and hands it that same shape of markup by hand, since the
// `data-act` click itself is decks.ts's own delegation and is exercised there.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex } from "../../src/load.js";

const cards = loadCardIndex();
const fixture = (n: string) => readFileSync(`${process.cwd()}/test/fixtures/${n}`, "utf8");

/** The same three buttons `web/decks.ts`'s `barActions()` renders, reproduced by hand: this file
 * owns no import of decks.ts, so it stands for the shape decks.ts is committed to producing. */
const BAR_ACTIONS = `<button type="button" class="ghost" data-act="analyze">Analyze</button>
    <button type="button" class="ghost" data-act="export">Export</button>
    <button type="button" class="ghost" data-act="import">Import</button>`;

/** The full row `web/decks.ts`'s `actions()` renders for the Deck column, for the same reason. */
const DETAIL_ACTS = `<button type="button" class="primary" data-act="save">Save</button>
    <button type="button" class="ghost" data-act="analyze">Analyze combos</button>
    <button type="button" class="ghost" data-act="export">Export deck code</button>
    <button type="button" class="ghost" data-act="import">Import</button>`;

async function mount(actions = "") {
  vi.resetModules();
  document.body.innerHTML = `<div id="host"></div>`;
  const host = document.querySelector<HTMLElement>("#host")!;
  const mod = await import("../../web/builder.js");
  mod.initBuilder(host, {
    cards: () => cards,
    format: () => "constructed",
    showCard: () => {},
    onEdit: () => {},
    saveLabel: () => "Save",
    dirty: () => false,
    say: () => {},
  });
  mod.openList(fixture("lux.txt"));
  host.innerHTML = mod.builderHtml(actions, BAR_ACTIONS);
  return { host, mod };
}

describe("the fixed bar keeps Import reachable from the Pool tab (#127)", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("opens on Pool, with the bar's Import outside the column that tab hides", async () => {
    const { mod } = await mount();

    // openList always starts on Pool; this is the exact layout the bug report was filed against.
    expect(document.querySelector("#builder")!.getAttribute("data-tab")).toBe("pool");

    const bar = document.querySelector(".bld-bar")!;
    const deckColumn = document.querySelector(".bld-deck")!;
    const poolColumn = document.querySelector(".bld-pool")!;
    expect(bar).not.toBeNull();
    // `.builder[data-tab="pool"] .bld-deck { display: none }` only reaches DESCENDANTS of
    // `.bld-deck`; the bar (and the Import button in it) has to sit outside both columns.
    expect(deckColumn.contains(bar)).toBe(false);
    expect(poolColumn.contains(bar)).toBe(false);

    const barImport = document.querySelector<HTMLButtonElement>("#bld-bar-acts [data-act='import']");
    expect(barImport).not.toBeNull();
    expect(deckColumn.contains(barImport!)).toBe(false);
    expect(barImport!.disabled).toBe(false);

    // One tap on that button is wired to this exact call in web/decks.ts's onClick; invoking it
    // is what a click delegates to, and it is the one dialog the whole editor has.
    const dialog = document.querySelector<HTMLDialogElement>("#bld-import")!;
    expect(dialog.open).toBe(false);
    mod.openImport();
    expect(dialog.open).toBe(true);
  });

  it("keeps the Deck column's own row untouched, alongside the bar's copy", async () => {
    await mount(DETAIL_ACTS);
    // #127 only adds the bar copy; `.detail-acts` keeps the four buttons `web/decks.ts` always drew,
    // Save included, and the two `data-act="import"` elements are independent nodes, not one moved.
    const detailActs = document.querySelector("#detail-acts")!;
    expect(detailActs.querySelectorAll("[data-act]")).toHaveLength(4);
    const barActs = document.querySelector("#bld-bar-acts")!;
    expect(barActs.querySelectorAll("[data-act]")).toHaveLength(3);
    const imports = document.querySelectorAll('[data-act="import"]');
    expect(imports).toHaveLength(2);
    expect(imports[0]).not.toBe(imports[1]);
  });
});
