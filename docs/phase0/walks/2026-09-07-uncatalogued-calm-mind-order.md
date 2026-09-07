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
