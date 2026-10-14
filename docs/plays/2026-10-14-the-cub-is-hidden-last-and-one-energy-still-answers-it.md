# Play — the Cub is hidden last, and one Energy still answers it

Issue #345 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `pakaa-cub-determined-sentry-hidden-anchor`**, the Body ENGINE in which `UNL-111
Determined Sentry` holds a battlefield so that an `OGN-135 Pakaa Cub` hidden there keeps its
hide. From the next turn on, the Cub can be played into the opponent's attack for nothing. Walked as a
game, every step of the entry that the game reached held. Their two-body attack on the Sentry met
a 3-Might Cub hidden for 1 Power on your T2, and the battlefield stayed yours. Two things the entry does not walk
decide whether it works. The hide has no [Reaction] on the turn it is made, so it must be the last
thing you do that turn. And the cheapest answer for a Fury/Chaos opponent is not the entry's Body
sweep but `OGN-169 Gust`, one Energy at Reaction speed, which returns either piece to hand.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `f342824`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 41 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 62 (a hit on *before*), second in the list. The other entry of this slice is rank 61,
`SFD-024 Rell, Magnetic` stacking Equipment under the Purifier, played in
[Rell feeds only from base, and the legend does the arithmetic](2026-10-14-rell-feeds-only-from-base-and-the-legend-does-the-arithmetic.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | any legend with Body among its two domains (103.1.b); here `OGN-257 Blind Monk` (Calm/Body) |
| **The anchor** | `UNL-111 Determined Sentry` (Body, E1, M1) |
| **The payoff** | `OGN-135 Pakaa Cub` (Body, E3, M3, [Hidden]) |

Both cards are mono-Body, so 103.1.b admits them under any of the Body legends the entry lists.
Neither is in `data/legality.src.json`.

The card text the play turns on:

- Determined Sentry: *"I can't move to base."*
- Pakaa Cub: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.)"*
  and nothing else.
- Blind Monk: *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't have a buff, it
  gets a +1 :rb_might: buff.)"* Its Chosen Champion has to carry the Lee Sin tag (103.2.a.2); it is
  idle in the walk.

## 2. What the hide is, turn by turn

811.1.b in full: *"While this card is in your hand or in your Champion Zone on your turn during an
Open State, you may pay [A] to hide this facedown at a battlefield you control that doesn't already
have a facedown card hidden there for as long as you control that battlefield. Beginning on the next
turn, this gains [Reaction] and you may play this, ignoring its base cost."*

Two halves, and the entry walks the second. **On the turn you hide it, the Cub has no [Reaction].** It
cannot be played to save itself that turn. It is lost if you lose the battlefield, and 323.7 says
how: *"Remove all Hidden cards from all Battlefields that are not controlled by the same player and
place them in their owner's Trash."*

On your own turn, though, they can act only when you give them a chain. 316.5.b: *"This is denoted
as a Neutral Open State, and only the Turn Player has the ability to play spells or activate
abilities."* Hiding opens none. 811.1.c.2: *"Hiding a card does not open a chain."* Every play and
every activated ability does (354.1: *"This Closes the State."*), and a [Reaction] of theirs can
answer it (813.1.c.1: *"This can be played during Closed States on any player's turn."*). **So hide
last.** Hide first and then play anything, and they can respond to that play by removing the Sentry.
When the chain empties the turn is Open again, and 323.6 strips your Control: *"Players lose control
of any controlled Battlefields without their Units occupying them if the turn is in an Open State and
there is no Showdown or Combat ongoing there."* The Cub goes to the trash in the same cleanup.

From the next turn the Cub is a [Reaction] card that costs nothing, and it can answer anything.

## 3. Their order: Fury/Chaos, bodies from base

`SFD-185 Glorious Executioner` (Fury/Chaos): *"When you win a combat, draw 1."* Idle in the walk,
since they win none; its Chosen Champion carries the Draven tag. They play `SFD-006 Eager Drakehound`
(Fury, E3 + 1 Power, M3, *"I enter ready."*), `OGN-013 Pouty Poro` and `OGN-010 Legion Rearguard`
(both Fury, E2, M2) and `OGN-016 Dangerous Duo` (Fury, E3, M3). In the walk their hand holds no
removal. §5 puts a Gust in it.

## 4. The turns, going first

Calm/Body against Fury/Chaos. Your rune deck is six Calm and six Body; theirs six Fury and six
Chaos. Your opening four are Determined Sentry, Pakaa Cub, Stalwart Poro and Sunlit Guardian; the
draws are bodies for later turns. `OGN-052 Stalwart Poro` is Calm, E2, M2 with [Shield]; `OGN-054
Sunlit Guardian` is Calm, E3, M3 with [Shield] and [Tank].

```
turn    runes   your turn                                                 points
T1      2       Determined Sentry (E1) to base. Blind Monk (E1): buff     0
                the Sentry, Might 2.
their T1        Eager Drakehound (E3 + 1 Fury) on the 485.7 extra rune:
                three exhausted, one recycled. It enters ready, walks to
                A, Conquer. Two runes, none ready.
T2      4       The Sentry walks to B, Conquer: +1. Stalwart Poro (E2)     1
                to base; Blind Monk (E1) buffs it, Might 3. Last, hide
                the Cub at B: one rune recycled for the rainbow. Three
                runes.
their T2        Hold A. Pouty Poro (E2) and Legion Rearguard (E2) to
                base. Four runes, all spent. The Drakehound stands at A
                and cannot reach B (144.4).
T3      5       Hold B: +1. Sunlit Guardian (E3) to base; Blind Monk      2
                (E1) buffs it, Might 4. Stalwart Poro stays in base,
                where it can reach either battlefield. One rune left.
their T3        Hold A. Pouty Poro and Rearguard (2 + 2) attack B: the
                Sentry, 2, and one facedown card. You play the Cub from
                facedown, free: 2 + 3 = 5 against 4. Their 4 kill the
                Cub and mark 1 on the Sentry; your 5 kill both. B stays
                yours. Dangerous Duo (E3) to A. Three runes left.
T4      7       Hold B: +1. Stalwart Poro (3) and Sunlit Guardian (4)     4
                attack A: the Drakehound and the Duo, 3 + 3. Their 6
                go 4 on the Guardian first ([Tank]) and 2 on the Poro;
                your 7 kill both. Conquer A: +1.
```

Their points: 1 after their T1, 2 after their T2, 3 after their T3. After your T4 it is **4 to 3**,
with both battlefields yours.

**Why the hide survived your T2.** They had no ready rune: their T1 spent all three. You played the
Poro and used the Monk before the hide, so the last chain of your turn closed before the Cub went
down (§2).

**The Cub in their attack.** The attacking player gains Focus (464.2.d). In the Showdown they pass,
and you play the Cub with Focus. It is a [Reaction] card from facedown, at no cost (811.1.b), and
811.1.d.1 puts it at B: *"A hidden permanent must be played to that battlefield."* 464.2.c.3.a makes
it a defender: *"If a Unit controlled by the Attacker or Defender becomes present at this Battlefield
after this moment, it will gain the Attacker or Defender designation during the Cleanup phase
following the action that caused it to become present"*. Entering exhausted (143.4) does not keep it
out. They chose which of your units died: lethal must be assigned in full one unit at a time
(465.2.c.3), and 4 is one Cub and 1 on the Sentry, or one Sentry and 2 on the Cub. Either way a
unit of yours is left at B. Their attackers are gone, so B stays yours.

**What the facedown card bought.** Without it the same attack is 4 against the Sentry's 2: the Sentry
dies, they Conquer B and it is **2 to 4 after their T3**, both battlefields theirs. The Cub cost one
rune recycled on T2, so you had five runes on T3 instead of six. T3 spent four, so the missing rune
cost nothing in the walk.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 601.1.b less
the Chosen Champion, which 103.2.a.1 places in the Champion Zone. Going first you have seen **5**
cards by T1 (four opening, one draw) and **6** by T2. The walk's line, a Sentry by T1 and a Cub by T2,
is **12.41%** at the entry's three of each. A Cub by T2 alone is **40.30%**. With one of each it is
**1.69%**.

## 5. Breaks to

**The cheapest break is `OGN-169 Gust`, one Energy, at Reaction speed.** *"[Reaction] (Play any
time, even before spells and abilities resolve.) Return a unit at a battlefield with 3 :rb_might: or
less to its owner's hand."* The scope: the 32 spells in `data/corpus_flat.txt` whose domains are
Fury, Chaos or Fury/Chaos, whose text carries [Action] or [Reaction], and that say kill, deal, stun,
return, banish, move or counter, read by hand. Three of them cost one resource in all. Gust is the
only one of the three that touches a unit; `OGN-179 Acceptable Losses` and `SFD-135 Factory Recall`
touch gear. Gust reaches both pieces, since the Sentry is Might 1 or 2 and the Cub Might 3. A return
to hand is not a move to base, so the Sentry's text does not stop it.

Walked on their T3, with a Gust in hand: they still have six runes. The Cub resolves at B and Focus
passes to them, 346: *"When the last item on the chain resolves and the turn returns to an Open
State during a Showdown, Focus passes, and the next Player gains both Focus and Priority."* They Gust
the Cub back to your hand. 4 against the Sentry's 2 takes B, and it is **2 to 4**, as if the Cub had
never been hidden. The Cub in hand has lost its free play: it costs E3 from hand (811.3), or another
rainbow and a turn of waiting. They paid one Energy and still played the Duo.

**What answers the Gust.** `OGN-045 Defy` (Calm, E1 + 1 Power): *"Counter a spell that costs no more
than :rb_energy_4: and no more than :rb_rune_rainbow:."* Gust qualifies. Your one rune left from T3
pays both halves if it is a Calm rune: exhausted for the Energy and recycled for the Power (164.2.a,
164.2.b). Holding it is what keeps the hide honest against a Chaos hand.

**On your own hide turn** they need a ready rune and a chain you open after the hide (§2). In the
walk they had neither.

The entry's named answer, `OGN-133 Flurry of Blades`, is Body: it is not legal under a Fury/Chaos
legend (103.1.b).

## 6. Verdict

**Right, with an order the entry does not state, and a cheaper answer than the one it names.** A
Sentry plus a hidden Cub held B against a two-body attack, for one Energy and one Power spent across
two turns. 811.1.b gives the Cub [Reaction] only from the next turn. On the turn of the hide, a chain
you open afterwards gives them a window. If they remove the Sentry in it, 323.6 takes the battlefield
and 323.7 puts the Cub in the trash. So the hide goes last. From then on the Cub can answer
anything, and the cheapest thing that answers it is Gust: one Energy, either piece back to hand, and
the free play gone with it.

## 7. Not verified

I did not deal the channel order. Their Drakehound needs one Fury among their first three runes,
which it recycles: with six Fury in the twelve it fails in **20 of 220 deals, 9.09%**. Your side needs
no domain in the walk: the Sentry, Poro, Guardian and the Monk's ability are Energy only, and the
hide's rainbow is any rune. Defy in §5 needs one Calm among your ready runes on their T3; I did not
price that, since you choose which rune to recycle on T2. Gust needs no Power.

I did not walk which unit they kill when both are lethal options, the case where they keep the Cub
alive and kill the Sentry (the Cub then holds B and can leave it), the mulligan, a second hide, or
2v2. The probabilities in §4 count only cards in hand at the turn named.

## Leads

- The entry's last notable names `OGN-133 Flurry of Blades` (Body) as the one-Energy answer. Only a
  Body opponent can run it (103.1.b). Against Chaos the cheapest is Gust (E1, [Reaction]), which
  returns either piece. The returned Cub loses its free play (811.3: E3 from hand), and returning the
  Sentry is not a move to base, so its text does not stop it.
- The fourth notable says *"Removal by kill or banish is the real answer"*. A return to hand is
  cheaper than either in Chaos.
- No notable says the hide has no [Reaction] on the turn it is made. Hiding opens no chain
  (811.1.c.2), but any play or activated ability after it does. Removing the Sentry in response loses
  the battlefield (323.6) and trashes the Cub (323.7). Hide last.
- The third notable is headed *"WHICH IS WHY A BODY THAT CANNOT LEAVE IS WORTH ONE ENERGY"*. What keeps the hide is a unit of yours
  standing there (323.6). Any unit you choose not to move does that. The Sentry's case is its cost,
  one Energy, not its text.
- Calm/Body can protect the hide with `OGN-045 Defy` (Calm, E1 + 1 Power), which counters Gust. No
  notable names a protection for the Cub itself; the existing list covers only the sweep.
