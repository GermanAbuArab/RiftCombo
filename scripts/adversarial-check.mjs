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

  if (e.class !== "ALT_WIN") {
    // A Hold pays at your NEXT Beginning Phase and a Conquer needs bodies that are already ready
    // (143.4 enters them exhausted), so the payoff is one turn after the last piece lands.
    const deploy = deployTurn(costs);
    const pays = deploy + 1;
    const base = baselineTurn(domains);
    clock.push({ id: e.id, cls: e.class, pays, base, domains: [...domains].sort().join("/") || "colourless" });
  }
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
  console.log(`  T${String(c.pays).padStart(2)} vs T${c.base} baseline  ${c.pays > c.base ? "SLOWER" : "      "}  ${c.cls.padEnd(8)} ${c.domains.padEnd(12)} ${c.id}`);

if (strict && findings.length) process.exit(1);
