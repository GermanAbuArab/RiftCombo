# Play — Two XP on T2 kept Kha'Zix alive and moved no point, and T2 is the last turn their answers are all in hand

Issue #393 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mindsplitter-insightful-investigator-hand-attack`**, the Chaos ENGINE that pairs two hand
attacks: `UNL-135 Insightful Investigator` (E3) reveals an opponent's hand and, for 2 XP, swaps a card
of it for a draw, and `OGN-192 Mindsplitter` (E7 + 2 Chaos Power) reveals it again and strips a card
with no replacement. The entry is right about the rules. Riot's own example under 383.3.b is this
card, and the 2 XP is paid on resolution, after you have seen the hand. Walked as a game, going first,
with `UNL-201 Voidreaver` against a Body/Order Garen deck, the Investigator's swap on T2 took the
`OGN-229 Vengeance` that would have killed your Chosen Champion `UNL-119 Kha'Zix, Evolving Hunter` on
their T3. Mindsplitter on T4 then took the `OGS-016 Vanguard Attendant` that could still trade with
him. **3 to 3** after their T4. Without the swap the score is the same, **3 to 3**: Vengeance kills
Kha'Zix, and your battlefield is never at stake by their T4 whatever you do. So the hand attack bought a
body, not a point. The swap's 2 XP is paid back by T5, by the Hunt of the champion it kept alive. The
timing is the finding: going first, **your T2 is the last turn their answers are all in their hand.**
From their T2 they control a battlefield, and a card with [Hidden] can go where no hand attack
reaches; Mindsplitter, on T4, comes two such turns too late. The cheapest answers are three cards that
each cost them two runes on their T1, one Order recycled, and kill your `UNL-127 Mister Root` in base
before it can move; without its 2 XP the Investigator only looks. The one named here is `VEN-131 Decree
of Unity`, because the same card kills Mindsplitter.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `89c173a`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 21 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 80, the first in the list. The
other entry of this slice is rank 81, `keeper-of-law-royal-guard-exact-two`, played in
[The Guard's pair has to walk out of base, and one answer is not enough to stop the Keeper's discount](2026-10-18-the-guards-pair-has-to-walk-out-of-base-and-one-answer-is-not-enough-to-stop-the-keepers-discount.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-201 Voidreaver` (Body/Chaos, tag Kha'Zix) |
| **Chosen Champion** | `UNL-119 Kha'Zix, Evolving Hunter` (Body, E5 + 1 Body Power, M5) |
| **The XP** | `UNL-127 Mister Root` (Chaos, E2, M1) |
| **The swap** | `UNL-135 Insightful Investigator` (Chaos, E3, M3) |
| **The strip** | `OGN-192 Mindsplitter` (Chaos, E7 + 2 Chaos Power, M7) |

The entry admits any of sixteen legends with Chaos in their pair. Voidreaver is the one for this walk,
because it is the XP legend of the sixteen: *"When you win a combat, gain 1 XP. Spend 1 XP,
:rb_exhaust:: [Buff] a unit. Spend 2 XP, :rb_exhaust:: Move an exhausted friendly unit from a
battlefield to its base."* So the 2 XP the Investigator spends has other buyers in the same deck, which
is the question the entry's notable raises. Voidreaver is tagged Kha'Zix, and Kha'Zix, Evolving Hunter
is a unit tagged Kha'Zix and The Void, not a Signature card (`signature` in `data/cards.json`). So he
can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the
tag on your Champion Legend."* He starts in the Champion Zone, 103.2.a.1: *"This will be placed in the
Champion Zone at the start of the game."* And he is playable from there, 419.1.a: *"By default, a
player can only Play cards from their hand or their Chosen Champion zone."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card, and none is in `data/legality.src.json` or marked
[BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Insightful Investigator: *"When you play me, choose an opponent. They reveal their hand. You may pay
  2 XP to choose a card from their hand. If you do, they discard that card and draw 1."*
- Mindsplitter: *"When you play me, choose an opponent. They reveal their hand. Choose a card from it,
  and they discard that card."*
- Mister Root: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_chaos: as an additional cost to have
  me enter ready.) When I move to a battlefield, gain 2 XP."*
- Kha'Zix, Evolving Hunter: *"[Hunt] (When I conquer or hold, gain 1 XP.) When I attack, you may spend
  3 XP to deal damage equal to my Might to an enemy unit here."*

## 2. What the two triggers do, and what they cannot see

**The 2 XP is paid after you have seen the hand.** Riot's example under 383.3.b is this card: *"The
“pay 2 XP” is a cost within instructions, but because it does not appear in the first part of the
effect, it is not taken as the base cost of the triggered ability. Paying 2 XP is performed on
resolution."* So the reveal comes first and is free either way, 424.1: *"Revealing is the act of
presenting a card to all players from a zone that one or more players do not have access to the
information of."* And 424.1.a: *"Revealed is a temporary state and is not a zone."*

**XP is spent from one pool.** 730.2: *"To Spend XP, reduce the value of XP marked on the Player
spending it."* And the opponent sees how much you have, 729.2: *"The amount of XP a Player has is
Public Information."* The entry's notable is that spending can switch off a Level ability, 824.1.d:
*"The Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP."* No
Body or Chaos card carries [Level 3]; the lowest threshold in those domains is [Level 6] (`UNL-091
Concentrate`, `UNL-094 Gemhand Hunter`, `UNL-113 Master Yi, Tempered`). At 2 XP nothing is on, so on T2
the swap switches off nothing.

**A discard is not a play.** 422.1: *"Discarding a card is moving it from a player's hand directly into
their trash without activating or executing its normal rules text."* The Investigator's victim is
replaced by the top card of their deck; Mindsplitter's is not.

**What a hand attack cannot reach.** It chooses *"a card from their hand"*. Their Chosen Champion is
not in it: it sits in the Champion Zone from the start (103.2.a.1). Nor is a hidden card, which waits
facedown at a battlefield, 811.1.b: *"While this card is in your hand or in your Champion Zone on your
turn during an Open State, you may pay [A] to hide this facedown at a battlefield you control that
doesn't already have a facedown card hidden there for as long as you control that battlefield.
Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."* To
hide, they must control a battlefield, on their own turn. Going second, they control none on their T1.
So on your T2 every card they hold is in their hand, and from their T2 on it need not be.

**The XP has to come from somewhere by T2.** The Chaos cards that gain XP are Mister Root (2, when it
moves to a battlefield), `UNL-129 Vicious Snapjaws` (1, when another friendly unit dies), `UNL-136
Scryer's Bloom` (1, by killing the gear) and `UNL-143 Kha'Zix, Mutating Horror` (2, when he attacks or
defends against a lone enemy). Only Root banks 2 before a T2 Investigator going first: played on T1, it
moves on T2, 144.4.a: *"Units may move from their Base to a Battlefield."* The Mutating Horror is four
runes, which is all of T2.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4, less any recycled. Power is paid
by recycling a rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune you exhausted for Energy can
be recycled for the Power, and it leaves your board. Kha'Zix is five runes with a Body one recycled;
Mindsplitter is seven with two Chaos ones recycled. So Mindsplitter is a T4 card at the earliest.

## 3. Their deck: Body/Order Garen

`OGS-023 Might of Demacia - Starter` (Body/Order): *"When you conquer, if you have 4+ units at that
battlefield, draw 2."* It never fires in the walk. Its Chosen Champion is `OGS-013 Garen, Commander`
(Order, E6 + 1 Order Power, M5): *"Other friendly units have +1 :rb_might: here."* Their bodies are
`UNL-097 Kinkou Initiate` (Body, E3, M3; *"When you play me, draw 1 if your other units have total
Might 5 or more."*), `VEN-076 Repair Specialist` (Body, E3, M3; *"I have [Assault] equal to the number
of gear you control."*, and they have no gear), `SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you
have another unit here, I have +1 :rb_might:."*) and Vanguard Attendant (Order, E6 + 1 Order Power, M5;
*"I enter ready."*). Their removal is Vengeance (Order, E4 + 2 Order Power): *"Kill a unit."* No
location clause, so it reaches a unit anywhere. Going second, they channel an extra rune on T1, 485.7:
*"The player going second channels an extra Rune from their Rune Deck during their first Channel Phase
of the game."* §5 names their other answers.

## 4. The turns, going first

Body/Chaos against Body/Order. Your battlefield is A, `OGN-277 Back-Alley Bar` (*"When a unit moves
from here, give it +1 :rb_might: this turn."*); theirs is B, `SFD-221 Veiled Temple` (*"When you
conquer here, you may ready a friendly gear. If it's an Equipment, you may detach it."*). Nothing in the
walk uses either. Your opening four are Mister Root, Insightful Investigator, Mindsplitter and Vicious
Snapjaws. Your draws are `SFD-130 Treasure Hunter` (T1), `UNL-126 Megatusk` (T2), Concentrate (T3) and
`UNL-098 Targonian Visionary` (T4). Their opening four are Kinkou Initiate, Repair Specialist, Trusty
Ramhound and Vengeance. The top of their deck is Vanguard Attendant, `OGN-210 Daring Poro`, `OGN-136
Pit Rookie`, `UNL-102 Crowd Favorite` and `OGN-216 Soaring Scout`, in that order.

```
turn    runes   your turn                                                 points  XP
T1      2       Mister Root (E2) to base. None left.                      0       0
their T1  3     Kinkou Initiate (E3) to base. None left.
T2      4       Root walks to A, Conquer: +1, and 2 XP. Insightful        1       0
                Investigator (E3) to A: their hand is revealed; pay 2
                XP, Vengeance is discarded, they draw Daring Poro. One
                left.
their T2  5     The Initiate walks to B, Conquer. Repair Specialist (E3)
                and Trusty Ramhound (E2) to B. None left.
T3      6       Hold A: +1. Kha'Zix (E5 + 1 Body Power) from the          2       0
                Champion Zone to A. Six runes, one recycled; one left.
their T3  7     Hold B. Garen, Commander (E6 + 1 Order Power) from the
                Champion Zone to B: the Initiate, the Specialist and
                the Ramhound are 4s. Seven runes, one recycled; one
                left.
T4      7       Hold A: +1, and Kha'Zix's Hunt: 1 XP. Mindsplitter (E7   3       1
                + 2 Chaos Power) to A: their hand is revealed; the
                Attendant is discarded. Seven runes, two recycled;
                none left.
their T4  8     Hold B. Daring Poro (E2), Pit Rookie (E2) and Crowd
                Favorite (E3) to B. Eight runes; one left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after Root; 5, then 4 after the Investigator; 5 after
the T3 draw, still 5 after Kha'Zix, who comes from the Champion Zone; 6 after the T4 draw, 5 after
Mindsplitter (Vicious Snapjaws, Treasure Hunter, Megatusk, Concentrate, Targonian Visionary). Theirs: 5
after the T1 draw (the Attendant), 4 after the Initiate; still 4 after the swap (Vengeance out, Daring
Poro in); 5 after the T2 draw (Pit Rookie), 3 after the Specialist and the Ramhound; 4 after the T3 draw
(Crowd Favorite), still 4 after Garen; 3 after Mindsplitter; 4 after the T4 draw (Soaring Scout), 1
after the Poro, the Rookie and the Favorite.

**Your T2: the XP, then the swap.** Root entered exhausted on T1, 143.4: *"Units enter the Board
exhausted."* It is ready on T2, 315.1.b: *"1. The Turn Player readies all Game Objects they control
that are able to be readied."* It walks into A, which is empty, 316.8.b.1: *"Showdowns that occur as a
result of a player moving to an empty Battlefield are a stand-alone Phase and do not create a
Combat."* Its trigger gives you 2 XP, and you establish control: a Conquer, 466.5.d: *"Establishing
Control results in a Conquer if that player has not yet scored this Battlefield this turn."* The
Investigator goes to A, which you now control, 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* There it matters: A is 1 + 3 = 4, and
their Initiate is a 3. In base, A would be Root alone, and the Initiate would take it on their T2.

Their hand is revealed: Repair Specialist, Trusty Ramhound, Vengeance and Vanguard Attendant. The choice
is Vengeance. It kills Kha'Zix anywhere, on their own turn, and spends no body. The Attendant can only
kill him by attacking into A and dying there. You pay the 2 XP; Vengeance goes to their trash, and they
draw the Poro, which was to be their T2 draw. They have no ready rune to answer the trigger with: the
Initiate took all three of their T1.

**Their T2: they build at B.** The Initiate takes B, which is empty. The Specialist and the Ramhound go
to B. There the Ramhound is a 3, and B is 9.

**Your T3: Kha'Zix to A.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they
did not yet Score this turn during their Beginning Phase."* Kha'Zix goes to A, which is now 1 + 3 + 5 =
9. In base he would be safe from removal that says *"at a battlefield"*, but A would be 4 again, and
his Hunt would not fire on your T4 Hold. One rune is left, and nothing in your hand costs one.

**Their T3: Garen.** They Hold B, and Garen goes there: Garen 5, and the Initiate, the Specialist and
the Ramhound 4 each, 17. Their units at B cannot reach A: a unit at a battlefield moves only to its
base, 144.4.b: *"Units may move from a Battlefield to their Base."* Garen enters exhausted (143.4). One
rune is left, and their cheapest card in hand costs two.

**Your T4: the strip.** Your runes are 5 + 2 channelled = 7. You Hold A, and Kha'Zix's Hunt gives 1 XP,
823.1.c.1: *"Hunt is functionally short for: “When I Conquer or Hold, my controller gains X XP.”"*
Mindsplitter takes all seven, two Chaos ones recycled. Their hand is revealed: Vanguard Attendant, Daring
Poro, Pit Rookie and Crowd Favorite. Garen, on the board, was never in it. The choice is the Attendant,
the one card of the four that enters ready and so can reach A this turn. Into A it is 5 against 16, and
it dies; but the attacker assigns first, 465.2.c: *"Starting with the Attacker, each player assigns an
amount of damage equal to their summed Might among the other's Units."* And it may give its 5 to
Kha'Zix first, 465.2.c.3: *"Units must have lethal damage assigned to them in full before damage is
assigned to a different Unit."* So the strip took the last card in their hand that could trade for him.

**Their T4.** They Hold B. The Poro, the Rookie and the Favorite go to B, and all three enter
exhausted. Nothing of theirs reaches A. **3 to 3.**

**Without the swap.** You play the Investigator, see the same hand, and keep the 2 XP. Their T2 is the
same. On their T3 they Hold B and cast Vengeance on Kha'Zix: four runes, two Order ones recycled. With
the three ready runes left the Poro goes to base. On your T4 you Hold A (no Hunt: Kha'Zix is dead) and
Mindsplitter takes the Attendant, the only card left with the Pit Rookie. On their T4 they Hold B and
play Garen; the Poro, in base, stays there, 3 against 11 at A. **3 to 3** again. Without Mindsplitter
too, your seven T4 runes put Vicious Snapjaws and Treasure Hunter at A, which is then 1 + 3 + 5 + 1 =
10; the Attendant and the Poro walking in are 5 + 3 = 8, since the Poro's [Assault] adds 1 only while it
attacks. They do not take A. **On this board your battlefield was never at stake by their T4.** What the
swap decided is Kha'Zix.

**What the 2 XP cost.** With the swap you have 0 XP after T2 and 1 after T4. Without it, 2, and still 2
after T4, because the Hunt that pays 1 a Hold died with Kha'Zix. On your T5 Hold the swap line reaches
2 as well, and passes the other line after that. Nothing else wanted the 2 XP by T4: Kha'Zix's strike
needs 3 and an attack, Voidreaver's Buff needs a target worth it, and no [Level 6] is near.

**Their other T3: the Attendant into A.** After the swap their seven runes can pay for Vanguard
Attendant instead of Garen. It enters ready and walks into A: 5 against 9. They assign the 5 to Kha'Zix,
and your 9 kill the Attendant. Both die, A stays yours, and they Hold B: **2 to 2** after their T3, the
same as the walk. On your T4 Mindsplitter reveals the Poro, the Rookie and the Favorite, and takes the
Favorite. Their T4 is Garen to B: **3 to 3**. In this line the 2 XP did not save Kha'Zix. It made them
pay a 6-drop body for him instead of a 4-Energy spell. Garen to B leaves B at 17; the Attendant trade
leaves it at 9.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Kha'Zix is in every
game under Voidreaver. Going first, you have seen **5** cards by T1, **6** by T2 and **8** by T4. With
three copies of each (103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."*),
Mister Root by T1 is **34.52%**, the Investigator by T2 **40.30%**, and Mindsplitter by T4 **50.82%**.
Root on T1 and the Investigator on T2 together, which the paid swap needs, is **12.41%**; all three,
**5.36%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T2 it took the one card in their hand that kills
Kha'Zix wherever he stands, and he held A on your T4 for 1 XP. The predicate is: does a card of theirs
stop that, either by denying the 2 XP before your T2, or by killing Kha'Zix at A before your T4 Hold
anyway?

**The scope.** A Body/Order deck plays only Body, Order and Body/Order cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Might of Demacia's tag is Garen. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
not a Signature card with another champion's tag. Folded by name, that is **255** cards. **58** of them
have *kill*, *deal N*, *banish*, *return* or *stun* in their text.

**Before your T2: kill Mister Root in base.** On their T1 they have three runes and control no
battlefield, and Root is in your base. Of the 58, **27** cost three runes or fewer. Each was read; most
reach only a unit *"at a battlefield"*, *"here"* or *"in combat"*, or a friendly unit, or a gear.
**Three reach Root:**

- **`VEN-131 Decree of Unity`** (Order, E2 + 1 Order Power): *"Kill an enemy Chaos (:rb_rune_chaos:)
  unit or gear."* Root is Chaos. **Two runes, one Order recycled: the cheapest answer, tied with the two below, and the one named
  because it also kills Mindsplitter.**
- `VEN-127 Lacerate` (Order, E2 + 1 Order Power): *"Choose a unit. If it's [Empowered], disempower it.
  Then kill it if it has 3 :rb_might: or less."* Root is a 1.
- `OGN-209 Cull the Weak` (Order, E2 + 1 Order Power): *"Each player kills one of their units."* On
  their T1 Root is your only unit, and they have none to lose.

Any of the three leaves you no XP on T2. The Investigator still reveals their hand, but cannot take the
Vengeance, and Kha'Zix dies on their T3 as in the line without the swap. It is not free for them. It
costs one of their three runes for good, and their T1 Initiate, so B is not theirs on their T2 either.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune and then only the
Channel Phase's two a turn (315.3.b), each rune they recycle is a rune short on every turn through their T5,
until their Rune Deck runs dry (161.2.a); a card that channels more (430.2) brings it back sooner. The walk
ends after their T4, so the count stands for every turn it covers. The wording above is kept as history.]
And A is not yours on your T2: nothing of yours can move there.

**On your T2, in answer to the trigger.** While it is on the chain the turn is closed, 309.1: *"If a
Chain exists, the turn is in a Closed State."* Only [Reaction] plays there, 813.1.c.1: *"This can be
played during Closed States on any player's turn."* Vengeance has no [Reaction]. And the walk leaves
them no ready rune: the Initiate took all three on their T1.

**Before your T4: a second answer to Kha'Zix.** On their T3 they have seven runes. Of the 58, **four**
kill a 5-Might unit at a battlefield within that budget:

- **`OGN-213 Hidden Blade`** (Order, E2 + 1 Order Power): *"[Hidden] (Hide now for :rb_rune_rainbow:
  to react with later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Kill a unit at
  a battlefield. Its controller draws 2."* Two runes, one Order recycled, and you draw 2.
- A second Vengeance, four runes.
- `SFD-164 Drag Under` (Order, E5 + 1 Order Power) and `OGS-012 Blast of Power` (Order, E6 + 1 Order
  Power): *"Kill a unit at a battlefield."* Five and six runes.

`VEN-131 Decree of Unity` does not reach him: Kha'Zix, Evolving Hunter is Body. The swap draws them a
card, and it can be one of these: §7 counts how often.

**And the answer to the strip: hide it.** Hidden Blade in hand on your T2 would be revealed, and the
Investigator takes one card. With Vengeance and Hidden Blade both there, one of them stays, and Kha'Zix
dies on their T3. Hidden Blade in hand on your T4 is a different matter: on their T2 and T3 they
controlled B, so they could already have hidden it there (811.1.b), for one rune recycled. Mindsplitter
cannot see a hidden card. **Seven** of the 255 have [Hidden]: Hidden Blade, `OGN-220 Facebreaker`,
`SFD-111 Here to Help`, `SFD-154 Guards!`, `VEN-117 Disciple of Shen`,
`VEN-135 Kennen, Keeper of Balance` and `OGN-135 Pakaa Cub`.

**And Mindsplitter itself is Chaos.** Decree of Unity kills it anywhere for two runes, against your
seven and two recycled.

## 6. Verdict

**Right about the rules; a body, not a point.** 383.3.b's example settles when the 2 XP is paid, and
both triggers do what the entry says. Walked against a Garen deck, the Investigator's swap on T2 took
the Vengeance that kills Kha'Zix, and Mindsplitter on T4 took the Attendant that could still trade with
him: **3 to 3** after their T4, with your champion alive at A and holding for 1 XP a turn. Without the
swap it is also **3 to 3**, with Kha'Zix dead. No line of this walk put your battlefield at stake by
their T4. The 2 XP is repaid by T5 through the Hunt of the champion it kept alive. The entry's
824.1.d notable costs nothing this early, because no Body or Chaos Level ability is on below 6 XP. The
two halves are not equal. Of the entry's two cards, the Investigator, on T2 and for three runes, is
the only one that comes before they can hide an answer. Mindsplitter, on T4 and for seven, comes after
two such turns, and the card that would beat it, Decree of Unity, costs them two runes. The cheapest
answers to the line are three cards at two runes on their T1, one Order recycled: Decree of Unity,
Lacerate or Cull the Weak. Root dies in base, and the swap cannot be paid. Decree of Unity is the one
named, because it also kills Mindsplitter.

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Chaos runes for you, Voidreaver's
two domains, in the twelve of Tournament Rules 402.1. Kha'Zix on T3 needs a Body among the six
channelled: it fails in **1 of 924 deals, 0.11%**. Mindsplitter on T4 needs two Chaos among the eight
channelled, since the one recycled on T3 was Body: that never fails on its own, so with Kha'Zix it is
still **1 of 924, 0.11%**. Root and the Investigator need no Power.

Their walk assumes six Body and six Order. Garen on T3 needs an Order among seven, and the Attendant on
T4 a second among nine: neither can fail with six Body, **0 of 924**. Vengeance on their T3, in the line
without the swap, needs two Order among seven: it fails in **7 of 924, 0.76%**. Hidden Blade needs one
Order among seven: **0 of 924**. Decree of Unity, Lacerate and Cull the Weak on their T1 need one Order
among their first three: they fail in **84 of 924, 9.09%**.

**How likely an answer is.** Out of their own **39**, by their T1 they have seen **5** cards. One named
card in three copies among them is **34.52%**; two (Decree of Unity and Lacerate, six cards),
**58.78%**; all three, **75.25%**. After the swap, the draw it gives them comes from the **34** left. If
they run three Vengeance and three Hidden Blade, two Vengeance and three Hidden Blade are among the 34,
and the one draw finds one of them in **14.71%**. Across that draw and their T2 and T3 draws, three
cards, it is **38.94%**; a Vengeance alone, **17.11%**. The first three figures are before the deal:
the walk fixes all five cards they have seen by their T1, and none of them is an answer to Root. These
count only the cards named, not how many of
them a deck runs.

Their hand holding none of these is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, Root's [Accelerate], Voidreaver's Buff and its move to base, Kha'Zix's 3-XP strike, T5
and after, and a second Investigator.

## Leads

- The notable *"THE REVEAL IS FREE AND HAPPENS EITHER WAY ... buys you their whole hand as
  information"*: it buys their hand, which is not all of their answers. Their Chosen Champion is in the
  Champion Zone from the start (103.2.a.1), and a card with [Hidden] can be facedown at a battlefield
  they control (811.1.b). Seven of the 255 Body/Order cards have [Hidden], `OGN-213 Hidden Blade` among
  them.
- The step *"Later, play Mindsplitter (7 Energy + 2 Chaos Power) for the true strip"*: going first, that
  is T4 at the earliest. By then the opponent has had two turns in which to hide a card. The
  Investigator on T2 is the only hand attack of the two that comes before they control a battlefield.
- The prerequisite *"2 XP banked before the Investigator is played"* names no source. Of the Chaos cards
  that gain XP, `UNL-127 Mister Root` is the only one that banks 2 before a T2 Investigator going first:
  T1, then a move on T2. `VEN-131 Decree of Unity`, `VEN-127 Lacerate` and `OGN-209 Cull the Weak` kill
  it in base on their T1 for two runes.
- The notable on 824.1.d: no Body or Chaos card carries [Level 3]. The lowest threshold in those
  domains is [Level 6], so the 2 XP switches nothing off until a Chaos deck under a Body legend has
  passed 6 XP. Calm, Fury, Mind and Order each have a [Level 3] card.
- The entry's two cards are not the only hand attack open to it. `OGN-156 Sabotage` (Body, E1 + 1 Body
  Power, one rune exhausted and then recycled), legal under Voidreaver and not a Signature card,
  prints *"Choose an opponent. They reveal their hand. Choose a non-unit card from it, and recycle that
  card."* On your T1 it would take the walk's Vengeance from their opening four, with no XP and no
  replacement draw, though going first it costs the T1 Mister Root (two runes, and Sabotage takes one
  of them). So against a spell the Investigator's 2 XP buys nothing Sabotage cannot; what only the
  Investigator reaches, of the three, before their T2 is a unit card.
- No answer is named. `VEN-131 Decree of Unity` (Order, E2 + 1 Order Power) kills Mindsplitter and
  Insightful Investigator, both Chaos, anywhere.
