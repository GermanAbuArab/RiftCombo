# Play — The Warden keeps their battlefield small, and the Saboteur deletes one hidden card until a Gust

Issue #362 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `warden-saboteur-hidden-lock`**, the Calm/Fury ENGINE in which `OGN-070 Mageseeker Warden`
leaves the opponent's hidden units face down for good and `OGN-018 Noxus Saboteur` switches off their
other hidden cards in the one combat where they would fire. Walked as a game, the lock was one card:
the single card in the facedown zone of the one battlefield they control. The Saboteur walked into it
on T4 with no window for them to answer, their hidden `SFD-070 Wages of Pain` stayed face down through
the combat, and when the attack took the battlefield the card was removed unplayed: **4 to 2**. The
Warden's hidden-unit clause did nothing, because they hid a spell. What the Warden did was the other
half of the same sentence: their T3 bodies could not be played straight to their battlefield, so it
was a 7 instead of a 12 when the attack came. Four one-rune spells in their colours break that
combat. The one that matters for the lock is `OGN-169 Gust` from hand, on the Saboteur in the
showdown: with him gone, the hidden card is live again in the same showdown.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `0c981b5`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 31 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 72 (a hit on *first*), first in the list. The other entry of this slice is rank 73,
`UNL-167 Starhound` with `UNL-168 Undying Loyalty`, played in
[Undying Loyalty rebuilds the tags for one rune, and the one card it cannot rebuild is Ivern](2026-10-14-undying-loyalty-rebuilds-the-tags-for-one-rune-and-cannot-rebuild-ivern.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-139 Rogue Assassin` (Fury/Calm) |
| **The lock** | `OGN-070 Mageseeker Warden` (Calm, E6 + 1 Power, M5), `OGN-018 Noxus Saboteur` (Fury, E3, M3) |
| **The attackers** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `SFD-029 Rek'Sai, Breacher` (Fury, E3, M3) |

The entry's own notable says Rogue Assassin is the only Fury/Calm legend of the 49, so 103.1.b.1
leaves no second shell: *"Cards included in your deck must abide by your Domain Identity."* Its
Chosen Champion here is `VEN-021 Akali, Deadly Weapon` (Fury). 103.2.a.2: *"Must be a champion unit
with a champion tag that matches the tag on your Champion Legend."* No card of either deck is a
Signature card (`data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Mageseeker Warden: *"While I'm at a battlefield, opponents can only play units to their base. While
  I'm at a battlefield, spells and abilities can't ready enemy units and gear."*
- Noxus Saboteur: *"Your opponents' [Hidden] cards can't be revealed here."*
- Legion Rearguard: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to
  have me enter ready.)"*
- Rek'Sai, Breacher: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to
  have me enter ready.) [Assault] (+1 :rb_might: while I'm an attacker.)"* Her last sentence, about
  units played from anywhere other than a hand, does nothing in this walk.

The entry stands on R33 = A, ruled 2026-09-06: the Saboteur's *"can't be revealed here"* forbids
playing the opponent's facedown card at his battlefield. This play keeps that reading and does not
re-argue it.

## 2. How much the lock can hold, and when it starts

**At the table it is one card.** A Duel has two battlefields, 485.4: *"Battlefield Count: 2"*. They
hide only where they control the battlefield, 107.3.c: *"Cards can only be placed in or occupy the
Facedown Zone if the controller of the card also controls the associated Battlefield."* And each zone
holds one card, 107.3.b: *"Each Facedown Zone has a maximum occupancy of one card."* While you control
G, the only facedown card they can have is the one at B. The entry's 15 units and 24 other cards count
the pool, not what is on the table.

**A hidden card waits for your attack.** 811.1.b: *"Beginning on the next turn, this gains [Reaction]
and you may play this, ignoring its base cost."* But its choices are tied to its battlefield, 811.1.d.2:
*"If a hidden spell or a play effect of a hidden permanent chooses any targets, those targets must be
chosen from among options at that battlefield, unless the ability explicitly restricts targeting in a
way that makes this impossible."* Wages of Pain hidden at B can only hit a unit at B, and until you
attack the only units there are theirs. Its moment is your combat at B.

**The Saboteur gets there unanswered.** He walks from your base, 144.4.a: *"Units may move from their
Base to a Battlefield."* A move opens no chain, and in your Neutral Open State the priority is yours,
312.2.a: *"When the turn is in a Neutral Open State during their Main Phase."* Units you play first
give them no window either, 337.2: *"If, after finalizing the Chain Item, that item is a Unit, Gear,
or an ability that Adds resources, it resolves immediately—Move to Step 4: Resolve."* Their first
priority is in the Combat Showdown, after you pass, 347.2.b: *"Otherwise, Focus passes to the next
Player in Turn Order."* By then he is standing at B.

**If the attack takes B, the card is gone.** 466.5.c: *"Remove all Hidden cards from this Battlefield
that do not share a controller with the Battlefield."* If it does not, the Saboteur goes home, 466.1.a.2:
*"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still present.”"* and the
card stays. So the Saboteur does not delay the hidden card by one combat. When the attack wins, he
deletes it.

**"Here" is read when it is used.** 359.3.f.2: *"Information referenced in an instruction in this way
will be checked on execution of the instruction."* If he leaves B during the showdown, nothing stops
the card any more, and 811.6 lets them play it on the spot: *"A card that is Hidden gains Reaction
while facedown or played from facedown, and may be played any time a card with Reaction may be played
as a result."* That is the break in §5.

**The Warden's first sentence closes more than hidden units.** By default a unit may be played to a
battlefield its controller holds, 355.2.a: *"By default, Valid locations include the controller’s Base
or a Battlefield the controller controls."* The Warden's *"only"* forbids it, 054.2: *"If a card
specifies that an action can “only” be performed under certain circumstances, it cannot be performed
under any other circumstances."* A unit played to base enters exhausted, 143.4: *"Units enter the
Board exhausted."* So a body they play while the Warden is at a battlefield reaches B one turn later.
The leak is [Accelerate], 805.1.a: *"As you play me, you may pay [1][C] as an additional cost. If
you do, I enter ready."* And a hidden unit in hand is not stuck either. 811.3: *"Instead of being
hidden, a card with Hidden may be played for its cost as normal, at its normal timing with no
restrictions on targeting."* Played to their base, it obeys the Warden.

## 3. Their deck: Mind/Chaos, the hiding legend

`OGN-263 Swift Scout` (Mind/Chaos): *"You may pay :rb_energy_1: to hide a card with [Hidden] instead
of :rb_rune_rainbow:."* Its Chosen Champion is `OGN-197 Teemo, Scout`. They play `OGN-175 Shipyard
Skulker` (Chaos, E3, M3, no text), `OGN-171 Mystic Poro` (Chaos, E2, M2, [Vision]) and `OGN-185
Traveling Merchant` (Chaos, E2, M2): *"When I move, discard 1, then draw 1."* The hidden card is Wages
of Pain (Mind, E3): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
:rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Deal 3 to a unit at a battlefield. Play
a Gold gear token exhausted."* §5 names their answers.

## 4. The turns, going first

Fury/Calm against Mind/Chaos. Your battlefield is G; theirs is B. Your opening four are Legion
Rearguard, Noxus Saboteur, Mageseeker Warden and Rek'Sai, Breacher; your T1 draw is a second Legion
Rearguard.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Shipyard Skulker (E3) to base. Three runes, none left.
T2      4       The Rearguard walks to G, Conquer: +1. Noxus Saboteur     1
                (E3) to base. One rune left.
their T2        The Skulker walks to B, Conquer. Wages of Pain hidden
                at B (E1, Swift Scout). Mystic Poro (E2) straight to B.
                A second Mystic Poro (E2) to base. Five runes, none
                left.
T3      6       Hold G: +1. Mageseeker Warden to G: E6 + 1 Calm Power,    2
                six runes exhausted, one of them recycled. Five on the
                board.
their T3        Hold B. The second Poro walks to B: Skulker 3, two
                Poros 2 + 2, a 7. A second Skulker (E3) and Traveling
                Merchant (E2) to base, exhausted: the Warden allows
                nothing else. Seven runes, two left. No attack on G.
T4      7       Hold G: +1. The second Rearguard (E2 + E1 + 1 Fury) and   4
                Rek'Sai (E3 + E1 + 1 Fury), both with Accelerate, to
                base, ready. Seven runes exhausted, two recycled. The
                Saboteur, the Rearguard and Rek'Sai walk to B: 3 + 2 +
                4, a 9 against 7. Wages of Pain cannot be revealed.
                All three of theirs die; Rek'Sai lives. Conquer: +1.
                Wages of Pain is removed. Five runes on the board.
their T4        The second Skulker and the Merchant walk to B: 5
                against Rek'Sai, a 3 now. Rek'Sai and the Skulker die.
                Conquer B.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4
it is **4 to 2**; after their T4, 4 to 3.

**Your T3, why the Warden goes to G and not to base.** His clause asks him to be at a battlefield. In
base he would be mobile and switched off for their T3. G is yours, so 355.2.a lets him go straight
there.

**Their T3, what the Warden bought.** They had seven runes and two bodies to play. Without the Warden,
both go straight to B (355.2.a) and B is 3 + 2 + 2 + 3 + 2 = **12**, which your 9 on T4 cannot attack.
With him, both sit in their base, exhausted (143.4), and B is **7**. They cannot attack G either: their
units at B cannot move to G (144.4.a, 144.4.b), and the new ones are exhausted.

**Your T4, the combat at B.** Both Accelerate units resolve the moment they are played (337.2), so
they get no priority before the move. The three walk in one move, 144.3: *"Players may perform
multiple Units' standard move simultaneously."* The combat opens with you holding Focus, 464.2.c.1.a:
*"If a showdown opens as part of combat, this player gains Focus as the showdown begins."* You pass.
They have Focus, two runes ready and Wages of Pain face down at B, where the Saboteur stands: under
R33 = A it cannot be played. They hold no answer in hand (that is the walk's assumption; §5 prices it)
and pass. 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to
their summed Might among the other's Units."* Your 9: Skulker 3, the Poros 2 and 2, all three dead.
Their 7: the Saboteur 3, the Rearguard 2, and 2 on Rek'Sai, a 4 while attacking. 142.4.b: *"Lethal
Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* She lives. The
assignment is theirs: killing her and the Saboteur (3 + 4) leaves the Rearguard instead, with the same
result. You
establish control, 466.5.d: *"Establishing Control results in a Conquer if that player has not yet
scored this Battlefield this turn."* And 466.5.c removes Wages of Pain from B without it ever being
played.

**What the Saboteur bought.** Without his clause, they play Wages of Pain from B for nothing after
you pass, 3 on the Saboteur, and your 6 (2 + 4) face their 7. Your 6 kill the Skulker and one Poro;
their 7 kill the Rearguard and Rek'Sai. A Poro holds B, 466.1.a.2 has no attacker left to recall, and
they have a Gold gear token: **3 to 2**, and they Hold B on their T4. With him, B is yours and their
card is gone. That is one point and three bodies.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **6** cards by
T2 and **7** by T3 (four opening, one draw a turn). With three of each (103.2.b), a Saboteur among
the first 6 is **40.30%**, a Warden among the first 7 is **45.73%**, and both is **16.89%**. That
counts only those two cards. The walk also needs a 2-drop on T1 and two Accelerate bodies on T4.

## 5. Breaks to

**Four one-rune spells break the T4 result, and `OGN-169 Gust` is the one that also brings the hidden
card back.** Each turns the 4 to 2 into **3 to 2**, played after you pass with one of their two ready
runes. Gust (Chaos, E1):
*"[Reaction] (Play any time, even before spells and abilities resolve.) Return a unit at a
battlefield with 3 :rb_might: or less to its owner's hand."* The Saboteur is a 3 with no [Deflect].
On your T4, after you pass, they Gust him back to your hand, one of their two ready runes. Their chain
closes and Focus comes to you, 347.1.b: *"When that Chain closes, Focus passes to the next Player in
Turn Order."* You pass, and nothing at B stops Wages of Pain any more (359.3.f.2, 811.6): 3 on the
Rearguard. Rek'Sai's 4 alone face their 7. She dies; she kills the Skulker. Two Poros hold B, and it
is **3 to 2** with your Saboteur back in hand and their Gold gear token on the board. Gust cannot reach
him earlier: on their turn he is in your base, and Gust takes only *"a unit at a battlefield"*.

The other three leave the Saboteur at B, so the clause holds, and break the combat instead:

- `UNL-134 Existential Dread` (Chaos, E1 + 1 Power): *"[Stun] an attacking enemy unit."* On the
  Saboteur your damage is 6, and on Rek'Sai it is 5. Either way the Skulker and one Poro die, a Poro is
  left, and 466.1.a.2 recalls your survivors. B stays theirs and Wages of Pain stays face down at B,
  neither played nor removed.
- `VEN-052 Mesmerize` (Mind, E1 + 1 Power), its second mode: *"Give an enemy unit -2 :rb_might: this
  turn."* On Rek'Sai (a 2) or the Saboteur (a 1), your Might is 7 and so is theirs: all six die. B
  goes uncontrolled (466.5.b), and the facedown card goes with it, 107.3.d: *"If a player loses
  Control of a Battlefield, any cards in the Facedown Zone associated with that Battlefield are removed
  during the next Cleanup."*
- `SFD-080 Bellows Breath` (Mind, E1 + 1 Power): *"Deal 1 to up to three units at the same
  location."* One on each of yours leaves 2 + 1 + 3 to kill, and their 7 do it, while your 9 still kill
  all three of theirs. B goes uncontrolled, and Wages of Pain is removed the same way.

**The scope of that verdict.** A Mind/Chaos deck plays only Mind, Chaos and Mind/Chaos cards
(103.1.b.1). In `data/corpus_flat.txt` the spells in those domains with [Action] or [Reaction], the
only spells they can play from hand in a Showdown, are **42** once the two banned ones (Fight or
Flight, Called Shot) are left out. The predicate is: played in the walk's T4 showdown, does it stop
your Conquer of B? Eleven cost one rune, counting a rune exhausted for Energy as recyclable for the
Power (164.2.a, 164.2.b). Gust, Existential Dread, Mesmerize and Bellows Breath do. The other seven
do not:

- `OGN-095 Stupefy`, -1 to a minimum of 1: on Rek'Sai your 8 still kill all three of theirs, and
  their 7 cannot kill 3 + 2 + 3; on the Saboteur they cannot kill 2 + 2 + 4. One of yours lives.
- `VEN-061 Decree of Insight` reaches only a Body unit, and none of yours is. `OGN-104 Retreat`
  returns only a friendly unit, which hands you B. `VEN-152 Rebuttal` counters a spell, and you cast
  none. `OGN-179 Acceptable Losses`, `OGN-183 Stacked Deck` and `SFD-135 Factory Recall` touch no
  unit.
- `VEN-059 Shock Blast` (E3 + 1 Power, *"This costs :rb_energy_2: less if you control something that's
  [Empowered]. Deal 4 to a unit at a battlefield."*) is one rune only with something Empowered.
  Nothing of theirs is, in this walk.

**At two runes, five more do, on the same predicate.** Thirteen of the 42 cost two runes (E2, with up
to 2 Power).

- `OGN-172 Rebuke` (E2 + 2 Power) returns the Saboteur, and Wages of Pain plays as it does after Gust.
- `OGN-093 Smoke Screen` (E2 + 1 Power) makes Rek'Sai a 1: your 6 against their 7, and a Poro holds B.
- `SFD-066 Frigid Touch` (E2) makes Rek'Sai a 2: 7 against 7, and B goes uncontrolled.
- `SFD-145 Switcheroo`, from hand (E2 + 2 Power), swaps the Saboteur's 3 with a Poro's 2: 8 against
  8, and B goes uncontrolled.
- `OGN-173 Ride the Wind` (E2 + 1 Power): *"Move a friendly unit and ready it."* The second Skulker
  moves from their base into the combat. The Warden forbids playing units, not moving them. It becomes
  a defender (464.2.c.3.a), and their 10 against your 9 leave a Poro holding B.
- The other eight do not. `OGN-108 Convergent Mutation` makes a Poro a 3, and their 8 still cannot
  kill 3 + 2 + 4. `OGS-011 Flash` moves their own units out. `SFD-136 Hard Bargain` and `UNL-131
  Abandon` counter a spell. `UNL-083 Smoke and Mirrors` needs a [Temporary] unit. `UNL-142 Heedless
  Resurrection` needs a unit in their trash, and there is none. `OGN-170 Morbid Return` and `UNL-061
  Downstage Dramatics` touch no unit on the board.

Wages of Pain from hand (E3), `VEN-106 Wind and Ghosts` and `UNL-072 Crescent Strike` take him off
B for three runes.

If they run three copies of one of the four one-rune breaks, one is among the **7** cards they have
seen by your T4 (four opening, three draws) in **45.73%**; with two of the four (six cards),
**72.23%**; with all four (twelve), **94.23%**. Each is 7 of 39.

**The break with no card is not hiding at B.** The Saboteur is public from your T2, a turn before they
hide anything. Kept in hand, Wages of Pain costs its printed E3 in your showdown: three runes held up
on their T3 instead of one spent on their T2. In this walk they had two, so it would have cost them
the Merchant.

**The Warden's half leaks too.** [Accelerate] units enter ready (805.1.a) and walk to B the turn they
are played. In their colours, `UNL-127 Mister Root` (Chaos, E2 M1) does it for three runes. On their
T3 it would have made B an 8 instead of the Merchant in base; your 9 still kill all four, and their 8
do not kill Rek'Sai (3 on a 4). The result is the same.

## 6. Verdict

**Right about the reading; wrong about how much it holds and for how long.** In a Duel the lock is one
card, the one facedown at the battlefield they control. The Saboteur reaches it by a move they cannot
answer, and when the attack takes the battlefield, 466.5.c removes the card unplayed. That is not a
card dead for one combat. It is a card deleted, if you win, and alive, if you do not. In this walk the
Warden's hidden-unit clause did nothing, because they hid a spell. What it did was the other half of
its first sentence: their T3 bodies could not go straight to B, so B was a 7 instead of a 12 when the
Saboteur came. Four one-rune spells from hand break that combat: Gust, Existential Dread, Mesmerize
and Bellows Breath. Gust is the one that undoes the lock, because it sends the Saboteur home and the
hidden card plays in the same showdown.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Calm runes, Rogue Assassin's two
domains, in the twelve of Tournament Rules 402.1. The Warden on T3 needs one Calm among the six runes
channelled by then: it fails in **1 of 924 deals, 0.11%**. The two Accelerate costs on T4 need two
Fury among the eight runes channelled by then, less the recycled Calm: that holds in **all 924 deals**
(0 fail). Their walk costs Energy only, and they choose which two of their seven runes stay ready
after their T3. Gust costs E1. Existential Dread needs a Chaos rune and Mesmerize and Bellows Breath
a Mind rune; seven runes from six Mind and six Chaos always hold one of each, so each of the four
holds in **all 924 deals**. Of the two-rune breaks, Rebuke and Switcheroo need two Chaos among the
seven: that fails in **7 of 924 deals, 0.76%**. Smoke Screen and Ride the Wind need one rune of
their domain, which holds in every deal, and Frigid Touch needs none.

I did not walk their facedown card being a unit. The Warden then strands it while he stays at a
battlefield, and it holds the zone's one card (107.3.b), so nothing else can be hidden at B. I did not
walk the Rogue Assassin ability, going second, the mulligan, or 2v2. Their hand holding no answer is
the walk's assumption; §5 prices it. The probabilities in §4 and §5 count only the cards named.

## Leads

- Step 1 says their 15 [Hidden] units are *"unplayable for the rest of the game"*. Only a unit already
  face down is, and only while the Warden is at a battlefield. From hand it is played to base like any
  unit (811.3), which the Warden allows. In a Duel the face-down cards are at most one per battlefield
  they control (485.4, 107.3.b, 107.3.c).
- `terminatesIn` says the other 24 are *"dead for the duration of one combat"*. When the attack takes
  the battlefield, 466.5.c removes the card unplayed, so the Saboteur's payoff is a deletion. When it
  does not, the recall (466.1.a.2) leaves the card where it was.
- No step or notable names the Warden's other effect, the one that paid in the walk: with him at a
  battlefield, no unit of theirs is played straight to a battlefield they control (355.2.a, 054.2), so
  their new bodies reach it a turn late (143.4). The leak is [Accelerate] (805.1.a).
- The notable "What refutes it" says the Saboteur *"dies to anything"* but names nothing. Before he
  moves there is no window (312.2.a, 337.2), and on their turn he is in base, out of reach of the
  *"a unit at a battlefield"* spells. The answer has to come in the showdown. Of the 42 Mind/Chaos
  [Action]/[Reaction] spells, four break the walk's T4 combat for one rune and five more for two.
  `OGN-169 Gust` (one rune) and `OGN-172 Rebuke` (two) are the ones that take him off the
  battlefield, and with him gone the hidden card is played at once (359.3.f.2, 811.6).
  `UNL-134 Existential Dread`, `VEN-052 Mesmerize` and `SFD-080 Bellows Breath` leave him there and
  break the combat instead.
- The Saboteur is public a turn before they hide. A player who sees him keeps the trick in hand and
  pays its printed cost, which the Saboteur does not touch.
