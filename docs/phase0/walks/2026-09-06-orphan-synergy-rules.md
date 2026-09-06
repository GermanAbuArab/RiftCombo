# Walk — the 55 synergy rules no catalogued entry stands on

**Issue #153. 2026-09-06. Rules version 2026-07-16.**

`data/synergies.json` carries 96 hand-verified mechanical PATTERNS. 55 of them have an empty
`basis.combos`: no entry in `data/combos.json` stands on the rule. A synergy is a pairing; a combo
is a line that terminates. This document asks, for each of the 55, the question the synergy layer
deliberately does not ask — **does the anchor plus a partner plus two or three more in-domain cards
reach a repeat step, or a scoring event?**

Card text below is verbatim from `data/corpus_flat.txt`. Every rule number was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and is quoted where it carries the argument.

A refusal is recorded with the paragraph that kills it. That is worth as much as an entry: it stops
the next session re-deriving it.

---

## 0. The bookkeeping half of the finding

Of the 55 anchors, **27 already appear in `uses[]` of at least one catalogued entry** — the rule was
simply never back-linked. Those are listed in §9 as `rule id -> entry id` pairs for the manager to
apply, alongside the pairs this walk created. The remaining 28 anchors are cards **no entry in the
catalogue has ever used**, and they are where this walk spent its time:

```
VEN-062 UNL-217 VEN-165 SFD-221 SFD-210 UNL-133 OGN-091 OGN-288 OGN-230 OGN-061
SFD-094 UNL-046 UNL-167 UNL-168 UNL-196 UNL-195 OGN-102 OGS-017 UNL-157 OGN-011
SFD-008 VEN-006 SFD-024 SFD-093 VEN-082 OGN-084 UNL-077 OGN-100
```

---

## 1. `albus-ferros-buff-bank` -> `peak-guardian-albus-ferros-rune-refill` (ENTRY)

**Anchor** `OGN-230 | Albus Ferros | Unit | Order | E4 M3 | When you play me, spend any number of
buffs. For each buff spent, channel 1 rune exhausted.`
**Partner picked** `OGN-223 | Peak Guardian | Unit | Order | E6 P1 M5 | When you play me, buff me.
Then, if I am at a battlefield, buff all other friendly units there.`

Both mono-Order, so 103.1.b.3 (*"If a card has a single Domain, then that card is permitted in the
Domain Identity"*) admits them under any legend carrying Order. Neither is Signature, so 103.2.d.2
forces no legend.

**The first reading was wrong and the walk corrected it.** Read naively, Albus turns N buffs into N
extra runes on the board, i.e. N more Energy every following turn. That ceiling does not exist:
430.1 channels *"from the top of a player's Rune Deck"* and 430.3 says *"If there aren't sufficient
runes in the Rune Deck, channel as many as possible."* A deck that has been channelling 2 a turn
(315.3.b) is at 10-12 runes by the turn it can afford E10, and the Rune Deck is nearly empty — so
the naive line channels 2, not 5.

**What makes it real is 161.2.b.** *"When a Rune is Recycled it is returned to the Rune Deck, not
the Main Deck."* Combined with 164.2.b — *"Recycle this: [Reaction] — Add [C]"*, a cost with **no
exhaust in it**, so an already-tapped rune still pays it — the honest line is a *refill*, not a ramp:

1. Tap 10 ready runes for Energy (164.2.a). Ten exhausted runes on the board.
2. Play Peak Guardian to a battlefield you control (355.2.a: *"By default, Valid locations include
   the controller's Base or a Battlefield the controller controls"*). He buffs himself and every
   other friendly unit there — five bodies present is five buffs, and 702.3 (*"There can only be one
   Buff on a Unit at a time"*) is exactly what makes "buffs" and "buffed units" the same count.
3. Recycle five of the **exhausted** runes for 5 Power (164.2.b). 161.2.b puts them back in the Rune
   Deck, so the Rune Deck now holds five.
4. Play Albus Ferros, spend the five buffs (702.2.b, 702.2.b.1, 702.2.b.2), channel the five back
   exhausted (430.2's own worked example is the wording *"Channel 1 rune exhausted"*).

Net: **five Power for E10 + 1 Order Power and two cards, with the rune count unchanged.** The board
ends where it started on runes, one turn's Energy is spent, and five Power that would have cost five
permanent runes is free. Measured against the project's own ~9 Energy per Power rate for a loop,
this is ~2 Energy per Power.

The honest caveat is 430.1: the runes come back **from the top of the Rune Deck**, so the count is
restored but the domains are not chosen. A line that needs five Power of one named domain cannot
lean on this.

Class ENGINE, `produces: ["resource-engine"]`. Nothing here scores.

---

## 2. `gemcraft-seer-vision-generalization` + `karma-channeler-vision-recycle` -> `gemcraft-karma-herald-buff-faucet` (ENTRY)

`OGN-100 | Gemcraft Seer | Unit | Mind | E3 P1 M3 | [Vision] ... Other friendly units have [Vision].`
`OGN-235 | Karma, Channeler | Unit | Order | E6 P1 M6 | [Vision] ... When you recycle one or more
cards to your Main Deck, buff a friendly unit.`
`OGN-265 | Herald of the Arcane | Legend | Mind/Order | E1, exhaust: Play a 1 Might Recruit unit token.`

Mind + Order + Colorless, so Viktor's Herald of the Arcane holds all three (103.1.b.2).

817.1.c is the load-bearing paragraph: *"The trigger is the permanent entering the Board."* [Vision]
is not "when played" — Gemcraft Seer's static grant reaches **any** friendly unit that enters,
including a token. 817.1.b makes it *"functionally short for 'When this is played, predict.'"*, and
436.4.a says the predict *"will not perform a Burn Out as a result of Predicting with too few cards"*,
so the faucet is safe even with the Main Deck low.

Recycling the looked-at card is a recycle to the Main Deck (416.1.a: *"Main Deck cards are Recycled
to the Main Deck"*), which is Karma's trigger. So **every unit that enters the board hands you one
buff**, and the entering unit is itself a fresh unbuffed body to put it on — 702.3's one-buff cap
never bites, because supply and demand arrive together.

The legend closes the loop with no other card: `E1, exhaust: Play a 1 Might Recruit unit token`
mints one new body a turn for one Energy, and 315.1.b readies the legend every Awaken. Each Recruit
enters, predicts, recycles, and is buffed to 2 Might by the same trigger that its own entry fired.

Class ENGINE, `produces: ["token-body-engine"]`. Sibling: `karma-lux-recycle-buff-army` runs Karma
off the Lux loop's recycles; this line needs no loop at all, and the Recruits arrive at the base
(355.2.a), so #48's walk-to-the-battlefield bottleneck is untouched.

---

## 3. `pit-crew-gear-ready` -> `pit-crew-eye-herald-recruit-shuttle` (ENTRY)

`OGN-091 | Pit Crew | Unit | Mind | E3 M3 | When you play a gear, ready me.`
`SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] 1 Order. [Effect] When I move, play a
1 Might Recruit unit token here.`
`SFD-064 | Cloth Armor | Gear | Mind | E1 M+0 | [Quick-Draw] ... [Effect] [Shield 2]`

Mind/Order again. 434.1.c gives the carrier the Equipment's effect text: *"The Top-Most card has all
Effect Text of all cards Attached to it appended to its Rules Text."*

144.2 prices a Standard Move at the unit's own exhaust, so a unit moves once a turn — unless
something readies it. Pit Crew's readier is **a gear being played**, and a gear costs E1 four times
over in this identity, which is the cheapest ready in the pool for this purpose (`revna-eye-herald-recruits`
buys the same shuttle at 4 Energy per move with UNL-009 Upstage Comedy).

359.3.f.2 reads `here` **on execution**, so the Recruit is born at the **destination** of the move,
not at the base. That is the whole point: it is the same bypass of #48's bottleneck the Eye already
gives Revna, bought with E1 gear instead of E4 spells.

Two rules constrain the shuttle, and the entry states both:

- 190.3.a.1 — *"Units moving to or being played to a battlefield apply Contested status if that
  battlefield is not already Contested and that Unit's controller does not already control that
  battlefield."* So the FIRST arrival contests an uncontrolled battlefield, and 344.2 / 348.2.a /
  348.2.a.1 turn that into a Showdown and a Conquer. After you control it, every later arrival is
  free of Contested and no Combat opens.
- 190.4.a — *"If a player controls Units at a Battlefield, outside of Combat, they maintain Control
  of that Battlefield for as long as they have Units at that Battlefield."* Pit Crew cannot be the
  only body there when it leaves, or Control lapses and the next arrival contests again. The first
  Recruit it drops is exactly that body, so the shuttle is self-priming from the second move on.

Class ENGINE, `produces: ["token-body-engine"]`.

---

## 4. `shadow-watcher-temporary-death-window` -> `trevor-altar-of-memories-beginning-draw` (ENTRY)

`UNL-048 | Trevor Snoozebottom | Unit | Calm | E3 M3 | [Shield] ... When I hold, play a ready 3 Might
Sprite unit token with [Temporary] here.`
`SFD-169 | Altar of Memories | Gear | Order | E2 | When a friendly unit dies, you may exhaust me to
draw 1, then put a card from your hand on the top or bottom of your Main Deck.`

Calm + Order: four legends hold it (OGN-261 Radiant Dawn, UNL-195 Green Father, VEN-147 Eye of
Twilight, SFD-247 Emperor of the Sands).

The timing is the finding, and it needed 315 read in order. **Awaken (315.1) is not part of the
Beginning Phase (315.2)** — it is the step before it, and 315.1.b readies *"all Game Objects they
control that are able to be readied."* 816.1.b then fires the [Temporary] kill *"At the start of this
permanent's controller's Beginning Phase, before scoring"*, i.e. in 315.2.a, **after** the Altar has
already been readied and **before** 315.2.b.2 Holds the battlefields.

So the cycle closes with no upkeep at all:

- 315.1 Awaken — the Altar readies.
- 315.2.a Beginning Step — last turn's Sprite dies (816.1.b). "A friendly unit dies" fires; exhaust
  the Altar, draw 1, and put a card back on top or bottom of the Main Deck.
- 315.2.b.2 Scoring Step — Trevor Holds, and his trigger mints the next Sprite, ready, at the
  battlefield.

**One card a turn plus a top-of-deck filter, paid for once (E3 + E2) and free forever after.** The
Sprite is also a 3-Might body that defends for a full turn between its birth and its death.

Two traps checked. 185 / 186.1 — the Sprite is a token, so it never reaches the trash and nothing
can recycle or reanimate it; the entry claims neither. And 431: the draw is one card a turn against
a deck that also recycles one back with the same trigger, so 431.1.a never bites — this is the rare
draw engine that is net neutral on deck size.

Class ENGINE, `produces: ["card-advantage-engine", "temporary-body-engine"]`.

Deliberately NOT written: Trevor + `UNL-174 Shard of Undoing`. That pairing is a third copy of
`sprite-fountain-shard-undoing-beginning-removal` and `shard-undoing-deceiver-reflection-removal`,
which already occupy the [Temporary]-death-forces-a-kill slot with two different feeds.

---

## 5. `call-to-glory-buff-bank` + `trapping-grounds-excess-damage` + `wizened-elder-buffed-payoff` -> `tryndamere-call-to-glory-trapping-grounds` (ENTRY)

`OGN-207 | Call to Glory | Spell | Order | E3 | [Reaction] ... As you play this, you may spend a buff
as an additional cost. If you do, ignore this spell's cost. Give a unit +3 Might this turn.`
`OGN-034 | Tryndamere, Barbarian | Unit | Fury | E7 P2 M8 | When I conquer after an attack, if you
assigned 5 or more excess damage to enemy units, you score 1 point.`
`UNL-217 | Trapping Grounds | Battlefield | Colorless | When you conquer here, if you assigned 3 or
more excess damage, play a 1 Might Bird unit token with [Deflect].`
`OGN-223 | Peak Guardian` as the buff bank.

Fury + Order: `OGN-253 Hand of Noxus` (Darius) is the legend. Trapping Grounds is Colorless.

R28 = A is what both payoffs read: excess damage is attacking Might that never got assigned, because
465.2.c.4 says *"Units cannot have more damage assigned to them than the minimum required to kill
them"*. Peak Guardian's mass buff is the bank; each buff spent makes a Call to Glory cost nothing
(the card's own words: *"ignore this spell's cost"*), and each Call is +3 Might on the attacker, so
each buff is +3 to the excess.

The entry states the arithmetic against its own declared board, which is the check the 2026-09-04
BURST audit found four entries failing. Tryndamere M8 into a garrison of two 3-Might defenders
assigns 3 + 3 and carries 2 excess — **short of his own threshold of 5**. Peak Guardian with two
other bodies at his battlefield banks 3 buffs; three free Calls to Glory put Tryndamere at M17, so
the assignment is 3 + 3 and the excess is 11: over Tryndamere's 5 and over Trapping Grounds' 3.

Class **ENGINE**, not BURST: it is one ability point (194.1.c, R2 = A) plus a [Deflect] Bird per
conquer, and 470 (*"A player may only Score, from either method, once per Battlefield per turn"*)
does not even come into it, since the Gain is not a Score. Eight is not in reach.

The Bird matters beyond its 1 Might: it is a **Bird** for the four-tag package that
`ivern-sentinel-hold` and `ivern-arena-sentinel-hold` are built on — but not in this shell, since
Ivern is Order and Tryndamere is Fury, so the tag payoff would need a different legend. Recorded as
a lead in `notable`, not as a `uses[]`.

---

## 6. `portal-rescue-replays-a-body` -> `portal-rescue-trove-golem-industrialist` (ENTRY) + four refusals

`OGN-102 | Portal Rescue | Spell | Mind | E3 P1 | [Action] ... Banish a friendly unit, then its
owner plays it to their base, ignoring its cost.`

419.3 / 419.3.a / 419.4.a make the forced replay an ordinary Play, so the body's own
`When you play me` fires a second time. The rule's 16-card partner list splits cleanly on **four
words the predicate cannot see: "to their base."**

**REFUSED — every partner whose trigger says "play a token HERE."** 359.3.f.2 reads `here` on
execution, and after Portal Rescue the executing permanent is at the BASE. So `OGN-218 Vanguard
Captain` (two Recruits here), `SFD-157 Royal Guard` (a Sand Soldier here), `OGN-211 Faithful
Manufactor` (a Recruit here) and `UNL-033 Frisky Hunter` (a Bird here) are all strictly WORSE under
Portal Rescue than under a return-to-hand, because the replay strands the token at the base and
re-creates exactly the walk-to-the-battlefield problem #48 measured. Portal Rescue is a *rescue*, not
an upgrade, for that whole family.

**TAKEN — `SFD-174 Trove Golem`**, whose four Gold gear tokens carry no location clause at all, so
the base-only replay costs the line nothing. With `SFD-171 Renata Glasc, Industrialist` on the board
(R25 = A) the Golds enter ready and are Power the same turn. Ledger: Portal Rescue costs E3 + 1
Power and returns 4 Power, net +3 per casting, three castings (103.2.b).

Two facts the entry records because they cut both ways. 108.6.c makes Banishment the
hard-to-recover zone, and the return here is the spell's own second clause — so the rescued body
**never reaches the Trash**, which erases a [Deathknell] it was carrying exactly as a would-die
shield does under 808.1.d.1, and no "when a friendly unit dies" payoff sees it. And 705 strips every
buff on the way through.

---

## 7. `magma-wurm-mass-ready` -> `magma-wurm-assembly-rig-walk-in` (ENTRY)

`OGN-011 | Magma Wurm | Unit | Fury | E8 P1 M8 | Other friendly units enter ready.`

**This corrects a sentence this project has been repeating.** CLAUDE.md says a token minted
exhausted "pays 144.2's exhaust the same turn only under SFD-171 Renata Glasc, Industrialist
(mono-Order)". That is true of *Order* and of *tokens*; it is not true of the pool. 143.4 (*"Units
enter the Board exhausted"*) carries 143.4.a — *"This can be altered by Accelerate or similar game
effects"* — and Magma Wurm is the Fury card that alters it, for **every** friendly unit, played or
minted, not only for tokens.

Partner taken: `SFD-019 | Assembly Rig | Gear | Fury | E4 | E1 + 1 Fury, Recycle a unit from your
trash, exhaust: Play a 3 Might Mech unit token to your base.` One Mech a turn, and with the Wurm out
it walks to a battlefield in the same Main Phase (144.4.a, 144.2).

**REFUSED — feeding the Rig with its own output.** 185 is one sentence, *"Tokens are not cards"*,
and 416.1 defines Recycling over cards; 186.1 makes a token *"cease to exist immediately after
moving to its new zone"*, so a dead Mech token is never in the trash to be chosen. 203.3 and 416.3
then make the cost unpayable. The Rig needs a unit CARD in the trash every turn, and the entry says
so. Two community lines died on this exact rule in issue #62.

---

## 8. `dauntless-vanguard-occupied-battlefield-assault` -> `dauntless-vanguard-long-sword-surprise-attack` (ENTRY) + one refusal

`SFD-093 | Dauntless Vanguard | Unit | Body | E4 P1 M4 | You may play me to an occupied enemy
battlefield.`

The chain is short and every link was opened. 190.3.a.1 — *"Units moving to **or being played to** a
battlefield apply Contested status"* — so being played there is enough. 464.2.c.1: *"The Attacker is
the player whose unit(s) applied the Contested status to the Battlefield."* 323.9 stages the Combat
at the next Cleanup and 323.13 opens it in the Neutral Open State of your own Main Phase. He never
moves, so 144.2's exhaust is never paid and 143.4's entering-exhausted costs nothing — exhausted is
not stunned, and 464.2.c.3 / 465.2.b do not filter by state.

Payoff taken: `SFD-022 Long Sword`, E2 P1 M+2, **[Quick-Draw]** — 819.1.d: *"Quick-Draw is
functionally short for '[Reaction]' and 'When you play this, attach it to a Unit you control.'"*
464.2.f.1 / 464.2.g keep the Chain open inside the combat, so the Might is chosen **after** the
garrison is known. 465.2.c reads Might at assignment, which is after the attach.

**REFUSED — the Vanguard as an evacuation walker.** The tempting line is: empty the garrison with
`UNL-107 Stare Down`, then walk in for a free Conquer. It cannot be built. (a) After Stare Down the
battlefield is unoccupied, so the Vanguard's own condition — *"an occupied enemy battlefield"* —
fails, and 355.2.a's default does not reach an enemy battlefield. (b) Played the other way round,
there is no window: 323.10 only un-stages a Combat that has not yet opened, and after a play or a
move the very next Cleanup both stages (323.9) and opens (323.13) it with no gap (the #58 finding).
(c) A plain spell cannot help from inside, because 155 confines a spell with no [Action]/[Reaction]
to *"an Open State outside of Showdowns"*, and Stare Down carries neither keyword.

**Also refused: `SFD-009 Serrated Dirk` as the payoff**, even though the synergy rule is named for
[Assault]. Its +2 is the same number as the Long Sword's, but it has no [Reaction], so it must be
attached before the play — which telegraphs the one thing the Vanguard is bought for.

---

## 9. `rell-magnetic-free-equip-attach` -> `rell-magnetic-recurve-bow-per-attack` (ENTRY) + two refusals

`SFD-024 | Rell, Magnetic | Unit | Fury | E4 M4 | [Tank] ... When I attack, you may play an Equipment
with Energy cost no more than E2, ignoring its cost. If you do, then do this: Attach it to me.`

818.1 makes [Equip] an Activated Ability, so attaching is never playing — but Rell **plays** the
card and then attaches it, so a gear's own `When you play this` does fire. That distinction is the
rule's own basis and it holds.

**The finding is a timing one, and it splits the partner list in two.** Rell's trigger fires at the
Attacker designation (464.2.c.3), so the Equipment arrives *after* that instant, and 383.2.a.1 makes
a trigger's extra condition part of the Trigger Condition, checked when the trigger is placed. So:

- an Equipment whose own text reads `When I attack` has **already missed** the attack that fetched
  it. `SFD-016 Recurve Bow` deals its 2 damage in every LATER combat, never in the one it landed in;
- an Equipment that is a flat Might bonus misses nothing, because 465.2.c reads Might when damage is
  assigned. `SFD-022 Long Sword`'s M+2 is live immediately.

**REFUSED — the Svellsongur route the rule itself suggests.** The rule's `why` points at 476.1 and
the #45 composition finding as what makes a repeatable free attach valuable. It is out of reach:
`SFD-059 Svellsongur` costs **E3**, and Rell's ceiling is a printed Energy cost of 2 — 206 makes
that a PRINTED-cost test, so no discount widens it.

**REFUSED — `SFD-186 Spinning Axe`** (E2 P1, M+3, Quick-Draw) as the Might target. It is legal for
Rell and it is one Might better than the Long Sword, but it is Fury/Chaos, so it narrows the
identity from "any legend with Fury" to a Fury/Chaos pair for +1 Might. Not worth it; recorded so
the next session does not re-derive the comparison.

---

## 10. `hall-of-legends-readies-your-legend` -> `hall-of-legends-bloodharbor-double-ripper` (ENTRY)

`SFD-210 | Hall of Legends | Battlefield | Colorless | When you conquer here, you may pay 1 Energy
to ready your legend.`

107.4.b says the Legend Zone *"is not a location"*, which is what killed the whole "legend +
Reckoner's Arena" family in #47 — but 107.4.c says *"The Champion Legend here is a Game Object"*,
and 415.1 readies *"a non-spell Game Object on the board"*. So the Hall reaches the legend and the
107.4.b trap does not bite: nothing here asks the legend to be anywhere.

What it buys is narrower than it looks, and the entry states it. 315.1.b already readies the legend
every Awaken, so the Hall is not a per-turn doubling — it is a **second activation on the turns you
conquer there**, for E1. Twenty-four legend printings carry an exhaust in an ability cost; five
charge a Disempower or an XP cost on top, so the second activation still has to be funded.

Partner taken: `UNL-185 Bloodharbor Ripper` (Pyke, Fury/Chaos) — the only one of the twenty-four
whose ability produces a **resource** for a flat E1 with no second currency: *"E1, exhaust: Return a
friendly unit at a battlefield to its owner's hand. Play a Gold gear token exhausted."* Bounce target
`SFD-140 Fizz, Trickster`, whose replay is another free spell out of the trash (419.4.a).

The Gold enters exhausted and stays that way: `SFD-171 Renata Glasc, Industrialist` is mono-Order
and 103.1.b.2 keeps her out of a Fury/Chaos identity, so each Gold is next turn's Power. And the
bounce is to HAND, not a Recall — 455 defines a Recall as relocation *to its Base*, so none of the
Recall traps (455, 808.1.d.1) apply, though 705 and 716 still strip buffs and attachments.

---

## 11. `daisy-four-tags` + `green-father-brush-four-tags` -> `daisy-green-father-four-tag-attacker` (ENTRY) + one deferral

`UNL-196 | Daisy! | Unit | Calm/Order | E9 P2 M8 | I enter ready. Reduce my cost by E1 for each of
the following tags among your units — Bird, Cat, Dog, and Poro. When I attack while your units have
all 4 tags, [Stun] an enemy unit here.`

**The legend is not a choice, and that is the finding.** `data/cards.json` marks Daisy
`signature: true`, and 103.2.d.2 says *"All of the Signature cards must have the Champion tag that
corresponds to the Champion Legend of the deck."* Her tags are Ivern and Ionia, and a grep of every
legend printing for the Ivern tag returns exactly one row — `UNL-195 Green Father`. So every list
that plays Daisy is a Green Father list, 103.2.d.1 makes three Daisy the deck's entire Signature
budget, and 103.2.d.3 forbids her being the Chosen Champion. #141's walk warned that "a hunt that
names a Signature card without naming the legend has an illegal shell"; Daisy is a live instance.

The four tags come from four mono-Order E2 bodies — `OGN-216 Soaring Scout` (Bird),
`VEN-132 Fallen Feline` (Cat), `SFD-159 Trusty Ramhound` (Dog), `OGN-210 Daring Poro` (Poro) — and
her discount reads *"tags among your units"*, not "units here", so they can stand at your base while
she attacks somewhere else. At E5 + 2 Power she beats 143.4 on her own text (*"I enter ready"*) and
moves to an enemy battlefield the turn she lands.

**The stun does not make the defender free to kill**, and the entry says so in the terms #89
corrected #61 with: 423.1.b only removes the stunned unit's Might from the damage step, while
423.1.c — *"A Stunned Unit must still have damage applied to it equal to, or greater than, its full
might value to be killed"* — with 710 keeps its current Might as the bill. Stun the biggest HITTER,
not the biggest body. And no engine hides here: 423.1.a.1 and 423.1.a.2 cap it at one enemy body a
turn.

**DEFERRED, not refused — Green Father's Brush swap.** *"you may exhaust me to replace that
battlefield with a Brush battlefield token"* would give this exact package +1 Might, and it is the
`green-father-brush-four-tags` rule's whole content. This walk did not settle what 438 Replace does
to Control, nor what a battlefield token is for 190.x purposes, so the entry deliberately does not
lean on it. That is the one orphan rule in this document left standing without an entry **because
the rules question is open**, not because the line is bad. Next session: open 438 and 190.6.d
together before writing it.

---

## 12. `starhound-four-tags` + `undying-loyalty-four-tags` -> `starhound-undying-loyalty-four-tag-recursion` (ENTRY)

`UNL-168 | Undying Loyalty | Spell | Order | E2 P1 | This costs E2 less if you choose a Bird, Cat,
Dog, or Poro. Play a unit with cost no more than E2 and no more than 1 rainbow from your trash,
ignoring its cost.`
`UNL-167 | Starhound | Unit | Order | E5 P1 M6 | When you play me, return a Bird, Cat, Dog, or Poro
from your trash to your hand.`

The two are not interchangeable and the difference is the entry. Undying Loyalty puts the body
straight on the BOARD for 1 Order Power, but only if it is printed at E2 or less and 1 Power or
less. Starhound returns it to HAND with **no cost ceiling at all**, which makes him the only route
back for the expensive tag bodies (`UNL-047 Mosstomper`, `VEN-032 Frostcoat Mother`,
`VEN-122 Solari Sunhawk`).

206 is why the ceiling cannot be gamed: both clauses read the printed cost. And 355.2.a lets the
reanimated body land *"at the controller's Base or a Battlefield the controller controls"*, so unlike
the token lines of #48 there is no walk-to-the-battlefield bottleneck.

**A trap worth recording: the tag families have tokens in them and neither card can reach one.**
The [Deflect] Bird from `UNL-217 Trapping Grounds` is a Bird — but 185 (*"Tokens are not cards"*) and
186.1 mean it never sits in the trash for either half to choose. A four-tag deck cannot rebuild its
Bird out of a token.

Six castings a game (103.2.b), not a loop. Stated that way in `terminatesIn`.

---

## 13. `hextech-formula-empower-gear` + `veiled-temple-readies-gear` -> `hextech-formula-rage-amplifier-free-empower` (ENTRY)

`VEN-062 | Hextech Formula | Gear | Mind | E2 | This enters exhausted. exhaust: Empower another
gear.`

The value is a price comparison. `VEN-018 Rage Amplifier`'s printed [Empower] cost is **E6 + 1 Fury
Power**, for *"Your units have +1 Might. If I'm [Empowered], they have +2 Might instead."* The
Formula charges one exhaust, and 441.1 defines Empowering as *"the act of rendering one or more Game
Objects Empowered"* with 441.1.a making it binary and 441.2 making it a board state other effects
reference — so the +2 is bought once and kept.

**827.1.c.3 must not be cited here and the entry says so.** That paragraph governs discounts applied
to an Empower COST; nothing in this line pays one.

The repeatable half is `VEN-054 Questionable Tome`, and it is a small, exact finding: its own
[Empower] cost IS its exhaust, and its draw costs *"Disempower this, E1, exhaust"* — the same exhaust
twice, so unaided it can Empower or draw in a turn, never both. With the Formula paying the Empower
the Tome stays ready and draws for E1, disempowering itself on the way so the Formula can do it
again next turn.

`SFD-221 Veiled Temple` readies the Formula on a conquer there for a second Empower the same turn.
Its second clause — *"If it's an Equipment, you may detach it"* — does **nothing** for this line:
none of the three gear here carries [Equip] or a Might bonus, so 716 never comes into it. Named in
the entry only so the next reader does not go hunting for the interaction.

---

## 14. `blast-cone-enemy-move` -> `blast-cone-moonfall-forced-attacker` (ENTRY)

`UNL-133 | Blast Cone | Gear | Chaos | E4 P1 | When you play this, you may move an enemy unit. When
you move an enemy unit, you may exhaust this to [Stun] it.`
`UNL-198 | Moonfall | Spell | Mind/Chaos | E3 P1 | [Action] ... Choose a battlefield where you have
units. You may move up to one enemy unit to that battlefield. Then give enemy units there -2 Might
this turn.`

**This is the first catalogued entry that moves an enemy unit in order to make them the Attacker.**
CLAUDE.md recorded as of #58 that no entry moved an enemy unit at all. The chain: 190.3.a.1 applies
Contested when a unit whose controller does not control the battlefield moves there — it keys on the
MOVED unit's controller, not on who caused the move — and 464.2.c.1 says *"The Attacker is the
player whose unit(s) applied the Contested status to the Battlefield."* So dragging an enemy body
onto a battlefield you control makes **them** the Attacker on **your** turn.

The Cone's second trigger fires on any enemy move you make, not only its own, so Moonfall keeps
feeding it. 423.1.b then blanks their whole damage assignment while 465.2.c has your garrison assign
its summed Might; 423.1.c + 710 price the kill at the body's current Might, which Moonfall's -2 has
already lowered. 143.2.b caps the downside — a Might driven below zero is treated as 0 for the
damage step.

**It does NOT score, and the entry names the paragraph.** 464.2.c.2 (*"The Defender is the player
who did not apply the Contested status"*) and 323.11.a make you the Defender at your own battlefield,
and 466.5 establishes Control only *"for a player if they didn't already control this Battlefield"* —
the #118 finding. This is removal, not a point.

One stun per turn (the Cone's own exhaust, readied by 315.1.b), four drags a game (the Cone's play
effect plus three Moonfalls, 103.2.b).

---

## 15. `dark-child-off-turn-reaction-units` -> `dark-child-inferna-off-turn-ambush` (ENTRY), with the rule narrowed

`OGS-017 | Dark Child - Starter | Legend | Fury/Chaos | At the end of your turn, ready up to 2 runes.`

**The walk narrowed the rule's own claim.** Readying a rune is worth nothing in POWER: 164.2.b is
*"Recycle this: [Reaction] — Add [C]"*, a cost with no exhaust in it, so an already-tapped rune
already pays 1 Power on any player's turn — that is the free floor of 2 Power per turn #44 measured,
and Dark Child adds none of it. What she adds is **Energy**, because 164.2.a is *"[E]: [Reaction] —
Add [1]"*, an exhaust ability that needs a ready rune, and after your own Main Phase none of yours
are.

167 is the paragraph that makes it survive: *"Every player's Rune Pool empties at the start of each
player's Main Phase and the end of each player's turn."* The POOL empties; the readied RUNES do not
un-ready. So on the opponent's turn you hold two ready runes, and 813.1.c.1 lets a [Reaction] card be
played *"during Closed States on any player's turn."*

Payoff taken: `UNL-002 Inferna` (Fury, E2, M1, [Ambush]) — exactly E2 with no Power. #150's finding
applies: a body entering mid-combat gets the Defender designation at the next Cleanup (319.6,
323.2.a) before 465.2 resolves, so she is counted in the summed Might. Her [Assault 2] is dead on
defence — 807.1.d.1: *"Assault remains in effect as long as the Unit maintains the Attacker
designation"* — and the entry does not count it.

"Ready **up to** 2" has no cost and no downside, but nothing banks: this is 2 Energy per turn cycle,
never an accumulating pool.
