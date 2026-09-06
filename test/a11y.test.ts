import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * What the keyboard and the screen reader are owed, pinned here because none of it shows up as an
 * error in a browser: the page looks right while the focus is behind an overlay, while a tab says
 * nothing about being the current one, and while a result is written into an element nobody is told
 * about. Every number below was measured against https://riftcombo.app before it was written down
 * (issues #75-#84); this file is what keeps it measured.
 */
const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const css = read("web/styles.css");
const home = read("web/index.html");

// --- contrast (#81) ---------------------------------------------------------------------
const token = (name: string): string => {
  const m = new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i").exec(css);
  expect(m, `--${name} is not a plain hex in :root any more`).not.toBeNull();
  return m![1]!;
};
const channel = (c: number): number => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16) / 255)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string): number => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

describe("the palette against the backgrounds it is actually drawn on", () => {
  /**
   * The three grounds text sits on in this app: the page, the cards and rows that stand on it, and
   * the highlighted tray chip. `--panel-3` is left out on purpose — no text token is drawn on it,
   * and asking for AA there would cost the whole third tier of the grey scale for nothing.
   */
  const grounds = ["bg", "panel", "panel-2"] as const;

  it("keeps every text token at AA (4.5:1) wherever it lands", () => {
    for (const fg of ["text", "muted", "faint"]) {
      for (const bg of grounds) {
        const r = contrast(token(fg), token(bg));
        expect(r, `--${fg} on --${bg} is ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("keeps the accent readable as text and as a button face", () => {
    expect(contrast(token("accent"), token("bg"))).toBeGreaterThanOrEqual(4.5);
    // .primary is accent-ink on accent, which is the one pair where both halves are the brand's.
    expect(contrast(token("accent-ink"), token("accent"))).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps --faint a visible step below --muted, which is the only reason it exists", () => {
    expect(luminance(token("faint"))).toBeLessThan(luminance(token("muted")));
  });

  /**
   * The line under the Illegal badge in My decks (#93) is a sentence a player reads, so it is bound by
   * the rule above and not by the colour of the badge beside it. --danger measures 3.98:1 on --panel,
   * which is where .deck-card stands, so reaching for the obvious red would have been the first tint
   * added since #81 that fails AA. This pins the choice rather than the hex: whatever token that line
   * ends up using has to clear 4.5:1 on the card it is drawn on.
   */
  it("draws the reason under the Illegal badge in a token that clears AA on --panel", () => {
    const rule = css.split("\n").find((l) => l.trim().startsWith(".deck-card-why {"));
    expect(rule, ".deck-card-why is gone — did the reason line move?").toBeDefined();
    const used = /color:\s*var\(--([a-z0-9-]+)\)/.exec(rule!)?.[1];
    expect(used, `.deck-card-why must colour itself from a token, got: ${rule}`).toBeDefined();
    const r = contrast(token(used!), token("panel"));
    expect(r, `--${used} on --panel is ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
  });
});

// --- focus (#82) ------------------------------------------------------------------------
describe("the focus ring", () => {
  it("is declared once, globally, in the site's own accent", () => {
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--accent\)/);
  });

  it("is switched off only where something else draws it", () => {
    // `outline: none` with no replacement is how a control ends up with no focus state at all. The
    // two survivors both hand the job to another element: the segmented control paints its label,
    // the diagram node strokes its own frame.
    const allowed = [".segmented input:focus-visible", ".node:focus"];
    for (const rule of css.matchAll(/([^{}]*)\{([^}]*outline:\s*none[^}]*)\}/g)) {
      const selector = (rule[1] ?? "").trim();
      expect(allowed.some((a) => selector.startsWith(a)), `${selector} kills the focus ring`).toBe(true);
    }
  });
});

// --- names, landmarks and live regions (#78, #79, #80, #83) -----------------------------
describe("what a screen reader is told", () => {
  it("announces the status card, which is the only report a match produces", () => {
    expect(home).toMatch(/id="status-card"[^>]*aria-live="polite"/);
    // Title and body change together and read as one sentence.
    expect(home).toMatch(/id="status-card"[^>]*aria-atomic="true"/);
  });

  it("gives every kind of diagram node a name", () => {
    const graph = read("web/graph.ts");
    // Each node is a tab stop (`tabindex: 0`), so each has to carry a <title>. The outcome column
    // shipped without one and announced itself as seven anonymous groups.
    const nodes = [...graph.matchAll(/\baddNode\(/g)].length;
    const titles = [...graph.matchAll(/el\("title"/g)].length;
    expect(nodes, "web/graph.ts stopped building nodes the way this test reads it").toBeGreaterThan(0);
    expect(titles, `${nodes} kinds of node, ${titles} <title>`).toBe(nodes);
  });

  it("says which tab is the current one, and names the view in the browser tab", () => {
    const router = read("web/router.ts");
    expect(router).toContain('aria-current", "page"');
    expect(router).toContain("removeAttribute(\"aria-current\")");
    expect(router).toContain("document.title = TITLES[r.view]");
    for (const view of ["combos", "decks", "guide", "sources"]) expect(router).toMatch(new RegExp(`\\b${view}:\\s*"`));
  });

  it("gives each view a main landmark and exactly one h1", () => {
    for (const view of ["combos", "decks", "guide", "sources"]) {
      const start = home.indexOf(`id="view-${view}"`);
      expect(start, view).toBeGreaterThan(-1);
      const end = home.indexOf(`id="view-`, start + 1);
      const section = home.slice(start, end === -1 ? home.indexOf("</body>") : end);
      expect(section, `view-${view} has no <main>`).toMatch(/<main[\s>]/);
      // My decks writes its own heading from web/decks.ts, so its container is the exception.
      if (view !== "decks") expect((section.match(/<h1[\s>]/g) ?? []).length, `view-${view} h1`).toBe(1);
    }
  });

  it("starts the legal pages at h1 as well", () => {
    for (const f of ["privacy.html", "terms.html", "404.html"]) {
      const page = read(`web/${f}`);
      expect(page, f).toMatch(/<main class="doc"/);
      expect((page.match(/<h1[\s>]/g) ?? []).length, f).toBe(1);
    }
  });

  it("carries one navigation across the whole site, pointing at the four views", () => {
    for (const f of ["privacy.html", "terms.html", "404.html"]) {
      const nav = /<nav class="topnav">([\s\S]*?)<\/nav>/.exec(read(`web/${f}`))?.[1] ?? "";
      expect(nav, `${f} has no top nav`).not.toBe("");
      for (const href of ["/#/combos", "/#/decks"]) expect(nav, `${f} → ${href}`).toContain(`href="${href}"`);
    }
  });
});

// --- the overlays (#75, #76) ------------------------------------------------------------
describe("the two overlays and the keyboard", () => {
  const main = read("web/main.ts");

  it("holds the focus inside the card, which aria-modal promises and the browser does not", () => {
    expect(home).toContain('aria-modal="true"');
    expect(main).toContain("previewBox.contains(document.activeElement)");
    expect(main).toMatch(/ev\.key !== "Tab"/);
  });

  it("lets Escape reach the drawer once the card above it is gone", () => {
    const handler = /document\.addEventListener\("keydown"[\s\S]*?\n\}\);/.exec(main)?.[0] ?? "";
    expect(handler).toContain("hideCard()");
    expect(handler).toContain("closeDetail()");
    // The card is the top layer: one Escape closes it and leaves the drawer it was opened from.
    expect(handler.indexOf("hideCard()")).toBeLessThan(handler.indexOf("closeDetail()"));
  });

  it("gives the card back the focus that opened it", () => {
    expect(main).toContain("previewReturnFocus?.focus()");
  });
});
