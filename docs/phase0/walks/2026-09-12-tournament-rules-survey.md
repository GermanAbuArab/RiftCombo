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

---

# Batch 2 — 506 is 22 paragraphs about triggers, cited by nothing, and one of them corroborates a reading we VOTED

No entry. **TOURNAMENT RULES section 506 is cited by zero entries**, in a project that cites Core Rules
383 in hundreds of places. It is not a restatement of 383: it governs what happens when a trigger is
not announced, and two of its paragraphs reprice things this catalogue already ships.

## 7. TOURNAMENT RULES 506.5 — FORGETTING A ONCE-PER-TURN TRIGGER BURNS IT

> **TOURNAMENT RULES 506.3.** The accountable player must acknowledge their triggers by the time they
> would have an observable impact on the game. If they do not, they are forgotten.
> **506.3.b.** A trigger is considered forgotten once its point of observable impact has been reached
> and a new game action is taken without the accountable player acknowledging the trigger.
> **506.4.** A triggered ability that was forgotten never goes on the chain.
> **506.5.** A triggered ability that was forgotten is still considered to have triggered for the
> purpose of non-optional “First time” or similarly restricted triggers.

506.5 is the one with teeth. This catalogue leans on the per-turn limiter constantly — CLAUDE.md's
383.1.b finding (*"a `the [Nth] time` trigger fires ONCE when its condition is met several times
simultaneously"*) and 383.3.e.1 are cited across the Grand Plaza family and the death-trigger lens.
**506.5 says the limiter is spent even when the trigger never resolves**: forget it, and it neither
goes on the chain (506.4) nor leaves the turn's use available.

Swept over `data/cards.json`, folded by name+type: **ten cards carry a per-turn trigger limiter** —
`OGN-118 Wraith of Echoes`, `OGN-162 Miss Fortune, Captain`, `OGN-292 The Dreaming Tree` (banned in
both formats), `SFD-113 Lucian, Merciless`, `SFD-148 Draven, Audacious`, `UNL-174 Shard of Undoing`,
`UNL-215 Star Spring`, `VEN-002 Blade Twirler`, `VEN-068 Jayce, Brilliant Inventor` and
`VEN-125 Hungry Wolf` — and **21 entries run at least one of them.** For every one of those 21, a
missed announcement is not a delay, it is the turn's use gone. That is a tournament fact rather than a
game fact, which is exactly why it lives in this book and why no Core Rules pass could have found it.

**506.3.c** closes the obvious abuse from the other side: a player *"ruled to be abusing this rule to
intentionally forget mandatory triggers"* is penalised under TOURNAMENT RULES 702.2 — so a mandatory
downside trigger cannot be quietly dropped, which pairs with Core Rules 402.4.b (§97: you may not
decline the CHOICE stage) to close both halves of the same evasion.

## 8. TOURNAMENT RULES 506.1.a CORROBORATES R8, WHICH THIS PROJECT VOTED WITH NO RIOT RULING

> **TOURNAMENT RULES 506.1.a.** The accountable player for triggers sourced from battlefields depends
> on control of the battlefield and is not automatically the player who brought the battlefield to the
> game. See CR 190.6. For more information on battlefield abilities.

CLAUDE.md records R8 as *"ruled 2026-09-04 **after a web search found NO official Riot ruling** (all
four set FAQs silent, including the two that printed the cards)"*, resolved A on the strength of Core
Rules 190.6.a, 190.6.c, 190.6.d and 383.4.d.2 — that a battlefield's own Hold trigger is one of *"your
hold effects"* because control, not ownership, decides whose ability it is. The entry for it even
anticipates the objection: *"The ownership objection does not arise, since 127.1 plus 485.4.a mean the
battlefield you control in a Duel is normally the one you brought."*

**506.1.a is a second Riot book saying the premise outright, and answering the objection in general
rather than in the Duel's special case:** the accountable player *"depends on control of the
battlefield and is not automatically the player who brought the battlefield to the game."* It does not
convert a vote into a Riot ruling on the question R8 asked, and it removes the only structural doubt
under it. This is the same shape the manager flagged for 702.3.a and R2 — **a voted reading with a
corroborating paragraph in the other book** — and it is the second instance, which suggests the pattern
is worth checking for every open R-number rather than being a coincidence twice.

## 9. TOURNAMENT RULES 504.4 — A RECYCLE MUST HIT THE BOTTOM OF THE DECK IMMEDIATELY

> **TOURNAMENT RULES 504.4.** When something is recycled, it must be immediately put on the bottom of
> the appropriate deck.
> **504.4.a.** Example: A player may not keep their recycled runes facedown on the board to track
> Energy.
> **504.4.b.** Failure to recycle in this way is a Communication Violation. See 703.5 for more
> information on Communication Violations.

Cited by nothing, and it lands directly on this project's loop ledgers, which are denominated in
recycles. `lux-infinite-power`'s first step is *"Recycle a rune to float 1 Power of its domain"*, and
the Lux ledger's whole argument is a per-pass count of cards recycled against cards drawn. **504.4
makes each of those recycles a physical action with a deadline**, and 504.4.a forbids exactly the
bookkeeping shortcut a player running an eleven-rune loop would reach for. With 505.2's requirement
that shortcut iterations be identical, the two together are why a loop of this size is announced rather
than played out — and why announcing it wrongly is a penalty rather than a take-back.

**504.3** is the companion constraint on any shortcut: *"Players can't shortcut out-of-order in a way
that gives them information prematurely that might affect decisions later in that sequence."* For a
loop that draws, that is the rule that stops you resolving the draws first and then deciding how many
iterations to run — which is, in ledger terms, the thing that would make a zero-spare-draw pass safe
when it is not.

## 10. What 506 and 504 do NOT change, recorded so the next reader does not re-open it

- **506.2**: you are not required to notify an opponent of triggers you are not accountable for. No
  catalogue consequence; recorded because it is the paragraph a reader expects to say the opposite.
- **506.3.d**: the *"At the start of each player's first Beginning Phase"* carve-out names
  `OGN-284 Obelisk of Power` and `OGN-290 The Arena's Greatest` — **both banned in both formats**, so
  the carve-out is dead letter for us. Worth one line only because it shows the Tournament Rules were
  written against a card pool that still contained them.
- **506.3.e's nine worked examples** name `OGN-066 Ahri, Alluring`, `OGN-288 Startipped Peak`,
  `OGN-164 Sett, Brawler`, `OGN-103 Ravenbloom Student`, `OGN-185 Traveling Merchant`,
  `OGN-162 Miss Fortune, Captain`, `OGN-177 Stealthy Pursuer` (banned) and `SFD-128 Overzealous Fan`.
  **Checked: every one of the unbanned eight is already catalogued**, so the rules-name-a-card vein is
  no richer here than in the Core Rules — what is new is the paragraphs, not the cards.
- **504.1 / 504.2**: out-of-order sequencing and the right to ask for the correct order. Procedure.

## 11. Validation

Quotes checked from an explicit list against `data/Riftbound-Tournament-Rules-2026-07-16.txt`: 11
passages, zero failures. Counts run in the turn they were written — section 506 cited by zero entries;
the ten per-turn-limiter cards folded by name+type over `data/cards.json` and the 21 entries running
one; the ban status of all ten named cards against `data/legality.json`, whose `entries[].bases` is an
array. One instrument note: a first sweep for entries that discuss forgetting a trigger returned 21,
and the number was wrong — the pattern was matching **`Forgotten` Signpost** and **`Forgotten`
Library**. The clean measurement is the citation count, which is zero. No entry staged;
`data/combos.json` not written.

---

# Batch 3 — 104.1 says this book beats the Core Rules, and it is cited by nothing

No entry. Taken out of order at the manager's direction (407 first, because the turn clock prices the
first turn from Core Rules 485.7 and had never read this book's version), and the section above it
turned out to matter more than the one I was sent for.

## 12. TOURNAMENT RULES 104.1 — THE PRECEDENCE RULE

> **TOURNAMENT RULES 104.1.** vs. Core Rules: In some cases, information in this document may
> contradict, or provide information not contained in, the Riftbound Core Rules. **In all such cases,
> this document takes precedence for competitions.**

**Cited zero times.** This project is built on the Core Rules and cites the Tournament Rules nineteen
times, and 104.1 says that wherever the two differ, for anything a player does at an event, **the book
we have barely read wins.** That is the frame for this whole slice and it belongs at the top of it:
every Core Rules derivation in the catalogue is provisional against a Tournament Rules paragraph
nobody has looked for. 104.3 adds a third tier above both — event-specific addenda beat this document
— and 105 lets Riot alter it without notice.

## 13. THE FIRST CONTRADICTION, AND IT AMENDS A FINDING I SHIPPED THIS MORNING

§150 of the other walk (batch 32, the 486 block) concluded that after a drawn game a battlefield
returns, and named **Core Rules 486.5.a** as *"the only relief"*:

> **CORE RULES 486.5.a.** If no player won a game, the battlefields presented for that game **may be
> reused** in a subsequent game.

The Tournament Rules say it is not a relief and not optional:

> **TOURNAMENT RULES 406.1.b.** If a game ends in a draw, players **must use the same battlefields**
> for the following game.

**May against must, and by 104.1 the must wins in competition.** So the corrected statement for every
battlefield-dependent entry is: *a decisive game removes your battlefield for the rest of the match
(CR 486.5, CR 486.6); a drawn game locks you into the same one, whether you want it or not
(TR 406.1.b).* A deck whose game-1 battlefield was the wrong choice cannot change it after a draw —
and by §2 of this document, **a loop with no maintaining player ends the game in a draw (TR 505.6)**,
so the two halves of this survey meet on the same board: the worst outcome for an infinite also freezes
the battlefield you brought.

This is my own finding from earlier today, amended within the day by reading the other book. Nobody
would have found it from the Core Rules, because the Core Rules sentence reads complete.

## 14. 407.1 — THE SEAT IS A CHOICE, AND THE TURN CLOCK DOES NOT MOVE

> **TOURNAMENT RULES 407.1.** For the first game of a match, a designated player decides whether they
> wish to play first or last.
> **407.2.** Any random method that is agreed upon by all players in the current game may be used to
> determine the designated player.

The manager's concern was that if 407 moves the first turn, every number behind *"33 of 45 finishers
pay later than doing nothing"* moves with it. **Checked at source in `scripts/adversarial-check.mjs`,
lines 151–152, which model going first and say so:** *"485.7 gives the extra rune to the player going
SECOND, so this is the slower seat and therefore the honest bound."*

**The numbers do not move, and the reason is that the clock is a comparison.** The same rune curve is
applied to the finisher and to the do-nothing Hold curve it is measured against, so a seat that shifts
both shifts neither relative to the other. What 407.1 does change is the ABSOLUTE figures in one
direction only: a deck may now *choose* the seat, so a finisher that wants ramp takes the extra rune of
going second and can arrive a turn earlier than the model says — and the do-nothing curve arrives a
turn earlier too. **The clock's absolute turns are a ceiling the seat choice can lower; its comparison
is seat-invariant.** That makes the 33-of-45 a floor for a third independent reason, alongside the two
the script already records.

## 15. 407.4 — THE LOSER CHOOSES THE SEAT, WHICH COMPOUNDS WITH THE BATTLEFIELD REMOVAL

> **TOURNAMENT RULES 407.4.** For games after the first game of a match, the loser of the previous game
> gets to choose if they play first or last. If the previous game was a draw, the starting play from
> the previous game is maintained.

Read with Core Rules 486.5 and 486.6 — the winner's battlefields are **removed from the match** — this
is the sentence a combo deck should be built against: **winning game 1 with a battlefield-dependent
line costs you that battlefield for the rest of the match AND hands your opponent the choice of seat
for game 2.** Two independent penalties for winning, from two different books, and the catalogue
records neither. For the eleven Grand Plaza lines and the 81 entries carrying the battlefield caveat,
that is the real match-level picture: **the line is available in at most one game of three, and the
game it wins is the game that switches it off.**

The draw clause is the other half of §13: after a draw you keep the battlefields (TR 406.1.b) *and* the
seat (TR 407.4), so a drawn game changes nothing except the clock.

## 16. 406.1.g — a third setup process, and it is random

> **TOURNAMENT RULES 406.1.g.** For competitions run using a “best of 1” format instead of a “best of
> 3” format, the head judge may opt to use the altered initial setup process listed below to closer
> mirror the “best of 3” experience:
> **406.1.g.2.** Each player randomly selects one of their three Battlefields, and places it into the
> Battlefield Zone.

So a best-of-1 event may run with **Core Rules 485.5's random battlefield** rather than 486.5's chosen
one, at the head judge's option, and with a sideboard step (406.1.g.5) before the Chosen Champion is
set aside (406.1.g.6). **Three setup variants exist, not two**, and which one a battlefield-dependent
entry faces is an event-level decision no card can influence. 406.1.g.3 routes the seat through 407 even
in that variant.

## 17. Validation

Quotes checked from an explicit list: 8 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt` and 1 against
`data/Riftbound-Core-Rules-2026-07-16.txt`, zero failures. The turn-clock claim was checked by reading
`scripts/adversarial-check.mjs` at source rather than from CLAUDE.md's summary of it. Section 104's
zero citations were measured over `data/combos.json`, `data/synergies.json`, `src/`, `test/`, the walk
records and CLAUDE.md. No entry staged; `data/combos.json` not written.
