import { existsSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { authoredWords, comboPage, CURRENT_RULES_VERSION, rulesLine, rulesNotice, THIN_WORDS, type ComboContext } from "../src/render/combo.js";
import { AD_LOADER_SCRIPT, isAdPath } from "../src/render/ad-loader.js";
import { adsenseAccountMeta, clip, DISCLAIMER, ORIGIN, PRIVACY_CHOICES_LINK, PRIVACY_CHOICES_SCRIPT, withAdsenseAccount, withPrivacyChoices } from "../src/render/layout.js";
import { guideBody, SITE_LD, sourcesBody } from "../src/render/pages.js";
import { playArticle, type Play } from "../src/render/play.js";
import { fileOf, renderSite, type BuiltPage, type SiteInput } from "../src/render/site.js";
import type { Combo } from "../src/types.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs.
import { slimCard } from "../scripts/web-card-fields.mjs";
// @ts-expect-error same.
import { loadPlays } from "../scripts/web-plays.mjs";
// @ts-expect-error same.
import { stripInternalDeep } from "../scripts/web-combo-prose.mjs";
// @ts-expect-error same.
import { appShell, ORIGIN as SEO_ORIGIN, SLUG_SHAPE, pageFileProblem, sitemapEntries, writePages, writeSeo } from "../scripts/web-seo.mjs";

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
/**
 * A page as its own markup, without the ad surface's loader (#290): the loader's source names the
 * adsense meta tag and the privacy-choices script it looks for, which is not the page carrying them.
 */
const own = (html: string) => html.replace(AD_LOADER_SCRIPT, "");
const landing = pages.find((p) => p.path === "/")!;
const LANDING_SCRIPTS = `<script type="application/ld+json">${SITE_LD}</script>\n<script src="/legacy.js"></script>`;
const levels = (html: string) => [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));

describe("every pre-rendered page (#286)", () => {
  it("covers the landing, every combo, every play, both indexes and the three prose pages", () => {
    const paths = new Set(pages.map((p) => p.path));
    for (const c of combos) expect(paths.has(`/combos/${c.id}`), c.id).toBe(true);
    for (const p of plays) expect(paths.has(`/plays/${p.slug}`), p.slug).toBe(true);
    for (const p of ["/", "/combos", "/plays", "/guide", "/sources", "/about"]) expect(paths.has(p), p).toBe(true);
    expect(pages).toHaveLength(combos.length + plays.length + 6);
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

  /**
   * The landing is the one exception, and it is two exact tags: the JSON-LD data block the CSP names
   * by hash, and the same-origin script that sends a pre-#287 `/#/...` link on (#288).
   */
  it("carries no inline style, no script and no event handler, which the CSP would refuse", () => {
    for (const p of pages) {
      const html = p.path === "/" ? p.html.replace(LANDING_SCRIPTS, "") : own(p.html);
      // The ad surface's one script, hashed by its CSP (#290): on those pages and no other.
      expect(p.html.includes(AD_LOADER_SCRIPT), p.path).toBe(isAdPath(p.path));
      expect(html, p.path).not.toMatch(/\sstyle=/);
      expect(html, p.path).not.toMatch(/<script/i);
      expect(html, p.path).not.toMatch(/\son[a-z]+=/i);
    }
    expect(landing.html).toContain(LANDING_SCRIPTS);
  });

  it("never skips a heading level", () => {
    for (const p of pages) {
      const ls = levels(p.html);
      expect(ls[0], p.path).toBe(1);
      for (let i = 1; i < ls.length; i++) expect(ls[i]! - ls[i - 1]!, `${p.path} h${ls[i - 1]} → h${ls[i]}`).toBeLessThanOrEqual(1);
    }
  });

  it("links only real paths between pages, never a hash route (#287)", () => {
    for (const p of pages) {
      for (const [, href] of p.html.matchAll(/href="([^"]+)"/g)) expect(href, p.path).not.toMatch(/#\//);
    }
  });

  /**
   * #287, #272 §5: public → app is a FULL load, so the browser applies the app's own headers. A public
   * page carries no script at all, so nothing on it can pushState into /app or /decks; every link
   * there is a plain href the browser follows. The router's half (it never pushStates from a public
   * path) is pinned in test/dom/router.dom.test.ts.
   */
  it("reaches the app only through plain links, from a page that runs no script", () => {
    const toApp = pages.filter((p) => /href="\/(app|decks)(\/|"|\?)/.test(p.html));
    expect(toApp.length).toBeGreaterThan(0);
    // The landing's /legacy.js only ever makes a full load (test/dom/router.dom.test.ts, "old hash links").
    // The ad surface's loader (#290) navigates nowhere: it inserts the consent and ad scripts.
    for (const p of toApp) {
      const ran = [...own(p.html).matchAll(/<script\b(?![^>]*application\/ld\+json)[^>]*>/g)].map((m) => m[0]);
      expect(ran, p.path).toEqual(p.path === "/" ? ['<script src="/legacy.js">'] : []);
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

/**
 * #288 (reversing #39 for the content): `/` is a public page of its own, no longer the app shell
 * behind sign-in. The gate, `data-auth` and the one sign-in button stay in `web/index.html`, which is
 * served only at /app and /decks (test/headers.test.ts, "has exactly one way in").
 */
describe("the landing at / (#288)", () => {
  it("is index.html, indexable and in the sitemap once", () => {
    expect(landing.file).toBe("index.html");
    expect(fileOf("/")).toBe("index.html");
    expect(landing.noindex).toBe(false);
    expect(landing.html).not.toContain("noindex");
    const listed = (sitemapEntries(root, pages) as { path: string }[]).filter((e) => e.path === "/");
    expect(listed).toHaveLength(1);
  });

  it("is a page anyone can read: no gate, no auth state, no sign-in button", () => {
    expect(landing.html).toMatch(/<body>/);
    expect(landing.html).not.toContain("data-auth");
    expect(landing.html).not.toContain('id="gate"');
    expect(landing.html).not.toContain("Sign in with Google");
  });

  it("leaves every combo, play and prose page as open as the landing: no page carries the gate", () => {
    const gated = pages.filter((p) => /data-auth|id="gate"|Sign in with Google/.test(p.html)).map((p) => p.path);
    expect(pages.length).toBeGreaterThan(100);
    expect(gated, "pages carrying the shell's gate").toEqual([]);
  });

  it("links the catalogue, the plays and the guide, and the finder and My decks for a deck", () => {
    const main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(landing.html)![1]!;
    for (const href of ["/combos", "/plays", "/guide", "/app", "/decks"]) expect(main, href).toContain(`href="${href}"`);
    expect(main).toMatch(/<h1 class="doc-title">[^<]+<\/h1>/);
  });

  it("says 'walked by hand' only of a verified combo, the catalogue holding candidates too", () => {
    const main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(landing.html)![1]!;
    expect(combos.some((c) => c.status !== "verified")).toBe(true);
    for (const sentence of main.replace(/<[^>]+>/g, "").split(/(?<=[.;])\s+/).filter((s) => /walked by hand/i.test(s))) {
      expect(sentence).toMatch(/^A verified combo /);
    }
    expect(main).toContain("marked <em>candidate</em> until a person has walked it");
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

describe("the walked-against line (#645)", () => {
  const ctx: ComboContext = { card: () => undefined, feature: () => undefined, playsAbout: () => [] };

  it("keeps the walk date apart from the numbering, which a renumbering alone moves", () => {
    expect(rulesLine({ rulesVersion: "2026-07-16", walkedVersion: "2026-07-16" })).toBe("Walked against Core Rules 2026-07-16");
    expect(rulesLine({ rulesVersion: "2026-10-09", walkedVersion: "2026-07-16" })).toBe(
      "Walked against Core Rules 2026-07-16; rule numbers follow 2026-10-09, where every cited paragraph reads the same or was re-read to mean the same.",
    );
  });

  it("prints on every page the walk date its entry records, never the numbering edition", () => {
    const moved = combos.filter((c) => c.status === "verified" && c.rulesVersion !== c.walkedVersion);
    expect(moved.length).toBeGreaterThan(0);
    for (const c of combos.filter((e) => e.status === "verified")) {
      // A re-walk on the 2026-10-09 text (#708) is numbered on that text too.
      expect(["2026-07-16", "2026-10-09"], c.id).toContain(c.walkedVersion);
      if (c.walkedVersion === "2026-10-09") expect(c.rulesVersion, c.id).toBe("2026-10-09");
      expect(comboPage(c, ctx), c.id).toContain(`<p class="rules-version">${rulesLine(c)}</p>`);
    }
  });

  it("prints no walked-against line on a non-verified entry, which has no hand walk (#650)", () => {
    const rest = combos.filter((c) => c.status !== "verified");
    expect(rest.length).toBeGreaterThan(0);
    for (const c of rest) {
      expect(c.walkedVersion, c.id).toBe("");
      expect(comboPage(c, ctx), c.id).not.toContain('class="rules-version"');
    }
    const verified = combos.find((c) => c.status === "verified")!;
    expect(comboPage({ ...verified, status: "candidate", walkedVersion: "" }, ctx)).not.toContain('class="rules-version"');
    expect(comboPage(verified, ctx)).toContain('class="rules-version">Walked against');
  });
});

describe("the rules-version notice (#649)", () => {
  const ctx: ComboContext = { card: () => undefined, feature: () => undefined, playsAbout: () => [] };

  it("names the text an entry carries and lifts when it moves to the current one", () => {
    expect(rulesNotice({ rulesVersion: "2026-07-16", status: "verified" })).toBe(
      "Verified against the 2026-07-16 rules; re-check against the 2026-10-09 text in progress.",
    );
    expect(rulesNotice({ rulesVersion: "2026-10-09", status: "verified" })).toBeNull();
    expect(rulesNotice({ rulesVersion: "2027-01-01", status: "verified" })).toBeNull();
  });

  it("is not shown on a candidate: it was never verified against any text (#682)", () => {
    expect(rulesNotice({ rulesVersion: "2026-07-16", status: "candidate" })).toBeNull();
    const ver = combos.find((c) => c.status === "verified" && c.rulesVersion === "2026-07-16")!;
    expect(ver).toBeDefined();
    expect(comboPage({ ...ver, status: "candidate" }, ctx)).not.toContain("rules-notice");
    expect(comboPage(ver, ctx)).toContain('class="rules-notice"');
  });

  it("keeps the current edition pinned to the newest one the data carries", () => {
    expect(CURRENT_RULES_VERSION).toBe(combos.map((c) => c.rulesVersion).sort().at(-1));
  });

  it("is driven by status and rulesVersion, on every page, and says nothing about right or wrong", () => {
    for (const c of combos) {
      const n = `Verified against the ${c.rulesVersion} rules; re-check against the 2026-10-09 text in progress.`;
      const html = comboPage(c, ctx);
      if (c.status !== "verified") expect(html, c.id).not.toContain("rules-notice");
      else if (c.rulesVersion === "2026-10-09") expect(html, c.id).not.toContain("rules-notice");
      else {
        expect(rulesNotice(c), c.id).toBe(n);
        expect(html, c.id).toContain(`<p class="rules-notice">${n}</p>`);
      }
    }
    expect(rulesNotice({ rulesVersion: "2026-07-16", status: "verified" })).not.toMatch(/wrong|incorrect|error|invalid|outdated/i);
  });
});

describe("one text for the app and the page", () => {
  it("draws the Guide and Sources an h1 on a page", () => {
    for (const body of [guideBody, sourcesBody]) {
      expect(body({ candidates: false })).toMatch(/^<h1 class="doc-title">/);
    }
  });

  it("mentions candidates only while the catalogue holds one", () => {
    expect(guideBody({ candidates: false })).not.toContain("candidate");
    expect(guideBody({ candidates: true })).toContain("<strong>candidate</strong>");
    expect(sourcesBody({ candidates: false })).not.toContain("candidate");
  });

  it("draws a play's page from the one renderer, its title the h1 and its sections under it (#575)", () => {
    const p = plays.find((x) => /\n## /.test(x.markdown))!;
    const slugs = new Set(plays.map((x) => x.slug));
    const article = playArticle(p, slugs);
    const page = pages.find((x) => x.path === `/plays/${p.slug}`)!.html;
    expect(page).toContain(article);
    expect(levels(article)[0]).toBe(1);
    expect(levels(article).filter((l) => l === 1)).toHaveLength(1);
    expect(levels(article).slice(1).every((l) => l >= 2)).toBe(true);
  });
});

describe("the build writes a file for every sitemap URL (#286)", () => {
  it("every loc has a file and every combo id has its page", { timeout: 60_000 }, () => {
    const out = mkdtempSync(join(tmpdir(), "render-"));
    writePages(out, pages);
    const entries = sitemapEntries(root, pages) as { path: string; file: string; lastmod: string | null }[];
    // The two hand-written pages are copied by build-web; here they are stood in for.
    for (const f of ["privacy.html", "terms.html"]) writePages(out, [{ file: f, html: "" }]);
    writeSeo(out, entries);
    const xml = readFileSync(join(out, "sitemap.xml"), "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs.length).toBe(entries.length);
    for (const loc of locs) {
      const path = loc.slice(ORIGIN.length);
      expect(existsSync(join(out, fileOf(path))), loc).toBe(true);
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
    expect(build).toContain("writeSeo(OUT, sitemap, adsenseId)");
    expect(build).toContain("stripInternalDeep(");
    expect(build.indexOf("for (const f of STATIC)")).toBeLessThan(build.indexOf("writeSeo(OUT, sitemap, adsenseId)"));
  });
});

describe("the google-adsense-account tag (#291)", () => {
  const FAKE = "pub-0000000000000000";
  const TAG = '<meta name="google-adsense-account" content="ca-pub-0000000000000000">';
  const head = (html: string) => html.slice(0, html.indexOf("</head>"));
  const handWritten = () => [
    appShell(readFileSync(join(root, "web", "index.html"), "utf8")) as string,
    ...["privacy.html", "terms.html", "404.html"].map((f) => readFileSync(join(root, "web", f), "utf8")),
  ];

  it("is on no page while the id is empty", () => {
    for (const p of pages) expect(own(p.html), p.path).not.toContain("google-adsense-account");
    for (const p of renderSite({ ...input, adsensePublisherId: "" })) expect(own(p.html), p.path).not.toContain("google-adsense-account");
    for (const html of handWritten()) {
      expect(html).not.toContain("google-adsense-account");
      expect(withAdsenseAccount(html, "")).toBe(html);
    }
    expect(adsenseAccountMeta("")).toBe("");
  });

  it("is in the head of every page, / and /combos/<id> among them, exactly once, once an id is set", { timeout: 60_000 }, () => {
    expect(adsenseAccountMeta(FAKE)).toBe(TAG);
    const site = renderSite({ ...input, adsensePublisherId: FAKE });
    expect(site.map((p) => p.path)).toEqual(pages.map((p) => p.path));
    const combo = site.find((p) => p.path === `/combos/${combos[0]!.id}`)!;
    for (const p of [site.find((x) => x.path === "/")!, combo, ...site]) {
      expect(count(own(p.html), /google-adsense-account/g), p.path).toBe(1);
      expect(head(p.html), p.path).toContain(TAG);
    }
    for (const html of handWritten()) {
      const tagged = withAdsenseAccount(html, FAKE);
      expect(count(tagged, /google-adsense-account/g)).toBe(1);
      expect(head(tagged)).toContain(TAG);
    }
  });

  it("is added to the hand-written pages and the shell by build:web", () => {
    const build = readFileSync(join(root, "scripts", "build-web.mjs"), "utf8");
    expect(build).toContain("adsensePublisherId: adsenseId");
    expect(build).toContain('for (const f of [...STATIC.filter((s) => s.endsWith(".html")), "app.html"])');
  });
});

describe("the Privacy choices footer link (#293)", () => {
  const FAKE = "pub-0000000000000000";
  const footer = (html: string) => html.slice(html.indexOf('<footer class="doc colophon">'));
  const hand = (f: string) => readFileSync(join(root, "web", f), "utf8");
  const built = (id: string) => {
    const out = mkdtempSync(join(tmpdir(), "choices-"));
    writePages(out, renderSite({ ...input, adsensePublisherId: id }));
    return (path: string) => readFileSync(join(out, fileOf(path)), "utf8");
  };

  it("is on no page while the id is empty: public/combos/<id>.html counts 0", { timeout: 60_000 }, () => {
    const read = built("");
    expect(count(read(`/combos/${combos[0]!.id}`), /Privacy choices/g)).toBe(0);
    for (const p of pages) {
      expect(p.html, p.path).not.toContain("Privacy choices");
      expect(own(p.html), p.path).not.toContain("privacy-choices.js");
    }
    for (const f of ["privacy.html", "terms.html"]) expect(withPrivacyChoices(hand(f), "")).toBe(hand(f));
  });

  it("is in the footer of every page once an id is set: public/combos/<id>.html counts 1, with its script", { timeout: 60_000 }, () => {
    const read = built(FAKE);
    const combo = read(`/combos/${combos[0]!.id}`);
    expect(count(combo, /Privacy choices/g)).toBe(1);
    expect(footer(combo)).toContain(PRIVACY_CHOICES_LINK);
    for (const p of renderSite({ ...input, adsensePublisherId: FAKE })) {
      expect(count(p.html, /Privacy choices/g), p.path).toBe(1);
      expect(footer(p.html), p.path).toContain(`<a href="/terms">Terms</a> · ${PRIVACY_CHOICES_LINK}</p>`);
      // An ad page's strict CSP trusts only the loader, which inserts the script itself (#290).
      const head = p.html.slice(0, p.html.indexOf("</head>"));
      if (isAdPath(p.path)) {
        expect(head, p.path).not.toContain(PRIVACY_CHOICES_SCRIPT);
        expect(head, p.path).toContain(AD_LOADER_SCRIPT);
      } else expect(head, p.path).toContain(PRIVACY_CHOICES_SCRIPT);
    }
    for (const f of ["privacy.html", "terms.html"]) {
      const linked = withPrivacyChoices(hand(f), FAKE);
      expect(count(linked, /data-privacy-choices/g), f).toBe(1);
      expect(footer(linked), f).toContain(PRIVACY_CHOICES_LINK);
    }
  });

  it("refuses a document with no colophon footer rather than dropping the link", () => {
    expect(() => withPrivacyChoices("<html><head></head><body></body></html>", FAKE)).toThrow(/footer/);
  });

  it("is added to the hand-written privacy and terms pages by build:web, and its script is an entry point", () => {
    const build = readFileSync(join(root, "scripts", "build-web.mjs"), "utf8");
    expect(build).toContain('for (const f of ["privacy.html", "terms.html"])');
    expect(build).toContain("withPrivacyChoices(readFileSync(join(OUT, f), \"utf8\"), adsenseId)");
    expect(build).toContain('"privacy-choices": join(ROOT, "web", "privacy-choices.ts")');
  });
});
