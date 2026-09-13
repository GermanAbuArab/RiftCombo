# The notables as they read on the page — the fifteen applied on 2026-09-13

Lane `rc-kw2`, 2026-09-13, successor to `rc-kw`. This is §3 of
`docs/phase0/walks/2026-09-13-live-site-rules-audit.md`, which my predecessor left unstarted.

**Audited sha: `df5de99` — the deployed commit** (`git show df5de99:data/combos.json`), and every
finding below was then re-checked against `HEAD` (`510c857`) and is **present identically in both**:
`data/combos.json` differs between the two by 1,021 changed lines, so that check was not optional.
No live fetch was made.

**Result: five defects across twelve of the fifteen notables, plus seven smaller notes.** Three of
the five are the same failure — **a uniform notable copied onto entries it was never re-read
against** — and the largest one re-breaks a correction another walk had already diagnosed, quoted the
rule against, and written a notable for, three positions above it on the same page.

---

## 0. What the instruments already prove, and why none of them sees any of this

`npx vitest run test/source-quotes.test.ts test/rule-refs.test.ts` → **EXIT=0, zero occurrences of
`failed`, `Tests 16 passed (16)`**. Every quoted passage is verbatim and every cited paragraph
exists. **All five defects below are invisible to both**, because each is one of:

- a paragraph cited for a sentence it does not support (the paragraph exists; the quote is exact),
- a claim contradicted by a neighbouring notable in the same entry,
- a uniqueness claim refuted by entries in this same catalogue.

Only reading decides any of them. That is the whole argument for this pass.

---

## 1. DEFECT — **383.2.a.1 is inverted on all seven Ivern notables** (HIGH)

The sentence, byte-identical on seven entries:

> "And the loss is total rather than partial: **383.2.a.1 makes the tag count part of the Trigger
> Condition**, so losing ONE tag loses the WHOLE Score and not a point of it."

**The rule, pasted:**

```
383.2.a.    The Condition is the clause with When, At, or the Nth Time.
383.2.a.1.  Any additional conditional statement immediately after the Condition must be
            true in order for the Condition to be fulfilled. Such a conditional statement is part of
            the Trigger Condition and not the Effect.
              Example: Loose Cannon reads "At the start of your Beginning Phase, draw
              1 if you have one or fewer cards in your hand." The "if you have one or fewer
              cards in your hand" conditional statement is not immediately after the
              trigger condition, so it is part of the effect and not the condition.
```

**The card, pasted from `data/corpus_flat.txt`:**

```
UNL-177 | Ivern, Friend to All | Unit | Order | E6 M6 | As you play me, choose Bird, Cat, Dog, or
Poro. I gain that tag. When I conquer or hold, score 1 point if your units have all of the following
tags among them — Bird, Cat, Dog, and Poro. [Tags: Ivern, Ionia]
```

The Condition is *"When I conquer or hold"*. The conditional sits **after the effect verb `score 1
point`**, which is Riot's own Loose Cannon shape — so 383.2.a.1 puts it in the **EFFECT**, checked on
resolution. The notable asserts the exact opposite of the paragraph it cites.

**The test is positional, and the manager applied it correctly to three other cards the same day.**
Word order decides it and nothing else:

| card | text | shape | in the Condition? |
|---|---|---|---|
| `OGN-293` The Grand Plaza | *"When you hold here, **if** you have 7+ units here, you win the game."* | Sona | **yes** ✓ |
| `UNL-088` Gutter Palace | *"At the start of your Beginning Phase, **if** you have exactly 4 …, you win the game."* | Sona | **yes** ✓ |
| `VEN-138` Shen | *"When I hold, **if** there is exactly one other unit you control here, you score 1 point."* | Sona | **yes** ✓ |
| `UNL-177` Ivern | *"When I conquer or hold, **score 1 point if** your units have …"* | **Loose Cannon** | **no** ✗ |

**Why it matters rather than being a label.** A Trigger Condition is checked when the trigger is
placed, and Riot's Sona example ends *"If she is removed in reaction to the triggered ability, it
will still resolve."* An Effect clause is checked on resolution, so **killing the tag body in
response to the Ivern triggers blanks every one of them.** The notable's own subject is *which cards
reach the base-parked tag body*, so as written it tells a reader the body is reachable and, in the
same breath, that the timing protects the score. It does not.

**It re-breaks a correction that was already in the entry.** `ivern-ride-the-wind-double-conquer`
carries, as `notable[2]`:

> "THE FOURTH-TAG CLAUSE IS PART OF THE EFFECT, NOT THE TRIGGER CONDITION, AND FIVE EXISTING IVERN
> ENTRIES SAY THE OPPOSITE. … Ivern reads 'When I conquer or hold, SCORE 1 POINT if your units have
> all of the following tags among them' — the effect verb comes first and the conditional after it,
> so he is the LOOSE CANNON shape and the tags are checked ON RESOLUTION. The practical consequence,
> and it runs against this line's own interest: removing the fourth-tag body in response to the Ivern
> triggers BLANKS every one of them at that scoring event."

The new notable is `notable[9]` of the same entry. **On the page, the entry states the correction and
then contradicts it seven paragraphs later.**

**Coverage, measured.** Predicate: entries whose `uses` include `UNL-177`, then every text field
matching the claim. **8 Ivern entries in the catalogue; 7 carry the wrong sentence.**

| entry | carries the wrong claim | carries a neighbour stating the right one |
|---|---|---|
| `ivern-sentinel-hold` | `notable[5]` | `uses[2].note` |
| `ivern-arena-sentinel-hold` | `notable[9]` | `uses[3].note`, `uses[4].note` |
| `ivern-bard-four-tag-double-conquer` | `notable[10]` | `notable[0]`, `uses[1].note` |
| `ivern-arena-trinity-body-order-hold` | `notable[11]` | **none** |
| `ivern-arena-draven-chaos-order-chain` | `notable[9]` | **none** |
| `ivern-ride-the-wind-double-conquer` | `notable[9]` | `notable[2]` |
| `ivern-brambleback-conquer-burst` | `notable[6]` | `notable[3]` |
| `ivern-svellsongur-four-tags-hold` | — (not applied) | Loose Cannon, clean |

**The two with no neighbour are the worst**, because nothing on the page corrects them. The one
entry the uniform notable skipped is the only Ivern entry that is now internally consistent.

**Secondary, same root, lower severity.** `ivern-arena-trinity-body-order-hold` `notable[1]` argues
from 383.4.g.1 that *"Ivern's non-conquer portion is the four tags, and it is fulfilled, so it is not
filtered out."* 383.4.g.1 speaks of *"the non-conquer parts of the **condition**"*; if the tags are
in the Effect they are not in the condition at all, so there is nothing for the Arena to filter.
**The verdict survives — arguably more strongly — and the category name is wrong.**

**The repair is one clause**, and it should keep the true half: the loss *is* total, because the card
says *"all of the following tags"*, not because of 383.2.a.1.

---

## 2. DEFECT — the Sand Soldier uniqueness claim is refuted by five entries in this catalogue (MEDIUM)

`arise-sand-soldiers-plaza`:

> "`UNL-132 Angler Beast` — *"return all units with 2 :rb_might: or less to their owners' hands"* — a
> BOUNCE that catches the whole Might-2 band a +1 creates elsewhere, and **which a Might-3 Sand
> Soldier is the only Plaza garrison in the catalogue to clear**."

**Predicate: entries whose `uses` include `OGN-293 The Grand Plaza` (23 of 766), then each entry's
own `steps` read for the Might of the bodies it puts there.** Tokens can never be `uses` rows (185),
so the deciding datum is in the steps and no `uses`-level probe can see it — the same blindness
CLAUDE.md records for small bodies, here hiding the big ones.

**Five Plaza entries already field a garrison entirely at Might 3+, with no +1 at all**, and each
states the Might in its own words:

| entry | garrison | where it says so |
|---|---|---|
| `spiderling-swarm-grand-plaza` | Spiderlings at **Might 7 each** | step 3: *"Each Spiderling is now 1 + 6 = 7 Might, 49 Might in total."* |
| `sprite-mother-burst-leblanc-plaza` | Sprite Mother M3 + 3-Might Sprites (187.2) + LeBlanc M4 | step 5: *"21 damage minimum, not 7."* |
| `svellsongur-trevor-leblanc-plaza` | Trevor M3 (Shield 8) + eight Sprites | step 4: *"the eight Sprites are 3 Might each"* |
| `leblanc-bashful-bloom-trevor-plaza` | LeBlanc M4 + Trevor M3 + Sprites M3 | steps 0–3 |
| `dragonstorm-confront-grand-plaza` | played bodies | measured *"Might 3 to 10"* in the predecessor's own walk |

`VEN-097 Spiderling` is the sharpest refutation: *"I have +1 :rb_might: for each other unit you
control here with my name"*, so seven of them are Might 7 each — and CLAUDE.md already singles that
entry out as the one where an emitted notable got its Might wrong once before.

**The true and useful half survives**: the Sand Soldier is the only garrison that clears Angler Beast
**by taking the +1 this notable is recommending**. That is a claim about the +1; the shipped sentence
is a claim about the catalogue, and the catalogue refutes it five times.

---

## 3. DEFECT — the Gutter Palace overshoot claim is refuted by `VEN-138 Shen` (MEDIUM, ×2 entries)

Byte-identical on `gutter-palace` and `gutter-palace-reaction-dials`:

> "AND THIS WIN CONDITION IS THE ONE THE CATALOGUE HAS THAT CAN BE OVERSHOT: … REMOVING ONE BODY IS
> ENOUGH, and so is HANDING YOU A CARD. **Every other finisher here asks for MORE of something.**"

**Predicate: `grep -icE "exactly" data/corpus_flat.txt` → 8 lines, all eight read.** Two of the eight
gate a point or a win: `UNL-088` Gutter Palace, and

```
VEN-138 | Shen, Leader of the Kinkou Order | ... When I hold, if there is exactly one other unit you
control here, you score 1 point.
```

**Predicate: entries whose `uses` include `VEN-138` → 5, of which 2 are finisher classes** —
`shen-kinkou-svellsongur-hold` (BURST) and `shen-sentinel-time-warp-chain` (CHAIN). Shen's point is
broken by one body **too many** exactly as it is by one **too few**; CLAUDE.md records this project
refusing a whole Body/Order line on precisely that ground, and `shen-sentinel-time-warp-chain` keeps
K = 1 *on purpose* for it.

The distinction the notable is reaching for is real and is narrower than what it wrote: the Palace is
the only one **whose second axis the opponent can push by helping you** (handing you a card). Shen's
axis is a board count. The sentence as written — "every other finisher" — is false.

---

## 4. DEFECT — `gutter-palace-reaction-dials` ends by telling the reader it is not itself (MEDIUM)

The same byte-identical notable closes:

> "The answer therefore has to be BANKED and held through their whole turn, which is what
> `gutter-palace-reaction-dials` buys and **what this line does not**."

On `gutter-palace` that is correct and useful. On `gutter-palace-reaction-dials` it is the entry
denying its own thesis in its last sentence, and it contradicts **four neighbours, the
`terminatesIn`, and three steps**:

- `notable[0]`: *"The catalogued one-card entry adjusts with the Palace's own discard/exhaust ability
  and then waits, but that ability has no [Reaction] …"*
- `notable[2]`: *"THE REMOVAL OPENS THE WINDOW IT NEEDS. A [Reaction] card 'can be played during
  Closed States on any player's turn' (813.1.c.1) …"*
- `notable[3]`: *"You must bank runes through your own turn to pay for it."*
- `notable[6]`: *"gutter-palace is the one-card version and is left in place as the floor … **This is
  the version for a game where they do act.**"*
- `terminatesIn`: *"… with both halves of the 4/4 check correctable at Reaction speed on the
  opponent's turn"*
- steps 2–4: bank ready runes, take priority in the Closed State, correct forward.

A reader who reaches the end of the notable list is told the line cannot do the thing the entry
exists to do. **This is the cheapest kind of defect to avoid and the most legible on the page:** the
uniform notable was written for the sibling entry and its closing clause was never re-read.

---

## 5. DEFECT — the "HANDING YOU A CARD" axis names no card, and the cheapest real answer kills the Palace (MEDIUM, ×3 entries)

The notable states the axis and names nothing on it. **Predicate: corpus lines where a player other
than the caster draws — `(opponent|opponents|each player|its controller|their controller|that
player)[^|]{0,40}draws?` → 8 lines, all eight read.** Four are genuine threats and none of the three
Gutter Palace entries names any of them (checked by grep over the whole serialized entry):

| card | domain | cost | text | what it breaks |
|---|---|---|---|---|
| `SFD-005` Detonate | Fury | **E1 P1** | *"Kill a gear. Its controller draws 2."* | **kills the Palace itself**, and refills your hand |
| `OGN-033` Shakedown | Fury | E2 P1, **[Reaction]** | *"Choose an enemy unit. Deal 6 to it unless its controller has you draw 2."* | **either axis, opponent's choice, inside the window** |
| `OGN-213` Hidden Blade | Order | E2 P1, [Hidden] [Action] | *"Kill a unit at a battlefield. Its controller draws 2."* | **both axes in one card** |
| `VEN-111` Minah Swiftfoot | Chaos | E6 P1 M6 | *"• Each player draws 1."* | hand → 5 |

`OGN-071 Party Favors` and `OGN-201 Invert Timelines` are read and excluded — the first leaves the
choice with you, the second sets your hand **to** 4.

**`SFD-005 Detonate` is the finding.** The notable's headline is *"ONE ENERGY ANSWERS THE DIAL
ITSELF"*; one Energy and one Fury Power answers the **win condition**, because `UNL-088 Gutter
Palace` is a **gear**, and draws you two cards on the way out. None of the three Gutter Palace
entries names any gear removal at all. This is the debt CLAUDE.md already measures from the other
end — *"96 ENGINEs use Equipment with no gear answer named"*, *"the catalogue owned the gun for
months and had never pointed it at its own finishers"* — arriving at a **win condition that is
itself the gear**.

Detonate carries no `[Reaction]`, so it is cast on the opponent's own Main Phase, a full turn ahead
and telegraphed — the same shape the Ivern notables already describe for base removal, which is why
it belongs in the notable rather than being left out.

---

## 6. Smaller notes, in descending order of how much they could mislead

1. **`UNL-132 Angler Beast` is quoted without its trigger** on eleven of the fifteen notables: the
   card reads *"**When you play me,** return all units with 2 :rb_might: or less to their owners'
   hands"*, and it is listed beside two spells (`UNL-180`, `SFD-147`) with costs but no types. A
   reader cannot tell that one of the three base-reachers is a Might-5 body arriving on a play
   trigger, which is a different kind of answer to hold a turn against.
2. **`UNL-177 Ivern` is quoted from its second sentence only.** The dropped *"As you play me, choose
   Bird, Cat, Dog, or Poro. I gain that tag"* is what makes the notable's own phrase **"THE TAG
   BODY"**, singular, coherent — three Iverns supply three tags and one body supplies the fourth.
   The entries carry that arithmetic in older notes; the new notable does not.
3. **`lillia-fae-fawn-signpost-sprite-at-the-origin` quotes 143.4 without 143.4.a**, which reads
   *"This can be altered by Accelerate or similar game effects."* The verdict survives on domain
   grounds and the notable does not say so: the two enters-ready grants in the pool are
   `SFD-171 Renata Glasc, Industrialist` (**Order**) and `OGN-011 Magma Wurm` (**Fury**), and the
   entry's identity is **Calm/Mind** (`UNL-082` mono-Mind, `UNL-045` mono-Calm). The notable's second
   ground — the Sprite is readied at Awaken and killed at 315.2 before ever reaching a Main Phase —
   is independent and unaffected. **Everything else in this notable verified: card text, 143.4,
   414.1.b, 203.3, 315.1.b, 816.1.b, and the phase order 315.1 → 315.2 → 315.3 → 315.4 → 316.**
4. **"the ATTACKER's chosen unit"** (four Plaza notables, about `UNL-107 Stare Down`) uses a word the
   rules define as something else: 807.1.d, *"Being an attacker means the Unit has gained the
   Attacker designation during Combat."* Stare Down opens no combat. It means *the opposing player*.
   This is CLAUDE.md's own newest standing check — **did I use a word the rules define differently?**
5. **"no amount of Might escapes it"** (same sentence) is bounded by the biggest body the opponent
   actually controls. True for a garrison of Might-1 Recruits or Might-3 Sand Soldiers, false as
   written.
6. **`gutter-palace-reaction-dials` reads as a reversal on [Deflect].** `notable[4]` says the Bird
   *"carries [Deflect], so 809.1.c taxes an opponent a rainbow to choose it"*; `notable[7]` says
   *"[Deflect] does not help"*. Both are correct — 809.1.c charges *"for each time they choose"* and
   355.10.d makes a deal-to-all programmatic — but the second needs the scope *against a sweep* or
   the two read as a contradiction in sequence.
7. **"stands at the Plaza as one of the seven"** is loose on `arise-sand-soldiers-plaza` and
   `plaza-armory-miss-fortune`, whose own `terminatesIn` fields say the trigger finds **ten**.

---

## 7. What verified clean, stated so the work is not re-done

**Every per-entry claim in the seven Ivern notables was measured and is correct.** The uniform text
names a specific card, its Might and its zone per entry, and all seven check out against
`cards.json`:

```
ivern-sentinel-hold                  OGN-216 Soaring Scout   M1  BASE   ✓
ivern-arena-sentinel-hold            OGN-216 M1 + OGN-210 M2 BASE       ✓
ivern-bard-four-tag-double-conquer   OGN-210 Daring Poro     M2  BASE   ✓
ivern-arena-trinity-body-order-hold  OGN-210 M2  BASE                   ✓
ivern-arena-draven-chaos-order-chain OGN-210 M2  BASE                   ✓
ivern-ride-the-wind-double-conquer   OGN-210 M2  BASE                   ✓
ivern-brambleback-conquer-burst      OGN-216 M1  BASE                   ✓
```

**The "eighteen entries" count reproduces exactly.** Predicate: an entry has a `uses` row at
`zone: "BASE"` whose card resolves in `cards.json` to a unit of printed Might ≤ 2. **18 of 766 —
BURST 5, CHAIN 4, ENGINE 9**, matching the predecessor's handoff figure and class split.

**Identity claims, all four Plaza entries.** Predicate: union of `cards.json` domains over each
entry's `uses`, capped at two by 103.1.b. All four contain **order**, so mono-Order Garen or Darius
is legal in every one, and `arise-sand-soldiers-plaza`'s "this calm+order identity" is right.

**The +1 itself.** `OGS-013 Garen, Commander` (Order, E6 P1 M5) and `OGN-243 Darius, Executioner`
(Order, E6 P1 M6) both print the identical sentence *"Other friendly units have +1 :rb_might: here."*
— verbatim, both mono-Order. The three Recruit garrisons are genuinely Might 1 (`OGN-222`, `SFD-153`,
`SFD-168`, `SFD-179` all print *"1 :rb_might: Recruit unit token"*).

**The Might arithmetic matches the predecessor's twenty-card table** (`2026-09-13-might-1-survivability.md`,
lines 31–50): min-Might 2 → three cards (`OGN-133`, `OGN-200`, `OGN-041`); min-Might 3 → three more
(`OGN-127`, `VEN-019`, `UNL-132`), so six; seven rows are escaped by no Might at all.

**`keeper-of-masks-flurry-plaza-window` verified in full — the longest notable of the fifteen and the
only one with no defect.** `UNL-189 Bashful Bloom` is the legend and is Calm/Mind ✓; `OGN-266 Siphon
Power` is Mind/Order and `UNL-195 Green Father` (the Brush's owner) is Calm/Order, so both are a
third domain ✓; the seven are Keeper (unit card, printed M1) + two Reflections at 0 Might (187.6) +
four Birds at 1 Might (187.7) = 7 ✓; under `UNL-077 Soul Shepherd` four of seven survive ✓; **Prevent
is four cards pool-wide** (`grep -icE "prevent"` → 4: `OGN-145` Body, `SFD-194` Calm/Body, `VEN-025`
Calm but self-only, `VEN-126` Order) ✓; **the Reaction-speed multi-body pumps are all Order** —
predicate `[Reaction]|[Ambush]` ∧ a +N Might or Shield grant ∧ a plural friendly reference → **6
hits, all read**: `OGN-206` Order, `SFD-151` Order, `OGN-266` Mind/Order, plus `UNL-012` (Fury,
Assault, combat-only), `UNL-046` (Calm but **single target**) and `UNL-071` (Mind, Shield,
combat-only — which the notable addresses by name with 814.1.c) ✓; two `UNL-044 Flurry of Feathers`
at E4 P2 each = **8 Energy + 4 Calm Power** ✓; 315.2 precedes 315.3 so the rune count is the previous
turn's ✓.

**Rule paragraphs opened and confirmed to say what the notables claim:** 381, 143.2.a, 143.4 (+143.4.a),
187.2, 187.3, 187.6, 187.7, 195, 203.3, 315.1.b, 315.1–315.4 ordering, 315.2.b.2, 316, 355.10.d,
383.2.a / 383.2.a.1, 383.4.g.1, 414.1.b, 809.1.c, 814.1.c, 816.1.b, 816.1.c.

---

## 8. Residuals in the predecessor's walk document (not shipped, so not defects on the page)

`docs/phase0/walks/2026-09-13-might-1-survivability.md`, the four-row garrison table at lines 127–130:

- line 129 — `corina-svellsongur-plaza` is given as *"Recruits + Birds, both M1 (187.1, 187.7)"*.
  **There are no Birds in that entry**: its steps put six Recruits at the Plaza beside Corina (M6).
- line 130 — `plaza-armory-miss-fortune` is given as *"Recruits + Sand Soldiers"*. **There are no Sand
  Soldiers in that entry**: two Vanguard Armories make nine Recruits and Miss Fortune (M5) walks in.
  **This is the exact error CLAUDE.md already records for this entry** — the string *"Sand Soldier"*
  occurs there once, inside a cross-reference to `arise-sand-soldiers-plaza` that refutes the reading
  in the same sentence.

Neither reached a shipped notable: all four shipped Plaza notables say *"the Recruits"*, which is
right. The defect stayed in the table. **A table written from a string match is still a string match
even when the prose beside it was walked.**

---

## 9. Leads, with the predicate so they can be refuted in one command

1. **The positional-test audit is CLOSED — see §11. The exposure is exactly the seven Ivern
   notables above and nothing else in the catalogue.**
2. **11 of the 18 base-parked entries still name none of the three base-reachers.** The uniform
   notable states the population correctly (*"eighteen entries … none named any of the three"*) and
   was applied to seven of them; the other eleven are listed in §7's predicate output —
   `treasure-hunter-industrialist-gold`, `faefolk-star-spring-drag`,
   `daisy-green-father-four-tag-attacker`, `friendship-fiora-worthy-mighty-ready`,
   `svellsongur-treasure-hunter-gold`, `swain-shurelya-double-conquer`,
   `svellsongur-apprentice-smith-gear-dig`, `svellsongur-traveling-merchant-discard`,
   `stare-down-demolitionist-gear-strike`, `ravenbloom-diana-fizz-spell-stack`,
   `swain-svellsongur-conquer-burst`. **A note that measures a debt and discharges 7/18 of it leaves
   the count in this file true and the catalogue half-repaired.**
3. **No Gutter Palace entry names gear removal**, and the win condition is a gear. `SFD-005 Detonate`
   at E1 + 1 Fury Power is the cheapest thing in the pool that answers any ALT_WIN in this catalogue.
   Worth sweeping the other ALT_WINs whose payoff is a gear or a battlefield token.

---

## 10. The one sentence for a successor

**A uniform notable is a claim about every entry it lands on, and the clause most likely to be wrong
is the one that was true of the entry it was written for** — the per-entry *facts* in these fifteen
were measured and are right, and what broke was a shared *rules reading* applied to a card whose word
order runs the other way, a *uniqueness claim* about a catalogue nobody re-swept, and a *closing
sentence* naming a sibling that was never re-read on arrival. Two of the three would have been caught
by reading the notable once, in place, on each entry it was pasted onto.

---

## 11. The positional test, audited across the whole pool — CLOSED, and the empty explains itself

§9's first lead is discharged here, in the same document, rather than left open.

**The risk is not "entries citing 383.2.a.1"; it is "cards whose word order is the Loose Cannon
shape".** A Sona-shape card cannot be got wrong by this test — the `if` really is in the Condition —
so the exposed population is the cards where the conditional follows the effect verb.

**Predicate, stated.** A corpus card line whose Effect text (parenthesised reminder text stripped
first, because 051 makes it non-operative and several keywords carry `if` in reminders) contains a
trigger opener — `When` / `At the start` / `At the end` / `The Nth time` — with the word `if`
occurring after it. **937 card rows parsed, 64 hits.** Splitting each at the first comma after the
opener and testing whether the tail begins with `if`: **40 Sona-shape clauses, 24 otherwise.**

**All 24 were read, and the classifier over-reports exactly as expected.** Most are not trigger
conditionals at all: `If you do` is a 205 linkage (`OGN-056`, `SFD-074`, `SFD-084`), a branch is an
effect (`SFD-041` *"If it's a gear, draw it. Otherwise, recycle it."*, `VEN-033`, `SFD-215`), and
`OGN-063 Spirit's Refuge`'s `if` is inside a static. **Four cards are the genuine shape** — a
conditional that gates the trigger's own payoff and sits after the effect verb:

| card | text | 
|---|---|
| `OGN-131` Dune Drake | *"When I attack, give me +2 :rb_might: this turn **if** there is a ready enemy unit here."* |
| `UNL-097` Kinkou Initiate | *"When you play me, draw 1 **if** your other units have total Might 5 or more."* |
| `OGN-281` Hallowed Tomb | *"When you hold here, you may return your Chosen Champion from your trash to your Champion Zone **if it is empty**."* |
| `UNL-177` Ivern, Friend to All | *"When I conquer or hold, score 1 point **if** your units have all of the following tags among them …"* |

(`OGN-223 Peak Guardian`'s *"Then, if I am at a battlefield…"* gates a second instruction inside the
effect and is read as a fifth candidate; no entry makes a condition claim about it either.)

**Predicate: entries using one of those five AND mentioning `383.2.a.1` or `Trigger Condition`.**

```
OGN-131 Dune Drake        2 entries use it,  0 make the claim
UNL-097 Kinkou Initiate   1 entry  uses it,  0 make the claim
OGN-281 Hallowed Tomb     1 entry  uses it,  0 make the claim
OGN-223 Peak Guardian     7 entries use it,  0 make the claim
UNL-177 Ivern             8 entries use it,  8 make a claim  <-- the whole exposure
```

**The mirror error was checked too and is also empty.** Predicate: an entry using one of the 40
Sona-shape cards that nonetheless calls the conditional an Effect / Loose Cannon / checked on
resolution — 84 entries use a Sona-shape card, **11 matched, all 11 read, zero are errors.** Four
matched only on the `uses` filter with nothing readable; `tryndamere-hextech-gauntlets-enforcer`
matched on *"the first part of the effect"*, which is 204.3.a about costs and an unrelated use of the
phrase; and the remaining six are **correct, careful contrasts** —
`karthus-machine-evangel-renata-plaza` and `leblanc-bashful-bloom-trevor-plaza` cite the Loose Cannon
example to establish that the Plaza's `if` is in the Condition, `sona-wind-wall-condition-not-effect`
quotes it verbatim to contrast Sona, and `swain-svellsongur-conquer-burst` names
`ivern-ride-the-wind-double-conquer` as the opposite shape.

**So the class is bounded at the seven notables of §1, and the catalogue already knew.** Predicate:
text fields anywhere in the catalogue stating Ivern's clause is in the Effect / Loose Cannon /
checked on resolution — **8 fields across 6 entries**:

```
ivern-sentinel-hold                   uses[2].note
ivern-arena-sentinel-hold             uses[3].note, uses[4].note
ivern-svellsongur-four-tags-hold      steps[4]
ivern-bard-four-tag-double-conquer    notable[0], uses[1].note
ivern-ride-the-wind-double-conquer    notable[2]
swain-svellsongur-conquer-burst       notable[2]
```

`ivern-bard-four-tag-double-conquer` states the correct reading **twice**, in worked prose citing
Riot's example by name, and carries the wrong one at `notable[10]`.

**What this is worth.** A clean sweep is only a result when it says why it is clean, and this one
does: **the positional test can only be got wrong on a card with the Loose Cannon shape, the pool
prints four, and exactly one of the four is heavily catalogued.** That is also why pinning it costs
nothing — the check is cheap, the state is clean apart from a repair the manager is about to make,
and by CLAUDE.md's own rule a check that comes back clean is the one worth pinning as a test, because
it can only ever be paid for once. **Proposed, not written, because `test/` is not mine**: assert that
no entry using one of the four Loose-Cannon cards claims its conditional is part of the Trigger
Condition, with a non-vacuity line printing the four base codes and the number of entries scanned.

---

## 12. Lead 2, read rather than pasted — **eight of the eleven are owed, not eleven**

§9's second lead said eleven of the eighteen base-parked entries name none of the three
base-reachers. That is true of the *count* and the obvious next move — paste the uniform notable onto
all eleven — would reproduce, while fixing it, the exact failure §1 to §5 report. **All eleven were
read. Three are not exposed, for three different reasons, and only one of the three was already a
known reason.**

### Not exposed (3)

**`swain-shurelya-double-conquer` and `swain-svellsongur-conquer-burst` — the clause is past tense.**

```
VEN-065 | Swain, Visionary | Unit | Mind | E6 P1 M6 | ... When I conquer, if you've played a
non-token unit, a non-token gear, and a spell this turn, you score 1 point.
```

*"if you've played"* is a fact about the turn's history. Both entries say so in their own steps —
*"Swain's three-part condition is now satisfied for the rest of the turn"* and *"All three thirds of
the Trigger Condition are now historical facts about this turn"*. `OGN-096 Watchful Sentry` (M1) and
`VEN-043 Steel Paws` (M0) have finished their work the instant they resolve; bouncing or killing
either afterwards changes nothing. **This reason my predecessor had already named.**

**`stare-down-demolitionist-gear-strike` — the printed Might is not the board Might, and the entry
says so in its first sentence.** `VEN-080 Noxian Demolitionist` is printed **M1**, which is what the
predicate read. Its step 0 reads *"[Equip] both to him … **He is now M5** (434.1.d, 137.3, 477.3.d)"*,
and measured on `cards.json` that is exact: `SFD-118 Boneshiver` and `UNL-096 Hunter's Machete` each
carry `mightBonus: 2`. **718.4** — *"While in this state, the card's Might Bonus modulates the
Top-Most Card's Might by the value listed"* — and **137.3.a** put it at 5 wherever it stands.
`UNL-132 Angler Beast` returns units *"with 2 :rb_might: or less"* and cannot reach it. The Might
Bonus is not incidental here either: his own payoff reads *"kill a gear with Energy cost no more than
**my Might**"*, so the entry is built on the number the predicate could not see.

**This is a new member of the predecessor's class and it is worth stating separately: a `uses` row
carries the card's PRINTED Might, and an entry that attaches gear has a different Might on the board.
The deciding datum was again in the steps.** (One honest window: if the gear is attached on a later
turn than the body is played, he sits at M1 in between; the entry declares the assembled state.)

### Exposed, severely (3) — every one is a Svellsongur carrier

`svellsongur-treasure-hunter-gold` (`SFD-130`, M1), `svellsongur-apprentice-smith-gear-dig`
(`SFD-041`, M2), `svellsongur-traveling-merchant-discard` (`OGN-185`, M2). Each is a small body
carrying **three `SFD-059 Svellsongur`** for the 2³ = 8 composition, and each parks at base.

`UNL-132 Angler Beast` (Chaos, E5 P1) returns it to **hand**, and **719.5** — *"When a Top-Most Card
changes zones from a board zone to a non-board zone, all Attached cards Detach from it, remaining in
their current zones"* — takes all three Svellsongur off, with **457.1** recalling them to base.

**The cards survive; what is spent is the rebuild, and I over-stated it before checking.** The first
figure I reached for was the whole investment (E9 + 3 Calm Power of Svellsongur plus E3 + 3 Calm
Power of attaches). That is wrong: CLAUDE.md already records that losing a carrier costs *one [Equip]
cost and not the card*. The honest bill is **E2 to replay the carrier — which 143.4 enters exhausted,
so it cannot move and the engine produces nothing that turn — plus E1 + 1 Calm Power per re-attach,
and the three must go back on IN ORDER**, because 480.3 applies effects in timestamp order and the
composition depends on it. **E5 + 3 Calm Power and a full turn, against one card at E5 + 1 Power.**
A clean trade for the opponent, and not the catastrophe the first figure implied. **The predicate
that overstates is not always someone else's.**

### Exposed, ordinarily (5), each with the shape of its loss

| entry | body | what losing it costs |
|---|---|---|
| `treasure-hunter-industrialist-gold` | `SFD-130` M1 | the Gold faucet stops; replayable for E2 |
| `faefolk-star-spring-drag` | `UNL-112` M1 | the forced reposition stops; its step 0 puts it *"in your base, ready"* and its step 3 moves it back there, so it stands at base every opponent turn |
| `daisy-green-father-four-tag-attacker` | `OGN-216` M1, `SFD-159` M2, `OGN-210` M2 | **three of the four tags in one card**, and the loss is total |
| `friendship-fiora-worthy-mighty-ready` | `OGN-210` M2, `SFD-159` M2 | **partial, not total** — `UNL-046 Friendship` gives +1 per tag, so one tag is one Might and the 709 crossing may still land |
| `ravenbloom-diana-fizz-spell-stack` | `OGN-103` M2 | exposed only **between deployment and the payoff turn**; on the payoff turn the spells take her to M6 and out of the band |

**`daisy-green-father-four-tag-attacker` deserves the contrast, because it is Ivern's mirror on the
same four tags.**

```
UNL-196 | Daisy! | Unit | E9 P2 M8 | ... When I attack while your units have all 4 tags, [Stun] an
enemy unit here.
```

Daisy's conditional sits **between the trigger opener and the effect verb**, so 383.2.a.1 makes it
part of the **Trigger Condition** — checked once, at the Attacker designation — and the entry's own
step 3 cites it correctly. **Ivern's identical-looking four-tag clause follows the effect verb and is
an Effect clause.** Same four tags, same bodies, opposite answer to *"can they remove a tag in
response?"* — for Daisy, no; for Ivern, yes.

### The vocabulary hole in my own §11 sweep, reported rather than quietly patched

Daisy prints **`while`**, not `if`. §11's predicate required the word `if`, because 383.2.a.1's two
worked examples both use it — **so the domain's vocabulary was wider than the rule's examples and my
sweep could not see her.** Re-run with `if | while | unless | as long as`: **42 Sona-shape clauses
(up from 40) and 27 otherwise (up from 24)**. The two added Sona-shape cards are `UNL-196 Daisy!` and
`UNL-150 Vex, Apathetic`; **zero new Loose-Cannon-shape cards appear**, because every added `while`
in the LOOSE bucket is a *separate static sentence* rather than a conditional gating the trigger
(`SFD-201` *"While your score is within 3 points…"*, `VEN-132` *"While I'm at a battlefield,
opponents can't play spells with that name"*, `VEN-135` *"While there's a stunned enemy unit here, I
have +2"*), all read. **§11's four stand and its conclusion is unchanged**; what changes is that the
predicate was narrower than the pool, which is the same defect this walk reports in other people's
work, found in mine.

### Tally

**Eight of eleven are owed a note, not eleven.** Three subtractions, three different reasons — past
tense (2), printed Might ≠ board Might (1) — and the eight split into three severe and five ordinary,
with the shape of the loss differing in every one: total for Daisy and the Svellsongur carriers,
partial for Friendship, windowed for Ravenbloom. **There is no uniform sentence that is true of all
eight**, which is the answer to the question the lead was really asking.

---

## 13. Lead 3 — **the gear answer, generalised: two finishers whose payoff IS the gear still name nothing**

§5 found that no Gutter Palace entry named gear removal while the win condition is a gear. The
general question is: **which finishers have a `payoff` that is itself a gear, and do they name what
kills it?** Measured at `origin/master` **`1f12d61`**, i.e. *after* the manager's repair of §1 to §5,
so this is the current state and not the state I audited.

**The answer set, swept rather than quoted.** Predicate: corpus lines matching
`(kills?|banish(es)?|return|detach)` within 60 characters of `gear` **or** `Equipment` — plural verbs
included per the `kills`-vs-`kill` trap this project already records, reminder text NOT stripped so
every hit is read. **22 + 3 raw hits, all read**, self-facing and trash-recursion rows removed
(`OGN-113`, `OGN-181`, `SFD-035`, `SFD-044`, `SFD-061`, `SFD-084`, `VEN-067`, `VEN-089` all act on
your own gear or on your trash). **Fifteen enemy-facing printings remain**, and **every domain prints
at least one**:

```
Fury   OGN-022 Thermo Beam   SFD-005 Detonate   VEN-003 Brittle Steel   SFD-011 Angle Shot
Calm   OGN-056 Adaptatron    SFD-032 Disarming Rake
Chaos  OGN-179 Acceptable Losses   SFD-135 Factory Recall   SFD-147 Downwell
Order  OGN-224 Salvage       SFD-160 Zaun Punk   VEN-131 Decree of Unity
Mind   SFD-074 Pickpocket    SFD-077 Rocket Barrage
Body   VEN-080 Noxian Demolitionist
```

**The `Equipment` half of the noun matters and a `gear` predicate cannot see it.** `SFD-011 Angle
Shot` (Fury, **E2, `[Reaction]`**) reads *"Choose a unit and an Equipment with the same controller.
… **detach** that Equipment from that unit. Draw 1."* — the shared controller need not be you, so at
Reaction speed it takes the Might Bonus (137.3.a) and the appended Effect Text (718.3, 719.1) off an
enemy carrier **without killing anything**, and cantrips. It is the only Reaction-speed answer to an
attached Equipment in the pool, and it says `Equipment` where every other row says `gear`.

**Result: 17 finishers have a gear in a `payoff` role; 15 name an answer, 2 do not.** The thirteen
that already did were opened and read rather than trusted — the Trinity Force family carries a full
worked notable naming six unconditional enemy-facing answers with their domains *and* their timing
(*"Thermo Beam and Salvage are [Action] … Detonate and Brittle Steel are plain spells, and 155
confines a spell to an Open State outside of Showdowns on its controller's turn"*). That is real
coverage, not a regex artifact.

### `bottled-constellation-time-warp` — the credential and the hole are the same fact

Payoff `VEN-067 Bottled Constellation`: **Gear, Mind, E10 P2**. Two notables, the thinnest finisher
in this pass. `terminatesIn: "9 points, opponent never acts"`.

CLAUDE.md records this entry twice: it is **the only finisher in the catalogue that both scores and
needs nothing whatever from the board**, and it is **the slowest row the turn clock produces, T13
against a T6 baseline**. Put those together and the gap is sharp: *"opponent never acts"* is true of
the finishing sequence and false of the **twelve turns it takes to deploy three Constellations at
E10 + 2 Power each**. Board-independence is exactly what makes the gear the only thing worth
answering — there is nothing on the board to attack — and the cheapest answer in the pool is
`SFD-005 Detonate` at **E1 + 1 Fury Power**, which also draws the Constellation's controller two
cards. The entry names nothing.

### `gutter-palace-keeper-time-warp` — it looked for answers, and looked at the bodies

Six notables, and **careful ones**: `notable[4]` works out that 323.7 and 466.5.c send the hidden
Keeper to the trash if the battlefield changes hands, and `notable[5]` names `OGN-133 Flurry of
Blades` against the Might-1 bodies. **It answers the body question and never asks the gear question,**
while `UNL-088 Gutter Palace` is the win condition and is a gear. Same E1 + 1 Fury Power.

**And its `notable[5]` is the pre-repair text, still live.** It is byte-for-byte the paragraph the
manager replaced on `keeper-of-masks-flurry-plaza-window` today, and **two of its three named repairs
are illegal here too**, for the same reason in a different identity. The entry's own `easy` says
*"Domain is Mind + Chaos"*, and measured over `cards.json`:

| named repair | domains | legal in Mind/Chaos? |
|---|---|---|
| `UNL-077 Soul Shepherd` | mind | **yes** — and repairs nothing: it reads *"Your **token** units have +1"*, and the bodies are `UNL-081 Keeper of Masks` (a unit **card**, printed M1) plus two Reflections at 0 Might (187.6), so the Keeper never moves and the Reflections reach M1 and still die to 1 damage (143.2.a) |
| `OGN-266 Siphon Power` | mind, **order** | **no** — a third domain under 103.1.b |
| `UNL-T03 Brush` | Green Father's token; he is calm/**order** | **no** — a third domain |

**Diagnosed, corrected on the sibling this morning, unapplied here.**

**Unlike the Calm/Mind sibling, this identity does have answers — and the `exactly` clause makes one
of them cost a body slot.** `UNL-147 Baron Nashor` is **mono-Chaos**, *"Other friendly units have +2
:rb_might:"* board-wide, which puts the Keeper at M3 and both Reflections at M2, out of Flurry's
range entirely. But the Palace asks for *"**exactly** 4 units at battlefields"* and Baron *"enters
there"* at the Baron Pit, which 187.9 makes a battlefield — **so he is a fifth body and breaks the
count unless the pre-existing unit is dropped.** That is §3's overshoot property biting the repair
rather than the line.

**The body-count-neutral answer is a counter, and it is two cards.** Predicate: corpus lines
containing `Counter a spell` — **7 printings** (narrower than the eleven-counter figure CLAUDE.md
records, which includes the `spell or ability` wording; stated so the numbers are not confused). Of
the seven, exactly two are legal in Mind/Chaos and both are **mono-Chaos, E2, `[Reaction]`**:
`SFD-136 Hard Bargain` (*"Counter a spell unless its controller pays 2 Energy"* — a tax, not a hard
counter) and `UNL-131 Abandon` (*"Counter a spell. Return it to its owner's hand instead of putting
it in their trash. [Predict]"*). All four Prevent cards in the pool are out of this identity, so
Prevent is empty here as it was on the sibling.

**And the entry's own rune ledger says what holding one costs.** Its `notable[1]` budgets the
finishing turn to the rune: twelve runes exhausted for 12 Energy, one recycled for Ekko's Power,
Ekko's Deathknell readying the remaining eleven for a second 11 — *"The turn costs 22 Energy and 6
Power … **One Energy is left over.**"* **Abandon costs two.** So the protection is not a spare card,
it is a restructured ledger — which is precisely the sentence the entry is missing and precisely the
kind of thing only its own arithmetic can say.

### What this does not claim

I did not re-walk the thirteen that name an answer beyond reading the matched sentence in each, and I
did not verify the full eleven-counter census — my predicate was `Counter a spell` and returned seven.
Both numbers are stated with their predicates so the next reader can widen either in one command.

---

## 14. The mirror of lead 3 — **what can be removed AT the payoff is a four-line taxonomy, and three of its four rules are cited by nothing**

§5 and §13 are both instances of one question a finisher should answer and usually does not: **can the
opponent remove the thing that pays?** Sorting the 80 finishers by the card TYPE in their `payoff`
role turns that into a short table with a rule behind every row. (`Card.type` is an ARRAY; a
`=== "unit"` test returns zero for every card in the pool.)

**80 finishers, 10 with no `payoff` row at all. Payoff card types: unit 31, gear 12, battlefield 12,
spell 5, and 10 across mixed rows** (`battlefield+gear` 1, `spell+unit` 2, `gear+unit` 3,
`battlefield+spell` 3, `gear+spell` 1). Widening the role filter to `payoff|battlefield` gives
**29 finishers carrying a battlefield card**.

| payoff is a… | can it be removed? | rule | pool |
|---|---|---|---|
| **unit** | yes — damage or a kill instruction | 143.2.a, 428.1 | the whole removal suite |
| **gear** | yes — kill, bounce, or **detach** | — | **15 enemy-facing printings, every domain** (§13) |
| **battlefield** | **not killed, not moved, not recycled** — only **REPLACED** | **170.3, 170.4, 185.2.e**; 170.7 still makes it targetable | **exactly ONE card** |
| **legend** | **cannot be killed**; a Champion Legend cannot even leave its zone | **174.3**, 107.4.d | — |

```
170.3.  Battlefields cannot be Killed during the course of regular play.
170.4.  Battlefields cannot be Moved.
170.7.  Battlefields can be targeted by spells or game effects.
174.3.  Legends cannot be Killed during the course of regular play.
185.2.e. Tokens inherit the recycle destination of their type.
           Example: … Token battlefields and legends can't be [recycled].
```

**All five are cited ZERO times by `data/combos.json`.** That is not a debt in the §13 sense — it is
the **explanation of a pattern the catalogue already exhibits and never states**. Every Plaza entry's
threat discussion is about the **bodies** and about **Control** (323.6, 190.6.d), and never about the
Plaza, and the reason is 170.3 with 170.4: there is nothing to say, because nothing kills a
battlefield. A battlefield payoff is the one payoff class with no removal answer at all.

**The single exception, swept rather than assumed.** Predicate: corpus lines matching
`(replace|swap|remove|banish|return)` within 60 characters of `battlefield`, **11 hits, all read**.
Ten of the eleven return or banish a **unit** *at* a battlefield (`OGN-169`, `OGN-172`, `OGN-188`,
`SFD-138`, `SFD-145`, `UNL-021`, `UNL-184`, `UNL-185`, `VEN-110`) or are the Brush's own swap-back
(`UNL-T03`). **One acts on the battlefield itself:**

```
UNL-195 | Green Father | Legend | Calm/Order | When you conquer or hold, you may exhaust me to
replace that battlefield with a Brush battlefield token.
```

**438.5** — *"The card or token that is Replaced is placed in **Banishment**"* — with 438.5.a keeping
it *"Replaced and not Banished"*, so 108.6.c's no-return rule does not bite, and 438.7.b/438.7.b.1
governing the swap back. He is a **legend**, so he costs no deck slot.

**The careful statement, because the obvious one over-claims.** His trigger reads *"that
battlefield"* — the one **he** conquered or held — so he cannot reach your Plaza until he has taken
it, and by then 190.6.d has already blanked its text for you. What the replacement changes is not
the loss but the **recovery**: the Plaza leaves the board into Banishment, and the Brush's swap-back
(*"When you score here, you may replace this with the battlefield it replaced"*) is the **Brush's
own** ability, which 190.6.a gives to **its Controller**. So you get the Plaza back only by
conquering the Brush and then scoring there — **a delay measured in turns, not a permanent loss**,
and for that whole time the win condition is not on the board.

**Nothing in the catalogue says this. Zero of the 29 battlefield-payoff finishers name Green Father
as a threat** — and the check nearly reported otherwise, which is worth recording. A first pass
flagged **78 entries as "naming Green Father"**; opened, **every one of the three battlefield-payoff
hits is a false positive**: `noxian-drummer-eye-svellsongur-plaza` and `corina-svellsongur-plaza`
name him in the `easy[0]` **legend census** (*"Legend domains cover Calm and Order — … Green Father
(UNL-195) …"*), and `keeper-of-masks-flurry-plaza-window` names him only to establish that the Brush
is **Calm/Order and therefore illegal** in a Calm/Mind shell. **Right file, wrong sentence, three
times out of three.** The catalogue does hold the mechanic — `green-father-brush-ultrasoft-poro-birds`
works the replacement out in full, with 438's own worked example and a caution that there are **two**
Green Father base codes (`UNL-195`, `UNL-233`) — but it is catalogued as a **tool** and never pointed
at the 29 lines it answers.

**Why this is worth a note rather than 29 notes.** A gear payoff has fifteen answers in six domains
and the entry should name the cheapest; a battlefield payoff has **one**, it is a legend, it costs the
opponent a conquer first, and it delays rather than destroys. **That is one sentence, true of all 29,
and the taxonomy is what makes it one sentence instead of an audit.**

---

## 15. The fourth row — **a spell payoff is the only one answered AT the payoff, and 0 of 11 say so**

§14's table has a row I had not opened. It turns out to be the sharpest of the four, because the
window is not a matter of the opponent having removal available a turn early — **the rules guarantee
it, at the instant the payoff is played.**

```
359.3.c.  Other players have an opportunity to play Reactions before the resolution of spells.
337.2.    If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds
          resources, it resolves immediately—Move to Step 4: Resolve.
425.1.c.  Countering does not refund any costs paid to play a card, activate an ability, or trigger
          an ability.
425.1.c.1.   This includes additional costs.
```

Read together: **a unit or gear payoff never gets a pre-resolution window — the process skips the
step at which windows exist — and a spell payoff always does.** So the four rows differ not only in
*whether* the payoff is answerable but in *when*:

| payoff | answered | window |
|---|---|---|
| unit | **before** — on an earlier turn or in a Closed State | none of its own (337.2) |
| gear | **before** — same | none of its own (337.2) |
| battlefield | essentially not at all | — (170.3, 170.4) |
| **spell** | **at the instant it is played** | **guaranteed by 359.3.c**, with **no refund** (425.1.c) |

**The answer set, swept.** Predicate: the bare word `counter` over `corpus_flat.txt`, **14 hits, all
read**. Three are not counters — `SFD-194 Counter Strike` is a Prevent that merely carries the word
in its name, and `VEN-015 Decree of Rage` and `VEN-069 Mel, Newly Awakened` **grant**
can't-be-countered rather than countering. **Eleven counter printings remain**, which reproduces
CLAUDE.md's figure exactly, and **Calm prints five of the eleven**:

```
Calm       OGN-045 Defy   OGN-064 Wind Wall   SFD-045 Not So Fast
           UNL-044 Flurry of Feathers   VEN-039 Crumbling Sands
Chaos      SFD-136 Hard Bargain   UNL-131 Abandon
Body       UNL-106 Repulse
Body/Order SFD-206 Riposte
Calm/Mind  UNL-190 Lilting Lullaby
Mind/Chaos VEN-152 Rebuttal
```

**Result: 11 finishers have a spell in a `payoff` role, and NONE of them contains the word
`counter`.** The single entry my predicate flagged as naming one is a false positive of my own making
— `keeper-of-masks-flurry-plaza-window` matched because `UNL-044 Flurry of Feathers` **is its payoff
card**, and Flurry is in the answer set only because one of its two modes is a counter. **The honest
figure is zero of eleven.**

### Six of the eleven are `OGN-122 Time Warp`, and that is the whole finding

```
OGN-122 | Time Warp | Spell | Mind | E10 P4 | Take a turn after this one. Banish this.
```

`time-warp-hold-burst`, `renata-time-warp-ekko-refresh`, `power-nexus-atlas-sentinel-time-warp`,
`power-nexus-benefactor-sentinel-time-warp`, `sentinel-trinity-time-warp-chain` and
`shen-sentinel-time-warp-chain` all pay through it. **E10 + 4 Power is the largest single cost in any
finishing turn this catalogue prices**, it is a **spell**, and 425.1.c refunds none of it.

**Seven of the eleven counters reach it; four cannot, and the reason is printed on each.** `OGN-045
Defy` (*"costs no more than 4 Energy and no more than 1 rainbow"*) and `VEN-152 Rebuttal` (*"Energy
cost no more than 4"*) are priced out by Time Warp's own cost. `SFD-045 Not So Fast` and `UNL-106
Repulse` both require the spell to **choose a friendly unit or gear**, and Time Warp chooses nothing
— so the two cards in the pool that answer an **ability** are exactly the two that cannot answer
this spell.

**The cheapest that does reach it is `VEN-039 Crumbling Sands` — Calm, E1 + 1 Power** — *"Counter a
spell **if an opponent has played another spell this turn**."* That condition is about the combo
player's own turn and is not automatic; it is satisfied on any line that casts anything else first,
which several of the six do. **The most punishing is `UNL-190 Lilting Lullaby`** (Calm/Mind, E2 P2):
*"Counter a spell. **Its controller can't play spells this turn.**"* — which does not merely take the
Time Warp, it ends the finishing turn. **`UNL-131 Abandon`** (Chaos, E2) returns it to hand instead
of the trash, which is worse for the caster than it sounds only if they can afford to recast it, and
on a turn budgeted to the rune they cannot.

**And `VEN-152 Rebuttal` is the one that is not a counter at all**: *"Choose a spell with Energy cost
no more than 4. You may pay rainbow. If you do, **gain control of it and you may make new choices for
it**. Otherwise, counter it."* It is out of range for Time Warp, but against any spell payoff at 4 or
less it does not deny the line, it **takes it**.

### What this adds to §13 and §14

The three rows differ in the **shape of the advice an entry owes**. A gear payoff owes the cheapest of
fifteen answers and a note that all of them must be cast a turn early. A battlefield payoff owes one
sentence about one legend. **A spell payoff owes something neither of the others does: an
acknowledgement that the answer arrives in a window the rules create for it, after every cost is
already spent** — which is why *"the opponent never acts"*, the sentence §13 found on
`bottled-constellation-time-warp`, is the single most dangerous framing in this class. The opponent
does not need a turn. **359.3.c gives them the window on yours.**

---

## 16. The INFINITE class — **ten of fourteen loops run on a gear, and the split that decides their exposure is a TAG**

An INFINITE's payoff is a **loop**, not a card, so §14's question has to be asked of the loop's links
instead of a `payoff` row — and a loop is a serial dependency, so **every link is load-bearing and
any one removal ends it.** Measured over the 14 INFINITEs at `origin/master` `1f12d61`.

**Ten of the fourteen have a gear among their links**, which makes §13's answer set the question for
most of the class. Six of the ten already carry a **full** gear-answer notable — naming the six
unconditional enemy-facing kills with their domains, the `[Action]`-versus-plain-spell timing split
(806.1.c.1 against 155), **and `SFD-011 Angle Shot` as the Reaction-speed one**. That is thorough
work and it is not what this section is about.

**Four do not**, and they are not four random entries:

| entry | gear link | |
|---|---|---|
| `lux-infinite-energy` | `OGN-212 Forge of the Future` | **the catalogue's flagship loop** — #21's whole ledger is built on it |
| `lux-infinite-power` | `OGN-212 Forge of the Future` | |
| `lady-luminosity-loop-comet` | `OGN-212 Forge of the Future` | |
| `gemdragon-henge-vi-blind-fury` | `SFD-117 Ancient Henge` | |

**And `gemdragon-henge-vi-blind-fury` nearly passed the check.** It matched a gear-answer regex
because its own **step 3** reads *"Detonate (1 Energy + 1 Power): **kill your own Ancient Henge**,
draw 2 Dragons"* — it names the card as **its own tool**, never as an answer to itself. **Right file,
wrong sentence, and that is the fourth time in this walk** (after the three Green Father false
positives in §14). A `names-the-card` predicate cannot distinguish a threat from an instrument, and
in this catalogue the same card is routinely both.

### The split is the Equipment tag, and it runs the other way from what §13 implies

```
OGN-212 Forge of the Future   type=[gear]  tags=[]            <- NOT Equipment
SFD-117 Ancient Henge         type=[gear]  tags=[]            <- NOT Equipment
SFD-153 Eye of the Herald     type=[gear]  tags=[Equipment]
SFD-073 Experimental Hexplate type=[gear]  tags=[Equipment]
SFD-059 Svellsongur           type=[gear]  tags=[Equipment]
SFD-009 Serrated Dirk         type=[gear]  tags=[Equipment]
```

**`SFD-011 Angle Shot` — the only Reaction-speed answer in the fifteen — is a DETACH, and it names an
`Equipment`.** A gear that is never attached cannot be detached, so **Angle Shot cannot touch the
Forge or the Henge at all.** Of the fifteen: four carry `[Action]` (`OGN-022`, `OGN-179`, `OGN-224`,
`SFD-135`) and so reach a Showdown on either player's turn (806.1.c.1); one is `[Reaction]` and is
the detach; the rest are plain spells or triggers, confined by 155 to their controller's own Main
Phase in an Open State.

**So the four uncovered loops have a NARROWER answer set than the six covered ones, and the note they
owe says so.** Their engine cannot be answered at Reaction speed by anything, and the loop runs
entirely inside the combo player's own Main Phase — so every answer must be cast on the **opponent's**
turn, a full turn ahead and fully telegraphed. **That maps one-to-one onto the covered/uncovered
split**: the six that carry the notable all run **Equipment** engines, and all four that do not run
**non-Equipment** gear. The notable was written where Angle Shot applies.

This is a second disjointness on the same halving of the gear pool that CLAUDE.md already records
from the exhaust side (*"the 40 Equipment carry ZERO exhaust symbols anywhere in their text while 40
of the other 67 do"*): **the Reaction-speed gear answer reaches one half of the pool and not the
other.**

### What the Forge's own text makes of it

```
OGN-212 | Forge of the Future | Gear | Order | E2 | When you play this, play a 1 Might Recruit unit
token at your base. Kill this: Recycle up to 4 cards from trashes.
```

**The recycle is paid by killing the Forge**, which is why `lux-infinite-energy`'s step 0 opens
*"Activate Forge of the Future (Kill this)"* and its step 7 replays it for 2 Energy. So the Forge is
already dying and being rebought every pass, which makes an opponent's kill much less decisive than
it first looks — **except for what it takes with it.** The recycle is the loop's only refill, and
CLAUDE.md records that this ledger runs with **zero spare draws** by construction. An opponent's kill
removes the Forge **without giving its controller the recycle**, so the draws that pass is funding
have nothing behind them. **Whether that lands on 431.1.a in the same pass depends on where in the
pass it happens — which is exactly the kind of thing only the entry's own ledger can work out, and
none of the three states it.**

I have deliberately not asserted the Burn Out. The defensible statement is the narrower one: **the
loop's refill IS the gear, the ledger has no slack, and killing the gear does not hand over the
refill.**

### The four that have no gear link, for completeness

`renata-mastermind-points`, `jayce-mesmerize-renata`, `jhin-virtuoso-ekko-malzahar-vi` and
`threshold-reveler-infinite-energy`. The last is the interesting one against §14: its non-unit link is
`VEN-166 Threshold of the Gray`, a **battlefield**, which 170.3 and 170.4 put beyond removal entirely
— so its only answerable link is `VEN-020 Twilight Reveler`, a Might-3 body at **base**, and the
answer set for that is the narrow one §1's Ivern notables describe.

---

## 17. The ALT_WIN class splits **23 / 3** on removability, and the split is the card type

Rule 195 is what makes the class:

```
195.    A player also wins the game if an effect instructs them to do so, or if they are the only
        player remaining in the game.
195.1.  If an effect instructs a player to lose the game, that player is immediately removed from
        the game.
```

**Predicate: corpus lines containing `win the game`, `lose the game`, `you win` or `you lose`. Five
hits, all read.** Two are about winning a **combat** and would be caught by a naive sweep —
`SFD-185 Glorious Executioner` (*"When you **win a combat**, draw 1"*) and `UNL-201 Voidreaver`
(*"When you **win a combat**, gain 1 XP"*). Three touch the game:

```
OGN-293 | The Grand Plaza | Battlefield | Colorless | When you hold here, if you have 7+ units here,
                                                      you win the game.
UNL-088 | Gutter Palace   | Gear | Mind         | At the start of your Beginning Phase, if you have
                                                  exactly 4 cards in hand and exactly 4 units at
                                                  battlefields, you win the game. …
OGN-276 | Aspirant's Climb | Battlefield | Colorless | [BANNED constructed:banned, 2v2:banned]
                                                       Increase the points needed to win the game by 1.
```

`OGN-276` is banned in **both** formats and does not make anyone win — it raises the Victory Score.
**And ZERO cards in the pool say `lose the game`**, so 195's second route and the whole of 195.1 are
**dead letter here**: nothing in this pool removes an opponent from the game.

**So the pool prints exactly TWO live win conditions, and all 26 ALT_WINs stand on one of them:
`OGN-293` in 23, `UNL-088` in 3, and zero entries use any other route.** (Measured: ALT_WIN entries
whose `uses` contain none of the three = **0**.)

### Why that is the sharpest thing §13 and §14 produce

The two live win conditions sit in **different rows of the payoff taxonomy**, and the class therefore
is not homogeneous at all:

| win condition | entries | card type | can the opponent remove it? |
|---|---:|---|---|
| `OGN-293 The Grand Plaza` | **23** | **battlefield** | **no** — 170.3 not killed, 170.4 not moved, 185.2.e a token not recycled; only §14's single legend replaces it, and only after conquering it |
| `UNL-088 Gutter Palace` | **3** | **gear** | **yes, for `SFD-005 Detonate` at E1 + 1 Fury Power**, which also draws its controller two cards |

**Twenty-three of the twenty-six ALT_WINs have a win condition nothing in the game can remove, and
the other three have one that dies to the cheapest gear removal in the pool.** That is a fact about
the class, not about any entry, and it explains a pattern the catalogue already exhibits: the Gutter
Palace entries are exactly the ones that needed §5's Detonate note, and the Plaza entries genuinely
did not need it — their exposure really is only the bodies (Might, §1–§2) and Control (323.6,
190.6.d), because the Plaza itself is beyond removal.

It also means the two halves owe **opposite** advice. A Plaza entry should say *what keeps seven
bodies alive*; a Gutter Palace entry should say *what keeps the gear alive* — and, per §3, that its
count can be broken **upward** as well as downward, which no Plaza line can be.

**One line the Guide view could carry, if `web/` ever wants it** (that file is rc-builder's, so this
is a suggestion and not a change): *"Two cards in Riftbound say you win the game. One is a
battlefield and cannot be removed; one is a gear and dies to one Energy."*
