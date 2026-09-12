// @vitest-environment happy-dom
//
// The renderer (#206). The four plays are the spec, so this renders THEM and not only a fixture: the
// subset was measured against that corpus, and a fifth play written in something outside it should
// fail here rather than show a reader a stray `**` in the middle of a sentence.
//
// The CSP forbids inline `style=`, and the rule behind it is that document text must never be built
// into markup. Every assertion about escaping below is about that: the parser is handed hostile text
// and the result is checked for elements, not for strings.
import { beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error plain .mjs shared with scripts/build-web.mjs, which cannot import TypeScript.
import { loadPlays } from "../../scripts/web-plays.mjs";

interface Play { slug: string; date: string; title: string; lede: string; markdown: string }
const PLAYS = loadPlays(".") as Play[];

const HTML = `
  <nav class="topnav"><a href="#/combos">Combos</a><a href="#/plays">Run plays</a></nav>
  <main id="view-combos"></main>
  <section id="view-plays" hidden><main class="doc play" id="plays-host"></main></section>`;

/** Boot the view at a hash, with the payload served by a stubbed fetch. */
const open = async (hash: string, plays: Play[] = PLAYS) => {
  vi.resetModules();
  document.body.innerHTML = HTML;
  location.hash = hash;
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ plays }) })));
  const { initPlays } = await import("../../web/plays.js");
  const { startRouter } = await import("../../web/router.js");
  initPlays();
  startRouter();
  await new Promise((r) => setTimeout(r, 0));
  return document.querySelector<HTMLElement>("#plays-host")!;
};

beforeEach(() => { document.body.innerHTML = HTML; });

describe("the plays index", () => {
  it("lists every play with its title, date and lede", async () => {
    const host = await open("#/plays");
    const items = [...host.querySelectorAll(".play-item")];
    expect(items).toHaveLength(PLAYS.length);
    for (const p of PLAYS) {
      const link = host.querySelector<HTMLAnchorElement>(`a[href="#/plays/${p.slug}"]`);
      expect(link, p.slug).not.toBeNull();
      expect(link!.textContent).toContain(p.title);
    }
    expect(host.querySelectorAll("h1")).toHaveLength(1);
  });

  it("fetches the payload once, on the first visit rather than at boot", async () => {
    await open("#/plays");
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(fetch).mock.calls[0]![0]).toBe("/data/plays.json");
  });
});

describe("a play rendered", () => {
  it("renders every construct the corpus uses, on every play", async () => {
    for (const p of PLAYS) {
      const host = await open(`#/plays/${p.slug}`);
      // Exactly one h1, and it is the index's title rather than the file's "Play — " prefix.
      const h1s = host.querySelectorAll("h1");
      expect(h1s, p.slug).toHaveLength(1);
      expect(h1s[0]!.textContent, p.slug).toBe(p.title);
      expect(host.querySelectorAll("h2").length, `${p.slug} h2`).toBeGreaterThan(0);
      expect(host.querySelectorAll("p").length, `${p.slug} p`).toBeGreaterThan(3);
      expect(host.querySelectorAll(".play-table").length, `${p.slug} tables`).toBeGreaterThan(0);
      expect(host.querySelectorAll("code").length, `${p.slug} code`).toBeGreaterThan(5);
      expect(host.querySelectorAll("strong").length, `${p.slug} strong`).toBeGreaterThan(5);
      expect(host.querySelector(".play-back"), `${p.slug} back link`).not.toBeNull();
      expect(document.title, p.slug).toBe(`${p.title} — RiftCombo`);
    }
  });

  /** The one a reader would see: a marker left in the text is a construct the renderer walked past. */
  it("leaves no raw markdown marker in the rendered text", async () => {
    for (const p of PLAYS) {
      const host = await open(`#/plays/${p.slug}`);
      // Fenced blocks are verbatim by design and a turn table may legitimately hold any character.
      for (const pre of host.querySelectorAll("pre")) pre.remove();
      const text = host.textContent ?? "";
      expect(text.length, p.slug).toBeGreaterThan(2000);
      expect(text, `${p.slug} carries a marker`).not.toMatch(/\*\*|`|\]\(/);
    }
  });

  it("keeps a fenced turn table's alignment exactly as it was written", async () => {
    const clock = PLAYS.find((p) => p.slug.endsWith("the-unopposed-clock"))!;
    const host = await open(`#/plays/${clock.slug}`);
    const pre = host.querySelector("pre")!;
    expect(pre.textContent).toContain("T1  channel 2 (R=2).");
    // The leading run of spaces on a continuation line is what makes the column line up.
    expect(pre.textContent).toMatch(/\n {2,}/);
  });

  it("turns a cross-link between two plays into a route, and marks no internal link external", async () => {
    const host = await open("#/plays/2026-09-12-chaos-fury-yasuo-shuttle");
    const links = [...host.querySelectorAll<HTMLAnchorElement>("a")].filter((a) => a.className !== "play-back");
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a.getAttribute("href"), a.textContent ?? "").toMatch(/^#\/plays\//);
      expect(a.target).toBe("");
    }
  });

  it("draws a header row only when the table has one, so an empty header is not a band of nothing", async () => {
    // The "Needs" tables open `| | |`: two empty cells, which is how markdown writes a definition list.
    const host = await open("#/plays/2026-09-12-chaos-order-the-one-answer");
    const tables = [...host.querySelectorAll(".play-table")];
    expect(tables.length).toBeGreaterThan(1);
    expect(tables.some((t) => !t.querySelector("thead")), "no headerless table rendered").toBe(true);
    expect(tables.some((t) => t.querySelector("thead")), "no headed table rendered").toBe(true);
    for (const t of tables) for (const th of t.querySelectorAll("th")) expect(th.textContent!.trim()).not.toBe("");
  });
});

describe("what the view does when it cannot show a play", () => {
  it("says so on a slug the payload does not carry, and offers the index", async () => {
    const host = await open("#/plays/2026-09-12-never-written");
    expect(host.textContent).toContain("There is no play at");
    expect(host.querySelector<HTMLAnchorElement>(".play-back")!.getAttribute("href")).toBe("#/plays");
    expect(host.querySelectorAll("h1")).toHaveLength(1);
  });

  it("says so when the payload itself fails, rather than showing an empty page", async () => {
    vi.resetModules();
    document.body.innerHTML = HTML;
    location.hash = "#/plays";
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) })));
    const { initPlays } = await import("../../web/plays.js");
    const { startRouter } = await import("../../web/router.js");
    initPlays();
    startRouter();
    await new Promise((r) => setTimeout(r, 0));
    const host = document.querySelector<HTMLElement>("#plays-host")!;
    expect(host.textContent).toContain("could not be loaded");
  });

  /**
   * A play is prose from a file, and the renderer's whole safety argument is that no sentence of it
   * is ever interpreted as markup. This hands it a play written to break that and checks the result
   * holds no element it did not create — which is what an `innerHTML` renderer would fail.
   */
  it("never lets a play's own text become markup", async () => {
    const hostile: Play = {
      slug: "2026-09-12-hostile",
      date: "2026-09-12",
      title: '<img src=x onerror="alert(1)">',
      lede: "x",
      markdown: [
        "# Play — hostile",
        "",
        "A paragraph with <script>alert(1)</script> and an <img src=x onerror=alert(1)> in it.",
        "",
        "| a | b |",
        "|---|---|",
        "| <b>bold?</b> | `<i>code</i>` |",
      ].join("\n"),
    };
    const host = await open(`#/plays/${hostile.slug}`, [hostile]);
    expect(host.querySelector("script")).toBeNull();
    expect(host.querySelector("img")).toBeNull();
    expect(host.querySelector("b")).toBeNull();
    expect(host.querySelector("i")).toBeNull();
    // The angle brackets survive as the characters they are, which is what the file actually said.
    expect(host.textContent).toContain("<script>alert(1)</script>");
    expect(host.querySelector("h1")!.textContent).toBe('<img src=x onerror="alert(1)">');
  });
});

/**
 * The link from a combo back to the play about it (#206). The id is read out of the play's own prose
 * rather than carried in a field, so the mapping below is a fact about the corpus and is pinned here:
 * a reword in `docs/plays/` that moves a link shows up as a test change rather than silently.
 */
describe("which entry a play is about", () => {
  const subjects = async (known: string[]) => {
    vi.resetModules();
    document.body.innerHTML = HTML;
    location.hash = "#/plays";
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ plays: PLAYS }) })));
    const mod = await import("../../web/plays.js");
    const { startRouter } = await import("../../web/router.js");
    mod.initPlays({ comboIds: new Set(known) });
    startRouter();
    await new Promise((r) => setTimeout(r, 0));
    return mod;
  };

  const ALL = [
    "yasuo-windrider-ride-the-wind-chain",
    "ivern-ride-the-wind-double-conquer",
    "tryndamere-brambleback-conquer",
    "gutter-palace-keeper-time-warp",
    "time-warp-hold-burst",
    "grand-plaza-recruit-vanguard",
  ];

  it("points each play at the one line it is about, and half of them at none", async () => {
    const { playsAbout } = await subjects(ALL);
    const at = (id: string) => playsAbout([id]).map((p) => p.slug);
    expect(at("yasuo-windrider-ride-the-wind-chain")).toEqual(["2026-09-12-chaos-fury-yasuo-shuttle"]);
    expect(at("ivern-ride-the-wind-double-conquer")).toEqual(["2026-09-12-chaos-order-the-one-answer"]);
    expect(at("tryndamere-brambleback-conquer")).toEqual(["2026-09-12-the-unopposed-clock"]);
  });

  /**
   * The three the Chaos/Order play names in a closing paragraph about a defect in one of this
   * project's own scripts. It is not about any of them, and telling a reader of `time-warp-hold-burst`
   * that there is a play about their line would be false.
   */
  it("does not claim a play is about a line it merely cites in passing", async () => {
    const { playsAbout } = await subjects(ALL);
    for (const id of ["gutter-palace-keeper-time-warp", "time-warp-hold-burst", "grand-plaza-recruit-vanguard"]) {
      expect(playsAbout([id]), id).toEqual([]);
    }
  });

  it("finds nothing for a play that names no entry, which is half the corpus", async () => {
    const { playsAbout, subjectOf } = await subjects(ALL);
    const idle = PLAYS.find((p) => p.slug.endsWith("what-the-idle-mana-buys"))!;
    expect(subjectOf(idle)).toBeNull();
    expect(playsAbout(["no-such-entry"])).toEqual([]);
  });

  /** A hyphenated phrase in backticks is not an entry id; only ids the catalogue holds count. */
  it("reads an id only where the catalogue has one", async () => {
    const { playsAbout } = await subjects([]);
    for (const id of ALL) expect(playsAbout([id]), id).toEqual([]);
  });
});
