import { describe, expect, it } from "vitest";
import { parseInline, parseMarkdown, resolvePlayHref, splitRow, type Block, type Span } from "../src/markdown.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs, which cannot import TypeScript.
import { loadPlays } from "../scripts/web-plays.mjs";

/**
 * The renderer's spec is the four documents in `docs/plays/` (#206), so this checks both halves: a
 * fixture holding every construct they use, and then the real plays, which is what stops the subset
 * drifting away from the corpus it was measured against.
 */

/** Flatten a span tree to its text, so a test can assert what a reader ends up seeing. */
const textOf = (spans: Span[]): string =>
  spans.map((s) => (s.kind === "text" || s.kind === "code" ? s.text : textOf(s.spans))).join("");

const kinds = (blocks: Block[]) => blocks.map((b) => b.kind);

describe("inline markup", () => {
  it("reads bold, italic, code and a link", () => {
    expect(parseInline("plain **bold** *thin* `code` [text](u)")).toEqual([
      { kind: "text", text: "plain " },
      { kind: "strong", spans: [{ kind: "text", text: "bold" }] },
      { kind: "text", text: " " },
      { kind: "em", spans: [{ kind: "text", text: "thin" }] },
      { kind: "text", text: " " },
      { kind: "code", text: "code" },
      { kind: "text", text: " " },
      { kind: "link", href: "u", spans: [{ kind: "text", text: "text" }] },
    ]);
  });

  /**
   * The plays write `**`OGN-251 Loose Cannon`**` constantly — a card code in code, inside bold — so
   * nesting is not an edge case here, it is the house style.
   */
  it("nests a code span inside bold, which is how every card code in the plays is written", () => {
    const [span] = parseInline("**`OGN-251 Loose Cannon`**");
    expect(span).toEqual({ kind: "strong", spans: [{ kind: "code", text: "OGN-251 Loose Cannon" }] });
  });

  /**
   * A code span is opaque, and it has to be claimed before anything that reads a bracket or an
   * asterisk: the plays print `[Reaction]` and `['chaos']` inside code, and either would otherwise be
   * scanned for a link or an emphasis.
   */
  it("lets a code span keep its brackets and asterisks", () => {
    expect(parseInline("`[Reaction]`")).toEqual([{ kind: "code", text: "[Reaction]" }]);
    expect(parseInline("`['chaos']`")).toEqual([{ kind: "code", text: "['chaos']" }]);
    expect(parseInline("`a * b`")).toEqual([{ kind: "code", text: "a * b" }]);
  });

  it("leaves a keyword in bare brackets alone, because it is not a link", () => {
    expect(parseInline("[Reaction] — Add [1].")).toEqual([{ kind: "text", text: "[Reaction] — Add [1]." }]);
  });

  it("leaves an opener with no closer as the literal character it is", () => {
    for (const s of ["a ** b", "a * b", "2 * 3 = 6", "an `unclosed span", "[text](", "[no link] here"]) {
      expect(textOf(parseInline(s)), s).toBe(s);
    }
  });

  it("reads two bold runs on one line as two, not as one that swallows the middle", () => {
    expect(textOf(parseInline("**a** and **b**"))).toBe("a and b");
    expect(parseInline("**a** and **b**").filter((s) => s.kind === "strong")).toHaveLength(2);
  });

  it("refuses a link target with whitespace in it", () => {
    expect(parseInline("[x](a b)")).toEqual([{ kind: "text", text: "[x](a b)" }]);
  });
});

describe("table rows", () => {
  it("splits on the pipes and trims the cells", () => {
    expect(splitRow("| a | b | c |")).toEqual(["a", "b", "c"]);
  });

  it("keeps a pipe that is inside a code span, so a rules quote cannot gain a column", () => {
    expect(splitRow("| `a | b` | c |")).toEqual(["`a | b`", "c"]);
  });

  it("reads the empty header row the Needs tables open with", () => {
    expect(splitRow("| | |")).toEqual(["", ""]);
  });
});

describe("blocks", () => {
  const FIXTURE = [
    "# Title",
    "",
    "A paragraph that is soft-wrapped",
    "across two source lines.",
    "",
    "## Section",
    "",
    "### Sub-section",
    "",
    "| rule | text |",
    "|---|---|",
    "| 470 | once per battlefield |",
    "",
    "- first bullet",
    "- second bullet",
    "",
    "1. first step",
    "   wrapped onto a second line",
    "2. second step",
    "",
    "> quoted line one",
    "> quoted line two",
    "",
    "```",
    "  T1  channel 2 (R=2).",
    "```",
    "",
    "---",
    "",
    "Closing paragraph.",
  ].join("\n");
  const blocks = parseMarkdown(FIXTURE);

  it("reads every construct the plays use, in order", () => {
    expect(kinds(blocks)).toEqual([
      "heading", "para", "heading", "heading", "table", "list", "list", "quote", "code", "rule", "para",
    ]);
  });

  it("keeps the heading levels", () => {
    expect(blocks.filter((b) => b.kind === "heading").map((b) => (b as { level: number }).level)).toEqual([1, 2, 3]);
  });

  it("joins a soft-wrapped paragraph into one line of prose", () => {
    expect(textOf((blocks[1] as { spans: Span[] }).spans)).toBe("A paragraph that is soft-wrapped across two source lines.");
  });

  it("reads the header row and the body rows of a table", () => {
    const table = blocks[4] as { head: Span[][]; rows: Span[][][] };
    expect(table.head.map(textOf)).toEqual(["rule", "text"]);
    expect(table.rows.map((r) => r.map(textOf))).toEqual([["470", "once per battlefield"]]);
  });

  it("tells the two kinds of list apart and joins a wrapped item", () => {
    const [bullets, numbers] = [blocks[5], blocks[6]] as [{ ordered: boolean; items: Span[][] }, { ordered: boolean; items: Span[][] }];
    expect(bullets.ordered).toBe(false);
    expect(bullets.items.map(textOf)).toEqual(["first bullet", "second bullet"]);
    expect(numbers.ordered).toBe(true);
    expect(numbers.items.map(textOf)).toEqual(["first step wrapped onto a second line", "second step"]);
  });

  it("joins a blockquote's own soft wrapping", () => {
    expect((blocks[7] as { paragraphs: Span[][] }).paragraphs.map(textOf)).toEqual(["quoted line one quoted line two"]);
  });

  /** The turn tables in the plays are aligned by hand inside a fence; one lost space is a lost table. */
  it("keeps a fenced block's whitespace exactly", () => {
    expect((blocks[8] as { text: string }).text).toBe("  T1  channel 2 (R=2).");
  });

  it("ends a paragraph at the block that follows it, with or without a blank line", () => {
    expect(kinds(parseMarkdown("text\n## Heading"))).toEqual(["para", "heading"]);
    expect(kinds(parseMarkdown("text\n- bullet"))).toEqual(["para", "list"]);
    expect(kinds(parseMarkdown("text\n| a | b |\n|---|---|\n| c | d |"))).toEqual(["para", "table"]);
  });

  /** A run of pipes with no delimiter under it is not a table, and must not be eaten as one. */
  it("only reads a table where a delimiter row says so", () => {
    expect(kinds(parseMarkdown("| a | b |\n| c | d |"))).toEqual(["para"]);
  });
});

describe("where a play's links point", () => {
  const slugs = new Set(["2026-09-12-the-unopposed-clock"]);

  it("turns a cross-link between two plays into the route that serves it", () => {
    expect(resolvePlayHref("2026-09-12-the-unopposed-clock.md", slugs)).toBe("#/plays/2026-09-12-the-unopposed-clock");
  });

  it("drops a link to a play the payload does not carry, keeping the words", () => {
    expect(resolvePlayHref("2026-09-12-renamed.md", slugs)).toBeNull();
  });

  it("leaves every other address exactly as written", () => {
    for (const h of ["https://example.com/x", "/privacy", "#/combos"]) expect(resolvePlayHref(h, slugs)).toBe(h);
  });
});

/**
 * And the corpus itself. The subset above was measured against these four documents; this is what
 * notices when a fifth play arrives written in something the renderer does not read, which would
 * otherwise show up on the site as a stray `**` in the middle of a sentence.
 */
describe("the four plays as they are actually written", () => {
  const plays = loadPlays(".") as { slug: string; markdown: string }[];

  it("parses every one of them into blocks the renderer knows", () => {
    expect(plays.length, "no plays to parse").toBeGreaterThan(0);
    const known = new Set(["heading", "para", "list", "quote", "table", "code", "rule"]);
    for (const p of plays) {
      const blocks = parseMarkdown(p.markdown);
      expect(blocks.length, p.slug).toBeGreaterThan(10);
      for (const b of blocks) expect(known.has(b.kind), `${p.slug}: ${b.kind}`).toBe(true);
    }
  });

  /**
   * The one that would show on the page. Any marker left in the rendered text is a construct the
   * parser walked past, and a reader sees the raw asterisks or backticks in the prose.
   */
  it("leaves no unparsed marker in the text a reader ends up seeing", () => {
    for (const p of plays) {
      for (const b of parseMarkdown(p.markdown)) {
        if (b.kind === "code" || b.kind === "rule") continue;
        const text =
          b.kind === "table" ? [...b.head, ...b.rows.flat()].map(textOf).join(" ")
          : b.kind === "list" ? b.items.map(textOf).join(" ")
          : b.kind === "quote" ? b.paragraphs.map(textOf).join(" ")
          : textOf(b.spans);
        expect(text, `${p.slug}: ${text.slice(0, 90)}`).not.toMatch(/\*\*|^#|\]\(/);
      }
    }
  });

  it("finds every cross-link between the plays and resolves it to a route", () => {
    const slugs = new Set(plays.map((p) => p.slug));
    const links = plays.flatMap((p) => [...p.markdown.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]!));
    expect(links.length, "the plays stopped cross-linking — is the .md rewrite still needed?").toBe(3);
    for (const href of links) expect(resolvePlayHref(href, slugs), href).toMatch(/^#\/plays\//);
  });
});
