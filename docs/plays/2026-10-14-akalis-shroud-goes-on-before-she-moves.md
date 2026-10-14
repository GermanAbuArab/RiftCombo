# Play — Akali's Shroud goes on before she moves, and on their turn she is a plain 4

Issue #347 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `akali-silent-twilight-shroud-cant-be-chosen`**, the Calm ENGINE in which `VEN-038 Akali,
Silent`, who cannot be chosen by enemy spells and abilities while she is out of combat, is covered
for the combat itself by `VEN-031 Twilight Shroud`. Walked as a game, the protection held: on your
T4 Akali attacked at Might 7 into a Fury/Chaos opponent holding `VEN-015 Decree of Rage`, they could
not cast it on her, and she conquered. Two things the entry does not walk decide the line. Its step
order cannot be played: the steps move Akali first and then cast the Shroud "before the combat
opens", but a move into an occupied battlefield opens the combat in the cleanups that follow it, and
the Shroud has no keyword that lets it into that window. The Shroud goes on **before the move**. And
the entry never walks Akali on defence. On their turn she is a 4 in combat, and the Shroud cannot be
cast there, so Decree of Rage, one Energy and one Fury, kills her and takes the battlefield back.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `8896448`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 39 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 63 (a hit on *before*), first in the list. The other entry of this slice is rank 64,
`UNL-056 Yuumi, Magical Cat` granting [Tank] to a third body, played in
[Yuumi's grant is the +3, and one Flurry takes both](2026-10-14-yuumis-grant-is-the-plus-three-and-one-flurry-takes-both.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm among its two domains (103.1.b); here `OGN-261 Radiant Dawn` (Calm/Order) |
| **The body** | `VEN-038 Akali, Silent` (Calm, E4 + 1 Calm Power, M4) |
| **The cover** | `VEN-031 Twilight Shroud` (Calm spell, E1, [Flow] E2) |

Both cards are mono-Calm, so 103.1.b admits them under any of the Calm legends. Neither is in
`data/legality.src.json`.

The card text the play turns on:

- Akali, Silent: *"I can't be chosen by enemy spells and abilities unless I'm in combat. When I move
  to a battlefield, give me +2 :rb_might: this turn."*
- Twilight Shroud: *"Give a friendly unit +1 :rb_might: this turn. It can't be chosen by enemy spells
  and abilities this turn. [Flow] :rb_energy_2: (You may play this from your trash for its Flow cost.
  Then banish it.)"* It carries no [Action] and no [Reaction].
- Radiant Dawn: *"When you stun one or more enemy units, buff a friendly unit."* You stun nothing in
  the walk, so it is idle. Its Chosen Champion has to carry the Leona tag (103.2.a.2).

## 2. When the Shroud can be cast

155 in full: *"A spell can be played during an Open State outside of Showdowns on its controller's
turn."* That is the only window the Shroud has. It has no [Action], so it cannot enter a Showdown,
and no [Reaction], so 813.1.c.1 (*"This can be played during Closed States on any player's turn."*)
does not reach it either.

**After the move there is no such window.** A move ends in a cleanup, 319.8: *"After a Move is
completed"*. That cleanup stages the combat, 323.9: *"Mark a Combat as Staged at each Battlefield
that Contested was applied to that have Units present controlled by opposing players."* And the next
cleanup with an empty chain opens it, 460: *"A Combat occurs when a Cleanup occurs, there are no
items on the Chain, there is a staged Combat at a Battlefield, and no Showdown or Combat is ongoing at
any other Battlefield."* Between the two, Akali's own +2 trigger is on the chain, which is a Closed
State. Then 316.7.f: *"Combat will also include a Showdown."* At no point between the move and the
Combat Showdown is the turn in an Open State outside a Showdown. The entry's steps 2 and 3, "Move
her to a battlefield" and then "In the SAME Main Phase, before the combat opens, play Twilight
Shroud", cannot be played in that order. Cast the Shroud on Akali in base first, then move her. The
total is unchanged: 4 + 1 + 2 = 7.

**Then she is untouchable for the whole fight.** 740.2.c: *"A unit is in combat if it is occupying a
battlefield where combat is ongoing and has a combat designation."* From the moment she takes the
Attacker designation, Akali's own clause stops covering her. The Shroud's clause has no "unless", and
it lasts "this turn", which covers the whole combat.

**On their turn the Shroud does not exist.** 155 confines it to your turn. When they attack the
battlefield she stands on, she is in combat, her own clause is off, and nothing you hold restores it.

## 3. Their order: Fury/Chaos, bodies and one removal spell

`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1."* Its Chosen Champion
carries the Draven tag. They play `SFD-006 Eager Drakehound` (Fury, E3 + 1 Power, M3, *"I enter
ready."*), `OGN-013 Pouty Poro` and `OGN-010 Legion Rearguard` (both Fury, E2, M2) and `OGN-016
Dangerous Duo` (Fury, E3, M3). Their hand holds `VEN-015 Decree of Rage` (Fury, E1 + 1 Fury Power):
*"[Action] (Play on your turn or in showdowns.) This can't be countered. Deal 4 to an enemy Calm
(:rb_rune_calm:) unit."* "An enemy Calm unit" is a choice, so it targets (355.10).

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your rune deck is six Calm and six Order; theirs six Fury and six
Chaos. Your opening four are Stalwart Poro, Sunlit Guardian, Akali and Twilight Shroud; the draws are
for later turns. `OGN-052 Stalwart Poro` is Calm, E2, M2 with [Shield]; `OGN-054 Sunlit Guardian` is
Calm, E3, M3 with [Shield] and [Tank].

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Eager Drakehound (E3 + 1 Fury) on the 485.7 extra rune:
                three exhausted, one recycled. It enters ready, walks to
                B, Conquer. Two runes, none ready.
T2      4       Stalwart Poro walks to A, Conquer: +1. Sunlit Guardian    1
                (E3) to base. One rune left.
their T2        Hold B. Pouty Poro (E2) and Legion Rearguard (E2) to
                base. Four runes, all spent.
T3      6       Hold A: +1. Akali (E4 + 1 Calm): four exhausted, one      2
                of them recycled. Sunlit Guardian walks to A. Five
                runes, two left.
their T3        Hold B. Dangerous Duo (E3) to base. Six runes, three
                left, Decree of Rage in hand.
T4      7       Hold A: +1. Twilight Shroud (E1) on Akali in base, then   4
                Akali walks to B: 4 + 1 + 2 = 7 against the Drakehound's
                3. They cannot choose her. Her 7 kill it; its 3 do not
                kill her. Conquer B: +1. Six runes left.
their T4        Pouty Poro and Legion Rearguard (2 + 2) attack B. Decree
                of Rage (E1 + 1 Fury) on Akali: 4 on a 4, and the
                cleanup kills her. No damage step. Conquer B.
```

Their points: 1 after their T1, 2 after their T2, 3 after their T3, 4 after their T4. After their T4
it is **4 to 4**, and they draw 1 off Glorious Executioner for the combat they won.

**Why they did not attack A.** From their T3 on, A holds the Stalwart Poro at 3 and the Sunlit
Guardian at 4 on defence ([Shield]), 7 in all, and the Guardian's [Tank] takes lethal first. Their
base never sums more than 7.

**Your T4, the Shroud.** You cast it in a Neutral Open State; they can answer only with a [Reaction]
(813.1.c.1), and Decree of Rage is an [Action]. Akali is in base, where her own clause covers her
anyway. Then the move, the +2 trigger, and the combat. The attacker gains Focus (464.2.d). When Focus
passes, Decree of Rage cannot choose her. Its only legal choices are your Stalwart Poro and Sunlit
Guardian at A, which change nothing at B, so they keep it. 465.2.c sums the Might: 7 against 3. The Drakehound dies;
3 on a 7 is not lethal, and 466.1.a.1 heals her in the cleanup.

**Their T4, Akali on defence.** The Shroud's "this turn" and the move's +2 ended with your turn, so
she is 4. Their two Fury 2s walk in from base, she gains the Defender designation, and she is in
combat (740.2.c). They have Focus (464.2.d) and cast Decree of Rage: 4 on a 4 is lethal (142.4.b),
and the cleanup kills her (323.5). 465.1 then skips the damage step: *"If both Attacking and
Defending units remain at this battlefield, the following Tasks become Outstanding"*. They are the
only player with units at B, so they win the combat and establish Control (466.5, 466.5.d): Conquer.

**What the Decree bought them.** Without it the same attack is 4 against 4. Her 4 kill both 2s; their
4 kill her. Nobody is left, and 466.5.b: *"If there are no Units remaining here controlled by any
player, the Battlefield becomes Uncontrolled."* That is **4 to 3**, with both their bodies gone.
With the Decree it is 4 to 4, both bodies alive and B theirs, for one rune: the Fury rune is
exhausted for the Energy and recycled for the Power (164.2.a, 164.2.b).

**The entry's order, walked on the same T4.** Akali walks to B first, at 6. Combat opens with no
window for the Shroud (§2), and she is in combat. They cast Decree of Rage with Focus: 4 marked on a
6, not lethal. Then the Drakehound's 3 go on her: 7 marked on a 6, and she dies. Her 6 kill the
Drakehound. Nobody is left at B (466.5.b), so there is no Conquer, and Akali is gone a turn early.
That costs you a point and her.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7**
cards by T3 (four opening, one draw a turn) and **8** by T4. The walk's line, an Akali by T3 and a
Shroud by T4, is **21.71%** at the entry's three of each. An Akali by T3 alone is **45.73%**; a
Shroud by T4 alone is **50.82%**. With one of each it is **3.31%**.

## 5. Breaks to

**On their turn the cheapest break is `VEN-015 Decree of Rage`, one Energy and one Fury Power, and
it was walked on their T4 above.** The scope: the 36 spells in `data/corpus_flat.txt` whose domains
are Fury, Chaos or Fury/Chaos, whose text carries [Action] or [Reaction], and that say kill, deal,
stun, return, banish, move, counter or Might, read by hand. Of those, the ones that remove a 4-Might
unit outright, with no other condition, are Decree of Rage (E1 + 1 Power), `OGN-172 Rebuke` (E2 + 2
Power), `VEN-008 Ruthless Strike` (E3, with a discard), `OGN-024 Void Seeker` (E3 + 1 Power),
`VEN-106 Wind and Ghosts` and `UNL-128 Star-Crossed` (both E3 + 1 Power), `OGN-014 Sky Splitter`
(E8 + 1 Power, *"This spell's Energy cost is reduced by the highest Might among units you control.
Deal 5 to a unit at a battlefield."*, so E5 + 1 Power on their T4, where the Dangerous Duo's 3 is
their highest Might and they have eight runes) and `OGN-203 Possession` (E8 + 3 Power). Four more kill her only with a condition: `UNL-014 Monster Harpoon` (E1 + 1 Power)
if they control a facedown card, `VEN-010 Consuming Curse` (E2) with two Curses already in their
trash, `OGN-008 Get Excited!` (E2 + 1 Power) by discarding a card of Energy cost 4 or more, and
`OGN-033 Shakedown` (E2 + 1 Power) only if you refuse to let them draw 2. `OGN-169 Gust` (E1)
returns only a unit with 3 Might or less, and Akali on defence is 4. `OGN-168 Fight or Flight` is
banned in Constructed. Decree of Rage is the cheapest unconditional one in the set, and it is printed
for exactly this: it names Calm.

**What answers the Decree.** Nothing in Calm/Order that the walk had. `OGN-045 Defy` (Calm, E1 + 1
Power) counters a spell costing no more than E4 and one Power, which the Decree does, but the Decree
reads *"This can't be countered."* The Shroud cannot be cast on their turn (§2). The answer is not to
leave Akali alone at a battlefield on their turn, or to accept that she is a 4 there.

**On your turn, with the Shroud cast first, the one card in the set that changes the fight without
choosing her is `SFD-001 Against the Odds`** (Fury, E2, [Reaction]): *"Give a friendly unit at a
battlefield +2 :rb_might: this turn for each enemy unit there."* It chooses their own unit, which
neither clause forbids. Akali is alone, so it is +2. Walked on your T4: the Drakehound goes 3 + 2 =
5 against her 7. It still dies and she still lives. It breaks her attack only when their defenders
already sum 5 or more. The only other card in the set that adds Might to their side of this fight
is `OGN-173 Ride the Wind` (Chaos, E2 + 1 Power): *"Move a friendly unit and ready it."* It can bring
a unit from their base in as another defender (464.2.c.3.a). Pouty Poro brought in that way makes it
5 against 7. Both spells together make it 3 + 2 + 2 = 7, and then everyone at B dies. That costs
E4 + 1 Power, and they had three ready runes. `OGN-004 Cleave`, `SFD-003 Blood Rush` and
`UNL-010 Vault Breaker` give [Assault], which counts only while a unit is an attacker, and their
units are defending. Every other card in the set that acts on one of your units chooses it.

**The counters in the set only tax the Shroud.** `SFD-136 Hard Bargain` (Chaos, E2, [Reaction])
counters it *"unless its controller pays :rb_energy_2:"*. `UNL-131 Abandon` (Chaos, E2, [Reaction])
counters it and returns it to your hand. On your T4 you have seven runes: the Shroud plus the tax is
three, and a recast after Abandon is two. Both answers are cast on your turn, before the move, so
they do not stop the line, only make it dearer.

The entry's last step names the sweepers, which 355.10.d puts through both clauses. The set holds no
board-wide damage spell; the Fury/Chaos opponent has none to cast.

## 6. Verdict

**Right about what the Shroud protects, wrong about when to cast it, and silent about the other
half of the board's turns.** Cast before the move, the Shroud kept Akali out of reach of a removal
spell held for her, and she conquered at 7. Cast in the order the steps give, it never resolves:
the combat opens in the cleanups after the move, and 155 keeps a keyword-less spell out of it. On
their turn she defends at 4 with neither clause, and Decree of Rage takes her and the battlefield for
one rune. It cannot be countered.

## 7. Not verified

I did not deal the channel order. Their Drakehound needs one Fury among their first three runes,
which it recycles: with six Fury in the twelve it fails in **20 of 220 deals, 9.09%**. The Decree on
their T4 needs a second Fury among the nine runes they have channelled by then; with six non-Fury in
the twelve, nine runes always hold at least three Fury, so it never fails at six. The entry's-order
walk needs that second Fury among the seven channelled by their T3 instead: together with the
Drakehound's need, that fails in **9.42%** of deals. Your Akali needs one Calm among the six runes
you have channelled by T3. With six Calm in the twelve the six hold none in **1 of 924 deals,
0.11%**; with four, **28 of 924, 3.03%**. The Shroud, the Poro and the Guardian are Energy only.

I put Decree of Rage in their hand and did not price it. I did not walk a second Shroud from the
trash with [Flow], Akali moving back to base before their turn (144.4.b, which needs her ready and
she moved that turn), the mulligan, or 2v2. The probabilities in §4 count only cards in hand at the
turn named.

## Leads

- Steps 2 and 3 are in an order that cannot be played. A move into an occupied battlefield ends in a
  cleanup (319.8) that stages the combat (323.9), and the next cleanup with an empty chain opens it
  (460). Between the two only Akali's +2 trigger is on the chain, which is a Closed State. The Shroud
  has no [Action] or [Reaction], so 155 keeps it out. Cast the Shroud first, then move: same Might,
  4 + 1 + 2 = 7.
- The sixth notable, *"THE ONE ORDERING THAT MATTERS"*, says "before the combat opens". The point it
  needs is "before the move".
- No notable walks Akali on defence. On the opponent's turn she is in combat when they attack her
  battlefield (740.2.c), she is a 4, and the Shroud cannot be cast. `VEN-015 Decree of Rage` (Fury,
  E1 + 1 Power, *"This can't be countered. Deal 4 to an enemy Calm (:rb_rune_calm:) unit."*) kills
  her outright, and `OGN-045 Defy` cannot answer it.
- The second notable says every sweeper goes through both clauses. Against Fury/Chaos the answer
  that does not choose her on your turn is not a sweeper but `SFD-001 Against the Odds` (E2, +2 on a
  defender per enemy unit there), and it needs their defenders at 5 or more first.
- The Shroud's protection in base duplicates Akali's own clause. Its whole value is the combat on
  your turn.
