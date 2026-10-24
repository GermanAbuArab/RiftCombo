# Play — Decree of Focus takes the first spell, Crumbling Sands the second, and the free answer is the empty battlefield

Issue #440 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `crumbling-sands-decree-of-focus-conditional-reactions`**, the Calm ENGINE that holds
`VEN-039 Crumbling Sands` (Calm spell, E1 + 1 Calm Power, [Reaction], counters a spell if an opponent
has played another spell this turn) beside `VEN-040 Decree of Focus` (Calm spell, E1, [Reaction], +4 on
a friendly unit in combat with an enemy Fury unit or chosen by an enemy Fury spell), and calls them the
cheapest answers in Calm, each blank against the board it was not written for. The entry is right about
both conditions. Walked as a game, going first, under `OGN-261 Radiant Dawn` against the Fury/Chaos
Draven deck of [the En Garde play](2026-10-23-en-garde-wants-a-lone-body-they-attack-the-hammer-a-pair-they-leave-alone-and-both-end-where-a-plain-two-drop-does.md),
in the same seats, you keep two runes up on T2 behind a Poro and a Ramhound at A. **The main line:**
their Saboteur attacks A with `OGN-009 Hextech Ray` and `OGN-004 Cleave` behind it. Decree of Focus
makes the Ramhound a 7, so the Ray (the first spell) does not kill it. Crumbling Sands counters the
Cleave (the second). A stays yours: **1 to 0** after their T2, **3 to 2** after their T4. The same deal
with `OGN-044 Clockwork Keeper` in both slots loses A on their T2 and ends **3 to 3**. Two other
swaps get the main line's **3 to 2**: `OGN-045 Defy` in Crumbling Sands' slot, at the same rune, and
`OGN-046 En Garde` in Decree of Focus' slot. **The cheapest answer is free:** the Saboteur walks into
the empty B instead. Neither card can be cast, and the game ends **3 to 3**, the control's score. Once
they fight into the two runes, the cheapest answer is a third one-rune spell. Ray, Cleave,
`UNL-014 Monster Harpoon` and `OGN-169 Gust` each leave A empty, for one rune.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `b2d869d`, reads
773 entries, 262 with forced-ordering language, **97 in the queue and 7 of them with no play**, as the
issue measured at `e878182`. The two picks are unchanged: this entry is rank 92, the second in the list.
The other entry of this slice is rank 91, `combat-experience-feral-strength-repeat-versus-level`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-261 Radiant Dawn` (Calm/Order, tag Leona) |
| **Chosen Champion** | `OGN-238 Leona, Determined` (Order, E4 + 1 Order Power, M4), never played in the walk |
| **The counter** | `VEN-039 Crumbling Sands` (Calm spell, E1 + 1 Calm Power) |
| **The pump** | `VEN-040 Decree of Focus` (Calm spell, E1) |
| **The swaps** | `OGN-045 Defy` (Calm spell, E1 + 1 Calm Power) for the counter, `OGN-046 En Garde` (Calm spell, E1) for the pump, `OGN-044 Clockwork Keeper` (Calm, E2, M2) for both in the control |
| **The bodies** | `OGN-210 Daring Poro` (Order, E2, M2), `SFD-159 Trusty Ramhound` (Order, E2, M2), `OGN-054 Sunlit Guardian` (Calm, E3, M3), `OGN-216 Soaring Scout` (Order, E2, M1), `SFD-157 Royal Guard` (Order, E4, M2), `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) |

The entry admits any legend with Calm in its pair. Radiant Dawn is the one for this walk because its
text plays no part in it (*"When you stun one or more enemy units, buff a friendly unit. (If it
doesn't have a buff, it gets a +1 :rb_might: buff.)"*), and nothing here stuns. Its tag is Leona, so
Leona, Determined can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag
that matches the tag on your Champion Legend."*

Both cards are mono-Calm, so a Calm/Order deck admits them, 103.1.b.3: *"If a card has a single Domain,
then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three copies
of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."* None
of the cards in this play is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Crumbling Sands: *"[Reaction] (Play any time, even before spells and abilities resolve.) Counter a
  spell if an opponent has played another spell this turn."*
- Decree of Focus: *"[Reaction] (Play any time, even before spells and abilities resolve.) Choose a
  friendly unit that's in combat with an enemy Fury (:rb_rune_fury:) unit or that's being chosen by an
  enemy Fury spell. Give it +4 :rb_might: this turn."*
- Defy: *"[Reaction] (Play any time, even before spells and abilities resolve.) Counter a spell that
  costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*
- Hextech Ray (theirs): *"[Action] (Play on your turn or in showdowns.) Deal 3 to a unit at a
  battlefield."*
- Cleave (theirs): *"[Action] (Play on your turn or in showdowns.) Give a unit [Assault 3] this turn.
  (+3 :rb_might: while it's an attacker.)"*

## 2. What each condition reads, and what the rune costs

**"Another spell" counts from the moment it is on the chain.** Crumbling Sands' condition is not a
triggered ability; it checks whether a spell has been played, and 419.4.b says how: *"Non-triggered
abilities that check cards being played do so by means of referencing whether said cards have been
Finalized."* Its first example is the case that matters most here: *"A player plays a spell, which is
countered by Defy. Any Legion abilities of game objects controlled by that same player will be
active."* So the first spell does not have to resolve, and a first spell that was countered still
counts. A countered card is unplayed only for triggers, 425.1.b: *"A card that is Countered is not
considered to have been played for abilities that trigger on cards being played."* What Crumbling
Sands cannot do is counter the only spell of the turn: no other spell has been played.

**A [Repeat] spell is one spell.** 820.3.a: *"Regardless of the number of times a spell or ability's
instructions are executed with this keyword, it is only Played once."* So a `SFD-003 Blood Rush` with
its [Repeat] paid does not turn Crumbling Sands on by itself. Crumbling Sands counts plays, and 820.3.a
states the count, so the open [Repeat] reading (the #187 bullet in `docs/rules-notes/rules-findings.md`,
one play and two sets of choices) does not bear on it. No [Repeat] is paid in this walk.

**What a counter does.** 425.1.a: *"A card or ability that is Countered does nothing and is cleared from
the chain."* And it refunds nothing, 425.1.c: *"Countering does not refund any costs paid to play a
card, activate an ability, or trigger an ability."*

**Decree of Focus has two halves, and either one is enough.** The first is a unit *"in combat"*,
740.2.c: *"A unit is in combat if it is occupying a battlefield where combat is ongoing and has a combat
designation."* So it needs a combat at that battlefield with an enemy Fury unit in it. The second is a
unit being chosen by an enemy Fury spell, which is a spell on the chain with that unit as its target.
Either way the Decree is about the enemy's card, not about which spell of the turn it is, so it is live
on the first spell. The +4 lasts the turn and is read where combat reads Might, 465.2.c: *"Starting
with the Attacker, each player assigns an amount of damage equal to their summed Might among the
other's Units."* A spell whose target is no longer legal leaves it alone, 359.3.e.5: *"If any of the
spell's targets are no longer legal, those game objects, players, or zones are unaffected by the spell
as it resolves. Any instructions related to an illegal target can’t be followed."*

**Both are bought on their turn, after they commit.** Both have [Reaction], 813.1.c.1: *"This can be
played during Closed States on any player's turn."* and 813.1.b: *"Reaction grants the corresponding
card or effect all abilities and permissions of Action."* That includes 806.1.b: *"Action grants the
corresponding card or effect permission to be played or activated during Showdowns, even when it is not
the Controlling player's turn."* Their spells in the walk are [Action], so they can cast them in the
same showdown. In a combat the attacker acts first, 464.2.d: *"3. The Attacker gains Focus."*

**One ready rune for each, and the Calm Power from any Calm rune.** A rune adds Energy by exhausting,
164.2.a: *"[E]: [Reaction] — Add [1]."* It adds Power by leaving, 164.2.b: *"Recycle this: [Reaction] —
Add [C]."*, and 164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is
being Recycled."* The recycle has no exhaust in its cost, so an exhausted rune still pays it. Your runes
ready only on your own turn, 415.3.a: *"A player Readies all non-spell Game Objects they Control during
the Awakening Phase on their turn."* So on their turn Decree of Focus needs one rune you left ready.
Crumbling Sands and Defy each need one ready rune for the Energy and a Calm rune, ready or not, for the
Power. That can be the same rune, exhausted for the Energy and then recycled. The recycled rune goes to
the bottom of your rune deck, 416.1: *"Recycling cards is the action in which a player takes one or
more cards from a specific zone and then puts it on the bottom of the corresponding deck."* So your
board has one rune fewer from then on.

**Defy's cap reads the printed cost.** 206's second example: *"Defy is a spell which reads “Counter a
spell that costs no more than [4] and no more than [A].” Rocket Barrage is a spell that costs [4][C] and
has a Repeat cost of [4][C]. Rocket Barrage is a legal target for Defy even if Rocket Barrage’s Repeat
cost is paid, because Defy only checks the printed or copied cost of its target."* Every spell in their
walk hand costs E1, with at most one Power.

**Where a unit can be played, and the runes.** 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* A unit played to a battlefield you
already control opens no showdown, 190.3.a.1: *"Units moving to or being played to a battlefield apply
Contested status if that battlefield is not already Contested and that Unit’s controller does not
already control that battlefield."* It enters exhausted, 143.4: *"Units enter the Board exhausted."*,
and it still defends. Going first, you channel to 2, 4, 6 and 8 runes on T1 to T4, less any you
recycle. Units move from base to a battlefield and back, never between battlefields, 144.4.a: *"Units
may move from their Base to a Battlefield."* 144.4.b: *"Units may move from a Battlefield to their
Base."* No unit in this walk has [Ganking].

## 3. Their deck: Fury/Chaos Draven

The deck of the En Garde play linked above, in the same seat, with spells in its hand this time.
`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your
units remain after combat.)"* Its Chosen Champion is `OGN-028 Draven, Showboat`, never played. Their
bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion Rearguard` (Fury, E2, M2),
`OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-165 Cemetery
Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you play me, return a unit from your trash to your
hand."*) and `OGN-171 Mystic Poro` (Chaos, E2, M2). Their spells are Hextech Ray (Fury, E1 + 1 Fury
Power) and Cleave (Fury, E1). Going second, they channel an extra rune on T1, 485.7: *"First Turn
Process: The player going second channels an extra Rune from their Rune Deck during their first Channel
Phase of the game."*

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you
conquer here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-210 Hall of
Legends` (*"When you conquer here, you may pay :rb_energy_1: to ready your legend."*, and neither
legend has an exhaust ability). Your opening four are Daring Poro, Trusty Ramhound, Crumbling Sands and
Decree of Focus. Your draws are Sunlit Guardian (T1), Soaring Scout (T2), Royal Guard (T3) and
Vanguard Captain (T4). Their opening four are Noxus Saboteur, Legion Rearguard, Hextech Ray and Cleave.
Their draws are Pouty Poro (T1), Dangerous Duo (T2), Cemetery Attendant (T3) and Mystic Poro (T4).

The main line is the list with both cards, against an opponent who attacks A on their T2.

```
turn      runes   your turn                                                 points
T1        2       Daring Poro (E2) to base. None left.                      0
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       The Poro walks to A, empty, Conquer: +1. Trusty           1
                  Ramhound (E2) to A. Two left.
their T2  5       Legion Rearguard (E2) to base. The Saboteur attacks
                  A. Hextech Ray (E1, one Fury recycled) on the
                  Ramhound; Decree of Focus (E1): the Ramhound is a 7,
                  and the Ray marks 3. Cleave (E1) on the Saboteur;
                  Crumbling Sands (E1, one Calm recycled) counters it.
                  The Saboteur's 3 kill the Poro; your 9 kill the
                  Saboteur. A stays yours. One left.
T3        5       Hold A: +1. Sunlit Guardian (E3) and Soaring Scout       2
                  (E2) to A. None left.
their T3  6       The Rearguard walks to B, empty, Conquer. Cemetery
                  Attendant (E3 + 1 Chaos Power): the Saboteur comes
                  back to their hand. Noxus Saboteur (E3) to base. Six
                  runes, one recycled; none left.
T4        7       Hold A: +1. Royal Guard (E4) to A, its Sand Soldier      3
                  with it. Vanguard Captain (E3 + 1 Order Power, with
                  Legion) to A, two Recruits with him. Seven runes, one
                  recycled; none left.
their T4  7       Hold B. Pouty Poro (E2), Dangerous Duo (E3) and
                  Mystic Poro (E2) to base. None left.
```

Their points: 0 after their T1, 0 after their T2, 1 after their T3, 2 after their T4. After their T2
it is **1 to 0**; after your T3, **2 to 0**; after their T3, **2 to 1**; after your T4, **3 to 1**;
after their T4, **3 to 2**.

Runes on your board at the end of each turn: 2, 4, 3 after their T2, 5, 6 after your T4. On theirs: 3,
4 after their T2, 5 after their T3, 7.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5 after the T2 draw, 4 after the
Ramhound, 2 after the Decree and Crumbling Sands on their T2 (Sunlit Guardian, Soaring Scout); 3 after
the T3 draw, 1 after the Guardian and the Scout (Royal Guard); 2 after the T4 draw, 0 after the Guard
and the Captain. Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the T2 draw, 2 after the
Rearguard, the Ray and the Cleave (Pouty Poro, Dangerous Duo); 3 after the T3 draw, 2 after the
Attendant, 3 with the Saboteur back, 2 after the Saboteur; 3 after the T4 draw, 0 after the three
bodies.

**Your T2: two runes up, two bodies at A.** The Poro takes A, which is empty: a non-combat showdown,
316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a
stand-alone Phase and do not create a Combat."* They spent all three runes on their T1, so it is a
Conquer, 348.2.a.1: *"This results in a Conquer if that player has not yet scored that Battlefield this
turn."* The Ramhound goes to A, which you now control (355.2.a), with no showdown (190.3.a.1). A is the
Poro's 2 and the Ramhound's 3, with company: 5. Sunlit Guardian would leave one rune, so it waits; the
two runes left are one for each reaction.

**Their T2: the attack, and the first spell.** The Saboteur, a 3, attacks a 5, so it needs both
spells. The Ray on the Ramhound (3 against 3) kills it, and the Cleave makes the Saboteur a 6 that kills
the Poro and survives the Poro's 2. That takes A, and the legend draws. The attacker has Focus
(464.2.d) and plays the Ray first, exhausting one rune for the Energy and recycling a Fury rune for the
Power. You answer with Decree of Focus: the Ramhound is both in combat with an enemy Fury unit and
chosen by an enemy Fury spell. It resolves first, and the Ramhound is 2 + 1 + 4 = **7**. Then the Ray
resolves and marks 3, which is not lethal, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount
greater than or equal to that Unit’s Might."* Crumbling Sands could not have answered the Ray: no other
spell had been played this turn.

**The second spell.** The chain closes and Focus moves on, 347.1.b: *"When that Chain closes, Focus
passes to the next Player in Turn Order."* You pass, and it comes back to them, 347.2.b: *"Otherwise,
Focus passes to the next Player in Turn Order."* Cleave on the Saboteur would still pay: a 6 kills the
Poro (2) and puts 4 on the Ramhound, whose 3 marked make 7, lethal. Both of yours die, your 9 kill the
Saboteur, and A is left empty, 466.5.b: *"If there are no Units remaining here controlled by any player,
the Battlefield becomes Uncontrolled."* So they play it. Crumbling Sands counters it: the Ray was the
other spell (419.4.b). You exhaust your last ready rune for the Energy and recycle a Calm rune for the
Power.

**The combat.** The Saboteur is a 3 against the Poro's 2 and the Ramhound's 7. Lethal goes to one unit
in full first, 465.2.c.3: *"Units must have lethal damage assigned to them in full before damage is
assigned to a different Unit."* Their 3 kill the Poro and put 1 on the Ramhound, 4 marked on 7. Your 9
kill the Saboteur. Only your unit remains, so A stays yours and their legend does not draw. Damage heals
at the end of the turn.

**Your T3 and theirs.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* Five runes, three left on the board after the
recycle and two channelled, buy the Guardian and the Scout at A: the Ramhound's 3, the Guardian's 4
while defending (*"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
damage first.)"*), and the Scout's 1, **8**. Their only ready body is the Rearguard, a 2, so it takes
the empty B, and you have no rune up. The Attendant brings back the Saboteur that Decree of Focus and
Crumbling Sands killed.

**Your T4 and theirs.** You Hold A. The Guard and the Captain go to A, and A defends at 3 + 4 + 1 + 2 +
2 + 3 + 1 + 1 = **17**. Their ready bodies are the Attendant and the Saboteur, 6, so nobody attacks.
They Hold B: **3 to 2**.

**The control: Clockwork Keeper in both slots, same deal.** On T2 the Ramhound goes to A and a Keeper
(E2, its Calm Power not paid, so no draw) to base, and no rune is left. Their T2 is the line they
planned: the Ray kills the Ramhound, and the Cleave makes the Saboteur a 6. Its 6 kill the Poro, and
the Poro's 2 do not kill it. They take A, and the legend draws: **1 to 1**. On your T3 (six runes) the
Keeper walks from base into B, empty, a Conquer, and the Guardian and the second Keeper join it: **2 to
1**. They Hold A on their T3, and the Rearguard (2) does not attack B (8 while defending): **2 to 2**.
You Hold B on T4 and they Hold A: **3 to 3**.

**Defy in Crumbling Sands' slot.** The same line, for the same rune. Decree of Focus takes the Ray,
and Defy counters the Cleave, which costs E1 and no Power. **3 to 2.** Defy would also have countered
the Ray, the first spell.

**En Garde in Decree of Focus' slot.** En Garde: *"[Reaction] (Play any time, even before spells and
abilities resolve.) Give a friendly unit +1 :rb_might: this turn, then an additional +1 :rb_might: this
turn if it is the only unit you control there."* On the Ramhound beside the Poro it is +1, a 4, and
the Ray's 3 do not kill it. But after the countered Cleave, the Saboteur's 3 are exactly the 1 the
Ramhound has left and the Poro's 2: both die, your 6 kill the Saboteur, and A is empty. So you hold En
Garde instead. The Ray kills the Ramhound, Crumbling Sands counters the Cleave, and En Garde goes on the
Poro, now alone at A: 2 + 1 + 1 = 4. Its 4 kill the Saboteur, and the Saboteur's 3 do not kill it. A
stays yours with the Poro instead of the Ramhound, and the game goes as the main line: **3 to 2.** The
walk never needs more than En Garde's +2 against a 3-Might attacker.

**If the Saboteur takes B instead.** On their T2 the Rearguard and the Pouty Poro go to base, and the
Saboteur walks into B, empty: a non-combat showdown with no spell in it, so neither card can be cast.
**1 to 1**, and your two runes did nothing. On your T3 (six runes, none recycled) you Hold A, and Royal
Guard and its Soldier go to A, two runes up again: **2 to 1**. A defends at 2 + 3 + 2 + 2 = 9, and their
ready bodies in base are 4, so on their T3 they Hold B and play the Attendant (nothing in their trash)
and the Duo: **2 to 2**. You Hold A on T4 and they Hold B: **3 to 3**, the control's score, with both
reactions still in hand.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 6 cards by T2 (four opening, one draw a turn from T1).
With three copies, a Crumbling Sands among the first 6 is **40.30%**, and so is a Decree of Focus. Both
are **14.55%**. Their Ray and their Cleave both among their own first 6 is **14.55%** too.

## 5. Breaks to

**What the engine did, and the predicate.** On their T2 Decree of Focus kept the Ramhound alive through
the Ray, and Crumbling Sands countered the Cleave that would have killed it anyway. A stayed yours. The
predicate is: played by them on their T2 with the five runes they had, does it leave A not yours after
their T2?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* As in the En Garde play, that is
**252** cards folded by name (not a legend, battlefield, rune or token, and not a Signature card with
another champion's tag), less the five banned in constructed (`Called Shot`, `Draven, Vanquisher`,
`Fight or Flight`, `Scrapheap`, `Stealthy Pursuer`): **247**. **62** of them are spells.

**The free answer: the empty battlefield.** The Saboteur takes B. Decree of Focus has no combat to read
and Crumbling Sands no spell, so both are blank. **No rune, and 1 to 1** after their T2 instead of
1 to 0. They still have the Ray and the Cleave, and the game ends 3 to 3, as the control did.

**Fighting into the two runes, the one-rune answers.** Fewer spells are no help to them. With the Ray
alone, Decree of Focus blanks it and the Saboteur dies attacking a 9. With the Cleave alone, Decree of
Focus makes the Ramhound a 7, and their 6 kill only the Poro. A stays yours both ways. What breaks the
line is a third spell after Crumbling Sands has been spent, and it has to fit in their last rune. The
predicate for the candidates: of the 62 spells, a card with [Action] or [Reaction] (the regex
`\[(Action|Reaction)\]`, case-insensitive, reminder text left in) that costs no more than E1 and one
Power. That is **11** cards, and **4** of them break the line:

- **`OGN-009 Hextech Ray`** again (E1 + 1 Fury Power), on the Poro: it dies, the Ramhound is alone and
  a 6 with 3 marked, and the Saboteur's 3 kill it. The Ramhound's 6 kill the Saboteur, and A is empty
  (466.5.b). **One rune, a second Fury recycled.**
- **`UNL-014 Monster Harpoon`** (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in
  showdowns.) Deal 2 to a unit at a battlefield. If you control a facedown card, deal 4 to it
  instead."* 2 on the Poro, the same result. **One rune, a second Fury recycled.**
- **`OGN-169 Gust`** (Chaos, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* The Poro
  goes back to your hand, the same result. **One rune, no Power**, and the Decree could not have stopped
  it outside combat, because Gust is Chaos.
- **`OGN-004 Cleave`** again (E1): the Saboteur is a 6, which kills the Poro and puts 4 on the
  Ramhound, 7 marked. Both die, your 9 kill the Saboteur, and A is empty. **One rune.**

None of the four takes A for them: the Saboteur dies in every line. The other seven do not touch it.
`SFD-003 Blood Rush` and `UNL-010 Vault Breaker` give +2, so the Saboteur is a 5: the Poro dies and 3 go
on the Ramhound, 6 of its 7. `UNL-134 Existential Dread` stuns an attacking enemy, and yours defend.
`VEN-015 Decree of Rage` deals 4 to a Calm unit, and the Poro and the Ramhound are Order.
`OGN-179 Acceptable Losses` and `SFD-135 Factory Recall` act on gear, and `OGN-183 Stacked Deck` draws.

**Two spells in the other order do not break it either.** Gust first, in their Main Phase, on the Poro
(spell one, Chaos, out of combat: neither card can answer it) leaves the Ramhound alone, a 2. The
Saboteur attacks it, Decree of Focus makes it a 6, and Crumbling Sands counters the second spell,
whichever it is. The Saboteur's 3 do not kill a 6. Two open runes and these two cards answer two
one-rune spells in any order. The third is what does it.

**What the counter cannot reach.** Defy and Crumbling Sands cost the same, E1 and one Calm Power. Over
the 62 spells, Defy's printed cap (206) leaves out **11**: `OGN-014 Sky Splitter`, `OGN-022 Thermo
Beam`, `OGN-025 Blind Fury`, `OGN-029 Falling Star`, `OGN-172 Rebuke`, `OGN-198 The Harrowing`,
`OGN-203 Possession`, `OGS-002 Firestorm`, `SFD-145 Switcheroo`, `SFD-147 Downwell` and `UNL-140
Conscription`. Exactly one of the 62 prints *"This can't be countered"*: `VEN-015 Decree of Rage`, which
is within Defy's cap. So Defy can counter **50** of the 62, Crumbling Sands **61**, but only as the
second spell of a turn. Decree of Rage is the one Fury spell neither counter reaches, and Decree of
Focus answers it. Its 4 damage go on a Calm unit, the Decree makes that unit +4, and Sunlit Guardian is
then a 7.

**What the pump cannot reach.** Of the 247, **76** of the 154 units and **30** of the 62 spells are
Chaos only. Decree of Focus does nothing against those unless a Fury unit is in the same combat.

## 6. Verdict

**Right about both conditions; Defy does Crumbling Sands' job here, and the free answer is the
battlefield they do not hold.** Walked going first against the Draven deck, the list held two runes on
T2 behind a Poro and a Ramhound at A. When the Saboteur attacked with a Ray and a Cleave behind it,
Decree of Focus took the first spell and Crumbling Sands the second. A stayed yours: **1 to 0** after
their T2, **3 to 2** after their T4. Two Clockwork Keepers in the slots lose A on their T2: **3 to 3**.
Defy in Crumbling Sands' slot does the same for the same rune, and could counter the first spell too.
En Garde in Decree of Focus' slot does the same against a 3-Might attacker. Crumbling Sands countered
the second spell, as the entry says, and the first spell did not have to resolve for that (419.4.b).
The opponent's free answer is to walk into the empty battlefield. Then neither card can be cast:
**3 to 3**, the control's score. Fighting into the two runes, they need a third one-rune spell, and four
cards in their pool do it: Hextech Ray, Monster Harpoon, Gust and Cleave.

## 7. Not verified

I did not deal the channel order. The walk assumes six Calm and six Order runes for you, Radiant
Dawn's two domains, in the twelve of Tournament Rules 402.1. Crumbling Sands on their T2 needs a Calm
among your first four runes, ready or not: it fails in **15 of 495, 3.03%**, the deals with four Order
first. Defy in its slot needs the same, also 3.03%. Decree of Focus, En Garde, the Clockwork Keepers
with their cost unpaid, and every body before T4 need no Power. The Vanguard Captain on T4 needs an
Order among the seven runes left of your first eight, since the recycled rune is a Calm: with six Calm in
the deck the first eight hold at least two Order, **0 of 495**.

Their walk assumes six Fury and six Chaos. The Ray on their T2 needs a Fury among their first five: it
fails in **6 of 792, 0.76%**, the deals with five Chaos first. A second Ray or a Harpoon as the third
spell needs a second Fury among those five: it fails in **96 of 792, 12.12%**, the deals with one Fury
or none. Gust and Cleave take any rune. The Cemetery Attendant on their T3 needs a Chaos among the runes
left of their first seven, after one Fury was recycled: with six Fury it cannot fail, **0 of 792**.

**How likely an answer is.** The walk fixes their opening four and their first two draws. Had either
draw been one of the ten copies of the four breakers left in the other 35 cards (two Rays, two Cleaves,
three Harpoons, three Gusts), A would have been empty after their T2: **49.58%**. That counts only the
cards named, not how many of them a deck runs. The free answer, B, needs no card at all.

Their deciding to attack A is the walk's choice of opponent; §4 walks the other one. Not walked: going
second, the mulligan, 2v2, a rune split other than six and six, an attack with Chaos units only, two-rune
answers with the Rearguard left in hand, Decree of Rage on the Sunlit Guardian, and the turns after
their T4.

## Leads

- The name, *"neither is castable on the first spell of a turn"*: only Crumbling Sands is. Decree of
  Focus has no spell-count condition. In the walk it answered the Ray, the first spell, because the Ray
  was a Fury spell choosing the Ramhound and the Ramhound was in combat with a Fury unit.
- The name and the payoff note, *"The cheapest answers in Calm are one Energy each"* and *"The cheapest
  counter in the domain"*: Crumbling Sands is E1 and one Calm Power, which is one rune exhausted and then
  recycled. `OGN-045 Defy` costs exactly the same and counters the first spell as well. Against the
  Fury/Chaos pool, Defy's printed cap (206) reaches 50 of the 62 spells and Crumbling Sands 61, but
  Crumbling Sands only as the second spell. The only spell neither counter reaches is `VEN-015 Decree
  of Rage` (*"This can't be countered"*).
- Step 2, *"Let their first spell resolve"*: it does not have to. 419.4.b checks a non-triggered
  condition by Finalization, and its first example is a spell countered by Defy that still turns
  [Legion] on. So Crumbling Sands can counter a second spell while the first is still on the chain, or
  after the first was countered.
- Step 1 and the third easy prerequisite (*"Leave 1 Energy and 1 Power open"*; *"an already-exhausted
  rune still pays it, but 415.3.a means a rune tapped for ENERGY is gone until your Awakening"*):
  correct. In practice that is one ready rune, plus a Calm rune in any state, which may be the same
  rune. The recycle is a rune off your board for the rest of the game (416.1), which the entry does not
  say.
- The notable *"against a deck that casts one big spell a turn it is blank"*: it is blank against any
  turn with one spell in it, and also against a turn with no fight. In the walk the opponent's free
  answer was to walk into the empty battlefield, where neither card can be cast.
- The notable *"it hoses exactly one domain"*, against a Fury/Chaos deck: 76 of its 154 legal units and
  30 of its 62 spells are Chaos only, and Decree of Focus is blank against them unless a Fury unit is in
  the same combat. `OGN-169 Gust` is a one-rune Chaos removal it cannot answer outside combat.
- What the pair covers between them: Decree of Rage, the one Fury spell no counter reaches, deals 4 to a
  Calm unit, and Decree of Focus makes that unit +4.
- No answer is named. The free one is the empty battlefield. Fighting into both, it is a third one-rune
  spell after Crumbling Sands is spent: `OGN-009 Hextech Ray`, `UNL-014 Monster Harpoon`,
  `OGN-169 Gust` or `OGN-004 Cleave`.
