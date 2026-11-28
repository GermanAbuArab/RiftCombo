# Play — six cards arrive only if both Karthus are still home when LeBlanc dies

Issue #266 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `karthus-leblanc-fragmented-temporary-draw`**, the mono-Order ENGINE in which `UNL-165
Shadow's Call` gives `UNL-172 LeBlanc, Fragmented` [Temporary], she dies at the start of your next
Beginning Phase, and two `OGN-236 Karthus, Eternal` make her Deathknell draw two, three times. The
entry is right about the timing: 816.1.b kills her inside the Beginning Phase, so *"draw 2 instead"* is
live. Walked as a game, the order that matters is the opponent's. Shadow's Call has to be cast the turn
**before** the kill, so the opponent always gets one full Main Phase with every piece on the board, and
one two-Energy spell in that phase turns six cards into two.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `f4562b7`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 75 of them with no play** —
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 25 (hits on *before*), second in the list. The other entry of this slice is rank 24,
played in [the Sprite defends the Altar and never holds it](2026-10-05-the-sprite-defends-the-altar-and-never-holds-it.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order in its pair (103.1.b) |
| **First** | two `OGN-236 Karthus, Eternal` (Order, E3 + 1 Power, M3) on the board |
| **Then** | `UNL-172 LeBlanc, Fragmented` (Order, E3 + 1 Power, M3) |
| **Last** | `UNL-165 Shadow's Call` (Order, E2) on LeBlanc, the turn before the kill |

The card text the play turns on:

- Karthus, Eternal: *"Your [Deathknell] effects trigger an additional time."*
- LeBlanc, Fragmented: *"[Deathknell][>] Draw 1. If it's your Beginning Phase, draw 2 instead."*
- Shadow's Call: *"Choose a friendly unit without [Temporary]. Give it [Temporary]. Draw 2."*

## 2. Your order: everything at the base, Shadow's Call last

None of the four cards wants a battlefield, and the base is where most removal cannot reach. 355.2.a:
*"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* Play all three units to the base and never move them; LeBlanc's [Assault] is a temptation
to decline.

Shadow's Call is the clock. 816.1.b: *"It is functionally short for "At the start of this permanent's
controller's Beginning Phase, before scoring, kill this.""* — and 315.2.a.1: *"At the start of
Beginning Phase game effects take place."* So the kill lands inside your Beginning Phase, and LeBlanc's
condition is met. Her trigger goes on the chain before she reaches the trash — 808.1.d.2: *"The trigger
will be added to the chain as a Pending Item before the card with an ability that triggers on its own
death is moved to the trash due to a Kill instruction or a Cleanup."* — and each Karthus has to be on
the board at that instant, since 365.1: *"Passive Abilities of Permanents are typically only active
while on the Board."*

## 3. Their order: one Main Phase with everything on the board

Shadow's Call has no [Action] or [Reaction], so it is cast in your Main Phase and the kill comes at your
next Beginning Phase. The opponent's whole turn sits between them, every time. Holding both Karthus back
to cast them in the same turn as Shadow's Call does not remove that turn: it needs E8 + 2 Power with
LeBlanc already down, which the rune curve first allows on T5, so the six cards arrive on T6 instead of
T5 and the opponent still gets their Main Phase. It only hides the Karthus from answers they would have
cast earlier, and the cheapest answer needs only that one phase.

## 4. The turns, going first

Mono-Order. The opponent holds the other battlefield.

```
turn    runes   your turn                                                 at base
T1      2       Daring Poro (E2) at base                                  Poro
T2      4       Poro walks to A, Conquer: +1. Karthus (E3 + 1 Power),     Karthus
                one rune recycled. 3 runes left.
T3      5       Hold A: +1. Karthus (E3 + 1 Power). 4 runes left.         Karthus x2
T4      6       Hold A: +1. LeBlanc (E3 + 1 Power) and Shadow's Call      Karthus x2,
                on her (E2): draw 2. 5 runes left.                        LeBlanc [Temporary]
their T4        Their Main Phase: the one window.
T5      7       Beginning: LeBlanc dies, three Deathknell instances,      Karthus x2
                draw 6. Hold A: +1. Draw Phase: draw 1.
```

The Power comes from runes, so each one paid takes a rune off the board — 164.2.b: *"Recycle this:
[Reaction] — Add [C]."* — and 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not
the Main Deck."* By T5 the line has drawn eight cards for two spent and scored four points on the Hold
curve, which it did not need to build.

## 5. Breaks to

**The line breaks to `OGN-029 Falling Star`** (Fury, E2 + 2 Power, *"Deal 3 to a unit. Deal 3 to a
unit."*), cast in their T4 Main Phase. It names no location, so it reaches the base, and each Karthus is
Might 3 — 143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it
is Killed."* Both die to one card, and LeBlanc's Deathknell then runs once: two cards, net zero for the
two you spent.

**Outside Fury, `OGN-229 Vengeance`** (Order, E4 + 2 Power, *"Kill a unit."*) kills one Karthus and
takes six cards to four.

**Killing LeBlanc early is the wrong answer for them.** Her Deathknell still triggers three times, just
not in your Beginning Phase, so it draws three.

**Removal that says "at a battlefield" does nothing here**, which is why the base matters:
`OGN-213 Hidden Blade` and `OGN-133 Flurry of Blades` cannot reach a unit that never left home.

## 6. Verdict

**Six cards for five Energy and one Power, if both Karthus survive one enemy Main Phase.** The ordering
is forced on you — Shadow's Call the turn before, everything at the base — and the opponent's window is
forced on them: exactly one Main Phase, every time, and the cheapest card that uses it is a two-damage
Fury spell aimed twice. Nothing here scores; the points on the way are the contested Hold curve from the
Poro.

## 7. Not verified

I did not walk a two-domain shell, 2v2, or a deck near Burn Out: the six cards arrive before the Draw
Phase, so a thin deck burns out earlier than its turn count suggests. I did not price `SFD-158
Sandshifter`, whose play trigger also reaches the base.

## Leads

- The entry does not say where Karthus and LeBlanc stand. At the base every *"at a battlefield"* removal
  misses them; that is the line's only defence and it costs nothing.
- The entry names no answer. `OGN-029 Falling Star` kills both Karthus with one card, taking the burst
  from six cards to two.
- The opponent's Main Phase between Shadow's Call and the kill is structural: Shadow's Call is neither
  [Action] nor [Reaction], so no ordering of your cards closes it.
