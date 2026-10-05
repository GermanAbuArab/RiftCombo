# Play — the Golds are a bank with no teller, because Portal Rescue is paid in Energy

Issue #258 (a slice of #200), 2026-10-05. Constructed, Duel (485). Rules version 2026-07-16.
Card text verbatim from `data/corpus_flat.txt`; rules pasted from
`data/Riftbound-Core-Rules-2026-07-16.txt`. Read
[the unopposed clock](2026-09-12-the-unopposed-clock.md) for the baseline this is measured against.

**Subject: `portal-rescue-trove-golem-industrialist`**, the Mind/Order ENGINE in which `OGN-102
Portal Rescue` replays `SFD-174 Trove Golem` for four more Gold tokens, and `SFD-171 Renata Glasc,
Industrialist` makes every Gold enter ready. The entry's ledger — net +3 Power per casting — is right.
Walked as a game, the scarce resource is not Power at all: every casting costs three **Energy**, the
Golds only ever add Power, and so the line turns one turn's Energy into a pile of Golds that the same
deck has nothing to spend on.

**Why this line.** `scripts/sequence-pick.mjs --unplayed`, re-run on 2026-10-05 at `d0cb346`, reads
771 entries, 262 with forced-ordering language, **102 in the queue and 83 of them with no play**. The
pick is by global rank, skipping entries that already have a play: this entry is rank 17 (hits on
*first* and *before*), second in the list. The other entry of this slice is rank 15, played in
[the bait is a removal spell before the attack](2026-10-05-the-bait-is-a-removal-spell-before-the-attack.md).

---

## 1. Needs

| | |
|---|---|
| **Legend** | a Mind/Order legend (103.1.b) — Herald of the Arcane, Lady of Luminosity, Chem-Baroness or Deceiver |
| **First** | `SFD-171 Renata Glasc, Industrialist` (Order, E4 + 1 Power, M4) on the board |
| **Then** | `SFD-174 Trove Golem` (Order, E8 + 2 Power, M9) played after her |
| **The repeat** | `OGN-102 Portal Rescue` (Mind, E3 + 1 Power), up to three copies |

The card text the play turns on:

- Trove Golem: *"When you play me, play four Gold gear tokens exhausted."*
- Renata Glasc, Industrialist: *"Your tokens enter ready."*
- Portal Rescue: *"[Action] (Play on your turn or in showdowns.) Banish a friendly unit, then its
  owner plays it to their base, ignoring its cost."*
- A Gold, 187.5: *"A Gold gear token is a domainless gear token with “[Reaction][>] Kill this, [E]:
  [Add] [A].”"*

## 2. What a Gold pays for

A Gold adds one rainbow Power and nothing else, and rainbow pays any domain's Power cost —
135.2.e.5.b: *"When Added to a player’s Rune Pool, [A] can be spent to pay a Power cost of any
Domain."* So a Gold pays Portal Rescue's Mind Power, the Golem's Order Power, anything's Power. It
never pays Energy. Portal Rescue's three Energy has to come out of runes every time.

The Golds do not leave with the turn. 167 empties the pool — *"Every player's Rune Pool empties at the
start of each player's Main Phase and the end of each player's turn."* — and a Gold is a gear token on
the board until you kill it to add. Unspent Golds are a bank.

## 3. The turns, going first

Mind/Order. The opponent is contesting battlefields; this deck spends its middle turns on its base.

```
turn   runes   your turn                                               Golds after
T1     2       a 2-drop                                                0
T2     4       a 2-drop / hold mana                                    0
T3     6       Renata: exhaust 4, recycle one for the Order Power      0
               (164.2.b). 5 runes remain.
T4     7       free — the Golem needs 8 runes on the board             0
T5     9       Trove Golem: exhaust 8, recycle 2 for the Order Power.  4
               7 runes remain, 1 of them ready = E1. Portal Rescue
               (E3) is not castable this turn.
T6     9       Portal Rescue x3: each is 3 runes + 1 Gold.             4 - 3 + 12 = 13
               0 runes ready afterwards.
```

- **Renata has to be first, and has to still be there.** If she is gone when the Golem's trigger
  resolves, the Golds enter exhausted as printed and are next turn's Power.
- **T5 is the Golem and nothing else.** Eight runes exhausted for E8, two of them recycled for the two
  Order Power (164.2.b, *"Recycle this: [Reaction] — Add [C]."*; 161.2.b sends them to the Rune Deck),
  and one rune left over. The four Golds would pay Portal Rescue's Power, but not its Energy.
- **T6 spends the whole game's supply.** Nine runes are exactly three castings of E3, each topped up
  with one Gold for the Mind Power. Each casting replays the Golem — 419.3.a, *"This treats Play as a
  Limited Action."* — and 419.4.a fires his trigger again: *"Any such triggered abilities trigger when
  the act of playing the card has been completed by the resolution of the card."* Thirteen Golds, a
  9-Might body at the base, and no Energy left to do anything with them.

## 4. Breaks to

**The bank breaks to `OGN-022 Thermo Beam`** (Fury, E5 + 2 Power, *"[Action] (Play on your turn or in
showdowns.) Kill all gear."*). The Golds are [Reaction], so you can kill them in response and add the
Power — but the pool empties at the end of the turn (167), so a response only helps if you have a
[Reaction] sink for rainbow Power in hand. One card, E5 + 2, takes all thirteen.

**One casting breaks to `OGN-045 Defy`** (Calm, E1 + 1 Power, *"Counter a spell that costs no more
than :rb_energy_4: and no more than :rb_rune_rainbow:."*). Portal Rescue prints E3 + 1, inside both
limits, and the counter refunds nothing — 425.1.c: *"Countering does not refund any costs paid to play
a card, activate an ability, or trigger an ability."* The Golem stays where it was and the four Golds
never come; you are out three runes, a Gold and a card for their E1 + 1.

**Portal Rescue cannot save the Golem from removal.** The entry calls it a save because it is
[Action]. But a removal spell on the chain is a Closed State, and 358.4 lets in only a card that
closed the state with [Action] or [Reaction], or a [Reaction] card after that: *"If the state is
Closed and the card wasn’t the one that Closed the state, ensure that it has [Reaction]."* Portal
Rescue can be cast pre-emptively in an open Showdown, never in response.

**The body is not the problem.** The Golem and Renata stand at your base, out of reach of every
removal worded *"at a battlefield"*; reaching them takes something like `OGN-229 Vengeance` (Order,
E4 + 2 Power, *"Kill a unit."*). Nothing in the line is worth that.

## 5. Verdict

**The ledger is right and the currency is wrong.** Each Portal Rescue costs three Energy to buy three
net Power, and Power without Energy buys nothing in this deck: by the end of T6 every rune is tapped
and thirteen Golds sit on the board waiting for a spell that costs Power and no Energy. The line is a
bank, and it needs a teller — a legend or card that turns the Golds into Energy, or a Power-heavy sink
that the deck can afford in Energy on the following turn.

**It scores nothing:** thirteen rainbow Power banked by T6, one replayed 9-Might body at the base, and
three cards spent. It breaks to `OGN-022 Thermo Beam` for E5 + 2 Fury on the bank, and to `OGN-045
Defy` for E1 + 1 Calm on any single casting.

## 6. Not verified

I did not walk a list that spends the Golds (the obvious sink is `OGN-122 Time Warp`, E10 + 4 Power,
which still needs ten Energy), the sibling line with `VEN-066 Temporal Breach`, or 2v2.

## Leads

- The entry's ledger counts only Power. Every casting costs E3 from runes and the Golds never add
  Energy (187.5, 135.2.e.5.b), so on the turn the Golem lands (T5 going first) Portal Rescue is not
  castable at all, and by T6 three castings take every rune.
- The entry's own legend list contains the teller: `SFD-201 Chem-Baroness` reads *"While your score is
  within 3 points of the Victory Score, your Gold [Add] an additional :rb_energy_1:."* Under her, the
  thirteen banked Golds are thirteen Energy as well, and the line becomes a finisher's fuel. No notable
  connects them.
- The notable *"[Action] speed ... doubles as a save from removal"* does not hold: a removal spell on
  the chain is a Closed State and 358.4 admits only a [Reaction] card there. Portal Rescue saves only
  when cast first, in an open Showdown.
