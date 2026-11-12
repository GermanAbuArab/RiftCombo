/**
 * The run plays the combo drawer links to (#206).
 *
 * A play is a DOCUMENT, not a record: the markdown in `docs/plays/` is the single source of truth,
 * `scripts/web-plays.mjs` ships it verbatim, and `src/render/play.ts` turns it into the public page
 * at /plays/<slug> (#286). Since the path router (#287) that page is the only place a play is drawn:
 * the app shell links to it with a full load and renders no plays view of its own (#575).
 *
 * What the shell still needs is the payload, because the combo drawer asks it a question ("is there a
 * play about this line?"). It is fetched rather than bundled — 39 KB of prose has no business inside
 * app.js, and a separate file is separately cacheable — and fetched at boot, because the drawer can
 * be opened before anything else asks. A link that is sometimes missing is a correctness problem;
 * 39 KB against cards.json's 652 KB is not a performance one.
 */
import { comboIdsIn, type Play } from "../src/render/play.js";

export { comboIdsIn, type Play };

let plays: Play[] | null = null;
let loading: Promise<void> | null = null;
/** The catalogue's entry ids, so a hyphenated phrase in a play is never mistaken for one. */
let knownCombos: ReadonlySet<string> = new Set();

/**
 * Fetch the payload once. A failed fetch leaves `plays` null, so the drawer draws no Run plays
 * section rather than a broken one.
 */
export function loadPlays(opts: { comboIds?: ReadonlySet<string> } = {}): Promise<void> {
  if (opts.comboIds) knownCombos = opts.comboIds;
  loading ??= (async () => {
    try {
      const res = await fetch("/data/plays.json");
      if (!res.ok) throw new Error(String(res.status));
      plays = ((await res.json()) as { plays: Play[] }).plays;
    } catch {
      plays = null;
    }
  })();
  return loading;
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
