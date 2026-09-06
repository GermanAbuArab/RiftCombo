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
  // Vercel's Hobby plan caps builds at 100 a day, and on 2026-09-06 this repo spent it by 20:00: 130 commits, most
  // of them CLAUDE.md and walk documents that change nothing the bundle reads. Exit 0 = skip the build, 1 = build.
  ignoreCommand: "git diff --quiet HEAD^ HEAD -- web src data scripts package.json package-lock.json tsconfig.json vercel.json",
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
