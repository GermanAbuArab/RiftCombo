# Walk — the uncatalogued Order cards

Issue [#180](https://github.com/GermanAbuArab/RiftCombo/issues/180). Session `rc-walk-uncat`.
Successor to [#171](https://github.com/GermanAbuArab/RiftCombo/issues/171), which closed both of
its sub-veins (all 49 legend names and all 64 non-token battlefields catalogued, staged or refused).
Rules version 2026-07-16; card text verbatim from `data/corpus_flat.txt`, every paragraph opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`. Entries staged at `/tmp/rc-walks/rc-walk-uncat.json`.

## 0. The slice and the census

Partition agreed with rc-manager3 on 2026-09-07: **fam1 = Fury/Body/Chaos (#173), fam2 = Calm/Mind
(#174), this walk = Order.** Scope is cards whose domains are a **subset of {order}**.

Measured by **NAME+TYPE** at catalogue 495 (`/tmp/rc-walks/order-census.ts`):

```
mono-Order deckable base codes: 139
uncatalogued by BASE CODE: 51 | by NAME+TYPE: 43 | discount: 15.7%
by type: unit 25, spell 10, gear 6, rune 2      banned/restricted: none
```

Two of the 43 are second printings of each other's names (`OGN-214`/`VEN-R06` Order Rune,
`OGN-245`/`SFD-238` Seal of Unity), so the **distinct-card count is 41**.

> **The base-code-vs-name+type gap is lane-specific and has to be measured.** Four lanes have now
> done it: **19.2%** pool-wide, **15.7%** here, **15%** in Calm/Mind, **0%** in Fury/Body/Chaos,
> **0%** for battlefields. Assuming any one of those numbers in another lane would have been wrong.

Five order-only cards were consumed by rc-walk-fam2's batch 1, written before the split, and are
correctly excluded by this census: VEN-129, VEN-117, VEN-134, VEN-130, UNL-159.

## 1. Entries staged (batch 1, three)

| id | class | cards | what it is |
|---|---|---|---|
| `symbol-of-solari-tie-evacuation` | ENGINE | OGN-227, SFD-176 | a failed attack becomes a mass evacuation |
| `shepherds-heirloom-xp-equip` | ENGINE | UNL-158, UNL-162 | the only [Equip] cost with no Energy and no Power |
| `glowstone-hot-potato-sweep` | ENGINE | VEN-133, VEN-062 | a delayed 5-damage sweep, handed to the opponent |

## 2. "Tie" is a defined term, and it names the exact step the card replaces

**OGN-227 Symbol of the Solari** (Order gear, E1, no [Equip] — a standing permanent):
*"If a combat where you are the attacker ends in a tie, recall ALL units instead. (Send them to
base. This isn't a move. Ties are calculated after combat damage is dealt.)"*

"Tie" reads like exactly the sort of printed term this project files an R-number over. It is
**defined**:

> **740.3.a.** *"A tie occurs when there are units controlled by different players located at a
> battlefield where combat is taking place during **the step 3d of the combat cleanup**."*

And step 3d is **466.1.a.2**'s inserted *"Recall Attackers present at the Battlefield if Defenders
are still present."* So the word *instead* swaps an **attackers-only** recall for an **everyone**
recall, on precisely the step the definition points at. No reading was needed and none is filed.

The consequence is a mass evacuation with no evacuation spell: the enemy garrison, however large,
goes to **their base** (455), the battlefield is unoccupied, 323.6 strips their Control at the next
Cleanup, and **170.11.c's "open" is satisfied on both halves** (unoccupied *and* uncontrolled) — so
the four `355.2.b` "play me to an open battlefield" cards can also land there, not just a walker.

**SFD-176 Xin Zhao, Vigilant** (*"I enter ready if you have two or more other units in your base"*)
is the second body the line needs, and his condition is satisfied **by the evacuation itself**:
458 and 458.1 say a Recall leaves the permanent's statuses unaffected, so your attackers come home
still exhausted and cannot make the walk back — but they *are* two or more other units in your base,
which is exactly what he reads. Neither card was in any entry.

> **Note on 740 generally:** it is the glossary section. The catalogue already cites 740.1.a,
> 740.2.a ("alone"), 740.2.b ("one on one"), 740.2.c ("in combat") and 740.4.a.1 — but **740.3.a
> and 740.4.a.2 / 740.4.a.2.a have never been cited.** The latter pair is the general statement of
> the distinction #171 batch 7 drew card-by-card: *"For triggered abilities, costs within
> instructions that appear in the first part of the trigger effect are paid on finalization … Costs
> within instructions that appear in any later part of the trigger effect are paid on resolution."*
> That is a cleaner citation than 383.3.b + 205 for the same fact.

## 3. An [Equip] cost with neither currency

**UNL-158 Shepherd's Heirloom** (Order gear, E2, M+2): *"When you play this, gain 1 XP.
[Equip] — Spend 1 XP."* Every [Equip] cost string in the corpus, read: **29** are one rune, **six**
are Energy plus a rune, one is UNL-188 Hextech Gauntlets (E3 + rainbow, Energy reduced by Might),
one is SFD-150 Last Rites (a Chaos rune plus recycling two cards) — **and this one, the only cost
containing no Energy, no Power and no card.** It also pays for itself: the play trigger gives the
XP the [Equip] spends, so it is net-zero on XP with no engine at all.

This **refines the scope** of the measurement #171 batch 7 made three days ago — "every [Equip] cost
in the pool containing Energy also contains a rune" is still true, and this card is why the finding
has to be worded about *Energy-bearing* costs rather than about attaches in general.

The XP is a real cost where a deck has [Level] clauses: 730.2 reduces the marked value and 824.1.d
makes a Level ability *"Inactive as soon as the controlling player has less than [N] XP"*.
**UNL-162 Enthralling Protector**'s [Hunt] is the faucet that keeps it positive — and 823.1.b makes
[Hunt] a conquer effect **and** a hold effect, so it banks XP every Beginning Phase you hold.

## 4. A card that is a liability until you give it away

**VEN-133 Glowstone** (Order gear, E2): *"[Empower] :rb_rune_rainbow::rb_rune_rainbow: … Disempower
this, :rb_exhaust:: Choose a player. They gain control of this and recall it. (Send it to their
base.) At the end of your turn, kill this and deal 5 to all units you control."*

The last sentence is unconditional and names no controller but *"you"*, which 191.1 establishes and
the activated ability then **changes**. Left alone it sweeps *your* board at the end of *your* turn;
the ability is the only exit. Neither half pays a Deflect tax — 809.1.c prices choosing a
**permanent** and *"choose a player"* is not one, and the sweep selects programmatically, which
355.10.d excludes from being a target at all. Five damage clears every enemy body of 5 Might or less
**anywhere**, because the clause says *"all units you control"* and not *"here"*.

**VEN-062 Hextech Formula** makes the Empower free: 441.1 defines Empowering as *"the act of
rendering one or more Game Objects Empowered"*, so an ability that Empowers something performs the
act directly and never determines the target's printed [Empower] cost.

### 4.1 A counted set this project has short by two

The recorded list of the pool's **disempowerers** names VEN-035 Sanction, VEN-082 Profiteer,
VEN-099 Tornado Warrior, VEN-054 Questionable Tome, VEN-087 Hextech Disc and the two legends.
A case-insensitive sweep of the corpus for `disempower` returns **nine** card rows:

VEN-035 Sanction (Calm), **VEN-037 Tomb-Raider Barbara (Calm)**, VEN-054 Questionable Tome (Mind),
VEN-082 Profiteer (Body), VEN-087 Hextech Disc (Body), VEN-099 Tornado Warrior (Chaos),
**VEN-127 Lacerate (Order)**, **VEN-133 Glowstone (Order)**, plus the legends that read the *event*.

Three were missing, and **two of the three are Order** — which is why the anchor set of the
"empower-other" family looked smaller than it is. Members named so the count is refutable in one
command.

## 5. Standing notes for CLAUDE.md (Order batch 1)

1. **The base-code-vs-name+type coverage gap is LANE-SPECIFIC**: 19.2% pool-wide, 15.7% Order,
   15% Calm/Mind, 0% Fury/Body/Chaos, 0% battlefields. Measure it, never carry a number across.
2. **740.3.a defines "tie"** — *"units controlled by different players located at a battlefield
   where combat is taking place during the step 3d of the combat cleanup"* — which is exactly
   466.1.a.2's inserted recall step. **OGN-227 Symbol of the Solari** therefore replaces an
   attackers-only recall with an everyone recall: a mass evacuation of any size of garrison, for
   E1, as the price of an attack that was going to fail. 458/458.1 bring your own attackers home
   **exhausted**, so the Conquer needs a body that was not in the combat — SFD-176 Xin Zhao,
   Vigilant reads *"two or more other units in your base"*, which the evacuation itself creates.
3. **740.4.a.2 and 740.4.a.2.a are the general statement of the finalization-vs-resolution rule**
   (a cost in the *first part* of a trigger effect is paid on finalization; one in *any later part*
   on resolution) — cleaner than citing 383.3.b and 205 separately. Never cited in this project.
4. **UNL-158 Shepherd's Heirloom is the only Equipment in the pool whose [Equip] cost contains no
   Energy, no Power and no card** (it is "Spend 1 XP", and the card's play trigger supplies it).
   This refines the scope of the standing measurement, which is about *Energy-bearing* Equip costs.
5. **The pool's disempowerers are NINE, not the six the record names**: the sweep adds VEN-037
   Tomb-Raider Barbara, VEN-127 Lacerate and VEN-133 Glowstone, two of them Order. Members listed
   in §4.1.

---

# Batch 2 — four more Order cards

| id | class | cards | what it is |
|---|---|---|---|
| `seal-of-unity-grand-strategem` | ENGINE | OGN-245, OGN-233 | the Order deck's E0 Power base, and what 3 Power buys |
| `cull-the-weak-loyal-poro` | ENGINE | OGN-209, UNL-156 | 355.10.e's own worked example, made card-neutral |
| `hungry-wolf-eye-of-herald-double-move` | ENGINE | VEN-125, SFD-153, VEN-127 | a second Standard Move for one Order Power |
| `mageseeker-investigator-mass-move-tax` | ENGINE | UNL-163, VEN-118 | the only card in the pool that prices 144.3 |

## 6. Cull the Weak is Riot's own example for 355.10.e

> **355.10.e.** *"It is part of a set of objects chosen in whole or in part by other players. e.g.,
> **"Each player kills a unit they control" does not target.** Each player, including the one who
> played the spell, chooses a unit to kill as the spell or ability resolves."*

**OGN-209 Cull the Weak** is *"Each player kills one of their units."* — the example almost verbatim.
So it pays **no Deflect Value** (809.1.c charges only for choosing), fires no "when this is chosen"
trigger, and reaches a unit sitting at their base that nothing else in Order can touch. The entry
says plainly what it does *not* do: the opponent picks their own casualty, so this is a tax, not
aimed removal.

**UNL-156 Loyal Poro** makes your own half card-neutral. And the reminder it carries is a
**paraphrase of a defined term** — 740.2.a: *"A unit is alone when there are no other friendly
units at the same location."* The condition is on the **Poro's location**, so a second body has to
be standing with it; that is stated as a `zone`/`state` requirement in `uses[]` rather than in prose,
per the #165 discipline.

**355.10.f** is the sibling clause and the two are easy to conflate: an instruction a player *"must"*
complete also targets nothing — which is why OGN-287 Sigil of the Storm's forced rune recycle
(refused in #171 batch 7) chooses nothing either.

## 7. The only card in the pool that prices 144.3

**UNL-163 Mageseeker Investigator**: *"Opponents must pay :rb_rune_rainbow: for each unit beyond the
first to move multiple units to my battlefield at the same time."* That is **144.3** — *"Players may
perform multiple Units' standard move simultaneously. This is treated as one game action performed
on multiple Units"* — the paragraph this walk's own `might-of-demacia-four-body-conquer-draw` is
built on, and 144.4.a.1's cap counts **other players** rather than units, so a Duel otherwise lets a
swarm walk in whole for free. The two entries are the two sides of one rule.

Stated in the entry rather than sold as a lock: it guards **only its own battlefield**, does nothing
against a single arrival, does nothing against a unit *played* rather than moved, and splitting the
move does not dodge the toll so much as reduce the attacker to one body a turn (144.2 + 315.1.b) —
which is what 144.3 exists to avoid in the first place.

## 8. A ready is worth exactly one Standard Move, so it is paired with a mover

**VEN-125 Hungry Wolf** (*"1 Order Power: Ready me and give me +1 Might this turn. Use only if
you've chosen an enemy unit this turn and only once each turn"*) is walked against this project's
own refuse-by-rule bucket for readies: a ready buys **nothing** on defence (neither 464.2.c.3 nor
465.2.b filters by state) and exactly **one extra Standard Move** on offence. So it is paired only
with **SFD-153 Eye of the Herald** (*"When I move, play a 1 Might Recruit unit token here"*), and
the destination restriction is stated rather than glossed: **144.4** allows base↔battlefield only,
and battlefield-to-battlefield needs [Ganking] this deck does not grant — so the double move is
**out and back**, and 359.3.f.2 reads *"here"* at execution, which honestly places the second Recruit
at the base. One of the two is still born **at a battlefield**, which is the bottleneck 13 of the
pool's 49 token-makers answer.

The condition is a **choice**, not a kill: 355.10.d means a programmatically-selected mass effect
satisfies it not at all, so Grand Strategem and its family are no help — **VEN-127 Lacerate**
(E2 + 1 Power, the cheapest Order spell that chooses an enemy unit) is the enabler, and it does real
work while satisfying the clause.

## 9. Standing notes for CLAUDE.md (Order batch 2)

6. **355.10.e's printed example is OGN-209 Cull the Weak's exact wording** — *"Each player kills a
   unit they control" does not target* — so the whole "each player kills one of their units" family
   pays no Deflect (809.1.c prices choosing) and fires no choose-triggers. 355.10.f is the sibling:
   an instruction a player *"must"* complete also targets nothing (OGN-287's forced rune recycle).
7. **740.2.a defines "alone"** — *"A unit is alone when there are no other friendly units at the
   same location"* — so the project can stop sourcing it to the pool's reminder text (SFD-036 Lonely
   Poro, UNL-210 Forbidding Waste). The consequence is unchanged and the citation is better.
8. **UNL-163 Mageseeker Investigator is the only card in the pool that prices 144.3's simultaneous
   move.** 144.3 + 144.4.a.1 (whose cap counts *other players*, 447.2.a) are why a Duel otherwise
   lets a swarm arrive as one free game action; the Investigator charges a rainbow per body beyond
   the first, at its own battlefield only, and only against a *move* — not against a unit played
   there (355.2.b) and not against a single arrival.
9. **OGN-245 / SFD-238 Seal of Unity is the Order deck's Power base**, the counterpart of the Mind
   deck's Seal of Insight: E0 to play, 1 Order Power to make, so it breaks even in a turn and sits
   **outside** 161.2.a's twelve-rune cap — and it is [Reaction] Power, which 415.3.a makes the
   scarce half (a rune exhausted on your turn is dead for all of the opponent's).
10. **A ready is worth one Standard Move and nothing on defence**, so a "ready me" card is only worth
    running beside a payoff that reads *moving*. And 144.4 has no battlefield-to-battlefield leg
    without [Ganking], so a double move is **out and back** unless the deck grants it.

---

# Batch 3 — three more Order cards, and a refusal

| id | class | cards | what it is |
|---|---|---|---|
| `atakhan-harnessed-dragon-sacrifice` | ENGINE | UNL-170, OGN-234 | the fodder is also the removal, and 206 prices it |
| `escaped-grayback-royal-guard-token-empower` | ENGINE | VEN-124, SFD-157 | an Empower cost paid with a token |
| `shen-kinkou-soulspinner-flash-defence` | ENGINE | OGN-241, VEN-123 | bodies that arrive after the attackers are declared |

## 10. 355.10.f is the other half of the untargetable-removal family

**UNL-170 Atakhan**: *"When I attack, the defender **must** kill one of their units here."*

> **355.10.f.** *"It is identified in an instruction that a player 'must' complete. e.g., 'You must
> recycle one of your runes' doesn't target anything."*

So Order has **two** untargetable removal shapes and they are different paragraphs: 355.10.e (a set
*"chosen in whole or in part by other players"* — Cull the Weak, batch 2) and 355.10.f (an
instruction a player *"must"* complete — Atakhan, and OGN-287 Sigil of the Storm's forced recycle).
Both pay no Deflect (809.1.c prices choosing) and both leave the choice with the other player.

The discount is priced on **206**: a cost check reads the **printed** cost, so a Harnessed Dragon
played at a discount still counts its full E8 + 2 Order Power, taking Atakhan from E10 + 3 Power to
**E2 + 1 Order Power**. The Dragon kills a unit on the way in and then pays for the body that forces
a kill on every attack.

## 11. 185.2.d puts tokens *inside* a rule the other token paragraphs keep them out of

**VEN-124 Escaped Grayback**'s [Empower] cost is *"Kill a friendly unit"* — no Energy, no Power.
A token is a legal payment:

> **185.2.d.** *"Tokens have a type. They follow all rules for their type unless otherwise specified.
> Example: A token unit is a unit. It enters exhausted, can take the standard move action, deals
> damage equal to its Might in combat, is destroyed if it takes damage equal to its Might."*

This is the **opposite** side of the line from every token trap this project has recorded: 416.1 is
defined over **cards** and 185 keeps tokens out of it; 186.1 keeps them out of the trash. But
*killing* is defined over **units**, and 185.2.d puts tokens squarely in — so 203.3's impossibility
bar is never reached. Worth keeping the two apart when reading a cost.

**SFD-157 Royal Guard** supplies the body at a battlefield (one of the thirteen cards that say
*"here"*; 359.3.f.2 reads it at execution).

### 11.1 A recorded claim that needs qualifying

The project records **VEN-110 Mel, Defiant Soul** as having *"the cheapest [Empower] cost in the pool
by resources — 'Discard a spell', no Energy, no Power"*. Reading every `[Empower]` cost string in the
corpus, **five** pay neither Energy nor Power:

- **VEN-054 Questionable Tome** — an exhaust
- **VEN-087 Hextech Disc** — an exhaust
- **VEN-007 Punching Poro** — discard 1
- **VEN-110 Mel, Defiant Soul** — discard a spell
- **VEN-124 Escaped Grayback** — kill a friendly unit (free when it is a token)

Two of them pay only an exhaust, which is cheaper than a card. The claim should be *"one of five
[Empower] costs that pay neither Energy nor Power"*, not *"the cheapest"*. Members named.

## 12. A third route to the same damage redirect, and why it is still its own entry

**OGN-241 Shen, Kinkou** is *"[Reaction] (Play any time … **including to a battlefield you
control**.) [Shield 2] [Tank]"*. The parenthetical grants the play location at Reaction timing, and
**319.6 + 323.2.a** give a body that enters mid-combat the Defender designation before 465.2
resolves — so he arrives *after* 464.2.c.3 has declared the attackers and 465.2.c's summed Might is
countable. 143.4 has him enter exhausted, which costs nothing on defence (neither 464.2.c.3 nor
465.2.b filters by state).

The toll is exact: M3 + [Shield 2] = **5** (814.1.c), and 815.1.c.2 + 815.1.c.1 + 465.2.c.4 make the
attacker spend exactly that before a point can be assigned to anything else you control there.

This is the **third** route this session has walked to 815.1.c.2 — after a legend's exhaust
(`eye-of-twilight-zephyr-sage-tank-redirect`) and a free Quick-Draw attach
(`ornns-forge-jax-free-equipment`). Each entry names the others and states the difference: this one
is a whole extra body rather than a grant, needs no board set-up, and costs a card.

**VEN-123 Soulspinner** is the complement, not a duplicate: 822.1.b's [Ambush] needs you to control
**units** there, Shen needs you to control the **battlefield**.

## 13. Refusal — OGN-237 King's Edict

*"Starting with the next player, each other player chooses a unit you don't control that hasn't been
chosen for this spell. Kill those units."* E6 + 2 Order Power. In a Duel **485.4** leaves exactly one
other player, so it kills exactly **one** unit — and 355.10.e means that player chooses it, so it can
never answer a specific threat. `cull-the-weak-loyal-poro` does the same untargetable job for
**E2 + 1 Power** at the cost of a body that draws you a card when it dies. King's Edict is the same
effect at three times the price, and its scaling clause (*"that hasn't been chosen for this spell"*)
only does anything in 2v2 (489.1: 4 players), where 489.8's two independent decks put a team line
outside what `matchDeck` can represent anyway. Refused for Constructed on the arithmetic.

## 14. Standing notes for CLAUDE.md (Order batch 3)

11. **Order has TWO untargetable-removal paragraphs and they are different**: 355.10.e (a set
    *"chosen in whole or in part by other players"* — OGN-209 Cull the Weak) and 355.10.f (an
    instruction a player *"must"* complete — UNL-170 Atakhan's attack trigger, OGN-287's forced
    recycle). Both dodge 809.1.c's Deflect tax; both leave the choice with the opponent.
12. **185.2.d puts a token INSIDE the rules for its type**, so a token unit is a legal answer to
    *"kill a friendly unit"* as a **cost** and 203.3 never bites. That is the opposite side of the
    line from 416.1 (recycling, defined over *cards*) and 186.1 (the trash) — the traps this project
    records are all on the other side, and the two should not be conflated.
13. **The "cheapest [Empower] cost in the pool" claim needs qualifying**: five pay neither Energy nor
    Power — VEN-054 and VEN-087 (an exhaust each), VEN-007 and VEN-110 (a discard each), and
    VEN-124 Escaped Grayback (a friendly unit, free when it is a token).
14. **319.6 + 323.2.a give a body that enters mid-combat the Defender designation before 465.2
    resolves**, and 143.4's entering-exhausted costs nothing on defence — so OGN-241 Shen, Kinkou
    ([Reaction], and his parenthetical grants the location) is a 5-Might [Tank] that arrives after
    the attackers are declared. 822.1.b's [Ambush] is the complement: units there, not the
    battlefield.

---

# Batch 4 — three entries, and the 740 audit

| id | class | cards | what it is |
|---|---|---|---|
| `poppy-hunt-xp-discount` | ENGINE | UNL-178, UNL-162 | a published XP→Energy rate, and the bill 824.1.d sends |
| `keeper-of-law-royal-guard-exact-two` | ENGINE | VEN-119, SFD-157 | a card that arrives as exactly the pair the discount reads |
| `petty-officer-cleave-assault-four` | ENGINE | OGN-215, OGN-004 | Riot's own worked example for 807.2 |

## 15. The 740 audit — the glossary is now exhausted

Rule **740** is the glossary: *"Card text and this rules document use certain terms in specific ways
that are different from their common usage."* It has **eight leaf paragraphs**. Read end to end:

| paragraph | defines | status |
|---|---|---|
| 740.1.a | **friendly** — *"share a controller, or … one's controller is teammates with the other's"* | cited |
| **740.1.b** | **enemies** — *"one's controller is an opponent of the other's"* | **never cited** |
| 740.2.a | **alone** — *"no other friendly units at the same location"* | cited (this walk supplied it in place of reminder text) |
| 740.2.b | **one on one** | cited |
| 740.2.c | **in combat** | cited |
| 740.3.a | **tie** — *"…during the step 3d of the combat cleanup"* | cited (this walk, batch 1) |
| 740.4.a.1 | costs within instructions, **for spells**: paid on resolution | cited |
| **740.4.a.2 / .2.a** | costs within instructions, **for triggered abilities**: first part → **finalization**; any later part → **resolution** | **never cited** |

**Only two leaves remain uncited, and only one of them matters.**

- **740.4.a.2 and 740.4.a.2.a are the general statement of a rule this project derived card by card.**
  #171 batch 7 established the same fact by reading 383.3.b against 205 on two entries
  (`monastery-hirana-warmogs-conquer-draw` pays at finalization; `sunken-temple-mighty-conquer-draw`
  pays on resolution). 740.4.a.2/.2.a say it in two sentences and cover every card at once. **This
  is the citation to use going forward.**
- **740.1.b (enemies)** is low value on its own, but read with 740.1.a it is worth one line: the two
  are defined by **controller relationships**, not as complements. In 2v2 a teammate's unit is
  *friendly* by 740.1.a and is not an *enemy* by 740.1.b — which is what makes "or an ally holds"
  clauses coherent.

So the glossary is closed: three terms this project had been deriving from card text (**tie**,
**alone**, and the finalization-vs-resolution rule) are defined there, and there is nothing further
to find in 740.

---

# LEDGER — handoff state of the Order slice (#180)

## A. Census, after batch 4 merges

```
mono-Order deckable base codes: 139
uncovered by NAME+TYPE: 20 base codes = 19 distinct names
(opened at 43 base codes / 41 distinct names, catalogue 495)
```

**The base-code-vs-name+type gap is lane-specific and is now five lanes deep**: 19.2% pool-wide,
**15.7% Order**, 15% Calm/Mind, 0% Fury/Body/Chaos, 0% battlefields. Measure it; never carry a
number across. Script: `/tmp/rc-walks/order-census.ts` (opening) and `/tmp/rc-walks/order-final.ts`
(current), both folding coverage through `CardIndex.equivalents`.

## B. Walked — 13 entries across 4 batches

Batch 1: `symbol-of-solari-tie-evacuation`, `shepherds-heirloom-xp-equip`, `glowstone-hot-potato-sweep`.
Batch 2: `seal-of-unity-grand-strategem`, `cull-the-weak-loyal-poro`,
`hungry-wolf-eye-of-herald-double-move`, `mageseeker-investigator-mass-move-tax`.
Batch 3: `atakhan-harnessed-dragon-sacrifice`, `escaped-grayback-royal-guard-token-empower`,
`shen-kinkou-soulspinner-flash-defence`.
Batch 4: `poppy-hunt-xp-discount`, `keeper-of-law-royal-guard-exact-two`,
`petty-officer-cleave-assault-four`.

## C. Refused, with the paragraph

- **OGN-237 King's Edict** — §13. 485.4 leaves one other player in a Duel, so it kills exactly one
  unit and 355.10.e leaves the choice with them; `cull-the-weak-loyal-poro` does the same job for
  E2 + 1 Power instead of E6 + 2. Its scaling clause only bites in 2v2 (489.1), where 489.8 puts a
  team line outside what `matchDeck` can represent.

## D. What is left — 19 distinct names, and what a successor should expect

**Group 1 — targeted removal with no interaction to walk (4).** OGN-229 Vengeance (E4 P2, "Kill a
unit"), OGS-012 Blast of Power (E6 P1, [Action], at a battlefield), VEN-131 Decree of Unity (E2 P1,
enemy Chaos only), SFD-158 Sandshifter (E5 P2 M6, kills at 3 Might or less on entry). These are
good cards and single cards; the honest home for them is a **synergy rule**, not a combo entry.
The Calm/Mind walk has already mapped the shape: **VEN-127 Lacerate and SFD-158 Sandshifter are the
same 3-Might gate at different prices**, and the floored/unfloored distinction does **not** change a
kill gate at M ≥ 5 — it bites only in a combat SUM (465.2.c with 143.2.b). Hand to rc-walk-rules2 as
a Might-gate ladder lead rather than walking them here.

**Group 2 — vanilla or near-vanilla bodies (5).** OGN-219 Vanguard Sergeant (E4 M4, no text),
SFD-156 Laurent Duelist (E4 M3, [Assault 2]), OGS-016 Vanguard Attendant (E6 P1 M5, "I enter
ready"), UNL-154 Crimson Pigeons (E3 M3, +2 while attacking with another unit), OGN-217 Trifarian
Gloryseeker (E2 M2, [Legion] buff me). Nothing here reads another card. Expect refusals unless a
successor finds a payoff that reads *"attacking with another unit"* (144.3 is the obvious hook for
Crimson Pigeons and is the one lead in this group worth an hour).

**Group 3 — the remaining Empower units (2).** VEN-122 Solari Sunhawk ([Empower] E2 → +1 Might and
[Deflect 2]), VEN-128 Noxian Emissary ([Empower] E1 + 1 Order → an [Empowered] Deathknell making two
Recruits). Both are live leads: **the disempowerers are nine, not the six on record** (§4.1), and
441.1.b's once-per-object cap is what a disempowerer resets. VEN-128's Deathknell is gated on being
Empowered, which is a two-step the catalogue has not walked.

**Group 4 — XP and one-offs (4).** UNL-151 Bandle Soldier ([Level 3] "I enter ready" — **note the
824.1.d anti-synergy with `poppy-hunt-xp-discount`, already recorded**), UNL-161 Divining Shells
(E2 gear, [Vision] + a one-shot +2 Might at [Action] speed), SFD-160 Zaun Punk (kills a friendly
gear as an additional cost to kill a gear), OGN-224 Salvage (E2 P1, kill up to one gear, draw 1).
Groups 4's gear-kill cards read each other: Zaun Punk + Salvage + a gear you want in the trash is
the one untried line here.

**Group 5 — mass pumps (2).** OGN-206 Back to Back (E3, [Reaction], two friendly units +2 each),
UNL-155 Heroic Charge (E3, [Action], +1 Might and a [Stun]). Both select by choosing, so unlike
Grand Strategem they **do** pay the Deflect tax when aimed at anything an opponent controls
(809.1.c); Heroic Charge's stun half is bounded by 423.1.a.1 (a stunned unit cannot be stunned
again) and 423.1.a.2 (cleared at the stunner's own cleanup), which the project has already measured
as making no stun engine INFINITE.

**Group 6 — the two Order Runes (OGN-214, VEN-R06).** One distinct name. Refuse: 164.2 gives every
Basic Rune the same two abilities and every deck runs runes, so there is no line to walk. Recorded
here so a successor does not spend a batch on it.

## E. Things a successor would otherwise re-derive

1. **The 740 glossary is exhausted** (§15). Use **740.4.a.2 / 740.4.a.2.a** for the
   finalization-vs-resolution rule rather than 383.3.b + 205.
2. **Order has two untargetable-removal paragraphs**, 355.10.e (a set chosen by other players —
   Cull the Weak's exact wording is the printed example) and 355.10.f (an instruction a player
   *"must"* complete — Atakhan, Sigil of the Storm). Both dodge 809.1.c; both leave the choice with
   the opponent.
3. **185.2.d puts a token INSIDE the rules for its type**, so a token unit legally pays a *"kill a
   friendly unit"* **cost** — the opposite side of the line from 416.1 (cards) and 186.1 (the trash).
4. **The "cheapest [Empower] cost" claim needs qualifying** — five pay neither Energy nor Power
   (§11.1), two of them only an exhaust.
5. **The disempowerers are nine, not six** (§4.1), and two of the three missing are Order.
6. **Three routes to the 815.1.c.2 damage redirect are now catalogued** — a legend's exhaust, a free
   Quick-Draw attach, and a flashed-in body — and each entry names the other two. A fourth (Poppy)
   is inside `poppy-hunt-xp-discount`. Do not write a fifth without saying how it differs.
7. **`needs: [conquer-engine]` cannot carry an extra condition** (from #171): a payoff that also
   demands, say, a 5+ Might conqueror must state it in `prerequisites`, because the feature tag
   composes with engines that fail the card.

---

# CONTINUATION — session `rc-walk-order` (successor), batch 5

Same issue ([#180](https://github.com/GermanAbuArab/RiftCombo/issues/180)), same slice, same rules
version. Census re-measured by NAME+TYPE through `CardIndex.equivalents` against the merged
catalogue of 534 at the time the batch opened: **20 base codes = 19 distinct names**, exactly what the LEDGER handed over
(script `/tmp/rc-walks/order-cen2.ts`). Batch 5 is **5 entries and 3 refusals**, and it takes five
of the nineteen names: VEN-128, VEN-122, UNL-151, OGN-217, UNL-155.

| id | class | cards | the name it clears |
|---|---|---|---|
| `empowered-deathknell-blade-ruined-king` | ENGINE | SFD-178, VEN-128, VEN-078 | Noxian Emissary |
| `solari-sunhawk-eye-of-herald-deflect-carrier` | ENGINE | VEN-122, SFD-153 | Solari Sunhawk |
| `bandle-soldier-enthralling-protector-xp-floor` | ENGINE | UNL-151, UNL-162 | Bandle Soldier |
| `trifarian-gloryseeker-vanguard-helm-legion-buff` | ENGINE | OGN-217, OGN-228 | Trifarian Gloryseeker |
| `heroic-charge-solari-chief-stun-kill` | ENGINE | UNL-155, OGN-225 | Heroic Charge |

## 16. The pronoun rule — "I" in an appended Effect Text is the CARRIER, and it is the finding of this batch

The batch opened on the LEDGER's Group 4 lead: *"Zaun Punk + Salvage + a gear you want in the trash
is the one untried line here."* The obvious fuel is **`SFD-172 Sacred Shears`** (Order Equipment,
E2 P1, M+1): *"[Equip] :rb_rune_order: … [Effect] [Deathknell] — Draw 1. (When I die, get the
effect.)"* — a gear that pays you for dying, and `SFD-160 Zaun Punk` kills a friendly gear as an
additional cost while `OGN-224 Salvage` kills one at [Action] speed with a cantrip attached.

**It does not work, and the reason is a rule this project had applied correctly once and never
stated.** Three paragraphs in sequence:

> **136.2.b.** *"Effect Text is inactive unless the card with the Effect Text is Attached to another
> card."* (repeated at **724**)
>
> **434.1.e.** *"Attaching one or more cards will cause those cards' printed Rules Text to become
> Inactive for as long as they remain Attached."*
>
> **136.2.c / 434.1.c / 718.3.** The Effect Text is *appended to the Rules Text of the Top-Most
> Card*.

So the Shears' Deathknell is never the Shears'. Unattached, its Effect Text is Inactive; attached,
the ability sits on the **carrier**. Which one does *"When I die"* name? **053** settles it and
**136.2.d** supplies Riot's own worked examples:

> **053.1.** *"Units and legends say 'I,' 'me,' etc."*
> **053.2.** *"Gear and spells say 'this.'"*
> **136.2.d.** *"Effect Text may refer to 'this' or to the name of the Attached game object that
> appended the Effect Text. Doing so refers to the Attached game object and not the Top-Most Card,
> even if the Top-Most Card shares a name with the Attached game object."*
> — **Example:** *"Guardian Angel's effect text reads 'If I would die, kill Guardian Angel instead.
> Heal me, exhaust me, and recall me.'"*
> — **Example:** *"Brutalizer's effect text reads 'If this was attached to me this turn, I have an
> additional +2 [M].'"*

Both examples print the split in one sentence: **"I"/"me" is the carrier, "this" and the gear's own
name are the attached gear.** Guardian Angel is the sharpest case — the same sentence uses "I" for
the unit being saved and the gear's *name* for the gear being destroyed.

Consequences, in order of how much they change:

1. **No gear-kill line in the pool can cash an `[Effect]` Deathknell.** Killing the Shears draws
   nothing (its Deathknell belongs to the carrier); killing the carrier draws (the ability is
   there). This closes Group 4's lead by rule.
2. `SFD-153 Eye of the Herald`'s *"[Effect] When I move…"* is the **carrier's** move — which is
   what `hungry-wolf-eye-of-herald-double-move` already assumed and what
   `solari-sunhawk-eye-of-herald-deflect-carrier` now states with its citation.
3. `SFD-102 Hexdrinker`'s *"[Deflect] … to choose **me**"* protects the **carrier**, not the gear.
4. The catalogue was already right: `karthus-sacred-shears-blade-draw`'s note reads *"434.1.c
   appends an Equipment's Effect Text to the carrier's Rules Text, so ANY unit you control gains
   '[Deathknell] — Draw 1'."* No defect to fix — but the rule now has its paragraphs and its two
   worked examples attached to it, which is what stops the next session reading it the other way.

**053.2 is cited for the first time in this catalogue** (0 prior hits in `data/combos.json`).

## 17. Refusal — the whole Group 4 gear-kill lead, because every Order gear that wants to die kills itself

Beyond §16, the lead dies a second time on the inventory. Swept `grep -E "\| Gear \| Order \|"` over
`data/corpus_flat.txt` — 16 Order gear. The three whose text wants them dead all pay for it
themselves, with no external outlet:

- `OGN-212 Forge of the Future` — *"**Kill this**: Recycle up to 4 cards from trashes."*
- `UNL-161 Divining Shells` — *"[Action][>] **Kill this**, :rb_exhaust:: Give a unit +2 :rb_might: this turn."*
- `VEN-133 Glowstone` — *"**Disempower this**, :rb_exhaust:: Choose a player…"* (walked in batch 1)

So `SFD-160 Zaun Punk`'s *"You may kill a friendly gear as an additional cost to play me"* is a real
**cost**, not a discount, and `OGN-224 Salvage`'s *"You may kill up to one gear"* is aimed at the
opponent. Both remain good cards; neither is a combo. Two facts worth keeping about them:

- **718.5.b.** *"Attached cards still can be chosen or targeted by game effects while Attached."*
  So both reach an attached enemy Equipment — Salvage at [Action] speed is the Order answer to a
  Trinity Force or a Svellsongur inside the combat it was played for.
- Salvage is **unconditionally castable** (*"up to one"* + *"Draw 1"*), which is the property #166
  found missing in a spell chosen as filler for a *"you've played a spell this turn"* condition.
  It is Order and Swain, Visionary is Mind, so it cannot fill that particular hole — but it is the
  shape to reach for in an Order shell.

Handed to `rc-walk-rules2` as a synergy-rule lead with Group 1's Might-gate ladder, not walked here.

## 18. Refusal — `OGN-214` / `VEN-R06` Order Rune, confirming the LEDGER's advance refusal

164.2 gives every Basic Rune the same two abilities (164.2.a an exhaust for Energy, 164.2.b a
recycle for Power) and 161.2.a fixes the Rune Deck at *"Exactly 12 Rune cards"*. Every deck runs
runes; there is no pairing to walk. One distinct name, refused as the LEDGER instructed.

## 19. A candidate refuted by the catalogue before it was written — read the entry that already owns the mechanism

The first line drafted for `VEN-128 Noxian Emissary` was **Matriarch of War as an Empower → ready
converter**: pay the Emissary's [Empower], and `VEN-153 Matriarch of War`'s *"When you empower
something else, empower me"* fires, then *"Disempower me, :rb_rune_rainbow:, :rb_exhaust:: Ready a
unit"* cashes it. It is legal and it works, and it is **already refuted** by
`matriarch-of-war-empower-ready`, whose own notes say: *"the issue armed the Matriarch with Legion
Marauder and Escaped Grayback, and both are one Empower per copy — six in a whole game, which is
not a motor."* 441.1.b (*"An Empowered Game Object can not be Empowered"*) is why: an Empowerable
body is one event, and the entry's sustainable source is `VEN-087 Hextech Disc`, whose own ability
disempowers it.

The lesson is the LEDGER's re-validation rule pointed at the catalogue rather than at the census:
**before walking an anchor, read every entry that already uses the partner you are reaching for.**
This cost one draft and no merge.

## 20. What batch 5 stands on, paragraph by paragraph

### 20.1 `empowered-deathknell-blade-ruined-king`

`SFD-178 Blade of the Ruined King` (Order Equipment, E3 P1, M+4) — *"[Equip] — :rb_rune_order:,
Kill a friendly unit"*. **818.1** makes Equip an Activated Ability, **818.1.c.2** reads it as
*"[Cost]: Attach this gear to a unit you control"*, **818.1.c.3** allows non-resource costs, and
there is **no exhaust** in it — so it is a repeatable sacrifice outlet at one Order Power and one
body per activation, walled only by **381** (*"All Activated Abilities can only be activated on the
Controlling Player's Turn and during an Open State"*).

The sweep that makes the entry: `grep -in "Deathknell" data/corpus_flat.txt | grep -i "Empowered"`
returns **exactly two rows**, and they are the only bodies in the pool that pay you for being that
cost —

- `VEN-078 Baccai Witherclaw` (Body, E4 M4): [Empower] E1 + 2 rainbow; *"[Empowered][>][>>][Deathknell][>] Channel 2 runes exhausted."*
- `VEN-128 Noxian Emissary` (Order, E2 M2): [Empower] E1 + 1 Order; *"[Empowered][>][>>][Deathknell][>] Play two 1 :rb_might: Recruit unit tokens to your base."*

Three paragraphs carry the rest:

> **808.1.d.3.** *"Before the card is moved to the Trash, note its location, its attributes, and any
> other details related to the effect of its triggered ability to process the trigger after it has
> been Finalized."*

That is what lets an `[Empowered]`-gated Deathknell fire at all, since **441.2** scopes Empowered to
*"Game Objects **on the board**"*.

> **818.1.c.1.** *"If paying costs or making choices for this ability causes triggered abilities to
> trigger, they will be placed on the chain **above this ability** in a Pending state."*

So the Deathknell resolves before the attach (340.1). But **818.1.b.1** — *"Equip's choice is a
Target"* — is chosen when the ability is activated, so the two Recruits can never carry *this*
attach; they are fuel for the next. **First cite in this catalogue** (0 prior hits).

> **185.2.d.** *"Tokens have a type. They follow all rules for their type unless otherwise specified."*

A Recruit is a unit, so it pays *"Kill a friendly unit"* and **203.3** never bites — one Empowered
Emissary converts **one** sacrifice into **three**. The opposite side of the line from 416.1
(Recycling is over CARDS) and 186.1 (a dead token never reaches the trash).

The Witherclaw's refund is honest but capped: **164.2.b** has no exhaust in its cost so an exhausted
rune still pays 1 Power at Reaction speed, **415.3.a** makes it Energy only from your own Awakening,
and **161.2.a** + **430.3** (*"channel as many as possible"*) make the Deathknell a **refill**, worth
nothing once twelve runes are out.

**Domain check, run against `data/cards.json` and not from memory: `OGN-236 Karthus, Eternal` is
mono-ORDER.** A Deathknell multiplier reads as Fury and it is not. He would make the Emissary four
Recruits and the Witherclaw four runes — and that family is already six entries deep
(`blade-kogmaw-karthus-wipe`, `karthus-honest-broker-blade-gold`, `karthus-sacred-shears-blade-draw`,
`karthus-machine-evangel-renata-plaza`, `karthus-glasc-mixologist-double-reanimate`,
`ferrous-forerunner-karthus-mech-plaza`), so he is a notable here and not a `uses[]` row: this entry
is the half that needs no multiplier.

### 20.2 `solari-sunhawk-eye-of-herald-deflect-carrier`

**809.2** — *"If a Game Object has Deflect, or has been granted Deflect, and is granted Deflect by an
additional source, the Deflect Value of all granted Deflect keywords is summed"* — **completes a
three-member family this project had recorded only two thirds of**: **807.2** sums granted
[Assault] (Riot's example: Petty Officer + Cleave = Assault 4), **814.2** sums granted [Shield]
(Stalwart Poro + Block = Shield 4), and **809.2** sums granted [Deflect]. Deflect is the only one of
the three that taxes the **opponent** instead of adding Might.

What it is worth, measured rather than asserted: **809.1.c** prices it as extra Power *"for each
time they choose"*, **809.1.c.1** lets that Power be any Domain, and this project's own free-Power
floor is 2 a turn — so an Empowered Sunhawk's **Deflect 2 consumes an opponent's entire free Power
for one choose**, and a spell that chooses it twice pays 4. **441.2** makes the Empowered state
permanent, so the 2 Energy is paid once.

What it is **not** worth: **355.10.d** keeps a programmatically-selected object off the target list
and **809.1.d** only taxes effects that CHOOSE, so every sweeper walks through it; and exactly two
cards ignore it outright (`VEN-061 Decree of Insight`, `VEN-158 Heisho, Shell of the World`).

The payoff half is the token: **359.3.f.2** reads *"here"* at execution, so the Eye of the Herald's
Recruit is born at the battlefield the carrier moved to — **not** at the base, which is the
difference between this entry and §20.1, whose Recruits are printed *"to your base"* and still owe a
walk (144.4 + 144.2 + 143.4).

### 20.3 `bandle-soldier-enthralling-protector-xp-floor`

The sweep: `grep -in "enter ready\|enters ready" data/corpus_flat.txt | grep -i level` returns
**exactly three cards** — `UNL-016 Scorchclaw` (Fury, [Level 3]), `UNL-151 Bandle Soldier` (Order,
[Level 3]) and `UNL-191 Wuju Master` (Calm/Body legend, [Level 11]).

Why "enters ready" is worth a card: **143.4** *"Units enter the Board exhausted"* (143.4.a: alterable)
against **144.2** *"Exhausting the Unit is the Cost for this action"* — the body walks in the turn it
lands. **415.1** defines Readying as marking something **already on the board**, so it is a play-time
property and can never hand an exhaust back later; it buys a tempo turn and nothing else.

And the rule that makes this the **inverse of every other XP line in the catalogue**: **824.1.d**
*"The Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP"*
with **730.2** *"To Spend XP, reduce the value of XP marked on the Player spending it."* The counter
has to be **banked**. `poppy-hunt-xp-discount` (spend 3) and `shepherds-heirloom-xp-equip` (spend 1)
run the same faucet and spend it; all three entries now name each other and a list has to choose.
Even the Protector's own sink is a bad deal on this side: *"Spend 2 XP: [Buff] me"* buys **+1 Might
once** (702.3 caps a unit at one buff, 703 fixes it at +1) and costs every [Level 3] in the deck.

Rate, derived: **823.1.c.1** *"Hunt is functionally short for 'When I Conquer or Hold, my controller
gains X XP'"* (X = 1), **315.2.b.2** *"The Turn Player Holds all Battlefields they Control"*, and
**485.4** *"Battlefield Count: 2"* — two Protectors on two held battlefields reach the floor of 3 in
the **second** Beginning Phase.

### 20.4 `trifarian-gloryseeker-vanguard-helm-legion-buff`

**812.2** — *"All instances of Legion on cards a player controls are satisfied by that player playing
a single card"* — is a **first cite** (0 prior hits), and **812.1.c** is sharper than the reminder
text: the enabling card must have been *"**Finalized** by you on the same turn"*, so a spell that is
later countered still switches [Legion] on. Playing the Helm (E2) first satisfies the gate on the
package's own first turn.

The point of the pairing is 702.3 read from the supply side. `OGN-228 Vanguard Helm` needs a
**buffed** friendly unit to die, and **702.3 / 702.3.a** mean a buffer is a one-time placement per
body — so the Helm is always short of *buffed bodies*, never of deaths. `OGN-217 Trifarian
Gloryseeker` is a 2-Energy body that arrives buffed **with no buffer spent**, which is a different
scarcity from both existing Helm entries: `vanguard-helm-kinkou-monk-buff-conservation` is bounded
by unbuffed bodies, `vanguard-helm-baited-hook-buff-ladder` by the sacrifice rate, and this one by
nothing but 103.2.b. Note that a second Gloryseeker is **not** a legal recipient of the Helm's
recovery — it already carries its own buff (702.3.a).

`OGN-269 The Boss` (Body/Order) is a legal legend that switches the whole thing off, by **808.1.d.1**
(the would-die replacement removes the trigger from the chain) *and* by spending the buff (702.2.b).
A mono-Order legend avoids the fork.

### 20.5 `heroic-charge-solari-chief-stun-kill`

`OGN-225 Solari Chief` (Order, E5 P1 M4) — *"When you play me, choose an enemy unit. If it is
stunned, kill it. Otherwise, stun it."* — is a kill **by effect keyed on a status**, so Might never
enters the calculation. Every other Order removal is priced by Might (`SFD-158 Sandshifter`,
`VEN-127 Lacerate`: 3 or less) or by cost (`OGN-229 Vengeance` E4 + 2 Power, `OGS-012 Blast of
Power` E6 + 1 Power).

The stun contributes nothing to killing it — **423.1.b** removes only its contribution to the
combat damage step and **423.1.c** *"must still have damage applied to it equal to, or greater than,
its full might value to be killed"* — which is precisely why the payoff has to be a kill by effect.
**423.1.a.2** clears the status *"during step 3d of the end of turn cleanup"*, so stun and kill are
the **same turn**; **423.1.a.1** *"A Stunned Unit can not be Stunned again"* is why **two Solari
Chiefs** are also a complete kill (the second finds it stunned and takes the kill branch), at
E10 + 2 Power against the pairing's E8 + 1 Power. A third does nothing.

Both halves **choose**, so **809.1.c** taxes both against a [Deflect] body — 4 extra Power against an
Empowered Solari Sunhawk from §20.2. `OGN-262 Zenith Blade` (Calm/Order, E3 + 2 Power, [Action]) is
the alternative enabler that also solves Heroic Charge's *"at its location"* restriction by moving a
friendly unit in; it is a notable, not a sixth card.

Stun payoffs swept (`grep -in stunned`): `OGN-072 Solari Shrine` (Calm, a draw), `OGN-079 Leona,
Zealot` (Calm, −8 Might), `OGN-225 Solari Chief` (Order, the kill), `UNL-035 Monch` (Calm, a
discount). **Solari Chief is the only one in Order and the only one that removes.**

## 21. LEDGER, updated after batch 5

```
mono-Order deckable base codes: 139
uncovered by NAME+TYPE: 15 base codes = 14 distinct names
(opened at 43/41 at catalogue 495; handed over at 20/19 at 534; now 15/14, measured
against a catalogue of 543 plus this batch's five - the tree moved under the walk, which is why
the census is re-run immediately before reporting rather than immediately after writing)
```

**Walked — 18 entries across 5 batches.** Batch 5 adds `empowered-deathknell-blade-ruined-king`,
`solari-sunhawk-eye-of-herald-deflect-carrier`, `bandle-soldier-enthralling-protector-xp-floor`,
`trifarian-gloryseeker-vanguard-helm-legion-buff`, `heroic-charge-solari-chief-stun-kill`.

**Refused — 4, with the paragraph.** `OGN-237 King's Edict` (§13); the Sacred Shears gear-kill
fuel (§16, 136.2.b + 434.1.e + 136.2.d); the whole Group 4 gear-kill lead (§17, the Order gear
inventory); the two Order Runes (§18, 164.2 + 161.2.a).

**What is left — 14 distinct names.**

- **Group 1, targeted removal (4)** — `OGN-229 Vengeance`, `OGS-012 Blast of Power`,
  `VEN-131 Decree of Unity`, `SFD-158 Sandshifter`. Unchanged: hand to `rc-walk-rules2` as a
  Might-gate ladder. Batch 5 adds one lever the LEDGER did not have — §20.5 shows the domain's
  Might-independent removal already exists (`OGN-225 Solari Chief`), so the ladder is a **ranking**
  of four priced kills against one unpriced one, not an open question.
- **Group 2, vanilla or near-vanilla bodies (5)** — `OGN-219 Vanguard Sergeant`,
  `SFD-156 Laurent Duelist`, `OGS-016 Vanguard Attendant`, `UNL-154 Crimson Pigeons`,
  `OGN-217 Trifarian Gloryseeker` **is now walked**, so this group is **4**. The one lead still
  worth an hour is Crimson Pigeons (*"+2 :rb_might: while I'm attacking with another unit"*) under
  **144.3** (*"Players may perform multiple Units standard move simultaneously. This is treated as
  one game action"*), which makes the condition nearly free — and then against
  `UNL-187 Piltover Enforcer`, a Fury/Order **legend** that pays for 3+ excess damage. Note before
  walking it: a stun does **not** create excess damage (423.1.c leaves the kill price at full Might)
  while a **+Might** pump does (465.2.c.4 caps assignment at minimum lethal, R28 = A), so
  `OGN-206 Back to Back` (E3, [Reaction], **+4 summed Might**, the cheapest such in Order —
  `SFD-151 Bonds of Strength` needs E4 with its [Repeat] for the same +4, `OGN-207 Call to Glory` is
  +3 on one body) is the enabler and Heroic Charge is not. That is a fully scoped entry waiting to
  be written; it was left out of batch 5 only because `gauntlets-enforcer-conquer` and
  `tryndamere-hextech-gauntlets-enforcer` already own the Enforcer and the difference has to be
  argued ([Reaction] after the defenders are known, versus an [Equip] committed in the Main Phase).
- **Group 3, the remaining Empower units (1)** — `VEN-128 Noxian Emissary` **is now walked** (§20.1).
  `VEN-122 Solari Sunhawk` **is now walked** (§20.2). Group 3 is empty; the disempowerer census
  stands at nine (§4.1) and §19 records that the Matriarch converter is already owned.
- **Group 4, XP and one-offs (3)** — `UNL-151 Bandle Soldier` **is now walked** (§20.3). The
  gear-kill half is **refused** (§16, §17), so `SFD-160 Zaun Punk`, `OGN-224 Salvage` and
  `UNL-161 Divining Shells` go to `rc-walk-rules2` as a denial lead with 718.5.b attached.
- **Group 5, mass pumps (1)** — `UNL-155 Heroic Charge` **is now walked** (§20.5). `OGN-206 Back to
  Back` is the Group 2 lead above.
- **Group 6, the Order Runes** — **refused** (§18).

Net: of the fourteen names left, **four are Group 1 removal and three are the Group 4 gear-kill
trio, all seven better served by a synergy rule than by an entry**; four are Group 2 bodies with one
real lead (Crimson Pigeons); one is `OGN-206 Back to Back`, fully scoped above; and two are the
Order Runes, refused. A successor should expect **two or three more entries and a hand-off of the
rest**, not another five-entry batch.

## 22. Facts for CLAUDE.md from batch 5 (the manager writes them, not this session)

1. **In an appended `[Effect]` text, "I"/"me" is the CARRIER and "this"/the gear's own name is the
   attached gear** — 053.1 + 053.2 + 136.2.d, with Riot's own two worked examples (Guardian Angel,
   Brutalizer). With 136.2.b (Effect Text Inactive unless attached) and 434.1.e (the gear's printed
   Rules Text Inactive while attached), **no gear-kill line in the pool can ever cash an `[Effect]`
   Deathknell** — `SFD-172 Sacred Shears` draws for its carrier's death, never its own.
2. **Three keywords sum when granted, and 809.2 is the third**: [Assault] 807.2, [Deflect] 809.2,
   [Shield] 814.2. Deflect is the only one that taxes the opponent rather than adding Might, and
   809.1.c charges *per choose*, so Deflect 2 eats a whole turn's free Power floor for one spell.
3. **818.1.c.1**: costs and choices paid for an `[Equip]` put triggered abilities *"on the chain
   above this ability in a Pending state"* — so a kill-as-Equip-cost Deathknell resolves **before**
   the attach; and 818.1.b.1 makes the carrier a Target chosen at activation, so a body created by
   that Deathknell can never carry *that* attach.
4. **812.2**: all instances of `[Legion]` a player controls are satisfied by **one** card, and
   812.1.c needs that card merely **Finalized**, not resolved.
5. **The `[Empowered]`-gated Deathknell is exactly two cards** — `VEN-078 Baccai Witherclaw` (Body),
   `VEN-128 Noxian Emissary` (Order) — and **808.1.d.3** (*"note its location, its attributes …
   before the card is moved to the Trash"*) is what lets the state be read after the body has left
   the board, against 441.2's *"on the board"*.
6. **`[Level N]` "enter ready" is exactly three cards**: `UNL-016 Scorchclaw` (Fury),
   `UNL-151 Bandle Soldier` (Order), `UNL-191 Wuju Master` (Calm/Body legend, [Level 11]). And
   824.1.d + 730.2 make the whole family **anti-synergic with every XP sink**: the counter is banked
   or it is spent, never both.
7. **`OGN-236 Karthus, Eternal` is mono-ORDER**, not Fury — checked against `data/cards.json`. A
   Deathknell multiplier reads Fury and is not one, which changes which decks the six Karthus
   entries are legal in.
