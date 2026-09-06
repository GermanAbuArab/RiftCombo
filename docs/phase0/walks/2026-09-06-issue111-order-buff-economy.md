# Issue #111 — the Order buff economy: one candidate walked, one refutation refuted

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
(`data/Riftbound-Core-Rules-2026-07-16.txt`) · **Corpus:** `data/corpus_flat.txt` (Riot gallery,
2026-09-04, errata applied)

Issue #111 swept the 49 `buff` lines of the pool and left exactly one candidate,
`sett-kingpin-karma-army-might-wall`, plus an amendment lead (Lee Sin, Centered) and a refutation
(Peak Guardian). All three were walked.

**Result: 1 new entry `verified` (ENGINE), 1 existing entry amended with a `notable` (no class and no
quantity changed), and #111's own refutation of Peak Guardian is itself REFUTED.** Every card line
below is grepped verbatim from `data/corpus_flat.txt`; every rule number was opened in the Core Rules
file and is quoted as it reads there.

Three things the walk changes against the issue:

1. **The two-turn walk is optional.** `SFD-171 Renata Glasc, Industrialist` ("Your tokens enter
   ready.") is mono-Order, so `103.1.b.3` admits it into the same Mind/Order shell, and a Recruit that
   enters ready can pay `144.2`'s exhaust cost the turn it is minted. The issue only walked the
   two-turn route.
2. **The army arrives in ONE action, not one at a time.** `144.3`: "Players may perform multiple
   Units' standard move simultaneously. This is treated as one game action performed on multiple
   Units." `144.3.a` requires one shared destination, which is exactly the shape here.
3. **`OGN-223 Peak Guardian` is not dead letter.** `355.2.a` already lists "a Battlefield the
   controller controls" as a default valid play location; `[Ambush]` is not what the card needed.

---

## 0. Ban check

`grep '\[BANNED' data/corpus_flat.txt` returns 12 marked rows. None of them is `OGN-240`, `OGN-235`,
`OGN-151`, `OGN-223`, `SFD-171`, `OGN-212`, `OGN-110`, `UNL-165` or `UNL-173`. The catalogue's ban
list is untouched by anything walked here, in constructed and in 2v2.

## 0.1 The rules block, opened first

| rule | what it says, verbatim |
|---|---|
| **103.1.b.1** | "Cards included in your deck must abide by your Domain Identity." |
| **103.1.b.2** | "Your deck's Domain Identity is dictated by the domains of your Champion Legend." |
| **103.1.b.3** | "If a card has a single Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain." |
| **103.1.b.4** | "If a card has more than one Domain, then that card is permitted only in a Domain Identity that contains all of the indicated Domains on that card." |
| **143.4** | "Units enter the Board exhausted." |
| **144.1.a** | The Standard Move "can be done any time during a player's Main Phase." |
| **144.2** | "Exhausting the Unit is the Cost for this action." |
| **144.3** | "Players may perform multiple Units' standard move simultaneously. This is treated as one game action performed on multiple Units." |
| **144.3.a** | "When a Move like this is declared by a player, the units' Destination must be the same." |
| **144.3.b** | "When a Move like this is declared by a player, the Origins do not need to be the same." |
| **144.3.c** | "The Costs of Exhausting the Units are also paid Simultaneously." |
| **144.4** | "The Destinations where Units can Move to with their Standard Move are restricted:" |
| **144.4.a** | "Units may move from their Base to a Battlefield." |
| **144.4.a.1** | "Units cannot Move to a Battlefield that already has units from **2 other players** present, or where a Combat is ongoing that has 2 other players as participants." |
| **185.2.b** | "Token units have a Might." |
| **185.2.d** | "Tokens have a type. They follow all rules for their type unless otherwise specified." Worked example: "A token unit **is a unit**. It enters exhausted, can take the standard move action, deals damage equal to its Might in combat…" |
| **190.1** | "Control is established over Battlefields through the course of play." |
| **194.1.a / .b / .c / .d** | The four ways to gain points: Holding, Conquering, an instruction to gain points, and an opponent's Burn Out. |
| **312.2.a** | A player receives Priority "When the turn is in a Neutral Open State during their Main Phase." |
| **355.2** | "For Units, choose a valid Location where that Unit will enter upon being Played." |
| **355.2.a** | "By default, Valid locations include the controller's Base **or a Battlefield the controller controls**." |
| **355.2.b** | "Some Game Effects may grant players permission to play Units to locations that are not normally Valid." |
| **415.3.a** | "A player Readies all non-spell Game Objects they Control during the Awakening Phase on their turn." |
| **420.3.a** | Of the Standard Move: "The Cost is Exhausting one or more Units." |
| **447.2.a** | "In Modes of Play with **more than two players**, Battlefields with Staged Combats or Combats in Progress are Invalid Destinations…" |
| **465.2.c** | "Starting with the Attacker, each player assigns an amount of damage equal to their **summed Might** among the other's Units." |
| **465.2.c.3** | "Units must have lethal damage assigned to them in full before damage is assigned to a different Unit." |
| **469.1 / 469.2** | The two ways to Score: Conquer ("A player gains Control of a Battlefield they did not yet Score this turn") and Hold ("A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase"). |
| **485.1 / 485.4 / 485.5** | 1v1 (Duel): "2 Players"; "Battlefield Count: 2"; "Each player **randomly selects** one (1) of their three (3) Battlefields." |
| **702.2.a** | "To Buff a Unit, a player chooses a Unit and then places a buff on it. That Unit is Buffed for as long as the buff remains on it." |
| **702.3** | "There can only be one Buff on a Unit at a time." |
| **702.3.a** | "If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead." |
| **703** | "Each Buff individually contributes +1 Might to a Unit." |
| **705** | "If a Unit leaves play, remove all Buffs from it." |
| **740.1.a** | "Two Game Objects are friendly if they share a controller, or if one's controller is teammates with the other's." |
| **805.1.a** | "[Accelerate] is functionally short for 'As you play me, you may pay [1][C] as an additional cost. If you do, I enter ready.'" |
| **815.1.b** | "[Tank] is functionally short for 'I must be assigned lethal damage before any other unit with the same controller as me that does not have [Tank] during the Combat Damage step.'" |
| **815.1.c.2** | "If more than one unit with Tank is present with the same controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments until all units with Tank have lethal damage assigned to them." |
| **822.1.b** | "[Ambush] is functionally short for 'I may be played to a battlefield where you control Units'…" |

## 0.2 Card text, verbatim

```
OGN-240 | Sett, Kingpin | Unit | Order | E4 P1 M5 | [Tank] (I must be assigned combat damage
first.) I get +1 :rb_might: for each buffed friendly unit at my battlefield. [Tags: Sett, Ionia]

OGN-235 | Karma, Channeler | Unit | Order | E6 P1 M6 | [Vision] (When you play me, look at the top
card of your Main Deck. You may recycle it.) When you recycle one or more cards to your Main Deck,
buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff. Runes aren't cards.)
[Tags: Vi, Ionia]

OGN-151 | Lee Sin, Centered | Unit | Body | E6 M6 | [Accelerate] (You may pay
:rb_energy_1::rb_rune_body: as an additional cost to have me enter ready.) Other buffed friendly
units at my battlefield have +2 :rb_might:. [Tags: Lee Sin, Ionia]

OGN-223 | Peak Guardian | Unit | Order | E6 P1 M5 | When you play me, buff me. Then, if I am at a
battlefield, buff all other friendly units there. (To buff a unit, give it a +1 :rb_might: buff if
it doesn't already have one.) [Tags: Mount Targon]

SFD-171 | Renata Glasc, Industrialist | Unit | Order | E4 P1 M4 | Your tokens enter ready.
[Tags: Renata Glasc, Zaun]

OGN-269 | The Boss | Legend | Body/Order | - | If a buffed unit you control would die, you may pay
:rb_rune_rainbow:, exhaust me, and spend its buff to heal it, exhaust it, and recall it instead.
(Send it to base. This isn't a move.) When you conquer, ready me. [Tags: Sett]
```

---

## 1. Point 1 of the brief — does `144.4.a.1` cap how many of your own units enter one battlefield?

**No, and in a Duel the clause cannot bind at all.** The whole restriction on a base → battlefield
Standard Move is `144.4.a` plus its single sub-clause:

> **144.4.a.** Units may move from their Base to a Battlefield.
>
> **144.4.a.1.** Units cannot Move to a Battlefield that already has units from 2 other players
> present, or where a Combat is ongoing that has 2 other players as participants.

Three readings the walk pins:

- **The count is of OTHER PLAYERS, not of units.** It never mentions the mover's own units. Nothing
  anywhere in `144.4` or in `447.2` (the cross-reference `144.4.a.1` itself points at) puts a ceiling
  on how many friendly bodies may be present at one battlefield.
- **In a Duel there is exactly one other player** (`485.1`: "2 Players"), so "units from 2 other
  players" is unsatisfiable and the clause is dead in the format the catalogue prices everything in.
  `447.2.a`, the invalid-destination rule the cross-reference leads to, says so in its own first
  words: "In Modes of Play with **more than two players**…". `447.2.b` is the teammate clause and is
  2v2-only.
- **The whole army moves in ONE action.** `144.3`: "Players may perform multiple Units' standard move
  simultaneously. This is treated as one game action performed on multiple Units." `144.3.a` requires
  a shared destination — Sett's battlefield — and `144.3.b` lets the origins differ. `144.3.c` /
  `420.3.a` charge the exhaust cost of all movers simultaneously. So #111's "one at a time" is
  correct in outcome but understates it: it is one Discretionary Action, not N.

## 2. Point 2 — Sett's own text, read word by word

> "I get +1 :rb_might: for each buffed friendly unit at my battlefield."

- **"buffed"** is the `702` counter and nothing else. `702.2.a` makes a unit "Buffed for as long as
  the buff remains on it". A continuous Might modifier — Lee Sin's "+2 Might", a `+N Might this turn`
  — is *not* a buff and does not feed this count. `702.3` caps every body at one buff, so the count is
  **the number of buffed bodies**, never a stack height.
- **"friendly"** is `740.1.a`: "Two Game Objects are friendly if they share a controller". In a Duel
  that is exactly your own units (`489.8.e` widens it to a teammate's in 2v2).
- **"unit"** includes tokens. `185.2.d`'s own worked example: "A token unit **is a unit**. It enters
  exhausted, can take the standard move action, deals damage equal to its Might in combat…" and
  `185.2.b` gives them a Might. So every Recruit the Forge mints counts.
- **"at my battlefield"** is a location test. `705` only strips a buff when a unit *leaves play*, so a
  buffed Recruit that walks from the base keeps its buff on arrival.
- **Does Sett count himself?** The card does not say "other" — and the pool shows Riot writes "other"
  when it means it: `OGN-151` says "**Other** buffed friendly units", `OGN-223` says "buff all
  **other** friendly units there", `OGN-139` says "When you play **another** unit". So a buffed Sett
  would plausibly count himself. **The entry does not stand on that**: Karma's buff is spent on
  Recruits, Sett is never buffed in the declared line, and the question never arises. That is the
  project's "try a different legal ordering before filing a reading" rule applied — no R-number is
  needed here.

## 3. Point 3 — Domain Identity

`karma-lux-recycle-buff-army` names its shell: the four legends that are Mind/Order, which is what
`lux-infinite-energy` already forces. Grepped from `data/cards.json`, the legends with
`domains == {mind, order}` are exactly four distinct base codes:

| base | name |
|---|---|
| `OGN-265` | Herald of the Arcane |
| `OGS-021` | Lady of Luminosity - Starter |
| `SFD-201` | Chem-Baroness |
| `UNL-199` | Deceiver |

(`OGN-308`, `SFD-249` and `UNL-235` are alternate printings of three of them.)

`103.1.b.2` makes the identity {Mind, Order}. Every card the new entry adds is **mono-Order** —
`OGN-240` Sett Kingpin, `OGN-235` Karma Channeler, and the optional `SFD-171` Renata Glasc
Industrialist and `OGN-223` Peak Guardian — so `103.1.b.3` admits all of them without touching the
identity. `OGN-151 Lee Sin, Centered` is **mono-Body** and is therefore *not* legal here; it belongs
to the other shell (§6).

## 4. Point 4 — the turn structure, and what the opponent gets

Two routes, and the walk found the second:

**Route A, two turns (what #111 walked).** `143.4` — "Units enter the Board exhausted" — makes every
Recruit born exhausted, and `144.2` / `420.3.a` make exhausting the mover the *cost* of its own
Standard Move, so a Recruit minted on turn T cannot walk on turn T. `415.3.a` readies the whole board
at the next Awakening Phase, and the army walks on T+1 in one action (`144.3`).

**Route B, one turn.** `SFD-171 Renata Glasc, Industrialist` — "Your tokens enter ready." — is
mono-Order, E4 + 1 Order Power, legal in this shell by `103.1.b.3`. A ready Recruit can pay the
`144.2` exhaust cost immediately, so the army walks the same turn it is minted and the opponent never
gets a window. This is the same card `ready-recruits-grand-plaza` already uses for the same reason.

**What the opponent gets on Route A.** `312.2.a` gives priority only "When the turn is in a Neutral
Open State during their Main Phase", so they interact with nothing *during* your loop — but their
whole turn sits between T and T+1, with the army parked at your base. Two concrete threats, both
grepped from the pool:

- `SFD-158 Sandshifter` (Order, E5 P2 M6): "When you play me, kill an enemy unit with 3 :rb_might: or
  less." A buffed Recruit is 2 Might (`703`). No "at a battlefield" clause, so it reaches the base.
  `OGN-229 Vengeance` (Order, E4 P2, "Kill a unit") reaches it too, with no Might bound at all.
- `UNL-180 The Ruination` (Order, E9 P3): "Kill all units." One card erases the entire army, and
  `705` takes the buffs with it.

So Route A's army has to survive a full enemy turn and Route B's does not. Both are written into
`prerequisites.notable`.

## 5. Point 5 — the class, and the arithmetic with the declared quantities

Run the loop for P passes and cash the trailing buff with one extra Forge activation (the last step
`karma-lux-recycle-buff-army` already declares). That leaves **P Recruits, all buffed, all 2 Might**
(`703`), at your base. Walk them all to Sett's battlefield in one action.

| quantity | value |
|---|---|
| buffed friendly units at Sett's battlefield | P |
| Sett's Might | 5 + P |
| garrison's summed Might (`465.2.c`) | 2P + (5 + P) = **3P + 5** |
| Energy / Power the walk itself costs | 0 / 0 (`144.2`: the cost is the exhaust) |

P is unbounded because `lux-infinite-energy` is a verified INFINITE, so 5 + P is unbounded.

**It is ENGINE, and the class is not a formality:**

- **Not BURST and not CHAIN.** No scoring event happens at all. `194.1` lists the four ways to gain
  points — Hold, Conquer, an instruction to gain points, an opponent's Burn Out — and not one of them
  reads Might. The full `grep -in excess` of the pool returns six cards, and exactly one pays a point:
  `OGN-034 Tryndamere, Barbarian` ("if you assigned 5 or more excess damage to enemy units, you score
  1 point"), which is **Fury** and excluded by `103.1.b.1`. `SFD-120 Sivir, Ambitious` is Body,
  `UNL-018 Yeti Brawler` is Fury, `UNL-187` / `UNL-188` are Fury/Order (excluded by `103.1.b.4`,
  which needs the identity to contain *all* of a card's domains), and the one colorless option
  `UNL-217 Trapping Grounds` pays a Bird token, not a point. #111's finding 3 is confirmed by
  re-grep.
- **Not INFINITE.** The unbounded thing here — the army — is already the `token-body-engine` that
  `lux-infinite-energy` produces and that the catalogue has priced. Sett is a *readout* of it, a
  one-time conversion with no repeat step of its own. This is the same shape as
  `azir-sovereign-token-gather`, which is ENGINE for the same reason: it relocates an unbounded stock
  and does not generate one. The entry is therefore an **unbounded ENGINE**, and `terminatesIn` says
  so in words rather than implying a win.
- **The honest product is a wall, and the wall is real.** `815.1.b` forces the enemy to assign lethal
  damage to Sett before any Recruit, and `815.1.c.2` keeps every non-Tank body an invalid assignment
  until he has lethal on him; `465.2.c` gives the opponent only their summed Might to spend. At 5 + P
  Might, Sett soaks more than any board can assign, so the battlefield he stands on cannot be taken
  **in combat**, and `469.2` Holds it every Beginning Phase. It is not removal-proof: `OGN-229
  Vengeance` kills a unit of any Might.
- **The dominated-payoff note the entry has to carry.** In this exact shell the same army already has
  a *winning* line: `ready-recruits-grand-plaza` (ALT_WIN, `needs: token-body-engine`) walks seven
  ready Recruits onto `OGN-293 The Grand Plaza`. Sett is worth an entry anyway because `485.4` /
  `485.5` make the Plaza 1 of 3 battlefields **randomly selected** at setup, while Sett is a card you
  draw. Said in `prerequisites.notable` rather than left for a reader to discover.
- **One Order card the army actively breaks.** `VEN-138 Shen, Leader of the Kinkou Order` (Order):
  "When I hold, if there is exactly **one** other unit you control here, you score 1 point." The
  garrison this entry builds switches Shen off. Recorded so nobody proposes stapling the two together.

## 6. Point 6 — the Lee Sin, Centered amendment lead

`OGN-151 Lee Sin, Centered` is **mono-Body**, so `103.1.b.3` admits him into the Body/Order identity
of `OGN-269 The Boss` — the legend of the verified `the-boss-showstopper-redeploy`, which already runs
`OGN-240 Sett, Kingpin` at a battlefield. The lead is real and it is filed as a `notable` on that
entry. **Its class and every `quantity` are untouched**, and he is deliberately *not* added to `uses`:
the entry's card multiset is what the matcher and `planDeck` price, and a five-card line does not
become a six-card line on the strength of a rider.

What the walk had to correct in the lead as #111 wrote it — "every buffed body at that battlefield
gets +2 Might for itself (Lee Sin) on top of the +1 it gives Sett":

- **Lee Sin's +2 is a continuous Might modifier, not a buff.** `702` defines buffs as counters and
  `702.2.a` as something a player *places*. So Lee Sin's grant never feeds Sett's own count, never
  collides with `702.3`, and never makes an unbuffed body count for Sett. The two effects stack on the
  same bodies but do not feed each other.
- **"Other" excludes Lee Sin himself** (§2), so he is a 6-Might body that pays only his neighbours.
- **He does not count for Sett unless something buffs him.** `OGN-124 Arena Bar` ("[exhaust]: Buff an
  exhausted friendly unit"), already in that entry, does it for free the turn he lands, since `143.4`
  leaves him exhausted unless the `805.1.a` [Accelerate] cost (1 Energy + 1 Body Power) is paid.
- **The real price.** E6 with no Power, or E6 + 1 Energy + 1 Body Power to act the same turn. In the
  declared board of `the-boss-showstopper-redeploy` — Cithria of Cloudfield, Sett and one more buffed
  body — Lee Sin turns two 2-Might buffed bodies into 4-Might ones and an 8-Might Sett into 10, for
  one card. That is the amendment, stated with its own arithmetic.

## 7. Point 7 — the Peak Guardian refutation is REFUTED

#111 finding 5 says `OGN-223 Peak Guardian`'s second clause is dead letter, because the card has no
`[Ambush]` and `355.2.a` therefore "plays it to the base by default". **`355.2.a` says the opposite of
what the refutation needs.** Opened in full:

> **355.2.** For Units, choose a valid Location where that Unit will enter upon being Played.
>
> **355.2.a.** By default, Valid locations include the controller's Base **or a Battlefield the
> controller controls**.

So a battlefield you control is *already* a default valid location; nothing has to grant it. What
`[Ambush]` adds is a different location — `822.1.b`: "I may be played to a battlefield **where you
control Units**", i.e. a battlefield you have bodies at but do **not** control. Peak Guardian never
needed it.

Consequences:

- **Peak Guardian's mass-buff is live**, on the one condition that you control a battlefield when you
  play him (`190.1`: "Control is established over Battlefields through the course of play"). He is
  then at a battlefield when the effect executes, the conditional after "Then," is true, and every
  other friendly unit there is buffed. `143.4` leaves him exhausted, which costs nothing here — the
  trigger is on play, not on an action.
- **He is a legitimate alternative buff source for this entry** and is named as one in
  `prerequisites.notable`: mono-Order, E6 + 1 Order Power, one mass-buff per copy (`103.2.b` allows
  three). Against the Karma engine he is marginal — `702.3.a` refuses a second buff on a body Karma
  already buffed — but for any Order token faucet *without* Karma he is the whole buff economy in one
  card.
- **Do not exclude him from the synergy layer.** #110 placed Peak Guardian in a buff partner list and
  flagged it for removal pending this walk. It stands; nothing should be excluded on the strength of
  #111 finding 5.

A note on a neighbouring sentence, recorded and **not acted on**: the project CLAUDE.md's #100 line
reads "it does NOT protect a Plaza, since 355.2.a already forbids playing units to YOUR battlefields."
`355.2.a` forbids no such thing. The prohibition in that context belongs to `OGN-070 Mageseeker
Warden`'s own text — "While I'm at a battlefield, opponents can only play units to their base" — which
bites through `054.2` ("If a card specifies that an action can 'only' be performed under certain
circumstances, it cannot be performed otherwise"). The rest of the project reads `355.2.a` the right
way (the CLAUDE.md Plaza note: "355.2.a needs you to control the Plaza before the tokens are born"),
so this is one compressed sentence, not a load-bearing error. Flagged for the orchestrator; CLAUDE.md
is not this session's to edit.

---

## 8. What the catalogue gained

| | |
|---|---|
| new entries | 1 — `sett-kingpin-karma-army-might-wall` (ENGINE, `verified`) |
| entries rewritten | 0 |
| entries amended | 1 — `the-boss-showstopper-redeploy` gains one `notable` (Lee Sin, Centered). Class, `uses` and every `quantity` unchanged. |
| class changes | 0 |
| refutations confirmed | 0 |
| refutations overturned | 1 — #111 finding 5 (Peak Guardian) |
| new numbered readings filed | 0 |

Catalogue: **231 → 232 combos, all `verified`.**
