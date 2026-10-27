# Play — Identity coverage by legend pair: Chaos/Fury has two finishers and none that pays by turn four

Issue #491 (a slice of #200), 2026-10-27. Constructed, Duel (485). Rules version 2026-07-16. This is
the first slice of the identity-first pass decided on #200 on 2026-10-27: count the finishers each
legend domain pair can play, take the pair with the fewest, and try to build lines for it that beat the
free Hold curve of [the unopposed clock](2026-09-12-the-unopposed-clock.md).

**Chaos/Fury is the target pair, and Body/Calm is the runner-up.** No Chaos/Fury finisher in the
catalogue pays by T4, and it has two finishers in all, the fewest of the fifteen pairs. This slice
walked two new Chaos/Fury lines. One beats the pair's Hold baseline on the clock and enters the
catalogue as a candidate; the other pays on the baseline's own turn and is a negative result.

---

## 1. What is counted

**The pairs.** A deck's Domain Identity is its legend's domains, 103.1.b.2: *"Your deck’s Domain
Identity is dictated by the domains of your Champion Legend."* A card fits it by 103.1.b.3: *"If a card
has a single Domain, then that card is permitted in the Domain Identity that corresponds to the same
Domain."* and 103.1.b.4: *"If a card has more than one Domain, then that card is permitted only in a
Domain Identity that contains all of the indicated Domains on that card."* Six domains give fifteen
pairs.

**The entries.** Every `data/combos.json` entry of class INFINITE, BURST, CHAIN or ALT_WIN, 85 at
`e3101e5`. An entry fits a pair when every card in its `uses` does: each card's `domains` from
`data/cards.json`, matched on base codes, and a colourless card fits every pair. A mono-domain entry
fits the five pairs that contain its domain, so the columns do not sum to 85.

**The clock.** `npm run adversarial -- --turns` prints a turn for every finisher: the turn its card
set is first paid for on a perfect curve, plus one if it pays at a Hold, with nothing cast against it.
The clock prices an entry together with the entries it folds in for fuel or payoff, and prints the
domains of that whole set. A row counts as paying by T4 in a pair when it pays by T4, those printed
domains fit the pair, and none of its cards is banned in Constructed (`data/legality.json`). This
matters on one row: bottled-constellation-time-warp uses only Mind cards, but its T4 needs
lux-infinite-energy and lux-infinite-power, which are Mind/Order, so its T4 counts in Mind/Order
and nowhere else. Six of the 85 entries have a priced set wider than their own cards, all listed in §4.

**ALT_WIN sits apart.** An ALT_WIN does not score points; The Grand Plaza or Gutter Palace ends the
game. The clock still prints a turn for it, and that turn is reported in its own column and not used
to pick the target.

**The baseline.** The clock's Hold baseline is T5 for a pair with Body or Calm in it, because only
those two domains print a unit at Energy 1 or less, and T6 for the other six pairs. The derivation is
in the unopposed clock play.

**The target rule.** Fewest INFINITE, BURST and CHAIN entries paying by T4; ties broken on fewest
finishers of all four classes, then alphabetically.

## 2. The table

Measured at `e3101e5` (master after #490; `data/` and `scripts/` are byte-identical to `e4653c7`,
`git diff --quiet e4653c7 e3101e5 -- data scripts`), before this slice added anything.

| pair | Hold baseline | INFINITE | BURST | CHAIN | clocked, pay by T4 | ALT_WIN | ALT_WIN, pay by T4 | all four |
|---|---|---|---|---|---|---|---|---|
| body/calm | T5 | 0 | 2 | 0 | 0 | 2 | 1 | 4 |
| body/chaos | T5 | 0 | 0 | 2 | 0 | 2 | 0 | 4 |
| body/fury | T5 | 1 | 3 | 2 | 0 | 1 | 0 | 7 |
| body/mind | T5 | 2 | 2 | 6 | 0 | 5 | 2 | 15 |
| body/order | T5 | 0 | 1 | 0 | 0 | 6 | 1 | 7 |
| calm/chaos | T5 | 0 | 2 | 2 | 1 (yasuo-windrider-ride-the-wind-chain T4) | 2 | 1 | 6 |
| calm/fury | T5 | 2 | 6 | 0 | 2 (threshold-reveler-infinite-energy T4, reveler-loop-nasus-brambleback-conquer T4) | 2 | 1 | 10 |
| calm/mind | T5 | 2 | 5 | 6 | 0 | 8 | 5 | 21 |
| calm/order | T5 | 0 | 3 | 0 | 0 | 8 | 3 | 11 |
| chaos/fury | T6 | 0 | 1 | 0 | 0 | 1 | 0 | 2 |
| chaos/mind | T6 | 2 | 0 | 5 | 0 | 7 | 3 | 14 |
| chaos/order | T6 | 1 | 0 | 2 | 0 | 6 | 2 | 9 (pursuer-herald-recruits banned) |
| fury/mind | T6 | 3 | 2 | 6 | 0 | 4 | 2 | 15 |
| fury/order | T6 | 2 | 2 | 0 | 1 (jhin-fiora-facebreaker-recall T4) | 5 | 1 | 9 |
| mind/order | T6 | 7 | 2 | 10 | 2 (time-warp-hold-burst T4, bottled-constellation-time-warp T4) | 12 | 6 | 31 |

**Target: Chaos/Fury.** 0 clocked finishers by T4 and 2 finishers in all: tryndamere-brambleback-conquer
(mono-Fury BURST, T7 against T6) and spiderling-swarm-grand-plaza (mono-Chaos ALT_WIN, T6). Eleven
pairs have 0 clocked finishers by T4; the count of all four classes is the tiebreak, and 2 is the
lowest of the fifteen.

**Runner-up: Body/Calm,** 0 by T4 and 4 in all. It ties Body/Chaos at 0 and 4 and comes first
alphabetically. Its four are ahri-trinity-svellsongur-hold (BURST, T6), nasus-svellsongur-conquer-burst
(Calm BURST, T6), flurry-of-feathers-grand-plaza-win (Calm ALT_WIN, T3) and
dragonstorm-confront-grand-plaza, a Body ALT_WIN whose clock row is priced with its Fury fuel at T12
and so counts in Body/Calm only by its own cards.

The full order, (clocked by T4, all four): chaos/fury (0, 2), body/calm (0, 4), body/chaos (0, 4),
body/fury (0, 7), body/order (0, 7), chaos/order (0, 9), calm/order (0, 11), chaos/mind (0, 14),
body/mind (0, 15), fury/mind (0, 15), calm/mind (0, 21), calm/chaos (1, 6), fury/order (1, 9),
calm/fury (2, 10), mind/order (2, 31).

## 3. The two Chaos/Fury lines

| line | class | pays | Chaos/Fury Hold baseline | beats it | catalogue |
|---|---|---|---|---|---|
| [Up from the Deep on the Plaza](2026-10-27-up-from-the-deep-puts-seven-on-the-plaza-by-turn-three-and-the-two-bodies-they-already-had-kill-five-of-them.md) | ALT_WIN | T4 (the clock prints T3, without its three bodies) | T6 | yes, by two turns | up-from-the-deep-flow-grand-plaza, `status: candidate` |
| [Seal of Rage and Upstage Comedy under Tryndamere](2026-10-27-seal-of-rage-and-upstage-comedy-bring-tryndameres-nine-to-turn-six-the-turn-the-free-hold-curve-wins-and-one-hextech-ray-holds-it-to-three.md) | BURST | T6 | T6 | no, same turn | not entered: negative result |

**The Plaza line** puts three Energy-2 bodies on The Grand Plaza by the end of T2, and one Up from the
Deep cast twice ([Flow]) adds four Tentacles on T3: seven units for twelve Energy and no Power, and the
T4 Hold wins. On the clock that is two turns ahead of the Hold curve. In the walk, the opponent's
ready bodies attack the Plaza on their T3 and kill five of the seven, because four of them are 1-Might
Tentacles. The cheapest answer costs nothing.

**The Tryndamere line** is the pair's only BURST. Its 1 + T x (1 + K) needs two Tryndamere, Barbarian
and three Red Brambleback in one attack. Seal of Rage brings that attack from T7 to T6, and T5 is out
of reach: a Tryndamere costs E7, so going first the two can only be bought on T4 and T5, and that
leaves no turn with 4 Energy for the third Brambleback. T6 is the Hold curve's own turn, so the line
is a negative result. Each play doc carries its own Breaks to, Needs and Not verified.

So Chaos/Fury now has one finisher paying by T4 on the clock's terms, and it is an ALT_WIN. The
clocked count for the pair stays at **0**: no Chaos/Fury BURST pays before T6, and no CHAIN was
searched.

## 4. The six entries whose priced set is wider than their own cards

The clock folds fuel and payoff entries into a row, and for six finishers that widens the domains.
They count in a pair by their own cards in the "all four" column and by the priced set in the "pay by
T4" columns:

| entry | own cards | priced set | clock |
|---|---|---|---|
| renata-bubble-bot-ready | Mind | Mind/Order | T5 |
| swain-double-conquer | Mind | Mind/Order | T5 |
| bottled-constellation-time-warp | Mind | Mind/Order | T4 |
| ready-recruits-grand-plaza | Order | Mind/Order | T4 |
| jayce-mesmerize-renata | Mind | Mind/Order | T5 |
| dragonstorm-confront-grand-plaza | Body | Body/Fury | T12 |

Read by own cards alone, bottled-constellation-time-warp would count as paying by T4 in all five
Mind pairs. It cannot: its T4 is bought with the output of two Mind/Order loops.

## 5. Stop rule

The #200 decision switches to the adversarial pass after three consecutive pairs with no line that
beats its baseline.

| slice | pair | a line that beats the baseline | consecutive pairs without one |
|---|---|---|---|
| #491 | Chaos/Fury | yes: up-from-the-deep-flow-grand-plaza, T4 against T6 on the clock | 0 |

The next pair in the order is **Body/Calm** (baseline T5).

## 6. Not verified

The table counts entries, not decks. An entry fits a pair if its cards do; whether a real list in that
pair would run it is not asked. The clock is the optimistic lower bound its own header states: perfect
draws, nothing cast against the line, no interaction. It also does not charge an entry's `anyBodies`,
and §3 shows one row where that moves the turn. The other pay-by-T4 rows were not re-priced by hand.
ALT_WIN turns are reported, not ranked.

## 7. The command

Run from the repository root at the sha above, with `coverage.mjs` saved anywhere:

```
npm run -s adversarial -- --turns | node coverage.mjs
```

```js
// #491: finishers by legend domain pair. stdin = `npm run adversarial -- --turns`.
import { readFileSync } from "node:fs";
const read = (f) => JSON.parse(readFileSync(f, "utf8"));
const dom = new Map(read("data/cards.json").cards.map((c) => [c.base.toUpperCase(), c.domains || []]));
const banned = new Set(read("data/legality.json").entries
  .filter((r) => r.format === "constructed" && r.status === "banned").flatMap((r) => r.bases.map((b) => b.toUpperCase())));
const clock = new Map();
for (const l of readFileSync(0, "utf8").split("\n")) {
  const m = l.match(/^\s+T\s*(\d+) vs T\d baseline\s+(?:SLOWER)?\s+\w+\s+(\S+)\s+(\S+)/);
  if (m) clock.set(m[3], { pays: +m[1], closure: m[2] === "colourless" ? [] : m[2].split("/") });
}
const F = ["INFINITE", "BURST", "CHAIN", "ALT_WIN"];
const fin = read("data/combos.json").combos.filter((e) => F.includes(e.class)).map((e) => ({
  id: e.id, cls: e.class, ...clock.get(e.id),
  own: [...new Set(e.uses.flatMap((u) => dom.get(u.card.toUpperCase())))],
  banned: e.uses.some((u) => banned.has(u.card.toUpperCase())) }));
const D = ["body", "calm", "chaos", "fury", "mind", "order"];
const fits = (ds, p) => ds.every((d) => p.includes(d));
const rows = [];
for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
  const p = [D[i], D[j]];
  const own = fin.filter((f) => fits(f.own, p));
  const n = (c) => own.filter((f) => f.cls === c).length;
  const t4 = (cls) => fin.filter((f) => cls(f.cls) && fits(f.closure, p) && f.pays <= 4 && !f.banned);
  rows.push({ p: p.join("/"), base: p.includes("body") || p.includes("calm") ? 5 : 6,
    inf: n("INFINITE"), burst: n("BURST"), chain: n("CHAIN"), alt: n("ALT_WIN"), all: own.length,
    t4: t4((c) => c !== "ALT_WIN"), altT4: t4((c) => c === "ALT_WIN"), banned: own.filter((f) => f.banned) });
}
console.log("| pair | Hold baseline | INFINITE | BURST | CHAIN | clocked, pay by T4 | ALT_WIN | ALT_WIN, pay by T4 | all four |");
console.log("|---|---|---|---|---|---|---|---|---|");
for (const r of rows) console.log(`| ${r.p} | T${r.base} | ${r.inf} | ${r.burst} | ${r.chain} | ${r.t4.length}${r.t4.length ? ` (${r.t4.map((f) => `\`${f.id}\` T${f.pays}`).join(", ")})` : ""} | ${r.alt} | ${r.altT4.length} | ${r.all}${r.banned.length ? ` (${r.banned.map((f) => `\`${f.id}\` banned`).join(", ")})` : ""} |`);
const order = [...rows].sort((a, b) => a.t4.length - b.t4.length || a.all - b.all || a.p.localeCompare(b.p));
console.log(`\norder: ${order.map((r) => `${r.p} (${r.t4.length}, ${r.all})`).join(", ")}`);
const drift = fin.filter((f) => !fits(f.closure, f.own) || !fits(f.own, f.closure));
console.log(`own cards vs priced closure differ on ${drift.length} of ${fin.length}: ${drift.map((f) => `\`${f.id}\` ${f.own.join("/")} -> ${f.closure.join("/")} T${f.pays}`).join(", ")}`);
```
