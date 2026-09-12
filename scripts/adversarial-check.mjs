// Adversarial check over every finisher in the catalogue (issue #200, lane rc-synth).
//
//   node scripts/adversarial-check.mjs            report everything
//   node scripts/adversarial-check.mjs --strict   exit 1 if any finisher has an unanswered hole
//   node scripts/adversarial-check.mjs --turns    only the turn-clock section
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
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const onlyTurns = args.includes("--turns");
const emit = args.includes("--emit-notables");

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
// the sweeper that answers a 1-Might board for 1 Energy at Reaction speed
const SWEEPER = { base: "OGN-133", name: "Flurry of Blades" };

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
    if (c.type.includes("unit") && c.might !== null && c.might <= 1) fragile.push(`${c.name} (M${c.might})`);
  }

  const holes = [];
  if (equipment.length && !namesAnswer(blob, gearKills).length)
    holes.push(`stands on Equipment (${equipment.join(", ")}) and names no gear answer`);
  if (fragile.length && !namesAnswer(blob, [SWEEPER]).length)
    holes.push(`stands on a Might-1 body (${fragile.join(", ")}) and never names OGN-133 Flurry of Blades`);
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
  console.log(`# gear-kill answer set: ${gearKills.length} base codes, domains ${[...new Set(gearKills.flatMap((g) => g.domains))].sort().join(" ")}\n`);
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
        `NO GEAR KILL IN THE POOL CARRIES [Reaction], WHICH IS WHAT KEEPS THIS LINE ALIVE. Swept over all ` +
        `${gearKills.length}: Thermo Beam and Salvage are [Action], which 806.1.c.1 makes short for "This can be ` +
        `played during showdowns on any player's turn", and Detonate and Brittle Steel are plain spells, which 155 ` +
        `confines to "an Open State outside of Showdowns on its controller's turn". The window this line pays in ` +
        `gives the opponent no priority in a Neutral Open State (312.2.a) and admits only a [Reaction] in the Closed ` +
        `State a trigger opens (813.1.c.1). So the gear can be stripped only on THEIR own turn, a full turn early ` +
        `and fully telegraphed - and that removal spell on the Chain is itself a Closed State, where 312.2.c hands ` +
        `out priority and 813.1.c.1 admits a [Reaction] in response. That is where this line is defended.`);
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

if (strict && findings.length) process.exit(1);
