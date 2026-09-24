// @vitest-environment happy-dom
//
// D4 of the 2026-09-20 review. The two functions with a testable contract are the two that decide
// whether a downloaded file is worth anything:
//
//   `stripArt`  — the PNG path's whole safety argument. `cmsassets.rgpub.io` sends no
//                 `access-control-allow-origin` (measured 2026-09-20, re-measured 2026-09-21 with an
//                 explicit Origin header), so one surviving `<image>` taints the canvas and `toBlob`
//                 throws. "No `<image>` survives" is therefore a correctness assertion, not tidiness.
//   `serialize` — an SVG opened outside this page has no stylesheet, so every rule it needs has to
//                 be inside the file. A file that serialises cleanly and renders as unstyled black
//                 shapes is the failure this pins.
//
// The raster itself needs a canvas, which happy-dom has not got; it is checked by hand in a real
// browser and written into the review's verification section.
import { describe, expect, it } from "vitest";
import { graphCss, serialize, stripArt } from "../../web/export.js";

const NS = "http://www.w3.org/2000/svg";

/** A diagram in miniature: a framed card node with art, a plate, and a route node with a thumb. */
function fixture(): SVGSVGElement {
  const svg = document.createElementNS(NS, "svg") as SVGSVGElement;
  svg.setAttribute("viewBox", "0 0 400 300");
  svg.classList.add("dim-unrelated", "has-selection");
  svg.innerHTML = `
    <g class="node card hl">
      <rect class="frame" width="96" height="134" rx="9"></rect>
      <image href="https://cmsassets.rgpub.io/a.png?w=200" x="5" y="5" width="86" height="118"></image>
      <rect class="name-bg" x="5" y="107" width="86" height="22" rx="5"></rect>
      <text class="name" x="48" y="123">Forge of the Future</text>
    </g>
    <g class="node route dimmed">
      <rect class="route-shell" width="180" height="90" rx="10"></rect>
      <image href="https://cmsassets.rgpub.io/b.png?w=80" x="10" y="13" width="20" height="28"></image>
      <text class="route-label" x="90" y="62">lux-infinite-energy</text>
    </g>`;
  document.body.append(svg);
  return svg;
}

describe("stripArt (the PNG path's safety argument)", () => {
  it("leaves no <image> at all, which is the whole reason the canvas is clean", () => {
    const svg = fixture();
    expect(svg.querySelectorAll("image").length).toBe(2);       // the control: there was art to strip
    expect(stripArt(svg).querySelectorAll("image").length).toBe(0);
  });

  it("replaces a card's art with the no-art plate the site already draws, at the same geometry", () => {
    const rects = [...stripArt(fixture()).querySelectorAll(".node.card rect.no-art")];
    expect(rects.length).toBe(1);
    expect(rects[0]!.getAttribute("width")).toBe("86");
    expect(rects[0]!.getAttribute("height")).toBe("118");
    expect(rects[0]!.getAttribute("x")).toBe("5");
  });

  it("drops a route thumbnail rather than plating it, since .no-art is unstyled there (it drew black)", () => {
    const out = stripArt(fixture());
    expect(out.querySelectorAll(".node.route rect.no-art").length).toBe(0);
    expect(out.querySelectorAll(".node.route image").length).toBe(0);
  });

  it("keeps the name plate, which is what the reader is left reading", () => {
    const out = stripArt(fixture());
    expect(out.querySelector(".name")!.textContent).toBe("Forge of the Future");
    expect(out.querySelector(".route-label")!.textContent).toBe("lux-infinite-energy");
  });

  it("does not touch the diagram on screen", () => {
    const svg = fixture();
    stripArt(svg);
    expect(svg.querySelectorAll("image").length).toBe(2);
  });
});

describe("serialize (a file that is readable away from this page)", () => {
  it("carries the rules inside the document, since there is no stylesheet out there", () => {
    const out = serialize(fixture(), ".name { fill: #f9eedc }");
    expect(out).toContain("<style");
    expect(out).toContain(".name { fill: #f9eedc }");
  });

  it("declares the SVG namespace and a real size, so a viewer knows what it is opening", () => {
    // A negative origin is the normal case: the layout pads above and to the left of node 0,0, and
    // a file that clipped that away would cut the lane headings off.
    const out = serialize(fixture(), "", { x: -40, y: -60, w: 1200, h: 800 });
    expect(out).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(out).toContain('width="1200"');
    expect(out).toContain('height="800"');
    expect(out).toContain('viewBox="-40 -60 1200 800"');
    expect(out.startsWith("<?xml")).toBe(true);
  });

  it("exports the whole diagram, not the reader's selection", () => {
    // The fixture is built mid-interaction on purpose: one node highlighted, one faded.
    const out = serialize(fixture(), "");
    expect(out).not.toContain("dimmed");
    expect(out).not.toContain("has-selection");
    // Inert today (every rule reading it also needs `has-selection`), but it is page state too, and a
    // future rule keyed on it alone would fade the whole file (post-commit review of 4c6def1).
    expect(out).not.toContain("dim-unrelated");
    expect(/class="[^"]*\bhl\b[^"]*"/.test(out)).toBe(false);
    // The control: the nodes those classes were on are still in the file, so this is a class being
    // stripped rather than half the diagram going missing.
    expect(out).toContain("Forge of the Future");
    expect(out).toContain("lux-infinite-energy");
  });

  /**
   * Measured 2026-09-21: a standalone SVG opens on the viewer's own background, which is white
   * everywhere, and the lane headings are `--muted` — about 2.3:1 there against 7.0 on the stage.
   * The first render of this export was unreadable for exactly that reason.
   */
  it("paints its own ground, because a file has no page behind it", () => {
    const out = serialize(fixture(), "", { x: -40, y: -60, w: 1200, h: 800 }, "#0c161a");
    expect(out).toContain('fill="#0c161a"');
    expect(out).toMatch(/<rect[^>]*x="-40"[^>]*y="-60"[^>]*width="1200"[^>]*height="800"/);
    // Under everything, or it would paint over the diagram it is the ground for.
    expect(out.indexOf('fill="#0c161a"')).toBeLessThan(out.indexOf("Forge of the Future"));
  });

  it("leaves the live diagram alone", () => {
    const svg = fixture();
    serialize(svg, "x {}");
    expect(svg.querySelector("style")).toBeNull();
    expect(svg.classList.contains("has-selection")).toBe(true);
  });
});

describe("graphCss (what goes into that <style>)", () => {
  it("keeps the tokens, which every var() in the diagram resolves against", () => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(":root { --text: #f9eedc } .name { fill: var(--text) } .nothing-here { fill: red }");
    const css = graphCss([sheet], fixture());
    expect(css).toContain("--text");
    expect(css).toContain(".name");
  });

  it("drops rules that match nothing in this diagram, so the file is the diagram's own CSS", () => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(".name { fill: red } .pool-cell { color: blue }");
    const css = graphCss([sheet], fixture());
    expect(css).toContain(".name");
    expect(css).not.toContain(".pool-cell");
  });

  it("survives a stylesheet it is not allowed to read, rather than taking the export down", () => {
    const blocked = { get cssRules(): CSSRuleList { throw new Error("cross-origin"); } } as CSSStyleSheet;
    const ok = new CSSStyleSheet();
    ok.replaceSync(".name { fill: red }");
    expect(graphCss([blocked, ok], fixture())).toContain(".name");
  });
});
