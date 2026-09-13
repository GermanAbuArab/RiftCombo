# Play — the defender's chair, and why the attacker's own window is the only one you get

Issue #200, lane rc-synth3, 2026-09-13. Constructed, Duel (485). Rules version 2026-07-16, opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`; card text verbatim from `data/corpus_flat.txt`.

**Subject: `keeper-of-masks-flurry-plaza-window`.** Every play in this folder so far has been written
from the combo player's seat. This one is written from the other chair, against the fastest thing the
catalogue contains: **three lines win on turn three**, and all three are ALT_WIN.

The question from this side is not *"what answers it"* — the catalogue sweeps that. It is **"when do
I ever get to act."**

---

## 1. Four rules decide when a defender may do anything at all

- **312.2.a** — you receive priority in a Neutral Open State *"during their Main Phase"* — **theirs**, not yours. Yours,
  not the opponent's. On their turn, an open state gives you nothing.
- **337.2** — *"If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that
  Adds resources, it resolves immediately—Move to Step 4: Resolve."* The steps where a response
  happens are skipped, so **an opponent playing a body hands you no window whatsoever.**
- **312.2.c and 312.2.d** — in a **Closed State**, priority goes to the controller of the next chain
  item, and then *"they are the next Player in Turn Order, and the player with Priority passes."* So
  your window exists exactly when the opponent puts something on the Chain that is not a unit, a gear
  or an Add — and then has to pass to resolve it.
- **383.2.a.1** — a conditional statement immediately after a trigger's condition *"is part of the
  Trigger Condition and not the Effect"*. `OGN-293 The Grand Plaza` reads *"When you hold here, if you
  have 7+ units here, you win the game"* — and that middle clause is what 383.2.a.1 catches, so the count is taken **as the trigger is placed.**
  Answering the trigger is answering nothing.

Put together, the defender's turn looks like this — and most of it is empty:

| the attacker's turn | is a Chain Item created? | do you get priority? |
|---|---|---|
| Awaken (315.1), Channel (315.3), Draw (315.4) | no | no |
| Beginning Phase (315.2) with no trigger | no | **no** |
| Beginning Phase with a `[Temporary]` death trigger (816.1.b) | **yes** | **yes** — 312.2.c then 312.2.d |
| Main Phase, they play a unit or a gear | no — 337.2 resolves it immediately | **no** |
| Main Phase, they cast a spell or fire a trigger | **yes** | **yes**, when they pass to resolve it |
| Main Phase, Neutral Open State | — | no — 312.2.a is *their* Main Phase |

**Against a deck that only ever plays bodies, a defender has no window on the opponent's turn at
all**, and every answer has to be cast a turn early, on their own.

## 2. Two turn-three Plaza wins, and the chair is completely different for each

**`flurry-of-feathers-grand-plaza-win`** (mono-Calm) is the Plaza plus `UNL-044 Flurry of Feathers` —
*"[Reaction] Choose one — • Counter a spell. • Play four 1 [M] Bird unit tokens with [Deflect]"* — and
three bodies of any kind. Seven units, and the Plaza pays at **the start of the attacker's Beginning
Phase**. So the bodies must be standing there through **your whole turn**. You get a full turn of
warning and can answer at leisure, on your own mana.

**`keeper-of-masks-flurry-plaza-window` is the one that does not give you the turn**, and its name is
the mechanism. `UNL-081 Keeper of Masks` is *"[Hidden] (Hide now for [rainbow] to react with later for 0
Energy.) [Temporary] (Kill me at the start of my controller's Beginning Phase, before scoring.)
When you play me, play two Reflection unit tokens here. Then do this: They become copies of me."*

Three bodies for **zero Energy**, at Reaction speed, **inside the Beginning Phase** — and 816.1.c
makes a `[Temporary]` permanent's Trigger Condition *the start* of that phase, so a Keeper that
arrives after the condition was checked never dies that turn. Flurry of Feathers is `[Reaction]` too,
so its four Birds land in the same window. **Seven bodies assemble between the start of the Beginning
Phase and the Scoring Step**, after your last ordinary chance to act.

## 3. And the window they need is the window you need

Here is the part worth the play. That Beginning-Phase window is not free for the attacker either: a
`[Temporary]` permanent's death trigger at **816.1.b** is what puts a Chain Item up at 315.2.a, and a
Chain Item is a **Closed State**. Which means **312.2.d hands the defender priority the moment the
attacker passes to resolve anything.**

**The attacker cannot open that window for themselves without opening it for you.** A line that
assembled in silence would be unanswerable; this one has to make noise to work.

## 4. What one Energy buys in that window

`OGN-133 Flurry of Blades` — *"[Reaction] (Play any time, even before spells and abilities resolve.)
Deal 1 to all units at battlefields."* **Body, one Energy.**

Every body on that board dies to it. The Keeper is printed Might 1; its two Reflections are copies at
Might 0 (187.6, and R27 keeps a copy's Might at the token's); the Birds are Might 1 by
`UNL-044`'s own text. **143.2.a** kills on marked damage at or above Might, and a nonzero amount
clears a Might-0 body.

**And it pays no `[Deflect]` tax.** The Birds have Deflect, and 809.1.c charges *"for each time they
choose"* — but **355.10.d** makes an object *"programmatically selected based on its characteristics
rather than chosen"* not a target, with Riot's own third example being that *"Kill all units at
battlefields doesn't target anything."* *All units at battlefields* chooses nobody. Four Deflect
bodies, zero rainbow.

**Seven bodies, one Energy, no tax** — and the Plaza's trigger is then placed at 315.2.b.2 into a
board of nothing.

## 5. The price is paid a turn early, and it is a rune rather than an Energy

You cannot bank the Energy. **167**: *"Every player's Rune Pool empties at the start of each player's
Main Phase and the end of each player's turn"*, and 167.1 *"Any unspent Energy or Power are lost."*

You cannot ready a rune on their turn either. **415.3.a**: *"A player Readies all non-spell Game
Objects they Control during the Awakening Phase on their turn."* The phase is **theirs**, meaning
yours.

So the only way to have one Energy during the opponent's Beginning Phase is to have **left a rune
unexhausted on your own turn before it**, and to spend it there through 164.2.a, whose cost is the
exhaust and which carries `[Reaction]`.

**That is the real cost of defending the fastest deck in the format: one rune a turn, from turn two,
spent on nothing.** It is a tempo tax that compounds precisely on the turns you are trying to build
your own board, and it is invisible to every instrument this project owns, because the clock prices
what a line costs the person playing it.

## 6. Verdict

**The fastest win in the catalogue is answerable for one Energy by a card that pays no tax — and the
answer is almost entirely a question of timing rather than of cards.** You need the rune held from a
turn earlier, and you need the attacker to have opened a Closed State, which the
`keeper-of-masks-flurry-plaza-window` shape does by construction and the
`flurry-of-feathers-grand-plaza-win` shape does not need to, because that one already gave you a turn.

Three caveats, stated rather than buried. `OGN-133` is **Body**, so a defender outside Body pays more
for the same effect and may not reach a Might-1 board at all for one Energy. A defender who has spent
every rune on their own turn has no window whatever the contents of their deck. And none of this says
the attacker is bad — a line that wins on turn three and demands the opponent hold mana open from
turn two is doing its job even in the games it loses.

**What this play adds that no entry has a field for:** an entry lists the cards that beat it. It has
nowhere to say **when you would have to have decided**, and for the whole ALT_WIN class the answer is
*before you knew*.
