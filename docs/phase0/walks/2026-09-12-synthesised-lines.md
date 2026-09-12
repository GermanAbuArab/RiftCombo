# Synthesised lines — issue #200, lane rc-synth

Date: 2026-09-12. Rules version 2026-07-16. Card text verbatim from `data/corpus_flat.txt`;
every rules paragraph opened in `data/Riftbound-Core-Rules-2026-07-16.txt` and pasted untruncated.

This lane runs the opposite search from every other lane. The other lanes EXTRACT: open a card or a
rules paragraph, ask what it enables, walk it. This one SYNTHESISES: decide what the board should do,
design the line that would do it, and only then ask the pool whether it can. Batch 1 used shape 3
(identity-first design), shape 1 (backwards from the win) and shape 4 (adversarial pass on our own
finishers).

---

## 1. The measurement that chose the target, and a correction to the brief's own framing

The lane was pointed at `chaos/fury` on the ground that all fifty of its catalogued entries are
ENGINE. That count is computed from the Domain Identity the entries' own `uses[]` imply, and **read
that way it understates what a deck in that identity can run**: a mono-Fury entry counts as `fury`,
not as `chaos/fury`, yet a Fury/Chaos legend may run it (103.1.b.3). So "chaos/fury has no finisher"
is partly an artifact of the axis.

The measurement that is not an artifact asks, for each of the fifteen legend pairs, **how many
catalogued entries a deck in that identity could run at all** — every entry whose cards' domains are
a subset of the pair. `.scratch-synth/avail.py` (gitignored; the folded-by-base pool probe beside it
is `.scratch-synth/pool.py`). Counted over 727 entries at commit 70707cd:

```
pair             avail  INF  BUR  CHA  ALT   ENG
body/calm          146    0    1    0    2   143
body/chaos         118    0    0    0    2   116     <-- zero of all three point classes
body/fury          121    1    3    0    1   116
body/mind          134    2    2    4    5   121
body/order         151    0    0    0    6   145     <-- zero of all three point classes
calm/chaos         138    0    0    1    2   135
calm/fury          111    2    4    0    2   103
calm/mind          174    2    3    4    8   157
calm/order         181    0    2    0    8   171
chaos/fury         136    0    1    0    1   134
chaos/mind         136    2    0    3    6   125
chaos/order        135    1    0    0    6   128
fury/mind          116    3    2    4    4   103
fury/order         123    2    1    0    5   115
mind/order         191    7    2    8   12   162
```

Three things fall out of it.

1. **`chaos/fury` is NOT empty: it can run one BURST (`tryndamere-brambleback-conquer`, mono-Fury)
   and one ALT_WIN.** What it has never had is a finisher whose cards SPAN the two domains — a line
   that needs both halves. That is a narrower and truer statement of the gap.
2. **The genuinely empty cells are `body/chaos` and `body/order`**: zero INFINITE, zero BURST and
   zero CHAIN available out of 118 and 151 entries respectively. Both have ALT_WINs, so those decks
   have a plan; what they have never had is a route to eight points.
3. **Chaos is the weak domain and Mind the strong one.** Every pair containing Chaos is poor
   (best: 3 CHAIN in chaos/mind); `mind/order` alone holds 7 INFINITE and 8 CHAIN. The reason is
   already in CLAUDE.md and this lane confirms it from the other side: every in-turn repeatable point
   ability in the pool is Mind, so a non-Mind identity has to reach eight through the Hold or the
   Conquer, and both are capped at once per battlefield per turn (470) on a two-battlefield board
   (485.4).

### Backwards from the win, in Chaos/Fury specifically

194.1 gives four ways to gain a point and the pool prints fourteen cards whose text gains one.
Filtered to those a Fury/Chaos legend may run (103.1.b), there are exactly **four**:

| card | domain | what it wants |
|---|---|---|
| `OGN-034 Tryndamere, Barbarian` | Fury | a Conquer after an attack with 5+ excess damage |
| `OGN-205 Yasuo, Windrider` | Chaos | three moves in a turn |
| `SFD-148 Draven, Audacious` | Chaos | winning a combat |
| `SFD-214 Power Nexus` | colourless battlefield | 4 rainbow Power on a Hold |

Three of the four are **opponent-gated**: Tryndamere needs an enemy garrison to attack (807.1.d, and
a bloodless conquer generates no excess damage), Draven needs a combat (466.3.a: "A Player has won a
combat if they received either the attacker or defender designation and are the only Player that has
units remaining at this battlefield during this step"), and Power Nexus needs an Add-on-Hold to fund
it, which in this pool is `UNL-087 Blue Sentinel` and is Mind. **That is the real reason the cell
looks the way it does, and it is a design constraint rather than an oversight.** Only Yasuo's point
is free of the opponent, and the Yasuo lines are catalogued under a Calm/Chaos legend.

---

## 2. Entry: `trinity-force-yasuo-battle-mistress-hold-and-moves` (CHAIN, verified)

**Shape 3, identity-first, aimed at the emptiest cell.** The question asked was "what is the largest
number of points Body/Chaos can put on the board in one turn", not "what does this card enable".

The answer is that the two halves of the identity own two different kinds of point and nobody had
summed them, because no single card in either half points at the other:

- **Body owns the only unconditional repeatable Hold payoff in the pool.** `SFD-115 Trinity Force`:
  `[Equip] :rb_rune_body: (:rb_rune_body:: Attach this to a unit you control.) [Effect] When I hold,
  score 1 point.` No clause, no threshold, three copies by name (103.2.b). Compare the alternatives:
  `VEN-138 Shen` needs "exactly one other unit you control here", `UNL-177 Ivern` needs four tags,
  `SFD-214 Power Nexus` needs 4 rainbow.
- **Chaos owns the only repeatable point that is not a Score at all.** `OGN-205 Yasuo, Windrider`:
  "The third time I move in a turn, you score 1 point."
- **`SFD-204 On the Hunt` is the bridge and it is printed Body/Chaos.** "Ready your units" names no
  unit, so one casting pays every Yasuo at once.

Arithmetic, with the quantities the entry declares (3 Trinity Force, 3 Yasuo, 2 On the Hunt):

| when | rule | points |
|---|---|---|
| Beginning Phase, Scoring Step | 315.2.b.2 "The Turn Player Holds all Battlefields they Control", two battlefields (485.4), 471.1 gains one point each | 2 |
| same step, 471.2 "Trigger Score abilities at the Battlefield that Scored" | three Trinity Force carriers present (383.4.d.2.a) | 3 |
| Main Phase | three Yasuo × third move, 194.1.c | 3 |
| | **total in one turn** | **8** |

Only the first two are Scores, so 470 ("A player may only Score, from either method, once per
Battlefield per turn") is spent on them and never touches the other six; 471.1.a.1 — "Notably,
points Gained from sources that are not Conquer are not beholden to these restrictions" — and
471.1.b's own opening, "When a player tries to Gain a Point through a Conquer", keep the Final Point
clause off a line that never Conquers.

The legend is forced and was measured, not typed: On the Hunt is a Signature card whose champion tag
is Sivir, 103.2.d.2 requires every Signature card to carry the Chosen Champion Legend's tag, and the
only legends in `data/cards.json` carrying the Sivir tag are **SFD-203 / SFD-250 Battle Mistress**,
both Body/Chaos. Two On the Hunt spend two of the three Signature slots 103.2.d.1 allows.

It is a CHAIN and not a BURST because 471.1 gains at most one point per Score: the eight arrive in
two batches, in two phases of one turn, with no opponent turn in between.

Twin: `on-the-hunt-yasuo-triple-third-move` is the move half alone, an ENGINE whose own
`terminatesIn` says "it is not a CHAIN because one turn's output is 3". This entry is what closes
that gap — the three bodies were standing at battlefields anyway, so the Trinity Forces cost nothing
in board space. Both entries cross-reference each other.

---

## 3. Shape 4 — adversarial pass: TWELVE of the 29 finishers stand on attached Equipment and not one names a gear answer

The question was "what is the cheapest card in the pool that beats this, and does the entry say so?"

**The finding.** Of the 17 BURST and 12 CHAIN entries, **twelve use an Equipment as a load-bearing
component**, and a string search for every gear-removal card in the pool across their
`prerequisites` and `notes` returns nothing in all twelve:

| class | entry | Equipment it stands on |
|---|---|---|
| BURST | `blue-sentinel-trinity-force-hold` | Trinity Force ×3 |
| BURST | `brambleback-trinity-skyfall-conquer` | Trinity Force ×3 + Skyfall of Areion |
| BURST | `dragonstorm-brambleback-trinity-conquer` | Trinity Force ×3 + Skyfall of Areion |
| BURST | `svellsongur-copy-hold` | Svellsongur ×3 |
| BURST | `skyfall-ahri-conquer` | Skyfall of Areion ×3 |
| BURST | `ahri-trinity-svellsongur-hold` | Trinity Force ×3 + Svellsongur |
| BURST | `shen-kinkou-svellsongur-hold` | Svellsongur ×3 |
| BURST | `veteran-poro-weaponmaster-trinity-sentinel-hold` | Trinity Force ×3 |
| BURST | `ivern-svellsongur-four-tags-hold` | Svellsongur ×3 |
| CHAIN | `power-nexus-atlas-sentinel-time-warp` | World Atlas ×2 |
| CHAIN | `sentinel-trinity-time-warp-chain` | Trinity Force |
| CHAIN | `swain-shurelya-double-conquer` | Shurelya's Requiem + Cloth Armor |

`svellsongur-copy-hold` is the one that comes closest — a notable of its own says "killing Ahri or
stripping her gear collapses the whole board" — but it names no card and gives no timing, and the
other eleven say nothing at all.

**The rule that makes the hole real.** 718.5.b: *"Attached cards still can be chosen or targeted by
game effects while Attached."* An attached Equipment's own printed Rules Text is Inactive (718.2) and
its [Equip] is unusable (721.2), but the CARD is a legal target the whole time. So every one of these
boards is a pile of removal targets sitting in the open for at least one full opponent turn.

**The census, with the predicate, because a count without one is meaningless.** Sweeping
`/\bkills?\b[^.]{0,80}\bgear\b/i` over `text` + `effect` of every deckable base in `data/cards.json`
returns **16 base codes (15 names — Jayce, Man of Progress is printed twice, SFD-084 and VEN-175)**,
and **every one of the six domains prints at least one**:

- **fury (3)** — `OGN-022 Thermo Beam`, `SFD-005 Detonate`, `VEN-003 Brittle Steel`
- **mind (6)** — `OGN-113 Malzahar, Fanatic`, `SFD-074 Pickpocket`, `SFD-077 Rocket Barrage`, `SFD-084` / `VEN-175 Jayce, Man of Progress`, `VEN-067 Bottled Constellation`
- **order (3)** — `OGN-224 Salvage`, `SFD-160 Zaun Punk`, `VEN-131 Decree of Unity`
- **calm (2)** — `OGN-056 Adaptatron`, `SFD-032 Disarming Rake`
- **chaos (1)** — `OGN-179 Acceptable Losses`
- **body (1)** — `VEN-080 Noxian Demolitionist`

Several of those only reach a FRIENDLY gear or are gated (Jayce, Zaun Punk's additional cost,
Malzahar, Bottled Constellation; Pickpocket caps at Energy cost 1 and Noxian Demolitionist at its own
Might, both of which leave a Trinity Force at E4 alone; Decree of Unity reaches only an enemy Chaos
card). The **unconditional enemy-facing** answers are `OGN-022 Thermo Beam`, `SFD-005 Detonate`,
`VEN-003 Brittle Steel`, `OGN-224 Salvage`, `SFD-032 Disarming Rake` and `SFD-077 Rocket Barrage` —
Fury, Order, Calm and Mind. **There is no identity one of these lines can hide in.**

**One card answers a whole BURST.** `OGN-022 Thermo Beam` — Fury, E5 + 2 Fury Power — is the only
card in the pool that kills every gear at once: *"[Action] (Play on your turn or in showdowns.) Kill
all gear."* Against any of the nine three-Equipment BURSTs above it is a single card for the entire
payoff. It is symmetric, so it is cheap for a gearless deck and expensive for anyone else — the same
shape `acceptable-losses-ravenbloom-prefect-gearless-gear-hate` already records for `OGN-179`.

Thermo Beam is not unknown to this project: it is the payoff of
`raging-firebrand-thermo-beam-free-gear-wipe` and is mentioned in six more entries. **Every one of
the seven is an ENGINE.** The catalogue owns the gun and has never pointed it at its own finishers.

**The timing, which is the load-bearing half and cuts both ways.** Swept over the sixteen: **not one
gear kill in the pool carries [Reaction]**. Thermo Beam and Salvage are [Action], which 806.1.c.1
makes short for *"This can be played during showdowns on any player's turn"*; Detonate and Brittle
Steel are plain spells, which 155 confines to *"an Open State outside of Showdowns on its
controller's turn"*. Meanwhile the Hold these BURSTs pay on happens at 315.2.b.2, inside the
defender's Beginning Phase, where the opponent holds no priority in a Neutral Open State (312.2.a)
and the Closed State the Hold trigger opens admits only a [Reaction] (813.1.c.1). So:

- **The opponent can never answer the gear in the Hold window itself.** Every answer has to be played
  on THEIR OWN TURN, one full turn before the BURST pays.
- **Which means the removal is fully telegraphed, and the BURST player does get a window** — the
  spell on the Chain is a Closed State, 312.2.c hands out priority there, and 813.1.c.1 admits a
  [Reaction] in response. That is the same structure `gutter-palace-reaction-dials` already uses for
  a different problem, and it is the correct place to state the answer-to-the-answer.
- A [Reaction] gear kill would be strictly better and the pool prints none; that absence is what
  keeps these lines alive at all.

This is a correction to twelve existing entries, not a new line. The proposed notable is staged in
`/tmp/rc-walks/rc-synth-corrections.json`, one row per entry, for the manager to apply.

---

## 4. Designs refused, and the rule that killed each

A synthesis lane that reports only its successes is hiding its error rate.

1. **Three Draven, Audacious + three Tryndamere in one attack (Fury/Chaos, 7 points).**
   The arithmetic works — 466.3.c ("Units at this battlefield inherit the same combat result as their
   controllers") pays all three Dravens on one won combat, 383.4.c.2.a pays all three Tryndameres on
   the Conquer, plus the Conquer's own Score point. **Refused on cost and on a printed drawback**, not
   on a rule: six bodies at E7+2P and E6+1P is 39 Energy and 9 Power of deployment, and Draven prints
   *"When I die in combat, choose an opponent. They score 1 point"*, so the garrison that 465.2.c lets
   the defender assign its summed Might with hands a point back for every Draven it kills. A line
   whose failure mode pays the opponent is not a finisher.
2. **Power Nexus in Fury/Chaos.** `SFD-214` wants 4 rainbow Power on the Hold, and 383.3.b makes that
   an "you may pay X to Y" BASE COST paid at finalization (383.3.b.1), with 312.2.c withholding
   priority until every pending chain item finishes finalizing — so the Power must be in the pool
   before the Beginning Phase, and 167 empties the Rune Pool at the end of every turn, so it cannot be
   banked across the turn boundary. The only funder in the pool is an Add that resolves on the Hold
   itself (429.2), which is `UNL-087 Blue Sentinel`, and it is **Mind**. Refused by 103.1.b.
3. **Reckoner's Arena as a universal multiplier.** `OGN-286` is colourless, so it looked like the
   multiplier every identity could have. Its text is *"When you hold here, activate the conquer
   effects of units here"* — it converts a Hold into the CONQUER effects standing there, and Trinity
   Force's *"When I hold"* is a Hold effect, not a conquer effect. It does nothing for the Body/Chaos
   line. Refused by reading the card rather than the reputation.
4. **Body/Order on Shen + Trinity Force, which stops at seven.** `VEN-138 Shen` pays only "if there is
   exactly one other unit you control here", so a battlefield can hold at most one paying Shen plus
   one companion; the best split of two battlefields, two Shen and three Trinity Force is
   2 Score + 2 Shen + 3 Trinity = 7. Adding `UNL-177 Ivern` as an eighth point puts a third body at
   a battlefield and switches that Shen off — the additions are mutually exclusive by Shen's own
   Trigger Condition (383.2.a.1). **Body/Order is still an empty cell and this was the obvious
   attempt; it fails by one point.** Left open deliberately rather than fudged.
5. **A third On the Hunt for a fourth Yasuo point.** Yasuo reads *"The third time I move in a turn"*,
   so a fourth move pays nothing; and 103.2.d.1 caps the deck at three Signature cards anyway. Same
   refusal `on-the-hunt-yasuo-triple-third-move` already carries; re-derived rather than inherited.
6. **Baron Pit as a third battlefield for the Body/Chaos line.** `UNL-147 Baron Nashor` is mono-Chaos
   and legal, and its token raises the per-turn Score ceiling to three, which would make the line 9.
   Refused as a component and kept as a notable: at E10 + 3 Power it costs more than the point it
   buys, and the line is authored at exactly 8 on a two-battlefield board on purpose.

---

## 5. Standing notes this batch earned

- **A "class by identity" count is computed from `uses[]` and therefore understates what a deck may
  run.** `chaos/fury` reads as 50 ENGINE and zero finishers; a Fury/Chaos deck can in fact run
  `tryndamere-brambleback-conquer`. Ask "what can this identity RUN" (domains ⊆ pair) before
  concluding a cell is empty, and say which of the two questions a number answers.
- **Synthesis and extraction find different things, and this batch is the evidence.** The Body/Chaos
  CHAIN is three cards that were each individually catalogued, in three different entries, and no
  card-adjacency search could ever have connected them: Trinity Force's text does not mention moving
  and Yasuo's does not mention holding. The only thing that connects them is a target — eight points
  in one turn — and an identity.
- **The adversarial pass is cheap and it found a twelve-entry hole on the first try.** The question
  "what is the cheapest card that beats this, and does the entry say so?" is mechanical enough to
  script, and the answer was that the catalogue already owned the answer card and had never aimed it.


---

## 6. Batch 2 — the second empty cell closed: `ivern-arena-trinity-body-order-hold` (BURST, verified)

Same method, same census, the other empty cell. Body/Order could run 151 entries, of which 145 were
ENGINE and 6 ALT_WIN — zero of the three point classes. The design question was target-first and in
two parts:

1. **Body/Order owns no trigger multiplier.** All three in the pool are `OGN-236 Karthus, Eternal`
   (Order, but Deathknell only), `UNL-029 Red Brambleback` (Fury) and `UNL-087 Blue Sentinel` (Mind).
   So the only multiplier the identity can reach is the COLOURLESS battlefield `OGN-286 Reckoner's
   Arena`: *"When you hold here, activate the conquer effects of units here."*
2. **What is the best payoff Body prints to feed it?** `SFD-115 Trinity Force`, again — but it is a
   Hold effect only, so the Arena does NOT double it. What the Arena doubles is `UNL-177 Ivern,
   Friend to All`, whose *"When I conquer or hold"* wording 823.1.b and 823.1.c.1 make both a Conquer
   Effect and a Hold Effect, and Ivern is Order.

So the two halves of the identity do different jobs: **Order supplies the doubled payoff, Body
supplies the flat one, and the multiplier is colourless.**

One Hold at the Arena, with 3 Ivern and 3 Trinity Force:

| source | rule | points |
|---|---|---|
| the Hold itself | 315.2.b.2 → 471.1 | 1 |
| three Ivern, hold face | 471.2 + 383.4.d.2.a | 3 |
| three Trinity Force | 471.2 + 434.1.c | 3 |
| three Ivern, conquer face, activated by the Arena | 383.4.g.1 | 3 |
| | **one scoring event** | **10** |

Formula, extending the one `ivern-arena-sentinel-hold` publishes: **1 + (2N + T) × (1 + K)**, N =
Ivern present, T = Trinity Force present, K = Blue Sentinel present. That entry is N=2, T=0, K=1 → 9
and is **Mind/Order**, so a Body/Order deck cannot run it; this one is N=3, T=3, K=0 → 10. The
Sentinel multiplies and the Trinity Forces add, so neither entry dominates the other — they are the
same mechanism in two identities.

383.4.g.1's worked example is Reckoner's Arena **by name**, and it is quoted untruncated in the
entry's own sources, so nothing here rests on a reading: *"…treating the conquer portion of the
condition as having been fulfilled. If all of the conditions are fulfilled for a conquer effect, it
is placed on the chain as if it had just triggered."* Ivern's non-conquer portion is the four tags,
and it is met.

Two refusals from this batch, both recorded in the entry itself:

7. **`VEN-138 Shen, Leader of the Kinkou Order` at the Arena, the obvious Body/Order first attempt.**
   Refused at SEVEN. Shen pays only "if there is exactly one other unit you control here", and
   383.2.a.1 makes that count part of the Trigger Condition — so a battlefield holds at most one
   paying Shen plus one companion, and putting Ivern beside him switches him off. Shen and Ivern are
   mutually exclusive at one battlefield, which is why the entry that shipped uses neither Shen nor a
   second battlefield.
8. **`SFD-030 Skyfall of Areion` to double the Trinity Forces too.** Its Effect Text is *"My hold
   effects are also conquer effects, and vice versa"*, which would turn each carrier's Trinity Force
   into a conquer effect and have the Arena pay it twice — 15 points instead of 10. It is **Fury**,
   so 103.1.b keeps it out of Body/Order entirely. The escalation is real and it lives in another
   identity (`brambleback-trinity-skyfall-conquer`). Recorded so the next reader does not spend a
   walk discovering the domain.

**Both cells that had zero of all three point classes are now closed**, and by the same method: find
what the identity uniquely owns, find the colourless or cross-domain piece that connects it, and
check the arithmetic against the quantities the entry declares.


---

## 7. The adversarial pass is now a script, and the turn clock answers a question about the whole catalogue

`scripts/adversarial-check.mjs`, wired as `npm run adversarial`. On rc-manager5's instruction the
SCRIPT is the deliverable rather than the hand-written batch of notables, because a check that runs
over the whole catalogue every time beats one pass by hand. `--strict` exits 1 if any finisher has an
unanswered hole; `--turns` prints only the clock. It sweeps its own answer sets out of
`data/cards.json` rather than carrying a typed list, so it cannot go stale against a new set.

**Run over all 71 finishers (the hand pass had covered only the 29 BURST and CHAIN entries), it finds
22 unanswered holes, and the classes the hand pass never reached are where most of them are.** The
INFINITE and ALT_WIN entries are full of Equipment nobody has aimed a gear kill at — `Eye of the
Herald` appears in six of them, `Svellsongur` in five — and six entries stand on a Might-1 body
(`Keeper of Masks`, `Soaring Scout`, `Spiderling`, `Watchful Sentry`) without ever naming
`OGN-133 Flurry of Blades`, which kills all of them simultaneously for 1 Energy at [Reaction] speed.

### The turn clock: 32 of 45 point-scoring finishers are SLOWER than doing nothing

Measured against the do-nothing Hold curve of
[the unopposed clock](../../plays/2026-09-12-the-unopposed-clock.md) — turn 5 in an identity that
reaches one of the pool's two Energy-1 units, turn 6 otherwise — and using an **optimistic lower
bound** for the finisher: perfect draws, nothing else ever cast, no interaction, domains ignored when
paying Power, and the slower seat (going first, since 485.7 gives the extra rune to the player going
second).

| class | slower than the baseline |
|---|---|
| INFINITE | **3 of 14** |
| BURST | **17 of 18** |
| CHAIN | **12 of 13** |
| all | 32 of 45 |

**The split is the finding, not the total.** An INFINITE is a small cheap loop and comes online on
turns 3 to 5 — `lux-infinite-power` is turn 3, and six more are turn 4. A BURST is a pile of
expensive bodies and comes online on turns 6 to 8; a CHAIN usually carries `OGN-122 Time Warp` at
E10 + 4 Power a copy and reaches turns 7 to 14. `bottled-constellation-time-warp` is 60 Energy and 18
Power of deployment, which is **turn 14**.

So the classes divide by what they are FOR, and the catalogue has never said so:

- **INFINITE beats the clock** and therefore changes what you do with the game.
- **BURST and CHAIN almost never beat it.** Their nine or seventeen points are redundant against an
  opponent who lets you hold two battlefields, because eight points were already arriving on turn 5
  or 6 for free. They are worth their slots only on a board the opponent is contesting, where the
  Hold curve has stalled and one scoring event has to make up the whole deficit.

That is not an argument against any entry. It is the missing sentence in every one of them, and it
only became askable once a line was denominated in turns.


---

## 8. `--emit-notables`, and a correction to my own headline from section 7

### The script now writes its own corrections file

`node scripts/adversarial-check.mjs --emit-notables` emits the 22 findings as a corrections file in
the shape the manager merges — `entry`, `action`, `why`, `notables_to_append`. The reasoning is
rc-manager5's: **a player reading riftcombo.app never runs npm, so a hole only the script knows about
is invisible to the only audience that matters.** The script stays the source of truth; the entries
carry the warning.

Generated prose is still prose, and reviewing it found three defects that would have shipped:

1. **A non-greedy `\((.*?)\)` truncated a nested parenthesis**, so `Spiderling (M1)` came out as
   `Spiderling (M1`. Anchored on the finding's own tail instead.
2. **The first draft named Thermo Beam against every Equipment line, including ones with a single
   copy.** "Kill all gear" for 5 Energy and 2 Power is not the answer to one attached gear; the
   emitter now picks the headline by copy count, naming `SFD-005 Detonate` (E1 + 1 Fury Power) for a
   lone Equipment and Thermo Beam only from two copies up.
3. **The first draft listed all 16 swept gear kills as "answers".** Several only reach a FRIENDLY
   gear or are gated — Jayce and Malzahar kill your own, Zaun Punk's is an additional cost, Bottled
   Constellation is a payoff, Pickpocket caps at Energy cost 1 and Noxian Demolitionist at its own
   Might, Decree of Unity reaches only an enemy Chaos card. The notable now names the six
   unconditional enemy-facing ones and points at the predicate for the rest.

Every rule the emitted prose cites was opened and read before it shipped — 143.2.a, 155, 312.2.a,
312.2.c, 718.2, 718.5.b, 721.2, 806.1.c.1, 813.1.c.1 — and every card text was pasted from
`data/corpus_flat.txt`. 312.2.a is worth quoting because it is what the whole timing argument rests
on: *"When the turn is in a Neutral Open State during their Main Phase"* — **their own** Main Phase,
which is why an opponent cannot answer anything in your Beginning Phase except with a [Reaction].

### The correction: "INFINITE 3 of 14" understated them, and I reported it before checking the shape

Section 7 reported that only 3 of 14 INFINITEs are slower than the do-nothing Hold curve, and drew
the conclusion that an INFINITE "beats the clock". **Ten of those fourteen produce only FUEL** —
`infinite-energy`, `infinite-power`, `token-body-engine` — and no points at all. Measuring the engine
alone understates them by the entire cost of whatever consumes the fuel, so the number was not
comparable to a BURST's.

The clock now folds the `needs`/`produces` DAG: for a fuel-only entry it adds the cheapest consumer
that both produces points and can legally share a deck (103.1.b caps the union of the two entries'
domains at the legend's two). The corrected figure is **33 of 45 slower — INFINITE 4 of 14, BURST 17
of 18, CHAIN 12 of 13.** The conclusion survives and is now honestly measured, but the margin was
mine to check and I did not.

Two things the DAG pass surfaced that are worth more than the number:

- **`ready-recruits-grand-plaza` is the universal consumer.** Five of the ten fuel-only engines route
  into it and nothing else. That is a single point of failure for half the INFINITE class, and it is
  an ALT_WIN standing on seven 1-Might Recruits — which `OGN-133 Flurry of Blades` answers for 1
  Energy. The script flags that entry's own hole independently.
- **The model is ONE HOP and says so in its own comment.** It does not chain two fuel producers, so
  `lux-infinite-power` reads as having no consumer even though the catalogue routes it through
  `lux-infinite-energy` beside it. `generateVariants` in `src/combos.ts` is the real walker;
  the script now points at it rather than pretending to be it.


---

## 9. The stalled-board question, and the law showing up in a second place

### 9.1 The law: every in-turn repeatable point ability in the pool is MIND, and it explains two things

CLAUDE.md records this as a fact about `chaos/fury`. It is wider than that, and this lane found it in
a second place without looking for it.

`SFD-088 Renata Glasc, Mastermind` is the only card in the pool that converts resources into a point
inside the Main Phase, and she, `OGN-122 Time Warp` and `VEN-067 Bottled Constellation` are all Mind.
Everything else scores on a Hold (315.2.b.2, before the Main Phase) or a Conquer. So **a non-Mind
engine's unbounded resources have no in-turn outlet and must be spent into a Conquer window — which
means buying a Conquer finisher and paying for both.**

That is exactly what the turn clock found, without being told: **all three INFINITEs that are slower
than the do-nothing Hold curve are non-Mind.**

- `gemdragon-henge-vi-blind-fury` (Body/Fury) — 91 Energy and 9 Power across eleven cards and
  twenty-one copies, and its own `terminatesIn` says it then buys a separate Conquer BURST.
- `reveler-svellsongur-jhin-infinite-power` and `threshold-reveler-infinite-energy` (both Calm/Fury) —
  fuel engines whose only domain-legal one-hop consumer is
  `reveler-loop-nasus-brambleback-conquer`, itself a 30+ Energy Conquer BURST.
- `jhin-virtuoso-ekko-malzahar-vi` (Fury/**Mind**) is the only one of the four that wins on its own —
  it produces `ability-points` and terminates in 8 — and it is slower by exactly one turn.

The `--stalled` pass below confirms it from a third direction: of the eight finishers whose board
dependence is nil, **five are Mind engines running Renata Mastermind or Bottled Constellation, and
the other three are the two `OGN-076 Gutter Palace` ALT_WINs and a fuel engine that scores nothing.**
The board-independent finishers in this pool are the Mind ones plus the cards that literally say you
win. That is a structural fact that survives the catalogue changing.

### 9.2 `--stalled`: 29 of 71 finishers die with the curve they exist to rescue

rc-manager5's third question: if a BURST earns its slot only where the Hold curve has stalled, the
honest test is not "how many points" but "does this line still work after it has been stalled".

`node scripts/adversarial-check.mjs --stalled` classifies every finisher from the printed text of its
own `uses[]`, falling back to the entry's own authored steps where no card prints the word — because
an entry can score on a Conquer without any card mentioning one, the Conquer being the game's own
scoring mechanism (469.1) rather than a card ability. **The bucket shows which signal it used, and
the matched phrase, so a reader refutes it in one look.**

| bucket | n | what it means |
|---|---|---|
| **ATTACK** | 7 | needs the Attacker designation, which 807.1.d and 323.9 make impossible without an enemy garrison — **dead on an empty board, alive on a contested one** |
| **CONQUER** | 27 | scores on a Conquer, and a battlefield the opponent took is a Conquer target, so the stall does not switch it off |
| **HOLD** | 29 | scores on a Hold, which needs battlefields you ALREADY control — **the stall that makes the line necessary is the stall that switches it off** |
| **INDEPENDENT** | 8 | nothing about the board reaches it |

**Only seven finishers have the shape rc-manager5 described**, and one of them is the mono-Fury
`tryndamere-brambleback-conquer` — the single finisher `chaos/fury` can run, and the one this lane
was originally pointed at as evidence that the cell was empty. **The property I catalogued in batch 1
as that identity's WEAKNESS — three of its four point sources are opponent-gated — is the same
property that makes a finisher earn its slot.** Tryndamere needs an enemy garrison; that is why he is
worth a card.

Four of the other six are `VEN-020 Twilight Reveler` loops, whose "When I attack, ready another
friendly unit" cannot fire on an empty battlefield — the trap CLAUDE.md records as "entering an EMPTY
enemy battlefield is not an attack", read from the other side: it is not only a trap, it is a
credential.

**Eleven of the 29 in the HOLD bucket are Grand Plaza lines**, which need seven bodies standing at a
battlefield you control at your own Beginning Phase. An opponent who stalls your curve by taking that
battlefield answers all eleven with the same action.

### 9.3 Two limits of this pass, stated rather than buried

- **The classification is a first pass from text, not a verdict.** `OGN-220 Facebreaker` ("Stun a
  friendly unit and an enemy unit at the same battlefield") genuinely needs an enemy body and prints
  no attack wording, so it reads as a FLAG rather than as ATTACK-gated; `VEN-052 Mesmerize` names an
  enemy unit in an optional mode and is a false positive of the same flag. Both are surfaced as
  "read it", never asserted.
- **It is one hop, like the clock.** An entry that scores through a `needs` dependency carries its
  board dependence in the OTHER entry, and this pass does not follow the edge.


---

## 10. Batch 3, part one — a correction to the answer set the script sweeps, and to 14 shipped notables

rc-manager5 relayed a finding from the 500-829 lane: the sentence `--emit-notables` wrote into 14
entries says no answer reaches their scoring window, and it was measured with a KILL predicate
(`/\bkills?\b[^.]{0,80}\bgear\b/i`). A kill predicate structurally cannot see an answer that takes
the Equipment OFF instead of destroying it, and one exists at [Reaction] speed.

**This is the same lesson section 8 records, arriving from the other side.** There, naming all
sixteen swept kills as "answers" would have been false in the entry's voice, so the emitter was
narrowed to the unconditional enemy-facing subset. Here the set was measured correctly and the
QUESTION was wider than the predicate. Both are the same failure: *state the predicate with the
number, and check that the predicate answers the question you are actually asking.*

### The detach population, re-measured rather than inherited

The relay named four cards. Swept here with `/\bdetach/i` over `text` + `effect` of every deckable
base in `data/cards.json`: **5 base codes, 4 names** — Grandmaster at Arms is printed twice
(SFD-193, SFD-245), which is the name+type fold this project already requires of every census.

The number that matters is smaller, and it is a **second sweep rather than a typed list**: a
detacher whose text confines it to `friendly` or `you control` cannot answer an opponent's line at
all.

| base | name | domain | enemy-facing? | the words that decide it |
|---|---|---|---|---|
| SFD-011 | Angle Shot | fury | **YES** | "an Equipment with the same controller" |
| SFD-107 | Strike Down | body | no | "Choose an equipped **friendly** unit" |
| SFD-193 / SFD-245 | Grandmaster at Arms | calm/body | no | "Attach a detached Equipment **you control**" |
| SFD-221 | Veiled Temple | colourless | no | "you may ready a **friendly** gear" |

**So the enemy-facing detach population is ONE card.** `SFD-011 Angle Shot` — Fury, 2 Energy, no
Power, and it cantrips: *"[Reaction] (Play any time, even before spells and abilities resolve.)
Choose a unit and an Equipment with the same controller. Attach that Equipment to that unit or
detach that Equipment from that unit. Draw 1."*

What it provably does is in two paragraphs, both quoted untruncated in the emitted prose: **719.1**
appends an attached card's Effect Text to its carrier *"for as long as they remain Attached"*, and
**137.3.a** stops the Might Bonus *"as soon as the card with the Might Bonus is no longer Attached"*.

### What is NOT walked, and is now said so in the entries themselves

Whether a detach **inside** the scoring window accomplishes anything is open, and the emitted prose
says so rather than implying an answer. A Trigger Condition is measured when the trigger is PLACED
(383.2.a.1 makes a clause immediately after the trigger *"part of the Trigger Condition and not the
Effect"*), so stripping the Equipment once its trigger sits on the Chain may well change nothing —
and nobody has walked what becomes of a chain item whose source text has gone. **Naming a card
without naming that limit is how a reader gets it wrong**, which is why the notable carries both.

### The script change, not 14 hand edits

`scripts/adversarial-check.mjs`:

1. **A second swept answer set.** `gearDetach` (predicate above) plus an `enemyFacing` filter;
   `gearAnswers = gearKills + detachAnswers` is what the hole check now accepts as "this entry has
   named an answer". Swept, never typed, so it cannot go stale against a new set.
2. **`REACTION_NOTABLE` is hoisted to one module-level const**, because two modes now need the
   identical sentence and a copy in each would drift.
3. **`--recheck-notables`**, a new mode. `--emit-notables` only ever ADDS a notable to an entry with
   no answer at all, so once a batch is merged it goes quiet — which is exactly when a shipped
   notable can turn out to be wrong. The new mode finds the stale sentence and emits one replacement
   row per entry, **matching on the sentence and not on an index**, because indices shift when
   another lane edits an entry; the index is reported for the applier to CHECK, never to trust. It
   writes a file (`--out`, default `/tmp/rc-walks/rc-synth-recheck.json`) rather than stdout, since
   the report sections would otherwise be interleaved with the JSON.

Run: `node scripts/adversarial-check.mjs --recheck-notables` → **14 rows**.

### Reading the generated prose again caught three more defects

Section 8's rule held a second time; none of these would have been visible without reading the
output.

1. **The timing claim was stated as if all 14 entries shared one scoring window.** They do not. A
   Hold pays at 315.2.b.2 inside your own Beginning Phase, where 312.2.a gives the opponent no
   priority and 813.1.c.1 admits only a [Reaction] — no kill reaches it. A line that pays in the
   MAIN PHASE has no such protection: 806.1.c.1 puts Thermo Beam and Salvage inside any showdown on
   any player's turn. The 14 are a mix of both, so the notable now states the fork and tells the
   reader to check which case the entry is. **The first draft would have shipped a false protection
   claim to every Main-Phase line in the set.**
2. **383.2.a.1 was cited as though it settled the late-detach question.** It is the reason to DOUBT,
   not the answer; the prose now says that in those words.
3. **The name count was `gearDetach.length - 1`** — right by luck at 5, wrong the moment a second
   duplicate printing appears. It folds on name now, like every other census in this project.

### Two counts that look contradictory and are not

The relay said "36 shipped notables", this lane measured 14. Both are right and they answer
different questions: `--emit-notables` produced **36 notables across 22 entries** — 14 carrying the
718.5.b Equipment notable, 14 carrying the stale [Reaction] sentence, 8 carrying the Flurry of
Blades notable — and the stale SENTENCE is in 14 of them. Say which question a count answers.


---

## 11. Batch 3b — `draven-svellsongur-bloodless-combat-burst` (BURST, verified, calm/chaos)

**The first line in this lane designed FROM the credential rather than tested against it.** Section 9
found that only seven of 71 finishers are dead on an empty board and alive on a contested one. This
one was built to have that shape before any card was chosen.

The target: eight points paid by something the opponent has to *let* happen. 194.1 has three point
sources, and swept over the thirteen cards whose text gains a point, exactly one is paid by a COMBAT
RESULT rather than by a Hold or a Conquer — `SFD-148 Draven, Audacious`, *"The first time I win a
combat each turn, you score 1 point."*

**And the catalogue already owned the mechanism without ever scaling it.** 466.3.a is cited by **24
entries, and every one of them is an ENGINE.** Same shape as section 3's Thermo Beam finding: the
gun was in the cupboard and nobody had aimed it.

### The multiplication, and the one reading it rests on

Three `SFD-059 Svellsongur` on Draven compose 1 → 2 → 4 → **8** instances of his trigger, by exactly
the layer argument `svellsongur-copy-hold` derives (434.1.c, 477.2.c, 476.1, 479.1, 480.3). Eight
ability Gains already reach the Victory Score on their own; the Conquer that follows is a ninth.

The new question — and the entry says so in its own voice — is the **"first time … each turn" cap**.
It pays eight times because **383.3.e.1's subject is the ABILITY**: *"Such a Triggered Ability will
only be performed the specified number of times each turn. If its trigger condition would be
fulfilled and it has already been performed that many times, it does not trigger."* Instance two has
been performed zero times. 383.1.b does not collapse them either — it governs ONE ability facing
several simultaneous condition instances, and here there is one win event facing eight abilities.

The project settled this shape one level out already: the 2026-09-09 correction on
`draven-glorious-executioner-point` makes three Dravens at one won combat three points, on 466.3.c
plus 383.3.e.1 *"caps each of them individually"*. This moves the same argument **from three objects
to eight instances on one object**, which 383.3.e.1's wording permits because it never mentions an
object. The counter-reading is named in the entry so a future ruling has something to overturn: if
the count were a fact about the UNIT, the line pays 2 and is an ENGINE.

### Alpha Wildclaw is in `uses` because the failure mode is losing, not fizzling

Eight copies of *"When I die in combat, choose an opponent. They score 1 point"* ride on one body.
The opponent's out is to restore a defender AFTER the removal resolves — 323.6 strips their Control
only *"if the turn is in an Open State and there is no Showdown or Combat ongoing there"*, so inside
the Showdown 355.2.a still admits a play there.

**Swept, that threat is ONE card.** Over units of Might 6+ (the bar to kill a M6 Draven):

- **zero** carry `[Reaction]` in their own text once parenthesised reminder text and quoted token
  text are stripped. `UNL-018 Yeti Brawler` is a false positive of the naive grep — its `[Reaction]`
  belongs to the Gold token it makes. *(Instrument error caught before it became a finding.)*
- **three** carry `[Ambush]`, which 822.1.b makes short for *"I may be played to a battlefield where
  you control Units"* — false once the garrison is gone. Only `UNL-120 Rengar, Trophy Hunter` lifts
  it with its own text; `UNL-166 Stalking Wolf`'s lift points at the battlefield of the tagged body
  it kills as a cost, not at the one you just emptied.

`UNL-057 Alpha Wildclaw` (M7 `[Tank]`) answers it completely: 815.1.c.2, *"Units without Tank are
invalid assignments until all units with Tank have lethal damage assigned to them"*, means Rengar's
summed 6 never reaches lethal on a 7 and Draven is never a legal assignment. Even a M8 body assigns
7 and has 1 left under 465.2.c.4 — not the 6 that kills. His second clause is a 054.1 prohibition on
Draven, which is strictly stronger than `[Deflect]`'s tax.

### Deploy the gear late — the difference between a trap and a line

An unattached Svellsongur copies nothing, so the three attaches belong on the turn you swing. Until
then Draven carries ONE copy of the drawback rather than eight sitting out through an opponent turn.
That also makes the burst turn **6 Energy and 4 Power**, against 27 Energy and 10 Power for the whole
package counted from scratch.

It classified into the ATTACK bucket on the next `--stalled` run, as the second BURST there.

---

## 12. Batch 3c — `ivern-arena-draven-chaos-order-chain` (CHAIN, verified, chaos/order)

The last identity with **zero BURST and zero CHAIN**. The method was section 6's: find what each half
uniquely owns, and find the colourless piece that connects them.

**Chaos/Order owns exactly two scoring cards.** Swept for Chaos or Order text paying on a conquer, an
attack or a combat win: 18 distinct names, of which two gain a point — `UNL-177 Ivern, Friend to All`
(Order) and `SFD-148 Draven, Audacious` (Chaos). All three printed trigger multipliers are out of the
identity, so the only one reachable is the **colourless** `OGN-286 Reckoner's Arena`.

### Why it kept landing on seven

| attempt | arithmetic | total |
|---|---|---|
| 3 Ivern at the Arena, one Hold | 1 Score + 3 hold-faces + 3 conquer-faces via 383.4.g.1 | **7** |
| 3 Draven + 3 Ivern, one bloodless combat win | 3 + 3 + 1 Conquer | **7** |
| 3 Draven + 3 Ivern split across both battlefields | reaches 8 — at 44 Energy and 5 Power, turn 9+ | refused on cost |

**The route that works uses both PHASES of one turn instead of buying more bodies.** The Hold pays
seven in the Beginning Phase (315.2.b.2); Draven wins a combat in the Main Phase for an eighth and
the Conquer is a ninth. E29 and only **2 Power**, because Ivern is E6 with no Power cost at all.

### The design idea, which is the entry's reason to exist

**The two halves want opposite boards.** The Ivern half is Hold-gated — the bucket section 9.2 shows
dies with the very stall it exists to rescue. The Draven half is its exact complement: 323.9 stages a
combat only where opposing units meet, so it pays *only* where the opponent has garrisoned. Neither
half covers both board states; together they do. Seven of the nine are Hold-gated and **the entry
says so rather than pretending the whole thing is a credential line** — the fully credential member
of this family is batch 3b, and it lives in Calm/Chaos because Svellsongur is Calm.

### Two things worth carrying

- **The eighth point is an ability Gain, so 471.1.b never gets to bite.** At seven you are one from
  the Victory Score, exactly where 471.1.b.1 gives the Final Point only *"If the player has Scored
  every Battlefield this turn"*. Draven's point is not a Conquer, and 471.1.a.1 says *"points Gained
  from sources that are not Conquer are not beholden to these restrictions"*. The line would pass the
  clause anyway; it never has to, and an entry that depended on it would be one clause more fragile.
- **Chaos/Order is a forced shell.** Measured over `data/cards.json`, the pool prints a single
  Chaos/Order legend NAME — Heart of the Tempest (VEN-155, VEN-197). Its `[Assault 2]` takes Draven
  to 8 Might while attacking, which is above the one reinforcement body that threatens him, but it
  needs the legend Empowered and costs its exhaust: recorded as available, never counted.

### The quote checker earned its keep again

Two defects caught before staging, both in text presented as verbatim: **807.1.c was reworded** (I
wrote *"+2 Might while I am an attacker"*; the rule reads *"It is functionally short for 'While I am
an attacker, I have +X [M].'"*), and a card quote had its sentence-final period outside the quote
mark. Neither changes the argument, which is exactly why neither would have been noticed by reading.
**Run the explicit list; do not extract quotes with a regex over the whole JSON** — apostrophes in
ordinary prose make single-quote span extraction match across field boundaries, which produced 23
bogus failures on the first attempt and is an instrument error, not a finding.


---

## 13. Batch 4 — chaos/fury, and a refutation of this lane's own batch-1 refusal

rc-manager5 directed this slice at chaos/fury with the Angle Shot lead. Two entries came out of it
and one refusal, and the biggest finding was not the one that was looked for.

### 13.1 The refusal that was wrong: Power Nexus needs no Mind card

**Batch 1 refusal #2 refused `SFD-214 Power Nexus` in Fury/Chaos by 103.1.b.** Its reasoning: 383.3.b
makes the four rainbow a BASE COST paid at finalization (383.3.b.1), 312.2.c withholds priority until
every pending chain item finishes finalizing, and 167 empties the Rune Pool at the end of every turn
— so the Power must be banked in advance, the only funder that Adds on the Hold itself is
`UNL-087 Blue Sentinel`, and the Sentinel is Mind.

**Every step of that is true except the inference.** The paragraph that breaks it is **444.2.c**:

> Players may activate abilities that Add resources with the Reaction keyword at any time that they
> are instructed to Pay resources. Those abilities finalize and resolve immediately, ignoring normal
> restrictions.

**Priority is not payment.** The instruction to pay *is itself* the window. Three more paragraphs
make the runes sufficient, and the third is the one that looks like a mismatch:

- **164.2** gives every Basic Rune exactly two abilities and **both carry Reaction**, so 444.2.c
  reaches them. 164.2.b's cost is the RECYCLE, not an exhaust, so a rune already tapped for Energy
  still pays.
- **164.2.b.1**: *"The Power added this way corresponds to the Domain of the Rune that is being
  Recycled"* — domain Power, against a rainbow cost.
- **135.2.e.5.a**: *"When required as a cost, [A] can be paid by Power of any Domain."* Resolved.

Price: four runes per point. 161.2.b returns them *"to the Rune Deck, not the Main Deck"*, 161.2.a
caps that deck at *"Exactly 12 Rune cards"*, 315.3.b channels two a turn — so it is **one extra point
every two turns at zero card cost**, or up to three in consecutive turns by drawing a full board down.

**What it changes for the catalogue, as of 2026-09-12.** All five existing Power Nexus entries pair
it with a Mind card, and **none of them cites 444.2.c**; across the whole catalogue that paragraph is
cited by exactly one entry (`shakedown-immortal-phoenix-reaction-add-at-finalization`), which found
the rule and never applied it here. The five are not wrong — a Gold or a Sentinel Add is cheaper than
four runes — but they are optimisations of a line that runs without them.

**The general form is worth more than the battlefield.** Any *"you may pay X to Y"* trigger in the
pool is payable out of runes at the instant of finalization, in any identity. *Before refusing a line
because its Power cannot be banked across 167, check whether the runes are simply still on the board.*

### 13.2 `angle-shot-battleaxe-tryndamere-excess` (ENGINE) — the lead applied

The lead was right about what makes `SFD-011 Angle Shot` unusual and the sweep confirmed it: **818.1
makes [Equip] an Activated Ability and 381 confines every Activated Ability to *"the Controlling
Player's Turn and during an Open State"*, so Angle Shot is the only way in Fury to move an Equipment
at Reaction speed.** Swept over every card that attaches an Equipment by EFFECT, the Fury-legal ones
are three [Weaponmaster] bodies (821.1.c attaches *"to me"*, never to a chosen carrier),
`SFD-024 Rell, Magnetic` (attaches to herself, and caps at Energy cost 2), `SFD-208 Forge of the
Fluft` (a colourless battlefield, free but it exhausts your legend and is itself a 1-in-3) and Angle
Shot. Only Angle Shot is a card you can draw *and* works in a Closed State.

**The number the entry is for: the beatable garrison goes from 3 Might to 7.** Excess damage is
attacking Might never assigned (R28 = A) and 465.2.c.4 caps assignment at *"the minimum required to
constitute lethal damage"*, so against a garrison of summed Might D a lone `OGN-034 Tryndamere` needs
8 − D ≥ 5, i.e. **D ≤ 3 — a single Might-4 defender beats him by one.** Carrying `UNL-019 Blighted
Battleaxe` (+4, the largest Might Bonus in the identity) he is 12, so D ≤ 7.

And the Reaction timing is not a luxury: the ordinary route commits the Battleaxe in the Main Phase,
before the Combat stages (323.9) and opens (323.13) and therefore before the garrison is known. Angle
Shot lands inside the opened Showdown, after 464.2.c.3 has designated the attackers. **Being able to
DECLINE is most of its value** — at D ≤ 3 Tryndamere already clears the threshold and the card is a
2-Energy cantrip.

### 13.3 Refused: a chaos/fury CHAIN. It would be strictly worse than the BURST the identity has.

`tryndamere-brambleback-conquer` publishes **1 + T × (1 + K)**, and at T=2, K=3 that is **9 points in
one Conquer** for five bodies. Every CHAIN route costs more cards for fewer points:

| route | arithmetic | verdict |
|---|---|---|
| Power Nexus Hold + Tryndamere Conquer, T=1 K=3 | 2 + (1 + 4) = 7 | one short |
| …plus a Draven combat win for the non-Conquer eighth | 2 + 5 + 1 = 8 | **8, but six copies across four names for one point less than the existing five-copy BURST** |

So chaos/fury is refused a CHAIN **on arithmetic, not on a rule**. Its Hold-side point source exists
(§13.1 proves it) and its Conquer-side BURST already reaches nine; a second scoring event buys
nothing. *A thin cell is not automatically a gap — check what the identity's existing finisher
already does before designing a second one.*


---

## 14. Batch 5 — the refusal sweep: find, classify, then walk only what survives

rc-manager5 scoped this as a **sweep and not a walk**, on the reasoning that refusals in this
catalogue look like they fail in CLASSES. Two classes were named: lines that **stall at seven**
(reopened by 471.1.a.1 / 471.1.b.1) and lines refused because a **resource could not cross 167**
(reopened by 444.2.c). The caution attached to the second is load-bearing and is applied below:
444.2.c reaches abilities that **ADD RESOURCES with [Reaction]**. It does not make every cost payable
at every moment, and a refusal that turned on a card needing to be in play, or on a body needing to be
present when a trigger was placed (383.2.a.1), is untouched by it.

### 14.1 Method

`.scratch-synth/sweep-refusals.mjs` splits three sources into **19,362 records** — every authored
string in `data/combos.json` (notables, steps, `terminatesIn`, `uses` notes), every paragraph of the
83 walk documents, every bullet of `CLAUDE.md` — and keeps records carrying **refusal language AND a
class marker**. That is 21 Class A candidates and 27 Class B. The script decides nothing: every
candidate below was read and classified by hand, because the distinction the caution draws is not
one a regex can make.

### 14.2 Class A — stalls at seven. Three named, ONE reopens.

| # | refusal | verdict |
|---|---|---|
| **A1** | Trinity Force + Skyfall + Reckoner's Arena = 7 (`2026-09-06-finisher-feeders.md` §7a) | **REOPENS** — §14.3 |
| **A2** | Karthus over Machine Evangel and Viktor, Leader = "SEVEN, not eight" (`CLAUDE.md`) | **NOT APPLICABLE** |
| **A3** | Body/Order on Shen + Trinity Force = 7 (this lane's own batch 2, refusal #7) | **STAYS REFUSED** |

**A2 is the classification that matters, and it says the named group of three was one too many.**
That seven is a count of **RECRUIT BODIES for a Grand Plaza line**, not a point total — *"Karthus
doubles `OGN-239 Machine Evangel`'s three Recruits to six and leaves `OGN-246 Viktor, Leader`'s one at
one, so that board is SEVEN, not eight."* 471.1.a.1 and 471.1.b.1 are about **points**. A body count
is untouched by either, and `OGN-293 The Grand Plaza` wants *"7+ units here"* anyway, so the sentence
is a correction of a count and never was a refusal. **Classify the unit before applying the rule.**

**A3 stays refused for a reason the rule does not reach.** The eighth point there would have to be
`UNL-177 Ivern` — which *is* a non-Conquer ability Gain, so the rule's antecedent is satisfied — but
adding him puts a third body at the battlefield and 383.2.a.1 makes `VEN-138 Shen`'s *"exactly one
other unit you control here"* part of the Trigger Condition, switching Shen off. **A board
constraint, not a Final-Point constraint.** (Body/Order was closed anyway by batch 2's
`ivern-arena-trinity-body-order-hold` at ten.)

### 14.3 A1 reopened, and the general form is worth more than the line

The refusal's arithmetic was right and its search was too narrow: it looked for an eighth point **at
the Arena**, found the only candidate (`OGN-066 Ahri`) was a third domain, and stopped. **A Duel has
two battlefields (485.4).** Walking a spare body into the second one Conquers it for the eighth, and
471.1.b.1 pays it *because both battlefields were Scored this turn* — the Hold Scored the Arena, the
Conquer Scores the other.

Nothing in that is new law. `swain-double-conquer`, verified since 2026-09-04, says it in its own
words: *"Second Conquer's own point is safe at 7 because both battlefields were scored this turn
(471.1.b.1)."* It had simply never been applied here.

> **The general form: a Hold-based seven at ONE battlefield in a Duel is an eight, because Holding
> one battlefield and Conquering the other IS Scoring every battlefield.** The refusal shape to
> distrust is a walk that searches for its eighth point *inside the same scoring event it built* —
> "one short" is a claim about that event, not about the turn.

`trinity-skyfall-arena-second-battlefield-chain` is staged: E18, 3 Body and 1 Fury Power, two
`UNL-111 Determined Sentry` at E1 being its whole non-gear cost. Cheaper than its sibling
`brambleback-trinity-skyfall-conquer` (E24 + 3 Body + 3 Fury) and wanting the opposite board — that
one pays where you are taking ground, this one where you are keeping it.

### 14.4 Class B — the class is REAL and it is wider than 444.2.c

The Power Nexus case needed 444.2.c specifically, because its payment moment sits inside a
finalization with no priority window. **Three more refusals in this catalogue fail on a plainer
version of the same error, and they do not need 444.2.c at all.**

**167 empties the POOL, not the board.** Both halves of that are already in `CLAUDE.md`, in different
bullets, and were never joined: *"Energy added in Awaken or the Beginning Phase is lost when the Rune
Pool empties at the Main Phase start (167)"* and, elsewhere, *"167 reads … the POOL, not the runes."*
**The error shape is assuming a resource must be ADDED when it becomes available rather than when it
is SPENT.**

| # | refusal | verdict |
|---|---|---|
| **B1** | `OGN-288 Startipped Peak` — the channelled rune is *"one extra rune, as Energy, from the FOLLOWING turn"* | **REOPENS, on a third reading** |
| **B2** | `SFD-219 The Papertree` — same two strikes, same shape | **REOPENS, same reading** |
| **B3** | `power-nexus-sentinel-renata-mastermind` × Time Warp — *"a full twelve-rune board yields at most twelve rune-units total"* | **CONCLUSION STANDS, REASON WRONG** |

**B1 and B2.** The rune arrives exhausted, so 164.2.a (whose cost is the exhaust) is dead that turn —
true. But **164.2.b's cost is the RECYCLE, not an exhaust**, so the exhausted rune recycles for 1
Power of its domain; and you do not have to do it in the Beginning Phase. The rune sits on the
**board**, which 167 never touches, so you recycle it **in the Main Phase, at the moment you spend**.
Both were already reopened once (by #170, for a rune-COUNT reason); this is a third and independent
reading: **the Peak's rune is 1 Power on the same turn, or 1 Energy next turn — your choice.**

**B3's conclusion survives but its stated reason is wrong, which is worse than it sounds** because a
wrong reason misdirects the next reader. The passage says a twelve-rune board *"yields at most twelve
rune-units total"*. It yields **twelve Energy AND twelve Power**: 164.2.a taps a rune for Energy,
164.2.b then recycles that same already-exhausted rune for Power. This project's own turn clock says
so in `scripts/adversarial-check.mjs`. Re-run against the real ceiling, the requirement of 14 Energy
+ 8 Power fails **on Energy alone, by exactly 2**, with 10 Power to spare — not "eighteen against
twenty-two". The fix that would reopen it is 2 Energy, not four resources, and the pool's only
Power-to-Energy conversion (`VEN-141 Butcher of the Sands`) cannot supply it: it is a Fury/Body
LEGEND against a mono-Mind line (103.1.b), and its Energy is restricted to *"play units or activated
abilities of units"*, which a Time Warp spell is not. **Refused, correctly, for the second time and
for a different reason.**

### 14.5 What the sweep says about refusals as a kind

Two classes, four reopenings, and **the two misses are the useful part**: A2 was a body count wearing
a point count's clothes, and B3 was a right answer resting on wrong arithmetic. Both would have been
"fixed" by a pass that matched on the marker instead of reading the record.

- **A wrong refusal is invisible in a way a wrong entry is not.** An entry has arithmetic, a card set,
  a validator and three cross-audits pointed at it. A refusal removes a line from consideration and
  leaves nothing behind to check.
- **State the UNIT with the number.** "Seven" meant points twice and bodies once in the same sweep.
- **A refusal is scoped to the reason that was given** — already in `CLAUDE.md` from #170, and it cut
  three more times here.


---

## 15. Batch 6 — the brief's target was stale, and the axis that replaced it: which identities have no finisher that SURVIVES a stall

Lane respawned. The brief pointed at "the five pairs with exactly one finisher — body/calm, calm/chaos,
chaos/fury, chaos/order, chaos/mind", a list computed at 727 entries. **Recomputed at 757 it is wrong in
two places**: this lane's own batches 3b and 3c closed calm/chaos (a BURST) and chaos/order (a CHAIN), and
chaos/mind now shows three CHAINs. Counting BURST + CHAIN, the thin cells today are body/calm, body/chaos,
body/order, chaos/fury, chaos/order and fury/order — six, not five, and only two of them overlap the brief.

But a thinness count is the wrong target now that every cell is non-empty, and this lane already said so:
§13.3 refused a chaos/fury CHAIN because that identity's existing BURST reaches nine and a second scoring
event buys nothing. **A thin cell is not a gap.** So the target was re-derived from §9.2's finding instead,
which is the one with teeth: 29 of 71 finishers are Hold-gated, and a Hold pays only on battlefields you
already control (315.2.b.2), so **they are switched off by exactly the stall that makes a finisher
necessary.**

Crossing the availability table with the `--stalled` buckets (`.scratch-synth/stall-by-identity.py`,
counting ATTACK, CONQUER and INDEPENDENT as surviving) gives the axis the brief was reaching for:

| pair | finishers available | survive a stall | of which BURST/CHAIN/INFINITE |
|---|---|---|---|
| **body/calm** | 3 | 1 | **0** |
| **body/chaos** | 3 | 2 | **0** |
| body/order | 7 | 4 | 1 |
| chaos/fury | 2 | 2 | 1 |
| fury/order | 8 | 4 | 1 |
| mind/order | 29 | 16 | 6 |

**Two identities have no BURST, CHAIN or INFINITE that survives a stalled board at all**, and in both cases
the only survivors are Grand Plaza ALT_WINs shared with four or five other identities — which §9.2 already
records as the eleven lines one opponent action answers together. That is a sharper and more defensible
statement of a gap than "few entries", because it names the board state under which the identity has
nothing.

body/calm was taken first. Its three finishers are `ahri-trinity-svellsongur-hold` (BURST, HOLD),
`svellsongur-copy-hold` is not available to it, and the one survivor is `dragonstorm-confront-grand-plaza`.

### 15.1 The design: the Conquer twin of a Hold BURST the catalogue already owned

Swept over `text` + `effect` of every deckable base folded by base code, the cards that gain a point on a
**Conquer** are exactly five: `OGN-034 Tryndamere` (fury), `UNL-177 Ivern` (order), `VEN-065` / `VEN-173
Swain` (mind), `VEN-053 Otterpus` (mind, and it DENIES an opponent's point rather than gaining one), and
**`VEN-046 Nasus, Ascended` (calm)**. Nasus is the only mono-Calm one, so he is the only Conquer payoff
available under all five Calm pairs.

`svellsongur-copy-hold` already multiplies `OGN-066 Ahri, Alluring`'s *"When I hold, you score 1 point"* by
three `SFD-059 Svellsongur` to seventeen points. **Nobody had put the same three gears on the Conquer
face**, even though the payoff is the same domain and the multiplication is the same settled layer
arithmetic. `scripts/have.mjs VEN-046 SFD-059` reports no entry on that card set or a subset, and a grep of
the 83 walk documents turns up no refusal of it.

`nasus-svellsongur-conquer-burst` (staged, verified, mono-Calm): 1 + N × (1 + K) at N = 8, K = 0 —
**nine points in one Conquer for 28 Energy and 7 Calm Power.** K is 0 because `UNL-087 Blue Sentinel`, the
only trigger multiplier that would raise it, is Mind.

**The trade, stated as a number, is the entry's real content and it is the sentence §7 said was missing from
every finisher.** Against its Hold twin: seven more Energy, eight fewer points, and what you buy is a payoff
that fires on a battlefield you do not already control. Simulated into the availability table, the one entry
raises the BURST count in all five Calm pairs and gives body/calm its first finisher that is not Hold-gated.

Three things it does not have to do, each checked rather than assumed:

- **It never passes the Final Point clause.** 383.4.c.2.a puts the conquer abilities on the Chain *"after
  the Unit(s) these effects correspond to are present at a Battlefield when a player gains control of it and
  gains 1 Victory Point from Conquering"* — so the Conquer's own point is the **first** of the nine and the
  point that crosses the Victory Score is an ability Gain. 471.1.a.1 then applies verbatim. §12's preference
  for a line that never has to pass 471.1.b.1, applied.
- **470 is spent on one point and cannot see the other eight**, since 469 defines Scoring as Conquer or Hold
  only and Nasus's printed "you score 1 point" is a 194.1.c Gain (R2 = A).
- **The unit is effectively unremovable and the gear is not.** Svellsongur copies `[Deflect 2]` along with
  everything else and 809.2 sums granted Deflect to **16**; but Deflect belongs to the object carrying it,
  and 718.5.b keeps the three attached gears legal targets that nothing taxes.

### 15.2 The honest counterweight, which the Hold twin does not pay

§10's correction applies here and the entry says so in its own voice: **a Hold pays in a window the opponent
cannot reach and a Conquer does not.** 312.2.a gives the opponent priority only *"When the turn is in a
Neutral Open State during their Main Phase"*, so no gear kill touches a Hold; but a Conquer is a Main Phase
event and 806.1.c.1 makes [Action] short for *"This can be played during showdowns on any player's turn"* —
`OGN-022 Thermo Beam` and `OGN-224 Salvage` reach the very showdown this line's move opens, and Thermo Beam
answers all three gears with one card. That is the price of the credential, not an oversight, and attaching
in the same Main Phase as the swing keeps the exposure to a single turn rather than a full opponent turn.

### 15.3 Three instrument errors caught in one batch, all of the same family

1. **`grep -E "^[[:space:]]*NNN\.[[:space:]]"` on the rules file returns zero for every paragraph.** The
   headings are written `476.1.` — with a **trailing** period — so an anchor requiring whitespace
   immediately after the number can never match. Eight rules in a row came back empty and read exactly like
   a discovery. `CLAUDE.md` already warns that a bare `^` misses the 89 headings after a form feed; this is
   a second, independent way the same grep lies, and the two compose. `.scratch-synth/rule.sh` handles both
   and prints the paragraph with its continuation lines.
2. **A point-gain sweep written `/gain \d+ point/i` missed `OGN-290`, which prints "gain**s** 1 point".**
   The singular-verb trap `CLAUDE.md` records for `kills? .* gear`, hit again on a different verb.
3. **"The only card that gains a point on a Conquer and is legal in a Calm identity" is not well formed**,
   and it was written into the staged entry before being caught. 103.1.b is a subset test against a legend's
   **two** domains, so a Calm/Order deck reaches Ivern and a Calm/Fury deck reaches Tryndamere. The claim
   that survives measurement is *mono-Calm* — available under every Calm pair. This is #98's "a legal-in-
   domain-X count is not well formed" biting a sentence in this lane's own output.

All three were caught by re-running rather than by reading, which is the standing rule: **an absence is a
measurement, and a measurement made with the wrong instrument is not one.**

### 15.4 Standing note

**Cross the availability table with the board-dependence bucket before calling a cell thin.** A count of
finishers per identity answers "how many lines can this deck run"; it does not answer "does this deck have
anything on a board it does not already control", and the second question is the one §9.2 showed matters.
Two identities answer it with zero, and neither was on the list this lane was handed.

---

## 16. Batch 7 — body/chaos, and the first line in this lane whose points DO NOT EXIST on an empty board

The second identity with zero surviving finishers (§15). Its only finisher,
`trinity-force-yasuo-battle-mistress-hold-and-moves`, takes five of its eight points from the Hold,
so a stalled board leaves it at three.

### 16.1 Why the identity had nothing, measured before anything was designed

Swept over `text` + `effect` of every deckable base folded by base code, the cards that gain a point
on a **Conquer** are exactly five: `OGN-034 Tryndamere` (fury), `UNL-177 Ivern` (order), `VEN-065` /
`VEN-173 Swain` (mind), `VEN-053 Otterpus` (mind, and it denies an opponent's point rather than
gaining one) and `VEN-046 Nasus` (calm). **None is Body or Chaos.** So Body/Chaos owns no
conquer-side point gain at all, and its entire point budget is four cards:

| card | domain | gated on |
|---|---|---|
| `SFD-115 Trinity Force` | body | a Hold |
| `SFD-214 Power Nexus` | colourless battlefield | a Hold |
| `OGN-205 Yasuo, Windrider` | chaos | three moves — board-independent |
| `SFD-148 Draven, Audacious` | chaos | winning a combat |

Drop the two Hold sources and the non-Hold ceiling is **3 Yasuo + 3 Draven + 2 Conquers = exactly
eight, with zero slack** — 2 Draven with 3 Yasuo is seven, and 3 Draven with 2 Yasuo is seven. That
is the whole reason the entry runs the full three copies of both payoffs, and it is a fact about the
identity rather than a preference.

### 16.2 `draven-yasuo-battle-mistress-contested-chain` (CHAIN, verified, body/chaos)

**Eight points on a board the opponent holds; five on a board they have abandoned.** That inversion
is the entry, and it is the first line in this lane where the *credential* is not a property the line
happens to have but the thing that makes its arithmetic work at all:

- **Unopposed** — your Beginning Phase Holds both battlefields for 2 and the three Yasuo move for 3.
  The two Conquers are worth nothing, because 469.1 defines a Conquer as gaining Control of a
  battlefield *"they did not yet Score this turn"* and the Hold already Scored them; and no Draven
  can win a combat, because 323.9 stages one only *"at each Battlefield that Contested was applied to
  that have Units present controlled by opposing players."* **Five.**
- **Contested** — the Holds pay nothing, both battlefields are unScored and therefore Conquer
  targets, and the Dravens have a combat to win. **3 + 2 + 3 = eight.**

The multiplication is settled rather than new: 466.3.c, *"Units at this battlefield inherit the same
combat result as their controllers"*, with 383.3.e.1 capping the ABILITY and not the player — so
three Dravens at won combats are three ability Gains, the argument `draven-glorious-executioner-point`
already carries and `draven-svellsongur-bloodless-combat-burst` extends to eight instances on one
object. That entry is Calm/Chaos because Svellsongur is Calm, which is exactly why it cannot fill
this cell.

**The Dravens may split, and that is what buys the second Conquer cheaply.** Winning a combat at a
battlefield the opponent controls IS the Conquer (466.5 with 466.5.d), so two Dravens at one
battlefield and one at the other still pays three ability Gains — each its own "first time" — and
pays TWO Conquer Scores instead of one, since 470 caps Scoring *"once per Battlefield per turn"* and
these are different battlefields. Splitting also means the three Yasuo never have to fight: once the
Dravens have Conquered, the Yasuo shuttle between your base and a battlefield you now control
(144.4.a, 144.4.b, each move exhausting by 144.2), so none is ever an attacker.

### 16.3 The failure mode pays the opponent, and Body is what answers it

Draven's second sentence is *"When I die in combat, choose an opponent. They score 1 point"*, and
465.2.c has the defender assign damage equal to their summed Might. With zero slack at eight, a
garrison that kills one Draven costs you one of your eight **and hands them one** — a two-point
swing. `OGN-127 Cannon Barrage` is the answer and it is the **Body half of the identity doing real
work**: Body, E2 + 1 Power, *"[Reaction] Deal 2 to all enemy units in combat"*, clearing a
two-Might-or-less garrison from inside the combat after 464.2.c.3 has designated the attackers, so
the garrison is known before you commit. 466.3.a then gives you the win with nothing assigned to your
side. `VEN-106 Wind and Ghosts` (Chaos, E3 + 1 Power, [Action]) is the single-target version for one
oversized body. Both are notables rather than `uses`, because no Trigger Condition requires them —
against a small enough garrison the Dravens simply win.

**A coincidence worth stating: the forced legend is herself opponent-gated.** On the Hunt is a
Signature card whose only tag is Sivir, so 103.2.d.2 forces `SFD-203` / `SFD-250 Battle Mistress`
(both Body/Chaos, verified against `data/cards.json`), and she prints *"When one or more enemy units
die, ready me."* She refunds the exhaust her Gold ability spends only on a board with enemy units to
kill — the same board the whole entry needs. The identity's Signature card, both its point sources
and its legend all want the same board.

Cost, counted whole: **35 Energy and 10 Power** across eight copies of three names. That is heavier
than the identity's other CHAIN and buys the same eight points; the difference is which board they
arrive on, and that is the only reason to run it. §4's refusal of a comparable Fury/Chaos pile at 39
Energy and 9 Power turned partly on that identity already owning a nine-point Conquer BURST —
Body/Chaos owns nothing that survives a stall, so the same price buys something here that it did not
buy there. **State the comparison rather than inheriting the refusal.**

### 16.4 Two errors caught by running the check instead of describing it

1. **`produces: ["chain-points"]` is a feature id I invented.** The catalogue has nineteen and that
   is not one of them; every CHAIN in it produces `ability-points` and/or `burst-points`. It would
   have entered the needs/produces DAG as an edge nothing consumes and nothing produces. Caught by
   validating `produces` against the set actually present in `data/combos.json`, which is now part of
   this lane's staging check.
2. **`nasus-svellsongur-conquer-burst` was still in the staging file after rc-manager5 merged it**
   (catalogue 761, commit 50a6636). A second merge would have duplicated it. The staging validator
   now diffs against the live catalogue and drops anything already there — the same "re-validate
   immediately before reporting" rule §14 earned, applied to the staging file rather than to a census.

Verification actually run on both entries, not described: every rule reference resolves to a real
heading (42 and 25), every quoted passage checked verbatim from an **explicit list** against the
rules file and `corpus_flat.txt` (35 and 20), identity computed from `data/cards.json`, Signature
copies against 103.2.d.1, and `npm test` green at 469 with entry 1 merged. `npm run adversarial`
reports **0 unanswered holes of 75 finishers**, and puts `nasus-svellsongur-conquer-burst` at turn 7
against a turn-5 baseline — SLOWER, exactly as §7 predicts for a BURST, which is why that entry's
headline is about which board its points arrive on rather than how many there are.

---

## 17. Batch 8 — the stalled-board classification was wrong in the direction that mattered, and §15's own table inherited it

Designing §16 surfaced a contradiction in the table §15 had just published. The row said body/order's
one surviving finisher was `ivern-arena-trinity-body-order-hold` — an entry whose own `terminatesIn`
opens *"burst of ten points in ONE Hold at one battlefield"* and whose first step is *"Establish
Control of Reckoner's Arena... End a turn with all three Ivern standing at the Arena."* **A line that
must already control a battlefield cannot be a line that survives losing them.**

That is rc-manager5's own standing rule firing: *the count that contradicts a small structural fact
is the tell.* The small structural fact is one sentence of card text — `OGN-293 The Grand Plaza`
reads **"When you hold here, if you have 7+ units here, you win the game"** — and 315.2.b.2 Holds
only *"all Battlefields they Control"*.

### 17.1 The bug, and it is a precedence bug rather than a regex bug

`scripts/adversarial-check.mjs` tested the buckets in the order attack → conquer → hold, and `conq`
falls back to the entry's own authored prose:

```js
const conq = src(CONQUER) || (/\bconquer/i.test(prose) ? "steps" : null);
```

**Every Grand Plaza and Reckoner's Arena entry's steps use the word "conquer"** — taking the
battlefield in the first place, or the Arena's own *"activate the conquer effects of units here"*. So
`conq` was truthy for all of them and won the precedence over `hold`. Measured: of the 30 finishers
whose scoring payoff is a battlefield reading "when you hold here", **17 were bucketed as something
other than HOLD.**

### 17.2 The corrected numbers, and they make §9.2's conclusion stronger rather than weaker

| bucket | §9.2 as published | corrected |
|---|---|---|
| HOLD | 29 | **46** |
| CONQUER | 27 | **15** |
| ATTACK | 7 | **7** |
| INDEPENDENT | 8 | **8** |

**Fifty-eight per cent of the catalogue's finishers die with the stall they exist to rescue**, not
thirty-eight. §9.2's finding was right and understated by fifteen entries; the error ran in the
direction that flatters the catalogue, which is the direction to distrust.

And §15's table inherited it. Corrected, body/calm and body/chaos had **zero** surviving finishers of
any class rather than one and two — both were emptier than reported, so the two entries this lane
wrote for them were the identity's only answer rather than an addition to a thin shelf — and
**`body/order` is a third identity with nothing, which §15 did not show**: seven finishers available,
**zero** that survive a stall, its Plaza lines and its Arena BURST all Hold-gated.

| pair | finishers | survive | of which BURST/CHAIN/INFINITE |
|---|---|---|---|
| body/calm | 4 | 1 | 1 — `nasus-svellsongur-conquer-burst` (§15) |
| body/chaos | 4 | 1 | 1 — `draven-yasuo-battle-mistress-contested-chain` (§16) |
| **body/order** | **7** | **0** | **0** |
| chaos/fury | 2 | 1 | 1 |
| chaos/order | 8 | 1 | 1 |

### 17.3 The fix is in the script, and it shows the other signal instead of hiding it

Per §7's principle — the script is the deliverable, because a check that runs over the whole
catalogue beats one pass by hand — the repair is eleven lines in `adversarial-check.mjs`, not
seventeen hand edits. A **battlefield** whose own text reads "when you hold here" is the line's win
condition, so it forces the HOLD bucket whatever else the cards or the steps mention; the population
is swept from card text rather than a typed list, so it cannot go stale against a new set.

A few of the seventeen genuinely carry a second, non-Hold leg by design, and flattening them to HOLD
silently would be the same kind of error in reverse. So the row now names the payoff and the other
signal both:

```
ALT_WIN  spiderling-swarm-grand-plaza  <- payoff is The Grand Plaza, "when you hold here"  [+ a conquer leg too - read it]
CHAIN    ivern-arena-draven-chaos-order-chain  <- payoff is Reckoner's Arena, "when you hold here"  [+ an attack leg too - read it]
```

`npm test` green at 469 and `npm run adversarial` still reports 0 unanswered holes, now of 76
finishers. `draven-yasuo-battle-mistress-contested-chain` classifies into ATTACK on its own merits —
one of only seven there, and the only CHAIN among them.

### 17.4 Standing note

**A classifier that assigns one bucket to a mixed object will be wrong in whichever direction its
precedence leans, and the bucket order is the thing to audit — not the patterns.** Both regexes here
were correct and every matched phrase was really on the card; the defect was entirely in which test
ran first. §9.3 had already stated the right caution ("a first pass from text, not a verdict") and
this lane still built a table on the output without spot-checking a single row against the entry's
own `terminatesIn`. **One row read end-to-end would have caught it** — the row whose id ends in
`-hold` and whose bucket said CONQUER.

---

## 18. Batch 9 — body/order REFUSED, and the refusal is a fact about the card pool

§17 left `body/order` as the only identity with zero surviving finishers: seven available, all
Hold-gated. It does not get a line, and the reason is worth more than a line would be.

### 18.1 The whole point budget, swept rather than assumed

Every card whose text gains a point and whose domains are a subset of {body, order}:

| card | domain | gated on |
|---|---|---|
| `SFD-115 Trinity Force` | body | a Hold |
| `SFD-214 Power Nexus` | colourless battlefield | a Hold |
| `VEN-138 Shen, Leader of the Kinkou Order` | order | a Hold |
| `UNL-177 Ivern, Friend to All` | order | **a Conquer OR a Hold** |
| `OGN-290 The Arena's Greatest` | colourless battlefield | BANNED in both formats (`data/legality.json`) |
| `UNL-T03 Brush` | token | never in a decklist |

**Ivern is the identity's only non-Hold point source**, by 823.1.b and 823.1.c.1 making *"When I
conquer or hold"* both a Conquer Effect and a Hold Effect. So the non-Hold ceiling is:

- **3 Ivern.** 103.2.b caps by NAME — *"Your Main Deck can include up to 3 copies of the same named
  card"* — and Ivern has a single printing anyway. All three fire on one Conquer, since 383.4.c.2.a
  puts the Conquer Abilities on the Chain for every corresponding unit *"present at a Battlefield
  when a player gains control of it"*.
- **+ 2 Conquer Scores.** 485.4 is *"Battlefield Count: 2"* and 470 allows Scoring *"once per
  Battlefield per turn"*. The third battlefield that would lift this is `UNL-147 Baron Nashor`'s
  Baron Pit, and Baron Nashor is mono-Chaos.

**Five. The identity cannot reach eight on a board it does not already control.**

### 18.2 The escape that looked real and is not

The one route to eight is to conquer BOTH battlefields with the SAME three Iverns — 4 at the first,
4 at the second — which is legal, because a Conquer point is banked at the Score and 323.6 stripping
Control afterwards does not unbank it. It fails on movement arithmetic. Ivern has no [Ganking], so
144.4 restricts him to base↔battlefield and the trip is base→A→base→B: **three moves per Ivern, nine
across the three, each costing an exhaust under 144.2** — six extra readies.

body/order has readiers, so this had to be checked rather than waved away, and the two that could
have carried it both fail on Ivern specifically:

- **`SFD-180 Fiora, Worthy`** — *"When a unit you control becomes [Mighty], you may pay 1 Order Power
  to ready it"* — is the identity's only ready with no exhaust in its cost, so it is the only
  repeatable one. **It can never ready an Ivern.** 709: *"A Unit 'becomes Mighty' at the moment its
  Might changes from being less than 5 to being 5 or greater"*, with Riot's own second example —
  *"A Unit with Might 5 that gets +1 [M] does not become Mighty, because it was already Mighty."*
  Ivern is printed **Might 6**. He is Mighty on arrival and can never cross.
- **`OGN-152 Mistfall`** readies a unit you buff, but its cost includes its own exhaust, so three
  copies are three readies a turn against the six required — and 702.3 caps a unit at one buff at a
  time, so the buffs do not repeat either.

Neither of the pool's two *"Ready your units"* cards is available: `SFD-192 Shurelya's Requiem` is
Calm/Mind and `SFD-204 On the Hunt` is Body/Chaos.

### 18.3 What body/order actually has, stated positively

Its recovery from a stall is **an ENGINE and not a finisher, and that is a property of the pool.**
Conquer both battlefields with three Iverns for five this turn; Hold both next turn for
1 + 1 + 3 Ivern hold-faces + 3 Trinity Force. The opponent takes a turn in between, which is exactly
what disqualifies it as a CHAIN under this project's definition — and it is also why
`ivern-arena-trinity-body-order-hold` is the right entry for the identity and not a mistake. **It
is not that nobody built body/order a finisher; it is that the identity's only non-Hold point source
is one card capped at three copies.**

Recorded so the next session does not spend a walk rediscovering it. The refusal is scoped, in this
project's standing sense: it is a claim about **reaching eight on a fully stalled board**, and a new
set printing one Body or Order card that gains a point on a Conquer, an attack or a combat win
reopens it immediately.

---

## 19. Batch 10 — the HOLD bucket, scoped like the gear pass, and an ANSWER predicate is not a MASS-DAMAGE predicate

rc-manager5 upgraded §18's closing suggestion to the target: the corrected HOLD bucket (§17) is 46 of
76 finishers, all switched off by the same class of event, and the gear pass is the proof that asking
"what is the cheapest card in the pool that answers this" pays. Same scope: sweep the answers from
card text, name the restricted subset separately, deliver a script mode and a corrections file rather
than 46 hand-written notables.

### 19.1 The measurement that reframes the bucket

**23 of the 46 are Grand Plaza lines**, not the eleven §9.2 reported — the §17 correction more than
doubled the sharpest case. And the existing fragile-body check could not see them:

> `if (c.type.includes("unit") && c.might !== null && c.might <= 1) fragile.push(...)`

It reads `uses[]` and printed Might, and **both halves are wrong for a Plaza line**:

- **A Plaza garrison is made of TOKENS, and no entry names a token base code** (the synergy layer
  filters them). Measured: **22 of the 23 stand on token bodies; `uses[]` sees 3.** Token Might is
  rules text, not card data — rule 187 fixes Recruit, Bird and Tentacle at 1, Reflection and Shadow
  Clone at 0, Sand Soldier at 2, Sprite and Mech at 3.
- **Printed Might is not current Might** for a body whose own text scales it. Swept, that is 7
  printings and 5 names: Ornn Forge God, Petal Pixie, Spiderling, Illaoi, Kayle.

### 19.2 A FALSE notable was already on the site, and it is the second half of the same defect

`spiderling-swarm-grand-plaza` shipped carrying:

> "ONE ENERGY ANSWERS THE MIGHT-1 BODY THIS LINE NEEDS (Spiderling (M1))."

`VEN-097 Spiderling` is printed Might 1 and reads *"I have +1 :rb_might: for each other unit you
control here with my name."* **The entry stands seven of them at one battlefield, so each sees six
others and every one is Might 7.** 1 damage kills none — 143.2.a: *"If a Unit ever has nonzero damage
marked on it equalling or exceeding its Might, it is Killed"*, and 142.4.b makes Lethal *"a non-zero
amount greater than or equal to that Unit's Might."* The Plaza's own requirement of seven is exactly
what makes the swarm survive the sweeper.

The true answer is cheaper and different in kind: the Plaza reads *"if you have 7+ units here"* and
this board is exactly seven, so **ONE removal spell answers it** — `OGN-229 Vengeance`, swept as the
only card in the pool whose entire text is *"Kill a unit."* And the line's own answer is unique:
Spiderling is the **only** card in the pool that overrides 103.2.b, printing *"Your deck can have any
number of cards named Spiderling"*, so an eighth copy gives the Plaza slack against one removal AND
raises every body again. The correction is a REPLACE row in the corrections file.

### 19.3 The predicate was wrong FOUR times, and every wrong version named a real card

This is the lesson of the batch and it cost four rounds of reading generated prose:

| round | what it named | why it is not an answer |
|---|---|---|
| 1 | `OGN-127 Cannon Barrage` | *"Deal 2 to all enemy units **in combat**"* — never reaches a passive garrison |
| 2 | `VEN-133 Glowstone` | *"deal 5 to all units **you control**"* — a drawback, not removal; it was named against five lines |
| 3 | `OGN-190 Kog'Maw, Caustic` | a **[Deathknell]** *"at **my** battlefield"* — he must stand there and die. **It was the headline in 17 of 28 draft corrections.** Same round: `OGN-105 Singularity` is *"Deal 6 to each of up to **two** units"* and sweeps nothing; Anivia and Warwick are *"When I attack… here"* |
| 4 | sorted `OGN-268 Bullet Time` LAST | it is **scalable** (*"Pay any amount of :rb_rune_rainbow: to deal that much damage to all enemy units at a battlefield"*), so a fixed-damage model read it as Infinity and buried the cheapest answer in the pool |

**A mass-damage predicate is not an answer predicate.** An answer is a card the opponent can simply
CAST at a garrison standing on a battlefield you control — not one that must occupy it, die on it,
attack into it, or damage its own side. Every exclusion above is written into the sweep with the card
that forced it, so the next reader does not re-derive them.

The surviving set is **seven, and it splits in two**, which is the same shape as the gear pass naming
the enemy-facing subset separately:

- **Unconditional — any deck may run these (4):** `OGN-133 Flurry of Blades` (Body, E1, [Reaction],
  1 damage), `OGS-002 Firestorm` (Fury, E6 + 1, 3 damage, enemy-only), `OGN-123 Unchecked Power`
  (Mind, E7 + 2, 12 damage), `UNL-180 The Ruination` (Order, E9 + 3, *"Kill all units."*).
- **SIGNATURE-locked — a matchup, not the field (3):** `OGN-268 Bullet Time` (tagged Miss Fortune, so
  103.2.d.2 forces a Bounty Hunter legend), `OGN-250 Stormbringer` (Volibear), `OGS-018 Tibbers`
  (Annie). Bullet Time is the cheapest answer to almost every line in the bucket at 1 Energy + N
  Power and [Action] speed, and it would have been flatly false to print that as "the answer" without
  its forced legend.

### 19.4 The protection half, and the timing that cuts both ways

For every one of the 28, the answer notable also states whether the line's own identity can protect
itself. **A permanent, garrison-wide +Might is the only thing that lifts every body at once** — a
single-target pump is useless against a sweep that hits seven simultaneously — and the swept
population is 15 printings, reported per entry under 103.1.b (union of the two entries' domains ≤ 2),
folded by name, with its scope shown (`[TOKEN bodies only]`, `[MECH bodies only]`,
`[that battlefield only]`). **Every one of the 28 has at least one**, so no line in this bucket is
structurally unprotectable.

Two corrections inside that half, both from reading the output:

- **A battlefield protection is unavailable to a line that already requires a battlefield.** 485.4.a
  gives each player three, *"Only 1 will be used, chosen during setup"*, and 103.4.c forbids duplicate
  names — so `OGN-294 Trifarian War Camp` can never stand beside The Grand Plaza. The first draft
  offered it to all 23.
- **Where a battlefield protection IS available, it is a 1-in-3**, because 485.5 has each player
  *"randomly select one (1) of their three (3) Battlefields"*. The caveat is now emitted conditionally,
  because the same sentence in both places was incoherent in one of them.

And the timing, which is why these lines survive at all: a Hold resolves at 315.2.b.2 inside YOUR
Beginning Phase, where 312.2.a gives a player priority only *"When the turn is in a Neutral Open State
during their Main Phase"* — their own. **The opponent cannot answer inside the Hold window; they
answer on their own turn, the turn immediately before it.** The cost of that is yours, not theirs:
your Main Phase comes AFTER your Beginning Phase (315 then 316), so there is no window to rebuild.
Holding up a [Reaction] on their turn is the only response these lines have.

### 19.5 Deliverables

`npm run adversarial -- --holds` classifies all 43 Hold-payoff finishers with their garrison Might
floor, the cheapest answer and the protections their identity may run; `--holds-notables` writes the
corrections (`--out`, default `/tmp/rc-walks/rc-synth-holds.json`). **29 rows: 1 REPLACE of the false
Spiderling sentence and 28 appends.** The token half of the floor is a TEXT SCAN of the entry's own
prose and says so in the output — a flag that says *read it*, never a verdict, since no entry names a
token base code. 469 tests green, typecheck clean, 0 unanswered holes of 76.

---

## 20. Batch 11 — the gap was hidden by a BAN, and four entries misread the rule that guards their own weak point

Lane respawned a second time. As in §15, **the brief was stale and recomputing beat inheriting**: it pointed
at "the five pairs with exactly one finisher — body/calm, calm/chaos, chaos/fury, chaos/order, chaos/mind",
a list computed at 727 entries, and §15 had already retired thinness as a target. Recomputed at **762
entries / 215 synergy rules**, three of those five have since been filled by this lane's own batches.

### 20.1 The measurement: one banned card was hiding an empty cell

Crossing the availability table with the `--stalled` buckets again (§15's method, §17's corrected
classifier) leaves two identities with nothing that survives a stalled board. `body/order` is **refused by
§18 with a fact about the pool** and stays refused. The other is `chaos/order`, and its single survivor is
not a survivor at all:

```
chaos/order finishers available: 8
  CONQUER  INFINITE  pursuer-herald-recruits   <<< uses OGN-177, BANNED in constructed AND 2v2
  HOLD     ALT_WIN   grand-plaza-recruit-vanguard
  HOLD     ALT_WIN   ready-recruits-grand-plaza
  HOLD     ALT_WIN   zed-clone-eye-recruits
  HOLD     ALT_WIN   karthus-machine-evangel-renata-plaza
  HOLD     ALT_WIN   spiderling-swarm-grand-plaza
  HOLD     ALT_WIN   vanguard-captain-manufactor-plaza
  HOLD     CHAIN     ivern-arena-draven-chaos-order-chain
total 8 | survive-a-stall 1 | survive AND legal 0
```

`data/legality.json` carries `OGN-177 Stealthy Pursuer` as `status: "banned"` in **both** formats since
2026-07-24. **Swept across all 76 finishers, `pursuer-herald-recruits` is the ONLY entry in the catalogue
with a banned card in `uses[]`** — so this is a one-card blind spot rather than a systemic one, which is
worth saying in both directions: the catalogue is clean, and the single exception happened to sit on the
one row that made an empty cell look occupied. Six of the seven Hold-gated survivors are Grand Plaza lines,
which §19 records as the set one opponent action answers together.

**The standing note is the shape, not the card.** `CLAUDE.md` already warns that *"a ranked matrix or
co-occurrence list is NOT legality-checked"*; §15 and §17 both published per-identity tables, and neither
ran the ban check on the rows it counted. **A table of what an identity can RUN must filter by legality,
because "can run" is exactly the claim a ban refutes.** The check is four lines and now sits in
`.scratch-synth/chaos-order-audit.mjs`.

### 20.2 A predicate miss in this lane's own §12, found by re-deriving instead of citing

§12 states *"Chaos/Order owns exactly two scoring cards"* — Ivern and Draven. Re-swept over `text` +
`effect` of every deckable base for any card whose text gains a point, with domains a subset of
{chaos, order}, the answer is **three units and three battlefields**:

| card | domain | cost | gated on |
|---|---|---|---|
| `UNL-177 Ivern, Friend to All` | order | E6 | **a Conquer OR a Hold** (823.1.b) |
| `SFD-148 Draven, Audacious` | chaos | E6 P1 | winning a combat |
| **`OGN-205 Yasuo, Windrider`** | **chaos** | **E5 P1** | **three moves — board-independent** |
| `VEN-138 Shen, Leader of the Kinkou Order` | order | E6 P2 | a Hold |
| `SFD-214 Power Nexus` | colourless | — | a Hold |
| `OGN-293 The Grand Plaza` | colourless | — | a Hold |
| `OGN-290 The Arena's Greatest` | colourless | — | BANNED in both formats |

§12's sweep was scoped to *"Chaos or Order text paying on a conquer, an attack or a combat win"*, and
**Yasuo pays on MOVES, so that predicate structurally could not see him.** Third time this lane has paid for
the same thing (§10 on a kill-predicate that could not see a detach, §19 on a mass-damage predicate that was
not an answer predicate): *state the predicate with the number, and check the predicate answers the question
you are actually asking.*

### 20.3 `ivern-ride-the-wind-double-conquer` (CHAIN, verified, chaos/order)

The mechanism is **catalogued and unreachable**: `ivern-bard-four-tag-double-conquer` walks three Iverns
into one battlefield, Conquers, then relocates the same three with `SFD-079 Bard, Mercurial` and Conquers
again — six ability Gains and two Scores. Bard is **Mind**, so that entry is mind/order and 103.1.b keeps it
out of this identity entirely.

**`OGN-173 Ride the Wind` is the Chaos relocation, and the reason it works is a route distinction this
project already owns.** *"[Action] (Play on your turn or in showdowns.) Move a friendly unit and ready it."*
449 and 420.2.b make an effect move a route separate from the Standard Move, so 144.4's base↔battlefield
restriction does not bind it and 420.3.a's exhaust — which sits on the Standard Move alone — is not charged.
That is the whole trick: the three Iverns are **already exhausted** from walking into the first battlefield
(144.2), and only an effect move can carry them to the second. Note also that its move carries **no
destination clause**, unlike `OGN-259 Unforgiven`'s *"to or from its base"* — which is why the Unforgiven
CHAIN could never have been re-pointed at this.

| when | rule | points |
|---|---|---|
| Conquer the first battlefield | 469.1 / 471.1 | 1 |
| three Iverns present there | 383.4.c.2.a | 3 |
| Conquer the second, after three Ride the Wind | 469.1, and 470 permits it because it is a DIFFERENT battlefield | 1 |
| the same three Iverns, present again | 383.4.c.2.a | 3 |
| | **two scoring events, one turn** | **8** |

**E26 + 3 Chaos Power counted whole; E6 + 3 Power on the finishing turn.** Against Bard's E24 + 1 Mind
Power — neither dominates, and the entry says so: Bard moves any number for one card but costs your legend's
exhaust and is a Main-Phase unit play, while Ride the Wind costs three cards and is an `[Action]`
(806.1.c.1), so it can relocate an Ivern *inside an opened Showdown*. Exactly 8 with **zero slack**, which is
why all three copies of both are declared rather than preferred.

It works on a garrisoned board through 323.9 → 466.3.a → 466.5 → 466.5.d, and on an open one through
450 → 344.2 → 348.2.a → 348.2.a.1. **466.1.a.1 — *Insert "3c. Heal all Units."* — wipes marked damage
between the two battlefields**, so the survivors arrive at the second at full Might; the real price is a dead
Ivern, each one costing exactly one point.

### 20.4 The finding with teeth: FOUR entries misapply 383.2.a.1 to Ivern, in the direction that flatters them

Designing the line meant reading 383.2.a.1 rather than inheriting its citation, and it does not say what
four entries say it says.

> **383.2.a.1.** Any additional conditional statement immediately after the Condition must be true in order
> for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition and not
> the Effect.

**The test is POSITIONAL, and the rule carries two worked examples pointing opposite ways.** Sona,
Harmonious — *"At the end of your turn, if I'm at a battlefield, ready up to 4 friendly runes"* — has the
conditional immediately after the trigger, and Riot adds *"If she is removed in reaction to the triggered
ability, it will still resolve."* Loose Cannon — *"At the start of your Beginning Phase, draw 1 if you have
one or fewer cards in your hand"* — is the other shape, and Riot says *"The 'if you have one or fewer cards
in your hand' conditional statement is not immediately after the trigger condition, so it is part of the
effect and not the condition."*

`UNL-177 Ivern` reads *"When I conquer or hold, **score 1 point** if your units have all of the following
tags among them — Bird, Cat, Dog, and Poro."* Effect verb first, conditional after. **He is the Loose Cannon
shape, so the tags are checked ON RESOLUTION.**

Swept: 63 entries cite 383.2.a.1 and 15 pool cards have the Loose Cannon shape; the intersection is the six
Ivern entries. **Four of them are wrong, at six sites** — and the fifth, `ivern-arena-trinity-body-order-hold`,
cites it for **Shen** (*"When I hold, **if** there is exactly one other unit you control here, you score 1
point"*), which genuinely IS the Sona shape. **The catalogue is right about Shen and wrong about Ivern**, and
an earlier regex in this batch reported five before that row was read: *a claim about how many entries are
wrong is itself a measurement.*

| entry | site |
|---|---|
| `ivern-sentinel-hold` | `uses[2].note` |
| `ivern-arena-sentinel-hold` | `uses[3].note` **and** `uses[4].note` |
| `ivern-svellsongur-four-tags-hold` | `steps[4]` |
| `ivern-bard-four-tag-double-conquer` | `uses[1].note` **and** `prerequisites.notable[0]` |

**No arithmetic changes and no entry is refuted** — the fourth-tag body is required either way, and still
belongs in `uses[]`. What changes is the **vulnerability**: under the Trigger-Condition reading, removal in
response cannot stop the triggers (Sona's example says so in terms); under the correct Effect reading,
**killing the fourth-tag body in response to the Ivern triggers blanks every one of them at that scoring
event.** That is §14's B3 shape again — *a right conclusion resting on a wrong reason, which is worse than
it sounds because a wrong reason misdirects the next reader* — and the error ran in the direction that
flatters the lines, which §17 records as the direction to distrust. Six REPLACE rows are in
`/tmp/rc-walks/rc-synth-ivern-383.json`, matching on the sentence and reporting the index for checking only.

### 20.5 And the pool cannot punish it, which is why the new line still stands

Having found the weak point, the honest next question is what actually exploits it. Swept over every
non-banned card carrying `[Reaction]` **in its own text** whose text kills or deals damage — with
parenthesised reminder text **and quoted token text** stripped first — the population is **seven**:
`OGN-033 Shakedown`, `OGN-127 Cannon Barrage`, `OGN-133 Flurry of Blades`, `SFD-163 Deathgrip`,
`UNL-142 Heedless Resurrection`, `UNL-173 Sacrifice`, and the Gold token itself.

**The strip was not optional.** A first pass named `UNL-073 Deadly Flourish` as the cheapest Reaction
answer; its `[Reaction]` belongs to the **Gold token's reminder text** it quotes — the identical false
positive §11 records for `UNL-018 Yeti Brawler`, and it would have shipped a fabricated answer into the
entry.

Of the seven, four kill only a friendly unit or are costs; `OGN-127` reads *"in combat"* and `OGN-133` reads
*"at battlefields"* — **neither reaches a base**, and 1 damage cannot kill a Might-2 Poro anyway (143.2.a).
The only one that reaches a base is `OGN-033 Shakedown`, *"Choose an enemy unit. Deal 6 to it unless its
controller has you draw 2"* — **and its own text lets the defender decline** by handing the caster two
cards, which on a turn that scores eight is trivially worth paying. *(That card was itself missed by the
first predicate, which required "deal N to a unit" and could not see "Deal 6 to **it**" — a second predicate
miss inside one batch.)*

So **the pool prints no unconditional `[Reaction]` answer to a Might-2 body at a base.** The opponent must
kill it on their own turn, a full turn ahead and fully telegraphed — the same asymmetry §3 found for gear —
and the answer-to-the-answer costs two Energy: a second Daring Poro, which 103.2.b permits to three. Keeping
that body at the **base** is therefore not flavour; Ivern reads *"your units"* with no location clause, and
the base is the zone almost nothing reaches.

### 20.6 Standing notes

- **A per-identity availability table must be legality-filtered.** "What this identity can run" is precisely
  the claim a ban refutes, and one banned card hid an empty cell across two published tables (§15, §17).
- **Read the rule, do not inherit the citation.** 383.2.a.1 was cited correctly 63 times and incorrectly
  four, and the four were only visible to someone who opened the paragraph to answer a *different* question.
  The tell was that all four inherited one sentence from each other.
- **Strip reminder text AND quoted token text before any `[Reaction]` sweep.** This pool quotes the Gold
  token's full rules text on every card that makes one, and a bare grep reports those cards as Reaction
  cards. It has now produced a false finding twice (§11, here).

---

## 21. Batch 12 — BODY PRINTS ONE POINT CARD AND IT IS HOLD-GATED, which is why all three of this lane's empty cells were Body pairs

### 21.1 The law, swept rather than reasoned

Folded by name over `text` + `effect` of every card in `data/cards.json`, **sixteen cards in the pool gain a
point or win the game.** Split by domain, one column is empty:

| domain | point cards it prints | any of them NOT Hold-gated? |
|---|---|---|
| **body** | **`SFD-115 Trinity Force` — and nothing else** | **NO** |
| calm | Ahri (Hold), `VEN-046 Nasus, Ascended` (Conquer) | yes — Nasus |
| chaos | `OGN-205 Yasuo` (moves), `SFD-148 Draven` (combat win) | yes — both |
| fury | `OGN-034 Tryndamere` (Conquer) | yes |
| order | `VEN-138 Shen` (Hold), `UNL-177 Ivern` (Conquer **or** Hold) | yes — Ivern |
| mind | Swain, Renata Mastermind, Bottled Constellation, Gutter Palace, Otterpus | yes — four |
| **colourless** | `OGN-293 The Grand Plaza` (Hold), `SFD-214 Power Nexus` (Hold), `OGN-290 The Arena's Greatest` (**banned**) | **NO** |

> **Body's entire point budget is one Equipment that reads *"When I hold, score 1 point"*, and every live
> colourless point card is Hold-gated too. So a Body deck's non-Hold point budget is ENTIRELY its partner
> domain's, and no colourless card can rescue it.**

That is one sentence, and it retro-explains three separate batches of this lane. Measured:

| pair | the partner's non-Hold sources | finishers available | that survive a stall, and are legal |
|---|---|---|---|
| body/calm | **Nasus** | 4 | 1 |
| body/chaos | **Yasuo, Draven** | 4 | 1 |
| body/fury | Tryndamere | 6 | 4 |
| body/mind | Swain, Renata, Bottled Constellation, Gutter Palace | 13 | 5 |
| **body/order** | **Ivern — and only Ivern** | 7 | **0** |

**The law names the card before the design starts, and it named the right one twice.** §15 went looking for a
body/calm finisher and landed on `VEN-046 Nasus, Ascended`; §16 went looking for a body/chaos one and landed
on `SFD-148 Draven` plus `OGN-205 Yasuo`. Neither batch knew this law — both were derived the long way, from
a fresh sweep each time. The law says in advance that those were the **only** candidates. And §18's refusal
of body/order is the same law plus one more clause: its partner's single source is Ivern, 103.2.b caps him at
three copies, 485.4 puts two battlefields on the table, so 3 + 2 = 5 and the identity cannot reach eight.

**What the law does NOT say**, and the table shows it: the *number* of partner sources does not predict the
number of survivors. body/fury has exactly one source and four survivors, because `OGN-034 Tryndamere` is
heavily catalogued (the Brambleback conquer family). The law bounds **which cards are eligible**, not how many
entries exist.

### 21.2 The negative result: "add a non-Hold leg to a Hold entry" is not a repair, and the sweep that suggested it was measuring the wrong thing

§19 answered the HOLD bucket from the outside — *what beats these 46 lines*. The obvious inside question is
whether a Hold-gated entry can be given a second, non-Hold leg, the way
`ivern-arena-draven-chaos-order-chain` pairs a Hold-gated half with a combat-gated half. Swept
(`.scratch-synth/hold-legs.mjs`): for each of the 46, which of the eight non-Hold point sources could join it
without pushing the union past two domains (103.1.b)?

**45 of 46 can. Only `ivern-arena-trinity-body-order-hold` cannot** — body/order, and it already runs Ivern,
its partner's only source.

**A 45-of-46 answer is not a finding, it is a measurement of the wrong quantity.** It ranks **legality width**,
which is cheap, and this project already has the lesson in two other shapes: *a high uncovered-partner count
marks a WELL-MINED card*, and *the uncovered-partner column ranks PREDICATE WIDTH and not opportunity*. Legality
is nearly free; what is expensive is reaching eight.

And the substantive point underneath is that **the premise was wrong**. On a *fully* stalled board the Hold
half pays **zero**, so a "leg" would have to carry all eight by itself — at which point it is not a leg, it is
a second finisher in the same identity, which is exactly what §15, §16 and §20 each built. What §12's design
idea actually buys is **robustness across board states, not survival of a total stall**: its Hold half pays
seven on a board you do control and the combat half supplies an eighth, and §12 says so in its own words
("Seven of the nine are Hold-gated and the entry says so rather than pretending the whole thing is a
credential line"). Recorded so nobody re-runs this sweep expecting a repair list.

### 21.3 Standing note

**Before designing for a Body pair, read the partner domain's non-Hold point sources — that list IS the
candidate set, and it is between zero and four cards long.** More generally: when an identity looks thin,
sweep what its two halves can PAY with before sweeping what they can do. The point budget is six cards wide
per domain at most, and it bounds the design space far harder than card count does.

---

## 22. Batch 13 — body/mind REFUSED, the Body law closed by one Fury card, and a better axis than availability

rc-manager5 pointed this batch at the Body law applied forward: body/mind is the one Body pair with a
rich partner budget, and nobody had asked what it can do. The answer is that it can do a great deal and
**none of it needs Body**, which is the law showing up on a second axis.

### 22.1 The axis: "available" was still too permissive, and "spans both domains" is the honest one

§1 drew the distinction and then every table since has used availability anyway. Recomputed at **763
entries**, for each pair: how many finishers it can run, how many actually **use cards from both halves**,
and how many of those survive a stall (`.scratch-synth/crossdomain.mjs`).

| pair | available | spans both | spans **and** survives |
|---|---|---|---|
| body/calm | 4 | 1 | **0** |
| body/chaos | 4 | 2 | 1 |
| body/fury | 6 | 4 | **3** |
| **body/mind** | **13** | **3** | **0** |
| body/order | 7 | 2 | **0** |
| chaos/fury | 2 | **0** | 0 |
| calm/chaos | 5 | 2 | 2 |
| calm/fury | 9 | 6 | 5 |
| calm/mind | 18 | 7 | 1 |
| calm/order | 11 | 5 | 1 |
| chaos/mind | 11 | 1 | 1 |
| chaos/order | 9 | 4 | 2 |
| fury/mind | 13 | 3 | 3 |
| fury/order | 8 | 3 | 1 |
| mind/order | 29 | 16 | 4 |

**body/mind is the sharpest case in the table: thirteen finishers available, third-most of any pair, and
ZERO that both span the identity and survive a stall.** Its three spanning entries —
`blue-sentinel-trinity-force-hold`, `veteran-poro-weaponmaster-trinity-sentinel-hold`,
`sentinel-trinity-time-warp-chain` — are **one mechanism written three times**: Body's Trinity Force
multiplied by Mind's `UNL-087 Blue Sentinel`, on a Hold. It is the only thing the two halves have to say
to each other, and it is Hold-gated by construction, because Body's only point card is.

### 22.2 body/mind is REFUSED, and the reason is that Mind does not need help

All five of body/mind's stall-surviving finishers are **mono-Mind**, not one of them touching Body:

```
INDEPENDENT ALT_WIN   mind   gutter-palace
INDEPENDENT INFINITE  mind   renata-bubble-bot-ready
CONQUER     CHAIN     mind   swain-double-conquer
INDEPENDENT CHAIN     mind   bottled-constellation-time-warp
INDEPENDENT INFINITE  mind   jayce-mesmerize-renata
```

**Four of the five are INDEPENDENT — and that is the refusal.** §9.1 established that the
board-independent finishers in this pool are the Mind ones plus the cards that literally say you win.
A board-independent plan, by definition, needs nothing from the board — so there is no support role for
Body to fill. Body's contribution to a body/mind deck facing a stall would have to be **points**, and
batch 12 measured that Body has none to give off a Hold.

Compare the two Body pairs where a spanning survivor does exist, because the contrast is the content:

- **body/chaos** — `draven-yasuo-battle-mistress-contested-chain` (§16) spans and survives. Every point in
  it is Chaos (Draven, Yasuo) plus the Conquers; **Body's contribution is `SFD-204 On the Hunt`, a ready,
  and `OGN-127 Cannon Barrage`, an answer.** Support, not points — and it works because those points are
  *combat*-gated, which is a board state Body can actually help with.
- **body/fury** — three spanning survivors, the most of any Body pair, and the reason is a single card.

### 22.3 The Body law closes: exactly one card lifts Body's point card off the Hold, and it is Fury

Swept over `text` + `effect` of every card for any text converting Hold effects into Conquer effects or
the reverse — **the pool prints exactly one**:

> `SFD-030 Skyfall of Areion` — **Fury**, gear, E3, Might Bonus +2 —
> *"[Equip] :rb_energy_1::rb_rune_fury: ... [Effect] My hold effects are also conquer effects, and vice
> versa."*

So the law from batch 12 gets its exception clause, and the exception is one card wide:

> **Body prints exactly one point card, `SFD-115 Trinity Force`, and it is Hold-gated. Exactly ONE card in
> the pool lifts a Hold effect onto a Conquer, and it is FURY. Therefore `body/fury` is the only Body pair
> in which Body's own point card can pay on a board it does not already control; in every other Body pair,
> every non-Hold point must come from the partner domain alone.**

The table above is the law's own confirmation, and it was not arranged: body/fury has the most spanning
stall-surviving finishers of any Body pair (3), and two of them —
`brambleback-trinity-skyfall-conquer` and `dragonstorm-brambleback-trinity-conquer` — are **Trinity Force
plus Skyfall** exactly.

*(§6 already recorded Skyfall as unavailable to body/order and filed it as a domain fact about one entry.
It is a fact about the whole Body half of the pool.)*

### 22.4 A card that looked like it reopened §18, and the clause that stops it

§18 refused body/order after checking its **readiers** — Ivern has no `[Ganking]`, so base→A→base→B is
three moves each and nothing in the identity readies six times. It never checked **relocators**, and
§20's entry turns on exactly one. Swept for cards whose *effect* moves a friendly unit (16 names,
non-banned), body/order has precisely one:

> `UNL-101 Call to Battle` — Body, E3 — *"Move a unit you control **to a battlefield you control**. Then,
> choose an opponent. They move a unit they control to the same battlefield."*

**Its destination clause is what stops it**, and it stops it completely: the battlefield you are about to
Conquer is by definition one you do **not** control, so Call to Battle can never carry a payoff into it —
and moving in after the Conquer is too late, since 383.4.c.2.a pays only units already *"present at a
Battlefield when a player gains control of it."* Its second sentence hands the opponent a body there as
well. **§18's refusal stands, now for a stronger reason than the one it gave** — and this is the
read-the-clause-to-its-end lesson again: the card that would reopen a refusal was found in one sweep, and
it was disqualified by six words in its own middle.

### 22.5 Standing note

**"Available" over-counts, and "spans both domains" is the measurement that answers whether a pair is real.**
A pair whose every finisher is mono-domain is not an identity with a plan; it is two solo domains sharing a
legend. body/mind has thirteen available finishers and three that span, all of one mechanism and all
Hold-gated — and a lane pointed at its *availability* would have called it the healthiest Body pair instead
of a refusal.

---

## 23. Batch 14 — the spans-both axis pays immediately: a calm/mind BURST, and chaos/fury refused

Batch 13's axis was built to judge body/mind. Pointed at the rest of the table it named a target on the
first look, and the target turned out to be a mechanism the catalogue already owned in two other
identities and had never reached for in this one.

### 23.1 chaos/fury: refused, and it is the batch-13 shape

chaos/fury is the only pair in the table that spans **zero** finishers. §13.3 had already refused it a
CHAIN on arithmetic — its mono-Fury BURST reaches nine and a second scoring event buys nothing — but the
sharper question is whether the two halves have anything to say to each other at all. Swept, they do not:

- **Fury's multiplier cannot see Chaos's points.** `UNL-029 Red Brambleback` reads *"Your conquer effects
  for conquering here trigger an additional time."* Chaos's two point cards are `OGN-205 Yasuo` (a **move**
  trigger) and `SFD-148 Draven` (a **combat-win** trigger). Neither is a conquer effect, so Brambleback
  multiplies nothing Chaos owns, and the only thing it can multiply in the identity is `OGN-034 Tryndamere`
  — which is Fury, and is `tryndamere-brambleback-conquer` already.
- **Chaos's points have no multiplier here.** The card that multiplies Draven is `SFD-059 Svellsongur`,
  and it is **Calm** — which is why `draven-svellsongur-bloodless-combat-burst` (§11) is calm/chaos.
- **The excess-damage lever is a Mind tool.** Tryndamere is priced in excess damage, and the cheap way to
  raise it is to shrink the defender (§170's finding). Swept over `text` + `effect` for Might reduction
  reaching an enemy: **23 names, of which 14 are mono-Mind and the rest Mind pairs, Calm, or Calm/Chaos.**
  A chaos/fury deck can run exactly one — `UNL-138 The List` (Chaos, E1 gear, *"As you play this, name a
  tag. :rb_exhaust:: Give a unit with the named tag -2 :rb_might: this turn"*) — plus `UNL-210 Forbidding
  Waste`, a battlefield and therefore a 1-in-3 (485.5). The List is **named blind**, before the garrison is
  known, and its exhaust caps it at one -2 a turn.

So chaos/fury is **two solo domains sharing a legend**, and its one Chaos contribution to Fury's payoff is
a tag-scoped guess. Recorded so nobody re-walks it; §4's refusal of the six-body Draven-plus-Tryndamere
pile at 39 Energy stands beside it.

### 23.2 `swain-svellsongur-conquer-burst` (BURST, verified, calm/mind) — nine points, one body, one Conquer

**calm/mind is the pair the new axis flagged**: 18 finishers available (second-most), **7 that span both
domains, and six of those seven Hold-gated** — one survivor. The question that follows is not "what card is
uncatalogued" but **"which catalogued MECHANISM can this pair reach that it has not?"**

`SFD-059 Svellsongur` is Calm. The conquer-side point cards outside Calm are Mind's. Nobody had put them
together: `scripts/have.mjs VEN-065 SFD-059` reports no entry on that card set **or a subset**, across
**37 Svellsongur entries and 4 Swain entries.**

| source | rule | points |
|---|---|---|
| the Conquer itself | 469.1 / 471.1 | 1 |
| eight instances of Swain's trigger | 2^3 composition, placed by 383.4.c.2.a | 8 |
| | **one scoring event** | **9** |

**E20 and 8 Power counted whole — and only 6 Energy on the finishing turn.** Three things make it worth a
slot rather than a re-skin:

1. **One body, not three.** Its fury/mind sibling `swain-brambleback-conquer-burst` reaches ten by running
   **three Swains** under two Brambleback. This runs **one Swain wearing three gears**. 465.2.c lets a
   defender assign damage across three bodies; against one body it must kill that body or nothing. The
   trade is that 718.5.b keeps the three gears shootable — stated in the entry, not hidden.
2. **No drawback.** §11's Draven version multiplies *"When I die in combat, choose an opponent. They score
   1 point"* to eight as well. Swain prints only `[Vision]`.
3. **The Trigger Condition cannot be answered.** Swain's *"if"* sits **immediately after** the trigger, so
   383.2.a.1 makes it part of the Trigger Condition — Riot's Sona example, ending *"If she is removed in
   reaction to the triggered ability, it will still resolve."* And it asks what you **played this turn**,
   which is a fact about the past: killing the unit, blowing up the gear or countering the spell after it
   resolves changes nothing, and 419.4.b counts even a **countered** card as played for a non-triggered
   check. **This is the exact inverse of §20's Ivern line**, whose clause follows the effect verb, is
   therefore the Loose Cannon shape, and dies to one removal spell aimed at a Might-2 Poro.

**The third of the condition that needed care was the spell**, because the #166 cross-audit killed a Swain
line for exactly this: its filler was `VEN-061 Decree of Insight`, which has no legal target against a
board with no Body unit, and six Swain points evaporated. `SFD-080 Bellows Breath` is in `uses[]` on
purpose — 355.13 makes *"Deal 1 to **up to** three units"* castable with zero targets, and its only choice
carries the qualifier, which is the test separating it from the four *"up to"* spells that still brick.

### 23.3 Standing note

**When a pair looks thin, ask which catalogued MECHANISM it can reach rather than which card is
uncatalogued.** Svellsongur has 37 entries and Swain 4; both cards were exhaustively mined, and the pair
of them was untouched. A card-coverage census cannot see that gap — only a per-identity question can, and
the mechanism is usually already proved somewhere else in the catalogue, which is what makes the walk cheap.

---

## 24. Batch 15 — the Svellsongur family is one per domain, and a lead deliberately NOT written as an entry

### 24.1 The family batch 14 completed, and it was not visible until the last member went in

`SFD-059 Svellsongur` copies a carrier's text, and the pool prints **exactly one non-Hold point card per
domain** for it to copy. Checked at 764 entries:

| domain | the conquer-side point card | Svellsongur entry |
|---|---|---|
| calm | `VEN-046 Nasus, Ascended` | `nasus-svellsongur-conquer-burst` (§15) — mono-Calm, so every Calm pair can run it |
| order | `UNL-177 Ivern, Friend to All` | `ivern-svellsongur-four-tags-hold` |
| chaos | `SFD-148 Draven, Audacious` | `draven-svellsongur-bloodless-combat-burst` (§11) |
| **mind** | **`VEN-065 Swain, Visionary`** | **`swain-svellsongur-conquer-burst` (§23) — the slot that was empty** |
| fury | `OGN-034 Tryndamere, Barbarian` | **not catalogued** — and calm/fury does not need it (6 spanning finishers, 5 surviving) |
| body | — | Body prints no non-Hold point card at all (batch 12) |

Three of those five were written by this lane in three different batches, each reached independently from a
different identity's gap, and **none of them knew it was building a family.** The shape only became visible
once the fourth went in. Worth carrying as a method note: **a mechanism that is settled — here the 2^v layer
argument — is cheap to re-walk in a new identity, so the right question for a thin pair is which settled
mechanism it can reach, not which card is unmined.**

### 24.2 calm/order needs nothing, and its own numbers say why

Eleven finishers available, and **nine of them are Hold-gated**. Both survivors are this same family:
`ivern-svellsongur-four-tags-hold` (spanning) and `nasus-svellsongur-conquer-burst` (mono-Calm). Covered.

### 24.3 fury/order: a real uncatalogued pairing, recorded as a LEAD and not written up

`UNL-029 Red Brambleback` reads *"Your conquer effects for conquering here trigger an additional time"*, and
`UNL-177 Ivern` reads *"When I conquer or hold…"* — which 383.4.c.1 (*"These are commonly structured as
'When I conquer…' and 'When you conquer…'"*) makes a conquer effect. So Brambleback multiplies Ivern.
`scripts/have.mjs UNL-177 UNL-029` reports **no entry on that card set or a subset, across 12 Brambleback
entries and 7 Ivern entries** — the same kind of untouched pair as batch 14's.

Priced: **1 + N × (1 + K)**, N Ivern present and K Brambleback present at the conquered battlefield (R1 = A
makes K copies give K+1 instances). At N = 3, K = 2 that is **ten points for E28 + 2 Fury Power**, with a
fourth-tag body at the base.

**It is not written as an entry, and the reason is §13.3's own precedent — a thin cell is not automatically a
gap.** Audited, fury/order has eight finishers of which **two survive a stall, and both are ATTACK-gated**:
`tryndamere-brambleback-conquer` and `twilight-reveler-eye-facebreaker-recruits`. ATTACK-gated is the shape
§9.2 identifies as the one worth designing for — dead on an empty board, alive on a contested one — so the
identity's survivors are its *best* kind, not a deficiency. The only board state an Ivern line would add is
the **open** battlefield (344.2, bloodless), and §7 is explicit that a nine- or ten-point burst is redundant
exactly there, because an unopposed Hold curve was already delivering eight by turn 5 or 6 for free.

Recorded with its arithmetic so the manager can call it, and so nobody re-derives it from scratch.

### 24.4 The axis from batch 13 needs reading with the BUCKET, not just the count

Batch 13 introduced "spans both domains **and** survives a stall" and it found calm/mind on the first look.
Pointed at fury/order the same measurement reads **1**, which looks like the same gap and is not one: that
pair's two survivors are ATTACK-gated credential lines, and one of them merely happens to be mono-Fury
rather than spanning. **A finisher does not have to span the identity to work; spanning is a question about
whether the PAIR is doing anything, not about whether the deck has a plan.**

So the axis is a flag and not a verdict, and the follow-up question is fixed: *how many survivors does this
pair have at all, of any identity, and in which buckets?* body/mind answered five-all-mono-Mind (a refusal,
batch 13), calm/mind answered one (an entry, batch 14), fury/order answers two-both-ATTACK (a lead, here).
Same number on the flag, three different verdicts.

---

## 25. Batch 16 — the complete identity map, and the law that explains which cells were hard

### 25.1 Every pair now has a legal stall-surviving finisher except one

At **764 entries, 78 finishers bucketed** (`.scratch-synth/identity-map.mjs`). `surv` counts **legal**
survivors of any identity — the ban filter from §20 is applied, and it drops exactly one row, in chaos/order.

| pair | avail | spans | **surv** | buckets |
|---|---|---|---|---|
| body/calm | 4 | 1 | 1 | CONQ×1 |
| body/chaos | 4 | 2 | 1 | ATTA×1 |
| body/fury | 6 | 4 | 4 | ATTA×2 CONQ×2 |
| body/mind | 13 | 3 | 5 | INDE×4 CONQ×1 |
| **body/order** | 7 | 2 | **0** | — |
| calm/chaos | 5 | 2 | 3 | CONQ×2 ATTA×1 |
| calm/fury | 9 | 6 | 7 | ATTA×3 CONQ×4 |
| calm/mind | 19 | 8 | 8 | INDE×4 CONQ×4 |
| calm/order | 11 | 5 | 2 | CONQ×2 |
| chaos/fury | 2 | 0 | 1 | ATTA×1 |
| chaos/mind | 11 | 1 | 6 | INDE×5 CONQ×1 |
| chaos/order | 9 | 4 | 1 | CONQ×1 *(1 dropped: banned)* |
| fury/mind | 13 | 3 | 9 | ATTA×1 INDE×5 CONQ×3 |
| fury/order | 8 | 3 | 2 | ATTA×2 |
| mind/order | 29 | 16 | 9 | INDE×6 CONQ×3 |

**`body/order` is the only identity in the game with no legal finisher that survives a stalled board**, and
§18 refused it from the card pool rather than leaving it open: Ivern is its sole non-Hold point source,
103.2.b caps him at three copies, 485.4 puts two battlefields on the table, and 3 + 2 = 5.

### 25.2 The law: only three domains print a multiplier that can reach a point

Swept over every card for text that makes another ability fire more than once — **the pool prints five, and
they are not evenly spread**:

| domain | multiplier | what it reaches |
|---|---|---|
| calm | `SFD-059 Svellsongur` | **anything** — it copies the carrier's text |
| fury | `UNL-029 Red Brambleback` | conquer effects |
| mind | `UNL-087 Blue Sentinel` | hold effects |
| order | `OGN-236 Karthus, Eternal` | **Deathknells only** |
| **body** | **none** | |
| **chaos** | **none** | |
| colourless | `OGN-286 Reckoner's Arena` | conquer effects, **but only off a Hold** |

Karthus is real and cannot help: measured, **of the 16 cards in the pool that gain a point or win, ZERO carry
`[Deathknell]`** — so Order's multiplier can multiply no point card that exists. And the Arena's trigger is
*"When you hold here"*, which a stalled board never gives you.

> **So a pair survives a stall by one of exactly two routes: it contains MIND, whose point sources are
> board-independent and need no multiplier at all (§9.1); or it contains CALM or FURY, whose multipliers
> still work on a Conquer. A pair with none of the three has only unmultiplied point cards.**

**The pairs drawn from {body, chaos, order} are exactly body/chaos, body/order and chaos/order — and they
are the three thinnest cells in the map, at 1, 0 and 1.**

### 25.3 The lane filled exactly those cells without knowing the law

This is the part worth recording, because it was not planned. Before this lane ran, those three cells stood
at **0, 0, 0**. Today they are **1, 0, 1**, and both of the ones are entries written here:

- **body/chaos = 1** — `draven-yasuo-battle-mistress-contested-chain` (§16), reached by asking what the
  identity's point budget was.
- **chaos/order = 1** — `ivern-ride-the-wind-double-conquer` (§20), reached by finding a ban that was hiding
  an empty cell.
- **body/order = 0** — refused (§18), and the multiplier law is the second, independent reason: even if a
  relocator existed, Order's only point card has no multiplier in its own identity.

Each was walked from a different direction, none of them from this census, and **the census predicts all
three**. That is the strongest retrospective check the lane has produced, and it is a better argument for the
method than any single entry: *target-first design converges on the cells a structural census independently
identifies as hard.*

### 25.4 Standing note

**Before designing for a pair, ask which of its two domains prints a multiplier and which prints a
board-independent point source.** A pair with neither is genuinely hard and its finisher will have to reach
eight on unmultiplied copies capped at three by 103.2.b — which is exactly why both entries in those cells
are five- and seven-card lines that double-dip across two scoring events rather than scaling one.

---

## 26. Batch 17 — a refusal overturned by the manager, a false notable on the live site, and my own typed census caught

### 26.1 `ivern-brambleback-conquer-burst` (BURST, verified, fury/order) — and why §24.3's decline was wrong

§24.3 priced Red Brambleback × Ivern at ten points and then **declined to write it**, on §13.3's precedent
that a thin cell is not automatically a gap: fury/order already has two ATTACK-gated survivors, and §7 says
a ten-point burst is redundant against an unopposed Hold curve.

rc-manager5 overturned it, and the reasoning is right: **§13.3's precedent is about whether a PAIR needs a
line, and the catalogue is not a per-pair deckbuilding guide — it is a record of verified lines the matcher
can report.** A ten-point BURST on an uncatalogued card set is an entry whatever fury/order's decks already
hold; by the redundancy argument used to decline it, half the fifteen-strong BURST class would be refused.
**The redundancy argument was kept, as the entry's third notable,** where it is worth something to a reader
instead of silently killing a line.

| source | rule | points |
|---|---|---|
| the Conquer | 469.1 / 471.1 | 1 |
| 3 Ivern × 3 executions under 2 Brambleback | 383.4.c.2.a, R1 = A (N copies → N+1 instances) | 9 |
| | **one scoring event** | **10** |

**E28 + 2 Fury Power**, five bodies at the battlefield and one at the base. Its sibling
`tryndamere-brambleback-conquer` runs the same multiplier at T=2, K=3 for **nine** at E26 + 7 Fury Power —
2 Energy dearer, 5 Power cheaper, one point better, and Order paying where that one is Fury.

**What it adds is that it has no gate.** Tryndamere's *"if you assigned 5 or more excess damage"* sits
immediately after his trigger, so 383.2.a.1 makes it part of the Trigger Condition, and 807.1.d with 323.9
means the attack needs an enemy garrison — he is dead on an **open** battlefield. Ivern asks for four tags
and a Conquer, so this line also takes an open battlefield bloodlessly through 344.2 → 348.2.a → 348.2.a.1.
fury/order's two existing survivors are both attack-gated; **this is the identity's first conquer-gated one.**

Its single point of failure is stated rather than buried, and it is §20's finding pointed at my own work:
Ivern's tag clause follows the effect verb, so it is the **Loose Cannon** shape, checked on resolution — and
killing the Bird in response blanks all nine Gains. The mitigation is two Energy for a second tag body.

### 26.2 The emitter shipped three false notables, and the card text refuting them was inside the sentence

Running `npm run adversarial` after the merge flagged **my own** batch-14 entry: *"stands on a Might-1 body
(Steel Paws (M0)) and never names OGN-133 Flurry of Blades."* The flag is false twice over — Steel Paws is
declared in zone **BASE**, and Flurry of Blades reads *"Deal 1 to all units **at battlefields**"*.

It is not a special case. Measured: **four of the ten finishers with a Might ≤ 1 unit in `uses[]` declare it
in zone BASE**, because it is a tag-carrier for Ivern or a *"played this turn"* enabler for Swain and the
clause it serves reads *"your units"* with no location. Zone is declared on **98.7%** of `uses[]` rows, so
the check can read real data rather than guess.

**Three of those four already carry a shipped notable that is false**, and each one quotes the refutation in
its own sentence:

> "ONE ENERGY ANSWERS THE MIGHT-1 BODY THIS LINE NEEDS (Soaring Scout (M1)). `OGN-133 Flurry of Blades` is
> Body, E1: *"…Deal 1 to all units at battlefields."*"

`ivern-sentinel-hold`, `ivern-arena-sentinel-hold` and `swain-shurelya-double-conquer`. **This is §19.2's
Spiderling defect exactly** — a generated *"ONE ENERGY ANSWERS"* sentence that the card text refutes — and it
is the second time the same emitter has produced one. The fix is in the script (the fragile check now skips a
Might ≤ 1 unit whose row declares zone BASE) and three REPLACE rows are in
`/tmp/rc-walks/rc-synth-flurry-false.json`, naming what *does* reach a base — `OGN-229 Vengeance`,
`VEN-154 Public Execution`, `SFD-158 Sandshifter` — and noting that **none of them carries `[Reaction]`**, so
the answer must be cast a full turn early. 0 unanswered holes of 78 after the fix.

### 26.3 My own typed legend census was wrong, and running the query is the only reason it did not ship

The staged entry's `prerequisites.easy` claimed **five** Fury/Order legend names and listed them with base
codes. Measured over `data/cards.json`, the pool prints **THREE** — Hand of Noxus (OGN-253 / OGN-302), Void
Burrower (SFD-187 / SFD-243), Piltover Enforcer (UNL-187 / UNL-229) — and even the one name I had right
carried the wrong base codes.

This is **the exact defect class the #189 and #192 cross-audits singled out**: legend censuses typed from
memory rather than measured, the worst single family in both audits. It is worth recording that it happened
inside a lane that has written the "run the query before the sentence leaves the lane" rule into three
separate reports. **The rule works only if it is applied to the sentences that feel like boilerplate**, and a
legend line is the most boilerplate-feeling field in the schema.

### 26.4 Standing note

**A precedent is scoped to the question it answered.** §13.3 refused a chaos/fury CHAIN because that
identity's existing BURST already reached nine — a claim about *that line's marginal value to that deck*.
Carried to Brambleback × Ivern it silently became a claim about *what belongs in the catalogue*, which it
never was. This project already records that a refusal is scoped to the reason that was given; the same is
true of a precedent, and the failure is easier to miss because reusing one feels like consistency.

---

## 27. Batch 18 — two of the grid's "live" cells are dead by the grid's own rule, and the Svellsongur family closes

### 27.1 Two cells refused in one line of card text

rc-manager5's multiplier grid reduced 60 cells to roughly eight live ones, by the rule that **a multiplier
multiplies the KIND of effect it names** — which is what kills the Yasuo, Renata and Bottled Constellation
columns outright. Two of the eight named cells die to that same rule:

> `UNL-087 Blue Sentinel`: *"[Shield 2] … Your **hold** effects for holding here trigger an additional time.
> When I hold, [Add] :rb_rune_rainbow: at the start of your next Main Phase."*

- `OGN-034 Tryndamere, Barbarian` — *"**When I conquer** after an attack…"*
- `VEN-065 Swain, Visionary` — *"**When I conquer**, if you've played…"*

Both payoffs are **conquer-only**, and the Sentinel multiplies holds. **Blue Sentinel × Tryndamere and Blue
Sentinel × Swain are dead in principle**, not merely unbuilt. The only bridge would be `SFD-030 Skyfall of
Areion`, and CLAUDE.md already refuses that route for Swain on the phase order (315.2's Scoring Step precedes
316's Main Phase, so at the instant of a Hold you have played nothing "this turn"). Six live cells, not eight.

### 27.2 `tryndamere-svellsongur-excess-burst` (BURST, verified, calm/fury) — the family's last cell

Ten points in one Conquer for **E26, 4 Fury Power and 6 Calm Power**. Three Svellsongur on one Tryndamere
compose 2^3 = eight instances; a second, bare Tryndamere supplies a ninth; the Conquer's own Score is the
tenth.

**The second Tryndamere is load-bearing twice, and that is the entry's real content.** Svellsongur's Might
Bonus is **+0**, so it multiplies the trigger and contributes nothing to the threshold the trigger gates on.
R28 = A makes excess damage the attacking Might never assigned, and 465.2.c.4 caps each assignment at minimum
lethal — so against a garrison of summed Might D the excess is (your summed Might) − D:

| board | summed Might | needs D ≤ |
|---|---|---|
| one Tryndamere | 8 | **3** — a single Might-4 defender beats it |
| two Tryndamere | 16 | **11** — an ordinary garrison |

383.2.a.1 makes *"if you assigned 5 or more excess damage"* part of the Trigger Condition, checked once when
the triggers are placed, so **all nine instances stand or fall on one figure.**

**It is honestly narrower than its mono-Fury sibling and says so.** `tryndamere-brambleback-conquer` is nine
points at E26 + 7 Fury Power and is mono-Fury, so all five Fury pairs can run it; this is ten at E26 + 10
Power and only a Calm/Fury legend can — which is a **forced shell**, since the pool prints exactly one
Calm/Fury legend name. The reason to catalogue it is that it is a different card set the matcher can report:
a deck already running Svellsongur reaches this without adding a Brambleback.

**One reading was avoided rather than filed.** `UNL-019 Blighted Battleaxe` (+4) is the obvious widener, but
136.2.d makes *"deal 4 to **me**"* the carrier, R6 = A has Svellsongur copy the carrier's **current** text,
and 434.1.c has already appended the Battleaxe's Effect Text to it — so the copies would carry the drawback
too (§11's trap). Whether *"unattach **this**"* in a copied instance means the Battleaxe or the Svellsongur is
settled by no paragraph opened here, and two Tryndamere reach D ≤ 11 with no ambiguity. Left out deliberately.

**With this, the Svellsongur family of §24.1 is complete at five** — calm/Nasus, order/Ivern, chaos/Draven,
mind/Swain, fury/Tryndamere — and Body, which prints no non-Hold point card, is why there is no sixth.

### 27.3 I typed a legend census wrong in TWO consecutive batches, and built the fix

§26.3 recorded one: five Fury/Order names claimed, three measured. **The very next entry claimed three
Calm/Fury names and the pool prints ONE** — Rogue Assassin (VEN-139 / VEN-189) — which **CLAUDE.md itself
already records**, in the census naming Calm/Fury as one of only three single-name pairs.

Twice in consecutive batches is a habit, not a slip, and writing "run the query" into three reports did not
stop it. The fix is mechanical, not a resolution:

- **`.scratch-synth/legend-line.mjs <domainA> <domainB>`** emits the sentence, measured, and echoes the parsed
  domains first (the argv trap CLAUDE.md records). Generate the line; never compose it.
- **`.scratch-synth/check-stage.mjs`** validates every staged row against `data/combos.json` *now* — rule refs
  resolve, `produces` valid, identity ≤ 2 domains, legality, copy caps, Signature flags, **and the legend
  census**, reporting both names missing from `prerequisites.easy` and names written there that are not
  legends of that identity. It also fails a row that is **already live**, which it did on its first run:
  `ivern-brambleback-conquer-burst` had been merged while this batch was being written.

**The order of operations is the actual lesson.** I was generating the entry and then checking it. The legend
line is the most boilerplate-feeling field in the schema, which is exactly why it has to be *produced by a
measurement* rather than reviewed after being typed — review is what failed, twice.

---

## 28. Batch 19 — the adversarial sweep extended to the ENGINE class, which is 686 of 766 entries

rc-manager5's point is structural and correct: `scripts/adversarial-check.mjs` reported **zero unanswered
holes** and that was clean *over its population* — the four finisher classes. **The ENGINE class is 686 of
the catalogue's 766 entries and had never been through it.** (Not 646; 766 − 80 finishers = 686.)

### 28.1 Non-vacuity first, because that is the failure this sweep is most exposed to

#203's containment pass read `uses[].base` where the field is `uses[].card`, every set came back empty, and
it printed a CLEAN. So the sweep prints its joins before any result:

```
catalogue entries             : 766
  of which ENGINE             : 686      <- population the finisher sweep never touched
uses[] rows total             : 1898
  .card resolves in cards.json: 1898  (100.0%)
  rows whose card is a unit   : 967
  rows with zone declared     : 1874  (98.7%)
entries declaring needs       : 33   (ENGINE: 20)
```

### 28.2 The result, with the predicate beside every number

**A. The Yuumi shape — a body the line cannot replace, killed for 1 Energy.** Predicate: a `uses[]` unit with
printed Might ≤ 1 **declared at zone BATTLEFIELD**, where the entry never names `OGN-133 Flurry of Blades`.

| | |
|---|---|
| Might ≤ 1 units across ENGINE `uses[]`, by zone | BATTLEFIELD 20, HAND 7, BOARD 6, BASE 5, DECK 2, TRASH 1 |
| **in reach and unnamed** | **17** |
| zone BOARD — ambiguous, flagged and NOT asserted | 5 |
| HAND / DECK / TRASH / BASE — out of reach, dropped | 11 |

**The zone split is the refinement that makes it trustworthy rather than noisy**, and it is batch 17's
lesson generalised: Flurry reads *"Deal 1 to all units **at battlefields**"*, so a body in hand, in the deck,
in the trash or at the base is not in reach at all. A first pass that only excluded BASE reported **29**.

**The check validates against the case that motivated it**: `kinkou-temple-yuumi-granted-tank-whiteflame-wall`
is excluded, and for the right reason — #203's repair is present and it names the card. **And the sweep found
the same shape in two MORE Yuumi entries nobody had looked at**: `yuumi-affectionate-poro-designated-tank`
and `tricksy-tentacles-yuumi-forced-defend-subset`.

**B. Equipment with no gear answer named: 96** (predicate: a `uses[]` card of type gear carrying the
Equipment tag, where the entry names none of the 15 swept gear-kill names or `SFD-011 Angle Shot`).
**Reported as a count and deliberately NOT emitted as 96 notables.** An ENGINE that loses its Equipment loses
tempo; the finisher classes lose the game, which is why that check was written for them. A narrower criterion
is needed before this is worth shipping, and I do not have one yet.

**C. An entry declaring `needs` with no producer legal in its own identity: ZERO of 33.** Predicate: for each
`needs` id, does any other entry `produces` it with the union of the two identities ≤ 2 domains (103.1.b)?
**That is a clean result and it is stated plainly rather than padded** — the needs/produces DAG is
domain-sound across the whole catalogue.

**D. The ledger question, measured but not concluded.** 523 of 686 ENGINEs declare `netPerIteration`; **46
describe a pass, loop or repeat in their own prose and declare none** (predicate: `/per pass|each pass|every
pass|repeat|loop/i` over steps + `terminatesIn`). That predicate certainly catches `[Repeat]`, the keyword,
as a false positive, so the 46 is an upper bound and I am not reporting it as a defect count.

### 28.3 The notables, and the defect that reading them caught

**17 rows**, in `/tmp/rc-walks/rc-synth-engine-flurry.json`. Each states the answer, why copies do not help
(370.1.a.2 makes the deaths simultaneous, so quantity is no defence), that it lands at **[Reaction]** speed —
which is strictly worse for the defender than the base-reaching removals of §26.2, none of which carries
Reaction — and what protects it.

**The protection half was wrong on the first generation and reading it caught it.** It reported "protections:
6" for most entries, because a mono-domain entry unions legally with *each* of fury, order and mind
separately. That is true card by card and **false as a list**: 103.1.b allows exactly ONE partner domain, so
those six are alternatives, not a shelf. The emitter now groups them by the partner they force and says so in
the sentence. A second read caught a worse one — an entry with no domain-legal protection printed *"WHAT
PROTECTS IT: NOTHING"* and then named the colourless `OGN-294 Trifarian War Camp` in the next clause, which
is §19.4's incoherence defect exactly. Both fixed before shipping; all 9 quoted fragments verified verbatim
and all 7 rule references resolve.

### 28.4 Standing note

**A sweep is clean over its population, and the population is part of the result.** "Zero unanswered holes of
78 finishers" was quoted at lanes as though it covered the catalogue; it covered 10% of it. **Report the
denominator with the verdict**, and when extending a check to a new population, expect the refinement that
made it honest on the old one to be insufficient — the BASE exclusion from batch 17 had to become a full zone
split here, and the difference between the two is 29 findings against 17.

---

## 29. Batch 22 — does the Hold-for-Conquer swap change any existing entry's verdict? Almost none, and the "almost" is one clause

rc-manager5's question, and the right one: if moving an enemy body is a wash, then an entry pricing a
mover as tempo is overstating itself. **Swept, the catalogue is clean, and the reason it is clean is
worth more than the one correction.**

### 29.1 The measurement

Predicate for an **enemy-mover**: `text` + `effect` contains *"move"* and names an enemy or opponent unit,
or moves *"a unit at a battlefield to its base"*; non-banned; folded by base. **18 cards.** Entries using
one and selling it as denial or tempo: **17.**

Classified by reading each one's own `terminatesIn` and steps, they fall into two shapes and **neither is
exposed to the swap**:

- **EVACUATE-AND-TAKE (12)** — `charm-evacuate-conquer`, `svellsongur-faefolk-mass-evacuation`,
  `faefolk-challenger-forced-attacker`, `blast-cone-moonfall-forced-attacker` and the rest. They empty a
  battlefield **and walk in**, so the Conquer is *theirs*. Nothing is swapped; a point is gained.
- **FORCED-FIGHT (5)** — `shadow-dash-eye-of-twilight-dragged-attacker-tank`,
  `void-assault-voidreaver-both-attacker-directions`, the two Teemo lines, `faefolk-star-spring-drag`.
  They drag an enemy body onto a battlefield **to kill it in combat** (190.3.a.1 with 464.2.c.1 making the
  dragged unit's controller the Attacker). The value claimed is removal, not denial.

**The catalogue never sold a mover as Hold-denial except once**, and the exception is named for it:
`fading-memories-maddened-marauder-hold-denial`, whose step 3 ends *"they lose the point AND the ground."*

**And the project already knew the rule, in one entry, without generalising it.**
`amateur-recital-free-evacuation` states it exactly: *"Emptying their battlefield without walking in costs
them their Hold (469.2 needs Control during their Beginning Phase) but hands them a Conquer when they walk
back."* `blitzcrank-ezreal-dashing-forced-defence` states it too. **Two entries out of 766 carried the
sentence; nothing carried it as a rule.**

### 29.2 The one correction, and it is a claim rather than a line

`fading-memories-maddened-marauder-hold-denial`'s leg 1 is a **kill**, not a move — Fading Memories grants
`[Temporary]` and 816.1.b kills at the start of their Beginning Phase, before scoring — so it is on the
tempo-positive side of the distinction. **The line is right and the sentence is too strong**: they lose the
ground unconditionally, and the point only if they cannot re-take it that turn. One REPLACE row, in
`/tmp/rc-walks/rc-synth-mover-claim.json`.

### 29.3 The refinement, which cuts at my own play as well

Asking the question properly exposed a precondition **neither the entry nor my own play stated**, and it
makes the move/kill distinction sharper rather than weaker.

> **The re-Conquer needs a READY BODY AT BASE.** 144.4.a and 144.4.b confine the Standard Move to
> base↔battlefield in both directions, 144.4.c.1 makes battlefield→battlefield a `[Ganking]` privilege, and
> 144.2 charges the move an exhaust — so a body garrisoning the *other* battlefield cannot cross, and one
> played that turn enters exhausted under 143.4.

- **A MOVE is a guaranteed wash, and the reason is worse than "they walk back": it MANUFACTURES the body
  that undoes it.** Isolate puts the enemy unit at their base, unexhausted — precisely the one place
  144.4.a lets it return from. You do not merely fail to deny; you deliver the answer.
- **A KILL is a wash only if they happen to hold a spare ready body at base.** Against the lean curve the
  play is built on they do not. **Against a deck holding a spare, Blood Money is a wash too** — and
  `docs/plays/2026-09-12-what-the-idle-mana-buys.md` has been amended to say so, because leaving it
  overstated is exactly what this batch is correcting elsewhere.

### 29.4 Standing note

**A sweep that comes back almost empty is a result when it explains WHY.** The catalogue is not clean here
by luck: its movers are catalogued as evacuate-and-take or forced-fight because those are the uses that
actually pay, and the one entry that reached for denial is the one that needed the qualifier. **The finding
is the shape of the catalogue's own usage**, and it was invisible until a play priced the alternative.

---

## 30. Batch 23 — is "a rule living in an entry's prose, ungeneralised" worth sweeping for? No from the prose, yes from the citations

rc-manager5's question, after the Hold-for-Conquer swap turned out to be sitting in two entries and in
nothing general. **I tried it the obvious way first and it does not work, and the reason it does not work
is the useful half.**

### 30.1 The prose sweep fails, and it fails for a reason that is not fixable

Predicate: a sentence in `prerequisites.notable`, `steps`, `notes` or `terminatesIn`, 90–400 characters,
that **cites a rule** and uses **pool-or-class language** (*"every card"*, *"no card in the pool"*,
*"the pool prints"*, *"is true of every"*, *"cannot ever"*, *"by construction"*). **971 sentences.**

Clustered by claim SHAPE — base codes, card names and digits stripped, so near-duplicates collapse:

| entries carrying the shape | shapes |
|---|---|
| 1–2 | 168 |
| 4 | 1 |
| 8 | 1 |
| 10+ | 2 |

The 1–2 bucket is the Hold-for-Conquer signature, and **reading it shows roughly one real general claim in
ten.** The rest is card-specific reasoning wearing general words — *"Target Ekko, never a Recruit"*,
*"each pass spends one Retreat"*, *"both Revelers trigger off the single combat"*. A filter cannot tell
those from a rule, because **the thing that makes a sentence recognisable as a general rule is knowing the
rule already. The detection problem is the discovery problem.** I found the two Hold-for-Conquer entries
only because I had derived the swap independently in a play and then went looking.

**That is the answer to the question as asked: no.** It is also why the two heavy clusters are noise in the
other direction — the 10+ bucket is `--emit-notables` output repeated verbatim across dozens of entries,
which is *generalised by practice* even where CLAUDE.md lacks the wording.

### 30.2 The unit was wrong, and the right one is an exact join

The question survives if you stop asking it of sentences and ask it of **citations**:

> **Which rules does the CATALOGUE lean on that CLAUDE.md does not carry at all?**

That is a one-line join and it is exact. `scripts/claude-md-gap.mjs`, with a non-vacuity line first (2,381
headings parsed, 6.9 MB of catalogue against 478 KB of CLAUDE.md):

**117 rules cited 10 or more times by the catalogue and ZERO times in CLAUDE.md**, ranked by weight — 15 of
them cited 30+. The top of the list is not structural filler:

```
  67x  194.1.d      the Burn Out point gain
  42x  383.4.a      Play Effects are Triggered Abilities
  37x  136.2.c      Effect Text is appended to the Rules Text of the card it is Attached to
  37x  383.4.d.2.a  Hold Abilities are put on the Chain after the Unit is present
  37x  471.2        Trigger Score abilities at the Battlefield that Scored
  35x  304          the Turn Player
  34x  820.1.d      Repeat's long form
  33x  355.7        "When a card Chooses ... it is Targeted unless indicated otherwise"
  29x  811.6        a Hidden card gains Reaction while facedown
```

### 30.3 And it reproduces a shape this project has already found twice: the exception is carried, the rule is not

| | catalogue | CLAUDE.md | |
|---|---|---|---|
| **355.7** — the definition of Targeting | 33 | **0** | the rule |
| 355.10.d / .e / .f — its exceptions | 153 / 61 / 23 | 14 / 4 / 2 | the exceptions |
| **136.2.c** — Effect Text appends to the carrier | 37 | **0** | the rule |
| 136.2.d — *"this"* refers to the attached object | 66 | 4 | the exception |
| **811.6** — a Hidden card gains Reaction | 29 | **0** | the rule |
| 811.1.b — the keyword's long form, which CLAUDE.md quotes to *derive* it | 340 | 13 | the derivation |

**This is #187 batch 18 exactly** — that lane found the catalogue citing 385.1 and 385.2 (the exception) 32
and 50 times while 384 (the rule) was cited zero. Here it happens three more times, and the 811.6 case is
the sharpest: CLAUDE.md derives *"every face-down card is a [Reaction] card"* by quoting the tail of
811.1.b's long form, and **811.6 is a standalone paragraph that says it outright.**

### 30.4 Standing note

**Ask the question of citations, not of prose.** A general claim is invisible in a sentence and obvious in a
citation count, because a rule the catalogue cites forty times and the project's memory cites zero times is
a rule being re-derived per entry instead of being known. Run `node scripts/claude-md-gap.mjs [minCitations]`;
it is cheap, it is exact, and its output is ranked so the top is worth reading first.

**And the corollary is about what CLAUDE.md is for.** It is not a summary of the catalogue — it is the set of
things a session should not have to re-derive. A rule that 40 entries cite and it omits is precisely a thing
40 sessions did re-derive.

---

## 31. Batch 24 — every gap in CLAUDE.md is on the ENGINE side of the catalogue, and none is on the finisher side

rc-manager5 asked whether the ENGINE class carries the same exception-without-rule shape its citations do.
Batch 23's join, split by class, answers it more sharply than expected.

### 31.1 The split, and it is one-sided

Predicate: a rule heading cited **10 or more times** by one half of the catalogue and **zero times** in
`CLAUDE.md`. Non-vacuity: 2,381 headings parsed; ENGINE blob 5.05 MB over 686 entries, finisher blob 0.88 MB
over 80; probe rules 470 (engine 258 / finisher 98) and 143.4 (597 / 69) both bind. Counts cross-checked by
regex and by plain substring.

| | rules cited 10+ and absent from CLAUDE.md |
|---|---|
| by **ENGINEs** | **86** |
| by **finishers** | **0** |
| by **both** | **0** |
| ENGINE-only *and* absent | 70 |

> **Not one rule is cited ten or more times by the finisher classes and omitted from CLAUDE.md. Every gap
> is on the engine side.**

That is not luck and the reason is recorded in this project's own history: the finisher classes have been
through cross-audits #165, #166, #175, #189 and #192, and each promoted its findings into the file. **The
ENGINE class has had none** — which is precisely what batch 19 established from the adversarial-sweep
direction, now reached again by a completely different instrument. 686 entries, 5 MB of reasoning, and 86
rules the file never learned.

Top of the ENGINE-only gap: `304` (the Turn Player, 35×), `383.3.a` (a leading *"you may"*, 32×),
`424.1.a` (Revealed is a state, not a zone, 31×), `805.1.a.1` (Accelerate's Power portion, 28×), `801` /
`801.3` / `801.3.a` (Keywords and granting them, 26× each), `826` (Backline, 26×), `419.3` (cards played
during a resolution, 25×), `441.1.a` (Empowered is binary, 24×).

### 31.2 The engine-only citation set reproduces the no-score lenses, from citations alone

A second cut, normalised because raw counts are not comparable — the finisher/engine prose ratio is
**0.175**, so a rule cited N times by engines is expected ~0.175N times by finishers on volume alone.
Keeping only rules where the expected finisher count is **5 or more** and the actual is **zero**: **136
rules.**

Bucketed against the lenses CLAUDE.md already records as yielding ENGINE and never a finisher:

| lens, and what the file already says about it | rules |
|---|---|
| **BUFF / MIGHT** — *nothing converts Might size into points* | `702.2` (160×), `702.3.a` (123×), `703` (119×), `702.2.b`, `702.2.a` |
| **XP / LEVEL** — *nothing in the pool converts XP to points* | `824`, `824.1` (126× each), `824.1.d` (115×), `730`, `730.2` |
| **DISCARD / BURN** — *no INFINITE exists in the lens* | `431.1.c` (152×), `422` (105×), `422.1`, `422.1.b`, `431.1.b`, `431.1.c.1` |
| **TARGETING / DEFLECT** — a tax question, not a point question | `355.10` (242×), `355.10.d` (149×), `809.1.d`, `355.10.e` |
| **PREVENT** — generates no kill event | `437` (100×), `437.4` |

**Twenty-two rules, cited between 34 and 242 times by engines and not once by a finisher — and every one of
them belongs to a lens this project proved scores nothing by hand-walking it.** The citation record and the
hand-walked verdicts agree without either having been derived from the other.

### 31.3 What I am not claiming

**96 of the 136 fall outside any named lens** — `477.3`, `465.2.b`, `417`, `340.1`, `385`, `820.2`,
`185.2.d`, `814.1.c` and the rest. Some are plainly structural, some are rules finishers express through a
different sub-paragraph (`477.3` against `477.3.b`), and I have not read all 96. **Calling them untapped
finisher material would be exactly the over-claim this lane has refused three times**, so the honest report
is that the bucketing explains 22 and leaves 96 unexplained. The categorisation is my judgement and is
stated as such.

### 31.4 Standing note

**Split a coverage measurement by the population that was audited and the population that was not, and the
asymmetry is the finding.** Batch 23 reported 117 rules the catalogue cites and the file omits; it looked
like a property of the file. Split by class it is a property of **which half of the catalogue has ever been
audited** — the finisher half has, and its gap is zero. **86 is the size of the debt the ENGINE class has
accumulated**, and it is the same debt batch 19 measured as 17 unanswered holes and 96 unnamed Equipment
answers, counted a third way.
