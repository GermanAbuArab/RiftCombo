# Play — Renata is only a body, and the ready is only a trigger

Issue #235 (a slice of #200), 2026-09-25. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `overt-operation-fae-dragon-industrialist`**, the body/order ENGINE that spends a board
of buffs with `OGN-153 Overt Operation`, turns each spend into a Gold through `SFD-101 Fae Dragon`,
and uses `SFD-171 Renata Glasc, Industrialist` so the Golds enter ready. It scores nothing, so neither
turn clock reads it. Walked turn by turn, the engine first runs on **T5** and banks eight Power by
**T7**, and on that schedule two of its three printed ideas do no work: the ready half of Overt
Operation readies nothing that was exhausted, and Renata's clause makes ready a Gold that is never
spent on the turn it arrives. What she really supplies is the fourth body.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. At 771
entries it reads 262 with the language and **102 in the queue**. Restricted to the six legend pairs
with no play yet, the queue holds 14 entries, all ENGINEs (body/calm 3, body/mind 0, body/order 2,
body/chaos 4, calm/fury 2, mind/chaos 3). In the script's rank (forced-ordering hits, then step
count) the two highest are the body/calm one, played in
[the ambush is the save](2026-09-25-the-ambush-is-the-save.md), and this one, ninth in the whole
queue and the first body/order entry in it.

---

## 1. Needs

| | |
|---|---|
| **Legend** | any Body/Order name — the pool prints five: The Boss, Might of Demacia - Starter, Grand Duelist, Keeper of the Hammer, Matriarch of War |
| **The engine** | `OGN-153 Overt Operation` (Body, E5 + 2 Power, [Action]) and `SFD-101 Fae Dragon` (Body, E7 + 1 Power, M7) |
| **The clause** | `SFD-171 Renata Glasc, Industrialist` (Order, E4 + 1 Power, M4) |
| **The free curve** | 2x `UNL-111 Determined Sentry` (Body, E1, M1) — not in the entry; §2 is built on it |
| **Board** | the contested one: you hold battlefield A, the opponent garrisons B |

Domain identity from `data/cards.json`: Overt Operation, Fae Dragon and the Sentry are Body, Renata
is Order, union `{body, order}` under 103.1.b. None is a Signature card, none appears in
`data/legality.json`, and the Sentry prints no [Unique], so 103.2.b's three copies apply. **Renata is
the only Order card in the list**, which matters in §4.

The card text the play turns on:

- Overt Operation: *"For each friendly unit, you may spend its buff to ready it. Then buff all
  friendly units."*
- Fae Dragon: *"When you play me, buff up to four friendly units. (Give each a +1 :rb_might: buff if
  it doesn't have one.) When you spend a buff, play a Gold gear token exhausted."*
- Renata Glasc, Industrialist: *"Your tokens enter ready."*
- The Gold, defined by 187.5: a domainless gear token whose only ability is a [Reaction] that
  kills it and exhausts it to add one rainbow Power. The exhaust is in its own cost, which is why
  Renata matters at all.

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of the Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); a recycled rune goes to the Rune Deck (161.2.b) and two come back each Channel Phase
(315.3.b). A Gold is a gear on the board, not Power in the Rune Pool, so 167 never empties it: a
Gold made on T5 is still there on T9. `G` = ready Golds at the end of the turn.

```
       R   your Main Phase                                        idle   G   score
T1     2   2x Determined Sentry (E2)                               E0    0     0
T2     4   both Sentries walk to A -> Conquer                      E4    0    +1 = 1
T3     6   Renata (E4 + 1 Order rune)                              E2    0    +1 = 2  (Hold A)
T4     7   Fae Dragon (E7 + 1 Body rune): buffs Dragon, Renata,    E0    0    +1 = 3  (Hold A)
           both Sentries
T5     8   Overt Operation (E5 + 2 Body runes): 4 spends,          E3    4    +1 = 4  (Hold A)
           4 Golds, then all four re-buffed
T6     8   Overt Operation (E5 + 2 Power from Golds): 4 more       E3    6    +1 = 5  (Hold A)
T7    10   Overt Operation (E5 + 2 Power from Golds): 4 more       E5    8    +1 = 6  (Hold A)
T8    12   —                                                       E12   8    +1 = 7  (Hold A)
T9    12   —                                                              8    +1 = 8  WIN
```

355.5.b is why the Dragon counts himself: a permanent's own play trigger chooses when it triggers,
by which time he is on the board. Three copies of Overt Operation (103.2.b) are the whole engine:
twelve spends, twelve Golds, four of them spent on the next two copies' Power.

**The clock does not move.** Eight arrives on **T9**, the contested baseline for holding one
battlefield, against **T5** unopposed for body/order (the Sentry is Energy 1, so
two copies are two bodies on turn 1). The engine produces Power, and the list has nothing that turns
Power into points.

**What it does move is the rune board.** From T6 every Power cost is paid from Golds, so no rune is
recycled and the board climbs two a turn to the cap of twelve (161.2.a) on T8. Before T6 the list
spends four recycles getting there, and that is why T4 opens on seven and T5 on eight.

## 3. The ready half of Overt Operation readies nothing here

Overt Operation reads its spend as the cost of a ready, and on this schedule there is nothing to
ready. It is cast in your Main Phase, and 315.1.b has already readied everything at your Awaken:
*"The Turn Player readies all Game Objects they control that are able to be readied."* The Sentries
cannot walk anywhere useful (a Standard Move is base to battlefield or back, 144.4, and *"I can't
move to base"*), and cast after the Dragon and Renata have walked to B, a ready at B buys only the
walk home. On defence it buys nothing either: neither 464.2.c.3 nor 465.2.b filters by state.

**The spends are what pay.** 702.2.b makes a spend flat (*"Spending a Buff removes a single Buff
counter from a Unit."*), the Dragon triggers on each one, and the second sentence refills every buff
in the same resolution, which is why the second and third copies are as good as the first. The ready
is the text that makes the spend legal to choose; it is not the payoff.

## 4. The order the entry forces, and what the reorder costs on this schedule

The entry's first step is Renata on the board before any Gold arrives; its third is Overt
Operation's two Power paid up front, because the Golds it makes arrive only when it resolves. The
latter is a hard constraint and the play keeps it: T5's Overt Operation pays two Body runes.

**The first costs nothing to break on this schedule.** Without Renata, the four T5 Golds enter
exhausted, and 187.5 puts the exhaust in their own cost, so none of them adds Power on T5. But
nothing in the list wanted Power on T5: the next spell is T6's Overt Operation, and 315.1.b readies
the four Golds at your T6 Awaken, before it is cast. The same holds on T7. Renata's clause pays only
when two copies resolve in the same turn, the second paid from the first's Golds, and that needs ten
Energy in one Main Phase; the only turn with ten runes and a copy left is T7, and by then two of the
three copies are spent.

**So Renata's slot is paying for her body.** Fae Dragon buffs up to four, and the four are the
Dragon, Renata and the two Sentries; each body is one spend and one Gold per Overt Operation. A
third Determined Sentry, at E1, is a fourth body too, and a list built that way is mono-Body: it
runs under any legend with Body in it, and T3's four Energy go idle rather than into Renata.

## 5. Breaks to

**`OGN-229 Vengeance`** — Order, E4 + 2 Power: *"Kill a unit."* It has no location clause, so it
reaches the Fae Dragon at your base, where the list should play him (355.2.a lets you choose the base
or a battlefield you control). With the Dragon gone, a spend makes nothing and the engine stops.

Swept for spells printing *"Kill a unit"*, *"kill an enemy unit"* or dealing 8 or more to a unit, the
pool has ten. Seven name a battlefield or a Might cap and cannot touch a buffed Might-8 Dragon at a
base. Of the three that can, Vengeance is the cheapest; `OGS-022 Final Spark` is E8, and
`VEN-154 Public Execution` needs a friendly unit bigger than him.

For a delay rather than a kill, `UNL-131 Abandon` (Chaos, E2, [Reaction]) counters Overt Operation
and returns it to your hand: 425.1.c, *"Countering does not refund any costs paid to play a card,
activate an ability, or trigger an ability."*, so the five Energy and two Power are gone and the
spends never happen. It costs you a turn and leaves you the card.

## 6. Verdict

**The entry's arithmetic holds: twelve Golds over three turns, eight banked by T7.** Priced as a
game, those eight Power buy nothing in this list, and the clock stays at T9 holding one battlefield.

**Of the three ideas the entry combines, only the refill does work on this schedule.** The ready
readies nothing, because the spell is cast after your Awaken has readied everything; Renata's clause
readies Golds a turn early that are not spent until the next turn; the refill is what makes the
second and third copies as good as the first. Renata herself is worth her slot as the fourth buffed
body, and an Energy-1 Sentry does that job for three Energy less and no Order rune.

**The order that does bite is the entry's third step.** Overt Operation's two Power cannot come from
its own Golds, so the first copy needs two Body runes on T5; every later copy is paid from the one
before it, and from T6 the rune board never shrinks again.

## 7. Not verified

I did not walk the list with a consumer for the Golds. The one catalogue entry that declares it needs
a resource engine is `heimerdinger-renata-remote-score`, which is Mind and outside this identity. I
assumed the runes arrive in the domains the costs want (one Order and three Body recycles by T5), and
108.5.d makes the order of the Rune Deck secret. And I did not price the opponent's answers to the
Might-1 Sentries before the Dragon's buff lands on T4.

## Leads

- The entry has no field saying Renata's clause pays only when two copies share a turn. A notable
  stating that on a one-copy-a-turn schedule the Golds are readied by the next Awaken anyway, and
  that Renata earns her slot as the fourth body, would carry §4.
- `SFD-115 Trinity Force`'s [Equip] costs one Body rune, and 135.2.e.5.b lets a Gold's rainbow pay a
  Power cost of any domain. Pointing the banked Golds at Trinity Force attaches is the obvious
  consumer this identity lacks; it is not walked here.
