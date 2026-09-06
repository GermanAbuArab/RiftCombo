# Hand walks — the seven candidates from the legend lens (issue #47)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 6 HOLD, of which 4 only after a rewrite. 1 REFUTED. One candidate promoted ENGINE → INFINITE.**

The lens was *the legend as a piece*: 30 of the 49 legends appeared in no catalogued combo. #47
proposed seven candidates, all filed ENGINE, plus six structural findings offered as hypotheses.
This document walks the seven, opens every rule they cite, and settles the six findings.

---

## Step 2 done first, in bulk: every citation opened

**Ban check.** All 34 distinct cards named below were grepped for the `[BANNED …]` marker in
`data/corpus_flat.txt`. **None is banned or restricted in any format.** (The 12 marked lines in the
corpus are none of these.)

**Citations.** Every rule number the seven entries cite was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`. Two citations turned out to say something the candidate
did not expect, and both changed a verdict:

| rule | verbatim | what it decided |
|---|---|---|
| **827.1** | *"Empower is an Activated Ability keyword."* | Candidate 3 clears the hurdle #47 worried about — an Empower **is** an activated ability, so Curator can see it. |
| **827.1.c.3** | *"Empower abilities may also include text that alters the Empower cost. **Such text is taken into account when determining a card's Empower cost for any reason.**"* | …and then kills candidate 3's actual premise. See §3. |
| **355.2.a** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* | Kills #47's own refutation point 3 against candidate 2: a Recruit token with no printed destination can be played **straight to a battlefield you control**. |
| **357.1** | *"In total, pay the combined Energy cost (if any) and Power cost (if any)."* | Void Burrower's "banish one, then play it" is a normal play: the costs are paid (candidate 6). |
| **355.5 / 355.7** | 355.5 *"If a card requires you to specifically choose one or more Game Objects, that choice is made now."* · 355.7 *"When a card Chooses one or more specific Game Objects to affect, it is Targeted unless indicated otherwise."* | "Give a unit +3 Might this turn" **chooses**, so it triggers Blade Dancer (candidate 5). 355.5.a's carve-out is for effects that hit objects *"based on criteria"*, which this is not. |

### The six findings of #47, settled

**A — a legend is unreachable for the place-multipliers. CONFIRMED, and it is now catalogue policy.**
107.4.b *"This is not a location."* · 174.4 *"Legends cannot be Moved."* · 175 *"Legends are not
Permanents."* · 107.4.d *"The Champion Legend cannot be removed, moved, or displaced from this zone."*
All four read verbatim. `OGN-286 Reckoner's Arena` says *"When you hold here, activate the conquer
effects of units **here**"* — a legend is neither *here* nor a *unit*. Svellsongur is Equipment and
attaches to units. So the whole "legend + Arena" and "legend + Svellsongur" family is dead.

**B — Blue Sentinel / Red Brambleback would reach a legend, but no case is alive. CONFIRMED, nothing filed.**
Their qualifier falls on the hold/conquer event, not on where the ability lives, which is the same
step R8 already took (383.4.d.2). Walked all 30: every legend with a costless `When you conquer/hold`
is out of the Sentinel's or the Brambleback's domain (103.1.b), and every one in-domain pays an
`exhaust` the second instance cannot pay. **No reading filed** — no entry depends on it.

**C — three cards ready your legend. CONFIRMED** (`SFD-039` Royal Entourage, `SFD-210` Hall of
Legends, `SFD-208` Forge of the Fluft), and the CLAUDE.md note that a battlefield you provide starts
uncontrolled (190.1, 190.6.d) applies to the last two. Used in candidates 2 and 5.

**D — Heimerdinger gives your legend a second body. CONFIRMED, but #47's claim that he is
uncatalogued is OUT OF DATE**: the walk of #46 (same day, earlier) landed
`heimerdinger-vanguard-armory-recruits` and `heimerdinger-malzahar-double-power`. What is still new
is that neither of those touches a **legend** — they copy gear and a unit. Candidate 2 is the first
entry in the catalogue where Heimerdinger reaches the Legend Zone, and 355.9.a.4 is the referent.

**E — the rules print worked examples that transcribe two cards of this lens. CONFIRMED, verbatim.**
206's example is `OGS-006 Lux, Illuminated` word for word (*"When you play a spell that costs 5 or
more, give me +3 [M] this turn"*), which is the same clause as `OGS-021 Lady of Luminosity`.
206.1's example is `VEN-145 Curator of the Sands` transcribed whole. Both quoted in §1 and §3.

**F — two families are dead by rule. CONFIRMED and not proposed**: Radiant Dawn's buffs do not stack
(702.3, 702.3.a, 426.1.b.1, and 426.1.c's example transcribes `SFD-047 Simian Ancestor`), and the
four rune-ramp legends are capped by 161.2.a's *"Exactly 12 Rune cards"*.

---

# 1. `lady-luminosity-loop-spell-slot` — HOLDS, **promoted ENGINE → INFINITE**, and cheaper than proposed

```
OGS-021 | Lady of Luminosity - Starter | Legend | Mind/Order | -  | When you play a spell that costs :rb_energy_5: or more, draw 1. [Tags: Lux]
OGN-085 | Falling Comet               | Spell  | Mind       | E5 | [Action] (Play on your turn or in showdowns.) Deal 6 to a unit at a battlefield.
OGN-212 | Forge of the Future         | Gear   | Order      | E2 | When you play this, play a 1 :rb_might: Recruit unit token at your base. Kill this: Recycle up to 4 cards from trashes.
OGN-110 | Ekko, Recurrent             | Unit   | Mind       | E5 P1 M5 | [Accelerate] … [Deathknell] — Recycle me to ready your runes.
UNL-165 | Shadow's Call               | Spell  | Order      | E2 | Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2.
UNL-173 | Sacrifice                   | Spell  | Order      | E1 | [Reaction] … kill a friendly [Mighty] unit. Draw 2 and channel 1 rune exhausted.
```

**Two corrections to the candidate before the arithmetic.**

1. **The spell is `OGN-085 Falling Comet`, not `OGS-022 Final Spark`.** #47 reached for the 8-Energy
   Lux spell for flavour. Falling Comet is Mind (inside Lady's Mind/Order identity), costs **5**
   Energy with **no Power**, clears Lady's threshold exactly, and deals 6 — enough for every printing
   in the pool below 7 Might. Final Spark is 3 Energy dearer for 2 more damage and remains the
   upgrade when a 7- or 8-Might body has to die; both stay in the entry.
2. **The class is INFINITE, not ENGINE.** The pass below is a closed cycle — cards recycled in equal
   cards drawn — riding an engine already verified INFINITE, and its net cost is Energy the same
   engine mints without bound. That is the same shape as `lux-infinite-power` and
   `renata-mastermind-points`, both INFINITE, both `needs: infinite-energy`. It has a genuine repeat
   step, which CLAUDE.md requires before the label may be used.

## The card ledger, pass by pass — and why Lady is load-bearing

The identity that governs a loop pass is **cards recycled into the deck = cards drawn**. The verified
Energy pass of `lux-infinite-energy` balances at 4 = 4:

| plain Energy pass | into deck | out of deck |
|---|---|---|
| Forge recycles Forge + Shadow's Call + Sacrifice (3 of its 4 slots) | 3 | |
| Ekko's Deathknell recycles Ekko | 1 | |
| Shadow's Call draws 2, Sacrifice draws 2 | | 4 |
| **balance** | **4** | **4** ✔ |

Now add Falling Comet to the cycle. It occupies the fourth Forge slot, so **5** cards enter the deck.
Without Lady only 4 come out, and one card is stranded in the deck at the end of the pass — and which
one is not even choosable, because 416.5 randomises cards recycled simultaneously. The loop breaks.
**Lady's draw is exactly the fifth draw**, and Falling Comet's printed 5 Energy is exactly what turns
it on:

| Falling Comet pass | into deck | out of deck |
|---|---|---|
| Forge recycles Forge + Shadow's Call + Sacrifice + **Falling Comet** (4 of 4) | 4 | |
| Ekko's Deathknell recycles Ekko | 1 | |
| **Lady draws 1** on Falling Comet, Shadow's Call draws 2, Sacrifice draws 2 | | **5** |
| **balance** | **5** | **5** ✔ |

**Energy.** The plain pass spends 10 (Ekko 5 + Shadow's Call 2 + Sacrifice 1 + replaying Forge 2) and
gets 11 back from Ekko's readied runes: **+1**. The Comet pass spends 15 and gets the same 11:
**−4**. So **one Falling Comet costs a net 4 Energy**, funded by four plain passes. Unbounded.
(#47 priced it at 8 Energy on Final Spark; on Falling Comet it is 4, and the Power column is 0 in
both cases.)

**Against the ledger of #21, which this extends rather than re-derives.** The ledger's finding is that
draws, not slots, are the scarce resource — every pass leaves a spare slot and zero spare draws, and
the price of an extra cycled card is 1 Energy + 1 Mind Power ≈ 10 Energy through Renata Mastermind's
exhaust-free `Draw 1`. **Lady supplies that draw for free**, paid for by a spell the loop wanted to
cast anyway. That is the entry: not a new resource, a cheaper price for the one the ledger named.

**What it competes with, stated precisely.** `renata-mastermind-points` cycles its Retreat through the
one spare slot of the Energy pass. On a pass that fires Falling Comet, all four slots are taken, so
the two cannot share **that pass**. They are not alternatives: the ledger showed a Renata point costs
~50 passes and each pass leaves its slot behind, so the Retreat pass and the Comet pass simply
interleave. #47 said *"the two lines do not run in the same pass"*, which is right; the implication
that they exclude each other is not, and the entry says so.

**Ordering constraints, both real.**
- **Forge first, Comet second.** Lady's draw has no *"may"*, so 431.1.a would Burn Out on an empty
  deck. Firing Forge first puts the deck at 4; the Comet takes it to 3.
- **Ekko before Sacrifice**, unchanged from the base loop: Sacrifice's additional cost kills a
  friendly [Mighty] unit and Ekko is the M5 body.
- No other spell in the pass reaches 5 Energy (Shadow's Call 2, Sacrifice 1), and Forge is gear and
  Ekko is a unit, so Lady fires **exactly once** per pass. The card ledger depends on that.

**Trap sweep.** No [Repeat] (429.3/R21 cannot bite). No [Temporary] body is counted — Shadow's Call
marks Ekko, who dies to Sacrifice's cost the same Main Phase (the base entry's own sequencing). No
attack, so 807.1.d/383.4.e/461 never engage. No Energy is carried across a Main Phase boundary (167).
Falling Comet needs *"a unit at a battlefield"*: with none on the table the Comet is simply not played
and the pass reverts to a plain one, which is why it is a rider and not a requirement.

**Verdict: HOLDS, as INFINITE.** Filed as `lady-luminosity-loop-comet`.

---

# 2. `heimerdinger-herald-recruit-double` — HOLDS, with #47's third refutation point overturned

```
OGN-111 | Heimerdinger, Inventor | Unit   | Mind       | E3 P1 M3 | I have all :rb_exhaust: abilities of all friendly legends, units, and gear.
OGN-265 | Herald of the Arcane   | Legend | Mind/Order | -        | :rb_energy_1:, :rb_exhaust:: Play a 1 :rb_might: Recruit unit token.
SFD-210 | Hall of Legends        | Battlefield | Colorless | -    | When you conquer here, you may pay :rb_energy_1: to ready your legend.
SFD-168 | Vanguard Armory        | Gear   | Order      | E7 P1    | :rb_exhaust:: Play three 1 :rb_might: Recruit unit tokens. (You may play them to different locations.)
OGN-293 | The Grand Plaza        | Battlefield | Colorless | -    | When you hold here, if you have 7+ units here, you win the game.
```

**Why the ability travels.** Herald's is an Activated Ability with the exhaust symbol in its cost
(377.1: *"Activated Abilities are recognized by the presence of a ':' in the text of the card,
preceded by a cost and succeeded by an effect"*), so it is squarely one of the *"[exhaust] abilities"*
Heimerdinger's text names. The referent for *"friendly legends"* is 355.9.a.4: *"'Legend' refers to a
legend in the Legend Zone."* Using Heimerdinger's copy costs 1 Energy and exhausts **Heimerdinger**.

**R30 does not bite.** R30 = B says a restriction clause travels with the copied ability and is
re-read on the new holder. Herald prints **no** such clause, so nothing travels — unlike Renata
Mastermind's *"Use my abilities only while I'm at a battlefield"*, which is what R30 was voted about.

**The scope limit that halves the lens, and it is the entry's own bound.** A trigger worded *"When you
conquer, you may **exhaust me** to …"* is a Triggered Ability (383.1: recognisable by *"when"*), not
an activated one, so Heimerdinger does **not** get it. That excludes SFD-187, UNL-193, UNL-195,
OGN-249, SFD-205 and VEN-145 — six of the seven exhaust-paying legends in the lens. Herald is the one
legend in the pool whose exhaust sits in an activated ability's cost, which is why this pairing is
the only one available.

**#47's refutation point 3 is wrong, and 355.2.a is why.** It worried that Herald's token, which names
no destination, lands at the base and would need a further turn of moves to reach a battlefield.
355.2.a: *"By default, Valid locations include the controller's Base or a Battlefield the controller
controls."* The Recruits go straight to a battlefield you control. (This is the same third group
CLAUDE.md already records — 18 of the 49 token-makers name no destination.)

**Arithmetic with the declared quantities.** 143.4 makes Heimerdinger enter exhausted, so the engine
starts the turn after he lands; 415.3.a readies both every Awakening.

| board | Recruits per turn | Energy |
|---|---|---|
| Herald alone (the legend, no deck slot) | 1 | 1 |
| **+ Heimerdinger** | **2** | **2** |
| + Hall of Legends controlled, and you conquer there | 3 | 4 (1 to ready the legend + 1 for its second use) |
| + Vanguard Armory (`heimerdinger-vanguard-armory-recruits`) | **7** | 1 |

The last row is the reason this entry matters beyond its own two cards. Heimerdinger has **all** the
exhaust abilities, but only one exhaust to spend, so he takes the Armory's three; the Armory itself
gives three; and the **legend** gives the seventh for 1 Energy. Seven is exactly The Grand Plaza's
threshold, so the existing Armory entry's *"reaches seven in two turns"* becomes seven **in one turn**
once the legend is counted. The existing entry is left untouched; this one records the crossing.

**The two battlefields are mutually exclusive.** 485.4.a (each player provides three, only one is
used), 103.4.c and Tournament Rules 402.1 (unique names) mean Hall of Legends and The Grand Plaza can
never both be on the table. The three-Recruit row and the Plaza finish are alternatives.

**And the seven have to survive a full opponent turn.** 315.2.b.2 puts the Hold in the Beginning Phase
and 383.2.a.1 measures the condition when the trigger is placed, so the bodies must still be standing
at the Plaza when your next Beginning Phase arrives. 143.4 also means the Recruits cannot defend the
turn they appear.

**Verdict: HOLDS as ENGINE.** Filed as `heimerdinger-herald-legend-recruits`.

---

# 3. `curator-base-cost-ramp` — REFUTED as proposed, REWRITTEN on the rule that actually applies

The candidate's premise: `VEN-050 Grumpy Rockbear` and `VEN-032 Frostcoat Mother` print
`[Empower] :rb_energy_12:. This ability costs :rb_energy_1: less for each rune you control`, so at 12
runes the Empower costs 0 — and 206.1 would make Curator trigger anyway on the **base** cost of 12.

**That is exactly what 827.1.c.3 forbids.** Verbatim:

> **827.1.c.3.** *"Empower abilities may also include text that alters the Empower cost. **Such text is
> taken into account when determining a card's Empower cost for any reason.**"*

206.1 reads *"…ignoring any alterations to that base cost **unless otherwise specified**"* — and
827.1.c.3 is the specification. Its neighbour 827.4 confirms the direction of travel: *"Empower and
whether a permanent or legend has Empower are a characteristic of those Game Objects and may be
checked or referenced by other Game Effects."* 206.1's own second worked example shows the same
mechanism from the other side, an Equip cost where *"the Weaponmaster trigger will refer to the cost
including the alterations. This is because Weaponmaster specifies that it includes modifications."*

So with 12 runes on the board, Grumpy Rockbear's Empower cost **is 0**, and Curator does not trigger.
The candidate's headline line is dead.

**Its stated fallback is dead too, for a duller reason.** #47 offered `SFD-084 Jayce, Man of Progress`
(*"play a gear with Energy cost no more than 7 from hand this turn, ignoring its Energy cost"*). The
**only** gear in the whole pool printed at exactly 7 Energy is `SFD-168 Vanguard Armory`, which is
**Order** — outside Curator's Calm/Mind identity (103.1.b). Nothing to play.

## What survives, and it is a better entry

The asymmetry between 206 and 206.1 is the finding. **206 has no escape clause:**

> **206.** *"Effects that need to determine a **card's** cost for any purpose always use its printed or
> copied cost, even if that cost is **increased, decreased, or ignored** as the card is played."*

Curator's trigger reads *"When you play a **unit, gear**, or activated ability with Energy cost 7 or
more"*. For units and gear, 206 governs and there is no 827.1.c.3 waiting. A discounted **card** still
triggers her; a discounted **Empower** does not.

The live line, all inside Calm/Mind:

```
VEN-145 | Curator of the Sands | Legend | Calm/Mind | -        | When you play a unit, gear, or activated ability with Energy cost :rb_energy_7: or more, you may exhaust me to ready up to 2 runes.
VEN-064 | Plaza Guardian       | Unit   | Mind      | E10 M8   | I cost :rb_energy_1: less for each gear you control. [Deflect] …
OGN-120 | Seal of Insight      | Gear   | Mind      | E0 P1    | :rb_exhaust:: [Reaction] — [Add] :rb_rune_mind:.
VEN-043 | Steel Paws           | Unit   | Calm      | E1 M0    | [Deflect] … [Empower] :rb_energy_7: … [Empowered][>] I have +7 :rb_might:.
VEN-046 | Nasus, Ascended      | Unit   | Calm      | E8 P1 M8 | [Deflect 2] … [Empower] :rb_energy_8: … [Empowered][>] When I conquer, you score 1 point.
```

**Plaza Guardian is the 206 case.** Printed 10, and *"1 less for each gear you control"*. With the
three Seals of `seal-power-faucet-bootstrap` on the board it is played for 7; with a fourth gear for
6, a sixth for 4 — and 206 keeps Curator reading **10** the whole way down. Curator then readies 2
runes, which 164.2.a turns into 2 Energy or 164.2.b into 2 Power. **An M8 [Deflect] body for a net 2
Energy and no Power**, and the Seals were already worth playing.

**Steel Paws and Nasus, Ascended are the 206.1 cases that still work** — precisely because their
Empowers are **flat**. A sweep of the whole corpus for an activated ability costing 7+ Energy returns
exactly four printings: VEN-032 and VEN-050 (dead by 827.1.c.3) and these two. So Curator's ability
half has a pool of two, and the entry names both. Steel Paws is a 1-Energy card that Empowers for 7
into an M7 [Deflect] body, with 2 Energy back; `nasus-ascended-sentinel-arena-hold` already carries
the Nasus half as a notable and is left untouched.

**Verdict: REFUTED as written, HOLDS rewritten, as ENGINE.** Filed as `curator-printed-cost-rebate`.

---

# 4. `dark-child-opponent-turn-runes` — REFUTED. There is no payoff in its domains.

```
OGS-017 | Dark Child - Starter | Legend | Fury/Chaos | - | At the end of your turn, ready up to 2 runes. [Tags: Annie]
```

The mechanism is real and the rules back it: 415.3.a readies your objects *"during the Awakening Phase
**on their turn**"*, so a rune exhausted on your turn is otherwise dead for the whole of the
opponent's; 167 empties the **Pool**, not the runes, so what Dark Child readies stays ready; and
164.2.a's `[E]: [Reaction] — Add [1]` makes them spendable off-turn.

**But an entry needs an interaction, and the pool has none in Fury/Chaos.** A grep of the whole corpus
for a card that pays you for acting on an opponent's turn returns **two printings**, and both are
Mind:

```
OGN-117 | Viktor, Innovator | Unit | Mind | E4 P1 M3 | When you play a card on an opponent's turn, play a 1 :rb_might: Recruit unit token in your base.
SFD-063 | Chemtech Cask     | Gear | Mind | E1       | When you play a spell on an opponent's turn, you may exhaust me to play a Gold gear token exhausted.
```

103.1.b keeps both out of a Fury/Chaos deck. That leaves Dark Child paying for a generic Reaction —
`OGN-169 Gust`, `OGS-011 Flash`, `OGN-033 Shakedown`, `UNL-131 Abandon` — which is a fact about one
card and a price list, not a pairing. #47 anticipated this outcome in its own refutation paragraph and
named the correct destination: **a synergy rule, not a combo**. `data/synergies.json` is owned by
another session, so the shape is recorded here and not written: `anchor: OGS-017`, `partner`: cards in
Fury or Chaos with `[Reaction]` and an Energy cost of 2 or less, `basis.rules`: 415.3.a, 167, 164.2.a.

The comparison that #47 asked for also holds: `OGN-073 Sona, Harmonious` (Calm, E4 P1 M4, *"At the end
of your turn, **if I'm at a battlefield**, ready up to 4 friendly runes"*) does twice as much and is
already catalogued in `sona-viktor-opponent-turn` — **with** Viktor, which is exactly the payoff Dark
Child cannot have. That entry is the proof that the missing half is the whole entry.

**Verdict: REFUTED. Nothing filed.**

---

# 5. `blade-dancer-choose-ready` — HOLDS, once the payment #47 could not find is named

```
SFD-195 | Blade Dancer      | Legend | Calm/Chaos | -        | When you choose a friendly unit, you may exhaust me and pay :rb_rune_rainbow: to ready it. When you conquer, you may pay :rb_energy_1: to ready me. [Tags: Irelia]
OGN-068 | Caitlyn, Patrolling | Unit | Calm      | E3 P1 M3 | I must be assigned combat damage last. :rb_exhaust:: Deal damage equal to my Might to a unit at a battlefield. Use this ability only while I'm at a battlefield.
SFD-052 | Heart of Dark Ice   | Gear | Calm      | E3 P1    | :rb_exhaust:: Give a unit +3 :rb_might: this turn.
SFD-039 | Royal Entourage     | Unit | Calm      | E3 P1 M4 | When you play me, ready or exhaust a legend.
```

#47 filed this honestly: *"is a motor sin pago propio… si el caminador no encuentra el pago, esto es
una regla de sinergia"*. The payment exists, and it is better than a payment — the same card that
triggers Blade Dancer also doubles what the ready is worth.

**The choose is real.** 355.5: *"If a card requires you to specifically choose one or more Game
Objects, that choice is made now"*; 355.7 makes such a choice a target. Heart of Dark Ice's *"Give a
unit +3 Might"* names one specific unit, so it is not 355.5.a's carve-out for effects that hit objects
*"based on criteria"*. Point it at a friendly unit and Blade Dancer's condition is met. 426.1.c
independently confirms the reading for the buff family: *"Units with Buff Counters can still be chosen
for actions that Buff units."*

**The turn, with the declared quantities (1 Blade Dancer, 1 Caitlyn, 1 Heart of Dark Ice):**

| step | cost | Caitlyn's Might | damage |
|---|---|---|---|
| Exhaust Caitlyn | — | 3 | **3** |
| Exhaust Heart of Dark Ice, choosing **Caitlyn** | — | **6** | |
| Blade Dancer triggers on the choose: exhaust her, pay 1 rainbow → ready Caitlyn | 1 Power | 6 | |
| Exhaust Caitlyn again | — | 6 | **6** |
| | **1 Power** | | **9 total** |

Nine damage against the three the same board deals without the pair, for one Power and no cards. Both
of Caitlyn's activations satisfy her own *"only while I'm at a battlefield"* clause, which is a
condition on using the ability under 377.2.b (its worked example, Ultrasoft Poro, is the same
sentence) — she never leaves the battlefield.

**The second and third readies, and their real prices.** 415.3.a gives Blade Dancer one readying per
turn for free. Her own `When you conquer, you may pay 1 Energy to ready me` gives a second — but it
buys nothing unless a **further** choose happens, so it wants a second Heart of Dark Ice (103.2.b
allows three): 1 Energy + 1 Power more, Caitlyn at 9 Might, a third activation for 9, **18 damage in
the turn**. `SFD-039 Royal Entourage` (Calm, in identity) is the third route and the only repeatable
one, since it is a unit rather than a trigger: *"When you play me, ready or exhaust a legend."*

**What it is not.** Blade Dancer readies the **chosen** unit, and readying is not itself a choose
(415.1 marks an object already on the board), so there is no recursion — one ready per exhaust of the
legend, full stop. And Caitlyn's own ability chooses an **enemy** unit, so it can never re-trigger
Blade Dancer.

**Verdict: HOLDS as ENGINE.** Filed as `blade-dancer-caitlyn-choose-ready`.

---

# 6. `void-burrower-drag-under` — HOLDS with the price corrected and the odds stated

```
SFD-187 | Void Burrower | Legend | Fury/Order | -     | When you conquer, you may exhaust me to reveal the top 2 cards of your Main Deck. You may banish one, then play it. Recycle the rest. [Tags: Rek'Sai]
SFD-164 | Drag Under    | Spell  | Order      | E5 P1 | [Action] … I cost :rb_energy_2: less to play from anywhere other than your hand. Kill a unit at a battlefield.
SFD-010 | Void Drone    | Unit   | Fury       | E3 M3 | I cost :rb_energy_2: less to play from anywhere other than your hand. [Tags: The Void]
OGS-012 | Blast of Power | Spell | Order      | E6 P1 | [Action] … Kill a unit at a battlefield.
```

**The costs are paid.** #47 asked for this to be verified and it checks out: Void Burrower says only
*"play it"*, with none of 356.1.b's *"ignoring"* language, so 357.1 applies unchanged — *"In total,
pay the combined Energy cost (if any) and Power cost (if any)."* Drag Under from banishment is
**3 Energy + 1 Power**, against the 6 Energy + 1 Power that `OGS-012 Blast of Power` charges for the
identical effect in the same domain.

**#47 named one payoff; there are two, and the second is why the entry works.** `SFD-010 Void Drone`
carries the same *"2 less to play from anywhere other than your hand"* clause and is **Fury**, the
other half of Void Burrower's identity — a 3-Might body for **1 Energy**. It also shares the *The
Void* tag with Rek'Sai. Six copies (3 + 3) instead of three doubles the hit rate.

**The odds, stated instead of glossed.** 103.2 sets the Main Deck floor at 40 cards. With 6 of the 40
printed for this, a single activation reveals two cards and hits with probability
1 − (34·33)/(40·39) = **28%**. That number belongs in the entry: it is a lottery, and no entry may
promise the kill.

**What the other 72% buys is not nothing.** *"Recycle the rest"* plus 416.1.a (*"Main Deck cards are
Recycled to the Main Deck"*) and 416.5 (bottom of the deck) means every activation **filters two cards
off the top for free** — which, in a shell whose whole problem is the draw bottleneck, is the
consolation prize being paid every single turn. The entry's product is therefore two things, and the
cheap play is the second of them.

**Bounds.** One activation per turn: the exhaust is 415.3.a-limited and the trigger needs a conquer.
And #47's Brambleback note is right — `UNL-029 Red Brambleback` is Fury and does cross into the
identity, but the additional trigger instance has no second exhaust to pay, so it does nothing here.

**Verdict: HOLDS as ENGINE.** Filed as `void-burrower-play-from-deck`.

---

# 7. `pridestalker-mighty-draw` — HOLDS, with the generic *k* replaced by a real board and one of #47's own traps deleted

```
UNL-183 | Pridestalker      | Legend | Fury/Body | -        | When you play a unit, give a unit +1 :rb_might: this turn. [Tags: Rengar]
OGN-012 | Noxus Hopeful     | Unit   | Fury      | E4 M4    | [Legion] — I cost :rb_energy_2: less. (Get the effect if you've played another card this turn.)
SFD-106 | Show of Strength  | Spell  | Body      | E2 P1    | [Reaction] … Draw 1 for each of your [Mighty] units.
SFD-103 | Jaull-Fish        | Unit   | Body      | E7 P2 M6 | [Accelerate] … I cost :rb_energy_2: less for each of your [Mighty] units.
OGN-038 | Kadregrin the Infernal | Unit | Fury   | E9 P2 M9 | When you play me, draw 1 for each of your [Mighty] units.
```

#47 asked for the generic *k* to be redone with a real list. Here it is, and it needs **three cards
and one turn**, not a board built over several:

| step | Energy | Might after | Mighty |
|---|---|---|---|
| Play Noxus Hopeful #1 | 4 | enters M4; Pridestalker's trigger gives it +1 → **M5** | 1 |
| Play Noxus Hopeful #2 ([Legion] is on — another card was played this turn) | 2 | M4 → +1 → **M5** | 2 |
| Play Noxus Hopeful #3 | 2 | M4 → +1 → **M5** | 3 |
| **Show of Strength** (Reaction) | 2 + 1 Power | | **draw 3** |

**Eight Energy for three Mighty bodies, then 2 Energy + 1 Power for three cards.** Against the ~10
Energy per extra card the #21 ledger measured inside a closed loop, three cards for 2 Energy + 1 Power
is the cheapest draw in the catalogue that does not need an engine underneath it.

**The trigger reaches the unit that caused it.** Playing finalises with the unit on the board, and the
trigger goes on the Chain afterwards (383.3.c), so the freshly played body is a legal choice for its
own +1. Nothing in the text stops all *k* triggers landing on one body either, which is the other mode:
three plays put a lone M4 at **M7**.

**383.3.d is the reason Kadregrin is in the entry.** Playing him triggers Pridestalker and his own
*"draw 1 for each of your [Mighty] units"* simultaneously, and 383.3.d hands the ordering to the player
who controls both: *"If more than one Triggered Ability is Triggered simultaneously, then the player
that controls…"* Resolve Pridestalker's +1 first, cross a fourth body, and Kadregrin draws for four —
plus himself at M9, five. Same fact the catalogue already leans on for `gutter-palace`.

**Jaull-Fish is the discount face of the same board.** Three Mighty units make his *"2 less for each"*
worth 6, so the E7 P2 M6 body lands for **1 Energy + 2 Power**.

**One of #47's own refutation points is deleted, on domain.** It warned that Pridestalker's mandatory
+1 could be turned against you by `UNL-173 Sacrifice`, whose additional cost kills a friendly
**[Mighty]** unit. Sacrifice is **Order**; Pridestalker is Fury/Body. 103.1.b keeps it out of the deck
and the trap cannot happen. A sweep of the corpus for anything else that punishes your own Mighty
units returns nothing — the five other printings that name `[Mighty]` (OGN-038, OGN-249, SFD-103,
SFD-106, SFD-218) all reward it. **The mandatory trigger is safe in this shell.**

**The real bound, and it is the one to state.** The +1 is *"this turn"*, not a Buff counter (702/703),
so the whole Mighty board evaporates at end of turn. Every payoff has to be cashed in the same turn,
which is exactly why Show of Strength is printed as a `[Reaction]`.

**Verdict: HOLDS as ENGINE.** Filed as `pridestalker-mighty-draw`.

---

# Scoreboard

| # | candidate | verdict | filed as |
|---|---|---|---|
| 1 | `lady-luminosity-loop-spell-slot` | HOLDS, rewritten, **ENGINE → INFINITE** | `lady-luminosity-loop-comet` |
| 2 | `heimerdinger-herald-recruit-double` | HOLDS | `heimerdinger-herald-legend-recruits` |
| 3 | `curator-base-cost-ramp` | REFUTED as written, rewritten | `curator-printed-cost-rebate` |
| 4 | `dark-child-opponent-turn-runes` | **REFUTED** | — |
| 5 | `blade-dancer-choose-ready` | HOLDS, rewritten | `blade-dancer-caitlyn-choose-ready` |
| 6 | `void-burrower-drag-under` | HOLDS, rewritten | `void-burrower-play-from-deck` |
| 7 | `pridestalker-mighty-draw` | HOLDS, rewritten | `pridestalker-mighty-draw` |

**No new rules reading filed.** Every question this lens raised was answered by a rule already in the
book — 827.1.c.3 for the Empower discount, 355.2.a for the token destination, 355.5/355.7 for the
choose, 357.1 for the play from banishment, 383.3.d for the ordering. Per the CLAUDE.md rule, a
different legal ordering was tried before anything was filed, and in candidate 1 the ordering (Forge
before the Comet) is what keeps the mandatory draw off an empty deck.
