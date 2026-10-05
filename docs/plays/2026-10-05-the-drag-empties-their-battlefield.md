# Play — the drag empties their battlefield, and that is worth more than the five damage

Issue #246 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `teemo-strategist-swift-scout-hidden-flood`**, the mind/chaos ENGINE that flips
`UNL-141 Evelynn, Entrancing` from face down on your own turn to drag an enemy body onto the
battlefield where `OGN-121 Teemo, Strategist` stands, so the opponent becomes the Attacker and
Teemo's Defend trigger reveals five cards and deals one per [Hidden] card among them. Nothing in it
scores, so neither turn clock reads it. Walked as a game, the trigger is the smaller half of what
the flip does. The body Evelynn drags has to come from somewhere, and if it was the opponent's only
body on their battlefield, that battlefield is open the moment the chain resolves. The entry prices
the damage and never mentions the battlefield.

**Why this line.** `scripts/sequence-pick.mjs` measures a queue: entries whose `steps` carry
forced-ordering language and whose `terminatesIn` is a bare quantity with no ordering word. Re-run
on 2026-10-05 at 771 entries it reads 262 with the language and **102 in the queue**, the same
numbers as at slices 3 and 4. `--pair mind/chaos` returns **3**, all tied at one hit; this entry is
first in the script's own order (one hit on *first*, six steps). The second taken in this slice is
played in [the wall stands only where the sweep reaches](2026-10-05-the-wall-stands-only-where-the-sweep-reaches.md);
the third, `moonlight-affliction-wind-and-ghosts-banish`, is left in the queue.

---

## 1. Needs

| | |
|---|---|
| **Legend** | `OGN-263 Swift Scout` (Mind/Chaos), the pool's only Teemo legend |
| **The Champion** | `OGN-121 Teemo, Strategist` (Mind, E2 + 1 Power, M2) as the Chosen Champion, two more in the deck |
| **The forcer** | 3x `UNL-141 Evelynn, Entrancing` (Chaos, E2, M2, [Hidden], [Backline]) |
| **The density** | the entry's [Hidden] list, H = 23 of the 39 shuffled cards |
| **A second body** | `OGN-171 Mystic Poro` (Chaos, E2, M2) — not in the entry; §2 is built on it |
| **Board it wants** | the contested one: you hold battlefield A, the opponent holds B with one body |

Domain identity from `data/cards.json`: Teemo is Mind, Evelynn and the Poro are Chaos, union
`{chaos, mind}` under 103.1.b. None of them is a Signature card and none appears in
`data/legality.json`.

The card text the play turns on:

- Teemo, Strategist: *"When I defend, choose an enemy unit here and reveal the top 5 cards of your
  Main Deck. Deal 1 to that unit for each card with [Hidden] revealed this way, then recycle the
  revealed cards."*
- Evelynn, Entrancing: *"When you play me from face down on your turn, you may move an enemy unit at
  a different location to my battlefield."*
- Swift Scout: *"You may pay :rb_energy_1: to hide a card with [Hidden] instead of
  :rb_rune_rainbow:."*

## 2. The turns, going first — 485.7 gives the extra rune to the player going second

`R` = runes on the board at the start of your Main Phase. A rune pays 1 Energy by exhausting
(164.2.a) and 1 Power by recycling (164.2.b, whose cost is the recycle, so an exhausted rune still
pays); the recycled rune goes to the Rune Deck (161.2.b) and two come back each Channel Phase
(315.3.b).

```
       R   your Main Phase                                         spent    you
T1     2   Teemo, Strategist from the Champion Zone (108.3.d)       E2+1P     0
T2     3   Teemo walks to empty A -> Conquer; hide Evelynn at A    E3        1
           (Swift Scout, 1 Energy); Mystic Poro at base
  their T2: one body walks into B and Conquers it
T3     5   Hold A. Flip Evelynn (0): drag their B body to A.       E1        3
           Combat at A; then the Poro walks into open B -> Conquer;
           hide Evelynn #2 at A
T4     7   Hold A, Hold B                                                    5
T5     9   Hold A, Hold B                                                    7
T6         Hold A, Hold B                                                    9
```

T2 opens on three because T1 recycled a rune for Teemo's Mind Power. Every Energy not listed sits
idle: none on T2, four on T3.

**The clock this is measured against is the contested one.** Mind/chaos prints no unit at Energy 1
or less, so its unopposed curve reaches eight on **T6**; holding one battlefield alone pays one a
turn and reaches eight on **T9**. Here eight lands on **T6** if B stays yours — level with the board
where nothing was needed, three turns ahead of the board this line is for. Whether B stays yours is
decided by one number: did the dragged body die.

## 3. The order the flip forces

**The flip comes before the next hide, every turn.** 811.1.b hides a card only *"at a battlefield
you control that doesn't already have a facedown card hidden there"*, and Evelynn #1 is that card
until she is played. So the turn reads: flip Evelynn #1, let the combat resolve, then pay Swift
Scout's 1 Energy to hide Evelynn #2 in the slot she left. Hiding is a Discretionary Action (421.2),
so it waits for the Neutral Open State after the combat; the same is true of the Poro's walk, since
144.1.c says the Standard Move *"cannot be performed during a Showdown or Combat."*

**Teemo stands up; Evelynn hides.** Teemo is [Hidden] too, and the same one-facedown clause means
only one of the two can be face down at A. The standard build stands Teemo up, which is what makes
him a Defender when the dragged body arrives.

**The drag is an evacuation first.** Evelynn's trigger resolves, the chain empties, and the Cleanup
runs its tasks in order. Task 4 reaches B before task 7 reaches A: 323.6 — *"Players lose control of
any controlled Battlefields without their Units occupying them if the turn is in an Open State and
there is no Showdown or Combat ongoing there."* — strips their Control of B, and only then does
323.9 stage the Combat at A. B is now unoccupied and uncontrolled, which 170.11.c calls open. After
the combat at A resolves, the Poro walks in from base: a Showdown with nobody to fight (344.2), and
348.2.a gives you B. That Conquer happens **whatever the five reveals turn up**.

**What the reveals decide is whether B stays yours.** If the dragged body survives, 466.1.a.2 —
*"Insert “3d. Recall Attackers present at the Battlefield if Defenders are still present.”"* — sends
it to their base, and on their T3 it walks straight back into B against the Poro. So the five
damage is not a removal bonus; it is the price of keeping the battlefield the drag just took.

The numbers, with the entry's own list (H = 23 of 39, five reveals, so the hits are hypergeometric):

| dragged body's Might | trigger kills it, no losses | it dies by the end of combat |
|---|---|---|
| 2 | 92.0% | always |
| 3 | 67.4% | always |
| 4 | 30.5% | always |
| 5 | 5.8% | 99.2% |
| 6 | never | 92.0% |

The second column holds because Teemo and Evelynn both defend: 465.2.c assigns their summed Might, 4,
on top of whatever the trigger marked. The cost of the second column is the Defenders — the
Attacker's damage goes to Teemo first, because Evelynn carries [Backline], so a body of Might 2 or
more that survives the trigger kills Teemo in the damage step. The entry's *"it is a clean kill on
anything at Might 5 or less"* is true only at the ceiling, which is 5.8% of reveals.

**So drag the body you can afford to fight, from the battlefield you want.** A lone Might-2 or
Might-3 garrison is the best target there is: the trigger usually kills it outright, the combat kills
it otherwise, and its battlefield is open either way.

## 4. Breaks to

**`OGN-169 Gust`** — Chaos, E1, [Reaction]: *"Return a unit at a battlefield with 3 :rb_might: or less
to its owner's hand."* Teemo is Might 2 and stands at A. The opponent is the Attacker and gains Focus
(464.2.c.1, 464.2.d); Teemo's trigger goes on the Combat Chain; they Gust him in response. 359.3.f.2 reads
*"here"* on execution — *"Information referenced in an instruction in this way will be checked on
execution of the instruction."* — and Teemo is in hand, so the trigger has nothing to hit.

That alone costs a card. What it costs the board is worse. Evelynn now defends alone at Might 2. A
dragged body of Might 3 or more kills her and survives, the opponent is the only player with units
left at A (466.3.a), and 466.5 — *"the player with Units remaining here Establishes Control if they
didn’t already control this Battlefield."* — hands them A on your turn. You still take open B with
the Poro. **One Energy turns the drag into a swap of battlefields, and you paid two cards for it.**

The cheaper defence is ordering, not a card: drag a body of Might 2. Evelynn alone still trades with
it, but A does not stay yours. Neither side has units left there, so 466.3.d makes the combat No
Result; Evelynn #2 is not hidden yet, because the hide waits for the combat; and in the next Open
State 323.6 strips your Control of A. **A ends uncontrolled rather than theirs**, B is open too, and
the Poro takes one of them — one Conquer where the line was meant to leave you holding two.

## 5. Verdict

**The engine is real, and its value is in the wrong column of the entry.** The entry prices a Defend
trigger at 2.95 damage on average. Walked, the flip is first an evacuation — 323.6 opens their
battlefield before the combat at yours begins — and the damage is what keeps that battlefield from
walking back next turn.

**Priced as a game it ties the free curve and beats the contested one by three turns**, eight on T6,
because a 0-Energy flip takes the battlefield the opponent spent their T2 conquering.

**And it has a one-Energy answer the entry does not name**: Gust on Teemo with his trigger on the
chain, which turns a body of Might 3 or more into a Conquer of A for them.

## 6. Not verified

I assumed perfect draws by T2 (Evelynn and the Poro in hand, a Mind rune on T1) and that the runes
arrive in the domains the costs want (108.5.d keeps the Rune Deck's order secret). I assumed the
opponent holds B with exactly one body. I did not walk the opponent attacking A on their T2 into
Teemo with Evelynn already hidden, where the [Reaction] flip ambush is the entry's other route, nor a
[Deflect] body as the dragged unit.

## Leads

- The entry never says that the dragged body leaves a battlefield behind. A notable that 323.6
  strips their Control of an emptied battlefield in the same Cleanup that stages the combat, so a
  ready body at your base Conquers it afterwards, would carry §3.
- *"a clean kill on anything at Might 5 or less"* is the ceiling, 5.8% of reveals with H = 23. The
  table in §3 is the honest version, and the combat column is the one that keeps the battlefield.
- The turn order is forced and the steps do not say it: flip Evelynn, let the combat resolve, then
  hide the next one (811.1.b's one-facedown clause), then walk in (144.1.c).
- `OGN-169 Gust` on Teemo in response to his trigger answers the line for one Energy and, against a
  dragged body of Might 3 or more, gives the opponent A (466.3.a, 466.5). Against a Might-2 body
  Evelynn trades, 466.3.d makes it No Result and 323.6 leaves A uncontrolled, so the Poro takes A
  or B and not both.
