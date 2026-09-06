import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The Ignored Build Step decides whether a push reaches the site at all, and every way it goes wrong
 * is silent: Vercel cancels the deployment and nothing anywhere reports that the change never shipped
 * (issue #126). Two properties are pinned here because a regression in either is invisible until a
 * user notices the site is a commit behind.
 *
 *  - the diff must start from VERCEL_GIT_PREVIOUS_SHA, "the git SHA of the last successful deployment
 *    for the project and branch", with NO fallback. `HEAD^ HEAD` reads only the TIP of a push, so a push
 *    that carried a data/ commit behind a docs/ commit is cancelled and the data never deploys. That
 *    shape is in this repo's own history twice: 55e24f3 (data/combos.json) followed by 793ebad
 *    (CLAUDE.md only), and the 813d5c7..b5230a0 promotion of 2026-09-06 night.
 *  - `api` must be watched. api/deck-url.ts is a live serverless route, and a commit that only fixes it
 *    would otherwise exit 0 and never be deployed.
 *
 * Also pinned: vercel.json is generated output, and Vercel reads it from the repository BEFORE the
 * build command runs, so a committed file that has drifted from its generator is what actually ships.
 */
const ROOT = new URL("..", import.meta.url);
const vercel = JSON.parse(readFileSync(new URL("vercel.json", ROOT), "utf8")) as {
  ignoreCommand?: string;
  headers: { headers: { key: string; value: string }[] }[];
};

describe("the Vercel ignore build step", () => {
  const command = vercel.ignoreCommand ?? "";

  it("diffs from the last successful deployment, and never from the tip of the push", () => {
    expect(command).toContain("VERCEL_GIT_PREVIOUS_SHA");
    // A HEAD^ fallback is the bug, not the safety net. Sessions push to `work` and the manager
    // promotes a BATCH to master, so the tip of a promotion is routinely a docs-only commit —
    // HEAD^ then asks "did the last commit touch code?" instead of "is anything undeployed?".
    // 813d5c7..b5230a0 carried a drawer rewrite, 20 catalogue entries and 21 synergy rules, and
    // was Canceled in 1s because its tip touched CLAUDE.md alone.
    expect(command, "a HEAD^ fallback skips whole batches whose tip commit is docs-only")
      .not.toContain("HEAD^");
  });

  it("normalises every failure path to exit 1, which is the only code Vercel reads as build", () => {
    // Vercel reads 0 as skip and 1 as build. `git cat-file -e` on an object the shallow clone does
    // not hold exits 128, which #126 measured as neither: the deployment errors and production sits
    // on the old commit. So the whole test is grouped and any failure becomes an explicit 1.
    expect(command).toMatch(/\|\|\s*exit 1\s*$/);
  });

  it("watches every path whose change has to reach the site", () => {
    // Split on the pathspec separator, " -- ", not on the first "--" — that one is inside "--quiet".
    const pathspec = command.split(/\s--\s/)[1];
    expect(pathspec, "the ignore command has no pathspec, so it watches the whole repository")
      .toBeDefined();
    const watched = pathspec!.trim().split(/\s+/);
    for (const path of ["web", "src", "data", "scripts", "api", "package.json", "vercel.json"]) {
      expect(watched, `${path} is not watched, so a commit touching only it never deploys`)
        .toContain(path);
    }
  });
});

describe("vercel.json", () => {
  it("carries the same ignore command its generator writes", () => {
    // vercel.json is generated output that is committed, because Vercel reads it from the repository
    // before the build command runs. Regenerating here would write into a working tree other sessions
    // share, so this compares the two strings instead: the committed one is what actually ships, and a
    // hand-edit that drifts from scripts/build-headers.mjs would survive the next regeneration only
    // until someone runs it.
    const generator = readFileSync(new URL("scripts/build-headers.mjs", ROOT), "utf8");
    const inGenerator = /ignoreCommand:\s*\n?\s*("(?:[^"\\]|\\.)*")/.exec(generator)?.[1];
    expect(inGenerator, "no ignoreCommand found in scripts/build-headers.mjs").toBeDefined();
    // The generator holds a JS string literal, so the shell quoting inside it arrives escaped.
    // Parsing it is what compares the two commands rather than their spellings.
    expect(vercel.ignoreCommand).toBe(JSON.parse(inGenerator!));
  });
});

/**
 * test/headers.test.ts pins COOP and the connect-src origin, which are the two that break the app when
 * they move. These four are the opposite case: nothing visibly breaks if they weaken, so a regression
 * would ship in silence. `default-src 'self'` already covers script-src and object-src by fallback —
 * the point of stating them is that the fallback is 'self', which is not the value either one wants.
 */
describe("the Content-Security-Policy directives that fail silently", () => {
  const csp = new Map(
    (vercel.headers.flatMap((h) => h.headers).find((h) => h.key === "Content-Security-Policy")?.value ?? "")
      .split(";")
      .map((d) => {
        const [name, ...rest] = d.trim().split(/\s+/);
        return [name!, rest.join(" ")] as const;
      }),
  );

  it("runs no inline or eval'd script", () => {
    expect(csp.get("script-src")).toBe("'self'");
  });

  it("allows no plugin content at all, rather than same-origin plugin content", () => {
    expect(csp.get("object-src")).toBe("'none'");
  });

  it("cannot be reframed, and cannot have its relative URLs repointed", () => {
    expect(csp.get("frame-ancestors")).toBe("'none'");
    expect(csp.get("base-uri")).toBe("'self'");
    expect(csp.get("form-action")).toBe("'self'");
  });
});
