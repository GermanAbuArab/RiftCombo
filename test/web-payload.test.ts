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
import { INTERNAL, stripInternalDeep, stripProsePlugin } from "../scripts/web-combo-prose.mjs";

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

  it("prints the subject entry's NAME in the lede, never its id", () => {
    // Twelve plays open "**Subject: `<id>`**, …" and that paragraph is the lede. The id is an address
    // for the page to link; an index reader gets the name. Resolved through the same `nameOf` the
    // build passes, from the real catalogue, so a play naming an entry the catalogue lost keeps the
    // raw id rather than inventing a name — and is then caught by the raw-id assertion below.
    const names = new Map(((JSON.parse(readFileSync("data/combos.json", "utf8")) as { combos: { id: string; name: string }[] }).combos).map((e) => [e.id, e.name]));
    const nameOf = (id: string) => names.get(id) ?? null;
    const one = readPlay("2026-09-12-x.md", "# Play — x\n\nIssue #200, 2026-09-12.\n\n**Subject: `svellsongur-copy-hold`.** Rest.\n", nameOf);
    expect(one.lede).toBe(`Subject: ${names.get("svellsongur-copy-hold")}. Rest.`);
    // Control: an id the catalogue does not know stays as written, minus the backticks `plain` strips.
    expect(readPlay("2026-09-12-x.md", "# Play — x\n\n**Subject: `no-such-entry`.** Rest.\n", nameOf).lede).toBe("Subject: no-such-entry. Rest.");
    const resolved = loadPlays(".", nameOf) as { slug: string; lede: string }[];
    expect(resolved.filter((p) => /^Subject: /.test(p.lede)).length, "the Subject-opener shape exists in the corpus").toBeGreaterThan(0);
    for (const p of resolved) {
      for (const id of names.keys()) expect(p.lede, `${p.slug} lede prints the id ${id}`).not.toContain(id);
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
      //
      // KNOWN LIMIT, stated rather than engineered around: this re-checks with the SAME predicate the
      // strip used, so it cannot see a lane name the predicate does not know (a future `rc-<word>`
      // outside the alternation, or a new phrasing of "the manager"). That is inherent to any
      // predicate-based check and no test here can close it — what closes it is a person reading the
      // panel. What this DOES catch, and what it was written for, is a string the strip cannot clean.
      expect(leaked, `${f} still reaches the browser with: ${leaked[0]?.slice(0, 160)}`).toEqual([]);
    }
  });

  it("is actually WIRED INTO THE BUILD, not merely available to it", async () => {
    // The three tests above call the strip directly, so they would ALL stay green if the plugin were
    // dropped from `options.plugins` or its filter stopped matching — a post-commit review caught
    // that, and it is the same shape as every other clean-sweep-over-the-wrong-population defect in
    // this repo. So run esbuild for real, through the exported plugin, over an entry that imports
    // what web/main.ts imports, and read the OUTPUT.
    const { build } = await import("esbuild");
    const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
    const entry = imported.map((f, i) => `import d${i} from "${root}/${f}" with { type: "json" };\nexport const e${i} = d${i};`).join("\n");
    const out = await build({
      stdin: { contents: entry, resolveDir: root, loader: "ts" },
      bundle: true, write: false, format: "esm", logLevel: "silent",
      plugins: [stripProsePlugin(root, readFileSync)],
    });
    const js = out.outputFiles?.[0]?.text ?? "";
    expect(js.length, "the probe bundle is empty, so it proves nothing").toBeGreaterThan(100_000);
    const hit = js.match(INTERNAL);
    expect(hit?.[0], `the built bundle still carries: ${hit?.[0]}`).toBeUndefined();
  });

  it("has the plugin in the real build's plugins array", () => {
    // The test above proves the PLUGIN works; this proves the BUILD uses it. They are two different
    // regressions — a broken filter and an unwired plugin — and the first test cannot see the second,
    // because it constructs its own esbuild call. scripts/build-web.mjs runs a build on import, so it
    // cannot be imported to inspect; read its source instead.
    const src = readFileSync(new URL("../scripts/build-web.mjs", import.meta.url), "utf8");
    expect(src, "build-web.mjs no longer imports the strip").toMatch(/import \{[^}]*stripProsePlugin[^}]*\}\s*from\s*"\.\/web-combo-prose\.mjs"/);
    const plugins = /plugins:\s*\[([^\]]*)\]/.exec(src)?.[1] ?? "";
    expect(plugins, "the strip is no longer in esbuild's plugins array").toContain("stripComboProse");
    expect(src).toMatch(/const stripComboProse = stripProsePlugin\(/);
  });

  it("leaves a json outside data/ alone, so a dependency's file is never rewritten", async () => {
    // The filter was once an unanchored /data[\\/][^\\/]+\.json$/, which also matches
    // node_modules/<pkg>/data/<name>.json. Nothing in the bundle hits that today, but stripInternalDeep
    // drops empty strings out of arrays, so an accidental match MUTATES third-party data silently.
    const plugin = stripProsePlugin("/repo", readFileSync);
    const seen: { filter: RegExp; cb: (a: { path: string }) => unknown }[] = [];
    plugin.setup({ onLoad: (opts: { filter: RegExp }, cb: (a: { path: string }) => unknown) => seen.push({ ...opts, cb }) });
    expect(seen).toHaveLength(1);
    expect(seen[0]?.cb({ path: "/repo/node_modules/pkg/data/table.json" }), "a dependency's data file must be left to esbuild").toBeNull();
    expect(seen[0]?.cb({ path: "/elsewhere/data/x.json" })).toBeNull();
  });

  it("keeps the audit trail it exists to protect", () => {
    const db = read("data/combos.json") as { combos: { id: string; notes?: string }[] };
    const kept = stripInternalDeep(db) as { combos: { id: string; notes?: string }[] };
    expect(strings(kept).filter((s) => s.includes("HAND-WALKED")).length).toBeGreaterThan(400);
    const lost = db.combos.filter((c, i) => c.notes && !kept.combos[i]?.notes).map((c) => c.id);
    expect(lost, "an entry lost its whole audit note — the strip is too wide").toEqual([]);
  });
});
