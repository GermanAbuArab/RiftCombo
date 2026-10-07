# Play — the Undertitan comes ready, and they kill Rek'Sai

Issue #311 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `void-rush-undertitan-accelerate`**, the Fury/Order ENGINE in which `SFD-188 Void Rush`
reveals `SFD-175 Undertitan`, the reveal adds two Energy toward the Undertitan's own discounted play, and
`SFD-029 Rek'Sai, Breacher` gives it [Accelerate], so a 5-Might body enters ready and gives your other
units +2 Might. The entry is right about the rules: 369.1 names the Undertitan as a replacement effect,
and the banishment zone is not a hand. Walked as a game, Void Rush finds an Undertitan on T3 a little
more than one cast in four, and then it takes the opponent's battlefield from a seven-Might garrison.
The price is three runes
off the board. And the +2 and the ready are only worth anything in an attack, which puts Rek'Sai in the
fight, and the defender kills her first. In the walk the line ran once. Two things the entry has wrong
change the deck. Void Rush is a Rek'Sai Signature card, so the only legend that can run it is
`SFD-187 Void Burrower`. And that legend reveals the top two on every conquer, which is the same line
for one Power less, with no spell to counter. What breaks the spell route is `OGN-045 Defy`, one rune,
before anything is revealed.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `b2bea92`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 61 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 40 (a hit on *before*), second in the list, because rank 39 already has a play. The other
entry of this slice is rank 38, played in
[the Musicians take B at six and hold it at three](2026-10-07-the-musicians-take-b-at-six-and-hold-it-at-three.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-187 Void Burrower`, and no other: Void Rush carries the Rek'Sai tag and is a Signature card (103.2.d.2) |
| **Champion** | `SFD-029 Rek'Sai, Breacher` as the Chosen Champion, so she starts in the Champion Zone and is never a draw |
| **First** | Rek'Sai on the board, and `SFD-018 Void Hatchling` if you have one |
| **Then** | Void Rush in hand, and five runes to tap with three to recycle, two of them Order |

The card text the play turns on:

- Void Rush (Fury/Order, E2 + 1 Power): *"Reveal the top 2 cards of your Main Deck. You may banish one, then
  play it, reducing its cost by :rb_energy_2:. Draw any you didn't banish."*
- Undertitan (Order, E6 + 1 Power, M5): *"When you play me, give your other units +2 :rb_might: this turn.
  As I'm revealed from your deck, [Add] :rb_energy_2:."*
- Rek'Sai, Breacher (Fury, E3, M3), after her own [Accelerate]: *"[Assault] (+1 :rb_might: while I'm an
  attacker.) Friendly units played from anywhere other than a player's hand have [Accelerate]."*
- Void Hatchling (Fury, E2, M2): *"If you would reveal cards from a deck, look at the top card first. You
  may recycle it. Then reveal those cards."*
- Void Burrower: *"When you conquer, you may exhaust me to reveal the top 2 cards of your Main Deck. You
  may banish one, then play it. Recycle the rest."*
- Defy (theirs, Calm, E1 + 1 Power): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*

## 2. Your order: reveal, add, play, ready

**The legend comes first, because the spell names it.** 103.2.d.2: *"All of the Signature cards must have
the Champion tag that corresponds to the Champion Legend of the deck."* Void Rush is tagged Rek'Sai and
marked Signature in `data/cards.json`, and Void Burrower is the pool's only Rek'Sai legend. 103.2.d.1
caps the count: *"Regardless of name, a deck may only contain a sum total of 3 Signature cards."* The
three Void Rush are the whole allowance. Rek'Sai, Breacher is a champion unit with the legend's tag, so
she can be the Chosen Champion (103.2.a.2) and start the game outside the deck, 419.1.a: *"By default, a
player can only Play cards from their hand or their Chosen Champion zone."* So the deck the reveals
sample is 39 cards, and the enabler is in no draw at all.

**The Add is in the pool before the play.** 369.1 works this card: *"Undertitan is a unit that reads in
part “As I’m revealed from your deck, [Add] [2].” This is a replacement effect that alters the execution
of any Game Effect that reveals Undertitan from your deck."* The reveal and the Add are one event. The
card stays on top until something moves it, 424.1.a.2: *"Cards remain in the zone they are being
Revealed from."* Then Void Rush banishes it and plays it, and the two Energy pay part of the cost.

**The price.** Void Rush is two Energy and one Power. The Undertitan is E6 + 1 Order Power, reduced by
two Energy. Rek'Sai's grant is 805.1.a: *"As you play me, you may pay [1][C] as an additional cost. If
you do, I enter ready."* 805.1.a.1 fixes the Power: *"the Power portion of the Accelerate cost can be
paid only with a Power that matches one of the domains of the unit"*, which for the Undertitan is
Order. 805.6: *"It does not enter exhausted and then become ready."* That is seven Energy and three
Power, less the Add's two: **five runes tapped and three recycled**, as the entry says. Going first on
T3 you have six. Three are left after the line, and T4 opens on five runes where the curve has eight.

**The ready and the +2 point at one thing.** The +2 lasts this turn, and the ready is worth something
only this turn, because your next Awaken readies the Undertitan anyway (315.1.b). The one use of both,
on the turn they arrive, is a move into a battlefield you do not control. Rek'Sai is the best body to
send with it: three, plus two, plus her [Assault], is six.

## 3. Their order: B, then A

Calm/Mind with `VEN-145 Curator of the Sands`, idle in the walk because nothing costs seven. Stalwart
Poro takes B on their T2 and Sunlit Guardian joins it. Both have [Shield], so B defends at three and
four, seven, and the Guardian has [Tank]. Ravenbloom Student goes to their base, and all five runes are
spent. On their T3 they cannot take B back, so the Student walks into A, trades with your Hatchling, and
leaves A with nobody, 466.5.b: *"If there are no Units remaining here controlled by any player, the
Battlefield becomes Uncontrolled."* That costs you the Hold on T4.

## 4. The turns, going first

Fury/Order against Calm/Mind. Your rune deck is six Fury and six Order, channelled Fury and Order each
turn, so T3's six runes are three of each. That covers Void Rush's Power whichever domain it names. This
list runs three Hatchlings, two more than the entry declares; both counts are priced below.

```
turn    runes   your turn                                                 points
T1      2       Void Hatchling (E2) to base                               0
their T1        Stalwart Poro to base, with the 485.7 extra rune.
T2      4       Hatchling walks to A, Conquer: +1. Void Burrower: the     1
                Hatchling looks at the top card and keeps it; Blazing
                Scorcher and Scrapyard Champion are revealed, five
                Energy each, so both are recycled. Rek'Sai (E3) from
                the Champion Zone to base, one idle.
their T2        Poro walks to B, Conquer. Sunlit Guardian (E3) to B,
                Ravenbloom Student (E2) to base. All five runes spent.
                B defends at seven.
T3      6       Hold A: +1. Void Rush (E2 + 1 Power). The Hatchling       3
                recycles Noxus Saboteur off the top; Undertitan and
                Void Drone are revealed. Add 2. The Undertitan
                (E4 + 1 Order) with [Accelerate] (E1 + 1 Order) enters
                ready, and your other units get +2. Draw the Drone.
                Five tapped, three recycled: three runes left. Rek'Sai
                and the Undertitan walk to B: eleven against seven.
                Both defenders die; they kill Rek'Sai. Conquer: +1.
their T3        No Hold. The Student walks to A: two against the
                Hatchling's two, both die, and A is uncontrolled.
                Lecturing Yordle (E3) and Eager Apprentice (E3) to
                base, one idle.
T4      5       Hold B: +1. Void Drone (E3) and Pouty Poro (E2) to B.     4
their T4        Yordle and Apprentice walk into A. Conquer.
```

Their points: 1 on T2, still 1 after T3, 2 on T4. The opponent was never idle. They took B with a
garrison of seven and, when they could not take it back, cost you A instead.

The T3 move is one action, 144.3: *"This is treated as one game action performed on multiple Units."*
Rek'Sai is six and the Undertitan five. You assign first: the Guardian has [Tank] and takes its lethal
four first, the Poro three, and four are spare. Their seven can kill one of the two: the Undertitan's
lethal is five and Rek'Sai's is six. Either kill leaves one body at B, and they choose Rek'Sai. She is the
[Accelerate] for every later Void Rush, and the only Breacher on the board. The Undertitan holds B.

The legend readied at your T3 Awaken (315.1.b), so the Conquer at B offers a second reveal. It is
declined. One rune is open, and an Undertitan revealed now would add two Energy and still cost E6 + 1
Power through the legend, so it would go to the bottom unplayed.

**What the line bought.** After their T3 the score is 3 to 1. Without the Undertitan, Rek'Sai alone is
four against seven, B stays theirs and they Hold it on their T3: 2 to 2. So the line swung two points
and left a 5-Might body on their battlefield. It cost three runes of growth, Void Rush, and Rek'Sai, and
until another Breacher is drawn, the next Void Rush plays its unit exhausted.

**How often this T3 happens.** On T3 the deck has 30 unknown cards on top (39, less seven drawn, less
the two T2 recycled to the bottom). With all three Undertitans among them, Void Rush finds one **19.3%**
of the time. The Hatchling's look and recycle raise it to **28.0%**, and that is the number this walk
used. Getting there needs a Void Rush in the first seven cards (45.7%) and a Hatchling in the first five
for T1: 34.5% with three, 12.8% with the entry's one, without a mulligan. A Void Rush that misses still plays one of the two cards, two Energy
cheaper and ready if it is a unit, and draws the other. But without the Undertitan's five Might, its two
Energy and its +2, it does not make eleven.

## 5. Breaks to

**The spell route breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power: one rune, tapped for the Energy and then
recycled for the Power), held on their T2 in place of the Student and cast on Void Rush, which costs two
Energy and one Power. 425.1.a: *"A card or ability that is Countered does nothing and is cleared from the
chain."* Nothing is revealed, so there is no Add and no Undertitan. 425.1.c: *"Countering does not refund
any costs paid to play a card, activate an ability, or trigger an ability."* You lose one of your three
Signature cards, two runes tapped and one recycled. Rek'Sai alone is four against seven, so the T3 swing
does not happen, and their T3 Holds B: 2 to 2. They paid one rune. Fury/Order prints no counterspell,
so there is no reply in the identity.

The reply is the route that is not a spell. Void Burrower's reveal is a triggered ability on a Conquer,
and Defy counters spells. Through the legend the Undertitan costs its full E6 + 1 Order Power. The Add
pays two of that, and [Accelerate] adds one Energy and one Order: **five runes tapped and two
recycled**, one Power less than the spell route, with no card spent. It needs a Conquer with those
runes still open, which means walking in before you spend.

## 6. Verdict

**Right, a T3 swing on a little more than one Void Rush in four, and it runs once.** The rules reading
is right. The Add is a replacement effect, it lands before the play, and Rek'Sai's grant reaches a card
played from banishment. The play adds three prices. The line takes three runes off the board, so T4 is
five runes where the curve has eight. The ready body and the +2 only pay in an attack, and Rek'Sai has
to attack beside the Undertitan to make it large, so the defender kills her and the next Void Rush has no
[Accelerate]. And the spell is a main-phase spell that the cheapest counter in the pool takes for one
rune before anything is revealed. The better engine is the legend the deck is forced to run.

## 7. Not verified

I did not deal the channel order; two Order runes among six from six Fury and six Order fail in 37 of
924 deals (4.0%). The corpus prints Void Rush's Power as P1 without its domain; three Fury and three
Order on T3 cover either. I did not walk the legend route as a game, a T3 that misses, `SFD-170 Rek'Sai, Swarm Queen` as
the Chosen Champion, the mulligan, or 2v2. The defender's choice is theirs: had they killed the
Undertitan, Rek'Sai would hold B at three on their T3 against a Student at two, and they would still
spend that turn on A.

## Leads

- The entry's prerequisite says *"Legend domains must cover Fury and Order; eight legends do (Hand of
  Noxus, Piltover Enforcer, Void Burrower among them)."* Void Rush is a Signature card tagged Rek'Sai
  (`data/signature.src.json`), and 103.2.d.2 restricts it to a Rek'Sai legend. Only Void Burrower
  (`SFD-187`, `SFD-243`) can run it. The eight are the `data/cards.json` printings of three Fury/Order
  legends, and two of the three cannot run this line. 103.2.d.1 also makes the three Void Rush the
  deck's whole Signature allowance.
- The entry says *"Nothing has to be on the board first except Rek'Sai, Breacher"*. She can be the
  Chosen Champion (103.2.a.2) and is then in the Champion Zone from the start (419.1.a), never a draw.
- Step 3 says the Undertitan's clause *"triggers"*, and that *"429.2 resolves the [Add] [E2] on the
  spot"*. 369.1 names this card's clause a replacement effect, and the entry's own later notables say
  so. 429.2 is about triggered and activated abilities. The first notable still leans on 429.2 too.
- Void Burrower reveals the top two on every Conquer. With an Undertitan that is five runes tapped and
  two recycled, one Power less than Void Rush's five and three, with no card spent and no spell for a
  counter. The entry names the legend and never uses it.
- The entry prices the hit and not the chance of it: 19.3% per Void Rush on T3, 28.0% with the
  Hatchling.
- The terminatesIn says *"the line runs at most three times per game"*. The ready body and the +2 are
  spent in an attack, Rek'Sai has to attack beside the Undertitan to make it large, and the defender
  kills her first. In the walk the line ran once.
- The entry names no answer. `OGN-045 Defy` (one rune) counters Void Rush before anything is revealed.
