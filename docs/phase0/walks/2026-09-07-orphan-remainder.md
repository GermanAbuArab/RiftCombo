# Walk — the orphan remainder

Issue [#193](https://github.com/GermanAbuArab/RiftCombo/issues/193). Session `rc-walk-order`,
2026-09-07, assigned by rc-manager4 in three parts. Successor slice to
[#180](https://github.com/GermanAbuArab/RiftCombo/issues/180) (mono-Order, closed 139/139),
[#186](https://github.com/GermanAbuArab/RiftCombo/issues/186) (mono-Body, closed 137/137) and
[#188](https://github.com/GermanAbuArab/RiftCombo/issues/188) (Calm/Mind, closed).

Rules version 2026-07-16; card text verbatim from `data/corpus_flat.txt`, every paragraph opened in
`data/Riftbound-Core-Rules-2026-07-16.txt`. Entries staged at `/tmp/rc-walks/rc-walk-uncat.json`.

---

## 1. Part 2 first — the fam1 census discrepancy, and it is a SCOPE gap that decomposes exactly

`rc-walk-fc` closed its lane reporting **7 base codes / 6 names**, four of them banned. This
session's pool-wide census read the Fury/Body/Chaos block at **17 base / 13 names**. rc-manager4
asked which it was — a real gap or a measurement disagreement — and required the members named.

Script `/tmp/rc-walks/fam1-list.ts`, deduped by **BASE** over `data/cards.json` (never `poolOf()`),
filter `domains ⊆ {fury, body, chaos}`, 444 base codes in the block. All 13 uncovered names:

| card | domain | who owns it |
|---|---|---|
| `OGN-168 Fight or Flight` | chaos | fc — **banned in both formats** |
| `OGN-182 Scrapheap` | chaos | fc — **banned in both formats** |
| `SFD-020 Draven, Vanquisher` | fury | fc — **banned in both formats** |
| `SFD-122 Called Shot` | chaos | fc — **banned in both formats** |
| `OGN-171` / `UNL-224 Mystic Poro` | chaos | fc |
| `OGN-175 Shipyard Skulker` | chaos | fc |
| `OGN-007` / `VEN-R01 Fury Rune` | fury | **not in fc's closing number** |
| `OGN-166` / `VEN-R05 Chaos Rune` | chaos | **not in fc's closing number** |
| `OGN-126` / `VEN-R04 Body Rune` | body | mine — refused, #186 §25.1 |
| `SFD-096 Laurent Bladekeeper` | body | mine — refused, #186 §25.2 |
| `SFD-098 Sea Monkey` | body | mine — refused, #186 §25.3 |
| `UNL-092 Demacian Diplomat` | body | mine — refused, #186 §25.4 |
| `UNL-202 Void Assault` | **body/chaos** | **NOBODY** |

**The arithmetic closes with nothing left over.** fc's six names are the four banned plus Mystic Poro
and Shipyard Skulker; fc's seven base codes are those four plus Mystic Poro's two printings plus
Shipyard Skulker. The difference from 17 / 13 is exactly **three runes (6 base / 3 names) + three
already-recorded mono-Body refusals (3 / 3) + `UNL-202 Void Assault` (1 / 1)** = 10 base / 7 names,
and 17 − 10 = 7, 13 − 7 = 6.

**Verdict: a scope gap, not a measurement error, and the two numbers were never in conflict.** fc's
lane was Fury/Chaos; Body pairs were never inside it, and the runes are not in its closing ledger.
Two things fall out and both are actionable:

1. **`UNL-202 Void Assault` (Body/Chaos, E2 P1) is genuinely uncovered and in no lane.** Walked below.
2. **The Fury Rune and the Chaos Rune are in nobody's ledger.** They take the same refusal this
   session has now applied five times — **164.2** gives every Basic Rune the same two abilities
   (164.2.a an exhaust for Energy, 164.2.b a recycle for Power) and **161.2.a** fixes the Rune Deck
   at *"Exactly 12 Rune cards"*; every deck runs runes, so there is no pairing to walk. Recorded here,
   this completes a **six-rune refusal across the whole pool**: Order (#180 §18), Body (#186 §25.1),
   Calm and Mind (#188 §46.1), Fury and Chaos (here).

---

## 2. Part 1 — four entries, and a correction to a fact this session itself reported

| id | class | cards | the name it clears |
|---|---|---|---|
| `highlander-towering-combatant-spell-shield` | ENGINE | OGS-020, UNL-099 | Highlander |
| `keepers-verdict-poppy-deck-bounce` | ENGINE | UNL-204, UNL-178 | Keeper's Verdict |
| `decisive-strike-vanguard-armory-mass-pump` | ENGINE | OGS-024, SFD-168 | Decisive Strike |
| `void-assault-voidreaver-both-attacker-directions` | ENGINE | UNL-202, UNL-099 | Void Assault |

### 2.1 CORRECTION — the matched-pair invariant is *"the legends carrying that tag"*, not *"one legend"*

Earlier today this session reported, and rc-manager3 independently verified over `cards.json`, that
every uncatalogued dual-domain Signature spell forces **exactly one legend NAME** whose two domains
are exactly the spell's two. **That holds for eight of the nine and fails on the ninth.**

`OGS-020 Highlander` is tagged **Master Yi**, and two legends carry that tag: `OGS-019 Wuju Bladesman
- Starter` and `UNL-191 / UNL-231 Wuju Master`. Both are Calm/Body and both are legal for it. This is
the same double-printing the project already records for Master Yi's unit cards (`OGS-004 Yi,
Meditative` / `OGS-009 Yi, Honed` in the starter against `UNL-059` / `UNL-113` in Unleashed).

**Restate the invariant as: a Signature card forces the legends carrying its champion tag whose
domains cover the card's — usually exactly one name, and two for Master Yi.** The domain half of the
claim is unaffected; only the count was wrong. `test/legend-lines.test.ts` was already checking the
correct thing (it intersects tag-carriers with domain-coverers), so no test or entry needed changing —
the error was in the prose of a report, and it is corrected here and inside the entry.

### 2.2 `OGS-020 Highlander` — the shield's two traps are on the body, not on the spell

*"Choose a friendly unit. The next time it would die this turn, heal it, exhaust it, and recall it
instead. (Send it to base. This isn't a move.)"*

- **808.1.d.1**: *"If the Permanent with the effect is not sent to the Trash, for example because its
  'killed' event was replaced with a recall, the triggered ability will be removed from the chain"* —
  Riot's worked example is precisely this replacement. **Saving a body with a Deathknell destroys the
  Deathknell.**
- **455**: *"A Recall is when a Permanent is relocated from anywhere to its Base without it being a
  Move."* So the body goes **home** — which switches off any *"While I'm at a battlefield"* text and
  hands the battlefield back at the next Cleanup if it was the last unit there (323.6).
- **456.3**: *"A Recall cannot be prevented by actions and Game Effects that restrict or block
  Movement"*, so neither side can keep it in place.

A **spell** version of this shield plays differently from a gear one: `OGN-077 Zhonya's Hourglass`
announces itself on the board and can be answered before the combat, while the Highlander is a card
in hand at `[Reaction]` speed (813.1.c.1), so the opponent commits without knowing. The trade is 4
Energy every time against a gear's Energy once — **the better bluff, the worse engine.**

### 2.3 `UNL-204 Keeper's Verdict` — the only card that puts an ENEMY unit into their own deck

Swept: `grep -inE "top or bottom of (their|your) Main Deck"` returns **two** rows, and the other is
`SFD-169 Altar of Memories`, which moves a card from **your own hand**. So this is removal with **no
death event at all** — no Trash (808.1.a's Deathknells never fire, no *"from your trash"* payoff can
reach it), no damage (437.4 and every fog are irrelevant), and no would-die event (808.1.d.1's
shields, including the Highlander above, cannot replace anything). It is the removal the pool's
protection suite is not built against.

The honest cost is that *"its **owner** places it"* — they choose top or bottom. Against a body they
want back they take the top, which is still a full card of tempo.

**And it can never share a list with `OGS-024 Decisive Strike`**, also Body/Order and also a Signature
card, tagged Garen: 103.2.d.2 forces `UNL-203 / UNL-237 Keeper of the Hammer` for one and `OGS-023
Might of Demacia - Starter` for the other. Two cards of the same domain pair, both walked in this
batch, mutually exclusive by the Signature rule alone.

### 2.4 `UNL-202 Void Assault` — the card's own parenthetical settles a Contested question

*"Move a friendly unit, then move an enemy unit. (If they both move to a battlefield you don't
control, you're the attacker.)"*

190.3.a.1 applies Contested when a unit moves to a battlefield its **controller** does not control,
450 says the same from the destination's side, and 464.2.c.1 makes the Attacker *"the player whose
unit(s) applied the Contested status"*. If **both** players' units move to a battlefield neither
controls, **both** applied it — and the card resolves the tie itself. **No reading is filed.**

The other direction is the one the card does not spell out: move the enemy unit to a battlefield
**you** control and the same paragraphs make **them** the Attacker on your own turn (464.2.c.2 makes
you the Defender) — the trick this catalogue records on `OGN-067 Blitzcrank, Impassive`. So one
2-Energy spell **chooses which side of the combat you are on**, which nothing else in the pool does.
Both halves are effect moves (449, with 420.3.a putting the exhaust on the Standard Move alone), so
exhausted bodies move and 144.4's destination limits never apply; 449.2's two-other-players limit
never fires in a Duel (485.1).

---

## 3. Facts for CLAUDE.md from #193 parts 1 and 2

1. **CORRECTION to a fact reported earlier today.** The matched-pair invariant is *"a Signature card
   forces the **legends carrying its champion tag** whose domains cover the card's"* — usually one
   name, but **two for Master Yi** (`OGS-019 Wuju Bladesman - Starter` and `UNL-191`/`UNL-231 Wuju
   Master`, both Calm/Body). The domain half stands; the count did not. `test/legend-lines.test.ts`
   was already checking the correct thing.
2. **The six-rune refusal is now complete across the pool** — Fury, Calm, Mind, Body, Chaos and Order
   Runes are all refused on 164.2 with 161.2.a, in #180 §18, #186 §25.1, #188 §46.1 and #193 §1.
3. **A discrepancy between two lanes' censuses decomposed exactly rather than averaging**: fc's 7/6
   and this session's 17/13 differ by three runes, three already-recorded refusals and one genuinely
   orphaned card. **Naming the members is what makes a census reconcilable at all.**
4. **`UNL-204 Keeper's Verdict` is the only card in the pool that sends an enemy unit to a deck** —
   removal with no death, no trash and no trigger, which is the one shape the protection suite
   (808.1.d.1 shields, 437.4 fogs, Deathknell payoffs) cannot answer.
5. **`UNL-202 Void Assault`'s parenthetical is a printed resolution of the both-players-applied-
   Contested case** (190.3.a.1 + 450 + 464.2.c.1): if both move to a battlefield you do not control,
   **you** are the attacker. Aimed the other way it hands the opponent the Attacker designation on
   your own turn — one card, either side of the combat.
6. **A spell shield and a gear shield are different cards to play around.** Both carry 808.1.d.1 (the
   save erases the Deathknell) and 455 (the recall goes to the base, switching off *"while I'm at a
   battlefield"* text), but the spell is unknowable until it is cast and costs its Energy every time.

---

## 4. Part 3 — the sixteen uncovered battlefields, re-examined one refusal at a time

Sixteen non-token battlefields are uncovered (plus `UNL-T01 Baron Pit` and `UNL-T03 Brush`, which
103.4.c and the token rules keep out of a decklist). **Five are banned in both formats and stay
closed**, and the ban marker lives in the card TEXT rather than in `data/legality.json`:
`OGN-276 Aspirant's Climb`, `OGN-284 Obelisk of Power`, `OGN-285 Reaver's Row`, `OGN-290 The Arena's
Greatest`, `OGN-292 The Dreaming Tree`.

Of the remaining eleven, **two refusals do not cover the pairing walked here and are re-opened**,
**seven still stand** (six with a stronger reason than the one first given), and **one was never
refused and is walked**.

| id | class | cards | what it was |
|---|---|---|---|
| `navori-fighting-pit-vanguard-helm-free-buffed-corpse` | ENGINE | OGN-283, OGN-228 | re-opened |
| `papertree-esteemed-hierophant-rune-count` | ENGINE | SFD-219, VEN-025 | re-opened |
| `emperors-dais-sprite-queen-conquer-cycle` | ENGINE | SFD-207, UNL-084 | never refused |

### 4.1 Re-opened — `OGN-283 Navori Fighting Pit`

**The refusal, and it is correct.** The Pit was refused as a partner for **ready-on-buff** payoffs:
315.1's Awaken precedes 315.2's Beginning Phase, so everything you control has already been readied
when the Hold fires, and `SFD-047 Simian Ancestor`'s *"When you buff me, ready me"* is a no-op on
that boundary. Untouched.

**What it does not cover:** a payoff that wants a **buffed body** rather than a ready one. 702.3 with
702.3.a makes a buffer a one-time placement per body, and this catalogue's own measurement is that
`OGN-228 Vanguard Helm` is *always short of buffed bodies, never of deaths*. The Pit supplies one
free placement every Beginning Phase you hold it, on a unit you choose, for no card.

### 4.2 Re-opened — `SFD-219 The Papertree`, and it is the Startipped Peak shape exactly

**The refusal, and both strikes are correct.** The rune arrives **exhausted** and the Hold is at
315.2.b, after 315.1's Awaken has run, so 315.1.b will not ready it until your next turn; and any
Power it could pay in the Beginning Phase is emptied by 167 at the start of your Main Phase. Both are
about the rune as **mana**.

**What they do not cover:** a payoff that reads a rune **COUNT**. 164.2.b's cost is the *recycle*,
not the rune's exhaust, so an exhausted rune is still on the board, still yours and still counted —
and the pool prints six cards that read the count: `VEN-025 Esteemed Hierophant`, `VEN-037
Tomb-Raider Barbara`, `VEN-146 Siphoning Strike` (seven or more, swept — three rows and no others),
`OGS-004 Yi, Meditative` (eight or more), and `VEN-032 Frostcoat Mother` with `VEN-050 Grumpy
Rockbear` (priced per rune). **This is the same re-scope this project already applied to `OGN-288
Startipped Peak`**, which two sessions refused because it makes bad mana while its real partners
wanted a count.

The one anti-synergy is named in the entry rather than hidden: *"each player"* hands the opponent
back exactly the rune that `sandstone-chimera-yi-meditative-rune-prison` took from them.

### 4.3 Never refused — `SFD-207 Emperor's Dais`

Not in #171's seven. It is a *"when you conquer here"* battlefield, so 466.5 (Control established
*"if they didn't already control this Battlefield"*) with 470 makes it fire **once a game** unless a
`[Temporary]` garrison hands the battlefield back — the family this catalogue holds through
`sprite-queen-targon-peak-conquer-cycle` and `treasure-hoard-renata-conquer-gold`. What makes the
Dais different is that **it leaves its own replacement body**: *"return a unit you control here to
its owner's hand to play a 2 :rb_might: Sand Soldier unit token here"*, so a bare bounce does not
hand the battlefield straight back under 323.6, and you get to choose between holding and
re-conquering.

### 4.4 Still standing, with the paragraph — and six of the seven now have a stronger reason

**`OGN-287 Sigil of the Storm`** — *"When you conquer here, you must recycle one of your runes."*
The original reason holds (470 caps it at one recycle a turn while 315.3.b channels two back), and
there is a stronger one: **it is strictly dominated by an ability every deck already has.** 164.2.b
lets you recycle a rune voluntarily for **1 Power of its domain**, achieving the same count reduction
and being paid for it; the Sigil's recycle is an instruction and not the rune's own ability, so it
pays nothing. A card that does worse than a free action is not a card.

**`SFD-209 Forgotten Monument`** — *"Players can't score here until their third turn."* The original
reason called the case for it a metagame claim. It is better than that and still not enough: a deck
that wins by **195** (*"a player also wins the game if an effect instructs them to do so"*) rather
than by 194.2's points is genuinely unaffected by its own half, so the symmetry IS one-sided for the
three ALT_WIN cards. The refusal survives on a **rules-level** cost instead: 485.4.a has you provide
three battlefields and 485.5 selects **one at random**, so running the Monument is a one-in-three
chance of *not* drawing the battlefield an ALT_WIN deck actually needs.

**`SFD-216 Rockfall Path`** — *"Units can't be played here."* Symmetric, and 054.1 makes it absolute.
Two facts strengthen it, and one of them is a **self-trap** the first pass did not name: **811.1.d.1**
(*"A hidden permanent must be played to that battlefield"*) with 054.1 means a `[Hidden]` unit hidden
at Rockfall Path can **never** be played — and 811.1.b only lets you hide at a battlefield **you**
control, so that trap is yours alone. And **350.2** with 185.2.a makes a token **played**, so a token
engine is closed there too. Everything can still walk in under 144.4.a, so it delays rather than
denies. Refusal stands.

**`SFD-217 Seat of Power`** — *"draw 1 for each other battlefield you or allies control."* 485.4 puts
two battlefields on a Duel table, so *"each other"* is at most **one**. Format arithmetic, unchanged.
Refusal stands.

**`UNL-206 Altar of Blood`** — three rainbow Power, 808.1.d.1 erases the saved body's Deathknell, and
455 sends it to the **base** so 323.6 strips your Control of the battlefield you were defending.
Symmetric as well (*"its controller"*). Refusal stands. Note that `OGS-020 Highlander`, walked in
part 1 above, is the same replacement as a card in hand for 4 Energy and without the third strike.

**`VEN-161 Piltovan Forge`** — *"the first friendly gear activated ability played each turn costs
:rb_energy_1: less."* The original measurement holds: every `[Equip]` cost in the pool that contains
Energy also contains a rune, so it can never zero an attach. Its best payoff can now be **named**,
which the first pass did not do: `VEN-054 Questionable Tome`'s *"Disempower this, :rb_energy_1:,
:rb_exhaust:: Draw 1"* becomes free of Energy — one card a turn for the price of the disempower and
the exhaust. That is real and it is still thinner than what `SFD-213 Ornn's Forge` and `SFD-208 Forge
of the Fluft` do with the same single battlefield slot. Refusal stands, now with the payoff named.

**`UNL-208 Black Flame Altar`** (not in #171's seven) — *"Units here with [Temporary] have [Shield]."*
814.1.b.3 makes a bare `[Shield]` worth **1**, and 814.1.c makes it *"+X :rb_might: while I am a
defender"*. 816.1.b kills a `[Temporary]` body at the start of **its controller's** Beginning Phase,
before scoring — so the extra Might exists for exactly one opponent's turn of defence and never on
your own attack. One Might, once, on bodies that were always going to die. **Refused**, and the
paragraph is 816.1.b with 814.1.b.3.

**`UNL-219 Vaults of Helia`** (not in #171's seven) — *"When you hold here, your non-token units cost
:rb_energy_1: more to play this turn."* A pure drawback attached to a Hold you wanted, and the
synergy layer already files it under *doubled drawback*. It taxes **its own controller** and nothing
else. **Refused.**

## 5. Facts for CLAUDE.md from #193 part 3

1. **Two of #171's battlefield refusals were scoped to a REASON that does not cover a different
   payoff, and both re-open.** `OGN-283 Navori Fighting Pit` was refused as a **ready-on-buff**
   partner (315.1 before 315.2) and says nothing about a payoff that wants a buffed **body** —
   `OGN-228 Vanguard Helm`. `SFD-219 The Papertree` was refused on two **mana** strikes and says
   nothing about a payoff that reads a rune **COUNT** — the same re-scope already applied to
   `OGN-288 Startipped Peak`. **Five of the other refusals stand, and six of them now carry a
   stronger reason than the one first given.**
2. **`OGN-287 Sigil of the Storm` is strictly dominated by 164.2.b**: a voluntary rune recycle
   reduces the same count AND pays 1 Power of its domain, while the Sigil's forced recycle is an
   instruction rather than the rune's own ability and pays nothing.
3. **A `[Hidden]` unit hidden at `SFD-216 Rockfall Path` can never be played** — 811.1.d.1 requires a
   hidden permanent to be played to that battlefield and 054.1 makes *"Units can't be played here"*
   absolute — and since 811.1.b only lets you hide at a battlefield **you** control, that trap is
   yours alone. **350.2** with 185.2.a also closes token engines there, because a token is played.
4. **`SFD-209 Forgotten Monument` IS one-sided for an ALT_WIN deck** (195 is a different clause from
   194.2's points), and the refusal survives on 485.4.a with 485.5 instead: three battlefields
   provided, one selected at random, so the slot competes with the battlefield such a deck needs.
5. **`SFD-207 Emperor's Dais` is the conquer-cycle battlefield that leaves its own replacement body**,
   which is why it can choose between holding and re-conquering where a bare bounce hands the
   battlefield back under 323.6.
