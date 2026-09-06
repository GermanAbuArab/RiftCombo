# Hand walks — the "this turn" counter lens (issue #98)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 3 walked, 3 HOLD — 1 as written, 2 only after a rewrite. 0 refuted.**
**All three are ENGINE and stay ENGINE. No INFINITE, no BURST, no CHAIN, no ALT_WIN.**

The bar for an ENGINE is *"the mechanism produces what the entry says"*, not *"reaches 8"*. Two of
the three had an arithmetic or a coverage error — one in the issue, one in a **different** issue that
had already condemned the same card — and the number that fixes each is below.

The issue's own structural work (§1 the two families, §2 tokens and `[Legion]`, §3 `the [Nth] time`)
is clean: every rule it cites says what it says it says. Its **measurements** are not, and neither is
issue #100's verdict on the third card.

---

## Step 2 done first, in bulk: every citation opened

Every rule number cited by issue #98, by issue #100 §325 (which condemns candidate 3) and by the
three new entries was pulled by exact number out of `data/Riftbound-Core-Rules-2026-07-16.txt` and
read there.

| cited | verbatim | verdict |
|---|---|---|
| **206** | *"Effects that need to determine a card's cost for any purpose always use its printed or copied cost, even if that cost is increased, decreased, or ignored as the card is played."* Worked example is **Lux, Illuminated** — a card of this very lens — and a **second** worked example is Defy vs Rocket Barrage: *"Rocket Barrage is a legal target for Defy even if Rocket Barrage's Repeat cost is paid, because Defy only checks the printed or copied cost of its target."* | holds — and the second example is the sharpest evidence for the split, see §1 |
| **206.1** | *"Effects that need to determine an ability's cost for any purpose use its base cost, ignoring any alterations to that base cost unless otherwise specified."* Its worked example is `VEN-145` Curator of the Sands verbatim. | holds |
| **166.2** | *"Players must add Energy and Power to their Rune Pool in order to be able to spend it to play cards or pay for Abilities with costs."* | holds |
| **203.1** | *"Paying a Cost requires a player to perform the appropriate game action: pay resources, spend counters or XP, kill units, etc."* | holds |
| **356.4.b** | *"Discounts may say that cards 'cost [amount] less' or that one or more of their costs are 'reduced by [amount]'."* | holds |
| **811.1.b** | *"…Beginning on the next turn, this gains [Reaction] and you may play this, **ignoring its base cost**."* | holds |
| **356.1.b.1** | *"If a card allows a player to play a card 'ignoring its cost,' its base Energy cost and base Power cost are set to zero."* | holds |
| **811.1.c.1** | *"Hide is not a subset of Play."* | holds — not cited by the issue, and it is what limits candidate 3 |
| **350.1 / 350.2** | *"A card is Played when it has finished this process in its entirety."* / *"Tokens are not cards, but can still be Played."* | holds |
| **185.2.a / 185.2.d** | *"Tokens can be played by their owner if their card type is played…"* / *"Tokens have a type. They follow all rules for their type…"* whose example reads *"A token unit is a unit. **It enters exhausted**…"* | holds |
| **052** | *"Card, when written in card effects, is shorthand for 'Main Deck card.' Runes, legends, and battlefields are not considered cards when executing the abilities and effects of game objects."* | holds |
| **383.1** | *"…or the phrase 'the [Nth] time' followed by a game action or event."* | holds. **383.1.b**, which the issue did not cite, is the companion: simultaneous instances still trigger it **once** (*"The ability triggers only once, due to the chosen condition"*), worked example Wraith of Echoes. |
| **338.1.a** | *"Play a Card **or** Activated Ability that is legally timed."* | holds — a card and an activated ability are enumerated apart |
| **356.2.a.2** | *"The cost imposed by the Deflect keyword is a Mandatory Additional Cost."* | holds |
| **312.2.a / 312.2.c / 312.2.d** | *"When the turn is in a Neutral Open State during their Main Phase."* / *"When the turn is in a Closed State, all pending chain items finish being finalized, and they control the next item on the Chain."* / *"…they are the next Player in Turn Order, and the player with Priority passes."* | holds |
| **315.1.b / 315.2.b.2 / 315.3.b / 315.4.b / 316** | Awaken readies → Beginning Phase **Holds** → Channel 2 → Draw 1 → Main Phase. | holds — the Main Phase is **after** the Hold, which is #100's one correct half |
| **144.1.a / 144.1.b / 144.1.c / 144.2 / 144.4.a / 144.4.b / 144.4.c.1** | *"This action can be done any time during a player's Main Phase."* / not in a Closed State / not in a Showdown or Combat / *"Exhausting the Unit is the Cost for this action."* / base→battlefield / battlefield→base / *"Units with Ganking may use their Standard Move to Move from Battlefield to…"* | holds |
| **420.3 / 420.3.a** | *"The Standard Move inherent to Units is a Discretionary Action."* / *"The Cost is Exhausting one or more Units."* | holds |
| **810.1.b / 810.1.c.3** | *"I may move to a battlefield from another battlefield with a standard move."* / *"It does not give additional abilities or activations of Movement, only new options for the Standard Move."* | holds |
| **359.3.f.1 / 359.3.f.2** | *"…words like 'here,' 'my,' or 'its.'"* / *"Information referenced in an instruction in this way will be checked on execution of the instruction."* | holds |
| **355.2.a** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* | holds |
| **143.4** | *"Units enter the Board exhausted."* | holds |
| **415.1** | *"Readying is an action that marks a non-spell Game Object on the board as available for action."* | holds |
| **434.1.c** | *"The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text."* | holds |
| **820.1.b / 820.1.c.1 / 820.1.c.3** | *"…a second time."* / *"**The Cost is an Additional Cost to be paid during the steps of playing the spell or ability.**"* / *"Each Repeat Cost can be paid only a single time."* | holds — **820.1.c.1 is the rule the issue never opened, and it is what makes candidate 1 affordable** |
| **485.4 / 485.4.a / 485.5 / 486.5 / 487.5 / 103.4.c / TR 402.1** | *"Battlefield Count: 2"* / *"Each player provides three (3) Battlefields… Only 1 will be used"* / *"randomly selects"* / *"selects"* / no two battlefields of a name | holds |
| **164.2.b / 315.3.b / 430.4.a** | *"Recycle this: [Reaction] — Add [C]."* (no exhaust in the cost) / *"The Turn Player channels 2 runes from their Rune Deck."* / *"A player Channels two Runes during the Channel Phase on their turn."* | holds — the free floor of 2 Power per turn |
| **190.3.a / 190.3.a.1** | Contested is keyed on the moving unit's controller. | holds |
| **195** | *"A player also wins the game if an effect instructs them to do so…"* | holds |

**Nothing in the table contradicts what cited it.** The citation audit is clean this time; the
arithmetic is not.

### Ban check

`grep -n 'BANNED' data/corpus_flat.txt` returns exactly 12 lines. **None** of `UNL-005`, `SFD-153`,
`UNL-009`, `SFD-100`, `SFD-097`, `OGN-026`, `OGN-253`, `SFD-187`, `UNL-187` is among them.
`OGN-177` Stealthy Pursuer **is** — it is the banned predecessor of candidate 1 and the reason that
candidate matters.

---

## §1 · The finding, checked and then sharpened: 206 carries BOTH halves of the split

The issue's split is right — `costs N or more` reads the printed cost (206, worked example Lux,
Illuminated), `if you spent N or more` reads what left the Rune Pool (166.2 + 203.1) — but it argued
the second half only from the *absence* of a redirecting rule. It does not have to.

**206's own second worked example decides it, in the opposite direction:**

> *"Defy is a spell which reads 'Counter a spell that costs no more than [4] and no more than [A].'
> Rocket Barrage is a spell that costs [4][C] and has a Repeat cost of [4][C]. Rocket Barrage is a
> legal target for Defy even if Rocket Barrage's Repeat cost is paid, **because Defy only checks the
> printed or copied cost of its target**."*

So the rules themselves take a case where the paid amount and the printed amount diverge — a Repeat
cost — and say that a `costs` card ignores the extra. **820.1.c.1** says the extra is nonetheless
*"an Additional Cost to be paid during the steps of playing the spell"*, so it **is** spent under
166.2 / 203.1. The two families are not merely unruled in opposite directions; one rule states both.

**Consequence the issue missed, and it is what makes candidate 1 work:** a `[Repeat]` cost is the
cheapest way to reach a `spent N` threshold, because it buys an extra execution of the spell as well.
`UNL-009 Upstage Comedy` (Fury, E2, `[Repeat] :rb_energy_2:` — *"Ready a unit."*) puts **4 Energy**
through the Rune Pool for a spell that readies twice.

Independent corroboration already inside this repo: the source quote on `virtuoso-banish-channel`,
transcribed from GrappLr's Jhin deck tech on 2026-09-06, reads *"Piercing Light may cost two, but it
costs four when it is repeated"* — a player of the `spent 4+` family counting the Repeat cost toward
the threshold. (Carried over from that entry's transcription; this walk did not re-open the video.)

**The `[Hidden]` half of the finding stands as written** (811.1.b + 356.1.b.1: base costs set to
zero, so a hidden card pays nothing to a `spent` trigger), and the audit of the two live Virtuoso
entries in the issue is correct — both were re-read here and neither needs a correction.

---

## §2 · Tokens and `[Legion]` — confirmed, with the reason the negative half never bit

350.2 + 185.2.a are exactly as quoted, and the negative half follows: the ten `[Legion]` cards ask
for a **card** played this turn, and a token is not one. Checked against the catalogue: the two
entries that mention `[Legion]` (`pridestalker-mighty-draw`, `spectral-matron-vanguard-captain`) pay
it with Main Deck cards, so **no correction is due anywhere**. 052 adds the other exclusions —
runes, legends and battlefields are not cards either.

---

## §3 · `the [Nth] time` — confirmed, and 383.1.b is the rule that finishes it

383.1 is verbatim as quoted. The issue stopped one paragraph short: **383.1.b** settles what happens
when the condition is met several times at once — *"the ability's controller picks one of those
instances to serve as the trigger condition. The ability triggers only once."* So the thirteen
`the [Nth] time` cards do not scale with a loop **and** do not scale with a simultaneous mass event
either. Nothing in the catalogue leans on them; nothing to fix.

---

# Candidate 1 · `revna-eye-herald-recruits` — HOLD as ENGINE, after a rewrite

**Cards.** `UNL-005` Revna the Lorekeeper ×1, `SFD-153` Eye of the Herald ×1, `UNL-009` Upstage
Comedy ×3. Legend Fury/Order: `OGN-253` Hand of Noxus, `SFD-187` Void Burrower, `UNL-187` Piltover
Enforcer. No ban markers.

**Verbatim** (`data/corpus_flat.txt`):

```
UNL-005 | Revna the Lorekeeper | Unit | Fury | E7 P1 M7 | [Ganking] (I can move from battlefield to
  battlefield.) When you play a spell, if you spent :rb_energy_4: or more, ready me. [Tags: Freljord]
SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] :rb_rune_order: (:rb_rune_order:: Attach
  this to a unit you control.) [Effect] When I move, play a 1 :rb_might: Recruit unit token here.
  [Tags: Equipment]
UNL-009 | Upstage Comedy | Spell | Fury | E2 | [Repeat] :rb_energy_2: (You may pay the additional cost
  to repeat this spell's effect.) Ready a unit.
```

**The mechanism.** 434.1.c appends the Eye's `[Effect]` text to Revna's Rules Text, so *she* reads
"When I move, play a 1 Might Recruit unit token here". 420.3.a puts the exhaust on the Standard Move,
so every move costs Revna her own readiness; 315.1.b gives one back per Awaken and Revna's own
trigger gives one per spell **on which 4+ Energy was actually spent**. 359.3.f.2 reads *"here"* on
execution, so the Recruit is born at the **destination**. 810.1.b + 144.4.c.1 let `[Ganking]` make
that destination another battlefield.

**Why it is not a duplicate of anything catalogued.** `pursuer-herald-recruits` is the same payoff
with `OGN-177` Stealthy Pursuer, **banned in Constructed and 2v2 since 2026-07-24** — and Riot's own
ban note names Eye of the Herald as the partner. `zed-clone-eye-recruits` is the Order/**Chaos**
rebuild. This is the Fury/Order one, and it is the only body in the pool that readies **itself** on a
card play with no exhaust in the trigger (the ready inventory of #56).

**What it adds over #48's bottleneck.** #48 measured that every token line pays a walk from the base
(355.2.a) and that only `SFD-177` Azir, Sovereign moves tokens in bulk. The Eye's Recruit is born at
a battlefield outright. The sibling INFINITE `twilight-reveler-eye-facebreaker-recruits`, same
Fury/Order shell, ends with *"unbounded Recruits **in base**"* — this entry is the other half of that
problem, not a competitor.

**THE ISSUE'S ARITHMETIC IS TOO PESSIMISTIC AND THE FIX IS 820.1.c.1.** #98 priced a ready at "a
spell of 4 Energy" and looked for one among the sixteen Fury/Order spells printed at E4 or more (the
cheapest clean one is `OGN-005` Disintegrate, E4, no Power). It never opened 820.1.c.1, so it missed
that a **Repeat cost is spent to play the spell**. `UNL-009` Upstage Comedy is E2 with `[Repeat] E2`:
4 Energy leaves the Rune Pool, Revna's trigger fires, **and** 820.1.b gives a second execution of
"Ready a unit". So 4 Energy buys one Revna move *and* readies a Recruit so it can walk. That is the
cheapest ready in the shell and the issue does not name it.

**Arithmetic with the quantities declared.** Twelve runes is 12 Energy. Moves = 1 (Awaken) + 1 per
qualifying spell = 1 + 3 = **4 moves = 4 Recruits per turn**, three of them born with a spare ready
attached. Revna is E7 P1 and 143.4 enters her exhausted, so the turn she lands she does not move; the
Eye is E1 plus 1 Order Power to `[Equip]`. Three copies of Upstage Comedy is the deck maximum
(103.2.b), which is what makes the rate hold for one full turn and not two — after that the readies
come from the sixteen printed-E4 spells at 4-to-6 Energy each.

**What refutes it, and it is in the card.** Revna is `spent`, not `costs`: **any** discount on the
spell switches the ready off — `OGN-031` Raging Firebrand (Fury, *"the next spell you play this turn
costs 5 less"*) is in-domain and turns her off outright — and a spell played from `[Hidden]` pays 0
(811.1.b), so it never readies her.

**The Grand Plaza route is refuted, and #98's own R1 undercounted the cost of refuting it.** #98
computed 11 moves / 40 Energy by assuming every Recruit born away from the Plaza is lost. It is not:
with `SFD-171` Renata Glasc, Industrialist (Order, in-domain) the tokens enter ready, and Upstage
Comedy readies one anyway, so a base-born Recruit walks to the Plaza on its own exhaust
(144.4.a). Shuttling base↔Plaza, **every** Recruit reaches the Plaza and six of them plus Revna is
**7 moves ≈ 24 Energy in one turn** — still twice a 12-rune turn, so the one-turn ALT_WIN stays
refuted, by a smaller margin than the issue claimed. Across two turns it does reach seven, but half
the bodies then have to survive **two** opponent turns instead of the one every other Plaza entry
pays, and nothing pins the spell suite that gets there. **Class stays ENGINE.** The Plaza is recorded
as a notable, not as a second entry.

**One ambiguity, deliberately not filed as a reading.** Revna's *"if you spent 4 or more"* could be
read per-spell or cumulatively for the turn (compare `UNL-004` Prepared Neophyte and `UNL-089` Jhin,
Meticulous Killer, which both spell out *"to play a spell this turn"*). The entry stands on the
**narrow** reading — 4 Energy on that spell — which both readings satisfy, so the question blocks
nothing and no R-number is opened. Per the project rule, a reading is filed only when it decides an
entry.

**Verdict: HOLD, ENGINE, `verified`.** Rewritten from the issue: Upstage Comedy added as the priced
ready, the rate raised from "2-3" to 4 per turn, and R1's refutation corrected downward to 7 moves.

---

# Candidate 2 · `yordle-explorer-power-cantrips` — HOLD as ENGINE, after a rewrite

**Cards.** `SFD-100` Yordle Explorer ×1, `SFD-097` Punch First ×3. Any legend whose domains include
Body. No ban markers.

**Verbatim.**

```
SFD-100 | Yordle Explorer | Unit | Body | E4 M4 | When you play a card with Power cost
  :rb_rune_rainbow::rb_rune_rainbow: or more, draw 1. [Tags: Yordle, Bandle City]
SFD-097 | Punch First | Spell | Body | E1 P2 | [Action] (Play on your turn or in showdowns.)
  Give a unit +5 :rb_might: this turn.
```

**The mechanism.** 206 makes the threshold read the **printed** cost, and the rule's own worked
example is this exact wording on Lux, Illuminated, so no discount and no `[Hidden]` play can switch
it off — the opposite behaviour to candidate 1, on the same lens. No exhaust in the trigger and no
cap per turn. It counts **cards** (350.2 keeps tokens out; they have no printed cost anyway), so the
P2 bodies a Body deck was playing regardless pay on top.

**THE ISSUE'S FUEL COUNT IS NOT A WELL-FORMED NUMBER.** #98 reports *"82 cards with printed Power ≥ 2;
**18** are legal in Body"*. Measured here over `data/cards.json`, one row per base code: **83** cards
carry a printed Power cost of 2 or more. "Legal in Body" is not a property of a card — Domain
Identity (103.1.b) is a subset test against the legend's **two** domains, so the fuel count is per
legend pair:

| legend | fuel cards with printed Power ≥ 2 |
|---|---|
| Body/Fury | 22 |
| Body/Calm | 26 |
| Body/Mind | 22 |
| Body/Chaos | 29 |
| Body/Order | 29 |

The floor is 22, not 18, and it is never a single number. (Body/Mind has exactly one legend,
`VEN-149` Defender of Tomorrow.)

**Arithmetic with the quantities declared.** The free floor of 2 Power per turn — 164.2.b recycles a
rune for Power with **no exhaust in the cost**, so a rune already spent for Energy still pays, and
315.3.b / 430.4.a channel 2 back before the next Main Phase — pays a P2 card outright. `SFD-097`
Punch First is E1 P2: **1 Energy and nothing else for a card drawn**, plus a +5 Might trick that was
free. That is one guaranteed draw per turn on top of the Draw Phase; a second P2 card in the same
turn costs runes that do **not** channel back, so the sustainable rate is one, and everything above it
is whatever the deck's own curve already spends Power on. Three copies of Punch First is the deck
maximum and is what makes the floor hold turn after turn.

**What refutes it, kept from the issue because it is right.** It is an engine **per turn, not per
pass** (#63's distinction). Inside a loop, 2 Power at the ~9-Energy-per-Power rate is strictly worse
than Renata Mastermind's `1 Energy + 1 Mind Power: Draw 1`, and none of the five cards of the
`lux-infinite-energy` pass (`OGN-085`, `UNL-165`, `UNL-173`, `OGN-212`, `OGN-110`) carries a printed
Power cost of 2, so it never fires there at all. And #59's wall applies: with the Main Deck empty an
unpaid extra draw is a Burn Out (431.1.a) and a point for the opponent.

**Verdict: HOLD, ENGINE, `verified`.** Rewritten: the fuel count replaced by the five measured
per-legend numbers, and Punch First promoted from an example to a declared ingredient, since the
anchor alone produces nothing.

---

# Candidate 3 · `brynhir-lockout-window` — HOLD as ENGINE, and it overturns issue #100's verdict

**Cards.** `OGN-026` Brynhir Thundersong ×1. No ban marker.

```
OGN-026 | Brynhir Thundersong | Unit | Fury | E6 M5 | When you play me, opponents can't play cards
  this turn. [Tags: Freljord]
```

**Issue #100 §325 orders this card documented as refuted, on two grounds. One of them is wrong.**

> *(a) es una unidad sin `[Reaction]`, se juega en el Main Phase, y … eso es después del Beginning
> Phase, así que jamás cubre tu propio Hold — y todos los ALT_WIN y **los dos BURST de Hold** del
> catálogo se resuelven ahí.*

The phase order is right (315.1 → 315.2 → 315.3 → 315.4 → 316, all opened above) and the conclusion
about Holds is right. **The census is not.** Counted here over `data/combos.json`, of the twelve
BURSTs **seven** score on a Hold and **five** score on a **Conquer** — `tryndamere-brambleback-conquer`,
`brambleback-trinity-skyfall-conquer`, `dragonstorm-brambleback-trinity-conquer`, `skyfall-ahri-conquer`
and `nasus-ascended-brambleback-conquer` — and a Conquer happens in the **Main Phase**, which is
precisely where Brynhir does reach. All five carry Fury among their card domains, so
Brynhir is in-domain for every one of them; `tryndamere-brambleback-conquer` is **mono-Fury with no `needs`**, and
`dragonstorm-brambleback-trinity-conquer` *"10 points in one Conquer, which is the game"*. The
premise "there is nothing in the catalogue for it to escort" is false by five entries.

> *(b) Su propio trigger es la última ventana … el rival tiene prioridad para contrarlo antes de que
> resuelva. Un candado que se contra no es un candado.*

This is correct as rules (312.2.c/d, opened above) and it is a **limitation, not a refutation**.
Without Brynhir the opponent holds a priority window at every chain item of the burst; with Brynhir
played **first**, they hold exactly one, and it is before you have committed anything — they must
spend their answer on a 6-Energy body instead of on the combo. "One contestable window instead of N"
is a different quantity, not a nil one, and the entry says so in its own words.

**Exact scope, and it is smaller than the card reads.** Four leaks, each from a rule opened above:

1. **Activated abilities pass.** 338.1.a enumerates *"Play a Card **or** Activated Ability"*
   separately. Brynhir touches only the first.
2. **`[Deflect]` payments pass.** 356.2.a.2 makes the Deflect cost a *Mandatory Additional Cost*, not
   the playing of a card.
3. **Tokens pass.** 350.2: *"Tokens are not cards, but can still be Played."* And 052 keeps runes,
   legends and battlefields out of the word too, so channelling is untouched.
4. **Hiding passes.** 811.1.c.1: *"Hide is not a subset of Play."* The opponent may still hide a card
   under the lock — they simply cannot **play** the one already hidden, which is the `[Reaction]`
   threat that matters.

And the one #98 got right on its own: `this turn` is **your** turn, so it never protects a Hold.

**Separate entry, not a `uses` on the INFINITE.** `jhin-virtuoso-ekko-malzahar-vi` already names
Brynhir in its `prerequisites.notable`. Adding her to that entry's `uses` would make the matcher
demand a card the loop does not need to run — the loop is complete without her — so the escort is its
own ENGINE and the INFINITE is left untouched. No `quantity` of any existing entry changed, so
`test/matcher.test.ts` is not at risk.

**Verdict: HOLD, ENGINE, `verified`,** with #100's two objections written into the entry so the
denial-lens walk does not re-litigate them. `produces` is empty: the catalogue has no feature name
for "a turn the opponent cannot answer", and `data/features.json` is not this session's file to edit.
Forty-nine entries already ship with an empty `produces`.

---

## What this walk did not do

- **§6 of the issue is left where it is.** The eleven pure-pump cards go to the buff/Might lens (#97,
  already walked) and the two synergy rules (`SFD-100` + printed Power ≥ 2; `OGS-021`/`OGS-006` +
  printed Energy ≥ 5) belong to `data/synergies.json`, which is not this session's file.
- **The other three denial cards of §6** (`UNL-190`, `VEN-132`, `VEN-039`) are issue #100's, and that
  walk is still queued.
- **No R-number was opened.** The one ambiguity found (Revna's per-spell vs per-turn `spent`) does not
  decide any entry, so per the project rule it is recorded here and not filed.

## For `CLAUDE.md`

1. `costs N or more` reads the **printed** cost (206, worked example Lux, Illuminated) and
   `if you spent N or more` reads what left the Rune Pool (166.2, 203.1, 356.4.b). **206 carries both
   halves**: its Defy / Rocket Barrage example says a `costs` card ignores a paid Repeat cost, while
   **820.1.c.1** makes that same Repeat cost *"an Additional Cost to be paid during the steps of
   playing the spell"* — so a `[Repeat]` is the cheapest way to reach a `spent N` threshold and is
   invisible to a `costs N` one. A discount switches the `spent` family off and never touches the
   `costs` family; a card played from `[Hidden]` pays 0 to it (811.1.b + 356.1.b.1).
2. A token is **played** but is **not a card** (350.1, 350.2, 185.2.a), so it fires
   `When you play a unit` and never `[Legion]` or any `played a card`. 052 keeps runes, legends and
   battlefields out of the word as well. And **811.1.c.1** — *"Hide is not a subset of Play"* — is the
   companion at the other end: a lock on *playing* does not stop *hiding*.
3. **383.1.b**: an ability that triggers *"the [Nth] time"* fires **once** even when the condition is
   met several times simultaneously; the controller picks which instance triggers it.
