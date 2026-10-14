# Play — the Angler Beast opens the battlefield for a body already in base

Issue #343 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `angler-beast-ocean-drake-open-and-take`**, the Chaos ENGINE in which `UNL-132 Angler
Beast` empties a battlefield garrisoned by bodies of 2 Might or less and `VEN-115 Ocean Drake` is
played onto the open battlefield for a Conquer with no combat. The entry is right that emptying a
battlefield opens it, and right that the Drake cannot clear his own landing spot. Walked as a game,
the Drake was never needed. The cleanup that strips their Control of the emptied battlefield runs in
the same turn as the Beast. Any ready body of yours in base with 3 Might or more then walks in for
the Conquer, for no more resources. The entry prices the line at 13 Energy and 3 Power across two
turns; the walk took the battlefield for the Beast's 5 Energy and 1 Power, in one turn. Two things
the entry does not say made the Beast stronger than it reads: their tokens did not go to hand, they
ceased to exist, and the same cleanup put their facedown card in the trash.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `cdb647e`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 43 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 59 (a hit on *first*), first in the list. The other entry of this slice is rank 60,
`OGN-107 Ava Achiever` throwing `UNL-003 Mischievous Marai` into her own attack, played in
[Ava's free body lands only while she is still standing there](2026-10-14-avas-free-body-lands-only-while-she-is-still-standing-there.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Chaos among its two domains (103.1.b); here `OGN-251 Loose Cannon` (Fury/Chaos) |
| **The engine** | `UNL-132 Angler Beast` (Chaos, E5 + 1 Power, M5) |
| **The payoff, per the entry** | `VEN-115 Ocean Drake` (Chaos, E8 + 2 Power, M7) |
| **The payoff in the walk** | `OGN-175 Shipyard Skulker` (Chaos, E3, M3), ready in base |
| **Their board** | a battlefield held only by bodies of 2 Might or less |

Both entry cards are mono-Chaos, so 103.1.b admits them under any of the sixteen Chaos legends the
entry lists. Neither is in `data/legality.src.json`.

The card text the play turns on:

- Angler Beast: *"When you play me, return all units with 2 :rb_might: or less to their owners'
  hands."*
- Ocean Drake: *"You may play me to an open battlefield. When you play me, you may return a
  non-Dragon unit to its owner's hand."*
- Loose Cannon: *"At start of your Beginning Phase, draw 1 if you have one or fewer cards in your
  hand."* You never start a turn on one card in the walk, so it is idle. Its Chosen Champion has to
  carry the Jinx tag (103.2.a.2).

## 2. Open, and when

170.11.a: *"Battlefields can be “occupied.” This means they have a Unit present."* 170.11.c:
*"Battlefields can be “open.” This means they are unoccupied and uncontrolled."* The Beast makes the
battlefield unoccupied at once. Uncontrolled comes in a cleanup, 190.4.c: *"If a player has no Units
at a Battlefield and the turn is in an Open state, they lose Control of that Battlefield in the
following cleanup unless there is a Combat or Showdown ongoing there."* The step is 323.6: *"4.
Players lose control of any controlled Battlefields without their Units occupying them if the turn is
in an Open State and there is no Showdown or Combat ongoing there."*

The cleanup that follows is the one after the Beast's trigger resolves, in your own Main Phase, not
one on a later turn. So the battlefield is open while you still have the rest of your turn.

**The next step of the same cleanup is 323.7**: *"5. Recall all Unattached non-Unit Gear and non-Unit
Runes at Battlefields, and all Permanents and Runes in Bases other than their controller’s. Remove all
Hidden cards from all Battlefields that are not controlled by the same player and place them in their
owner's Trash."* Their facedown card at that battlefield goes to the trash in the cleanup that strips
their Control. The entry does not mention it.

**Their tokens do not go to hand.** 186.1: *"If a token is put into any Non-Board Zone besides the
chain, it ceases to exist immediately after moving to its new zone."* The Beast returns a card to its
owner's hand, where they can play it again. A token it reaches is gone for good.

## 3. Walking in rather than landing

355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* So nothing of yours can be played onto an open battlefield without the Drake's
permission (355.2.b). But a unit does not have to be played there. 144.4.a: *"Units may move from
their Base to a Battlefield."* A ready unit already in your base moves onto the open battlefield, and
190.3.a.1 applies: *"Units moving to or being played to a battlefield apply Contested status if that
battlefield is not already Contested and that Unit’s controller does not already control that
battlefield."* From there the path is the entry's own step 6: 323.9 stages no Combat with no
opposing units there, 344.2 opens a Showdown at the next cleanup, and 348.2.a.1 says *"This results in
a Conquer if that player has not yet scored that Battlefield this turn."*

The mover has to have 3 Might or more, or the Beast sends it to hand along with theirs. The Beast
has to be played somewhere a 2-Might body of yours is not your only unit, or you lose Control of your
own battlefield in the same cleanup (323.6 reads *"any controlled Battlefields"*, not only theirs).
Played to that battlefield, the Beast holds it with its own 5 Might.

## 4. Their order: B, and nothing at 3 Might

Mind/Order under `OGN-265 Herald of the Arcane`: *":rb_energy_1:, :rb_exhaust:: Play a 1
:rb_might: Recruit unit token."* 187.1: *"A 1 [M] Recruit token is a domainless unit token with 1
Might and the Recruit tag."* They build B wide and cheap with `OGN-211 Faithful Manufactor` (Order,
E3, M2: *"When you play me, play a 1 :rb_might: Recruit unit token here."*), the legend's Recruit and
`OGN-210 Daring Poro` (Order, E2, M2, [Assault]), and hide `OGN-213 Hidden Blade` at B. Their
Chosen Champion carries the Viktor tag and is idle.

## 5. The turns, going first

Fury/Chaos against Mind/Order. Your rune deck is six Fury and six Chaos; theirs six Mind and six
Order. Your opening four are Legion Rearguard, Shipyard Skulker, Angler Beast and a second Shipyard
Skulker; the draws are bodies for later turns. Theirs hold Faithful Manufactor, Daring Poro, Hidden
Blade and Vanguard Sergeant.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Faithful Manufactor (E3) to base, on the 485.7 extra
                rune; its Recruit to base.
T2      4       Rearguard walks to A, Conquer: +1. Shipyard Skulker       1
                (E3) to base. One rune left.
their T2        Manufactor and Recruit walk to B, Conquer. Herald (E1):
                a Recruit at B. Daring Poro (E2) to B. Hidden Blade
                hidden at B for its rainbow: an exhausted rune recycled.
                B is 2 + 1 + 1 + 2 = 6 Might. Four runes, two ready.
T3      6       Hold A: +1. Angler Beast (E5 + 1 Chaos) to A: five        3
                exhausted, one exhausted Chaos recycled. Five runes,
                one ready. Trigger: your Rearguard (A) to your hand;
                Manufactor and Poro to their hand; both Recruits cease
                to exist (186.1). Cleanup: they lose B (323.6) and the
                facedown Blade goes to their trash (323.7); you keep A,
                the Beast is there. Skulker walks base to B: Showdown,
                you have Focus, both pass, Conquer: +1.
their T3        Nothing to Hold. Six runes: Vanguard Sergeant (E4) and
                Daring Poro (E2) to base, both exhausted (143.4).
                Nothing of theirs can reach A or B this turn.
T4      7       Hold A and B: +2. Rearguard (E2) to B, the second         5
                Skulker (E3) to B. Two runes left. A: Beast 5; B:
                3 + 2 + 3 = 8.
their T4        Sergeant (4) and Poro (3 with [Assault]) attack A: 7
                against the Beast's 5. They put 5 on the Beast, your 5
                kill the Sergeant, Poro survives: Conquer A. Then
                Manufactor and its Recruit to base.
```

Their points: 1 after their T2, still 1 after their T3, 2 after their T4. After their T4 it is **5 to
2**.

**Why they could not answer the walk-in.** 345: *"As a Showdown begins, the player who applied
Contested status to the Battlefield gains Focus."* You pass with Focus and they get their turn in the
Showdown. They have two ready runes and the Order to recycle, enough for a Hidden Blade from hand
(E2 + 1 Power, [Action]), but their only Blade was the facedown one, now in the trash. Their hand is
Sergeant, the returned Manufactor and Poro, and their draws, none of them an [Action] or a
[Reaction]. 316.8.b.1.a: *"During the
proceedings of a Non-Combat Showdown, units controlled by a different player may become present at
the Battlefield where the Showdown is ongoing."* Nothing of theirs can become present: their base
was emptied by the same trigger.

**Why their T3 scored nothing.** The Beast reached their base as well as B: Manufactor and Poro were
the only bodies they had. Everything they played on T3 entered exhausted (143.4), and a Recruit
token is no exception (185.2.d: *"A token unit is a unit. It enters exhausted"*). The Beast cost them
their T3 Hold, every move on their T3, two tokens and a facedown card. It also cost you your own
Rearguard from A.

**What the six resources would have bought.** The same six runes on T3 are the second Shipyard
Skulker and another 3-drop from the draws, nothing recycled. Your one ready Skulker cannot attack B alone: 3 Might against 6 and a
facedown Blade. On their T3 they Hold B (2) and add the Sergeant there: 10 Might. On T4 your three
3-drops, 9 Might, attack 10, and the free Blade from facedown kills one: you lose the fight. **3 to
2 after your T4, with B still theirs, against 5 to 1 with the Beast.**

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **7**
cards by T3 (four opening, three draws) and **8** by T4. With the entry's one Angler Beast, the Beast
by T3 is **17.95%**; with three, **45.73%**. The entry's own line, Beast by T4 and Drake by T5 (**9**
cards seen), is **4.32%** with one of each and **26.77%** with three of each. Whether their battlefield
is held only by bodies of 2 Might or less is a property of their deck and their curve, not of the deal,
and I did not price it.

## 6. Where the Drake fits

The Drake is E8 + 2 Chaos. Going first, after the Beast's T3 recycle you have seven runes on T4 and
nine on T5. So the entry's line lands the Drake on T5 at the earliest. A ready body of theirs in
base walks into the open battlefield with 144.4.a on their very next turn, exactly as your Skulker
did. In the walk the Beast had emptied their base as well, so that turn was their T4, a turn before
the Drake could land. The Drake is the plan for a turn where you have no ready body of 3 Might or
more in base. In the walk that turn never came.

The entry's sixth notable already names `OGN-174 Sai Scout` (Chaos, E6, M5, *"You may play me to an
open battlefield."*) as the cheaper landing. A Skulker in base is cheaper again: it was paid for on T2.

## 7. Breaks to

**The cheapest break costs no card at all: keep one body of 3 Might or more in the garrison.** The
Beast returns only bodies of 2 Might or less, so a single `OGN-219 Vanguard Sergeant` (E4, M4) or
`OGN-218 Vanguard Captain` (E3 + 1 Power, M3) left at B keeps it occupied (170.11.a), never open.
The walker then meets a combat instead of a Showdown, and the facedown Blade stays at B.

**With the battlefield already open, they break the Conquer by killing the walker in the Showdown.**
348.2.a needs *"only one player’s Units remain at the Battlefield"*; if none remain, no one takes
Control. The scope: the spells in `data/corpus_flat.txt` whose domains are Mind, Order or Mind/Order,
whose text carries [Action] or [Reaction], and that say kill, deal, return, move, stun or counter. That
is 23 cards, read by hand. The cheapest that kill a Might-3 unit at a battlefield with no condition
are three resources each: `OGN-213 Hidden Blade` (Order, E2 + 1 Power, you draw 2) and `SFD-070 Wages
of Pain` (Mind, E3). `VEN-059 Shock Blast` is two resources only if they control something that is
[Empowered]. `OGN-220 Facebreaker` stuns the walker but leaves it present, so the Conquer stands. In
the walk they had two ready runes, enough for a Blade from hand, and no Blade in hand.

The three cards the entry's last notable names, `OGN-173 Ride the Wind`, `OGN-262 Zenith Blade` and
`SFD-184 Relentless Pursuit`, are Chaos, Calm/Order and Fury/Body: none is legal under a Mind/Order
legend (103.1.b).

## 8. Verdict

**Right that emptying opens, wrong that it takes the Drake.** The Beast's trigger, the loss of their
Control (323.6) and the trash of their facedown card (323.7) all land in your own Main Phase, so a
ready body of 3 Might or more in base takes the battlefield the same turn by moving there (144.4.a),
for nothing beyond the Beast's 5 Energy and 1 Power. The Drake (E8 + 2 Power) is the plan only when
no such body is in base, and it arrives a turn after the battlefield has been open to their own
walkers. The symmetry costs you every 2-Might body of yours, at your battlefield as well, and you
lose Control there too unless the Beast is played to it. Their tokens cease to exist (186.1), and the
garrison breaks it for free by keeping one body of 3 Might or more.

## 9. Not verified

I did not deal the channel order. The Beast on T3 needs one Chaos among your first six runes, which it
recycles: with six Chaos in the twelve it fails in **1 of 924 deals, 0.11%**; with four, **28 of 924,
3.03%**. The Skulkers and the Rearguard need no Power. Their side needs no domain at all in the walk:
the Herald's Recruit, Manufactor, Poro and the Sergeant are Energy only, and the rainbow to hide the
Blade is any rune. A Blade from hand in the Showdown would need one Order on their board. They had channelled five runes
by your T3 and recycled one, which they can choose to be a non-Order rune: with six Order in the twelve
the five hold none in **6 of 792 deals, 0.76%**. The probabilities in §5 count only cards in hand at the
turn named. I did not walk the Drake's bounce, the mulligan, a garrison of `187.3` Sand Soldiers
(Might 2, so also in reach), or 2v2.

## Leads

- The entry's `terminatesIn` reads *"a token garrison returned to hand"*. 186.1 makes every token the
  Beast reaches cease to exist; only cards go to hand. The Beast is a permanent answer to tokens and a
  tempo answer to cards.
- The entry's first easy prerequisite lists *"tokens, Recruits, Sprites, Birds, Tentacles"* as
  2-Might-or-less bodies. 187.2: *"A 3 [M] Sprite token with Temporary is a domainless unit token
  with 3 Might, the Fae tag, and the Temporary keyword."* A Sprite is out of the Beast's reach. Recruits
  (187.1), Birds (187.7) and Tentacles (187.10) are Might 1, and Sand Soldiers (187.3), not listed,
  are Might 2.
- The entry's fifth notable prices the line *"ACROSS TWO TURNS: 5 Energy + 1 Chaos Power to clear,
  then 8 Energy + 2 Chaos Power to take"*. A ready unit of 3 Might or more already in your base
  takes the open battlefield the same turn with a Standard Move (144.4.a, 190.3.a.1, 344.2,
  348.2.a.1), for no more resources. The Drake is needed only when there is no such body. Played a turn
  later, he lands after their own units have had a ready turn to walk in.
- No notable mentions 323.7: the cleanup that strips their Control also puts every facedown card of
  theirs at that battlefield in the trash.
- The fourth notable warns that your own small bodies go to hand. It does not say that this can cost
  you your own battlefield in the same cleanup (323.6), or that playing the Beast to that battlefield
  keeps it.
