# Play — The Mother's +2 kept the attacker alive, and one rune answers the Strike eight ways

Issue #370 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `mask-mother-ruthless-strike-doubled-payment`**, the Fury/Chaos ENGINE in which
`VEN-008 Ruthless Strike` is paid for by discarding `VEN-094 Mask Mother`, so one Strike deals 5
instead of 3 and her trigger gives a friendly unit +2 Might for one more Energy. The entry is right
about the order: her trigger resolves before the Strike, and the two never contend. In a game the 5
damage was the half any discard buys. The +2 was the half only she buys, and it paid as a body, not as
damage. On T3 the Strike killed one of two 4-Might defenders, and the +2 let a 3-Might `OGN-175
Shipyard Skulker` take the other's 4 and live: **2 to 1**, a Conquer, and `SFD-185 Glorious
Executioner` drew back a card. Discarding a dead card instead, the Skulker dies and they keep the
battlefield. Paying for the same +2 with a second attacker (Accelerate) also wins the fight, but it
leaves no unit in base, and the walk's T4 Conquer of the other battlefield is gone: **3 to 2** against
2 to 2. The cheapest answer in their colours is one rune held up on their T2: eight cards at one rune
stop the T3 Conquer, `VEN-040 Decree of Focus` the plainest of them, because it answers exactly a Fury
spell.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `072409a`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 27 of them with no play**.
That is one fewer in the queue than the issue's 101. The two picks are unchanged: this entry is
rank 75, the second in the list (the issue had 76). The other entry of this slice is rank 74,
`mel-defiant-soul-sanction-banish-cycle`, played in
[Mel's three banishes thin a battlefield nothing of yours can reach](2026-10-14-mels-three-banishes-thin-a-battlefield-nothing-of-yours-can-reach.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-185 Glorious Executioner` (Fury/Chaos, tag Draven) |
| **Chosen Champion** | `OGN-028 Draven, Showboat` (Fury, E5 + 1 Power, M3) |
| **The pair** | `VEN-008 Ruthless Strike` (Fury spell, E3, [Action]), `VEN-094 Mask Mother` (Chaos, E3, M3) |
| **The bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2), `OGN-175 Shipyard Skulker` (Chaos, E3, M3) |

The entry's five Fury/Chaos legends match the five `data/corpus_flat.txt` prints. Glorious
Executioner is the one for this walk, because its draw is paid by the combat the +2 wins:
*"When you win a combat, draw 1. (You win if only your units remain after combat.)"* Its Chosen
Champion starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the
start of the game."* 419.1.a: *"By default, a player can only Play cards from their hand or their
Chosen Champion zone."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Ruthless Strike: *"[Action] (Play on your turn or in showdowns.) As an additional cost to play this,
  you may discard 1. Deal 3 to a unit at a battlefield. If you paid the additional cost, deal 5 to it
  instead."*
- Mask Mother: *"When you discard me, you may pay :rb_energy_1: to give a friendly unit +2 :rb_might:
  this turn."*
- Legion Rearguard: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_fury: as an additional cost to
  have me enter ready.)"*
- Shipyard Skulker: no text. It is Chaos, which matters in §5.

## 2. What the two payments buy

**The discard is the 5, and any card pays it.** The Strike's discard is an optional additional cost,
356.2.b.1: *"Some Optional Costs specified by Passive Abilities on the card being played or another
card are Non-Mandatory, and must be paid only if the player made the choice to pay them in step 2."*
Nothing on the Strike asks what is discarded. A Mask Mother buys the same 5 as a `OGN-011 Magma
Wurm` that nobody can cast on T3.

**Her trigger is the +2, and it is paid before it is on the chain.** 422.1.b: *"“When I am
discarded” abilities or other Triggered Abilities that trigger on discarding are executed after
discarding has occurred."* She is in the trash by then, and that is where the trigger lives, 385.2:
*"Triggered Abilities outside of the Board will self-describe their context."* The Energy comes first,
204.3.a: *"When Costs within Instructions appear as the first part of the effect in triggered
abilities, the cost is taken to be the base cost of the triggered ability. It must be paid to finalize
the triggered ability."* Then the newest item resolves first, 340.1: *"The newest Finalized Chain Item
resolves."* So the +2 lands, then the 5.

**The +2 is Might, and Might is what kills a unit.** 143.2.a: *"If a Unit ever has nonzero damage
marked on it equalling or exceeding its Might, it is Killed."* The entry counts the +2 as damage the
unit assigns. In the walk it paid as damage the unit could take: a 5-Might attacker takes 4 and lives.

**It needs a fight this turn, and the Strike needs a target at a battlefield.** The +2 lasts *"this
turn"*. The Strike reaches *"a unit at a battlefield"*, so a unit in base is out of reach. Going
first, that rules out T2, the first turn with four runes. Units played on their T1 enter their base
exhausted, 143.4: *"Units enter the Board exhausted."* They control no battlefield to play onto,
355.2.a: *"By default, Valid locations include the controller’s Base or a Battlefield the controller
controls."* In Calm/Body, no unit enters ready by itself for three runes or less (their T1): the
cheapest that can are `OGN-150 Kraken Hunter` and `UNL-115 Nilah, Joyful Ascetic`, four runes each
with [Accelerate] paid. Two cards can do it for three: `OGN-129 Confront` (E2, *"Units you play this
turn enter ready."*) with a one-Energy unit, or `OGN-146 Wallop` with its cost ignored by spending
the buff Blind Monk just gave (§3). Short of that, the first enemy unit at a battlefield is one they
move there on their T2, and the engine's first turn is your T3.

**On their turn it is a showdown card.** 806.1.b: *"Action grants the corresponding card or effect
permission to be played or activated during Showdowns, even when it is not the Controlling player's
turn."* Holding it for their attack means four runes left ready through your own turn.

## 3. Their deck: Calm/Body, buffing

`OGN-257 Blind Monk` (Calm/Body): *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't
have a buff, it gets a +1 :rb_might: buff.)"* It is an activated ability without [Action] or
[Reaction], so it is never used on your turn, 381: *"All Activated Abilities can only be activated on
the Controlling Player's Turn and during an Open State."* Its Chosen Champion is `OGN-151 Lee Sin,
Centered` (Body, E6, M6, [Accelerate] for :rb_energy_1::rb_rune_body:). They play `OGN-052 Stalwart
Poro` (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*, and `UNL-097 Kinkou
Initiate` (Body, E3, M3): *"When you play me, draw 1 if your other units have total Might 5 or more."*
A buffed Stalwart Poro is a 3, and a 4 while it defends. §5 names their answers.

## 4. The turns, going first

Fury/Chaos against Calm/Body. Your battlefield is G; theirs is B. Your opening four are Legion
Rearguard, Shipyard Skulker, Mask Mother and Ruthless Strike. Your draws are a second Legion Rearguard
(T1), `OGN-013 Pouty Poro` (T2), Magma Wurm (T3) and a second Shipyard Skulker (T4). The Wurm (Fury,
E8 + 1 Power) needs all eight of your T4 runes; on T3 it is the dead card the comparisons below
discard.

```
turn    runes   your turn                                                 points
T1      2       Legion Rearguard (E2) to base.                            0
their T1        Stalwart Poro (E2) to base. Blind Monk (E1): buff it, M3.
                Three runes, none left.
T2      4       The Rearguard walks to G, Conquer: +1. Shipyard Skulker   1
                (E3) to base. One rune left.
their T2        The Poro walks to G: 3 against 2. Your Rearguard dies.
                Conquer G. Kinkou Initiate (E3) to G; no draw. Blind
                Monk (E1): buff the Initiate, M4. Five runes, one left.
T3      6       The Skulker walks to G: 3 against the Poro's 4 and the    2
                Initiate's 4. Ruthless Strike (E3), discarding Mask
                Mother. Her trigger (E1): the Skulker is a 5. The
                Strike deals 5 to the Initiate: it dies. The Skulker's
                5 kills the Poro; its 4 does not kill the Skulker.
                Win: Glorious Executioner draws a Ruthless Strike.
                Conquer G. Second Rearguard (E2) to base. None left.
their T3        Nothing to Hold. Lee Sin, Centered from the Champion
                Zone with Accelerate (E7 + 1 Body Power): seven runes,
                one recycled. He walks to G: 6 against 3. The Skulker
                dies. Conquer G.
T4      8       The Rearguard walks to B, Conquer: +1. Draven, Showboat   3
                (E5 + 1 Fury Power) to base, M6: five runes, one
                recycled. Second Shipyard Skulker (E3) to base. None
                left.
their T4        Hold G: +1. Lee cannot reach B.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4
it is **3 to 2**; after their T4, 3 to 3.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard; 5, then 4 after T2; 5 after the
T3 draw, 3 after the Strike and its discard, 4 after the Executioner's draw, 3 after the second
Rearguard; 4 after the T4 draw, then 3 (Pouty Poro, Magma Wurm, Ruthless Strike). Draven comes from
the Champion Zone, not the hand.

**Their T2.** They take G rather than walk into the empty B: the Poro kills your Rearguard and denies
your Hold on T3, for the same point. It attacks as a 3; Shield counts only on defence. The Initiate
goes straight to G, which they now control (355.2.a). Its draw needs 5 Might among their other units,
and the Poro alone is a 3. You have one rune ready and nothing in hand that costs one.

**Your T3, the order on the chain.** The Skulker walks into G, and you have Focus, 464.2.c.1.a: *"If a
showdown opens as part of combat, this player gains Focus as the showdown begins."* Their units are
defenders now, so the Poro is 2 + 1 (buff) + 1 (Shield) = 4, and the Initiate is 3 + 1 = 4. You cast
the Strike on the Initiate and discard the Mother as its cost. Her trigger is finalized with a fourth
rune's Energy and chooses the Skulker. It resolves first (340.1): the Skulker is a 5. Then the Strike
deals 5 to the Initiate, and it dies (143.2.a). Either target works; both are 4. They pass with one
rune ready.

Combat follows, 465.1: *"If both Attacking and Defending units remain at this battlefield, the
following Tasks become Outstanding, in the specified order:"* Your 5 kill the Poro. Its 4 are less
than the Skulker's 5, so the Skulker lives. You won, 466.3.a: *"A Player has won a combat if they
received either the attacker or defender designation and are the only Player that has units
remaining at this battlefield during this step."* Glorious Executioner draws, and you Conquer G,
469.1: *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."* The
second Rearguard goes to base, not to G. Next to the Skulker it would only be a second body for Lee to
kill; in base it walks on T4.

**What the T3 pair bought.** Four lines, from the same hand and the same six runes:

- *The walk*: 2 to 1. The Skulker holds G, and the second Rearguard is in base. Hand: Pouty Poro,
  Magma Wurm, a Ruthless Strike.
- *The Strike discarding the Wurm* (three runes), and the Rearguard or the Mother to base: the
  Initiate dies, but the Skulker is a 3 against the Poro's 4. It dies; the Poro takes 3 and lives. They
  keep G: **1 to 1**, and they Hold G on their T3.
- *The Strike discarding the Wurm, and the Rearguard with Accelerate* (E2 + E1 + 1 Fury Power, three
  runes, one recycled), walking in with the Skulker as one move, 144.3: *"Players may perform multiple
  Units' standard move simultaneously."* The Strike kills the Initiate. Your 5 kill the Poro, and its 4
  kill one of yours. You win and Conquer: 2 to 1, with the Mother still in hand. But nothing is in base.
  Lee kills the survivor at G on their T3. On your T4 no unit of yours is ready to walk to B, so it is
  **2 to 2** after your T4, with seven runes, not eight.
- *No Strike*: the Mother and the Rearguard to base. They keep G and Hold it: 1 to 2 after their T3.

So the 5 was the half any discard pays, and on its own it lost the fight. The +2 was the half only she
pays, and it bought the fight as a body: the Skulker survived because it was a 5. Against the
Accelerate line, which buys the same fight with a second body, it bought the T4 point. That line kept
a better card in hand (the Mother rather than the Wurm), but it lost a unit and a rune.

**Their T3.** They control nothing, so they have nothing to Hold. Lee comes from the Champion Zone
(419.1.a), and his Accelerate makes him enter ready. You have no rune ready, and your one unit at G is
a 3 again: the +2 lasted only your turn, and its damage healed at the end of it, 143.3.b.1: *"At the
end of each player's turn."*

**Your T4.** They spent all seven runes on Lee, so nothing of theirs is ready. B is empty, and the move
is a showdown with no combat, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an
empty Battlefield are a stand-alone Phase and do not create a Combat."* Conquer: **3 to 2**. Draven is
a 3 plus your three points. The second Ruthless Strike stays in hand. On Lee it is 5 against a 6. With
the Rearguard sent into G instead of B, the Strike (discarding the Wurm) and the Rearguard's 2 do kill
him, and his 6 kill the Rearguard. That leaves G empty and the score 2 to 2; it is not walked.

**Their T4.** They Hold G, 315.2.b.2: *"1. The Turn Player Holds all Battlefields they Control."* Lee
cannot reach B, 144.4.b: *"Units may move from a Battlefield to their Base."* He has no [Ganking]. What
they play this turn enters exhausted (143.4).

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first you
have seen **7** cards by T3 (four opening, one draw a turn from T1). With three of each (103.2.b), a
Mask Mother and a Ruthless Strike both among them is **19.23%**; among the **6** seen by T2,
**14.55%**; among the **8** seen by T4, **24.20%**. That counts only those two cards, not the body
that has to be ready to attack.

## 5. Breaks to

**The cheapest answer is one rune, kept ready on their T2.** In the walk it is their fifth rune,
which they leave up after the Initiate and the buff. The predicate is: played on your T3, does it stop
your Conquer of G? A stopped Conquer leaves it **1 to 1**. They hold G, or nobody does, and the T4
point goes with it. That is the result this section prices.

**The scope of that verdict.** A Calm/Body deck plays only Calm, Body and Calm/Body cards
(103.1.b.1), and its Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature
cards must have the Champion tag that corresponds to the Champion Legend of the deck."* Blind Monk's
tag is Lee Sin. The predicate is: a card in those domains in `data/cards.json` (not a legend,
battlefield, rune or token), with [Action], [Reaction], [Hidden] or [Ambush] in its text, not banned,
and not a Signature card with another champion's tag. Folded by name, that is 60 cards. Three are
Signature cards a Lee Sin deck cannot run: `OGS-020 Highlander` and `UNL-192 Alpha Strike` (Master Yi)
and `SFD-194 Counter Strike` (Jax). The Lee Sin Signature, `OGN-258 Dragon's Rage`, has none of the
keywords. That leaves **57**. By the runes they cost (the larger of the Energy and the Power, the
Power recycled off the same runes), **11** cost one rune, **24** cost two, and **22** cost three or
more, at printed cost. One of them costs nothing in this walk: `OGN-146 Wallop` (Body, E2, [Action])
reads *"As you play this, you may spend a buff as an additional cost. If you do, ignore this spell's
cost. Ready a unit."* Both of their defenders carry Blind Monk's buff on your T3, so it is free there.
It readies a unit and adds no Might, so it does not stop the Conquer in any window below. The other
cost changes among the 57 do not reach zero runes here. `OGN-047 Find Your Center` costs
:rb_energy_2: less only if an opponent's score is within 3 points of the Victory Score, and you have
1. `OGN-144 Spoils of War` costs :rb_energy_2: less after an enemy unit has died this turn, so E2 + 1,
two runes. `SFD-111 Here to Help` reduces the unit it plays, not itself. A hidden card ignores its
base cost when played from facedown, but hiding costs [A], one rune. So one rune is the floor **for
an answer**: no card that stops the Conquer costs less.

Three ways to keep something back on their T2 are swept: one rune up (the walk), a card hidden at G
for that rune, and two runes up by skipping the buff. Each window prices single cards; the two-card
cases found while walking them are named where they occur.

*One rune up, G at 4 + 4 against your 3 (5 with the Mother).* Answers can come while the Strike is on
the chain, or after it resolves, 346: *"When the last item on the chain resolves and the turn returns
to an Open State during a Showdown, Focus passes, and the next Player gains both Focus and
Priority."* You have two runes left, and nothing in hand you can cast in a showdown, 308.1.a: *"Only
cards and abilities with the Action or Reaction keywords can be played or activated in a Showdown
State."* **Eight of the eleven break it:**

- `VEN-040 Decree of Focus` (E1): *"Choose a friendly unit that's in combat with an enemy Fury
  (:rb_rune_fury:) unit or that's being chosen by an enemy Fury spell. Give it +4 :rb_might: this
  turn."* The Strike is a Fury spell choosing the Initiate, so the Initiate is an 8 and survives the
  5. Your 5 kill one of their two, their 4 + 8 kill the Skulker, and they keep G. The Skulker is Chaos, so
  the card's first clause never applies to it. With a Legion Rearguard attacking, it would.
- `OGN-046 En Garde` (E1): *"Give a friendly unit +1 :rb_might: this turn, then an additional +1
  :rb_might: this turn if it is the only unit you control there."* After the Strike kills the
  Initiate, the Poro is alone, 740.2.a: *"A unit is alone when there are no other friendly units at
  the same location."* It is a 6: your 5 do not kill it, and its 6 kill the Skulker. They keep G.
- `UNL-031 Combat Experience` (E1, +1; they have no XP for its [Level 6]) and `UNL-046 Friendship`
  (E1, +1 for the Poro tag) make the Poro a 5 after the Initiate dies. Five against five: both die,
  and G is left empty, 466.5.b: *"If there are no Units remaining here controlled by any player, the
  Battlefield becomes Uncontrolled."*
- `OGN-133 Flurry of Blades` (E1): *"Deal 1 to all units at battlefields."* The Poro needs 3 more, and
  the Skulker takes 1 + 4 = 5. Both die, and G is left empty.
- `OGN-045 Defy` (E1 + 1 Calm): *"Counter a spell that costs no more than :rb_energy_4: and no more
  than :rb_rune_rainbow:."* The Strike costs E3. The Mother is still in your trash, 425.1.c:
  *"Countering does not refund any costs paid to play a card, activate an ability, or trigger an
  ability."* 425.1.c.1: *"This includes additional costs."* The Skulker is a 5 against their 8: it
  dies, it kills one of them, and they keep G.
- `OGN-145 Unyielding Spirit` (E1 + 1 Body): *"Prevent all spell and ability damage this turn."* and
  `UNL-106 Repulse` (E1 + 1 Body): *"Choose a friendly unit at a battlefield. Counter an enemy spell or
  ability that chooses it and no other friendly unit."* Either way the Strike does nothing, and it is 5
  against 8, as with Defy.

The other three do not. `VEN-039 Crumbling Sands` counters a spell only *"if an opponent has played
another spell this turn"*, and the Strike is your first. The Mother's trigger is an ability, not a
spell. `OGN-081 Seal of Focus` and `OGN-163 Seal of Strength` are gear whose only [Reaction] is an
ability they would already need on the board, and theirs is empty of gear. Wallop also reaches this
window, for nothing, by spending a buff. It is an [Action], so it comes after the Strike has
resolved, and the buff it spends is the survivor's: a Poro without its buff is a 3, and the Skulker
wins by more. Readying a unit changes nothing in the combat. It does not break it.

*A card hidden at G instead.* They control G after their T2 conquer, which is what hiding needs,
811.1.b: *"you may pay [A] to hide this facedown at a battlefield you control that doesn't already have
a facedown card hidden there for as long as you control that battlefield. Beginning on the next turn,
this gains [Reaction] and you may play this, ignoring its base cost."* The predicate for this scope is
the same, narrowed to the cards with [Hidden]. There are **eight**, none a Signature card: `OGN-057
Block`, `OGN-077 Zhonya's Hourglass`, `SFD-043 Emperor's Divide`, `SFD-111 Here to Help`, `VEN-034
Resonating Strike`, `OGN-053 Stand United`, `OGN-135 Pakaa Cub` and `UNL-042 Back Off`. Played from
facedown they cost nothing and have [Reaction], 811.6: *"A card that is Hidden gains Reaction while
facedown or played from facedown"*. A unit they put there joins the fight, 811.1.d.1: *"A hidden
permanent must be played to that battlefield."* And 464.2.c.3.a: *"If a Unit controlled by the
Attacker or Defender becomes present at this Battlefield after this moment, it will gain the Attacker
or Defender designation during the Cleanup phase following the action that caused it to become
present, as appropriate for its controller."* **Four break it alone:**

- Block: *"Give a unit [Shield 3] and [Tank] this turn."* On the Initiate in answer to the Strike it
  is a 7, and the 5 does not kill it. Your 5 must go to the Tank first: 2 to finish it, and 3 on the
  Poro, which needs 4. Their 11 kill the Skulker.
- Pakaa Cub, a 3 at G: the Strike kills one 4, and your 5 meet 4 + 3. The Skulker dies.
- Stand United: *"Buff a friendly unit. Buffs give an additional +1 :rb_might: to friendly units this
  turn."* Both of theirs are buffed already, so the Poro is a 5 and the Initiate a 5. The Strike still
  kills the Initiate, and the Poro and the Skulker trade. G is left empty.
- Back Off: *"[Stun] a unit. (It doesn't deal combat damage this turn.)"* The stunned Skulker deals
  nothing, and the Poro's 4 do not kill it. Both stay, so the Skulker is recalled, 466.1.a.2:
  *"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still present.”"* No
  Conquer.

The other four do not. Zhonya's Hourglass saves one unit by recalling it, which leaves G to the
Skulker. Emperor's Divide moves both of theirs to base: the Strike's target is gone, 359.3.e.5: *"If
any of the spell's targets are no longer legal, those game objects, players, or zones are unaffected
by the spell as it resolves."* No defender remains, so you win and Conquer anyway. Resonating Strike
needs a unit of theirs at another location, and they have none. Here to Help needs a unit in hand,
which is a second card. With one (a second Initiate, say, played to G for nothing), G is too big for a
5. With no rune up, Wallop is still free by spending a buff, and it still does nothing, as above.

*Two runes up, skipping the buff.* G is the Poro's 4 and an unbuffed Initiate's 3. You aim the
Strike at the Poro, and the Skulker's 5 meet the Initiate's 3. Without the Mother this line trades
(3 against 3), so the +2 still decides it. The 35 cards at two runes or less were swept against it.
Timing splits them. While the Strike and her trigger are on the chain the turn is closed, 309.1: *"If
a Chain exists, the turn is in a Closed State."* Only a [Reaction] card is played then, 813.1.c.1:
*"This can be played during Closed States on any player's turn."* An [Action] card waits for the open
state after the chain resolves (346), when the Poro is already dead. **Fifteen break it alone:**

- At one rune: En Garde (the Initiate alone is a 5, and it trades), Decree of Focus (the Poro is an 8),
  and Defy, Unyielding Spirit and Repulse (the Skulker's 5 against 7).
- `OGN-058 Discipline` and `SFD-034 Feral Strength` ([Reaction], +2 each): on the Poro in answer to
  the Strike, it is a 6 and survives the 5, and the Skulker's 5 meet 6 + 3. On the Initiate after the
  Strike, a 5 trades with the Skulker.
- `VEN-072 Guttural Roar` (+2), `UNL-095 Grim Resolve` (+3) and `SFD-097 Punch First` (E1 + 2 Body,
  +5), all [Action], so on the Initiate after the Strike: a 5 trades with the Skulker, and a 6 or an 8
  kills it.
- `OGN-057 Block` from hand ([Action]): on the Initiate after the Strike, Shield 3 makes it a 6. Your 5
  do not kill it, and its 6 kill the Skulker.
- `SFD-040 Thwonk!` (*"Stun an attacking unit."*) and `OGN-050 Rune Prison` (E2 + 1 Calm, *"Stun a
  unit."*): the Skulker deals nothing and is recalled, as with Back Off.
- `OGN-127 Cannon Barrage` (E2 + 1 Body, [Reaction]): *"Deal 2 to all enemy units in combat."* The
  Skulker takes 2 + 3 = 5 and trades with the Initiate.
- `SFD-045 Not So Fast` (E2 + 1 Calm, [Reaction]): *"Counter an enemy spell or ability that chooses a
  friendly unit or gear."* The Strike chooses the Poro.

The other twenty do not. `OGN-128 Challenge` is an [Action], so it comes after the Poro is dead: the
Initiate's 3 against the Skulker's 5 kill the Initiate, and the Skulker, with 3 marked, has no one left
to fight. Combat Experience makes the Initiate a 4, which the Skulker's 5 kill while taking 4.
Friendship adds 1 only while the Poro lives, so 4 at most. Flurry of Blades leaves the Skulker at
1 + 3 = 4 damage. Crumbling Sands has no other spell to point at. Emperor's Divide hands you G.
Resonating Strike has no unit elsewhere to move, and Here to Help needs a unit in hand. `OGN-048
Meditation`, `OGN-129 Confront`, `OGN-146 Wallop`, `UNL-103 Disposal Order` and `SFD-106 Show of
Strength` touch no unit in that combat: they draw, ready or recycle. Zhonya's Hourglass is gear, and
from hand it has no [Reaction]. Neither do `UNL-045 Forgotten Signpost`, `UNL-049 Honeyfruit`,
`SFD-117 Ancient Henge`, `UNL-093 Dragonsoul Sage` or the two Seals, so none is played on your turn,
and their [Reaction] abilities need them on the board already.

Two cards in that line: any two of Combat Experience, Flurry of Blades and Friendship (cast while the
Poro lives) put the Initiate at 5 or the Skulker at 5 damage, and it trades. Here to Help with a unit
in hand is the other.

**Your T4 has no window.** They spent all seven runes on Lee on their T3. Lee carries no buff, and
their two buffed units died on your T3, so Wallop costs its two runes. Nothing is hidden: a card
hidden at G on their T2 and not used is removed when you take G, 466.5.c: *"Remove all Hidden cards from
this Battlefield that do not share a controller with the Battlefield."* A card hidden at G on their T3
would need a rune they did not have.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their two turns. The Initiate drew nothing. One answer run three times
is among them in **40.30%**; two of them in three copies each (six cards), **66.05%**; three (nine
cards), **81.80%**. These count only the cards named, not how many of the eight a deck runs.

## 6. Verdict

**Right about the order; silent about which payment did the work.** The Mother's +2 resolves before the
Strike, and the two never contend for a target, as the entry says. Walked, the 5 was the half any card
in the trash pays for, and on its own it lost the fight. The +2 was the half only the Mother pays for.
It paid as Might the Skulker could take, not as damage it could deal: a 3 that would have died to the
Poro's 4 lived as a 5. That kept a body at G and a second one in base, and the second one was the T4
point. The engine's floor is your T3, going first, because the Strike needs an enemy unit at a
battlefield. The cheapest answer is one rune they hold back on their T2. Eight Calm/Body cards at one
rune stop the T3 Conquer, and Decree of Focus answers precisely a Fury spell.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos runes, Glorious
Executioner's two domains, in the twelve of Tournament Rules 402.1. Nothing costs Power before T4;
Draven's Fury is among eight runes in **all 495 deals**. The Accelerate comparison on T3 needs a Fury
among six: it fails in **1 of 924 deals, 0.11%**.

Their walk assumes six Calm and six Body. Lee's Body Power is among seven runes in **all 792 deals**.
For the answers, on your T3 with five runes channelled: the five at E1 with no Power take any rune.
Defy needs a Calm, and Unyielding Spirit and Repulse a Body: each fails in **6 of 792 deals, 0.76%**.
In the two-rune line, Rune Prison and Not So Fast need a Calm, and Cannon Barrage a Body:
**6 of 792, 0.76%** each. Punch First needs two Body: **96 of 792, 12.12%**. Hiding costs [A], any
rune.

Hiding a card recycles a rune for its [A] (164.2.b, *"Recycle this: [Reaction] — Add [C]."*), so in
that line they have six runes on their T3, and Lee cannot enter ready. Past your T3 that line is not
walked. Neither is a line that holds back three runes or more, going second, the mulligan, or 2v2.
Their hand holding no answer is the walk's assumption; §5 prices it. The probabilities count only the
cards named.

## Leads

- `netPerIteration` says *"-1 card"* and `terminatesIn` *"for one card and 4 Energy"*. An iteration
  spends two cards from hand, the Strike and the Mother. Glorious Executioner (`SFD-185`), one of the
  five legends the entry lists, draws one back when the combat is won (466.3.a), as on the walk's T3.
- The notable *"against a defender the +2 Might you just added is +2 more assigned damage in the same
  combat (465.2.b, 465.2.c)"*: on your own turn the unit you pump is an attacker, summed by 465.2.a;
  465.2.b sums defenders. The +2 is also +2 to what kills it (143.2.a), and in the walk that was the
  half that paid: a 5-Might Skulker took the Poro's 4 and lived.
- The 5 is the discard, not the Mother: any card in hand pays the optional cost (356.2.b.1). What only
  the Mother adds is the +2 for E1, and it is worth something only in a combat that turn. Paid with a
  dead card, the walk's T3 Strike kills one defender and loses the fight.
- No answer is named. `VEN-040 Decree of Focus` (Calm, E1) gives +4 to a unit *"being chosen by an
  enemy Fury spell"*, which Ruthless Strike always is. Eight of the eleven one-rune Calm/Body cards in
  §5 stop the walk's T3 Conquer.
- Step 2's *"on your turn or inside a Showdown on theirs"* does not say when the first target exists.
  The Strike needs an enemy unit at a battlefield. Going first, your T2 has none unless they spent two
  cards on their T1 to make a unit ready: their T1 units are in base, exhausted (143.4), and in
  Calm/Body no single card does it for three runes (§2). On their turn the Strike needs four runes
  left ready through yours.
