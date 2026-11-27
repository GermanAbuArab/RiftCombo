// The daily refresh detector (#735): scripts/refresh-check.mjs's pure functions over pages cut from
// the live playriftbound.com HTML (test/fixtures/refresh/, read 2026-11-27).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// @ts-expect-error — untyped .mjs import, as test/errata.test.ts does for build-cards.mjs
import { buildErrorLine, changes, diffCards, diffLegality, refreshKey, rulesPdfs, watchedSlugs } from "../scripts/refresh-check.mjs";

const fixture = (name: string) => readFileSync(new URL(`./fixtures/refresh/${name}`, import.meta.url), "utf8");
const news = fixture("news.html");
const hub = fixture("hub.html");

type Entry = { status: string; read: string; issue: number | null };
type Sources = { rules: Record<string, Entry>; news: Record<string, Entry> };
type Change = { kind: string; key: string; title: string; labels: string[]; body: string };

const JULY = "/en-us/news/announcements/july-ban-list-updates";
const RADIANCE_BANS = "/en-us/news/announcements/radiance-ban-list-updates-effective-november-23-2026";
const VENDETTA_FAQ = "/en-us/news/rules-and-releases/vendetta-rules-faq-and-clarifications";
const CORE = "https://cmsassets.rgpub.io/sanity/files/dsfx7636/news_live/5c7946f7c3b8c6e0faff85ab6dadc6d2e721ea94.pdf";
const TOURNAMENT = "https://cmsassets.rgpub.io/sanity/files/dsfx7636/news_live/861752822d217edf37d9febaeaf77a7d924c1bb6.pdf";
const ingested: Entry = { status: "ingested", read: "2026-11-27", issue: null };

// Every source in the fixtures accounted for; each test removes the one it wants to see as new.
const allKnown = (): Sources => ({
  rules: { [CORE]: ingested, [TOURNAMENT]: ingested },
  news: { [JULY]: ingested, [RADIANCE_BANS]: ingested, [VENDETTA_FAQ]: ingested },
});

const card = (id: string, text: string) => ({ id, name: id, text, effect: null, might: 1 });
const cardsJson = (built: string, cards: ReturnType<typeof card>[]) => ({ source: "x", resultsUpdatedAt: built, built, count: cards.length, cards });
const noData = { cards: { added: [], removed: [], changed: [] }, legality: [], buildExit: 0, buildErr: "" };

const run = (sources: Sources, extra: Partial<Record<string, unknown>> = {}): Change[] =>
  changes(sources, { slugs: watchedSlugs(news), pdfs: rulesPdfs(hub), ...noData, ...extra });

describe("watchedSlugs", () => {
  it("keeps rules and card topics by slug, with the title and publishDate from the page data", () => {
    expect(watchedSlugs(news)).toEqual([
      { slug: JULY, title: "July Ban List Updates", publishedAt: "2026-07-17T00:30:00.000Z" },
      { slug: RADIANCE_BANS, title: "Radiance Ban List Updates (Effective November 23, 2026)", publishedAt: "2026-11-13T16:00:00.000Z" },
      { slug: VENDETTA_FAQ, title: "Vendetta Rules FAQ and Clarifications", publishedAt: "2026-08-14T01:00:00.000Z" },
    ]);
  });

  it("skips a merch or event slug, and filters on the slug, not the rules-and-releases category", () => {
    const slugs = watchedSlugs(news).map((s: { slug: string }) => s.slug);
    expect(news).toContain("celebrate-convergence-fest-at-american-game-stores");
    expect(news).toContain("/en-us/news/rules-and-releases/how-to-play-get-started/");
    expect(slugs.some((s: string) => s.includes("convergence") || s.includes("how-to-play"))).toBe(false);
    expect(run({ rules: allKnown().rules, news: {} }).map((c) => c.key)).toEqual([`news:${JULY}`, `news:${RADIANCE_BANS}`, `news:${VENDETTA_FAQ}`]);
  });
});

describe("rulesPdfs", () => {
  it("lists each rules document once and no CDN image", () => {
    expect(rulesPdfs(hub)).toEqual([CORE, TOURNAMENT]);
  });
});

describe("changes", () => {
  it("files nothing when every source is known and the data is unchanged", () => {
    expect(run(allKnown())).toEqual([]);
  });

  it("files a known slug again only while it is unaccounted with no issue", () => {
    const s = allKnown();
    s.news[VENDETTA_FAQ] = { status: "unaccounted", read: "2026-11-27", issue: 734 };
    expect(run(s)).toEqual([]);
    s.news[VENDETTA_FAQ] = { status: "unaccounted", read: "2026-11-27", issue: null };
    expect(run(s).map((c) => c.key)).toEqual([`news:${VENDETTA_FAQ}`]);
    s.news[VENDETTA_FAQ] = { status: "not-applicable", read: "2026-11-27", issue: null };
    expect(run(s)).toEqual([]);
  });

  it("a new ...-ban-list-updates-... slug is one ready P1 data change with the fast-path drill", () => {
    const s = allKnown();
    delete s.news[RADIANCE_BANS];
    const out = run(s);
    expect(out).toHaveLength(1);
    const [c] = out;
    expect(c!.kind).toBe("news");
    expect(c!.labels).toEqual(["refresh", "data", "ready", "P1"]);
    expect(c!.body).toContain("drill: fast path");
    expect(c!.body).toContain("data/legality.src.json");
    expect(c!.body).toContain("verify: `npm run build:data` exits 0");
    expect(c!.body).toContain(`https://playriftbound.com${RADIANCE_BANS}`);
    expect(c!.body).toContain("2026-11-13T16:00:00.000Z");
    expect(c!.body).toContain(`refresh-key: news:${RADIANCE_BANS}`);
  });

  it("a new FAQ slug is one later change", () => {
    const s = allKnown();
    delete s.news[VENDETTA_FAQ];
    const out = run(s);
    expect(out).toHaveLength(1);
    expect(out[0]!.labels).toEqual(["refresh", "later"]);
    expect(out[0]!.title).toContain("Vendetta Rules FAQ and Clarifications");
  });

  it("a new PDF URL is one later change", () => {
    const s = allKnown();
    delete s.rules[CORE];
    const out = run(s);
    expect(out).toHaveLength(1);
    expect(out[0]!.kind).toBe("rules");
    expect(out[0]!.labels).toEqual(["refresh", "later"]);
    expect(out[0]!.key).toBe(`rules:${CORE}`);
  });

  it("a cards.json whose only difference is `built` gives no change", () => {
    const before = cardsJson("2026-11-26T00:00:00Z", [card("OGN-001", "a")]);
    const after = cardsJson("2026-11-27T09:17:00Z", [card("OGN-001", "a")]);
    const diff = diffCards(before, after);
    expect(diff).toEqual({ added: [], removed: [], changed: [] });
    expect(run(allKnown(), { cards: diff, cardsJson: { before, after } })).toEqual([]);
  });

  it("a gallery diff on a green build is one ready P2 data change naming the ids and lines", () => {
    const before = cardsJson("1", [card("OGN-001", "a"), card("OGN-002", "b")]);
    const after = cardsJson("2", [card("OGN-001", "a2"), card("RAD-001", "c")]);
    const diff = diffCards(before, after);
    expect(diff).toEqual({ added: ["RAD-001"], removed: ["OGN-002"], changed: ["OGN-001"] });
    const out = run(allKnown(), { cards: diff, cardsJson: { before, after } });
    expect(out).toHaveLength(1);
    expect(out[0]!.labels).toEqual(["refresh", "data", "ready", "P2"]);
    expect(out[0]!.body).toContain('- OGN-001 text: "a" -> "a2"');
  });

  it("a legality diff on a green build is one change; a red build reports only the build", () => {
    const entry = { format: "constructed", name: "X", codes: ["OGN-001"], status: "banned", since: "2026-11-23" };
    const legality = diffLegality({ entries: [] }, { entries: [entry] });
    expect(legality).toEqual([{ side: "+", entry }]);
    expect(run(allKnown(), { legality }).map((c) => c.kind)).toEqual(["legality"]);

    const stderr = "file:///x/scripts/build-cards.mjs:240\n    throw new Error(x)\n\nError: errata OGN-010: find-string not found\n    at applyErrata (file:///x)\n\nNode.js v22.12.0\n";
    const out = run(allKnown(), { legality, buildExit: 1, buildErr: stderr });
    expect(out.map((c) => c.kind)).toEqual(["build"]);
    expect(out[0]!.labels).toEqual(["refresh", "bug", "data", "ready", "P1"]);
    expect(out[0]!.key).toBe(refreshKey("build", "Error: errata OGN-010: find-string not found"));
  });
});

describe("refreshKey", () => {
  it("the same change twice gives the same key, whatever the order", () => {
    expect(refreshKey("cards", { added: ["B", "A"], removed: [], changed: ["C"] })).toBe(
      refreshKey("cards", { added: ["A", "B"], removed: [], changed: ["C"] }),
    );
    const e1 = { side: "+", entry: { name: "X" } };
    const e2 = { side: "-", entry: { name: "Y" } };
    expect(refreshKey("legality", [e1, e2])).toBe(refreshKey("legality", [e2, e1]));
    const s = allKnown();
    delete s.news[RADIANCE_BANS];
    expect(run(s)).toEqual(run(s));
    expect(refreshKey("cards", { added: ["A"], removed: [], changed: [] })).not.toBe(refreshKey("cards", { added: [], removed: ["A"], changed: [] }));
  });

  it("a build failure is keyed by its Error line, not by Node's version footer", () => {
    expect(buildErrorLine("x\nError: boom\n    at f\n\nNode.js v22.1.0\n")).toBe("Error: boom");
    expect(buildErrorLine("TypeError: Cannot read properties of undefined (reading 'id')\nNode.js v22.1.0")).toBe(
      "TypeError: Cannot read properties of undefined (reading 'id')",
    );
  });
});

describe("data/sources.json", () => {
  const sources: Sources = JSON.parse(readFileSync(new URL("../data/sources.json", import.meta.url), "utf8"));
  it("has the documented shape", () => {
    for (const group of [sources.rules, sources.news]) {
      for (const e of Object.values(group)) {
        expect(["ingested", "not-applicable", "unaccounted"]).toContain(e.status);
        expect(e.read).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(e.issue === null || Number.isInteger(e.issue)).toBe(true);
      }
    }
    expect(Object.keys(sources.rules)).toEqual([CORE, TOURNAMENT]);
  });
});
