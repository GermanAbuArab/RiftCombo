import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The Ignored Build Step decides whether a push reaches the site at all, and every way it goes wrong
 * is silent: Vercel cancels the deployment and nothing anywhere reports that the change never shipped
 * (issue #126). Two properties are pinned here because a regression in either is invisible until a
 * user notices the site is a commit behind.
 *
 *  - the diff must start from VERCEL_GIT_PREVIOUS_SHA, "the git SHA of the last successful deployment
 *    for the project and branch". `HEAD^ HEAD` reads only the TIP of a push, so a push that carried a
 *    data/ commit behind a docs/ commit is cancelled and the data never deploys. That shape is in this
 *    repo's own history: 55e24f3 (data/combos.json) followed by 793ebad (CLAUDE.md only).
 *  - `api` must be watched. api/deck-url.ts is a live serverless route, and a commit that only fixes it
 *    would otherwise exit 0 and never be deployed.
 *
 * Also pinned: vercel.json is generated output, and Vercel reads it from the repository BEFORE the
 * build command runs, so a committed file that has drifted from its generator is what actually ships.
 */
const ROOT = new URL("..", import.meta.url);
const vercel = JSON.parse(readFileSync(new URL("vercel.json", ROOT), "utf8")) as {
  ignoreCommand?: string;
};

describe("the Vercel ignore build step", () => {
  const command = vercel.ignoreCommand ?? "";

  it("diffs from the last successful deployment, not from the tip of the push", () => {
    expect(command).toContain("VERCEL_GIT_PREVIOUS_SHA");
    // The fallback matters on the first deployment, when there is no previous SHA to diff from.
    expect(command).toContain("${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}");
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
    const inGenerator = /ignoreCommand:\s*\n?\s*"((?:[^"\\]|\\.)*)"/.exec(generator)?.[1];
    expect(inGenerator, "no ignoreCommand found in scripts/build-headers.mjs").toBeDefined();
    expect(vercel.ignoreCommand).toBe(inGenerator);
  });
});
