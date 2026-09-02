#!/usr/bin/env node
// Build the static site into public/: bundle web/main.ts, copy the page + styles, and emit a
// slimmed card index for the browser (matching needs codes/names/domains; the drawer shows text).
//
//   node scripts/build-web.mjs           # production build
//   node scripts/build-web.mjs --watch   # rebuild on change

import { build, context } from "esbuild";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");
const watch = process.argv.includes("--watch");

mkdirSync(join(OUT, "data"), { recursive: true });

const full = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));
const slim = {
  resultsUpdatedAt: full.resultsUpdatedAt,
  built: full.built,
  cards: full.cards.map((c) => ({
    code: c.code, base: c.base, variant: c.variant, name: c.name, set: c.set, collectorNumber: c.collectorNumber,
    type: c.type, domains: c.domains, energy: c.energy, power: c.power, might: c.might, mightBonus: c.mightBonus,
    text: c.text, effect: c.effect, image: c.image, orientation: c.orientation,
  })),
};
writeFileSync(join(OUT, "data", "cards.json"), JSON.stringify(slim));
for (const f of ["index.html", "styles.css"]) copyFileSync(join(ROOT, "web", f), join(OUT, f));

const options = {
  entryPoints: [join(ROOT, "web", "main.ts")],
  bundle: true,
  format: "esm",
  target: ["es2022"],
  minify: !watch,
  sourcemap: true,
  outfile: join(OUT, "app.js"),
  logLevel: "info",
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("watching web/ …");
} else {
  await build(options);
  const size = (f) => `${(readFileSync(join(OUT, f)).length / 1024).toFixed(0)} KB`;
  console.log(`public/app.js ${size("app.js")} · public/data/cards.json ${size("data/cards.json")}`);
}
