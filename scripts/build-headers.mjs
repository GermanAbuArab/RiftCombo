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
  ignoreCommand:
    "git diff --quiet ${VERCEL_GIT_PREVIOUS_SHA:-HEAD^} HEAD -- web src data scripts api package.json package-lock.json tsconfig.json vercel.json",
  outputDirectory: "public",
  framework: null,
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
