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
    // --ok is in here for the same reason --danger-text is (#96): it colours letters, not just the
    // status dot and the left rule of "Already in this list" — the Legal badge on a deck card, the
    // editor's verdict, and the PASS on each construction rule. Unlike the red it needed no split,
    // it was already clear on all three; this is what keeps that true.
    for (const fg of ["text", "muted", "faint", "danger-text", "ok"]) {
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
  /**
   * Red is semantic here, not decorative, and it comes in two tokens on purpose (#94): --danger is
   * the border and the background (the error dot, the ban row's left rule), --danger-text is the one
   * that carries letters. --danger itself measures 4.43 / 3.98 / 3.37 on --bg / --panel / --panel-2,
   * so every red word in the app was under AA — .ban-tag worst of all at 10.5px on --panel. These
   * two pin the split: the tag names itself, and nothing anywhere may paint text with --danger.
   */
  it("draws the BANNED tag in a token that clears AA on the row it sits on", () => {
    const rule = css.split("\n").find((l) => l.trim().startsWith(".ban-tag {"));
    expect(rule, ".ban-tag is gone — did the ban list change shape?").toBeDefined();
    const used = /(?<![-a-z])color:\s*var\(--([a-z0-9-]+)\)/.exec(rule!)?.[1];
    expect(used, `.ban-tag must colour itself from a token, got: ${rule}`).toBeDefined();
    // .ban-row is background: var(--panel); the same tag also rides the cards, which stand on it too.
    const r = contrast(token(used!), token("panel"));
    expect(r, `--${used} on --panel is ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps --danger off text entirely, borders and fills only", () => {
    const offenders = [...css.matchAll(/(?<![-a-z])color:\s*var\(--danger\)/g)].map(
      (m) => css.slice(css.lastIndexOf("\n", m.index!) + 1, css.indexOf("\n", m.index!)).trim(),
    );
    expect(offenders, "--danger is a border/background token; text takes --danger-text").toEqual([]);
  });

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

// --- the deckbuilder (#101) -------------------------------------------------------------
/**
 * The builder is 1030 buttons and two counters that change under the player's hands, so the three
 * things it can silently get wrong are all here: a colour that carries meaning alone, a live region
 * that is destroyed by the very update it announces, and a focus that falls off the page on a click.
 */
describe("the deckbuilder", () => {
  const builder = read("web/builder.ts");

  it("draws the cost curve in a tint that clears 3:1 on the panel it stands on", () => {
    // A curve is data. --line-2 was tried first and measures 2.32:1 on --panel, under the ratio
    // WCAG asks of a meaningful graphic; whatever token .curve-bar ends up using has to clear it.
    const rule = css.split("\n").find((l) => l.trim().startsWith(".curve-bar {"));
    expect(rule, ".curve-bar is gone — did the curve change shape?").toBeDefined();
    const used = /fill:\s*var\(--([a-z0-9-]+)\)/.exec(rule!)?.[1];
    expect(used, `.curve-bar must fill from a token, got: ${rule}`).toBeDefined();
    expect(contrast(token(used!), token("panel"))).toBeGreaterThanOrEqual(3);
  });

  it("keeps the accent readable as text on a panel, which is where the Champion tag sits", () => {
    expect(contrast(token("accent"), token("panel"))).toBeGreaterThanOrEqual(4.5);
  });

  /**
   * A live region has to survive the update it announces. Both of these were written INSIDE the
   * container that is replaced on every click, which destroys and rebuilds the element and announces
   * nothing at all; they are now siblings of it, updated through textContent.
   */
  it("keeps the two counters out of the containers that are rebuilt", () => {
    for (const id of ["pool-count", "bld-totals"]) {
      expect(builder, `#${id} is not a live region`).toContain(`id="${id}" aria-live="polite"`);
      expect(builder, `#${id} is rebuilt rather than updated`).toMatch(new RegExp(`#${id}"\\);\\n\\s*if \\(\\w+\\) \\w+\\.textContent`));
    }
    // The two containers that ARE replaced wholesale must not be the ones carrying the counters.
    expect(builder).toContain('innerHTML = gridHtml()');
    expect(builder).toContain('innerHTML = deckHtml()');
    expect(builder).not.toMatch(/aria-live[^>]*>\$\{[^}]*gridHtml/);
  });

  it("puts the focus back on the control the click destroyed", () => {
    // Clicking a pool cell replaces the grid, and with it the button that was pressed. Without this
    // a keyboard lands on BODY after every single card added.
    expect(builder).toContain("document.activeElement as HTMLElement | null");
    expect(builder).toMatch(/if \(was\) \$<HTMLElement>\(was\)\?\.focus\(\)/);
  });

  it("walks the grid with the arrow keys instead of 1030 tab stops", () => {
    expect(builder).toContain('ev.key.startsWith("Arrow")');
    for (const k of ["ArrowRight", "ArrowLeft", "ArrowDown"]) expect(builder, k).toContain(k);
  });

  /**
   * A cell at its cap stays focusable and says why — `disabled` would take it out of the tab order
   * and leave a screen reader with no reason at all. The same attribute is what the click handler
   * reads, so the two can never disagree.
   */
  it("marks a capped or off-domain cell aria-disabled, with the reason in its name", () => {
    expect(builder).toContain('aria-disabled="${blocked}"');
    expect(builder).toContain('aria-label="${esc(label)}"');
    expect(builder).toContain('el.getAttribute("aria-disabled") === "true"');
    expect(builder).not.toMatch(/class="pool-add"[^`]*\bdisabled\b(?!=)/);
  });

  it("gives a Construction mark a word beside it, since ✓ and ✗ are a shape and a colour", () => {
    expect(builder).toContain('<span class="chk-mark" aria-hidden="true">');
    expect(builder).toContain('<span class="sr-only">${WORD[r.status]}</span>');
    expect(css).toMatch(/\.sr-only \{[^}]*clip-path/);
  });

  it("names the domain behind each coloured chip", () => {
    // Six circles differing only in hue say nothing to a screen reader, and nothing to anyone who
    // cannot tell Fury from Body — and a name that is only ever read aloud leaves everybody else
    // guessing too, which is what #109 was opened for. The name is visible text on the chip now.
    expect(builder).toContain('<span class="dom-dot" aria-hidden="true"></span>${name}');
    expect(builder).toContain('aria-pressed="${filters.domains.includes(d)}"');
    // Filled means selected, a ring means not: the state is a shape as well as a colour.
    expect(css).toMatch(/\.dom-dot \{[^}]*border: [\d.]+px solid var\(--dom\)/);
    expect(css).toMatch(/\.dom-chip\.on \.dom-dot \{[^}]*background: var\(--dom\)/);
  });

  /**
   * The filter bar carried four control heights in four rows (#109): the Zone segmented at 30.75px,
   * the selects at 29, the Cost chips at 24 and the domain circles at 22, in two type families. One
   * token holds the height now, and every control in the bar is measured against it.
   */
  it("gives every control in the filter bar one height and one type family", () => {
    expect(css).toMatch(/\.bld-filters \{ --ctl: \d+px;/);
    for (const sel of [".bld-filters .segmented span", ".dom-chip", ".bld-clear", ".bld-select"]) {
      const rule = css.split("\n").find((l) => l.trim().startsWith(`${sel} {`));
      expect(rule, `${sel} is not in the filter bar's one height`).toMatch(/height: (calc\()?var\(--ctl\)/);
    }
    // The Cost row was the one control set in the mono face; it is a segmented control now.
    expect(css).not.toContain(".cost-chip");
    expect(builder).toContain('class="segmented small bld-costs"');
  });
});
