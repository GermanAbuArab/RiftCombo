import { copyFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error -- plain .mjs build script, no types
import { ORIGIN, PAGES, robotsTxt, sitemapXml, writeSeo } from "../scripts/web-seo.mjs";

type Page = { path: string; file: string };
const pages = PAGES as Page[];
const web = (f: string) => new URL(`../web/${f}`, import.meta.url).pathname;

describe("robots.txt and sitemap.xml (#268)", () => {
  it("are written by build:web", () => {
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    expect(build).toContain("writeSeo(OUT)");
  });

  it("robots.txt points at the sitemap and never disallows the whole site", () => {
    const robots = robotsTxt() as string;
    expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m);
  });

  it("the sitemap is a urlset of absolute https://riftcombo.app locs with no hash route", () => {
    const xml = sitemapXml() as string;
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs).toEqual(pages.map((p) => `https://riftcombo.app${p.path}`));
    expect(new Set(locs).size).toBe(locs.length);
    for (const loc of locs) expect(loc, loc).not.toContain("#");
  });

  it("every loc resolves to a file the build copies into public/", () => {
    const out = mkdtempSync(join(tmpdir(), "seo-"));
    for (const p of pages) copyFileSync(web(p.file), join(out, p.file));
    writeSeo(out);
    expect(readFileSync(join(out, "robots.txt"), "utf8")).toBe(robotsTxt());
    expect(readFileSync(join(out, "sitemap.xml"), "utf8")).toBe(sitemapXml());
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    for (const p of pages) expect(build, `${p.file} would never reach public/`).toContain(`"${p.file}"`);
  });

  it("refuses to write a sitemap whose page is missing from the output", () => {
    const out = mkdtempSync(join(tmpdir(), "seo-"));
    expect(() => writeSeo(out)).toThrow(/sitemap lists \//);
  });

  it("the security headers cover both files", () => {
    const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")) as { headers: { source: string }[] };
    for (const f of ["/robots.txt", "/sitemap.xml"]) {
      expect(vercel.headers.some((h) => new RegExp(`^${h.source}$`).test(f)), f).toBe(true);
    }
  });
});
