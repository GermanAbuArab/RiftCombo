# Play — the Seer stays home and the Birds answer their spell

Issue #303 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `gemcraft-seer-flurry-of-feathers-bird-dig`**, the Calm/Mind ENGINE in which `OGN-100
Gemcraft Seer` gives [Vision] to the four Bird tokens of `UNL-044 Flurry of Feathers`, and 817.2.b
turns four Visions into one look with up to three re-rolls: a four-deep dig with a stop button. The
entry is right about 817.2.b, which is its whole content, and right that the dig never burns you out.
Walked as a game, the best time to dig is the opponent's turn, and on their turn the only window is a
card of theirs on the chain. So the dig is a response, and the Birds can be the answer to that card as
well as four looks. What breaks it is a [Reaction] that kills the Seer first.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `4035579`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 69 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 31 (a hit on *first*), second in the list. The other entry of this slice is rank 30,
played in [LeBlanc stays home and two bodies keep the Tomb](2026-10-07-leblanc-stays-home-and-two-bodies-keep-the-tomb.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm/Mind legend (103.1.b); here `OGN-255 Nine-Tailed Fox` |
| **First** | a battlefield of your own, taken by `OGN-052 Stalwart Poro` (Calm, E2, M2) |
| **Then** | `OGN-100 Gemcraft Seer` (Mind, E3 + 1 Power, M3), at your base |
| **Held** | `UNL-044 Flurry of Feathers` (Calm, E4 + 2 Power) and four ready runes, two of them Calm |

The card text the play turns on:

- Gemcraft Seer: *"[Vision] (When you play me, look at the top card of your Main Deck. You may recycle
  it.) Other friendly units have [Vision]."*
- Flurry of Feathers: *"[Reaction] Choose one — • Counter a spell. • Play four 1 :rb_might: Bird unit
  tokens with [Deflect]. (Opponents must pay :rb_rune_rainbow: to choose them with a spell or
  ability.)"*

## 2. Your order: the Seer first, the Birds in response

The Seer has to be on the board first, because the Birds get [Vision] from his static as they arrive.
383.2.c.1: *"If a Game Object has a Triggered Ability that is active in a specific zone, it is
evaluated and subsequently triggered if it enters that zone at the same time that its Trigger's
condition is met."* And Vision's trigger is entering, not being played, 817.1.c: *"The trigger is the
permanent entering the Board."* Flurry first and Seer after gives one look, the Seer's own.

The four triggers go on the chain in the order you pick, 383.3.d: *"If more than one Triggered Ability
is Triggered simultaneously, then the player that controls the Abilities selects the order to place
them on the Chain."* Each one is its own choice, 817.2.a: *"The player may choose to recycle or not
recycle for each instance of Vision separately."* And declining stops the dig, 817.2.b: *"If the player
does not recycle the top card and nothing else happens in between the triggers resolving, each
instance of Vision will see the same card."* A recycled card goes to the bottom, 416.1.a: *"Main Deck
cards are Recycled to the Main Deck."*

When to dig is the real decision. Nothing about the dig draws, so the card you stop on waits on top for
your next Draw Phase (315.4.b, *"1. The Turn Player draws 1."*). Digging on the opponent's turn costs
the same and keeps Flurry's other mode open until then, since a spell worth countering may come first.
But on their turn you have no priority in an open state. 312.2.a gives it *"When the turn is in a
Neutral Open State during their Main Phase"*, meaning your own, and the closed-state windows are
312.2.c and 312.2.d, which need a chain. Flurry's [Reaction] is the permission to use them, 813.1.c.1:
*"This can be played during Closed States on any player's turn."* So on their turn the dig is always a
response to something of theirs, and the Birds land before that thing resolves, 340.1: *"The newest
Finalized Chain Item resolves."*

Where the Birds go is yours too. Flurry names no place, so 355.2.a applies: *"By default, Valid
locations include the controller's Base or a Battlefield the controller controls."* If their spell is
removal on your garrison, the Birds go to that battlefield and hold it after the garrison dies.

The Seer stays at the base for the same reason. `OGN-169 Gust` (Chaos, E1, [Reaction]) returns *"a unit
at a battlefield with 3 :rb_might: or less"*, and `OGN-009 Hextech Ray` deals 3 *"to a unit at a
battlefield"*; neither reaches a base.

## 3. Their order: removal on your garrison

Fury/Chaos against you, holding the other battlefield, B. On their T3 they cast `OGN-009 Hextech Ray`
(Fury, E1 + 1 Power), *"Deal 3 to a unit at a battlefield."*, on the Poro holding your battlefield, A.
That is the chain you were waiting for.

## 4. The turns, going first

Calm/Mind against Fury/Chaos.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) at base                                0
their T1        a unit at base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Gemcraft Seer (E3 + 1       1
                Mind Power) to base: three runes exhausted, one Mind
                rune recycled. His own Vision: one look. 3 runes on
                the board.
their T2        their unit walks to B, Conquer.
T3      5       Hold A: +1. Spend at most one rune: four stay ready,      2
                two of them Calm.
their T3        Hextech Ray on the Poro at A. In response: Flurry of
                Feathers, Birds mode (four runes exhausted, two Calm
                recycled), all four Birds to A. Flurry resolves first,
                four Visions trigger: look, recycle, look, recycle,
                look, stop. Then Hextech Ray kills the Poro. Four Birds
                still occupy A.
T4      5       Hold A: +1. Draw Phase: the card you stopped on.          3
```

The dig cost no card of yours that the opponent did not also spend, and A survived a spell that was
meant to take it. 431.1.c keeps the dig safe even with a thin deck: *"If an instruction directs a
player to look at or reveal cards in excess to the number of cards in a player's Main Deck, that player
looks at or Reveals as many as possible, but does not Burn Out, then proceeds with the rest of the
instruction."*

## 5. Breaks to

**The line breaks to `OGN-033 Shakedown`** (Fury, E2 + 1 Power, two runes, one recycled), cast in
response to Flurry: *"[Reaction] (Play any time, even before spells and abilities resolve.) Choose an
enemy unit. Deal 6 to it unless its controller has you draw 2."* It names any enemy unit, so the Seer
at the base is in reach, and it resolves before Flurry (340.1). You choose. Take 6 and the Seer dies:
when the Birds enter, no static is active, 383.2.c.1 has nothing to trigger, and the dig is four bodies
and no looks. Or let them draw 2, keep the Seer, and pay two cards for a dig that draws none. Either way
the engine is worse than the cards it spent. Answering Shakedown takes a second Flurry in counter mode,
four more runes you do not have on T3.

`UNL-131 Abandon` (Chaos, E2) is cheaper and stops one dig: *"Counter a spell. Return it to its owner's
hand instead of putting it in their trash."* You lose the turn's six runes of mana and keep the card and
the Seer, so it delays the engine rather than breaking it. `OGN-045 Defy` cannot reach Flurry, which
costs two Power.

## 6. Verdict

**A four-deep dig with a stop button, as the entry says, and on the opponent's turn it is a reaction.**
The rules reading is right. The play adds the order: the Seer on the board before Flurry, the Seer at
the base, and Flurry held for the first card the opponent puts on the chain, so the Birds can also
stand where their spell was aimed. The line breaks to a two-rune [Reaction] that kills the Seer before
the Birds arrive, or makes you pay two cards to keep him.

## 7. Not verified

I did not walk the counter mode used on their T3 instead, the dig taken on your own Main Phase, or
`UNL-077 Soul Shepherd` beside the Birds. I did not check whether the opponent may respond between the
four Vision triggers, which 817.2.b's *"nothing else happens in between"* allows for. 2v2 was not
walked.

## Leads

- The entry says the Birds die to `OGN-133 Flurry of Blades` (*"Deal 1 to all units at
  battlefields."*). That is true only at a battlefield. Flurry names no place, so 355.2.a lets you put
  them at your base, out of its reach, or on a battlefield you control, as a garrison.
- The entry's step 2 says Flurry can be played *"in any Closed State on either player's turn"*. On the
  opponent's turn a Closed State exists only once they put something on the chain (312.2.c, 312.2.d),
  so the dig there is always a response, and the Birds can be placed to answer what it responds to.
- The entry names no answer. `OGN-033 Shakedown` (two runes, [Reaction]) kills the Seer before the
  Birds enter, and they arrive without [Vision].
