// The run plays the browser downloads (#206).
//
// The markdown in `docs/plays/` is the SINGLE SOURCE OF TRUTH and nothing is authored twice: this
// reads every file in that directory into the payload verbatim and derives only what an index needs
// — the slug, the title, the date and a one-line lede. The rendering happens in the browser, in
// `web/plays.ts`, so the parser is typed and tested rather than living in an untyped build script.
//
// The same trap as `web-card-fields.mjs` applies and is why this is an importable module rather than
// a few lines inside `build-web.mjs`: a play that never reaches the payload is blank ONLY in the
// browser, and every test passes, because node can read `docs/` whole. `test/web-payload.test.ts`
// runs THIS function against THAT directory, so the next play that does not ship fails the suite.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const PLAYS_DIR = join("docs", "plays");

/** A slug is a URL — `#/plays/<slug>` — and a map key. Anything else is a build failure, not a 404. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * The lede is the first paragraph that is not the provenance block every play opens with
 * ("Issue #200, lane rc-synth, 2026-09-12. Constructed, Duel (485). …"). That block is a citation,
 * not a summary, and an index made of four citations says nothing. The rule is stated rather than
 * clever so the test can assert it held for every play, which is what stops a future play whose
 * shape differs from quietly showing its citation line as its summary.
 */
const isProvenance = (para) => /^Issue #\d/.test(para);

/** The h1 already lives inside the view called "Run plays", so its own "Play — " prefix is noise. */
const stripKind = (title) => title.replace(/^Play\s*[—–-]\s*/, "");

/** Collapse a paragraph's soft wrapping and its inline markup down to something a list can show. */
const plain = (para) =>
  para
    .replace(/\s*\n\s*/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();

/**
 * Twelve of the sixteen plays open "**Subject: `<entry id>`**, …", and that paragraph IS the lede.
 * An id is an address for the play page to link, not a phrase for an index to print, so the lede
 * swaps each backticked id the catalogue knows for that entry's name; an id the catalogue does not
 * know is left as written, because a wrong name is worse than a raw one. `nameOf` is supplied by
 * `build-web.mjs` from `data/combos.json`; the default resolves nothing, which keeps this module
 * free of the catalogue and the tests honest about which half they exercise.
 */
const nameIds = (para, nameOf) => para.replace(/`([a-z0-9]+(?:-[a-z0-9]+)*)`/g, (m, id) => nameOf(id) ?? m);

/** Read one play file into its payload record. `name` is the file name, `markdown` its contents. */
export const readPlay = (name, markdown, nameOf = () => null) => {
  const slug = name.replace(/\.md$/, "");
  if (!SLUG.test(slug)) throw new Error(`docs/plays/${name}: slug "${slug}" is not URL-safe`);
  const lines = markdown.split("\n");
  const h1 = lines.findIndex((l) => l.startsWith("# "));
  if (h1 === -1) throw new Error(`docs/plays/${name}: no h1, so the play has no title`);
  const date = /^(\d{4}-\d{2}-\d{2})-/.exec(slug)?.[1] ?? "";
  if (!date) throw new Error(`docs/plays/${name}: the slug must open with the play's date`);
  // Paragraphs of the body only. A heading, a table row, a list item, a quote, a rule or a fence is
  // not a lede. The markers all require what follows them, because two of the four plays open their
  // real lede in BOLD and a blunter test — anything starting with `*` — picked up a sentence from
  // the middle of the document instead, which read perfectly well and was the wrong paragraph.
  const BLOCK = /^(?:#{1,6} |> |\||[-*+] |\d+\. |-{3,}$|```)/;
  const paragraphs = lines
    .slice(h1 + 1)
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !BLOCK.test(p.split("\n")[0] ?? ""));
  const lede = paragraphs.find((p) => !isProvenance(p));
  return { slug, date, title: stripKind(lines[h1].slice(2).trim()), lede: lede ? plain(nameIds(lede, nameOf)) : "", markdown };
};

/**
 * Every play in `docs/plays/`, newest first — which is the order an index wants and the order the
 * dated slugs already encode, so nothing has to carry an explicit rank.
 */
export const loadPlays = (root, nameOf = () => null) => {
  const dir = join(root, PLAYS_DIR);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse()
    .map((f) => readPlay(f, readFileSync(join(dir, f), "utf8"), nameOf));
};
