# Play — Factory Recall saves the Axe only inside a showdown, Brittle Steel trades a card for Rell's free sword, and Angle Shot ends the Axe for two runes

Issue #474 (a slice of #200), 2026-10-26. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `factory-recall-brittle-steel-gear-both-ways`**, the Fury/Chaos ENGINE built from two
spells: `VEN-003 Brittle Steel` (Fury, E2 + 1 Fury Power, [Flow] E4 + 1 Fury Power) kills a gear, six
times a game counting its replays from the trash; `SFD-135 Factory Recall` (Chaos, E1, [Action])
returns a gear to its owner's hand. The entry uses the bounce three ways: on their gear, to rescue
your own Equipment *"in response"* to a removal spell, and to move your Equipment to a new carrier,
free of any [Equip] on a [Quick-Draw] card such as `SFD-186 Spinning Axe`. Walked as a game, going
first, with a Fury/Chaos Draven deck in your seat against the Fury/Body Rell deck of
[the Rell play](2026-10-24-rell-takes-one-free-equipment-the-bow-fires-only-on-defence-and-decree-of-focus-kills-her-for-one-rune.md).
**The rescue cannot be cast in response.** Factory Recall is [Action], and a removal spell on the chain
makes the turn a Closed State, where only [Reaction] cards can be played. **The main line:** on their
T3 Rell attacks your Axe-carrying Noxus Saboteur with a free Long Sword. You Factory Recall the Axe
inside the showdown, before damage. The Saboteur dies either way, and the Axe goes to your hand instead
of being killed by its own [Temporary] at your next Beginning Phase. On T4 Brittle Steel kills the Long
Sword, a card Rell got for free, and the Axe goes back out on its play cost. **4 to 3** after their T4.
**The control** spends the Brittle Steel's T4 on a third body: also **4 to 3**, with a rune more on
your board and Rell at 7 instead of 5. **The cheapest answer to the engine is one rune:**
`SFD-005 Detonate` (Fury, E1 + 1 Fury Power) kills the Axe in their own Main Phase, where Factory
Recall has no window. It hands you two cards. `SFD-011 Angle Shot` (Fury, E2, [Reaction]) is the
answer that comes out ahead on cards. It detaches the Axe, the Axe's own [Temporary] kills it at your
next Beginning Phase, and they draw 1.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-26 at `8c5f208`, reads
773 entries, 266 with forced-ordering language, **94 in the queue and 1 of them with no play**, as the
issue measured. This entry is rank 94, a hit on *in response*. It is the last unplayed entry in the
queue. With this play the queue is exhausted: every one of the 94 has a play.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos, tag Draven) |
| **Chosen Champion** | `OGN-028 Draven, Showboat` (Fury, E5 + 1 Fury Power, M3), never played |
| **The engine** | `VEN-003 Brittle Steel` (Fury spell, E2 + 1 Fury Power), `SFD-135 Factory Recall` (Chaos spell, E1) |
| **The Equipment** | `SFD-186 Spinning Axe` (Fury/Chaos gear, E2 + 1 Power, M+3) |
| **The bodies** | `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-171 Mystic Poro` (Chaos, E2, M2), `OGN-016 Dangerous Duo` (Fury, E3, M3), `OGN-010 Legion Rearguard` (Fury, E2, M2) |
| **The spare spell** | `OGN-009 Hextech Ray` (Fury, E1 + 1 Fury Power), held |

The entry names five legends for its pair. Glorious Executioner is the one for this walk because its
text is small and fires once: *"When you win a combat, draw 1. (You win if only your units remain after
combat.)"* Its tag is Draven, so the Chosen Champion is a Draven, 103.2.a.2: *"Must be a champion unit
with a champion tag that matches the tag on your Champion Legend."* The tag is also what admits the
Spinning Axe, a Signature card (`signature` in `data/cards.json`) tagged Draven and Equipment, 103.2.d.2:
*"All of the Signature cards must have the Champion tag that corresponds to the Champion Legend of the
deck."* The deck runs three Axes, which is its whole Signature allowance, 103.2.d.1: *"Regardless of
name, a deck may only contain a sum total of 3 Signature cards."* No other card in this play, on
either side, is a Signature card.

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by your
Domain Identity."* Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3
copies of the same named card."* The deck runs three Brittle Steel and three Factory Recall; the entry
asks for one of each. None of the cards in this play is in `data/legality.src.json` or marked [BANNED]
in `data/corpus_flat.txt`.

The card text the play turns on:

- Brittle Steel: *"Kill a gear. [Flow] :rb_energy_4::rb_rune_fury: (You may play this from your trash
  for its Flow cost. Then banish it.)"*
- Factory Recall: *"[Action] (Play on your turn or in showdowns.) Return a gear to its owner's hand."*
- Spinning Axe: *"[Quick-Draw] (This has [Reaction]. When you play it, attach it to a unit you
  control.) [Equip] :rb_rune_rainbow: (:rb_rune_rainbow:: Attach this to a unit you control.)
  [Temporary] (If this is unattached, kill it at the start of its controller's Beginning Phase, before
  scoring.)"*
- Pouty Poro: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.)"*
- Mystic Poro: *"[Vision] (When you play me, look at the top card of your Main Deck. You may recycle
  it.)"* You keep the card on top each time.
- Noxus Saboteur's hidden-card clause, Dangerous Duo's [Legion] and Legion Rearguard's [Accelerate] are
  idle in the walk.

## 2. When Factory Recall can be cast, and what it saves

**[Action] is a showdown permission, not a response.** 806.1.c.1: *"On Cards: \"This can be played
during showdowns on any player's turn.\""* The response permission belongs to a different keyword,
813.1.c.1: *"On Cards: \"This can be played during Closed States on any player's turn.\""* A spell on
the chain is a Closed State, 309.1: *"If a Chain exists, the turn is in a Closed State."*, and 309.1.a:
*"Only cards and abilities with the Reaction keyword can be played or activated in a Closed State."*
So once their removal spell is on the chain, Factory Recall cannot be cast until it has resolved, and
by then the gear is gone. The glossary says the same of the two keywords, 159.2.a.1: *"This indicates
that, in addition to being able to be played during an Open State, this spell may also be played
during Open States during Showdowns."* and 159.2.b.2: *"In addition to all prior cases, may also be
played during all forms of Closed State."*

**Before the removal is cast, there is a window only inside a showdown.** A plain spell, Brittle Steel
or Detonate, is cast in its controller's own Main Phase outside any showdown, 155: *"A spell can be
played during an Open State outside of Showdowns on its controller's turn."* On their turn outside a
showdown you have no window for an [Action] card (806.1.c.1). Inside a showdown you do. Focus starts with
the player who contested the battlefield, 345: *"As a Showdown begins, the player who applied Contested
status to the Battlefield gains Focus."* A pass hands it on, 347.2.b: *"Otherwise, Focus passes to the
next Player in Turn Order."* With Focus you may play, 347.1: *"Play a Card or Activated Ability that is
legally timed."* So Factory Recall works as a rescue on their turn only in a combat, cast before
anything is aimed at the gear.

**What it saves the Spinning Axe from is its own [Temporary].** When a carrier leaves the board, its
Equipment stays, 719.5: *"When a Top-Most Card changes zones from a board zone to a non-board zone, all
Attached cards Detach from it, remaining in their current zones."* 435.4.b puts it at *"the last
location the Top-Most Card was at before changing from a board zone to a non-board zone"*, and the
cleanup sends it home, 323.7: *"Recall all Unattached non-Unit Gear and non-Unit Runes at Battlefields,
and all Permanents and Runes in Bases other than their controller’s."* The Axe is then unattached, and
the keyword kills it, 816.1.b: *"It is functionally short for \"At the start of this permanent's
controller's Beginning Phase, before scoring, kill this.\""* Its [Equip] could re-attach it, but a
gear's ability waits for the Main Phase, 151.2: *"The Activated Ability of Gear may be executed at any
time during the controlling player's Main Phase during an Open State, and not during a Showdown."* The
Beginning Phase comes first. The [Temporary] trigger on the chain is a Closed State (309.1), so
Factory Recall cannot reach it there either. **An Axe whose carrier dies on their turn is dead unless
it leaves the board in that same showdown.**

**Moving your own Equipment.** Attached, the Axe's own text is Inactive, 718.2: *"While in this state,
the card’s printed Rules Text is Inactive."* Back in hand, nothing is attached. Replayed, [Quick-Draw]
attaches it on the play, 819.1.d: *"Quick-Draw is functionally short for “[Reaction]” and “When you play
this, attach it to a Unit you control.”"* So the move costs Factory Recall's E1 plus the Axe's play
cost, E2 and one Power, and no [Equip]. The Power may be Fury or Chaos, 135.2.e.6.c: *"A [C] shorthand
on a card with multiple Domains is processed as any power of that card’s Domains."* A gear goes to base
when played, 149.2: *"Gear can only be played to a player's Base unless an effect specifies
otherwise."*, and the attach brings it to the unit, 434.4: *"When a card Attaches to a card, its
location becomes the same as the new Top-Most Card."*

**Brittle Steel and its replay.** It is a plain spell (155). Its replay is an alternate cost from the
trash at the same timing, 829.1.b: *"It is functionally short for “You may play this from your trash for
its flow cost. Then banish it.”"* and 829.1.b.2: *"Playing a spell for its Flow cost does not change the
timing at which it can be played, nor any permissions for the spell aside from the zone from which it
can be played."* The replay costs E4 and one Fury Power, two Energy more than the first cast. This walk
casts it once.

**Combat.** Damage is read when the showdown closes, 465.2: *"When the Showdown closes, Attackers and
Defenders resolve Combat Damage at the Battlefield that was attacked, using their current Might."* It
closes on two passes in a row, 347.2.a: *"If all Players have passed once in sequence, the Showdown
ends."* A unit dies at its Might, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or
equal to that Unit’s Might."* [Tank] takes damage first, 815.1.b: *"I must be assigned lethal damage before
any other unit with the same controller as me that does not have [Tank] during the Combat Damage
step."* Survivors heal in the combat cleanup, 466.1.a.1: *"Insert “3c. Heal all Units.”"* An Equipment's
Might Bonus counts on defence as on attack, 434.1.d: *"The Top-Most Card has its Might modulated by the
Might Bonus of all cards Attached to it."* A unit enters exhausted, 359.2.c: *"If it is a Unit, it enters
the Board exhausted at the Location that was chosen."* Units move from base to a battlefield and back,
never between battlefields, 144.4.a: *"Units may move from their Base to a Battlefield."* 144.4.b:
*"Units may move from a Battlefield to their Base."*

**Runes.** A rune adds Energy by exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power by
leaving, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*, and 164.2.b.1: *"The Power added this way
corresponds to the Domain of the Rune that is being Recycled."* An exhausted rune still pays the recycle,
so a spell of E1 and one Power is one rune, exhausted and then recycled. A recycled rune goes to the
bottom of the Rune Deck, 416.1.b: *"Runes are Recycled to the Rune Deck."*, and comes back only when it
is channelled from there again, 430.1: *"Channeling is the action of taking one or more Runes from the
top of a player's Rune Deck and putting them on the board."* Your board readies only on your turn,
415.3.a: *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on their
turn."* So a rune you leave ready at the end of your turn is the only one you have on theirs.

## 3. Their deck: Fury/Body Rell

The deck of the Rell play linked above, in the other seat. `OGN-249 Relentless Storm` (Fury/Body):
*"When you play a [Mighty] unit, you may exhaust me to channel 1 rune exhausted. (A unit is Mighty while
it has 5+ :rb_might:.)"* Nothing they play has 5 Might as it is played, so it is idle. Its Chosen
Champion is `OGN-041 Volibear, Furious`, never played. The cards they use:

- `SFD-024 Rell, Magnetic` (Fury, E4, M4): *"[Tank] (I must be assigned combat damage first.) When I
  attack, you may play an Equipment with Energy cost no more than :rb_energy_2:, ignoring its cost. If
  you do, then do this: Attach it to me."*
- `SFD-022 Long Sword` (Fury gear, E2 + 1 Fury Power, M+2): *"[Quick-Draw] (This has [Reaction]. When
  you play it, attach it to a unit you control.) [Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to
  a unit you control.)"*
- `SFD-016 Recurve Bow` (Fury gear, E2, M+0): *"[Equip] :rb_rune_fury: (:rb_rune_fury:: Attach this to a
  unit you control.) [Effect] When I attack or defend, deal 2 to an enemy unit here."*
- `OGN-136 Pit Rookie` (Body, E2, M2): *"When you play me, buff another friendly unit. (If it doesn't
  have a buff, it gets a +1 :rb_might: buff.)"*
- `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-130 Crackshot
  Corsair` (Body, E3, M3) and `SFD-096 Laurent Bladekeeper` (Body, E3, M3), whose texts do not come up.

The Rell play walked what *"ignoring its cost"* waives and in what order the Long Sword attaches; this
play reuses it. The Long Sword is on Rell, at +2, before the showdown opens.

Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player going second
channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Chaos against Fury/Body. Your battlefield is A, `SFD-210 Hall of Legends` (*"When you conquer
here, you may pay :rb_energy_1: to ready your legend."*, and your legend has nothing to ready for);
theirs is B, `OGN-278 Bandle Tree` (*"You may hide an additional card here."*, and nobody hides). Your
opening four are Pouty Poro, Noxus Saboteur, Spinning Axe and Brittle Steel. Your draws are Mystic Poro
(T1), Factory Recall (T2), Dangerous Duo (T3), Legion Rearguard (the legend's draw on T3) and Hextech
Ray (T4). Their opening four are Legion Rearguard, Rell, Long Sword and Recurve Bow. Their draws are
Pouty Poro (T1), Pit Rookie (T2), Crackshot Corsair (T3) and Laurent Bladekeeper (T4).

```
turn      runes   your turn                                                 points
T1        2       Pouty Poro (E2) to base. None left.                       0
their T1  3       Legion Rearguard (E2) to base. One left.                  0
T2        4       The Poro walks to A, empty, Conquer: +1. Noxus Saboteur   1
                  (E3) to base. One left.
their T2  5       The Rearguard walks to B, empty, Conquer. Rell (E4) to    1
                  base. One left.
T3        6       Hold A: +1. Spinning Axe (E2 + 1 Power) on the           3
                  Saboteur: M6. Mystic Poro (E2) to A. The Saboteur
                  walks to B and kills the Rearguard; you win, draw 1.
                  Conquer B: +1. Two left.
their T3  7       Pit Rookie (E2) to base, buffing Rell to 5. Rell walks    2
                  to B and attacks: Long Sword free, Rell 7. In the
                  showdown you Factory Recall (E1) the Axe to hand. Rell
                  kills the Saboteur. Conquer B. Pouty Poro (E2) and
                  Crackshot Corsair (E3) to base. None left.
T4        7       Hold A: +1. Brittle Steel (E2 + 1 Fury) kills the Long   4
                  Sword: Rell 5. Spinning Axe (E2 + 1 Power) on the
                  Pouty Poro at A: M5. Legion Rearguard (E2) to A. One
                  left.
their T4  9       Hold B. Recurve Bow (E2) and its [Equip] (1 Fury) on     3
                  Rell. Laurent Bladekeeper (E3) to B. Three left.
                  Nobody attacks A.
```

After your T2 it is **1 to 0**; after their T2, **1 to 1**; after your T3, **3 to 1**; after their T3,
**3 to 2**; after your T4, **4 to 2**; after their T4, **4 to 3**.

Runes on your board at the end of each turn: 2, 4, 5 after your T3 (one recycled for the Axe), 5 after
their T3, 5 after your T4 (two recycled). On theirs: 3, 5, 7, 8 after their T4 (one recycled for the
[Equip]).

Your hand, card by card: 5 after the T1 draw, 4 after the Poro (Saboteur, Axe, Steel, Mystic Poro); 5
after the T2 draw, 4 after the Saboteur (Axe, Steel, Mystic Poro, Recall); 5 after the T3 draw, 3 after
the Axe and Mystic Poro (Steel, Recall, Duo), 4 after the legend's draw (and the Rearguard); 4 after their
T3, the Recall gone and the Axe back (Steel, Duo, Rearguard, Axe); 5 after the T4 draw, 2 after the
Steel, the Axe and the Rearguard (Duo, Ray). Theirs: 5 after the T1 draw, 4 after the Rearguard; 5 after
the T2 draw, 4 after Rell (Sword, Bow, Pouty Poro, Rookie); 5 after the T3 draw, 1 after the Rookie, the
free Sword, the Poro and the Corsair (Bow); 2 after the T4 draw, 0 after the Bow and the Bladekeeper.

**Your T2 and their T2: one battlefield each.** An empty battlefield is a non-combat showdown,
316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are a stand-alone
Phase and do not create a Combat."* It is a Conquer, 348.2.a.1: *"This results in a Conquer if that
player has not yet scored that Battlefield this turn."* You Hold A from T3 on, 469.2: *"Hold: A player
maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*

**Your T3: the Axe goes out on its play cost.** Six runes: the Axe exhausts two and recycles one of
those for its Power, Mystic Poro exhausts two. The Saboteur at 6 walks to B, where their Rearguard
defends at 2. Rell is in base and cannot defend B. The Saboteur kills the Rearguard and takes 2. Only
your unit remains: you win the combat and your legend draws 1. B is yours, 466.5.d: *"Establishing
Control results in a Conquer if that player has not yet scored this Battlefield this turn."* The
Saboteur heals in the combat cleanup (466.1.a.1). You end the turn with two runes ready.

**Their T3: the Recall in the showdown.** Pit Rookie buffs Rell to 5 in base. Rell walks to B and
attacks the Saboteur. Her trigger plays the Long Sword for free and attaches it: Rell 7, [Tank]. When
the combat chain has resolved, the showdown is open and they have Focus (345). They pass. You have Focus
and two ready runes, and you cast Factory Recall on your own Axe with one of them: it goes to your hand
and the Saboteur is a 3. The second rune does nothing: the rest of your hand is Brittle Steel, Dangerous
Duo and Legion Rearguard, none of them [Action] or [Reaction]. When that chain closes Focus passes to
them, 347.1.b: *"When that Chain closes, Focus passes to the next Player in Turn Order."* They pass, you
pass, and the showdown closes. Their 7 kills the Saboteur;
your 3 does not kill Rell, who heals. Only their unit remains, so they win the combat and conquer B.

**What the Recall bought.** The Saboteur died either way. With the Axe on it, the Saboteur is a 6, and
6 does not kill Rell at 7. Left on, the Axe would detach at B, go home at the cleanup and die to its own
[Temporary] at the start of your T4 (§2). Recalled, it is in your hand. One rune saved a card that had
cost you three.

**The other target: their Long Sword.** Factory Recall returns *"a gear"*, theirs too. Recall the Long
Sword and Rell is a 5. Then your Saboteur at 6 kills her and survives her 5. But the Long Sword has
[Reaction] through [Quick-Draw], and Focus is theirs as soon as your chain closes (347.1.b). They have
five runes up. They replay it on Rell for E2 and one Fury Power, two runes with one recycled, and she is
a 7 again. You have no second answer. The Saboteur dies, the Axe dies to [Temporary] at your T4, and
they are down one rune from their board. On Quick-Draw Equipment the bounce is tempo that they can undo
in the same showdown, which is why the main line saves its own Axe.

**Your T4: the Steel, then the Axe again.** Seven runes. Brittle Steel kills the Long Sword in your Main
Phase (155): two exhausted, one of them recycled for the Fury. Rell is a 5. The Axe goes on the Pouty Poro
at A for E2 and one Power: two exhausted, one recycled. The Poro is a 5. The Rearguard follows to A for E2.
One rune stays up for Hextech Ray, an [Action] spell, in case they attack A. A defends at 5 + 2 + 2 = **9**.
You have no ready unit in base, so nobody of yours attacks Rell.

**Their T4: the Bow, and no attack.** They Hold B. The Bow goes to base for E2, and its [Equip] puts it on
Rell for one Fury Power. Rell is still a 5, since the Bow adds no Might. Laurent Bladekeeper goes to B.
Their ready bodies in base are the Rookie, the Pouty Poro and the Corsair: 2 + 2 + 3 = 7 against A's 9,
so they do not attack. **4 to 3.**

**The control: no Brittle Steel on T4.** The same T4, with Dangerous Duo (E3) to A in place of the
Steel. [Legion] is on, and its +2 lasts only this turn. That is the Axe (two runes exhausted, one
recycled), the Duo (three) and the Rearguard (two): seven exhausted, one recycled, none up. A defends at
**12**. Their T4 is the same, and Rell carries the Long Sword and the Bow at 7. **4 to 3**, with six runes
on your board to the main line's five.

**What the Steel bought.** Rell at 5 instead of 7, at the cost of a card, a rune off your board and the
Duo's 3 Might at A. The Long Sword cost them no rune: Rell played it for free. Her next attack plays
another Equipment of Energy cost 2 or less for free, the same way. The Steel's six kills are six cards
of yours. Against Rell, most of what they kill is free.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with
a unique name."* Going first, you have seen 7 cards by T3 before the legend's draw. At three copies each,
an Axe among them is **45.73%**, a Factory Recall **45.73%**, and both **19.23%**. At the entry's one
copy, a given card is **17.95%**.

## 5. Breaks to

**What the engine did, and the predicate.** Factory Recall kept the Axe alive through its carrier's
death. Brittle Steel took Rell's Long Sword. The predicate is: cast by them, does it take the Axe off
your board for good while you hold Factory Recall and a rune up?

**The scope.** A Fury/Body deck plays Fury, Body and Fury/Body cards (103.1.b). The regex
`\bgears?\b|\bequipment\b|\bdetach` (case-insensitive, on the text of every Fury, Body and Fury/Body
line of `data/corpus_flat.txt` that is not a gear, legend, battlefield, rune or token) matches **23**.
One is banned (`SFD-020 Draven, Vanquisher`). I read the other 22. Six take an enemy gear off the board
or off its carrier:

| card | cost | what it does to the Axe | does Factory Recall stop it? |
|---|---|---|---|
| `SFD-005 Detonate` (Fury spell) | E1 + 1 Fury | kills it; you draw 2 | no: their Main Phase, no window |
| `SFD-011 Angle Shot` (Fury spell) | E2, +1 any on the Pouty Poro | detaches it; [Temporary] kills it; they draw 1 | no: [Reaction], and no window after |
| `VEN-003 Brittle Steel` (Fury spell) | E2 + 1 Fury | kills it | no: their Main Phase, no window |
| `VEN-080 Noxian Demolitionist` (Body unit) | E2 | nothing: its kill reaches Energy cost 1, the Axe is 2 | n/a |
| `SFD-109 Akshan, Mischievous` (Body unit) | E4 + 2 Body | takes it, and attaches it to Akshan | no: a unit's trigger in their Main Phase |
| `OGN-022 Thermo Beam` (Fury spell) | E5 + 2 Fury | kills it and every other gear | no: on the chain it is a Closed State |

**The cheapest answer: Detonate, one rune.** *"Kill a gear. Its controller draws 2."* Cast in their own
Main Phase outside a showdown (155), it meets no window for Factory Recall: none before it (806.1.c.1)
and a Closed State once it is cast (309.1.a). One rune, exhausted and recycled. It hands you two cards.

**The answer that comes out ahead: Angle Shot, two runes.** *"[Reaction] (Play any time, even before
spells and abilities resolve.) Choose a unit and an Equipment with the same controller. Attach that
Equipment to that unit or detach that Equipment from that unit. Draw 1."* Your unit and your Axe have
the same controller. Detached, the Axe stays where the Poro is, goes home at the cleanup (435.4.a:
*"If the Detached card was a Gear and this causes it to become present at a Battlefield, it will be
Recalled during the next Cleanup."*), and dies to its own [Temporary] at your next Beginning Phase (§2).
On the Pouty Poro it pays the [Deflect] as well, since it chooses the Poro: E2 and one Power of any
domain, two runes with one recycled. They draw a card, you draw none. Cast in their Main Phase, it
leaves you no window either.

**The free answer is to let Brittle Steel kill free cards.** Rell plays her Equipment for nothing. Each
Brittle Steel spends a card of yours and a rune off your board on a card that cost them no rune. Their
deck does not need to answer that half of the engine.

## 6. Verdict

**Right that the bounce moves your Equipment and that [Quick-Draw] skips the [Equip]. Wrong that
Factory Recall rescues your Equipment in response to a removal spell.** It is [Action]. On their turn
it can be cast only inside a showdown, never once a spell is on the chain. In the walk it saved the Axe
from its carrier's death in Rell's attack, for one rune, cast before damage. Without it the Axe would
have died to its own [Temporary]. Brittle Steel did what it says and killed the Long Sword. Rell had
played the Sword for nothing, and the Steel cost a card and a rune off your board. **4 to 3** after their
T4, the same as the control, which spent that T4 on a third body. The cheapest answer to the rescue is
Detonate, one rune, cast in their own Main Phase. The one that comes out ahead is Angle Shot, two runes.

## 7. Not verified

**Runes.** I did not deal the channel order. The walk assumes six Fury and six Chaos runes for you,
Glorious Executioner's two domains, in the twelve of Tournament Rules 402.1. Your Power: one for the Axe
on T3, Fury or Chaos, from the first six runes, which never fails, **0 of 924**; on T4, one Fury for
the Steel and one Fury or Chaos for the Axe, from the first eight (one of them already recycled and back
at the bottom). The Steel fails only when no Fury rune is among the seven on your board at T4, which
six Chaos cannot be: **0 of 792**. Hextech Ray, held, would need a Fury rune up on their T4: not
counted.

Their walk assumes six Fury and six Body. Their only Power is the Bow's [Equip], one Fury, from the
first nine runes. It fails only when no Fury is among the nine, which six Body cannot be: **0 of 220**.

**Quick-Draw and the [Equip].** 819.1.c says *"Quick-Draw allows cards to be played and Attached using
Reaction timing."* I read *"Attached"* as the attach that 819.1.d makes on the play, not as [Reaction]
timing for the [Equip] ability, which by default waits for the Main Phase (151.2) and is not allowed in a
Closed State, 331.1.b: *"Card abilities, by default, cannot be played during a Closed State."* If
819.1.c instead gives the [Equip] [Reaction] timing, an unattached Axe could re-attach itself in the
[Temporary] trigger's Closed State for one Power. Then the Recall on their T3 would save one Power
instead of a card, and Angle Shot would not end the Axe. No ruling covers it.

**How likely the answer is.** The walk's Rell deck runs no Detonate and no Angle Shot. Either is a
Fury card that deck could run. The odds that they hold one depend on how many copies their list runs,
which is not counted here.

`data/cards.json` carries no champion supertype. I read Draven, Showboat as a champion unit by his
title name and his Draven tag. Their choice not to attack A on their T4 is the walk's choice of
opponent. Not walked: going second; the Steel's [Flow] replay; Rell's next attack, which plays the
Bow-free line or a second Long Sword; the mulligan; 2v2; a rune split other than six and six; and the
turns after their T4.

## Leads

- Step 2 (*"Against a removal spell aimed at YOUR Equipment: play Factory Recall (1 Energy, [Action]) in
  response and return your own gear to hand."*) and the notable *"At [Action] speed (806.1.b) it answers
  a `VEN-003 Brittle Steel` or an `OGN-179 Acceptable Losses` aimed at your own Equipment by removing
  the object before the kill resolves"* do not hold. A spell on the chain is a Closed State (309.1),
  only [Reaction] reaches it (309.1.a), and Factory Recall is [Action] (806.1.c.1). Brittle Steel is
  also cast outside showdowns (155), where [Action] has no window on their turn. What the walk found is
  a rescue from the carrier's death, cast inside the showdown before damage.
- The rescue matters most on a [Temporary] Equipment. An unattached Spinning Axe dies at the start of
  your Beginning Phase, before the Main Phase where its [Equip] could re-attach it (816.1.b, 151.2).
  The entry's second notable names the Axe for its free move and not for this.
- The entry says the bounce is *"the other door"* to a new carrier. In the same identity,
  `SFD-011 Angle Shot` (Fury, E2, [Reaction], draw 1) attaches an Equipment to a new unit in one card
  and in a Closed State, cheaper than Factory Recall plus the Axe's E2 and one Power. `SFD-008 Sentinel
  Adept` ([Weaponmaster]) moves one *"even if it's already attached"*.
- The same Angle Shot is the enemy-facing answer the entry does not name. It detaches your Equipment at
  [Reaction] speed. On a [Temporary] Equipment that ends it.
- Factory Recall on their [Quick-Draw] Equipment is tempo they can undo at [Reaction] speed in the same
  showdown (347.1.b gives them Focus when your chain closes). The notable *"USED ON THEIR GEAR IT IS
  TEMPO"* is right, and the walk adds that it is undone on their next Focus while they have the runes.
- `terminatesIn`, *"six gear kills a game"*: against a deck that plays Equipment for nothing (Rell),
  each kill is a card and a rune of yours for a card of theirs that cost no rune. The [Flow] replay is
  E4 and one Fury, twice the first cast's Energy.
