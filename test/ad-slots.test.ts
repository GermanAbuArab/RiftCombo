// #292 (#272 §6): the reserved ad slots, checked on the pages `renderSite` returns, which is the call
// `scripts/build-web.mjs` writes to public/, with a fake publisher id and with none. The whole corpus
// (some 1800 pages) is scanned as strings, which a parse of every page does not fit in a worker's memory
// for; one combo page and one play are also read through a parser, for the claims about the tree.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Window } from "happy-dom";
import { describe, expect, it } from "vitest";
import { AD_LABEL, adSlot } from "../src/render/ad.js";
import { isAdPath } from "../src/render/ad-loader.js";
import { comboSections, type ComboContext, comboPage } from "../src/render/combo.js";
import { withAdsenseAccount, withPrivacyChoices } from "../src/render/layout.js";
import { playArticle, type Play } from "../src/render/play.js";
import { renderSite, type SiteInput } from "../src/render/site.js";
import type { Combo } from "../src/types.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs.
import { slimCard } from "../scripts/web-card-fields.mjs";
// @ts-expect-error same.
import { loadPlays } from "../scripts/web-plays.mjs";
// @ts-expect-error same.
import { stripInternalDeep } from "../scripts/web-combo-prose.mjs";
// @ts-expect-error same.
import { AD_STYLES, appShell, withoutAdStyles } from "../scripts/web-seo.mjs";

const root = new URL("..", import.meta.url).pathname;
const data = (f: string) => stripInternalDeep(JSON.parse(readFileSync(join(root, "data", f), "utf8")));
const cardsFile = JSON.parse(readFileSync(join(root, "data", "cards.json"), "utf8")) as { resultsUpdatedAt: string; cards: object[] };
const combos = (data("combos.json") as { combos: Combo[] }).combos;
const plays = (loadPlays(root) as Play[]).map((p) => ({ ...p, file: `docs/plays/${p.slug}.md` }));
const input: SiteInput = {
  combos,
  cards: cardsFile.cards.map(slimCard),
  legality: (data("legality.json") as { entries: SiteInput["legality"] }).entries,
  features: (data("features.json") as { features: SiteInput["features"] }).features,
  plays,
  resultsUpdatedAt: cardsFile.resultsUpdatedAt,
};
const FAKE = "pub-0000000000000000";
const lit = renderSite({ ...input, adsensePublisherId: FAKE });
const dark = [...renderSite(input), ...renderSite({ ...input, adsensePublisherId: "" })];

/**
 * The whole corpus (about 900 pages per id) is checked on strings: parsing every page into a DOM ran
 * the worker out of memory. A string check is sound here because `renderDocument` writes exactly one
 * `<main class="doc …">` and every slot is `adSlot`'s fixed markup. A parser then checks the tree on
 * one page of each kind.
 */
const SLOT = /class="ad-slot ad-slot-(in-content|end)"/g;
const IN_CONTENT = `<aside class="ad" aria-label="Advertisement"><p class="ad-label">Advertisement</p><div class="ad-slot ad-slot-in-content">`;
const END = `<aside class="ad" aria-label="Advertisement"><p class="ad-label">Advertisement</p><div class="ad-slot ad-slot-end">`;
const kinds = (html: string) => [...html.matchAll(SLOT)].map((m) => m[1]);
/** The inside of the page's one `<main class="doc …">`. */
function mainOf(html: string): string {
  const open = html.indexOf('<main class="doc');
  expect(open).toBeGreaterThan(-1);
  expect(html.indexOf("<main", open + 1)).toBe(-1);
  const start = html.indexOf(">", open) + 1;
  return html.slice(start, html.indexOf("</main>", start));
}
const at = (path: string) => lit.find((p) => p.path === path)!;

const parser = new new Window().DOMParser();
const doc = (html: string) => parser.parseFromString(html, "text/html");

/** The hand-written pages and the shell as build:web writes them with an id set (the privacy link on /privacy and /terms only). */
const handWritten = () => [
  ["/app", appShell(readFileSync(join(root, "web", "index.html"), "utf8")) as string],
  ...["privacy", "terms", "404"].map((f) => [`/${f}`, readFileSync(join(root, "web", `${f}.html`), "utf8")]),
].map(([path, html]) => {
  const tagged = withAdsenseAccount(html!, FAKE);
  return [path!, path === "/privacy" || path === "/terms" ? withPrivacyChoices(tagged, FAKE) : tagged] as const;
});

describe("the ad slots with a publisher id (#292)", () => {
  it("sit inside main.doc, at most two per page, and on the ad surface only", () => {
    let total = 0;
    for (const p of lit) {
      const all = kinds(p.html);
      total += all.length;
      expect(all.length, p.path).toBeLessThanOrEqual(2);
      if (!isAdPath(p.path)) expect(all.length, p.path).toBe(0);
      expect(kinds(mainOf(p.html)), p.path).toEqual(all);
    }
    expect(total).toBeGreaterThan(lit.length);
  });

  it("are on none of /, /combos, /plays, /sources, /about, /privacy, /terms, 404 or the app shell", () => {
    for (const path of ["/", "/combos", "/plays", "/sources", "/about"]) {
      expect(at(path), path).toBeDefined();
      expect(at(path).html, path).not.toContain("ad-slot");
    }
    for (const [path, html] of handWritten()) expect(html, path).not.toContain("ad-slot");
  });

  it("put a combo page's in-content slot right after the steps list and its end slot last in main", () => {
    for (const c of combos) {
      const main = mainOf(at(`/combos/${c.id}`).html);
      expect(kinds(main), c.id).toEqual(["in-content", "end"]);
      const steps = main.indexOf("<h2>Steps</h2><ol>");
      expect(steps, c.id).toBeGreaterThan(-1);
      expect(main.indexOf(`</ol>${IN_CONTENT}`, steps), c.id).toBe(main.indexOf("</ol>", steps));
      expect(main.trimEnd().endsWith(`${END}<ins class="adsbygoogle" data-ad-client="ca-${FAKE}"></ins></div></aside>`), c.id).toBe(true);
    }
    const main = doc(at(`/combos/${combos[0]!.id}`).html).querySelector("main.doc")!;
    const [inContent, end] = [...main.querySelectorAll(".ad")];
    expect(inContent!.previousElementSibling!.tagName).toBe("OL");
    expect(inContent!.previousElementSibling!.previousElementSibling!.textContent).toBe("Steps");
    expect(main.lastElementChild).toBe(end);
  });

  it("put a play's in-content slot before its third section, at the top level, and its end slot last", () => {
    let withTwo = 0;
    for (const p of plays) {
      const main = mainOf(at(`/plays/${p.slug}`).html);
      expect(main.trimEnd().endsWith("</ins></div></aside>"), p.slug).toBe(true);
      // Every <h2> of a play is a top-level block: quotes hold paragraphs, tables hold spans.
      const h2 = [...main.matchAll(/<h2>/g)].map((m) => m.index!);
      if (h2.length < 3) {
        expect(kinds(main), p.slug).toEqual(["end"]);
        continue;
      }
      withTwo++;
      expect(kinds(main), p.slug).toEqual(["in-content", "end"]);
      expect(main.indexOf(IN_CONTENT), p.slug).toBe(main.lastIndexOf(IN_CONTENT, h2[2]));
      expect(main.indexOf(IN_CONTENT), p.slug).toBeGreaterThan(h2[1]!);
      expect(main.slice(main.indexOf("</aside>", main.indexOf(IN_CONTENT)) + "</aside>".length, h2[2]), p.slug).toBe("\n");
    }
    expect(withTwo).toBeGreaterThan(0);
    const sample = plays.find((p) => [...mainOf(at(`/plays/${p.slug}`).html).matchAll(/<h2>/g)].length >= 3)!;
    const main = doc(at(`/plays/${sample.slug}`).html).querySelector("main.doc")!;
    const ads = [...main.querySelectorAll(".ad")];
    const h2s = [...main.children].filter((e) => e.tagName === "H2");
    expect(ads[0]!.parentElement).toBe(main);
    expect(ads[0]!.nextElementSibling).toBe(h2s[2]);
    expect(main.lastElementChild).toBe(ads[1]);
  });

  it("put one end slot on /guide, last in main", () => {
    expect(kinds(at("/guide").html)).toEqual(["end"]);
    const main = doc(at("/guide").html).querySelector("main.doc")!;
    const ads = [...main.querySelectorAll(".ad")];
    expect(ads).toHaveLength(1);
    expect(main.lastElementChild).toBe(ads[0]);
  });

  it("are fixed manual units: the label outside the box, the client id, no format, no inline style", () => {
    const ad = doc(adSlot("in-content", FAKE)).querySelector(".ad")!;
    const label = ad.querySelector(".ad-label")!;
    expect(label.textContent).toBe(AD_LABEL);
    expect(AD_LABEL).toBe("Advertisement");
    expect(label.closest(".ad-slot")).toBeNull();
    expect(label.querySelector("a")).toBeNull();
    const ins = ad.querySelector(".ad-slot > ins.adsbygoogle")!;
    expect(ins.getAttribute("data-ad-client")).toBe(`ca-${FAKE}`);
    expect(ins.hasAttribute("data-ad-format")).toBe(false);
    expect(ins.hasAttribute("data-full-width-responsive")).toBe(false);
    expect(adSlot("in-content", FAKE)).toBe(`${IN_CONTENT}<ins class="adsbygoogle" data-ad-client="ca-${FAKE}"></ins></div></aside>`);
    for (const p of lit.filter((x) => isAdPath(x.path))) expect(p.html, p.path).not.toMatch(/\sstyle=/);
  });

  it("are left off a thin page, which is noindex (#272 §2)", () => {
    const real = combos[0]!;
    const ctx: ComboContext = { card: () => undefined, feature: () => undefined, playsAbout: () => [] };
    const thin: Combo = { ...real, id: "thin-test-entry", steps: ["Play the card."], notes: "", prerequisites: { easy: [], notable: [] } };
    expect(comboPage(thin, ctx, FAKE)).not.toContain("ad-slot");
    expect(comboPage(real, ctx, FAKE)).toContain("ad-slot");
    const thinPlay = renderSite({ ...input, adsensePublisherId: FAKE, plays: [{ ...plays[0]!, markdown: "# Play — short\n\nToo short." }] })
      .find((p) => p.path === `/plays/${plays[0]!.slug}`)!;
    expect(thinPlay.noindex).toBe(true);
    expect(thinPlay.html).not.toContain("ad-slot");
  });

  it("stay out of the combo drawer, which draws the same sections", () => {
    for (const c of combos) expect(comboSections(c), c.id).not.toContain("ad-slot");
  });
});

describe("the ad slots without a publisher id (#291's dark launch)", () => {
  it("are not rendered at all", () => {
    expect(adSlot("in-content", "")).toBe("");
    expect(adSlot("end", "")).toBe("");
    for (const p of dark) {
      expect(p.html, p.path).not.toContain("ad-slot");
      expect(p.html, p.path).not.toContain("<ins");
      expect(p.html, p.path).not.toContain('class="ad"');
    }
    for (const p of plays) expect(playArticle(p, new Set()), p.slug).not.toContain("ad-slot");
  });
});

describe("the reserved box in web/styles.css (#272 §6)", () => {
  const css = readFileSync(join(root, "web", "styles.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const rule = (sel: string, within = css) => {
    const m = new RegExp(`(?:^|[}\\n])\\s*${sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`).exec(within);
    expect(m, sel).not.toBeNull();
    return m![1]!.replace(/\s+/g, " ").trim();
  };
  const wide = /@media \(min-width: 760px\) \{([\s\S]*?\n)\}/.exec(css)?.[1] ?? "";

  it("fixes the sizes per breakpoint at 760px: 336x280 / 300x250 in content, 728x90 / 320x100 at the end", () => {
    expect(rule(".ad-slot-in-content")).toBe("width: 300px; height: 250px;");
    expect(rule(".ad-slot-end")).toBe("width: 320px; height: 100px;");
    expect(rule(".ad-slot-in-content", wide)).toBe("width: 336px; height: 280px;");
    expect(rule(".ad-slot-end", wide)).toBe("width: 728px; height: 90px;");
  });

  it("frames it in --panel with a 1px --line border and the 10px container radius, and clips what it holds", () => {
    const box = rule(".ad-slot");
    for (const d of ["box-sizing: content-box", "overflow: hidden", "background: var(--panel)", "border: 1px solid var(--line)", "border-radius: 10px"]) {
      expect(box).toContain(d);
    }
    expect(box).not.toMatch(/shadow|accent/);
    expect(rule(".ad-slot .adsbygoogle")).toBe("display: block; width: 100%; height: 100%;");
  });

  it("sets the label in 12px --faint, outranking .doc p", () => {
    const label = rule(".ad .ad-label");
    expect(label).toContain("font-size: 0.75rem");
    expect(label).toContain("color: var(--faint)");
    expect(label).toContain("margin: 0");
    expect(rule(".ad")).toContain("margin-block: 32px");
  });
});

describe("a dark build's styles.css (#292)", () => {
  const raw = readFileSync(join(root, "web", "styles.css"), "utf8");

  it("loses exactly the ad slot block, so public/ names no ad-slot while the id is empty", () => {
    const dark = withoutAdStyles(raw) as string;
    expect(dark).not.toContain("ad-slot");
    expect(dark).not.toMatch(/(?:^|[}\s])\.ad[\s.{-]/);
    const [begin, end] = AD_STYLES as [string, string];
    const block = raw.slice(raw.indexOf(begin), raw.indexOf(end) + end.length);
    expect(raw.length - dark.length).toBe(block.length);
    expect(dark).toContain(".doc strong {");
    expect(dark).toContain(".colophon {");
  });

  it("throws when a marker is gone rather than shipping the rules", () => {
    const [begin, end] = AD_STYLES as [string, string];
    expect(() => withoutAdStyles(raw.replace(begin, ""))).toThrow(/ad slots/);
    expect(() => withoutAdStyles(raw.replace(end, ""))).toThrow(/ad slots/);
  });
});
