# Play — the save draws its card, and the runes held for it cost the battlefield

Issue #321 (a slice of #200), 2026-10-13. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `spirit-wheel-tactical-retreat-reaction-draw`**, the Chaos/Order ENGINE in which
`UNL-175 Tactical Retreat`, played on the opponent's turn, chooses a friendly unit that is about to
die, and `SFD-144 Spirit Wheel` draws a card for the choice. The entry is right about the rules: the
spell is legal in the opponent's Closed State, the Wheel's trigger goes on the Chain above it and
draws first, and the unit comes home healed and exhausted instead of dying. Walked as a game, the
save works on T3: their Hextech Ray kills nothing and you draw. But the three runes held for it on
T3 are half your runes, and they were the body that kept A. Seven Might walks into a battlefield of
five and takes it. The recall itself cost nothing, because a dead unit leaves the battlefield too.
The holding cost the point.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-13 at `b10d9a2`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 51 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 51 (a hit on *before*), second in the list. The other entry of this slice is rank 50,
played in
[Repulse pays for itself, and the next spell kills Jae](2026-10-13-repulse-pays-for-itself-and-the-next-spell-kills-jae.md).
Tactical Retreat aimed at your own Hidden Blade
is played in [the Blade draws what it costs](2026-10-05-the-blade-draws-what-it-costs.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | Chaos/Order (103.1.b), which is one name: `VEN-155 Heart of the Tempest` (also printed as `VEN-197`) |
| **Champion** | `VEN-113 Kennen, Storm of Shuriken` (Chaos, E3 + 1 Power, M4), in the Champion Zone |
| **The draw** | `SFD-144 Spirit Wheel` (Chaos gear, E2), in your base and ready |
| **The save** | `UNL-175 Tactical Retreat` (Order spell, E2), in hand, with three runes ready on their turn |
| **Board it wants** | a friendly unit at a battlefield that an enemy spell is about to kill |

103.1.b.2: *"Your deck’s Domain Identity is dictated by the domains of your Champion Legend."*
`data/cards.json` has two Chaos/Order legend codes, `VEN-155` and `VEN-197`, both named Heart of the
Tempest. Neither the Wheel nor Tactical Retreat is a Signature card.

The card text the play turns on:

- Spirit Wheel (Chaos gear, E2): *"When you choose a friendly unit, you may pay :rb_energy_1: and
  exhaust this to draw 1."*
- Tactical Retreat (Order spell, E2): *"[Reaction] (Play any time, even before spells and abilities
  resolve.) Choose a friendly unit. The next time it would die this turn, heal it, exhaust it, and
  recall it instead. (Send it to base. This isn't a move.)"*
- Heart of the Tempest: *"When you play a card from anywhere other than your hand, empower me.
  [Action][>] Disempower me, :rb_exhaust:: Give a unit [Assault 2] this turn. (+2 :rb_might: while
  it's an attacker.)"*

The legend is idle until T4. Nothing here is played from anywhere but your hand until Kennen comes
out of the Champion Zone, 108.3.d: *"The Chosen Champion can be played from here as normal, following
the rules of Playing a Card."* That play empowers it. Its Assault 2 is not needed that turn.

## 2. Your order: the save on their turn, three runes held from yours

**The spell is legal on their turn.** Their removal spell puts an item on the Chain, and Tactical
Retreat is a [Reaction], 813.1.c.1: *"This can be played during Closed States on any player's
turn."* The runes that pay for it have to be left ready on your own turn. 167: *"Every player's Rune
Pool empties at the start of each player's Main Phase and the end of each player's turn."* A rune
adds Energy at reaction speed, 164.2.a: *"[E]: [Reaction] — Add [1]."* Two runes pay for the spell
and a third pays for the Wheel.

**The Wheel draws first.** Tactical Retreat chooses its unit as it is played, 355.7: *"When a card
Chooses one or more specific Game Objects to affect, it is Targeted unless indicated otherwise by the
rules in this section."* That choice fires the Wheel on their turn, 383.3.c: *"Triggered Abilities can
be put on the Chain during Closed States or Open States on any player's turn."* Its Energy has to be
paid as it goes on, 204.3.a: *"When Costs within Instructions appear as the first part of the effect
in triggered abilities, the cost is taken to be the base cost of the triggered ability. It must be
paid to finalize the triggered ability."* It sits above Tactical Retreat, and 340.1 resolves it
first: *"The newest Finalized Chain Item resolves."* You draw. Then the shield is set, and then their
spell resolves under it.

**The death is replaced at the cleanup.** A damage spell does not kill on its own, 142.4.a: *"Lethal
Damage is the amount of marked Damage that will cause a unit to die in a cleanup."* When the cleanup
would kill the unit, it is healed, exhausted and recalled instead, 455: *"A Recall is when a Permanent
is relocated from anywhere to its Base without it being a Move."* It readies in your next Awakening,
415.3.a: *"A player Readies all non-spell Game Objects they Control during the Awakening Phase on
their turn."* So it can walk back on your next turn.

**What the recall costs, against the death it replaces.** The unit leaves the battlefield. It would
have left it by dying too, and 323.6 reads the same either way: *"Players lose control of any
controlled Battlefields without their Units occupying them if the turn is in an Open State and there
is no Showdown or Combat ongoing there."* The one thing the recall loses that the death would have
given is a Deathknell. 808.1.d.1 says that when the kill is replaced by a recall, *"the triggered
ability will be removed from the chain."* No unit in this walk has one. So the save is a body and a
card for three Energy. Its price is the Energy, which is held back on your own turn.

**The Wheel's cap.** The exhaust in its own cost makes it one draw per turn. It readies only in your
Awakening (415.3.a), so a Wheel used on their T3 is ready again on your T4.

## 3. Their order: removal, then the attack

Fury/Body under `OGN-249 Relentless Storm`. It is idle: *"When you play a [Mighty] unit, you may
exhaust me to channel 1 rune exhausted."* They play nothing with 5 Might. They take B on their T2 and
hold it with one Legion Rearguard. Every attacker after that goes to base; the one body they add to
B is a Determined Sentry on T3. From T2 on they spend every rune on their own turn. On T3 they do what a Fury deck does to a battlefield it cannot take. They burn one
body off it with `OGN-009 Hextech Ray` (Fury, E1 + 1 Power, *"[Action] (Play on your turn or in
showdowns.) Deal 3 to a unit at a battlefield."*), then walk in with what they have.
`OGN-016 Dangerous Duo` (Fury, E3, M3) adds the last two Might: *"[Legion] — When you play me, give a
unit +2 :rb_might: this turn. (Get the effect if you've played another card this turn.)"*

## 4. The turns, going first

Chaos/Order against Fury/Body. Your rune deck is six Chaos and six Order. Your opening four are
Daring Poro, Trusty Ramhound, Spirit Wheel and Tactical Retreat. The draws are Shipyard Skulker,
Vanguard Sergeant and a second Daring Poro, and the Wheel draws a Mystic Poro. Kennen waits in the
Champion Zone. Nothing you play before T4 costs Power.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base.                                 0
their T1        Legion Rearguard (E2) to base, with the 485.7 extra
                rune. One unspent.
T2      4       Poro walks to A, Conquer: +1. Spirit Wheel (E2) to        1
                base. Trusty Ramhound (E2) to A. All four spent.
their T2        Rearguard walks to B, Conquer. Dune Surfer (E3) and
                Pouty Poro (E2) to base. All five spent.
T3      6       Hold A: +1. Shipyard Skulker (E3) to A. Three ready,      2
                held. A stands at eight: Poro 2, Ramhound 3, Skulker 3.
their T3        Hold B. Hextech Ray (E1 + 1 Fury) on the Skulker. You:
                Tactical Retreat on the Skulker (two runes) and the
                Wheel's trigger (the third): draw 1. The Ray deals 3;
                the Skulker is healed, exhausted and recalled. Duo
                (E3, Legion: +2 to the Surfer) and Noxus Hopeful (E2
                with Legion) to base, Determined Sentry (E1) to B. The
                Surfer and the Pouty Poro walk into A, seven against
                five. They take A. All seven spent.
T4      8       The Skulker walks to A and kills the Pouty Poro,          3
                Conquer: +1. Kennen (E3 + 1 Chaos) from the Champion
                Zone and Vanguard Sergeant (E4) to A. One ready.
```

Their points: 1 on T2, and on T3 the Hold of B and the Conquer of A make 3. After your T4 it is 3 to 3.

The save, on their T3. The Chain holds the Ray, Tactical Retreat on top of it, and the Wheel's
trigger on top of that. The trigger resolves first and you draw. Tactical Retreat resolves and sets
the shield. The Ray deals 3 to the Skulker, which is lethal at Might 3. At the cleanup its death is
replaced: healed, exhausted, and sent home. You spent Tactical Retreat and drew a card, so the Ray
cost them a card and cost you none. A now holds the Poro at 2 and the Ramhound at 3: the Ramhound
keeps its +1, *"While you have another unit here, I have +1 :rb_might:."*, because the Poro is
still there.

The attack, on their T3. The Ray cost them one rune, exhausted and then recycled for its Power, which
left six ready. The Duo, the Hopeful and a Determined Sentry (Body, E1, to B) take all six. The
Surfer, at 5 with the Duo's +2, and the Pouty Poro at 2 walk in from base. Damage is dealt when the
showdown closes, 465.2: *"When the Showdown closes, Attackers and Defenders resolve Combat Damage at
the Battlefield that was attacked, using their current Might."* Their seven kill the Poro and the
Ramhound. Your five go to the Surfer, which needs all five; the alternative is the Pouty Poro and
three on the Surfer, which kills only the Pouty Poro. You have no rune ready to change it. The Pouty
Poro is the only unit left, 466.3.a: *"A Player has won a combat if they received either the attacker
or defender designation and are the only Player that has units remaining at this battlefield during
this step."* And 466.5.d makes it a Conquer: *"Establishing Control results in a Conquer if that
player has not yet scored this Battlefield this turn."*

Your T4. The saved Skulker is ready again (415.3.a). It takes A back from the Pouty Poro, 3 against 2,
and survives with 2 damage that the combat cleanup heals. Kennen and the Sergeant go to A, which you
control again (355.2.a).

**What the line bought.** Play the same T3 without holding anything: the Skulker and Kennen (E3 + 1
Chaos) to A, all six runes spent, and A stands at twelve. On their T3 the Ray kills the Skulker,
leaving nine. They have seven to attack with, and the Rearguard at B cannot join them: 144.4.b moves
a unit from a battlefield only to its base, and the Rearguard has no Ganking (144.4.c.1). So they do not attack. After their T3
it is 2 to 2. A is yours with three bodies on it, and Tactical Retreat is
still in your hand. Your T4 opens with a Hold: 3 to 2. With the line, after their T3 it is 2 to 3,
A is theirs, and your one body is the Skulker the save sent home. The save kept a three-drop and
drew a card. The three runes it needed were a Kennen, and the Kennen was A.

**How often this T3 happens.** The Wheel has to be in the first six cards, to be played on T2, and
Tactical Retreat in the first seven: 4 + 2 and 4 + 3 cards of 39 (Tournament Rules 601.1.b makes the
Main Deck exactly 40, and 103.2.a.1 sets the Chosen Champion aside). That is **16.9%** of games with
three of each and **2.4%** with the entry's one of each, without a mulligan.

## 5. Breaks to

**The line breaks to an attack, for no extra card.** The save takes the body off the battlefield
just as the death would have. So a battlefield their removal thins is thinned either way, and they
only need Might enough for what is left. On this board that was the Duo's +2, a card they were
playing anyway. The cheapest answer is to have one body's Might more than you. The Wheel's card does
not change that sum.

**What does not break it.** `OGN-169 Gust` (Chaos, E1) in response to the save: *"[Reaction] (Play
any time, even before spells and abilities resolve.) Return a unit at a battlefield with 3
:rb_might: or less to its owner's hand."* It puts your unit in your hand. Tactical Retreat then
finds no target, and neither does their removal, 359.3.e.2: *"A target is illegal as the spell
resolves if it no longer meets the targeting requirements of the spell, or if it has changed Zones to
or from a Non-Board Zone."* The Wheel's card is already drawn. They spent two cards to put your unit
in your hand. `UNL-007 Smite` (Fury, E2 + 1 Power) does not get past it either: *"Deal 3 to a unit at
a battlefield. If it would die this turn, banish it instead."* Both replacements apply to the same
death. 372: *"If more than one Replacement Effect applies to the same event being executed, then the
controller of the object being acted on determines the order the Replacement Effects will apply."*
That is you, so Tactical Retreat applies first. 370.1.a.1's example settles the rest: *"A unit’s
death being replaced by Zhonya’s Hourglass is the same as the kill action that caused that death not
occurring."* No death is left for Smite to banish.

**In combat the save is open to the bounce.** Combat damage is dealt when the showdown closes
(465.2). So the save has to be cast during the showdown, before the damage, and the opponent can
answer it. A Gust on the shielded unit sends it to hand, and the card that comes back is not the one
you chose, 124: *"A Game Object that changes zones to or from a Non-Board Zone becomes a new object
for the purposes of tracking that object."* The entry reaches the same result through 390.5.a:
*"If that Ability affects a Game Object, the Delayed Linked Ability’s window will be as long as that
Game Object is in an appropriate zone."* Gust reaches only a unit of Might 3 or less: the Skulker
here, but not Kennen or the Vanguard Sergeant at 4. On such a unit, for one Energy, Tactical Retreat
becomes a dead card and the Wheel's draw is all it bought. A Fury/Body opponent has no Gust. A Chaos
one does.

## 6. Verdict

**Right, and on T3 the runes held for it cost more than the save returns.** The rules hold on their turn. 813.1.c.1 admits
the spell, the Wheel draws above it (340.1), the death is replaced at the cleanup, and their removal
spell is answered for no card. The play adds three things. The recall costs nothing that the death
would not have cost, apart from a Deathknell (808.1.d.1). Its real price is the three runes held on
your own turn. On T3, with six runes, that is half your runes, and walked it was the body that kept
A: 3 to 3 after your T4 instead of 3 to 2 with A held. And it breaks to an attack: a garrison their
removal thins is thinned either way, and it takes one body's Might more to finish it.

## 7. Not verified

I did not deal the channel order. Nothing you play before T4 costs Power. Kennen's Chaos Power on T4
needs one Chaos among your eight runes, and none of the 924 deals of six Chaos and six Order fail
that. In the comparison line, Kennen on T3 needs one Chaos among the first six, and it fails in 1 of
the 924 deals, the one whose first six are all Order. Their Hextech Ray on T3 needs one Fury among
their first seven, and with six Fury and six Body none of the 792 deals fail. I did not walk the
opponent aiming the Ray at the Ramhound or the Poro, the opponent holding runes through your turn,
the save in a combat on your own turn, a unit with a Deathknell (`UNL-172 LeBlanc, Fragmented` is
one in Order), Kennen's own *"When I conquer, give a spell in your trash [Flow] equal to its cost
this turn."* bringing Tactical Retreat back, T5 on, the mulligan, or 2v2.

## Leads

- The entry's name, *"the recall is the trap, not the save"*, and its notable *"Tactical Retreat
  trades a battlefield's worth of position for a body"*, compare the save to a save that keeps the
  unit where it stands. Against the death it replaces, the recall costs no position: a unit that
  dies leaves the battlefield too, and 323.6 reads the same either way. The only thing the recall
  costs that the death would not is a Deathknell (808.1.d.1).
- The entry's `netPerIteration`, *"-3 Energy"*, is paid out of the turn before, on the turn the
  runes are held. On T3 that is half your runes, and walked it was A (section 4). The cost belongs
  in the prerequisites as a turn, not just an Energy count.
- The entry's last notable files the shield under 390.5 (Delayed Linked) rather than 391. 390.3 names
  Tactical Retreat's own wording: *"Delayed Replacements are Replacement Effects that can be recognized
  by specifying the effect they are replacing at a specific time, or “the [Nth] time” in the
  description of the effect as it resolves."* The reading rests on that *"the [Nth] time"* wording
  alone. Riot's own *"next time"* example, Noxian Guillotine, is filed as a Delayed Trigger (390.2),
  not a Delayed Replacement: *"When the chosen unit takes damage is the specified time, and killing it
  is the condition for a Delayed Triggered Ability."* So it does not support the reading either way.
  The bounce conclusion holds under 390.5, 390.3 or 390.2 alike, by 124.
- Step 2's *"in combat"* needs the timing. The save has to be cast before the showdown closes (465.2),
  so the opponent sees it while the damage is still to come, and a one-Energy Gust ends it on a
  shielded unit of Might 3 or less.
