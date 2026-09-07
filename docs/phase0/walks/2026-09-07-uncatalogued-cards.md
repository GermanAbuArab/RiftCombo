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
