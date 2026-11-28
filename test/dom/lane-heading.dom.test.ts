// @vitest-environment happy-dom
//
// The lane headings — "Pieces", "Combos", "Payoff" — are CHROME, not content: they say which lane
// you are looking at. Until 2026-09-09 they scaled with the viewBox like everything else, which is
// invisible on a desktop (the stage opens at 1:1, `web/graph.ts`: `clientWidth < 640 ? fit() :
// actualSize()`) and unreadable on a phone, where fit IS the opening view.
//
// Measured over the 225 fixture lists at 390x572 and 360x528, through the real `renderGraph`:
// the fit scale is 35–46%, so a 14-unit heading landed at 4.9–6.4 CSS px. That floor is GEOMETRY,
// not content — the layered layout can never be narrower than
//   134 (CELL_W) + 2*128 (LANE_GAP) + 168 (ROUTE_W) + 168 (RESULT_W) + 2*64 (pad) = 854px
// so a 390px stage has a fit CEILING of 390/854 = 46% whatever is drawn. Reducing what is shown
// cannot reach it: capping the diagram at seven did not, and nothing else will. The two alternatives
// were measured and refused — a narrower LANE_GAP buys +1.6px at best and cannot go below 44,
// because `sidePath` routes the "needs" edge down a 40px gutter and 33.5% of diagrams draw one;
// the circular layout fits at 22–27%, worse, and returns `labels: []`, so it "solves" the heading
// by deleting it.
//
// So the heading keeps a constant SCREEN size at every zoom, on every stage — one code path, no
// media query. What this file pins is that property, and the one thing it drags along: a label held
// at 14px can grow wider than the lane it names, and a rule shorter than its own label reads as a
// mistake, so the rule is drawn to whichever is wider.
//
// SCOPE, stated because the commit and the issue state it too: this buys NAVIGATION, not
// READABILITY. The card name plates still scale and sit near 5px at a 38% fit. Nobody should read
// this test as saying the phone diagram was made readable.
import { describe, expect, it } from "vitest";
import { renderGraph, type GraphContext } from "../../web/graph.js";
import type { Hit } from "../../src/matcher.js";
import type { Combo, Feature } from "../../src/types.js";

const combo = (id: string, name: string, cards: string[]): Combo =>
  ({ id, name, class: "ENGINE", status: "verified", produces: ["f1"], needs: [],
     uses: cards.map((card) => ({ card, quantity: 1, role: "payoff" })) } as unknown as Combo);

const hit = (id: string): Hit => ({ variant: { comboIds: [id] } } as unknown as Hit);

/** One card column is the narrowest the layered layout can be, so it is the worst case for a
 *  constant-size label: the lane under it is as short as it ever gets. */
const ctxFor = (combos: Combo[]): GraphContext => ({
  combos: new Map(combos.map((c) => [c.id, c])),
  features: new Map([["f1", { id: "f1", name: "Infinite Energy", status: "STANDALONE" } as unknown as Feature]]),
  card: () => undefined,
  owned: () => 1,
  illegal: () => false,
  legend: null,
  onSelect: () => {},
  onZoom: () => {},
});

const stage = (w: number, h: number) => {
  const host = document.createElement("div");
  Object.defineProperty(host, "clientWidth", { value: w, configurable: true });
  Object.defineProperty(host, "clientHeight", { value: h, configurable: true });
  document.body.append(host);
  return host;
};

const scaleOf = (g: Element) => Number(/scale\(([-\d.]+)\)/.exec(g.getAttribute("transform") ?? "")?.[1] ?? 1);
const anchorOf = (g: Element) => Number(/translate\(([-\d.]+),/.exec(g.getAttribute("transform") ?? "")?.[1] ?? 0);
/** Screen pixels per user unit, which is exactly what the zoom readout reports. */
const pxPerUnit = (host: HTMLElement) => {
  const vb = host.querySelector("svg")!.getAttribute("viewBox")!.split(" ").map(Number);
  return host.clientWidth / vb[2]!;
};

const heads = (host: HTMLElement) => [...host.querySelectorAll(".lane-head")];

describe("the lane headings hold a constant screen size", () => {
  const cs = [combo("a", "Alpha loop", ["OGN-001", "OGN-002"]), combo("b", "Beta loop", ["OGN-002", "OGN-003"])];

  it("draws one heading group per lane, each carrying its own scale", () => {
    const host = stage(1120, 638);
    renderGraph(host, [hit("a"), hit("b")], "layered", ctxFor(cs));
    expect(heads(host)).toHaveLength(3);
    for (const g of heads(host)) {
      expect(g.querySelector("text.lane-label")).not.toBeNull();
      expect(g.querySelector("line.lane-rule")).not.toBeNull();
    }
  });

  /**
   * The property, stated as arithmetic: the heading renders at
   *   14 user units x group scale x screen px per unit
   * and the group scale is the inverse of the second factor, so the product is 14 at every zoom.
   * Desktop opens at 1:1 and phone at fit, and both have to come out at 14.
   */
  it("renders at 14 CSS px on every stage and at every zoom", () => {
    for (const [w, h] of [[1120, 638], [960, 538], [390, 572], [360, 528]]) {
      const host = stage(w!, h!);
      const view = renderGraph(host, [hit("a"), hit("b")], "layered", ctxFor(cs));
      for (const zoom of ["open", "fit", "in", "out"] as const) {
        if (zoom === "fit") view.fit();
        if (zoom === "in") view.zoomBy(1 / 2);
        if (zoom === "out") view.zoomBy(4);
        const s = pxPerUnit(host);
        expect(heads(host)).toHaveLength(3);
        for (const g of heads(host)) expect(14 * scaleOf(g) * s).toBeCloseTo(14, 6);
      }
    }
  });

  /**
   * A constant-size label can only be a mistake if it lands on its neighbour. The distance between
   * adjacent label ANCHORS is geometry, and measured over the 225 fixture lists through the real
   * renderGraph its floor was 84px at a 390 stage and 76px at 360 — comfortably more than a 14px
   * six-character label, which is roughly 45-55px (an estimate: happy-dom has no font metrics, which
   * is exactly why this pins the measured distance rather than the estimate). This fixture is the
   * narrowest realistic case, one card column, so it stands as the regression guard for that floor.
   */
  it("leaves at least the measured worst-case room between adjacent headings", () => {
    for (const [w, h, floor] of [[390, 572, 84], [360, 528, 76]]) {
      const host = stage(w!, h!);
      renderGraph(host, [hit("a")], "layered", ctxFor(cs));   // opens at fit below 640
      const s = pxPerUnit(host);
      const xs = heads(host).map(anchorOf).sort((a, b) => a - b);
      expect(xs).toHaveLength(3);
      for (let i = 1; i < xs.length; i++) expect((xs[i]! - xs[i - 1]!) * s).toBeGreaterThanOrEqual(floor!);
    }
  });

  /**
   * Inside a group scaled by the inverse of the zoom, one unit IS one screen pixel — which is what
   * lets the rule be sized against the label in the same arithmetic. The rule runs under the lane,
   * unless the label held at 14px is wider than the lane, in which case it runs under the label.
   */
  describe("the rule is drawn to whichever is wider, the lane or the label", () => {
    const ruleOf = (host: HTMLElement) => heads(host).map((g) => Number(g.querySelector("line.lane-rule")!.getAttribute("x2")));
    const withTextWidth = (px: number, host: HTMLElement) => {
      for (const t of host.querySelectorAll("text.lane-label")) (t as unknown as { getComputedTextLength: () => number }).getComputedTextLength = () => px;
    };

    it("uses the lane on a desktop stage, where the branch never fires", () => {
      const host = stage(1120, 638);
      const view = renderGraph(host, [hit("a")], "layered", ctxFor(cs));
      withTextWidth(55, host);
      view.zoomBy(1);                                  // recompute at 1:1
      // At 1:1 a lane is its own width in pixels, and every lane here is wider than 55.
      expect(ruleOf(host)).toHaveLength(3);
      for (const x2 of ruleOf(host)) expect(x2).toBeGreaterThan(55);
    });

    it("uses the label once the lane has shrunk under it", () => {
      const host = stage(360, 528);
      const view = renderGraph(host, [hit("a")], "layered", ctxFor(cs));
      withTextWidth(200, host);                        // wider than any lane at this scale
      view.fit();
      expect(ruleOf(host)).toHaveLength(3);
      for (const x2 of ruleOf(host)) expect(x2).toBeCloseTo(200, 6);
    });
  });
});
