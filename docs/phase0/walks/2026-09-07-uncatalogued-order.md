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
