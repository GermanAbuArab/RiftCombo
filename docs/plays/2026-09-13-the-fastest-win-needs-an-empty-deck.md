# Play — the catalogue's fastest win: what an empty Main Deck actually costs

Issue #200, lane rc-synth2, 2026-09-13. Constructed, Duel (485) unless a Match (486) is named.
Rules version 2026-07-16. Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) first — every turn number below is measured
against it.

**Subject: `renata-mastermind-points`**, which `npm run adversarial -- --turns` reports at **T4
against a T6 baseline** — the fastest point-scoring finisher in the catalogue and the largest margin
in the table. It is an INFINITE that scores directly, standing on `SFD-088 Renata Glasc, Mastermind`,
the only card in the pool that converts resources into a point inside the Main Phase.

This play walks it turn by turn and finds that **T4 is not a floor, it is an artifact.** Two costs
the clock cannot see push it to **T7**, and the second of them is a precondition that the whole
INFINITE class shares and that no instrument in this project prices.

---

## 1. The clock funds fuel downward and never upward

`scripts/adversarial-check.mjs` folds the `needs`/`produces` DAG in one direction only. An entry that
produces **only fuel** gets its cheapest legal consumer added to its cost (the `[fuel only: + …]`
column). An entry that **consumes** fuel is priced over its own `uses[]` alone, and its declared
`needs[]` are never funded.

Measured over the 54 rows the clock covers: **8 rows produce points and declare unfunded needs** —
`renata-mastermind-points`, `renata-bubble-bot-ready`, `jayce-mesmerize-renata`,
`dragonstorm-brambleback-trinity-conquer`, `time-warp-hold-burst`, `swain-double-conquer`,
`bottled-constellation-time-warp`, `reveler-loop-nasus-brambleback-conquer`. Of the **9 rows that
beat their baseline**, three are in that set.

`src/combos.ts` `generateVariants` already computes the honest card set — it expands `needs`
transitively and caps the union of domains at two (103.1.b). For this entry it returns exactly one
variant:

> `renata-mastermind-points + lux-infinite-energy + lux-infinite-power` — mind/order, **9 cards, 11
> copies**: `SFD-088`×1 `OGN-104`×1 `SFD-180`×1 `SFD-166`×1 `OGN-212`×1 `OGN-110`×1 `UNL-165`×2
> `UNL-173`×2 `OGN-087`×1. Total **E27 + 1 Power**.

Running the clock's own exact allocator over that set gives **deploy T5, last unit T4**, so the
honest figure is **T5, not T4**. Same correction on its two siblings: `renata-bubble-bot-ready` T4 →
T5, `jayce-mesmerize-renata` T5 → T6, and `lux-infinite-power` T3 → T4.

That is a one-turn correction, and it is the small half of the problem.

## 2. The cost no instrument in this project prices: the deck has to be empty

`lux-infinite-energy` states it in its own first prerequisite:

> "Main Deck EMPTY — the deck draws itself out first; every card not in the loop must be in hand or
> trash."

It is not one entry's quirk. Searched over `prerequisites.notable` for the exact string *"the Main
Deck is empty by construction"*: **14 of 14 INFINITEs carry it, and no entry of any other class
does.**

**And ASSERTING it is not the same as NEEDING it — a first draft of this play conflated the two and
the corrected version is the better finding.** That sentence reaches all fourteen because it lives
inside the Tournament Rules 505 paragraph that was pasted uniformly onto the class in #191 batch 27.
Classified instead from each entry's own `steps` — does the **pass** put a card into the Main Deck
and draw it back? — the class splits:

- **Eight need it.** `lux-infinite-energy`, `lux-infinite-power`, `lady-luminosity-loop-comet`,
  `jhin-virtuoso-ekko-malzahar-vi` and `gemdragon-henge-vi-blind-fury` recycle and draw inside every
  pass; `renata-mastermind-points`, `renata-bubble-bot-ready` and `jayce-mesmerize-renata` declare
  `needs: ["infinite-energy","infinite-power"]` and inherit it from the Lux engines.
- **Six do not.** `jhin-fiora-facebreaker-recall`, `twilight-reveler-eye-facebreaker-recruits`,
  `garen-fiora-malzahar-facebreaker-recruits`, `threshold-reveler-infinite-energy`,
  `reveler-svellsongur-jhin-infinite-power` and the banned `pursuer-herald-recruits` are
  **combat-recall loops that spend zero cards a pass** — walk in, take the Attacker designation,
  get recalled by 466.1.a.2, repeat. Two of them do carry the word *draw* in their steps and both say
  *"first pass only"*; their own `netPerIteration` reads *"0 Energy, 0 Power and 0 cards spent"*. For
  those six the boilerplate's argument is not merely unnecessary, it is the wrong one: 416.5 never
  fires because **nothing is recycled**, and saying the deck is empty by construction claims a
  precondition they do not have.

So of the **9 rows that beat their baseline**, **five carry the unpriced empty-deck cost**
(`lux-infinite-power`, `renata-mastermind-points`, `renata-bubble-bot-ready`, `lux-infinite-energy`,
`jayce-mesmerize-renata`), one is a CHAIN (`yasuo-windrider-ride-the-wind-chain`), and **three are
honest**: `jhin-fiora-facebreaker-recall` and `twilight-reveler-eye-facebreaker-recruits` at T5, with
`garen-fiora-malzahar-facebreaker-recruits` tying at T6.

**Those three are also the inverse of the line this play walks.** They are combat loops: 807.1.d needs
the Attacker designation and 323.9 stages no Combat without an enemy garrison, so they are **dead on
an empty board and alive on a contested one** — which is the shape the `--stalled` pass calls a
credential, and the shape the Renata line does not have. The catalogue's genuinely fast INFINITEs are
the ones that cost no cards and want the board a stall produces.

### The empty deck is a ONE-MAIN-PHASE state, and it destroys itself

Three paragraphs, none of which any entry cites:

> **315.4.b.1.** "If there are no cards remaining in their Main Deck to draw, the Turn Player has
> been Burned Out."
>
> **431.2.b.** "Recycles their trash into their Main Deck." · **431.2.c.** "Chooses an opponent to
> gain 1 point."
>
> **315.4.b.2.** "After completing the Burn Out the Turn Player still Draws 1."

So an empty Main Deck cannot be carried across a turn boundary. Your next Draw Phase Burns you Out
automatically: the opponent gains a point, **your whole trash goes back into your deck** — randomized
by 431.2.b's own reminder — and the loop's premise is gone. The Draw Phase (315.4) sits before the
Main Phase (316), so **you must empty the deck and win in the same Main Phase.**

The consequence for the ledger is exact rather than approximate: the kill turn must **open its
Beginning Phase with more than zero cards and open its Main Phase with zero.** With the mill below
that means **exactly 4 cards at the start of the kill turn** — Burn 3 in the Beginning Phase, the
Draw Phase takes the last one.

### Mind/Order has no mill of its own

Swept over `data/corpus_flat.txt` for `[Burn N]`: **eight printings, and seven are Fury or Chaos**
(`VEN-002`, `VEN-022`, `VEN-095`, `VEN-108`, `VEN-113`, `VEN-114`, `VEN-144`). The eighth is
colourless and is the only one a Mind/Order deck can run:

> **`VEN-165 Shadow Temple`** — Battlefield, Colorless — *"When you hold here, [Burn 3]. (Put the
> top 3 cards of your Main Deck into your trash.)"*

And the pool's one Skip-your-Draw-Phase card, `VEN-022 Endless Riches`, is **Fury** — so there is no
legal way for this deck to dodge 315.4.b.1 either.

Which makes the plan's engine and its fuse the same card. 315.2.b.2 *"The Turn Player Holds all
Battlefields they Control"* is mandatory and Shadow Temple's clause carries no "may", so once you
control it **you burn three a turn whether you want to or not** — and by 431.1.b a mandatory Burn 3
with fewer than three cards left is itself a Burn Out. The landing has one legal value.

---

## 3. The deck, and why 21 of its cards exist only to be thrown away

**Chosen Champion: `SFD-088 Renata Glasc, Mastermind`.** She is a unit and is not a Signature card
(`signature: false` in `cards.json`; 103.2.d.3 bars Signature cards from the Champion Zone), so
103.2.a.1 puts her in the Champion Zone at the start of the game and 108.3.d lets her be played from
there. **She never has to be drawn, and the Main Deck is 39.**

**Battlefield: `VEN-165 Shadow Temple`.** In a Duel, 485.5 *"randomly selects"* one of your three, so
it is one in three. In a **Match**, 486.5 says only *"Each player selects one (1) of their three"* —
**no randomness in game 1** — and then removes it for the rest of the match if you won with it.

Main Deck 39, of which the plan below uses **18**:

| | |
|---|---|
| Loop | `OGN-212 Forge of the Future` ×1 (E2) · `OGN-110 Ekko, Recurrent` ×1 (E5+1 Mind, M5) · `UNL-165 Shadow's Call` ×2 (E2) · `UNL-173 Sacrifice` ×2 (E1) |
| Power conversion | `OGN-104 Retreat` ×1 (E1) · `OGN-087 Lecturing Yordle` ×1 (E3) |
| Payoff | `SFD-180 Fiora, Worthy` ×1 (E3) · `SFD-166 Rally the Troops` ×1 (E2) |
| Body | `OGN-096 Watchful Sentry` ×1 (E2, M1) |
| Draw used by the walk | `VEN-049 Dredge Up` ×1 · `OGN-095 Stupefy` ×2 · `UNL-083 Smoke and Mirrors` ×1 · `OGN-083 Consult the Past` ×2 · `UNL-061 Downstage Dramatics` ×1 |
| **The other 21** | anything. They exist to leave the deck. |

Domain identity: every card is mono-Mind or mono-Order, Shadow Temple is colourless, so the union is
`{mind, order}` and 103.1.b admits any of the four Mind/Order legend names — `OGN-265 Herald of the
Arcane`, `OGS-021 Lady of Luminosity - Starter`, `SFD-201 Chem-Baroness`, `UNL-199 Deceiver`.

## 4. The mana, so the table is checkable

A rune pays 1 Energy (164.2.a, cost = its exhaust) **and** recycles for 1 Power of its domain
(164.2.b, cost = the recycle, no exhaust), but a recycled rune leaves the board for the Rune Deck
(161.2.b) and comes back at 2 a turn (315.3.b), capped at 12 (161.2.a). Going first — 485.7 gives the
extra rune to the player going second, so this is the slower seat.

**The loop needs 11–12 runes on the board and that is a hard floor.** Per pass it spends 10 Energy
and 1 Mind Power (Ekko 5, Shadow's Call 2, Sacrifice 1, Forge 2) and Ekko's Deathknell readies the
runes once, so the steady income is `R − 1` Energy per pass against a spend of 10: **R = 11 breaks
even, R = 12 nets +1.** Since R = 2T minus every Power ever spent, **12 runes is turn 6 at the
earliest and every pre-emptive Power spend pushes it later** — which is why the walk below buys no
Power-costed draw at all and skips `OGN-114 Progress Day` (E6 + 1 Power) and `SFD-087 Premonition`
(E2 + 3 Power) entirely.

---

## 5. The turns

`D` = cards left in the Main Deck. 39 − 4 opening (rule 116, *"Players each draw 4"*) = **35**.

| turn | R | Beginning | Main Phase | D | pts |
|---|---:|---|---|---:|---:|
| **T1** | 2 | — | `OGN-096 Watchful Sentry` (E2). Enters exhausted (143.4). | 34 | 0 |
| **T2** | 4 | — | Standard-Move the Sentry to Shadow Temple (144.4.a, exhaust 144.2). 190.1 left it uncontrolled, 344.2 opens a Showdown at the next Cleanup, 348.2.a takes Control, 348.2.a.1 is a **Conquer**. Then `VEN-049 Dredge Up` E2 (draw 1) and `OGN-095 Stupefy` E1 (draw 1). | 31 | 1 |
| **T3** | 6 | Hold → **[Burn 3]** | `SFD-180 Fiora, Worthy` E3 · `UNL-083 Smoke and Mirrors` E2 (draw 1) · `OGN-095 Stupefy` E1 (draw 1) | 25 | 2 |
| **T4** | 8 | Hold → Burn 3 | **the seeding turn**, below | 16 | 3 |
| **T5** | 10 | Hold → Burn 3 | `OGN-083 Consult the Past` E4 (draw 2) · `UNL-061 Downstage Dramatics` E2 + **[Repeat]** E2 (draw 2). 2 Energy idle. | 8 | 4 |
| **T6** | 12 | Hold → Burn 3 | **nothing.** Twelve Energy deliberately unspent: any draw here overshoots the landing and any Power spend costs a rune the loop needs. | 4 | 5 |
| **T7** | 12 | Hold → Burn 3 (D 4→1) | Draw Phase takes the last card. **Main Phase opens at D = 0, R = 12, 6 points.** | 0 | 6 |

### T4, the seeding turn, in full

The turn that pays for itself, because Ekko's Deathknell readies the runes mid-turn:

1. Tap all 8 runes → 8 Energy. Recycle one already-exhausted Mind rune → 1 Mind Power (164.2.b costs
   the recycle, not an exhaust). Board: 7.
2. `OGN-110 Ekko, Recurrent` — E5 + 1 Mind Power. 3 Energy floating.
3. `UNL-165 Shadow's Call` E2 on Ekko: *"Choose a friendly unit without [Temporary]. Give it
   [Temporary]. Draw 2."* 1 Energy floating.
4. `UNL-173 Sacrifice` E1 — its additional cost kills a friendly **[Mighty]** unit, and Ekko is
   printed Might 5.
5. Ekko's Deathknell resolves first (340.1, newest finalized item): *"Recycle me to ready your
   runes."* Ekko goes to the bottom of the Main Deck and **all 7 runes are ready again**.
6. Sacrifice resolves: draw 2, channel 1 rune exhausted → board 8.
7. Tap the 7 ready runes → 7 more Energy: `OGN-212 Forge of the Future` E2 (its play trigger makes a
   1 Might Recruit at your base) and `OGN-083 Consult the Past` E4 (draw 2).

**Net runes: zero.** One recycled for Ekko's Power, one channelled back by Sacrifice. That is the
whole reason the 12-rune mark still lands on turn 6. And the turn leaves exactly what the loop needs
in the trash: one Shadow's Call and one Sacrifice.

### Card accounting, which closes exactly

25 cards drawn (4 opening + 7 Draw Phases + 2 + 2 + 6 + 4), 15 burned by five Holds, one Ekko
recycled back in: **25 + 15 = 40 = 39 + 1.** The deck reaches zero with nothing left over, which is
the only way to arrive at an empty Main Deck without 431.1.a doing it for you.

### T7, the kill

R = 12, D = 0, 6 points on the board, 2 needed. Hand: Ekko, Shadow's Call #2, Sacrifice #2, Retreat,
Rally the Troops, Lecturing Yordle. Board: the Sentry at Shadow Temple, Fiora, the Forge.

1. **Kill the Forge** (free): *"Recycle up to 4 cards from trashes"* — take Forge, Shadow's Call #1,
   Sacrifice #1 (416.6 gives the choice to the recycling player). D: 0 → 3.
2. Run the pass of §4. D: 3 → 1 (Shadow's Call draws 2) → 2 (Ekko's Deathknell recycles him) → 0
   (Sacrifice draws 2). Hand is identical, board is identical, +1 Energy. **Unbounded.**
3. Convert Energy to Power with `lux-infinite-power` — Forge, Retreat and Lecturing Yordle, at 9
   Energy per Power.
4. `SFD-166 Rally the Troops` E2: *"When a friendly unit is played this turn, buff it."*
5. Play **Renata from the Champion Zone** (E5) to Shadow Temple — 355.2.a: *"Valid locations include
   the controller's Base or a Battlefield the controller controls."* Rally buffs her from Might 4 to
   5, which is 709's crossing, so `SFD-180 Fiora, Worthy` pays 1 Order Power to ready her. She
   entered exhausted (143.4) and her Score ability costs an exhaust, so without Fiora she could not
   fire at all (414.1.b with 203.3).
6. `E4 + 4 Mind Power`, exhaust: **score 1 point** (7).
7. `OGN-104 Retreat` E1 returns her to hand; replay her E5. 705 stripped the buff when she left play
   and 124 makes her a new object, so Rally buffs her again, she crosses 5 again, Fiora readies her
   again. **Score (8). Win on turn 7.**

---

## 6. Breaks to

- **`OGN-133 Flurry of Blades` — Body, E1, [Reaction], *"Deal 1 to all units at battlefields."*** The
  Sentry is Might 1. Killing it strips Control of Shadow Temple at the next Cleanup (323.6), which
  takes **the mill, the Hold points and the place Renata has to stand**, all for one Energy. The
  entry declares `zone: BASE` on nothing here, so this is the catalogue's known hole arriving in the
  one place where it costs three things at once. Garrison with a Might-2 body instead and it costs
  one more Energy on turn 1.
- **Anything that contests Shadow Temple.** Not removal — just a body. 344.2 needs *"there aren't
  units controlled by different players there"*, so an opposing garrison turns the Conquer into a
  Combat, and a lost Combat costs the same three things.
- **The burns are not yours to choose.** Fifteen cards go to the trash off the top of the deck, and
  any of the eighteen plan cards can be among them. The Forge's first activation retrieves four of
  them, and beyond that the answer is 103.2.b's three copies of the cheap pieces. **This walk is a
  best case and assumes no plan card is buried.**
- **One turn of disruption is fatal in a way it is not for other lines.** Miss the T7 landing and the
  next Draw Phase Burns you Out: opponent +1 point, trash shuffled back into the deck, and the setup
  starts again from a deck that is no longer 39 cards of your choosing.

---

## 7. The verdict, and it has three cases rather than one

| board | what happens |
|---|---|
| **Both battlefields yours** | You never needed the loop. The free Hold curve is 2 points a turn and reaches 8 on **turn 6** in this identity — the baseline. The eighteen plan cards are dead weight. |
| **One battlefield each** — the ordinary game | The free curve pays you 1 a turn and gets to 8 around **turn 9**; the loop gets there on **turn 7**. **This is the only board where the line pays, and it pays by two turns.** |
| **Contested — they take or deny Shadow Temple** | Dead. No Hold points, no mill, and 355.2.a leaves Renata nowhere legal to stand. |

**The line's mill, its points and its payoff's legality are all the same requirement — control of one
battlefield — and so is the free Hold curve's.** A finisher earns its slot where the Hold curve has
stalled, and this one stalls on exactly the same condition. That is why the honest answer to "is it
viable" is *yes, in the middle case*, and why T4 was never the right number to compare against T6.

---

## 8. What writing this found in the catalogue's own instruments

### The BOARD-INDEPENDENT bucket is half wrong, and the label overclaims

`npm run adversarial -- --stalled` classifies every finisher by what the board must look like. Its
last bucket, `INDEPENDENT`, holds **8** rows under this label:

> "BOARD-INDEPENDENT. No Hold, no Conquer and no attack in the printed text, so nothing about the
> board switches it off."

It is the **else** branch: three regexes over card text and the entry's own steps for *hold*,
*conquer* and *attack*, and anything matching none of them lands here. **There is no predicate for a
location gate, and `prerequisites` is never read at all.** So:

- **Four of the eight** stand on `SFD-088 Renata Glasc, Mastermind`, whose own printed text ends
  *"Use my abilities only while I'm at a battlefield"* — `renata-mastermind-points`,
  `renata-bubble-bot-ready`, `jayce-mesmerize-renata`, `jhin-virtuoso-ekko-malzahar-vi`. With 355.2.a
  that is a requirement to **control a battlefield**, which is precisely what a stall removes.
- **Two more** are `UNL-088 Gutter Palace`: *"if you have exactly 4 cards in hand and exactly **4
  units at battlefields**, you win the game."* Not a control requirement, but not board-independent
  either.
- **One** (`lux-infinite-power`) scores no points at all; it is fuel.

**That leaves exactly one finisher in the catalogue that both scores and needs nothing whatever from
the board: `bottled-constellation-time-warp`** — `VEN-067 Bottled Constellation`, *"At the start of
your Main Phase, you may kill 3 other friendly units and/or gear to score 1 point"*, which works from
your base. The same script prices it at **T13 against a T6 baseline, the slowest row in the table.**

This is the precedence lesson this project already recorded for the Conquer-before-Hold ordering,
arriving in a new place: **it is the residual bucket that inherits everything the patterns cannot
see, and its label is the one that should be written most cautiously.** `renata-mastermind-points`
says *"You control a battlefield to play Renata to"* in its own `prerequisites.easy`; the classifier
reads `uses[]` and `steps` and never looks.

Two of the seven entries using `SFD-088` say nothing about the battlefield anywhere —
`renata-bubble-bot-ready` and `jayce-mesmerize-renata` — and both are in that bucket.

### The project ruled on this clause two months ago and never applied it to Renata's own lines

R30 (voted 2026-09-06, issue #11) turns on exactly this sentence: Heimerdinger copying Renata's
`exhaust: Score 1 point` copies *"Use my abilities only while I'm at a battlefield"* with it, so
**Heimerdinger** must stand at a battlefield. The reading was settled for the copier and never read
back onto the original — the diagnosed-but-unapplied shape, in a new place.

### The Tournament Rules 505 notable is right on eight entries and wrong on six

Every INFINITE carries the same pasted paragraph, and its load-bearing clause is *"The condition is
checkable and this entry meets it: the Main Deck is empty by construction, so every card recycled in
a pass is drawn back inside that same pass."* On the eight loops that recycle, that is exactly right
and is one of the better things in the catalogue — it is the *"zero spare draws"* invariant doing a
second job, licensing the shortcut under TR 505.9.

On the six combat-recall loops it is an argument for a condition they do not have. The true reason
those six may be shortcut is shorter and stronger: **they recycle nothing, so 416.5 never fires at
all.** Uniform boilerplate is how a correct sentence ends up on an entry it was not measured against,
and the tell here is that the entries' own `netPerIteration` fields contradict it in their own words
— *"0 Energy, 0 Power and 0 cards spent"*.

### Three suggested changes, none made here

`data/combos.json` is single-owner and this lane does not hold it, and
`scripts/adversarial-check.mjs` is the clock's own file. Both are for the manager:

1. **`--stalled` needs a fifth signal.** Swept over `data/corpus_flat.txt` with the predicate
   `/while I'?m at a battlefield|if I'?m at a battlefield/i`, **17 printings** carry a self-location
   gate. Narrowed to the ones that state it as an outright restriction on their own abilities —
   predicate `/use (this ability|my abilities) only while/i`, minus `UNL-049 Honeyfruit`, whose gate
   is an XP threshold and not a location — the answer is **four**: `OGN-068 Caitlyn, Patrolling`,
   `SFD-088 Renata Glasc, Mastermind`, `UNL-026 Xerath, Freed`, `UNL-160 Ultrasoft Poro`. A `GATED`
   bucket reading that phrase would move four rows out of INDEPENDENT and is a two-line change.
2. **The clock should fold `needs` upward.** `generateVariants` already builds the correct card set
   and caps the domains; using it for the 8 rows that declare unfunded needs is a strictly better
   number than the one printed today. It does not reach the empty-deck cost, which is not a mana cost
   at all and would need a draw model — but the citation belongs in the prose of the eight that
   really carry it, which costs nothing: **they assert an empty Main Deck and not one of them cites
   315.4.b.1, the paragraph that makes the state last one Main Phase.**
3. **The TR 505 notable should say the right thing on the six that do not recycle** — one sentence,
   not the pasted one. A uniform paragraph is worth auditing wherever it reaches a whole class.
