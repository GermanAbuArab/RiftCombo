// Hand-rolled SVG combo diagram. Two shapes: "layered" (Pieces -> Combos -> Payoff, in columns)
// and "circular" (legend hub, pieces on a ring, payoffs on an outer ring). No library, closed-form
// geometry.
//
// Layout notes that are load-bearing:
//  - The pieces lane is a real grid, not a stagger. Rows are spaced by more than a card's height,
//    so a name plate can never reach the card below it.
//  - The number of grid columns is chosen from the stage's aspect ratio, so the diagram comes out
//    roughly the shape of the space it has to live in. Without this the content is near-square,
//    the stage is wide, and fitting it wastes half the width.
//  - The initial view is 1:1, opened at the corner the layered diagram is read from and at the middle
//    of the circular one, which is where its hub is. Fitting everything into view is what the fit
//    button is for; it never magnifies past 100%.
import type { Hit } from "../src/matcher.js";
import type { Card, Combo, Feature } from "../src/types.js";

export type Layout = "layered" | "circular";

export interface GraphContext {
  combos: Map<string, Combo>;
  features: Map<string, Feature>;
  card: (base: string) => Card | undefined;
  owned: (base: string) => number;
  illegal: (base: string) => boolean;
  legend: string | null;
  /** Fired when a combo is pinned (or unpinned with null). */
  onSelect: (comboId: string | null) => void;
  onZoom: (percent: number) => void;
}

export interface GraphView {
  /** False when the stage had no box to measure and the view was left as it was. See `fitBox`. */
  fit: () => boolean;
  zoomBy: (k: number) => void;
  select: (comboId: string | null) => void;
  setDim: (on: boolean) => void;
  destroy: () => void;
}

/** One accent, plus neutrals. Outcome identity is carried by the label, not by a colour code. */
export const ACCENT = "#ef7d00";
export const OUTCOME_PALETTE = [ACCENT];

// Battlefields are printed landscape (66 of the 1,189 printings); everything else is portrait.
// Forcing a landscape card into a portrait frame crops its art to a sliver and stands its text on
// end, so the two get different node shapes and share one square grid cell.
const CARD_W = 96, CARD_H = 134, IMG_W = 86, IMG_H = 118;
const LAND_W = 134, LAND_H = 94, LAND_IMG_W = 124, LAND_IMG_H = 78;
const CELL_W = LAND_W, CELL_H = CARD_H;
// gap_y > 0 guarantees plates never reach the next row. gap_x > gap_y is #190: the lane is filled
// COLUMN-major, so a column carries the ordering and a row is an artifact — but proximity groups
// along whichever axis is tighter, and at 26 vs 34 that was the row. Measured before the change on
// lille-18 in near-miss mode: 13px horizontal against 17px vertical at the 0.51 fit scale, and the
// worst case is two battlefields, which fill the 134-wide cell and so sat a bare 26 apart while
// every vertical neighbour had 34 plus a name plate between them. 44 puts the horizontal air above
// the vertical for every card shape: 44 between two battlefields, 82 between two portrait cards
// (each is 96 in a 134 cell), against 34 down. Nothing here says what the axes MEAN; it stops the
// drawing from asserting a grouping the data does not have.
const CARD_GAP_X = 44, CARD_GAP_Y = 34;
const ROUTE_W = 168, ROUTE_MIN_H = 96;
const RESULT_W = 168, RESULT_H = 82;
const LANE_GAP = 128;                      // horizontal air between lanes
const LANE_LABEL_H = 40;

const ns = "http://www.w3.org/2000/svg";
const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, text?: string) => {
  const e = document.createElementNS(ns, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  if (text !== undefined) e.textContent = text;
  return e;
};
export const thumb = (image: string | null | undefined, w: number) => (image ? `${image}&w=${w}&fm=webp&q=75` : null);
const short = (s: string, max: number) => (s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s);
const wrap = (s: string, maxChars: number, maxLines: number): string[] => {
  const words = s.split(/\s+/); const lines: string[] = []; let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = short(lines[maxLines - 1]!, maxChars); }
  return lines;
};

export interface Model {
  combos: Combo[];
  cards: string[];
  outcomes: Feature[];
  missing: Set<string>;
  need: Map<string, number>;
  lines: Map<string, string[]>;  // combo id -> wrapped label lines
  land: Set<string>;             // card bases printed landscape
}
const boxOf = (m: Model, base: string) => (m.land.has(base) ? { w: LAND_W, h: LAND_H } : { w: CARD_W, h: CARD_H });

function model(hits: Hit[], ctx: GraphContext): Model {
  const comboIds = [...new Set(hits.flatMap((h) => h.variant.comboIds))].filter((id) => ctx.combos.has(id));
  const combos = comboIds.map((id) => ctx.combos.get(id)!);
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, CHAIN: 2, ALT_WIN: 3, ENGINE: 4 };
  combos.sort((a, b) => Number(b.status === "verified") - Number(a.status === "verified") || order[a.class]! - order[b.class]! || a.name.localeCompare(b.name));
  const outcomeIds = [...new Set(combos.flatMap((c) => c.produces))].filter((f) => ctx.features.get(f)?.status === "STANDALONE");
  const outcomes = outcomeIds.map((f) => ctx.features.get(f)!);
  const need = new Map<string, number>();
  for (const c of combos) for (const u of c.uses) need.set(u.card, Math.max(need.get(u.card) ?? 0, u.quantity));
  const cards = [...need.keys()];
  const missing = new Set(cards.filter((b) => ctx.owned(b) < need.get(b)!));
  // Combo names get four lines at 24 characters before anything is cut, so a full name fits.
  const lines = new Map(combos.map((c) => [c.id, wrap(c.name.replace(/\s[—–-]\s.*$/, ""), 24, 4)]));
  const land = new Set(cards.filter((b) => ctx.card(b)?.orientation === "landscape"));
  return { combos, cards, outcomes, missing, need, lines, land };
}

export interface Box { x: number; y: number; w: number; h: number }

/**
 * The viewBox that shows all of `content` inside a `cw`x`ch` stage, never magnifying past 1:1 — a
 * two-node diagram blown up looks broken.
 *
 * Null when the stage has no box. A container inside a `hidden` view measures 0 wide, and the scale
 * drawn from it is 0, so `cw / scale` is `0 / 0` and `ch / scale` is `Infinity`: the viewBox came out
 * `NaN -Infinity NaN Infinity`, the browser rejected the whole attribute, and the diagram was left
 * with none at all — clipped and stuck at "NaN%" even after the view came back (#57). Nothing can be
 * fitted to a box that is not there, so this says so instead of returning a number it invented.
 */
export const fitBox = (content: Box, cw: number, ch: number): Box | null => {
  if (!(cw > 0) || !(ch > 0)) return null;
  const scale = Math.min(1, cw / content.w, ch / content.h);
  const w = cw / scale, h = ch / scale;
  return { x: content.x + (content.w - w) / 2, y: content.y + (content.h - h) / 2, w, h };
};

/**
 * Where a layout keeps its subject, and so what the opening 1:1 view must not crop away.
 * "start" is the top-left: the layered diagram is read from there, and its lane headings live in the
 * padding above and to the left of the content. "centre" is the middle: the circular layout is built
 * around a hub and its corners are empty by construction.
 */
export type Opening = "start" | "centre";

/**
 * 1:1. Clipping is fine — the fit button is right there — but WHERE it clips is not a free choice.
 *
 * A viewBox smaller than its content has to give up something on every axis. Centring splits that
 * crop across both edges, which for the layered diagram takes a bite out of the two things that name
 * it: the lane headings sit in `topPad` above the content, and "Pieces" starts at x=0. At 1280 all
 * three of "Pieces", "Combos" and "Payoff" fell outside the opening view and the columns arrived
 * unlabelled (#69). So a layout that reads from its corner is anchored there and the whole crop falls
 * the way the diagram is dragged.
 *
 * The circular layout is the opposite case and asks for `centre`: its subject is the hub in the
 * middle and the corners of its bounding square hold nothing, so anchoring to the start opens on
 * empty canvas. An axis whose content already fits is centred either way — there is nothing to crop.
 *
 * Null as `fitBox` — see there for why a stage with no box has no answer.
 */
export const actualBox = (content: Box, cw: number, ch: number, opening: Opening = "start"): Box | null => {
  if (!(cw > 0) || !(ch > 0)) return null;
  const place = (c: number, size: number, stage: number) =>
    size <= stage || opening === "centre" ? c + (size - stage) / 2 : c;
  return { x: place(content.x, content.w, cw), y: place(content.y, content.h, ch), w: cw, h: ch };
};

interface Placed { id: string; x: number; y: number; w: number; h: number }
interface Edge { from: string; to: string; dashed: boolean; comboId: string; kind: "card" | "result" | "needs" }

const meanY = (ids: string[], pos: Map<string, Placed>) => {
  const ys = ids.map((i) => pos.get(i)?.y).filter((y): y is number => y !== undefined);
  return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : 1e9;
};

// 62 = first label baseline, +17 per extra line, +20 clear space, +12 for the class line's own
// baseline offset from the bottom. Undersizing this makes the name collide with "INFINITE".
const routeH = (m: Model, id: string) => Math.max(ROUTE_MIN_H, 94 + (m.lines.get(id)!.length - 1) * 17);

/**
 * Layered: three columns. The pieces lane is a grid whose column count is chosen so the whole
 * diagram comes out about as wide-to-tall as the stage it has to sit in.
 */
function layoutLayered(m: Model, aspect: number) {
  const pos = new Map<string, Placed>();
  const edges: Edge[] = [];

  const routesH = m.combos.reduce((s, c) => s + routeH(m, c.id) + 26, 0) - 26;
  const resultsH = m.outcomes.length * (RESULT_H + 30) - 30;
  const n = Math.max(1, m.cards.length);

  const shape = (k: number) => {
    const rows = Math.ceil(n / k);
    const cardsW = k * (CELL_W + CARD_GAP_X) - CARD_GAP_X;
    const cardsH = rows * (CELL_H + CARD_GAP_Y) - CARD_GAP_Y;
    const W = cardsW + LANE_GAP + ROUTE_W + LANE_GAP + RESULT_W;
    const H = Math.max(cardsH, routesH, resultsH);
    return { k, rows, cardsW, cardsH, W, H };
  };
  // Closest aspect ratio to the stage wins; log-distance so "twice as wide" and "half as wide" cost the same.
  let best = shape(1);
  for (let k = 2; k <= Math.min(4, n); k++) {
    const s = shape(k);
    if (Math.abs(Math.log(s.W / s.H / aspect)) < Math.abs(Math.log(best.W / best.H / aspect))) best = s;
  }

  const combosY = new Map<string, number>();
  let y = 0;
  for (const c of m.combos) { combosY.set(c.id, y); y += routeH(m, c.id) + 26; }
  const byCombo = (base: string) => m.combos.filter((c) => c.uses.some((u) => u.card === base)).map((c) => c.id);
  const cards = [...m.cards].sort((a, b) => {
    const ya = byCombo(a).map((id) => combosY.get(id)!), yb = byCombo(b).map((id) => combosY.get(id)!);
    return (ya.reduce((s, v) => s + v, 0) / (ya.length || 1)) - (yb.reduce((s, v) => s + v, 0) / (yb.length || 1));
  });
  // Column-major: reading down a column follows the combo order, and the rightmost column sits
  // nearest the combo lane it feeds.
  cards.forEach((base, i) => {
    const col = Math.floor(i / best.rows), row = i % best.rows;
    const b = boxOf(m, base);
    pos.set(base, {
      id: base,
      x: col * (CELL_W + CARD_GAP_X) + (CELL_W - b.w) / 2,
      y: row * (CELL_H + CARD_GAP_Y) + (CELL_H - b.h) / 2,
      w: b.w, h: b.h,
    });
  });

  const routeX = best.cardsW + LANE_GAP;
  for (const c of m.combos) pos.set(c.id, { id: c.id, x: routeX, y: combosY.get(c.id)!, w: ROUTE_W, h: routeH(m, c.id) });
  const resultX = routeX + ROUTE_W + LANE_GAP;
  const outcomes = [...m.outcomes].sort((a, b) => meanY(m.combos.filter((c) => c.produces.includes(a.id)).map((c) => c.id), pos) - meanY(m.combos.filter((c) => c.produces.includes(b.id)).map((c) => c.id), pos));
  outcomes.forEach((f, i) => pos.set(f.id, { id: f.id, x: resultX, y: i * (RESULT_H + 30), w: RESULT_W, h: RESULT_H }));

  // Centre the three lanes against each other vertically.
  const laneH = (ids: string[]) => (ids.length ? Math.max(...ids.map((i) => pos.get(i)!.y + pos.get(i)!.h)) : 0);
  const H = Math.max(laneH(cards), laneH(m.combos.map((c) => c.id)), laneH(outcomes.map((o) => o.id)));
  for (const ids of [cards, m.combos.map((c) => c.id), outcomes.map((o) => o.id)]) {
    const off = (H - laneH(ids)) / 2;
    for (const id of ids) pos.get(id)!.y += off;
  }

  for (const c of m.combos) {
    for (const u of c.uses) edges.push({ from: u.card, to: c.id, dashed: m.missing.has(u.card), comboId: c.id, kind: "card" });
    for (const f of c.produces) if (m.outcomes.some((o) => o.id === f)) edges.push({ from: c.id, to: f, dashed: false, comboId: c.id, kind: "result" });
    // Dashed means one thing only: a card the deck is missing. A combo depending on another
    // combo is a different relationship and gets its own quiet, side-routed line.
    for (const need of c.needs) for (const p of m.combos) if (p.id !== c.id && p.produces.includes(need)) edges.push({ from: p.id, to: c.id, dashed: false, comboId: c.id, kind: "needs" });
  }
  const labels = [
    { x: 0, w: best.cardsW, text: "Pieces" },
    { x: routeX, w: ROUTE_W, text: "Combos" },
    { x: resultX, w: RESULT_W, text: "Payoff" },
  ];
  return { pos, edges, width: resultX + RESULT_W, height: H, labels, hub: null as null | { x: number; y: number } };
}

// --- the circular layout ---------------------------------------------------------------
// Pieces sit on an inner ring, payoffs on an outer one, the legend at the hub, and every edge runs
// from a piece to the payoff it feeds. The two rings are functions of the piece count alone.
const TOP = -Math.PI / 2;
/** Any angle expressed in the frame the ring is laid out in: from the top, forwards, once round. */
const onRing = (a: number) => TOP + ((((a - TOP) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
const ringRadii = (n: number) => {
  const r1 = Math.max(260, (n * (CELL_W + 40)) / (2 * Math.PI));
  return { r1, r2: r1 + 230 };
};
const chord = (r1: number, a1: number, r2: number, a2: number) =>
  Math.hypot(r1 * Math.cos(a1) - r2 * Math.cos(a2), r1 * Math.sin(a1) - r2 * Math.sin(a2));

/**
 * Where each payoff lands, given where the pieces are: the mean direction of the pieces feeding it,
 * then nudged apart from its neighbour so two boxes can never overlap.
 *
 * Two same-size axis-aligned boxes never overlap once their centres are at least a full diagonal
 * apart, whatever direction separates them (if centres are `diag` apart, one box would need both
 * dx < RESULT_W and dy < RESULT_H at once, which needs dx²+dy² < RESULT_W²+RESULT_H² = diag² — a
 * contradiction). Using only RESULT_H here under-measured the gap needed at the top and bottom of
 * the ring, where the boxes sit wide-side-on to their neighbour and RESULT_W is what matters: two
 * outcomes 20° apart at the bottom of the ring overlapped by 0.4px width and 52px height even
 * though the (H-only) minGap said they had room. The diagonal is the dimension-agnostic bound.
 *
 * `Math.atan2` answers in (-π, π] while the ring runs from -π/2 upwards, so a payoff whose pieces sit
 * near the end of the ring used to come back as a small negative number and sort to the FRONT of the
 * chain — the seam cut a cluster in half and the nudging pass then dragged the rest around it. Both
 * frames are `onRing` now.
 */
function payoffAngles(m: Model, angle: (base: string) => number, r2: number): Map<string, number> {
  const want = m.outcomes.map((f) => {
    const cards = m.combos.filter((c) => c.produces.includes(f.id)).flatMap((c) => c.uses.map((u) => u.card));
    const sx = cards.reduce((s, b) => s + Math.cos(angle(b)), 0), sy = cards.reduce((s, b) => s + Math.sin(angle(b)), 0);
    return { f, want: cards.length ? onRing(Math.atan2(sy, sx)) : TOP, a: 0 };
  }).sort((p, q) => p.want - q.want);
  for (const o of want) o.a = o.want;
  const minGap = (Math.hypot(RESULT_W, RESULT_H) + 34) / r2;
  for (let i = 1; i < want.length; i++) if (want[i]!.a - want[i - 1]!.a < minGap) want[i]!.a = want[i - 1]!.a + minGap;
  // The pass above only ever pushes forwards, so a run of payoffs that all want the same angle — the
  // normal case, since several payoffs can come out of one combo and so out of one arc of pieces —
  // ends up entirely on one side of the pieces that feed it. Sliding the whole set back by its mean
  // displacement re-centres it on what it asked for; a constant subtracted from every angle leaves
  // every pairwise gap exactly as it was, so this cannot cost the no-overlap guarantee above.
  if (want.length) {
    const drift = want.reduce((s, o) => s + (o.a - o.want), 0) / want.length;
    for (const o of want) o.a -= drift;
  }
  return new Map(want.map((o) => [o.f.id, o.a]));
}

/** The total length of every piece → payoff edge if the pieces sat in this order. The thing to minimise. */
export function ringCost(m: Model, order: string[]): number {
  const n = Math.max(1, order.length);
  const { r1, r2 } = ringRadii(n);
  const at = new Map(order.map((b, i) => [b, TOP + (i * 2 * Math.PI) / n]));
  const angle = (b: string) => at.get(b) ?? TOP;
  const payoff = payoffAngles(m, angle, r2);
  let total = 0;
  for (const c of m.combos) for (const f of c.produces) {
    const a = payoff.get(f);
    if (a === undefined) continue;
    for (const u of c.uses) total += chord(r1, angle(u.card), r2, a);
  }
  return total;
}

/**
 * The order the pieces sit in around the ring, and the whole reason this layout stopped drawing a
 * piece on one side of the hub and its payoff on the other (#163).
 *
 * `m.cards` arrives as `[...need.keys()]` — the order the combos happen to introduce it — and the
 * ring used to space the pieces by that index alone, so a piece's angle had nothing to do with the
 * payoff it feeds. Measured over the 13 fixture lists in both views: 283,601 units of edge and 495
 * crossing pairs, with `Retreat → Infinite Power` running 711 units across a diagram 1,405 wide,
 * straight over the hub.
 *
 * The seed is adjacency order: combos grouped by the payoff they produce, in the order the outer ring
 * already lists the payoffs, so every payoff's pieces start as one contiguous arc, and a piece used by
 * several combos starts at the mean of their positions rather than at the first one that introduced
 * it. That alone is not enough — it improved 18 of the 22 fixture diagrams and made 4 of them worse,
 * because grouping optimises a proxy (contiguity) and not the thing a reader sees (edge length).
 *
 * So the seed is then refined against the real quantity. Each round places the payoffs, gives every
 * piece the mean direction of the payoffs it feeds, re-sorts the ring by that, and tries all n
 * rotations of the result against the n slots, keeping the cheapest by `ringCost`. A round that does
 * not beat the round before it ends the search.
 *
 * The search runs from the old insertion order as well, and the best order any of it ever produced is
 * the one returned. That is what makes this monotone: whatever `m.cards` arrives in, the ring it gets
 * can never be longer than the ring it used to get — which grouping alone could not promise, and did
 * not deliver on `atlanta-01` and `atlanta-04`.
 */
export function ringOrder(m: Model): string[] {
  const seed = seedOrder(m);
  if (seed.length < 3 || !m.outcomes.length) return seed;
  let best = seed, bestCost = ringCost(m, seed);
  for (const start of [seed, [...m.cards]]) {
    let current = start, currentCost = ringCost(m, start);
    if (currentCost < bestCost - 1e-6) { bestCost = currentCost; best = current; }
    for (let round = 0; round < 4; round++) {
      const next = rotateToFit(m, pullToPayoffs(m, current));
      const cost = ringCost(m, next);
      current = next;
      if (cost >= currentCost - 1e-6) break;
      currentCost = cost;
      if (cost < bestCost - 1e-6) { bestCost = cost; best = next; }
    }
  }
  return best;
}

/** Pieces grouped by the payoff they feed, then by the combo, with a shared piece at the mean of the combos using it. */
function seedOrder(m: Model): string[] {
  const ordered: Combo[] = [];
  const placed = new Set<string>();
  const take = (c: Combo) => { if (!placed.has(c.id)) { placed.add(c.id); ordered.push(c); } };
  for (const f of m.outcomes) for (const c of m.combos) if (c.produces.includes(f.id)) take(c);
  // A combo with no STANDALONE payoff draws no edge in this layout at all, so its pieces go last
  // rather than splitting an arc that does carry one.
  for (const c of m.combos) take(c);

  const using = new Map<string, number[]>();
  ordered.forEach((c, i) => {
    for (const u of c.uses) {
      if (!using.has(u.card)) using.set(u.card, []);
      using.get(u.card)!.push(i);
    }
  });
  // The mean is taken over positions on a LINE, not around the circle, so a piece shared between the
  // first group and the last lands in the middle of the ring rather than across the seam behind the
  // hub. The refinement above is what recovers that case.
  const key = (base: string) => {
    const xs = using.get(base);
    return xs?.length ? xs.reduce((a, b) => a + b, 0) / xs.length : ordered.length;
  };
  // A piece in no combo at all cannot be pulled anywhere: it keeps its place, after everything that
  // has a payoff to sit under.
  const given = new Map(m.cards.map((b, i) => [b, i]));
  return [...m.cards].sort((a, b) => key(a) - key(b) || (using.get(a)?.[0] ?? 0) - (using.get(b)?.[0] ?? 0) || given.get(a)! - given.get(b)!);
}

/** Re-sort the ring so each piece sits where the payoffs it feeds are, breaking ties on the order it had. */
function pullToPayoffs(m: Model, order: string[]): string[] {
  const n = Math.max(1, order.length);
  const { r2 } = ringRadii(n);
  const at = new Map(order.map((b, i) => [b, TOP + (i * 2 * Math.PI) / n]));
  const payoff = payoffAngles(m, (b) => at.get(b) ?? TOP, r2);
  const want = new Map<string, number>();
  for (const base of order) {
    let sx = 0, sy = 0, k = 0;
    for (const c of m.combos) {
      if (!c.uses.some((u) => u.card === base)) continue;
      for (const f of c.produces) {
        const a = payoff.get(f);
        if (a === undefined) continue;
        sx += Math.cos(a); sy += Math.sin(a); k++;
      }
    }
    want.set(base, k ? onRing(Math.atan2(sy, sx)) : at.get(base)!);
  }
  const was = new Map(order.map((b, i) => [b, i]));
  return [...order].sort((a, b) => want.get(a)! - want.get(b)! || was.get(a)! - was.get(b)!);
}

/**
 * A sorted ring still has to be cut somewhere, and the cut is a free choice: rotating the whole order
 * moves every piece to a different slot without changing who neighbours whom. All n cuts are priced
 * and the cheapest wins, ties going to the one that leaves the order alone.
 */
function rotateToFit(m: Model, order: string[]): string[] {
  let best = order, bestCost = ringCost(m, order);
  for (let k = 1; k < order.length; k++) {
    const cand = [...order.slice(k), ...order.slice(0, k)];
    const cost = ringCost(m, cand);
    if (cost < bestCost - 1e-6) { bestCost = cost; best = cand; }
  }
  return best;
}

/** Circular: legend hub in the middle, pieces on a ring, payoffs on an outer ring. */
export function layoutCircular(m: Model) {
  const pos = new Map<string, Placed>();
  const edges: Edge[] = [];
  const n = Math.max(1, m.cards.length);
  const { r1, r2 } = ringRadii(n);
  const size = 2 * (r2 + RESULT_W);
  const cx = size / 2, cy = size / 2;
  const angle = new Map<string, number>();
  ringOrder(m).forEach((base, i) => {
    const a = TOP + (i * 2 * Math.PI) / n;
    angle.set(base, a);
    const b = boxOf(m, base);
    pos.set(base, { id: base, x: cx + r1 * Math.cos(a) - b.w / 2, y: cy + r1 * Math.sin(a) - b.h / 2, w: b.w, h: b.h });
  });
  for (const [id, a] of payoffAngles(m, (b) => angle.get(b) ?? TOP, r2)) {
    pos.set(id, { id, x: cx + r2 * Math.cos(a) - RESULT_W / 2, y: cy + r2 * Math.sin(a) - RESULT_H / 2, w: RESULT_W, h: RESULT_H });
  }
  for (const c of m.combos) {
    for (const f of c.produces) if (m.outcomes.some((o) => o.id === f)) for (const u of c.uses) edges.push({ from: u.card, to: f, dashed: m.missing.has(u.card), comboId: c.id, kind: "card" });
  }
  return { pos, edges, width: size, height: size, labels: [] as { x: number; w: number; text: string }[], hub: { x: cx, y: cy } };
}

/** Orthogonal connector with rounded corners: leaves right, steps at the midpoint, arrives left. */
const stepPath = (p: { x: number; y: number }, q: { x: number; y: number }) => {
  if (Math.abs(p.y - q.y) < 1.5) return `M${p.x},${p.y} L${q.x},${q.y}`;
  const midX = (p.x + q.x) / 2;
  const dir = q.y > p.y ? 1 : -1;
  const r = Math.min(14, Math.abs(q.y - p.y) / 2, Math.abs(q.x - p.x) / 2);
  return `M${p.x},${p.y} H${midX - r} Q${midX},${p.y} ${midX},${p.y + dir * r} V${q.y - dir * r} Q${midX},${q.y} ${midX + r},${q.y} H${q.x}`;
};

/**
 * Connector between two boxes in the SAME column (a combo that needs another combo). Routing it
 * like a normal edge puts the vertical run straight through the boxes, because both endpoints
 * share an x. This one leaves the left face, runs down a gutter beside the lane, and comes back.
 */
const sidePath = (a: Placed, b: Placed, gutter: number) => {
  const p = { x: a.x, y: a.y + a.h / 2 }, q = { x: b.x, y: b.y + b.h / 2 };
  const x = a.x - gutter;
  const r = Math.min(12, Math.abs(q.y - p.y) / 2, gutter / 2);
  const dir = q.y > p.y ? 1 : -1;
  return `M${p.x},${p.y} H${x + r} Q${x},${p.y} ${x},${p.y + dir * r} V${q.y - dir * r} Q${x},${q.y} ${x + r},${q.y} H${q.x}`;
};

export function renderGraph(host: HTMLElement, hits: Hit[], layout: Layout, ctx: GraphContext, initialDim = true): GraphView {
  host.querySelector("svg")?.remove();
  const m = model(hits, ctx);
  const aspect = Math.max(0.4, host.clientWidth / Math.max(1, host.clientHeight));
  const L = layout === "layered" ? layoutLayered(m, aspect) : layoutCircular(m);

  const svg = el("svg", { xmlns: ns, role: "img", "aria-label": "Combo diagram" });
  const defs = el("defs");
  const clipP = el("clipPath", { id: "clipPortrait", clipPathUnits: "userSpaceOnUse" });
  clipP.append(el("rect", { x: 5, y: 5, width: IMG_W, height: IMG_H, rx: 6 }));
  const clipL = el("clipPath", { id: "clipLandscape", clipPathUnits: "userSpaceOnUse" });
  clipL.append(el("rect", { x: 5, y: 5, width: LAND_IMG_W, height: LAND_IMG_H, rx: 6 }));
  defs.append(clipP, clipL);
  const gEdges = el("g", { class: "edges" }), gNodes = el("g", { class: "nodes" }), gLabels = el("g", { class: "labels" });
  svg.append(defs, gLabels, gEdges, gNodes);
  svg.classList.toggle("dim-unrelated", initialDim);

  // Lane headings sit above each column with a rule under them, and they are CHROME: they name the
  // lane you are looking at, so they hold a constant SCREEN size while the content zooms, on every
  // stage. Each is a group scaled by the inverse of the current zoom, which makes one unit inside it
  // exactly one screen pixel — see `sizeHeads`.
  const heads = L.labels.map((lab) => {
    const g = el("g", { class: "lane-head", transform: `translate(${lab.x},-18)` });
    const text = el("text", { x: 0, y: 0, class: "lane-label" }, lab.text);
    const rule = el("line", { x1: 0, y1: 10, x2: lab.w, y2: 10, class: "lane-rule" });
    g.append(text, rule);
    gLabels.append(g);
    return { g, text, rule, lab };
  });

  if (L.hub) {
    const legend = ctx.legend ? ctx.card(ctx.legend) : undefined;
    const g = el("g", { class: "hub", transform: `translate(${L.hub.x},${L.hub.y})` });
    g.append(el("circle", { r: 88, class: "hub-ring" }));
    g.append(el("circle", { r: 66, class: "hub-disc" }));
    g.append(el("text", { y: -20, class: "hub-eyebrow", "text-anchor": "middle" }, legend ? short(legend.name.replace(/ - Starter$/, ""), 20) : "Legend"));
    g.append(el("text", { y: 18, class: "hub-count", "text-anchor": "middle" }, String(m.combos.length)));
    g.append(el("text", { y: 38, class: "hub-sub", "text-anchor": "middle" }, m.combos.length === 1 ? "combo" : "combos"));
    gNodes.append(g);
  }

  const anchor = (p: Placed, side: "out" | "in" | "center") =>
    side === "center" ? { x: p.x + p.w / 2, y: p.y + p.h / 2 } : { x: side === "out" ? p.x + p.w : p.x, y: p.y + p.h / 2 };
  const edgeEls: { e: Edge; path: SVGPathElement }[] = [];
  for (const e of L.edges) {
    const a = L.pos.get(e.from), b = L.pos.get(e.to);
    if (!a || !b) continue;
    const d = layout !== "layered"
      ? (() => { const p = anchor(a, "center"), q = anchor(b, "center"); return `M${p.x},${p.y} L${q.x},${q.y}`; })()
      : e.kind === "needs"
        ? sidePath(a, b, 40)
        : stepPath(anchor(a, "out"), anchor(b, "in"));
    const path = el("path", { d, class: `edge ${e.kind}${e.dashed ? " missing" : ""}`, stroke: e.dashed ? ACCENT : "#4d6d7c", "data-combo": e.comboId });
    gEdges.append(path);
    edgeEls.push({ e, path });
  }

  const nodeEls = new Map<string, SVGGElement>();
  const addNode = (id: string, cls: string, build: (g: SVGGElement, p: Placed) => void) => {
    const p = L.pos.get(id)!;
    const g = el("g", { class: `node ${cls}`, "data-id": id, transform: `translate(${p.x},${p.y})`, tabindex: 0 });
    build(g, p);
    gNodes.append(g);
    nodeEls.set(id, g);
  };

  for (const base of m.cards) {
    const card = ctx.card(base);
    const missing = m.missing.has(base);
    const land = m.land.has(base);
    const W = land ? LAND_W : CARD_W, H = land ? LAND_H : CARD_H;
    const iw = land ? LAND_IMG_W : IMG_W, ih = land ? LAND_IMG_H : IMG_H;
    addNode(base, `card${land ? " landscape" : ""}${missing ? " missing" : ""}${ctx.illegal(base) ? " illegal" : ""}`, (g) => {
      g.append(el("rect", { class: "frame", width: W, height: H, rx: 9 }));
      const src = thumb(card?.image, land ? 280 : 200);
      if (src) g.append(el("image", { href: src, x: 5, y: 5, width: iw, height: ih, "clip-path": `url(#${land ? "clipLandscape" : "clipPortrait"})`, preserveAspectRatio: "xMidYMid slice" }));
      else g.append(el("rect", { x: 5, y: 5, width: iw, height: ih, rx: 6, class: "no-art" }));
      // Plate sits inside the card's own width, so it can never reach a neighbour.
      const name = short(card?.name ?? base, land ? 22 : 16);
      g.append(el("rect", { class: "name-bg", x: 5, y: H - 27, width: iw, height: 22, rx: 5 }));
      g.append(el("text", { class: "name", x: W / 2, y: H - 11, "text-anchor": "middle" }, name));
      const have = Math.min(ctx.owned(base), m.need.get(base)!), need = m.need.get(base)!;
      if (need > 1 || missing) {
        g.append(el("rect", { class: "qty-bg", x: W - 40, y: 5, width: 35, height: 18, rx: 5 }));
        g.append(el("text", { class: "qty", x: W - 22.5, y: 18, "text-anchor": "middle" }, `${have}/${need}`));
      }
      g.append(el("title", {}, `${card?.name ?? base} (${base})${land ? " — battlefield" : ""}${missing ? " — missing" : ""}`));
    });
  }

  if (layout === "layered") {
    for (const c of m.combos) {
      const h = routeH(m, c.id);
      addNode(c.id, `route ${c.status}`, (g) => {
        g.append(el("rect", { class: "route-shell", width: ROUTE_W, height: h, rx: 10, stroke: "#3d6070" }));
        g.append(el("line", { class: "route-accent", x1: 1.5, y1: 12, x2: 1.5, y2: h - 12, stroke: ACCENT }));
        const thumbs = c.uses.slice(0, 4);
        const tw = 22, th = 30, gap = 5, total = thumbs.length * tw + (thumbs.length - 1) * gap;
        thumbs.forEach((u, i) => {
          const src = thumb(ctx.card(u.card)?.image, 80);
          const x = (ROUTE_W - total) / 2 + i * (tw + gap);
          g.append(el("rect", { x, y: 12, width: tw, height: th, rx: 3, class: "mini-frame" }));
          if (src) g.append(el("image", { href: src, x: x + 1, y: 13, width: tw - 2, height: th - 2, preserveAspectRatio: "xMidYMid slice" }));
        });
        const lines = m.lines.get(c.id)!;
        const t = el("text", { class: "route-label", x: ROUTE_W / 2, y: 62, "text-anchor": "middle" });
        lines.forEach((ln, i) => t.append(el("tspan", { x: ROUTE_W / 2, dy: i === 0 ? 0 : 17 }, ln)));
        g.append(t);
        g.append(el("text", { class: "route-class", x: ROUTE_W / 2, y: h - 12, "text-anchor": "middle" }, `${c.class.replace("_", " ")}${c.status === "verified" ? "" : " · " + c.status.toUpperCase()}`));
        g.append(el("title", {}, c.name));
      });
    }
  }

  for (const f of m.outcomes) {
    const routes = m.combos.filter((c) => c.produces.includes(f.id)).length;
    addNode(f.id, "result", (g) => {
      g.append(el("rect", { class: "result-shell", width: RESULT_W, height: RESULT_H, rx: 10, stroke: "#3d6070" }));
      const lines = wrap(f.name, 20, 2);
      const t = el("text", { class: "result-label", x: RESULT_W / 2, y: lines.length > 1 ? 30 : 38, "text-anchor": "middle" });
      lines.forEach((ln, i) => t.append(el("tspan", { x: RESULT_W / 2, dy: i === 0 ? 0 : 18 }, ln)));
      g.append(t);
      g.append(el("text", { class: "result-sub", x: RESULT_W / 2, y: RESULT_H - 14, "text-anchor": "middle" }, `${routes} ${routes === 1 ? "combo" : "combos"}`));
      // Every node is a tab stop, so every node needs a name: without this the outcome column is a row
      // of focusable boxes a screen reader announces as "group" and nothing else (#78).
      g.append(el("title", {}, `${f.name} — ${routes} ${routes === 1 ? "combo" : "combos"}`));
    });
  }

  // --- selection & highlighting -------------------------------------------------------
  const adj = new Map<string, Set<string>>();
  const link = (a: string, b: string) => { (adj.get(a) ?? adj.set(a, new Set()).get(a)!).add(b); };
  for (const e of L.edges) { link(e.from, e.to); link(e.to, e.from); }
  const routeNodes = (comboId: string) => {
    const c = ctx.combos.get(comboId)!;
    return new Set([comboId, ...c.uses.map((u) => u.card), ...c.produces.filter((f) => m.outcomes.some((o) => o.id === f))]);
  };
  let pinned: string | null = null;
  const clear = () => {
    for (const g of nodeEls.values()) g.classList.remove("hl", "dimmed", "selected");
    for (const { path } of edgeEls) path.classList.remove("hl", "dimmed", "selected");
    svg.classList.remove("has-selection");
  };
  const focusNode = (id: string) => {
    clear();
    svg.classList.add("has-selection");
    const near = adj.get(id) ?? new Set();
    for (const [nid, g] of nodeEls) g.classList.add(nid === id ? "selected" : near.has(nid) ? "hl" : "dimmed");
    for (const { e, path } of edgeEls) path.classList.add(e.from === id || e.to === id ? "hl" : "dimmed");
  };
  const focusRoute = (comboId: string) => {
    clear();
    svg.classList.add("has-selection");
    const set = routeNodes(comboId);
    for (const [nid, g] of nodeEls) g.classList.add(nid === comboId ? "selected" : set.has(nid) ? "hl" : "dimmed");
    for (const { e, path } of edgeEls) path.classList.add(e.comboId === comboId ? "selected" : "dimmed");
  };
  gNodes.addEventListener("mouseover", (ev) => {
    if (pinned) return;
    const g = (ev.target as Element).closest<SVGGElement>(".node");
    if (!g) return;
    g.classList.contains("route") ? focusRoute(g.dataset.id!) : focusNode(g.dataset.id!);
  });
  gNodes.addEventListener("mouseout", () => { if (!pinned) clear(); });
  const activate = (g: SVGGElement) => {
    const id = g.dataset.id!;
    if (g.classList.contains("route")) {
      pinned = pinned === id ? null : id;
      pinned ? focusRoute(pinned) : clear();
      ctx.onSelect(pinned);
    } else {
      const viaCombo = m.combos.find((c) => c.uses.some((u) => u.card === id) || c.produces.includes(id));
      pinned = pinned === id ? null : id;
      pinned ? focusNode(pinned) : clear();
      ctx.onSelect(pinned && viaCombo ? viaCombo.id : null);
    }
  };
  gNodes.addEventListener("click", (ev) => { const g = (ev.target as Element).closest<SVGGElement>(".node"); if (g) activate(g); });
  gNodes.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const g = (ev.target as Element).closest<SVGGElement>(".node"); if (g) { ev.preventDefault(); activate(g); }
  });
  svg.addEventListener("click", (ev) => { if (!(ev.target as Element).closest(".node") && pinned) { pinned = null; clear(); ctx.onSelect(null); } });

  // --- pan / zoom by viewBox ------------------------------------------------------------
  const pad = 64;
  const topPad = pad + (L.labels.length ? LANE_LABEL_H : 0);
  const content = { x: -pad, y: -topPad, w: L.width + 2 * pad, h: L.height + pad + topPad };
  let vb: Box = { ...content };
  /**
   * Hold the lane headings at a constant screen size. `k` is user units per screen pixel, the
   * inverse of the zoom, so inside a group scaled by it one unit IS one screen pixel and a 14-unit
   * font renders at 14px at every zoom level.
   *
   * The rule under a heading normally runs the width of its lane, but a label pinned at 14px can
   * end up wider than the lane it names on a narrow stage, and a rule shorter than its own label
   * reads as a mistake rather than as a choice — so it is drawn to whichever is wider. On a desktop
   * stage that branch never fires. `getComputedTextLength` is the browser's own measurement of the
   * rendered text; where there is no layout engine to ask, the lane stands.
   *
   * A stage with no box has no scale, so this leaves the headings as they were rather than sizing
   * them against a number it invented — the same contract as `fitBox` (#57).
   */
  const sizeHeads = () => {
    if (!(host.clientWidth > 0)) return;
    const k = vb.w / host.clientWidth;
    for (const h of heads) {
      h.g.setAttribute("transform", `translate(${h.lab.x},-18) scale(${k})`);
      const textW = (h.text as SVGTextElement).getComputedTextLength?.() ?? 0;
      h.rule.setAttribute("x2", String(Math.max(h.lab.w / k, textW)));
    }
  };
  const apply = () => {
    svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    sizeHeads();
    if (host.clientWidth > 0) ctx.onZoom(Math.round((host.clientWidth / vb.w) * 100));
  };
  /** Take a computed box, or report that there was no stage to measure it against. */
  const show = (b: Box | null) => { if (!b) return false; vb = b; apply(); return true; };
  const fit = () => show(fitBox(content, host.clientWidth, host.clientHeight));
  const actualSize = () => show(actualBox(content, host.clientWidth, host.clientHeight, L.hub ? "centre" : "start"));
  const zoomAt = (k: number, mx: number, my: number) => { vb = { x: mx - (mx - vb.x) * k, y: my - (my - vb.y) * k, w: vb.w * k, h: vb.h * k }; apply(); };
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  // The whole content, before anything is measured: a diagram built off-screen still carries a viewBox
  // that makes sense, rather than none.
  apply();
  // Desktop opens at 1:1 like the reference. A phone-width stage at 1:1 shows one third of one
  // lane with no overview, so there the whole diagram comes first and pinch-zoom does the rest.
  if (host.clientWidth < 640) fit(); else actualSize();
  svg.addEventListener("wheel", (ev) => {
    ev.preventDefault();
    const r = svg.getBoundingClientRect();
    zoomAt(ev.deltaY > 0 ? 1.12 : 1 / 1.12, vb.x + ((ev.clientX - r.left) / r.width) * vb.w, vb.y + ((ev.clientY - r.top) / r.height) * vb.h);
  }, { passive: false });
  let drag: { x: number; y: number; vx: number; vy: number } | null = null;
  svg.addEventListener("pointerdown", (ev) => {
    if ((ev.target as Element).closest(".node")) return;
    drag = { x: ev.clientX, y: ev.clientY, vx: vb.x, vy: vb.y };
    svg.classList.add("dragging");
    svg.setPointerCapture(ev.pointerId);
  });
  svg.addEventListener("pointermove", (ev) => {
    if (!drag) return;
    const r = svg.getBoundingClientRect();
    vb.x = drag.vx - ((ev.clientX - drag.x) / r.width) * vb.w;
    vb.y = drag.vy - ((ev.clientY - drag.y) / r.height) * vb.h;
    apply();
  });
  const endDrag = () => { drag = null; svg.classList.remove("dragging"); };
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  host.append(svg);
  return {
    fit,
    zoomBy: (k) => zoomAt(k, vb.x + vb.w / 2, vb.y + vb.h / 2),
    select: (id) => { pinned = id; if (!id) { clear(); return; } if (nodeEls.get(id)?.classList.contains("route")) focusRoute(id); else if (m.combos.some((c) => c.id === id)) { const set = routeNodes(id); clear(); svg.classList.add("has-selection"); for (const [nid, g] of nodeEls) g.classList.add(set.has(nid) ? "hl" : "dimmed"); for (const { e, path } of edgeEls) path.classList.add(e.comboId === id ? "selected" : "dimmed"); } },
    setDim: (on) => svg.classList.toggle("dim-unrelated", on),
    destroy: () => svg.remove(),
  };
}
