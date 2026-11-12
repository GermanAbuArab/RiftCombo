/**
 * A run play as HTML (#286): the public page built at /plays/<slug>, and the one place a play is
 * drawn since the app shell lost its own plays view (#287, #575).
 *
 * The markdown in `docs/plays/` is the single source of truth; `src/markdown.ts` parses it into a
 * tree and this walks the tree into a string. Every piece of document text goes through `esc()` on
 * the way out — text, code, link targets, table cells — so no sentence of a play can become markup,
 * and `test/dom/plays.dom.test.ts` hands it hostile text and checks the result for elements.
 *
 * A pre-rendered page is its own document, so a play's title is the h1 and its sections start at
 * h2, and links between plays are real paths. `base` 2 was the app's plays view, whose one h1 was
 * the brand (#270); that view is gone (#575) and PAGE is the only surface left.
 */
import { esc } from "../html.js";
import { parseMarkdown, resolvePlayHref, type Block, type Span } from "../markdown.js";
import { clip, renderDocument } from "./layout.js";

export interface Play {
  slug: string;
  date: string;
  title: string;
  lede: string;
  markdown: string;
}

export interface PlaySurface {
  /** 1 on a page of its own (2 was the app's removed plays view). The title is `h<base>`, the sections one level under. */
  base: 1 | 2;
  /** Where a play's own address points: "/plays/" since the path router (#287). */
  prefix: string;
  /** Slugs a cross-link may point at; a link to any other play keeps its words and loses its href. */
  slugs: ReadonlySet<string>;
}

export const PAGE: Omit<PlaySurface, "slugs"> = { base: 1, prefix: "/plays/" };

export const PLAYS_INTRO =
  "A combo entry prices a line. A run play prices a game: turn by turn, with the mana, against an " +
  "opponent who is doing something. Each one below states what it checked, what it found, and where " +
  "it was wrong.";

function spans(list: Span[], s: PlaySurface): string {
  return list.map((x) => span(x, s)).join("");
}

function span(x: Span, s: PlaySurface): string {
  switch (x.kind) {
    case "text":
      return esc(x.text);
    case "code":
      return `<code class="play-code">${esc(x.text)}</code>`;
    case "strong":
      return `<strong>${spans(x.spans, s)}</strong>`;
    case "em":
      return `<em>${spans(x.spans, s)}</em>`;
    case "link": {
      const href = resolvePlayHref(x.href, s.slugs, s.prefix);
      // A link we will not follow keeps its words and loses its underline. A reader can tell a
      // missing link from a broken one and cannot tell a dead address from a bug.
      if (href === null) return `<span>${spans(x.spans, s)}</span>`;
      const external = /^https?:/.test(href) ? ' rel="noopener noreferrer" target="_blank"' : "";
      return `<a href="${esc(href)}"${external}>${spans(x.spans, s)}</a>`;
    }
  }
}

/**
 * Tables are the construct the plays lean on hardest, and half of them open with an empty header row
 * (`| | |`), which is how a two-column definition list is written in markdown. Drawing a header band
 * with nothing in it would be drawing the author's punctuation, so a head whose every cell is empty
 * is left out.
 */
function table(head: Span[][], rows: Span[][][], s: PlaySurface): string {
  const labelled = head.some((cell) => cell.length > 0);
  const thead = labelled ? `<thead><tr>${head.map((c) => `<th>${spans(c, s)}</th>`).join("")}</tr></thead>` : "";
  const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${spans(c, s)}</td>`).join("")}</tr>`).join("")}</tbody>`;
  return `<div class="play-table-wrap"><table class="play-table">${thead}${tbody}</table></div>`;
}

function block(b: Block, s: PlaySurface): string {
  switch (b.kind) {
    case "heading": {
      // The document's headings start one level under the title whatever they were written as: a
      // play that opened a section with `#` would otherwise sit level with its title.
      const tag = `h${Math.min(Math.max(b.level, 2) + s.base - 1, 6)}`;
      return `<${tag}>${spans(b.spans, s)}</${tag}>`;
    }
    case "para":
      return `<p>${spans(b.spans, s)}</p>`;
    case "rule":
      return "<hr>";
    case "code":
      // The newline after <pre> is the one the HTML parser drops, so a block that opens with a blank
      // line keeps it: a hand-aligned turn table is exactly as it was written or it is wrong.
      return `<pre class="play-pre">\n${esc(b.text)}</pre>`;
    case "list": {
      const tag = b.ordered ? "ol" : "ul";
      return `<${tag} class="play-list-block">${b.items.map((i) => `<li>${spans(i, s)}</li>`).join("")}</${tag}>`;
    }
    case "quote":
      return `<blockquote class="play-quote">${b.paragraphs.map((p) => `<p>${spans(p, s)}</p>`).join("")}</blockquote>`;
    case "table":
      return table(b.head, b.rows, s);
  }
}

/**
 * One play. The document's own h1 is dropped and replaced with the title the index shows, so the two
 * surfaces agree: the files are filed under a "Play — " prefix, which is a filing convention and pure
 * repetition under a heading that already says Run plays.
 */
export function playArticle(play: Play, s: PlaySurface): string {
  const blocks = parseMarkdown(play.markdown);
  const body = blocks[0]?.kind === "heading" && blocks[0].level === 1 ? blocks.slice(1) : blocks;
  const t = `h${s.base}`;
  return `<a class="play-back" href="${esc(s.prefix.replace(/\/$/, ""))}">← All plays</a>`
    + `<${t} class="doc-title">${esc(play.title)}</${t}>`
    + body.map((b) => block(b, s)).join("\n");
}

/**
 * The index. A play's own title is a verdict — "denial is a wash, removal is a turn" — so the list is
 * titles and ledes rather than a table: there is nothing to sort by that the titles do not say.
 */
export function playsIndex(plays: Play[], s: PlaySurface): string {
  const t = `h${s.base}`;
  const items = plays.map((p) => `<li class="play-item"><a class="play-link" href="${esc(s.prefix + p.slug)}"><span class="play-item-title">${esc(p.title)}</span><time class="play-item-date" datetime="${esc(p.date)}">${esc(p.date)}</time></a><p class="play-item-lede">${esc(p.lede)}</p></li>`);
  return `<${t} class="doc-title">Run plays</${t}><p class="play-intro">${esc(PLAYS_INTRO)}</p><ul class="play-list">${items.join("")}</ul>`;
}

/** Word count of a play as written, for the same thin-content line the combo pages use. */
export const playWords = (p: Play): number => p.markdown.split(/\s+/).filter(Boolean).length;

/** Titles are filed lowercase ("Play — the order is free…"); a page title starts with a capital. */
const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function playPage(play: Play, slugs: ReadonlySet<string>, noindex: boolean): string {
  return renderDocument(
    {
      path: `/plays/${play.slug}`,
      title: capital(play.title),
      description: clip(play.lede || play.title),
      section: "plays",
      noindex,
      ogType: "article",
      mainClass: "play",
    },
    playArticle(play, { ...PAGE, slugs }),
  );
}

export function playsIndexPage(plays: Play[]): string {
  return renderDocument(
    {
      path: "/plays",
      title: "Run plays",
      description: clip(`${plays.length} Riftbound games played out turn by turn: which turn a combo lands on, with the mana, against an opponent who is doing something.`),
      section: "plays",
      mainClass: "play",
    },
    playsIndex(plays, { ...PAGE, slugs: new Set(plays.map((p) => p.slug)) }),
  );
}

/** Every catalogue entry id a play names in its own text, in the order it names them. */
export function comboIdsIn(play: Play, known: ReadonlySet<string>): string[] {
  const out: string[] = [];
  // Ids are written in backticks in every play, which is also what keeps a hyphenated phrase of
  // ordinary prose from being read as one.
  for (const m of play.markdown.matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)+)`/g)) {
    const id = m[1]!;
    if (known.has(id) && !out.includes(id)) out.push(id);
  }
  return out;
}
