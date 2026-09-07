# Matrix families, rows 6–18 — second pass

Issue #169. Session `rc-walk-fam1`, 2026-09-07. Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt` (grep). Every rule number below was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and is quoted where it carries weight.

## 0. Scope and method

The two-card CAUSE/TRIGGER matrix (`.scratch/cands.json`, method in
`docs/phase0/walks/2026-09-06-finisher-feeders.md` §16) holds 1,522 unrefused same-identity pairs in
47 trigger groups. The **first pass** wrote one entry per trigger card with its best partner. This
**second pass** takes rows 6–18 and walks every partner whose NUMBERS or TRAP differ from the
entries that already exist on that trigger card. Same mechanism with the same arithmetic on a
slightly different card is a `notable`, not an entry.

| row | event | trigger card | partners | entries before this walk |
|---|---|---|---|---|
| 6 | discard | `OGN-202` Jinx, Rebel | 21 | 4 |
| 7 | stun | `OGN-059` Eclipse Herald | 21 | 2 |
| 8 | stun | `UNL-055` Vex, Mocking | 21 | 3 |
| 9 | stun | `OGN-072` Solari Shrine | 22 | 2 |
| 10 | discard | `VEN-094` Mask Mother | 23 | 1 |
| 11 | hide | `UNL-023` Katarina, Reckless | 36 | 2 |
| 12 | choose-friendly | `SFD-195` Blade Dancer | 9 | 3 |
| 13 | choose-friendly | `SFD-142` Jae Medarda | 19 | 2 |
| 14 | choose-friendly | `SFD-144` Spirit Wheel | 27 | 2 |
| 15 | play-facedown | `SFD-121` Black Market Broker | 1 | 5 |
| 16 | play-facedown | `OGN-167` Ember Monk | 36 | 2 |
| 17 | play-facedown | `UNL-023` Katarina, Reckless | 36 | 2 |
| 18 | recycle-main | `OGN-235` Karma, Channeler | 35 | 4 |

Refuse-by-rule buckets are counted, not dropped: **A** Hold payoff + Main-Phase engine (315 before
316; 167) · **B** excess-damage + bloodless removal (465.1; R28 = A) · **C** [Hidden] on the
attacking side (811.1.b, 811.1.d.2) · **D** banned in every format · **E** a ready that buys
nothing. Legality of every card named below was checked against `data/legality.json` (`bases` is an
array): **none is banned or restricted in any format**.

## 1. The rule this walk cites that no entry had cited before

**381. "All Activated Abilities can only be activated on the Controlling Player's Turn and during an
Open State."**

Read against **383.3.c** ("Triggered Abilities can be put on the Chain during Closed States or Open
States on any [player's] turn") it splits every "exhaust this to do X" card in the pool into two
families that look identical on the card face:

- an exhaust inside an **Activated** ability (a colon, 377.1) is **your turn, Open State, only** —
  unless the card carries [Action] (806.1.b) or [Reaction] (813.1.c.2);
- an exhaust inside a **Triggered** ability ("When you …, you may exhaust this to …") fires
  **whenever its condition is met, on anybody's turn**.

`OGN-023 Unlicensed Armory` is the first family; `SFD-144 Spirit Wheel`, `OGN-072 Solari Shrine` and
`SFD-195 Blade Dancer` are the second. Three of the entries below turn on it.

Corollary for the discard lens: sweeping `data/corpus_flat.txt` for `discard` intersected with
`[Reaction]` returns **exactly one row**, `UNL-125 Lunar Boon`. Every other discard outlet in the
pool is a play trigger, a move trigger, a conquer trigger, an [Action] spell or an Activated
ability, and 381 pins that last family to your own turn. So the Boon is the only card in the game
that can make a discard-watching trigger fire on the opponent's turn.

## 2. Batch 1 — the discard family (rows 6 and 10), six entries

### 2.1 `jinx-rebel-lunar-boon-reaction` — OGN-202 + UNL-125

The speed differentiator. 813.1.c.1 puts the Boon in any Closed State on any player's turn. What
lands is the **+1 Might** (465.2.b sums the defending Might, 465.2.c assigns that much damage); what
does not land is the **ready** — 144.1.b forbids the Standard Move in a Closed State, 381 keeps
activated abilities on your own turn (and Jinx has none), and combat does not read exhaustion at all
(464.2.c.3, 465.2.b; #61). Refuse-bucket E stated inside a live entry instead of used to kill it.

The real price is not "E3": 167 empties every Rune Pool at the start of each player's Main Phase and
415.3.a readies your runes only in *your* Awakening, so the three Energy comes from three runes you
left ready through your own turn and tap at 164.2.a's Reaction speed.

### 2.2 `jinx-rebel-unlicensed-armory-repeatable-shield` — OGN-202 + OGN-023 (in zero entries)

The only one of Jinx's 21 partners that never leaves the board: the discard sits in a gear's
Activated-ability **cost**, so it repeats every turn (415.3.a readies the gear). 381 is what makes it
a your-turn card, and the shield says "the next time it would die **this turn**" — so the Armory can
never answer the opponent's removal on the opponent's turn. It is the exact mirror of 2.1.

Both traps of the heal/exhaust/recall family are live: 808.1.d.1 erases the saved body's Deathknell,
and 455 ("relocated from anywhere to its Base without it being a Move") sends it home, switching off
any "While I'm at a battlefield" text and, with 323.6, handing back the battlefield if it was the
only body there.

### 2.3 `jinx-rebel-zaun-warrens-free-outlet` — OGN-202 + OGN-298 (in zero entries)

The cost differentiator: battlefields are their own three-card zone (103.4.c; Tournament Rules
402.1), so the Warrens is the only partner that produces a discard event **without a Main Deck
slot**, and it is card-neutral.

The "you" worry answers itself from the order inside 466.5 rather than from a reading: the player
with units remaining **Establishes Control first**, and only then does 466.5.d say "Establishing
Control results in a Conquer"; 469.1.b confirms "A player will gain control of a Battlefield after
establishing Control". So you are already the Controller when "When you conquer here" is checked and
190.6.d never bites. Ceiling: 470 caps Scoring at once per battlefield per turn and 485.4 puts two on
a Duel table, so **one Jinx trigger per turn, maximum**; 485.5 selects one of your three battlefields
at random (486.5 says only "selects"), and 103.4.c forbids stacking copies to improve the odds.

### 2.4 `mask-mother-lunar-boon-reaction-trick` — VEN-094 + UNL-125

Her +2 Might inside the opponent's combat, through the pool's only [Reaction] discard. The finding is
**383.3.b / 383.3.b.1**: "you may pay :rb_energy_1: to …" is the trigger's BASE COST and must be paid
"in order to finalize the Triggered Ability to the Chain" — you cannot watch the damage assignment
and then decide. With 167 and 415.3.a that is a **fourth** rune held ready, on top of the Boon's
three. Read as pay-on-resolution the trick looks free to hold back; it is not.

### 2.5 `mask-mother-brazen-buccaneer-cost-discount` — VEN-094 + OGN-002 (in zero entries)

The Mother sold rather than cycled: the Buccaneer's optional additional cost converts her straight
into 2 Energy of discount (E6 → E4), replacing nothing.

**The trap, and the reason the entry exists.** The Buccaneer is *not* a legal target for the +2 Might
he paid for. "As you play me" puts the discard in the playing steps, so her trigger is Finalized
above a still-pending Buccaneer and 340.1 ("The newest Finalized Chain Item resolves") resolves it
before he is on the Board. Generalised: **a trigger that fires on a cost paid while playing a card
resolves before that card arrives, so the card being paid for can never be the target of what its own
cost triggered.**

**Refusal in the same breath.** `SFD-149 Ezreal, Prodigy` ("Optional additional costs you pay cost
:rb_energy_1: or :rb_rune_rainbow: less") does **not** discount "discard 1" — the cost has no Energy
and no rainbow component for the reduction to bite on, and 356.6 is a floor on resource costs, not a
converter. Ezreal discounts the Power-flavoured optional costs (UNL-028 Pyke's 1 Fury, UNL-052 Nami's
1 Calm, VEN-120 Masa's 1 Order, OGN-030 Jinx, Demolitionist's [Accelerate]) and nothing else.

### 2.6 `mask-mother-ruthless-strike-doubled-payment` — VEN-094 + VEN-008 (in zero entries)

One card, two payments: the discard raises the spell from 3 damage to 5 **and** buys +2 Might. The
window is narrower than 2.4 on purpose — 806.1.b puts [Action] inside Showdowns only, while
813.1.c.1 puts [Reaction] in any Closed State. And unlike 2.5 the ordering is harmless: the spell's
target is an enemy unit and the +2 goes on a friendly body already in play, so the two halves never
contend.

### 2.7 Refusals and notables from batch 1

- **`SFD-149 Ezreal, Prodigy` as a discount on any discard cost** — refused, see 2.5. Rule: 356.6 plus
  the absence of an Energy/rainbow component in "discard 1".
- **`VEN-143 Master of Shadows` as Jinx's outlet** — not written as an entry, because
  `master-of-shadows-banish-rummage` already runs the legend with its renewable banish and five
  cards; adding Jinx makes a sixth, and a lead that would add a sixth card to a five-card line goes
  in a notable, never in `uses`. Recorded here as a lead for that entry instead.
- **`UNL-088 Gutter Palace` as a discard outlet for either trigger card** — refused as
  anti-synergic: its ALT_WIN half needs "exactly 4 cards in hand" at the start of your Beginning
  Phase, and a discard engine is a machine for missing that number. It remains a fine dial in
  `gutter-palace-reaction-dials`, which is about controlling hand size, not spending it.
- **`OGN-020 Scrapyard Champion`, `OGN-178 Undercover Agent` and any "discard 2" instruction as two
  Jinx triggers** — refused on wording: "When you discard one or more cards" is ONE event however
  many cards move (already the content of `jinx-rebel-discard-event-ready`). It is two Mask Mother
  triggers, because each copy has its own ability — that asymmetry is the whole of
  `mask-mother-scrapyard-champion`.
