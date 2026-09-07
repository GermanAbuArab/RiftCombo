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

## 3. Batch 2 — the stun family (rows 7, 8 and 9), eight entries

The stun lens was swept once (#61) and its bounds still hold: 423.1.a.1 plus 423.1.a.2 mean no stun
engine can be INFINITE, no card pays points for a stun, and the lens is Calm + Order. What #61 did
not do is price the individual pairs, and three rules do most of the work here.

**423.1.b vs 423.1.c.** "A Stunned Unit does not contribute its might to damage in the combat damage
step" — but "must still have damage applied to it equal to, or greater than, its full might value to
be killed". A stun mutes; it never softens. Every entry below is priced on the muting.

**381 vs 383.3.c**, the split from §1. `OGN-072 Solari Shrine`'s "you may exhaust this to draw 1"
hangs off a *trigger*, so 383.3.c puts it on the Chain on either player's turn; `UNL-194 Shadow`'s
identical-looking exhaust sits in an *Activated* ability and reaches the opponent's turn only because
it carries [Action] (806.1.b).

**811.1.b's tail**, which no entry had quoted: "*Beginning on the next turn, this gains [Reaction]*
and you may play this, ignoring its base cost." Every hidden card — unit, gear or spell — is a
[Reaction] card once it is face down.

### 3.1 `eclipse-herald-thwonk-repeat-two-stuns` — OGN-059 + SFD-040

820.1.b gives exactly one extra execution; 820.2.a permits a different choice and 423.1.a.1 *forces*
one, so two attacking units are muted and the Herald takes **two** triggers (+2 Might, defending at
9). Both readies are dead (144.1.b, 381, and combat's indifference to exhaustion). Four Energy, all
of it off runes held ready through your own turn (167, 415.3.a, 164.2.a).

### 3.2 `eclipse-herald-nami-headstrong-delayed-ready` — OGN-059 + UNL-052 (in zero entries)

**The exception to a standing project rule, and it is swept.** "A Hold-triggered ready is a no-op"
because 315.1.b readies everything in the Awaken Phase before 315.2's Scoring Step. `UNL-052 Nami,
Headstrong` escapes it: her Hold arms a *delayed* effect — "the next time you play a unit this turn,
ready it and [Buff] it" — and a unit is played in **316**, the Main Phase, after 315.2. Sweeping
`corpus_flat.txt` for `hold` ∩ `ready` returns five rows and Nami is the only one that produces an
actual ready: `SFD-027 Dunebreaker` and `UNL-016 Scorchclaw` say "I enter ready" (a play-time
property, never a ready — 415.1), and `UNL-048 Trevor Snoozebottom` and `UNL-199 Deceiver` play
tokens that are printed ready.

What it buys is 143.4's cost back: a unit played to base is readied the same turn and
Standard-Moves into a battlefield immediately — [Accelerate] on one unit a turn for free, plus a real
702 buff counter (spendable, unlike a "this turn" modifier).

### 3.3 `eclipse-herald-existential-dread-repeat-bounce` — OGN-059 + UNL-134

The mirror of 3.1 on the same trigger card. 820.2.a's "do not have to be the same" is a *permission*,
so aim the second execution at the **same** unit: 423.1.a.1 makes it already stunned, and the card's
printed branch returns it to its owner's hand. One Herald trigger instead of two, traded for hard
removal at 3 Energy + 1 Chaos Power. The bounce beats the stun because 423.1.a.2 clears a stun at
step 3d of the end-of-turn cleanup anyway.

### 3.4 `vex-mocking-masa-free-tank-arrival` — UNL-055 + VEN-120 (in zero entries)

Masa's stun reaches *any* battlefield, wherever he is played, and Vex's relocation is an **effect**
move — 420.3.a puts the exhaust cost on the Standard Move alone, and 810.1.c.3 says [Ganking] only
widens the Standard Move, so no exhaust and no keyword is needed. 190.3.a.1 then applies Contested
and 464.2.c.1 makes **you** the Attacker: a 5-Might [Tank] enters an enemy battlefield as an attacker
having paid nothing. If the combat is already open she still joins it — 464.2.c.3.a defers the
designation to "the Cleanup phase following the action that caused it to become present", 319.8 makes
a Cleanup Outstanding "After a Move is completed", and 323.2.a assigns it there.

Stated because the card face invites the error: 814.1.c is "*While I am a defender*, I have +X [M]",
so her [Shield] is worth **nothing** on the offence this entry builds. She is a 5-Might Tank here.

### 3.5 `vex-mocking-blast-cone-drag-and-tank` — UNL-055 + UNL-133

Dragging an enemy body onto a battlefield you control makes **them** the Attacker on **your** turn:
190.3.a keys Contested on the moved unit's controller ("a Unit controlled by a Player who does not
currently Control that Battlefield Moves or otherwise becomes present there") and 464.2.c.1 reads
that, not who caused the move. The Cone then stuns what it just moved, and Vex arrives as a
*defender* — so here the [Shield] is live and she is 6.

**The entry's own shortfall, up front.** The Cone's two sentences are not one engine: the play trigger
supplies one enemy move, once; the stun half is a Triggered Ability (383.3.c, any turn; 415.3.a
readies the gear) that needs some *other* card to move an enemy unit before it has anything to stun.
447.2's invalid-destination list does not bite — 447.2.a is scoped to "Modes of Play with more than
two players" and 485.1 puts two on the table.

### 3.6 `vex-mocking-shadow-gloomist-relay` — UNL-055 + UNL-194 + UNL-193 (Shadow in zero entries)

**Caught by running the Signature check before writing the legend line.** `UNL-194 Shadow` is a
Signature card tagged Vex, so 103.2.d.2 forces the legend, and a sweep of every legend in
`cards.json` for the Vex tag returns exactly one name: **Gloomist** (UNL-193 / UNL-232). The
domain-shaped answer — "the three Calm/Chaos legends" — would have been wrong twice over. 103.2.d.1
then caps the list at three Shadows, which is also how many battlefields need covering.

Shadow is 381's exception: his Activated ability carries [Action], so 806.1.b puts the stun inside the
opponent's Combat Showdown, and "If you play me to a battlefield, I enter ready" is 143.4.a's
exception to 143.4, so he acts the turn he lands. Vex teleports onto the battlefield he is defending
and 815.1.c.2 makes *him* an invalid damage assignment until she has lethal — the Tank protects the
stunner.

### 3.7 `solari-shrine-vi-peacekeeper-attack-draw` — OGN-072 + UNL-176

One card supplies both halves of a two-part condition: Vi stuns on every attack for free, and her own
5 Might is the damage that kills the stunned body (465.2.c.3 forces lethal onto one unit; 143.2.a
kills at Might). One card per turn, no Energy after deployment.

[Ambush] is a *separate* use and does not produce an off-turn stun: 822.1.b lets her land as a
[Reaction] where you control units, but "When I attack" needs the Attacker designation (464.2.c.3),
which only your own turn produces.

### 3.8 `solari-shrine-kennen-hidden-defensive-draw` — OGN-072 + VEN-135

811.1.b's tail gives Kennen [Reaction] once he is face down, so a 3-Energy body enters mid-combat on
the opponent's turn for **zero** Energy — and 811.1.d.2's restriction is the *feature*: a hidden
card's play-effect targets are confined to the battlefield it was hidden at, which is one you
control, which on their turn is where their attacker is standing. (This is refuse-bucket C read from
the other side: the same clause kills a hidden removal on the attacking side, because the battlefield
you attack is by definition not one you control.) His own static makes him a 4-Might defender while
the stun lasts, the attacker dies, and the Shrine draws — on the opponent's turn, which 383.3.c
permits and 381 would have forbidden had the same words sat in an Activated ability.

### 3.9 Refusals from batch 2

- **`OGN-157 Udyr, Wildman` + `OGN-261 Radiant Dawn` as a buff/stun loop** — refused twice over. Radiant
  Dawn ("When you stun one or more enemy units, buff a friendly unit") is the pool's only buff-on-stun
  card and is **Calm/Order**, while Udyr ("Spend my buff: … • Stun a unit at a battlefield") is
  **Body**: 103.1.b.4 admits no card whose domain the identity lacks, and no legend has three domains.
  Even inside one identity the loop is capped at one execution a turn by Udyr's own "Choose one you've
  not chosen this turn", and 702.3 stops the buff stacking.
- **`OGN-220 Facebreaker` as a Solari Shrine enabler** — refused on wording. It stuns "a friendly unit
  and an enemy unit at the same battlefield", and the Shrine pays only for killing "a stunned **enemy**
  unit", so the friendly half is pure drawback. It stays useful in
  `solari-chief-facebreaker-shrine-kill`, where the enemy half is what is being bought.
- **Any stun as a route to a kill** — refused as a class: 423.1.c keeps the stunned unit's *full*
  Might as the bar for killing it, so a stun never lowers the price of removal. Every entry above
  prices the stun as muting (423.1.b), never as softening.
- **A stun applied on the opponent's turn carried into your own attack** — refused: 423.1.a.2 clears
  the status "during step 3d of the end of turn cleanup", so nothing survives the turn boundary.
