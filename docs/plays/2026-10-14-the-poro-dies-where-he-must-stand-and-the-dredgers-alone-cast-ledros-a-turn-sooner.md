# Play — The Poro dies where he has to stand, and the Dredgers alone cast Ledros a turn sooner

Issue #354 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `ledros-bird-power-discount`**, the Order ENGINE in which `UNL-160 Ultrasoft Poro` makes
two Bird tokens a turn and `UNL-153 Carrion Dredger` hands a Bird back when it dies, so that
`OGN-231 Commander Ledros` can kill four friendly bodies as he is played and cost 6 Energy and no
Power. Walked as a game, the Poro never made a Bird. He has to stand at a battlefield to use his
ability, he enters exhausted, and on the opponent's next turn two bodies they had played on their T2
walked in and killed him. Ledros still landed on T4, for 6 Energy and 2 Order Power, killing the two
Birds the Dredgers left behind. The Dredgers alone put the same Ledros down on T3, a turn sooner, for
the same 2 Power. The entry's refutation is the wrong card: `OGN-133 Flurry of Blades` reaches only
battlefields, and the line's Birds stand in base.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `e879748`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 35 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 68 (a hit on *first*), first in the list. The other entry of this slice is rank 69,
`UNL-213 Gardens of Becoming` as a free XP faucet for `UNL-191 Wuju Master`, played in
[The Gardens buy Level 6 a turn early, and a ready attacker on their T2 takes them first](2026-10-14-the-gardens-buy-level-6-a-turn-early-and-a-ready-attacker-on-their-t2-takes-them-first.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order among its two domains (103.1.b.1); here `UNL-203 Keeper of the Hammer` (Body/Order) |
| **The payoff** | `OGN-231 Commander Ledros` (Order, E6 + 4 Order Power, M8) |
| **The engine** | `UNL-160 Ultrasoft Poro` (Order, E5, M5) |
| **The fodder** | `UNL-153 Carrion Dredger` (Order, E2, M1), two of them |

None of the four is Signature (`data/cards.json`), and none is in `data/legality.src.json`.

The card text the play turns on:

- Commander Ledros: *"As you play me, you may kill any number of friendly units as an additional
  cost. Reduce my cost by :rb_rune_order: for each killed this way. [Deflect] (Opponents must pay
  :rb_rune_rainbow: to choose me with a spell or ability.) [Ganking] (I can move from battlefield to
  battlefield.)"*
- Ultrasoft Poro: *":rb_exhaust:: Play two :rb_energy_1: :rb_might: Bird unit tokens with [Deflect].
  Use this ability only while I'm at a battlefield."* The corpus renders the token as a 1-Might Bird.
- Carrion Dredger: *"[Deathknell][>] Play a 1 :rb_might: Bird unit token with [Deflect] to your
  base."*
- Keeper of the Hammer: *"When you hold, gain 1 XP. Spend 3 XP, :rb_exhaust:: Draw 1."* You hold
  nothing in the walk, so it is idle. Its Chosen Champion carries the Poppy tag (103.2.a.2).

## 2. Where the Poro can be, and what Ledros's cost takes

**The Poro has to be at a battlefield you control, and he arrives exhausted.** A unit is played to a
valid location, and 355.2.a: *"By default, Valid locations include the controller’s Base or a
Battlefield the controller controls."* 143.4: *"Units enter the Board exhausted."* His ability's cost
is his own exhaust, so the turn he is played he makes nothing, and he spends the opponent's whole
next turn standing at that battlefield. Walking him there from base instead costs the same exhaust,
since 144.2: *"Exhausting the Unit is the Cost for this action."*

**Control of a battlefield comes from units at it.** 190.4: *"Control is established by having
Units at a Battlefield at the end of a Showdown or Combat after applying the contested status."* A
body that walks into an empty battlefield takes it, and Conquer scores it (469.1).

**The kill is optional and reduces Power only.** Ledros's clause uses *as an additional cost* and
*may*, which is an Optional Additional Cost under 356.2.b.1. Each kill takes one Order rune off the
printed four, and 356.6: *"Energy and Power costs can't be reduced below 0."* The 6 Energy is always
paid. Any friendly unit will do: the card says *any number of friendly units*, not Birds.

**A Dredger killed for the cost still makes its Bird.** 428.1.a.1 makes a kill paid as a cost an
Active Kill, and 428.1.a.1.b: the Dredger *"first has any such ability added to the chain as a
Pending Item"*. A Dredger that dies in combat triggers at the cleanup (323.4). Either way a Bird goes
to your base, so killing a Dredger never lowers your fodder count. Killing a Bird does.

**What 2 Power costs on the board.** 164.2.a and 164.2.b let one rune be exhausted for 1 Energy and
then recycled for 1 Power of its domain. Ledros at E6 + 2 Order Power is six runes, two of them Order
and recycled back to the Rune Deck (161.2.b). You end the turn with two fewer runes on the board, the
two a Channel Phase gives you (315.3.b).

## 3. Their order: Body/Chaos, bodies and an attack trigger

`SFD-203 Battle Mistress` (Body/Chaos): *"When you recycle a rune, you may exhaust me to play a Gold
gear token exhausted. When one or more enemy units die, ready me."* Nothing they play costs Power, so
they recycle no rune, and readying the legend does nothing in the walk. Its Chosen Champion carries
the Sivir tag. They play `UNL-097 Kinkou Initiate` (Body, E3, M3), `UNL-092 Demacian Diplomat`
(Body, E2, M2) and `OGN-130 Crackshot Corsair` (Body, E3, M3): *"When I attack, deal 1 to an enemy
unit here."* That trigger chooses, so it targets (355.10). The Poro has no [Deflect] of his own, so
it costs them nothing extra to aim it at him.

## 4. The turns, going first

Body/Order against Body/Chaos. Your battlefield is `OGN-280 Grove of the God-Willow` (*"When you hold
here, draw 1."*), G; theirs is `OGN-278 Bandle Tree` (*"You may hide an additional card here."*), BT.
Nobody hides a card in the walk. Your opening four are two Carrion Dredgers, Ultrasoft Poro and
Commander Ledros. The only Power either side spends is Ledros's 2 Order on your T4.

```
turn    runes   your turn                                                 points
T1      2       Carrion Dredger (E2) to base.                             0
their T1        Kinkou Initiate (E3) to base. Three runes, none left.
T2      4       The Dredger walks to G, Conquer: +1. A second Dredger     1
                (E2) to base. Two runes left.
their T2        Kinkou Initiate walks to G: 3 against 1. The Dredger
                dies and its Bird goes to your base. Conquer. Crackshot
                Corsair (E3) and Demacian Diplomat (E2, 1 XP) to base.
                Five runes, none left.
T3      6       You control no battlefield. The second Dredger walks     2
                to BT, which is empty: Conquer, +1. Ultrasoft Poro (E5)
                to BT. One rune left. The Bird stays in base.
their T3        Hold G: +1, draw 1. Corsair and Diplomat walk from base
                to BT: 3 + 2 against the Poro and the Dredger. Corsair's
                1 on the Poro. Their 5: 4 on the Poro, 1 on the
                Dredger. Your 6 kill both attackers. Nobody is left at
                BT. The Dredger's Bird goes to your base. Seven runes,
                all ready.
T4      8       Commander Ledros to base, killing both Birds: E6 + 2      2
                Order Power. Six runes exhausted, two of them recycled.
                Two runes ready, six on the board.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3. After your T4 it is **2 to 2**,
with Ledros, an 8, exhausted in your base.

**Your T3, why BT.** Kinkou Initiate holds G, and the Dredger and the Bird are a 1 each, so you cannot
take G back. BT is empty. The second Dredger walks in, the showdown ends with only your unit there,
and you control BT (190.4). Now it is a valid location for the Poro (355.2.a), and he goes there,
exhausted (143.4), with nothing to show for it until your T4.

**Their T3, the combat.** They hold G first and draw 1 from it. Corsair and Diplomat walk in from base
in one move (144.3); neither can come from G, since only [Ganking] moves a unit from battlefield to
battlefield (144.4.c). Corsair's attack trigger is theirs to place (464.2.e.1), and they put the 1 on
the Poro. The damage step, 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* They have 5. The Poro is a 5 with 1
marked, so 4 is lethal (142.4.b), and 465.2.c.3: *"Units must have lethal damage assigned to them in
full before damage is assigned to a different Unit."* 4 on the Poro, 1 on the Dredger, and both die.
You have 5 + 1 = 6: 3 on the Corsair, 2 on the Diplomat, and the last 1 on either. 466.5.b: *"If there
are no Units remaining here controlled by any player, the Battlefield becomes Uncontrolled."* Had the
Corsair's 1 gone on the Dredger instead, it dies to that, and their 5 is lethal on the Poro: the same
two deaths.

**Why they took the trade.** Their two bodies, E5 between them, for the Poro, E5, and a Dredger that
comes straight back as a Bird. The Poro is the only one of the four cards that makes fodder without
dying, and he was going to make two Birds on your T4.

**Your T4.** Two Birds in base, both ready (315.1.b). Ledros kills both: 6 Energy and 4 − 2 = 2 Order
Power. You have no battlefield, so he goes to base (355.2.a).

**What the Poro would have bought.** Had he lived through their T3, on your T4 he readies, exhausts,
and two Birds go to your base. Ledros kills the Dredger, the first Bird and the two new ones: four
kills, 6 Energy and no Power, with the Dredger's Bird back in base (428.1.a.1.b). That is the entry's
own end state, on T4, with eight runes on the board instead of six.

**What the Dredgers alone do, a turn sooner.** On your T3, with six runes, the second Dredger walks to
BT for the Conquer, and then Ledros kills it and the first Bird: 6 Energy and 2 Order Power, six runes
exhausted and two recycled. The Dredger's Bird goes to your base. Ledros's location is chosen before
the cost is paid: 355.2 picks it in step 2, while the Dredger still holds BT, and the kill is paid in
step 4 (357.2). None of the checks in 358 re-tests the location, and 359.2.c: *"If it is a Unit, it
enters the Board exhausted at the Location that was chosen."* So Ledros stands at BT, an 8, a turn
before the walk's Ledros, and BT is still yours on their T3. Corsair and Diplomat, 3 + 2 with the
Corsair's 1, do not take it. You have four runes on the board at the end of T3 and six on T4, the same six
the walk has, and the Poro is still in your hand. The trade against the Poro's best case is one turn
of Ledros against two runes, and the Poro's best case needs him to survive their T3.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **5** cards by
T1, **6** by T2, **7** by T3 and **8** by T4 (four opening, one draw a turn). At three copies of each
card, computed exactly:

- the walk's line (a Dredger by T1, two by T2, the Poro by T3, Ledros by T4): **0.79%**;
- the Dredgers-only line (a Dredger by T1, two by T2, Ledros by T3): **2.06%**;
- the Poro by T3 and Ledros by T4, ignoring the Dredgers: **21.71%**;
- Ledros by T3 (7 seen): **45.73%**.

No battlefield in the walk is required, so no 1-in-3 factor from 485.5 applies.

## 5. Breaks to

**The break in the walk costs them no card from hand and no rune: two bodies they already had walk
into the Poro on the turn after he lands.** He is a 5, exhausted, and standing where the rules require
him to stand. Corsair and Diplomat, 3 + 2 with the Corsair's 1, are exactly lethal on him. They lose
both, and you lose the only card that makes fodder without dying. Ledros still lands on T4, at 2 Power
rather than none.

**`OGN-133 Flurry of Blades` is not an answer to this line.** The entry's last notable says the Birds
are lethal to it "standing at a battlefield". Flurry reads *"Deal 1 to all units at battlefields."*,
and every Bird in the walk is in base: the Dredger's Bird by its own text (*"to your base"*), and the
Poro's Birds because their ability names no location, so 355.2.a lets you choose your base. A Dredger
the Flurry kills at a battlefield hands you a Bird in base (323.4). The Poro, a 5, takes 1 and lives.
Cast on their T3 in the walk, it removes no fodder.

**What does reach the fodder.** A Body/Chaos deck plays only Body, Chaos and Body/Chaos cards
(103.1.b.1). The cards in those domains in `data/corpus_flat.txt` whose text reaches *all units*,
*all enemy units*, *each unit*, *all other units* or *all friendly units* are ten. Two reach a base:

- `UNL-132 Angler Beast` (Chaos, E5 + 1 Power, M5): *"When you play me, return all units with 2
  :rb_might: or less to their owners' hands."* Every Bird is a 1, and 186.1: *"If a token is put into
  any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new
  zone."* Every Dredger goes back to hand. The Poro, a 5, stays. It is five runes, one of them
  exhausted for the Energy and recycled for the Power (164.2.a, 164.2.b), and on their T3 they have
  seven. That is the one sweep in the list that takes the fodder, and it costs a card and five runes.
- `SFD-147 Downwell` (Chaos, E8 + 2 Power) returns every unit, Ledros included. Eight runes, two of them recycled.

The other eight reach battlefields or combat only (Flurry of Blades, `OGN-127 Cannon Barrage`,
`OGN-268 Bullet Time`, `OGN-148 Anivia, Primal`, `OGN-190 Kog'Maw, Caustic`), move units at a
battlefield to base (`UNL-107 Stare Down`), or touch only their own units or trash (`OGN-153 Overt
Operation`, `UNL-148 Cursed Sarcophagus`).

**What answers the break.** Not putting the Poro on the board. The Dredgers-only cast in §4 needs no
battlefield and no turn of standing, and it is the faster Ledros.

## 6. Verdict

**Right that Ledros's discount works and that the Dredgers refund Birds, wrong about which half
carries it and about what refutes it.** The Poro has to stand at a battlefield, exhausted, through a
whole opponent turn before he makes anything, and two cheap bodies killed him. With him dead, Ledros
landed on T4 at 6 Energy and 2 Order Power, on Birds the Dredgers left behind. The Dredgers alone cast
the same Ledros on T3. The Poro's best case, if he lives, is the zero-Power Ledros on T4, which is a
turn later than the Dredgers' Ledros for two runes saved. Flurry of Blades, the card the entry names
as the refutation, reaches only battlefields and kills no fodder here. `UNL-132 Angler Beast` does.

## 7. Not verified

I did not deal the channel order. The walk assumes six Order and six Body runes, Keeper of the
Hammer's two domains. Ledros on your T4 needs two Order among the eight runes channelled by then, and
eight runes from a twelve with six Body always hold at least two Order, so it never fails at that
split. The Dredgers-only Ledros on T3 needs two Order among the first six runes: it fails in **37 of
924 deals, 4.00%**. Full-price Ledros on T3, with no kills, needs four Order among six, which holds in
only **262 of 924, 28.35%**. At twelve Order runes none of these fails.

I did not walk the Dredgers-only line or the Poro's surviving line in the turn table; both are
derived in §4 from the same opening and the same opponent through your T3. Ledros standing at BT in
the Dredgers-only line rests on reading 355.2, 357.2, 358 and 359.2.c in order. Control is not lost
mid-play: 190.4.c takes it away only in an Open state, at the following cleanup, and 354.1, moving
Ledros to the chain, *"This Closes the State."* I did not walk their T4,
Ledros attacking with Ganking, Angler Beast cast on their T3, a different opening for them, the
mulligan, or 2v2. Whether they have 5 Might of ready bodies in base on their T3 depends on their
opening, which I fixed. The probabilities in §4 count only cards in hand at the turn named.

## Leads

- The last notable says the Birds are lethal to `OGN-133 Flurry of Blades` "standing at a
  battlefield". In this line they stand in base: the Dredger's Bird by its text, the Poro's Birds by
  355.2.a, which lets the controller pick base. A Dredger the Flurry kills hands back a Bird in base,
  so the Flurry removes no fodder. Of the ten Body/Chaos sweep cards in `data/corpus_flat.txt`,
  `UNL-132 Angler Beast` (E5 + 1 Power) is the one that reaches it, returning every unit of 2 Might or
  less, and the Birds cease to exist (186.1).
- The second notable says the Poro is "a turn slower than it looks" and counts the turn, but not the
  exposure. He enters exhausted (143.4) at a battlefield he has to control (355.2.a) and stands there
  through the opponent's turn before his first Birds. In the walk, Crackshot Corsair and Demacian
  Diplomat, E5 of bodies played on their T2, were exactly lethal on him on their T3.
- Ledros's cost kills *any number of friendly units*. Two Dredgers and the Bird the first one leaves
  put Ledros down on T3 at E6 + 2 Order Power, a turn before the Poro's earliest zero-Power Ledros
  (T4). He can be played to the battlefield the killed Dredger held, because his location is chosen
  in step 2 and the kill is paid in step 4 (355.2, 357.2, 359.2.c). Both lines have six runes on the board on T4 if the Poro dies; if he lives, his line has eight.
- The first notable cites 415.3.a for one Poro activation per turn. 415.3.a is the Awakening ready.
  The cap comes from the exhaust in the ability's cost, which only that ready (315.1.b) pays back.
