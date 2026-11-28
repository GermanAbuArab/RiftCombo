# Hand walks — the denial lens (issue #100)

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16
**Result: 6 walked, 6 HOLD — 2 as written, 4 only after a rewrite. 0 refuted.**
**All six are ENGINE and stay ENGINE. No INFINITE, no BURST, no CHAIN, no ALT_WIN.**

The bar for an ENGINE is *"the mechanism produces what the entry says"*, not *"reaches 8"*. Nothing in
this lens scores: no denial card in the pool gains a point or says you win, and 194.2 keeps *winning*
apart from *gaining points* anyway. Four of the six carried a measurement error — three in the issue,
one that the issue inherited from a different issue — and the number that fixes each is below.

The issue's structural work (§A the two priority windows, §B `cards` vs `units`, §C no lock reaches
your own Hold, §D the Warden inventory, §E Deflect is a tax) is **clean**: every rule it cites says
what it says it says. Its **arithmetic** is not, and one of its two "the walk has to decide" questions
is decided here against the shape it proposed.

`OGN-026` Brynhir Thundersong was **not** re-walked: the #98 walk already catalogued it as
`brynhir-lockout-window` and overturned §325 of this issue in the issue's own comment thread. Nothing
below touches that entry.

---

## Step 2 done first, in bulk: every citation opened

Every rule number cited by issue #100, and every one the six new entries lean on, was pulled by exact
number out of `data/Riftbound-Core-Rules-2026-07-16.txt` and read there. Rules marked *(project)* come
from `CLAUDE.md` and were not re-opened.

| cited | verbatim | verdict |
|---|---|---|
| **052** | *"Card, when written in card effects, is shorthand for 'Main Deck card.' Runes, legends, and battlefields are not considered cards when executing the abilities and effects of game objects."* | holds |
| **054.1** | *"Cards that forbid actions or effects, as a broad method of determination, supersede cards that allow or permit that same action or effect."* | holds |
| **054.2** | *"If a card specifies that an action can 'only' be performed under certain circumstances, it cannot be performed under any other circumstances."* | holds |
| **055** | *"When executing card text, do as much as you can, ignoring impossible instructions."* | holds — and note it says **card text**, which is the counter-argument to reading B of R33 |
| **107.3.c** | *"Cards can only be placed in or occupy the Facedown Zone if the controller of the card also controls the associated Battlefield."* | holds |
| **107.3.d** | *"If a player loses Control of a Battlefield, any cards in the Facedown Zone associated with that Battlefield are removed during the next Cleanup."* | holds |
| **128.4** | *"Private: … Example: If a player controls a facedown card at a battlefield, that player and only that player may read or look at that card's face, regardless of who owns that card."* | holds |
| **143.4 / 143.4.a** | *"Units enter the Board exhausted."* / *"This can be altered by Accelerate or similar game effects."* | holds — **143.4.a is the rule the issue never opened, and it is the leak in candidate 1** |
| **144.1.a / 144.1.c / 144.2** | *"This action can be done any time during a player's Main Phase."* / *"…cannot be performed during a Showdown or Combat."* / *"Exhausting the Unit is the Cost for this action."* | holds |
| **144.4 / 144.4.a / 144.4.b / 144.4.c.1** | *"The Destinations where Units can Move to with their Standard Move are restricted:"* / *"Units may move from their Base to a Battlefield."* / *"Units may move from a Battlefield to their Base."* / *"Units with Ganking may use their Standard Move to Move from Battlefield to Battlefield."* | holds — **and this is what refutes candidate 1's arithmetic**, see §1 |
| **155** | *"A spell can be played during an Open State outside of Showdowns on its controller's turn."* | holds |
| **161.2.b** | *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* | holds |
| **167 / 167.1** | *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."* / *"Any unspent Energy or Power are lost."* | holds |
| **164.2.a / 164.2.b / 164.2.b.1** | *"[E]: [Reaction] — Add [1]."* / *"Recycle this: [Reaction] — Add [C]."* / *"The Power added this way corresponds to the Domain of the Rune that is being recycled."* | holds — 164.2.b carries no exhaust, 164.2.b.1 is what makes the Power domain-specific |
| **185 / 185.2.a** | *"Tokens are not cards."* / *"Tokens can be played by their owner if their card type is played, following all the applicable steps for playing a card plus any restrictions or modifications from the effect that created the token."* | holds |
| **190.1 / 190.6.d** | *"Control is established over Battlefields through the course of play."* / *"…If the battlefield has no Controller, 'you' refers to no one, and all such instructions are ignored."* | holds |
| **194.1 / 194.1.a–d / 194.2** | the four ways to gain points / *"A player wins the game if, in a cleanup, they have points greater than or equal to the Victory Score and more points than any other player."* | holds |
| **310.2** | *"Neutral Closed: There is no Showdown or Combat in progress and a Chain exists."* | holds |
| **312.2.a / 312.2.b / 312.2.c / 312.2.d** | *"When the turn is in a Neutral Open State during **their** Main Phase."* / *"…Showdown State and they gain Focus."* / *"…Closed State, all pending chain items finish being finalized, and they control the next item on the Chain."* / *"…they are the next Player in Turn Order, and the player with Priority passes."* | holds — §A of the issue is exactly right |
| **315.1.b / 315.2.b.2 / 315.3.b / 315.4.b / 316 / 316.3** | Awaken readies → Beginning Phase **Holds** → Channel 2 → Draw 1 → Main Phase → *"Each player's Rune Pool empties."* | holds — §C of the issue is exactly right |
| **319.5** | *"After a Chain Item is removed from the Chain for any reason"* [a Cleanup becomes an Outstanding Task] | holds |
| **323.9 / 323.13** | *"Mark a Combat as Staged at each Battlefield that Contested was applied to that have Units present controlled by opposing players."* / *"If the current state is a Neutral Open State and one or more Combats are Staged at Battlefields, the Turn Player chooses one of those Battlefields. Combat begins there."* | holds |
| **335** | *"…If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown, and it is any other phase of the turn, proceed to the next substep, step, phase, or turn."* | holds — with an empty chain nobody gets priority outside the Main Phase |
| **350.2** | *"Tokens are not cards, but can still be Played."* | holds |
| **355.2.a / 355.2.b** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* / *"Some Game Effects may grant players permission to play Units to locations that are not normally Valid."* | holds |
| **356.2.a.2** | *"The cost imposed by the Deflect keyword is a Mandatory Additional Cost."* | holds |
| **359.3.f.1 / 359.3.f.2** | *"Some information used by abilities is referenced from the source of those abilities…"* / *"Information referenced in an instruction in this way will be checked on execution of the instruction."* | holds |
| **415.1 / 415.1.b** | *"Readying is an action that marks a non-spell Game Object on the board as available for action."* / *"A Unit that is already Ready cannot be Readied again."* | holds |
| **416.1** | *"Recycling cards is the action in which a player takes one or more cards from a specific zone and then puts it on the bottom of the corresponding deck."* | holds |
| **420.3.a** | *"The Cost is Exhausting one or more Units."* | holds |
| **421.4** | *"If a facedown card would change zones or if the game ends, its owner reveals it to all players."* | holds — the pivot of R33 |
| **423.1.a.1 / 423.1.a.2 / 423.1.b / 423.1.c** | *"A Stunned Unit can not be Stunned again."* / *"Stunned Units lose the Stunned status during step 3d of the **end of turn** cleanup."* / *"A Stunned Unit does not contribute its might to damage in the combat damage step."* / *"A Stunned Unit must still have damage applied to it equal to, or greater than, its full might value to be killed."* | holds — **and 423.1.a.2 + 423.1.c together refute candidate 6's stated function**, see §6 |
| **424.1 / 424.1.a** | *"Revealing is the act of presenting a card to all players from a zone that one or more players do not have access to the information of."* / *"Revealed is a temporary state and is not a zone."* | holds |
| **441.2** | *"'Empowered' is a state for Game Objects on the board that other game effects and abilities can [reference]."* | holds |
| **461 / 461.3 / 464 / 464.1** | *"Combat is considered Staged if there are units controlled by two opposing players at a Battlefield but the Steps of Combat have not been initiated."* / *"…it will open as a Combat Showdown."* / *"Step 1: The Combat Showdown Step"* / *"Combat will open in one of two ways…"* | holds — the window the Saboteur closes |
| **465.2.c** | *"Starting with the Attacker, each player assigns an amount of damage equal to their summed Might among the other's Units."* | holds |
| **466.1.a.1 / 466.1.a.2** | *"Insert '3c. Heal all Units.'"* / *"Insert '3d. Recall Attackers present at the Battlefield if Defenders are still present.'"* | holds — the Saboteur cannot camp |
| **467 / 469.2 / 470** | *"Scoring is the act of a Player gaining a point…"* / *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."* / once per battlefield per turn | holds — **469.2 is what makes Ashe's banish permanent on an opponent who controls nothing**, see §4 |
| **762 / 762.1 / 762.2** | *"When instructed to name a card, a player must name a card that is legal in the Format being played."* / *"They cannot name a card that doesn't exist."* / *"A player cannot choose the name of a token when instructed to name a card."* | holds |
| **805.1.a** | *"Accelerate is functionally short for 'As you play me, you may pay [1][C] as an additional cost. If you do, **I enter ready**.'"* | holds — 26 units in the pool carry it |
| **809.1.c / 809.1.c.1** | *"…cost an amount of Power equal to [Deflect Value] more to play as an additional cost for each time they choose [me/this]."* / *"The Power used to pay this cost may always be of any Domain."* | holds |
| **810.1.c.3** | *"It does not give additional abilities or activations of Movement, only new options for the Standard Move."* | holds |
| **811.1.b / 811.1.c.1 / 811.1.c.3 / 811.1.d.1 / 811.1.d.2** | *"…you may pay [A] to hide this facedown at a battlefield you control… Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its base cost."* / *"Hide is not a subset of Play."* / *"Playing a card from facedown (or 'from Hidden') does open a chain."* / *"A hidden permanent must be played to that battlefield."* / *"…those targets must be chosen from among options at that battlefield, unless the ability explicitly restricts targeting in a way that makes this impossible."* | holds |
| **813.1.c.1 / 813.1.c.2** | *"On Cards: 'This can be played during Closed States on any player's turn.'"* / *"On Activated Abilities: …"* | holds |
| **103.1.b.1 / 103.2.b / 103.4.c** | Domain Identity / 3 copies of a named card / no two battlefields of a name | holds |
| **206** *(project, #98)* | *"Effects that need to determine a card's cost for any purpose always use its printed or copied cost, even if that cost is increased…"* — worked example **Defy** | holds — **it is what stops the Helm from widening any counter**, see §5 |

**Nothing in the table contradicts what cited it.** The citation audit is clean; four of the six
candidates' measurements are not.

### Ban check

`grep -n 'BANNED' data/corpus_flat.txt` returns exactly 12 lines (one of them the header comment).
The banned bases are `OGN-168`, `OGN-177`, `OGN-182`, `OGN-276`, `OGN-284`, `OGN-285`, `OGN-290`,
`OGN-292`, `SFD-020`, `SFD-122` and `OGS-019` (2v2 restricted only). **None** of `OGN-070`,
`SFD-060`, `OGN-018`, `UNL-190`, `UNL-169`, `VEN-132`, `VEN-045`, `UNL-150`, `UNL-057`, `UNL-171` is
among them, and `data/legality.json` touches none of them either.

### Card text, verbatim from `data/corpus_flat.txt`

```
OGN-070 | Mageseeker Warden | Unit | Calm | E6 P1 M5 | While I'm at a battlefield, opponents can only
  play units to their base. While I'm at a battlefield, spells and abilities can't ready enemy units
  and gear. [Tags: Demacia]
SFD-060 | Tianna Crownguard | Unit | Calm | E7 P2 M4 | [Deflect] (Opponents must pay
  :rb_rune_rainbow: to choose me with a spell or ability.) While I'm at a battlefield, opponents
  can't gain points. [Tags: Elite, Demacia]
OGN-018 | Noxus Saboteur | Unit | Fury | E3 M3 | Your opponents' [Hidden] cards can't be revealed
  here. [Tags: Trifarian, Noxus]
UNL-190 | Lilting Lullaby | Spell | Calm/Mind | E2 P2 | [Reaction] (Play any time, even before spells
  and abilities resolve.) Counter a spell. Its controller can't play spells this turn. [Tags: Lillia]
UNL-169 | Ashe, Focused | Unit | Order | E5 P1 M4 | When you play me, choose an opponent. They reveal
  their hand. Choose a card revealed this way and banish it. When they hold, return it to their hand
  (even if I'm no longer on the board). [Tags: Freljord, Ashe]
VEN-132 | Fallen Feline | Unit | Order | E2 P1 M3 | When you play me, name a spell. While I'm at a
  battlefield, opponents can't play spells with that name. [Tags: Cat, Piltover]
VEN-045 | Helm of Suppression | Gear | Calm | E4 P1 | [Empower] :rb_energy_4::rb_rune_calm:
  (:rb_energy_4::rb_rune_calm:: Empower this. Use only if not Empowered.) Opponents' spells cost
  :rb_energy_1: more. If this is [Empowered], they cost :rb_energy_1::rb_rune_rainbow: more instead.
UNL-150 | Vex, Apathetic | Unit | Chaos | E4 M4 | [Deflect] (Opponents must pay :rb_rune_rainbow: to
  choose me with a spell or ability.) When an opponent plays a unit while I'm at a battlefield,
  [Stun] it. They can't move it this turn. (It doesn't deal combat damage this turn.)
  [Tags: Yordle, Vex, Shadow Isles]
UNL-057 | Alpha Wildclaw | Unit | Calm | E6 P2 M7 | [Tank] (I must be assigned combat damage first.)
  Your units here with less Might than me can't be chosen by enemy spells and abilities.
  [Tags: Cat, Freljord]
```

### Measurements re-run, not inherited

| claim | command | result |
|---|---|---|
| 39 `[Hidden]` cards: 22 spells, 15 units, 2 gear | `grep "Hide now for" data/corpus_flat.txt` + `awk` on the type column | **confirmed exactly**; the 15 unit codes are the 15 the issue lists, the 2 gear are `OGN-077` and `SFD-139` |
| 7 cards grant 355.2.b | `grep -inE "play .*(enemy battlefield\|open battlefield)"` | **6 units** (`OGN-161`, `OGN-174`, `OGN-176`, `OGN-193`, `SFD-093`, `VEN-115`) **+ the battlefield `VEN-157` Dragon Roost** = 7. `SFD-079` Bard also appears in that grep and is **not** one of them: it *moves*, it does not grant a play destination |
| 10 `[Reaction][>]` activated abilities | `grep -E '\[Reaction\]\[>\]'` | **confirmed 10**; the loose form catches 11 because `UNL-031` Combat Experience is a `[Reaction]` **spell** with a `[Level 6][>]` clause, not an activated ability |
| `UNL-190` is the only counter that also locks the turn | `grep -in "counter"`, all 14 lines read | **confirmed** — of the 11 counters, only Lilting Lullaby carries *"Its controller can't play spells this turn"* |
| `VEN-132` is the only card that names | `grep -inE "name a (card\|spell\|unit)"` | **confirmed — exactly one hit in the pool** |
| how many cards reveal the opponent's hand | `grep -in "reveals\? their hand"` | **7**: `OGN-156` (Body), `OGN-192` (Chaos), `UNL-053` (Calm), `UNL-135` (Chaos), `UNL-139` (Chaos), `UNL-169` (Order), `VEN-085` (Body). **`UNL-169` Ashe is the only Order one**, which is what makes candidate 4 mono-domain |
| `[Accelerate]` units | `grep -c "\[Accelerate\]"` | **26, all units** |
| Fury/Calm legends | `grep "| Legend |" \| grep -E "Fury/Calm\|Calm/Fury"` | **exactly 1**, `VEN-139` Rogue Assassin (Akali) |
| Calm/Chaos legends | same shape | **3**: `OGN-259` Unforgiven (Yasuo), `SFD-195` Blade Dancer (Irelia), `UNL-193` Gloomist (**Vex**) |
| Calm/Mind legends | same shape | **4**: `OGN-255` Nine-Tailed Fox (**Ahri**), `SFD-189` Fire Below the Mountain, `UNL-189` Bashful Bloom (**Lillia**), `VEN-145` Curator of the Sands |

---

## §1 · Candidate 1 — the Warden delays nothing by itself. 144.4 is why, and it changes the entry

**The issue's arithmetic:** *"Bajo el Warden, cada cuerpo enemigo tarda **dos turnos** en llegar al
battlefield de Tianna: turno N lo juega en su base…; turno N+1 Awaken lo readea y recién ahí puede
exhaustearse para el Standard Move."*

Every step of that is true. **It is also true without the Warden**, which makes the delta zero on the
route it describes. 144.4 lists the only Standard Move destinations:

> **144.4.a.** Units may move from their Base to a Battlefield.
> **144.4.b.** Units may move from a Battlefield to their Base.
> **144.4.c.1.** Units with Ganking may use their Standard Move to Move from Battlefield to Battlefield.

There is no battlefield-to-battlefield move without `[Ganking]`, so a body the opponent plays to one
of *their* battlefields cannot walk to Tianna's from there at all — it would have to go home first.
The base is the staging area whether the Warden is on the board or not, and the two turns are
143.4 (*"Units enter the Board exhausted"*) plus 315.1.b, not the Warden.

**What the Warden actually takes away, measured.** Three routes, and they are the only three:

1. **The seven cards that grant 355.2.b.** Two of them — `OGN-161` Deadbloom Predator and `SFD-093`
   Dauntless Vanguard, both *"You may play me to an occupied enemy battlefield"* — deploy **straight
   onto Tianna's battlefield** with no walk at all. `OGN-193` Miss Fortune, Buccaneer grants the open
   variant to every friendly unit. 054.1 makes the Warden's prohibition beat all seven permissions.
2. **The 15 hidden units.** 811.1.b hides at *"a battlefield you control"*, 811.1.d.1 forces the play
   *"to that battlefield"*, and 107.3.c keeps that battlefield theirs. The Warden's `only` clause plus
   054.2 leaves them face down for the rest of the game.
3. **Reinforcing a battlefield they control.** Under the Warden a defender must be played to base and
   spend a turn there, so the garrison the wall has to beat is frozen from the moment you commit.
   *(project, #62: 465.2.c makes the bar the summed Might of that garrison.)*

Plus the second clause: `spells and abilities can't ready enemy units and gear`, which forbids the
opponent readying an attacker to move it a second time.

**And the leak, which the entry has to state because the corrected version no longer hides it: 26
`[Accelerate]` units.** 805.1.a is *"As you play me, you may pay [1][C] as an additional cost. If you
do, **I enter ready**"*, 143.4.a says outright that Accelerate alters the default, and *(project,
#56)* `enters ready` is **not** a ready — 415.1 defines Readying as marking an object already on the
board — so the Warden's second clause never touches it. An Accelerate body is played to base ready
and walks to Tianna's battlefield the same turn. That is candidate 6's job, and it is why the two
entries cross-reference each other.

**The finding that repairs the issue's own refutation.** The issue writes off the pair with *"el
Warden mismo es M5 sin Deflect: es la carta que el rival mata primero, y la mata con un hechizo — que
es justo lo que el Warden no niega."* True in isolation; **false in the shell this entry belongs to.**
`UNL-057` Alpha Wildclaw, already in `tianna-wildclaw-point-lock`, reads *"Your units here with less
Might than me can't be chosen by enemy spells and abilities"* at 7 Might. **The Warden is M5.** He
walks into the existing Calm wall already covered, alongside Tianna (4) and both Galio (6).

**Verdict: HOLD, rewritten.** Same two cards, different claim, and the notable now names both the
Wildclaw cover and the Accelerate leak.

---

## §2 · Candidate 2 — holds as written, with R33 = A, and with the scope written down

R33 was voted **A** on 2026-09-06: `OGN-018` Noxus Saboteur's *"Your opponents' [Hidden] cards can't
be revealed here"* forbids **playing** the hidden card at that battlefield, because 421.4 makes the
reveal mandatory on the zone change, 811.1.c.3 makes playing from facedown a zone change, and 054.1
makes the prohibition beat the permission of 811.1.b. Reading B would leave the card dead letter,
which is the R28 argument this project has used before.

The division of labour is exactly as the issue states and the re-run measurement confirms it: the
**Warden** kills the **15 hidden units** everywhere and for good (§1.2, no reading needed); the
**Saboteur** kills the **22 hidden spells and the 2 hidden gear**, but only `here`.

**Two things the issue left implicit and the entry must say.**

*Where `here` can be.* 107.3.c means the opponent only has facedown cards at battlefields **they**
control, so the Saboteur only bites standing on one — i.e. attacking. The sequence favours it: the
move happens in a Neutral Open State of your Main Phase where **312.2.a gives the opponent no
priority at all**; the Cleanup stages the Combat (323.9) and 323.13 opens it; 464/464.1 make the first
step of Combat a **Combat Showdown**, which is the first moment 312.2.b hands them Focus — and by then
the Saboteur is already there. The ambush is switched off before the window that would use it opens.

*How long.* One combat. **466.1.a.2** — *"Insert '3d. Recall Attackers present at the Battlefield if
Defenders are still present.'"* — sends the Saboteur home if the garrison survives, and if it does
**not** survive you take the battlefield, at which point **107.3.d** removes their facedown cards in
the next Cleanup anyway. Either way the Saboteur is a combat-scoped tool, not a permanent lock. That
is not a refutation; it is the scope, and an entry that sold it as permanent would be selling a lock
it cannot keep.

*Domain.* Fury + Calm, and the re-run grep confirms **exactly one legend** allows it: `VEN-139` Rogue
Assassin. That is a hard prerequisite and it goes in `prerequisites.notable`.

**Verdict: HOLD as written**, with scope and legend spelled out.

---

## §3 · Candidate 3 — holds, and the uniqueness claim survives a full grep

`grep -in "counter"` returns 14 lines; 11 are counters, 3 are anti-counter text. Read end to end,
**`UNL-190` Lilting Lullaby is the only one that adds a rider to the countered player's turn.**
`OGN-064` Wind Wall is the same unconditional counter for **one more Energy** and no rider, so the
Lullaby strictly dominates it at the price of a second domain.

Both windows the issue names check out:

- **On the opponent's turn.** Their removal spell puts a Chain Item up → 310.2 Neutral Closed →
  312.2.c/d hand you priority → 813.1.c.1 lets a `[Reaction]` card be played *"on any player's turn"*.
  One counter, and *"its controller can't play spells this turn"* takes the rest of their hand out of
  the turn.
- **In your own Scoring Step.** 335 gives nobody priority outside the Main Phase **with an empty
  chain**; the Hold trigger of the escorted entry is what puts an item on it, and 312.2.c/d then deal
  priority to both players. The mana is free **only on the winning turn**: 319.5 makes a Cleanup
  outstanding when the trigger leaves the Chain, 194.2 checks the win there, and 316.3 — the emptying
  of the Rune Pool — is a Main Phase task that never arrives. On a turn that does **not** win, a rune
  exhausted in the Beginning Phase stays exhausted for the Main Phase, because Awaken (315.1.b) is
  already past. The entry says both halves.

**Cost, counted whole.** E2 + 2 Power. 164.2.a and 164.2.b are both `[Reaction]`, and 164.2.b carries
no exhaust in its cost *(project, #44)*, so two runes pay the Energy **and** the Power: exhaust both
for E2, then recycle both for the two Power. 164.2.b.1 makes the Power match the recycled rune's
domain, so a Calm/Mind deck pays it with a Calm rune and a Mind rune. 161.2.b sends them to the Rune
Deck and 315.3.b channels 2 back next turn.

**What it does not stop, measured rather than asserted.** The lock says `spells`. Through it go the
**10** `[Reaction][>]` activated abilities (re-counted: `UNL-018`, `UNL-049`, `UNL-073`, `UNL-093`,
`UNL-145`, `UNL-185`, `UNL-197`, `UNL-T05`, `VEN-075`, `VEN-141`); every Main-Phase activated ability
of a permanent already on their board — a targeted sweep of the non-spell rows for a cost-then-kill
ability finds **at least ten** (`OGN-017`, `OGN-068`, `OGN-090`, `OGN-186`, `OGN-242`, `SFD-046`,
`UNL-026`, `UNL-138`, `VEN-060`, `VEN-133`), and that is a floor, not a census; the 15 hidden units and
2 hidden gear, which are not spells; and playing tokens (350.2). **If their removal is an ability, the
Lullaby is a dead card in hand.** That is the entry's refutation and it is written into it.

**Verdict: HOLD**, escorting `ahri-blue-sentinel-hold` and `svellsongur-copy-hold` — both Calm/Mind,
both scoring in the Beginning Phase, both with a `notable` that names surviving the opponent's turn as
their one fragility. `OGN-255` Nine-Tailed Fox is the legend for the Ahri boards, `UNL-189` Bashful
Bloom the Lillia one.

---

## §4 · Candidate 4 — holds, and 469.2 gives it a second half the issue did not have

The pair is real and the two uniqueness claims survive a full-pool grep: **`VEN-132` Fallen Feline is
the only card in the pool that names anything** (one hit for `name a card|spell|unit`), and **`UNL-169`
Ashe, Focused is the only Order card among the seven that reveal the opponent's hand** — which is
what makes the pair mono-Order rather than a two-domain forced shell.

**The correction the issue needs about how long Ashe's banish lasts.** *"When they hold, return it to
their hand"* — their Hold is **315.2.b.2**, the Scoring Step of *their* Beginning Phase, which is the
first thing that happens on their next turn. So the banish covers **the remainder of your own turn and
nothing more**. It is not a one-turn strip of their answer; it is a strip for the turn you spend E5 P1
on it, which makes Ashe a **burst-turn escort**, not a resource-denial card.

**And the second half, which follows from 469.2 and is new:**

> **469.2.** Hold: A player maintains **Control of a Battlefield** they did not yet Score this turn
> during their Beginning Phase.

**An opponent who controls no battlefield never Holds, so Ashe's return trigger never fires and the
banish is permanent.** That is not an exotic board: it is exactly what a Warden/Tianna wall
manufactures, and it is why this entry cross-references §1. `even if I'm no longer on the board` cuts
the other way too — killing Ashe does not bring the card back.

**The rest of the issue's reasoning holds.** 762 / 762.1 / 762.2 only require the named spell to exist
and be format-legal and not be a token, so naming is a free shot; Ashe's reveal turns it into an
informed one; and 103.2.b means the named spell is worth **up to 3 cards**, not 1, because the Feline's
half is keyed on the **name** and persists.

**One prerequisite the issue states and the entry must keep:** the Feline has to be played to a
battlefield you control (355.2.a) for `While I'm at a battlefield` to be on — and 190.1 plus the second
sentence of 190.6.d mean a battlefield you brought starts **uncontrolled**, so establishing that
control is part of the price.

**Verdict: HOLD, rewritten** — same two cards, banish duration corrected from "one turn" to "the rest
of your turn", plus the 469.2 finding.

---

## §5 · Candidate 5 — holds as a one-card entry, and 206 is what keeps it honest

The Helm's own arithmetic, counted whole the way `CLAUDE.md` demands (two published figures in this
project have already been wrong for skipping the second half of a gear's bill):

- play: **4 Energy + 1 Power**
- `[Empower]`: **4 Energy + 1 Calm Power** — an Activated Ability with no exhaust in its cost, so it
  can be paid the same turn the Helm lands
- **total 8 Energy + 2 Power**, and 441.2 makes Empowered a **state**, permanent once reached

**The claim that is worth an entry is the Power half, and it is measurable.** Unempowered the Helm is
+1 Energy per enemy spell — noise. Empowered it is +1 Energy **and +1 rainbow Power** per enemy spell,
and Power is not Energy: 315.3.b channels the opponent **2** runes per turn for free *(project, #44:
that floor is 2 Power per turn and it is free, because 164.2.b carries no exhaust)*, so **an Empowered
Helm caps the number of spells they can cast off their free Power at two, and every spell past that is
a rune off the board and into the Rune Deck** (161.2.b), i.e. Energy they will not have next turn.

**The trap this entry has to print, and the issue did not:** the tax does **not** widen a single
counter in your own deck. `OGN-045` Defy reads *"Counter a spell that costs no more than [4] and no
more than [A]"*, and **206** — whose own worked example is Defy — says a cost check *"always use[s]
its printed or copied cost, even if that cost is increased"*. Same for `VEN-152` Rebuttal's `no more
than [4]`. Taxing an enemy spell to 5 Energy leaves it a legal Defy target and always will.

**One entry or a notable on candidate 1?** The issue leaves this to the walk. **Own entry**, for the
reason `brynhir-lockout-window` gives in its own notes: putting a card into another entry's `uses[]`
makes the matcher demand it of every deck that runs the other half, and the Warden wall does not need
the Helm to work, nor the Helm the wall. Precedent for a one-card ENGINE is that same entry.

**Verdict: HOLD**, own entry, with the 206 correction and the two-Power floor as the yardstick.

---

## §6 · Candidate 6 — the stated function is wrong, and the real one is better

The issue sells Vex, Apathetic as an answer to reinforcement:

> *"Ésa es la función real: el rival no puede subir la barra del defensor metiendo cuerpos, porque los
> que meta valen 0 en el paso de daño."*

**Two rules refute that, and both are in the same paragraph the issue quotes half of.**

> **423.1.a.2.** Stunned Units lose the Stunned status during step 3d of the **end of turn** cleanup.
> **423.1.c.** A Stunned Unit **must still have damage applied to it equal to, or greater than, its
> full might value to be killed.**

The stun expires at the end of the turn it was applied — the opponent's turn, since that is when they
play units — so on **your** turn the reinforcement defends unstunned and at full Might. And even
within its own turn 423.1.c means a stunned body still soaks its full Might, so it raises the
attacker's bar exactly as much as an unstunned one. 423.1.b removes only the damage it **deals back**.
*(project, #89 already corrected this project once in the same direction: what makes a stunned unit
pay is 423.1.c read with 710, not 423.1.b.)*

On top of that the opponent cannot reinforce mid-combat at all: 312.2.a gives them no priority in a
Neutral Open State on your turn, 144.1.c bars moves during a Showdown or Combat, and 155 keeps a spell
without `[Action]`/`[Reaction]` out of a Showdown.

**The real function is the other clause, `They can't move it this turn` — and it is the exact
complement of the Warden's one leak.** Under the Warden every enemy unit must be played to base
(054.2) and 144.4 gives it no way to reach a battlefield except a Standard Move, which costs an
exhaust (144.2 / 420.3.a) it cannot pay on the turn it entered — **unless** it is one of the 26
`[Accelerate]` units (805.1.a, *"I enter ready"*) or something moves it by effect *(project, #58:
`UNL-045` Forgotten Signpost, `SFD-177` Azir Sovereign for tokens, `SFD-079` Bard Mercurial — an
effect move pays no exhaust and moves exhausted units)*. **Vex closes both**, because her clause is on
the unit *played*, wherever it was played, and it forbids **any** move of it that turn.

Put the two together and the claim is complete and checkable — **no unit the opponent plays reaches a
battlefield on the turn it is played**, by any route the pool prints:

| route | closed by |
|---|---|
| play directly to a battlefield they control | Warden, 054.2 |
| play directly to an open or occupied enemy battlefield (7 cards) | Warden, 054.1 over 355.2.b |
| play from `[Hidden]` at their battlefield (15 units) | Warden, 811.1.d.1 + 054.2 |
| play a **token** unit to a battlefield | Warden, via 185.2.a (*"plus any restrictions"*) + 350.2 |
| play to base with `[Accelerate]`, then Standard Move the same turn | **Vex**, *"can't move it this turn"* |
| play to base, then move it by effect | **Vex**, same clause |
| play to base, then ready it with a spell or ability and move | Warden's second clause |

Scope, stated honestly: it is about the **turn a unit is played**. A body that was already on their
base from an earlier turn moves normally, and Vex touches nothing that is already on the board.

**Domain:** Calm + Chaos, and the pool prints three such legends — one of which, `UNL-193` Gloomist,
is Vex's own.

**No loop.** 423.1.a.1 (*"A Stunned Unit can not be Stunned again"*) plus the fact that each trigger
answers a separate enemy play means nothing here repeats under your own control. ENGINE, and it stays
ENGINE.

**Verdict: HOLD, rewritten and renamed** — `vex-apathetic-reinforcement-stun` →
`vex-warden-accelerate-lock`, because the entry no longer claims what its old id says.

---

## The five refutations of the issue, re-checked

1. **Crumbling Sands + Helm is anti-synergic.** Confirmed. `VEN-039` reads *"Counter a spell **if an
   opponent has played another spell this turn**"* and the Helm's whole purpose is to make that second
   spell not happen. Nothing to catalogue.
2. **Warden + Mageseeker Investigator is redundant.** Confirmed, and 144.3 is the rule that finishes
   it: a simultaneous Standard Move is possible (*"Players may perform multiple Units' standard move
   simultaneously"*) but 144.3.a forces one shared Destination, and under the Warden the bodies are
   coming from base one turn behind anyway. `SFD-079` Bard is the pool's only bulk mover of units of
   any kind *(project, #58)*.
3. **Ravenbloom Prefect has no loop.** Confirmed: *"you may **banish me** to banish it"* — it banishes
   itself, so it never reaches the trash and no recursion in the pool reaches it.
4. **Brynhir.** **Overturned already**, by the #98 walk, in this issue's own comment thread. Not
   re-walked here; `brynhir-lockout-window` stands untouched.
5. **The three battlefields are not ingredients.** Confirmed: all three are symmetric, 485.4.a makes
   one of your three appear at random in Duel and Skirmish, and 103.4.c plus Tournament Rules 402.1
   forbid bringing copies of a name.

---

## Trap checklist, run against all six

| trap (`CLAUDE.md`) | where it bites |
|---|---|
| entering an EMPTY enemy battlefield is not an attack | candidate 2 needs the opponent's garrison **present** for a Combat Showdown to open (461, 464.1). Written into the entry. |
| Energy added in Awaken or the Beginning Phase is lost at the Main Phase start (167) | candidate 3: stated as the difference between a winning turn and a non-winning one. |
| a `[Repeat]` gives no window between executions | no entry uses `[Repeat]`. |
| `[Temporary]` bodies die before Scoring | no entry uses `[Temporary]`. |
| a heal/exhaust/recall shield erases a Deathknell (808.1.d.1) | no entry uses a shield. |
| a Recall goes to the **base** (455), switching off `While I'm at a battlefield` | candidate 2: 466.1.a.2 recalls the Saboteur out of the enemy battlefield. Written in. |
| tokens are not cards (185 / 416.1 / 186.1) | candidate 6 relies on the **positive** half only — 185.2.a and 350.2 make a token unit *played*, so Vex sees it and the Warden's `only` binds it. Nothing recycles a token here. |
| 709 is an event, not a state | no `becomes Mighty` payoff in the lens. |
| a legend is not at a location (107.4.b) | no entry puts a lock on a legend. |
| a battlefield you bring starts uncontrolled (190.1 / 190.6.d) | candidate 4: the Feline needs a battlefield **you control**. Written in. |
| 485.4.a / 103.4.c — a specific battlefield is 1-in-3 and cannot be doubled | **no entry names a battlefield.** None is a 1-in-3 draw. |
| 103.1.b.1 Domain Identity before folding cards together | run for all six; candidate 2 is the one that comes out with exactly one legal legend. |
| an INFINITE needs a printed "repeat" step | none of the six is INFINITE and none claims to be. |
