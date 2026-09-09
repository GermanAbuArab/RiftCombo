import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Every rule paragraph this catalogue cites has to exist in a rules document we ship.
 *
 * Written 2026-09-09 after the #137 citation audit swept all of them by hand and found one defect
 * (`485.4a` for `485.4.a`, a missing dot, in two entries) plus a misattribution inside a note written
 * that same morning to correct a misattribution. Nothing in `test/` checked a rule reference before,
 * so both survived review; the sweep is cheap enough to run on every commit instead.
 *
 * Three things make this test correct rather than merely green, and each one is a trap that has
 * already cost this project time:
 *
 * 1. BOTH rules documents. `703.3.a.3` is a Tournament Rules paragraph, labelled as such at both use
 *    sites. A Core-Rules-only probe reports every Tournament Rules citation as missing.
 * 2. The anchor is `^\s*`, never `^`. The Core Rules carry 120 form-feed page breaks and 89 headings
 *    sit immediately after one, where a bare `^` cannot see them — JavaScript's `^` matches after a
 *    newline, not after a `\f`. Measured: 57 of those 89 are invisible to the bare anchor and 25 of
 *    the 57 are cited by `data/combos.json`, among them `143.4.a`, `170.11.a`, `190.6.b`, `377.2.b`
 *    and `416.3`. With the wrong anchor this test would fail 25 correct citations and someone would
 *    "fix" the data. `\s` matches `\f`, which is what makes the safe form safe.
 * 3. The tokenizer, not an exclusion list, is where a non-reference gets dropped. `probe-500-899.md`
 *    in a source title used to tokenize as the reference `899.md`. The fix is that a sub-part of a
 *    real paragraph number is a run of digits or a SINGLE letter — verified against all 2,381 distinct
 *    headings in the Core Rules, none of which has a multi-letter sub-part — so `.md` cannot match.
 *    An exclusion would have hidden the whole class; this drops exactly the artifact.
 */
const root = new URL("..", import.meta.url);
const core = readFileSync(new URL("data/Riftbound-Core-Rules-2026-07-16.txt", root), "utf8");
const tournament = readFileSync(new URL("data/Riftbound-Tournament-Rules-2026-07-16.txt", root), "utf8");

/**
 * A paragraph number: three digits, then sub-parts that are a run of digits with an optional single
 * trailing letter, or a single letter.
 *
 * The optional trailing letter is deliberate and load-bearing: `485.4a` (a real defect this audit
 * found, a missing dot in `485.4.a`) must TOKENIZE so that it can then fail to resolve. A first
 * version required sub-parts to be digits-or-one-letter and silently stopped seeing `485.4a`
 * altogether, so the test went green on the exact defect it was written for. Verified by injecting
 * both `485.4a` and `999.9.z` into a copy of the catalogue: the test must name both.
 *
 * `.md` still cannot match — two letters — which is what keeps `probe-500-899.md` out.
 */
const REF = /\b\d{3}\.(?:\d+[a-z]?|[a-z])(?:\.(?:\d+[a-z]?|[a-z]))*\b/g;

const anchored = (ref: string) => new RegExp("^\\s*" + ref.replace(/\./g, "\\.") + "(\\.|\\s)", "m");
/**
 * Memoised: each probe scans ~1 MB, and the catalogue cites ~900 distinct paragraphs across several
 * thousand mentions. Resolving per mention instead of per paragraph times the suite out.
 */
const cache = new Map<string, boolean>();
const resolves = (ref: string): boolean => {
  let hit = cache.get(ref);
  if (hit === undefined) {
    hit = anchored(ref).test(core) || anchored(ref).test(tournament);
    cache.set(ref, hit);
  }
  return hit;
};

/**
 * Deliberate non-references, each with the reason it is here. Kept as small as possible: an exclusion
 * that hides a real class is worse than a noisy test.
 */
// `NNN.x` is this project's idiomatic way of naming a whole block ("what a battlefield token is for
// 190.x"). CLAUDE.md writes it the same way. It is prose, not a citation, and cannot resolve.
const BLOCK_WILDCARD = /^\d{3}(\.[0-9a-z]+)*\.x$/;

// One entry quotes a Reddit commenter VERBATIM who cited `444.1.a.2` and "Rule 432" from an older
// numbering (in these rules 444 is Pay and has no .1.a.2; 432 is Doubling). The quote must stay
// verbatim and the entry carries a notable saying so. Scoped to the ENTRY, deliberately not to the
// rule number: if anyone writes 444.1.a.2 anywhere else, this test must still fire.
const OLD_NUMBERING_ENTRY = "jhin-fiora-facebreaker-recall";

type Hit = { ref: string; id: string; path: string };

function collect(file: string, entries: { id: string }[]): Hit[] {
  const hits: Hit[] = [];
  const walk = (node: unknown, id: string, path: string) => {
    if (typeof node === "string") {
      for (const ref of node.match(REF) ?? []) hits.push({ ref, id, path });
    } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, id, `${path}[${i}]`));
    else if (node && typeof node === "object")
      for (const [k, v] of Object.entries(node)) walk(v, id, `${path}.${k}`);
  };
  for (const e of entries) walk(e, e.id, file);
  return hits;
}

const combos = JSON.parse(readFileSync(new URL("data/combos.json", root), "utf8")) as { combos: { id: string }[] };
const synergies = JSON.parse(readFileSync(new URL("data/synergies.json", root), "utf8")) as
  | { synergies: { id: string }[] }
  | { id: string }[];
const synList = Array.isArray(synergies) ? synergies : synergies.synergies;

const hits = [...collect("combos.json", combos.combos), ...collect("synergies.json", synList)];

describe("every rule paragraph the catalogue cites exists in a rules document we ship", () => {
  it("resolves every reference, and checks enough of them to be meaningful", () => {
    const distinct = [...new Set(hits.map((h) => h.ref))];
    // A floor, not a pin: the catalogue grows. This exists because a tokenizer that silently matches
    // nothing would otherwise pass green, which is how a check dies without anyone noticing.
    expect(distinct.length).toBeGreaterThan(800);

    const unresolved = hits.filter(
      (h) => !BLOCK_WILDCARD.test(h.ref) && h.id !== OLD_NUMBERING_ENTRY && !resolves(h.ref),
    );
    // Name the offenders in the failure message: "3 unresolved" sends the next reader hunting.
    expect(
      unresolved.map((h) => `${h.ref} in ${h.id} at ${h.path}`),
      "rule references that resolve in neither rules document",
    ).toEqual([]);
  });

  it("uses an anchor that can see the headings after a form-feed page break", () => {
    // The regression guard for the anchor itself. These are real headings that a bare `^` cannot
    // reach, and all five are cited by the catalogue, so getting this wrong breaks live citations.
    for (const ref of ["143.4.a", "170.11.a", "190.6.b", "377.2.b", "416.3"]) {
      expect(new RegExp("^" + ref.replace(/\./g, "\\.") + "(\\.|\\s)", "m").test(core)).toBe(false);
      expect(resolves(ref)).toBe(true);
    }
    // 718 sits after a form feed too, and this project leans on it constantly (an attached
    // Equipment's printed Rules Text is Inactive).
    expect(resolves("718")).toBe(true);
  });

  it("reads the Tournament Rules as well as the Core Rules", () => {
    // 703.3.a.3 is the 3-copy deck rule and lives only in the Tournament Rules.
    expect(anchored("703.3.a.3").test(core)).toBe(false);
    expect(resolves("703.3.a.3")).toBe(true);
  });

  it("does not tokenize a filename tail as a paragraph number", () => {
    // `probe-500-899.md` must not read as the reference `899.md`.
    expect("docs/phase0/walks/probe-500-899.md".match(REF)).toBe(null);
    expect("cites 465.2.c.4 and 103.1.b".match(REF)).toEqual(["465.2.c.4", "103.1.b"]);
    // ...while a malformed reference still tokenizes, so that it can fail to resolve rather than
    // vanishing. `485.4a` is the missing dot the #137 audit found in two entries.
    expect("opened 485.4a and read it".match(REF)).toEqual(["485.4a"]);
    expect(resolves("485.4a")).toBe(false);
    expect(resolves("485.4.a")).toBe(true);
  });
});
