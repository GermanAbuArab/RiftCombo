// Adversarial check over every finisher in the catalogue (issue #200, lane rc-synth).
//
//   node scripts/adversarial-check.mjs            report everything
//   node scripts/adversarial-check.mjs --strict   exit 1 if any finisher has an unanswered hole
//   node scripts/adversarial-check.mjs --turns    only the turn-clock section
//   node scripts/adversarial-check.mjs --engines  when the ENGINE class is deployable, and only that
//   node scripts/adversarial-check.mjs --recheck-notables   corrections that REPLACE a stale shipped notable
//   node scripts/adversarial-check.mjs --selftest-holes    the hole sweep + notable emitter, on synthetic entries
//
// It asks two questions of every INFINITE / BURST / CHAIN / ALT_WIN entry:
//
//   1. What is the cheapest card in the pool that beats this, and does the entry SAY SO?
//      The first pass of this by hand (2026-09-12) found twelve of the 29 BURST and CHAIN entries
//      standing on attached Equipment - 718.5.b, "Attached cards still can be chosen or targeted by
//      game effects while Attached" - with not one of them naming a gear-removal card, while the
//      catalogue already held Thermo Beam as the payoff of raging-firebrand-thermo-beam-free-gear-wipe.
//      A check that runs over the whole catalogue every time beats one pass by hand, so this is the
//      deliverable rather than that batch of notables.
//
//   2. How many turns does it take, against the do-nothing Hold curve in its own identity?
//      See docs/plays/2026-09-12-the-unopposed-clock.md. Both numbers are OPTIMISTIC LOWER BOUNDS:
//      perfect draws, nothing else ever cast, no interaction from the opponent.
//
//      "Perfect draws" silently includes the RUNE DECK, and that had no paragraph behind it until
//      2026-09-13. This table pays a Power cost out of whatever rune it likes; the game does not.
//      114 shuffles the Rune Deck at setup, 108.5.d makes its order Secret Information, and 430.1
//      channels "from the top" - so a domain arriving on the turn a cost wants it is a DRAW
//      assumption exactly like holding the card, not a choice the player makes. Both paragraphs are
//      cited by nothing else in this project (108.5.d by nothing at all).
//
//      THE ENGINE'S OWN OUTPUT IS PRICED AS OF 2026-09-13, AND IT IS ON BY DEFAULT. `deployTurn`
//      used to price every card in a closure against the rune curve, which is right for a BURST or a
//      CHAIN, where every Energy comes from a rune, and WRONG for an Energy engine: once a loop
//      declaring `produces: ["infinite-energy"]` is assembled, everything bought afterwards costs no
//      Energy and only its POWER still comes off the curve. `gemdragon-henge-vi-blind-fury` says so
//      in its own `terminatesIn` - "it wins by buying dragonstorm-brambleback-trinity-conquer (30
//      Energy, 10 points in one Conquer)" - and this table was charging those 30 Energy to runes.
//
//      The model, read from the catalogue's own `produces` and never from prose: cards belonging to
//      a closure entry that produces `infinite-energy` are the ENGINE and pay rune prices; every
//      other card in the merged set is POST-IGNITION, pays no Energy (and no Power if some engine
//      produces `infinite-power`), and is GATED behind the engine being complete. The engine
//      finishing this turn counts, which is what the hand walk of `jhin-fiora-facebreaker-recall`
//      does - it assembles the loop and spends its Energy in the same Main Phase. Eleven rows move,
//      all EARLIER, and that row moves T5 -> T4, matching the hand walk that reported the defect.
//      `--no-ignition` reproduces the old table exactly.
//
//      WHAT IT COSTS, bounded by a SANDWICH and then settled to ZERO. The gate forbids buying a
//      post-ignition card early at full price, which can only push a row LATER than the truth.
//      `--ignition-nogate` keeps the discount and drops the gate, letting a card be bought early
//      cheaper than it really would be, which can only pull a row EARLIER. So the truth is pinned
//      between them, and they AGREE on 75 of 80 rows.
//
//      THE FIVE THEY DO NOT AGREE ON ARE NOT A RESIDUAL, AND THE FIRST VERSION OF THIS NOTE SAID
//      THEY WERE. `jayce-mesmerize-renata`, `lux-infinite-power`, `renata-bubble-bot-ready`,
//      `renata-mastermind-points` and `swain-double-conquer` have the SAME completion turn under
//      both arms - `d.all` is 4 either way - and differ only in `d.unit`, i.e. entirely in the
//      readiness `+1` that 143.4 charges a unit landing on the final turn. The nogate arm dodges it
//      by "paying" a FREE post cost on an early turn, which the real game never offers: before
//      ignition that unit costs its printed Energy.
//
//      Settled independently in .scratch-gap/probe-readiness-residual.mjs, which asks the necessary
//      condition - to avoid the `+1` every post UNIT must land before the completion turn, so the
//      engine AND every post unit must be paid at printed price by then. Engine E17 against a
//      ceiling of E20 through T4 leaves 3 Energy, and the post units want between 8 and 24. All five
//      are impossible by a wide margin, so the gated answer is the true one on every row and the
//      lower arm is loose for a known artifact rather than for a modelling gap.
//
//      THE ONE NESTING THE MODEL FLATTENS IS MEASURED INERT, NOT ASSUMED TO BE. `lux-infinite-power`
//      is itself an engine that NEEDS `infinite-energy`, so its own six Energy ought to be free once
//      `lux-infinite-energy` ignites, and every fuel producer is charged rune prices instead. That
//      can only over-charge. Measured in .scratch-gap/probe-stage-flatten.mjs with an independent
//      search: EIGHT rows have a closure containing a fuel producer that itself needs fuel, and the
//      flattened engine and the stage-0 engine complete on the SAME turn for all eight - E13 already
//      passes T3's cumulative ceiling of 12, so the extra E4 changes nothing.
//
//      The honest denominator is ONE, not eight: all eight rows share the same closure
//      (`lux-infinite-energy` + `lux-infinite-power`), which is the only multi-stage fuel chain in
//      the catalogue. So this is one measurement, not eight confirmations. IT REOPENS the moment a
//      closure exists whose stage-1 engine costs enough to push the completion past stage 0's turn,
//      and the probe is the check to re-run.
//
//      THE BIGGEST REMAINING GAP IS NOT A COST GAP AT ALL, AND PRICING THE ENGINE IS WHAT EXPOSED IT.
//      This table prices CARDS. `lux-infinite-energy` states TWO board requirements in its own
//      `prerequisites.notable` that no card cost can reach: **"12 runes in play"** and **"Main Deck
//      EMPTY"**. Twelve runes is TURN SIX at the earliest - 315.3.b channels 2 a turn, 161.2.a caps
//      the Rune Deck at 12, and 161.2.b takes a rune off the board for every Power paid - and the
//      empty deck is not reducible to a turn number at all, because how fast a deck empties is a
//      property of the list rather than of the line.
//
//      Exactly TEN of the 80 rows have that engine in their closure and every one of them prints
//      T5, i.e. earlier than the engine's own stated floor: bottled-constellation-time-warp,
//      grand-plaza-loop-time-warp, jayce-mesmerize-renata, lady-luminosity-loop-comet,
//      lux-infinite-energy, lux-infinite-power, renata-bubble-bot-ready, renata-mastermind-points,
//      swain-double-conquer, time-warp-hold-burst. Read those ten as "no earlier than T6", and read
//      the empty-deck requirement as a caveat with no number behind it.
//
//      It is NOT deducted here, and the reason is the reason this file keeps: the requirement lives
//      in PROSE, and a prose predicate for it overstates. Swept, `(\d+) runes (in play|...)` matches
//      five notables catalogue-wide and only TWO are genuine requirements - the other three sit
//      inside an arithmetic ledger or inside prose about the Rune Deck cap - and an empty-deck
//      predicate matches 44 entries of which most merely DISCUSS Burn Out, with the Tournament Rules
//      505 boilerplate asserting an empty deck on all 14 INFINITEs where rc-synth2 measured that only
//      8 need one. Deducting a floor from that would be a guess wearing a number.
//      .scratch-gap/probe-board-prereqs.mjs carries the sweep and both overstatement counts.
//
//      The honest framing is that the over-charge used to PAD these rows past their own floor by
//      accident. Pricing the engine's output removed the padding and left the real constraint
//      visible, which is the opposite of introducing an error.
//
//      ORDERING IS MODELLED AS OF 2026-09-13 AND IT MOVES NOTHING, WHICH IS THE RESULT. `deployTurn`
//      used to ask only whether every cost was PAYABLE by turn N; an [Equip] is not merely a second
//      cost but a LATER one, because 818.1 makes it an Activated Ability of the gear and 380 says an
//      Activated Ability "can primarily be activated while on the Board". That is now a real
//      constraint in the allocator (`link` / `after` in costsOfSet, the `cap` in walk), it is exact,
//      and `--selftest` proves it can SEE a turn where a hand-derived case owes one. Measured over
//      the catalogue: 31 of the 80 finisher rows carry a linked cost and the constraint moves ZERO
//      of them.
//
//      The null is by a HAIR and rests on one paragraph. 359.2.d enters a non-unit gear "Ready at
//      the player's Base", so the gear is on the board the turn it is played and the attach may be
//      the SAME turn; no [Equip] cost in this pool contains an exhaust. Run `--strict-ordering` to
//      forbid the same turn as well - that is WRONG as rules and is only a sensitivity probe - and
//      SIX rows move by exactly one turn (reveler-svellsongur-jhin-infinite-power,
//      shen-kinkou-svellsongur-hold, svellsongur-copy-hold, swain-shurelya-double-conquer,
//      swain-svellsongur-conquer-burst, trinity-skyfall-arena-second-battlefield-chain), taking the
//      unopposed headline from 38 to 41 of 80. The catalogue's gear lines sit exactly on the
//      boundary, and 359.2.d is worth a turn on six of them.
//
//      WHAT IS STILL NOT MODELLED, with its size. An [Equip] also needs a CARRIER - 818.1.c.2,
//      "Attach this gear to a unit you control" - and that unit need not be named in `uses`, because
//      any unit in the deck carries a generic Equipment. Probed in .scratch-gap/probe-carrier.mjs by
//      forbidding an equip until a unit of the same card set is paid: it moves NO row, and the only
//      row it touches at all is `arise-sand-soldiers-plaza`, which it sends to Infinity because that
//      is the one finisher with an Equipment and no unit in `uses` - and that entry already declares
//      `anyBodies: {count: 1}`. So the carrier is inert on all 79 rows where it is expressible and
//      unmodellable on the 80th without inventing a decklist, which is why it is a probe and not
//      shipped.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const onlyTurns = args.includes("--turns");
const emit = args.includes("--emit-notables");
const stalled = args.includes("--stalled");
const recheck = args.includes("--recheck-notables");
const holds = args.includes("--holds");
const holdNotables = args.includes("--holds-notables");
const engines = args.includes("--engines");
const strictOrdering = args.includes("--strict-ordering");
// --ignition prices an Energy (or Power) engine's own output: once a loop declaring
// `produces: ["infinite-energy"]` is assembled, everything bought afterwards costs no Energy, so
// charging the payoff against the rune curve is the known OVER-estimate in this file's header.
// OFF by default until the restriction it makes is verified against an independent search.
// ON by default since 2026-09-13: leaving it off keeps a known NINE-turn error
// (bottled-constellation-time-warp read T14 where its own fuel makes it T5) in preference to a
// bounded one-turn one on five named rows. `--no-ignition` reproduces the old table exactly.
const ignition = !args.includes("--no-ignition");
// Checked HERE rather than at the write site, because the analysis takes ~15s and a refusal that
// arrives after it is one the user has already paid for. See outPath for why it is refused at all.
{
  const at = args.indexOf("--out");
  if (at >= 0 && args[at + 1] && resolve(args[at + 1]).startsWith(resolve("data") + sep)) {
    console.error(`# REFUSING --out ${args[at + 1]}: this writes a corrections file for a human to apply, never a data file.`);
    process.exit(2);
  }
}

// The SANDWICH that proves --ignition's restriction is free. --ignition forbids buying a
// post-ignition card before the loop is running, which can only push a row LATER than the truth.
// --ignition-nogate keeps the discount and drops the gate, which lets a card be bought early at a
// price lower than it would really pay, and so can only pull a row EARLIER than the truth. Where the
// two agree, the truth is pinned between them and equals both. Where they disagree, the restriction
// is costing something and the row needs a hand walk.
const ignNoGate = args.includes("--ignition-nogate");
const FUEL_E = "infinite-energy";
const FUEL_P = "infinite-power";

const cards = JSON.parse(readFileSync("data/cards.json", "utf8")).cards;
const db = JSON.parse(readFileSync("data/combos.json", "utf8"));
const byBase = new Map();
for (const c of cards) if (!byBase.has(c.base)) byBase.set(c.base, c);
// `entries[].bases` is an ARRAY - a scalar read of it matched nothing once and reported a clean.
// Constructed only: the clock's baseline is the Duel Hold curve, which is a Constructed board.
const BANNED = new Set();
for (const r of JSON.parse(readFileSync("data/legality.json", "utf8")).entries)
  if (r.status === "banned" && r.format === "constructed") for (const b of r.bases || []) BANNED.add(b);
const usesBanned = (e) => (e.uses || []).some((u) => BANNED.has(u.card));

const FINISHER = new Set(["INFINITE", "BURST", "CHAIN", "ALT_WIN"]);

// ---------------------------------------------------------------- the answer sets, swept, not typed
// predicate: /\bkills?\b[^.]{0,80}\bgear\b/i over text + effect of every deckable base in cards.json
const gearKills = [];
for (const [base, c] of byBase) {
  if (!c.domains.length && !c.type.includes("battlefield")) continue;
  const t = `${c.text || ""} ${c.effect || ""}`;
  if (/\bkills?\b[^.]{0,80}\bgear\b/i.test(t)) gearKills.push({ base, name: c.name, domains: c.domains });
}
// An Equipment is also answered WITHOUT killing it, by taking it off the carrier: 719.1 appends the
// Effect Text "for as long as they remain Attached" and 137.3.a stops the Might Bonus "as soon as the
// card with the Might Bonus is no longer Attached". A kill predicate cannot see that family, which is
// how 36 shipped notables came to carry a claim narrower than their own question (rc-manager5, via the
// 500-829 lane, 2026-09-12). Swept, not typed: /\bdetach/i over text + effect of every deckable base.
// ENEMY-FACING is a second sweep and not a list - a detacher confined to "friendly" or "you control"
// cannot answer an opponent's line at all. That filter is what takes the population from 5 base codes
// (4 names: Grandmaster at Arms is printed twice, SFD-193 and SFD-245) down to ONE.
const gearDetach = [];
for (const [base, c] of byBase) {
  if (!c.domains.length && !c.type.includes("battlefield")) continue;
  const t = `${c.text || ""} ${c.effect || ""}`;
  if (!/\bdetach/i.test(t)) continue;
  const enemyFacing = !/friendly|you control/i.test(t);
  gearDetach.push({ base, name: c.name, domains: c.domains, enemyFacing });
}
const detachAnswers = gearDetach.filter((d) => d.enemyFacing);
// What the hole check accepts as "this entry has named an answer".
const gearAnswers = [...gearKills, ...detachAnswers];

// the sweeper that answers a 1-Might board for 1 Energy at Reaction speed
const SWEEPER = { base: "OGN-133", name: "Flurry of Blades" };

// ---------------------------------------------------------------- the HOLD bucket's answer sets
// A Hold pays at 315.2.b.2, which Holds only "all Battlefields they Control" - so the opponent
// switches a Hold line off by making you not control the battlefield, and the cheapest way is to
// empty the garrison (323.6 strips Control when your last body leaves). What decides that is MIGHT
// PER BODY, never the number of bodies.
//
// The existing fragile-body check above reads uses[] and c.might, and BOTH halves are wrong for the
// Grand Plaza lines, which are 23 of the 46 in the HOLD bucket:
//   - a Plaza garrison is made of TOKENS, and no entry names a token base code (the synergy layer
//     filters them), so uses[] cannot see it. Measured: 22 of the 23 stand on tokens; uses[] sees 3.
//   - printed Might is not current Might for a body whose own text scales it. VEN-097 Spiderling is
//     printed M1 and reads "I have +1 Might for each other unit you control here with my name", so
//     the SEVEN the Plaza requires are M7 each - and a notable claiming Flurry of Blades answers it
//     shipped to the site on exactly that entry.
// Token Mights are rules text, not card data: rule 187.
const TOKEN_MIGHT = { Recruit: 1, Bird: 1, Tentacle: 1, Reflection: 0, "Shadow Clone": 0, "Sand Soldier": 2, Sprite: 3, Mech: 3 };
// Swept, not typed: a body whose own text raises its Might above the printed value.
const selfScaling = (cards) => cards.filter((c) => /I have \+\d+ :rb_might: for each/i.test(`${c.text || ""} ${c.effect || ""}`));
// Swept, not typed: mass damage that reaches every body at a battlefield. "in combat" is excluded -
// OGN-127 Cannon Barrage deals 2 to all enemy units IN COMBAT and so cannot touch a passive garrison,
// which is the kind of near-miss a damage-ranked list invites.
function sweepMassAnswers(cards) {
  // THIS PREDICATE WAS WRONG THREE TIMES AND EACH WRONG VERSION NAMED A REAL CARD, so the shape is
  // written out rather than trusted. A MASS-DAMAGE predicate is not an ANSWER predicate. An answer is
  // a card the opponent can simply CAST at a garrison standing on a battlefield you control. Excluded,
  // each because a draft named it and reading the text refuted it:
  //   - "in combat"      OGN-127 Cannon Barrage reaches only units in a combat, never a passive garrison.
  //   - "you control"    VEN-133 Glowstone deals 5 to all units YOU control - a drawback, not removal.
  //   - "up to two"      OGN-105 Singularity is "Deal 6 to each of up to two units" and sweeps nothing.
  //   - positional/gated OGN-190 Kog'Maw is a [Deathknell] "at MY battlefield", OGN-148 Anivia and
  //                      OGN-159 Warwick are "When I attack ... here". None is a card you just cast at
  //                      someone else's board, and Kog'Maw alone was named in 17 of 28 draft corrections.
  const out = [];
  for (const c of cards) {
    if (!(c.domains || []).length) continue;
    if ((c.type || []).includes("battlefield")) continue; // 485.5 selects one battlefield at random
    const t = `${c.text || ""} ${c.effect || ""}`.replace(/\s+/g, " ");
    // the damage must reach a battlefield the caster need not occupy
    if (!/(to all (enemy )?units at (a )?battlefields?|kill all units)/i.test(t)) continue;
    if (/in combat|to all units you control|to all friendly units/i.test(t)) continue;
    if (/up to (one|two|three|\d+) units?/i.test(t)) continue;
    if (/\[Deathknell\]|when i attack|at my battlefield/i.test(t)) continue;
    const m = t.match(/deal (\d+) to/i);
    // SCALABLE answers pay per point of damage rather than printing a number: OGN-268 Bullet Time is
    // "Pay any amount of [rainbow] to deal that much damage to all enemy units at a battlefield" and
    // OGN-250 Stormbringer deals a friendly unit's Might. Treating those as Infinity sorted the
    // CHEAPEST answer in the pool to last place.
    const scalable = /pay any amount|damage equal to its might/i.test(t);
    // A SIGNATURE answer is not available to every opponent: 103.2.d.2 makes every Signature card
    // carry the Chosen Champion Legend's tag, so naming one as "the answer" without its forced legend
    // overstates it. Three of the seven swept are Signature.
    out.push({ base: c.base, name: c.name, domains: c.domains || [], e: c.energy || 0, p: c.power || 0,
      dmg: scalable ? Infinity : m ? +m[1] : Infinity, scalable, signature: !!c.signature,
      tag: (c.tags || [])[0] || null, kills: !m && !scalable,
      reaction: /\[Reaction\]/i.test(t), action: /\[Action\]/i.test(t),
      enemyOnly: /to all enemy units/i.test(t) });
  }
  return out.sort((a, b) => a.dmg - b.dmg || a.e + a.p - (b.e + b.p));
}
// Swept, not typed: the only thing that lifts a whole garrison at once is a PERMANENT, garrison-wide
// +Might. Single-target pumps are useless against a sweep that hits seven bodies simultaneously.
function sweepGarrisonProtection(cards) {
  const out = [];
  for (const c of cards) {
    const t = `${c.text || ""} ${c.effect || ""}`;
    const m = t.match(/(your (?:token )?units?|other friendly units?|units here|your Mechs)[^.]{0,28}have \+(\d+) :rb_might:/i);
    if (!m || /while (?:they|we|I)'?re? (?:attackers|defenders)/i.test(m[0])) continue;
    if (/this turn/i.test(t)) continue;
    out.push({ base: c.base, name: c.name, domains: c.domains || [], plus: +m[2], clause: m[0].replace(/\s+/g, " ") });
  }
  return out;
}


const namesAnswer = (blob, set) =>
  set.filter((a) => blob.includes(a.base) || blob.includes(a.name)).map((a) => a.base);

// ---------------------------------------------------------------- the turn clock
// A rune pays 1 Energy (164.2.a, costs its exhaust) and can ALSO be recycled for 1 Power of its
// Domain (164.2.b, whose cost is the recycle) - so with R runes a turn affords up to R Energy and up
// to R Power, but every Power spent takes that rune off the board (161.2.b) and it returns at 2 a
// turn (315.3.b), capped at 12 simultaneously (161.2.a). Going first; 485.7 gives the extra rune to
// the player going SECOND, so this is the slower seat and therefore the honest bound.
// #205: the old allocator sorted by total cost DESCENDING and bought the first affordable card each
// turn. That is a GREEDY pass, and it buys a cheap Power card on turn 1 - which permanently removes
// that rune (161.2.b) and starves the board - so it reported T8 on a line a hand walk puts at T6
// (docs/plays/2026-09-12-chaos-order-the-one-answer.md). Replaced with an EXACT search: state is
// (bitmask of cards paid for) -> the MOST runes reachable with that mask, since for a fixed mask more
// runes always dominates. Each turn every affordable subset of what is left is tried. Median entry
// has 4 costs and p95 is 7, so this is cheap; above 12 it falls back to the greedy pass (one entry
// in the catalogue, at 19).
//
// It returns BOTH the turn everything is paid for and the turn the last UNIT landed, because the
// old "+1 for readiness" was applied to every line and is a UNIT rule: 143.4 "Units enter the Board
// exhausted" against 359.2.d, which enters a non-unit gear READY at base, and 359.3, which makes a
// spell linger on the Chain and never become a permanent at all.
let greedyFallbacks = 0;
// WHICH rows, not just how many. CLAUDE.md's standing instruction is that a row priced by the greedy
// pass is "a row to re-derive by hand rather than quote" - and a reader cannot act on that without the
// id. `greedyFallbacks` counts every CALL, including the intermediate prices the needs/produces fold
// makes, while this records only rows that reach the table; if the two ever disagree, a fallback
// happened somewhere the header does not describe, and it now says so rather than reading as 1 of 80.
const greedyRows = [];
/**
 * Exact, and it now covers every row. #205 replaced a greedy pass with an exact search over a BITMASK
 * of individual cards, which is 2^n and so had to bail out to the greedy pass above 12 costs. Folding
 * `needs` upward (2026-09-13) pushed four rows over that line - and the greedy pass is the very defect
 * #205 existed to remove, so pricing the biggest closures with it would have been a regression hiding
 * inside a fix.
 *
 * The fix is that the bitmask was the wrong state. Two costs with the same (Energy, Power, unit) are
 * INTERCHANGEABLE, so the state is a vector of counts per distinct cost TYPE, not a set of cards.
 * Measured over the catalogue, the largest row collapses from 19 costs (524,288 masks) to 8 types and
 * 8,064 states. Enumeration of what to buy each turn prunes as soon as the running Energy or Power
 * passes the turn's rune count, which is at most 12 (161.2.a).
 *
 * For a fixed set of paid costs, MORE RUNES always dominates, which is what makes the state small
 * enough to be exact; the tie-break keeps the EARLIEST last-unit turn, because that is what the
 * readiness `+1` reads.
 */
/**
 * Cost items -> canonically ordered cost TYPES carrying a dependency index, plus a signature.
 *
 * Two costs are the same TYPE when they share (Energy, Power, unit) AND `link`. Including `link` is
 * what keeps a gear's play cost from merging with an unrelated card that happens to cost the same,
 * which would make the ordering constraint read "this equip follows SOME card of that price" instead
 * of "this equip follows ITS OWN gear" - looser, and therefore a number that is still a lower bound
 * but no longer a tight one.
 *
 * The order is canonical, each root immediately followed by its dependants and roots sorted by the
 * descriptor of the whole chain, for two separate reasons. The allocator reads a dependant's root
 * count out of a slot the recursion has already filled, which requires dep < index. And the
 * signature must be identical for two structurally identical cost sets from different base codes,
 * or the memo - which is the only reason this runs in seconds rather than minutes - would miss on
 * every gear line, because `link` is built out of a base code.
 */
function typesOf(costs) {
  const byType = new Map();
  for (const c of costs) {
    const k = `${c.e}|${c.p}|${c.unit ? 1 : 0}|${c.gated ? 1 : 0}|${c.link || ""}`;
    if (!byType.has(k))
      byType.set(k, { e: c.e, p: c.p, unit: !!c.unit, gated: !!c.gated,
                      link: c.link || "", after: c.after || "", n: 0, kids: [] });
    byType.get(k).n++;
  }
  const all = [...byType.values()];
  const byLink = new Map();
  for (const t of all) if (t.link) byLink.set(t.link, t);
  const roots = [];
  for (const t of all) {
    // A dangling `after` cannot happen today (the two are pushed together) and is treated as a root
    // rather than thrown, because an unconstrained cost is the LOWER bound this table promises.
    const parent = t.after ? byLink.get(t.after) : null;
    if (parent) parent.kids.push(t); else roots.push(t);
  }
  const desc = (t) => `${t.e}|${t.p}|${t.unit ? 1 : 0}|${t.gated ? 1 : 0}|${t.n}` +
                      (t.kids.length ? `(${t.kids.map(desc).sort().join(",")})` : "");
  const cmp = (a, b) => (desc(a) < desc(b) ? -1 : desc(a) > desc(b) ? 1 : 0);
  // Gated roots emit LAST, so that when the recursion reaches one, every ungated type's count for the
  // state being built is already in `cnt` and the "is the engine complete" test can simply read it.
  roots.sort((a, b) => (a.gated ? 1 : 0) - (b.gated ? 1 : 0) || cmp(a, b));
  const types = [];
  const emit = (t, dep) => {
    t.dep = dep;
    const i = types.push(t) - 1;
    for (const k of [...t.kids].sort(cmp)) emit(k, i);
  };
  for (const r of roots) emit(r, -1);
  return { types, sig: roots.map(desc).join(",") };
}

const deployMemo = new Map();
function deployTurn(costs) {
  if (!costs.length) return { all: 0, unit: 0 };
  // Memoized on the canonical cost SIGNATURE, not on the entry: closuresOf and the consumer search
  // both price many candidate card sets and the same multiset recurs constantly.
  const { types, sig } = typesOf(costs);
  const hit = deployMemo.get(sig);
  if (hit) return hit;
  const r = deployTurnUncached(types, costs);
  deployMemo.set(sig, r);
  return r;
}
function deployTurnUncached(types, costs) {
  const dim = types.length;
  // Mixed-radix packing: the whole state is ONE integer, so the inner loop allocates nothing. A
  // first version keyed the state on a joined string and took minutes; the arithmetic was never the
  // problem, the 40 million array-and-string allocations were.
  const stride = new Array(dim);
  let space = 1;
  for (let i = 0; i < dim; i++) { stride[i] = space; space *= types[i].n + 1; }
  // Pricing [Equip] (2026-09-13) added a second cost per Equipment and pushed the biggest closures
  // past what an exact search can do in a test that runs on every commit: at 2e6 the whole table took
  // 50 seconds against 4.6 before. Lowered to 2e5, which keeps it near 5 and sends only the very
  // largest rows to the greedy pass - and the header PRINTS how many, so a row priced by the defect
  // #205 removed can never be read as exact. Raise it if this ever runs somewhere without a clock.
  // RC_GUARD raises the ceiling for a one-off measurement; RC_FB names the rows that hit it. At 2e6
  // every row is exact and the table takes 44 seconds, which is why the default is 2e5 and why the
  // header prints how many rows the fallback priced.
  if (space > (Number(process.env.RC_GUARD) || 2e5)) {
    greedyFallbacks++;
    if (process.env.RC_FB) console.error(`FALLBACK space=${space} dim=${dim}`);
    const g = greedyTurn(costs);
    return { all: g, unit: g, greedy: true };
  }
  const FULL = space - 1;                       // every count at its maximum

  let curR = new Int8Array(space).fill(-1);     // runes on board, -1 = state unreachable
  let curU = new Int8Array(space);              // the turn the last UNIT landed
  let nxtR = new Int8Array(space);
  let nxtU = new Int8Array(space);
  curR[0] = 0;
  // Hoisted out of the per-state loop on purpose: building this closure inside it cost 14s over the
  // catalogue against 0.4s here, because a recursive closure re-created 300,000 times is not one V8
  // can keep optimized.
  let idx = 0, runes = 0, u0 = 0, turn = 0;
  // Where each type stands in the state being BUILT. Hoisted and mutated in place rather than passed,
  // for the same reason the closure itself is hoisted: this is the innermost loop in the file. A
  // dependant reads its root out of this array, which is why typesOf emits a root before its kids.
  const cnt = new Int16Array(dim);
  // index of the first gated type, or -1 when there are none (every row without an engine fold)
  let ungated = -1;
  for (let i = 0; i < dim; i++) if (types[i].gated) { ungated = i; break; }
  const walk = (i, e, p, delta, tookUnit) => {
    if (i === dim) {
      const k = idx + delta;
      const nr = runes - p;                     // 161.2.b: a recycled rune leaves the board
      const nu = tookUnit ? turn : u0;
      // For a fixed set of paid costs MORE RUNES always dominates; ties keep the EARLIEST
      // last-unit turn, because that is what the readiness +1 reads.
      if (nxtR[k] < nr || (nxtR[k] === nr && nxtU[k] > nu)) { nxtR[k] = nr; nxtU[k] = nu; }
      return;
    }
    const t = types[i];
    const have = ((idx / stride[i]) | 0) % (t.n + 1);
    // ORDERING. An [Equip] cost can never have been paid more times than its own gear has been
    // played: 818.1 makes Equip an Activated Ability of that gear and 380 confines an Activated
    // Ability to one "while on the Board". The cap is the root's count IN THE STATE BEING BUILT, so
    // playing a gear and attaching it on the same turn stays legal (359.2.d enters a non-unit gear
    // ready at base, and no [Equip] cost in this pool contains an exhaust) while attaching first
    // does not. `q` only grows, so the break is safe.
    // --strict-ordering is a SENSITIVITY probe, not the model: it forbids the same turn as well, so
    // the gap between the two runs says whether the shipped null is inert by a wide margin or by a
    // hair. It is wrong as rules (359.2.d) and is never the default.
    const root = t.dep < 0 ? -1 : strictOrdering
      ? ((idx / stride[t.dep]) | 0) % (types[t.dep].n + 1)   // the count BEFORE this turn
      : cnt[t.dep];                                          // the count as at this turn
    let cap = t.dep >= 0 && root < t.n ? root : t.n;
    // IGNITION. A gated cost belongs to a card bought with the engine's own output, so it cannot be
    // paid until the engine is complete. `ungated` is the index of the first gated type, and every
    // type before it has already written its count for the state being built (typesOf emits gated
    // roots last), so "complete" is a read rather than a search. The engine finishing THIS turn
    // counts, which is what the hand walk of jhin-fiora-facebreaker-recall does - it assembles the
    // loop and spends its Energy in the same Main Phase.
    //
    // THE RESTRICTION THIS MAKES, stated because it is the thing to check: the model does not let a
    // post-ignition card be bought EARLY at full price. That can only ever push a row later, never
    // earlier, so this number is not a floor in the way the rest of the table is. It is verified
    // against an independent search over the affected rows rather than assumed.
    if (t.gated && ungated >= 0 && !ignNoGate) {
      let done = true;
      for (let z = 0; z < ungated; z++) if (cnt[z] < types[z].n) { done = false; break; }
      if (!done) cap = have;
    }
    for (let q = 0; q <= t.n - have; q++) {
      if (have + q > cap) break;
      cnt[i] = have + q;
      const ne = e + t.e * q, np = p + t.p * q;
      if (ne > runes || np > runes) break;      // R runes afford R Energy AND R Power
      walk(i + 1, ne, np, delta + q * stride[i], tookUnit || (q > 0 && t.unit));
    }
  };
  for (turn = 1; turn <= 40; turn++) {
    nxtR.fill(-1); nxtU.fill(0);
    for (idx = 0; idx < space; idx++) {
      if (curR[idx] < 0) continue;
      runes = Math.min(12, curR[idx] + 2);
      u0 = curU[idx];
      walk(0, 0, 0, 0, false);
    }
    const tR = curR; curR = nxtR; nxtR = tR;
    const tU = curU; curU = nxtU; nxtU = tU;
    if (curR[FULL] >= 0) return { all: turn, unit: curU[FULL] };
  }
  return { all: Infinity, unit: Infinity };
}

// Kept only as the guard for an absurd state space, which NO row in the catalogue reaches today.
// Do not use it for anything else: it is the defect #205 describes.
function greedyTurn(costs) {
  const remaining = costs.map((c) => ({ ...c })).sort((a, b) => b.e + b.p - (a.e + a.p));
  // The same ordering gate the exact allocator enforces, so a fallback row is wrong only in the one
  // way #205 documented and not in a second one as well.
  const paid = new Map();
  let runes = 0;
  for (let turn = 1; turn <= 40; turn++) {
    runes = Math.min(12, runes + 2);
    let energy = runes;
    let recyclable = runes;
    let progress = true;
    while (progress) {
      progress = false;
      for (let i = 0; i < remaining.length; i++) {
        const c = remaining[i];
        if (c.after && (paid.get(c.after) ?? 0) <= (paid.get(c.link) ?? 0)) continue;
        // the --ignition gate, so a fallback row cannot buy the payoff with Energy the loop has not
        // started producing yet
        if (c.gated && !ignNoGate && remaining.some((o) => !o.gated)) continue;
        if (c.e <= energy && c.p <= recyclable) {
          if (c.link) paid.set(c.link, (paid.get(c.link) ?? 0) + 1);
          energy -= c.e;
          recyclable -= c.p;
          runes -= c.p;
          remaining.splice(i, 1);
          progress = true;
          break;
        }
      }
    }
    if (!remaining.length) return turn;
  }
  return Infinity;
}

// --selftest exercises the allocator on synthetic cost sets whose answers are hand-derivable, and it
// exists because ADDING THE ORDERING CONSTRAINT MOVED NO ROW IN THE CATALOGUE. A null from a new
// constraint is worth nothing until the instrument is shown to be able to SEE the thing it is
// claiming is absent, and the two ordered cases below are the proof that it can: the first is the
// shape where ordering costs a turn and the allocator returns 6 unordered against 7 ordered.
if (args.includes("--selftest")) {
  const play = (e, p, link) => ({ e, p, unit: false, link });
  const equip = (e, p, link, after) => ({ e, p, unit: false, link, after });
  const cases = [
    // [name, costs, expected `all`, why]
    ["one E2 card", [play(2, 0, "")], 1, "T1 has 2 runes"],
    ["one E3 card", [play(3, 0, "")], 2, "T1 affords 2, T2 affords 4"],
    ["E12 card", [play(12, 0, "")], 6, "runes are 2,4,6,8,10,12 (161.2.a caps at 12)"],
    ["E1 + 1 Power", [play(1, 1, "")], 1, "R runes afford R Energy AND R Power"],
    // Hand-derived as T3 first, and that was wrong: 164.2.a costs the rune's EXHAUST and 164.2.b
    // costs its RECYCLE, so two runes pay two Energy AND two Power in the same turn and T1 takes
    // two of these three cards. The instrument was right and the expectation was not.
    ["3 x E1+1P", [play(1, 1, ""), play(1, 1, ""), play(1, 1, "")], 2,
     "2 runes pay 2 Energy AND 2 Power on T1; the third card waits for the 2 channelled on T2"],
    ["UNORDERED E12 gear + free-floating E2", [play(12, 0, "a"), play(2, 0, "b")], 6,
     "the E2 goes on T1 out of mana the E12 cannot use"],
    ["ORDERED E12 gear + its E2 equip", [play(12, 0, "g#play"), equip(2, 0, "g#equip", "g#play")], 7,
     "the equip cannot precede the gear, and T6 is exactly 12 runes, so it waits for T7"],
    ["ORDERED, same turn is legal", [play(4, 0, "g#play"), equip(2, 0, "g#equip", "g#play")], 3,
     "T3 has 6 runes and 359.2.d puts the gear on the board the turn it is played"],
  ];
  let bad = 0;
  console.log(`# allocator self-test: ${cases.length} synthetic cost sets, answers hand-derived`);
  for (const [name, costs, want, why] of cases) {
    const got = deployTurn(costs).all;
    const ok = got === want;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  T${got} (want T${want})  ${name} — ${why}`);
  }
  console.log(bad ? `# ${bad} FAILED` : "# all pass");
  process.exit(bad ? 1 : 0);
}

// A payoff that fires in the Beginning Phase cannot fire on the turn the last piece lands: a Hold is
// Scored at 315.2.b.2 and an "at the start of your Beginning Phase" ability fires at 315.2.a, both
// BEFORE the Main Phase (316) in which you assembled the board. Conservative by construction - any
// hold or beginning-phase signal on a card OR in the entry's own prose keeps the extra turn, so this
// can only ever remove it where neither reason is present.
const HOLD_SIGNAL = /when i hold|when you hold|hold here/i;
const BEGINNING_SIGNAL = /beginning phase|start of your/i;
function beginningPhaseGated(e) {
  let text = "";
  for (const u of e.uses || []) {
    const c = byBase.get(u.card);
    if (c) text += ` ${c.text || ""} ${c.effect || ""}`;
  }
  if (HOLD_SIGNAL.test(text) || BEGINNING_SIGNAL.test(text)) return true;
  const prose = `${(e.steps || []).join(" ")} ${e.terminatesIn || ""}`;
  return /\bhold(s|ing)?\b/i.test(prose) || BEGINNING_SIGNAL.test(prose);
}

// The do-nothing Hold curve, from docs/plays/2026-09-12-the-unopposed-clock.md. The pool prints
// exactly TWO units at Energy cost 1 or less out of 513 deckable units - UNL-111 Determined Sentry
// (Body) and VEN-043 Steel Paws (Calm) - so an identity that reaches one of them plays two bodies on
// turn 1, conquers both battlefields on turn 2 and holds to 8 on turn 5. Everything else is turn 6.
const CHEAP_BODY_DOMAINS = new Set(["body", "calm"]);
const baselineTurn = (domains) => ([...domains].some((d) => CHEAP_BODY_DOMAINS.has(d)) ? 5 : 6);

/**
 * THE SECOND BASELINE, AND THE FIRST ONE IS THE WRONG BOARD FOR THE QUESTION.
 *
 * `baselineTurn` is the UNOPPOSED curve: both battlefields yours, 315.2.b.2 Holding both for 2 points
 * a turn, 8 by T5 or T6. That is the board on which NO FINISHER IS NEEDED — this project's own note
 * says it, "unopposed, the Hold curve has already won" — so measuring every finisher against it
 * answers "is this redundant when I was winning anyway", which is not the question a finisher is for.
 *
 * The board a finisher IS for is a contested one. Hold ONE battlefield and the curve pays 1 a turn:
 * a body on T1 (Energy 2 is affordable on two runes in every identity), 143.4 exhausts it, it walks
 * in on T2 for a Conquer, and seven Holds take it to 8 on **T9**. 471.1.a.1 is why the eighth point
 * lands unconditionally — the Final Point restriction of 471.1.b.1 is scoped to a CONQUER, and these
 * are Holds. It is T9 in every identity, because one body on turn 1 does not need an Energy-1 unit.
 *
 * Measured over the catalogue on 2026-09-13: 41 of 80 finishers are slower than the unopposed curve
 * and **6 of 80 are slower than the contested one**, with BURST going from 20 of 23 to 1 of 23. Both
 * numbers are true and they answer different questions, so the report prints both.
 */
const CONTESTED_BASELINE = 9;

// ---------------------------------------------------------------- where a corrections file goes
/**
 * The default is SESSION-UNIQUE, and that is not tidiness.
 *
 * These two modes write a corrections file rather than stdout, because the report sections would
 * otherwise be interleaved with the JSON and the manager applies a FILE. `/tmp/rc-walks/` is shared
 * by every lane on this fleet and currently holds ~187 files, so two lanes running the same mode is
 * the NORMAL case rather than the unlucky one - and the failure is the worst kind: `writeFileSync`
 * truncates, so nobody sees an error, and the reader gets somebody else's plausible, correct-looking
 * data. This project has already had a lane read a file another lane wrote an hour earlier and come
 * within one step of reporting it as its own measurement. Read the path this prints, not a path you
 * remember.
 *
 * `--out` still overrides, and is REFUSED under `data/`: these are corrections for a human to apply,
 * never a data file, and a script under active edit run against a file you do not own is how this
 * repo once recased ~270 correct spans.
 */
function outPath(kind) {
  const at = args.indexOf("--out");
  const chosen = at >= 0 && args[at + 1] ? args[at + 1] : `/tmp/rc-walks/rc-synth-${kind}-${process.pid}.json`;
  mkdirSync(dirname(resolve(chosen)), { recursive: true });
  return chosen;
}

// ---------------------------------------------------------------- the notable each hole earns
/**
 * The emitter's half of holesFor's contract: ONE arm per hole `kind`, and a kind with no arm is a
 * LOUD failure rather than a silent one.
 *
 * That second clause is what closes the CLASS rather than the instance. #220 was a lookup that
 * quietly matched nothing, and repairing the string alone would leave the NEXT hole kind somebody
 * adds free to vanish the same way - detected, named in the report, and never explained to the
 * player who reads riftcombo.app. So unhandled kinds are returned to the caller, which says so on
 * stderr and refuses to hand over a correction row with nothing in it.
 */
function notablesFor(f) {
// The swept set is 16, but several of those only reach a FRIENDLY gear or are gated (Jayce and
// Malzahar kill your own, Zaun Punk's is an additional cost, Bottled Constellation is a payoff,
// Pickpocket caps at Energy cost 1 and Noxian Demolitionist at its own Might, Decree of Unity
// reaches only an enemy Chaos card). Listing all 16 as "answers" would be false, so the notable
// names the unconditional enemy-facing subset and points at this script's predicate for the rest.
const ENEMY_FACING = ["OGN-022", "SFD-005", "VEN-003", "OGN-224", "SFD-032", "SFD-077"];
const facing = gearKills.filter((g) => ENEMY_FACING.includes(g.base))
  .map((g) => `${g.base} ${g.name} (${g.domains.join("/")})`).join(", ");
  const notables = [];
  const eqHole = f.holes.find((h) => h.kind === "equipment");
  if (eqHole) {
    const eq = eqHole.items.join(", ");
    const copies = eqHole.copies;
    // One copy is answered most cheaply by a single-target kill; several by the one card that
    // kills them all. Naming Thermo Beam against a lone Equipment would overstate the threat.
    const headline = copies >= 2
      ? `OGN-022 Thermo Beam (Fury, E5 + 2 Fury Power, "[Action] (Play on your turn or in showdowns.) Kill all gear.") ` +
        `is the only card in the pool that kills EVERY gear at once, so against the ${copies} copies this line ` +
        `stands on it answers the whole payoff with ONE card. It is symmetric, which makes it cheap for a gearless ` +
        `deck and expensive for anyone else.`
      : `The single copy here does not need the mass answer: SFD-005 Detonate (Fury, E1 + 1 Fury Power, "Kill a ` +
        `gear. Its controller draws 2.") is the cheapest removal in the pool for it, and the two cards it hands ` +
        `back do not replace what was attached.`;
    notables.push(
      `THE EQUIPMENT THIS LINE STANDS ON (${eq}) IS A LEGAL TARGET THE WHOLE TIME IT SITS THERE. 718.5.b: ` +
      `"Attached cards still can be chosen or targeted by game effects while Attached." Its printed Rules Text is ` +
      `Inactive while attached (718.2) and its [Equip] is unusable (721.2), but neither of those protects the CARD. ` +
      `${headline} The unconditional enemy-facing gear kills are ${facing} - four domains, so there is no identity ` +
      `this line can hide in. (The full swept set is ${gearKills.length} base codes across all six domains; the ` +
      `predicate is /\\bkills?\\b[^.]{0,80}\\bgear\\b/i over text+effect of every deckable base in ` +
      `data/cards.json, and the rest either reach only a friendly gear or are gated below this line's costs. Run ` +
      `npm run adversarial to re-derive it.)`,
      REACTION_NOTABLE);
  }
  const mightHole = f.holes.find((h) => h.kind === "fragile-body");
  if (mightHole) {
    const bodies = mightHole.items.join(", ");
    notables.push(
      `ONE ENERGY ANSWERS THE MIGHT-1 BODY THIS LINE NEEDS (${bodies}). OGN-133 Flurry of Blades is Body, E1: ` +
      `"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields." ` +
      `143.2.a kills on marked damage at or above Might, so it kills every 1-Might body on the board ` +
      `SIMULTANEOUSLY however many there are - the binding constraint is Might PER BODY, not the number of bodies, ` +
      `so no amount of going wider answers it - and 813.1.c.1 lets it land in any Closed State on either player's ` +
      `turn. THE REPAIR IS NOT AS NARROW AS THIS SENTENCE USED TO SAY, AND THE CORRECTION IS THE USEFUL HALF: it ` +
      `named UNL-077 Soul Shepherd as "the only permanent board-wide" fix, which is true only of the word ` +
      `TOKEN-SCOPED and reads as an identity sentence it is not. Swept over text+effect of every printing for a ` +
      `STATIC, non-"this turn" +N Might reaching more than one friendly body, folded by name+type and read card ` +
      `by card: FIVE OF THE SIX DOMAINS PRINT ONE. Board-wide and ungated - VEN-018 Rage Amplifier (fury, E4 + 1 ` +
      `Power, GEAR, "Your units have +1 Might", +2 while Empowered, so 359.2.d enters it ready at base and it ` +
      `costs no body slot and carries no location clause), UNL-077 Soul Shepherd (mind, E5, token units only), ` +
      `UNL-147 Baron Nashor (chaos, E10 + 3 Power, +2 to other friendly units) and UNL-191 Wuju Master ` +
      `(calm/body, a LEGEND at [Level 6], so no card slot at all). Location-scoped, which costs a body slot AND ` +
      `fills one of the places the bodies have to stand - OGS-013 Garen, Commander and OGN-243 Darius, Executioner ` +
      `(both order, E6 + 1 Power, "Other friendly units have +1 Might HERE"). What is genuinely narrow is the rest: ` +
      `OGN-266 Siphon Power is one turn and one battlefield, and the three battlefield answers (OGN-294 Trifarian ` +
      `War Camp, UNL-T03 Brush, VEN-159 Kinkou Temple) are unavailable to any line that already needs a ` +
      `battlefield of its own, since 485.4.a puts one of your three on the table and 103.4.c forbids duplicate ` +
      `names. So check your OWN identity against that list before treating the sweeper as unanswerable: this ` +
      `sentence is generated, and the predicate is the one stated above - re-run npm run adversarial to derive it.`);
  }
  const HANDLED = new Set(["equipment", "fragile-body"]);
  const unhandled = [...new Set(f.holes.map((h) => h.kind))].filter((k) => !HANDLED.has(k));
  return { notables, unhandled };
}

// ---------------------------------------------------------------- holes, and why they are OBJECTS
/**
 * A hole carries a `kind`. It is NOT identified by its sentence, because it was, and that broke
 * silently (#220).
 *
 * The fragile-body check below was widened from `might === 1` to `might <= 1` and its message was
 * reworded from "a Might-1 body" to "a Might-1-or-less body" to match. The emitter, which found its
 * own hole again with `startsWith("stands on a Might-1 body")`, was not - and
 * `"...Might-1-or-less...".startsWith("...Might-1 body")` is false, so from that commit the notable
 * explaining the hole could never be emitted. The zone guard added later closed every live instance,
 * which is why nothing noticed: the report still named the hole and the emitter simply offered
 * nothing for it. Removing the guard reproduces it exactly - 1 hole of 80 finishers
 * (swain-svellsongur-conquer-burst, Steel Paws M0) and a correction row carrying ZERO notables.
 *
 * Two things follow, and both belong here rather than in the emitter:
 *   - `kind` is a tag nobody rewords by accident. The prose is free to change; the contract is not.
 *   - `items` is the PAYLOAD, so the emitter never re-parses its own sentence. It used to recover the
 *     card list with `hole.match(/\((.*)\) and names no/)[1]`, which is the same fragility one step
 *     later: it would fail LOUDLY rather than silently, which is better, but it fails for the same
 *     reason - a consumer reading a producer's prose.
 */
function holesFor(e) {
  const blob = JSON.stringify(e.prerequisites) + JSON.stringify(e.steps) + (e.notes || "") + (e.terminatesIn || "");
  // `copies` rides with the hole because the emitter's headline turns on it, and it used to recover
  // the number by running /x(\d+)/g over the label this same line builds - a consumer parsing a
  // producer's string, which is #220's shape one notch less severe. LATENT rather than live: no card
  // name in the pool contains x<digit> (swept over all 935 distinct names), so the count is correct
  // today and would go quietly wrong for a future printing, or for anyone who rewords the label.
  const equipment = [];
  const fragile = [];
  for (const u of e.uses || []) {
    const c = byBase.get(u.card);
    if (!c) continue;
    if (c.type.includes("legend") || c.type.includes("battlefield")) continue;
    if (c.type.includes("gear") && c.tags.includes("Equipment")) equipment.push({ label: `${c.name} x${u.quantity}`, quantity: u.quantity });
    // OGN-133 Flurry of Blades reads "Deal 1 to all units AT BATTLEFIELDS", so it cannot reach a body
    // the entry itself declares in zone BASE. Four of the ten finishers with a Might<=1 unit declare it
    // there (a tag-carrier for Ivern, or a "played this turn" enabler for Swain, neither of which ever
    // has to leave the base), and the emitter shipped a FALSE "one Energy answers this" notable to three
    // of them - each quoting the "at battlefields" clause in the same sentence. Zone is declared on 98.7%
    // of uses[] rows, so this reads real data rather than guessing. Those bodies are still answerable, by
    // the removal that reaches a base (OGN-229 Vengeance and its family) - just not by the sweeper.
    if (c.type.includes("unit") && c.might !== null && c.might <= 1 && u.zone !== "BASE") fragile.push(`${c.name} (M${c.might})`);
  }
  const holes = [];
  if (equipment.length && !namesAnswer(blob, gearAnswers).length)
    holes.push({ kind: "equipment", items: equipment.map((x) => x.label),
                 copies: equipment.reduce((n, x) => n + x.quantity, 0),
                 text: `stands on Equipment (${equipment.map((x) => x.label).join(", ")}) and names no gear answer` });
  if (fragile.length && !namesAnswer(blob, [SWEEPER]).length)
    holes.push({ kind: "fragile-body", items: fragile,
                 text: `stands on a Might-1-or-less body at a battlefield (${fragile.join(", ")}) and never names OGN-133 Flurry of Blades` });
  return holes;
}

// ---------------------------------------------------------------- the Reaction/detach notable
// Hoisted because THREE modes need the identical sentence: --emit-notables writes it into an entry
// that has no gear answer at all, --recheck-notables replaces the STALE, narrower version of it that
// 14 entries already carry, and --selftest-holes asserts it is still produced. One source of truth,
// so they can never drift apart.
const REACTION_NOTABLE =
  `NO GEAR KILL IN THE POOL CARRIES [Reaction] - BUT A KILL IS NOT THE ONLY ANSWER, AND THE PREDICATE ` +
  `THAT MEASURED THAT SET COULD NOT SEE THE OTHER FAMILY. Swept over all ${gearKills.length} kills: Thermo ` +
  `Beam and Salvage are [Action], which 806.1.c.1 makes short for "This can be played during showdowns on ` +
  `any player's turn", and Detonate and Brittle Steel are plain spells, which 155 confines to "an Open State ` +
  `outside of Showdowns on its controller's turn". WHICH OF THOSE PROTECTS THIS LINE DEPENDS ON WHERE IT PAYS, ` +
  `so check before relying on it. If it pays on a HOLD, the Score happens at 315.2.b.2 inside your own Beginning ` +
  `Phase, where 312.2.a gives the opponent no priority in a Neutral Open State and 813.1.c.1 admits only a ` +
  `[Reaction] in the Closed State the trigger opens - no kill in the pool reaches that window at all, so each ` +
  `must be cast on THEIR own turn, a full turn early and fully telegraphed, and that spell on the Chain is ` +
  `itself a Closed State where 312.2.c hands out priority and 813.1.c.1 admits a [Reaction] in response. If it ` +
  `instead pays in your MAIN PHASE, that protection does not exist: 806.1.c.1 puts Thermo Beam and Salvage ` +
  `inside any showdown on any player's turn, so they reach the scoring window itself. THE SECOND FAMILY IS DETACHMENT, AND IT DOES CARRY [Reaction]. ` +
  `719.1 appends an attached card's Effect Text to its carrier "for as long as they remain Attached" and ` +
  `137.3.a stops the Might Bonus "as soon as the card with the Might Bonus is no longer Attached", so taking ` +
  `the Equipment OFF switches the payoff off without killing anything. Swept with /\\bdetach/i over ` +
  `text+effect of every deckable base: ${gearDetach.length} base codes (${new Set(gearDetach.map((d) => d.name)).size} names - ` +
  `Grandmaster at Arms is printed twice), of which only ${detachAnswers.length} is ENEMY-FACING, because ` +
  `Strike Down says "an equipped friendly unit", Veiled Temple "a friendly gear" and Grandmaster at Arms ` +
  `"you control". That one is SFD-011 Angle Shot - Fury, 2 Energy, NO Power, and it cantrips: "[Reaction] ` +
  `(Play any time, even before spells and abilities resolve.) Choose a unit and an Equipment with the same ` +
  `controller. Attach that Equipment to that unit or detach that Equipment from that unit. Draw 1." The words ` +
  `that make it an answer are "the same controller", which need not be you. WHAT IT PROVABLY DOES is strip ` +
  `the text and the Might Bonus BEFORE the trigger condition is ever met. WHAT IS NOT WALKED, and a reader ` +
  `should not reach for it here until somebody does, is whether a detach inside the scoring window itself ` +
  `accomplishes anything. The reason to DOUBT it - not a paragraph that settles it - is that a Trigger Condition ` +
  `is measured when the trigger is PLACED (383.2.a.1 makes a clause immediately after the trigger "part of the ` +
  `Trigger Condition and not the Effect"), so stripping the Equipment once its trigger is already on the Chain ` +
  `may well change nothing. Nobody has walked what becomes of a chain item whose source text has gone. Until ` +
  `somebody does, treat Angle Shot as a cheap answer cast EARLY, and do not claim it answers the trigger.`;

// ---------------------------------------------------------------- --selftest-holes
/**
 * The hole sweep and the notable emitter had NO test, which is how #220 survived: every live hole is
 * currently answered, so `--emit-notables` prints `[]` and neither path is exercised by real data at
 * all. A detector with no known positive cannot tell "nothing is wrong" from "I am not looking", so
 * a test over the catalogue would have gone green either side of the break.
 *
 * The fixtures are therefore synthetic, in the shape of `--selftest`, and the answers are derived by
 * hand from the two rules the pair encodes:
 *   - OGN-133 Flurry of Blades reads "Deal 1 to all units AT BATTLEFIELDS", so a body the entry
 *     declares in zone BASE is NOT answered by it. That guard is the repair that stopped a FALSE
 *     notable shipping to three entries (#200 batch 17), and deleting it left the whole suite green.
 *   - 143.2.a kills on marked damage at or above Might, so the threshold is Might <= 1 and a Might-2
 *     body is not in the hole at all.
 *
 * Every fixture names a REAL base code, because the sweep reads type, might and tags out of
 * data/cards.json - an invented card would produce nothing and pass for the wrong reason.
 */
if (args.includes("--selftest-holes")) {
  const entry = (uses, prose = "synthetic fixture") => ({
    id: "selftest", class: "BURST",
    uses: uses.map(([card, quantity, zone]) => ({ card, quantity, zone })),
    prerequisites: { easy: [], notable: [] }, steps: [prose], notes: "", terminatesIn: "",
  });
  const cases = [
    { name: "fragile body at a battlefield, no answer named",
      e: entry([["VEN-043", 1, "BATTLEFIELD"]]), kinds: ["fragile-body"], notables: 1,
      contains: ["Steel Paws (M0)"],
      why: "VEN-043 Steel Paws is Might 0 and stands where the sweeper reaches - the hole, and the sentence must name the body" },
    { name: "the SAME body declared at the base",
      e: entry([["VEN-043", 1, "BASE"]]), kinds: [], notables: 0,
      why: "OGN-133 says 'at battlefields', so it cannot reach a base - this is the guard that stopped three false notables" },
    { name: "fragile body at a battlefield, and the entry names the sweeper",
      e: entry([["VEN-043", 1, "BATTLEFIELD"]], "answered by OGN-133"), kinds: [], notables: 0,
      why: "an entry that already names its answer has no hole; without this, case 1 could pass for the wrong reason" },
    { name: "a Might-2 body at a battlefield",
      e: entry([["OGN-003", 1, "BATTLEFIELD"]]), kinds: [], notables: 0,
      why: "143.2.a needs damage at or above Might, and one damage is below 2 - the threshold is Might <= 1" },
    { name: "one Equipment, no gear answer named",
      e: entry([["SFD-059", 1, "BATTLEFIELD"]]), kinds: ["equipment"], notables: 2,
      contains: ["Svellsongur x1", "The single copy here does not need the mass answer"],
      why: "718.5.b keeps an attached Equipment targetable; one copy is answered most cheaply by SFD-005 Detonate" },
    { name: "two Equipment, no gear answer named",
      e: entry([["SFD-059", 2, "BATTLEFIELD"]]), kinds: ["equipment"], notables: 2,
      contains: ["Svellsongur x2", "is the only card in the pool that kills EVERY gear at once"],
      why: "two or more copies switch the headline to OGN-022 Thermo Beam, which answers all of them with one card" },
    { name: "Equipment, and the entry names a gear answer",
      e: entry([["SFD-059", 1, "BATTLEFIELD"]], "answered by OGN-022"), kinds: [], notables: 0,
      why: "the same namesAnswer check on the gear side" },
    { name: "BOTH holes on one entry",
      e: entry([["SFD-059", 1, "BATTLEFIELD"], ["VEN-043", 1, "BATTLEFIELD"]]),
      kinds: ["equipment", "fragile-body"], notables: 3,
      contains: ["Steel Paws (M0)", "Svellsongur x1"],
      why: "#220 WAS exactly this asymmetry - the equipment arm worked and the fragile arm did not, so one kind must never mask the other" },
  ];

  console.log(`# --selftest-holes: the hole sweep and the notable emitter, on synthetic entries`);
  console.log(`# ${cases.length} cases, ${cases.filter((c) => c.kinds.length).length} expect a hole and ` +
              `${cases.filter((c) => !c.kinds.length).length} expect none; kinds exercised: ` +
              `${[...new Set(cases.flatMap((c) => c.kinds))].sort().join(", ")}`);
  let bad = 0;
  for (const c of cases) {
    const holes = holesFor(c.e);
    const kinds = holes.map((h) => h.kind);
    const { notables, unhandled } = notablesFor({ e: c.e, holes });
    const missing = (c.contains || []).filter((t) => !notables.join("\n").includes(t));
    const ok = kinds.join(",") === c.kinds.join(",") && notables.length === c.notables &&
               !unhandled.length && !missing.length;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  ${c.name}`);
    console.log(`          holes=[${kinds.join(", ")}] want [${c.kinds.join(", ")}]  ` +
                `notables=${notables.length} want ${c.notables}` +
                `${missing.length ? `  MISSING FROM THE SENTENCE: ${missing.join(" | ")}` : ""}`);
    console.log(`          ${c.why}`);
  }

  // The half that closes the CLASS: a hole kind nobody wrote a sentence for must be LOUD. #220 was
  // silent, and a fix that only repaired the string would leave the next kind free to vanish.
  const { notables, unhandled } = notablesFor({ e: { id: "selftest" }, holes: [{ kind: "not-a-kind", items: [], text: "x" }] });
  const okLoud = unhandled.join(",") === "not-a-kind" && notables.length === 0;
  if (!okLoud) bad++;
  console.log(`  ${okLoud ? "ok  " : "FAIL"}  an unhandled hole kind is reported, not swallowed`);
  console.log(`          unhandled=[${unhandled.join(", ")}] want [not-a-kind]  notables=${notables.length} want 0`);
  console.log(bad ? `# ${bad} FAILED` : "# all pass");
  process.exit(bad ? 1 : 0);
}

// ---------------------------------------------------------------- run it
const findings = [];
const clock = [];
const entries = [];
for (const e of db.combos) {
  // ENGINEs are priced only under --engines, and reported in their own section with their own
  // wording. They are NOT folded into the finisher table: an ALT_WIN belongs there because it PAYS a
  // turn and wins, and an engine never pays at all - it produces a rate. Putting them in one table
  // would be the class-filter mistake of 2026-09-13 committed in reverse.
  if (!FINISHER.has(e.class) && !(engines && e.class === "ENGINE")) continue;
  const domains = new Set();
  for (const u of e.uses || []) {
    const c = byBase.get(u.card);
    if (c) for (const d of c.domains) domains.add(d);
  }
  const holes = holesFor(e);
  if (holes.length) findings.push({ e, holes });

  // The card MULTISET, not a cost array: two entries folded together can share a card (OGN-104
  // Retreat is in both lux-infinite-power and renata-mastermind-points) and a deck holds ONE of it.
  // Costs are derived from the merged set in ONE place below, which is also what closes the
  // two-cost-builders defect #205 shipped - there is now a single builder, costsOfSet.
  entries.push({ e, domains, cards: cardSetOf(e) });
}

// ---------------------------------------------------------------- the clock, with the DAG folded in
// `needs`/`produces` is a DAG and the clock folds it in BOTH directions, because either half alone
// prices a board nobody can actually assemble.
//
//   DOWNWARD: an entry that produces only FUEL (infinite-energy, infinite-power, a token engine) has
//   no clock of its own - ten of the fourteen INFINITEs are in that shape - so add the cheapest
//   consumer that actually produces points.
//
//   UPWARD: an entry that CONSUMES fuel cannot run without it, and until 2026-09-13 its declared
//   `needs` were never funded. Eight of the 54 rows are in that shape and three of them were in the
//   nine that beat their baseline, so the direction that flatters the catalogue was the one that was
//   missing. `renata-mastermind-points` read T4 over its own four cards; the honest set is the
//   9-card, 11-copy closure with both Lux engines and it reads T5.
//   (docs/plays/2026-09-13-the-fastest-win-needs-an-empty-deck.md)
//
// This mirrors `generateVariants` in src/combos.ts, which is the real walker - a .mjs script cannot
// import TypeScript, so the expansion is repeated here and must be kept in step with it: max-merge
// the card multisets, cap the domain union at two (103.1.b), cap the depth at 3, and carry the
// accumulated `produces` so a second need already covered by an earlier pick costs nothing.
//
// NOT priced, and it is the bigger of the two costs on the INFINITE class: all eight of the loops
// that recycle need an EMPTY MAIN DECK, which is a draw cost and not a mana cost. 315.4.b.1 makes an
// empty deck at your own Draw Phase an automatic Burn Out, so the state lasts one Main Phase.
const POINTY = new Set(["ability-points", "burst-points", "win-the-game"]);
const producesPoints = (e) => e.produces.some((p) => POINTY.has(p));
// A partner folded in is a card you would have to PUT IN THE DECK, so a banned one makes the whole
// closure illegal. This project already records the trap by name - OGN-177 Stealthy Pursuer reached
// row 20 of a ranked matrix, and `pursuer-herald-recruits` is a verified INFINITE that legality drops
// at match time - and the first version of the upward fold walked straight into it, picking that very
// entry as the cheapest fuel for `ready-recruits-grand-plaza`. A banned entry still gets its own ROW,
// marked, because refusing to price it would hide it; it just cannot be anybody else's partner.
const consumers = db.combos.filter((c) => c.needs.length && producesPoints(c) && !usesBanned(c));
const byId = new Map(db.combos.map((c) => [c.id, c]));
const producers = new Map();
for (const c of db.combos) {
  if (usesBanned(c)) continue;
  for (const f of c.produces || []) {
    if (!producers.has(f)) producers.set(f, []);
    producers.get(f).push(c);
  }
}

/** base -> copies, summed within an entry so a duplicated `uses` row is not lost. */
function cardSetOf(e) {
  const out = {};
  for (const u of e.uses || []) out[u.card] = (out[u.card] ?? 0) + u.quantity;
  return out;
}
/** MAX across entries, because a card two folded entries both name is one card in the deck. */
const mergeSets = (a, b) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
};
const domainsOfSet = (set) => {
  const d = new Set();
  for (const b of Object.keys(set)) for (const x of (byBase.get(b)?.domains || [])) d.add(x);
  return d;
};
/**
 * The [Equip] cost, which is a SECOND cost the printed `energy`/`power` fields cannot see.
 * 818.1 makes Equip an Activated Ability with its own cost, so a line that attaches three Svellsongur
 * pays E3 + 3 Calm Power that this table charged nothing for until 2026-09-13
 * (docs/plays/2026-09-13-the-entry-the-clock-condemned-hardest.md — it was worth a whole turn there).
 * 32 of the 80 finishers were under-priced by it.
 *
 * Parsed, not approximated. Of the 107 gear names, 39 print an [Equip] cost and **35 parse to pure
 * Energy and rune symbols** — which reproduces CLAUDE.md's independent count of 29 one-rune plus 6
 * Energy-and-rune exactly. The other FOUR are named here rather than guessed at, and each is charged
 * its MANA part only, because this table is an optimistic LOWER BOUND and must never over-charge:
 *   SFD-150 Last Rites            1 rune + "Recycle 2 cards from your trash"  -> 1 Power
 *   SFD-178 Blade of the Ruined King  1 rune + "Kill a friendly unit"         -> 1 Power
 *   UNL-158 Shepherd's Heirloom   "Spend 1 XP", no mana at all                -> nothing
 *   UNL-188 Hextech Gauntlets     E3 + rainbow, Energy "reduced by the Might of the unit you
 *                                 choose" and floored at 0 by 356.6, so any 3+ Might carrier
 *                                 attaches it for the rainbow alone                -> 1 Power
 */
const EQUIP_MANA_ONLY = { "UNL-188": { e: 0, p: 1 } };
function equipCost(c) {
  const t = `${c.text || ""} ${c.effect || ""}`;
  if (!/\[Equip\]/i.test(t)) return null;
  if (/\[Quick-Draw\]/i.test(t)) return null;     // 819.1.d attaches on play; no Equip cost is determined
  if (EQUIP_MANA_ONLY[c.base]) return EQUIP_MANA_ONLY[c.base];
  const m = t.match(/\[Equip\]\s*([^(\[]*)/i);
  if (!m) return null;
  return {
    e: [...m[1].matchAll(/:rb_energy_(\d+):/g)].reduce((a, x) => a + Number(x[1]), 0),
    p: [...m[1].matchAll(/:rb_rune_[a-z]+:/g)].length,
  };
}

/** THE ONLY cost builder. #205 shipped a defect because there were two and one was patched. */
const costsOfSet = (set, ign) => {
  const out = [];
  const equips = [];
  // 821.1.c: [Weaponmaster] attaches one of your Equipment "for one rainbow less", so the cheapest
  // single attach in the set is free. Skipping it entirely keeps this a lower bound.
  const weaponmaster = Object.keys(set).some((b) => {
    const c = byBase.get(b);
    return c && /\[Weaponmaster\]/i.test(`${c.text || ""} ${c.effect || ""}`);
  });
  for (const [b, q] of Object.entries(set)) {
    const c = byBase.get(b);
    if (!c || c.type.includes("legend") || c.type.includes("battlefield")) continue;
    const eq = equipCost(c);
    // ORDERING. An [Equip] cost is not merely a second cost, it is a LATER one: 818.1 makes Equip an
    // Activated Ability of the gear and 380 says an Activated Ability "can primarily be activated
    // while on the Board", so it cannot be paid before the gear itself has been. `link` and `after`
    // carry that into the allocator; everything else in this pool is an ordinary play cost with no
    // predecessor. The SAME turn is legal and is left legal: 359.2.d enters a non-unit gear "Ready at
    // the player's Base", so the gear is on the board the turn it is played, and no [Equip] cost in
    // this pool contains an exhaust (measured: 0 exhaust symbols across the 40 Equipment).
    const linked = !!(eq && (eq.e || eq.p));
    // 143.4 exhausts UNITS only, so only a unit costs a readiness turn.
    // POST-IGNITION. A card outside the engine's own set is bought after the loop is running, so an
    // `infinite-energy` engine pays its Energy and an `infinite-power` engine its Power. `gated`
    // then forbids paying for it before the engine is complete - see the note on the restriction in
    // deployTurnUncached.
    const post = !!(ign && !ign.bases.has(b));
    const ce = post && ign.freeE ? 0 : c.energy || 0;
    const cp = post && ign.freeP ? 0 : c.power || 0;
    for (let i = 0; i < q; i++) {
      out.push({ e: ce, p: cp, unit: c.type.includes("unit"), gated: post,
                 link: linked ? `${b}#play` : "" });
      if (linked) equips.push({ e: post && ign.freeE ? 0 : eq.e, p: post && ign.freeP ? 0 : eq.p,
                                unit: false, gated: post, link: `${b}#equip`, after: `${b}#play` });
    }
  }
  if (weaponmaster && equips.length) {
    equips.sort((a, b2) => a.e + a.p - (b2.e + b2.p));
    equips.shift();
  }
  // COLLAPSE FREE COSTS. N items that cost nothing are payable exactly when one of them is, so N of
  // them and one of them are the same constraint - but they are N+1 states against 2, and with
  // --ignition a row whose engine supplies both fuels turns its whole payoff into free costs. Exact,
  // not an approximation: the only thing a free cost can still carry is the readiness turn a UNIT
  // owes (143.4), and that rides on the representative as a disjunction.
  const all = out.concat(equips);
  // A cost that something else DEPENDS on may not be collapsed: three free gears carrying three
  // [Equip] costs are three roots, and folding them to one leaves the equips permanently gated
  // behind a root that can never reach three. Found by a row going to Infinity, which is what a
  // deadlock looks like from outside.
  // An ordering constraint between two costs that BOTH cost nothing can never bind, so dropping it
  // is exact and it is what lets a whole free payoff collapse. Only with --ignition does this ever
  // fire: without it no play cost is zero and no equip cost is zero.
  const allFree = new Map();
  for (const c of all) if (c.link) allFree.set(c.link, (allFree.get(c.link) ?? true) && !c.e && !c.p);
  for (const c of all) if (c.after && !c.e && !c.p && allFree.get(c.after)) { c.after = ""; c.link = ""; }
  const roots = new Set(all.filter((c) => c.after).map((c) => c.after));
  const collapsible = (c) => !c.e && !c.p && !c.after && !roots.has(c.link || "");
  const free = all.filter(collapsible);
  if (free.length < 2) return all;
  const rest = all.filter((c) => !collapsible(c));
  const keys = new Set(free.map((c) => `${c.gated ? 1 : 0}|${c.link || ""}`));
  const kept = [];
  for (const k of keys) {
    const group = free.filter((c) => `${c.gated ? 1 : 0}|${c.link || ""}` === k);
    kept.push({ ...group[0], unit: group.some((c) => c.unit) });
  }
  return rest.concat(kept);
};

/**
 * Every legal closure of `e` and the entries that satisfy its needs, as {cards, produces, ids}.
 * Empty means unsatisfiable inside two domains and three hops, which is a real answer: the caller
 * then prices `e` alone and says so rather than inventing a board.
 */
function closuresOf(e, seen, depth) {
  let partials = [{ cards: cardSetOf(e), produces: new Set(e.produces), ids: [e.id] }];
  for (const need of e.needs || []) {
    const opts = (producers.get(need) || []).filter((p) => p.id !== e.id && !seen.has(p.id));
    if (!opts.length || depth >= 3) return [];
    const next = [];
    for (const p of partials) {
      if (p.produces.has(need)) { next.push(p); continue; }
      for (const opt of opts) {
        for (const sub of closuresOf(opt, new Set([...seen, e.id]), depth + 1)) {
          const cards = mergeSets(p.cards, sub.cards);
          if (domainsOfSet(cards).size > 2) continue; // 103.1.b: a legend has exactly two domains
          next.push({ cards, produces: new Set([...p.produces, ...sub.produces]),
                      ids: [...new Set([...p.ids, ...sub.ids])] });
        }
      }
    }
    partials = next;
  }
  return partials;
}

for (const { e, domains: ownDomains, cards: ownCards } of entries) {
  // UPWARD first: the cheapest legal closure that satisfies this entry's own needs.
  let cards = ownCards;
  let produces = new Set(e.produces);
  let fuel = null;
  let closureIds = [e.id];
  if ((e.needs || []).length) {
    let best = null;
    for (const c of closuresOf(e, new Set(), 0)) {
      const t = deployTurn(costsOfSet(c.cards)).all;
      if (!best || t < best.t) best = { t, c };
    }
    // An unsatisfiable `needs` is NOT silently ignored: price the entry alone and say the fuel is
    // missing, so a reader can tell "cheap" from "cheap because half of it was not counted".
    if (best) { cards = best.c.cards; produces = best.c.produces; closureIds = best.c.ids;
                fuel = best.c.ids.filter((id) => id !== e.id).join(" + ") || null; }
    else fuel = "NEEDS UNSATISFIABLE in two domains";
  }
  // DOWNWARD second, over the expanded set: an entry that still scores nothing has no clock of its
  // own. The consumer is matched against the EXPANDED produces, which is what retires this file's
  // own long-standing "no ONE-HOP consumer" wart - lux-infinite-power needed lux-infinite-energy
  // beside it before any point payoff would match.
  let via = null;
  let consumer = null;
  if (!producesPoints(e)) {
    let best = null;
    for (const c of consumers) {
      if (c.id === e.id) continue;
      if (!c.needs.every((n) => produces.has(n))) continue;
      const merged = mergeSets(cards, cardSetOf(c));
      if (domainsOfSet(merged).size > 2) continue;
      const t = deployTurn(costsOfSet(merged)).all;
      if (!best || t < best.t) best = { t, id: c.id, merged, consumer: c };
    }
    if (best) { cards = best.merged; via = best.id; consumer = best.consumer; }
    else via = "no legal consumer in two domains";
  }
  // The extra turn is owed for exactly two reasons and neither is universal, which is what the old
  // unconditional "+1" got wrong: a UNIT that landed on the final turn is still exhausted (143.4) and
  // is readied only at the next Awaken (315.1.b); and a payoff that fires in the Beginning Phase
  // cannot fire on the turn you assembled the board. A line whose last act is casting a spell out of
  // runes it already has owes neither.
  //
  // Read on whichever entry carries the PAYOFF and never on the fuel: `lux-infinite-energy` brings
  // UNL-165 Shadow's Call, whose reminder says "at the start of its controller's Beginning Phase",
  // and folding that in would charge a readiness turn to every line that burns Lux Energy.
  // The ignition descriptor: which of the merged cards belong to an engine that declares unbounded
  // Energy or Power, and therefore which of the rest are bought with its output rather than with
  // runes. Read from the catalogue's own `produces`, never from prose. Only the FINAL pricing uses
  // it; the closure and consumer searches above compare candidates at rune prices, which is a
  // heuristic for WHICH fuel to fold and not part of the answer.
  let ign = null;
  if (ignition) {
    const engineIds = closureIds.filter((id) => {
      const c = byId.get(id);
      return c && (c.produces || []).some((x) => x === FUEL_E || x === FUEL_P);
    });
    if (engineIds.length) {
      let bases = {};
      let freeE = false, freeP = false;
      for (const id of engineIds) {
        const c = byId.get(id);
        bases = mergeSets(bases, cardSetOf(c));
        if ((c.produces || []).includes(FUEL_E)) freeE = true;
        if ((c.produces || []).includes(FUEL_P)) freeP = true;
      }
      const baseSet = new Set(Object.keys(bases));
      // No post-ignition cards means nothing to discount, and the row is priced exactly as before.
      if (Object.keys(cards).some((b) => !baseSet.has(b))) ign = { bases: baseSet, freeE, freeP };
    }
  }
  const finalCosts = costsOfSet(cards, ign);
  const d = deployTurn(finalCosts);
  if (d.greedy) greedyRows.push(e.id);
  const gated = beginningPhaseGated(e) || (consumer ? beginningPhaseGated(consumer) : false);
  const pays = d.all === Infinity ? Infinity : d.all + ((d.unit === d.all && d.unit !== 0) || gated ? 1 : 0);
  // RC_DBG=<id>,<id> prints the parts a row's turn is made of. This is how the five-row gap between
  // --ignition and --ignition-nogate turned out to be the readiness `+1` and not a residual: `all`
  // was identical under both arms and only `unit` moved.
  if (process.env.RC_DBG && process.env.RC_DBG.split(",").includes(e.id))
    console.error(`DBG ${e.id} all=${d.all} unit=${d.unit} gatedPayoff=${gated} pays=${pays} postUnits=${finalCosts.filter((c)=>c.gated&&c.unit).length} costs=${JSON.stringify(finalCosts.map((c)=>`${c.e}/${c.p}${c.unit?"U":""}${c.gated?"*":""}`))}`);
  const note = [usesBanned(e) && "BANNED in constructed", fuel && `fuel: + ${fuel}`,
                via && `payoff: + ${via}`].filter(Boolean).join("; ");
  // Baseline AND the printed identity both read the MERGED set: the deck you would actually build
  // is the closure, and 103.1.b is what caps it at two domains. `ownDomains` is kept only as the
  // fallback for a row that folds nothing.
  const merged = [...domainsOfSet(cards)];
  clock.push({ id: e.id, cls: e.class, pays, base: baselineTurn(merged), via: note || null,
               ordered: finalCosts.some((c) => c.after),
               domains: (merged.length ? merged : [...ownDomains]).sort().join("/") || "colourless" });
}

// --engines suppresses this section entirely rather than widening it. The hole sweep's POPULATION is
// the finisher classes by design (#203), its denominator is the finisher count, and printing engine
// rows against it would read "107 of 80" - a clean sweep is clean over its population, and mixing two
// populations under one denominator is the defect this project keeps paying for. Whether the ENGINE
// class should get its own answer sweep is a separate decision and is not made here.
if (!onlyTurns && !engines) {
  console.log(`# Unanswered holes: ${findings.length} of ${db.combos.filter((c) => FINISHER.has(c.class)).length} finishers`);
  console.log(`# gear-kill answer set: ${gearKills.length} base codes, domains ${[...new Set(gearKills.flatMap((g) => g.domains))].sort().join(" ")}`);
  console.log(`# gear-detach answer set: ${gearDetach.length} base codes swept, ${detachAnswers.length} enemy-facing (${detachAnswers.map((d) => `${d.base} ${d.name}`).join(", ") || "none"})\n`);
  for (const f of findings) for (const h of f.holes) console.log(`${f.e.class.padEnd(8)} ${f.e.id}\n         ${h.text}`);
}

if (engines) {
  // WHAT THIS NUMBER IS AND IS NOT. An engine's turn says when its card set is first payable, i.e.
  // the earliest it can be used. It does NOT say the engine is worth using, because an engine
  // produces a RATE and this measures none of it. So it is honest in ONE direction only: an engine
  // that cannot be assembled before the game is decided is worthless whatever its rate, and that is
  // the line below. Do not read it the other way round.
  const eng = clock.filter((c) => c.cls === "ENGINE");
  const late = eng.filter((c) => c.pays > c.base);
  const finite = eng.map((c) => c.pays).filter((n) => n !== Infinity).sort((a, b) => a - b);
  console.log(`\n# ENGINE deployment clock — the turn each engine's whole card set is first payable`);
  console.log(`# on a perfect curve. Same optimism as the finisher clock: perfect draws, nothing else`);
  console.log(`# cast, no interaction. HONEST IN ONE DIRECTION ONLY, see the note in the source.`);
  console.log(`# ${eng.length} ENGINEs; median T${finite[Math.floor(finite.length / 2)]}, mean T${(finite.reduce((a, b) => a + b, 0) / finite.length).toFixed(2)}`);
  console.log(`# ${late.length} of ${eng.length} (${((100 * late.length) / eng.length).toFixed(0)}%) are deployable only AFTER the do-nothing Hold curve wins in their identity`);
  const hist = new Map();
  for (const c of eng) hist.set(c.pays, (hist.get(c.pays) ?? 0) + 1);
  for (const t of [...hist.keys()].sort((a, b) => a - b))
    console.log(`  T${String(t).padStart(2)}  n=${String(hist.get(t)).padStart(3)}  ${"#".repeat(Math.round(hist.get(t) / 4))}`);
  console.log(`\n# the ${late.length} that arrive too late, slowest first:`);
  for (const c of late.sort((a, b) => b.pays - a.pays).slice(0, 25))
    console.log(`  T${String(c.pays).padStart(2)} vs T${c.base}  ${c.domains.padEnd(12)} ${c.id}`);
  if (late.length > 25) console.log(`  … and ${late.length - 25} more`);
  process.exit(0);
}

const slower = clock.filter((c) => c.pays > c.base);
const slowerContested = clock.filter((c) => c.pays > CONTESTED_BASELINE);
console.log(`\n# Turn clock (optimistic lower bound: perfect draws, nothing else cast, no interaction)`);
console.log(`# ${slower.length} of ${clock.length} finishers pay LATER than the UNOPPOSED Hold curve (both battlefields, 2/turn, T5-T6)`);
console.log(`# ${slowerContested.length} of ${clock.length} pay later than the CONTESTED curve (ONE battlefield, 1/turn, T9) — the board a finisher is FOR`);
// Non-vacuity, and the one number that says whether to trust a row: the greedy pass is the defect
// #205 removed, so any row priced by it is a row to re-derive by hand rather than quote - which is
// why it now NAMES them instead of counting them. A reader told "1 of 80" cannot act on it.
//
// It also stopped counting the wrong thing. `greedyFallbacks` counts every CALL, and the fold prices
// candidate closures that never become rows, so this line read "exact on 79 of 80 rows, greedy
// fallback on 1" while all 80 PUBLISHED rows were exact - understating its own result and sending a
// reader to re-derive a row that did not need it. The two counts are now reported separately.
console.log(`# allocator: exact on ${clock.length - greedyRows.length} of ${clock.length} rows, greedy fallback on ${greedyRows.length}` +
            `${greedyRows.length ? `: ${greedyRows.join(", ")} - re-derive ${greedyRows.length === 1 ? "that row" : "those rows"} by hand rather than quoting ${greedyRows.length === 1 ? "it" : "them"}, because the greedy pass IS the defect #205 removed` : ""}`);
if (greedyFallbacks !== greedyRows.length)
  console.log(`# NOTE ${greedyFallbacks - greedyRows.length} fallback${greedyFallbacks - greedyRows.length === 1 ? "" : "s"} priced a CANDIDATE closure while choosing a needs/produces fold, not a row above.` +
              `\n# Every published turn is still exact. Measured 2026-09-14: RC_GUARD=4000000 makes those prices exact too` +
              `\n# (~32s instead of ~0.4s) and the table is BYTE-IDENTICAL, so today it changes nothing - re-run that if the fold changes.`);
// Non-vacuity for the ordering model: the constraint can only ever bind on a row that HAS an [Equip]
// cost, so the size of that population is what makes "it moves nothing" a result rather than a shrug.
console.log(`# ordering ([Equip] after its own gear, 818.1 + 380): ${clock.filter((c) => c.ordered).length} of ${clock.length} rows carry a linked cost` +
            `${strictOrdering ? "; --strict-ordering IS ON, so this run also forbids the same turn and is NOT the rules model" : ""}`);
for (const cls of ["INFINITE", "BURST", "CHAIN", "ALT_WIN"]) {
  const all = clock.filter((c) => c.cls === cls);
  console.log(`#   ${cls.padEnd(9)} ${String(all.filter((c) => c.pays > c.base).length).padStart(2)} of ${String(all.length).padStart(2)} unopposed` +
              `   ${String(all.filter((c) => c.pays > CONTESTED_BASELINE).length).padStart(2)} of ${String(all.length).padStart(2)} contested`);
}
console.log();
for (const c of clock.sort((a, b) => b.pays - a.pays || a.id.localeCompare(b.id)))
  console.log(`  T${String(c.pays).padStart(2)} vs T${c.base} baseline  ${c.pays > c.base ? "SLOWER" : "      "}  ${c.cls.padEnd(8)} ${c.domains.padEnd(12)} ${c.id}${c.via ? `  [${c.via}]` : ""}`);

// ---------------------------------------------------------------- --emit-notables
// A player reading riftcombo.app never runs npm, so a hole only this script knows about is invisible
// to the only audience that matters. This writes the findings out as a corrections file in the shape
// the manager merges, so the script stays the source of truth and the entries still carry the
// warning. Generated prose is still prose: READ WHAT IT EMITS before handing it over.
if (emit) {
  const rows = [];
  for (const f of findings) {
    const { notables, unhandled } = notablesFor(f);
    // A hole with no notable is the #220 shape: detected and never explained. It used to produce a
    // correction row reading "append 0 notables", which is noise handed to whoever merges this.
    if (unhandled.length) console.error(`# WARNING ${f.e.id}: no notable is written for hole kind(s) ${unhandled.join(", ")} - it will be reported and never explained`);
    if (!notables.length) continue;
    rows.push({
      entry: f.e.id,
      action: `append ${notables.length} notable${notables.length > 1 ? "s" : ""} to prerequisites.notable`,
      why: `Generated by scripts/adversarial-check.mjs --emit-notables (issue #200, lane rc-synth). ${f.holes.map((h) => h.text).join("; ")}. ` +
           `Reviewed by hand before handing over; the headline answer is chosen by copy count, and the "answers" named ` +
           `are the unconditional enemy-facing subset rather than the whole swept set.`,
      notables_to_append: notables,
    });
  }
  // The JSON is the deliverable, but an empty array carries no context once it is extracted from the
  // report above it - and this mode HAS been empty every day since the last batch merged, for the same
  // dormancy that hid #220. So state the denominator on the same page as the payload.
  //
  // It does NOT get the [SPENT]/[INDETERMINATE] treatment the two corrections modes have, and the
  // difference is worth stating because it is easy to over-apply: --recheck-notables is a ONE-SHOT
  // repair whose 0 means "already applied", while an empty emit is a legitimate CLEAN result - every
  // finisher currently names its answer. The only reading that would be wrong here is an empty
  // POPULATION, so that is what is called out.
  const pop = db.combos.filter((c) => FINISHER.has(c.class)).length;
  console.log(`\n# --emit-notables: ${rows.length} correction row${rows.length === 1 ? "" : "s"} from ${findings.length} ` +
              `finding${findings.length === 1 ? "" : "s"} over ${pop} finishers` +
              `${pop ? (findings.length ? "" : " - every finisher names an answer, which is a CLEAN result and not a spent mode") : " [INDETERMINATE] - the finisher population is EMPTY, so this says nothing"}`);
  console.log(JSON.stringify(rows, null, 1));
}

// ---------------------------------------------------------------- --stalled
// THREE BOARD STATES, NOT TWO - the frame this pass needs and did not have until 2026-09-13.
//   hold BOTH battlefields : the free curve is 2 a turn and wins on T5-T6. No finisher is wanted.
//   hold ONE               : 1 a turn, 8 on T9 in every identity. THE ORDINARY GAME, and the board a
//                            finisher is actually for - including a Hold-gated one, which is at its
//                            BEST here (docs/plays/2026-09-13-the-entry-the-clock-condemned-hardest.md).
//   hold NONE              : only the ATTACK and CONQUER shapes live; a Hold payoff is off.
// "A stall" was being used for the third state while the buckets were read against the first, which
// is how a label came to say a Hold line dies to the very thing it is for.
//
// rc-manager5's third question: if a BURST earns its slot only where the Hold curve has STALLED,
// then the honest test is not "how many points" but "does this line still work after it has been
// stalled". What stalls the curve is an opponent taking or denying your battlefields - and that same
// opponent is the one with bodies on the board, which is the condition an attack trigger needs. So
// the shape to look for is a line that is DEAD on an empty board and ALIVE on a contested one.
//
// Classified from the pooled card text of each entry's own uses[], which is a MEASUREMENT of the
// printed text and not a reading of the entry's prose.
if (stalled) {
  // ATTACK-GATED is rigorous and rule-backed: 807.1.d makes being an attacker mean the unit "has
  // gained the Attacker designation during Combat", and 323.9 stages a Combat only "at each
  // Battlefield that Contested was applied to that have Units present controlled by opposing
  // players". No enemy garrison, no attack, no trigger. A line in this bucket is DEAD on an empty
  // board and ALIVE on a contested one, which is exactly the shape a finisher should have.
  const ATTACK = /when i attack|when you attack|win a combat|excess damage|attacking unit/i;
  // ENEMY-BODY is a FLAG, not a verdict. "enemy unit" also appears on removal and on modal spells
  // where the enemy mode is optional (Mesmerize), so this column says "read this one", never
  // "this needs a garrison".
  const ENEMY = /enemy unit/i;
  const HOLD = /when i hold|when you hold|hold here/i;
  // A BATTLEFIELD whose own scoring text reads "when you hold here" is the line's WIN CONDITION, and
  // 315.2.b.2 Holds only "all Battlefields they Control" - so such a line is Hold-gated WHATEVER ELSE
  // its cards or its steps mention. Without this, the conq-before-hold precedence below sent every
  // Grand Plaza and Reckoner's Arena line to CONQUER, because their authored steps all use the word
  // "conquer" (taking the battlefield in the first place, or the Arena's "activate the conquer
  // effects of units here"). That was 15 of 30 such finishers in the wrong bucket, and it understated
  // the HOLD bucket - the one that matters, because those are the lines a stall switches off - by the
  // same 15. Swept from card text rather than a typed list so it cannot go stale against a new set.
  const HOLD_HERE = /when you hold here/i;
  const CONQUER = /when i conquer|when you conquer|conquer here/i;
  // FIFTH BUCKET, added 2026-09-13 after rc-synth2 measured that INDEPENDENT was half wrong and its
  // LABEL overclaimed. It was the else branch of three regexes over hold/conquer/attack, with no
  // predicate for a LOCATION GATE at all - so four of its eight rows stood on `SFD-088 Renata Glasc,
  // Mastermind`, whose own printed text ends "Use my abilities only while I'm at a battlefield", and
  // 355.2.a makes that a battlefield you CONTROL, which is exactly what a stall takes away.
  //
  // Narrowed on purpose to an outright restriction on the CARD'S OWN abilities. 17 printings match
  // "while I'm at a battlefield"; 13 of those are static grants ("While I'm at a battlefield,
  // opponents can only play units to their base") which restrict nothing of their own, and
  // `UNL-049 Honeyfruit`'s gate is XP rather than a location. The four that remain are
  // OGN-068 Caitlyn Patrolling, SFD-088, UNL-026 Xerath Freed and UNL-160 Ultrasoft Poro.
  const LOCATION_GATE = /use (?:this|my) abilit(?:y|ies) only while i'?m at a battlefield/i;
  // A row that ALREADY has a hold, conquer or attack gate keeps it and gets this as a RIDER. Putting
  // LOCATION_GATE earlier in the chain moved `ivern-svellsongur-four-tags-hold` out of HOLD, which is
  // the precedence error this project already paid for once: a classifier that assigns ONE bucket to a
  // MIXED object is wrong in whichever direction its order leans, so the order is the thing to audit
  // and a genuinely two-legged row is named on both.
  const gateRider = (e, text) => {
    if (!LOCATION_GATE.test(text)) return "";
    const who = (e.uses || [])
      .map((u) => byBase.get(u.card))
      .filter((x) => x && LOCATION_GATE.test(`${x.text || ""} ${x.effect || ""}`))
      .map((x) => x.name);
    return `  [+ LOCATION-GATED: ${who.join(", ")} works only at a battlefield]`;
  };
  const buckets = { attack: [], conquer: [], hold: [], located: [], independent: [] };
  for (const e of db.combos) {
    if (!FINISHER.has(e.class)) continue;
    let text = "";
    let holdPayoff = null;
    const why = [];
    for (const u of e.uses || []) {
      const c = byBase.get(u.card);
      if (!c) continue;
      const t = `${c.text || ""} ${c.effect || ""}`;
      text += ` ${t}`;
      const m = t.match(ATTACK);
      if (m) why.push(`${c.name}: "${m[0]}"`);
      if ((c.type || []).includes("battlefield") && HOLD_HERE.test(t)) holdPayoff = c.name;
    }
    const flag = !why.length && ENEMY.test(text) ? "  [FLAG: names an enemy unit - read it]" : "";
    // Card text alone under-reads the Conquer and Hold buckets: an entry can SCORE on a Conquer
    // without any of its cards printing the word, because the Conquer is the game's own scoring
    // mechanism (469.1) rather than a card ability. time-warp-hold-burst and
    // yasuo-windrider-ride-the-wind-chain are both that shape. So fall back to the entry's own
    // authored steps, and SAY which signal was used.
    const prose = `${(e.steps || []).join(" ")} ${e.terminatesIn || ""}`;
    const src = (re) => (re.test(text) ? "cards" : re.test(prose) ? "steps" : null);
    const conq = src(CONQUER) || (/\bconquer/i.test(prose) ? "steps" : null);
    const hold = src(HOLD) || (/\bhold(s|ing)?\b/i.test(prose) ? "steps" : null);
    const tag = (k) => (k === "cards" ? "" : `  [via the entry's own steps, not card text]`);
    const row = `${e.class.padEnd(8)} ${e.id}${why.length ? `  <- ${why.join("; ")}` : flag}`;
    if (holdPayoff) {
      // Show the other signal rather than hiding it: a few of these genuinely carry a second,
      // non-Hold scoring leg by design (ivern-arena-draven-chaos-order-chain wins a combat for its
      // eighth; trinity-skyfall-arena-second-battlefield-chain Conquers the other battlefield), and
      // a reader has to be able to see that without re-deriving it.
      const also = why.length ? "  [+ an attack leg too - read it]" : conq ? "  [+ a conquer leg too - read it]" : "";
      buckets.hold.push(`${e.class.padEnd(8)} ${e.id}  <- payoff is ${holdPayoff}, "when you hold here"${also}`);
    } else if (why.length) buckets.attack.push(row + gateRider(e, text));
    else if (conq) buckets.conquer.push(row + tag(conq) + gateRider(e, text));
    else if (hold) buckets.hold.push(row + tag(hold) + gateRider(e, text));
    else if (LOCATION_GATE.test(text)) buckets.located.push(`${e.class.padEnd(8)} ${e.id}${gateRider(e, text)}`);
    else buckets.independent.push(row);
  }
  const n = Object.values(buckets).reduce((a2, b2) => a2 + b2.length, 0);
  console.log(`\n# Stalled-board classification of all ${n} finishers.`);
  console.log(`# FIRST PASS, from the printed text of each entry's own uses[] - a measurement of the cards, not a`);
  console.log(`# verdict on the entry. The matched phrase is shown so a reader refutes it in one look.`);
  const label = {
    attack: "ALIVE WHERE THE CURVE STALLS. The printed text needs the Attacker designation, which 807.1.d and 323.9 make impossible without an enemy garrison. Dead on an empty board, alive on a contested one - the shape a finisher should have.",
    conquer: "SURVIVES A STALL. Scores on a Conquer, and a battlefield the opponent took is a Conquer target, so the stall does not switch it off.",
    hold: "NEEDS ONE BATTLEFIELD, AND IS AT ITS BEST WITH EXACTLY ONE. Scores on a Hold, which needs a battlefield you ALREADY control. There are THREE board states and this bucket only dies on the third: hold BOTH and the free curve wins on T5-T6 without you, so the line is redundant; hold ONE and the free curve pays 1 a turn and does not reach 8 until T9, which is where a Hold finisher is worth its slot; hold NONE and it is switched off. The earlier label said 'the stall that makes this line necessary is the same stall that switches it off', which is true of a TOTAL stall and false of the ordinary contested game.",
    located: "LOCATION-GATED. The card's OWN abilities are switched off unless it stands at a battlefield, and 355.2.a makes that one you CONTROL - so a stall takes it away exactly as it takes away a Hold. These read as board-independent to a hold/conquer/attack predicate and are not.",
    independent: "BOARD-INDEPENDENT. No Hold, no Conquer and no attack in the printed text, so nothing about the board switches it off.",
  };
  for (const k of ["attack", "conquer", "hold", "located", "independent"]) {
    console.log(`\n## ${k.toUpperCase()}  (${buckets[k].length})\n   ${label[k]}\n`);
    for (const r of buckets[k].sort()) console.log(`     ${r}`);
  }
}


// ---------------------------------------------------------------- --recheck-notables
// --emit-notables only ever ADDS a notable to an entry that has no answer at all, so once a batch has
// been merged it goes quiet - and that is exactly when a shipped notable can turn out to be WRONG.
// It did on 2026-09-12: 14 entries carry a sentence saying no answer reaches their scoring window,
// measured with a KILL predicate that structurally could not see SFD-011 Angle Shot, a [Reaction]
// DETACH. Rather than 14 hand edits, this mode finds the stale sentence and emits a replacement row
// per entry. It matches on the sentence, not on an index, because indices shift when another lane
// edits an entry - the index is reported for the applier to CHECK, never to trust.
const STALE = "NO GEAR KILL IN THE POOL CARRIES [Reaction], WHICH IS WHAT KEEPS THIS LINE ALIVE";
if (recheck) {
  const rows = [];
  for (const e of db.combos) {
    const notables = (e.prerequisites && e.prerequisites.notable) || [];
    const at = notables.findIndex((n) => n.includes(STALE));
    if (at < 0) continue;
    rows.push({
      entry: e.id,
      action: "replace one notable in prerequisites.notable",
      notable_index: at,
      match_contains: STALE,
      why:
        "The shipped sentence measured the ANSWER SET correctly and asked a NARROWER question than it stated: its " +
        "predicate was /\\bkills?\\b[^.]{0,80}\\bgear\\b/i, so it could not see the detach family at all. " +
        "SFD-011 Angle Shot is Fury, 2 Energy, no Power, [Reaction], and answers an equipped body WITHOUT killing " +
        "anything. Found by the 500-829 lane, 2026-09-12. The replacement keeps the kill finding (true, and now " +
        "scoped to kills), names the one enemy-facing detacher, and flags as UNWALKED whether a detach inside the " +
        "scoring window accomplishes anything - 383.2.a.1 measures a Trigger Condition when the trigger is PLACED.",
      replacement: REACTION_NOTABLE,
    });
  }
  // A file, not stdout: the report sections above would otherwise be interleaved with the JSON, and
  // the manager applies a FILE. --out overrides the default path.
  const out = outPath("recheck");
  writeFileSync(out, JSON.stringify(rows, null, 1) + "\n");
  // A 0 FROM THIS MODE IS NOT A RESULT UNTIL YOU KNOW WHICH 0 IT IS. That is #220's lesson one level
  // up - a detector with no known positive cannot tell "nothing is wrong" from "I am not looking" -
  // and this mode is a ONE-SHOT repair, so it will print 0 forever once it has run. The positive
  // evidence is the replacement it installs, so count that too and name the three states apart. The
  // needle is sliced from REACTION_NOTABLE rather than retyped, because a hardcoded copy of a string
  // that lives three hundred lines away is the drift this file spent #220 on.
  // Each state prints ONE stable token - [SPENT] or [INDETERMINATE] - so a reader greps for the token
  // and the prose beside it stays free to be reworded. Matching on the prose is the thing #220 was.
  const LANDED = REACTION_NOTABLE.slice(0, 80);
  const landed = db.combos.filter((e) => (((e.prerequisites || {}).notable) || []).some((n) => n.includes(LANDED))).length;
  if (rows.length) {
    console.log(`\n# --recheck-notables: ${rows.length} entries carry the stale sentence -> ${out}`);
  } else if (landed) {
    console.log(`\n# --recheck-notables: 0 stale [SPENT] - Verified 2026-09-14 over ${db.combos.length} entries.`);
    console.log(`# Not silent: the ${landed} entries this mode targeted now carry its replacement, which is POSITIVE`);
    console.log(`# evidence and not an absence. Do NOT read this 0 as "the catalogue is clean" - it means only that`);
    console.log(`# this one repair landed. -> ${out} (empty)`);
  } else {
    console.log(`\n# --recheck-notables: 0 stale [INDETERMINATE] - and 0 replaced, so NEITHER the defect nor its`);
    console.log(`# repair is in the catalogue. This 0 is evidence of NOTHING: something changed underneath this`);
    console.log(`# mode and the needle should be re-derived before anyone trusts it. -> ${out} (empty)`);
  }
}


// ---------------------------------------------------------------- --holds
// The HOLD bucket is 46 of 76 finishers and every one is switched off by the same class of event:
// the opponent making you not control the battlefield at your Beginning Phase. This mode asks, per
// entry, what the CHEAPEST card in the pool that does it actually is - the same question the gear
// pass asked of attached Equipment, at four times the size.
if (holds) {
  const massAnswers = sweepMassAnswers(cards);
  const protection = sweepGarrisonProtection(cards);
  const scaling = new Set(selfScaling(cards).map((c) => c.base));
  const holdIds = new Set();
  for (const e of db.combos) {
    if (!FINISHER.has(e.class)) continue;
    const t = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean)
      .map((c) => `${c.text || ""} ${c.effect || ""}`).join(" ");
    const isHoldBf = (e.uses || []).some((u) => {
      const c = byBase.get(u.card);
      return c && (c.type || []).includes("battlefield") && /when you hold here/i.test(`${c.text || ""} ${c.effect || ""}`);
    });
    if (isHoldBf || /when i hold|when you hold/i.test(t)) holdIds.add(e.id);
  }
  const rows = [];
  for (const e of db.combos) {
    if (!holdIds.has(e.id)) continue;
    const used = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean);
    const domains = new Set(); for (const c of used) for (const d of c.domains || []) domains.add(d);
    const prose = `${(e.steps || []).join(" ")} ${(e.prerequisites?.notable || []).join(" ")} ${e.terminatesIn || ""}`;
    // garrison Might floor: printed units in uses[], PLUS token bodies named in the entry's own prose
    const printed = used.filter((c) => (c.type || []).includes("unit") && c.might !== null && !scaling.has(c.base)).map((c) => c.might);
    const scaled = used.filter((c) => scaling.has(c.base)).map((c) => c.name);
    const toks = Object.keys(TOKEN_MIGHT).filter((k) => new RegExp(`\\b${k}`, "i").test(prose));
    const floorCands = [...printed, ...toks.map((k) => TOKEN_MIGHT[k])];
    const floor = floorCands.length ? Math.min(...floorCands) : null;
    const blob = JSON.stringify(e);
    // A self-scaling body makes the PRINTED floor meaningless, so do not name an answer off it. This
    // is the exact defect this mode was built after: a notable reading "ONE ENERGY ANSWERS THE
    // MIGHT-1 BODY THIS LINE NEEDS (Spiderling (M1))" shipped on spiderling-swarm-grand-plaza, where
    // the seven bodies The Grand Plaza requires are M7 each, because Spiderling reads "I have +1
    // Might for each other unit you control here with my name". Reporting no answer is correct here;
    // asserting the cheapest one is how the false notable happened.
    const cheapest = floor === null || scaled.length ? null : massAnswers.find((a) => a.dmg >= Math.max(floor, 1));
    const named = cheapest ? blob.includes(cheapest.base) || blob.includes(cheapest.name) : false;
    // Which protections this deck may ACTUALLY run. Three corrections over a naive domain test:
    //  - 103.1.b is a subset test against a legend's TWO domains, so the right question is whether
    //    the UNION of the entry's domains and the protection's is still <= 2 - not whether the
    //    protection sits inside what the entry already uses.
    //  - a BATTLEFIELD protection is unavailable to any line that already requires a battlefield:
    //    485.4.a gives each player three and "Only 1 will be used, chosen during setup", 485.5 makes
    //    that selection random, and 103.4.c forbids duplicate names. Two of your own battlefields
    //    never share a board, so OGN-294 Trifarian War Camp can never stand beside The Grand Plaza.
    //  - fold by NAME, because a protection printed twice is one card (103.2.b caps by name).
    const needsBattlefield = used.some((c) => (c.type || []).includes("battlefield"));
    const seenName = new Set();
    const prot = protection.filter((x) => {
      const card = byBase.get(x.base);
      if (needsBattlefield && (card?.type || []).includes("battlefield")) return false;
      if ((card?.type || []).includes("battlefield") && !(x.domains || []).length && /token/i.test(x.name)) return false;
      const union = new Set([...domains, ...(x.domains || [])]);
      if (union.size > 2) return false;
      if (seenName.has(x.name)) return false;
      seenName.add(x.name);
      return true;
    });
    rows.push({ id: e.id, cls: e.class, identity: [...domains].sort().join("/") || "colourless",
      floor, tokens: toks, scaled, cheapest, named,
      protection: prot.map((x) => {
        const scope = /token/i.test(x.clause) ? " [TOKEN bodies only]" : /Mechs/i.test(x.clause) ? " [MECH bodies only]" : /units here/i.test(x.clause) ? " [that battlefield only]" : "";
        return `${x.base} ${x.name} +${x.plus}${scope}`;
      }) });
  }
  console.log(`\n# --holds: ${rows.length} finishers whose scoring payoff is a Hold.`);
  console.log("# Garrison Might FLOOR is read from uses[] printed Might AND from token bodies named in the");
  console.log("# entry's own prose (rule 187), because no entry names a token base code. The token half is a");
  console.log("# TEXT SCAN of the entry's prose, so it is a FLAG that says read it, never a verdict.");
  console.log(`# Mass answers swept: ${massAnswers.length}. Garrison-wide protections swept: ${protection.length}.\n`);
  const unanswered = [];
  for (const r of rows.sort((a, b) => (a.floor ?? 99) - (b.floor ?? 99))) {
    const sc = r.scaled.length ? `  [SELF-SCALING: ${r.scaled.join(", ")} - printed Might understates it, read the entry]` : "";
    const ans = r.cheapest
      ? `${r.cheapest.base} ${r.cheapest.name} E${r.cheapest.e}/P${r.cheapest.p} dmg${r.cheapest.dmg === Infinity ? "-kill" : r.cheapest.dmg}`
      : r.scaled.length
        ? "NOT COMPUTABLE from printed Might - this line's bodies scale with the garrison"
        : "no swept mass answer reaches it";
    console.log(`${r.cls.padEnd(8)} ${r.identity.padEnd(12)} floor M${r.floor ?? "?"}  ${r.id}`);
    console.log(`     cheapest answer: ${ans}${!r.cheapest ? "" : r.named ? "  [entry names it]" : "  <- NOT NAMED"}${sc}`);
    if (r.protection.length) console.log(`     identity HOLDS a protection: ${r.protection.slice(0, 3).join("; ")}`);
    if (r.cheapest && !r.named) unanswered.push(r);
  }
  console.log(`\n# ${unanswered.length} of ${rows.length} do not name the cheapest card that answers them.`);
}


// ---------------------------------------------------------------- --holds-notables
// Corrections for the HOLD bucket, in the shape the manager merges. Two kinds, because the pass found
// both a missing warning and a WRONG one already shipped.
if (holdNotables) {
  const massAnswers = sweepMassAnswers(cards);
  const protection = sweepGarrisonProtection(cards);
  const scaling = new Set(selfScaling(cards).map((c) => c.base));
  const TIMING =
    "WHEN THE ANSWER LANDS, AND IT IS NOT INSIDE THE HOLD. A Hold resolves at 315.2.b.2, which Holds " +
    "\"all Battlefields they Control\", inside YOUR Beginning Phase - and 312.2.a gives a player priority " +
    "only \"When the turn is in a Neutral Open State during their Main Phase\", i.e. their own. So the " +
    "opponent cannot answer in the Hold window itself; they answer on THEIR turn, which is the turn " +
    "immediately before it. The cost of that is yours, not theirs: your own Main Phase comes AFTER your " +
    "Beginning Phase (315 then 316), so there is no window in which to rebuild the garrison. Holding up " +
    "a [Reaction] on their turn is the only response this line has.";
  // Hoisted so the "did this land" count below derives from the sentence itself rather than a retyped
  // copy of it - the same reason the recheck mode slices its needle out of REACTION_NOTABLE.
  const HOLDS_REPLACEMENT_HEAD = "THE CHEAPEST ANSWER IS A SINGLE KILL, NOT A SWEEPER, AND OGN-133 FLURRY OF BLADES DOES NOT TOUCH THIS LINE.";
  const rows = [];
  for (const e of db.combos) {
    if (!FINISHER.has(e.class)) continue;
    const used = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean);
    const isHoldBf = used.some((c) => (c.type || []).includes("battlefield") && /when you hold here/i.test(`${c.text || ""} ${c.effect || ""}`));
    const t = used.map((c) => `${c.text || ""} ${c.effect || ""}`).join(" ");
    if (!isHoldBf && !/when i hold|when you hold/i.test(t)) continue;
    const domains = new Set(); for (const c of used) for (const d of c.domains || []) domains.add(d);
    const prose = `${(e.steps || []).join(" ")} ${(e.prerequisites?.notable || []).join(" ")} ${e.terminatesIn || ""}`;
    const scaled = used.filter((c) => scaling.has(c.base));
    const blob = JSON.stringify(e);

    // (1) a WRONG shipped notable: printed Might was used on a body whose own text scales it.
    if (scaled.length) {
      const notables = (e.prerequisites && e.prerequisites.notable) || [];
      const at = notables.findIndex((n) => /ANSWERS THE MIGHT-1 BODY/i.test(n));
      if (at >= 0) {
        const sc = scaled[0];
        const clause = (`${sc.text || ""} ${sc.effect || ""}`).match(/I have \+\d+ :rb_might: for each[^.]*/i)[0];
        rows.push({
          entry: e.id,
          action: "REPLACE one notable in prerequisites.notable - the shipped sentence is FALSE",
          notable_index: at,
          match_contains: "ANSWERS THE MIGHT-1 BODY",
          why: `${sc.name} is printed Might ${sc.might} but reads "${clause}". This entry stands ${e.uses.find((u) => u.card === sc.base).quantity} of them at one battlefield, so each sees the others and none is a Might-1 body. The shipped notable tells a player that 1 Energy answers the line, and it does not.`,
          replacement:
            `${HOLDS_REPLACEMENT_HEAD} ` +
            `${sc.name} reads "${clause}", so the seven bodies The Grand Plaza requires are Might 7 each and 1 damage kills none of them - ` +
            `143.2.a kills on marked damage at or above Might and 142.4.b defines Lethal Damage as "a non-zero amount greater than or equal to that Unit's Might". ` +
            `What answers it instead is ONE removal spell, because the Plaza reads "if you have 7+ units here" and this board is exactly seven: OGN-229 Vengeance (Order, 4 Energy + 2 Power, "Kill a unit.") is the pool's only single-target kill with neither a location clause nor any other gate. ` +
            `The mass answers that reach Might 7 are far dearer - OGN-123 Unchecked Power (Mind, 7 Energy + 2 Power, 12 damage) and UNL-180 The Ruination (Order, 9 Energy + 3 Power); OGN-159 Warwick, Hunter kills only units already DAMAGED and only on an attack, so it is not one. ` +
            `AND THE LINE'S OWN ANSWER IS UNIQUE IN THE POOL: swept over every card, ${sc.name} is the ONLY one that overrides 103.2.b's "up to 3 copies of the same named card", printing "Your deck can have any number of cards named Spiderling" - so going to eight or more both gives the Plaza slack against one removal AND raises every body's Might again. ` +
            TIMING,
        });
        continue;
      }
    }

    // (2) a MISSING warning: the garrison's Might floor comes from TOKENS, which uses[] cannot see.
    const printed = used.filter((c) => (c.type || []).includes("unit") && c.might !== null && !scaling.has(c.base)).map((c) => c.might);
    const toks = Object.keys(TOKEN_MIGHT).filter((k) => new RegExp(`\\b${k}`, "i").test(prose));
    const cands = [...printed, ...toks.map((k) => TOKEN_MIGHT[k])];
    if (!cands.length || scaled.length) continue;
    const floor = Math.min(...cands);
    // Did a TOKEN set the floor, or a printed unit? The headline says "the bodies are tokens" and it
    // must only say so when that is true - the token half is the reason uses[] cannot see the body.
    const tokenFloor = toks.length > 0 && Math.min(...toks.map((k) => TOKEN_MIGHT[k])) === floor;
    // Rank by what the opponent actually pays to clear THIS floor, and prefer an answer any deck may
    // run: a Signature answer forces the opponent's legend (103.2.d.2), so it is reported separately
    // rather than as the headline.
    const reaches = (a) => a.scalable || a.kills || a.dmg >= Math.max(floor, 1);
    const priceFor = (a) => a.e + (a.scalable ? Math.max(floor, 1) : a.p);
    const usable = massAnswers.filter(reaches).sort((x, y) => priceFor(x) - priceFor(y));
    const answer = usable.find((a) => !a.signature) || null;
    const sigAnswer = usable.find((a) => a.signature) || null;
    if (!answer) continue;
    if (blob.includes(answer.base) || blob.includes(answer.name)) continue;
    const acard = byBase.get(answer.base);
    const atext = (`${acard.text || ""} ${acard.effect || ""}`).replace(/\s+/g, " ").trim();
    const prot = [];
    const seenName = new Set();
    const needsBf = used.some((c) => (c.type || []).includes("battlefield"));
    for (const x of protection) {
      const card = byBase.get(x.base);
      if (needsBf && (card?.type || []).includes("battlefield")) continue;
      if (new Set([...domains, ...(x.domains || [])]).size > 2) continue;
      if (seenName.has(x.name)) continue;
      seenName.add(x.name); prot.push(x);
    }
    const scope = (x) => (/token/i.test(x.clause) ? " (token bodies only)" : /Mechs/i.test(x.clause) ? " (Mech bodies only)" : /units here/i.test(x.clause) ? " (that battlefield only)" : "");
    rows.push({
      entry: e.id,
      action: "append one notable to prerequisites.notable",
      why: `Garrison Might floor is ${floor}${toks.length ? ` (token bodies: ${toks.join(", ")}, rule 187)` : ""}, and the entry never names ${answer.base} ${answer.name}.`,
      notables_to_append: [
        `${answer.e} ENERGY ANSWERS THE GARRISON THIS LINE NEEDS${tokenFloor ? ", AND THE BODIES ARE TOKENS SO NO uses[] ROW SHOWS IT" : ""}. ` +
        `${answer.base} ${answer.name} is ${(acard.domains || []).join("+")}, ${answer.e} Energy${answer.p ? ` + ${answer.p} Power` : ""}: "${atext}". ` +
        (tokenFloor ? `This line's garrison is ${toks.join(" and ")} tokens, whose Might is fixed by rule 187 (${toks.map((k) => `${k} ${TOKEN_MIGHT[k]}`).join(", ")}) rather than by any card in uses[] - which is why no ingredient row warns you. ` : "") +
        `143.2.a kills on marked damage at or above Might, so it kills every body at or below Might ${answer.dmg} SIMULTANEOUSLY however many there are: the binding constraint is MIGHT PER BODY, not the number of bodies, so going wider answers nothing. ` +
        (sigAnswer && sigAnswer.e + Math.max(floor, 1) < answer.e + answer.p
          ? `A CHEAPER ANSWER EXISTS AND IT IS NOT AVAILABLE TO EVERY OPPONENT: ${sigAnswer.base} ${sigAnswer.name} costs ${sigAnswer.e} Energy + ${Math.max(floor, 1)} Power here${sigAnswer.scalable ? " (it pays per point of damage, so it scales to any garrison)" : ""}${sigAnswer.action ? " and is [Action], so 806.1.c.1 puts it inside any showdown on any player's turn" : ""} - but it is a SIGNATURE card tagged ${sigAnswer.tag}, and 103.2.d.2 requires every Signature card to carry the Chosen Champion Legend's tag, so only a ${sigAnswer.tag} legend can run it. Count it as a matchup, not as the field. `
          : "") +
        (prot.length
          ? `THE IDENTITY DOES HOLD AN ANSWER: ${prot.slice(0, 3).map((x) => `${x.base} ${x.name} +${x.plus}${scope(x)}`).join(", ")} - a permanent, garrison-wide +Might is the only thing that lifts every body at once, since a single-target pump is useless against a sweep that hits all of them. ` +
            (needsBf
              ? `(A battlefield-based protection is NOT available here, because this line already requires a battlefield: 485.4.a gives each player three and "Only 1 will be used, chosen during setup", and 103.4.c forbids duplicate names, so two of your own battlefields never share a board.) `
              : prot.some((x) => (byBase.get(x.base)?.type || []).includes("battlefield"))
                ? `(A battlefield protection is a 1-in-3: 485.5 has each player "randomly select one (1) of their three (3) Battlefields", so it is not a card you can count on drawing.) `
                : "")
          : `THE IDENTITY HOLDS NO ANSWER: swept for a permanent, garrison-wide +Might legal beside this line under 103.1.b, there is none, so this line cannot be protected and can only be rebuilt. `) +
        TIMING,
      ],
    });
  }
  const out2 = outPath("holds");
  writeFileSync(out2, JSON.stringify(rows, null, 1) + "\n");
  const repl = rows.filter((r) => r.action.startsWith("REPLACE")).length;
  console.log(`\n# --holds-notables: ${rows.length} corrections (${repl} REPLACE a false shipped sentence, ${rows.length - repl} append a missing one) -> ${out2}`);
  // THIS MODE HAS TWO HALVES AND THEY ARE IN DIFFERENT STATES, which a single row count hides. The
  // REPLACE half is a one-shot repair like --recheck-notables and goes quiet once applied; the APPEND
  // half is a standing sweep and stays live. Say which is which, for the same reason as above: a 0
  // that cannot explain itself is indistinguishable from a broken predicate.
  if (!repl) {
    const landed = db.combos.filter((e) => (((e.prerequisites || {}).notable) || []).some((n) => n.includes(HOLDS_REPLACEMENT_HEAD))).length;
    console.log(landed
      ? `# The REPLACE half is [SPENT]: ${landed} ${landed === 1 ? "entry carries" : "entries carry"} its replacement. Its gate needs a\n` +
        `# body whose own text scales its Might, and that repair landed. Verified 2026-09-14.`
      : `# The REPLACE half is [INDETERMINATE]: it found nothing AND its replacement is nowhere in the\n` +
        `# catalogue, so its 0 is evidence of NOTHING - re-derive the gate before trusting it.`);
  }
}

if (strict && findings.length) process.exit(1);
