#!/usr/bin/env node
// Build the static site into public/: bundle web/main.ts, copy the page + styles, and emit two data
// files for the browser — a slimmed card index (matching needs codes/names/domains; the drawer shows
// text) and the run plays, whose markdown in docs/plays/ stays the single source of truth (#206).
//
//   node scripts/build-web.mjs           # production build
//   node scripts/build-web.mjs --watch   # rebuild on change

import { build, context } from "esbuild";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "./site-config.mjs";
import { slimCard } from "./web-card-fields.mjs";
import { loadPlays } from "./web-plays.mjs";
import { stripProsePlugin } from "./web-combo-prose.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");
const watch = process.argv.includes("--watch");

mkdirSync(join(OUT, "data"), { recursive: true });

const full = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));
const slim = {
  resultsUpdatedAt: full.resultsUpdatedAt,
  built: full.built,
  cards: full.cards.map(slimCard),
};
writeFileSync(join(OUT, "data", "cards.json"), JSON.stringify(slim));
// Fetched rather than bundled, and only when the view is first opened: the plays are prose, nobody
// reading a deck list needs them, and keeping them out of app.js keeps the cost on the page that
// asks for it. The markdown ships verbatim; web/plays.ts renders it.
// 2026-09-19: the plays are WITHHELD, and this flag is the whole switch. Measured that day: 15 of 15 published
// plays carried internal fleet language, and `2026-09-13-the-entry-the-clock-condemned-hardest`
// carried a section headed "## 6. For the manager" — a work punch-list from one lane to another,
// with script paths and "not mine to edit" — rendered under an h1 on a public page that also
// carries the Riot disclaimer. The source IS the render (`readPlay` ships each file verbatim), so
// nothing filtered it. #206's "ship later if good" was tested on the first four plays, which carry
// none of that; the internal sections accreted afterwards and nobody re-checked.
// Hiding the nav alone would not have been enough — the text was readable at /data/plays.json,
// so the payload ships EMPTY rather than not shipping: the view, its route and its renderer all
// stay wired and simply have nothing to list, which keeps the blast radius at this one line.
// Everything else is deliberately left standing (docs/plays/, web-plays.mjs, web/plays.ts), so
// republishing after the plays are edited for a reader is reverting this commit.
const PUBLISH_PLAYS = false;
const plays = PUBLISH_PLAYS ? loadPlays(ROOT) : [];
writeFileSync(join(OUT, "data", "plays.json"), JSON.stringify({ plays }));
// 404.html is served by Vercel for any address that matches nothing, so it carries no script: it has
// to work in the case where the bundle is what went wrong (#77).
for (const f of ["index.html", "privacy.html", "terms.html", "404.html", "styles.css", "favicon.svg"]) copyFileSync(join(ROOT, "web", f), join(OUT, f));

// Both values are public by design and are baked in rather than fetched, so the account layer is
// either present in a build or absent from it — never half-configured at runtime. An empty pair
// switches the whole thing off and leaves the anonymous app exactly as it was.
const site = siteConfig(ROOT);

// The combo catalogue is IMPORTED by web/main.ts, not fetched, so esbuild inlines all of it into
// app.js. This plugin is the only point at which the browser's copy can differ from the audited file,
// and it exists because `web/main.ts` renders every entry's `notes` in a panel titled "How this entry
// was audited" — which was showing sentences addressed to another agent ("NOTE FOR THE MANAGER…",
// "at rc-manager5's direction after this lane raised it…"). 127 of 771 entries, 140 sentences,
// measured 2026-09-19 and live on the site that day. Filtering in the render path would have hidden
// the panel and still shipped the bytes; this way they are never in the bundle.
// `data/combos.json` is untouched on purpose: the audit trail is real provenance for us, and the
// reader is the one who should not get it. Same shape as PUBLISH_PLAYS above.
const stripComboProse = stripProsePlugin(ROOT, readFileSync);

const options = {
  entryPoints: [join(ROOT, "web", "main.ts")],
  bundle: true,
  format: "esm",
  target: ["es2022"],
  minify: !watch,
  sourcemap: true,
  outfile: join(OUT, "app.js"),
  logLevel: "info",
  plugins: [stripComboProse],
  define: {
    __SUPABASE_URL__: JSON.stringify(site.url),
    __SUPABASE_ANON_KEY__: JSON.stringify(site.anonKey),
  },
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("watching web/ …");
} else {
  await build(options);
  const size = (f) => `${(readFileSync(join(OUT, f)).length / 1024).toFixed(0)} KB`;
  console.log(`public/app.js ${size("app.js")} · public/data/cards.json ${size("data/cards.json")} · public/data/plays.json ${size("data/plays.json")} (${plays.length} plays)`);
  console.log(site.url ? `accounts: ${site.url}` : "accounts: off (SUPABASE_URL / SUPABASE_ANON_KEY unset)");
}
