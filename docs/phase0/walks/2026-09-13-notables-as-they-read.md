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

---

## 18. The unit row closes the taxonomy — **no payoff unit in this catalogue opens a window when it lands**

The unit row is the biggest (36 finishers, 38 `payoff` rows, **12 distinct payoff units**) and it is
the one where naming an answer is useless: a unit is answerable by the whole removal suite. The
question the taxonomy makes askable instead is about **when the opponent first gets priority.**

```
337.2.  If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability that Adds
        resources, it resolves immediately—Move to Step 4: Resolve.
401.1.  Add a Pending Item to the chain representing the Ability … Notably, although this Chain Item
        will not have a card representing it, this will create a Closed State.
312.2.c. When the turn is in a Closed State, all pending chain items finish being finalized …
```

**A unit with no triggered ability resolves immediately and hands the opponent nothing** (337.2). A
unit whose ability fires **on play** does the opposite: 401.1 makes that ability's chain item create a
Closed State, and 312.2.c hands out priority in it — **the body opens the window its own play never
would.** So the question is not *has it a trigger* but *does the trigger fire on arrival*.

**Measured: 33 of the 38 payoff rows carry a triggered ability, and ZERO of the 12 distinct payoff
units fire one on arrival.** Their triggers are on conquer, hold, attack, move or death — every one
of them **after** the body is established. `SFD-088 Renata Glasc, Mastermind` has no triggered ability
at all, only two activated ones and a static restriction.

### Two predicate corrections, both caught before reporting, and the second inverted the answer

**First**, a `\bWhen\b`-based test called `OGN-239 Machine Evangel` and `SFD-021 Ferrous Forerunner`
trigger-less. Both print **`[Deathknell]`**, which 808.1.c makes *"functionally short for 'When I die,
[Effect].'"* — their only literal *When* is in the reminder text the sweep strips. **They were in the
right bucket for the wrong reason**, which is worse than being in the wrong one, because it would
have shipped as a measurement.

**Second, and it changed the result.** A play-trigger predicate returned exactly one hit —
`UNL-177 Ivern, Friend to All`, *"**As you play me**, choose Bird, Cat, Dog, or Poro."* Read against
the rules, that is not a trigger at all:

```
369.1.      A Replacement Effect can usually be identified by the presence of the terms "as," "would,"
            or "instead."
370.1.b.1.  In the case of Replacement Effects that describe a game action to occur "as" an event
            occurs, the described event is replaced by that same event plus the game action being
            performed.
              Example: Undertitan is a unit that reads in part "As I'm revealed from your deck,
              [Add] [2]." …
```

**A replacement creates no Chain Item, so it opens no window** — and Riot's worked example for that
exact wording is `SFD-175 Undertitan`, the card CLAUDE.md already records a shipped entry calling a
trigger twice. **So the honest figure is ZERO of twelve, not one**, and the corrected answer is
cleaner than the one the predicate gave. **Sixth predicate overstatement in this walk, and the first
where reading made the finding stronger instead of smaller.**

### The taxonomy, closed

| payoff | answerable? | window on arrival |
|---|---|---|
| **unit** | yes, by the whole removal suite | **none** — 0 of 12 fire on play (337.2) |
| **gear** | yes, 15 printings, 6 domains (§13) | **none** (337.2) |
| **battlefield** | **no** — 170.3, 170.4, 185.2.e (§14) | — |
| **spell** | yes, 11 counters (§15) | **guaranteed by 359.3.c**, costs unrefunded (425.1.c) |

**Three of the four rows give the opponent no window at the payoff at all, and one gives them a
window the rules guarantee.** Every answer to a unit, a gear or a battlefield must be found on the
opponent's own turn, or in a window some *other* card opened. Only a spell payoff is answered at the
moment it is played.

### And it lands back on §1

`UNL-177 Ivern` is the only payoff unit whose text touches the play event at all, and the reason it
still opens no window is 369.1 — a replacement, not a trigger. **His exposure is entirely at the other
end**: §1 established that his four-tag clause follows the effect verb and is therefore an **Effect**
clause under 383.2.a.1, checked on resolution, so a tag body removed **in response to his scoring
trigger** blanks the whole Score. **He is the one payoff unit in the catalogue whose payoff can be
answered after it has already triggered, and the 2026-09-13 notable on seven entries said the
opposite.** The walk opened there and closes there.

---

## 19. The 23 Plaza entries against the one-damage sweep — **clean, and one live defect found by sampling**

rc-manager8's brief, run over the closed population §17 produced. **23 entries use `OGN-293`, all 23
are ALT_WIN.**

### The first number overstated, and by exactly the sanctioned exception

A naive pass — *does each of the 23 name a domain-legal static +Might?* — reports **2 failures**:
`spiderling-swarm-grand-plaza` and `dragonstorm-confront-grand-plaza`. **Both are false.** Neither
needs a fix, because neither has a Might-1 garrison, and each says so in its own steps
(*"Each Spiderling is now 1 + 6 = 7 Might"*; the Dragonstorm bodies measured at Might 3 to 10).
**The exception the instrument forgot is the simplest one available: a garrison that is already out
of range.**

**Eight of the 23 are not exposed at all**, and every one of the eight carries the deciding Might in
its own prose or in a token rule, never in a `uses` row (185: a token can never be one):

| entry | garrison | why it is out of range |
|---|---|---|
| `spiderling-swarm-grand-plaza` | Spiderlings **M7** each | its step 3 |
| `sprite-mother-burst-leblanc-plaza` | Sprites **M3** (187.2) | its step 5, *"21 damage minimum, not 7"* |
| `svellsongur-trevor-leblanc-plaza` | Sprites **M3** | its step 4 |
| `leblanc-bashful-bloom-trevor-plaza` | Sprites M3 + Trevor M3 + LeBlanc M4 | 187.2 |
| `dragonstorm-confront-grand-plaza` | played bodies **M3–10** | its own words |
| `arise-sand-soldiers-plaza` | Sand Soldiers **M2** (187.3) | its step 3 says so outright |
| `desert-call-vi-sand-soldier-plaza` | Sand Soldiers **M2** | its own step |
| `ferrous-forerunner-karthus-mech-plaza` | Mech tokens **M3** (187.4) | its own step |

### The fifteen that are exposed: **15 of 15 answer the question**

Every one either names a domain-legal static +Might grant, or states plainly that its legal one does
not clear the bar. Identity computed as the union of `cards.json` domains over `uses[].card`, capped
at two by 103.1.b; the three battlefield grants (`OGN-294`, `UNL-T03`, `VEN-159`) are excluded a
priori, because 485.4.a with 103.4.c make them mutually exclusive with the Plaza itself.

- Eleven carry a *"THE IDENTITY DOES HOLD AN ANSWER"* notable listing the legal members for that
  identity with their scopes.
- `noxian-drummer-eye-svellsongur-plaza`, `corina-svellsongur-plaza` and `plaza-armory-miss-fortune`
  carry yesterday's Garen/Darius notable (§1–§2).
- `ready-recruits-grand-plaza` is the most careful: it names `VEN-018 Rage Amplifier` for Fury **and
  notes that `UNL-077` is Mind and therefore narrows an all-Order line to Mind/Order**.
- **`keeper-of-masks-flurry-plaza-window` is the negative case done right**: its one legal fix
  (`UNL-077`) is named *and refuted* — *"The one that is legal does not clear the bar."*

**So the check is clean, and it explains itself**: the Plaza family's only exposure is its bodies
(§17: 170.3 and 170.4 put the battlefield beyond removal), which is precisely the thing these entries
have been audited for, repeatedly.

### The live defect: `VEN-130 Aurok General` is offered without its scope, twice

```
VEN-130 | Aurok General | Unit | Order | E5 M5 | [Empower] 3 Energy + 1 Order rune.
                                                [Empowered] > Your units that are [Empowered] have +2 Might.
```

Eleven Plaza notables use one sentence template. In **nine** of them every scoped member carries its
scope — *"`SFD-089 Rumble, Scrapper` +1 **(Mech bodies only)**"*, *"`UNL-077 Soul Shepherd` +1
**(token bodies only)**"*. In **two**, `VEN-130 Aurok General +2` is listed **with no scope at all**,
inside a clause headed **"THE IDENTITY DOES HOLD AN ANSWER"**:

- **`zed-clone-eye-recruits`** `notable[5]` — garrison is **Recruit tokens**
- **`ferrous-forerunner-karthus-mech-plaza`** `notable[10]` — garrison is **Mech tokens**

**It reaches zero of either garrison.** Two gates, both printed: Aurok's static is itself gated on
`[Empowered]`, costing a further E3 + 1 Order Power on top of an E5 M5 body; and the +2 reaches only
*"your units that are **[Empowered]**"*, while **441.1** makes Empowering *"the act of rendering one
or more Game Objects Empowered"* — something a card must **do** to each body. **A Recruit token and a
Mech token are never Empowered**, so the grant applies to nothing. Domain legality is not the problem
(Aurok is mono-Order and both identities contain order); the card simply cannot do the job.

CLAUDE.md already excludes it in those words — *"`VEN-130 Aurok General` reaches only Empowered
units, which a Recruit never is"* — so this is **diagnosed-and-unapplied** in two entries, and the
tell is visible on the page: **the same sentence caveats two of its three members and not the third.**

`zed-clone-eye-recruits` still has two working answers (`OGS-013` +1, `UNL-147` +2) and loses only the
third. `ferrous-forerunner-karthus-mech-plaza` needed no answer at all (Mech tokens are M3), and of
the three it lists, `VEN-018 Rage Amplifier` is genuinely legal and genuinely works — Fury, and that
identity is fury+order — so it keeps one real answer and one dead one.

**`data/combos.json` is rc-manager8's; this is a report, not a change.**

---

## 20. The eleven-instance template: **a caveat makes a claim honest, it does not make the card an answer**

§19's Aurok defect is one member of one sentence. The sentence itself is worth measuring, because it
appears eleven times and was filled per identity by hand.

**Predicate: for each answer card, how often is it LISTED in a Plaza notable, and how often is its
own scope LIVE for that entry's garrison** (garrison composition read from the entry's steps).

```
card      name                  scope                 listed  scope-live
SFD-089   Rumble, Scrapper      Mech-scoped                9        0
UNL-077   Soul Shepherd         token-scoped              15       14
OGS-013   Garen, Commander      here-scoped               14       14
OGN-243   Darius, Executioner   here-scoped                5        5
VEN-018   Rage Amplifier        board-wide                 3        3
VEN-130   Aurok General         Empowered-scoped           2        0
UNL-147   Baron Nashor          board-wide                 1        1
```

**`SFD-089 Rumble, Scrapper` is listed nine times and is scope-live zero times.** Not one of the nine
has a Mech in its garrison. And the **one** Plaza entry that does —
`ferrous-forerunner-karthus-mech-plaza`, six Mech tokens — **cannot run him**: he is **Mind** and that
identity is fury+order, so he is correctly absent from the only entry where he would work.

**That is a different defect from Aurok's and the distinction is the point:**

- **Aurok**: scope **missing** and inert → the sentence makes a claim that is **false**.
- **Rumble**: scope **present** and inert → the sentence makes a claim that is **true and empty**.

Both sit under the headline *"THE IDENTITY DOES HOLD AN ANSWER"*, which reads as **three** answers. For
a Recruit garrison it is **two**. **A caveat makes a claim honest; it does not make the card an
answer**, and a reader counting members is being told the identity is better supplied than it is.

`OGS-013` and `OGN-243` are `here`-scoped and live in all 19 listings, for a reason worth stating
rather than leaving to luck: **the scope and the threat have the same footprint.** `OGN-133` reads
*"all units **at battlefields**"* and the Plaza needs its seven **here**, so a grant scoped to one
battlefield covers exactly the bodies the sweep can reach and exactly the bodies the win condition
counts. Nothing at the base is either threatened or counted.

### And the one Soul Shepherd listing that is not live is a third instance of the corrected paragraph

15 listed, 14 live. The exception is **`leblanc-temporary-plaza`**, and my own predicate nearly missed
it: its steps say *"Reflection **copies**"*, and my token test looked for the words Recruit / Bird /
Sprite / Sand Soldier / Mech / token. **Reflections are tokens (187.6) — a seventh vocabulary hole in
this walk, in my own instrument.**

Reading it is worse than the predicate suggested. The board is *"Play Keeper of Masks to the Plaza
three times: each brings two Reflection copies. Ten units."* — `UNL-090 LeBlanc` at M4, **three
`UNL-081 Keeper of Masks` at printed M1**, and **six Reflections at 0 Might** (187.6, with R27 keeping
a copy at 0). Its `notable[5]` is the **pre-repair paragraph** — *"The repairs in the pool are narrow:
`UNL-077 Soul Shepherd` … is the only permanent board-wide token-scoped one and is Mind…"* — and on
this board:

- the six Reflections go **0 → 1**, and 143.2.a still kills them on 1 damage;
- the three Keepers are unit **cards**, not tokens, so the Shepherd never touches them and they stay
  at M1;
- **`OGN-133 Flurry of Blades` kills nine of the ten bodies with or without the Shepherd**, leaving
  LeBlanc alone against a bar of seven.

The identity is mono-Mind with a free slot, so the Shepherd is perfectly **legal** — it simply does
nothing. **This is the third live instance of the paragraph the manager corrected on
`keeper-of-masks-flurry-plaza-window` today** (after `gutter-palace-keeper-time-warp`, §13), and it is
the one where the arithmetic is furthest off, because a Reflection starts at **zero**.

**A one-entry discrepancy in a table of fifteen was worth opening.** It was a hole in my predicate and,
behind the hole, the worst instance of a defect already known.

---

## 21. A scope is safe exactly when it matches the threat — and the base-reacher census is **four, not three**

§19 found `OGS-013 Garen` and `OGN-243 Darius` scope-live in 19 of 19 listings. They are `here`-scoped
(*"Other friendly units have +1 :rb_might: **here**"*), so that result needed a reason rather than
luck, and the reason generalises: **a scoped answer is complete exactly when the threat carries the
same scope.** `OGN-133 Flurry of Blades` reads *"all units **at battlefields**"* and the Plaza counts
its seven **here**, so the grant's footprint, the threat's footprint and the win condition's footprint
are one and the same. Nothing at the base is threatened, protected, or counted.

**Testing the general form meant reading the other nineteen.** Predicate: each of the twenty
multi-body removal cards in `2026-09-13-might-1-survivability.md`, tested for **any** location clause
in its removal instruction — *at battlefields*, *at a battlefield*, *at that battlefield*, *at my
battlefield*, *here*, *in combat*, *to their base* — reminder text stripped, **all twenty printed and
read**.

| the six +Might answers | scope |
|---|---|
| `VEN-018 Rage Amplifier` *"Your units have +1"* | **board-wide** |
| `UNL-077 Soul Shepherd` *"Your token units have +1"* | **board-wide** (token-scoped, not location-scoped) |
| `UNL-147 Baron Nashor` *"Other friendly units have +2"* | **board-wide** |
| `UNL-191 Wuju Master` *"[Level 6] Your units have +1"* | **board-wide** |
| `OGS-013 Garen, Commander` | **here** |
| `OGN-243 Darius, Executioner` | **here** |

**Sixteen of the twenty threats carry a location clause. Four do not — and the seven Ivern notables
say THREE.**

```
UNL-132 Angler Beast  (Chaos, E5 P1 M5)  When you play me, return all units with 2 Might or less…
VEN-133 Glowstone     (Order, E2)        …At the end of your turn, kill this and deal 5 to all units you control.
UNL-180 The Ruination (Order, E9 P3)     Kill all units.
SFD-147 Downwell      (Chaos, E8 P2)     Return all units and gear to their owners' hands.
```

**`VEN-133 Glowstone` is the missing fourth, and it is the cheapest of them by a wide margin — E2
against E5, E8 and E9.** Its full text is *"[Empower] 2 rainbow. Disempower this, :rb_exhaust:: Choose
a player. They gain control of this and recall it. At the end of your turn, kill this and deal 5 to
all units you control."* The route is printed on the card: play it, Empower it, then disempower and
exhaust to **hand it to the opponent**. 053.2 makes a gear say *"this"* and *"your turn"* its
**controller's** turn, so once the Ivern player controls it, the end of **their** turn kills it and
deals 5 to all units **they** control — **with no location clause, so the base-parked tag body dies
with the rest.** The timing works against a Hold line: the body dies at the end of turn N and the
Hold at the start of turn N+1 finds three tags.

**Two honest qualifications, stated rather than left out.** It is **5 damage**, so it is not in the
+Might family's reach at all — no +1 or +2 lifts a token near it, which is why it belongs in the
base-reacher census and nowhere near the repair list. And it costs the opponent a full setup (E2 plus
2 rainbow plus an exhaust, across turns) and sits visibly on the board first.

**The census is still wrong, and a census is the kind of claim this project repairs by naming
members.** The sentence in all seven Ivern notables reads *"THREE carry no location clause of their
own and take the base too"* and names three; the fourth is `VEN-133 Glowstone`.

**And the source is the same table that produced §8's two residuals.** The predecessor's twenty-card
table classifies Glowstone's scope as *"units they control"* while marking the other three
*"everywhere"* — a scope written from the sentence's subject rather than from its **absence of a
location clause**. The table has now been the origin of three separate inherited errors (the
non-existent Birds, the non-existent Sand Soldiers, and this), which is the durable point: **a scope
column is a reading, and a reading belongs in prose where it can be argued with, not in a column
where it is copied.**

### The general rule the Garen result was standing on

| answer scope | complete against | partial against |
|---|---|---|
| **here** (Garen, Darius) | the 16 location-scoped threats, **and only at that battlefield** | anything reaching the base |
| **board-wide** (Rage Amplifier, Soul Shepherd, Baron Nashor, Wuju Master) | everything its Might threshold clears, **wherever the body stands** | — |

**So the eighteen entries that park a Might ≤2 body at base need a BOARD-WIDE +Might, and a
here-scoped one does nothing for them** — and no Ivern notable says so, because the Ivern notables
were written about the base-reaching threats and the Plaza notables about the here-scoped one, and
nobody put the two halves in the same sentence. `data/combos.json` is rc-manager8's; this is a
report.

---

## 22. The thresholdless sweeps — **clean, and clean in the informative direction**

§21's four base-reachers do not share a threshold structure, and that decides whether a +Might answer
means anything at all:

| card | threshold | is +Might meaningful? |
|---|---|---|
| `UNL-132 Angler Beast` | **2 Might or less** | **yes** — this is the one the whole +1 argument is about |
| `VEN-133 Glowstone` | **5 damage** | only far above token range |
| `UNL-180 The Ruination` | *"Kill all units."* — **none** | **no** |
| `SFD-147 Downwell` | *"Return all units and gear…"* — **none** | **no** |

A third thresholdless sweep sits among the sixteen location-scoped ones: `OGN-159 Warwick, Hunter`,
*"kill all **damaged** enemy units here"* — it reads a **damage marker**, not a Might, so no amount of
+Might escapes it either.

**So the Aurok class has a mirror worth checking for: an entry that names a thresholdless sweep and a
+Might answer in the same breath, implying the second reaches the first.** Predicate: notables
containing both. **5,330 notables scanned, 4 hits, all read — and all four are correct.**

They are the four Plaza notables of §1–§2, and the sentence is:

> *"It does NOT escape `UNL-107 Stare Down` …, `OGN-268 Bullet Time` …, or **the two that take
> everything and carry no location clause at all** — `UNL-180 The Ruination` and `SFD-147 Downwell`."*

**They name the thresholdless sweeps precisely in order to say the +1 does not escape them.** That is
the exact opposite of the Aurok sentence, which named a card as an answer that reaches nothing — and
it is the same author, in the same family, on the same day. **The template's failure was never
carelessness about scope in general; it was one member whose scope was not written in.**

`OGN-159 Warwick, Hunter` is named by none of the four. That is an omission rather than a defect: he
is `here`-scoped and needs the bodies damaged first, so he is a two-card combination rather than a
sweep somebody holds up, and none of the four is wrong for leaving him out.

---

## 23. Handoff

**State.** `data/combos.json` was formally handed to me by rc-manager8, five corrections were applied
in place (`f304650`), and **it is handed back**. I hold nothing contended. My files are this document
and `.scratch-kw2/`. `src/*`, `web/*` and `test/*` belong to rc-builder and rc-schema; the working
tree carried their in-flight edits throughout and I touched none of them.

**What was done**, in one line each:

1. §1–§7 — the fifteen notables applied 2026-09-13, audited at the **deployed** sha: five defects,
   all repaired by the manager.
2. §11 — the 383.2.a.1 positional test swept pool-wide: exposure bounded at the seven Ivern notables,
   mirror sweep empty, test spec routed to rc-schema.
3. §12 — the eleven base-parked entries read: **eight owed, not eleven**, three subtractions for three
   different reasons.
4. §13–§18 — the **payoff-removability taxonomy**: unit / gear / battlefield / spell, each with its
   rule, its answer set and its response window. Three rows give the opponent no window at the payoff;
   the spell row's window is guaranteed by 359.3.c.
5. §19–§22 — the Plaza family against the one-damage sweep: **15 of 15 exposed entries answer it**,
   plus the Aurok defect, the Rumble true-and-empty class, and the four-not-three base-reacher census.

**Open, and each is one edit rather than a project:**

- **The base-reacher census in all seven Ivern notables says THREE and is FOUR** (§21). `VEN-133
  Glowstone`, Order, **E2**, the cheapest of the four. One word and one name per entry. **Reported,
  not applied** — the file was already handed back.
- **The eighteen base-parked entries need a BOARD-WIDE +Might and no notable says so** (§21). A
  `here`-scoped grant does nothing for a body at base. This is a sentence, not a list.
- **Two residuals in `2026-09-13-might-1-survivability.md`** (§8): `corina-svellsongur-plaza` given a
  garrison of Birds that do not exist, and `plaza-armory-miss-fortune` one of Sand Soldiers that do
  not. That table is also where §21's scope error came from — **three inherited errors from one
  column**.

**The one instrument note worth carrying.** Seven vocabulary holes were found in predicates in this
walk, **two of them in my own**: `[Deathknell]` has no literal *When* outside its reminder text
(§18); *"As you play me"* is a replacement and not a trigger, 369.1 (§18); Reflections are tokens by
187.6 (§20); the pool writes `while` where 383.2.a.1's examples write `if` (§11); `Equipment` where
the gear sweep wrote `gear` (§13); and a scope word can sit outside any window a regex chooses (§21).
**Every one was found by reading the hits, and the two in my own instruments were found the same way
as the five in other people's.**

---

## 24. The unit row's credential: **the pool holds TWO Reaction-speed single-target answers and neither of them kills**

§18 established that a payoff unit opens no response window when it lands — 0 of 12, because 337.2
resolves a unit immediately and none of the twelve fires a trigger on play. That only matters if the
opponent has some *other* way into a Closed State on your turn. **Measured, they almost do not.**

**Predicate: corpus lines carrying a single-target unit-removal instruction — `kill` / `banish` /
`return` naming *a unit*, or `deal N to … a unit` — split by timing keyword.** (The multi-body sweeps
are the separate twenty-card population of §21.) **937 card rows parsed, 71 hits.**

```
[Reaction]  3   ->  TWO after reading
[Action]   23   ->  ~20 after reading
plain      45       (not individually read; stated as such)
```

**The `[Reaction]` bucket was read in full and one of the three is mine.** `UNL-073 Deadly Flourish`
carries **no `[Reaction]` of its own** — its only one is inside the **parenthesised reminder text of
the Gold token it plays**: *"(It has "[Reaction][>] Kill this, :rb_exhaust:: [Add] rainbow.")"*. My
classifier tested the full string including parentheses. **CLAUDE.md already records this exact trap**
(*"a `spell or ability` sweep catches `UNL-044 Flurry of Feathers` on its [Reaction] REMINDER text"*)
and I walked into it — **the eighth vocabulary hole in this walk, the third in my own instrument.**

**So the honest set is two, and both are Chaos, and NEITHER KILLS:**

```
OGN-169 | Gust        | Chaos | E1    | [Reaction] Return a unit at a battlefield with 3 Might or less to its owner's hand.
UNL-128 | Star-Crossed| Chaos | E3 P1 | [Reaction] Return a friendly unit and an enemy unit to their owners' hands.
```

One is a **bounce gated at Might 3 or less**; the other is a **bounce that is symmetric** and takes
one of the caster's own bodies with it. **There is no unconditional single-target kill at Reaction
speed anywhere in this pool.**

Three of the 23 `[Action]` hits are read out as false positives and named so the number is
reproducible: `OGN-170 Morbid Return` returns a unit **from your trash** (recursion, not removal),
`SFD-200 Arcane Shift` banishes a **friendly** unit and replays it, and `UNL-161 Divining Shells`
matched only because *"Kill **this**"* sits within fifty characters of *"Give **a unit** +2 Might"* —
it is a pump. The remaining ~20 are genuine, and 806.1.c.1 lets them reach a **Showdown on either
player's turn**, which is a real window but one the defender has to be in a combat to open.

### The contrast with §15 is the whole taxonomy in two lines

| payoff | window at the payoff | Reaction-speed answers in the pool |
|---|---|---|
| **spell** | **guaranteed** by 359.3.c | **eleven counters, every one `[Reaction]`** |
| **unit** | **none** (337.2; 0 of 12 fire on play) | **two, both Chaos, neither of which kills** |

**That is a structural credential the 36 unit-payoff finishers hold and none of them states.** A unit
payoff has to be answered on the opponent's own turn — a full turn ahead and telegraphed, exactly as
§1's Ivern notables describe for base removal — or inside a Showdown with an `[Action]`, which the
defender must first be in a combat to have. The spell row is the opposite in every cell.

**And it explains, rather than criticising, why the catalogue's threat discussions read as they do:**
the entries talk about **sweeps** (`OGN-133` and the twenty) and about **gear removal** (§13) because
those are the answers that exist. Single-target removal at Reaction speed is not a thing an opponent
holds in this format, and the catalogue's silence about it is correct.

---

## 25. Correcting my own §15, and the one card that answers the window

**§15 said *"11 finishers have a spell in a `payoff` role, and NONE of them contains the word
`counter`."* That was true at the sha it was measured against (`1f12d61`) and is now false: six of the
eleven contain it.** The cause is not drift by another lane — **it is §15's own finding being
applied.** The six are exactly the Time Warp family, and the notable they now carry is the §15
argument in its own words, crediting #200. **A count of entries is perishable, and this one was made
perishable by the repair it asked for**; it is corrected here rather than left standing, per the
standing rule that the durable half is the rule and never the count.

**What the correction exposed is the useful part: the repair reached the six Time Warp lines and not
the other five.** Those five carry a spell payoff that is not `OGN-122`, and were outside the
application:

```
arise-sand-soldiers-plaza            SFD-198 Arise!              E6 + 1 Power
lady-luminosity-loop-comet           OGN-085 Falling Comet       E5
desert-call-vi-sand-soldier-plaza    SFD-031 Desert's Call       E2
yasuo-windrider-ride-the-wind-chain  OGN-173 Ride the Wind       E2 + 1 Power
keeper-of-masks-flurry-plaza-window  UNL-044 Flurry of Feathers  E4 + 2 Power
```

All five now carry it (`1e75d4e`, under rc-manager8's handover).

### The pool holds exactly ONE answer to the window, and it is mono-Mind

**Predicate: corpus lines containing `can't be countered` or `cannot be countered`. Two hits, both
read.**

```
VEN-015 | Decree of Rage        | Fury | E1 P1 | [Action] This can't be countered. Deal 4 to an enemy Calm unit.
VEN-069 | Mel, Newly Awakened   | Mind | E4 P1 M4 | …[Empower] :rb_energy_3:  [Empowered][>] Your spells and abilities can't be countered…
```

`VEN-015` protects **only itself**. **`VEN-069 Mel, Newly Awakened` is the only card in the pool that
makes your OTHER spells uncounterable, and she is mono-Mind** — with 441.2 making Empowered *"a state
for Game Objects on the board"*, so once armed (E4 + 1 Power for the body, then `[Empower]` E3) it is
permanent.

**And mono-Mind is the perfect fit for the row's dominant member by construction**: `OGN-122 Time
Warp` is Mind, so 103.1.b forces Mind into the identity of every Time Warp line, and Mel is therefore
**always legal beside it**. Of the five non-Time-Warp payoffs she is legal in two —
`lady-luminosity-loop-comet` (mind/order) and `keeper-of-masks-flurry-plaza-window` (mind/calm) — and
103.1.b keeps her out of the other three, **which therefore have no counter-proofing available at
all**. Each of the five now says which case it is.

### The chain closes, and the cheapest payoffs are the worst off

| link | members |
|---|---|
| a spell payoff gets a window | **guaranteed**, 359.3.c |
| answers to it | **11 counters, every one `[Reaction]`; Calm prints five** |
| protection from those | **one card**, `VEN-069 Mel`, mono-Mind |
| answer to the protection | she is a Might-4 unit, and per §24 the pool's only Reaction-speed answers are two bounces — `OGN-169 Gust` is gated at Might 3 or less and cannot reach her, leaving `UNL-128 Star-Crossed` (Chaos, E3 P1, symmetric) |

**And size is protection here, which inverts the usual reading.** `OGN-045 Defy` (≤4 Energy and ≤1
rainbow) and `VEN-152 Rebuttal` (≤4 Energy) are priced out by `SFD-198 Arise!` at E6 and `OGN-085
Falling Comet` at E5 — while the three cheap payoffs sit inside Rebuttal's range, and **Rebuttal is
not a counter against them**: *"You may pay :rb_rune_rainbow:. If you do, **gain control of it and you
may make new choices for it.** Otherwise, counter it."* Against `Desert's Call`, `Ride the Wind` and
`Flurry of Feathers` the opponent does not have to deny the line — **they can take it**, which against
`keeper-of-masks-flurry-plaza-window` means taking the four Birds the whole win condition is counting.

---

## 26. The protection layer is answerable a turn ahead, and the reason is **one point of Might**

§25 left `VEN-069 Mel` as the pool's only counter-proofing, a **Might-4 unit**, and §24 established
that the pool's only Reaction-speed single-target answers are two bounces — `OGN-169 Gust`, gated at
**Might 3 or less**, and `UNL-128 Star-Crossed`, symmetric. **Mel sits one point above Gust's gate.**
That looked like a coincidence about one card. It is not.

**Predicate: the protection layer swept as four families, each with its own predicate so each number
carries its own, reminder text NOT stripped, every hit printed and read. 937 card rows, 18 hits.**

```
would-die replacement  ("would die … instead")     6
Prevent                (the word "prevent")        4
untargetable           ("can't be chosen")         6
counter-proof          ("can't be countered")      2
```

**Split by card type, the layer is 8 spells, 2 gear, and 8 units — and every one of the eight units
is Might 4 or more.**

```
SFD-173 Soraka, Wanderer          M4    VEN-038 Akali, Silent          M4
VEN-069 Mel, Newly Awakened       M4    VEN-025 Esteemed Hierophant    M5
SFD-105 Ruin Runner               M5    UNL-057 Alpha Wildclaw         M7
UNL-059 Master Yi, Unstoppable    M12   UNL-147 Baron Nashor           M12
```

**The floor is exactly 4 and Gust's ceiling is exactly 3.** `OGN-169 Gust` — the pool's only cheap
Reaction-speed single-target answer, Chaos at **E1** — reaches **none of the eight**. What is left is
`UNL-128 Star-Crossed` (Chaos, E3 P1), which returns *"a friendly unit **and** an enemy unit"*, so
answering a protector at Reaction speed costs the answerer one of their own bodies.

**So the three shapes of protector are answered in three different windows, and only one of them is
answerable while it matters:**

| protector shape | members | when it can be answered |
|---|---|---|
| **spell** (8) | Highlander, Smite, Tactical Retreat, Unyielding Spirit, Counter Strike, Ki Barrier, Twilight Shroud, Decree of Rage | **in its own window** — 359.3.c, by any of the 11 counters |
| **gear** (2) | `OGN-077 Zhonya's Hourglass` (not an Equipment), `SFD-051 Guardian Angel` (Equipment) | by the 15 gear answers — of which only `SFD-011 Angle Shot` is `[Reaction]` and it is a **detach**, so it reaches the Guardian Angel and **not** the Hourglass |
| **unit** (8) | the eight above, **minimum Might 4** | **on the opponent's own turn**, or by a symmetric bounce |

**That is a structural fact about the format rather than an observation about a card.** A protector
that is a unit is a standing, durable one — it is on the board before the moment it protects — and the
format gives the attacker no cheap way to remove it in that moment. The designers put the only cheap
Reaction-speed answer at a ceiling of 3 and every unit-shaped protector at a floor of 4.

**Read the other way it is a warning for this catalogue.** Eight of the eighteen protectors are
spells, and §15 established that a spell is the one thing the process stops for. **A protection plan
built on a spell is answerable in the very window it was bought for; a protection plan built on a
Might-4-or-more unit is not.** Of the two that matter most to this catalogue's finishers, `VEN-069
Mel` (counter-proofing, §25) and `SFD-173 Soraka` (a would-die replacement for smaller bodies) are
**both units at Might 4** — which is the good shape, and neither is named by any entry as a
protection plan.

**Two readings kept honest.** Four of the six *"can't be chosen"* hits protect only **themselves**
(`SFD-105 Ruin Runner`, `VEN-038 Akali, Silent`, `UNL-059 Master Yi` at `[Level 16]`, `UNL-147 Baron
Nashor`) — they are protectors of a *body*, not of a *plan*. The two that reach other bodies are
`UNL-057 Alpha Wildclaw` (*"Your units here with less Might than me can't be chosen"*, M7 — so his own
Might is the cap on what he covers) and `VEN-031 Twilight Shroud`, a **spell**. The Might floor of 4
holds across all eight either way, which is why the structural claim is made over the whole set and
the reach distinction is stated separately.

---

## 27. Two corrections to my own work, and the two entries they point at

### (a) The hypothesis was wrong: the catalogue documents protection thoroughly

I expected §26 to show that this catalogue *"documents what kills its lines exhaustively and what
saves them not at all."* **Measured, that is false.** Predicate: entries naming any of the eighteen
protectors — **129 of 766**, 29 as a `uses` component and 112 in prose, and **every one of the
eighteen is named somewhere**.

**But the mentions are of a different kind than I was looking for, and that is the real result.**
Narrowing to a protector named inside a sentence carrying protective framing (*protect / save /
survive / shield / insurance / keeps it alive / answers this*) gives **17 of 196 prose mentions, all
read**, and almost every one is the protector as a **MECHANISM** — how 808.1.d.1 removes a Deathknell
from the chain, how 455's recall switches off a *"while I'm at a battlefield"* clause, how Soraka's
one application orders against a Guardian Angel attached to her. Those sit in entries whose **subject
is the shield**.

**Exactly two offer a protector as a PLAN to a line that needs one**, and the second is the negative
form done right:

- `ahri-trinity-svellsongur-hold`: *"`SFD-051 Guardian Angel` (Calm, 2 Energy) is **the insurance
  inside the identity**"*
- `keeper-of-masks-flurry-plaza-window`: *"Prevent (four cards pool-wide — `OGN-145 Unyielding Spirit`
  would answer it outright and is **Body**, one domain away)"* — a plan named **and refused on
  domain**

**So the honest statement is narrower and more useful than the one I set out to make: the catalogue
knows the protection rules extremely well and rarely offers a protector as a plan.** Two of 766.

### (b) My §15 population was narrower than the rule, and it points at two entries

§15 measured *"finishers with a **spell in a `payoff` role**"* — **eleven**. **359.3.c does not know
about roles**: *"Other players have an opportunity to play Reactions before the resolution of
spells."* The honest population is **every finisher carrying a spell anywhere in its line — 39 of
80** — and only **12 of the 39** cite 359.3.c.

**That is not 27 defects, and the cost band is why.** 425.1.c makes a counter cost exactly what was
paid, so the exposure is the size of the spell:

```
most expensive spell in the line     entries   cite 359.3.c
  E8+                                     9          7
  E5-7                                    5          2
  E3-4                                    7          2
  E1-2                                   18          1
```

**An E1–E2 spell countered costs a card, not a game**, so the eighteen uncited entries in that band
are not owed the sentence. **The E8+ band is where it matters, and it is nine entries which are ALL
`OGN-122 Time Warp` at E10 + 4 Power** — the single most expensive spell any finisher in this
catalogue casts, and all of it spent before the counter resolves.

**Seven of the nine cite it. Two do not, and both carry Time Warp at role `enabler`:**

```
gutter-palace-keeper-time-warp   OGN-122 Time Warp (E10 P4)  role=enabler
grand-plaza-loop-time-warp       OGN-122 Time Warp (E10 P4)  role=enabler
```

**My `role: payoff` filter is exactly why they were missed** — the fourth time in this walk a
predicate of mine has been narrower than the rule it was testing. Both are ALT_WIN lines whose whole
plan is the extra turn: counter the Time Warp and there is no extra turn, the win check never
arrives, and 425.1.c refunds none of the E10 + 4 Power.

**And `gutter-palace-keeper-time-warp` is now the most under-defended finisher this walk has found**:
§13 showed it names no gear answer while its win condition **is** a gear (`UNL-088`, answerable for
E1 + 1 Fury Power), and it also does not name the counter window on the E10 + 4 Power enabler that
buys it the turn. Two independent single-card answers, neither stated. `grand-plaza-loop-time-warp`
has the milder version: its win condition is a **battlefield** and therefore unremovable (§14, §17),
so the Time Warp is its only counterable link — but it is a big one.

**Reported, not applied:** `data/combos.json` was handed back to rc-manager8 before this measurement.

---

## 28. The three finishers that say nothing — walked, and the silence is **half defensible**

rc-builder measured that of the 80 finishers, 61 name a specific answer card, 16 speak of answers
without naming one, and **three say nothing at all**. rc-manager8 routed them here because the
question is a walk rather than a measurement, and because §13–§27 already hold both halves: **what can
remove each payoff, in which window, and whether a domain-legal protector exists.** rc-builder's
caveat is carried intact — *"no unanswered hole"* and *"no stated point of failure"* are different
things, and #200's sweep separately reports zero unanswered holes across the class.

| | class | identity | payoff | Might | spell it spends each pass |
|---|---|---|---|---:|---|
| `renata-mastermind-points` | INFINITE | mind/order | `SFD-088` Renata Glasc, Mastermind | **5** (M4 + `SFD-166 Rally the Troops`, 703 makes a buff exactly +1) | `OGN-104 Retreat`, **E1** |
| `jayce-mesmerize-renata` | INFINITE | mind | `SFD-088` Renata Glasc, Mastermind | **4** | `VEN-052 Mesmerize`, **E1 + 1 Power** |
| `swain-double-conquer` | CHAIN | mind | `VEN-065` Swain, Visionary ×3 | **6** | `OGN-104 Retreat`, **E1** |

### Half the silence is right, and §24 and §26 say why

**Every one of the three payoffs is a unit above `OGN-169 Gust`'s ceiling.** Gust — the pool's only
cheap Reaction-speed single-target answer, Chaos at E1 — is gated at **Might 3 or less**, and these
are 4, 5 and 6. **Renata at M4 misses it by exactly one point**, which is the same one-point margin
§26 found across the whole protection layer. The only other Reaction-speed single-target answer in
the pool is `UNL-128 Star-Crossed` (Chaos, E3 P1), which returns *"a friendly unit **and** an enemy
unit"* — so answering any of the three in the window costs the answerer one of their own bodies.

**And the two Renata lines never leave the Main Phase**, so the ~20 `[Action]` removals cannot reach
them either: 806.1.c.1 admits an Action *"on your turn or in showdowns"*, and these loops open
neither a combat nor a showdown. **Their board answer has to be found on the opponent's own turn, a
full turn ahead and fully telegraphed** — which is exactly the shape §1's Ivern notables describe for
base removal, and it is a credential rather than a gap.

`swain-double-conquer` is the exception and its entry does not say so: **it conquers two battlefields,
so it opens a Showdown at each** — and 806.1.c.1 puts every `[Action]` removal inside that window.
`OGS-012 Blast of Power` (Order, E6 + 1 Power, *"[Action] Kill a unit at a battlefield"*) reaches a
Might-6 Swain there; `OGN-229 Vengeance` (Order, E4 + 2 Power, *"Kill a unit."*) does the same on the
opponent's own turn. **Three Swains means three answers needed**, which is the real reason the line is
robust — and stating that is different from stating nothing.

### The other half is not right: all three are silent about the one window the rules guarantee

**Each pass spends a spell, and §15 established that a spell is the one payoff class the process
stops for** — 359.3.c, *"Other players have an opportunity to play Reactions before the resolution of
spells."* None of the three cites it. The exposure is small in Energy (425.1.c refunds E1, or E1 + 1
Power) and **is not small in consequence for a loop**, because `renata-mastermind-points`'s own
`notable[3]` says each pass spends one `Retreat`, 103.2.b caps it at three copies, and the spare Forge
recycle slot is what brings it back.

**And the counter-choice matters in a way worth printing**: a countered card goes to the trash
(425.1.b makes it not-played), where the Forge can recycle it — **so `UNL-131 Abandon`, which returns
a countered spell *"to its owner's hand instead of putting it in their trash"*, is the WRONG counter
to use against these loops**, since it hands the card straight back. Any of the other ten is better.

**`VEN-069 Mel, Newly Awakened` closes that window and is legal in all three.** She is **mono-Mind**
(§25), and all three identities contain Mind — `renata-mastermind-points` is mind/order,
`jayce-mesmerize-renata` and `swain-double-conquer` are mono-Mind with a free slot. E4 + 1 Power for
the body, `[Empower]` E3 to arm it, and 441.2 makes Empowered permanent. **She is a Might-4 unit**, so
by the paragraph above she is herself above Gust's ceiling and answerable only on the opponent's own
turn.

### The verdict

**Two of the three are silent about board answers for a defensible reason and silent about the spell
window for none.** `swain-double-conquer` is additionally silent about the Showdown its own Conquers
open, which is the one place an `[Action]` removal reaches a Might-6 body. Whether any of the three
*needs* the sentence is the entry author's call; what this walk can say is **what the sentence would
be**, and for all three it is the same one: *the loop's only guaranteed window is the spell it spends,
and the pool's one answer to that window is mono-Mind and therefore always legal here.*

---

## 29. The "speaks of answers without naming one" population — **a predicate disagreement, and a card that funds the opponent**

rc-builder measured **16** finishers that speak of removal or answers without naming one. **My
predicate returns 1**, and I am reporting the disagreement rather than asserting mine is better,
because in this project a number that looks like a contradiction is a **predicate question first**.

**Mine, stated:** a finisher whose text (notables + `uses` notes + steps + `terminatesIn`) uses
answer-language — *removal / answers it / sweep / counter / dies to / bounce / point of failure* —
**and names no card outside its own `uses`, by base code OR by a card name of six characters or more
from `cards.json`**. **77 of 80 use answer-language at all; 1 names no card.** rc-builder's predicate
is presumably narrower on what counts as *naming* or wider on what counts as *answer-language*;
**their 16 and my 1 are both measurements and the gap is in the definition, not in the catalogue.**

**And the one hit is not a gap.** `threshold-reveler-infinite-energy` carries **eight** notables and is
one of the most careful entries I have opened: it pins the exact defender requirement (*"EXACTLY ONE
ENEMY DEFENDER, OF 4+ MIGHT"*, with the 465.2.c arithmetic), refuses its own cheaper `[Hidden]` route
with 811.1.b and 811.1.d.2, and **corrects a paragraph that was applied uniformly to all fourteen
INFINITEs**. It names no answer **card** because its exposure is board state and the opponent's
resources, not a removal spell. **A predicate looking for a named card cannot see an entry whose
exposure is not a card.**

### Its `notable[4]` opens a question nobody had asked, and the sweep is small

> *"THE BATTLEFIELD PAYS THE OPPONENT TOO, AND NO SOURCE WEIGHS IT. 'the attacker and defender each
> [Add] 1 Energy' is symmetric, so the loop floats the opponent unbounded Energy during your turn."*

**Predicate: corpus lines giving a resource, a card or a body to BOTH players. Seven hits, all read.**
Two are banned in both formats (`OGN-284 Obelisk of Power`, `OGN-290 The Arena's Greatest`), leaving
**five live**, of which **two are colourless battlefields** — things you *bring*, so their symmetry is
a standing property of the board rather than a one-shot:

```
OGN-071 Party Favors        Calm        each player draws or channels     used by 0 entries
OGN-201 Invert Timelines    Chaos       Each player discards their hand, then draws 4.   1 entry
SFD-219 The Papertree       Colourless  when you hold here, each player channels 1       1 entry
VEN-111 Minah Swiftfoot     Chaos       each player discards 1 / draws 1                 1 entry
VEN-166 Threshold of the Gray Colourless when combat starts here, attacker and defender each [Add] 1   1 entry
```

**Only `VEN-166` compounds inside a loop**, because its trigger is *"when combat starts here"* and the
loop opens a combat **every pass**, while the Papertree's is *"when you hold here"* — once a turn.
**So the catalogue's one entry whose own engine funds its opponent without bound is the one that says
so.** That is the entry being right, not a defect.

### The other one does not say so, and it is the same entry as §13, §20 and §27

**`gutter-palace-keeper-time-warp` runs `OGN-201 Invert Timelines`**, and its step 4 reads *"Play
Invert Timelines (3 Energy + 1 Power): **discard your hand, draw 4**. Hand is now exactly 4."* — **its
own half only.** The card reads *"**Each player** discards their hand, then draws 4."*

**The opponent is refilled to four fresh cards by this line's own enabler.** They get no turn — the
Time Warp sees to that — but 312.2.c hands them priority in every Closed State the combo opens on your
own turn, so **four fresh cards are four fresh chances to be holding a `[Reaction]`**, including any
of the eleven counters aimed at the E10 + 4 Power Time Warp (§27) or `SFD-005 Detonate` at E1 + 1 Fury
Power aimed at the Gutter Palace itself (§13). **The line hands the opponent the hand it will be
answered from.**

That is the **fourth** unstated exposure this walk has found on one entry — no gear answer for a win
condition that is a gear (§13); the pre-repair Flurry paragraph, since corrected (§20); no counter
note on its E10 + 4 Power enabler (§27); and now an enabler that arms the opponent. **Each was found
by a different sweep, which is the argument for running several.**

---

## 30. A loop's interactability is the number of spells in its pass, and it ranges **0 to 4**

§28 established that a loop running inside its controller's own Main Phase gives the opponent no
board window — 806.1.c.1 keeps `[Action]` removal out, and §24's two Reaction-speed answers are a
Might-3-capped bounce and a symmetric one. **So the opponent's windows are the ones the loop opens
itself**, and 359.3.c guarantees one before every spell.

**Predicate: the spells in each INFINITE's `uses` — a FLOOR on the guaranteed windows a pass opens,
not a count**, because a triggered ability also creates a Closed State (401.1) and those are not
counted here.

```
4  gemdragon-henge-vi-blind-fury     Dancing Grenade E2P1 | Detonate E1P1 | Show of Strength E2P1 | Confront E2
3  jhin-virtuoso-ekko-malzahar-vi    Upstage Comedy E2 | Consult the Past E4 | Progress Day E6P1
3  lady-luminosity-loop-comet        Falling Comet E5 | Shadow's Call E2 | Sacrifice E1
2  lux-infinite-energy · renata-mastermind-points · garen-fiora-malzahar-facebreaker-recruits
1  seven entries
0  pursuer-herald-recruits
```

**`pursuer-herald-recruits` is the only INFINITE that opens no guaranteed window at all.** Its three
`uses` are two units and a gear (`OGN-177`, `SFD-171`, `SFD-153`), and 337.2 resolves every one of
them immediately — *"If, after finalizing the Chain Item, that item is a Unit, Gear, or an ability
that Adds resources, it resolves immediately."* **And it is the one INFINITE legality drops at match
time**, because `OGN-177 Stealthy Pursuer` is banned — CLAUDE.md already records that. **The least
interactable loop in the catalogue is the one nobody can bring.**

**At the other end, `gemdragon-henge-vi-blind-fury` opens four**, and its own steps make all four
load-bearing — Dancing Grenade kills the six Dragons, Detonate kills the Henge, Show of Strength draws
the deck, Confront draws it back. **Countering any one of the four breaks the pass.**

**And that inverts §16.** That loop is one of the four whose gear engine carries **no Equipment tag**,
so `SFD-011 Angle Shot` — the only Reaction-speed gear answer — cannot touch its `SFD-117 Ancient
Henge` at all, and every other gear answer has to be cast on the opponent's own turn. **The loop that
is hardest to answer on the BOARD is the easiest to answer on the CHAIN**, and the two facts are
measured by different sweeps that happen to meet on one entry.

**The general shape, stated once:** an INFINITE's board exposure and its chain exposure move
independently. `pursuer-herald-recruits` has neither and is banned; `gemdragon-henge-vi-blind-fury`
has a hard board and a soft chain; the seven at one spell per pass are the ordinary case, and a single
held counter costs them one pass rather than the loop — which is why §28's Abandon point matters
(425.1.b sends the countered card to the trash, where a Forge recycles it, so the counter buys a pass
and not a win).

---

## 31. Handoff — current, and supersedes §23

**Files.** `data/combos.json` was handed to me twice by rc-manager8 and **handed back both times**; I
hold nothing contended. Mine are this document and `.scratch-kw2/`. `src/*`, `web/*` and `test/*`
belong to rc-builder and rc-schema — the shared tree carried their in-flight edits throughout (a red
`src/build.ts` and a red `src/synergies.ts`, both theirs, both cleared on their own) and I touched
none of them.

**Applied to `data/combos.json`, all verified and pushed:** `f304650` five notable corrections
(two Aurok scope, one pre-repair Flurry paragraph, two rotted BURST censuses); `4cf38ca` the
base-reacher census three→four plus the board-wide-versus-here sentence on all seven Ivern notables;
`1e75d4e` the spell window on five non-Time-Warp spell payoffs; `17a5dc3` the credential-plus-gap
sentence on the three silent finishers and the two uncited Time Warp enablers. **Seventeen notables
touched in total, every batch asserted structurally** — entry count, id order, notable counts matching
the shape of the edit, and nothing outside `prerequisites.notable`.

**The three things a successor should know before reading anything else.**

1. **The payoff-removability taxonomy (§13–§18) is the frame everything after it uses.** Four rows —
   unit, gear, battlefield, spell — each with what removes it, from where, and **in which window**.
   Three rows give the opponent no window at the payoff; the spell row's window is guaranteed by
   359.3.c. Most of §19–§30 is that table applied to a population.
2. **Predicates here overstate, and mine did eight times.** Every one was found by reading the hits.
   The eight, so a successor does not re-find them: `[Deathknell]` has no literal *When* outside its
   reminder; *"As you play me"* is a replacement, not a trigger (369.1); Reflections are tokens
   (187.6); the pool writes `while` where 383.2.a.1's examples write `if`; the gear sweep must say
   `Equipment` too; a scope word can sit outside any regex window; a `[Reaction]` can be in a token's
   **reminder text** (`UNL-073`); and a `role: payoff` filter is narrower than a rule that does not
   know about roles.
3. **I corrected my own published work four times** — a token-vocabulary hole (§20), a perishable
   count in §15 (§25), a population that was narrower than its rule (§27b), and a hypothesis that the
   measurement refuted outright (§27a). **Three of the four were more useful than the original
   claim.** Plus three separate batches of #202 emphasis-inside-quotation defects in text I was about
   to commit, which is why the last step before every commit is now a scan for it.

**Open, each one edit rather than a project.**

- **Two residuals in `2026-09-13-might-1-survivability.md`** (§8, §21): a garrison of Birds that do
  not exist in `corina-svellsongur-plaza`, one of Sand Soldiers that do not in
  `plaza-armory-miss-fortune`, and a scope column that classified `VEN-133 Glowstone` from its
  sentence's subject rather than from its absence of a location clause. **One table, three inherited
  errors.**
- **The `16 vs 1` predicate disagreement** with rc-builder (§29) is unresolved and needs their
  predicate, not a rematch of mine.
- **`SFD-089 Rumble, Scrapper` is listed as an answer in nine Plaza notables and is scope-live in
  zero** (§20). True and empty rather than false, so it is a clarity edit and not a defect — but the
  sentence reads as three answers where it is two.

**The one sentence.** **A caveat makes a claim honest; it does not make the card an answer** — and its
mirror, found the same day: **a scope is safe exactly when it matches the threat.** Between them they
account for every defect in this walk that a checker could not see.
