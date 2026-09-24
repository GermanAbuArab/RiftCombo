/**
 * Downloading the diagram (deferred item D4 of the 2026-09-20 review; `docs/plan.md` Phase 3 asked
 * for "PNG export" in 2026-09-02 and nothing had been built).
 *
 * SVG IS THE PRIMARY EXPORT AND PNG IS THE COMPROMISE, and that ordering is a measurement rather
 * than a preference. Measured 2026-09-20 and again on 2026-09-21 with an explicit `Origin` header:
 * `cmsassets.rgpub.io`, which serves every card image the diagram draws, answers with NO
 * `access-control-allow-origin`. So a canvas that has drawn one of those images is tainted and
 * `toBlob` throws a SecurityError — there is no flag, no `crossOrigin` attribute and no proxy short
 * of routing every image through our own Edge function that changes it. An SVG has no such problem:
 * it keeps the external `href`s and a viewer resolves them itself.
 *
 * Hence two buttons rather than one:
 *   - Download SVG — the diagram exactly as drawn, art included, vector, opens with the art live.
 *   - Download PNG — rendered from a copy with every `<image>` replaced by the same "no art" plate
 *     a card with no image already draws, so the canvas never holds a cross-origin pixel.
 *
 * Neither writes any style into the page: an SVG document's own `<style>` element is part of the
 * document, not an inline `style=` attribute, so the CSP's `style-src` is not involved.
 */

// `Box` is the graph's own rectangle type. The one this module wants is the box the WHOLE diagram
// occupies in its own coordinates, padding included — NOT the viewBox on screen, which is wherever
// the reader has panned and zoomed to, and a file cropped to that would be a photograph of their
// scroll position. `GraphView.exportable()` hands over the right one.
import type { Box } from "./graph.js";

/** The stage's own colour, when no token answers — the value `--stage-bg` holds. */
const FALLBACK_BG = "#0c161a";

/**
 * The ground the exported picture is painted on. A token when there is one, the stage's literal
 * colour when the caller has no document to ask (a test, a worker).
 */
export function stageBg(doc: Document = document): string {
  return getComputedStyle(doc.documentElement).getPropertyValue("--stage-bg").trim() || FALLBACK_BG;
}

/** Everything a standalone copy of this SVG needs in order to look like the one on screen. */
export function graphCss(sheets: Iterable<CSSStyleSheet>, svg: SVGSVGElement): string {
  const out: string[] = [];
  for (const sheet of sheets) {
    let rules: CSSRuleList;
    // A stylesheet from another origin (the web font) throws on `.cssRules`; skip it rather than
    // letting one third-party link take the whole export down.
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      const sel = (rule as CSSStyleRule).selectorText;
      if (!sel) continue;
      // The custom properties themselves: every `var()` below resolves against this one block, and
      // it matches no element in the fragment, so it has to be named rather than discovered.
      if (sel === ":root" || sel === "html, body" || sel === "html") { out.push(rule.cssText); continue; }
      // Everything else earns its place by applying to something actually in this diagram. That is
      // the whole filter, and it is why the export cannot go stale against the stylesheet: a rule
      // added for a new node kind is picked up because the node is there, and a rule for a state the
      // file can never be in (`:hover`, `:focus-visible`) is dropped because nothing matches it.
      try { if (svg.querySelector(sel)) out.push(rule.cssText); } catch { /* a selector this DOM cannot parse */ }
    }
  }
  return out.join("\n");
}

/**
 * The diagram as a standalone SVG document. `width`/`height` come off the CONTENT box rather than
 * the viewBox on screen, so the file is the whole diagram at its natural size and not a photograph
 * of however far the reader had panned.
 */
export function serialize(svg: SVGSVGElement, css: string, box?: Box, bg: string = FALLBACK_BG): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const x = Math.round(box?.x ?? svg.viewBox.baseVal.x ?? 0);
  const y = Math.round(box?.y ?? svg.viewBox.baseVal.y ?? 0);
  const w = Math.round(box?.w ?? svg.viewBox.baseVal.width ?? 0);
  const h = Math.round(box?.h ?? svg.viewBox.baseVal.height ?? 0);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  clone.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));
  // Interaction classes are state of the page, not of the picture: a file exported while one route
  // was selected would arrive with three quarters of itself faded out.
  clone.classList.remove("dragging", "has-selection");
  for (const n of clone.querySelectorAll(".dimmed, .hl, .selected")) n.classList.remove("dimmed", "hl", "selected");
  const NS = "http://www.w3.org/2000/svg";
  // The picture is designed on a dark ground and carries no page with it. Measured 2026-09-21: a
  // standalone SVG opens on the viewer's own background, which is white in every browser, and the
  // lane headings are `--muted` — about 2.3:1 there, against 7.0 on the stage. So the ground travels
  // with the file, painted rather than left to the viewer, which is also why `rasterise` fills the
  // canvas before it draws.
  const ground = clone.ownerDocument.createElementNS(NS, "rect");
  ground.setAttribute("x", String(x));
  ground.setAttribute("y", String(y));
  ground.setAttribute("width", String(w));
  ground.setAttribute("height", String(h));
  ground.setAttribute("fill", bg);
  clone.insertBefore(ground, clone.firstChild);
  const style = clone.ownerDocument.createElementNS(NS, "style");
  style.textContent = `\n${css}\n`;
  clone.insertBefore(style, clone.firstChild);
  const body = new XMLSerializer().serializeToString(clone);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${body}`;
}

/**
 * The same diagram with no cross-origin pixel in it. Each `<image>` becomes the `no-art` rect the
 * node already draws for a card the gallery has no picture of, at the same geometry — so the result
 * is a layout the site itself produces rather than a hole where the art was. The name plate and the
 * quantity badge are drawn after the image in `web/graph.ts` and are untouched.
 */
export function stripArt(svg: SVGSVGElement): SVGSVGElement {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const NS = "http://www.w3.org/2000/svg";
  for (const img of [...clone.querySelectorAll("image")]) {
    const rect = clone.ownerDocument.createElementNS(NS, "rect");
    for (const a of ["x", "y", "width", "height"]) {
      const v = img.getAttribute(a);
      if (v !== null) rect.setAttribute(a, v);
    }
    rect.setAttribute("rx", "6");
    rect.setAttribute("class", "no-art");
    img.replaceWith(rect);
  }
  return clone;
}

/** Hand a blob to the browser's own download path. */
export function download(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  // Not revoked synchronously: Safari has not started the download when `click()` returns.
  setTimeout(() => { URL.revokeObjectURL(url); }, 10_000);
}

/**
 * Rasterise an SVG STRING. The string must already be art-free — see `stripArt` and the CORS
 * measurement above — because an `<img>` that has loaded a cross-origin bitmap taints the canvas and
 * `toBlob` throws rather than returning a smaller picture.
 *
 * A `data:` URL is same-origin, so the SVG itself never taints anything. Fonts are the one honest
 * loss: an SVG rendered inside an `<img>` does not fetch external resources, so the web font falls
 * back to whatever the system has for the stack in `--font`.
 */
export async function rasterise(svgText: string, w: number, h: number, scale = 2): Promise<Blob> {
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => { resolve(); };
    img.onerror = () => { reject(new Error("the diagram could not be rendered")); };
    img.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("this browser has no 2D canvas");
  // The stage is dark and a PNG has no page behind it, so the file would otherwise arrive as light
  // text on transparency — unreadable in every viewer that composites onto white.
  ctx.fillStyle = stageBg();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => { b ? resolve(b) : reject(new Error("the diagram could not be encoded")); }, "image/png");
  });
}
