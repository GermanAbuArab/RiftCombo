import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Inter is served from our own origin (#295). Until then every page asked Google Fonts for it before
 * any consent choice, so Google saw every visitor's IP address whether they signed in or not. These
 * pin the three places that would bring that request back: a page, the stylesheet, and the CSP.
 */
const web = (f: string) => readFileSync(new URL(`../web/${f}`, import.meta.url), "utf8");
const PAGES = readdirSync(new URL("../web/", import.meta.url)).filter((f) => f.endsWith(".html"));
const css = web("styles.css");
const GOOGLE = /fonts\.googleapis\.com|fonts\.gstatic\.com/;

const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")) as {
  headers: { headers: { key: string; value: string }[] }[];
};
const csp = new Map(
  vercel.headers.flatMap((h) => h.headers).find((h) => h.key === "Content-Security-Policy")!.value
    .split(";").map((d) => {
      const [name, ...rest] = d.trim().split(/\s+/);
      return [name!, rest] as const;
    }),
);

const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]!);

describe("the Inter typeface is self-hosted (#295)", () => {
  it("is requested from Google by no page and not by the stylesheet", () => {
    expect(PAGES.length).toBeGreaterThanOrEqual(4);
    for (const f of PAGES) expect(web(f), f).not.toMatch(GOOGLE);
    expect(css).not.toMatch(GOOGLE);
  });

  it("is allowed by a CSP that names no third-party style or font origin", () => {
    expect(csp.get("style-src")).toEqual(["'self'"]);
    expect(csp.get("font-src")).toEqual(["'self'"]);
    expect(JSON.stringify(vercel)).not.toMatch(GOOGLE);
  });

  it("declares every face as Inter with swap, from a file under /fonts/ that exists", () => {
    expect(faces.length).toBeGreaterThan(0);
    for (const face of faces) {
      expect(face).toMatch(/font-family:\s*"Inter"/);
      expect(face).toMatch(/font-display:\s*swap/);
      const src = /url\("?\/fonts\/([^")]+)"?\)\s*format\("woff2"\)/.exec(face);
      expect(src, face).not.toBeNull();
      expect(existsSync(new URL(`../web/fonts/${src![1]}`, import.meta.url)), src![1]).toBe(true);
    }
  });

  it("preloads, on every page, only a font the stylesheet declares", () => {
    for (const f of PAGES) {
      const preloads = [...web(f).matchAll(/<link rel="preload" href="\/fonts\/([^"]+)" as="font" type="font\/woff2" crossorigin>/g)];
      expect(preloads.length, f).toBe(1);
      expect(css, f).toContain(`url("/fonts/${preloads[0]![1]}")`);
    }
  });

  it("ships the font files and their licence in the build output", () => {
    const build = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    expect(build).toMatch(/cpSync\(join\(ROOT, "web", "fonts"\), join\(OUT, "fonts"\)/);
    expect(existsSync(new URL("../web/fonts/OFL.txt", import.meta.url))).toBe(true);
  });
});
