import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
import { checkBuild } from "../src/build.js";
import type { Deck } from "../src/types.js";

/**
 * The 222 lists Riot published across its six "<City>'s Top Decks" articles, all parsed.
 *
 * Until 2026-09-06 no test used real lists, which is why #86 (`resolveName` failing to rescue
 * `Master Yi, Honed`) and #87 (306 of 3,567 spellings of the pool's own codes dropped because
 * `baseOf` compared case-sensitively) both survived for months unnoticed. This file is the net: any
 * change to `parseDeckText` / `resolveName` / `resolveCode` that breaks Riot's dialect fails here.
 *
 * Where the lists come from, what was touched in copying them, and why neither standings nor player
 * names are stored: `test/fixtures/tournament-lists/README.md`.
 */

const cards = loadCardIndex();
const DIR = new URL("./fixtures/tournament-lists/", import.meta.url);

const FILES = readdirSync(DIR).filter((f) => f.endsWith(".txt")).sort();
const decks = new Map<string, Deck>(FILES.map((f) => [f, loadDeck(readFileSync(new URL(f, DIR), "utf8"), cards)]));
const total = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);
const cityOf = (file: string) => file.replace(/-\d+\.txt$/, "");

/**
 * Las cuatro líneas que el parser NO resuelve, con el archivo y el renglón exacto. Las cuatro son
 * erratas de transcripción del artículo, no bugs: `Trapping Grounds` (UNL-217) está en plural en la
 * carta, la `x` de Sydney va delante del número en un solo renglón de todo el corpus, y la sección
 * `Battlefields:` de sydney-30 es literalmente una `x`. Si una de estas cuatro desaparece porque el
 * parser aprendió a leerla, sacala de acá y bajá el número; si aparece una quinta, el parser perdió
 * algo que antes leía.
 */
const KNOWN_ERRATA: Record<string, string[]> = {
  "sydney-07.txt": ["x2 Adaptatron"],
  "sydney-30.txt": ["x"],
  "utrecht-06.txt": ["Trapping Ground"],
  "utrecht-19.txt": ["Trapping Ground"],
};

/** Medido el 2026-09-06. Este número sube cuando el parser mejora y NUNCA baja a mano. */
const CLEAN = 218;

describe("Riot's tournament lists as a parser regression", () => {
  it("has the 222 lists from the six articles", () => {
    expect(FILES).toHaveLength(222);
    const byCity = FILES.reduce<Record<string, number>>((a, f) => ((a[cityOf(f)] = (a[cityOf(f)] ?? 0) + 1), a), {});
    expect(byCity).toEqual({ atlanta: 30, barcelona: 37, lille: 31, sydney: 42, utrecht: 40, vancouver: 42 });
  });

  it(`resolves every line of ${CLEAN} lists`, () => {
    const clean = FILES.filter((f) => decks.get(f)!.unresolved.length === 0);
    expect(clean.length).toBe(CLEAN);
  });

  it("the lines it does not resolve are exactly the four known transcription errata", () => {
    const found: Record<string, string[]> = {};
    for (const f of FILES) {
      const u = decks.get(f)!.unresolved;
      if (u.length) found[f] = u.map((x) => x.raw);
    }
    expect(found).toEqual(KNOWN_ERRATA);
  });

  it("every list registers exactly 40 Main Deck cards, counting the Chosen Champion", () => {
    const sizes = FILES.map((f) => [f, total(decks.get(f)!.main)] as const).filter(([, n]) => n !== 40);
    expect(sizes).toEqual([]);
  });

  it("every list names its legend and its Chosen Champion", () => {
    expect(FILES.filter((f) => !decks.get(f)!.legend)).toEqual([]);
    expect(FILES.filter((f) => !decks.get(f)!.champion)).toEqual([]);
  });

  /**
   * `vancouver-06` es la quinta errata del artículo y la única que parsea limpia: su `Rune Pool:`
   * repite los tres battlefields en lugar de las 12 runas, así que la lista publicada tiene 0 runas
   * y seis battlefields, dos de cada nombre. Va excluida de las dos filas que rompe, con motivo.
   */
  const RUNE_POOL_ERRATA = "vancouver-06.txt";

  it("every list brings 12 runes and 3 battlefields, except the article's errata", () => {
    const runes = FILES.filter((f) => total(decks.get(f)!.runes) !== 12);
    expect(runes).toEqual([RUNE_POOL_ERRATA]);
    const bfs = FILES.filter((f) => total(decks.get(f)!.battlefields) !== 3);
    // sydney-30 no publicó ninguno y las dos de Utrecht pierden el tercero en 'Trapping Ground'.
    expect(bfs.sort()).toEqual(["sydney-30.txt", "utrecht-06.txt", "utrecht-19.txt", RUNE_POOL_ERRATA].sort());
  });
});

describe("checkBuild over the lists that parse clean", () => {
  const clean = FILES.filter((f) => decks.get(f)!.unresolved.length === 0);
  const fails = (f: string) => checkBuild(decks.get(f)!, cards, "constructed").rules.filter((r) => r.status === "fail");

  /**
   * `Aspirant's Climb` y `The Arena's Greatest` se banearon el 2026-07-24 y los cinco primeros
   * eventos se jugaron antes, así que la fila 103.2.e de esas listas es un dato de fecha, no un bug:
   * `checkBuild` responde por el formato de HOY. Barcelona (2026-08-26) es el único artículo
   * posterior al baneo, y es la prueba de que la explicación se sostiene: da cero.
   */
  it("the only row that fails on legality is the 2026-07-24 ban, and Barcelona does not have it", () => {
    const banned = clean.filter((f) => fails(f).some((r) => r.rule === "103.2.e"));
    expect(banned).toHaveLength(89);
    expect(banned.filter((f) => cityOf(f) === "barcelona")).toEqual([]);
    // Ninguna otra carta de las 21 filas de data/legality.json aparece: Stealthy Pursuer se baneó el
    // mismo día y ninguna de estas listas la registró.
    const named = new Set(
      banned
        .flatMap((f) => fails(f).filter((r) => r.rule === "103.2.e").flatMap((r) => r.detail.split(" · ")))
        .map((d) => d.replace(/ is banned( in this format\.)?$/, "")),
    );
    expect([...named].sort()).toEqual(["Aspirant's Climb", "The Arena's Greatest"]);
  });

  /**
   * `utrecht-17`'s "Sideboard:" section is a second Riot-article transcription artifact, the same
   * shape as `RUNE_POOL_ERRATA` above: it repeats the deck's own three Battlefields verbatim
   * (Aspirant's Climb, Rockfall Path, Targon's Peak) rather than naming any Main Deck card. Before
   * #197 added a sideboard row, `checkBuild` had no way to see this — those three battlefields sat
   * in `deck.sideboard` unread. Now 601.1.c.2 ("A sideboard can consist only of valid Main Deck
   * cards") correctly flags it: a battlefield is never a valid Main Deck card. This is the source
   * article mislabelling a section, not a real illegal registration — measured against all 222
   * fixtures, it is the only one where a sideboard names anything other than a unit, spell or gear.
   */
  const BATTLEFIELD_SIDEBOARD_ERRATA = "utrecht-17.txt";

  it("setting that row aside, the only illegal lists are the mis-transcribed Rune Pool and a sideboard that repeats the Battlefields", () => {
    const structural = clean
      .map((f) => [f, fails(f).filter((r) => r.rule !== "103.2.e")] as const)
      .filter(([, rs]) => rs.length > 0);
    expect(structural.map(([f]) => f).sort()).toEqual([BATTLEFIELD_SIDEBOARD_ERRATA, "vancouver-06.txt"].sort());
    const byFile = new Map(structural);
    expect(byFile.get("vancouver-06.txt")!.map((r) => r.rule)).toEqual(["103.3.a · 103.3.a.1", "103.4.a · 103.4.c"]);
    expect(byFile.get(BATTLEFIELD_SIDEBOARD_ERRATA)!.map((r) => r.rule)).toEqual(["Tournament Rules 601.1.c.2"]);
  });

  it("the 37 Barcelona lists, the only post-ban event, are all legal today", () => {
    const barcelona = clean.filter((f) => cityOf(f) === "barcelona");
    expect(barcelona).toHaveLength(37);
    expect(barcelona.filter((f) => !checkBuild(decks.get(f)!, cards, "constructed").legal)).toEqual([]);
  });
});
