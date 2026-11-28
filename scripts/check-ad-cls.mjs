#!/usr/bin/env node
// The zero-CLS check for the reserved ad slots (#292, #272 §6 "Verification"): one combo page and one
// play, at 1280 and 390 px, each with a stub that fills every `<ins class="adsbygoogle">` one second
// after load, and the `layout-shift` entries of a PerformanceObserver summed. Every pass must sum to 0.
//
// The pages are rendered here by `renderSite` with a fake publisher id, the call build:web makes, so
// the check needs no build and sees the slots the dark launch leaves out of public/. They are served
// from a local port with web/styles.css and web/fonts; Google's script is aborted, so the only fill is
// the stub's. A shift below the fold is not reported by the browser, so each pass first scrolls one
// slot into view (a scroll is not a layout shift) and says which.
//
// An absence needs a second instrument, so every page also runs a CONTROL: the same fill with the
// box's reserved size taken away (`width/height: auto`). The control must report a shift; if it sums
// to 0 the observer is blind and the zero above proves nothing, and the script fails.
//
// Browser: a Chromium with no ad blocker, e.g. Playwright's headless shell:
//   node scripts/check-ad-cls.mjs --executable-path ~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell
// or a CDP endpoint: node scripts/check-ad-cls.mjs --cdp <url>
// NOT Brave: once Shields' cosmetic list has loaded (a few pages into a fresh profile) it hides
// `ins.adsbygoogle` and fills it before the stub does, so the box is no longer measured (2026-11-27:
// the control read 0.0000 from the fifth page on). Each pass therefore checks first that every ins is
// displayed and empty, and fails as "blinded" when it is not.
//
// Exit 0 when every pass sums to 0 and every control does not, 1 otherwise.

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join, dirname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { tsImport } from "tsx/esm/api";
import { slimCard } from "./web-card-fields.mjs";
import { loadPlays } from "./web-plays.mjs";
import { stripInternalDeep } from "./web-combo-prose.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FAKE = "pub-0000000000000000";
const WIDTHS = [{ width: 1280, height: 900 }, { width: 390, height: 844 }];

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i < 0 ? null : process.argv[i + 1] ?? null;
};
const cdp = arg("--cdp");
const executablePath = arg("--executable-path");
if (!cdp && !executablePath) {
  console.error("usage: node scripts/check-ad-cls.mjs --cdp <url> | --executable-path <chromium>");
  process.exit(2);
}

// The site as build:web renders it, with an id.
const readData = (f) => stripInternalDeep(JSON.parse(readFileSync(join(ROOT, "data", f), "utf8")));
const cards = JSON.parse(readFileSync(join(ROOT, "data", "cards.json"), "utf8"));
const names = new Map(JSON.parse(readFileSync(join(ROOT, "data", "combos.json"), "utf8")).combos.map((e) => [e.id, e.name]));
const plays = loadPlays(ROOT, (id) => names.get(id) ?? null);
const { renderSite } = await tsImport("../src/render/site.ts", import.meta.url);
const site = renderSite({
  combos: readData("combos.json").combos,
  cards: cards.cards.map(slimCard),
  legality: readData("legality.json").entries,
  features: readData("features.json").features,
  plays: plays.map((p) => ({ ...p, file: `docs/plays/${p.slug}.md` })),
  resultsUpdatedAt: cards.resultsUpdatedAt,
  adsensePublisherId: FAKE,
});
const slots = (html) => (html.match(/class="ad-slot /g) ?? []).length;
const combo = site.find((p) => p.path.startsWith("/combos/") && slots(p.html) === 2);
const play = site.find((p) => p.path.startsWith("/plays/") && slots(p.html) === 2);
if (!combo || !play) throw new Error("no combo page or play with two slots to measure");
const pages = new Map(site.map((p) => [p.path, p.html]));

const TYPES = { ".css": "text/css; charset=utf-8", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (pages.has(path)) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(pages.get(path));
  }
  const file = normalize(join(ROOT, "web", path));
  if ((path === "/styles.css" || path.startsWith("/fonts/")) && file.startsWith(join(ROOT, "web") + sep)) {
    try {
      const body = readFileSync(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      return res.end(body);
    } catch { /* fall through to 404 */ }
  }
  res.writeHead(404).end();
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// `takeRecords()` at the read flushes entries the browser has queued but not yet delivered, so a
// shift cannot be missed by reading too early.
const OBSERVE = `window.__shift = 0; window.__add = (es) => { for (const e of es) if (!e.hadRecentInput) window.__shift += e.value; }; window.__obs = new PerformanceObserver((l) => window.__add(l.getEntries())); window.__obs.observe({ type: "layout-shift", buffered: true });`;
const UNRESERVE = ".ad-slot { width: auto !important; height: auto !important; }";
// Scroll anchoring off in every pass: with it on, a box that grows above the anchor node is paid for by
// a scroll adjustment the browser does not report as a shift, so the control read 0.0000 on some runs
// and 0.14 on others (measured 2026-11-27). Off, the instrument is stricter for the real passes too.
const NO_ANCHOR = "* { overflow-anchor: none !important; }";

/**
 * One pass: load, scroll slot `which` into view, fill every ins 1 s after load with a creative of
 * `creative` ("box" = the reserved size, "oversized" = 400x600), wait, read the summed shift.
 */
async function pass(browser, path, size, which, creative, control) {
  const context = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.route(/googlesyndication|privacy-choices/, (r) => r.abort());
  await page.addInitScript(OBSERVE);
  await page.goto(origin + path, { waitUntil: "load" });
  await page.addStyleTag({ content: control ? `${NO_ANCHOR}\n${UNRESERVE}` : NO_ANCHOR });
  const seen = await page.evaluate(async ({ which, creative }) => {
    await document.fonts.ready;
    const loadedAt = performance.timing.loadEventStart - performance.timing.navigationStart;
    const slot = document.querySelectorAll(".ad-slot")[which];
    slot.scrollIntoView({ block: "center" });
    const r = slot.getBoundingClientRect();
    // Whether the box is wholly on screen, both ways. A page's own wide content is not the slot's.
    const inView = r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth;
    // Two painted frames at the new scroll position before the fill: a shift counts only for content
    // visible in the frame before it, so a fill in the same task as the scroll (a load slower than 1 s)
    // reads 0 whatever the box does. The control caught exactly that on 2026-11-27.
    const frame = () => new Promise((done) => requestAnimationFrame(() => done()));
    await frame();
    await frame();
    await new Promise((done) => setTimeout(done, Math.max(0, loadedAt + 1000 - performance.now())));
    const blinded = [...document.querySelectorAll("ins.adsbygoogle")].some((i) => getComputedStyle(i).display === "none" || i.childElementCount > 0);
    for (const ins of document.querySelectorAll("ins.adsbygoogle")) {
      const ad = document.createElement("div");
      ad.style.width = creative === "box" ? `${ins.clientWidth || 300}px` : "400px";
      ad.style.height = creative === "box" ? `${ins.clientHeight || 250}px` : "600px";
      ad.style.background = "#555";
      ins.appendChild(ad);
      ins.setAttribute("data-ad-status", "filled");
    }
    await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(done, 1000))));
    window.__add(window.__obs.takeRecords());
    return { blinded, inView, box: `${Math.round(r.width)}x${Math.round(r.height)}`, shift: window.__shift };
  }, { which, creative });
  await context.close();
  return seen;
}

const browser = cdp ? await chromium.connectOverCDP(cdp) : await chromium.launch({ executablePath, headless: true });
let failed = false;
try {
  for (const { path } of [combo, play]) {
    for (const size of WIDTHS) {
      for (const which of [0, 1]) {
        for (const creative of ["box", "oversized"]) {
          const r = await pass(browser, path, size, which, creative, false);
          const ok = r.shift === 0 && r.inView && !r.blinded;
          failed ||= !ok;
          console.log(`${ok ? "ok  " : "FAIL"} ${path} ${size.width}px slot=${which === 0 ? "in-content" : "end"} box=${r.box} inView=${r.inView} blinded=${r.blinded} fill=${creative} layout-shift=${r.shift}`);
        }
      }
      const c = await pass(browser, path, size, 0, "box", true);
      const ok = c.shift > 0 && !c.blinded;
      failed ||= !ok;
      console.log(`${ok ? "ok  " : "FAIL"} control ${path} ${size.width}px slot=in-content unreserved blinded=${c.blinded} fill=box layout-shift=${c.shift.toFixed(4)} (must be > 0)`);
    }
  }
} finally {
  await browser.close();
  server.close();
}
process.exit(failed ? 1 : 0);
