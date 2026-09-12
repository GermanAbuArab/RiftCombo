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
