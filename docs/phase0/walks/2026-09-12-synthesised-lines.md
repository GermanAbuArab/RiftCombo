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
