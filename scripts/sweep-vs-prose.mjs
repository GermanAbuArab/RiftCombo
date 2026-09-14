#!/usr/bin/env node
/**
 * DIFF THE SWEPT ANSWER SETS AGAINST WHAT THE ENTRIES THEMSELVES NAME (issue #200, #220; lane rc-plaza).
 *
 *   node scripts/sweep-vs-prose.mjs             report all three sets
 *   node scripts/sweep-vs-prose.mjs --selftest  prove the probe in BOTH directions before you trust it
 *   node scripts/sweep-vs-prose.mjs --strict    exit 1 if a set that was clean stops being clean
 *
 * WHY THIS EXISTS. `scripts/adversarial-check.mjs` sweeps its answer sets out of `data/cards.json`
 * with a predicate over card text. Every one of those predicates was written from THE WORDING OF THE
 * CARD THAT MOTIVATED IT - mass answers from `OGN-133 Flurry of Blades`'s "to all units at
 * battlefields", gear answers from "kill a gear", widened once to "detach" when a real case forced
 * it. A predicate seeded that way is correct about the cards its author had already met and blind to
 * the ones they had not.
 *
 * A sweep over `cards.json` and the prose of 767 hand-authored entries are TWO INDEPENDENT
 * DESCRIPTIONS OF THE SAME POOL. Diffing them finds the wording the predicate's author had not met
 * yet, because the entries have already done the reading. It is cheap, it is bounded (959 cards are
 * named by at least one entry), and on its first run it found two families:
 *
 *   - `UNL-072 Crescent Strike` (mind, E1+... E3 + 1 Power) says "1 to EACH OTHER ENEMY UNIT THERE"
 *     and clears a 1-Might garrison exactly as Flurry does. The mass predicate cannot match it.
 *   - `SFD-135 Factory Recall` (chaos, E1, no Power) RETURNS a gear to its owner's hand. The gear
 *     predicate knows kill and detach; it does not know bounce - and Factory Recall is cheaper than
 *     `SFD-005 Detonate`, which nine shipped notables called "the cheapest removal in the pool".
 *
 * And in both cases the catalogue ALREADY OWNED THE CARD, in exactly one entry, whose own id names
 * it: `crescent-strike-frostcoat-cub-sweep-threshold` and `spinning-axe-factory-recall-inactive-
 * temporary`. CLAUDE.md records the identical shape a third time for `SFD-011 Angle Shot`. The
 * unifying sentence, which is the reason to keep running this: THIS CATALOGUE DESCRIBES WHAT A CARD
 * DOES *FOR* YOU FAR MORE OFTEN THAN WHAT IT DOES *TO* YOU, AND THE SWEEPS INHERIT THAT BLIND SPOT.
 *
 * GROUND THE CANDIDATE IN CARD TEXT, NEVER IN THE ENTRY'S SENTENCE. A first version asked whether the
 * SENTENCE naming a card carried the sweep's vocabulary, and returned 242 mentions across 108 cards -
 * the vocabulary matched the sentence while the card named in it was the subject of a different
 * clause (`OGN-294 Trifarian War Camp` is a battlefield, the six Seals are mana). Right file, wrong
 * sentence, 108 times. Grounding the candidate in the card's OWN printed text needs ONE narrowing and
 * returns 9. That is this project's standing rule arriving again: a check grounded in a rule finds
 * things and needs one narrowing; a check grounded in prose finds nothing and needs four.
 *
 * SCOPE THE PROSE SEARCH TO FIELDS THAT CARRY CLAIMS. A blob search over the whole entry JSON reads
 * the `name` field, which is a TITLE. rc-manager9 caught exactly that in this lane's first report:
 * `renekton-public-execution-gate` is named "... the cheapest removal in the pool that reaches the
 * base" - a different claim about a different card - and a nine-entry list was one wide because of
 * it. ASSERT THE COUNT, NOT THE MATCH.
 */
import fs from "fs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const selftest = args.includes("--selftest");

const db = JSON.parse(fs.readFileSync("data/combos.json", "utf8"));
const raw = JSON.parse(fs.readFileSync("data/cards.json", "utf8"));
const cards = raw.cards || raw;
const byBase = new Map(cards.map((c) => [c.base, c]));
const T = (c) => `${c.text || ""} ${c.effect || ""}`.replace(/\s+/g, " ");

// ---------------------------------------------------------------- drift guard
/**
 * The three predicates below are COPIED from scripts/adversarial-check.mjs, which cannot be imported
 * because it runs at import time. A copy goes stale silently, and a stale copy makes this whole
 * script report a difference that is its own. So the copies are checked against that file's SOURCE
 * TEXT on every run: if rc-emit widens a predicate, this fails loudly instead of lying quietly.
 */
const SRC = fs.readFileSync("scripts/adversarial-check.mjs", "utf8");
const COPIED = [
  String.raw`/(to all (enemy )?units at (a )?battlefields?|kill all units)/i`,
  String.raw`/\bkills?\b[^.]{0,80}\bgear\b/i`,
  String.raw`/\bdetach/i`,
  String.raw`/(your (?:token )?units?|other friendly units?|units here|your Mechs)[^.]{0,28}have \+(\d+) :rb_might:/i`,
];
const drifted = COPIED.filter((p) => !SRC.includes(p));
if (drifted.length) {
  console.error("DRIFT: these predicates are no longer present verbatim in scripts/adversarial-check.mjs:");
  for (const d of drifted) console.error("   " + d);
  console.error("Re-copy them before trusting anything below.");
  process.exit(2);
}

// ---------------------------------------------------------------- the swept sets (copies, guarded above)
const massSet = new Set(["OGN-133"]); // the hardcoded SWEEPER, which the predicate does not produce
for (const c of cards) {
  if (!(c.domains || []).length) continue;
  if ((c.type || []).includes("battlefield")) continue;
  const t = T(c);
  if (!/(to all (enemy )?units at (a )?battlefields?|kill all units)/i.test(t)) continue;
  if (/in combat|to all units you control|to all friendly units/i.test(t)) continue;
  if (/up to (one|two|three|\d+) units?/i.test(t)) continue;
  if (/\[Deathknell\]|when i attack|at my battlefield/i.test(t)) continue;
  massSet.add(c.base);
}
const gearSet = new Set();
for (const [base, c] of byBase) {
  if (!(c.domains || []).length && !(c.type || []).includes("battlefield")) continue;
  const t = T(c);
  if (/\bkills?\b[^.]{0,80}\bgear\b/i.test(t)) gearSet.add(base);
  if (/\bdetach/i.test(t) && !/friendly|you control/i.test(t)) gearSet.add(base);
}
const PROT = /(your (?:token )?units?|other friendly units?|units here|your Mechs)[^.]{0,28}have \+(\d+) :rb_might:/i;
const protSet = new Set(
  cards.filter((c) => {
    const t = T(c), m = t.match(PROT);
    if (!m) return false;
    if (/while (?:they|we|I)'?re? (?:attackers|defenders)/i.test(m[0])) return false;
    if (/this turn/i.test(t)) return false;
    return true;
  }).map((c) => c.base),
);

// ---------------------------------------------------------------- what the entries name
// `name` is a TITLE and is excluded on purpose - see the docblock. These four fields carry claims.
const CLAIM_FIELDS = (e) => [...(e.steps || []), e.notes || "", e.terminatesIn || "", ...(e.prerequisites?.notable || [])];
const named = new Set();
for (const e of db.combos) {
  for (const m of CLAIM_FIELDS(e).join(" ").matchAll(/\b([A-Z]{3}-[A-Z0-9]{3,4})\b/g)) if (byBase.has(m[1])) named.add(m[1]);
  for (const u of e.uses) named.add(u.card);
}

// ---------------------------------------------------------------- the three diffs
// Each candidate predicate reads the CARD'S OWN TEXT. The `gate` column is the reason a candidate is
// excluded, and it is printed rather than applied: eight of the nine mass candidates are excluded by
// the very clauses adversarial-check.mjs already names by hand in its own comments.
const GATE = /when i attack|when i attack or defend|in combat|\[Deathknell\]|at my battlefield|to all units you control/i;
const SETS = [
  { key: "massAnswer", set: massSet, clean: false,
    pred: /(deal[^.]{0,25}\b\d+\b[^.]{0,60}|kill[^.]{0,60})\b(all|each other|every|all other)\b[^.]{0,30}\bunits?\b/i,
    what: "damage or a kill whose object is a PLURAL set of units" },
  { key: "gearAnswer", set: gearSet, clean: false,
    pred: /(kill|destroy|banish|return|detach|move)[^.]{0,60}\bgear\b|\bgear\b[^.]{0,40}(to its owner|to your base)/i,
    own: /friendly gear|gear you control|your gear|from your trash|of their gear|your Main Deck|play a Gold gear/i,
    what: "removing, detaching, bouncing or stealing a gear" },
  // The `own` reason here has to NAME the reason, not dump the card. All four live exclusions are one
  // of two shapes and both are read off the grant clause itself: the subject is the card ITSELF
  // ("I have +1"), or the grant belongs to a battlefield TOKEN, which 485.4.a and 103.4.c keep off a
  // board that already has the battlefield the line needs.
  { key: "protection", set: protSet, clean: true,
    pred: /(units?|Mechs|tokens?)[^.]{0,30}have \+\d+ :rb_might:/i, veto: /this turn/i,
    own: /\bI have \+\d+ :rb_might:|battlefield token/i,
    what: "a static, non-\"this turn\" +Might granted to more than one body" },
];

/**
 * ONE definition of "genuine", used by BOTH the selftest and the report.
 * They disagreed on the first run of the stricter exclusion predicate: the selftest counted only
 * `own` while the report counted `gate` too, so `OGN-151 Lee Sin, Centered` - excluded by a gate -
 * read as a genuine miss in one and as correctly excluded in the other. Same defect rc-emit fixed by
 * folding two garrison scans into one helper: two places computing the same thing WILL disagree.
 */
const genuineOnly = (rows) => rows.filter((r) => !r.gate && !r.own);

function diff(s) {
  return [...named].filter((b) => {
    const c = byBase.get(b); if (!c) return false;
    const t = T(c);
    if (!s.pred.test(t)) return false;
    if (s.veto && s.veto.test(t)) return false;
    return !s.set.has(b);
  }).map((b) => {
    const c = byBase.get(b), t = T(c);
    return { base: b, name: c.name, domains: c.domains || [], type: (c.type || []).join(","),
      e: c.energy ?? 0, p: c.power ?? 0, sig: !!c.signature,
      gate: (GATE.exec(t) || [])[0] || null,
      own: s.own ? (s.own.exec(t) || [])[0] || null : null, text: t.replace(/:rb_[a-z_0-9]*:/g, "").trim() };
  });
}

// ---------------------------------------------------------------- --selftest
/**
 * VALIDATION IN BOTH DIRECTIONS, because either half alone is worthless. A probe that finds the known
 * answer proves nothing if it also returns fifty others; a probe that returns nothing proves nothing
 * if it cannot see a known positive. Both are asserted here.
 */
if (selftest) {
  const mass = diff(SETS[0]);
  const ungated = genuineOnly(mass);
  const checks = [
    ["mass set can see the known positive", massSet.has("OGN-133"), true],
    ["mass set canNOT see the known miss", massSet.has("UNL-072"), false],
    ["diff RETURNS the known finding", ungated.some((r) => r.base === "UNL-072"), true],
    ["diff returns NO NOISE: exactly one ungated candidate", ungated.length, 1],
    ["and the other 8 are excluded by a gate adversarial-check names by hand", mass.length - ungated.length, 8],
    ["gear diff returns the bounce family", genuineOnly(diff(SETS[1])).some((r) => r.base === "SFD-135"), true],
    ["protection set is CLEAN", genuineOnly(diff(SETS[2])).length, 0],
  ];
  let bad = 0;
  console.log(`# --selftest: ${checks.length} assertions, both directions`);
  for (const [label, got, want] of checks) {
    const ok = got === want;
    if (!ok) bad++;
    console.log(`  ${ok ? "ok  " : "FAIL"} ${label}  (got ${got}, want ${want})`);
  }
  console.log(bad ? `# ${bad} FAILED` : "# all pass");
  process.exit(bad ? 1 : 0);
}

// ---------------------------------------------------------------- report
console.log(`# NON-VACUITY: ${db.combos.length} entries, ${byBase.size} cards, ${named.size} cards named by at least one entry.`);
console.log(`# swept sets: massAnswer ${massSet.size}, gearAnswer ${gearSet.size}, protection ${protSet.size}. Predicates drift-checked against adversarial-check.mjs.`);
let cleanBroken = 0;
for (const s of SETS) {
  const rows = diff(s);
  const genuine = genuineOnly(rows);
  console.log(`\n## ${s.key} - candidate = named by an entry AND its own text does ${s.what} AND not in the swept set`);
  console.log(`   ${rows.length} candidates, ${rows.length - genuine.length} correctly excluded, ${genuine.length} GENUINE`);
  for (const r of rows) {
    const why = r.gate ? `excluded, gate: ${r.gate}` : r.own ? `excluded, own-side/own-zone: ${r.own}` : "*** GENUINE MISS ***";
    console.log(`   ${r.base} ${String(r.name).padEnd(24)} ${r.domains.join("/").padEnd(11)} E${r.e} P${r.p}${r.sig ? " SIG" : ""}  ${why}`);
    if (!r.gate && !r.own) console.log(`        ${r.text.slice(0, 165)}`);
  }
  if (s.clean && genuine.length) {
    cleanBroken++;
    console.log(`   !! THIS SET WAS CLEAN WHEN PINNED. A genuine miss here is new and should be read, not assumed.`);
  }
}
console.log(`\n# A CLEAN SET IS THE ONE WORTH PINNING, because pinning costs nothing at a clean state and can`);
console.log(`# only ever be paid for once. 'protection' is pinned in test/sweep-vs-prose.test.ts.`);
if (strict && cleanBroken) process.exit(1);
