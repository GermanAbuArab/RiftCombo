// Move catalogue entries from the 2026-07-16 rules to the 2026-10-09 rules BY TEXT IDENTITY (#645).
//
//   node scripts/remap-rules.mjs --dry     print what would move and why the rest stays, write nothing
//   node scripts/remap-rules.mjs           rewrite data/combos.json, write the ledger and the record
//   node scripts/remap-rules.mjs --run '#<issue>'   the same on top of earlier runs, named in the record
//
// The ruling on #645 (orch-meta-34, comment 6925629383, narrowed on 6925697815): only citations whose
// paragraph text is identical in both editions (renumbered) or differs only in a moved cross-reference
// (xref) are remapped, and never by number. A cluster follow-up of #645 that re-reads a reworded
// paragraph and finds its meaning held adds it to `REREAD` (scripts/rules-editions.mjs), and its
// citations then move the same way (#652: 164.2.a and 164.2.b). The data marks the edition per ENTRY (`rulesVersion`), so
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
//   - a dotted number resolves in neither 07-16 book (the old-numbering quote in OLD_NUMBERING).
//
// Output: data/rules-remap-2026-10-09.json, the ledger test/rule-refs.test.ts reads (per remapped entry,
// the old numbers it moved and, per cited number, the book and a hash of the 07-16 text it meant), and
// docs/rules-diff/remap-2026-10-09.md, the record of every entry moved or pinned and why.
import fs from "node:fs";
import { citations, fates, hash, parseText, EDITIONS, BOOKS, REREAD } from "./rules-editions.mjs";

const FROM = "2026-07-16";
const TO = "2026-10-09";
const DRY = process.argv.includes("--dry");
const OLD_NUMBERING = new Set(["jhin-fiora-facebreaker-recall"]);

const read = (v, b) => parseText(fs.readFileSync(EDITIONS[v][b], "utf8"));
const F = {}, oldText = {};
for (const b of BOOKS) {
  const A = read(FROM, b);
  oldText[b] = new Map();
  for (const p of A) if (!oldText[b].has(p.id)) oldText[b].set(p.id, p.norm);
  F[b] = new Map();
  for (const r of fates(A, read(TO, b)).rows) if (!F[b].has(r.id)) F[b].set(r.id, r);
}

/** Where an old number goes in one book: { to } or { pin: reason }. */
function target(book, id) {
  const r = F[book].get(id);
  if (!r) return { pin: `${id} is not a ${book} paragraph` };
  if (r.fate === "same") return { to: id };
  if (r.fate === "renumbered" && r.to.includes(" | ")) {
    // Riot prints the same sentence under several numbers (each Mode of Play's "Battlefield Count").
    // The one that sits under where the old parent went is the same paragraph; anything else is a guess.
    const parent = id.replace(/\.[^.]+$/, "");
    const pt = parent !== id ? target(book, parent) : {};
    const under = pt.to ? r.to.split(" | ").filter((x) => x.replace(/\.[^.]+$/, "") === pt.to) : [];
    if (under.length === 1) return { to: under[0] };
    return { pin: `${book} ${id}: its text sits at ${r.to} in ${TO}` };
  }
  if (r.fate === "renumbered" || r.fate === "xref") return { to: r.to };
  const held = REREAD[book][id];
  if (r.fate === "reworded" && held) {
    if (held.to !== r.to || held.from !== hash(r.old) || held.as !== hash(r.new)) throw new Error(`REREAD ${book} ${id} (${held.by}) was read on other texts than ${FROM} ${id} and ${TO} ${r.to}`);
    return { to: held.to, reread: `${book} ${id}` };
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
  const [a, b] = [target("core", c.tok), target("tournament", c.tok)];
  if (a.to !== undefined && a.to === b.to) return { book: "core", guessed: true };
  return { book: "core", pin: `${c.tok} is in both books, its sentence names neither, and the two readings move differently` };
}

const RIOT_TITLE = {
  core: [`Riftbound Core Rules, Last Updated ${FROM} (data/Riftbound-Core-Rules-${FROM}.txt)`, `Riftbound Core Rules, Last Updated ${TO} (data/Riftbound-Core-Rules-${TO}.txt)`],
  tournament: [`(data/Riftbound-Tournament-Rules-${FROM}.txt)`, `(data/Riftbound-Tournament-Rules-${TO}.txt)`],
};

/** A re-read paragraph's 07-16 words, as a quote may print them (any dash, any spacing, no final period), and its 10-09 words. */
const wording = (book, id) => {
  const r = F[book].get(id);
  const bare = (t) => t.replace(/\.$/, "");
  const re = bare(r.old).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[‐-―−-]/g, "[‐-―−-]").replace(/ /g, "\\s+");
  return [new RegExp(re, "g"), bare(r.new)];
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
    if (!ownWords(entry, path, book)) continue;
    const [from, to] = wording(book, id);
    s = s.replace(from, () => to);
  }
  return s;
};

function plan(entry) {
  const pins = new Set();
  if (OLD_NUMBERING.has(entry.id)) pins.add("quotes a commenter citing an older numbering verbatim");
  const edits = []; // { path, at, len, from, to }
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
      const sec = target("core", c.tok);
      const block = [...oldText.core.keys()].filter((id) => id === c.tok || id.startsWith(c.tok + "."));
      const bad = block.filter((id) => target("core", id).pin);
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
    const t = target(book, c.tok);
    if (t.pin) {
      pins.add(t.pin);
      continue;
    }
    if (t.reread) rereads.add(t.reread);
    to = t.to;
    if (to !== c.tok) {
      moved.add(c.tok);
      edits.push({ path: c.path, at: c.at, len: c.tok.length, from: c.tok, to, guessed });
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
      for (const e of (byPath.get(path) || []).sort((a, b) => b.at - a.at)) s = s.slice(0, e.at) + e.to + s.slice(e.at + e.len);
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
const LEDGER = { note: "", from: FROM, to: TO, entries: Object.fromEntries(Object.entries(kept).filter(([id]) => db.combos.some((e) => e.id === id && e.rulesVersion === TO))) };
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
  const k = x.replace(/^(core|tournament) \S+ (reworded|deleted).*/, "$1 paragraph $2 in " + TO).replace(/^\S+ is in both books.*/, "number in both books, sentence names neither, readings differ").replace(/^\S+ names .* a number that .*/, "a string names 07-16 next to a changing number").replace(/^\S+ names .* a quote that .*/, "a string names 07-16 next to a re-read quote").replace(/^\S+ prints .* form$/, "a string prints a re-read paragraph in its 07-16 form").replace(/^\S+ quotes a non-Riot source.*/, "a non-Riot quotation carries a number that would change").replace(/^\S+\.x: core \S+ (reworded|deleted).*/, "a block citation (NNN.x) covers a paragraph $1 in " + TO).replace(/^(core|tournament) \S+: its text sits at.*/, "text at several numbers in " + TO);
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
// (`--run '#<issue>'`, the cluster follow-up whose REREAD rows it applies).
const RECORD = "docs/rules-diff/remap-2026-10-09.md";
const earlier = Object.keys(LEDGER.entries).length - movedN;
const RUN = process.argv.includes("--run") ? process.argv[process.argv.indexOf("--run") + 1] : null;
if (earlier && movedN && !/^#\d+$/.test(RUN ?? "")) throw new Error(`${movedN} more entries would move on top of ${earlier} earlier moves: name the run, --run '#<issue>'`);
fs.writeFileSync("data/combos.json", JSON.stringify(db, null, 2) + "\n");
fs.writeFileSync(LEDGER_PATH, JSON.stringify(LEDGER, null, 1) + "\n");
if (earlier && !movedN) {
  console.log(`rerun: nothing moved; ${RECORD} still records the ${earlier} moved by earlier runs`);
  process.exit(0);
}
const section = (md, head) => (md.split(/^## /m).find((x) => x.startsWith(head)) ?? "").split("\n").slice(1);
const old = earlier ? fs.readFileSync(RECORD, "utf8") : "";
const carried = section(old, "Moved entries").filter((l) => LEDGER.entries[/^- `([^`]+)`/.exec(l)?.[1]]);
const label = RUN ?? "#645";
const movedNow = rows.filter((r) => !r.pins.length);
const verified = (ids) => ids.filter((id) => db.combos.find((e) => e.id === id)?.status === "verified").length;
const onTo = Object.keys(LEDGER.entries);
const runRow = `| ${label} | ${rows.length} | ${movedN} (${movedNow.filter((r) => r.status === "verified").length} verified) | ${pinned.length} (${pinned.filter((r) => r.status === "verified").length} verified) |`;
const rereadRows = BOOKS.flatMap((b) => Object.entries(REREAD[b]).map(([id, r]) => `| ${b} ${id} | ${r.to} | ${r.by} |`));

const md = [
  `# Catalogue entries moved to the ${TO} rules, and the ones pinned to ${FROM}`,
  "",
  `Generated by \`node scripts/remap-rules.mjs\` (#645). Paragraph fates: [2026-07-16-to-2026-10-09.md](2026-07-16-to-2026-10-09.md).`,
  "",
  `- On ${TO}: ${onTo.length} (${verified(onTo)} verified); their numbers name ${TO} paragraphs with the same text, or with a reworded text a re-read found to mean the same`,
  `- Pinned to ${FROM}: ${pinned.length} (${pinned.filter((r) => r.status === "verified").length} verified); their numbers still name ${FROM} paragraphs, and the site shows them as written`,
  "",
  "## Runs",
  "",
  "| run | considered (on " + FROM + ") | moved | pinned after |",
  "|---|---:|---:|---:|",
  ...section(old, "Runs").filter((l) => /^\| #/.test(l)),
  runRow,
  "",
  "## Reworded paragraphs re-read and held",
  "",
  `A citation of one moves as a renumbered paragraph does. The issue holds both texts and the reasoning.`,
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
  `## Pinned entries (${pinned.length})`,
  "",
  ...pinned.map((r) => `- \`${r.id}\` [${r.status}]: ${r.pins.join("; ")}`),
  "",
];
fs.writeFileSync("docs/rules-diff/remap-2026-10-09.md", md.join("\n"));
