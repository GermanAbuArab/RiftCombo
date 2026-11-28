import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Every `basis.combos` id in `data/synergies.json` has to resolve to an entry in `data/combos.json`.
 *
 * Written 2026-09-12 because a synergy lane caught itself writing two of those ids FROM MEMORY, and
 * both were invented. Nothing in the project validated them: the rules file, the card codes, the rule
 * paragraphs and the legend lines are all checked, and this one field was not — so a fabricated id
 * would have shipped and then been read by the next session as evidence that a rule was extracted from
 * a walked entry.
 *
 * The lane found it by re-reading its own work, which is the only instrument that can catch a
 * plausible-looking id. This test is the cheap instrument that catches it next time.
 *
 * `basis.combos` has two legitimate meanings in this file and this test is deliberately blind to the
 * difference: usually "the entry runs this anchor", sometimes "the mechanism was extracted from this
 * entry, which demonstrates it with different cards". Both require the id to EXIST, which is all that
 * is asserted here.
 */
const root = new URL("..", import.meta.url);
const combos = JSON.parse(readFileSync(new URL("data/combos.json", root), "utf8")) as {
  combos: { id: string }[];
};
const synergies = JSON.parse(readFileSync(new URL("data/synergies.json", root), "utf8")) as {
  synergies: { id: string; basis?: { combos?: string[] } }[];
};

describe("synergy rules cite entries that exist", () => {
  it("resolves every basis.combos id against data/combos.json", () => {
    const ids = new Set(combos.combos.map((c) => c.id));
    const bad: string[] = [];
    let checked = 0;
    for (const rule of synergies.synergies) {
      for (const id of rule.basis?.combos ?? []) {
        checked++;
        if (!ids.has(id)) bad.push(`${rule.id} cites a combo id that does not exist: ${id}`);
      }
    }
    expect(checked, "no synergy rule carries a basis.combos id — the field or the schema changed").toBeGreaterThan(100);
    expect(bad, bad.join("\n")).toEqual([]);
  });
});
