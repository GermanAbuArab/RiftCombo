# Play — Onslaught and the Duel beat an ambushed Vilemaw only together, and the second spell is what Crumbling Sands counters

Issue #401 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `gentlemens-duel-onslaught-challenge-ceiling`**, the Body ENGINE in which `VEN-081 Onslaught`
(E4, +6 Might this turn, [Flow] E4) is played in your Main Phase on the body that will fight, and
`OGS-008 Gentlemen's Duel` (E6 + 1 Body Power, [Action]) adds its own +3 and makes that body and an
enemy unit deal damage equal to their Mights to each other. The entry is right about the mechanism:
the exchange is dealt by the units (417.6.b.3) and is never combat damage (417.6.c), so no [Tank]
orders it, and the arithmetic has no cap. It is right that Onslaught has no timing keyword and must be
committed in the Main Phase, before the fight. It is wrong about the domain: `OGN-154 Primal
Strength` is a bigger pump (+7) at [Action] speed, and `VEN-083 Rampage` also pumps and fights with one
card. Walked as a game, going first, with Keeper of the Hammer against a Calm/Order Eye of Twilight
deck that held nine runes on its T4 and ambushed `UNL-060 Vilemaw` (M8) into the T5 attack, the
engine is the only line that takes their battlefield: Onslaught makes Poppy an 11 that Vilemaw cannot
silence, the Duel makes her a 14 that kills Vilemaw and survives, and the attack conquers: **5 to 3**
after their T5. The Duel alone trades Poppy for Vilemaw and the attack fails; Onslaught alone leaves
Vilemaw standing; both end **4 to 4**. The cheapest answer to the engine costs one rune, and it fits
beside Vilemaw in their nine: `OGN-045 Defy` counters Onslaught in the Main Phase, and `VEN-039
Crumbling Sands` counters the Duel in the combat, because Onslaught was "another spell this turn".

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `88f0ffe`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 17 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 85, the second in the list. The
other entry of this slice is rank 84, `nidalee-towering-combatant-ambush-draw`, played in
[Nidalee draws only behind an attack of eight or less, and the card is the smallest thing the ambush wins](2026-10-18-nidalee-draws-only-behind-an-attack-of-eight-or-less-and-the-card-is-the-smallest-thing-the-ambush-wins.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-203 Keeper of the Hammer` (Body/Order, tag Poppy) |
| **Chosen Champion** | `UNL-116 Poppy, Paragon` (Body, E5, M5, [Deflect]) |
| **The pump** | `VEN-081 Onslaught` (Body, E4) |
| **The fight** | `OGS-008 Gentlemen's Duel` (Body, E6 + 1 Body Power) |
| **The rest of the attack** | `SFD-099 Veteran Poro` (Body, E2, M2), `SFD-096 Laurent Bladekeeper` (Body, E3, M3), `OGN-135 Pakaa Cub` (Body, E3, M3), `SFD-098 Sea Monkey` (Body, E2, M2) |

The entry admits any of the seventeen legends with Body in their pair. Keeper of the Hammer is the one
for this walk because its tag is Poppy, so the Chosen Champion can be a printed 5 with [Deflect],
103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your Champion Legend."*
Poppy, Paragon is tagged Yordle, Demacia and Poppy, and is not a Signature card (`signature` in
`data/cards.json`). She starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion
Zone at the start of the game."* The legend's text (*"When you hold, gain 1 XP. Spend 3 XP,
:rb_exhaust:: Draw 1."*) gives three XP by the end of T5, which the walk does not spend.

Every card here is mono-Body, so it is in the legend's domains, 103.1.b.1: *"Cards included in your
deck must abide by your Domain Identity."* A mono-Body card is permitted by 103.1.b.3: *"If a card has
a single Domain, then that card is permitted in the Domain Identity that corresponds to the same
Domain."* None is a Signature card, and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Gentlemen's Duel: *"[Action] (Play on your turn or in showdowns.) Give a friendly unit +3 :rb_might:
  this turn. Then choose an enemy unit. They deal damage equal to their Mights to each other."*
- Onslaught: *"Give a unit +6 :rb_might: this turn. [Flow] :rb_energy_4: (You may play this from your
  trash for its Flow cost. Then banish it.)"*
- Poppy, Paragon: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) When you play me, if an opponent's score is within 3 points of the Victory Score, ready me
  and gain 3 XP."* The condition is false all walk: the Victory Score is 8 (194.3: *"The Victory Score is
  8 points by default."*), and their score is 1 when she is played.
- Laurent Bladekeeper: *"Ganking (I can move from battlefield to battlefield.)"*
- Sea Monkey: *"You may pay :rb_energy_1: as an additional cost to play me. When you play me, if you
  paid the additional cost, buff me. (Give me a +1 :rb_might: buff if I don't already have one.)"*

## 2. What the exchange is, when each half can be played, and what it has to beat

**The exchange is unit damage, not combat damage.** 417.6.b.3: *"When a spell or ability specifies a
Unit as the source of the Damage for the Deal action, it is not in addition to the spell or ability
that instructed it. Example: Challenge is a spell that reads “Choose a friendly unit and an enemy unit.
They deal damage equal to their Mights to each other.” The damage that Challenge causes to be dealt is
dealt by the chosen units, not by Challenge."* Challenge is `OGN-128`, the Duel's printed twin without
the pump. Combat damage is a
different thing, 417.6.c: *"Damage Dealt as a result of being assigned during Combat has the Units as
its source."* So [Tank] orders nothing in the exchange, since 815.1.b scopes it to that step: *"It is
functionally short for "I must be assigned lethal damage before any other unit with the same controller
as me that does not have [Tank] during the Combat Damage step.""* Neither does any clause about combat
damage. A unit dies when the marked damage reaches
its Might, 143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might,
it is Killed."*

**Both choices are made as the Duel is played.** 355.5: *"If a card requires you to specifically
choose one or more Game Objects, that choice is made now."* The friendly unit is yours, so its own
[Deflect] costs you nothing, 809.1.c: *"It is functionally short for "Spells and abilities an opponent
controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an
additional cost for each time they choose [me/this].""* The only tax a Duel can pay is the enemy
target's.

**Onslaught is Main Phase only; the Duel waits.** Onslaught has no [Action] and no [Reaction], so it
falls under 155: *"A spell can be played during an Open State outside of Showdowns on its controller's
turn."* That is your Main Phase, 316.5.b: *"This is denoted as a Neutral Open State, and only the Turn
Player has the ability to play spells or activate abilities."* The Duel is [Action], 806.1.c.1: *"On
Cards: "This can be played during showdowns on any player's turn.""* So the pump is committed before
the attack is declared, and the Duel can be held until the combat shows what it has to fight.

**What it has to fight is Vilemaw.** `UNL-060 Vilemaw` (Calm, E8 + 2 Calm Power, M8): *"[Ambush] (You
may play me as a [Reaction] to a battlefield where you have units.) Enemy units here with less Might
than me don't deal combat damage. When I hold, draw 1."* [Ambush] brings it in after the attack,
822.1.b: *"It is functionally short for "I may be played to a battlefield where you control Units" and
“I have [Reaction] as long as I’m being played to a battlefield where you control Units.”"* It defends
as soon as it lands, 464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at
this Battlefield after this moment, it will gain the Attacker or Defender designation during the
Cleanup phase following the action that caused it to become present, as appropriate for its
controller."* The walk reads *"don't deal combat damage"* the way the rules write it for a stunned
unit, 423.1.b: *"A Stunned Unit does not contribute its might to damage in the combat damage step."*

**The arithmetic against an 8.** Poppy prints 5.

| Poppy's Might | How | Against Vilemaw (8) |
|---|---|---|
| 5 | no pump | silenced in combat; no exchange |
| 8 | the Duel alone | the exchange is 8 against 8, and both die |
| 11 | Onslaught alone | not less than 8, so she deals combat damage; nothing kills Vilemaw first |
| 14 | Onslaught, then the Duel | Vilemaw takes 14 and dies; Poppy takes 8 and lives |
| 15 | Primal Strength, then the Duel | Vilemaw dies; Poppy takes 8 and lives |

**Ten runes, one recycled.** Onslaught and the Duel are E10 + 1 Body Power. A rune adds Energy by
exhausting, 164.2.a: *"[E]: [Reaction] — Add [1]."*, and Power only by leaving, 164.2.b: *"Recycle
this: [Reaction] — Add [C]."* An exhausted rune can still be recycled, so the pair is ten runes, one
Body among them recycled. Going first you have 2, 4, 6, 8 and 10 runes by T1 to T5, so the pair is a T5
turn and the whole of it. Going second it is a T5 turn too: 3, 5, 7 and 9 by T4, and 11 on T5, one
to spare.

## 3. Their deck: Calm/Order Eye of Twilight

`VEN-147 Eye of Twilight` (Calm/Order, tag Shen): *"[Action][>] :rb_exhaust:: Give a friendly unit
[Tank] this turn. (It must be assigned combat damage first.)"* Its Chosen Champion is `OGN-241 Shen,
Kinkou` (Order, E3 + 1 Order Power, M3): *"[Reaction] (Play any time, even before spells and abilities
resolve, including to a battlefield you control.) [Shield 2] (+2 :rb_might: while I'm a defender.)
[Tank] (I must be assigned combat damage first.)"* He stays in the Champion Zone all walk, and from
there he is always a three-rune defender, 419.1.a: *"By default, a player can only Play cards from their
hand or their Chosen Champion zone."* Their bodies are `OGN-052 Stalwart Poro` (Calm, E2, M2;
*"[Shield] (+1 :rb_might: while I'm a defender.)"*), `OGN-054 Sunlit Guardian` (Calm, E3, M3;
*"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be assigned combat damage first.)"*),
`UNL-033 Frisky Hunter` (Calm, E4, M3; *"When you play me, play a 1 :rb_might: Bird unit token with
[Deflect] here. (Opponents must pay :rb_rune_rainbow: to choose it with a spell or ability.)"*) and
Vilemaw. Going second, they channel an extra rune on T1, 485.7: *"The player going second channels an
extra Rune from their Rune Deck during their first Channel Phase of the game."* §5 names their answers.

## 4. The turns, going first

Body/Order against Calm/Order. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*, and nobody hides); theirs is B, `SFD-221 Veiled Temple` (*"When you conquer
here, you may ready a friendly gear. If it's an Equipment, you may detach it."*, and you have no gear).
Your opening four are Veteran Poro, Laurent Bladekeeper, Onslaught and Gentlemen's Duel. Your draws are
Pakaa Cub (T1), Sea Monkey (T2), `UNL-118 Elder Dragon` (T3), `OGN-158 Volibear, Imposing` (T4) and a
second Elder Dragon (T5), the top of the curve, E12 each. Their opening four are Stalwart Poro, Sunlit
Guardian, Frisky Hunter and Vilemaw. Their draws are `UNL-059 Master Yi, Unstoppable` (T1, E12, and they
have no XP to discount him), `VEN-040 Decree of Focus` (T2), a second Master Yi (T3) and a second Decree
of Focus (T4). Decree of Focus is one rune and dead here, since you play no Fury: *"[Reaction] (Play any time, even
before spells and abilities resolve.) Choose a friendly unit that's in combat with an enemy Fury
(:rb_rune_fury:) unit or that's being chosen by an enemy Fury spell. Give it +4 :rb_might: this turn."*

```
turn      runes  your turn                                               points
T1        2      Veteran Poro (E2) to base. None left.                   0
their T1  3      Stalwart Poro (E2) to base. One left.
T2        4      Veteran Poro walks to A, empty, Conquer: +1.            1
                 Laurent Bladekeeper (E3) to A. One left.
their T2  5      Stalwart Poro walks to B, empty, Conquer. Sunlit
                 Guardian (E3) to B. Two left.
T3        6      Hold A: +1. Poppy (E5) from the Champion Zone to        2
                 base. One left.
their T3  7      Hold B. Frisky Hunter (E4) to B, with its Bird.
                 Three left: Shen's price.
T4        8      Hold A: +1. Pakaa Cub (E3) and Sea Monkey (E2 + E1,     3
                 buffed) to base. No attack. Two left.
their T4  9      Hold B. Nothing played. Nine left.
T5        10     Hold A: +1. Onslaught on Poppy: 11. Poppy, Pakaa Cub,   5
                 Sea Monkey and Bladekeeper attack B. They ambush
                 Vilemaw; the Duel: Poppy 14 against Vilemaw 8.
                 Conquer: +1. None left, one Body recycled.
their T5  9      Nothing can reach B or A.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4, 3 after their
T5. After your T4 it is **3 to 2**; after their T4, **3 to 3**; after your T5, **5 to 3**; after their
T5, **5 to 3**.

Runes on your board at the end of each turn: 2, 4, 6, 8, 9. On theirs: 3, 5, 7, 9, and 7 after
Vilemaw's two Calm are recycled on your T5.

Your hand, card by card: 5 after the T1 draw, 4 after Veteran Poro; 5, then 4 after Bladekeeper; 5
after the T3 draw (Poppy comes from the Champion Zone); 6 after the T4 draw, 4 after Pakaa Cub and Sea
Monkey; 5 after the T5 draw, 3 after Onslaught and the Duel (two Elder Dragons and Volibear). Theirs: 5
after the T1 draw, 4 after Stalwart Poro; 5, then 4 after Sunlit Guardian; 5, then 4 after Frisky
Hunter; 5 after the T4 draw; 4 after Vilemaw on your T5 (two Master Yis, two Decrees of Focus).

**Your T2 and their T2: one battlefield each.** Veteran Poro takes A, which is empty: a non-combat
showdown, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty Battlefield are
a stand-alone Phase and do not create a Combat."* With nothing to play they pass, and 348.2.a.1 makes it
a point: *"This results in a Conquer if that player has not yet scored that Battlefield this turn."*
Bladekeeper goes to A, which you now control, 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* Stalwart Poro takes B the same way on
their T2, and Sunlit Guardian joins it.

**Your T3: Poppy to base.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they
did not yet Score this turn during their Beginning Phase."* Poppy is played to base, and she is the
attack's body: a unit at A cannot reach B without [Ganking], 144.4.a: *"Units may move from their Base
to a Battlefield."*

**Their T3: B is 11 when it defends, with Shen behind it.** They Hold B and add Frisky Hunter and its
Bird. Defending, B is Sunlit Guardian 4 ([Tank]), Stalwart Poro 3, Frisky Hunter 3 and the Bird 1: 11.
They keep three runes, which is Shen, Kinkou from the Champion Zone at [Reaction] speed.

**Your T4: why there is no attack.** Onslaught on Poppy and an attack with her and Bladekeeper, which
can gank from A (144.4.c.1: *"Units with Ganking may use their Standard Move to Move from Battlefield to
Battlefield."*), is 11 + 3 = 14 against 11. Unanswered, your 14 kill all four of theirs, their 11
cannot kill both of yours (11 + 3 = 14 lethal), and B is yours on T4. But Shen, Kinkou comes in as a
[Reaction] to B for their last three runes and defends at 5, with [Tank]: 16 against 14. Your 14 must go
into the two [Tank]s first (815.1.c.2: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments
until all units with Tank have lethal damage assigned to them."*), 4 + 5, then Stalwart Poro 3, and 2
on Frisky Hunter, which survives with the Bird. Their 16 kill Poppy and Bladekeeper. So T4 builds the
T5 attack instead: Pakaa Cub, and Sea Monkey with its extra Energy for a buff, to base. No Power is paid
before T5, because one recycled rune would make T5 a nine-rune turn and the pair unaffordable.

**Their T4: nine runes held.** They Hold B. Their hand has nothing to play but two Master Yis and two dead
Decrees, and Vilemaw is a [Reaction] for eight. They pass with all nine.

**Your T5: the pump, before anything is known.** All your objects ready, 315.1.b: *"1. The Turn Player
readies all Game Objects they control that are able to be readied."* You Hold A: 4. You channel to ten
runes. Onslaught is the first thing in your Main Phase: four runes, Poppy is 11 this turn. They pass
with nine up.

**The attack.** Poppy, Pakaa Cub and Sea Monkey walk from base into B, and Bladekeeper gank-moves from
A into B with them, as one move, 144.3: *"Players may perform multiple Units' standard move
simultaneously. This is treated as one game action performed on multiple Units."* Veteran Poro stays,
so A is still yours. That is a combat, and you have Focus first, 464.2.c.1.a: *"If a showdown opens as
part of combat, this player gains Focus as the showdown begins."* You pass; 347.2.b: *"Otherwise, Focus
passes to the next Player in Turn Order."*

**They ambush Vilemaw.** Eight runes, two Calm recycled, to B, where they control units. It lands as a
defender (464.2.c.3.a). Its clause now silences every attacker of yours below 8: Pakaa Cub, Sea Monkey
and Bladekeeper, all 3s. Poppy, at 11, is not below it. Their chain closes and Focus is yours again,
347.1.b: *"When that Chain closes, Focus passes to the next Player in Turn Order."*

**The Duel.** Six runes, one Body recycled: Poppy gets +3, 14, and the enemy unit is Vilemaw. They have
one rune, and the only cards in their hand it pays for are the two dead Decrees of Focus. Poppy deals 14 to
Vilemaw, Vilemaw deals 8 to Poppy; Vilemaw dies (143.2.a) and Poppy lives, 8 marked on 14. Focus passes,
both pass, and 347.2.a ends the showdown: *"If all Players have passed once in sequence, the Showdown
ends."*

**Combat damage.** 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal
to their summed Might among the other's Units."* Vilemaw is gone, so nobody is silenced. Yours is Poppy
14 and three 3s: 23. Theirs is Sunlit Guardian 4, Stalwart Poro 3, Frisky Hunter 3 and the Bird 1: 11.
Your 23 put lethal on Sunlit Guardian first ([Tank]) and then on all the others, 4 + 3 + 3 + 1. Their 11
cannot kill all four of yours. Lethal counts what is already marked, 142.4.b: *"Lethal Damage for a Unit
is a non-zero amount greater than or equal to that Unit’s Might."*, so Poppy needs 6 more, and the four
need 6 + 3 + 3 + 3 = 15. Whatever they assign, at least one of yours remains and none of theirs does,
466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield
this turn."* That is 5. Eye of Twilight's [Tank] on any of their units changes only which of theirs dies
first. Damage heals at the end of the turn, 317.2.b: *"Insert “3c. Heal all Units.”"*

**Their T5.** Their board is empty, and units they play enter exhausted, 143.4: *"Units enter the Board
exhausted."* Nothing reaches B or A. **5 to 3.**

**The Duel alone, without Onslaught.** Same draws, ten runes. The same four attack with Poppy at 5;
they ambush Vilemaw, and every attacker is silenced. The Duel makes Poppy 8 against Vilemaw's 8, and
both die. Your three 3s, 9, go into Sunlit Guardian 4 and Stalwart Poro 3, and 2 sit on Frisky Hunter;
their 11 kill all three. B stays theirs. They Hold it on their T5: **4 to 4**, and you have lost Poppy
and three bodies for Vilemaw, Sunlit Guardian and Stalwart Poro. The four runes the Duel did not need buy
nothing that can attack this turn.

**Onslaught alone, without the Duel.** Poppy is 11 and the only attacker Vilemaw does not silence. Her
11 go into Sunlit Guardian 4, Stalwart Poro 3, Frisky Hunter 3 and the Bird 1, and leave Vilemaw
untouched. Their 19 kill Poppy and two of the 3s; the last is recalled, 466.1.a.2: *"Insert “3d. Recall
Attackers present at the Battlefield if Defenders are still present.”"* **4 to 4**.

**Not attacking at all** is **4 to 4** too. The engine is the only line that takes B.

**The other pump: Primal Strength waits.** `OGN-154 Primal Strength` (Body, E4 + 1 Body Power):
*"[Action] (Play on your turn or in showdowns.) Give a unit +7 :rb_might: this turn."* With it in
Onslaught's place, nothing is committed in the Main Phase. Poppy attacks at 5 with ten runes up, Vilemaw
comes in, and then Primal Strength (12) and the Duel (15) are both played into what is known. Vilemaw
dies, Poppy lives with 8 marked on 15, and B falls the same way. The pair is the same ten runes, with
two Body recycled instead of one, and Primal Strength has no [Flow]. It is still two spells in one
turn, so the two one-rune counters of §5 reach it as well.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first you
have seen **9** cards by T5. With three copies of each (103.2.b: *"Your Main Deck can include up to 3
copies of the same named card."*), an Onslaught among them is **55.58%**, a Duel **55.58%**, and both
**29.35%**. A Duel with either pump, six cards, is **44.13%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T5 the pump made Poppy a body Vilemaw could not
silence, and the Duel killed Vilemaw at no cost to her, so the attack conquered B. The predicate is:
played on your T5 with the nine runes they kept, does it leave B theirs after your T5?

**The scope.** A Calm/Order deck plays only Calm, Order and Calm/Order cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Eye of Twilight's tag is Shen. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
not a Signature card with another champion's tag. Folded by name, that is **257** cards; three are
Signature cards with another tag and are out (`OGN-262 Zenith Blade`, `SFD-198 Arise!`, `UNL-196
Daisy!`), and Shen's own `VEN-148 Shadow Dash` is in. None is banned in constructed, which leaves
**254**. On your turn they can play only what carries [Reaction], [Action], [Ambush] or [Hidden]. The
predicate is a card whose text contains one of those four keywords, reminder text included: **61** of
the 254. It is a ceiling, not a castable count: 11 of the 61 are [Hidden] cards, and nothing was hidden
on their T4, and some carry the keyword only on an ability.

**Beside Vilemaw they have one rune.** Vilemaw is the card the engine was played to beat, and it does.
Shen, Kinkou instead of Vilemaw is three runes and makes B 16. Poppy at 11 and three 3s are 20, which
kill all five (4 + 5 + 3 + 3 + 1), and their 16 cannot kill 11 + 3 + 3 + 3 = 20 of lethal: B falls
without the Duel. So
what can break the engine is what fits in the ninth rune. Of the 61, the cards that cost one rune are
`OGN-045 Defy`, `VEN-039 Crumbling Sands`, `OGN-046 En Garde`, `UNL-031 Combat Experience`, `UNL-046
Friendship`, `UNL-173 Sacrifice` and `VEN-040 Decree of Focus`; the two Seals are gear and cannot be
played on your turn.

- **`OGN-045 Defy`** (Calm, E1 + 1 Calm Power; *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than
  :rb_rune_rainbow:."*) counters Onslaught in your Main Phase: it is E4 and no Power. Poppy is a 5
  again, and they still have eight for Vilemaw. If you attack, the line is the Duel alone; if you do
  not, it is not attacking. **One rune, recycled, and B holds: 4 to 4.** Defy cannot counter the Duel,
  which is E6.
- **`VEN-039 Crumbling Sands`** (Calm, E1 + 1 Calm Power; *"[Reaction] (Play any time, even before
  spells and abilities resolve.) Counter a spell if an opponent has played another spell this turn."*)
  counters the Duel in the combat, after Vilemaw, because Onslaught was the other spell. The line
  becomes Onslaught alone with the Duel's six runes spent: B holds, and you lose Poppy and two bodies.
  **One rune, recycled.** It is the engine's own shape that turns it on: the Duel played alone is one
  spell, and Crumbling Sands' condition is false.
- `UNL-046 Friendship` (Calm, E1; *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Choose a unit. Give it +1 :rb_might: this turn for each of the following tags among your
  units — Bird, Cat, Dog, and Poro."*) is +3 here: Stalwart Poro is a Poro, Frisky Hunter a Cat, the
  token a Bird. On Vilemaw in answer to the Duel it makes an 11: Poppy's 14 still kill it, and she lives
  with 11 marked, 3 to lethal. Then their 11 meet your 3 + 3 + 3 + 3 = 12 of lethal, and one of yours
  remains. On one of their units in the combat it makes their side 14 against your 15 of lethal. Either
  way, B falls. **It misses by one.**
- `OGN-046 En Garde` and `UNL-031 Combat Experience` make Vilemaw a 9 at most: Poppy's 14 kill it.
  `UNL-173 Sacrifice` kills one of their own Mighty units for cards, and Decree of Focus is dead.

**What does not fit beside Vilemaw.** `SFD-045 Not So Fast` (Calm, E2 + 1 Calm Power; *"[Reaction] (Play any time, even before spells and
abilities resolve.) Counter an enemy spell or ability that chooses a friendly unit or gear."*) counters
the Duel for two runes, and
`OGN-064 Wind Wall`, `UNL-044 Flurry of Feathers` and `OGN-080 Mystic Reversal` take the Duel for three
or four. `VEN-126 Ki Barrier` (Order, E2 + 1 Order Power) on Vilemaw prevents 7 of Poppy's 14 and
leaves it alive at 7 marked on 8. Each is eight plus two or more. Played alone instead of Vilemaw, each leaves your four bodies
unsilenced, and the T5 attack with Onslaught is 20 against 11 before the Duel is played. The stuns (`OGN-050 Rune Prison`,
`SFD-040 Thwonk!`, `UNL-042 Back Off` and the rest) touch only combat damage (423.1.b), so the exchange
still kills.

Defy and Crumbling Sands tie at one rune, exhausted and recycled. Defy works earlier and Crumbling
Sands works only because of the pump; neither answers Vilemaw's job, they answer the card that beats
it.

## 6. Verdict

**Right about the mechanism and the ceiling; wrong that Onslaught is the domain's biggest pump, and
silent on the price of being two spells.** The exchange is unit damage (417.6.b.3, 417.6.c), so no
[Tank] and no combat-damage clause touches it, and the Duel at [Action] speed can wait for what the
combat brings. Walked going first against a Calm/Order deck that held nine runes and ambushed Vilemaw
into the T5 attack, Onslaught made Poppy an 11 that Vilemaw could not silence, the Duel made her a 14
that killed it and lived, and the attack conquered: **5 to 3** after their T5. The Duel alone trades
Poppy for Vilemaw and loses the combat, Onslaught alone leaves Vilemaw standing, and not attacking is
the same score: **4 to 4**. The pair is ten runes: the whole of T5 going first, and all but one going
second. But it is two
spells in one turn, and the cheapest answer is a one-rune counter that fits beside Vilemaw: Defy on
Onslaught in the Main Phase, or Crumbling Sands on the Duel in the combat, which is legal only because
Onslaught came first. `OGN-154 Primal Strength` does Onslaught's job at [Action] speed for one more
Body rune, and is +7.

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Order runes for you, Keeper of the
Hammer's two domains, in the twelve of Tournament Rules 402.1. The only Power in your line is the
Duel's one Body on T5, from your first ten runes: it fails in **0 of 924**, since ten runes hold at
least four of each. With Primal Strength in Onslaught's place it is two Body among ten: **0 of 924**.
The other six runes play no part, and no Order card is in the walk.

Their walk assumes six Calm and six Order. Vilemaw on your T5 needs two Calm among their first nine: **0
of 924**. Vilemaw and Defy or Crumbling Sands need three Calm among nine: **0 of 924**, since nine runes
hold at least three of each; 84 of the 924 orders hold exactly three. Shen on your T4 needs one Order
among their first seven: **0 of 924**.

**How likely an answer is.** Out of their own **39**, by your T5 they have seen **8** cards: four
opening and a draw on each of their four turns. A Vilemaw is among them in **50.82%**; a Defy or a
Crumbling Sands, six cards, in **77.43%**; a Vilemaw and one of the six, **37.76%**. Those are before
the deal. The walk fixes their opening four, Vilemaw among them, which leaves four draws from the other
**35**: one of the six counters among them is **54.64%**. These count only the cards named, not how many
of them a deck runs.

The walk reads Vilemaw's *"don't deal combat damage"* as 423.1.b reads a stun, so a silenced attacker
adds nothing to 465.2.a's sum. Whether Bladekeeper's gank and the three moves from base are one action
under 144.3 is not ruled here; if Bladekeeper cannot join, your T5 side is 20 against their 11, their 11
still cannot kill 6 + 3 + 3 = 12 of lethal, and B falls the same way.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, a rune split other than six and six, `OGN-213 Hidden Blade` or `OGN-220 Facebreaker`
hidden at B on their T4. A hidden card is played *"ignoring its base cost"* (811.1.b), so the hide, one
recycled rune, and Vilemaw are exactly nine. What does not fit is the [Deflect] Power a hidden card that
chooses Poppy must add. The hidden cards that choose no unit of yours (`OGN-057 Block`, `OGN-053 Stand
United`, `OGN-077 Zhonya's Hourglass`, `SFD-154 Guards!`, `VEN-117 Disciple of Shen`, `SFD-043 Emperor's
Divide`) fit beside Vilemaw, and none of them stops Poppy's 14 from taking B. Also not walked: pairs of §5's two-rune answers with Shen inside nine runes, their T5 and the board after it, and the Flow plays of Onslaught later in the game.

## Leads

- The note on `VEN-081 Onslaught`, *"The biggest pump in the domain, and the only one that is playable
  twice"*: `OGN-154 Primal Strength` is +7 for E4 + 1 Body Power, with [Action]. Of the eight spells
  with Body in their domains whose text gives *"+N :rb_might: this turn"* (buffs, such as `OGN-153
  Overt Operation` and `OGN-270 Showstopper`, are not counted), Onslaught is second-biggest, and it is
  the only one with [Flow] or [Repeat]. Six of the eight are [Action]; Onslaught and `VEN-083 Rampage`
  are not.
- The note on `OGS-008 Gentlemen's Duel`, *"The only member of the family that pumps and then fights
  with the SAME card"*: `VEN-083 Rampage` does too, +2 if its optional Body Power is paid: *"As you play this,
  you may pay :rb_rune_body: as an additional cost. Choose a friendly unit and an enemy unit. If you
  paid the additional cost, give the friendly unit +2 :rb_might: this turn. They deal damage equal to
  their Mights to each other."* The Duel's +3 is unconditional and [Action]; Rampage has no timing keyword.
- *"Both halves choose, so a [Deflect] body taxes each of them separately (809.1.c)"*: 809.1.c taxes
  only spells an opponent controls. The friendly half chooses your own unit, so a Duel pays at most
  one tax, the enemy target's [Deflect] value.
- The ledger, *"Ten Energy and one Power removes any single unit in the pool"*: `SFD-105 Ruin Runner`
  and `UNL-147 Baron Nashor` (one of the pool's printed 12s) cannot be chosen by enemy spells and
  abilities; `VEN-038 Akali, Silent` only in combat; `UNL-059 Master Yi, Unstoppable` not once he reaches
  [Level 16];
  `UNL-057 Alpha Wildclaw` shields smaller units at its battlefield; and the spell `VEN-031 Twilight
  Shroud` makes a friendly unit unchoosable this turn. Those are examples, not a census. A [Deflect 2] target (for example `VEN-046
  Nasus, Ascended`, `OGN-041 Volibear, Furious`, `SFD-120 Sivir, Ambitious`, `SFD-085 Ornn, Forge God`,
  `VEN-122 Solari Sunhawk` Empowered, or `VEN-088 Jayce, Hammer in Hand` in that mode)
  makes it ten Energy and three Power, and `VEN-134 Kayle, Justified` Empowered three times has
  [Deflect 3], which makes it four. Ten runes is T5 at the earliest from either seat: the whole turn
  going first, and all but one rune going second.
- *"Onslaught carries no keyword at all"*: it carries [Flow]. It has no timing keyword, which is what
  155 reads.
- *"The second play costs the same 4 Energy as the first, which is unusually flat for the keyword"*:
  five of the fifteen cards that print their own [Flow] cost repeat their base cost exactly (`VEN-012
  Perfect Execution`, `VEN-049 Dredge Up`, `VEN-081 Onslaught`, `VEN-100 Up from the Deep`, `VEN-116
  Dragon Form`).
- No answer is named. The pair is two spells in one turn, so playing Onslaught first makes the Duel a
  legal target for `VEN-039 Crumbling Sands` (E1 + 1 Calm Power), and Onslaught is itself a legal
  target for `OGN-045 Defy` (E1 + 1 Calm Power). In the walk either one fits beside an ambushed
  `UNL-060 Vilemaw` in nine runes, and either keeps the battlefield.
- The steps never say what the pump is committed against. Onslaught has to be played before the
  attack, so it is committed before an [Ambush] defender is known; Primal Strength waits for it, for
  one more recycled Body rune.
