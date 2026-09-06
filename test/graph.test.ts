import { describe, expect, it } from "vitest";
import { actualBox, fitBox, type Box } from "../web/graph.js";

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
    it("crops only the far edge, never the near one", () => {
      const b = actualBox(desktop, 960, 638)!;
      expect(b.x + b.w).toBeLessThan(desktop.x + desktop.w);
      expect(b.y + b.h).toBeLessThan(desktop.y + desktop.h);
    });
  });
});
