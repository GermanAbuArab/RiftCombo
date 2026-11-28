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

---

# Batch 4 — why our loops may be shortcut at all, and the ledgers turn out to be the argument

No entry. **TOURNAMENT RULES 502 Information (24 headings) and 509 Gameplay Decisions (15) are cited
by nothing.** Between them they supply the missing half of the 505.9 citation all fourteen INFINITEs
already carry.

## 18. THE DETERMINISM ARGUMENT, WHICH IS THE PER-PASS LEDGER WEARING A DIFFERENT HAT

All fourteen INFINITEs cite **TOURNAMENT RULES 505.9** — *"If a sequence of actions is
non-deterministic, it may not be shortcut and iterations must be performed manually"* — to say that
ours may be shortcut. None of them says **why** the sequence is deterministic, and the Core Rules
contain a paragraph that looks like it should stop them:

> **CORE RULES 416.5.** If 2 or more cards are Recycled to the Main Deck simultaneously, they are
> placed on the bottom of that deck **in a random order**.
> **CORE RULES 416.5.a.** If 2 or more cards are Recycled to the Rune Deck simultaneously, they are
> placed on the bottom of that deck in the order of their owner's choosing.

Our loops recycle three or four cards to the Main Deck every pass. **416.5 makes that order random,
and randomness inside a loop is exactly what 505.9 refuses to shortcut.** The reason the fourteen are
safe anyway is the thing their own ledgers already prove for a different purpose: **each pass draws
back everything it recycled.** `lady-luminosity-loop-comet` states it in its own words — *"the card
count closes at 5 recycled = 5 drawn"* — and the Lux ledger closes at 4 = 4. A random order among
cards that are all drawn in the same pass changes nothing observable, so the sequence is deterministic
in outcome even though it is random in arrangement.

**So the per-pass ledger, written as a RESOURCE argument, is also the DETERMINISM argument that
licenses the 505.9 citation.** And it names the failure mode precisely, which nothing in the catalogue
does: **a loop that recycles more cards than it draws back in the same pass leaves them in a random
position, the randomness reaches the next pass, and TOURNAMENT RULES 505.9 bars the shortcut — the
iterations must then be performed by hand**, which against TOURNAMENT RULES 604's round time limit is
the difference between announcing a number and running out of clock. *A loop is shortcuttable only if
its recycles and its draws close in the same pass* is the one-line test, and it is the same line the
ledgers already compute.

**The Rune Deck is the opposite case and it is why rune loops are simpler:** 416.5.a gives the owner
the order, so no randomness enters at all, and **TOURNAMENT RULES 502.5.b** makes *"the order of runes
in a Rune Deck"* **derived** information — knowable by anyone who tracks it. A rune-recycling loop is
deterministic twice over. The Main Deck's order is named nowhere in 502.4 or 502.5, so it stays
secret, which is what puts a Main-Deck loop in front of **TOURNAMENT RULES 505.11**: judges are the
arbiter *"if choices are available to continue a loop when secret information is involved."*

## 19. 502.6 AND 502.8 — THE ANNOUNCEMENT DUTY REACHES STATE, NOT ONLY TRIGGERS

> **TOURNAMENT RULES 502.6.** Players must acknowledge changes to public information that result from
> their cards and effects as those effects would have an observable impact on the game. See 506.3.e.
> for examples of observable impact.
> **502.8.** Players must not represent public or derived information incorrectly.
> **502.4.d.** A permanent's current state, as distinct from its printed ones.

§7 recorded 506.3's duty to announce a TRIGGER. 502.6 is the same duty for a change of STATE, with the
same worked examples, and 502.4.d makes *"a permanent's current state, as distinct from its printed
ones"* public. For this catalogue that reaches the Might arithmetic directly: a body at printed 3 that
is standing at 8 under three Svellsongur instances, a stunned unit, an Empowered one, a buffed one —
all public, all owed an announcement, and 502.8 makes misstating one an offence rather than an error.
The `svellsongur-copy` family, whose whole content is that a carrier's current text and Might differ
from its printed ones, is the part of the catalogue this lands on hardest.

**502.2.b is the counterweight and it is worth knowing**: *"Players are not required to assist
opponents in determining derived information."* So you must announce the state and answer honestly
about it (502.7), and you need not do the opponent's arithmetic — including, by 502.5.c, *"consequences
of actions that might happen in the future, such as a unit receiving a Might bonus from the Shield
ability if a player attacks."* **That paragraph is about [Shield] by name**, which this catalogue
prices in eight entries.

## 20. 509.4.d — A RUNE EXHAUSTED IN ERROR CAN BE TAKEN BACK

> **TOURNAMENT RULES 509.4.d.** The player wants to undo a decision to exhaust or recycle runes.
> **509.4.d.1.** A player exhausts two Calm runes. Before taking a new game action, the player decides
> they do not want to exhaust them, and readies them.

Uncited, and it is the one take-back this book grants at high OPL that touches a resource this project
counts. Every loop ledger here is denominated in exhausted runes and recycles; 509.4.d says a
mis-tap is recoverable **until a new game action is taken**, and 509.2 is the default it carves out of
(*"Once an action is communicated to an opponent, that action can't generally be taken back"*). 509.5
is the limit: changing a decision in response to an opponent's physical reaction is **angle shooting**
under 704.4, and 509.6 keeps it inside 703.2's Slow Play.

Three more pool cards are named in this block's examples — `Discipline` (509.4.a.1),
`Traveling Merchant` with `Reaver's Row` (509.4.b.1, and Reaver's Row is banned in both formats), and
`Pouty Poro` with `Void Gate` (509.4.c.1). **Checked: all four unbanned cards are already catalogued**,
which is the third time in this survey that the named-card vein in this book yields paragraphs rather
than cards.

## 21. Validation

Quotes checked from an explicit list: 10 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt` and 2 against
`data/Riftbound-Core-Rules-2026-07-16.txt`, zero failures — and **CORE RULES 416.5 was read at source
rather than taken from CLAUDE.md's summary of it**, which is what turned a half-remembered "the Main
Deck is random" into the determinism argument above. Section 502 and section 509 citation counts, and
the ban and catalogue status of the four named cards, were run in the turn they were written. No entry
staged; `data/combos.json` not written.

---

# Batch 5 — the second contradiction, reported on its own: the Core Rules' deck size is a FLOOR and this book's is an EQUALITY

No entry. Reported alone at the manager's standing instruction that after 104.1 a contradiction is
worth more than a finding. **It is a different kind of contradiction from §13's and the difference
matters**, which is most of why it is worth a batch.

## 22. THE TWO SENTENCES

> **CORE RULES 103.2.** A Main Deck of **at least** 40 cards: A Chosen Champion Unit, as well as
> Units, Gear, and Spells
> **TOURNAMENT RULES 601.1.b.** In competitions, a player's Main Deck must be **exactly** 40 cards.
> **TOURNAMENT RULES 402.1.** In a constructed event, players must register a Main Deck of exactly 40
> cards (including a chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a
> unique name.

A floor against an equality. By **TOURNAMENT RULES 104.1** the equality governs in competition, so
**a 41-card Main Deck is legal under the Core Rules and illegal at every event**, and the sentence
CLAUDE.md carries — *"103.2 A Main Deck of at least 40 cards"* — is true only of kitchen-table play.

## 23. AND IT IS A DECLARED MODIFICATION, WHICH §13's WAS NOT

> **TOURNAMENT RULES 601.1.a.** The rules for constructing a Riftbound deck are found in CR 101. Deck
> Construction, **except where modified here below** for the competition Constructed play format.

This is the distinction to carry, because it changes how much weight the finding bears. §13's pair —
Core Rules 486.5.a's *"may be reused"* against Tournament Rules 406.1.b's *"must use the same
battlefields"* — is an **undeclared** disagreement: neither paragraph mentions the other, both read
complete, and only 104.1 resolves it. **601.1.b is a declared override**: 601.1.a announces itself as
a modification of CR 101 before saying anything, so the books are not disagreeing, one is amending the
other on purpose.

**So there are two classes and they want different handling.** A declared override is safe to find by
reading the overriding section. An undeclared contradiction can only be found by reading both books on
the same subject, which is the standing consequence the manager wrote down after §13 and the reason it
is the expensive class.

## 24. THE TOOL IS ALREADY RIGHT, AND ITS CITATION IS ONE PARAGRAPH SHORT

Checked at source rather than assumed: `sizeRule` in `src/build.ts:72-80` fails a list at **both**
ends and names a different rule for each — *"a Main Deck is at least 40 (103.2)"* below forty,
*"an event registers exactly 40 (Tournament Rules 402.1)"* above it — with the docblock already
recording that *"They are different rules, so the row says which one a list broke rather than printing
one number for both."* **No defect; the row is one of the nineteen Tournament Rules citations in the
project and it is correct.**

What it lacks is **601.1.b**. 402.1 is the **registration** rule — what you write on a decklist — and
601.1.b is the **format** rule, what the deck must be while you are playing it. They are in different
sections for a reason: 403.4.c makes the distinction explicit, requiring that *"After the sideboarding
process, a player's Main Deck must meet deck size requirements dictated by the competition format"* —
i.e. the format rule, 601.1.b, is what a mid-match deck is measured against, and 403.4's *"Sideboard
cards must be exchanged 1 for 1"* is the mechanism that keeps it at forty. **UPGRADE, FLAGGED ONCE:
`sizeRule`'s over-forty branch should name 601.1.b beside 402.1.**

## 25. ONE CARVE-OUT THE BAN PANEL DOES NOT MODEL, and I am not proposing we model it

> **TOURNAMENT RULES 601.2.d.2.** At low OPL, if a player is using the exact deck configuration of a
> preconstructed Riftbound deck product, they are allowed to play with cards on the banned list.
> **601.2.d.2.a.** … if a player is playing a deck matching the exact contents of the preconstructed
> Jinx Champion Deck, they are allowed to use the banned cards in the deck, such as Fight or Flight,
> Scrapheap and Reaver's Row. If the player makes any changes or adds a sideboard, they can no longer
> include the banned cards.

Uncited. `deckRestrictions` reports a banned card unconditionally, and **that is the right behaviour
and should stay**: the carve-out applies only at low OPL, only to an unmodified preconstructed
product, and collapses the moment a player changes a card or adds a sideboard — which is every list
this tool is pointed at. It is recorded here so that nobody reads a future report of *"we flag a card
Riot permits"* as a defect. Riot names three of our banned cards in the example, and
`OGN-285 Reaver's Row` is one this survey has already met, in TOURNAMENT RULES 509.4.b.1.

**601.2.a** is the one the manager already had — *"A card may only be included in a deck if it is from
a set that is legal in that format **or it has the same name as a card from a set that is legal in
that format**"* — which makes name+type folding the legally correct unit rather than a matching
convenience. Recorded here with its neighbours because 601.2.c adds the other half: a reprint whose
collector number sits outside the normal numbering of a set *"does not affect the card's format
legality"*, with 601.2.c.1's worked example of a 300/250 card. **Between them, that is the rulebook's
own statement of why this project matches on base codes and folds censuses by name.**

## 26. Validation

Quotes checked from an explicit list, quote-normalised: 8 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt` and 1 against
`data/Riftbound-Core-Rules-2026-07-16.txt`, zero failures. `sizeRule` was read at `src/build.ts`
rather than from its summary — the same discipline that produced §14's answer — and it is clean. No
entry staged; `data/combos.json` not written; `src/` not written.

---

# Batch 6 — 701 has a remedy written for the recycle mechanic our loops are made of

No entry. **TOURNAMENT RULES 701 General is 61 headings and cited by nothing**, the last large unread
block in the play-relevant half. Most of it is judge philosophy and penalty definitions and is
correctly uncited. Three paragraphs are not.

## 27. TOURNAMENT RULES 701.4.b — A JUDGE SHUFFLE DOES NOT DESTROY A KNOWN DECK ORDER

> **TOURNAMENT RULES 701.4.a.** Some remedies require shuffling the randomized portion of the deck.
> **701.4.b.** Many cards recycle cards to the bottom of a deck. The judge should do what they can
> using information available from the game state and from the players to determine **which portion of
> the deck is knowable by one or more players, and separate those before shuffling that deck.**
> **701.4.c.** Once the deck has been shuffled, any cards set aside in this way should be returned to
> their proper locations in the deck.
> **701.4.d.** Shuffles performed by a judge in this way are not considered shuffles in game terms.

Riot wrote a remedy **specifically for the recycle-to-the-bottom mechanic**, and it protects exactly
the property every loop in this catalogue runs on. The Lux engine's entire state is a known sequence
at the bottom of an otherwise empty Main Deck; §18 showed that the 505.9 shortcut licence depends on
each pass drawing back what it recycled. **701.4.b says that when a judge has to shuffle for some
unrelated remedy, the knowable portion is separated out first and 701.4.c puts it back where it was**
— so a remedy elsewhere in the game does not silently end the loop. 701.4.d keeps the whole operation
outside the game, so nothing that triggers on shuffling sees it.

That is worth having in the INFINITE entries beside 505.2 and 505.9, because it is the answer to the
obvious table question — *"what happens to my stacked deck if a judge has to shuffle?"* — and the
answer is favourable and non-obvious.

## 28. 701.2.b.3 — A SECOND ROUTE TO A DRAW, AND IT MEETS THE FIRST

> **TOURNAMENT RULES 701.2.b.3.** If all players in a match receive a game loss simultaneously, the
> current game ends in a draw. All game losses are recorded but do not affect the match score.

§2 found the first draw route in 505.6 (a loop nobody maintains). This is the second, and §13 is what
makes the pair worth stating together: **a draw is not a neutral outcome in this format.** By
TOURNAMENT RULES 406.1.b the battlefields are frozen for the next game, by 407.4 the seat is frozen,
and by 403.10 **neither player may sideboard** — *"If a game ends in a draw, neither player may
sideboard for the following game."* So a drawn game costs a combo deck all three of the levers a
best-of-three normally hands the loser. **Three paragraphs in three different sections, none of them
cited, and together they are the reason a draw is worse for the deck with the narrow plan.**

## 29. 701.5.b.2 and 701.1.o — what a rewind restores

> **TOURNAMENT RULES 701.5.b.2.** When performing a simple rewind of a player's game action, rewind to
> before the action began, such as before a played card would be put on the chain. The player may then
> opt not to take the action, or take the action making different decisions.
> **701.1.o.** If a player acts on information given in error by a competition official, the head
> judge can rewind the game to account for it, even if there were no other errors.

701.5.b.2 is the mechanism under §20's take-backs: a simple rewind goes to **before the card would be
put on the chain**, which is Core Rules 349's step 1, and restores the full choice rather than only
the target. 701.5.a bounds it — rewinds are for *"extreme circumstances, where leaving the game in its
current state is substantially worse"* — and 701.5.c reserves anything larger to the head judge.
701.1.o is the one case where a rewind needs no error by either player.

## 30. What 701 does NOT contain, recorded so nobody reads it twice

61 headings, and after reading the block end to end the remainder is **judge philosophy (701.1.a–n),
penalty definitions and their application (701.2, 701.3)** — how a Warning, Game Loss, Match Loss and
Disqualification differ, who may issue them, and that a single error yielding several penalties draws
only the most severe (701.3.d). **None of it bears on what a deck can do**, and the one sentence that
looked as though it might — 701.1.a, *"Errors are assumed to be committed unintentionally"* — is about
intent, not about game state. **Section 701 is otherwise correctly uncited, and that is a measured
empty rather than an unread one.**

## 31. Validation

Quotes checked from an explicit list, quote-normalised: 9 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt`, zero failures. Section 701's zero citations were
measured over `data/combos.json`, `data/synergies.json`, `src/`, `test/`, the walk records and
CLAUDE.md. No entry staged; `data/combos.json` not written.

---

# Batch 7 — the R-number sweep is a measured EMPTY, and the keyword that was not empty corrects §27

No entry. The manager's instruction for this batch was to report **what each R-number's status
becomes**, not merely that a paragraph was found, and to be exact about **which half** a paragraph
reaches — because both corroborations so far (R2 via 702.3.a, R8 via 506.1.a) reached a **premise**
and not a conclusion, and *"a ruling half-corroborated and recorded as settled is a new debt with no
marker on it."*

## 32. THE SWEEP, AND WHAT EACH STATUS BECOMES: NOTHING

Issue #11's open readings are **R3–R5, R11–R19 and R21–R24**. Seven of them state their subject in
the issue's own tables and are sweepable; the rest are named only by number in the status lines and
have no subject recorded there, which is itself worth writing down. For each sweepable one I searched
`data/Riftbound-Tournament-Rules-2026-07-16.txt` for the subject's own vocabulary:

| reading | subject | Tournament Rules hits | status BECOMES |
|---|---|---|---|
| **R4** | *"my hold effects"* includes triggers granted by another Equipment (CR 434.1.c) | **zero** — the phrase *"hold effect"* does not occur in this book | **unchanged, open** |
| **R11** | units enter exhausted unless text says otherwise (CR 143.4) | **zero** — *"enter(s) exhausted"* does not occur | **unchanged, open** |
| **R12** | Heimerdinger copying Renata's *"use my abilities only while I'm at a battlefield"* | **zero on the subject.** Ten raw hits for *"copy"/"copies"*, every one about a **copy of a battlefield** (602.3.e.4.a), a second **copy of a card** in a sideboard error (703), or **copies of named cards** (403.3) | **unchanged, open** |
| **R13** | *"becomes Mighty"* via [Assault] (CR 709) | **zero** — neither *"Mighty"* nor *"Assault"* occurs in this book at all | **unchanged, open** |
| **R14** | a Showdown at a battlefield already scored this turn | **zero on the subject.** One raw hit for *"Showdown"*, and it is the **Showdown Series**, an event name in 705.1.c | **unchanged, open** |
| **R21** | a re-exhaust window between the two executions of a `[Repeat]` | **zero on the subject.** Nine raw hits for *"repeat"*, being 505.1's *"repeated"* and the Limited draft procedures at 602.4 | **unchanged, open** |
| **R22** | *"Recycle the rest"* with no banish — does it recycle or do nothing | **zero on the subject.** Eleven raw hits for *"recycle"*, of which the substantive ones are 421.8, 502.5.a and 504.4 — all about **how** a recycle is performed, none about **whether** an unfulfilled one happens | **unchanged, open** |

**Seven of seven unchanged.** The two corroborations this method has produced were both in the
**500 Communication** band, which is the only part of this book that speaks about game state at all;
the open readings are Core Rules questions about card text, and this book does not discuss card text.
**That is the honest bound on the method: it retires a debt only where the reading's premise is about
INFORMATION, PROCEDURE or ACCOUNTABILITY, and every remaining open reading is about EFFECTS.** Worth
one line in CLAUDE.md so the sweep is not re-run with the same result.

Every row above is a **false-positive count, not a silence** — I am reporting the raw hits and why
each is not the subject, because "zero hits" and "hits that are all about something else" are
different results and only the second one tells you the vocabulary was searched.

## 33. THE ONE THING THE SWEEP FOUND, AND IT CORRECTS §27

> **TOURNAMENT RULES 421.2.** Random is defined as a state where no player could have any information
> about the order or position of cards in any part of the deck.
> **TOURNAMENT RULES 421.8.** When two or more cards are recycled to the player's Main Deck as part of
> a single action, the above procedures 1-7 should be followed for that group of cards to properly
> randomize them before recycling them.

Uncited, and it is **the physical implementation of Core Rules 416.5** — the paragraph §18 built the
determinism argument on. 416.5 says the order is random; **421.8 says you must actually randomise
that group at the table, to 421.2's absolute standard**, before it goes to the bottom.

**§27 IS WRONG IN ITS DESCRIPTION AND I AM CORRECTING IT HERE RATHER THAN LEAVING IT.** That section
said *"the Lux engine's entire state is a known sequence at the bottom of an otherwise empty Main
Deck."* Under 416.5 with 421.8 it is **a known SET in a deliberately unknown ORDER**. The conclusion
of §27 is untouched — 701.4.b still protects the knowable portion through a remedy shuffle, and
701.4.b's own words are *"which portion of the deck is knowable"*, which a set satisfies — but the
sequence claim was mine and it was wrong.

And it makes §18's argument stronger rather than weaker. **The order is not merely random in the
abstract; a player must physically shuffle three or four cards every pass to make it so.** So the
505.9 shortcut licence is doing real work: without it, a loop of a few hundred passes is a few hundred
hand shuffles against TOURNAMENT RULES 604's round clock, and 505.12 makes declining to shortcut in
order to burn that clock **cheating**. The three paragraphs now sit in one line: **416.5 randomises,
421.8 makes you do it by hand, and 505.9 lets you skip the whole thing only because the ledger closes
each pass.**

## 34. Validation

Quotes checked from an explicit list, quote-normalised: 2 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt`, zero failures. The seven subject sweeps were run
over the whole file with the raw-hit counts recorded above rather than summarised, and the open
R-number list was read from GitHub issue #11 **fetched with `--json body,comments`** — the body alone
omits the comments, which is where every ruling lives, and that trap is already in CLAUDE.md. No
entry staged; `data/combos.json` not written.

---

# Batch 8 — 704/705 is the measured empty I predicted, except for one paragraph that completes a triad

No entry. This closes the survey of the play-relevant half.

## 35. 704 AND 705 — 82 HEADINGS, AND ONE OF THEM MATTERS

Read end to end. **705 Disciplinary Code (39 headings) is an empty for this project**: 705.1 is the
overview of what a player accepts by entering, 705.2 is investigations and consequences, 705.3 is
conduct. Nothing in it bears on what a deck can do. **704 Unsporting Conduct (43) is the same**, with
the exception of one sub-section — 704.5 Bribery, 704.6 Wagering, 704.7 Theft and 704.8 Cheating are
all offences of the person rather than of the game state, and the two of them this survey already
needed (704.8 for 505.12's shortcut abuse, 704.4 for 509.5's take-backs) were reached from the
sections that cross-reference them.

## 36. 704.4.a.1 COMPLETES A TRIAD ABOUT ON-RESOLUTION CHOICES, AND THE PROJECT HAS ONE THIRD OF IT

> **TOURNAMENT RULES 503.9.c.** When a player puts a spell or ability on the chain and announces
> choices for it that are normally made upon resolution, **they must adhere to those choices unless
> their opponents react.**
> **TOURNAMENT RULES 503.9.d.** When a player asks about choices normally made upon resolution, they
> are assumed to be passing priority and allowing the spell or ability to resolve.
> **TOURNAMENT RULES 704.4.a.1.** [Angle Shooting, Warning] Asking a player to state a choice that
> they would make on resolution **prior to deciding whether to react.**

503.9.c and 503.9.d are cited **once each**, both by `bullet-time-seals-scaling-sweep` —
appropriately, since `OGN-268 Bullet Time` is the one spell in the pool CLAUDE.md records as *"sized
AFTER the opponent has already responded"*. **704.4 and 704.4.a.1 are cited zero.** Together the three
are a complete system, and this catalogue's whole finalization-versus-resolution apparatus — 204.3.a
against 204.3.b, 383.3.b, 205, 740.4, all cited in hundreds of places — has a procedural counterpart
in this book that nobody had read:

- the Core Rules say **when** an on-resolution choice is made (CR 355.17);
- **503.9.c** says that announcing it early **binds you** — *unless the opponent reacts*, which frees
  you again, and that conditional is the half worth having: **a reaction reopens a choice you had
  already committed to**;
- **503.9.d** says that **asking** about it costs you your own priority;
- **704.4.a.1** makes asking *in order to decide whether to react* an **offence**.

So the 205 family (*"you may pay X. If you do, Y"*, decided at resolution) and the 204.3.a family
(paid at finalization) differ at the table in a way the entries do not record: **for the resolution
family the opponent may not extract your choice before committing, and you may not be asked to give
it.** `OGN-268 Bullet Time` is the worked case and its entry already stands on the right two
paragraphs; what is missing is the third, and the observation that it is the same rule seen from the
penalty side.

## 37. Validation

Quotes checked from an explicit list, quote-normalised: 3 passages against
`data/Riftbound-Tournament-Rules-2026-07-16.txt`, zero failures. Citation counts for 503.9.c, 503.9.d,
704.4, 704.4.a.1 and 704.8 were run in the turn they were written, and the single entry citing the
first two was read. 704 and 705 were read end to end rather than sampled. No entry staged;
`data/combos.json` not written.

---

## 38. HANDOFF — the Tournament Rules survey, for whoever comes next

**The play-relevant half of this book is surveyed end to end.** What follows is the state, not a
queue, because the queue is empty.

### H1. What was covered, and where

| section | batch | result |
|---|---|---|
| 104 Precedence | 3 | **104.1: this book beats the Core Rules in competition.** Cited zero before. |
| 402, 403, 406, 407 | 3, 5 | 407.4 + CR 486.5/486.6 are two penalties for winning game 1; 406.1.b contradicts CR 486.5.a |
| 500, 501, 503, 504 | 1, 2, 4, 8 | 504.4 immediate recycle; the on-resolution triad at 503.9.c/d + 704.4.a.1 |
| **505 Loops** | **1** | **505.6: a loop nobody maintains is a DRAW.** 2 of 16 paragraphs had been read. |
| 502, 509 | 4 | the determinism argument; 502.4.d makes current state public |
| 506 Triggered Abilities | 2 | **506.5: forgetting a once-per-turn trigger spends it.** 506.1.a corroborates R8. |
| 601 Constructed | 5 | **601.1.b: exactly 40, against CR 103.2's at-least.** A *declared* override. |
| 604, 421 | 1, 7 | 421.8 makes the Main Deck recycle a hand shuffle |
| 701 General | 6 | **701.4.b protects a knowable deck portion through a judge shuffle.** Rest is a measured empty. |
| 704, 705 | 8 | measured empty except 704.4 |
| **602 Limited (93)** | 1 | **REFUSED permanently** — this catalogue models Constructed and 2v2 only |
| **104, 201–205, 301–306, 408–424 (246)** | 1 | **REFUSED** after a spot read — they govern the event, not the game |

### H2. The two things to carry, whatever you work on next

**104.1 makes every Core Rules derivation provisional**, and §23's split is how to act on it without
re-reading the whole book: a **declared** override announces itself in the overriding section's own
first line (601.1.a) and is cheap to find; an **undeclared** contradiction is two paragraphs that both
read complete and mention nothing (CR 486.5.a against TR 406.1.b), and only 104.1 resolves it. **Grep
the other book for the SUBJECT, never for a cross-reference.**

**The R-number sweep is bounded and should not be re-run as a whole** (§32). Both corroborations sit
in the 500 Communication band, the only part of this book that speaks about game state, and both
reached a **premise** about information or accountability. Every remaining open reading is a Core
Rules question about card **effects**, which this book does not discuss. Seven of seven came back
unchanged and an eighth would too.

### H3. Instruments

No new probe was needed here; the book is small enough to read. The **`^[[:space:]]*` anchor is
mandatory** (50 form feeds, 56 headings a bare `^` misses) and there is **no U+200B**, so #202's
third invisible-character trap is Core-Rules-only. `.scratch/tr-scan.mjs` (gitignored) prints the
936/790/cited census and the per-section table and can be re-run after any merge.

### H4. What is genuinely left

Only **the 246 administrative headings and 602's 93**, both refused with their scope in §5, and the
**unsweepable open R-numbers** whose subjects issue #11 records only by number. If a future set or a
new format changes what the catalogue models, 602 is the row to reopen first.
