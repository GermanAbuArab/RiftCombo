# Play — Draven passes first and Rebukes their answer

Issue #301 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `draven-rebuke-bloodless-combat`**, the Fury/Chaos ENGINE in which `SFD-148 Draven,
Audacious` attacks a battlefield held by one unit and `OGN-172 Rebuke`, cast inside the combat's
Showdown, returns that unit to its owner's hand, so Draven wins with no damage step: a point from his
own text, a Conquer, and a card from the legend. The entry is right about the window and the points.
Walked as a game, it casts Rebuke too early. Draven has Might 6, so he already beats any lone defender
with less than 6 Might, and the fight kills that defender where Rebuke only bounces it. The right order
is to pass Focus first and keep Rebuke for whatever the opponent does with theirs.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b1de50c`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 71 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 29 (a hit on *first*), second in the list. The other entry of this slice is rank 28,
played in [the Pouch draws until one spell kills both holders](2026-10-07-the-pouch-draws-until-one-spell-kills-both-holders.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos) |
| **First** | a battlefield of your own, taken by `OGN-171 Mystic Poro` (Chaos, E2, M2) |
| **Then** | `SFD-148 Draven, Audacious` (Chaos, E6 + 1 Power, M6) |
| **Held** | `OGN-172 Rebuke` (Chaos, E2 + 2 Power) and two runes, both Chaos, for it |

The card text the play turns on:

- Draven, Audacious: *"[Deflect] (Opponents must pay :rb_rune_rainbow: to choose me with a spell or
  ability.) The first time I win a combat each turn, you score 1 point. When I die in combat, choose an
  opponent. They score 1 point."*
- Rebuke: *"[Action] (Play on your turn or in showdowns.) Return a unit at a battlefield to its owner's
  hand."*
- Glorious Executioner: *"When you win a combat, draw 1. (You win if only your units remain after
  combat.)"*

## 2. Your order: pass, then Rebuke

The Showdown opens with you. 345: *"As a Showdown begins, the player who applied Contested status to
the Battlefield gains Focus."* With Focus you may play a card or pass, and passing is not free —
347.2.a: *"If all Players have passed once in sequence, the Showdown ends."* — so a pass is an offer to
fight as things stand. Against a lone defender with less than 6 Might that is the better offer. 465.2.c:
*"Starting with the Attacker, each player assigns an amount of damage equal to their summed Might among
the other's Units."* Draven's 6 kills the defender, the defender's damage does not kill Draven, and
466.3.a says you won: *"A Player has won a combat if they received either the attacker or defender
designation and are the only Player that has units remaining at this battlefield during this step."*
Same point, same Conquer, same card, and you keep Rebuke and the two Chaos runes it recycles. The defender goes to the trash
instead of back to the opponent's hand.

If they do not pass, Focus comes back. 347.1.b: *"When that Chain closes, Focus passes to the next
Player in Turn Order."* So whatever they play on their Focus resolves first and then you decide, which
is the only time Rebuke is worth its cost: when their play has made the defender lethal to Draven.
Rebuke has [Action] and not [Reaction], so it cannot answer their card on the chain; it answers it one
Focus later, which is enough, because nothing has been dealt yet. 465.1 is still waiting: *"If both
Attacking and Defending units remain at this battlefield, the following Tasks become Outstanding, in the
specified order"*, and with the defender in its owner's hand they do not.

The exception is a garrison already at 6 Might or more. Then a pass trades Draven, and his own text pays
the opponent for it, so Rebuke goes first.

## 3. Their order: Block from facedown

The opponent's defender is `SFD-038 Ribbon Dancer` (Calm, E3, M3), with `OGN-057 Block` hidden at
the same battlefield: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
:rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Give a unit [Shield 3] and [Tank] this
turn. (+3 :rb_might: while it's a defender. It must be assigned combat damage first.)"* Played from
facedown it costs 0 (811.1.b, *"ignoring its base cost"*), and the Dancer defends at M6. Six damage
kills Draven, so on their Focus Block turns a won fight into Draven's death and a point for them.

## 4. The turns, going first

Fury/Chaos against Calm/Fury. The opponent holds the other battlefield, B.

```
turn    runes   your turn                                                 points
T1      2       Mystic Poro (E2) at base                                  0
their T1        Ribbon Dancer (E3) at base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. 2 runes unspent.            1
their T2        Ribbon Dancer walks to B, Conquer. Block hidden at B
                for one rainbow.
T3      6       Hold A: +1. Draven (E6 + 1 Chaos Power) at base: six      2
                runes exhausted, one Chaos rune recycled. 5 runes on
                the board.
T4      7       Hold A: +1. Draven walks to B: Combat, your Focus.        3
                Pass. Their Focus: Block on the Dancer from facedown,
                for 0. Your Focus: Rebuke on the Dancer (E2 + 2 Chaos
                Power): two runes exhausted and both recycled. They
                pass, you pass. No damage step. Draven wins: +1,
                the legend draws 1. Conquer B: +1.                        5
                5 runes on the board.
```

The Power comes from runes, so it takes them off the board — 164.2.b.1: *"The Power added this way
corresponds to the Domain of the Rune that is being Recycled."* — and 161.2.b: *"When a Rune is
Recycled it is returned to the Rune Deck, not the Main Deck."* One rune pays both halves: it is
exhausted for the Energy and the recycle asks nothing about readiness. Rebuke is E2 + 2 Power, so the
two runes that pay its Energy are both recycled for its Power, and both have to be Chaos. That is why T4
ends with five runes, and why the play needs two Chaos runes still on the board after Draven's own.

The Conquer is 466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored
this Battlefield this turn."*

Without Block, the T4 line is shorter: they pass, the fight happens, the Dancer dies, Draven takes 3 and
lives, and Rebuke stays in your hand for T5.

## 5. Breaks to

**The line breaks to `SFD-053 Janna, Savior`** (Calm, E3 + 1 Power, M3, *"[Reaction] (Play any time,
even before spells and abilities resolve, including to a battlefield you control.) When you play me,
heal your units here, then move up to one enemy unit from here to its base."*), played at B on their
Focus or in response to Rebuke. She moves Draven to his base. Nothing of yours is left at B, so the
opponent is the only player with units there and wins the combat under 466.3.a; you get no point, no
card and no Conquer. Choosing Draven costs her a rainbow more — 809.1.c: *"Spells and abilities an
opponent controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to play as
an additional cost for each time they choose [me/this]."* — and Draven being the only enemy unit
there does not make the choice free (355.10.d.2). So Janna costs three runes, two of them recycled, and leaves a three-Might unit at B.
Rebuke cannot fix it, because the problem is no longer the defender. Passing first saves Rebuke here too:
if they spend Janna on their Focus you never cast it.

**`OGN-064 Wind Wall`** (Calm, E3 + 2 Power, *"[Reaction] (Play any time, even before spells and
abilities resolve.) Counter a spell."*) is the same three runes, cast in response to Rebuke after Block.
The Dancer then defends at M6, both units take lethal damage, and Draven's own text gives them a point.
`OGN-045 Defy` does not reach Rebuke: it counters a spell costing *"no more than :rb_rune_rainbow:"*,
and Rebuke costs two Power.

## 6. Verdict

**Two points and a card a turn, as the entry says, and Rebuke is the answer to their answer.** The
window inside the combat is real and the entry has the rules right. What it gets wrong is the order.
Cast first, Rebuke spends a card and two runes to bounce a defender Draven would have killed. Held, it
costs nothing until the opponent commits a card that makes the defender lethal, and then it undoes that
card as well. The line breaks to an answer aimed at Draven rather than at the defender: Janna for three
runes.

## 7. Not verified

I did not walk two defenders, where Rebuke clears one and Draven fights the other, or a defender with
[Deflect], which would make Rebuke cost three Power. I did not walk a stun on Draven from their Focus or
`VEN-106 Wind and Ghosts`, the entry's cheaper alternative. 2v2 was not walked.

## Leads

- The entry's steps cast Rebuke unconditionally. Against a lone defender under 6 Might, Draven wins the
  combat without it (465.2.c, 466.3.a), and the defender dies instead of returning to hand. The ordered
  line is to pass first (347.2.a) and cast Rebuke on the Focus that comes back (347.1.b) only if their
  play made the defender lethal.
- The entry prices the line at *"2 Energy + 2 Chaos Power"*. Read with 164.2.a/164.2.b that is two Chaos
  runes, both recycled: two runes leave the board each time it is cast.
- The entry names no answer. `SFD-053 Janna, Savior` (Calm, E3 + 1 Power + 1 rainbow for [Deflect])
  moves Draven out of the combat, and no order of yours prevents it.
