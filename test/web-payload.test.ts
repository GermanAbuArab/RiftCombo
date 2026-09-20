import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { CardIndex } from "../src/cards.js";
import { loadCardIndex, loadSynergies } from "../src/load.js";
import { partnersOf } from "../src/synergies.js";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs, which cannot import TypeScript.
import { slimCard, WEB_CARD_FIELDS } from "../scripts/web-card-fields.mjs";
// @ts-expect-error same: the build script is .mjs, so the loader it imports has to be too.
import { loadPlays, PLAYS_DIR, readPlay } from "../scripts/web-plays.mjs";
// @ts-expect-error same: shared with scripts/build-web.mjs, which cannot import TypeScript.
import { INTERNAL, stripInternalDeep } from "../scripts/web-combo-prose.mjs";

const cards = loadCardIndex();
const synergies = loadSynergies();

/**
 * The browser gets a slimmed card record. A field src/ reads at match time that the projection
 * drops fails ONLY in the browser and passes every test here, because node loads the whole file:
 * that is exactly how the Mech rules of #27 shipped reading `tags` while the payload had none, and
 * the deployed site threw on any deck. These tests run the real predicates against the real
 * projection, so the next dropped field fails the build instead of the site.
 */
describe("the card payload the browser downloads", () => {
  // No legality entries: partnersOf never reads them, and the ban list is applied a layer up.
  const slim = new CardIndex(cards.cards.map((c: unknown) => slimCard(c)), []);

  it("matches every synergy rule to exactly the same cards as the full record", () => {
    for (const s of synergies) {
      expect(partnersOf(s, slim).map((c) => c.base), s.id).toEqual(partnersOf(s, cards).map((c) => c.base));
    }
  });

  it("carries every field a rule can read", () => {
    for (const f of ["type", "domains", "text", "effect", "tags", "mightBonus"]) {
      expect(WEB_CARD_FIELDS, `${f} is read by src/synergies.ts`).toContain(f);
    }
  });

  /**
   * The same trap, one layer over (#101). `Card.signature` arrived with #103 and the projection did
   * not learn about it, so in the browser every card read as `signature: false`: 103.2.d's cap said
   * "No Signature cards" for a deck holding four of them, 103.2.a.2 accepted Tibbers as a Chosen
   * Champion, and the builder's [S] mark would never have appeared. Passing tests, wrong site.
   */
  it("carries the fields the construction rules and the builder read", () => {
    for (const f of ["signature", "energy", "power", "might", "orientation", "image", "collectorNumber", "set"]) {
      expect(WEB_CARD_FIELDS, `${f} is read by src/build.ts or src/builder.ts`).toContain(f);
    }
    const withSig = cards.cards.filter((c: { signature?: boolean }) => c.signature);
    expect(withSig.length).toBe(51);
    expect(withSig.filter((c: unknown) => (slimCard(c) as { signature?: boolean }).signature).length).toBe(51);
  });
});

/**
 * The run plays (#206), and the same trap one layer over again. A play that never reaches the payload
 * is blank ONLY in the browser: node can read `docs/plays/` whole, so a test that opens the directory
 * itself would pass while the shipped view showed three documents out of four. These run the REAL
 * loader — the one `scripts/build-web.mjs` calls — against the REAL directory, so the thing under
 * test is the projection and not the source.
 */
describe("the run plays the browser downloads", () => {
  const files = readdirSync(PLAYS_DIR).filter((f: string) => f.endsWith(".md"));
  const plays = loadPlays(".") as { slug: string; date: string; title: string; lede: string; markdown: string }[];

  it("ships every file in docs/plays, and nothing that is not one", () => {
    // Non-vacuity first: a loader that silently matched nothing would otherwise pass every check below.
    expect(files.length, "docs/plays/ is empty — the loader has nothing to be right about").toBeGreaterThan(0);
    expect(plays.map((p) => `${p.slug}.md`).sort()).toEqual([...files].sort());
  });

  it("ships each play's markdown byte for byte, because docs/ is the source of truth", () => {
    for (const p of plays) {
      expect(p.markdown, p.slug).toBe(readFileSync(`${PLAYS_DIR}/${p.slug}.md`, "utf8"));
    }
  });

  it("derives a title, a date and a lede for every one of them", () => {
    for (const p of plays) {
      expect(p.title, `${p.slug} title`).not.toBe("");
      // "Play — " is the file's own word for what it is; the view is already called Run plays.
      expect(p.title, `${p.slug} keeps its kind prefix`).not.toMatch(/^Play\s*[—–-]/);
      expect(p.date, `${p.slug} date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.lede, `${p.slug} has no lede`).not.toBe("");
      /**
       * The one that matters. Every play opens with a provenance block — "Issue #200, lane rc-synth,
       * …" — which is a citation and not a summary, and an index made of four of those says nothing.
       * A play whose shape differs would show its citation line here and look fine; this is what
       * fails instead.
       */
      expect(p.lede, `${p.slug} shows its provenance block as its summary`).not.toMatch(/^Issue #\d/);
      // The lede is display text: its inline markup is flattened, so no marker survives into it.
      expect(p.lede, `${p.slug} lede carries raw markup`).not.toMatch(/[`*]|\]\(/);
    }
  });

  it("sorts newest first, which is the order an index wants", () => {
    const dates = plays.map((p) => p.slug);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("refuses a slug that is not URL-safe rather than shipping a broken address", () => {
    // The slug IS the address — `#/plays/<slug>` — so this is a build failure, never a 404.
    expect(() => readPlay("Not A Slug.md", "# Play — x\n\nbody\n")).toThrow(/URL-safe/);
    expect(() => readPlay("2026-09-12-ok.md", "no heading here\n")).toThrow(/no h1/);
    expect(() => readPlay("undated-play.md", "# Play — x\n\nbody\n")).toThrow(/date/);
  });
});

/**
 * The combo catalogue and its siblings are IMPORTED by `web/main.ts`, so esbuild inlines them whole
 * into app.js, and `web/main.ts` renders every entry's `notes` in a panel titled "How this entry was
 * audited". Measured 2026-09-19: 127 of 771 entries carried sentences addressed to another agent —
 * `NOTE FOR THE MANAGER, not a wrong verdict: …`, `at rc-manager5's direction after this lane raised
 * it …` — and `data/combos.json` was byte-identical to master, so a player could read them on the
 * site that day. Same defect the run plays were pulled for, in a corpus nobody had looked at.
 *
 * `scripts/build-web.mjs` strips them at BUILD time, because filtering in the render path would hide
 * the panel and still ship the bytes. This asserts the property the strip exists for, over the same
 * files the build reads. THE ENUMERATION IS THE POINT: a named list of files was written twice and
 * was short BOTH times — the first covered `combos.json` and missed `synergies.json`, the second
 * covered those two and missed `data/features.json` — so this walks what `web/main.ts` actually
 * imports rather than what anyone remembered.
 */
describe("the authored prose the browser downloads", () => {
  const imported = [...readFileSync(new URL("../web/main.ts", import.meta.url), "utf8")
    .matchAll(/from "\.\.\/(data\/[^"]+\.json)"/g)].map((m) => m[1]).filter((f): f is string => Boolean(f));
  const strings = (node: unknown, out: string[] = []): string[] => {
    if (typeof node === "string") out.push(node);
    else if (Array.isArray(node)) node.forEach((n) => strings(n, out));
    else if (node && typeof node === "object") Object.values(node).forEach((n) => strings(n, out));
    return out;
  };
  const read = (f: string) => JSON.parse(readFileSync(new URL(`../${f}`, import.meta.url), "utf8")) as unknown;

  it("knows which files the bundle actually imports", () => {
    // A sweep that matches nothing reads as a pass. Assert the population before asserting the property.
    expect(imported.length, "web/main.ts imports no data JSON — the regex above has rotted").toBeGreaterThanOrEqual(4);
    expect(imported).toContain("data/combos.json");
    expect(imported).toContain("data/synergies.json");
    expect(imported).toContain("data/features.json");
  });

  it("has something to strip, so a broken strip cannot read as green", () => {
    const hits = imported.flatMap((f) => strings(read(f))).filter((s) => INTERNAL.test(s));
    expect(hits.length, "no internal language in the sources at all — is INTERNAL still correct?").toBeGreaterThan(50);
  });

  it("ships none of it to the browser", () => {
    for (const f of imported) {
      const leaked = strings(stripInternalDeep(read(f))).filter((s) => INTERNAL.test(s));
      // A string with no second sentence cannot be stripped without emptying it, so the strip leaves
      // it alone and this fails on purpose: fix it by hand in the authored file, as the twelve
      // `name` and `sources[].title` cases were on 2026-09-19. Never widen the strip to eat a title.
      expect(leaked, `${f} still reaches the browser with: ${leaked[0]?.slice(0, 160)}`).toEqual([]);
    }
  });

  it("keeps the audit trail it exists to protect", () => {
    const db = read("data/combos.json") as { combos: { id: string; notes?: string }[] };
    const kept = stripInternalDeep(db) as { combos: { id: string; notes?: string }[] };
    expect(strings(kept).filter((s) => s.includes("HAND-WALKED")).length).toBeGreaterThan(400);
    const lost = db.combos.filter((c, i) => c.notes && !kept.combos[i]?.notes).map((c) => c.id);
    expect(lost, "an entry lost its whole audit note — the strip is too wide").toEqual([]);
  });
});
