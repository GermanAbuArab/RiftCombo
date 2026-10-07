# Play — Irelia lands with Discipline open and loses to a stun

Issue #305 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `discipline-irelia-fervent-cantrip-choose`**, the Calm ENGINE in which `OGN-058 Discipline`
chooses `SFD-057 Irelia, Fervent`. Her own trigger adds +1 to the spell's +2, and the spell draws a card,
so it is +3 Might for two Energy at no cost in cards. The entry is right that a spell choosing her
triggers her, right that her [Deflect] taxes only the opponent, and right that the Awakening ready is a
free +1 on your turn. Walked as a game, two things decide it. Irelia lands only when Discipline is open,
because on the opponent's turn she is M4 and `VEN-015 Decree of Rage` deals exactly 4 and can't be
countered. And when she attacks, Discipline goes first, because the attacker acts first in the showdown,
so the opponent answers after the +3. What breaks it is a stun cast after the pump.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `a4767cf`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 67 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 32 (a hit on *before*), first in the list. The other entry of this slice is rank 33,
played in [the discount pays for Reinforce and the kill pays for the Faefolk](2026-10-07-the-discount-pays-for-reinforce-and-the-kill-pays-for-the-faefolk.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm legend (103.1.b); here `OGN-255 Nine-Tailed Fox` (Calm/Mind) |
| **First** | a battlefield of your own, taken by `OGN-052 Stalwart Poro` (Calm, E2, M2) |
| **Then** | `SFD-057 Irelia, Fervent` (Calm, E5, M4) at your base, with two runes still ready after her |
| **Held** | two `OGN-058 Discipline` (Calm, E2) |

Irelia and both Disciplines are in hand when the walk needs them, as the clock assumes. Under this legend
Irelia is not the Chosen Champion, so she has to be drawn: three copies in 39 cards, eight cards seen by
T4 going first, find one 50.8% of the time.

The card text the play turns on:

- Irelia, Fervent: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) When you choose or ready me, give me +1 :rb_might: this turn."*
- Discipline: *"[Reaction] (Play any time, even before spells and abilities resolve.) Give a unit +2
  :rb_might: this turn. Draw 1."*
- Decree of Rage (theirs, Fury, E1 + 1 Power): *"[Action] (Play on your turn or in showdowns.) This
  can't be countered. Deal 4 to an enemy Calm (:rb_rune_calm:) unit."*

## 2. Your order: Irelia on T4, Discipline before they act

Irelia comes down a turn late on purpose. On T3 she costs five of your six runes, and the one rune left
cannot pay for Discipline. On the opponent's turn she is M4, because her ready +1 comes only from your
own Awakening. Decree reaches her at your base, because it names no location, and its 4 is lethal. 054
("Can't beats Can") puts its *"can't be countered"* above any counter you hold. Discipline answers it
anyway, because it raises her Might and does not need to stop the spell: on their turn it makes her M7,
and 4 damage does not kill her. So she lands on T4, three runes stay ready, and Discipline is open
through their turn.

The +1 on T5 is free for a reason the entry does not give. 143.4 enters her exhausted, and 315.1.b
readies her at your Awakening: *"1. The Turn Player readies all Game Objects they control that are able
to be readied."* That ready triggers her. She starts T5 at M5 without having acted.

Then she attacks, and Discipline goes first. 464.2.d gives the attacker Focus first. If you pass, the
defender ends the showdown by passing too, 347.2.a: *"If all Players have passed once in sequence, the
Showdown ends."* At 5 against their 6 she would lose, so you have to act. After your chain closes, the
next move is theirs, 347.1.b: *"When that Chain closes, Focus passes to the next Player in Turn Order."*

When Discipline chooses her, her trigger becomes a chain item of its own, 383.3: *"When a Condition is
met, a Triggered Ability behaves like an Activated Ability and is placed on the Chain."* It was added
after Discipline, so it resolves first, 340.1: *"The newest Finalized Chain Item resolves."* So a counter
on Discipline does not stop the +1. The draw has no target, so it still happens if she is gone by the
time Discipline resolves. Only the +2 is lost, 359.3.e.7: *"If all of an instruction's Targets become
Invalid or Unavailable by the time the spell begins resolving, that instruction will not execute."* Her
[Deflect] costs you nothing, 809.1.c: *"Spells and abilities an opponent controls that target [me/this]
cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each time they
choose [me/this]."*

## 3. Their order: a wall at B, and Decree saved for the combat

Fury/Calm, with `VEN-139 Rogue Assassin`, whose [Action] move works only *"If it's your turn"* and so
does nothing on yours. They take the other battlefield, B, on T2 and garrison it with `OGN-054 Sunlit Guardian`
(Calm, E3, M3, [Shield], [Tank]) and `OGN-013 Pouty Poro` (Fury, E2, M2), six Might on defence. They
hold Decree. On their T4, Decree into your three open runes trades one card for one Discipline at your
base. So they keep it for the combat, where its 4 adds to the six the wall deals. Combat damage is
dealt at the end of the showdown, using Might as it is then, 465.2: *"1. When the Showdown closes,
Attackers and Defenders resolve Combat Damage at the Battlefield that was attacked, using their current
Might."* Damage already marked counts toward that, 143.2.a: *"If a Unit ever has nonzero damage marked
on it equalling or exceeding its Might, it is Killed."*

## 4. The turns, going first

Calm/Mind against Fury/Calm.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base                                0
their T1        Pouty Poro to base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Mutated Mouser (E2) to A.   1
their T2        Pouty Poro walks to B, Conquer. Sunlit Guardian (E3) to B.
T3      6       Hold A: +1. Wizened Elder (E4) to A. Irelia waits: she    2
                would leave one rune, and Discipline costs two.
their T3        Hold B. Noxus Saboteur (E3) to their base. Decree held.
T4      8       Hold A: +1. Irelia, Fervent (E5) to base, exhausted.      3
                Three runes stay ready.
their T4        Hold B. A defends at ten (Poro 3, Mouser 3, Elder 4) and
                the Fox takes 1 off each attacker, so the Saboteur stays
                home. Decree stays in hand.
T5      10      Awakening readies Irelia: +1, M5. Hold A: +1. Irelia      5
                walks to B: combat against the Guardian (3, +1 Shield)
                and Pouty Poro (2), six. Discipline: her trigger, then
                +2, draw 1: M8. Their Focus: Decree on her (E1 + 1 Fury
                Power + 1 for Deflect), 4 marked; six more would be ten.
                Your Focus: Discipline again, M11, draw 1. Both pass.
                She assigns 4 to the Guardian ([Tank]) and 2 to the
                Poro, and takes 6 on top of 4: ten, under eleven.
                Conquer B: +1.
```

Their points: 1 on T2, 2 on T3, 3 on T4. Mouser and Elder go to A because 355.2.a allows *"a
Battlefield the controller controls"*. The Saboteur cannot reach A from B, only from their base
(144.4.a, 144.4.b), which is why it was played there. Nothing you cast cost Power, so you have ten runes
on T5. Two Disciplines answered one Decree and both drew a card, and the wall's two units died with it.
Six runes are still ready at the end of the combat.

## 5. Breaks to

**The line breaks to `OGN-050 Rune Prison`** (Calm, E2 + 1 Power, plus 1 Power for [Deflect]: two runes,
both recycled), cast with their Focus where the walk has Decree: *"[Action] (Play on your turn or in
showdowns.) Stun a unit. (It doesn't deal combat damage this turn.)"* At M8 she deals nothing, 423.1.b:
*"A Stunned Unit does not contribute its might to damage in the combat damage step."* The wall's six do
not kill her, so the Combat Cleanup sends her home, 466.1.a.2: *"Recall Attackers present at the
Battlefield if Defenders are still present."* B stays theirs, both their units live, and a second
Discipline only adds Might that deals no damage. Every Discipline adds Might, and a stun stops that
Might from dealing damage. The reply is `SFD-045 Not So Fast` (Calm, E2 + 1 Power, [Reaction]): *"Counter an enemy
spell or ability that chooses a friendly unit or gear."* That is a third card, and on T5 you have the
runes for it.

`OGN-045 Defy` (Calm, E1 + 1 Power: one rune) is cheaper and counters one Discipline: *"Counter a spell
that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."* Her trigger is already on the
chain, so she still gets +1: M6 against six, and both sides die. A second Discipline (M9) wins the fight
again. Defy costs you one Discipline and its draw, so it delays the engine rather than breaking it.

Decree, which the walk paid for, is the damage answer. Against damage the exchange is even: each answer
costs the opponent a card, and each Discipline replaces itself.

## 6. Verdict

**+3 and a card for two Energy, as the entry says, on a body that has to land with the answer open.**
The rules reading is right. The play adds two points about order. Irelia waits for T4, so Discipline is
open on the turn Decree could kill her. In combat Discipline goes first, because the attacker acts first,
and that hands the opponent the next move. In the walk two Disciplines take B against Decree. The line
breaks to a two-rune stun cast after the pump.

## 7. Not verified

I did not walk Irelia defending on their turn, the Not So Fast exchange, or `SFD-195 Blade Dancer` as
the legend. Under Blade Dancer she would be the Chosen Champion (103.2.a.2, 108.3.d), and the legend
has its own ready for one Power, which is a different entry. 2v2 was not walked.

## Leads

- Step 4 says to play Discipline *"When damage is about to be assigned (465.2.c)"*. There is no window
  there. Damage is dealt when the showdown closes (465.2), and it closes only when every player passes
  in sequence (347.2.a). Discipline is cast inside the showdown, and the opponent always gets Focus
  after it (347.1.b).
- Step 2 ties the free Awakening +1 to *"Every turn she acted the turn before"*. It also comes the turn
  after she lands, because she enters exhausted (143.4).
- The entry names no answer. `OGN-050 Rune Prison` (two runes) stuns her after Discipline resolves, and
  a stunned unit adds no damage (423.1.b). `VEN-015 Decree of Rage` (two runes, can't be countered) kills
  her at M4 on the opponent's turn if she landed without Discipline open.
- "Any legend with Calm" is legal, but outside `SFD-195 Blade Dancer` she has to be drawn: 50.8% by T4
  going first, with three copies in 39 cards and eight cards seen. Under Blade Dancer she starts the game
  in the Champion Zone (103.2.a.1).
