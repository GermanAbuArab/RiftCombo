// Adversarial check over every finisher in the catalogue (issue #200, lane rc-synth).
//
//   node scripts/adversarial-check.mjs            report everything
//   node scripts/adversarial-check.mjs --strict   exit 1 if any finisher has an unanswered hole
//   node scripts/adversarial-check.mjs --turns    only the turn-clock section
//   node scripts/adversarial-check.mjs --recheck-notables   corrections that REPLACE a stale shipped notable
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
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const onlyTurns = args.includes("--turns");
const emit = args.includes("--emit-notables");
const stalled = args.includes("--stalled");
const recheck = args.includes("--recheck-notables");
const holds = args.includes("--holds");
const holdNotables = args.includes("--holds-notables");

const cards = JSON.parse(readFileSync("data/cards.json", "utf8")).cards;
const db = JSON.parse(readFileSync("data/combos.json", "utf8"));
const byBase = new Map();
for (const c of cards) if (!byBase.has(c.base)) byBase.set(c.base, c);

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
function deployTurn(costs) {
  const remaining = costs.map((c) => ({ ...c })).sort((a, b) => b.e + b.p - (a.e + a.p));
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
        if (c.e <= energy && c.p <= recyclable) {
          energy -= c.e;
          recyclable -= c.p;
          runes -= c.p; // recycled runes leave the board
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

// The do-nothing Hold curve, from docs/plays/2026-09-12-the-unopposed-clock.md. The pool prints
// exactly TWO units at Energy cost 1 or less out of 513 deckable units - UNL-111 Determined Sentry
// (Body) and VEN-043 Steel Paws (Calm) - so an identity that reaches one of them plays two bodies on
// turn 1, conquers both battlefields on turn 2 and holds to 8 on turn 5. Everything else is turn 6.
const CHEAP_BODY_DOMAINS = new Set(["body", "calm"]);
const baselineTurn = (domains) => ([...domains].some((d) => CHEAP_BODY_DOMAINS.has(d)) ? 5 : 6);

// ---------------------------------------------------------------- run it
const findings = [];
const clock = [];
const entries = [];
for (const e of db.combos) {
  if (!FINISHER.has(e.class)) continue;
  const blob = JSON.stringify(e.prerequisites) + JSON.stringify(e.steps) + (e.notes || "") + (e.terminatesIn || "");

  const domains = new Set();
  const costs = [];
  const equipment = [];
  const fragile = [];
  for (const u of e.uses || []) {
    const c = byBase.get(u.card);
    if (!c) continue;
    for (const d of c.domains) domains.add(d);
    if (c.type.includes("legend") || c.type.includes("battlefield")) continue;
    for (let i = 0; i < u.quantity; i++) costs.push({ e: c.energy || 0, p: c.power || 0 });
    if (c.type.includes("gear") && c.tags.includes("Equipment")) equipment.push(`${c.name} x${u.quantity}`);
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
    holes.push(`stands on Equipment (${equipment.join(", ")}) and names no gear answer`);
  if (fragile.length && !namesAnswer(blob, [SWEEPER]).length)
    holes.push(`stands on a Might-1-or-less body at a battlefield (${fragile.join(", ")}) and never names OGN-133 Flurry of Blades`);
  if (holes.length) findings.push({ e, holes });

  if (e.class !== "ALT_WIN") entries.push({ e, domains, costs });
}

// ---------------------------------------------------------------- the clock, with the DAG folded in
// An entry that produces only FUEL (infinite-energy, infinite-power, a token engine) has no clock of
// its own: ten of the fourteen INFINITEs are in that shape, and measuring only the engine understates
// them by the whole cost of whatever consumes the fuel. So for those, add the cheapest consumer that
// actually produces points AND can legally share a deck - 103.1.b caps the union of the two entries'
// domains at the legend's two.
const POINTY = new Set(["ability-points", "burst-points", "win-the-game"]);
const producesPoints = (e) => e.produces.some((p) => POINTY.has(p));
const consumers = db.combos.filter((c) => c.needs.length && producesPoints(c));
const domainsOf = (e) => {
  const d = new Set();
  for (const u of e.uses || []) for (const x of (byBase.get(u.card)?.domains || [])) d.add(x);
  return d;
};
const costsOf = (e) => {
  const out = [];
  for (const u of e.uses || []) {
    const c = byBase.get(u.card);
    if (!c || c.type.includes("legend") || c.type.includes("battlefield")) continue;
    for (let i = 0; i < u.quantity; i++) out.push({ e: c.energy || 0, p: c.power || 0 });
  }
  return out;
};

for (const { e, domains, costs } of entries) {
  let allCosts = costs;
  let via = null;
  if (!producesPoints(e)) {
    let best = null;
    for (const c of consumers) {
      if (c.id === e.id) continue;
      if (!c.needs.every((n) => e.produces.includes(n))) continue;
      const union = new Set([...domains, ...domainsOf(c)]);
      if (union.size > 2) continue; // 103.1.b: a legend has exactly two domains
      const merged = costs.concat(costsOf(c));
      const t = deployTurn(merged);
      if (!best || t < best.t) best = { t, id: c.id, merged };
    }
    if (best) { allCosts = best.merged; via = best.id; }
    // ONE HOP ONLY. This does not chain two fuel producers together, so an engine whose consumer
    // needs more fuel tags than it alone produces reads as having no consumer even when the
    // catalogue routes it through a second engine - lux-infinite-power needs lux-infinite-energy
    // beside it to feed time-warp-hold-burst. src/combos.ts generateVariants is the real walker;
    // cross-check there before quoting a "no consumer" as a structural claim.
    else via = "no ONE-HOP consumer (see generateVariants)";
  }
  // A Hold pays at your NEXT Beginning Phase and a Conquer needs bodies that are already ready
  // (143.4 enters them exhausted), so the payoff is one turn after the last piece lands.
  const pays = deployTurn(allCosts) + 1;
  clock.push({ id: e.id, cls: e.class, pays, base: baselineTurn(domains), via,
               domains: [...domains].sort().join("/") || "colourless" });
}

if (!onlyTurns) {
  console.log(`# Unanswered holes: ${findings.length} of ${db.combos.filter((c) => FINISHER.has(c.class)).length} finishers`);
  console.log(`# gear-kill answer set: ${gearKills.length} base codes, domains ${[...new Set(gearKills.flatMap((g) => g.domains))].sort().join(" ")}`);
  console.log(`# gear-detach answer set: ${gearDetach.length} base codes swept, ${detachAnswers.length} enemy-facing (${detachAnswers.map((d) => `${d.base} ${d.name}`).join(", ") || "none"})\n`);
  for (const f of findings) for (const h of f.holes) console.log(`${f.e.class.padEnd(8)} ${f.e.id}\n         ${h}`);
}

const slower = clock.filter((c) => c.pays > c.base);
console.log(`\n# Turn clock (optimistic lower bound: perfect draws, nothing else cast, no interaction)`);
console.log(`# ${slower.length} of ${clock.length} point-scoring finishers pay LATER than the do-nothing Hold curve in their own identity`);
for (const cls of ["INFINITE", "BURST", "CHAIN"]) {
  const all = clock.filter((c) => c.cls === cls);
  console.log(`#   ${cls.padEnd(9)} ${String(all.filter((c) => c.pays > c.base).length).padStart(2)} of ${String(all.length).padStart(2)}`);
}
console.log();
for (const c of clock.sort((a, b) => b.pays - a.pays || a.id.localeCompare(b.id)))
  console.log(`  T${String(c.pays).padStart(2)} vs T${c.base} baseline  ${c.pays > c.base ? "SLOWER" : "      "}  ${c.cls.padEnd(8)} ${c.domains.padEnd(12)} ${c.id}${c.via ? `  [fuel only: + ${c.via}]` : ""}`);

// ---------------------------------------------------------------- the Reaction/detach notable
// Hoisted because TWO modes need the identical sentence: --emit-notables writes it into an entry that
// has no gear answer at all, and --recheck-notables replaces the STALE, narrower version of it that
// 14 entries already carry. One source of truth, so the two can never drift apart.
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

// ---------------------------------------------------------------- --emit-notables
// A player reading riftcombo.app never runs npm, so a hole only this script knows about is invisible
// to the only audience that matters. This writes the findings out as a corrections file in the shape
// the manager merges, so the script stays the source of truth and the entries still carry the
// warning. Generated prose is still prose: READ WHAT IT EMITS before handing it over.
if (emit) {
  // The swept set is 16, but several of those only reach a FRIENDLY gear or are gated (Jayce and
  // Malzahar kill your own, Zaun Punk's is an additional cost, Bottled Constellation is a payoff,
  // Pickpocket caps at Energy cost 1 and Noxian Demolitionist at its own Might, Decree of Unity
  // reaches only an enemy Chaos card). Listing all 16 as "answers" would be false, so the notable
  // names the unconditional enemy-facing subset and points at this script's predicate for the rest.
  const ENEMY_FACING = ["OGN-022", "SFD-005", "VEN-003", "OGN-224", "SFD-032", "SFD-077"];
  const facing = gearKills.filter((g) => ENEMY_FACING.includes(g.base))
    .map((g) => `${g.base} ${g.name} (${g.domains.join("/")})`).join(", ");
  const rows = [];
  for (const f of findings) {
    const notables = [];
    const eqHole = f.holes.find((h) => h.startsWith("stands on Equipment"));
    if (eqHole) {
      const eq = eqHole.match(/\((.*)\) and names no/)[1];
      const copies = [...eq.matchAll(/x(\d+)/g)].reduce((n, m) => n + Number(m[1]), 0);
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
    const mightHole = f.holes.find((h) => h.startsWith("stands on a Might-1 body"));
    if (mightHole) {
      const bodies = mightHole.match(/\((.*)\) and never names/)[1];
      notables.push(
        `ONE ENERGY ANSWERS THE MIGHT-1 BODY THIS LINE NEEDS (${bodies}). OGN-133 Flurry of Blades is Body, E1: ` +
        `"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields." ` +
        `143.2.a kills on marked damage at or above Might, so it kills every 1-Might body on the board ` +
        `SIMULTANEOUSLY however many there are - the binding constraint is Might PER BODY, not the number of bodies, ` +
        `so no amount of going wider answers it - and 813.1.c.1 lets it land in any Closed State on either player's ` +
        `turn. The repairs in the pool are narrow: UNL-077 Soul Shepherd ("Your token units have +1 Might") is the ` +
        `only permanent board-wide token-scoped one and is Mind, OGN-266 Siphon Power is one turn and one ` +
        `battlefield, and UNL-T03 Brush reaches only Bird, Cat, Dog, Poro and Ivern units.`);
    }
    rows.push({
      entry: f.e.id,
      action: `append ${notables.length} notable${notables.length > 1 ? "s" : ""} to prerequisites.notable`,
      why: `Generated by scripts/adversarial-check.mjs --emit-notables (issue #200, lane rc-synth). ${f.holes.join("; ")}. ` +
           `Reviewed by hand before handing over; the headline answer is chosen by copy count, and the "answers" named ` +
           `are the unconditional enemy-facing subset rather than the whole swept set.`,
      notables_to_append: notables,
    });
  }
  process.stdout.write("\n");
  console.log(JSON.stringify(rows, null, 1));
}

// ---------------------------------------------------------------- --stalled
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
  const buckets = { attack: [], conquer: [], hold: [], independent: [] };
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
    } else if (why.length) buckets.attack.push(row);
    else if (conq) buckets.conquer.push(row + tag(conq));
    else if (hold) buckets.hold.push(row + tag(hold));
    else buckets.independent.push(row);
  }
  const n = Object.values(buckets).reduce((a2, b2) => a2 + b2.length, 0);
  console.log(`\n# Stalled-board classification of all ${n} finishers.`);
  console.log(`# FIRST PASS, from the printed text of each entry's own uses[] - a measurement of the cards, not a`);
  console.log(`# verdict on the entry. The matched phrase is shown so a reader refutes it in one look.`);
  const label = {
    attack: "ALIVE WHERE THE CURVE STALLS. The printed text needs the Attacker designation, which 807.1.d and 323.9 make impossible without an enemy garrison. Dead on an empty board, alive on a contested one - the shape a finisher should have.",
    conquer: "SURVIVES A STALL. Scores on a Conquer, and a battlefield the opponent took is a Conquer target, so the stall does not switch it off.",
    hold: "DIES WITH THE CURVE. Scores on a Hold, which needs battlefields you ALREADY control - so the stall that makes this line necessary is the same stall that switches it off.",
    independent: "BOARD-INDEPENDENT. No Hold, no Conquer and no attack in the printed text, so nothing about the board switches it off.",
  };
  for (const k of ["attack", "conquer", "hold", "independent"]) {
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
  const outAt = args.indexOf("--out");
  const out = outAt >= 0 && args[outAt + 1] ? args[outAt + 1] : "/tmp/rc-walks/rc-synth-recheck.json";
  writeFileSync(out, JSON.stringify(rows, null, 1) + "\n");
  console.log(`\n# --recheck-notables: ${rows.length} entries carry the stale sentence -> ${out}`);
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
            `THE CHEAPEST ANSWER IS A SINGLE KILL, NOT A SWEEPER, AND OGN-133 FLURRY OF BLADES DOES NOT TOUCH THIS LINE. ` +
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
  const outAt2 = args.indexOf("--out");
  const out2 = outAt2 >= 0 && args[outAt2 + 1] ? args[outAt2 + 1] : "/tmp/rc-walks/rc-synth-holds.json";
  writeFileSync(out2, JSON.stringify(rows, null, 1) + "\n");
  const repl = rows.filter((r) => r.action.startsWith("REPLACE")).length;
  console.log(`\n# --holds-notables: ${rows.length} corrections (${repl} REPLACE a false shipped sentence, ${rows.length - repl} append a missing one) -> ${out2}`);
}

if (strict && findings.length) process.exit(1);
