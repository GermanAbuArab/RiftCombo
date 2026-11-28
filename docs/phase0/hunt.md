# Riftbound combo hunt — 920 cards read, 48 candidates proposed, 7 survived, 41 refuted

Method: full read of `corpus_flat.txt` (920 cards + header) and `rules-primer.md`, then
exhaustive keyword indexing of the loop primitives (point grants, ready effects, `[Add]`
abilities, trigger multipliers, copy effects, per-turn limiters, non-exhaust activated
abilities). Pass 2 attacked every candidate; default verdict was REFUTED.

---

## 0. Three structural facts that decide almost every candidate

**0.1 — Every legend in the game has exactly TWO domains.** I enumerated all 49 legends:
`awk -F' | ' '$3=="Legend"' | sort` returns 49 rows, every domain string 2 characters long
(BC, BF, BM, BO, CC, CF, CM, CO, FM, FO, MO). Under rule 103.1.b a card's domains must be a
subset of your Champion Legend's. **Therefore any combo spanning three distinct domains is
illegal, full stop.** This alone kills a large fraction of otherwise-working lines.

**0.2 — There is no net-positive repeatable resource engine in the card pool.** Proof by
enumeration:
- Every repeatable ability is gated by one of: (a) exhausting a permanent, (b) an explicit
  "once each turn" / "the first time … each turn", (c) a resource cost, or (d) a
  Conquer/Hold trigger (which rule 470 caps at once per battlefield per turn).
- The only reset for (a) is the Awaken Phase (415.3.a) or a ready effect.
- Every ready effect in the pool is itself gated by (a), (b), (c), or is a one-shot spell.
  The single exception is the ability **Dominus (VEN-142)** grants — `[A][A]: Ready me` —
  which is neither exhaust-gated nor once-per-turn. It costs **2 Power**.
- The best repeatable Power producer costs one exhaust and yields **1** Power (the six Seals,
  Gold tokens), or **2** Power plus the sacrifice of a friendly permanent
  (**Malzahar, Fanatic OGN-113**).
- So: readying costs ≥2 Power; the readied permanent produces at most 2 Power and eats a
  permanent doing it. **Best case is break-even with a permanent consumed each iteration.**
  No loop can be resource-positive.
- Ramp cannot rescue this: the Rune Deck is exactly 12 cards (161.2.a) and 430.3 says
  "if there aren't sufficient runes … channel as many as possible." **Rune ramp is hard-capped
  at 12.** Every "infinite channel" line dies here.

**0.3 — Consequently there are NO infinite loops in this pool.** What does exist is a family
of **bounded multiplicative point bursts** that clear the 8-point Victory Score in one or two
scoring events, plus two **alternate win conditions** and one genuinely **recursive spell**.
Those are section A. The engine that would win via an unbounded point ability
(**Renata Glasc, Mastermind SFD-088**, the pool's only in-turn-repeatable "Score 1 point")
cannot be fed — see B-01.

**0.4 — Corpus caveat on the domain column.** The flattened corpus encodes six domains with
five letters: `C` is used for BOTH **Calm** and **Chaos** (proof: `Seal of Focus OGN-081`
adds `:rb_rune_calm:` and `Seal of Discord OGN-204` adds `:rb_rune_chaos:`, and both are
listed as `C`; the legend pair `CC` = Calm+Chaos). Where domain identity is load-bearing
below I resolved it from the rune symbols printed in the card's own text (Equip/Accelerate/
Add costs), and otherwise from the set's domain-block ordering. Any residual uncertainty is
flagged in the entry.

---

# A) SURVIVED

None of these is an infinite loop. Each is a repeatable-or-multiplicative engine whose every
cost I can pay on every stated iteration. Labels are honest about what each terminates in.

---

## A-01. Ahri, Alluring × Blue Sentinel — multiplied Hold points → WIN
**Terminates in: POINTS (8+ in one Beginning Phase). Bounded burst, not infinite.**
**Confidence: MEDIUM-HIGH.**

| code | name | domain | cost |
|---|---|---|---|
| OGN-066/298 | Ahri, Alluring | Calm | E5/P1, 4 Might |
| UNL-087/219 | Blue Sentinel | Mind | E4/P1, 4 Might |

- Ahri: *"When I hold, you score 1 point."*
- Blue Sentinel: *"Your hold effects for holding here trigger an additional time."*

**Steps (all costs payable every iteration — here, every turn):**
1. Establish and keep Control of one battlefield. Units enter exhausted (143.4); irrelevant,
   Holding requires presence and control, not readiness.
2. Assemble N copies of Ahri and K copies of Blue Sentinel **at that same battlefield**
   ("here" on a unit = that unit's location, 146.1).
3. Reach your Beginning Phase still controlling it → you **Hold** (469.2).
4. The Hold Scores once (470) → +1 point.
5. The Hold fires each Ahri's hold-triggered ability (471.2.b). Each Blue Sentinel present
   adds one additional firing of every one of your hold effects here.
6. Ability-granted points total **N × (1 + K)**. These are *not* subject to the 470 cap —
   194.1.c lists ability points as a separate source and 471.1.a.1 exempts non-Conquer points
   from the Final Point restriction.

**Net per turn: 1 + N×(1+K) points.**
Minimum lethal from 0 points: N=3,K=2 → 1+9 = 10, or N=2,K=3 → 1+8 = 9. **Five units at one
battlefield.** From a realistic 2–3 points already banked, N=2,K=1 (four points/turn) closes.

**Preconditions:** hold one battlefield through a Beginning Phase with 5 specific units on it;
~27 Energy + 5 Power of investment spread across turns.
**Domain Identity:** Calm + Mind → **Nine-Tailed Fox (OGN-255)**, the Ahri legend (Ahri,
Alluring is Calm; Ahri, Inquisitive OGN-119 is Mind — the legend must cover both).

**Attacks I made on it, and why it survived:**
- *Does 471.2.c ("These cannot be triggered more than once per turn for a player") kill it?*
  This is the one real tension. Rule 002 (Golden Rule) — card text supersedes rules text —
  resolves it for Blue Sentinel, whose entire printed function is to add trigger instances.
  Red Brambleback (UNL-029) is printed with identical phrasing for Conquer, confirming this
  is an intended design axis. **This is the single assumption the combo rests on.**
- *Is the extra point capped by 470?* No — 470 caps *Scoring* (Conquer/Hold), not
  ability-granted points.
- *Does Blue Sentinel need to be at the battlefield?* Yes, and I've required it.
- *Do the units need to be ready?* No.

---

## A-02. Tryndamere, Barbarian × Red Brambleback — multiplied Conquer points, MONO-FURY
**Terminates in: POINTS (up to 10 in one attack). Bounded burst, not infinite.**
**Confidence: MEDIUM-HIGH.** Same multiplier axis as A-01, but single-domain.

| code | name | domain | cost |
|---|---|---|---|
| OGN-034/298 | Tryndamere, Barbarian | Fury | E7/P2, 8 Might |
| UNL-029/219 | Red Brambleback | Fury | E4/P1, 4 Might |

- Tryndamere: *"When I conquer after an attack, if you assigned 5 or more excess damage to
  enemy units, you score 1 point."*
- Red Brambleback: *"Your conquer effects for conquering here trigger an additional time."*

**Steps:**
1. Opponent controls a battlefield with a small garrison (ideally one unit).
2. Standard-Move Tryndamere + K Red Bramblebacks from your base to that battlefield
   (144.4 permits base→battlefield). **They must be MOVED, not played** — 806.3/813.3.a:
   units may only be *played* to your base or a battlefield you control, so Brambleback
   cannot be played onto the enemy's battlefield. Moving makes them Attackers.
3. Contested → Showdown → Combat.
4. Combat Damage step: your summed Might (8 + 4K) is assigned to the defender(s). Rule
   465.2.c.4 forbids over-assigning *only while other units remain to receive damage*; with
   one small defender all of it lands on it. Against a 2-Might defender with K=2 you assign
   16, of which **14 is excess** — the "5 or more excess" clause is met comfortably.
5. You Establish Control → **Conquer** (466.5.d) → +1 point (470 cap).
6. Tryndamere's conquer ability fires **1 + K** times.

**Net per attack: 1 + (1+K) points, times the number of Tryndameres present.**
K=2 with one Tryndamere = 4 points. Two Tryndameres + 2 Bramblebacks = 7. Three + 2 = 10.
Duel has 2 battlefields (485.4) and 470 is *per battlefield*, so this can be done twice a turn.

**Domain Identity:** both Fury. Mono-Fury is a subset of any Fury legend's domains — e.g.
**Relentless Storm (OGN-249, BF)**, **Purifier (SFD-183, BF)**, **Hand of Noxus (OGN-253, FO)**.
This is the cheapest domain requirement of any survivor here.

**Attacks:** the "5+ excess damage" clause looks like the designed brake, but it is trivially
met by a high-Might attacker against a thin garrison — it only fails when the defender has
enough bodies to soak assignment. The real cost is Tryndamere at E7/P2.

---

## A-03. The Grand Plaza + Recruit the Vanguard — alternate WIN, MONO-ORDER
**Terminates in: WIN (rule 195, immediate). Not a loop — a 2-card assembly.**
**Confidence: HIGH on rules, MEDIUM on practice.**

| code | name | type | cost |
|---|---|---|---|
| OGN-293/298 | The Grand Plaza | Battlefield (domainless) | — |
| OGS-015/024 | Recruit the Vanguard | Spell, Order | E6 |
| SFD-168/221 | Vanguard Armory | Gear, Order | E7/P1 (optional 3rd piece) |
| SFD-179/221 | Corina Veraza | Unit, Order | E7/P1 (optional 3rd piece) |

- Grand Plaza: *"When you hold here, if you have 7+ units here, you win the game."*
- Recruit the Vanguard: *"Play four 1 Might Recruit unit tokens. (They can be played to your
  base or to battlefields you control.)"*

**Steps:**
1. Control The Grand Plaza.
2. Cast Recruit the Vanguard, placing all four Recruits **at The Grand Plaza**. Repeat next
   turn (or add Vanguard Armory's `exhaust: play three Recruits`, or move Corina Veraza in
   for three more) until you have **7+ units there**.
3. Survive to your Beginning Phase still controlling it → Hold → **win the game**
   (rule 195: "A player also wins the game if an effect instructs them to do so" — immediate,
   no cleanup wait).

**Preconditions / Domain Identity:** mono-Order; any Order legend. Grand Plaza is domainless.
**The real constraint is battlefield selection:** you bring 3 battlefields and only one is
used. In **1v1 Duel it is chosen RANDOMLY** (485.5) → 1/3. In **1v1 Match you SELECT it**
(486.5) → guaranteed for game 1. This combo is a Match-format card.
**Attacks:** Recruits are 1 Might and die to any sweeper (Flurry of Blades OGN-133, Tibbers
OGS-018, The Ruination UNL-180); the opponent gets a full turn between assembly and the Hold.
Contesting the battlefield also breaks it. Fragile, but the rules text is unambiguous.

---

## A-04. Gutter Palace — self-enabling alternate WIN, MONO-MIND
**Terminates in: WIN. Not a loop — a 1-card assembly.**
**Confidence: HIGH on rules.**

| code | name | type | cost |
|---|---|---|---|
| UNL-088/219 | Gutter Palace | Gear, Mind | E4 |

*"At the start of your Beginning Phase, if you have exactly 4 cards in hand and exactly 4
units at battlefields, you win the game. Discard 1, exhaust: Play a 1 Might Bird unit token
with [Deflect]."*

**Why it survives scrutiny:** the second ability tunes **both** counters at once — `Discard 1`
takes hand size down by one and the Bird takes units-at-battlefields up by one (a unit token
with no printed location may be played to your base *or* a battlefield you control). So a
hand of 5 and 3 units at battlefields becomes 4/4 with a single activation. Gear enters ready
(149.1), so it is live the turn it lands.

**Steps:** on your turn, play cards / activate Gutter Palace until you are at exactly 4 cards
in hand and exactly 4 units at battlefields. Pass. At the start of your next Beginning Phase
the passive checks and you win.
**Domain Identity:** mono-Mind; any Mind legend.
**Attacks:** the opponent has one full turn to break either count. Riftbound has very few ways
to force an opponent to draw, which makes the hand count more robust than it looks; killing
one of your four units is the realistic answer. Note the check happens *at the start of* your
Beginning Phase — [Temporary] deaths (816.1.b) also resolve at that point, so do not count
Temporary units toward the four.

---

## A-05. Death from Below — genuinely recursive removal spell
**Terminates in: UNBOUNDED REPEATABLE REMOVAL, bounded by Power and by targets. No kill.**
**Confidence: HIGH.**

| code | name | type | cost |
|---|---|---|---|
| UNL-186/219 | Death from Below | Spell, Chaos+Fury | E4/P1 |

*"Kill a unit at a battlefield. Then, if it had 3 Might or less, you may play this from your
trash for `[A]`."*

**Why this one really recurs:** it is **not** the Flow keyword. Flow (829.1.b) is
*"play this from your trash for its flow cost. Then banish it"* — self-limiting. Death from
Below has bespoke text with **no banish clause**, so after resolving it goes to the trash
normally (rule 157) and is available to be played from the trash again.

**Steps, per iteration:**
1. Pay `[A]` (1 universal Power). Play Death from Below from your trash.
2. Kill a unit at a battlefield. (Mandatory — you need a legal target each time.)
3. If that unit had ≤3 Might, the card grants permission to play it from the trash again.
4. Spell resolves → goes to trash. Return to step 1.

**Net per iteration: −1 Power, −1 unit with ≤3 Might located at a battlefield.**
**Why it is not infinite:** it consumes a target and a Power every loop, and produces nothing.
Against a token board it is a devastating repeatable sweeper for 1 Power a body; it is never a
resource engine.
**Domain Identity:** Chaos + Fury → **Loose Cannon (OGN-251)**, **Glorious Executioner
(SFD-185)**, **Bloodharbor Ripper (UNL-185)**, **Rogue Assassin (VEN-139)**,
**Master of Shadows (VEN-143)**, **Dark Child (OGS-017)**.
**Rider:** pair with **Vicious Snapjaws (UNL-129, Chaos — "When another friendly unit dies,
gain 1 XP")** and feed it your own Recruit tokens to convert Power+bodies into XP at 1 Power
each. XP has no cap (rule 733) but no win attached to it either; the highest printed threshold
is Level 16 on Master Yi, Unstoppable (UNL-059).

---

## A-06. Svellsongur text-doubling on a Hold-point unit — MONO-CALM
**Terminates in: POINTS. Bounded. Confidence: MEDIUM (one rules reading is load-bearing).**

| code | name | type | cost |
|---|---|---|---|
| SFD-059/221 | Svellsongur | Gear (Equipment), Calm | E3/P1, Equip `E1 + Calm` |
| OGN-066/298 | Ahri, Alluring | Unit, Calm | E5/P1 |

Svellsongur: *"As this is attached to a unit, copy that unit's text to this Equipment's effect
text for as long as this is attached to it."*

**Mechanism:** rule 718.3 — an Attached card's **Effect Text is appended to the Top-Most card's
Rules Text**. So Svellsongur's effect text (a copy of Ahri's text) is appended to Ahri, giving
Ahri *"When I hold, you score 1 point"* twice. Each additional Svellsongur adds another
instance. Deck limit 3 → **4 point-triggers on one Ahri**; two Ahris so equipped = 8 points
per Hold.
**Domain Identity:** Svellsongur's Equip cost prints `:rb_rune_calm:` → it is a **Calm** card.
Ahri, Alluring is Calm. **Mono-Calm** — the cleanest domain requirement of the multiplier
combos, and it stacks with A-01 under Nine-Tailed Fox.

**Why I only rate this MEDIUM:** rule 718.2 makes an Attached card's *printed Rules Text*
Inactive, which would switch off Svellsongur's own copy instruction. It survives on **725.1**:
*"If an Attached card has a Passive or Replacement ability that applies during the process of
Attaching … that text exists and can be processed as it Attaches."* Svellsongur's ability is
phrased "**As** this is attached" — exactly that carve-out — and the effect it creates is
explicitly durational ("for as long as this is attached"). I believe this works, but it is the
kind of interaction that wants an official ruling.
*(An aggressive reading — each new Svellsongur copies Ahri's* current *Rules Text, including
prior copies, giving 2→4→8 — would be exponential. I do not claim it; the conservative
additive count above is what I'd stake the combo on.)*

---

## A-07. Ekko, Recurrent + Malzahar, Fanatic — one-shot mass rune refill, MONO-MIND
**Terminates in: a large one-shot RESOURCE BURST (up to 12 runes readied). NOT a loop.**
**Confidence: HIGH on the interaction, and it is explicitly NOT repeatable.**

| code | name | type | cost |
|---|---|---|---|
| OGN-110/298 | Ekko, Recurrent | Unit, Mind | E5/P1, 5 Might |
| OGN-113/298 | Malzahar, Fanatic | Unit, Mind | E4, 3 Might |

Ekko: *"[Deathknell] — Recycle me to ready your runes."*
Malzahar: *"Kill a friendly unit or gear, exhaust: [Action] — Add `[A][A]`."*

**Steps:** Malzahar exhausts and kills Ekko as its cost → **+2 universal Power**; Ekko's
Deathknell readies **all** your runes → up to **+12 resources**. Net swing on a board of 8+
runes: roughly +10 resources for a card you already paid for.
**Domain Identity:** both Mind; any Mind legend. Adding **Karthus, Eternal (OGN-236, Order —
"Your Deathknell effects trigger an additional time")** needs an MO legend and is redundant
here (the second trigger readies already-ready runes).
**Why it can never loop — and this is a designed guard:** Ekko's Deathknell says **Recycle
me**, and Recycle puts the card on the **bottom of the Main Deck** (416.1/416.5), *not* in the
trash. Every reanimation effect in the pool (The Harrowing OGN-198, Soulgorger OGN-196,
Heedless Resurrection UNL-142, Glasc Mixologist SFD-165) reads *from your trash*. Ekko
deliberately puts himself out of reach. Three copies = three rituals, ever.

---

# B) REFUTED

Every candidate I killed, with the rule number or arithmetic that killed it.

### The point-engine family

**B-01. Renata Glasc, Mastermind (SFD-088) as an infinite point outlet — REFUTED (arithmetic).**
She is the pool's *only* in-turn-repeatable "Score 1 point" and therefore the only true
infinite-point outlet. Cost per point: **4 Energy + 4 Mind Power + exhaust**, and only while
she is at a battlefield. To win from 0 you need 8 activations = **32 Energy + 32 Mind Power +
7 readies of Renata, in one turn.** Maximum realistic resources in a turn is ~12 (one per
rune, capped by the 12-card Rune Deck at 161.2.a). That is a **~5× shortfall on resources
before you even pay for the readies**, and per §0.2 no ready effect is free. Dead.

**B-02. Renata + Shurelya's Requiem (SFD-192) bounce-ready loop — REFUTED (arithmetic).**
Shurelya's *"When you play this, ready your units"* + a bounce (Pack of Wonders OGN-181, used
by **Heimerdinger, Inventor OGN-111** so that a *unit* — which Shurelya's can re-ready —
pays the exhaust) is a genuine unbounded ready engine. It costs **4E + 2P per cycle**. Renata
costs 8 more per point. **14 resources per point × 8 = 112 resources in one turn** against a
~12 ceiling. Also Shurelya's is [Unique] and Pack of Wonders is Chaos while Heimerdinger and
Renata are Mind — survivable only if Shurelya's `CM` is Chaos+Mind, which is unresolved.

**B-03. Yasuo, Windrider (OGN-205) infinite points via zone-reset — REFUTED (cost).**
*"The third time I move in a turn, you score 1 point."* Rule 383.1 makes "the Nth time" fire
exactly once, so moves 4/5/6 give nothing. Rule 124 *does* reset the counter if he changes
zones (bounce + replay = a new object), so this is technically uncapped. But one point costs:
three moves (each Standard Move exhausts him, 144.2, so two readies are needed — e.g. two
Ride the Wind OGN-173 at 2E/1P each) **plus** a bounce **plus** replaying him at E5/P1.
≈10 resources and three cards per point, worse than just conquering. Dead on cost.

**B-04. Reckoner's Arena (OGN-286) + Nasus, Ascended (VEN-046) — REFUTED (cost).**
Reckoner's *"When you hold here, activate the conquer effects of units here"* legitimately
fires Conquer abilities on a Hold, and Blue Sentinel doubles it (the battlefield's abilities
are yours, 190.6). Nasus Empowered scores 1 on conquer. But Nasus is **E8/P1 to play plus
Empower 8 Energy = 16 Energy per body.** Two of them is 32 Energy. Ahri, Alluring does the
same job for E5/P1 with no Empower tax (A-01). Strictly dominated.

**B-05. Mirror Image (UNL-200) copying Ahri, Alluring — REFUTED (two guards).**
(i) The Reflection token is played **to your base**, and Hold triggers only fire for units at
the held battlefield. (ii) The token is given **[Temporary]**, which rule 816.1.b kills *"at
the start of its controller's Beginning Phase, **before scoring**."* It is in the trash before
the Hold happens. Two independent designed guards on one card.

**B-06. Keeper of Masks (UNL-081) self-copy chain — REFUTED (explicit token text).**
*"Play two Reflection unit tokens here. They become copies of me."* The Reflection token
(UNL-T06) is printed *"I become a copy of something when played. **I don't get that card's
play effects.**"* The copies never re-trigger the play ability. Chain length 1.

**B-07. Zilean, Time Mage (UNL-086) token doubling — REFUTED (rule 371.1).**
*"**Once each turn**, if you would play a token unit … play that token and an additional copy
of it instead."* Rule 371.1: a "once each turn" replacement may be applied to exactly that many
events per turn. +1 token per turn, period. (Rule 124 would reset it on a zone change, but
re-buying Zilean at E5/P1 to duplicate one 1-Might Recruit is absurd.)

**B-08. Power Nexus (SFD-214) `4×[A]: score 1 point` — REFUTED (rule 470 gate).**
The ability is attached to *"When you hold here"*, and Hold is capped at once per battlefield
per turn (470). One extra point per turn, for 4 Power.

**B-09. Bottled Constellation (VEN-067) — REFUTED (timing window).**
*"**At the start of your Main Phase**, you may kill 3 other friendly units and/or gear to
score 1 point."* One window per turn, and it eats three permanents.

**B-10. Draven, Audacious (SFD-148) / Lucian, Merciless (SFD-113) — REFUTED ("first time each turn").**
*"The **first time** I win a combat each turn, you score 1 point"* / *"The **first time** I
conquer each turn, ready me."* Hard once-per-turn limiters. Draven additionally *gives the
opponent a point* when he dies in combat.

**B-11. Forcing opponent Burn Out for points — REFUTED (no repeatable mill + self-repair).**
Rule 431.2.c gives a point to a chosen opponent (in Duel, forced: you), and 431.3.a says
repeated Burn Out loops points until someone wins. But (i) there is no repeatable
opponent-mill in the pool — Blade Twirler (VEN-002) is "the first time I move each turn,
Burn 1"; Kharox (VEN-114) is a one-shot Burn 3 on becoming Empowered — and (ii) rule 431.2.b
makes the burning-out player **recycle their trash back into their Main Deck**, so milling
them actively refills their deck. Self-defeating.

### The resource-engine family

**B-12. Hextech Anomaly (SFD-083) + Ancient Henge (SFD-117) — REFUTED (1:1, no net gain).**
*"Pay any amount of `[A]` to Add that much Energy"* and *"Pay any amount of Energy to Add that
much `[A]`."* This is exactly the Power↔Energy 1:1 trap. Zero net gain per round trip, and each
gear exhausts once anyway, so it is at most one conversion each per turn.

**B-13. Jhin, Murderous Artist (UNL-022) move-for-mana loop — REFUTED (arithmetic).**
*"[Ganking] When I move, Add `[1][A]`."* A Standard Move costs exhausting Jhin (144.2), so each
activation yields +1 Energy +1 Power for one exhaust. To loop you must ready him for under
that. Cheapest non-exhaust-gated repeatable ready in the game is Dominus's granted
`[A][A]: Ready me` = **2 Power**. Net per cycle: **+1 Energy, −1 Power.** Power is the binding
resource. Also Jhin is Fury and Dominus is Body+Fury, which is legal — the arithmetic is what
kills it, not the domains.

**B-14. Dominus (VEN-142) + any Add-unit — REFUTED (arithmetic and/or §0.1).**
Dominus grants *"`[A][A]`: Ready me"* — the pool's only ungated repeatable ready. I checked
every unit with an exhaust-to-Add ability against it:
- **Dragonsoul Sage (UNL-093, Body, `exhaust: Add [1]`)** — domain-legal under a BF legend.
  +1 **Energy** for −2 **Power**. Net negative, and Energy cannot pay Power costs (163).
- **Lux, Crownguard (OGS-014, Order, `exhaust: Add [2]`)** — Order + Body + Fury = **three
  domains, illegal (§0.1)**. And 2 Energy for 2 Power is still a downgrade.
- **Malzahar, Fanatic (OGN-113, Mind, `exhaust: Add [A][A]`)** — Mind + Body + Fury =
  **three domains, illegal**. And it is exactly break-even on Power while eating one friendly
  permanent per iteration.
- **Xerath, Freed (UNL-026, Fury)** — domain-legal, but its output is *damage*, and there is
  no life total; damage is not a win condition.
- **Renata Glasc, Mastermind (SFD-088, Mind)** — Mind + Body + Fury = **three domains, illegal.**
Additionally Dominus reads *"**This turn**, double a unit's Might and give it …"* — the granted
ability expires at end of turn and the Rune Pool empties then anyway (167), so even a
break-even loop is turn-scoped.

**B-15. Malzahar, Fanatic sacrifice engine — REFUTED (single exhaust + fodder famine).**
`Kill a friendly unit or gear, exhaust: Add [A][A]` is the best Add in the game, but Malzahar
exhausts once. Heimerdinger (OGN-111) copying the ability gives you a *second* activation, not
an *n*th. Every fodder generator is gated: Herald of the Arcane (OGN-265) and Vanguard Armory
(SFD-168) exhaust; Ultrasoft Poro (UNL-160) exhausts; Faithful Manufactor (OGN-211) and
Machine Evangel (OGN-239) are play/death triggers.

**B-16. Malzahar + Honest Broker + Karthus + Renata Industrialist Gold burst — REFUTED (one-shot).**
Malzahar kills Honest Broker (SFD-155, Order, Deathknell → Gold token); Karthus (OGN-236,
Order) doubles the Deathknell → 2 Golds; Renata Glasc, Industrialist (SFD-171, Order, *"Your
tokens enter ready"*) would let them tap immediately for `[A]` each. Domain Mind+Order = legal
under an MO legend. But this is a **~4-Power one-shot**: Malzahar is exhausted, Honest Broker
is dead, and there is no way to do it again. Not a loop.

**B-17. Treasure Hunter (SFD-130) Gold-token engine — REFUTED (two gates).**
*"When I move, play a Gold gear token exhausted."* (i) The Gold enters **exhausted**, and its
own ability is *"Kill this, exhaust: Add `[A]`"* — an already-exhausted object cannot be
exhausted again (414.1.b/414.4), so the token is inert the turn it arrives. Renata Glasc,
Industrialist might override this (see §B-24). (ii) Even granting that, Treasure Hunter's move
exhausts *him*, and readying him costs ≥2 Power for a 1-Power token. Net negative. Also
Treasure Hunter is Chaos and Renata Industrialist is Order — legal under a CO legend, so the
domains were not the problem.

**B-18. Pit Crew (OGN-091) free-ready engine — REFUTED (nothing to spend the ready on).**
*"When you play a gear, ready me"* is the pool's only genuinely free, unlimited-per-turn ready
trigger, and playing a **Gold gear token counts** (tokens can be Played, 350.2). But **Pit Crew
has no exhaust ability of its own** — a ready Pit Crew can only Standard Move. There is no
"when you play a gear, ready *another unit*" effect; the closest is Jayce, Brilliant Inventor
(VEN-068), which is double-gated: *"the **first time** you play a **non-token** gear each turn."*
Both guards exist specifically to stop this.

**B-19. Acceleration Gate (VEN-150) rune-ready loop — REFUTED (break-even, and it's a spell).**
*"Ready up to 4 units, gear, and/or runes"* for **E3/P1** = 4 resources spent for at most 4
readied runes = 4 Energy back (basic rune: `exhaust: Add [1]`). Exactly break-even on count and
strictly worse in kind (you spend 1 Power, you get back Energy). It is also a spell that goes
to the trash — one use.

**B-20. Sona, Harmonious (OGN-073) rune engine — REFUTED (timing).**
*"ready 4 friendly runes **at the end of your turn**."* Rule 167: the Rune Pool empties at the
end of your turn, so nothing tapped then is spendable. And 415.3.a readies all your permanents
in the Awakening Phase anyway. The only value is holding up Reaction mana on the opponent's
turn — not an engine.

**B-21. Any infinite rune ramp — REFUTED (hard cap, 161.2.a + 430.3).**
The Rune Deck is exactly 12 cards, and 430.3 says channel as many as possible when short.
Every Channel effect in the pool (Catalyst of Aeons OGN-138, Mobilize OGN-134, Soaring Scout
OGN-216, Tasty Faefolk OGN-075, Aphelios SFD-049, Startipped Peak OGN-288, The Papertree
SFD-219…) is bounded by this ceiling. No ramp loop is possible in principle.

**B-22. Jax, Unrelenting (SFD-119) Equip-draw loop — REFUTED (arithmetic + Burn Out).**
*"When you attach an Equipment to me, you may pay `[1]` to draw 1."* No once-per-turn limit,
and Equip abilities are activated abilities with **no exhaust cost**, so they are repeatable.
But rule 434.1.h: attaching a card to its **current** Top-Most Card does nothing. So each draw
requires moving the Equipment **off** Jax and back = **2 Equip activations (2 Power) + 1
Energy per card**. Three resources a card, and it terminates in **Burn Out (431)**, which hands
the opponent points — an anti-win.

**B-23. Aphelios, Exalted (SFD-049) attach engine — REFUTED (explicit 3-mode cap).**
*"When you attach an Equipment to me, choose one **that hasn't been chosen this turn**."*
Three modes → at most three triggers per turn. The best mode (Ready 2 runes for a 1-Power
Equip cost) is net +1 resource — once.

**B-24. Renata Glasc, Industrialist (SFD-171) unlocking exhausted Gold tokens — UNRESOLVED, and moot.**
*"Your tokens enter ready"* vs. a creating effect's *"play a Gold gear token **exhausted**"*
(permitted by 184.1) is a genuine collision of two entry-modifying replacements. Rule 372 lets
the controller of the affected object order them, and you control both — which argues for
"ready". I could not resolve it from the primer, so I treat it as **UNVERIFIED**. It is moot
regardless: every Gold generator in the pool is exhaust-gated or trigger-gated (B-17), so
readiness never converts into a loop.

### Ready / bounce / recursion family

**B-25. Shurelya's Requiem (SFD-192) + Pack of Wonders (OGN-181) + Heimerdinger (OGN-111) — REFUTED (cost).**
Mechanically sound and genuinely unbounded: Heimer, who *"has all exhaust abilities of all
friendly legends, units, and gear,"* uses Pack of Wonders' bounce by exhausting **himself** (a
unit), Shurelya's re-entry readies your **units** including Heimer, repeat. But each cycle
costs **4E + 2P** and produces only "ready your units." No unit's exhaust ability yields
6 resources, so the loop can only ever destroy value. Refuted on arithmetic, not legality.

**B-26. Heimerdinger, Inventor (OGN-111) as a combo hub — REFUTED (one exhaust).**
He *has* every friendly exhaust ability, but he only has **one exhaust to spend**. He is a
second copy of your best exhaust ability, never an engine. (He also inherits Gold's *"Kill
this"* clause, which would kill Heimer himself.)

**B-27. Simian Ancestor (SFD-047) buff-ready loop — REFUTED (rule 702.3).**
*"When you buff me, ready me."* Rule 702.3: *"There can only be one Buff on a Unit at a time.
If a Buff is added on a Unit that already has a Buff, **it is not placed instead**."* The
buff action does not occur, so the trigger never fires a second time until the buff is spent.
Every buff *source* (Blind Monk OGN-257, Arena Bar OGN-124, Lee Sin Ascetic OGN-078,
Mistfall OGN-152) is exhaust-gated, and legends ready only at Awaken.

**B-28. Mistfall (OGN-152) / Blade Dancer (SFD-195) / Matriarch of War (VEN-153) ready engines — REFUTED (exhaust + no legend ready).**
All three read "…and exhaust this/me: ready …". Legends ready only in the Awakening Phase; the
only ways to re-ready a legend are Hall of Legends (SFD-210, on conquer — once/turn), Royal
Entourage (SFD-039, a play trigger), and Blade Dancer's own *"When you conquer, pay `[1]` to
ready me"* (once/turn). One extra ready per turn, never a loop.

**B-29. Sprite Fountain (UNL-078) + Karthus (OGN-236) — REFUTED (no repeatable gear kill).**
*"[Deathknell] — Repeat this gear's play effect"* doubled by Karthus gives 2 Sprites — on one
death. The Fountain is then in the trash. Acceptable Losses (OGN-179) and Salvage (OGN-224)
are one-shot spells; there is no free repeatable friendly-gear kill.

**B-30. Time Warp (OGN-122) extra-turn loop — REFUTED (self-banish).**
*"Take a turn after this one. **Banish this**."* Banishment (108.6/427) is out of reach of
every recursion effect in the pool, all of which read from the trash. Promising Future
(OGN-115) can find a copy from your deck, but deck limit is 3, so extra turns are capped at 3.
Rebuttal (VEN-152) and Mystic Reversal (OGN-080) can steal a spell, but Rebuttal caps at
Energy cost 4 and Time Warp costs 10.

**B-31. Flow spells as recursion loops — REFUTED (keyword 829.1.b).**
Flow is *"play this from your trash for its flow cost. **Then banish it.**"* Every Flow spell
(Brittle Steel VEN-003, Perfect Execution VEN-012, Dredge Up VEN-049, Onslaught VEN-081,
Lightning Rush VEN-156, Public Execution VEN-154, Shadow Dash VEN-148, …) gets exactly one
extra use, ever. This is precisely why **Death from Below (A-05)**, which is *not* Flow, is
the one recursive spell that works.

**B-32. Death from Below + Honest Broker Gold fodder — REFUTED (§0.1, three domains).**
Feeding Honest Broker (Order, Deathknell → Gold) to Death from Below (Chaos+Fury) to
manufacture Power would need Chaos + Fury + Order. **Three domains, no legend covers it.**

**B-33. Super Mega Death Rocket! (OGN-252) / Ravenbloom-style trash returns — REFUTED (conquer gate).**
*"When you conquer, you may discard 1 to return this from your trash to your hand."*
Conquering is once per battlefield per turn (470). One return per turn, and it costs a card.

**B-34. Dancing Grenade (UNL-020) — REFUTED (no life total + hot potato).**
*"Its controller may play this spell again for `[A]`."* "Its controller" is the controller of
the *damaged unit* — you hand the escalation to your opponent. And escalating damage is not a
win condition: **there is no life total; you win at 8 points.**

**B-35. Unbounded Might (Pirate's Haven OGN-143, Irelia Fervent SFD-057, Spectral Centaur UNL-068, Lee Sin Ascetic OGN-078) — REFUTED (Might is not a win condition).**
All of these grow arbitrarily large with enough readies/deaths/buffs. Might only converts to
points through Conquer/Hold, which rule 470 caps at once per battlefield per turn. A 400-Might
unit scores exactly the same point as a 6-Might one.

**B-36. Fiora, Worthy (SFD-180) + a "becomes Mighty" flicker loop — REFUTED (threshold arithmetic + §0.1).**
*"When a unit you control becomes [Mighty], you may pay `[Order]` to ready it."* Rule 709 makes
this a threshold **crossing** (Might <5 → ≥5), so a unit already at 5+ never re-triggers; you
must drop it below 5 and back each iteration. The cheapest repeatable −Might/+Might pair costs
more than the ready is worth, and the classic attempt — **Malzahar, Fanatic (3 Might) +
Garen, Commander (OGS-013, "Other friendly units have +1 Might here") = 4 Might, which never
reaches 5** — fails on arithmetic before it fails on anything else. Malzahar is Mind while
Fiora and Garen are Order, so it would also need an MO legend.

**B-37. Grand Duelist (SFD-205) / Relentless Storm (OGN-249) "becomes Mighty" ramp — REFUTED (legend exhaust + rune cap).**
Both read "…you may **exhaust me** to channel 1 rune exhausted." One per turn (legends ready
only at Awaken), and bounded by the 12-card Rune Deck (§B-21).

**B-38. Gardens of Becoming (UNL-213) XP engine — REFUTED (cost per cycle, and XP doesn't win).**
*"Units here have 'exhaust: Gain 1 XP.'"* Free XP once per unit per turn; re-readying the whole
board via B-25 costs 4E+2P per cycle. Even granting unbounded XP, **XP is not a win condition**
— the highest printed use is Level 16 on Master Yi, Unstoppable (UNL-059), and Level abilities
are static bonuses, not points.

**B-39. Repeat-cost reduction infinites (Marai Spire SFD-211, Temporal Portal SFD-078, The Academy UNL-216, Syndra UNL-146) — REFUTED (rule 820.1.c.3).**
*"Each Repeat Cost can be paid only a single time."* Repeat at most **doubles** a spell,
regardless of how cheap you make the cost. Marai Spire can zero out a `[Repeat] [1]` cost
(Blood Rush SFD-003) — for one free repeat, not many.

**B-40. Virtuoso (UNL-181) channel engine — REFUTED (arithmetic).**
*"…if there are four spells banished with me, put each in its trash, channel 4 runes, and
draw 1."* Four spells each costing 4+ Energy = ≥16 Energy invested to channel 4 runes.
Catastrophically negative, and still bounded by the 12-rune ceiling.

**B-41. Karthus, Eternal (OGN-236) Deathknell doubling as a loop core — REFUTED (needs a repeatable free kill, which does not exist).**
Doubling Ferrous Forerunner (SFD-021 → 4 Mechs), Machine Evangel (OGN-239 → 6 Recruits) or
Honest Broker (SFD-155 → 2 Golds) is real value, but each is **one death**. The only free
repeatable sacrifice outlet in the pool is Malzahar, and he exhausts (B-15).

---

## Bottom line

Riftbound's designers gated the loop primitives deliberately and consistently: units enter
exhausted, readies cost more than any Add produces, the Rune Deck is a hard 12, Scoring is
once per battlefield per turn, Flow and Time Warp self-banish, Ekko recycles to the bottom of
the deck instead of the trash, Reflection tokens explicitly skip play effects, and every
legend is capped at two domains. **There is no infinite in this pool.** The real combo space
is *multiplicative*, not *iterative*: **Blue Sentinel** and **Red Brambleback** (and, more
speculatively, **Svellsongur**) multiply a single Score trigger into 3–10 points in one
Beginning Phase or one attack, and **The Grand Plaza** / **Gutter Palace** are assemble-and-win
alternate victory conditions.
