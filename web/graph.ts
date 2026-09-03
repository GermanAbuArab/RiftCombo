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
//  - The initial view is 1:1 and centred. Fitting everything into view is what the fit button is
//    for; it never magnifies past 100%.
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
  fit: () => void;
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
const CARD_GAP_X = 26, CARD_GAP_Y = 34;   // gap_y > 0 guarantees plates never reach the next row
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

interface Model {
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
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, ALT_WIN: 2, ENGINE: 3 };
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

/** Circular: legend hub in the middle, pieces on a ring, payoffs on an outer ring. */
function layoutCircular(m: Model) {
  const pos = new Map<string, Placed>();
  const edges: Edge[] = [];
  const n = Math.max(1, m.cards.length);
  const r1 = Math.max(260, (n * (CELL_W + 40)) / (2 * Math.PI));
  const r2 = r1 + 230;
  const size = 2 * (r2 + RESULT_W);
  const cx = size / 2, cy = size / 2;
  const angle = new Map<string, number>();
  m.cards.forEach((base, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    angle.set(base, a);
    const b = boxOf(m, base);
    pos.set(base, { id: base, x: cx + r1 * Math.cos(a) - b.w / 2, y: cy + r1 * Math.sin(a) - b.h / 2, w: b.w, h: b.h });
  });
  const outcomeAngle = m.outcomes.map((f) => {
    const cards = m.combos.filter((c) => c.produces.includes(f.id)).flatMap((c) => c.uses.map((u) => u.card));
    const sx = cards.reduce((s, b) => s + Math.cos(angle.get(b) ?? 0), 0), sy = cards.reduce((s, b) => s + Math.sin(angle.get(b) ?? 0), 0);
    return { f, a: cards.length ? Math.atan2(sy, sx) : 0 };
  }).sort((p, q) => p.a - q.a);
  const minGap = (RESULT_H + 34) / r2;
  for (let i = 1; i < outcomeAngle.length; i++) if (outcomeAngle[i]!.a - outcomeAngle[i - 1]!.a < minGap) outcomeAngle[i]!.a = outcomeAngle[i - 1]!.a + minGap;
  for (const { f, a } of outcomeAngle) pos.set(f.id, { id: f.id, x: cx + r2 * Math.cos(a) - RESULT_W / 2, y: cy + r2 * Math.sin(a) - RESULT_H / 2, w: RESULT_W, h: RESULT_H });
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

  // Lane headings sit above each column with a rule under them.
  for (const lab of L.labels) {
    gLabels.append(el("text", { x: lab.x, y: -18, class: "lane-label" }, lab.text));
    gLabels.append(el("line", { x1: lab.x, y1: -8, x2: lab.x + lab.w, y2: -8, class: "lane-rule" }));
  }

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
  let vb = { ...content };
  const apply = () => {
    svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    ctx.onZoom(Math.round((host.clientWidth / vb.w) * 100));
  };
  /** Show everything, but never magnify past 1:1 — a two-node diagram blown up looks broken. */
  const fit = () => {
    const cw = host.clientWidth, ch = Math.max(1, host.clientHeight);
    const scale = Math.min(1, cw / content.w, ch / content.h);
    const w = cw / scale, h = ch / scale;
    vb = { x: content.x + (content.w - w) / 2, y: content.y + (content.h - h) / 2, w, h };
    apply();
  };
  /** 1:1, centred on the content. Clipping is fine — the fit button is right there. */
  const actualSize = () => {
    const w = host.clientWidth, h = Math.max(1, host.clientHeight);
    vb = { x: content.x + (content.w - w) / 2, y: content.y + (content.h - h) / 2, w, h };
    apply();
  };
  const zoomAt = (k: number, mx: number, my: number) => { vb = { x: mx - (mx - vb.x) * k, y: my - (my - vb.y) * k, w: vb.w * k, h: vb.h * k }; apply(); };
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  actualSize();
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
