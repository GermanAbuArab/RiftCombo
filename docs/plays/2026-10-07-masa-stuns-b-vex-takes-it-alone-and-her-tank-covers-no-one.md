# Play — Masa stuns B, Vex takes it alone, and her Tank covers no one

Issue #319 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `vex-mocking-masa-free-tank-arrival`**, the Calm/Order ENGINE in which `VEN-120 Masa,
Crashing Thunder`, played with his optional Order Power, stuns an enemy unit at a battlefield, and
`UNL-055 Vex, Mocking` moves on the stun into that battlefield for free and attacks there. The entry
is right about the rules: the move is an effect move and exhausts nothing, and arriving at their
battlefield makes you the Attacker. Walked as a game, Vex comes down on T3 and Masa on T4. Under
`OGN-261 Radiant Dawn` the stun also buffs Vex to 6, and on T4 she takes B from a lone stunned
Skulker that deals her nothing: a Conquer, 4 to 2. They had tapped out on their own turn and could
answer nothing. On their T4 they take B back with four bodies and kill her; she kills two of them.
Her [Tank] covered no one, because Masa can only be played when no battlefield holds both players'
units, so she always arrives alone. The line breaks to a garrison at B worth more than her 6, for no
card at all.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `9ea2315`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 53 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 49 (a hit on *before*), second in the list. The other entry of this slice is rank 48,
played in
[the bounce hands the Mech back, and the second stun kills it](2026-10-07-the-bounce-hands-the-mech-back-and-the-second-stun-kills-it.md).
Vex's line with `SFD-040 Thwonk!`, on the opponent's turn, is played in
[the wall is six damage plus the two biggest attackers](2026-10-05-the-wall-is-six-plus-the-two-biggest-attackers.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | Calm/Order (103.1.b); here `OGN-261 Radiant Dawn`, whose stun trigger buffs Vex |
| **The mover** | `UNL-055 Vex, Mocking` (Calm, E5 + 1 Power, M5), anywhere on your board; here at your base |
| **The stun** | `VEN-120 Masa, Crashing Thunder` (Order, E4, M4), in hand, with 1 Order Power for his additional cost |
| **Board it wants** | an enemy battlefield whose whole garrison adds up to no more than Vex's Might |

The card text the play turns on:

- Vex, Mocking (Calm, E5 + 1 Power, M5): *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I
  must be assigned combat damage first.) When you [Stun] an enemy unit at a battlefield, you may move
  me to that battlefield."*
- Masa, Crashing Thunder (Order, E4, M4): *"You may pay :rb_rune_order: as an additional cost to play
  me. When you play me, if you paid the additional cost, [Stun] an enemy unit at a battlefield. (It
  doesn't deal combat damage this turn.)"*
- Radiant Dawn: *"When you stun one or more enemy units, buff a friendly unit. (If it doesn't have a
  buff, it gets a +1 :rb_might: buff.)"*

## 2. Your order: Vex on T3, Masa on T4

**Vex is a T3 card.** Five Energy is five runes tapped, and the Calm Power recycles one of them, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* On T3's six runes that leaves one ready. Park her at your base:
the move is by effect, so she reaches either battlefield from there, and no battlefield is left empty
when she goes.

**Masa is played on your own turn, so the line is too.** He has no [Action] and no [Ambush], so he is
played as a Discretionary Action, 419.2: *"This is a Discretionary Action."*, and 410.1.a: *"A
Discretionary Action is a Game Action that may be performed at any time during a player's turn during
a Neutral Open State."* He goes to your base or a battlefield you control, 355.2.a: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* His stun reaches
an enemy unit at any battlefield. On T4's seven runes, four tapped and one tapped Order recycled leave
three ready.

**The stun fires two triggers, and you order them.** Vex's move and Radiant Dawn's buff trigger
together, 383.3.d: *"If more than one Triggered Ability is Triggered simultaneously, then the player
that controls the Abilities selects the order to place them on the Chain."* Put the buff on top, and
340.1 resolves it first: *"The newest Finalized Chain Item resolves."* Vex is buffed to 6, then she
moves.

**The move is free, and arriving is attacking.** 420.3.a puts its cost on the Standard Move alone:
*"The Cost is Exhausting one or more Units."* Her arrival contests B, 190.3.a.1: *"Units moving to or
being played to a battlefield apply Contested status if that battlefield is not already Contested and
that Unit’s controller does not already control that battlefield."* And 464.2.c.1: *"The Attacker is
the player whose unit(s) applied the Contested status to the Battlefield."* The Cleanup after the move
stages the combat (323.9) and begins it, 323.13: *"If the current state is a Neutral Open State and one
or more Combats are Staged at Battlefields, the Turn Player chooses one of those Battlefields. Combat
begins there."*

**What the stunned defender gives up, and what it still costs her.** 423.1.b: *"A Stunned Unit does not
contribute its might to damage in the combat damage step."* But it dies only to full damage, 423.1.c:
*"A Stunned Unit must still have damage applied to it equal to, or greater than, its full might value
to be killed."* To win the combat Vex has to be the only one left, 466.3.a: *"A Player has won a combat
if they received either the attacker or defender designation and are the only Player that has units
remaining at this battlefield during this step."* So the garrison she can take is any garrison whose
Might, the stunned unit included, adds up to 6 or less.

**She always arrives alone.** Masa is played in a Neutral Open State, and 323.13 has already begun a
combat at any battlefield where both players had units. So at the moment of the stun no battlefield
holds both players' units, and the one Vex moves to holds none of yours. Her [Tank] makes her take
damage before your other units there, and there are none. Her [Shield] is a defender's +1, 814.1.c:
*"It is functionally short for "While I am a defender, I have +X [M].""* So she attacks at 6, and she
defends B at 7 on their turn.

## 3. Their order: B, and everything else in base

Mind/Chaos under `SFD-199 Prodigal Explorer`, idle in the walk: it needs enemy units chosen twice with
their spells, and they cast none. They take B on their T2 and hold it with one Shipyard Skulker. Every
body after that goes to base, where it can reach either battlefield, 144.4.a: *"Units may move from
their Base to a Battlefield."* They attack when the bodies in base add up to more than a battlefield
of yours, and they spend every rune on their own turn, which leaves none ready on yours.

## 4. The turns, going first

Calm/Order against Mind/Chaos. Your rune deck is six Calm and six Order. Your opening four are Stalwart
Poro, Navori Scout, Vex, Mocking and Masa, Crashing Thunder. The draws are Daring Poro, a second
Stalwart Poro, Sunlit Guardian and a second Navori Scout. You pay no Power before T3.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base, with the 485.7 extra
                rune. All three spent.
T2      4       Poro walks to A, Conquer: +1. Navori Scout (E4) to A.     1
                All four spent.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to base. All five spent.
T3      6       Hold A: +1. Vex, Mocking (E5 + 1 Calm) to base: five      2
                tapped, one tapped Calm recycled. One ready.
their T3        Hold B. A defends at seven (the Poro at 3 with its
                Shield, the Scout 4) and their two in base make five:
                no attack. Ember Monk (E4) and a third Skulker (E3) to
                base. All seven spent.
T4      7       Hold A: +1. Masa (E4 + 1 Order) to A: four tapped, one    4
                tapped Order recycled. He stuns the Skulker at B.
                Radiant Dawn buffs Vex; Vex moves to B. You are the
                Attacker; they have no rune ready. The Skulker deals
                nothing, Vex kills it, Conquer B: +1. Daring Poro (E2)
                to A. One ready.
their T4        All four in base walk into B, twelve against Vex's
                seven. They kill her; she kills the Monk and a Skulker.
                Conquer B. Mega-Mech (E7) and a second Mystic Poro (E2)
                to base. All nine spent.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After their T4 it is 4 to 3.

The T4 combat. Vex is the only unit of yours at B, at 6 with the buff; the Skulker is the only unit of
theirs, at 3 and stunned. They have no rune ready, since 415.3.a readies runes only in their own
Awakening: *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on
their turn."* Both players pass. Their side assigns nothing; Vex assigns 6, and the Skulker's 3 is
lethal. She is the only one left, and 466.5.d makes it a Conquer: *"Establishing Control results in a
Conquer if that player has not yet scored this Battlefield this turn."*

Their T4. Twelve walk into B: the Mystic Poro 2, the Ember Monk 4 and two Skulkers (3 + 3). Vex
defends at 7: 5, the buff, and her Shield. They assign first, 465.2.c: *"Starting with the Attacker,
each player assigns an amount of damage equal to their summed Might among the other's Units."* Seven
kill her, and 465.2.c.4 lets the other five land on her too, since no other unit of yours is there.
Your seven kill the Monk and a Skulker, 4 + 3. They are the only player left at B, and it is a Conquer.
A was safe: it defended at thirteen (the Poro 3, the Scout 4, Masa 4, the Daring Poro 2) against twelve.

**What the line bought.** Play Masa on T4 without the Order Power: no stun, Vex stays in base, Masa and
the Daring Poro to A, the same one rune left. They hold B, and A at thirteen faces twelve in base, so
they do not attack: 3 to 3 after their T4. With the line it is 4 to 3. Vex died for the Skulker at B,
the Monk and a Skulker, ten Energy of theirs for six of yours (five and a Power). Masa stands at A
either way, and the Order Power was the price of the point.

**What the buff added.** Radiant Dawn's +1 put Vex at 6 instead of 5. Against a lone 3 it changed
nothing on T4, and on their T4 she defended at 7 instead of 6 against twelve: they killed her either
way. It raises the garrison she can take from 5 to 6.

**How often this T4 happens.** Vex has to be in the first seven cards and Masa in the first eight: 4 +
3 and 4 + 4 cards of 39 (Tournament Rules 601.1.b makes the Main Deck exactly 40, and 103.2.a.1 sets
the Chosen Champion aside). That is **21.7%** of games with three of each and **3.3%** with the
entry's one of each, without a mulligan. And B has to be held by a garrison of 6 or less.

## 5. Breaks to

**The line breaks to a bigger garrison at B, for no card.** On their T3 they walk the Mystic Poro and
the second Skulker from base to B, with the Skulker already there: eight Might at B. Masa stuns one of
the Skulkers; the other Skulker and the Mystic Poro deal 5 to Vex, who survives at 6. Vex has to kill
all three, eight in all at full Might, and has 6: she kills both Skulkers, and the Mystic Poro lives.
Both sides have units left, so the cleanup recalls her, 466.1.a.2: *"Insert “3d. Recall Attackers
present at the Battlefield if Defenders are still present.”"* No Conquer, and Masa's stun bought only
Vex's survival: unstunned, the garrison's eight would kill her at 6, and the same two Skulkers would
die either way. Their price is two bodies at B instead of in base, where they were not attacking from anyway:
A defended at seven against five.

The threshold is Vex's Might, 6 with the buff and 5 without, against the whole garrison. A single
Mystic Poro walked in makes five, and she still kills both. `OGN-095 Stupefy` (Mind, E1, -1 Might) on
Vex in the combat leaves her at 5, still enough for the lone Skulker, and they had no rune for it.

## 6. Verdict

**Right, and the line is a point on your own turn, priced at one Order Power.** The move is an effect
move, 420.3.a charges it nothing, and arriving contests B and makes you the Attacker. The play adds
four things. Masa is played only in a Neutral Open State, so Vex always arrives alone: her [Tank]
covers no one and her [Shield] does not count on the attack. An opponent who spends everything on their
own turn has nothing to answer with on yours. The point comes at Vex's price: on their T4 four bodies
took B back and killed her, for two of theirs. And the line breaks for free to a garrison at B worth
more than her 6.

## 7. Not verified

I did not deal the channel order. Vex's Calm Power on T3 needs one Calm in the first six runes: it
fails in 1 of the 924 deals, the one whose first six are all Order. Masa's Order Power on T4 needs one
Order among the runes on the board, the first eight channeled less the recycled Calm: none of the 924
fail. They pay no Power. I did not walk the opponent holding runes through your turn, Vex parked at A
instead of base, a second Masa, T5 on (A's bodies against B's two survivors), the mulligan, or 2v2.

## Leads

- The entry's notables *"IF THE COMBAT IS ALREADY OPEN SHE STILL JOINS IT"* and *"[TANK] IS THE REASON
  TO WANT HER THERE"* do not arise with Masa: he is played only in a Neutral Open State (419.2,
  410.1.a), when 323.13 has already begun a combat wherever both players had units, so Vex arrives at a
  battlefield with none of your units on it. Both notes need a stun that lands inside a combat.
- The entry's step 5 relies on 464.2.c.3.a for her designation. She arrives before any combat exists,
  so her designation comes from 464.2.c.3 when the combat she started opens.
- The entry's prerequisites do not state the garrison limit: Vex has to kill the whole garrison at full
  Might, stunned unit included (423.1.c, 466.3.a), so anything above her Might keeps B. Under
  `OGN-261 Radiant Dawn`, one of the entry's four legends, the stun buffs her and the limit is 6.
