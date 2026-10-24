# Play — Feral Strength's +2 saves the T2 pair, the Repeat never changes a count, and Combat Experience stays a +1

Issue #440 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `combat-experience-feral-strength-repeat-versus-level`**, the Calm ENGINE that compares
two [Reaction] pumps: `UNL-031 Combat Experience` (Calm spell, E1), +1, or +3 at [Level 6], and
`SFD-034 Feral Strength` (Calm spell, E2), +2, with a [Repeat] of two more Energy that may put a
second +2 on a different unit. The entry is right about the rules: one extra execution, a second
target allowed, and a rung that replaces the +1. Walked as a game, going first, under `UNL-191 Wuju
Master` against the Fury/Chaos Draven deck of
[the En Garde play](2026-10-23-en-garde-wants-a-lone-body-they-attack-the-hammer-a-pair-they-leave-alone-and-both-end-where-a-plain-two-drop-does.md),
three lists were dealt the same hand with one card changed. **The Feral Strength list** keeps two
runes up on T2 behind a pair of 2s at A. Their Saboteur, made a 5 by `OGN-016 Dangerous Duo`,
attacks. The +2 keeps one body alive and kills the Saboteur: **2 to 1** after their T3, **3 to 2**
after their T4. **The Combat Experience list** has the same deal, but at 1 XP the card is a +1. Both
bodies die with the Saboteur, A is left empty, and on T3 every unit goes to base: **1 to 2** after
their T3. **The control**, a third `UNL-094 Gemhand Hunter` in the slot, plays it on T2. Their
Saboteur takes the empty battlefield instead: **2 to 2** after their T3. The Repeat is never paid. It
cannot be paid with two of your units at one battlefield before their T3. And against the walk's
fights, a second +2 kills no more and saves no more than the first. Combat Experience's rung is dark
in both pump lists through their T4, at 4 XP at most; only the control, which lost no body on their T2,
reaches 6, on its T4 Hold. The cheapest answer to
Feral Strength is one rune: `OGN-004 Cleave`, `SFD-003 Blood Rush` or `UNL-010 Vault Breaker`, played
before the attack as the card that turns on the Duo's [Legion], or `VEN-015 Decree of Rage` on the
Calm body.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `b2d869d`, reads
773 entries, 262 with forced-ordering language, **97 in the queue and 7 of them with no play**,
unchanged from the issue's measurement at `e878182`. The pick is by global rank, skipping entries
that already have a play: this entry is rank 91 (a hit on *before*), first in the list. The other
entry of this slice is rank 92, `crumbling-sands-decree-of-focus-conditional-reactions`.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-191 Wuju Master` (Calm/Body, tag Master Yi) |
| **Chosen Champion** | `UNL-113 Master Yi, Tempered` (Body, E4, M4), never played in the walk |
| **The fork** | `SFD-034 Feral Strength` (Calm spell, E2) in one list, `UNL-031 Combat Experience` (Calm spell, E1) in the other, a third `UNL-094 Gemhand Hunter` (Body, E2, M2) in the control |
| **The bodies** | `UNL-094 Gemhand Hunter` (Body, E2, M2), `UNL-040 Wuju Apprentice` (Calm, E2, M2), `UNL-102 Crowd Favorite` (Body, E3, M3), `UNL-097 Kinkou Initiate` (Body, E3, M3) |

The entry admits any legend with Calm in its pair. Wuju Master is the one for this walk because its
own rungs read XP, so its deck is built to gain it, and Combat Experience's rung gets its best chance. Its deck is the
Calm/Body [Hunt] deck of
[the Gardens play](2026-10-14-the-gardens-buy-level-6-a-turn-early-and-a-ready-attacker-on-their-t2-takes-them-first.md),
without the Gardens and without `UNL-109 Blood Rose`, so every XP in the walk comes from [Hunt]. Its tag
is Master Yi, so Master Yi, Tempered can be the Chosen Champion, 103.2.a.2: *"Must be a champion unit
with a champion tag that matches the tag on your Champion Legend."*

Every card in the three lists is mono-domain, Calm or Body, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."*
Three copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same
named card."* None of the cards in this play is a Signature card (`signature` in `data/cards.json`),
and none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Feral Strength: *"[Reaction] (Play any time, even before spells and abilities resolve.) [Repeat]
  :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) Give a unit +2
  :rb_might: this turn."*
- Combat Experience: *"[Reaction] (Play any time, even before spells and abilities resolve.) Give a
  unit +1 :rb_might: this turn. [Level 6][>] Give it +3 :rb_might: this turn instead. (While you have
  6+ XP, get the effect.)"*
- Wuju Master: *"[Level 6][>] Your units have +1 :rb_might:. (While you have 6+ XP, get the effect.)
  [Level 11][>] Your units enter ready."* Neither rung is live in the walk.
- Gemhand Hunter: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] I have +1 :rb_might:.
  (While you have 6+ XP, get the effect.)"*
- Wuju Apprentice: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] When you play me, draw
  1. (While you have 6+ XP, get the effect.)"*
- Crowd Favorite: *"[Hunt] (When I conquer or hold, gain 1 XP.) Spend 2 XP: [Buff] me. (Give me a +1
  :rb_might: buff if I don't have one.)"* The walk never spends XP.
- Kinkou Initiate: *"When you play me, draw 1 if your other units have total Might 5 or more."*
- Dangerous Duo (theirs): *"[Legion] — When you play me, give a unit +2 :rb_might: this turn. (Get the
  effect if you've played another card this turn.)"*

## 2. Plus two, twice, or plus one that becomes three

**The Repeat is one more execution, chosen when you cast it.** 820.1.b: *"Repeat is an optional cost
that a player may pay to execute the effect of their spells and abilities a second time."* 820.1.c.1:
*"The Cost is an Additional Cost to be paid during the steps of playing the spell or ability."*
820.1.d.1: *"When the additional cost is paid, the effect of the spell or ability, upon resolution,
will be performed an additional time."* The second +2 may go elsewhere, 820.2.a: *"Choices made for
the additional execution do not have to be the same as the choices made for the initial
execution."* And there is one, 820.1.c.3: *"Each Repeat Cost can be paid only a single time."* So
Feral Strength is +2 for two Energy, or +2 and +2 for four, both fixed as you cast it.

**The open [Repeat] reading does not bear on this walk.** The #187 bullet in
`docs/rules-notes/rules-findings.md` carries the gap between 820.3.a, *"Regardless of the number of
times a spell or ability's instructions are executed with this keyword, it is only Played once."*,
and 820.2's two sets of choices. The gap matters only to a card that counts plays, choices or
targets. No card in either deck does, and the main line never pays the Repeat. Where §4 prices a paid
Repeat, its two +2s go on two different units, which 820.2.a allows in words.

**The rung is a balance, read continuously.** 824.1.b.1: *"It is functionally short for “While you
have [N] or more XP, this card gains ‘[Text]’.”"* 824.1.d: *"The Dependent Ability will be Inactive as
soon as the controlling player has less than [N] XP."* In this deck the XP comes only from [Hunt],
823.1.c.1: *"Hunt is functionally short for: “When I Conquer or Hold, my controller gains X XP.”"* So
every XP is a Hunt body that conquered or held, and the bodies that pay XP are the ones the
opponent's attacks kill. Below 6 XP Combat Experience is a +1 for one Energy.

**Both are bought after they commit.** Both have [Reaction], 813.1.c.1: *"This can be played during Closed
States on any player's turn."* So you cast either in the showdown of their
attack. In that showdown the attacker acts first, 464.2.d: *"3. The Attacker gains Focus."* And an
[Action] card of theirs plays there too, 806.1.b: *"Action grants the corresponding card or effect
permission to be played or activated during Showdowns, even when it is not the Controlling player's
turn."*

**Combat is a sum, and lethal comes one body at a time.** 465.2.c: *"Starting with the Attacker,
each player assigns an amount of damage equal to their summed Might among the other's Units."*
465.2.c.3: *"Units must have lethal damage assigned to them in full before damage is assigned to a
different Unit."* 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to
that Unit’s Might."* So against two of your units the attacker kills the cheaper one first, and the
number that die is the most whose lethal values fit inside their sum.

**Where the shape pays.** Two 2s, attacked for a sum of S:

```
pump on the pair              lethal values   one dies at S   both die at S
none                          2, 2            2 to 3          4 or more
Combat Experience, +1         2, 3            2 to 4          5 or more
Feral Strength, +2            2, 4            2 to 5          6 or more
Combat Experience at L6, +3   2, 5            2 to 6          7 or more
Feral Strength repeated       4, 4            4 to 7          8 or more
```

The repeated Feral Strength saves one body more than the single cast only when S is 2 or 3 (none
dies instead of one) or 6 or 7 (one dies instead of two). Against the walk's 5 it saves the same one
body as the single cast and as the rung, for four Energy instead of two or one. It also adds 2 to
your own sum, which the walk never needs: 6 already kills the 5.

**When four Energy can be open.** Going first you have 2, 4, 6 and 8 runes on T1 to T4. Units move
from base to a battlefield and back, never between battlefields, 144.4.a: *"Units may move from
their Base to a Battlefield."* 144.4.c.1 is the one exception: *"Units with Ganking may use their
Standard Move to Move from Battlefield to Battlefield."* No unit in this walk has [Ganking]. Two of
your units at A on their T2 means one walked on T2 and one was played there for two of your four
runes, so two are left, never four. The first turn of theirs on which the Repeat can be paid behind a
pair is their T3: one two-drop and four runes up out of six, instead of your T3's development.

**Where a unit can be played.** 355.2.a: *"By default, Valid locations include the controller’s Base
or a Battlefield the controller controls."* A unit played to a battlefield you already control opens
no showdown, 190.3.a.1: *"Units moving to or being played to a battlefield apply Contested status if
that battlefield is not already Contested and that Unit’s controller does not already control that
battlefield."* It enters exhausted, 143.4: *"Units enter the Board exhausted."* It still defends,
464.2.c.3: *"The attacker and defender gain the Attacker or Defender designation now, as appropriate.
Units at the Contested Battlefield controlled by the Attacker or Defender gain the Attacker or
Defender designation now, as appropriate."*

## 3. Their deck: Fury/Chaos Draven

The deck of the En Garde play linked above, in the same seat and with the same draws. `SFD-185
Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1. (You win if only your units
remain after combat.)"* It fires once in the main line. Its Chosen Champion is `OGN-028 Draven,
Showboat`, never played. Their bodies are `OGN-018 Noxus Saboteur` (Fury, E3, M3), `OGN-010 Legion
Rearguard` (Fury, E2, M2), Dangerous Duo (Fury, E3, M3), `OGN-013 Pouty Poro` (Fury, E2, M2), `OGN-171
Mystic Poro` (Chaos, E2, M2), `OGN-165 Cemetery Attendant` (Chaos, E3 + 1 Chaos Power, M3; *"When you
play me, return a unit from your trash to your hand."*), `OGN-006 Flame Chompers` (Fury, E3, M3) and
`OGN-012 Noxus Hopeful` (Fury, E4, M4; *"[Legion] — I cost :rb_energy_2: less. (Get the effect if
you've played another card this turn.)"*). Going second, they channel an extra rune on T1, 485.7:
*"First Turn Process: The player going second channels an extra Rune from their Rune Deck during
their first Channel Phase of the game."*

## 4. The turns, going first

Calm/Body against Fury/Chaos. Your battlefield is A, `OGN-281 Hallowed Tomb` (*"When you hold here,
you may return your Chosen Champion from your trash to your Champion Zone if it is empty."*, and Master
Yi never leaves the Champion Zone); theirs is B, `SFD-210 Hall of Legends` (*"When you conquer here,
you may pay :rb_energy_1: to ready your legend."*, and neither legend has an exhaust ability). Your
opening four are Gemhand Hunter, Wuju Apprentice, Crowd Favorite and the fork card: Feral Strength,
Combat Experience or the third Gemhand Hunter. Your deck then gives a second Gemhand Hunter (T1),
Kinkou Initiate (T2), a second Wuju Apprentice (T3), a second Crowd Favorite and a second Kinkou
Initiate. Their opening four are Noxus Saboteur, Legion Rearguard, Dangerous Duo and Pouty Poro. Their
draws are Mystic Poro (T1), Cemetery Attendant (T2), Noxus Hopeful (T3), a second Legion Rearguard
(T4), and Flame Chompers if the legend draws.

The main line is the Feral Strength list.

```
turn      runes   your turn                                                 XP   points
T1        2       Gemhand Hunter (E2) to base. None left.                   0    0
their T1  3       Noxus Saboteur (E3) to base. None left.
T2        4       Gemhand walks to A, Conquer: +1, Hunt +1 XP. Wuju         1    1
                  Apprentice (E2) to A. Two left, Feral Strength in hand.
their T2  5       Legion Rearguard (E2), then Dangerous Duo (E3): its
                  +2 on the Saboteur, a 5. The Saboteur attacks A. Feral
                  Strength (E2) on the Apprentice: a 4. Their 5 kill
                  Gemhand and leave the Apprentice; your 6 kill the
                  Saboteur. A stays yours. None left on either side.
T3        6       Hold A: +1, Hunt +1 XP. Crowd Favorite (E3) to A, then    2    2
                  Kinkou Initiate (E3) to A: the others are 5, so it
                  draws. None left.
their T3  7       The Rearguard and the Duo walk to B, empty, Conquer.
                  Cemetery Attendant (E3 + 1 Chaos Power) to base: the
                  Saboteur comes back to their hand. Noxus Hopeful (E2
                  with Legion) and Pouty Poro (E2) to base. Seven
                  runes, one recycled; none left.
T4        8       Hold A: +1, two Hunts +2 XP. Crowd Favorite (E3),         4    3
                  Gemhand Hunter (E2) and Wuju Apprentice (E2) to A.
                  One left.
their T4  8       Hold B. Noxus Saboteur (E3), Mystic Poro (E2) and
                  Legion Rearguard (E2) to base. One left.
```

Their points: 0 after their T1 and their T2, 1 after their T3, 2 after their T4. After your T3 it is
**2 to 0**; after their T3, **2 to 1**; after your T4, **3 to 1**; after their T4, **3 to 2**.

Your hand, card by card: 5 after the T1 draw, 4 after Gemhand; 5 after the T2 draw, 4 after the
Apprentice, 3 after Feral Strength; 4 after the T3 draw, 3 after Crowd Favorite, 2 after Kinkou and 3
after its draw (Gemhand Hunter, Wuju Apprentice, Crowd Favorite); 4 after the T4 draw, 1 after the
three bodies (Kinkou Initiate). Theirs: 5 after the T1 draw, 4 after the Saboteur; 5 after the T2
draw, 3 after the Rearguard and the Duo; 4 after the T3 draw, 3 after the Attendant, 4 with the
Saboteur back, 2 after the Hopeful and the Pouty Poro (Mystic Poro, Noxus Saboteur); 3 after the T4
draw, 0 after the three bodies.

**Your T2: two runes up instead of the second Gemhand.** Gemhand, readied by your Awaken (315.1.b:
*"1. The Turn Player readies all Game Objects they control that are able to be readied."*), takes A,
which is empty: a non-combat showdown, 316.8.b.1: *"Showdowns that occur as a result of a player
moving to an empty Battlefield are a stand-alone Phase and do not create a Combat."* They spent their
three runes on the Saboteur, so it is a Conquer, 348.2.a.1: *"This results in a Conquer if that
player has not yet scored that Battlefield this turn."* The Apprentice is played to A, which you now
control (355.2.a), with no showdown (190.3.a.1). The second Gemhand Hunter stays in hand, and its two
runes stay up for Feral Strength.

**Their T2: the Duo goes first, and the +2 answers it.** A is two 2-Might bodies with two runes up,
and nothing they can see says what those runes are for. The Rearguard turns on the Duo's [Legion],
and the Saboteur is a 5 before it moves. Without a pump the 5 kill both, the 4 do not kill it, and
they conquer A and draw. In the showdown they have no rune left, and Feral Strength makes the
Apprentice a 4. Their 5 cannot kill both (2 + 4 = 6), so they kill Gemhand and put the other 3 on the
Apprentice. Your 2 + 4 = 6 kill the Saboteur. Only your unit remains, so A stays yours and their
legend does not draw. The Repeat was not payable: no rune was left.

**Your T3: development, not four runes up.** Feral Strength is spent and nothing else in hand has
[Reaction], so the runes go to the board. Crowd Favorite first makes your other units 2 + 3 = 5, so
Kinkou Initiate draws. A is 2 + 3 + 3 = **8**. The Apprentice cannot take B: only a unit in base can
walk there (144.4.a), and your base is empty.

**Their T3: the empty battlefield.** Their ready bodies are the Rearguard and the Duo, 5 against A's
8, and nothing in their hand pumps. They take B, empty, in a non-combat showdown with no rune of yours
up. The Attendant brings back the Saboteur that Feral Strength killed, and the Hopeful costs two with
[Legion].

**Your T4 and theirs.** You Hold A, 469.2: *"Hold: A player maintains Control of a Battlefield they did
not yet Score this turn during their Beginning Phase."* The Apprentice and Crowd Favorite hunt: 4 XP.
Your units at A cannot reach B, so the three bodies go to A, and A is 2 + 3 + 3 + 3 + 2 + 2 = **15**.
Their base holds the Attendant, the Hopeful and the Pouty Poro, 3 + 4 + 2 = 9, so they do not attack.
They Hold B: **3 to 2**.

**The Combat Experience list, same deal.** Through their T2 attack it is the main line. Combat
Experience (E1) makes the Apprentice a 3: you have 1 XP, so its rung is dark. Their 5 kill both,
2 + 3. Your 5 kill the Saboteur. Nobody is left, 466.5.b: *"If there are no Units remaining here
controlled by any player, the Battlefield becomes Uncontrolled."* They score nothing and do not draw,
**1 to 0**, and one of your runes did nothing. On T3 you control no battlefield, so 355.2.a sends
Crowd Favorite and Kinkou Initiate to base (Kinkou sees 3 and does not draw), and nothing holds or
hunts. On their T3 the Rearguard takes A and the Duo takes B, both empty: **1 to 2**, at 1 XP. Holding
Combat Experience still beats holding nothing. Without it, their 5 kill both and survive your 4: **1
to 1**, and the legend draws.

**The control: the third Gemhand in the slot, same deal.** On T2 it goes to A beside the Apprentice,
and A is **6** with no rune up. Their Saboteur at 5 against it would kill two and die, and A would stay
yours. They take B instead, empty: **1 to 1**. On T3 you Hold A with three Hunts, 4 XP, and Crowd
Favorite and Kinkou go to A, 12. Kinkou sees 9 and draws. On their T3 they Hold B, and their 5 do not
attack 12. The Attendant finds no unit in their trash. **2 to 2.** The control is the list that would
light the rung soonest. Its T4 Hold has four Hunts at A and makes 8 XP, a turn before the main
line's T5 Hold.

**The Feral Strength list against an opponent who takes B.** If they walk the Saboteur to the empty B
on their T2 instead of attacking, it is the control's game, with Feral Strength in hand instead of a
third body on the board.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 6 cards by T2 (four opening, one draw a turn from
T1). With three copies, Feral Strength among the first 6 is **40.30%**, and so is Combat Experience.
Their Dangerous Duo among their own first 6 is **40.30%**.

## 5. Breaks to

**What the engine did, and the predicate.** In the main line Feral Strength's single +2 kept the
Apprentice and A on their T2, and killed the Saboteur. The predicate is: with their T2's five runes,
can they leave both your units dead and a unit of theirs at A?

**The scope.** A Fury/Chaos deck plays only Fury, Chaos and Fury/Chaos cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Folded by name, and leaving out
legends, battlefields, runes, tokens and Signature cards with another champion's tag, that is **252**
cards. The five banned in constructed leave **247**. **52** of the 247 have [Action] or [Reaction] in
their text (the regex `\[(Action|Reaction)\]`, case-insensitive, on the text with reminder text left
in). Of those, **thirteen** cost one rune or less: one Energy, or one Power paid by recycling the same
rune (164.2.b: *"Recycle this: [Reaction] — Add [C]."*). Five runes cannot buy the Rearguard, the Duo
and one of them. So each of the thirteen enters the turn **in the Rearguard's place**, as the card
that turns on the Duo's [Legion]. That leaves one rune, and the Rearguard stays in hand.

**The one-rune answers: four of the thirteen break it.**

- **`OGN-004 Cleave`** (Fury, E1): *"[Action] (Play on your turn or in showdowns.) Give a unit [Assault
  3] this turn. (+3 :rb_might: while it's an attacker.)"* On the Saboteur before the Duo, it attacks at
  3 + 3 + 2 = 8. Feral Strength's 2 + 4 = 6 is inside it, so both bodies die. Your 6 do not kill the
  8. They conquer A and draw, **1 to 1**. You see the 8 before you cast anything, so Feral Strength
  stays in hand. **One rune.**
- **`SFD-003 Blood Rush`** (Fury, E1): *"[Action] (Play on your turn or in showdowns.) [Repeat]
  :rb_energy_1: (You may pay the additional cost to repeat this spell's effect.) Give a unit [Assault
  2] this turn. (+2 :rb_might: while it's an attacker.)"* The Saboteur attacks at 7, and the result is
  the same. **One rune**, its own [Repeat] not paid.
- **`UNL-010 Vault Breaker`** (Fury, E1 + 1 Fury Power): Blood Rush with [Ganking], a 7. **One rune**,
  exhausted for the Energy and recycled for the Power.
- **`VEN-015 Decree of Rage`** (Fury, E1 + 1 Fury Power): *"[Action] (Play on your turn or in
  showdowns.) This can't be countered. Deal 4 to an enemy Calm (:rb_rune_calm:) unit."* The
  Apprentice is Calm. Feral Strength in response would make it a 4, and 4 is still lethal (142.4.b),
  so you keep the card and the Apprentice dies. The Saboteur, a 5 with the Duo, then attacks Gemhand
  alone: Feral Strength makes it a 4 and it still dies, and its 4 do not kill the 5. **1 to 1.** **One
  rune.** Gemhand, Crowd Favorite and
  Kinkou Initiate are Body, so the Decree has one target in this deck's opening.

**Two more empty A instead of taking it.** `OGN-009 Hextech Ray` (*"Deal 3 to a unit at a
battlefield."*) and `UNL-014 Monster Harpoon` (deal 2; they control no facedown card) each cost E1 + 1
Fury Power. Cast before the attack, either kills a 2 unless you answer it. Feral Strength in response
keeps the target alive, at 4, but the damage stays marked until the combat's cleanup, 143.3.b.2:
*"During a Combat Cleanup."* So the target needs only 1 or 2 more damage, and the Duo's 5 kill both
bodies. Your 6 kill the Saboteur, and nobody is left (466.5.b): **1 to 0**, the Combat Experience
list's result. Without the response, the target dies and the 5 take A from a lone 2.

**The rest do not touch the line.** `OGN-169 Gust` returns a unit with 3 Might or less. Answered by
Feral Strength, its target is a 4 when it resolves, 359.3.e.5: *"If any of the spell's targets are no
longer legal, those game objects, players, or zones are unaffected by the spell as it resolves. Any
instructions related to an illegal target can’t be followed."* `UNL-134 Existential Dread` stuns an
attacking unit, and yours defend. `OGN-179 Acceptable Losses`, `SFD-135 Factory Recall` and the two
Seals act on gear, and you have none. `OGN-183 Stacked Deck` draws. Played as the Legion card, each of
those is the main line.

**The free answer is the empty battlefield.** Walked to B on their T2, the Saboteur scores **1 to 1**
and lives, and Feral Strength stays in your hand. Nothing they can see tells them to; the walk's
attack is what a player does into two runes that could be anything.

**Combat Experience needs no answer below its rung.** In the walk its +1 already cost both your
bodies, and A went to nobody. The four one-rune breaks above turn that into their Conquer, and so does
any +1 on the Saboteur, whose 6 then survive your 5.

## 6. Verdict

**Right about the rules; the size it prices is not the size that played.** Feral Strength's single +2
was the card. Held over the second two-drop on T2, it kept one body and A against their Duo-pumped
Saboteur, killed the Saboteur, and denied the legend's draw. That led the game, **2 to 1** after their
T3 and **3 to 2** after their T4, against **2 to 2** for a third two-drop in the slot. Combat
Experience in the same slot was a +1 at 1 XP. It traded both bodies for the Saboteur and left A
empty, **1 to 2** after their T3. Its rung was dark in both pump lists through their T4. [Hunt] pays
XP only for bodies that conquer or hold, and the lists that held a pump lost bodies; the control,
which lost none, is the one that reaches 6 XP on T4. The Repeat was
never paid. Going first it cannot be paid behind a pair before their T3. Against two 2s, its second
+2 changes the count only against a sum of 2 to 3 or 6 to 7, and the walk's sum was 5. The cheapest
answer to Feral Strength is one rune: Cleave, Blood Rush or Vault Breaker as the Duo's [Legion] card,
or Decree of Rage on the Calm body.

## 7. Not verified

I did not deal the channel order. No card you play in the walk costs Power, so your side rests on no
rune assumption at any split of Wuju Master's two domains in the twelve of Tournament Rules 402.1.
Their walk assumes six Fury and six Chaos. The Cemetery Attendant on their T3 needs a Chaos among
their first seven runes: with six Fury it cannot fail, **0 of 792**. Cleave and Blood Rush take any
rune. Vault Breaker, Decree of Rage, Hextech Ray and Monster Harpoon on their T2 need a Fury among
five: each fails in **6 of 792, 0.76%**, the deals with five Chaos first.

**How likely an answer is.** One of Cleave, Blood Rush, Vault Breaker and Decree of Rage, three copies
each, twelve cards, is among their first **6** cards in **90.93%** of games. Each break also needs the
Duo among those 6, **40.30%** on its own. These count only the cards named, not how many of them a
deck runs.

Their hand holding no showdown card is the walk's assumption; §5 prices it. Not walked: going second,
the mulligan, 2v2, Master Yi, a second Feral Strength held through their T3 with its Repeat paid, the
Combat Experience list and the control past their T3, the Feral Strength list's T5 (the first Hold at
6 XP or more), and `UNL-216 The Academy` or `SFD-211 Marai Spire` as your battlefield.

## Leads

- Step 4, *"Do not expect a third execution"*, and the notable *"So 4 Energy is the ceiling and there
  is no third +2"*: true of the card alone. `UNL-216 The Academy` (*"When you hold here, give your next
  spell this turn [Repeat] equal to its base cost."*) gives Feral Strength a second instance, [Repeat]
  2. 820.3 executes the instructions *"an additional time on resolution for each instance of Repeat
  that is paid for"*, so on the turn you hold it Feral Strength is three +2s for six Energy. `SFD-211
  Marai Spire` (*"While you control this battlefield, friendly [Repeat] costs cost :rb_energy_1:
  less."*) makes the repeated cast three Energy.
- The notable *"SO THE CHOICE IS SHAPE, NOT SIZE"* is stated at six XP. Below six XP, which in the walk
  was every turn of every list through their T4, the choice is +1 for one Energy against +2 for two.
  The walk's fight was decided by that size: the +2 kept a body against a 5 and the +1 did not.
- The prerequisite *"6 XP banked and never spent"* names no source of XP. In a [Hunt] deck going first
  the two pump lists had 4 XP or less after T4. The control, which lost no bodies on their T2, reaches
  8 on its T4 Hold. The main line, which lost one, reaches 6 only on its T5 Hold.
- The Repeat's second +2 is open behind a pair no earlier than their T3, going first, and against two
  2s it changes the number that die only against a sum of 2 to 3 or 6 to 7 (§2). The entry does not say
  either.
- No answer is named. Feral Strength's cheapest answers are `OGN-004 Cleave`, `SFD-003 Blood Rush` and
  `UNL-010 Vault Breaker` played before the attack as the card that turns on `OGN-016 Dangerous Duo`'s
  [Legion], and `VEN-015 Decree of Rage` on a Calm target, each one rune. `OGN-009 Hextech Ray` and
  `UNL-014 Monster Harpoon` leave the battlefield empty.
