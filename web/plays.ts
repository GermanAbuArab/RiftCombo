/**
 * The run plays view (#206).
 *
 * A play is a DOCUMENT, not a record: the markdown in `docs/plays/` is the single source of truth,
 * `scripts/web-plays.mjs` ships it verbatim, and this walks the tree `src/markdown.ts` parses it
 * into. Nothing here builds markup out of strings — every node is `createElement` and every piece of
 * document text goes in through `textContent` — so no sentence of a play can ever be interpreted as
 * HTML, which is what the site's Content-Security-Policy already assumes and cannot itself enforce.
 *
 * The payload is fetched rather than bundled — 39 KB of prose has no business inside app.js, and a
 * separate file is separately cacheable — but it is fetched at boot rather than on the first visit to
 * the view, because the combo drawer asks it a question ("is there a play about this line?") that can
 * be asked before anyone opens Run plays at all. A link that is sometimes missing is a correctness
 * problem; 39 KB against cards.json's 652 KB is not a performance one.
 */
import { parseMarkdown, resolvePlayHref, type Block, type Span } from "../src/markdown.js";
import { onRoute, type Route } from "./router.js";

export interface Play {
  slug: string;
  date: string;
  title: string;
  lede: string;
  markdown: string;
}

let host: HTMLElement | null = null;
let plays: Play[] | null = null;
let slugs: ReadonlySet<string> = new Set();
let loading: Promise<void> | null = null;
let failed = false;
/** The catalogue's entry ids, so a hyphenated phrase in a play is never mistaken for one. */
let knownCombos: ReadonlySet<string> = new Set();
let current: Route | null = null;

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};

export function initPlays(opts: { comboIds?: ReadonlySet<string> } = {}): void {
  host = document.querySelector<HTMLElement>("#plays-host");
  if (opts.comboIds) knownCombos = opts.comboIds;
  onRoute((r) => {
    current = r;
    if (r.view === "plays") render();
  });
  void load();
}

async function load(): Promise<void> {
  if (!loading) {
    loading = (async () => {
      try {
        const res = await fetch("/data/plays.json");
        if (!res.ok) throw new Error(String(res.status));
        plays = ((await res.json()) as { plays: Play[] }).plays;
        slugs = new Set(plays.map((p) => p.slug));
      } catch {
        failed = true;
      }
    })();
  }
  render(); // the "Loading…" state, so the view is never blank while the fetch is in flight
  await loading;
  render();
}

/**
 * The catalogue entry a play is ABOUT: the first one it names, or null for a play that names none.
 *
 * The id is read out of the prose rather than carried in a field of either file, so a play and an
 * entry stay independently editable — renaming an entry breaks the link at the next build instead of
 * leaving a field pointing at nothing. Ids are written in backticks in every play, which is also what
 * stops an ordinary hyphenated phrase being read as one, and the result is intersected with the ids
 * the catalogue actually holds.
 *
 * FIRST, and the rule was measured rather than guessed. Every id in the corpus is named exactly ONCE,
 * so frequency separates nothing; what separates them is position. A play states its subject before
 * it digresses — "Built on `yasuo-windrider-ride-the-wind-chain`" in the lede, "Price
 * `tryndamere-brambleback-conquer` against this clock" as a section's opening imperative — while its
 * later mentions are citations of OTHER lines: the Chaos/Order play names three more entries in a
 * closing paragraph about a defect in one of this project's scripts, and it is not about any of them.
 * Linking all four would tell a reader of `time-warp-hold-burst` that there is a play about their
 * line, and there is not. The cost is a play about two lines losing the second, which is the right
 * way round: a missing link is legible and a false one is not.
 *
 * Naming none is a normal answer and half the corpus does it — a play about a deck's idle mana is
 * about slack rather than about a line. Both sides return nothing then, and neither draws a heading.
 */
export function subjectOf(play: Play): string | null {
  return comboIdsIn(play, knownCombos)[0] ?? null;
}

/** The plays whose subject is one of these entries, in payload order. Usually none. */
export function playsAbout(comboIds: Iterable<string>): { slug: string; title: string }[] {
  if (!plays) return [];
  const wanted = new Set(comboIds);
  return plays
    .filter((p) => { const s = subjectOf(p); return s !== null && wanted.has(s); })
    .map((p) => ({ slug: p.slug, title: p.title }));
}

function render(): void {
  if (!host || current?.view !== "plays") return;
  host.replaceChildren();
  if (failed) {
    host.append(el("h1", undefined, "Run plays"), notice("The plays could not be loaded. Reload the page to try again."));
    return;
  }
  if (!plays) {
    host.append(el("h1", undefined, "Run plays"), notice("Loading…"));
    return;
  }
  const slug = current.playSlug;
  if (!slug) return void host.replaceChildren(...index(plays));
  const play = plays.find((p) => p.slug === slug);
  // A slug nobody carries is a link that went stale, so it says so and offers the index rather than
  // leaving the reader on a page with a heading and nothing under it.
  if (!play) {
    host.append(el("h1", undefined, "Run plays"), notice(`There is no play at “${slug}”.`), backLink("All plays"));
    return;
  }
  host.replaceChildren(...document_(play));
  // The router has already set the view's generic title; the play narrows it to its own.
  document.title = `${play.title} — RiftCombo`;
}

const notice = (text: string) => el("p", "play-notice", text);

function backLink(label: string): HTMLAnchorElement {
  const a = el("a", "play-back");
  a.href = "#/plays";
  a.textContent = `← ${label}`;
  return a;
}

/**
 * The index. A play's own title is a verdict — "denial is a wash, removal is a turn" — so the list is
 * titles and ledes rather than a table: there is nothing to sort by that the titles do not say.
 */
function index(all: Play[]): Node[] {
  const out: Node[] = [el("h1", undefined, "Run plays")];
  out.push(
    el(
      "p",
      "play-intro",
      "A combo entry prices a line. A run play prices a game: turn by turn, with the mana, against an " +
        "opponent who is doing something. Each one below states what it checked, what it found, and where " +
        "it was wrong.",
    ),
  );
  const list = el("ul", "play-list");
  for (const p of all) {
    const item = el("li", "play-item");
    const link = el("a", "play-link");
    link.href = `#/plays/${p.slug}`;
    link.append(el("span", "play-item-title", p.title));
    const time = el("time", "play-item-date", p.date);
    time.dateTime = p.date;
    link.append(time);
    item.append(link, el("p", "play-item-lede", p.lede));
    list.append(item);
  }
  out.push(list);
  return out;
}

/**
 * One play. The document's own h1 is dropped and replaced with the title the index shows, so the two
 * surfaces agree and the view keeps exactly one h1: the files are filed under a "Play — " prefix,
 * which is a filing convention and pure repetition inside a view already called Run plays.
 */
function document_(play: Play): Node[] {
  const blocks = parseMarkdown(play.markdown);
  const body = blocks[0]?.kind === "heading" && blocks[0].level === 1 ? blocks.slice(1) : blocks;
  return [backLink("All plays"), el("h1", undefined, play.title), ...body.map(block)];
}

function block(b: Block): Node {
  switch (b.kind) {
    case "heading": {
      // The document's remaining headings start at h2 whatever they were written as, because its own
      // h1 has been replaced: a play that opened a section with `#` would otherwise give the page two.
      const tag = (["h2", "h2", "h3", "h4", "h5", "h6"][Math.min(b.level, 6) - 1] ?? "h2") as "h2";
      return inlineInto(el(tag), b.spans);
    }
    case "para":
      return inlineInto(el("p"), b.spans);
    case "rule":
      return el("hr");
    case "code":
      return el("pre", "play-pre", b.text);
    case "list": {
      const list = el(b.ordered ? "ol" : "ul", "play-list-block");
      for (const item of b.items) list.append(inlineInto(el("li"), item));
      return list;
    }
    case "quote": {
      const quote = el("blockquote", "play-quote");
      for (const p of b.paragraphs) quote.append(inlineInto(el("p"), p));
      return quote;
    }
    case "table":
      return table(b.head, b.rows);
  }
}

/**
 * Tables are the construct the plays lean on hardest — 71 rows across four documents — and half of
 * them open with an empty header row (`| | |`), which is how a two-column definition list is written
 * in markdown. Drawing a header band with nothing in it would be drawing the author's punctuation, so
 * a head whose every cell is empty is left out.
 */
function table(head: Span[][], rows: Span[][][]): Node {
  const wrap = el("div", "play-table-wrap");
  const t = el("table", "play-table");
  const labelled = head.some((cell) => cell.length > 0);
  if (labelled) {
    const thead = el("thead");
    const tr = el("tr");
    for (const cell of head) tr.append(inlineInto(el("th"), cell));
    thead.append(tr);
    t.append(thead);
  }
  const tbody = el("tbody");
  for (const row of rows) {
    const tr = el("tr");
    for (const cell of row) tr.append(inlineInto(el("td"), cell));
    tbody.append(tr);
  }
  t.append(tbody);
  wrap.append(t);
  return wrap;
}

function inlineInto<T extends HTMLElement>(node: T, spans: Span[]): T {
  for (const s of spans) node.append(span(s));
  return node;
}

function span(s: Span): Node {
  switch (s.kind) {
    case "text":
      return document.createTextNode(s.text);
    case "code":
      return el("code", "play-code", s.text);
    case "strong":
      return inlineInto(el("strong"), s.spans);
    case "em":
      return inlineInto(el("em"), s.spans);
    case "link": {
      const href = resolvePlayHref(s.href, slugs);
      // A link we will not follow keeps its words and loses its underline. A reader can tell a
      // missing link from a broken one and cannot tell a dead address from a bug.
      if (href === null) return inlineInto(el("span"), s.spans);
      const a = el("a");
      a.href = href;
      if (/^https?:/.test(href)) {
        a.rel = "noopener noreferrer";
        a.target = "_blank";
      }
      return inlineInto(a, s.spans);
    }
  }
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
