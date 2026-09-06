import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { esc } from "../src/html.js";

/**
 * The guard rail behind every `innerHTML` in `web/` (#130).
 *
 * Nothing was broken when this was written: every call site was traced by hand and every string a
 * player controls — a deck name from Supabase, the title a Piltover import carries, the name in the
 * editor — already went through `esc()`, and the one raw pasted line (`unresolved.raw`) only ever
 * reaches `textContent`. What was missing was anything that would notice if that stopped being true.
 * Three copies of the escape lived in three files, so a fix to one would have left two behind, and
 * its class was `[&<>"]`, which is safe only while every attribute it feeds is double-quoted.
 */
const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const WEB = ["web/main.ts", "web/decks.ts", "web/builder.ts", "web/account.ts"] as const;

describe("the HTML escape", () => {
  it("neutralises a tag, an attribute break and an apostrophe", () => {
    expect(esc("<script>alert(1)</script>")).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(esc('"><img src=x onerror=alert(1)>')).toBe("&quot;&gt;&lt;img src=x onerror=alert(1)&gt;");
    // The one the old class let through. A deck named this is inert in a single-quoted attribute now.
    expect(esc("x' onmouseover='alert(1)")).toBe("x&#39; onmouseover=&#39;alert(1)");
    expect(esc("&")).toBe("&amp;");
    // The ampersand is replaced once, not twice: &lt; must not become &amp;lt;.
    expect(esc("<&>")).toBe("&lt;&amp;&gt;");
  });

  it("leaves an ordinary card name alone, apostrophe apart", () => {
    expect(esc("Forge of the Future")).toBe("Forge of the Future");
    expect(esc("Rhaast, Darkin Scythe")).toBe("Rhaast, Darkin Scythe");
    expect(esc("Kai'Sa, Daughter of the Void")).toBe("Kai&#39;Sa, Daughter of the Void");
  });

  it("is idempotent in the only sense that matters: escaped output holds no live markup", () => {
    for (const hostile of ['"><b>x</b>', "<svg/onload=1>", "a' b\" c<d>e&f"]) {
      const out = esc(hostile);
      expect(out).not.toMatch(/[<>"']/);
    }
  });
});

describe("the call sites that have to keep using it", () => {
  it("has exactly one escape in the project", () => {
    for (const f of WEB) {
      expect(read(f), `${f} still declares its own esc()`).not.toMatch(/const esc = \(s: string\)/);
    }
    expect(read("src/html.ts")).toContain("export const esc");
  });

  /**
   * `esc()` covers `'` now, but a single-quoted attribute is still the shape that made the old class
   * dangerous, and nothing in this codebase needs one: every attribute is written with `"`. Keeping
   * the shape out is cheaper than auditing each one.
   */
  it("writes no attribute with a single-quoted interpolation", () => {
    for (const f of WEB) {
      const hits = [...read(f).matchAll(/=\s*'\$\{/g)];
      expect(hits, `${f} interpolates into a single-quoted attribute`).toHaveLength(0);
    }
  });

  /**
   * The raw text of a line the card index did not recognise is the one player string that reaches
   * the page without `esc()`. That is allowed, because its only route is `unresolvedLine` into
   * `setStatus`, which writes with `textContent`. Both halves are pinned: the writer stays a
   * `textContent` writer, and `.raw` stays inside that one function.
   */
  it("keeps the unrecognised paste on the textContent path", () => {
    const main = read("web/main.ts");
    const writer = /const setStatus = [\s\S]*?\n\};/.exec(main)?.[0] ?? "";
    expect(writer, "setStatus is gone — where does an unrecognised line go now?").not.toBe("");
    expect(writer).toContain("textContent");
    expect(writer).not.toContain("innerHTML");
    // Every use of `.raw` in the file is inside `unresolvedLine`, which feeds only that writer.
    const uses = [...main.matchAll(/^.*\.raw.*$/gm)].map((m) => m[0]);
    expect(uses).toHaveLength(1);
    expect(uses[0]).toContain("d.unresolved.slice(0, 2)");
  });
});
