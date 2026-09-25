# Play — the ambush is the save, if it goes in first

Issue #235 (a slice of #200), 2026-09-25. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `vilemaw-counter-strike-ambush-undo-is-free`**, the body/calm ENGINE that holds
`UNL-060 Vilemaw` for an [Ambush] into the opponent's attack and keeps `SFD-194 Counter Strike`
beside him to keep the Ambush legal. Nothing in it scores, so neither turn clock reads it; the only
number this line has is the turn on which it is first affordable, and walked turn by turn that is
**the opponent's T4**. The entry prices the Ambush as a free gamble with a failure window between
choosing Vilemaw's location and checking its legality. Walked, I found no event that fires in that
window on the board the line is for. The window that matters is earlier, and Vilemaw closes it
himself if he is played in response to the removal rather than after it.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. At 771
entries it reads 262 with the language and **102 in the queue**. Restricted to the six legend pairs
with no play yet (body/calm, body/mind, body/order, body/chaos, calm/fury, mind/chaos), the queue
holds 14 entries, all ENGINEs: body/calm 3, body/mind 0, body/order 2, body/chaos 4, calm/fury 2,
mind/chaos 3. The script ranks by forced-ordering hits, then by step count; this entry is the
highest-ranked of the fourteen (two kinds of ordering word, *first* and *before*, over ten steps),
fifth in the whole queue. The body/order one after it is played in
[Renata is only a body](2026-09-25-renata-is-only-a-body.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | `SFD-193 Grandmaster at Arms` (Calm/Body). Counter Strike is a Signature card tagged Jax, and 103.2.d.2 makes this the only legend name that can run it |
| **The wall** | `UNL-060 Vilemaw` (Calm, E8 + 2 Power, M8, [Ambush]) |
| **The save** | `SFD-194 Counter Strike` (Calm/Body, E2 + 1 Power, [Reaction]) |
| **The free curve** | 2x `UNL-111 Determined Sentry` (Body, E1, M1) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: you hold battlefield A, the opponent garrisons B and attacks A |

Domain identity from `data/cards.json`: Vilemaw is Calm, Counter Strike Calm/Body, the Sentry Body,
union `{body, calm}` under 103.1.b. Counter Strike is the only Signature card; none of the three
appears in `data/legality.json`, and the Sentry prints no [Unique], so 103.2.b's three copies apply.

The card text the play turns on:

- Vilemaw: *"[Ambush] (You may play me as a [Reaction] to a battlefield where you have units.)
  Enemy units here with less Might than me don't deal combat damage. When I hold, draw 1."*
- Counter Strike: *"Choose a unit. The next time that unit would be dealt damage this turn,
  prevent it. Draw 1."*
- Determined Sentry: *"I can't move to base."* A body that never leaves the battlefield it took.

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); the recycled rune goes to the Rune Deck (161.2.b) and two come back each Channel Phase
(315.3.b). A rune you do not exhaust on your turn is still ready on the opponent's: 167 empties the
Rune Pool, not the board. **This line spends its runes on the opponent's turn, so the column that
matters is the right-hand one.**

```
       R   your Main Phase                         spent   ready on their turn            score
T1     2   2x Determined Sentry (E2)                E2     0                                0
T2     4   both Sentries walk to A -> Conquer       E0     4: Counter Strike (2 runes)     +1 = 1
T3     6   —                                        E0     6: Counter Strike               +1 = 2  (Hold A)
T4     8   —                                        E0     8: Vilemaw (E8 + 2 Calm)        +1 = 3  (Hold A)
T5     8   —                                        E0     8: Vilemaw                      +1 = 4  (Hold A)
T6    10   —                                        E0    10: Vilemaw AND Counter Strike   +1 = 5  (Hold A)
```

T5 opens on eight rather than ten because the T4 Ambush recycled two runes for its Calm Power. If
the opponent did not attack on their T4, nothing was spent and T5 opens on ten.

**The clock is the contested one and this line does not move it.** Holding A alone pays one point a
turn from T2, which is eight on **T9**; the unopposed baseline for body/calm is **T5**, because the
Sentry is Energy 1 and two copies of it are two bodies on turn 1. Vilemaw does not score; what he
buys is that T9 is still T9 after the opponent attacks A, and a draw every Hold he survives.

**The mana is written down, not hidden: from T2 this deck casts nothing on its own turn.** Every
rune is held for the opponent's. That is the price of a Reaction-speed wall, and the idle Energy on
your own Main Phases is exactly that price.

**The two cards divide the game between them.** Vilemaw is unaffordable before eight runes, which is
the opponent's T4. On their T2 and T3 the only thing guarding the free curve is Counter Strike, at
two runes (two exhausted for the Energy, one of them recycled for the Power), and 437.4 is what makes it a save: *"Damage dealt to a Unit that has that all of that
damage Prevented is not considered to have been dealt to it at all."* (the doubled wording is
Riot's). From T4 the roles reverse, as §3 shows.

## 3. The order the entry forces, and the order that actually matters

The entry's failure window is the gap between step 1 of playing Vilemaw, where his location is
chosen, and step 5, where 813.4.b checks it: *"If the chain item does not fulfill the conditions by
the time step 5: check legality has been reached, the actions taken while playing it are undone and
it is returned to the zone it was played from if it is a card."* 822.1.b grants the [Reaction] only
while you control units at that battlefield, so if your last body there dies inside the gap, the
play unwinds and refunds itself. The entry's step 7 answers that with Counter Strike *"inside that
Task"*.

**Walked on the board the line is for, nothing reaches that gap.** The combat damage that would kill
your garrison belongs to 465.2: *"When the Showdown closes, Attackers and Defenders resolve Combat
Damage at the Battlefield that was attacked, using their current Might."* A Showdown ends only when
every player passes in sequence (347.2.a), which cannot happen with Vilemaw still on the chain. So
by the time any combat damage is dealt, Vilemaw has already resolved and his static is on. The Task
that 354.4 does interpose is the Cleanup that closing the state makes outstanding (354.1, 319.1),
and nobody can act inside it — 320.1: *"New Pending Items can be added, but Finalized Items cannot
be executed and Priority and Focus are not passed or awarded."* Counter Strike cannot be played there
either. A body that dies in that Cleanup is one already carrying lethal damage, and that death would
have been processed by the Cleanup that followed the damage, before you had priority to play
Vilemaw at all.

**The window that matters is earlier: the opponent's removal, cast at your garrison before they
attack.** On their T4, against two Might-1 Sentries at A, `OGN-133 Flurry of Blades` (Body, E1,
[Reaction]) reads *"Deal 1 to all units at battlefields."* Two orderings, eight runes:

- **Vilemaw AFTER the Flurry resolves.** Both Sentries are dead, you control no units at A, and
  822.1.b grants nothing. Vilemaw cannot be played there at all, and the opponent walks into A for a
  Conquer. Counter Strike on one Sentry instead spends two of the eight runes and leaves six, which
  is not a Vilemaw. The line is gone for the turn and the Hold with it.
- **Vilemaw IN RESPONSE to the Flurry.** The Flurry on the chain is a Closed State, and a [Reaction]
  card *"can be played during Closed States on any player's turn"* (813.1.c.1). Your Sentries are
  still standing, so the location is legal at step 1 and still legal at step 5. 340.1 resolves the
  newest item first: *"The newest Finalized Chain Item resolves."* Vilemaw lands at A, then the
  Flurry resolves and kills the two Sentries, and an M8 garrison is left holding A. When they attack,
  every attacker under Might 8 deals no combat damage.

**The ambush is the save.** Played in response to the removal it is aimed at, Vilemaw is his own
answer to the one thing that makes him unplayable, and Counter Strike is not needed at all. Played
one action late, he is a card in hand with nowhere to go. The reorder costs the whole line, not a
bonus, and the entry's own steps play Vilemaw only once the attack has begun, with no step for
removal cast before it.

Counter Strike's role in this list is therefore the turns before Vilemaw is affordable, and one
job after: keeping Vilemaw himself alive against DAMAGE aimed at him once he stands at A.

## 4. Breaks to

**`OGN-213 Hidden Blade`** — Order, E2 + 1 Power, [Action]: *"Kill a unit at a battlefield. Its
controller draws 2."* Cast inside the combat Showdown after Vilemaw has landed, it kills him before
465.2's damage step, his static is gone, and the attack goes through against a garrison of
Might-1 bodies. Counter Strike is no answer: it prevents damage, and this is a kill instruction. You
draw the two cards, which is the whole consolation.

Swept for spells printing *"Kill a unit"*, *"kill an enemy unit"* or dealing 8 or more to a unit, the
pool has ten; the eight that reach a Might-8 unit at a battlefield are Hidden Blade (E2 + 1),
`VEN-154 Public Execution` (E2 + 1, but it needs a friendly unit bigger than Vilemaw), `UNL-186 Death
from Below` (E4 + 1), `OGN-229 Vengeance` (E4 + 2), `SFD-164 Drag Under` (E5 + 1), `OGS-012 Blast of
Power` (E6 + 1), `OGN-123 Unchecked Power` (E7 + 2) and `OGS-022 Final Spark` (E8). `SFD-162 Blood
Money` and `UNL-159 Soul Harvest` are capped at Might 2 and 3. Hidden Blade is the cheapest that
beats the line with no condition.

Before their T4 the free curve is the target, and one Flurry against the two Sentries is met by one
Counter Strike: one Sentry lives, A stays yours. Two removal spells on T2 or T3 break it; one does not.

## 5. Verdict

**The entry is right that the Ambush is free when it fails, and wrong about when it fails.** 813.4.b
refunds a failed Ambush in full, but on the board this line is built for I could not construct the
failure it names: the combat damage comes after Vilemaw resolves, and nobody has priority in the
Cleanup that sits between. The failure that does happen costs nothing because the card is never
played at all.

**What the line needs is an order, and the entry states the wrong one.** Vilemaw goes in response to
the removal, never after it; played in response, he survives the removal his garrison does not, and
he is the reason Counter Strike is only needed on the two turns before he is affordable.

**Priced as a game, it does not move the clock.** Body/calm reaches eight on T5 unopposed and T9
holding one battlefield; this deck is the second, and everything it spends from T2 on is spent on
the opponent's turn to keep T9 from slipping. It is a defence of the free curve, not a finisher, and
its cost is every one of your own Main Phases.

## 6. Not verified

I did not sweep the pool for a card that kills a body inside a Cleanup without prior damage, which is
the one event that could still reach the entry's window. §3's claim is about the combat board and the
removal I checked. I also assumed the runes arrive in the domains the costs want: Vilemaw needs two
Calm recycles, and 108.5.d makes the order of runes in the Rune Deck secret.

## Leads

- The entry's steps play Vilemaw first and Counter Strike inside the interposed Task. A notable
  stating that Vilemaw goes in response to removal aimed at the garrison, where 340.1 lands him
  before it resolves, would carry §3; the step 7 window may be one no card reaches.
- The entry prices both cards against the combat. A notable saying Counter Strike's main job is the
  opponent's T2 and T3, before eight runes exist, would say what the Signature slots buy.
