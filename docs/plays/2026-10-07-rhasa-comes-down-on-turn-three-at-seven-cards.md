# Play — Rhasa comes down on turn three, at seven cards

Issue #313 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `rhasa-shadowblade-trash-discount`**, the Fury/Chaos ENGINE in which the trash prices three
bodies. `OGN-195 Rhasa the Sunderer` costs one Energy less for each card in your trash.
`VEN-096 Shadowblade Lurker` costs two less for each Lurker there. `VEN-013 Shadow Assassin` enters
ready once a copy is there. `VEN-108 Forgotten Relic` burns one card a turn into it. The entry is right
about the rules. 356.6 floors the Energy at zero and never touches the Power. 431.2.b resets the whole
pile on the first Burn Out. Walked as a game, the entry's target number is the wrong one. It prices
Rhasa at ten cards, *"a mid-game price, not a turn-three one"*. The discount pays long before ten. In
the walk the trash held seven cards on T3, and Rhasa came down that turn as a 6-Might body for three
Energy and one Power. The card that gets there is not in the entry: `VEN-144 Death Mark`, a Zed
Signature card, puts four cards in the trash for three runes on T2. What answers the body is
`OGN-213 Hidden Blade`, one rune hidden at the battlefield Rhasa has to attack. Nothing in the pool
answers the price.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `7e49661`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 59 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 41 (a hit on *first*), first in the list. The other entry of this slice is rank 43,
played in
[the Deathcrown comes on turn five, and Charm makes the attack](2026-10-07-the-deathcrown-comes-on-turn-five-and-charm-makes-the-attack.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `VEN-143 Master of Shadows` (Fury/Chaos). It is one of the five Fury/Chaos legends the entry names, and the only one that can run Death Mark |
| **Champion** | `VEN-023 Zed, From the Shadows` (Fury, E4 + 1 Power, M4), the Chosen Champion the legend's Zed tag allows |
| **The bodies** | 3x Rhasa, 3x Shadowblade Lurker, 3x Shadow Assassin, as the entry declares |
| **The fillers** | 1x Forgotten Relic, 3x `OGN-008 Get Excited!`, 3x `OGN-003 Chemtech Enforcer`, and 3x Death Mark, which the entry does not list |

The card text the play turns on:

- Rhasa the Sunderer (Chaos, E10 + 1 Power, M6): *"I cost :rb_energy_1: less for each card in your
  trash."*
- Shadowblade Lurker (Chaos, E5, M5): *"I cost :rb_energy_2: less for each card with my name in your
  trash."*
- Shadow Assassin (Fury, E5, M5): *"I enter ready if you have a card with my name in your trash."*
- Forgotten Relic (Chaos gear, E5): *"When you play this or at the start of your Beginning Phase,
  [Burn 1]. When you burn a unit this way, do this: Give a friendly unit +:rb_might: equal to the
  burned card's Might this turn."*
- Death Mark (Fury/Chaos, E2 + 1 Power): *"[Burn 3]. (Put the top 3 cards of your Main Deck into your
  trash.) Play a 0 :rb_might: Shadow Clone unit token. (It has "When I attack, you may banish a unit
  from your trash. If you do, give me [Assault 4] this turn.")"*
- Get Excited! (Fury, E2 + 1 Power): *"[Action] (Play on your turn or in showdowns.) Discard 1. Deal its
  Energy cost as damage to a unit at a battlefield. (Ignore its Power cost.)"*
- Chemtech Enforcer (Fury, E2, M2): *"[Assault 2] (+2 :rb_might: while I'm an attacker.) When you play
  me, discard 1."*
- Hidden Blade (theirs, Order, E2 + 1 Power): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with
  later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield.
  Its controller draws 2."*

## 2. Your order: fill, count, play

**The legend comes first, because the best filler names it.** Death Mark is marked Signature and tagged
Zed in `data/cards.json`. 103.2.d.2: *"All of the Signature cards must have the Champion tag that
corresponds to the Champion Legend of the deck."* Master of Shadows is the pool's only Zed legend, and
it is Fury/Chaos, so this identity costs nothing. 103.2.d.1 caps the count: *"Regardless of name, a deck
may only contain a sum total of 3 Signature cards."* The three Death Marks are the whole allowance.

**Every card the line spends lands in the trash.** 157: *"A spell creates a game effect according to its
instructions and is then placed in the Trash of the player who owns it."* 422.1: *"Discarding a card is
moving it from a player's hand directly into their trash without activating or executing its normal
rules text."* So Death Mark is four cards for one, three burned and itself. Get Excited! is two, the
spell and the card it discards. Chemtech Enforcer is one, the card it discards. And 422.1.a lets you
choose what goes: *"The player who is performing the action chooses which cards to send to their Trash,
and may use Private Information to do so."* Discard the Lurkers first, because each one cuts the next
Lurker's cost by two. Get Excited! then turns a discarded Lurker into five damage, because 206 reads the
printed cost: *"Effects that need to determine a card’s cost for any purpose always use its printed or
copied cost, even if that cost is increased, decreased, or ignored as the card is played."*

**The price is counted when you play, and ten is only the floor.** 356.6: *"Energy and Power costs can't
be reduced below 0."* Ten cards make Rhasa free in Energy. Seven make it three Energy, and a 6-Might body
for three Energy and one Power is already the best rate in the deck. The entry treats ten as the
threshold. It is where the discount stops getting better.

**The Burn Out is the wall, and it is far.** 431.1.b: *"If a player must put one or more cards from their
Main Deck in any other zone, such as the Trash, in excess of the number of cards in their deck they will
do so as much as possible, perform this action, and then complete the remaining number required by the
instruction."* Then 431.2.b: *"Recycles their trash into their Main Deck."* By the end of T5 the walk has
drawn nine cards and burned four of the 39, so 26 remain. Death Mark and the Relic do not bring the wall
into the first ten turns.

## 3. Their order: B, then A

Calm/Order. Sunlit Guardian takes B on their T2, and Stalwart Poro joins it. On their T3 they hide
Hidden Blade at B for one rune. Wielder of Water (*"While I'm attacking or defending alone, I have +2
:rb_might:"*) walks into A alone and kills your Enforcer there. They are not idle on any turn. They
cannot reach B's Hidden Blade into A: 811.1.d.2, *"If a hidden spell or a play effect of a hidden
permanent chooses any targets, those targets must be chosen from among options at that battlefield"*.

## 4. The turns, going first

Fury/Chaos against Calm/Order. Your rune deck is six Fury and six Chaos, channelled Fury and Chaos each
turn. Your opening four and first draws are Chemtech Enforcer, two Shadowblade Lurkers, Death Mark,
Get Excited!, then Rhasa on T3, Shadow Assassin on T4 and Forgotten Relic on T5.

```
turn    runes   your turn                                          trash   points
T1      2       Chemtech Enforcer (E2) to base. Discard a Lurker.  1       0
their T1        Sunlit Guardian (E3) to base.
T2      4       Enforcer walks to A, Conquer: +1. Death Mark (E2   5       1
                + 1 Power: two tapped, one recycled). Burn 3:
                Shadow Assassin and two others. The Shadow Clone
                token goes to base. One rune idle.
their T2        Guardian walks to B, Conquer. Stalwart Poro (E2)
                to B, Wielder of Water (E3) to base.
T3      5       Hold A: +1. Get Excited! (E2 + 1 Power),           7       2
                discarding the second Lurker: 5 to the Guardian
                at B, which dies. Rhasa now costs E3 + 1 Power:
                three tapped, one recycled, to base. Three runes
                left on the board.
their T3        Hold B. Hidden Blade hidden at B (one rune
                recycled). Wielder walks into A alone at four: the
                Enforcer dies, Conquer. A second Sunlit Guardian
                (E3) to B, a two-drop to base.                     8
T4      5       Rhasa walks into A: six against the Wielder's      8       3
                four. The Wielder dies, Rhasa lives, Conquer: +1.
                Shadow Assassin (E5) enters ready and stays at
                base: B defends at seven, with a Hidden Blade.
their T4        Hold B. Nine runes of bodies to base.
T5      7       Hold A: +1. Forgotten Relic (E5): Burn 1. The      9       4
                third Lurker costs E1 for five Might, to A. One
                rune idle.
T6      9       Beginning Phase: the Relic burns 1.                10
```

Their points: 1 on T2, 3 on T3, 4 on T4. After your T5 it is 4 to 4, and Rhasa came down on T3.

The T3 order is the play. Get Excited! goes first, because it is two cards for the trash and the Lurker
it discards is five damage. Then the count is seven and Rhasa costs three Energy. Played the other way
round, Rhasa costs five Energy and one Power against five cards: six runes, where you have five.

**What the line bought.** Without Rhasa on T3, the T4 move into A is Shadow Assassin alone, five against
the Wielder's four. It still wins A, so the swing is not a point. It is the board. Rhasa took A and
lived. The Assassin stayed home, ready, and the third Lurker cost one rune on T5. Three bodies of five
and six Might for ten runes across three turns, where the printed costs are twenty Energy.

**How often this T3 happens.** Rhasa in the first seven cards: **45.7%** (three in 39). Death Mark by
T2, in the first six: **40.3%**. The walk also needed a Lurker to discard on T1 and another for Get
Excited! on T3. Without Death Mark the T3 trash is three, the Enforcer's discard and Get Excited!'s two.
Rhasa then costs seven Energy and one Power, and comes down on T4 at the earliest, for all of that turn's runes.

## 5. Breaks to

**The body breaks to `OGN-213 Hidden Blade`**, hidden at the battlefield Rhasa has to take. It costs
[A], one rune recycled on their turn, and zero Energy when it flips. 811.1.b: *"you may pay [A] to hide
this facedown at a battlefield you control that doesn't already have a facedown card hidden there for as
long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you may play
this, ignoring its base cost."* When Rhasa walks into B, it kills her before combat damage, and B holds.
It is a poor trade for them on cards. *"Its controller draws 2"* gives you two, and Rhasa in the trash
makes the next Rhasa one Energy cheaper. It works only where it is hidden (811.1.d.2), so Rhasa going
into an open battlefield is safe from it.

**Nothing breaks the price.** The pool has one card that takes from an opponent's trash:
`VEN-101 Gust Monk`, which banishes one card for an extra Energy, so three Energy to make Rhasa one Energy
dearer. The rest of the trash answers are yours to suffer. 431.2.b resets the pile on a Burn Out, and
the Shadow Clone's own attack banishes a unit from your trash, which is the same count Rhasa reads. The
walk never attacked with the token.

## 6. Verdict

**Right, and early, not mid-game.** The rules reading is right. 356.6 floors the Energy, 206 makes a
discarded Rhasa or Lurker a 10 or a 5 for Get Excited!, and 431.2.b is the wall. The play moves the
price. The entry says ten cards and a mid-game price. In the walk, seven cards on T3 made Rhasa a 6-Might
body for four runes, and the card that got there is Death Mark, which the entry never names. The cost is
the legend: Death Mark forces Master of Shadows. The answer is a one-rune Hidden Blade at the
battlefield Rhasa attacks, and it gives you two cards for her.

## 7. Not verified

I did not deal the channel order. Rhasa's Power and Death Mark's are printed P1 without a domain in the
corpus. If Rhasa's is Chaos, the T3 line needs one Chaos rune among the six channelled from six Fury and
six Chaos, which fails once in 924 deals. I did not walk a T3 without Death Mark or without Rhasa, the
Clone token attacking, the legend's loot, Death Mark's [Flow], the Relic's +Might clause, T6 on, the
mulligan, or 2v2. The opponent's T4 is summarised. They may instead take Rhasa on at A with two bodies,
which the walk does not price.

## Leads

- The entry says *"Ten is reachable, and it is not fast: the entry claims a mid-game price, not a
  turn-three one."* In the walk the trash held seven on T3, and Rhasa came down that turn for three
  Energy and one Power. 356.6 makes ten the floor of the discount, not the point where it starts.
- `VEN-144 Death Mark` (Fury/Chaos, E2 + 1 Power) puts four cards in the trash for one, and it is not in
  the entry. Its *"WHAT FILLS THE TRASH, MEASURED"* notable names spells, the Relic, combat deaths and
  discard outlets. Death Mark is Signature tagged Zed, so it forces `VEN-143 Master of Shadows`. That is
  one of the five legends the entry already lists.
- The entry's note on Forgotten Relic quotes only its first sentence. The card also prints *"When you
  burn a unit this way, do this: Give a friendly unit +:rb_might: equal to the burned card's Might this
  turn."*
- Death Mark's Shadow Clone token, and `VEN-023 Zed, From the Shadows`'s, banish a unit from your trash
  to attack at [Assault 4]. Each such banish makes Rhasa one Energy dearer. Master of Shadows empowers on
  any banish of a card you own, so the legend is fed by the same act.
- The entry names no answer. `OGN-213 Hidden Blade` (one rune hidden, zero to play) kills Rhasa at the
  battlefield it guards, and gives her controller two cards.
