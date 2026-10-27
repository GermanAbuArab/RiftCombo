// Adversarial check over every finisher in the catalogue (issue #200, lane rc-synth).
//
//   node scripts/adversarial-check.mjs            report everything
//   node scripts/adversarial-check.mjs --strict   exit 1 if any finisher has an unanswered hole
//   node scripts/adversarial-check.mjs --turns    only the turn-clock section
//   node scripts/adversarial-check.mjs --engines  when the ENGINE class is deployable, and only that
//   node scripts/adversarial-check.mjs --recheck-notables   corrections that REPLACE a stale shipped notable
//   node scripts/adversarial-check.mjs --selftest-holes    the hole sweep + notable emitter, on synthetic entries
//   node scripts/adversarial-check.mjs --selftest-garrison the garrison Might floor, on real entries with hand-derived answers
//   node scripts/adversarial-check.mjs --selftest-answer   which answer the Hold modes name, incl. a counterfactual pool
//   node scripts/adversarial-check.mjs --selftest-bodies   the anyBodies price against the baseline's cheap-body identities
//   node scripts/adversarial-check.mjs --recheck-garrison  garrison notables that no longer match their board
//   node scripts/adversarial-check.mjs --price B:Q,B:Q      the turn clock on a card set that is not an entry
//                                       [--bodies N]       ... plus N anyBodies bodies in the set's identity (#517)
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
//      between them, and they AGREE on 75 of 80 rows. [2026-10-13: 80 of 85.] A card that queues a turn (Time Warp, #339) stays gated in BOTH arms, so for that card
//      the lower arm is not a relaxation. Measured 2026-10-13: lifting the gate on it as well moves
//      exactly two rows, bottled-constellation-time-warp and time-warp-hold-burst, from T4 gated to
//      T2. The gated T4 stands on a necessary condition: a Warp bought before ignition pays its
//      printed E10, and 10 runes on the board is T5 at the earliest (2 a turn from T1), so on a row
//      that completes by T4 every Warp is bought with the engine's output and gating it is exact.
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
//      the empty-deck requirement as a caveat with no number behind it. [2026-10-13, #339: three of
//      them print T4 now - bottled-constellation-time-warp, grand-plaza-loop-time-warp and
//      time-warp-hold-burst - because the Time Warp they buy with the engine's output queues an
//      Additional Turn, which supplies the Beginning Phase their payoff needs. The floor is unchanged.]
//
//      ADDS AND ADDITIONAL TURNS ARE MODELLED AS OF 2026-10-13 (#339). The table charged every Time
//      Warp to the rune curve on its own clock turn and priced no Add, so
//      power-nexus-sentinel-renata-time-warp-chain printed T11 against a hand walk of T6. Now a
//      card that queues a turn runs that turn INSIDE the clock turn (its own channel and Awaken, no
//      step on the clock), and a hold-Adder paid on an earlier turn pays Power out of the rainbow it
//      Adds. Both are read from card text in curveOf. Twelve finisher rows and three ENGINEs moved,
//      every one EARLIER, and the unopposed headline went 42 -> 36 of 85. The Add is optimistic in the
//      clock's usual way: every holder holds, at one battlefield, from the turn after it lands. The
//      table still prices no payoff activation, so the bare power-nexus-sentinel-three-time-warps
//      reads T6 against its walk's T7: the walk's extra turn is the sixteen Nexus recycles.
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
//
//      `anyBodies` IS PRICED AS OF 2026-10-27 (#494), and until then the field was charged nothing:
//      `up-from-the-deep-flow-grand-plaza` read T3 on Up from the Deep alone against a hand price of
//      T4. Each body is the cheapest unit the row's own identity plays (BODY_PRICE), on the same cost
//      path as a named unit, in costsOfSet - and the closure and consumer searches pass it too, which
//      is the half #205 forgot. Two finishers moved, both T3 -> T4, and sixteen ENGINEs, all later.
//      Since #517 a body is chosen among the identity's candidates (BODY_CANDIDATES: the cheapest, and
//      the dearer units that can land ready) by `priceSet`, every mix of them, and it moved no row.
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
// is costing something and the row needs a hand walk. The one exception to "drops the gate": a card
// that queues a turn stays gated in both arms (#339), and the header's sandwich note gives the two
// rows that exception holds back (T4 gated, T2 without it) and why their T4 is the true one.
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
const LEGEND_TAGS = new Set();
function sweepMassAnswers(cards) {
  for (const c of cards) if ((c.type || []).includes("legend")) for (const x of c.tags || []) LEGEND_TAGS.add(x);
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
      // DOES IT HIT THE CASTER TOO? Four of the seven sweep ALL units and three say "enemy units", and
      // that decides whether an opponent will actually cast it - OGN-123 Unchecked Power kills their
      // own board for 7 Energy. The EQUIPMENT arm already draws this conclusion about Thermo Beam
      // ("symmetric, which makes it cheap for a gearless deck and expensive for anyone else"); the
      // garrison arm quoted the text and left the reader to notice.
      enemyOnly: /\benemy units?\b/i.test(t),
      dmg: scalable ? Infinity : m ? +m[1] : Infinity, scalable, signature: !!c.signature,
      // THE CHAMPION TAG, not merely the first tag. 103.2.d.2 binds a Signature card to the legend
      // carrying its CHAMPION tag, and a card's tag array also holds regions and types - measured, 7 of
      // the 51 Signature names have a first tag of Equipment, Ionia or Shadow Isles, which no legend
      // carries. Taking tags[0] would name the wrong tag and then conclude "no legend carries it", i.e.
      // print DEAD LETTER about a perfectly legal card. Only Bullet Time is a Signature ANSWER today, and
      // its single tag is a champion's - so this is latent, and it is the same latency the equipment
      // arm's copy count had. Prefer a tag some legend actually carries; fall back to the first.
      tag: (c.tags || []).find((x) => LEGEND_TAGS.has(x)) || (c.tags || [])[0] || null, kills: !m && !scalable,
      reaction: /\[Reaction\]/i.test(t), action: /\[Action\]/i.test(t),
      enemyOnly: /to all enemy units/i.test(t) });
  }
  return out.sort((a, b) => a.dmg - b.dmg || a.e + a.p - (b.e + b.p));
}

/**
 * WHICH ANSWER TO NAME, ONCE, FOR BOTH HOLD ARMS. `--holds` and `--holds-notables` each picked their
 * own and they AGREED BY COINCIDENCE, which is the two-consumers-of-one-producer family this script
 * has already paid for twice.
 *
 * `sweepMassAnswers` returns the array sorted by DAMAGE, so `--holds` took the first reaching card in
 * damage order and printed it as the "cheapest answer". It is not: measured 2026-09-14, on 23 of the
 * 37 rows with a computable floor the price-order cheapest is a DIFFERENT card (`OGN-268 Bullet Time`
 * at 5 against `OGN-123 Unchecked Power` at 9). The notables arm sorted by price and split Signature
 * off; `--holds` did neither.
 *
 * AND THE CARD IT NAMED WAS RIGHT ANYWAY, ON ALL 37 - which is why nothing caught it and why the
 * repair is worth stating rather than just making. Bullet Time is Signature, so it is not the answer a
 * reader wants (103.2.d.2 binds a Signature card to the legend carrying its champion tag, so naming
 * one as THE answer claims an availability every opponent does not have). Against the right
 * comparand - the cheapest NON-Signature answer - damage order and price order agree 37 of 37, because
 * the four non-Signature answers happen to rank the same way on both axes.
 *
 * THE COINCIDENCE IS THREE POINTS OF COST WIDE, and that is the number that locates it. `OGS-018
 * Tibbers` IS a non-scalable Signature answer at dmg 3; it loses the dmg-3 tie to `OGS-002 Firestorm`
 * only on the cost tiebreak, E8+P2 against E6+P1. Reprice Tibbers to E4/P0 - changing nothing else -
 * and the old `--holds` names a Signature card on SIX rows, none of which name it, so the emitter
 * would then have written that claim into `data/combos.json`. `--selftest-answer` runs exactly that
 * counterfactual, which is the one shape the coincidence cannot save.
 *
 * `reaches` spells out `scalable` and `kills` although `dmg` is already Infinity for both: the two
 * arms differed there in FORM and not in behaviour, and a reader should not have to know the Infinity
 * encoding to see that they now agree.
 */
function answersFor(massAnswers, floor) {
  const need = Math.max(floor, 1);
  const reaches = (a) => a.scalable || a.kills || a.dmg >= need;
  // A scalable answer pays PER POINT of damage, so its price depends on the floor it has to clear.
  const priceFor = (a) => a.e + (a.scalable ? need : a.p);
  const usable = massAnswers.filter(reaches).sort((x, y) => priceFor(x) - priceFor(y));
  return {
    answer: usable.find((a) => !a.signature) || null,
    sigAnswer: usable.find((a) => a.signature) || null,
    priceFor,
  };
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
    // A GRANT GATED ON A STATE THE GARRISON WILL NOT HAVE IS NOT A PROTECTION. `VEN-130 Aurok General`
    // reads "Your units that are [Empowered] have +2 Might", and 441.1 makes Empowering an ACT a card
    // must perform on each body - so he reaches zero of a Recruit, Bird, Sprite or Mech garrison, which
    // is every garrison this mode is about. CLAUDE.md had already recorded him as inert, in almost
    // these words, and the sweep had never been told. Checked on the MATCHED CLAUSE rather than the
    // whole card, because a card may mention Empowered elsewhere without gating this grant on it.
    if (/\[?Empowered\]?/i.test(m[0])) continue;
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
// A readier that readies every unit (#506, `readiesOf`): more units than any one turn can buy.
const READY_ALL = 99;
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
const accKey = (a) => (a ? `${a.e}/${a.p}` : "-");
function typesOf(costs) {
  const byType = new Map();
  for (const c of costs) {
    // `rain`, `holdx` and `turn` (#339) are part of the type for the same reason `link` is: a Blue
    // Sentinel and an unrelated E4/1-Power unit pay the same price, but only one of them Adds rainbow.
    // `pow` and `ready` (#501) likewise: a Seal and an unrelated E0/1-Power card are not the same type.
    // `rdy` (#506) too: Upstage Comedy and an unrelated E2 spell are not. And `acc` (#510): a Red
    // Brambleback and an unrelated E4/1-Power unit are not, and nor are two Accelerate prices.
    // `rune` and `share` (#513): an Acceleration Gate and an unrelated E3/1-Power spell are not.
    // `big`, `att`, `aph`, `kin` and `kinR` (#523): a card that fires or enables a conditional readier.
    const k = `${c.e}|${c.p}|${c.unit ? 1 : 0}|${c.gated ? 1 : 0}|${c.rain || 0}|${c.holdx || 0}|` +
              `${c.turn ? 1 : 0}|${c.pow || 0}|${c.ready ? 1 : 0}|${c.rdy || 0}|${c.rune || 0}|${c.share ? 1 : 0}|` +
              `${accKey(c.acc)}|${c.big || 0}|${c.att || 0}|${c.aph || 0}|${c.kin || 0}|${c.kinR || 0}|${c.link || ""}`;
    if (!byType.has(k))
      byType.set(k, { e: c.e, p: c.p, unit: !!c.unit, gated: !!c.gated, rain: c.rain || 0,
                      holdx: c.holdx || 0, turn: !!c.turn, pow: c.pow || 0, ready: !!c.ready,
                      rdy: c.rdy || 0, rune: c.rune || 0, share: !!c.share, acc: c.acc || null,
                      big: c.big || 0, att: c.att || 0, aph: c.aph || 0, kin: c.kin || 0, kinR: c.kinR || 0, link: c.link || "",
                      after: c.after || "", n: 0, kids: [] });
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
  const desc = (t) => `${t.e}|${t.p}|${t.unit ? 1 : 0}|${t.gated ? 1 : 0}|${t.rain}|${t.holdx}|` +
                      `${t.turn ? 1 : 0}|${t.pow}|${t.ready ? 1 : 0}|${t.rdy}|${t.rune}|${t.share ? 1 : 0}|${accKey(t.acc)}|` +
                      `${t.big}|${t.att}|${t.aph}|${t.kin}|${t.kinR}|${t.n}` +
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
  // ADDITIONAL TURNS (#339). A `turn` cost ("Take a turn after this one", OGN-122 Time Warp) queues
  // a turn the opponent never answers, so it runs INSIDE the clock turn that cast it: its own
  // Awaken and its own Channel Phase (315.1.b, 315.3.b), and no step on the clock, because 737:
  // "When an Additional Turn is inserted into this queue, it does not change the Turn Order of the
  // game. The owner of the Additional Turn just has the next queued turn. After that turn is
  // completed, it will be removed and the queue will proceed with its previously queued turns."
  // The number of turns still queued is the one thing the state needs beyond the counts, and it
  // can never exceed the number of `turn` costs, so it rides as the most significant digit of the
  // same integer.
  let warps = 0;
  for (const t of types) if (t.turn) warps += t.n;
  const SZ = space * (warps + 1);
  // Pricing [Equip] (2026-09-13) added a second cost per Equipment and pushed the biggest closures
  // past what an exact search can do in a test that runs on every commit: at 2e6 the whole table took
  // 50 seconds against 4.6 before. Lowered to 2e5, which keeps it near 5 and sends only the very
  // largest rows to the greedy pass - and the header PRINTS how many, so a row priced by the defect
  // #205 removed can never be read as exact. Raise it if this ever runs somewhere without a clock.
  // RC_GUARD raises the ceiling for a one-off measurement; RC_FB names the rows that hit it. At 2e6
  // every row is exact and the table takes 44 seconds, which is why the default is 2e5 and why the
  // header prints how many rows the fallback priced.
  if (SZ > (Number(process.env.RC_GUARD) || 2e5)) {
    greedyFallbacks++;
    if (process.env.RC_FB) console.error(`FALLBACK space=${SZ} dim=${dim}`);
    const g = greedyTurn(costs);
    return { all: g, unit: g, unitLast: true, extra: false, greedy: true };
  }
  const FULL = space - 1;                       // every count at its maximum
  // THE WORK GUARD (#523's security scan). SZ bounds the states, not what one state may buy: once a
  // Gemdragon engine returns more Energy than its Dragons cost, a turn can afford almost any mix, and
  // a legal set of 3 Gemdragons and 21 other Dragons walked 195 million leaves (past 120s) where the
  // catalogue's largest closure walks 6 million. Past LEAF_CAP leaves the set goes to the same greedy
  // fallback, counted and named like the state guard's. RC_LEAVES raises it for a measurement.
  const LEAF_CAP = Number(process.env.RC_LEAVES) || 3e7;
  let leaves = 0, over = false;

  // HOLD ADDS (#339). UNL-087 Blue Sentinel: "When I hold, [Add] [A] at the start of your next Main
  // Phase", and "Your hold effects for holding here trigger an additional time". A Hold is Scored in
  // the Beginning Phase (315.2.b.2), before that turn's Main Phase (316), so a holder paid on an
  // EARLIER turn Adds `rain` rainbow per trigger and triggers `1 + Σ holdx` times: two Sentinels
  // Add 2 x 3 = 6, which is the six the hand walks of the Power Nexus lines count (R1 = A, #11).
  // Rainbow pays Power and only Power, and it is not a rune, so paying with it recycles nothing.
  // Optimistic in the clock's own way: every holder is assumed to hold, at the same battlefield,
  // from the turn after it lands.
  // POWER INCOME (#501). A card whose exhaust alone Adds Power (the Seals, Honeyfruit) was paid for on
  // an earlier turn readies at this turn's Awakening (415.3.a) and Adds `pow` once. It rides in the
  // same Power-only budget as the hold Add and is NOT multiplied by `holdx`, which multiplies hold
  // effects only. A Seal paid THIS turn enters ready (359.2.d) and Adds the same turn; `walk` prices
  // that half, because it depends on what the turn buys rather than on the state it starts from.
  const rainAt = new Int16Array(space);
  const holders = [];
  for (let i = 0; i < dim; i++) if (types[i].rain || types[i].holdx || types[i].pow) holders.push(i);
  if (holders.length) {
    for (let k = 0; k < space; k++) {
      let rain = 0, times = 1, income = 0;
      for (const i of holders) {
        const h = ((k / stride[i]) | 0) % (types[i].n + 1);
        rain += h * types[i].rain;
        times += h * types[i].holdx;
        income += h * types[i].pow;
      }
      rainAt[k] = rain * times + income;
    }
  }
  // READYING RUNES (#513). 164.2.a makes a rune's Energy its EXHAUST and 164.2.b its Power its RECYCLE,
  // "Recycle this: [Reaction] — Add [C].", a cost with no exhaust in it. So a readied rune pays one more
  // Energy on the turn the readier resolves and no more Power: an exhausted rune recycles all the same,
  // and a recycled one has left the board (161.2.b) and cannot be readied. 167 empties the pool only at
  // the start of the Main Phase and the end of the turn, so every rune can be exhausted up front and the
  // Energy held while the readier resolves, which is why its own Energy never shrinks what it readies.
  // Its own POWER does: a rune recycled to pay it is gone before it resolves. So the readiers resolve
  // one after another, and each readies at most min(`rune`, runes - the recycles that paid it and every
  // readier before it); every other recycle can wait until after the last one resolves. Charging every
  // readier's recycle to all of them, as this did first, erred LATE: three Gates on T3's 6 runes ready
  // 4 + 4 + 3, not 3 + 3 + 3 (VEN-150:3,UNL-066:1 is T3 by hand, pinned). The ORDER is searched, not
  // sorted: no key is exact once two readiers differ in Power (on 4 runes, readying 10 for 3 Power and
  // then 3 for 1 returns 1, the other way round 3; and sorting by Power fails another pair), so `order`
  // tries every sequence of TYPES, copies of one type being interchangeable. For a fixed order the
  // Adds go to the earliest readiers, which is optimal: an Add spent earlier keeps a rune on the board
  // for every readier after it, one spent later only for those after that.
  // `share`: Acceleration Gate's "up to 4 units, gear, and/or runes" is ONE count, so a rune it readies
  // is a unit it does not; the leaf of `walk` spends the shared readies on runes first, only as many as
  // the Energy needs, and gives the rest to the units that landed with it.
  const runers = [];
  for (let i = 0; i < dim; i++) if (types[i].rune) runers.push(i);
  // THE CONDITIONAL READIERS (#523, `triggersOf`). Curator (`big`) and Aphelios (`att`) fire at most
  // once a turn, after a SOURCE cost the sub-turn bought: each becomes one more readier kind for
  // `order`, `vBig` or `vAtt`, priced at its source (and at Aphelios himself when he lands the same
  // turn), since the source is paid before the trigger resolves. Which source is searched, like the
  // order. The Gemdragon half (`kinR`) fires once per Gemdragon on the board each time a Dragon is
  // played, so a Gemdragon readies its own `rune` plus `kinR` per Gemdragon already there (`g0` from
  // earlier turns, `gp` placed before it in this one), and every other Dragon the sub-turn bought is
  // a readier too, `kinR` per Gemdragon on the board when it lands. Those go into `order` as ONE kind,
  // `CHAIN`, cheapest Energy first: they ready the same amount whichever of them is played, so the
  // cheapest first is the order that keeps every prefix payable.
  const bigs = [], atts = [], aphs = [], kins = [], gems = [];
  for (let i = 0; i < dim; i++) {
    const t = types[i];
    if (t.big) bigs.push(i);
    if (t.att) atts.push(i);
    if (t.aph) aphs.push(i);
    if (t.kin) kins.push(i);
    if (t.kinR) gems.push(i);
  }
  let aphN = 0, gemN = 0;
  for (const i of aphs) aphN += types[i].n;
  for (const i of gems) gemN += types[i].n;
  const KR = gemN ? types[gems[0]].kinR : 0;
  const kinsByE = [...kins].sort((a, b) => types[a].e - types[b].e);
  const chainTypes = gemN ? kins.filter((i) => !types[i].rune).sort((a, b) => types[a].e - types[b].e || types[a].p - types[b].p) : [];
  const chain = new Int16Array(chainTypes.reduce((a, i) => a + types[i].n, 0) + 1);
  const trig = bigs.length > 0 || (atts.length > 0 && aphN > 0) || gemN > 0;
  let runeMax = 0;
  for (const i of runers) if (types[i].rune > runeMax) runeMax = types[i].rune;
  for (const i of bigs) if (types[i].big > runeMax) runeMax = types[i].big;
  for (const i of atts) if (types[i].att > runeMax) runeMax = types[i].att;
  const haveOf = (i) => ((idx / stride[i]) | 0) % (types[i].n + 1);
  // `order` places `k` more readier copies of the `nk` kinds in `rk`, `rq` holding how many of each
  // the sub-turn bought and are still unplaced, and keeps in `rBest` the most Energy the own
  // (non-`share`) readiers can give up to `rNeed`, among the orders whose readies cover `rNeed` at
  // all; -1 means none does. Hoisted for the same reason `walk` is.
  // EVERY readier is paid before it resolves, out of the runes and what the readiers placed before it
  // returned (`spent` is their Energy so far); the costs that ready nothing wait until the last one
  // has resolved. Until #523 only the FIRST readier was checked, which was enough for one Gate and
  // not for a trigger that follows its source: measured 2026-10-27, without the check
  // curator-printed-cost-rebate, curator-needlessly-large-yordle-printed-ten and
  // herald-of-scales-gemdragon-drakehound-net-positive each read a turn early, and so does the
  // two-Gemdragons-and-a-Mountain-Drake pin in test/turn-clock.test.ts.
  const CHAIN = { chain: true };
  const rk = [...runers.map((i) => types[i]), null, null, null];
  const rq = new Int8Array(runers.length + 3);
  const vBig = { e: 0, p: 0, rune: 0, share: false }, vAtt = { e: 0, p: 0, rune: 0, share: false };
  // `rMax` bounds what one copy can return in this sub-turn, for the prune at the top of `order`.
  let rNeed = 0, rBest = -1, nk = runers.length, g0 = 0, rMax = 0;
  const trigMemo = new Map();
  // DOMINANCE (#523's security scan: 3 Gemdragons, 21 other Dragons and an Aphelios ran past 120s).
  // Which copies are placed fixes everything but the readies: `spent` is their Energy, the Adds they
  // used are min(adds, their Power) and so `left` is fixed too, and every LATER step returns what it
  // returns whatever came first. So a partial order with no more `own` and `shr` than one already seen
  // at the same counts can do no better, and `order` walks the placement counts instead of every
  // interleaving. `key` packs the counts still unplaced; past SEEN of them it searches unpruned.
  const kStride = new Int32Array(runers.length + 3);
  const SEEN = 1 << 16;
  const seenGen = new Int32Array(SEEN), seenOwn = new Int16Array(SEEN), seenShr = new Int16Array(SEEN);
  let gen = 0, dom = false;
  const search = (k, adds) => {
    let span = 1, key = 0;
    for (let x = 0; x < nk; x++) { kStride[x] = span; key += rq[x] * span; span *= rq[x] + 1; }
    dom = span <= SEEN;
    gen++;
    order(k, runes, adds, 0, 0, 0, 0, 0, key);
  };
  const order = (k, left, adds, own, shr, spent, gp, cp, key) => {
    if (rBest === rNeed) return;  // nothing scores more than the Energy the turn is short of
    if (own + shr + k * rMax < rNeed) return;  // nor can the copies left cover what is still short
    if (dom) {
      if (seenGen[key] === gen && seenOwn[key] >= own && seenShr[key] >= shr) return;
      seenGen[key] = gen; seenOwn[key] = own; seenShr[key] = shr;
    }
    if (!k) {
      if (own + shr >= rNeed) { const sc = own < rNeed ? own : rNeed; if (sc > rBest) rBest = sc; }
      return;
    }
    for (let x = 0; x < nk; x++) {
      if (!rq[x]) continue;
      const kind = rk[x];
      const t = kind.chain ? types[chain[cp]] : kind;
      if (spent + t.e > runes + own + shr) continue;
      rq[x]--;
      const fa = adds < t.p ? adds : t.p;
      const l = left - (t.p - fa);
      let r = kind.chain || l <= 0 ? 0 : t.rune < l ? t.rune : l;
      if (kind.chain || t.kinR) r += l <= 0 ? 0 : (g0 + gp) * (KR < l ? KR : l);
      order(k - 1, l, adds - fa, t.share ? own : own + r, t.share ? shr + r : shr, spent + t.e,
            t.kinR && !kind.chain ? gp + 1 : gp, kind.chain ? cp + 1 : cp, key - kStride[x]);
      rq[x]++;
    }
  };

  let curR = new Int8Array(SZ).fill(-1);        // runes on board, -1 = state unreachable
  let curU = new Int16Array(SZ);                // the SUB-turn the last UNIT landed
  let nxtR = new Int8Array(SZ);
  let nxtU = new Int16Array(SZ);
  let endR = new Int8Array(SZ);                 // states that have taken every turn they queued
  let endU = new Int16Array(SZ);
  curR[0] = 0;
  // Hoisted out of the per-state loop on purpose: building this closure inside it cost 14s over the
  // catalogue against 0.4s here, because a recursive closure re-created 300,000 times is not one V8
  // can keep optimized.
  // `rrMax` bounds the Energy this state's readiers can still return, so `walk` can prune on Energy
  // before the leaf knows how many of them the turn bought.
  let idx = 0, runes = 0, rain = 0, u0 = 0, sub = 0, queued = 0, rrMax = 0;
  // Where each type stands in the state being BUILT. Hoisted and mutated in place rather than passed,
  // for the same reason the closure itself is hoisted: this is the innermost loop in the file. A
  // dependant reads its root out of this array, which is why typesOf emits a root before its kids.
  const cnt = new Int16Array(dim);
  // index of the first gated type, or -1 when there are none (every row without an engine fold)
  let ungated = -1;
  for (let i = 0; i < dim; i++) if (types[i].gated) { ungated = i; break; }
  // `nf` is the Power the ready income cards bought THIS turn Add (359.2.d) and `fp` the cheapest
  // Power cost among them. Their Adds pay any Power but the first one's own, which must come from
  // the turn's other sources: one recycle pays a Seal, the Seal pays the next card's Power - a
  // second Seal's included, which is why N Seals in one turn still need only that one recycle.
  // `un` is the number of units bought this sub-turn and `rd` how many of them the readiers bought
  // with them can ready (#506), or that paid [Accelerate] (#510). `fin` says every type before `i`
  // is at its maximum in the state being built, i.e. this sub-turn may still complete the set.
  const walk = (i, e, p, delta, un, rd, cast, nf, fp, fin) => {
    if (over) return;
    if (i === dim) {
      if (++leaves > LEAF_CAP) { over = true; return; }
      const k = idx + delta + (queued + cast) * space;
      const ext = nf && fp > p - nf ? fp : p - nf;  // Power the fresh Adds cannot pay
      const rec = ext > rain ? ext - rain : 0;
      if (rec > runes) return;
      const nr = runes - rec;                       // 161.2.b: a recycled rune leaves the board
      // READYING RUNES (#513): the Energy past `runes` must come from the readiers bought this turn.
      let rdn = rd;
      if (runers.length || trig) {
        let slots = 0, k = 0;
        nk = runers.length;
        for (let x = 0; x < nk; x++) {
          const t = rk[x];
          const q = cnt[runers[x]] - haveOf(runers[x]);
          rq[x] = q;
          if (!q) continue;
          k += q;
          if (t.share) slots += q * t.rune;
        }
        // A readier is paid BEFORE it resolves, so the runes it readies never pay its own Energy: the
        // first one is bought out of the runes alone, and each later one may use what earlier ones
        // returned (`order`). With nothing to return, every shared ready goes to a unit.
        const need = e - runes;
        if (need > 0) {
          rNeed = need; rBest = -1; rMax = runeMax;
          if (!trig) search(k, rain + nf);
          else {
            // #523. The other Dragons this sub-turn bought, cheapest first, when a Gemdragon is there
            // to see them: on the board already, or bought in this sub-turn and placed before them.
            g0 = 0;
            let g = 0, cn = 0, nb = runers.length, kb = k;
            for (const i of gems) { const h = haveOf(i); g0 += h; g += cnt[i] - h; }
            // Aphelios on the board, and whether he lands this sub-turn (then he is paid first).
            let aOn = 0, aNew = null;
            for (const i of aphs) { if (cnt[i]) aOn += cnt[i]; if (cnt[i] && !haveOf(i)) aNew = types[i]; }
            for (const i of aphs) if (haveOf(i)) aNew = null;
            // Nothing bought this sub-turn that can ready a rune: the Energy past `runes` has no source.
            let fire = k > 0;
            if (!fire) for (const i of bigs) if (cnt[i] !== haveOf(i)) { fire = true; break; }
            if (!fire && aOn) for (const i of atts) if (cnt[i] !== haveOf(i)) { fire = true; break; }
            if (!fire && g0) for (const i of chainTypes) if (cnt[i] !== haveOf(i)) { fire = true; break; }
            if (!fire) return;
            // The search reads nothing else, so its answer is memoized on exactly these.
            const mk = delta + space * (runes + 13 * (rain + nf + 64 * (need + 256 * (g0 + 8 * (aOn + 8 * (aNew ? 1 : 0))))));
            const hit = trigMemo.get(mk);
            if (hit !== undefined) rBest = hit;
            else {
            if (g0 + g) for (const i of chainTypes) for (let q = cnt[i] - haveOf(i); q > 0; q--) chain[cn++] = i;
            if (cn) { rk[nb] = CHAIN; rq[nb++] = cn; kb += cn; }
            rMax = runeMax + (g0 + g) * KR;
            // Both are optional ("you may exhaust me", and Aphelios may choose another mode), so -1, no
            // trigger at all, is always one of the choices.
            for (let b = -1; b < bigs.length; b++) {
              const bi = b < 0 ? -1 : bigs[b];
              if (bi >= 0 && cnt[bi] === haveOf(bi)) continue;
              for (let a = -1; a < (aOn ? atts.length : 0); a++) {
                const ai = a < 0 ? -1 : atts[a];
                if (ai >= 0 && cnt[ai] === haveOf(ai)) continue;
                let kk = kb;
                nk = nb;
                if (bi >= 0) {
                  const t = types[bi];
                  vBig.e = t.e; vBig.p = t.p; vBig.rune = t.big;
                  rk[nk] = vBig; rq[nk++] = 1; kk++;
                }
                if (ai >= 0) {
                  const t = types[ai];
                  const n = cnt[ai] - haveOf(ai);
                  // Each copy is a different Aphelios (at most `aOn` of them), and `aNew` is set only
                  // when none was on the board before, so charging him per copy pays each one once.
                  vAtt.e = t.e + (aNew ? aNew.e : 0); vAtt.p = t.p + (aNew ? aNew.p : 0); vAtt.rune = t.att;
                  rk[nk] = vAtt; rq[nk] = n < aOn ? n : aOn; kk += rq[nk++];
                }
                search(kk, rain + nf);
              }
            }
            // The extra kinds are spent: `order` restored every count it took.
            nk = runers.length;
            trigMemo.set(mk, rBest);
            }
          }
          if (rBest < 0) return;
          rdn = rd + slots - (need - rBest);
        } else rdn = rd + slots;
      }
      // READYING (#506). A readier works only on the turn it is paid, on the units that land with
      // it, so this sub-turn owes 143.4's readiness turn only if more units landed in it than its
      // readiers ready. A sub-turn whose units were all readied records -sub: a unit landed, so
      // `unit` still reports one, and it is not `sub`, so `unitLast` does not read it as owed.
      const nu = un > rdn ? sub : un ? -sub : u0;
      // For a fixed set of paid costs MORE RUNES always dominates; ties keep the EARLIEST
      // last-unit turn, because that is what the readiness +1 reads. Except at FULL: nothing is left
      // to buy, so the runes decide nothing and the only thing the state still carries is whether the
      // completing sub-turn owes the readiness turn; preferring runes there could keep a path that
      // owes it over one that does not. Measured 2026-10-27, this branch moves no row and no `--price`
      // pin today: it makes the waiver exact by construction rather than by luck.
      let better = nxtR[k] < nr || (nxtR[k] === nr && nxtU[k] > nu);
      if (idx + delta === FULL && nxtR[k] >= 0 && (nxtU[k] === sub) !== (nu === sub)) better = nu !== sub;
      if (better) { nxtR[k] = nr; nxtU[k] = nu; }
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
    // --ignition-nogate still gates a card that queues a turn (#339), so for that card the arm is
    // NOT a relaxation. Why its gated answer is exact on the only two rows it touches is a necessary
    // condition stated in the header's sandwich note, not something this line assumes.
    if (t.gated && ungated >= 0 && (!ignNoGate || t.turn)) {
      let done = true;
      for (let z = 0; z < ungated; z++) if (cnt[z] < types[z].n) { done = false; break; }
      if (!done) cap = have;
    }
    for (let q = 0; q <= t.n - have; q++) {
      if (have + q > cap) break;
      cnt[i] = have + q;
      const ne = e + t.e * q, np = p + t.p * q;
      const fresh = t.ready && q > 0;
      const nnf = fresh ? nf + t.pow * q : nf;
      // R runes afford R Energy AND R Power, and Added rainbow affords Power on top. `np - nnf` is
      // non-decreasing in q for every type whose cost is at least its own Add (a Seal pays 1 and
      // Adds 1), so the break is safe; a hypothetical ready card that Adds more than it costs only
      // skips the q it cannot afford yet.
      // `rrMax` is the most Energy readied runes can add on top (#513); the leaf makes it exact.
      if (ne > runes + rrMax) break;
      if (np - nnf > runes + rain) { if (fresh && t.pow > t.p) continue; break; }
      // [ACCELERATE] (#510): `a` of the `q` copies bought here pay their optional [1][C] (805.1.a) and
      // enter ready, so they owe no 143.4 turn and count in `rd`. Paying it only ever costs runes, and
      // the readiness turn is read only where the set completes, so the clock offers it only on a path
      // that can still complete the set in this sub-turn (`full`): anywhere else it is dominated by
      // the same buy without it, which keeps more runes. At FULL the comparator below prefers the path
      // that owes no readiness turn, so the cost is paid exactly when it lands the last unit ready.
      const full = fin && have + q === t.n;
      const am = t.acc && full ? q : 0;
      for (let a = 0; a <= am; a++) {
        const ae = a ? ne + a * t.acc.e : ne, ap = a ? np + a * t.acc.p : np;
        if (a && (ae > runes + rrMax || ap - nnf > runes + rain)) break;
        // A `share` readier's units are counted at the leaf, out of what its runes leave (#513).
        walk(i + 1, ae, ap, delta + q * stride[i], t.unit ? un + q : un, rd + (t.share ? 0 : t.rdy) * q + a,
             cast + (t.turn ? q : 0),
             nnf, fresh && (!nf || t.p < fp) ? t.p : fp, full);
      }
    }
  };
  // One sub-turn from every reachable state of `curR`: channel, Add, pay. A state whose queue is
  // empty starts an ordinary turn; one with a turn queued takes it and pops the queue.
  const step = (extraTurn) => {
    nxtR.fill(-1); nxtU.fill(0);
    for (let k = 0; k < SZ; k++) {
      if (curR[k] < 0) continue;
      idx = k % space;
      queued = ((k / space) | 0) - (extraTurn ? 1 : 0);
      runes = Math.min(12, curR[k] + 2);
      rain = rainAt[idx];
      rrMax = 0;
      for (const i of runers) rrMax += (types[i].n - ((idx / stride[i]) | 0) % (types[i].n + 1)) * Math.min(types[i].rune, runes);
      // #523: an upper bound on the conditional readiers, which the leaf makes exact.
      if (trig) {
        for (const i of bigs) if (haveOf(i) < types[i].n) { rrMax += Math.min(types[i].big, runes); break; }
        if (aphN) {
          let left = 0, r = 0;
          for (const i of atts) { left += types[i].n - haveOf(i); if (types[i].att > r) r = types[i].att; }
          rrMax += Math.min(left, aphN) * Math.min(r, runes);
        }
        // No Dragon returns more than U, and each is paid out of what the runes and the readiers
        // before it gave. So the most Dragons any order can play is what the CHEAPEST ones reach
        // when each returns U: the i cheapest cost no more than any i a real order plays.
        if (gemN) {
          const U = gemN * Math.min(KR, runes);
          let pool = runes + rrMax, m = 0;
          for (const i of kinsByE) {
            let left = types[i].n - haveOf(i);
            while (left > 0 && pool >= types[i].e) { pool += U - types[i].e; m++; left--; }
            if (left) break;
          }
          rrMax += m * U;
        }
      }
      u0 = curU[k];
      walk(0, 0, 0, 0, 0, 0, 0, 0, 0, true);
    }
  };
  for (let turn = 1; turn <= 40; turn++) {
    endR.fill(-1); endU.fill(0);
    // A completion on this clock turn owes no `+1` when a turn is still queued at that moment: the
    // Additional Turn brings both the Awaken that readies the last unit and the Beginning Phase a
    // hold payoff fires in. Failing that, it owes the readiness turn only if the last unit landed in
    // the very sub-turn that completed the set.
    let done = false, extra = false, unitLast = true, unitClock = 0;
    let extraTurn = false;
    for (;;) {
      sub++;
      step(extraTurn);
      if (over) {
        greedyFallbacks++;
        if (process.env.RC_FB) console.error(`FALLBACK leaves>${LEAF_CAP} dim=${dim}`);
        const g = greedyTurn(costs);
        return { all: g, unit: g, unitLast: true, extra: false, greedy: true };
      }
      for (let qd = 0; qd <= warps; qd++) {
        const k = FULL + qd * space;
        if (nxtR[k] < 0) continue;
        if (!done) unitClock = nxtU[k] ? turn : 0;
        done = true;
        if (qd > 0) extra = true;
        else if (nxtU[k] !== sub) unitLast = false;
      }
      // Settle the states with nothing queued; the rest take their Additional Turn next.
      let pending = false;
      for (let k = 0; k < SZ; k++) {
        if (nxtR[k] < 0) continue;
        if (k >= space) { pending = true; continue; }
        if (endR[k] < nxtR[k] || (endR[k] === nxtR[k] && endU[k] > nxtU[k])) { endR[k] = nxtR[k]; endU[k] = nxtU[k]; }
        nxtR[k] = -1;
      }
      const tR = curR; curR = nxtR; nxtR = tR;
      const tU = curU; curU = nxtU; nxtU = tU;
      if (!pending) break;
      extraTurn = true;
    }
    if (done) return { all: turn, unit: unitClock, unitLast: !extra && unitLast && unitClock !== 0, extra };
    const tR = curR; curR = endR; endR = tR;
    const tU = curU; curU = endU; endU = tU;
  }
  return { all: Infinity, unit: Infinity, unitLast: false, extra: false };
}

// Kept only as the guard for an absurd state space, which NO row in the catalogue reaches today.
// Do not use it for anything else: it is the defect #205 describes. It also ignores Adds and
// Additional Turns (#339), which can only make a fallback row LATER, never earlier.
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
  const unit = (e, p, more) => ({ e, p, unit: true, link: "", ...more });
  const sentinel = () => unit(4, 1, { rain: 1, holdx: 1 });     // UNL-087's two hold lines
  const warp = (e, p) => ({ e, p, unit: false, link: "", turn: true });
  const seal = (ready) => ({ e: 0, p: 1, unit: false, link: "", pow: 1, ready });  // OGN-040's shape
  const readier = (e, rdy) => ({ e, p: 0, unit: false, link: "", rdy });           // UNL-009's shape
  const accel = (e, p) => unit(e, p, { acc: { e: 1, p: 1 } });                   // UNL-029's [Accelerate]
  const gate = (e, p, n) => ({ e, p, unit: false, link: "", rdy: n, rune: n, share: true });  // VEN-150's shape
  const runer = (e, p, n) => ({ e, p, unit: false, link: "", rune: n });                     // runes only
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
    // #339. The pair below is the same costs with and without the hold Add, so the Add is SEEN.
    ["two E4/1 units + E4/8P spell, no Add", [unit(4, 1), unit(4, 1), play(4, 8, "")], 5,
     "T2 and T3 take a unit each with one recycle apiece, T4 has 6 runes for 8 Power, T5 has 8"],
    ["two Sentinels + E4/8P spell", [sentinel(), sentinel(), play(4, 8, "")], 4,
     "T3's 2 rainbow pay the second Sentinel's Power, and T4's 6 rainbow plus 2 recycles pay the 8"],
    ["two E10 cards, no extra turn", [play(10, 0, ""), play(10, 0, "")], 6, "T5 has 10 runes, T6 the next 10"],
    ["two E10 Time Warps", [warp(10, 0), warp(10, 0)], 5,
     "the first Warp's Additional Turn channels to 12 and casts the second inside T5"],
    ["power-nexus-sentinel-renata-time-warp-chain's costs",
     [sentinel(), sentinel(), unit(5, 0), warp(10, 4), warp(10, 4), warp(10, 4)], 6,
     "the hand walk's T6 on the play: 11 runes on T6, each Warp's 4 Power from the six rainbow"],
    // #501. The same costs with a Seal that enters ready and one that enters exhausted, so the
    // same-turn Add of 359.2.d is SEEN, and a chain of Seals that one recycle starts.
    ["ready Seal + E2/2P spell", [seal(true), play(2, 2, "")], 1,
     "T1: recycle one rune for the Seal, exhaust it, and the spell's 2 Power is its Add plus the other recycle"],
    ["exhausted Seal + E2/2P spell", [seal(false), play(2, 2, "")], 2,
     "T1 affords the Seal or the spell's 2 Power, not 3 Power; T2's 3 runes plus the Seal's Add pay the spell"],
    ["three ready Seals", [seal(true), seal(true), seal(true)], 1,
     "one recycle pays the first Seal and each Seal's Add pays the next (two Power from two runes is not three)"],
    // #513. The same E7 with and without readied runes is #506's E3+E7 pair, so the Energy back is SEEN.
    ["E3/1 four-rune readier + E7 spell", [gate(3, 1, 4), play(7, 0, "")], 3,
     "T3's 6 runes, one recycled for the readier's Power, give 6 + 4 readied = 10 Energy"],
    ["E3/1 + E7, nothing readied", [play(3, 1, ""), play(7, 0, "")], 4,
     "T2 takes the E3 and leaves 3 runes, so T4's 7 is the first turn with 7"],
    ["E3/1 four-rune readier alone", [gate(3, 1, 4)], 2,
     "it is paid before it resolves, so T1's 2 runes cannot pay its E3 whatever it readies"],
    // The ORDER of two different readiers (PR #522's post-commit review): most runes first is wrong here.
    ["E1/3 ten-rune + E1/1 three-rune readier + E5", [runer(1, 3, 10), runer(1, 1, 3), play(5, 0, "")], 2,
     "T2's 4 runes: recycle 1 and the three-rune readier readies 3 (pool 6), recycle the other 3 for the " +
     "ten-rune one, which has none left to ready, and the E5 takes the 5 left; the other order returns 1"],
  ];
  // #506. These read `pays`, the turn the last unit can act, because a readier moves only the
  // readiness turn of 143.4 and never `all`. The first two are the same units with and without the
  // readier, so the waiver is SEEN; the third is why it must share the unit's turn, which is the
  // defect the issue names (a readier paid on T1 waived the last unit's turn).
  const paysCases = [
    ["two E2 units, no readier", [unit(2, 0), unit(2, 0)], 3,
     "T1 and T2 take a unit each and the T2 unit is exhausted (143.4) until T3"],
    ["two E2 units + E2 one-unit readier", [unit(2, 0), unit(2, 0), readier(2, 1)], 2,
     "T2's 4 runes pay the second unit and the readier, which readies it the turn it lands"],
    ["E4 unit + E2 one-unit readier", [unit(4, 0), readier(2, 1)], 3,
     "the readier on T1 readies nothing, T2's 4 runes pay the unit alone, and T3 is the first turn with 6 for both"],
    // #510. The same two units with and without [Accelerate], so the optional cost is SEEN, and one
    // where the turn that lands the unit has no rune for it.
    ["two E4/1 units, no Accelerate", [unit(4, 1), unit(4, 1)], 4,
     "T2 and T3 take a unit each and the T3 unit is exhausted (143.4) until T4"],
    ["two E4/1 units with Accelerate", [accel(4, 1), accel(4, 1)], 3,
     "T3's 5 runes pay the second unit Accelerated, E5 and 2 Power, and it enters ready"],
    ["one E4/1 unit with Accelerate", [accel(4, 1)], 3,
     "T2's 4 runes pay E4 + 1 but not E5 + 2, so it lands exhausted; Accelerated on T3 it also acts on T3"],
    // #513: "up to 4 units, gear, and/or runes" is ONE count.
    ["E3/1 four-rune readier + E9 unit", [gate(3, 1, 4), unit(9, 0)], 5,
     "T4's 8 runes + 4 readied pay E12, all four readies go to runes, so the unit lands exhausted until T5"],
  ];
  let bad = 0;
  console.log(`# allocator self-test: ${cases.length + paysCases.length} synthetic cost sets, answers hand-derived`);
  for (const [name, costs, want, why] of cases) {
    const got = deployTurn(costs).all;
    const ok = got === want;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  T${got} (want T${want})  ${name} — ${why}`);
  }
  for (const [name, costs, want, why] of paysCases) {
    const d = deployTurn(costs);
    const got = d.all + (d.unitLast ? 1 : 0);
    const ok = got === want;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  pays T${got} (want T${want})  ${name} — ${why}`);
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

// ---------------------------------------------------------------- the garrison an entry stands
/**
 * WHICH BODIES THIS ENTRY ACTUALLY PUTS AT A BATTLEFIELD, and every clause of it is a defect this
 * emitter has already shipped.
 *
 * THE SELF-FEEDING ONE IS THE WORST AND IT IS NEW. Both Hold modes used to fold
 * `prerequisites.notable` into the prose they scanned for token names - and this script WRITES those
 * notables. `scope()` emits the parenthetical "(Mech bodies only)" into an answer list in order to say
 * that answer does NOT apply here; the next run matched the word Mech inside it and concluded the
 * garrison was Might-3 Mechs. Eight entries were offered a 6-Energy answer for a board whose real
 * floor is 4, and none of the eight plays a token at all. An instrument that reads its own output has
 * no fixed point and grows more confident the more often it runs. Prose here is the AUTHOR'S alone:
 * steps and terminatesIn.
 *
 * A TOKEN NAMED IN PROSE IS NOT A TOKEN ON THE BOARD. 439.2.c: this pool PLAYS its tokens ("Play a 1
 * [M] Recruit token"), so the evidence is a card THIS ENTRY USES whose own text plays one. `uses` is
 * already the entry's declared ingredient list, which is what makes card text sufficient here and not
 * the pool-wide over-count this project warns about - a card in `uses` is a card the line plays.
 *
 * A FIRST VERSION ALSO REQUIRED THE ENTRY'S STEPS TO NAME THE TOKEN, and it was too strict in a way
 * only measuring showed: `UNL-044 Flurry of Feathers` has no text except playing four Bird tokens, and
 * its steps call them bodies, so the AND lost a garrison that is unambiguously Birds. Requiring a
 * second mention buys nothing once the first is the card's own printed text. When nothing qualifies at
 * all the caller reports CANNOT DETERMINE rather than guessing, because a floor that is too LOW is
 * worse than no floor - it names a confident answer that does not work.
 *
 * ZONE. The answer cards sweep "at a battlefield", so a body the entry declares at BASE is out of
 * their reach and must not set the floor - the identical distinction that shipped a false Flurry
 * notable in the fragile-body arm.
 *
 * `--holds` already called its token scan "a FLAG that says read it, never a verdict". The EMITTER
 * used the same scan as a verdict and wrote it into the catalogue. One helper now, so the two cannot
 * disagree about what a garrison is.
 */
function tokensPlayedBy(used) {
  const out = new Set();
  for (const c of used) {
    const t = `${c.text || ""} ${c.effect || ""}`;
    for (const k of Object.keys(TOKEN_MIGHT)) {
      // THE WORD `token` IS LOAD-BEARING AND A FIRST VERSION DROPPED IT. 439.2.c's wording is "Play a
      // 1 [M] Recruit token", and a PROXIMITY regex without that anchor matches `UNL-177 Ivern, Friend
      // to All` - "As you PLAY me, choose BIRD, Cat, Dog, or Poro" - which chooses a TAG and plays no
      // token at all. That gave ivern-sentinel-hold a phantom Might-1 Bird and a floor of 1 where its
      // battlefield bodies are Might 6 and 4. Exactly the defect this function was written to remove,
      // surviving inside its own repair because the scan moved from prose to card text and kept the
      // loose window. Found by SAMPLING --holds by hand, not by any test.
      // The tail past `token` is for the DESTINATION test below, and the two clauses are coupled
      // through this one window: anchoring on `token` without it truncated the match before "to your
      // base" and silently switched the base exclusion off. --selftest-garrison caught that in the same
      // run, which is the whole reason it exists.
      const m = t.match(new RegExp(`play[^.]{0,40}\\b${k}\\b[^.]{0,40}\\btokens?\\b[^.]{0,60}`, "i"));
      if (!m) continue;
      // 355.2.a's default is your base OR a battlefield you control, and a card that NAMES the base
      // puts the body where a battlefield sweep cannot reach it.
      if (/to (your|their|his|her) base|into (your|their) base/i.test(m[0])) continue;
      out.add(k);
    }
  }
  return [...out];
}

function garrisonFloor(e, used, scaling) {
  const prose = `${(e.steps || []).join(" ")} ${e.terminatesIn || ""}`;
  const printed = (e.uses || [])
    .filter((u) => u.zone === "BATTLEFIELD")
    .map((u) => byBase.get(u.card))
    .filter((c) => c && (c.type || []).includes("unit") && c.might !== null && !scaling.has(c.base))
    .map((c) => c.might);
  const toks = tokensPlayedBy(used);
  const cands = [...printed, ...toks.map((k) => TOKEN_MIGHT[k])];
  return { floor: cands.length ? Math.min(...cands) : null, toks, printed };
}

// ---------------------------------------------------------------- --selftest-garrison
/**
 * The garrison floor decides which answer card the Hold modes name to a player, and it has now been
 * wrong TWICE in ways no test could see: a printed Might read off a self-scaling body (#200 batch 17),
 * and a phantom Mech read out of this script's own emitted prose. Both shipped, and both were caught by
 * a person reading the output.
 *
 * So it is pinned against HAND-DERIVED answers, in BOTH directions, over REAL entries - a floor that is
 * too LOW is the dangerous one, because it names a confident answer that does not work, and a sweep
 * that only ever checks "did it find something" cannot see that at all.
 *
 *   the three that were given a phantom Mech  -> floor 4, NO tokens (their bodies are printed Might 4)
 *   three genuine token garrisons             -> floor 1, and the right token kinds
 *   an entry whose bodies come from `needs`   -> null, i.e. CANNOT DETERMINE rather than a guess
 */
if (args.includes("--selftest-garrison")) {
  const scaling = new Set(selfScaling(cards).map((c) => c.base));
  const byId = new Map(db.combos.map((e) => [e.id, e]));
  const cases = [
    ["ahri-blue-sentinel-hold", 4, [], "3 Ahri and 2 Blue Sentinel, both printed Might 4; the emitter read Might-3 Mechs out of its own answer-list prose"],
    ["blue-sentinel-trinity-force-hold", 4, [], "same phantom Mech, same real floor"],
    ["shen-sentinel-time-warp-chain", 4, [], "same phantom Mech, same real floor"],
    ["flurry-of-feathers-grand-plaza-win", 1, ["Bird"], "UNL-044 plays four 1-Might Bird tokens and has no other text - a first version lost this by also demanding the steps name them"],
    ["corina-svellsongur-plaza", 1, ["Recruit"], "Corina is Might 6 at the battlefield but PLAYS three 1-Might Recruits, so the floor is the token"],
    ["arise-sand-soldiers-plaza", 1, ["Sand Soldier", "Recruit"], "two token makers; the floor is the smaller (rule 187: Recruit 1, Sand Soldier 2)"],
    ["ready-recruits-grand-plaza", null, [], "its bodies come from a `needs` engine, so this entry's own board cannot say - null, never a guess"],
    // The two clauses the first version of this self-test left UNPINNED, found by breaking each one and
    // watching nothing go red. Both are real entries and both hand-derive to 4.
    ["rumble-scrapper-sentinel-mechs", 4, [], "SFD-089 Rumble plays a 3-Might Mech TO YOUR BASE, which a battlefield sweep cannot reach, so the garrison is his own Might 4 beside Blue Sentinel's. Without the base exclusion this reads 3 - the same wrong number the phantom Mech produced, off the same card"],
    ["ivern-nurturer-hold-tutor", 4, [], "UNL-051 Ivern, Nurturer MENTIONS Bird and plays none, so a name-matcher reads 1 and the truth is her own printed Might 4. This is the play-versus-name clause the whole defect turned on"],
    ["ivern-sentinel-hold", 4, [], "UNL-177 Ivern, Friend to All reads \"As you PLAY me, choose BIRD, Cat, Dog, or Poro\" - a TAG choice with no token in it. A proximity regex without the word `token` read that as a Might-1 Bird and gave this entry a floor of 1, where its battlefield bodies are Might 6 and 4 and its only Might-1 card sits at zone BASE. Found by sampling --holds by hand"],
    ["spiderling-swarm-grand-plaza", null, [], "VEN-097 Spiderling is printed Might 1 and reads \"I have +1 Might for each other unit you control here with my name\", so its PRINTED value is meaningless on a board of seven. Excluding it leaves nothing, and null is the honest answer - this is the entry the first false notable shipped on"],
  ];
  console.log(`# --selftest-garrison: ${cases.length} real entries with hand-derived floors`);
  console.log(`# ${cases.filter((c) => c[1] !== null).length} expect a floor, ${cases.filter((c) => c[1] === null).length} expect CANNOT DETERMINE; ` +
              `${cases.filter((c) => c[2].length).length} expect token bodies and ${cases.filter((c) => !c[2].length && c[1] !== null).length} expect none`);
  let bad = 0;
  for (const [id, wantFloor, wantToks, why] of cases) {
    const e = byId.get(id);
    if (!e) { bad++; console.log(`  FAIL  ${id} - no such entry (the catalogue moved; re-derive this case by hand)`); continue; }
    const used = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean);
    const got = garrisonFloor(e, used, scaling);
    const ok = got.floor === wantFloor && [...got.toks].sort().join(",") === [...wantToks].sort().join(",");
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  ${id}`);
    console.log(`          floor=${got.floor} want ${wantFloor}  tokens=[${got.toks.join(", ")}] want [${wantToks.join(", ")}]`);
    console.log(`          ${why}`);
  }
  console.log(bad ? `# ${bad} FAILED` : "# all pass");
  process.exit(bad ? 1 : 0);
}

// ---------------------------------------------------------------- --selftest-answer
/**
 * WHICH CARD THE HOLD MODES NAME, pinned against hand-derived answers - and the case that matters is
 * a COUNTERFACTUAL, because the live pool cannot distinguish a correct filter from a lucky one.
 *
 * `--holds` had no Signature carve-out at all and named the right card anyway on all 37 rows with a
 * computable floor. The reason was a coincidence: the swept array is sorted by DAMAGE, and the only
 * Signature answer that could win on damage, `OGS-018 Tibbers` at dmg 3, loses the dmg-3 tie to
 * `OGS-002 Firestorm` on cost alone - E8+P2 against E6+P1, THREE POINTS. Reprice Tibbers below
 * Firestorm and the old selection names a Signature card on SIX rows, none of which name it, so
 * `--holds-notables` would then have written that claim into `data/combos.json`.
 *
 * MEASURED against every wrong selection I could build, which is the only way to know what a case is
 * worth. Each variant differs from the shipped one by the single clause named:
 *
 *   damage order + NO Signature split  (the code as it was)   -> 1 case fails: the COUNTERFACTUAL alone
 *   price order  + NO Signature split                         -> 3 cases fail (M2, M4, CF)
 *   damage order + split KEPT                                 -> 0 cases fail, CORRECTLY
 *
 * The last row is the one worth reading. It is not a gap: with the split in place the two orderings
 * pick the SAME non-Signature card on all 37 live rows, so this self-test pins the ANSWER and not the
 * algorithm, which is what it should do. And the first row is why case 4 exists at all - it is the
 * only case that fails against the code this replaced.
 *
 * THE COUNTERFACTUAL WAS INERT WHEN I FIRST WROTE IT and passed against every wrong selection
 * including the original, because I repriced the SWEPT ARRAY when the damage-tie is broken by cost
 * INSIDE `sweepMassAnswers`. It is built by re-sweeping perturbed CARDS for that reason. I found it
 * only by reconstructing the original selection and watching all four cases go green: a self-test is
 * validated by failing when it should, never by passing.
 *
 * Expectations are hand-derived from the printed sweep, and each was checked against the line the
 * script actually prints rather than against the line it was meant to print.
 */
if (args.includes("--selftest-answer")) {
  const real = sweepMassAnswers(cards);
  /**
   * The counterfactual pool: same seven cards, same damage, same Signature flags, ONE PRICE MOVED.
   *
   * IT MUST BE BUILT BY RE-SWEEPING PERTURBED CARDS, NOT BY MAPPING THE SWEPT ARRAY, and the first
   * version of this self-test did the latter and was therefore inert. `sweepMassAnswers` ends with
   * `sort((a, b) => a.dmg - b.dmg || a.e + a.p - (b.e + b.p))`, so the damage-tie between Firestorm
   * and Tibbers is broken by cost INSIDE the sweep - repricing afterwards leaves that order already
   * fixed, and the case passed against every wrong selection I could build, including the original.
   * Caught by reconstructing the original selection and watching all four cases go green.
   */
  const cfCards = cards.map((c) => (c.base === "OGS-018" ? { ...c, energy: 4, power: 0 } : c));
  const cf = sweepMassAnswers(cfCards);
  const cases = [
    [real, 1, "OGN-133", true, "floor M1: OGN-133 Flurry of Blades at E1 deals 1 and is not Signature - the cheapest answer in the pool at any floor it reaches"],
    [real, 2, "OGS-002", true, "floor M2: Flurry's 1 no longer reaches, so the cheapest unrestricted answer is OGS-002 Firestorm (dmg 3)"],
    [real, 4, "OGN-123", true, "floor M4: only OGN-123 Unchecked Power (dmg 12) and the scalables reach, and Unchecked Power is the cheapest that forces no legend"],
    [cf, 3, "OGS-002", true, "COUNTERFACTUAL - Tibbers repriced to E4/P0, so a SIGNATURE card is now the cheapest thing that reaches. The answer must still be OGS-002 Firestorm: 103.2.d.2 binds a Signature card to the legend carrying its champion tag, so it is not an answer every opponent holds. It is the ONLY case that fails against the selection this replaced (damage order, no split), where it names OGS-018 Tibbers - measured, not assumed"],
  ];
  console.log(`# --selftest-answer: ${cases.length} hand-derived answer selections (${cases.filter((c) => c[0] === cf).length} counterfactual)`);
  console.log(`# swept answers: ${real.length}, of which Signature: ${real.filter((a) => a.signature).length} (${real.filter((a) => a.signature).map((a) => a.base).join(", ")})`);
  let bad = 0;
  for (const [pool, floor, wantBase, wantSig, why] of cases) {
    const { answer, sigAnswer } = answersFor(pool, floor);
    const gotSig = !!sigAnswer;
    const ok = answer && answer.base === wantBase && !answer.signature && gotSig === wantSig;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"}  floor M${floor}${pool === cf ? " [COUNTERFACTUAL]" : ""}`);
    console.log(`          answer=${answer ? `${answer.base} ${answer.name}` : "none"} want ${wantBase}; signature-flagged=${answer ? answer.signature : "-"} want false; a Signature alternative exists=${gotSig} want ${wantSig}`);
    console.log(`          ${why}`);
  }
  console.log(bad ? `\n# ${bad} FAILED` : "\n# all pass");
  process.exit(bad ? 1 : 0);
}


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

/**
 * What a card does to the curve besides costing something (#339), parsed from its text so that a
 * second printing of either shape is priced the day it ships. Measured 2026-10-13 over the pool:
 * exactly one card Adds on a hold or multiplies hold triggers (UNL-087 Blue Sentinel) and exactly
 * one takes an extra turn (OGN-122 Time Warp).
 *   rain   rainbow Added per hold trigger ("When I hold, [Add] [A] ...")
 *   holdx  extra triggers it gives every hold effect at its battlefield
 *   turn   the card queues an Additional Turn ("Take a turn after this one")
 *   pow    Power Added once a turn by an ability whose ONLY cost is exhausting the card (#501)
 *   ready  whether that Add is usable the turn the card is paid for
 *   rdy    how many units it readies on the turn it is paid (#506, `readiesOf`)
 *   rune   how many runes it readies on the turn it is paid (#513, `runesOf`)
 *   share  whether `rune` and `rdy` are one count, so a rune it readies is a unit it does not
 *   selfReady  a unit that always enters ready, so it never owes 143.4's turn (#506)
 *   acc    a unit that carries [Accelerate], so it may pay to enter ready (#510, `ACCELERATE`)
 *
 * `pow` is income because the card readies at every Awakening (415.3.a) and the pool empties at the
 * end of the turn (167), so it is one Add a turn, never a bank. Swept 2026-10-27 over every [Add] in
 * the pool, it is the six Seals (OGN-040 Seal of Rage and its five domain twins, twelve printings,
 * E0 + 1 Power, Add one rune of their domain) and UNL-049 Honeyfruit (E2, Adds rainbow, "This enters
 * exhausted"). The rest are named and left out on purpose:
 *   Gold tokens, OGN-113 Malzahar   the exhaust is not the whole cost ("Kill this", "Kill a friendly
 *                                   unit or gear"), so the Add spends a permanent
 *   SFD-117 Ancient Henge           converts Energy to rainbow ("Pay any amount of Energy"), no income
 *   UNL-022 Jhin, Murderous Artist  Adds when he MOVES, a trigger and not a schedule
 *   legends (Daughter of the Void, Fire Below the Mountain)  restricted to spells or gear, and a
 *                                   legend is never a cost here
 *   Energy Conduit, Dragonsoul Sage, Lux, Platewyrm Egg, Scorn of the Moon  Add ENERGY, not Power
 * A Seal enters ready (359.2.d, a non-unit gear), so it can pay the turn it lands - recycle one rune
 * for it and exhaust it for the next card's Power; a unit enters exhausted (143.4) and Honeyfruit
 * says so itself, so theirs starts the turn after. Honeyfruit's [Level 6] line also Adds Energy and
 * is not priced, which can only make a row later.
 */
const POWER_ADD = /(?:^|[.)\]]\s*)(?:\[Reaction\](?:\[>\])?\s*)?:rb_exhaust::\s*(?:\[Reaction\]\s*—\s*)?\[Add\]((?:\s*:rb_rune_[a-z]+:)+)(?!\s*:rb_(?:rune|energy))(?![^.]*\.\s*(?:Use|Spend)\b[^.]*\bonly)/i;
/**
 * [ACCELERATE] (#510). 805.1.a: "Accelerate is functionally short for "As you play me, you may pay
 * [1][C] as an additional cost. If you do, I enter ready."" 805.2: "Accelerate is an Optional
 * Additional Cost to be paid as a player plays the unit with the ability." 805.2.a: "Accelerate costs
 * cannot be paid while the unit is on the board, only as part of the steps of playing a card." And
 * 143.4.a, under "Units enter the Board exhausted.": "This can be altered by Accelerate or similar game
 * effects." So a unit carrying it may land ready for one Energy and one Power more, on its own turn.
 *
 * The keyword opens a line of the unit's own text, which is how the 28 units that carry it print it
 * (26 names: Jinx, Demolitionist and Kai'Sa, Survivor have VEN reprints under their own base codes,
 * two of them printing the bare keyword with no reminder). Swept 2026-10-27, every card whose text says
 * "accelerate" is one of them. The anchor keeps out the one GRANT: SFD-029 Rek'Sai, Breacher carries
 * it herself and adds "Friendly units played from anywhere other than a player's hand have
 * [Accelerate].", which this clock never prices, because it plays every card from hand.
 *
 * Its Power must match one of the unit's domains (805.1.a.1). The clock tracks no rune's domain
 * anywhere, and every unit that carries it has one domain inside its own identity, so it is one
 * Power like any other. How the allocator pays it is in deployTurnUncached's `walk`.
 */
const ACCELERATE = /(?:^|\n)\[Accelerate\]/;
function curveOf(c) {
  const t = `${c.text || ""} ${c.effect || ""}`;
  const add = t.match(/When I hold, \[Add\]((?:\s*:rb_rune_rainbow:)+)/i);
  const income = c.type.includes("legend") ? null : t.match(POWER_ADD);
  const pow = income ? income[1].match(/:rb_rune_[a-z]+:/g).length : 0;
  return {
    rain: add ? add[1].match(/:rb_rune_rainbow:/g).length : 0,
    holdx: /Your hold effects for holding here trigger an additional time/i.test(t) ? 1 : 0,
    turn: /Take a turn after this one/i.test(t),
    pow,
    ready: !!pow && c.type.includes("gear") && !c.type.includes("unit") && !/This enters exhausted/i.test(t),
    rdy: readiesOf(c, t),
    ...runesOf(c, t),
    ...triggersOf(c, t),
    selfReady: c.type.includes("unit") && /(?:^|[.)]\s*)I enter ready\./.test(t),
    // Each field on its own: `t` joins them with a space, which the line anchor would not see.
    acc: c.type.includes("unit") && (ACCELERATE.test(c.text || "") || ACCELERATE.test(c.effect || "")),
  };
}

/**
 * READYING (#506): how many of the units that land on the turn this card is paid it readies, so they
 * owe no 143.4 readiness turn. 0 for most cards, READY_ALL for "every unit". It is tied to THAT turn
 * because the effect is one-shot: a spell resolves once, and "this turn" ends with the turn - which is
 * what the clock got wrong before, paying Upstage Comedy on T1 and still charging the last Tryndamere's
 * readiness turn on T6. Swept 2026-10-27 over every card whose text says "ready", three wordings:
 *   "enter ready" for the turn   SFD-004 Bushwhack ("Friendly units enter ready this turn."),
 *                                OGN-129 Confront ("Units you play this turn enter ready.")  -> all
 *   "ready your units"           SFD-204 On the Hunt, SFD-192 Shurelya's Requiem ("When you play
 *                                this, ready your units.")                                   -> all
 *   "Ready a unit"               UNL-009 Upstage Comedy, OGN-146 Wallop, OGN-260 Last Breath ("Ready
 *                                a friendly unit."), VEN-012 Perfect Execution, OGN-173 Ride the Wind
 *                                ("Move a friendly unit and ready it.")                      -> 1
 *                                VEN-150 Acceleration Gate ("Ready up to 4 units, gear, and/or
 *                                runes.")                                                    -> 4,
 *                                one count with the runes it readies since #513 (`runesOf`)
 * Comedy's [Repeat] readies a second unit and its E2 is NOT charged, because this table is a lower
 * bound and an extra cost it cannot make conditional must err cheap.
 *
 * THE LOOSENESS THIS ADMITS, stated because it is the thing to check. "Enter ready" cannot be
 * counted twice: it is one effect on every unit that lands that turn. The other two wordings can,
 * when the line ALSO spends that ready on a step - the clock prices card sets, not steps, the same
 * reason it pays a step's spell on whatever turn is cheapest. Measured 2026-10-27 it moves two ENGINE
 * rows and no finisher: on-the-hunt-yasuo-triple-third-move T6 -> T5 (both On the Hunts are its own
 * moves 2 and 3, so a Yasuo landing on T5 gets two moves, not three) and
 * card-sharp-dropboarder-gold-ready T7 -> T6 (its consumer's Acceleration Gates). Both are EARLIER
 * than the line, which is the direction this table is allowed to err in.
 *
 * Left out on purpose, by name:
 *   units that ready another     OGN-132 First Mate, SFD-062 Bubble Bot, VEN-020 Twilight Reveler,
 *                                VEN-068 Jayce: a unit, so it lands exhausted itself
 *   statics on a unit or legend  OGN-011 Magma Wurm ("Other friendly units"), SFD-171 Renata (tokens),
 *                                UNL-191 Wuju Master (Level 11), every legend that readies
 *   conditional or partial       OGN-153 Overt Operation (spends a buff), UNL-109 Blood Rose (3 XP),
 *                                OGN-021 Sun Disc ([Legion], the next unit), SFD-202 Hostile Takeover
 *                                (an enemy unit), SFD-154 Guards! / SFD-198 Arise! (tokens only)
 *   conditional "I enter ready"  a condition on the unit itself
 * [Accelerate] is an optional additional cost on the unit itself, and it is priced on its own since
 * #510 (`ACCELERATE`, and the `acc` loop in deployTurnUncached's `walk`).
 * The unconditional "I enter ready." (`selfReady`) is the fourth wording and the simplest: OGN-159
 * Warwick, OGS-009 Yi, OGS-016 Vanguard Attendant, SFD-006 Eager Drakehound, UNL-001 Arena Kingpin,
 * UNL-196 Daisy! never owe the turn at all. A [Level] "I enter ready" is a condition and is not one.
 */
function readiesOf(c, t) {
  if (c.type.includes("unit") || c.type.includes("legend")) return 0;
  if (/\b(?:Friendly units enter ready this turn|Units you play this turn enter ready)\b/i.test(t) ||
      /\bready your units\b/i.test(t)) return READY_ALL;
  const upTo = t.match(/(?:^|[.)\]]\s*)Ready up to (\d+) units\b/);
  if (upTo) return Number(upTo[1]);
  if (/(?:^|[.)\]]\s*)(?:Ready (?:a|a friendly) unit|Move a friendly unit and ready it)\b/.test(t))
    return /\[Repeat\]/.test(t) ? 2 : 1;
  return 0;
}

/**
 * READYING RUNES (#513): how many runes a card readies on the turn it is paid, which the clock prices
 * as that much Energy back and no Power (164.2.a/b; how, in deployTurnUncached). The POPULATION is
 * RUNE_READY: a sentence that says "ready" and "rune" with the icons stripped, so `:rb_rune_mind:` in a
 * cost never counts. Swept 2026-10-27 over data/cards.json it is twelve bases, two of them modelled here:
 *   VEN-150 Acceleration Gate   "Ready up to 4 units, gear, and/or runes."    -> 4, shared with `rdy`
 *   UNL-104 Gentle Gemdragon    "When you play me or another Dragon, ready up to 2 runes." -> 2 on
 *                               its own play; the other-Dragon half is `triggersOf`'s (#523)
 * and four more by `triggersOf` (#523): Aphelios's two printings and Curator's two. Every other member
 * is refused BY NAME in RUNE_REFUSED with its reason, and --turns prints any member that is in neither
 * list as unclassified, so a new printing cannot slip past both.
 *
 * THE LOOSENESS THIS ADMITS, the same as `readiesOf`'s: the clock prices card sets, not steps, so a
 * line that spends a Gate's four readies on its own step (a gear, a unit) also gets them here as
 * Energy. That errs EARLY, the direction this table is allowed to err in. Measured 2026-10-27, it
 * moves three finisher rows, all of them through Gemdragon (dragonstorm-brambleback-trinity-conquer,
 * dragonstorm-confront-grand-plaza, gemdragon-henge-vi-blind-fury, T12 -> T11), and 30 ENGINE rows,
 * every one of them on an unchanged closure that holds VEN-150 or UNL-104.
 * #523's other-Dragon half moves those same three finishers again, T11 -> T7, and no ENGINE row: the
 * closure holds three Gemdragons and eleven other Dragons, and with three Gemdragons on the board an
 * E5 Dragon returns 6 (walked in test/turn-clock.test.ts). Aphelios and Curator move no row.
 */
const RUNE_READY = /\bready\b[^.\n]*\brunes?\b|\brunes?\b[^.\n]*\bready\b/i;
const stripIcons = (t) => t.replace(/:rb_[a-z_0-9]+:/g, "");
function runesOf(c, t) {
  if (c.type.includes("legend") || c.type.includes("battlefield")) return { rune: 0, share: false };
  const s = stripIcons(t);
  const gate = !c.type.includes("unit") && s.match(/(?:^|[.)\]]\s*)Ready up to (\d+) units, gear, and\/or runes\./);
  if (gate) return { rune: Number(gate[1]), share: true };
  const play = c.type.includes("unit") && s.match(/(?:^|[.)\]]\s*)When you play me(?: or another [A-Z][a-z]+)?, ready up to (\d+) runes\./);
  if (play) return { rune: Number(play[1]), share: false };
  return { rune: 0, share: false };
}
/**
 * THREE CONDITIONAL RUNE READIERS (#523), each priced only where the row's own declared cards make
 * the trigger certain, because a refused one could only make a row LATER than the line:
 *   SFD-049 / SFD-224 Aphelios, Exalted  "When you attach an Equipment to me, choose one that hasn't
 *                     been chosen this turn — • Ready 2 runes." -> `attR` 2. The ATTACH is the readier:
 *                     an [Equip] cost the set prices, or the play of an Equipment whose attach is not
 *                     priced (819.1.d Quick-Draw attaches on play, and the cost [Weaponmaster] waives,
 *                     821.1.c). It fires only with an Aphelios on the board, and the Ready mode at most
 *                     once a turn per Aphelios, because the mode "hasn't been chosen this turn".
 *   VEN-145 / VEN-192 Curator of the Sands (legend)  "When you play a unit, gear, or activated ability
 *                     with Energy cost [7] or more, you may exhaust me to ready up to 2 runes." -> `bigR`
 *                     2 at `bigAt` 7. The SOURCE is a unit or gear PRINTED at E7+ (206 reads the printed
 *                     cost, which is what the clock charges anyway) or an [Equip] cost of E7+, never a
 *                     spell; once a turn, because the legend exhausts and readies only at the Awaken
 *                     (415.3.a). A legend is never a cost, so the set's legend switches it on.
 *   UNL-104 Gentle Gemdragon, its other-Dragon half  "When you play me or another Dragon" -> `kinR` 2
 *                     for every Gemdragon on the board each time another unit tagged Dragon is played.
 *                     The clock sequences the Gemdragons first in their turn, which is the order that
 *                     fires the most: g Gemdragons onto G0 already there, then d other Dragons, is
 *                     g*G0 + g(g-1)/2 + d(G0 + g) triggers.
 * How the allocator spends them is in deployTurnUncached (`vBig`, `vAtt`, `own0`).
 */
const ATTACH_READY = /When you attach an Equipment to me, choose one that hasn't been chosen this turn —\s*• Ready (\d+) runes\./;
const BIG_READY = /When you play a unit, gear, or activated ability with Energy cost :rb_energy_(\d+): or more, you may exhaust me to ready up to (\d+) runes\./;
const KIN_READY = /(?:^|[.)\]]\s*)When you play me or another ([A-Z][a-z]+), ready up to (\d+) runes\./;
function triggersOf(c, t) {
  const att = c.type.includes("unit") && t.match(ATTACH_READY);
  const big = c.type.includes("legend") && t.match(BIG_READY);
  const kin = c.type.includes("unit") && stripIcons(t).match(KIN_READY);
  return { attR: att ? Number(att[1]) : 0, bigAt: big ? Number(big[1]) : 0, bigR: big ? Number(big[2]) : 0,
           kinTag: kin ? kin[1] : "", kinR: kin ? Number(kin[2]) : 0 };
}
// What a member of RUNE_READY readies, as --turns prints it: 0 for a refused one.
const runeReadies = (c) => {
  const v = curveOf(c);
  return v.rune || v.attR || v.bigR || v.kinR;
};
// Members of RUNE_READY the clock does not price, each with the reason. Every one of these can only
// make a row LATER than the line, so each is a place this table errs the wrong way and is named here.
// A modelled member that is here as well prints its entry as the half the clock still refuses.
const RUNE_REFUSED = {
  "OGN-073": "Sona: at the END of your turn, after the Main Phase, and 167 empties the pool then; they ready at the next Awaken anyway (415.3.a)",
  "VEN-SP2": "Sona's reprint: the same end-of-turn timing",
  "OGS-017": "Dark Child: a legend, never a cost here, and at the end of your turn",
  "OGN-289": "Targon's Peak: a battlefield, and its runes ready at the end of the turn you conquer",
  "OGN-110": "Ekko: [Deathknell], when he dies, and the clock schedules no death",
  "SFD-049": "Aphelios: a row that declares no Equipment, so nothing says an attach to him happens, and his Channel mode, a second attach the same turn",
  "SFD-224": "Aphelios's reprint: the same",
  "UNL-080": "Hwei: when he moves and the card he discards is a gear, a move and a discard the clock does not schedule",
  "VEN-145": "Curator of the Sands: a row with no unit, gear or [Equip] cost printed at Energy 7 or more, such as an [Empower] the clock does not price, and a second play of 7+ the same turn, since she exhausts",
  "VEN-192": "Curator of the Sands's reprint: the same",
  "UNL-104": "a Dragon the row does not declare, and an [anyBodies] body, which the clock never reads as a Dragon",
};

/**
 * WHAT ONE `anyBodies` BODY COSTS, swept, not typed (#494). `anyBodies.count` is a number of unit
 * CARDS the line needs beyond `uses` (src/types.ts, BodyRequirement), and until #494 this table
 * charged none of them: `up-from-the-deep-flow-grand-plaza` read T3 because it priced Up from the
 * Deep alone, while its three bodies make it T4 by hand (docs/plays/2026-10-27-up-from-the-deep-*).
 *
 * The field carries a count and a quoted note and nothing else - no Might, no tag - so a body is the
 * cheapest deckable, constructed-legal, non-Signature unit the identity can play: Energy first, then
 * Power. Swept 2026-10-27 that is E1 in body (UNL-111 Determined Sentry) and calm (VEN-043 Steel
 * Paws) and E2 in the other four, which is CHEAP_BODY_DOMAINS reproduced from the pool rather than
 * read from it; `--selftest-bodies` fails if the two ever disagree. Since #517 that cheapest unit is
 * one CANDIDATE of several, below, and every identity's candidates keep its price.
 *
 * THE IDENTITY IS THE ONE THE ROW'S BASELINE IS MEASURED IN, `domainsOfSet` of the merged set, and
 * that includes a ONE-domain row. Its free second domain could reach an E1 body, but it could reach
 * the T5 Hold curve too, so pricing the bodies there and the baseline here would compare two
 * different decks. An identity with NO domain is priced at what every identity reaches (E2), which
 * is what `baselineTurn` assumes for it as well.
 */
const BODY_PRICE = (() => {
  const best = new Map();
  for (const [base, c] of byBase) {
    if (!c.type.includes("unit") || !c.domains.length || c.signature || BANNED.has(base)) continue;
    const cost = { e: c.energy || 0, p: c.power || 0, base };
    for (const d of c.domains) {
      const b = best.get(d);
      if (!b || cost.e < b.e || (cost.e === b.e && cost.p < b.p)) best.set(d, cost);
    }
  }
  return best;
})();
/**
 * WHICH UNIT A BODY IS, chosen per row and not fixed at the cheapest (#517). A body's price is not one
 * number: the cheapest unit lands exhausted (143.4) and owes the readiness turn if it lands last,
 * while a pricier one may land ready, by paying [Accelerate] (805.1.a, OGN-010 Legion Rearguard: E2
 * exhausted or E3 + 1 Power ready) or by saying "I enter ready." (`selfReady`). Pricing every body at
 * the cheapest made a row read LATE whenever its last unit was a body, which a lower bound may not.
 *
 * So each unit is the set of OPTIONS it offers, (Energy, Power, ready), and a unit is a CANDIDATE
 * unless every option it offers is matched or beaten - no more Energy, no more Power, ready if it is
 * ready - by an option of another candidate, compared over the identity's pool and not one domain's,
 * since a Body/Fury deck plays both. Dropping such a unit is exact: whichever option a body would
 * have taken from it, another candidate offers one at least as good. It stays exact after ignition,
 * where costsOfSet zeroes a post body's Energy, Power or both: the same coordinate goes to zero in
 * its own price and its [Accelerate]'s alike, so an option that covered another still does. The
 * order of the sweep keeps
 * the cheaper of two units that offer the same options, the lower base code on a full tie.
 * Swept 2026-10-27, a domain keeps one to three: Fury OGN-010 Legion Rearguard, UNL-001 Arena Kingpin
 * (E5, enters ready: dearer than the Rearguard Accelerated, but with no Power); Calm VEN-043 Steel
 * Paws, OGN-075 Tasty Faefolk; Mind OGN-096 Watchful Sentry, UNL-082 Lillia, Fae Fawn; Body UNL-111
 * Determined Sentry, UNL-115 Nilah, Joyful Ascetic, OGN-159 Warwick, Hunter; Chaos UNL-127 Mister
 * Root; Order OGN-210 Daring Poro, SFD-177 Azir, Sovereign. --turns and --engines print the set of
 * every identity a row with bodies is priced in.
 *
 * Every row prices EVERY mix of candidates over its bodies (`priceSet`) and keeps the earliest, so a
 * row can land two cheap bodies early and an Accelerated one last. That is exact for the same reason
 * the allocator is: a plan picks one unit per body, and the mixes enumerate every pick.
 */
const bodyOptions = (b) => (b.self ? [[b.e, b.p, 1]] : b.acc ? [[b.e, b.p, 0], [b.e + 1, b.p + 1, 1]] : [[b.e, b.p, 0]]);
const covers = (o, x) => o[0] <= x[0] && o[1] <= x[1] && o[2] >= x[2];
function bodyFront(units) {
  const sorted = [...units].sort((a, b) => a.e - b.e || a.p - b.p || (a.base < b.base ? -1 : 1));
  const coveredBy = (u, others) => bodyOptions(u).every((x) => others.some((k) => bodyOptions(k).some((o) => covers(o, x))));
  const kept = [];
  for (const u of sorted) {
    // A unit is compared to the ones kept before it, every one as cheap or cheaper; once it is kept,
    // a kept one that it and the rest now cover is dropped (Lee Sin, Centered once Warwick, Hunter
    // arrives). Covering is transitive, so a dropped unit always leaves its cover behind.
    if (coveredBy(u, kept)) continue;
    kept.push(u);
    for (let i = kept.length - 2; i >= 0; i--)
      if (coveredBy(kept[i], kept.filter((_, j) => j !== i))) kept.splice(i, 1);
  }
  return kept;
}
const BODY_UNITS = (() => {
  const by = new Map();
  for (const [base, c] of byBase) {
    if (!c.type.includes("unit") || !c.domains.length || c.signature || BANNED.has(base)) continue;
    const { acc, selfReady } = curveOf(c);
    const u = { e: c.energy || 0, p: c.power || 0, base, name: c.name, acc: acc && !selfReady, self: selfReady };
    for (const d of c.domains) by.set(d, [...(by.get(d) || []), u]);
  }
  return by;
})();
const BODY_CANDIDATES = new Map([...BODY_UNITS].map(([d, us]) => [d, bodyFront(us)]));
// An identity with no domain gets what every identity reaches, the dearest of the cheapest, exhausted.
const EVERY_IDENTITY_BODY = (() => {
  const b = [...BODY_PRICE.values()].reduce((a, x) => (x.e > a.e || (x.e === a.e && x.p > a.p) ? x : a));
  return { e: b.e, p: b.p, base: b.base, name: byBase.get(b.base).name, acc: false, self: false };
})();
const bodyKey = (d) => [...d].sort().join("/") || "colourless";
const candidateMemo = new Map();
function candidatesOf(domains) {
  const k = bodyKey(domains);
  if (!candidateMemo.has(k)) {
    // An identity whose domains have no unit at all falls back as one with no domain does; none does today.
    const front = bodyFront([...domains].flatMap((d) => BODY_UNITS.get(d) || []));
    candidateMemo.set(k, front.length ? front : [EVERY_IDENTITY_BODY]);
  }
  return candidateMemo.get(k);
}
const bodyCandidates = (set) => candidatesOf(domainsOfSet(set));
const bodyLabel = (b) => `${b.base} ${b.name} E${b.e}${b.p ? `/${b.p}` : ""}${b.acc ? " [Accelerate]" : b.self ? " enters ready" : ""}`;
/**
 * The bodies a set of folded entries needs: the MAX of their counts, as `bothBodies` merges them in
 * src/combos.ts, because one body standing on a battlefield counts for every line that wants one.
 * `engine` is the part an ignition engine itself declares, which is bought before its own output.
 */
function bodiesOf(ids, engineIds = []) {
  const max = (xs) => xs.reduce((a, id) => Math.max(a, byId.get(id)?.anyBodies?.count ?? 0), 0);
  return { n: max(ids), engine: max(engineIds) };
}

/**
 * THE ONLY cost builder. #205 shipped a defect because there were two and one was patched. `pick` is
 * the unit each body is (#517), one per body; only `priceSet` calls this, because only it knows the
 * mix to try.
 */
const costsOfSet = (set, ign, bodies, pick) => {
  const out = [];
  const equips = [];
  // 821.1.c: [Weaponmaster] attaches one of your Equipment "for one rainbow less", so the cheapest
  // single attach in the set is free. Skipping it entirely keeps this a lower bound.
  const weaponmaster = Object.keys(set).some((b) => {
    const c = byBase.get(b);
    return c && /\[Weaponmaster\]/i.test(`${c.text || ""} ${c.effect || ""}`);
  });
  // THE CONDITIONAL RUNE READIERS (#523, `triggersOf`), switched on by the set's own cards: Curator by
  // the legend, Aphelios's attach by an Aphelios, the Gemdragon half by a Gemdragon. Each flags the
  // costs that can fire it, and deployTurnUncached decides on which turn they do.
  let bigAt = 0, bigR = 0, attR = 0, kinTag = "";
  for (const b of Object.keys(set)) {
    const c = byBase.get(b);
    if (!c) continue;
    const v = curveOf(c);
    if (v.bigR) { bigAt = v.bigAt; bigR = v.bigR; }
    if (v.attR) attR = v.attR;
    if (v.kinR) kinTag = v.kinTag;
  }
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
    // 143.4 exhausts UNITS only, so only a unit costs a readiness turn - and not one that says "I
    // enter ready." (#506).
    // POST-IGNITION. A card outside the engine's own set is bought after the loop is running, so an
    // `infinite-energy` engine pays its Energy and an `infinite-power` engine its Power. `gated`
    // then forbids paying for it before the engine is complete - see the note on the restriction in
    // deployTurnUncached.
    const post = !!(ign && !ign.bases.has(b));
    const ce = post && ign.freeE ? 0 : c.energy || 0;
    const cp = post && ign.freeP ? 0 : c.power || 0;
    const { rain, holdx, turn, pow, ready, rdy, rune, share, selfReady, acc: hasAcc } = curveOf(c);
    // [Accelerate] (#510) is part of playing the unit (805.2.a), so a post-ignition unit pays it out of
    // the same engine output as the rest of its cost. When that output covers both halves it costs
    // nothing, and a unit that enters ready for nothing is a `selfReady` one: it owes no turn and
    // collapses like any other free cost, which keeps the biggest closures off the greedy pass.
    let acc = hasAcc ? { e: post && ign.freeE ? 0 : 1, p: post && ign.freeP ? 0 : 1 } : null;
    const ready0 = selfReady || !!(acc && !acc.e && !acc.p);
    if (ready0) acc = null;
    const { attR: isAph, kinR } = curveOf(c);
    // #523: the PRINTED Energy is what Curator reads (206), whatever the engine pays for it.
    const big = bigR && (c.type.includes("unit") || c.type.includes("gear")) && (c.energy || 0) >= bigAt ? bigR : 0;
    const kin = kinTag && c.type.includes("unit") && (c.tags || []).includes(kinTag) ? 1 : 0;
    // An Equipment attaches on its [Equip] cost when one is priced, and on its own play otherwise.
    const equipment = attR && c.type.includes("gear") && (c.tags || []).includes("Equipment");
    for (let i = 0; i < q; i++) {
      out.push({ e: ce, p: cp, unit: c.type.includes("unit") && !ready0, gated: post, rain, holdx, turn, pow, ready, rdy,
                 rune, share, acc, link: linked ? `${b}#play` : "",
                 big, att: equipment && !linked ? attR : 0, aph: isAph ? 1 : 0, kin, kinR });
      if (linked) equips.push({ e: post && ign.freeE ? 0 : eq.e, p: post && ign.freeP ? 0 : eq.p,
                                unit: false, gated: post, link: `${b}#equip`, after: `${b}#play`,
                                big: bigR && eq.e >= bigAt ? bigR : 0, att: equipment ? attR : 0 });
    }
  }
  // `anyBodies` (#494): generic unit CARDS on the same path as a named unit, so each one owes the
  // readiness turn of 143.4 if it lands last and is post-ignition unless an engine declared it.
  if (bodies && bodies.n) {
    for (let i = 0; i < bodies.n; i++) {
      const body = pick[i];
      const post = !!(ign && i >= bodies.engine);
      // Its [Accelerate] is priced like a named unit's, free when the engine pays both halves, and a
      // body that enters ready by itself owes no turn at all (#517).
      const acc = body.acc ? { e: post && ign.freeE ? 0 : 1, p: post && ign.freeP ? 0 : 1 } : null;
      const ready0 = body.self || !!(acc && !acc.e && !acc.p);
      out.push({ e: post && ign.freeE ? 0 : body.e, p: post && ign.freeP ? 0 : body.p, unit: !ready0,
                 gated: post, rain: 0, holdx: 0, turn: false, pow: 0, ready: false, rdy: 0, rune: 0, share: false,
                 acc: ready0 ? null : acc, link: "" });
    }
  }
  if (weaponmaster && equips.length) {
    // The waived attach still ATTACHES (#523), so an Aphelios trigger keeps it as a free cost; on a tie
    // the waiver goes to the attach that fires him, which leaves the same cost and a cheaper trigger.
    equips.sort((a, b2) => a.e + a.p - (b2.e + b2.p) || (b2.att || 0) - (a.att || 0));
    const w = equips.shift();
    if (w.att) equips.push({ ...w, e: 0, p: 0 });
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
  // A free Sentinel, a free Seal, a free Time Warp or a free Comedy still Adds, queues a turn or
  // readies a unit, and N of them do that N times, so none is interchangeable with one of itself.
  // Nor is a free unit with [Accelerate] (#510): each copy chooses for itself whether to pay it, and
  // nor is a free rune readier (#513), which returns Energy per copy, nor a card that fires or
  // enables a conditional one (#523).
  const collapsible = (c) => !c.e && !c.p && !c.after && !roots.has(c.link || "") &&
                             !c.rain && !c.holdx && !c.turn && !c.pow && !c.rdy && !c.rune && !c.acc &&
                             !c.big && !c.att && !c.aph && !c.kin;
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
 * Every mix of candidate units over a row's bodies (#517): a multiset, since two bodies of one unit
 * are interchangeable, drawn separately for the bodies an ignition engine declares and the ones bought
 * after it, because those two pay different prices.
 */
function bodyMixes(set, bodies) {
  if (!bodies || !bodies.n) return [[]];
  const cands = bodyCandidates(set);
  const multisets = (k, from = 0) => (k === 0 ? [[]] : cands.slice(from).flatMap((c, j) =>
    multisets(k - 1, from + j).map((m) => [c, ...m])));
  const pre = multisets(Math.min(bodies.engine, bodies.n));
  const post = multisets(bodies.n - Math.min(bodies.engine, bodies.n));
  return pre.flatMap((a) => post.map((b) => [...a, ...b]));
}
/**
 * A set's price over every body mix, keeping the earliest: the row's own `pays` (with `gated`, the
 * Beginning-Phase payoff the row will charge), then `all`. The mix with the least `pays` also has
 * the least `all` once ties go to `all`, so the fold searches, which compare `all`, read the same
 * mix the row does.
 */
function priceSet(set, ign, bodies, gated = false) {
  let best = null;
  for (const pick of bodyMixes(set, bodies)) {
    const costs = costsOfSet(set, ign, bodies, pick);
    const d = deployTurn(costs);
    const pays = d.all === Infinity ? Infinity : d.all + (!d.extra && (d.unitLast || gated) ? 1 : 0);
    if (!best || pays < best.pays || (pays === best.pays && d.all < best.d.all)) best = { d, costs, pays, pick };
  }
  return best;
}

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

// --selftest-bodies (#494, #517): the body price and the baseline must describe the SAME deck, so the
// identities the sweep finds an E1 body in must be the ones `baselineTurn` types by hand; and the
// charge must be visible on the hand-walked row, T2 without its three bodies and T3 with them.
if (args.includes("--selftest-bodies")) {
  const e1 = [...BODY_PRICE].filter(([, b]) => b.e <= 1).map(([d]) => d).sort().join(",");
  const typed = [...CHEAP_BODY_DOMAINS].sort().join(",");
  const plaza = byId.get("up-from-the-deep-flow-grand-plaza");
  const bare = priceSet(cardSetOf(plaza), null, { n: 0, engine: 0 }).d.all;
  const plazaPriced = priceSet(cardSetOf(plaza), null, bodiesOf([plaza.id]));
  const charged = plazaPriced.d.all;
  // #510: a body at a price an [Accelerate] unit shares may pay it. dark-child-inferna-off-turn-ambush
  // is three E2 Infernas and one Fury body at E2: T1 takes one card, T2 two, T3 the last, and T3's 6
  // runes also pay Accelerate's E1 + 1, so the body enters ready on T3. Without it, T4.
  const dark = byId.get("dark-child-inferna-off-turn-ambush");
  const pays = (costs) => { const d = deployTurn(costs); return d.all + (d.unitLast ? 1 : 0); };
  const darkCosts = priceSet(cardSetOf(dark), null, bodiesOf([dark.id])).costs;
  const darkAcc = pays(darkCosts);
  const darkPlain = pays(darkCosts.map((c) => ({ ...c, acc: null })));
  // #517: the candidates keep every domain's cheapest price, so offering more units can only make a
  // row earlier; and the issue's own example, Body/Fury, is the E1 Sentry and the E2 Rearguard.
  const cheapKept = [...BODY_PRICE].filter(([d, b]) => !BODY_CANDIDATES.get(d).some((c) => c.e === b.e && c.p === b.p))
    .map(([d]) => d).join(",");
  const bodyFury = bodyCandidates({ "UNL-111": 1, "OGN-010": 1 }).map((b) => b.base).join(",");
  // And no unit is lost by the pruning: in each of the 21 identities, every option of every unit the
  // identity plays is matched or beaten by an option of one of its candidates.
  const doms = [...BODY_UNITS.keys()].sort();
  const idents = doms.flatMap((a, i) => [[a], ...doms.slice(i + 1).map((b) => [a, b])]);
  const uncovered = idents.flatMap((ds) => ds.flatMap((d) => BODY_UNITS.get(d))
    .filter((u) => !bodyOptions(u).every((x) => candidatesOf(ds).some((k) => bodyOptions(k).some((o) => covers(o, x)))))
    .map((u) => `${bodyKey(ds)}:${u.base}`));
  const cases = [
    [`E1 body domains swept [${e1}] = CHEAP_BODY_DOMAINS [${typed}]`, e1 === typed],
    [`up-from-the-deep-flow-grand-plaza completes T${bare} without its bodies, want T2`, bare === 2],
    [`up-from-the-deep-flow-grand-plaza completes T${charged} with 3 bodies [${plazaPriced.pick.map((b) => b.base)}], want T3`, charged === 3],
    [`domains whose candidates lose their cheapest price [${cheapKept}], want none`, cheapKept === ""],
    [`body/fury candidates [${bodyFury}], want [UNL-111,OGN-010,UNL-001]`, bodyFury === "UNL-111,OGN-010,UNL-001"],
    [`units no candidate covers, over ${idents.length} identities: [${uncovered}], want none`, idents.length === 21 && !uncovered.length],
    // The fallback no identity reaches today: a domain with no unit is priced as no domain is.
    [`an identity with no unit gets [${candidatesOf(["no-such-domain"]).map((b) => b.base)}], want [${EVERY_IDENTITY_BODY.base}] as colourless`,
     candidatesOf(["no-such-domain"])[0] === EVERY_IDENTITY_BODY && candidatesOf([])[0] === EVERY_IDENTITY_BODY],
    [`dark-child-inferna-off-turn-ambush pays T${darkAcc} with its Fury body Accelerated, want T3`, darkAcc === 3],
    [`dark-child-inferna-off-turn-ambush pays T${darkPlain} with the body's Accelerate removed, want T4`, darkPlain === 4],
  ];
  for (const [name, ok] of cases) console.log(`  ${ok ? "ok  " : "FAIL"}  ${name}`);
  const bad = cases.filter(([, ok]) => !ok).length;
  console.log(bad ? `# ${bad} FAILED` : "# all pass");
  process.exit(bad ? 1 : 0);
}

// --price BASE:QTY,BASE:QTY prices a card set that is not an entry, through the same costsOfSet and
// deployTurn every row uses, with no bodies, no fold and no ignition (#501). It exists so a hand walk
// can be pinned against REAL card text - the Seal of Rage line PR #500 walked declares no Seal in
// `data/combos.json` - and so a control is the same command with one card removed.
if (args.includes("--price")) {
  const spec = args[args.indexOf("--price") + 1] || "";
  const set = {};
  for (const part of spec.split(",").filter(Boolean)) {
    const fields = part.split(":");
    const [b, q] = fields;
    const c = [...byBase.values()].find((x) => x.base.toLowerCase() === (b || "").toLowerCase());
    // Number() reads 0x1 and 1e0 as 1, and an extra field was dropped by the destructure: anchor to a decimal
    if (!c || fields.length !== 2 || !/^[1-9][0-9]*$/.test(q)) { console.error(`# --price: bad item ${JSON.stringify(part)}, want BASE:QTY with QTY a positive decimal integer`); process.exit(2); }
    set[c.base] = (set[c.base] ?? 0) + Number(q);
    // 103.2.b caps a named card at 3 copies, and an uncapped count is one cost object per copy
    if (set[c.base] > 3) { console.error(`# --price: ${c.base} x${set[c.base]}, a deck holds at most 3 (103.2.b)`); process.exit(2); }
  }
  if (!Object.keys(set).length) { console.error(`# --price: empty spec ${JSON.stringify(spec)}, want BASE:QTY,BASE:QTY`); process.exit(2); }
  // --bodies N adds N `anyBodies` bodies (#517), chosen among the set's candidates as a row's are.
  const nb = args.includes("--bodies") ? args[args.indexOf("--bodies") + 1] || "" : "0";
  // Capped because every mix is priced: the catalogue's largest anyBodies count is 3.
  if (!/^[0-8]$/.test(nb)) { console.error(`# --price: bad --bodies ${JSON.stringify(nb)}, want a decimal integer from 0 to 8`); process.exit(2); }
  const { d, costs, pick } = priceSet(set, null, { n: Number(nb), engine: 0 });
  // `pays` is the row's own formula with no Beginning-Phase payoff: the readiness turn of 143.4 is
  // owed when a unit nothing readied landed with the last cost.
  console.log(`price ${Object.entries(set).map(([b, q]) => `${b}x${q}`).join(" ")}: all T${d.all}, last unit T${d.unit}` +
              `, unitLast ${!!d.unitLast}, pays T${d.all + (d.unitLast ? 1 : 0)}, income ${costs.reduce((a, c) => a + (c.pow || 0), 0)}` +
              (pick.length ? `, bodies ${pick.map((b) => b.base).join("+")} of [${bodyCandidates(set).map(bodyLabel).join(", ")}]` : "") +
              // A guard's greedy answer is not the exact search's, so it says so (#523).
              (d.greedy ? ", GREEDY FALLBACK (a guard tripped: not exact)" : ""));
  process.exit(0);
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
      const t = priceSet(c.cards, null, bodiesOf(c.ids)).d.all;
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
      const t = priceSet(merged, null, bodiesOf([...closureIds, c.id])).d.all;
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
  const rowIds = consumer ? [...closureIds, consumer.id] : closureIds;
  let bodies = bodiesOf(rowIds);
  if (ignition) {
    const engineIds = closureIds.filter((id) => {
      const c = byId.get(id);
      return c && (c.produces || []).some((x) => x === FUEL_E || x === FUEL_P);
    });
    bodies = bodiesOf(rowIds, engineIds);
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
      // A body the engine did not declare is bought after it, like a card outside its set (#494).
      if (Object.keys(cards).some((b) => !baseSet.has(b)) || bodies.n > bodies.engine)
        ign = { bases: baseSet, freeE, freeP };
    }
  }
  const gated = beginningPhaseGated(e) || (consumer ? beginningPhaseGated(consumer) : false);
  // An Additional Turn still queued when the set completes (#339) is itself the next Beginning
  // Phase and the next Awaken, so it owes neither reason and the clock does not move. `priceSet`
  // reads `pays` that way, over every mix of candidate bodies (#517).
  const { d, costs: finalCosts, pays, pick } = priceSet(cards, ign, bodies, gated);
  if (d.greedy) greedyRows.push(e.id);
  // RC_DBG=<id>,<id> prints the parts a row's turn is made of. This is how the five-row gap between
  // --ignition and --ignition-nogate turned out to be the readiness `+1` and not a residual: `all`
  // was identical under both arms and only `unit` moved.
  if (process.env.RC_DBG && process.env.RC_DBG.split(",").includes(e.id))
    console.error(`DBG ${e.id} all=${d.all} unit=${d.unit} unitLast=${d.unitLast} extra=${d.extra} gatedPayoff=${gated} pays=${pays} postUnits=${finalCosts.filter((c)=>c.gated&&c.unit).length} costs=${JSON.stringify(finalCosts.map((c)=>`${c.e}/${c.p}${c.unit?"U":""}${c.gated?"*":""}`))}`);
  const note = [usesBanned(e) && "BANNED in constructed", fuel && `fuel: + ${fuel}`,
                via && `payoff: + ${via}`].filter(Boolean).join("; ");
  // Baseline AND the printed identity both read the MERGED set: the deck you would actually build
  // is the closure, and 103.1.b is what caps it at two domains. `ownDomains` is kept only as the
  // fallback for a row that folds nothing.
  const merged = [...domainsOfSet(cards)];
  clock.push({ id: e.id, cls: e.class, pays, base: baselineTurn(merged), via: note || null,
               ordered: finalCosts.some((c) => c.after), income: finalCosts.some((c) => c.pow),
               readier: finalCosts.some((c) => c.rdy), accel: finalCosts.some((c) => c.acc),
               runer: finalCosts.some((c) => c.rune || c.big || c.att || c.kinR), bodies: pick.length ? bodyKey(domainsOfSet(cards)) : null,
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

function incomeLine(rows) {
  return `# power income (an exhaust-only [Add] of Power, 415.3.a + 167): ${rows.filter((c) => c.income).length} of ${rows.length} rows hold an income card`;
}
function readierLine(rows) {
  return `# readying (a readier paid with the last units waives 143.4): ${rows.filter((c) => c.readier).length} of ${rows.length} rows hold a readier`;
}
// #510: the predicate and the units it matches, read off the same `curveOf` every row is priced with.
const ACCEL_UNITS = [...byBase.values()].filter((c) => curveOf(c).acc).length;
// #513: the population, read off the same text `curveOf` prices, and what became of each member.
function runeLine(rows) {
  const seen = new Map();
  for (const c of byBase.values()) if (RUNE_READY.test(stripIcons(`${c.text || ""} ${c.effect || ""}`))) seen.set(c.base, c);
  const modelled = [...seen.values()].filter((c) => runeReadies(c));
  const refused = [...seen.keys()].filter((b) => RUNE_REFUSED[b] && !modelled.some((c) => c.base === b));
  const loose = [...seen.keys()].filter((b) => !RUNE_REFUSED[b] && !modelled.some((c) => c.base === b));
  const how = (v) => [v.rune && `${v.rune} on its own play${v.share ? ", shared with units" : ""}`,
                      v.kinR && `${v.kinR} on each other ${v.kinTag} played while it is on the board`,
                      v.attR && `${v.attR} on an attach to it, once a turn`,
                      v.bigR && `${v.bigR} on a play of Energy ${v.bigAt}+, once a turn`].filter(Boolean).join(", ");
  return `# readying runes (${RUNE_READY}): ${seen.size} cards say it; ` +
         `modelled ${modelled.length}: ${modelled.map((c) => `${c.base} ${c.name} (${how(curveOf(c))}` +
                                                           `${RUNE_REFUSED[c.base] ? `, NOT ${RUNE_REFUSED[c.base]}` : ""})`).join(", ")}; ` +
         `refused ${refused.length}: ${refused.map((b) => `${b} (${RUNE_REFUSED[b]})`).join(", ")}; ` +
         `unclassified ${loose.length}${loose.length ? `: ${loose.join(", ")}` : ""}; ` +
         `${rows.filter((c) => c.runer).length} of ${rows.length} rows hold a modelled one`;
}
// #517: the units a body is chosen among, for every identity a row with bodies is priced in.
function bodyLines(rows) {
  const ids = [...new Set(rows.map((c) => c.bodies).filter(Boolean))].sort();
  return [`# body candidates (anyBodies, #517: the earliest mix of these per row): ${rows.filter((c) => c.bodies).length} of ${rows.length} rows carry bodies, in ${ids.length} identities`,
          ...ids.map((k) => `#   ${k.padEnd(12)} ${candidatesOf(k === "colourless" ? [] : k.split("/")).map(bodyLabel).join(", ")}`)];
}
function accelLine(rows) {
  return `# accelerate (${ACCELERATE} on a unit, 805.1.a: an optional [1][C] that waives 143.4): ${ACCEL_UNITS} units carry it; ` +
         `${rows.filter((c) => c.accel).length} of ${rows.length} rows hold one`;
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
  console.log(incomeLine(eng));
  console.log(readierLine(eng));
  console.log(accelLine(eng));
  for (const l of bodyLines(eng)) console.log(l);
  console.log(runeLine(eng));
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
              `\n# Every published turn is still exact. Re-measured 2026-10-27 (#510): RC_GUARD=4000000 makes those prices exact too` +
              `\n# (~160s instead of ~0.8s) and the table is BYTE-IDENTICAL, so today it changes nothing - re-run that if the fold changes.`);
// Non-vacuity for the Power income model (#501): it moved no row when it landed, and that null means
// something only while rows that hold an income card exist and the self-test shows it can move one.
console.log(incomeLine(clock));
// The same for readying (#506): it moved no finisher row when it landed.
console.log(readierLine(clock));
// And for [Accelerate] (#510).
console.log(accelLine(clock));
// And the candidates a body is chosen among (#517).
for (const l of bodyLines(clock)) console.log(l);
// And for readying runes (#513).
console.log(runeLine(clock));
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
  // SIXTH SIGNAL. A printed REQUIREMENT for bodies at battlefields is a board gate that none of the
  // five above can see: it is not a Hold, not a Conquer, not an attack, and not a restriction on the
  // card's own abilities. `UNL-088 Gutter Palace` reads "if you have exactly 4 cards in hand and
  // exactly 4 units at battlefields, YOU WIN THE GAME" - so a stall that costs you battlefields costs
  // you the win condition, and both Gutter Palace entries were sitting in BOARD-INDEPENDENT.
  //
  // CLAUDE.md had already diagnosed this ("two more are UNL-088 Gutter Palace, which needs four units
  // AT BATTLEFIELDS") and it had never reached the classifier - the diagnosed-but-unapplied pattern.
  //
  // Narrow on purpose, and swept rather than typed: /units? at battlefields?/i matches 5 name+type
  // groups in the pool and FOUR are damage effects (Unchecked Power, Flurry of Blades, Tibbers, Alpha
  // Strike). Requiring the conditional "if you have ... units at battlefields" leaves exactly one, and
  // an effect that HITS bodies at battlefields is the opposite of a line that NEEDS them there.
  const GARRISON_GATE = /if you have[^.]{0,60}units? at battlefields?/i;
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
  const buckets = { attack: [], conquer: [], hold: [], located: [], garrisoned: [], independent: [] };
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
    // A SECOND SCORING LEG THAT THE BUCKET'S OWN GATE DOES NOT COVER. The HOLD branch below has carried
    // an `also` rider since the precedence fix; ATTACK and CONQUER had none, so a mixed row read as
    // though the bucket's label were the whole story. It is not:
    // draven-yasuo-battle-mistress-contested-chain sits in ATTACK, whose label says "Dead on an empty
    // board" - and `OGN-205 Yasuo, Windrider` scores on "The third time I move in a turn", which needs
    // no enemy garrison at all. The entry's own terminatesIn says so: "the same board unopposed yields
    // only five".
    //
    // The gate is PER BUCKET, which is the whole difficulty. A first version excluded only attack
    // wording and reported 10 of 18 CONQUER rows - every one of them a Conquer-scoring card, i.e. the
    // bucket's own gate flagged as if it were a second leg. Narrowed, it is ATTACK 1 of 8 and CONQUER 2
    // of 18, and all three were read: Yasuo twice, and Ahri's "When I hold, you score 1 point" under
    // Skyfall of Areion, which makes her hold effect a conquer effect AND leaves it a hold effect.
    //
    // "you score" on purpose: `SFD-148 Draven, Audacious` also prints "They score 1 point", which is
    // the OPPONENT scoring - a drawback - and a naive /score \d+ point/ counts it as a payoff.
    const SCORES = /you score \d+ point|you win the game/i;
    const freeLeg = (gate) => {
      const out = new Set();
      for (const u of e.uses || []) {
        const c = byBase.get(u.card);
        if (!c) continue;
        for (const sent of `${c.text || ""} ${c.effect || ""}`.split(/(?<=\.)\s+/))
          if (SCORES.test(sent) && !gate.test(sent)) out.add(c.name);
      }
      return [...out];
    };
    // A FUEL ENGINE HAS NO BOARD VERDICT TO GIVE, because it never finishes. Ten of the 80 rows in this
    // classification produce only fuel - infinite-energy, infinite-power, token-body-engine,
    // repeatable-removal, infinite-recycle - and score nothing at all; asking "does a stall switch this
    // finisher off" of a line that never scores is a malformed question, and answering it puts a board
    // verdict in front of a reader who should be told to go and look at the CONSUMER.
    //
    // Read off `produces`, which is structured, rather than off prose. A prose predicate over
    // terminatesIn agrees on 9 of the 10 and differs on gemdragon-henge-vi-blind-fury for a nameable
    // reason: its own text mentions the points that the entry it BUYS scores. `produces` has no such
    // ambiguity. (The tag names were measured, not guessed - a first pass looked for "points" and the
    // vocabulary says `ability-points` and `burst-points`, which over-counted 53 of 80.)
    const POINTY = new Set(["ability-points", "burst-points", "win-the-game"]);
    const fuelOnly = !(e.produces || []).some((t) => POINTY.has(t));
    const fuelRider = fuelOnly ? `  [SCORES NOTHING: produces ${(e.produces || []).join(", ") || "nothing"} - the board question belongs to its consumer]` : "";
    const rider = (gate) => {
      const l = freeLeg(gate);
      return l.length ? `  [+ scores without that gate too - ${l.join(", ")} - read it]` : "";
    };
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
    } else if (why.length) buckets.attack.push(row + fuelRider + rider(ATTACK) + gateRider(e, text));
    else if (conq) buckets.conquer.push(row + tag(conq) + fuelRider + rider(new RegExp(`${ATTACK.source}|${CONQUER.source}`, "i")) + gateRider(e, text));
    // CARD TEXT BEATS PROSE, and this ordering is the reason. `gutter-palace-reaction-dials` landed in
    // HOLD because its steps say "End your turn HOLDING ready runes rather than spending them" - the
    // other sense of the word entirely - while no card it uses prints a hold clause and UNL-088 prints
    // the garrison gate outright. A homonym in an author's prose was outranking a printed requirement.
    // So a card-text garrison gate is tested BEFORE a hold inferred only from steps; a hold found in
    // CARD text still wins, because then both signals are card facts and the hold is the scoring one.
    else if (hold === "cards") buckets.hold.push(row + tag(hold) + fuelRider + gateRider(e, text));
    else if (LOCATION_GATE.test(text)) buckets.located.push(`${e.class.padEnd(8)} ${e.id}${fuelRider}${gateRider(e, text)}`);
    else if (GARRISON_GATE.test(text)) buckets.garrisoned.push(`${e.class.padEnd(8)} ${e.id}${fuelRider}  <- ${text.match(GARRISON_GATE)[0].trim()}`);
    else if (hold) buckets.hold.push(row + tag(hold) + fuelRider + gateRider(e, text));
    else buckets.independent.push(row + fuelRider);
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
    garrisoned: "GARRISON-GATED. The printed win condition REQUIRES a number of your units to be standing at battlefields, which is not a Hold, a Conquer, an attack, or a restriction on the card's own abilities - so all five predicates above are blind to it. A stall that costs you battlefields costs you the win condition outright.",
    independent: "STALL-INDEPENDENT, which is a weaker claim than board-independent and is the one this mode supports. No Hold, no Conquer, no attack, no location gate and no garrison requirement in the printed text, so losing battlefields does not switch it off - but something else on the board still can. bottled-constellation-time-warp needs three friendly units or gear to KILL, so removal answers it while a stall does not. The label said BOARD-INDEPENDENT until 2026-09-14. This bucket has now overclaimed THREE times by being the else branch of too few predicates; treat a row landing here as a claim to check, not a conclusion.",
  };
  for (const k of ["attack", "conquer", "hold", "located", "garrisoned", "independent"]) {
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
    // garrison Might floor: see garrisonFloor - uses[] rows AT A BATTLEFIELD plus tokens a card this
    // entry actually PLAYS. A null floor means CANNOT DETERMINE and must stay null.
    const { floor, toks } = garrisonFloor(e, used, scaling);
    const scaled = used.filter((c) => scaling.has(c.base)).map((c) => c.name);
    const blob = JSON.stringify(e);
    // A self-scaling body makes the PRINTED floor meaningless, so do not name an answer off it. This
    // is the exact defect this mode was built after: a notable reading "ONE ENERGY ANSWERS THE
    // MIGHT-1 BODY THIS LINE NEEDS (Spiderling (M1))" shipped on spiderling-swarm-grand-plaza, where
    // the seven bodies The Grand Plaza requires are M7 each, because Spiderling reads "I have +1
    // Might for each other unit you control here with my name". Reporting no answer is correct here;
    // asserting the cheapest one is how the false notable happened.
    // ONE selection, shared with --holds-notables (see answersFor). `cheapest` is the cheapest answer
    // NO LEGEND IS REQUIRED TO RUN; a Signature alternative is reported beside it rather than as the
    // headline, because 103.2.d.2 binds it to one legend.
    const picked = floor === null || scaled.length ? { answer: null, sigAnswer: null } : answersFor(massAnswers, floor);
    const cheapest = picked.answer;
    const sigAnswer = picked.sigAnswer;
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
      // ARITHMETIC, not availability - the same gate as the emitter's, and for the same reason. A
      // protection answers only if it lifts the garrison ABOVE what the answer deals (143.2.a kills on
      // marked damage at or above Might). Every garrison-wide protection in this pool is +1 or +2, so
      // against OGN-123 Unchecked Power's 12 NOTHING reaches, and this line was printing "identity
      // HOLDS a protection" beside a 12-damage sweep. It even listed VEN-130 Aurok General, whose
      // grant reaches only Empowered units and is inert on a Recruit or Mech garrison.
      if (floor !== null && cheapest && floor + x.plus <= cheapest.dmg) return false;
      if (seenName.has(x.name)) return false;
      seenName.add(x.name);
      return true;
    });
    rows.push({ id: e.id, cls: e.class, identity: [...domains].sort().join("/") || "colourless",
      floor, tokens: toks, scaled, cheapest, sigAnswer, named,
      protection: prot.map((x) => {
        const scope = /token/i.test(x.clause) ? " [TOKEN bodies only]" : /Mechs/i.test(x.clause) ? " [MECH bodies only]" : /units here/i.test(x.clause) ? " [that battlefield only]" : "";
        return `${x.base} ${x.name} +${x.plus}${scope}`;
      }) });
  }
  console.log(`\n# --holds: ${rows.length} finishers whose scoring payoff is a Hold.`);
  console.log("# Garrison Might FLOOR is read from the entry's OWN BOARD: uses[] rows at zone BATTLEFIELD, plus");
  console.log("# token bodies a card the entry USES actually PLAYS (439.2.c), excluding any the card sends to your");
  console.log("# base, since the answer cards all sweep \"at a battlefield\". A null floor prints as M? and means");
  console.log("# CANNOT DETERMINE - guessing one is how this mode shipped a false notable. Pinned by");
  console.log("# --selftest-garrison against hand-derived floors on real entries.");
  console.log("# This header described a TEXT SCAN OF THE ENTRY'S PROSE until 2026-09-14. That scan included");
  console.log("# prerequisites.notable, which THIS SCRIPT WRITES, so the mode was reading its own output.");
  console.log(`# Mass answers swept: ${massAnswers.length}. Garrison-wide protections swept: ${protection.length}.\n`);
  const unanswered = [];
  for (const r of rows.sort((a, b) => (a.floor ?? 99) - (b.floor ?? 99))) {
    const sc = r.scaled.length ? `  [SELF-SCALING: ${r.scaled.join(", ")} - printed Might understates it, read the entry]` : "";
    const ans = r.cheapest
      ? `${r.cheapest.base} ${r.cheapest.name} E${r.cheapest.e}/P${r.cheapest.p} dmg${r.cheapest.dmg === Infinity ? "-kill" : r.cheapest.dmg}`
      : r.scaled.length
        ? "NOT COMPUTABLE from printed Might - this line's bodies scale with the garrison"
        // THREE REASONS, NOT ONE, and the mode was printing the same sentence for two of them. A reader
        // told "no swept mass answer reaches it" concludes the garrison is too big for everything in
        // the pool; when the floor is null the truth is that WE DO NOT KNOW HOW BIG IT IS, and every
        // one of the five rows printing that sentence was in fact a null floor. Asserting a conclusion
        // the mode cannot support is the same family as every other defect in this file.
        : r.floor === null
          ? "CANNOT DETERMINE - the garrison floor is unknown (no unit at zone BATTLEFIELD in uses[] and no token played by a card this entry uses), so no answer can be ranked. This is NOT 'nothing answers it'"
          : "no swept mass answer reaches it";
    console.log(`${r.cls.padEnd(8)} ${r.identity.padEnd(12)} floor M${r.floor ?? "?"}  ${r.id}`);
    // THE LABEL NAMES ITS AXIS. This said "cheapest answer" and the card is not the cheapest in the
    // pool - it is the cheapest one that does not force the opponent's legend, which is the useful
    // question and a different one. Saying "cheapest" invited the reader to conclude nothing cheaper
    // exists, and on 23 of 37 rows something does.
    console.log(`     cheapest unrestricted answer: ${ans}${!r.cheapest ? "" : r.named ? "  [entry names it]" : "  <- NOT NAMED"}${sc}`);
    if (r.sigAnswer) console.log(`     cheaper but SIGNATURE (103.2.d.2 forces the opponent's legend, so it is not every deck's): ${r.sigAnswer.base} ${r.sigAnswer.name}`);
    if (r.protection.length) console.log(`     identity HOLDS a protection: ${r.protection.slice(0, 3).join("; ")}`);
    if (r.cheapest && !r.named) unanswered.push(r);
  }
  console.log(`\n# ${unanswered.length} of ${rows.length} do not name the cheapest card that answers them.`);
}


// ---------------------------------------------------------------- --recheck-garrison
/**
 * STALE GARRISON NOTABLES, which the APPEND-only emitter can never clean up after itself.
 *
 * --holds-notables only ever ADDS, so when the garrison floor was wrong and then repaired, the wrong
 * sentence stayed on the entry and the right one was appended beside it. Three entries now carry BOTH
 * - "1 ENERGY ANSWERS THE GARRISON ... AND THE BODIES ARE TOKENS" next to a correct 6- or 7-Energy
 * answer - so the page tells a player two incompatible things about the same board.
 *
 * Two tests, both arithmetic against the CURRENT board rather than against prose:
 *   - it claims TOKEN bodies and no card the entry uses plays a token (the phantom-token defect), or
 *   - the damage it names is below the garrison floor, so the answer it offers kills nothing.
 * A notable that passes both still agrees with the board and is left alone.
 *
 * This is a one-shot repair exactly like --recheck-notables, so it carries the same state tokens and
 * will print [SPENT] once applied. Emitting REPLACE rows rather than appending again: appending is
 * what produced the contradiction.
 */
if (args.includes("--recheck-garrison")) {
  const scalingR = new Set(selfScaling(cards).map((c) => c.base));
  const rows = [];
  let carrying = 0;
  for (const e of db.combos) {
    const notables = ((e.prerequisites || {}).notable) || [];
    const gs = notables.map((n, i) => [n, i]).filter(([n]) => n.includes("ANSWERS THE GARRISON"));
    if (!gs.length) continue;
    carrying++;
    const used = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean);
    const { floor, toks } = garrisonFloor(e, used, scalingR);
    for (const [n, at] of gs) {
      const why = [];
      if (n.includes("THE BODIES ARE TOKENS") && !toks.length)
        why.push("it claims the bodies are TOKENS, and no card this entry uses plays one (439.2.c) - the phantom-token defect");
      const d = n.match(/at or below Might (\d+)/);
      if (floor !== null && d && Number(d[1]) < Math.max(floor, 1))
        why.push(`the answer it names deals ${d[1]} and the garrison floor is ${floor}, so 143.2.a kills nothing`);
      if (!why.length) continue;
      rows.push({
        entry: e.id,
        action: "REPLACE one notable in prerequisites.notable - the shipped sentence no longer matches the board",
        notable_index: at,
        match_contains: n.slice(0, 60),
        why: `${why.join("; ")}. The garrison floor is now read from the entry's own board (uses[] rows at zone BATTLEFIELD plus tokens a card it uses actually plays), and this sentence predates that. --holds-notables only APPENDS, so the correct answer was added beside this one rather than replacing it.`,
        replacement: null,
        note: "Replacement text: re-run `npm run adversarial -- --holds-notables` for this entry's current answer, or DELETE this notable if the entry already carries a correct one - three of these sit beside a correct sentence and are a contradiction rather than a gap.",
      });
    }
  }
  const out = outPath("recheck-garrison");
  writeFileSync(out, JSON.stringify(rows, null, 1) + "\n");
  if (rows.length) console.log(`\n# --recheck-garrison: ${rows.length} stale garrison notable${rows.length === 1 ? "" : "s"} across ${new Set(rows.map((r) => r.entry)).size} entries (of ${carrying} carrying one) -> ${out}`);
  else if (carrying) console.log(`\n# --recheck-garrison: 0 stale [SPENT] - all ${carrying} entries carrying a garrison notable still agree with their board. -> ${out} (empty)`);
  else console.log(`\n# --recheck-garrison: 0 stale [INDETERMINATE] - NO entry carries a garrison notable at all, so this 0 says nothing. -> ${out} (empty)`);
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
  const undetermined = [];
  for (const e of db.combos) {
    if (!FINISHER.has(e.class)) continue;
    const used = (e.uses || []).map((u) => byBase.get(u.card)).filter(Boolean);
    const isHoldBf = used.some((c) => (c.type || []).includes("battlefield") && /when you hold here/i.test(`${c.text || ""} ${c.effect || ""}`));
    const t = used.map((c) => `${c.text || ""} ${c.effect || ""}`).join(" ");
    if (!isHoldBf && !/when i hold|when you hold/i.test(t)) continue;
    const domains = new Set(); for (const c of used) for (const d of c.domains || []) domains.add(d);
    const prose = `${(e.steps || []).join(" ")} ${e.terminatesIn || ""}`;
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
    const { floor, toks, printed } = garrisonFloor(e, used, scaling);
    // CANNOT DETERMINE: no body at a battlefield and no token this entry's own cards play. Guessing a
    // floor here is exactly how the Mech notable happened, so it is counted and reported, not invented.
    if (floor === null || scaled.length) { if (floor === null) undetermined.push(e.id); continue; }
    // Did a TOKEN set the floor, or a printed unit? The headline says "the bodies are tokens" and it
    // must only say so when that is true - the token half is the reason uses[] cannot see the body.
    // STRICTLY below, not merely equal. The headline this feeds says "THE BODIES ARE TOKENS SO NO
    // uses[] ROW SHOWS IT", and that is only true when the token is the REASON the floor is that low.
    // Two entries were about to be told it while uses[] showed a printed Might-3 body at a battlefield
    // setting the identical floor - true by a hair, and false in the reason it gives, which is the same
    // defect class as everything else this emitter has shipped. Caught by reading the output.
    const tokenFloor = toks.length > 0 &&
      Math.min(...toks.map((k) => TOKEN_MIGHT[k])) === floor &&
      (!printed.length || Math.min(...printed) > floor);
    // Rank by what the opponent actually pays to clear THIS floor, and prefer an answer any deck may
    // run: a Signature answer forces the opponent's legend (103.2.d.2), so it is reported separately
    // rather than as the headline.
    const { answer, sigAnswer } = answersFor(massAnswers, floor);
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
      // ARITHMETIC, not availability. A protection is only an ANSWER if it lifts the garrison ABOVE the
      // damage the answer deals - 143.2.a kills on marked damage at or above Might, so +1 on a Might-4
      // body against a 12-damage sweep changes nothing at all. Every garrison-wide protection in this
      // pool is +1 or +2 (measured: 105 and 11 instances), so NOTHING protects a garrison from
      // OGN-123 Unchecked Power, and four rows were about to be told "THE IDENTITY DOES HOLD AN
      // ANSWER" and handed three cards that cannot reach. That is the true-and-empty class this
      // emitter keeps producing: the card facts are right and the premise about the board is wrong.
      if (floor !== null && answer && floor + x.plus <= answer.dmg) continue;
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
        (answer.enemyOnly
          ? `It reads "enemy units", so it costs the opponent NOTHING on their own board - there is no board state in which they would decline to cast it for that reason. `
          : `IT IS SYMMETRIC, WHICH IS HALF THE PRICE AND THE QUOTED TEXT SAYS SO: it sweeps ALL units at battlefields, the caster's included. Against a deck with a board of its own it is a two-sided trade and they may not want it; against one playing from hand it is free. Read the matchup, not the Energy. `) +
        (sigAnswer && sigAnswer.e + Math.max(floor, 1) < answer.e + answer.p
          ? `A CHEAPER ANSWER EXISTS AND IT IS NOT AVAILABLE TO EVERY OPPONENT: ${sigAnswer.base} ${sigAnswer.name} costs ${sigAnswer.e} Energy + ${Math.max(floor, 1)} Power here${sigAnswer.scalable ? " (it pays per point of damage, so it scales to any garrison)" : ""}${sigAnswer.action ? " and is [Action], so 806.1.c.1 puts it inside any showdown on any player's turn" : ""} - but it is a SIGNATURE card tagged ${sigAnswer.tag}, and 103.2.d.2 requires every Signature card to carry the Chosen Champion Legend's tag. ` +
            // NAME the legend and its domains rather than leaving "a <tag> legend" abstract. The tag is
            // one step; what a reader can act on is the identity it forces. Derived from the pool at
            // run time, never typed - a legend census typed from memory is a defect class this project
            // has paid for repeatedly, and legend NAMES carry two base codes each (103.2.b caps by
            // name), so the names are folded.
            ((who) => who.length
              ? `That is ${who.length === 1 ? "one legend" : `${who.length} legends`}: ${who.map((x) => `${x.name} (${x.domains.join("/")})`).join(", ")} - so an opponent holding it is committed to that identity under 103.1.b, which is a much narrower matchup than "somebody might have it". `
              : `NO legend in the pool carries that tag, so no legal deck can run this card at all and it is not a matchup - it is dead letter. `)(
              [...new Map(cards.filter((x) => (x.type || []).includes("legend") && (x.tags || []).includes(sigAnswer.tag))
                .map((x) => [x.name, { name: x.name, domains: x.domains || [] }])).values()]) +
            `Count it as a matchup, not as the field. `
          : "") +
        (prot.length
          ? `THE IDENTITY DOES HOLD AN ANSWER: ${prot.slice(0, 3).map((x) => `${x.base} ${x.name} +${x.plus}${scope(x)}`).join(", ")} - a permanent, garrison-wide +Might is the only thing that lifts every body at once, since a single-target pump is useless against a sweep that hits all of them. ` +
            (needsBf
              ? `(A battlefield-based protection is NOT available here, because this line already requires a battlefield: 485.4.a gives each player three and "Only 1 will be used, chosen during setup", and 103.4.c forbids duplicate names, so two of your own battlefields never share a board.) `
              : prot.some((x) => (byBase.get(x.base)?.type || []).includes("battlefield"))
                ? `(A battlefield protection is a 1-in-3: 485.5 has each player "randomly select one (1) of their three (3) Battlefields", so it is not a card you can count on drawing.) `
                : "")
          : `THE IDENTITY HOLDS NO ANSWER, and there are two ways that happens: either nothing with a permanent, garrison-wide +Might is legal beside this line under 103.1.b, or something is legal and cannot REACH - every such protection in the pool is +1 or +2, so against a sweep dealing ${answer.dmg} a garrison whose floor is ${floor} stays dead either way (143.2.a kills on damage at or above Might). This line cannot be protected against that answer and can only be rebuilt. `) +
        TIMING,
      ],
    });
  }
  // A row this mode REFUSED to guess at is as much a result as one it emits, and a reader who sees
  // only the emitted rows cannot tell a clean sweep from a mode that could not read the board.
  if (undetermined.length)
    console.log(`\n# --holds-notables: ${undetermined.length} Hold entries were SKIPPED because their garrison could not be` +
                `\n# determined from the board - no unit at zone BATTLEFIELD in uses[] and no token played by a card they` +
                `\n# use (439.2.c). Naming an answer for those is how the Mech notable happened. ${undetermined.slice(0, 6).join(", ")}` +
                `${undetermined.length > 6 ? `, and ${undetermined.length - 6} more` : ""}`);
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
