# Walk — the deckable cards in no entry: battlefields, legends, then the rest

Issue [#171](https://github.com/GermanAbuArab/RiftCombo/issues/171). Session `rc-walk-uncat`.
Rules version 2026-07-16. Card text verbatim from `data/corpus_flat.txt`; every rules paragraph
opened in `data/Riftbound-Core-Rules-2026-07-16.txt` and quoted where it is load-bearing.
Entries are staged at `/tmp/rc-walks/rc-walk-uncat.json`; this session never edits `data/combos.json`.

## 0. The measurement

Of the **1,030 deckable base codes** (domains non-empty, or `type` includes `battlefield`),
**472 appear in some entry's `uses[]` and 558 do not**:

```
node -e 'const c=require("./data/cards.json").cards,d=require("./data/combos.json");
const used=new Set();for(const e of d.combos)for(const u of e.uses||[])used.add(u.card.toUpperCase());
const b=new Map();for(const x of c)if(!b.has(x.base))b.set(x.base,x);
const deck=[...b.values()].filter(x=>x.domains.length||x.type.includes("battlefield"));
console.log(deck.length, deck.filter(x=>!used.has(x.base)).length)'
→ 1030 558
```

- **47 of the 66 battlefields** are in no entry (19 are).
- **10 of the 49 legend NAMES** are in no entry — Bounty Hunter, Wuju Bladesman - Starter,
  Might of Demacia - Starter, Mechanized Menace, Purifier, Prodigal Explorer, Green Father,
  Scorn of the Moon, Butcher of the Sands, Eye of Twilight. (A name is uncatalogued when *none*
  of its base codes appears in a `uses[]` row. Several of them are *named* in a
  `prerequisites.easy` line — Prodigal Explorer and Green Father are — which is not the same
  thing and is why the census is run over `uses[]`.)
- The remaining ~501 are units, spells, gear and runes.

---

## 1. The finding that organises the whole battlefield vein

> **A "when you conquer here" battlefield fires ONCE PER GAME unless you give the battlefield up
> on purpose.**

Three paragraphs, read together:

- **315.2.b.2** — *"The Turn Player Holds all Battlefields they Control."* It is a Task that
  becomes Outstanding (315.2.b.1); there is no "may".
- **470** — *"A player may only Score, from either method, once per Battlefield per turn."*
- **469.1** — *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."*
  And **348.2.a** only hands Control to a player *"[who] does not already Control the Battlefield"*.

So the moment you control your own battlefield at your Beginning Phase you have **Held** it, it is
Scored for the turn, and it cannot be Conquered. Take a conquer battlefield once and keep it, and
its trigger has paid exactly once in the game.

**Twelve of the sixty-six battlefields carry a `When you conquer here` clause** (OGN-282, OGN-287,
OGN-291, OGN-298, SFD-207, SFD-212, SFD-217, SFD-218, SFD-220, VEN-162, plus the two banned ones
below). That is a large part of why the family sat uncatalogued: read naively, each is a one-shot.

### 1.1 The fix, and why it is free

`sprite-queen-targon-peak-conquer-cycle` (staged) vacates the battlefield inside your own
Beginning Phase and retakes it inside your own Main Phase:

- **UNL-084 Sprite Queen** — *"When you play me or at the start of your Beginning Phase, play a
  ready 3 :rb_might: Sprite unit token with [Temporary] to your base. (Kill them at the start of
  their controller's next Beginning Phase, before scoring.)"*
- **816.1.b** — *"At the start of this permanent's controller's Beginning Phase, before scoring,
  kill this."* **816.1.c** — *"The Trigger Condition is the controller of the permanent's Beginning
  Phase starting"*, so the Sprite born in that same instant has already missed the condition; the
  reminder text agrees ("their controller's **next** Beginning Phase").
- **319.6** makes a Cleanup Outstanding after the old Sprite leaves the board; **310.1** (Neutral
  Open: no Showdown or Combat, no Chain) is satisfied, so **323.6** applies — *"Players lose control
  of any controlled Battlefields without their Units occupying them"*.
- **315.2.b** then Holds nothing there; the new Sprite walks in during **316** and
  **190.3.a.1 → 344.2 → 348.2.a → 348.2.a.1** produce a bloodless Conquer.

**The cycle costs nothing in exposure, and that is the part worth writing down.** The window in
which the battlefield is uncontrolled runs from 315.2.a to your own Main Phase — entirely on your
turn. **144.1.a** allows a Standard Move *"any time during a player's Main Phase"*, **144.1.b**
bars it in a Closed State and **144.1.c** bars it during a Showdown or Combat; **312.2.a** gives the
non-turn player priority *only* in Closed States and Showdowns. There is no state in which the
opponent both holds priority and is allowed to move. For the rest of the round a 3-Might Sprite
garrisons the battlefield exactly as a held one would be.

**What it does NOT buy: a second point.** 470 caps the score at one per battlefield per turn, so the
Conquer pays the same single point the Hold would have. The cycle buys the *trigger*, every turn,
for zero cards and zero Energy after Sprite Queen is paid for once.

### 1.2 The route that was walked and rejected as worse

**UNL-045 Forgotten Signpost** — *"[Action][>] Exhaust a unit you control, :rb_exhaust:: Move a
different unit you control to the location of the unit you exhausted to pay for this ability."*
It can vacate the battlefield too, but **420.1** makes the exhausted fuel stand somewhere the mover
is not, so the line needs a walker, a fuel body at the base and the gear — three cards and three
exhausts a turn against Sprite Queen's zero.

---

## 2. Entries staged (batch 1, five)

| id | class | cards | what it is |
|---|---|---|---|
| `sprite-queen-targon-peak-conquer-cycle` | ENGINE | UNL-084, OGN-289 | the vacate-and-retake cycle; `produces: conquer-engine, resource-engine` |
| `treasure-hoard-renata-conquer-gold` | ENGINE | SFD-220, SFD-171 | 1 Energy → 1 live rainbow Power per Conquer; `needs: conquer-engine` |
| `hallowed-tomb-leblanc-shadows-call` | ENGINE | OGN-281, UNL-172, UNL-165, SFD-155, UNL-199 | the only Champion Zone refill, on the only Deathknell Chosen Champion |
| `forge-of-fluft-free-svellsongur` | ENGINE | SFD-208, SFD-059 | the only free attach that picks the carrier |
| `vilemaws-lair-bounty-hunter-lock` | ENGINE | OGN-295, OGN-267 | a movement lock that works uncontrolled, and the legend that escapes it |

`treasure-hoard-renata-conquer-gold` is **the first entry in the catalogue to declare
`needs: ["conquer-engine"]`.** Thirty-two entries produced that feature on 2026-09-07 and nothing
consumed it, because nobody had written the payoff side. With batch 1 merged, `generateVariants`
reports **548 variants, 49 of them multi-entry routes through these five**.

### 2.1 Two uniqueness claims, both swept over base codes

- **OGN-281 Hallowed Tomb is the only card in the pool that returns a Chosen Champion to the
  Champion Zone.** `grep -i "champion zone" data/corpus_flat.txt` returns two rows; the other is
  OGN-263 Swift Scout, whose clause takes a Teemo *out* of the zone into hand. **108.3.c** is what
  makes this matter: *"The Chosen Champion cannot be returned to this zone by normal means"*, with
  **108.3.c.1** *"it can only do so if there is not a card already in this zone."*
- **UNL-172 LeBlanc, Fragmented is the only unit in the pool that is both a legal Chosen Champion
  and carries a Deathknell.** **103.2.a.2** requires *"a champion unit with a champion tag that
  matches the tag on your Champion Legend"*; 48 champion tags are printed on legends; intersecting
  the units carrying one of those tags with the units printing `Deathknell` leaves exactly one row.
  **OGN-190 Kog'Maw Caustic, OGN-236 Karthus Eternal and OGN-110 Ekko Recurrent all have Deathknells
  and none of them can ever be a Chosen Champion**, because no legend in the pool carries the tags
  Kog'Maw, Karthus or Ekko. She forces UNL-199 / UNL-235 Deceiver as the legend.

### 2.2 Two clause-level facts the batch cited for the first time

- **The Forge of the Fluft grants a second Attach ability that never determines an [Equip] cost.**
  **818.1.c.2** — *"Equip is functionally short for '[Cost]: Attach this gear to a unit you
  control.'"* — shows the two abilities reach the same action, and the Forge's cost is one legend
  exhaust. Because the granted text says *"to a unit you control"* and **[Weaponmaster]** says
  *"to me"*, the Forge is the only free attach in the pool that can place a **carrier-dependent**
  Equipment (Svellsongur, Skyfall of Areion) on a chosen carrier. It also **relocates** an attached
  Equipment for nothing — **434.1.f** (*"Attaching a card to a new Top-Most Card will cause it to
  Detach"*), **434.4** (*"its location becomes the same as the new Top-Most Card"*), **434.4.a**
  (*"This is not a Move."*) — with no [Ganking] and no move trigger. **434.1.g** closes the obvious
  loop: *"Attaching a card to its current Top-Most Card will not have any effect"*, which is also
  why [Weaponmaster] has to spell out "even if it's already attached".
- **456.3 — *"A Recall cannot be prevented by actions and Game Effects that restrict or block
  Movement."*** This is the paragraph that decides what a movement lock is worth. Vilemaw's Lair
  (*"Units can't move from here to base."*) does **not** strand a failed attack: **466.1.a.2**'s
  combat cleanup, *"Recall Attackers present at the Battlefield if Defenders are still present"*,
  is a Recall (455, *"relocated from anywhere to its Base without it being a Move"*) and goes
  through. The Lair strands only the bodies that meant to stay — the garrison that took it.

---

## 3. Refusals

### 3.1 Five of the 47 battlefields are banned in both formats

The marker lives in `data/corpus_flat.txt`, not in `cards.json` — the same trap the small-combo
matrix hit on 2026-09-06. `grep "| Battlefield |" data/corpus_flat.txt | grep BANNED`:

| code | name | text | why it looked worth walking |
|---|---|---|---|
| OGN-276 | Aspirant's Climb | *"Increase the points needed to win the game by 1."* | the only card that moves the Victory Score |
| OGN-284 | Obelisk of Power | *"At the start of each player's first Beginning Phase, that player channels 1 rune."* | worded "that player", so 190.6.d never blanks it |
| OGN-285 | Reaver's Row | *"When you defend here, you may move a friendly unit here to base."* | a free evacuation on the defending side (#58's family) |
| OGN-290 | The Arena's Greatest | *"At the start of each player's first Beginning Phase, that player gains 1 point."* | see 3.2 |
| OGN-292 | The Dreaming Tree | *"When a player chooses a friendly unit here with a spell for the first time each turn, they draw 1."* | worded "they", works uncontrolled |

### 3.2 The Arena's Greatest could not have rescued a 7-point line even if it were legal

Worth recording because the arithmetic is tempting and wrong twice over. CLAUDE.md carries a
refusal that reads *"Trinity Force + Skyfall + Reckoner's Arena is SEVEN … one short"*, and a
battlefield that hands you a free point looks like the missing eighth. It is not:

1. **OGN-290 is banned in constructed and in 2v2.**
2. **Reckoner's Arena is itself a battlefield.** 485.4.a puts exactly one of your three into a Duel
   and 103.4.c forbids two of a name, so **two of your own battlefields never share a board** — the
   fix and the line it would fix cannot both be on the table. Any future "a free point closes this
   gap" argument has to clear that first.

### 3.3 UNL-219 Vaults of Helia — a pure drawback with no upside to buy

*"When you hold here, your non-token units cost :rb_energy_1: more to play this turn."* The clause
names only **your** units, so the tax is one-sided; there is no payoff attached to pay for it and no
"opponents also" half. A token-only deck ignores it, which makes it a blank rather than a synergy.
Refused. (It is already registered in CLAUDE.md as a **doubled-drawback** false positive on the
synergy side; this is the combo-side verdict.)

### 3.4 SFD-207 Emperor's Dais is anti-synergic with the cycle that would otherwise power it

*"When you conquer here, you may pay :rb_energy_1: and return a unit you control here to its
owner's hand to play a 2 :rb_might: Sand Soldier unit token here."* The token is born **at a
battlefield**, which is the scarce thing #48 measured (13 of 49 token-makers say "here"). But the
Sand Soldier is a permanent body at the Dais, so at your next Beginning Phase you **control** the
battlefield, 315.2.b.2 Holds it, and 470 refuses the next Conquer — the Dais switches its own engine
off after one use. Deferred to a later batch as a one-shot with a strong ETB body instead.

### 3.5 OGN-283 Navori Fighting Pit and OGN-288 Startipped Peak stay refused

Both are already refused in CLAUDE.md and both re-checked here rather than re-derived: the Pit's
Hold-triggered buff readies nothing because 315.1 has already run when 315.2.b.2 fires, and the
Peak's channelled rune enters exhausted after Awaken, so its Power would land in the Beginning
Phase only for 167 to empty the pool at the Main Phase. Recorded so the next session does not
re-open them.

---

## 4. Standing notes for CLAUDE.md (manager's call)

1. **A "when you conquer here" battlefield is a one-shot** — 315.2.b.2's mandatory Hold plus 470
   plus 348.2.a — **unless the battlefield is deliberately vacated inside your own Beginning Phase**,
   which a `[Temporary]` garrison does for free (816.1.b before 315.2.b, 319.6 → 323.6 in the
   Neutral Open State of 310.1). **The opponent gets no window to steal it**: 144.1.a/b/c and
   312.2.a leave no state in which they both hold priority and may move. Twelve battlefields carry
   the clause.
2. **456.3: a Recall cannot be prevented by anything that restricts or blocks Movement.** So no
   movement lock in the pool (Vilemaw's Lair, Mageseeker Warden's play ban, a [Ganking] denial)
   ever stops 466.1.a.2's combat cleanup, a Guardian Angel save, or 323.7's gear recall.
3. **[Weaponmaster] says "to me"; SFD-208 Forge of the Fluft says "to a unit you control".** The
   Forge is the only free attach in the pool that can place a carrier-dependent Equipment on a
   chosen carrier, and 434.1.f/434.4/434.4.a make it a free relocation of an already-attached
   Equipment across the board that is **not a Move**. 434.1.g caps it at one useful attach per
   target — re-attaching to the current Top-Most Card does nothing.
4. **108.3.c makes the Champion Zone a one-way door and OGN-281 Hallowed Tomb is the pool's only
   key** (2 corpus rows for "champion zone"; the other empties it). **UNL-172 LeBlanc, Fragmented
   is the only unit in the pool that is both a legal Chosen Champion and carries a Deathknell** —
   Kog'Maw, Karthus and Ekko all have Deathknells and no legend prints their tags, so they can
   never fill the slot. 103.2.a.3 also makes the Chosen Champion a **name**, not a card.
5. **The ban marker for battlefields is in `corpus_flat.txt`, not `cards.json`** — five of the 47
   uncatalogued battlefields are banned in both formats and a card-set check does not surface it.
   Same trap as the small-combo matrix's bucket D.

---

# Batch 2 — five more battlefields

## 5. The check that should be run on every battlefield before anything else

> **190.6.d blanks a battlefield's text through the WORD "you", and nothing else.**
>
> *"'You' in a battlefield's abilities refers to the battlefield's Controller, as does the implied
> 'you' in instructions that don't specify a player like 'draw 1.' If the battlefield has no
> Controller, 'you' refers to no one, and all such instructions are ignored."*

#161 found this on UNL-214 Ripper's Bay. Batch 2 found **three more battlefields whose text never
says "you" and which are therefore live from turn one, with no Control and no walk-in**:

| code | name | the wording that saves it |
|---|---|---|
| VEN-164 | Sandswept Tomb | *"…that are **friendly to it**"* — keys on the spell's controller |
| UNL-212 | Frozen Fortress | *"At the start of **each player's** Beginning Phase…"* |
| VEN-157 | Dragon Roost | *"**Any player** may pay…"* |
| UNL-210 | Forbidding Waste | *"While **a unit** here is defending alone…"* |
| OGN-295 | Vilemaw's Lair (batch 1) | *"**Units** can't move from here to base."* |

Five of the sixty-six, against every `While you control this battlefield` card, which is a real cost
(190.1, and the walk-in that 466.5 or 344.2 charges for). **Run the check on the word.**

## 6. Entries staged (batch 2, five)

| id | class | cards | what it is |
|---|---|---|---|
| `academy-ezreal-gust-double-bounce` | ENGINE | UNL-216, SFD-149, OGN-169 | The Academy *grants* [Repeat] to a spell that has none; Ezreal takes the cost to 0 |
| `sandswept-tomb-public-execution` | ENGINE | VEN-164, VEN-154 | 1 Power off all 24 spells that choose a friendly unit there |
| `frozen-fortress-soul-shepherd-asymmetric-sweep` | ENGINE | UNL-212, UNL-077 | a permanent one-sided 1-Might filter, twice a round |
| `dragon-roost-mountain-drake-instant-garrison` | ENGINE | VEN-157, OGN-142 | a Dragon played straight onto the battlefield, no walk |
| `forbidding-waste-wuju-bladesman-lone-defender` | ENGINE | UNL-210, OGS-019, OGN-133 | −2 on their lone defender, +2 back on yours |

### 6.1 The Academy is not a duplicate of Marai Spire, and they cannot share a board

`ezreal-marai-spire-free-repeat` discounts spells that **already print** [Repeat] — fourteen of them.
**UNL-216 The Academy** *grants* the keyword: *"When you hold here, give your next spell this turn
[Repeat] equal to its base cost."* That reaches any spell in the pool, once a turn, off a free Hold.
Both stand on 356.4.c's worked example (Ezreal applied to a [Repeat] additional cost), and
**485.4.a + 103.4.c make them alternatives, never a stack** — one of your three battlefields enters a
Duel and two of a name are forbidden. Both entries now cross-reference the other.

### 6.2 143.3.b.1 — damage never accumulates across turns

> *"Damage is Healed from Units at two specific times: **At the end of each player's turn.** During a
> Combat Cleanup."*

Never cited in this project before, and it is what decides the worth of every repeating damage
source. **UNL-212 Frozen Fortress** (*"At the start of each player's Beginning Phase, deal 1 to each
unit here"*) is therefore a permanent 1-Might **filter**, not a clock: a 2-Might body standing there
forever is never in danger.

**Refusal, walked and recorded:** Frozen Fortress cannot feed **UNL-174 Shard of Undoing**
(*"The first time a friendly unit dies **during your Beginning Phase** each turn, each opponent must
kill one of their units"*). Any 1-Might body you send there in your Main Phase is killed at the
**opponent's** Beginning Phase, which comes first; and 143.3.b.1 heals the mark at the end of every
turn, so a 2-Might body cannot die on a second tick either. The Fortress can only ever kill a
friendly body in the opponent's window.

**The unbounded Shard feed that does exist** (lead for another session, both cards already
catalogued, so out of this walk's lane): **UNL-084 Sprite Queen**'s Sprite carries [Temporary], and
816.1.b kills it *"at the start of this permanent's controller's Beginning Phase, before scoring"* —
which is the Shard's window — while Sprite Queen makes a replacement in the same instant. CLAUDE.md
records the Sprite Fountain feed as **bounded** (383.3.e.1, each Fountain feeds exactly two turns);
Sprite Queen's is not bounded at all.

### 6.3 Dragon Roost is the second door in the pool onto a battlefield with no move

**355.2.b** — *"Some Game Effects may grant players permission to play Units to locations that are
not normally Valid. Such locations become Valid for the purposes of Playing the Unit."* — against
355.2.a's default of your base or a battlefield you control. With **190.3.a.1** (*"Units moving to
**or being played to** a battlefield apply Contested status"*) and **464.2.c.1**, a Dragon played to
an occupied enemy Roost is the Attacker with no Standard Move, so 144.2's exhaust never comes up and
143.4's entering exhausted costs nothing. SFD-093 Dauntless Vanguard does this for one body; the
Roost does it for every Dragon in the deck, for 2 rainbow Power.

**The one Dragon it cannot carry:** SFD-015 Perched Grimwyrm, *"Play me only to a battlefield you
conquered this turn. (You can't play me anywhere else.)"* — **054.2**, *"If a card specifies that an
action can 'only' be performed under certain circumstances, it cannot be performed under any other
circumstances."*

### 6.4 A defect the test caught before the entry was staged

The first draft of `sandswept-tomb-public-execution` named **five Body/Order legends**. Four of them
are illegal: **VEN-154 Public Execution is a Signature card tagged Ambessa** (`signature: true` in
`cards.json`), so 103.2.d.2 forces the one legend carrying that tag —
**VEN-153 / VEN-196 Matriarch of War** — and `test/legend-lines.test.ts` said so on the first run.
This is the #167 failure class reproducing itself in a fresh walk: *a Signature card in `uses[]`
makes `prerequisites.easy` a one-legend field, not a domain field.* Run the check, do not reason
about it.

## 7. More refusals

### 7.1 UNL-208 Black Flame Altar is worth exactly ZERO on a Reflection

*"Units here with [Temporary] have [Shield]. (+1 :rb_might: while they're defenders.)"* The obvious
partner is UNL-081 Keeper of Masks, whose play effect makes two Reflection copies of itself, all
three of them [Temporary]. But **R27** ruled that Might is not a copyable trait, so a Reflection
copy stands at **0 Might** — and **143.2.a** kills on *"nonzero damage … equalling or exceeding its
Might"*, so a 0-Might body already costs an attacker exactly 1 damage, and **465.2.c.4** forbids
assigning more than the minimum needed. Raising it to Might 1 changes the bill from 1 to 1. The
Altar is worth **+1 damage per [Temporary] body with printed Might** (the Keeper himself, a
3-Might Sprite) and nothing at all on the tokens such decks are actually made of. Not staged.

### 7.2 UNL-219 Vaults of Helia, SFD-207 Emperor's Dais, OGN-283 Navori Fighting Pit,
### OGN-288 Startipped Peak, and the five banned battlefields

Carried forward from §3; none re-opened.

## 8. Standing notes for CLAUDE.md (batch 2)

6. **Run the "you" check on every battlefield before assuming it needs Control.** 190.6.d blanks a
   battlefield's text through that word alone. Five of the sixty-six survive it and are live from
   turn one: UNL-214 Ripper's Bay, VEN-164 Sandswept Tomb, UNL-212 Frozen Fortress, VEN-157 Dragon
   Roost, UNL-210 Forbidding Waste, plus OGN-295 Vilemaw's Lair.
7. **143.3.b.1 — damage is healed at the end of EACH player's turn.** Nothing in the pool
   accumulates damage across a round, so every repeating 1-damage source is a Might filter, never a
   clock; and a "friendly unit dies during YOUR Beginning Phase" payoff cannot be fed by a
   symmetric Beginning-Phase damage source, because the opponent's phase comes first.
8. **UNL-216 The Academy GRANTS [Repeat] to a spell that has none**, which is a strictly wider door
   than SFD-211 Marai Spire's discount on the fourteen that print it — and 485.4.a + 103.4.c make
   the two mutually exclusive.
9. **355.2.b is the paragraph behind every "play me somewhere unusual" card**, and read with
   190.3.a.1 + 464.2.c.1 a unit *played* to an occupied enemy battlefield is the Attacker with no
   move and no 144.2 exhaust. VEN-157 Dragon Roost extends that to every Dragon in the deck for
   2 rainbow Power; 054.2 is why SFD-015 Perched Grimwyrm is the one exception.
10. **R27 makes a Reflection 0 Might, and 143.2.a + 465.2.c.4 mean a 0-Might body already costs an
    attacker one damage** — so granting [Shield 1] to a Reflection wall adds nothing. Price a wall
    in damage, not in Might.

---

# Batch 3 — five more battlefields

## 9. Entries staged (batch 3, five)

| id | class | cards | what it is |
|---|---|---|---|
| `kinkou-temple-lillia-bird-tank-wall` | ENGINE | VEN-159, UNL-058, UNL-044 | +1 Might on a Tank wall doubles the damage bill, 4 → 8 |
| `mystic-vortex-helm-suppression-tax` | ENGINE | VEN-160, VEN-045 | the two windows 312.2.a gives an opponent, both priced |
| `risen-altar-ambessa-empower-power-rebate` | ENGINE | VEN-163, VEN-136 | a POWER off an [Empower] cost, permanent after one payment |
| `forgotten-library-jhin-spent-four` | ENGINE | UNL-211, UNL-089 | one 4-Energy spell pays both halves of the "if you spent" family |
| `monastery-hirana-warmogs-conquer-draw` | ENGINE | OGN-282, SFD-108 | a card per Conquer — offset by one, and 383.3.b is why |

### 9.1 The Monastery walk is the one worth reading twice

**OGN-282 Monastery of Hirana**: *"When you conquer here, you may spend a buff to draw 1."*
**SFD-108 Warmog's Armor** ([Effect]): *"When I conquer, buff me."*

The obvious walk is "both trigger on the same Conquer; 383.3.d lets me order them, so put Warmog's
first and spend the buff it just placed." **That is wrong.** The Monastery's cost sits immediately
after the "you may" that opens its effect, and **383.3.b** makes such a cost the Triggered Ability's
**base cost** — Riot's own worked example for the paragraph is Ekko, Recurrent's *"Recycle me to
ready your runes"* — with **383.3.b.1**: *"The cost must be paid in order to finalize the Triggered
Ability to the Chain."* Every trigger of a simultaneous batch is finalized before any of them
resolves, so on the first Conquer there is no buff and the Monastery's ability is simply never
finalized (203.3).

From the **second** Conquer on it works, permanently, and **702.3 is what keeps it unjammed**:
the Monastery spends the buff at finalization (702.2.b), so the carrier is unbuffed by the time
Warmog's resolves and 702.3.a does not block the replacement. One card per Conquer, forever, for no
Energy and no Power — offset by exactly one Conquer, stated in the entry rather than glossed.

This is the family CLAUDE.md already warns is priced wrong when read as pay-on-resolution. It is
worth checking 383.3.b **before** writing the steps, not after.

### 9.2 A "one rainbow less" discount has to reach a domain rune

**VEN-163 Risen Altar**: *"[Empower] costs of your units here cost :rb_energy_1: or
:rb_rune_rainbow: less."* No card in the pool prints a rainbow Power **cost** — the icon appears
only as a Deflect payment and as an [Add] output — so under rule 002 the rainbow half has to come
off a domain rune or the clause is dead letter. That is the same argument the project used for R28.
It makes the Altar worth most on the heaviest **Power** Empower cost among units, which
(extracting and sorting every `[Empower]` cost string in the corpus) is **VEN-136 Ambessa,
Respected and Feared**, E1 + two Order runes — the only unit Empower cost with two domain runes.

441.1.b (*"An Empowered Game Object can not be Empowered"*) and 441.2 make the rebate **once per
body and permanent**. And the Altar says "units", so the four gear with [Empower] costs get nothing.

### 9.3 Kinkou Temple is the only card in the pool that keys on [Tank]

*"Units here with [Tank] have +1 :rb_might:."* — the fifth battlefield of this walk whose text never
says "you". **815.1.c.2**: *"Units without Tank are invalid assignments until all units with Tank
have lethal damage assigned to them"*, with 815.1.c.1 and 465.2.c.4 pinning each to the minimum.
The project had already measured four 1-Might Tank Birds as exactly **4** damage; at Kinkou Temple
they are 2 Might and the bill is **8**. A wall is priced in damage, so +1 per body **doubles** it.
Lillia has no Tank herself, so 815.1.c.2 puts her behind them: 8 + 8 on the turn the Birds land
(her M4 plus +4 from four tokens played), 8 + 4 afterwards.

### 9.4 A note on `sprite-queen-dusk-rose-lab-shard-undoing` (not a defect)

Batch 2 offered Sprite Queen × Shard of Undoing as a lead; the manager pointed out it is already
catalogued, and the existing entry's claim ("unbounded in turns", one forced kill per Beginning
Phase) matches what this walk found. **One refinement, offered rather than asserted:**
UNL-209 Dusk Rose Lab is *not load-bearing for the Shard half*. The Sprite carries [Temporary], and
**816.1.b** kills it *"at the start of this permanent's controller's Beginning Phase, before
scoring"* on its own — which is already inside the Shard's window. The Lab's contribution is the
*"draw 1"* on its optional kill, and it costs the deck its one battlefield slot (485.4.a). Worth
saying in that entry's notable so a future reader does not treat the Lab as a requirement.

## 10. Standing notes for CLAUDE.md (batch 3)

11. **Check 383.3.b before writing the steps of any trigger worded `you may <cost> to <effect>`.**
    The cost is the trigger's BASE COST and 383.3.b.1 pays it to **finalize**, so it is paid before
    anything in the simultaneous batch resolves — a buff, a token or a resource produced by another
    trigger of the same event **cannot** pay it, whatever order 383.3.d puts them in. The honest
    shape of such an engine is offset by one event (`monastery-hirana-warmogs-conquer-draw`).
12. **A "one rainbow less" discount has to come off a domain rune** — no card in the pool prints a
    rainbow Power cost — so measure such a discount against the heaviest **Power** component, not
    the Energy. VEN-136 Ambessa, Respected and Feared has the only unit [Empower] cost with two
    domain runes.
13. **VEN-159 Kinkou Temple is the only card in the pool that keys on [Tank]**, and because a wall
    is priced in damage (815.1.c.1/c.2 + 465.2.c.4) a flat +1 Might per body **doubles** it. The
    project's four-Birds-absorb-four measurement becomes eight there.
14. **VEN-160 Mystic Vortex is the only card in the pool that makes a [Hidden] card cost anything.**
    811.1.b plays it "ignoring its base cost"; the Vortex's own reminder ("Hidden cards have
    [Reaction]") is why it catches the fifteen hidden units that a spell tax cannot. The pool has
    exactly three cost-increase rows: VEN-045 Helm of Suppression (the only asymmetric one),
    VEN-160, and UNL-219 Vaults of Helia (which taxes its own controller).

---

# Batch 4 — four of the ten uncatalogued legends, plus a battlefield

Another session began walking battlefields between batches 2 and 3 (the catalogue went 401 → 443
while this walk was writing three entries), so the census is re-run **every batch** and batch 4
pivots to the legend sub-vein, which is uniquely this walk's.

## 11. Entries staged (batch 4, five)

| id | class | cards | what it is |
|---|---|---|---|
| `void-gate-bellows-breath` | ENGINE | OGN-296, SFD-080 | a seventh Bonus Damage source, paid per target by 715.2 |
| `purifier-veteran-poro-blade-stack` | ENGINE | SFD-183, SFD-095, SFD-099 | "your Equipment **each** give [Assault]" × 807.2 summing |
| `mechanized-menace-breakneck-mech-token-keywords` | ENGINE | SFD-181, SFD-071, SFD-021 | Shield + Deflect + **Ganking** on every Mech token |
| `eye-of-twilight-zephyr-sage-tank-redirect` | ENGINE | VEN-147, OGS-005 | [Tank] granted *after* the attack is declared |
| `scorn-of-the-moon-showdown-energy` | ENGINE | UNL-197, OGN-095 | Reaction mana that costs no rune held ready |

## 12. Four rules facts from batch 4

### 12.1 715.2 — Bonus Damage is paid **per target**

> *"If the Deal action has multiple targets, the amount of Damage dealt to each target is increased
> by the amount of Bonus Damage."*

The project's Bonus Damage sweep had recorded **six** sources, every one of them worded *"your
spells and abilities deal N"*. **OGN-296 Void Gate** is a **seventh**, worded for the location
(*"Spells and abilities deal 1 Bonus Damage to units here"*) — so it never says "you", is live from
turn one, and arms the opponent too. Against SFD-080 Bellows Breath (*"Deal 1 to up to three units
at the same location"*) that is **6 damage for 1 Energy + 1 Mind Power**, or 12 with the printed
[Repeat]. 714 sums instances, so it stacks with the six; 715.4 (*"If no damage was Dealt, then Bonus
Damage will not apply"*) is the limit; and 713 + 417.6.c keep it disjoint from the excess-damage
family, which is the trap this battlefield invites.

### 12.2 807.2 — granted [Assault] **sums**, and "each" is a per-Equipment grant

**SFD-183 Purifier**: *"Your Equipment **each** give [Assault]."* Read with 807.2 (*"…the Assault
Value of all granted Assault keywords is summed"*, Riot's example being Petty Officer + Cleave
reaching Assault 4), stacking Equipment on **one** body stacks the keyword. Three Doran's Blades on
Veteran Poro: Might 2 + 6 (434.1.d) = 8 standing, **11 attacking**, for E8 + 2 Body Power — the
[Equip] costs and the Power counted, per this project's standing correction. [Weaponmaster] frees
exactly one of the three attaches, on play only (818.1: attaching is never playing).

The *other* direction the same legend opens — one Equipment on each of several attackers, +1 each,
144.3 moving them as one action — is flagged in the entry as a separate line rather than folded into
its ledger.

### 12.3 187.4 gives a Mech token its tag **by rule**

> *"A 3 [M] Mech token is a domainless unit token with 3 Might and the Mech tag."*

So **SFD-181 Mechanized Menace** (*"Your Mechs have [Shield]"*) and **SFD-071 Breakneck Mech**
(*"Your Mechs have [Deflect] and [Ganking]"*) both reach tokens with no extra text. The valuable
keyword is the third one: Ferrous Forerunner's Deathknell puts its two tokens *"to your base"*, and
144.4.a/144.4.b would confine a base-born token to one battlefield forever — **144.4.c.1's Ganking
is the leg the project has measured as the bottleneck of every token line.** 810.1.c.3 keeps it an
*option* and not an extra move; 810.2 makes a second instance redundant.

### 12.4 Granting [Tank] to one body protects **every other body**

**VEN-147 Eye of Twilight**: *"[Action][>] exhaust: Give a friendly unit [Tank] this turn."*
815.1.c.2 — *"Units without Tank are invalid assignments until all units with Tank have lethal
damage assigned to them"* — inverts the obvious reading: the granted body is not protected, it is
the **toll booth**. On OGS-005 Zephyr Sage (M6, [Shield]) the toll is exactly **7** summed attacking
Might (814.1.c + 815.1.c.1 + 465.2.c.4), and every other unit of yours there is an illegal
assignment until it is paid — which is what keeps the garrison, and with it Control (323.6).

And **806.1.c.2** is why the timing is the card: *"On Activated Abilities: 'This can be activated
during showdowns on any player's turn.'"* Grant it after 464.2.c.3 has designated the attackers and
you can count 465.2.c's summed Might — never in your Main Phase on a guess.

### 12.5 415.3.a is why Scorn of the Moon is a whole legend's text

**UNL-197 Scorn of the Moon**: *"[Reaction][>] exhaust: [Add] 1 Energy. Spend this Energy only
during showdowns."* Holding a rune back for Reaction mana costs that rune for the whole of your turn
**and** the whole of the opponent's — 415.3.a: *"A player Readies all non-spell Game Objects they
Control during the Awakening Phase on their turn."* Scorn's Energy needs no rune held: 315.1.b
readies the legend every Awaken and the ability is [Reaction], so the mana is created at the instant
it is spent. Its own parenthesis (*"Abilities that add resources can't be reacted to"*) is 429.2 and
429.2.a printed on a card. 167 is why it cannot be banked.

It is the **opposite deck** to this walk's own `mystic-vortex-helm-suppression-tax`, which prices
[Reaction] cards in showdowns up. Named in both entries so they are never built together.

## 13. Standing notes for CLAUDE.md (batch 4)

15. **715.2 pays Bonus Damage PER TARGET**, and **OGN-296 Void Gate is a seventh source** the
    project's six-card sweep missed because it is worded for the location rather than as "your
    spells and abilities" — which also means it never says "you" (190.6.d) and arms the opponent.
    714 sums instances; 715.4 means it augments a Deal and never creates one; 713 + 417.6.c keep the
    whole family disjoint from excess damage.
16. **807.2 sums granted [Assault] exactly as 814.2 sums granted [Shield]**, and SFD-183 Purifier's
    *"Your Equipment **each** give [Assault]"* is a per-Equipment grant — so stacking Equipment on
    one body stacks the keyword as well as the Might Bonuses (434.1.d).
17. **187.4 gives a Mech token the Mech tag by rule**, so every "your Mechs have X" static reaches
    tokens with no extra text. SFD-071 Breakneck Mech grants them **[Ganking]**, which is the one
    keyword that answers the base-born-token bottleneck (144.4.a/b confine them; 144.4.c.1 does not).
18. **Granting [Tank] to ONE body is a protection for every OTHER body** (815.1.c.2), not for the
    body granted — and VEN-147 Eye of Twilight grants it at [Action] speed (806.1.c.2), i.e. after
    the attackers are designated and their summed Might is countable.
19. **415.3.a is the reason off-turn mana is worth a legend's whole text**: a rune exhausted on your
    turn is dead for the whole of the opponent's. UNL-197 Scorn of the Moon and VEN-141 Butcher of
    the Sands both sell Reaction-speed Energy that needs no rune held ready; 167 is why it must be
    added inside the showdown it is spent in.

---

# Batch 5 — the last three legends. The legend sub-vein is CLOSED.

After batch 5 merges, **0 of the 49 legend names are uncatalogued.** The walk opened with ten;
Green Father was taken by a parallel session, and the other nine were walked here:
Bounty Hunter (batch 1), Wuju Bladesman - Starter (batch 2), Purifier / Mechanized Menace /
Eye of Twilight / Scorn of the Moon (batch 4), and the three below.

| id | class | cards | what it is |
|---|---|---|---|
| `might-of-demacia-four-body-conquer-draw` | ENGINE | OGS-023, OGS-015, SFD-171 | four bodies walked in as ONE action, 2 cards per Conquer |
| `prodigal-explorer-two-choices-draw` | ENGINE | SFD-199, OGN-095, OGN-169 | two separate choices, never one doubled spell |
| `butcher-of-the-sands-spent-rune-refund` | ENGINE | VEN-141, OGN-158 | the pool's only Power → Energy conversion |

`might-of-demacia-four-body-conquer-draw` produces `conquer-engine`, so it now feeds this walk's own
`treasure-hoard-renata-conquer-gold` and `monastery-hirana-warmogs-conquer-draw`.

## 14. A correction to §1 of this document, from the #175 cross-audit

> **The "when you conquer here" battlefields are FOURTEEN, not twelve, and four of them were already
> catalogued when this walk started.**

`grep -i "conquer here" data/corpus_flat.txt` returns fourteen rows: OGN-282 Monastery of Hirana,
OGN-287 Sigil of the Storm, OGN-289 Targon's Peak, OGN-291 The Candlelit Sanctum, OGN-298 Zaun
Warrens, SFD-207 Emperor's Dais, **SFD-210 Hall of Legends**, SFD-212 Minefield, SFD-217 Seat of
Power, SFD-218 Sunken Temple, SFD-220 Treasure Hoard, **SFD-221 Veiled Temple**, **UNL-217 Trapping
Grounds**, VEN-162 Protective Sands.

**How the miscount happened, because the shape matters more than the number:** §1 built the count
from this walk's own *free-battlefield* list rather than from the pool, so the three already
catalogued rows were invisible to it. That is the same failure the manager identified in the Bonus
Damage sweep the same night — a counted set whose membership was determined by an assumption
(there, a wording: "all six say *your* spells and abilities", which a battlefield worded for the
LOCATION could not match; here, a filter). **The standing response is to NAME the members of any
counted set, so the next grep refutes it cheaply.** Every uniqueness and cardinality claim in
batches 4 and 5 is written that way — the eleven `[Add] :rb_energy` rows are listed inside
`butcher-of-the-sands-spent-rune-refund`'s own note for exactly this reason.

The conclusion of §1 is unaffected: whatever the count, a `when you conquer here` clause fires once
per game unless the battlefield is deliberately vacated.

## 15. Three rules facts from batch 5

### 15.1 164.2 — a Basic Rune has exactly two abilities, and only one of them costs an exhaust

> *"164.2. A Basic Rune always has the following two Abilities: **164.2.a.** [E]: [Reaction] — Add
> [1]. **164.2.b.** Recycle this: [Reaction] — Add [C]."*

164.2.a's cost is an exhaust; 164.2.b's cost is the **recycle**, and carries none. So a rune already
tapped for Energy this turn can still be recycled for a Power. **VEN-141 Butcher of the Sands** is
the only card in the pool whose [Add] Energy ability costs Power (swept: eleven corpus rows contain
`[Add] :rb_energy`, and its cost is the only one with a rune in it) — so it turns spent runes into
Energy. 161.2.b returns them to the Rune Deck and 315.3.b channels two back every Channel Phase, so
recycling two a turn is a steady state.

The honest verdict is stated **against** the project's own figure rather than around it: a Power
inside a loop is worth roughly nine Energy, so this is the wrong direction as an exchange. What it
sells is that the Power came out of runes with no second use.

### 15.2 144.3 is what makes a "4+ units here" threshold reachable

**OGS-023 Might of Demacia**: *"When you conquer, if you have 4+ units at that battlefield, draw 2."*
It says *"when you conquer"*, not *"here"* — so it is **not** one of the fourteen, and it pays at
every battlefield. 383.2.a.1 makes the 4+ part of the Trigger Condition, measured when the trigger
is placed. 144.3 (*"one game action performed on multiple Units"*, 144.3.a shared destination,
144.3.c simultaneous exhausts) walks four in at once, and 144.4.a.1's cap counts **other players**
(447.2.a: *"In Modes of Play with more than two players"*), so a Duel has no limit. On the bloodless
344.2 route no damage is ever assigned, so all four are still standing to be counted.

OGS-015 Recruit the Vanguard's own parenthesis is 355.2.a restated (*"They can be played to your
base or to battlefields you control"*), which is why the four **must** walk — and why SFD-171 Renata
Glasc, Industrialist is load-bearing rather than a luxury here: R25 = A beats 143.4, and the project
has separately measured that "enters ready" is worth *nothing* on a token made on the opponent's
turn. These are made in your own Main Phase and must move in the same one.

### 15.3 Build the line to avoid an unruled question, not to test it

**SFD-199 Prodigal Explorer**: *"Use only if you've chosen enemy units and/or gear twice this turn
with spells or unit abilities."* Whether one [Repeat] spell's two executions count as two choices is
unruled (820.3.a: the spell *"is only Played once"*, against 820.2's two sets of choices), and
`ezreal-marai-spire-free-repeat` had already flagged it. This entry uses **two different 1-Energy
spells** — same cost, no reading filed. 355.10.d is the companion: a Game Object *"programmatically
selected based on its characteristics rather than chosen"* is not chosen, so a mass effect
contributes nothing to the counter however many enemies it hits.

## 16. Standing notes for CLAUDE.md (batch 5)

20. **The "when you conquer here" battlefields are FOURTEEN** (named in §14), not twelve — and the
    miscount came from counting a filtered list instead of the pool. **Name the members of any
    counted set** so the next grep refutes it cheaply; that is the second time in one night a
    counted set was wrong because its membership rested on an assumption.
21. **164.2.b's cost is the RECYCLE and carries no exhaust**, so a rune already tapped for Energy
    still recycles for a Power the same turn. **VEN-141 Butcher of the Sands is the pool's only
    Power → Energy conversion** (eleven `[Add] :rb_energy` rows; its cost is the only one containing
    a rune) and it is the mirror of SFD-117 Ancient Henge. By the project's own ~9-Energy-per-Power
    figure the exchange is the wrong direction; what it sells is that the Power came from spent runes.
22. **144.3 + 144.4.a.1 mean a Duel puts no cap on how many of your own bodies enter one battlefield
    in one Main Phase**, as one game action with one shared destination — which is what makes
    OGS-023 Might of Demacia's "4+ units at that battlefield" threshold reachable at all. Note it
    says *"when you conquer"*, not *"here"*, so it pays at every battlefield.
23. **ALL 49 LEGEND NAMES ARE NOW CATALOGUED.** The legend sub-vein of #171 is closed; the remaining
    uncatalogued deckable cards are battlefields (25, of which 5 are banned in both formats) and
    units, spells, gear and runes.
