# Walk — the engine × payoff candidates of #155 and the tournament cores of #154

Session **rc-walk-payoff**, 2026-09-06. Issue #159. Rules version 2026-07-16.

Card text is quoted verbatim from `data/corpus_flat.txt` (grep, never memory). Every rule number
below was opened in `data/Riftbound-Core-Rules-2026-07-16.txt` and the passage pasted here.

Entries are staged to `/tmp/rc-walks/rc-walk-payoff.json` under the staging protocol — this session
does not edit `data/combos.json`.

**Result: 8 entries authored, 6 refusals recorded, 1 reclass proposed, 2 hunt errors corrected,
1 open lead handed on.**

---

## 0. First: re-verifying #155's master payoff inventory

The hunt's inventory is load-bearing for everything downstream — its whole "per-group verdict"
section resolves several `produces` groups to refusals *because* the inventory is claimed
exhaustive. Two uniqueness claims by other agents were refuted on 2026-09-06 by checking the source,
so this one was re-run from scratch rather than taken on trust.

```
grep -i -c 'score'  data/corpus_flat.txt   ->  25
grep -i -c 'point'  data/corpus_flat.txt   ->  24
grep -i -c 'win'    data/corpus_flat.txt   ->  24
grep -i -c 'excess' data/corpus_flat.txt   ->   6
```

Every hit was read. **The inventory holds.** The twelve direct point converters and the two
"you win the game" cards #155 lists are all there, none is missing, and the two banned battlefields
(`OGN-290`, `OGN-276`) are correctly marked dead letter. Specifically re-confirmed:

- The only resource → point bridges are `SFD-214 Power Nexus` ("pay [A][A][A][A] to score 1 point")
  and `SFD-088 Renata Glasc, Mastermind` ("[4][Mind][Mind][Mind][Mind], [exhaust]: Score 1 point").
- The only Might/damage → point bridge is `OGN-034 Tryndamere, Barbarian`. The other five
  excess-damage cards (`SFD-120`, `UNL-018`, `UNL-187`, `UNL-188`, `UNL-217`) gate other effects and
  score nothing — confirmed by reading all six `excess` lines.
- The only "you win the game" cards are `OGN-293 The Grand Plaza` and `UNL-088 Gutter Palace`.

**Four additions the hunt's inventory did not list.** None of them overturns a verdict, but a
future session grepping the same words will hit them and should not have to re-derive that they are
not converters:

| Card | Line | Why it is not a converter |
|---|---|---|
| `VEN-109 Illaoi, Prophet of the Great Kraken` | "When you play me **or when I score**, play a Tentacle unit token" | A score-*triggered* payoff. It consumes a point event, it does not produce one. |
| `SFD-209 Forgotten Monument` | "Players can't score here until their third turn" | A battlefield-side *constraint*. Relevant to any Hold line, and to none of the entries below because none of them is a turn-1–2 kill. |
| `VEN-053 Otterpus` | "If a player would score 1 point from conquering or holding during their first or second turn, they draw 1 instead" | Replaces an early Score with a draw. Same note as above. |
| `SFD-060 Tianna Crownguard` | "While I'm at a battlefield, opponents can't gain points" | The catalogue's `tianna-wildclaw-point-lock`. It is the *answer* to every entry below, and each one says so. |

**One re-weighting.** The hunt listed `VEN-067 Bottled Constellation` ("At the start of your Main
Phase, you may kill 3 other friendly units and/or gear to score 1 point") and set it aside in a
parenthetical — *"(self-kill, not a removal payoff)"*. Read against the `token-body-engine` group it
is the pool's **only card that converts bodies into points without a battlefield**, and the hunt sent
that whole group to The Grand Plaza instead. That gap is entry §6 below.

**A structural fact worth recording, because it collapses most Domain Identity checking.** All
**15** two-domain combinations of the six domains are printed as legends (computed over
`data/cards.json`: `body/calm body/chaos body/fury body/mind body/order calm/chaos calm/fury
calm/mind calm/order chaos/fury chaos/mind chaos/order fury/mind fury/order mind/order` — C(6,2) =
15, complete). So a Domain Identity check on a line that names no legend reduces to *"is the union
of the cards' domains at most two?"*; there is no pair for which the legend does not exist.

---

## 1. Candidate 1 — Power Nexus × 2 Blue Sentinel × Time Warp

### 1.1 The bare three-card version is REFUTED at five points

#155 proposed a self-contained CHAIN on `SFD-214` + 2 × `UNL-087` + `OGN-122`, and honestly flagged
that the walk still had to close the Power ledger. It does not close. The shortfall is forced
arithmetic, not a judgement call.

A Nexus payment is **Beginning-Phase Power**. Without a Gold source the only Beginning-Phase Power is
a rune recycle:

> **164.2.b.** Recycle this: [Reaction] — Add [C].
> **161.2.b.** When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck.
> **161.2.a.** Exactly 12 Rune cards chosen during Deck Construction.
> **315.3.b.** 1. The Turn Player channels 2 runes from their Rune Deck.

So across the casting turn and the Additional Turn the **entire** Power budget from runes is 12 (the
board) + 2 (the Channel Phase) = 14, i.e. `floor(14 / 4) = 3` Nexus firings *whatever the split*,
plus the two base Holds. **Five points.** And it is worse than that in practice, because Time Warp
needs 10 Energy in the casting turn's Main Phase, and a rune recycled in the Beginning Phase is off
the board (161.2.b) and cannot also be exhausted for Energy — which caps the casting turn at one
firing. Every split gives 5.

Worked, for the record, with `r₁` runes recycled in turn 1's Beginning Phase:

| `r₁` | T1 Nexus firings | Runes left for T1 Main | Time Warp castable? | T2 firings | Total points |
|---:|---:|---:|---|---:|---:|
| 0 | 0 | 14 | yes | 3 (12 of 14) | 1 + 0 + 1 + 3 = **5** |
| 4 | 1 | 10 | yes (exactly) | 2 | 1 + 1 + 1 + 2 = **5** |
| 8 | 2 | 6 | **no** (6 < 10 Energy) | — | — |
| 12 | 3 | 2 | **no** | — | — |

### 1.2 The Gold version reaches eight — entry `power-nexus-atlas-sentinel-time-warp` (CHAIN)

Two leads the catalogue was already carrying, never followed:

- `world-atlas-sentinel-gold`'s `terminatesIn`: *"engine only — converts through Power Nexus
  (SFD-214: pay four runes on Hold to score 1) or through any Power sink"*.
- `eminent-benefactor-sentinel-gold`'s: *"it converts through Power Nexus (SFD-214) or any Power sink"*.
- `power-nexus-sentinel`'s own REFUTE note: *"World Atlas Gold (world-atlas-sentinel-gold) is the fix"*.

`SFD-086 World Atlas` is Mind Equipment: *"[Equip] [Mind] … [Effect] When I hold, play two Gold gear
tokens exhausted."* Hang one on each Blue Sentinel — the Sentinels are the bodies, so the line needs
no extra units. With K = 2 Sentinels every hold effect at the Nexus fires 1 + 2 = 3 times (R1 = A
with stacking), so:

- Atlas A: 3 firings × 2 Gold = 6. Atlas B: 6. **Twelve Gold per Hold.**
- Nexus: 3 firings × 4 Power = **twelve Power per Hold.** An exact fit.
- Sentinels' own trigger: 2 × 3 = **six rainbow** at the start of the next Main Phase.
- Base Hold: 1 point (469.2, 471.1).

**Four points per Beginning Phase, self-financing, with no rune spent.** That standalone engine is
entry `power-nexus-atlas-sentinel-gold`; adding one Time Warp makes it 4 + 4 across two consecutive
Beginning Phases = **eight**, which is `power-nexus-atlas-sentinel-time-warp`.

### 1.3 Two rules the ledger turns on, neither previously cited in this project

**(a) The Sentinel's Power survives 167, because 316 orders the Main Phase's tasks.** This looks like
it should cancel — 167 empties the pool "at the start of each player's Main Phase" and the Sentinel
adds "at the start of your next Main Phase". It does not:

> **316.2.** The following Tasks become Outstanding **in the specified order**:
> **316.3.** 1. Each player's Rune Pool empties. Any unspent Energy and Power are lost.
> **316.4.** 2. At the start of Main Phase game effects take place.

The sweep is **first**, the start-of-Main-Phase effects **second**. The six rainbow land *after* the
sweep and are spendable, and

> **135.2.e.5.b.** When Added to a player's Rune Pool, [A] can be spent to pay a Power cost of any Domain.

so they cover Time Warp's four Mind Power. Nine entries in the catalogue use Blue Sentinel and **none
of them spends that Power**; it is what pays for Time Warp here and for Renata in §4.

**(b) The Nexus payment is the trigger's BASE COST, paid at finalization — so this turn's Gold can
never pay this turn's Nexus, not even under Renata Glasc, Industrialist.**

> **383.3.b.** If a Triggered Ability contains a cost within instructions at the beginning of the
> effect or immediately following the "you may" or "they may" that appears as the first part of the
> effect, that cost is treated as the base cost of the Triggered Ability.
> *Example: Ekko, Recurrent reads "[Deathknell][>] Recycle me **to** ready your runes." … "recycle
> me" is taken as the base cost of the triggered ability.*
> **383.3.b.1.** The cost must be paid in order to finalize the Triggered Ability to the Chain.
> **383.3.d.** If more than one Triggered Ability is Triggered simultaneously, then the player that
> controls the Abilities selects the order to place them on the Chain.

Power Nexus reads *"you may pay [A][A][A][A] **to** score 1 point"* — the infinitive form of 383.3.b's
own example. Every trigger of one Hold is simultaneous and 383.3.d places them all on the Chain
before any resolves, so when a Nexus trigger is finalized no Atlas has resolved and no Gold exists.
R25 = A ("Your tokens enter ready") therefore does **not** collapse the one-turn Gold offset here.

The contrast that makes this a real distinction rather than a guess:

> **205.** An instruction that requires a player to pay resources or spend counters or XP that does
> not also have a linked Effect, is not a Cost.
> *Example: A card effect reads, "When I attack, you may pay [4][C]. **If you do,** kill a unit here."
> Paying [4][C] in this way is not a cost of the ability, base or otherwise, but a game action being
> performed by a player.*

**"pay X to Y" = base cost at finalization (383.3.b). "pay X. If you do, Y" = a game action at
resolution (205).** The two forms are distinguished textually and Riot gives a worked example of each.

**(c) Making that Power needs no priority, which is already settled.** 167 leaves the Beginning Phase
pool empty and 335 gives nobody priority there, but:

> **429.3.** Activated abilities that Add resources and have the Reaction tag can be activated at any
> time that spells or abilities require resources be paid.
> *Example: A player moves two units to a battlefield where their opponent controls a Mageseeker
> Investigator. **Although they have no window of priority,** they may activate Add Reactions to pay
> for the applied cost …*
> **429.3.a.** When an Add ability is activated in this way, it immediately finalizes and resolves,
> even during the resolution of spells and abilities.

`187.5` gives Gold *"[Reaction][>] Kill this, [E]: [Add] [A]"* — it carries [Reaction]. Same paragraph
`power-nexus-sentinel` already stands on for rune recycles.

**(d) Why the Gold is one turn behind.** `315` is **Start of Turn** and holds four phases in order:
315.1 Awaken, 315.2 Beginning, 315.3 Channel, 315.4 Draw. Gold made by a Hold (315.2.b.2) enters
*after* 315.1.b has readied everything, and 187.5 puts an exhaust in its cost, so it is dead that
turn. The engine primes on the first Hold (1 point, 12 Gold banked) and pays 4 a turn from the second.

**(e) The eighth point lands.** `471.1.a.1`: *"Notably, points Gained from sources that are not
Conquer are not beholden to these restrictions."* — so 471.1.b's Final Point clause ("if the player
has not Scored every Battlefield this turn, that player draws a card instead") never bites on a Hold
point or a Nexus ability Gain.

### 1.4 The Mind/Order sibling — `power-nexus-benefactor-sentinel-time-warp` (CHAIN)

`SFD-152 Eminent Benefactor` (Order, E6 M5, *"When I hold, play two Gold gear tokens exhausted."*)
gives the identical 12 Gold per Hold at K = 2 with two copies, no [Equip] cost and a garrison of four
units instead of two. It is a **different deck**, not a swap: World Atlas is Mind and the Benefactor
is Order, exactly the split for which the catalogue already keeps `world-atlas-sentinel-gold` and
`eminent-benefactor-sentinel-gold` apart. Mind/Order also opens `SFD-201 Chem-Baroness` as the legend
(her Gold [Add] an extra Energy from five points up, and her own Hold trigger is multiplied too) —
recorded as a notable, not as an ingredient, because the eight close without her.

---

## 2. Candidate 2 — Herald of the Arcane + Heimerdinger + Vanguard Armory → The Grand Plaza

Authored as `herald-heimerdinger-armory-plaza` (ALT_WIN). The count is 3 (Armory's own exhaust) + 3
(Heimerdinger's copy of the same ability, paid with *his* exhaust) + 1 (the legend's own exhaust,
1 Energy) = **seven Recruits in one Main Phase for 1 Energy**, which is exactly `OGN-293`'s bar.

**Near-duplicate ruling, which is what #155 asked the walk to decide.** The catalogue holds sixteen
Grand Plaza entries. The two that could collide:

- `grand-plaza-recruit-vanguard` — `OGN-293` + 2 × `OGS-015` (a spell), 12 Energy in one turn. No
  shared card but the Plaza.
- `plaza-armory-miss-fortune` — `OGN-293` + 2 × `SFD-168` + `OGN-162 Miss Fortune`, **Body/Order**.
  Its own notable says outright that it and `heimerdinger-vanguard-armory-recruits` *"can never share
  a list"* — Heimerdinger is Mind, the Armory Order, Miss Fortune Body, three domains against a
  legend's two (103.1.b.4).

This line is **Mind/Order**, needs **one** Armory instead of two, and costs 1 Energy on the finishing
turn instead of 0 (Miss Fortune's route) or 12 (the spell route). **Distinct on cards, on domain
identity and on cost — authored as its own entry.**

The reason it is worth authoring at all, rather than left as prose: two verified ENGINE entries
already state this exact count in their notables (`heimerdinger-vanguard-armory-recruits` notable[2],
`heimerdinger-herald-legend-recruits` notable[3]) and both end their `terminatesIn` at *"it wins
through a Grand Plaza hold at 7+ units, not on its own"*. A deck holding all four cards therefore
matches two ENGINEs today and **no win at all** — the matcher and `planDeck` can only see a line that
is an entry.

**The margin.** Seven is the bar with nothing to spare. Heimerdinger is the eighth body if he moved
to the Plaza on an *earlier* turn — he cannot both move and copy in one turn, because 144.2 makes the
Standard Move cost his exhaust and 415.3.a readies him once per Awakening. R30 = B does not bite:
neither the Armory nor the Herald prints a "use only while" clause for him to inherit (377.2.b).

---

## 3. Candidate 3 — Renata / Ekko / two Time Warps extended to a third turn: **it closes, under one
stated assumption**

Not authored as a new entry — it is a **reclass** of the verified `renata-time-warp-ekko-refresh`
(currently ENGINE), which this session does not own. Reported to the manager with the ledger below.

`738`'s own worked example settles the queue: *"If the turn queue is represented as [> A > B > C > D >],
then these Additional Turns will appear as [> A > A\* > A\* > B > C > D >]."* — and 735 inserts each
"after the current turn", so a Time Warp cast *during* A\* lands the next one right after A\*. No
opponent turn intervenes across all three.

The existing entry's own notable prices turns 1–2 and stops there by design. Continuing it:

| | Beginning Phase | Main Phase | Points | Runes on board after |
|---|---|---|---:|---|
| **T1** | Hold both Duel battlefields (485.4 "Battlefield Count: 2"; 315.2.b.2 Holds all you control) | 12 runes → 12 Energy; recycle 4 Mind → 4 Power; **Time Warp #1** (10E + 4P). Kill Ekko: his Deathknell readies the surviving 8; exhaust them (+8 E) and recycle 4 more Mind (+4 P); **Renata** (4E + 4 Mind P, exhaust) | 2 + 1 = **3** | 4 |
| **T2** (A\*) | Awaken readies 4 runes + Renata. Hold both | Channel +2 → 6 runes = 6 Energy. Score is now **5**, so Chem-Baroness's *"While your score is within 3 points of the Victory Score, your Gold [Add] an additional [1]"* is live: 4 banked Gold = 4 Energy + 4 rainbow. 6 + 4 = 10 Energy, 4 Power → **Time Warp #2** | 2 | 6 |
| **T3** (A\*\*) | Awaken readies 6 runes + Renata. Hold both | Channel +2 → 8 runes. **Renata** (4E + 4 Mind P, exhaust) | 2 + 1 = **3** | — |

**Total 8.** Score after T2's Beginning Phase is exactly 5, which is exactly the threshold
Chem-Baroness's clause needs — the ledger has no slack there and that is worth stating.

**The assumption the existing entry does not make:** holding **both** Duel battlefields through all
three Beginning Phases. On one battlefield the total is 1 + 1 + 1 + 1 + 1 = 5, not 8. `470` caps at
one Score per battlefield per turn, so a third battlefield is not available in a Duel.

**Recommendation to the manager: reclass ENGINE → CHAIN with a `notable` stating the two-battlefield
requirement and the exact-5 Chem-Baroness threshold, or leave it ENGINE and add the ledger as a
notable.** Either is defensible; what is not defensible is leaving the third turn unpriced, since the
entry's own `uses` already declares two copies of Time Warp.

---

## 4. `power-nexus-sentinel-renata-mastermind` — the Sentinel Power nobody spends

Falls straight out of §1.3(a). The six rainbow the Sentinels deliver at the start of the Main Phase
pay Renata Glasc, Mastermind's four Mind Power exactly (135.2.e.5.b), so her point costs four runes'
worth of *Energy* and nothing else. **Two points a turn — the base Hold and Renata — with no rune ever
recycled**, so 161.2.b never takes a rune off the board and the engine does not decay. Eight in four
turns from two cards plus the battlefield.

The Nexus firings are the burst half and the entry says so rather than hiding it: on a turn with
twelve runes banked, recycling eight buys two firings and leaves six Energy (four board + two
channelled), which is enough for Renata. **Four points that turn, once.** Recycling twelve buys three
firings and leaves no Energy for Renata: still four. Steady state is two.

Distinct from `power-nexus-sentinel` (Nexus + Sentinels alone, Beginning-Phase points only, its own
REFUTE note naming the rune ceiling as the blocker) because it adds a **Main-Phase** point that the
Beginning-Phase Power shortage cannot touch. Distinct from `heimerdinger-renata-remote-score`, which
is Body/Mind (Acceleration Gate) and cannot hold this Power source.

---

## 5. `shen-blue-sentinel-exact-hold` — the one place a second Blue Sentinel makes the line worse

`VEN-138 Shen, Leader of the Kinkou Order` (Order, E6 P2 M7): *"When I hold, if there is **exactly one
other unit you control here**, you score 1 point."* It is in #155's inventory and in **zero** entries,
and the pool's biggest hold multiplier had never been pointed at it.

With **exactly one** Blue Sentinel: the Sentinel is both the multiplier and the one other unit the
condition demands. Each hold effect fires 1 + 1 = 2, so Shen scores twice; plus the base Hold —
**three points a turn off two cards**, for 10 Energy + 3 Power once.

With **two** Sentinels the line scores **one**. 383.2.a.1 makes a condition sitting immediately after
"When I hold" part of the *Trigger Condition*, evaluated when the trigger is placed; two other units
is not "exactly one", so Shen never triggers. Every other Sentinel entry in the catalogue runs K = 2
or K = 3, so a future session copying those quantities would silently produce a zero-payoff board.
**The entry exists to record the anti-synergy as much as the synergy.**

Time Warp was walked here and does **not** close on one battlefield: 3 + 3 = 6, not 8. It reaches 8
only at 4 + 4, i.e. holding the second Duel battlefield too — an assumption about the board rather
than about these two cards, so it is a notable and not a fourth Time Warp CHAIN.

Token producers cannot share the battlefield: `185.1` with `185.2.b` ("Token units have a Might")
makes a Recruit or a Sprite one of the "other units you control here". Equipment is fine (818.1 —
Equip is an Activated Ability and an attached card is not a unit).

---

## 6. `armory-heimerdinger-bottled-constellation` — the payoff the token group was never offered

`VEN-067 Bottled Constellation` (Mind, E10 P2): *"At the start of your Main Phase, you may kill 3
other friendly units and/or gear to score 1 point."* #155 filed it in a parenthetical; it is the
pool's only **bodies → points** converter that needs no battlefield at all.

Cycle: turn N's Main Phase, the Armory (3 Recruits) and Heimerdinger's copy of it (3 more) make six.
Turn N+1's Main Phase **opens** with both Constellations' triggers and the six are still there —
`187.1` Recruits carry no [Temporary] — so each kills three for a point. **Two points a turn**, and
the same Main Phase then rebuilds the six. Eight in four turns.

**Why a [Temporary] source can never substitute**, which is the refusal that makes this pairing
specific rather than generic: `816.1.b` kills a [Temporary] permanent *"at the start of its
controller's Beginning Phase, before scoring"*, and 315.2 Beginning Phase precedes 316 Main Phase, so
every Temporary body is already dead when the Constellation triggers. That refuses
`sprite-fountain-malzahar-jayce` and `sprite-fountain-aspiring-engineer` as fodder even though both
are Mind and domain-legal.

Not `bottled-constellation-time-warp`, which is three Constellations + three Time Warps and declares
`needs: ["infinite-energy","infinite-power"]` — it exists only on top of the Lux loop and its fodder
is *"the loop's Recruits and Gold"*. They share only `VEN-067`.

The honest cost is 30 Energy + 6 Power before the first point. What it buys is a point engine with
**no battlefield** — no 1-of-3 random draw (485.5), no Control to establish (190.1), nothing to
conquer away.

---

## 7. Issue #154 core 1 — First Mate + Lucian, Merciless (+ Doran's Blade)

Authored as `first-mate-lucian-merciless-double-conquer` (ENGINE, mono-Body).

**The exhaust ledger is the entry, and it balances exactly with nothing to spare.** Lucian needs
three exhausts in the turn and has exactly three readies:

1. Awaken readies him (315.1.b, 415.3.a) → **exhaust 1** pays the Standard Move to battlefield A (144.2).
2. He conquers; *"the first time I conquer each turn, ready me"* fires → **exhaust 2** pays the Standard Move home.
3. Play First Mate; *"when you play me, ready another unit"* readies him → **exhaust 3** pays the Standard Move to battlefield B.

Two conquers, two points. The round trip through the base is **forced**, not chosen:

> **144.4.** *(Standard Move: base ↔ battlefield only.)* Battlefield to battlefield needs [Ganking],
> and **810.1.c.3**: "It does not give additional abilities or activations of Movement, only new
> options for the Standard Move."

which is exactly why a *second, independent* ready source is the whole requirement:

> **383.3.e.1.** Such a Triggered Ability will only be performed the specified number of times each
> turn. If its trigger condition would be fulfilled and it has already been performed that many
> times, it does not trigger.

That caps Lucian's own trigger. It says nothing about First Mate — a different ability on a different
permanent.

### 7.1 One correction to #154's sequence

The issue's steps have Lucian **played and moved on the same turn**. `143.4` ("Units enter the Board
exhausted") plus `144.2` ("Exhausting the Unit is the Cost for this action") forbid it: the play turn
buys only the free Doran's Blade attach. The double conquer starts from the Awakening after. First
Mate, by contrast, *is* played on the double-conquer turn — its ready is an ETB.

The rest of #154's reasoning holds. `356.6` ("Energy and Power costs can't be reduced below 0") makes
[Weaponmaster]'s one-rainbow discount cover Doran's Blade's `[Equip] [Body]` exactly, so the attach is
free and Lucian attacks at 5 Might.

### 7.2 The cost the issue did not state

> **323.6.** 4. Players lose control of any controlled Battlefields without their Units occupying
> them if the turn is in an Open State and there is no Showdown or Combat ongoing there.

Walking Lucian home **un-conquers battlefield A** at the next Cleanup. The point is already Gained
(471.1) and nothing undoes it, but you do not Hold it in your Beginning Phase. Sending any cheap body
along is the fix; it is deliberately **not** in `uses`, because it is a fifth card and changes no
mechanism.

`485.4` ("Battlefield Count: 2") means the second conquer is the opponent's, which `470` permits
because it is a different battlefield. If it is unoccupied and uncontrolled the move opens a
Non-Combat Showdown (316.8.b.1) and `348.2.a` establishes Control with `348.2.a.1` calling it a
Conquer — no Attacker designation, so the empty-battlefield trap (807.1.d, 383.4.e, 461) is respected.
If it is garrisoned, `465.2.c` has each side assign damage equal to their **summed** Might, and
Doran's Blade's +2 is the difference.

Cores 2 and 3 of #154 are synergy-shaped and were left, per the task.

---

## 8. The 197-ENGINE sweep: what the hunt got right, and two places it did not

For all 222 `ENGINE` entries the union of the `uses` cards' domains was computed from
`data/cards.json` and tested against each of the fifteen payoff cards
(`union(uses) ∪ payoff.domains` must be ≤ 2 domains, which §0 shows is sufficient because every pair
is a printed legend).

**#155's refusal 7 is CONFIRMED for ten of the twelve entries it names.** Time Warp is mono-Mind and
`yasuo-syren-unforgiven-point` (calm/chaos), `draven-glorious-executioner-point` (chaos/fury),
`shen-duo-mutual-hold` (calm/order), `renekton-dominus-double-conquer` (body/fury),
`dunebreaker-trinity-force-hold` (body/fury), `lucian-skyfinity-double-conquer` (body/fury),
`vi-ride-the-wind-double-conquer` (chaos/fury), `confront-vi-stormbringer` (body/fury) and
`vi-hotheaded-excess-threshold` (body/fury) all measure at two non-Mind domains. Independently
computed, same verdict.

**Two are wrong, and the reason is worth recording.** `sett-first-mate-windswept-hillock` and
`poppy-confront-blood-rose` are both **mono-Body** by their `uses` — the hunt described them as
"Body/Order-family" and "Body-family", but neither actually spends a second domain, so a **Body/Mind**
legend is legal and Time Warp *can* be added. The verdict survives anyway (each is a ~2-point-a-turn
engine, so one extra turn is two extra points, not eight), but the *reason* given was not the real
one. The general lesson: **compute a line's identity from its `uses`, never from the flavour of its
name** — an entry that mentions an Order card in prose is not an Order entry.

`tianna-guardian-angel-forge-god-lock` (calm/mind) the hunt already flagged as Mind-legal itself.

**The remaining groups.** `card-advantage-engine` (25), `strip-opponent-hand` (4) and
`opponent-deck-pressure` (3) are refused exactly as #155 refuses them — the §0 re-verification found
no card converting hand size, cards drawn, cards in the trash or opponent deck size into a point.
`repeatable-removal` (27) is refused for the reason `vi-hotheaded-excess-threshold` already walked by
hand: `OGN-034` is a **threshold**, not a scale. `resource-engine` (51) is the group entries §1, §1.4
and §4 serve, and `token-body-engine` (11) is the group entries §2 and §6 serve.

---

## 9. Refusals and open leads

| # | Candidate | Killed by |
|---|---|---|
| R1 | **Power Nexus + 2 Blue Sentinel + Time Warp, bare (no Gold)** as a CHAIN | Arithmetic: 161.2.a (12 runes), 161.2.b (a recycle leaves the board), 315.3.b (2 back per turn) cap the two-turn Power budget at 14 → `floor(14/4)=3` firings + 2 base Holds = **5 points**. Every split gives 5. §1.1 |
| R2 | **Renata Glasc, Industrialist (R25 = A) collapsing the Gold offset** so this turn's Hold-Gold pays this turn's Nexus | 383.3.b + 383.3.b.1 make the Nexus payment the trigger's **base cost, paid to finalize**, and 383.3.d places every simultaneous Hold trigger on the Chain before any resolves. No Atlas has resolved when the Nexus trigger finalizes. §1.3(b) |
| R3 | **A [Temporary] token engine feeding Bottled Constellation** (`sprite-fountain-malzahar-jayce`, `sprite-fountain-aspiring-engineer` — both Mind, both domain-legal) | 816.1.b kills them "at the start of its controller's Beginning Phase, before scoring", and 315.2 precedes 316 — every Temporary body is dead before the Constellation's Main-Phase-start trigger. §6 |
| R4 | **A second Blue Sentinel on the Shen line** | 383.2.a.1: "exactly one other unit you control here" is part of the Trigger Condition. K = 2 → the condition fails → Shen never triggers. 3 points becomes 1. §5 |
| R5 | **Lucian conquering twice on the turn he is played** (#154's own sequence) | 143.4 (units enter exhausted) + 144.2 (the Standard Move costs that exhaust). §7.1 |
| R6 | **Shen + Blue Sentinel + one Time Warp as a CHAIN on one battlefield** | 3 + 3 = 6. It reaches 8 only by holding the second Duel battlefield too, which is an assumption about the board, not about the cards. §5 |

**Open lead, deliberately not half-authored.** `azir-sovereign-token-gather`'s own `terminatesIn`
says *"the win comes from what the bodies then do, e.g. a Grand Plaza hold on the following turn"*,
and `SFD-177 Azir, Sovereign` is the pool's only bulk mover of tokens — the answer to #48's
walk-to-the-battlefield bottleneck. The blocker a walk has to clear first: Azir's clause is *"**When I
attack**, you may move any number of your token units to this battlefield"*, so it needs a real
enemy garrison (807.1.d, 383.4.e, 461 — an empty battlefield is not an attack), which means the Plaza
must be the **opponent's** and the arriving bodies are 1-Might Recruits that `465.2.c.3` will pick off
first. That is a combat walk, not a Hold walk, and it deserves its own pass.

---

## 10. Facts for `CLAUDE.md` (this session owns no tracked file but this document)

1. **316.2 orders the Main Phase's tasks: 316.3's Rune Pool sweep is FIRST, 316.4's "at the start of
   Main Phase game effects" is SECOND.** So an [Add] scheduled "at the start of your next Main Phase"
   — `UNL-087 Blue Sentinel`'s, the only one in the pool — **survives 167** and is spendable Main-Phase
   Power. Nine catalogued entries use Blue Sentinel and none of them spent it. With 135.2.e.5.b
   ("[A] can be spent to pay a Power cost of any Domain") it pays a domain cost.
2. **"pay X **to** Y" is a Triggered Ability's BASE COST, paid to finalize it onto the Chain
   (383.3.b, 383.3.b.1, worked example: Ekko's "Recycle me **to** ready your runes"); "pay X. **If you
   do,** Y" is a game action performed at resolution (205, worked example: "When I attack, you may pay
   [4][C]. If you do, kill a unit here").** The two forms are distinguished textually and Riot gives an
   example of each. Consequence: `SFD-214 Power Nexus` is paid at finalization, and since 383.3.d
   places every simultaneous Hold trigger before any resolves, Gold made by the same Hold can never pay
   it — not even under R25 = A.
3. **All 15 two-domain pairs are printed as legends** (C(6,2) = 15, complete, computed over
   `data/cards.json`). So a Domain Identity check on a line that names no legend reduces to *"is the
   union of the cards' domains at most two?"* — there is no pair for which no legend exists.
4. **471.1.a.1**: *"points Gained from sources that are not Conquer are not beholden to these
   restrictions"* — 471.1.b's Final Point clause never applies to a Hold point or to a card-text
   "score 1 point" ability Gain, so the eighth point of an ability line lands with no
   "Scored every Battlefield" condition.
5. **Compute a line's domain identity from its `uses`, never from the prose of its name or notes.**
   #155 called `sett-first-mate-windswept-hillock` "Body/Order-family" and `poppy-confront-blood-rose`
   "Body-family"; both are **mono-Body** and therefore Mind-legal. The verdicts survived, the reasons
   did not. §8.
6. **`VEN-067 Bottled Constellation` is the pool's only bodies → points converter that needs no
   battlefield**, and `OGN-293 The Grand Plaza` is the only other body payoff. A `token-body-engine`
   entry has exactly these two outlets.
