# Play — the bounce hands the Mech back, and the second stun kills it

Issue #319 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `eclipse-herald-existential-dread-repeat-bounce`**, the Calm/Chaos ENGINE in which
`UNL-134 Existential Dread` with its [Repeat] is aimed twice at the same attacking unit: the first
execution stuns it, the second finds it stunned and returns it to its owner's hand, and `OGN-059
Eclipse Herald` takes +1 for the one stun. The entry is right about the rules. Walked as a game, the
full line is live from their T5. On their T5 they attacked A with twenty-two against seventeen,
`OGN-088 Mega-Mech` among them. The bounce sends the Mech back to their hand. Spending the same Repeat
on a second stun lets your side kill the Mech, and their attack drops to ten instead of fourteen. Your
side had the Might to kill the stunned Mech, so the bounce was the wrong half of the card; the
Herald's triggers were worth one body. The line breaks to `SFD-136 Hard Bargain`, two runes, against
four runes held.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `9ea2315`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 53 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 48 (a hit on *first*), first in the list. The other entry of this slice is rank 49,
played in
[Masa stuns B, Vex takes it alone, and her Tank covers no one](2026-10-07-masa-stuns-b-vex-takes-it-alone-and-her-tank-covers-no-one.md).
The Herald's other [Repeat] line, with `SFD-040 Thwonk!`, is played in
[two stuns make the Herald nine, and all six attackers die](2026-10-07-two-stuns-make-the-herald-nine-and-all-six-attackers-die.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | Calm/Chaos (103.1.b): Unforgiven, Blade Dancer or Gloomist; here `OGN-259 Unforgiven`, idle in the walk |
| **The body** | `OGN-059 Eclipse Herald` (Calm, E7 + 1 Power, M7), at the battlefield they attack |
| **The spell** | `UNL-134 Existential Dread` (Chaos, E1 + 1 Power, [Repeat] 2 Energy), in hand, and three runes left ready through your own turn |
| **Board it wants** | an attack on the Herald's battlefield |

The card text the play turns on:

- Eclipse Herald (Calm, E7 + 1 Power, M7): *"When you stun an enemy unit, ready me and give me +1
  :rb_might: this turn."*
- Existential Dread (Chaos, E1 + 1 Power): *"[Action] (Play on your turn or in showdowns.) [Repeat]
  :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) [Stun] an attacking
  enemy unit. If it's already stunned, return it to its owner's hand instead. (A stunned unit doesn't
  deal combat damage this turn.)"*
- Mega-Mech (theirs, Mind, E7, M8): no text.
- Hard Bargain (theirs, Chaos, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) [Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.)
  Counter a spell unless its controller pays :rb_energy_2:."*

## 2. Your order: the Herald on T4, the spell on their T5

**The full line costs three runes and a recycle.** One Energy for the spell and two for the Repeat,
820.1.c.1: *"The Cost is an Additional Cost to be paid during the steps of playing the spell or
ability."* The Chaos Power comes from recycling a rune, and a rune already tapped for Energy still
recycles: 164.2.b, *"Recycle this: [Reaction] — Add [C]."*, carries no exhaust. Runes ready again only
in your own Awakening, 415.3.a: *"A player Readies all non-spell Game Objects they Control during the
Awakening Phase on their turn."* So three runes stay ready through your own turn.

**The Herald is a T4 card, and that turn leaves one rune.** Seven Energy is seven runes tapped, and
the Calm Power recycles one of them: on T4's eight runes, one stays ready. The spell alone is live
from their T3, three runes held out of six; the Herald and the full line together from their T5.

**Both targets are chosen as the spell is played.** 820.2: *"When a spell or ability’s effect is
performed an additional time with Repeat, choices must be made at the usual time during the Make
Relevant Choices step of Playing a Card."* 820.2.a lets the second choice be the same unit or another:
*"Choices made for the additional execution do not have to be the same as the choices made for the
initial execution."* Riot's example under it says the same: *"if they choose the same mode, may choose
the same target or a different one."* So the card has two modes with the Repeat paid, and they cost
the same:

- **The bounce (the entry's line).** One unit twice. The first execution stuns it and fires the
  Herald. The second finds it stunned, 423.1.a.1: *"A Stunned Unit can not be Stunned again."*, so
  the printed alternative applies and it goes back to its owner's hand. One trigger, +1.
- **Two stuns.** Two units. Each execution stuns one, and each stun fires the Herald. Two
  triggers, +2.

**What a stun is worth, and what the bounce adds to it.** 423.1.b: *"A Stunned Unit does not
contribute its might to damage in the combat damage step."* It still dies only to full damage,
423.1.c: *"A Stunned Unit must still have damage applied to it equal to, or greater than, its full
might value to be killed."* So after the first execution the target already deals nothing. The second
execution decides one thing: whether the stunned unit stays in the fight for your side to kill, or
goes back to their hand, where it cannot die. A second stun takes a second attacker's Might out of
their sum and puts +1 more on the Herald.

## 3. Their order: B, and everything at A on their T5

Mind/Chaos under `SFD-199 Prodigal Explorer`, idle in the walk: it needs enemy units chosen twice with
their spells, and they cast none. They take B on their T2 and hold it with one Shipyard Skulker. Every
body after that goes to base, where it can reach A, 144.4.a: *"Units may move from their Base to a
Battlefield."* They attack when the bodies in base add up to more than A, and on their T5 they do:
twenty-two against seventeen. That turn they spend no runes before the attack.

## 4. The turns, going first

Calm/Chaos against Mind/Chaos. Your rune deck is six Calm and six Chaos. Your opening four are Stalwart
Poro, Navori Scout, Eclipse Herald and Existential Dread. The draws are Shipyard Skulker, a second
Stalwart Poro, Mystic Poro, a second Navori Scout, and on T5 Playful Phantom. You pay no Power before
T4.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base, with the 485.7 extra
                rune. All three spent.
T2      4       Poro walks to A, Conquer: +1. Navori Scout (E4) to A.     1
                All four spent.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to base. All five spent.
T3      6       Hold A: +1. Shipyard Skulker (E3) to A. Three ready:      2
                Existential Dread is live already, without the Herald.
their T3        Hold B. A defends at ten (the Poro at 3 with its
                Shield, the Scout 4, the Skulker 3) and their two in
                base make five: no attack. Ember Monk (E4) and a third
                Skulker (E3) to base. All seven spent.
T4      8       Hold A: +1. Eclipse Herald (E7 + 1 Calm) to A: seven      3
                tapped, one tapped Calm recycled. One ready.
their T4        Hold B. A defends at seventeen and their four in base
                make twelve: no attack. Mega-Mech (E7) and a second
                Mystic Poro (E2) to base. All nine spent.
T5      9       Hold A: +1. Playful Phantom (E5) to base, for B on T6.    4
                Four ready.
their T5        Hold B. All six in base walk into A, twenty-two against
                seventeen. They pass Focus. Existential Dread with its
                Repeat, three tapped and one tapped Chaos recycled:
                the Mech and the Monk stunned, two Herald triggers, the
                Herald at 9. They pass, you pass. Their ten kill the
                Herald. Your nineteen kill the Mech, the Monk and both
                Skulkers. Both Mystic Poros are recalled. A stays yours.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After their T5 it is 4 to 4.

The T5 fight. Twenty-two attack: the Mega-Mech 8, the Ember Monk 4, two Skulkers (3 + 3) and two
Mystic Poros (2 + 2). Seventeen defend: the Herald 7, the Scout 4, the Skulker 3 and the Poro at 3 with
its Shield (814.1.c). The attacker has Focus first (464.2.d) and passes, and you cast the spell with
it, 806.1.b: *"Action grants the corresponding card or effect permission to be played or activated
during Showdowns, even when it is not the Controlling player's turn."* The two choices are the Mech
and the Monk. Both are stunned, the Herald triggers twice, and he defends at 9. Focus goes back to
them, both players pass, and the damage step reads ten Might on their side and nineteen on yours.

They assign first, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal
to their summed Might among the other's Units."* Ten is the Herald's nine and one more, or the Scout,
the Poro and the Skulker, ten exactly. They take the Herald, and the tenth point goes on the Poro,
which lives. Your nineteen kill the Mech at its full 8, the Monk at 4 and both Skulkers (3 + 3):
eighteen. The last point goes on a Mystic Poro, which lives, 465.2.c.4: *"Units cannot have more damage
assigned to them than the minimum required to constitute lethal damage unless no further units remain
to have damage assigned to them."* Both Mystic Poros are still there with your defenders, so the
cleanup recalls them, 466.1.a.2: *"Insert “3d. Recall Attackers present at the Battlefield if
Defenders are still present.”"* That is no result, 466.3.d, and A stays yours.

**The same fight with the entry's line.** The Mech twice: stunned, then back to their hand. One
trigger, the Herald at 8. Their attack is fourteen (the Monk 4, the Skulkers 3 + 3, the Mystic Poros
2 + 2), yours eighteen. Their fourteen kill the Herald, the Poro and the Skulker, 8 + 3 + 3 exactly.
Your eighteen kill all five, fourteen, with four to spare. You are the only player with units left,
466.3.a: *"A Player has won a combat if they received either the attacker or defender designation and
are the only Player that has units remaining at this battlefield during this step."* A stays yours
either way.

| After their T5 | two stuns (played) | the bounce (the entry's line) |
|---|---|---|
| Their dead | Mega-Mech, Ember Monk, two Skulkers | Ember Monk, two Skulkers, two Mystic Poros |
| Their survivors | two Mystic Poros, in base | none; the Mega-Mech in hand |
| Your dead | the Herald | the Herald, the Poro, the Skulker |
| Your survivors at A | the Scout, the Poro, the Skulker | the Scout |
| Spent | three runes, one recycled | three runes, one recycled |

The bounce takes out two more of their bodies, worth four Energy. It hands back the Mech, which costs
them seven to play again on their T6, out of twelve, and it costs you two bodies more. The two stuns
kill the Mech outright. What decides it is the 8 the stunned Mech needs: with two stuns your side has
nineteen and spends eight of it on the Mech; with the bounce the Mech never needs killing, but their
side keeps four more Might and kills two more of yours.

**What the Repeat added.** Without it the spell is one Energy and one Power: the Mech stunned, the
Herald at 8, their fourteen against your eighteen. Your eighteen kill the Mech, the Monk and both
Skulkers, eighteen exactly; their fourteen kill the Herald, the Poro and the Skulker. The Repeat's two
Energy, spent on the Monk, saved the Poro and the Skulker. Spent on the bounce, it bought nothing over
the single stun but the Mech's trip to their hand, and it cost the Mech's death.

**What the Herald added.** Play the two stuns with the Herald as a plain 7: their ten kill him and the
Poro, 7 + 3 exactly. Your seventeen kill the Mech, the Monk and a Skulker (8 + 4 + 3), and the last two
kill a Mystic Poro; the other Skulker and Mystic Poro are recalled. The +2 was the Poro saved and the
second Skulker dead instead of a Mystic Poro: one body each way. The Mech dies either way.

**When the bounce is the right mode.** The bounce beats a second stun only when the stunned unit would
live anyway: when your side cannot spare its full Might, and no second attacker is worth stunning. The
Herald pays per stun, and the bounce is the mode with one stun. And a token is
different, 186.1: *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist
immediately after moving to its new zone."* A bounced token is removed for good, whatever its Might.

**How often this T5 happens.** The Herald has to be in the first eight cards and the spell in the
first nine: 4 + 4 and 4 + 5 cards of 39 (Tournament Rules 601.1.b makes the Main Deck exactly 40, and
103.2.a.1 sets the Chosen Champion aside). That is **26.8%** of games with three of each and **4.3%**
with the entry's one of each, without a mulligan. And they have to attack the Herald's battlefield.

## 5. Breaks to

**The line breaks to `SFD-136 Hard Bargain`** (Chaos, E2: two runes, nothing recycled), cast out of
their eleven in response to the spell. You held four and tapped three, so you cannot pay the two. The
spell is countered, and the Repeat's two stay spent, 425.1.c.1: *"This includes additional costs."*
Nothing is stunned, the Herald never triggers, and the fight is twenty-two against seventeen. They kill
all four of yours, seventeen with five to spare. Your seventeen kill the Mech, the Monk, a Skulker and
a Mystic Poro, 8 + 4 + 3 + 2. They keep a Skulker and a Mystic Poro, win A, and 466.5.d makes it a
Conquer: *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield
this turn."* That is 4 to 5 after their T5, with both battlefields theirs.

The reply is five runes held, to pay the two, which on T5 means the Phantom stays in hand. Or skip
the Repeat: the single stun taps one rune, and
three ready pay Hard Bargain's two. That fight is the one priced above, the Mech dead and three of yours
with it.

## 6. Verdict

**Right about the rules, and the bounce was the wrong mode in the fight.** 820.2.a lets the Repeat
choose the same unit, 423.1.a.1 stops the second stun, and the printed alternative returns the unit to
its owner's hand; the Herald triggers once. The play adds four things. The Herald is a T4 card, so the
full line is live from their T5, three runes held. In the walked fight the same three runes spent on
two different attackers killed the Mega-Mech that the bounce would have handed back, and lost one body
instead of three. The Herald pays per stun, so the bounce gives him +1 where two stuns give +2; in the
walk that was one body each way. And three runes plus one lose to `SFD-136 Hard Bargain` at two.

## 7. Not verified

I did not deal the channel order. The one Power before their T5 is the Herald's Calm on T4, out of
eight runes on the board, so at least two are Calm: it fails in none of the 924 deals. The spell's
Chaos Power on their T5 is one Chaos among the nine runes on the board, the first ten channeled less the
recycled Calm: none of the 924 fail. The spell live on their T3 needs one Chaos in the first six: it fails in 1 of the 924,
the deal whose first six are all Calm. They pay no Power. I did not walk the opponent killing the
Scout, the Poro and the Skulker instead of the Herald, an attack on B, Hard Bargain with its own Repeat,
a second Existential Dread, `OGN-259 Unforgiven` moving the Herald, the mulligan, T6 on, or 2v2.

## Leads

- The entry's notable says *"WHY THE BOUNCE BEATS THE STUN OUTRIGHT"*. Against a single stun it holds,
  since the stun lasts one turn and the bounce makes them pay again. Against a second stun from the
  same Repeat it does not, whenever your side can kill the stunned unit: in the walk two stuns killed
  the Mega-Mech and lost one body, and the bounce returned the Mech and lost three. The bounce gains
  only on a unit that would survive the stun, or on a token (186.1).
- The Herald pays per stun, and the bounce is the mode with one stun: in the walk two stuns gave him
  +2 and the bounce +1. The entry's pairing puts the Herald on the mode that triggers him least.
- The entry's prerequisites ask for *"Three Energy and 1 Chaos Power off runes held ready"*. With
  exactly four held, `SFD-136 Hard Bargain` (E2) counters it, since you cannot pay. Five held, or the
  single stun with three, pays.
- Not in the entry: a bounced token ceases to exist (186.1), so on an attacking token the line is hard
  removal at any Might.
