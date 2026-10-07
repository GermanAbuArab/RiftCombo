# Play — the Deathcrown comes on turn five, and Charm makes the attack

Issue #313 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `teemo-strategist-rabadons-deathcrown-bonus-kill`**, the Calm/Mind ENGINE in which
`SFD-191 Rabadon's Deathcrown` is attached to `OGN-121 Teemo, Strategist`, and `OGN-043 Charm` drags
an enemy unit onto Teemo's battlefield on your own turn. They become the Attacker, Teemo defends, and
his trigger deals one per [Hidden] card among the top five, plus three. The entry is right about the
rules, and Riot's own example at 715.4 is this pair. Walked as a game, the line is a T5 line, and only
when the one Deathcrown is found. In the walk `SFD-058 Ornn, Blacksmith` dug it on T4. That happens
about three games in ten. On T5 the Deathcrown and a Charm took five runes, three of them recycled, and killed their best
unit before combat. Teemo's trigger had already killed a unit on their T3 without either card, when
they attacked into him. What breaks the line is `OGN-045 Defy`, one rune, on the Charm.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `7e49661`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 59 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 43 (a hit on *first*), second in the list, because rank 42 already has a play. The other
entry of this slice is rank 41, played in
[Rhasa comes down on turn three, at seven cards](2026-10-07-rhasa-comes-down-on-turn-three-at-seven-cards.md).
Teemo's other drag line, through Evelynn under the Teemo legend, is played in
[the drag empties their battlefield](2026-10-05-the-drag-empties-their-battlefield.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-189 Fire Below the Mountain` (Calm/Mind), and no other: the Deathcrown is a Signature card tagged Ornn (103.2.d.2) |
| **Champion** | `SFD-058 Ornn, Blacksmith` as the Chosen Champion, so his dig is always available from the Champion Zone |
| **The trigger** | 3x Teemo, and the entry's [Hidden] package: H = 15 of the 39 shuffled cards |
| **The kill** | 1x Rabadon's Deathcrown, attached to Teemo |
| **The forcer** | 3x Charm, to drag an enemy body onto Teemo's battlefield |

The card text the play turns on:

- Teemo, Strategist (Mind, E2 + 1 Power, M2): *"[Hidden] (Hide now for :rb_rune_rainbow: to react with
  later for :rb_energy_0:.) When I defend, choose an enemy unit here and reveal the top 5 cards of your
  Main Deck. Deal 1 to that unit for each card with [Hidden] revealed this way, then recycle the
  revealed cards."*
- Rabadon's Deathcrown (Calm/Mind gear, E4 + 2 Power, M+3): *"[Unique] (Your deck can have only 1 card
  with this name.) [Equip] :rb_rune_rainbow: (:rb_rune_rainbow:: Attach this to a unit you control.)
  [Effect] Your spells and abilities deal 3 Bonus Damage (while this is attached)."*
- Fire Below the Mountain: *":rb_exhaust:: [Reaction] — [Add] :rb_rune_rainbow:. Use only to play gear or
  use gear abilities."*
- Ornn, Blacksmith (Calm, E5 + 1 Power, M5): *"When you play me or when I hold, look at the top 4 cards
  of your Main Deck. You may reveal a gear from among them and draw it. Then recycle the rest."*
- Charm (Calm, E1 + 1 Power): *"Move an enemy unit."*
- Defy (theirs, Calm, E1 + 1 Power): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Counter a spell that costs no more than :rb_energy_4: and no more than :rb_rune_rainbow:."*

## 2. Your order: dig, equip, drag

**The legend comes first, because the gear names it.** 103.2.d.2: *"All of the Signature cards must have
the Champion tag that corresponds to the Champion Legend of the deck."* The Deathcrown is tagged Ornn,
and Fire Below the Mountain is the pool's only Ornn legend. Ornn, Blacksmith has the tag, so he can be
the Chosen Champion. 103.2.a.1: *"This will be placed in the Champion Zone at the start of the game."*
His look at four is then a card you always have, not one you have to draw.

**The Deathcrown is one card.** It is [Unique], so the deck holds one copy. Ornn's look on play is the
only way the deck finds it early. It costs four Energy and two Power, and the legend pays the [Equip]
rainbow, so the attach is free.

**Charm makes them the Attacker.** It names no destination, so 355.4 lets you choose: *"For Spells and
Abilities that Move one or more Units, choose a valid Location as the Move Destination for each Move
that will be performed."* Choose Teemo's battlefield. 450: *"The Destination becomes Contested if it is
an Uncontested Battlefield not controlled by the controller of the Unit or Units that moved."* The moved
unit is theirs. 464.2.c.1: *"The Attacker is the player whose unit(s) applied the Contested status to
the Battlefield."* So you are the Defender on your own turn, and 383.4.f fires: *"Defend Triggers are
Triggered Abilities that trigger when a Unit or Player gains the Defender designation for the first time
during a combat."*

**Your trigger resolves first.** 464.2.e.1: *"The Attacking player, who has Focus, places Triggered
Abilities on the Chain first, followed by all non-Defender players in Turn Order, followed by the
Defending Player."* 340.1: *"The newest Finalized Chain Item resolves."* Teemo's trigger is placed last,
so it resolves before anything the attacker's triggers do. 715.1 adds the three: *"If the Deal action has
a single target, the amount of Damage to that target will be increased by the Bonus Damage granted to
it."* And 715.4 takes it away on a miss: *"If no damage was Dealt, then Bonus Damage will not apply."*

**Once per combat.** 383.4.f.2.a: *"These triggers will only have their condition checked once per
combat, despite a Unit being able to gain and lose the Defender designation multiple times in the same
combat."* One Charm, one trigger.

## 3. Their order: B, and one rune open

Calm/Body. Sunlit Guardian takes B on their T2, and Stalwart Poro joins it. Pit Rookie (*"When you play
me, buff another friendly unit."*) makes the Guardian a 4. On their T3 the Rookie walks into A, where
Teemo stands, and dies to his trigger. After that they stop attacking A and keep one rune open from T3
on, for Defy.

## 4. The turns, going first

Calm/Mind against Calm/Body. Your rune deck is six Calm and six Mind, channelled Calm and Mind each
turn. Your opening four and first draws are two Clockwork Keepers, Teemo, Back Off and Charm. Ornn's
look on T4 finds the Deathcrown.

```
turn    runes   your turn                                                 points
T1      2       Clockwork Keeper (E2) to base.                            0
their T1        Sunlit Guardian (E3) to base.
T2      4       Keeper walks to A, Conquer: +1. Teemo (E2 + 1 Mind):       1
                two tapped, one recycled. Two idle.
their T2        Guardian walks to B, Conquer. Stalwart Poro (E2) to B.
                Pit Rookie (E2) to base, and buffs the Guardian to 4.
T3      5       Hold A: +1. Teemo walks to A. Back Off hidden at A (one    2
                rune recycled). Second Keeper (E2) to A. Three idle.
their T3        Hold B. First Mate (E3) to base. The Rookie walks into
                A alone. Teemo defends: two [Hidden] among the five,
                2 to the Rookie, which dies before combat damage. A
                second Sunlit Guardian (E3) to B. One rune open.
T4      6       Hold A: +1. Ornn (E5 + 1 Calm) from the Champion Zone      3
                to base: five tapped, one recycled. He looks at four;
                the Deathcrown is there, revealed and drawn, and the
                other three go to the bottom.
their T4        Hold B. Bodies to base. One rune open.
T5      7       Hold A: +1. Rabadon's Deathcrown (E4 + 2 Power): four      4
                tapped, two recycled. The legend exhausts for the
                rainbow and the Deathcrown is equipped to Teemo, now
                Might 5. Charm (E1 + 1 Calm): one tapped and recycled.
                The 4-Might Guardian is moved from B to A. Combat at A.
                Teemo defends: two [Hidden] among the five, 2 + 3 = 5.
                The Guardian dies before combat damage. Two runes idle.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After your T5 it is 4 to 3.

Both kills left a combat with no attacker. 465.1 opens the damage step only *"If both Attacking and
Defending units remain at this battlefield"*, so nothing of yours took damage and A stayed yours.

**What the line bought.** The T5 kill is the 4-Might Guardian, their best body, for one card and one
rune. It took the Deathcrown and its four tapped and two recycled runes first. Without the Deathcrown the
same Charm deals two, and the Guardian lives to fight Teemo at five and the two Keepers at four. Their
attack on T3 got the trigger for free, and it is why they stopped attacking A.

**How often this T5 happens.** The Deathcrown is one card in 39. By Ornn's look on T4 you have seen
four in the opening hand, four draws and four looked at, twelve: **30.8%**. Each later Hold with Ornn at a
battlefield looks at four more. The trigger itself, at T5, reads five from 21 unknown cards. By then you
have drawn ten: four opening, five turn draws, and the Deathcrown from Ornn. That leaves 29 in the deck,
with eight known at the bottom, Ornn's three and the five from the T3 trigger. At most 11 of the 21 are
[Hidden]: of the 15, Teemo and Back Off were drawn and two went to the bottom on T3. With 21 and 11,
E[k] is **2.62**, a whiff is **1.2%**, and the expected damage with the Deathcrown is **5.58**. That is above the entry's 4.70, which counts H = 15 in all 39.

## 5. Breaks to

**The line breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power: one rune, tapped for the Energy and then
recycled for the Power), held open from their T3 and cast on Charm. Charm costs one Energy and one
Power, inside Defy's limit. 425.1.a: *"A card or ability that is Countered does nothing and is cleared
from the chain."* Nothing moves, no one attacks, and Teemo does not defend. 425.1.c: *"Countering does not
refund any costs paid to play a card, activate an ability, or trigger an ability."* It is one rune and
one card each. You keep the Deathcrown and the trigger. They keep the Guardian, and the T5 line spent
five runes, three of them recycled, for +3 Might on Teemo.

The reply is the second Charm, the next turn, when Defy is spent. And Teemo still defends whenever they
attack A. They can choose not to.

## 6. Verdict

**Right, and late.** The rules reading is right. Charm makes them the Attacker, 464.2.e.1 resolves Teemo's
trigger first, and 715.4 takes the three away on a miss. The play adds two prices. The Deathcrown is one
card that Ornn digs for, so the line runs on T5 about three games in ten. And it costs five runes that
turn, three of them recycled. Charm is one rune each time after that, and the cheapest counter in the pool takes it for one rune.
The trigger without the Deathcrown is worth something too: in the walk it killed a body on their turn
and kept them out of A.

## 7. Not verified

I did not deal the channel order. Teemo's Power is Mind, and Ornn's and Charm's are Calm. Four runes
from six Calm and six Mind hold no Mind in 15 of 495 deals (3.0%), and the T2 Teemo then waits. I did
not walk a T4 where the look misses, the second and third Charm, Forgefire Cape, the T5 reveal at 0 or
1, Back Off, the mulligan, or 2v2. The 11 at T5 is an upper bound: it takes Ornn's three and the other draws as not [Hidden].

## Leads

- The entry prices the trigger and not when the line can run. The Deathcrown is one card. Ornn, Blacksmith
  as the Chosen Champion finds it by T4 in 30.8% of games, and the Deathcrown and a Charm take five
  runes on T5, three of them recycled.
- The entry's notable *"OVERLAP, DECLARED"* says this line and `charm-evacuate-conquer` *"cannot want the
  same copy on the same turn"*. One Charm can do both. If the unit dragged was alone on its battlefield,
  323.6 makes that battlefield uncontrolled in the same Cleanup: *"Players lose control of any controlled
  Battlefields without their Units occupying them if the turn is in an Open State and there is no
  Showdown or Combat ongoing there."*
- The entry names no answer. `OGN-045 Defy` (one rune) counters Charm, which costs one Energy and one
  Power.
