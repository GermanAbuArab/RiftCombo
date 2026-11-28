# Play — The Fortress killed nothing: their Recruits stayed off it until Darius stood there

Issue #373 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `frozen-fortress-soul-shepherd-asymmetric-sweep`**, the Mind ENGINE in which `UNL-212 Frozen
Fortress` deals 1 to every unit on it at the start of each Beginning Phase, and `UNL-077 Soul Shepherd`
gives your token units +1 Might, so your Recruits live through the tick and the opponent's die. The
entry is right about the rules: the tick fires in both Beginning Phases, before scoring, and a
battlefield left with no units loses its controller. In a game the sweep found nothing to kill. A
Recruit deck facing it keeps its 1-Might bodies off the Fortress for free, and when it wants the
battlefield, its Chosen Champion `OGN-243 Darius, Executioner` makes them 2s there, the same fix
Shepherd is for you. The tick did one thing in the walk. It put 1 damage on their `OGN-217 Trifarian
Gloryseeker` at the start of your T3, and that let one Shepherd-sized Recruit (2 Might, made for one
Energy) trade with it: a token for a card. That moved no point. It is **3 to 3** after their T4 with
the trade and without it. The cheapest answer to the trade costs nothing in their colours: `OGN-207
Call to Glory`, free by spending the Gloryseeker's own buff.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `eacc689`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 25 of them with no play**,
as the issue measured. The two picks are unchanged: this entry is rank 76, the first in the list. The
other entry of this slice is rank 77, `jae-medarda-repeat-double-choose`, played in
[The second Bonds is the +1 Jae lives on, and Falling Star kills him the turn before](2026-10-14-the-second-bonds-is-the-plus-one-jae-lives-on-and-falling-star-kills-him-first.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-265 Herald of the Arcane` (Mind/Order, tag Viktor) |
| **Chosen Champion** | `OGN-246 Viktor, Leader` (Order, E4 + 1 Power, M4) |
| **The pair** | `UNL-212 Frozen Fortress` (your battlefield), `UNL-077 Soul Shepherd` (Mind, E5, M3) |
| **The bodies** | `SFD-159 Trusty Ramhound` (Order, E2, M2), `OGN-211 Faithful Manufactor` (Order, E3, M2) |

The entry admits any legend with Mind in its pair. Herald of the Arcane is the one for this walk,
because it makes the tokens the entry is about, for one Energy each: *":rb_energy_1:, :rb_exhaust::
Play a 1 :rb_might: Recruit unit token."* A Recruit is the 1-Might token the Fortress kills, 187.1:
*"A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag."* The Chosen
Champion starts in the Champion Zone, 103.2.a.1: *"This will be placed in the Champion Zone at the
start of the game."*

Every card here is in the legend's domains, 103.1.b.1: *"Cards included in your deck must abide by
your Domain Identity."* None is a Signature card (`signature` in `data/cards.json`), and none is in
`data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Frozen Fortress: *"At the start of each player's Beginning Phase, deal 1 to each unit here. (This
  happens before scoring.)"*
- Soul Shepherd: *"Your token units have +1 :rb_might:."*
- Trusty Ramhound: *"While you have another unit here, I have +1 :rb_might:."*
- Faithful Manufactor: *"When you play me, play a 1 :rb_might: Recruit unit token here."*

## 2. What the tick does, and to whom

**It fires twice a round, before the Hold.** 315.2.a.1: *"At the start of Beginning Phase game effects
take place."* The Scoring Step comes after it, 315.2.b.2: *"1. The Turn Player Holds all Battlefields
they Control."* The text names no player, so it works whoever controls the battlefield, or nobody.
190.6.d: *"“You” in a battlefield’s abilities refers to the battlefield’s Controller, as does the
implied “you” in instructions that don’t specify a player like “draw 1.” If the battlefield has no
Controller, “you” refers to no one, and all such instructions are ignored."* There is no such word
here.

**One damage kills a 1-Might body and nothing else.** 143.2.a: *"If a Unit ever has nonzero damage
marked on it equalling or exceeding its Might, it is Killed."* A unit it kills leaves the battlefield
before the Hold, and a battlefield with no units loses its controller, 323.6: *"4. Players lose
control of any controlled Battlefields without their Units occupying them if the turn is in an Open
State and there is no Showdown or Combat ongoing there."* That is all true, as the entry says.

**The tick always lands first on the player who just took the battlefield.** Any unit at the Fortress
was moved or played there on some player's turn. The next Beginning Phase is the other player's. So a
1-Might body the opponent leaves there dies at the start of *your* turn, and yours dies at the start of
theirs. A battlefield they take with Recruits alone is empty at the start of your turn, and you can
walk in for a Conquer, 316.8.b.1: *"Showdowns that occur as a result of a player moving to an empty
Battlefield are a stand-alone Phase and do not create a Combat."*

**The damage stays for the whole turn the tick starts.** 143.3.b: *"Damage is Healed from Units at two
specific times:"* 143.3.b.1: *"At the end of each player's turn."* So a unit that survives the tick
has 1 damage on it until that turn ends, and combat counts it. 465.2.c.4: *"Units cannot have more
damage assigned to them than the minimum required to constitute lethal damage unless no further units
remain to have damage assigned to them."* Its example: *"If a player has 5 damage to distribute among
four 3 Might units and those units each have 1 damage already marked on them, that player may not
assign more than 2 damage to any of those units."* For the turn that follows, a unit at the Fortress is
one Might short of its printed size. A 2-Might Recruit there dies to 1 more damage. If Soul Shepherd
leaves the board during that turn, every one of your Recruits there is a 1 with 1 damage marked, and
dies (143.2.a).

**Soul Shepherd lands on your T3, going first.** He costs E5. Going first you have 2, 4, 6 and 8 runes
on T1 to T4, so T3 is the first turn you can pay for him. Units enter exhausted, 143.4: *"Units enter
the Board exhausted."* A unit reaches the Fortress by walking from base, 144.4.a: *"Units may move from
their Base to a Battlefield."* Or it is played there, which needs control of it, 355.2.a: *"By default,
Valid locations include the controller’s Base or a Battlefield the controller controls."* A unit on
the other battlefield cannot walk across, 144.4.b: *"Units may move from a Battlefield to their
Base."* That takes Ganking, 144.4.c.1: *"Units with Ganking may use their Standard Move to Move from
Battlefield to Battlefield."*

## 3. Their deck: Fury/Order Recruits

`OGN-253 Hand of Noxus` (Fury/Order): *":rb_exhaust:: [Reaction], [Legion] — [Add] :rb_energy_1:.
(Abilities that add resources can't be reacted to. Get the effect if you've played a card this
turn.)"* Its Chosen Champion is `OGN-243 Darius, Executioner` (Order, E6 + 1 Power, M6): *"[Legion] —
When you play me, ready me. (Get the effect if you've played another card this turn) Other friendly
units have +1 :rb_might: here."* They make Recruits with `OGN-212 Forge of the Future` (Order gear, E2):
*"When you play this, play a 1 :rb_might: Recruit unit token at your base."*, with Faithful Manufactor,
and with `OGN-218 Vanguard Captain` (Order, E3 + 1 Power, M3): *"[Legion] — When you play me, play two
1 :rb_might: Recruit unit tokens here."* `OGN-217 Trifarian Gloryseeker` (Order, E2, M2): *"[Legion]
— When you play me, buff me."* Going second they channel an extra rune on T1, 485.7: *"The player going
second channels an extra Rune from their Rune Deck during their first Channel Phase of the game."*
§5 names their answers.

## 4. The turns, going first

Mind/Order against Fury/Order. Your battlefield is F, the Frozen Fortress; theirs is B, `OGN-278
Bandle Tree` (*"You may hide an additional card here."*), which nothing in the walk uses. Your opening
four are Trusty Ramhound, Faithful Manufactor, Soul Shepherd and `OGN-087 Lecturing Yordle`. Your draws
are `OGN-210 Daring Poro` (T1), `OGN-096 Watchful Sentry` (T2), Vanguard Captain (T3) and a second
Faithful Manufactor (T4). Their opening four are Forge of the Future, Trifarian Gloryseeker, Faithful
Manufactor and Vanguard Captain. Their draws are `OGN-222 Noxian Drummer` (T1), `UNL-018 Yeti Brawler`
(T2), `OGN-239 Machine Evangel` (T3) and a second Vanguard Captain (T4).

```
turn    runes   your turn                                                 points
T1      2       Trusty Ramhound (E2) to base.                             0
their T1  3     Forge of the Future (E2): a Recruit to their base. Hand
                of Noxus: +E1. Trifarian Gloryseeker (E2), Legion: buff,
                M3. None left.
T2      4       Ramhound walks to B, Conquer: +1. Faithful Manufactor     1
                (E3) to B: a Recruit at B; Ramhound is a 3. Herald (E1):
                a Recruit to base. None left.
their T2  5     The Gloryseeker walks to F, Conquer. Their Recruit stays
                home. Faithful Manufactor (E3) to base: a Recruit. Hand
                of Noxus: +E1. Vanguard Captain (E3 + 1 Order Power) to
                base, Legion: two Recruits. Five runes, one recycled.
T3      6       Start: F deals 1 to the Gloryseeker. Hold B: +1.          2
                Soul Shepherd (E5) to B: your Recruits are 2s. Your
                base Recruit walks to F: 2 against the Gloryseeker's 3,
                1 marked. Both die; F is left empty. Herald (E1): a
                Recruit to B. None left.
their T3  6     Nothing to Hold. Four Recruits, the Manufactor and the
                Captain walk to F, Conquer. Darius, Executioner (E6 + 1
                Order Power) to F, exhausted: their Recruits there are
                2s. Six runes, one recycled.
T4      8       Start: F deals 1 to each of their seven; none dies.       3
                Hold B: +1. Lecturing Yordle (E3) to B: draw. Vanguard
                Captain (E3 + 1 Order Power) to B, Legion: two Recruits.
                Herald (E1): a Recruit to base. Seven runes, one
                recycled; one left.
their T4  7     Start: F deals 1 to each of their seven; none dies.
                Hold F: +1. Machine Evangel (E5 + 1 Order Power) to F.
                Five runes, one recycled; two left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4
it is **3 to 2**; after their T4, **3 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after Ramhound; 5, then 4 after T2; 5, then 4 after
Shepherd; 5 after the T4 draw, 4 after the Yordle, 5 after its draw (`OGN-084 Eager Apprentice`), 4
after the Captain (Daring Poro, Watchful Sentry, Faithful Manufactor, Eager Apprentice). Theirs: 5
after the T1 draw, 3 after Forge and the Gloryseeker; 4, then 2 after T2 (Noxian Drummer, Yeti
Brawler); 3 after the T3 draw; 4, then 3 after the Evangel. Darius comes from the Champion Zone, not the
hand, 419.1.a: *"By default, a player can only Play cards from their hand or their Chosen Champion
zone."*

**Your T2.** Ramhound takes B, the empty battlefield, and the Manufactor goes to B with it, which you
now control (355.2.a): Ramhound is a 3 with another unit there, and B is 3 + 2 + 1 = 6. Sent to F
instead, the Manufactor's Recruit would be played *"here"*, on the Fortress, and die at the start of
their turn. Herald's Recruit goes to base, not B. In base it is ready to walk on T3, and only a unit in
base can walk to F (144.4.a, 144.4.b).

**Their T2: the Fortress decides where their Recruits go.** Their two ready units are the Gloryseeker
(3) and the T1 Recruit (1). Against B they are 4 against 6: they kill two of yours and lose both, and
you keep B. So they take F, which is empty. Their Recruit stays in base. At F it would die at the start
of your T3 and add nothing before that. The Manufactor and the Captain go to base for the same reason.
Played to F, which they now control, the tick would kill their three Recruits at the start of your T3.
That is the sweep the entry describes. It happens only if they choose it. It would keep F theirs, since
a lone 2-Might Recruit cannot win into 3 + 2 + 3 with 1 marked on each. But your Recruit would still
trade for one of the three (2 is lethal on the Gloryseeker or the Captain), and they would Hold F on T3
instead of taking it back. That is the same
2 to 2, three Recruits poorer. Their runes: five for E3 + E3 with Hand of Noxus's E1, and an Order
rune recycled for the Captain's Power, 164.2.b: *"Recycle this: [Reaction] — Add [C]."*

**Your T3, the tick and the trade.** At the start of your Beginning Phase the Fortress deals 1 to the
Gloryseeker. Then you Hold B (315.2.b.2). In your Main Phase, Soul Shepherd goes to B. That makes your
base Recruit a 2, and it walks into F. The Gloryseeker defends as a 3 with 1 marked, so 2 is lethal
(465.2.c.4). Its 3 is lethal on the Recruit. Both die, and nobody holds F, 466.5.b: *"If there are no
Units remaining here controlled by any player, the Battlefield becomes Uncontrolled."* No Conquer:
nobody has units there. They had no rune ready and nothing in hand to answer it. Without the tick, the
Gloryseeker takes 2 of 3 and lives. Without Shepherd, the Recruit deals 1 and the Gloryseeker lives.
Both pieces were needed, and what they bought was one Energy's token for one of their cards.

Shepherd goes to B, not base, because of their T3. B is then 3 + 2 + 2 + 3 + 2 = 12 with the second
Recruit. Their base on T3 is 2 + 3 + 1 + 1 + 1 + 1 = 9, and Darius can only enter exhausted (below).
Into 12 their 9 kill four of yours and all of theirs die, so they do not attack B. With Shepherd in
base, B is 9 and their 9 clear it, losing all of theirs too, and your T4 Hold of B goes.

**What the trade moved.** Without it, the Gloryseeker survives the tick at the start of their T3 (a 3
with 1 marked) and they Hold F: 2 to 2. With it, F is empty, and they take it back on their T3 with
the units in their base: 2 to 2. After that neither battlefield changes hands. You Hold B on T4 and
they Hold F on T4: **3 to 3**. The trade was worth a card, not a point.

**Their T3: Darius is their Soul Shepherd.** Their six units in base walk to F together, 144.3:
*"Players may perform multiple Units' standard move simultaneously."* F is empty, so it is a Conquer
with no combat (316.8.b.1), 469.1: *"Conquer: A player gains Control of a Battlefield they did not yet
Score this turn."* Darius then goes to F, which they control (355.2.a). His Legion fails, because a move
is not a card, so he enters exhausted (143.4), and it does not matter: *"Other friendly units have +1
:rb_might: here"* makes their four Recruits there 2s. Six runes pay the E6, and one Order rune is
recycled for the Power. Hand of Noxus's E1 has nothing to buy: their hand is a Drummer (E3), a Yeti
(E6) and an Evangel (E5).

**Your T4 and their T4: the tick hits everything and kills nothing.** At the start of each Beginning
Phase, F deals 1 to each of their seven: Darius a 6, Captain a 4, Manufactor a 3, each Recruit a 2.
Nothing of yours can reach F. Your ready units stand at B (144.4.b), and what you play enters
exhausted (143.4). They Hold F on their T4, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* Their units at F cannot
reach B either.

**The fuse runs both ways.** At any point in your T4, Darius has 1 damage marked, and so does each of
his four Recruits. If he died, each Recruit would be a 1 with 1 marked, and all four would die at once
(143.2.a). `OGN-213 Hidden Blade` is Order, two runes (*"Kill a unit at a battlefield. Its controller
draws 2."*), and it is in your colours too. It is not in your hand, and the walk does not use it. It is
the same weakness §2 gives your own token garrison.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. Tournament Rules 402.1: *"In a
constructed event, players must register a Main Deck of exactly 40 cards (including a chosen
champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name."* Going first you
have seen **7** cards by T3 (four opening, one draw a turn from T1). With three copies (103.2.b), a Soul
Shepherd among them is **45.73%**. With a Faithful Manufactor among the **6** seen by T2 as well, it is
**16.89%**. Before any card: in a Duel each player draws one of their three battlefields at random,
485.5: *"Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other two are
removed and will not be used for this game."* The Fortress is on the table in **1 game in 3, 33.33%**.
In a match of three, 486.5 lets you choose it, *"Each player selects one (1) of their three (3)
Battlefields."*, but *"After this game, if a player won, the Battlefields that were used are to be
removed and not selected again for this Match."* So it is in one game of the match.

## 5. Breaks to

**What the engine did in the walk, and the predicate.** It made one trade on your T3: a Recruit from
Herald's E1 for their Trifarian Gloryseeker, with F left empty. It moved no point. The predicate is:
played on your T3, does it keep the Gloryseeker alive at F? A Gloryseeker that lives Holds F at the
start of their T3. The score is the same 2 to 2, and they are a card up.

**The scope.** A Fury/Order deck plays only Fury, Order and Fury/Order cards (103.1.b.1), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* Hand of Noxus's tag is Darius. The
predicate is: a card in those domains in `data/cards.json` (not a legend, battlefield, rune or token),
with [Action], [Reaction], [Hidden] or [Ambush] in its text, not banned, and not a Signature card with
another champion's tag. Folded by name, that is **63** cards. None is banned. The two Signature cards
in those domains with another tag, `SFD-188 Void Rush` (Rek'Sai) and `UNL-188 Hextech Gauntlets` (Vi),
have none of the keywords. The Darius Signature, `OGN-254 Noxian Guillotine`, is among the 63. By the
runes they cost (the larger of the Energy and the Power, the Power recycled off the same runes), **9**
cost one rune, **23** two, **14** three, and **17** four or more, at printed cost.

**The cheapest answer costs nothing, and the walk had zero runes.** In the walk their five runes and
Hand of Noxus's E1 all went into the Manufactor and the Captain. The legend gives nothing on your turn
until they have played a card. `OGN-207 Call to Glory` (Order, E3, [Reaction]): *"As you play this, you
may spend a buff as an additional cost. If you do, ignore this spell's cost. Give a unit +3
:rb_might: this turn."* The Gloryseeker carries the buff its Legion gave it on their T1, 702.2.b:
*"Spending a Buff removes a single Buff counter from a Unit."* Spent, it is a 2; with the +3 it is a 5
with 1 marked. Your 2 do not kill it, and its 5 kill the Recruit. It is the only card among the 63
whose cost goes to zero from hand in this walk. `OGN-008 Get Excited!` ignores the Power of the card it
discards, not its own; `SFD-164 Drag Under` is cheaper only from outside the hand; `UNL-178 Poppy,
Defender of the Meek` needs 3 XP, and they have none. So zero runes is the floor, and one card is the
whole price.

Two more windows are swept, each costing them something on their T2. Each prices single cards. On
your turn, once they play a card, Hand of Noxus's Legion is met, and it adds E1. The two-card lines
that opens are not swept.

*A card hidden at F on their T2.* They control F after the Conquer, which is what hiding needs, 811.1.b:
*"While this card is in your hand or in your Champion Zone on your turn during an Open State, you may
pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown card
hidden there for as long as you control that battlefield. Beginning on the next turn, this gains
[Reaction] and you may play this, ignoring its base cost."* The [A] is Power, paid by recycling a rune
(164.2.b), and the rune does not have to be ready, so the walk's T2 can afford it. It costs them a rune
for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune and then only the
Channel Phase's two a turn (315.3.b), each rune they recycle is a rune short on every turn through their T5,
until their Rune Deck runs dry (161.2.a); a card that channels more (430.2) brings it back sooner. The walk
ends after their T4, so the count stands for every turn it covers. The wording above is kept as history.]
On their T3 they have five, and Darius (E6) cannot come down. Played from facedown, the card
has Reaction, 811.6: *"A card that is Hidden gains Reaction while facedown or played from facedown, and
may be played any time a card with Reaction may be played as a result."* A unit played from it must go
to F, 811.1.d.1: *"A hidden permanent must be played to that battlefield."* It becomes a defender,
464.2.c.3.a: *"If a Unit controlled by the Attacker or Defender becomes present at this Battlefield
after this moment, it will gain the Attacker or Defender designation during the Cleanup phase
following the action that caused it to become present, as appropriate for its controller."* Ten of
the 63 have [Hidden] (`OGN-018 Noxus Saboteur` only names it). **Four break the trade:**

- `OGN-213 Hidden Blade` kills the Recruit, and you draw 2.
- `OGN-220 Facebreaker`: *"Stun a friendly unit and an enemy unit at the same battlefield. (They don't
  deal combat damage this turn.)"* With neither dealing damage, both stay, and the Recruit is recalled,
  466.1.a.2: *"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still
  present.”"*
- `UNL-003 Mischievous Marai`: *"When you play me to a battlefield, deal 2 to an enemy unit here."* The
  Recruit dies before combat.
- `SFD-017 Sudden Storm`: *"Deal 2 to a unit at a battlefield. If it's attacking, deal 4 to it
  instead."*

The other six do not. A unit that joins as a defender does not save the Gloryseeker, because you
assign your 2 first, and to whichever unit you choose (465.2.c: *"Starting with the Attacker, each
player assigns an amount of damage equal to their summed Might among the other's Units."*). None of
them has [Tank]. That covers `VEN-117 Disciple of Shen`, `UNL-028 Pyke, Dockside Butcher` (its +2 needs
a Fury rune recycled, which they have, and still loses the Gloryseeker), and the 2-Might Sand Soldier
from `SFD-154 Guards!`. Each of them keeps F, but the Gloryseeker dies. `VEN-135 Kennen, Keeper of
Balance` needs E2 to stun, and they have no Energy at all: Hand of Noxus was exhausted for the T2
Manufactor and Captain. `SFD-004 Bushwhack` readies units
nobody plays. `UNL-013 Lotus Trap` doubles damage to one unit. On the Recruit, the Gloryseeker's 3 kill
it anyway, and the 2 still reach the Gloryseeker.

*Two runes up, skipping the Captain.* Holding even one rune back costs them the Captain. Its E3 is two
runes and Hand of Noxus's E1, and the Manufactor took the other three. Skipping it leaves two runes
ready on your T3. The 32 cards at two runes or less were swept. [Action] is enough here, because the
trade happens in a combat showdown, 806.1.b: *"Action grants the corresponding card or effect
permission to be played or activated during Showdowns, even when it is not the Controlling player's
turn."* **Fourteen break it:**

- At one rune: `OGN-009 Hextech Ray` (3 to the Recruit) and `UNL-014 Monster Harpoon` (2).
- At two, the damage: `OGS-003 Incinerate` and `VEN-010 Consuming Curse` (2 each), `UNL-007 Smite`
  (3), `OGN-008 Get Excited!` (discarding the Yeti, 6), `SFD-162 Blood Money` (*"Kill a unit at a
  battlefield with 2 :rb_might: or less."*), and Hidden Blade from hand.
- At two, the Might: `SFD-001 Against the Odds` (+2 for your one unit there, a 5), `SFD-022 Long
  Sword` (Quick-Draw, M+2, a 5), `SFD-151 Bonds of Strength` (+1 to it and one more of theirs, a 4) and
  `SFD-163 Deathgrip` (killing a Recruit in their base gives +1, a 4). A 4 with 1 marked survives 2.
- At two, the rest: Facebreaker from hand, and `VEN-126 Ki Barrier` (*"Prevent the next 7 damage that
  would be dealt to it this turn."*).

The other eighteen do not. `OGN-004 Cleave`, `SFD-003 Blood Rush` and `UNL-010 Vault Breaker` give
Assault, which counts only while attacking. `UNL-173 Sacrifice` needs a Mighty unit of theirs, and they
have none. `VEN-015 Decree of Rage` reaches only a Calm unit, and a Recruit has no domain. `OGN-040 Seal
of Rage` and `OGN-245 Seal of Unity` are gear whose [Reaction] works only from the board. `OGN-033
Shakedown` deals 6 *"unless its controller has you draw 2"*: you choose, and you let them draw 2.
`UNL-175 Tactical Retreat` recalls the Gloryseeker, so it is alive in their base, not at F. Your Recruit
still takes its 3 in the same step, 465.2.c.1.a: *"When all Damage is assigned, it will be Dealt
simultaneously. These actions are not synonymous."* So the Recruit dies, F is left empty (466.5.b) and nobody Conquers. That is the
walk's own end state, with the Gloryseeker in their base instead of the trash. `OGN-224 Salvage`, `SFD-011 Angle Shot` and `SFD-166 Rally the Troops` touch
no unit in the fight. `UNL-002 Inferna` comes in as a defender, which does not save the Gloryseeker.
Lotus Trap does nothing useful here, as above. From hand, `SFD-004 Bushwhack`, Mischievous Marai,
Disciple of Shen and `UNL-161 Divining Shells` have no [Action] or [Reaction], so they cannot be played
on your turn.

**Answers to the filter itself.** The entry's claim is wider than the trade: your tokens live
through the tick and theirs die. Against Fury/Order that is answered four ways, all in their colours:

- **Stay off it.** Free, and it is what the walk shows on their T2. Their bodies are at F at a
  Beginning Phase only if they leave them there.
- **Darius, Executioner**, their Chosen Champion, so always in reach (419.1.a), E6 + 1 Power. Played to
  F, he makes every other unit of theirs there a point bigger. Shown on their T3.
- **`VEN-018 Rage Amplifier`** (Fury gear, E4 + 1 Power): *"Your units have +1 :rb_might:."* It covers
  every unit, at every location.
- **A [Reaction] in answer to the tick.** The tick is a triggered ability on the chain, so the turn is
  closed while it waits, 309.1: *"If a Chain exists, the turn is in a Closed State."* A [Reaction] card
  can be played then, 813.1.c.1: *"This can be played during Closed States on any player's turn."* So
  a "+Might this turn" card saves the bodies it names: Bonds of Strength saves two, `OGN-206 Back to
  Back` two, Deathgrip one, Long Sword one. Each saves only the units it names.

## 6. Verdict

**Right about the rules; silent about the opponent.** The Fortress fires in both Beginning Phases,
before the Hold, and a battlefield it empties loses its controller, as the entry says. Soul Shepherd
does keep your Recruits above it. Walked against a Recruit deck, the tick killed nothing. A
1-Might body at the Fortress is there only because its owner left it there. Their Recruits stayed in
base until their Chosen Champion stood on the battlefield and made them 2s. The tick's one effect was 1
damage on the Gloryseeker, which a 2-Might Recruit turned into a token-for-card trade. That moved no
point: **3 to 3** after their T4 either way. The cheapest answer to that trade is Call to Glory, free
by spending the buff the Gloryseeker already had. And the damage stays on through the turn, so on the
opponent's turn a token garrison on the Fortress dies to 1 damage per token, or all at once to Soul
Shepherd's death.

## 7. Not verified

I did not deal the channel order. The walk assumes six Mind and six Order runes for you, Herald of the
Arcane's two domains, in the twelve of Tournament Rules 402.1. Soul Shepherd and every T1 to T3 card
need no Power. The T4 Captain's Order Power is among eight runes in **all 924 deals**, because only six
are Mind.

Their walk assumes six Fury and six Order. The T2 Captain's Order Power needs an Order among five: it
fails in **7 of 924 deals, 0.76%**. Darius's on T3 needs a second Order among seven, since one was
recycled on T2: **7 of 924, 0.76%**. Either fails in **12 of 924, 1.30%**. The T4 Evangel's Order is
there in every deal where both of those were paid. In the two-rune window of §5, with five runes
channelled and none recycled: Hextech Ray, Monster Harpoon, Smite, Get Excited! and Long Sword need a
Fury, and fail in **7 of 924, 0.76%** each. Hidden Blade and Ki Barrier need an Order: **7 of 924,
0.76%** each. Hiding takes any rune.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their two turns. Call to Glory, run three times, is among them in
**40.30%**. Two answers in three copies each (six cards), **66.05%**; three (nine cards), **81.80%**.
These count only the cards named, not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second (where
Soul Shepherd comes down on T2, with five runes), the mulligan, 2v2, a Recruit garrison of yours on the
Fortress through their turn (§2 prices it by rule), and the two-card lines Hand of Noxus's E1 opens on
your turn. The probabilities count only the cards named.

## Leads

- The notable *"An opponent who takes Frozen Fortress with 1-Might tokens loses it again in their own
  Beginning Phase and never Holds it once."* They lose it in *yours*, which comes first. The first
  Beginning Phase after any turn is the other player's (§2), and the battlefield is then empty for your
  Main Phase: a Conquer by walking in (316.8.b.1). The Shard of Undoing notable already says the same of
  your own bodies.
- *"a 2-Might body standing there forever is never in danger"* and step 5's *"repeats forever with no
  upkeep"*: the tick's damage stays marked until the end of the turn it starts (143.3.b.1). So
  through the opponent's whole turn, each of your 2-Might tokens there dies to 1 more damage. 465.2.c.4's
  example is that arithmetic. If Soul Shepherd dies in that turn, every token there dies with him
  (143.2.a).
- The Soul Shepherd note *"it lifts every Recruit, Bird, Sprite and Mech you own out of the Fortress's
  range"*: a Sprite is 3 Might (187.2: *"A 3 [M] Sprite token with Temporary is a domainless unit token
  with 3 Might, the Fae tag, and the Temporary keyword."*), and so is a Mech (187.4: *"A 3 [M] Mech
  token is a domainless unit token with 3 Might and the Mech tag."*). Neither was ever in range. Of the
  four, only Recruits (187.1) and Birds (187.7) are lifted.
- Step 3's *"kills every 1-Might body the opponent has walked in"*: in the walk it killed none. A
  Recruit deck keeps its 1-Might bodies off the Fortress for free. When it wants the battlefield,
  `OGN-243 Darius, Executioner`, the Fury/Order Chosen Champion, makes them 2s there.
- No answer is named. Darius (above), `VEN-018 Rage Amplifier` (Fury, *"Your units have +1
  :rb_might:."*) and a [Reaction] +Might in answer to the tick's trigger all keep their 1-Might bodies
  alive. Against the walk's one trade, `OGN-207 Call to Glory` costs nothing by spending a buff.
- The availability notable cites 485.5 and 486.5 without the number. In a Duel the Fortress is on the
  table in 1 game in 3. In a match of three you choose it, for one game.
