# Play — the Pouch draws until one spell kills both holders

Issue #301 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mushroom-pouch-smoke-and-mirrors-facedown-tenure`**, the mono-Mind ENGINE in which
`OGN-101 Mushroom Pouch` draws a card every Beginning Phase off `UNL-083 Smoke and Mirrors` left face
down at a battlefield you hold. The entry is right that the draw is free once it is set up and that the
facedown card lives exactly as long as the battlefield is yours. Walked as a game, the engine's real
cost is not the hide: it is the garrison. One holder dies to a one-rune spell outside any combat, two
holders die to a two-rune spell, and the hidden card is only saved, not lost, if a third unit of yours
stands somewhere else.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b1de50c`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 71 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 28 (a hit on *before*), first in the list. The other entry of this slice is rank 29,
played in [Draven passes first and Rebukes their answer](2026-10-07-draven-passes-first-and-rebukes-their-answer.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind in its pair (103.1.b); the entry lists sixteen names |
| **First** | a battlefield you control, taken by `SFD-065 Forecaster` (Mind, E2, M2) |
| **Then** | `OGN-101 Mushroom Pouch` (Mind gear, E2) and `UNL-083 Smoke and Mirrors` (Mind, E2) hidden for one rainbow |
| **Beside it** | a second unit at another location, `OGN-096 Watchful Sentry` (Mind, E2, M1) at base, and a second holder, `UNL-076 Petal Pixie` (Mind, E2, M2) |

The card text the play turns on:

- Mushroom Pouch: *"At the start of your Beginning Phase, if you control a facedown card at a
  battlefield, draw 1."*
- Smoke and Mirrors: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for
  :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Choose a unit you control and another
  unit you control at a different location. If at least one of them has [Temporary], move each to the
  other's location. Draw 1."*
- Forecaster (*"Your Mechs have [Vision]."*), Petal Pixie (*"I have +1 :rb_might: for each of your
  units with [Temporary] at my battlefield."*) and Watchful Sentry (*"[Deathknell] — Draw 1."*) are
  bodies; their text is idle here. They are chosen for having no text that changes the arithmetic below.

## 2. Your order: the battlefield first, then the hide

The hide needs a battlefield that is already yours. 811.1.b: *"While this card is in your hand or in
your Champion Zone on your turn during an Open State, you may pay [A] to hide this facedown at a
battlefield you control that doesn't already have a facedown card hidden there for as long as you
control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play this,
ignoring its base cost."* The zone says the same thing — 107.3.c: *"Cards can only be placed in or
occupy the Facedown Zone if the controller of the card also controls the associated Battlefield."* So
the order on T2 is forced: the Forecaster walks onto the empty battlefield first, the Showdown it opens
closes with nobody else there, and only then, back in an Open State, is there anywhere to hide.

The tenure is the same sentence read the other way. 107.3.d: *"If a player loses Control of a
Battlefield, any cards in the Facedown Zone associated with that Battlefield are removed during the
next Cleanup."* And outside a combat, Control is only as long as the garrison — 190.4.a: *"If a player
controls Units at a Battlefield, outside of Combat, they maintain Control of that Battlefield for as
long as they have Units at that Battlefield."* — and 190.4.c: *"If a player has no Units at a
Battlefield and the turn is in an Open state, they lose Control of that Battlefield in the following
cleanup unless there is a Combat or Showdown ongoing there."*

## 3. Their order: kill the garrison outside a combat

The entry's protection is 190.4.b: *"While a Combat or Showdown is ongoing at a Battlefield, Control of
that Battlefield cannot change until instructed by steps of the Combat or Showdown."* That protects the
card during an attack, and the attack is not the cheap answer. The cheap answer is a removal spell in
the opponent's own Main Phase, where 190.4.b does not apply, aimed at the units holding the battlefield.
When the last holder dies, 190.4.c strips Control at the next Cleanup and 107.3.d takes the facedown
card with it.

The card does not have to go for nothing. A facedown card has [Reaction] — 811.6: *"A card that is
Hidden gains Reaction while facedown or played from facedown, and may be played any time a card with
Reaction may be played as a result."* — so Smoke and Mirrors can be played for 0 in response to the
removal and still draws its card. But it has two targets, and 811.1.d bars it with nothing to choose:
*"Some choices made while playing a card from Hidden are restricted to the battlefield where it was
hidden. A card cannot be played from Hidden if it is a spell with no valid targets under these
restrictions."* 811.1.d.2.a is Riot's ruling on this exact card: *"If Smoke and Mirrors is played from
hidden, the first unit chosen can be chosen at the battlefield Smoke and Mirrors was played from, so it
must be. The second unit chosen explicitly restricts targeting in a way that makes this impossible, so
it can be chosen from any location."* So the response needs a unit of yours at the battlefield and
another one anywhere else. That is the Watchful Sentry's job at base. With only the holder on the board
the card cannot be played at all, and it is removed unplayed.

## 4. The turns, going first

Mono-Mind against Fury/Calm. The opponent takes the other battlefield, B, on their T2.

```
turn    runes   your turn                                                 points  draws, total
T1      2       Forecaster (E2) at base                                   0
T2      4       Forecaster walks to A, Conquer: +1. Mushroom Pouch        1
                (E2). Watchful Sentry (E2) at base. Hide Smoke and
                Mirrors at A for one rainbow: one of the four exhausted
                runes is recycled. 3 runes on the board.
T3      5       Hold A: +1. Pouch: draw 1. Second Pouch (E2). Petal       2       1
                Pixie (E2) played to A. 1 rune left.
their T3        Hextech Ray (E1 + 1 Fury Power) on the Forecaster. The
                Pixie still holds A; nothing else changes.
T4      7       Hold A: +1. Both Pouches: draw 2.                         3       3
```

The hide's rainbow comes from a rune, so it takes one off the board — 164.2.b.1: *"The Power added
this way corresponds to the Domain of the Rune that is being Recycled."* — and 161.2.b: *"When a Rune is
Recycled it is returned to the Rune Deck, not the Main Deck."* The rune is exhausted for the Pouch's
Energy first; the recycle asks nothing about readiness. That is why T3 has five runes and not six.

The Pixie is played straight to A, not walked there. 355.2.a: *"By default, Valid locations include the
controller’s Base or a Battlefield the controller controls."* A unit played there costs no Standard
Move, so the second holder arrives on the turn it is paid for.

Three Pouches draw three a turn off one facedown card, as the entry says. They do it only from the
first Beginning Phase after the hide, and only while A has a unit of yours on it.

## 5. Breaks to

**The line breaks to `SFD-023 Piercing Light`** (Fury, E2 + 1 Power, *"[Repeat] :rb_energy_2:
:rb_rune_fury: (You may pay the additional cost to repeat this spell's effect.) Deal 2 to a unit at a
battlefield, then deal 2 to up to one other unit."*), cast in the opponent's Main Phase on their T3
instead of Hextech Ray, aimed at the Forecaster and the Pixie. Both are Might 2, so both die. In
response you play Smoke and Mirrors from facedown for 0: the Forecaster at A and the Sentry at base,
neither with [Temporary], so nothing moves and you draw 1. Piercing Light resolves, A has no unit of
yours, 190.4.c takes Control at the next Cleanup, and the Pouches have no facedown card to read. It
costs the opponent two runes: two exhausted for the Energy, one of them recycled for the Fury Power.
You lose two holders, the battlefield's Hold, and every Pouch draw until you take a battlefield back
and hide a second card for a second rainbow.

**With one holder it is one rune.** `OGN-009 Hextech Ray` (Fury, E1 + 1 Power, *"[Action] (Play on
your turn or in showdowns.) Deal 3 to a unit at a battlefield."*) kills a lone Forecaster, and one rune
pays it: exhausted for the Energy, then recycled for the Power. That is why the play spends T3 on a
second holder instead of a third Pouch.

**An attack also works, and the entry already knows it.** If the opponent walks a bigger garrison onto
A and wins the combat, 466.5.c removes the card: *"Remove all Hidden cards from this Battlefield that do
not share a controller with the Battlefield."* 190.4.b makes the card playable inside that combat, so
the attack costs you the engine and not the card. The removal spell costs you both holders as well,
and it is cheaper.

## 6. Verdict

**Three cards by T4 for one rainbow, and it ends to a two-rune spell.** The ordering is forced twice:
the battlefield must be yours before anything can be hidden, and the hidden spell can only be rescued
in response to the removal if a unit of yours stands at a second location. The draws are real and the
engine is cheap. What protects it is the garrison at A, and that has to be defended like any Hold.

## 7. Not verified

I did not walk a holder with [Temporary], which would make Smoke and Mirrors move the two units when it
is played in response and could carry the holder out of the removal's battlefield. I did not walk
`UNL-014 Monster Harpoon`, the entry's suggested second payload, or a removal spell that chooses no
target, or 2v2.

## Leads

- The entry says the hidden card is *"playable inside"* any combat at that battlefield. 811.1.d makes
  that conditional: Smoke and Mirrors has two targets, the second at a different location (811.1.d.2.a),
  so with no unit of yours outside that battlefield it cannot be played from Hidden and is removed
  unplayed.
- The entry's only named failure mode is losing the battlefield. It does not price it. Outside a combat
  the holders are the tenure (190.4.a, 190.4.c): one holder falls to `OGN-009 Hextech Ray` for one rune,
  two Might-2 holders to `SFD-023 Piercing Light` for two.
- The entry's [Reaction] for the hidden card is sourced to 813.1.c.1. 811.6 is the paragraph that grants
  it: a Hidden card *"gains Reaction while facedown"*.
