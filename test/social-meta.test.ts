import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Social and structured metadata (#269): a shared link has to render as a card, the JSON-LD has to
 * parse, and the strict CSP has to name the JSON-LD block by hash instead of loosening script-src.
 */
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url));
const page = (f: string) => read(`web/${f}`).toString("utf8");
const index = page("index.html");
const attr = (html: string, selector: RegExp): string | undefined => selector.exec(html)?.[1];
const meta = (html: string, kind: "property" | "name", key: string) =>
  attr(html, new RegExp(`<meta ${kind}="${key.replace(/[.:]/g, "\\$&")}" content="([^"]*)">`));

const png = (path: string) => {
  const b = read(path);
  expect(b.subarray(0, 8).toString("hex"), `${path} is not a PNG`).toBe("89504e470d0a1a0a");
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), bytes: b.length };
};

const vercel = JSON.parse(read("vercel.json").toString("utf8")) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const csp = vercel.headers.find((h) => h.source === "/(.*)")!.headers.find((h) => h.key === "Content-Security-Policy")!.value;
const scriptSrc = csp.split(";").map((d) => d.trim().split(/\s+/)).find(([name]) => name === "script-src")!.slice(1);

describe("Open Graph and Twitter card on the home page (#269)", () => {
  it("carries every og: tag the issue names, with absolute riftcombo.app URLs", () => {
    for (const key of ["og:title", "og:description", "og:url", "og:type", "og:site_name", "og:image", "og:image:width", "og:image:height", "og:image:alt"]) {
      expect(meta(index, "property", key), key).toBeTruthy();
    }
    expect(index.match(/property="og:/g)!.length).toBeGreaterThanOrEqual(6);
    expect(meta(index, "property", "og:type")).toBe("website");
    expect(meta(index, "property", "og:url")).toBe("https://riftcombo.app/");
    expect(meta(index, "property", "og:image")).toBe("https://riftcombo.app/og.png");
  });

  it("declares a large-image Twitter card with title, description and image", () => {
    expect(meta(index, "name", "twitter:card")).toBe("summary_large_image");
    for (const key of ["twitter:title", "twitter:description", "twitter:image"]) expect(meta(index, "name", key), key).toBeTruthy();
  });

  it("points at a 1200x630 PNG under 300 KB whose declared size matches the file", () => {
    const og = png("web/og.png");
    expect([og.width, og.height]).toEqual([1200, 630]);
    expect(meta(index, "property", "og:image:width")).toBe(String(og.width));
    expect(meta(index, "property", "og:image:height")).toBe(String(og.height));
    expect(og.bytes).toBeLessThan(300 * 1024);
  });

  it("keeps lang=en on every page, the content being English", () => {
    for (const f of ["index.html", "privacy.html", "terms.html", "404.html"]) expect(page(f), f).toContain('<html lang="en">');
  });
});

describe("canonical links (#269)", () => {
  it.each([
    ["index.html", "https://riftcombo.app/"],
    ["privacy.html", "https://riftcombo.app/privacy"],
    ["terms.html", "https://riftcombo.app/terms"],
  ])("%s names %s", (f, href) => {
    expect(page(f).match(/<link rel="canonical"[^>]*>/g)).toEqual([`<link rel="canonical" href="${href}">`]);
  });

  it("the 404 page, which is noindex, names none", () => {
    expect(page("404.html")).not.toContain('rel="canonical"');
  });
});

describe("JSON-LD (#269)", () => {
  const blocks = [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]!);

  it("is one block that parses, holding a WebSite and a free GameApplication", () => {
    expect(blocks).toHaveLength(1);
    const ld = JSON.parse(blocks[0]!) as { "@context": string; "@graph": Record<string, unknown>[] };
    expect(ld["@context"]).toBe("https://schema.org");
    const byType = new Map(ld["@graph"].map((n) => [n["@type"], n]));
    const site = byType.get("WebSite")!;
    const app = byType.get("WebApplication")!;
    expect(site).toMatchObject({ name: "RiftCombo", url: "https://riftcombo.app/" });
    expect(app).toMatchObject({
      name: "RiftCombo",
      url: "https://riftcombo.app/",
      applicationCategory: "GameApplication",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0" },
    });
    expect(typeof app.description).toBe("string");
  });

  it("is named in script-src by its exact sha256, and script-src never allows inline script wholesale", () => {
    const hash = `'sha256-${createHash("sha256").update(blocks[0]!, "utf8").digest("base64")}'`;
    expect(scriptSrc, "run `npm run headers` after editing the JSON-LD").toContain(hash);
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).toEqual(["'self'", hash]);
  });
});

describe("apple-touch-icon and web manifest (#269)", () => {
  const manifest = JSON.parse(page("manifest.webmanifest")) as {
    name: string; short_name: string; display: string; background_color: string; theme_color: string;
    icons: { src: string; sizes: string; type: string }[];
  };

  it("every page links the touch icon and the manifest", () => {
    for (const f of ["index.html", "privacy.html", "terms.html", "404.html"]) {
      expect(page(f), f).toContain('<link rel="apple-touch-icon" href="/apple-touch-icon.png">');
      expect(page(f), f).toContain('<link rel="manifest" href="/manifest.webmanifest">');
    }
  });

  it("the touch icon is a 180x180 PNG", () => {
    const icon = png("web/apple-touch-icon.png");
    expect([icon.width, icon.height]).toEqual([180, 180]);
  });

  it("the manifest names the app, the 192 and 512 icons that exist, and the palette tokens", () => {
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBe("RiftCombo");
    const styles = page("styles.css");
    const token = (name: string) => new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(styles)![1]!.toLowerCase();
    expect(manifest.background_color.toLowerCase()).toBe(token("bg"));
    expect(manifest.theme_color.toLowerCase()).toBe(token("accent"));
    expect(manifest.icons.map((i) => i.sizes)).toEqual(["192x192", "512x512"]);
    for (const icon of manifest.icons) {
      expect(icon.type).toBe("image/png");
      const { width, height } = png(`web${icon.src}`);
      expect(`${width}x${height}`).toBe(icon.sizes);
    }
  });

  it("opens in the browser, never as an installed app", () => {
    // Sign-in is a full-page redirect through Google and Neon Auth, both outside the manifest's scope;
    // a standalone launch (with iOS's separate cookie jar) can strand that round trip outside the app.
    expect(manifest.display).toBe("browser");
  });

  it("is served as application/manifest+json", () => {
    const rule = vercel.headers.find((h) => h.source === "/manifest.webmanifest");
    expect(rule?.headers).toContainEqual({ key: "Content-Type", value: "application/manifest+json" });
  });

  it("build:web copies the card, the icons and the manifest into public/", () => {
    const build = read("scripts/build-web.mjs").toString("utf8");
    for (const f of ["og.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "manifest.webmanifest"]) expect(build, f).toContain(`"${f}"`);
  });
});
