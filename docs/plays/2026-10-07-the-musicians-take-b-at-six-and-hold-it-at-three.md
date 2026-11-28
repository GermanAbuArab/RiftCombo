# Play — the Musicians take B at six and hold it at three

Issue #311 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `field-musicians-fiora-worthy-self-pump-arrival`**, the Calm/Order ENGINE in which
`VEN-026 Field Musicians` give themselves +3 Might as they are played, which makes them Mighty, and
`SFD-180 Fiora, Worthy` readies them for one Order Power, so they move the turn they land. The entry is
right about the rule: 359.2 puts the body on the board before its own trigger chooses, and Riot's worked
example at 710 is this card's effect with these numbers. Walked as a game, the line takes the
opponent's battlefield on T3, a turn before any body played that turn could reach it, at six Might
against a garrison of five. That is the only place the line does anything. A battlefield you already
control needs no Fiora, because 355.2.a lets you play the Musicians straight onto it. So the walk goes
to a battlefield you do not control, by T3 that is the opponent's, and the +3 is what wins the fight
there. The price comes on their turn: the Musicians hold B at
three, and the opponent takes it back. Net, the line bought one point, and three of their bodies for
one of yours. What breaks it is `VEN-052 Mesmerize`, one rune, cast in the combat after Fiora's Power
is already paid.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b2bea92`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 61 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 38 (a hit on *before*), first in the list. Rank 39 already has a play. The other entry of
this slice is rank 40, played in
[the Undertitan comes ready, and they kill Rek'Sai](2026-10-07-the-undertitan-comes-ready-and-they-kill-reksai.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Calm/Order legend (103.1.b); here `OGN-261 Radiant Dawn`, idle in the walk because nothing in the list stuns |
| **First** | Fiora, Worthy on the board, and one Order rune among your runes |
| **Then** | Field Musicians in hand and four Energy |
| **Target** | a battlefield you do not control |

The card text the play turns on:

- Field Musicians (Calm, E4, M3): *"When you play me, give a unit +3 :rb_might: this turn."*
- Fiora, Worthy (Order, E3, M3): *"When a unit you control becomes [Mighty], you may pay :rb_rune_order: to
  ready it. (A unit is Mighty while it has 5+ :rb_might:.)"*
- Ancient Warmonger (theirs, Chaos, E5, M4): *"[Accelerate] (You may pay :rb_energy_1::rb_rune_chaos: as
  an additional cost to have me enter ready.) I have [Assault] equal to the number of enemy units here.
  (+1 :rb_might: while I'm an attacker for each instance of Assault.)"*
- Mesmerize (theirs, Mind, E1 + 1 Power): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Choose one — • Return a friendly unit to its owner's hand. • Give an enemy unit -2
  :rb_might: this turn."*

## 2. Your order: cross, pay, walk

359.2: *"A Permanent leaves the Chain and becomes a Game Object."* 359.2.b then runs the card's text, and
the trigger's choice waits for the trigger, 355.5.b: *"The target will be chosen when the ability
triggers."* So the Musicians are on the board when their own trigger chooses, and they can choose
themselves. Riot's numbers at 710 are the rest: *"As that spell resolves, its Might changes from 3 to 6,
and it becomes Mighty. When that effect expires at the end of the turn, it will no longer be Mighty."*

Fiora's trigger then asks for the Power before the opponent can act on it. 383.3.e.2.a: *"During
finalization of the Triggered Ability, the player who controls the Triggered Ability may choose to
perform it."* 204.3.a: *"It must be paid to finalize the triggered ability."* The ready itself is 415.1:
*"Readying is an action that marks a non-spell Game Object on the board as available for action."*
Without it the Musicians would wait a turn, 143.4: *"Units enter the Board exhausted."* The Order Power
is a rune recycled, so it goes to the bottom of the Rune Deck (161.2.b, 416.1) and the board is one rune
smaller next turn.

**Where the Musicians walk decides whether Fiora did anything.** 355.2.a: *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."* A battlefield you control is
reached by playing the Musicians there, and the ready buys nothing. From there, with no [Ganking], the
only Standard Move left is home, 144.4.b: *"Units may move from a Battlefield to their Base."* So Fiora's
ready matters only for Musicians played to base and sent to a battlefield you do not control, 144.4.a:
*"Units may move from their Base to a Battlefield."* In a duel, by T3 that battlefield is the
opponent's, so the walk is an attack. The six Might is what fights.

**The six lasts through the combat and no longer.** The Expiration Step heals before it expires:
317.2.b inserts *"3c. Heal all Units."* and 317.2.c inserts *"3d. All ‘this turn’ effects expire
simultaneously."* Musicians that took five in the combat are healed at three and live. On the
opponent's turn they are a 3-Might body alone at the battlefield they took.

## 3. Their order: B, then B again

Mind/Chaos with `SFD-199 Prodigal Explorer`, idle in the walk. They take B on their T2 with Mystic Poro
and put Shipyard Skulker beside it, five Might, and spend all five of their runes. So on your T3 they
can answer nothing. On their T3 they take B back. Ancient Warmonger costs six Energy and one Chaos rune
recycled with its own [Accelerate], enters ready, and walks in with Traveling Merchant.

## 4. The turns, going first

Calm/Order against Mind/Chaos. Your rune deck is six Calm and six Order. This list runs three Fioras,
two more than the entry declares, because she has to be drawn; the cost of one copy is priced below.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base                                  0
their T1        Mystic Poro to base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Fiora, Worthy (E3) to A,    1
                one idle.
their T2        Mystic Poro walks to B, Conquer. Shipyard Skulker (E3)
                to B, Traveling Merchant (E2) to base. All five runes
                spent. B defends at five.
T3      6       Hold A: +1. Trusty Ramhound (E2) to A. Field Musicians    3
                (E4) to base, and their trigger names them: 3 to 6,
                Mighty. Fiora's trigger: one Order rune recycled, five
                runes left. The Musicians walk to B: six against five.
                Both defenders die, the Musicians live. Conquer: +1.
their T3        No Hold. Ancient Warmonger (E5) with [Accelerate]
                (E1 + 1 Chaos) to base: six tapped, one recycled, one
                idle. It walks to B with the Merchant: seven against
                three. The Musicians die and take the Merchant with
                them. Conquer.
T4      7       Hold A: +1. No second Musicians. Sunlit Guardian (E3)     4
                to A, Vanguard Sergeant (E4) to base.
their T4        Hold B. Shipyard Skulker and Mystic Poro to B, three
                idle.
```

Their points: 1 on T2, 2 on T3 from the reconquest, 3 on T4. The opponent was never idle. They took B,
spent their T3 taking it back, and rebuilt it on T4.

The T3 fight. The attacker assigns first (465.2.c), and 465.2.c.3 reads *"Units must have lethal damage
assigned to them in full before damage is assigned to a different Unit."* Two kill the Poro and three
the Skulker, with one to spare. Their five land on a 6-Might body, which lives. 466.3.a: *"A Player has
won a combat if they received either the attacker or defender designation and are the only Player that
has units remaining at this battlefield during this step."* B is yours, and it is a Conquer. The
Ramhound at A is three, because it has another unit there.

Their T3 fight. The Warmonger counts one enemy unit at B, so it attacks at five, and the Merchant at two
(its move trigger discards one and draws one). Seven against three. The Musicians' three go where they
kill something: two on the Merchant, one on the Warmonger. They had a cheaper way in. `OGN-169 Gust`
(Chaos, E1) reads *"Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* For
one Energy and no Power, B is empty and the Merchant walks in. The body that won at six is a three on
every turn except yours.

**What the line bought.** On their T3 the opponent scores either way: a Conquer instead of a Hold. So
the point the line made is yours alone. After their T4 the score is 4 to 3, where the same turns
without Fiora (the Musicians played to A on T3) give 3 to 3. From T4 each side holds one battlefield,
which is the race the unopposed clock prices with you a point ahead. The trade was Mystic Poro, the
Skulker and the Merchant for the Musicians. The rune it cost is the one T4 was missing: seven runes, not
eight.

**What the line needs in hand.** Fiora on the board by T3 means Fiora in the first six cards (the
opening four, then the T1 and T2 draws). With the entry's single copy that is 6 of 39, **15.4%**, and
Fiora with a Musicians in the first seven is **6.3%** of games, without a mulligan. Three Fioras make it
40.3% and 16.9%. A second Musicians by T4 is 10.1%, which is why T4 has none.

## 5. Breaks to

**The line breaks to `VEN-052 Mesmerize`** (Mind, E1 + 1 Power: one rune, tapped for the Energy and then
recycled for the Power), held on their T2 in place of the Merchant and cast in the combat at B. A
combat opens with a showdown (344.1), and a [Reaction] can be played there. Minus two makes the Musicians
four against five. Their five kill the Musicians. Your four kill the Skulker, and the Mystic Poro takes
the last one and lives. They keep B. Fiora's Order rune was paid when her trigger finalized, before
they acted (383.3.e.2.a). You paid four Energy, a card and a rune of growth. They paid one rune and the
Skulker, and kept the battlefield.

They can cast it earlier, in response to the Musicians' own trigger. Then the Musicians go to one,
the +3 lands them on four, and 709 never sees a crossing: it counts one only *"at the moment its Might
changes from being less than 5 to being 5 or greater"*. Fiora does not trigger and her rune is never
paid. The combat timing is the better one for them, because it also costs you that rune and kills the
Musicians.

The reply is `OGN-045 Defy` (Calm, E1 + 1 Power: one rune), *"Counter a spell that costs no more than
:rb_energy_4: and no more than :rb_rune_rainbow:."* Mesmerize is one and one. Holding Defy on T3 costs
the Ramhound, because six runes pay the Musicians and Defy and leave one, and it costs a second rune of
growth. A second answer from them, at one rune more, wins the exchange.

## 6. Verdict

**Right, and it takes the other battlefield a turn early, but only as an attack, and only for a turn.**
The rules reading is right. The Musicians choose themselves, cross at six, and Fiora's ready walks them
the turn they land. The play adds three things. The arrival is worth something only at a battlefield you
do not control, because 355.2.a reaches every one you do, so the Might is the payload and not the
transport. The expiry hands the battlefield back: the conqueror holds it at three on their turn, and
three is what a seven-Might reconquest or a one-Energy Gust beats. And the cheapest answer comes after
Fiora is paid, because her Power is due at finalization and the combat is later.

## 7. Not verified

I did not deal the channel order; one Order rune among six from six Calm and six Order fails once in
924 deals. I did not walk removal on Fiora at A on their T2, Gust in place of the Warmonger, or
`UNL-134 Existential Dread` in the combat, which stuns the Musicians instead and leaves both sides with
units at B. I did not walk T5 on, the mulligan, or 2v2.

## Leads

- The entry's notable says *"THE POINT IS ARRIVAL, NOT MIGHT, AND THE MIGHT EXPIRING COSTS NOTHING"*,
  and that *"the Might was only ever transport"*. To a battlefield you control the Musicians need no
  Fiora, because 355.2.a lets you play them there. To one you do not control the arrival is an attack,
  and the +3 is what wins it. The expiry costs the battlefield on the opponent's turn: in the walk the
  Musicians hold B at three and die to the reconquest.
- The net per iteration, *"one body delivered to a battlefield on the turn it was played"*, should say
  a battlefield you do not control.
- The entry says Fiora at *"One copy is enough"*. That is true on the board, where one trigger sees every
  crossing. In a game she has to be drawn: one copy is in the first six cards 15.4% of the time, and with
  a Musicians by T3 in 6.3% of games. Three copies make it 16.9%.
- The entry names no answer. `VEN-052 Mesmerize` (one rune) in the combat leaves the Musicians at four
  against five, after Fiora's Power is paid. Cast in response to the Musicians' trigger, it stops the
  crossing (709).
