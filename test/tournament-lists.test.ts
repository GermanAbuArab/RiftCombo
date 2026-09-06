import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
import { checkBuild } from "../src/build.js";
import type { Deck } from "../src/types.js";

/**
 * Las 222 listas que Riot publicó en sus seis artículos "<City>'s Top Decks", parseadas todas.
 *
 * Hasta el 2026-09-06 ningún test usaba listas reales, y por eso #86 (`resolveName` no rescataba
 * `Master Yi, Honed`) y #87 (306 de 3567 grafías de códigos que `baseOf` tiraba por comparar
 * mayúsculas) sobrevivieron meses sin que nadie los viera. Este archivo es la red: cualquier cambio
 * en `parseDeckText` / `resolveName` / `resolveCode` que rompa el dialecto de Riot se cae acá.
 *
 * De dónde salen las listas, qué se les tocó al copiarlas y por qué no se guardan posiciones ni
 * nombres de jugador: `test/fixtures/tournament-lists/README.md`.
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

describe("las listas de torneo de Riot como regresión del parser", () => {
  it("tiene las 222 listas de los seis artículos", () => {
    expect(FILES).toHaveLength(222);
    const byCity = FILES.reduce<Record<string, number>>((a, f) => ((a[cityOf(f)] = (a[cityOf(f)] ?? 0) + 1), a), {});
    expect(byCity).toEqual({ atlanta: 30, barcelona: 37, lille: 31, sydney: 42, utrecht: 40, vancouver: 42 });
  });

  it(`resuelve todas las líneas de ${CLEAN} listas`, () => {
    const clean = FILES.filter((f) => decks.get(f)!.unresolved.length === 0);
    expect(clean.length).toBe(CLEAN);
  });

  it("las líneas que no resuelve son exactamente las cuatro erratas de transcripción conocidas", () => {
    const found: Record<string, string[]> = {};
    for (const f of FILES) {
      const u = decks.get(f)!.unresolved;
      if (u.length) found[f] = u.map((x) => x.raw);
    }
    expect(found).toEqual(KNOWN_ERRATA);
  });

  it("cada lista registra exactamente 40 cartas en el Main Deck, contando el Chosen Champion", () => {
    const sizes = FILES.map((f) => [f, total(decks.get(f)!.main)] as const).filter(([, n]) => n !== 40);
    expect(sizes).toEqual([]);
  });

  it("cada lista nombra su leyenda y su Chosen Champion", () => {
    expect(FILES.filter((f) => !decks.get(f)!.legend)).toEqual([]);
    expect(FILES.filter((f) => !decks.get(f)!.champion)).toEqual([]);
  });

  /**
   * `vancouver-06` es la quinta errata del artículo y la única que parsea limpia: su `Rune Pool:`
   * repite los tres battlefields en lugar de las 12 runas, así que la lista publicada tiene 0 runas
   * y seis battlefields, dos de cada nombre. Va excluida de las dos filas que rompe, con motivo.
   */
  const RUNE_POOL_ERRATA = "vancouver-06.txt";

  it("cada lista trae 12 runas y 3 battlefields, salvo las erratas del artículo", () => {
    const runes = FILES.filter((f) => total(decks.get(f)!.runes) !== 12);
    expect(runes).toEqual([RUNE_POOL_ERRATA]);
    const bfs = FILES.filter((f) => total(decks.get(f)!.battlefields) !== 3);
    // sydney-30 no publicó ninguno y las dos de Utrecht pierden el tercero en 'Trapping Ground'.
    expect(bfs.sort()).toEqual(["sydney-30.txt", "utrecht-06.txt", "utrecht-19.txt", RUNE_POOL_ERRATA].sort());
  });
});

describe("checkBuild sobre las listas que parsean limpias", () => {
  const clean = FILES.filter((f) => decks.get(f)!.unresolved.length === 0);
  const fails = (f: string) => checkBuild(decks.get(f)!, cards, "constructed").rules.filter((r) => r.status === "fail");

  /**
   * `Aspirant's Climb` y `The Arena's Greatest` se banearon el 2026-07-24 y los cinco primeros
   * eventos se jugaron antes, así que la fila 103.2.e de esas listas es un dato de fecha, no un bug:
   * `checkBuild` responde por el formato de HOY. Barcelona (2026-08-26) es el único artículo
   * posterior al baneo, y es la prueba de que la explicación se sostiene: da cero.
   */
  it("la única fila que falla por legalidad es el baneo del 2026-07-24, y Barcelona no la tiene", () => {
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

  it("dejando de lado esa fila, la única lista ilegal es la del Rune Pool mal transcrito", () => {
    const structural = clean
      .map((f) => [f, fails(f).filter((r) => r.rule !== "103.2.e")] as const)
      .filter(([, rs]) => rs.length > 0);
    expect(structural.map(([f]) => f)).toEqual(["vancouver-06.txt"]);
    expect(structural[0]![1].map((r) => r.rule)).toEqual(["103.3.a · 103.3.a.1", "103.4.a · 103.4.c"]);
  });

  it("las 37 listas de Barcelona, el único evento posterior al baneo, son todas legales hoy", () => {
    const barcelona = clean.filter((f) => cityOf(f) === "barcelona");
    expect(barcelona).toHaveLength(37);
    expect(barcelona.filter((f) => !checkBuild(decks.get(f)!, cards, "constructed").legal)).toEqual([]);
  });
});
