// Paragraph diff between two editions of the Riftbound rules, with every repo citer of each
// paragraph that moved, changed or went away (#645).
//
//   node scripts/rules-diff.mjs <old-core.txt> <new-core.txt> <old-tournament.txt> <new-tournament.txt> <out.md> <out.json> [<rev>]
//
// The citers are read from the working tree, or from commit <rev> when one is given. The committed
// 2026-07-16-to-2026-10-09 diff reads them at 6256d09, the last commit before #645 rewrote any
// citation: after the remap, an entry moved to 10-09 cites 10-09 numbers, and listing it under the
// 07-16 paragraph of the same number would name the wrong citer.
//
// Inputs are `pdftotext -layout` extractions (the method the 2026-07-16 files were made with: the
// 10-09 extraction reproduces their title and date-line indentation byte for byte). A paragraph is a
// line whose first token is a paragraph number, plus every following line up to the next one. The
// anchor is `^\s*` after stripping `\f`, for the reason test/rule-refs.test.ts gives (89 headings sit
// right after a form feed), and U+200B is stripped because the 07-16 Core Rules carry eleven of them.
//
// Every old paragraph gets one fate in the new edition:
//   same        same number, same text
//   renumbered  same text, found under another number
//   xref        best fuzzy match differs only in rule numbers, quote characters, dashes or spacing
//   reworded    best fuzzy match (token Jaccard >= 0.5) differs in words
//   deleted     no new paragraph matches at >= 0.5
// The fuzzy pairing is a heuristic: `sim` is printed so a low pairing can be read by hand.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fates, parseText } from "./rules-editions.mjs";

const [ocP, ncP, otP, ntP, outMd, outJson, rev] = process.argv.slice(2);
if (!outJson) throw new Error("usage: rules-diff.mjs OLD_CORE NEW_CORE OLD_TOURN NEW_TOURN OUT.md OUT.json");

const REF = /\b\d{3}\.(?:\d+[a-z]?|[a-z])(?:\.(?:\d+[a-z]?|[a-z]))*\b/g; // same tokenizer as test/rule-refs.test.ts
const parse = (p) => parseText(fs.readFileSync(p, "utf8"));

// Word-level diff, [-removed-] {+added+}.
function wdiff(a, b) {
  const x = a.split(" "), y = b.split(" ");
  const n = x.length, m = y.length;
  const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = [];
  let i = 0, j = 0, del = [], ins = [];
  const flush = () => {
    if (del.length) out.push(`[-${del.join(" ")}-]`);
    if (ins.length) out.push(`{+${ins.join(" ")}+}`);
    del = [];
    ins = [];
  };
  while (i < n || j < m) {
    if (i < n && j < m && x[i] === y[j]) {
      flush();
      out.push(x[i]);
      i++;
      j++;
    } else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) ins.push(y[j++]);
    else del.push(x[i++]);
  }
  flush();
  return out.join(" ");
}

// Citers: every git-tracked text file except the rules texts and the card data, and inside
// data/combos.json and data/synergies.json the entry id (with its status) instead of the file.
const git = (...a) => execFileSync("git", a, { encoding: "utf8", maxBuffer: 1 << 28 });
const files = (rev ? git("ls-tree", "-r", "-z", "--name-only", rev) : git("ls-files", "-z"))
  .split("\0")
  .filter((f) => f && /\.(md|json|ts|mjs|js|txt|html)$/.test(f))
  .filter((f) => !/^data\/(Riftbound-.*\.txt|cards.*\.json|corpus.*|extract\/)/.test(f) && !f.startsWith("public/") && !f.startsWith("docs/rules-diff/"));
const cites = new Map();
const add = (id, who) => (cites.get(id) || cites.set(id, new Set()).get(id)).add(who);
for (const f of files) {
  const txt = rev ? git("show", `${rev}:${f}`) : fs.readFileSync(f, "utf8");
  if (f === "data/combos.json" || f === "data/synergies.json") {
    const d = JSON.parse(txt);
    const key = f === "data/combos.json" ? "combos" : "synergies";
    for (const e of d[key]) for (const m of JSON.stringify(e).matchAll(REF)) add(m[0], key === "combos" ? `combo:${e.id}[${e.status}]` : `synergy:${e.id}`);
    for (const m of JSON.stringify({ ...d, [key]: undefined }).matchAll(REF)) add(m[0], `${f} (top-level note)`);
  } else for (const m of txt.matchAll(REF)) add(m[0], f);
}

const books = {
  core: { label: "Core Rules", A: parse(ocP), B: parse(ncP), oldP: ocP, newP: ncP },
  tournament: { label: "Tournament Rules", A: parse(otP), B: parse(ntP), oldP: otP, newP: ntP },
};
const oldIds = Object.fromEntries(Object.entries(books).map(([k, b]) => [k, new Set(b.A.map((p) => p.id))]));
const report = {};
for (const [k, b] of Object.entries(books)) {
  const other = k === "core" ? oldIds.tournament : oldIds.core;
  const F = fates(b.A, b.B);
  for (const r of F.rows) {
    r.citers = [...(cites.get(r.id) || [])].sort();
    r.alsoInOtherBook = other.has(r.id);
    // The old number still exists in the new edition but now holds other text: a citation that is
    // not updated keeps resolving (test/rule-refs.test.ts stays green) and silently cites the wrong rule.
    r.numberReused = r.fate !== "same" && F.newIds.has(r.id) && r.to !== r.id;
  }
  report[k] = { label: b.label, old: b.oldP, new: b.newP, oldCount: b.A.length, newCount: b.B.length, rows: F.rows.filter((r) => r.fate !== "same"), same: F.rows.length - F.rows.filter((r) => r.fate !== "same").length, added: F.added };
}

const FATES = ["renumbered", "xref", "reworded", "deleted"];
const verifiedOf = (r) => r.citers.filter((c) => c.endsWith("[verified]"));
const summarize = (rows) => {
  const s = {};
  for (const f of FATES) {
    const rs = rows.filter((r) => r.fate === f);
    s[f] = { total: rs.length, cited: rs.filter((r) => r.citers.length).length, citedByVerified: rs.filter((r) => verifiedOf(r).length).length, numberReused: rs.filter((r) => r.numberReused && r.citers.length).length };
  }
  return s;
};
const groupCiters = (cs) => {
  const v = cs.filter((c) => c.endsWith("[verified]")).map((c) => c.slice(6, -10));
  const cand = cs.filter((c) => c.startsWith("combo:") && !c.endsWith("[verified]")).map((c) => c.slice(6));
  const syn = cs.filter((c) => c.startsWith("synergy:")).map((c) => c.slice(8));
  const rest = cs.filter((c) => !c.startsWith("combo:") && !c.startsWith("synergy:"));
  const parts = [];
  if (v.length) parts.push(`verified combos (${v.length}): ${v.join(", ")}`);
  if (cand.length) parts.push(`candidate combos (${cand.length}): ${cand.join(", ")}`);
  if (syn.length) parts.push(`synergies (${syn.length}): ${syn.join(", ")}`);
  if (rest.length) parts.push(`files (${rest.length}): ${rest.join(", ")}`);
  return parts.join("; ") || "none";
};
const DISPOSITION = {
  renumbered: "mechanical: renumber the citation (step 2)",
  xref: "mechanical: only a cross-reference number, a quote character, a dash or spacing changed (step 2)",
  reworded: "meaning check (step 2): mechanical fix if the meaning held, else a finding or a new issue per verified entry",
  deleted: "meaning check (step 2): finding or new issue per verified entry",
};

const md = [];
md.push("# Rules paragraph diff, 2026-07-16 to 2026-10-09 (#645)", "");
md.push("Generated, never hand-edited:", "", "```", `node scripts/rules-diff.mjs ${ocP} ${ncP} ${otP} ${ntP} ${outMd} ${outJson}${rev ? ` ${rev}` : ""}`, "```", "");
md.push("Fates: `renumbered` (same text, new number), `xref` (only a rule number, a quote character, a dash or spacing inside the text changed; case and brackets count as words), `reworded` (words changed; paired by token Jaccard, `sim` printed), `deleted` (no new paragraph at sim >= 0.5). `number reused` marks an old number that still exists in the new edition holding other text, so an un-updated citation keeps resolving and cites the wrong rule. A citer is a token match of the paragraph number (the tokenizer of `test/rule-refs.test.ts`); `also a <other book> number` marks a number that exists in both books, where the token alone cannot say which book is meant.", "");
for (const [k, r] of Object.entries(report)) {
  const s = summarize(r.rows);
  md.push(`## ${r.label}`, "");
  md.push(`Old \`${r.old}\`: ${r.oldCount} paragraphs. New \`${r.new}\`: ${r.newCount} paragraphs. Unchanged (same number, same text): ${r.same}. New-only paragraphs: ${r.added.length}.`, "");
  md.push("| fate | paragraphs | cited in the repo | cited by a verified combo | cited and number reused |", "|---|---|---|---|---|");
  for (const f of FATES) md.push(`| ${f} | ${s[f].total} | ${s[f].cited} | ${s[f].citedByVerified} | ${s[f].numberReused} |`);
  md.push("");
  for (const f of ["deleted", "reworded", "xref", "renumbered"]) {
    const rows = r.rows.filter((x) => x.fate === f);
    if (!rows.length) continue;
    md.push(`### ${r.label}: ${f} (${rows.length})`, "", `Disposition: ${DISPOSITION[f]}.`, "");
    for (const x of rows) {
      const flags = [x.numberReused ? "number reused" : "", x.alsoInOtherBook ? `also a ${k === "core" ? "Tournament" : "Core"} Rules number` : ""].filter(Boolean).join(", ");
      const head = f === "deleted" ? `**${x.id}** deleted (nearest ${x.nearest ?? "none"}, sim ${x.sim})` : `**${x.id}** -> **${x.to}**${x.sim !== undefined ? ` (sim ${x.sim})` : ""}`;
      md.push(`- ${head}${flags ? ` [${flags}]` : ""}`);
      if (f === "reworded" || f === "xref") md.push(`  - diff: ${wdiff(x.old, x.new)}`);
      if (f === "deleted") md.push(`  - old: ${x.old}`);
      md.push(`  - citers: ${groupCiters(x.citers)}`);
    }
    md.push("");
  }
  md.push(`### ${r.label}: new-only paragraphs (${r.added.length})`, "");
  for (const a of r.added) md.push(`- **${a.id}** ${a.new}`);
  md.push("");
}
fs.writeFileSync(outMd, md.join("\n"));
fs.writeFileSync(outJson, JSON.stringify(Object.fromEntries(Object.entries(report).map(([k, r]) => [k, { ...r, summary: summarize(r.rows) }])), null, 1) + "\n");
for (const [k, r] of Object.entries(report)) console.log(k, `same=${r.same} added=${r.added.length}`, JSON.stringify(summarize(r.rows)));
