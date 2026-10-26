# Play — The Helm costs your turn four, their three spells cost three runes more, and Acceptable Losses kills it for two

Issue #466 (a slice of #200), 2026-10-26. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `helm-empowered-spell-tax`**, the one-card Calm ENGINE in which `VEN-045 Helm of
Suppression` (Calm gear, E4 + 1 Calm Power, [Empower] E4 + 1 Calm Power) makes every opponent spell
cost 1 Energy more, and once Empowered 1 Energy and one Power of any domain more. The entry prices the
bill at 8 Energy and 2 Power and says the Power half is the claim. It is right about the bill and
about the tax. Walked as a game, going first, under `OGN-261 Radiant Dawn` against the Fury/Chaos
Draven deck of [the Decree of Focus play](2026-10-23-decree-of-focus-takes-the-first-spell-crumbling-sands-the-second-and-the-free-answer-is-the-empty-battlefield.md),
in the same seats and on the same battlefields. **The main line:** the Helm takes your whole T4: all
eight runes, two of them recycled. On their T4 they take your battlefield A with three spells and an
attack, and each spell costs them a rune more: their board drops from 9 runes to **4** where the same
three spells would have left 7. A falls, your five units at A die, and it is **3 to 4** after their
T4. **The control** spends the same T4 on two bodies at A instead of the Helm. A defends at 22, nobody
attacks, and it is **3 to 3**. **The cheapest answer is two runes, one recycled:** `OGN-179 Acceptable
Losses` (Chaos, E1) kills the Helm, since it is your only gear, for E2 and one Power under the tax. Cast
first, it also lifts the tax off the three spells behind it, and their board ends at 6 runes instead
of 4.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-25 at `a67d27f`, reads
773 entries, 266 with forced-ordering language, **94 in the queue and 3 of them with no play**, as the
issue measured. This entry is rank 44, a hit on *first*; the other entry of this slice is rank 76,
`protective-sands-few-runes-fury`. Neither had a play before. Both entered the queue at `0098d17`
(#460): run at `3fadb16` the queue was 93 long and neither was in it, and at `0098d17` it is 95 with
both. That commit appended the same CORRECTED sentence to a step of each entry, and the sentence says
*"going first"*, which is the ordering word the picker matched.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-261 Radiant Dawn` (Calm/Order, tag Leona) |
| **Chosen Champion** | `OGN-238 Leona, Determined` (Order, E4 + 1 Order Power, M4), never played |
| **The engine** | `VEN-045 Helm of Suppression` (Calm gear, E4 + 1 Calm Power) |
| **The bodies** | `OGN-210 Daring Poro` (Order, E2, M2), `SFD-159 Trusty Ramhound` (Order, E2, M2), `OGN-216 Soaring Scout` (Order, E2, M1), `OGN-054 Sunlit Guardian` (Calm, E3, M3), `OGN-052 Stalwart Poro` (Calm, E2, M2) |
| **The control's T4** | `SFD-157 Royal Guard` (Order, E4, M2), `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) |

The entry admits any legend with Calm in its pair. Radiant Dawn is the one for this walk because its
text plays no part in it: *"When you stun one or more enemy units, buff a friendly unit. (If it
doesn't have a buff, it gets a +1 :rb_might: buff.)"* Nothing here stuns. Its tag is Leona, so Leona,
Determined can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit with a champion tag that
matches the tag on your Champion Legend."*

The Helm is mono-Calm, so a Calm/Order deck admits it, 103.1.b.3: *"If a card has a single Domain,
then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three copies
is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."* The deck
runs three; the entry asks for one. None of the cards in this play, on either side, is a Signature card
(`signature` in `data/cards.json`), and none is in `data/legality.src.json` or marked [BANNED] in
`data/corpus_flat.txt`.

The card text the play turns on:

- Helm of Suppression: *"[Empower] :rb_energy_4::rb_rune_calm: (:rb_energy_4::rb_rune_calm:: Empower
  this. Use only if not Empowered.) Opponents' spells cost :rb_energy_1: more. If this is [Empowered],
  they cost :rb_energy_1::rb_rune_rainbow: more instead."*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*
- Sunlit Guardian: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat
  damage first.)"*, and Stalwart Poro: *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- Soaring Scout: *"[Deathknell] — Channel 1 rune exhausted. (When I die, get the effect.)"*
- Royal Guard: *"When you play me, play a 2 :rb_might: Sand Soldier unit token here."*
- Vanguard Captain: *"[Legion] — When you play me, play two 1 :rb_might: Recruit unit tokens here.
  (Get the effect if you've played another card this turn.)"*
- Daring Poro's [Assault] is idle: it never attacks.

## 2. What the Helm costs, what the tax is, and when it applies

**The bill is 8 Energy and 2 Calm Power.** The play cost is E4 and one Power of the card's own domain,
135.2.e.6: *"Power of a domain corresponding to a card’s own Domain is not represented by a symbol, but
appears in these rules similarly to other symbols. Its shorthand is [C]."* The [Empower] is E4 and one
Calm Power more. A gear goes to base, 149.2: *"Gear can only be played to a player's Base unless an
effect specifies otherwise."*, and it enters ready, 359.2.d: *"If it is a Non-Unit Gear, it enters the
Board Ready at the player's Base."* The [Empower] is an activated ability, 827.1.c.1: *"Empower is
functionally short for “[Cost]: Empower this. Play only if not Empowered.”"* Its cost has no exhaust, so
the turn the Helm lands is legal, and a gear's ability waits for your own Main Phase, 151.2: *"The
Activated Ability of Gear may be executed at any time during the controlling player's Main Phase during
an Open State, and not during a Showdown."* Once paid the state stays, 441.1.a: *"Empowered is a binary
state. A Game Object is Empowered or it isn’t."*

**Where the 8 Energy and the 2 Power come from.** A rune adds Energy by exhausting, 164.2.a: *"[E]:
[Reaction] — Add [1]."*, and Power by leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, and
164.2.b.1: *"The Power added this way corresponds to the Domain of the Rune that is being Recycled."*
The recycle has no exhaust in its cost, so an exhausted rune still pays it. Going first you channel to
2, 4, 6 and 8 runes on T1 to T4, so T4 is the first turn with eight. All eight are exhausted for the
Energy and two Calm runes among them are then recycled for the Power. A recycled rune goes to the
bottom of the Rune Deck, 416.1: *"Recycling cards is the action in which a player takes one or more
cards from a specific zone and then puts it on the bottom of the corresponding deck."*, and comes back
only when it is channelled from there again, 430.1: *"Channeling is the action of taking one or more
Runes from the top of a player's Rune Deck and putting them on the board."* So the Helm leaves you
with 6 runes, and with nothing else played that turn.

**The tax lands on every spell of theirs, the first one too.** A cost increase is a step in working out
what a card costs, 356.3: *"Apply cost increases."* The Power it adds is any domain, 135.2.e.5.a:
*"When required as a cost, [A] can be paid by Power of any Domain."* The only way their deck makes
Power is a recycle, so every spell they cast under the Empowered Helm takes one rune more off their
board than it would have, and one more Energy. The entry's own step 4 says this since its 2026-10-24
correction: there is no free Power floor while their Rune Deck still holds runes. Increases come before
discounts, 356.4: *"Apply discounts."*, and nobody in this walk has a discount.

**The tax does not widen your counters**, as the entry says. 206: *"Effects that need to determine a
card’s cost for any purpose always use its printed or copied cost, even if that cost is increased,
decreased, or ignored as the card is played."* This deck runs no counter, so it does not come up.

**Their answers to the Helm are taxed too.** A spell that kills it is cast while it is on the board,
so it pays the tax. That is why the cheapest answer in §5 is the cheapest one at taxed prices, not at
printed ones.

**Combat.** Damage is read at the end of the showdown, 465.2: *"When the Showdown closes, Attackers and
Defenders resolve Combat Damage at the Battlefield that was attacked, using their current Might."*
465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal to their summed
Might among the other's Units."* [Tank] goes first, 815.1.b: *"I must be assigned lethal damage before
any other unit with the same controller as me that does not have [Tank] during the Combat Damage
step."* Lethal goes to one unit in full first, 465.2.c.3: *"Units must have lethal damage assigned to
them in full before damage is assigned to a different Unit."* A unit dies at its Might, 142.4.b:
*"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* Units move
from base to a battlefield and back, never between battlefields, 144.4.a: *"Units may move from their
Base to a Battlefield."* 144.4.b: *"Units may move from a Battlefield to their Base."* A unit is played
to base or to a battlefield you control, 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* Your runes ready only on your own turn,
415.3.a: *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on their
turn."* So after a T4 that exhausts all eight, nothing of yours is up on their T4.

## 3. Their deck: Fury/Chaos Draven

The deck of the Decree of Focus play linked above. `SFD-185 Glorious Executioner` (Fury/Chaos): *"When
you win a combat, draw 1. (You win if only your units remain after combat.)"* Its Chosen Champion is
`OGN-028 Draven, Showboat`, never played. Their bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3),
`OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-013 Pouty Poro`
(Fury, E2, M2) and `OGN-171 Mystic Poro` (Chaos, E2, M2). Their spells:

- `OGN-009 Hextech Ray` (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in showdowns.) Deal
  3 to a unit at a battlefield."*
- `UNL-014 Monster Harpoon` (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in showdowns.)
  Deal 2 to a unit at a battlefield. If you control a facedown card, deal 4 to it instead."* They
  control no facedown card.
- `OGN-004 Cleave` (Fury, E1): *"[Action] (Play on your turn or in showdowns.) Give a unit [Assault 3]
  this turn. (+3 :rb_might: while it's an attacker.)"*

Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you
conquer here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-210 Hall of
Legends` (*"When you conquer here, you may pay :rb_energy_1: to ready your legend."*, and their legend
has no exhaust ability). Your opening four are Daring Poro, Trusty Ramhound, Soaring Scout and Helm of
Suppression. Your draws are Sunlit Guardian (T1), Stalwart Poro (T2), Royal Guard (T3) and Vanguard
Captain (T4). Their opening four are Noxus Saboteur, Legion Rearguard, Hextech Ray and Cleave. Their
draws are Pouty Poro (T1), Dangerous Duo (T2), Mystic Poro (T3) and Monster Harpoon (T4).

The main line plays the Helm and Empowers it in one turn, as the entry's step 2 allows.

```
turn      runes   your turn                                                 points
T1        2       Daring Poro (E2) to base. None left.                      0
their T1  3       Noxus Saboteur (E3) to base. None left.                   0
T2        4       The Poro walks to A, empty, Conquer: +1. Trusty           1
                  Ramhound (E2) and Stalwart Poro (E2) to A. None left.
their T2  5       The Saboteur walks to B, empty, Conquer. Legion           1
                  Rearguard (E2) and Dangerous Duo (E3) to base. None
                  left.
T3        6       Hold A: +1. Sunlit Guardian (E3) and Soaring Scout       2
                  (E2) to A. One left.
their T3  7       Hold B. Pouty Poro (E2) and Mystic Poro (E2) to base.     2
                  Three left.
T4        8       Hold A: +1. Helm of Suppression (E4 + 1 Calm Power) and  3
                  its [Empower] (E4 + 1 Calm Power): all eight
                  exhausted, two Calm recycled. None left.
their T4  9       Hold B. Hextech Ray (E2 + 1 Fury + 1 any) kills the      4
                  Ramhound; Monster Harpoon (E2 + 1 Fury + 1 any) kills
                  the Daring Poro; Cleave (E2 + 1 any) on the Duo. The
                  Rearguard, the Duo, Pouty Poro and Mystic Poro (2 + 6
                  + 2 + 2 = 12) attack A. All three of yours there die;
                  three of theirs die. Conquer A. Three left.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **2 to 1**; after their T3,
**2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 4**.

Runes on your board at the end of each turn: 2, 4, 6, 6 after your T4, 7 after their T4 (the Scout's
Deathknell). On theirs: 3, 5, 7, 4 after their T4.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro (Ramhound, Scout, Helm, Guardian); 5
after the T2 draw, 3 after the Ramhound and the Stalwart Poro (Scout, Helm, Guardian); 4 after the T3
draw, 2 after the Guardian and the Scout (Helm, Royal Guard); 3 after the T4 draw, 2 after the Helm
(Royal Guard, Vanguard Captain). Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the T2
draw, 3 after the Rearguard and the Duo (Ray, Cleave, Pouty Poro); 4 after the T3 draw, 2 after the two
Poros (Ray, Cleave); 3 after the T4 draw, 0 after the three spells, 1 after their legend's draw.

**Your T2 and T3: a wall at A.** The Poro takes A, which is empty: a non-combat showdown, 316.8.b.1:
*"Showdowns that occur as a result of a player moving to an empty Battlefield are a stand-alone Phase
and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a Conquer if that player
has not yet scored that Battlefield this turn."* After T3, A defends at the Poro's 2, the Ramhound's
3, the Stalwart Poro's 3, the Guardian's 4 and the Scout's 1: **13**. Their ready bodies on their T3
are the Rearguard and the Duo, 5, so they do not attack. You Hold A each turn, 469.2: *"Hold: A player
maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*

**Your T4: the Helm, and nothing else.** Eight runes, eight Energy, two Calm recycled for the two Calm
Power. Royal Guard and Vanguard Captain stay in hand. A is still 13.

**Their T4: three spells and an attack.** Their ready bodies in base are the Rearguard, the Duo and the
two Poros, 9 Might against 13. Three spells close the gap, in their Main Phase, before the attack. The
Ray deals 3 to the Ramhound, which is a 3 with company, and kills it. The Harpoon deals 2 to the Daring
Poro and kills it. Cleave gives the Duo [Assault 3]. A now defends at 3 + 4 + 1 = 8 against 2 + 6 + 2 +
2 = 12. You have no rune up to answer anything. Their 12 must kill the Guardian first (815.1.b): 4, then
the Stalwart Poro 3 and the Scout 1. Your 8 kill the Rearguard, Pouty Poro and Mystic Poro, and the last
2 go on the Duo, a 6. Only their units remain: they win the combat, their legend draws 1, and A is
theirs, 466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored this
Battlefield this turn."* The Scout's Deathknell channels you a rune, exhausted. **3 to 4.**

**What the tax took.** Untaxed, the three spells are E3 and two Fury Power: three runes exhausted, two
of them recycled, and their board ends at 7. Taxed they are E6 and five Power, two of it Fury: six
exhausted, five recycled, and their board ends at **4**. The tax cost them three runes off the board
for the rest of the walk, and three Energy they had spare that turn. It did not stop the attack.

**The control: Royal Guard and Vanguard Captain on T4.** The same deal. On T4 the Guard goes to A with
its Sand Soldier, and the Captain follows with [Legion] on and two Recruits. That is E7 and one Order
Power: seven runes exhausted, one recycled, one left. A defends at 13 + 2 + 2 + 3 + 1 + 1 = **22**. On
their T4 the same three spells take 5 of it, and their 12 do not reach the 17 left, so nobody attacks.
They Hold B: **3 to 3**, with A yours, eight units on it, 7 runes on your board and the Helm in hand.

**The tax with no spells.** If they cast nothing on their T4, the Helm does nothing, as the entry
says. They do not attack 13 with 9 and they Hold B: **3 to 3**. Your board is then 13 at A on 6 runes;
the control's is 22 on 7.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 8 cards by T4. A Helm among them is **50.82%** with
three copies and **20.51%** at the entry's one. Going second they have seen 8 by their T4: a Ray and a
Harpoon both is **24.20%** at three copies each, and Ray, Harpoon and Cleave all three is **10.63%**.

## 5. Breaks to

**What the engine did, and the predicate.** From their T4 on, every spell of theirs costs a rune more.
The predicate is: played by them on their T4 with the 9 runes they have, does it take the Helm off the
board?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* As in the Decree of Focus play,
that is **252** cards folded by name (not a legend, battlefield, rune or token, and not a Signature card
with another champion's tag), less the five banned in constructed: **247**, of them **154** units,
**62** spells and **31** gear.

**The candidates.** The regex `\bgears?\b` (case-insensitive, on the `data/corpus_flat.txt` line)
matches **44** of the 247. I read all 44. Eight of them remove a gear an opponent controls; the rest are
gear of their own, or cards that make, move or return their own gear. The eight, with the Helm's tax
added to each spell:

| card | printed | under the Empowered Helm | what it does to the Helm |
|---|---|---|---|
| `OGN-179 Acceptable Losses` (Chaos spell) | E1 | E2 + 1 any | kills it, if it is your only gear |
| `SFD-135 Factory Recall` (Chaos spell) | E1 | E2 + 1 any | returns it to your hand |
| `SFD-005 Detonate` (Fury spell) | E1 + 1 Fury | E2 + 1 Fury + 1 any | kills it, and you draw 2 |
| `VEN-003 Brittle Steel` (Fury spell) | E2 + 1 Fury | E3 + 1 Fury + 1 any | kills it |
| `VEN-102 Ravenbloom Prefect` (Chaos unit) | E3 | E3, not a spell | banishes it as it is played |
| `OGN-180 Fading Memories` (Chaos spell) | E4 + 1 Chaos | E5 + 1 Chaos + 1 any | kills it at your next Beginning Phase |
| `OGN-022 Thermo Beam` (Fury spell) | E5 + 2 Fury | E6 + 2 Fury + 1 any | kills it, and every other gear |
| `SFD-147 Downwell` (Chaos spell) | E8 + 2 Chaos | E9 + 2 Chaos + 1 any | returns it, and every unit and gear |

**The cheapest answer: Acceptable Losses, two runes, one recycled.** *"[Action] (Play on your turn or
in showdowns.) Each player kills one of their gear."* Each player picks one of their own gear. The Helm
is your only gear, so it is the one that dies, and they have none. Under the Helm it costs E2 and one
Power: two runes exhausted, one of them recycled. Factory Recall costs the same and is worse for them:
the Helm goes back to your hand, and you can pay the 8 Energy and 2 Power again.

**Cast first, it pays for itself.** On their T4 they have 9 runes. Acceptable Losses first, taxed: E2
and one Power. The Helm is gone, so the Ray, the Harpoon and Cleave cost their printed E3 and two Fury
Power. In all that is E5 and three Power: five runes exhausted, three recycled. Their board ends at
**6** runes, not the main line's 4, and the attack goes as in §4. A is theirs, **3 to 4**, and your T4
bought nothing. Holding Acceptable Losses by their T4 is **50.82%** at three copies.

**Detonate is the trap.** At printed cost it looks as cheap as Acceptable Losses. Under the Helm it is
E2 and two Power, so both its runes are recycled, and it hands you two cards, as its text says: *"Kill a
gear. Its controller draws 2."*

**Ravenbloom Prefect is the one answer the tax cannot reach.** *"When an opponent plays a gear, you may
banish me to banish it."* It is a unit, so it costs E3 with or without the Helm. It has to be on their
board before your T4: then the Helm is banished as it is played, before you can pay its [Empower] in an
Open State (151.2). You lose the first 4 Energy and 1 Power, and they lose the Prefect. Seeing it, you
keep the Helm in hand.

**The free answer: cast no spell.** The Helm taxes nothing else. If they play bodies and Hold B, as
above, it is **3 to 3** and they are on 9 runes to your 6. The control reaches the same 3 to 3 with A at
22 and 7 runes. With no spell cast, the Helm is still a turn behind the control.

## 6. Verdict

**Right about the bill and about the tax, and the tax did not decide the game.** The Helm cost your
whole T4 going first: eight Energy, two Calm runes off the board. From their T4 on, each spell cost
them one rune more. They cast three on their T4 and paid three runes more than untaxed, ending on 4
runes instead of 7. Those three spells and an attack took A, because the turn the Helm ate was the
turn that would have put 9 more Might there. **3 to 4** after their T4, against the control's **3 to
3** with A at 22. The cheapest answer is Acceptable Losses, two runes and one of them recycled. Cast
first, it lifts the tax off everything after it. The free answer is to cast no spell, and then the Helm
has cost you a turn for nothing.

## 7. Not verified

**Runes.** I did not deal the channel order. The walk assumes six Calm and six Order runes for you,
Radiant Dawn's two domains, in the twelve of Tournament Rules 402.1. The main line recycles two Calm on
T4 out of the first eight runes: it fails only when seven or more of those eight are Order, which six
Order cannot be, **0 of 495**. The control recycles one Order on T4: also **0 of 495**. Nothing else
of yours costs Power.

Their walk assumes six Fury and six Chaos. Their T4 recycles five runes, two of them for Fury Power,
out of the first nine. It fails only when one or no Fury is among the nine, which six Chaos cannot
be: **0 of 220**. The Acceptable Losses line needs two Fury among the nine as well: **0 of 220**.

**How likely the answer is.** The walk fixes their opening four and their four draws, and Acceptable
Losses is not among them. A copy among their first 8 cards of 39, at three copies, is **50.82%**. That
counts only the one card, not how many a Fury/Chaos list runs.

`data/cards.json` carries no champion supertype. I read Leona, Determined as a champion unit by her
title name and her Leona tag. Their choice to attack A on their T4, and not to on their T3, is the
walk's choice of opponent; §5 prices the others. Not walked: going second; the Helm played on T3 and
Empowered on T4, which starts the Energy half of the tax a turn earlier and leaves it open to an
untaxed Acceptable Losses for E2; the mulligan; 2v2; a rune split other than six and six; a counter in
your list, which the tax would not help (206); and the turns after their T4.

## Leads

- The answer list (*"What does answer it, from a grep of every gear-removal line in the pool"*) misses
  four Chaos cards: `OGN-179 Acceptable Losses`, `SFD-135 Factory Recall`, `OGN-180 Fading Memories`
  and `SFD-147 Downwell`, and the unit `VEN-102 Ravenbloom Prefect`. It also misses `OGN-224 Salvage`
  (Order, E2 + 1 Order Power): *"[Action] (Play on your turn or in showdowns.) You may kill up to one
  gear. Draw 1."* In Fury/Chaos the cheapest answer is Acceptable Losses, E1 printed.
- The same list prices its spells at printed cost. Each is cast while the Helm is on the board, so
  each pays the tax: Detonate is E2 + 1 Fury + 1 any under the Empowered Helm, two runes, both
  recycled. Ravenbloom Prefect is a unit and is not taxed.
- The notable *"An Empowered Helm therefore caps at TWO the number of spells they can cast off that
  floor"* still rests on the free floor of 2 Power a turn that the 2026-10-24 correction to step 4
  withdrew. In the walk they cast three taxed spells in one turn off 9 runes and recycled five.
- `terminatesIn`, *"it slows their turns, it scores nothing"*: in the walk it slowed nothing that
  scored. The cost to you was the turn: A was 9 Might short of the control's 22, and it fell. Against
  the control the Helm was a point behind after their T4 (3 to 4 against 3 to 3).
- The entry names no free answer. It is to cast no spell, and then the Helm has cost you your T4 for
  nothing.
- The Power of the play cost is Calm, the card's own domain (135.2.e.6). The prerequisite says only
  that the [Empower] asks for Calm Power; both halves do.
