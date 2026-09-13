# What an ENGINE audit should check — a scope, with the evidence for it (rc-gap, 2026-09-13)

rc-manager7 asked for the scope before the day is spent, and said the question is worth more than any
particular finding: **the five finisher audits (#165, #166, #175, #189, #192) checked arithmetic,
legend censuses, quote fidelity and rule references — and an ENGINE has no arithmetic to check.**
This is the answer, with a measurement behind each claim rather than a list of good intentions.

## 1. THE STRUCTURAL ANSWER, IN ONE LINE

**A finisher's claim is a QUANTITY and an ENGINE's claim is a RATE.** *"This reaches eight points"*
is settled by addition, which is why every finisher audit is an arithmetic audit and why
`scripts/adversarial-check.mjs` could be written at all. *"This produces X, repeatably"* is not a sum
— it is an assertion about **how often** and **for how long**, and those are settled by the RULES.

So an engine audit has three questions the finisher audits never had to ask, and they are in
dependency order: **can it start, can it repeat, and does it come back to where it began.**

## 2. THE FIVE CHECKS, RANKED BY WHETHER THEY READ THE RULES OR THE PROSE

The ranking is the lesson from the requirement sweep: **a predicate that reads how an author phrased
something needs three or four narrowings and keeps a false-positive taxonomy; one that reads a rule
needs one.** Ship the rules-grounded ones; keep the prose ones as probes a human runs and reads.

**C1 — CAN IT START? (rules-grounded, already built, already shipping.)** The requirement gap:
190.1 makes Control of a battlefield need a body, so an entry whose payoff sits on a battlefield
whose text says *"you"* and which supplies no unit cannot begin. **14 entries, every one an ENGINE**,
and `power-nexus-rune-recycle-any-identity` is a one-row entry that matches complete and cannot
execute a step. Routed to rc-schema. **Companion measurement from rc-manager7: 122 entries carry no
unit in `uses` at all, 64 of those also use a body word with no `needs`, and 63 of the 64 are ENGINE.**

**C2 — CAN IT REPEAT AT THE RATE IT CLAIMS? (rules-grounded, NEW, evidence below.)** 381 confines an
Activated Ability to your own turn in an Open State and 415.3.a readies non-spell Game Objects only
in YOUR Awakening, so **an ability whose cost is an exhaust fires once per turn**, and `CLAUDE.md`
measures that **exactly eleven cards in the pool have an activated ability repeatable WITHIN a turn,
and all eleven are units.** An ENGINE claiming a within-turn repeat must stand on one of those eleven
or name a within-turn READY. **That is a rate claim checked against a rule, which is exactly the
shape that worked.**

**C3 — DOES IT RETURN TO ITS STARTING STATE?** The INFINITE class already has this discipline and the
ENGINE class has never had it: `CLAUDE.md`'s loop ledger demands an entry **name the recycle slot AND
the matching draw**, and the *"zero spare draws"* invariant is load-bearing four separate ways. An
ENGINE that spends a resource each pass and never names what restores it is a ONE-SHOT wearing an
engine's label. Prose-grounded, so a probe rather than a test.

**C4 — DOES `produces` MATCH THE STEPS?** `produces` is what the variant graph routes on, so a tag
that the steps never deliver is the `uses` defect one level up — it mis-wires the graph instead of
the matcher. Mechanical to sample, and I have not measured it.

**C5 — WHAT KILLS IT?** #203 found a shipped ENGINE with no stated point of failure and the reason
nobody saw it is that `scripts/adversarial-check.mjs` sweeps the 80 finishers. An ENGINE that loses
its enabler loses tempo where a finisher loses the game — which is exactly why the answer is *"name
it in a notable"* and not *"refuse the entry"*.

## 3. THE EVIDENCE FOR C2, WHICH IS THE ONE I WOULD BUILD NEXT

Measured (`.scratch-gap/engine-rate.mjs`, non-vacuity printed: 686 ENGINEs, 1,042 printings, the
eleven pinned from `CLAUDE.md`):

- **47 ENGINEs claim a WITHIN-TURN repeat** — *"repeat while"*, *"as many times as"*, *"again this
  turn"*, *"while Energy lasts"*.
- **7 of those use a card whose text carries an exhaust cost.**
- **4 use one of the eleven within-turn-repeatable cards**, which is the sanctioned escape.
- **6 claim a within-turn repeat, use an exhaust-costed card, and use none of the eleven.**

**And reading the first of the six is what makes the check honest rather than a trap.**
`dominus-xerath-henge-removal` is CORRECT: `VEN-142 Dominus` grants *"2 rainbow Power: Ready me"*, and
its step 5 states the ordering outright — *"415.1: he must be exhausted for it to do anything, so the
order is always fire, then ready"*. **A within-turn READY is the second sanctioned escape, and the
entry names it.** So C2 is three conditions, not two, and the third was found by reading a hit rather
than by reasoning — which is the same way every other exception in this fleet's checks was found.

## 4. THE SCOPE I PROPOSE, AND WHAT I AM NOT PROPOSING

**First pass: C2 to completion** — finish the six, fold in the readier exception, and report the rate
defects. It is small, it is rules-grounded, and it checks the sentence an ENGINE actually asserts.
**Then C4**, because it is mechanical and unmeasured. **Then C3 as a probe**, not a test.

**I am NOT proposing a 686-entry read.** The finisher audits could read 80; the ENGINE class is nine
times that, and an audit that cannot be finished produces a number nobody can act on. **Every check
above is a population filter that ends in a readable set — 14, then 6 — and that is the design
constraint, not an accident of tooling.**

**And the honest limit: C1 and C2 together check that an engine can START and can REPEAT. Neither
checks that what it produces is WORTH anything.** That is the judgement `terminatesIn` is supposed to
carry, no rule decides it, and I would not pretend a predicate can.

---

## 5. C2 RUN TO COMPLETION THE SAME HOUR IT WAS PROPOSED: **A MEASURED EMPTY, AND THE REASON IS THE FINDING**

All six candidates read. **Zero defects.** Three are correct and three are false positives, and both
halves are informative.

**The three that are CORRECT each name the sanctioned escape IN THEIR OWN STEPS:**

- `dominus-xerath-henge-removal` — `VEN-142 Dominus` grants *"2 rainbow Power: Ready me"*, and step 5
  states the ordering outright: *"415.1: he must be exhausted for it to do anything, so the order is
  always fire, then ready"*.
- `the-boss-showstopper-redeploy` — step 3: *"'When you conquer, ready me' readies The Boss, so the
  shield is armed again this turn."*
- `scrutinizing-sergeant-blood-rose-xp-spike` — step 4: *"Spend 3 XP and exhaust Blood Rose to ready
  a unit — a second Standard Move (144.2) or a second activation of any exhaust ability on the
  board."*

**The three FALSE POSITIVES are two distinct instrument faults, and naming them is what the next
person needs:**

1. ***"repeat for as long as"* IS A SUSTAIN PHRASE, NOT A WITHIN-TURN RATE CLAIM.**
   `last-rites-lunar-boon-trash-recursion` and `blade-ruined-king-detach-recovery` repeat ACROSS
   TURNS — conquer, then hold at the next Beginning Phase. My `WITHIN` regex could not tell "repeat
   within this turn" from "repeat indefinitely".
2. **THE EXHAUST MAY BE ON A CARD THAT IS NOT THE REPEATED ABILITY.**
   `last-rites-stack-arena-reanimator` fires four times in one Beginning Phase, but those are
   TRIGGERED abilities appended by 434.1.c — and 381 and 415.3.a govern ACTIVATED abilities, so the
   once-per-turn rule never applied to it. My test asked whether ANY `uses` card contains an exhaust
   symbol, which is not the same question.

**THE CORRECTION TO MY OWN SCOPE, MADE WITHIN THE HOUR: C2 IS LESS RULES-GROUNDED THAN I CLAIMED.**
The RULE half is solid — 381 with 415.3.a makes an exhaust-costed activated ability once per turn.
But **"which ability is the one being repeated" is a PROSE question**, and that is the half that
produced both faults. By this file's own standard — *when a prose predicate needs its third
narrowing, stop tuning it and ask whether a rule decides the same question* — **C2 has reached its
third narrowing and should not be ship as a test.** It was worth running; it is not worth automating.

**AND THE EMPTY EXPLAINS ITSELF, WHICH IS THE ONLY KIND OF EMPTY WORTH REPORTING.** The within-turn
repeat is a claim these authors already knew they had to justify, because `CLAUDE.md` carries the
once-per-turn rule prominently — 381, 415.3.a, and the measured eleven cards. **Three of six entries
name their readier unprompted, in the step where it matters. The defect is not in the catalogue
because the rule is in the file**, which is the first direct evidence I have seen that the file does
the job it is kept for.

**SO THE REVISED ORDER IS: C1 (shipped), then C4, then C3 as a probe.** C4 — does `produces` match
the steps — is now the next candidate: it is mechanical, it needs no prose beyond a tag comparison,
and **it is unmeasured, so I am not claiming a yield for it in advance.**
