# The Tournament Rules, surveyed — rc-walk-mid, from 2026-09-12

`data/Riftbound-Tournament-Rules-2026-07-16.txt` is a separate numbering space from the Core Rules and
the only genuinely unsurveyed vein left in this project. This document is the survey.

**Every citation in this document is labelled TOURNAMENT RULES, at every site.** 52 paragraph numbers
exist in both books and `test/rule-refs.test.ts` accepts either, so it cannot disambiguate: a bare
`703.3.a` in an entry is ambiguous to the test and to every future reader.

## 1. The shape of the book, measured

Measured 2026-09-12 at catalogue 766, with the `^[[:space:]]*` anchor (the file has 50 form feeds and 56
headings a bare `^` cannot see; it has **zero** U+200B, so the invisible-character trap §202 found is
Core-Rules-only):

- **936 headings**, of which **790 do not exist in the Core Rules at all.**
- **19 of the 790 are cited** in `data/combos.json` plus `data/synergies.json`.

| section | headings | cited | |
|---|---|---|---|
| 500 Communication | 1 | 1 | |
| 501 Requirements | 6 | 1 | |
| **502 Information** | **24** | **0** | |
| **503 Shortcuts** | 14 | 5 | |
| **504 Sequencing** | **8** | **0** | |
| **505 Loops** | **16** | **3** | governs the INFINITE class |
| **506 Triggered Abilities** | **22** | **0** | |
| 507 Teams in Separate Matches | 3 | 0 | |
| 508 Layout | 11 | 0 | |
| **509 Gameplay Decisions** | **15** | **0** | |
| **601 Constructed** | **31** | **0** | `checkBuild` scores three of them from `src/`, not from the data |
| 602 Limited | 93 | 0 | no Limited format is modelled here |
| 603 2v2 | 18 | 1 | |
| 604 Event and Round Time Limits | 4 | 1 | |
| **701 General** | **61** | **0** | |
| 702 Game Play Errors | 99 | 4 | |
| 703 Tournament Errors | 82 | 3 | |
| 704 Unsporting Conduct | 43 | 0 | |
| 705 Disciplinary Code | 39 | 0 | |
| 104, 201–205, 301–306, 401–424 | 246 | 0 | administrative; see §5 |

---

# Batch 1 — section 505 is two-sixteenths read, and the unread half says what an INFINITE does at a table

No entry. The block that governs this catalogue's whole INFINITE class has **sixteen paragraphs and two
of them are cited** — TOURNAMENT RULES 505.2 and 505.9, added uniformly to all fourteen INFINITEs by
#191 batch 27. **505.1, 505.3, 505.3.a, 505.3.b, 505.3.c, 505.4, 505.5, 505.6, 505.7, 505.8 and 505.10
are cited zero times anywhere in the project** — data, `src/`, the walk records and CLAUDE.md.

## 2. TOURNAMENT RULES 505.6 — A LOOP NOBODY MAINTAINS IS A DRAW

> **TOURNAMENT RULES 505.3.** To decide how to proceed with a loop, determine how many players are
> needed to maintain it (who must take actions or make decisions to sustain the loop):
> **505.3.a.** No players
> **505.3.b.** One player
> **505.3.c.** Two or more players
> **505.6.** If no player chooses to break the loop and there were no maintaining players, **the game
> ends in a draw.**

That is the INFINITE class's real hazard and nothing in this project names it. An infinite loop is not
automatically a win, and it is not automatically anything: **a loop with no maintaining player, which
nobody can or will break, ends the game in a draw** — a result that is worse than not having the loop,
because it also spends the round.

**None of our fourteen is exposed, and the reason is a credential rather than an accident.** Read off
their own `steps` arrays rather than assumed: every one of the fourteen is sustained by its controller's
own plays, activations, Standard Moves and payments — `lux-infinite-energy` opens *"Activate Forge of
the Future (Kill this)"*, `renata-bubble-bot-ready` opens *"Renata: pay 4 Energy + 4 Mind Power and
exhaust"*, `jhin-fiora-facebreaker-recall` opens with a Standard Move. **All fourteen are 505.3.b, one
maintaining player**, so 505.4 applies and 505.6 cannot. The class is safe because every member of it is
something a player *does*, and that sentence is worth having in the entries rather than inferring it
fourteen times.

The shape to refuse on sight, now that the rule is named: **a loop whose iterations require no decision
from anybody** — two mandatory triggers feeding each other with no cost and no *"may"*. The Core Rules'
own mandatory repeat, 431.3.a's burn-out cascade, is not one of these, because it terminates itself in a
win rather than running forever.

## 3. 505.4, 505.5, 505.7 AND 505.8 — AN INFINITE IS A NEGOTIATION, NOT AN INSTANT WIN

> **TOURNAMENT RULES 505.4.** For each maintaining player (if any), in turn order, that player chooses a
> number of iterations.
> **505.5.** Each other player (if any), in turn order, may choose to agree to that number or choose a
> number of iterations after which they commit to taking action to break the loop or choose not to break
> the loop.
> **505.7.** Otherwise, the loop continues until the lowest number of iterations chosen, then that player
> either gains priority (if a maintaining player) or breaks the loop.
> **505.8.** If a player intervenes to break a loop, they may choose to interrupt a partially completed
> iteration.

This is the procedure every INFINITE in the catalogue actually resolves by, and no entry describes it.
**You name N; the opponent names the M at which they commit to breaking; the loop runs to the lower of
the two.** So the honest question about an INFINITE at a table is not *"is it unbounded"* but **"what has
it produced by the opponent's break point"** — and the entries that answer that already, by pricing a
per-pass ledger, are answering the right question without citing the rule that makes it the question.

**Where no opponent can break it, N is yours and the loop is genuinely unbounded** — which is why
`pursuer-herald-recruits` and the rest can claim what they claim, and why the #200 adversarial pass's
question (what is the cheapest card that beats this) is the same question 505.5 asks.

**505.8 has a sharper edge, and it lands on this project's own loop ledgers.** A breaking player may
**interrupt a partially completed iteration** — so the final pass can be cut mid-way. CLAUDE.md records
that the Lux engine runs with *"ZERO spare draws"* and that the four draws and the four recycled cards
*"are balanced on purpose"*; a pass cut between the draw and the recycle is a pass that does not balance.
The ledgers are per-pass and 505.8 says the last pass may not complete, which is worth one line wherever
a loop's ledger closes only at the end of a pass.

**505.10** extends all of this to loops maintained by *decisions* rather than actions, and **505.11**
makes judges the final arbiter *"of what constitutes a loop, or if choices are available to continue a
loop when secret information is involved"* — which is the paragraph for any loop that runs with cards in
hand. **505.12** is the one with teeth in the other direction: a player who tries *"to opt-out of
shortcutting or propose incorrect shortcutting to use up time"* is **cheating**, cross-referenced to
TOURNAMENT RULES 704.8.

## 4. 505.2 READ AGAINST A TWO-PASS BOARD, WHICH THIS CATALOGUE HAS

> **TOURNAMENT RULES 505.2.** Players performing a loop must have each iteration of the loop be identical
> with no conditional actions.

Cited fourteen times, always for the same purpose — that our loops *may* be shortcut. The consequence
nobody has drawn is what happens when one board runs **two different passes**. `lady-luminosity-loop-comet`
says so in its own words, distinguishing *"the verified Energy pass"* that balances 4 = 4 from its own
Comet pass that closes 5 = 5, and CLAUDE.md records `lux-infinite-power` as *"a second, different pass"*
on the same engine.

Under 505.2 **each pass type is its own loop and the alternation is not one**: you may shortcut "N Energy
passes" and you may shortcut "N Comet passes", and you may not declare N iterations of a mixture, because
those iterations are not identical. That does not refute any entry — it says how the board is executed at
a table, and with 604's round time limit it is the difference between announcing two numbers and
performing an alternation by hand.

## 5. What this batch did NOT open, with the reason

- **502 Information (24), 504 Sequencing (8), 506 Triggered Abilities (22), 509 Gameplay Decisions (15)**
  — the rest of section 500, unopened and queued next; 506 in particular is 22 paragraphs about triggers
  in a project that cites Core Rules 383 in hundreds of places.
- **602 Limited (93 headings, 0 cited)** — **REFUSED for the whole project, permanently.** This catalogue
  models Constructed and 2v2 only: `data/legality.json` is format-scoped to those two, `checkBuild`
  scores Constructed deck construction, and no entry references a Limited pool. 93 headings that can
  never bear on a combo.
- **104, 201–205, 301–306, 401–424 (246 headings, 0 cited)** — administrative, and a spot read of 401
  Deck Registration, 411 Deck Checks, 414 Dropping and 417 Electronic Devices confirms they govern the
  event rather than the game. **Four exceptions are queued rather than refused**, because they touch
  things the catalogue models: **402 Deck Size**, **403 Sideboard** (whose 601.1.c siblings `checkBuild`
  already scores), **406 Start of Game Procedure** and **407 Play First Rule** (the turn-clock model
  prices the first turn from Core Rules 485.7 and has never read this book's version), and **415
  Tracking Score & Resources**.

## 6. Validation

Quotes checked from an explicit list against `data/Riftbound-Tournament-Rules-2026-07-16.txt` with the
form-feed-safe anchor: 12 passages, zero failures. The section census, the 936/790/19 counts and the
per-section table were run in the turn they were written, over `data/combos.json`, `data/synergies.json`,
`src/`, `test/`, the walk records and CLAUDE.md. The fourteen INFINITE `steps` arrays were read rather
than sampled. No entry staged; `data/combos.json` not written.
