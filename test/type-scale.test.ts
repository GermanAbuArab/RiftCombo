// #184: text was sized in px throughout, so a reader's default-font-size setting — the control
// someone with low vision is most likely to have set once and forgotten — did nothing anywhere in
// the app, and page zoom was their only lever.
//
// The conversion is only worth anything if it stays converted: one new `font-size: 13px` re-breaks
// the setting for whatever it styles, silently, and no visual test would catch it. So this reads the
// stylesheet the way test/a11y.test.ts reads the colour tokens.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(`${process.cwd()}/web/styles.css`, "utf8");
/** Declarations only: strip comments first, or a px size quoted in prose counts as one. */
const bare = css.replace(/\/\*[\s\S]*?\*\//g, "");

describe("the type scale (#184)", () => {
  it("sizes every bit of text in rem, so the root font size reaches all of it", () => {
    const px = [...bare.matchAll(/font-size:\s*[\d.]+px/g)].map((m) => m[0]);
    expect(px).toEqual([]);
    // And the shorthand, which carries a size too and is the easier one to forget.
    const shorthandPx = [...bare.matchAll(/\bfont:\s*(?:[\w]+\s+)*?[\d.]+px/g)].map((m) => m[0]);
    expect(shorthandPx).toEqual([]);
  });

  it("actually declares sizes, so the check above cannot pass by finding nothing", () => {
    expect([...bare.matchAll(/font-size:\s*[\d.]+rem/g)].length).toBeGreaterThan(80);
    expect([...bare.matchAll(/\bfont:\s*(?:[\w]+\s+)*?[\d.]+rem/g)].length).toBeGreaterThan(40);
  });

  /**
   * The root is deliberately NOT declared. Setting `html { font-size: 16px }` would pin rem to 16px
   * and undo the whole change while leaving every `rem` in place to look correct.
   */
  it("leaves the root font size alone, which is the reader's setting", () => {
    expect(bare).not.toMatch(/(?:^|[},])\s*html\s*\{[^}]*font-size/);
    expect(bare).not.toMatch(/(?:^|[},])\s*:root\s*\{[^}]*font-size/);
  });

  /**
   * Spacing and component dimensions stay in px ON PURPOSE: a 72px thumbnail that holds its size
   * while the text around it grows is the behaviour we want, verified at a 24px root. This pins the
   * decision so a later sweep does not "finish the job" and convert them too.
   */
  it("keeps component dimensions in px", () => {
    expect(bare).toMatch(/\.deck-card-art\s*\{[^}]*width:\s*72px/);
    expect(bare).toMatch(/\.deck-card-art\s*\{[^}]*height:\s*72px/);
  });
});
