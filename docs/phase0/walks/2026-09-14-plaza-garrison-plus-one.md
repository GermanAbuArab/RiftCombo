# Does a Fury-legal, board-wide, ungated +1 change which Grand Plaza lines are live?

**Lane rc-plaza, 2026-09-14. Refs #200.** Opened on the sentence CLAUDE.md marks *"Nobody has re-walked
the arithmetic; treat it as open"* — the #159 Azir refusal, reopened on 2026-09-13 when the claim that
`UNL-077 Soul Shepherd` is the pool's only fix for a 1-Might garrison was refuted.

**VERDICT: no new entry. The +1 changes the answer from NONE to SOME on exactly ONE of the 23 Plaza
entries, and on the other three it can reach it is an ALTERNATIVE to an in-domain answer already
named.** Two card-level findings reach the whole family and are worth more than the entry would have
been: a **second 1-damage mass answer** the shipped sweep cannot see, and a **garrison-wide +1 that
costs no card slot at all.** One shipped notable is arithmetically wrong and is corrected.

---

## 0. Instruments and non-vacuity

| corpus | rows | probe |
|---|---|---|
| `data/corpus_flat.txt` | 936 card rows | `OGN-133`, `VEN-018`, `UNL-077`, `OGN-293` all located |
| `data/cards.json` | 1,189 printings / 935 name+type | `OGS-018 Tibbers` reads `signature=true` (103.2.d.3's own worked example) |
| `data/combos.json` | 767 entries | 23 carry `OGN-293` in `uses[]` |
| Core Rules | 7,283 lines, 120 form feeds | grepped `^[[:space:]]*NNN\.`, no trailing space |

The garrison floor is **rc-emit's `garrisonFloor()` copied verbatim** out of
`scripts/adversarial-check.mjs` rather than reinvented, and both of its own `--selftest-garrison`
answers were reproduced before use: `flurry-of-feathers-grand-plaza-win` → floor 1, tokens `[Bird]`;
`spiderling-swarm-grand-plaza` → floor `null`.

---

## 1. The arithmetic that decides everything, and that my first number missed

**143.2.a**: *"If a Unit ever has nonzero damage marked on it equalling or exceeding its Might, it is
Killed."* **142.4.b** says the same from the lethal side.

So **a +1 rescues a body at Might EXACTLY 1 and does nothing at all for a body at Might 0** — it lands
on 1, and 1 damage still equals 1. Rule 187 prints five unit tokens at 0 or 1:

> 187.1 Recruit **1** · 187.6 Reflection **0** · 187.7 Bird **1** · 187.10 Tentacle **1** ·
> 187.11 Shadow Clone **0**

My first predicate was *floor ≤ 1* and returned **14 of 23**. The honest predicate is
*floor **exactly** 1*, which returns **12**. The two it removes are the floor-0 boards
(`leblanc-temporary-plaza`, `keeper-of-masks-flurry-plaza-window`), both standing on Reflections.
The first of those already carries a correct and complete notable saying so.

---

## 2. The 23 Plaza entries

Predicates: **floor** = rc-emit `garrisonFloor()` verbatim. **identity** = union of `uses[].domains`.
**fury?** = `|identity ∪ {fury}| ≤ 2` under 103.1.b.

| entry | floor | tokens | identity | fury? | +1 helps? |
|---|---|---|---|---|---|
| leblanc-temporary-plaza | 0 | Reflection | mind | yes | **no** — 0→1 still dies |
| keeper-of-masks-flurry-plaza-window | 0 | Reflection+Bird+Sprite | calm/mind | no | **no** — same |
| grand-plaza-recruit-vanguard | 1 | Recruit | order | **yes** | yes |
| grand-plaza-loop-time-warp | 1 | Recruit | mind/order | no | yes, but not via fury |
| zed-clone-eye-recruits | 1 | Recruit | chaos/order | no | yes, but not via fury |
| noxian-drummer-eye-svellsongur-plaza | 1 | Recruit | calm/order | no | yes, but not via fury |
| arise-sand-soldiers-plaza | 1 **(over-count, see §5)** | Sand Soldier+Recruit | calm/order | no | n/a |
| flurry-of-feathers-grand-plaza-win | 1 | Bird | **calm** | **yes** | **yes — and it is the only entry with no in-domain answer** |
| corina-svellsongur-plaza | 1 | Recruit | calm/order | no | yes, but not via fury |
| plaza-armory-miss-fortune | 1 | Recruit | body/order | no | yes, but not via fury |
| heimerdinger-ultrasoft-poro-plaza | 1 | Bird | mind/order | no | yes, but not via fury |
| vanguard-captain-manufactor-plaza | 1 | Recruit | order | **yes** | yes |
| herald-heimerdinger-armory-plaza | 1 | Recruit | mind/order | no | yes, but not via fury |
| heimerdinger-armory-plaza | 1 | Recruit | mind/order | no | yes, but not via fury |
| desert-call-vi-sand-soldier-plaza | 2 | Sand Soldier | calm/fury | yes | **names VEN-018 — and the sentence is wrong, §4** |
| leblanc-bashful-bloom-trevor-plaza | 3 | Sprite | calm/mind | no | not exposed to 1 damage |
| svellsongur-trevor-leblanc-plaza | 3 | Sprite | calm/mind | no | not exposed |
| sprite-mother-burst-leblanc-plaza | 3 | Sprite | mind | yes | not exposed |
| ready-recruits-grand-plaza | null | — | order | yes | **already names VEN-018 (#200, 2026-09-13)** |
| dragonstorm-confront-grand-plaza | null | — | body | yes | not exposed (its own notable: M8×3, M9×2, M5×6) |
| karthus-machine-evangel-renata-plaza | null **(false null, §5)** | — | order | **yes** | yes |
| spiderling-swarm-grand-plaza | null | — | chaos | yes | not exposed (M7 each) |
| ferrous-forerunner-karthus-mech-plaza | null | — | fury/order | yes | not exposed (Mechs M3); names VEN-018 correctly |

**Floor exactly 1 AND fury-legal AND not already answered: FOUR** — `grand-plaza-recruit-vanguard`,
`vanguard-captain-manufactor-plaza`, `flurry-of-feathers-grand-plaza-win`, and
`karthus-machine-evangel-renata-plaza` (whose null is a false negative, §5).

**And three of those four already carry an IN-DOMAIN answer**: `OGS-013 Garen, Commander` is mono-Order
(E6 + 1 Power, Might 5), and all three of those entries are mono-Order. For them `VEN-018` is cheaper
(E4 + 1 Power), needs no body, and is board-wide rather than *"here"* — but it costs the second domain
slot, which Garen does not. **That is an alternative, not a rescue, and it is not worth a notable.**

**The one entry where the answer goes from NONE to SOME is `flurry-of-feathers-grand-plaza-win`.** §3.

---

## 3. The one entry whose shipped answer list is entirely off-domain — 1 of 28

Twenty-eight entries carry the emitted sentence **"THE IDENTITY DOES HOLD AN ANSWER"** followed by a
list. Checked each name against the entry's own implied identity under 103.1.b:

> **PREDICATE**: notable contains `THE IDENTITY DOES HOLD AN ANSWER`; a listed card is IN-DOMAIN when
> every one of its domains is already in the entry's identity. **28 hits, and exactly ONE has no
> in-domain card in its list.**

I expected four or more. **One.** The over-count was mine and measuring removed it.

`flurry-of-feathers-grand-plaza-win` is **mono-calm**, and its three listed answers are
`OGS-013 Garen` (order), `SFD-089 Rumble` (mind, and Mech-scoped), `UNL-077 Soul Shepherd` (mind).
All three cost the second domain slot; the sentence says the identity holds an answer and it does not.
`SFD-089` is the card CLAUDE.md already records as *"listed NINE times and live ZERO"* — this is its
tenth listing, on a board of Birds.

**The two real answers for a Calm line, both absent from all 23 Plaza entries:**

- **`UNL-191 Wuju Master`** — *"[Level 6] Your units have +1 Might"* — a **LEGEND**, so it costs **no
  card slot at all**, and it is the pool's only garrison-wide +1 that does. body/calm has four legend
  names, so the shell is well supported, and Calm prints **five** mono-calm-or-colourless XP faucets
  (`UNL-034`, `UNL-040`, `UNL-047`, `UNL-053`, `UNL-213`) so [Level 6] is reachable without spending
  the partner domain on the faucet either. Price: 824.1.b.1 makes [Level] a **conditional grant**, not
  a rung — *"While you have [N] or more XP, this card gains…"* — and 824.1.d switches it off the
  instant you drop below 6, so the deck must hold the XP rather than spend it.
- **`VEN-018 Rage Amplifier`** — fury gear, E4 + 1 Power, immediate, no XP. **calm/fury is ONE legend
  name, `Rogue Assassin`** — one of the three single-name pairs CLAUDE.md's census records — so this
  route narrows the shell to a single legend where Wuju Master does not.

---

## 4. A shipped notable that is arithmetically wrong

`desert-call-vi-sand-soldier-plaza` names its own threat as **`OGS-002 Firestorm`** (fury, E6 + 1
Power, *"Deal 3 to all enemy units at a battlefield"*) and then says **"THE IDENTITY DOES HOLD AN
ANSWER: VEN-018 Rage Amplifier +1"**.

> Sand Soldier is **2 Might** (187.3). Unempowered `VEN-018` gives **+1 → Might 3**. Firestorm deals
> **3**. 143.2.a kills on damage **equalling** Might. **3 ≥ 3 — the garrison still dies.**

The +1 buys **nothing** against the threat that entry names. Only the **Empowered** half reaches it:
*"If I'm [Empowered], they have +2 Might instead"* → Might 4, which 3 damage does not kill — at
E4 + 1 Power to play plus **E6 + 1 Fury rune** to Empower, so **E10 + 2 Power** for the pair.
Correction staged.

---

## 5. Two floors rc-emit's instrument reads wrongly, both from the same clause

`tokensPlayedBy()` correctly drops a token whose text names the base, because a battlefield sweep
cannot reach a body at base. Two Plaza entries walk those bodies to the battlefield afterwards:

- **`karthus-machine-evangel-renata-plaza` — FALSE NULL, real floor 1.** `OGN-239 Machine Evangel`
  plays *"three 1 Might Recruit unit tokens **into your base**"*; the entry's own step 4 then
  *"Standard-Move all nine to the Plaza"*. The garrison is nine Might-1 Recruits and is fully exposed.
- **`arise-sand-soldiers-plaza` — OVER-COUNT, real floor 2.** The floor reads 1 off `SFD-153 Eye of
  the Herald` (*"When I move, play a 1 Might Recruit unit token here"*), but that entry's step 1 says
  the nine Equipment *"need not be attached to anything to be counted"* — they are never attached and
  never move, so **no Recruit is ever made**. The garrison is nine Might-2 Sand Soldiers, and the
  entry's own step 4 already says *"A 1-damage sweep does not reach them (142.4.b)"*.

Both are reported to rc-emit rather than patched here — `scripts/adversarial-check.mjs` is theirs.
Neither has shipped a wrong notable: the false null emits nothing, and the over-count sits on an entry
whose real floor is above the answer's reach.

---

## 6. FINDING: the 1-damage tier has TWO members, and the shipped sweep can only see one

> **PREDICATE**: `/(deal|kill)[^|]{0,70}\ball\b[^|]{0,50}unit/i` over 936 corpus rows → **15 hits**,
> all read. Second, independent instrument: `/deal..(2-19)..(each|every|all|among|split|units)/i` →
> 15 hits, all read. Both probes caught the known positive.

Ranked by damage, excluding anything that needs a combat or an attack (`OGN-127` is *"in combat"*,
`OGN-148` / `OGN-159` / `OGN-200` / `VEN-019` / `SFD-190` are *"when I attack"*, `OGN-190` is a
Deathknell *"at my battlefield"*) and marking the Signature rows, which 103.2.d.2 confines to one
legend each:

| damage | card | domains | cost | note |
|---|---|---|---|---|
| **1** | `OGN-133` Flurry of Blades | body | **E1** | [Reaction] |
| **1** | **`UNL-072` Crescent Strike** | **mind** | **E3 + 1 Power** | **[Action]. NOT Signature.** |
| 3 | `OGS-002` Firestorm | fury | E6 + 1 Power | enemy units only |
| 3 | `OGS-018` Tibbers | fury/chaos | E8 + 2 Power | **Signature — Annie** |
| 12 | `OGN-123` Unchecked Power | mind | E7 + 2 Power | exhausts your own units too |
| kill all | `UNL-180` The Ruination | order | E9 + 3 Power | Might-independent |
| X | `OGN-268` Bullet Time | body/chaos | E1 + X rainbow | **Signature — Miss Fortune** |
| X | `OGN-250` Stormbringer | fury/body | E6 + 2 Power | **Signature — Volibear** |
| split | `UNL-192` Alpha Strike | calm/body | E3 + 1 Power | **Signature — Master Yi** |

**`UNL-072 Crescent Strike`** reads *"Choose a battlefield and an enemy unit there. Deal 4 to that unit
and **1 to each other enemy unit there**."* Against seven Might-1 Recruits it clears **all seven** for
E3 + 1 Power. Against Might-2 bodies it kills **exactly one**.

**The shipped answer sweep cannot see it.** `sweepMassAnswers()` requires
`/to all (enemy )?units at (a )?battlefields?|kill all units/i`, and Crescent Strike is worded *"each
other enemy unit there"*. Tested directly: my wider predicate returns **2** cards the shipped one
misses, of which `OGN-200 Twisted Fate` is correctly excluded as attack-gated and **`UNL-072` is a
genuine miss**. **0 of 23 Plaza entries name it**, and 14 of them stand on a floor of 1 or 0.

**Why it matters beyond one card: the 1-damage tier spans TWO domains, Body and Mind.** A Plaza line
cannot treat the E1 sweep as a Body matchup. And between 1 and 3 damage there is **nothing** that
reaches a passive garrison — every 2-damage mass card in the pool is combat- or attack-gated — so
**a single +1 moves the cheapest non-Signature mass answer from E1 to E6 + 1 Power.**

---

## 7. What the +1 actually costs the opponent, and the honest limit

`VEN-018` is a **gear**, so the opponent can remove it first. Two facts make that cheaper than the
mass-answer ladder suggests, and one makes it dearer.

**It cannot be answered at Reaction speed.** `VEN-018` carries **no Equipment tag** (`tags: []`), and
`SFD-011 Angle Shot` — the pool's only Reaction-speed gear answer — reads *"Choose a unit and an
**Equipment**"*. Every card that reaches the Amplifier must be cast on the opponent's own turn.

> **PREDICATE**: `/(kill|destroy|banish|detach|return)[^.]{0,60}\bgear\b/i` etc. over 935 name+type
> rows → **24 hits**, all read; 16 fall away on reading (*friendly* gear, own trash, own deck,
> Equipment-only, or an Energy-cost gate below `VEN-018`'s E4 — `SFD-074 Pickpocket` gates at E1 and
> `VEN-080 Noxian Demolitionist` at *"no more than my Might"* with Might **1**).

Enemy-facing answers that reach an E4 non-Equipment gear, cheapest first: `SFD-135 Factory Recall`
(chaos, **E1**, bounce) · `OGN-179 Acceptable Losses` (chaos, **E1**, symmetric) · `SFD-005 Detonate`
(fury, **E1 + 1 Power**, draws you 2) · `VEN-003 Brittle Steel` (fury, E2 + 1 Power) · `OGN-224
Salvage` (order, E2 + 1 Power) · `SFD-032 Disarming Rake` (calm, E3 + 1 Power) · `SFD-077 Rocket
Barrage` (mind, E4 + 1 Power) · `OGN-022 Thermo Beam` (fury, E5 + 2 Power, all gear).

**And BODY — the one domain that prints the E1 sweep — has exactly one, swept widest.** Every
mono-Body card whose text contains the word *gear* is nine cards; eight are friendly-facing, own-deck
or own-trash. The one that reaches is **`SFD-109 Akshan, Mischievous`** (body, E4 + **2 Body Power**):
*"move an enemy gear to your base. **You control it until I leave the board.**"* — **so a Body deck
does not kill the Amplifier, it STEALS it, and *"Your units have +1 Might"* then reads for them.**
(A first draft of this section said Body had no answer at all. Sweeping widest and reading refuted it.)

**The honest price, and it is smaller than §6's ladder alone implies:** the +1 does not make the
garrison safe. It makes the answer **two cards instead of one** — cheapest E2 across two cards in
Body/Chaos or Body/Fury, against **E1 and one card** today — and **E5 + 2 Power across two cards for a
mono-Body opponent**. A topdecked Flurry stops winning on its own. That is what a notable should
claim, and nothing more.

---

## 8. What was refused, and why

- **No new entry.** A new row would be one of the four §2 candidates plus `VEN-018`, and three of the
  four already hold an in-domain answer. The fourth is a **notable correction on an existing entry**,
  not a new line — CLAUDE.md's own test: an optional deckbuilding choice must not be written as a
  requirement.
- **No notable on the three mono-Order entries.** Garen is already named and is in-domain. Adding a
  cross-domain alternative is padding.
- **No hand-written Crescent Strike notable on all 14 exposed entries.** The gap is in
  `sweepMassAnswers()`, which rc-emit owns; one predicate fix propagates it to every entry the sweep
  covers, and 14 hand-written copies of one sentence would go stale independently.

## 9. Reopens if

A set prints a mass answer dealing exactly 2 to units at a battlefield without a combat, or a
board-wide static +Might outside the ten swept in §3.

---

## 10. Addendum, same day: the brief answered at catalogue scale — 97 of 100, and the 3 are not defects

The walk above answers *which Plaza lines are live* for 23 entries. The same question is askable of
every entry with an exposed garrison, and the answer set is small enough to read end to end.

> **PREDICATE**: rc-emit's `garrisonFloor()` verbatim, floor 0 or 1. A protection card counts only if
> **103.1.b lets the identity run it** (identity ∪ its domains ≤ 2 domains) **AND its grant is big
> enough** — and that second clause is the one §1 earned: **a floor-0 board needs +2, because a +1
> lands on Might 1 and 143.2.a still kills it on 1 damage.** Ten protection cards, folded by
> name+type.

| | count |
|---|---|
| entries with a garrison floor of 0 or 1 | **100** |
| …with at least one usable garrison-wide +Might in their own identity | **97** |
| …with none | **3** |

Usable options per entry: 0→3 · 1→7 · 2→2 · 4→1 · 5→21 · 6→11 · 7→18 · 9→27 · 10→10. **The median
exposed entry can reach seven of the ten.**

### All three of the three were read, and none is a defect

All three are floor **0** and all three stand on `UNL-081 Keeper of Masks`, whose Reflections are
Might 0 by 187.6 with R27 — so each needs a +2, and the +2 cards are chaos or fury, a third domain
for a calm/mind or body/mind line.

- **`keeper-of-masks-flurry-of-blades-centaur-simultaneous-fodder`** (ENGINE, body/mind) — **the
  bodies are DELIBERATE FODDER.** Its own step 4 plays `OGN-133 Flurry of Blades` **itself**, and step
  5 says *"143.2.a kills Keeper of Masks at Might 1 and both Reflections at Might 0"* — feeding three
  `UNL-068 Spectral Centaur` triggers to put him at Might 11. **Being killed by a 1-damage sweep is
  what this line is FOR.** No predicate reading Might can see that, and the entry is correct.
- **`petal-pixie-keeper-of-masks-might-wall`** (ENGINE, calm/mind) — the wall is **designed to be
  temporary**: its own `terminatesIn` says *"the wall dies at the start of your own Beginning Phase
  before scoring (816.1.b) and the legend rebuilds one body of it every turn"*. Losing it early costs
  a turn of wall, not the line.
- **`keeper-of-masks-flurry-plaza-window`** (ALT_WIN, calm/mind) — genuinely exposed with no
  in-identity repair, **and it already carries the correction** (2026-09-13), which says in its own
  words that the named repair does nothing on a board of Reflections.

**So the honest catalogue-wide answer is 97 of 100 answered, 2 of the remaining 3 not exposed in the
first place, and 1 already corrected — nothing owed.** My first count said three entries had no
answer; reading all three turned a three-defect list into a zero-defect one, which is this project's
own rule arriving for the fourth time in one lane: **sample the top hits and ask which sanctioned
exception you forgot.** Here the exception is one no numeric predicate can ever encode — **an entry
whose bodies are meant to die.**
