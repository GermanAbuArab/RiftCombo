// Which cards in the pool are worded to satisfy BOTH halves of a distinction CLAUDE.md treats as
// exclusive?   node scripts/or-pairs.mjs
//
// WHY THIS EXISTS. CLAUDE.md is built by promoting findings, so it keeps whichever half of a rule
// surprised somebody. That produces two mirror-image defects:
//   - THE EXCEPTION CARRIED AND THE RULE ABSENT - found at least six times (355.7, 136.2.c, 811.6,
//     384, 316.8.b.1, 355.8) and largely paid off by the #187 citation audit.
//   - THE GENERAL STATEMENT CARRIED AND THE EXCEPTION ABSENT - found twice, and this script is the
//     cheap test for it.
// A sentence of the shape "X is defined with A, never B, so no card does C" is a claim about a
// WORDING doing duty as a claim about a MECHANIC. It is refuted by ONE CARD worded "A or B".
//
// THE INVERSION IS THE POINT. Sweeping CLAUDE.md for such sentences gives ~38 candidates that nobody
// reads twice. Sweeping the POOL for the card SHAPE gives fifteen rows in one screen. When a check's
// test is "is there a card", stop searching the prose and sweep the pool.
//
// TWO HISTORICAL HITS OUT OF FIFTEEN, found seven weeks apart by unrelated routes:
//   - `look at OR reveal` -> OGN-194 Nocturne, Horrifying (2026-09-14). CLAUDE.md said Predict and
//     Vision "are defined with 'look at', never 'reveal', so neither fires an 'as I'm revealed'
//     payoff" - true of the pool's ONE such payoff (SFD-175 Undertitan) and false as a statement
//     about what Predict feeds. Nocturne was in ZERO synergy rules; he now has one.
//   - `attack OR defend` -> 11 cards (2026-09-12). Both kinds of trigger at once, firing twice per
//     turn cycle, and SIX ENTRIES HAD PRICED IT AT HALF RATE.
//
// THE OTHER THIRTEEN ARE CLEAN AND EACH HAS A REASON - read 2026-09-14, recorded so the next reader
// checks the DELTA rather than re-reading all fifteen:
//   - `conquer OR hold` and its variants (conquer OR gain/score/discard/exhaust/play): 823.1.b makes
//     such an ability BOTH a Conquer Effect and a Hold Effect, and CLAUDE.md carries it explicitly.
//   - printed MODES, where "or" offers a choice rather than two trigger conditions:
//     SFD-091 "draw 1 or buff me", SFD-039 "ready or exhaust a legend",
//     OGN-155 "draw 1 or channel 1 rune exhausted", UNL-104 "play me or another Dragon".
//   - regex artifacts spanning a clause boundary (OGN-202, SFD-058, UNL-051).
//   - OGN-182 Scrapheap is banned in both formats.
//
// TWO LIMITS, STATED SO NOBODY OVER-READS A CLEAN RUN:
//   1. It catches a card that escapes by printing "A or B" and NEVER one that escapes by a SYNONYM.
//   2. It is exhaustive over the CURRENT pool only. A new set is a new population - which is why
//      test/or-pairs.test.ts pins the count: the number MOVING is the signal, and the new rows have
//      to be read. (Pinning a clean state costs nothing and can only be paid for once.)
import { readFileSync } from "node:fs";

/** The game's verbs. Deliberately not every word on a card: a pair is interesting only when both
 *  halves are things a rule or a trigger can key on. */
const VERBS = [
  "look at", "reveal", "play", "hide", "draw", "discard", "recycle", "banish", "kill", "move",
  "attack", "defend", "conquer", "hold", "buff", "exhaust", "ready", "empower", "disempower",
  "attach", "detach", "stun", "heal", "predict", "score", "gain", "channel", "counter", "return",
];

export function orPairs(corpus) {
  // `[^.|]` stops a pair spanning a sentence or a corpus column; 18 characters is wide enough for
  // "reveal me from the top of your deck" style interruptions and narrow enough to keep most
  // clause-boundary artifacts out. Three survive and are named in the docblock.
  const re = new RegExp(`\\b(${VERBS.join("|")})(?:s|ed|ing)?\\b[^.|]{0,18}\\bor\\b[^.|]{0,18}\\b(${VERBS.join("|")})(?:s|ed|ing)?\\b`, "gi");
  const pairs = new Map();
  for (const line of corpus.split("\n")) {
    const base = line.split("|")[0]?.trim();
    if (!base) continue;
    for (const m of line.matchAll(re)) {
      const a = m[1].toLowerCase(), b = m[2].toLowerCase();
      if (a === b) continue;
      const key = `${a} OR ${b}`;
      if (!pairs.has(key)) pairs.set(key, []);
      if (!pairs.get(key).includes(base)) pairs.get(key).push(base);
    }
  }
  return pairs;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const corpus = readFileSync(new URL("../data/corpus_flat.txt", import.meta.url), "utf8");
  const pairs = orPairs(corpus);
  // NON-VACUITY: a control that must be present, or the sweep is not looking at the pool it thinks
  // it is. OGN-194 is the card that motivated the whole check.
  const control = pairs.get("look at OR reveal");
  console.log(`NON-VACUITY: ${corpus.split("\n").length} corpus lines; ${pairs.size} distinct verb pairs.`);
  console.log(`CONTROL "look at OR reveal": ${control ? control.join(", ") : "!! ABSENT - the sweep is broken !!"}\n`);
  for (const [k, v] of [...pairs].sort((a, b) => a[1].length - b[1].length)) {
    console.log(`  ${String(v.length).padStart(2)}  ${k.padEnd(24)} ${v.join(" ")}`);
  }
}
