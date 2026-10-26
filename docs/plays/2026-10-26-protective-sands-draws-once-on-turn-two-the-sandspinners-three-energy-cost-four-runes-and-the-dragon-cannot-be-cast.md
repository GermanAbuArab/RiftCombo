# Play — Protective Sands draws once on turn two, the Sandspinner's three Energy cost four runes, and the Dragon cannot be cast

Issue #466 (a slice of #200), 2026-10-26. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `protective-sands-few-runes-fury`**, the Fury ENGINE built on one clause printed three
times: *"if you control 4 or fewer runes"*. `VEN-162 Protective Sands` (battlefield) draws a card for 1
Energy when you conquer it, `VEN-016 Eclipse Dragon` (Fury, E8, M8) draws when it moves, and `VEN-001
Baccai Sandspinner` (Fury, E6, M6) gets its [Empower] for E2 instead of E5. The entry says the
condition is free in the opening and later a timing choice: tap the runes for Energy, then recycle
down to four. It is right that the condition is free on your T2 going first, and right that the
recycle pays. Walked as a game, going first, under `SFD-181 Mechanized Menace` against the
Calm/Order Shield deck of [the Rell play](2026-10-24-rell-takes-one-free-equipment-the-bow-fires-only-on-defence-and-decree-of-focus-kills-her-for-one-rune.md).
**The main line:** a Rearguard conquers Protective Sands on T2 with four runes on the board, and you
pay 1 and draw. That is the only conquer of A in the walk, because A stays yours. On T4 you tap all
eight runes and recycle four, the Sandspinner's [Empower] costs E2, it takes their battlefield at
Might 8, and the 3 Energy saved buy one more two-drop. On their T4 eleven Might kill it. **4 to 3**
after their T4, on **4** runes. **The control** pays the [Empower] at E5 and recycles nothing: also
**4 to 3**, on **8** runes. On T5 the control can cast the Dragon and the main line cannot. **The
cheapest answer is one rune, recycled:** `VEN-034 Resonating Strike`, hidden at their battlefield with
the one rune their T3 leaves spare, moves their Sunlit Guardian in from base, and the Sandspinner dies
attacking a 9. From hand it takes two runes: `VEN-040 Decree of Focus` and `OGN-046 En Garde` with none
recycled, or `SFD-040 Thwonk!` or `VEN-126 Ki Barrier` with one.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-25 at `a67d27f`, reads
773 entries, 266 with forced-ordering language, **94 in the queue and 3 of them with no play**, as the
issue measured. This entry is rank 76, a hit on *first*; the other entry of this slice is rank 44,
`helm-empowered-spell-tax`. Both entered the queue at `0098d17` (#460), whose CORRECTED sentence on a
step of each says *"going first"*.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-181 Mechanized Menace` (Fury/Mind, tag Rumble) |
| **Chosen Champion** | `SFD-026 Rumble, Hotheaded` (Fury, E4, M4), never played |
| **The battlefield** | `VEN-162 Protective Sands` (Colorless battlefield) |
| **The payoffs** | `VEN-001 Baccai Sandspinner` (Fury, E6, M6), `VEN-016 Eclipse Dragon` (Fury, E8, M8) |
| **The other bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-018 Noxus Saboteur` (Fury, E3, M3) |

The entry admits any legend with Fury in its pair and names Mechanized Menace. It is the one for this
walk because its text does nothing here: *"Your Mechs have [Shield]. (+1 :rb_might: while they're
defenders.)"* No Mech is played. Its tag is Rumble, so Rumble, Hotheaded can be the Chosen Champion,
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."*

Every card here is mono-Fury or Colorless, so a Fury/Mind deck admits it, 103.1.b.3: *"If a card has
a single Domain, then that card is permitted in the Domain Identity that corresponds to the same
Domain."* Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the
same named card."* The deck runs three Sandspinners and three Dragons, as the entry asks. None of the
cards in this play, on either side, is a Signature card (`signature` in `data/cards.json`), and none
is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Protective Sands: *"When you conquer here, if you control 4 or fewer runes, you may pay
  :rb_energy_1: to draw 1."*
- Baccai Sandspinner: *"[Empower] :rb_energy_5:. This ability costs :rb_energy_3: less if you control 4
  or fewer runes. (Pay the cost: Empower me. Use only if not Empowered.) [Empowered][>] I have [Deflect]
  and [Assault 2]. (Opponents must pay :rb_rune_rainbow: to choose me with a spell or ability. +2
  :rb_might: while I'm an attacker.)"*
- Eclipse Dragon: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have
  me enter ready.) When I move, if you control 4 or fewer runes, draw 1."*
- Legion Rearguard's [Accelerate] and Pouty Poro's [Deflect] are idle in the walk.

## 2. What the clause counts, and what a recycled rune costs

**Runes come two a turn, and a recycled one is gone for the walk.** 315.3.b: *"1. The Turn Player
channels 2 runes from their Rune Deck."* Going first you control 2 runes after T1, 4 after T2, 6 after
T3 and 8 after T4, as the entry says. The clause is free on T1 and T2 and on no later turn. A rune adds
Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power by leaving, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* The recycle has no exhaust in its cost, so an exhausted rune
still pays it, which is the entry's point. It goes to the bottom of the Rune Deck, 416.1: *"Recycling
cards is the action in which a player takes one or more cards from a specific zone and then puts it on
the bottom of the corresponding deck."*, and channelling takes from the top, 430.1: *"Channeling is the
action of taking one or more Runes from the top of a player's Rune Deck and putting them on the
board."* So each rune recycled is a rune short on every later turn of this walk.

**The Power a recycle adds is lost if nothing pays for it.** 167: *"Every player's Rune Pool empties at
the start of each player's Main Phase and the end of each player's turn."* Nothing in this deck costs
Power except an [Accelerate]. The four Power the main line's T4 adds are spent on nothing.

**The discount is read when the [Empower] is paid.** 827.1.c.3: *"Empower abilities may also include
text that alters the Empower cost. Such text is taken into account when determining a card’s Empower
cost for any reason."* A unit's activated ability waits for your Main Phase, 145.2: *"The Activated
Ability of Units may be executed at any time during the controlling player's Main Phase during an Open
State, and not during a Showdown."* The state stays once paid, 441.1.a: *"Empowered is a binary state.
A Game Object is Empowered or it isn’t."*

**The Dragon can never be cast with four runes.** It costs E8, and this deck has no Energy but its
runes, so you control at least 8 the turn it is played. To draw when it moves you must then recycle
down to four: at least four runes for one card, every time. With [Accelerate] it moves the turn it
lands. That is E9 and one Fury Power, nine runes exhausted, and at least five recycled to reach four.
805.1.a: *"Accelerate is functionally short for "As you play me, you may pay [1][C] as an additional
cost. If you do, I enter ready.""* Without it the Dragon enters exhausted, 143.4: *"Units enter the
Board exhausted."*, and moves a turn later, when two more runes have come.

**A conquer at Protective Sands needs A not to be yours.** 469.1: *"Conquer: A player gains Control of a
Battlefield they did not yet Score this turn."* While A stays yours you Hold it each turn, 469.2:
*"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their
Beginning Phase."*, and a Hold is not a conquer. A unit taking an empty battlefield is a conquer
without a combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty
Battlefield are a stand-alone Phase and do not create a Combat."* 348.2.a.1: *"This results in a
Conquer if that player has not yet scored that Battlefield this turn."*

**Movement and combat.** 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units
may move from a Battlefield to their Base."* A unit is played to base or to a battlefield you control,
355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* Damage is read at the end of the showdown with current Might, 465.2: *"When the Showdown
closes, Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked, using their
current Might."* [Tank] goes first, 815.1.b: *"I must be assigned lethal damage before any other unit
with the same controller as me that does not have [Tank] during the Combat Damage step."* A unit dies
at its Might, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that
Unit’s Might."* An attacker still facing a defender goes home, 466.1.a.2: *"Insert “3d. Recall
Attackers present at the Battlefield if Defenders are still present.”"*

## 3. Their deck: Calm/Order Shield bodies

The deck of the Rell play linked above. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one or
more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff.)"*
It is idle in the main line. Its Chosen Champion is `OGN-238 Leona, Determined`, never played. Their
bodies are `OGN-052 Stalwart Poro` (Calm, E2, M2, *"[Shield] (+1 :rb_might: while I'm a
defender.)"*), `OGN-054 Sunlit Guardian` (Calm, E3, M3, *"[Shield] (+1 :rb_might: while I'm a
defender.) [Tank] (I must be assigned combat damage first.)"*), `OGN-044 Clockwork Keeper` (Calm, E2,
M2; they do not pay its Calm), `OGN-219 Vanguard Sergeant` (Order, E4, M4, no text) and `SFD-037 Navori
Scout` (Calm, E4, M4, [Deflect]). Nothing in their hand stuns, kills or counters. Going second, they
channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra
Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Mind against Calm/Order. Your battlefield is A, Protective Sands. Theirs is B, `OGN-282
Monastery of Hirana` (*"When you conquer here, you may spend a buff to draw 1."*, and nobody has a
buff). Your opening four are Legion Rearguard, Pouty Poro, Noxus Saboteur and Baccai Sandspinner.
Your Main Deck then gives, in order: Eclipse Dragon (the T1 draw), a second Rearguard (T2), a second
Pouty Poro (Protective Sands' draw on T2), a second Saboteur (T3) and a third Rearguard (T4). Their
opening four are Stalwart Poro, Sunlit Guardian, Clockwork Keeper and Vanguard Sergeant. Their draws
are Navori Scout (T1), a second Stalwart Poro (T2), a second Sunlit Guardian (T3) and a second
Clockwork Keeper (T4).

The main line recycles down to four on T4, as the entry's step 3 says.

```
turn      runes   your turn                                                 points
T1        2       Legion Rearguard (E2) to base. None left.                 0
their T1  3       Stalwart Poro (E2) to base. One left.                     0
T2        4       The Rearguard walks to A, empty, Conquer: +1.             1
                  Protective Sands: four runes, pay 1, draw 1. Noxus
                  Saboteur (E3) to A. None left.
their T2  5       The Poro walks to B, empty, Conquer. Sunlit Guardian      1
                  (E3) and Clockwork Keeper (E2) to base. None left.
T3        6       Hold A: +1. Baccai Sandspinner (E6) to base. None        2
                  left.
their T3  7       Hold B. Vanguard Sergeant (E4) and the second Stalwart    2
                  Poro (E2) to base. One left.
T4        8       Hold A: +1. All eight exhausted, four recycled: four     4
                  runes. [Empower] at E2. The Sandspinner (8 attacking)
                  walks to B and kills the Poro: Conquer B, +1. Pouty
                  Poro, the second Rearguard and the second Pouty Poro
                  (E2 each) to A. Four Power unspent.
their T4  9       The Guardian, the Keeper, the Sergeant and the second     3
                  Poro (3 + 2 + 4 + 2 = 11) attack B. The Sandspinner
                  kills the Guardian and the Keeper and dies. Conquer
                  B. Navori Scout (E4), the second Guardian (E3) and the
                  second Keeper (E2) to base. None left.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **4 to 2**; after their T4, **4 to 3**.

Runes on your board at the end of each turn: 2, 4, 6, **4**. On theirs: 3, 5, 7, 9. They recycle
nothing.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard (Pouty Poro, Saboteur,
Sandspinner, Dragon); 5 after the T2 draw, 6 after the Protective Sands draw, 5 after the Saboteur; 6
after the T3 draw, 5 after the Sandspinner (Pouty Poro, Dragon, second Rearguard, second Pouty Poro,
second Saboteur); 6 after the T4 draw, 3 after the three two-drops (Dragon, second Saboteur, third
Rearguard). Theirs: 5 after the T1 draw, 4 after the Poro (Guardian, Keeper, Sergeant, Scout); 5 after
the T2 draw, 3 after the Guardian and the Keeper (Sergeant, Scout, second Poro); 4 after the T3 draw, 2
after the Sergeant and the second Poro (Scout, second Guardian); 3 after the T4 draw, 0 after the
three bodies.

**Your T2: the one free card.** The Rearguard, played on T1, is ready and walks into A, empty. It is a
conquer (348.2.a.1), you control four runes, and Protective Sands' trigger lets you exhaust one rune
for its Energy and draw. Three runes are left for the Saboteur at A. That card cost one Energy and no
rune off the board, which is what the entry means by free in the opening.

**Their T2 and T3.** The Poro takes the empty B. Their T3 bodies in base are the Guardian and the
Keeper, 5 Might, against A at 2 + 3 = 5. That trade would empty both sides of A, and it is not taken
in the main line: an empty A is the only way you could conquer Protective Sands a second time (§5).

**Your T4: the recycle.** You exhaust all eight runes, eight Energy in the pool, and recycle four of
them for four Power: four runes on the board. The Sandspinner's [Empower] now costs E5 less 3, E2
(827.1.c.3). It is ready, having been played on T3, and attacks B at 6 + 2 = 8 against the Stalwart
Poro's 2 + 1 = 3. The Poro dies; its 3 are not lethal on the Sandspinner. B is yours, a conquer, 466.5.d:
*"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this
turn."* The six Energy left buy three two-drops at A, which now defends at 2 + 3 + 2 + 2 + 2 = 11. The
four Power go unspent (167).

**Their T4: the Sandspinner dies at B.** Empowered, it takes a battlefield every time it attacks. On
defence it has no [Assault]: it is a 6, alone at B. Their four ready bodies attack it with 11. Its 6
must go first to the Guardian, which has [Tank] (815.1.b): 3 to it, 2 to the Keeper, 1 to the
Sergeant. Their 11 kill it. B is theirs again: **4 to 3**.

**The control: no recycle.** The same deal. On T4 the [Empower] costs E5 out of eight runes and the
Sandspinner takes B the same way. The three Energy left buy the second Saboteur (E3) at A, which
defends at 2 + 3 + 3 = 8. Their T4 is the same attack on B, with the same result: **4 to 3**. You end
on **8** runes, with Pouty Poro, the Dragon, two Rearguards and the second Pouty Poro in hand.

**What the recycle bought.** Three Energy on T4, once: three two-drops at A instead of one three-drop,
11 there instead of 8. It cost four runes. On T5 the main line has 6 runes and the control 10. The
control can cast the Dragon (E8) and the main line cannot until T6. If the control casts it with
[Accelerate] (E9 and one Fury Power) and wants its draw, it recycles six of its ten runes to reach four.

**How often this happens.** Protective Sands is one of your three battlefields, and the one in play is
picked at random, 485.5: *"Setup: Each player randomly selects one (1) of their three (3)
Battlefields. The other two are removed and will not be used for this game. The selected Battlefields
are placed simultaneously in the Battlefield Zone."* So it is in play **1 game in 3**. The draw pile
is **39** cards, the 40 of Tournament Rules 402.1 less the Chosen Champion. Tournament Rules 402.1:
*"In a constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, with
the Protective Sands card, you have seen 8 cards by T3. A Sandspinner among them, at three copies, is
**50.82%**; with Protective Sands in play as well, **16.94%**.

## 5. Breaks to

**What the engine did, and the predicate.** It drew one card on T2, and on T4 it bought the
Sandspinner's [Empower] for E2 and four runes. The predicate is: played by them with the runes they
have, does it stop the T2 card, or keep the Empowered Sandspinner from taking B on your T4?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* As in the Rell play, that is
**254** cards folded by name (not a legend, battlefield, rune or token, and not a Signature card with
another champion's tag), none of them banned in constructed: **159** units, **62** spells and **33**
gear.

**The candidates.** On your turn they can play only a card with [Reaction], or with [Action] inside a
showdown, or one they hid earlier. 813.1.c.1: *"This can be played during Closed States on any player's
turn."* 806.1.b: *"Action grants the corresponding card or effect permission to be played or activated
during Showdowns, even when it is not the Controlling player's turn."* Of the 254, **62** carry
[Reaction], [Action] or [Hidden]. I read the **32** that cost E2 or less, and the **4** [Hidden] cards above E2, since from
facedown they cost no Energy.

**The T2 card has no answer.** On your T2 they have one ready rune, left over from their T1, and no
facedown card: they controlled no battlefield to hide one at. Nine of the 32 cost E1 or less. Two are
the Seals, which only add Power. `OGN-045 Defy` and `VEN-039 Crumbling Sands` counter spells, and
you cast none: the move is not a spell and Protective Sands' trigger is an ability. `UNL-173
Sacrifice` needs a [Mighty] unit of theirs. `OGN-046 En Garde`, `UNL-031 Combat Experience` and
`UNL-046 Friendship` pump a unit of theirs, and none is at A. `VEN-040 Decree of Focus` needs a unit of
theirs in combat, and there is no combat.

**No one card from hand at one rune stops the Sandspinner.** On your T4 they have the one rune left
from their T3. It attacks at 8. Decree of Focus is the largest one-rune pump: *"[Reaction] (Play any
time, even before spells and abilities resolve.) Choose a friendly unit that's in combat with an enemy
Fury (:rb_rune_fury:) unit or that's being chosen by an enemy Fury spell. Give it +4 :rb_might: this
turn."* The Poro is 2 + 1 + 4 = 7. The Sandspinner's 8 kill it, its 7 do not kill the Sandspinner, and
B is yours anyway. En Garde makes it 5, and Combat Experience and Friendship (the Poro tag only) 4.

**The cheapest answer: one rune, recycled, hidden on their T3.** `VEN-034 Resonating Strike` (Calm,
E2 + 1 Calm Power): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
:rb_energy_0:.) [Reaction] (Play any time, even before spells and abilities resolve.) Choose a
battlefield you control and a unit you control at a different location. Move that unit to that
battlefield and give it +2 :rb_might: this turn."* The walk's own T3 leaves them one rune, and B has been
theirs since their T2, so they hide it at B for that rune, recycled for its Power (811.1.b, quoted
below). On your T4 it is played from facedown, ignoring its base cost, the printed E2 and one Power,
204.1.a: *"On cards, the Base Cost is found in the upper left corner of the card."* It chooses no unit
of yours, so [Deflect] adds nothing. A hidden spell's choices stay at its battlefield unless the text
makes that impossible, 811.1.d.2: *"If a hidden spell or a play effect of a hidden permanent chooses any
targets, those targets must be chosen from among options at that battlefield, unless the ability
explicitly restricts targeting in a way that makes this impossible."* *"a unit you control at a
different location"* is that case, as the rule's own Tideturner and Smoke and Mirrors examples show,
so it moves the Sunlit Guardian in from their base at 3 + 2. A unit that arrives mid-combat is a
defender from the next Cleanup on, 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender
becomes present at this Battlefield after this moment, it will gain the Attacker or Defender
designation during the Cleanup phase following the action that caused it to become present, as
appropriate for its controller."* So its [Shield] counts: 6, and with the Poro's 3, B defends at **9**.
Their 9 kill the Sandspinner, a 6 + 2 = 8 while it attacks. Its 8 must go first to the Guardian, which
has [Tank] (815.1.b): 6 to it, and the 2 left do not kill the Poro. B stays theirs. Without the
[Shield] it is 5 + 3 = 8, still lethal on an 8.

**From hand: two runes.** They keep runes up on their T3 by holding the second Stalwart Poro back.
Then:

- Decree of Focus and En Garde (Calm, E1): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Give a friendly unit +1 :rb_might: this turn, then an additional +1 :rb_might:
  this turn if it is the only unit you control there."* Both on the lone Poro at B: 2 + 1 + 4 + 2 =
  **9**. The Sandspinner dies, and its 8 do not kill the Poro. Two runes, **none** recycled, but two
  cards.
- Resonating Strike cast from hand: E2 and one Calm Power, two runes, one recycled, with the same
  result as from facedown.

- `SFD-040 Thwonk!` (Calm, E2): *"[Action] (Play on your turn or in showdowns.) [Repeat] :rb_energy_2:
  (You may pay the additional cost to repeat this spell's effect.) Stun an attacking unit. (It doesn't
  deal combat damage this turn.)"* It chooses the Sandspinner, so its [Deflect] adds one Power of any
  domain, 809.1.c: *"Spells and abilities an opponent controls that target [me/this] cost an amount of
  Power equal to [Deflect Value] more to play as an additional cost for each time they choose
  [me/this]."* E2 and one Power: two runes, one recycled. The Sandspinner deals nothing, the Poro's 3
  do not kill it, and it is recalled (466.1.a.2). B stays theirs, and Radiant Dawn buffs one of their
  units for the stun. The [Repeat] is not paid, so the open [Repeat] reading (the #187 bullet in
  `docs/rules-notes/rules-findings.md`) does not bear on it.
- `VEN-126 Ki Barrier` (Order, E2 + 1 Order Power): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Choose a unit. Prevent the next 7 damage that would be dealt to it this turn.
  (Opponents can assign it extra combat damage to kill it.)"* On their Poro. The Sandspinner's 8 leave
  it 1 damage, not lethal, and the Sandspinner is recalled. It does not choose the Sandspinner, so no
  [Deflect]. Two runes, one recycled.

None of them cares whether the [Empower] cost E2 or E5, so each answers the control the same way. Against
the main line they also leave the four runes you recycled with nothing to show. `OGN-050 Rune Prison`
(Calm, E2 + 1 Calm Power) stuns it too, for two runes, both recycled once [Deflect] is paid.

**A hidden card that chooses the Sandspinner costs two runes, both recycled, and no Energy.** From
their T2 they control B, so they can hide a card there for one rune, 811.1.b: *"While this card is in your hand or in your
Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield
you control that doesn't already have a facedown card hidden there for as long as you control that
battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base
cost."* `OGN-220 Facebreaker` stuns the Sandspinner and their Poro, `UNL-042 Back Off` stuns the
Sandspinner, and `OGN-213 Hidden Blade` kills it and you draw 2. Each chooses the Sandspinner, so
[Deflect] adds the second rune. Of the hidden cards that do not choose it, Resonating Strike is the
one that works (above); the rest fail. `OGN-057 Block` makes the Poro a 2 + 1 + 3 = 6, short of 8. `OGN-077 Zhonya's Hourglass` and `SFD-043 Emperor's Divide` take the
Poro home and hand you B. A unit that arrives mid-combat is a defender (464.2.c.3.a), but these fall
short: `VEN-117 Disciple of Shen` is 1 + [Shield 3] = 4 beside exactly one other unit, and with the
Poro's 3 that is 7; the 2 Might Sand Soldier of `SFD-154 Guards!` and the Poro make 5. `OGN-053 Stand
United` buffs the Poro to 2 + 1 + 1 + 1 = 5. `VEN-135 Kennen, Keeper of Balance` does choose the
Sandspinner, but its stun costs E2 on top of the hide and the [Deflect] Power: three runes in all,
dearer than every answer above.

**The free answer: garrison B to 9.** On their T2 the Guardian and the Keeper go to B instead of
their base, for the same five Energy. B defends at 3 + 4 + 2 = 9. The Sandspinner's 8 kill the Guardian and
the Poro and their 9 kill it, so it does not attack, and the [Empower] the recycle bought takes nothing.
**And leave A alone.** Protective Sands draws on a conquer, and you only conquer A again if they empty
it. Their T3 attack on A would have done exactly that.

## 6. Verdict

**Right that the clause is free in the opening and that the recycle pays, and the recycle is the
expensive half.** Going first the free window is your T1 and T2. On T2 Protective Sands drew one card
for one Energy, and that was its only draw: A stayed yours and was never conquered again. On T4 the
recycle to four runes cut the Sandspinner's [Empower] from E5 to E2. The three Energy bought one more
two-drop, and the price was four runes for the rest of the walk. It took their battlefield and died
there on their T4. **4 to 3**, on 4 runes against the control's 8 and the same score. On T5 the
control can cast the Dragon and the main line cannot. The cheapest answer is one rune, recycled:
Resonating Strike, hidden at B on their T3, brings their Guardian in and B defends at 9. From hand it
takes two runes: Decree of Focus and En Garde with none recycled, or Thwonk! or Ki Barrier with one.
The free answer is a garrison of 9 at B, and leaving A alone.

## 7. Not verified

**Runes.** I did not deal the channel order. The walk assumes six Fury and six Mind runes for you,
Mechanized Menace's two domains, in the twelve of Tournament Rules 402.1. You pay no Power in the walk:
the four the main line adds on T4 go unspent, and any four runes can be the ones recycled. So the split
does not change the walk: **0 of 495** deals of your first eight fail it.

Their main line pays no Power. Of the answers in §5, Thwonk!'s [Deflect] Power is any domain. Ki
Barrier needs an Order rune among their first seven runes. With six of each, it fails only when all
seven are Calm, which six cannot be: **0 of 792**.

**How likely an answer is.** The walk fixes their opening four and their three draws to their T3. A
Resonating Strike, a Thwonk! or a Ki Barrier among their first 7 cards of 39, at three copies each, is
**86.76%**; without Resonating Strike, **72.23%**. That counts only those three single-card answers,
not the Decree of Focus and En Garde pair, and not how many of them a Calm/Order list runs.

`data/cards.json` carries no champion supertype. I read Rumble, Hotheaded as a champion unit by his
title name and his Rumble tag. Their choice not to attack A on their T3, and to attack B and not A on
their T4, is the walk's choice of opponent; §5 prices the others. Not walked: going second; the
mulligan; 2v2; Bo3 (486), where the battlefield is chosen and not drawn; the Dragon, which neither line
casts before T5; Thwonk! with its [Repeat] paid; and the turns after their T4.

## Leads

- Step 2, *"In the opening the condition is already true: 315.3.b channels two runes a turn, so you
  control 2 after turn one and 4 after turn two."*: true going first. Going second you control 3 after
  T1 (485.7) and 5 after T2, and a unit played on T1 cannot conquer before T2. So going second the
  first Protective Sands draw costs a recycled rune.
- Step 4, *"Conquer Protective Sands"*, after step 3's recycle: in the walk A was conquered once, on T2,
  and held after. A Hold is not a conquer (469.2). The second conquer needs them to empty A first,
  which the entry's own notable says (*"a conquer battlefield taken and kept fires exactly once"*).
- Step 5, *"Standard-Move Eclipse Dragon in the same Main Phase for a second card"*: the Dragon costs
  E8 and cannot be cast while you control four runes. Each of its draws needs at least four runes
  recycled, five on the turn it lands with [Accelerate]. In the walk the T4 recycle for the Sandspinner
  left 6 runes on T5, so the Dragon could not be cast that turn. A Dragon cast on an earlier turn can
  share one recycle with the conquer and the [Empower]: on a 12-rune turn, all twelve exhausted and
  eight recycled pay for the Protective Sands draw, the Dragon's move draw and the E2 [Empower]. What
  the walk shows is narrower: the Dragon cannot be cast on a turn you hold four runes, and the T4
  recycle kept it out of T5.
- Step 3, *"banking a Power for each"*: the pool empties at the end of the turn (167), and nothing in
  the package costs Power except [Accelerate]. In the walk the four Power were lost.
- `terminatesIn`, *"thereafter costing two Channel Phases per rune dumped"*: the 2026-10-24 correction
  to the second notable withdrew that figure. `terminatesIn` still carries it.
- `netPerIteration`, *"a one-off 3 Energy off each Sandspinner's Empower"*: in the walk those 3 Energy
  cost four runes off the board.
- The entry names no answer. The cheapest is one rune, recycled: Resonating Strike, hidden at their
  battlefield the turn before, moves a [Shield] [Tank] body in and the Empowered Sandspinner dies
  attacking. From hand it is two runes: Decree of Focus and En Garde with none recycled, or Thwonk! or
  Ki Barrier with one. The free answers are a garrison of 9 where it would attack, and not emptying
  Protective Sands.
