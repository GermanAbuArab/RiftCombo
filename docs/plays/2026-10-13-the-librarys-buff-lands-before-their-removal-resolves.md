# Play — the Library's buff lands before their removal resolves

Issue #323 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `karma-forgotten-library-spell-buff`**, the Order ENGINE in which `UNL-211 Forgotten
Library` gives a [Predict] for every spell that spends four Energy, and recycling the card fires
`OGN-235 Karma, Channeler` for a +1 buff. The entry is right about the arithmetic: one buff per
qualifying spell, capped by the unbuffed bodies. It frames the spell as a Main Phase action. Walked as a
game, the Library fires on any turn you play a spell, and Order's cheapest way to spend four is a
[Reaction]: `SFD-151 Bonds of Strength` with its [Repeat]. Cast in answer to their removal, the buff
resolves before the removal does, and on their T4 it is the one point of Might that keeps a body alive.
The battlefield the entry calls free is in play in one Duel game in three.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `7695ecf`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 49 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 53 (a hit on *first*), second in the list. The other entry of this slice is rank 52, the
same battlefield with `UNL-089 Jhin, Meticulous Killer`, played in
[Jhin is in every game, and the Library in one in three](2026-10-13-jhin-is-in-every-game-and-the-library-in-one-in-three.md).
Karma with a [Repeat] spell is played in
[play the bodies before the spell](2026-10-05-play-the-bodies-before-the-spell.md), which also walks
her own [Vision] firing her on entry.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Order in its pair (103.1.b); here `OGN-261 Radiant Dawn` (Calm/Order), idle in the walk |
| **The battlefield** | `UNL-211 Forgotten Library`, one of your three, **selected for this game** and controlled |
| **The payoff** | `OGN-235 Karma, Channeler` (Order, E6 + 1 Power, M6), on the board |
| **The spell** | any spell that spends 4 Energy or more; here `SFD-151 Bonds of Strength` (Order, E2, [Repeat] 2 Energy) |
| **Bodies** | a friendly unit **without a buff** for every buff you want |

The card text the play turns on:

- Forgotten Library (Colorless battlefield): *"While you control this battlefield, when you play a
  spell, if you spent :rb_energy_4: or more, [Predict]. (Look at the top card of your Main Deck. You may
  recycle it.)"*
- Karma, Channeler (Order, E6 + 1 Power, M6): *"[Vision] (When you play me, look at the top card of your
  Main Deck. You may recycle it.) When you recycle one or more cards to your Main Deck, buff a friendly
  unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff. Runes aren't cards.)"*
- Bonds of Strength (Order, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) [Repeat] :rb_energy_2: (You may pay the additional cost to repeat this spell's effect.) Give
  two friendly units each +1 :rb_might: this turn."*

## 2. The battlefield is one game in three

485.5: *"Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are
removed and will not be used for this game."* The Library costs no Main Deck slot, and it is still one
of the three battlefields you bring, on the table in one Duel game in three. In a best-of-three match
you choose it, and 486.5 removes it after a game somebody won: *"After this game, if a player won, the
Battlefields that were used are to be removed and not selected again for this Match."* Then it has to
be taken, 190.6.d: *"If the battlefield has no Controller, “you” refers to no one, and all such
instructions are ignored."* Here it is your battlefield A, yours from the T2 Conquer.

## 3. The cheapest Order spend is a Reaction

**Four Energy, no Power.** The [Repeat] is spent to play the spell, 820.1.c.1: *"The Cost is an
Additional Cost to be paid during the steps of playing the spell or ability."* So Bonds with its Repeat
spends four Energy and recycles no rune. `OGN-229 Vengeance`, Order's other way to spend four, also
costs two Order Power: two runes off the board, 161.2.b: *"When a Rune is Recycled it is returned to the
Rune Deck, not the Main Deck."*

**The Library does not care whose turn it is.** Its trigger is *"when you play a spell"*, and Bonds is
playable *"any time"*. The runes you leave ready on your turn are still ready on theirs, 415.3.a: *"A
player Readies all non-spell Game Objects they Control during the Awakening Phase on their turn."*

**The order inside the chain.** Their removal is on the chain; you answer with Bonds; the Library's
trigger goes above Bonds, 383.3: *"When a Condition is met, a Triggered Ability behaves like an
Activated Ability and is placed on the Chain."* Then 340.1: *"The newest Finalized Chain Item
resolves."* The Predict resolves first. Recycle the card and Karma triggers, and her trigger is newer
than Bonds, so the buff lands next, then Bonds, then their removal. Her target is chosen when the
trigger is put on the chain, and 402.4.b makes it compulsory: *"If there are legal options to choose,
the ability’s controller must choose them. They may not decline this stage of playing a Trigger."* A
unit that already has a buff gains nothing, 702.3.a: *"If a Buff is added, or instructed to be added,
on a Unit that already has a Buff, it is not placed instead."*

**Bonds' two executions can share a unit.** 820.2.a: *"Choices made for the additional execution do
not have to be the same as the choices made for the initial execution."* Each execution needs two
friendly units, and the same unit can be one of the two both times: +2 on it this turn.

## 4. Their order: B, bodies, and a removal spell a turn

Fury/Chaos under `SFD-185 Glorious Executioner`, whose *"When you win a combat, draw 1"* is idle in a
game with no combat. They take B on their T2 and build it. Neither side's bodies can reach the other
battlefield: a Standard Move goes from base to a battlefield or back (144.4.a, 144.4.b), and only
Ganking moves a unit between battlefields (144.4.c.1). So they answer A with spells. Theirs is
`OGN-024 Void Seeker` (Fury, E3 + 1 Power): *"[Action] (Play on your turn or in showdowns.) Deal 4 to a
unit at a battlefield. Draw 1."*

## 5. The turns, going first

Calm/Order against Fury/Chaos. Your rune deck is six Calm and six Order. Your opening four are Daring
Poro, Trusty Ramhound, Karma and Bonds of Strength. The draws are Soaring Scout on T1, Honest Broker on
T2, Unsung Hero on T3 and a second Soaring Scout on T4. The Library is your battlefield A this game.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base.                                 0
their T1        Shipyard Skulker (E3) to base, on the 485.7 extra rune.
                All three spent.
T2      4       Poro walks to A, Conquer: +1. You control the Library.    1
                Trusty Ramhound (E2) and Soaring Scout (E2) to A. All
                four spent. A is six Might: 2, 3, 1.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to B. B is eight Might. All five
                spent.
T3      6       Hold A: +1. Karma (E6 + 1 Order) to base: six tapped, a   2
                tapped Order recycled. Five runes. Her Vision: the top
                card is a second Daring Poro, recycled. Karma fires:
                buff Karma, Might 7.
their T3        Hold B. Void Seeker (E3 + 1 Fury) on Ramhound at A: four
                damage, he dies in the Cleanup, they draw 1. A Traveling
                Merchant and a second Mystic Poro (E2 each) to B. All
                seven spent, one Fury recycled.
T4      7       Hold A: +1. Honest Broker (E2) to A. Four runes held      3
                ready, one spare. A is five Might: Poro 2, Scout 1,
                Broker 2.
their T4        Hold B. Void Seeker on Broker at A. You answer with
                Bonds of Strength and its Repeat: four ready runes
                exhausted. Choices: Broker and Poro, then Broker and
                Scout. The Library's Predict resolves: recycled. Karma
                fires: buff Broker, Might 3. Bonds resolves: Broker 5.
                Void Seeker resolves: four damage, Broker lives, they
                draw 1. A third Skulker (E3) and a second Traveling
                Merchant (E2) to B. All eight spent, one Fury recycled.
```

Their points: 1 on T2, 2 on T3, 3 on T4. After their T4 it is 3 to 3.

**What the Library bought on their T4 is Broker.** Without it, Bonds and its Repeat make him 2 + 2 =
4, and Void Seeker's four is lethal. With it, the buff resolves first and he is 5. At the end of their
turn the damage goes before the +2 does: 317.2.b, *"Insert “3c. Heal all Units.”"*, ahead of 317.2.c,
*"Insert “3d. All ‘this turn’ effects expire simultaneously.”"* He ends the turn at Might 3 with no
damage, and their Void Seeker was one card for one card drawn.

**What T3's buff bought is Karma.** Every body at A, buffed or not, is inside Void Seeker's four:
Ramhound would be 4, the Poro 3, the Scout 2. A buff there only changes which one they pick. On Karma
at base it takes her to 7, past the two cheapest Fury answers that reach a base: `OGN-033 Shakedown`'s *"Deal 6"* and `OGN-029 Falling Star`'s *"Deal 3 to a unit. Deal 3
to a unit."* Void Seeker reads *"at a battlefield"* and cannot reach her at all.

**What it cost.** Karma took all six runes on T3, so nothing was held for their T3, and Ramhound died
unanswered. On T4 the four held runes are four not spent on Unsung Hero and the Scout, which are still
in hand. The Library repays the hold only if they cast a removal spell into it; had they played bodies
instead, Bonds is still a Predict and a buff on Broker, on their turn, for four Energy.

**The recycle is the price of the buff.** *"You may recycle it"*: the buff comes only from a card sent
to the bottom, 416.1, *"puts it on the bottom of the corresponding deck."* Had the top card on their T4
been the card you needed, keeping it costs Broker.

**How often this happens.** Karma has to be in the first seven cards and Bonds in the first eight:
with three of each, **21.7%** of games without a mulligan, and **8.4%** with the entry's one Karma. With
the Library in play as well, one game in three by 485.5, that is **7.2%** and **2.8%**.

## 6. Breaks to

**The line breaks to `OGN-033 Shakedown`** (Fury, E2 + 1 Power: three resources), cast in answer to
Karma's own Vision on your T3: *"[Reaction] (Play any time, even before spells and abilities resolve.)
Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."* Karma is Might 6 until the
Vision resolves and the buff lands, so the choice is yours and both halves cost you: she dies, or they
draw two. Their price is two runes held ready through their T2, since the Power is any Fury rune
recycled, ready or tapped; here that is the Mystic Poro.

**Countering Bonds breaks the save and not the buff.** `SFD-136 Hard Bargain` (Chaos, E2): *"Counter a
spell unless its controller pays :rb_energy_2:."* With one spare rune you cannot pay, and Bonds is gone.
The Library's trigger was put on the chain when Bonds was played and resolves anyway, 425.1.c:
*"Countering does not refund any costs paid to play a card, activate an ability, or trigger an
ability."* Broker gets the buff, stands at 3, and Void Seeker kills him. Six ready runes pay the tax
as well, which on T4 means no Broker to protect.

**The Library breaks to losing A,** which 190.4.c does whenever your last unit there is gone: *"If a
player has no Units at a Battlefield and the turn is in an Open state, they lose Control of that
Battlefield in the following cleanup unless there is a Combat or Showdown ongoing there."*

## 7. Verdict

**Right about the cap, and the engine is a Reaction engine.** One buff per spell that spends four,
placed only on an unbuffed body, and only when you recycle. The play adds three things the entry does
not state. The Library is in play in one Duel game in three (485.5) and in at most one game of a
best-of-three (486.5): it costs no Main Deck slot, but it is not free. It fires on their turn as well
as yours, and Order's cheapest way to spend four is `SFD-151 Bonds of Strength` with its [Repeat], four
Energy and no rune lost, at Reaction speed. Cast into their removal, the buff resolves before the
removal does (340.1), and here it is the margin that keeps a Might-2 body alive against four damage.
And Karma's own Vision buff is best spent on Karma: at A it only moves their Void Seeker to another
body, and on her at base it puts her past every cheap Fury answer that reaches her.

## 8. Not verified

I did not deal the channel order. Karma's Order Power needs one Order rune among your first six; that
fails only when all six are Calm, 1 of the 924 deals, 0.1%. Bonds needs no Power. Their Void Seeker on
their T3 needs one Fury among their first seven runes, which six Chaos cannot fill, and on their T4 they
have channelled nine and recycled one Fury, so at least two Fury are on the board; neither fails. I did
not walk `OGS-001 Annie, Fiery`'s bonus damage or `UNL-020 Dancing Grenade`'s replays, either of which
can reach a Might-7 Karma at base; the top card on their T4 being one you would keep; a Shakedown held
on their T2; the mulligan; or 2v2.

## Leads

- The entry's first notable calls the Library *"THE ONLY ONE OF KARMA'S THIRTY-FIVE PARTNERS THAT
  REPEATS FOR FREE"* and its name says it *"costs no card and no deck slot"*. It costs no Main Deck slot;
  it is one of three battlefields, in play in one Duel game in three (485.5) and in at most one game of a
  best-of-three match (486.5).
- The entry's step 3 reads *"Cast a spell and SPEND 4 or more doing it"* and names no spell. Order's
  cheapest is `SFD-151 Bonds of Strength` with its [Repeat] (820.1.c.1): four Energy, no Power, and a
  [Reaction], so the Library fires on the opponent's turn and the buff resolves inside their removal's
  chain before the removal does (340.1).
- The entry's step 2 counts Karma's Vision as *"a possible first trigger"* and leaves the target open.
  Buffing Karma herself takes her to Might 7, past `OGN-033 Shakedown` and `OGN-029 Falling Star`, the
  two cheapest Fury spells that reach a unit at base.
