// robots.txt and sitemap.xml for public/ (#268). Crawlers see only real paths: the views behind
// `#/combos`, `#/decks`, `#/plays/...` are one document to them, so no hash route is listed.
// A new crawlable page is one line in PAGES; `writeSeo` refuses a path with no file behind it.

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ORIGIN = "https://riftcombo.app";

/** Each crawlable path, as it is linked (cleanUrls serves `/privacy` from privacy.html), and its file. */
export const PAGES = [
  { path: "/", file: "index.html" },
  { path: "/privacy", file: "privacy.html" },
  { path: "/terms", file: "terms.html" },
];

export function robotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
}

export function sitemapXml() {
  const urls = PAGES.map((p) => `  <url><loc>${ORIGIN}${p.path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Write both files into `out`, after checking every listed page is really there. */
export function writeSeo(out) {
  for (const p of PAGES) {
    if (!existsSync(join(out, p.file))) throw new Error(`sitemap lists ${p.path} but ${p.file} is not in ${out}`);
  }
  writeFileSync(join(out, "robots.txt"), robotsTxt());
  writeFileSync(join(out, "sitemap.xml"), sitemapXml());
}
