// The Victory Score, which is not the same number in both formats (#120).
//
// 194.3 — "The Victory Score is 8 points by default."
// 194.3.a — "Some game modes or card effects may alter the Victory Score."
// 489.3, the 2v2 mode — "Victory Score: 11".
//
// Every BURST and CHAIN in the catalogue was walked against 8, because that is what a Constructed
// game asks for, and `data/combos.json` carries no format on any of them. Nothing here changes a
// class or a match: the classes stay as they were authored and this is what the UI says about them,
// so a player toggling to 2v2 is told that a line reaching 8 is three points short there.

import type { ComboClass, Format } from "./types.js";

export const VICTORY_SCORE: Record<Format, number> = { constructed: 8, "2v2": 11 };

/** The paragraph each format's number comes from, quoted in the Guide and in the note below. */
export const VICTORY_RULE: Record<Format, string> = { constructed: "194.3", "2v2": "489.3" };

const FORMAT_LABEL: Record<Format, string> = { constructed: "Constructed", "2v2": "2v2" };

/**
 * The two classes defined by REACHING the Victory Score, and the only two the number means anything
 * for: INFINITE is unbounded and clears any threshold, ALT_WIN wins by its own printed text whatever
 * the score is, and ENGINE does not close a game at all.
 */
export const SCORING_CLASSES: readonly ComboClass[] = ["BURST", "CHAIN"];

export const scoresToWin = (cls: ComboClass): boolean => SCORING_CLASSES.includes(cls);

/** How the class reads in the UI: "BURST · 8 points", or the plain word where 8 says nothing. */
export const classLabel = (cls: ComboClass): string =>
  scoresToWin(cls) ? `${cls} · ${VICTORY_SCORE.constructed} points` : cls.replace("_", " ");

/**
 * What a walked-to-8 line is short of in a format that asks for more. Empty for every class the
 * threshold does not describe, and empty in the format the catalogue was walked in.
 */
export const victoryNote = (cls: ComboClass, format: Format): string =>
  scoresToWin(cls) && VICTORY_SCORE[format] !== VICTORY_SCORE.constructed
    ? `${FORMAT_LABEL[format]} needs ${VICTORY_SCORE[format]} points (Core Rules ${VICTORY_RULE[format]}); this line reaches ${VICTORY_SCORE.constructed}.`
    : "";
