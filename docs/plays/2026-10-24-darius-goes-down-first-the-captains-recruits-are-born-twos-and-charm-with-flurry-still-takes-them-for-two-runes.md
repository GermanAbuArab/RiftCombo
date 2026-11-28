# Play — Darius goes down first, the Captain's Recruits are born 2s, and Charm with Flurry still takes them for two runes

Issue #449 (a slice of #200), 2026-10-24. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `darius-executioner-vanguard-captain-legion-clause-boundary`**, the Order ENGINE that reads
`OGN-243 Darius, Executioner` (Order, E6 + 1 Order Power, M6) as two clauses: a [Legion] ready, and an
aura, *"Other friendly units have +1 :rb_might: here."*, that needs no other card. Beside
`OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) it makes the Captain's two Recruits 2s,
out of range of `OGN-133 Flurry of Blades` (Body, E1, 1 to every unit at a battlefield). The entry is
right about the clause. Walked as a game, going first, with the Fury/Order Recruit deck of
[the Fortress play](2026-10-14-the-fortress-killed-nothing-their-recruits-stayed-off-it-until-darius-stood-there.md)
in your seat, against the Calm/Body Wuju Master deck of
[the Feral Strength play](2026-10-23-feral-strengths-plus-two-saves-the-turn-two-pair-the-repeat-never-changes-a-count-and-combat-experience-stays-a-plus-one.md)
with a Flurry in its hand. **The main line:** Darius is the first card of your T4, so his own Legion
is off, and his aura is on anyway. He is also the other card the Captain's Legion asks for, so the
Captain follows him for the same eight runes and the legend's one Energy, and no third card is
needed. Every Recruit at A is born a 2. Five of them stand there after your T4, and the Flurry in
their hand kills nothing. **3 to 3** after their T4. **The control** plays the same Captain a turn
early, before Darius: their T3 Flurry kills both Recruits for one rune. That is also **3 to 3**, with
two Recruits at A instead of five. **The cheapest answer is two runes:** `OGN-043 Charm` (Calm, E1 + 1
Calm Power) moves Darius off A, and Flurry then kills every Recruit there. Moved into their
battlefield, Darius dies in the combat as well. The engine scores nothing, as the entry says, so
their free answer is to leave A alone.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-24 at `e010ecb`, reads
773 entries, 262 with forced-ordering language, **95 in the queue and 5 of them with no play**, as the
issue measured. The two picks are unchanged: this entry is rank 91, the first in the list. The other
entry of this slice is rank 92, `tryndamere-brambleback-conquer`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-253 Hand of Noxus` (Fury/Order, tag Darius) |
| **Chosen Champion** | `OGN-243 Darius, Executioner` (Order, E6 + 1 Order Power, M6) |
| **The engine** | `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) |
| **The other Recruit makers** | `OGN-212 Forge of the Future` (Order gear, E2), `OGN-211 Faithful Manufactor` (Order, E3, M2), `OGN-222 Noxian Drummer` (Order, E3, M3) |
| **The bodies** | `OGN-217 Trifarian Gloryseeker` (Order, E2, M2), `OGN-210 Daring Poro` (Order, E2, M2) |

The entry admits any legend with Order in its pair. Hand of Noxus is the one for this walk because
its tag is Darius, so Darius is the Chosen Champion and is in reach every game, 103.2.a.2: *"Must be a
champion unit with a champion tag that matches the tag on your Champion Legend."* He starts in the
Champion Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."*, and
he is played from there, 419.1.a: *"By default, a player can only Play cards from their hand or their
Chosen Champion zone."* The legend adds one Energy once a card has been played, which is what pays
for the Captain after Darius.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3
copies of the same named card."* None of the cards in this play, on either side, is a Signature card
(`signature` in `data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Darius, Executioner: *"[Legion] — When you play me, ready me. (Get the effect if you've played
  another card this turn) Other friendly units have +1 :rb_might: here."*
- Vanguard Captain: *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here.
  (Get the effect if you've played another card this turn.)"*
- Hand of Noxus: *":rb_exhaust:: [Reaction], [Legion] — [Add] :rb_energy_1:. (Abilities that add
  resources can't be reacted to. Get the effect if you've played a card this turn.)"*
- Forge of the Future: *"When you play this, play a 1 :rb_might: Recruit unit token at your base. Kill
  this: Recycle up to 4 cards from trashes."*
- Faithful Manufactor: *"When you play me, play a 1 :rb_might: Recruit unit token here."*
- Noxian Drummer: *"When I move to a battlefield, play a 1 :rb_might: Recruit unit token here. (It is
  also at the battlefield.)"*
- Trifarian Gloryseeker: *"[Legion] — When you play me, buff me. (If I don't have a buff, I get a +1
  :rb_might: buff. Get the effect if you've played another card this turn.)"*
- Flurry of Blades (theirs): *"[Reaction] (Play any time, even before spells and abilities resolve.)
  Deal 1 to all units at battlefields."*
- Charm (theirs, in §5): *"Move an enemy unit."*

## 2. Where the Legion ends, and when they can reach the Recruits

**The aura is not Legion text.** 812.1.b: *"Starting from the Keyword to the end of the clause, the
entire statement is the Legion Ability."* Darius's Legion clause ends at *"ready me."*. The sentence
after the reminder is a statement of fact, which is how a passive ability reads, 364.2: *"They can be
recognized by being statements of fact."* It applies from the moment he is on the board, 359.2.a:
*"Any passive abilities become active."* So Darius played as the first card of a turn stands
exhausted, 359.2.c: *"If it is a Unit, it enters the Board exhausted at the Location that was
chosen."*, and every other friendly unit at his battlefield is +1 all the same.

**Darius is the Captain's other card.** 812.1.c: *"As long as a card different than the one with the
Legion ability has been Finalized by you on the same turn then the Dependent Ability is Active on the
card with Legion."* Darius is a card, and played from the Champion Zone he is Finalized like any
other. So Captain after Darius has his Legion on, and the same Darius turns on the legend's, whose
reminder asks only for *"a card"*. One card can do it for all of them, 812.2: *"All instances of Legion
on cards a player controls are satisfied by that player playing a single card."* The order
Captain-then-Darius needs a third card in front of both, or the Captain plays no Recruits.

**A Recruit is a 1, so Darius makes it a 2.** 187.1: *"A 1 [M] Recruit token is a domainless unit
token with 1 Might and the Recruit tag."* The Captain plays his *"here"*, where he was played. A unit
dies when its damage reaches its Might, 143.2.a: *"If a Unit ever has nonzero damage marked on it
equalling or exceeding its Might, it is Killed."* So Flurry kills a Recruit standing alone and marks 1
on a Recruit beside Darius. The damage goes at the end of the turn, 143.3.b.1: *"At the end of each
player's turn."*

**On your own turn they never see a 1 at A.** Flurry is [Reaction], 813.1.c.1: *"This can be played
during Closed States on any player's turn."* A Closed State is a chain, 309.1: *"If a Chain exists, the
turn is in a Closed State."* In your Main Phase with no chain, only you hold Priority, 312.2.a:
*"When the turn is in a Neutral Open State during their Main Phase."* Darius makes no chain of his
own when his Legion is off: a unit does not wait on the chain, 359.2: *"A Permanent leaves the Chain
and becomes a Game Object."* The Captain's Legion trigger is a chain, and they get Priority on it,
312.2.d: *"When the turn is in a Closed State, they are the next Player in Turn Order, and the player
with Priority passes."* At that point the Recruits are not on the board yet, and when they arrive
Darius is already there. A walk-in makes no window either, 446.3.c: *"Moving does not use the Chain,
nor is it able to be Reacted to."* So the Recruits are only ever 1s at A across a turn boundary,
which is the control in §4.

**What a moved Darius takes with him.** The aura reads *"here"*, and *"here"* is wherever Darius is
when the game asks. A move effect picks its destination, 355.4: *"For Spells and Abilities that Move
one or more Units, choose a valid Location as the Move Destination for each Move that will be
performed."* Any location except the current one will do, 355.4.a: *"A valid Location for a Move
Effect is one other than the Units’ current Location where they are allowed to be present."* Charm
names none, and 449.1 leaves that to the card: *"The source of the Move will provide details on any
restrictions on legality for Destination."* Moved into their battlefield, Darius contests it, 450:
*"The Destination becomes Contested if it is an Uncontested Battlefield not controlled by the
controller of the Unit or Units that moved."* And you are the one attacking, 464.2.c.1: *"The Attacker
is the player whose unit(s) applied the Contested status to the Battlefield."*

**Where a unit can go, and the runes.** 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* A unit played to a battlefield you
already control opens no showdown, 190.3.a.1: *"Units moving to or being played to a battlefield apply
Contested status if that battlefield is not already Contested and that Unit’s controller does not
already control that battlefield."* Units move from base to a battlefield and back, never between
battlefields, 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b: *"Units may move
from a Battlefield to their Base."* No unit in this walk has [Ganking]. A move is paid by exhausting
the units, 420.3.a: *"The Cost is Exhausting one or more Units."* A rune adds Energy by exhausting,
164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power by leaving, 164.2.b: *"Recycle this: [Reaction] —
Add [C]."*, and 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is
being Recycled."* An exhausted rune still pays the recycle, and it goes to the bottom of the rune
deck, 416.1: *"Recycling cards is the action in which a player takes one or more cards from a specific
zone and then puts it on the bottom of the corresponding deck."* Your board readies only on your
turn, 415.3.a: *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on
their turn."* Going first, you channel to 2, 4, 6 and 8 runes on T1 to T4, less any you recycle.

## 3. Their deck: Calm/Body Wuju Master

The deck of the Feral Strength play linked above, in the other seat this time, with a Flurry in its
opening four. `UNL-191 Wuju Master` (Calm/Body): *"[Level 6][>] Your units have +1 :rb_might:. (While
you have 6+ XP, get the effect.) [Level 11][>] Your units enter ready."* Its Chosen Champion is
`UNL-113 Master Yi, Tempered`, never played. Their bodies are `UNL-094 Gemhand Hunter` (Body, E2, M2;
*"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] I have +1 :rb_might:. (While you have 6+
XP, get the effect.)"*), `UNL-040 Wuju Apprentice` (Calm, E2, M2; [Hunt], and at [Level 6] it draws 1
when played), `UNL-102 Crowd Favorite` (Body, E3, M3; [Hunt]) and `UNL-097 Kinkou Initiate` (Body, E3,
M3; *"When you play me, draw 1 if your other units have total Might 5 or more."*). Nothing in the walk
costs them Power. Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The
player going second channels an extra Rune from their Rune Deck during their first Channel Phase of
the game."*

## 4. The turns, going first

Fury/Order against Calm/Body. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*, and nobody hides); theirs is B, `VEN-158 Heisho, Shell of the World`
(*"Players ignore [Deflect] while paying for spells and abilities choosing something here."*, and
nothing in the walk has [Deflect]). Your opening four are Trifarian Gloryseeker, Forge of the Future,
Faithful Manufactor and Vanguard Captain. Your draws are Daring Poro (T1), a second Trifarian
Gloryseeker (T2), Noxian Drummer (T3) and a second Vanguard Captain (T4). Their opening four are
Gemhand Hunter, Wuju Apprentice, Crowd Favorite and Flurry of Blades. Their draws are Kinkou Initiate
(T1), a second Gemhand Hunter (T2), a second Crowd Favorite (T3) and a third Gemhand Hunter (T4);
the Initiate draws them a second Wuju Apprentice, and that Apprentice a third.

The main line holds every Recruit in base until Darius stands at A.

```
turn      runes   your turn                                                 points
T1        2       Trifarian Gloryseeker (E2) to base, no other card, no     0
                  buff. None left.
their T1  3       Gemhand Hunter (E2) to base. One left.                    XP 0
T2        4       The Gloryseeker walks to A, empty, Conquer: +1. Forge     1
                  of the Future (E2): a Recruit at base. Hand of Noxus:
                  +E1. Faithful Manufactor (E3) to base: a Recruit at
                  base. None left.
their T2  5       Gemhand walks to B, empty, Conquer, Hunt. Wuju            XP 1
                  Apprentice (E2) and Crowd Favorite (E3) to B. None
                  left.
T3        6       Hold A: +1. Daring Poro (E2) to A. Hand of Noxus: +E1.    2
                  The second Gloryseeker (E2, with Legion: buffed, a 3)
                  to A. Noxian Drummer (E3) to base. The Manufactor
                  walks to A. None left.
their T3  7       Hold B, three Hunts. Kinkou Initiate (E3) to B: draws     XP 4
                  (the others are 7). The second Gemhand (E2) to B. Two
                  left; Flurry held: nothing of yours at A is a 1.
T4        8       Hold A: +1. Darius, Executioner (E6, one Order            3
                  recycled) from the Champion Zone to A, first card of
                  the turn: Legion off, aura on. Hand of Noxus: +E1.
                  Vanguard Captain (E3, one Order recycled) to A, Legion
                  on: two Recruits, 2s. The two base Recruits and the
                  Drummer walk to A: a Recruit, a 2. Eight runes, two
                  recycled; none left.
their T4  9       Hold B, four Hunts: Level 6. The second Crowd Favorite    XP 8
                  (E3), the second Apprentice (E2, draws) and the third
                  Gemhand (E2) to B. Two left; Flurry held: it kills
                  nothing.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After their T2
it is **1 to 1**; after your T3, **2 to 1**; after their T3, **2 to 2**; after your T4, **3 to 2**;
after their T4, **3 to 3**.

Runes on your board at the end of each turn: 2, 4, 6, 6 after your T4. On theirs: 3, 5, 7, 9.

Your hand, card by card: 5 after the T1 draw, 4 after the Gloryseeker; 5 after the T2 draw, 3 after
the Forge and the Manufactor (Captain, Poro, Gloryseeker); 4 after the T3 draw, 1 after the Poro, the
Gloryseeker and the Drummer (Captain); 2 after the T4 draw, 1 after the Captain (the second Captain).
Darius came from the Champion Zone, not from your hand. Theirs: 5 after the T1 draw, 4 after the
Gemhand; 5 after the T2 draw, 3 after the Apprentice and the Crowd Favorite (Flurry, Initiate,
Gemhand); 4 after the T3 draw, 3 after the Initiate, 4 after its draw, 3 after the Gemhand (Flurry,
Crowd Favorite, Apprentice); 4 after the T4 draw, 3 after the Crowd Favorite, 2 after the Apprentice,
3 after its draw, 2 after the Gemhand (Flurry and the third Apprentice).

**Your T2 and T3: the Recruits stay home.** The Gloryseeker takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a
Conquer if that player has not yet scored that Battlefield this turn."* The Forge's Recruit is born at
your base, and so is the Manufactor's, because the Manufactor was played there. Flurry reaches only
battlefields, so a Recruit in base is out of its range with or without Darius. On T3 you Hold A,
469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during
their Beginning Phase."* The second Gloryseeker comes after the Poro, so its Legion is on and it is
a 3. A has four bodies of 2 or more, and their two open runes on their T3 have nothing to kill.

**Their turns: B, and no road to A.** On their T2 the Gemhand could walk into A instead, but a 2 into
your 2 leaves A empty and scores nothing. B is empty and worth a point. From then on their bodies are
at B. A unit at B can go only to their base (144.4.b), so nothing of theirs can reach A without a turn
in base first.

**Your T4: Darius first, the Captain second.** Darius goes to A as the first card of the turn. Six
runes pay his Energy and one of them, an Order, is recycled for his Power. His Legion is off, since no
other card was played before him, so he stays exhausted. His aura is on: the Gloryseekers are 3 and
4, the Poro and the Manufactor 3. He is the card Hand of Noxus and the Captain both need. The legend
adds one Energy. The Captain costs the last two runes and that Energy, and another exhausted Order is
recycled for his Power. His Legion is on, and his trigger goes on the chain. They could Flurry there,
and it would kill nothing: the Recruits are not on the board yet. The trigger resolves and both
Recruits enter as 2s. Then the two Recruits from your base and the Drummer walk to A in one move,
144.3: *"Players may perform multiple Units' standard move simultaneously. This is treated as one game
action performed on multiple Units."* The Drummer's trigger plays a fifth Recruit at A, a 2. A is
3 + 3 + 4 + 3 + 6 + 4 + 4 + 5 × 2 = **37**.

**Their T4: a Flurry with nothing to kill.** They Hold B and reach 8 XP, so their units are +1 and
the Gemhands +1 more. Flurry now marks 1 on each of your units at A and kills none: the smallest is a
2-Might Recruit. They hold it and play out. **3 to 3.**

**The control: the Captain on T3, before Darius.** The same deal. On T3 the Poro goes to A, the legend
adds one, and the Captain (E3, an Order recycled) follows it to A with his Legion on: two Recruits at
A, 1s. The second Gloryseeker (E2) takes the last two Energy, and the Drummer stays in hand. On their
T3, Flurry (E1) kills both Recruits and nothing else. They still play the Initiate and the Gemhand,
and one rune is left. On your T4, seven runes: Darius (E6, an Order recycled) to A, the legend adds
one, and two Energy buy nothing in your hand (the Drummer and the second Captain are E3 each). The
two base Recruits walk to A as 2s. **3 to 3**, with two Recruits at A instead of five and their Flurry
gone.

**The entry's own order inside one turn.** Another card, then the Captain, then Darius, gets Darius
his Legion as well. It is safe in the same way the main line is: the opponent has no Priority
between the Captain's trigger resolving and Darius landing (312.2.a). What it costs depends on the
third card. This list's cheapest is E2, so the line is 2 + 3 + 6 = 11 Energy against T4's eight runes
and the legend's one, and the first turn it fits is T5. Hand of Noxus's pool also holds two E0 cards,
`OGN-245 Seal of Unity` and `OGN-040 Seal of Rage`. Seal of Unity (Order gear, E0 + 1 Order Power):
*":rb_exhaust:: [Reaction] — [Add] :rb_rune_order:. (Abilities that add resources can't be reacted
to.)"* With it the entry's order fits on T4. All eight runes are exhausted for Energy, and the Energy
stays in the pool through the Main Phase, 167: *"Every player's Rune Pool empties at the start of each
player's Main Phase and the end of each player's turn."* One Order is recycled to pay for the Seal, and
the Seal enters ready, 359.2.d: *"If it is a Non-Unit Gear, it enters the Board Ready at the player's
Base."* The legend adds one Energy, for 9. The Seal adds the Captain's Order Power, and a second
recycled Order pays for Darius. It takes 0 + 3 + 6 = 9 Energy and two recycled runes, the same as the
main line, plus one card. Darius gets his ready, and the Seal stays on the board. What the ready buys
is a move, and Darius at A can move only to base (144.4.b). To attack with it he would be played to
base and walk into B, and the aura goes with him, away from the Recruits.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 8 cards by T4 (four opening, one draw a turn from T1).
With three copies, a Vanguard Captain among them is **50.82%**. Darius needs no draw.

## 5. Breaks to

**What the engine did, and the predicate.** On your T4 Darius and the Captain put five Recruits at A,
all 2s, and the Flurry in their hand had nothing to kill. The predicate is: played by them on their
T4, with the nine runes and the board they have, does it leave no Recruit alive at A?

**The scope.** A Calm/Body deck plays only Calm, Body and Calm/Body cards (103.1.b), and its Signature
cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the Champion tag
that corresponds to the Champion Legend of the deck."* Folded by name (not a legend, battlefield, rune
or token, and not a Signature card with another champion's tag), that is **253** cards, none of them
banned in constructed: **154** units, **64** spells and **35** gear.

**The candidates.** Of the 253, the regex
`\b(deal|deals|move|moves|kill|kills|return|returns|banish|recall|recalls)\b|-\d* ?:rb_might:|-:rb_might:`
(case-insensitive, reminder text left in) matches **84**. Read one by one, the Recruits beside Darius
die in exactly two ways. Either something takes Darius off A and Flurry follows, or the Recruits take 2
each in a combat at A. Flurry is the only card in the pool that reaches every unit at a battlefield
out of combat.

**The cheapest answer: Charm, then Flurry, two runes.** In their Main Phase, after the Hold, `OGN-043
Charm` (E1 + 1 Calm Power) moves Darius into B. Charm has no [Action], so it waits for their own Main
Phase. Darius contests B (450) and you are the Attacker (464.2.c.1). He is a 6 against their 19:
Gemhand 4, Apprentice 3, Crowd Favorite 4, Initiate 4 and the second Gemhand 4, all at Level 6. Lethal
goes to one unit in full first, 465.2.c.3: *"Units must have lethal damage assigned to them in full
before damage is assigned to a different Unit."* His 6 kill the Apprentice and put 3 on a 4. Their 19
kill him. Then Flurry (E1): the five Recruits at A are 1s again and all die. Your other units at A
take 1 each and live. **Two runes, one Calm recycled, two cards and a Wuju Apprentice, for Darius and
five Recruits.** Charm can send Darius to your base instead. Then he lives, the Recruits still die,
and on your T5 he walks back with nothing left to cover. The other seven runes still buy their three
T4 bodies.

**Nothing cheaper exists out of combat.** Of the 253, **23** cost E1 or less. Read in full, only Flurry
deals damage among them, and only Charm moves an enemy unit. At two runes no E2 spell, gear or unit
kills more than one Recruit at A out of combat: `OGN-128 Challenge` (Body, E2 + 1 Body Power) with a
4-Might Gemhand kills one. A unit played that turn enters exhausted (143.4:
*"Units enter the Board exhausted."*) and cannot pay for a move (420.3.a). No E2 or cheaper unit has a
play trigger that deals damage or moves an enemy.

**Dearer answers on the same board, all with Flurry:**
- `UNL-038 Skyward Strike` (Calm, E2 + 1 Calm Power): *"Move an enemy unit. [Level 6][>] [Stun] an
  enemy unit. (While you have 6+ XP, get the effect. A stunned unit doesn't deal combat damage this
  turn.)"* Darius goes where Charm sent him. Their Level 6 is live, so it can also stun him on the way
  into B, and then he kills nothing there. **Three runes.**
- `UNL-054 Tricksy Tentacles` (Calm, E4 + 1 Calm Power), which moves enemy units with a total Might
  of 8 or less: Darius alone is 6. **Five runes.**
- `OGN-067 Blitzcrank, Impassive` (Calm, E5 + 1 Calm Power, M5), played to B, pulls Darius there:
  *"[Tank] (I must be assigned combat damage first.) When you play me to a battlefield, you may move
  an enemy unit to here. When I hold, return me to my owner's hand."* Darius's 6 go into Blitzcrank
  first, a 6 at Level 6. **Six runes.**
- `OGN-149 Carnivorous Snapvine` (Body, E5 + 2 Body Power, M6): *"When you play me, choose an enemy
  unit at a battlefield. We deal damage equal to our Mights to each other."* At Level 6 the Snapvine
  is a 7, so Darius dies and it does not. Played to their base it stays out of the Flurry's reach;
  played to B, the Flurry's 1 on top of Darius's 6 kills it too. **Six runes, two recycled.**
- `OGS-008 Gentlemen's Duel` (Body, E6 + 1 Body Power): +3 on a Crowd Favorite makes it a 7, and the
  two deal their Mights to each other. The Crowd Favorite is at B, so the Flurry's 1 on top of
  Darius's 6 kills it as well. **Seven runes.**

One card does it alone: `VEN-090 Cataclysmic Duel` (Body, E8 + 3 Body Power), *"Each player chooses a
unit they control. Kill the rest."* You keep one unit, and they keep one of their five at B, with no Energy left for their three T4 bodies. **Eight
runes, three recycled.**

**Answers this board does not give them on their T4.**
- `OGN-127 Cannon Barrage` (Body, E2 + 1 Body Power): *"[Reaction] (Play any time, even before spells
  and abilities resolve.) Deal 2 to all enemy units in combat."* Two runes. It needs a combat at A, so
  a ready body of theirs in base has to walk in. In the walk every body of theirs is at B.
- `UNL-112 Irresistible Faefolk` (Body, E2, M1): *"When I move to a battlefield, you may move an enemy
  unit to that battlefield."* It walks into B and drags Darius with it, but only if it was on their
  board, ready, from an earlier turn. Played on their T4 it enters exhausted.
- `SFD-114 Marching Orders` (Body, E3) with its [Repeat] paid: the Apprentice, their only 3, twice into Darius is 6. A second
  execution with a second friendly unit is the open [Repeat] reading (the #187 bullet in
  `docs/rules-notes/rules-findings.md`, one play and two sets of choices), so it is not counted.
- `UNL-107 Stare Down` (Body, E2) sends every unit of yours at A with less Might than their chosen
  unit to your base. The Recruits leave A but do not die, and Darius keeps A.
- Three-card lines exist, such as `VEN-081 Onslaught` with `OGN-128 Challenge` into Darius, then
  Flurry, for seven runes. I did not enumerate them.

**The free answer.** Nothing here scores, as the entry's own `terminatesIn` says. They Hold B, you Hold
A, and it is 3 to 3 with or without the five Recruits.

## 6. Verdict

**Right about the clause, and the ordering is worth a card and a turn; Charm and Flurry still take
the Recruits for two runes.** Walked going first with the Hand of Noxus Recruit deck, Darius went to A
as the first card of T4. His Legion was off and his aura was on, as 812.1.b says. He was also the
card that turned on the Captain's Legion, so the Captain followed him for the same eight runes and the
legend's Energy. Every Recruit at A was born a 2. Five stood there after your T4, and their Flurry
killed none: **3 to 3** after their T4. The entry's own order, another card first, costs one more card, an
E0 Seal on T4 or this list's E2 on T5, and its Legion ready only lets Darius walk away from the
Recruits. Played a turn before Darius, the
Captain's two Recruits sat as 1s through their turn, and Flurry killed both for one rune: **3 to 3**,
with two Recruits at A instead of five. Inside one turn the opponent never gets Priority while a
Recruit at A is a 1, so the exposure is only ever a turn boundary. The aura is safe from Flurry alone,
not from Flurry with anything that takes Darius off A. `OGN-043 Charm` does that for one Energy and one
Calm Power, so the cheapest answer is two runes and two cards. Moved into their battlefield, Darius
dies there too.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Order runes for you, Hand of
Noxus's two domains, in the twelve of Tournament Rules 402.1. The main line recycles two Order runes on
T4, so it needs two Order among your first eight runes: with six Fury, the first eight always hold at
least two Order, **0 of 495**. The control recycles an Order on T3, which needs an Order among your
first six runes: it fails only when all six are Fury, **1 of 924, 0.11%**. Its T4 Darius needs a second
Order among the first eight, **0 of 495**. Every other card you play needs no Power.

Their walk costs them no Power. Charm in §5 needs a Calm among their first nine runes: with six Body,
the first nine always hold at least three Calm, **0 of 220**. The Body Power for Snapvine, Gentlemen's
Duel and Cataclysmic Duel cannot fail either: those nine also hold at least three Body. Snapvine and
Cataclysmic Duel need only two and three of them.

**How likely an answer is.** The walk fixes their opening four and their four draws. Holding both a
Charm and a Flurry among their first 8 cards of 39, three copies each, is **24.20%**. That counts only
the two cards named, not how many of them a Calm/Body list runs.

`data/cards.json` carries no champion supertype. I read Darius, Executioner as a champion unit by his
title name and his Darius tag, as the Fortress play did with the same Chosen Champion. Their decision
to take B on their T2 rather than trade into A is the walk's choice of opponent. Not walked: going
second, the mulligan, 2v2, a rune split other than six and six, the entry's order on T5 turn by turn,
three-card answers, Marching Orders under either [Repeat] reading, and the turns after their T4.

## Leads

- Step 1, *"Play any other card first"*: Darius can be that card. 812.1.c asks only that a card
  different from the Captain was Finalized this turn, and Darius played first is one. In the walk the
  order Darius, legend, Captain completed the board on T4 going first, for eight runes and the
  legend's one Energy. The entry's order needs a third card in front of both. With `OGN-245 Seal of
  Unity` (E0 + 1 Order Power, and it adds an Order Power back) it also fits on T4, for the same eight
  runes and two recycled, plus the Seal itself. With this list's cheapest card, an E2, it is T5.
- Step 3, *"His Legion half readies him - effectively [Accelerate] for the turn"*: played to the
  battlefield he guards, the ready buys only a move to base, because a unit at a battlefield can go
  nowhere else (144.4.b). It buys an attack only if he is played to base and walks into theirs, and
  then his aura goes with him, away from the Recruits.
- Step 5 and `netPerIteration`, *"for as long as Darius lives"*: for as long as Darius is at that
  battlefield. `OGN-043 Charm` (Calm, E1 + 1 Calm Power) moves him without killing him, and Flurry then
  kills every Recruit there. Two runes and two cards are the cheapest answer to the finished board.
  Moved into their battlefield, Darius dies in the combat too.
- Step 5, *"which is what takes the garrison out of range of a 1-damage sweeper"*: true of the sweeper
  alone. The exposure the walk found is a turn boundary. Inside one turn the opponent never holds
  Priority while a Recruit at A is a 1 (312.2.a, 359.2, 446.3.c). A Captain played a turn before
  Darius loses both Recruits to one Flurry, which is the control.
- `terminatesIn`, *"two 2-Might Recruits per Captain"*: the aura covers every friendly unit at that
  battlefield, so Recruits from other cards walk in as 2s too. In the walk there were five: two from
  the Captain, one each from Forge of the Future and Faithful Manufactor, and one from Noxian Drummer.
- The entry names no answer. The cheapest is Charm with Flurry, above. Cannon Barrage is the same two
  runes, but it needs a combat at A.
