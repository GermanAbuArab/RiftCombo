import { describe, expect, it } from "vitest";
import { actualBox, fitBox, layoutCircular, type Box, type Model } from "../web/graph.js";
import type { Combo, Feature, Ingredient } from "../src/types.js";

/**
 * The diagram's viewBox is computed from the stage's own measured box, and #57 was what happens when
 * that box is not there: a window resize landing while another view is on screen measured the hidden
 * stage at 0 wide, `Math.min(1, 0 / content.w, …)` gave a scale of 0, and `0 / 0` and `ch / 0` wrote
 * `viewBox="NaN -Infinity NaN Infinity"`. The browser rejects a viewBox it cannot parse, so the SVG
 * was left with none at all — lane headings clipped, the Payoff lane off-screen, "NaN%" in the zoom
 * readout — and it stayed that way after the view came back, because nothing recomputed it.
 *
 * `fitBox` and `actualBox` are pure precisely so this can be pinned here instead of only in a browser.
 * The contract they carry: every number they return is finite, or they return nothing at all.
 */
const content: Box = { x: -64, y: -104, w: 1200, h: 700 };

const finite = (b: Box) => [b.x, b.y, b.w, b.h].every((n) => Number.isFinite(n));

describe("the viewBox geometry", () => {
  it("has no answer for a stage with no box, rather than an invented one", () => {
    // The hidden-view case that produced the NaN, plus every other way a box can be absent.
    for (const [cw, ch] of [[0, 800], [1200, 0], [0, 0], [-5, 800], [NaN, 800], [1200, NaN]]) {
      expect(fitBox(content, cw!, ch!)).toBeNull();
      expect(actualBox(content, cw!, ch!)).toBeNull();
    }
  });

  it("never returns a non-finite number for a stage that has one", () => {
    for (const cw of [1, 320, 390, 640, 960, 1280, 4000]) {
      for (const ch of [1, 200, 569, 860, 2000]) {
        const f = fitBox(content, cw, ch), a = actualBox(content, cw, ch);
        expect(f && finite(f)).toBe(true);
        expect(a && finite(a)).toBe(true);
      }
    }
  });

  it("shows the whole content when it fits, without magnifying past 1:1", () => {
    // A stage larger than the content: the scale caps at 1, so the viewBox is the stage's own size
    // centred on the content and the diagram is drawn at actual size rather than blown up.
    const b = fitBox(content, 2000, 1400)!;
    expect(b.w).toBe(2000);
    expect(b.h).toBe(1400);
    expect(b.x + b.w / 2).toBeCloseTo(content.x + content.w / 2);
    expect(b.y + b.h / 2).toBeCloseTo(content.y + content.h / 2);
  });

  it("widens the viewBox past the content when the stage is too small to hold it", () => {
    // 600 wide against 1200 of content is a scale of 0.5, so the viewBox has to cover 1200 units.
    const b = fitBox(content, 600, 700)!;
    expect(b.w).toBeGreaterThanOrEqual(content.w);
    expect(b.h).toBeGreaterThanOrEqual(content.h);
  });

  it("gives actual size a viewBox exactly the stage's size", () => {
    const b = actualBox(content, 960, 598)!;
    expect(b.w).toBe(960);
    expect(b.h).toBe(598);
  });

  it("centres actual size while the content fits in the stage", () => {
    const b = actualBox(content, 1600, 900)!;
    expect(b.x + b.w / 2).toBeCloseTo(content.x + content.w / 2);
    expect(b.y + b.h / 2).toBeCloseTo(content.y + content.h / 2);
  });

  /**
   * #69. The lane headings — "Pieces", "Combos", "Payoff" — live in the padding above the content
   * (`topPad` = 64 of pad + 40 of label height) and the first of them starts at x = 0, which is
   * `content.x + pad`. Centring a viewBox smaller than its content splits the crop across both edges,
   * so at 1280 the opening 1:1 view cut all three away and the three columns arrived unlabelled.
   *
   * The numbers below are the real desktop case, measured in a browser against production: a 960x638
   * stage (1280 window with the deck panel open) holding a 1334x922 diagram. Centring those
   * numbers reproduces the viewBox the browser actually showed, "123 38 960 638".
   */
  describe("the opening 1:1 view keeps the corner where the diagram names itself", () => {
    const pad = 64, topPad = 104;
    const desktop: Box = { x: -pad, y: -topPad, w: 1334, h: 922 };
    const holds = (b: Box, x: number, y: number) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    it("shows the heading band and the Pieces lane it labels", () => {
      const b = actualBox(desktop, 960, 638)!;
      expect(b.x).toBe(desktop.x);   // anchored, not centred: the crop all goes the way you drag
      expect(b.y).toBe(desktop.y);
      expect(holds(b, 0, -18)).toBe(true);    // "Pieces" baseline, at the left edge of the content
      expect(holds(b, 742, -18)).toBe(true);  // "Combos", the middle lane
    });

    it("is what centring got wrong, so the regression cannot come back quietly", () => {
      // The old rule, spelled out: centre both axes unconditionally.
      const centred = { x: desktop.x + (desktop.w - 960) / 2, y: desktop.y + (desktop.h - 638) / 2, w: 960, h: 638 };
      expect(holds(centred, 0, -18)).toBe(false);
      expect(holds(centred, 742, -18)).toBe(false);
    });

    /**
     * "Payoff" is a different matter and is NOT pinned as visible: it sits at x=1038 in a diagram
     * 1334 wide shown through a 960 stage, so no anchoring brings it into a 1:1 view — the diagram is
     * simply wider than the window. That is the deliberate "1:1 leaves content out" decision
     * (`web/graph.ts`), and Fit is the answer to it. What #69 fixes is that the crop now falls
     * entirely on the far side instead of taking a bite out of both.
     */
    /**
     * The circular layout is the case anchoring gets wrong, found by driving Radial in a browser after
     * #69 shipped: it is a square built around a hub at its centre, so its top-left corner is empty by
     * construction and 1:1 anchored there opened on a near-blank canvas with the hub off-screen. It
     * asks for `centre`, and that is what `renderGraph` passes when the layout has a hub.
     */
    it("opens the circular layout on its hub, not on its empty corner", () => {
      const square: Box = { x: -64, y: -64, w: 1500, h: 1500 };
      const hub = { x: square.x + square.w / 2, y: square.y + square.h / 2 };
      const b = actualBox(square, 960, 638, "centre")!;
      expect(holds(b, hub.x, hub.y)).toBe(true);
      // The default is the layered one, and for this square it would miss the hub entirely.
      expect(holds(actualBox(square, 960, 638)!, hub.x, hub.y)).toBe(false);
    });

    it("crops only the far edge, never the near one", () => {
      const b = actualBox(desktop, 960, 638)!;
      expect(b.x + b.w).toBeLessThan(desktop.x + desktop.w);
      expect(b.y + b.h).toBeLessThan(desktop.y + desktop.h);
    });
  });
});

/**
 * The circular ("Radial") layout puts pieces on an inner ring and outcomes on an outer one, each
 * outcome angled toward the mean direction of the cards that feed it, then nudged apart from its
 * sorted neighbour by a minimum angular gap. That gap used to be sized from `RESULT_H` alone (82),
 * which is only the right dimension for two outcomes stacked along the LEFT or RIGHT of the ring,
 * where the tangent runs roughly vertical. At the TOP or BOTTOM the tangent runs roughly horizontal
 * and the box's WIDTH (168 — more than twice its height) is what actually separates two neighbours,
 * so an `RESULT_H`-only gap let two outcomes 20° apart at the bottom of the ring overlap by 0.4px of
 * width and 52px of height (found 2026-09-06 on the Lady of Luminosity list `utrecht-27`, whose four
 * matched combos put "Infinite Power" at 90° and "Pressure on the opponent's deck" at 110°). The fix
 * gates the gap on the box's diagonal instead: two same-size axis-aligned boxes whose centres are at
 * least a full diagonal apart can never overlap on either axis at once, whatever the direction between
 * them, so a diagonal-sized gap is safe at every point on the ring, not only at the sides.
 */
describe("the circular layout's outcome ring", () => {
  const ingredient = (card: string): Ingredient => ({ card, quantity: 1, role: "payoff" });
  const feature = (id: string): Feature => ({ id, name: id, status: "STANDALONE", uncountable: false });
  const combo = (id: string, cards: string[], produces: string[]): Combo => ({
    id,
    name: id,
    class: "ENGINE",
    status: "verified",
    uses: cards.map(ingredient),
    needs: [],
    produces,
    prerequisites: { easy: [], notable: [] },
    steps: [],
    terminatesIn: "",
    sources: [],
    rulesVersion: "",
  });

  /** n cards evenly spaced on the ring; combos each pin one outcome to one card's angle. */
  const modelFor = (n: number, outcomeCardIndexes: number[]): Model => {
    const cards = Array.from({ length: n }, (_, i) => `c${i}`);
    const outcomeIds = outcomeCardIndexes.map((_, k) => `f${k}`);
    const combos = outcomeCardIndexes.map((i, k) => combo(`combo${k}`, [cards[i]!], [outcomeIds[k]!]));
    const outcomes = outcomeIds.map(feature);
    const need = new Map(cards.map((c) => [c, 1]));
    return { combos, cards, outcomes, missing: new Set(), need, lines: new Map(), land: new Set() };
  };

  const overlaps = (a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) =>
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

  it("never overlaps two outcomes that land at the bottom of the ring 20° apart (the exact regression)", () => {
    // 9 cards, indexes 4 and 5 sit at -90+4*40=70° and -90+5*40=110° respectively; picking a single
    // card each keeps the pre-adjustment centroid angle exactly at the card's own angle, reproducing
    // the utrecht-27 case (90° and 110°) closely enough to hit the same failure mode.
    const m = modelFor(9, [4, 5]);
    const L = layoutCircular(m);
    const boxes = m.outcomes.map((f) => L.pos.get(f.id)!);
    expect(overlaps(boxes[0]!, boxes[1]!)).toBe(false);
  });

  it("never overlaps any pair of outcomes, for every outcome count up to the full STANDALONE vocabulary", () => {
    // Force outcomes onto adjacent card indexes (the tightest pre-adjustment spacing) at every count
    // from 2 to 13, the ceiling `data/features.json` documents for STANDALONE features.
    for (let k = 2; k <= 13; k++) {
      const n = Math.max(k, 9);
      const m = modelFor(n, Array.from({ length: k }, (_, i) => i));
      const L = layoutCircular(m);
      const boxes = m.outcomes.map((f) => L.pos.get(f.id)!);
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          expect(overlaps(boxes[i]!, boxes[j]!)).toBe(false);
        }
      }
    }
  });

  it("keeps every outcome box a finite, positive size positioned on the outer ring", () => {
    const m = modelFor(9, [0, 3, 5]);
    const L = layoutCircular(m);
    for (const f of m.outcomes) {
      const p = L.pos.get(f.id)!;
      expect([p.x, p.y, p.w, p.h].every((v) => Number.isFinite(v))).toBe(true);
      expect(p.w).toBeGreaterThan(0);
      expect(p.h).toBeGreaterThan(0);
    }
  });
});
