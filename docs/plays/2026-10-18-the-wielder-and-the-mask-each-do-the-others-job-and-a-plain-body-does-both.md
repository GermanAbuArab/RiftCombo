# Play — The Wielder and the Mask each do the other's job, and a plain body does both

Issue #411 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `wielder-of-water-mask-foresight-alone`**, the Calm ENGINE in which `OGN-055 Wielder of
Water` (E3, M2) has +2 Might while it attacks or defends alone and `OGN-060 Mask of Foresight` (E2 gear)
gives +1 this turn to any friendly unit that attacks or defends alone. The entry is right about the
definition. 740.2.a counts only your own side, so a body facing a full enemy garrison is still alone, and
neither bonus is a buff. Walked as a game, going first, under `OGS-019 Wuju Bladesman - Starter` (whose
own +2 goes to a friendly unit defending alone) against a Mind/Order Lux deck that kept two bodies at
home to attack your battlefield, the Wielder walked alone into their battlefield on your T3 as a 5 and
took it from a 3. The Mask then made both of your lone garrisons too big for their two bodies, and they
did not attack until Lux could join them: **5 to 2** after their T4. The same hand with no Mask also
ends **5 to 2**. The Wielder alone is still a 4 against the Pigeons' 3, and the Sunlit Guardian played
onto your battlefield beside Stalwart Poro makes it a 7 with no alone bonus at all. That is the number
the Mask and the legend gave the lone Wielder. The same hand with a `OGN-054 Sunlit Guardian` in place
of the Wielder ends **5 to 2** too. A lone Sunlit Guardian is 3 + 1 defending, which is the Wielder's
2 + 2, under any legend, and with the Mask it is 4 on the attack, which also kills a 3. So the T3
Conquer needs one of the two cards, not both, and on this board neither bought a point that a plain
body did not. The Wielder is one point better only while it attacks alone, and worse whenever it has
company. Played in the entry's order, Mask first on T1, the same cards end **2 to 3** in every line
walked, because the Mask takes the turn your first body needed. Their better T2 never attacks at all: they stack their
own battlefield, nothing of yours ever fights alone, and it ends **3 to 3** with or without the
engine. The cheapest answer to the walked line is `SFD-064 Cloth Armor`, one ready rune and no Power:
on their 3-Might defender it makes the Wielder's attack a 5 against a 5, and both die.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `dfcb3f3`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 13 of them with no play**, as
the issue measured. The pick is by global rank, skipping entries that already have a play: this entry is
rank 88, the first in the list. The other entry of this slice is rank 89,
`fading-memories-maddened-marauder-hold-denial`. Wuju Bladesman is named as a legend option in
[the Valley's buff is the legend's, until two bodies need one in a turn](2026-10-13-the-valleys-buff-is-the-legends-until-two-bodies-need-one.md),
and the Mind/Order Lux deck is the one built in
[Three Incinerates kill Lux and one guard, the Curses kill Lux and two, and the third kill is the battlefield](2026-10-18-three-incinerates-kill-lux-and-one-guard-the-curses-kill-lux-and-two-and-the-third-kill-is-the-battlefield.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-019 Wuju Bladesman - Starter` (Calm/Body, tag Master Yi) |
| **Chosen Champion** | `OGS-004 Yi, Meditative` (Calm, E5 + 1 Calm Power, M4), never played in the walk |
| **The engine** | `OGN-055 Wielder of Water` (Calm, E3, M2) and `OGN-060 Mask of Foresight` (Calm gear, E2) |
| **The other bodies** | `OGN-052 Stalwart Poro` (Calm, E2, M2) to garrison your battlefield, and `OGN-054 Sunlit Guardian` (Calm, E3, M3) |

The entry admits any legend with Calm in its pair. Wuju Bladesman is the one for this walk because it is
the only legend whose own text reads *"alone"*: *"While a friendly unit defends alone, it gets +2
:rb_might:."* It asks the same thing of your board as the two cards do, so the walk measures the engine
in the deck that already wants a lone garrison, and its +2 adds to both of theirs because none of the
three is a buff (§2). It is restricted in 2v2 (`data/legality.src.json`), so this walk is a Duel only.

Both cards are mono-Calm, so a Calm/Body deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three
copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* None of the cards in this play is a Signature card (`signature` in `data/cards.json`), and in
Duel none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Wielder of Water: *"While I'm attacking or defending alone, I have +2 :rb_might:."*
- Mask of Foresight: *"When a friendly unit attacks or defends alone, give it +1 :rb_might: this
  turn."*
- Stalwart Poro: *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- The control, Sunlit Guardian: *"[Shield] (+1 :rb_might: while I'm a defender.) [Tank] (I must be
  assigned combat damage first.)"*

## 2. What "alone" counts, and when the Mask checks it

**Your side only.** 740.2.a: *"A unit is alone when there are no other friendly units at the same
location."* The enemy garrison is not in the sentence. The stricter term is the next one, 740.2.b: *"A
unit is one on one when it and the enemy unit at the same location are both alone."* Neither card here
says one on one.

**The Mask checks once, at the designation.** Its text is an attack trigger and a defend trigger, and
both rules carry the same clause. 383.4.e.2.b: *"If the trigger condition contains other requirements
besides attacking and if those requirements are not fulfilled when the unit gains the Attacker
designation, it will not trigger in that combat."* 383.4.f.2.b says the same for the Defender
designation. Units gain it as the combat opens, 464.2.c.3: *"The attacker and defender gain the Attacker
or Defender designation now, as appropriate. Units at the Contested Battlefield controlled by the
Attacker or Defender gain the Attacker or Defender designation now, as appropriate."* So two of your
units walking in together get nothing from the Mask, and a unit that was alone at that moment keeps its
+1 for the turn even if another of yours arrives later. The Wielder's +2 and the legend's +2 are
continuous: they read the board while the combat lasts.

**None of it is a buff.** A buff is one per unit, 702.3: *"There can only be one Buff on a Unit at a
time."* The Wielder's and the legend's bonuses are "while" modifiers and the Mask's is "+1 this turn",
so 702.3 does not limit them and they add. A Wielder attacking alone is 2 + 2 + 1 = **5**, which is
Mighty, 709: *"A Unit "becomes Mighty" at the moment its Might changes from being less than 5 to being 5
or greater."* Defending alone under Wuju Bladesman it is 2 + 2 + 2 + 1 = **7**. Shield adds only on
defense, 814.1.c: *"It is functionally short for "While I am a defender, I have +X [M].""*

**Only where there is a combat.** A unit walking into an empty battlefield fights nobody, 316.8.b.1:
*"Showdowns that occur as a result of a player moving to an empty Battlefield are a stand-alone Phase and
do not create a Combat."* Neither card does anything there.

**The cost is the damage step.** 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* A lone body assigns its own Might and
receives the sum of everything on the other side. It assigns that Might like anyone else, lethal first,
465.2.c.3: *"Units must have lethal damage assigned to them in full before damage is assigned to a
different Unit."* So a lone 7 can kill a 3 and a 3; what it cannot do is spread the damage it takes.

**Moving.** A unit at a battlefield cannot walk to the other one, 144.4.c.1: *"Units with Ganking may
use their Standard Move to Move from Battlefield to Battlefield."* Every attack in a Duel comes from a
base, and a unit enters exhausted, 143.4: *"Units enter the Board exhausted."* A gear needs no ready
turn: the Mask's trigger has no exhaust, so it works the turn it lands.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4. Nothing you play in the walk
costs Power, so you recycle nothing.

## 3. Their deck: Mind/Order Lux

The deck of the Incinerate play linked above. `OGS-021 Lady of Luminosity - Starter` (Mind/Order):
*"When you play a spell that costs :rb_energy_5: or more, draw 1."* Its Chosen Champion is `OGS-006
Lux, Illuminated` (Mind, E6 + 1 Mind Power, M5): *"When you play a spell that costs :rb_energy_5: or
more, give me +3 :rb_might: this turn."* Neither text fires in the walk. Their bodies are `UNL-154
Crimson Pigeons` (Order, E3, M3; *"I have +2 :rb_might: while I'm attacking with another unit."*),
`SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you have another unit here, I have +1 :rb_might:."*),
`OGN-210 Daring Poro` (Order, E2, M2; *"[Assault] (+1 :rb_might: while I'm an attacker.)"*) and
`OGN-087 Lecturing Yordle` (Mind, E3, M2; [Tank], *"When you play me, draw 1."*). It is a deck of
bodies that get bigger together, which is the board the lone-body cards are built to face. Going second,
they channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra
Rune from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Calm/Body against Mind/Order. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*); theirs is B, `VEN-162 Protective Sands` (*"When you conquer
here, if you control 4 or fewer runes, you may pay :rb_energy_1: to draw 1."*). Neither fires: you have
no buff, and nobody conquers B with four runes or fewer. Your opening four are Stalwart Poro, Wielder of
Water, Mask of Foresight and Sunlit Guardian. Your draws are `SFD-036 Lonely Poro` (T1), `UNL-040 Wuju
Apprentice` (T2), `SFD-037 Navori Scout` (T3) and `UNL-048 Trevor Snoozebottom` (T4). Their opening four
are Crimson Pigeons, Trusty Ramhound, Daring Poro and Lecturing Yordle. Their draws are `OGN-096
Watchful Sentry` (T1), `SFD-155 Honest Broker` (T2), `OGN-219 Vanguard Sergeant` (T3) and `UNL-156
Loyal Poro` (T4).

```
turn      runes   your turn                                                 points
T1        2       Stalwart Poro (E2) to base. None left.                    0
their T1  3       Crimson Pigeons (E3) to base. None left.
T2        4       Stalwart Poro walks to A, Conquer: +1. Wielder of Water   1
                  (E3) to base. One left.
their T2  5       The Pigeons walk to B, Conquer. Trusty Ramhound (E2)
                  and Daring Poro (E2) to base. One left.
T3        6       Hold A: +1. Mask of Foresight (E2) to base. The Wielder   3
                  walks alone into B: 5 against the Pigeons' 3, Conquer:
                  +1. Sunlit Guardian (E3) to base. One left.
their T3  7       Nothing to Hold. No attack. Lux, Illuminated (E6 + 1
                  Mind Power) from the Champion Zone to base. Seven
                  runes, one recycled; none left.
T4        8       Hold A and B: +2. Navori Scout (E4), Lonely Poro (E2)     5
                  and Wuju Apprentice (E2) to base. None left.
their T4  8       Lux, the Ramhound and the Poro attack B: 11 against
                  the Wielder's 7. Lux and the Wielder die, Conquer.
                  Vanguard Sergeant (E4), Honest Broker (E2) and
                  Watchful Sentry (E2) to base. None left.
```

Their points: 0 after their T1, 1 after their T2, 1 after their T3, 2 after their T4. After your T4 it
is **5 to 1**; after their T4, **5 to 2**.

Your hand, card by card: 5 after the T1 draw, 4 after Stalwart Poro; 5, then 4 after the Wielder; 5
after the T3 draw, 3 after the Mask and the Guardian; 4 after the T4 draw, 1 after the three bodies
(Trevor Snoozebottom). Theirs: 5 after the T1 draw, 4 after the Pigeons; 5, then 3 after T2 (Lecturing
Yordle, Watchful Sentry, Honest Broker); 4 after the T3 draw, still 4 after Lux, who comes from the
Champion Zone; 5 after the T4 draw, 2 after the three bodies (Lecturing Yordle, Loyal Poro).

**Your T2: the body first, the Mask later.** Stalwart Poro takes A, which is empty (316.8.b.1), and that
is a Conquer, 466.5.d: *"Establishing Control results in a Conquer if that player has not yet scored
this Battlefield this turn."* The Wielder goes to base and not to A, because a second body at A would
make the Poro not alone. Units can be played to base or to a battlefield you control, 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."* The
Mask waits: a unit has to be played a turn early to be ready to move, and the Mask does not.

**Their T2.** The Poro at A would defend alone at 2 + 1 (Shield) + 2 (legend) = 5, so the Pigeons,
alone, a 3, do not try. They take empty B. The Ramhound and the Poro go to base, not to B, because from
B they could never reach A (144.4.c.1). From base, together, they threaten A next turn.

**Your T3: the Wielder alone into B.** You Hold A, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* The Mask goes down first,
for two runes. Then the Wielder, ready since your Awakening, walks into B. The Pigeons are alone there,
and their +2 counts only while they attack with another unit, so they defend as a 3. As the combat opens
the Wielder gains the Attacker designation alone (464.2.c.3), the Mask's trigger goes on the chain, and
it resolves: the Wielder is 2 + 2 + 1 = 5, Mighty (709). You assign 5, and 3 of it is lethal on the
Pigeons, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s
Might."* They assign 3 to a 5, which is not. The Pigeons die, and only your unit is left at B: a Conquer
(466.5.d). Your last four runes put the Guardian in base. **3 to 1.**

**Their T3: two battlefields they cannot take.** They have nothing to Hold. The Ramhound and the Poro are
ready in base: together they attack as 3 (2, +1 for company) and 3 (2, +1 [Assault]), 6 in all. Your
two garrisons are each alone, and each now carries the Mask's +1 when it defends:

- A: Stalwart Poro, 2 + 1 + 2 + 1 = **6**. Their 6 against it kill the Poro, and your 6 kill both of
  theirs. Nobody is left, and A becomes nobody's, 466.5.b: *"If there are no Units remaining here
  controlled by any player, the Battlefield becomes Uncontrolled."*
- B: the Wielder, 2 + 2 + 2 + 1 = **7**. Their 6 do not kill it, and your 7 kill both.

Trading into A costs them both bodies to deny you one Hold. Walked out, it ends **5 to 1**: on your T4
you Hold B, and the Guardian, ready in base, walks into empty A for a Conquer. They wait instead. Lux
goes to base, seven runes with a Mind one recycled, and next turn she, the Ramhound and the Poro are 5 +
3 + 3 = 11. The Mask's +1 did not fire on their T3, and in this hand it is the reason nothing happened.
The no-Mask control below shows that a second body at A does the same.

**Your T4.** You Hold both: **5 to 1**. Their 11 will break either garrison, and nothing you have
makes one of them 11. Note what a second body does here. Stalwart Poro alone at A is 6; with the Guardian
beside it, the legend's +2 and the Mask's +1 are gone and A is 2 + 1 + 3 + 1 = 7. Company is worth more
than the alone bonuses on this board, and 7 still loses to 11. Your eight runes put three bodies in base,
where they wait for the battlefield that falls.

**Their T4: 11 into B.** Lux, the Ramhound and the Poro walk into B together (144.3). The Wielder
defends alone: the Mask fires again, and it is a 7. They assign 11, 7 of it lethal on the Wielder. You
assign 7, and you choose what dies: Lux (5) with 2 on the Ramhound, or the Ramhound and the Poro (3 + 3)
with 1 on Lux. A lone body kills as much as its Might covers; it is the 11 it receives that ends it. You
kill Lux. The Ramhound and the Poro take B: **5 to 2**. Attacking A instead, against Stalwart Poro's 6,
is the same point and the same kills.

**The control: Sunlit Guardian in the Wielder's place.** The same hand with a second Sunlit Guardian
where the Wielder was, played on T2 and walked into B on T3. Attacking alone it is 3 + 1 from the Mask
= 4 against the Pigeons' 3, and it takes B, surviving 3. Defending B alone it is 3 + 1 (Shield) + 2
(legend) + 1 (Mask) = 7, the Wielder's 7. Every number in the table is unchanged, and it ends **5 to
2**. This is not a property of this legend. A lone Wielder defending is 2 + 2 and a lone Sunlit Guardian
is 3 + 1, under any legend. The Wielder is better by one only when it attacks alone, and worse whenever
it has company: 2 against the Guardian's 3, or 4 defending. In this walk the Mask's +1 made the
Guardian's attack a 4, and a 4 kills the same 3 a 5 does.

**The control: no Mask.** The same hand with Wuju Apprentice played in the Mask's two runes. On your T3
the Wielder alone is 2 + 2 = 4 against the Pigeons' 3: it still takes B, **3 to 1**. Played the way the
main line plays it, with the Guardian in base, A is Stalwart Poro alone at 2 + 1 + 2 = 5. Their 6 take
it, and the game ends 4 to 3. That is not this hand's best T3. The Guardian goes onto A instead, which
you control (355.2.a). A then defends as 2 + 1 (Shield) + 3 + 1 (Shield) = **7**, with neither alone
bonus, and the Guardian is [Tank], 815.1.c.2: *"If more than one unit with Tank is present with the same
controller in Combat, damage may be assigned to any of them. Units without Tank are invalid assignments
until all units with Tank have lethal damage assigned to them."* Against the Ramhound and the Poro's 6,
4 of it is lethal on the Guardian and the other 2 are short of Stalwart Poro's 3. Your 7 kill both of
theirs, so they would lose two bodies for one and A would stay yours. B is the Wielder alone at 2 + 2 +
2 = 6. Their 6 into it kill everything, and B ends nobody's (466.5.b). Walked out, that trade ends **5
to 2**: on your T4 you Hold A and the Apprentice, ready in base, walks into empty B for a Conquer. On
their T4 Lux, alone, beats the Apprentice's 2 + 2 = 4 and takes B. Waiting ends the same: Lux goes to
base, you Hold A and B on your T4, and on their T4 their 11 take one battlefield: **5 to 2**. **On this
board the Mask was worth nothing.** Its +1 on a lone garrison bought what a second body beside it buys
with no alone bonus, and the second body was already in your hand. The Guardian is the reason. With Wuju
Apprentice beside the Poro instead, A is 2 + 1 + 2 = 5 and their 6 take it. A garrison of two is only
as big as the cards you have to put in it, and the Mask is +1 to whichever body you could not afford to
add.

**The trap, walked: the Mask first.** The entry's steps play the Mask first. Cast on T1, it leaves your
T2 with no body ready to walk into A. Their T2 is the main line's: the Pigeons take B, and the Ramhound
and the Poro go to base. Three lines from there, and all three end **2 to 3**:

- **The Wielder on T2.** On your T3 it takes B from the Pigeons as before, as a 5: **1 to 1**. But A is
  empty, and on their T3 the Ramhound and the Poro walk into it unopposed, a Conquer, and Lux goes
  beside them, three bodies that defend as 10. You Hold B on your T4; they Hold A on theirs.
- **Stalwart Poro and Lonely Poro on T2, and Lonely Poro into B on T3.** Stalwart Poro takes A on T3,
  and Lonely Poro, alone into B, is 2 + 1 = 3 against the Pigeons' 3. Both die, and B is empty for the
  Ramhound and the Poro.
- **Stalwart Poro and Lonely Poro on T2, and Lonely Poro kept home.** This is the best of the three.
  Stalwart Poro takes A on T3, **1 to 1**. Your six runes put the Wielder in base and the Guardian onto
  A, which then defends as 7, so their 6 cannot take it. But B is still theirs: on their T3 they Hold
  it, **1 to 2**, and Lux goes there, so B defends as 3 + 5 = 8. On your T4 you Hold A, **2 to 2**, and
  the Wielder alone is 5 against 8, so you do not attack. They Hold B on their T4. Had Lux gone to base
  instead, the Wielder would have taken B from the lone Pigeons on your T4, and their 11 would have
  taken one battlefield back: 3 to 3, a point better for you, so they put her on B.

A unit has to be played a turn before it can move, and the Mask does not. Played second, on the turn of the first lone combat, it costs nothing;
played first, it costs the body that took A.

**Their better T2: stack B and never attack.** If the Ramhound and the Poro go to B beside the Pigeons,
B defends as 3 + 3 + 2 = 8. On your T3 the Wielder alone is 5 against 8, and nothing of yours attacks.
On their T3 they Hold B and put Lux there too, 13. You Hold A on T3 and T4, they Hold B on T3 and T4:
**3 to 3**. Nothing of yours ever fights, so the Mask never fires and the Wielder never gets its +2, and
the control hands end the same 3 to 3. An opponent who keeps everything at home and never attacks a lone
garrison turns this engine off without a card.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 6 cards by T2 and 7 by T3. A Wielder among the first
6 is **40.30%**; a Mask among the first 7, **45.73%**; both on time, **16.89%**. The control's
Sunlit Guardian is a common Calm 3-drop and plays the same role, so the walk needs one of six cards on
T2, not one of three.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 the Wielder, alone and Mighty, took B from the
Pigeons; on their T3 the Mask's +1 kept both garrisons out of their reach. The predicate is: cast or
played by them on your T3, or prepared on their T2, does it stop the Wielder's Conquer of B?

**The scope.** A Mind/Order deck plays only Mind, Order and Mind/Order cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* The predicate is: a card in
`data/cards.json` whose domains are all Mind or Order (tokens carry no domain), not a legend,
battlefield or rune, and not a Signature card with another champion's tag. Folded by name, that is
**253** cards. Of the four Signature cards in those domains, three carry another tag and are out
(`OGN-266 Siphon Power`, `SFD-202 Hostile Takeover`, `UNL-200 Mirror Image`); Lux's own `OGS-022 Final
Spark` is in. None of the 253 is banned.

**What can be played in the Wielder's combat.** The combat is on your turn. While the Mask's trigger is
on the chain the turn is closed, 309.1: *"If a Chain exists, the turn is in a Closed State."* Only
[Reaction] plays there, 309.1.a: *"Only cards and abilities with the Reaction keyword can be played or
activated in a Closed State."* Once it resolves, the combat showdown is open and [Action] plays as well,
806.1.b: *"Action grants the corresponding card or effect permission to be played or activated during
Showdowns, even when it is not the Controlling player's turn."* **47** of the 253 have [Reaction],
[Hidden] or [Ambush] in their text (the regex `\[(Reaction|Hidden|Ambush)\]`, case-insensitive, on the
whole text with reminder text left in); with `\[Action\]` added it is **65**. That is a ceiling: it
includes gear whose [Reaction] is an ability on the board.

**The walk leaves them one ready rune.** On your T3 they have five runes, one of them ready, and any of
the five can be recycled for Power. Of the 65, nine cost one Energy or less. **Two break the line:**

- **`SFD-064 Cloth Armor`** (Mind gear, E1): *"[Quick-Draw] (This has [Reaction]. When you play it,
  attach it to a unit you control.)"*, with *"[Effect] [Shield 2] (+2 :rb_might: while I'm a
  defender.)"* Played on the Pigeons in the Wielder's combat, it makes them a 5 against its 5. Each
  side's damage is lethal on the other, both die, and B ends nobody's (466.5.b). No Conquer, and the
  Wielder is dead. **One ready rune and no Power.**
- **`VEN-052 Mesmerize`** (Mind, E1 + 1 Mind Power): *"Choose one — • Return a friendly unit to its
  owner's hand. • Give an enemy unit -2 :rb_might: this turn."* The second mode makes the Wielder a 3
  against the Pigeons' 3: both die, and B ends nobody's. The ready rune pays the Energy and a Mind rune
  among the five is recycled for the Power, so it costs them a rune for good.

**Cloth Armor is the cheaper of the two**: the same outcome, with no Power and no rune lost.

The other seven do not:

- `OGN-104 Retreat` returns the Pigeons to their hand. The Wielder is left alone at B and takes it.
- `OGN-095 Stupefy` makes the Wielder a 4, and 4 still beats a 3.
- `UNL-173 Sacrifice` needs a friendly Mighty unit to kill as its cost, and the Pigeons are a 3.
- `VEN-061 Decree of Insight` reaches only an enemy Body unit, and the Wielder is Calm.
- `SFD-080 Bellows Breath` deals 1 to the Wielder, and 1 + 3 is short of its 5. Its [Repeat] needs a
  second Energy they do not have.
- `OGN-120 Seal of Insight` and `OGN-245 Seal of Unity` are gear. Their [Reaction] is an ability of
  the gear on the board, and neither is on the board.

*A card hidden at B on their T2.* They control B once the Pigeons take it, which is what hiding needs,
811.1.b: *"While this card is in your hand or in your Champion Zone on your turn during an Open State,
you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown
card hidden there for as long as you control that battlefield. Beginning on the next turn, this gains
[Reaction] and you may play this, ignoring its base cost."* The [A] is one rune recycled, 164.2.b:
*"Recycle this: [Reaction] — Add [C]."* Played from facedown, the card has Reaction, 811.6: *"A card that
is Hidden gains Reaction while facedown or played from facedown, and may be played any time a card with
Reaction may be played as a result."* A unit it plays goes to B, 811.1.d.3: *"If a hidden spell or a
play effect of a hidden permanent causes you to play a unit, you must choose to play that unit at that
battlefield."* **13** of the 253 carry the [Hidden] keyword. **Ten stop the Conquer**, and seven of them
do it the way this engine invites, by putting a second body beside the defender:

- The seven bodies. `OGN-094 Sprite Call` (a ready 3) and `UNL-081 Keeper of Masks` (three 1s) make
  the defense 6 against 5: the Wielder dies and B stays theirs. `VEN-117 Disciple of Shen` defends as a
  4 beside exactly one other unit, the Pigeons: 7 against 5, same result. `OGN-097 Blastcone Fae` is a
  2 and gives the Wielder -2: 3 against 5, same result. `SFD-154 Guards!` (a 2), `OGN-121 Teemo,
  Strategist` (a 2) and `VEN-135 Kennen, Keeper of Balance` (a 2; his stun needs two Energy they do not
  have) make it 5 against 5: everything dies, and B ends nobody's.
- `OGN-213 Hidden Blade` kills the Wielder; you draw 2.
- `SFD-070 Wages of Pain` puts 3 on the Wielder, and the Pigeons' 3 make 6 on a 5. Its 5 kill the
  Pigeons, and B ends nobody's.
- `OGN-220 Facebreaker` stuns the Pigeons and the Wielder. Neither deals combat damage, both are left,
  and the attacker goes home, 466.1.a.2: *"Insert “3d. Recall Attackers present at the Battlefield if
  Defenders are still present.”"*

`OGN-083 Consult the Past` only draws, `UNL-083 Smoke and Mirrors` needs a [Temporary] unit, and
`VEN-066 Temporal Breach` re-plays a unit as a new one: on the Pigeons it is still a 3, and on the
Wielder it comes back at B still attacking alone, a 4 at least. None of the three stops it. Every hidden
card costs them one recycled rune on their T2, for good.

**What the census says about the engine.** 740.2.a makes "alone" a fact about your side, and 465.2.c
makes the fight a sum over theirs. Every one of the seven hidden bodies answers the lone attacker by
adding to the sum the Wielder has to beat, and none of them has to touch the Wielder to do it.

**And the board.** `UNL-210 Forbidding Waste` is a colourless battlefield: *"While a unit here is
defending alone, it has -2 :rb_might:."* Registered as one of their three, it is in play in one Duel in
three, 485.5: *"Setup: Each player randomly selects one (1) of their three (3) Battlefields. The other
two are removed and will not be used for this game. The selected Battlefields are placed simultaneously
in the Battlefield Zone."* It takes
back exactly the legend's +2 from whichever lone defender stands on it, theirs as well as yours.

## 6. Verdict

**Right about the definition; on this board each card did the other's job, and a plain body did
both.** 740.2.a counts only your own side, the Mask checks at the designation and
never again, and none of the three bonuses is a buff, so a lone Wielder is a Mighty 5 attacking and,
under Wuju Bladesman, a 7 defending. Walked against a Lux deck that kept two bodies at home to attack
your battlefield, the Wielder took theirs on T3 as a 5 against a 3, the Mask made both of your lone
garrisons too big for their 6, and they did not attack until Lux joined them: **5 to 2** after their
T4. Without the Mask, the same hand also ends **5 to 2**: the Wielder alone is still a 4 against a 3,
and the Sunlit Guardian beside Stalwart Poro makes your battlefield the same 7 with no alone bonus.
With a Sunlit Guardian in the Wielder's place, it ends **5 to 2**: a lone Sunlit Guardian defends at the
Wielder's number under any legend, and with the Mask it kills the same 3. The T3 Conquer needs one of
the two cards, not both, and neither bought a point here that a plain 3-Might body did not. The Mask
played first, as the entry orders it, costs the body that took your battlefield and ends **2 to 3** in
all three lines walked. Against an opponent who stacks their own battlefield and never attacks,
nothing of yours fights alone and the engine does nothing: **3 to 3**, with or without it. The
cheapest answer to the walked line is Cloth Armor, one ready rune and no Power, and ten of the thirteen
hidden cards stop it for one recycled rune, seven of them by adding a body.

## 7. Not verified

I did not deal the channel order. Nothing you play in the walk costs Power, so it does not depend on
which of your twelve runes come first: it fails in **0 of 924** deals of six Calm and six Body.

Their walk assumes six Mind and six Order in the twelve of Tournament Rules 402.1. Lux on their T3 needs
a Mind among their seven: **0 of 924**. Mesmerize on your T3 needs a Mind among their five: it fails in
**7 of 924, 0.76%**. Cloth Armor and hiding need no particular domain.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their two turns. A hidden card has to be among those six too, since it is
hidden on their T2. Cloth Armor, run three times, is among them in **40.30%**. Two answers in three
copies each (six cards), **66.05%**; three (nine cards), **81.80%**. These count only the cards named,
not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2 (where the legend is restricted), Yi, Meditative (his +4 needs 8 runes, and recycling a
rune for his Power on T4 leaves 7), a removal spell on the Wielder before T3, and their battlefield
being Forbidding Waste. The probabilities count only the cards named.

## Leads

- The notable *"a lone raider kills at most one thing and eats everything"*: the second half is right,
  the first is not. A lone unit assigns its whole Might lethal-first under 465.2.c.3 like any other
  side, so a 5 kills a 3 and a 2, and in the walk the lone Wielder defending at 7 could kill the
  Ramhound and the Poro (3 + 3) or Lux. What it cannot do is spread the damage it receives, which is
  the sum of their whole side (465.2.c).
- The steps' order, Mask first: walked and refuted on this board. Units enter exhausted (143.4) and the
  Mask needs no ready turn, so the order is the lone body first and the Mask on the turn of its first
  combat. The Mask first on T1 took the turn the first body needed, and all three lines walked from it
  ended 2 to 3, against 5 to 2.
- The notable *"AND THE MASK PAYS FOR ANY LONE BODY, NOT ONLY THIS ONE"*: right, and it means the
  Wielder is optional. A lone `OGN-054 Sunlit Guardian` (E3, M3, [Shield]) defends at 3 + 1, the
  Wielder's 2 + 2, under any legend; the Wielder is one point better only while attacking alone, and
  worse beside any other unit. In the walk the Guardian in its place ended the same 5 to 2. Worth naming
  `OGS-019 Wuju Bladesman - Starter`, whose own text is a third "alone" bonus and makes a lone defending
  Wielder a 7; it is restricted in 2v2.
- The notable on the Duel, *"it fires twice a combat round - once for the attacker and once for the
  defender"*: it fires once per combat in which a unit of yours is alone, and the opponent decides how
  many of those there are. In the walk it fired once on your T3 and once on their T4, and on their T3 it
  fired zero times because its +1 made both garrisons unprofitable to attack. That deterrence is real,
  but it is not the Mask's alone: with no Mask, a Sunlit Guardian played beside the lone garrison made it
  the same 7, and the no-Mask hand ended the same 5 to 2. The Mask is +1 to a body you could not afford
  to give company.
- `terminatesIn` (*"nothing here scores"*): true of the cards, but the walked line's points come from
  what they let a lone body take and keep. Against an opponent who stacks their own battlefield and
  never attacks, nothing fights alone and the engine is blank: 3 to 3 with or without it.
- No answer is named. `SFD-064 Cloth Armor` (E1, no Power) on the lone body's opponent turns a 5 into
  a 5-against-5 trade, `VEN-052 Mesmerize` does the same from the other side, and any hidden body at
  the battlefield the lone unit walks into adds to the sum it must beat. `UNL-210 Forbidding Waste`
  takes back the legend's +2 from a lone defender.
