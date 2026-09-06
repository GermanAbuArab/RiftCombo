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
