// robots.txt, sitemap.xml and the pre-rendered pages for public/ (#268, #286). Crawlers see only real
// paths: the views behind `#/combos`, `#/decks`, `#/plays/...` are one document to them, so no hash
// route is listed. The hand-written pages are STATIC_PAGES; every other entry is a page
// `src/render/site.ts` rendered, so the sitemap is generated from what the build wrote, and
// `writeSeo` still refuses a path with no file behind it.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const ORIGIN = "https://riftcombo.app";

/**
 * The hand-written pages, as they are linked (cleanUrls serves `/privacy` from privacy.html), their
 * file in public/, and the source file whose last commit dates them.
 */
export const STATIC_PAGES = [
  // The Guide and Sources views at / are filled from src/render/pages.ts.
  { path: "/", file: "index.html", sources: ["web/index.html", "src/render/pages.ts"] },
  { path: "/privacy", file: "privacy.html", sources: ["web/privacy.html"] },
  { path: "/terms", file: "terms.html", sources: ["web/terms.html"] },
];

export function robotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
}

/** `entries` is `{ path, lastmod? }[]`; a lastmod nobody can vouch for is left out rather than guessed. */
export function sitemapXml(entries) {
  const urls = entries.map((p) =>
    `  <url><loc>${ORIGIN}${p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}</url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** The shape of a combo id, a play slug and every directory and file name a page is written under (#557). */
export const SLUG_SHAPE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Write each rendered page to its file under `out`. Every path segment of `p.file` (a combo id or play
 * slug among them, read from data/combos.json and docs/plays/) must have the slug shape, so no value
 * can leave `out` or name an unroutable page; a miss fails the build naming the value and its source.
 */
export function writePages(out, pages) {
  // Check every page before writing any, so a bad id never leaves a partial public/ behind.
  for (const p of pages) {
    const segs = String(p.file).replace(/\.html$/, "").split("/");
    const bad = segs.find((seg) => !SLUG_SHAPE.test(seg));
    // A page is `<slug>.html` or `<dir>/<slug>.html`: a deeper path is a separator inside an id.
    if (bad !== undefined || segs.length > 2 || !String(p.file).endsWith(".html")) {
      throw new Error(`writePages: page file ${JSON.stringify(p.file)} has segment ${JSON.stringify(bad ?? p.file)} outside ${SLUG_SHAPE} (source: ${(p.sources ?? []).join(", ") || "unknown"})`);
    }
  }
  for (const p of pages) {
    const file = join(out, p.file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, p.html);
  }
}

/**
 * The newest commit date (YYYY-MM-DD) touching each of `paths` (files or directories), from one
 * `git log` over all of them. Null for a path git cannot date.
 *
 * Vercel builds from a SHALLOW clone, where the oldest commit present stands for the whole history
 * before it and carries every file in the tree: dating a file by it would stamp the sitemap with the
 * clone's depth instead of the file's change. A shallow-boundary commit therefore dates nothing, and
 * a path whose only commit is that one gets no lastmod. Outside a git checkout, every path is null.
 */
export function gitLastmod(root, paths) {
  const want = [...new Set(paths)];
  const result = new Map(want.map((p) => [p, null]));
  let log;
  let shallow = new Set();
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });
  try {
    log = git(["log", "--format=%x01%H %cI", "--name-only", "--", ...want]);
    const file = git(["rev-parse", "--git-path", "shallow"]).trim();
    const abs = file.startsWith("/") ? file : join(root, file);
    if (existsSync(abs)) shallow = new Set(readFileSync(abs, "utf8").split("\n").filter(Boolean));
  } catch {
    return result;
  }
  const covers = (p, f) => f === p || f.startsWith(`${p}/`);
  // Newest first: the first commit that names a file under a path is that path's date.
  for (const chunk of log.split("\x01").slice(1)) {
    const [head, ...files] = chunk.split("\n").filter(Boolean);
    const [sha, date] = head.split(" ");
    if (shallow.has(sha)) continue;
    for (const p of want) {
      if (result.get(p) === null && files.some((f) => covers(p, f))) result.set(p, date.slice(0, 10));
    }
    if ([...result.values()].every((v) => v !== null)) break;
  }
  return result;
}

/** The newest of the dates of a page's sources, or null if none of them has one. */
export function lastmodOf(sources, dates) {
  const known = sources.map((s) => dates.get(s)).filter(Boolean).sort();
  return known.at(-1) ?? null;
}

/**
 * Every URL the sitemap lists: the hand-written pages, then each rendered page that is not
 * `noindex` — a page kept out of search has no business in the list given to search.
 */
export function sitemapEntries(root, rendered) {
  const listed = [...STATIC_PAGES, ...rendered.filter((p) => !p.noindex)];
  const dates = gitLastmod(root, listed.flatMap((p) => p.sources));
  return listed.map((p) => ({ path: p.path, file: p.file, lastmod: lastmodOf(p.sources, dates) }));
}

/** Write robots.txt and sitemap.xml into `out`, after checking every listed page is really there. */
export function writeSeo(out, entries) {
  for (const p of entries) {
    if (!existsSync(join(out, p.file))) throw new Error(`sitemap lists ${p.path} but ${p.file} is not in ${out}`);
  }
  writeFileSync(join(out, "robots.txt"), robotsTxt());
  writeFileSync(join(out, "sitemap.xml"), sitemapXml(entries));
}
