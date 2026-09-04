# Hand walks — the Sprite Fountain engine and the Dragonstorm ramp

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Both HOLD.**

Two entries whose value is that they are honest about what does *not* work. Each carries a refuted
extension in its own notes, and the walk had to confirm the refutation as much as the engine.

---

## 1. `sprite-fountain-malzahar-jayce` — six ready 3 Might bodies a turn — **HOLDS**

**UNL-078 Sprite Fountain** (Gear, Mind, E2 P1): `[Temporary]` · "When you play this, play a **ready** 3
Might Sprite unit token **with [Temporary]** to your base. `[Deathknell][>]` **Repeat this gear's play
effect.**"
**OGN-113 Malzahar, Fanatic** (Mind, E4 M3): "**Kill a friendly unit or gear**, exhaust: `[Action]` — Add 2
rainbow."
**VEN-068 Jayce, Brilliant Inventor**: "When you play me or **the first time you play a non-token gear each
turn**, you may ready something besides me that's exhausted."

- **Killing as a cost still fires the Deathknell**, which is the whole engine. 428.1.a.1 — *"Active Kill is
  when the action is taken when instructed by a game effect **or as a cost** for a card or ability"* — and
  428.1.a.1.b puts the death trigger on the chain **before** the unit reaches the trash, with Draven,
  Audacious as the worked example. So Malzahar's cost-kill of the Fountain repeats its play effect for a
  second Sprite.
- **Net per Fountain: −2 Energy, +1 Power, two ready 3 Might bodies.** (2E+1P out, 2 rainbow back.) Three
  Fountains and three Malzahars is six Sprites for −6E +3P, exactly as the entry says.
- **Jayce's trigger is honestly priced.** "The first time you play a non-token gear **each turn**" is once
  per turn per Jayce, and at that moment every Malzahar is still ready from Awaken, so the only live target
  is an exhausted rune — +1 Energy, not a second Malzahar activation. The entry leads with this.
- **Both sinks really are dead**, and this is what keeps the entry from overclaiming. The Sprites are
  `[Temporary]`: 816.1.b kills them at the start of your Beginning Phase **before scoring** (315.2.b), so
  they can conquer on the turn they are made and defend on the opponent's turn, but they can never Hold
  and are never alive at a Main Phase start — which rules out both The Grand Plaza and Bottled
  Constellation. (LeBlanc, Everywhere at Once is the one card that changes this; see the verified
  `leblanc-temporary-plaza`.)

---

## 2. `gemdragon-henge-vi-blind-fury` — the ramp is real, the loop is not — **HOLDS as ENGINE**

**UNL-104 Gentle Gemdragon** (Body, E8 M8): "When you play me **or another Dragon**, ready up to 2 runes."
**OGN-140 Herald of Scales** (Body, E4 M3): "Your Dragons' **Energy costs** are reduced by 2, to a minimum
of 1."
**SFD-117 Ancient Henge** (Gear, Body, E2 P1): "exhaust: `[Reaction]` — Pay any amount of Energy to Add
that much rainbow."

- **The printed word is "Energy costs".** Two Heralds take a Gemdragon from 8 to 4 Energy and an Eager
  Drakehound to 1 — but the Drakehound's **Power is untouched**. The entry carries this correction and it
  is right off the card face.
- **Three Gemdragons ready 6 runes per Dragon played**, so a 4-Energy Gemdragon is Energy-positive on
  arrival. That is the whole real engine, and it is enough to justify the entry.
- **The reclassification from INFINITE to ENGINE is correct.** 161.2.b — *"When a Rune is Recycled it is
  returned to the **Rune Deck**"* — is why the Vi/Dancing Grenade recursion cannot close: every Power costs
  a rune off the board that nothing in Fury/Body channels back, and Ancient Henge converts one for one and
  so can never cover a deficit. The board falls under six runes by the second pass.
- **The Blind Fury "deck-out" is refuted by 431.2** as the entry says: Burn Out recycles the whole trash
  into the Main Deck (431.2.b) and costs a single point (431.2.c), so banishing-and-playing the opponent's
  top card feeds their own recovery.
- **R15** (Dancing Grenade's escalating counter across recasts) appears only inside the already-refuted
  recursion, so the entry's claimed output does not touch it.
