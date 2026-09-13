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
