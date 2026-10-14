# Play — The second burn buys Anivia's life, not a kill, and Level 11 only hides her for a turn

Issue #358 (a slice of #200), 2026-10-14. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `anivia-svellsongur-double-burn`**, the Calm/Body ENGINE in which `SFD-059 Svellsongur`
copies `OGN-148 Anivia, Primal`'s *"When I attack, deal 3 to all enemy units here"*, so one attack
sweeps the battlefield for 6, and `UNL-191 Wuju Master`'s Level 11 lets her attack the turn she
lands. Walked as a game going first, the sweep came on T5 and killed a seven-body garrison. The first
sweep and her own 9 Might would have killed all seven anyway. What the second sweep bought was that no
defender was left for the damage step, so she lived and conquered. Level 11 was live on T5, but it
did not make the attack earlier. Landed on T4 without it, she is ready on T5 too. What it bought is
that she was never on the board during their turn. The entry prices the line at 9 Energy and 2
Power, and its own addends make 11 and 4. The cheapest break needs no card: a body kept in base on
their T2 trades into the Hunt bodies on their T3, and Level 11 misses T5. The cheapest answer to
Anivia herself is one rune: `OGN-213 Hidden Blade` hidden at the battlefield she attacks kills her
with both sweeps on the chain, and the sweeps then have no "here".

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-14 at `1f72233`, reads
773 entries, 262 with forced-ordering language, **102 in the queue and 33 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 71 (a hit on *before*), second in the list. The other entry of this slice is rank 70,
`OGN-027 Darius, Trifarian` with `UNL-184 Thrill of the Hunt`, played in
[Darius is an eight only where they attack, and his ready pays on your turn](2026-10-14-darius-is-an-eight-only-where-they-attack-and-his-ready-pays-on-your-turn.md).
The same legend's XP faucet is walked in
[The Gardens buy Level 6 a turn early, and a ready attacker on their T2 takes them first](2026-10-14-the-gardens-buy-level-6-a-turn-early-and-a-ready-attacker-on-their-t2-takes-them-first.md),
which quotes the Level rules this play relies on.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `UNL-191 Wuju Master` (Calm/Body) |
| **The payoff** | `OGN-148 Anivia, Primal` (Body, E7 + 2 Power, M8) |
| **The copier** | `SFD-059 Svellsongur` (Calm Equipment, E3 + 1 Power, M+0, [Equip] 1 Energy + 1 Calm Power) |
| **The XP** | `UNL-109 Blood Rose` (Body, E1), `UNL-094 Gemhand Hunter` (Body, E2, M2), `UNL-040 Wuju Apprentice` (Calm, E2, M2), `UNL-092 Demacian Diplomat` (Body, E2, M2), and the Chosen Champion `UNL-113 Master Yi, Tempered` (Body, E4, M4) |

None of these cards is Signature (`data/cards.json`), and none is in `data/legality.src.json`. The
Chosen Champion starts the game in the Champion Zone, 103.2.a.1: *"This will be placed in the
Champion Zone at the start of the game."* And 108.3.d: *"The Chosen Champion can be played from here
as normal, following the rules of Playing a Card."* So Master Yi is in every game.

The card text the play turns on:

- Anivia, Primal: *"When I attack, deal 3 to all enemy units here."*
- Svellsongur: *"[Equip] :rb_energy_1::rb_rune_calm: (:rb_energy_1::rb_rune_calm:: Attach this to a
  unit you control.) As this is attached to a unit, copy that unit's text to this Equipment's effect
  text for as long as this is attached to it."*
- Wuju Master: *"[Level 6][>] Your units have +1 :rb_might:. (While you have 6+ XP, get the effect.)
  [Level 11][>] Your units enter ready."*
- Blood Rose: *"When you play a unit, you may pay :rb_energy_1: to gain 1 XP. Spend 3 XP,
  :rb_exhaust:: Ready a unit."* The walk never spends XP.
- Gemhand Hunter: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] I have +1 :rb_might:.
  (While you have 6+ XP, get the effect.)"*
- Wuju Apprentice: *"[Hunt] (When I conquer or hold, gain 1 XP.) [Level 6][>] When you play me, draw
  1. (While you have 6+ XP, get the effect.)"*
- Demacian Diplomat: *"When you play me, gain 1 XP."*
- Master Yi, Tempered: *"[Hunt 2] (When I conquer or hold, gain 2 XP.) [Level 6][>] I have [Deflect]
  and [Ganking]."*

## 2. What two sweeps are, and what they cost

**The copy is a second trigger on Anivia.** 725.1: *"If an Attached card has a Passive or Replacement
ability that applies during the process of Attaching or a Triggered ability that triggers off of
Attaching, that text exists and can be processed as it Attaches."* Then 434.1.c: *"The Top-Most card
has all Effect Text of all cards Attached to it appended to its Rules Text."* Anivia carries the
sentence twice, and the "I" in the copy is her. The count stands on R6 = A (ruled on issue #11). Her
sentence has no *"each turn"* cap, so the open question OQ-SVELL-CAP does not reach it.

**Each copy fires once per combat, and only into a garrison.** 383.4.e.2.a: *"These triggers will only
have their condition checked once per combat, despite a Unit being able to gain and lose the Attacker
designation multiple times in the same combat."* A combat needs units of both players, 323.9: *"7.
Mark a Combat as Staged at each Battlefield that Contested was applied to that have Units present
controlled by opposing players."* Walked into an empty battlefield she conquers it and deals nothing.

**Six to everything ends the combat before the damage step.** 465.1: *"If both Attacking and Defending
units remain at this battlefield, the following Tasks become Outstanding, in the specified order:"*
With no defender left, nobody deals her combat damage. 466.5.d: *"Establishing Control results in a
Conquer if that player has not yet scored this Battlefield this turn."* One sweep of 3 marks damage
that stays for the damage step. 142.4.b: *"Lethal Damage for a Unit is a non-zero amount greater than
or equal to that Unit’s Might."* So a survivor of Might m needs only m − 3 more from her, but it still
deals its full Might to her.

**"Here" is read when each sweep resolves.** 359.3.f.2: *"Information referenced in an instruction in
this way will be checked on execution of the instruction."* Its worked example is an attack trigger
whose unit was sent to base in response: *"When the attack trigger resolves, “here” is no longer the
battlefield where combat is ongoing and the attack trigger mistargets."* §5 uses this.

**The price is 11 Energy and 4 Power.** Anivia is E7 + 2 Body Power, Svellsongur E3 + 1 Calm, its
Equip E1 + 1 Calm. A rune pays Energy by exhausting and Power by being recycled. 164.2.b: *"Recycle
this: [Reaction] — Add [C]."* A rune exhausted for Energy can still be recycled the same turn, which
takes it off the board. 416.1: *"Recycling cards is the action in which a player takes one or more
cards from a specific zone and then puts it on the bottom of the corresponding deck."* Going first,
you have 2, 4, 6, 8 and 10 runes on T1 to T5, less every rune recycled before.

**So T5 is the first turn of the attack, Level 11 or not.** Svellsongur has to be on the board before
its Equip, and its Calm Power costs one rune. That leaves 7 runes on T4, and Anivia plus the Equip is
8 Energy. On T4 she can be played but not equipped, and she enters exhausted, 143.4: *"Units enter
the Board exhausted."* Level 11 replaces that, 143.4.a: *"This can be altered by Accelerate or
similar game effects."* But Level 11 cannot bring the attack forward to T4, because T4 is one Energy
short. Scope: basic runes only. Cards that add Energy, such as `UNL-093 Dragonsoul Sage`, are not
walked.

## 3. Their deck: Body/Order, everything to B

`UNL-203 Keeper of the Hammer` (Body/Order): *"When you hold, gain 1 XP. Spend 3 XP, :rb_exhaust::
Draw 1."* Its Chosen Champion carries the Poppy tag, here `UNL-116 Poppy, Paragon` (Body, E5, M5).
They play `SFD-159 Trusty Ramhound` (Order, E2, M2): *"While you have another unit here, I have +1
:rb_might:."*, `OGN-130 Crackshot Corsair` (Body, E3, M3): *"When I attack, deal 1 to an enemy unit
here."*, `OGN-219 Vanguard Sergeant` (Order, E4, M4, no text) and `OGN-215 Petty Officer` (Order,
E5, M5): *"[Assault] (+1 :rb_might: while I'm an attacker.)"* Defending, the Corsair and the Officer
are a 3 and a 5. After their first unit, they play every unit straight to B. 355.2.a: *"By default,
Valid locations include the controller’s Base or a Battlefield the controller controls."* That
scores B every turn, and leaves them nothing in base.

## 4. The turns, going first

Calm/Body against Body/Order. Your battlefield is `OGN-281 Hallowed Tomb` (*"When you hold here, you
may return your Chosen Champion from your trash to your Champion Zone if it is empty."*), A; theirs is
`OGN-277 Back-Alley Bar` (*"When a unit moves from here, give it +1 :rb_might: this turn."*), B.
Neither battlefield's text does anything in the walk. Your opening four are Gemhand Hunter,
Svellsongur, Blood Rose and Wuju Apprentice. Your T1 draw is Demacian Diplomat, your T2 draw Anivia,
and your T3 draw a second Gemhand Hunter. They go second, 485.7: *"First Turn Process: The player
going second channels an extra Rune from their Rune Deck during their first Channel Phase of the
game."*

```
turn    runes   your turn                                                 XP   points
T1      2       Gemhand Hunter (E2) to base.                              0    0
their T1        Trusty Ramhound (E2) to base. Three runes, one left.
T2      4       Gemhand walks to A, Conquer: +1, its Hunt +1 XP.          1    1
                Svellsongur (E3, its Calm Power from one of those three
                runes, recycled). Blood Rose (E1). Three runes stay on
                the board.
their T2        Ramhound walks to B, Conquer. Crackshot Corsair (E3) and
                a second Ramhound (E2) straight to B. Five runes, none
                left.
T3      5       Hold A: +1, Hunt +1 XP. Wuju Apprentice (E2) to A, Blood  4    2
                Rose's E1 +1 XP. Demacian Diplomat (E2) to A, +1 XP. No
                runes left.
their T3        Hold B. Vanguard Sergeant (E4) and a second Corsair (E3)
                to B. Seven runes, none left.
T4      7       Hold A: +1, two Hunts +2 XP (6), Level 6 is live. Master   7    3
                Yi (E4) from the Champion Zone to A, Blood Rose's E1 +1
                XP. The second Gemhand Hunter (E2) to A. No runes left.
their T4        Hold B. Petty Officer (E5) and a second Sergeant (E4) to
                B. Nine runes, none left.
T5      9       Hold A: +1, three Hunts +3 and Yi's Hunt 2 +2 XP (12),    13   5
                Level 11 is live. Anivia (E7 + 2 Body, two runes
                recycled) to base, enters ready. Blood Rose's E1 +1 XP.
                Svellsongur's Equip (E1 + 1 Calm, one rune recycled) on
                Anivia. She walks to B: two sweeps of 3, all seven die.
                Conquer: +1. Six runes stay on the board.
```

Their points: 0 after their T1, 1 after their T2, 2 after their T3, 3 after their T4. After your T5
it is **5 to 3**, B is yours, and they have no unit on the board. The Hold is the first task of
your turn, 315.2.b.2: *"1. The Turn Player Holds all Battlefields they Control."* So the five XP of
the T5 Hold are in before Anivia is played, and 823.1.c.1 says what each Hunt pays: *"Hunt is
functionally short for: “When I Conquer or Hold, my controller gains X XP.”"*

**Why they never attacked A.** After their T1, every unit they played went straight to B, and the T1
Ramhound walked there on their T2. A unit at B reaches A only with [Ganking], 144.4.c: *"Ganking is a
unique ability that affects a Unit's Standard Move"*. None of theirs has it. From their T2 on they had
nothing that could attack A. §5 walks the other choice, and it is the cheapest break.

**Your T5, where the copy fires.** Level 6 makes Anivia a 9. B holds two Ramhounds (3 each, with
another unit there), two Corsairs (3), two Sergeants (4) and the Officer (5): seven units, 25 Might.
She walks in, she and they gain their designations (464.2.c.3), and both of her attack triggers go on
the chain. Their runes are all exhausted, so nothing answers. The first sweep kills the four 3s, and
the second kills the two Sergeants and the Officer, which had 3 marked each. No defender remains, so
465.1 skips the damage step, and you conquer B.

**What the second sweep bought.** Take Svellsongur off and the one sweep kills the four 3s. The
Sergeants and the Officer survive with 3 marked, and 4 + 4 + 5 = 13 against her 9. You assign first
(465.2.c), and 1 + 2 + 1 = 4 of your 9 kill all three. Their 13 kill her. Nobody is left, 466.5.b:
*"If there are no Units remaining here controlled by any player, the Battlefield becomes
Uncontrolled."* It is 4 to 3 instead of 5 to 3, and you have no Anivia. **The second sweep killed
nothing that the first sweep and her 9 did not.** It bought her survival, the Conquer, and B. Against
a garrison whose survivors of one sweep total less than her Might, it buys nothing. Here, three
4-or-5s were enough.

**What Level 11 bought.** Without it, Anivia lands on T4 for all seven runes (E7 + 2 Body, both
recycled) instead of Master Yi and the second Gemhand, and she is ready on T5 (315.1.b). The Equip
and the attack come on T5, the same turn. The difference is their T4. She stands in your base through
it, where `OGN-229 Vengeance` (Order, E4 + 2 Power: *"Kill a unit."*) reaches her, and they can see
her before they place their T4 plays. Played to base, the Officer (6 as an attacker) and the second
Sergeant (4) stay out of the sweep. On their T5 they walk into B, 10 against her 9, and assign her
lethal first. Master Yi, played to B after your Conquer with four of the six Energy left after the
Equip, keeps B (your 14 against their 10), but Anivia dies a turn after she lands. Level 11 was worth
hiding her for a turn, not a turn of speed.

**How often this happens.** The draw pile is **39** cards, the 40 of Tournament Rules 402.1 less the
Chosen Champion, which 103.2.a.1 places in the Champion Zone. With three Svellsongur and three Anivia
(103.2.b), going first, you have seen **6** cards by T2 and **9** by T5 (four opening, one draw a
turn). Svellsongur among the first 6 and Anivia among the first 9, as in the walk, is **21.14%**.
Svellsongur needs only to be cast by T4 (8 cards seen), which makes it **26.77%**. Master Yi needs no
draw. These figures count only the two finisher cards, not the Hunt bodies the Level 11 count needs.

## 5. Breaks to

**The cheapest break needs no card: a body kept home on their T2 trades into A on their T3, and Level
11 misses T5.** On their T2 the Ramhound walks to B and conquers it, and the Sergeant (E4) goes to
their base instead of the Corsair and the second Ramhound. On their T3 they Hold B, and the Sergeant,
readied by their Awaken (315.1.b), walks to A: 4 against Gemhand, Apprentice and Diplomat, three 2s,
since your XP is 4 and Level 6 is not live. They assign 4 first and kill Gemhand and Apprentice,
your two Hunt bodies (465.2.c.3), and your 6 kill the Sergeant. A stays yours with the Diplomat. Your
T4 Hold has no Hunt, so XP is 4, and Master Yi with Blood Rose and the second Gemhand make it 5. Your
T5 Hold adds Yi's 2 and Gemhand's 1: **8**. Level 11 is not live on T5. Anivia played on T5 enters
exhausted, and the attack waits for T6. The other way is Anivia on T4, exposed through their T4 as in
§4. It needs no card beyond the walk's own, and the trade is one of their cards for two of yours.

**The cheapest answer to Anivia herself costs one rune: `OGN-213 Hidden Blade` hidden at B.** Its
text: *"[Hidden] (Hide now for :rb_rune_rainbow: to react with later for :rb_energy_0:.) [Action] (Play
on your turn or in showdowns.) Kill a unit at a battlefield. Its controller draws 2."* On their T4 they
hide it at B. Its [A] is one Power of any domain, from recycling one of the nine runes they exhausted
for the Officer and the second Sergeant, so their T4 plays are unchanged. On your T5, 811.1.b gives
the reason it can answer: *"Beginning on the next turn, this gains [Reaction] and you may play this,
ignoring its base cost."* 811.6 adds: *"A card that is Hidden gains Reaction while facedown or played
from facedown, and may be played any time a card with Reaction may be played as a result."* Anivia
walks into B, her two triggers go on the chain, and they play the Blade on her, a unit at B
(811.1.d.2). She dies, you draw 2, and then both triggers resolve. "Here" is read on execution
(359.3.f.2), and 359.3.e.12's example gives a unit off the board no location: *"A unit that is no
longer on the board has no location, is neither exhausted nor readied, etc."* Neither sweep reaches
anyone, and their seven still stand. Svellsongur detaches, 719.5: *"When a Top-Most Card changes zones
from a board zone to a non-board zone, all Attached cards Detach from it, remaining in their current
zones."* Then 457.1 sends it home: *"When an un-attached non-Unit Gear is created or played at a
battlefield, or is at a battlefield for any other reason, it is Recalled to its controller's base
during the next Cleanup."* After your T5 it is 4 to 3 with B theirs. It cost you Anivia, the Equip
and the turn, and them a card and a rune. Going second, they have seen **8** cards by their T4. With
three Hidden Blade in 39 cards, one is among them in **50.82%**.

**The second sweep alone dies to `OGN-224 Salvage`** (Order, E2 + 1 Power): *"[Action] (Play on your
turn or in showdowns.) You may kill up to one gear. Draw 1."* Svellsongur sits in your base from T2
on. Salvage on their T4 costs them the second Sergeant (seven of their nine Energy go to the Officer
and Salvage), and they draw 1. On your T5 the one sweep kills the four 3s. The other Sergeant (4) and
the Officer (5) survive it, and their 9 kill her 9 while her 9 kill both. Nobody is left, B is
uncontrolled (466.5.b), and it is 4 to 3.

**The scope of the one-rune verdict.** A Body/Order deck plays Body, Order and Body/Order cards
(103.1.b.1), and no colourless spell or gear in `data/corpus_flat.txt` kills a unit. Four of the
spells and gear in those domains kill a unit the caster chooses, at any Might: Hidden Blade (E2 + 1), Vengeance (E4 + 2), `SFD-164 Drag Under` (E5 + 1,
E2 less from anywhere other than hand) and `OGS-012 Blast of Power` (E6 + 1). The first, third and
fourth reach only *"a unit at a battlefield"*, and none of the four prints [Reaction]. With her
triggers on the chain the turn is in a Closed State (309.1: *"If a Chain exists, the turn is in a
Closed State."*), and only a [Reaction] card can be played there, 813.1.c.1: *"This can be played
during Closed States on any player's turn."* Hidden Blade gains it from facedown. Of the four, it is
the only one that kills her before either sweep resolves. Left out of the four: the cards whose kill
is capped by Might, `VEN-154 Public Execution` (only an enemy with less Might than a friendly
unit), the ones where the victim's controller picks it (`OGN-209 Cull the Weak`, `OGN-237
King's Edict`, `VEN-090 Cataclysmic Duel`), `OGN-221 Imperial Decree` (only units that take damage) and
`UNL-180 The Ruination` (E9 + 3, all units).

## 6. Verdict

**Right about the six and about Level 11 letting her attack the turn she lands; wrong about the
price, and about what the second sweep is worth.** Her 9 and one sweep would have killed the
seven-body garrison anyway. The second sweep ended the combat before the damage step, so she lived
and conquered: 5 to 3 instead of 4 to 3 with no Anivia. Going first on basic runes, T5 is the first
turn of the equipped attack with or without Level 11. Level 11 kept her off the board through their
T4. It rests on four Hunt bodies holding A, and a Sergeant kept in their base on T2 kills two of them
on their T3 for no card. Hidden Blade, hidden at B for one rune, kills her with both sweeps on the
chain, and neither sweep then has anywhere to land.

## 7. Not verified

Your rune deck is six Calm and six Body. Svellsongur on T2 needs a Calm among the first four runes,
which fails in **15 of 495 deals, 3.03%**. On T5 the Equip and Anivia need one Calm and two Body among
the nine runes on the board. Those are the first ten channelled less the T2 Calm, which 416.1 put at
the bottom. Ten of twelve at six and six hold at least four of each, so this holds in every deal.
Their walk costs Energy only. Hidden Blade's [A] is any domain. Salvage needs one Order and Vengeance
two among the nine runes of their T4, which at six and six holds in every deal.

The dead-source reading in §5 joins 359.3.f.2 (an ability's "here" is read on execution) to the
example under 359.3.e.12, which is written for spells. If a sweep instead read her last location, it
would kill their seven and leave B uncontrolled. She would still be dead, and you would have drawn 2.

I did not walk Calm answers to the facedown card, attacking with Yi first to draw it out, the combat
showdown after the sweeps (where an [Action] removal could still kill her), Energy from cards
(`UNL-093 Dragonsoul Sage`), Gardens of Becoming as your battlefield, going second, the mulligan, or
2v2. The probabilities in §4 and §5 count only the cards named, in hand by the turn named.

## Leads

- The notable "9 Energy and 2 Power all in (Anivia 7+2, Svellsongur 3+1, plus its [Equip] of 1 Energy
  + 1 Calm)" adds its own parts wrong: they make **11 Energy and 4 Power**, two Body and two Calm.
  Going first on basic runes, Svellsongur's Calm is a recycled rune, and T5 is the first turn on which
  Anivia can be equipped and attack.
- The payoff note ("doubling it is worth exactly twice as much") and the first notable price the
  second sweep in kills. In the walk it killed nothing that the first sweep and her 9 did not. What it
  bought was the damage step (465.1): no defender was left to hit her, so she lived and conquered. With
  one sweep she dies whenever the defenders with 4 or more Might total at least her Might (9 at Level
  6, 8 below it).
- The easy prerequisite and the notable "SHE ENTERS EXHAUSTED UNLESS THE LEGEND IS LEVELLED" read Level
  11 as what makes the attack possible. Landed on T4 without it, she attacks on T5, the same turn as the
  Level 11 line. What Level 11 buys is that she is never on the board during their turn: no window
  for `OGN-229 Vengeance`, and no warning before they place their T4 plays. It needs four Hunt bodies
  holding A by T5. A body kept in base on their T2 that trades into them on their T3 delays it to T6.
- No notable names an answer. `OGN-213 Hidden Blade`, hidden at the battlefield she attacks, kills her
  in response to her attack triggers for one rune. The triggers read "here" on execution (359.3.f.2),
  so neither sweep lands. Svellsongur sits in base from the turn it is played, and `OGN-224 Salvage`
  (E2 + 1 Order) takes the second sweep away.
