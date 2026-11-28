# Hand walks — the payoff lens (issue #63), and the feature vocabulary (issue #64, data half)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 3 authored `verified`, 1 measured and NOT authored (dominated), 4 existing entries
rewritten, 0 refuted.** No `class` and no `quantity` of an existing entry changed. The four rewrites:
`gemdragon-henge-vi-blind-fury` (its `terminatesIn` now names the two exits), `tryndamere-brambleback-conquer`
(the financing, recorded not duplicated) and the two Sprite Fountain engines (`produces` corrected to
`temporary-body-engine`, §V).

The lens asked, for each of the catalogue's INFINITE engines, what converts its surplus into points.
Its answer was that the richest engine of the catalogue — `gemdragon-henge-vi-blind-fury`, the
Dragonstorm, +10 Energy a pass with a 1:1 uncapped Energy→Power converter — had a `terminatesIn`
that named no card that scores. This walk closes that, and then unifies the `needs`/`produces`
vocabulary that #63 §3.1 measured as split.

---

## Step 2 done first and in bulk: every citation opened

The 2026-09-04 citation audit found three entries citing a rule that said the opposite of the claim.
So before walking anything, every rule number the four candidates lean on was pulled out of
`data/Riftbound-Core-Rules-2026-07-16.txt` and read. **All of them say what the candidate says they
say**, with two refinements recorded below (§0.1, §0.2).

| rule | verbatim (abridged where marked …) | used by |
|---|---|---|
| **103.2** | *"A Main Deck of at least 40 cards…"* | C1 precondition |
| **103.2.b** | *"Your Main Deck can include up to 3 copies of the same named card."* | C1, C2 quantities |
| **103.4.c** | *"Cannot include more than one of a Battlefield of the same name when there are more than one required for the deck."* | C3, C4 |
| **143.4** | *"Units enter the Board exhausted."* | C1, C3, C4 |
| **143.4.a** | *"This can be altered by Accelerate or similar game effects."* | Confront, Industrialist |
| **144.2** | *"Exhausting the Unit is the Cost for this action."* | C1, C3, C4 — the move is free of Energy |
| **144.3** | *"Players may perform multiple Units' standard move simultaneously. This is treated as one game action performed on multiple Units."* | C3, C4 |
| **144.3.a** | *"…the units' Destination must be the same."* | C3, C4 |
| **144.3.b** | *"…the Origins do not need to be the same."* | C3 |
| **144.3.c** | *"The Costs of Exhausting the Units are also paid Simultaneously."* | C3, C4 |
| **144.4.a** | *"Units may move from their Base to a Battlefield."* | C1, C3, C4 |
| **163.2.b** | *"Some Power is Universal and can be used to pay for costs of any Domain."* | C1 — the Henge's rainbow pays Body equips and Fury costs |
| **167** | *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."* | C1 — Energy floats across the whole combo turn, not across turns |
| **170.11.c** | *"Battlefields can be 'open.' This means they are unoccupied and uncontrolled."* | C1 (see §0.1) |
| **190.1** | *"Control is established over Battlefields through the course of play."* | C1, C3, C4 |
| **190.3.a** | *"Contested is a temporary status applied to the battlefield when a Unit controlled by a Player who does not currently Control that Battlefield Moves or otherwise becomes present there."* | C1, C3, C4 |
| **190.6.d** | *"'You' in a battlefield's abilities refers to the battlefield's Controller… If the battlefield has no Controller, 'you' refers to no one, and all such instructions are ignored."* | C3, C4 — the Plaza is off until you take it |
| **194.2** | *"A player wins the game if, in a cleanup, they have points greater than or equal to the Victory Score and more points than any other player."* | C1 |
| **194.3** | *"The Victory Score is 8 points by default."* | C1, C2 |
| **195** | *"A player also wins the game if an effect instructs them to do so…"* | C3, C4 |
| **315.1.b** | *"The Turn Player readies all Game Objects they control that are able to be readied."* | C3 — the resident board is ready every Awaken |
| **315.2.b.2** | *"The Turn Player Holds all Battlefields they Control."* | C3, C4 |
| **344.2** | *"If Control of a Battlefield is Contested, there aren't units controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened during the next Cleanup."* | C1, C3, C4 |
| **348.2.a** | *"If only one player's Units remain at the Battlefield, and if that player does not already Control the Battlefield, that player establishes Control over the Battlefield."* | C1, C3, C4 |
| **348.2.a.1** | *"This results in a Conquer if that player has not yet scored that Battlefield this turn."* | C1, C3, C4 |
| **355.2.a** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* | C4 — tokens are born at the base |
| **383.2.a.1** | *"Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled."* | C3, C4 — the Plaza's "7+ units here" is measured at the Hold |
| **383.4.c.2.a** | *"The Conquer Abilities of Units are put on the Chain as Pending Items after the Unit(s) these effects correspond to are present at a Battlefield when a player gains control of it and gains 1 Victory Point from Conquering."* | C1, C2 |
| **431.1.a** | *"If a player must Draw cards in excess to the number of cards in their Main Deck…"* | C1 — the Mighty counter |
| **465.2.c.4** *(via R28)* | assignment capped at lethal | C2 only |
| **466.5** | *"…the player with Units remaining here Establishes Control if they didn't already control this Battlefield."* | C1, C2 |
| **466.5.d** | *"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn."* | C1, C2 |
| **469.1** | *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."* | C1, C2 |
| **470** | *"A player may only Score, from either method, once per Battlefield per turn."* | C1, C2 (R2 = A keeps ability points out of it) |
| **471.1.a.1** | *"Notably, points Gained from sources that are not Conquer are not beholden to these restrictions."* | C1, C2 |
| **471.1.b** | *"When a player tries to Gain a Point through a Conquer, and their current Point Total is 1 point from the Victory Score… or higher"* | C1 — at 0 points it does not bite |
| **485.4** | *"Battlefield Count: 2"* | C1, C3, C4 |
| **485.4.a** | *"Each player provides three (3) Battlefields… Only 1 will be used, chosen during setup."* | C3, C4 |
| **485.5 / 487.5 / 486.5** | *"randomly selects"* / *"randomly selects"* / *"selects"* | C3, C4 |
| **818.1** | *"Equip is an Activated Ability keyword."* | C1 |
| **818.1.c.2** | *"Equip is functionally short for '[Cost]: Attach this gear to a unit you control.'"* | C1 — no exhaust in the cost, so gear equips the turn it lands |
| **818.4** | *"Multiple instances of Equip are equivalent to multiple Activated Abilities and can each be activated separately…"* | C1 — three Trinity Forces are three activations |

**Ban check, same pass.** All 17 distinct cards across the four candidates and the engine were
grepped for the `[BANNED …]` marker in `data/corpus_flat.txt`: `UNL-029 SFD-115 SFD-030 OGN-034
OGN-129 OGN-293 SFD-171 SFD-117 UNL-104 OGN-140 OGN-001 OGN-131 OGN-038 OGN-036 UNL-020 SFD-005
SFD-106`. **None is banned or restricted in any format.**

### §0.1 — a rule nobody in this project had cited: 170.11.c defines "open"

**170.11.c** — *"Battlefields can be 'open.' This means they are unoccupied and uncontrolled."*

R31 was retired on 2026-09-06 with the finding that Riot's Yone errata rewrote *"an open
battlefield"* as *"a battlefield that was uncontrolled"*, and CLAUDE.md records that as **open = no
Controller, not "no units"**. 170.11.c is a *stricter* definition than that summary: it wants
**both** unoccupied **and** uncontrolled. This walk does not need to resolve the two — none of the
four candidates reads a card that prints the word "open" — but the rules file does define the term,
which the retirement note implies it does not. **Flagged for the manager, not filed as a reading.**

### §0.2 — the Showdown route makes C1 cheaper than the issue costed it

Issue #63's C1 says the target *"tiene que ser uno que no controlás (466.5), con guarnición que
puedas ganar"*. The garrison is not required. Moving your units onto an **uncontrolled** battlefield
makes it Contested (190.3.a); 344.2 opens a **Showdown** at the next Cleanup because no units of
different players are there; 348.2.a establishes Control at its close and **348.2.a.1** says outright
*"This results in a Conquer."* No damage step, no risk to the M4 bodies. This is the same route R20's
retirement recorded. C1 therefore prefers an open battlefield and treats an enemy garrison as the
fallback, not the requirement.

---

# C1 — `dragonstorm-brambleback-trinity-conquer` · **BURST** · body/fury · **AUTHORED, verified**

**The Dragonstorm's first win condition, and the cheapest point in the catalogue: 3 Energy.**

## Card text, verbatim from `data/corpus_flat.txt`

- `UNL-029` **Red Brambleback** — `Unit | Fury | E4 P1 M4 | [Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to have me enter ready.) Your conquer effects for conquering here trigger an additional time. When I conquer, [Buff] a friendly unit. (Give it a +1 :rb_might: buff if it doesn't have one.) [Tags: Ionia]`
- `SFD-115` **Trinity Force** — `Gear | Body | E4 M+2 | [Equip] :rb_rune_body: (:rb_rune_body:: Attach this to a unit you control.) [Effect] When I hold, score 1 point. [Tags: Equipment]`
- `SFD-030` **Skyfall of Areion** — `Gear | Fury | E3 M+2 | [Equip] :rb_energy_1::rb_rune_fury: (…) [Effect] My hold effects are also conquer effects, and vice versa. [Tags: Equipment]`
- `SFD-117` **Ancient Henge** — `Gear | Body | E2 P1 | :rb_exhaust:: [Reaction] — Pay any amount of Energy to [Add] that much :rb_rune_rainbow:. (Abilities that add resources can't be reacted to.)`
- `OGN-129` **Confront** — `Spell | Body | E2 | [Action] (Play on your turn or in showdowns.) Units you play this turn enter ready. Draw 1.`

## The arithmetic, with the quantities the entry declares

| item | Energy | Power |
|---|---|---|
| 2 × Red Brambleback (E4 P1) | 8 | 2 (Fury) |
| 3 × Trinity Force (E4) + 3 × `[Equip] :rb_rune_body:` | 12 | 3 (Body) |
| 1 × Skyfall of Areion (E3) + `[Equip] :rb_energy_1::rb_rune_fury:` | 4 | 1 (Fury) |
| **package** | **24** | **6** |

163.2.b makes the Henge's rainbow Universal, so one Henge activation buys all six Power for 6 Energy.
**Total 30 Energy.**

**Points.** The Conquer itself is 1 (469.1 / 471.1). Skyfall makes each Trinity Force's *"When I
hold"* a conquer effect too, so three conquer effects sit on the carrier; each Red Brambleback makes
*"your conquer effects for conquering here"* trigger an additional time, and R1 = A **with stacking**
means two Bramblebacks give each effect 1 + 2 = 3 executions. `1 + T × (1 + K)` with T = 3, K = 2 is
**1 + 9 = 10**, in one scoring event. The nine ability points are Gains by ability (194.1.c, R2 = A),
so 470's once-per-battlefield cap does not touch them and 471.1.a.1 exempts them from the Final Point
restriction; at 0 points 471.1.b does not bite either. **10 ≥ 8, so 194.2 ends the game in that
cleanup. 30 Energy / 10 points = 3 Energy per point**, against 51 for the Renata route.

## How many passes — the number #63 estimated at three is **two**

Reading the engine's own ledger: a pass takes in +30 Energy from six Dragon plays, pays 9 Energy in
spells and converts 11 Energy into the 11 Power the *next* pass spends, netting **+10**. On the pass
you exit, you do not prime, so that pass nets **+21**, and the freshly replayed Henge (entry step 9,
*"It enters ready (143.4)"*) still has its one uncapped activation.

Banked at the exit of pass N = `10(N − 1) + 21 = 10N + 11`. The burst wants 30. `10N + 11 ≥ 30` →
**N = 2**. Three passes is the comfortable number and what the entry states as the safe figure; two
is the floor, and it is written down so nobody re-derives it as three.

## The two things that refute it, and why they do not

**1. The Mighty counter (the real one).** The engine's ledger is exact: when Show of Strength
resolves the Main Deck holds exactly 8 cards, so the number of `[Mighty]` units must be exactly 8 or
the mandatory draw Burns Out (431.1.a) and hands the opponent a point (194.1.d). The carrier
Brambleback with three Trinity Forces and the Skyfall is 4 + 6 + 2 = **12 Might**, i.e. Mighty, and a
ninth Mighty body breaks the equality.

**It is satisfied by ordering, not by luck.** The gear goes on **after the last Show of Strength of
the last pass**, when no further mandatory draw exists. Two degrees of freedom fall out of the same
arithmetic and are worth writing: a *bare* Red Brambleback is **M4**, and 709 makes Mighty a
threshold at 5, so the two Bramblebacks may sit on the board through the whole loop without
disturbing the count — only the **gear** has to wait. Pre-deploying them drops the post-loop bill
from 30 Energy to 20 (16 Energy of gear + 4 Power), i.e. **one pass**.

**2. The six burst cards have to be in hand before the loop reaches régime.** If any of them is still
in the Main Deck, the deck is not 8 at Show of Strength and the ledger breaks in the other direction.
This is a setup precondition, not a break — the setup already drains the deck through Kadregrin's
*"draw 1 for each of your Mighty units"* — but it is stated in the entry, and it makes the deck 6
cards larger than the engine alone needs.

**3. The move.** Confront is cast every pass, and *"Units you play this turn enter ready"* is a
turn-long continuous effect (143.4.a: *"This can be altered by Accelerate or similar game effects"*),
so Bramblebacks played after the last pass enter **ready** and can pay 144.2's exhaust the same turn.
If the last pass's Confront was somehow spent differently, `[Accelerate]` on the Brambleback itself is
the fallback at `:rb_energy_1::rb_rune_fury:` each. 144.3 moves both as one action.

**4. Equipping the turn the gear lands.** 818.1 makes Equip an Activated Ability, 818.1.c.2 spells its
cost out as *"[Cost]: Attach this gear to a unit you control"* — **no exhaust** — and 818.4 makes the
three Trinity Forces three separate activations. Gear enters ready (143.4 exhausts Units only). So
the whole package deploys in one Main Phase.

**5. The battlefield.** §0.2: an **open** battlefield is enough, and is strictly better than a
garrisoned one. In a Duel there are exactly 2 battlefields (485.4), one provided by each player, and
both start uncontrolled (190.1); the Dragonstorm sits at its base for its whole setup, so its own
provided battlefield is normally still uncontrolled when the combo turn arrives. If the opponent
holds both, the garrisoned route is the fallback — and then the M4 second Brambleback is a body that
can die before 383.4.c.2.a checks that both are *present*.

**Verdict: HOLDS.** Authored as a new entry rather than as a `needs` on the existing
`brambleback-trinity-skyfall-conquer`, and the reason is mechanical: `generateVariants` drops the
standalone partial for any combo that declares a `needs` (src/combos.ts, the `for (const need of
combo.needs)` loop replaces `partials`), so adding `needs` to the existing row would delete the
legitimate deck that assembles those six cards over several turns without any infinite engine. The
new row carries what is genuinely new — the price, the pass count and the ordering constraint.

---

# C2 — the Tryndamere package on the same engine · **MEASURED, NOT AUTHORED**

`OGN-034` **Tryndamere, Barbarian** — `Unit | Fury | E7 P2 M8 | When I conquer after an attack, if
you assigned 5 or more excess damage to enemy units, you score 1 point.`

| item | Energy | Power |
|---|---|---|
| 2 × Tryndamere (E7 P2) | 14 | 4 |
| 3 × Red Brambleback (E4 P1) | 12 | 3 |
| **package** | **26** | **7** |

**33 Energy** through the Henge, for `1 + T × (1 + K)` = `1 + 2 × 4` = **9** points. 3.67 Energy per
point. The arithmetic checks out and matches #63.

**It is not authored, and the reason is domination on every axis**, not a refutation:
33 Energy against 30, 9 points against 10, five bodies against two plus three gear, and — decisively —
Tryndamere's clause is *"when I conquer **after an attack**"*, which needs the Attacker designation
that exists only inside a Combat with a garrison (383.4.e), so C2 **cannot** use the open-battlefield
Showdown route C1 prefers; it must win a damage step with M4 Bramblebacks in it. It also stands on
**R28**, a ruled reading, where C1 stands on none. The catalogue already carries
`tryndamere-brambleback-conquer` standalone with these same quantities, so nothing is lost: its
`notes` gained one sentence recording that the Dragonstorm can pay for it at 33 Energy and that C1
dominates it. **Recorded, not duplicated.**

---

# C3 — `dragonstorm-confront-grand-plaza` · **ALT_WIN** · body/fury · **AUTHORED, verified**

**The zero-Energy exit, and the one that needs no enemy battlefield.**

`OGN-293` **The Grand Plaza** — `Battlefield | Colorless | - | When you hold here, if you have 7+
units here, you win the game.`

## The board is already wide before the loop runs

The engine's setup board is three Gemdragons, two Heralds, two Kadregrin and Vi = **8 units**, and
315.1.b readies *"all Game Objects they control that are able to be readied"* every Awaken. Eight is
already 7+. **The loop is not a requirement for the count** — that is the honest statement, and it is
in the entry. What the loop adds is the six 5-Might Dragons standing on the board at the end of every
pass, which Confront (*"Units you play this turn enter ready"*, 143.4.a) makes ready the turn they are
played: **14 bodies**, which is the version that survives removal.

## The move costs nothing

144.2: *"Exhausting the Unit is the Cost for this action."* 144.3: multiple units' standard moves are
*"one game action performed on multiple Units"*, with the same Destination (144.3.a), origins free
(144.3.b) and the exhausts paid simultaneously (144.3.c); 144.4.a allows base → battlefield.
**Zero Energy, zero cards.**

## Taking the Plaza, and only then reading its text

Your own provided battlefield starts **uncontrolled** (190.1), and 190.6.d's second sentence blanks
its *"you"* while it has no Controller. Walking the bodies in makes it Contested (190.3.a); 344.2
opens a Showdown at the next Cleanup; 348.2.a gives Control and 348.2.a.1 makes it a Conquer (+1
point). From the next Beginning Phase the Plaza is yours: 315.2.b.2 Holds every battlefield you
Control, and *"if you have 7+ units here"* sits immediately after the When clause, so 383.2.a.1 makes
it part of the Trigger Condition, measured at the instant of the Hold — the count **includes the
bodies that conquered it**, and no body can be added at that instant. 195 then wins the game.

## What refutes it

- **The bodies must survive the opponent's whole turn.** Same exposure every Plaza entry carries, and
  the reason C1 is the titular route: C1 wins inside the combo turn. C3's mitigation is size — eight
  Mighty and near-Mighty bodies (M8 ×3, M9 ×2, M5 ×6) are a board no removal suite in the pool clears
  to under seven.
- **The Plaza is 1 of 3, at random.** 485.4.a — each player provides three battlefields and only one
  is used — and 485.5 (Duel) and 487.5 (Skirmish) say *"randomly selects"*, while 486.5 (Match) says
  only *"selects"*. 103.4.c and Tournament Rules 402.1 forbid bringing three copies to force it.
- **323.6** strips Control the moment your last body leaves, so the garrison cannot be recalled to
  keep looping and hold the Plaza at once.
- **Moving the resident board to the Plaza does not switch the engine off**: every resident ability
  (Gemdragon's rune-ready, the Heralds' Dragon discount, Kadregrin's play trigger, Vi's recycle) is
  location-free, and newly played Dragons still arrive at the base. It costs the engine nothing to
  stand somewhere else — it costs it exposure.

**Verdict: HOLDS.** `needs: ["infinite-energy","infinite-power"]` is a proxy for "the Dragonstorm's
board", and it is a precise one: C3's own cards are Body + Colorless, so of the seven producers of
`infinite-energy` only `gemdragon-henge-vi-blind-fury` (body/fury) stays inside a two-domain identity
— every other producer is order/mind, fury/order, fury/mind or fury/calm and would make three domains
with Body. The entry says in its own notables that the loop is not needed for the seven.

---

# C4 — `ready-recruits-grand-plaza` · **ALT_WIN** · order · **AUTHORED, verified**

**One row that gives seven orphaned producers a way to win.**

`SFD-171` **Renata Glasc, Industrialist** — `Unit | Order | E4 P1 M4 | Your tokens enter ready. [Tags:
Renata Glasc, Zaun]` — a **unit**, not a legend.

The chain: tokens are born at the base (355.2.a: *"By default, Valid locations include the
controller's Base or a Battlefield the controller controls"*); 143.4 would make them enter exhausted
and 415.1 makes readying an action on something already on the board, so an exhausted token can never
pay 144.2's exhaust cost; **R25 = A** (ruled 2026-09-04) makes Industrialist's *"Your tokens enter
ready"* beat a printed "enters exhausted", and 143.4.a admits the alteration. Ready tokens at the base
then walk to the Plaza as **one free action** (144.2 / 144.3 / 144.4.a), and the Plaza is taken and
held exactly as in C3.

This is what `grand-plaza-loop-time-warp` already does **for Lux only**, buying the missing turn with
`OGN-122 Time Warp` (Mind, E10 P4). C4 is the version that pays with a surviving turn instead of with
10 Energy and 4 Power, which is the only version available in fury/order or chaos/order and in an
engine with no Energy to spare.

**What refutes it:** the bodies must survive the opponent's turn, and **Recruits are 1 Might**, so
overshoot the seven — that is the whole mitigation, and it is why the feeder has to be unbounded or
at least repeatable across turns. The Plaza is 1 of 3 at random. And a feeder whose own loop marks a
body `[Temporary]` must not mark the parked ones: 816.1.b kills them at the start of the Beginning
Phase **before** scoring, which is exactly when the Plaza counts — `grand-plaza-loop-time-warp`
records the same trap for Shadow's Call.

**Verdict: HOLDS.** `needs: ["token-body-engine"]` after the merge of §V below, which is what
connects the seven `infinite-recruits` producers. All seven are Order-inclusive, and Industrialist is
mono-Order with a Colorless battlefield, so every one of them stays inside two domains; the
`token-body-engine` producers outside Order (calm/body, chaos/mind) are dropped by
`generateVariants`' own domain filter, which is correct and is not something to work around.

---

# §V — the feature vocabulary (issue #64, data half)

#63 §3.1 measured the defect: `infinite-recruits` had **7 producers and 0 consumers** while
`token-body-engine` had its own producers and the one consumer — two names for one thing, with the
unbounded side orphaned. Reading `data/features.json` end to end found three more pairs of the same
shape and one entry used by nobody.

**The rule applied: merge two names only when they denote the same PRODUCT and the producers' own
`terminatesIn` agree. Keep two names when a consumer could tell them apart.** A feature with no
consumer is *not* a defect when the feature **is** the payoff — points, wins and removal are outputs
of the graph, not inputs to it.

| the thing produced | old names (producers) | one name |
|---|---|---|
| Unbounded Energy in one turn | `infinite-energy` (7) | **`infinite-energy`** — unchanged, 13 consumers |
| Unbounded Power in one turn | `infinite-power` (5) | **`infinite-power`** — unchanged, 9 consumers |
| Repeatable or unbounded token **unit** bodies that **stay on the board** | `infinite-recruits` (7) · `infinite-ready-recruits` (1) · `token-body-engine` (10, minus the two below) | **`token-body-engine`** |
| Token bodies carrying `[Temporary]`, which 816.1.b kills before the Scoring Step | *(was inside `token-body-engine`)* | **`temporary-body-engine`** — new |
| Bounded Energy or Power inside a turn | `resource-engine` (35) · `gold-engine` (15) · `attach-engine` (3) | **`resource-engine`** |
| Extra cards in hand, repeatably | `hold-card-engine` (9) · `infinite-draw` (2) | **`card-advantage-engine`** |
| Pressure on the opponent's Main Deck | `force-opponent-deck` (1) · `opponent-burn-engine` (1) | **`opponent-deck-pressure`** |
| *(nothing — 0 producers, 0 consumers)* | `infinite-ready` | **deleted** |

**Kept separate on purpose**, with the reason:

| kept | why it is not the same thing as its neighbour |
|---|---|
| `ability-points` vs `burst-points` vs `win-the-game` | points per turn / ≥ 8 in one scoring event / a card that says you win (195). Three different answers to "does this end the game, and when" |
| `repeatable-removal` vs `opponent-deck-pressure` | kills bodies on the board vs attacks the Main Deck |
| `strip-opponent-hand` vs `opponent-deck-pressure` | the hand is not the deck, and Burn Out (431.2) recycles the trash before it awards a point |
| `infinite-recycle` | recursion of your own cards, not resources and not bodies. One producer, and it is genuinely its own thing |
| `conquer-engine` | repeatable Conquers. Its two producers ride different riders (a draw-and-ready, a relocation), so its description was broadened rather than the name split |

**The one thing the merge could NOT do, and why a fourteenth name was added.** Merging the two
token-body names put `sprite-fountain-malzahar-jayce` and `sprite-fountain-aspiring-engineer` in
front of C4 as feeders, and both are false there: `UNL-078 Sprite Fountain` plays *"a ready 3
`:rb_might:` Sprite unit token **with [Temporary]**"*, and **816.1.b** kills a `[Temporary]`
permanent *"at the start of this permanent's controller's Beginning Phase, before scoring"* — which
is exactly when the Plaza counts. Both entries' own `terminatesIn` already said so (*"they can
conquer the turn they are made **but cannot hold**"*, *"none of which ever survives to a Hold"*); the
graph did not. So the split is not a relapse into two names for one thing — a body that is there at
the Hold and a body that is not are **two things**, and the second is now
`temporary-body-engine`. Cost of the split: `azir-sovereign-token-gather` loses those two feeders,
which is an under-claim (a `[Temporary]` body can conquer) and is the safe direction; its own
`terminatesIn` names a Grand Plaza hold anyway.

**The thirteen feeders C4 ends up with were checked one at a time**, by grepping the token-maker's own
line out of `data/corpus_flat.txt` — because the class a player sees is the *composed variant's*, so
a feeder that cannot reach a Hold would publish a false ALT_WIN. `OGN-212` Forge of the Future,
`SFD-153` Eye of the Herald, `SFD-154` Guards!, `SFD-168` Vanguard Armory, `OGN-265` Herald of the
Arcane, `OGN-246` Viktor Leader, `SFD-021` Ferrous Forerunner and `OGN-218` Vanguard Captain each
play a plain unit token that stays. The one conditional feeder is
`leblanc-zilean-reflection-doubling`: `UNL-200 Mirror Image` gives its Reflection `[Temporary]`, and
only `UNL-090` LeBlanc, Everywhere at Once turns the kill off, **and only at her battlefield** (R10 =
A) — so with that feeder the Plaza has to be where LeBlanc stands. That condition is in C4's
notables.

**Two mislabels found and deliberately NOT fixed.** `wuju-master-blood-rose-level` (UNL-191 Wuju
Master *"[Level 11] Your units enter ready"* + UNL-109 Blood Rose *"Ready a unit"*) and
`tideturner-mega-mech-swap` (OGN-199 Tideturner + OGN-088 Mega-Mech, a printed unit card) **create no
token at all**; they carry `token-body-engine` because the old display name was *"Repeatable ready
bodies"* and both are ready/swap engines. Neither reaches any consumer today — calm/body and
chaos/mind are three domains against Order — so nothing false is published. They are recorded here
rather than re-pointed, because re-pointing them means deciding what they *do* produce, and neither
entry has been walked by this session.

**Why `gold-engine` had to go and not merely be renamed:** 9 of its 15 producers already carried
**both** `gold-engine` and `resource-engine`, and 6 did not — the file was already inconsistent about
whether Gold counts as a resource. It does: 187.5 makes a Gold token gear whose ability adds Power.

**Why `attach-engine` had to go:** `resource-engine`'s own description says *"Energy or Power returned
by moves, **readies** or reveals within a turn"*, and `attach-engine`'s said *"Attaching Equipment
produces rune value, capped per turn"*. Its three producers' `terminatesIn` price themselves in runes
and Energy (*"net 0 resources on a full three-attach turn"*, *"one extra rune a turn"*).

**What the merges change downstream, and why that is correct.** `generateVariants` filters by Domain
Identity while composing (rc-code64, #64 code half), and it does not read feature names. So a merge
adds compositions that were previously invisible **and kills others by domain, never by name** — e.g.
C4 reaches `rumble-forerunner-mech-recursion` (fury), `jayce-progress-vanguard-armory` (mind/order)
and `spectral-matron-vanguard-captain` (order) through `token-body-engine` — thirteen feeders where
the merge's own §3.1 orphans had none — but not `wuju-master-blood-rose-level` (calm/body) or
`tideturner-mega-mech-swap` (chaos/mind), because Order plus those is three domains. That is the
domain rule doing its job, and it is why the mislabels above publish nothing.

Measured after the change: **217 variants, 0 of them over two domains** (146 before this walk, over a
177-entry catalogue). `azir-sovereign-token-gather` went from 5 satisfiable feeders to 13, and
`heimerdinger-renata-remote-score` from 5 to 8.

Final vocabulary: **14 features**, comfortably under the ~20 ceiling `data/features.json` sets itself.
