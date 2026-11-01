import { existsSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { authoredWords, comboPage, THIN_WORDS, type ComboContext } from "../src/render/combo.js";
import { clip, DISCLAIMER, ORIGIN } from "../src/render/layout.js";
import { guideBody, sourcesBody } from "../src/render/pages.js";
import { APP, playArticle, type Play } from "../src/render/play.js";
import { fileOf, renderSite, type BuiltPage, type SiteInput } from "../src/render/site.js";
import type { Combo } from "../src/types.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs.
import { slimCard } from "../scripts/web-card-fields.mjs";
// @ts-expect-error same.
import { loadPlays } from "../scripts/web-plays.mjs";
// @ts-expect-error same.
import { stripInternalDeep } from "../scripts/web-combo-prose.mjs";
// @ts-expect-error same.
import { ORIGIN as SEO_ORIGIN, SLUG_SHAPE, pageFileProblem, sitemapEntries, writePages, writeSeo } from "../scripts/web-seo.mjs";

/**
 * #286: the public pages, rendered from the same data the build reads and checked page by page. The
 * build itself (`scripts/build-web.mjs`) does exactly this call; reading its output would test the
 * last build on disk rather than the code.
 */
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
const pages: BuiltPage[] = renderSite(input);

const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const levels = (html: string) => [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));

describe("every pre-rendered page (#286)", () => {
  it("covers every combo, every play, both indexes and the three prose pages", () => {
    const paths = new Set(pages.map((p) => p.path));
    for (const c of combos) expect(paths.has(`/combos/${c.id}`), c.id).toBe(true);
    for (const p of plays) expect(paths.has(`/plays/${p.slug}`), p.slug).toBe(true);
    for (const p of ["/combos", "/plays", "/guide", "/sources", "/about"]) expect(paths.has(p), p).toBe(true);
    expect(pages).toHaveLength(combos.length + plays.length + 5);
    expect(new Set(pages.map((p) => p.file)).size).toBe(pages.length);
  });

  it("has exactly one h1, the Riot disclaimer verbatim and its own canonical", () => {
    expect(ORIGIN).toBe(SEO_ORIGIN);
    for (const p of pages) {
      expect(count(p.html, /<h1[\s>]/g), `${p.path} h1`).toBe(1);
      expect(p.html, `${p.path} disclaimer`).toContain(DISCLAIMER);
      const canon = [...p.html.matchAll(/<link rel="canonical" href="([^"]+)">/g)].map((m) => m[1]);
      expect(canon, `${p.path} canonical`).toEqual([`${ORIGIN}${p.path}`]);
      expect(p.html, `${p.path} og:url`).toContain(`<meta property="og:url" content="${ORIGIN}${p.path}">`);
    }
  });

  it("gives each page its own title", () => {
    const titles = pages.map((p) => /<title>([^<]+)<\/title>/.exec(p.html)?.[1]);
    for (const [i, t] of titles.entries()) expect(t, pages[i]!.path).toMatch(/ — RiftCombo$/);
    // Combo names are unique in the catalogue; a play title and a combo name never coincide either.
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("carries no inline style, no script and no event handler, which the CSP would refuse", () => {
    for (const p of pages) {
      expect(p.html, p.path).not.toMatch(/\sstyle=/);
      expect(p.html, p.path).not.toMatch(/<script/i);
      expect(p.html, p.path).not.toMatch(/\son[a-z]+=/i);
    }
  });

  it("never skips a heading level", () => {
    for (const p of pages) {
      const ls = levels(p.html);
      expect(ls[0], p.path).toBe(1);
      for (let i = 1; i < ls.length; i++) expect(ls[i]! - ls[i - 1]!, `${p.path} h${ls[i - 1]} → h${ls[i]}`).toBeLessThanOrEqual(1);
    }
  });

  it("links only real paths between pages, never a hash route except the app's own My decks", () => {
    for (const p of pages) {
      for (const [, href] of p.html.matchAll(/href="([^"]+)"/g)) {
        if (href!.includes("#")) expect(href, p.path).toBe("/#/decks");
      }
    }
  });

  it("says 'walked by hand' in a description only of what was walked", () => {
    const desc = (html: string) => /<meta name="description" content="([^"]*)">/.exec(html)![1]!;
    const verified = combos.filter((c) => c.status === "verified").length;
    for (const c of combos) {
      const d = desc(pages.find((p) => p.path === `/combos/${c.id}`)!.html);
      expect(d.includes("not yet walked"), c.id).toBe(c.status !== "verified");
    }
    const index = desc(pages.find((p) => p.path === "/combos")!.html);
    if (verified < combos.length) expect(index).toContain(`${verified} walked by hand`);
    const one = combos[0]!;
    const asCandidate = renderSite({ ...input, combos: [{ ...one, status: "candidate" }] });
    expect(desc(asCandidate.find((p) => p.path === `/combos/${one.id}`)!.html)).toContain("not yet walked by hand");
    expect(desc(asCandidate.find((p) => p.path === "/combos")!.html)).toContain("1 Riftbound combos, 0 walked by hand");
  });

  it("clips a description at a word boundary, and a text with no space at the limit", () => {
    expect(clip("word ".repeat(60))).toMatch(/^(word )+word…$/);
    expect(clip("word ".repeat(60)).length).toBeLessThanOrEqual(160);
    const solid = "x".repeat(300);
    expect(clip(solid)).toBe(`${"x".repeat(159)}…`);
  });

  it("names Inter and nothing else: the pages load the app's own stylesheet and font", () => {
    for (const p of [pages[0]!, pages.at(-1)!]) {
      expect(p.html).toContain('<link rel="stylesheet" href="/styles.css">');
      expect(p.html).toContain('href="/fonts/inter-latin.woff2"');
      expect(p.html).not.toMatch(/fonts\.googleapis|font-family/);
    }
  });
});

describe("the thin-content line (#272 §2)", () => {
  const real = combos[0]!;
  const ctx: ComboContext = { card: () => undefined, feature: () => undefined, playsAbout: () => [] };
  const thin: Combo = { ...real, id: "thin-test-entry", steps: ["Play the card."], notes: "", prerequisites: { easy: [], notable: [] } };

  it("puts noindex on an entry with under 200 authored words, and only on such an entry", () => {
    expect(THIN_WORDS).toBe(200);
    expect(authoredWords(thin)).toBeLessThan(THIN_WORDS);
    expect(comboPage(thin, ctx)).toContain('<meta name="robots" content="noindex">');
    expect(authoredWords(real)).toBeGreaterThanOrEqual(THIN_WORDS);
    expect(comboPage(real, ctx)).not.toContain('name="robots"');
  });

  it("keeps a thin entry's page out of the sitemap while still writing it", () => {
    const site = renderSite({ ...input, combos: [...combos, thin] });
    const page = site.find((p) => p.path === "/combos/thin-test-entry")!;
    expect(page.noindex).toBe(true);
    const listed = (sitemapEntries(root, site) as { path: string }[]).map((e) => e.path);
    expect(listed).not.toContain("/combos/thin-test-entry");
    expect(listed).toContain(`/combos/${real.id}`);
  });

  it("binds on no entry of today's catalogue (the shortest measured 287 words on 2026-10-07)", () => {
    const short = combos.filter((c) => authoredWords(c) < THIN_WORDS).map((c) => c.id);
    expect(short).toEqual([]);
  });
});

describe("one text for the app and the page", () => {
  it("draws the Guide and Sources an h2 inside the app and an h1 on a page", () => {
    for (const body of [guideBody, sourcesBody]) {
      expect(body({ base: 2, candidates: false })).toMatch(/^<h2 class="doc-title">/);
      expect(body({ base: 1, candidates: false })).toMatch(/^<h1 class="doc-title">/);
    }
  });

  it("mentions candidates only while the catalogue holds one", () => {
    expect(guideBody({ base: 2, candidates: false })).not.toContain("candidate");
    expect(guideBody({ base: 2, candidates: true })).toContain("<strong>candidate</strong>");
    expect(sourcesBody({ base: 2, candidates: false })).not.toContain("candidate");
  });

  it("gives a play the same body in both places, one heading level apart", () => {
    const p = plays.find((x) => /\n## /.test(x.markdown))!;
    const slugs = new Set(plays.map((x) => x.slug));
    const app = playArticle(p, { ...APP, slugs });
    const page = pages.find((x) => x.path === `/plays/${p.slug}`)!.html;
    expect(levels(app)[0]).toBe(2);
    expect(Math.min(...levels(app))).toBe(2);
    // Same number of headings, each one level higher on the page.
    const pageLevels = levels(page.slice(page.indexOf("<main")));
    expect(pageLevels).toEqual(levels(app).map((l) => l - 1));
  });
});

describe("the build writes a file for every sitemap URL (#286)", () => {
  it("every loc has a file and every combo id has its page", { timeout: 60_000 }, () => {
    const out = mkdtempSync(join(tmpdir(), "render-"));
    writePages(out, pages);
    const entries = sitemapEntries(root, pages) as { path: string; file: string; lastmod: string | null }[];
    // The three hand-written pages are copied by build-web; here they are stood in for.
    for (const f of ["index.html", "privacy.html", "terms.html"]) writePages(out, [{ file: f, html: "" }]);
    writeSeo(out, entries);
    const xml = readFileSync(join(out, "sitemap.xml"), "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs.length).toBe(entries.length);
    for (const loc of locs) {
      const path = loc.slice(ORIGIN.length);
      const file = path === "/" ? "index.html" : fileOf(path);
      expect(existsSync(join(out, file)), loc).toBe(true);
    }
    for (const c of combos) expect(existsSync(join(out, "combos", `${c.id}.html`)), c.id).toBe(true);
    for (const e of entries) if (e.lastmod) expect(e.lastmod, e.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("refuses a combo id or play slug outside the slug shape (#557)", () => {
    const out = mkdtempSync(join(tmpdir(), "render-"));
    for (const id of ["../x", "a/b", "A-B", "", "a--b", "-a", "a.b", "a b"]) {
      expect(() => writePages(out, [{ file: `combos/${id}.html`, html: "", sources: ["data/combos.json"] }]), JSON.stringify(id)).toThrow(/data\/combos\.json/);
    }
    expect(() => writePages(out, [{ file: "../escape.html", html: "" }])).toThrow(/outside/);
    expect(() => writePages(out, [{ file: "plays/ok-slug.txt", html: "" }])).toThrow(/outside/);
    expect(() => writePages(out, [{ file: "plays/ok-slug-2.html", html: "x" }])).not.toThrow();
  });

  it("writes nothing when a later page is bad (#557)", () => {
    const out = mkdtempSync(join(tmpdir(), "render-"));
    const batch = [{ file: "combos/good-one.html", html: "x" }, { file: "combos/../bad.html", html: "x", sources: ["data/combos.json"] }];
    expect(() => writePages(out, batch)).toThrow(/data\/combos\.json/);
    expect(readdirSync(out)).toEqual([]);
  });

  it("every combo id, play slug and page file has the slug shape (#557)", () => {
    const ids = combos.map((c) => c.id);
    const slugs = plays.map((p) => p.slug);
    const bad = [...ids, ...slugs].filter((v) => !SLUG_SHAPE.test(v));
    console.log(`#557 shape check: ${ids.length} combo ids, ${slugs.length} play slugs, ${pages.length} pages, ${bad.length} failing`);
    expect(bad).toEqual([]);
    const badFiles = pages.map((p) => p.file).filter((f) => pageFileProblem(f) !== null);
    expect(badFiles).toEqual([]);
  });

  it("is wired into build:web after the static copy", () => {
    const build = readFileSync(join(root, "scripts", "build-web.mjs"), "utf8");
    expect(build).toContain("renderSite(");
    expect(build).toContain("writePages(OUT, pages)");
    expect(build).toContain("writeSeo(OUT, sitemap)");
    expect(build).toContain("stripInternalDeep(");
    expect(build.indexOf("for (const f of STATIC)")).toBeLessThan(build.indexOf("writeSeo(OUT, sitemap)"));
  });
});
