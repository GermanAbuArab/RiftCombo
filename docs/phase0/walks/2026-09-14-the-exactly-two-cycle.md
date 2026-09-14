# The exactly-two cycle: seven cards that read one board shape, catalogued pairwise and never as a shape

Issue #200, lane rc-synth4, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text verbatim from `data/corpus_flat.txt`.
Catalogue at 767 entries when swept.

Every synthesis target in this lane so far has been a LEGEND PAIR — fury/chaos, mind/chaos. This one
is a **board shape**, and it was found by sweeping for a word rather than for a card.

---

## 1. The sweep, and the thing it turned up

Grepping `corpus_flat.txt` for a printed exactness returns **eight cards**, and **seven of them ask
for the same thing**: a battlefield where you control exactly two units.

| card | domain | what the shape pays it |
|---|---|---|
| `VEN-027 Hand Hammer` (E2, M+1, gear) | calm | *"I have +2 Might while I'm at a battlefield with exactly one other unit you control"* |
| `VEN-042 Shen, Scourge of Shadows` (E5 P1 M6) | calm | *"When I hold, if there is exactly one other unit you control here, draw 1"* |
| `VEN-117 Disciple of Shen` (E2 M1, [Hidden]) | order | *"I have [Shield 3] while I'm at a battlefield with exactly one other unit you control"* |
| `VEN-119 Keeper of Law` (E5 P1 M5) | order | *"I cost 2 Energy and an Order rune less if you control a battlefield with exactly two units there"* |
| `VEN-129 Sacred Protector` (E4 P1 M6) | order | *"I don't deal combat damage unless I'm at a battlefield with exactly one other unit you control"* |
| `VEN-138 Shen, Leader of the Kinkou Order` (E6 P2 M7) | order | *"When I hold, if there is exactly one other unit you control here, you score 1 point"* |
| `VEN-148 Shadow Dash` (E2 P1) | calm/order | *"If you have exactly two units there, they each get +1 Might this turn"* |

Five Order, one Calm, one Calm/Order, **every one of them a Vendetta card**. That is a designed
cycle, and `UNL-088 Gutter Palace` — the eighth exactness in the pool — is not part of it; its two
counts are a hand and a board and it lives in Mind.

## 2. The catalogue has it pairwise and has never had it as a shape

Measured over all 767 entries: **exactly two entries use two members of the cycle, and none uses
three.**

- `shen-duo-mutual-hold` — `VEN-138` + `VEN-042`, the two Shens holding together, each one the
  other's "one other unit". ENGINE: *"2 points and a card a turn for as long as exactly the two of
  them hold."*
- `sacred-protector-disciple-of-shen-pair` — `VEN-129` + `VEN-117`, the two defensive members, whose
  own `terminatesIn` says it plainly: *"a standing garrison, not a clock; **nothing here scores**."*

The cycle's only appearance in a finisher is `shen-kinkou-svellsongur-hold`, which runs `VEN-138`
alone. **So the defensive half of the cycle has never been put under its point card**, and the entry
that pairs the defenders says outright that it scores nothing.

## 3. What the shape is worth when three cards read it at once

`shen-disciple-hand-hammer-exactly-two`, staged. `VEN-138 Shen` and `VEN-117 Disciple of Shen` at one
battlefield, with `VEN-027 Hand Hammer` attached to Shen.

Each of the three reads the same clause about the same two bodies. Shen's *"if there is exactly one
other unit you control here"* is the Disciple, and 383.2.a.1 makes that count part of his **Trigger
Condition** rather than his Effect. The Disciple's is Shen. The Hand Hammer's *"I"* is its carrier —
053.1, 053.2 and 136.2.d — so it is the same clause a third time, now about Shen.

Sizes, with every modifier counted, because this project has published two "18 Energy" figures that
had not been: 137.3 gives Shen the Hammer's Might Bonus of 1 and its Effect Text adds 2, so **Shen is
Might 10**; 814.1.c makes [Shield] short for *"While I am a defender, I have +X [M]"* and 814.1.b.3
presumes X = 1 when omitted, so **11 defending**. The Disciple is Might 1 and **4 defending**.
Fifteen summed Might on defence (465.2.b) for **E10 and 3 Power** across three cards, two of them at
two Energy.

The rate is **two points a turn** at that battlefield — the Hold's own Score point through 315.2.b.2
and 471.1, plus Shen's ability Gain under 194.1.c (R2 = A) — forever, and it is an ENGINE because
nothing here bursts.

## 4. The exactness is self-limiting, and that is the whole reason three cards fit on two bodies

Every clause in the cycle is switched off by a **third** friendly body at that battlefield. So the
cards cannot be stacked by adding more of them: 103.2.b lets you own three Shen and you may never
stand two of them together.

**What you stack instead is CLAUSES on the same two bodies, and that is a different resource from
copies.** It is the inverse of how this catalogue's BURSTs are built — `tryndamere-brambleback-conquer`
multiplies by adding Bramblebacks, `ahri-blue-sentinel-hold` by adding Sentinels — and it is why a
cycle like this reads as weak card-by-card and pays when read as a shape.

## 5. The point of failure is one Energy, and it is the cheap half of the pair

814.1.d: *"Being a defender means the Unit has gained the Defender designation during Combat."* So the
Disciple's [Shield 3] exists **only inside a combat**, and the rest of the time it is printed **Might
1**. `OGN-169 Gust` (Chaos, E1, [Reaction]) returns *"a unit at a battlefield with 3 Might or less"*
to hand; `OGN-133 Flurry of Blades` (Body, E1, [Reaction]) deals 1 to every unit at a battlefield and
kills it outright under 143.2.a.

**Losing it switches off Shen's point, the Hammer's +2 and the Disciple's own Shield in one card.**
The board-wide repair this project usually reaches for, `VEN-018 Rage Amplifier`'s +1, is **Fury** and
illegal under a Calm/Order legend.

## 6. Cheap and fragile against expensive and durable, and neither entry said so

`shen-duo-mutual-hold` runs `VEN-042 Shen, Scourge of Shadows` as the partner instead: Calm, E5 + 1
Power, **Might 6**, drawing a card on each Hold rather than shielding. Three more Energy and a Power,
and **out of reach of both one-Energy answers above**. The Disciple is E2, is [Hidden] so 811.1.b
plays it for nothing from the turn after it is hidden, and dies to either.

**Same board shape, same point, opposite trade-offs.** A deck picks one. Both entries now
cross-reference the other.

## 7. The trap in the cycle, deliberately left out of `uses`

`VEN-129 Sacred Protector` reads *"I don't deal combat damage **unless** I'm at a battlefield with
exactly one other unit you control"*. Its exactness is a **penalty it escapes**, not a bonus it
earns — so adding it as a third body would switch off Shen, the Hammer and the Disciple in order to
switch itself on. It belongs in the cycle and it cannot be in this entry, which is exactly the shape
of card that makes a "tribal" deck read as better than it is.

`VEN-119 Keeper of Law` is the other one to be careful with: its reward is a **cost reduction**, paid
once as you play it, so it is a discount on joining the shape rather than a reason to hold it.

## 8. What a reader should take

1. **Sweeping for a WORD found a cycle that sweeping for cards had not.** Seven cards, one clause,
   five of them never catalogued together. The word was *"exactly"*.
2. **A self-limiting condition inverts how you scale a line**: you add clauses to a fixed board rather
   than copies to a growing one, and the usual multiplier apparatus of this catalogue does not apply.
3. **Read the sign of the exactness before adding a card.** Two of the seven treat it as a penalty to
   escape rather than a bonus to earn, and one of those would break the other five.
4. **An entry that scores and an entry that survives can be the same board.** The cycle's defensive
   half had been catalogued with its own scoring half absent, and the note that says *"nothing here
   scores"* was true of the pair rather than of the cards.

## 9. Open

- **`VEN-148 Shadow Dash` is the cycle's Calm/Order card and gives +1 Might to BOTH bodies**, which is
  the only member that is neither a body nor an attachment. It is in one entry,
  `shadow-dash-eye-of-twilight-dragged-attacker-tank`, for an unrelated reason. Whether it is worth a
  slot beside Shen is not walked here.
- **`VEN-042` and `VEN-117` have never been compared as partners anywhere but in the staged entry's
  notables.** If the manager prefers, that comparison is a better fit as a shared notable on both
  entries than as prose on one.
