// robots.txt, sitemap.xml and the pre-rendered pages for public/ (#268, #286). Crawlers see only real
// paths, never a hash route. The hand-written pages are STATIC_PAGES; every other entry, the landing
// at `/` among them (#288), is a page `src/render/site.ts` rendered, so the sitemap is generated from
// what the build wrote, and `writeSeo` still refuses a path with no file behind it.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const ORIGIN = "https://riftcombo.app";

/**
 * The AdSense publisher id, bare (`pub-` and 16 digits), or "" (#291, #272 design §3). Not a secret
 * and not an env var: it is printed in ads.txt and in every page's head for anyone to read. Empty is
 * the dark launch: no ads.txt, no `google-adsense-account` tag, no loader and no slots. The value
 * comes from #273; ad slots stay off until the Riot Developer Portal approves (#285) and AdSense does.
 */
export const ADSENSE_PUBLISHER_ID = "";

const PUBLISHER_ID = /^pub-\d{16}$/;

/** `id` itself once it is "" or a well-formed publisher id; a typo fails the build instead of shipping. */
export function publisherId(id) {
  if (id !== "" && !PUBLISHER_ID.test(id)) throw new Error(`ADSENSE_PUBLISHER_ID ${JSON.stringify(id)} is not "" or ${PUBLISHER_ID}`);
  return id;
}

/**
 * The one ads.txt line, in the form https://support.google.com/adsense/answer/12171612 gives it:
 * `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0` (f08c47fec0942fa0 is Google's
 * certification authority id, the same for every publisher).
 */
export function adsTxt(id) {
  if (publisherId(id) === "") throw new Error("adsTxt needs a publisher id");
  return `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
}

/**
 * The hand-written pages, as they are linked (cleanUrls serves `/privacy` from privacy.html), their
 * file in public/, and the source file whose last commit dates them.
 */
export const STATIC_PAGES = [
  { path: "/privacy", file: "privacy.html", sources: ["web/privacy.html"] },
  { path: "/terms", file: "terms.html", sources: ["web/terms.html"] },
];

const CANONICAL = `<link rel="canonical" href="${ORIGIN}/">`;

/** The markers around the ad slot rules in web/styles.css (#292). */
export const AD_STYLES = ["/* ad slots begin */\n", "/* ad slots end */\n"];

/**
 * web/styles.css with the ad slot rules cut out, for a dark build (#292): with no publisher id no page
 * carries a slot, so nothing about ads ships either. Throws if the markers are gone, so a rename cannot
 * quietly leave the rules in.
 */
export function withoutAdStyles(css) {
  const [begin, end] = AD_STYLES;
  const from = css.indexOf(begin);
  const to = css.indexOf(end);
  if (from < 0 || to < from || css.indexOf(begin, from + 1) >= 0) throw new Error("styles.css has no single ad slots begin/end block");
  return css.slice(0, from) + css.slice(to + end.length);
}

/**
 * The app shell served at /app and /decks/* (#287): `index.html` with `noindex` where its canonical
 * was. A canonical pointing at `/` beside `noindex` would send a crawler two answers, and the shell
 * is a signed-in tool, never a page to index (#272 §2).
 */
export function appShell(indexHtml) {
  if (!indexHtml.includes(CANONICAL)) throw new Error(`index.html has no ${CANONICAL} to replace`);
  return indexHtml.replace(CANONICAL, '<meta name="robots" content="noindex">');
}

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
 * The offending path segment of a page file (or the whole value), or null when it is acceptable: a
 * page is `<slug>.html` or `<dir>/<slug>.html`, and a deeper path is a separator inside an id.
 */
export function pageFileProblem(file) {
  const segs = String(file).replace(/\.html$/, "").split("/");
  const bad = segs.find((seg) => !SLUG_SHAPE.test(seg));
  if (bad !== undefined) return bad;
  return segs.length > 2 || !String(file).endsWith(".html") ? String(file) : null;
}

/**
 * Write each rendered page to its file under `out`. Every path segment of `p.file` (a combo id or play
 * slug among them, read from data/combos.json and docs/plays/) must have the slug shape, so no value
 * can leave `out` or name an unroutable page; a miss fails the build naming the value and its source.
 */
export function writePages(out, pages) {
  // Check every file name before writing any, so a bad id never leaves a partial public/ behind.
  for (const p of pages) {
    const bad = pageFileProblem(p.file);
    if (bad !== null) {
      throw new Error(`writePages: page file ${JSON.stringify(p.file)} has segment ${JSON.stringify(bad)} outside ${SLUG_SHAPE} (source: ${(p.sources ?? []).join(", ") || "unknown"})`);
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

/**
 * Write robots.txt and sitemap.xml into `out`, after checking every listed page is really there, and
 * ads.txt when a publisher id is set. With none, an ads.txt left by an earlier local build is removed,
 * so `out` holds one exactly when the id is set.
 */
export function writeSeo(out, entries, adsenseId = ADSENSE_PUBLISHER_ID) {
  const ads = publisherId(adsenseId);
  for (const p of entries) {
    if (!existsSync(join(out, p.file))) throw new Error(`sitemap lists ${p.path} but ${p.file} is not in ${out}`);
  }
  writeFileSync(join(out, "robots.txt"), robotsTxt());
  writeFileSync(join(out, "sitemap.xml"), sitemapXml(entries));
  if (ads) writeFileSync(join(out, "ads.txt"), adsTxt(ads));
  else rmSync(join(out, "ads.txt"), { force: true });
}
