# Play — The Surge goes first off a two-drop Mech, and its base token is the one that takes B

Issue #416 (a slice of #200), 2026-10-23. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt` and `data/Riftbound-Tournament-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `iterative-design-production-surge-mech`**, the Mind ENGINE in which `VEN-051 Iterative
Design` (E4) plays a 3-Might Mech token and `SFD-076 Production Surge` (E4 + 1 Power) costs two less
while you control a Mech. The entry is right about the rules. 187.4 gives the token the Mech tag, so the
first token turns the discount on, and [Flow] makes three Iterative Designs six plays. Walked as a game,
going first, under `SFD-181 Mechanized Menace` (Rumble, whose Mechs have [Shield]) against the Mind/Order
Lux deck, the discount was already on from T1, because `VEN-058 Patched Porobot` is a two-energy Mech.
So the first Production Surge came on T2, a turn before the entry's steps can cast it. Its token went
to base, where the spell has to put it. On T3 a second Surge and `SFD-062 Bubble Bot`, which readies
another friendly Mech, sent two 3-Might tokens into their battlefield and took it from a lone 3: **4 to
3** after their T4. The same hand with plain Mechs in the engine's three slots also ends **4 to 3**. It
pays no Power, so it has 8 runes on T4 against the engine's 6, and the two cards the Surges drew went
uncast. What the engine bought is the size of the attackers. Two 3s survive every open answer their one
ready rune can cast, while the control's 3 and 2 lose to three of them. Played in the entry's order,
Iterative Design first with its token on your own battlefield as the entry advises, the same cards end
**3 to 3**: nothing is in base on T3 to attack with. Their better T2 stacks their battlefield, and it
ends **3 to 3** in every line. No open one-rune card stops the walked Conquer. The cheapest answer is a
card hidden at their battlefield on their T2 for one recycled rune, and seven of the thirteen hidden
cards in their identity stop it. `VEN-117 Disciple of Shen` does it best: it kills both tokens and their
battlefield stays theirs.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-23 at `3d68575`, reads 773
entries, 262 with forced-ordering language, **99 in the queue and 11 of them with no play**. The issue
measured 100 and 11 at `3d32c74`. The queue moved by one, and the top two entries with no play are the
same ones, now at ranks 89 and 90 rather than 90 and 91. The pick is by global rank, skipping entries
that already have a play: this entry is rank 89, the first in the list. The other entry of this slice is
rank 90, `whirlwind-cemetery-attendant-choose-last`. The Mind/Order Lux deck, its battlefield and its
eight cards are the ones built in
[Three Incinerates kill Lux and one guard, the Curses kill Lux and two, and the third kill is the battlefield](2026-10-18-three-incinerates-kill-lux-and-one-guard-the-curses-kill-lux-and-two-and-the-third-kill-is-the-battlefield.md),
and its census of answers is the one counted in
[the Wielder and the Mask each do the other's job, and a plain body does both](2026-10-18-the-wielder-and-the-mask-each-do-the-others-job-and-a-plain-body-does-both.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-181 Mechanized Menace` (Fury/Mind, tag Rumble) |
| **Chosen Champion** | `SFD-089 Rumble, Scrapper` (Mind, E5 + 1 Mind Power, M4), never played in the walk |
| **The engine** | `VEN-051 Iterative Design` (Mind, E4) and `SFD-076 Production Surge` (Mind, E4 + 1 Mind Power) |
| **The other bodies** | `VEN-058 Patched Porobot` (Mind, E2, M2, Mech) and `SFD-062 Bubble Bot` (Mind, E3, M3, Mech) |

The entry admits any legend with Mind in its pair. Mechanized Menace is the one for this walk because it
is the legend whose own text reads *"Mechs"*: *"Your Mechs have [Shield]. (+1 :rb_might: while they're
defenders.)"* Every body in this deck is a Mech, the tokens included, so the legend measures the engine
in the deck that already wants Mechs.

Both engine cards are mono-Mind, so a Fury/Mind deck admits them, 103.1.b.3: *"If a card has a single
Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain."* Three
copies of each is the cap, 103.2.b: *"Your Main Deck can include up to 3 copies of the same named
card."* None of the cards in this play is a Signature card (`signature` in `data/cards.json`), and in
Duel none is in `data/legality.src.json` or marked [BANNED] in `data/corpus_flat.txt`.

The card text the play turns on:

- Iterative Design: *"Play a 3 :rb_might: Mech unit token. [Flow] :rb_energy_2::rb_rune_mind: (You may
  play this from your trash for its Flow cost. Then banish it.)"*
- Production Surge: *"This costs :rb_energy_2: less if you control a Mech. Play a 3 :rb_might: Mech unit
  token to your base. Draw 1."*
- Patched Porobot: *"(I enter exhausted.) When you play me, if you control 3 or more other gear, draw
  1."* You control no gear, so it is a 2-Might Mech and nothing else.
- Bubble Bot: *"When you play me, ready another friendly Mech."*

## 2. What a Mech is, where the token goes, and what the Power costs

**The tag is the rules'.** 187.4: *"A 3 [M] Mech token is a domainless unit token with 3 Might and the
Mech tag."* 185.2.d: *"Tokens have a type. They follow all rules for their type unless otherwise
specified."* So a token from either spell turns Production Surge's discount on, and so does any Mech
unit. Patched Porobot is one. Nothing in the discount asks for a token.

**The destination.** Iterative Design names none, and a played unit takes the default, 355.2.a: *"By
default, Valid locations include the controller’s Base or a Battlefield the controller controls."* That
is the default for every unit card in the deck, not a property of this spell. The outlier is Production
Surge, whose *"to your base"* narrows it, 184.2: *"The effect may restrict the location to which the token
may be played."*

**[Flow].** 829.1.b: *"It is functionally short for “You may play this from your trash for its flow cost.
Then banish it.”"* 829.1.b.1: *"Banishing the spell in this way is a delayed replacement effect. If the
spell would leave the chain after becoming a finalized chain item, and leaving the chain wasn’t instructed
by its own execution, banish it instead."* An Iterative Design cast from hand resolves into the trash, so
it can be cast again from there the same turn for 2 Energy and a Mind Power.

**A Power is a rune.** The Mind Power in Production Surge and in the [Flow] cost is paid by recycling a
Mind rune, 164.2.b: *"Recycle this: [Reaction] — Add [C]."* The rune can be one already exhausted for
Energy, but it leaves the board, so every Surge and every [Flow] play costs a rune from the next turn's
count. Going first, the curve is 2, 4, 6 and 8 runes on T1 to T4; the engine at full speed, one Power a
turn from T2, has 2, 4, 5 and 6.

**Ready.** Units and tokens arrive exhausted, 143.4: *"Units enter the Board exhausted."* Bubble Bot's
play effect undoes that for one other Mech, 415.1: *"Readying is an action that marks a non-spell Game
Object on the board as available for action."* A ready unit can pay the Standard Move, 144.2:
*"Exhausting the Unit is the Cost for this action."* That is how a token played on T3 attacks on T3.

**Moving and fighting.** 144.4.a: *"Units may move from their Base to a Battlefield."* A unit at a
battlefield cannot walk to the other one, 144.4.c.1: *"Units with Ganking may use their Standard Move to
Move from Battlefield to Battlefield."* Several units move as one action, 144.3: *"Players may perform
multiple Units' standard move simultaneously. This is treated as one game action performed on multiple
Units."* Damage is a sum, 465.2.c: *"Starting with the Attacker, each player assigns an amount of damage
equal to their summed Might among the other's Units."* It goes lethal first, 465.2.c.3: *"Units must
have lethal damage assigned to them in full before damage is assigned to a different Unit."* The legend's
[Shield] counts only on defense, 814.1.c: *"It is functionally short for "While I am a defender, I have
+X [M].""* So a token defends as 4 and attacks as 3.

## 3. Their deck: Mind/Order Lux

The deck of the Incinerate play linked above. `OGS-021 Lady of Luminosity - Starter` (Mind/Order):
*"When you play a spell that costs :rb_energy_5: or more, draw 1."* Its Chosen Champion is `OGS-006
Lux, Illuminated` (Mind, E6 + 1 Mind Power, M5): *"When you play a spell that costs :rb_energy_5: or
more, give me +3 :rb_might: this turn."* Neither text fires in the walk. Their bodies are `UNL-154
Crimson Pigeons` (Order, E3, M3; *"I have +2 :rb_might: while I'm attacking with another unit."*),
`SFD-159 Trusty Ramhound` (Order, E2, M2; *"While you have another unit here, I have +1 :rb_might:."*),
`OGN-210 Daring Poro` (Order, E2, M2; *"[Assault] (+1 :rb_might: while I'm an attacker.)"*) and
`OGN-087 Lecturing Yordle` (Mind, E3, M2; [Tank], *"When you play me, draw 1."*). Going second, they
channel an extra rune on T1, 485.7: *"First Turn Process: The player going second channels an extra Rune
from their Rune Deck during their first Channel Phase of the game."*

## 4. The turns, going first

Fury/Mind against Mind/Order. Your battlefield is A, `OGN-282 Monastery of Hirana` (*"When you conquer
here, you may spend a buff to draw 1."*); theirs is B, `VEN-162 Protective Sands` (*"When you conquer
here, if you control 4 or fewer runes, you may pay :rb_energy_1: to draw 1."*). Monastery never fires,
because nothing here has a buff. Your opening four are two Patched Porobots, Production Surge and
Iterative Design. Your Main Deck from the top is Bubble Bot, the second Production Surge, `OGN-088
Mega-Mech` (Mind, E7, M8), `SFD-021 Ferrous Forerunner` (Fury, E6 + 1 Fury Power), `SFD-071 Breakneck
Mech` (Mind, E8 + 2 Mind Power) and `OGN-020 Scrapyard Champion` (Fury, E5 + 1 Fury Power). A Surge's
draw takes the next card, so the order is what each line draws. Their opening four are Crimson Pigeons,
Trusty Ramhound, Daring Poro and Lecturing Yordle. Their draws are `OGN-096 Watchful Sentry` (T1),
`SFD-155 Honest Broker` (T2), `OGN-219 Vanguard Sergeant` (T3) and `UNL-156 Loyal Poro` (T4).

```
turn      runes   your turn                                                 points
T1        2       Patched Porobot (E2) to base. None left.                  0
their T1  3       Crimson Pigeons (E3) to base. None left.
T2        4       The Porobot walks to A, Conquer: +1. Production Surge     1
                  (E2 + 1 Mind Power): a token to base, draw 1. The second
                  Porobot (E2) to A. Four runes, one recycled; none left.
their T2  5       The Pigeons walk to B, Conquer. Trusty Ramhound (E2)
                  and Daring Poro (E2) to base. One left.
T3        5       Hold A: +1. The second Production Surge (E2 + 1 Mind      3
                  Power): a token to base, draw 1. Bubble Bot (E3) to
                  base, readying the new token. Both tokens walk into B:
                  6 against the Pigeons' 3, Conquer: +1. Five runes, one
                  recycled; none left.
their T3  7       The Ramhound and the Poro attack B: 6 against the
                  token's 4. The token and the Ramhound die, Conquer.
                  Lux, Illuminated (E6 + 1 Mind Power) from the Champion
                  Zone to B. Seven runes, one recycled; one left.
T4        6       Hold A: +1. Iterative Design (E4) to A, then again from   4
                  the trash by [Flow] (E2 + 1 Mind Power) to A. Six runes,
                  one recycled; none left.
their T4  8       Hold B. Vanguard Sergeant (E4), Honest Broker (E2) and
                  Watchful Sentry (E2) to base. None left.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T4 it
is **4 to 2**; after their T4, **4 to 3**.

Your hand, card by card: 5 after the T1 draw, 4 after the Porobot; 5 after the T2 draw, 4 after the
Surge, 5 after its draw (Mega-Mech), 4 after the second Porobot; 5 after the T3 draw (Ferrous
Forerunner), 4 after the second Surge, 5 after its draw (Breakneck Mech), 4 after Bubble Bot; 5 after
the T4 draw (Scrapyard Champion), 4 after Iterative Design, whose [Flow] play comes from the trash.
Theirs: 5 after the T1 draw, 4 after the Pigeons; 5, then 3 after T2 (Lecturing Yordle, Watchful
Sentry, Honest Broker); 4 after the T3 draw, still 4 after Lux, who comes from the Champion Zone; 5 after
the T4 draw, 2 after the three bodies (Lecturing Yordle, Loyal Poro).

**Your T1: the discount, for two runes.** Patched Porobot is a Mech, so from the moment it is on the
board Production Surge costs 2 Energy and a Mind Power. The entry's steps turn the discount on with the
first Iterative Design, which is four runes and cannot be cast before T2.

**Your T2: the Surge, the token to base.** The Porobot takes A, which is empty, 316.8.b.1: *"Showdowns
that occur as a result of a player moving to an empty Battlefield are a stand-alone Phase and do not
create a Combat."* That is a Conquer, 466.5.d: *"Establishing Control results in a Conquer if that
player has not yet scored this Battlefield this turn."* Production Surge exhausts two runes, and one of
them, a Mind rune, is recycled for the Power. The token goes to base, because the card says so, and you
draw. The last two runes put the second Porobot on A, which you now control (355.2.a). A defends as 2 +
1 and 2 + 1, **6**. The Pigeons alone, a 3, do not try it.

**Their T2.** They take empty B with the Pigeons. The Ramhound and the Poro go to base, not to B: from B
they could never reach A (144.4.c.1), and from base, together, they are 3 + 3 = 6 against A next turn.

**Your T3: the second Surge and Bubble Bot.** You Hold A, 469.2: *"Hold: A player maintains Control of a
Battlefield they did not yet Score this turn during their Beginning Phase."* Your runes are 3 + 2 = 5.
The second Surge is 2 Energy and a recycled Mind rune: a second token in base, exhausted, and a card.
Bubble Bot is the other three runes, and its play effect readies the new token. The first token has been
ready since your Awakening. Both walk into B together (144.3). The Pigeons are alone, and their +2
counts only while they attack with another unit, so they defend as a 3. You assign 6, and 3 of it is
lethal, 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit’s
Might."* They assign 3, lethal on one token (465.2.c.3). The Pigeons and one token die, and only your
token is left at B: a Conquer (466.5.d). Protective Sands asks for four runes or fewer and one Energy.
You control four, and none is ready, so it does not draw. **3 to 1.**

**Their T3: B back, and Lux on it.** Your token defends B alone at 3 + 1 = 4. The Ramhound and the Poro,
ready in base, attack it together: 3 (2, +1 for company) and 3 (2, +1 [Assault]), 6. Their 6 kill the
token. Your 4 kill the Ramhound, with 1 on the Poro. The Poro is left, and B is theirs again: **3 to 2**.
Attacking A instead, against the Porobots' 6, kills everything on both sides, and A becomes nobody's,
466.5.b: *"If there are no Units remaining here controlled by any player, the Battlefield becomes
Uncontrolled."* That gains them nothing, and on your T4 you would Hold B and walk Bubble Bot into empty
A. So they take B. Lux goes to B, which they control: six runes exhausted, a Mind one of them recycled.
B is the Poro 2 and Lux 5, **7**.

**Your T4: Iterative Design twice.** Your runes are 4 + 2 = 6. You Hold A: **4 to 2**. Nothing of yours
can take B. The Porobots at A cannot walk there (144.4.c.1), and Bubble Bot, the only body ready in
base, is a 3 against 7. So the six runes build. Iterative Design from hand is four, and its token goes to
A; the spell resolves into the trash, and its [Flow] play is two more and a recycled Mind rune, for a
second token on A. A defends as 3 + 3 + 4 + 4 = 14. Ferrous Forerunner, at six runes with one recycled,
would have been one 6-Might body instead of two 3s. Nothing either one does changes a point before their
T5, so the walk spends the runes on the engine.

**Their T4.** They Hold B: **4 to 3**. Lux and the Poro are at B and cannot reach A, and nothing in their
base is ready. Their eight runes put three bodies in base.

**The control: plain Mechs in the engine's slots.** The same hand with a third Patched Porobot for the
first Production Surge, a second Bubble Bot for the second, and a third Bubble Bot for Iterative Design.
On T2 the third Porobot goes to base for two runes, where the Surge's token was. Nothing is recycled. On
T3 there are six runes, not five. The first Bubble Bot readies nothing that needs it, and the second
readies the first, so a 3 and the Porobot's 2 walk into B: 5 against 3. Their 3 go lethal on the Bubble
Bot. The Porobot is left, a Conquer: **3 to 1**. On their T3 the Ramhound and the Poro take B back from a
lone 2 + 1, and Lux goes there. On T4 there are **8** runes, and `OGN-088 Mega-Mech`, drawn on T3 instead
of by a Surge, comes down for seven. Every point is the main line's, and it ends **4 to 3**. So the
engine bought no point here. The two Surges drew Mega-Mech and Breakneck Mech, cards the engine's six
runes could not cast, and the two Powers they cost are why the engine has 6 runes on T4 where the
control has 8. What the engine did buy is the size of the T3 attackers, which §5 prices: two 3s, where
the control has a 3 and a 2.

**The trap, walked: Iterative Design first, its token on A.** The entry's steps cast Iterative Design
first, and its notable advises *"Spend the cheap spell on the base and the flexible one on the
battlefield"*. The same hand played that way spends T2's four runes on Iterative Design, with its token
on A beside the Porobot: A defends as 3 + 4 = 7, and nothing is in base. Their T2 is the main line's.
On your T3, with six runes, nothing is ready in base. A Surge and Bubble Bot make one ready token, and a
lone 3 against the Pigeons' 3 kills both. B becomes nobody's (466.5.b), and on their T3 the Ramhound
and the Poro walk into it for a Conquer. Not attacking leaves them to Hold it. Either way it is **2 to 2**
after their T3. Their 6 never attack A's 7 or more, you Hold A on T4, they Hold B on theirs: **3 to 3**.
The T3 Conquer needed two bodies ready in base. The cheap spell's base token, played on T2, was one of
them. Spending the flexible spell on the battlefield put a 4 where nothing ever attacked.

**Their better T2: stack B and never attack.** If the Ramhound and the Poro go to B beside the Pigeons,
B defends as 3 + 3 + 2 = 8. On your T3 two tokens are 6 against 8, and nothing of yours attacks. They
Hold B on their T3 and put Lux there, 13. You Hold A on T3 and T4, they Hold B on T3 and T4: **3 to 3**,
in the main line, the control and the entry's order alike. The tokens pile up in your base, which is
everything the engine does on a board that offers no fight.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion. Tournament Rules 402.1: *"In a constructed event, players must register a Main Deck of
exactly 40 cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each
with a unique name."* Going first, you have seen 5 cards by T1, 6 by T2, and 8 by T3 once the first
Surge has drawn. A Porobot among the first 5 is **34.52%**; a Production Surge among the first 6,
**40.30%**; both, **12.41%**. The whole main line, which also needs the second Porobot by T2, the second
Surge by T3 and a Bubble Bot by T3, is **0.11%**, computed exactly over the order of the first eight
cards. These count only the cards named. Any two-energy Mech does the Porobot's job, and the T3 Conquer
asks only for two bodies ready in base, so the number prices this hand and not the engine.

## 5. Breaks to

**What the engine did, and the predicate.** On your T3 two 3-Might tokens, one of them readied by Bubble
Bot, took B from the lone Pigeons. The predicate is: cast or played by them on your T3, or prepared on
their T2, does it stop that Conquer?

**The scope.** The census is the one the Wielder play linked above counted, and re-run here at
`3d68575` it gives the same numbers. A Mind/Order deck plays only Mind, Order and Mind/Order cards
(103.1.b), and its Signature cards must carry its legend's tag. The predicate is: a card in
`data/cards.json` whose domains are all Mind or Order (tokens carry no domain), not a legend,
battlefield or rune, and not a Signature card with another champion's tag. Folded by name, that is
**253** cards, none of them banned. **47** have [Reaction], [Hidden] or [Ambush] in their text (the regex
`\[(Reaction|Hidden|Ambush)\]`, case-insensitive, on the whole text with reminder text left in); with
`\[Action\]` added it is **65**.

**The walk leaves them one ready rune.** On your T3 they have five runes, one of them ready, and any of
the five can be recycled for Power. Of the 65, nine cost one Energy or less. **None of the nine stops
the Conquer**, because each of them moves one body by 1 or 2 and the attack has two 3s:

- `SFD-064 Cloth Armor` on the Pigeons makes them a 5. Your 6 still kill them, and their 5 kill one
  token, with 2 on the other.
- `VEN-052 Mesmerize` gives a token -2, and 1 + 3 still kill the Pigeons; their 3 kill one token. Its
  other mode returns the Pigeons, and your tokens are left at B.
- `SFD-080 Bellows Breath` deals 1 to both tokens. Their 3 are then lethal on one token and leave the
  other at 2 damage, short of its 3. Its [Repeat] needs a second Energy they do not have.
- `OGN-095 Stupefy` makes a token a 2. Their 3 kill one token, and the other is left.
- `OGN-104 Retreat` returns the Pigeons. Your tokens are left at B.
- `UNL-173 Sacrifice` needs a friendly Mighty unit to kill as its cost, and the Pigeons are a 3.
- `VEN-061 Decree of Insight` reaches only an enemy Body unit, and the tokens are domainless (187.4).
- `OGN-120 Seal of Insight` and `OGN-245 Seal of Unity` are gear. Their [Reaction] is an ability of the
  gear on the board, and neither is on the board.

**This is the engine's one credit on this board.** The control's T3 attack is a 3 and a 2, and three of
the nine stop it. Cloth Armor makes the Pigeons a 5: your 5 kill them, and their 5 kill both of yours.
Mesmerize on the Bubble Bot makes the attack 1 + 2, and their 3 kill both. Bellows Breath leaves the 3
and the 2 needing 2 and 1 more, and their 3 kill both. Each time B ends nobody's (466.5.b). The cheapest
is Cloth Armor, one ready rune and no Power. Against the control, the open one-rune answers stop the
T3 Conquer. Against the engine's two 3s, none of them does.

*A card hidden at B on their T2.* They control B once the Pigeons take it, which is what hiding needs,
811.1.b: *"While this card is in your hand or in your Champion Zone on your turn during an Open State,
you may pay [A] to hide this facedown at a battlefield you control that doesn't already have a facedown
card hidden there for as long as you control that battlefield. Beginning on the next turn, this gains
[Reaction] and you may play this, ignoring its base cost."* The [A] is one rune recycled (164.2.b), and
their T2 leaves one rune for it. Played from facedown, the card has Reaction, 811.6: *"A card that is
Hidden gains Reaction while facedown or played from facedown, and may be played any time a card with
Reaction may be played as a result."* A unit it plays goes to B, 811.1.d.3: *"If a hidden spell or a
play effect of a hidden permanent causes you to play a unit, you must choose to play that unit at that
battlefield."* **13** of the 253 carry the [Hidden] keyword. **Seven stop the Conquer:**

- `VEN-117 Disciple of Shen` is a 1 with [Shield 3] beside exactly one other unit, the Pigeons: the
  defense is 3 + 4 = 7 against your 6. Your 6 kill the Pigeons and leave 3 on the Disciple, short of its
  4. Their 7 kill both tokens. **B stays theirs, and the Disciple stays on it.**
  [2026-10-23: the Disciple staying on B is not forced. `UNL-154 Crimson Pigeons` has no [Tank], so under
  465.2.c.3 you order the damage: 4 lethal on the Disciple (Might 1 + [Shield 3] = 4) and 2 on the Pigeons,
  which has Might 3 and is not killed. The verdict holds either way: both tokens die and B stays theirs.
  The sentence above is left as written. #433]
- `OGN-097 Blastcone Fae` is a 2 whose play effect gives a token -2. Your 1 + 3 kill one of their two,
  their 3 + 2 kill both of yours, and B stays theirs.
- `OGN-094 Sprite Call` (a ready 3) and `UNL-081 Keeper of Masks` (three 1s) make the defense 6 against
  6. Everything dies, and B ends nobody's.
- `OGN-213 Hidden Blade` kills a token (you draw 2), and `SFD-070 Wages of Pain` puts 3 on one. The
  other token and the Pigeons are 3 against 3, both die, and B ends nobody's.
- `VEN-066 Temporal Breach` banishes a token, and a token does not come back, 186.1: *"If a token is put
  into any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new
  zone."* What is left is 3 against 3, and B ends nobody's.

Five do not. `SFD-154 Guards!` (a 2) and `VEN-135 Kennen, Keeper of Balance` (a 2; his stun needs two
Energy they do not have) make the defense 5 against 6: your 6 kill both of theirs, their 5 kill one
token, and the other takes B. `OGN-220 Facebreaker` must stun one of their own units along with one of
yours, so the Pigeons deal nothing and your other token kills them. `OGN-083 Consult the Past` only
draws, and `UNL-083 Smoke and Mirrors` needs a [Temporary] unit. The thirteenth, `OGN-121 Teemo,
Strategist`, is a 2 and makes it 5 against 6 like Guards!, unless his defend trigger fires and reveals
a [Hidden] card among their top five. One damage on a token before combat makes their 5 lethal on both.
The walk does not settle that trigger or deal their deck, so he is counted with neither group.

**The cheapest answer is a hidden card, one recycled rune on their T2 and no Energy**, and Disciple of
Shen is the best of the seven at that price. It is the only one that kills both tokens, keeps B, and
leaves its own body there. The open one-rune answers all fail for one reason, 465.2.c: they change one
body's Might by 1 or 2, and the attack is a sum of two 3s. Every hidden answer that works adds to their
side's sum or takes a whole token away.

## 6. Verdict

**Right about the rules; the discount wants any Mech, the base token is the attacker, and on this board
the engine scored what a plain Mech curve scored.** 187.4 makes the token a Mech, [Flow] makes three
Iterative Designs six plays, and any Mech on the board turns the discount on. Walked going first
against the Lux deck, a two-energy Mech on T1 had the discount on for T2. The first Production Surge put
its token in base, where the card has to put it, and on T3 a second Surge and Bubble Bot sent two 3s
into B to take it from a lone 3: **4 to 3** after their T4. The same hand with plain Mechs in the three
engine slots ends **4 to 3** too. It pays no Power, so it has 8 runes on T4 to the engine's 6. The cards
the Surges drew were ones the engine's runes could not cast. What the engine bought is the attackers'
size. Two 3s survive all nine open answers their one ready rune can cast, while a 3 and a 2 lose to
three of them, Cloth Armor first. In the entry's order, Iterative Design first and its token on your
battlefield, there is nothing in base on T3 and it ends **3 to 3**. Against an opponent who stacks their own
battlefield and never attacks, every line ends **3 to 3** and the tokens wait in base. The cheapest
answer to the walked line is a hidden Disciple of Shen, one recycled rune on their T2, which kills both
tokens and keeps B. Seven of the thirteen hidden cards stop the line.

## 7. Not verified

I did not deal the channel order. The walk assumes six Fury and six Mind in the twelve of Tournament
Rules 402.1, channelled two a turn. The main line recycles a Mind rune on T2, T3 and T4, so it needs a
Mind among the first four runes, two among the first six and three among the first eight. It fails in
**66 of 924** deals, **7.14%**. The T2 Surge alone fails in **28 of 924, 3.03%**. The entry's order
recycles first on T3 and fails there in **1 of 924**. The control pays no Power and fails in **0 of
924**.

Their walk assumes six Mind and six Order. Lux on their T3 needs a Mind among their seven runes: **0 of
924**. Mesmerize and Bellows Breath on your T3 need a Mind among their five: they fail in **7 of 924,
0.76%**, and they matter only against the control. Cloth Armor and hiding need no particular domain.

**How likely an answer is.** Out of their own **39**, by your T3 they have seen **6** cards: four
opening and a draw on each of their two turns. A hidden card has to be among those six too, since it is
hidden on their T2. Disciple of Shen, run three times, is among them in **40.30%**. Two answers in three
copies each (six cards), **66.05%**; three (nine cards), **81.80%**. These count only the cards named,
not how many of them a deck runs.

Their hand holding no answer is the walk's assumption; §5 prices it. Not walked: going second, the
mulligan, 2v2, Rumble, Scrapper (on T3 he takes all five runes, and the T3 attack with them), Iterative
Design on T2 with its token to base instead of A, a removal spell on a token before T3, and the turns
after their T4, where the engine's tokens and the Surges' cards would be counted.

## Leads

- The steps' order and the first easy prerequisite, *"A Mech on the board when Production Surge is
  played, for the discount. The first Iterative Design supplies it."*: any Mech unit supplies it, and a
  two-energy one does it a turn sooner. 187.4 gives the token the tag, but the discount does not ask for
  a token. With `VEN-058 Patched Porobot` (Mind, E2) on T1, the first Production Surge costs 2 + 1 on
  T2, which the steps cannot reach before T3. Walked, the Surge-first line ended 4 to 3, and Iterative
  Design first ended 3 to 3.
- The notable *"Spend the cheap spell on the base and the flexible one on the battlefield, not the other
  way round"*: walked with Iterative Design's token on A, and that line lost. The T3 Conquer of their
  battlefield needed two bodies ready in base, and Production Surge's base token, played on T2, was one
  of them. Iterative Design's token on your own battlefield was a defender nothing attacked. That walk
  also differs from the main line in order and spend, so the token's destination is not isolated:
  Iterative Design on T2 with its token to base was not walked (§7). Note also that the no-destination
  reading the notable credits to 355.2.a is the default for every played unit. The outlier is Production
  Surge's *"to your base"*, which 184.2 authorises.
- The notable *"none of them moves on the turn it is made unless SFD-171 Renata Glasc, Industrialist is
  out (R25 = A), which is mono-Order and needs a Mind/Order legend"*: `SFD-062 Bubble Bot` (Mind, E3,
  M3) does it inside the entry's own identity. *"When you play me, ready another friendly Mech"* readies
  a token played the same turn (415.1), and the walk's T3 Conquer is that ready.
- The ledger, *"Every Production Surge afterwards is 2 Energy + 1 Power"*: the Power is a recycled rune
  (164.2.b), so each Surge and each [Flow] play costs a rune from every later turn.
  [2026-10-24, #452: not every later turn. A recycled rune goes to the bottom of the Rune Deck (416.1,
  416.1.b) and is channelled again when the deck reaches it (430.1). Going first, each rune recycled is a
  rune short on every turn through T6 at the least, until the Rune Deck runs dry (161.2.a, 315.3.b). The
  walk ends after their T4, so the count stands for every turn it covers. The wording above is kept as
  history.]
  At one Power a turn
  from T2 the walk had 6 runes on T4 where a curve with no Power has 8, and the two cards the Surges drew
  were ones those 6 could not cast.
- `terminatesIn` (*"nothing here scores"*): true of the cards. The points in the walk come from what the
  tokens took. Two 3s are immune to every open answer a Mind/Order deck casts for one ready rune,
  which a 3 and a 2 are not. Against an opponent who stacks their own battlefield, every line is 3 to 3.
- No answer is named. A hidden `VEN-117 Disciple of Shen` at the battlefield the tokens attack, one
  recycled rune and no Energy, kills both 3s and keeps the battlefield. `VEN-066 Temporal Breach` is
  removal on a token, because 186.1 ends a banished token. Six other hidden cards also stop the Conquer.
