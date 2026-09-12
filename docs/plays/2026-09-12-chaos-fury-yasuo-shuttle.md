# Play — Chaos/Fury: the only point in the identity the opponent cannot deny

Issue #200, lane rc-synth, 2026-09-12. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules paragraphs pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) first — this play is measured against it.

**Built on** `yasuo-windrider-ride-the-wind-chain` (CHAIN), which is the same two non-legend cards
under a Calm/Chaos legend. `.scratch/have.mjs OGN-205 OGN-173` returns no entry on that pair alone,
so the Chaos/Fury version below is not catalogued; it is written here as a play rather than staged as
an entry because what is new about it is the TURN COUNT and the contested-board case, not the card
set.

---

## Why this play exists: three of Chaos/Fury's four point sources belong to the opponent

194.1 gives four ways to gain a point, and the pool prints fourteen cards whose text gains one.
Filtered by 103.1.b to what a Fury/Chaos legend may run, there are exactly four:

| card | domain | what it needs |
|---|---|---|
| `OGN-034 Tryndamere, Barbarian` | Fury | an enemy garrison to attack — 807.1.d, "Being an attacker means the Unit has gained the Attacker designation during Combat", and 323.9 stages no Combat without opposing units |
| `SFD-148 Draven, Audacious` | Chaos | a combat to win — 466.3.a, "…are the only Player that has units remaining at this battlefield during this step" |
| `SFD-214 Power Nexus` | colourless | 4 rainbow Power banked before the Hold trigger finalizes (383.3.b.1), which in this pool means `UNL-087 Blue Sentinel`'s Add — and that is **Mind** |
| `OGN-205 Yasuo, Windrider` | Chaos | **three moves. Nothing else.** |

The first two pay only if the opponent presents a board; the third is illegal in the identity. **The
Yasuo point is the only one in Chaos/Fury that an opponent cannot switch off by declining to play.**
That is the whole thesis of the play.

## The legend is where Chaos/Fury loses to Calm/Chaos, and it is worth stating plainly

The five Fury/Chaos legends, measured against `data/cards.json` (name, base codes, text from the
corpus):

- `OGN-251 / OGN-301 Loose Cannon` (Jinx) — "At start of your Beginning Phase, draw 1 if you have one or fewer cards in your hand."
- `OGS-017 Dark Child - Starter` (Annie) — "At the end of your turn, ready up to 2 runes."
- `SFD-185 / SFD-242 Glorious Executioner` (Draven) — "When you win a combat, draw 1."
- `UNL-185 / UNL-228 Bloodharbor Ripper` (Pyke) — "1 Energy, exhaust: Return a friendly unit at a battlefield to its owner's hand. Play a Gold gear token exhausted."
- `VEN-143 / VEN-191 Master of Shadows` (Zed) — "When you banish a card you own, empower me. [Action] Disempower me, exhaust: Discard 1, then draw 1."

**Not one of them moves a unit.** The catalogued Yasuo lines are Calm/Chaos because the Yasuo legend
is: `OGN-259 Unforgiven` reads "2 Energy, exhaust: Move a friendly unit to or from its base", which
is one of Yasuo's three moves, free, every turn. In Chaos/Fury you buy that move with a card instead
— `OGN-173 Ride the Wind`, Chaos, E2 + 1 Power, "[Action] (Play on your turn or in showdowns.) Move a
friendly unit and ready it." Note the Ripper's bounce is **to HAND, which is not a Move at all**
(455 defines a Recall as a relocation to the BASE; a return to hand is neither), so it gives Yasuo
nothing and costs you the body.

Legend chosen for the play: **`OGN-251 Loose Cannon`**, because the deck's real problem is finding six
specific cards and it is the only one of the five that refills. Any of the five is legal.

---

## The shuttle: three moves per Yasuo, one card each

Each Yasuo needs three moves in one turn (the card reads "The third time I move in a turn, you score
1 point" — a fourth move pays nothing). The route, with the Yasuos starting the turn **at your base**
and ending **at your battlefield**, so 323.6 never strips your Control:

```
move 1   Standard Move, base -> battlefield A            144.4.a, cost = its own exhaust (144.2)
move 2   Ride the Wind (E2 + 1 Chaos Power)              449 effect move, unrestricted by 144.4,
         "Move a friendly unit and ready it"             and the ready refunds the exhaust (415.1)
move 3   Standard Move, base -> battlefield A            144.4.a again
```

One `Ride the Wind` per Yasuo, because it moves ONE friendly unit. Three Yasuo = three castings =
**6 Energy + 3 Chaos Power for 3 points a turn**, repeatable for as long as the bodies live.

Two rules keep it legal: 190.3.a.1 applies Contested only when "that Unit's controller does not
already control that battlefield", so moving into a battlefield you already control stages no
Showdown (323.8) and no Combat (323.9) — which matters because 144.1.c forbids the Standard Move
"during a Showdown or Combat" and would otherwise strand moves 2 and 3. And the points are 194.1.c
Gains by ability, not 469 Scores, so 470's once-per-battlefield cap never sees them.

---

## Turn by turn, both columns

`R` = runes on the board. A rune pays 1 Energy (164.2.a, costs its exhaust) and can ALSO be recycled
for 1 Power of its Domain (164.2.b, whose cost is the recycle) — but the recycled rune leaves the
board for the Rune Deck (161.2.b) and returns at 2 a turn (315.3.b). Going first.

```
                                                   UNOPPOSED        CONTESTED (they take B on T4)
T1  R=2   Play an E2 Chaos body to base.               0                 0
T2  R=4   Move it to battlefield A -> Conquer.        +1 = 1            +1 = 1
          Play a second E2 body (2 Energy spare).
T3  R=6   Hold A (+1). Move body 2 to B -> Conquer    +2 = 3            +2 = 3
          (+1). Play Yasuo 1: E5 + 1 Chaos,
          recycle 1 Chaos rune.              R=5
T4  R=7   Hold A and B. Play Yasuo 2.        R=6      +2 = 5            +1 = 4   (B is theirs)
T5  R=8   Hold A. Play Yasuo 3.              R=7      +2 = 7            +1 = 5
T6  R=9   Hold A. Three Ride the Wind:                +2 = 9  -> WIN    +1 = 6
          6 Energy, recycle 3 Chaos.         R=6
          Three Yasuo x three moves.         +3       (never needed)    +3 = 9  -> WIN
```

**Unopposed the Yasuos never fire.** The Hold curve reaches 8 on turn 6 by itself — exactly the
baseline in the companion document — and the six cards of the package are dead weight. **Contested,
the Hold curve stalls at 1 point a turn and the Yasuo package is the difference between turn 6 and
never.** That is the finding, and it only becomes visible when the line is denominated in turns.

The Yasuos are ready on the turn after they are played (143.4 enters them exhausted, 315.1.b readies
them), which is why Yasuo 3, played on T5, first fires on T6. That single fact sets the whole clock:
**the package cannot come online before turn 6 no matter how the mana falls**, because 15 Energy and
3 Chaos Power cannot be paid before turn 5 on a curve that starts at 2.

---

## Breaks to

- **`OGN-133 Flurry of Blades` — Body, E1, "[Reaction] … Deal 1 to all units at battlefields."** It
  does not kill Yasuo (Might 4, and 143.2.a needs marked damage at or above Might), but it kills the
  two Energy-2 garrison bodies if they are Might 1, and losing the garrison at A costs the Hold AND
  the place the Yasuos shuttle to. Garrison with Might-2 bodies, of which the identity prints
  twenty-two.
- **Any removal aimed at a Yasuo.** At Might 4 with no protection each one is 1 point a turn, and
  `OGN-229 Vengeance` (Order, E4 + 2 Power, "Kill a unit.") reaches him with no location clause at
  all. There is no cheaper single answer in the play than there is in the deck.
- **Taking BOTH battlefields.** This is the real answer and it costs the opponent nothing extra,
  because it is what they were doing anyway. With no battlefield of your own and none uncontrolled,
  Yasuo's only legal Standard Move is into an enemy garrison, which applies Contested (190.3.a.1),
  stages a Combat at the next Cleanup (323.9) and then 144.1.c blocks every further move — he gets
  ONE move and is stuck in a combat. **The play needs one battlefield that is yours or uncontrolled,
  and the "Breaks to" line is simply: deny it.**
- **A counterspell on Ride the Wind**, which is 1 point for their 1 card. `OGN-173` is not among the
  two cards in the pool that print "can't be countered".

## Needs

- 3× `OGN-205 Yasuo, Windrider` (Chaos, E5 + 1 Chaos Power, M4) — 103.2.b caps by NAME at 3, and
  `SFD-235` is the same name, so the three copies may be drawn from either printing. Not Signature,
  not banned (`data/legality.json` has 21 rows, of which the only non-banned one is the 2v2
  restriction on `OGS-019`, and none names any card here).
- 3× `OGN-173 Ride the Wind` (Chaos, E2 + 1 Power, [Action]).
- 2–3 garrison bodies at Energy 2 and Might 2, to hold the battlefield the Yasuos shuttle to.
- A Fury/Chaos legend; `OGN-251 Loose Cannon` recommended, all five legal.
- No battlefield requirement. That is deliberate: 485.4.a lets a player provide three battlefields of
  which **only one is used and it is selected at random** (485.5), so a play that names a specific
  battlefield is not a play you can run on demand. This one names none.
- Domain Identity, computed from `data/cards.json` rather than from the names: Yasuo `['chaos']`,
  Ride the Wind `['chaos']`, garrison bodies mono-Chaos or mono-Fury. Union is a subset of
  {chaos, fury} under 103.1.b for any of the five legends.

## One step that is NOT verified, stated here rather than in a footnote

The contested column assumes the opponent takes battlefield B on turn 4 and then leaves your
battlefield A alone while you shuttle. **A real opponent contests A instead**, and the play has no
answer to that beyond the garrison bodies — I did not walk a defence of A, and the identity's
removal and protection suite is outside what this play measured. Read the contested column as an
upper bound on what the package is worth, not as a script.
