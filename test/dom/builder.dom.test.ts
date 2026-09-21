// @vitest-environment happy-dom
//
// #138: `src/builder.ts` has 48 tests and `web/builder.ts` had none, so every refusal the player
// actually sees was pinned only as source text. The review's own example: reverting the cap badge
// interpolation would put "0 of 1" back on a fourth battlefield with the whole suite green. These
// mount the editor and read what a player would read.
import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCardIndex } from "../../src/load.js";
import { loadDeck } from "../../src/deck.js";
import { canonicalizeDeck, capOf, sideboardCapOf } from "../../src/builder.js";

const cards = loadCardIndex();
// `import.meta.url` is a page URL under happy-dom, not a file one, so fixtures are read from the
// repo root the way src/load.ts reads the card data.
const fixture = (n: string) => readFileSync(`${process.cwd()}/test/fixtures/${n}`, "utf8");

let edits: string[] = [];
const shown: string[] = [];
/** The format the harness reports, so a test can flip it the way the Decks page's radio does. */
let fmt: "constructed" | "2v2" = "constructed";
/** The mounted module, kept module-level so a test can call `refreshBuilder` as `web/decks.ts` does. */
let mod: typeof import("../../web/builder.js");

/** Mount the editor on a fresh module, so the deck and the filters never leak between tests. */
async function mount(list: string) {
  vi.resetModules();
  edits = [];
  shown.length = 0;
  fmt = "constructed";
  document.body.innerHTML = `<div id="host"></div>`;
  const host = document.querySelector<HTMLElement>("#host")!;
  mod = await import("../../web/builder.js");
  mod.initBuilder(host, {
    cards: () => cards,
    format: () => fmt,
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

/**
 * Trap #1 of the census: `openList` preselects the legend's own domain chips, so an off-domain card is
 * HIDDEN before it is ever dimmed. A probe that skips this reads "no such cell" and mistakes a filter
 * for a refusal — which is how the first pass of the census was wrong in four rows. "All domains" is
 * the button a player presses.
 */
const allDomains = () => document.querySelector<HTMLButtonElement>('[data-b="all-domains"]')!.click();

/** A deck-column row by the card's name, and the `+` on it. */
const rowNamed = (name: string) =>
  [...document.querySelectorAll<HTMLElement>(".drow")].find((r) => r.querySelector(".drow-name")?.textContent === name);
const rowPlus = (name: string) => rowNamed(name)!.querySelector<HTMLButtonElement>('[data-b="add"]')!;

/** The pool paginates at 48 and the search box is debounced 150ms, so a named subject is searched for. */
const search = async (q: string) => {
  const box = document.querySelector<HTMLInputElement>("#bld-search")!;
  box.value = q;
  box.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((r) => setTimeout(r, 220));
};

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

  /**
   * A Champion click DESIGNATES rather than adds, so a full copy cap must not refuse it — and it did.
   * Measured on the live editor before 2026-09-13: three `Annie, Stubborn` made her own Champion cell
   * read "3 of 3 · a Main Deck takes three of a name (103.2.b)" and refuse the designation, which is a
   * cap answering a question nobody asked. Three copies of your own champion candidate is the ORDINARY
   * build, not a corner, so this was reachable by anyone who built the deck the obvious way.
   */
  it("designates a champion the list already holds a playset of", async () => {
    await mount("Legend\n1 Dark Child - Starter\n\nMain Deck\n3 Annie, Stubborn\n");
    setZone("champion");
    const cell = cellNamed("Annie, Stubborn")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    expect(cell.querySelector(".pool-full")).toBeNull();
    button.click();
    expect(zoneCount("Champion")).toBe("1/1");
    // The copies did not move: the designation is a label on cards that were already there.
    expect(edits[0]).toContain("Annie, Stubborn");
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


/**
 * 103.2.d at click time (#211). The enforcement rides on a rendered `aria-disabled` that the click
 * handler reads back, which is exactly the thing #138 exists to catch: reverting the cell template
 * would switch the rule off with every `src/` test still green. So these click, and assert nothing
 * was added.
 *
 * Ornn is the one champion tag with three Signature names, all of them calm + mind, so the subjects
 * are inside the legend's identity and the Domain Identity block — which is reported first — cannot
 * mask the reason.
 */
describe("103.2.d — the pool refuses a fourth Signature card (#211)", () => {
  const ORNN = "Legend\n1 Fire Below the Mountain\n\nMain Deck\n1 Forgefire Cape\n1 Rabadon's Deathcrown\n1 Shurelya's Requiem\n";
  /**
   * Master Yi, not Ornn, and for the reason #210 shipped: all three Ornn Signature names are Unique,
   * so on an Ornn board 825.3.a refuses a second copy before this rule can count to three. Master Yi's
   * two Signature names carry no Unique, so three Highlanders are legal and Alpha Strike is a real
   * on-tag fourth — the one shell in the pool where a player sees this refusal.
   */
  const YI = "Legend\n1 Wuju Master\n\nMain Deck\n3 Highlander\n";

  it("refuses the fourth and blames the deck's three, not the card's own count", async () => {
    await mount(YI);
    await search("Alpha Strike");
    const cell = cellNamed("Alpha Strike")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;

    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(cell.querySelector(".pool-full")!.textContent).toBe("3 of 3");
    expect(button.getAttribute("aria-label")).toContain("103.2.d.1");
    expect(button.getAttribute("aria-label")).toContain("regardless of name");

    button.click();
    expect(edits).toEqual([]);
  });

  it("refuses a Signature card carrying another champion's tag, and says whose (103.2.d.2)", async () => {
    // Fox-Fire is calm + mind like the legend, so this is the TAG refusing it and not Domain Identity.
    await mount("Legend\n1 Fire Below the Mountain\n");
    await search("Fox-Fire");
    const cell = cellNamed("Fox-Fire")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;

    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(cell.querySelector(".pool-full")!.textContent).toBe("Not Ornn");
    expect(button.getAttribute("aria-label")).toContain("103.2.d.2");
    expect(cell.classList.contains("off")).toBe(false);   // not the Domain Identity path

    button.click();
    expect(edits).toEqual([]);
  });

  it("offers the same card freely while the deck is under the cap", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n\nMain Deck\n1 Forgefire Cape\n");
    await search("Rabadon");
    const button = cellNamed("Rabadon's Deathcrown")!.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    button.click();
    expect(edits.length).toBe(1);
  });
});

/**
 * 103.1.b at click time (#212). The bug this pins is invisible to a test that reads ONE button: the
 * pool cell has refused an off-domain card since #101, and the deck column's `+` read `capOf` alone —
 * which knew nothing about Domain Identity, because the rule lived in `web/builder.ts`. So the same
 * rule was enforced or not depending on which of two buttons the player pressed, and a list that
 * arrives by paste, deck code or Piltover Archive import never passes through the pool at all.
 *
 * Every assertion below therefore reads BOTH buttons for ONE card and compares the two answers.
 * Subject measured in the census: legend `SFD-189 Fire Below the Mountain` (calm + mind) holding
 * `Blazing Scorcher` (OGN-001, mono-fury).
 */
describe("103.1.b — the pool cell and the deck row give one answer (#212)", () => {
  const IMPORTED = "Legend\n1 Fire Below the Mountain\n\nMain Deck\n1 Blazing Scorcher\n";

  it("refuses an imported off-domain card at the deck row, with the reason the pool cell gives", async () => {
    await mount(IMPORTED);
    const plus = rowPlus("Blazing Scorcher");
    expect(plus.getAttribute("aria-disabled")).toBe("true");
    const rowWhy = plus.getAttribute("title")!;
    expect(rowWhy).toContain("Domain Identity (103.1.b)");
    plus.click();
    expect(edits).toEqual([]);

    // The same card in the pool, reached the way a player reaches it.
    allDomains();
    await search("Blazing Scorcher");
    const cell = cellNamed("Blazing Scorcher")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(cell.classList.contains("off")).toBe(true);
    // The point of the issue: not merely that both refuse, but that they say the SAME thing.
    expect(button.getAttribute("title")).toBe(rowWhy);
    button.click();
    expect(edits).toEqual([]);
  });

  /**
   * The control, and it is what makes the two assertions above worth anything: the instrument does
   * fire, and it takes a click for a card that is inside the identity.
   */
  it("still adds an in-identity card from either button", async () => {
    await mount(IMPORTED + "1 Forgefire Cape\n");
    const plus = rowPlus("Blazing Scorcher");
    expect(plus.getAttribute("aria-disabled")).toBe("true");

    await search("Clockwork Keeper");           // OGN-044, calm + mind, not Signature, not Unique
    const button = cellNamed("Clockwork Keeper")!.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    button.click();
    expect(edits).toHaveLength(1);
    expect(rowPlus("Clockwork Keeper").getAttribute("aria-disabled")).toBe(null);
  });

  /**
   * The Legend zone is the one place 103.1.b must NOT refuse, and until 2026-09-13 it did. 103.1.b.2
   * makes the identity "dictated by the domains of your Champion Legend", so a legend defines it
   * rather than sitting inside it, and `addCard` replaces the one already named. The census did not
   * probe this zone; the editor was telling a player that the legend they wanted was outside the
   * identity of the legend they were replacing.
   */
  it("offers a legend outside the current identity, and takes the click", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n");   // calm + mind
    allDomains();
    setZone("legend");
    await search("Loose Cannon");                          // fury + chaos, nothing in common
    const cell = cellNamed("Loose Cannon")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    expect(cell.classList.contains("off")).toBe(false);
    button.click();
    expect(edits).toHaveLength(1);
    expect(edits[0]).toContain("Loose Cannon");
  });
});

/**
 * The two rules the editor gained on 2026-09-13 that a CLICK did not reach. This file exists because
 * enforcement rides on a rendered `aria-disabled` that the handler reads back, so a template change
 * can switch a rule off with every `src/` test still green (#138) — and a source-text pin is no
 * substitute, as the a11y measurement the same day showed: the one whole-statement pin in that file
 * had to be rewritten twice because a CORRECT rewording broke it. So every rule the cell can report
 * wants a click.
 */
describe("the two rules added on 2026-09-13 that only the model had seen", () => {
  /**
   * 103.3.a.1 — "Cards in the Rune Deck must be of the Domain Identity of your Champion Legend". The
   * Rune Deck has its own checklist row, so `identityCap` cites that paragraph for a rune and 103.1.b
   * for everything else: the button may not name a different rule from the one the checklist would
   * name for the same card. Nothing clicked it until now.
   */
  it("refuses an off-domain rune under the Rune Deck's own paragraph", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n");      // calm + mind
    allDomains();
    setZone("runes");
    await search("Fury Rune");
    const cell = cellNamed("Fury Rune")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("title")).toContain("103.3.a.1");
    expect(button.getAttribute("title")).not.toContain("103.1.b");
    expect(cell.classList.contains("off")).toBe(true);
    button.click();
    expect(edits).toEqual([]);

    // The control: a rune INSIDE the identity is offered and taken, so the zone is not simply shut.
    await search("Calm Rune");
    const ok = cellNamed("Calm Rune")!.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(ok.getAttribute("aria-disabled")).toBe("false");
    ok.click();
    expect(edits).toHaveLength(1);
  });

  /**
   * 103.2.a.2 through the DECK ROW, which is the one champion button a pool filter cannot cover: the
   * Champion zone draws only units carrying the tag, so an off-tag card can never be clicked there,
   * but a row in the deck column is drawn for whatever the list holds. `rowHtml` used to repeat the
   * tag test and now asks `championCapOf`, so this pins the rewiring rather than the old copy.
   */
  it("offers Champion on a row only where the model would take it", async () => {
    // Annie, Stubborn carries the Annie tag; Clockwork Keeper does not. Both are calm + mind, so
    // Domain Identity cannot be what separates them, and Tibbers is on-tag but Signature (103.2.d.3).
    await mount("Legend\n1 Dark Child - Starter\n\nMain Deck\n1 Annie, Stubborn\n1 Clockwork Keeper\n1 Tibbers\n");
    // The ROW is looked up separately and asserted to exist, so a card that never got drawn fails
    // loudly instead of reading as "no Champion link" and passing the test it was meant to fail.
    const champLink = (name: string) => {
      const r = rowNamed(name);
      expect(r, `${name} has a row at all`).toBeTruthy();
      return r!.querySelector(".drow-champ");
    };
    expect(champLink("Annie, Stubborn"), "on-tag unit").not.toBeNull();
    expect(champLink("Clockwork Keeper"), "off-tag unit (103.2.a.2)").toBeNull();
    expect(champLink("Tibbers"), "on-tag but Signature (103.2.d.3)").toBeNull();

    // And taking the one that is offered designates it.
    (champLink("Annie, Stubborn") as HTMLButtonElement).click();
    expect(zoneCount("Champion")).toBe("1/1");
  });
});

/**
 * The two caps this file BADGED but never CLICKED. `103.4.c` had a test asserting the cell reads
 * "1 of 1" and none asserting the button refuses, and `103.3.a`'s twelve runes had no DOM test at
 * all — so on both, a template change could have left the badge painted and the click working.
 * Reading the badge and taking the click are two different claims.
 */
describe("the caps that were badged but never clicked", () => {
  it("refuses a second battlefield of a name the list already holds (103.4.c)", async () => {
    await mount(fixture("lux.txt"));
    setZone("battlefields");
    const zone = [...document.querySelectorAll<HTMLElement>(".dzone")]
      .find((z) => z.querySelector(".dzone-head")?.textContent?.startsWith("Battlefields"))!;
    const held = zone.querySelector(".drow-name")!.textContent!;
    const cell = cellNamed(held)!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(cell.querySelector(".pool-full")!.textContent).toBe("1 of 1");
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("aria-label")).toContain("103.4.c");
    button.click();
    expect(edits).toEqual([]);
    expect(zoneCount("Battlefields")).toBe("3/3");
    // And the row's own `+` agrees, which is the half #212 was about.
    expect(rowPlus(held).getAttribute("aria-disabled")).toBe("true");
  });

  it("refuses a thirteenth rune (103.3.a)", async () => {
    await mount(fixture("lux.txt"));                 // a tournament list, so the Rune Deck is full
    expect(zoneCount("Runes")).toBe("12/12");
    setZone("runes");
    const zone = [...document.querySelectorAll<HTMLElement>(".dzone")]
      .find((z) => z.querySelector(".dzone-head")?.textContent?.startsWith("Runes"))!;
    const held = zone.querySelector(".drow-name")!.textContent!;
    const cell = cellNamed(held)!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(cell.querySelector(".pool-full")!.textContent).toBe("12 of 12");
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("aria-label")).toContain("103.3.a");
    button.click();
    expect(edits).toEqual([]);
    expect(zoneCount("Runes")).toBe("12/12");
    expect(rowPlus(held).getAttribute("aria-disabled")).toBe("true");
  });
});

/**
 * 825.3.a at click time (#210). Same shape as #212 above and for the same reason: both buttons are
 * read, because the cap lives in `capOf` and a test of the pool alone would not see the deck row.
 */
describe("825.3.a — one of each Unique name, at both buttons (#210)", () => {
  const ORNN_ONE = "Legend\n1 Fire Below the Mountain\n\nMain Deck\n1 Forgefire Cape\n";

  it("refuses a second copy at the pool cell, and says which rule", async () => {
    await mount(ORNN_ONE);
    await search("Forgefire Cape");
    const cell = cellNamed("Forgefire Cape")!;
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(cell.querySelector(".pool-full")!.textContent).toBe("1 of 1");
    expect(button.getAttribute("aria-label")).toContain("825.3.a");
    // Not the Domain Identity path: a Unique card gets a badge, an off-domain one is only dimmed.
    expect(cell.classList.contains("off")).toBe(false);
    button.click();
    expect(edits).toEqual([]);
  });

  it("refuses it at the deck row too, which is the button an imported list leaves you with", async () => {
    await mount(ORNN_ONE);
    const plus = rowPlus("Forgefire Cape");
    expect(plus.getAttribute("aria-disabled")).toBe("true");
    expect(plus.getAttribute("title")).toContain("825.3.a");
    plus.click();
    expect(edits).toEqual([]);
  });
});

/**
 * 103.2.e is the one rule the user put in a DIFFERENT TIER on 2026-09-13 (#213): the cell MARKS a
 * banned or restricted card and takes the click anyway, because the format toggle makes "banned" a
 * property of the question being asked rather than of the card. Both halves of that decision are
 * pinned here, and one card pins both.
 *
 * Measured over all 1189 printings: EXACTLY ONE card's legality differs between the two formats —
 * `OGS-019 Wuju Bladesman - Starter`, restricted in 2v2 and unremarkable in Constructed. So it is the
 * only subject in the pool that can show the badge following `env.format()` at all, and it is also
 * the pool's only restricted row, which is the one the decision says must stay addable whatever else
 * changes: a restricted card is a CAP, not an illegal card, and blocking it would be wrong.
 */
describe("103.2.e — marked, never blocked, and the mark follows the format (#213)", () => {
  it("paints the restricted badge only in the format that restricts it, and takes the click in both", async () => {
    await mount("");
    allDomains();
    setZone("legend");
    await search("Wuju Bladesman");
    const cell = () => cellNamed("Wuju Bladesman - Starter")!;
    expect(cell(), "the subject is drawn at all").toBeTruthy();
    expect(cell().querySelector(".ban-tag"), "nothing to mark in Constructed").toBeNull();

    // The Decks page flips this radio and calls refreshBuilder; this is the builder half of that wire.
    fmt = "2v2";
    mod!.refreshBuilder();
    const tag = cell().querySelector(".ban-tag")!;
    expect(tag, "restricted in 2v2").not.toBeNull();
    expect(tag.textContent).toBe("restricted");
    expect(tag.classList.contains("restricted")).toBe(true);

    // Tier 3: MARKED, not blocked. A restricted card is a cap and not an illegal card.
    const button = cell().querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    button.click();
    expect(edits).toHaveLength(1);
    expect(edits[0]).toContain("Wuju Bladesman");
  });

  it("takes the click on a BANNED card too, which is the same tier and the same reason", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n");
    allDomains();
    setZone("battlefields");
    await search("Aspirant");                       // OGN-276, banned in both formats, colourless
    const cell = cellNamed("Aspirant's Climb")!;
    expect(cell.querySelector(".ban-tag")!.textContent).toBe("banned");
    const button = cell.querySelector<HTMLButtonElement>(".pool-add")!;
    expect(button.getAttribute("aria-disabled")).toBe("false");
    button.click();
    expect(edits).toHaveLength(1);
    // And the checklist is the authority that still reports it, which is what makes the tier safe.
    expect(document.querySelector(".bld-check-n")!.textContent).not.toBe("Legal");
  });
});

/**
 * #212 WAS AN ASYMMETRY, not a missing rule: the pool cell knew about Domain Identity and the deck row
 * did not, so the same rule was enforced or not depending on which of two buttons the player pressed.
 * Every test above asks whether a RULE is enforced. This asks the question that would have caught the
 * issue in the first place, and asks it of the whole board at once rather than rule by rule:
 *
 *   for EVERY row the deck column draws, does its `+` refuse exactly when the model refuses?
 *
 * Stated as one invariant it covers every rule the cap can report, including the ones nobody has
 * thought to write a case for, and it keeps covering them when a rule is added. The fixture is built
 * to put several different caps on the board at once, so the sweep is not vacuously comparing a column
 * of falses — the assertions below count how many rows were actually FULL.
 */
describe("both buttons, for every rule at once: the deck row agrees with the model (#212)", () => {
  const EDGES = `Legend
1 Fire Below the Mountain

Champion
1 Clockwork Keeper

Battlefields
1 The Grand Plaza
1 Back-Alley Bar
1 Power Nexus

Runes
6 Calm Rune
6 Mind Rune

Main Deck
3 Charm
1 Forgefire Cape
1 Rabadon's Deathcrown
1 Shurelya's Requiem
1 Blazing Scorcher

Sideboard
1 Clockwork Keeper
`;

  it("gives the same answer as capOf on every row, for whatever rule binds there", async () => {
    await mount(EDGES);
    const deck = canonicalizeDeck(loadDeck(EDGES, cards), cards);
    const rows = [...document.querySelectorAll<HTMLElement>(".drow")];
    expect(rows.length).toBeGreaterThan(8);                     // non-vacuity: a real board

    let compared = 0, full = 0;
    for (const r of rows) {
      const base = r.dataset["base"]!;
      const plus = r.querySelector<HTMLButtonElement>('[data-b="add"]');
      const side = r.querySelector<HTMLButtonElement>('[data-b="side-add"]');
      const button = plus ?? side;
      if (!button) continue;                                    // the legend row draws no plus
      const cap = side ? sideboardCapOf(deck, base, cards) : capOf(deck, base, cards);
      const refused = button.getAttribute("aria-disabled") === "true";
      expect(refused, `${base} ${cards.get(base)?.name}: row says ${refused}, model says ${cap.full}`).toBe(cap.full);
      if (cap.full) {
        // And when it refuses it must SAY why, or the player is told no with no reason.
        expect(button.getAttribute("title"), `${base} has a reason`).toBeTruthy();
        full++;
      }
      compared++;
    }
    // Non-vacuity both ways: the sweep saw most of the board, and several rows really were full.
    expect(compared).toBeGreaterThan(8);
    expect(full).toBeGreaterThan(3);
  });

  /**
   * The same question for the POOL side of the pair, on the cards the board above makes interesting.
   * Together the two assert what #212 is really about: one model, two buttons, one answer.
   */
  it("gives the same answer as the pool cell for the same card", async () => {
    await mount(EDGES);
    const deck = canonicalizeDeck(loadDeck(EDGES, cards), cards);
    allDomains();
    for (const name of ["Charm", "Forgefire Cape", "Blazing Scorcher"]) {
      await search(name);
      const cell = cellNamed(name);
      expect(cell, `${name} is drawn in the pool`).toBeTruthy();
      const cellBtn = cell!.querySelector<HTMLButtonElement>(".pool-add")!;
      const rowBtn = rowPlus(name);
      expect(cellBtn.getAttribute("aria-disabled"), name).toBe("true");
      expect(rowBtn.getAttribute("aria-disabled"), name).toBe("true");
      // Not merely both refusing: refusing for the SAME stated reason.
      expect(cellBtn.getAttribute("title"), name).toBe(rowBtn.getAttribute("title"));
      const base = rowNamed(name)!.dataset["base"]!;
      expect(capOf(deck, base, cards).why).toBe(cellBtn.getAttribute("title"));
    }
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

/**
 * D5 of the 2026-09-20 review. The dimming is the whole signal today: `capOf` computes a sentence
 * ("Outside calm + mind — Domain Identity (103.1.b).") and it reaches a player only through the
 * button's `title` and its accessible label, so a sighted mouse user who never hovers, and every
 * touch user, sees a grid where some art is faded and nothing says why.
 *
 * The fix is one line UNDER the grid rather than anything painted on the art — the 2026-09-06
 * decision that removed the "Off domain" badge stands. What is pinned here is that the count in that
 * line is the same number as the cells it describes (a note that says "3" over four dimmed cards is
 * worse than no note) and that it disappears in both states where it would be a lie: no legend, so
 * there is no identity to be outside of, and nothing dimmed.
 */
describe("the off-domain reason is readable without hovering (D5)", () => {
  const off = () => [...document.querySelectorAll<HTMLElement>(".pool-cell.off")];
  const note = () => document.querySelector<HTMLElement>("#pool-off-note");

  it("counts the dimmed cells it describes, and names the legend and the rule", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n");   // calm + mind
    allDomains();
    await search("Blazing");                             // OGN-001 Blazing Scorcher is mono-fury

    expect(off().length).toBeGreaterThan(0);
    const line = note();
    expect(line).not.toBeNull();
    expect(line!.textContent).toContain(String(off().length));
    expect(line!.textContent).toContain("Fire Below the Mountain");
    expect(line!.textContent).toContain("103.1.b");
  });

  it("says nothing when the grid holds nothing to explain", async () => {
    await mount("Legend\n1 Fire Below the Mountain\n");
    await search("Clockwork Keeper");                    // OGN-044, calm + mind: inside the identity
    expect(off()).toEqual([]);
    expect(note()).toBeNull();
  });

  it("says nothing with no legend, because there is no identity to be outside of (103.1.b.2)", async () => {
    await mount("Main Deck\n1 Blazing Scorcher\n");      // no Legend line at all
    allDomains();
    await search("Blazing");
    expect(off()).toEqual([]);
    expect(note()).toBeNull();
  });
});
