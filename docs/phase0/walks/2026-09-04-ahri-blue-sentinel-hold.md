# Hand walk — `ahri-blue-sentinel-hold`

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Verdict: HOLDS, but the entry's own numbers were one point short**

The mechanism is sound and reaches the Victory Score. The entry as authored asked for 2 Ahri and
2 Blue Sentinel, which the formula it printed alongside resolves to **7 points** — one short of the 8
that the BURST class requires. Corrected to the cheapest board that actually wins.

Every rule below was read from `data/Riftbound-Core-Rules-2026-07-16.txt` and both card texts from
`data/corpus_flat.txt` during this walk.

---

## Cards, as printed

| Code | Card | Text that matters |
|---|---|---|
| OGN-066 | Ahri, Alluring (Unit, **Calm**, E5 P1 M4) | **"When I hold, you score 1 point."** |
| UNL-087 | Blue Sentinel (Unit, **Mind**, E4 P1 M4) | `[Shield 2]` (+2 Might while defending) · **"Your hold effects for holding here trigger an additional time."** · "When I hold, [Add] rainbow at the start of your next Main Phase." |

Calm + Mind, so the legend is Nine-Tailed Fox (OGN-255) or another Calm/Mind legend.

## The two rulings it stands on

Both were ruled by the user on 2026-09-03 and this walk depends on nothing unruled.

- **R1 = A with stacking.** Blue Sentinel's card text adds one trigger instance per copy to the single
  Score. Rule **471.2.c** says Score abilities "cannot be triggered more than once per turn for a
  player", but that caps how often the *battlefield* triggers, not how many instances one trigger
  produces; card text supersedes rules text (Golden Rule 002). K Sentinels → each hold effect fires
  **1 + K** times.
- **R2 = A.** Ahri's card-text "you score 1 point" is a point **Gain by ability** (194.1.c), not a 469
  Score, so **470**'s once-per-battlefield-per-turn cap does not apply to it. Without this the whole
  line collapses to a single point.

## One Hold, step by step

### 1. Hold the battlefield
**469.2**: "Hold: A player maintains Control of a Battlefield they did not yet Score this turn during
their Beginning Phase." Control must survive the opponent's turn — see "What ends it".

### 2. The Score itself pays one point
**471.1**: "The player Gains **up to one Point**." **470** caps this at once per battlefield per turn.
That is the `1` in the formula, and it is the only part 470 touches.

### 3. Every Ahri present triggers, 1 + K times each
**383.4.d.2.a**: "The Hold Abilities of Units are put on the Chain as Pending Items after the Unit
these effects correspond to are present at a Battlefield when a player maintains control of it and
Gains 1 Victory Point during their Beginning Phase from Holding."

**Presence is the whole condition** — the Ahri copies do not need to be ready, and units that entered
exhausted still count. Each of the N Ahri contributes one hold effect, and R1 makes each fire 1 + K
times. Each firing is an ability Gain of 1 point (R2).

### 4. Nothing caps the total
**471.1.b** restricts the Final Point only "when a player tries to Gain a Point through a **Conquer**",
and **471.1.a.1** states plainly that "points Gained from sources that are not Conquer are not beholden
to these restrictions." Holding is not Conquering and Ahri's is an ability Gain, so the burst can carry
a player from 0 straight past 8.

## The arithmetic

**Points from one Hold = 1 + N × (1 + K)**, N = Ahri copies present, K = Blue Sentinel copies present.

**103.2.b** caps the Main Deck at 3 copies of a named card, so N ≤ 3 and K ≤ 3:

| N \ K | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **1** | 2 | 3 | 4 | 5 |
| **2** | 3 | 5 | **7** | **9** |
| **3** | 4 | 7 | **10** | **13** |

The entry asked for N=2, K=2 = **7**. That is not a burst to 8; it is one point short, and it was
printed in the entry's own `notable` line without anyone noticing the class it contradicted.

Cheapest boards that actually reach 8, both five units:

| Board | Points | Cost |
|---|---|---|
| N=3, K=2 | **10** | 23 Energy + 5 Power |
| N=2, K=3 | 9 | 22 Energy + 5 Power |

Corrected the entry to **N=3, K=2** — one Energy dearer than the alternative but with more headroom
over the Victory Score.

Blue Sentinel's own hold effect ("Add a rainbow at the start of your next Main Phase") also fires
1 + K times, but it adds a resource, not points, so it is outside the formula.

## What ends it

1. **Losing a body before your Beginning Phase.** At N=3, K=2 the board sits at exactly one unit of
   slack in neither direction: drop to N=2 and it is 7, drop to K=1 and it is 7. Five specific units
   must survive the opponent's whole turn on one battlefield. Blue Sentinel's `[Shield 2]` (+2 Might
   while defending) is the only protection either card brings.
2. **Losing control of the battlefield.** No Hold, no Score, no triggers.
3. **Scoring that battlefield earlier in the turn** — 469.2 requires a battlefield "they did not yet
   Score this turn".

Note that **383.4.d.2.c** hardens the line against one class of answer: "If the act of gaining one point
from Holding is negated or replaced in any way, the Hold Effect will still trigger." Stopping the point
does not stop the Ahri triggers.

## Cost

Five units, 23 Energy and 5 Power in total, necessarily spread across several turns, all parked on one
battlefield. This is the real price: it is a slow board the opponent can see coming for two turns.

## Links
- Combo entry: `data/combos.json` → `ahri-blue-sentinel-hold`
- Rulings R1 and R2: issue #11, and `CLAUDE.md` § Combos
- Sibling walk: `docs/phase0/walks/2026-09-04-jhin-fiora-facebreaker-recall.md`
