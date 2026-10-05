# Play — the defender is the fuel, so you burn it last

Issue #242 (a slice of #200), 2026-10-04. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `twilight-reveler-svellsongur-stellacorn-draw`**, the calm/fury ENGINE that puts
`SFD-059 Svellsongur` on one `VEN-020 Twilight Reveler` so each of its attacks readies two units,
one of them `SFD-048 Stellacorn Herder`, which draws on every move. Nothing in it scores, so neither
turn clock reads it; walked turn by turn it is first online on **T5**. The entry's loop works, but
it states the opening wrong, it prices the draw at twice what it gives, and it never says that the
one card the whole loop stands on — the opponent's lone stunned defender — is also the cheapest
Conquer on the board. Spend it last.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. Re-run
on 2026-10-04 at 771 entries it reads 262 with the language and **102 in the queue**, unchanged
since slice 3. `--pair calm/fury` returns **2**, and this entry is the higher-ranked of the two (one
hit on *first*, six steps, against the other's five). The other pair taken in this slice is
body/chaos, played in [the Tank goes in first](2026-10-04-the-tank-goes-in-first.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-139 Rogue Assassin` (Fury/Calm), the only calm/fury legend name the pool prints |
| **The readiers** | 2x `VEN-020 Twilight Reveler` (Fury, E3, M3) |
| **The copy** | `SFD-059 Svellsongur` (Calm, E3 + 1 Power; [Equip] 1 Energy + 1 Calm Power) |
| **The payoff** | `SFD-048 Stellacorn Herder` (Calm, E4, M3) |
| **The stun** | `UNL-042 Back Off` (Calm, E3, [Hidden], [Action]) |
| **The free curve** | 2x `VEN-043 Steel Paws` (Calm, E1, M0) — not in the entry; §2 is built on it |
| **Board it wants** | the opponent holds battlefield B with exactly one body of Might 4 to 6 |

Domain identity from `data/cards.json`: the Revelers are Fury, the other four Calm, union
`{calm, fury}` under 103.1.b. None of them is a Signature card and none appears in
`data/legality.json`.

The card text the play turns on:

- Twilight Reveler: *"When I attack, ready another friendly unit."*
- Svellsongur: *"As this is attached to a unit, copy that unit's text to this Equipment's effect
  text for as long as this is attached to it."* On a Reveler, 434.1.c appends the copy back to the
  carrier, so that Reveler carries the trigger twice. The other Reveler carries it once.
- Stellacorn Herder: *"When I move, draw 1."*
- Back Off: *"[Stun] a unit. (It doesn't deal combat damage this turn.) If you played this from
  your hand, draw 1."*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); the recycled rune goes to the Rune Deck (161.2.b) and two come back each Channel Phase
(315.3.b).

```
       R   your Main Phase                                         spent    you
T1     2   2x Steel Paws                                           E2        0
T2     4   Paws walk, one to A, one to B -> two Conquers;          E3        2
           Reveler A
  their T2 or T3: one body walks into B, kills the Might-0 Paws and Conquers B
T3     6   Hold A. Reveler B; Svellsongur                          E6+1P     3
T4     7   Hold A. Equip Svellsongur to Reveler A; Stellacorn      E5+1P     4
T5     8   Hold A. Back Off from hand on their defender;           E3        6
           the loop (§3); last, the Conquer of B
T6         Hold A, Hold B                                                    8
```

T4 opens on seven because T3 recycled a rune for Svellsongur's Power; T4 recycles another for the
Equip. Every T4 and T5 Energy not listed sits idle: two on T4, five on T5.

**The clock this is measured against is the contested one.** Calm/fury reaches eight on **T5**
unopposed, because Steel Paws is Energy 1 and two copies are two bodies on turn 1; holding one
battlefield alone pays one a turn and reaches eight on **T9**. Here the two early Conquers from the
empty board carry the score to six by T5, and the finish in §3 takes B back on T5, so eight lands on
**T6** if the opponent cannot retake B on their T5. The loop itself adds no point: it adds cards.

## 3. The order the loop forces

**The opening is not the entry's first step.** On T5 Reveler A (the one carrying Svellsongur),
Reveler B and the Stellacorn are all ready — they readied in your Awaken. The entry's step 3 attacks
with A first and readies B and the Stellacorn, both already ready, and 415.1.c says what that buys:
*"If a Unit is instructed to be Readied while it is already Ready, nothing additional happens."*
Both triggers wasted. The opening that spends nothing:

1. The Stellacorn moves from base to A, which you control, so no combat starts: draw 1.
2. Reveler B moves from base into B and attacks the stunned defender: its one trigger readies the
   Stellacorn. The defender deals no combat damage (423.1.b) and takes three, survives at Might 4
   or more, and 466.1.a.2 recalls B to your base.
3. The Stellacorn moves from A back to base: draw 1.
4. Reveler A attacks: two triggers ready Reveler B and the Stellacorn.

**From there the loop is one draw per TWO Reveler attacks, not one per attack.** Reveler A readies
two units; Reveler B readies one, and it must spend it on Reveler A or the loop stops. The cycle is
A attacks (ready B and the Stellacorn), the Stellacorn moves (draw), B attacks (ready A). The
entry's `netPerIteration` reads *"+1 card drawn per Reveler attack"*, which is true of A's attacks
and false of B's.

The Stellacorn never needs to fight: base to A and A back to base are both Standard Moves (144.4.a,
144.4.b), and *"When I move"* fires on each.

**The loop stands on the defender, and the defender is a Conquer.** Each pass needs it alive: a
stunned body of Might 4 or more takes one Reveler's three damage, heals in the combat cleanup
(466.1.a.1), and keeps 466.1.a.2 recalling your attackers. But on the turn you stop drawing, two
ready bodies walking in together are one action under 144.3 — *"Players may perform multiple Units'
standard move simultaneously. This is treated as one game action performed on multiple Units."* —
and after A's attack readies Reveler B and the Stellacorn, those two walk into B for six damage —
**but only on an A attack that finds the Stellacorn at your base.** The loop moves it base to A and
back on alternate passes, a Standard Move from A to B needs [Ganking] (144.4, 144.4.c.1), and
144.3.a gives the two movers one shared destination, not a shared route; so finish on the pass after
the Stellacorn's move home, as in step 4 of the opening. A
stunned defender of Might 6 or less dies, you are the only player with units there, and 466.5 gives
you B: *"the player with Units remaining here Establishes Control if they didn’t already control
this Battlefield."* You have not scored B this turn, so it is a point. The Stellacorn draws on that
move too. **Do it last**: once the defender is dead there is nothing left to attack, 466.1.a.2 stops
recalling, and the loop is over.

**How many cards to draw is a choice, and the entry does not make it.** The loop stops when you
stop it. Its `terminatesIn` sets the bound at an empty Main Deck, but an empty deck is a point for
the opponent at your next Draw Phase by 315.4.b.1 — *"If there are no cards remaining in their Main
Deck to draw, the Turn Player has been Burned Out."* — with 194.1.d giving them the point. If the T6
Hold wins, the win is checked in the Cleanup after the Beginning Phase, before the Draw Phase, and
drawing everything costs nothing. If they retake B on their T5, it costs a point. Leave a card in
the deck for every Draw Phase you might still face.

## 4. Breaks to

**`OGN-169 Gust`** — Chaos, E1, [Reaction]: *"Return a unit at a battlefield with 3 :rb_might: or less
to its owner's hand."* Reveler A is Might 3 and stands at B every time it attacks. Gust in response
to its attack returns it to hand; Svellsongur detaches (719.5) and stays on the board unattached.
Rebuilding is the Reveler's E3 and the Equip's E1 plus a Calm Power, which is next turn's mana,
and without the two-trigger Reveler the loop has nothing to restart it.

`SFD-005 Detonate` (Fury, E1 + 1 Power, *"Kill a gear. Its controller draws 2."*) breaks it too, by
killing Svellsongur — but it costs a Power and gives you two cards, which on this line is the
resource you are already making. Gust is cheaper and gives you nothing.

The defender is the other target. A second enemy body at B, or the stun going on the wrong body,
puts damage back into the fight, and a Reveler at Might 3 dies to it.

## 5. Verdict

**The engine is real and the entry's account of it is loose in three places.** The first attack
must come after the two other bodies have spent their ready, or two triggers are wasted; the rate
is one card per two Reveler attacks; and the draw count is chosen against the next Draw Phase, not
run to an empty deck.

**What the entry misses is that its fuel is also its finish.** A lone stunned defender of Might 4
to 6 is the only thing that keeps the loop alive, and the same body dies to two ready attackers in
one move. Draw first, take B last.

**Priced as a game, the loop is a T5 card engine and the battlefield it fights at is the point.**
Eight on T6 against an opponent holding B, three turns ahead of the contested baseline, because the
defender that fuels the loop is the battlefield you take at the end of it.

## 6. Not verified

I assumed the opponent's body at B is exactly one, of Might 4 to 6: under 4 it dies to the first
Reveler and the loop never starts (you Conquer B instead), over 6 it survives the finish and you
keep only the cards. I assumed perfect draws by T5 and that the runes arrive in the domains the
costs want (108.5.d keeps the Rune Deck's order secret). I did not walk the opponent's T5 attack
into B, nor whether the opponent can answer Back Off itself.

## Leads

- The entry's step 3 opens with Reveler A attacking while Reveler B and the Stellacorn are already
  ready. A notable that the first readies must land on exhausted bodies (415.1.c), so B and the
  Stellacorn act before A's first attack, would carry §3.
- `netPerIteration` is one card per pass of two Reveler attacks, not per attack.
- The entry's notable sets the defender bar at 5+ Might. One Reveler deals three and 466.1.a.1 heals
  between combats, so Might 4 suffices; and a defender of Might 6 or less is a Conquer at the end,
  on a Reveler A attack that finds the Stellacorn at base.
