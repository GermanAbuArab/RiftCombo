# Hand walks — four ENGINE lines

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **All four HOLD.**

ENGINE has no numeric bar the way BURST has, so these walks check two things instead: that the
mechanism produces what the entry claims, and that every rule number the entry cites says what the
entry says it says. Two citations turned out to point at the wrong sub-rule, and one rule handed over a
constraint the entry had not stated.

---

## 1. `world-atlas-sentinel-gold` — 8 Gold from one Hold

**SFD-086 World Atlas** (Gear, Mind, E3, M+2): `[Equip][Mind]` · **"[Effect] When I hold, play two Gold
gear tokens exhausted."**
**UNL-087 Blue Sentinel** (Unit, Mind): "Your hold effects for holding here trigger an additional time."

- The Effect Text reaches the unit by the same chain as Trinity Force, and **natively** — 136.2.b keeps
  it active while attached, 136.2.c/718.3 append it to the Top-Most Card, 136.2.d makes "I" the unit.
  The entry's own note is right that "World Atlas is Equipment, so its trigger is already the unit's own."
- Arithmetic checks: with K=1 Sentinel each hold effect fires 1 + K = **2 times**, and each firing makes
  2 Gold, so **4 Gold per Atlas** and 8 across the two. As declared.
- Depends only on **R1**, ruled A on 2026-09-03. Nothing open.

**Constraint the entry did not state:** the Gold arrives **exhausted**, and a Gold's own ability is
"Kill this, **exhaust**: Add a rainbow". An exhausted permanent cannot pay an exhaust cost, so the eight
Gold are **next turn's** Power, not this turn's. (Renata Glasc, Industrialist would override this per
R25 = A, but she is not in this line.)

**Worth adding:** Power Nexus (SFD-214, "When you hold here, you may pay 4 rainbow to score 1 point") is
itself a Hold effect, so the Sentinel multiplies **it** too — two firings, 8 rainbow, 2 points. And its
"score 1 point" is an ability Gain under R2 = A, so 470 does not cap it.

---

## 2. `sona-viktor-opponent-turn` — Recruits on the opponent's turn

**OGN-073 Sona, Harmonious** (Calm): "At the end of your turn, if I'm at a battlefield, **ready up to 4
friendly runes**."
**OGN-117 Viktor, Innovator** (Mind): "**When you play a card on an opponent's turn**, play a 1 Might
Recruit unit token in your base."

Every citation verified verbatim:

| Cited | Says |
|---|---|
| 164.2.a | "[E]: **[Reaction]** — Add [1]." |
| 164.2.b | "Recycle this: **[Reaction]** — Add [C]." |
| 813.1.c.2 | "On Activated Abilities: 'This can be activated **during Closed States on any player's turn**.'" |
| 143.4 | "Units enter the Board exhausted." |
| 811.6 | "A card that is Hidden gains Reaction while facedown or played from facedown…" |
| 811.1.b | "…you may pay [A] to hide this facedown… **Beginning on the next turn**, this gains [Reaction] and you may play this, **ignoring its base cost**." |

So the four readied runes really are spendable on the opponent's turn, and each card played is a Viktor
trigger. Ceiling of four Recruits per opponent turn, arriving exhausted, is as the entry says.

**Constraint 811.1.b hands over that the entry omitted:** a card hidden this turn is playable from
hidden only **beginning on the next turn**. The free flips are only free if the hiding happened on an
earlier turn — which is also why hiding costs a rainbow up front.

---

## 3. `kharox-sanction-burn` — repeat the Empower crossing

**VEN-114 Kharox** (Chaos): `[Empower] 6 Energy + 2 Chaos` ("Empower me. **Use only if not Empowered**.")
· "**When I become [Empowered]**, choose an opponent. They [Burn 3]. Then you may … play a unit from
their trash, ignoring its cost."
**VEN-035 Sanction** (Spell, Calm, E3 P1): `[Reaction]` "Choose one — Empower a unit. Disempower it at
end of turn. / **Disempower a unit that's [Empowered]. Empower it at end of turn.**"

- **828.1.d** is exact and is the whole line: "If the Dependent Ability is a Triggered Ability whose
  condition is 'When I become Empowered,' or a permutation thereof, it will be active and trigger when
  its source becomes Empowered." Every crossing re-fires the Burn.
- Each Sanction produces one crossing, and the modes must alternate because mode two requires an
  already-Empowered target — the step fix REFUTE applied on 2026-09-03 is correct.
- Three Sanctions plus Kharox's own re-usable Empower is 3–4 crossings, **Burn 9–12**. The cap is
  Energy, not Sanction copies.
- Domains are Calm (Sanction) + Chaos (Kharox), and three Calm/Chaos legends exist: OGN-259 Unforgiven,
  SFD-195 Blade Dancer, UNL-193 Gloomist.

**Citation corrected.** The entry credited 431.2.c for "Burn Out recycles their trash before the point".
431.2.c is the *point* step; the recycle is **431.2.b**, and the order is b then c. The substance stands
— milling is not a kill, because the victim recycles their trash into their deck and only then gives an
opponent a point — but the entry pointed at the wrong line.

---

## 4. `bloodharbor-bewitching-discard` — one discard a turn, honestly

**UNL-185 Bloodharbor Ripper** (Legend, Fury/Chaos): "1 Energy, **exhaust**: Return a friendly unit at a
battlefield to its owner's hand. Play a Gold gear token exhausted."
**UNL-121 Bewitching Spirit** (Chaos, E3 M2): "When you play me, choose a player. **They discard 1**."

- The legend's ability costs an **exhaust**, so it runs once per turn. The entry already refuses the
  source's "never-ending stream" framing and calls it tempo — that is the right call and it is why the
  class is ENGINE rather than anything louder.
- The Spirit must be **at a battlefield** for the legend to return it, so play it there (355.2.a makes a
  battlefield you control a valid destination) rather than to base.
- Cost is 3 Energy for the Spirit plus 1 for the legend: **4 Energy per discard**, plus a Gold that
  arrives exhausted and is therefore next turn's Power.
- Identity is satisfied by construction: the legend is Fury/Chaos and the Spirit is Chaos.

## Links
- Entries: `data/combos.json` → the four ids above
- R1, R2 and R25 rulings: issue #11 and `CLAUDE.md` § Combos
- The Effect Text chain (136.2.b/c, 718.3, 136.2.d) is written up on #11 as the R6 narrowing
