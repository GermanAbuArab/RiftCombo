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
// WHAT TO DO WITH A HIT - the follow-up question, measured 2026-09-14 and worth more than the hit:
// A VERB-PAIR CARD IS ONLY AT RISK OF HALF-RATE PRICING WHEN BOTH WINDOWS ARE INDEPENDENTLY PAYABLE.
//   - If the trigger costs its own EXHAUST, 315.1.b readies it once at your Awakening, so the pair
//     buys a CHOICE OF WINDOW and never a second activation. UNL-199 Deceiver ("discard 1 and exhaust
//     me") is the worked case: all three entries using him price him at one and are RIGHT. Same shape
//     CLAUDE.md records for a 2v2 ally's hold - "it buys a choice of window, never a second trigger".
//   - If the trigger costs NOTHING per use, the two windows genuinely double. SFD-150 Last Rites
//     ("[Effect] When I conquer or hold, you may play a unit from your trash") is the worked case,
//     and `attack OR defend` produced SIX repriced entries for exactly this reason: an attack trigger
//     and a defend trigger share no cost.
// AND THE DEFECT ONLY BITES AN ENGINE. A BURST, CHAIN or ALT_WIN fires ONCE, so naming a single
// window is the design - the seven Ivern finishers name one window each and are all correct.
//
// A PREDICATE FOR THIS WAS BUILT AND DELIBERATELY NOT SHIPPED. Flagging entries whose rate language
// names one window gives 23 hits, 15 after narrowing to ENGINEs, and reading them they are steady-
// state descriptions rather than defects - plus "as long as the board holds" is a HOMONYM of the Hold
// keyword. The one real candidate was found by READING. Same verdict as the TARGET/CAUSE distinction:
// a check grounded in a RULE finds things; one that needs a judgement per row is a human reading.
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
