import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs shared with scripts/remap-rules.mjs, which cannot import TypeScript.
import { BOOKS, EDITIONS, HELD_ON_OLD, REREAD, catalogueText, citations, hash, legs, paragraphs } from "../scripts/rules-editions.mjs";

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
 *
 * Since #645 two editions are live and an entry's `rulesVersion` says which one its numbers name.
 * Existence is not enough for an entry moved to 2026-10-09: 260 Core numbers that changed paragraph
 * between the editions still exist in 10-09 holding other text, so a 07-16 number left behind would
 * resolve and cite the wrong rule. Those entries are checked against the committed ledger
 * (data/rules-remap-2026-10-09.json) by the TEXT each number meant; see the last describe block.
 */
const root = new URL("..", import.meta.url);
type Edition = { core: string; tournament: string };
const TEXTS: Record<string, Edition> = Object.fromEntries(
  Object.entries(EDITIONS as Record<string, Edition>).map(([v, f]) => [
    v,
    { core: readFileSync(new URL(f.core, root), "utf8"), tournament: readFileSync(new URL(f.tournament, root), "utf8") },
  ]),
);
const OLD = "2026-07-16";
const NEW = "2026-10-09";
const { core, tournament } = TEXTS[OLD]!;

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
const resolves = (ref: string, edition = OLD): boolean => {
  const key = edition + " " + ref;
  let hit = cache.get(key);
  if (hit === undefined) {
    const t = TEXTS[edition];
    if (!t) throw new Error(`no rules text for edition ${edition}`);
    hit = anchored(ref).test(t.core) || anchored(ref).test(t.tournament);
    cache.set(key, hit);
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

type Hit = { ref: string; id: string; path: string; edition: string };
type Entry = { id: string; rulesVersion?: string };

function collect(file: string, entries: Entry[], fileEdition?: string): Hit[] {
  const hits: Hit[] = [];
  const walk = (node: unknown, id: string, path: string, edition: string) => {
    if (typeof node === "string") {
      for (const ref of node.match(REF) ?? []) hits.push({ ref, id, path, edition });
    } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, id, `${path}[${i}]`, edition));
    else if (node && typeof node === "object")
      for (const [k, v] of Object.entries(node)) walk(v, id, `${path}.${k}`, edition);
  };
  for (const e of entries) walk(e, e.id, file, (fileEdition ?? e.rulesVersion) as string);
  return hits;
}

const combos = JSON.parse(readFileSync(new URL("data/combos.json", root), "utf8")) as { combos: Entry[] };
const synergies = JSON.parse(readFileSync(new URL("data/synergies.json", root), "utf8")) as {
  rulesVersion: string;
  synergies: Entry[];
};

const hits = [
  ...collect("combos.json", combos.combos),
  ...collect("synergies.json", synergies.synergies, synergies.rulesVersion),
];

describe("every rule paragraph the catalogue cites exists in a rules document we ship", () => {
  it("resolves every reference, and checks enough of them to be meaningful", () => {
    const distinct = [...new Set(hits.map((h) => h.ref))];
    // A floor, not a pin: the catalogue grows. This exists because a tokenizer that silently matches
    // nothing would otherwise pass green, which is how a check dies without anyone noticing.
    expect(distinct.length).toBeGreaterThan(800);

    const unresolved = hits.filter(
      (h) => !BLOCK_WILDCARD.test(h.ref) && h.id !== OLD_NUMBERING_ENTRY && !resolves(h.ref, h.edition),
    );
    // Name the offenders in the failure message: "3 unresolved" sends the next reader hunting.
    expect(
      unresolved.map((h) => `${h.ref} in ${h.id} at ${h.path}`),
      "rule references that resolve in neither rules document of the entry's edition",
    ).toEqual([]);
  });

  it("names a shipped edition on every entry", () => {
    expect(combos.combos.filter((e) => !(e.rulesVersion! in TEXTS)).map((e) => e.id)).toEqual([]);
    expect(synergies.rulesVersion).toBe(OLD);
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

/**
 * The #645 ledger. Per entry moved to 2026-10-09: the 07-16 numbers the move rewrote (`moved`) and,
 * per number the entry cites after it, [book, occurrences, hash of the 07-16 text it meant].
 */
type Ledger = { from: string; to: string; entries: Record<string, { moved: string[]; refs: Record<string, [string, number, string]> }> };
const ledger = JSON.parse(readFileSync(new URL("data/rules-remap-2026-10-09.json", root), "utf8")) as Ledger;

/**
 * Reworded paragraphs a re-read found to mean the same: per book and 07-16 number, the 10-09 number and
 * the hashes of both texts, or, for a paragraph Riot split, per 10-09 half its hash and the entries it holds (`into`).
 */
type Half = { as: string; ids: string[] };
type Row = { to?: string; from: string; as?: string; by: string; into?: Record<string, Half> };
type Rereads = Record<string, Record<string, Row>>;
type Leg = { id: string; to: string; from: string; as: string; by: string; ids?: string[] };
const REREADS = REREAD as Rereads;
const legsOf = legs as (rows: Record<string, Row>) => Leg[];
/** Whether a re-read reads the 07-16 text hashed `meant` as the 10-09 text hashed `now` at `num`, for the entry `who`. */
const heldAs = (rereads: Rereads, book: string, num: string, meant: string, now: string, who: string) =>
  legsOf(rereads[book] ?? {}).some((r) => r.to === num && r.from === meant && r.as === now && (!r.ids || r.ids.includes(who)));

/** Everything wrong with one moved entry against its ledger row; [] when it holds. */
function ledgerFaults(entry: Entry, row: Ledger["entries"][string], rereads: Rereads = REREADS): string[] {
  const faults: string[] = [];
  const moved = new Set(row.moved);
  const seen = new Map<string, number>();
  for (const c of citations(entry) as { kind: string; tok: string; path: string }[]) {
    if (c.kind === "wild") continue;
    const r = row.refs[c.tok];
    if (r) seen.set(c.tok, (seen.get(c.tok) ?? 0) + 1);
    else if (moved.has(c.tok)) faults.push(`${c.tok} at ${c.path} is a 07-16 number the move rewrote`);
    // A dotted number with no row was never checked against the text it meant: the /h that #645 left
    // in 435.1.g/h, a shorthand member its reader did not see, names a new 10-09 paragraph (#698).
    else if (c.kind === "ref") faults.push(`${c.tok} at ${c.path} has no ledger row`);
  }
  for (const [num, [book, count, h]] of Object.entries(row.refs)) {
    const text = (paragraphs(NEW, book) as Map<string, string>).get(num);
    if (text === undefined) faults.push(`${num} is not a ${NEW} ${book} paragraph`);
    else if (hash(text) !== h && !heldAs(rereads, book, num, h, hash(text), entry.id)) faults.push(`${num} in the ${NEW} ${book} rules is not the paragraph the entry meant`);
    if ((seen.get(num) ?? 0) < count) faults.push(`${num} cited ${seen.get(num) ?? 0} times, the ledger counts ${count}`);
  }
  return faults;
}

describe("entries moved to the 2026-10-09 rules cite the paragraphs they meant (#645 ledger)", () => {
  const byId = new Map(combos.combos.map((e) => [e.id, e]));
  const onNew = combos.combos.filter((e) => e.rulesVersion === NEW).map((e) => e.id);

  it("covers exactly the entries on 2026-10-09", () => {
    expect([ledger.from, ledger.to]).toEqual([OLD, NEW]);
    expect(onNew.length).toBeGreaterThan(100);
    expect(Object.keys(ledger.entries).sort()).toEqual([...onNew].sort());
    for (const b of BOOKS) expect((paragraphs(NEW, b) as Map<string, string>).size).toBeGreaterThan(900);
  });

  it("finds every ledger number in the 10-09 book holding the text it meant, as often as the ledger counts", () => {
    const faults = onNew.flatMap((id) => ledgerFaults(byId.get(id)!, ledger.entries[id]!).map((f) => `${id}: ${f}`));
    expect(faults).toEqual([]);
  });

  it("goes red when a moved number is put back, whether or not 10-09 reused it", () => {
    // Two injections, each into a copy of a real moved entry: one 07-16 number that 10-09 gave to
    // another paragraph (resolves, so only the ledger can catch it), one that 10-09 no longer has.
    const oldIds = new Set([...BOOKS].flatMap((b) => [...(paragraphs(OLD, b) as Map<string, string>).keys()]));
    const newIds = new Set([...BOOKS].flatMap((b) => [...(paragraphs(NEW, b) as Map<string, string>).keys()]));
    const kinds = { reused: (n: string) => newIds.has(n), gone: (n: string) => !newIds.has(n) };
    for (const [kind, test] of Object.entries(kinds)) {
      const hit = onNew
        .flatMap((id) => ledger.entries[id]!.moved.filter((n) => n.includes(".") && oldIds.has(n) && test(n)).map((n) => ({ id, n })))
        .find(({ id, n }) => {
          // The number it became, so the revert can be written into the entry.
          const to = Object.keys(ledger.entries[id]!.refs).find((k) => k !== n && JSON.stringify(byId.get(id)).includes(k));
          return to !== undefined;
        });
      expect(hit, `a moved entry with a ${kind} old number`).toBeDefined();
      const { id, n } = hit!;
      const row = ledger.entries[id]!;
      const entry = byId.get(id)!;
      expect(ledgerFaults(entry, row)).toEqual([]);
      // Revert one occurrence of each number the old one could have become.
      const json = JSON.stringify(entry);
      const reverted = Object.keys(row.refs).some((to) => {
        const at = json.search(new RegExp(`(?<![0-9.])${to.replace(/\./g, "\\.")}(?![0-9a-z]|\\.[0-9a-z])`));
        if (at < 0) return false;
        const bad = JSON.parse(json.slice(0, at) + n + json.slice(at + to.length)) as Entry;
        // The rewrite check itself, not the occurrence floor the revert also lowers.
        return ledgerFaults(bad, row).some((f) => f.startsWith(`${n} at `) && f.endsWith("the move rewrote"));
      });
      expect(reverted, `${kind}: putting ${n} back into ${id} is caught`).toBe(true);
      if (kind === "reused") expect(resolves(n, NEW)).toBe(true);
      else expect(resolves(n, NEW)).toBe(false);
    }
  });
});

describe("reworded paragraphs re-read and held let their citations move (REREAD)", () => {
  const onNew = combos.combos.filter((e) => e.rulesVersion === NEW);

  it("names the two shipped texts each verdict was read on, and an issue that holds it", () => {
    const rows = [...BOOKS].flatMap((b: string) => legsOf(REREADS[b] ?? {}).map((r) => ({ b, ...r })));
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      const was = (paragraphs(OLD, r.b) as Map<string, string>).get(r.id);
      const now = (paragraphs(NEW, r.b) as Map<string, string>).get(r.to);
      expect([was && hash(was), now && hash(now)], `${r.b} ${r.id} (${r.by})`).toEqual([r.from, r.as]);
      expect(r.from, `${r.b} ${r.id} kept its text and needs no re-read`).not.toBe(r.as);
      expect(r.by).toMatch(/^#\d+$/);
    }
  });

  it("is what clears an entry that cites one, and only for the texts it was read on", () => {
    const [id, r] = Object.entries(REREADS.core!)[0]! as [string, Leg];
    const citer = onNew.find((e) => ledger.entries[e.id]!.refs[r.to]?.[2] === r.from);
    expect(citer, `a moved entry citing core ${id}`).toBeDefined();
    const row = ledger.entries[citer!.id]!;
    expect(ledgerFaults(citer!, row)).toEqual([]);
    const meant = `${r.to} in the ${NEW} core rules is not the paragraph the entry meant`;
    expect(ledgerFaults(citer!, row, { core: {}, tournament: {} })).toContain(meant);
    expect(ledgerFaults(citer!, row, { core: { [id]: { ...r, as: "0".repeat(16) } }, tournament: {} })).toContain(meant);
  });

  it("moves a deleted paragraph's citation to the 10-09 paragraph that now says what it said (#653)", () => {
    // 07-16 429.3.a was deleted; 10-09 430.2 holds its rule. 07-16 430.2 is a Channel rule and 10-09
    // 429.3.a a Kill rule, so only the row says which text a moved entry's 430.2 stands for. 429.2's
    // row reads into 430.2 too, from another text, and does not clear a citation of 429.3.a.
    const r = REREADS.core!["429.3.a"]! as Leg;
    expect(r.to).toBe("430.2");
    const citer = onNew.find((e) => ledger.entries[e.id]!.refs[r.to]?.[2] === r.from);
    expect(citer, "a moved entry citing core 429.3.a").toBeDefined();
    const row = ledger.entries[citer!.id]!;
    expect(row.moved).toContain("429.3.a");
    expect(ledgerFaults(citer!, row)).toEqual([]);
    const { "429.3.a": _, ...rest } = REREADS.core!;
    expect(ledgerFaults(citer!, row, { core: rest, tournament: {} })).toContain(`430.2 in the ${NEW} core rules is not the paragraph the entry meant`);
  });

  it("is in the remap record row for row, a re-read that moved nothing too (#654)", () => {
    const record = readFileSync(new URL("docs/rules-diff/remap-2026-10-09.md", root), "utf8");
    const table = record.split("\n## Reworded or deleted paragraphs re-read and held\n")[1]!.split("\n## ")[0]!;
    const listed = [...table.matchAll(/^\| (\w+) (\S+) \| (\S+) \| (#\d+) \|$/gm)].map((m) => m.slice(1).join(" "));
    const rows = [...BOOKS].flatMap((b: string) => legsOf(REREADS[b] ?? {}).map((r) => `${b} ${r.id} ${r.to} ${r.by}`));
    expect(listed.sort()).toEqual(rows.sort());
  });

  it("leaves no re-read paragraph's 07-16 words in an entry on 10-09, which prints none of them (#655)", () => {
    // 07-16 464.2.d "3. The Attacker gains Focus." went: 466.2.c.1.a, 07-16 464.2.c.1.a word for word,
    // gives the Attacker Focus. The one entry it moved quoted the task, and now quotes 466.2.c.1.a.
    const r = REREADS.core!["464.2.d"]! as Leg;
    expect([r.to, hash((paragraphs(OLD, "core") as Map<string, string>).get("464.2.c.1.a")!)]).toEqual(["466.2.c.1.a", r.as]);
    const citer = onNew.find((e) => e.id === "en-garde-hand-hammer-alone-versus-pair")!;
    expect(ledger.entries[citer.id]!.refs[r.to]?.[2]).toBe(r.from);
    expect(JSON.stringify(citer)).toContain(String.raw`466.2.c.1.a: \"If a showdown opens as part of combat, this player gains Focus as the showdown begins.\"`);
    const strings = (n: unknown): string[] => (typeof n === "string" ? [n] : n && typeof n === "object" ? Object.values(n).flatMap(strings) : []);
    for (const b of BOOKS)
      for (const id of Object.keys(REREADS[b] ?? {})) {
        const was = (paragraphs(OLD, b) as Map<string, string>).get(id)!.replace(/\.$/, "");
        const re = new RegExp(was.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[‐-―−-]/g, "[‐-―−-]").replace(/ /g, "\\s+"));
        expect(onNew.filter((e) => strings(e).some((s) => re.test(s))).map((e) => e.id), `${b} ${id} in its ${OLD} words`).toEqual([]);
      }
  });
  it("moves a deleted 07-16 323.4 citation to 383.2.c.3, which takes a death trigger before the zone change (#656)", () => {
    // 07-16 323.4, Cleanup step 3a, triggered Deathknell from units with lethal damage before 3b killed
    // them. 10-09 has no such step: a trigger on leaving the board is processed just before the zone
    // change (383.2.c.3, new in 10-09), Deathknell its first example.
    const r = REREADS.core!["323.4"]! as Leg;
    expect(r.to).toBe("383.2.c.3");
    expect((paragraphs(OLD, "core") as Map<string, string>).has("383.2.c.3")).toBe(false);
    const citer = onNew.find((e) => e.id === "ledros-bird-power-discount")!;
    const row = ledger.entries[citer.id]!;
    expect([row.moved.includes("323.4"), row.refs["383.2.c.3"]?.[2]]).toEqual([true, r.from]);
    expect(ledgerFaults(citer, row)).toEqual([]);
    const { "323.4": _, ...rest } = REREADS.core!;
    expect(ledgerFaults(citer, row, { core: rest, tournament: {} })).toContain(`383.2.c.3 in the ${NEW} core rules is not the paragraph the entry meant`);
  });

  it("moves a 07-16 323.7 citation to the 10-09 half its sentence became, per citer (#656)", () => {
    // 07-16 323.7, Cleanup step 5, recalled stray gear, runes and permanents and trashed hidden cards
    // in one paragraph. 10-09 323.6 keeps the recall and 323.6.a the hidden-card sentence word for word.
    const r = REREADS.core!["323.7"]!;
    const halves = legsOf({ "323.7": r });
    expect(halves.map((l) => l.to)).toEqual(["323.6", "323.6.a"]);
    const [recall, hidden] = halves as [Leg & Half, Leg & Half];
    expect(recall.ids.filter((id) => hidden.ids.includes(id))).toEqual([]);
    const citers = onNew.filter((e) => Object.values(ledger.entries[e.id]!.refs).some(([b, , h]) => b === "core" && h === r.from));
    for (const e of citers) {
      const nums = Object.entries(ledger.entries[e.id]!.refs).filter(([, [b, , h]]) => b === "core" && h === r.from).map(([n]) => n);
      expect(nums, e.id).toEqual([recall.ids.includes(e.id) ? "323.6" : hidden.ids.includes(e.id) ? "323.6.a" : "neither"]);
    }
    for (const half of halves) {
      const e = citers.find((x) => half.ids!.includes(x.id));
      expect(e, `a moved entry citing the ${half.to} half`).toBeDefined();
      const row = ledger.entries[e!.id]!;
      expect(ledgerFaults(e!, row)).toEqual([]);
      // Listed under neither half, the entry's citation names a text no re-read was made for.
      const into = Object.fromEntries(Object.entries(r.into!).map(([to, l]) => [to, { ...l, ids: l.ids.filter((id) => id !== e!.id) }]));
      expect(ledgerFaults(e!, row, { core: { ...REREADS.core!, "323.7": { ...r, into } }, tournament: {} })).toContain(`${half.to} in the ${NEW} core rules is not the paragraph the entry meant`);
    }
  });

  it("moves a 355.7 citation and puts a Riot quote of its 07-16 words in its 10-09 words (#658)", () => {
    // 10-09 355.7 names Players and Zones, which 355.9.a and 355.10 make Targets in both editions, and
    // says that what a card Picks is not Targeted; Show Off (832.1.c, new in 10-09) is the card that picks.
    const r = REREADS.core!["355.7"]! as Leg;
    const citer = onNew.find((e) => e.id === "jae-medarda-dragon-form-flow-double-draw")!;
    const row = ledger.entries[citer.id]!;
    expect(row.refs["355.7"]?.[2]).toBe(r.from);
    expect(JSON.stringify(citer)).toContain(`355.7: '${(paragraphs(NEW, "core") as Map<string, string>).get("355.7")}'`);
    expect(ledgerFaults(citer, row)).toEqual([]);
    const { "355.7": _, ...rest } = REREADS.core!;
    expect(ledgerFaults(citer, row, { core: rest, tournament: {} })).toContain(`355.7 in the ${NEW} core rules is not the paragraph the entry meant`);
  });

  it("keeps on 07-16 an entry that prints 355.7 in its 07-16 words next to the number (#658)", () => {
    const near = new RegExp(String.raw`355\.7(?![0-9a-z]|\.[0-9a-z])[^]{0,120}?(?:${REREAD.core["355.7"].was})`);
    const strings = (n: unknown): string[] => (typeof n === "string" ? [n] : n && typeof n === "object" ? Object.values(n).flatMap(strings) : []);
    for (const id of ["blade-dancer-caitlyn-choose-ready", "jae-medarda-repulse-counter-that-pays-for-itself"]) {
      const e = combos.combos.find((x) => x.id === id)!;
      expect([e.rulesVersion, id in ledger.entries, strings(e).some((s) => near.test(s))], id).toEqual([OLD, false, true]);
    }
  });

  it("keeps on 07-16 an entry that quotes an issue's 07-16 number, which the move would renumber (#658)", () => {
    // Issue #89 wrote 415.3.a; 10-09 prints that text as 416.3.a and gives 415.3.a to other words, so a
    // move would put 416.3.a in the issue's mouth.
    const core = (v: string) => paragraphs(v, "core") as Map<string, string>;
    expect(core(NEW).get("416.3.a")).toBe(core(OLD).get("415.3.a"));
    expect(core(NEW).get("415.3.a")).not.toBe(core(OLD).get("415.3.a"));
    const e = combos.combos.find((x) => x.id === "blade-dancer-irelia-defiant-dance")!;
    expect([e.rulesVersion, e.id in ledger.entries]).toEqual([OLD, false]);
    expect(JSON.stringify(e)).toContain("it says '415.3.a gives Blade Dancer one free readying per turn'");
  });

  it("moves a 355.10.d citation, whose two legend examples went to new 355.10.g with the same answers (#658)", () => {
    const r = REREADS.core!["355.10.d"]! as Leg;
    const now = (paragraphs(NEW, "core") as Map<string, string>).get("355.10.d");
    expect((paragraphs(OLD, "core") as Map<string, string>).get("355.10.d")!.replace(/ e\.g\., “Ready your legend” .*? legends\./, "")).toBe(now);
    const g = (paragraphs(NEW, "core") as Map<string, string>).get("355.10.g")!;
    expect([(paragraphs(OLD, "core") as Map<string, string>).has("355.10.g"), g]).toEqual([false, expect.stringContaining("“Ready your legend.” doesn’t target any legend.")]);
    expect(g).toContain("“Ready a friendly legend.” targets the friendly legend.");
    const citer = onNew.find((e) => e.id === "firestorm-walking-roost-deflect-is-a-tax")!;
    const row = ledger.entries[citer.id]!;
    expect(row.refs["355.10.d"]?.[2]).toBe(r.from);
    expect(ledgerFaults(citer, row)).toEqual([]);
    const { "355.10.d": _, ...rest } = REREADS.core!;
    expect(ledgerFaults(citer, row, { core: rest, tournament: {} })).toContain(`355.10.d in the ${NEW} core rules is not the paragraph the entry meant`);
  });
});

describe("a slash shorthand cites its members too (#652)", () => {
  const toks = (notes: string) => (citations({ id: "x", notes } as Entry) as { kind: string; tok: string }[]).filter((c) => c.kind === "ref").map((c) => c.tok);

  it("reads the members after a dotted number, and nothing that only looks like one", () => {
    expect(toks("435.1.f/g/h")).toEqual(["435.1.f", "435.1.g", "435.1.h"]);
    expect(toks("369.3/370")).toEqual(["369.3"]);
    expect(toks("164.2.a/or 164.2.b")).toEqual(["164.2.a", "164.2.b"]);
  });

  it("moves a member with its head: 07-16 434.1.h is 10-09 435.1.i, printed as 435.1.f/g/i", () => {
    const id = "unsung-hero-sacrifice-double-draw";
    const entry = combos.combos.find((e) => e.id === id)!;
    const row = ledger.entries[id]!;
    expect(JSON.stringify(entry)).toContain("435.1.f/g/i");
    expect(row.refs["435.1.i"]).toEqual(["core", expect.any(Number), hash((paragraphs(OLD, "core") as Map<string, string>).get("434.1.h")!)]);
    expect(row.refs["435.1.h"]).toBeUndefined();
    expect(ledgerFaults(entry, row)).toEqual([]);
  });

  it("goes red on a member left behind its head, as #645 left 435.1.g/h (#698)", () => {
    const id = "azir-aphelios-attach";
    const entry = combos.combos.find((e) => e.id === id)!;
    const row = ledger.entries[id]!;
    expect(ledgerFaults(entry, row)).toEqual([]);
    const json = JSON.stringify(entry);
    expect(json).toContain("435.1.g/i");
    const bad = JSON.parse(json.replace("435.1.g/i", "435.1.g/h")) as Entry;
    expect(ledgerFaults(bad, row)).toContain("435.1.h at .notes has no ledger row");
  });

  it("goes back to 07-16 with its head in the catalogue text the notes readers count", () => {
    const text = catalogueText();
    // 07-16 has no 434.1.i, so a member still printed in its 10-09 form shows up as one.
    expect(text).not.toMatch(/434\.1\.[a-z](\/[a-z])*\/i(?![0-9a-z])/);
    expect(text).toContain("434.1.f/g/h");
    expect(text).toContain("434.1.c/d/f/g/h");
  });
});

describe("entries held on 2026-07-16 by id stay there, pinned in the remap record with their reason (#707)", () => {
  const held = Object.entries(HELD_ON_OLD as Record<string, string>);
  const record = readFileSync(new URL("docs/rules-diff/remap-2026-10-09.md", root), "utf8");
  const pinned = record.split("\n## Pinned entries")[1]!.split("\n").filter((l) => l.startsWith("- `"));

  it("keeps each one on 07-16 and out of the ledger, whatever its citations", () => {
    expect(held.length).toBeGreaterThan(0);
    const faults = held.flatMap(([id]) => {
      const e = combos.combos.find((x) => x.id === id);
      if (!e) return [`${id} is not in the catalogue`];
      return [...(e.rulesVersion === OLD ? [] : [`${id} names ${e.rulesVersion}`]), ...(id in ledger.entries ? [`${id} has a ledger row`] : [])];
    });
    expect(faults).toEqual([]);
  });

  it("lists each one under Pinned entries with its reason", () => {
    for (const [id, why] of held) {
      const line = pinned.find((l) => l.startsWith(`- \`${id}\` [`));
      expect(line, id).toBeDefined();
      expect(line!.slice(line!.indexOf("]: ") + 3).split("; "), id).toContain(why);
    }
  });
});
