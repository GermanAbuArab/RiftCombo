# Play — The ready only pays when Jinx is spent, and in a Duel switching battlefields costs a card

Issue #366 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `jinx-rebel-discard-event-ready`**, the Fury/Chaos ENGINE in which `OGN-202 Jinx, Rebel`
readies and gains +1 Might for every discard event, fed by `OGN-003 Chemtech Enforcer`. The entry is
right that the trigger counts events, not cards. In a game, the ready was worth something only when
Jinx was already exhausted. That happened twice. On T3 she was played exhausted, and a free discard let
her walk into the battlefield they had just taken: their three units died, you took it back, and it was
**2 to 1**, their next board starting from base. On T4 she had already moved, and a discard made base
to B a second legal move: **4 to 1**. The other two discards readied a Jinx who was already ready,
which does nothing (415.1.c). One of their +1s won the T3 combat; the other came with no combat left.
The entry's own line, three Enforcers in one turn, needs six cards in hand: an Enforcer with an empty
hand discards nothing, so no event fires (422.4). The two discards that paid in this walk cost no
Energy: `VEN-007 Punching Poro`'s Empower and `OGN-023 Unlicensed Armory`. The cheapest answer in their
colours is a hidden `OGN-220 Facebreaker` or `OGN-213 Hidden Blade` at the battlefield she attacks, one
rune on the turn before.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `7717c97`, reads
773 entries, 262 with forced-ordering language, **101 in the queue and 29 of them with no play**.
That is one fewer in the queue than the issue's 102. The two picks are unchanged: this entry is
rank 74, the second in the list. The other entry of this slice is rank 73,
`moonlight-affliction-wind-and-ghosts-banish`, played in
[One Apprentice brings the banish to turn 4, and the bounce alone was the better board](2026-10-14-one-apprentice-brings-the-banish-to-turn-4-and-the-bounce-alone-was-the-better-board.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-251 Loose Cannon` (Fury/Chaos, tag Jinx) |
| **The payoff** | `OGN-202 Jinx, Rebel` (Chaos, E5 + 1 Power, M5), the Chosen Champion |
| **The discards** | `VEN-007 Punching Poro` (Fury, E2, M2), `OGN-023 Unlicensed Armory` (Fury gear, E2), `OGN-003 Chemtech Enforcer` (Fury, E2, M2) |

The entry names three Fury/Chaos legends: Bloodharbor Ripper, Master of Shadows and Dark Child.
`data/corpus_flat.txt` prints five. The two it leaves out are `SFD-185 Glorious Executioner` and
`OGN-251 Loose Cannon`, and Loose Cannon is the one for this entry, because its tag is Jinx. 103.2.a.2:
*"Must be a champion unit with a champion tag that matches the tag on your Champion Legend."* The rule's
own example names this card: *"Example: Loose Cannon has the tag Jinx. Therefore, a player could choose
Jinx, Rebel or Jinx, Demolitionist as their Chosen Champion, because they also have the tag Jinx."* So
Jinx is never a draw. 103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."*
And 419.1.a lets you play her from there: *"By default, a player can only Play cards from their hand
or their Chosen Champion zone."* Under any of the entry's three legends she is a deck card, and three
copies put one in the first **7** cards of a **39**-card draw pile (by T3) in **45.73%**.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by your
Domain Identity."* None is a Signature card (`data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Jinx, Rebel: *"When you discard one or more cards, ready me and give me +1 :rb_might: this turn."*
- Punching Poro: *"[Empower] — Discard 1 (Pay the cost: Empower me. Use only if not Empowered.)
  [Empowered][>] I have +1 :rb_might:."*
- Unlicensed Armory: *"Discard 1, :rb_exhaust:: Choose a friendly unit. The next time it would die
  this turn, you may pay :rb_rune_fury: to heal it, exhaust it, and recall it instead. (Send it to
  base. This isn't a move.)"*
- Chemtech Enforcer: *"[Assault 2] (+2 :rb_might: while I'm an attacker.) When you play me, discard 1."*
- Loose Cannon: *"At start of your Beginning Phase, draw 1 if you have one or fewer cards in your
  hand."*

## 2. What a ready can buy in a Duel

**She enters exhausted, so the first discard after she lands is a move.** 143.4: *"Units enter the
Board exhausted."* A move costs the exhaust, 144.2: *"Exhausting the Unit is the Cost for this
action."* A discard readies her, and she can walk the turn she is played.

**A ready on a Jinx who is already ready does nothing.** 415.1.c: *"If a Unit is instructed to be
Readied while it is already Ready, nothing additional happens."* She is readied by the Awaken Phase
every turn after the one she lands, 315.1.b: *"1. The Turn Player readies all Game Objects they
control that are able to be readied."* So a discard before her first move that turn buys only the +1.

**The +1 has to come before the combat.** She cannot move in a showdown, 144.1.c: *"This action
cannot be performed during a Showdown or Combat."* None of the three discards here can be used in one
either. 308.1.a: *"Only cards and abilities with the Action or Reaction keywords can be played or
activated in a Showdown State."* The Enforcer is a unit without [Ambush], and the Poro's and the
Armory's abilities carry neither keyword. Both abilities are also confined to your own
turn, 381: *"All Activated Abilities can only be activated on the Controlling Player's Turn and
during an Open State."* So every +1 is bought in your Main Phase, before the move into the fight.

**From a battlefield, a ready goes home.** 144.4.b: *"Units may move from a Battlefield to their
Base."* The other direction is 144.4.a: *"Units may move from their Base to a Battlefield."* Jinx has
no [Ganking], so changing battlefields takes two moves, which is one discard after the first.

**The battlefield she leaves goes with her unless someone stays.** A cleanup follows every move
(319.8, *"After a Move is completed"*), and 190.4.c: *"If a player has no Units at a Battlefield and
the turn is in an Open state, they lose Control of that Battlefield in the following cleanup unless
there is a Combat or Showdown ongoing there."*

**Every event costs a card.** The Poro's and the Armory's discards are costs, 422.3: *"When Discarding
is listed as a Cost, then the Action must be able to be completed for the cost to be paid."* The
Enforcer's is part of an effect, 422.4: *"When Discarding is part of an effect, then a player must
Discard as many cards as possible from their hand."* Its example ends: *"If they have no cards in
hand, the entire discard instruction is ignored."* An Enforcer played from an empty hand discards
nothing, and Jinx does not trigger. Each Enforcer event costs two cards: itself and the discard.

## 3. Their deck: Body/Order, going wide

`OGS-023 Might of Demacia - Starter` (Body/Order): *"When you conquer, if you have 4+ units at that
battlefield, draw 2."* Its Chosen Champion is `OGS-007 Garen, Rugged`; it never comes down in this
walk. They play `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have
+1 :rb_might:."*, `UNL-111 Determined Sentry` (Body, E1, M1), `UNL-097 Kinkou Initiate` (Body, E3,
M3), `OGN-210 Daring Poro` (Order, E2, M2, [Assault]), `OGN-136 Pit Rookie` (Body, E2, M2) and
`OGN-218 Vanguard Captain` (Order, E3 + 1 Power, M3): *"[Legion] — When you play me, play two 1
:rb_might: Recruit unit tokens here. (Get the effect if you've played another card this turn.)"* §5
names their answers.

## 4. The turns, going first

Fury/Chaos against Body/Order. Your battlefield is G; theirs is B. Your opening four are Punching
Poro, Punching Poro, Unlicensed Armory and Chemtech Enforcer. Your draws are Chemtech Enforcer (T1),
`OGN-011 Magma Wurm` (T2), Chemtech Enforcer (T3) and a second Magma Wurm (T4). The Wurm (Fury, E8 +
1 Power) cannot be cast before T5 here; it is the discard fodder.

```
turn    runes   your turn                                                 points
T1      2       Punching Poro (E2) to base.                               0
their T1        Trusty Ramhound (E2) and Determined Sentry (E1) to base.
                Three runes, none left.
T2      4       The Poro walks to G, Conquer: +1. Unlicensed Armory (E2)  1
                and a second Punching Poro (E2) to base. None left.
their T2        Ramhound and Sentry walk to G: 3 + 1 against 2. Your
                Poro and the Sentry die. Conquer G. Daring Poro (E2)
                and Kinkou Initiate (E3) to G: 3 + 2 + 3, an 8. The
                Initiate draws 1. Five runes, none left.
T3      6       Jinx, Rebel from the Champion Zone (E5 + 1 Chaos Power)    2
                to base: five runes exhausted, one of them recycled.
                Armory: discard Magma Wurm, choose Jinx. Jinx readies,
                M6. Poro Empower: discard an Enforcer. Jinx M7, Poro M3.
                Jinx and the Poro walk to G: 7 + 3, a 10 against 8.
                All three of theirs die; your Poro dies. Conquer G.
                Five runes on the board, one ready.
their T3        Nothing to Hold. Pit Rookie (E2) and Vanguard Captain
                (E3 + 1 Order Power, Legion: two Recruits) to base,
                exhausted. Six runes on the board, two left ready.
T4      7       Hold G: +1. Chemtech Enforcer (E2) to G: discard the       4
                second Wurm. Jinx M6; she was already ready. Jinx walks
                G to base. Armory: discard the last Enforcer, choose
                Jinx. Jinx readies, M7. Jinx walks to B: Conquer, +1.
                Hand empty. Five runes left, idle.
their T4        Rookie, Captain and both Recruits walk to B: 7 against
                Jinx's 5. Jinx, the Captain and the Rookie die.
                Conquer B.
```

Their points: 0 after their T1, 1 after their T2, 1 after their T3, 2 after their T4. After your T4
it is **4 to 1**; after their T4, 4 to 2.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 3 after T2; 4 after the T3
draw, then 2 after the two discards; 3 after the T4 draw, then 0. Loose Cannon never fires in the
walk (four, three and two cards at the start of T2, T3 and T4). It draws on your T5, with your hand
empty.

**Your T2, why not the Enforcer.** With Jinx not on the board, its discard is an event nobody counts,
and it costs a card. The Armory enters ready (359.2.d: *"If it is a Non-Unit Gear, it enters the
Board Ready at the player's Base."*), so it can be used on T3.

**Their T2.** They take G rather than walk into the empty B. Ramhound is a 3 there, with the Sentry
beside it. Your Poro's 2 kills the Sentry, and their 4 kills the Poro. The Daring Poro goes first, so
the Initiate draws: its draw needs 5 Might among their other units, and Ramhound (3 beside the Poro)
and the Poro (2) make 5. The extra card is not an answer in this walk; §5 prices one. Both new units
go straight to G, which they control,
355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."*

**Your T3, the first discard is the move.** Jinx is played to base and enters exhausted (143.4). The
Armory's discard is a cost; Jinx's trigger resolves after it, 422.1.b: *"“When I am discarded”
abilities or other Triggered Abilities that trigger on discarding are executed after discarding has
occurred."* She readies and is a 6. The Poro's Empower is the second event: the ready does nothing
(415.1.c), the +1 makes her a 7, and the Poro is a 3. They had no runes ready to answer either
ability (377.3.b.2: *"Opponents have an opportunity to respond, as appropriate, as if a card was
played onto the chain."*). Jinx and the Poro walk in one move (144.3), and you have Focus, 464.2.c.1.a:
*"If a showdown opens as part of combat, this player gains Focus as the showdown begins."* Both pass.

465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their summed
Might among the other's Units."* Your 10 cover Ramhound 3, Initiate 3 and Daring Poro 2. Their 8 must
kill one unit in full before the next, 465.2.c.3: *"Units must have lethal damage assigned to them in
full before damage is assigned to a different Unit."* They have two choices. Jinx first is 7, then 1
on the Poro; but the Armory chose Jinx, so you pay a Fury Power, recycled off a rune (164.2.b,
*"Recycle this: [Reaction] — Add [C]."*), and she is healed and recalled instead of dying. That kills
nothing. Poro first is 3, then 5 on Jinx, which is not lethal on a 7. They take the Poro. Jinx holds
G, and you Conquer it, 469.1: *"Conquer: A player gains Control of a Battlefield they did not yet
Score this turn."*

**What the T3 discards bought.** Without them Jinx sits in base, exhausted, and your Poro (a 2) cannot
attack an 8. It walks to the empty B instead: also 2 to 1. But then their T3 begins with them holding
G, **2 to 2**, and with 8 Might still at G. With the discards it is 2 to 1 after their T3, and their
board is three units in base, played that turn. The second discard was the Might: without it Jinx is a
6 and the Poro a 2, and their 8 kill both: the Armory recalls Jinx, the Poro dies, and G is left
empty, so there is no Conquer. The Armory's discard paid for the move. Its protection paid by being
there: it turned their best assignment from Jinx to the Poro.

**Their T3.** Nothing of theirs is on the board, and they control no battlefield, so everything goes
to base (355.2.a) and enters exhausted (143.4). Nothing can reach Jinx at G this turn.

**Your T4, two discards, one move.** You Hold G at the start of the turn, 315.2.b.2: *"1. The Turn
Player Holds all Battlefields they Control."* Jinx is at G and ready. B is empty, and the only way she
reaches it this turn is G to base to B: two moves, with a discard between them. The Enforcer goes to G
first, because G has to keep a unit when she leaves (319.8, 190.4.c). Its discard is the event she
does not need: she is already ready (415.1.c), and the +1 has no combat to go to. Then she walks home,
the Armory's discard readies her, and she walks into B. The move contests B, and you have Focus, 345:
*"As a Showdown begins, the player who applied Contested status to the Battlefield gains Focus."* They
have two runes ready and pass. Conquer: **4 to 1**. You score G and B once each, 470: *"A player may
only Score, from either method, once per Battlefield per turn."*

**What the T4 discards bought.** One point, the Conquer of B: without the Armory's ready she cannot
get there. The other discard was spent on a +1 with nothing to fight. The price is Jinx. She stands
alone at B, a 5 again after your turn, and their four bodies in base are a 7. Kept at G instead, with
both Enforcers played there (the second one discards nothing, 422.4, but is a body), G is a 9 and B
is theirs for free: **3 to 2** after their T4, with Jinx alive. The walk takes the point.

**Your hand ran out before your mana.** Five of seven runes were idle on T4. The engine is card-bound:
every event is a card, and every Enforcer event is two.

**Their T4.** Their 7 against Jinx's 5: she dies. Your 5 kill the Captain and the Rookie, and the
Recruits hold B. Might of Demacia's draw needs four units at B, and two are left.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **6** cards by
T2 (four opening, one draw a turn from T1). With three of each (103.2.b), an Armory and a Punching
Poro both among the first 6 is **14.55%**; an Armory and two Poros, the walk's draw, is **1.71%**.
That counts only those cards. Jinx herself is not a draw: 100% under Loose Cannon. The entry's own
turn, all three Enforcers in hand, is **0.61%** by T4 (**8** cards seen), before counting the three
more cards they need to discard.

## 5. Breaks to

**The cheapest answer is one rune on their T2: hide `OGN-220 Facebreaker` or `OGN-213 Hidden Blade`
at G.** Hiding needs a battlefield they control, which they have after their T2 conquer, 811.1.b:
*"you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a
facedown card hidden there for as long as you control that battlefield. Beginning on the next turn,
this gains [Reaction] and you may play this, ignoring its base cost."* The rune comes out of the
Daring Poro's two, so G is a 6 (Ramhound 3, Initiate 3). On your T3 the card plays for nothing in the
combat at G, where its target has to be, 811.1.d.2: *"If a hidden spell or a play effect of a hidden
permanent chooses any targets, those targets must be chosen from among options at that battlefield,
unless the ability explicitly restricts targeting in a way that makes this impossible."*

- Facebreaker: *"Stun a friendly unit and an enemy unit at the same battlefield. (They don't deal
  combat damage this turn.)"* On the Initiate and Jinx, your damage is the Poro's 3 and theirs is
  Ramhound's 3. Your Poro dies; you kill one of the two; the other holds G and Jinx is recalled,
  466.1.a.2: *"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still
  present.”"* No Conquer: **1 to 1**, and they Hold G on their T3.
- Hidden Blade: *"Kill a unit at a battlefield. Its controller draws 2."* On Jinx, the Armory saves her
  for a Fury Power and recalls her to base; you draw 2. Your Poro alone is a 3 against 6. No Conquer.

**The scope of that verdict.** A Body/Order deck plays only Body, Order and Body/Order cards
(103.1.b.1), and its Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature
cards must have the Champion tag that corresponds to the Champion Legend of the deck."* Might of
Demacia's tag is Garen. The predicate is: a spell in those domains in `data/corpus_flat.txt`, with
[Action] or [Reaction], not banned, and not a Signature card (`signature` in `data/cards.json`) with
another champion's tag. The domain, keyword and ban filters give 39 spells. Two of them
are Signature cards a Garen deck cannot run: `UNL-204 Keeper's Verdict` (Poppy) and `SFD-206
Riposte` (Fiora). That leaves **37**, none at E0. `OGS-024 Decisive Strike` is the Garen Signature
and stays, at five runes. The other two Body/Order Signatures, `OGN-270 Showstopper` (Sett) and
`VEN-154 Public Execution` (Ambessa), have neither keyword. **4** of the 37 cost one rune and **19**
cost two (at most 2 Energy and 2 Power, the Power recycled off the same runes). One rune is the
floor: with none ready, nothing in the list can be cast, and hiding costs one. From hand, no unit in
those domains joins a combat for two runes: the ones playable as a [Reaction] start at three
(`VEN-123 Soulspinner`, E3; `OGN-241 Shen, Kinkou`, E3 + 1). From facedown, the [Hidden] ones do, for
the one rune that hid them; they are swept with the other hidden cards under your T3. The 23 are
checked in four windows. Each window prices single cards; the two-card cases found while walking
them are named where they occur.

**Your T3 at G.** In the walk they have no rune ready and nothing hidden, so nothing can be played.
Holding something back costs them a body on their T2, and there are three ways to do it: two runes
up instead of the Daring Poro, or a card hidden for one rune in place of either body. The predicate
for all three is: played in that combat or in answer to your Main Phase abilities, does it stop your
Conquer of G?

*Two runes up, G a 6 (Ramhound 3, Initiate 3) against your 10.* **Five of the 23 do, all at two
runes:**

- `OGN-127 Cannon Barrage` (E2 + 1 Body): *"Deal 2 to all enemy units in combat."* Their 6 then kill
  the Poro (1 more) and Jinx (5 more). Jinx is recalled by the Armory, your 10 kill both of theirs, and
  G is left empty: 466.5.b, *"If there are no Units remaining here controlled by any player, the
  Battlefield becomes Uncontrolled."*
- `OGN-213 Hidden Blade` from hand (E2 + 1 Order) and `OGN-220 Facebreaker` from hand (E2), as above.
- `SFD-097 Punch First` (E1 + 2 Body): *"Give a unit +5 :rb_might: this turn."* On the Initiate their
  Might is 11. Their 11 kill both of yours, and your 10 cannot kill 3 + 8.
- `VEN-126 Ki Barrier` (E2 + 1 Order): *"Choose a unit. Prevent the next 7 damage that would be dealt
  to it this turn."* On the Initiate, one of their two survives whatever you assign, and your units are
  recalled.

The other eighteen do not:

- `OGN-133 Flurry of Blades` puts 1 on all four. Your 10 still kill both of theirs, and their 6 kill
  only the Poro, since Jinx would need 6 more.
- `UNL-095 Grim Resolve` (+3), `SFD-151 Bonds of Strength` (+1 on two) and `VEN-072 Guttural Roar`
  (+2) leave them at 9, 8 and 8 against your 10.
- `OGN-128 Challenge` trades one of their units with one of yours before the combat, and Jinx wins
  what is left.
- `SFD-111 Here to Help` adds a defender of at most 3 Might for two runes, so 9: there is no Body or
  Order unit at E3 or less, with no Power cost, that has more.
- `SFD-163 Deathgrip` makes Ramhound a 5, alone.
- `UNL-175 Tactical Retreat` saves one of theirs by recalling it, which leaves G to you.
- `SFD-162 Blood Money` needs a unit of 2 Might or less, and you have none there.
- `OGN-224 Salvage` can kill the Armory, but their 6 cannot kill a 7.
- `OGN-145 Unyielding Spirit`, `UNL-106 Repulse`, `UNL-173 Sacrifice`, `OGN-129 Confront`,
  `OGN-146 Wallop`, `SFD-106 Show of Strength`, `SFD-166 Rally the Troops` and `UNL-103 Disposal
  Order` touch no unit in that combat.

Two cards: two Flurries, both runes, put 2 on all four. Their 6 then kill the Poro (1 more) and Jinx
(5 more), the Armory recalls her, your 10 kill both of theirs, and G is left empty.

*A hidden card.* The predicate for the scope is: a Body/Order card with [Hidden], not banned, legal
under 103.2.d.2. There are **seven**, none a Signature card: the units `OGN-135 Pakaa Cub` (Body, M3),
`VEN-117 Disciple of Shen` (Order, M1) and `VEN-135 Kennen, Keeper of Balance` (Order, M2), and the
spells `OGN-213 Hidden Blade`, `OGN-220 Facebreaker`, `SFD-111 Here to Help` and `SFD-154 Guards!`.
Played from facedown they cost nothing (811.1.b), they have [Reaction] (811.6), and what they put on
the board comes in at G, 811.1.d.1: *"A hidden permanent must be played to that battlefield."* and
811.1.d.3: *"If a hidden spell or a play effect of a hidden permanent causes you to play a unit, you
must choose to play that unit at that battlefield."* A unit that arrives joins the fight,
464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at this Battlefield
after this moment, it will gain the Attacker or Defender designation during the Cleanup phase
following the action that caused it to become present, as appropriate for its controller."* Hiding
costs one rune, so they keep either the Initiate (G a 6, one rune left up) or the Daring Poro (G a 5,
two up). **Three break it alone:**

- Hidden Blade and Facebreaker, as above, with either body kept.
- Kennen, with the Daring Poro kept and two runes up: *"When you play me or I attack, you may pay
  :rb_energy_2: to [Stun] a unit. (It doesn't deal combat damage this turn.) While there's a stunned
  enemy unit here, I have +2 :rb_might:."* He stuns Jinx and is a 4. G is Ramhound 3, Poro 2 and
  Kennen 4 against your Poro's 3; your Poro dies and G stays theirs. With the Initiate kept they have
  one rune, and he is a 2 that does nothing.

The other four do not, alone. The Cub makes G a 9 or an 8, Guards!' 2-Might Sand Soldier an 8 or a 7,
and the Disciple a 7 or a 6: its Shield needs *"exactly one other unit you control"*, and G has two.
Against your 10, they still kill only your Poro, and Jinx holds G. Here to Help needs a unit in hand,
which is a second card.

Two cards, walked against the same 23. With the Initiate kept and one rune up, `OGN-133 Flurry of
Blades` breaks it beside the Cub (9), Kennen (8) or the Sand Soldier (8). After Flurry their total
only has to reach 8 (2 for your Poro, 6 for Jinx), and your 10 still kill all of theirs, so G is left
empty. With the Daring Poro kept and two up, the Cub makes G an 8, and four spells break it: Flurry,
the same way; `UNL-095 Grim Resolve` (11), which your 10 cannot kill; and `VEN-072 Guttural Roar` or
`SFD-151 Bonds of Strength` (10), where everything dies. The Sand Soldier (7) breaks it only with
Grim Resolve (10). The Disciple (6) breaks it with none of them.

**Their T3, Jinx alone at G.** They have seven runes and an empty board. Hidden Blade (two runes) kills
her: the Armory's protection was for your turn only. G is then empty and is lost in the next cleanup
(190.4.c), so you have no Hold on T4. The other 22 do not remove a 5 from a battlefield with one
card.

**Your T4, the move into B.** They have two runes ready. The predicate is: does it stop your Conquer
of B, or take G from you? Three do:

- `OGN-213 Hidden Blade` in the showdown at B kills Jinx; the Armory recalls her. No Conquer: 3 to 1.
- `SFD-162 Blood Money` (*"Kill a unit at a battlefield with 2 :rb_might: or less."*) kills the
  Enforcer at G. You still Conquer B, but G is empty and lost.
- `OGN-128 Challenge`: their Captain, in base, and your Enforcer deal their Might to each other. The
  Enforcer dies; the Captain lives. Same result as Blood Money.

The other 20 do not. Cannon Barrage needs a combat, and B has no defender. Facebreaker needs a unit
of theirs at B, and Here to Help needs a battlefield they control. Flurry puts 1 on a 7 and on a 2.
The pumps and the rest have no unit of theirs at a battlefield to act on. Two cards: two Flurries put
2 on the Enforcer, and G is lost as with Blood Money.

No hidden card reaches this window or the two after it. They control no battlefield on their T3, so
they cannot hide anything then. A card hidden at G on their T2 and not used is removed when you take
G, 466.5.c: *"Remove all Hidden cards from this Battlefield that do not share a controller with the
Battlefield."* A card hidden on their T4 can be played only from their next turn on (811.1.b).

**Their T4, Jinx alone at B and the Enforcer alone at G.** Without a card they take one battlefield:
taking both needs 6 Might at B (5 to kill her, one body left after her 5) and 3 at G, and they have 7.
**Nine cards at two runes or less give them both, 4 to 3, seven of them on their own:** Hidden Blade
and Blood Money clear a battlefield before the attack. Punch First, Grim Resolve, Guttural Roar and
Bonds of Strength make the B attackers big enough to survive her. Cannon Barrage kills the Enforcer
in the G combat. Confront and Wallop do it too, but only with a unit in hand to play ready. The other
fourteen do not:
Challenge, Facebreaker, Flurry, Ki Barrier, Tactical Retreat, Deathgrip and Here to Help each leave
one battlefield short, and the other seven touch no unit in either fight.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their turns. In every line that holds something back, the Initiate draws
nothing, because Ramhound alone is a 2 or the Initiate is not played. In the walk the Initiate draws,
so they have seen **8** by their T3 and your T4 and **9** by their T4. One answer run three times is
among them in **40.30%** (6 cards), **50.82%** (8) and **55.58%** (9). With two of the T3 answers in
three copies each (six cards), **66.05%** by your T3.

## 6. Verdict

**Right about the count; silent about when the ready is worth anything.** Each discard readies Jinx
and makes her a point bigger, and three small discards are three events. But a ready only buys a move
when she is exhausted. That is on the turn she lands, or after she has already moved. In a Duel, the
move it buys from a battlefield is a walk home: changing battlefields is two moves, and the
battlefield she leaves needs another unit or it goes in the next cleanup. The +1 only counts if it comes before a
combat that turn. Walked, it paid twice. On T3 a free discard walked her, the turn she landed, into
the battlefield they held, and their three units died. On T4 a discard was the second half of G to
base to B, and it bought a Conquer at the price of leaving her alone. The other two discards
readied a Jinx who was already ready. The engine's limit is cards, not mana: the hand ran out with
five runes idle.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos runes, Loose Cannon's two
domains, in the twelve of Tournament Rules 402.1. Jinx on T3 needs one Chaos among the six runes
channelled by then: it fails in **1 of 924 deals, 0.11%**. The Armory's threat, which is what moved
their damage onto the Poro, also needs a Fury among them: needing both fails in **2 of 924 deals,
0.22%**. On T4 nothing costs Power, and a Fury for the Armory is on the board in **all 495 deals** of
eight runes.

Their walk assumes six Body and six Order. The Captain needs one Order among their first seven runes,
which holds in **all 792 deals**. For the answers: on your T3, with five runes, Hidden Blade and Ki
Barrier need one Order and Cannon Barrage one Body, which each fail in **6 of 792 deals, 0.76%**.
Punch First needs two Body: **96 of 792, 12.12%**. Facebreaker needs none, and hiding costs any rune.
On their T3, with seven runes, Hidden Blade's Order holds in every deal.
On your T4, Hidden Blade needs an Order rune beyond the one the Captain recycled: **6 of 792, 0.76%**.
On their T4 they have channelled nine runes, and every answer above holds in every deal.

I did not walk going second, the mulligan, or 2v2. Their hand holding no answer is the walk's
assumption; §5 prices it. The probabilities count only the cards named.

## Leads

- `prerequisites.easy` names three Fury/Chaos legends; `data/corpus_flat.txt` prints five. Missing are
  `SFD-185 Glorious Executioner` and `OGN-251 Loose Cannon`, and Loose Cannon carries the Jinx tag.
  103.2.a.2's own example makes Jinx, Rebel its Chosen Champion, so she starts in the Champion Zone
  (103.2.a.1): 100% available, against 45.73% by T3 as a three-copy deck card.
- Step 4 says three Enforcers put her at M8. That is right, but with her already on the board the
  three readies do nothing (415.1.c). A ready pays only when she is exhausted: when she lands (143.4),
  or after a move. The step does not say so.
- The three-Enforcer turn needs six cards in hand, because each Enforcer discards from hand and from an
  empty hand fires no event (422.4). All three Enforcers in hand by T4 is 0.61% on a 39-card pile.
- Step 5's *"base to a battlefield and back"*: from a battlefield a unit moves only to base (144.4.b).
  The battlefield it leaves is lost in the cleanup after the move (319.8, 190.4.c) unless another unit
  stays, so "and back" is two more discards.
- The Enforcer is not the cheapest discard. `VEN-007 Punching Poro`'s Empower (once per Poro) and
  `OGN-023 Unlicensed Armory` (once a turn, a gear that enters ready, 359.2.d) cost a card and no
  Energy. The Armory also protects the unit it chooses that turn, which is Jinx. Neither discard can be
  used in a showdown (308.1.a, 381), so every +1 has to come before the move into the fight.
