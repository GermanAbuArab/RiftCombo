// @vitest-environment happy-dom
//
// A CLAIM ABOUT RENDERED OUTPUT IS CHECKED BY LOOKING AT THE RENDERED OUTPUT. `Combo.anyBodies` is
// priced in `src/bodies.ts` and pinned by `test/body-requirements.test.ts`, but the reason it exists
// is that the SITE was telling a player something false, so the surfaces that say so have to be read
// back out of a real DOM. This project has shipped a plays index with four orange underlines while
// every test passed, on a specificity collision no unit test could see.
//
// `gutter-palace` is the sharpest fixture available: `uses` is ONE card, UNL-088 prints "if you have
// exactly 4 cards in hand and exactly 4 units at battlefields, you win the game", and before the
// field existed a list of three copies and no units came back INCLUDED with the outcome "you win the
// game". The list below is exactly that list plus a legend, so the deck holds every card the entry
// names and can still not run it.
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../../web/supabase.js", () => ({
  accountsEnabled: false, onAccount: () => {}, signIn: async () => {}, signOut: async () => {},
  deleteAccount: async () => {}, listDecks: async () => [], createDeck: async () => {},
  updateDeck: async () => {}, deleteDeck: async () => {},
}));

const file = (p: string) => readFileSync(`${process.cwd()}/${p}`, "utf8");
// Mind/Chaos legend; UNL-088 Gutter Palace is Mind, so the list is inside one identity (103.1.b).
const LIST = ["Legend: Scorn of the Moon", "Runes", "12 Mind Rune", "Main", "3 Gutter Palace (UNL-088)"].join("\n");
const settle = () => new Promise((r) => setTimeout(r, 60));

beforeAll(async () => {
  document.documentElement.innerHTML = file("web/index.html")
    .replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  const data = file("data/cards.json");
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => JSON.parse(data) })));
  await import("../../web/main.js");
  await settle();
  document.querySelector<HTMLTextAreaElement>("#deck-input")!.value = LIST;
  document.querySelector<HTMLFormElement>("#deck-form")!
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  await settle();
});

/**
 * The default tray is the "network" view, which lists only lines the deck COMPLETES — so the first
 * thing this change buys is that Gutter Palace simply stops appearing there, which the first test
 * asserts. The MISSING line is drawn in the near-miss view, so the chip and drawer cases switch to
 * it. Finding that out is itself the result: the fix lands in both views and says a different true
 * thing in each.
 */
const nearMiss = async () => {
  const radio = [...document.querySelectorAll<HTMLInputElement>("input[name=view]")]
    .find((r) => r.value !== "network")!;
  radio.checked = true;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

/** Back to the default view, which lists only lines the deck COMPLETES. */
const network = async () => {
  const radio = [...document.querySelectorAll<HTMLInputElement>("input[name=view]")]
    .find((r) => r.value === "network")!;
  radio.checked = true;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  await settle();
};

const chipFor = (name: string) =>
  [...document.querySelectorAll<HTMLElement>(".chip")]
    .find((c) => c.querySelector(".chip-title")!.textContent!.includes(name));

describe("the site says a line needs bodies no card supplies", () => {
  it("never puts this list in front of a player as a complete win", () => {
    // The defect in one assertion: every chip drawn with no MISSING line is a line this deck can
    // run, and "you win the game" for a deck with no units in it was the worst of them.
    const complete = [...document.querySelectorAll<HTMLElement>(".chip")]
      .filter((c) => !/MISSING/.test(c.querySelector(".chip-meta")?.textContent ?? ""));
    expect(complete.map((c) => c.querySelector(".chip-title")!.textContent)).not.toContain("Gutter Palace");
  });

  it("names the shortfall on the tray chip in the same words it uses for a card", async () => {
    await nearMiss();
    const chip = chipFor("Gutter Palace");
    expect(chip, "the Gutter Palace route is not in the tray at all").toBeDefined();
    expect(chip!.querySelector(".chip-meta")!.textContent).toContain("MISSING 1× any unit");
  });

  it("prints the requirement itself in the drawer, where the sentence fits", async () => {
    await nearMiss();
    chipFor("Gutter Palace")!.click();
    await settle();
    const drawer = document.querySelector<HTMLElement>("#detail")!.textContent ?? "";
    expect(drawer).toContain("Bodies no card supplies");
    // Verbatim from the card, which is where this requirement's own words live: the entry restates
    // it as "4/4" and a paraphrase is what loses a requirement a regex could not see.
    expect(drawer).toContain("exactly 4 units at battlefields");
  });

  it("prices it as a card to add in the plan panel, not as a footnote", async () => {
    const plan = document.querySelector<HTMLElement>("#plan")!;
    expect(plan.hidden, "the plan panel is not open for this list").toBe(false);
    const text = plan.textContent ?? "";
    // The row sits in the same list as the card rows because it costs the same thing, a deck slot.
    expect(text).toMatch(/1 more unit of your own/);
    expect(text).toContain("exactly 4 units at battlefields");
    // "You already have 1 of 1 pieces" beside a "+1 CARD" pill reads as a contradiction. It is not
    // one - havePieces counts the pieces the line NAMES - and the panel now says so in that case.
    expect(text).toContain("named pieces");
    expect(text).toContain("+1 CARD");
  });

  it("says it on the diagram's route node too, which is a CARD graph with no node for a body", async () => {
    await nearMiss();
    const layered = [...document.querySelectorAll<HTMLInputElement>("input[name=layout]")]
      .find((r) => r.value === "layered");
    if (layered) { layered.checked = true; layered.dispatchEvent(new Event("change", { bubbles: true })); await settle(); }
    const node = [...document.querySelectorAll("g.route")]
      .find((g) => (g.querySelector("title")?.textContent ?? "").includes("Gutter Palace"));
    expect(node, "no Gutter Palace route node in the layered diagram").toBeDefined();
    // On the class line, because it is a property of the LINE and not of this deck, and because a
    // badge would need CSS that does not exist and could collide with another lane's.
    expect(node!.querySelector(".route-class")!.textContent).toContain("NEEDS 1 MORE UNIT");
    // Every node is a tab stop (#78), so the sentence has to reach the accessible name as well.
    expect(node!.querySelector("title")!.textContent).toContain("exactly 4 units at battlefields");
  });

  /**
   * THE MITIGATION, AND IT IS LOAD-BEARING RATHER THAN COSMETIC. `src/bodies.ts` documents its own
   * check as deliberately weak, and measurement says the weakness runs ONE WAY: `Math.max(0, count
   * - spare)` has no mechanism to over-report, and `spare` counts every unit card in the list, so on
   * a real deck the shortfall is always zero. Over the three fixtures the suite already pins, 24
   * matched routes carry a body requirement and NOT ONE reports a shortfall.
   *
   * So the machine under-reports a board requirement it cannot see, and what protects the player is
   * that the DRAWER states the requirement WHETHER OR NOT this list is short of it. Make that
   * conditional on `missingBodies` and the flattering becomes invisible — the deck that has twenty
   * units and no body at the right battlefield would be told nothing at all. Nothing pinned it
   * until now, and a conditional is exactly the "simplification" a later reader would reach for.
   */
  it("still states the requirement for a list that is NOT short of bodies", async () => {
    // The same Gutter Palace list plus three Mind bodies, so the check is satisfied and the route
    // comes back complete - the case the near-miss tests above can never reach.
    const withBodies = [...LIST.split("\n"), "3 Watchful Sentry (OGN-096)"].join("\n");
    document.querySelector<HTMLTextAreaElement>("#deck-input")!.value = withBodies;
    document.querySelector<HTMLFormElement>("#deck-form")!
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await settle();
    // The route is COMPLETE now, so it is in the default view rather than the near-miss one the
    // tests above switched to. Which view it appears in is itself part of the fix working.
    await network();

    const chip = chipFor("Gutter Palace");
    expect(chip, "the route did not come back at all").toBeDefined();
    // No MISSING line: the deck now holds the bodies, which is the whole point of this case.
    expect(chip!.querySelector(".chip-meta")!.textContent).not.toContain("MISSING");
    chip!.click();
    await settle();
    const drawer = document.querySelector<HTMLElement>("#detail")!.textContent ?? "";
    expect(drawer).toContain("Bodies no card supplies");
    expect(drawer).toContain("exactly 4 units at battlefields");
  });
});
