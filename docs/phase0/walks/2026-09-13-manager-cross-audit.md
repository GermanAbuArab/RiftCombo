# Cross-audit of rc-manager7's own applications (rc-gap, 2026-09-13)

Five lanes reported all day and the manager applied their findings — fifteen notables across fourteen
entries in `data/combos.json` and five bullets in `CLAUDE.md` — and **none of those applications had
been audited by anybody.** This is that audit. It is the gap this project keeps finding one level up:
the finisher classes got #165, #166, #175, #189, #192 and #203, and **the work that wrote those
audits got none.**

**Result: ONE real defect, ONE unreproducible number, and everything else clean — including the item
the manager flagged as the one he was least sure of.** The clean findings are stated as plainly as
the defects, because a pass that did not look is worse than either.

---

## 1. THE REVERSED ASSIGNMENT — **CORRECT**, AND CHECKED FIRST AS INSTRUCTED

rc-kw's appendix gave the Sand Soldier text to `plaza-armory-miss-fortune` and the Recruit text to
`arise-sand-soldiers-plaza`; the manager reversed both and flagged it as the thing he was least sure
of, because getting it backwards would put a notable into an entry that contradicts it.

**Verified from card text, not from the entries' prose:**
`SFD-168 Vanguard Armory` — *"[exhaust]: Play three 1 [M] Recruit unit tokens."*
`SFD-198 Arise!` — *"Play a 2 [M] Sand Soldier unit token for each Equipment you control."*

So `plaza-armory-miss-fortune` has **Recruits** and correctly received the Soul Shepherd / 1-Might
notable; `arise-sand-soldiers-plaza` has **Sand Soldiers** and correctly received the 187.3 / 2-Might
notable. **The reversal was right and rc-kw's appendix was wrong.**

**And the specific failure he feared did not happen — each notable AGREES with prose the entry
already carried.** `plaza-armory`'s existing notable says *"arise-sand-soldiers-plaza, whose bodies
are 2 Might Sand Soldiers, is immune to that; this is not"*, and `arise`'s existing notable says
*"nine 2-Might Sand Soldiers (187.3)"*. The new notables land on the side their entries were already
on.

**Arithmetic inside them re-taken:** *"seven 1-Might Recruits cost 7 damage to clear and seven
2-Might Recruits cost 14"* — 7×1 and 7×2. *"Nine Equipment, nine 2-Might Sand Soldiers … plus the
body already holding the Plaza: 10 units against a bar of 7"* — Arise! plays one per Equipment, so 9,
plus 1. Both correct.

## 2. THE ONE REAL DEFECT: **CARD TEXT SHOUTED INSIDE A QUOTATION, IN FOUR ENTRIES**

`OGN-133 Flurry of Blades` prints *"Deal 1 to all units **at battlefields**."* Four entries quote it
as ***"Deal 1 to all units AT BATTLEFIELDS"*** — `ivern-sentinel-hold`, `ivern-arena-sentinel-hold`,
`swain-shurelya-double-conquer`, `ivern-brambleback-conquer-burst`. **Sixty-four entries have it
right**, so the project's own convention is unambiguous and these four deviate from it.

This is the #202 emphasis-added class, in `combos.json` rather than in `CLAUDE.md`, **and the
case-only probe reads 0 because it only scans `CLAUDE.md`** — the population was never checked.

**Attribution, because it matters and the obvious reading is wrong:** the shouted form did NOT
originate with the manager. `git log -S` puts its first appearance in **`098de15`**, the
adversarial-emitter repair. What `c688f6b` did today was rewrite two of those four lines without
repairing the quotation. **And the manager wrote the SAME card text correctly, in lowercase, in
`da9400b` the same afternoon** — which is the evidence that the shouted form is inherited rather than
his habit. **The defect is live either way and four entries need it lowercased.**

## 3. THE ONE UNREPRODUCIBLE NUMBER: **"64 of those trip the check, and 63 of the 64 are ENGINE"**

The bullet states its own predicate — *no unit in `uses` AND a body word in `steps` AND no `needs`* —
which is what makes it checkable, and the base population reproduces **exactly**: **122 entries carry
no unit in `uses`**, matching his figure.

**The 64 does not reproduce under nine readings of that predicate.** Measured over the same 122:
95 (91 ENGINE) · 83 (83) · 67 (66) · 42 (39) · 38 (37) · 37 (37) · 33 (33) · 91 (91) · 100 (95),
varying the body-word regex, the field scanned, whether token-makers are excluded, whether
battlefields are excluded, and whether `needs` is honoured. **None is 64.** The closest in both value
and ratio is 67/66 — *body word in steps, no `needs`, no battlefield in `uses`* — which suggests a
slightly different body regex, but I could not land on it.

**THE CONCLUSION IS ROBUST AND THE COUNT IS NOT, AND THOSE ARE DIFFERENT THINGS.** Every one of the
nine readings puts the ENGINE share between **91% and 100%**, so *"63 of the 64 are ENGINE"* is right
about the world and unverifiable as written. This is #203's *"an unreproducible number is a TYPED
one"* — and the fix is one line: state which body regex and which fields, as the bullet already does
for the rest of the predicate.

## 4. CLEAN, AND SAID PLAINLY BECAUSE A PASS THAT DID NOT LOOK IS WORSE THAN A DEFECT

**The token table is EXACT.** The bullet lists 187.1 Recruit 1, 187.2 Sprite 3, 187.3 Sand Soldier 2,
187.4 Mech 3, 187.6 Reflection 0, 187.7 Bird 1, 187.10 Tentacle 1, 187.11 Shadow Clone 0. **Every
Might value matches the rule text, the set of eight is right** (187.5 Gold is a GEAR token and 187.8
Brush / 187.9 Baron Pit are BATTLEFIELD tokens, correctly excluded), ***"five of the eight are Might
0 or 1"*** is five — Recruit, Reflection, Bird, Tentacle, Shadow Clone — and ***"six of the eight die
to two damage"*** is six, adding the Sand Soldier.

**The Time Warp split is EXACT**: *"7 of 17 CHAINs run it; ZERO of 23 BURSTs do"* measures 7 of 17 and
0 of 23.

**The domain claim is confirmed independently**: zero of 766 entries span more than two domains in
their non-legend `uses`.

**No notable contradicts its own entry.** The one place a contradiction looked likely is
`gutter-palace-reaction-dials`, which carries an older notable saying the Bird's *"[Deflect] … taxes
an opponent a rainbow to choose it"* beside a new one saying one Energy answers the board. **The new
notable resolves it explicitly** — *"[Deflect] does not help: 355.10.d makes a deal-to-ALL
programmatic rather than targeted, so 809.1.c charges nothing however many Birds are standing."*
That is the harder half done rather than skipped.

**Four of the six quotation misses are the sanctioned symbol rendering**, not defects: *"Your token
units have +1 Might"* for the corpus's `+1 :rb_might:`, and *"no more than 4 Energy and no more than
one rainbow"* for `:rb_energy_4:` and `:rb_rune_rainbow:`.

**The `lillia-fae-fawn-signpost-sprite-at-the-origin` reading is settled correctly, and better than I
left it.** I called the anchor *probable* and declined to decide it. The manager decided it with a
mechanism: `UNL-045 Forgotten Signpost` is one activation a turn and its cost *"Exhaust a unit you
control, [exhaust]"* — quoted **verbatim** — spends the anchor, while the Sprite carries [Temporary]
(187.2) and 816.1.b kills it at the next Beginning Phase before the next activation. **So a Sprite
can never be the anchor and the third body is a permanent cost, not an opening one.** Sound.

**And the `CLAUDE.md` amendment `fc0a282` is a genuine SUPERSESSION rather than a difference.** It
replaced *"monotone by turn as well (T3 mean 0.67, T4 1.50, T5 2.38, T8+ 3.64)"* with a class cut,
and it **explains the anomaly the old framing produced** — *"a T6-against-T7 pair first reported as
noise and which turned out to be class mixing"*. Checked for stale downstream references: *"T3 mean
0.67"*, *"T4 1.50"*, *"T5 2.38"*, *"T8+ 3.64"* and *"monotone by turn"* each appear **zero** times in
the file. Nothing still quotes the old framing. Its own n's are internally consistent too —
24 + 12 + 9 + 22 + 6 = 73, which is the *"73 of the 80 finisher rows"* the same bullet opens with.
