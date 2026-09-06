#!/usr/bin/env node
// Generate vercel.json. The response headers are the one part of the app whose configuration cannot
// live in the bundle, and the Supabase origin has to appear in `connect-src` verbatim — a wildcard
// would let any Supabase project on earth be called from this page.
//
// Run it after changing SUPABASE_URL, and commit the result: Vercel reads vercel.json from the
// repository, before the build command runs, so generating it during the build would be too late.
//
//   SUPABASE_URL=https://<ref>.supabase.co node scripts/build-headers.mjs

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "./site-config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { url } = siteConfig(ROOT);

// Supabase Auth and PostgREST are both served from the project origin, so one entry covers sign-in,
// token refresh and every read and write of `public.decks`.
const connect = ["'self'", url].filter(Boolean).join(" ");

const config = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  buildCommand: "npm run build:web",
  // Skip the build when a commit touches nothing the bundle reads — CLAUDE.md and walk documents were most of
  // 2026-09-06's 130 commits. Exit 0 = skip the build, 1 = build.
  //
  // This saves build minutes and slot contention, NOT the Hobby plan's 100 deployments a day: Vercel counts a
  // cancelled build as a full deployment ("any canceled builds initiated using the ignore build step will still
  // count towards your deployment quotas"). Pushing less often is the only lever on that cap.
  //
  // The diff runs from VERCEL_GIT_PREVIOUS_SHA, "the git SHA of the last successful deployment for the project
  // and branch", which Vercel exposes only when an Ignored Build Step is set. `HEAD^ HEAD` would read just the
  // TIP of the push, so a push carrying a data/ commit behind a docs/ commit would cancel and never deploy the
  // data (issue #126). Diffing from what was last deployed cannot miss anything still undeployed; `HEAD^` is
  // the fallback for the very first deployment, when there is no previous SHA.
  // 2026-09-06 evening: VERCEL_GIT_PREVIOUS_SHA is not always present in Vercel's shallow clone — every build after
  // the #126 change died with `fatal: bad object 55e24f3…` and production sat on that commit for hours.
  //
  // 2026-09-06 night: falling back to HEAD^ was itself the bug. Sessions push to `work` and the manager promotes a
  // BATCH to master, so the tip of a promotion is often a docs-only commit — and HEAD^ made the step ask "did the
  // last commit touch code?" instead of "is anything undeployed?". Promoting 813d5c7..b5230a0, which carried the
  // whole drawer rewrite, 20 catalogue entries and 21 synergy rules, was Canceled in 1s because its tip commit
  // touched CLAUDE.md alone. A skipped batch is far worse than a spent build, so there is no fallback now: the
  // step skips ONLY when Vercel hands us a previous SHA the clone actually holds and nothing deployable changed
  // since it. Missing, unreadable, or genuinely changed all mean BUILD.
  // The braces and the `|| exit 1` are load-bearing: Vercel reads 0 as skip and 1 as build, and a bare
  // `git cat-file` on a missing object exits 128, which #126 measured as NEITHER — the deployment errors.
  // So every failure path is normalised to 1.
  ignoreCommand:
    "base=$VERCEL_GIT_PREVIOUS_SHA; { [ -n \"$base\" ] && git cat-file -e \"$base^{commit}\" 2>/dev/null && git diff --quiet \"$base\" HEAD -- web src data scripts api package.json package-lock.json tsconfig.json vercel.json ; } || exit 1",
  outputDirectory: "public",
  framework: null,
  // The Vercel build cap is per ACCOUNT, not per project, and this account carries another project —
  // measured 2026-09-06. This repo only ever pushes master, so preview deployments are switched off as
  // insurance against a branch quietly spending the shared cap.
  //
  // The slashed globs are the whole trick: minimatch's `*` never crosses a `/`, so `*/*` and `*/**`
  // match `feature/x` and `feature/a/b` but CANNOT match `master`, which is then enabled explicitly.
  // Never write `"*": false` or a bare `deploymentEnabled: false` here — both match master and would
  // switch production off.
  //
  // `work` is named on its own because it has no slash for the globs to catch. It is the shared backup
  // branch every session pushes to; master is promoted from it in batches, so that a day of commits
  // costs one deployment instead of one each. The cap is "Deployments Created per Day: 100", scoped to
  // the ACCOUNT over a rolling 86400s, and a build cancelled by the ignore step still counts against it
  // — which is why the branch has to not deploy at all rather than deploy and skip.
  //
  // Any other unslashed branch name would still deploy: Vercel's default for an unmatched branch is
  // enabled, and the only pattern that would catch them all is `"*": false`, which also catches master.
  git: { deploymentEnabled: { "*/*": false, "*/**": false, work: false, master: true } },
  // /privacy and /terms rather than /privacy.html: Google's OAuth branding page wants both links,
  // and they are printed in the footer of every page.
  cleanUrls: true,
  rewrites: [{ source: "/favicon.ico", destination: "/favicon.svg" }],
  headers: [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' https://fonts.googleapis.com",
            "font-src https://fonts.gstatic.com",
            "img-src 'self' data: https://cmsassets.rgpub.io",
            `connect-src ${connect}`,
            "frame-ancestors 'none'",
            // `default-src 'self'` would already cover plugin content, but its fallback is 'self', not
            // 'none'. The app has no <object>, <embed> or <applet> anywhere, so pinning it to 'none'
            // costs nothing and stays correct if a same-origin file is ever served from this domain.
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; "),
        },
        // Sign-in uses a full-page redirect, so this stays as it is. A popup flow would need
        // `same-origin-allow-popups`, and without it the popup never reports back at all.
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      ],
    },
  ],
};

writeFileSync(join(ROOT, "vercel.json"), `${JSON.stringify(config, null, 2)}\n`);
console.log(url ? `vercel.json: connect-src 'self' ${url}` : "vercel.json: connect-src 'self' (SUPABASE_URL unset — no account layer in this build)");
