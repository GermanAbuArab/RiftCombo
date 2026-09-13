# Entries whose prose states a requirement their own `uses` does not supply (rc-gap, 2026-09-13)

**The defect class**, found three times before this sweep and never swept for: an entry's `steps`,
`terminatesIn` or `notable` states a requirement — a count of bodies, a board state — that its own
`uses` does not name. `CLAUDE.md` states the rule exactly: *"`uses` is what the matcher and the
planner price: a body the condition requires is a use at quantity 1, role `enabler`, not a phrase in
a notable."* When it is real, **`matchDeck` reports the line COMPLETE for a board that cannot run it,
and `planDeck` can never name what is missing** — so the site tells a player something false and the
one panel built to help them cannot help.

Prior instances: `shen-kinkou-svellsongur-hold` (#165 cross-audit — a complete 9-point BURST for a
board that scores ZERO), then `flurry-of-feathers-grand-plaza-win` and `gutter-palace` (rc-synth2,
2026-09-13, verified through the matcher). rc-synth2 hand-checked the other 24 ALT_WINs and found no
more. **The other ~740 entries had never been checked.**

---

## 1. TWO PREDICATES, AND THE SECOND ONE IS THE PRODUCTIVE ONE

**Predicate A — a stated COUNT of bodies.** A number followed by `units`/`bodies` anywhere in the
prose, against `supply` = units in `uses` **plus unit TOKENS the `uses` cards play** (a token can
never be a `uses` row, so it must be counted from card text). Entries declaring `needs` are excluded
by rule: they inherit bodies from a folded engine, which is rc-synth2's worked case
`dragonstorm-confront-grand-plaza`.

**Predicate B — an INSTRUCTION to bring an unnamed body**: *"walk / move / bring / keep / have …
a second, another, a third, one more … unit"*. **I only wrote B because A flagged
`svellsongur-faefolk-mass-evacuation` FOR THE WRONG REASON** — A caught it on *"WHERE THE EIGHT
BODIES LAND"*, which is the enemy garrison, while its step 5 says *"Walk a **second friendly unit**
in"* and `uses` names one unit. **The entry was exposed; the predicate that found it was not the
predicate that described it.**

Instrument traps, both of which this project has paid for and both of which return a confident EMPTY
that reads as a clean pass: **`uses` rows key on `.card`, not `.base`**, and **`Card.type` is an
ARRAY**. Non-vacuity is printed by both probes (766 entries, 1,898 resolving `uses` rows, 967 of them
units, 228 token-plays parsed, 4,283 step strings).

---

## 2. PREDICATE A: 38 CANDIDATES, AND MY FIRST NUMBER WAS 129

This is my own finding from this morning arriving on my own desk: **a new checker's first number is
too big because it encoded the rule and not the exceptions the domain sanctions.** 129 → 53 → 38 as
each sanctioned class was named, and **both known cases survived every narrowing**, which is the only
reason to trust the narrowing at all — `flurry-of-feathers-grand-plaza-win` and `gutter-palace` each
reproduce with a gap of **exactly 3**, and `flurry`'s own step says *"Get three of your units onto
The Grand Plaza"*. **A narrowing that drops a known defect is a bug, and one did**: tightening the
pool-census filter had to be redone because *"exactly 4 **cards** in hand and exactly 4 units at
battlefields"* read as a census and silently dropped `gutter-palace` out.

**Four false-positive classes, named so the next sweep starts from them:**

1. **Quoting the payoff card's own printed condition.** Ten Plaza entries say *the Plaza's "if you
   have 7+ units here"* — that is card text being cited, not a requirement the entry imposes.
2. **Counting ENEMY or other-player bodies** — `foxfire-unfloored-reduction-sweep` (*"four bodies of
   M4 or less"*, the enemy garrison), `amateur-recital-free-evacuation`,
   `moonlight-affliction-tricksy-tentacles-evacuation`.
3. **Rate or ceiling statements**, not requirements — *"five bodies present is five buffs"*,
   *"Six bodies on the board is 6 XP"*, *"the ceiling is the number of DIFFERENT unbuffed Might-4
   bodies you can present"*.
4. **Pool censuses** — *"15 units, 2 gear"* for the [Hidden] package (`warden-saboteur-hidden-lock`,
   `vex-warden-accelerate-lock`), which are the two largest gaps in the list and both spurious.

**And one class that is an artifact of MY instrument rather than of the catalogue:** the token parser
reads card text literally, so it cannot see `SFD-059 Svellsongur` MULTIPLYING a token play. Every
Svellsongur Plaza entry therefore under-reports its supply — `svellsongur-trevor-leblanc-plaza` shows
supply 3 against a stated 10 while its own prose says *"Trevor's hold effect runs eight times: eight
ready 3-Might Sprites"*. **Those are not exposed and must not be reported as such.**

**Predicate A produced NO confirmed new exposure.** That is a result: rc-synth2's hand-check of the
ALT_WINs and this machine sweep of all 766 agree that the body-count shape is the two known entries.

---

## 3. PREDICATE B: 14 CANDIDATES, AND THREE ARE CONFIRMED EXPOSED

Each checked against its own `uses`:

- **`svellsongur-faefolk-mass-evacuation`** [ENGINE, `uses` 1 unit] — step 5: *"Walk a second
  friendly unit in (144.4.a)"*. The Faefolk is the only unit named, and it is standing at the
  battlefield it just evacuated FROM; the body that walks into the emptied battlefield to take the
  Conquer is not in `uses`. **Without it the entry produces no `conquer-engine` at all.**
- **`convergent-mutation-might-transfer`** [ENGINE, `uses` 1 unit] — *"**Have a second friendly
  unit** wherever the fight is going to be."* Stated as an instruction, in the steps, and absent
  from `uses`.
- **`irelia-fervent-forgotten-signpost-choose`** [ENGINE, `uses` 2 units] — *"**Keep a third unit**
  at a different location, so the Signpost has a payer"*. `uses` supplies two; the third is the one
  the Signpost moves and it is unnamed.

**Sanctioned, and named so nobody re-files them:**

- **`sprite-queen-dusk-rose-lab-shard-undoing`** says it outright — *"if you want the Lab's point you
  need a second body standing there. **That is a deckbuilding choice, not a requirement**"* — which
  is the entry being more careful than the check, and is exactly the disposition #203 recorded for a
  withdrawn flag.
- **`karma-double-trouble-repeat-two-buffs`** wants *"a second friendly unit without a buff"* and
  `uses` already carries `OGN-216 Soaring Scout` as an `enabler` on the BOARD — **the requirement is
  met by a card already in `uses` under a different description**, which is one of the exception
  classes named in the brief.

**ALL FOURTEEN ARE NOW READ. Two more are exposed and one is probable:**

- **`apothecary-pridestalker-buff`** [ENGINE, `uses` 1 unit + a legend] — **STEP 1 IS THE
  REQUIREMENT**: *"Have a friendly unit at a battlefield besides the Apothecary you are about to
  play."* That body is what the Apothecary's play trigger bounces and replays, so it is the engine's
  fuel, and it is not in `uses`. The strongest shape in the whole sweep: the requirement is the
  opening line of the line.
- **`aphelios-forge-of-the-fluft-attach-cycle`** [ENGINE, `uses` 1 unit] — step 3: *"attach the Sword
  to **a spare unit** — this takes it off Aphelios (434.1.f) and fires nothing"*. The spare body is
  the whole mechanism: the Sword has to leave Aphelios before re-attaching to him can fire his
  trigger again. **With only Aphelios on board the cycle cannot turn over at all.**
- **`lillia-fae-fawn-signpost-sprite-at-the-origin`** [ENGINE, `uses` 3 units + 3 tokens] —
  **PROBABLE, and stated as probable.** Step 1: *"Keep a third body at your base as the Signpost's
  anchor."* From the second cycle a Sprite the entry makes can be the anchor, and a token can never
  be a `uses` row — but step 2 is what creates the first Sprite, so **the FIRST activation needs an
  anchor the entry does not supply.** Whether that is a defect or an accepted opening cost is a
  reading, and I am not making it for somebody else's entry.

**Sanctioned, each with the reason, so nobody re-files them:**
`karma-double-trouble-repeat-two-buffs` and `aphelios-jax-quickdraw-attach` and
`faefolk-star-spring-drag` — the required body IS in `uses` under a different description
(`OGN-216 Soaring Scout`; Jax; the Faefolk itself, named in the same sentence).
`baron-pit-fae-porter-reach-from-anywhere` — nine units in `uses`.
`rumble-forerunner-mech-recursion` — *"for as long as you have a spare unit card on board to feed
it"* is a SUSTAIN condition on an engine whose declared `produces` is `token-body-engine`: it makes
its own fuel. `prize-of-progress-gold-tokens-reaction-might` and
`svellsongur-ribbon-dancer-fiora-mass-ready` — the match is a RULES description and a CARD TEXT
quotation respectively, neither a requirement.
`sprite-queen-dusk-rose-lab-shard-undoing` — the entry says outright that the second body *"is a
deckbuilding choice, not a requirement"*, which is the entry being more careful than the check.

**A THIRD SHAPE, found by reading and NOT swept for:** `apothecary-pridestalker-buff`'s step 1 says
*"Have a friendly unit … **besides** the Apothecary"* — a board precondition with no
"second/another/third" in it. Predicate B caught that entry only through a different phrase in a
notable. **A step-1 precondition phrased without a counting word is a fourth predicate somebody
should write**, and it is likely the highest-yield one left, because a requirement that opens a line
is exactly the kind an author states once in prose and never encodes.

---

## 4. WHAT THIS SWEEP IS AND IS NOT

**It is a machine sweep of two shapes.** A requirement stated in prose is not fully
machine-detectable: `gutter-palace`'s is *"exactly 4 cards in hand and exactly 4 units at
battlefields"*, which is a count, while `svellsongur-faefolk`'s is a verb. **A third shape — a
required RESOURCE or a named card in prose that `uses` omits — is unswept**, and a fourth — a
requirement stated only in `terminatesIn` — is covered by these two only where it uses their
vocabulary.

Probes, all printing a non-vacuity line: `.scratch-gap/req-sweep.mjs` (predicate A, with the four
exclusion classes), `.scratch-gap/exposed.mjs` (A plus the token-supply discriminator),
`.scratch-gap/body2.mjs` (predicate B), `.scratch-gap/supply.mjs` (supply for named entries).
**I did not edit `data/combos.json`; it is rc-manager7's, and the schema question — how to express
"any N bodies" without pinning a decklist — is his too.**
