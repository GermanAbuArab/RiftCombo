# Play — Rell takes one free Equipment, the Bow fires only on defence, and Decree of Focus kills her for one rune

Issue #458 (a slice of #200), 2026-10-24. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `rell-magnetic-recurve-bow-per-attack`**, the Fury ENGINE in which `SFD-024 Rell, Magnetic`
(Fury, E4, M4, [Tank]) plays an Equipment of Energy cost 2 or less from hand for free each time she
attacks and attaches it to herself. Its order is a `SFD-022 Long Sword` (Fury gear, E2 + 1 Fury Power,
M+2, [Quick-Draw]) first, whose +2 is live in the combat it lands in, and a `SFD-016 Recurve Bow` (Fury
gear, E2, M+0) on the next attack, whose 2 damage misses the combat that fetched it. The entry is
right about both timings. Walked as a game, going first, with a Fury/Body deck in your seat against the
Calm/Order Shield deck of [the Purifier play](2026-10-14-rell-feeds-only-from-base-and-the-legend-does-the-arithmetic.md).
**The main line:** on T3 Rell walks into their battlefield, takes the Long Sword for free, kills their
lone Stalwart Poro at Might 6 and conquers. After that she stands at that battlefield, where a unit can
move only to base. She never attacks again, so the Bow the entry takes next is never played for free.
On their T4 eleven Might attack her there. She kills two of them and dies. **5 to 2** after their T4.
**The control** takes the Bow first and keeps the Long Sword in hand. The Bow's first and only shot
comes on their T4, when she defends. The Long Sword's [Quick-Draw] gives it [Reaction], so it goes on
her in that same combat for two runes, and she takes three of them with her. Also **5 to 2**, with one
attacker left at the battlefield instead of two. **The cheapest answer is one rune:**
`VEN-040 Decree of Focus` (Calm, E1) makes their defending Poro a 7 against her 6, and she dies attacking.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-24 at `3fadb16`, reads
773 entries, 262 with forced-ordering language, **93 in the queue and 3 of them with no play**, as the
issue measured. The two picks are unchanged: this entry is rank 92, a hit on *first*. The other entry
of this slice is rank 91, `karthus-glasc-mixologist-double-reanimate`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-249 Relentless Storm` (Fury/Body, tag Volibear) |
| **Chosen Champion** | `OGN-041 Volibear, Furious` (Fury, E10 + 2 Power, M9), never played |
| **The engine** | `SFD-024 Rell, Magnetic` (Fury, E4, M4) |
| **The Equipment** | `SFD-022 Long Sword` (Fury gear, E2 + 1 Fury Power, M+2), `SFD-016 Recurve Bow` (Fury gear, E2, M+0) |
| **The other bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-136 Pit Rookie` (Body, E2, M2), `OGN-130 Crackshot Corsair` (Body, E3, M3), `SFD-096 Laurent Bladekeeper` (Body, E3, M3) |

The entry admits any legend with Fury in its pair. Relentless Storm is the one for this walk because
it does nothing here: *"When you play a [Mighty] unit, you may exhaust me to channel 1 rune exhausted.
(A unit is Mighty while it has 5+ :rb_might:.)"* No unit in this walk is played with 5 or more Might.
Its tag is Volibear, so the Chosen Champion is a Volibear, 103.2.a.2: *"Must be a champion unit with a
champion tag that matches the tag on your Champion Legend."* He waits in the Champion Zone, 103.2.a.1:
*"This will be placed in the Champion Zone at the start of the game."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3
copies of the same named card."* The deck runs three Rell, three Long Sword and three Recurve Bow;
the entry asks for one Rell. None of the cards in this play, on either side, is a Signature card
(`signature` in `data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Rell, Magnetic: *"[Tank] (I must be assigned combat damage first.) When I attack, you may play an
  Equipment with Energy cost no more than :rb_energy_2:, ignoring its cost. If you do, then do this:
  Attach it to me."*
- Long Sword: *"[Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you control.)
  [Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a unit you control.)"*
- Recurve Bow: *"[Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a unit you control.) [Effect]
  When I attack or defend, deal 2 to an enemy unit here."*
- Pit Rookie: *"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1
  :rb_might: buff.)"*
- Legion Rearguard's [Accelerate], Pouty Poro's [Deflect], Crackshot Corsair's *"When I attack, deal 1
  to an enemy unit here."* and Laurent Bladekeeper's Ganking are idle in the walk.

## 2. What Rell plays, when it attaches, and when the Bow can fire

**The trigger.** It is an Attack Trigger, 383.4.e: *"Attack Triggers are Triggered Abilities that
trigger when a Unit or Player gains the Attacker designation for the first time during a combat."* She
gains it when combat opens, 464.2.c.3: *"The attacker and defender gain the Attacker or Defender
designation now, as appropriate. Units at the Contested Battlefield controlled by the Attacker or
Defender gain the Attacker or Defender designation now, as appropriate."* An empty battlefield gives
her nothing, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield
are a stand-alone Phase and do not create a Combat."*

**What "ignoring its cost" waives.** 356.1.b.1: *"If a card allows a player to play a card "ignoring
its cost," its base Energy cost and base Power cost are set to zero."* So the Long Sword's Fury Power
goes too. Her ceiling is a printed cost, 206: *"Effects that need to determine a card’s cost for any
purpose always use its printed or copied cost, even if that cost is increased, decreased, or ignored as
the card is played."* Both Equipment print E2.

**Where the Equipment is, and in what order it attaches.** A gear is played to base, 149.2: *"Gear can
only be played to a player's Base unless an effect specifies otherwise."* Playing it puts it on the
chain while her trigger is still resolving, 354.3: *"If another Card Effect or ability is currently
resolving, continue resolving it before proceeding with any further steps of this process."* Her
trigger then adds its second half, 388.1: *"A new ability is created and added to the chain as a
Pending Item."* The gear was appended first, so it is finalized first, 337.1.b: *"Chain Items are
Finalized in the order they were appended to the Chain."* A gear does not wait, 337.2: *"If, after
finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds resources, it resolves
immediately—Move to Step 4: Resolve."* It enters the board, 359.2.d: *"If it is a Non-Unit Gear, it
enters the Board Ready at the player's Base."* So the Equipment is on the board in base when *"Attach
it to me"* resolves, and the attach brings it to her, 434.4: *"When a card Attaches to a card, its
location becomes the same as the new Top-Most Card."*

The Long Sword has a second attach of its own. [Quick-Draw] is a play effect, 383.4.a.2: *"These
Triggered Abilities are put on the Chain as Pending Items after the Permanent these effects correspond
to is finalized and enters the board."* That puts it on the chain after her *"Attach it to me"*, and the
newest resolves first, 340.1: *"The newest Finalized Chain Item resolves. Execute its game effects in
their entirety."* You choose Rell for it, and her own attach then does nothing more, 434.1.h: *"If a
Game Effect instructs a player to Attach a card to its current Top-Most Card, nothing additional
happens."* Before either resolves they hold Priority, 337.4: *"If, after finalizing the Chain Item,
there are no more items on the chain to be Finalized, the controller of the next item on the chain
gains Priority. Move to step 2: Execute."*

**The Long Sword's +2 is live at once, and on defence too.** 434.1.d: *"The Top-Most Card has its Might
modulated by the Might Bonus of all cards Attached to it."* Damage is read later, 465.2: *"When the
Showdown closes, Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked,
using their current Might."* A Might Bonus is not Assault, so it stays on her when she defends.

**The Bow misses its own combat, and fires on defence.** Its text reaches her only once it is attached,
434.1.c: *"The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules
Text."* By then she has already gained the Attacker designation, and 383.4.e fires only *"for the first
time during a combat"*. The other half of the Bow is a Defend Trigger, 383.4.f: *"Defend Triggers are
Triggered Abilities that trigger when a Unit or Player gains the Defender designation for the first
time during a combat."* Once it is on her, an attack by them on her battlefield fires it at the start
of that combat.

**Where she can attack from.** 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b:
*"Units may move from a Battlefield to their Base."* The move is paid by exhausting her, 144.2:
*"Exhausting the Unit is the Cost for this action."* She has no Ganking. So each attack needs her ready
in base and a battlefield of theirs with a unit on it. After a conquest she stands at the battlefield
she took, and her next attack is two turns away at best: one to walk home, one to walk out. The
Purifier play found the same, and it is why the Bow gets no free play in the main line.

**Combat damage and [Tank].** 815.1.b: *"I must be assigned lethal damage before any other unit with
the same controller as me that does not have [Tank] during the Combat Damage step."* 465.2.c.4:
*"Units cannot have more damage assigned to them than the minimum required to constitute lethal damage
unless no further units remain to have damage assigned to them."* A unit dies at its Might, 143.2.a:
*"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed."*
When she dies, her Equipment stays where she was, 719.5: *"When a Top-Most Card changes zones from a
board zone to a non-board zone, all Attached cards Detach from it, remaining in their current zones."*
435.4.b puts it at *"the last location the Top-Most Card was at before changing from a board zone to a
non-board zone"*, and 323.7 sends it home: *"Recall all Unattached non-Unit Gear and non-Unit Runes at
Battlefields, and all Permanents and Runes in Bases other than their controller’s."*

**Runes.** A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power by
leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, and 164.2.b.1: *"The Power added this way
corresponds to the Domain of the Rune that is being Recycled."* An exhausted rune still pays the
recycle. A recycled rune goes to the bottom of the Rune Deck, 416.1.b: *"Runes are Recycled to the
Rune Deck."*, and comes back only when it is channelled from there again, 430.1: *"Channeling is the
action of taking one or more Runes from the top of a player's Rune Deck and putting them on the
board."* Your board readies only on your turn, 415.3.a: *"A player Readies all non-spell Game Objects
they Control during the Awakening Phase on their turn."* Going first, you channel to 2, 4, 6 and 8
runes on T1 to T4, less any you recycle.

## 3. Their deck: Calm/Order Shield bodies

The deck of the Purifier play linked above. `OGN-261 Radiant Dawn` (Calm/Order): *"When you stun one
or more enemy units, buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might:
buff.)"* It is idle in the walk, since they stun nothing. Its Chosen Champion is `OGN-238 Leona,
Determined`, never played. Their bodies are `OGN-052 Stalwart Poro` (Calm, E2, M2, *"[Shield] (+1
:rb_might: while I'm a defender.)"*), `OGN-054 Sunlit Guardian` (Calm, E3, M3, *"[Shield] (+1
:rb_might: while I'm a defender.) [Tank] (I must be assigned combat damage first.)"*), `OGN-044
Clockwork Keeper` (Calm, E2, M2; they do not pay its Calm), `OGN-219 Vanguard Sergeant` (Order, E4,
M4, no text) and `SFD-037 Navori Scout` (Calm, E4, M4, [Deflect]). Nothing in their hand stuns, kills
or counters, and nothing in the walk costs them Power. Going second, they channel an extra rune on T1,
485.7: *"First Turn Process: The player going second channels an extra Rune from their Rune Deck during
their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Body against Calm/Order. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*, and nobody hides there); theirs is B, `OGN-282 Monastery of Hirana` (*"When
you conquer here, you may spend a buff to draw 1."*, and nothing that conquers it carries a buff). Your
opening four are Legion Rearguard, Rell, Long Sword and Recurve Bow. Your draws are Pouty Poro (T1),
Pit Rookie (T2), Crackshot Corsair (T3) and Laurent Bladekeeper (T4). Their opening four are Stalwart
Poro, Sunlit Guardian, Clockwork Keeper and Vanguard Sergeant. Their draws are Navori Scout (T1), a
second Stalwart Poro (T2), a second Sunlit Guardian (T3) and a second Clockwork Keeper (T4).

The main line takes the Long Sword first, as the entry does.

```
turn      runes   your turn                                                 points
T1        2       Legion Rearguard (E2) to base. None left.                 0
their T1  3       Stalwart Poro (E2) to base. One left.                     0
T2        4       The Rearguard walks to A, empty, Conquer: +1. Rell (E4)   1
                  to base. None left.
their T2  5       The Poro walks to B, empty, Conquer. Sunlit Guardian      1
                  (E3) and Clockwork Keeper (E2) to base. None left.
T3        6       Hold A: +1. Rell walks to B and attacks the Poro.         3
                  Trigger: Long Sword from hand, free, attached: Rell 6.
                  The Poro defends at 3; Rell kills it and takes 3.
                  Conquer B: +1. Pouty Poro (E2) and Pit Rookie (E2) to
                  A, the Rookie buffing the Rearguard to 3. Two left.
their T3  7       Nothing to Hold. Vanguard Sergeant (E4) and the second    1
                  Stalwart Poro (E2) to base. One left.
T4        8       Hold A and B: +2. Rell stays at B; the Bow stays in       5
                  hand. Crackshot Corsair (E3) and Laurent Bladekeeper
                  (E3) to A. Two left.
their T4  9       Guardian, Keeper, Sergeant and Poro (3 + 2 + 4 + 2 =      2
                  11) attack B. Rell 6 kills the Guardian and the
                  Keeper and dies. Conquer B. Navori Scout (E4), the
                  second Guardian (E3) and the second Keeper (E2) to
                  base. None left.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **3 to 1**; after their T3,
**3 to 1**; after your T4, **5 to 1**; after their T4, **5 to 2**.

Runes on your board at the end of each turn: 2, 4, 6, 8. On theirs: 3, 5, 7, 9. Nobody recycles a
rune in the main line.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard (Rell, Long Sword, Bow, Pouty
Poro); 5 after the T2 draw, 4 after Rell (Long Sword, Bow, Pouty Poro, Pit Rookie); 5 after the T3
draw, 4 after her trigger takes the Long Sword, 2 after the Pouty Poro and the Rookie (Bow, Corsair); 3
after the T4 draw, 1 after the Corsair and the Bladekeeper (the Bow). Theirs: 5 after the T1 draw, 4
after the Poro; 5 after the T2 draw, 3 after the Guardian and the Keeper (Sergeant, Scout, second
Poro); 4 after the T3 draw, 2 after the Sergeant and the second Poro (Scout, second Guardian); 3 after
the T4 draw, 0 after the Scout, the second Guardian and the second Keeper.

**Your T3: one attack, one free Equipment.** Rell walks into B, which they control with one unit, so
it is contested, 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested status
if that battlefield is not already Contested and that Unit’s controller does not already control that
battlefield."* She is the Attacker and her trigger goes on the chain. They have no ready rune: their T2
spent all five. The Long Sword resolves to your base, [Quick-Draw] attaches it to her, and she is a 6.
The Poro is their only unit there, so all 6 can go on it (465.2.c.4). Its 3 is not lethal on her, and
466.1.a.1 heals her in the combat cleanup. B is yours, and it is a Conquer, 466.5.d: *"Establishing
Control results in a Conquer if that player has not yet scored this Battlefield this turn."*

**Their T3: no attack is worth it.** Their two ready bodies are the Guardian and the Keeper, 3 + 2 = 5.
Into B, Rell's 6 kills both and their 5 do not kill her. A holds the Rearguard at 3, the Pouty Poro and
the Rookie, 7 in all. They play out instead.

**Your T4: Rell is parked.** She is at B, and from there she can move only to base (144.4.b). Every
unit of theirs is in their base, so there is no battlefield of theirs to attack anyway. The Bow the
entry takes *"next combat"* has no combat to be taken in. The two spare runes could buy it the paid
way: E2 to base, then its [Equip] for one Fury Power, recycled from one of the same two runes. The
main line keeps it for her next attack, as the entry does.

**Their T4: eleven Might into B.** A is 3 + 2 + 2 + 3 + 3 = 13, B is Rell alone. Their four ready
bodies attack B as attackers, so the Poro and the Guardian get no Shield. Rell's 6 must kill the
Guardian first, since it has [Tank] (815.1.b): 3 to it, then 2 to the Keeper and 1 to the Sergeant.
Their 11 all go on her. She dies, and the Long Sword is recalled to your base (719.5, 435.4.b, 323.7).
The Sergeant and the second Poro conquer B. **5 to 2.**

**The control: the Bow first, the Long Sword as a Reaction.** The same deal. On T3 Rell's trigger
takes the Recurve Bow, so she attacks at 4. That still kills the Poro at 3, and its 3 is not lethal on
her. Conquer B. The Bow does not fire in that combat (§2). On T4 you play the Corsair and the
Bladekeeper and keep two runes ready. On their T4 the same eleven attack B. Rell gains the Defender
designation, and the Bow's Defend Trigger deals 2 to the second Poro, which dies. While that trigger
is on the chain you play the Long Sword from hand. It has [Reaction], 819.1.b: *"Cards with
Quick-Draw have Reaction inherently."*, and it is played and attached at that timing, 819.1.c:
*"Quick-Draw allows cards to be played and Attached using Reaction timing."* Two runes pay its E2 and
one of them, a Fury, is recycled for its Power. Rell is a 6 against 3 + 2 + 4 = 9: 3 to the Guardian,
2 to the Keeper, 1 to the Sergeant. She takes 9 and dies. The Sergeant alone conquers B. **5 to 2**,
with one of their attackers left at B instead of two, and your board at 7 runes after their T4.

**What the order changes.** The free play saves the same thing in both lines: E2 and one Fury Power,
once. In the main line the other Equipment could be bought on T3 or T4 for that same price, but the
Bow has no [Reaction]. It has to be bought on your own turn, whether or not they attack. The Long
Sword can wait in hand until they do. That is why the control kills three where the main line kills
two. The attack is the other side of it: the control attacks at 4, and §5 shows three one-rune answers
that kill a 4 and not a 6.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 6 cards by T2 and 7 by T3. With three Rell and three
Long Sword, a Rell by T2 and a Long Sword by T3 is **16.89%**. The control needs a Rell by T2, a Bow by
T3 and a Long Sword by T4 (8 seen): **7.35%**. At the entry's one Rell, **6.34%** and **2.72%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 Rell took B and a free Long Sword. The predicate
is: played by them during her T3 attack on B, with the runes they kept up on their T2, does it kill her
or keep her from killing the Poro?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Folded by name (not a legend,
battlefield, rune or token, and not a Signature card with another champion's tag), that is **254**
cards, none of them banned in constructed: **159** units, **62** spells and **33** gear.

**The candidates.** On your turn, during a combat, they can play only a card with [Reaction] or
[Action], or one they hid earlier. 813.1.c.1: *"This can be played during Closed States on any player's
turn."* A hidden card gains [Reaction], 811.1.b: *"While this card is in your hand or in your Champion
Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you
control that doesn't already have a facedown card hidden there for as long as you control that
battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base
cost."* Of the 254, **62** carry [Reaction], [Action] or [Hidden]. Of those, the regex
`\b(deal|deals|kill|kills|stun|stuns|move|moves|return|returns|recall|recalls|banish|counter|detach)\b|\+\d* ?:rb_might: this turn|\[Shield`
(case-insensitive, reminder text left in) matches **46**. I read the **27** that cost E2 or less in
full.

**The cheapest answer: Decree of Focus, one rune.** `VEN-040 Decree of Focus` (Calm, E1): *"[Reaction]
(Play any time, even before spells and abilities resolve.) Choose a friendly unit that's in combat with
an enemy Fury (:rb_rune_fury:) unit or that's being chosen by an enemy Fury spell. Give it +4
:rb_might: this turn."* Rell is Fury. They keep one rune up on their T2 by holding the Clockwork Keeper
back, and play Decree after the Long Sword is on her. The Poro is 2 + 1 + 4 = 7 against her 6. Her 6
is not lethal on it; its 7 is lethal on her. She dies, the Poro keeps B, the Long Sword is recalled to
your base, and you score no Conquer: **2 to 1** after your T3 instead of 3 to 1. Their Keeper comes
down a turn late. The Bow-first control dies to it too, at 4 against 7.

**Nothing cheaper exists.** Of the seven at E1, `OGN-045 Defy` and `VEN-039 Crumbling Sands` counter
spells, and your T3 plays none: Rell's trigger is an ability and the Long Sword is a gear. `UNL-173
Sacrifice` needs a [Mighty] unit of theirs. The other three give their Poro Might, and against the
Long Sword none of them is enough:
- `OGN-046 En Garde` (Calm, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Give a friendly unit +1 :rb_might: this turn, then an additional +1 :rb_might: this turn if
  it is the only unit you control there."* The Poro is 2 + 1 + 2 = 5 against her 6.
- `UNL-031 Combat Experience` (Calm, E1) gives +1, and +3 only at [Level 6], which needs XP they do not
  have: 4.
- `UNL-046 Friendship` (Calm, E1) gives +1 for each of four tags among their units, and they have only
  the Poro tag: 4.

Against the control's Rell at 4, all three are answers. En Garde's 5 kills her and survives her 4.
Combat Experience and Friendship make the Poro a 4, and the two trade. Taking the Bow first turns one
one-rune answer into four.

**A hidden card is one rune too, and costs no Energy.** On their T2, after the Poro takes B, they
exhaust all five runes for the Guardian and the Keeper and recycle one of them for the [A]. That rune
goes to the bottom of their Rune Deck, so their board is one rune short for the rest of the walk.
- `OGN-213 Hidden Blade` (Order, E2 + 1 Order Power, ignored from Hidden): *"[Hidden] (Hide now for
  :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play on your turn or in
  showdowns.) Kill a unit at a battlefield. Its controller draws 2."* It kills Rell at B, and you draw
  2. Played in reaction to her trigger, it kills her before the Equipment is played. The trigger still
  resolves, as 383.2.a.1's own example says of a source removed in reaction: *"If she is removed in
  reaction to the triggered ability, it will still resolve."* The Long Sword is still played for free,
  and [Quick-Draw] can attach it to a unit of yours at A.
- `OGN-057 Block` (Calm, E2, hidden): *"Give a unit [Shield 3] and [Tank] this turn."* The Poro is
  2 + 1 + 3 = 6 against her 6. Both die, and B is nobody's, 466.5.b: *"If there are no Units remaining
  here controlled by any player, the Battlefield becomes Uncontrolled."*
- `OGN-220 Facebreaker` (Order, E2, hidden) stuns her and the Poro. Neither deals damage, and the
  combat cleanup recalls her (below).

**Dearer answers that stop her without killing her.** Each stun also fires Radiant Dawn, which buffs
one of their units.
- `SFD-040 Thwonk!` (Calm, E2): *"[Action] (Play on your turn or in showdowns.) [Repeat]
  :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) Stun an attacking
  unit. (It doesn't deal combat damage this turn.)"* With the [Repeat] unpaid, she deals nothing. The
  Poro's 3 does not kill her, and 466.1.a.2 sends her home: *"Recall Attackers present at the
  Battlefield if Defenders are still present."* B stays theirs. She is back in base with the Long Sword
  on her, so this answer is what gives her a second attack, and the Bow, on T4. **Two runes.**
- `OGN-050 Rune Prison` (Calm, E2 + 1 Calm Power) stuns her the same way. **Three runes, one
  recycled.**
- `VEN-126 Ki Barrier` (Order, E2 + 1 Order Power) prevents the next 7 damage to the Poro, and her 6
  are all she has. The Poro lives and she is recalled. **Three runes, one recycled.**
- `OGN-224 Salvage` (Order, E2 + 1 Order Power) kills the Long Sword. She is a 4 against the Poro's 3
  and still takes B. It is not an answer.

**The free answer: garrison B to 7 on defence.** On their T2 the Sunlit Guardian goes to B instead of
their base, for the same three Energy. B is then the Poro at 3 and the Guardian at 4 on defence, 7 in
all, and the Guardian has [Tank]. With the Long Sword Rell is a 6: 4 to the Guardian, 2 to the Poro,
and their 7 kill her. With the Bow she is a 4, and it is the same. So she does not attack, and the
engine does nothing. They still have the Keeper's two Energy that turn.

## 6. Verdict

**Right about both timings, and the Bow it takes second never comes free.** Walked going first, Rell
attacked once in four turns. She took a free Long Sword, whose +2 was live in that combat as the entry
says, and conquered their battlefield. Then she was parked there, because a unit at a battlefield can
move only to base, and she never attacked again. The Bow waited in hand for a next combat that did not
come. On their T4 eleven Might attacked her: she killed two and died, **5 to 2**. Taken first instead,
the Bow missed its own combat, as the entry says, and fired on defence on their T4, the only combat it
saw. The Long Sword it left in hand has [Reaction] through [Quick-Draw], so it went on her in that
same combat for two runes, and she took three with her. That order is better on defence and worse in
the attack: of the one-rune answers from hand, one kills a 6 and four kill a 4. Either way the cheapest answer is
one rune: Decree of Focus on their lone defender kills her in the attack. The free answer is to keep B
at 7 on defence, and then she does not attack at all.

## 7. Not verified

**Playing a gear with no [Reaction] from a resolving trigger.** 358.4: *"Check that the card has the
appropriate permissions to be played at this timing."* Its example: *"If the state is Closed and the
card wasn’t the one that Closed the state, ensure that it has [Reaction]."* Rell's trigger resolves on
a chain. If 358.4 applies to a play an effect instructs, the Recurve Bow fails it and the control's T3
cannot happen; the Long Sword passes, through 819.1.b. I read it as not applying, on 354.3 above, as
the Purifier play did. Neither rule says so outright.

**Runes.** I did not deal the channel order. The walk assumes six Fury and six Body runes for you,
Relentless Storm's two domains, in the twelve of Tournament Rules 402.1. The main line spends no Power:
every card you play costs Energy only, and the Long Sword's Power is ignored. The control recycles one
Fury on their T4 for the Long Sword. By then eight of your runes are on the board, and with six Body
they always hold at least two Fury, **0 of 495**. Paying the Bow's [Equip] on your T3 in the main line
needs a Fury among your first six runes: it fails only when all six are Body, **1 of 924, 0.11%**.

Their walk costs them no Power. Decree of Focus, En Garde, Thwonk and Facebreaker cost Energy only, and
a hidden card's [A] is any rune. Rune Prison needs a Calm among their first five runes, and Ki Barrier
and Salvage an Order: with six of each, each fails only when all five are the other domain, **6 of
792, 0.76%**.

**How likely an answer is.** The walk fixes their opening four and their four draws. A Decree of
Focus among their first 6 cards of 39 by their T2, at three copies, is **40.30%**. That counts only
the one card, not how many of them a Calm/Order list runs.

`data/cards.json` carries no champion supertype. I read Volibear, Furious as a champion unit by his
title name and his Volibear tag. Their choice to put the Guardian in base on their T2, and not to attack
on their T3, is the walk's choice of opponent; §5 prices the other. Not walked: going second, the
mulligan, 2v2, a rune split other than six and six, Thwonk with its [Repeat] paid, the hidden
`VEN-117 Disciple of Shen` arriving mid-combat, E3 and dearer answers, and the turns after their T4.

## Leads

- Step 3, *"Next combat, take a Recurve Bow instead"*: in the walk there was no next combat. After her
  T3 conquest she stood at that battlefield, and a unit there can move only to base (144.4.b). Her next
  attack needs a turn to walk home and a turn to walk out. The Bow's only combat before she died was
  one she defended, where its Defend half fired (383.4.f).
- Step 3's order: taking the Bow first leaves the Long Sword in hand, and [Quick-Draw] gives it
  [Reaction] (819.1.b, 819.1.c). It can be played on their turn when they attack her, for E2 + 1 Fury
  Power. The Bow left in hand has no [Reaction] and can only be bought on your own turn. The cost of
  that order is the attack: at Might 4 she dies to En Garde, Combat Experience and Friendship as well as
  Decree of Focus, each one rune.
- Step 4, *"Rell's [Tank] means she is assigned combat damage first, which is what keeps the growing
  pile of Equipment on the board she wants it on"*: [Tank] makes her the first lethal assignment
  (815.1.b), which is how she died in the walk. It keeps nothing anywhere. When she dies, every
  Equipment on her goes to your base (719.5, 435.4.b, 323.7).
- Step 2 cites 434.1.c for her Might of 4 + 2 = 6. The Long Sword has no Effect text. Its +2 is its
  Might Bonus, 434.1.d.
- The Recurve Bow's note, *"'ignoring its cost' waives the [Equip] Power as well"*: no [Equip] is
  activated. Rell's own *"Attach it to me"* attaches it, and 818.1.b is the [Equip] cost: *"Equip has
  a cost to activate and Attaches the card with Equip to a chosen Unit when the cost is paid."* What
  356.1.b.1 waives is the cost to play, which for the Bow is E2.
- The Long Sword is attached twice, once by its own [Quick-Draw] play effect (383.4.a.2) and once by
  her *"Attach it to me"* (388.1). The gear resolves to your base first (337.1.b, 337.2), the
  [Quick-Draw] trigger is the newer chain item and resolves first (340.1), and the second attach does
  nothing (434.1.h). They hold Priority before either (337.4). No step says so.
- `terminatesIn`, *"about six free attaches a game"*: in the walk, one in four turns. The limit is how
  often she starts a turn ready in base while they hold a battlefield with a unit on it, not the six
  Equipment in hand.
- The entry names no answer. The cheapest is Decree of Focus, one rune, on their defender during her
  attack. The free answer is a garrison of 7 on defence at the battlefield she would attack. Thwonk!
  and Facebreaker stop her for two runes, and the recall they cause is what gives her a second attack.
- The entry rests on 358.4 not applying to a play her trigger instructs (§7). If it does, the Recurve
  Bow, which has no [Reaction], is out of her reach and only the Long Sword of this pair is.
