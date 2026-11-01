import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error -- plain .mjs build script, no types
import { gitLastmod, lastmodOf, ORIGIN, robotsTxt, sitemapEntries, sitemapXml, STATIC_PAGES, writeSeo } from "../scripts/web-seo.mjs";

type Page = { path: string; file: string; sources: string[] };
const pages = STATIC_PAGES as Page[];
const root = new URL("..", import.meta.url).pathname;
// The hand-written pages alone; test/render.test.ts covers the sitemap with the rendered pages in it.
const entries = () => sitemapEntries(root, []) as { path: string; file: string; lastmod: string | null }[];
const web = (f: string) => new URL(`../web/${f}`, import.meta.url).pathname;

describe("robots.txt and sitemap.xml (#268)", () => {
  it("are written by build:web", () => {
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    expect(build).toContain("writeSeo(OUT, sitemap)");
  });

  it("robots.txt points at the sitemap and never disallows the whole site", () => {
    const robots = robotsTxt() as string;
    expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m);
  });

  it("the sitemap is a urlset of absolute https://riftcombo.app locs with no hash route", () => {
    const xml = sitemapXml(entries()) as string;
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs).toEqual(pages.map((p) => `https://riftcombo.app${p.path}`));
    expect(new Set(locs).size).toBe(locs.length);
    for (const loc of locs) expect(loc, loc).not.toContain("#");
  });

  it("every loc resolves to a file the build copies into public/", () => {
    const out = mkdtempSync(join(tmpdir(), "seo-"));
    for (const p of pages) copyFileSync(web(p.file), join(out, p.file));
    writeSeo(out, entries());
    expect(readFileSync(join(out, "robots.txt"), "utf8")).toBe(robotsTxt());
    expect(readFileSync(join(out, "sitemap.xml"), "utf8")).toBe(sitemapXml(entries()));
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    for (const p of pages) expect(build, `${p.file} would never reach public/`).toContain(`"${p.file}"`);
  });

  it("refuses to write a sitemap whose page is missing from the output", () => {
    const out = mkdtempSync(join(tmpdir(), "seo-"));
    expect(() => writeSeo(out, entries())).toThrow(/sitemap lists \//);
  });

  it("dates each URL by the last commit to its source, and states none it cannot vouch for", () => {
    const xml = sitemapXml([{ path: "/a", lastmod: "2026-10-01" }, { path: "/b", lastmod: null }]) as string;
    expect(xml).toContain("<url><loc>https://riftcombo.app/a</loc><lastmod>2026-10-01</lastmod></url>");
    expect(xml).toContain("<url><loc>https://riftcombo.app/b</loc></url>");
    // The newest of a page's sources wins; an undated source neither wins nor blanks the others.
    const dates = new Map([["x", "2026-09-01"], ["y", "2026-10-02"], ["z", null]]);
    expect(lastmodOf(["x", "y", "z"], dates)).toBe("2026-10-02");
    expect(lastmodOf(["z"], dates)).toBeNull();
    // A path git has never seen has no date, and a directory is dated by the files under it.
    const real = gitLastmod(root, ["web/index.html", "docs/plays", "no/such/path"]) as Map<string, string | null>;
    expect(real.get("no/such/path")).toBeNull();
    if (real.get("web/index.html")) expect(real.get("web/index.html")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("dates nothing outside a git checkout rather than inventing a date", () => {
    const out = mkdtempSync(join(tmpdir(), "seo-nogit-"));
    const m = gitLastmod(out, ["index.html"]) as Map<string, string | null>;
    expect(m.get("index.html")).toBeNull();
  });

  /**
   * Vercel builds from a shallow clone, whose oldest commit carries every file in the tree. Dating by
   * it would stamp each untouched page with the clone's depth, so it dates nothing.
   */
  it("does not date a file by the boundary commit of a shallow clone", () => {
    const dir = mkdtempSync(join(tmpdir(), "seo-shallow-"));
    const git = (cwd: string, ...args: string[]) =>
      execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.test", ...args], { cwd, stdio: "ignore" });
    const src = join(dir, "src");
    mkdirSync(src);
    git(src, "init", "-q", "-b", "main");
    writeFileSync(join(src, "old.txt"), "1");
    git(src, "add", "."); git(src, "commit", "-q", "-m", "one", "--date", "2026-01-01T00:00:00Z");
    writeFileSync(join(src, "new.txt"), "2");
    git(src, "add", "."); git(src, "commit", "-q", "-m", "two");
    git(dir, "clone", "-q", "--depth", "1", `file://${src}`, "shallow");
    const m = gitLastmod(join(dir, "shallow"), ["old.txt", "new.txt"]) as Map<string, string | null>;
    expect(m.get("old.txt")).toBeNull();
    expect(m.get("new.txt")).toBeNull(); // its only commit here IS the boundary
    const full = gitLastmod(src, ["old.txt", "new.txt"]) as Map<string, string | null>;
    expect(full.get("old.txt")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(full.get("new.txt")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("the security headers cover both files", () => {
    const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")) as { headers: { source: string }[] };
    for (const f of ["/robots.txt", "/sitemap.xml"]) {
      expect(vercel.headers.some((h) => new RegExp(`^${h.source}$`).test(f)), f).toBe(true);
    }
  });
});
