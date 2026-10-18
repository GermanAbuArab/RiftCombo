# Play — The Captain's draw is never a card behind his buff, and a two-drop played first is what turns the Initiate on

Issue #406 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `buhru-captain-kinkou-initiate-modal-cantrips`**, the Body ENGINE in which `SFD-091 Buhru
Captain` (E3 + 1 Body Power, M3) may *"draw 1 or buff me"*, and `UNL-097 Kinkou Initiate` (E3, M3) draws
when your other units total Might 5 or more. The entry is right that the Initiate's threshold is read
when its trigger resolves, so a body played earlier the same turn counts. It is wrong about what the
Captain's buff buys. Call S the Might of your other units besides those two. The draw mode gives one
card, plus the Initiate's when S is 2 or more; the buff mode gives the Initiate's card when S is 1 or
more. So the buff never draws more than the draw does. It ties only at S = 1, where it gives the same
one card plus a permanent +1 Might, and that card is the one an answer can still take. Walked as a game,
going first, against a Mind/Order Viktor deck that killed the Captain's partner on its T2, the Captain
took the draw on T2. On T3 `OGN-136 Pit Rookie`, the card he drew, went down first and buffed him, and
the Initiate drew at 7: **3 to 3** after their T4, with two cards in hand and no rune idle. The
honest control is the same deck with two vanilla 3-drops in the pair's slots. It ends **3 to 3** with an
empty hand and one rune idle. The entry's own advice, the buff on T2, ends **3 to 3** with one card,
one card fewer than the draw, though its extra Might is what refuses their best trade. The cheapest
answer costs one ready rune and no Power: `VEN-061 Decree of Insight`, on the Captain, in response to
the Initiate's trigger, takes the 7 to 3.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `4b613b4`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 15 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 86, the first in the list. The
other entry of this slice is rank 87, `consuming-curse-annie-self-scaling-bonus`, played in
[Three Incinerates kill Lux and one guard, the Curses kill Lux and two, and the third kill is the battlefield](2026-10-18-three-incinerates-kill-lux-and-one-guard-the-curses-kill-lux-and-two-and-the-third-kill-is-the-battlefield.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-267 Bounty Hunter` (Body/Chaos, tag Miss Fortune) |
| **Chosen Champion** | `OGN-162 Miss Fortune, Captain` (Body, E5 + 1 Body Power, M5), unplayed through T4 |
| **The engine** | `SFD-091 Buhru Captain` (Body, E3 + 1 Body Power, M3) |
| **The payoff** | `UNL-097 Kinkou Initiate` (Body, E3, M3) |
| **The cheap bodies** | `UNL-111 Determined Sentry` (Body, E1, M1), `OGN-136 Pit Rookie` (Body, E2, M2) |

The entry admits any of seventeen legends with Body in their pair. Bounty Hunter is the one for this
walk because its text plays no part in it: *":rb_exhaust:: Give a unit [Ganking] this turn. (It can
move from battlefield to battlefield.)"* The walk never uses it. Both cards are mono-Body, 103.1.b.3: *"If a card has a single Domain, then that card is
permitted in the Domain Identity that corresponds to the same Domain."* Every other card in the deck is
mono-Body or mono-Chaos. None is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`. The Chosen Champion is tagged
Miss Fortune, 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag on your
Champion Legend."* She stays in the Champion Zone through T4 in every line below, so she changes no
hand count.

The card text the play turns on:

- Buhru Captain: *"When you play me, you may draw 1 or buff me. (To buff a unit, give it a +1
  :rb_might: buff if it doesn't already have one.)"*
- Kinkou Initiate: *"When you play me, draw 1 if your other units have total Might 5 or more."*
- Pit Rookie: *"When you play me, buff another friendly unit. (If it doesn't have a buff, it gets a +1
  :rb_might: buff.)"*
- Determined Sentry: *"I can't move to base."*

## 2. What each mode buys, and when it is chosen

**The Initiate's threshold is part of its effect, not its condition.** 383.2.a.1: *"Any additional
conditional statement immediately after the Condition must be true in order for the Condition to be
fulfilled."* The Initiate's *"if"* is not immediately after *"When you play me"*: *"draw 1"* stands
between them. Riot's example under that paragraph has the same shape, and ends: *"conditional statement
is not immediately after the trigger condition, so it is part of the effect and not the condition."* So
the trigger always goes on the chain, and the sum is read as it resolves. The entry cites 359.3.f.2 for
the same conclusion: *"Information referenced in an instruction in this way will be checked on execution
of the instruction."* Both point the same way. *"Other"* keeps the Initiate's own 3 out.

**The trigger is the only window.** A unit does not wait on the chain, 337.2: *"If, after finalizing the
Chain Item, that item is a Unit, Gear, or an ability that Adds resources, it resolves immediately—Move to
Step 4: Resolve."* Its play effect goes on afterwards, 383.4.a.2: *"These Triggered Abilities are put on
the Chain as Pending Items after the Permanent these effects correspond to is finalized and enters the
board."* While the trigger waits the turn is closed, and only Reactions can be played, 309.1.a: *"Only
cards and abilities with the Reaction keyword can be played or activated in a Closed State."*

**The Captain's choice is made before anyone answers it.** His *"you may"* is the first part of the
effect. 402.1: *"If the first part of a Triggered Ability’s effect is “you may,” or “they may,” its
controller decides whether or not to perform the Triggered Ability now."* That is the finalization step.
Draw or buff is decided at the same step, by this play's reading of 402.2: *"Make all choices required
for this ability, such as targets, modes, or other relevant decisions."* §7 says what changes if it is
read the other way; nothing in the walk does, because nobody answers the Captain's trigger.

**A buff is +1, once.** 703: *"Each Buff individually contributes +1 Might to a Unit."* 702.3: *"There
can only be one Buff on a Unit at a time."* 702.3.a: *"If a Buff is added, or instructed to be added, on
a Unit that already has a Buff, it is not placed instead."* So a Captain who took the buff gains nothing
from Pit Rookie, and a Captain who took the draw is Pit Rookie's best target.

**The closed form.** Let S be the Might of your other units besides the Captain and the Initiate, read
when the Initiate's trigger resolves. The Initiate sees S + 3 under the draw mode and S + 4 under the
buff mode.

| S | draw mode: cards | buff mode: cards | buff mode: extra |
|---|---|---|---|
| 0 | 1 (the Captain's) | 0 | +1 Might |
| 1 | 1 (the Captain's) | 1 (the Initiate's) | +1 Might |
| 2 or more | 2 | 1 (the Initiate's) | +1 Might |

The buff mode is never ahead in cards. At S = 1 it ties, and it trades a card already in hand for a
card still on the chain. Against a -1 answer to the Initiate's trigger the rows shift by one: the draw
mode gives 1 + [S ≥ 3] and the buff mode [S ≥ 2], so the draw mode is still never behind. And any
2-Might body played before the Initiate adds the same +1 to the sum that the buff adds, and more.

**Where the bodies stand does not matter to the sum.** The words *"your other units"* have no location clause, so
units in base count. Most cheap removal says *"at a battlefield"* and cannot reach them; §5 counts it.

**The runes, going first.** You have 2, 4, 6 and 8 runes channelled by T1 to T4. Power is paid by
recycling a rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* A rune exhausted for Energy can be
recycled for the Power, so the Captain is three runes, one of them a Body rune recycled. It goes to the
bottom of the Rune Deck, 416.1: *"Recycling cards is the action in which a player takes one or more
cards from a specific zone and then puts it on the bottom of the corresponding deck."* So you have one
rune fewer on the board from then on. Captain and Initiate on one turn is six runes, so T3; Captain on
T2 with the Sentry is exactly four.

## 3. Their deck: Mind/Order Viktor

`OGN-265 Herald of the Arcane` (Mind/Order): *":rb_energy_1:, :rb_exhaust:: Play a 1 :rb_might: Recruit
unit token."* Its Chosen Champion is `OGN-117 Viktor, Innovator` (Mind, E4 + 1 Mind Power, M3). Their
bodies are `OGN-210 Daring Poro` (Order, E2, M2; *"[Assault] (+1 :rb_might: while I'm an attacker.)"*),
`SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you have another unit here, I have +1 :rb_might:."*),
`UNL-154 Crimson Pigeons` (Order, E3, M3) and `OGN-087 Lecturing Yordle` (Mind, E3, M2; *"[Tank] (I must
be assigned combat damage first.) When you play me, draw 1."*). Their removal is `SFD-162 Blood Money`
(Order, E2): *"[Action] (Play on your turn or in showdowns.) Kill a unit at a battlefield with 2
:rb_might: or less. If it was an enemy unit, play a Gold gear token exhausted. If it was a friendly unit,
play two Gold gear tokens exhausted."* And they hold `OGN-095 Stupefy` (Mind, E1): *"[Reaction] (Play any
time, even before spells and abilities resolve.) Give a unit -1 :rb_might: this turn, to a minimum of 1
:rb_might:. Draw 1."* Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The
player going second channels an extra Rune from their Rune Deck during their first Channel Phase of the
game."* §5 names their answers.

## 4. The turns, going first

Body/Chaos against Mind/Order. Your battlefield is A, `OGN-278 Bandle Tree` (*"You may hide an
additional card here."*); theirs is B, `OGN-281 Hallowed Tomb` (*"When you hold here, you may return your
Chosen Champion from your trash to your Champion Zone if it is empty."*). Nothing in the walk uses
either. Your opening four are `SFD-099 Veteran Poro` (Body, E2, M2), Determined Sentry, Buhru Captain
and Kinkou Initiate. Your draws are `UNL-092 Demacian Diplomat` (T1), `OGN-175 Shipyard Skulker` (T2),
`SFD-096 Laurent Bladekeeper` (T3) and `OGN-130 Crackshot Corsair` (T4); the two trigger draws are Pit
Rookie (the Captain's, T2) and `SFD-098 Sea Monkey` (the Initiate's, T3). Their opening four are Daring
Poro, Blood Money, Crimson Pigeons and Stupefy. Their draws are Trusty Ramhound (T1), Lecturing Yordle
(T2), `SFD-066 Frigid Touch` (T3) and `SFD-163 Deathgrip` (T4); Yordle draws `OGN-216 Soaring Scout`.

```
turn    runes   your turn                                                 points
T1      2       Veteran Poro (E2) to base. None left.                     0
their T1  3     Daring Poro (E2) to base. Herald (E1): a Recruit to
                base. None left.
T2      4       The Poro walks to A, Conquer: +1. Determined Sentry       1
                (E1) to A. Buhru Captain (E3 + 1 Body Power) to A,
                draw 1: Pit Rookie. Four runes, one recycled; none
                left.
their T2  5     The Daring Poro and the Recruit walk to B, Conquer.
                Blood Money (E2) kills your Poro at A; a Gold token
                for them. Trusty Ramhound (E2) to B. One left.
T3      5       Hold A: +1. Pit Rookie (E2) to A, buffing the Captain     2
                to 4. Kinkou Initiate (E3) to A: the others are
                1 + 4 + 2 = 7, draw 1: Sea Monkey. None left.
their T3  7     Hold B. Crimson Pigeons (E3) and Lecturing Yordle (E3)
                to B; Yordle draws. One left.
T4      7       Hold A: +1. Demacian Diplomat (E2), Sea Monkey (E2)       3
                and Laurent Bladekeeper (E3) to A. None left.
their T4  9     Hold B. Viktor, Innovator (E4 + 1 Mind Power) from the
                Champion Zone and Soaring Scout (E2) to B; Herald
                (E1): a Recruit to B. Nine runes, one recycled; two
                left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Poro; 5 after the T2 draw, 3 after the Sentry
and the Captain, 4 after his draw; 5 after the T3 draw, 3 after Pit Rookie and the Initiate, 4 after
its draw; 5 after the T4 draw, 2 after the Diplomat, the Sea Monkey and Laurent (Shipyard Skulker,
Crackshot Corsair). Theirs: 5 after the T1 draw, 4 after the Daring Poro; 5 after the T2 draw, 3 after
Blood Money and the Ramhound (Crimson Pigeons, Stupefy, Lecturing Yordle); 4 after the T3 draw, 2 after
the Pigeons and Yordle, 3 after Yordle's draw; 4 after the T4 draw, 3 after the Scout, since Viktor comes
from the Champion Zone (Stupefy, Frigid Touch, Deathgrip).

**Your T2: the Captain takes the draw.** The Poro takes A, which is empty, 316.8.b.1: *"Showdowns that
occur as a result of a player moving to an empty Battlefield are a stand-alone Phase and do not create a
Combat."* Nobody else is there, so you take control, 348.2.a: *"If only one player’s Units remain at the
Battlefield, and if that player does not already Control the Battlefield, that player establishes Control
over the Battlefield."* That is a Conquer, 348.2.a.1: *"This results in a Conquer if that player has not
yet scored that Battlefield this turn."* The Sentry and the Captain go to A, now yours, 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."* The
Captain's runes are three, a Body one recycled for the Power, and the Sentry's is the fourth. At this
moment S, for an Initiate you cannot yet cast, is the Poro and the Sentry: 3. The draw is right on that
row of §2, so you draw Pit Rookie. A is 2 + 1 + 3 = 6. Their ready units are the Daring Poro and the
Recruit, an attack of 3 + 1 = 4, so A is safe from a fight. They have no ready rune on your T2, so
nothing answers the trigger.

**Their T2: they take B and kill the 2.** The Daring Poro and the Recruit walk into B, which is empty, for
a Conquer (316.8.b.1, 348.2.a, 348.2.a.1). Blood Money kills your Veteran Poro at A: the Poro and the Sentry
are the two units there at 2 Might or less, and the Poro is the bigger. They get a Gold token, exhausted. The
Ramhound goes to B, a 3 with company there. B is 2 + 1 + 3 = 6. They keep one rune ready, which on your
turn pays for Stupefy. The Gold token cannot help: it entered exhausted, and its Power ability needs
:rb_exhaust:, so it is no use before their T3.

**Your T3: a body first, then the Initiate.** Your runes are 3 + 2 channelled = 5, all ready, 315.1.b:
*"1. The Turn Player readies all Game Objects they control that are able to be readied."* You Hold A,
469.2: *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their
Beginning Phase."* S is now the Sentry alone, 1, and the Captain is a 3: the Initiate played first would
see 4 and draw nothing. Five runes are exactly a 2-drop and the Initiate. Pit Rookie goes first, to A,
and buffs the Captain to 4 (703). Then the Initiate, to A. Its trigger reads the Sentry 1, the Captain 4
and the Rookie 2: **7**, and it draws Sea Monkey. Their one ready rune pays for Stupefy, and Stupefy
takes the 7 to 6, which still draws, so they keep it. A is 1 + 4 + 2 + 3 = 10.

The Diplomat first would have made it 1 + 3 + 2 = 6, which draws too, and survives Stupefy at 5. Pit
Rookie is the better 2-drop here because its buff goes where the Captain's would have gone, on top of a
body.

**Their T3 and your T4.** They Hold B and build there: B is 2 + 1 + 3 + 3 + 2 = 11. Their units at B
cannot reach A, 144.4.b: *"Units may move from a Battlefield to their Base."* Your units at A cannot
reach B either, and 10 against 11 would lose anyway. On your T4 you Hold A and spend all seven runes on
three bodies. On their T4 they Hold B. Nobody fights through T4.

**The entry's advice: the buff on T2.** Its first step says to choose *"'buff me' when the trigger
resolves if you intend to play the Initiate soon"*. The same game with that choice: no Pit Rookie in
hand, and A is 2 + 1 + 4 = 7. Blood Money takes the Poro, and the 5 left refuses their attack (their
other line, below). Your T3 draw is now Pit Rookie. It buffs the Sentry to 2, since the Captain already has one
(702.3.a), and the Initiate reads 2 + 4 + 2 = 8 and draws Laurent. On T4 you play the Diplomat, the Sea
Monkey and Laurent. **3 to 3** after their T4, with one card in hand (Shipyard Skulker) against the draw
line's two, and 18 Might at A against 17. The buff mode cost the card the draw mode keeps, and bought
one Might, here on the Sentry.

**The honest control: the same deck with two vanilla 3-drops.** Put a Shipyard Skulker (Chaos, E3, M3,
*"(no text)"*) in each of the pair's slots. Same 3 Might each, no Power, no draw. T2: the Poro takes A;
a Skulker and the Sentry go to A, four runes, nothing recycled; A is 6. Their T2 is the same: B, and
Blood Money on the Poro. T3 has six runes: two Skulkers to A. T4 has eight: Laurent, the Diplomat and
Pit Rookie, which are the only cards left, with one rune idle. **3 to 3** after their T4, with an empty
hand and 18 Might at A. The engine line is the same score with two cards in hand and one rune fewer.
What the pair buys by T4 is two cards and nothing on the board. They are worth something only from T5,
when the control is drawing one card a turn and playing all of it.

**The other ordering: Skulker on T2, both on T3.** The Skulker and the Sentry on T2, nothing recycled.
After Blood Money, S is the Skulker and the Sentry, 4. On T3 the Captain takes the draw (three runes, one
recycled) and the Initiate reads 4 + 3 = 7 (three runes): two cards by T3 again. It is the same count a
turn later for the first card, and Pit Rookie arrives too late to be the T3 play.

**Their other line: the trade.** Blood Money on the Poro, then the Daring Poro and the Recruit attack A
instead of taking B. 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage equal
to their summed Might among the other's Units."* Their 3 + 1 against your Sentry 1 and Captain 3: four
each way, and everything dies. A becomes nobody's, 466.5.b: *"If there are no Units remaining here
controlled by any player, the Battlefield becomes Uncontrolled."* Crimson Pigeons, with their last three
runes, goes to their base. **1 to 0** after their T2. Your T3 has no unit and no battlefield: S is 0, and
the Initiate cannot draw this turn. Laurent and Pit Rookie (buffing Laurent to 4) go to base. Their
Pigeons takes B on their T3, which is empty, and the Ramhound and Yordle join it: B is 3 + 3 + 2 = 8.
On your T4 Laurent and the Rookie walk into A, which is empty, for a Conquer. Then the Diplomat, and the
Initiate reads 4 + 2 + 2 = 8 and draws; Sea Monkey with the last two runes. They Hold B: **2 to 2** after
their T4, with your hand at two cards (Shipyard Skulker, Crackshot Corsair) as in the walk. The trade
delays the Initiate's card by a turn and costs each side a point. It does not deny the card, and it costs
them Blood Money and both their units.

Under the buff mode it fails. After Blood Money A is the Sentry 1 and the Captain 4, five against their
four. They kill the Captain or the Sentry, lose both attackers, and A stays yours. That is what the buff
is for on this board: not a card, but the one Might that turns a four-for-four trade into a loss for the
attacker.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first, you
have seen **6** cards by T2 and **7** by T3 (four opening, one draw a turn from T1). With three copies
(103.2.b: *"Your Main Deck can include up to 3 copies of the same named card."*), a Buhru Captain by T2
is **40.30%**, a Kinkou Initiate by T3 **45.73%**, and both **16.89%**. These are unconditional: they
price drawing the two cards at all, not the walked hand around them.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 the Initiate's trigger read 7 and drew. On T2 the
Captain drew. The Captain's card cannot be taken: *"draw 1"* has no condition, and nobody had a ready rune.
So the predicate is: cast or played before the Initiate's trigger resolves on your T3, does it leave your
other units below 5 at that moment, against your best T3?

**The scope.** A Mind/Order deck plays only Mind, Order and Mind/Order cards (103.1.b.1), and its Signature
cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the Champion tag that
corresponds to the Champion Legend of the deck."* Herald of the Arcane's tag is Viktor. The predicate is:
a card in `data/cards.json` whose domains are all Mind or Order, not a legend, battlefield, rune or
token, and not a Signature card with another champion's tag. Folded by name, that is **253** cards.
Three Signature cards are out (`OGS-022 Final Spark`, Lux; `SFD-202 Hostile Takeover`, Renata Glasc;
`UNL-200 Mirror Image`, LeBlanc); Viktor's own `OGN-266 Siphon Power` is in. None of the 253 is banned.

**Window 1: their T2, before your T3. Three runes, after Blood Money.** Your best T3 adds Pit Rookie and
its buff, 3 Might, so the break needs your surviving units at 1 or less: the Captain and the Poro both
gone. Blood Money took the Poro. The Captain, a 3 at A, dies to any of these, each read, from the 253
swept sentence by sentence, reminder text (anything in parentheses) stripped, for the regex
`/\b(kill|banish|deal \d+|return\b.*\bto (?:its owner's |their owner's |)hand|move an enemy unit|take control of an enemy unit)\b.*\b(units?|it|them)\b|\bunits?\b.*\b(kill|banish|deal \d+|return)\b/i`
(47 cards; the *it* and *them* catch a sentence like *"Then kill it"*, and the second half a kill that
comes after the unit). Twenty of the 47 cost three Energy or less; the rest are out of reach of three
runes. Of the twenty, these kill the Captain:

- `UNL-159 Soul Harvest` (Order, E2 + 1 Order Power): *"Kill a unit at a battlefield with 3 :rb_might: or
  less."* Two runes, one recycled. With Blood Money it is four runes and two cards. They still take B
  with the other units.
- `VEN-127 Lacerate` (Order, E2 + 1 Order Power): *"Choose a unit. If it's [Empowered], disempower it.
  Then kill it if it has 3 :rb_might: or less."* The same two runes, and it names no location, so it
  reaches a unit in base too.
- `OGN-213 Hidden Blade` (Order, E2 + 1 Order Power, from hand as an [Action]): *"Kill a unit at a
  battlefield. Its controller draws 2."* The same two runes. It breaks the Initiate's card and gives you
  two.
- `SFD-070 Wages of Pain` (Mind, E3) deals 3, `VEN-059 Shock Blast` (Mind, E3 + 1 Mind Power) deals 4, and
  `UNL-072 Crescent Strike` (Mind, E3 + 1 Mind Power) deals 4 to the Captain and 1 to the Sentry. Three
  runes each.
- The trade above: Blood Money and two units, and A for nobody.

**Soul Harvest, Lacerate and Hidden Blade tie at two runes, one recycled: the cheapest spells in this
window.** None of them denies the card. Each leaves A's survivors at the Sentry or nothing, so your T3 is Laurent
and Pit Rookie instead, and on T4 the Initiate reads Laurent 4, the Rookie 2 and a Diplomat played first:
8, or 9 with the Sentry. **Window 1 moves the Initiate's card to T4.** Under the buff mode Soul Harvest cannot choose the Captain
at 4, Lacerate chooses him and does not kill him, and the trade loses. Hidden Blade, Shock Blast and
Crescent Strike still kill him; Wages of Pain's 3 does not. The other fourteen of the twenty kill only
their own unit or gear (`SFD-163 Deathgrip`, `UNL-173 Sacrifice`, `OGN-242 Baited Hook`, `SFD-178 Blade
of the Ruined King`, `VEN-124 Escaped Grayback`, `UNL-161 Divining Shells`), reach only a Chaos unit (`VEN-131
Decree of Unity`), deal too little or not on their turn (`SFD-080 Bellows Breath`, 1 to each of up to three
units, 2 with its [Repeat]; `OGN-121 Teemo, Strategist`, whose damage comes only when he defends), return the unit to the board (`VEN-066
Temporal Breach`, `OGN-102 Portal Rescue`, which chooses a friendly unit), or kill nothing of yours
(`SFD-090 The Zero Drive`, `VEN-133 Glowstone`); and Blood Money, already spent, reaches only Might 2
or less.

**Window 2: on the chain, in answer to the Initiate's trigger. One ready rune and any Power.** Only
Reactions (309.1.a). Among the 253, **48** have [Reaction], [Hidden] or [Ambush] in their text,
reminder text included, or begin with *Hidden (*. That is a ceiling: it counts gear whose ability is a
Reaction and `UNL-073 Deadly Flourish`, matched only in its Gold token's reminder text. Hidden cards are
out: they can be hidden only at a battlefield they control, and a hidden spell's targets must be chosen
there, 811.1.d.2: *"If a hidden spell or a play effect of a hidden permanent chooses any targets, those
targets must be chosen from among options at that battlefield, unless the ability explicitly restricts
targeting in a way that makes this impossible."* All your units are at A. [Ambush] needs units of theirs
at A, and they have none. They have one ready rune, and any of their five runes can be recycled for
Power. Of the 48, eight cost one Energy or less. **One breaks the line:**

- **`VEN-061 Decree of Insight`** (Mind, E1): *"[Reaction] (Play any time, even before spells and
  abilities resolve.) Ignore [Deflect] while paying this spell's cost. Give an enemy Body
  (:rb_rune_body:) unit -5 :rb_might: this turn."* On the Captain, 4 becomes -1, which counts as 0,
  143.2.b: *"If a unit's Might is ever less than 0, it is treated as 0 when referenced by spells and
  abilities, and when summing Might to be assigned as damage in the Combat Damage Step."* The sum is 1 + 0
  + 2 = 3, and the Initiate draws nothing. **One ready rune and no Power: the cheapest answer.** It has to
  choose the Captain: on Pit Rookie it leaves 5, which still draws.

The other seven do not:

- `OGN-095 Stupefy` stops at a minimum of 1 and takes 1 at most: 6. `VEN-052 Mesmerize` gives -2 to an
  enemy unit: 5.
- `OGN-104 Retreat` and `UNL-173 Sacrifice` choose their own units. `OGN-120 Seal of Insight`, `OGN-245
  Seal of Unity` and `SFD-064 Cloth Armor` are gear, and none is on the board.

With **three** ready runes, by keeping the Ramhound in hand on their T2, two more break it.
`OGN-093 Smoke Screen` (Mind, E2 + 1 Mind Power) gives -4 to a minimum of 1: the Captain 1, the sum 4.
`UNL-063 Eclipse` (Mind, E3) gives -4 with no minimum: the sum 3. `SFD-066 Frigid Touch` is -2 for two
runes, 5, and its [Repeat] needs four. `OGN-266 Siphon Power` gives -1 to each enemy unit at A, to a
minimum of 1: 1 + 3 + 1 = 5.

**Playing around it.** Decree of Insight reaches only a Body unit and only one, and it takes at most the
Might of that unit off the sum. So the answer is a bigger sum, which means the Initiate on T4. Pit Rookie,
the Diplomat and the Initiate all on T4 are 2 + 2 + 3 = seven runes, the whole of the walk's T4, and the
Initiate reads 1 + 4 + 2 + 2 = 9; Decree on the Captain leaves 5. But that leaves T3 five runes and only
3-drops in hand (Laurent, the Skulker): one of them, and two runes idle. The order that costs nothing is
the Diplomat and Laurent on T3 (five runes), then Pit Rookie on the Captain and the Initiate on T4 (five of
seven): the Initiate reads 1 + 4 + 2 + 3 + 2 = 12, and Decree on the Captain leaves 8, on Laurent 9. Sea
Monkey, drawn, takes the last two runes. That is the walk's board and the walk's two cards in hand at the
end of T4, with the Initiate's card a turn later. An unbuffed Captain on their T3 is in reach of Soul
Harvest and Lacerate again, and the sum on T4 without him is still 1 + 2 + 3 + 2 + 1 (the Rookie's buff
on another unit) = 9. Against a held Decree the Initiate is a T4 play, and the Chaos Skulker is a body
Decree cannot touch.

## 6. Verdict

**Right about the timing; wrong about the buff.** The Initiate's threshold is part of its effect
(383.2.a.1), read when the trigger resolves, so a body played first counts. But the Captain's buff
never draws more than his draw: it ties at S = 1 and loses a card at S = 2 or more, and any 2-Might body
played before the Initiate adds what the buff adds. Walked against a Viktor deck that killed the
Captain's partner, the draw on T2 and Pit Rookie first on T3 made two cards by T3 and **3 to 3** after
their T4, with two cards in hand. The buff on T2 ends **3 to 3** with one. Two vanilla 3-drops in the
pair's slots end **3 to 3** with none and a rune idle. So the pair is worth two cards by T4 and no point,
and it pays from T5. The buff has a real use the entry does not name: the +1 Might that keeps the
Captain out of Soul Harvest's and Lacerate's range and turns their best trade into a loss. The cheapest answer is
Decree of Insight, one ready rune and no Power, on the Captain in answer to the Initiate's trigger: the
7 becomes 3.

## 7. Not verified

I did not deal the channel order. The walk assumes six Body and six Chaos runes for you, Bounty Hunter's
two domains, in the twelve of Tournament Rules 402.1. The Captain on T2 needs a Body among the four
channelled: it fails in **28 of 924 deals, 3.03%**. The other ordering of §4 puts the Captain on T3
instead, which needs a Body among the six channelled: it fails in **1 of 924, 0.11%**. Nothing else in
any of your lines needs Power, and the control needs none at all: **0 of 924**.

Their walk assumes six Mind and six Order. Herald, Blood Money, Stupefy and Decree of Insight need no
Power, and Viktor's Mind Power among nine runes cannot fail: **0 of 924**. Soul Harvest, Lacerate or Hidden
Blade on their T2 needs an Order among five: it fails in **7 of 924, 0.76%**. Smoke Screen needs a Mind among
five on your T3: **7 of 924, 0.76%**.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their two turns. Decree of Insight, run three times, is among them in
**40.30%**. Soul Harvest has to be seen by their T2, which is the same six cards: **40.30%**. Either of
the two (six cards), **66.05%**. Any of the three two-rune kills of Window 1 (nine cards) by their T2,
**81.80%**. Like §4's, these are unconditional: they count only the cards named, not how many of them a
deck runs, and not the rest of the walked hands.

**The draw-or-buff choice is read as a 402.2 decision.** If instead it is made on resolution, an answer
to the Captain's own trigger could change it: under the buff mode, a kill in response would leave you
free to draw instead. No line here answers that trigger, so nothing above moves.

Not walked: going second, the mulligan, 2v2, Miss Fortune, Captain from the Champion Zone on T4 (five
runes in either line, which moves both hands alike), Bounty Hunter's [Ganking] (no fight on T4 is worth
it at 10 against 11), a second Captain or Initiate, and T5 on, where the two cards would be spent. The
probabilities count only the cards named.

## Leads

- Step 1, *"Choose 'buff me' when the trigger resolves if you intend to play the Initiate soon; choose
  'draw 1' otherwise"*: the choice is not made on resolution. Whether to perform is decided at
  finalization (402.1), and draw or buff with it, by this play's reading of 402.2; §7 says what changes
  if the choice is instead made on resolution, and nothing in the walk does. And the advice is the wrong
  way round. The buff never adds a card; it ties at S = 1 (your other units besides the two at exactly
  1 Might), costs a card at 2 or more, and at 0 draws nothing. A 2-drop played before the Initiate does
  what the buff does. `OGN-136 Pit Rookie` does it while adding its own 2.
- The notable *"On the turn you are one Might short of the Initiate's threshold, the buff mode IS the
  draw"*: it is the Initiate's card in place of the Captain's own, never in addition to it, and the card
  it buys is still on the chain. One ready rune of `VEN-061 Decree of Insight` takes it back.
- The notable *"Two Buhru Captains (3 Energy + 1 Power each) both taking the buff are 4 + 4 = 8 Might
  among 'other units', which clears the threshold with room to lose a body"*: two Captains that both take
  the draw are 3 + 3 = 6, which clears it too. That is three cards against the double buff's one.
- *"Read on execution (359.3.f.2)"* in the Initiate's use note, and the notable built on it: the
  paragraph that puts *"if your other units have total Might 5 or more"* in the effect rather than the
  condition is 383.2.a.1. Its Loose Cannon example is the same shape, *"draw 1 if"* after the trigger
  condition. 359.3.f.2 is about referents (*"here,"* *"my,"* *"its"*, 359.3.f.1).
- The notable *"702.3 IS WHY THE BUFF IS A ONE-TIME PLACEMENT"* names `OGN-146 Wallop` and `OGN-153 Overt
  Operation` as the Body cards that spend it. `OGN-147 Wildclaw Shaman` (*"When you play me, you may spend
  a buff to buff me and ready me."*) spends one too, and moves the +1 rather than losing it. A buff is also
  removed when its unit leaves play, 705: *"If a Unit leaves play, remove all Buffs from it."* And the
  opponent cannot spend it, 702.2.b.2: *"A player can only spend buffs on units they control."*
- The notable *"neither reads a battlefield"*: the sum counts units in base too, out of reach of every
  *"at a battlefield"* removal in §5's Window 1, though not of `VEN-127 Lacerate`, which names no
  location. Building the 5 in base is the placement that protects the Initiate's card against the rest,
  at the cost of the bodies holding nothing.
- The notable *"What they produce is cards, which is the resource a Body curve is normally short of"*:
  measured on this walk, the control's hand is empty after T4 going first, and the engine's holds two.
  The claim holds from T5; through T4 the score is the same.
- No answer is named. `VEN-061 Decree of Insight` (Mind, E1) in answer to the Initiate's trigger is the
  cheapest. `UNL-159 Soul Harvest`, `VEN-127 Lacerate` or `OGN-213 Hidden Blade` on an unbuffed Captain
  the turn before, two runes each, moves the card a turn later; the buff mode keeps him out of the first
  two's range.
