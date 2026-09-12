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
