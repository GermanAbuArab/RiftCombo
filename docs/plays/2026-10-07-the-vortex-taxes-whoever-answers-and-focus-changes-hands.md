# Play — the Vortex taxes whoever answers, and Focus changes hands

Issue #299 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mystic-vortex-overt-operation-taxes-the-answer`**, the mono-Body ENGINE in which you attack
into `VEN-160 Mystic Vortex`, take Focus as the Attacker and play `OGN-153 Overt Operation` first. It
has [Action] and not [Reaction], so the Vortex charges it nothing, and any answer inside its chain must
be a [Reaction] card and pays one rainbow Power more. The entry is right about that chain. Walked as
a game, the chain closes, Focus passes to the opponent, and an [Action] card played on their Focus is
the card that closes the next chain: the Vortex charges it nothing either. The tax falls on the answer
to each chain, not on the opponent.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `cfe8539`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 73 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 27 (hits on *first*), second in the list. The other entry of this slice is rank 26,
played in [the counter kills the unit the spell was saving](2026-10-07-the-counter-kills-the-unit-the-spell-was-saving.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Body in its pair (103.1.b) |
| **Table** | `VEN-160 Mystic Vortex` selected as a battlefield (485.5) |
| **First** | two units walking into the Vortex together: two `SFD-096 Laurent Bladekeeper` (Body, E3, M3) |
| **Then** | `OGN-153 Overt Operation` (Body, E5 + 2 Power), first, with Focus |

The card text the play turns on:

- Mystic Vortex: *"During showdowns here, cards with [Reaction] cost :rb_rune_rainbow: more to play.
  (Hidden cards have [Reaction].)"*
- Overt Operation: *"[Action] (Play on your turn or in showdowns.) For each friendly unit, you may spend
  its buff to ready it. Then buff all friendly units. (Each one that doesn't have a buff gets a +1
  :rb_might: buff.)"*

The Vortex is not certain to be on the table. 485.5: *"Setup: Each player randomly selects one (1) of
their three (3) Battlefields."* It is one game in three when it is yours.

## 2. Your order: attack first, then play the spell first

Walk both Bladekeepers in as one action — 144.3: *"Players may perform multiple Units' standard move
simultaneously. This is treated as one game action performed on multiple Units."* — and the combat
showdown opens with you holding Focus, 464.2.c.1.a: *"If a showdown opens as part of combat, this
player gains Focus as the showdown begins."*

Play Overt Operation now. You are the one closing the state, so 358.4 asks only for [Action]: *"If the
state is Showdown Closed and the card was the one that Closed the state, ensure that it has [Action] or
[Reaction]."* It has [Action] and no [Reaction], and 813.1.b runs only one way: *"Reaction grants the
corresponding card or effect all abilities and permissions of Action."* The Vortex reads [Reaction],
so it charges you nothing. Each friendly unit gets a buff, and 703: *"Each Buff individually
contributes +1 Might to a Unit."*

Anything the opponent plays inside that chain must be a [Reaction] card — 309.1.a: *"Only cards and
abilities with the Reaction keyword can be played or activated in a Closed State."* — and the Vortex
adds a rainbow to it. So they do not answer inside the chain.

## 3. Their order: let it resolve, then take Focus

When Overt Operation's chain closes, Focus moves. 347.1.b: *"When that Chain closes, Focus passes to the
next Player in Turn Order."* And with it, the right to act: 313.2: *"A player who gains Focus also
gains Priority."* The opponent now plays a card into an Open State and is the one who closes it, which
is 358.4's first example again, from their side. An [Action] card with no [Reaction] pays the Vortex
nothing, and now **your** answer is the [Reaction] card that pays the rainbow.

So the Vortex does not tax the defender. It taxes the answer to each chain, and the showdown alternates
chains. Whoever plays [Action] cards on their own Focus pays nothing; whoever needs [Reaction] pays.

## 4. The turns, going first

Mono-Body against Calm/Mind. The opponent's `SFD-038 Ribbon Dancer` (Calm, E3, M3) has held the Vortex
since their T2; you hold the other battlefield, A.

```
turn    runes   your turn                                                 points
T1      2       Demacian Diplomat (E2) at base                            0
T2      4       Diplomat walks to A, Conquer: +1. Bladekeeper (E3) at     1
                base. 1 rune left.
T3      6       Hold A: +1. Second Bladekeeper (E3) at base.              2
T4      8       Hold A: +1. Both Bladekeepers walk into the Vortex.       3
                Showdown, your Focus. Overt Operation (E5 + 2 Body
                Power): every unit you control is buffed, the
                Bladekeepers are M4. 1 rune left ready.
                Their Focus: Bellows Breath (E1 + 1 Power), 1 to each
                Bladekeeper. Combat: the Dancer dies, its 3 damage
                kills a Bladekeeper. Conquer the Vortex: +1.              4
```

The Power comes from runes, so each one paid takes a rune off the board — 164.2.b: *"Recycle this:
[Reaction] — Add [C]."* — and 161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not
the Main Deck."* Overt Operation uses seven of your eight runes on T4, and two of them do not come
back.

The combat arithmetic is 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage
equal to their summed Might among the other's Units."* Without Overt Operation, two M3 Bladekeepers
deal 6 to an M3 Dancer, which kills it, and the Dancer's 3 kills one Bladekeeper. With Overt Operation
and nothing else, the Dancer's 3 kills neither M4 body: that is what the spell buys. Bellows Breath puts
one damage on each, and 143.2.a counts marked damage: *"If a Unit ever has nonzero damage marked on it
equalling or exceeding its Might, it is Killed."* Three more on an M4 body with one marked is four.

## 5. Breaks to

**The line breaks to `SFD-080 Bellows Breath`** (Mind, E1 + 1 Power, *"[Action] (Play on your turn or in
showdowns.) [Repeat] :rb_energy_1::rb_rune_mind: (You may pay the additional cost to repeat this
spell's effect.) Deal 1 to up to three units at the same location."*), played on the Focus that
347.1.b hands the opponent after Overt Operation resolves. It has no [Reaction], so the Vortex does not
see it, and it puts the combat back exactly where it was without Overt Operation: one Bladekeeper dead,
the Dancer dead, the Vortex yours. Two resources against your seven.

**Answering it costs you the tax.** Anything you play in response is a [Reaction] card in a Closed State
at the Vortex and pays a rainbow more, and on T4 you have one rune left.

**`OGN-133 Flurry of Blades`** (Body, E1, *"Deal 1 to all units at battlefields."*) does the same job for
an opponent with Body in their pair, but it has [Reaction], so at the Vortex it costs E1 and a
rainbow: the Vortex raises it to Bellows Breath's price and no further.

## 6. Verdict

**The Vortex taxes the answer to the chain you start, and the opponent does not have to answer that
chain.** Overt Operation first is the right order: you close the state, you pay nothing, and nobody
can answer you inside your chain for free. But a showdown is a series of chains, and Focus passes after
each one. An opponent holding a cheap [Action] card waits one chain, then plays it untaxed. Nothing
here scores beyond the Conquer the attack was making anyway.

## 7. Not verified

I did not walk the escalated showdown the entry already flags (464.2.c.1.b), a two-domain shell,
2v2, or a game where the opponent's own battlefield is the Vortex and they attack into you.

## Leads

- The entry's *"every answer to it costs one rainbow Power more"* holds only inside Overt Operation's
  own chain. 347.1.b passes Focus when that chain closes, and 313.2 gives the opponent Priority with
  it, so an [Action] card on their Focus closes the next chain and pays nothing.
- The entry names no answer. `SFD-080 Bellows Breath` (E1 + 1 Power, [Action] only) undoes the +1
  buff on two attackers, untaxed.
- `OGN-133 Flurry of Blades` is the [Reaction] version of the same answer, and the Vortex prices it at
  E1 plus a rainbow, the same total as Bellows Breath.
