// The rules editions this repo ships, and the one paragraph parser every reader of them shares (#645).
//
// A combo entry names the edition its rule numbers belong to in `rulesVersion`; synergies.json names
// one for the whole file. Since #645 two editions are live: 2026-07-16 (every entry that cites a
// paragraph Riot reworded or deleted in 10-09, kept pinned to the text it was walked against) and
// 2026-10-09 (entries whose every cited paragraph kept its text, remapped by text identity).
//
// A paragraph is a line whose first token is a paragraph number, plus every following line up to the
// next one. The anchor is `^\s*` after stripping `\f`, for the reason test/rule-refs.test.ts gives
// (89 headings sit right after a form feed), and U+200B is stripped because the 07-16 Core Rules
// carry eleven of them.
import crypto from "node:crypto";
import fs from "node:fs";

export const EDITIONS = {
  "2026-07-16": {
    core: "data/Riftbound-Core-Rules-2026-07-16.txt",
    tournament: "data/Riftbound-Tournament-Rules-2026-07-16.txt",
  },
  "2026-10-09": {
    core: "data/Riftbound-Core-Rules-2026-10-09.txt",
    tournament: "data/Riftbound-Tournament-Rules-2026-10-09.txt",
  },
};
export const BOOKS = ["core", "tournament"];

export const ID = String.raw`\d{3}(?:\.(?:\d+[a-z]?|[a-z]))*`;
const HEAD = new RegExp(String.raw`^\s*(${ID})\.?(?=\s|$)`);
/** The tokenizer of test/rule-refs.test.ts: a dotted paragraph number. */
export const REF = /\b\d{3}\.(?:\d+[a-z]?|[a-z])(?:\.(?:\d+[a-z]?|[a-z]))*\b/g;

/** Paragraphs of one extraction, in file order: { id, text, norm, toks }. */
export function parseText(raw) {
  const paras = [];
  let cur = null;
  for (const line of raw.split("\n")) {
    const l = line.replace(/[\f​]/g, "");
    const m = HEAD.exec(l);
    if (m) paras.push((cur = { id: m[1], text: l.trim() }));
    // A compound Riot hyphenates across a line ("Top-" / "Most Card") is one word: six lines in the
    // 10-09 Core Rules, none in 07-16. Joined with a space, 718.3 read "Top- Most" and a verbatim quote
    // of it failed.
    else if (cur) cur.text += (/[A-Za-z]-$/.test(cur.text) && /^\s*[A-Za-z]/.test(l) ? "" : " ") + l.trim();
  }
  for (const q of paras) {
    q.norm = q.text.replace(/\s+/g, " ").trim().replace(new RegExp(String.raw`^${ID}\.?\s*`), "");
    q.toks = new Set(q.norm.toLowerCase().match(/[a-z0-9']+/g) || []);
  }
  return paras;
}

/**
 * A paragraph's text with every rule number replaced, and quote characters, dashes and whitespace
 * folded: equal across a moved cross-reference and nothing else. Case and brackets are NOT folded:
 * an earlier version dropped all punctuation and case and called 11 Core paragraphs cross-reference
 * moves that Riot had in fact reworded ("predict." became "[Predict].", "played" became "Played").
 */
export const skeleton = (s) =>
  s
    .replace(new RegExp(String.raw`\b${ID}\b`, "g"), "#")
    .replace(/[“”"‘’']/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

/** What the #645 ledger (data/rules-remap-2026-10-09.json) stores per cited paragraph: 16 hex of sha256 of its skeleton. */
export const hash = (s) => crypto.createHash("sha256").update(skeleton(s)).digest("hex").slice(0, 16);

const root = new URL("../", import.meta.url);
const cache = new Map();
/** Paragraphs of one book of one edition, as a Map id -> normalised text (first occurrence wins). */
export function paragraphs(version, book) {
  const key = version + "/" + book;
  if (!cache.has(key)) {
    const path = EDITIONS[version]?.[book];
    if (!path) throw new Error(`no ${book} rules for edition ${version}`);
    const m = new Map();
    for (const p of parseText(fs.readFileSync(new URL(path, root), "utf8"))) if (!m.has(p.id)) m.set(p.id, p.norm);
    cache.set(key, m);
  }
  return cache.get(key);
}

const jac = (x, y) => {
  let i = 0;
  for (const t of x) if (y.has(t)) i++;
  return i / (x.size + y.size - i || 1);
};

/**
 * The fate of every old paragraph in the new edition:
 *   same        same number, same text
 *   renumbered  same text, found under another number (`to` lists every number holding it, " | ")
 *   xref        best fuzzy match differs only in rule numbers, quote characters, dashes or spacing
 *   reworded    best fuzzy match (token Jaccard >= 0.5) differs in words
 *   deleted     no new paragraph matches at >= 0.5
 */
export function fates(A, B) {
  const bById = new Map(B.map((p) => [p.id, p]));
  const bByText = new Map();
  for (const p of B) (bByText.get(p.norm) || bByText.set(p.norm, []).get(p.norm)).push(p.id);
  const used = new Set();
  const out = [];
  for (const p of A) {
    const same = bById.get(p.id);
    if (same && same.norm === p.norm) {
      used.add(p.id);
      out.push({ id: p.id, fate: "same", to: p.id });
      continue;
    }
    const exact = bByText.get(p.norm);
    if (exact) {
      exact.forEach((x) => used.add(x));
      out.push({ id: p.id, fate: "renumbered", to: exact.join(" | "), old: p.norm });
      continue;
    }
    let best = null;
    let bs = 0;
    for (const q of B) {
      if (Math.abs(q.toks.size - p.toks.size) > Math.max(p.toks.size, q.toks.size) * 0.6) continue;
      const s = jac(p.toks, q.toks);
      if (s > bs) [bs, best] = [s, q];
    }
    const sim = +bs.toFixed(2);
    if (best && bs >= 0.5) {
      used.add(best.id);
      out.push({ id: p.id, fate: skeleton(p.norm) === skeleton(best.norm) ? "xref" : "reworded", to: best.id, sim, old: p.norm, new: best.norm });
    } else out.push({ id: p.id, fate: "deleted", to: null, sim, nearest: best?.id ?? null, old: p.norm });
  }
  const added = B.filter((q) => !used.has(q.id)).map((q) => ({ id: q.id, new: q.norm }));
  return { rows: out, added, newIds: new Set(B.map((q) => q.id)), newText: new Map(B.map((q) => [q.id, q.norm])) };
}

/** Fields that hold no rule citation: a URL, a date, a card code. */
const NOT_PROSE = new Set(["url", "date", "accessed", "rulesVersion", "card"]);
/**
 * A bare section number (`470`, `rule 416`), in the citation form of scripts/citation-form.mjs: no
 * preceding hyphen (OGN-304), "#" (issue numbers), letter, digit or dot, no slash after two letters
 * (issues/115), and no following letter, digit or sub-part. It is a citation only when it names a
 * heading, which the caller decides.
 */
const BARE = /(?<![-#=_0-9.A-Za-z$])(?<![A-Za-z]{2}\/)\d{3}(?![0-9a-z%]|\.[0-9a-z])/g;
/**
 * Three-digit numbers that are not rules, measured on the #645 remap: an HTTP status ("returns HTTP
 * 403", "RELAYING the 403") and a count ("cites 702.3 **488 times**").
 */
const NOT_A_RULE = (s, at, len) => /HTTP/.test(s.slice(Math.max(0, at - 40), at)) || /^\*{0,2}\s*times\b/.test(s.slice(at + len));
/** `190.x`, this project's way of naming a whole block. */
const WILD = /\b(\d{3})((?:\.(?:\d+[a-z]?|[a-z]))*)\.x\b/g;

/**
 * Every rule-number token in one catalogue entry: { kind: "ref" | "bare" | "wild", tok, path, str, at }.
 * `ref` is the dotted tokenizer above; `wild` is `NNN.x`; `bare` is a three-digit section number.
 */
export function citations(entry) {
  const out = [];
  const walk = (node, path, key) => {
    if (typeof node === "string") {
      if (NOT_PROSE.has(key)) return;
      const wild = new Set();
      for (const m of node.matchAll(WILD)) {
        out.push({ kind: "wild", tok: m[1] + m[2], path, str: node, at: m.index });
        wild.add(m.index);
      }
      for (const m of node.matchAll(REF)) if (!wild.has(m.index) && !/\.x$/.test(m[0])) out.push({ kind: "ref", tok: m[0], path, str: node, at: m.index });
      for (const m of node.matchAll(BARE)) {
        if (wild.has(m.index) || NOT_A_RULE(node, m.index, m[0].length)) continue;
        out.push({ kind: "bare", tok: m[0], path, str: node, at: m.index });
      }
    } else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${path}[${i}]`, key));
    else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`, k);
  };
  walk(entry, "", "");
  return out;
}

/**
 * data/combos.json plus data/synergies.json as one text, every rule number in the 2026-07-16 numbering
 * that CLAUDE.md, docs/rules-notes and the walks are written in (#645). The readers that count the
 * catalogue's citations against those (scripts/claude-md-gap.mjs, scripts/uncited-examples.mjs) read
 * this, not the raw file: an entry moved to 2026-10-09 says 103.2.b.1 where 07-16 says another number
 * for the same text, and counting it raw found 15 "rules the notes never carry" that were only that.
 * Each number an entry cites goes back to the one 07-16 paragraph its ledger hash names: one the move
 * rewrote, or else the number itself.
 */
export function catalogueText() {
  const read = (p) => fs.readFileSync(new URL(p, root), "utf8");
  const [OLD, NEW] = Object.keys(EDITIONS);
  const db = JSON.parse(read("data/combos.json"));
  const ledger = JSON.parse(read(`data/rules-remap-${NEW}.json`)).entries;
  const byHash = {};
  for (const b of BOOKS) {
    byHash[b] = new Map();
    for (const [id, t] of paragraphs(OLD, b)) (byHash[b].get(hash(t)) || byHash[b].set(hash(t), []).get(hash(t))).push(id);
  }
  const TOKEN = /(?<![-#=_0-9.A-Za-z$])\d{3}(?:\.(?:\d+[a-z]?|[a-z]))*(?![0-9a-z])/g;
  const back = (node, map, key) =>
    typeof node === "string"
      ? NOT_PROSE.has(key) ? node : node.replace(TOKEN, (t) => map.get(t) ?? t)
      : Array.isArray(node) ? node.map((v) => back(v, map, key))
      : node && typeof node === "object" ? Object.fromEntries(Object.entries(node).map(([k, v]) => [k, back(v, map, k)]))
      : node;
  db.combos = db.combos.map((e) => {
    if (e.rulesVersion === OLD) return e;
    const row = ledger[e.id];
    if (!row) throw new Error(`${e.id} is on ${e.rulesVersion} with no row in the ledger`);
    const map = new Map();
    for (const [num, [book, , h]] of Object.entries(row.refs)) {
      // 07-16 prints some sentences at several numbers (485.4.a and 487.4.a are one Battlefield-count
      // line), so a number the move rewrote wins, and the number itself only when none did.
      const same = byHash[book].get(h) || [];
      const rewrote = same.filter((id) => row.moved.includes(id));
      const ids = rewrote.length ? rewrote : same.filter((id) => id === num);
      if (ids.length !== 1) throw new Error(`${e.id}: ${num} has ${ids.length} ${OLD} paragraphs with its text (${ids.join(", ")})`);
      map.set(num, ids[0]);
    }
    return back(e, map, "");
  });
  return JSON.stringify(db, null, 2) + "\n" + read("data/synergies.json");
}
