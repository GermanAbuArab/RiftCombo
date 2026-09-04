# Hand walk — `power-nexus-sentinel`, the last candidate

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **HOLDS.** R8 ruled A.

**SFD-214 Power Nexus** (Battlefield, Colorless): **"When you hold here, you may pay 4 rainbow to score 1
point."**
**UNL-087 Blue Sentinel** ×2 (Unit, Mind, E4 P1 M4): `[Shield 2]` · **"Your hold effects for holding here
trigger an additional time."** · "When I hold, [Add] 1 rainbow at the start of your next Main Phase."

## R8 — why the battlefield's own trigger is one of *your* hold effects

A web search found **no official Riot ruling**: all four set FAQs are silent, including Spiritforged
(2026-01-14, where Power Nexus was printed) and Unleashed (2026-04-29, where Blue Sentinel was). The Core
Rules have no glossary and never define the possessive "your". But the search surfaced a rule nobody in
this project had cited, and four referents all land on the same player:

| | |
|---|---|
| **190.6.a** | *"While a Battlefield is Controlled, **its Controller controls its Abilities** … takes responsibility for adding them to the Chain … and makes all choices required by them."* |
| **190.6.c** | control of a battlefield's ability follows the battlefield's controller **unless the ability names a different player**. Power Nexus names none. |
| **190.6.d** | *"**'You' in a battlefield's abilities refers to the battlefield's Controller**, as does the implied 'you' in instructions that don't specify a player."* So for its controller, Power Nexus literally reads *"when **I** hold here, **I** may pay 4 to score 1 point."* |
| **383.4.d.2** | Hold Effects include *"Abilities that reference the player that performed the Hold action"* — which is exactly what it now does. |

**The ownership objection does not reach this entry.** The hard case would be standing on the *opponent's*
Power Nexus, where owner ≠ controller. But **127.1** makes the owner whoever brought the card *"as … one of
their Battlefields"*, and **485.4.a** gives each player their own battlefield in a Duel. The entry requires
you to **control** the Nexus, which normally means it is yours — so owner and controller are the same
person and "your" reaches it under either theory.

Corroborating but **not official**: [RiftJudge Q10155](https://app.riftjudge.com/questions/10155),
2026-05-08, a fan judge database that carries Riot's "does not endorse or sponsor" disclaimer. It reads
the phrase inclusively — *"**Since the card text does not specify 'other' hold effects**, it applies to the
Sentinel's own 'When I hold…' ability."* That is about a unit's own ability, not a battlefield's, so it
shows how the phrase is read rather than settling this case.

## The arithmetic

Under **R1 = A** (Sentinels stack trigger instances on the single Score), K = 2 Sentinels make each hold
effect fire **1 + K = 3** times:

- the Nexus's hold effect fires **3 times**, each paying 4 rainbow for **+1 point** → **+3 for 12 Power**;
- plus the Hold's own Score point (471.1) → **+1**.
- **4 points per Beginning Phase.**

Under **R2 = A** the Nexus's "score 1 point" is a Gain by ability, so 470's once-per-battlefield cap does
not touch it, and 471.1.a.1 keeps the Final Point restriction off it — 471.1.b reaches Conquer Gains only,
and this is neither.

## The constraint that makes it an ENGINE and not a burst

**167** empties the Rune Pool at the end of every turn, so the Beginning Phase starts with nothing banked.
The 12 Power has to be made **there**, by recycling runes — legal, because 164.2.b prices a rune's Power as
"Recycle this" with no exhaust and 429.3 lets an Add Reaction fire whenever costs are paid. But **161.2.b**
sends a recycled rune to the **Rune Deck**, so twelve recycles empty the board, and 315.3.b only channels
2 back per turn. **One big turn, then about one extra point a turn.**

The fix the entry already names checks out: the verified `world-atlas-sentinel-gold` banks 8 Gold, and a
Gold's ability is *"Kill this, **exhaust**: Add 1 rainbow"* (187.5) — arriving exhausted, they ready at
Awaken and so are spendable in the Beginning Phase. **8 Gold = two Nexus payments.**

**Its notes were also wrong about what blocked it**, which the 2026-09-04 audit caught: they blamed the
Blue Sentinel reading, which is R1 and had been ruled A the previous day.
