/**
 * Every public page the build writes (#286), as data: where it is served, the file that serves it,
 * its HTML, whether it is kept out of search, and the repo paths whose last commit dates it.
 *
 * `scripts/build-web.mjs` calls this once, writes each page, and builds the sitemap from the result,
 * so the sitemap can only list a page that was written. Under `cleanUrls` Vercel serves
 * `combos/<id>.html` at /combos/<id> and `combos.html` at /combos.
 */
import { CardIndex } from "../cards.js";
import type { Card, Combo, Feature, LegalityEntry } from "../types.js";
import { authoredWords, comboPage, combosIndexPage, THIN_WORDS, type ComboContext } from "./combo.js";
import { aboutPage, cardDataNote, guidePage, sourcesPage } from "./pages.js";
import { comboIdsIn, playPage, playsIndexPage, playWords, type Play } from "./play.js";

export interface SiteInput {
  /** Already through `stripInternalDeep`, as the bundle's copy is. */
  combos: Combo[];
  cards: Card[];
  legality: LegalityEntry[];
  features: Feature[];
  /** Each with the repo path of its markdown, which dates its page. */
  plays: (Play & { file: string })[];
  resultsUpdatedAt: string;
}

export interface BuiltPage {
  path: string;
  /** Relative to the output directory. */
  file: string;
  html: string;
  noindex: boolean;
  /** Repo paths whose newest commit is the page's lastmod. */
  sources: string[];
}

/** "/combos/x" → "combos/x.html". */
export const fileOf = (path: string): string => `${path.replace(/^\//, "")}.html`;

const page = (path: string, html: string, sources: string[], noindex = false): BuiltPage =>
  ({ path, file: fileOf(path), html, noindex, sources });

/** The words of a page that carry it, for the thin-content line. */
const isThin = (words: number) => words < THIN_WORDS;

export function renderSite(input: SiteInput): BuiltPage[] {
  const cards = new CardIndex(input.cards, input.legality);
  const features = new Map(input.features.map((f) => [f.id, f]));
  const ids = new Set(input.combos.map((c) => c.id));
  // A play is about the first entry it names (`subjectOf` in web/plays.ts, where the rule is argued).
  const about = new Map<string, { slug: string; title: string }[]>();
  for (const p of input.plays) {
    const subject = comboIdsIn(p, ids)[0];
    if (subject) about.set(subject, [...(about.get(subject) ?? []), { slug: p.slug, title: p.title }]);
  }
  const ctx: ComboContext = {
    card: (base) => cards.get(base),
    feature: (id) => features.get(id),
    playsAbout: (id) => about.get(id) ?? [],
  };
  const slugs = new Set(input.plays.map((p) => p.slug));
  const candidates = input.combos.some((c) => c.status !== "verified");
  const CATALOGUE = ["data/combos.json", "data/cards.json"];

  return [
    page("/combos", combosIndexPage(input.combos, ctx), ["data/combos.json"]),
    ...input.combos.map((c) => page(`/combos/${c.id}`, comboPage(c, ctx), CATALOGUE, isThin(authoredWords(c)))),
    page("/plays", playsIndexPage(input.plays), ["docs/plays"]),
    ...input.plays.map((p) => {
      const thin = isThin(playWords(p));
      return page(`/plays/${p.slug}`, playPage(p, slugs, thin), [p.file], thin);
    }),
    page("/guide", guidePage(candidates), ["src/render/pages.ts"]),
    page("/sources", sourcesPage(candidates, cardDataNote(input.resultsUpdatedAt, input.cards.length, input.combos)), ["src/render/pages.ts", "data/cards.json"]),
    page("/about", aboutPage(), ["src/render/pages.ts"]),
  ];
}
