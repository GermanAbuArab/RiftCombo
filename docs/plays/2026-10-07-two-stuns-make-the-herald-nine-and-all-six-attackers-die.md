# Play — two stuns make the Herald nine, and all six attackers die

Issue #317 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `eclipse-herald-thwonk-repeat-two-stuns`**, the mono-Calm ENGINE in which `SFD-040 Thwonk!`
with its [Repeat] stuns two attackers inside the opponent's Combat Showdown, and `OGN-059 Eclipse
Herald` takes +1 for each stun. The entry is right about the rules: two executions, two stuns, two
triggers, and the ready does nothing. Walked as a game, the Herald comes down on T4, and under
`VEN-145 Curator of the Sands` his own cost readies two runes, so the full line is live from their T5.
On their T5 they attacked A with eighteen against seventeen. The stuns took their two Monks out of the
sum, the Herald defended at 9, and all six attackers died. They killed the Herald with what was left.
The stuns are Thwonk!'s, and the Herald's share is the +2, which in the walk was worth one body on each
side. What breaks it is `SFD-136 Hard Bargain`, two runes, against four runes held and no more.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `8940360`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 55 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 47 (a hit on *first*), second in the list. The other entry of this slice is rank 46,
played in
[the Birds die first, Lillia dies at eight, and A holds](2026-10-07-the-birds-die-first-lillia-dies-at-eight-and-a-holds.md).
Thwonk! is in two other catalogued lines; the one with Vex is played in
[the wall is six damage plus the two biggest attackers, and width walks through it](2026-10-05-the-wall-is-six-plus-the-two-biggest-attackers.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Calm in its pair (103.1.b); here `VEN-145 Curator of the Sands` (Calm/Mind) |
| **The body** | `OGN-059 Eclipse Herald` (Calm, E7 + 1 Power, M7), at the battlefield they attack |
| **The spell** | `SFD-040 Thwonk!` (Calm, E2, [Repeat] 2 Energy), in hand, and four runes left ready through your own turn |
| **Board it wants** | an attack of two or more bodies on the Herald's battlefield |

The card text the play turns on:

- Eclipse Herald (Calm, E7 + 1 Power, M7): *"When you stun an enemy unit, ready me and give me +1
  :rb_might: this turn."*
- Thwonk! (Calm, E2): *"[Action] (Play on your turn or in showdowns.) [Repeat] :rb_energy_2: (You may
  pay the additional cost to repeat this spell's effect.) Stun an attacking unit. (It doesn't deal
  combat damage this turn.)"*
- Curator of the Sands: *"When you play a unit, gear, or activated ability with Energy cost
  :rb_energy_7: or more, you may exhaust me to ready up to 2 runes."*
- Hard Bargain (theirs, Chaos, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) [Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.)
  Counter a spell unless its controller pays :rb_energy_2:."*

## 2. Your order: the Herald on T4, Thwonk! on their T5

**The Herald is a T4 card, and the legend pays two runes back.** Seven Energy is seven runes tapped,
and the Calm Power recycles one of them, so he needs a turn with seven runes: T4, which has eight, and
on its own that leaves one ready for their T4. His Energy cost is seven, so Curator of the Sands
triggers and readies two: three ready on their T4, one Thwonk! without its Repeat. Runes ready again
only in your own Awakening, 415.3.a: *"A player Readies all non-spell Game Objects they Control during
the Awakening Phase on their turn."* So the full line, four runes held through your turn, starts on
T5: nine runes, a five-cost play, four left.

**The two stuns are chosen as Thwonk! is played.** 820.2: *"When a spell or ability’s effect is
performed an additional time with Repeat, choices must be made at the usual time during the Make
Relevant Choices step of Playing a Card."* And 820.2.a lets the second choice differ: *"Choices made for
the additional execution do not have to be the same as the choices made for the initial execution."*
Choosing the same unit twice is allowed and buys nothing. By the second execution it is already
stunned, and 423.1.a.1 names this very card in its example: *"They may choose a unit that's already
stunned, but if they do, Eclipse Herald will not trigger."* So the two choices are the two biggest
attackers, and each one is a trigger.

**What the stuns are worth.** 423.1.b: *"A Stunned Unit does not contribute its might to damage in the
combat damage step."* They still die only to full damage, 423.1.c: *"A Stunned Unit must still have
damage applied to it equal to, or greater than, its full might value to be killed."* So the stuns take
their two biggest out of the attacker's sum and leave them in yours to kill.

**The ready does nothing, and the +2 is the Herald's whole share.** On their turn the Herald defends
the same ready or exhausted, and he has no ability that costs an exhaust. Thwonk! alone stuns the same
two attackers. What the Herald adds to the line is +2 Might for the turn: 9 instead of 7.

## 3. Their order: B, and everything at A on their T5

Mind/Chaos under `SFD-199 Prodigal Explorer`, idle in the walk: it needs enemy units chosen twice with
their spells, and they cast none. They take B on their T2 and hold it with one Shipyard Skulker. Every
body after that goes to base, where it can reach A, 144.4.a: *"Units may move from their Base to a
Battlefield."* They attack when the bodies in base add up to more than A, and on their T5 they do:
eighteen against seventeen. That turn they spend no runes before the attack.

## 4. The turns, going first

Calm/Mind against Mind/Chaos. Your rune deck is six Calm and six Mind. Your opening four are Stalwart
Poro, Navori Scout, Eclipse Herald and Thwonk!. The draws are a second Stalwart Poro, Defy, Wizened
Elder, a second Navori Scout, and on T5 Playful Phantom. You pay no Power before T4.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base, with the 485.7 extra
                rune. All three spent.
T2      4       Poro walks to A, Conquer: +1. Navori Scout (E4) to A.     1
                All four spent.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to base. All five spent.
T3      6       Hold A: +1. Second Stalwart Poro (E2) to A. Four          2
                ready: Thwonk! is live already, without the Herald.
their T3        Hold B. A defends at ten (the two Poros at 3 with their
                Shields, the Scout 4) and their two in base make five:
                no attack. Ember Monk (E4) and a third Skulker (E3) to
                base. All seven spent.
T4      8       Hold A: +1. Eclipse Herald (E7 + 1 Calm) to A: seven      3
                tapped, one tapped Calm recycled. Curator of the Sands
                exhausts and readies two. Three ready.
their T4        Hold B. A defends at seventeen and their four in base
                make twelve: no attack. Second Ember Monk (E4) and
                second Mystic Poro (E2) to base. Three idle.
T5      9       Hold A: +1. Playful Phantom (E5) to base, for B on T6.    4
                Four ready.
their T5        Hold B. All six in base walk into A, eighteen against
                seventeen. They pass Focus. Thwonk! with its Repeat,
                four tapped: both Monks stunned, two Herald triggers,
                the Herald at 9. They pass, you pass. Their ten kill
                the Herald. Your nineteen kill all six. A stays yours.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After their T5 it is 4 to 4.

The T5 fight. Eighteen attack: two Mystic Poros (2 + 2), two Skulkers (3 + 3) and two Ember Monks
(4 + 4). Seventeen defend: the Herald 7, the Scout 4 and the two Poros at 3 with their Shields
(814.1.c). The attacker has Focus first (464.2.d) and passes, and you cast Thwonk! with it, 806.1.b:
*"Action grants the corresponding card or effect permission to be played or activated during
Showdowns, even when it is not the Controlling player's turn."* Four runes are tapped, two for the
spell and two for the Repeat (820.1.c.1). Both Monks are stunned, the Herald triggers twice, and he
defends at 9. Focus goes back to them, both players pass, and the damage step reads ten Might on their
side and nineteen on yours.

They assign first, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal
to their summed Might among the other's Units."* Ten is the Herald's nine and one more, or the Scout and
both Poros, ten exactly. They take the Herald, and the tenth point goes on a Poro, which lives. 465.2.c.4
sends it on: *"Units cannot have more damage assigned to them than the minimum required to constitute
lethal damage unless no further units remain to have damage assigned to them."* Your nineteen kill
both Monks at full Might (4 + 4), both Skulkers (3 + 3) and both Mystic Poros (2 + 2): eighteen, with
one to spare. You are the only player with units left, 466.3.a: *"A Player has won a combat if they
received either the attacker or defender designation and are the only Player that has units remaining
at this battlefield during this step."* A stays yours.

**What the line bought.** Without Thwonk! the same attack is eighteen against seventeen. They kill all
four of yours with one to spare. Your seventeen kill both Monks, both Skulkers and a Mystic Poro, and
the other Poro lives on one damage. They win A, and 466.5.d makes it a Conquer: *"Establishing Control
results in a Conquer if that player has not yet scored this Battlefield this turn."* That is 4 to 5
after their T5, with both battlefields theirs. With the line it is 4 to 4. Their base is empty, and on
T6 you hold A and send the Phantom into B against one Skulker. You spent a card and four runes, none
of them recycled, so T6 has eleven.

**What the Herald added.** Play the same Thwonk! with the Herald as a plain 7. Their ten kill him and a
Poro (7 + 3), and your seventeen kill five of the six. A Mystic Poro lives, and the combat cleanup
recalls it to base because your defenders are still there (466.1.a.2), so A stays yours either way. The
+2 was one more of theirs dead and one fewer of yours. That is everything the Herald adds, and he is a
seven-cost body you would play anyway.

**How often this T5 happens.** The Herald has to be in the first eight cards and Thwonk! in the first
nine: 4 + 4 and 4 + 5 cards of 39 (Tournament Rules 601.1.b makes the Main Deck exactly 40, and
103.2.a.1 sets the Chosen Champion aside). That is **26.8%** of games with three of each and **4.3%**
with the entry's one of each, without a mulligan. And they have to attack.

## 5. Breaks to

**The line breaks to `SFD-136 Hard Bargain`** (Chaos, E2: two runes, nothing recycled), cast out of
their eleven in response to Thwonk!. You held four and tapped all four, so you cannot pay the two.
Thwonk! is countered, and the Repeat's two stay spent, 425.1.c.1: *"This includes additional costs."*
Nothing is stunned, the Herald never triggers, and the fight is the one without the line: they take A
with a Conquer.

The reply is six runes held, to pay the two, or five and `OGN-045 Defy` (Calm, E1 + 1 Power), which
you hold. Hard Bargain is two Energy and no Power, inside Defy's *"no more than :rb_energy_4: and no
more than :rb_rune_rainbow:"*, and its own Repeat does not change that. 206: *"Effects that need to
determine a card’s cost for any purpose always use its printed or copied cost, even if that cost is
increased, decreased, or ignored as the card is played."* On T5 Defy costs the Phantom: the Elder in
its place leaves five ready. `UNL-131 Abandon` (Chaos, E2) is the same price and no payment beats
it, but it returns Thwonk! to your hand.

`OGN-095 Stupefy` (Mind, E1) is cheaper and falls short. Cast on the Herald after his triggers, it
takes him to 8, and your eighteen still kill all six, exactly. The free answer is not to attack: with
A left alone it is 4 to 4 after their T5 as well, and they keep six bodies. But they cannot see
Thwonk! in your hand, and four ready runes are all they can see.

## 6. Verdict

**Right, and the combo is Thwonk!; the Herald is its +2.** The rules reading is right: 820.1.b gives one
extra execution, 820.2.a lets it pick a second attacker, each stun fires the Herald, and the ready does
nothing. The play adds four things. The Herald is a T4 card, and Curator of the Sands, one of the
entry's sixteen legends, pays two of his runes back, so their T4 already faces one Thwonk! and their T5
the full line. The line fires only if they attack his battlefield with two or more. Here eighteen
against seventeen did, and all six died. The Herald's share was +2, worth one body each way. And four
runes held exactly lose to `SFD-136 Hard Bargain` at two.

## 7. Not verified

I did not deal the channel order. The one Power before their T5 is the Herald's Calm on T4, out of eight
runes on the board, so at least two are Calm: it fails in none of the 924 deals. The Defy reply in
section 5 needs one more Calm on their T5, and the nine runes then hold at least three: none of the 924
fail. They pay no Power. I did not walk the opponent killing the Scout and both Poros instead of the
Herald, an attack on B, a Herald played on T5, Hard Bargain with its own Repeat, a second Thwonk!, the
mulligan, T6 on, or 2v2.

## Leads

- The entry's step 5 says *"820.2.a lets you choose a different attacking unit, and 423.1.a.1 requires
  it."* 423.1.a.1 does not require it: its own example lets a player choose a unit that is already
  stunned, and then Eclipse Herald does not trigger. Choosing the same attacker twice is legal and
  wastes the Repeat.
- The entry's prerequisites ask for *"Four runes left ready through your own turn"*. With exactly four,
  `SFD-136 Hard Bargain` (E2) counters Thwonk! because you cannot pay. A fifth ready rune with
  `OGN-045 Defy` answers it, and paying instead takes six.
- The entry lists sixteen Calm legends. Under `VEN-145 Curator of the Sands` the Herald's seven readies
  two runes, so his own turn leaves three ready on T4, one Thwonk!. Played on T5 he would leave five,
  the whole line.
- The net per iteration's *"+2 Might on the Herald this turn"* is all the Herald adds: Thwonk! alone
  stuns the same two attackers. In the walk the +2 was one more of theirs dead and one fewer of yours.
