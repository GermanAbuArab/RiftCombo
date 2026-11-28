# Does a copied "first time each turn" trigger fire once, or once per instance?

**Lane rc-plaza, 2026-09-14. Refs #200.** The question I declined to guess at in section 7 of
`2026-09-14-plaza-synergy-predicates-vs-their-own-sources.md`, walked at rc-manager9's request.

**VERDICT: NO PARAGRAPH SETTLES IT. Filed as a NAMED OPEN QUESTION, not an R-number.** The inference
from the rulebook's structure is strong and points at the reading the catalogue already uses, but it is
an inference and not a citation. **One entry's headline depends on it: 8 of the 9 points of
`draven-svellsongur-bloodless-combat-burst` stand or fall on the answer, and the alternative legal
ordering does NOT rescue its class.** A notable is staged saying so.

**Separately and independently of the open question, a predicate change IS owed and is staged:**
`svellsongur-copy` cannot see `SFD-148 Draven, Audacious` — the card its own family's flagship BURST is
built on.

---

## 1. The question, precisely

`SFD-059 Svellsongur` reads *"As this is attached to a unit, copy that unit's text to this Equipment's
effect text for as long as this is attached to it."* **434.1.c**: *"The Top-Most card has all Effect
Text of all cards Attached to it appended to its Rules Text."* With R6 = A (Svellsongur copies CURRENT
text), v copies on one body yield **2^v** appended instances of that body's trigger.

If the copied trigger carries a per-turn cap — **383.3.e**: *"Some Triggered Abilities will trigger
'once each turn,' or 'N times each turn.'"* — does the cap bind

- **per ABILITY** (all 2^v instances share one counter → **one** execution), or
- **per INSTANCE** (2^v counters → **2^v** executions)?

**383.3.e.1** verbatim: *"Such a Triggered Ability will only be performed the specified number of times
each turn. If its trigger condition would be fulfilled and it has already been performed that many
times, it does not trigger."* The subject is *a Triggered Ability*, singular, and *"it has already been
performed"* is stated of that ability. **Nothing here says when two identical appended sentences are
one ability and when they are two.**

---

## 2. The rulebook legislates this thirteen times and never in general

> **PREDICATE**: `^[[:space:]]*NNN…\.[[:space:]]+Multiple [Ii]nstances` over the Core Rules. **THIRTEEN
> paragraphs, every one inside the keyword block (800s).** (My first grep found twelve; `826.5` writes
> *"Multiple **I**nstances"* with a capital I — a casing artifact in my own instrument, caught by
> cross-checking against a list this project already carries.)

**REDUNDANT — 805.4 Accelerate · 810.2 Ganking · 811.4 Hidden · 815.2 Tank · 816.2 Temporary ·
822.2 Ambush · 826.5 Backline**, each printed as *"Multiple instances of X are redundant."*

**SEPARATE — 817.2**: *"Multiple instances of Vision trigger separately."* · **821.1.c.7**: *"Multiple
instances of Weaponmaster trigger separately, and can choose different targets."*

**EACH USABLE — 818.4** Equip *"are equivalent to multiple Activated Abilities and can each be
activated"* · **827.3** Empower, the same sentence · **820.3** Repeat *"can be paid for separately."*

**AND THE ONE THAT CARRIES THE ARGUMENT — 819.2**: *"Multiple instances of Quick-Draw do not trigger
separately and have no effect beyond the first."*

**There is no general paragraph.** Searched: nothing in 375–383 defines when two instances of identical
text are one ability, and 477.2 (the Ability-Altering layer, which is where appended rules text lives)
describes *what* is appended and never *how many abilities* result.

---

## 3. The inference, and exactly how strong it is

**819.2 is the evidence.** If a duplicated TRIGGERED ability were capped to one execution by default,
819.2 would be dead letter — it exists to say that of Quick-Draw specifically. That is this project's
own R28-shaped argument: a reading that makes a printed clause pointless is the weaker reading.
817.2 and 821.1.c.7 point the same way from the other side, and both are triggered abilities.
**817.2.a** even tracks instance-level state — *"The player may choose to recycle or not recycle for
each instance of Vision separately"* — and **817.2.b** is comfortable with separate instances producing
identical results.

**So the inference favours PER INSTANCE, which is what the catalogue already assumes.**

**And it remains an inference.** Every one of the thirteen is scoped to a KEYWORD. Not one covers a
copy effect appending non-keyword Rules Text, which is exactly what Svellsongur does. The rulebook
writes BOTH answers explicitly, one keyword at a time — which is the behaviour of a rulebook that does
not consider the general case settled.

---

## 4. Is the question live? Yes, in exactly one entry, and it is load-bearing

> **PREDICATE**: an entry whose `uses` carries a copier (`SFD-059`, `SFD-193`/`SFD-245`) **and** a card
> whose trigger prints a per-turn cap. **14 capped-trigger cards in the pool; ONE entry.**

**`draven-svellsongur-bloodless-combat-burst`** — three Svellsongur on `SFD-148 Draven, Audacious`
(*"The first time I win a combat each turn, you score 1 point"*). Its step 8, verbatim:

> *"His eight instances each trigger for their own first time this turn: 8 points, all of them 194.1.c
> Gains."*

**That is the per-instance reading, asserted and uncited.** Under the per-ability reading the line is
**1 ability Gain + 1 Conquer = 2 points**, not 9.

**And the catalogue nowhere argues for it: 383.3.e.1, 819.2, 817.2 and 821.1.c.7 are cited by ZERO of
770 entries.**

---

## 5. The different legal ordering exists — and does not rescue the class

This project's standing rule is to try a different legal ordering before filing a reading. **There is
one here and it is unambiguous**, because separate CARDS are separate abilities with no reading needed:
103.2.b allows three `SFD-148`, and the catalogue already reasons this way, citing **466.3.c** —
*"Units at this battlefield inherit the same combat result as their controllers"* — so each of three
Draven fires its own trigger.

**It reaches FIVE, not eight.** Three Draven winning a combat is 3 ability Gains; the cap is *each
turn*, not each battlefield, so a second combat adds nothing from them; and 485.4's two battlefields
with 470's once-per-battlefield Score allow at most 2 Conquer points. **3 + 2 = 5 against a Victory
Score of 8 — not a BURST.**

**So the escape this project prefers is unavailable, and the entry's CLASS depends on the open
question.** That is the reason this is worth filing rather than shrugging at.

---

## 6. Disposition: a named open question, not an R-number

Filed as **OQ-SVELL-CAP**, deliberately not an R-number, on this project's own ground: every reading
filed is a question the user has to answer, and the ordering escape is normally tried first. Here the
escape exists, is legal, and changes the answer — so the question is real. What it blocks is narrow and
should be stated as such: **one entry's class, and the arithmetic of any future line that copies a
capped trigger.**

**If it is ever ruled, the reading to test is PER INSTANCE**, on 819.2's dead-letter argument. A Riot
statement that a copied ability shares its source's per-turn counter would reprice
`draven-svellsongur-bloodless-combat-burst` from BURST to ENGINE.

---

## 7. What ships anyway, because it does not depend on the answer

**`svellsongur-copy`'s predicate cannot see `SFD-148 Draven, Audacious`** — the card the flagship
Svellsongur BURST is built on. **Fourth self-proving instance in this lane.** The predicate is
`[Ww]hen I (hold|conquer|move|attack|win a combat)\b`; Draven's trigger is *"The first time I win a
combat each turn"*, an Nth-time clause rather than a when-clause — the same wording family as the three
move triggers in section 7 of the synergy walk.

**This is independent of the open question**, and that is why I now stage what I previously declined:
434.1.c appends the Effect Text whatever the cap does, so **Svellsongur COPIES these triggers either
way. Only the VALUE of the partnership is uncertain, not its existence.** A rule listing partners should
list them; the uncertainty belongs in the rule's prose.

> Verified with the project's own `partnersOf()`, live fingerprint reproduced first: **102 → 107,
> strictly additive, nothing lost.** All five additions read: `SFD-148 Draven, Audacious` (*"first time
> I win a combat each turn"*), `OGN-205 Yasuo, Windrider` (*"third time I move in a turn"*),
> `OGN-162 Miss Fortune, Captain`, `VEN-002 Blade Twirler` (both *"first time I move each turn"*),
> `SFD-113 Lucian, Merciless` (*"The first time I conquer each turn, ready me"*).

**`grandmaster-at-arms-equip-relay` owes NOTHING, which corrects my own earlier flag.** Widened
identically it returns **14 → 14, zero added** — its first alternation arm already covers what it
needs. I had named it in section 7 as owing the same three cards; measuring it says otherwise.
