# Play — the second Sergeant walks the turn it lands, and B changes hands twice

Issue #315 (a slice of #200), 2026-10-07. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `overt-operation-fiora-double-untap`**, the Body/Order ENGINE in which `OGN-153 Overt
Operation` readies every buffed friend by spending its buff, then buffs every friend, and
`SFD-180 Fiora, Worthy` readies each 4-Might body the buff makes Mighty. The entry is right about the
rules: 702.3.a makes the two halves disjoint, and the 4 to 5 is 709's crossing. Walked as a game, the
order in the entry's steps buys nothing in a duel. It attacks first and casts the spell after, and a
body readied at a battlefield can only walk home. The order that buys something is the reverse: the
spell first, on a body played that turn, which then walks. In the walk that is T5. The second Vanguard
Sergeant walks the turn it lands, the team's +1 makes the attack ten against nine, and B is yours a turn
early. On their T5 they take it back. Net, one point, and three of their bodies for one of yours. What
breaks it is `OGN-095 Stupefy`, one rune, on the fresh Sergeant.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-07 at `209c142`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 57 of them with no play**,
unchanged from the issue. The pick is by global rank, skipping entries that already have a play: this
entry is rank 45 (a hit on *first*), second in the list. The other entry of this slice is rank 44,
played in
[the garrison goes home on turn six, and four bodies come back](2026-10-07-the-garrison-goes-home-on-turn-six-and-four-bodies-come-back.md).
Overt Operation's other catalogued line, with Mystic Vortex, is played in
[the Vortex taxes whoever answers, and Focus changes hands](2026-10-07-the-vortex-taxes-whoever-answers-and-focus-changes-hands.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-205 Grand Duelist` (Body/Order), the Fiora legend, so Fiora can be the Chosen Champion |
| **Champion** | `SFD-180 Fiora, Worthy` as the Chosen Champion, on the board before the spell |
| **The spell** | 3x Overt Operation, and five runes with two Body among them |
| **The bodies** | 4-Might bodies with no buff: here three Vanguard Sergeant and three Mageseeker Investigator |

The card text the play turns on:

- Overt Operation (Body, E5 + 2 Power): *"[Action] (Play on your turn or in showdowns.) For each friendly
  unit, you may spend its buff to ready it. Then buff all friendly units. (Each one that doesn't have a
  buff gets a +1 :rb_might: buff.)"*
- Fiora, Worthy (Order, E3, M3): *"When a unit you control becomes [Mighty], you may pay :rb_rune_order: to
  ready it. (A unit is Mighty while it has 5+ :rb_might:.)"*
- Grand Duelist: *"When one of your units becomes [Mighty], you may exhaust me to channel 1 rune
  exhausted. (A unit is Mighty while it has 5+ :rb_might:.)"*
- Vanguard Sergeant (Order, E4, M4): no text.
- Stupefy (theirs, Mind, E1): *"[Reaction] (Play any time, even before spells and abilities resolve.)
  Give a unit -1 :rb_might: this turn, to a minimum of 1 :rb_might:. Draw 1."*

## 2. Your order: the body, the spell, the walk

**Fiora is always there.** 103.2.a.2: *"Must be a champion unit with a champion tag that matches the tag
on your Champion Legend."* Fiora, Worthy carries the Fiora tag, and so does Grand Duelist. 108.3.d: *"The
Chosen Champion can be played from here as normal, following the rules of Playing a Card."* The entry's
one copy of Fiora is never a draw.

**The two halves never ready the same body.** Half one readies only bodies that have a buff, and spends
it. Half two then buffs everything, and 702.3.a skips any body that still has one: *"If a Buff is added,
or instructed to be added, on a Unit that already has a Buff, it is not placed instead."* 703 makes the
buff +1, and 709 is the crossing: a unit becomes Mighty *"at the moment its Might changes from being
less than 5 to being 5 or greater."* So a body at exactly 4 goes to 5 and Fiora's trigger asks for the
Order rune. 204.3.a: *"It must be paid to finalize the triggered ability."* Grand Duelist triggers on the
same crossing and exhausts to pay, so it channels once a turn whatever the number of crossings. 414.1.b:
*"A Game Object that is already Exhausted cannot be Exhausted again."*

**What a ready body can do is move.** 144.2: *"Exhausting the Unit is the Cost for this action."* The
entry's steps attack first and cast the spell after. The attackers are then at a battlefield, and from a
battlefield the Standard Move goes one way, 144.4.b: *"Units may move from a Battlefield to their
Base."* With no [Ganking], standing them up buys a walk home, and a walk home gives the battlefield up
at the next cleanup (323.6). A body in base at the start of your turn is ready already. So the only body
the ready does anything for is one played this turn, 143.4: *"Units enter the Board exhausted."* Play
it, cast the spell, and it walks with the rest.

**Half one does nothing on the first cast.** Nothing has a buff until half two gives one. In the walk
half one readies no one.

## 3. Their order: B, and bodies in base

Mind/Chaos with `SFD-199 Prodigal Explorer`, idle in the walk. They take B on their T2 and stack it to
nine by their T3: Mystic Poro, Shipyard Skulker and Ember Monk, none with a buff. The new bodies after
that go to base, where they reach either battlefield, 144.4.a: *"Units may move from their Base to a
Battlefield."* On their T4 they keep two runes open.

## 4. The turns, going first

Body/Order against Mind/Chaos. Your rune deck is six Body and six Order. Your opening four are Daring
Poro, Trusty Ramhound, Vanguard Sergeant and Overt Operation. The draws are Unsung Hero, a second Trusty
Ramhound, Mageseeker Investigator, Riposte, and on T5 the second Vanguard Sergeant. You pay no Power
before T5.

```
turn    runes   your turn                                                 points
T1      2       Daring Poro (E2) to base.                                 0
their T1        Mystic Poro (E2) to base. One idle.
T2      4       Poro walks to A, Conquer: +1. Fiora, Worthy (E3) from     1
                the Champion Zone to A. One idle.
their T2        Mystic Poro walks to B, Conquer. Shipyard Skulker (E3)
                to B. Second Mystic Poro (E2) to base. All five spent.
T3      6       Hold A: +1. Vanguard Sergeant (E4) to base. Trusty        2
                Ramhound (E2) to A. All six spent.
their T3        Hold B. Ember Monk (E4) to B: B is at nine. Second
                Shipyard Skulker (E3) to base. All seven spent.
T4      8       Hold A: +1. The Sergeant alone is four against nine.      3
                Mageseeker Investigator (E4), Unsung Hero (E2) and the
                second Ramhound (E2) to A. All eight spent.
their T4        Hold B. Second Ember Monk (E4) and third Shipyard
                Skulker (E3) to base. Two idle.
T5      10      Hold A: +1. Second Sergeant (E4) to base. Overt           5
                Operation (E5 + 2 Body): nine tapped, two Body
                recycled. Half one readies no one. Half two buffs
                every unit, and three cross to 5: both Sergeants and
                the Mageseeker. Grand Duelist exhausts and channels a
                rune exhausted. Fiora: one Order recycled, the second
                Sergeant readied. Both Sergeants walk to B, ten
                against nine. All three defenders die, one Sergeant
                dies. Conquer: +1. Eight runes left, one idle.
their T5        No Hold. The second Mystic Poro, the second and third
                Skulker and the second Ember Monk walk into B: twelve
                against the Sergeant's five. The Sergeant dies and
                takes a Skulker and the Poro with it. Conquer.
```

Their points: 1 on T2, 2 on T3, 3 on T4, 4 on T5. After their T5 it is 5 to 4.

The T5 fight. The attacker assigns first, 465.2.c: *"Starting with the Attacker, each player assigns an
amount of damage equal to their summed Might among the other's Units."* And 465.2.c.3: *"Units must
have lethal damage assigned to them in full before damage is assigned to a different Unit."* Your ten
kill the Poro (2), the Skulker (3) and the Ember Monk (4), with one to spare. Their nine put five on one
Sergeant and four on the other, which lives at 5. B is yours, and it is a Conquer. The Sergeant heals at
the end of the turn and holds B at five.

Their T5 fight. Their twelve kill the Sergeant. Its five kill a Skulker (3) and the Poro (2). They win, and
466.5.d makes it a Conquer: *"Establishing Control results in a Conquer if that player has not yet scored
this Battlefield this turn."* Every body they had in base went to B, so A, at 23 defending with the
buffs, is never attacked.

**What the line bought.** On their T5 the opponent scores B either way: a Conquer instead of a Hold. So
the point is yours alone, 5 to 4 where the same turns without the spell give 4 to 4. Without it the
second Sergeant waits in base, and the first is four against nine. The trade was three bodies for a
Sergeant on T5, and two more for the other on their T5. The six bodies at A keep their buffs, +1 each
for as long as nobody spends them. The price is runes. T5 recycled three and Grand Duelist channelled
one back, so T6 has ten runes, not twelve.

**How often this T5 happens.** Fiora is in the Champion Zone in every game. The Operation is in the
first nine cards (the opening four, then the T1 to T5 draws) in **55.6%** of games with three copies,
and in **23.1%** with the entry's one. With two of the six 4-Might bodies as well it is **21.4%**,
without a mulligan.

## 5. Breaks to

**The line breaks to `OGN-095 Stupefy`** (Mind, E1: one rune, nothing recycled), held from their T4 and
cast in response to Overt Operation, on the second Sergeant. It goes to 3, and the buff takes it to 4,
so it never crosses. 709 counts only *"the moment its Might changes from being less than 5 to being 5 or
greater"*. Fiora does not trigger, and the Sergeant stays exhausted in base. The first Sergeant crosses,
but it is five against nine, and it does not attack. They drew a card. You spent nine runes, two of them
recycled, and kept the buffs and Grand Duelist's rune. The attack waits a turn, and B gets a turn to grow.

`OGN-169 Gust` (Chaos, E1) is the same price on Fiora, while she stands at a battlefield at three: *"Return
a unit at a battlefield with 3 :rb_might: or less to its owner's hand."* She goes to your hand, not back
to the Champion Zone, 108.3.c: *"The Chosen Champion cannot be returned to this zone by normal means."*

The reply is `SFD-206 Riposte` (Body/Order, E2 + 2 Power: two runes, both recycled), which you hold. It
is a Signature card tagged Fiora, legal under Grand Duelist. Cast on Stupefy, choosing the second
Sergeant, it counters it and gives the Sergeant +1, Stupefy's Energy cost, so the Sergeant crosses on
Riposte and Fiora readies it. On T5 it needs two runes and one is idle. Holding it means the line on T6.

## 6. Verdict

**Right, and in a duel the untap is worth one thing: the body you played this turn walks.** The rules
reading is right. The halves are disjoint by 702.3.a, the 4 to 5 is 709's crossing, and Fiora readies
it. The play adds three things. The entry's order, attack then spell, stands the team up at a battlefield
that 144.4.b only lets them leave. The spell first, on a fresh body, is the order that takes B a turn
early, and in the walk that turn was T5. Half one readied no one, because nothing had a buff before
half two. And the cheapest answer is not the removal on Fiora the entry names. It is one Energy on the
fresh body, which stops the crossing and leaves Fiora alone.

## 7. Not verified

I did not deal the channel order. No Power is paid before T5, and on T5 ten of the twelve runes are on
the board, so at least four are Body and four are Order: the two Body and Fiora's Order fail in none of
the 924 deals. They pay no Power. I did not walk a second Overt Operation, where every body has a buff
and half one readies them all, Gust on Fiora, Riposte on T6, T6 on, the mulligan, or 2v2.

## Leads

- The entry's steps say *"Spend your units' exhausts as normal — move them, attack, pay exhaust
  abilities."* and then cast the spell. In a duel the attackers are at a battlefield, and 144.4.b sends
  them only home. The order that buys a turn is the spell first, on a body played that turn.
- The net per iteration, *"every buffed friend readied by the spell"*, is empty on the first cast:
  nothing has a buff until half two gives one.
- Fiora as the Chosen Champion under `SFD-205 Grand Duelist` makes the entry's one copy certain
  (103.2.a.2, 108.3.d), and the legend channels a rune on the first crossing each turn.
- The entry names removal on Fiora as the risk. The cheaper answer is `OGN-095 Stupefy`, one Energy, on
  the fresh 4-Might body before the spell resolves, so it never crosses (709).
