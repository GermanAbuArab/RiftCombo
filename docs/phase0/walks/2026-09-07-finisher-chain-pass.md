# Finisher pass — the conquer-engine lane (rc-walk-chain, 2026-09-07)

Lane: the ENGINE entries that produce `conquer-engine`, feed no finisher variant, and can add
Mind to their identity. Assigned by rc-manager4 after rc-walk-order measured the field; the
`ability-points` half of the same measurement belongs to that lane and is not touched here.

Card text is quoted from `data/corpus_flat.txt`. Every rule paragraph below was opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` and pasted, not recalled.

---

## 1. The field, measured

Reproduced the manager's filter independently. My probe reads **699 entries / 1496 variants** and
**36 rows** in the conquer-engine bucket against the forwarded **697 / 31**. Same filter and the same
definition of "feeds a finisher variant" (the head of the variant is BURST / CHAIN / ALT_WIN /
INFINITE). The tree moved between the two runs; the five extra rows are new entries, not a filter
difference. Recorded as drift, not as a disagreement.

**The bucket is homogeneous, and that is the lane's central result.** I read the `terminatesIn` of
all 36 and **not one claims more than 2 points a turn**. Each says in its own words that
469.1 + 470 + 485.4 cap it: 470 is *"A player may only Score, from either method, once per
Battlefield per turn."* and a Duel puts two battlefields on the table. So:

- every row buys a Conquer worth exactly **1 point**;
- 2 Conquers a turn is 4 over two turns and 6 over three;
- **no conquer-engine reaches 8 by being wired to Time Warp.**

The connection to a finisher therefore never runs through the engine. It runs through a conquer
**payoff** times a **multiplier**, with the engine supplying the Conquer — and specifically the
*bloodless* Conquer, for the reason in §3.

## 2. The sweep correction that opens the lane

Swept every card in the pool whose text gains a point, on `data/corpus_flat.txt`:

```
grep -inE "score [0-9]+ point|score 1 point|gain [0-9]+ point|scores? [0-9]+ point" data/corpus_flat.txt
```

**Thirteen cards, named, as of 2026-09-07:** `OGN-034` Tryndamere Barbarian, `OGN-066` Ahri Alluring,
`OGN-205` Yasuo Windrider, `SFD-088` Renata Glasc Mastermind, `SFD-115` Trinity Force, `SFD-148`
Draven Audacious, `SFD-214` Power Nexus, `UNL-177` Ivern Friend to All, `VEN-046` Nasus Ascended,
`VEN-053` Otterpus (a denial, not a gain), `VEN-065` Swain Visionary, `VEN-067` Bottled Constellation,
`VEN-138` Shen Leader of the Kinkou Order.

`CLAUDE.md`'s BURST-saturation sweep says *"six cards score on a Hold or a Conquer (Ahri, Trinity
Force, Ivern Friend to All, Shen, Nasus Ascended, Power Nexus), all catalogued under at least one
multiplier"*. **The hold-or-conquer subset of the thirteen is EIGHT, not six**: those six plus
`OGN-034` Tryndamere and `VEN-065` Swain. Tryndamere *is* catalogued under a multiplier
(`tryndamere-brambleback-conquer`). **Swain was under none.**

Card-set containment check, run because the variant graph cannot answer it (the manager's warning,
after the same blind spot cost rc-walk-order a filter):

| card set | contained in an existing entry? |
|---|---|
| `VEN-065` + `UNL-029` (Red Brambleback) | **NONE** |
| `VEN-065` + `OGN-286` (Reckoner's Arena) | **NONE** |
| `VEN-065` + `SFD-059` (Svellsongur) | **NONE** |
| `SFD-148` + `UNL-029` | **NONE** |
| `OGN-034` + `UNL-029` | `tryndamere-brambleback-conquer` |

Swain's only two entries (`swain-double-conquer`, `swain-shurelya-double-conquer`) both take 8 across
**two** Conquers, one of them needing `infinite-energy` **and** `infinite-power` to pay for itself.

## 3. Why the bloodless Conquer is the join

**383.4.c.2** — *"This category of Triggered Abilities encompasses only those that are triggered from
Units that were present during the Conquer action, or Abilities that reference the player that
performed the Conquer action."* — with **383.4.c.2.a** — *"The Conquer Abilities of Units are put on
the Chain as Pending Items after the Unit(s) these effects correspond to are present at a Battlefield
when a player gains control of it and gains 1 Victory Point from Conquering."*

A conquer trigger is **presence, not participation**. Nothing has to attack and nothing has to be the
mover. With **144.3** — *"Players may perform multiple Units' standard move simultaneously. This is
treated as one game action performed on multiple Units."* (144.3.a shared Destination, 144.3.c
simultaneous exhausts) — a whole pack of payoff bodies arrives in one action.

And **465.1** — *"If both Attacking and Defending units remain at this battlefield, the following
Tasks become Outstanding, in the specified order:"* — means an empty target has no damage step, so
none of the pack dies before the Conquer resolves. On an open battlefield the route is
**450 → 344.2 → 348.2.a → 348.2.a.1**:

- **344.2**: *"If Control of a Battlefield is Contested, there aren't units controlled by different
  players there, and the turn is in a Neutral Open State, a Showdown is opened during the next
  Cleanup."*
- **348.2.a**: *"If only one player's Units remain at the Battlefield, and if that player does not
  already Control the Battlefield, that player establishes Control over the Battlefield."*
- **348.2.a.1**: *"This results in a Conquer if that player has not yet scored that Battlefield this turn."*

**That is exactly what seventeen of the 36 rows in this bucket manufacture**, and it is the whole
reason the bucket is worth anything to a finisher: it is not a point source, it is a way of making
every payoff body in the pack fire and survive.

## 4. Entry staged — `swain-brambleback-conquer-burst`

`VEN-065` Swain, Visionary ×3 + `UNL-029` Red Brambleback ×2. Fury/Mind.

- Verbatim: *"Swain, Visionary | Unit | Mind | E6 P1 M6 | [Vision] ... When I conquer, if you've
  played a non-token unit, a non-token gear, and a spell this turn, you score 1 point."*
- Verbatim: *"Red Brambleback | Unit | Fury | E4 P1 M4 | [Accelerate] ... Your conquer effects for
  conquering here trigger an additional time. When I conquer, [Buff] a friendly unit."*

**R1 = A with stacking** is ruled for Red Brambleback by name (issue #11): N copies give N+1
instances. Two Bramblebacks ⇒ each Swain trigger fires three times.

One Conquer: **1 Score** (469.1, allowed once by 470) **+ 9 ability Gains = 10**, in a single scoring
event ⇒ BURST. The Gains are 194.1.c — *"Spells, Triggered Abilities and Activated Abilities that
instruct them to gain one or more points."* — not Scores (R2 = A), so 470 never touches them, and
471.1.a.1 says it from the other end: *"Notably, points Gained from sources that are not Conquer are
not beholden to these restrictions."*

**The whole curve on this card set**, written down so nobody re-derives it:

| Swain | Brambleback | instances each | Gains | + Score | total | class |
|---|---|---|---|---|---|---|
| 3 | 1 | 2 | 6 | 1 | **7** | one short — CHAIN only by taking the second battlefield |
| 2 | 3 | 4 | 8 | 1 | 9 | BURST, E24 + 2 Mind + 3 Fury |
| **3** | **2** | **3** | **9** | **1** | **10** | **BURST, E26 + 3 Mind + 2 Fury — staged** |
| 3 | 3 | 4 | 12 | 1 | 13 | ceiling |

Swain's condition is measured in the Main Phase because **383.2.a.1** makes it part of the Trigger
Condition: *"Any additional conditional statement immediately after the Condition must be true in
order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger
Condition and not the Effect."*

Checked, not assumed: neither card is Signature (the `signature` field in `data/cards.json`), **no
legend in the pool carries the Swain tag**, so 103.2.d.2 forces nothing. Fury/Mind legends measured
over `cards.json` on 2026-09-07 — **three names, six base codes**: Daughter of the Void
(`OGN-247`/`OGN-299`), Mechanized Menace (`SFD-181`/`SFD-240`), Virtuoso (`UNL-181`/`UNL-226`).
`data/legality.json` has 21 entries, its only non-banned row is `restricted ["OGS-019"]`, and neither
`VEN-065` nor `UNL-029` appears in any row.

## 5. Refusals, each with its scope

**5.1 Swain can never be bridged onto a Hold — scoped to Swain, and now confirmed for the colourless
bridge as well.** `OGN-286` Reckoner's Arena (*"When you hold here, activate the conquer effects of
units here"*, **Colorless**) and `SFD-030` Skyfall of Areion (*"My hold effects are also conquer
effects, and vice versa"*, Fury) both fail on the phase order and not on domains. **315.2.b.2** is
*"The Turn Player Holds all Battlefields they Control."* inside the Beginning Phase (315.2); the Main
Phase is 316. At the instant of a Hold you have played nothing this turn, and 383.2.a.1 makes that
part of the Trigger Condition. `CLAUDE.md` already records this refusal for Skyfall; **this walk
confirms it transfers unchanged to the Arena**, which is the bridge that would otherwise cost no
domain at all. The refusal says nothing about the other conquer payoffs under either bridge.

**5.2 No conquer-engine in the bucket becomes a finisher on its own — scoped to the 36 rows as
written.** §1: each buys 1 point per Conquer and 470 + 485.4 cap the turn at 2. This refuses
"connect a conquer-engine to Time Warp" as a general strategy, **not** any individual engine as a
feeder — §3 is the constructive half of the same finding.

## 6. Handoff — the durable half (`/tmp` is not guaranteed to survive)

- **Lane**: the 36 (manager's 31) `conquer-engine` ENGINE rows; opened 699 entries / 1496 variants.
- **Staging file**: `/tmp/rc-walks/rc-walk-chain.json`, **1 entry**, appended never overwritten.
- **Exact next step, in order:**
  1. **`swain-brambleback-bloodless-chain`** — the 3 Swain + 1 Brambleback row of the §4 table: 7 at
     one battlefield plus a second Conquer elsewhere for 8 across two scoring events, cheaper than
     the staged BURST (E22 + 3 Mind + 1 Fury) and a **CHAIN**, which is this lane's class. The second
     Conquer wants a Fury body that takes a battlefield alone: `OGN-035` Vayne, Hunter — *"Vayne,
     Hunter | Unit | Fury | E4 P1 M2 | [Assault 3] ... If an opponent controls a battlefield, I enter
     ready. When I conquer, you may pay 1 Energy to return me to my owner's hand."* — is already the
     lane engine `vayne-hunter-sun-disc-two-conquers` and is Fury, so the identity holds. **Not
     walked. Its combat survivability was never checked** (Might 2 body).
  2. Read the other 16 bloodless rows of the bucket for a feeder that is Fury, Mind or colourless.
     `UNL-207` Amateur Recital is **Colorless** (*"When you hold here, you may move a unit at a
     battlefield to its base."*) so it fits any identity, but it is a **battlefield** — 103.4.c and
     485.4.a constrain it and it moves only ONE unit.
- **Cross-lane lead, handed back to whoever owns `ability-points`, not mine**: `SFD-148` Draven,
  Audacious is the thinnest point card in the pool at 2 entries and **both count one copy**.
  **466.3.c** is *"Units at this battlefield inherit the same combat result as their controllers"*,
  so three Dravens in one won combat are three separate *"The first time I win a combat each turn"*
  triggers — 383.3.e.1 caps a **Triggered Ability**, and each copy has its own.
  `draven-glorious-executioner-point`'s own notable says the trigger *"caps Draven at one point per
  turn no matter how many combats he wins"*, which is true of one copy and **wrong of three**.
