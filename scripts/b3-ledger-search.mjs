#!/usr/bin/env node
/**
 * Exhaustive ledger search for refusal B3 (#335): Power Nexus + two Blue Sentinels + Renata Glasc,
 * Mastermind, chained with Time Warp, with and without SFD-083 Hextech Anomaly.
 *
 * The second instrument behind docs/phase0/walks/2026-10-13-b3-renata-time-warp-anomaly.md: the walk
 * prices one line by hand, this enumerates every legal spend in every turn of the window and reports the
 * best point total. It models only what the walk cites:
 *   - Awaken readies runes, Renata and Anomaly (315.1.b); channel 2 ready runes (315.3.b, 430.2.a),
 *     fewer if the Rune Deck is short (315.3.b.1); 12 runes in total (161.2.a), recycled back to the
 *     Rune Deck (161.2.b).
 *   - Beginning Phase: the Hold scores 1 (469.2, 471.1); the Nexus trigger fires 1 + 2 times with two
 *     Sentinels (R1 = A, issue #11) and each firing may be paid with four rune recycles (164.2.b at
 *     payment, 444.2.c); Energy made here is swept at 316.3, so the Beginning Phase spends recycles
 *     only.
 *   - Main Phase: 6 rainbow from the Sentinels (316.4); every rune exhausts for 1 Energy (164.2.a) and
 *     may ALSO recycle for 1 Mind Power (164.2.b); Anomaly converts any amount of Power into Energy once
 *     per turn (its exhaust); Time Warp is 10 Energy + 4 Mind Power and queues one more turn (735);
 *     Renata's point is 4 Energy + 4 Mind Power + her exhaust.
 *   - At most three Time Warps (103.2.b); the window ends when no Additional Turn is queued.
 * Rainbow pays Mind (135.2.e.5.b) and Mind pays rainbow (135.2.e.5.a), so Power is one pool here.
 *
 * Usage: node scripts/b3-ledger-search.mjs
 */

const TOTAL_RUNES = 12;

/**
 * Best points over the rest of the window, with the plan that reaches it. Each choice takes the FEWEST
 * recycles that pay for it: more runes on the board never hurts a later turn.
 */
function search(cfg, b, deck, twLeft, queued, memo = new Map()) {
  const key = `${b},${deck},${twLeft},${queued}`;
  if (memo.has(key)) return memo.get(key);
  let best = { points: -1, plan: [] };
  // Two Sentinels make every hold effect at the Nexus fire 1 + 2 = 3 times (R1 = A), their own Add
  // included, so 3 Nexus firings and 2 x 3 = 6 rainbow; `noStacking` prices the reading where they do not.
  const firings = cfg.noStacking ? 1 : 3;
  const rainbow = cfg.noStacking ? 2 : 6;
  for (let n = 0; n <= (cfg.nexus ? firings : 0) && 4 * n <= b; n++) {
    const afterBeginning = b - 4 * n;
    const channelled = Math.min(2, deck + 4 * n);
    const board = afterBeginning + channelled;
    const deckAfterChannel = deck + 4 * n - channelled;
    for (let m = 0; m <= twLeft; m++) {
      for (let r = 0; r <= (cfg.renata ? 1 : 0); r++) {
        for (let c = 0; c <= (cfg.anomaly ? 40 : 0); c++) {
          const energyNeeded = 10 * m + 4 * r;
          if (board + c < energyNeeded) continue;
          const k = Math.max(0, 4 * m + 4 * r + c - rainbow);
          if (k > board) continue;
          const points = 1 + n + r;
          const nextQueued = queued - 1 + m;
          const step = { board: b, nexus: n, channelled, mainBoard: board, timeWarps: m, renata: r, anomaly: c, recycled: k, points };
          let rest = { points: 0, plan: [] };
          if (nextQueued > 0) rest = search(cfg, board - k, deckAfterChannel + k, twLeft - m, nextQueued, memo);
          if (points + rest.points > best.points) best = { points: points + rest.points, plan: [step, ...rest.plan] };
        }
      }
    }
  }
  memo.set(key, best);
  return best;
}

const R1_HAND_RESULT = 5; // docs/phase0/walks/2026-09-06-engine-payoff-walk.md §1.1, refusal R1

/** Points by starting board (runes on the board at the first turn's Awaken), 0..12. */
const byBoard = (cfg) =>
  Array.from({ length: TOTAL_RUNES + 1 }, (_, b0) => search(cfg, b0, TOTAL_RUNES - b0, cfg.timeWarps, 1));

const rows = [
  ["control: R1, Nexus + Sentinels + ONE Time Warp", { nexus: true, renata: false, anomaly: false, timeWarps: 1 }],
  ["B3 as refused: Nexus + Sentinels + Renata + 3 Time Warp", { nexus: true, renata: true, anomaly: false, timeWarps: 3 }],
  ["B3 + Hextech Anomaly", { nexus: true, renata: true, anomaly: true, timeWarps: 3 }],
  ["B3 + Anomaly, Nexus never paid (the refusal's model)", { nexus: false, renata: true, anomaly: true, timeWarps: 3 }],
  ["B3, two Time Warps", { nexus: true, renata: true, anomaly: false, timeWarps: 2 }],
  ["B3 + Anomaly, two Time Warps", { nexus: true, renata: true, anomaly: true, timeWarps: 2 }],
  ["B3 if the Sentinels did NOT stack (R1 = B): 1 firing, 2 rainbow", { nexus: true, noStacking: true, renata: true, anomaly: false, timeWarps: 3 }],
  ["B3 + Anomaly if the Sentinels did NOT stack (R1 = B)", { nexus: true, noStacking: true, renata: true, anomaly: true, timeWarps: 3 }],
  ["no Renata: Nexus + Sentinels + 3 Time Warp", { nexus: true, renata: false, anomaly: false, timeWarps: 3 }],
  ["no Renata: Nexus + Sentinels + Anomaly + 3 Time Warp", { nexus: true, renata: false, anomaly: true, timeWarps: 3 }],
];

const control = byBoard(rows[0][1]);
console.log(`non-vacuity: R1 control best ${Math.max(...control.map((r) => r.points))}, hand walk says ${R1_HAND_RESULT}`);
if (Math.max(...control.map((r) => r.points)) !== R1_HAND_RESULT) process.exit(1);

for (const [label, cfg] of rows) {
  const results = byBoard(cfg);
  const min8 = results.findIndex((r) => r.points >= 8);
  console.log(`${label}`);
  console.log(`  points by starting board 0..12: ${results.map((r) => r.points).join(" ")}`);
  console.log(`  smallest board reaching 8: ${min8 < 0 ? "none" : min8}`);
  if (min8 >= 0 && cfg.renata && cfg.timeWarps === 3 && !cfg.noStacking) {
    for (const [i, s] of results[min8].plan.entries()) console.log(`    T${i + 1}`, JSON.stringify(s));
  }
}
