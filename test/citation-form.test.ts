import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs shared with the two node-run rules-vein scripts, which cannot import TypeScript.
import { citeRe, countCites } from "../scripts/citation-form.mjs";

/**
 * The one citation-counting form shared by `scripts/claude-md-gap.mjs` and
 * `scripts/uncited-examples.mjs` (#232). Each case below is a counting trap that shipped once.
 */
describe("citation form", () => {
  it("counts the second member of a rule pair whose first member ends in a sub-rule LETTER", () => {
    expect(countCites("315.4.b.1", "see 315.4.b/315.4.b.1 here")).toBe(1);
  });
  it("counts the second member of a rule pair whose first member ends in a DIGIT", () => {
    expect(countCites("420.2.a", "R9 because 420.1/420.2.a make it")).toBe(1);
  });
  it("rejects a URL path segment", () => {
    expect(countCites("115", "github.com/x/y/issues/115 was opened")).toBe(0);
  });
  it("rejects the other traps: hyphen, #, following sub-part, and accepts a trailing full stop", () => {
    expect(countCites("304", "OGN-304")).toBe(0);
    expect(countCites("153", "issue #153")).toBe(0);
    expect(countCites("419.4.a", "419.4.a.1 says")).toBe(0);
    expect(countCites("816.3", "stands on 477.1.b.1.a + 816.3.")).toBe(1);
  });
  it("citeRe without flags tests a single hit", () => {
    expect(citeRe("315.4.b.1").test("315.4.b/315.4.b.1")).toBe(true);
  });
});
