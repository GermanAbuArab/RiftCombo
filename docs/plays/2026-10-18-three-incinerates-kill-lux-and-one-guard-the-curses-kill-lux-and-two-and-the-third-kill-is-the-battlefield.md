# Play — Three Incinerates kill Lux and one guard, the Curses kill Lux and two, and the third kill is the battlefield

Issue #406 (a slice of #200), 2026-10-18. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `consuming-curse-annie-self-scaling-bonus`**, the Fury ENGINE in which `VEN-010 Consuming
Curse` (E2, [Action]) deals 2 to a unit at a battlefield plus 1 for each Consuming Curse already in your
trash, and `OGS-001 Annie, Fiery` adds 1 to every copy. The entry is right about the rules. The trash is
a zone, read when the spell resolves; 714 adds Annie's instance to the Curse's own; and three copies cast
in order under Annie are 3, 4 and 5. Walked as a game, going first, against a Mind/Order Lux deck that
built its battlefield wide and put `OGS-006 Lux, Illuminated` (M5) on it, all three copies landed on
your T4. They killed a 3, a 3 and Lux, and Annie took the battlefield: **4 to 2** after their T4. The
honest control is the same hand with three `OGS-003 Incinerate`, the Curse's own first sentence and
nothing else. Under Annie each is a 3, and damage stays marked until the end of the turn, so two of them
kill Lux and the third kills one of her 3s. The 3 and the 2 left beside it are 5 against Annie's 4:
**3 to 3**, with Lux dead. Spent on the three small bodies instead, they leave Lux alone at 5 against the
same 4. Three Deals of 3 kill Lux and one guard, or three guards. Three of 3, 4 and 5 kill Lux and two,
and that third kill is the Conquer. It is all the scaling bought, and it needs all three copies in hand,
which happens in **0.61%** of games by T4. Two copies are 3 + 4, which kill Lux and nothing else: one
kill fewer than the Incinerate line, and the same 3 to 3. One `OGN-024 Void Seeker` in the third slot does the third copy's job for one
rune more. Their better T3 does not play Lux at all: it puts three more small bodies on the
battlefield, and then the 4 and the 5 have nothing to kill that a 3 could not. That line ends **3 to
3**. Three answers to the walked line tie at one ready rune: `SFD-064 Cloth Armor`, `OGN-104 Retreat`
and `VEN-052 Mesmerize`. Only Cloth Armor and Mesmerize stop the Conquer, and only Cloth Armor does it
with no Power: on their last defender in Annie's combat, the battlefield ends nobody's.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-18 at `4b613b4`, reads
773 entries, 262 with forced-ordering language, **100 in the queue and 15 of them with no play**, as
the issue measured. The two picks are unchanged: this entry is rank 87, the second in the list. The
other entry of this slice is rank 86, `buhru-captain-kinkou-initiate-modal-cantrips`, played in
[The Captain's draw is never a card behind his buff, and a two-drop played first is what turns the Initiate on](2026-10-18-the-captains-draw-is-never-a-card-behind-his-buff-and-a-two-drop-played-first-is-what-turns-the-initiate-on.md). Annie's own rules (715.2, her Champion Zone under Dark Child) are
walked in
[Annie's +1 kills the 5-Might body that 2 + 2 cannot, and that is a battlefield](2026-10-16-annies-plus-one-kills-the-five-might-body-that-two-plus-two-cannot-and-that-is-a-battlefield.md),
and are not re-derived here.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGS-017 Dark Child - Starter` (Fury/Chaos, tag Annie) |
| **Chosen Champion** | `OGS-001 Annie, Fiery` (Fury, E5 + 1 Fury Power, M4) |
| **The spell, three copies** | `VEN-010 Consuming Curse` (Fury, E2) |
| **The bodies** | `OGN-010 Legion Rearguard` (Fury, E2, M2) and `OGN-175 Shipyard Skulker` (Chaos, E3, M3), to hold your battlefield |

The entry admits any of sixteen Fury legends. Dark Child is the one for this walk for the reason the
Annie play gives: it is the only one of the sixteen tagged Annie, so Annie is its Chosen Champion and
starts in the Champion Zone rather than being a draw. It also has a second reason here. Its text is
*"At the end of your turn, ready up to 2 runes."*, and the Curse is an [Action] spell that costs Energy
only, so those two runes can pay a copy on the opponent's turn. §4 walks that window.

Both cards are mono-Fury, so a Fury/Chaos deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* The
three copies are the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* None of the cards in this play is a Signature card (`signature` in `data/cards.json`), and none
is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Consuming Curse: *"[Action] (Play on your turn or in showdowns.) Deal 2 to a unit at a battlefield.
  This deals 1 Bonus Damage for each card with this name in your trash."*
- Annie, Fiery: *"Your spells and abilities deal 1 Bonus Damage. (Each instance of damage the spell
  deals is increased by 1.)"*
- The control, `OGS-003 Incinerate` (Fury, E2): *"[Action] (Play on your turn or in showdowns.) Deal 2
  to a unit at a battlefield."*

## 2. What a copy deals, and when it is counted

**Two instances, summed once.** 713: *"Bonus Damage is an intrinsic property that can be granted to
Deal actions that influence the amount of Damage that the action is distributing."* The Curse's clause
is one instance and Annie's is another, 714: *"If more than one instance of Bonus Damage is applied or
granted to a Deal action, all instances are summed and applied once."* A copy has one target, 715.1:
*"If the Deal action has a single target, the amount of Damage to that target will be increased by the
Bonus Damage granted to it."* So a copy is 2, plus the copies in your trash, plus 1 if Annie is on the
board.

**The copy being cast is never in the count.** A spell goes to the trash after it has done its work,
157: *"A spell creates a game effect according to its instructions and is then placed in the Trash of
the player who owns it."* So while a copy resolves it is on the chain, not in the trash, and the count
is the copies cast or discarded before it. The first is a 2, the second a 3, the third a 4, and under
Annie 3, 4 and 5. Only your own copies count, 056: *"Cards a player owns may never be placed into a
non-Board zone belonging to another player."*

**A copy that hits nothing still counts.** If its target is gone when it resolves, it resolves anyway,
359.3.e.1: *"The spell resolves even if some or all of its targets are illegal."* Then 157 puts it in
the trash. A countered copy goes there too, 425.1.a.1: *"Cards that are cleared from the chain in this
way are placed in the trash."* So saving the target of one copy does not stop the next one growing.

**Damage does not carry over.** Each copy kills only if it is lethal on its own, or with damage marked
earlier the same turn, because every unit heals at the end of the turn, 317.2.b: *"Insert “3c. Heal all
Units.”"* The entry's *"9 damage"* and *"12"* are sums over three Deal actions, in practice to three
different units.

**Only units at a battlefield.** The Curse says *"a unit at a battlefield"*, so a unit in a base is out of
reach.

**When you can cast it.** On your own turn in your Main Phase, and on theirs only in a showdown, 806.1.b:
*"Action grants the corresponding card or effect permission to be played or activated during
Showdowns, even when it is not the Controlling player's turn."* A showdown opens on their turn only when
their units go somewhere they do not control, 190.3.a.1: *"Units moving to or being played to a
battlefield apply Contested status if that battlefield is not already Contested and that Unit’s
controller does not already control that battlefield."* A unit played to a battlefield they already
control opens nothing.

**The runes, going first.** You have 2, 4, 6 and 8 runes on T1 to T4, less any you recycle. Power is
paid by recycling a rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* Annie is five runes, one of
them a Fury rune recycled for her Power. A copy is two runes and recycles nothing. Dark Child's readies
last into their turn, because the pool empties and the runes do not, 167: *"Every player's Rune Pool
empties at the start of each player's Main Phase and the end of each player's turn."* Without Dark
Child, a rune you exhausted stays exhausted for their whole turn, 415.3.a: *"A player Readies all
non-spell Game Objects they Control during the Awakening Phase on their turn."*

## 3. Their deck: Mind/Order Lux

`OGS-021 Lady of Luminosity - Starter` (Mind/Order): *"When you play a spell that costs :rb_energy_5: or
more, draw 1."* It never fires in the walk. Its Chosen Champion is Lux, Illuminated (Mind, E6 + 1 Mind
Power, M5): *"When you play a spell that costs :rb_energy_5: or more, give me +3 :rb_might: this
turn."* She is a unit tagged Lux and Demacia, and not a Signature card, so she starts in their Champion
Zone. Their bodies are `UNL-154 Crimson Pigeons` (Order, E3, M3; *"I have +2 :rb_might: while I'm
attacking with another unit."*), `SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you have another
unit here, I have +1 :rb_might:."*), `OGN-210 Daring Poro` (Order, E2, M2; *"[Assault] (+1 :rb_might:
while I'm an attacker.)"*) and `OGN-087 Lecturing Yordle` (Mind, E3, M2; [Tank], *"When you play me,
draw 1."*). Going second, they channel an extra rune on T1, 485.7: *"First Turn Process: The player
going second channels an extra Rune from their Rune Deck during their first Channel Phase of the
game."* §5 names their answers.

## 4. The turns, going first

Fury/Chaos against Mind/Order. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*); theirs is B, `VEN-162 Protective Sands` (*"When you conquer
here, if you control 4 or fewer runes, you may pay :rb_energy_1: to draw 1."*). Neither fires: you have
no buff, and nobody conquers B with four runes or fewer. Your opening four are two Consuming Curses,
Legion Rearguard and Shipyard Skulker. Your draws are `OGN-171 Mystic Poro` (T1), `OGN-185 Traveling
Merchant` (T2), `OGN-003 Chemtech Enforcer` (T3) and the third Consuming Curse (T4). Their opening four
are Crimson Pigeons, Trusty Ramhound, Daring Poro and Lecturing Yordle. Their draws are `OGN-096
Watchful Sentry` (T1), `SFD-155 Honest Broker` (T2), `OGN-219 Vanguard Sergeant` (T3) and `UNL-156
Loyal Poro` (T4).

```
turn      runes   your turn                                                 points
T1        2       Legion Rearguard (E2) to base. None left; Dark Child      0
                  readies two at the end of the turn.
their T1  3       Crimson Pigeons (E3) to base. None left.
T2        4       The Rearguard walks to A, Conquer: +1. Shipyard Skulker   1
                  (E3) to A. One left, three ready after Dark Child.
their T2  5       The Pigeons walk to B, Conquer; you pass in the
                  showdown. Trusty Ramhound (E2) and Daring Poro (E2) to
                  B. One left.
T3        6       Hold A: +1. Annie, Fiery (E5 + 1 Fury Power) from the     2
                  Champion Zone to base. Six runes, one recycled; one
                  left, three ready after Dark Child.
their T3  7       Hold B. Lux, Illuminated (E6 + 1 Mind Power) from the
                  Champion Zone to B. Seven runes, one recycled; one
                  left.
T4        7       Hold A: +1. Consuming Curse three times (E2 each): 3 on   4
                  the Pigeons, 4 on the Ramhound, 5 on Lux. Annie walks
                  to B: 4 against the Poro's 2, Conquer: +1. One left.
their T4  8       Nothing to Hold. Vanguard Sergeant (E4), Honest Broker
                  (E2) and Watchful Sentry (E2) to base. None left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 2 after their T4. After your T4 it
is **4 to 2**; after their T4, **4 to 2**.

Your hand, card by card: 5 after the T1 draw, 4 after the Rearguard; 5, then 4 after the Skulker; 5
after the T3 draw, still 5 after Annie, who comes from the Champion Zone; 6 after the T4 draw, 3 after
the three Curses (Mystic Poro, Traveling Merchant, Chemtech Enforcer). Theirs: 5 after the T1 draw, 4
after the Pigeons; 5, then 3 after T2 (Lecturing Yordle, Watchful Sentry, Honest Broker); 4 after the T3
draw, still 4 after Lux; 5 after the T4 draw, 2 after the three bodies (Lecturing Yordle, Loyal Poro).

**Their T1: the 3-drop first.** They lead with the Pigeons because a 3 survives the first copy's 2. A
2-Might body walked into B on their T2 is exactly what Dark Child's readied runes kill on their turn;
the end of this section walks that, and it is worse for them.

**Your T2.** The Rearguard takes A, which is empty, 316.8.b.1: *"Showdowns that occur as a result of a
player moving to an empty Battlefield are a stand-alone Phase and do not create a Combat."* The Skulker
goes to A, which you now control, 355.2.a: *"By default, Valid locations include the controller’s Base
or a Battlefield the controller controls."* A is 5, so the Pigeons alone, a 3, cannot take it on their
T2. One rune is left; Dark Child readies two more, so three are ready on their turn.

**Their T2: a window with nothing in it.** The Pigeons walking into empty B open a showdown there. They
have Focus first, 345: *"As a Showdown begins, the player who applied Contested status to the
Battlefield gains Focus."* They pass, and Focus comes to you, 347.2.b: *"Otherwise, Focus passes to the
next Player in Turn Order."* A copy now is a 2 against a 3, and the 2 heals at the end of their turn. You
pass. Casting it anyway, to put a copy in the trash, is the entry's own trap, and it is walked below. The
Pigeons take B. The Ramhound and the Poro go to B, which they now control (355.2.a): B is the Pigeons 3,
the Ramhound 3 (2, +1 for company) and the Poro 2.

**Your T3: Annie, kept home.** Six runes pay her: five exhausted, a Fury one of them recycled for the
Power. One rune is left, and a copy costs two. Dark Child readies two at the end of the turn, so three
are ready on theirs. All three copies wait for T4.

**Their T3: Lux to B, and no window.** They Hold B, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* Lux goes to B, which they
control, so nothing is contested and no showdown opens (190.3.a.1). Your three readied runes have no
window to spend in. Seven runes pay her: six exhausted, a Mind one of them recycled. B is the Pigeons 3,
the Ramhound 3, the Poro 2 and Lux 5: 13.

**Your T4: three copies, smallest first.** Your runes are 5 + 2 channelled = 7, all ready, 315.1.b:
*"1. The Turn Player readies all Game Objects they control that are able to be readied."* You Hold A.
Each copy is cast on its own and resolves before the next, and each kill happens in the cleanup after it.

- The first copy: 2, nothing in the trash, +1 from Annie = 3, on the Pigeons. They die, 142.4.b:
  *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s Might."* The
  Ramhound still has company and is a 3.
- The second: 2, +1 for the copy in the trash, +1 from Annie = 4, on the Ramhound. It dies.
- The third: 2, +2, +1 = 5, on Lux. She dies.

Lux is the only body here that needs the 5, so she takes the last copy, and the 3 and the 4 go to the
two 3s. Six runes are spent. The Poro is alone at B, a 2. Annie, ready in base since T3, walks in, 465.2.c:
*"Starting with the Attacker, each player assigns an amount of damage equal to their summed Might among
the other's Units."* Her 4 kill the Poro, whose [Assault] counts only when it attacks; its 2 do not kill
her. Only your unit is left, and that is a Conquer, 466.5.d: *"Establishing Control results in a Conquer
if that player has not yet scored this Battlefield this turn."* One rune is left, and nothing in your
hand costs one.

**Their T4.** There is nothing to Hold. Their board is empty and everything they play enters exhausted,
143.4: *"Units enter the Board exhausted."* They play three bodies to base, and none can score this turn.

**The control: three Incinerates.** The same hand with `OGS-003 Incinerate` in place of every Curse is
the same runes, the same windows and the same first sentence. Under Annie each is a 3, and a kill can be
built from two of them, because damage stays marked until the turn ends (317.2.b) and the cleanup reads
the total, 143.2.a: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might,
it is Killed."* Every way to spend three Deals of 3 on B:

- Two on Lux (6 on her 5) and one on a guard. Lux dies, and so does the guard. The two left are 5 or 6
  against Annie's 4: a 3 and the Poro 2, or the Pigeons and the Ramhound, which keeps its company.
- One each on the Pigeons, the Ramhound and the Poro. Lux is alone at B, 5 against 4.
- Any other split kills fewer than three, and Lux lives.

So Annie stays home either way. After your T4 it is **3 to 2**, and after their T4, when they Hold B,
**3 to 3**. Take the first split, and Lux is dead and B is two small bodies. The Curses' 3, 4 and 5 kill
Lux with one Deal, not two, and that frees a Deal for the third kill, which leaves the Poro alone and
gives Annie the Conquer. **The scaling bought one point and a third body.** Lux dies in both lines.

**The control with the best plain card: Void Seeker.** `OGN-024 Void Seeker` (Fury, E3 + 1 Fury
Power): *"[Action] (Play on your turn or in showdowns.) Deal 4 to a unit at a battlefield. Draw 1."*
Under Annie it is a 5. In the third slot it is three runes, one Fury recycled, so the two Curses and the
Seeker are exactly the seven T4 runes, and the walk ends the same, with a card drawn. It needs no other
copy beside it. §7 prices the difference.

**What Annie added.** Without her the copies are 2, 3 and 4. They kill the Poro and the two 3s, and Lux
is alone at B, a 5, with nothing of yours that can walk into her. Annie's +1 on every copy is what turns
the third copy into a 5.

**Their better T3: wide, not Lux.** Lux is not their best turn. Their seven runes pay for Lecturing
Yordle (E3; they draw 1), Watchful Sentry (E2, M1) and Honest Broker (E2, M2), all to B. B is the
Pigeons 3, the Ramhound 3, the Poro 2, the Yordle 2, the Sentry 1 and the Broker 2: six bodies and 13
Might, with nothing above 3. On your T4 the three copies kill three bodies, and nothing there needs more
than a 3. Kill the Pigeons, the Ramhound and the Yordle, the three without a [Deathknell], and the Poro,
the Sentry and the Broker are 5 against Annie's 4. You Hold A and do not attack: **3 to 2** after your
T4. They Hold B on theirs: **3 to 3**, with Lux still in their Champion Zone. Three Incinerates do
exactly the same. Better still for you is to cast two copies and keep the third: its count is in the
trash already, so it is still a 5 on the turn Lux reaches a battlefield. Against a board of 3s the 4 and
the 5 are overkill, and the engine is three Incinerates until something with Might 5 or more appears.

**The trap, walked.** On their T2 you could cast the first copy at the Pigeons anyway: 2 on a 3, healed
at the end of the turn, and a copy in the trash. Then your T4 copies are 2 + 1 + 1 = 4 and 2 + 2 + 1 =
5, and there are only two. They kill the Ramhound and Lux. The Pigeons 3 and the Poro 2 hold B against
Annie's 4: **3 to 2** after your T4 and **3 to 3** after theirs. The entry's notable is right: a copy
spent on nothing loses a Deal action, and the extra point of damage on the next two does not pay for it.

**Curses first, Annie second.** The entry plays Annie first. Cast the other way, on your T3, two copies
are 2 and 3 with no Annie yet. They kill the Poro and the Pigeons, and the Ramhound, alone, is a 2. Your
last two runes put Mystic Poro in base. They Hold B on their T3 and put Lux beside the Ramhound. On your
T4, Annie is five runes with one recycled and the third copy is two, so seven runes pay for both. Under
her it is a 5 and kills Lux. But Annie enters exhausted, and your Mystic Poro walks into the Ramhound
2 against 2: both die and B is nobody's, 466.5.b: *"If there are no Units remaining here controlled by
any player, the Battlefield becomes Uncontrolled."* **3 to 2** after your T4, and still 3 to 2 after
theirs. Annie first is a point better here.

**Their other T1: the Poro first, into Dark Child's runes.** If they open with Daring Poro (E2) instead
and walk it into B on their T2, the showdown there has a target. Two of your three readied runes cast
the first copy, a 2, and the Poro dies. No one is left at B, so no one takes it (466.5.b). The Ramhound and the Pigeons go to their base,
because B is not theirs. On their T3 the two walk into B together, 144.3: *"Players may perform multiple
Units' standard move simultaneously. This is treated as one game action performed on multiple
Units."* Another showdown opens, and your three readied runes cast the second copy: 2, +1, +1 from Annie
= 4, on the Pigeons. The Ramhound takes B, and Lux goes beside it. On your T4 the third copy, a 5, kills
Lux, and Annie walks into the lone Ramhound, a 2. After your T4 it is **4 to 1**, and still **4 to 1**
after theirs. Dark Child paid for two copies out of runes you would otherwise have had idle on their
turn. Under any other legend you end T2 and T3 with one ready rune, and a copy needs two. The total is
2 + 4 + 5 = 11, not the entry's 12, because the first copy was cast before Annie. On a 2-Might body, a
copy on their T2 was worth more than the +1. This is why the walked T1 is the Pigeons.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen **8** cards by T4. All three Curses are among them in
**0.61%** of games; exactly two, **9.50%**; at least two, **10.11%**. Even by 12 cards seen, T8, all
three is **2.41%**. With two copies on T4 the walk ends where the Incinerate line does, one kill short of it. The 3 and the 4 on Lux are 7
on her 5, and she dies, or they kill the Pigeons and the Ramhound and she lives. Either way the two Deals
leave B at 5 or more against Annie's 4, and it ends **3 to 3**. The third kill is about a one-in-163
hand on T4. One Void Seeker in three copies is among the 8 in **50.82%**.

## 5. Breaks to

**What the engine did, and the predicate.** On your T4 the third copy killed Lux, and Annie took B. The
predicate is: cast or played on your T4, or prepared on their T3, does it keep Lux alive or stop Annie's
Conquer of B?

**The scope.** A Mind/Order deck plays only Mind, Order and Mind/Order cards (103.1.b), and its
Signature cards must carry its legend's tag, 103.2.d.2: *"All of the Signature cards must have the
Champion tag that corresponds to the Champion Legend of the deck."* The predicate is: a card in
`data/cards.json` whose domains are all Mind or Order (tokens carry no domain), not a legend,
battlefield or rune, and not a Signature card with another champion's tag. Folded by name, that is
**253** cards. Of the four Signature cards in those domains, three carry another tag and are out
(`OGN-266 Siphon Power`, `SFD-202 Hostile Takeover`, `UNL-200 Mirror Image`); Lux's own `OGS-022 Final
Spark` is in. None of the 253 is banned.

**Two windows, two keyword sets.** While a copy is on the chain the turn is closed, 309.1: *"If a Chain
exists, the turn is in a Closed State."* Only [Reaction] plays there, 309.1.a: *"Only cards and
abilities with the Reaction keyword can be played or activated in a Closed State."* **47** of the 253
have [Reaction], [Hidden] or [Ambush] in their text (the regex `\[(Reaction|Hidden|Ambush)\]`,
case-insensitive, on the whole text with reminder text left in). That is a ceiling: it includes gear
whose [Reaction] is an ability on the board, and `OGN-107 Ava Achiever`, whose text only names [Hidden].
Annie's walk into B opens a combat showdown, where [Action] plays as well (806.1.b). With `\[Action\]`
added it is **65**.

**The walk leaves them one ready rune.** On your T4 they have six runes, one of them ready, and any of
the six can be recycled for Power. Of the 65, nine cost one Energy or less. **Three break the line,
and none of them breaks both halves:**

- **`SFD-064 Cloth Armor`** (Mind gear, E1): *"[Quick-Draw] (This has [Reaction]. When you play it,
  attach it to a unit you control.)"*, with *"[Effect] [Shield 2] (+2 :rb_might: while I'm a
  defender.)"* Played on the Poro in Annie's combat, it makes the Poro a 4 against her 4. Both die, and
  B ends nobody's (466.5.b). No Conquer, and Annie is dead. **One ready rune and no Power.** Lux still
  dies.
- **`OGN-104 Retreat`** (Mind, E1): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Return a friendly unit to its owner's hand. Its owner channels 1 rune exhausted."* Cast in
  answer to the third copy, it puts Lux back in their hand. The copy resolves with no legal target and
  does nothing (359.3.e.1). Lux has changed zones, 359.3.e.2: *"A target is illegal as the spell
  resolves if it no longer meets the targeting requirements of the spell, or if it has changed Zones to
  or from a Non-Board Zone."* Lux lives, and costs them seven runes again. Annie still takes B from the
  lone Poro.
- **`VEN-052 Mesmerize`** (Mind, E1 + 1 Mind Power): *"Choose one — • Return a friendly unit to its
  owner's hand. • Give an enemy unit -2 :rb_might: this turn."* The first mode is Retreat. The second,
  in Annie's combat, makes her a 2 against the Poro's 2: both die, and B ends nobody's. It is one or the
  other. The ready rune pays the Energy and a Mind rune among the six is recycled for the Power; it can
  be the same rune, if that one is Mind, so it is one rune too.

**The three tie at one ready rune.** Retreat and Mesmerize's first mode save Lux and leave the Conquer.
Cloth Armor and Mesmerize's second mode stop the Conquer and leave Lux dead. Only Cloth Armor stops the
Conquer with no Power, and Mesmerize recycles a rune for good.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune and then only the
Channel Phase's two a turn (315.3.b), each rune they recycle is a rune short on every turn through their T5,
until their Rune Deck runs dry (161.2.a); a card that channels more (430.2) brings it back sooner. The walk
ends after their T4, so the count stands for every turn it covers. The wording above is kept as history.]

The other six do not:

- `UNL-173 Sacrifice` kills Lux as its cost (she is Mighty at 5), and they draw 2 and channel a rune.
  Cast in answer to the third copy, it takes the kill away from you without saving her. B still falls.
  It does not break the line, but it is strictly better for them than letting the copy resolve.
- `OGN-095 Stupefy` makes Annie a 3, and 3 still beats the Poro's 2.
- `VEN-061 Decree of Insight` reaches only an enemy Body unit, and Annie is Fury.
- `OGN-120 Seal of Insight` and `OGN-245 Seal of Unity` are gear. Their [Reaction] is an ability of
  the gear on the board, and neither is on the board.
- `SFD-080 Bellows Breath` deals 1 to Annie, and 1 + 2 is still short of her 4. Its [Repeat] needs a
  second Energy they do not have.

*A card hidden at B on their T3.* They control B, which is what hiding needs, 811.1.b: *"While this
card is in your hand or in your Champion Zone on your turn during an Open State, you may pay [A] to
hide this facedown at a battlefield you control that doesn't already have a facedown card hidden there
for as long as you control that battlefield. Beginning on the next turn, this gains [Reaction] and you
may play this, ignoring its base cost."* The [A] is one more rune recycled (164.2.b). Lux and the hide
together are seven runes with two recycled, so it costs them a rune for good and nothing on your T4.
[2026-10-24, #452: not for good. A recycled rune goes to the bottom of the Rune Deck (416.1, 416.1.b) and is
channelled again when the deck reaches it (430.1). Going second, with 485.7's extra rune and then only the
Channel Phase's two a turn (315.3.b), each rune they recycle is a rune short on every turn through their T5,
until their Rune Deck runs dry (161.2.a); a card that channels more (430.2) brings it back sooner. The walk
ends after their T4, so the count stands for every turn it covers. The wording above is kept as history.]
Played from facedown, the card has Reaction, 811.6: *"A card that is Hidden gains Reaction while
facedown or played from facedown, and may be played any time a card with Reaction may be played as a
result."* A unit it plays goes to B, 811.1.d.3: *"If a hidden spell or a play effect of a hidden
permanent causes you to play a unit, you must choose to play that unit at that battlefield."* **13** of
the 253 carry the [Hidden] keyword. **Eleven stop the Conquer, and one of them also saves Lux:**

- **`VEN-066 Temporal Breach`**: *"Banish a unit, then its owner plays it to the same location,
  ignoring its cost."* Cast in answer to the third copy, it makes Lux a new object, 359.3.e.4: *"If a
  target changes Zones to or from a Non-Board Zone and then returns to its original zone, it is no
  longer a legal target, because it's not treated as the same object."* The copy does nothing, B is the
  Poro and Lux, 7 Might, and Annie stays home. **One recycled rune on their T3 for both halves.**
- `OGN-213 Hidden Blade` kills Annie in her combat; you draw 2.
- `OGN-220 Facebreaker` stuns the Poro and Annie. Neither deals combat damage, nobody dies, and Annie
  does not take B.
- `SFD-070 Wages of Pain` puts 3 on Annie, and the Poro's 2 kill her. Her 4 kill the Poro, and B ends
  nobody's.
- The six bodies each join the Poro at B: `OGN-094 Sprite Call` (a 3), `UNL-081 Keeper of Masks`
  (three 1s), `SFD-154 Guards!` (a 2), `OGN-097 Blastcone Fae` (a 2, and -2 on Annie), `OGN-121
  Teemo, Strategist` (a 2), `VEN-135 Kennen, Keeper of Balance` (a 2). With Guards!, Teemo or
  Kennen it is 4 against her 4: everything dies, and B ends nobody's. With Sprite Call or Keeper of
  Masks it is 5 against 4, and with the Fae 4 against her 2: she dies, and B stays theirs.
- `VEN-117 Disciple of Shen` defends as a 4 beside exactly one other unit, the Poro: 6 against 4.

`OGN-083 Consult the Past` only draws, and `UNL-083 Smoke and Mirrors` needs a [Temporary] unit, so
neither stops it.

**On their T3: name the spell.** `VEN-132 Fallen Feline` (Order, E2 + 1 Order Power, M3): *"When you
play me, name a spell. While I'm at a battlefield, opponents can't play spells with that name."*
Played to B naming Consuming Curse, it shuts off all three copies at once, because all three have that
name. Their seven runes pay for it (two, one of them recycled), Lecturing Yordle and Watchful Sentry. On your T4 no
copy can be cast. B is six bodies, and Annie stays home: **3 to 2**, then **3 to 3** after their Hold.
The Feline itself is a 3 at a battlefield that only a card with another name can remove. **One Main
Phase card answers the whole engine for two runes.**

**And the windows on their turn.** In the Poro line of §4, the first two copies are cast in their own
showdowns, and a player moves before spending, so they meet every rune they have ready: five on their
T2, seven on their T3. For example, `SFD-151 Bonds of Strength` (Order, E2, [Reaction]) makes the Poro a
3 that survives the first copy and takes B. `UNL-071 Chakram Dancer` ([Ambush], E3) joins it and stays
when it dies. Retreat saves it, though B still ends nobody's. They can also spend first and move
second, which leaves them nothing to answer with. Dark Child's window is real, and it is open exactly
when their runes are open too.

## 6. Verdict

**Right about the rules; one card short of its own number.** The trash is a zone, a copy is counted
after the one before it has resolved, a saved target still puts the copy in the trash, and 714 adds
Annie's 1 to every copy. Walked against a Lux deck that put its 5-Might Chosen Champion on its
battlefield, three copies on T4 were 3, 4 and 5. They killed two 3s and Lux, and Annie took B: **4 to
2** after their T4. Three Incinerates kill Lux too, with two of them, and one 3 with the third, and the
two bodies left hold B against Annie: **3 to 3**. So the scaling was worth one point, and what it bought
was a third kill: Lux needed one Deal instead of two. That needs all three copies, about a one-in-163
hand on T4 (0.61%); two copies kill one body fewer than the Incinerate line and end 3 to 3 with it. One Void Seeker does the third copy's job for
one rune more and draws a card. Against their better T3, three more small bodies and Lux held back, the
4 and the 5 have nothing to kill that a 3 could not: **3 to 3**. The Curse's edge over Void Seeker is
that one rune. A copy is two runes, the Seeker three with a Fury recycled, and the walk has three ready
on their turn under Dark Child, so either fits that window. In the line where they walked a 2 into it,
the walk ended **4 to 1**.
Three answers tie at one ready rune, which the walk leaves them: Cloth Armor, Retreat and Mesmerize.
Cloth Armor in Annie's combat makes the Poro a 4, and B ends nobody's, with no Power. Mesmerize does the
same for a recycled Mind rune. Retreat saves Lux and leaves the Conquer. Temporal Breach, hidden on their
T3 for one recycled rune, does both. Fallen Feline, named on their T3, stops all three copies.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Chaos runes for you, Dark Child's two
domains, in the twelve of Tournament Rules 402.1. Annie on T3 needs a Fury among the six channelled: it
fails in **1 of 924 deals, 0.11%**. The Curses need no Power, and nothing else of yours in the walk does.
Void Seeker in the control needs a second Fury among the first eight, since Annie's went to the bottom
of the rune deck: **0 of 924**.

Their walk assumes six Mind and six Order. Lux on T3 needs a Mind among their seven: **0 of 924**.
Mesmerize's Power on your T4 needs a second Mind among those seven, because Lux's went to the bottom: it
fails in **7 of 924, 0.76%**. Fallen Feline's Order Power: **0 of 924**. Cloth Armor, Retreat and
hiding need no particular domain.

**How likely an answer is.** Out of their own **39**, by your T4 they have seen **7** cards: four
opening and a draw on each of their three turns. A hidden card has to be in those seven too, since it
is hidden on their T3. Cloth Armor, run three times, is among them in **45.73%**. Two answers in three
copies each (six cards), **72.23%**; three (nine cards), **86.76%**. These count only the cards named,
not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, Lux's own +3 (they cast no spell of 5 Energy or more), discarding a Curse to Chemtech
Enforcer, a turn later than T4 for the third copy, and Annie meeting a removal spell before T4. The
probabilities count only the cards named.

## Leads

- The notable *"THE ARITHMETIC OVER A GAME"* (*"NINE damage for 6 Energy. Under Annie: 3, 4, 5 —
  TWELVE"*) and `terminatesIn`: the sums are right, but they are three Deal actions to three units,
  since each copy has one target (715.1) and damage heals at the end of the turn (317.2.b). All three
  copies in hand by T4 going first is 0.61% (at least two, 10.11%; exactly two, 9.50%). In the walk,
  three `OGS-003 Incinerate` under Annie kill Lux with two Deals and one guard with the third, or three
  guards, and neither leaves the battlefield to Annie. The Curses' 3, 4 and 5 kill Lux with one Deal and
  two guards with the others. The third kill is what the scaling buys. Worth stating, with the comparison: three `OGN-009 Hextech Ray` are also 9 (12 under Annie),
  for 3 Energy and 3 Power, and one `OGN-024 Void Seeker` is the third copy's 5 under Annie on its own.
- The notable *"IT NEEDS NO RULES READING"*: true, and two paragraphs settle the edge cases it does not
  mention. A copy whose target was saved still resolves (359.3.e.1) and goes to the trash (157), and a
  countered copy goes there too (425.1.a.1). So answering one copy does not stop the next one growing.
- The steps' *"each of which can be held for a Showdown"*: under `OGS-017 Dark Child - Starter`, its
  two readied runes pay one copy on the opponent's turn, because a copy is two runes and needs no
  Power; a `OGN-024 Void Seeker` needs three, one of them a Fury recycled. But a
  showdown on their turn needs them to move into a battlefield they do not control, and they move with
  their runes open. In the walk their best T1, a 3-drop first, left that window with no target; the line
  where they walked a 2 into it ended 4 to 1 instead of 4 to 2.
- The notable *"AND THE TRAP IS THAT MILLING THE COPIES LOSES YOU DAMAGE"*: walked and confirmed. A
  copy cast at a 3 it cannot kill, to load the trash, left two copies for T4, and B stayed theirs: 3 to
  3 after their T4 against 4 to 2.
- The steps' order, Annie first: confirmed on the walked board. Two copies on T3 before Annie, then
  Annie and the third copy on T4, ends 3 to 2, a point short, because Annie enters exhausted and cannot
  take the battlefield the copies cleared.
- The notable *"unlike the six no-location damage cards"*: the six are not the whole set. For example,
  `OGN-033 Shakedown` (*"Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."*),
  `UNL-023 Katarina, Reckless`, `OGN-105 Singularity`, `UNL-073 Deadly Flourish` and `UNL-067 Ruined
  Rex` name no location either. `UNL-182 Curtain Call` and `SFD-077 Rocket Barrage` reach a unit in a
  base.
- No answer is named. `VEN-132 Fallen Feline` names the spell and stops all three copies while it is at
  a battlefield. `SFD-064 Cloth Armor` (E1) stops the Conquer that follows a copy. `OGN-104 Retreat`
  (E1) and a hidden `VEN-066 Temporal Breach` save the target.
