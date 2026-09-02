// Hand-rolled layered graph: Cards → Combos → Outcomes. Static SVG, closed-form layout, no library.
import type { Hit } from "../src/matcher.js";
import type { Combo, Feature } from "../src/types.js";

export interface GraphContext {
  combos: Map<string, Combo>;
  features: Map<string, Feature>;
  cardName: (base: string) => string;
  owned: (base: string) => number;
  illegal: (base: string) => boolean;
  onSelectCombo: (id: string | null) => void;
}

interface Node { id: string; kind: "card" | "combo" | "outcome"; label: string; sub: string; x: number; y: number; w: number; h: number; classes: string[]; qty?: string }
interface Edge { from: string; to: string; classes: string[] }

const NODE_H = 42;
const GAP = 12;
const LANE_GAP = 120;
const W = { card: 200, combo: 232, outcome: 176 };

const ns = "http://www.w3.org/2000/svg";
const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, text?: string) => {
  const e = document.createElementNS(ns, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  if (text !== undefined) e.textContent = text;
  return e;
};
const ellipsize = (s: string, max: number) => (s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s);

/** Mean of connected node y's, used to sort a lane so edges cross as little as possible for free. */
const meanY = (ids: string[], pos: Map<string, number>) => {
  const ys = ids.map((i) => pos.get(i)).filter((y): y is number => y !== undefined);
  return ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : Number.MAX_SAFE_INTEGER;
};

export function buildGraph(hits: Hit[], ctx: GraphContext): { nodes: Node[]; edges: Edge[]; width: number; height: number } {
  const comboIds = [...new Set(hits.flatMap((h) => h.variant.comboIds))].filter((id) => ctx.combos.has(id));
  const combos = comboIds.map((id) => ctx.combos.get(id)!);
  const cardIds = [...new Set(combos.flatMap((c) => c.uses.map((u) => u.card)))];
  const outcomeIds = [...new Set(combos.flatMap((c) => c.produces))].filter((f) => ctx.features.has(f));
  const missingCards = new Set(hits.flatMap((h) => h.missing.map((m) => m.card)));

  const edges: Edge[] = [];
  for (const c of combos) {
    for (const u of c.uses) edges.push({ from: u.card, to: c.id, classes: [ctx.owned(u.card) >= u.quantity ? "" : "missing"] });
    for (const f of c.produces) if (ctx.features.has(f)) edges.push({ from: c.id, to: f, classes: [] });
    for (const need of c.needs) {
      for (const p of combos) if (p.id !== c.id && p.produces.includes(need)) edges.push({ from: p.id, to: c.id, classes: ["needs"] });
    }
  }
  const neighbours = (id: string) => edges.filter((e) => e.from === id || e.to === id).map((e) => (e.from === id ? e.to : e.from));

  // Combos: verified first, then by class, then name. Everything else sorts by its neighbours' mean y.
  const order: Record<string, number> = { INFINITE: 0, BURST: 1, ALT_WIN: 2, ENGINE: 3 };
  combos.sort((a, b) => Number(b.status === "verified") - Number(a.status === "verified") || order[a.class]! - order[b.class]! || a.name.localeCompare(b.name));
  const comboY = new Map(combos.map((c, i) => [c.id, i * (NODE_H + GAP)]));
  const cardsSorted = [...cardIds].sort((a, b) => meanY(neighbours(a), comboY) - meanY(neighbours(b), comboY) || ctx.cardName(a).localeCompare(ctx.cardName(b)));
  const outcomesSorted = [...outcomeIds].sort((a, b) => meanY(neighbours(a), comboY) - meanY(neighbours(b), comboY));

  const laneX = [0, W.card + LANE_GAP, W.card + LANE_GAP + W.combo + LANE_GAP];
  const laneHeight = (n: number) => n * NODE_H + Math.max(0, n - 1) * GAP;
  const height = Math.max(laneHeight(cardsSorted.length), laneHeight(combos.length), laneHeight(outcomesSorted.length), NODE_H);
  const offset = (n: number) => (height - laneHeight(n)) / 2;

  const nodes: Node[] = [];
  cardsSorted.forEach((base, i) => {
    const need = Math.max(...combos.flatMap((c) => c.uses.filter((u) => u.card === base).map((u) => u.quantity)));
    const have = ctx.owned(base);
    nodes.push({
      id: base, kind: "card", label: ellipsize(ctx.cardName(base), 26), sub: base,
      x: laneX[0]!, y: offset(cardsSorted.length) + i * (NODE_H + GAP), w: W.card, h: NODE_H,
      classes: [missingCards.has(base) || have < need ? "missing" : "", ctx.illegal(base) ? "illegal" : ""],
      qty: `${Math.min(have, need)}/${need}`,
    });
  });
  combos.forEach((c, i) => {
    nodes.push({
      id: c.id, kind: "combo", label: ellipsize(c.name, 30), sub: `${c.class.replace("_", " ")}${c.status === "verified" ? "" : " · " + c.status}`,
      x: laneX[1]!, y: offset(combos.length) + i * (NODE_H + GAP), w: W.combo, h: NODE_H, classes: [c.status],
    });
  });
  outcomesSorted.forEach((f, i) => {
    const feat = ctx.features.get(f)!;
    nodes.push({
      id: f, kind: "outcome", label: ellipsize(feat.name, 24), sub: feat.status === "STANDALONE" ? "outcome" : "helper",
      x: laneX[2]!, y: offset(outcomesSorted.length) + i * (NODE_H + GAP), w: W.outcome, h: NODE_H,
      classes: [feat.status === "STANDALONE" ? "" : "helper"],
    });
  });

  return { nodes, edges, width: laneX[2]! + W.outcome, height };
}

export interface GraphView { fit: () => void; select: (comboId: string | null) => void; destroy: () => void }

export function renderGraph(host: HTMLElement, hits: Hit[], ctx: GraphContext): GraphView {
  host.querySelector("svg")?.remove();
  const { nodes, edges, width, height } = buildGraph(hits, ctx);
  // One layout at every width: on phones the graph fits small and is pinch-zoomed / dragged;
  // rotating labels to "transpose" the lanes made long combo names unreadable.

  const svg = el("svg", { xmlns: ns, role: "img", "aria-label": "Combo graph" });
  const gEdges = el("g", { class: "edges" });
  const gNodes = el("g", { class: "nodes" });
  svg.append(gEdges, gNodes);

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const edgeEls: { e: Edge; path: SVGPathElement }[] = [];
  for (const e of edges) {
    const a = byId.get(e.from), b = byId.get(e.to);
    if (!a || !b) continue;
    const p = { x: a.x + a.w, y: a.y + a.h / 2 }, q = { x: b.x, y: b.y + b.h / 2 };
    const d = `M${p.x},${p.y} C${(p.x + q.x) / 2},${p.y} ${(p.x + q.x) / 2},${q.y} ${q.x},${q.y}`;
    const path = el("path", { d, class: ["edge", ...e.classes].filter(Boolean).join(" "), "data-from": e.from, "data-to": e.to });
    gEdges.append(path);
    edgeEls.push({ e, path });
  }

  const nodeEls = new Map<string, SVGGElement>();
  for (const n of nodes) {
    const g = el("g", { class: ["node", n.kind, ...n.classes].filter(Boolean).join(" "), "data-id": n.id, transform: `translate(${n.x},${n.y})`, tabindex: n.kind === "combo" ? 0 : -1 });
    g.append(el("rect", { width: n.w, height: n.h }));
    g.append(el("text", { x: 10, y: 17, class: "name" }, n.label));
    g.append(el("text", { x: 10, y: 32, class: "sub" }, n.sub));
    if (n.qty) g.append(el("text", { x: n.w - 10, y: 17, class: "qty", "text-anchor": "end" }, n.qty));
    g.append(el("title", {}, n.kind === "card" ? `${ctx.cardName(n.id)} (${n.id})` : n.label));
    gNodes.append(g);
    nodeEls.set(n.id, g);
  }

  // Highlighting: hover shows a node's neighbourhood; click on a combo pins it.
  const adj = new Map<string, Set<string>>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, new Set());
    if (!adj.has(e.to)) adj.set(e.to, new Set());
    adj.get(e.from)!.add(e.to);
    adj.get(e.to)!.add(e.from);
  }
  let pinned: string | null = null;
  const focus = (id: string | null) => {
    for (const g of nodeEls.values()) g.classList.remove("hl", "dim", "active");
    for (const { path } of edgeEls) path.classList.remove("hl", "dim");
    if (!id) return;
    const near = adj.get(id) ?? new Set();
    for (const [nid, g] of nodeEls) {
      if (nid === id) g.classList.add("active");
      else if (near.has(nid)) g.classList.add("hl");
      else g.classList.add("dim");
    }
    for (const { e, path } of edgeEls) path.classList.add(e.from === id || e.to === id ? "hl" : "dim");
  };
  gNodes.addEventListener("mouseover", (ev) => {
    const g = (ev.target as Element).closest<SVGGElement>(".node");
    if (g && !pinned) focus(g.dataset.id!);
  });
  gNodes.addEventListener("mouseout", () => { if (!pinned) focus(null); });
  const activate = (g: SVGGElement) => {
    const id = g.dataset.id!;
    if (g.classList.contains("combo")) {
      pinned = pinned === id ? null : id;
      focus(pinned);
      ctx.onSelectCombo(pinned);
    }
  };
  gNodes.addEventListener("click", (ev) => { const g = (ev.target as Element).closest<SVGGElement>(".node"); if (g) activate(g); });
  gNodes.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const g = (ev.target as Element).closest<SVGGElement>(".node");
    if (g) { ev.preventDefault(); activate(g); }
  });

  // Pan / zoom by viewBox.
  const pad = 32;
  const content = { w: width, h: height };
  let vb = { x: -pad, y: -pad, w: content.w + 2 * pad, h: content.h + 2 * pad };
  const apply = () => svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const fit = () => {
    const ar = host.clientWidth / Math.max(1, host.clientHeight);
    let w = content.w + 2 * pad, h = content.h + 2 * pad;
    if (w / h < ar) w = h * ar; else h = w / ar;
    vb = { x: (content.w - w) / 2, y: (content.h - h) / 2, w, h };
    apply();
  };
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  fit();
  svg.addEventListener("wheel", (ev) => {
    ev.preventDefault();
    const k = ev.deltaY > 0 ? 1.12 : 1 / 1.12;
    const r = svg.getBoundingClientRect();
    const mx = vb.x + ((ev.clientX - r.left) / r.width) * vb.w;
    const my = vb.y + ((ev.clientY - r.top) / r.height) * vb.h;
    vb = { x: mx - (mx - vb.x) * k, y: my - (my - vb.y) * k, w: vb.w * k, h: vb.h * k };
    apply();
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
    select: (id) => { pinned = id; focus(id); },
    destroy: () => svg.remove(),
  };
}
