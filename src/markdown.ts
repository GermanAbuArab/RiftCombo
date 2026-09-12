/**
 * The markdown subset the run plays are written in (#206).
 *
 * This is deliberately NOT a markdown library. The corpus is four documents in `docs/plays/`, they
 * are written by hand in one house style, and `test/markdown.test.ts` pins the constructs they
 * actually use — headings, paragraphs, tables, both kinds of list, blockquotes, fenced code, rules,
 * and inline bold / italic / code / links. Anything outside that subset is rendered as the literal
 * text it is, which is the honest failure: a construct we do not support shows up as itself rather
 * than as silently dropped prose.
 *
 * It is a parser to a tree and not a renderer to HTML on purpose. The Content-Security-Policy this
 * site ships forbids inline `style=`, and the whole class of mistake behind that rule is building
 * markup out of strings; `web/plays.ts` walks this tree with `createElement` and `textContent`, so
 * no document text is ever interpreted as markup. It is also why the parser lives in `src/` — the
 * same reason `src/plan.ts` does, so it has tests that do not need a DOM.
 */

export type Span =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "strong"; spans: Span[] }
  | { kind: "em"; spans: Span[] }
  | { kind: "link"; href: string; spans: Span[] };

export type Block =
  | { kind: "heading"; level: number; spans: Span[] }
  | { kind: "para"; spans: Span[] }
  | { kind: "list"; ordered: boolean; items: Span[][] }
  | { kind: "quote"; paragraphs: Span[][] }
  | { kind: "table"; head: Span[][]; rows: Span[][][] }
  | { kind: "code"; text: string }
  | { kind: "rule" };

/** A link target we are willing to follow: no whitespace, and not an empty pair of brackets. */
const LINK = /^\[([^\]\n]*)\]\(([^)\s]+)\)/;

/**
 * Inline markup, scanned left to right with code spans winning.
 *
 * The order is the whole correctness argument. A code span is opaque — the plays write
 * `` `[Reaction]` `` and `` `['chaos']` `` — so anything that reads a bracket or an asterisk has to
 * run after the span it sits inside has been claimed. And `**` is tested before `*`, or every bold
 * run would open as an empty emphasis. An opener with no closer falls through and stays literal,
 * which is what a stray asterisk in prose should do.
 */
export function parseInline(src: string): Span[] {
  const out: Span[] = [];
  let buf = "";
  const flush = () => {
    if (buf) out.push({ kind: "text", text: buf });
    buf = "";
  };
  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    if (c === "`") {
      const end = src.indexOf("`", i + 1);
      if (end > i + 1) {
        flush();
        out.push({ kind: "code", text: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    } else if (c === "[") {
      const m = LINK.exec(src.slice(i));
      if (m) {
        flush();
        out.push({ kind: "link", href: m[2]!, spans: parseInline(m[1]!) });
        i += m[0].length;
        continue;
      }
    } else if (c === "*" && src[i + 1] === "*") {
      const end = src.indexOf("**", i + 2);
      if (end > i + 1) {
        flush();
        out.push({ kind: "strong", spans: parseInline(src.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    } else if (c === "*") {
      const end = src.indexOf("*", i + 1);
      // `end > i + 1` rejects the second half of a `**` that found no closer; the space test rejects
      // "3 * 4" and the multiplication signs the plays use in prose.
      if (end > i + 1 && src[i + 1] !== " " && src[end - 1] !== " ") {
        flush();
        out.push({ kind: "em", spans: parseInline(src.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }
    buf += c;
    i += 1;
  }
  flush();
  return out;
}

/**
 * Split one table row on the pipes that are not inside a code span.
 *
 * No cell in the four plays holds a pipe today, and a naive `split("|")` would be right for all of
 * them — but a rules quote is exactly the kind of thing that arrives with one in it, and the failure
 * would be a row silently gaining a column. Eight lines of scanner instead.
 */
export function splitRow(line: string): string[] {
  const cells: string[] = [];
  let buf = "";
  let inCode = false;
  for (const ch of line.trim().replace(/^\|/, "").replace(/\|$/, "")) {
    if (ch === "`") inCode = !inCode;
    if (ch === "|" && !inCode) {
      cells.push(buf.trim());
      buf = "";
    } else buf += ch;
  }
  cells.push(buf.trim());
  return cells;
}

const isFence = (l: string) => l.startsWith("```");
const isRule = (l: string) => /^-{3,}\s*$/.test(l);
const isHeading = (l: string) => /^#{1,6} /.test(l);
const isQuote = (l: string) => l === ">" || l.startsWith("> ");
const isTable = (l: string) => l.startsWith("|");
const isBullet = (l: string) => /^[-*+] /.test(l);
const isNumber = (l: string) => /^\d+\. /.test(l);
const isDelimiter = (l: string) => /^\|[\s|:-]*\|\s*$/.test(l) && l.includes("-");
/**
 * A pipe line is only a table when a delimiter row says so, which needs one line of lookahead — so
 * this takes the array rather than the line. Without it, a run of pipes that is not a table is still
 * treated as a block boundary and breaks into one paragraph per line.
 */
const startsTable = (lines: string[], i: number) => isTable(lines[i]!) && isDelimiter(lines[i + 1] ?? "");
/** Any line that opens a block of its own, and therefore ends the paragraph above it. */
const opensBlock = (lines: string[], i: number) => {
  const l = lines[i]!;
  return isFence(l) || isRule(l) || isHeading(l) || isQuote(l) || startsTable(lines, i) || isBullet(l) || isNumber(l);
};

/**
 * A list item may wrap onto indented continuation lines — the numbered list in the Chaos/Order play
 * runs to five of them — so an item is its marker line plus every indented line that follows, joined
 * with the single space the soft wrap stands for.
 */
function takeItem(lines: string[], start: number, marker: RegExp): [string, number] {
  let text = lines[start]!.replace(marker, "");
  let i = start + 1;
  while (i < lines.length && /^\s+\S/.test(lines[i]!)) {
    text += ` ${lines[i]!.trim()}`;
    i += 1;
  }
  return [text, i];
}

export function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (isFence(line)) {
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !isFence(lines[i]!)) body.push(lines[i]!), (i += 1);
      i += 1; // the closing fence, or the end of the file if it was never closed
      blocks.push({ kind: "code", text: body.join("\n") });
      continue;
    }
    if (isRule(line)) {
      blocks.push({ kind: "rule" });
      i += 1;
      continue;
    }
    if (isHeading(line)) {
      const hashes = /^#+/.exec(line)![0]!.length;
      blocks.push({ kind: "heading", level: hashes, spans: parseInline(line.slice(hashes + 1).trim()) });
      i += 1;
      continue;
    }
    if (isQuote(line)) {
      const body: string[] = [];
      while (i < lines.length && isQuote(lines[i]!)) body.push(lines[i]!.replace(/^>\s?/, "")), (i += 1);
      const paragraphs = body
        .join("\n")
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => parseInline(p.replace(/\s*\n\s*/g, " ")));
      blocks.push({ kind: "quote", paragraphs });
      continue;
    }
    if (startsTable(lines, i)) {
      const head = splitRow(line).map(parseInline);
      i += 2;
      const rows: Span[][][] = [];
      while (i < lines.length && isTable(lines[i]!)) {
        rows.push(splitRow(lines[i]!).map(parseInline));
        i += 1;
      }
      blocks.push({ kind: "table", head, rows });
      continue;
    }
    if (isBullet(line) || isNumber(line)) {
      const ordered = isNumber(line);
      const marker = ordered ? /^\d+\.\s+/ : /^[-*+]\s+/;
      const test = ordered ? isNumber : isBullet;
      const items: Span[][] = [];
      while (i < lines.length && test(lines[i]!)) {
        const [text, next] = takeItem(lines, i, marker);
        items.push(parseInline(text));
        i = next;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }
    /**
     * A paragraph always swallows its own first line before testing anything. Every branch above has
     * already declined this line, so re-asking whether it opens a block can only ever return a stale
     * yes — and a loop that then consumed nothing spun forever, which the suite reported as a worker
     * crash rather than as a failure. One line of belt and braces against a whole class of hang.
     */
    const body: string[] = [lines[i]!.trim()];
    i += 1;
    while (i < lines.length && lines[i]!.trim() && !opensBlock(lines, i)) body.push(lines[i]!.trim()), (i += 1);
    blocks.push({ kind: "para", spans: parseInline(body.join(" ")) });
  }
  return blocks;
}

/**
 * Where an `[…](…)` in a play should point, or null for "render the words and drop the link".
 *
 * The plays cross-link each other by file name, which is an address the browser cannot serve: the
 * markdown is not deployed, only the payload built from it is. Those become `#/plays/<slug>`, and
 * only for a slug the payload actually carries — a link to a play that was renamed or never shipped
 * becomes plain text rather than a dead address, because a reader can tell a missing link from a
 * broken one and cannot tell a 404 from a bug. Anything else is left exactly as written.
 */
export function resolvePlayHref(href: string, slugs: ReadonlySet<string>): string | null {
  if (!href.endsWith(".md")) return href;
  const slug = href.replace(/^.*\//, "").replace(/\.md$/, "");
  return slugs.has(slug) ? `#/plays/${slug}` : null;
}
