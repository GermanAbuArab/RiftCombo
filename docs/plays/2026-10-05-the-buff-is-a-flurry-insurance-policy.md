# Play — the buff is a Flurry insurance policy, and a cheaper Mind body sells the same one

Issue #252 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `karma-lux-recycle-buff-army`**, the mono-Order ENGINE that parks
`OGN-235 Karma, Channeler` on the board before `lux-infinite-energy` starts, so every recycle to the
Main Deck buffs the newest Recruit the loop made. The entry's arithmetic is right: one buff lands
per pass, one pass late. Walked as a game, the +1 does one thing that matters — it takes the army
out of `OGN-133 Flurry of Blades`'s reach — and a Mind card already in the loop's identity does
that better.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `63b679a` reads 771 entries,
262 with forced-ordering language and **102 in the queue**. The pick is by global rank, skipping
entries that already have a play. This entry is rank 10 (two hits on *before*); rank 9 already has a
play. The other entry of this slice is rank 8, played in
[the Bow fires before the giant swings](2026-10-05-the-bow-fires-before-the-giant-swings.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Mind/Order legend — the loop's own identity |
| **The loop** | `lux-infinite-energy`: Forge of the Future, Ekko, Recurrent, Shadow's Call x2, Sacrifice x2 |
| **The payoff** | `OGN-235 Karma, Channeler` (Order, E6 + 1 Power, M6), on the board before the loop |
| **The alternative, walked here** | `UNL-077 Soul Shepherd` (Mind, E5, M3) — not in the entry |
| **Board it wants** | an empty Main Deck, twelve runes, and a battlefield you control to walk the army to |

The card text the play turns on:

- Karma, Channeler: *"[Vision] (When you play me, look at the top card of your Main Deck. You may
  recycle it.) When you recycle one or more cards to your Main Deck, buff a friendly unit. (If it
  doesn't have a buff, it gets a +1 :rb_might: buff. Runes aren't cards.)"*
- Forge of the Future: *"When you play this, play a 1 :rb_might: Recruit unit token at your base.
  Kill this: Recycle up to 4 cards from trashes."*
- Flurry of Blades: *"[Reaction] (Play any time, even before spells and abilities resolve.) Deal 1
  to all units at battlefields."*
- Soul Shepherd: *"Your token units have +1 :rb_might:."*

## 2. The rule, and why the ceiling is one buff a pass

Two recycles to the Main Deck per pass fire Karma twice (the Forge's, and Ekko's Deathknell), but
the pass makes one new body, and 702.3 caps the rest: *"There can only be one Buff on a Unit at a
time."* The Forge's Recruit is made at the end of the pass, after both triggers, so it is buffed by
the next pass's first trigger. N passes leave N Recruits, N - 1 of them at 2 Might, and one more
Forge activation buffs the last. The entry says all of this and it holds.

## 3. The turns, going first

The loop's own setup is the long part and is priced in
[the setup nobody prices](2026-09-13-the-setup-nobody-prices.md): an empty Main Deck and twelve
runes put the first pass no earlier than the turn the do-nothing curve already wins. Karma adds one
deployment to that setup and nothing to the loop.

```
turn      your Main Phase                                              the army
L - k     Karma, Channeler for E6 + 1 Power (any turn before the loop)  -
L         run N passes of lux-infinite-energy; one last Forge kill     N Recruits at base,
          cashes the trailing buff                                      all 2 Might, exhausted
  their turn: the army is at your base; Flurry hits only battlefields
L + 1     144.3 walks all N to a battlefield you control as one action  N bodies at 2 Might
  their turn: Flurry of Blades deals 1 to each — every one survives
L + 2     Hold
```

The Recruits enter exhausted (143.4: *"Units enter the Board exhausted."*), so the army cannot walk
the turn it is made; it waits at base, where nothing in the 1-damage family reaches it. The next turn
144.3 moves it as one action: *"Players may perform multiple Units' standard move simultaneously.
This is treated as one game action performed on multiple Units."* Then it has to stand at a
battlefield through the opponent's turn, which is the turn Flurry is for.

**That is the entry's whole value.** Without Karma the army is N bodies at Might 1 and one Energy
kills every one of them at once. With her the same spell does nothing. The +1 is not combat Might in
any useful sense — N is unbounded already — it is the difference between an army a one-Energy
Reaction erases and one it does not touch.

**Karma costs the loop nothing and costs the game a turn's mana.** She is E6 + 1 Power on a turn
the deck is still building towards twelve runes. And 1 Power on that turn is a rune that 161.2.b
sends to the Rune Deck, i.e. one Channel Phase further from twelve. Choose Ekko, never Karma, for
Sacrifice's cost: she is [Mighty] at 6 and a legal choice every pass.

## 4. The cheaper insurance

`UNL-077 Soul Shepherd` sells the same policy for less:

- **E5 and no Power**, so it does not set the rune count back.
- **A continuous modifier, not a buff.** *"Your token units have +1 :rb_might:"* reaches every
  Recruit the moment it is made, including the last one of the last pass, so there is no trailing
  Forge activation and no one-pass lag. 702.3 caps Buffs, not modifiers.
- **Might 3, not [Mighty]**, so Sacrifice can never take it by mistake.
- **Mind**, inside the loop's own Mind/Order identity (103.1.b).

The two stack — Karma's buff and the Shepherd's modifier make every Recruit 3 Might — but the
stack buys nothing against the next answer up, which deals 3.

## 5. Breaks to

**`OGS-002 Firestorm`** — Fury, E6 + 1 Power: *"Deal 3 to all enemy units at a battlefield."* The
army stands at one battlefield because the Hold needs it there, so one cast clears it. 143.2.a:
*"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed."*
3 damage kills a 2-Might Recruit and a 3-Might one alike, so neither Karma nor Karma plus the
Shepherd survives it. It is a Main-Phase spell, so it lands on their turn, after the walk and before
your Hold.

**Cheaper, in a fight: `OGN-127 Cannon Barrage`** — Body, E2 + 1 Power, [Reaction]: *"Deal 2 to all
enemy units in combat."* If the army attacks or is attacked, every 2-Might Recruit in that combat
dies to it. That is the case where Karma's buff and the Shepherd's modifier differ: at 3 Might the
Recruits survive Barrage.

**And the cheapest answer to Karma's part is to remove Karma first.** She is a Might 6 body at your
base; `OGN-229 Vengeance` (Order, E4 + 2 Power, *"Kill a unit."*) has no location clause. The loop
still runs, the army comes out at Might 1, and Flurry is back in range for E1.

## 6. Verdict

**The entry is right about its ceiling and silent about its purpose.** One buff a pass, one pass
late, an unbounded army of 2-Might Recruits at base. What that buys on a board is immunity to
`OGN-133 Flurry of Blades`, the one-Energy sweep that answers every 1-Might token line.

**It scores nothing; priced as a game it adds a turn's mana to a setup that already arrives after
the free curve.** It breaks to `OGS-002 Firestorm` for E6 + 1 Power at the battlefield, to
`OGN-127 Cannon Barrage` for E2 + 1 Power in combat, and `UNL-077 Soul Shepherd` buys the same
Flurry immunity for E5 with no lag.

## 7. Not verified

I assumed the loop already runs as `lux-infinite-energy` describes and did not re-walk it. I did not
walk removal that reaches your base on the turn the army waits there, nor which
battlefield the army walks to when one of the deck's three is Shadow Temple, nor 2v2.

## Leads

- The entry's `produces: combat-might` and its terminatesIn (*"an unbounded army of 2 Might
  Recruits"*) price the buff as Might. Against an army that is already unbounded the +1 is worth one
  thing: it puts every body out of `OGN-133 Flurry of Blades`'s 1 damage.
- `UNL-077 Soul Shepherd` (Mind, E5, M3, *"Your token units have +1 :rb_might:"*) is in the loop's
  identity, costs no Power, has no one-pass lag, and is not [Mighty]. No entry pairs it with
  `lux-infinite-energy`.
- Karma's 1 Power is a rune sent to the Rune Deck (161.2.b) on a turn the loop is still counting up
  to twelve runes; the entry's notable says she costs the loop nothing, which is true of the loop
  and not of its setup.
- Karma plus Soul Shepherd makes 3-Might Recruits, which survive `OGN-127 Cannon Barrage` and still
  die to `OGS-002 Firestorm` (143.2.a, damage equalling Might).
