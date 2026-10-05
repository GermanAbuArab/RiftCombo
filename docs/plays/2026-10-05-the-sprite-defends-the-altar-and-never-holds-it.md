# Play — the Sprite defends the Altar and never holds it, so the point comes from the body behind it

Issue #266 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `black-flame-altar-sprite-call-temporary-shield`**, the mono-Mind ENGINE that hides
`OGN-094 Sprite Call` and flips it inside the opponent's attack on `UNL-208 Black Flame Altar`, so a
3-Might [Temporary] Sprite defends there at 4. The entry is right that the grant and the lifespan fit:
the Sprite lives exactly through the opponent's turn, which is the only time [Shield] pays. Walked as a
game, two orders matter. Yours: the Sprite Call has to be hidden **at the Altar** and only **after** you
have conquered it. Theirs: the Sprite dies before your Hold, so whoever kills the body standing beside
it decides whether you score, and a one-Energy sweep makes you flip the Sprite **before** they attack.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `f4562b7`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 75 of them with no play** —
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 24 (hits on *before*), first in the list. The other entry of this slice is rank 25,
played in [six cards arrive only if both Karthus are still home](2026-10-05-six-cards-arrive-only-if-both-karthus-are-still-home.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind in its pair (103.1.b) |
| **Battlefield** | `UNL-208 Black Flame Altar` among your three, and selected for this game |
| **First** | the Altar conquered by a body that is not [Temporary] |
| **Then** | `OGN-094 Sprite Call` (Mind, E3) hidden at the Altar |

The card text the play turns on:

- Black Flame Altar: *"Units here with [Temporary] have [Shield]. (+1 :rb_might: while they're
  defenders.)"*
- Sprite Call: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.)
  [Action] (Play on your turn or in showdowns.) Play a ready 3 :rb_might: Sprite unit token with
  [Temporary]."*

The Altar comes to the table only one game in three: 485.5, *"Setup: Each player randomly selects one
(1) of their three (3) Battlefields."*

## 2. Your order: conquer the Altar, then hide at it

Hiding needs a battlefield you already control. 811.1.b: *"you may pay [A] to hide this facedown at a
battlefield you control that doesn't already have a facedown card hidden there for as long as you
control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play this,
ignoring its base cost."* So on T2 the body walks in first, the Showdown closes, and 348.2.a hands you
the Altar — *"If only one player’s Units remain at the Battlefield, and if that player does not already
Control the Battlefield, that player establishes Control over the Battlefield."* Only then can the card
go face down there.

And it has to go face down **there**, not at any battlefield you control, because a hidden spell's unit
lands where the spell was hidden. 811.1.d.3: *"If a hidden spell or a play effect of a hidden permanent
causes you to play a unit, you must choose to play that unit at that battlefield."* Hidden at the other
battlefield, the Sprite arrives where the Altar's text cannot reach it.

The hide costs one rainbow, which is a rune off the board — 164.2.b: *"Recycle this: [Reaction] — Add
[C]."* — and 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*

## 3. Their order: the Sprite never holds

The Sprite's whole life ends before your score. 816.1.b: *"It is functionally short for "At the start
of this permanent's controller's Beginning Phase, before scoring, kill this.""* So it can keep the
Altar out of their hands during their attack, and it can never be the body that holds it for you. If
it is the only unit of yours left there, 323.6 strips the Altar from you as soon as it dies: *"Players
lose control of any controlled Battlefields without their Units occupying them if the turn is in an Open
State and there is no Showdown or Combat ongoing there."*

The attacker chooses where their damage goes, so against a garrison of a 1-Might body and a 4-Might
Sprite they kill the body. The Sprite survives, nobody conquers, and at your Beginning Phase the Altar
is empty. The point is still yours if a ready body waits at the base: it walks in during your Main
Phase and conquers again, one point either way. That body is the real second card of this line.

## 4. The turns, going first

Mono-Mind. The opponent holds the other battlefield and wants the Altar.

```
turn    runes   your turn                                                 at the Altar
T1      2       Watchful Sentry (E2, M1) at base                          —
T2      4       Sentry walks in, Conquer: +1. Hide Sprite Call at the     Sentry, facedown
                Altar (one rune recycled). Second Watchful Sentry (E2)
                at base. 3 runes left on the board.
their T2        They attack the Altar. Inside the Showdown you play       Sentry, Sprite (4)
                Sprite Call from face down for 0. Defending Might: 1 + 4.
T3      5       Beginning: the Sprite dies before scoring. If the         Sentry 2
                Sentry lived, Hold: +1. If not, the Altar is empty and
                Sentry 2 walks in, Conquer: +1. Re-hide the second
                Sprite Call (one rune).
T4      6       same shape, one Sprite Call a turn                        —
```

The Sprite comes in after attackers are declared. 806.1.b: *"Action grants the corresponding card or
effect permission to be played or activated during Showdowns, even when it is not the Controlling
player's turn."* And it keeps its [Shield] for as long as it lives, because the Altar names no
duration — 801.3.a.3: *"If an effect that grants a Keyword does not specify a duration, the duration is
as long as that Game Object remains on the Board or in its current Non-Board Zone."* The Shield itself
pays only in combat — 814.1.c: *"It is functionally short for "While I am a defender, I have +X [M].""*

## 5. Breaks to

**The line breaks to `OGN-133 Flurry of Blades`** (Body, E1, *"[Reaction] (Play any time, even before
spells and abilities resolve.) Deal 1 to all units at battlefields."*), cast in their Main Phase
**before** they attack. It kills the 1-Might Sentry, and if nothing else of yours stands at the Altar,
323.6 takes the battlefield and the face-down card goes with it — 107.3.d: *"If a player loses Control
of a Battlefield, any cards in the Facedown Zone associated with that Battlefield are removed during the
next Cleanup."* Your answer is to flip the Sprite in response, since it has [Reaction] from face down:
it resolves first, takes the 1 and lives at 3, and you keep the Altar. But you have shown it before they
chose their attack, which was its whole value. One Energy buys that.

**The flip itself breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power, *"Counter a spell that costs no more
than :rb_energy_4: and no more than :rb_rune_rainbow:."*). Sprite Call fits, and the rune you spent to
hide it stays spent.

**A bigger attack simply pays.** Five Might clears a Sentry and a shielded Sprite. The Altar adds one
damage to the attacker's bill per [Temporary] body, nothing more.

## 6. Verdict

**The Altar makes a [Temporary] body a better defender and never a holder.** Played right — conquer,
then hide at the Altar, then flip inside their attack — the Sprite turns a contested Altar into a combat
the attacker must bring five Might to win. It cannot score: the point each turn comes from a
non-[Temporary] body standing there or walking in from the base, and a deck that runs this line out of
bodies has a Sprite that saves a battlefield it then hands back at its own Beginning Phase.

## 7. Not verified

I did not walk an opponent who also runs [Temporary] bodies (the Altar shields theirs too), a
two-domain shell, or 2v2. I did not price casting the hand copy in your own Main Phase as a visible
blocker; it is the same Sprite without the surprise.

## Leads

- The entry's second step hides Sprite Call *"at a battlefield you control"*. 811.1.d.3 puts the Sprite
  at the battlefield the card was hidden at, so it must be hidden at the Altar itself, and 811.1.b means
  the Altar must already be yours when you hide it.
- The entry's last step says the Sprite's death leaves *"the Altar free for the next"* Hold. If the
  Sprite is the only unit of yours there, 323.6 takes the Altar when it dies, before scoring; the line
  needs a non-[Temporary] body at or behind the Altar, and the entry names none.
- The entry names no answer. `OGN-133 Flurry of Blades` at one Energy kills a 1-Might holder and, with
  107.3.d, threatens the face-down card, forcing the flip before the attack.
