# Play — the garrison goes home on turn six, and four bodies come back

Issue #315 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `moonlight-affliction-tricksy-tentacles-evacuation`**, the Calm/Mind ENGINE in which
`UNL-066 Moonlight Affliction` takes the biggest defender's Might out of a garrison's sum, and
`UNL-054 Tricksy Tentacles` moves the whole garrison home, so a body of yours walks into an empty
battlefield and conquers it with no combat. The entry is right about the rules: 143.2.b reads the
afflicted body as 0, 323.6 strips the control, and the walk-in is a Conquer. Walked as a game, the two
spells are eleven runes, so the line runs on T6, the first turn with eleven, and only if nothing was
recycled before. The garrison has to be the right size, and the opponent decides that size. In the walk
it was exactly 8 plus the biggest body, and the line took B for one point. The evacuated bodies were
moved, not killed. On their T6 four of them walked back in, and they kept 14 without the biggest, out of
the line's reach. What breaks it is `OGN-046 En Garde`, one rune, on Tentacles.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `209c142`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 57 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 44 (a hit on *first*), first in the list. The other entry of this slice is rank 45, played
in [the second Sergeant walks the turn it lands, and B changes hands twice](2026-10-07-the-second-sergeant-walks-the-turn-it-lands-and-b-changes-hands-twice.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Calm/Mind legend (103.1.b); here `OGN-255 Nine-Tailed Fox` |
| **The spells** | Moonlight Affliction and Tricksy Tentacles in hand on the same turn, and eleven runes, one of them Calm |
| **The walker** | a ready body of yours in base, played on an earlier turn |
| **Target** | an enemy garrison whose total Might is more than 8 and at most 8 plus its biggest body |

The card text the play turns on:

- Moonlight Affliction (Mind, E7): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Give a unit -10 :rb_might: this turn."*
- Tricksy Tentacles (Calm, E4 + 1 Power): *"Move any number of enemy units with the same controller and a
  total Might of 8 or less to a single location."*
- Nine-Tailed Fox: *"When an enemy unit attacks a battlefield you control, give it -1 :rb_might: this
  turn, to a minimum of 1 :rb_might:."*
- Blind Monk (theirs): *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit. (If it doesn't have a buff,
  it gets a +1 :rb_might: buff.)"*
- Wizened Elder (theirs, Calm, E4, M4): *"While I'm buffed, I have an additional +1 :rb_might:."*
- En Garde (theirs, Calm, E1): *"[Reaction] (Play any time, even before spells and abilities resolve.)
  Give a friendly unit +1 :rb_might: this turn, then an additional +1 :rb_might: this turn if it is the
  only unit you control there."*

## 2. Your order: shrink, move, walk

**The Affliction has to resolve first.** Tentacles chooses its targets when it is played, and the sum
is a targeting restriction, so it has to be 8 or less at that moment. 143.2.b is what the Affliction
buys: *"If a unit's Might is ever less than 0, it is treated as 0 when referenced by spells and
abilities, and when summing Might to be assigned as damage in the Combat Damage Step."* A 6-Might body
at -4 adds nothing to Tentacles' sum. A second Affliction on the same body adds nothing either. 143.2.b.1:
*"Although the unit’s Might is treated as 0, it is not 0."* Both spells are your Main Phase cards here.
Tentacles has no [Action], and 813.1.b lets the Affliction be played wherever an Action could: *"Reaction
grants the corresponding card or effect all abilities and permissions of Action."*

**Tentacles chooses the destination.** 449.1: *"The source of the Move will provide details on any
restrictions on legality for Destination."* The card says *"a single location"*, so their base is legal.
Do not send them to a battlefield of yours. There they would be the Attackers of a combat on your turn,
which is a different line.

**Their control goes at the next cleanup.** 323.6: *"Players lose control of any controlled Battlefields
without their Units occupying them if the turn is in an Open State and there is no Showdown or Combat
ongoing there."* Nobody gains it. The battlefield is now open, 170.11.c: *"Battlefields can be “open.”
This means they are unoccupied and uncontrolled."*

**Then a body walks in.** The walk is a Standard Move, and 144.2 makes it cost an exhaust: *"Exhausting
the Unit is the Cost for this action."* So the walker has to be a body that was already in base and
ready, not one played this turn (143.4). 190.3.a.1: *"Units moving to or being played to a battlefield
apply Contested status if that battlefield is not already Contested and that Unit’s controller does not
already control that battlefield."* 344.2: *"If Control of a Battlefield is Contested, there aren’t units
controlled by different players there, and the turn is in a Neutral Open State, a Showdown is opened
during the next Cleanup."* When everyone passes, 348.2.a gives you control, and 348.2.a.1 makes it
score: *"This results in a Conquer if that player has not yet scored that Battlefield this turn."*

## 3. Their order: stack B, threaten A from base

Calm/Body with `OGN-257 Blind Monk`, which buffs one body a turn on their own turn. It cannot answer on
yours. 381: *"All Activated Abilities can only be activated on the Controlling Player's Turn and during
an Open State."* They take B on their T2 and stack it to fourteen by T3, three buffed bodies. After that
the new bodies go to base, because a body at B cannot reach A. 144.4.b: *"Units may move from a
Battlefield to their Base."* Only a body in base can attack A. That split is what puts B in the line's
reach.

## 4. The turns, going first

Calm/Mind against Calm/Body. Your rune deck is six Calm and six Mind. Your opening four are Stalwart
Poro, Sunlit Guardian, Clockwork Keeper and Tricksy Tentacles. The draws are Affectionate Poro, a second
Sunlit Guardian, Navori Scout, a second Stalwart Poro, a second Affectionate Poro, and on T6 Moonlight
Affliction. You pay no Power before T6.

```
turn    runes   your turn                                                 points
T1      2       Stalwart Poro (E2) to base.                               0
their T1        Sea Monkey (E2, and E1 extra) to base: it buffs itself
                to 3. All three runes spent.
T2      4       Poro walks to A, Conquer: +1. Sunlit Guardian (E3) to     1
                A. One idle.
their T2        Sea Monkey walks to B, Conquer. Wizened Elder (E4) to
                B, and Blind Monk (E1) buffs it: 4 + 1 + 1 = 6. B is
                at nine. All five spent.
T3      6       Hold A: +1. Nine is out of Tentacles' reach alone.        2
                Clockwork Keeper (E2, extra cost not paid) to base.
                Affectionate Poro (E3) to A. One idle.
their T3        Hold B. Yordle Explorer (E4) to B, and Blind Monk (E1)
                buffs it to 5. B is at fourteen. Two idle.
T4      8       Hold A: +1. Second Sunlit Guardian (E3) and Navori        3
                Scout (E4) to A. One idle.
their T4        Hold B. Second Wizened Elder (E4) to base, and Blind
                Monk (E1) buffs it to 6. Second Sea Monkey (E2, and E1
                extra) to base, at 3. One idle.
T5      10      Hold A: +1. Second Stalwart Poro (E2) and second          4
                Affectionate Poro (E3) to A. Five idle: the two spells
                are eleven.
their T5        Hold B. Navori Scout (E4) and Pit Rookie (E2) to base.
                The Rookie buffs the Scout to 5, and Blind Monk (E1)
                buffs the Rookie to 3. Four idle.
T6      12      Hold A: +1. Moonlight Affliction (E7) on the Elder at     6
                B: 6 becomes -4, read as 0. Tricksy Tentacles (E4 + 1
                Calm) on the Elder, the Sea Monkey and the Explorer,
                0 + 3 + 5 = 8, to their base. Eleven tapped, one of
                them recycled, one idle. At the cleanup B is
                uncontrolled. The Keeper walks in, nobody else comes,
                and the showdown closes: Conquer, +1.
their T6        No Hold. The Elder, the Explorer, the second Elder and
                the Sea Monkey walk into B: 20 Might, 14 without the
                biggest. Nine-Tailed Fox makes them 16 against the
                Keeper's 2. The Keeper dies and takes the Sea Monkey
                with it. Conquer. The other three stay in base.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5, 5 on T6. After their T6 it is 6 to 5.

Their T6 fight. Nine-Tailed Fox gives each attacker -1, so the Elders are 5, the Explorer 4 and the Sea
Monkey 2. Their 16 put lethal damage on the Keeper, and the Keeper's 2 kill the Sea Monkey. 466.5.d:
*"Establishing Control results in a Conquer if that player has not yet scored this Battlefield this
turn."* The three left in base, the second Sea Monkey, the Scout and the Rookie, are 11, and 8 after the
Fox, against A's 24 defending. They do not attack A.

**What the line bought.** One point. On their T6 they score B either way: a Conquer instead of a Hold.
So the point is yours alone, 6 to 5 where the same turns without the line give 5 to 5. The trade was the
Keeper for a Sea Monkey. The line also decided their T6. To stay out of reach they walked four bodies
into B, 14 without the biggest, so a second Affliction and Tentacles on T7 has nothing to take. It cost
eleven runes on T6 and two cards. Nothing was killed: Tentacles moves, and the three bodies it moved
came back the next turn.

**How often this T6 happens.** The line needs one of each spell in the first ten cards (the opening
four, then the T1 to T6 draws). With three of each in 39 that is **34.6%** of games, without a
mulligan. With the entry's single copy of each it is **6.1%**. The garrison also has to be in reach,
more than 8 and at most 8 plus its biggest body, and that is the opponent's choice, not a draw.

## 5. Breaks to

**The line breaks to `OGN-046 En Garde`** (Calm, E1: one rune, nothing recycled), held from their T5 and
cast in response to Tentacles, on the Sea Monkey. It is not alone at B, so it gets +1 and no more. The
targets are now 0 + 4 + 5 = 9. 355.11.b: *"If the group of targets no longer collectively fulfill the
targeting restriction as the spell or ability resolves, that spell or ability’s controller can choose a
subset of the original targets that fulfills the targeting requirement for the spell or ability to
affect."* Any subset leaves one body at B: the Sea Monkey at 4, or the Explorer at 5. B stays occupied,
so 323.6 strips nothing, and the Keeper's 2 does not beat either. They keep B. You spent eleven runes,
one of them recycled, and two cards. They spent one rune and one card.

The pump works because the sum was exactly 8. With slack under 8, one Might is not enough. The
unconditional answers are `OGN-045 Defy` and `VEN-039 Crumbling Sands`, one rune each, tapped and then
recycled. Crumbling Sands reads *"Counter a spell if an opponent has played another spell this turn."*
The line's own order meets that: the Affliction is the other spell.

The reply is your own Defy with the twelfth rune, cast on En Garde, which is one Energy and inside
Defy's limit. T6 then taps all twelve and recycles two. A second answer from them, at one rune more,
wins the exchange.

## 6. Verdict

**Right, on turn six, against a garrison the opponent sizes.** The rules reading is right. 143.2.b
reads the afflicted body as 0, Tentacles moves the rest home, 323.6 strips the control, and the walk-in
is a Conquer. The play adds three prices. Eleven runes is T6 at the earliest, and only if no more than
one rune was recycled on T1 to T5. The reach is 8 plus the biggest body. The opponent sets the garrison:
in the walk a fourth body at B would have put it out of reach, and on their T6 they walked four back in.
And the bodies are moved, not killed, so B is theirs again on their next turn. The line is worth one
point, and it forces their next turn into B.

## 7. Not verified

I did not deal the channel order. No Power is paid before T6, and on T6 all twelve runes are on the
board, six of them Calm, so Tentacles' Calm Power fails in none of the 924 deals. They pay no Power at
all. I did not walk the mulligan, a second walker in base (with the Keeper and a
3-Might body, the En Garde subset becomes a fight the walkers win), Defy cast on Tentacles itself, Eager Apprentice, T7 on, or 2v2.

## Leads

- The entry prices the line at *"Eleven Energy and 1 Calm Power for a bloodless Conquer"*. In a game
  that is T6, the first turn with eleven runes, and only if no more than one rune was recycled before.
- The reach, *"8 plus the afflicted body's own Might"*, is right, and the opponent controls it. In the
  walk a fourth body at B would have put the garrison out of reach. On their T6 they walked four bodies
  back in, 14 without the biggest.
- `OGN-084 Eager Apprentice` (Mind, E3) reads *"While I'm at a battlefield, the Energy costs for spells
  you play is reduced by :rb_energy_1:, to a minimum of :rb_energy_1:."* One at A makes the line nine
  runes, T5. Two make it seven, T4. Not walked.
- The entry's 355.11.b notable says to price the shrink before casting. The price is one Energy:
  En Garde, when the sum is exactly 8 and one body walks in.
- The entry names no answer to Tentacles. `VEN-039 Crumbling Sands` (one rune) counters it, and its
  condition is met by the line's own order, because the Affliction is played first.
