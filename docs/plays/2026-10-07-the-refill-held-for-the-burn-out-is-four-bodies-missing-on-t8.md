# Play — the refill held for the Burn Out is four bodies missing on T8

Issue #309 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the setup nobody prices](2026-09-13-the-setup-nobody-prices.md) first: it times how fast
`VEN-165 Shadow Temple` empties a deck, and this play uses that timetable.

**Subject: `progress-day-shadow-temple-deliberate-burn-out`**, the Mind ENGINE in which Shadow Temple
burns three cards a turn, `OGN-114 Progress Day` is held until the Main Deck is empty, and its draw then
runs into a Burn Out: the trash is recycled into the deck, the opponent gains a point, and the draw is
completed from the rebuilt deck. The entry is right about the rule. 431.2 orders the steps, and a
Burn Out is a Replacement Effect inside one resolution. Walked as a game, the moment the entry waits
for never comes. Going first, the deck is at one card on T10 at the earliest, and the race of Holds is
decided by T9. Held for that moment, Progress Day is a draw-four that sits in hand while the deck runs
out of bodies. On their T8 the opponent takes the Temple by one Might. Cast as a plain draw-four on T6,
the same card is four more bodies at the Temple, and the attack never comes. What breaks the designed
moment is `UNL-131 Abandon`, two runes. Countered, Progress Day draws nothing, and the Temple burns you
out at the next Hold anyway.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `4015c20`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 63 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 37 (a *no window* entry), second in the list. The other entry of this slice is rank 36,
played in
[Sona holds the wall up, and the board stops growing](2026-10-07-sona-holds-the-wall-up-and-the-board-stops-growing.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Mind among its domains (103.1.b); here `VEN-145 Curator of the Sands` (Calm/Mind), idle in the walk because nothing in the list costs seven Energy and Progress Day is a spell |
| **Battlefield** | Shadow Temple as the battlefield 485.5 draws for you, and Control of it |
| **First** | a Main Deck of three cards or fewer, on your Main Phase |
| **Then** | `OGN-114 Progress Day` (Mind, E6 + 1 Power) |

The card text the play turns on:

- Shadow Temple: *"When you hold here, [Burn 3]. (Put the top 3 cards of your Main Deck into your
  trash.)"*
- Progress Day: *"Draw 4."*
- Maddened Marauder (theirs, Chaos, E5, M4): *"[Tank] (I must be assigned combat damage first.) When you
  play me, move a unit from a battlefield to its base."*
- Gloomist (their legend, Calm/Chaos): *"When you or an ally hold, you may exhaust me to draw 1."*

## 2. The Burn Out the entry is built on

413.4 opens the case: *"If a player attempts to draw more cards than are available in their Main Deck,
they do the following:"* 413.4.a *"Draw as many as possible."*, 413.4.b *"Perform a Burn Out."*, 413.4.c
*"Draw the remaining cards needed to complete the Draw action."* The Burn Out is ordered in 431.2:
431.2.b *"Recycles their trash into their Main Deck."*, 431.2.c *"Chooses an opponent to gain 1
point."*, 431.2.d *"Completes the remainder of the action that caused them to burn out."* So Progress
Day on a deck of one draws that card, rebuilds the deck from the trash, hands over one point, and draws
three from the rebuilt deck. The entry has all of that right.

The Temple causes a Burn Out on its own. 431.1.b: *"If a player must put one or more cards from their
Main Deck in any other zone, such as the Trash, in excess of the number of cards in their deck they
will do so as much as possible, perform this action, and then complete the remaining number required by
the instruction."* The Temple has no *may*, so a Hold on a deck of fewer than three cards is a Burn Out
too. And 431.4.a: *"Players may only burn out when Game Effects direct them to do so."* The point is
paid either way. Progress Day only decides which effect pays it.

**The clock.** Tournament Rules 601.1.b: *"In competitions, a player’s Main Deck must be exactly 40
cards."* The Chosen Champion is set aside, and rule 116 reads *"Players each draw 4."*, which leaves 35.
Going first, you Conquer the Temple on T2 and Hold it from T3, so the deck loses one card a turn to the
Draw Phase and three to the Temple: 34, 33, then 29, 25, 21, 17, 13, 9 and 5 at the end of T9. On T10
the Temple burns three and the Draw Phase takes one more, so **T10 is the first Main Phase with three
cards or fewer in the deck, and it has one**. Progress Day then works as the entry says.

**And T9 has already decided the game.** 469.2: *"Hold: A player maintains Control of a Battlefield they
did not yet Score this turn during their Beginning Phase."* A Conquer on T2 and a Hold on each of T3
to T9 is eight points on T9. The deck that empties itself on this battlefield is the deck that wins
on it first.

## 3. Their order: hold B, move the Temple's garrison home, and attack it once

Calm/Chaos with `UNL-193 Gloomist`, holding B. They draw an extra card on every Hold. Going second they
reach eight on their T9, a turn after you, so they have to take the Temple. Their tool for that is
Maddened Marauder: every copy they play moves your biggest body at A to your base, where it has to walk
back. On their T8 they play the third Marauder and attack with every ready unit at B.

## 4. The turns, going first

Calm/Mind against Calm/Chaos. Your rune deck is six Calm and six Mind. The column `deck` is your Main
Deck at the end of the turn.

```
turn    runes   deck  your turn (the entry's line: hold Progress Day)          points
T1      2       34    Watchful Sentry (E2) to base                              0
their T1                Mystic Poro to base, with the 485.7 extra rune.
T2      4       33    Sentry walks to A, Conquer: +1. Stalwart Poro (E2) to A.  1
their T2                Mystic Poro walks to B, Conquer. Sunlit Guardian (E3)
                        to B.
T3      6       29    Hold A: +1, Burn 3. Sunlit Guardian (E3) to A.            2
their T3                Hold B, Gloomist draws. Shipyard Skulker (E3) to B.
T4      8       25    Hold A: +1. Royal Entourage (E3 + 1 Calm), Ol' Poro       3
                      (E2) and a second Sunlit Guardian (E3) to A. Seven runes.
their T4                Hold B, draw. Maddened Marauder (E5) to B: Royal
                        Entourage goes to your base.
T5      9       21    Hold A: +1. Entourage walks back. A second Entourage      4
                      (E3 + 1 Calm) and a second Stalwart Poro (E2) to A.
                      Four idle. Progress Day stays in hand.
their T5                Hold B, draw. Ember Monk (E4) and a Skulker (E3) to B.
T6      10      17    Hold A: +1. A second Ol' Poro (E2) to A. Eight idle.      5
their T6                Hold B, draw. A second Marauder: an Ol' Poro goes home.
                        A second Sunlit Guardian (E3) to B.
T7      12      13    Hold A: +1. Ol' Poro walks back. A second Sentry (E2) to  6
                      A. Ten idle.
their T7                Hold B, draw. A second Ember Monk (E4) and a third
                        Skulker (E3) to B.
T8      12       9    Hold A: +1. A third Sunlit Guardian (E3) to A. Nine idle. 7
their T8                Hold B, draw: 7. A third Marauder: an Ol' Poro goes
                        home. Every ready unit at B attacks A, thirty-three
                        against thirty-two. They conquer A.
```

The hand ran out on T5. From T6 you drew one card a turn and played it, with eight, ten and nine
runes idle and a draw-four in hand that the entry tells you to keep.

**The fight on their T8.** 465.2.a sums the attackers: Mystic Poro 2, two Sunlit Guardians 3, three
Skulkers 3, two Ember Monks 4 and two Marauders 4, thirty-three. 465.2.b sums the defenders: two
Sentries 1, two Stalwart Poros and three Sunlit Guardians with their [Shield], two Royal Entourages 4,
one Ol' Poro 4, thirty-two. 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* Thirty-three kills every defender. Your
thirty-two must go to their [Tank] units first (two Guardians and two Marauders, fourteen), and 465.2.c.3
reads *"Units must have lethal damage assigned to them in full before damage is assigned to a different
Unit."* The eighteen left can kill seventeen of the nineteen Might remaining, so one of theirs
survives. 466.3.a: *"A Player has won a combat if they received either the attacker or defender
designation and are the only Player that has units remaining at this battlefield during this step."*

They conquer A at seven points. 471.1.b.1: *"If the player has Scored every Battlefield this turn, that
player Gains the Final Point."* They held B this turn and are scoring A, so they gain the eighth point,
and 194.2 ends it at the cleanup, eight to seven.

**The same game with Progress Day cast on T6.** On T6 there are ten runes and Ol' Poro is the only card
in hand. Progress Day costs six tapped and one Mind recycled, and the Ol' Poro two more. It draws the
second Sentry and the third Guardian one and two turns early, plus a third Royal Entourage and
`OGN-119 Ahri, Inquisitive`. The second Sentry is played on T6. On T7, with eleven runes, the Guardian,
the Entourage and Ahri go to A, and a third Stalwart Poro and a third Ol' Poro on T8. On their T8, after
the third Marauder, A defends at forty-six, and Ahri reads *"When I attack or defend, give an enemy unit
here -2 :rb_might: this turn, to a minimum of 1 :rb_might:."* Thirty-one into forty-six, so they do not
attack. On T9 you Hold A for eight, and they have seven.

The deck: 13 at the end of T6, then 9, 5, and 1 at the end of T9. No Burn Out happened in either game.

## 5. When the Burn Out happens

Cast on T6, Progress Day leaves one card at the end of T9, and the Temple's T10 Hold burns that card,
burns you out, and burns two more. Held for the entry's moment, it is cast on T10's Main Phase with one
card left. **The Burn Out lands on T10 either way, for the same one point.** Progress Day takes four
cards out of the deck whenever it is cast, so the turn of the Burn Out depends on how many cards have
left the deck, not on when the draw was cast. Holding it changes only when the four cards arrive. It can
bring a Burn Out forward and never push one back.

For the entry's moment to arrive before you have won on Temple points, you need T + 3H ≥ 32 by your
Main Phase of turn T (35 cards, one drawn a turn, three per Hold, and at most three left for Progress
Day), with at most six Holds, because one Conquer and seven Holds are already eight points. Six Holds
burn eighteen. So the moment is **T14 at the earliest** on the Temple and the Draw Phase alone, in a
game where you failed to Hold the Temple on at least six of the twelve turns from T3 to T14.

## 6. Breaks to

**The designed moment breaks to `UNL-131 Abandon`** (Chaos, E2: two runes): *"[Reaction] (Play any
time, even before spells and abilities resolve.) Counter a spell. Return it to its owner's hand instead
of putting it in their trash. [Predict]. (Look at the top card of your Main Deck. You may recycle
it.)"* Progress Day is countered with a deck of three cards or fewer: you draw nothing, you do not burn
out, and the card goes back to your hand. 425.1.c: *"Countering does not refund any costs paid to play
a card, activate an ability, or trigger an ability."* The seven runes are gone. At your next Beginning
Phase the Temple Holds, 431.1.b burns you out, and the opponent gains the point with no four cards
drawn. `OGN-045 Defy` cannot do this, because it counters a spell that *"costs no more than
:rb_energy_4:"* and Progress Day costs six. `OGN-064 Wind Wall` can, for five runes. Abandon is in the
opponent's identity here, and two of their idle runes on any of T3 to T8 cover it.

An early Progress Day is just as easy to counter, but countering it then only costs you the runes, while the
designed moment also gives the opponent the Burn Out point.

## 7. Verdict

**Right about the rule, and the moment it waits for comes after the game is decided.** The Burn Out is
ordered as the entry says. The refill lands before the rest of the draw, and nobody can answer it
between the steps. But going first on the Temple, the deck reaches one card on T10, and eight points
from Holding the same battlefield arrive on T9. Holding Progress Day for that moment makes it a dead
card for five turns in a deck whose hand runs out by T5, and in this game that was the gap between
thirty-two and forty-six at A. Cast on T6, the same card wins the game, and the Burn Out still lands on
T10. A two-rune counter on the designed cast costs you the seven runes, the four cards and the point.

## 8. Not verified

I read 471.1.b.1's *"Scored every Battlefield this turn"* as including the Conquer being scored when
the Hold of the other battlefield is already in. If that reading is wrong, they draw a card instead of
the eighth point. A is still theirs, so the Temple then burns *their* deck (190.6.d), and you have
nothing to Hold on T9. That game goes on, and I did not walk it. I did not walk the T14 game of §5, a
list with more draw than the Temple, or a game where 485.5 does not pick the Temple. The thirty-three
against thirty-two is decided by one Might, which depends on the cards dealt in this walk. The
arithmetic of §5 does not depend on them.

## Leads

- The entry says holding Progress Day *"means the Burn Out happens on YOUR terms, with the trash at its
  fattest and four cards to show for it."* Progress Day removes four cards whenever it is cast. Cast on
  T6, the Temple's own Burn Out lands on T10's Beginning Phase. Held, it lands on T10's Main Phase. It
  is the same turn and the same point, and holding the card only delays the four cards.
- The designed moment is T10 at the earliest going first, and Holding the Temple from T3 is eight
  points on T9. Before you have won on Temple points, the deliberate Burn Out needs T + 3H ≥ 32 with
  at most six Holds, which is T14.
- The entry's step 3, *"Hold Progress Day in hand and do not cast it"*, leaves runes idle in a list that
  runs out of cards. The walk idles eight, ten and nine runes on T6 to T8.
- The entry names no answer. `UNL-131 Abandon` (two runes) counters the designed cast. It returns
  Progress Day to hand, and the Temple burns you out at the next Hold with nothing drawn.
