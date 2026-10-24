# Play — En Garde wants a lone body they attack, the Hammer a pair they leave alone, and both end where a plain two-drop does

Issue #429 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `en-garde-hand-hammer-alone-versus-pair`**, the Calm ENGINE that puts `OGN-046 En Garde`
(Calm spell, E1, [Reaction]) beside `VEN-027 Hand Hammer` (Calm Equipment, E2, M+1, [Equip] one Calm
Power) and calls them a deckbuilding fork: En Garde pays its second point to a unit that is the only
one you control where it stands, and the Hammer pays +2 to a carrier with exactly one other unit of
yours at its battlefield. The entry is right that the two never pay together, and right about the
sizes, one and two. Walked as a game, going first, under `OGN-261 Radiant Dawn` against the Fury/Chaos
Draven deck of [the Guard's pair play](2026-10-18-the-guards-pair-has-to-walk-out-of-base-and-one-answer-is-not-enough-to-stop-the-keepers-discount.md),
the three lists were dealt the same hand with one card changed. **The En Garde list** keeps its Poro
alone at A on T2 with two runes up. Their Saboteur attacks it, but they play `OGN-016 Dangerous Duo`
first, and its [Legion] +2 makes the Saboteur a 5, which En Garde's 4 cannot beat. The Poro dies
unanswered. On T3 En Garde wins A back with a lone Ramhound: **2 to 2** after their T3, **3 to 3**
after their T4. **The Hand Hammer list** puts a pair at A on T2, and the Hammer makes it 8, so the
Saboteur takes the empty battlefield instead: **2 to 2**, one rune recycled for good. **The control**,
`OGN-044 Clockwork Keeper` in the slot, puts the same pair at A without the Hammer, 5. The Saboteur
takes the empty battlefield there too: **2 to 2**. Only an opponent who attacks before playing the Duo
lets En Garde move a point, **3 to 1** after their T3. The cheapest answer to En Garde is that Duo,
played before the attack, at no cost beyond the turn they had planned. One rune buys three more:
`OGN-004 Cleave`, `SFD-003 Blood Rush` or `OGN-169 Gust`. Nobody needs to answer the Hammer: they go
where it is not.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `bdfc1f2`, reads
773 entries, 262 with forced-ordering language, **97 in the queue and 9 of them with no play**. The
issue measured 99 in the queue at `0526f2c`, with 9 unplayed. The queue lost two entries since then.
The two picks are unchanged, and each is two ranks higher: rank 92 then, 90 now. The pick is by global
rank, skipping entries that already have a play: this entry is rank 90, the second in the list. The
other entry of this slice is rank 89, `punching-poro-morbid-return-free-empower`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-261 Radiant Dawn` (Calm/Order, tag Leona) |
| **Chosen Champion** | `OGN-238 Leona, Determined` (Order, E4 + 1 Order Power, M4), never played in the walk |
| **The fork** | `OGN-046 En Garde` (Calm spell, E1) in one list, `VEN-027 Hand Hammer` (Calm gear, E2, M+1) in the other, `OGN-044 Clockwork Keeper` (Calm, E2, M2) in the control |
| **The bodies** | `OGN-210 Daring Poro` (Order, E2, M2), `SFD-159 Trusty Ramhound` (Order, E2, M2), `OGN-054 Sunlit Guardian` (Calm, E3, M3), `OGN-216 Soaring Scout` (Order, E2, M1), `SFD-157 Royal Guard` (Order, E4, M2), `OGN-218 Vanguard Captain` (Order, E3 + 1 Order Power, M3) |

The entry admits any legend with Calm in its pair. Radiant Dawn is the one for this walk because its
text plays no part in it (*"When you stun one or more enemy units, buff a friendly unit."*), and
nothing here stuns. Its tag is Leona, so Leona, Determined can be the Chosen Champion, 103.2.a.2:
*"Must be a champion unit with a champion tag that matches the tag on your Champion Legend."*

Both fork cards are mono-Calm, so a Calm/Order deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."*
Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same
named card."* Each list runs three of its card and none of the other's. None of the cards in this play
is a Signature card (`signature` in `data/cards.json`), and none is in `data/legality.src.json` or
marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- En Garde: *"[Reaction] (Play any time, even before spells and abilities resolve.) Give a friendly
  unit +1 :rb_might: this turn, then an additional +1 :rb_might: this turn if it is the only unit you
  control there."*
- Hand Hammer: *"[Equip] :rb_rune_calm: (:rb_rune_calm:: Attach this to a unit you control.) [Effect]
  I have +2 :rb_might: while I'm at a battlefield with exactly one other unit you control."*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*
- Dangerous Duo (theirs): *"[Legion] — When you play me, give a unit +2 :rb_might: this turn. (Get the
  effect if you've played another card this turn.)"*

## 2. One, two, and when each is read

**En Garde counts your side only.** Its clause is *"the only unit you control there"*, which is the
rules' word *alone*, 740.2.a: *"A unit is alone when there are no other friendly units at the same
location."* The enemy units at that battlefield do not count. A unit alone at a battlefield gets +2;
one with any other unit of yours beside it gets +1.

**The Hammer counts your side too, and needs exactly one more.** Its [Effect] is inactive until it is
attached, 136.2.b: *"Effect Text is inactive unless the card with the Effect Text is Attached to another
card."* Attached, it becomes the carrier's text, 136.2.c: *"The abilities in the Effect Text section of
a card are appended to the Rules Text of the card to which the card with the Effect Text is Attached."*
So its *"I"* is the carrier, 053.1: *"Units and legends say "I," "me," etc."* Its Might Bonus applies
whatever the count, 434.1.d: *"The Top-Most Card has its Might modulated by the Might Bonus of all
cards Attached to it."* A carrier at a battlefield with exactly one other unit of yours is +3; alone, or
with two others, or in base, it is +1.

Both cards have been read this way in earlier plays. En Garde was the one-rune answer that gave +2 to
a Poro left alone in
[the Mother's plus two kept the attacker alive](2026-10-14-the-mothers-plus-two-kept-the-attacker-alive-and-one-rune-answers-the-strike-eight-ways.md),
and only +1 to a Sea Monkey with company in
[the garrison goes home on turn six](2026-10-07-the-garrison-goes-home-on-turn-six-and-four-bodies-come-back.md).
The Hammer's clause was one of three switched off by any third body in
[the board that cannot be improved](2026-09-14-the-board-that-cannot-be-improved.md).

**En Garde is bought after they commit; the Hammer before.** En Garde has [Reaction], 813.1.c.1: *"This can be
played during Closed States on any player's turn."* So you cast it in the
showdown of their attack, after they have moved. The Hammer's [Equip] has no [Reaction], and a gear's
activated ability waits for your own turn, 151.2: *"The Activated Ability of Gear may be executed at any
time during the controlling player's Main Phase during an Open State, and not during a Showdown."* It
is on the board, attached, before they decide where to attack, and they can see it.

**The opponent is not done when you cast it.** In a combat the attacker acts first, 464.2.d: *"3. The
Attacker gains Focus."* And an [Action] card plays in that showdown, 806.1.b: *"Action grants the
corresponding card or effect permission to be played or activated during Showdowns, even when it is
not the Controlling player's turn."* So En Garde can be answered after it resolves, and it can be
pre-empted before the attack is declared, by anything that makes the attacker bigger than 4.

**Combat is a sum.** 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage
equal to their summed Might among the other's Units."* And 465.2.c.3: *"Units must have lethal damage
assigned to them in full before damage is assigned to a different Unit."*

**What the Hammer costs.** Two Energy to play, and one Calm Power to attach. Power is paid by recycling
a rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, and 164.2.b.1: *"The Power added this way
corresponds to the Domain of the Rune that is being Recycled."* A rune already exhausted for Energy
can be recycled, so the Hammer is three runes on the turn and one of them leaves the board for good.
If its carrier leaves the board, the Hammer stays, 719.5: *"When a Top-Most Card changes zones from a
board zone to a non-board zone, all Attached cards Detach from it, remaining in their current zones."*
At a battlefield it goes home, 435.4.a: *"If the Detached card was a Gear and this causes it to become
present at a Battlefield, it will be Recalled during the next Cleanup."* Attaching it again costs
another Calm Power.

**Where a unit can be played.** 355.2.a: *"By default, Valid locations include the controller’s Base
or a Battlefield the controller controls."* A unit played to a battlefield you already control opens
no showdown, 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested status if
that battlefield is not already Contested and that Unit’s controller does not already control that
battlefield."* That is how the Hammer list and the control get two units to A on T2, going first. A
unit played there enters exhausted, 143.4: *"Units enter the Board exhausted."* It still defends.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4. Units move from base to a
battlefield and back, never between battlefields, 144.4.b: *"Units may move from a Battlefield to
their Base."*

## 3. Their deck: Fury/Chaos Draven

The deck of the Guard play linked above, in the same seat. `SFD-185 Glorious Executioner`
(Fury/Chaos): *"When you win a combat, draw 1. (You win if only your units remain after combat.)"* It
fires once in the main line. Its Chosen Champion is `OGN-028 Draven, Showboat`, never played. Their
bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion Rearguard` (Fury, E2, M2),
Dangerous Duo (Fury, E3, M3), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-171 Mystic Poro` (Chaos, E2,
M2), `OGN-165 Cemetery Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you play me, return a unit
from your trash to your hand."*), `OGN-006 Flame Chompers` (Fury, E3, M3) and `OGN-012 Noxus Hopeful`
(Fury, E4, M4; *"[Legion] — I cost :rb_energy_2: less."*). Going second, they channel an extra rune on
T1, 485.7: *"First Turn Process: The player going second channels an extra Rune from their Rune Deck
during their first Channel Phase of the game."*

## 4. The turns, going first

Calm/Order against Fury/Chaos. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you
conquer here, you may spend a buff to draw 1."*, and nobody has a buff); theirs is B, `SFD-210 Hall of
Legends` (*"When you conquer here, you may pay :rb_energy_1: to ready your legend."*, and neither
legend has an exhaust ability). Your opening four are Daring Poro, Trusty Ramhound, Sunlit Guardian
and the fork card: En Garde, Hand Hammer or Clockwork Keeper. Your draws are Soaring Scout (T1), Royal
Guard (T2), Vanguard Captain (T3) and a second Daring Poro (T4). Their opening four are Noxus
Saboteur, Legion Rearguard, Dangerous Duo and Pouty Poro. Their draws are Mystic Poro (T1), Cemetery
Attendant (T2), Flame Chompers (the legend's draw on T2), Noxus Hopeful (T3) and a second Legion
Rearguard (T4).

The main line is the En Garde list.

```
turn      runes   your turn                                                 points
T1        2       Daring Poro (E2) to base. None left.                      0
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       The Poro walks to A, Conquer: +1. Trusty Ramhound (E2)    1
                  to base. Two left, En Garde in hand.
their T2  5       Legion Rearguard (E2), then Dangerous Duo (E3): its
                  +2 on the Saboteur, a 5. The Saboteur attacks A: 5
                  against the Poro's 2. The Poro dies, Conquer; the
                  legend draws 1. None left.
T3        6       The Ramhound, alone, attacks A. En Garde (E1): it is a    2
                  4 against the Saboteur's 3. The Saboteur dies,
                  Conquer: +1. Sunlit Guardian (E3) to A, Soaring
                  Scout (E2) to base. None left.
their T3  7       The Rearguard and the Duo walk to B, empty, Conquer.
                  Cemetery Attendant (E3 + 1 Chaos Power) to base: the
                  Saboteur comes back to their hand. Noxus Hopeful (E2
                  with Legion) and Pouty Poro (E2) to base. Seven
                  runes, one recycled; none left.
T4        8       Hold A: +1. Royal Guard (E4) to A, its Sand Soldier      3
                  with it. Vanguard Captain (E3 + 1 Order Power, with
                  Legion) to A, two Recruits with him. Eight runes, one
                  recycled; one left.
their T4  8       Hold B. Noxus Saboteur (E3), Flame Chompers (E3) and
                  Mystic Poro (E2) to B. None left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T3 it
is **2 to 1**; after their T3, **2 to 2**; after your T4, **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5, then 4 after the Ramhound; 5 after
the T3 draw, 2 after En Garde, the Guardian and the Scout (Royal Guard, Vanguard Captain); 3 after the
T4 draw, 1 after the Guard and the Captain (Daring Poro). Theirs: 5 after the T1 draw, 4 after the
Saboteur; 5 after the T2 draw, 3 after the Rearguard and the Duo, 4 after the legend's draw; 5 after
the T3 draw, 4 after the Attendant, 5 with the Saboteur back, 3 after the Hopeful and the Pouty Poro;
4 after the T4 draw, 1 after the three bodies (Legion Rearguard).

**Your T2: the Poro is left alone on purpose.** The Poro takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are
a stand-alone Phase and do not create a Combat."* They have no rune ready, so it is a Conquer,
348.2.a.1: *"This results in a Conquer if that player has not yet scored that Battlefield this turn."*
The Ramhound goes to base, not to A, because A with two of yours is the board En Garde cannot pay
twice on. Two runes stay up and En Garde needs one, so one rune does nothing this turn. With the
Scout played as well, no rune would be left for En Garde.

**Their T2: the Duo goes first.** A is one 2-Might Poro, and you have two runes up. Playing the
Rearguard first turns on the Duo's [Legion], and its +2 makes the Saboteur a 5 before it moves. Those
are the bodies they meant to play this turn anyway; only the order is new, and it costs them nothing.
En Garde would make the Poro a 4 against a 5: their 5 kill it, and its 4 do not kill the Saboteur. So
you do not cast it. Only their unit remains, 466.5.d: *"Establishing Control results in a Conquer if
that player has not yet scored this Battlefield this turn."*

**Your T3: En Garde on the attack.** The Ramhound, ready in base (315.1.b: *"1. The Turn Player readies
all Game Objects they control that are able to be readied."*), attacks A alone. The Duo's +2 lasted
only their turn, so the Saboteur is a 3 again. The Ramhound's own clause needs company and has none. En
Garde makes it 2 + 1 + 1 = **4**, alone at A, and their five runes were all spent on their T2, so
nothing answers it. Its 4 kill the Saboteur; the Saboteur's 3 do not kill it. A is yours again. The
Guardian then goes to A, which you control (355.2.a), with no showdown (190.3.a.1): A is the
Ramhound's 3, now with company, and the Guardian's 4 while defending (*"[Shield] (+1 :rb_might: while
I'm a defender.)"*), **7**.

**Their T3: the empty battlefield.** Their ready bodies are the Rearguard and the Duo, 5 against A's
7, so they take B, empty, through a non-combat showdown in which you have no rune up. The Attendant
brings back the Saboteur that En Garde killed. The Hopeful costs two with [Legion], since the
Attendant was played first.

**Your T4 and theirs.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* The Guard and the Captain go to A, and A is 3 +
4 + 2 + 2 + 3 + 1 + 1 = **16** while defending. Their base holds the Attendant, the Hopeful and the
Pouty Poro, 3 + 4 + 2 = 9, so they do not attack. They Hold B: **3 to 3**.

**If they attack before playing the Duo.** Then the Saboteur is a 3 when it reaches A, and En Garde in
the showdown makes the Poro a 4: its 4 kill the Saboteur and the Saboteur's 3 do not kill it. They
score nothing and the legend does not draw; the Rearguard and the Duo go to base after: **1 to 0**. On
your T3 you Hold A, and the Ramhound takes B, empty: **3 to 0**. The six runes put the Royal Guard and
its Soldier at A (6) and the Scout at B beside the Ramhound, 3 + 1 = 4. Their 5 take B on their T3:
they kill both of yours and you kill the Duo, so the Rearguard is left. The legend draws, and the
Scout's [Deathknell] channels you a rune. **3 to 1** after their T3. This is the only line in the
walk where the fork card moves a point.

**The Hand Hammer list, same deal.** On T2 the Poro takes A and the Ramhound is played to A beside it.
The Hammer (E2) goes to base and is attached to the Ramhound for a recycled Calm rune; it moves to A
with its carrier, 719.3: *"A Top-Most Card and all cards Attached to it are at the same location."*
The Ramhound is 2 + 1 (the Hammer's bonus) + 1 (its own clause) + 2 (the Hammer's clause) = 6, and A
is **8**. Their Saboteur, even at 5 with the Duo, does not attack 8. It walks into B instead, empty,
a Conquer: **1 to 1**. On T3 you Hold A, and your five runes (six channelled, one recycled) put the
Royal Guard and its Soldier in base, not at A, because a third body at A switches the Hammer off. That
leaves one rune. On their T3 they Hold B; their Rearguard and Duo, 5, do not attack 8. **2 to 2**,
with one rune fewer than the control and no unit lost on either side. Equipped to the Poro alone
instead, the Hammer makes it a 3, and the Saboteur with the Duo's +2 kills it and survives; the Hammer
is recalled to your base (435.4.a), and the recycled rune is gone.

**The control: Clockwork Keeper in the slot, same deal.** On T2 the Ramhound is played to A beside the
Poro, and the Clockwork Keeper (E2, its Calm Power not paid, so no draw) goes to base. A is 2 + 3 =
**5**. Their Saboteur at 5 against it would kill both and die, and A would be left with nobody, 466.5.b:
*"If there are no Units remaining here controlled by any player, the Battlefield becomes
Uncontrolled."* That scores nothing for them; the empty B scores one. They take B: **1 to 1**. On T3
you Hold A and the Guardian goes to A, 9; the Clockwork Keeper alone could not take B from the
Saboteur, 2 against 3. On their T3 they Hold B, and their 5 do not attack 9. **2 to 2.**

**The En Garde list that does not keep the Poro alone** plays the control's T2: the Ramhound at A, 5,
and En Garde in hand is +1 there, not +2. It is the control's game, with En Garde in hand instead of
the Clockwork Keeper in base.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 6 cards by T2 (four opening, one draw a turn from
T1). With three copies, En Garde among the first 6 is **40.30%**, and so is the Hand Hammer. Their
Dangerous Duo among their own first 6 is **40.30%**. The Duo, Cleave, Blood Rush and Gust together,
twelve cards with three of each, are among their first 6 in **90.93%**.

## 5. Breaks to

**What the engine did, and the predicate.** In the main line En Garde won A back on your T3 with a
lone Ramhound. In the line where they attack first, it killed the Saboteur on their T2 and kept A.
The Hammer made A 8 on T2, and nobody attacked it. The predicate is: played by them on their T2,
before or during the attack on A, does it leave the Poro dead and a unit of theirs at A?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* As in the Guard play, that is
**252** cards folded by name (not a legend, battlefield, rune or token, and not a Signature card with
another champion's tag), less the five banned in constructed: **247**.

**The free answer: the Duo, played first.** The main line. Dangerous Duo is a card they hold and a body
they were going to play this turn; played after a card that turns on its [Legion], its +2 goes on the
attacker before it moves. En Garde's 4 do not beat 5. **No rune beyond the turn they had planned.** The
Poro dies, and En Garde stays in hand for your T3. The Duo is the only card in their walk hand that
does it, but any pump played before the attack works the same way. A visible pair, like the Hammer's,
is never answered at all: the Saboteur goes to the empty battlefield.

**The one-rune answers in the showdown.** If they attack first and keep their five runes up, the
showdown is open to them (806.1.b). **52** of the 247 have [Action] or [Reaction] in their text (the
regex `\[(Action|Reaction)\]`, case-insensitive, on the text with reminder text left in, which also
catches [Ambush] and [Quick-Draw]). Of those, thirteen cost one rune or less: one Energy, or one Power
paid by recycling the same rune. Three break the line for one rune and no Power:

- **`OGN-004 Cleave`** (Fury, E1): *"Give a unit [Assault 3] this turn. (+3 :rb_might: while it's an
  attacker.)"* Cast after En Garde resolves, the Saboteur is a 6: its 6 kill the 4-Might Poro, and the
  Poro's 4 do not kill it. They take A. **One rune.**
- **`SFD-003 Blood Rush`** (Fury, E1): *"Give a unit [Assault 2] this turn."* The Saboteur is a 5, the
  same result. **One rune.** Its [Repeat] is not paid here, so the open [Repeat] reading (the #187
  bullet in `docs/rules-notes/rules-findings.md`) does not bear on this line.
- **`OGN-169 Gust`** (Chaos, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Return a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* Cast in
  response to En Garde, while the Poro is still a 2, it returns the Poro. En Garde then resolves with
  no target, 359.3.e.5: *"If any of the spell's targets are no longer legal, those game objects,
  players, or zones are unaffected by the spell as it resolves."* Only their unit is left at A, and
  they take it. **One rune, and En Garde is spent for nothing.**

`UNL-010 Vault Breaker` (Fury, E1 + 1 Fury Power) is Blood Rush with [Ganking] and needs the Power.
`OGN-009 Hextech Ray` (deal 3) and `UNL-014 Monster Harpoon` (deal 2), each E1 + 1 Fury Power, kill
the Poro only if cast before En Garde, when it is a 2. After it, their damage plus the Saboteur's 3
kill the Poro, but the Poro's 4 still kill the Saboteur, and A is left with nobody (466.5.b). The
other one-rune cards do not touch the line. `UNL-134 Existential Dread` stuns an attacking unit, and
the Poro defends. `VEN-015 Decree of Rage` deals 4 to a Calm unit, and the Poro is Order. `OGN-179
Acceptable Losses` and `SFD-135 Factory Recall` act on gear, `OGN-183 Stacked Deck` draws, and the
two Seals are gear they do not have on the board. `SFD-136 Hard Bargain` (E2) counters En Garde unless
you pay two, and your T2 leaves you one; `UNL-131 Abandon` (E2) counters it outright. Both cost two
runes.

**The Hammer's own answers, which the walk never needed.** `OGN-179 Acceptable Losses` (Chaos, E1):
*"Each player kills one of their gear."* The Hammer is your only gear, so it dies, and its recycled
rune with it. `SFD-135 Factory Recall` (Chaos, E1) returns it to your hand, so playing and attaching it
again costs another three runes, one of them recycled. Any one-body answer to the carrier's
companion switches the clause off: with the Poro dead, the Ramhound is alone at A, and the Hammer
gives +1.

## 6. Verdict

**Right about the sizes and the fork; neither card moved the score against a decent order of play.**
En Garde pays +2 to a unit alone (740.2.a) and the Hammer +2 to a carrier with exactly one other unit
of yours at its battlefield, so no board pays both, as the entry says. Walked going first against the
Draven deck, the three lists finished level. The En Garde list left its Poro alone at A on T2 to be
attacked. Their Dangerous Duo, played before the attack, made the Saboteur a 5 for no rune beyond the
turn they had planned, and En Garde could not beat it. En Garde then won A back on T3 with a lone
Ramhound: **2 to 2** after their T3, **3 to 3** after their T4. The Hand Hammer list made A 8 on T2,
and the Saboteur took the empty battlefield instead: **2 to 2**, one rune recycled for good. A plain
two-drop in the same slot made A 5 and got the same **2 to 2**. En Garde moves a point only when they
attack before pumping: **3 to 1** after their T3. Its cheapest answers are that Duo, played first, for
nothing; then Cleave, Blood Rush or Gust for one rune. The Hammer's is to go where it is not.

## 7. Not verified

I did not deal the channel order. The walk assumes six Calm and six Order runes for you, Radiant
Dawn's two domains, in the twelve of Tournament Rules 402.1. En Garde, the Clockwork Keeper with its
cost unpaid, and every body before T4 need no Power. The Vanguard Captain on T4 needs an Order among
the eight channelled: with six Calm it cannot fail, **0 of 495**. The Hand Hammer list attaches the
Hammer on T2 for a Calm Power, which needs a Calm among your first four runes: it fails in **15 of
495, 3.03%**, the deals with four Order first. Its Captain on T4 then needs an Order among the seven
left of eight, since the recycled Calm goes to the bottom of the rune deck: **0 of 495**.

Their walk assumes six Fury and six Chaos. The Cemetery Attendant on their T3 needs a Chaos among
their first seven: with six Fury it cannot fail, **0 of 792**. Cleave, Blood Rush, Gust and the Duo
take any rune. Vault Breaker, Hextech Ray and Monster Harpoon on their T2 need a Fury among five: each
fails in **6 of 792, 0.76%**, the deals with five Chaos first.

**How likely an answer is.** The free answer needs the Duo among their first **6** cards and a card to
play before it, which this deck always has on T2: **40.30%** with three Duos. Any of the Duo, Cleave,
Blood Rush and Gust, three copies each: **90.93%**. These count only the cards named, not how many of
them a deck runs; any pump played before the attack does the Duo's job.

Their hand holding no showdown card is the walk's assumption; §5 prices it. Not walked: going second,
the mulligan, 2v2, Leona, the Hammer list and the control past their T3, their T2 taking B against the
lone Poro (A stays yours, 1 to 1, and En Garde is still in hand for your T3), the Hammer killed by
Acceptable Losses, and the turns after their T4.

## Leads

- The notable *"740.2.a IS THE DEFINITION AND IT COUNTS YOUR OWN SIDE"*: correct, and En Garde's
  printed words are *"the only unit you control there"*, not *"alone"*. The two say the same thing.
  The clause has no *"at a battlefield"*, unlike the Hammer's, but a combat happens only at a
  battlefield, so the difference never shows in a fight.
- The notable *"bought after the attacker's summed Might is countable"*: the attacker acts first in
  the showdown (464.2.d), and [Action] plays there (806.1.b), so the count can change after En Garde
  resolves. `OGN-004 Cleave` and `SFD-003 Blood Rush`, one rune each, beat its +2 that way. And a pump
  played before the attack, like `OGN-016 Dangerous Duo`'s [Legion] +2, beats it for nothing. In the
  walk that is what the opponent did.
- Step 3, *"[Equip] for one Calm Power"*: the Hammer is E2 and then one Calm Power, which is a rune
  recycled for good (164.2.b, 164.2.b.1). If its carrier leaves the board, the Hammer detaches and
  stays (719.5); at a battlefield it is recalled to base (435.4.a), and attaching it again costs
  another Calm Power. The entry does not say so.
- The notable and step 4, *"it can switch on mid-combat as bodies die"*: it switches off just as
  easily. A one-body answer to the companion, cast in the showdown, leaves the carrier alone, and the
  Hammer gives only its +1. A body that dies to the combat's own damage dies after assignment, so it
  never switches the clause on for that combat.
- What the entry does not say is that the Hammer is seen. Attached before the attack (151.2), it made A
  8 on T2 in the walk, and the opponent went to the empty battlefield. It never fought, and the list
  scored what a plain two-drop scored.
- No answer is named. En Garde's are a pump played before the attack, which costs nothing, then
  `OGN-004 Cleave`, `SFD-003 Blood Rush` and `OGN-169 Gust` at one rune. The Hammer's are `OGN-179
  Acceptable Losses` (E1), which kills it, and `SFD-135 Factory Recall` (E1), which sends it back to
  hand.
