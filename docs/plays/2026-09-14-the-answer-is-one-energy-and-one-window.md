# Play — the answer is one Energy, the window is one Showdown, and a free reordering closes it

Issue #200, 2026-09-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. This walks the OPPONENT's side of the line in
[one body carries four points](2026-09-14-one-body-carries-four-points.md), whose own section 9 says
it did not do this.

**Subject: `trinity-tryndamere-both-phases-chain`.** Its Hold half scores four a turn off a single
Might-1 carrier, and `OGN-133 Flurry of Blades` takes the carrier, the three gear and the battlefield
for **one Energy**. That is already in the entry. **What is not anywhere is WHEN.**

**The carrier is a legal target for that card during exactly ONE window of one turn, and the line can
close it by reordering the same turn's plays at no cost.** After the first `SFD-115 Trinity Force`
attaches, the carrier is Might 3; after the third it is Might 7, above every removal price this format
prints. **The one-Energy answer is not a standing threat. It is a two-minute door that the line
currently holds open for free.**

And a second thing, which inverts a card: the line's own domain prints `UNL-106 Repulse`, a one-Energy
counter for abilities — **and it cannot counter the one card that beats the line**, because Flurry
chooses nothing.

---

## 1. What this play assumes, and where it came from

The board, the costs and the turn table are the subject play's and are not re-derived here. What
matters below is only this: the carrier is `UNL-111 Determined Sentry` (Body, E1, **Might 1**, *"I
can't move to base."*), the payoff is three `SFD-115 Trinity Force` (Body gear, E4, **M+2**, `[Equip]`
one Body rune, *"[Effect] When I hold, score 1 point."*), and the line wins on **T5** going first.

**Dead turns, stated rather than buried:** T1 does nothing but deploy the E1 body, and T3, T4 and T5
each leave Energy idle. That is the subject play's own accounting and I have not re-measured it.

## 2. The Might-1 window is one Showdown wide

**A body at your BASE is not reachable by the answer at all.** `OGN-133 Flurry of Blades` reads *"Deal
1 to all units at battlefields."* On T1 the Sentry is at base. There is no window.

On T2 the line moves it in. **190.3.a.1**: *"Units moving to or being played to a battlefield apply
Contested status if that battlefield is not already Contested and that Unit's controller does not
already"* control it. **344.2**: *"If Control of a Battlefield is Contested, there aren't units
controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened
during the next Cleanup."* And **316.8.c**: *"A Showdown is a structured Window of Opportunity where
Players may play cards and activate abilities with Action or Reaction."*

**So taking an empty battlefield hands the opponent a window, and Flurry is a `[Reaction]` card.** That
Showdown is where the one-Energy answer lives.

## 3. The reordering that closes it, and it costs nothing

The subject play's T2 is *move in, then play Trinity #1 and Equip it*. **Reverse the two.**

**818.1 makes `[Equip]` a separate Activated Ability and Trinity Force's reminder is *"Attach this to a
unit you control"* — no location clause.** **381**: *"All Activated Abilities can only be activated on
the Controlling Player's Turn and during an Open State"*, which your own Main Phase is. So the Equip is
legal at base, before the move.

```
T2 as written        play Trinity #1 (E4) is AFTER the move
                     -> the Sentry stands at the battlefield at Might 1
                     -> the Conquer's own Showdown is a Reaction window
                     -> OGN-133 Flurry of Blades, E1, kills it there

T2 reordered         play Trinity #1 (E4), [Equip] it (1 Body) at BASE
                     -> 434.1.d and 137.3 put the Sentry at Might 3
                     -> THEN move in. Same Conquer, same turn, same runes
                     -> Flurry has no target it can kill
```

**The runes are identical.** Four runes pay E4 by 164.2.a (the cost is each rune's exhaust) and one of
those already-exhausted runes then pays the Body Power by 164.2.b (the cost is the RECYCLE, not an
exhaust), leaving three. The move costs the Sentry's own exhaust and no Energy (144.2). **Nothing is
spent to close the window; only the order changes.**

This is the standing rule of this project working: try a different legal ordering before you conclude
anything.

## 4. After T2 the price of the answer climbs every turn

`SFD-115 Trinity Force` is **M+2**, and **434.1.d**: *"The Top-Most Card has its Might modulated by the
Might Bonus of all cards Attached to it."*

| after | attached | carrier Might | what still reaches it |
|---|---|---|---|
| T2 | one Trinity | 3 | the format's whole removal suite — Might 3 is the line it is priced at |
| T3 | two Trinity | 5 | one printing in the pool, at E10 + 2 Power |
| T4 | three Trinity | 7 | nothing cheap |

**So the carrier is hardest to kill exactly when it is worth most.** That inverts the usual shape and
it is the strongest thing about the line: the same card that pays the points also pays for the body's
survival, and neither the entry nor the subject play says so.

## 5. The line's own domain prints a counter that cannot counter the answer

`UNL-106 Repulse` — **Body**, E1 + 1 Power, `[Reaction]` — reads *"Choose a friendly unit at a
battlefield. Counter an enemy spell or ability that chooses it and no other friendly unit."* It is one
of only two cards in the pool that counter an ABILITY rather than a spell, and it is in this line's own
identity for one Energy.

**It cannot counter `OGN-133 Flurry of Blades`, because Flurry chooses nothing.** **355.10.d**: an
object *"is programmatically selected based on its characteristics rather than chosen by the spell or
ability's controller"*, with the rulebook's own worked example: a spell reading `Kill all units at a
battlefield` *"targets a battlefield, but does not target any units"*

**Which makes Repulse exactly right for a Might-2 or Might-3 carrier and exactly wrong for a Might-1
one**, because every OTHER answer at this price chooses:

| answer | domain | cost | chooses? | Repulse stops it |
|---|---|---|---|---|
| `OGN-133` Flurry of Blades | body | E1 | no | **no** |
| `SFD-162` Blood Money | order | E2 | yes | yes |
| `UNL-072` Crescent Strike | mind | E3 + 1 Power | yes | yes |

**The uncounterable answer is Body-only.** An opponent outside a Body pair cannot run Flurry at all,
and everything they can run instead walks into a one-Energy counter the line already wants.

## 6. Once the Hold triggers are placed, the opponent has nothing

The Score happens at **315.2.b.2** in your Beginning Phase, and each Trinity Force's *"When I hold"* is
a Triggered Ability going on the Chain. **401.1**: an ability's Chain Item *"will not have a card
representing it, this will create a Closed State"*, and **312.2.c** gives priority in a Closed State —
so the opponent DOES get a window there, and **813.1.c.1** admits a `[Reaction]` card in it.

**And it is worthless to them.** **383.2.a.1**'s worked example ends: *"If she is removed in reaction
to the triggered ability, it will still resolve."* Killing the carrier after the triggers are placed
does not unbank the points. The two ability-counters are both worded against an **enemy** spell or
ability choosing **your** unit, so neither reaches your own Hold trigger.

**So the opponent must act on their own turn — the turn before — and you cannot repair it afterwards**,
because 316 Main Phase comes after 315 Start of Turn. A carrier killed on their turn is a Hold missed
before you ever get priority again.

## 7. Why killing the gear is the wrong play, and it is not close

My own census this morning counted sixteen enemy-facing gear answers and asked, of 137 entries standing
on Equipment, whether each names one. **On this line the question is the wrong question**, because
killing the BODY strictly dominates killing the gear:

| what they kill | cost | gear removed | battlefield |
|---|---|---|---|
| the carrier, with `OGN-133` | E1 | all three, by 719.5 | lost, by 323.6 |
| one gear, with `SFD-005 Detonate` | E1 + 1 Power | one — and it draws YOU two | kept |
| all gear, with `OGN-022 Thermo Beam` | E5 + 2 Power | all three | kept |

**719.5**: when a Top-Most Card changes zones from a board zone to a non-board zone, all attached cards
detach; **457.1** then recalls them to base at the next Cleanup; **323.6** strips Control of a
battlefield your last body left. **One Energy and no Power does what five Energy and two Power does,
and takes the battlefield as well.** The gear-removal suite is a trap here.

## 8. What the recovery costs, priced

A new body, then three `[Equip]` activations at one Body rune each — **three Power in one Main Phase**,
which is three runes recycled off a board of seven (161.2.b sends each to the Rune Deck; 315.3.b
returns two a turn). Then the battlefield must be Conquered again, which is another turn.

**The cheap insurance is in the identity and costs one Energy**: a second `UNL-111 Determined Sentry`
parked at BASE. 103.2.b allows three. Flurry reads *"at battlefields"*, so a spare at base is untouched
by the very card that killed the first — and it walks in next turn.

## 9. Verdict

**The one-Energy answer is real and its window is one Showdown on one turn, and the line hands that
window over for free by moving before it equips.** Reordered, the carrier arrives at Might 3 and the
answer is dead from the moment it matters. From T3 the carrier is Might 5 and out of reach of
everything the format prices cheaply.

**What the line should actually fear is not Flurry but the turn it loses to it** — and the fix is an
ordering, a spare E1 body at base, and `UNL-106 Repulse` held for the targeted answers it can stop.

## 10. Not verified

I did not sweep the cheapest answer to a Might-1 body at a battlefield **in every domain**. Section 5's
table names three I verified card by card — one untargeted, two that choose — and it is not a claim to
be complete. I also did not re-derive the subject play's turn table, its rune curve or its dead turns;
those are its measurements and I took them as given. And I did not walk what the opponent does on the
boards where they contest the battlefield rather than answering the carrier, which is a different play.
