/**
 * The run plays view (#206).
 *
 * A play is a DOCUMENT, not a record: the markdown in `docs/plays/` is the single source of truth,
 * `scripts/web-plays.mjs` ships it verbatim, and `src/render/play.ts` turns it into the markup this
 * view shows — the same function the build calls for the public page at /plays/<slug> (#286), so the
 * two cannot drift. That renderer passes every piece of document text through `esc()`, so no sentence
 * of a play can ever be interpreted as HTML, which is what the site's Content-Security-Policy
 * already assumes and cannot itself enforce.
 *
 * The payload is fetched rather than bundled — 39 KB of prose has no business inside app.js, and a
 * separate file is separately cacheable — but it is fetched at boot rather than on the first visit to
 * the view, because the combo drawer asks it a question ("is there a play about this line?") that can
 * be asked before anyone opens Run plays at all. A link that is sometimes missing is a correctness
 * problem; 39 KB against cards.json's 652 KB is not a performance one.
 */
import { APP, comboIdsIn, playArticle, playsIndex, type Play } from "../src/render/play.js";
import { onRoute, type Route } from "./router.js";

export { comboIdsIn, type Play };

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
    host.append(el("h2", "doc-title", "Run plays"), notice("The plays could not be loaded. Reload the page to try again."));
    return;
  }
  if (!plays) {
    host.append(el("h2", "doc-title", "Run plays"), notice("Loading…"));
    return;
  }
  const slug = current.playSlug;
  if (!slug) return void (host.innerHTML = playsIndex(plays, { ...APP, slugs }));
  const play = plays.find((p) => p.slug === slug);
  // A slug nobody carries is a link that went stale, so it says so and offers the index rather than
  // leaving the reader on a page with a heading and nothing under it.
  if (!play) {
    host.append(el("h2", "doc-title", "Run plays"), notice(`There is no play at “${slug}”.`), backLink("All plays"));
    return;
  }
  host.innerHTML = playArticle(play, { ...APP, slugs });
  // The router has already set the view's generic title; the play narrows it to its own.
  document.title = `${play.title} — RiftCombo`;
}

const notice = (text: string) => el("p", "quiet play-notice", text);

function backLink(label: string): HTMLAnchorElement {
  const a = el("a", "play-back");
  a.href = "#/plays";
  a.textContent = `← ${label}`;
  return a;
}
