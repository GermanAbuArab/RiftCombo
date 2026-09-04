# The joint loop budget — issue #21 worked out

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16

#21 asked for a joint budget of `lux-infinite-energy` + `lux-infinite-power` + a payoff, counting recycle
slots, draws and resources per pass. Here it is, and **the answer changes which resource is scarce.**

## The two pass types

`lux-infinite-power` is not nested inside `lux-infinite-energy` — it is a **second, different pass** that
converts banked Energy into Power. Each has its own ledger.

| per pass | **Energy pass** | **Power pass** |
|---|---|---|
| Forge recycle slots used | 3 of 4 (Forge, Shadow's Call, Sacrifice) | 2 of 4 (Forge, Retreat) |
| **spare slots** | **1** | **2** |
| cards entering the deck | 4 (the 3 above + Ekko self-recycling) | 2 |
| draws | 4 (Shadow's Call 2 + Sacrifice 2) | 2 (Lecturing Yordle ×2) |
| **spare draws** | **0** | **0** |
| Energy | −10 spent, 11 from Ekko's readied runes → **+1** | **−9** |
| Power | −1 Mind, channelled back by Sacrifice → 0 | **+1** |

## The three exchange rates that follow

1. **1 energy pass = +1 Energy.**
2. **1 Power = 9 Energy = 9 energy passes.**
3. **1 extra card cycled through the deck = 1 spare slot + 1 draw.**

## The correction: draws are the scarce thing, and they are for sale

Both pass types have **spare slots and zero spare draws**. So the wall was never the Forge slot — an
extra card always has a slot waiting, and never has a draw waiting.

But the draw is purchasable, and this is the piece that unlocks all four payoffs. **SFD-088 Renata Glasc,
Mastermind** reads `1 Energy + 1 Mind: Draw 1` — **with no exhaust in its cost**, unlike her Score ability
right next to it, which does carry `exhaust`. So the Draw 1 is repeatable without limit, and

> **an extra cycled card costs 1 Energy + 1 Mind Power ≈ 10 Energy.**

A price, not a wall.

## And the payoffs spend a card per *activation*, not per pass

This is what makes the whole thing comfortable. A Renata point costs roughly 50 energy passes, and each
of those passes leaves a spare slot behind. **~50 spare slots accumulate per point**, against the one card
the payoff actually consumes. The slot is nowhere near binding at that rate.

**So the CLAUDE.md sentence needs restating.** *"That spare slot is a single resource: two payoffs that
each consume a card per pass cannot run on the same engine at once"* is literally true **per pass** — but
no payoff in the catalogue consumes a card per pass. They consume one per point. The three Renata routes
are alternatives because they all do the same job (ready Renata so she can score again), not because the
engine cannot feed two of them. Restated in CLAUDE.md.

## The four payoffs, priced

| entry | per activation | in Energy |
|---|---|---|
| `renata-bubble-bot-ready` | Renata 4E+4 Mind · Retreat 1E · Bubble Bot 3E · draw 1E+1 Mind = **9E + 5 Power** | ≈ **54 / point** |
| `jayce-mesmerize-renata` | Renata 4E+4 Mind · Mesmerize 1E+1P · Jayce 6E+1P · draw 1E+1 Mind = **12E + 7 Power** | ≈ **75 / point** |
| `ashe-retreat-hand-strip` | Ashe 5E+1 Order · Retreat 1E · draw 1E+1 Mind = **7E + 2 Power** | ≈ **25 / card banished** |
| `promising-future-force-deck` | Promising Future 5E+1P · draw 1E+1 Mind = **6E + 2 Power** | ≈ **24 / cast** |

All four **close**. `renata-bubble-bot-ready`'s figure lands exactly on the "9 Energy + 5 Mind Power per
point" its own REFUTE note already carried, which is a good sign the ledger is right.

## One number corrected downward

`jayce-mesmerize-renata` claimed *"about 7.5 Energy + 5 Mind Power per point"* on the strength of **two**
readies per Jayce cycle — one from "When you play me" and one from "the first time you play a non-token
gear each turn". **The loop plays Forge of the Future every single pass**, so the turn's first non-token
gear play is long past by the time any of this happens; that clause can fire at most once in the turn no
matter how many Jayce objects appear. Priced here at **one** ready per cycle, which is exactly what a
point needs, so the entry still closes — at 12E + 7 Power instead. If a fresh Jayce object turns out to
get its own "first time each turn" counter the cost roughly halves; that reading can only make the entry
cheaper, never break it.

## What Promising Future actually does

Worth recording because the printed text carries a limiter the entry never mentioned: OGN-115 says the
players *"play those cards, ignoring Energy costs. **(They must still pay Power costs.)**"* So even the
free cards the opponent gets are gated on their Power. Together with 431.2.b refilling their deck from
their trash before any Burn Out point, the entry's own verdict — *"engine at best … it cannot deck them"* —
is right, and the honest reason to keep it in the catalogue is that it records why the community's
"force every card into play" claim does not win.

---

# Appendix — `renata-time-warp-ekko-refresh` was never a loop payoff

It was swept into #21 by mistake: its `needs` is empty and its own notes say so — *"Community-documented
deck, **not a loop**: it needs no infinite engine."* Its blocker was only that nobody had walked the rune
arithmetic. Walked here. **HOLDS as ENGINE.**

**OGN-122 Time Warp** (E10 **P4**): "Take a turn after this one. Banish this."
**SFD-088 Renata Glasc, Mastermind**: "4 Energy + 4 Mind, exhaust: Score 1 point."
**OGN-110 Ekko, Recurrent**: `[Deathknell]` "Recycle me to ready your runes."
**OGN-213 Hidden Blade** (`[Hidden][Action]`): "Kill a unit **at a battlefield**. Its controller draws 2."
**SFD-201 Chem-Baroness** (Legend, Mind/Order): "When you or an ally hold, you may exhaust me to play a
Gold gear token **exhausted**. While your score is within 3 points of the Victory Score, your Gold Add an
additional 1 Energy."

## The turn, rune by rune

The whole thing runs on one fact, the same one the verified Lux loop uses: **a rune's Power ability is
"Recycle this" (164.2.b) with no exhaust in its cost**, so a rune already exhausted for Energy can *still*
be recycled for Power. Each rune is worth 1 Energy **and then** 1 Power, once.

| | runes on board | |
|---|---|---|
| exhaust all 12 (164.2.a) | 12 | **+12 Energy** |
| recycle 4 exhausted Mind runes (164.2.b, they leave for the Rune Deck — 161.2.b) | **8** | **+4 Mind Power** |
| **Time Warp**: 10 Energy + 4 Mind | 8 | 2 Energy left |
| Hidden Blade from hidden for 0 (811.1.b) kills Ekko; his Deathknell readies the 8 | 8 ready | |
| exhaust 4, recycle those same 4 | **4** | +4 Energy (6 total), +4 Mind |
| **Renata**: 4 Energy + 4 Mind, exhaust | 4 | **+1 point** |

So the Time Warp turn really is payable **with zero Gold**, provided **eight of the twelve runes make
Mind** — four for Time Warp and four for Renata. Exactly what the entry claims.

**The extra turn** (735: *"These effects create a temporary Additional Turn owned by that player that is
inserted into the turn queue after the current turn"* — and nothing on the card or in the rules limits it
to one per turn, so two copies really do buy two): Awaken readies the 4 remaining runes and Renata; the
Beginning Phase Holds every battlefield you control, up to 2 in a Duel; the Channel Phase adds 2 runes
(315.3.b) for **6**. Six runes are 6 Energy and 4 Mind Power — enough for a second Renata point **or**,
with four Gold banked, a second Time Warp at 10E + 4P. **Not both**, as the entry says.

**Ekko does not come back.** His Deathknell recycles him to the Main Deck, so the extra turn has no second
rune-ready. Correct in the entry.

**Two constraints worth adding.** Hidden Blade kills *"a unit **at a battlefield**"*, so Ekko has to be at
one, not at base — and its "Its controller draws 2" resolves after the Deathknell, into a deck that may be
nearly empty. And the Gold arrives **exhausted** with no Renata Industrialist in this shell to override it
(R25), so it is next turn's resource; at 5+ points Chem-Baroness makes each one 1 rainbow **and** 1 Energy.

**The 2026-09-04 reclass to ENGINE stands.** Its own count is about 5 points across two turns, and BURST
means one scoring event reaches 8.

---

# Appendix 2 — `jhin-virtuoso-ekko-malzahar-vi` runs its **own** engine — **HOLDS as INFINITE**

The last entry on #21, and the only one that never touched the Lux loop: **Vi's free recycle replaces
Forge of the Future entirely.**

**OGN-036 Vi, Destructive** (Fury, E2 P1 M3): **"Recycle 1 from your trash: Give me +1 Might this turn."**
No exhaust, no Energy — an **unlimited** recycle, one card at a time.
**UNL-181 Virtuoso** (Legend, Fury/Mind) · **OGN-110 Ekko, Recurrent** · **OGN-113 Malzahar, Fanatic** ·
**UNL-009 Upstage Comedy** (Fury, E2, `[Repeat]` 2E: "Ready a unit") ·
**OGN-083 Consult the Past** (Mind, **E4**: "Draw 2") · **SFD-088 Renata Glasc, Mastermind**

## The Draw-2 pass

| | Energy | Power |
|---|---|---|
| Play Ekko | −5 | −1 Mind |
| Upstage Comedy, readying Malzahar | −2 | |
| Malzahar kills Ekko as a cost (428.1.a.1) and exhausts | | **+2 rainbow** |
| Ekko's Deathknell: recycle him, **ready every rune on the board** | **+N** | |
| Vi recycles Upstage Comedy from the trash, free | | |
| Consult the Past (4E, so Virtuoso may banish it): draw 2 — Ekko and Comedy return | −4 | |
| **net** | **N − 11** | **+1** |

Break-even at 11 runes on the board, **+1 Energy at 12**, exactly as the entry says. Malzahar's rainbow is
**Universal Power** (163.2.b, and 135.2.e.5 makes the rainbow symbol mean any Domain), so it pays Ekko's
Mind cost and no rune ever has to be recycled after the first pass — which is why the board stays at 12.

**The draws balance exactly:** two cards return through the deck each pass (Ekko by his own Deathknell,
Comedy by Vi) and the 4-Energy spell draws two. And **416.5 does not bite**, because it randomises only
cards recycled *simultaneously* — Vi recycles one at a time, so the order is deterministic.

## The fourth pass pays a debt and collects a bigger prize

Virtuoso's fourth banish puts all four spells in the trash at once, channels 4 runes and draws 1.

- **The debt:** four spells to bring back, one draw supplied. The other three cost 1 Energy + 1 Mind each
  from Renata's exhaust-free `Draw 1`. **−3E −3P.**
- **The prize, and it is the cleverest thing in the catalogue:** with all twelve runes on the board the
  Rune Deck is empty, so "channel 4 runes" would do **nothing** (430.3: *"channel as many as possible"*).
  So **recycle four already-exhausted runes for 4 Power first** — 164.2.b's Power ability is "Recycle
  this", no exhaust in the cost — and let Virtuoso channel those same four straight back **ready**
  (430.2.a). Board count unchanged, and you keep both the Power and the Energy from exhausting them again.
  **+4E +4P for nothing.**

**Four passes at 12 runes: +4E +4P from the passes, +4E +4P from the supercycle, −3E −3P for the debt ≈
+5 Energy and +5 Power.** Positive, unbounded, and no Lux loop underneath it.

The payoff is then Renata at 4E + 4 Mind for a point, Comedy (2E) to ready her, Vi to recycle Comedy, and
Renata's own Draw 1 (1E + 1 Mind) to get it back — about **7 Energy + 5 Power per point**, roughly one
point per four to six passes. Much cheaper per point than any of the Lux-fed routes.

**#21 is fully answered.** All six entries close.
