# The Might-1 survivability lens, re-measured — and a static +1 answers one card

Lane `rc-kw`, 2026-09-13, for rc-manager7. Three faces of one question.

Yesterday `CLAUDE.md` said `OGN-133 Flurry of Blades` is the universal answer to a 1-Might token line
and that `UNL-077 Soul Shepherd` is *"the only fix in the pool"*. That uniqueness claim was measured
and is false — five of six domains print a static +N Might grant. **Nobody had re-run the downstream
arithmetic, and this is that re-run.**

**The headline is a number that was not asked for and settles all three faces: of the twenty cards in
the pool that remove more than one body in one action, a static +1 escapes exactly THREE.** The lens
was never really about Flurry of Blades; it was about Flurry of Blades because that is the only card
anybody had counted.

---

## Face one — the real threat census

**Predicate.** The manager's `/deal [0-9]+ to all/i` returns 10 printings and is narrow by
construction: it cannot see a kill-by-threshold, a mass bounce, a symmetric kill, or any wording that
is not *"deal N to all"*. I cast wide on the **object** — any plural or collective reference to units
— which returns **59 of 936 corpus lines**, and then **read all 59**. Twenty remove more than one body
in one action; the other 39 are grants, statics, battlefields and self-buffs.

The column that decides the lens is **the minimum Might needed to survive**. 143.2.a kills on marked
damage at or above Might, so a body of Might M survives a *"deal N"* sweeper iff **M > N**; a
threshold removal at *"≤ T"* needs **M > T**; a kill-all or return-all needs nothing less than absence.

| min M | card | domain | cost | speed | kind | scope |
|---:|---|---|---|---|---|---|
| 2 | `OGN-133` Flurry of Blades | body | E1 | **Reaction** | deal 1 | all battlefields |
| 2 | `OGN-200` Twisted Fate, Gambler | chaos | E4 M4 | — | deal 1 (one rune mode) | here |
| 2 | `OGN-041` Volibear, Furious | fury | E10 P2 M9 | — | split 5 | here |
| 3 | `OGN-127` Cannon Barrage | body | E2 P1 | **Reaction** | deal 2 | **in combat only** |
| 3 | `VEN-019` Renekton, Rage Fueled | fury | E6 M6 | — | deal 2 | here |
| 3 | `UNL-132` **Angler Beast** | chaos | E5 P1 M5 | — | **return ≤2** | **everywhere** |
| 4 | `OGS-002` Firestorm | fury | E6 P1 | — | deal 3 | one battlefield |
| 4 | `OGS-018` Tibbers | fury/chaos | E8 P2 M7 | — | deal 3 | all battlefields |
| 4 | `OGN-148` Anivia, Primal | body | E7 P2 M8 | — | deal 3 | here |
| 5 | `OGN-190` Kog'Maw, Caustic | chaos | E3 P1 M1 | — | deal 4 (Deathknell) | its battlefield |
| 6 | `VEN-133` Glowstone | order | E2 | — | deal 5 | units they control |
| 6 | `VEN-091` Corrupted Dragon | body | E10 P2 M10 | — | move ≤5 | here |
| 13 | `OGN-123` Unchecked Power | mind | E7 P2 | — | deal 12 | all battlefields |
| **any** | `OGN-268` Bullet Time | body/chaos | E1 + X rainbow | Action | deal X | one battlefield |
| **any** | `OGN-250` Stormbringer | fury/body | E6 P2 | — | deal = a friendly Might | one battlefield |
| **any** | `UNL-192` Alpha Strike | calm/body | E3 P1 | Action | split = a friendly Might | battlefields |
| **any** | `UNL-107` **Stare Down** | body | **E2** | — | **move < chosen Might** | one battlefield |
| **any** | `UNL-180` The Ruination | order | E9 P3 | — | kill all | everywhere |
| **any** | `SFD-147` Downwell | chaos | E8 P2 | — | return all | everywhere |
| **any** | `OGN-159` Warwick, Hunter | body | E6 P1 M5 | — | kill all **damaged** | here |

- A Recruit at Might 1 is beaten by **all 20**.
- A static +1 takes it to Might 2, which escapes **3 of 20**.
- Might 3 would escape **6 of 20**.
- **Seven escape no Might at all** — kill-all, return-all, or a threshold the attacker chooses.

**Three findings the damage-only predicate cannot see.**

1. **`UNL-132 Angler Beast` is the card the whole lens should have been measured against.** *"When you
   play me, return all units with 2 `[M]` or less to their owners' hands."* It is a **bounce**, so the
   Plaza's *"if you have 7+ units here"* fails just as completely as a kill — and **Might 2 does not
   escape it**, which is exactly where a +1 lands a Recruit. It carries no location clause, so it
   reaches every battlefield.
2. **`UNL-107 Stare Down` is the cheapest unconditional answer in the pool and costs 2 Energy.**
   *"Choose a friendly unit and a battlefield. Move all enemy units at that battlefield with less
   Might than the chosen unit to their base."* The threshold is the attacker's own choice, so no
   amount of +Might escapes it, and this project already records that 355.10.d makes it
   **programmatic** — it targets nothing, so no `[Deflect]` tax is paid for any number of bodies.
3. **`VEN-133 Glowstone` reaches Might 5 for 2 Energy** (*"At the end of your turn, kill this and deal
   5 to all units you control"*, handed over first). rc-manager6's handoff said it is in no entry; the
   current manager corrected that in-turn — it is in `glowstone-hot-potato-sweep`.

**On "which of these reach the scoring window" — the question needs restating, and the restatement is
the point.** The Plaza pays at **your** Beginning Phase (315.2.b.2), and 335 gives nobody priority
outside the Main Phase with an empty chain, so almost nothing acts *in* the Hold window. But the seven
bodies have to survive **the opponent's entire turn first**, and 312.2.a gives them full priority
throughout their own Main Phase. **So speed gates nothing on the threat side: every one of the twenty
has a whole turn in which to be cast.** `[Reaction]` and `[Action]` matter for whether *you* can
answer the answer, not for whether the sweeper arrives.

---

## Face two — which of the 23 Plaza entries has a domain-legal fix it does not name

**23 of 766 entries name `OGN-293` in `uses`; 20 of the 23 mention `OGN-133` somewhere** (both
re-measured here, both matching the manager's figures). Identity is computed from each entry's own
`uses`; a fix is legal when the union of that identity and the fix's domains is at most two domains
(103.1.b). **Zero of the 23 have an identity over two domains**, so no entry is defective that way.

**The fix list, re-derived from `cards.json` rather than trusted** — `CLAUDE.md`'s corrected list is
**confirmed at six members**:

| card | domains | slot cost | scope |
|---|---|---|---|
| `VEN-018` Rage Amplifier | fury | **gear** — 359.2.d enters it ready at base, no body slot | board-wide, +2 while Empowered |
| `UNL-077` Soul Shepherd | mind | unit E5 M3 | board-wide, **token-scoped** |
| `UNL-147` Baron Nashor | chaos | unit E10 P3 M12 | board-wide **+2**, but adds the Baron Pit (187.9) |
| `UNL-191` Wuju Master | calm/body | **legend** at `[Level 6]` — no card slot | board-wide |
| `OGS-013` Garen, Commander | order | unit E6 P1 M5 | *"here"* — the body also fills one of the seven |
| `OGN-243` Darius, Executioner | order | unit E6 P1 M6 | *"here"* — identical sentence to Garen |

Excluded, named so nobody re-finds them: `OGN-294 Trifarian War Camp`, `UNL-T03 Brush` and
`VEN-159 Kinkou Temple` are **battlefields**, which 485.4.a with 103.4.c makes mutually exclusive with
the Plaza; `SFD-089 Rumble, Scrapper` is Mech-scoped and a Recruit is not a Mech; `VEN-130 Aurok
General` reaches only Empowered units and a Recruit never is; `OGN-151 Lee Sin, Centered` is buff-gated
and 702.3 caps one buff per unit, so it cannot reach seven bodies; `OGN-063 Spirit's Refuge` buffs one
unit; `UNL-076 Petal Pixie` is self-only.

### The result, and the crude answer is wrong

The legality test alone says **17 already name a fix, 6 are owed, 0 have none**. But a legality test
says a fix is *legal*, **not that it is needed** — and the datum that decides is the **Might of the
garrison**, which is nowhere in the legality computation. Reading the six:

- **`spiderling-swarm-grand-plaza` — nothing owed.** `VEN-097 Spiderling` is a **card**, E3 M1, that
  prints *"I have +1 `[M]` for each other unit you control here with my name"*, so seven of them are
  **Might 7** and already clear thirteen of the twenty threats. `CLAUDE.md` records an emitted notable
  that got this backwards once; a +1 notable would get it backwards a second time.
- **`dragonstorm-confront-grand-plaza` — nothing owed.** Its garrison is played units, not tokens —
  the entry's own words are *"three Gemdragons, two Heralds, two Kadregrin and Vi"*, measured at
  Might 3 to 10.
- **Four are genuinely owed**, all with a Recruit garrison at Might 1 from `SFD-153 Eye of the Herald`
  or `SFD-168 Vanguard Armory`:

| entry | identity | legal fix | garrison |
|---|---|---|---|
| `noxian-drummer-eye-svellsongur-plaza` | calm+order | Garen **or** Darius | Recruits, M1 |
| `arise-sand-soldiers-plaza` | calm+order | Garen **or** Darius | Recruits M1 **+ Sand Soldiers M2** (187.3) |
| `corina-svellsongur-plaza` | calm+order | Garen **or** Darius | Recruits + Birds, both M1 (187.1, 187.7) |
| `plaza-armory-miss-fortune` | body+order | Garen **or** Darius | Recruits + Sand Soldiers |

**So the honest answer to face two is 4, not 6** — and the two subtracted are subtracted for the
reason the lens exists.

---

## Face three — the Azir reopening: **REFUSED-STILL**

`SFD-177 Azir, Sovereign`, **mono-Order**, E4 M4: *"`[Accelerate]` … When I attack, you may move any
number of your token units to this battlefield."*

The correction reopened the refusal on one leg: unbounded K did not help because Flurry kills every
1-Might survivor for any K, and with a legal +1 a board of Might-2 survivors is not answerable for one
Energy. **That premise is true and its implication is false, and two other legs never depended on
Might at all.**

**Leg 1 — his trigger does not fire on the board the line wants. Confirmed, unchanged.** 344.2 opens a
**Showdown** at an uncontested battlefield with no opposing units, and 323.9 marks a **Combat** only
*"at each Battlefield that Contested was applied to that have Units present controlled by opposing
players"*. 807.1.d: *"Being an attacker means the Unit has gained the Attacker designation during
Combat."* On the open board a Plaza line is written for there is no Combat, no designation, and Azir
is a 4-Energy 4-Might body. **No amount of Might touches this.**

**Leg 2 — a leg the refusal never stated, and it is the strongest.** Azir moves tokens to *"this
battlefield"*, the one he is **attacking**. 464.2.c.1 makes the Attacker the player who applied
Contested and **464.2.c.2 makes the Defender the player who did not** — so the battlefield Azir
attacks is by definition **one he does not control**. The Plaza must be one you **do** control, because
315.2.b.2 Holds only battlefields a player controls. With 485.4's Battlefield Count of 2 and 485.4.a
giving one battlefield per player, **Azir can only ever drag tokens onto the Plaza in the narrow case
where the opponent controls it.** He does not populate your Plaza; he populates the battlefield you are
taking off them.

**Leg 3 — the +1 genuinely helps here, and it is not enough.** 464.2.c.3.a makes a body arriving after
the designation an Attacking Unit at the next Cleanup, and 465.2.c.4 caps assignment at minimum lethal
— so a defender of summed Might D kills **D** tokens at Might 1 and **⌊D/2⌋** at Might 2. **The
correction is right that this arithmetic moves; it halves the losses.** It does not carry the line,
because legs 1 and 2 are Might-independent.

**Leg 4 — and the reopening's own premise, priced against face one.** *"Not answerable for one
Energy"* is exactly true: `OGN-133` at E1 no longer kills a Might-2 body. A Might-2 garrison is still
answered by `UNL-132 Angler Beast` (**a bounce at ≤2, so Might 2 does not escape it at all**),
`UNL-107 Stare Down` (**Body, E2**, threshold chosen by the attacker, no `[Deflect]` tax under
355.10.d), `OGN-268 Bullet Time` (E1 plus any amount of rainbow), `UNL-180 The Ruination` and
`SFD-147 Downwell`. **The +1 moves the cheapest answer from one Energy to two and removes none of
them.**

**Verdict: REFUSED-STILL.** The refusal's arithmetic was re-derived rather than inherited, one leg of
it did move, and the refusal survives on two legs that never turned on Might — one of which the
original refusal did not state.

---

## Method notes

**My own instrument failed once, in the documented way, on the list I was sent to verify.** A first
pass at the +N list dropped `OGN-243 Darius, Executioner`, which prints the **identical sentence** to
`OGS-013 Garen, Commander`. His `[Legion]` **reminder text** ends *"…played another card this turn)"*
with no sentence-ending period, so the clause carrying the `+1` absorbed a *"this turn"* belonging to a
different keyword and my duration filter disqualified him. `CLAUDE.md` records that the **first** pass
of this same list misread **scope** from the match window; mine misread the **disqualifier** from it.
Same trap, opposite direction, same fix: **strip reminder parentheses before splitting into clauses,
and read the hits.**

**A legality test answers a different question than the one being asked.** Face two's crude result was
6 owed; reading the entries made it 4. Both subtractions — Spiderlings at Might 7, Dragonstorm's played
units — are cases where a fix is perfectly legal and completely unnecessary, and neither is visible to
a domain computation. This is the emitted-notable defect (`spiderling-swarm-grand-plaza`, Might 7 read
as Might 1) arriving from a second direction, on the same entry.

**Token Might is a rules fact, not a card fact**, and all of it is in 187: Recruit 1 (187.1),
Sprite 3 (187.2), Sand Soldier 2 (187.3), Mech 3 (187.4), Reflection 0 (187.6), Bird 1 with Deflect
(187.7), Tentacle 1 (187.10), Shadow Clone 0 (187.11). An entry's garrison Might cannot be read off
`cards.json`, because the token has no printing.

---

## Appendix — the exact notable text for the four owed entries

The manager holds `data/combos.json`; this lane does not edit it. **Paste as one new entry in
`prerequisites.notable`.** Written here rather than sent over `maestro send`, because the text carries
backticks and square brackets that an interactive zsh on the receiving side would evaluate and glob.

### For `noxian-drummer-eye-svellsongur-plaza`, `corina-svellsongur-plaza` and `arise-sand-soldiers-plaza` (all calm+order)

> A DOMAIN-LEGAL +1 EXISTS, IT COSTS NO EXTRA SLOT, AND IT BUYS EXACTLY ONE CARD. `OGS-013 Garen,
> Commander` and `OGN-243 Darius, Executioner` are both mono-Order and print the identical sentence —
> *"Other friendly units have +1 :rb_might: here"* — so either is legal in this identity, stands at
> the Plaza as one of the seven, and takes the Recruits to Might 2. Measured over the twenty cards in
> the pool that remove more than one body in one action, Might 2 escapes THREE: `OGN-133 Flurry of
> Blades`, `OGN-200 Twisted Fate, Gambler`'s one-damage mode and `OGN-041 Volibear, Furious`'s split.
> It does NOT escape `UNL-132 Angler Beast` (*"return all units with 2 :rb_might: or less to their
> owners' hands"* — a BOUNCE, so Might 2 is still caught and the Plaza's count fails exactly as it
> would to a kill), `UNL-107 Stare Down` (Body, E2, threshold chosen by the attacker, and 355.10.d
> makes it programmatic so no `[Deflect]` tax is paid for any number of bodies), `OGN-268 Bullet Time`
> (E1 plus any amount of rainbow), or the two that take everything — `UNL-180 The Ruination` and
> `SFD-147 Downwell`. So the +1 answers the card this entry already names and moves the cheapest
> answer from one Energy to two.

### For `plaza-armory-miss-fortune` (body+order)

The same text, with one clause added after *"takes the Recruits to Might 2"*:

> …and the Sand Soldiers, already Might 2 by 187.3, to Might 3 — which escapes six of the twenty
> rather than three, and makes them the only bodies in this line that clear `UNL-132 Angler Beast`.

### Not owed, and the reason belongs on the record

`spiderling-swarm-grand-plaza` and `dragonstorm-confront-grand-plaza` pass the legality test and need
nothing: seven Spiderlings are **Might 7** by the card's own printed text, and the Dragonstorm garrison
is played units at Might 3 to 10. **A legality test says a fix is legal, never that it is needed.**
