import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs, which cannot import TypeScript.
import { loadPlays } from "../scripts/web-plays.mjs";

/**
 * A run play is written FOR a reader and rendered verbatim at `#/plays/<slug>` (#206). On 2026-09-19
 * the plays were withheld from the site because 15 of 15 carried sentences addressed to another
 * agent — `Issue #200, lane rc-synth`, `not mine to edit`, a section headed "## 6. For the manager"
 * with script paths in it — rendered under an h1 on a public page carrying the Riot disclaimer. The
 * source IS the render (`readPlay` ships each file whole), so nothing filtered it and nothing could
 * have: a play that is half a work order is half a work order in the browser too.
 *
 * All sixteen were edited for a reader on 2026-09-20 and republished. This is what keeps them that
 * way. The predicate is the fleet's own vocabulary and nothing else — a lane, a manager, a lane's
 * `rc-<name><digits>` handle, a handoff, a brief, the scratch directory, text that is "not mine" —
 * so it cannot catch a rules term (a Combat is *staged* under 323.9, and that word is deliberately
 * not in it). It is a vocabulary list, not a classifier: a new internal name has to be added here.
 *
 * Non-vacuity, twice: the control string must MATCH, or the predicate is looking at nothing; and the
 * directory must hold at least the twenty plays published by 2026-09-25 (#231, #235), or a loader
 * reading an empty directory passes for free.
 */
const FLEET = /\b(?:lane|manager|rc-[a-z]+\d*|handoff|brief|not mine|the user asked|\.scratch)\b|^#{2,3} .*\bfor the manager\b/im;

describe("the run plays are written for a reader", () => {
  const plays = loadPlays(".") as { slug: string; markdown: string }[];

  it("the predicate can see the thing it guards against", () => {
    expect(FLEET.test("Issue #200, lane rc-synth, 2026-09-12.")).toBe(true);
    expect(FLEET.test("## 6. For the manager")).toBe(true);
    expect(FLEET.test("**The constructive lead, which is not mine to write.**")).toBe(true);
    expect(FLEET.test("Mark a Combat as Staged at each Battlefield (323.9).")).toBe(false);
  });

  it("no published play carries fleet language", () => {
    expect(plays.length).toBeGreaterThanOrEqual(20);
    const hits = plays.flatMap((p) =>
      p.markdown
        .split("\n")
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => FLEET.test(line))
        .map(({ line, i }) => `${p.slug}:${i + 1}: ${line.trim()}`),
    );
    expect(hits, "a play addressed to a colleague, not a reader").toEqual([]);
  });
});
