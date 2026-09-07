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

---

## 11. Correction to §5 — the Shen entry was a genuine duplicate and was withdrawn

`shen-blue-sentinel-exact-hold` was authored, validated, and then **dropped before merge**. While this
walk was running, the parallel session `rc-walk-instances` merged
**`shen-kinkou-sentinel-hold`** (commit `d44ff0e`) — the same two cards (`VEN-138` + `UNL-087` ×1),
the same 3-points-a-turn arithmetic, the same "a second Sentinel breaks the condition" finding, and
even the same 316.2/316.3/316.4 citation for the Sentinel's Power surviving 167. Two walks reached
the same line independently within an hour; `VEN-138` was in zero entries when this one started.

**Process lesson, and it is the reason the staging protocol exists:** a near-duplicate check run once
at the start of a walk is a check against a *snapshot*. Re-run it against the **current**
`data/combos.json` immediately before staging, keyed on the sorted card set rather than on the id:

```
node -e 'const db=require("./data/combos.json"), mine=require("/tmp/rc-walks/<you>.json");
 const key=c=>[...new Set(c.uses.map(u=>u.card))].sort().join("+");
 const m=new Map(); for(const c of db.combos){const k=key(c); (m.get(k)||m.set(k,[]).get(k)).push(c.id);}
 for(const e of mine) console.log(e.id, m.get(key(e))||"none");'
```

Two things this walk found that the merged entry does not carry, handed to the manager as notes
rather than re-authored:

1. **Which "other units" the condition counts.** `185.1` with `185.2.b` ("Token units have a Might")
   makes a Recruit or a Sprite one of the "other units you control here", so the line cannot share a
   battlefield with any token producer. Equipment is the exception and is safe: `818.1` makes Equip an
   Activated Ability and an attached card is not a unit, so Shen or the Sentinel may wear gear freely.
   The merged entry says "any friendly unit that walks to that battlefield switches Shen off" without
   naming either half.
2. **Time Warp was walked and does not close it.** `OGN-122` is Mind and legal in the Mind/Order
   identity, but one Additional Turn is 3 + 3 = **6**, not 8. It reaches 8 only at 4 + 4, i.e. holding
   the **second** Duel battlefield through both Beginning Phases (485.4 "Battlefield Count: 2";
   315.2.b.2 Holds all you control) — an assumption about the board rather than about these two cards,
   which is why no CHAIN was authored.

---

## 12. Batch 2 — two more entries from the groups #155 refused wholesale

### 12.1 `tryndamere-hextech-gauntlets-enforcer` (ENGINE, Fury/Order)

#155 refused the whole `repeatable-removal` group on the grounds that `OGN-034 Tryndamere` is the only
Might/damage-to-point bridge and that it is a **threshold, not a scale**. Both halves are true. The
question the refusal did not ask is the reverse one: of the five *other* cards in the excess-damage
family, which can share an identity with the one that scores?

`UNL-188 Hextech Gauntlets` and `UNL-187 Piltover Enforcer` are **Fury/Order**; Tryndamere is Fury. The
whole package is one legend's two domains, and the entry that already holds the other two —
`gauntlets-enforcer-conquer` — has the words *"engine only"* as its **entire** `terminatesIn` and a
single-sentence notable.

The interaction is the pricing, and it is unusually clean:

> `UNL-188` — "[Equip] :rb_energy_3::rb_rune_rainbow:. **This ability's Energy cost is reduced by the
> Might of the unit you choose.** … [Effect] When I conquer, if you assigned 3 or more excess damage, draw 1."
> **356.6.** Energy and Power costs can't be reduced below 0.

On Tryndamere's printed 8 Might the Equip's Energy component is `3 − 8 → 0`, so attaching costs **one
rainbow**. And the +3 Might it gives back is +3 **excess damage** under R28 = A — the exact currency
Tryndamere's threshold is priced in. *The bigger the body, the cheaper the gear, and the biggest body
is the one with the 5-excess bar to clear.*

Where the +3 actually matters, computed rather than asserted:

> **465.2.c.** Starting with the Attacker, each player assigns an amount of damage equal to their
> summed Might among the other's Units.
> **465.2.c.4.** Units cannot have more damage assigned to them than the minimum required to [kill them].

M8 Tryndamere clears his own 5-excess bar only against a garrison summing **3 or less**. At M11 he
clears it against a garrison summing **6** — the difference between answering one 3-Might body and
answering two, or one 6-Might body.

**One attack pays three times:** 1 point (Tryndamere), 1 card (the Gauntlets, `136.2.b` keeping the
Effect Text active while attached and `136.2.d` making "I" the wearing unit), 1 ready (the legend).

**A first application of §1.3(b)'s new rule to a card that is not the Nexus.** The Enforcer reads
*"you may **exhaust me** to ready a unit"* — a cost immediately after the trigger's opening "you may",
so `383.3.b` makes it the **base cost** and `383.3.b.1` requires the legend **ready when the trigger
finalizes**. 315.1.b readies it every Awakening and nothing else in the line spends it; spend it
earlier in the turn on anything else and the ready is silently lost.

**The live trap is the attack.** Tryndamere says *"When I conquer **after an attack**"*, and there is
no attack against an empty battlefield (807.1.d, 383.4.e, 461). A Non-Combat Showdown conquer
(316.8.b.1, 348.2.a.1) scores the ordinary point but fires **none** of the three triggers, because no
damage is assigned and therefore none is excess.

ENGINE at one point a turn: 469.1 conquers a battlefield once per turn, 485.4 puts two on a Duel
table, and Tryndamere has no [Ganking], so 144.4's base ↔ battlefield restriction makes the second
cost two exhausts the legend's single ready cannot cover.

### 12.2 `wild-claw-nasus-ascended-empowered` (ENGINE, Body/Calm)

`#155`'s inventory lists `VEN-046 Nasus, Ascended` with the parenthetical *"(needs 8 Energy to Empower
first)"* and never asks what pays it. The catalogue's two Nasus entries both assume an Empowered Nasus
already on the board and neither prices the setup.

The sweep that answered it was `grep -i empower data/corpus_flat.txt` **without brackets**, per the
project's own rule that a keyword lens opens on the bare word. `VEN-089 Wild Claw` (Body, E7 P1) was in
**zero** entries:

> *"Look at the top 5 cards of your Main Deck. You may banish a unit or gear from among them and play
> it, reducing its Energy cost by :rb_energy_5:. Recycle the rest. **Then you may do this: Empower it.**"*

That last clause is an ability performing the act directly:

> **441.1.** Empowering is the act of rendering one or more Game Objects Empowered.
> **441.1.a.** Empowered is a binary state. A Game Object is Empowered or it isn't.

so `827.1.c.3` — which governs *"determining a card's Empower cost"* — has nothing to say about a route
that never determines one. This is the #153 walk's fact (previously applied only to **gear**, through
`VEN-062 Hextech Formula` → `VEN-018 Rage Amplifier`) reaching a **unit**, and the unit it reaches is
the one carrying the pool's most expensive [Empower] cost.

**The arithmetic against the honest alternative.** The hard way is Nasus at 8 Energy + 1 Calm Power and
then his own [Empower] at 8 Energy: **16 Energy** and a Power, which against a 12-rune deck (161.2.a) is
two turns. Wild Claw is 7 Energy + 1 Body Power and plays him at `8 − 5 = 3` Energy + 1 Calm Power,
Empowered, in one Main Phase: **10 Energy and two Power**, from a card still in the deck. The Empower
is permanent — 441.2 — because Wild Claw attaches no "disempower at end of turn" clause, unlike
`VEN-035 Sanction`, which does.

**The randomness is the cost, measured rather than waved at.** The look samples a **39**-card deck
(103.2 counts the Chosen Champion inside the 40 and 103.2.a.1 puts it in the Champion Zone before
play). `1 − C(39−k, 5)/C(39, 5)` for k copies of Nasus:

| copies | P(in the top five) |
|---:|---:|
| 1 | 12.8 % |
| 2 | 24.3 % |
| 3 | **34.5 %** |

Three copies of Wild Claw give three looks, and a failed look costs the spell and nothing else:

> **431.1.c.** If an instruction directs a player to look at or reveal cards in excess to the number of
> cards in a player's Main Deck, that player looks at or Reveals as many as possible, but **does not
> Burn Out**, then proceeds with the rest of the instruction.

Two related cards checked and **not** used, with the reason: `VEN-163 Risen Altar` (in zero entries)
discounts the printed [Empower] cost this line never pays; `VEN-035 Sanction` (mono-Calm, 3 Energy + 1
Power, [Reaction], *"Empower a unit. Disempower it at end of turn"*) is the right tool on a turn you
want the point **now** and cannot afford ten Energy, but it is a different, temporary route to the same
state and so is a notable rather than an ingredient.

---

## 13. Two further refusals from batch 2

| # | Candidate | Killed by |
|---|---|---|
| R7 | **`world-atlas-sentinel-gold` bolted onto `heimerdinger-renata-remote-score`** to lift its self-declared ceiling ("The Power runs out first") | It moves the bottleneck without raising the number. Body/Mind is legal (Atlas Mind, Sentinel Mind, Heimerdinger Mind, Renata Mind, Acceleration Gate Mind/Body), and twelve Gold really does cover the Power. But the **Energy** then binds: 12 runes are 12 Energy, and one Acceleration Gate (3) plus two Renata activations (8) is already 11. Four activations would need 25 Energy. Two to three points a turn — **exactly** what the existing entry already claims. A notable at best, not an entry. |
| R8 | **`UNL-018 Yeti Brawler` + Power Nexus** as a Gold feed | Two Gold per conquer against a Nexus firing that costs four Power is one firing every second turn, and the Gold arrives exhausted (187.5 + 315.1 preceding 315.2). `yeti-brambleback-renata-gold` already holds the Yeti's Gold line. Folded into `tryndamere-hextech-gauntlets-enforcer` as a notable second attacker instead. |

## 14. Further facts for `CLAUDE.md`

7. **`356.6` ("Energy and Power costs can't be reduced below 0") makes `UNL-188 Hextech Gauntlets`
   free on any body of 3 Might or more**, because its Equip Energy is "reduced by the Might of the unit
   you choose". The gear's own payoff is +3 Might = +3 excess damage under R28 = A, so the cheapest
   place to put it is the biggest body — which is also the body with the highest excess threshold to
   clear. `OGN-034 Tryndamere` at M8 goes to M11 for one rainbow.
8. **An ability that Empowers reaches units, not only gear, and `VEN-089 Wild Claw` is the case that
   matters.** The #153 fact (441.1: Empowering is the *act*; the printed [Empower] cost is never
   determined, so 827.1.c.3 is silent) had only ever been applied to `VEN-062 Hextech Formula` →
   `VEN-018 Rage Amplifier`. Wild Claw tutors from the top five, plays for E−5 **and** Empowers,
   permanently (441.2, no "disempower at end of turn" clause — `VEN-035 Sanction` is the card that has
   one). It collapses `VEN-046 Nasus, Ascended` from 16 Energy across two turns to 10 in one Main Phase.
   `VEN-089` and `VEN-163 Risen Altar` were both in zero entries; the Altar is the wrong tool, since it
   discounts a cost this route never pays.
9. **A reveal or look samples a 39-card deck, not 40.** 103.2 counts the Chosen Champion inside the 40
   and 103.2.a.1 puts it in the Champion Zone before play. For k copies in the top five,
   `1 − C(39−k,5)/C(39,5)` = 12.8 % / 24.3 % / 34.5 % for k = 1 / 2 / 3.
10. **Re-run the near-duplicate check against the CURRENT `data/combos.json` immediately before
    staging, keyed on the sorted card set, not on the id.** Parallel walks merge while you write:
    `shen-blue-sentinel-exact-hold` was authored, validated and withdrawn because
    `shen-kinkou-sentinel-hold` (same two cards, same finding) landed an hour earlier. §11 has the
    one-liner.

---

## 15. Correction to §3 — the reclass ledger lost a battlefield to its own Deathknell

The first draft of the `renata-time-warp-ekko-refresh` reclass was **rejected in review** on a rule the
ledger never mentioned, and the hole is worth writing down because every earlier walk of this entry
had the same blind spot.

> **323.6.** 4. Players lose control of any controlled Battlefields without their Units occupying them
> if the turn is in an Open State and there is no Showdown or Combat ongoing there.
> **190.4.a.** If a player controls Units at a Battlefield, outside of Combat, they maintain Control of
> that Battlefield for as long as they have Units at that Battlefield.
> **190.4.c.** If a player has no Units at a Battlefield and the turn is in an Open state, they lose
> Control of that Battlefield in the following cleanup unless there is a Combat or Showdown ongoing there.

The line garrisons the two Duel battlefields with **Renata on one and Ekko on the other**, and then
**kills Ekko on the casting turn** for his Deathknell. Hidden Blade resolves in a Main Phase Open State
with no combat anywhere, so the very next Cleanup runs 323.6 and Ekko's battlefield is uncontrolled.
The first Additional Turn then Holds **one** battlefield, not two:

| | with the hole | fixed |
|---|---:|---:|
| Casting turn: Hold ×2 + Renata | 3 | 3 |
| First Additional Turn: Hold | **1** (+1) | **2** (+2) |
| running total entering its Main Phase | **4** | **5** |
| Chem-Baroness bonus (needs 5) | **off** | **on** |
| Time Warp #2 | 4 Energy short | cast |
| final | **5 or 6** | **8** |

Every earlier walk of this entry considered losing a battlefield **to the opponent**. None considered
losing one **to the entry's own Deathknell**.

**The fix, priced.** `SFD-159 Trusty Ramhound` — Order, **E2 M2**, *"While you have another unit here,
I have +1 :rb_might:."* — stands beside Ekko. 190.4.a then maintains Control through the kill, and its
own clause is +1 Might for exactly as long as Ekko is next to it. Two Energy, no Power, one card. It is
in `uses`, not in `notable`, because without it the line is five points rather than eight.

Two alternatives considered and rejected as more expensive:

- **Park Ekko at the base and kill him with `SFD-163 Deathgrip`** (Order, E2, [Reaction], *"Kill a
  friendly unit"* — no location clause, so unlike Hidden Blade it does reach the base). Then *both*
  battlefields need other bodies: two new cards instead of one, and 2 Energy on the casting turn
  instead of Hidden Blade's 0. Recorded on the entry as the fallback it already was.
- **Nothing at all**, on the theory that the garrisons survive because the opponent never acts. They
  do — 735 and 737 mean no opponent turn intervenes — but 323.6 is a **Cleanup**, not an opponent
  action, and it fires on your own turn.

**The same hole is in the pre-reclass entry.** Its two-turn count of *"about 5"* assumed the extra turn
Holds *"up to two in a Duel"* while Ekko was one of only two garrisons. The honest ENGINE figure was
**4**, not 5. The Ramhound repairs both counts, which is one more reason it belongs in `uses` rather
than in prose.

**Lesson, general:** when a line kills its own permanent, check what that permanent was holding.
`323.6` / `190.4.c` fire in the next Cleanup of your own turn, with no opponent input at all.

---

## 16. `draven-rebuke-bloodless-combat` (ENGINE, Fury/Chaos)

The #118 walk recorded the *"[Action] spell that removes a unit at a battlefield"* family (18 cards) as
**a synergy shape** and named no combo for it. This is the attacker-side instance, and the payoff it
reaches was already in the catalogue **with its own weaknesses written into its prerequisites**:

> `draven-glorious-executioner-point` notable[0]: *"This engine DEPENDS ON THE OPPONENT. Winning a
> combat needs a combat … Against a board that never garrisons, Draven scores zero."*
> notable[2]: *"he dies to a bigger garrison and hands the point over."*

`OGN-172 Rebuke` (Chaos, E2 P2) — *"[Action] (Play on your turn or in showdowns.) Return a unit at a
battlefield to its owner's hand."* — answers both, and was in **zero** entries.

**The window is inside the combat, not before it**, which is what makes it work where the #58
evacuation window would not:

> **464.2.f.1.** Otherwise the Combat Showdown continues, with the State Open as normal.
> **464.2.g.** Players proceed with any play on the Chain as normal.
> **465.1.** **If both Attacking and Defending units remain at this battlefield**, the following Tasks
> become Outstanding, in the specified order:

Draven takes the Attacker designation *first*, then the removal empties the other side, and 465.1's
gate means the damage step never becomes Outstanding at all. Then:

> **466.3.a.** A Player has won a combat if they received either the attacker or defender designation
> and are the only Player that has units remaining at this battlefield during this step.
> **466.5.** 1. If no Showdown or Combat is staged at this location, the player with Units remaining
> here Establishes Control if they didn't already control this Battlefield.
> **466.5.d.** Establishing Control results in a Conquer if that player has not yet scored this Battlefield…

**Two points and a card per attack**: Draven's ability Gain (194.1.c, R2 = A), the Conquer Score
(469.1, 471.1) and the legend's draw. And Draven takes **no damage**, so his own *"When I die in
combat, choose an opponent. They score 1 point"* never fires — a different mechanism from the
heal/exhaust/recall shields of 808.1.d.1, and one that leaves no Deathknell question because nothing
dies.

**The honest limit** is that Rebuke returns **one** unit. Against two defenders 465.1's gate opens
after all, 465.2.c sums Might and 465.2.c.3 forces lethal onto one body first, so a 6-Might Draven
against a garrison summing 6+ dies and hands over the point. Two Rebukes is 4 Energy + **four** Chaos
Power against the 12-rune ceiling. `VEN-106 Wind and Ghosts` (Chaos, E3 P1, banish at ≤3 Might else
bounce) is the same effect at one Power instead of two and is also in zero entries — an alternative,
not an addition, so it is a notable.

## 17. Facts for `CLAUDE.md`, continued

11. **When a line kills its own permanent, check what that permanent was holding.** `323.6` and
    `190.4.c` strip Control of a battlefield with none of your units on it **in the next Cleanup of your
    own turn**, with no opponent input; `190.4.a` is the converse and is satisfied by any second body.
    `renata-time-warp-ekko-refresh` kills Ekko for his Deathknell and every walk of it since 2026-09-04
    counted a Hold on the battlefield he was the sole garrison of — the honest two-turn ENGINE figure
    was 4, not "about 5", and the three-turn CHAIN needs `SFD-159 Trusty Ramhound` (Order, E2) beside
    him to be worth 8 rather than 5.
12. **`465.1` gates the whole damage step on both sides still being present**, and `464.2.f.1` /
    `464.2.g` leave the Combat Showdown Open for [Action] plays *after* the Attacker designation. So an
    [Action] removal that empties the defending side wins the combat by `466.3.a` and Conquers by
    `466.5` / `466.5.d` **with no damage assigned at all** — the attacker cannot die, so no Deathknell,
    no "when I die" drawback and no `808.1.d.1` question ever arises. This window is strictly wider
    than the #58 pre-open evacuation window, which required the spell to be cast *before* the entering
    move. `OGN-172 Rebuke` and `VEN-106 Wind and Ghosts` were both in zero entries.

---

## 18. `SFD-177 Azir, Sovereign` + The Grand Plaza — REFUSED, with the arithmetic

My own open lead from §9, walked as a combat rather than as a Hold. **It does not become an
ALT_WIN entry**, and the reason is arithmetic rather than a rules block.

The existing `azir-sovereign-token-gather` (ENGINE) already carries the two rules that matter — it
cites `464.2.c.3.a` for the dragged tokens becoming Attackers, and its notable[5] already says *"FOR A
GRAND PLAZA FINISH IT IS A TWO-TURN ROUTE, NOT A REMATE."* What no walk had done is **count**.

> **464.2.c.3.a.** If a Unit controlled by the Attacker or Defender becomes present at this Battlefield
> after this moment, it will gain the Attacker or Defender designation during the Cleanup phase
> following the action that caused it to become present, as appropriate for its controller.
> **465.2.c.** Starting with the Attacker, each player assigns an amount of damage equal to their
> summed Might among the other's Units.
> **465.2.c.3.** Units must have lethal damage assigned to them in full before damage is assigned to a
> different Unit.

So the tokens Azir drags in are **Attacking Units by the damage step**, and the defender assigns their
summed Might `D` among them. A 1-Might Recruit dies to 1 damage (465.2.c.4 caps assignment at the
minimum needed), so **`D` damage removes `D` bodies**. With `K` tokens dragged in, the survivors at the
Plaza are `1 + K − D` (Azir plus the rest), and the Plaza wants **seven**:

> **K ≥ 6 + D**

and those survivors then have to live through the opponent's whole turn, because the Plaza pays on your
**next** Beginning Phase (315.2.b.2), not on the Conquer. Against a single 4-Might defender that is
**ten** token units dragged in, every one of which `OGN-133 Flurry of Blades` (Body, E1, [Reaction],
*"Deal 1 to all units at battlefields"*) then sweeps for one Energy.

**Two more findings that shrink Azir's niche further, and neither was written down before:**

1. **His unique value is not "base-bound tokens" but "EXHAUSTED tokens."** `143.4` makes units enter the
   Board exhausted, and `144.2` makes the Standard Move cost that exhaust — but `315.1.b` readies
   everything each Awakening, so tokens banked on an *earlier* turn are ready and can walk in
   themselves. And `144.3` makes a mass Standard Move **one game action** with a shared destination
   (144.3.a), while `144.4.a.1`'s arrivals cap is unsatisfiable in a two-player game (#111). So a ready
   token army needs no Azir at all. He is worth exactly the tokens made *this* turn.
2. **`UNL-077 Soul Shepherd` is the card that would fix the arithmetic, and it is not an Azir card.**
   Mind, E5 M3, *"Your token units have +1 Might"* — a continuous modifier, not a 702 Buff, so 702.3's
   one-per-unit cap never touches it and it applies to every token at once. At 2 Might the swarm needs
   `2` damage per body (465.2.c.3), halving the combat losses to `⌊D/2⌋`, **and it is immune to Flurry
   of Blades.** That is a fix for the *entire* 1-Might Plaza family — `grand-plaza-recruit-vanguard`,
   `plaza-armory-miss-fortune`, `heimerdinger-armory-plaza`, `herald-heimerdinger-armory-plaza`,
   `ready-recruits-grand-plaza` — every one of which names Flurry of Blades or is silently exposed to
   it. **Handed to the manager as a notable for those entries rather than authored as a 24th Plaza
   entry**, since it differs from each of them by one protective card.

**Verdict:** Azir + Grand Plaza is strictly worse than the twenty-three catalogued Plaza lines whenever
you can control the Plaza yourself (355.2.a lets you play tokens straight to it, for free), and it is
the only route when the opponent holds it — at a price of `6 + D` tokens plus an opponent turn. The
existing ENGINE entry's verdict stands and is now backed by the count.

---

## 19. The rest of the #118 `[Action]`-removal family — one refutation and three entries

`draven-rebuke-bloodless-combat` (§16) was the first attacker-side instance. Walking the rest of the
family produced one refutation that removes a third of it outright, and three entries whose numbers
genuinely differ.

### 19.1 REFUTED: **no `[Hidden]` removal can ever play the attacker-side role**

This looked like the best half of the family — `OGN-256 Fox-Fire` kills *multiple* units and costs
**zero** from hidden. It cannot work, and the rule is the definition of the keyword itself:

> **811.1.b.** It is functionally short for *"While this card is in your hand or in your Champion Zone
> on your turn during an Open State, you may pay [A] to hide this facedown **at a battlefield you
> control** that doesn't already have a facedown card hidden there for as long as you control that
> battlefield…"*
> **811.1.d.2.** If a hidden spell or a play effect of a hidden permanent chooses any targets, those
> targets must be chosen from among options **at that battlefield**, unless the ability explicitly
> restricts targeting in a way that makes this impossible.

A hidden card lives at a battlefield **you control** and its targets are pinned there. The battlefield
you are *attacking* is by definition not one you control (190.3.a.1, 464.2.c.1), so a hidden removal can
never reach the garrison you are trying to clear. That refuses `OGN-256 Fox-Fire`, `OGN-213 Hidden
Blade` and `OGN-094 Sprite Call` from the attacker side.

The **defender-side** version does work — the opponent attacks a battlefield you control, Fox-Fire is
hidden right there, and clearing their force for 0 Energy means 465.1 never opens the damage step. But
per the #118 walk that is *"a DEFENSIVE payoff, not a point"*: you keep the battlefield you already had,
and `466.5` only establishes Control *"if they didn't already control this Battlefield"*. No entry.

### 19.2 The one trap the whole shape hides: **a bloodless conquer generates ZERO excess damage**

R28 = A makes excess damage *attacking Might that was never assigned*, and `465.1` means **nothing is
assigned at all**. So every card reading *"if you assigned N or more excess damage"* is switched off by
the very removal that wins the combat: `OGN-034 Tryndamere`, `SFD-120 Sivir`, `UNL-018 Yeti Brawler`,
`UNL-187 Piltover Enforcer`, `UNL-188 Hextech Gauntlets`, `UNL-217 Trapping Grounds`. The
bloodless-conquer family and the excess-damage family are **mutually exclusive in principle**, not
merely by domain — which is why §12.1's Tryndamere entry and §16's Draven entry are opposite designs.

### 19.3 `wind-and-ghosts-nasus-bloodless-conquer` (ENGINE, Calm/Chaos)

`VEN-106 Wind and Ghosts` (Chaos, E3 P1) was in zero entries: *"Choose a unit at a battlefield. If it
has 3 Might or less, banish it. Otherwise, return it to its owner's hand."* Unconditional either way, at
**one** Power against Rebuke's two, and the banish half is permanent (108.6.c returns nothing from
Banishment).

Paired with the **conquer** half of the payoff inventory rather than the win-combat half:
`VEN-046 Nasus, Ascended`'s `[Empowered][>] When I conquer, you score 1 point` has no once-per-turn
clause and no threshold, so it is the payoff that *survives* §19.2's trap. Two points per attack, and an
8-Energy `[Deflect 2]` body is never assigned damage — 809.1.c/809.1.d already taxed spell removal, and
465.1 closes the combat route too. Empower routes in this shell: his own 8 Energy (permanent, 441.2) or
`VEN-035 Sanction` (Calm, E3 P1) for the turn; `wild-claw-nasus-ascended-empowered` is Body/Calm and
cannot share it (103.1.b.4).

### 19.4 `alpha-strike-wuju-master-garrison-clear` (ENGINE, Calm/Body)

`UNL-192 Alpha Strike` (Calm/Body, E3 P1) was in zero entries and is the **only multi-kill in the
family**: *"Choose a friendly unit. It deals damage equal to its Might split among enemy units at
battlefields. Then for each unit this kills, do this: Gain 1 XP."* Every other member takes exactly one
unit. Two facts a reader would otherwise re-derive:

- **The damage source has no location restriction** — only the *targets* are "at battlefields". So a big
  body at your base is the gun and a cheap unit takes the Attacker designation, which inverts every
  other line in the family, where the attacker has to be the payoff too.
- **`enemy units at battlefields` is plural**, so leftover Might spills onto the other Duel battlefield
  (485.4) while a combat is resolving — something no single-target removal can do.

It is a **Signature** card tagged Master Yi, so 103.2.d.2 forces `UNL-191`/`UNL-231 Wuju Master`
(Calm/Body; the third Master Yi legend, `OGS-019 Wuju Bladesman - Starter`, is `[BANNED 2v2:restricted]`),
and three copies spend the whole 103.2.d.1 budget of three Signature cards. The XP it makes is a pure
faucet into that same legend's `[Level 6]` and `[Level 11]` — safe, because 824.1.d turns a Level
ability off the moment you hold less than N XP and 730.2 makes *spending* XP your own reduction.

### 19.5 `noxian-guillotine-legion-bloodless-fork` (ENGINE, Fury/Order)

`OGN-254 Noxian Guillotine` (Fury/Order, E4 P1, Signature/Darius) was in zero entries and is authored as
a **fork**, because its two printed modes point in opposite directions once §19.2 is understood:

| mode | what happens | points |
|---|---|---:|
| `[Legion]` — *"Kill it now instead"* | defender gone before 465.1; no damage assigned either way | **1** (the Conquer), body intact |
| decline `[Legion]` — *"Kill it the next time it takes damage this turn"* | damage step runs; Tryndamere assigns his 8 Might; the remainder is excess | **2** (Conquer + Tryndamere), body exposed |

The slow mode is also what kills a defender Tryndamere *cannot* kill outright, since *"the next time it
takes damage"* needs only non-zero damage (143.2.a), not lethal damage. Rule of thumb printed by the
arithmetic: garrison summing 3 or less → decline `[Legion]`, take 2; garrison summing 8 or more → take
`[Legion]`, keep the body.

It **can never share a list with `tryndamere-hextech-gauntlets-enforcer`** even though both are
Fury/Order and both run `OGN-034` — 103.2.d.2 makes the Guillotine force a **Darius** legend
(`OGN-253`/`OGN-302 Hand of Noxus`, two base codes and one name) while that entry forces `UNL-187
Piltover Enforcer`, a Vi legend. One legend per deck; they are alternatives.

Two smaller number differences recorded on the entry: the Guillotine says *"Choose a unit"* with **no
"at a battlefield" clause**, unlike Rebuke, Blast of Power and Drag Under, so it also reaches a unit at a
base; and the forced legend's own `[Legion]` Add is live on exactly the turns the Guillotine's is
(429.2, 429.3).

## 20. Facts for `CLAUDE.md`, continued

13. **No `[Hidden]` card can remove a garrison you are attacking.** `811.1.b` hides a card *"at a
    battlefield you control"* and `811.1.d.2` pins its targets there; the battlefield you attack is by
    definition not one you control. That refuses `OGN-256 Fox-Fire`, `OGN-213 Hidden Blade` and
    `OGN-094 Sprite Call` from the attacker side of the #118 removal family, however cheap they look
    (Fox-Fire is 0 Energy from hidden and kills *several* units). The defender-side use is real but is a
    defensive payoff, not a point — `466.5` establishes Control only *"if they didn't already control
    this Battlefield"*.
14. **A bloodless conquer generates ZERO excess damage, so it blanks the whole excess-damage family.**
    `465.1` gates the damage step on both sides still being present; R28 = A defines excess as attacking
    Might that was never *assigned*. `OGN-034`, `SFD-120`, `UNL-018`, `UNL-187`, `UNL-188` and `UNL-217`
    all read *"if you assigned N or more excess damage"* and none of them fires. The removal-conquer and
    excess-damage families are mutually exclusive in principle, not only by domain.
15. **Azir, Sovereign's real niche is EXHAUSTED tokens, not base-bound ones**, and the Plaza arithmetic
    is `K ≥ 6 + D`. `315.1.b` readies tokens banked on an earlier turn and `144.3`/`144.3.a` let a whole
    army take one Standard Move to a shared destination, so a ready swarm needs no Azir; and
    `464.2.c.3.a` makes the tokens he drags in *Attacking Units*, so the defender's summed Might `D`
    kills `D` of them at 1 Might each (465.2.c, 465.2.c.3, 465.2.c.4). `UNL-077 Soul Shepherd` (Mind,
    E5 M3, *"Your token units have +1 Might"*) is a **continuous modifier, not a 702 Buff**, so it
    applies to every token at once, halves those losses, and makes the whole 1-Might Plaza family immune
    to `OGN-133 Flurry of Blades` — a notable worth adding to every Plaza entry whose bodies are Recruits.

---

## 21. The `conquer-engine` group — #155's other unpaired half

Issue #155 sent the whole `conquer-engine` group (7 entries at the time, 24 now) to The Grand Plaza and
never asked the simpler question: **what pays for the conquer itself?** Every entry in the group ends at
some version of *"it relocates bodies and conquers"* and none of them names a card that converts that
conquer into more than the baseline 469.1 Score.

Crossing the group against the four conquer payoffs in the master inventory
(`OGN-034 Tryndamere`, `UNL-177 Ivern`, `VEN-046 Nasus`, `VEN-065 Swain`, plus the multiplier
`UNL-029 Red Brambleback`) by Domain Identity gives a wide table, but **most of it is a mirage**, and
§19.2 is why: an evacuation conquer, like a bloodless combat conquer, **assigns no damage at all**.

| payoff | fires on an evacuation conquer? | why |
|---|---|---|
| `VEN-046 Nasus, Ascended` (Calm) | **yes** | *"When I conquer"*, no threshold, no combat required |
| `UNL-177 Ivern` (Order) | yes, but | needs all four of Bird/Cat/Dog/Poro among your units — a package, not a card |
| `VEN-065 Swain` (Mind) | yes, but | needs a non-token unit, a non-token gear **and** a spell played that turn |
| `OGN-034 Tryndamere` (Fury) | **no** | *"after an attack"* and *"if you assigned 5 or more excess damage"* — no attack, nothing assigned |
| `SFD-148 Draven, Audacious` (Chaos) | **no** | *"the first time I win a combat"*, and 466.3.a needs a combat to have happened |

So the group has exactly **one** clean payoff, and it is Nasus.

### `charm-nasus-evacuation-conquer` (ENGINE, mono-Calm)

`charm-evacuate-conquer` is the cheapest entry in the group — one Calm spell, `OGN-043 Charm`
(E1 P1, *"Move an enemy unit"*) — and its own `terminatesIn` is *"one point per casting, bounded by the
3 copies of 103.2.b and by 470"*. Nasus is mono-Calm, so the pairing costs **one card** and doubles the
rate: every casting becomes the Conquer (a 469.1 Score) **plus** Nasus's `[Empowered][>] When I conquer,
you score 1 point` (a 194.1.c Gain, which R2 = A keeps outside 470's cap). Three Charms is six points
rather than three, and a Hold point each Beginning Phase he keeps the battlefield.

The second half of the mechanism is the one #102 had to establish and it is quoted on the entry:
evacuating **is not yet a Conquer**. 323.6 only strips the opponent's Control; the point needs Nasus to
walk in during the Main Phase (144.4.a), apply Contested (190.3.a.1), open a Showdown (344.2) and take
Control at its close (348.2.a), where 348.2.a.1 says outright *"This results in a Conquer."*

**No combat happens at any point**, which is worth three separate things and is why Nasus rather than
Tryndamere: he is never assigned damage, no Attacker designation is ever created so the
empty-battlefield trap is *respected* rather than worked around, and the zero-excess consequence of
§19.2 applies in its strongest form.

Charm moves **one** unit, so the line closes only against a garrison of one — the same limit
`charm-evacuate-conquer` already carries, restated rather than hidden.

### Correction applied before staging

`VEN-106 Wind and Ghosts` was in zero entries when §19.3 was walked. While this batch was being
written, a parallel session merged **`moonlight-affliction-wind-and-ghosts-banish`** (`UNL-066` +
`VEN-106`), which uses the same spell as *permanent removal* behind an unfloored −10 Might reduction.
Different mechanism, different card set, different domain pair, and it never enters a combat — the two
coexist, but the "zero entries" claim was stale by the time it would have been merged and is now
corrected on the entry, with a notable naming the other line. **This is the third time in one session a
parallel walk has moved the ground under a claim of the form "card X is in no entry."** Fact 10 in §14
already says to re-run the card-set check immediately before staging; it should say to re-run the
*single-card* coverage check too.

## 22. Facts for `CLAUDE.md`, continued

16. **An evacuation conquer and a bloodless combat conquer both assign zero damage, which leaves
    `VEN-046 Nasus, Ascended` as the only clean payoff for the whole `conquer-engine` group.**
    `OGN-034 Tryndamere` needs an attack *and* 5 excess damage; `SFD-148 Draven, Audacious` needs a
    combat to have been won (466.3.a); `UNL-177 Ivern` needs the four-tag package and `VEN-065 Swain`
    needs three card types played the same turn. Nasus's trigger is bare *"When I conquer"*, which is why
    he appears in three different removal/evacuation shells (Body/Calm, Calm/Chaos and mono-Calm) that
    can never share a list.
17. **A "card X is in zero entries" claim goes stale within the hour when walks run in parallel.**
    Re-run *both* checks immediately before staging: the sorted-card-set duplicate check (fact 10) and
    the single-card coverage check for every card you claim is uncatalogued. Three claims in this session
    were overtaken — `VEN-138 Shen` (whole entry withdrawn), `SFD-168 + OGN-111 + OGN-293`
    (`heimerdinger-armory-plaza` landed as a subset of a merged entry) and `VEN-106 Wind and Ghosts`
    (corrected in place).

---

## 23. `yasuo-remorseful-svellsongur-nasus-conquer` — the repeatable bloodless conquer

`svellsongur-yasuo-remorseful-sweep`'s own `terminatesIn` is *"engine — repeatable removal; it scores
nothing except by clearing a garrison so the Conquer happens"*, and the card that pays for that Conquer
was never named. It is Nasus, and mono-Calm, so the pairing costs **one card**.

What separates it from the three `[Action]`-removal entries of §16 and §19: those spend a **card** per
attack and 103.2.b caps them at three a game. Here the removal is a **permanent**. `383.4.e` fires an
attack trigger when a unit *"gains the Attacker designation for the first time during a combat"*, and
`464.2.c.3` places that designation in **step 1** of the Combat Showdown — so it resolves before
`465.1` (step 2) asks whether both sides remain. The garrison is already dead, nothing is assigned in
either direction, and it repeats every turn for no card and no Energy.

Arithmetic stated rather than bought: Svellsongur **composes** (issue #45 — 434.1.c gives the Top-Most
Card all the Effect Text of all attached cards, 477.2.c appends in Layer 2, 476.1 applies each effect
once per sequence), so `v` copies give **2^v** instances, not `1 + v`. One copy is two instances at
6 damage each (M+0 leaves Yasuo at 6), which clears a garrison of two; quantity 1 is chosen deliberately
over the source entry's three. And `144.3` is what lets Nasus ride in free — multiple Standard Moves are
**one game action** with a shared destination (144.3.a) and simultaneous exhaust costs (144.3.c), and
`464.2.c.3` designates every unit of yours at the battlefield, so both conquer.

This is also the honest close of #155's refusal 2, which I agree with as far as it goes: Tryndamere
really is a threshold rather than a scale, and that is beside the point — a removal engine converts
through the **Conquer**, and the bloodless conquer it produces is exactly what switches Tryndamere off.

---

## 24. The INFINITE × payoff lens, re-measured — #63's table is out of date

Issue #63 priced the 12 INFINITE engines against the payoffs known on 2026-09-05 and reported, in §3.2,
that **only 2 of 12** had a domain-legal point route connected in the `needs`/`produces` DAG. That number
has moved twice since — once when #64 merged the orphan `infinite-recruits` feature into
`token-body-engine`, and again tonight. **Re-measured rather than assumed**, by running
`generateVariants` over the current catalogue and counting, per engine, the variants headed by a
`BURST`, `CHAIN` or `ALT_WIN`:

| | engines | with a connected scoring route |
|---|---:|---:|
| #63, 2026-09-05 | 12 | 2 |
| current catalogue (333 entries) | 14 | **9** |
| with this batch's entry | 14 | **11** |

The five that measured zero before this batch, and what each one actually is:

| engine | identity | verdict |
|---|---|---|
| `renata-mastermind-points` | mind/order | **not a gap** — it *is* the payoff (`produces: ability-points, win-the-game`) |
| `renata-bubble-bot-ready` | mind | **not a gap** — same, an activation engine for Renata |
| `jayce-mesmerize-renata` | mind | **not a gap** — same |
| `threshold-reveler-infinite-energy` | **calm/fury** | **real gap → §24.1** |
| `reveler-svellsongur-jhin-infinite-power` | **calm/fury** | **real gap → §24.1** |
| `lady-luminosity-loop-comet` | mind/order | **real gap → refused in §24.2** |

### 24.1 `reveler-loop-nasus-brambleback-conquer` (BURST, calm/fury)

**Why Calm/Fury was starved, and it is structural rather than an oversight.** Every in-turn repeatable
point ability in the pool is **Mind** — `SFD-088 Renata Glasc, Mastermind` is the only one at all (#63
§2), `OGN-122 Time Warp` is Mind, `VEN-067 Bottled Constellation` is Mind. Everything else in the payoff
inventory hangs on a **Hold** or a **Conquer**. And `315` puts the Hold in the Beginning Phase, which is
*before* `316` — while `167` empties both pools at the end of the turn, so a loop's unbounded Energy
exists **only in the Main Phase**. Therefore:

> For a Calm/Fury loop, the **Conquer is the only window its Energy can be spent into.**

`nasus-ascended-brambleback-conquer` (BURST, `needs: []`) is exactly that window and is already verified:
`1 + N × (1 + K)` with N = 2 Empowered Nasus and K = 3 Red Bramblebacks is **nine points in one
Conquer**, and Nasus is Calm while Red Brambleback is Fury. Nobody had connected it.

Combo-turn ledger, item by item: two Nasus are on the board from an earlier turn (143.4 + 144.2 — he has
no [Accelerate], so he cannot be played and moved the same turn); Empower both for 8 Energy each, which
works on an exhausted body because the `[Empower]` cost carries no exhaust, and 441.2 makes it permanent;
play three Red Bramblebacks paying `[Accelerate]` so they enter ready (143.4.a) at `3 × (4+1) = 15`
Energy and `3 × (1+1) = 6` Fury Power; move all five in as one action (144.3). **31 Energy and 6 Fury
Power on the combo turn**, all of it free out of the loop.

`needs` is **`infinite-energy` alone, deliberately**: the 6 Fury Power fits inside the 12-rune ceiling
(161.2.a, with 164.2.b carrying no exhaust so a rune tapped for Energy still pays Power). Declaring
`infinite-power` as well would have connected only `reveler-svellsongur-jhin-infinite-power` and left
`threshold-reveler-infinite-energy` — which produces Energy only — at zero routes again. Verified by
re-running the measurement on the merged copy: **both** engines now show one route, and the zero-route
count drops from six to four.

Authored as a second entry over `nasus-ascended-brambleback-conquer`'s card set on the precedent the
catalogue already set: `dragonstorm-brambleback-trinity-conquer` and `brambleback-trinity-skyfall-conquer`
carry **identical** `uses` and are two entries because one declares `needs` and the other does not.

### 24.2 REFUSED: `lady-luminosity-loop-comet` → any payoff

Unbounded `repeatable-removal` in mind/order — one Falling Comet (6 damage) every four Energy passes,
forever. It has no consumer and it should not have one, for a reason that is arithmetic:

**Unbounded removal is worth exactly the same as bounded removal, because the thing it buys is capped.**
Removal clears a garrison so that a Conquer can happen; `469.1` defines a Conquer as gaining Control of a
battlefield *"they did not yet Score this turn"*, `470` caps Scoring at once per battlefield per turn,
and `485.4` puts **two** battlefields on a Duel table. So the ceiling is **two conquers a turn** whether
you fire one comet or a thousand — the third comet buys nothing, and the thousandth buys nothing. The
same wall stops it reaching a Hold payoff: `315.2.b.2` Holds every battlefield you control once, in a
phase that is over before the Main Phase where the loop runs.

The engine is real and its entry is correct; what it produces simply is not a scoring resource. This is
the same shape as #155's refusal of the whole `repeatable-removal` group, now demonstrated on the
richest removal engine in the catalogue rather than argued from the payoff inventory.

## 25. Facts for `CLAUDE.md`, continued

18. **Every in-turn repeatable point ability in the pool is Mind**, and every other payoff hangs on a
    Hold or a Conquer. Because `315` puts the Hold before `316` and `167` empties the pools at end of
    turn, **a loop's unbounded Energy exists only in the Main Phase — so for a non-Mind loop the Conquer
    is the only window it can be spent into.** That is why Calm/Fury had two INFINITE engines with zero
    point routes until `nasus-ascended-brambleback-conquer`'s `1 + N × (1 + K)` was connected to them.
19. **Unbounded removal is worth the same as bounded removal.** `469.1` + `470` + `485.4` cap a Duel at
    two conquers a turn, so the third comet of `lady-luminosity-loop-comet` buys nothing. A
    `repeatable-removal` engine converts through the Conquer, and the Conquer is capped — which is the
    measured form of #155's refusal 2.
20. **#63's §3.1 and §3.2 are superseded.** The `infinite-recruits` orphan was merged into
    `token-body-engine` by #64, and the count of INFINITE engines with a connected domain-legal scoring
    route went 2/12 → 9/14 → 11/14. Re-run the measurement (`generateVariants`, then filter variants
    headed by BURST/CHAIN/ALT_WIN per engine) before citing that table again.

---

# 26. Session wrap — rc-walk-payoff, 2026-09-06

Verified against `data/combos.json` at 340 entries: **all 16 entries authored here are merged**, and
`renata-time-warp-ekko-refresh` is in the tree as `CHAIN` carrying `SFD-159`.

## What shipped

| | count |
|---|---:|
| Entries authored and merged | **16** (12 ENGINE, 2 CHAIN, 1 ALT_WIN, 1 BURST) |
| Entries authored and **withdrawn** | 1 (`shen-blue-sentinel-exact-hold`, §11) |
| Existing entries rewritten | 1 (`renata-time-warp-ekko-refresh`, ENGINE → CHAIN, §3 and §15) |
| Refusals recorded with the paragraph that kills them | **11** |
| Facts handed to `CLAUDE.md` | **20** |

**The entries**, by the lens that produced them:

- *#155 candidate 1, rebuilt* — `power-nexus-atlas-sentinel-gold`,
  `power-nexus-atlas-sentinel-time-warp`, `power-nexus-benefactor-sentinel-time-warp`,
  `power-nexus-sentinel-renata-mastermind`
- *#155 candidate 2* — `herald-heimerdinger-armory-plaza`
- *#155's under-rated payoff* — `armory-heimerdinger-bottled-constellation`
- *#154 core 1* — `first-mate-lucian-merciless-double-conquer`
- *#155's refused groups, reopened from the other side* — `tryndamere-hextech-gauntlets-enforcer`,
  `wild-claw-nasus-ascended-empowered`
- *the #118 `[Action]`-removal family* — `draven-rebuke-bloodless-combat`,
  `wind-and-ghosts-nasus-bloodless-conquer`, `alpha-strike-wuju-master-garrison-clear`,
  `noxian-guillotine-legion-bloodless-fork`
- *the conquer-engine group* — `charm-nasus-evacuation-conquer`,
  `yasuo-remorseful-svellsongur-nasus-conquer`
- *the INFINITE × payoff lens* — `reveler-loop-nasus-brambleback-conquer`

## The three findings that travel furthest

1. **`316.2` orders the Main Phase's tasks — the sweep (316.3) is *first*, start-of-Main-Phase effects
   (316.4) are *second*.** So `UNL-087 Blue Sentinel`'s `[Add]` survives `167`. Nine catalogued entries
   used that card and none of them spent the Power. It is what pays for Time Warp in §1 and for Renata
   in §4.
2. **`"pay X **to** Y"` is a Triggered Ability's *base cost*, paid to finalize it onto the Chain
   (383.3.b / 383.3.b.1); `"pay X. **If you do,** Y"` is a game action at resolution (205).** Riot gives a
   worked example of each. Consequence: Power Nexus is paid at finalization, and since 383.3.d places every
   simultaneous Hold trigger before any resolves, **Gold made by the same Hold can never pay it** — not
   even under R25 = A.
3. **A conquer taken without a damage step generates zero excess damage**, so it blanks all six
   excess-damage cards. The removal-conquer family and the excess-damage family are mutually exclusive
   *in principle*, not merely by domain — which is why `tryndamere-hextech-gauntlets-enforcer` and
   `draven-rebuke-bloodless-combat` are opposite designs by the same author on the same night.

## Corrections made, to others' work and to my own

**To the hunts:** #155's master payoff inventory holds (I re-grepped all 79 lines), but it omitted four
non-converters and under-rated `VEN-067 Bottled Constellation`; its refusal 7 named two entries as
multi-domain that are **mono-Body**, so Time Warp is legal there (verdict survived, reason did not);
#154's core-1 sequence had Lucian played and moved on the same turn, which 143.4 + 144.2 forbid; and
#63's §3.1/§3.2 are **superseded** — 2/12 became 9/14 became 11/14.

**To my own:** the first reclass draft lost a battlefield to its own Deathknell (323.6 fires on *your*
Cleanup, not the opponent's) and needed `SFD-159` in `uses`; my flag against `heimerdinger-armory-plaza`
was wrong, because 143.4 exhausts only units so the Armory fires the turn it lands; and a
"`VEN-106` is in zero entries" claim went stale mid-batch and was rewritten before staging.

## The process lesson, stated once

**Three claims of the form "card X is in no entry" were overtaken by parallel walks inside one
session** — `VEN-138 Shen` (whole entry withdrawn after `shen-kinkou-sentinel-hold` merged an hour
earlier), `heimerdinger-armory-plaza`, and `VEN-106 Wind and Ghosts`. Facts 10 and 17 are the standing
rule that came out of it: immediately before staging, re-run **both** the sorted-card-set duplicate check
and the single-card coverage check against the *current* `data/combos.json`, not against the snapshot the
walk opened with.

## Open, deliberately not closed here

- **`azir-sovereign-token-gather` + The Grand Plaza fed by an *unbounded* Recruit engine.** §18 refuses
  it for a *bounded* token supply, and that refusal is scoped to its lens: with `jhin-fiora-facebreaker-recall`
  or `garen-fiora-malzahar-facebreaker-recruits` behind it, `K ≥ 6 + D` stops binding. The DAG already
  connects those engines to `ready-recruits-grand-plaza`; whether Azir adds anything on top is a combat
  walk, not a Hold walk.
- **`lady-luminosity-loop-comet`** stays at zero routes on purpose (§24.2), and should not be "fixed".
