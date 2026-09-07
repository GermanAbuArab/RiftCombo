# The uncatalogued Calm / Mind cards

> **Lane change, 2026-09-07, agreed with `rc-walk-uncat`.** This lane started as Calm + Mind + Order,
> the biggest of the three. It is now **Calm and Mind, plus any multi-domain card that mixes Order with
> Calm or Mind**; cards whose domains are **Order only** belong to `rc-walk-uncat`. Batch 1 below was
> written and merged before the split and consumed five order-only cards — `VEN-129` Sacred Protector,
> `VEN-117` Disciple of Shen, `VEN-134` Kayle, Justified, `VEN-130` Aurok General and `UNL-159` Soul
> Harvest — which that lane's census now correctly excludes. Re-measured after the split, against the
> catalogue at 495 entries: **99 walkable** — calm 57, mind 37, calm/mind 2, mind/order 2, calm/order 1.
>
> A caveat on the name+type correction below, added after the other lanes measured it: it is
> **lane-specific, not a blanket discount.** `rc-walk-fam1` measured Fury/Body/Chaos at 158 by base code
> and 158 by name+type — zero difference — and `rc-walk-uncat` found 0 of 64 battlefields sharing a name.
> The multi-base names concentrate in runes, Seals, promos and legends. Measure per lane.

Issue [#174](https://github.com/GermanAbuArab/RiftCombo/issues/174). Session `rc-walk-fam2`, 2026-09-07.

## 0. The census, and a correction that applies to all four lanes

**Coverage has to be keyed on name + type, not on base code.** CLAUDE.md's own measurement is that *104 of
the pool's 935 names carry two or more base codes*, and `CardIndex.equivalents()` (`src/cards.ts:124`)
resolves a base code to every printing sharing its normalised name and type. A reprint of a catalogued card
is therefore **not** an uncatalogued card, and walking it would produce an entry the matcher already covers.

A base-code census of this lane returned 182 rows. A name-keyed one returns **154** — twenty-eight of them
were reprints (`SFD-224` Aphelios, Exalted is `SFD-049`; `SFD-226` Seal of Focus is `OGN-081`; `SFD-225`
Irelia, Fervent is `SFD-057`; `VEN-170` Shen, Scourge of Shadows is `VEN-042`, already walked in
`shen-duo-mutual-hold`). That is a ~15 % over-count, and the same correction applies to the Fury/Body/Chaos
lane and the battlefield/legend lane.

`.scratch/uncat-cmo.mjs` does it this way and carries the reason in a comment. Re-run at the start of every
batch; the catalogue moves under the lane while the lane is being walked.

| domains | uncatalogued by name (catalogue at 450) |
|---|---|
| calm | 65 |
| order | 45 |
| mind | 39 |
| calm/mind | 2 |
| mind/order | 2 |
| calm/order | 1 |
| **total** | **154** |

Method as in the matrix walks: one entry per MECHANISM with its best partner; a wide family recorded below as
a **synergy-rule lead** with its predicate rather than as a dozen near-identical rows; card text verbatim from
`data/corpus_flat.txt`; every rules paragraph opened and quoted where load-bearing; `data/legality.json`
checked before a card is walked; every refusal carrying the paragraph that kills it.

---

## 1. Batch 1 — five entries, and three of them are cards the Core Rules use as their own examples

| id | cards | the rule it turns on |
|---|---|---|
| `sacred-protector-disciple-of-shen-pair` | VEN-129 + VEN-117 | *"exactly one other unit you control here"* is symmetric: each is the other's one other unit |
| `whiteflame-last-stand-zhonyas-double-might` | OGN-082 + OGN-069 + OGN-077 | **477.3.c**'s worked example IS Last Stand, and **808.1.d.1**'s IS a Zhonya's Hourglass save |
| `taric-block-stalwart-poro-shield-stack` | OGN-074 + OGN-052 ×3 + OGN-057 ×3 | **814.2**'s worked example IS Stalwart Poro under Block |
| `eclipse-soul-harvest-unfloored-gate` | UNL-063 ×3 + UNL-159 ×3 | 143.2.b, and the floored/unfloored distinction corrected |
| `kayle-justified-aurok-general-triple-empower` | VEN-134 + VEN-130 | **441.1.c.1**, whose only user in the pool is Kayle |

Eleven cards, every one of them in no entry before this batch.

### 1.1 441.1.c.1 has exactly one user, and its printed marker is an OMISSION

**441.1.b** *"An Empowered Game Object can not be Empowered."* · **441.1.c** *"If a Game Object is instructed
to be Empowered when it is already Empowered, nothing additional happens."* · **441.1.c.1** *"Some effects may
grant a Game Object permission to be Empowered multiple times. Such an effect ignores this restriction."*

Swept over the whole corpus with `grep -inE "empowered (up to|more than|any number|multiple)|can be \[?empowered\]? "`
→ **one row**: `VEN-134 Kayle, Justified`, *"I can be [Empowered] up to three times."*

The marker on the card is invisible to a keyword grep: Kayle's reminder text reads `(:rb_energy_3:: Empower
me.)` and **omits the "Use only if not Empowered" clause that every other [Empower] card in the pool prints**.
A sweep for the permission has to look for the sentence, not for the absence.

Companion sweep, `grep -inE "units that are \[?Empowered|your \[?empowered"` → **one row**:
`VEN-130 Aurok General`, the only card whose payoff reads a board of Empowered units.

**441.3** makes Empowering a Limited Action, and **410.2.a** defines that as *"a game action that a spell,
ability, or circumstance of the turn's progression causes the player to perform. A player cannot perform these
actions at-will"* — an instruction requirement, **not** a per-turn cap. All three of Kayle's Empowers fit in
one Main Phase.

### 1.2 A correction the walk made to its own first reading: the Might floor does not change the kill gate

The project's standing note is that the nine Origins reductions carry *"to a minimum of 1"* and the fourteen
from SFD/UNL/VEN do not. True — but the consequence is narrower than it looks. A floored reduction sends M to
`max(1, M − 4)`; an unfloored one to `M − 4`. **For a "3 Might or less" gate the two are identical at every
M ≥ 5**, because `max(1, M−4) = M−4` there. `OGN-093 Smoke Screen`'s floored −4 opens exactly the same
seven-Might window `UNL-063 Eclipse` does.

Where the floor actually bites:

- **In a combat sum.** 465.2.c sums each side's Might; a floored −4 leaves a 4-Might body contributing 1,
  Eclipse leaves it contributing 0 — **143.2.b**, *"If a unit's Might is ever less than 0, it is treated as 0
  when referenced by spells and abilities, and when summing Might to be assigned as damage."*
- **In later arithmetic.** **143.2.b.1**, *"Although the unit's Might is treated as 0, it is not 0. Effects
  that calculate Might increases and decreases use the actual value"* — a body Eclipsed to −1 needs five Might
  of pumping to reach 4, and this is exactly why 477.3.c's worked example has Eclipse blank a Last Stand.

Stated on the row so the next session does not re-derive the wrong distinction.

### 1.3 The asymmetric timing that decides the removal pair

**813.1.b** — *"Reaction grants the corresponding card or effect all abilities and permissions of Action."* —
so Eclipse reaches a Showdown on either turn. `UNL-159 Soul Harvest` carries neither keyword, and **155** says
*"A spell can be played during an Open State outside of Showdowns on its controller's turn."* So the pair
executes in **your own Main Phase**, Eclipse first, kill second, inside the turn the −4 lasts (317.2.c). You
cannot open the gate inside the opponent's attack and finish it there.

### 1.4 Two more numbers worth keeping

- **477.3.e.1.a** (*"Positive values, or increases, to Might are applied first"*) with **480.3** (timestamp
  order inside a layer) makes the ORDER of two pumps worth eight Might on the Whiteflame line: its own +8
  first, then Last Stand doubling the current 16 → 32. Last Stand first would be 24. 477.3.c is explicit that
  the doubling is an *"increase … by its current amount"*.
- **814.1.b.3** (*"If X is omitted, it is presumed to be 1"*) with **814.2**: a Stalwart Poro beside Taric is
  Shield 2 and defends at 4 for two Energy; add Block and 814.2 sums all three instances to Shield 5, i.e. 7
  on defence. **814.1.c** is why none of it exists on offence.

---

## 2. Synergy-rule leads from this batch (predicates, not entries)

Recorded here rather than written as a dozen near-identical rows. Each carries the predicate a rule would use
and the false positives a reader has to exclude.

1. **The "exactly one other unit" family.** Predicate: `/exactly one other unit you control/` plus
   `/exactly two units/`. Members: `VEN-138` Shen, Leader of the Kinkou Order (scores), `VEN-042` Shen,
   Scourge of Shadows (draws), `VEN-129` Sacred Protector (deals combat damage), `VEN-117` Disciple of Shen
   (Shield 3), `VEN-119` Keeper of Law (a 2 Energy + 1 Order Power discount), `VEN-027` Hand Hammer (Calm
   Equipment, +2 Might). Six cards, one condition, and the Disciple is the only member that PAYS ITSELF for
   satisfying it — which makes it the correct second body for all five others. **False positive to exclude:**
   a token counts (185.2.d), so any token faucet in the deck breaks every member at once.
2. **The Might-gate family.** Predicate: `/with [0-9]+ :rb_might: or less/` on a kill/banish/bounce/steal
   clause, anchored to the reductions. The Calm/Mind/Order half: `UNL-159` Soul Harvest and `VEN-127` Lacerate
   (gate 3, spells), `SFD-158` Sandshifter (gate 3, on a body), against `UNL-063` Eclipse, `OGN-093` Smoke
   Screen, `OGN-097` Blastcone Fae, `OGN-090` Orb of Regret (repeatable, once a turn, floored),
   `SFD-067` Frostcoat Cub and `UNL-065` Icevale Archer. **False positive to exclude:** a reduction whose
   floor is *"to a minimum of 1"* is NOT weaker for the gate (see §1.2) — a rule that separates them on that
   basis would be wrong.
3. **The granted-[Shield] family (814.2).** Anchors: `OGN-074` Taric, Protector (board-wide grant) and
   `OGN-057` Block (Shield 3 + Tank, [Hidden], [Action]). Partners: every unit with a printed `[Shield]` —
   `OGN-052` Stalwart Poro, `OGN-054` Sunlit Guardian, `OGS-005` Zephyr Sage, `UNL-036` Mutated Mouser
   (Shield 2), `OGN-241` Shen, Kinkou (Shield 2), `VEN-117` Disciple of Shen (conditional Shield 3),
   `SFD-055` Needlessly Large Yordle (Shield 5). **False positive to exclude:** `UNL-041` Allay, Eager Admirer
   grants [Deflect], not [Shield] — it sums with nothing and changes no Might.
4. **The "alone" family.** `OGN-055` Wielder of Water (*"While I'm attacking or defending alone, I have
   +2 :rb_might:"*), `OGN-060` Mask of Foresight (*"When a friendly unit attacks or defends alone, give it
   +1 :rb_might: this turn"*), `UNL-221` Lonely Poro (*"[Deathknell] If I died alone, draw 1"*). **False
   positive to exclude:** `UNL-156` Loyal Poro is the INVERSE — *"If I didn't die alone, draw 1"* — and is
   anti-synergic with the other three; and "alone" is an own-side measurement (the project's #116 finding,
   from Lonely Poro's own reminder text), so an enemy garrison does not break it.

---

## 3. Batch 1 validation

`validateCombos` over the merged copy: **0 errors / 471 entries**. The two `test/legend-lines.test.ts` checks
replicated over the staged entries: 4 legend base codes checked, clean. No duplicate id and no duplicate
sorted `uses[]` card set.

---

## 4. Batch 2 — five entries, all ten cards uncatalogued, and four paragraphs the project had never cited

| id | cards | the rule it turns on |
|---|---|---|
| `zero-drive-riptide-rex-banish-recursion` | SFD-090 + OGN-092 ×3 | **719.5** / **718.2** / **323.4** — the pool's one route out of Banishment |
| `hextech-anomaly-wind-wall-off-turn-counter` | SFD-083 + OGN-064 ×3 | **415.3.a** + **164.2.b** + **429.3** — Power is payable on the opponent's turn and Energy is not |
| `gearhead-steraks-gage-double-bonus` | SFD-068 + SFD-056 | **137.3** / **477.3.d** / **718.4** — "base" Might Bonus is the printed number |
| `not-so-fast-allay-deflect-tax-denial` | SFD-045 ×3 + UNL-041 | **425.1.c** / **425.1.c.1** — countering does not refund an additional cost |
| `unchecked-power-whiteflame-one-sided-wipe` | OGN-123 + OGN-082 | **317.2.b** before **317.2.c** — the Cleanup heals at 3c and expires at 3d |

### 4.1 The attachment paragraphs, cited here for the first time in the project

`SFD-090 The Zero Drive` reads *"[Equip] … :rb_energy_3::rb_rune_mind:, Banish this: Play all units banished
with this, ignoring their costs. (Use only if unattached.) [Effect] [Deathknell] — Banish me."* Three
paragraphs make it work, and none of them had appeared in an entry:

- **719.5** — *"When a Top-Most Card changes zones from a board zone to a non-board zone, all Attached cards
  Detach from it, remaining in their current zones."* The carrier dying leaves the Drive on the board,
  unattached, ready to be re-equipped or cashed. **719.5.a** lets the controller order the detaches.
- **718.2** — *"While in this state, the card's printed Rules Text is Inactive."* This is the real reason the
  banish ability cannot be used while attached; the printed *"(Use only if unattached.)"* restates a rule
  rather than adding a restriction.
- **323.4** — *"All Units that have Lethal Damage marked on them and that have Deathknell or other abilities
  that trigger on their own death will trigger such abilities now, making note of their current location,
  attributes, and other information relevant to add the trigger as a Pending Item"* — and only then does
  **323.5** send the body to the trash. That is why the granted *"[Deathknell] — Banish me"* survives the
  detach: the trigger is noted while the Drive is still on.

**108.6.c** makes Banishment the hard-to-recover zone and the project's standing measurement is that nothing
returns a card from it. The Zero Drive is its own exception. Its anti-synergy is exact and worth stating:
**808.1.d.1** means any heal / exhaust / recall shield SAVES the carrier and therefore cancels the banish, so
`OGN-077 Zhonya's Hourglass` — walked in batch 1 of this same lane — belongs in a different deck.

### 4.2 Power is payable on the opponent's turn and Energy is not

Three paragraphs in sequence:

- **415.3.a** — *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on
  their turn"* — a rune exhausted on your turn is dead for the whole of theirs.
- **164.2.a** is the exhaust-for-Energy ability; **164.2.b** is *"Recycle this: [Reaction] — [Add] one
  Power"*, which carries **no exhaust**, so an already-exhausted rune still pays Power on their turn.
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each
  player's turn"* — nothing can be banked across the gap.

So after a turn where you tapped out you have Power and no Energy, and most counters need both.
`SFD-083 Hextech Anomaly` (*"Pay any amount of :rb_rune_rainbow: to [Add] that much Energy"*, Reaction, no cap
per activation) is the general conversion — the project's only two previous answers, Dark Child's rune readies
and a Gold token under Renata Glasc, Industrialist, each hand back a fixed amount. **429.3** is what makes it
arrive in time: *"Activated abilities that Add resources and have the Reaction tag can be activated at any
time that spells or abilities require resources be paid"*, i.e. inside the Pay Costs step, and **429.2.a**
stops priority passing while it resolves.

The Calm counter suite, with the condition each one carries, so the choice of Wind Wall is argued: `OGN-045`
Defy (E1 + 1 Power, only against a spell costing ≤ 4 Energy and ≤ 1 Power), `VEN-039` Crumbling Sands
(E1 + 1 Power, only if they have already played another spell this turn), `SFD-045` Not So Fast (E2 + 1 Power,
only against something that chooses a friendly unit or gear), `UNL-190` Lilting Lullaby (Calm/Mind, E2 + 2
Power) and `OGN-064` Wind Wall (E3 + 2 Power, unconditional).

### 4.3 Countering does not refund an additional cost

**809.1.c** makes [Deflect] *"an additional cost"* paid as the card is played; **425.1.c** — *"Countering does
not refund any costs paid to play a card, activate an ability, or trigger an ability"* — with **425.1.c.1**,
*"This includes additional costs."* So `UNL-041 Allay, Eager Admirer`'s board-wide grant and
`SFD-045 Not So Fast` are one interaction, not two cards: they pay the tax and lose the card anyway.
**425.1.b** adds that a countered card *"is not considered to have been played"*, so their play triggers fail
too.

Swept: `grep -inE "counter (a|an|enemy|target)"` returns **nine** counters, of which exactly **two** say
*"or ability"* — `SFD-045` Not So Fast and `UNL-106` Repulse (mono-Body). An activated or triggered ability
aimed at your board is otherwise unanswerable inside a Calm/Mind identity.

The hole in both halves is the same paragraph: **355.10.d**, *"programmatically selected based on its
characteristics rather than chosen"*, whose own example is *"Kill all units at battlefields"*. A sweeper pays
no Deflect tax and cannot be countered by Not So Fast.

### 4.4 The end-of-turn Cleanup heals BEFORE it expires

**317.2.b** inserts *"3c. Heal all Units"* and **317.2.c** inserts *"3d. All \"this turn\" effects expire
simultaneously"* — heal first, expire second. That single ordering is what lets a body pumped over a wipe
survive losing the pump: at end of turn the Whiteflame Protector still has 12 damage marked against Might 16,
3b kills nothing, 3c clears the damage, and only then does 3d take the +8 away. Reverse the two and it dies —
which is precisely the failure **142.4.b**'s worked example describes (*"the unit's Might becomes 3, and it
will have lethal damage marked on it"*).

### 4.5 Batch 2 validation

`validateCombos` over the merged copy: **0 errors / 506 entries**. Legend-line checks over the staged entries:
12 legend base codes, clean. No duplicate id, no duplicate sorted `uses[]` card set.

---

# Continuation — session `rc-walk-order`, issue [#188](https://github.com/GermanAbuArab/RiftCombo/issues/188)

`rc-walk-fam2` was archived without a ledger after batch 2. This section continues the same document
under a new issue, with the same scope the header states after the Order split: **Calm and Mind, plus
any multi-domain card that mixes Order with Calm or Mind.** Order-only cards closed as #180
(139/139), and mono-Body closed as #186 (137/137).

## 5. The census, re-measured — and the method trap that produced a bogus zero

`rc-walk-fam2`'s last reported figure was **99 walkable at catalogue 495**. Measured now, at
catalogue 600:

```
lane deckable base codes: 308
uncatalogued by BASE CODE: 85 | by NAME+TYPE: 79 | gap: 7.1%
by domain: calm 48, mind 32, mind/order 2, calm/mind 2, calm/order 1
by type:   unit 44, spell 28, gear 9, rune 4
multi-base names (6): Calm Rune (OGN-042/VEN-R02), Mind Rune (OGN-089/VEN-R03),
  Seal of Focus (OGN-081/SFD-226), Plundering Poro (SFD-069/UNL-222),
  Riven Shattered (VEN-041/VEN-171), Nasus Guardian of Knowledge (VEN-063/VEN-178)
```

> **Count over `data/cards.json` deduped by BASE, never over `poolOf()`.** `src/builder.ts:136` maps
> `basesByName().values()` to `bases[0]`, so it has *already* collapsed by name — a census built on
> it reports the name+type figure in **both** columns and the gap reads as a spurious zero. That is
> what produced one lane's bogus zero-gap number today, and the script for this lane carries the
> reason in a comment.

Seven lanes have now measured the gap: **19.2%** pool-wide, 15.7% Order, 15% (this lane before the
split), **7.1%** here, 6.6%, 5.3% Body, 5.3%. No two the same.

## 6. Batch 3 — five entries

| id | class | cards | the names it clears |
|---|---|---|---|
| `siphoning-strike-nasus-guardian-rune-threshold` | ENGINE | VEN-146, VEN-063 | Siphoning Strike, Nasus Guardian of Knowledge |
| `esteemed-hierophant-tomb-raider-seven-runes` | ENGINE | VEN-025, VEN-037 | Esteemed Hierophant, Tomb-Raider Barbara |
| `ruined-rex-karthus-doubled-deathknell` | ENGINE | UNL-067, OGN-236 | Ruined Rex |
| `clairvoyance-fate-weaver-predict-setup` | ENGINE | VEN-056, UNL-064 | Clairvoyance, Fate Weaver |
| `turn-to-dust-attached-gear` | ENGINE | UNL-070 | Turn to Dust |

## 7. The seven-rune clock is exactly three cards, and one of them was the card waiting for this lane

`grep -in "7 or more runes" data/corpus_flat.txt` returns **three rows and nothing else**:

| card | domain | what the threshold buys |
|---|---|---|
| `VEN-025 Esteemed Hierophant` | Calm | *"prevent all damage that enemy spells and abilities would deal to me"* |
| `VEN-037 Tomb-Raider Barbara` | Calm | disempower an enemy gear if Empowered, otherwise kill it |
| `VEN-146 Siphoning Strike` | Calm/Mind | *"deal 7 to it instead"* |

All three were uncatalogued. `VEN-146` is the sixteenth uncatalogued dual-domain Signature spell and
was in no lane until this issue.

**An exhausted rune counts.** 164.2 gives a Basic Rune two abilities and only 164.2.a costs the
rune's own exhaust; **164.2.b**'s cost is the **recycle**, so a rune tapped for Energy this turn is
still a rune you control, and 415.3.a hands it back at your own Awakening. The threshold is a board
count, never a mana count. 161.2.a caps the Rune Deck at *"Exactly 12 Rune cards"* and 315.3.b
channels two free every Channel Phase, so seven arrives on its own around turn four.

**Two sevens, two meanings — and this is the trap the shell creates.** `VEN-146` is a Signature card
tagged **Nasus**, so 103.2.d.2 forces `VEN-145 / VEN-192 Curator of the Sands`, the only Nasus
legend, whose own clause is *"When you play a unit, gear, or activated ability with **Energy cost**
:rb_energy_7: or more…"*. That seven is a **cost**; the family's is a **count**. Neither card in the
entry costs 7, and a **spell** would not trigger her even if it did — her clause names a unit, gear
or activated ability. She is forced by the Signature rule and contributes nothing.

**And the kill pays twice.** Siphoning Strike's rider is *"When it dies this turn, channel 1 rune
exhausted"*; `VEN-063 Nasus, Guardian of Knowledge` reads *"Once each turn, when an enemy unit
**here** dies, channel 1 rune exhausted."* Both trigger on the same death, so 383.3.d lets their
controller order them and both resolve: one 4-Energy spell aimed at his battlefield is a kill plus
**two** runes.

## 8. "Prevent all damage" is not immunity, and the paragraph that says so is the scope of the clause

`VEN-025 Esteemed Hierophant` reads *"prevent all damage that enemy **spells and abilities** would
deal to me."* **437.4** makes the prevention total — *"Damage dealt to a Unit that has all of that
damage Prevented is not considered to have been dealt to it at all"* — so no kill event is generated
and a would-die replacement is not even involved. But **417.6.c** says *"Damage Dealt as a result of
being assigned during Combat has the **Units** as its source"*, so combat damage is not spell or
ability damage and goes straight through.

**And neither is the Challenge family.** 417.6.b.3 — worked example Challenge — makes *"they deal
damage equal to their Mights to each other"* damage dealt **by the chosen units**, not by the spell.
Seven cards print it and six are Body; `carnivorous-snapvine-rampage-tank-bypass` (#186) walks the
mechanism. A card that reads "prevent all spell and ability damage" is answered by the whole family.

## 9. A Predict followed by a narrower look is the exception to a standing claim

This project records that *"no deck-manipulation card in the pool turns a draw probability into a
certainty"* — true of any **single** card, because 416.1 and 416.1.a recycle to the bottom and
nothing tutors by name. It is **not** true of a `[Predict N]` followed by a look at M cards with
M ≤ N:

> **436.1.a.** *"When more than one card is Predicted, the Predicting player looks at that many cards
> and Recycles any number of them before putting the rest back on top of their Main Deck **in any
> order**."*

`VEN-056 Clairvoyance` is `[Predict 5]` **and** `[Reaction]`, so the arrangement can be made on the
opponent's turn and nothing shuffles before yours; `UNL-064 Fate Weaver` then looks at the top **4**,
strictly inside that window, and its *"reveal a spell with Energy cost 4 or more and draw it"* is a
certainty rather than a probability.

Neither half can Burn Out on the look: 431.1.c covers looking and revealing, and **436.4.a** is
explicit — *"The Player will not perform a Burn Out as a result of Predicting with too few cards in
their deck."* The Weaver's *"Recycle the rest"* is a recycle and not a mill, so 431.1.b never fires.
The only risk in the pair is Clairvoyance's own **Draw 2** (431.1.a) with an empty deck.

Two acts that are easy to conflate: **436.1** defines Predicting as *"the act of **looking** at a
single card"*, while **424.1** makes Revealing *"the act of presenting a card to all players from a
zone that one or more players do not have access to the information of."* A Predict is private; the
Weaver's find is public.

## 10. The word "printed" in 434.1.e is what lets a granted keyword reach an attached Equipment

`UNL-070 Turn to Dust` (*"Give a gear [Temporary]"*) is the only card in the pool scoped to a gear
alone. The four cards that grant the keyword to something else, swept: `OGN-069 Last Stand` (Calm,
a friendly unit), `OGN-180 Fading Memories` (Chaos, *"a unit at a battlefield or a gear"*),
`UNL-070` (Mind, a gear) and `UNL-165 Shadow's Call` (Order, *"a friendly unit without
[Temporary]"*). At 2 Energy and no Power it is the cheapest.

Two paragraphs make it reach an **equipped** gear:

> **718.5.b.** *"Attached cards still can be chosen or targeted by game effects while Attached."*
> **434.1.e.** *"Attaching one or more cards will cause those cards' **printed** Rules Text to become
> Inactive for as long as they remain Attached."* (repeated at 718.2)

A **granted** keyword is not printed Rules Text, so nothing switches it off: 816.1 makes `[Temporary]`
a Triggered Ability keyword the object now has, and 816.1.b kills it. **The word "printed" is the
whole reason this answers an attached Trinity Force or Svellsongur** rather than only a standing gear.

The price is the delay: **816.1.c** makes the Trigger Condition *"the controller of the permanent's
Beginning Phase starting"* — **theirs**, so the gear works through the rest of your turn and all of
theirs. It answers a standing engine, never a combat trick. **816.2** (*"Multiple instances of
Temporary are redundant"*) caps the obvious misplay.

## 11. Facts for CLAUDE.md from Calm/Mind batch 3

1. **The "7 or more runes" family is exactly three cards** — `VEN-025 Esteemed Hierophant`,
   `VEN-037 Tomb-Raider Barbara`, `VEN-146 Siphoning Strike` — and **an exhausted rune counts toward
   it**, because 164.2.b's cost is the recycle and not the rune's exhaust. The clock is 315.3.b's two
   per Channel Phase against 161.2.a's cap of twelve, so seven arrives around turn four unaided.
2. **Two sevens that are not the same seven**: `VEN-145 Curator of the Sands` triggers on an
   **Energy cost** of 7 or more *on a unit, gear or activated ability* — a **spell** never triggers
   her, so `VEN-056 Clairvoyance` at E7 does not. She is forced onto every Siphoning Strike list by
   103.2.d.2 and contributes nothing to it.
3. **"Prevent all damage that enemy spells and abilities would deal to me" is not immunity**: 437.4
   makes the prevention total, but 417.6.c makes combat damage come from the **units**, and 417.6.b.3
   does the same for the whole Challenge family — both go straight through.
4. **A `[Predict N]` followed by a look at M ≤ N cards turns a draw probability into a CERTAINTY**
   (436.1.a, *"putting the rest back on top of their Main Deck in any order"*), which is the exception
   to this project's standing claim about deck manipulation. 436.4.a is explicit that predicting with
   too few cards never Burns Out.
5. **434.1.e makes only the PRINTED Rules Text of an attached card Inactive**, so a granted keyword —
   `[Temporary]` from `UNL-070 Turn to Dust`, for instance — still applies to an equipped Equipment,
   which 718.5.b already made a legal choice.
6. **The Karthus × damage-Deathknell shape exists in two domain pairs and they are not equivalent**:
   `OGN-190 Kog'Maw, Caustic` is Chaos, so that line has exactly ONE legal legend name
   (`Heart of the Tempest`) and its sweep hits your own units; `UNL-067 Ruined Rex` is Mind, so
   Mind/Order gives four legend names and *"an ENEMY unit"* is one-sided. 715.2 pays a Bonus Damage
   source **per Deal action**, so a doubled Deathknell is two actions rather than one bigger one.

---

## 12. Batch 4 — five entries

Batch 3 merged (catalogue 612 at the time of writing).

| id | class | cards | the names it clears |
|---|---|---|---|
| `mystic-reversal-defy-counter-tiers` | ENGINE | OGN-080, OGN-045 | Mystic Reversal, Defy |
| `wielder-of-water-mask-foresight-alone` | ENGINE | OGN-055, OGN-060 | Wielder of Water, Mask of Foresight |
| `blitzcrank-ezreal-dashing-forced-defence` | ENGINE | OGN-067, SFD-082 | Blitzcrank Impassive, Ezreal Dashing |
| `orb-of-regret-smoke-screen-floored-reduction` | ENGINE | OGN-090, OGN-093 | Orb of Regret, Smoke Screen |
| `reinforce-tasty-faefolk-cheat-into-play` | ENGINE | OGN-062, OGN-075 | Reinforce, Tasty Faefolk |

## 13. `740.2.a` — "alone" counts YOUR side, which is the opposite of the obvious reading

> **740.2.a.** *"A unit is alone when there are no other **friendly** units at the same location."*
> **740.2.b.** *"A unit is one on one when it and the enemy unit at the same location are both alone."*

So the enemy garrison's size is irrelevant to whether your body is alone, and a card that says
"alone" requires nothing of the opponent — only a card that says **one on one** does. That inverts
what "attacking alone" sounds like, and it means the cost of the whole family is **your own board**:
465.2.c assigns damage equal to each side's *summed* Might, so a lone raider brings one body's worth
and receives a garrison's. `OGN-055 Wielder of Water` and `OGN-060 Mask of Foresight` are the two
uncatalogued members that **pay** a lone body rather than reading someone else's, and neither bonus
is a buff — both are modifiers, so 702.3 and 703 are silent and a real buff still lands on top.

## 14. Dragging an enemy body in makes THEM the attacker on YOUR turn — and that is when a defend trigger fires

Two paragraphs say the same thing from opposite sides, and both key on the **moved unit's**
controller rather than on whoever caused the move:

> **190.3.a.1.** *"Units moving to or being played to a battlefield apply Contested status if that
> battlefield is not already Contested and that **Unit's controller** does not already control that
> battlefield."*
> **450.** *"The Destination becomes Contested if it is an Uncontested Battlefield **not controlled by
> the controller of the Unit or Units that moved**."*

**464.2.c.1** then makes the Attacker *"the player whose unit(s) applied the Contested status"* — the
opponent — and 464.2.c.2 makes you the Defender at a battlefield you already control. This project
had recorded two enemy-movers that fire a Defend trigger on your own turn (`UNL-141 Evelynn,
Entrancing` in Chaos, `OGN-043 Charm` in Calm/Mind); **`OGN-067 Blitzcrank, Impassive` is a third
and it is Calm**, which puts the trick in a Calm/Mind shell alongside a defend payoff that was itself
uncatalogued — `SFD-082 Ezreal, Dashing`, *"When I attack or **defend**, deal damage equal to my
Might to an enemy unit here."*

**And Blitzcrank's printed drawback is the engine.** *"When I hold, return me to my owner's hand"* is
filed by the synergy layer as a self-returning no-op; here it is a **rebuy**. 315.2.b.2 Holds every
battlefield you control, 469.1 with 471.1 gains the point at the Hold, and only then does the trigger
send him home to be replayed for another drag. Check 323.6 first if he is the lone garrison.

## 15. `477.3.b` snapshots a floored reduction at the size of the body you aim it at

> **477.3.b.** *"When an arithmetic effect from a source that is not a passive ability has a
> limitation that applies, it is limited at the time of its application, and is 'remembered' at that
> limited level for the duration of its effect. This process is called 'snapshotting.'
> **Example:** If an effect gives a unit '-4 [M] to a min of 1 this turn' choosing a unit with 2 [M],
> then the effect will generate -1 [M] this turn."*

Riot's example is `OGN-093 Smoke Screen`'s exact wording. The play instruction follows directly:
**aim a floored reduction at the biggest version of the target**, which means after the opponent's
pumps — and `[Reaction]` (813.1.c.1) is the permission that lets you. **477.3.e.2.a** (*"Negative
values, or decreases, to Might are applied last"*) reaches the same conclusion from the other side.

Neither card can kill — 143.2.a needs marked damage at or above Might and both floor at 1, and
143.2.b keeps a reduction from being damage at all. What they buy is a target under **somebody
else's** threshold: a Might gate, or a cheaper combat assignment under 465.2.c.4 with the remainder
as excess damage. `OGN-090 Orb of Regret` is the repeatable half at 1 Energy, since its cost is an
exhaust and 415.3.a readies it every Awakening.

## 16. An Energy-only discount is worth the most on a card whose cost is Energy-only

`OGN-062 Reinforce` reduces a found unit's cost *"by :rb_energy_5:"*, and **356.6** floors that half
at zero while leaving any Power component untouched. So the right target is **not** the most
expensive unit in the deck but the most expensive one with **no Power in its cost** — `OGN-075 Tasty
Faefolk` at 7 Energy and no Power comes down to 2, where a 6-Energy-plus-2-Power body would still owe
the Power. `[Accelerate]`'s 1 Energy + 1 Calm Power (805.1.a) is then affordable on the change.

Nothing in the card can Burn Out: 431.1.c covers the look, and *"Recycle the remaining cards"* is a
recycle to the bottom (416.1, 416.1.a) and not a mill, so 431.1.b never fires.

**And the dig becomes a certainty behind a Predict.** 436.1.a lets a `[Predict N]` put the top N back
*"in any order"*, so a `[Predict 5]` resolved first makes Reinforce's look at five exact. That is the
general form of §9's finding: **any look at M cards is certain behind a `[Predict N]` with N ≥ M.**

## 17. Facts for CLAUDE.md from Calm/Mind batch 4

1. **740.2.a: *"A unit is alone when there are no other FRIENDLY units at the same location."*** The
   enemy garrison is irrelevant; 740.2.b's *"one on one"* is the stricter term that needs both sides
   down to one. The cost of the whole "alone" family is your own board, because 465.2.c assigns each
   side's **summed** Might.
2. **`OGN-067 Blitzcrank, Impassive` is a THIRD enemy-mover that fires a Defend trigger on your own
   turn**, and it is Calm — 190.3.a.1 and 450 both key Contested on the **moved unit's controller**,
   so 464.2.c.1 makes the opponent the Attacker at a battlefield you control. Its *"When I hold,
   return me to my owner's hand"* is a **rebuy**, not the no-op the synergy layer files it as: the
   Hold scores at 315.2.b.2 before the trigger sends him back.
3. **477.3.b snapshots a floored reduction at the moment of application** — Riot's worked example is a
   *"-4 to a min of 1"* aimed at a 2 Might body generating **-1 for the whole turn** — so a floored
   reducer must be aimed AFTER the opponent's pumps, which is what `[Reaction]` buys.
4. **An Energy-only discount should be aimed at an Energy-only cost.** 356.6 floors the Energy half
   at zero and never touches Power, so the best target for `OGN-062 Reinforce` is the most expensive
   unit with **no Power**, not the most expensive unit.
5. **Any look at M cards is a certainty behind a `[Predict N]` with N ≥ M** (436.1.a, *"in any
   order"*) — the general form of the exception recorded in batch 3, and it now covers Reinforce's
   five as well as Fate Weaver's four.

---

## 18. Batch 5 — five entries, and the Mind gear-count axis

Batch 4 merged (catalogue 624 at the time of writing).

| id | class | cards | the names it clears |
|---|---|---|---|
| `plundering-poro-patched-porobot-gold-gear-count` | ENGINE | SFD-069, VEN-058 | Plundering Poro, Patched Porobot |
| `pickpocket-seal-of-focus-cheap-gear-kill` | ENGINE | SFD-074, OGN-081 | Pickpocket, Seal of Focus |
| `icevale-archer-deadly-flourish-damage-threshold` | ENGINE | UNL-073, UNL-065 | Icevale Archer, Deadly Flourish |
| `sandstone-chimera-yi-meditative-rune-prison` | ENGINE | VEN-036, OGS-004 | Sandstone Chimera, Yi Meditative |
| `akali-silent-twilight-shroud-cant-be-chosen` | ENGINE | VEN-038, VEN-031 | Akali Silent, Twilight Shroud |

## 19. `187.5` makes a Gold a GEAR, so Mind's token engine is also its gear count

> **187.5.** *"A Gold gear token is a domainless **gear** token with '[Reaction][>] Kill this, [E]:
> [Add] [A].'"*
> **185.2.d.** *"Tokens have a type. They follow all rules for their type unless otherwise
> specified."*

So every Gold on the board counts toward a *"control N or more gear"* threshold, and a Conquer engine
in Mind is a gear engine at no extra cost. The cards that read the count, swept: `VEN-058 Patched
Porobot` (3 or more other gear → draw 1), `SFD-072 Dropboarder` (2 or more gear → ready me),
`VEN-064 Plaza Guardian` (1 Energy less per gear) and `VEN-076 Repair Specialist` (`[Assault]` equal
to the number of gear). Three cards in this lane mint Golds — `SFD-069 / UNL-222 Plundering Poro` on
a Conquer, `SFD-074 Pickpocket` on a cheap gear kill, `UNL-073 Deadly Flourish` on a kill by damage.

**And a Gold is never mana on the turn it appears.** All three print *"exhausted"*, and 187.5's
ability costs the token's own exhaust, so 415.3.a is when it becomes payable. The one override is
`SFD-171 Renata Glasc, Industrialist` (R25 = A), which is mono-Order and needs a Mind/Order legend.

**What the one-Energy window catches, measured rather than guessed.** `SFD-074 Pickpocket`'s *"kill a
gear with Energy cost no more than 1"* is aimed squarely at the mana base: the Seal cycle is Energy
cost **zero** (`OGN-081 / SFD-226 Seal of Focus`, `OGN-245 Seal of Unity`), and `OGN-090 Orb of
Regret`, `SFD-153 Eye of the Herald` and `OGN-227 Symbol of the Solari` are all E1. 718.5.b makes an
attached Equipment a legal choice, so it reaches an equipped Eye.

## 20. Floored and unfloored reductions do different jobs, and the split is by set

The nine Origins reductions carry a *"to a minimum of 1"* floor; the fourteen from Spiritforged,
Unleashed and Vendetta do not. That is worth exactly one Might where it matters:

| | floored (batch 4) | unfloored (batch 5) |
|---|---|---|
| example | `OGN-093 Smoke Screen` −4, min 1 | `UNL-065 Icevale Archer` −1, no floor |
| 477.3.b | **snapshots** at the size aimed at | no limitation, so no snapshot |
| can complete a kill? | **no** — a body at 1 Might still needs 1 damage | **yes** — 4 becomes 3 and *"Deal 3"* is lethal (143.2.a) |
| job | move a target under someone **else's** threshold | reach a fixed-damage spell's own threshold |

**477.3.e.2.a** applies decreases last in both cases, so neither can be pumped out of within one
evaluation, and **143.2.b** keeps a reduction from being damage at all — negative Might reads as 0
and is not 0, so no kill event comes from the reducer.

## 21. A symmetric denial becomes one-sided on a turn you can name

`VEN-036 Sandstone Chimera` (*"players only channel 1 rune at the start of their Channel Phase"*) is
symmetric on its face. **430.3** is what makes it not: *"If there aren't sufficient runes in the Rune
Deck, channel as many as possible."* With 161.2.a fixing the Rune Deck at exactly twelve and 315.3.b
channelling two free per Channel Phase, an untouched curve is empty around turn six — and from that
moment the halving costs **you** nothing and the opponent one rune a turn.

Two scope notes that decide whether the shell works. The clause is scoped to *"at the start of their
Channel Phase"* — the free channel of 315.3.b — and says nothing about a channel from a **card**, so
every card-based channel in the deck survives, including the riders that this lane's seven-rune
entries are built on. And the count both cards read is a **board** count: 164.2.b's cost is the
recycle, so a rune tapped for Energy still counts, but 161.2.b sends a rune recycled for **Power**
back to the Rune Deck and lowers it. In this deck, do not cash runes for Power.

## 22. "Can't be chosen" is a prohibition; `[Deflect]` is a tax

**809.1.c** prices `[Deflect]` as *"an additional cost … for each time they choose"* — a player with
the Power simply pays. *"I can't be chosen by enemy spells and abilities"* is absolute under
**054.1**. This catalogue has treated the two as interchangeable in prose; they are different in
kind. Both have the same hole: **355.10.d** (programmatically selected) and **355.10.e** (a set
chosen by other players) are not choices, so every sweeper goes through both.

`VEN-038 Akali, Silent` is the inverse of every other protection in the domain — *"unless I'm in
combat"*, and **740.2.c** defines that term (*"A unit is in combat if it is occupying a battlefield
where combat is ongoing and has a combat designation"*). She is untouchable while she develops and
legal the moment she is worth removing, which is backwards from a `[Tank]` or a `[Shield]` and is why
she needs a second layer rather than a bigger one. `VEN-031 Twilight Shroud` is that layer at 1
Energy, twice per copy via `[Flow]` (829.1.b, 829.1.b.1, 108.6.c) — and because it carries no
keyword, **155** confines it to your own Main Phase, so the protection is bought **before** the
combat opens, never in response.

## 23. Facts for CLAUDE.md from Calm/Mind batch 5

1. **187.5 makes a Gold token a GEAR** (with 185.2.d putting it inside the rules for its type), so a
   Gold engine advances every *"control N or more gear"* threshold — `VEN-058 Patched Porobot`,
   `SFD-072 Dropboarder`, `VEN-064 Plaza Guardian`, `VEN-076 Repair Specialist`. Every Gold-maker in
   the pool prints *"exhausted"*, and 187.5's ability costs the token's own exhaust, so it is never
   mana on the turn it appears unless `SFD-171 Renata Glasc, Industrialist` is out (R25 = A).
2. **The pool's cheap gear is its mana base**: the Seal cycle is Energy cost **zero**, so
   `SFD-074 Pickpocket`'s *"no more than 1 Energy"* window catches every Seal, plus `OGN-090`,
   `SFD-153` and `OGN-227` at E1 — and 718.5.b makes an attached one a legal choice.
3. **Floored and unfloored Might reductions do different jobs.** A floored one can never complete a
   kill (a body at 1 Might still needs 1 damage) and 477.3.b snapshots it at the size aimed at; an
   unfloored one can take a 4 to a 3 and let a *"Deal 3"* finish it. The split is by set: nine
   Origins reductions are floored, the fourteen from SFD/UNL/VEN are not.
4. **`VEN-036 Sandstone Chimera`'s symmetric halving becomes one-sided the turn your own Rune Deck
   empties** (430.3, *"channel as many as possible"*, against 161.2.a's twelve and 315.3.b's two a
   turn), and its clause is scoped to the FREE channel at the start of the Channel Phase — a
   card-based channel is untouched.
5. **"Can't be chosen" (054.1) is a prohibition and `[Deflect]` (809.1.c) is a tax** — different in
   kind, same hole at 355.10.d / 355.10.e. And **740.2.c** defines *"in combat"*, which is what makes
   `VEN-038 Akali, Silent`'s protection the inverse of a `[Tank]`'s.

---

## 24. The Gold-is-a-gear lens, with every member of every set named

Batch 5 stated this finding without enumerating it. Swept now, so the next session can refute or
extend it in one grep:

**Gold-token makers — `grep -in "Gold gear token"` returns 23 rows across all six domains.** The
seven in Mind are `SFD-063 Chemtech Cask`, `SFD-069 Plundering Poro`, `SFD-070 Wages of Pain`,
`SFD-074 Pickpocket`, `SFD-081 Card Sharp`, `SFD-086 World Atlas` and `UNL-073 Deadly Flourish`. The
rest: Fury `SFD-004 Bushwhack`, `SFD-020 Draven, Vanquisher` (banned in both formats), `UNL-018 Yeti
Brawler`; Body `SFD-101 Fae Dragon`; Chaos `SFD-121 Black Market Broker`, `SFD-130 Treasure Hunter`,
`SFD-134 Cull`, `UNL-145 Pyke, Returned`; Order `SFD-152 Eminent Benefactor`, `SFD-155 Honest
Broker`, `SFD-162 Blood Money`, `SFD-174 Trove Golem`; legends `SFD-201 Chem-Baroness`, `SFD-203
Battle Mistress`, `UNL-185 Bloodharbor Ripper`; and the battlefield `SFD-220 Treasure Hoard`.

**Cards that read a gear COUNT — exactly four.** `SFD-072 Dropboarder` (*"if you control two or more
gear, ready me"*), `VEN-058 Patched Porobot` (*"if you control 3 or more other gear, draw 1"*),
`VEN-064 Plaza Guardian` (*"I cost 1 Energy less for each gear you control"*), `VEN-076 Repair
Specialist` (*"[Assault] equal to the number of gear you control"*). Three are Mind and one is Body.
**`SFD-076 Production Surge` is NOT in this set** — its discount reads *"if you control a **Mech**"*,
which 187.4 supplies from a **unit** token, not a gear one. That distinction is the reason batch 5's
list of four was right and is worth keeping explicit.

**The Seals — exactly six, one per domain, every one Energy cost ZERO and 1 Power.** `OGN-040 Seal of
Rage` (Fury), `OGN-081 Seal of Focus` (Calm), `OGN-120 Seal of Insight` (Mind), `OGN-163 Seal of
Strength` (Body), `OGN-204 Seal of Discord` (Chaos), `OGN-245 Seal of Unity` (Order), plus the
reprints `SFD-226` and `SFD-238`. All six sit inside `SFD-074 Pickpocket`'s *"Energy cost no more
than 1"* window with room to spare, which is what makes that card a mana-base answer rather than an
Equipment answer.

**And the two token types are different resources.** 187.4 (*"A 3 [M] Mech token is a domainless
**unit** token with 3 Might and the Mech tag"*) against 187.5 (*"A Gold gear token is a domainless
**gear** token"*) — a Mech engine feeds body payoffs and a Gold engine feeds the gear count. A deck
can want both and they never overlap.

## 25. Batch 6 — five entries

| id | class | cards | the names it clears |
|---|---|---|---|
| `iterative-design-production-surge-mech` | ENGINE | VEN-051, SFD-076 | Iterative Design, Production Surge |
| `mosstomper-wuju-apprentice-xp-calm-ladder` | ENGINE | UNL-047, UNL-040 | Mosstomper, Wuju Apprentice |
| `scuttle-crab-mutated-mouser-zero-might-hold` | ENGINE | UNL-053, UNL-036 | Scuttle Crab, Mutated Mouser |
| `sumpworks-map-opponent-scores` | ENGINE | UNL-085 | Sumpworks Map |
| `forgefire-cape-riven-shattered-free-equip` | ENGINE | SFD-190, VEN-041 | Forgefire Cape, Riven Shattered |

## 26. A `[Level]` rider on a PLAY trigger is spent for good; one on a continuous ability is not

`UNL-047 Mosstomper`'s *"[Level 3] I have +1 :rb_might: and [Deflect]"* is continuous, so **824.1.d**
switches it on and off as the counter moves and a copy played at 0 XP simply improves later.
`UNL-040 Wuju Apprentice`'s *"[Level 6] When you play me, draw 1"* hangs off a **play trigger**: if
the Dependent Ability is Inactive when the card is played, the trigger never happens and no later XP
brings it back. **Hold the Apprentice until six.** That is on neither card.

`[Hunt 2]` is why six is reachable: 823.1.c.1 with 315.2.b.2 and 485.4 means a Mosstomper on each of
a Duel's two battlefields is **4 XP in one Beginning Phase**. The Calm XP cards, named:
`UNL-034 Herald of Spring` (`[Hunt]`, plus 2 XP on play — the biggest single jump), `UNL-040 Wuju
Apprentice`, `UNL-047 Mosstomper`, `UNL-031 Combat Experience` and `UNL-038 Skyward Strike` (both
`[Level 6]` riders on a trick).

## 27. Two things that look like drawbacks and are not

**A 0 Might body can hold, and it still costs a point to remove.** `UNL-053 Scuttle Crab` prints its
own rule — *"(Units with 0 :rb_might: can conquer and hold.)"* — and 143.2.a needs marked damage at
or above Might, which still means **nonzero**: the attacker spends one point of their assignment on
it and 465.2.c.4 caps that at exactly one. And its Deathknell is the pool's only look at an
opponent's facedown cards: `grep -in facedown` returns four rows, and `OGN-101 Mushroom Pouch`,
`OGN-181 Pack of Wonders` and `UNL-014 Monster Harpoon` all read **your own**. Against a `[Hidden]`
deck whose whole package is priced on 811.1.b's information asymmetry, that is the answer.

**`[Temporary]` on a card you play yourself is a full opponent's turn, not a short leash.** 816.1.b
kills it *"at the start of THIS PERMANENT'S CONTROLLER'S Beginning Phase"* — **yours** — so
`UNL-085 Sumpworks Map` played in your own Main Phase covers the rest of your turn and all of
theirs, and dies before your own scoring, which costs nothing because it only reads *their* Scores.
Holding it for its `[Reaction]` is the trap: 312.2.a gives priority in a Neutral Open State only to
the Turn Player, and 335 gives nobody priority in a Beginning Phase with an empty chain, so there is
usually no window in which to answer their Hold with it.

## 28. Facts for CLAUDE.md from Calm/Mind batch 6

1. **The Gold-is-a-gear lens, with members** (§24): 23 Gold-makers pool-wide and seven in Mind;
   exactly **four** cards read a gear COUNT (`SFD-072`, `VEN-058`, `VEN-064`, `VEN-076`) and
   `SFD-076 Production Surge` is **not** one of them, because it reads a **Mech**, which 187.4
   supplies as a **unit** token; the six Seals are all Energy cost **zero**.
2. **A `[Level]` rider on a PLAY trigger is spent for good if the copy is played below the
   threshold**, while one on a continuous ability is re-evaluated by 824.1.d as the counter moves.
   `UNL-040 Wuju Apprentice` versus `UNL-047 Mosstomper` is the pair that shows it.
3. **A 0 Might unit can conquer and hold, and still costs an attacker one point** (143.2.a needs
   nonzero damage, 465.2.c.4 caps it at the minimum). `UNL-053 Scuttle Crab` is also the **only card
   in the pool that looks at an opponent's facedown cards** — swept, four `facedown` rows and the
   other three read your own.
4. **`[Temporary]` on your own permanent buys the opponent's WHOLE turn**, because 816.1.b's clock is
   *your* Beginning Phase — so a card that pays off on their turn should be played in advance, not
   held for its `[Reaction]` (312.2.a and 335 usually leave no window to hold it for).
5. **`SFD-190 Forgefire Cape` extends the matched-pair invariant to a Signature EQUIPMENT**: tagged
   Ornn, Calm/Mind, and the only Ornn legend is `SFD-189 / SFD-244 Fire Below the Mountain`, also
   Calm/Mind. Its `[Equip]` is one rainbow, which is exactly what `[Weaponmaster]` refunds
   (821.1.c, 821.1.c.2), and 053.1 with 136.2.d make its *"When I attack or defend"* the CARRIER's —
   so one Riven attack is two separate Deals.

---

## 29. Batch 7 — five entries

| id | class | cards | the names it clears |
|---|---|---|---|
| `yuumi-affectionate-poro-designated-tank` | ENGINE | UNL-056, VEN-024 | Yuumi Magical Cat, Affectionate Poro |
| `resonating-strike-sunlit-guardian-hidden-reinforcement` | ENGINE | VEN-034, OGN-054 | Resonating Strike, Sunlit Guardian |
| `mournful-witness-serene-ascetic-free-empower` | ENGINE | VEN-028, VEN-030 | Mournful Witness, Serene Ascetic |
| `dredge-up-dramatic-visionary-predict-draw` | ENGINE | UNL-062, VEN-049 | Dramatic Visionary, Dredge Up |
| `crescent-strike-frostcoat-cub-sweep-threshold` | ENGINE | UNL-072, SFD-067 | Crescent Strike, Frostcoat Cub |

## 30. You cannot PLAY a unit into a contested battlefield, but you can MOVE one there

**355.2.a** makes a played unit's valid locations *"the controller's Base or a battlefield the
controller controls"*, which is why nothing in the pool reinforces a battlefield you are **attacking**
except the one card that says so. A **move** is a different action:

> **449.** *"Spells, Abilities, or other effects may cause a Move to occur."*
> **449.1.** *"The source of the Move will provide details on any restrictions on legality for
> Destination."*

And **420.3.a** puts the exhaust cost on the **Standard** Move alone, so an effect move relocates an
already-exhausted body and never consults 144.4's base-to-battlefield restriction. **319.6** with
**323.2.a** then give the arriving body the Defender designation before 465.2 resolves.

`VEN-034 Resonating Strike` is that card at `[Hidden]` prices — one rainbow to hide, **zero** to play
(the tail of 811.1.b), at `[Reaction]` speed. And it is the rare hidden spell whose own restriction
agrees with the hide: **811.1.d.2** confines its choices to the battlefield it was hidden at, and its
first choice is *"a battlefield you control"* — exactly where 811.1.b made you hide it.

## 31. Two swept sets

**Cards that Empower themselves with no `[Empower]` cost — six, and four are legends.** `VEN-143
Master of Shadows`, `VEN-151 Soul's Reflection`, `VEN-153 Matriarch of War`, `VEN-155 Heart of the
Tempest` (legends), plus `VEN-092 Renekton, Brute` (gated on reaching Might 10, bought at 1 Energy a
point) and `VEN-028 Mournful Witness`. **The Witness is the only unit in the pool that becomes
Empowered for no resources at all** — 441.1 makes Empowering *"the act of rendering one or more Game
Objects Empowered"*, so an effect that Empowers never pays the target's printed cost; 441.2 makes the
state permanent and 441.1.b caps it at one firing.

**Cards that read *"an opponent's score is within 3 points of the Victory Score"* — five**, and they
split by whose score: `OGN-047 Find Your Center` and `OGN-079 Leona, Zealot` (Calm) read the
**opponent's**; `SFD-201 Chem-Baroness` reads **yours**; `UNL-116 Poppy, Paragon` and `VEN-091
Corrupted Dragon` are the other two. A catch-up clause and a closing clause use the same words and
mean opposite things — check whose score before pairing them.

## 32. Facts for CLAUDE.md from Calm/Mind batch 7

1. **A move by EFFECT reinforces a battlefield mid-combat where a PLAY cannot.** 355.2.a restricts a
   played unit to your base or a battlefield you control; **449** lets a spell cause a Move with only
   the source's own restrictions, and **420.3.a** puts the exhaust on the Standard Move alone — so an
   exhausted body goes battlefield to battlefield with no `[Ganking]`, and 319.6 + 323.2.a put it in
   that combat's damage step.
2. **`VEN-034 Resonating Strike` is the rare hidden spell whose 811.1.d.2 restriction coincides with
   811.1.b's hide** — its own first choice is *"a battlefield you control"*, which is where the hide
   had to be. Most hidden spells fight that clause; this one does not.
3. **Six cards Empower themselves without an `[Empower]` cost and four are legends**; of the two
   units, `VEN-092 Renekton, Brute` must reach Might 10 first, so **`VEN-028 Mournful Witness` is the
   only unit in the pool that becomes Empowered for free** (441.1 performs the act, 441.2 makes it
   permanent, 441.1.b caps it at one).
4. **Five cards read *"within 3 points of the Victory Score"* and they do not all read the same
   score**: `OGN-047` and `OGN-079` read the opponent's (a comeback clause), `SFD-201` reads yours (a
   closing clause), with `UNL-116` and `VEN-091` making up the five.
5. **Granting `[Tank]` to a body that is NOT the payoff is the mechanism, not a side effect** —
   815.1.c.2 makes every other unit you control an invalid assignment, which is how a *"if I haven't
   been dealt damage"* payoff is guaranteed. And that payoff's clause reads *"this turn"*, not *"this
   combat"*, so a single earlier ping switches it off (143.3.b.2's combat-cleanup heal does not undo
   the fact that damage was dealt).

---

## 33. Batch 8 — five entries

| id | class | cards | the names it clears |
|---|---|---|---|
| `energy-conduit-honeyfruit-off-turn-energy` | ENGINE | OGN-098, UNL-049 | Energy Conduit, Honeyfruit |
| `find-your-center-leona-zealot-catch-up` | ENGINE | OGN-047, OGN-079 | Find Your Center |
| `card-sharp-dropboarder-gold-ready` | ENGINE | SFD-081, SFD-072 | Card Sharp, Dropboarder |
| `otterpus-ol-poro-early-game-concession` | ENGINE | VEN-053, VEN-029 | Otterpus, Ol' Poro |
| `legion-quartermaster-cloth-armor-bounce-value` | ENGINE | SFD-044, SFD-064 | Legion Quartermaster |

## 34. Every card that adds ENERGY at `[Reaction]` speed, named

This lane's batch 2 established the problem — **415.3.a** readies your runes only in *your* Awakening,
**164.2.b**'s cost is the recycle so an exhausted rune still pays **Power** on their turn, and **167**
banks nothing across the gap — so a reactive deck has Power on the opponent's turn and no Energy,
while every counter in the suite wants both. Swept now:

| card | domain | condition |
|---|---|---|
| `OGN-098 Energy Conduit` | Mind, gear | none |
| `UNL-049 Honeyfruit` | Calm, gear | `[Level 6]` mode (1 Energy **and** 1 rainbow off one exhaust) |
| `SFD-083 Hextech Anomaly` | Mind, gear | converts Power (already catalogued in this lane) |
| `UNL-093 Dragonsoul Sage` | Body, unit | none |
| `OGS-014 Lux, Crownguard` | Order, unit | only to play spells |
| `OGN-253 Hand of Noxus` | Fury/Order, legend | `[Legion]` |
| `UNL-197 Scorn of the Moon` | Mind/Chaos, legend | none |
| `VEN-141 Butcher of the Sands` | Fury/Body, legend | costs 2 rainbow |

**In Calm/Mind the unconditional permanents are exactly `OGN-098` and `UNL-049`.** **429.3** is why
they arrive in time — *"Activated abilities that Add resources and have the Reaction tag can be
activated at any time that spells or abilities require resources be paid"*, with Riot's example
naming the Pay Costs step — and 429.2 with 429.2.a is the reminder text *"Abilities that add
resources can't be reacted to"*.

## 35. Three clause-level facts

**`355.10.e` makes a symmetric offer un-targetable and un-taxable.** *"Each player kills a unit they
control"* is its printed example, and it says outright that such an effect does not target — so
`SFD-081 Card Sharp`'s offer pays no `[Deflect]` tax (809.1.c and 809.1.d bite only on choosing) and
cannot be answered as a targeted effect. The price is that the decision is theirs.

**A "would ... instead" clause is a replacement, and it does not touch a card-text point.** `VEN-053
Otterpus` replaces a **Score** — 469 defines that as a Conquer or a Hold — while **194.1.c** covers
*"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more
points"*, which is a **Gain** and goes through untouched. 471.1.a.1 says the same from the other side.

**An additional cost with no "you may" can make a card uncastable.** `SFD-044 Legion Quartermaster`
reads *"As an additional cost to play me, return a friendly gear to its owner's hand"* and **203.3**
is the paragraph: *"If the game action associated with a Cost is impossible for any reason such that
a player cannot perform it, then they cannot pay the Cost and they will not execute the linked
Effect."* With no gear on the board the card cannot be played at all. `[Quick-Draw]` (819.1.d — short
for `[Reaction]` plus *"When you play this, attach it to a Unit you control"*) is what makes paying
it nearly free: the gear comes back attached, to a carrier of your choosing, with **no `[Equip]` cost
ever determined**.

## 36. Facts for CLAUDE.md from Calm/Mind batch 8

1. **The Energy-at-`[Reaction]` set is eight cards** (§34), and in Calm/Mind the unconditional
   permanents are exactly `OGN-098 Energy Conduit` and `UNL-049 Honeyfruit`'s `[Level 6]` mode.
   **429.3** lets them be activated inside the Pay Costs step, which is what makes a counter suite
   that wants Energy playable on a turn 415.3.a leaves you none.
2. **`355.10.e` is why a symmetric offer costs nothing to make**: an object chosen in whole or in
   part by other players is not a target, so no `[Deflect]` tax and no targeted answer — at the price
   of the decision being theirs.
3. **A replacement of a SCORE does not touch a card-text point**: 469 scopes Scoring to Conquer and
   Hold, while 194.1.c's Gain is a separate item (471.1.a.1 repeats it). `VEN-053 Otterpus` stops the
   first and never the second.
4. **`203.3` can make a card uncastable, not merely worse**: an additional cost with no *"you may"*
   that cannot be paid means the card cannot be played — `SFD-044 Legion Quartermaster` with no
   friendly gear on the board. `[Quick-Draw]` (819.1.d) is the cheapest way to pay such a cost, since
   the gear re-attaches on the play with no `[Equip]` cost determined and at `[Reaction]` speed,
   which 381 would otherwise forbid.
5. **The *"within 3 points of the Victory Score"* threshold moves between formats**: 194.3 puts the
   Victory Score at 8 and 489.3 at 11, so the same clause reads an opponent at 5 in Constructed and
   at 8 in 2v2.
