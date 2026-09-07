import { describe, expect, it } from "vitest";
import { actualBox, fitBox, layoutCircular, ringCost, ringOrder, type Box, type Model } from "../web/graph.js";
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
 * The circular ("Radial") layout puts pieces on an inner ring and payoffs on an outer one, each payoff
 * angled toward the mean direction of the pieces that feed it, then nudged apart from its sorted
 * neighbour by a minimum angular gap. That gap used to be sized from `RESULT_H` alone (82), which is
 * only the right dimension for two payoffs stacked along the LEFT or RIGHT of the ring, where the
 * tangent runs roughly vertical. At the top and bottom the tangent runs roughly horizontal and the
 * box's WIDTH (168 — more than twice its height) is what actually separates two neighbours, so an
 * `RESULT_H`-only gap let two payoffs 20° apart at the bottom of the ring overlap by 0.4px of width
 * and 52px of height (found 2026-09-06 on the Lady of Luminosity list `utrecht-27`, whose four matched
 * combos put "Infinite Power" at 90° and "Pressure on the opponent's deck" at 110°). The fix gates the
 * gap on the box's diagonal instead: two same-size axis-aligned boxes whose centres are at least a full
 * diagonal apart can never overlap on either axis at once, whatever the direction between them, so a
 * diagonal-sized gap is safe at every point on the ring, not only at the sides.
 *
 * #163 reordered the ring by adjacency, which moved where these fixtures land: two payoffs fed by one
 * piece each now sit at the TOP of the ring rather than the bottom, since their pieces are the first
 * two placed. The tangent at the top runs horizontal exactly as it does at the bottom, so it is the
 * same failure mode mirrored, and the 20°-apart case is rebuilt below out of a shared piece rather
 * than out of two card indexes.
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

  /** A model over `n` pieces, from a list of "this combo uses these piece indexes" groups. */
  const modelOf = (n: number, groups: number[][]): Model => {
    const cards = Array.from({ length: n }, (_, i) => `c${i}`);
    const outcomeIds = groups.map((_, k) => `f${k}`);
    const combos = groups.map((g, k) => combo(`combo${k}`, g.map((i) => cards[i]!), [outcomeIds[k]!]));
    const need = new Map(cards.map((c) => [c, 1]));
    return { combos, cards, outcomes: outcomeIds.map(feature), missing: new Set(), need, lines: new Map(), land: new Set() };
  };
  /** n pieces; each listed piece is the sole ingredient of a combo pinning one payoff. */
  const modelFor = (n: number, outcomeCardIndexes: number[]): Model =>
    modelOf(n, outcomeCardIndexes.map((i) => [i]));

  const overlaps = (a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) =>
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

  it("never overlaps two outcomes that land 20° apart on a 490-unit ring (the exact regression)", () => {
    // Nine pieces put the outer ring at r2 = 490 and the slots 40° apart. `combo1` uses c0 AND c1, so
    // its payoff wants the mean of their two directions — 20° after `combo0`'s, which wants c0's own.
    // That is the utrecht-27 geometry: 20° apart at r2 = 490.
    const m = modelOf(9, [[0], [0, 1]]);
    const L = layoutCircular(m);
    const boxes = m.outcomes.map((f) => L.pos.get(f.id)!);
    const apart = Math.hypot(boxes[0]!.x - boxes[1]!.x, boxes[0]!.y - boxes[1]!.y);
    // The gap the two boxes were actually given, and what the H-only rule would have allowed instead:
    // 116/490 rad = 13.6°, under the 20° the payoffs asked for, so it would have pushed them not at
    // all — and at 20° on this ring the centres are 167.6 apart on x, half a pixel inside RESULT_W.
    expect(2 * 490 * Math.sin((20 * Math.PI) / 180 / 2)).toBeLessThan(Math.hypot(168, 82));
    expect(apart).toBeGreaterThanOrEqual(Math.hypot(168, 82));
    expect(overlaps(boxes[0]!, boxes[1]!)).toBe(false);
  });

  it("never overlaps any pair of outcomes, at every outcome count and every ring size", () => {
    // Every count from 2 to 13 (the ceiling `data/features.json` documents for STANDALONE features),
    // over ring sizes from 9 pieces to 30 — the small ones are the tight case, since r2 grows with the
    // piece count while the angular gap the payoffs ask for does not.
    for (let k = 2; k <= 13; k++) {
      for (const n of [9, 14, 18, 24, 30]) {
        if (n < k) continue;
        const m = modelFor(n, Array.from({ length: k }, (_, i) => i));
        const L = layoutCircular(m);
        const boxes = m.outcomes.map((f) => L.pos.get(f.id)!);
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            expect(overlaps(boxes[i]!, boxes[j]!), `${k} outcomes on ${n} pieces`).toBe(false);
          }
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

  /**
   * #163. A player's report: *"this is wrong — a card from a combo should be near the combo card."*
   *
   * The ring used to space the pieces by their index in `m.cards`, which is the order the combos
   * happen to introduce them and nothing else, while the payoff went to the mean direction of a set
   * that order had already scattered. Edges run piece → payoff through the middle of the diagram, so
   * a piece opposite its payoff drew a line straight over the hub: measured over the 13 fixture lists
   * in both views, 283,601 units of edge and 495 crossing pairs.
   *
   * What is pinned here is the property, not the arrangement: the ring order is the output of a search
   * and will move again if the cost changes, but a piece must land by the payoff it feeds, a shared
   * piece must land between the payoffs that share it, and the search may never return a ring longer
   * than the one it replaced.
   */
  describe("where a piece sits", () => {
    const centre = (L: ReturnType<typeof layoutCircular>, id: string) => {
      const p = L.pos.get(id)!;
      return { x: p.x + p.w / 2, y: p.y + p.h / 2 };
    };
    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
    const bearing = (L: ReturnType<typeof layoutCircular>, id: string) => {
      const c = centre(L, id), hub = L.width / 2;
      return Math.atan2(c.y - hub, c.x - hub);
    };
    /** Angular distance between two bearings, the short way round. */
    const between = (a: number, b: number) => {
      const d = Math.abs(a - b) % (2 * Math.PI);
      return d > Math.PI ? 2 * Math.PI - d : d;
    };

    it("puts a combo's pieces nearer its own payoff than any other, however they were introduced", () => {
      // The worst case for the old order: two combos whose pieces interleave, so the order the ring
      // is handed alternates between them and neither group is contiguous anywhere in it.
      const m = modelOf(6, [[0, 2, 4], [1, 3, 5]]);
      const L = layoutCircular(m);
      for (const [k, own] of [["f0", [0, 2, 4]], ["f1", [1, 3, 5]]] as const) {
        const other = k === "f0" ? "f1" : "f0";
        for (const i of own) {
          const c = centre(L, `c${i}`);
          expect(dist(c, centre(L, k)), `c${i} → ${k}`).toBeLessThan(dist(c, centre(L, other)));
        }
      }
    });

    it("gives each payoff one unbroken arc of pieces, not a scatter", () => {
      const m = modelOf(6, [[0, 2, 4], [1, 3, 5]]);
      const order = ringOrder(m);
      for (const own of [[0, 2, 4], [1, 3, 5]]) {
        const at = own.map((i) => order.indexOf(`c${i}`)).sort((a, b) => a - b);
        expect(at[at.length - 1]! - at[0]!, `${own} sit at ${at}`).toBe(at.length - 1);
      }
    });

    it("puts a piece two combos share between the two payoffs that share it", () => {
      // c0 feeds both. It cannot be nearer to one payoff than the other by much: what it must not do
      // is sit inside one cluster with a line across the ring to the other.
      const m = modelOf(7, [[0, 1, 2], [0, 3, 4]]);
      const L = layoutCircular(m);
      const shared = bearing(L, "c0"), a = bearing(L, "f0"), b = bearing(L, "f1");
      expect(between(shared, a)).toBeLessThanOrEqual(between(a, b) + 1e-9);
      expect(between(shared, b)).toBeLessThanOrEqual(between(a, b) + 1e-9);
      // And it is nearer to both of them than the pieces at the far end of either cluster.
      for (const far of ["c2", "c4"]) {
        expect(between(bearing(L, "c0"), a) + between(bearing(L, "c0"), b))
          .toBeLessThan(between(bearing(L, far), a) + between(bearing(L, far), b));
      }
    });

    /**
     * The monotonicity guarantee, and the reason `ringOrder` searches from the old insertion order as
     * well as from its own adjacency seed. Grouping by payoff alone improved 18 of the 22 fixture
     * diagrams and made 4 worse (`atlanta-01` and `atlanta-04` in the near-miss view), because
     * contiguity is a proxy and edge length is the thing a reader sees.
     */
    it("never returns a ring longer than the order it replaced", () => {
      const shapes: number[][][] = [
        [[0, 2, 4], [1, 3, 5]],
        [[0], [0, 1]],
        [[0, 1], [2, 3], [4, 5], [6, 7]],
        [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
        [[0, 1, 2, 3], [3, 4, 5], [5, 6, 0]],
        [[7], [3], [11], [0], [5]],
      ];
      for (const groups of shapes) {
        const n = Math.max(12, ...groups.flat().map((i) => i + 1));
        const m = modelOf(n, groups);
        expect(ringCost(m, ringOrder(m)), JSON.stringify(groups)).toBeLessThanOrEqual(ringCost(m, m.cards) + 1e-6);
      }
    });

    it("returns every piece exactly once, and the same answer every time", () => {
      // A search that dropped or duplicated a piece would take a card out of the diagram silently.
      const m = modelOf(9, [[0, 4, 8], [1, 5], [2, 6, 7]]);
      const first = ringOrder(m);
      expect([...first].sort()).toEqual([...m.cards].sort());
      expect(ringOrder(m)).toEqual(first);
      const L = layoutCircular(m);
      for (const b of m.cards) expect(L.pos.get(b), b).toBeDefined();
    });
  });
});
