# Play — Jhin is in every game, and the Library in one in three

Issue #323 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `forgotten-library-jhin-spent-four`**, the Mind ENGINE in which one spell that spends four
Energy arms both halves of the *"if you spent"* family: `UNL-211 Forgotten Library` gives a free
[Predict], and `UNL-089 Jhin, Meticulous Killer` comes down for one Mind Power. The entry is right
about the word *spent*, and the play shows it twice over: Jhin's own domain carries the discount that
switches both halves off, and Iterative Design's own [Flow] is a spend of two. Walked as a game, the
T3 is real: Deadly Flourish, Jhin and a 2-drop on six runes, a 4-Might body for one rune. Two things
the entry does not price come out of it. The Library is in play in one Duel game in three, and Jhin
never needed it. And the two Predicts are one look at one card unless the first one recycles.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `7695ecf`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 49 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 52 (a hit on *first*), first in the list. The other entry of this slice is rank 53, the
same battlefield with `OGN-235 Karma, Channeler`, played in
[the Library's buff lands before their removal resolves](2026-10-13-the-librarys-buff-lands-before-their-removal-resolves.md).
No earlier play uses the Library or Jhin.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind in its pair (103.1.b); here `OGN-265 Herald of the Arcane` (Mind/Order), idle in the walk |
| **The battlefield** | `UNL-211 Forgotten Library`, one of your three, **selected for this game** and controlled |
| **The payoff** | `UNL-089 Jhin, Meticulous Killer` (Mind, E4, M4), in hand |
| **The spell** | any spell that spends 4 Energy or more; here `UNL-073 Deadly Flourish` and `VEN-051 Iterative Design`, Mind, E4 each |

The card text the play turns on:

- Forgotten Library (Colorless battlefield): *"While you control this battlefield, when you play a
  spell, if you spent :rb_energy_4: or more, [Predict]. (Look at the top card of your Main Deck. You may
  recycle it.)"*
- Jhin, Meticulous Killer (Mind, E4, M4): *"[Vision] (When you play me, look at the top card of your
  Main Deck. You may recycle it.) If you've spent :rb_energy_4: or more to play a spell this turn, you
  may play me for :rb_rune_mind:."*
- Deadly Flourish (Mind, E4): *"Deal 3 to an enemy unit. When it dies this turn, play a Gold gear token
  exhausted."*
- Iterative Design (Mind, E4): *"Play a 3 :rb_might: Mech unit token. [Flow] :rb_energy_2::rb_rune_mind:
  (You may play this from your trash for its Flow cost. Then banish it.)"*
- Eager Apprentice (Mind, E3, M3): *"While I'm at a battlefield, the Energy costs for spells you play is
  reduced by :rb_energy_1:, to a minimum of :rb_energy_1:."*

## 2. The Library is one game in three, and Jhin is every game

**The Library has to be selected first.** 485.5: *"Setup: Each player randomly selects one (1) of their
three (3) Battlefields. The other two are removed and will not be used for this game."* So in a Duel
the Library is on the table in one game in three, and the other two thirds of the time the deck is a
Jhin deck with a 4-Energy spell package. In a best-of-three match you choose instead of rolling, but
486.5 spends the choice: *"After this game, if a player won, the Battlefields that were used are to be
removed and not selected again for this Match."* After a game somebody won, the Library is gone for the
rest of the match; only a drawn game keeps it, 486.5.a: *"If no player won a game, the battlefields
presented for that game may be reused in a subsequent game."* Tournament Rules 406.1.b makes that reuse
mandatory: *"If a game ends in a draw, players must use the same battlefields for the following
game."*

**Then it has to be taken.** 190.6.d: *"“You” in a battlefield’s abilities refers to the battlefield’s
Controller, as does the implied “you” in instructions that don’t specify a player like “draw 1.” If
the battlefield has no Controller, “you” refers to no one, and all such instructions are ignored."* The
Library is your battlefield A and starts with nobody; it is yours from the T2 Conquer, and stays yours
while a unit of yours stands there, 190.4.a: *"If a player controls Units at a Battlefield, outside of
Combat, they maintain Control of that Battlefield for as long as they have Units at that Battlefield."*

**Jhin needs none of that.** His condition is on the turn, not on the battlefield: *"If you've spent
:rb_energy_4: or more to play a spell this turn"*. The same Deadly Flourish arms him at base, with the
Library removed at setup, or with the opponent holding it. The entry's *"ONE SPELL PAYS BOTH"* happens
in the third of the games where the Library was selected, after A is taken. In the other two thirds
the same spell pays one.

## 3. Your order inside the turn

**The spell, then the Predict, then the spell's effect.** The Library's clause is part of its
trigger's condition, 383.2.a.1: *"Any additional conditional statement immediately after the Condition
must be true in order for the Condition to be fulfilled."* It is met when you play the spell, and 383.3
puts it on the chain: *"When a Condition is met, a Triggered Ability behaves like an Activated Ability
and is placed on the Chain."* It sits above the spell, and 340.1: *"The newest Finalized Chain Item
resolves."* So you Predict before Deadly Flourish deals its 3.

**Then Jhin, and only after the chain is empty.** He is a unit with no [Action] or [Reaction], and
331.1.a: *"Cards of all Categories, by default, cannot be played during a Closed State."* His cost is
replaced, not discounted, 356.1.a: *"If an ability or instruction allows you to play a card “for
[Cost]”, replace the card’s Base Costs with [Cost]."* The one Mind Power is a Mind rune recycled, and it
can be one of the four just exhausted for the spell, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*

**His Vision usually sees the card the Library already showed you.** 436.1: *"Predicting a card is the
act of looking at a single card from the top of the Main Deck and choosing whether or not to Recycle
it."* Deadly Flourish draws nothing and moves nothing in the Main Deck. If you kept the top card at the
Library's Predict, Jhin's Vision looks at the same card. The rules state that mechanism for two
Visions, 817.2.b: *"If the player does not recycle the top card and nothing else happens in between the
triggers resolving, each instance of Vision will see the same card."* The Library's Predict is not a
Vision, but nothing in between changes the top of the deck either. Two looks at two cards happen only
when the first one recycles, so the second Predict is worth something only on the turns the first
card was one you did not want.

## 4. Their order: B, bodies, and removal that reaches a battlefield

Fury/Chaos under `OGN-251 Loose Cannon`, whose *"At start of your Beginning Phase, draw 1 if you have
one or fewer cards in your hand"* stays idle while they hold three or more. They take B on their T2 and
build it. A unit at B cannot cross to A in one move. A Standard Move goes from base to a
battlefield, 144.4.a: *"Units may move from their Base to a Battlefield."* Or back, 144.4.b: *"Units may
move from a Battlefield to their Base."* Only Ganking moves a unit between battlefields (144.4.c.1). A
unit in their base can walk to A, but every body they play goes to B to hold it, and a body at B needs
two turns to reach A, by way of their base. While their bodies are committed to B, a Jhin at A is
answered by a spell. Theirs is `OGN-024 Void Seeker` (Fury, E3 + 1 Power): *"[Action]
(Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield. Draw 1."*

## 5. The turns, going first

Mind/Order against Fury/Chaos. Your rune deck is six Mind and six Order. Your opening four are Daring
Poro, Faithful Manufactor, Deadly Flourish and Jhin. The draws are Watchful Sentry on T1, Eager
Apprentice on T2, Iterative Design on T3 and Lecturing Yordle on T4. The Library is your battlefield A
this game.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base.                                 0
their T1        Shipyard Skulker (E3) to base, on the 485.7 extra rune.
                All three spent.
T2      4       Poro walks to A, Conquer: +1. You control the Library.    1
                Faithful Manufactor (E3) to A, its Recruit token there.
                One rune unspent. A is five Might.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to B. B is eight Might. All five
                spent.
T3      6       Hold A: +1. Deadly Flourish (E4) on Mystic Poro at B:      2
                four tapped. The Library's Predict resolves first; keep
                or recycle. Flourish resolves, the Poro dies, a Gold
                token comes in exhausted. Jhin for one Mind Power: a
                tapped Mind rune recycled. He goes to A, and his Vision
                sees the same top card if you kept it. Watchful Sentry
                (E2) to A. Five runes, all spent. A is ten Might.
their T3        Hold B. Void Seeker (E3 + 1 Fury) on Jhin at A: four
                damage, he dies in the Cleanup, they draw 1. A second
                Mystic Poro and a Traveling Merchant (E2 each) to B.
                All seven spent, one Fury recycled.
T4      7       Hold A: +1. FIRST Iterative Design (E4): the Library's     3
                Predict, a 3-Might Mech to A. THEN Eager Apprentice
                (E3) to base. All seven spent.
their T4        Hold B. Bodies to B.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After their T4 it is 3 to 3.

**What T3 bought.** Six runes paid for a 4-Energy spell, a 4-Energy body and a 2-Energy body: ten
Energy of printed cost for six runes and one rune recycled. Without Jhin's clause, the same turn is
Flourish and the Sentry with Jhin left in hand, or Jhin and the Sentry with their Mystic Poro alive.
The price is the rune: 161.2.b, *"When a Rune is Recycled it is returned to the Rune Deck, not the Main
Deck."*, so T4 has seven runes where eight would have stood, and 315.3.b gives back two a turn, *"1.
The Turn Player channels 2 runes from their Rune Deck."*
[2026-10-24, #456: the two a turn are not the recycled rune given back. They come from the top of the
Rune Deck (430.1) and the recycled rune went to the bottom (416.1, 416.1.b), so it is channelled again
on T7 at the earliest going first and T6 at the earliest going second with only the Channel Phase's two
a turn (161.2.a, 485.7); each two more recycled push it a turn later, and a card that channels more
(430.2) brings it back sooner. The count above, seven where eight would have stood, is already right,
and the play ends before the rune is back. The wording above is kept as history.]

**What the Library bought** is two looks, on T3 and T4, and on T3 the look Jhin's Vision repeated. It is
selection, and the entry says so: *"This smooths draws; it does not add cards."*

**What their T3 bought.** Void Seeker traded one card for Jhin and drew one back. Card for card they
are ahead; resource for resource you are, since Jhin cost one and the answer cost four.

**The order on T4 is the entry's discount warning, from inside Mind.** Eager Apprentice to A first,
and Iterative Design costs three: the Apprentice's *"reduced by :rb_energy_1:"* is not optional, so you
spend three and neither the Library nor a second Jhin hears it. Cast the spell first and put the
Apprentice at base, where her clause *"While I'm at a battlefield"* is off. At A she is a standing
discount on the very battlefield the Library needs bodies on, and every spell printed at E4 in the deck
spends three from then on. A spell printed at E5 still arms both: `OGN-085 Falling Comet` spends four
under her.

**The [Flow] half of Iterative Design arms nothing.** From the trash it is E2 + 1 Mind Power, and
829.1.c.1: *"The cost is an alternate cost that replaces the base cost of the spell to be paid during
finalization."* Two Energy spent; the Library is silent and Jhin costs four. `SFD-076 Production Surge`
does the same thing once a Mech is on the board: *"This costs :rb_energy_2: less if you control a
Mech."* Iterative Design's own token is that Mech. So the Mech package in Mind is half invisible to
this engine.

**How often this T3 happens.** Jhin and one of the six 4-Energy spells both have to be in the first
seven cards: 3 Jhin and 6 spells of 39 (Tournament Rules 601.1.b makes the Main Deck exactly 40, and
103.2.a.1 sets the Chosen Champion aside). That is **31.2%** of games without a mulligan. With the
Library as well, one game in three by 485.5, it is **10.4%**, and that still assumes A was taken on T2.

## 6. Breaks to

**Jhin breaks to `OGN-033 Shakedown`** (Fury, E2 + 1 Power: three resources): *"[Reaction] (Play any
time, even before spells and abilities resolve.) Choose an enemy unit. Deal 6 to it unless its
controller has you draw 2."* It names no location, so Jhin at base is in reach too, and as a Reaction
it can be cast on your own turn, in answer to his Vision. The choice is yours and both halves cost you:
Jhin dies, or they draw two. Void Seeker is the next one up, four resources, and only at a battlefield.

**Countering the spell does not break Jhin, and may break the Library.** The spend stands, 425.1.c:
*"Countering does not refund any costs paid to play a card, activate an ability, or trigger an
ability."* Jhin's clause is a condition on his cost, not a trigger, and it reads what you spent this
turn, so `SFD-136 Hard Bargain` or `OGN-045 Defy` on Deadly Flourish still leaves him at one Mind
Power. The Library is a play trigger, and 425.1.b reaches play triggers: *"A card that is Countered is
not considered to have been played for abilities that trigger on cards being played."* The catalogue
reads that against the Library's kind of payoff: verified entries
(`not-so-fast-allay-deflect-tax-denial`, `mystic-reversal-defy-counter-tiers`) say a countered spell's
play triggers fail. Read that way, a counter cast while the Library's trigger is
still on the chain takes the Predict as well. The counter has to come before the Predict resolves,
because the trigger sits above the spell and resolves first (340.1); a counter cast after it is too late
to take the look. Whether 425.1.b reaches a trigger already on the chain is under Not verified.

**The Library breaks to losing A,** which 190.4.c does whenever your last unit there is gone: *"If a
player has no Units at a Battlefield and the turn is in an Open state, they lose Control of that
Battlefield in the following cleanup unless there is a Combat or Showdown ongoing there."* Taken by
them, 190.6.d makes the Predicts theirs.

**And it breaks to your own discount.** An Eager Apprentice at A switches every E4 spell off, both
halves at once, for as long as she stands there.

## 7. Verdict

**Right about *spent*, and the payoff is Jhin, not the Library.** One 4-Energy spell does pay both, and
a discount does switch both off. The play adds three things the entry does not state. The Library is
in play in one Duel game in three (485.5) and, in a best-of-three, is removed after a game somebody won
(486.5), while
Jhin's half works in every game, with or without it. The Library's Predict resolves before the spell,
and Jhin's Vision looks at the same card unless the first one was recycled, so the two Predicts are two
cards only when the first was a card you did not want. And the discount the entry warns against is
printed in Mind: `OGN-084 Eager Apprentice` at A, and Iterative Design's own [Flow].

## 8. Not verified

I did not deal the channel order. Jhin's Mind Power needs one Mind rune among your first six; that fails
only when all six are Order, 1 of the 924 deals, 0.1%. Their Void Seeker on their T3 needs one Fury
among their first seven runes, which six Chaos cannot fill, so it never fails. A counter on the spell
has two readings of 425.1.b. On the first, a trigger already on the chain is not touched and the
Library's Predict resolves. On the second, which the catalogue uses, the countered spell was never
played and the Predict goes with it. Jhin's discount survives both. I did not walk
`SFD-007 Gem Jammer` giving a unit at B [Ganking] to contest A, a Shakedown held on their T2 for your
T3, the Gold token's Power on T4, the mulligan, or 2v2.

## Leads

- The entry's notables count *"TWO PREDICTS PER JHIN"* and cite 817.2 and 817.2.a, which govern several
  instances of [Vision]. The Library's [Predict] is not a Vision instance. If its card is kept and the
  spell moves nothing in the Main Deck, Jhin's Vision looks at the same card (436.1; 817.2.b states the
  mechanism for two Visions). The second look is a second card only when the first recycles.
- The entry's last notable warns against *"a cost-reduction package"* without naming one. Mind prints
  one: `OGN-084 Eager Apprentice` at a battlefield, which is where the Library wants bodies. Iterative
  Design's [Flow] (829.1.c.1) and `SFD-076 Production Surge` with a Mech in play are two more spends of
  two.
- The prerequisites do not state that the Library is in play in one Duel game in three (485.5), or
  that a best-of-three removes it after a game somebody won (486.5; a drawn game keeps it, 486.5.a).
  Jhin's half needs no battlefield at all.
