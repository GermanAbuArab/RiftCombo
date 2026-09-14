# Reading entries back into the instruments: three answer sets, one clean, two one wording short

**Lane rc-plaza, 2026-09-14. Refs #200, #220.** The previous walk ended on a general claim —
*"nothing in this project reads entries back into its instruments"* — so I built the check that claim
implies and ran it against all three answer sets `scripts/adversarial-check.mjs` sweeps out of
`cards.json`. **I did not touch that script; it is rc-emit's.**

**The check independently rediscovered `UNL-072 Crescent Strike` and found nothing else in that set,
which validates both the finding and the probe. It then found a SECOND and larger gap in a different
set, and returned the third CLEAN.**

---

## 1. The check, and the narrowing that made it honest

**First version, prose-grounded**: a sentence in an entry that names a card and carries the sweep's
subject vocabulary. It returned **242 mentions across 108 distinct cards** for the mass-answer set
alone — junk, and junk of a shape this project has a name for. The vocabulary matched the SENTENCE
while the card named in it was the subject of a different clause: `OGN-294 Trifarian War Camp` is a
battlefield, the six Seals are mana, `OGN-229 Vengeance` is single-target removal. **Right file, wrong
sentence, 108 times.**

**Second version, card-text-grounded**: a card is a candidate iff an entry names it **and its own
printed text** does the job the sweep is for **and** the sweep does not return it. Same three sets,
one narrowing, and the numbers become readable. This is CLAUDE.md's own rule arriving again — *a check
grounded in a rule finds things and needs one narrowing; a check grounded in prose finds nothing and
needs four.*

---

## 2. Mass answers — 9 candidates, 8 correctly excluded, **1 genuine**

> **PREDICATE**: card named by an entry (prose or `uses`), own text matching
> `/(deal…\d+…|kill…)\b(all|each other|every|all other)\b…units?/i`, not in the swept set.
> **959 cards are named by an entry**; the swept set is 7.

| card | gate | verdict |
|---|---|---|
| `OGN-127` Cannon Barrage | *"in combat"* | correctly excluded |
| `OGN-190` Kog'Maw, Caustic | `[Deathknell]` *"at my battlefield"* | correctly excluded |
| `OGN-148` Anivia · `OGN-159` Warwick · `OGN-200` Twisted Fate · `VEN-019` Renekton | *"when I attack"* | correctly excluded |
| `SFD-190` Forgefire Cape | *"when I attack or defend"* | correctly excluded |
| `VEN-133` Glowstone | damages units **you** control | correctly excluded |
| **`UNL-072` Crescent Strike** | **none** | **GENUINE MISS** |

**Eight of the nine are the exact exclusions the script's own comment block names by hand.** Its
exclusions are right; its *inclusion* predicate is one wording short. (Honest note on my own
instrument: the gate column for `SFD-190` and `VEN-133` matched on a crude substring — *"you
control"*, out of `[Equip]` reminder text in one case — so the reason printed was not the real reason.
Both verdicts are right and both were read; the label was not earned.)

---

## 3. Gear answers — **the widening stopped one family short, and the missing family holds the cheapest card in the pool**

The gear set is swept in two passes, and the script records why the second exists: a KILL predicate
cannot see a DETACH, *"which is how 36 shipped notables came to carry a claim narrower than their own
question."* **The same sentence is true one more time, for BOUNCE.**

> **PREDICATE**: card named by an entry, own text matching
> `/(kill|destroy|banish|return|detach|move)…gear/i`, not in the swept 17. **9 candidates.** Five are
> correctly excluded on reading (own-side or own-zone: *friendly gear*, *from your trash*, *your Main
> Deck*); one, `SFD-130 Treasure Hunter`, is a false positive that PLAYS a Gold token. **Three are
> enemy-facing and genuine.**

| card | domains | cost | what it does |
|---|---|---|---|
| **`SFD-135` Factory Recall** | chaos | **E1, no Power**, [Action] | *"Return a gear to its owner's hand."* |
| **`SFD-109` Akshan, Mischievous** | body | E4 + 2 Body Power | *"move an enemy gear to your base. **You control it until I leave the board.**"* |
| **`SFD-147` Downwell** | chaos | E8 + 2 Power | *"Return all units and gear to their owners' hands."* |

**A SHIPPED CLAIM IS WRONG ON NINE ENTRIES.** The emitter writes, for a line standing on one attached
Equipment: *"`SFD-005 Detonate` (Fury, E1 + 1 Fury Power…) **is the cheapest removal in the pool for
it**"* — and it is carried by **9 entries** (`pursuer-herald-recruits`, `renata-bubble-bot-ready`,
`karthus-machine-evangel-renata-plaza`, `twilight-reveler-eye-facebreaker-recruits`,
`corina-svellsongur-plaza`, `reveler-svellsongur-jhin-infinite-power`,
`desert-call-vi-sand-soldier-plaza`, `renekton-public-execution-gate`,
`ferrous-forerunner-karthus-mech-plaza`).

**Detonate is the cheapest KILL. `SFD-135 Factory Recall` is E1 with NO Power — strictly cheaper — and
it answers the Equipment for the window that matters**, because 719.5 detaches an attached card when
its Top-Most Card changes zones and 434.1.c stops appending its Effect Text the moment it is no longer
attached. The word in the shipped sentence is *removal*, and a reader takes that as *the cheapest way
to answer this*. Both readings should be stated; one of them is false.

**And Akshan is worse for the victim than any kill**, which no entry says: 718.5.e — *"Attached cards
may have different Controllers from their Top-Most card"* — and 718.5.g — *"An Attached card still
appends the abilities in its Effect Text to the Rules Text of the"* Top-Most Card — so a stolen
Equipment keeps working, **for them**.

### Blast radius

> **PREDICATE**: entry whose `uses[]` carries a card tagged `Equipment`.

| | count |
|---|---|
| entries standing on an Equipment | **137** |
| …naming a card from the shipped gear-answer set | 46 |
| …naming a card from the bounce family | **7** |
| …naming neither | **90** |

---

## 4. Garrison protection — **CLEAN, and therefore the one worth pinning**

> **PREDICATE**: card named by an entry, own text granting a static non-*this turn* +Might to a plural
> object, not in the swept 12. **4 candidates, all correctly excluded on reading**: `OGN-151 Lee Sin,
> Centered` (buff-gated **and** location-scoped), `SFD-159 Trusty Ramhound` and `VEN-135 Kennen`
> (both **self** only — *"I have +1"*), `UNL-195 Green Father` (the Brush is a battlefield **token**,
> and tag-scoped).

**Zero misses.** CLAUDE.md: *a check that comes back clean is the one worth PINNING AS A TEST, because
pinning it costs nothing at a clean state and it can only ever be paid for once.* Recommended to
rc-emit as a test rather than a report.

---

## 5. The general form, now measured rather than asserted

The previous walk claimed *a hand-authored entry can hold a fact an automated sweep over the same
catalogue is structurally unable to find*. Run over three sets: **two were one wording short and one
was clean.** The two failures are the same shape and it is not a regex quality problem —

> **each sweep's predicate was written from the wording of the card that motivated it.** Mass answers
> from `OGN-133`'s *"to all units at battlefields"*. Gear answers from *"kill a gear"*, widened once to
> *"detach"* when a real case forced it, and stopping there.

**The fix that generalises is not a better regex; it is running this check.** A sweep over `cards.json`
and the prose of 767 entries are two independent descriptions of the same pool, and **diffing them
finds the wording a predicate's author had not met yet.** It is cheap, it is bounded (959 named cards),
and it needed exactly one narrowing to be honest.

## 6. Handover

Everything here is a report or a recommendation for **rc-emit**, who owns
`scripts/adversarial-check.mjs`. Nothing was staged into `data/combos.json` from this walk: the
9-entry `cheapest removal` correction should be emitted by the fixed predicate, not hand-written nine
times, for the same reason the Crescent Strike correction should not be hand-written a hundred times.
Probes are in `.scratch-plaza/entries-vs-sweeps{,2,3}.mjs` and `.scratch-plaza/gear-blast.mjs`.

---

## 7. Addendum, same day: the sweep is EXACTLY clean over its population, and the whole gap is one class

Splitting the Equipment-bearing population by class settles what the 90 means.

> **PREDICATE**: entry whose `uses[]` carries a card tagged `Equipment`; *answered* = names a card from
> the shipped 17 **or** from the bounce family. Probe: `SFD-059 Svellsongur` reads as Equipment,
> `OGN-293 The Grand Plaza` does not.

| | count |
|---|---|
| entries standing on an Equipment | 137 |
| …that are **finishers** (INFINITE / BURST / CHAIN / ALT_WIN) | **33** |
| …of those 33, naming an answer | **33 — one hundred per cent** |
| …that are **ENGINE** and name no answer | **90** |
| finishers naming no answer | **0** |

**All 90 are ENGINEs. Not most — all of them.** So `--strict`'s *"zero unanswered holes"* is not a
predicate that happens to be lenient; over the population it covers it is **exactly right**, and the
entire debt sits in the class it does not cover. That is CLAUDE.md's own sentence — *a clean sweep is
clean over its POPULATION* — measured on a fourth independent axis.

**Reconciled against the recorded figure**: CLAUDE.md carries *"96 ENGINEs use Equipment with no gear
answer named"*. Mine is **90**, or **91** on the shipped instrument's own view (which cannot count the
bounce family as an answer). The delta is catalogue drift plus the one bounce-only entry. **The count
is perishable and the structure is not**: 33 of 33 answered, 90 of 90 outside.

### The third instance of one pattern, and the sentence that unifies it

Exactly **one** entry of 767 names a bounce and no kill: **`spinning-axe-factory-recall-inactive-
temporary`** — and, like `crescent-strike-frostcoat-cub-sweep-threshold`, **its own id names the card
the sweep cannot see.** Both missing families are represented in this catalogue exactly once, and both
times by an entry whose title is the card.

CLAUDE.md already records the same shape for a third card: `SFD-011 Angle Shot` is *"already
catalogued, in `jax-angle-shot-attach-draw`, used on your OWN gear for draw; the enemy-facing use is in
no entry."* `SFD-135 Factory Recall` is that sentence word for word — its one entry plays it to
**rescue your own Spinning Axe** (step 3: *"If the carrier is about to die, play Factory Recall … and
return the Axe to your hand"*), never to answer an opponent's.

> **THE UNIFYING SENTENCE: THIS CATALOGUE DESCRIBES WHAT A CARD DOES *FOR* YOU FAR MORE OFTEN THAN WHAT
> IT DOES *TO* YOU, AND THE ANSWER-SWEEPS INHERIT EXACTLY THAT BLIND SPOT, BECAUSE EACH WAS SEEDED FROM
> THE WORDING OF A CARD SOMEBODY HAD ALREADY MET AS A THREAT.** Angle Shot, Factory Recall and Crescent
> Strike are three cards this project has read carefully, written up correctly, and never turned
> around. A diff between the swept sets and the entries is the cheapest way to turn them around,
> because the entries have already done the reading.
