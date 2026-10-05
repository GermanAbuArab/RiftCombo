# Play — the tax is paid, the prohibition is walked around, and one Energy does both

Issue #262 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `petricite-monument-ruin-runner-tax-versus-prohibition`**, the mono-Body ENGINE that sets
`SFD-104 Petricite Monument` (every friendly unit gets [Deflect] for one round trip) beside `SFD-105
Ruin Runner` (*"I can't be chosen by enemy spells and abilities"*). The entry is right that one is a
tax and the other a prohibition, and right that a sweeper goes through both. Walked as a game, the
order is forced — the Monument has to be on the board before the opponent's spell is played, which
means your own Main Phase and nowhere else — and the cheapest card that ignores both protections is
the same one-Energy sweep that kills the bodies a Body curve opens with.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `1e5a8c3`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 79 of them with no play**. The
pick is by global rank, skipping entries that already have a play: this entry is rank 21 (a hit on
*before*), second in the list. The other entry of this slice is rank 20, played in
[Jae draws before anything fights](2026-10-05-jae-draws-before-anything-fights.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Body in its pair (103.1.b) |
| **First** | `SFD-105 Ruin Runner` (Body, E6, M5) standing at a battlefield you hold |
| **Then** | `SFD-104 Petricite Monument` (Body gear, E2), played in your Main Phase |
| **And** | the rest of the garrison: whatever the curve put there |

The card text the play turns on:

- Petricite Monument: *"[Temporary] (Kill this at the start of its controller's Beginning Phase,
  before scoring.) Friendly units have [Deflect]. (Opponents must pay :rb_rune_rainbow: to choose them
  with a spell or ability.)"*
- Ruin Runner: *"I can't be chosen by enemy spells and abilities."*

## 2. The order: the Monument before their spell

[Deflect] is charged when the opponent PLAYS a spell — 809.1.c: *"Spells and abilities an opponent
controls that target [me/this] cost an amount of Power equal to [Deflect Value] more to play as an
additional cost for each time they choose [me/this]."* A spell already on the chain has paid its costs,
so a Monument that arrives after it taxes nothing. And the Monument is a gear with no [Reaction], so it
cannot arrive in response anyway. It has one window: **your own Main Phase, before the turn you want
covered.**

Its [Temporary] then lines up exactly with what it is for — 816.1.b: *"At the start of this
permanent's controller's Beginning Phase, before scoring, kill this."* Played on your T4, it covers the
rest of your T4 and the whole of the opponent's T4, and dies at the start of your T5. It never sits
through a turn of yours that it was not bought for. Gear is live the moment it lands — 149.1: *"Gear
enter play Ready."* — but the Monument has no ability to use, so that only means it needs no setup.

Ruin Runner needs no window at all: 054.1 makes his prohibition beat every permission to choose him —
*"Cards that forbid actions or effects, as a broad method of determination, supersede cards that allow
or permit that same action or effect."* No amount of Power buys through it.

## 3. The turns, going first

Mono-Body. The opponent holds the other battlefield, B, and carries cheap removal.

```
turn   runes   your turn                                                  at A
T1     2       Determined Sentry x2 (E1 each) at base                     —
T2     4       A Sentry walks to A, Conquer. 4 Energy of bodies at base.  Sentry
T3     6       Hold A: +1. Bodies walk to A. Ruin Runner (E6) at base.    Sentry, bodies
T4     8       Hold A: +1. Runner walks to A. Petricite Monument (E2).    Sentry, bodies,
               6 Energy left for more bodies.                             Ruin Runner
their T4       Every single-target removal on the garrison costs one      (taxed)
               extra rainbow per choice. Runner cannot be chosen.
T5     10      Beginning Phase: the Monument dies, then Hold A: +1.        same
               Replay a second Monument (E2) to cover their T5.
```

Three copies are three round trips (103.2.b), E2 and a card each. Ruin Runner is permanent and costs
nothing more after T3.

## 4. Breaks to

**Both protections are answers to CHOOSING, and a sweep chooses nothing.** 355.10.d: *"It is
programmatically selected based on its characteristics rather than chosen by the spell or ability’s
controller."* — with the example *"“Kill all units at battlefields” doesn’t target anything."*

**The garrison breaks to `OGN-133 Flurry of Blades`** (Body, E1, *"[Reaction] (Play any time, even
before spells and abilities resolve.) Deal 1 to all units at battlefields."*). It pays no Deflect tax,
because it chooses no unit, and it kills every Might-1 body at A — both Determined Sentries the curve
opened with. One Energy, at [Reaction] speed, on either player's turn, and the Monument is no help at
all. Ruin Runner survives it at Might 5.

**Ruin Runner breaks to `OGN-268 Bullet Time`** (Body/Chaos, E1, *"[Action] (Play on your turn or in
showdowns.) Pay any amount of :rb_rune_rainbow: to deal that much damage to all enemy units at a
battlefield."*) at X = 5: E1 + 5 Power kills him and every other body at A of Might 5 or less, in one
card that targets the battlefield and not a unit. It is a Signature card tagged Miss Fortune, so only a
Bounty Hunter (`OGN-267`) deck can run it. Outside that deck, the answer is combat: an attack is not a
spell or an ability choosing him, and 465's damage step kills a 5-Might body that takes 5.

**The tax itself breaks to Power.** Against a single-target spell the Monument costs the opponent one
rainbow per body chosen, nothing more. `OGN-213 Hidden Blade` on a garrison body goes from E2 + 1 to
E2 + 2. A player with a rune to spare simply pays.

## 5. Verdict

**The contrast is real and the line is weak.** Ruin Runner is a 5-Might body no single-target spell
can touch, and the Monument makes the rest of the garrison cost one rainbow more per choice for exactly
one round trip, if you played it in your own Main Phase. Neither does anything against the cheapest
answer in the pool to a Body opening: `OGN-133 Flurry of Blades`, E1, which chooses nothing and kills
every Might-1 body at A. The points are the contested Hold curve; nothing here scores.

## 6. Not verified

I did not walk a two-domain shell, a Monument held for a turn where the opponent removes it first, or
2v2. That a Monument played after the opponent's spell is already on the chain taxes nothing is read
from 809.1.c's *"to play"* and from 809.1.d's *"Mandatory Additional Cost"*; I did not find a worked
example.

## Leads

- The entry says play the Monument *"On a turn when you expect targeted removal"* and *"in your Main
  Phase"*. The Main Phase is right; the turn is not. Targeted removal comes on the opponent's turn, so
  the Monument goes down on the turn before the one to cover — your own — because a gear with no
  [Reaction] cannot be played in response and a tax applies only to a spell being played.
- The entry's sweeper list (`OGN-022 Thermo Beam`, `OGN-127 Cannon Barrage`, `OGN-268 Bullet Time`,
  `VEN-090 Cataclysmic Duel`) misses the cheapest: `OGN-133 Flurry of Blades`, E1, which chooses
  nothing and kills every Might-1 body in the garrison. `OGN-022 Thermo Beam` there kills the
  Monument, not units.
- `OGN-268 Bullet Time` is a Signature card (Miss Fortune), so as an answer it exists only in a Bounty
  Hunter deck; the entry lists it with no legend.
