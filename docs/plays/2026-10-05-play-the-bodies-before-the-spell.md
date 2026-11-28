# Play — play the bodies before the spell, because the units it draws can never take its buffs

Issue #254 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `karma-double-trouble-repeat-two-buffs`**, the Calm/Order ENGINE in which
`UNL-032 Double Trouble` with its [Repeat] is two recycle events, so `OGN-235 Karma, Channeler`
places two buffs for one card. The entry's arithmetic is right: the payoff is min(triggers, unbuffed
bodies). Walked as a game, the order of the Main Phase decides which half of that minimum binds:
every body that is to take a buff has to be on the board **before** the spell is cast, and the units
the spell itself digs up never qualify.

**Why this line.** `scripts/sequence-pick.mjs` re-run on 2026-10-05 at `74259ff` reads 771 entries,
262 with forced-ordering language and **102 in the queue**. The pick is by global rank, skipping
entries that already have a play: this entry is rank 12 (two hits on *first*), second in
`node scripts/sequence-pick.mjs --unplayed`. The other entry of this slice is rank 11, played in
[the wall is six plus the two biggest attackers](2026-10-05-the-wall-is-six-plus-the-two-biggest-attackers.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Calm/Order legend (103.1.b) |
| **The payoff** | `OGN-235 Karma, Channeler` (Order, E6 + 1 Power, M6), on the board |
| **The spell** | `UNL-032 Double Trouble` (Calm, E2, [Repeat] 2 Energy), cast in your Main Phase |
| **Bodies** | two friendly units **without a buff**, on the board before the spell is cast |

The card text the play turns on:

- Karma, Channeler: *"[Vision] (When you play me, look at the top card of your Main Deck. You may
  recycle it.) When you recycle one or more cards to your Main Deck, buff a friendly unit. (If it
  doesn't have a buff, it gets a +1 :rb_might: buff. Runes aren't cards.)"*
- Double Trouble: *"[Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's
  effect.) Look at the top 3 cards of your Main Deck. You may reveal a unit from among them and draw
  it. Recycle the rest."*

## 2. When the buffs are chosen

Both executions happen inside one resolution — 340.1: *"The newest Finalized Chain Item resolves.
Execute its game effects in their entirety."* The two recycles fire Karma twice during that
resolution, and her two triggers reach the chain only after it, when 340.3 sends the chain back to
finalizing: *"If the Chain is not empty and there are one or more Pending Items, return to Step 1:
Finalize."* That is when each trigger's friendly unit is chosen, and 402.4.b makes the choice
compulsory: *"If there are legal options to choose, the ability’s controller must choose them. They
may not decline this stage of playing a Trigger."*

Three consequences, in order:

1. **The drawn units are in your hand at that moment**, so neither is a legal choice. A buff can only
   go on a unit already on the board.
2. **You cannot play them in between.** The two triggers on the chain make a Closed State, and
   331.1.a bars it: *"Cards of all Categories, by default, cannot be played during a Closed State."*
3. **A body that already carries a buff wastes the trigger.** 702.3.a: *"If a Buff is added, or
   instructed to be added, on a Unit that already has a Buff, it is not placed instead."*

So the count of buffs is fixed the moment you cast the spell: two only if two unbuffed friendly units
are already standing on the board.

## 3. The turns, going first

Calm/Order, a curve of 2-Energy bodies (`OGN-216 Soaring Scout`, Order, E2 M1, is the entry's own
second body). The opponent is developing a board and holding cheap interaction.

```
turn   runes   your Main Phase                                         unbuffed bodies on board
T1     2       Soaring Scout                                           Scout
T2     4       a 2-drop; walk Scout to A, Conquer                      Scout, 2-drop
T3     6       a 2-drop, hold the rest                                 three
T4     8       Karma: exhaust 6 for E6, recycle one exhausted rune     three + Karma
               for the Order Power (7 runes left)
               [Vision]: recycle the top card -> Karma fires once:
               buff Scout (1 -> 2 Might)                               two + Karma
T5     9       FIRST: a 2-drop (E2)
               THEN: Double Trouble + Repeat (E4); dig the top six,   two buffs land on two of
               draw up to two units, recycle the rest twice             the unbuffed bodies
               3 runes still ready
```

**T4's Vision is a third buff nobody priced in this entry.** 817.1.c makes the trigger *"the
permanent entering the Board"*, so Karma is already on the board when her own Vision recycles, and
her second ability fires on it. Recycle the top card and the first buff lands on entry, before
Double Trouble is even in play. The cost is that it consumes one unbuffed body.

**The wrong order on T5 loses both buffs.** Cast Double Trouble first on a board where every body is
already buffed, and both triggers find only buffed units: 702.3.a places nothing, the two units the
spell drew sit in hand, and 331.1.a keeps them there until the chain is empty. The 4 Energy buys the
dig and nothing else.

## 4. Breaks to

**`OGN-045 Defy`** — Calm, E1 + 1 Power: *"Counter a spell that costs no more than :rb_energy_4: and
no more than :rb_rune_rainbow:."* Double Trouble is printed at E2, so it is in range with or without
its Repeat (206). Countered, nothing is looked at, nothing is recycled, Karma never fires, and the
Repeat's 2 Energy is gone with the rest — 425.1.c: *"Countering does not refund any costs paid to
play a card, activate an ability, or trigger an ability."*, and 425.1.c.1: *"This includes
additional costs."* Double Trouble has no [Action] or [Reaction], so it is always cast on your own
turn, into whatever the opponent left ready.

**Outside Calm, `SFD-136 Hard Bargain`** — Chaos, E2: *"Counter a spell unless its controller pays
:rb_energy_2:."* It is answered by leaving 2 Energy ready, which the T5 line above does (3 spare). A
line that plays a second 2-drop first to have a third unbuffed body has 1 spare, and loses the spell
to it.

**Kill Karma before your turn. `OGN-229 Vengeance`** — Order, E4 + 2 Power, *"Kill a unit."* No
location clause, so she is reachable at your base on their turn. Without her, Double Trouble is a
4-Energy dig for up to two units and nothing more.

## 5. Verdict

**The entry is right about the minimum and leaves out which half binds.** Two triggers are cheap;
unbuffed bodies on the board at the moment of casting are the constraint, and the spell's own draws
can never be among them. Play every body first and cast Double Trouble last.

**It scores nothing: 4 Energy for up to two units out of the top six and two +1 buffs, plus a free
third buff from Karma's own Vision on entry.** It breaks to `OGN-045 Defy` for E1 + 1 Power, to
`SFD-136 Hard Bargain` for E2 when you left less than 2 Energy ready, and to `OGN-229 Vengeance`
for E4 + 2 Power on Karma before your turn.

## 6. Not verified

I did not walk a deck with fewer than six cards in the Main Deck (the second look sees fewer cards,
and if both looks find nothing to recycle Karma does not fire), whether the drawn units should be
played after the chain empties on the same turn, or 2v2.

## Leads

- The entry's step 1 reads *"Play Karma, Channeler ... and have a second friendly unit without a
  buff"*, i.e. Karma herself as one of the two targets. If her own [Vision] recycle was taken on
  entry (817.1.c), she is already buffed and Double Trouble needs **two other** unbuffed bodies
  (702.3.a).
- Nothing in the entry says the bodies must be played **before** the spell. The two Karma triggers
  are chosen after the whole spell resolves (340.1, 340.3, 402.4.b), when the units it drew are still
  in hand and 331.1.a bars playing them.
- Karma's Vision buff on entry is a third buff the entry's netPerIteration does not count.
