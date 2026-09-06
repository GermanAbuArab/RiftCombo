import { describe, expect, it } from "vitest";
import { classLabel, scoresToWin, victoryNote, VICTORY_SCORE, VICTORY_RULE } from "../src/victory.js";
import { loadCombos } from "../src/load.js";

/**
 * #120. The numbers are quoted from data/Riftbound-Core-Rules-2026-07-16.txt:
 *   194.3   "The Victory Score is 8 points by default."
 *   194.3.a "Some game modes or card effects may alter the Victory Score."
 *   489.3   "Victory Score: 11"
 * Nothing here changes a class or a match — the catalogue stays as it was authored, walked against 8.
 */
describe("the Victory Score of each format", () => {
  it("is 8 by default and 11 in 2v2, each with the paragraph it comes from", () => {
    expect(VICTORY_SCORE).toEqual({ constructed: 8, "2v2": 11 });
    expect(VICTORY_RULE).toEqual({ constructed: "194.3", "2v2": "489.3" });
  });

  it("describes only the two classes that win BY reaching it", () => {
    expect(scoresToWin("BURST")).toBe(true);
    expect(scoresToWin("CHAIN")).toBe(true);
    // INFINITE is unbounded and clears any threshold, ALT_WIN wins by its own printed text, and
    // ENGINE does not close a game at all.
    for (const cls of ["INFINITE", "ALT_WIN", "ENGINE"] as const) expect(scoresToWin(cls), cls).toBe(false);
  });
});

describe("what the class tag reads", () => {
  it("carries the points a BURST or a CHAIN has to reach", () => {
    expect(classLabel("BURST")).toBe("BURST · 8 points");
    expect(classLabel("CHAIN")).toBe("CHAIN · 8 points");
  });

  it("leaves the other three as the words they were, underscore and all", () => {
    expect(classLabel("INFINITE")).toBe("INFINITE");
    expect(classLabel("ALT_WIN")).toBe("ALT WIN");
    expect(classLabel("ENGINE")).toBe("ENGINE");
  });
});

describe("the note under the 2v2 toggle", () => {
  it("says what a line walked to 8 is short of there", () => {
    expect(victoryNote("BURST", "2v2")).toBe("2v2 needs 11 points (Core Rules 489.3); this line reaches 8.");
    expect(victoryNote("CHAIN", "2v2")).toBe(victoryNote("BURST", "2v2"));
  });

  it("says nothing in the format the catalogue was walked in, or for a class the score does not describe", () => {
    for (const cls of ["BURST", "CHAIN", "INFINITE", "ALT_WIN", "ENGINE"] as const) {
      expect(victoryNote(cls, "constructed"), cls).toBe("");
    }
    for (const cls of ["INFINITE", "ALT_WIN", "ENGINE"] as const) expect(victoryNote(cls, "2v2"), cls).toBe("");
  });

  /**
   * The note is a claim about the catalogue, so it has to stay true of it: every BURST and CHAIN in
   * data/combos.json is authored to reach 8, and none of them carries a format.
   */
  it("matches a catalogue that still declares no format on any line", () => {
    const { combos } = loadCombos();
    const scoring = combos.filter((c) => scoresToWin(c.class));
    expect(scoring.length).toBeGreaterThan(0);
    for (const c of scoring) expect(Object.keys(c), c.id).not.toContain("winsIn");
  });
});
