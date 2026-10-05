# Play — the Lab is paid before anything resolves, and the Sprite it eats is the one Gust can reach

Issue #248 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `sprite-queen-dusk-rose-lab-shard-undoing`**, the mind/order ENGINE in which
`UNL-084 Sprite Queen` makes a ready [Temporary] Sprite every Beginning Phase, `UNL-174 Shard of
Undoing` turns its scheduled death into a forced enemy kill, and `UNL-209 Dusk Rose Lab` charges
the same death a card. Nothing in it scores, so neither turn clock reads it. Walked as a game, two
things come out that the entry does not say: the ordering it calls the key to the Lab's card is not
load-bearing, and the Lab's card is bought by standing the Sprite where a one-Energy spell reaches
it.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at 771 entries reads 262 with
forced-ordering language and **102 in the queue**, the same numbers as slice 5. From here the pick
is by global rank, skipping entries that already have a play. This entry is rank 2 (three hits on
*first*). Rank 1 is played in
[each Svellsongur is worth the deficit](2026-10-05-each-svellsongur-is-worth-the-deficit.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Mind/Order name — the pool prints four: Herald of the Arcane (`OGN-265`), Lady of Luminosity (`OGS-021`), Chem-Baroness (`SFD-201`), Deceiver (`UNL-199`) |
| **The payoff** | `UNL-174 Shard of Undoing` (Order gear, E6) |
| **The engine** | `UNL-084 Sprite Queen` (Mind, E7 + 1 Power, M6) |
| **The battlefield** | `UNL-209 Dusk Rose Lab` (colourless), one of your three |
| **A holder** | `UNL-076 Petal Pixie` (Mind, E2, M2) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: the Lab is the battlefield drawn for you, the opponent holds B |

Domain identity from `data/cards.json`: Sprite Queen and Petal Pixie are Mind, the Shard is Order,
the Lab is colourless; union `{mind, order}` under 103.1.b. None is a Signature card and none
appears in `data/legality.json`. 485.5 makes the Lab one in three in a Duel.

The card text the play turns on:

- Shard of Undoing: *"The first time a friendly unit dies during your Beginning Phase each turn,
  each opponent must kill one of their units."*
- Sprite Queen: *"When you play me or at the start of your Beginning Phase, play a ready 3
  :rb_might: Sprite unit token with [Temporary] to your base."*
- Dusk Rose Lab: *"At the start of your Beginning Phase, you may kill a unit you control here to
  draw 1. (This happens before scoring.)"*
- Petal Pixie: *"I have +1 :rb_might: for each of your units with [Temporary] at my battlefield."*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b); the recycled rune goes to the Rune Deck (161.2.b) and
two come back each Channel Phase (315.3.b).

```
       R   your Main Phase                                    spent    idle   you
T1     2   Petal Pixie                                         E2       E0     0
T2     4   Pixie walks to the empty Lab -> Conquer                      E4     1
  their T2: one body walks into B and Conquers it
T3     6   Hold Lab. Shard of Undoing                          E6       E0     2
T4     8   Hold Lab. Sprite Queen              (R -> 7)        E7+1P    E0     3
           her play trigger: Sprite #1, ready, at base;
           it walks to the Lab (Pixie is Might 3 while it stands there)
T5     9   Beginning Phase: the Lab kills Sprite #1 -> draw 1;
           first friendly death -> Shard: they kill one of their units;
           Sprite #2 is born at base. Hold Lab.                         E9     4
           Sprite #2 walks to the Lab
T6..   ..  the same Beginning Phase every turn                                 +1 a turn
```

**The Shard goes down before the Queen, and that is a turn.** Played T3 for 6 Energy with no Power,
it is in play when Sprite #1 dies on T5. Queen first (T4) and Shard second (T5) puts the first
forced kill on T6, because the Shard arrives in the Main Phase after that Beginning Phase's death.
The cost is one opponent turn in which the Shard stands alone as a gear.

**On the board it scores what the Pixie scores**: one Hold a turn, eight on **T9**, the contested
curve exactly. Mind/order prints no unit at Energy 1 or less, so its unopposed curve is **T6**. The
engine does not move the clock by itself; what it does to the clock is §4.

## 3. The ordering the entry asks for is free

The entry's fourth notable reads: *"Put the Lab first: it eats the Sprite that 816.1.b was going to
kill for nothing, and you draw 1."* Walked, the Lab draws in either order.

The Lab's kill is not its effect, it is its cost. 383.3.b: *"If a Triggered Ability contains a cost
within instructions at the beginning of the effect or immediately following the “you may” or “they
may” that appears as the first part of the effect, that cost is treated as the base cost of the
Triggered Ability."* 383.3.b.1: *"The cost must be paid in order to finalize the Triggered Ability
to the Chain."* (204.3.a says the same with Overzealous Fan as its example.)

Now place the three Beginning-Phase triggers in the order the entry warns against — the Sprite's
[Temporary] first, the Lab second. 337.1.b: *"Chain Items are Finalized in the order they were
appended to the Chain."* 312.2.c: *"When the turn is in a Closed State, all pending chain items
finish being finalized, and they control the next item on the Chain."* So every trigger finalizes
before any resolves. The [Temporary] trigger finalizes first and costs nothing; the Lab finalizes
second and pays its kill — on a Sprite that is still standing, because 816.1.b's *"kill this"* is an
effect and has not resolved. You draw 1, the Shard sees the death, and the [Temporary] trigger later
resolves on a permanent that is already gone. **Same card, same kill, either order.**

The order that IS forced is the walk. Sprite Queen plays the Sprite *"to your base"*, and the Lab
kills only *"a unit you control here"*. The Sprite born in a Beginning Phase must Standard-Move to
the Lab in that same Main Phase (it is printed ready, so 144.2's exhaust is payable at once), because
816.1.c pins its own death to the next Beginning Phase's start. Miss the walk and the next
Beginning Phase still fires the Shard — the [Temporary] death at base is a friendly death — but the
Lab has nothing to eat but your holder.

## 4. What the forced kill does to the board

355.10.e makes the opponent choose the casualty, so the Shard takes their worst body. Two cases
decide whether it ever scores:

- **B is their only body.** On T5 they must kill it. Their Control of B goes in the Open-State
  Cleanup after the Shard resolves (323.6: *"Players lose control of any controlled Battlefields
  without their Units occupying them if the turn is in an Open State and there is no Showdown or
  Combat ongoing there."*), so B is open when your Main Phase starts. Sprite #2 is ready at base:
  walk it into B instead of the Lab and 344.2 opens a Showdown with nobody to fight, a Conquer.
  Next Beginning Phase that Sprite dies at B before scoring and B is open again for the next one:
  **a Conquer every turn at B, beside the Pixie's Hold at the Lab, two a turn from T5 — eight on
  T7.** The Lab's card is the price: the Sprite standing at B is not at the Lab.
- **They keep a spare.** Any deck that makes a token a turn feeds the Shard for nothing, and the
  forced kill becomes a tax on a body they were going to make anyway. Against that deck the engine
  is one card a turn from the Lab and no tempo.

So the honest price is in the entry's own words — *"attrition, not an answer"* — and the attrition
pays only against a deck that cannot spare a body.

## 5. Breaks to

**`OGN-169 Gust`** — Chaos, E1, [Reaction]: *"Return a unit at a battlefield with 3 :rb_might: or
less to its owner's hand."* Cast on the opponent's own turn at the Sprite standing at the Lab. A
token returned to hand is gone — 186.1: *"If a token is put into any Non-Board Zone besides the
chain, it ceases to exist immediately after moving to its new zone."* At your next Beginning Phase
the only unit at the Lab is the Pixie, and you choose between:

- **decline the Lab**: no friendly unit dies (the new Sprite is born that Beginning Phase and
  816.1.c keeps it alive), so **no forced kill and no card** this turn; or
- **feed it the Pixie**: one card and the forced kill, and 323.6 strips your Control of the Lab
  before you Hold it — **one point and your holder** for them.

One Energy, every turn, and they cannot be stopped in your own Beginning Phase: the Lab's cost is
paid at finalization and 312.2.c gives nobody priority until everything has finalized. Their window
is their own turn, and it is open as long as the Sprite stands *"at a battlefield"*.

**The defence is to leave the Sprite at base.** Gust cannot reach a base, the [Temporary] death
there still feeds the Shard, and the forced kill survives untouched. What you give up is the Lab's
card. **So the Lab is not free: its card is bought by moving the Shard's fuel into Gust's range.**
Against a deck that runs Gust, run the line without the walk.

`SFD-005 Detonate` (Fury, E1 + 1 Power, *"Kill a gear. Its controller draws 2."*) on the Shard ends
the forced kill for good, and hands you two cards for it. It is the permanent answer and not the
cheap one.

## 6. Verdict

**The engine is what the entry says it is, and its ordering note is unnecessary.** The Lab's kill
is a 383.3.b base cost paid at finalization, before the [Temporary] trigger can resolve, so the Lab
draws whichever trigger is placed first. The ordering that matters is the walk to the Lab in the
Main Phase the Sprite is born, and the deployment order — Shard on T3, Queen on T4 — which puts the
first forced kill on T5 instead of T6.

**Priced as a game it is the contested curve, T9, unless the opponent runs out of spare bodies**,
in which case the ready Sprite re-Conquers their battlefield every turn and the deck reaches eight
on T7.

**And the Lab's card costs exposure**: the Sprite it eats stands where `OGN-169 Gust` reaches it for
one Energy. Kept at base, the Sprite is out of Gust's range and the forced kill still happens.

## 7. Not verified

I assumed the Lab is the battlefield drawn for you (one in three in a Duel, 485.5), perfect draws,
and runes in the domains the costs want (108.5.d). I did not walk removal on Sprite Queen herself
(Might 6, no [Deflect]), nor the opponent contesting the Lab with a body of Might 4 or more while
only the Pixie and a Sprite stand there.

## Leads

- The entry's notable *"Put the Lab first"* is not load-bearing: 383.3.b / 383.3.b.1 make the Lab's
  kill its base cost, paid at finalization, and 337.1.b with 312.2.c finalize every trigger before
  any resolves, so the Lab pays on a still-living Sprite in either order.
- The entry's steps play Shard and Queen *"(E6) and … (E7 + 1 Mind Power)"* without an order. Shard
  first (T3, no Power) gives the first forced kill on T5; Queen first gives it on T6.
- `OGN-169 Gust` on the Sprite at the Lab, on the opponent's turn, turns off a turn's kill and card
  for one Energy; the Sprite left at base is out of range and still feeds the Shard. Neither the
  entry nor its notables name Gust.
- `UNL-076 Petal Pixie` reads *"+1 :rb_might: for each of your units with [Temporary] at my
  battlefield"*: it is the Lab's natural holder, and the walking Sprite makes it Might 3.
