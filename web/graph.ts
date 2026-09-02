// Hand-rolled SVG combo graph, modelled on LOOPLINE's route map: card-art nodes with name
// plates, route boxes coloured by outcome, and a selection model that dims everything
// unrelated. Two layouts: "layered" (Cards used → Combo routes → Results) and "circular"
// (legend hub, cards on a ring, results on an outer ring). No library, closed-form geometry.
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

export const OUTCOME_PALETTE = ["#ff4f8b", "#ffb65c", "#ad7cff", "#5ec9ff", "#ff786f", "#60e4bd"];

const CARD_W = 76, CARD_H = 106, IMG_W = 68, IMG_H = 95;
const ROUTE_W = 118, ROUTE_H = 82;
const RESULT_W = 128, RESULT_H = 64;

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
  color: Map<string, string>;          // outcome id -> colour
  routeColor: Map<string, string>;     // combo id -> colour
  missing: Set<string>;                // card bases the deck lacks (for any shown combo)
  need: Map<string, number>;
}

function model(hits: Hit[], ctx: GraphContext): Model {
  const comboIds = [...new Set(hits.flatMap((h) => h.variant.comboIds))].filter((id) => ctx.combos.has(id));
  const combos = comboIds.map((id) => ctx.combos.get(id)!);
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, ALT_WIN: 2, ENGINE: 3 };
  combos.sort((a, b) => Number(b.status === "verified") - Number(a.status === "verified") || order[a.class]! - order[b.class]! || a.name.localeCompare(b.name));
  const outcomeIds = [...new Set(combos.flatMap((c) => c.produces))].filter((f) => ctx.features.get(f)?.status === "STANDALONE");
  const outcomes = outcomeIds.map((f) => ctx.features.get(f)!);
  const color = new Map(outcomes.map((f, i) => [f.id, OUTCOME_PALETTE[i % OUTCOME_PALETTE.length]!]));
  const routeColor = new Map(combos.map((c) => [c.id, color.get(c.produces.find((p) => color.has(p)) ?? "") ?? "#8b93a4"]));
  const need = new Map<string, number>();
  for (const c of combos) for (const u of c.uses) need.set(u.card, Math.max(need.get(u.card) ?? 0, u.quantity));
  const cards = [...need.keys()];
  const missing = new Set(cards.filter((b) => ctx.owned(b) < need.get(b)!));
  return { combos, cards, outcomes, color, routeColor, missing, need };
}

interface Placed { id: string; x: number; y: number; w: number; h: number }
interface Edge { from: string; to: string; color: string; dashed: boolean; comboId: string; kind: "card" | "result" | "needs" }

const meanY = (ids: string[], pos: Map<string, Placed>) => {
  const ys = ids.map((i) => pos.get(i)?.y).filter((y): y is number => y !== undefined);
  return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : 1e9;
};

/** Layered: three columns. Cards zigzag over up to three sub-columns so a 12-card deck stays compact. */
function layoutLayered(m: Model) {
  const pos = new Map<string, Placed>();
  const edges: Edge[] = [];
  const combosY = new Map<string, number>();
  m.combos.forEach((c, i) => combosY.set(c.id, i * (ROUTE_H + 22)));
  const byCombo = (base: string) => m.combos.filter((c) => c.uses.some((u) => u.card === base)).map((c) => c.id);
  const cards = [...m.cards].sort((a, b) => {
    const ya = byCombo(a).map((id) => combosY.get(id)!), yb = byCombo(b).map((id) => combosY.get(id)!);
    return (ya.reduce((s, v) => s + v, 0) / (ya.length || 1)) - (yb.reduce((s, v) => s + v, 0) / (yb.length || 1));
  });
  const k = Math.min(3, Math.max(1, Math.ceil(cards.length / 5)));
  const step = (CARD_H + 44) / k;
  cards.forEach((base, i) => pos.set(base, { id: base, x: (i % k) * (CARD_W + 28), y: i * step, w: CARD_W, h: CARD_H }));
  const cardsW = k * (CARD_W + 28) - 28;
  const routeX = cardsW + 170;
  m.combos.forEach((c) => pos.set(c.id, { id: c.id, x: routeX, y: combosY.get(c.id)!, w: ROUTE_W, h: ROUTE_H }));
  const resultX = routeX + ROUTE_W + 210;
  const outcomes = [...m.outcomes].sort((a, b) => meanY(m.combos.filter((c) => c.produces.includes(a.id)).map((c) => c.id), pos) - meanY(m.combos.filter((c) => c.produces.includes(b.id)).map((c) => c.id), pos));
  outcomes.forEach((f, i) => pos.set(f.id, { id: f.id, x: resultX, y: i * (RESULT_H + 26), w: RESULT_W, h: RESULT_H }));

  // Vertically centre the three lanes against each other.
  const laneH = (ids: string[]) => ids.length ? Math.max(...ids.map((i) => pos.get(i)!.y + pos.get(i)!.h)) : 0;
  const H = Math.max(laneH(cards), laneH(m.combos.map((c) => c.id)), laneH(outcomes.map((o) => o.id)));
  for (const ids of [cards, m.combos.map((c) => c.id), outcomes.map((o) => o.id)]) {
    const off = (H - laneH(ids)) / 2;
    for (const id of ids) pos.get(id)!.y += off;
  }
  for (const c of m.combos) {
    const color = m.routeColor.get(c.id)!;
    for (const u of c.uses) edges.push({ from: u.card, to: c.id, color, dashed: m.missing.has(u.card), comboId: c.id, kind: "card" });
    for (const f of c.produces) if (m.color.has(f)) edges.push({ from: c.id, to: f, color, dashed: false, comboId: c.id, kind: "result" });
    for (const need of c.needs) for (const p of m.combos) if (p.id !== c.id && p.produces.includes(need)) edges.push({ from: p.id, to: c.id, color: "#8b93a4", dashed: true, comboId: c.id, kind: "needs" });
  }
  const labels = [
    { x: 0, text: "Cards used" }, { x: routeX, text: "Combo routes" }, { x: resultX, text: "Results" },
  ];
  return { pos, edges, width: resultX + RESULT_W, height: H, labels, hub: null as null | { x: number; y: number } };
}

/** Circular: legend hub in the middle, cards on a ring, results on an outer ring, edges card → result. */
function layoutCircular(m: Model) {
  const pos = new Map<string, Placed>();
  const edges: Edge[] = [];
  const n = Math.max(1, m.cards.length);
  const r1 = Math.max(230, (n * (CARD_W + 34)) / (2 * Math.PI));
  const r2 = r1 + 200;
  const size = 2 * (r2 + RESULT_W);
  const cx = size / 2, cy = size / 2;
  const angle = new Map<string, number>();
  m.cards.forEach((base, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    angle.set(base, a);
    pos.set(base, { id: base, x: cx + r1 * Math.cos(a) - CARD_W / 2, y: cy + r1 * Math.sin(a) - CARD_H / 2, w: CARD_W, h: CARD_H });
  });
  const outcomeAngle = m.outcomes.map((f) => {
    const cards = m.combos.filter((c) => c.produces.includes(f.id)).flatMap((c) => c.uses.map((u) => u.card));
    const sx = cards.reduce((s, b) => s + Math.cos(angle.get(b) ?? 0), 0), sy = cards.reduce((s, b) => s + Math.sin(angle.get(b) ?? 0), 0);
    return { f, a: cards.length ? Math.atan2(sy, sx) : 0 };
  }).sort((p, q) => p.a - q.a);
  // Enforce a minimum angular gap so result boxes never overlap.
  const minGap = (RESULT_H + 30) / r2;
  for (let i = 1; i < outcomeAngle.length; i++) if (outcomeAngle[i]!.a - outcomeAngle[i - 1]!.a < minGap) outcomeAngle[i]!.a = outcomeAngle[i - 1]!.a + minGap;
  for (const { f, a } of outcomeAngle) pos.set(f.id, { id: f.id, x: cx + r2 * Math.cos(a) - RESULT_W / 2, y: cy + r2 * Math.sin(a) - RESULT_H / 2, w: RESULT_W, h: RESULT_H });
  for (const c of m.combos) {
    const color = m.routeColor.get(c.id)!;
    for (const f of c.produces) if (m.color.has(f)) for (const u of c.uses) edges.push({ from: u.card, to: f, color, dashed: m.missing.has(u.card), comboId: c.id, kind: "card" });
  }
  return { pos, edges, width: size, height: size, labels: [] as { x: number; text: string }[], hub: { x: cx, y: cy } };
}

export function renderGraph(host: HTMLElement, hits: Hit[], layout: Layout, ctx: GraphContext, initialDim = true): GraphView {
  host.querySelector("svg")?.remove();
  const m = model(hits, ctx);
  const L = layout === "layered" ? layoutLayered(m) : layoutCircular(m);

  const svg = el("svg", { xmlns: ns, role: "img", "aria-label": "Combo route map" });
  const defs = el("defs");
  const clip = el("clipPath", { id: "cardClip", clipPathUnits: "userSpaceOnUse" });
  clip.append(el("rect", { x: 4, y: 4, width: IMG_W, height: IMG_H, rx: 5 }));
  defs.append(clip);
  const gEdges = el("g", { class: "edges" }), gNodes = el("g", { class: "nodes" }), gLabels = el("g", { class: "labels" });
  svg.append(defs, gLabels, gEdges, gNodes);
  svg.classList.toggle("dim-unrelated", initialDim);

  // Column labels + faint guides (layered only).
  for (const lab of L.labels) {
    gLabels.append(el("text", { x: lab.x, y: -22, class: "layer-column-label" }, lab.text.toUpperCase()));
    gLabels.append(el("line", { x1: lab.x - 24, y1: -8, x2: lab.x - 24, y2: L.height + 8, class: "layer-guide" }));
  }

  // Hub (circular only).
  if (L.hub) {
    const legend = ctx.legend ? ctx.card(ctx.legend) : undefined;
    const g = el("g", { class: "hub", transform: `translate(${L.hub.x},${L.hub.y})` });
    g.append(el("circle", { r: 84, class: "hub-ring" }));
    g.append(el("circle", { r: 68, class: "hub-disc" }));
    g.append(el("text", { y: -22, class: "hub-eyebrow", "text-anchor": "middle" }, legend ? short(legend.name.replace(/ - Starter$/, ""), 20).toUpperCase() : "LEGEND"));
    g.append(el("text", { y: 16, class: "hub-count", "text-anchor": "middle" }, String(m.combos.length)));
    g.append(el("text", { y: 36, class: "hub-sub", "text-anchor": "middle" }, m.combos.length === 1 ? "route" : "routes"));
    gNodes.append(g);
  }

  const anchor = (p: Placed, side: "out" | "in" | "center") =>
    side === "center" ? { x: p.x + p.w / 2, y: p.y + p.h / 2 } : { x: side === "out" ? p.x + p.w : p.x, y: p.y + p.h / 2 };
  const edgeEls: { e: Edge; path: SVGPathElement }[] = [];
  for (const e of L.edges) {
    const a = L.pos.get(e.from), b = L.pos.get(e.to);
    if (!a || !b) continue;
    let d: string;
    if (layout === "layered") {
      const p = anchor(a, "out"), q = anchor(b, "in");
      d = `M${p.x},${p.y} C${(p.x + q.x) / 2},${p.y} ${(p.x + q.x) / 2},${q.y} ${q.x},${q.y}`;
    } else {
      const p = anchor(a, "center"), q = anchor(b, "center");
      d = `M${p.x},${p.y} L${q.x},${q.y}`;
    }
    const path = el("path", { d, class: `edge ${e.kind}${e.dashed ? " missing" : ""}`, stroke: e.color, "data-from": e.from, "data-to": e.to, "data-combo": e.comboId });
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
    addNode(base, `card${missing ? " missing" : ""}${ctx.illegal(base) ? " illegal" : ""}`, (g) => {
      g.append(el("rect", { class: "frame", width: CARD_W, height: CARD_H, rx: 8 }));
      const src = thumb(card?.image, 160);
      if (src) g.append(el("image", { href: src, x: 4, y: 4, width: IMG_W, height: IMG_H, "clip-path": "url(#cardClip)", preserveAspectRatio: "xMidYMid slice" }));
      else g.append(el("rect", { x: 4, y: 4, width: IMG_W, height: IMG_H, rx: 5, class: "no-art" }));
      const name = short(card?.name ?? base, 17);
      const plateW = Math.min(CARD_W + 22, Math.max(60, name.length * 6.2 + 16));
      g.append(el("rect", { class: "name-bg", x: (CARD_W - plateW) / 2, y: CARD_H - 13, width: plateW, height: 18, rx: 9 }));
      g.append(el("text", { class: "name", x: CARD_W / 2, y: CARD_H, "text-anchor": "middle" }, name));
      const have = Math.min(ctx.owned(base), m.need.get(base)!), need = m.need.get(base)!;
      if (need > 1 || missing) {
        g.append(el("rect", { class: "qty-bg", x: CARD_W - 30, y: -6, width: 30, height: 14, rx: 7 }));
        g.append(el("text", { class: "qty", x: CARD_W - 15, y: 5, "text-anchor": "middle" }, `${have}/${need}`));
      }
      g.append(el("title", {}, `${card?.name ?? base} (${base})${missing ? " — missing" : ""}`));
    });
  }

  if (layout === "layered") {
    for (const c of m.combos) {
      addNode(c.id, `route ${c.status}`, (g) => {
        g.append(el("rect", { class: "route-shell", width: ROUTE_W, height: ROUTE_H, rx: 10, stroke: m.routeColor.get(c.id)! }));
        const thumbs = c.uses.slice(0, 3);
        const tw = 20, th = 28, gap = 4, total = thumbs.length * tw + (thumbs.length - 1) * gap;
        thumbs.forEach((u, i) => {
          const src = thumb(ctx.card(u.card)?.image, 80);
          const x = (ROUTE_W - total) / 2 + i * (tw + gap);
          g.append(el("rect", { x, y: 8, width: tw, height: th, rx: 2, class: "mini-frame" }));
          if (src) g.append(el("image", { href: src, x: x + 1, y: 9, width: tw - 2, height: th - 2, preserveAspectRatio: "xMidYMid slice" }));
        });
        const lines = wrap(c.name.replace(/\s[—–-]\s.*$/, ""), 18, 2);
        const t = el("text", { class: "route-label", x: ROUTE_W / 2, y: 50, "text-anchor": "middle" });
        lines.forEach((ln, i) => t.append(el("tspan", { x: ROUTE_W / 2, dy: i === 0 ? 0 : 12 }, ln)));
        g.append(t);
        g.append(el("text", { class: "route-index", x: ROUTE_W / 2, y: ROUTE_H - 8, "text-anchor": "middle", fill: m.routeColor.get(c.id)! }, `${c.class.replace("_", " ")}${c.status === "verified" ? "" : " · " + c.status.toUpperCase()}`));
        g.append(el("title", {}, c.name));
      });
    }
  }

  for (const f of m.outcomes) {
    const routes = m.combos.filter((c) => c.produces.includes(f.id)).length;
    addNode(f.id, "result", (g) => {
      g.append(el("rect", { class: "result-shell", width: RESULT_W, height: RESULT_H, rx: 10, stroke: m.color.get(f.id)! }));
      const lines = wrap(f.name, 18, 2);
      const t = el("text", { class: "result-label", x: RESULT_W / 2, y: lines.length > 1 ? 24 : 30, "text-anchor": "middle" });
      lines.forEach((ln, i) => t.append(el("tspan", { x: RESULT_W / 2, dy: i === 0 ? 0 : 13 }, ln)));
      g.append(t);
      g.append(el("text", { class: "result-sub", x: RESULT_W / 2, y: RESULT_H - 12, "text-anchor": "middle" }, `${routes} ${routes === 1 ? "route" : "routes"}`));
    });
  }

  // --- selection & highlighting -------------------------------------------------------
  const adj = new Map<string, Set<string>>();
  const link = (a: string, b: string) => { (adj.get(a) ?? adj.set(a, new Set()).get(a)!).add(b); };
  for (const e of L.edges) { link(e.from, e.to); link(e.to, e.from); }
  const routeNodes = (comboId: string) => {
    const c = ctx.combos.get(comboId)!;
    return new Set([comboId, ...c.uses.map((u) => u.card), ...c.produces.filter((f) => m.color.has(f))]);
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
      // A card or result pins itself; the first route through it opens in the drawer.
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
  const pad = 56;
  const content = { x: -pad, y: -pad - (L.labels.length ? 20 : 0), w: L.width + 2 * pad, h: L.height + 2 * pad + (L.labels.length ? 20 : 0) };
  let vb = { ...content };
  const apply = () => {
    svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    ctx.onZoom(Math.round((host.clientWidth / vb.w) * 100));
  };
  const fit = () => {
    const ar = host.clientWidth / Math.max(1, host.clientHeight);
    let w = content.w, h = content.h;
    if (w / h < ar) w = h * ar; else h = w / ar;
    vb = { x: content.x + (content.w - w) / 2, y: content.y + (content.h - h) / 2, w, h };
    apply();
  };
  const zoomAt = (k: number, mx: number, my: number) => { vb = { x: mx - (mx - vb.x) * k, y: my - (my - vb.y) * k, w: vb.w * k, h: vb.h * k }; apply(); };
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  fit();
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
