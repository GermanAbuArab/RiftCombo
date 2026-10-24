# Play — The Memories kill the lone guard a turn late, and the spare in base walks the point back

Issue #411 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `fading-memories-maddened-marauder-hold-denial`**, the Chaos ENGINE in which `OGN-180 Fading
Memories` (E4 + 1 Chaos Power) gives an enemy unit at a battlefield [Temporary], so it dies at the start
of its controller's Beginning Phase, before scoring, and `OGN-191 Maddened Marauder` (E5, M4, [Tank])
moves a unit from a battlefield to its base when he is played. The entry is right about the rules. The
kill lands ahead of the Scoring Step, the battlefield loses its controller in the Cleanup after it, and
the Hold is gone. Its own fourth step also says what decides the point: a ready body in their base. Walked
as a game, going first, against a Calm/Body Master Yi deck, the whole plan of which is one body
defending alone, that body is always there. The Memories went on their lone `OGN-055 Wielder of Water`
on your T3, it died before their scoring, and their `OGN-054 Sunlit Guardian` walked out of base into
the empty battlefield and took the same point by Conquer: **2 to 2** after their T3. The honest control
is the same slot spent on `UNL-186 Death from Below`, the Pyke Signature at the Memories' exact cost.
It kills now, the battlefield opens on your own turn, and Pyke, who has [Ganking], walks in: **3 to 2**.
On your T4 it comes back from the trash for one rune, and the Marauder sends your own Legion Rearguard
home so it can walk into the battlefield that emptied: **5 to 3** after their T4. `OGS-003 Incinerate`
does the same for two runes, because the Wielder's +2s are combat-only and it is a 2 on your turn, and
also ends **5 to 3**, against **4 to 3** for the Memories and the Marauder. So landing before their
scoring is not an advantage over a kill in your own Main Phase. It is the same denial a turn later,
after their base has readied, and the trigger hands them the first priority of their turn with every
rune ready. The card's real property is elsewhere. It is the only mono-Chaos card that kills or banishes
an enemy unit you choose with no Might condition (damage does not count), and 14 of the 16 Chaos legends
have no other card that does. Nothing in Calm/Body saves the Wielder once the Memories resolve: a recall
keeps [Temporary] on it. The cheapest answer to the point is no card at all, a ready body in base. The
cheapest cards that save the unit tie, `OGN-045 Defy` and `UNL-106 Repulse`: each is one ready rune and
one rune recycled (Calm for Defy, Body for Repulse), held on your turn.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `dfcb3f3`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 13 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 89, the second in the list. The
other entry of this slice is rank 88, `wielder-of-water-mask-foresight-alone`. The idea that pushing a
body off a battlefield is a wash and removal is a turn was played in
[what the idle mana buys: denial is a wash, removal is a turn](2026-09-12-what-the-idle-mana-buys.md),
and the priority window a [Temporary] trigger opens in the Beginning Phase in
[the defender's chair](2026-09-13-the-defenders-chair.md). Neither is re-derived here.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-185 Bloodharbor Ripper` (Fury/Chaos, tag Pyke) |
| **Chosen Champion** | `UNL-028 Pyke, Dockside Butcher` (Fury, E3, M2, [Ganking]) |
| **The engine** | `OGN-180 Fading Memories` (Chaos, E4 + 1 Chaos Power) and `OGN-191 Maddened Marauder` (Chaos, E5, M4) |
| **The bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `SFD-018 Void Hatchling` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2) |
| **The control** | `UNL-186 Death from Below` (Fury/Chaos Signature, tag Pyke, E4 + 1 Power) and `OGS-003 Incinerate` (Fury, E2) |

The entry admits any of sixteen Chaos legends. The Ripper is the one for this walk for three reasons.
Its Chosen Champion has [Ganking], and a body that can cross from your battlefield to theirs is what
takes an emptied battlefield on your own turn. Its deck holds the strongest control there is for this
card: Death from Below is a kill with no Might condition at the Memories' own cost, and only one other
Chaos legend, the Order/Chaos one, has a kill like it (the Leads count them). And its ability, *":rb_energy_1:,
:rb_exhaust:: Return a friendly unit at a battlefield to its owner's hand. Play a Gold gear token
exhausted."*, puts the Marauder back in hand for another trigger. That last one is not walked.

Both engine cards are mono-Chaos, so a Fury/Chaos deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* Death
from Below has two domains, 103.1.b.4: *"If a card has more than one Domain, then that card is permitted
only in a Domain Identity that contains all of the indicated Domains on that card."* It is a Signature
card, and its tag is the Ripper's, 103.2.d.2: *"All of the Signature cards must have the Champion tag
that corresponds to the Champion Legend of the deck."* The deck runs three of each card it plays, 103.2.b:
*"Your Main Deck can include up to 3 copies of the same named card."* The entry lists one of each; §4
prices both. No other card in this play is a Signature card (`signature` in `data/cards.json`), and none
is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Fading Memories: *"Give a unit at a battlefield or a gear [Temporary]. (Kill it at the start of its
  controller's Beginning Phase, before scoring.)"*
- Maddened Marauder: *"[Tank] (I must be assigned combat damage first.) When you play me, move a unit
  from a battlefield to its base."*
- Pyke, Dockside Butcher: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
  :rb_energy_0:.) [Ganking] (I can move from battlefield to battlefield.) You may pay :rb_rune_fury: as an
  additional cost to play me. When you play me, if you paid the additional cost, ready me and give me +2
  :rb_might: this turn."* The walk never pays the extra cost.
- The control, Death from Below: *"Kill a unit at a battlefield. Then, if it had 3 :rb_might: or less,
  do this: You may play this from your trash for :rb_rune_rainbow:."*
- The cheaper control, Incinerate: *"[Action] (Play on your turn or in showdowns.) Deal 2 to a unit at a
  battlefield."*

## 2. When the kill lands, and what it takes

**At the start of their turn, before scoring.** 816.1.b: *"It is functionally short for "At the start of
this permanent's controller's Beginning Phase, before scoring, kill this.""* Their turn opens with the
Awaken Phase, 315.1.b: *"1. The Turn Player readies all Game Objects they control that are able to be
readied."* Then the Beginning Phase, whose first step is 315.2.a.1: *"At the start of Beginning Phase game
effects take place."* The Scoring Step comes after it, 315.2.b.2: *"1. The Turn Player Holds all
Battlefields they Control."* So the unit dies between the two, after everything of theirs has readied
and before they score.

**They act first in that window.** The trigger goes on the chain, and while it is there the turn is
closed, 309.1: *"If a Chain exists, the turn is in a Closed State."* The trigger belongs to their
permanent, so priority goes to them, 312.2.c: *"When the turn is in a Closed State, all pending chain
items finish being finalized, and they control the next item on the Chain."* Only [Reaction] plays,
309.1.a: *"Only cards and abilities with the Reaction keyword can be played or activated in a Closed
State."* Every rune they have is ready at that moment. §5 counts what that buys them.

**Then the battlefield loses its controller.** A unit leaving the board starts a Cleanup (319.6), and
its fourth task is 323.6: *"4. Players lose control of any controlled Battlefields without their Units
occupying them if the turn is in an Open State and there is no Showdown or Combat ongoing there."* With
the chain resolved there is nothing on it, 310.1: *"Neutral Open: There is no Showdown or Combat in
progress and no Chain exists."* So when 315.2.b.2 asks what they control, the battlefield is no longer
on the list. The Hold is gone.

**And the point comes back by a walk.** A battlefield they did not Hold is one they have not scored,
469.1: *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."* A unit in
their base, readied at 315.1.b, may walk to it in their Main Phase, 144.4.a: *"Units may move from their
Base to a Battlefield."* Walking into a battlefield nobody controls contests it, 190.3.a.1: *"Units moving
to or being played to a battlefield apply Contested status if that battlefield is not already Contested
and that Unit’s controller does not already control that battlefield."* No one is there, so there is no
combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* At its end they take the battlefield, 348.2.a.1: *"This
results in a Conquer if that player has not yet scored that Battlefield this turn."* One point, the same
as the Hold. What stops it is the entry's fourth step: nothing ready in base. A unit at their other
battlefield cannot cross without [Ganking], 144.4.c.1: *"Units with Ganking may use their Standard Move
to Move from Battlefield to Battlefield."* A unit they play this turn cannot move at all, 143.4: *"Units
enter the Board exhausted."*

**A kill on your own turn does the same, a turn earlier.** If the unit dies in your Main Phase, the same
323.6 strips their control in your Cleanup, and their Scoring Step finds nothing either. The difference
is whose turn the battlefield is open on. On yours, a ready body of yours can walk in and Conquer it.
Pyke can, from your own battlefield, because he has [Ganking]. The Memories' battlefield opens on their
turn, after their base has readied.

**What the keyword survives.** The Memories give [Temporary] with no duration, so it lasts while the unit
is on the board, 801.3.a.3: *"If an effect that grants a Keyword does not specify a duration, the
duration is as long as that Game Object remains on the Board or in its current Non-Board Zone."* A base
is on the board, 107.1.c: *"Permanents and Runes controlled by a player reside in that player's Base."*
So a unit moved or recalled to its base still has [Temporary], and it dies there at the next Beginning
Phase. Only a trip to a hand, a deck or the trash clears it, 124.1: *"Whenever a Game Object changes zones
to or from a Non-Board Zone, all Temporary Modifications of all kinds cease to be tracked on it in all
capacities."*

**When you can cast it.** The Memories have no [Action], so only in your own Main Phase with nothing on
the chain, 155: *"A spell can be played during an Open State outside of Showdowns on its controller's
turn."*

**The Marauder's move costs them nothing.** A unit's own walk is paid for by exhausting it, 420.3.a:
*"The Cost is Exhausting one or more Units."* The Marauder's trigger is an effect, not a walk, so the unit
it sends home is not exhausted by it, and it readies at their next Awaken anyway. He stays as a [Tank],
815.1.c.2: *"If more than one unit with Tank is present with the same controller in Combat, damage may be
assigned to any of them. Units without Tank are invalid assignments until all units with Tank have lethal
damage assigned to them."*

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4, less any you recycle. Power is paid
by recycling a rune, 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is
being Recycled."* The Memories are four runes, a Chaos one of them recycled, so you have 5 on T3 after
casting them and 7 on T4. Going second, they channel an extra rune on T1, 485.7: *"First Turn Process:
The player going second channels an extra Rune from their Rune Deck during their first Channel Phase of
the game."* They have 3, 5, 7 and 9, less what they recycle.

## 3. Their deck: Calm/Body Master Yi

`OGS-019 Wuju Bladesman - Starter` (Calm/Body): *"While a friendly unit defends alone, it gets +2
:rb_might:."* It is restricted in 2v2 (`data/legality.src.json`), which is why this walk is Constructed.
The deck's plan is a single body on its battlefield, and its best body for that is Wielder of Water
(Calm, E3, M2): *"While I'm attacking or defending alone, I have +2 :rb_might:."* Defending alone, the
Wielder is 2 + 2 + 2 = 6. On your turn, with no combat, it is a 2. Its Chosen Champion is `OGS-004 Yi,
Meditative` (Calm, E5 + 1 Calm Power, M4): *"While you have 8+ runes, I have +4 :rb_might:."* Yi is
tagged Master Yi and is not a Signature card, so he starts in their Champion Zone. Their other bodies are
Sunlit Guardian (Calm, E3, M3; *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned
combat damage first.)"*), `UNL-040 Wuju Apprentice` (Calm, E2, M2), `OGN-052 Stalwart Poro` (Calm, E2,
M2, [Shield]), `UNL-094 Gemhand Hunter` (Body, E2, M2), `UNL-102 Crowd Favorite` (Body, E3, M3) and
`VEN-024 Affectionate Poro` (Calm, E3, M3). Their [Hunt] XP never reaches the [Level 6] lines in the walk.
§5 names their answers.

## 4. The turns, going first

Fury/Chaos against Calm/Body. Your battlefield is A, `SFD-218 Sunken Temple` (*"When you conquer here
with one or more [Mighty] units, you may pay :rb_energy_1: to draw 1."*); theirs is B, `VEN-158 Heisho,
Shell of the World` (*"Players ignore [Deflect] while paying for spells and abilities choosing something
here."*). Neither matters: nobody conquers A with a Mighty unit, and nothing at B has [Deflect]. Your
opening four are Fading Memories, Legion Rearguard, Maddened Marauder and `OGN-175 Shipyard Skulker`.
Your draws are Void Hatchling (T1), Pouty Poro (T2), `OGN-018 Noxus Saboteur` (T3) and `OGN-012 Noxus
Hopeful` (T4). Their opening four are Wielder of Water, Sunlit Guardian, Wuju Apprentice and Stalwart
Poro. Their draws are Gemhand Hunter (T1), Crowd Favorite (T2), Affectionate Poro (T3) and `SFD-036
Lonely Poro` (T4).

```
turn      runes   your turn                                                 points
T1        2       Legion Rearguard (E2) to base. None left.                 0
their T1  3       Wielder of Water (E3) to base. None left.
T2        4       The Rearguard walks to A, Conquer: +1. Pyke, Dockside     1
                  Butcher (E3) from the Champion Zone to A. One left.
their T2  5       The Wielder walks to B, Conquer. Sunlit Guardian (E3)
                  and Wuju Apprentice (E2) to base. None left.
T3        6       Hold A: +1. Fading Memories (E4 + 1 Chaos Power) on the   2
                  Wielder. Void Hatchling (E2) to A. None left.
their T3  7       The Wielder dies before scoring; nothing to Hold. The
                  Guardian walks to B, Conquer. Yi, Meditative (E5 + 1
                  Calm Power) from the Champion Zone and Stalwart Poro
                  (E2) to base. None left.
T4        7       Hold A: +1. Maddened Marauder (E5) to A: the Guardian     4
                  goes to its base. Pyke walks from A to B, Conquer: +1.
                  Pouty Poro (E2) to base. None left.
their T4  8       Yi, an 8, walks to B and kills Pyke, Conquer. Crowd
                  Favorite (E3), Affectionate Poro (E3) and Gemhand
                  Hunter (E2) to base. None left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **4 to 2**; after their T4, **4 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard; 5 after the T2 draw, still 5 after
Pyke, who comes from the Champion Zone; 6 after the T3 draw, 4 after the Memories and the Hatchling; 5
after the T4 draw, 3 after the Marauder and the Poro (Shipyard Skulker, Noxus Saboteur, Noxus Hopeful).
Theirs: 5 after the T1 draw, 4 after the Wielder; 5, then 3 after T2 (Stalwart Poro, Gemhand Hunter,
Crowd Favorite); 4 after the T3 draw, 3 after Yi, who comes from the Champion Zone, and the Stalwart
Poro; 4 after the T4 draw, 1 after the three bodies (Lonely Poro).

**Their T2: the Wuju plan.** The Wielder could attack A instead: alone it is a 4, against the Rearguard
and Pyke, 2 + 2. It would kill both and die. They take empty B and leave it there alone, a 6 on defence,
and put the Guardian and the Apprentice in base. That is how this deck plays, and it is the board the
entry names: a garrison of exactly one.

**Pyke's extra cost, set aside.** Paid on your T2, the Fury rune puts Pyke in ready with +2 this turn,
and three runes pay him, a Fury one of them recycled. The rune left idle in the walk is still idle. He
could cross to empty B and take it too, **2 to 0**. But the +2 ends with your turn, and on their T2 the
Wielder, ready in their base, attacks him alone as a 4. Pyke dies, and B is theirs: **2 to 1**. You have
lost the [Ganking] body that every later line in this play uses, and a rune for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going first, with only the Channel Phase's two a turn
(315.3.b), each rune recycled is a rune short on every turn through T6, until the Rune Deck runs dry
(161.2.a); a card that channels more (430.2) brings it back sooner. The walk ends after their T4, so the
count stands for every turn it covers. The wording above is kept as history.]
The Memories on T3
then leave you one rune, the Hatchling never reaches A, and their Guardian and Apprentice, 3 + 2, can take
A from the lone Rearguard. The walk leaves the cost unpaid and keeps Pyke at A.

**Your T3: the Memories, because nothing can attack.** Pyke can cross to B, but alone he is a 2 against
the Wielder's 6. Four of the six runes pay the Memories, a Chaos one of them recycled. That leaves
five runes, two of them ready, and the Hatchling goes to A. A is now the Rearguard, Pyke and the
Hatchling, 6, so the Guardian and the Apprentice, 3 + 2, cannot take it on their turn. They spent all
five runes on their T2, so none is ready to answer the Memories now.

**Their T3: the window, and nothing to play in it.** Their five runes ready at 315.1.b. The trigger goes
on the chain and they have priority with all five, but their hand is the Stalwart Poro, Gemhand Hunter
and Crowd Favorite, and none has [Reaction]. The Wielder dies. B loses its controller in the Cleanup, and
the Scoring Step finds nothing to Hold. Then their Main Phase: the Guardian, played on their T2 and ready
now, walks into empty B and takes it, 348.2.a.1. **2 to 2.** The entry's denial cost them the Hold and
not the point. Five of their seven runes pay Yi, a Calm one of them recycled, which leaves six, and the
last two pay the Stalwart Poro. The Guardian is alone at B, a 6 on defence (3, +1 [Shield], +2).

**Your T4: the Marauder's clock.** Your runes are 5 + 2 channelled = 7. You Hold A. The Guardian is a 6
on defence, and your bodies that can reach B are Pyke, a 2. So the Marauder goes to A and his trigger
sends the Guardian to their base. B is empty, and the Cleanup takes it off their list (323.6). Pyke, ready
at A, walks to B, and it is yours: **4 to 2.** Their runes are all spent, so nothing answers the trigger
or the walk. Two runes are left for the Poro.

**Their T4.** Eight runes, so Yi is a 4 + 4 = 8. He walks into B, and Pyke's 2 does not kill him: **4 to
3.** A is the Rearguard, the Hatchling and the Marauder, 8, and the Marauder must take lethal damage first
(815.1.c.2), so they leave it. Their three new bodies enter exhausted.

**The control: Death from Below.** The same hand with Death from Below in the Memories' place, cast in the
same slot on your T3, is the same four runes with one recycled. It kills the Wielder now. B has no unit of
theirs, and your own Cleanup strips their control. Pyke crosses from A and takes it: **3 to 1** after
your T3, and the last two runes put the Hatchling on A. On their T3 there is nothing to Hold. The
Guardian walks into B and kills Pyke, 3 against 2, and takes the 2 damage, which is not lethal: **3 to
2**. They play Yi and the Stalwart Poro as before. On your T4 you Hold A, **4 to 2**, and Death from
Below comes back. The Wielder had 2 Might, so the card may be played from your trash for one rune
recycled, and it kills the Guardian, a 3 on your turn. B is empty again, and six runes are left, all
ready. The Marauder's trigger is not limited to enemy units: *"move a unit from a battlefield to its
base."* Played to A, he sends your own Legion Rearguard home. The Rearguard has not moved since your T2,
so it is ready, and the move is an effect, which exhausts nothing (420.3.a is the cost of a unit's own
walk). It walks from base into empty B (144.4.a) and takes it: **5 to 2**. One rune is left, and nothing
in hand costs one. On their T4, Yi walks into B and kills the Rearguard: **5 to 3**. A is the Hatchling
and the Marauder, 6, and their two ready bodies are 2 + 2, so they leave it. That is a point ahead of
the Memories' line, with their Guardian dead, and Death from Below still in the trash for one rune. Its
Guardian kill had 3 Might, so the card stays playable from there.

**The cheaper control: Incinerate.** The Wielder's two +2s are both for combat: the Wielder's own needs
it to be attacking or defending, and the legend's needs it to defend. On your turn it is a 2, and
Incinerate deals 2, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that
Unit’s Might."* So on your T3 two runes kill it, Pyke takes B (**3 to 1**), and four runes put the
Hatchling on A and the Pouty Poro in base. Nothing is recycled. Their T3 is the same Guardian into Pyke:
**3 to 2**. On your T4 you have 8 runes. You Hold A, the Marauder sends the Guardian home, and the Poro
walks from base into empty B: **5 to 2**, and three runes put the Skulker in base. Yi takes B back on
their T4: **5 to 3.** The plain two-rune card ends a point ahead of the Memories.

**The Marauder first.** Played on your T3 instead of the Memories, the Marauder sends the Wielder home and
Pyke takes B: **3 to 1**. The Wielder is ready in their base, and on their T3 it walks back in alone and
attacks, a 4 against Pyke's 2: **3 to 2**. That is the Death from Below score, and the Marauder stays on A
as a 4 with [Tank]. On this board the Marauder is the better of the entry's two cards, because his clock
runs on your turn, and a body of yours can use the battlefield he empties. Here B is occupied when he
arrives, as it is on your T4 in the Memories' line and the Incinerate line, so his move has to go on the
enemy. Only where B is already empty, as in the Death from Below line, is moving your own unit the better
use. The entry calls him *"THE SAME DENIAL
ON A DIFFERENT CLOCK"*. On your clock the empty battlefield is a Conquer for you; on the Memories'
clock, theirs, it is a Conquer for them.

**When the Memories do take the point.** Only when their base is empty at the start of their turn and
nothing at their other battlefield has [Ganking]. Their T2 hand was five units. Anything played to base is
ready on their T3, and anything played to B, which they controlled after the Wielder's Conquer (355.2.a:
*"By default, Valid locations include the controller’s Base or a Battlefield the controller controls."*),
means the Wielder is not alone and the Memories kill one of two. With this hand, the only T2 that lets the
denial land is playing nothing.

**The board only the Memories answer, outside this deck.** On their T4 Yi stands at B with eight runes
behind him: an 8, and a 10 on defence. Death from Below kills him on your T5 from your trash, for one rune
in the control line, because its last kill had 3 Might. In a Fury/Chaos deck without the Ripper, the
Memories are the only card that kills him. The largest printed damage in Fury and Chaos is 6, from
`OGN-033 Shakedown`, and they may refuse that by letting you draw 2. Damage that scales with something
else is not counted here. He
still dies a turn late, at the start of their T5, and the bodies in their base walk B back.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a
unique name."* Going first, you have seen **7** cards by T3. With three Memories, at least one is among
them in **45.73%** of games; with the entry's one copy, **17.95%**. The Marauder by T4, out of 8 cards
seen: **50.82%** with three, **20.51%** with one. Three of each, both on time: **21.71%**.

## 5. Breaks to

**What the engine did, and the predicate.** The Memories killed the Wielder before their scoring and took
B off their list for the Scoring Step. The predicate is: cast or played in answer to the Memories on your
T3, or in their Beginning Phase window, does it keep the Wielder alive, or keep a unit of theirs at B
through their Scoring Step?

**The free answer is already in the walk.** A ready body in base. It does not keep the Hold, but it takes
the same point back by Conquer in their Main Phase. That costs them no card and no rune, only that they
did not commit every body.

**The scope.** A Calm/Body deck plays only Calm, Body and Calm/Body cards (103.1.b), and its Signature
cards must carry its legend's tag (103.2.d.2). The predicate is: a card in `data/cards.json` whose domains
are all Calm or Body (tokens carry no domain), not a legend, battlefield or rune, and not a Signature card
with another champion's tag. Folded by name, that is **253** cards. Of the four Signature cards in those
domains, two carry another tag and are out (`OGN-258 Dragon's Rage`, `SFD-194 Counter Strike`); Master
Yi's `OGS-020 Highlander` and `UNL-192 Alpha Strike` are in. None of the 253 is banned.

**Both windows are closed states.** In answer to the Memories on your turn, and in the trigger window on
theirs, only [Reaction] plays (309.1.a). **42** of the 253 have [Reaction], [Hidden] or [Ambush] in their
text (the regex `\[(Reaction|Hidden|Ambush)\]`, case-insensitive, on the whole text with reminder text
left in). That is a ceiling: it includes gear whose [Reaction] is an ability on the board. **Thirteen
break the line**, and none of them in the walk.

On your T3, in answer to the Memories, a counter is the only thing that saves the Wielder for good. Six
reach it, and every one needs a ready rune, which the walk left them none of:

- **`OGN-045 Defy`** (Calm, E1 + 1 Calm Power): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than
  :rb_rune_rainbow:."* The Memories are exactly 4 and 1. **One ready rune and one Calm recycled**, which
  means holding back a rune on their T2, the Apprentice.
- **`UNL-106 Repulse`** (Body, E1 + 1 Body Power): *"Choose a friendly unit at a battlefield. Counter an
  enemy spell or ability that chooses it and no other friendly unit."* The same price, with a Body rune.
- `SFD-045 Not So Fast` (Calm, E2 + 1), `OGN-064 Wind Wall` (Calm, E3 + 2), `UNL-044 Flurry of Feathers`
  (Calm, E4 + 2, its first mode) and `OGN-080 Mystic Reversal` (Calm, E4 + 3, which takes the Memories
  and can put them on one of your units at A).

In their Beginning Phase window, nothing is left to counter: the trigger is their own permanent's
ability, and Not So Fast and Repulse counter only an enemy one. What breaks the line there is a second
unit at B before the Wielder dies. It keeps B theirs through the Scoring Step, and the Hold is kept.
Eight do it, one of them a card already counted above:

- **`VEN-034 Resonating Strike`** (Calm, E2 + 1 Calm Power): *"Choose a battlefield you control and a
  unit you control at a different location. Move that unit to that battlefield and give it +2 :rb_might:
  this turn."* The Guardian goes from base to B. **Two runes, one Calm recycled**: the cheapest from hand.
- `SFD-053 Janna, Savior` (Calm, E3 + 1), whose [Reaction] reaches *"a battlefield you control"*.
- `UNL-114 Nidalee, Cat Form` (Body, E3 + 1), `UNL-120 Rengar, Trophy Hunter` (Body, E5 + 1) and
  `UNL-060 Vilemaw` (Calm, E8 + 2, more runes than they have) by [Ambush], 822.1.b: *"It is functionally
  short for "I may be played to a battlefield where you control Units" and “I have [Reaction] as long as
  I’m being played to a battlefield where you control Units.”"*
- Flurry of Feathers again, by its second mode, four 1-Might Birds.
- `OGN-135 Pakaa Cub` and `SFD-111 Here to Help` only from facedown at B. Hiding costs one rune recycled
  on their T2, after the Conquer, 811.1.b: *"you may pay [A] to hide this facedown at a battlefield you
  control"*, and from facedown either one lands at B (811.1.d.3) for no Energy. Resonating Strike can be
  hidden the same way.

**But none of the eight changes the score.** Each keeps the Hold, and in the walk the Guardian took the
same point by Conquer. What they save is the Guardian's walk. With five ready runes in the window, five of
them are live from hand (Resonating Strike, Janna, Nidalee, Rengar, Flurry of Feathers). Death from Below
and Incinerate never give them that window, because they resolve on your turn, when the walk has them at
zero ready runes.

**What does not break it.** `OGS-020 Highlander` (E4) and a hidden `OGN-077 Zhonya's Hourglass` both
recall the Wielder instead of letting it die. A recall leaves it on the board (107.1.c), so it keeps
[Temporary] (801.3.a.3) and dies at the start of their next turn. They buy one turn and keep B for none of
it, because a recalled unit is not at B. `SFD-043 Emperor's Divide` moves it to base, with the same
result. No Calm/Body card returns a friendly unit to hand at [Reaction] speed, which is the one move that
would clear the keyword (124.1). The other 26 pump Might, draw, add resources or stun, and the Memories
deal no damage and fight no one.

**On the Marauder.** Not So Fast and Repulse also counter his trigger, which chooses the Guardian. On your
T4 their runes were all spent on Yi and the Stalwart Poro.

## 6. Verdict

**Right about the rules; it denies the Hold, and the walk got the point back.** 816.1.b lands the kill
before 315.2.b.2. 323.6 takes the battlefield off their list in the Cleanup after it, and the Hold is gone.
The entry's fourth step says what decides the point, and against a Wuju deck, whose plan is one body at B
and the rest at home, a ready body in base is always there. The Guardian walked into empty B and took the
same point by Conquer: **2 to 2** after their T3. Death from Below in the same slot, at the same four
runes and one Power, kills on your turn. The battlefield opens while you can use it, and Pyke takes it:
**3 to 2**. On your T4 the card comes back from the trash for one rune, kills the Guardian, and the
Marauder sends your own Rearguard home to walk into the emptied B. That is **5 to 3** after their T4, a
point ahead of the Memories' **4 to 3**. Incinerate does it for two runes, because the Wielder is a 2 outside combat,
and ends **5 to 3**. Landing inside their Beginning Phase is the same denial a turn late. By then their
base has readied, and the trigger window opens with all their runes ready. The Marauder, on your own
clock, did as well as Death from Below by their T3. What the Memories have that no other mono-Chaos card
has is a kill or banish of a chosen enemy unit with no Might condition. They kill Yi at 8 Might, and 14 of
the 16 Chaos legends have no other card that does. Once they
resolve, nothing in Calm/Body saves the Wielder for more than a turn. Eight cards keep the Hold, the
cheapest Resonating Strike at two runes, and none of them changes the score. The cheapest cards that save
the unit tie: Defy and Repulse, on your turn, each for a ready rune held back and a rune recycled (Calm
for Defy, Body for Repulse).

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos runes for you, the Ripper's two
domains, in the twelve of Tournament Rules 402.1. The Memories on T3 need a Chaos among the six
channelled: it fails in **1 of 924 deals, 0.11%**. Death from Below's Power symbol is not in
`data/cards.json` (`power: 1`, with no domain). If it is Fury or Chaos, it fails in the same **1 of 924**;
if it is any domain, **0 of 924**. Its replay from the trash is :rb_rune_rainbow:, **0 of 924**. Pyke
(the extra cost unpaid), the Marauder, Incinerate and the bodies need no Power.

Their walk assumes six Calm and six Body. Yi on their T3 needs a Calm among their seven: **0 of 792**. In
the Beginning Phase window they have five runes, because channelling comes after it (315.3). Resonating
Strike and Janna need a Calm among the five: they fail in **6 of 792 deals, 0.76%**. Nidalee and Rengar
need a Body, also **6 of 792**. Defy on your T3 needs a Calm among the same five, **6 of 792**; Repulse a
Body, **6 of 792**. Highlander needs no Power.

**How likely an answer is.** In the window they have seen **6** cards of their own **39**: four opening
and a draw on each of their first two turns. Their T3 draw comes after the window (315.4). One answer in
three copies is among them in **40.30%**; two answers (six cards), **66.05%**; three (nine cards),
**81.80%**. These count only the cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Where the Birds of Flurry of Feathers
go is taken from [the defender's chair](2026-09-13-the-defenders-chair.md), not re-derived. Not walked:
going second, the mulligan, 2v2, a gear as the target, the Ripper returning the Marauder to hand for a
second trigger, and the Memories on Yi at 8 runes beyond the prose of §4.

## Leads

- The name, *"816.1.b is the only effect that lands inside the OPPONENT's Beginning Phase before their
  Scoring Step"*, and the notable *"THIS IS THE MIRROR OF THE LOCK PROBLEM"*: true, but a kill in your
  own Main Phase strips their control at your own Cleanup (323.6), so it denies the same Hold a turn
  earlier. It also opens the battlefield on your turn, for a body of yours. Landing in their Beginning
  Phase is a cost, not a property. Their base has readied by then, and the trigger gives them priority
  first (312.2.c) with every rune ready (315.1.b). In the walk, `UNL-186 Death from Below`, at the
  Memories' exact cost, and `OGS-003 Incinerate` on a 2-Might `OGN-055 Wielder of Water` both ended a
  point ahead after their T3 and after their T4, **5 to 3** against **4 to 3**.
- `terminatesIn` (*"one Hold and one battlefield denied per Fading Memories"*) and `netPerIteration`
  (*"one enemy Hold cancelled and one battlefield opened"*): the Hold yes, the point only when their base
  holds nothing ready. The entry's own fourth step says so. Walked against a Master Yi deck, a ready
  Sunlit Guardian took B back by Conquer the same turn, **2 to 2**.
- `prerequisites.easy` (*"A battlefield the opponent controls with a garrison of exactly one"*): it also
  needs nothing of theirs ready in base, and nothing with [Ganking] at the other battlefield. With five
  units in hand on their T2, the only line that met both was playing nothing.
- The notable *"THE MARAUDER IS THE SAME DENIAL ON A DIFFERENT CLOCK"*: on your clock it is a Conquer
  for you, if a body of yours can reach the battlefield he empties (Pyke's [Ganking] in the walk). Played
  on T3 instead of the Memories, he ended their T3 **3 to 2**, against the Memories' 2 to 2. His victim
  stays ready in base, as 420.3.a has it. The trigger reads *"move a unit from a battlefield to its base"*,
  so it also moves your own unit: with the battlefield already empty, it sends a ready body of yours home
  to walk in.
- Not stated, and worth stating: the Memories are the only mono-Chaos card whose own effect kills or
  banishes a chosen enemy unit with no Might condition. Damage does not count, so `OGN-268 Bullet Time` is
  out. Swept on 2026-10-18 over every card name in `data/cards.json` for *kill* or *banish*, then read by
  hand. The predicate is *kills or banishes an enemy unit the caster chooses, as the card's own effect,
  with no Might condition and no friendly-only target*. It finds seven names: `OGN-180 Fading Memories`
  (Chaos), `UNL-186 Death from Below` (Fury/Chaos, Pyke Signature), and five Order cards, `OGN-213 Hidden
  Blade`, `OGN-229 Vengeance`, `OGS-012 Blast of Power`, `SFD-164 Drag Under` and `OGN-234 Harnessed
  Dragon`. Three more kill without the caster choosing: `UNL-180 The Ruination` (Order, *"Kill all
  units."*), `OGN-237 King's Edict` (Order, the opponent chooses which of their units dies) and `VEN-090
  Cataclysmic Duel` (Body, each player keeps one unit of their choice). With those ten, it is still the
  only mono-Chaos member. `OGN-254 Noxian Guillotine` kills now only under [Legion], a condition, so it is
  left out. It is Fury/Order, so no Chaos legend can play it either way. Counted over the 16 Chaos legend
  names: on the seven, 14 have no other member, and the exceptions are Bloodharbor Ripper (Death from
  Below) and Heart of the Tempest (the Order cards). On the ten, 11 have none, because Cataclysmic Duel
  adds the three Body/Chaos legends, Bounty Hunter, Battle Mistress and Voidreaver.
- Not stated: a recall or a move to base does not save the target, because a keyword granted with no
  duration lasts while the unit is on the board (801.3.a.3), and a base is on it (107.1.c). Calm/Body has
  no [Reaction] return to hand, so `OGS-020 Highlander` and `OGN-077 Zhonya's Hourglass` buy one turn.
  The answers that keep the unit are counters on your turn: `OGN-045 Defy` (E1 + 1 Calm, its ceiling
  exactly the Memories' 4 and 1) and `UNL-106 Repulse` (E1 + 1 Body) are the cheapest.
