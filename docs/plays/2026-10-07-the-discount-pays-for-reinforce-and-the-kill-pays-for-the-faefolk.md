# Play — the discount pays for Reinforce and the kill pays for the Faefolk

Issue #305 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `reinforce-tasty-faefolk-cheat-into-play`**, the Calm ENGINE in which `OGN-062 Reinforce`
looks at the top five cards and plays `OGN-075 Tasty Faefolk` from among them for 5 Energy less: a
6-Might body with [Accelerate], whose [Deathknell] channels two runes and draws a card. The entry is right
that the discount is Energy-only and that the dig cannot burn you out. Walked as a game, the five Energy
Reinforce takes off is the five it costs. T4 is eight runes and one Calm Power either way, the same as a
Faefolk cast from hand, so Reinforce buys a dig, not a discount. Once the Faefolk is down, killing it
pays you. What breaks the line is a bounce.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `a4767cf`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 67 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 33 (a hit on *first*), second in the list. The other entry of this slice is rank 32,
played in [Irelia lands with Discipline open and loses to a stun](2026-10-07-irelia-lands-with-discipline-open-and-loses-to-a-stun.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Calm legend (103.1.b); here `VEN-147 Eye of Twilight` (Calm/Order) |
| **First** | a battlefield of your own, taken by `OGN-052 Stalwart Poro` (Calm, E2, M2) |
| **Then** | eight runes, one of them Calm: T4 at the earliest |
| **Cast** | `OGN-062 Reinforce` (Calm, E5), with `OGN-075 Tasty Faefolk` (Calm, E7, M6) in the top five |

The card text the play turns on:

- Reinforce: *"Look at the top 5 cards of your Main Deck. You may banish a unit from among them, then play
  it, reducing its cost by :rb_energy_5:. Recycle the remaining cards."*
- Tasty Faefolk: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_calm: as an additional cost to have me
  enter ready.) [Deathknell] — Channel 2 runes exhausted and draw 1. (When I die, get the effect.)"*
- Hidden Blade (theirs, Order, E2 + 1 Power): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with
  later for :rb_energy_0:.) [Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield. Its
  controller draws 2."*

## 2. Your order: Reinforce on T4, the Faefolk to base, then in

Reinforce cannot come on T3: five for the spell and two for the Faefolk is seven, and you have six runes.
On T4 the whole line is eight: 5 for Reinforce, 7 − 5 = 2 for the Faefolk, and [Accelerate], 805.1.a:
*"As you play me, you may pay [1][C] as an additional cost. If you do, I enter ready."* That is eight
runes exhausted and one Calm rune recycled.

The Faefolk goes to your base. Reinforce names no place, so 355.2.a applies: *"By default, Valid locations
include the controller’s Base or a Battlefield the controller controls."* Played to your battlefield A it
could not reach B, because units move only between a base and a battlefield, 144.4.a: *"Units may move
from their Base to a Battlefield."* From the base it walks to B the turn it arrives, because Accelerate
made it enter ready.

The entry leaves out one sum. Reinforce costs five Energy and takes five off: 5 + 2 is 7, the Faefolk's
printed Energy cost. With Accelerate, both ways cost eight Energy and one Calm Power, so a Faefolk drawn
by T4 lands the same turn for the same runes. What Reinforce adds is the dig. Going first, T4 has seen
4 + 4 cards of 39 (601.1.b makes the Main Deck exactly 40, and 103.2.a.1 sets the Chosen Champion
aside), so 31 are left. With all three Faefolks among them, one is in the top five 42.2% of the time;
with two (one already in hand), 30.1%.

There is also a cost. Reinforce is a spell, so it waits on the chain. A unit cast from hand does not wait,
337.2: *"If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds
resources, it resolves immediately"*. Only the Reinforce route gives a counter something to hit.

## 3. Their order: Hidden Blade waiting at B

Order/Chaos control, with `VEN-155 Heart of the Tempest`. B is held by `OGN-210 Daring Poro` (Order, E2,
M2, [Assault], which adds +1 only when it attacks) and `OGN-175 Shipyard Skulker` (Chaos, E3, M3): five
on defence, under the Faefolk's six. On their T3 they hide Hidden Blade at B for one Power, 811.1.b:
*"Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."* Its
target has to be at B, 811.1.d.2: *"If a hidden spell or a play effect of a hidden permanent chooses any
targets, those targets must be chosen from among options at that battlefield"*. B is where the Faefolk
attacks. Played from face down, it also empowers their legend, which nothing here uses.

## 4. The turns, going first

Calm/Order against Order/Chaos.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base                                0
their T1        Daring Poro to base, with the 485.7 extra rune.
T2      4       Poro walks to A, Conquer: +1. Mutated Mouser (E2) to A.   1
their T2        Daring Poro walks to B, Conquer. Shipyard Skulker (E3)
                to B.
T3      6       Hold A: +1. Wizened Elder (E4) to A. Reinforce waits:     2
                5 + 2 is seven.
their T3        Hold B. Hidden Blade hidden at B (one rune recycled).
                Vanguard Sergeant (E4) to their base.
T4      8       Hold A: +1. Reinforce (E5): a Faefolk in the top five.    3
                Banish it, play it for 2, plus Accelerate (E1 + 1 Calm
                Power): eight runes exhausted, one Calm recycled, seven
                on the board. It enters ready at base and walks to B:
                combat, 6 against Daring Poro (2) and the Skulker (3).
                You have no runes, so you pass. Their Focus: Hidden
                Blade from face down, E0. The Faefolk dies, you draw 2.
                Deathknell: channel 2 runes exhausted, draw 1. Nine
                runes. No attacker is left, so no damage, and B stays
                theirs.
their T4        Hold B. A defends at ten (Poro 3, Mouser 3, Elder 4), so
                the Sergeant stays home.
T5      11      Hold A: +1. Three more cards in hand, eleven runes.       4
```

Their points: 1 on T2, 2 on T3, 3 on T4. Without an answer they lose the fight at B: the Faefolk's 6
kills both defenders, and their 5 do not kill it. So they use the cheapest kill they have.

The kill paid you. You spent Reinforce and the Faefolk, two cards, and got three back: Hidden Blade's two
and the Deathknell's one. You also gained two runes, seven to nine, so T5 starts with eleven. They spent
Hidden Blade and the rune that hid it, and kept B. The Deathknell fires because the Faefolk was killed
and went to the trash, 808.1.d: *"The Trigger for this and similar effects that trigger on their source’s
death is the Permanent being Killed and sent to the Trash."* The answer to the Faefolk is one that does
not kill it.

## 5. Breaks to

**The line breaks to `OGN-172 Rebuke`** (Chaos, E2 + 2 Power: two runes, both recycled), cast with their
Focus where the walk has Hidden Blade: *"[Action] (Play on your turn or in showdowns.) Return a unit at a
battlefield to its owner's hand."* Returning it to hand is not a kill, so 808.1.d gives no Deathknell: no
runes and no card. In hand the Faefolk costs its printed 7 again, so T4's eight runes bought only a card in
hand, and Reinforce is in the trash. The reply is `SFD-045 Not So Fast` (Calm, E2 + 1 Power, [Reaction]):
*"Counter an enemy spell or ability that chooses a friendly unit or gear."* On T4 every rune is spent.
With Reinforce held to T5, the line plus Not So Fast is ten Energy and two Calm Power: exactly ten
runes, two of them Calm.

`SFD-136 Hard Bargain` (Chaos, E2, no Power) is cheaper. It is cast in response to Reinforce, when three
runes remain and the Faefolk with Accelerate needs all three: *"[Reaction] (Play any time, even before
spells and abilities resolve.) [Repeat] :rb_energy_2: (You may pay the additional cost to repeat this
spell's effect.) Counter a spell unless its controller pays :rb_energy_2:."* If you pay, one rune is left
and the Faefolk costs two. If you do not, Reinforce is countered, 425.1.a: *"A card or ability that is
Countered does nothing and is cleared from the chain."* It never touches a Faefolk cast from hand,
which resolves as soon as it is finalized (337.2). It delays rather than breaks: the Faefolk is still in
the deck, and two spare runes on T5 pay the tax unless they also pay [Repeat].

## 6. Verdict

**A dig, not a discount, on a body that is paid to die.** The rules reading is right. The discount
touches Energy only, the dig never burns you out, and the Deathknell refills runes. The play adds the
price. T4 is eight runes and one Calm Power, exactly what a Faefolk cast from hand costs, so Reinforce is
worth its 42% chance of finding one and no runes more. Once it is down, the Faefolk wins the kill exchange:
in the walk the opponent's cheapest kill gave back three cards and two runes. The line breaks to a
two-rune bounce, which sends the body back to hand at full price and leaves Reinforce in the trash.

## 7. Not verified

I did not walk Reinforce finding a unit other than the Faefolk, Reinforce on T5 with Not So Fast held,
the Predict setup, or `UNL-007 Smite`, whose *"If it would die this turn, banish it instead"* would take
the Deathknell away in a combat. 2v2 was not walked.

## Leads

- The entry's net per iteration, *"a 6 Might body deployed ready for 3 Energy and 1 Calm Power"*, leaves
  out Reinforce's own five Energy. The whole line is eight Energy and one Calm Power, the price of a
  Faefolk cast from hand with [Accelerate].
- The first notable makes *"the most expensive unit with NO Power in its cost"* the best target. Measured
  against casting from hand, Power changes nothing. Reinforce costs the five Energy it takes off, so any
  unit with 5 or more Energy comes out at its printed cost, Power included. A unit under 5 Energy pays
  more than its printed cost, because the discount stops at 0 (356.6).
- The Predict notable names `VEN-056 Clairvoyance`, the pool's one [Predict 5]. It costs E7 and ends with
  *"Draw 2."*, which draws the top two of the five it ordered. Put a Faefolk on top and you draw it, and in
  hand it costs exactly what the Reinforce route charges. Behind Clairvoyance, Reinforce adds nothing.
- The entry names no answer. `OGN-172 Rebuke` (two runes) returns the Faefolk to hand, with no
  Deathknell and at full price again. `SFD-136 Hard Bargain` (two Energy) counters Reinforce on the turn
  the line uses all eight runes.
