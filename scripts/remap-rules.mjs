// Move catalogue entries from the 2026-07-16 rules to the 2026-10-09 rules BY TEXT IDENTITY (#645).
//
//   node scripts/remap-rules.mjs --dry     print what would move and why the rest stays, write nothing
//   node scripts/remap-rules.mjs           rewrite data/combos.json, write the ledger and the record
//   node scripts/remap-rules.mjs --run '#<issue>'   the same on top of earlier runs, named in the record
//
// The ruling on #645 (orch-meta-34, comment 6925629383, narrowed on 6925697815): only citations whose
// paragraph text is identical in both editions (renumbered) or differs only in a moved cross-reference
// (xref) are remapped, and never by number. A cluster follow-up of #645 that re-reads a reworded
// paragraph and finds its meaning held, or finds a deleted paragraph's rule at another 10-09 number,
// adds it to `REREAD` (scripts/rules-editions.mjs), and its citations then move the same way (#652:
// 164.2.a and 164.2.b; #653: 429.2 and 429.3.a to 430.2, 429.2.a to 430.2.a; #654: 477.1.b.1.b to
// 479.1.b, 477.2 to 479.3, 477.3 to 479.4; #655: 464.2.b to 466.2.b, 464.2.d to 466.2.c.1.a,
// 464.2.e to 466.2.d; #656: 323.4 to 383.2.c.3, 323.5 to 323.4, 323.8 to 323.7, 323.9 to 323.8, and
// 323.7 split, per citer, into 323.6 and 323.6.a; #658: 355.7, 355.10.d and 355.11.b; #657: 465.2.c.3 to 467.2.c.3, 465.2.c.5 to
// 467.2.c.5). The data marks the edition per ENTRY (`rulesVersion`), so
// the pin is per entry: an entry that cites any paragraph Riot reworded or deleted keeps every number
// and `rulesVersion: "2026-07-16"`, and an entry whose every citation kept its text moves whole.
// data/synergies.json carries one `rulesVersion` for the file and stays on 07-16.
//
// An entry also stays pinned when moving it cannot be done by text identity alone:
//   - several numbers hold the cited text in 10-09 (`to` has a " | ") and none of them is the only one
//     under where the old parent paragraph went, so there is no single target;
//   - a number exists in both books, its sentence names neither, the entry names the Tournament Rules
//     somewhere, and the two readings move differently (an entry that never names them cites Core);
//   - a string names the 07-16 edition next to a number that would change (a walk title, a note);
//   - a quotation would stop matching the 10-09 text (listed in QUOTE_PINS, found by
//     test/source-quotes.test.ts on the first run: a rule number INSIDE Riot's own words);
//   - a dotted number resolves in neither 07-16 book (the old-numbering quote in OLD_NUMBERING);
//   - a string quotes an issue's words, translated, with a 07-16 number in them that would change
//     (ISSUE_QUOTES): the number is the issue's and stays as the issue wrote it;
//   - its id is held on 07-16 with a reason (HELD_ON_OLD in scripts/rules-editions.mjs): a walk made
//     on the 07-16 rules that the same words in 10-09 do not settle (#707: R36, #706).
//
// An entry walked again BY HAND on the 10-09 rules (`walkedVersion: "2026-10-09"`, #708) is outside
// the remap: its numbers come from the walk, not from text identity, so it has no ledger row (a row
// an earlier run wrote for it is dropped) and the record lists it under its own heading with the walk
// that moved it. Those are the entries a pin by a reworded paragraph can only leave through.
//
// Output: data/rules-remap-2026-10-09.json, the ledger test/rule-refs.test.ts reads (per remapped entry,
// the old numbers it moved and, per cited number, the book and a hash of the 07-16 text it meant), and
// docs/rules-diff/remap-2026-10-09.md, the record of every entry moved or pinned and why.
import fs from "node:fs";
import { citations, fates, hash, legs, parseText, EDITIONS, BOOKS, REREAD, HELD_ON_OLD } from "./rules-editions.mjs";

const FROM = "2026-07-16";
const TO = "2026-10-09";
const DRY = process.argv.includes("--dry");
const OLD_NUMBERING = new Set(["jhin-fiora-facebreaker-recall"]);
// #658: its notes say issue #89 "says '415.3.a gives Blade Dancer one free readying per turn'"; 10-09
// numbers that paragraph 416.3.a, and the issue still reads 415.3.a.
const ISSUE_QUOTES = new Set(["blade-dancer-irelia-defiant-dance"]);

const read = (v, b) => parseText(fs.readFileSync(EDITIONS[v][b], "utf8"));
const F = {}, oldText = {}, newText = {};
const first = (paras) => {
  const m = new Map();
  for (const p of paras) if (!m.has(p.id)) m.set(p.id, p.norm);
  return m;
};
for (const b of BOOKS) {
  const [A, B] = [read(FROM, b), read(TO, b)];
  [oldText[b], newText[b]] = [first(A), first(B)];
  F[b] = new Map();
  for (const r of fates(A, B).rows) if (!F[b].has(r.id)) F[b].set(r.id, r);
}

/** Where an old number goes in one book, cited by the entry `who`: { to } or { pin: reason }. */
function target(book, id, who) {
  const r = F[book].get(id);
  if (!r) return { pin: `${id} is not a ${book} paragraph` };
  if (r.fate === "same") return { to: id };
  if (r.fate === "renumbered" && r.to.includes(" | ")) {
    // Riot prints the same sentence under several numbers (each Mode of Play's "Battlefield Count").
    // The one that sits under where the old parent went is the same paragraph; anything else is a guess.
    const parent = id.replace(/\.[^.]+$/, "");
    const pt = parent !== id ? target(book, parent, who) : {};
    const under = pt.to ? r.to.split(" | ").filter((x) => x.replace(/\.[^.]+$/, "") === pt.to) : [];
    if (under.length === 1) return { to: under[0] };
    return { pin: `${book} ${id}: its text sits at ${r.to} in ${TO}` };
  }
  if (r.fate === "renumbered" || r.fate === "xref") return { to: r.to };
  // A deleted paragraph has no 10-09 counterpart of its own: its row names the paragraph that now
  // says what it said (#653: 429.3.a is 430.2). A reworded one's row may name another number than
  // the diff's nearest match, which pairs 07-16 477.2 "2. Ability-Altering Effects" with 10-09 479.2
  // "2. Trait-Altering Effects" on the shared ordinal (#654: the layer is 479.3). A split one's row
  // names the half each citer's sentence went to (#656: 323.7 is 323.6 and 323.6.a).
  const held = legs(REREAD[book]).filter((l) => l.id === id);
  if ((r.fate === "reworded" || r.fate === "deleted") && held.length) {
    for (const l of held) {
      const as = newText[book].get(l.to);
      if (l.from !== hash(r.old) || as === undefined || l.as !== hash(as)) throw new Error(`REREAD ${book} ${id} (${l.by}) was read on other texts than ${FROM} ${id} and ${TO} ${l.to}`);
    }
    const leg = held.find((l) => !l.ids || l.ids.includes(who));
    if (!leg) return { pin: `${book} ${id} split in ${TO} into ${held.map((l) => l.to).join(" and ")}, and its row lists ${who} under neither` };
    return { to: leg.to, reread: `${book} ${id}` };
  }
  return { pin: `${book} ${id} ${r.fate} in ${TO}` };
}

const LABEL = /\b(Core|CR|Tournament|TR)\b/g;
/** The book a token names: the last book label earlier in its sentence, else its source's title, else the one book that has it. */
function bookOf(c, entry) {
  const inB = BOOKS.filter((b) => oldText[b].has(c.tok));
  const start = Math.max(0, ...[". ", "; ", "\n"].map((d) => c.str.lastIndexOf(d, c.at) + 1));
  const labels = [...c.str.slice(start, c.at).matchAll(LABEL)].map((m) => (/^(Core|CR)$/.test(m[1]) ? "core" : "tournament"));
  const said = labels.at(-1);
  if (said && inB.includes(said)) return { book: said };
  const src = /^\.sources\[(\d+)\]/.exec(c.path);
  const title = src ? entry.sources[+src[1]]?.title ?? "" : "";
  const titled = /Tournament Rules/.test(title) && !/Core Rules/.test(title) ? "tournament" : /Core Rules/.test(title) && !/Tournament Rules/.test(title) ? "core" : null;
  if (titled && inB.includes(titled)) return { book: titled };
  if (inB.length === 1) return { book: inB[0] };
  if (!inB.length) return { book: null };
  // Measured at #645: of 41 Tournament-only numbers the catalogue cites, 32 carry a Tournament label
  // within 300 characters and the other 9 sit in entries that name the Tournament Rules elsewhere. An
  // entry that never names them cites the Core Rules.
  if (!/Tournament|\bTR\b/.test(JSON.stringify(entry))) return { book: "core" };
  const [a, b] = [target("core", c.tok, entry.id), target("tournament", c.tok, entry.id)];
  if (a.to !== undefined && a.to === b.to) return { book: "core", guessed: true };
  return { book: "core", pin: `${c.tok} is in both books, its sentence names neither, and the two readings move differently` };
}

const RIOT_TITLE = {
  core: [`Riftbound Core Rules, Last Updated ${FROM} (data/Riftbound-Core-Rules-${FROM}.txt)`, `Riftbound Core Rules, Last Updated ${TO} (data/Riftbound-Core-Rules-${TO}.txt)`],
  tournament: [`(data/Riftbound-Tournament-Rules-${FROM}.txt)`, `(data/Riftbound-Tournament-Rules-${TO}.txt)`],
};

/**
 * A re-read paragraph's 07-16 words, as a quote may print them (any dash, any spacing, no final period),
 * and the 10-09 words at its `to`; null for a split one, whose whole words no one 10-09 paragraph holds.
 */
const wording = (book, id) => {
  if (!REREAD[book][id].to) return null;
  const r = F[book].get(id);
  const bare = (t) => t.replace(/\.$/, "");
  const re = bare(r.old).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[‐-―−-]/g, "[‐-―−-]").replace(/ /g, "\\s+");
  return [new RegExp(re, "g"), bare(newText[book].get(REREAD[book][id].to))];
};
/**
 * Whether the string at `path` speaks for itself about the `book` rules: the entry's own prose, or a
 * Riot quote whose title moves to 10-09 with the entry. A hand walk or a post is quoted as written.
 */
const ownWords = (entry, path, book) => {
  const src = /^\.sources\[(\d+)\]\.(\w+)/.exec(path);
  if (!src) return true;
  const s = entry.sources[+src[1]];
  return src[2] === "quote" && s?.kind === "riot" && typeof s.title === "string" && s.title.includes(RIOT_TITLE[book][0]);
};
/** `s` with each re-read paragraph's 07-16 words in its 10-09 words, where `path` speaks for itself. */
const reword = (entry, path, s, rereads) => {
  for (const rr of rereads) {
    const [book, id] = rr.split(" ");
    const w = wording(book, id);
    if (!w || !ownWords(entry, path, book)) continue;
    s = s.replace(w[0], () => w[1]);
  }
  return s;
};

function plan(entry) {
  const pins = new Set();
  if (OLD_NUMBERING.has(entry.id)) pins.add("quotes a commenter citing an older numbering verbatim");
  if (ISSUE_QUOTES.has(entry.id)) pins.add("quotes an issue's words with a 07-16 number that would change");
  if (HELD_ON_OLD[entry.id]) pins.add(HELD_ON_OLD[entry.id]);
  const edits = []; // { path, at, len, from, to, put? (what is printed, when not `to`) }
  const ledger = new Map(); // new number -> [book, count, hash]
  const moved = new Set();
  const rereads = new Set(); // the REREAD paragraphs this entry cites
  for (const c of citations(entry)) {
    if (c.kind === "bare" && !BOOKS.some((b) => oldText[b].has(c.tok))) continue; // not a heading: not a citation
    let book, guessed, pin, to;
    if (c.kind === "wild") {
      // `190.x` cites the whole block, so every paragraph under it has to keep its text: 190.3.a.1 is
      // reworded in 10-09, and moving an entry that cites 190.x would claim otherwise. Wildcards name
      // Core blocks; one that is also a Tournament section in an entry that names the Tournament
      // Rules cannot say which.
      const sec = target("core", c.tok, entry.id);
      const block = [...oldText.core.keys()].filter((id) => id === c.tok || id.startsWith(c.tok + "."));
      const bad = block.filter((id) => target("core", id, entry.id).pin);
      if (oldText.tournament.has(c.tok) && /Tournament|\bTR\b/.test(JSON.stringify(entry))) pins.add(`${c.tok}.x names a block in both books`);
      if (bad.length) pins.add(`${c.tok}.x: core ${bad[0]} ${F.core.get(bad[0])?.fate ?? "is not a paragraph"} in ${TO}`);
      else if (sec.pin) pins.add(`${c.tok}.x: ${sec.pin}`);
      else if (sec.to !== c.tok) edits.push({ path: c.path, at: c.at, len: c.tok.length, from: c.tok, to: sec.to });
      continue;
    }
    ({ book, guessed, pin } = bookOf(c, entry));
    if (pin) pins.add(pin);
    if (!book) {
      if (c.kind === "ref") pins.add(`${c.tok} resolves in neither ${FROM} book`);
      continue;
    }
    const t = target(book, c.tok, entry.id);
    if (t.pin) {
      pins.add(t.pin);
      continue;
    }
    if (t.reread) rereads.add(t.reread);
    to = t.to;
    if (to !== c.tok) {
      moved.add(c.tok);
      if (c.sib) {
        // A shorthand member prints only its last segment, so it can follow only to a number under the
        // prefix its head moves to: 434.1.f/g/h becomes 435.1.f/g/i.
        const head = target(book, c.sib.head, entry.id).to;
        const under = (n) => n.replace(/\.[^.]+$/, "");
        if (head === undefined || under(to) !== under(head)) {
          pins.add(`${c.tok}, in the shorthand after ${c.sib.head}, moves to ${to} and leaves it`);
          continue;
        }
        edits.push({ path: c.path, at: c.at, len: c.sib.seg.length, from: c.tok, to, put: to.slice(under(to).length + 1), guessed });
      } else edits.push({ path: c.path, at: c.at, len: c.tok.length, from: c.tok, to, guessed });
    }
    if (c.kind === "ref" || to !== c.tok) {
      const row = ledger.get(to) ?? [book, 0, hash(oldText[book].get(c.tok))];
      if (row[0] !== book || row[2] !== hash(oldText[book].get(c.tok))) pins.add(`${to} would stand for two different paragraphs`);
      row[1]++;
      ledger.set(to, row);
    }
  }
  const walkPaths = (node, path) =>
    typeof node === "string" ? [[path, node]] : Array.isArray(node) ? node.flatMap((v, i) => walkPaths(v, `${path}[${i}]`)) : node && typeof node === "object" ? Object.entries(node).flatMap(([k, v]) => walkPaths(v, `${path}.${k}`)) : [];
  // A re-read paragraph keeps its number and changes its words, so where the entry prints its 07-16
  // words they become its 10-09 words (reword). A paraphrase that keeps the 07-16 form next to the
  // number cannot be rewritten by text, and would misquote the paragraph the number then names.
  const reworded = new Set();
  for (const [path, s] of walkPaths(entry, "")) {
    const t = reword(entry, path, s, rereads);
    if (t !== s) reworded.add(path);
    for (const rr of rereads) {
      const [book, id] = rr.split(" ");
      const was = REREAD[book][id].was;
      if (!was || !ownWords(entry, path, book)) continue;
      const near = new RegExp(String.raw`(?<![0-9.])${id.replace(/\./g, "\\.")}(?![0-9a-z]|\.[0-9a-z])[^]{0,120}?(?:${was})`);
      if (near.test(t)) pins.add(`${path} prints ${book} ${id} in its ${FROM} form`);
    }
  }
  // A string that names the 07-16 edition next to a number that changes would then read wrong. The
  // standard Riot source title is the one exception: it is rewritten with the numbers.
  const numbered = new Set(edits.map((e) => e.path));
  const changedPaths = new Set([...numbered, ...reworded]);
  // A quote is verbatim. Inside a Riot quote the number moves with the text it quotes, which
  // test/source-quotes.test.ts checks against the 10-09 file; a hand walk or a post still prints the
  // 07-16 number, so rewriting it there would misquote the file (7 quotes in 5 entries at #645).
  for (const path of changedPaths) {
    const q = /^\.sources\[(\d+)\]\.quote$/.exec(path);
    if (q && entry.sources[+q[1]]?.kind !== "riot") pins.add(`${path} quotes a non-Riot source verbatim and carries a number that would change`);
  }
  for (const [path, s] of walkPaths(entry, "")) {
    if (!changedPaths.has(path)) continue;
    const rest = s.replace(RIOT_TITLE.core[0], "").replace(RIOT_TITLE.tournament[0], "");
    if (rest.includes(FROM) || /July 16/.test(rest)) pins.add(`${path} names ${FROM} next to ${numbered.has(path) ? "a number" : "a quote"} that would change`);
  }
  return { pins: [...pins], edits, ledger, moved, rereads };
}


function apply(entry, { edits, rereads }) {
  const byPath = new Map();
  for (const e of edits) (byPath.get(e.path) || byPath.set(e.path, []).get(e.path)).push(e);
  const walk = (node, path) => {
    if (typeof node === "string") {
      let s = node;
      for (const e of (byPath.get(path) || []).sort((a, b) => b.at - a.at)) s = s.slice(0, e.at) + (e.put ?? e.to) + s.slice(e.at + e.len);
      return reword(entry, path, s, rereads);
    }
    if (Array.isArray(node)) return node.map((v, i) => walk(v, `${path}[${i}]`));
    if (node && typeof node === "object") return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v, `${path}.${k}`)]));
    return node;
  };
  const out = walk(entry, "");
  for (const s of out.sources ?? []) {
    if (s.kind !== "riot" || typeof s.title !== "string") continue;
    const t = s.title.replace(RIOT_TITLE.core[0], RIOT_TITLE.core[1]).replace(RIOT_TITLE.tournament[0], RIOT_TITLE.tournament[1]);
    if (t !== s.title) {
      s.title = t.replace(/Last Updated July 16, 2026/, "Last Updated October 9, 2026");
      if (s.date === FROM) s.date = TO;
    }
  }
  out.rulesVersion = TO;
  return out;
}

const db = JSON.parse(fs.readFileSync("data/combos.json", "utf8"));
const rows = [];
const LEDGER_PATH = `data/rules-remap-${TO}.json`;
// A rerun considers only the entries still on FROM, so the rows of the entries an earlier run moved
// are carried over rather than dropped.
const kept = fs.existsSync(LEDGER_PATH) ? JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8")).entries : {};
const LEDGER = { note: "", from: FROM, to: TO, entries: Object.fromEntries(Object.entries(kept).filter(([id]) => db.combos.some((e) => e.id === id && e.rulesVersion === TO && e.walkedVersion !== TO))) };
let movedN = 0;
// Every entry before #645 was walked against FROM; the walk date is recorded once, apart from the
// numbering, and never moves with it (src/types.ts `walkedVersion`).
const withWalk = (e) => ("walkedVersion" in e ? e : Object.fromEntries(Object.entries(e).flatMap(([k, v]) => (k === "rulesVersion" ? [[k, v], ["walkedVersion", FROM]] : [[k, v]]))));
db.combos = db.combos.map((e0) => {
  const e = withWalk(e0);
  if (e.rulesVersion !== FROM) return e;
  const p = plan(e);
  rows.push({ id: e.id, status: e.status, ...p });
  if (p.pins.length) return e;
  movedN++;
  LEDGER.entries[e.id] = {
    moved: [...p.moved].sort(),
    refs: Object.fromEntries([...p.ledger].sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))),
  };
  return apply(e, p);
});

const pinned = rows.filter((r) => r.pins.length);
const reasons = new Map();
for (const r of pinned) for (const x of r.pins) {
  const k = x.replace(/^(core|tournament) \S+ (reworded|deleted).*/, "$1 paragraph $2 in " + TO).replace(/^\S+ is in both books.*/, "number in both books, sentence names neither, readings differ").replace(/^\S+ names .* a number that .*/, "a string names 07-16 next to a changing number").replace(/^\S+ names .* a quote that .*/, "a string names 07-16 next to a re-read quote").replace(/^\S+ prints .* form$/, "a string prints a re-read paragraph in its 07-16 form").replace(/^\S+ quotes a non-Riot source.*/, "a non-Riot quotation carries a number that would change").replace(/^\S+\.x: core \S+ (reworded|deleted).*/, "a block citation (NNN.x) covers a paragraph $1 in " + TO).replace(/^(core|tournament) \S+: its text sits at.*/, "text at several numbers in " + TO).replace(/^\S+, in the shorthand after .* and leaves it$/, "a slash shorthand member moves away from its head").replace(/^(core|tournament) \S+ split in .*/, "$1 paragraph split in " + TO + ", the entry listed under neither half");
  reasons.set(k, (reasons.get(k) || new Set()).add(r.id));
}
for (const [k, ids] of reasons) reasons.set(k, ids.size);
const guessed = rows.filter((r) => !r.pins.length).flatMap((r) => r.edits.filter((e) => e.guessed).map((e) => `${r.id}: ${e.from} -> ${e.to}`));
const bare = rows.filter((r) => !r.pins.length).flatMap((r) => r.edits.filter((e) => /^\d{3}$/.test(e.from)).map((e) => ({ id: r.id, ...e })));
console.log(JSON.stringify({ considered: rows.length, moved: movedN, movedVerified: rows.filter((r) => !r.pins.length && r.status === "verified").length, pinned: pinned.length, pinnedVerified: pinned.filter((r) => r.status === "verified").length, edits: rows.filter((r) => !r.pins.length).reduce((n, r) => n + r.edits.length, 0), bareEdits: bare.length, guessedCore: guessed.length }));
console.log([...reasons].sort((a, b) => b[1] - a[1]).map(([k, v]) => `  ${v}  ${k}`).join("\n"));

if (DRY && process.argv.includes("--why")) { const c = new Map(); for (const r of pinned) for (const x of r.pins) c.set(x, (c.get(x) || 0) + 1); console.log([...c].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => v + "  " + k).join("\n")); }
if (DRY) {
  if (process.argv.includes("--bare")) {
    const s = JSON.parse(fs.readFileSync("data/combos.json", "utf8")).combos;
    for (const b of bare) {
      const e = s.find((x) => x.id === b.id);
      const str = b.path.split(/\.|\[|\]/).filter(Boolean).reduce((n, k) => n?.[k], e);
      console.log(`${b.from}->${b.to} | ${str.slice(Math.max(0, b.at - 40), b.at + 12).replace(/\n/g, " ")}`);
    }
  }
  process.exit(0);
}

LEDGER.note =
  "Generated by scripts/remap-rules.mjs (#645). One key per catalogue entry moved from the 2026-07-16 rules to the 2026-10-09 rules by text identity, or across a reworded paragraph a re-read found to mean the same (`REREAD` in scripts/rules-editions.mjs). `moved`: the 07-16 numbers the move rewrote. `refs`: per number the entry cites after the move, [book, occurrences, hash of the 07-16 paragraph text it meant (`hash` in scripts/rules-editions.mjs: rule numbers replaced, quote characters, dashes and spacing folded)]. test/rule-refs.test.ts re-hashes each number in the 10-09 book and fails on a mismatch that no REREAD row reads from this hash to that text, fails when the entry cites a number fewer times than `occurrences` (a floor: an edit may add citations, and one that drops a citation lowers its count here), and fails on a `moved` number with no row, so a 07-16 number left in a moved entry goes red even where 10-09 reused it for other text. Rerunning the script considers only entries still on 2026-07-16 and keeps these rows; docs/rules-diff/remap-2026-10-09.md keeps each earlier move as the run that made it wrote it.";
// The record lists each move's from -> to pairs, which only the run that made the move knows, so a
// rerun carries the earlier runs' lines over from the record and adds its own under the run's name
// (`--run '#<issue>'`, the cluster follow-up whose REREAD rows it applies). A named run that moves
// nothing still writes the record once, so its rows and the pins they leave are in it (#654: every
// citer of its three rows is pinned by another paragraph); rerunning it is a no-op.
const RECORD = "docs/rules-diff/remap-2026-10-09.md";
const earlier = Object.keys(LEDGER.entries).length - movedN;
const RUN = process.argv.includes("--run") ? process.argv[process.argv.indexOf("--run") + 1] : null;
if (earlier && (movedN || RUN) && !/^#\d+$/.test(RUN ?? "")) throw new Error(`${movedN} more entries would move on top of ${earlier} earlier moves: name the run, --run '#<issue>'`);
fs.writeFileSync("data/combos.json", JSON.stringify(db, null, 2) + "\n");
fs.writeFileSync(LEDGER_PATH, JSON.stringify(LEDGER, null, 1) + "\n");
const section = (md, head) => (md.split(/^## /m).find((x) => x.startsWith(head)) ?? "").split("\n").slice(1);
const old = earlier ? fs.readFileSync(RECORD, "utf8") : "";
const runs = section(old, "Runs").filter((l) => /^\| #/.test(l));
if (earlier && !movedN && (!RUN || runs.some((l) => l.startsWith(`| ${RUN} |`)))) {
  console.log(`rerun: nothing moved; ${RECORD} still records the ${earlier} moved by earlier runs`);
  process.exit(0);
}
const carried = section(old, "Moved entries").filter((l) => LEDGER.entries[/^- `([^`]+)`/.exec(l)?.[1]]);
const label = RUN ?? "#645";
const movedNow = rows.filter((r) => !r.pins.length);
const verified = (ids) => ids.filter((id) => db.combos.find((e) => e.id === id)?.status === "verified").length;
const onTo = Object.keys(LEDGER.entries);
const rewalked = db.combos.filter((e) => e.walkedVersion === TO);
const walkOf = (e) => e.sources.filter((s) => s.kind === "manual-walk").at(-1)?.title ?? "no manual-walk source";
const runRow = `| ${label} | ${rows.length} | ${movedN} (${movedNow.filter((r) => r.status === "verified").length} verified) | ${pinned.length} (${pinned.filter((r) => r.status === "verified").length} verified) |`;
const rereadRows = BOOKS.flatMap((b) => legs(REREAD[b]).map((r) => `| ${b} ${r.id} | ${r.to} | ${r.by} |`));

const md = [
  `# Catalogue entries moved to the ${TO} rules, and the ones pinned to ${FROM}`,
  "",
  `Generated by \`node scripts/remap-rules.mjs\` (#645). Paragraph fates: [2026-07-16-to-2026-10-09.md](2026-07-16-to-2026-10-09.md).`,
  "",
  `- On ${TO}: ${onTo.length} (${verified(onTo)} verified); their numbers name ${TO} paragraphs with the same text, or with a reworded text a re-read found to mean the same, or with the text a re-read found to say what a deleted paragraph said`,
  `- Re-walked on ${TO}: ${rewalked.length} (${rewalked.filter((e) => e.status === "verified").length} verified); walked by hand on the ${TO} text, outside the ledger`,
  `- Pinned to ${FROM}: ${pinned.length} (${pinned.filter((r) => r.status === "verified").length} verified); their numbers still name ${FROM} paragraphs, and the site shows them as written`,
  "",
  "## Runs",
  "",
  "| run | considered (on " + FROM + ") | moved | pinned after |",
  "|---|---:|---:|---:|",
  ...runs,
  runRow,
  "",
  "## Reworded or deleted paragraphs re-read and held",
  "",
  `A citation of one moves as a renumbered paragraph does; a deleted one's ${TO} number is the paragraph that now says what it said. The issue holds both texts and the reasoning.`,
  "",
  ...(rereadRows.length ? ["| " + FROM + " | " + TO + " | read on |", "|---|---|---|", ...rereadRows] : ["none"]),
  "",
  "## Why entries stay pinned (an entry can have several reasons)",
  "",
  "| entries | reason |",
  "|---:|---|",
  ...[...reasons].sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${v} | ${k} |`),
  "",
  "## Numbers read as Core Rules by default",
  "",
  "These numbers exist in both books, their sentence names neither, and both readings move to the same number, so the reading does not change the result.",
  "",
  ...(() => {
    const all = [...section(old, "Numbers read as Core Rules").filter((l) => /^- /.test(l)), ...guessed.map((g) => `- ${g}`)];
    return all.length ? all : ["none"];
  })(),
  "",
  `## Moved entries (${carried.length + movedN})`,
  "",
  ...carried,
  ...movedNow.map((r) => `- \`${r.id}\` [${r.status}]: ${r.edits.length ? [...new Map(r.edits.map((e) => [e.from, e.to]))].map(([a, b]) => `${a} -> ${b}`).join(", ") : "no number changes"}${r.rereads.size ? `; re-read: ${[...r.rereads].join(", ")} (${label})` : ""}`),
  "",
  `## Re-walked on ${TO} (${rewalked.length})`,
  "",
  ...(rewalked.length ? rewalked.map((e) => `- \`${e.id}\` [${e.status}]: ${walkOf(e)}`) : ["none"]),
  "",
  `## Pinned entries (${pinned.length})`,
  "",
  ...pinned.map((r) => `- \`${r.id}\` [${r.status}]: ${r.pins.join("; ")}`),
  "",
];
fs.writeFileSync("docs/rules-diff/remap-2026-10-09.md", md.join("\n"));
