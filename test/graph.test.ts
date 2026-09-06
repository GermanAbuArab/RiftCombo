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

  it("gives actual size a viewBox exactly the stage's size, centred", () => {
    const b = actualBox(content, 960, 598)!;
    expect(b.w).toBe(960);
    expect(b.h).toBe(598);
    expect(b.x + b.w / 2).toBeCloseTo(content.x + content.w / 2);
  });
});
