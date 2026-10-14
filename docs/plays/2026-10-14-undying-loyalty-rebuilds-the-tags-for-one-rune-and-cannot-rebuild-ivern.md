# Play — Undying Loyalty rebuilds the tags for one rune, and the one card it cannot rebuild is Ivern

Issue #362 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `starhound-undying-loyalty-four-tag-recursion`**, the mono-Order ENGINE in which
`UNL-168 Undying Loyalty` plays a Bird, Cat, Dog or Poro from your trash for 1 Order Power and
`UNL-167 Starhound` returns one to your hand, so the four tags that `UNL-177 Ivern, Friend to All`
reads come back after the bodies die. Walked as a game, the recursion did its job. On T3 and T4 two
Undying Loyalty, one rune each, put a Bird and a Poro back. With Starhound as the Dog, Ivern's T4
conquer scored his extra point, and without the two spells the same hand had no Poro on the board
for it. Then on their T4 one Energy of `OGN-004 Cleave` on an attacker killed Ivern, and neither half
of the recursion can bring him back: he costs E6, and in the trash he has no Bird, Cat, Dog or Poro
tag. The entry is right about the cost and the ceiling. It is wrong that the recursion carries the
condition through a sweeper, because Undying Loyalty is cast only in your Main Phase, after your
Hold. The cheapest break is the payoff, not the tags: one rune and two bodies.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `0c981b5`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 31 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 73 (a hit on *first*), second in the list. The other entry of this slice is rank 72,
`warden-saboteur-hidden-lock` (`OGN-070 Mageseeker Warden` with `OGN-018 Noxus Saboteur`), played in
[The Warden keeps their battlefield small, and the Saboteur deletes one hidden card until a Gust](2026-10-14-the-warden-keeps-their-battlefield-small-and-the-saboteur-deletes-one-hidden-card-until-a-gust.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-195 Green Father` (Calm/Order) |
| **The payoff** | `UNL-177 Ivern, Friend to All` (Order, E6, M6), the Chosen Champion |
| **The engine** | `UNL-168 Undying Loyalty` (Order, E2 + 1 Power, spell), `UNL-167 Starhound` (Order, E5 + 1 Power, M6, Dog) |
| **The bodies** | `OGN-216 Soaring Scout` (Order, E2, M1, Bird), `OGN-210 Daring Poro` (Order, E2, M2, Poro), `SFD-159 Trusty Ramhound` (Order, E2, M2, Dog), `VEN-132 Fallen Feline` (Order, E2 + 1 Power, M3, Cat) |

Ivern carries the Ivern tag and is a champion unit, so 103.2.a.2 lets him be the Chosen Champion of a
Green Father deck: *"Must be a champion unit with a champion tag that matches the tag on your Champion
Legend."* He starts in the Champion Zone and is played from there, 108.3.d: *"The Chosen Champion can
be played from here as normal, following the rules of Playing a Card."* 103.2.b.1 counts him among
the three copies of his name: *"This includes your Chosen Champion."* So two more Ivern can sit in the
Main Deck. None of these cards is Signature (`data/cards.json`) or in `data/legality.src.json`.
`UNL-196 Daisy!` is the other four-tag payoff; it is Signature, and this walk does not run it.

The card text the play turns on:

- Undying Loyalty: *"This costs :rb_energy_2: less if you choose a Bird, Cat, Dog, or Poro. Play a
  unit with cost no more than :rb_energy_2: and no more than :rb_rune_rainbow: from your trash,
  ignoring its cost."*
- Starhound: *"When you play me, return a Bird, Cat, Dog, or Poro from your trash to your hand."* He
  is a Dog himself.
- Ivern, Friend to All: *"As you play me, choose Bird, Cat, Dog, or Poro. I gain that tag. When I
  conquer or hold, score 1 point if your units have all of the following tags among them — Bird, Cat,
  Dog, and Poro."*
- Soaring Scout: *"[Deathknell] — Channel 1 rune exhausted. (When I die, get the effect.)"*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*
- Fallen Feline: *"When you play me, name a spell. While I'm at a battlefield, opponents can't play
  spells with that name."*

**Order prints all four tags inside Undying Loyalty's ceiling.** Over `data/cards.json`, Calm, Order
and Calm/Order units with a Bird, Cat, Dog or Poro tag at printed E2 or less and 1 Power or less are
nine names: Soaring Scout (Bird); Trusty Ramhound (Dog); Daring Poro, `OGN-052 Stalwart Poro`,
`SFD-036 Lonely Poro` and `VEN-029 Ol' Poro` (Poro); Fallen Feline, `UNL-036 Mutated Mouser` and
`VEN-043 Steel Paws` (Cat). The Order ones are Scout, Ramhound, Daring Poro and Fallen Feline, one of
each tag. The colourless `UNL-T02 Bird` is a token and never reaches the trash (185, 186.1). Ivern
supplies one tag himself.

## 2. What the recursion costs, where it lands, and when it can be cast

**The discount is real, and it reads the body you play.** The trash is public, 355.10.a.1: *"Public
zones are Battlefield Zones, Bases, Trashes, Legend Zones, Champion Zones, and Facedown Zones."* So the
unit Undying Loyalty plays from it is a target, and the target is chosen in step 2 of playing the
card, 355.5: *"If a card requires you to specifically choose one or more Game Objects, that choice is
made now."* The cost comes after it, in step 3, and 356.4.a: *"Discounts may be applied by the card
being played or by any other card or effect."* Choosing a tagged body makes it E0 + 1 Order Power.
With no unit in your trash at printed E2 or less and 1 Power or less, the spell cannot be cast at
all, 355.8: *"In order to put a spell or ability on the chain, valid choices must be made for all
targets."* The ceiling reads the printed cost, 206: *"Effects that need to determine a card’s cost
for any purpose always use its printed or copied cost, even if that cost is increased, decreased, or
ignored as the card is played."*

**The Power needs no Energy.** A rune's two abilities are separate, 164.2.b: *"Recycle this:
[Reaction] — Add [C]."* Recycling asks no ready rune, so a rune you exhausted for Energy earlier in the
turn pays it. In the walk Undying Loyalty never costs a rune of Energy; it costs one rune off the
board.

**The body enters exhausted, at base or at a battlefield you hold.** The play is free, 356.1.b.1:
*"If a card allows a player to play a card "ignoring its cost," its base Energy cost and base Power
cost are set to zero."* It goes where 355.2.a allows: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* And 359.2.c: *"If it is a Unit, it
enters the Board exhausted at the Location that was chosen."* Ivern's condition reads *"your units"*,
with no location, so a tag in base counts as much as one at a battlefield.

**It is cast only in your Main Phase, after your Hold.** Undying Loyalty has neither [Action] nor
[Reaction], so 310.1.a holds it: *"By default, cards can be played and abilities activated only when
a player has priority on their turn in a Neutral Open state."* On your turn the Hold comes first,
315.2.b.2: *"1. The Turn Player Holds all Battlefields they Control."* The Main Phase starts after
that, 316.1: *"When all steps of the Start of Turn have been completed, the Main Phase begins."* A tag
body killed on their turn is missing when Ivern's hold trigger resolves, whatever your trash holds.
The rebuild reaches a Conquer the same turn, or the Hold of the turn after.

**Ivern's tag check is made on resolution.** His *"if"* comes after the effect verb, not right after
the trigger, so it is not part of the condition, 383.2.a.1: *"Any additional conditional statement
immediately after the Condition must be true in order for the Condition to be fulfilled."* Riot's own
second example there is `OGN-251 Loose Cannon`, whose *"if"* sits in the same place and is called
part of the effect. A tag removed while Ivern's trigger waits on the chain costs the point.

**Ivern is outside both halves.** A card that dies is a new object, 124: *"A Game Object that changes
zones to or from a Non-Board Zone becomes a new object for the purposes of tracking that object."* In
the trash Ivern carries his printed tags, Ivern and Ionia, not the one he chose, so Starhound cannot
return him. Undying Loyalty cannot either, since he costs E6. The Champion Zone does not take him back,
108.3.c: *"The Chosen Champion cannot be returned to this zone by normal means."*

## 3. Their deck: Fury/Chaos, bodies and cheap spells

`OGN-251 Loose Cannon` (Fury/Chaos): *"At start of your Beginning Phase, draw 1 if you have one or
fewer cards in your hand."* In the walk they start each of their turns with two cards or more, so
it draws nothing. Its Chosen Champion is `OGN-030 Jinx, Demolitionist`, unplayed here. They play
`OGN-175 Shipyard Skulker` (Chaos, E3, M3, no text), `OGN-010 Legion Rearguard` (Fury, E2, M2),
`OGN-006 Flame Chompers` (Fury, E3, M3), and `OGN-004 Cleave` (Fury, E1): *"[Action] (Play on your
turn or in showdowns.) Give a unit [Assault 3] this turn. (+3 :rb_might: while it's an attacker.)"*
§5 names the other spells that answer the line.

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your battlefield is G; theirs is B. Your opening four are Soaring
Scout, Daring Poro, Trusty Ramhound and Undying Loyalty. Your T1 draw is Fallen Feline, your T2 draw
Starhound, your T3 draw a second Undying Loyalty, and your T4 draw a card the walk does not use.

```
turn    runes   your turn                                                 points
T1      2       Soaring Scout (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base. Three runes, none left.
T2      4       The Scout walks to G, Conquer: +1. Daring Poro (E2) and   1
                Trusty Ramhound (E2) to base. No runes left.
their T2        The Skulker walks to G: 3 against the Scout's 1. The
                Scout dies, and its Deathknell channels you a rune,
                exhausted. Conquer G. A second Skulker (E3) and Legion
                Rearguard (E2) to base. Five runes, none left.
T3      7       Ivern from the Champion Zone (E6), choosing Cat, to       2
                base: six runes exhausted. Undying Loyalty choosing the
                Scout in your trash: E0 + 1 Order Power, one exhausted
                rune recycled. The Scout to base. The Poro and the
                Ramhound walk to G: 6 against the Skulker's 3. The
                Ramhound and the Skulker die. Conquer: +1. One rune
                ready, six on the board.
their T3        The Rearguard walks to B, Conquer. The second Skulker
                walks to G: 3 against the Poro's 2. The Poro dies.
                Conquer G. A third Skulker (E3) and a second Rearguard
                (E2) to base. Seven runes, two left.
T4      8       Starhound (E5 + 1 Order Power, five runes exhausted,      4
                one of them recycled) to base, returning the Ramhound
                to hand. The second Undying Loyalty choosing the Poro,
                one exhausted rune recycled: the Poro to base. Ivern
                walks to G: 6 against the Skulker's 3. Conquer: +1, and
                Ivern's trigger: +1. Fallen Feline (E2 + 1 Order Power)
                to G, naming Hextech Ray. One rune ready, five on the
                board.
their T4        Hold B. The third Skulker and the second Rearguard walk
                to G. Cleave (E1) on the Skulker: 6 + 2 = 8 against
                Ivern's 6 and the Feline's 3. Ivern dies and the Feline
                takes 2; your 9 kill both. G stays yours. Flame
                Chompers (E3) to base. Nine runes, five left.
```

Their points: 0 after their T1, 1 after their T2, 3 after their T3, 4 after their T4. After their T4
it is **4 to 4**.

**Your T3, what the first Undying Loyalty buys.** The Scout's Deathknell made the board seven runes
instead of six. Ivern takes six of them, and Undying Loyalty recycles one of the six he exhausted, so
the Scout comes back for no Energy at all. That is the entry's *"the first trip pays for itself"*, and
it holds. Ivern chooses Cat, because Bird, Dog and Poro are already on the board. In the attack on G
the Ramhound is a 3 (the Poro is there with it) and the Poro a 3 ([Assault]), and the Skulker's 3
goes on the Ramhound: 465.2.c,
*"Starting with the Attacker, each player assigns an amount of damage equal to their summed Might
among the other's Units."* Your 6 kill the Skulker, and G is yours, 466.5.d: *"Establishing Control
results in a Conquer if that player has not yet scored this Battlefield this turn."*

**Their T3, two conquers.** B is empty, so the Rearguard walks in and conquers it with no fight. The
second Skulker kills the Poro at G and conquers G. A unit at a battlefield cannot reach the other one
without [Ganking], 144.4.c.1: *"Units with Ganking may use their Standard Move to Move from
Battlefield to Battlefield."* So their Rearguard stays at B for the rest of the walk.

**Your T4, where the recursion pays.** The Bird (Scout) is in base and the Cat is on Ivern. Starhound
is the Dog and returns the Ramhound to hand; the second Undying Loyalty puts the Poro back in base.
Both go first, because the tag check comes on resolution of Ivern's trigger (383.2.a.1). Ivern walks
to G, kills the Skulker and conquers it, and his trigger finds all four tags: **+2**. The Feline goes
to G only after the conquer, since 355.2.a needs a battlefield you control. It names Hextech Ray, so
they cannot play the 1-rune spell that would put 3 on Ivern.

**Without the two Undying Loyalty, the same hand stops at 3 to 3.** On T3 Ivern still comes down, and
the Scout stays in the trash, and with nothing recycled T4 has nine runes. They buy Starhound (five),
the Scout he returns (two) and the Feline (two). That is Bird, Dog and Cat. The Poro is in the trash, the Feline is a second Cat, and Ivern's
trigger scores nothing. The two spells cost two runes off the board and no Energy, and they bought
exactly one point.

**Their T4, the payoff dies.** They Hold B: 4. Ivern was healed at the end of your turn (143.3.b.1),
so he is a 6 again, beside the Feline's 3. The third Skulker and the second Rearguard walk in. Cleave
needs no Power and is not the spell the Feline named. The Skulker is a 6 while it attacks, and their 8
go 6 on Ivern and 2 on the Feline, 465.2.c.3: *"Units must have lethal damage assigned to them in full
before damage is assigned to a different Unit."* Your 9 kill the Skulker (6) and the Rearguard (2).
The Feline survives, so G stays yours, and they score nothing there.

**After the walk.** On your T5 you Hold G: 5 to 4. No trigger fires, because Ivern is in the trash.
Bird, Dog and Poro are on the board and the Feline is a Cat, so all four tags stand, and no card on
your side reads them. Neither half returns Ivern (§2). The two Ivern left in the Main Deck are the way
back: at least one among the 9 cards seen by T5 is **41.30%** before the game (39-card pile). In this
walk, whose first 8 cards held none, it is the T5 draw alone: 2 of 31, **6.45%**.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Ivern is therefore always available.
Going first you have seen **7** cards by T3 and **8** by T4 (four opening, one draw a turn). With three
copies of each card (103.2.b): an Undying Loyalty among the first 7 is **45.73%**, two among the first
8 is **10.11%**, a Starhound among the first 8 is **50.82%**, and the walk's whole draw (two Undying
Loyalty, a Starhound and a Fallen Feline among the first 8) is **1.66%**. That counts only those
cards. The walk also needs three 2-drops by T2. On their side, Cleave among the 8 cards they have
seen by their T4 (four opening, four draws) is **50.82%**.

## 5. Breaks to

**The cheapest break is the payoff: one rune and two bodies.** Ivern is a 6 at G. Five Might of
attackers kill him once anything adds 1. Scope: the Fury, Chaos and Fury/Chaos spells in
`data/cards.json` that cost one rune (at most E1 and at most 1 Power), eight by base code. Five break
it in the walk's T4 position:

- `OGN-004 Cleave` (E1), *"Give a unit [Assault 3] this turn"*, the one walked above. `SFD-003 Blood
  Rush` (E1): *"[Action] (Play on your turn or in showdowns.) [Repeat] :rb_energy_1: (You may pay the
  additional cost to repeat this spell's effect.) Give a unit [Assault 2] this turn."* Their 7 put 6 on
  Ivern. `UNL-010 Vault Breaker` (E1 + 1 Power) gives [Assault 2] and [Ganking], so the Rearguard at B
  can join as well.
- `OGN-009 Hextech Ray` (E1 + 1 Power): *"[Action] (Play on your turn or in showdowns.) Deal 3 to a unit
  at a battlefield."* The Feline named it here. Without the Feline at G, it is the break.
- `UNL-014 Monster Harpoon` (E1 + 1 Power), 2 to a unit at a battlefield: their 5 then need only 4.
- The other three do not. `OGN-169 Gust` returns a unit of 3 Might or less, and Ivern is a 6.
  `VEN-015 Decree of Rage` hits only a Calm unit, and every unit in the walk is Order.
  `VEN-107 Decree of Discord` returns Order units of total Might 5 or less, which can never include
  Ivern.

If they run three copies of one of the five, it is among their 8 cards by their T4 in **50.82%**; with
two of them (six cards), **77.43%**; with four (twelve), **96.39%**. Each is 8 of 39.

**The cheapest answer to the recursion itself is `VEN-107 Decree of Discord` (Chaos, E1 + 1 Power,
one rune).** *"Return any number of enemy Order (:rb_rune_order:) units with total Might 5 or less to
their owners' hands."* It has no *"at a battlefield"*, so it reaches your base. And it sends the
bodies to your hand, which neither Undying Loyalty nor Starhound reads. From the T4 position, if
Ivern survives, they cast it on their T4 on the Scout and the Poro (1 + 2). Your T5 Hold of G then
finds Dog and Cat only, and Ivern's trigger scores nothing. The bodies come back for E2 each in your
Main Phase, after that Hold. Among the eight one-rune spells of the scope above it is the only one
that can remove an Order unit from your base. `VEN-015 Decree of Rage` reaches base too, but only a
Calm unit.

**Battlefield sweepers do not touch the tags.** `OGS-002 Firestorm` (Fury, E6 + 1 Power): *"Deal 3 to
all enemy units at a battlefield."* The tag bodies wait in base and the sweep reaches only what stands
at G. In the walk that was Ivern and the Feline: Firestorm kills the Feline and puts 3 on Ivern, and
the same two attackers then kill him. That is six runes for what Cleave did for one. Two-rune spells
that reach base and kill: `OGN-029 Falling Star` (Fury, E2 + 2 Power), *"Deal 3 to a unit. Deal 3 to
a unit."*, kills two tag bodies. Undying Loyalty can return them, but only after your next Hold.

**Against the spells themselves, the answers cost more than the spells.** `UNL-131 Abandon` (Chaos,
E2) counters Undying Loyalty and returns it to your hand, two runes against one. `VEN-101 Gust Monk`
(Chaos, E2 plus an optional E1) banishes one card from a trash, three runes for one body.

## 6. Verdict

**Right about the cost and the ceiling; wrong that the recursion protects the condition; silent that
the payoff is outside it.** Undying Loyalty with a tagged target is E0 + 1 Power, and the Power can
come from a rune already exhausted for Energy, so the two copies of the walk cost two runes off the
board and no Energy. On T4 they bought Ivern's conquer point, one point the same hand could not reach
without them. The rebuild is cast only in your Main Phase, after the Hold, so a tag body lost on their
turn costs the next Hold point whatever the trash holds. Battlefield sweepers are the wrong threat:
the tag bodies sit in base, where Firestorm cannot reach them. The threat is Ivern, an M6 who dies to
one Energy of Cleave and two attackers, and whom neither half can return.

## 7. Not verified

I did not deal the channel order. The walk assumes six Order and six Calm runes, Green Father's two
domains, in the twelve of Tournament Rules 402.1. Nothing in the walk costs Calm Power. Undying
Loyalty on T3 needs one Order rune among the seven channelled by then (the Scout's rune included): it
fails in **0 of 924 deals**. On T4 Starhound, the second Undying Loyalty and the Feline each recycle
an Order rune, three in all, after the one recycled on T3. That needs four Order runes among the first
nine channelled, and it fails in **84 of 924 deals, 9.09%**. In those deals you skip the Feline:
two recycles need three Order runes among nine, and that fails in 0 deals. The opponent's walk costs
Energy only. Decree of Discord needs one Chaos rune among their nine on T4; at six and six that holds
in every deal.

I did not walk Daisy!, Green Father's Brush, or going second. Green Father reads *"When you conquer or
hold, you may exhaust me to replace that battlefield with a Brush battlefield token"*, and
`docs/rules-notes/rules-findings.md` records what a battlefield token is for Control as unruled. The
walk never exhausts it. Nor did I walk the mulligan or 2v2. 124 makes a dead Ivern a new object; I
read that his chosen tag goes with the old one, and I did not find a paragraph naming a gained tag
among the Temporary Modifications of 124.1. Fallen Feline's name is a guess at their removal: had it
named Cleave, Hextech Ray would have done the same job with the same attackers. Their hand holding
Cleave and nothing better is the walk's assumption; §5 prices the alternatives. The probabilities in
§4 and §5 count only the cards named.

## Leads

- The notable *"he is the only way back for the expensive tag bodies (UNL-047 Mosstomper, VEN-032
  Frostcoat Mother, VEN-122 Solari Sunhawk)"* is not true in Calm/Order. `OGN-226 Spectral Matron`
  (Order, E4 + 2 Power): *"When you play me, you may play a unit costing no more than :rb_energy_3:
  and no more than :rb_rune_rainbow: from your trash, ignoring its cost."* All three are E3 with 1
  Power or less, and the Matron puts them on the board, not in hand. `SFD-165 Glasc Mixologist` (Order,
  Deathknell) has the same ceiling, and `SFD-035 Guardian of the Passage` (Calm) returns any unit to
  hand when it holds. Scope: Calm, Order, Calm/Order and colourless cards in `data/corpus_flat.txt`
  whose text reads *"from your trash"*.
- `terminatesIn` says the rebuilds keep *"the four-tag condition alive through a sweeper"*. Undying
  Loyalty has no [Action] or [Reaction] (310.1.a), so it comes after your Hold (315.2.b.2, 316.1). A tag
  lost on their turn costs Ivern's next Hold point whatever the trash holds. Battlefield sweepers never
  reach base, where the tag bodies can wait. The one-rune spell that does reach base, `VEN-107 Decree
  of Discord`, returns them to hand, outside both halves.
- No notable says the payoff is outside the recursion. Ivern costs E6, above Undying Loyalty's
  ceiling, and in the trash he is a new object (124) with his printed tags, Ivern and Ionia, so
  Starhound cannot choose him either. In the walk he died to one Energy (`OGN-004 Cleave`) and two
  attackers.
- `uses` names a Bird, a Poro and a Dog (Starhound), and step 5 says *"The four tags are back up"*.
  No Cat is named. Order has one inside the ceiling, `VEN-132 Fallen Feline` (E2 + 1 Power), and so
  does Ivern, who chooses a tag as he is played.
