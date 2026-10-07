# Play — the Birds die first, Lillia dies at eight, and A holds

Issue #317 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `lillia-flurry-of-feathers-tank-wall`**, the mono-Calm ENGINE in which `UNL-044 Flurry of
Feathers` puts four 1-Might Birds into the opponent's attack, and `UNL-058 Lillia, Protector of Dreams`
gives them [Tank] and grows by one for each. The entry is right about the rules: the Birds land as
defenders inside the Combat Showdown, the first four damage has to go into them, and Lillia defends
at 8. Walked as a game, the line is live from their T4, and on that turn it held A: four attackers died,
and the Birds and Lillia died for them. The Birds die to any attack of four or more, so they are a wall
for one combat and never a board. Past the Birds the attacker picks what dies, and with twelve they
picked Lillia, at exactly 4 + 8. What breaks it is `SFD-001 Against the Odds`, two runes, which counts
the Birds as four more enemy units and gives the attacker +2 for each.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `8940360`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 55 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 46 (a hit on *first*), first in the list. The other entry of this slice is rank 47,
played in
[two stuns make the Herald nine, and all six attackers die](2026-10-07-two-stuns-make-the-herald-nine-and-all-six-attackers-die.md).
Flurry of Feathers is in five other catalogued lines; the one with Gemcraft Seer is played in
[the Seer stays home and the Birds answer their spell](2026-10-07-the-seer-stays-home-and-the-birds-answer-their-spell.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-189 Bashful Bloom` (Calm/Mind), the Lillia legend, so Lillia can be the Chosen Champion |
| **Champion** | `UNL-058 Lillia, Protector of Dreams` (Calm, E5, M4) as the Chosen Champion, at the battlefield they attack |
| **The spell** | 3x Flurry of Feathers, four runes left ready through your own turn, and two Calm runes on the board |
| **Board it wants** | a battlefield you control, attacked with more than you have there |

The card text the play turns on:

- Lillia, Protector of Dreams (Calm, E5, M4): *"When you play a token unit, give me +1 :rb_might: this
  turn. Your token units have [Tank]. (They must be assigned combat damage first.)"*
- Flurry of Feathers (Calm, E4 + 2 Power): *"[Reaction] Choose one — • Counter a spell. • Play four 1
  :rb_might: Bird unit tokens with [Deflect]. (Opponents must pay :rb_rune_rainbow: to choose them with
  a spell or ability.)"*
- Stalwart Poro (Calm, E2, M2): *"[Shield] (+1 :rb_might: while I'm a defender.)"*
- Against the Odds (theirs, Fury, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Give a friendly unit at a battlefield +2 :rb_might: this turn for each enemy unit there."*

## 2. Your order: Lillia first, the Birds inside their attack

**Lillia is always there.** 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag
on your Champion Legend."* Lillia, Protector of Dreams carries the Lillia tag, and so does Bashful
Bloom. 108.3.d: *"The Chosen Champion can be played from here as normal, following the rules of Playing
a Card."* The line's champion is never a draw, so the line is one card.

**She lands on T3, and the wall is live on their T4.** Flurry is cast on their turn, from runes you
left ready on yours, and they ready only in your Awakening, 415.3.a: *"A player Readies all non-spell
Game Objects they Control during the Awakening Phase on their turn."* Lillia and a held Flurry are
nine runes, and the first turn with nine is T5. Split, she lands on T3 with one rune left over, and on
T4 eight runes leave four ready after a four-cost play. T3 is the exposed turn: one ready rune casts
nothing on their T3.

**The Birds go where the attack is.** Flurry names no place, so 355.2.a applies: *"By default, Valid
locations include the controller’s Base or a Battlefield the controller controls."* The battlefield
under attack is still yours while the combat runs, 190.4.b: *"While a Combat or Showdown is ongoing at
a Battlefield, Control of that Battlefield cannot change until instructed by steps of the Combat or
Showdown."* The Birds join the fight at the next Cleanup, 464.2.c.3.a: *"If a Unit controlled by the
Attacker or Defender becomes present at this Battlefield after this moment, it will gain the Attacker
or Defender designation during the Cleanup phase following the action that caused it to become
present, as appropriate for its controller."*

**The attacker sees the Birds before damage.** 464.2.d gives the attacker Focus first. They pass it,
you cast Flurry, and when it resolves Focus goes back to them, 346: *"When the last item on the chain
resolves and the turn returns to an Open State during a Showdown, Focus passes, and the next Player
gains both Focus and Priority."* So they get one more chance to act, with the Birds already on the
board. That is where the break is (section 5).

**Past the Birds, the attacker chooses.** 815.1.c.2: *"Units without Tank are invalid assignments until
all units with Tank have lethal damage assigned to them."* A Bird's lethal damage is one, and 465.2.c.4
caps it there: *"Units cannot have more damage assigned to them than the minimum required to constitute
lethal damage unless no further units remain to have damage assigned to them."* So the Birds take
exactly four, and every point after that goes where the attacker wants it. Lillia at 8 dies to any
attack of twelve that chooses her.

## 3. Their order: B, then everything at A

Fury/Chaos under `SFD-185 Glorious Executioner` (*"When you win a combat, draw 1."*), which fires once
in the walk, on their T5. They take B on their T2 and hold it with one Shipyard Skulker. Every body
after that goes to base. On their T4 the four ready ones attack A, twelve against your eleven, and they
keep three runes open.

## 4. The turns, going first

Calm/Mind against Fury/Chaos. Your rune deck is six Calm and six Mind. Your opening four are Stalwart
Poro, Navori Scout, Flurry of Feathers and Defy. The draws are Wizened Elder, Lilting Lullaby, Playful
Phantom and a second Navori Scout. You pay no Power before their T4.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Shipyard Skulker (E3) to base, with the 485.7 extra
                rune. All three spent.
T2      4       Poro walks to A, Conquer: +1. Navori Scout (E4) to        1
                base. All four spent.
their T2        Skulker walks to B, Conquer. Mystic Poro (E2) and a
                second Skulker (E3) to base. All five spent.
T3      6       Hold A: +1. The Scout walks to A. Lillia (E5) from the    2
                Champion Zone to A. One idle.
their T3        Hold B. A defends at eleven (the Poro at 3 with its
                Shield, the Scout 4, Lillia 4) and their two in base
                make five: no attack. Ember Monk (E4) and a third
                Skulker (E3) to base. All seven spent.
T4      8       Hold A: +1. Wizened Elder (E4) to base, for B on T5.      3
                Four ready.
their T4        Hold B. Second Ember Monk (E4) and second Mystic Poro
                (E2) to base. Three idle. The four ready ones walk
                into A: Mystic Poro, two Skulkers and the Monk, twelve
                against eleven. They pass Focus. Flurry of Feathers,
                Birds mode: four runes tapped, two Calm recycled. Four
                Birds to A, Lillia to 8. They pass, you pass. The
                Birds take four, Lillia takes eight and dies. Your
                nineteen kill all four attackers. A stays yours.
T5      8       Hold A: +1. The Elder walks to B, four against the        5
                Skulker's three: the Skulker dies. Conquer: +1.
                Playful Phantom (E5) to A. Three ready.
their T5        The second Monk and the second Mystic Poro walk into B,
                six against four. The Elder dies and takes the Monk
                with it. Conquer, and Glorious Executioner draws 1.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After their T5 it is 5 to 4.

The T4 fight. Twelve attack: Mystic Poro 2, Skulker 3, Ember Monk 4, Skulker 3. Eleven defend: the
Poro at 3 with its Shield (814.1.c), the Scout 4 and Lillia 4. They have Focus first and pass. You cast
Flurry: four runes tapped for the Energy, and two Calm runes recycled for the Power, 164.2.b. The four
Birds enter at A, Lillia's trigger fires once for each, and she is 8 this turn. At the next Cleanup the
Birds are defenders, and your side sums to nineteen. Focus goes back to them. They pass, you pass, and
347.2.a ends the showdown: *"If all Players have passed once in sequence, the Showdown ends."*

The attacker assigns first, 465.2.c: *"Starting with the Attacker, each player assigns an amount of
damage equal to their summed Might among the other's Units."* Four go into the Birds. Eight are left:
Lillia, exactly lethal at 8, or the Poro and the Scout, seven of the eight. They take Lillia. 143.2.a:
*"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is Killed."* Your
nineteen kill the Mystic Poro (2), both Skulkers (3 + 3) and the Monk (4), with seven to spare. You
are the only player with units left, 466.3.a: *"A Player has won a combat if they received either the
attacker or defender designation and are the only Player that has units remaining at this battlefield
during this step."* A stays yours. Lillia goes to the trash and not back to the Champion Zone, 108.3.c:
*"The Chosen Champion cannot be returned to this zone by normal means."*

**What the line bought.** Without Flurry the same attack is twelve against eleven. They kill all three
of yours with one to spare. Your eleven kill the Monk and both Skulkers, and the Mystic Poro lives on
one damage. They win A, and 466.5.d makes it a Conquer: *"Establishing Control results in a Conquer if
that player has not yet scored this Battlefield this turn."* On T5 the Elder takes A back from the
Poro and the Phantom joins it there. On their T5 they hold B, and their six in base do not attack the
nine at A: 4 to 5. With the line it is 5 to 4, a point for you and one fewer for them. They lost four
bodies for it. You lost a Flurry, Lillia and the four Birds, and two runes off the board, so T5 had
eight runes, not ten.

**How often this T4 happens.** Lillia is in the Champion Zone in every game. Flurry is in the first
eight cards (the opening four, then the T1 to T4 draws), 4 + 4 cards of 39 (Tournament Rules 601.1.b
makes the Main Deck exactly 40, and 103.2.a.1 sets the Chosen Champion aside), in **50.8%** of games
with the entry's three copies, without a mulligan. And they have to attack.

## 5. Breaks to

**The line breaks to `SFD-001 Against the Odds`** (Fury, E2: two runes, nothing recycled), held out of
their three idle runes and cast when Focus comes back after Flurry. It counts the enemy units at A as
it resolves, and Flurry has just made them seven: the Poro, the Scout, Lillia and four Birds. The Monk
gets +14 and attacks at 18, so they assign twenty-six. Four go into the Birds, eight into Lillia, four
into the Scout and three into the Poro: nineteen, every unit of yours. Your nineteen kill the Mystic
Poro and both Skulkers (eight) and put eleven on the Monk, which lives at 18. They win A, Conquer, and
draw from Glorious Executioner. Without Flurry the same card is +6 and still wins, eighteen against
eleven. The Birds are worth +8 to them, two each, and Flurry was worth +8 to you, the Birds' four and
Lillia's four. Against this card the wall adds nothing, and it costs four more bodies, the Flurry and
two runes off the board.

The reply is `OGN-045 Defy` (Calm, E1 + 1 Power), which you hold. Against the Odds is two Energy and no
Power, inside Defy's *"no more than :rb_energy_4: and no more than :rb_rune_rainbow:"*. But Defy needs a
fifth ready rune, and on T4 the Elder took it, so holding five means leaving the Elder in hand on T4.
It also needs a third Calm rune on the board after Flurry's two, which eight runes hold in 896 of the
924 deals. `UNL-190 Lilting Lullaby` (Calm/Mind, E2 + 2 Power), a Signature card tagged Lillia and
legal under Bashful Bloom, counters it too and needs two ready runes, not one.

`SFD-136 Hard Bargain` (Chaos, E2) is the same price on Flurry itself: *"Counter a spell unless its
controller pays :rb_energy_2:."* With exactly four held you cannot pay. Flurry is countered and its two
Calm stay spent, 425.1.c: *"Countering does not refund any costs paid to play a card, activate an
ability, or trigger an ability."* The attack then goes as it does without the line. Holding six runes,
not four, pays the two.

The cheapest card in the pool against the Birds is the one the entry names, `OGN-133 Flurry of Blades`
(Body, E1, outside their identity), and in this walk it does not take A. Cast after Flurry, it kills
the four Birds and puts one damage on every other unit at a battlefield. Then their twelve kill
Lillia (7 left), the Scout (3) and the Poro (2) exactly, and your fifteen kill all four attackers (1,
2, 3 and 2 left). Nobody is left at A, 466.5.b: *"If there are no Units remaining here controlled by
any player, the Battlefield becomes Uncontrolled."* One rune costs you the Hold of A, and it costs them
their whole attack.

## 6. Verdict

**Right, and the wall lasts one combat: the Birds always die, and past them the attacker picks.** The
rules reading is right. The Birds land as defenders inside the attack (355.2.a and 190.4.b, then
464.2.c.3.a), [Tank] makes them take the first four damage, and Lillia defends at 8. The play adds four
things. Under Bashful Bloom Lillia is the Chosen Champion, so the line needs only a Flurry, which is
there by their T4 in half the games. The Birds never survive an attack of four or more, so the four
token units last one combat and are never a board. Past the Birds the attacker chooses, and twelve
killed Lillia at exactly eight. And the cheap answer the entry names only empties A. The one that takes
A is `SFD-001 Against the Odds`, two runes, and the Birds pay for it.

## 7. Not verified

I did not deal the channel order. No Power is paid before their T4, and on their T4 eight runes are on
the board, so at least two are Calm: Flurry's two Calm fail in none of the 924 deals. The Defy reply in
section 5 needs a third Calm among those eight, and that fails in 28 of the 924 (3.0%). They pay no
Power. Riot's gallery data carries no champion-unit marker, so Lillia's place under 103.2.a.2 is read
from her Lillia tag, as the deckbuilder reads it. I did not walk Bashful Bloom's own Sprite token, which
Lillia also gives [Tank], the opponent killing the Poro and the Scout instead of Lillia, Flurry's
counter mode, a second Flurry, the mulligan, T6 on, or 2v2.

## Leads

- The entry's step 6 says *"The attacker spends its first four damage killing 1 Might Birds;
  everything else of yours, Lillia at 8 included, survives."* That holds only for an attack of less
  than four plus the cheapest of your other defenders to kill. In the walk twelve attacked, and the
  eight past the Birds went into Lillia.
- The net per iteration counts *"+4 token units with [Tank] and [Deflect]"*. [Tank] makes them die
  first, so after an attack of four or more none of them is left for your turn.
- The entry calls *"a 1-Energy sweeper is the only cheap answer"*. In the walk `OGN-133 Flurry of
  Blades` only empties A. `SFD-001 Against the Odds` and `SFD-136 Hard Bargain`, two runes each, take
  it, and Against the Odds gets +2 for each Bird.
- The entry's legend is *"Any Calm legend"*. Under `UNL-189 Bashful Bloom` Lillia is the Chosen
  Champion (103.2.a.2, 108.3.d), so the line is one card, and `UNL-190 Lilting Lullaby` joins the deck
  as a Signature counter.
