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

## 4. Batch 3 — the hide / play-facedown family (rows 11, 15, 16, 17), five entries

Four facts about [Hidden] do all the work in this family, and three of them are in the keyword's own
paragraph, which no entry had quoted in full:

1. **811.1.b's tail grants [Reaction].** "…Beginning on the next turn, this gains [Reaction] and you
   may play this, ignoring its base cost." With 813.1.c.1 ("This can be played during Closed States on
   any player's turn") that makes every hidden card — **unit, gear or spell** — playable inside the
   opponent's combat, for zero Energy.
2. **811.1.b caps the family by BOARD, not by deck.** You may hide "at a battlefield you control **that
   doesn't already have a facedown card hidden there**". One facedown per battlefield, and 485.4 puts
   two battlefields on a Duel table. So a "when you play a card from face down" trigger fires **at most
   twice a turn** however many [Hidden] cards the list runs — and only once if you control one
   battlefield. Katarina and the Ember Monk both read like engines that scale with [Hidden] density and
   neither does.
3. **811.1.d binds the hidden card, never the watcher.** 811.1.d.1 puts a hidden permanent at that
   battlefield; 811.1.d.2 confines a hidden card's play-effect targets there. Katarina's "deal 2 to an
   enemy unit" and the Ember Monk's "+2 [M]" are their OWN Triggered Abilities, not play effects of the
   hidden card, so 811.1.d reaches neither. Half of the value in this family comes from that asymmetry.
4. **356.1.b.3: "ignoring its base cost" leaves an optional ADDITIONAL cost intact**, with Riot's own
   worked example (Legion Rearguard + Accelerate).

### 4.1 `katarina-mischievous-marai-facedown-four-damage` — UNL-023 + UNL-003 (in zero entries)

Mono-Fury. 4 damage and a 2-Might body for one rainbow and no Energy, inside the opponent's combat.
The Marai's own 2 is confined to the hidden battlefield (811.1.d.2) — which is where their attackers
are, so the restriction is the feature — while Katarina's 2 goes anywhere. 464.2.c.3.a + 319.6 +
323.2.a put the body in the damage step it arrived for.

### 4.2 `katarina-lotus-trap-sudden-storm-board-cap` — UNL-023 + UNL-013 + SFD-017 (both in zero entries)

The entry's headline is its own bound (fact 2 above). The constructive half is a chain-order finding:
**Lotus Trap cannot double its own arrival.** Playing it is the event Katarina watches, so her trigger
is Finalized above the still-pending spell and 340.1 runs her 2 damage *before* the doubling exists.
The Trap therefore pays on the **second** facedown play of the turn, and only on Katarina's own damage
— 811.1.d.2 keeps the Trap's choice at battlefield A and Sudden Storm's at B, so the Storm's own 4 can
never be doubled. Total 2 + 4 = 6 at A, plus 4 at B, for zero Energy.

R26 (issue #11) was ruled the other way for a "when you play a **spell**" trigger, on 359.3.e.10's
example. Extended to "when you play a card from face down" the first 2 would double too and the total
would be 8. **The entry stands on the floor of 6 and does not need the reading**, which is the
project's standing preference for sequencing over interpretation.

### 4.3 `katarina-pyke-dockside-additional-cost-survives` — UNL-023 + UNL-028 (in zero entries)

356.1.b sets the *Base* Cost to zero and 356.1.b.3 says outright that "Further additional costs and/or
cost increases applied in subsequent steps may raise the card's Total Cost above zero", with the Legion
Rearguard + Accelerate example. 204.1.a puts the Base Cost "in the upper left corner of the card";
204.2 makes an Additional Cost something else. So Pyke played free from face down can still pay his
1 Fury Power and collect "ready me and give me +2 [M]" — a ready 4-Might body with [Ganking].

Two smaller facts stated because they are easy to invert: the ready is a **real** ready (415.1 marks a
Game Object already on the Board), unlike "I enter ready" wording; and 144.1.b means the Standard Move
his ready pays for is unavailable in the Closed State he arrived in, so the aggressive line is a
your-turn facedown play and the defensive line just gets a bigger body.

### 4.4 `ember-monk-teemo-scout-facedown-wall` — OGN-167 + OGN-197 (Teemo in zero entries)

Mono-Chaos, +7 Might of defence for zero Energy. The refusal that chose the partner is in the entry:
**the Ember Monk pays per CARD played from [Hidden], not per body**, so `UNL-081 Keeper of Masks`'
three bodies are one +2, and a small card whose own play trigger triples its own Might is worth more
than a card that makes three of them.

### 4.5 `black-market-broker-windsinger-free-bounce` — SFD-121 + SFD-138 (Windsinger in zero entries)

Row 15's whole partner list is one card, and the reason is a spelling: `SFD-138 Windsinger` prints
`Hidden` **without brackets** (registered in `docs/data-anomalies.md`, never normalised), which is why
the project's [Hidden] predicates are reminder-anchored rather than `\[Hidden\]`.

The entry refuses to overprice the Gold: 187.5 makes it "[Reaction][>] Kill this, **[exhaust]**: [Add]
[A]" and the Broker plays it **exhausted**, so it cannot pay for itself and is Power on your *next*
turn (415.3.a). The one card that fixes that, `SFD-171 Renata Glasc, Industrialist` (R25 = A), is
mono-Order and cannot share an identity with two mono-Chaos cards (103.1.b.4). And "another unit …
with 3 [M] or less" is not restricted to enemies, so on your own turn the bounce rescues or rebuys one
of yours.

### 4.6 Refusals from batch 3

- **Any [Hidden] card as an attacking-side trick** (refuse-bucket C, re-confirmed here) — 811.1.b hides
  only "at a battlefield you control" and 811.1.d.2 pins the play effect's targets there, so a hidden
  removal can never reach the battlefield you are attacking. The bucket's mirror image is what makes
  4.1 and 4.5 good: on defence, "a unit at the battlefield you control" *is* the attacker.
- **`UNL-081 Keeper of Masks` as an Ember Monk or Katarina partner** — refused on counting: three
  bodies arrive on ONE play, so the Monk gets +2 once and Katarina deals 2 once. The Keeper is a
  wall card, not a multiplier for these two.
- **Stacking [Hidden] density to scale either trigger card** — refused by 811.1.b: one facedown per
  battlefield you control. Three copies (103.2.b) of anything changes nothing; two battlefields is the
  ceiling and one battlefield halves it.
- **`OGN-107 Ava Achiever` with either trigger card** — refused, and already recorded as an `excludes`
  on both anchors in the synergy layer: she plays a [Hidden] card *from hand*, and 811.1.c.1 says
  "Hide is not a subset of Play", so neither "when you hide" nor "when you play a card from face down"
  ever sees her.

## 5. Batch 4 — the choose-friendly family (rows 12, 13, 14), six entries

This is the row where the matrix's false-positive rate is highest, and the reason is that "choose" is
one word covering four different game actions. **Eleven of the twenty-seven partners across the three
trigger cards do not fire them at all**, sorted into three kinds:

- **Chooses a card in a HAND or a TRASH, not a friendly unit on the board** — `UNL-139 Bone Skewer`
  ("You may choose a unit from it" — the opponent's revealed hand), `VEN-104 Tail-Cloaked Matriarch`
  and `VEN-114 Kharox` (both "choose a unit in [a] trash").
- **Chooses the wrong side, or removes what it chose before the payoff can land** — `VEN-106 Wind and
  Ghosts` chooses "a unit at a battlefield" and then banishes or bounces it; a Blade Dancer ready
  aimed at a unit that has left the board does nothing.
- **Not a spell** (`SFD-142 Jae Medarda` only) — his text is "When you choose me **with a spell**", so
  `SFD-195 Blade Dancer`, `SFD-144 Spirit Wheel`, `SFD-050 Azir, Ascendant`, `OGN-279 Fortified
  Position`, `OGN-023 Unlicensed Armory`, `VEN-137 Shady Spectacles`, `VEN-079 Dame the Despoiler` and
  `OGN-199 Tideturner` are all inert on him however friendly the unit they choose.

### 5.1 `blade-dancer-tideturner-free-swap-and-ready` — SFD-195 + OGN-199

`OGN-199 Tideturner` is **Riot's own worked example** under 811.1.d.2, quoted verbatim in the entry:
"Because its play effect has a targeting restriction that can never be fulfilled by a unit at its
battlefield, its target may be chosen freely from among the available options." It is the one hidden
play effect in the pool that reaches the whole board. Two units swap places with nothing exhausted
(420.3.a puts the cost on the Standard Move alone) and Blade Dancer readies the chosen one.

Stated because it decides how the line is played: the ready is worth a Standard Move on **your** turn
and nothing inside a Closed State (144.1.b, 381), so the Tideturner is played from face down on your
own turn here. Her ceiling is three triggers a turn — one from the Awakening plus one per conquer, and
470 with 485.4 caps a Duel at two conquers.

### 5.2 `jae-medarda-dragon-form-flow-double-draw` — SFD-142 + VEN-116 (in zero entries)

[Flow] is the only way in the pool to choose Jae twice with one card: 829.1.b is "You may play this
from your trash for its flow cost. Then banish it", so three copies is **six castings and six draws**,
and 108.6.c stops it there.

The partner was chosen by the project's own filler test — a leg taken only to satisfy a trigger must be
unconditionally castable — and Dragon Form passes twice over: "Choose a unit" always has a legal target
while Jae is out, and "its base Might becomes 5 this turn" is a **no-op** on a printed 5-Might body.
`VEN-127 Lacerate`, the other Order [Flow] spell in his row, fails the second half: "kill it if it has
3 [M] or less" makes aiming it at a small friendly body a kill.

Chaos/Order is one of the three single-name pairs in the legend census, so the identity admits exactly
one legend: Heart of the Tempest (VEN-155 / VEN-197).

### 5.3 `jae-medarda-marching-orders-repeat-two-draws` — SFD-142 + SFD-114 (in zero entries)

820.2.a lets the additional execution choose differently, so here you choose the **same** unit twice
and Jae fires twice. The word that makes the card safe to run is "anywhere": Jae fights from your
**base**, with no move, no exhaust and no Attacker designation — damage outside combat entirely.

The entry's shortfall is stated in its own arithmetic: marked damage accumulates within the turn
(143.2.a), so two enemies of 3 Might each add to 6 and kill a 5-Might Jae. Two draws can cost the
payoff.

### 5.4 `jae-medarda-repulse-counter-that-pays-for-itself` — SFD-142 + UNL-106 (in zero entries)

A hard counter to single-target removal that replaces its own card, for 1 Energy + 1 Body Power. The
ordering is the part worth writing down: targets are chosen **while a spell is played** (355.6,
355.7), so Jae's trigger is Finalized above Repulse and 340.1 resolves the draw *first* — you have the
card banked before the counter is even attempted.

"and no other friendly unit" is the real restriction: sweepers and two-target spells are outside it.

### 5.5 `spirit-wheel-fortified-position-defend-draw` — SFD-144 + OGN-279 (in zero entries)

The only chooser in the pool that costs nothing, repeats, and occupies no Main Deck slot (103.4.c). And
the reason the draw lands on the **opponent's** turn is §1's split: the Wheel's "pay 1 Energy and
exhaust this" hangs off a *trigger*, so 383.3.c applies and 381 does not.

Its ceiling is its own exhaust — **one draw a turn**, 415.3.a readying it in your Awakening — which is
the number a reader will otherwise assume scales with the number of choosers.

### 5.6 `spirit-wheel-tactical-retreat-reaction-draw` — SFD-144 + UNL-175 (in zero entries)

The [Reaction] chooser the Wheel is short of (813.1.c.1). The entry leads with the **cost** of the save
rather than the save, because the card reads as pure upside and is a trade: 808.1.d.1 erases the saved
body's Deathknell, and 455 recalls it *to its base*, switching off any "While I'm at a battlefield"
text and, via 323.6, handing back the battlefield if it was your only body there. It also comes back
exhausted (315.1.b readies it only next Awakening).

### 5.7 Refusals from batch 4

- **`VEN-106 Wind and Ghosts` under Blade Dancer** — refused on ordering: the spell banishes (≤3 Might)
  or bounces the unit it chose, so by the time her ready would resolve there is nothing on the board to
  ready.
- **`UNL-139 Bone Skewer`, `VEN-104 Tail-Cloaked Matriarch`, `VEN-114 Kharox`** — refused on reading:
  each chooses a card in a hand or a trash, not a friendly unit on the board.
- **Every non-spell chooser under `SFD-142 Jae Medarda`** — refused on the word "spell", eight cards in
  his row of nineteen. This is the trap the issue named in advance and it is the largest single block
  of false positives in the slice.
- **`VEN-040 Decree of Focus` as a Blade Dancer or Spirit Wheel enabler** — not refused outright, but
  kept out of `uses`: it chooses "a friendly unit that's in combat with an enemy Fury unit or that's
  being chosen by an enemy Fury spell", which fails the filler test (a leg picked to satisfy a trigger
  must be unconditionally castable) against any opponent without Fury.
- **`VEN-137 Shady Spectacles` under Blade Dancer** — refused on Domain Identity: the Spectacles are
  Order and Blade Dancer's own two domains are Calm and Chaos, so 103.1.b.4 keeps it out of any deck she
  can lead. (Under the Spirit Wheel it is legal but redundant, since the Wheel caps at one draw a turn.)
