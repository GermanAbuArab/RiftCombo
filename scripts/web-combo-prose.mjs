// Strip agent-fleet language out of the combo prose the BROWSER gets, without touching the audited
// file the project authors.
//
// WHY THIS EXISTS. `web/main.ts:940` renders every entry's `notes` inside a <details> panel titled
// "How this entry was audited" — a transparency feature, and a good one. What it was rendering
// included sentences addressed to another agent: `NOTE FOR THE MANAGER, not a wrong verdict: …`,
// `REPORT TO THE MANAGER: this REFINES the CLAUDE.md line added 2026-09-07 …`, `at rc-manager5's
// direction after this lane raised it as a manager decision rather than staging it unilaterally`.
// Measured 2026-09-19: 127 of 771 entries, 140 sentences. That is the same defect the run plays were
// pulled for on the same day, in a second corpus nobody had looked at, and it is LIVE — `combos.json`
// is byte-identical to master, so a player can read it on the site today.
//
// WHY AT BUILD TIME AND NOT AT RENDER. `web/main.ts` imports `../data/combos.json` directly, so
// esbuild INLINES the whole file into app.js. Filtering in the render path would hide the panel and
// still ship the bytes — exactly the failure the plays fix had to avoid, where hiding the nav left
// the text readable at /data/plays.json. Stripping here means the sentences are never in the bundle.
//
// WHY NOT EDIT `data/combos.json`. That file is the audited record and the audit trail is worth
// keeping in full for us: "this lane had priced the line and then declined it" is real provenance
// about how a verdict was reached. The reader is the one who should not get it. Same shape as
// PUBLISH_PLAYS: the source stays whole, the payload is what changes.
//
// THE PREDICATE IS DELIBERATELY NARROW, AND TWO FAMILIES WERE MEASURED AND THEN DISCARDED.
//   - `staged`/`staging` matched 16 entries and every one read was the RIFTBOUND RULES TERM —
//     "no Combat is ever staged" (323.9). Dropping it would have cut rules prose.
//   - a bare `docs/phase0/walks/…` path matched 313 entries and the ones read were legitimate
//     provenance: "SOURCE READ IN FULL 2026-09-04 … the quote above confirmed verbatim". In a panel
//     whose whole job is to say how the entry was audited, citing the walk is the right answer. The
//     path not resolving on the site is an opacity problem, not a leak.
// A first union of six predicates said 433 of 771. Reading the hits took it to 127. The first number
// is always too big; this one is what survived reading.

/** Names an agent lane, or narrates agent-to-agent workflow. Nothing about the game matches this. */
export const INTERNAL =
  /\brc-(manager|walk|gap|synth|kw|builder|schema|emit|plaza|mine|qa)[a-z0-9-]*|\b(this|the|another|a sibling) lane\b|\bthe manager\b|\b(my|its|the) brief\b/i;

// Split on a period followed by whitespace and then something that can open a sentence. The
// lookahead is what keeps `i.e. the` and `e.g. a` whole (6 in the corpus) — they continue in lower
// case. A rule citation is safe without any special case, because its internal dots carry no space:
// `383.2.a.1` never splits, while `…cited at 355.10.d. The rest…` splits where it should. Measured
// over the 754 entries that have notes: 5,364 sentences, and the only residual hazard is a single
// capital used as an initial (12 occurrences), which no entry in this corpus ends a clause with.
const BOUNDARY = /(?<=\.)\s+(?=[A-Z0-9(\[`*"'“])/;

/**
 * Drop the sentences that address another agent, keep the rest verbatim.
 * Returns "" when nothing survives, so the caller can drop the field rather than render an empty one.
 */
export function stripInternal(prose) {
  if (typeof prose !== "string" || !INTERNAL.test(prose)) return prose;
  const kept = prose.split(BOUNDARY).filter((s) => !INTERNAL.test(s));
  return kept.join(" ").trim();
}

/**
 * The browser's copy of an authored JSON: strip the internal sentences out of EVERY string in it.
 *
 * Deep rather than a field list, and that is the whole point. A first version named four fields —
 * `notes`, `prerequisites.notable`, `sources[].title`, `name` — measured by walking `combos.json`.
 * It shipped a clean bundle and STILL leaked, because `web/main.ts` also imports `synergies.json`,
 * which nobody had walked and which carries the same thing in `partner.excludes[].why`. One file was
 * audited and the sibling next to it was not. A field list is a snapshot of the shapes that existed
 * the day it was written; walking every string cannot go stale that way, and a field added tomorrow
 * is covered without anyone remembering to add it. Same lesson `scripts/web-card-fields.mjs` carries
 * from the other side, where a field MISSING from the list reached the browser as undefined twice.
 *
 * FAIL-SAFE, NOT FAIL-QUIET, AND THE TWO POSITIONS DIFFER. A string that is an OBJECT VALUE — a
 * name, a title — has nowhere to go if it strips to nothing, and an empty heading is worse than the
 * leak it fixed, so it is left ALONE and repaired by hand in the authored file instead (twelve were,
 * on 2026-09-19). A string that is an ARRAY ELEMENT is a bullet in a list, and a list is simply one
 * bullet shorter, so that one IS dropped. Collapsing the two cases into one fail-safe rescued a
 * notable that is nothing but a note to another agent and put it back in the bundle.
 * What makes the hand-repaired half safe is that `test/web-payload.test.ts` asserts the built bundle
 * contains NO match at all, so a case this cannot clean turns the suite red and asks for a human.
 */
export function stripInternalDeep(node) {
  if (typeof node === "string") {
    const out = stripInternal(node);
    return out === "" && node !== "" ? node : out;
  }
  // An array element may vanish: `.map(stripInternal)` rather than the recursive call, so a bullet
  // that is entirely internal is dropped instead of being rescued by the object-value fail-safe.
  if (Array.isArray(node))
    return node.map((v) => (typeof v === "string" ? stripInternal(v) : stripInternalDeep(v))).filter((v) => v !== "");
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = stripInternalDeep(v);
    return out;
  }
  return node;
}
