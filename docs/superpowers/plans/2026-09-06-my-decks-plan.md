# My decks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the fake top bar into four real hash-routed views, add a **My decks** library backed by the
existing `public.decks` table, and give each saved deck a detail view whose right column validates the list
against Riftbound's deck-construction rules.

**Architecture:** All the logic that can answer without a network goes into `src/` with tests first —
`src/build.ts` (`checkBuild`) and two new functions in `src/deck.ts` (`encodeDeckCode`, `deckToText`). The
browser layer gains `web/router.ts` (the only file that knows the four view names) and `web/decks.ts` (the
library and the detail). `web/main.ts` keeps Combos and loses the `Your decks` panel; `web/account.ts` keeps
session, header and `gate()` only.

**Tech Stack:** TypeScript, vitest, esbuild, supabase-js, `@piltoverarchive/riftbound-deck-codes`, plain DOM
(no framework, no graph library).

**Spec:** `docs/superpowers/specs/2026-09-05-my-decks-design.md` · **Issue:** #43

---

## Ground rules for whoever executes this

- `npm test && npm run typecheck && npm run build:web` — all three, before claiming any task done.
- `public/` is a build artifact. Edit `web/index.html`, `web/styles.css`, `web/*.ts`; never `public/`.
- `data/combos.json` and `docs/phase0/walks/` belong to another session right now. The ONLY file this plan
  writes under `docs/phase0/walks/` is `2026-09-06-deck-construction-rules.md`. `git add` your own paths.
- The CSP forbids inline `style=`. Colour through CSSOM (`el.style.x = …`) or a class.
- Commits in Spanish, ending with the two trailer lines the session prompt gives. `Refs #43` on every commit
  except the last one, which may say `Closes #43`.
- `npm run dev` is broken (recursive Vercel invocation). To see the UI: `cd public && python3 -m http.server 8788`,
  and stop it with `lsof -ti :8788 | xargs kill` — **never** `pkill -f`.

## File structure

| File | Responsibility |
|---|---|
| `docs/phase0/walks/2026-09-06-deck-construction-rules.md` | **New.** Every rule number `checkBuild` cites, opened in the rules text and quoted verbatim, with what our data can and cannot see. |
| `src/build.ts` | **New.** `checkBuild(deck, cards, format)` → one row per construction rule. Pure; no DOM, no network. |
| `src/deck.ts` | **Modify.** Gains `encodeDeckCode(deck)` and `deckToText(entries, cards)`. Everything else untouched. |
| `test/build.test.ts` | **New.** One test per construction rule, plus the badge and the champion-tag derivation over the whole pool. |
| `test/deck.test.ts` | **Modify.** Round-trip tests for the two new functions. |
| `web/router.ts` | **New.** Reads and writes the hash, toggles the four view containers and the nav. The only file that knows the view names. |
| `web/decks.ts` | **New.** The My decks library and the deck detail (editor + validation + Save/Update/Export/Analyze/Delete). |
| `web/main.ts` | **Modify.** Combos only. Loses the `Your decks` panel wiring, gains `Save to My decks` and the `Analyzing <name>` strip, boots the router. |
| `web/account.ts` | **Modify.** Keeps `gate()`, the header identity, sign-out and "delete account". The saved-deck panel moves out. |
| `web/index.html` | **Modify.** Four view containers under `main`; the nav becomes four hash links; Guide and Sources become views. |
| `web/styles.css` | **Modify.** View containers, deck card grid, two-column detail, validation rows. |
| `test/headers.test.ts` | **Modify.** Pins the four containers, the absence of `#how`/`#data` anchors, and the panel order that stays. |

---

## Task 1: The walk — every rule number, opened and quoted

**Files:**
- Create: `docs/phase0/walks/2026-09-06-deck-construction-rules.md`

- [ ] **Step 1: Read the rules text for each paragraph the validator will cite**

Run each of these and paste what comes back into the walk. Never quote from memory.

```bash
cd ~/proyectos/RiftCombo
sed -n '52,150p' data/Riftbound-Core-Rules-2026-07-16.txt        # 103.1 – 103.4.c
sed -n '5632,5652p' data/Riftbound-Core-Rules-2026-07-16.txt     # 485 1v1 (Duel): battlefield count
sed -n '5754,5772p' data/Riftbound-Core-Rules-2026-07-16.txt     # 489 2v2 (Magma Chamber)
sed -n '/^002\./,/^004\./p' data/Riftbound-Core-Rules-2026-07-16.txt | head -4   # card text supersedes
sed -n '399,404p' data/Riftbound-Tournament-Rules-2026-07-16.txt # TR 402.1 / 402.2
```

- [ ] **Step 2: Write the walk**

Write `docs/phase0/walks/2026-09-06-deck-construction-rules.md` with this exact skeleton, filling every
`> quote` block from Step 1's output verbatim (curly apostrophes and all):

```markdown
# Deck construction, rule by rule — what `checkBuild` may claim

Date: 2026-09-06 · Issue: #43 · Rules: Core Rules 2026-07-16, Tournament Rules 2026-07-16

Every row `src/build.ts` prints stands on a paragraph opened in
`data/Riftbound-Core-Rules-2026-07-16.txt` or `data/Riftbound-Tournament-Rules-2026-07-16.txt` and quoted
here. A row with no quote below is a row that must not ship.

## 1. One Champion Legend — 103.1

> 103.1.   1 Champion Legend
> 103.1.a. This is placed in the Legend Zone at the start of the game.

What we check: the list names exactly one legend. `normalizeDeck` keeps the LAST legend it sees in
`deck.legend`, so a list naming two legends looks like a list naming one — the check therefore counts
legend lines, not `deck.legend`.

## 2. Chosen Champion — 103.2.a.2

> [quote 103.2.a.2 and both of its examples]

What we check: the Chosen Champion is a unit carrying the legend's champion tag.
**What we cannot check:** Riot's gallery data has no Signature marker. The second example under 103.2.a.2
(Tibbers has the tag Annie but is a signature unit) is exactly the case our data cannot see — `OGS-018
Tibbers` is `type: unit`, `tags: ["Annie"]`, indistinguishable from a champion unit. The row says so.

## 3. Main Deck size — 103.2 and Tournament Rules 402.1

> 103.2. A Main Deck of at least 40 cards: A Chosen Champion Unit, as well as Units, Gear, and Spells
> TR 402.1. In a constructed event, players must register a Main Deck of exactly 40 cards (including a
> chosen champion), 1 Legend, 12 runes, and exactly 3 battlefields each with a unique name.

The two are not the same number. The Core Rules set a floor; a registered list is exactly 40. The row fails
below 40 citing 103.2 and fails above 40 citing 402.1, and its detail names which of the two it is, so a
casual 41-card list is not told it broke a rule it did not break.

## 4. Copies of a name — 103.2.b, and 002

> 103.2.b. Your Main Deck can include up to 3 copies of the same named card.
> 103.2.b.1. This includes your Chosen Champion.
> 002. Card text supersedes rules text. Whenever a card fundamentally contradicts the rules, the card's
> indication is what is true.

`VEN-097 Spiderling` prints "Your deck can have any number of cards named Spiderling"
(`grep -n "Spiderling" data/corpus_flat.txt`), so 002 lifts the cap for it. The check looks for that
sentence in the card's own text rather than keeping a hard-coded list of exceptions.

The cap is per NAME, not per code (103.2.b.2 and `cards.equivalents`): three printings of the same rune
under different codes are still three copies of one name.

## 5. Signature cards — 103.2.d — NOT CHECKED

> [quote 103.2.d, 103.2.d.1, 103.2.d.2]

Riot's gallery API ships no Signature flag: `grep -ci signature data/cards_full.json` is 0 and no card
carries a `Signature` tag. The row exists, says the rule, and reports `unknown` with the sentence "Riot's
card data carries no Signature marker, so this one is on you." Inventing a heuristic here would put a
guess next to eight rows that are computed.

## 6. Rune Deck — 103.3.a and 103.3.a.1

> 103.3.a.   12 Rune Cards
> 103.3.a.1. Cards in the Rune Deck must be of the Domain Identity of your Champion Legend.

One row: 12 runes, all inside the legend's two domains.

## 7. Battlefields — 103.4.a, 103.4.c, 485.4.a, 489.4.a, TR 402.1

> 103.4.a. The number will be dictated by your Mode of Play.
> 103.4.c. Cannot include more than one of a Battlefield of the same name when there are more than one
> required for the deck.
> 485.4.a. Each player provides three (3) Battlefields, included in their deck during deck building. […]
> 489.4.a. Each player provides three (3) Battlefields, included in their deck during deck building.

Three in both formats this site offers: 1v1 (Duel) 485.4.a and 2v2 (Magma Chamber) 489.4.a both say three.
Unique names is 103.4.c and TR 402.1 independently.

## 8. Domain Identity — 103.1.b

> 103.1.b.1. Cards included in your deck must abide by your Domain Identity.
> 103.1.b.3. If a card has a single Domain, then that card is permitted in the Domain Identity that
> corresponds to the same Domain.
> 103.1.b.4. If a card has more than one Domain, then that card is permitted only in a Domain Identity
> that contains all of the indicated Domains on that card.

A card with no domain at all (every battlefield in the pool) is inside every identity: b.3 and b.4 both
speak of the domains a card indicates, and there are none to fail.
103.1.b.5 (effects that add cards regardless of domain) is not modelled — no card in the pool does it today.

## 9. Format legality — 103.2.e

> 103.2.e. Subject to card legality of the Format being played.

Delegated to `deckRestrictions(deck, cards, format)`, which already exists (#23). A banned card fails the
row. A **restricted** card is not an illegal card and must not render as one: the row reports `unknown` and
links Riot's notice, because the one restricted entry in the list (`OGS-019 Wuju Bladesman - Starter`,
2v2) is a per-team limit our data does not quantify.

## What the champion tag is, and how we derive it

Riot's data has no "this tag is the champion" flag. Derivation: a tag `T` is a champion tag when some card
in the pool is named `T, <epithet>` ("Lux, Illuminated" for `Lux`). Measured on 2026-09-06 across
`data/cards.json`: all **127** legend printings have **exactly one** such tag, including the four legends
carrying two or three tags (`VEN-155 Heart of the Tempest` → `Yordle`, `Kennen`; the champion tag is
`Kennen`). `test/build.test.ts` re-measures this over the whole pool, so a new set that broke it would fail
the build rather than mislabel a legend.
```

- [ ] **Step 3: Verify every quote is really in the file**

For each quoted paragraph, run the grep and confirm the text matches character for character:

```bash
grep -n "Your Main Deck can include up to 3 copies" data/Riftbound-Core-Rules-2026-07-16.txt
grep -n "Cannot include more than one of a Battlefield" data/Riftbound-Core-Rules-2026-07-16.txt
grep -n "exactly 3 battlefields each with a unique name" data/Riftbound-Tournament-Rules-2026-07-16.txt
```

Expected: each prints one line whose text is what you pasted.

- [ ] **Step 4: Commit**

```bash
git add docs/phase0/walks/2026-09-06-deck-construction-rules.md
git commit -m "$(cat <<'EOF'
Construcción: el walk de las nueve reglas, cada número abierto y citado

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 2: `checkBuild` skeleton — the legend row and the Main Deck size row

**Files:**
- Create: `src/build.ts`
- Create: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Create `test/build.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { loadCardIndex } from "../src/load.js";
import { loadDeck } from "../src/deck.js";
import { checkBuild, type BuildReport } from "../src/build.js";
import type { Deck } from "../src/types.js";

const cards = loadCardIndex();

/**
 * A list that satisfies every rule: Lady of Luminosity (Mind + Order), Lux, Illuminated as the Chosen
 * Champion, 40 main-deck cards counting it, 12 runes in the two domains, 3 differently named battlefields.
 */
const LEGAL = `Legend
1 Lady of Luminosity - Starter

Champion
1 Lux, Illuminated

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Runes
6 Mind Rune
6 Order Rune

Main Deck
3 Forge of the Future
3 Ekko, Recurrent
3 Shadow's Call
3 Sacrifice
3 Retreat
3 Lux, Crownguard
3 Watchful Sentry
3 Lecturing Yordle
3 Progress Day
3 Soaring Scout
3 Rally the Troops
3 Fiora, Worthy
2 Sumpworks Map
1 Promising Future`;

const rows = (text: string, format: "constructed" | "2v2" = "constructed"): BuildReport =>
  checkBuild(loadDeck(text, cards), cards, format);
const row = (r: BuildReport, rule: string) => r.rules.find((x) => x.rule.startsWith(rule))!;

describe("103.1 — one Champion Legend", () => {
  it("passes on a list that names one legend", () => {
    expect(row(rows(LEGAL), "103.1").status).toBe("pass");
  });

  it("fails when no legend is named", () => {
    const r = row(rows(LEGAL.replace("1 Lady of Luminosity - Starter", "")), "103.1");
    expect(r.status).toBe("fail");
    expect(r.detail).toMatch(/no legend/i);
  });
});

describe("103.2 and Tournament Rules 402.1 — Main Deck size", () => {
  it("passes on exactly 40, counting the Chosen Champion", () => {
    const r = row(rows(LEGAL), "103.2 ");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("40");
  });

  it("fails below 40 and names the Core Rules floor", () => {
    const r = row(rows(LEGAL.replace("1 Promising Future", "")), "103.2 ");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("39");
    expect(r.detail).toMatch(/at least 40/);
  });

  it("fails above 40 and names the registration rule instead", () => {
    const r = row(rows(`${LEGAL}\n2 Promising Future`), "103.2 ");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("42");
    expect(r.detail).toMatch(/exactly 40/);
  });

  it("counts unrecognised lines separately instead of pretending they are not there", () => {
    const r = row(rows(`${LEGAL}\n1 Totally Fake Card`), "103.2 ");
    expect(r.detail).toMatch(/1 line not recognised/);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts`
Expected: FAIL — `Cannot find module '../src/build.js'`.

- [ ] **Step 3: Write the minimal implementation**

Create `src/build.ts`:

```ts
// Deck construction (#43). One row per rule of Riftbound's deck-building section, each carrying the
// paragraph it stands on. Every number here was opened in data/Riftbound-Core-Rules-2026-07-16.txt and
// quoted in docs/phase0/walks/2026-09-06-deck-construction-rules.md; a row with no quote there must not
// exist. Pure: no DOM, no network, so it is tested the way planDeck and checkSave are.

import { parseDeckText } from "./deck.js";
import type { CardIndex } from "./cards.js";
import type { Deck, Format } from "./types.js";

/**
 * "pass" and "fail" are computed. "unknown" is a rule we can state but not check from Riot's card data —
 * a Signature cap with no Signature marker in the gallery, a restricted card whose limit is a per-team
 * rule rather than a copy count. Showing the row and saying it is unchecked beats both silence and a guess.
 */
export type BuildStatus = "pass" | "fail" | "unknown";

export interface BuildRule {
  /** Paragraph numbers, exactly as the walk cites them. */
  rule: string;
  /** What is being checked, in three or four words. */
  label: string;
  status: BuildStatus;
  /** One short sentence carrying the figure. */
  detail: string;
}

export interface BuildReport {
  rules: BuildRule[];
  /** No row failed. An "unknown" row does not make a list illegal — nobody checked it, that is all. */
  legal: boolean;
}

const total = (bag: Record<string, number>) => Object.values(bag).reduce((a, b) => a + b, 0);

export function checkBuild(deck: Deck, cards: CardIndex, format: Format): BuildReport {
  const rules: BuildRule[] = [legendRule(deck, cards), sizeRule(deck)];
  return { rules, legal: rules.every((r) => r.status !== "fail") };
}

function legendRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.1", label: "One Champion Legend" };
  if (!deck.legend) return { ...base, status: "fail", detail: "This list names no legend, so nothing below can be scoped to a Domain Identity." };
  const name = cards.get(deck.legend)!.name.replace(/ - Starter$/, "");
  const domains = cards.domainsOf(deck.legend).join(" + ");
  return { ...base, status: "pass", detail: `${name} · ${domains}` };
}

function sizeRule(deck: Deck): BuildRule {
  const base = { rule: "103.2 · Tournament Rules 402.1", label: "Main Deck of 40" };
  const n = total(deck.main);
  const lost = deck.unresolved.reduce((a, u) => a + u.count, 0);
  const tail = lost ? ` · ${lost} line${lost === 1 ? "" : "s"} not recognised` : "";
  if (n === 40) return { ...base, status: "pass", detail: `40 cards, Chosen Champion included${tail}` };
  if (n < 40) return { ...base, status: "fail", detail: `${n} cards — a Main Deck is at least 40 (103.2)${tail}` };
  return { ...base, status: "fail", detail: `${n} cards — an event registers exactly 40 (Tournament Rules 402.1)${tail}` };
}
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 6 tests.

If the "passes on exactly 40" test fails on the count, print the real one with
`npx tsx -e 'import {loadCardIndex} from "./src/load.js"; import {loadDeck} from "./src/deck.js"; const d=loadDeck(process.argv[1],loadCardIndex()); console.log(Object.values(d.main).reduce((a,b)=>a+b,0), d.unresolved)'`
and fix the fixture list, not the assertion.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: checkBuild empieza por la leyenda y el tamaño del Main Deck

103.2 pone un piso de 40 y TR 402.1 registra exactamente 40: son dos reglas
distintas y la fila dice cuál es la que se rompió.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 3: Copies of a name — 103.2.b, with 002 lifting the cap for Spiderling

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
describe("103.2.b — up to 3 copies of a name", () => {
  it("passes a list with no name over three", () => {
    expect(row(rows(LEGAL), "103.2.b").status).toBe("pass");
  });

  it("fails a fourth copy and names the card", () => {
    const r = row(rows(LEGAL.replace("3 Retreat", "4 Retreat").replace("1 Promising Future", "")), "103.2.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Retreat");
    expect(r.detail).toContain("4");
  });

  it("counts copies by name across different printings, not by code", () => {
    // OGN-089 and SFD-R03 are both Mind Rune; the cap is per name (103.2.b.2 reads the other way round,
    // and cards.equivalents is what already knows the reprints).
    const deck = loadDeck(`${LEGAL}\n2 OGS-014`, cards);
    const r = checkBuild(deck, cards, "constructed").rules.find((x) => x.rule.startsWith("103.2.b"))!;
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Lux, Crownguard");
  });

  it("lets Spiderling past the cap, because its own text says so (002)", () => {
    const eight = `Legend
1 Lord of the Deep

Champion
1 Vex, Gloomist

Runes
12 Chaos Rune

Battlefields
1 Ripper's Bay
1 The Grand Plaza
1 Startipped Peak

Main Deck
8 Spiderling`;
    const r = checkBuild(loadDeck(eight, cards), cards, "constructed").rules.find((x) => x.rule.startsWith("103.2.b"))!;
    expect(r.status).toBe("pass");
    expect(r.detail).toMatch(/Spiderling/);
  });
});
```

Before running it, confirm the Chaos legend and champion in that fixture exist and match:

```bash
npx tsx -e '
import { loadCardIndex } from "./src/load.js";
const c = loadCardIndex();
for (const n of ["Lord of the Deep", "Vex, Gloomist", "Spiderling"]) console.log(n, c.resolveName(n));
'
```

If either name resolves to `null`, replace it with a real Chaos legend and a champion carrying its tag —
list them with:

```bash
npx tsx -e '
import { loadCardIndex } from "./src/load.js";
const c = loadCardIndex();
for (const card of c.cards) if (card.type.includes("legend") && card.domains.includes("chaos") && !card.variant) console.log(card.base, card.name, card.domains.join("/"), card.tags.join(","));
'
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "103.2.b"`
Expected: FAIL — `Cannot read properties of undefined (reading 'status')`, because no row starts with `103.2.b`.

- [ ] **Step 3: Write the implementation**

In `src/build.ts`, add the rule and register it in `checkBuild`:

```ts
const COPY_CAP = 3;
/** 002: card text supersedes rules text. Spiderling is the only card in the pool that says this today. */
const ANY_NUMBER = /can have any number of cards named/i;

function copiesRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.b", label: "Up to 3 of a name" };
  const byName = new Map<string, { name: string; count: number; exempt: boolean }>();
  for (const bag of [deck.main, deck.battlefields, deck.runes]) {
    for (const [code, n] of Object.entries(bag)) {
      const card = cards.get(code);
      if (!card) continue;
      const prev = byName.get(card.name);
      if (prev) prev.count += n;
      else byName.set(card.name, { name: card.name, count: n, exempt: ANY_NUMBER.test(card.text ?? "") });
    }
  }
  const over = [...byName.values()].filter((x) => !x.exempt && x.count > COPY_CAP).sort((a, b) => b.count - a.count);
  const exempt = [...byName.values()].filter((x) => x.exempt && x.count > COPY_CAP);
  if (over.length) {
    return { ...base, status: "fail", detail: over.map((x) => `${x.count}× ${x.name}`).join(" · ") };
  }
  return {
    ...base,
    status: "pass",
    detail: exempt.length
      ? `No name over three, and ${exempt.map((x) => `${x.count}× ${x.name}`).join(" · ")} is allowed past it by its own text (002).`
      : "No name appears more than three times.",
  };
}
```

Two things this deliberately does. The bag loop reads `deck.main`, `deck.battlefields` and `deck.runes` but
**not** `deck.sideboard`: the spec keeps the sideboard out of validation, as the matcher already does.
And it keys on `card.name` rather than the base code, so two printings of one name count together —
`cards.get` maps every code back to its printing and `Card.name` is the shared key.

Register it in `checkBuild`:

```ts
  const rules: BuildRule[] = [legendRule(deck, cards), sizeRule(deck), copiesRule(deck, cards)];
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 10 tests.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: el tope de 3 copias por nombre, y el 002 que se lo levanta a Spiderling

El tope es por NOMBRE (103.2.b.2), así que dos impresiones distintas de la misma
carta suman. Spiderling imprime "any number" y 002 hace ganar a la carta.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 4: The Rune Deck — 103.3.a and 103.3.a.1

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
describe("103.3.a — twelve runes inside the identity", () => {
  it("passes on 6 + 6 in the legend's two domains", () => {
    const r = row(rows(LEGAL), "103.3.a");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("12");
  });

  it("fails on eleven and says how many are missing", () => {
    const r = row(rows(LEGAL.replace("6 Order Rune", "5 Order Rune")), "103.3.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("11");
  });

  it("fails a rune outside the legend's domains and names it", () => {
    const r = row(rows(LEGAL.replace("6 Order Rune", "5 Order Rune\n1 Fury Rune")), "103.3.a");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Fury Rune");
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "103.3.a"`
Expected: FAIL — no row starts with `103.3.a`.

- [ ] **Step 3: Write the implementation**

Add to `src/build.ts`. `identityOf` is shared with the Domain Identity row in Task 6, so define it once:

```ts
import type { Domain } from "./types.js";

/**
 * 103.1.b.3 and 103.1.b.4 both speak of the domains a card indicates, so a card indicating none — every
 * battlefield in the pool — is inside every identity. With no legend there is no identity to break.
 */
function identityOf(deck: Deck, cards: CardIndex): ((base: string) => boolean) | null {
  if (!deck.legend) return null;
  const identity = new Set<Domain>(cards.domainsOf(deck.legend));
  return (base) => cards.domainsOf(base).every((d) => identity.has(d));
}

const RUNE_COUNT = 12;

function runeRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.3.a · 103.3.a.1", label: "12 runes in the identity" };
  const n = total(deck.runes);
  const inIdentity = identityOf(deck, cards);
  const off = inIdentity
    ? Object.keys(deck.runes).filter((b) => !inIdentity(b)).map((b) => cards.get(b)?.name ?? b)
    : [];
  if (off.length) {
    return { ...base, status: "fail", detail: `${off.join(", ")} ${off.length === 1 ? "is" : "are"} outside the legend's domains (103.3.a.1).` };
  }
  if (n !== RUNE_COUNT) {
    return { ...base, status: "fail", detail: `${n} rune${n === 1 ? "" : "s"} — the Rune Deck is 12.` };
  }
  return { ...base, status: "pass", detail: "12 runes, all inside the legend's domains." };
}
```

Register it after `copiesRule`:

```ts
  const rules: BuildRule[] = [legendRule(deck, cards), sizeRule(deck), copiesRule(deck, cards), runeRule(deck, cards)];
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 13 tests.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: las 12 runas y su Identidad de Dominio en una sola fila

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 5: Battlefields — 103.4.a and 103.4.c

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
describe("103.4 — three battlefields, all named differently", () => {
  it("passes on three different names", () => {
    const r = row(rows(LEGAL), "103.4");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("3");
  });

  it("fails on two", () => {
    const r = row(rows(LEGAL.replace("1 Startipped Peak", "")), "103.4");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("2");
  });

  it("fails two copies of one name and cites 103.4.c", () => {
    const r = row(rows(LEGAL.replace("1 Startipped Peak", "2 The Grand Plaza").replace("1 The Grand Plaza\n", "")), "103.4");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("The Grand Plaza");
  });

  it("asks for three in 2v2 as well, since 489.4.a says three too", () => {
    expect(row(rows(LEGAL, "2v2"), "103.4").status).toBe("pass");
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "103.4"`
Expected: FAIL — no row starts with `103.4`.

- [ ] **Step 3: Write the implementation**

Add to `src/build.ts`:

```ts
/**
 * Three in both formats this site offers: 485.4.a (1v1 Duel) and 489.4.a (2v2 Magma Chamber) both say
 * each player provides three, and Tournament Rules 402.1 registers "exactly 3 battlefields each with a
 * unique name". The number is a property of the Mode of Play (103.4.a), which is why it is named here
 * rather than assumed.
 */
const BATTLEFIELDS = 3;

function battlefieldRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.4.a · 103.4.c", label: "3 battlefields, unique names" };
  const names = new Map<string, number>();
  for (const [code, n] of Object.entries(deck.battlefields)) {
    const name = cards.get(code)?.name ?? code;
    names.set(name, (names.get(name) ?? 0) + n);
  }
  const dupes = [...names.entries()].filter(([, n]) => n > 1);
  if (dupes.length) {
    return { ...base, status: "fail", detail: `${dupes.map(([n, c]) => `${c}× ${n}`).join(" · ")} — a deck cannot hold two battlefields of the same name (103.4.c).` };
  }
  const n = total(deck.battlefields);
  if (n !== BATTLEFIELDS) return { ...base, status: "fail", detail: `${n} battlefield${n === 1 ? "" : "s"} — a deck provides 3.` };
  return { ...base, status: "pass", detail: `3 battlefields, all named differently. One of them is chosen at random for the game (485.5).` };
}
```

Register it after `runeRule`.

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 17 tests.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: 3 battlefields de nombre distinto, en los dos formatos

485.4.a y 489.4.a dicen tres los dos, así que la fila no depende del formato.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 6: Domain Identity — 103.1.b

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
describe("103.1.b — Domain Identity", () => {
  it("passes a Mind + Order list", () => {
    expect(row(rows(LEGAL), "103.1.b").status).toBe("pass");
  });

  it("fails a Chaos card under a Mind + Order legend and names it", () => {
    const r = row(rows(LEGAL.replace("3 Watchful Sentry", "3 Stealthy Pursuer")), "103.1.b");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Stealthy Pursuer");
  });

  it("does not blame a battlefield for having no domain at all", () => {
    // Every battlefield in the pool prints no domain symbol; 103.1.b.3/b.4 speak of the domains a card
    // indicates, and there are none to fail.
    expect(row(rows(LEGAL), "103.1.b").detail).not.toContain("Grand Plaza");
  });

  it("is unknown rather than failed when the list names no legend", () => {
    expect(row(rows(LEGAL.replace("1 Lady of Luminosity - Starter", "")), "103.1.b").status).toBe("unknown");
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "103.1.b"`
Expected: FAIL — no row starts with `103.1.b`.
(The legend row's rule is the string `"103.1"`, so `startsWith("103.1.b")` cannot match it; if it does,
you registered the rows in the wrong order — `row()` takes the first match.)

- [ ] **Step 3: Write the implementation**

Add to `src/build.ts`:

```ts
function identityRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.1.b", label: "Domain Identity" };
  const inIdentity = identityOf(deck, cards);
  if (!inIdentity) return { ...base, status: "unknown", detail: "No legend named, so there is no Domain Identity to measure against." };
  const off = [...Object.keys(deck.main), ...Object.keys(deck.battlefields)]
    .filter((b) => !inIdentity(b))
    .map((b) => cards.get(b)?.name ?? b)
    .sort((a, b) => a.localeCompare(b));
  const pair = cards.domainsOf(deck.legend!).join(" + ");
  if (off.length) {
    return { ...base, status: "fail", detail: `Outside ${pair}: ${off.slice(0, 4).join(", ")}${off.length > 4 ? ` and ${off.length - 4} more` : ""}.` };
  }
  return { ...base, status: "pass", detail: `Every card sits inside ${pair}.` };
}
```

Register it **after** `legendRule` and before `sizeRule`, so the rows read in the order the spec's panel
lists them and so `row()` in the tests keeps matching `103.1` to the legend row:

```ts
  const rules: BuildRule[] = [
    legendRule(deck, cards),
    identityRule(deck, cards),
    sizeRule(deck),
    copiesRule(deck, cards),
    runeRule(deck, cards),
    battlefieldRule(deck, cards),
  ];
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 21 tests.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: la Identidad de Dominio, y por qué un battlefield sin dominio pasa

103.1.b.3 y b.4 hablan de los dominios que la carta indica; si no indica ninguno
no hay nada que romper.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 7: Chosen Champion — 103.2.a.2, and the champion tag derivation

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
import { championTagOf } from "../src/build.js";

describe("the champion tag, derived rather than flagged", () => {
  /**
   * Riot's data has no "this tag is the champion" flag. A tag T is a champion tag when some card is named
   * "T, <epithet>". Measured 2026-09-06: all 127 legend printings have exactly one such tag, including the
   * four carrying two or three. This test re-measures it, so a new set breaks the build instead of
   * silently mislabelling a legend.
   */
  it("gives exactly one champion tag to every legend printing in the pool", () => {
    const legends = cards.cards.filter((c) => c.type.includes("legend"));
    expect(legends.length).toBeGreaterThan(120);
    const without = legends.filter((c) => championTagOf(c.base, cards) === null);
    expect(without.map((c) => `${c.base} ${c.name}`)).toEqual([]);
  });

  it("picks the champion out of a legend carrying a creature tag too", () => {
    // VEN-155 Heart of the Tempest is tagged Yordle and Kennen.
    expect(championTagOf("VEN-155", cards)).toBe("Kennen");
  });
});

describe("103.2.a.2 — the Chosen Champion carries the legend's tag", () => {
  it("passes Lux, Illuminated under Lady of Luminosity", () => {
    const r = row(rows(LEGAL), "103.2.a.2");
    expect(r.status).toBe("pass");
    expect(r.detail).toContain("Lux");
  });

  it("fails a champion of another legend", () => {
    const r = row(rows(LEGAL.replace("1 Lux, Illuminated", "1 Ekko, Recurrent")), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Ekko");
  });

  it("fails when no champion section names one", () => {
    const r = row(rows(LEGAL.replace("Champion\n1 Lux, Illuminated", "")), "103.2.a.2");
    expect(r.status).toBe("fail");
    expect(r.detail).toMatch(/no Chosen Champion/i);
  });

  it("says out loud that it cannot tell a signature unit from a champion unit", () => {
    expect(row(rows(LEGAL), "103.2.a.2").detail).toMatch(/signature/i);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "champion"`
Expected: FAIL — `championTagOf` is not exported from `src/build.js`.

- [ ] **Step 3: Write the implementation**

Add to `src/build.ts`:

```ts
/**
 * Riot's gallery data has no flag saying which of a card's tags is the champion, so it is derived: a tag T
 * is a champion tag when some card in the pool is named "T, <epithet>" — "Lux, Illuminated" for Lux. All
 * 127 legend printings resolve to exactly one, including the four that also carry a creature or region tag
 * (VEN-155 Heart of the Tempest is Yordle + Kennen; the champion is Kennen). test/build.test.ts re-measures
 * that over the whole pool. See docs/phase0/walks/2026-09-06-deck-construction-rules.md.
 */
let championTags: Set<string> | null = null;
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function championTagSet(cards: CardIndex): Set<string> {
  if (championTags) return championTags;
  const named = new Set<string>();
  for (const c of cards.cards) {
    const m = /^([^,]+),\s/.exec(c.name);
    if (m) named.add(key(m[1]!));
  }
  championTags = named;
  return named;
}

/** The one tag on this card that names a champion, or null if it carries none. */
export function championTagOf(base: string, cards: CardIndex): string | null {
  const card = cards.get(base);
  if (!card) return null;
  const named = championTagSet(cards);
  return card.tags.find((t) => named.has(key(t))) ?? null;
}

function championRule(deck: Deck, cards: CardIndex): BuildRule {
  const base = { rule: "103.2.a.2", label: "Chosen Champion" };
  const tag = deck.legend ? championTagOf(deck.legend, cards) : null;
  if (!deck.legend || !tag) return { ...base, status: "unknown", detail: "Name a legend and this checks that your Chosen Champion carries its champion tag." };
  if (!deck.champion) return { ...base, status: "fail", detail: `This list names no Chosen Champion. It needs one champion unit tagged ${tag} (103.2.a.2).` };
  const champ = cards.get(deck.champion);
  if (!champ) return { ...base, status: "fail", detail: "The Chosen Champion line was not recognised as a card." };
  if (!champ.tags.includes(tag)) {
    return { ...base, status: "fail", detail: `${champ.name} is not tagged ${tag}, so it cannot be this legend's Chosen Champion.` };
  }
  // 103.2.a.2's own second example is Tibbers: tagged Annie, but a signature unit, and therefore not a
  // legal Chosen Champion. Riot's card data carries no signature marker, so this row cannot see it.
  return { ...base, status: "pass", detail: `${champ.name} carries the ${tag} tag. Signature units carry it too and our card data cannot tell them apart — check yours is a champion unit.` };
}
```

Register it after `identityRule`:

```ts
  const rules: BuildRule[] = [
    legendRule(deck, cards),
    identityRule(deck, cards),
    championRule(deck, cards),
    sizeRule(deck),
    copiesRule(deck, cards),
    runeRule(deck, cards),
    battlefieldRule(deck, cards),
  ];
```

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `npx vitest run test/build.test.ts`
Expected: PASS, 27 tests.

If "gives exactly one champion tag to every legend printing" fails, list the offenders it prints and DO NOT
weaken the assertion — a legend with no derivable champion tag is a data finding worth reporting; add it to
the walk and to the report to the manager.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: el Chosen Champion, con el tag de campeón derivado del propio pool

Riot no marca cuál de los tags de una leyenda es el campeón; se deriva de que
exista una carta llamada "Tag, epíteto". Las 127 impresiones de leyenda dan
exactamente uno, y el test lo vuelve a medir sobre todo el pool.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 8: Signature (unchecked), format legality, and the Legal badge

**Files:**
- Modify: `src/build.ts`
- Modify: `test/build.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `test/build.test.ts`:

```ts
describe("103.2.d — the Signature cap we cannot check", () => {
  it("states the rule and reports it unchecked rather than guessing", () => {
    const r = row(rows(LEGAL), "103.2.d");
    expect(r.status).toBe("unknown");
    expect(r.detail).toMatch(/no Signature marker/i);
  });

  it("does not make a legal list illegal", () => {
    expect(rows(LEGAL).legal).toBe(true);
  });
});

describe("103.2.e — card legality of the format", () => {
  it("passes a clean list", () => {
    expect(row(rows(LEGAL), "103.2.e").status).toBe("pass");
  });

  it("fails a banned card and names it", () => {
    const r = row(rows(LEGAL.replace("1 Ripper's Bay", "1 Obelisk of Power")), "103.2.e");
    expect(r.status).toBe("fail");
    expect(r.detail).toContain("Obelisk of Power");
    expect(r.detail).toContain("banned");
  });

  it("does not call a restricted card illegal, and says so only in the format that restricts it", () => {
    const list = LEGAL.replace("1 Lady of Luminosity - Starter", "1 Wuju Bladesman - Starter");
    expect(row(rows(list, "constructed"), "103.2.e").status).toBe("pass");
    const duo = row(rows(list, "2v2"), "103.2.e");
    expect(duo.status).toBe("unknown");
    expect(duo.detail).toContain("restricted");
  });
});

describe("the badge", () => {
  it("calls the reference list legal", () => {
    const r = rows(LEGAL);
    expect(r.legal).toBe(true);
    expect(r.rules.filter((x) => x.status === "fail")).toEqual([]);
  });

  it("calls a 39-card list illegal", () => {
    expect(rows(LEGAL.replace("1 Promising Future", "")).legal).toBe(false);
  });

  it("prints every rule the spec asked for, in a stable order", () => {
    expect(rows(LEGAL).rules.map((x) => x.rule)).toEqual([
      "103.1",
      "103.1.b",
      "103.2.a.2",
      "103.2 · Tournament Rules 402.1",
      "103.2.b",
      "103.2.d",
      "103.3.a · 103.3.a.1",
      "103.4.a · 103.4.c",
      "103.2.e",
    ]);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/build.test.ts -t "103.2.d"`
Expected: FAIL — no row starts with `103.2.d`.

- [ ] **Step 3: Write the implementation**

Add to `src/build.ts`:

```ts
import { deckRestrictions } from "./deck.js";

/**
 * 103.2.d caps a deck at 3 Signature cards carrying the legend's champion tag. Riot's gallery API ships no
 * Signature flag and no card carries a Signature tag, so this row states the rule and stops there. A
 * heuristic here would sit next to eight computed rows and read like one of them.
 */
function signatureRule(): BuildRule {
  return {
    rule: "103.2.d",
    label: "Up to 3 Signature cards",
    status: "unknown",
    detail: "Riot's card data carries no Signature marker, so this one is on you: at most 3 Signature cards, all with your legend's champion tag.",
  };
}

function legalityRule(deck: Deck, cards: CardIndex, format: Format): BuildRule {
  const base = { rule: "103.2.e", label: "Legal in this format" };
  const found = deckRestrictions(deck, cards, format);
  const banned = found.filter((r) => r.entry.status === "banned");
  if (banned.length) {
    return { ...base, status: "fail", detail: `${banned.map((r) => `${r.entry.name} (banned)`).join(" · ")}. See the panel above for Riot's notice.` };
  }
  const restricted = found.filter((r) => r.entry.status === "restricted");
  if (restricted.length) {
    // Restricted is a cap, not an illegal card (#23), and the one entry on the list today is a per-team
    // limit on a legend rather than a copy count. Saying "illegal" here would be false.
    return { ...base, status: "unknown", detail: `${restricted.map((r) => `${r.entry.name} is restricted`).join(" · ")} in this format — a cap, not a ban. See the panel above.` };
  }
  return { ...base, status: "pass", detail: "No banned or restricted card in this list." };
}
```

Register both, in the spec's order:

```ts
  const rules: BuildRule[] = [
    legendRule(deck, cards),
    identityRule(deck, cards),
    championRule(deck, cards),
    sizeRule(deck),
    copiesRule(deck, cards),
    signatureRule(),
    runeRule(deck, cards),
    battlefieldRule(deck, cards),
    legalityRule(deck, cards, format),
  ];
```

- [ ] **Step 4: Run the whole suite**

Run: `npm test && npm run typecheck`
Expected: every test passes; `test/build.test.ts` has 35 tests.

- [ ] **Step 5: Commit**

```bash
git add src/build.ts test/build.test.ts
git commit -m "$(cat <<'EOF'
Construcción: la fila de Signature que NO se computa, la legalidad, y el badge

103.2.d se enuncia y se marca sin comprobar: los datos de Riot no traen marca de
Signature y adivinarla la pondría al lado de ocho filas que sí se calculan.
Restricted no es ilegal: es un tope, y se muestra distinto.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 9: `encodeDeckCode` and `deckToText`

**Files:**
- Modify: `src/deck.ts`
- Modify: `test/deck.test.ts`
- Create: `test/fixtures/piltover-api.json`

- [ ] **Step 1: Capture a real `/api/deck-url` payload as a fixture**

The route is an edge function and `npm run dev` is broken, so build the payload from the parser itself
against a real Piltover page. Run:

```bash
cd ~/proyectos/RiftCombo
npx tsx -e '
const url = "https://piltoverarchive.com/decks/view/";  // paste a public deck slug after this
' 2>/dev/null || true
```

If no public deck link is at hand, write the fixture by hand in exactly the shape `api/deck-url.ts`
returns (`api/deck-url.ts:65`) — that shape is what the test pins, and hand-writing it is honest as long as
the shape matches the code. Create `test/fixtures/piltover-api.json`:

```json
{
  "title": "Lux Forge",
  "source": "https://piltoverarchive.com/decks/view/example",
  "entries": [
    { "code": "OGS-021", "name": "", "count": 1, "section": "legend" },
    { "code": "OGS-006", "name": "Lux, Illuminated", "count": 1, "section": "champion" },
    { "code": "UNL-214", "name": "Ripper's Bay", "count": 1, "section": "battlefields" },
    { "code": "OGN-293", "name": "The Grand Plaza", "count": 1, "section": "battlefields" },
    { "code": "OGN-288", "name": "Startipped Peak", "count": 1, "section": "battlefields" },
    { "code": "OGN-089", "name": "Mind Rune", "count": 6, "section": "runes" },
    { "code": "OGN-214", "name": "Order Rune", "count": 6, "section": "runes" },
    { "code": "OGN-212", "name": "Forge of the Future", "count": 3, "section": "main" },
    { "code": "OGN-110", "name": "Ekko, Recurrent", "count": 3, "section": "main" },
    { "code": "UNL-165", "name": "Shadow's Call", "count": 3, "section": "main" },
    { "code": "UNL-173", "name": "Sacrifice", "count": 3, "section": "main" },
    { "code": "OGN-104", "name": "Retreat", "count": 2, "section": "sideboard" }
  ]
}
```

- [ ] **Step 2: Write the failing tests**

Append to `test/deck.test.ts`:

```ts
import { deckToText, encodeDeckCode } from "../src/deck.js";

describe("writing a deck back out", () => {
  const payload = JSON.parse(readFileSync(new URL("./fixtures/piltover-api.json", import.meta.url), "utf8")) as {
    title: string;
    entries: { code: string; name: string; count: number; section: string }[];
  };

  it("serialises a Piltover Archive payload into a list our own parser reads back identically", () => {
    const text = deckToText(payload.entries, cards);
    const round = loadDeck(text, cards);
    const direct = normalizeDeck(payload.entries, cards);
    expect(round).toEqual(direct);
  });

  it("writes the sections a player expects to see, in reading order", () => {
    const text = deckToText(payload.entries, cards);
    const at = (s: string) => text.indexOf(s);
    expect(at("Legend")).toBeGreaterThan(-1);
    expect(at("Legend")).toBeLessThan(at("Champion"));
    expect(at("Champion")).toBeLessThan(at("Battlefields"));
    expect(at("Battlefields")).toBeLessThan(at("Runes"));
    expect(at("Runes")).toBeLessThan(at("Main Deck"));
    expect(at("Main Deck")).toBeLessThan(at("Sideboard"));
    expect(text).toContain("6 Mind Rune (OGN-089)");
  });

  it("keeps an unrecognised entry in the text rather than dropping it", () => {
    const text = deckToText([{ code: "ZZZ-999", count: 2, section: "main" }], cards);
    expect(text).toContain("2 ZZZ-999");
  });

  it("round-trips a parsed list through a deck code", () => {
    const deck = loadDeck(fixture("lux.txt"), cards);
    const code = encodeDeckCode(deck);
    expect(isDeckCode(code)).toBe(true);
    const back = normalizeDeck(decodeDeckCode(code), cards);
    expect(back.legend).toBe(deck.legend);
    expect(back.champion).toBe(deck.champion);
    expect(back.main).toEqual(deck.main);
    expect(back.runes).toEqual(deck.runes);
    expect(back.battlefields).toEqual(deck.battlefields);
  });
});
```

- [ ] **Step 3: Run them to make sure they fail**

Run: `npx vitest run test/deck.test.ts -t "writing a deck back out"`
Expected: FAIL — `deckToText` and `encodeDeckCode` are not exported.

- [ ] **Step 4: Write the implementation**

Append to `src/deck.ts`:

```ts
import { getCodeFromDeck } from "@piltoverarchive/riftbound-deck-codes";

/**
 * The sections a written-out list carries, in the order a player reads them. The headers are the ones
 * SECTION_ALIASES above already accepts, so anything this writes, `parseDeckText` reads back.
 */
const SECTION_ORDER: [string, string][] = [
  ["legend", "Legend"],
  ["champion", "Champion"],
  ["battlefields", "Battlefields"],
  ["runes", "Runes"],
  ["main", "Main Deck"],
  ["sideboard", "Sideboard"],
];

/**
 * Serialise entries — a `/api/deck-url` payload, or anything else shaped like one — into the plaintext
 * dialect the textarea accepts. Every line carries BOTH the name and the code ("3 Sacrifice (UNL-173)"),
 * because the name is what a player recognises and the code is what survives a reprint. An entry the card
 * index does not know keeps whatever it came with, so importing a deck never silently loses a line.
 */
export function deckToText(entries: readonly DeckEntry[], cards: CardIndex): string {
  const bySection = new Map<string, string[]>();
  for (const e of entries) {
    const base = (e.code && cards.resolveCode(e.code)) || (e.name && cards.resolveName(e.name)) || null;
    const card = base ? cards.get(base) : undefined;
    const section = e.section && SECTION_ORDER.some(([k]) => k === e.section) ? e.section : "main";
    const line = card ? `${e.count} ${card.name} (${card.base})` : `${e.count} ${e.name ?? e.code ?? "?"}`;
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section)!.push(line);
  }
  return SECTION_ORDER
    .filter(([key]) => bySection.get(key)?.length)
    .map(([key, header]) => `${header}\n${bySection.get(key)!.join("\n")}`)
    .join("\n\n");
}

/**
 * A Piltover Archive deck code for a parsed list. The codec takes one flat array for everything that is
 * not a sideboard — legend, runes and battlefields included — plus the Chosen Champion separately; note
 * `deck.main` already holds the champion (see `normalizeDeck`), which is what "40 cards including a chosen
 * champion" means in Tournament Rules 402.1.
 */
export function encodeDeckCode(deck: Deck): string {
  const main: { cardCode: string; count: number }[] = [];
  const push = (bag: Record<string, number>) => {
    for (const [code, count] of Object.entries(bag)) main.push({ cardCode: code, count });
  };
  if (deck.legend) main.push({ cardCode: deck.legend, count: 1 });
  push(deck.main);
  push(deck.runes);
  push(deck.battlefields);
  const side = Object.entries(deck.sideboard).map(([cardCode, count]) => ({ cardCode, count }));
  return getCodeFromDeck(main, side, deck.champion ?? undefined);
}
```

Move the import to join the existing one at the top of the file:

```ts
import { getCodeFromDeck, getDeckFromCode } from "@piltoverarchive/riftbound-deck-codes";
```

- [ ] **Step 5: Run the tests and make sure they pass**

Run: `npm test`
Expected: PASS.

If the deck-code round trip drops the battlefields, print what the codec returned and check whether it
needs battlefields in the main array or refuses a code without a champion:

```bash
npx tsx -e '
import { loadCardIndex } from "./src/load.js";
import { loadDeck, encodeDeckCode, decodeDeckCode } from "./src/deck.js";
import { readFileSync } from "node:fs";
const c = loadCardIndex();
const d = loadDeck(readFileSync("test/fixtures/lux.txt", "utf8"), c);
const code = encodeDeckCode(d);
console.log(code);
console.log(JSON.stringify(decodeDeckCode(code), null, 1));
'
```

Fix the implementation to match what the codec really does; do not weaken the assertion.

- [ ] **Step 6: Commit**

```bash
git add src/deck.ts test/deck.test.ts test/fixtures/piltover-api.json
git commit -m "$(cat <<'EOF'
Mazos: escribir una lista de vuelta — deckToText y encodeDeckCode

Cada línea lleva nombre Y código, porque el nombre es lo que el jugador reconoce
y el código es lo que sobrevive a una reimpresión. Una entrada que el índice no
conoce se conserva tal cual: importar un mazo nunca pierde una línea en silencio.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 10: The router and the four views

**Files:**
- Create: `web/router.ts`
- Modify: `web/index.html`
- Modify: `web/styles.css`
- Modify: `test/headers.test.ts`
- Modify: `web/main.ts`

- [ ] **Step 1: Write the failing test**

Replace the `describe("the order of the deck panel")` block in `test/headers.test.ts` — keep its body and
add a new block before it:

```ts
describe("the top bar is a view switcher, not three anchors (#43)", () => {
  const home = page("index.html");

  it("has no anchors that scroll to a section at the foot of the page", () => {
    expect(home).not.toContain('href="#how"');
    expect(home).not.toContain('href="#data"');
  });

  it("links the four views by hash route", () => {
    for (const h of ["#/combos", "#/decks", "#/guide", "#/sources"]) expect(home, h).toContain(`href="${h}"`);
  });

  it("carries one container per view, all but Combos hidden in the HTML", () => {
    for (const id of ["view-combos", "view-decks", "view-guide", "view-sources"]) {
      expect(home, id).toContain(`id="${id}"`);
    }
    // Combos is the default view, so it is the one that ships visible; the router hides it when the
    // hash says otherwise, and the other three never flash before it runs.
    expect(/<section class="view" id="view-decks" hidden/.test(home), "view-decks must ship hidden").toBe(true);
    expect(/<section class="view" id="view-guide" hidden/.test(home), "view-guide must ship hidden").toBe(true);
    expect(/<section class="view" id="view-sources" hidden/.test(home), "view-sources must ship hidden").toBe(true);
  });
});
```

And in the existing `describe("the order of the deck panel")` block, replace the assertion chain — the
account panel leaves the deck panel in Task 13, so the order to pin becomes:

```ts
  it("leaves the four result panels in the order the user chose", () => {
    const home = page("index.html");
    const at = (id: string) => {
      const i = home.indexOf(`id="${id}"`);
      expect(i, `#${id} is missing from the deck panel`).toBeGreaterThan(-1);
      return i;
    };
    expect(at("deck-form")).toBeLessThan(at("bans"));
    expect(at("bans")).toBeLessThan(at("status-card"));
    expect(at("status-card")).toBeLessThan(at("plan"));
    expect(at("plan")).toBeLessThan(at("synergy"));
  });
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `npx vitest run test/headers.test.ts`
Expected: FAIL — `href="#how"` is still in the page and no `view-*` container exists.

- [ ] **Step 3: Write the router**

Create `web/router.ts`:

```ts
// The four views (#43). Before this, "Combos · Guide · Sources" were anchors that scrolled to two
// sections at the foot of the page: they looked like tabs and were not. This is the only file that knows
// the view names, so adding a fifth is one entry in VIEWS and one container in the HTML.
//
// Routes:  #/combos  #/combos?deck=<id>  #/decks  #/decks/new  #/decks/<id>  #/guide  #/sources
// Legacy:  #deck=<list>  — a deck code or list shared before this existed still opens Combos with it.

export const VIEWS = ["combos", "decks", "guide", "sources"] as const;
export type ViewName = (typeof VIEWS)[number];

export interface Route {
  view: ViewName;
  /** The saved deck id in `#/decks/<id>`, or the literal "new". Null on every other route. */
  deckId: string | null;
  /** `#/combos?deck=<id>`: which saved deck the Combos view is showing. */
  analyzing: string | null;
  /** Legacy `#deck=<list>`: a list or deck code carried in the hash itself. */
  legacyDeck: string | null;
}

const DEFAULT: Route = { view: "combos", deckId: null, analyzing: null, legacyDeck: null };

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  if (raw.startsWith("deck=")) return { ...DEFAULT, legacyDeck: decodeURIComponent(raw.slice(5)) };
  const [path, query = ""] = raw.replace(/^\//, "").split("?");
  const [head, tail] = (path ?? "").split("/");
  const view = (VIEWS as readonly string[]).includes(head ?? "") ? (head as ViewName) : "combos";
  const params = new URLSearchParams(query);
  return {
    view,
    deckId: view === "decks" && tail ? decodeURIComponent(tail) : null,
    analyzing: view === "combos" ? params.get("deck") : null,
    legacyDeck: null,
  };
}

export const route = (): Route => parseHash(location.hash);

/** Write a route into the hash. Pushing a new entry is what makes Back and Forward work. */
export function go(hash: string): void {
  if (location.hash === hash) { apply(); return; }
  location.hash = hash;
}

const listeners: ((r: Route) => void)[] = [];

function apply(): void {
  const r = route();
  for (const name of VIEWS) {
    document.querySelector<HTMLElement>(`#view-${name}`)!.hidden = name !== r.view;
  }
  for (const a of document.querySelectorAll<HTMLAnchorElement>(".topnav a")) {
    a.classList.toggle("active", a.getAttribute("href") === `#/${r.view}`);
  }
  for (const cb of listeners) cb(r);
}

/** Register a listener and run it once for the route the page opened on. */
export function onRoute(cb: (r: Route) => void): void {
  listeners.push(cb);
}

export function startRouter(): void {
  window.addEventListener("hashchange", apply);
  apply();
}
```

- [ ] **Step 4: Restructure the HTML**

In `web/index.html`:

1. Replace the `<nav class="topnav">` block with:

```html
  <nav class="topnav">
    <a href="#/combos">Combos</a>
    <a href="#/decks">My decks</a>
    <a href="#/guide">Guide</a>
    <a href="#/sources">Sources</a>
  </nav>
```

2. Wrap `<div class="app-shell" id="shell">…</div>` in a view container. The opening tag becomes:

```html
<section class="view" id="view-combos">
<div class="app-shell" id="shell">
```

and immediately after the closing `</div>` of `.app-shell`, add `</section>`.

3. Add the empty decks container right after it (Task 11 fills it):

```html
<section class="view" id="view-decks" hidden>
  <div class="decks" id="decks-host"></div>
</section>
```

4. Turn the existing `<section class="doc" id="how">…</section>` into:

```html
<section class="view" id="view-guide" hidden>
  <div class="doc" id="how">
    …the existing <h2>Guide</h2> and <ol> unchanged…
  </div>
</section>
```

5. Turn `<footer class="doc colophon" id="data">…</footer>` into:

```html
<section class="view" id="view-sources" hidden>
  <footer class="doc colophon" id="data">
    …the existing content unchanged…
  </footer>
</section>
```

Keep `id="how"`, `id="data"` and `id="data-note"` — `web/main.ts:123` appends to `#data-note` and the
`data-when="candidates"` elements live inside both.

- [ ] **Step 5: Update the stylesheet**

In `web/styles.css`, replace the `body[data-auth=…]` rule that hides `.app-shell` and `.doc` with one that
hides the view host, and add the view container rules:

```css
/* Views (#43): one is on screen at a time; the router toggles [hidden], which is display:none !important. */
.view { display: block; }
body[data-auth="pending"] .view, body[data-auth="pending"] .topnav, body[data-auth="pending"] .topbar-right,
body[data-auth="out"] .view, body[data-auth="out"] .topnav, body[data-auth="out"] .topbar-right { display: none; }
```

Delete the old rule naming `.app-shell` and `.doc` so the two do not fight.

- [ ] **Step 6: Start the router from `web/main.ts`**

At the top of `web/main.ts`, add to the imports:

```ts
import { go, onRoute, route, startRouter } from "./router.js";
```

In `boot()`, replace the legacy-hash block:

```ts
  const hash = decodeURIComponent(location.hash.replace(/^#deck=/, ""));
  if (location.hash.startsWith("#deck=") && hash) { input.value = hash; void run(); }
```

with:

```ts
  // A `#deck=<list>` link shared before the views existed still opens Combos with that list.
  const opened = route();
  if (opened.legacyDeck) { input.value = opened.legacyDeck; void run(); }
  startRouter();
```

and change the one line in `run()` that writes the hash:

```ts
    if (source === "text") location.hash = isDeckCode(text) ? `deck=${encodeURIComponent(text)}` : "";
```

to:

```ts
    if (source === "text") go(isDeckCode(text) ? `#deck=${encodeURIComponent(text)}` : "#/combos");
```

- [ ] **Step 7: Run the tests and the build**

Run: `npm test && npm run typecheck && npm run build:web`
Expected: all pass.

- [ ] **Step 8: Look at it**

```bash
cd public && python3 -m http.server 8788
```

Open `http://127.0.0.1:8788`, sign in, and click each of the four nav items. Combos, Guide and Sources
must swap in place with no scrolling; the underline follows the active one; Back returns to the previous
view. Then stop the server:

```bash
lsof -ti :8788 | xargs kill
```

- [ ] **Step 9: Commit**

```bash
git add web/router.ts web/index.html web/styles.css web/main.ts test/headers.test.ts public
git commit -m "$(cat <<'EOF'
Pestañas de verdad: cuatro vistas en el hash, y Guide y Sources dejan de ser anclas

"Combos · Guide · Sources" parecían pestañas y eran anclas que hacían scroll al
pie. Ahora la barra conmuta cuatro vistas, la activa vive en el hash y Atrás y
Adelante del navegador funcionan. El link viejo #deck=<lista> sigue abriendo Combos.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 11: The My decks library

**Files:**
- Create: `web/decks.ts`
- Modify: `web/index.html`
- Modify: `web/styles.css`
- Modify: `web/main.ts`

- [ ] **Step 1: Write the library shell**

Create `web/decks.ts`. This task writes the library half; Task 12 adds the detail half to the same file.

```ts
// My decks (#43): the library of saved lists and, in Task 12, the detail that edits one.
//
// Everything that can answer without a network lives in src/ and has tests — src/saved.ts for names and
// ordering, src/build.ts for construction, src/deck.ts for parsing and writing. This file is the DOM.

import { checkBuild, type BuildReport } from "../src/build.js";
import { deckToText, loadDeck } from "../src/deck.js";
import { checkSave, savedSummary, sortSaved, MAX_NAME, type SavedDeck } from "../src/saved.js";
import type { CardIndex } from "../src/cards.js";
import type { DeckEntry } from "../src/deck.js";
import type { Domain, Format } from "../src/types.js";
import { accountsEnabled, createDeck, deleteDeck, listDecks, onAccount, updateDeck, type Account } from "./supabase.js";
import { go, onRoute, type Route } from "./router.js";

export interface DeckHooks {
  cards(): CardIndex;
  /** Open Combos with this list loaded, and show the "Analyzing <name>" strip. */
  analyze(deck: SavedDeck): void;
}

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

let hooks: DeckHooks;
let account: Account | null = null;
let decks: SavedDeck[] = [];
let loaded = false;
let message = "";
let host: HTMLElement;

/** How long ago, in the words a player uses. */
function ago(iso: string): string {
  const secs = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
  const steps: [number, string][] = [[60, "second"], [3600, "minute"], [86400, "hour"], [2592000, "day"], [31536000, "month"]];
  let unit = "year", n = secs / 31536000;
  for (const [limit, label] of steps) {
    if (secs < limit) { const div = limit === 60 ? 1 : limit === 3600 ? 60 : limit === 86400 ? 3600 : limit === 2592000 ? 86400 : 2592000; unit = label; n = secs / div; break; }
  }
  const whole = Math.floor(n);
  return whole <= 0 ? "just now" : `${whole} ${unit}${whole === 1 ? "" : "s"} ago`;
}

export function initDecks(h: DeckHooks): void {
  if (!accountsEnabled) return;
  hooks = h;
  host = $<HTMLElement>("#decks-host");
  host.addEventListener("click", onClick);
  onAccount((next) => {
    account = next;
    decks = [];
    loaded = false;
    if (account) void guard(async () => { decks = sortSaved(await listDecks()); loaded = true; });
    else render();
  });
  onRoute((r) => { if (r.view === "decks") render(); });
}

async function guard(fn: () => Promise<void>): Promise<void> {
  try { message = ""; await fn(); }
  catch (err) { message = (err as Error).message; }
  render();
}

/** The library, or the detail when the route names one. Task 12 fills `detailView`. */
function render(): void {
  if (!accountsEnabled || !host) return;
  const r = routeNow();
  host.innerHTML = r.deckId ? detailView(r.deckId) : libraryView();
}

let current: Route = { view: "combos", deckId: null, analyzing: null, legacyDeck: null };
onRoute((r) => { current = r; });
const routeNow = () => current;

function libraryView(): string {
  if (!account) return "";
  const rows = decks.map(deckCard).join("");
  return `<header class="decks-head">
      <div><h1 class="decks-title">My decks</h1>
      <p class="decks-sub">${decks.length ? `${decks.length} saved list${decks.length === 1 ? "" : "s"}. Nothing here is public.` : "Nothing saved yet."}</p></div>
      <div class="decks-acts">
        <button type="button" class="primary" data-act="new">New deck</button>
      </div>
    </header>
    <form class="decks-import" data-act="import-form">
      <label class="field-label" for="decks-url">Import from Piltover Archive</label>
      <div class="url-row">
        <input id="decks-url" type="url" inputmode="url" placeholder="https://piltoverarchive.com/decks/view/…" autocomplete="off" spellcheck="false">
        <button type="submit" class="ghost" data-act="import">Import</button>
      </div>
      <p class="fine">Public decks only. The link is fetched once through this site's own server; the list is saved to your account under the title Piltover gives it.</p>
    </form>
    <p class="acct-msg" id="decks-msg">${esc(message)}</p>
    ${decks.length ? `<div class="deck-grid">${rows}</div>` : loaded ? `<p class="plan-note">Press <strong>New deck</strong> to write one out, or paste a Piltover Archive link above.</p>` : `<p class="plan-note">Loading your decks…</p>`}`;
}

const DOMAIN_ORDER: Domain[] = ["fury", "calm", "mind", "body", "chaos", "order"];

function deckCard(d: SavedDeck): string {
  const cards = hooks.cards();
  const deck = loadDeck(d.deckText, cards);
  const report: BuildReport = checkBuild(deck, cards, d.format);
  const legend = deck.legend ? cards.get(deck.legend)!.name.replace(/ - Starter$/, "") : "No legend";
  const dots = (deck.legend ? cards.domainsOf(deck.legend) : [])
    .sort((a, b) => DOMAIN_ORDER.indexOf(a) - DOMAIN_ORDER.indexOf(b))
    .map((dm) => `<span class="dom-dot dom-${esc(dm)}" title="${esc(dm)}"></span>`).join("");
  return `<a class="deck-card" href="#/decks/${encodeURIComponent(d.id)}">
    <span class="deck-card-top">
      <span class="deck-card-name">${esc(d.name)}</span>
      <span class="badge ${report.legal ? "ok" : "bad"}">${report.legal ? "Legal" : "Illegal"}</span>
    </span>
    <span class="deck-card-legend">${dots}${esc(legend)}</span>
    <span class="deck-card-meta">${esc(savedSummary(d.deckText, cards))} · ${esc(d.format === "2v2" ? "2v2" : "Constructed")}</span>
    <span class="deck-card-when">Edited ${esc(ago(d.updatedAt))}</span>
  </a>`;
}

function onClick(ev: Event): void {
  const el = (ev.target as Element).closest<HTMLElement>("[data-act]");
  if (!el) return;
  switch (el.dataset["act"]) {
    case "new": ev.preventDefault(); go("#/decks/new"); return;
    case "import": ev.preventDefault(); void guard(importFromPiltover); return;
  }
}

/**
 * Fetch, serialise and save in one press, then open the new deck's detail. The row still stores
 * `deck_text` — importing changes where the text came from, not the schema.
 */
async function importFromPiltover(): Promise<void> {
  if (!account) return;
  const url = $<HTMLInputElement>("#decks-url").value.trim();
  if (!url) { message = "Paste a Piltover Archive deck link first."; return; }
  const res = await fetch(`/api/deck-url?url=${encodeURIComponent(url)}`);
  const payload = (await res.json().catch(() => ({}))) as { entries?: DeckEntry[]; title?: string; error?: string };
  if (!res.ok || !payload.entries) throw new Error(payload.error ?? "Could not read that deck.");
  const text = deckToText(payload.entries, hooks.cards());
  const check = checkSave(payload.title ?? "Imported deck", text, decks);
  if (!check.ok) { message = check.message; return; }
  const created = await createDeck(account.id, check.name, text, "constructed");
  decks = sortSaved([created, ...decks]);
  go(`#/decks/${encodeURIComponent(created.id)}`);
}

function detailView(_id: string): string {
  return "";  // Task 12
}
```

- [ ] **Step 2: Style the library**

Append to `web/styles.css`:

```css
/* My decks (#43) */
.decks { max-width: 980px; margin: 0 auto; padding: 32px 24px 40px; display: flex; flex-direction: column; gap: 18px; }
.decks-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.decks-title { margin: 0; font-size: 22px; }
.decks-sub { margin: 4px 0 0; font-size: 13.5px; color: var(--muted); }
.decks-import { display: flex; flex-direction: column; gap: 6px; padding: 14px 16px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); }
.deck-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }
.deck-card { display: flex; flex-direction: column; gap: 6px; padding: 14px 15px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); }
.deck-card:hover { border-color: var(--accent); }
.deck-card-top { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.deck-card-name { font-weight: 600; font-size: 14.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.deck-card-legend { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text); }
.deck-card-meta, .deck-card-when { font-size: 11.5px; color: var(--muted); }
.deck-card-when { color: var(--faint); }
.dom-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dom-fury { background: var(--dom-fury); } .dom-calm { background: var(--dom-calm); }
.dom-mind { background: var(--dom-mind); } .dom-body { background: var(--dom-body); }
.dom-chaos { background: var(--dom-chaos); } .dom-order { background: var(--dom-order); }
.badge { flex: 0 0 auto; padding: 2px 8px; border: 1px solid var(--line-2); border-radius: 6px; font: 500 10.5px var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.badge.ok { color: var(--ok); border-color: var(--ok); }
.badge.bad { color: var(--danger); border-color: var(--danger); }
```

- [ ] **Step 3: Boot it from `web/main.ts`**

Add the import:

```ts
import { initDecks } from "./decks.js";
```

and inside `boot()`, right after `initAccount({…})`:

```ts
  initDecks({
    cards: () => cards,
    analyze: (saved) => {
      $<HTMLInputElement>(`input[name=format][value="${saved.format}"]`).checked = true;
      input.value = saved.deckText;
      urlInput.value = "";
      input.dispatchEvent(new Event("input"));
      analyzing = saved;
      go(`#/combos?deck=${encodeURIComponent(saved.id)}`);
      void run("text");
    },
  });
```

and declare the module-level state the strip in Task 13 reads:

```ts
/** The saved deck Combos is currently showing, when it was opened from My decks. */
let analyzing: SavedDeck | null = null;
```

with `import type { SavedDeck } from "../src/saved.js";` added to the imports.

- [ ] **Step 4: Verify**

Run: `npm test && npm run typecheck && npm run build:web`
Expected: all pass.

Then look at it: `cd public && python3 -m http.server 8788`, sign in, open `#/decks`. With no saved
decks the empty sentence and the two ways in are on screen; with one saved from the old panel it shows
as a card with a Legal/Illegal badge and the legend's two domain dots. `lsof -ti :8788 | xargs kill`.

- [ ] **Step 5: Commit**

```bash
git add web/decks.ts web/main.ts web/styles.css public
git commit -m "$(cat <<'EOF'
My decks: la biblioteca, con badge de legalidad y los dos puntos de dominio

Cada tarjeta valida su lista con checkBuild al dibujarse, así que el badge se
recalcula contra el catálogo de hoy en vez de guardarse con la fila. Importar de
Piltover baja, serializa y guarda en un solo paso.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 12: The deck detail — editor, validation panel, and the five buttons

**Files:**
- Modify: `web/decks.ts`
- Modify: `web/styles.css`

- [ ] **Step 1: Replace the `detailView` stub**

In `web/decks.ts`, add the editing state near the other module-level `let`s:

```ts
/** What the editor holds right now. Null when the detail is not open. */
let draft: { id: string | null; name: string; text: string; format: Format } | null = null;
let confirmingDelete = false;
let copied = false;
```

Replace `detailView`:

```ts
function detailView(id: string): string {
  if (!account) return "";
  const saved = id === "new" ? null : decks.find((d) => d.id === id) ?? null;
  if (id !== "new" && !saved) {
    // Deleted in another browser, or a stale link. Say so instead of drawing an empty editor.
    if (loaded) { message = "That deck is not in your account any more."; queueMicrotask(() => go("#/decks")); }
    return "";
  }
  // Rebuild the draft only when the route moved to a different deck: re-deriving it on every keystroke
  // would throw away what is being typed.
  if (!draft || draft.id !== (saved?.id ?? null)) {
    draft = { id: saved?.id ?? null, name: saved?.name ?? "", text: saved?.deckText ?? "", format: saved?.format ?? "constructed" };
    confirmingDelete = false;
    copied = false;
  }

  const cards = hooks.cards();
  const deck = loadDeck(draft.text, cards);
  const report = checkBuild(deck, cards, draft.format);
  const dirty = !saved || saved.name !== draft.name.trim() || saved.deckText !== draft.text || saved.format !== draft.format;
  const summary = draft.text.trim() ? savedSummary(draft.text, cards) : "Nothing pasted yet";

  return `<nav class="detail-back"><a href="#/decks">← My decks</a></nav>
  <div class="detail">
    <section class="detail-edit">
      <input id="deck-name" class="detail-name" type="text" maxlength="${MAX_NAME}" autocomplete="off" spellcheck="false"
        placeholder="Name this deck" aria-label="Deck name" value="${esc(draft.name)}">
      <fieldset class="segmented small" aria-label="Format">
        <label><input type="radio" name="deck-format" value="constructed"${draft.format === "constructed" ? " checked" : ""}><span>Constructed</span></label>
        <label><input type="radio" name="deck-format" value="2v2"${draft.format === "2v2" ? " checked" : ""}><span>2v2</span></label>
      </fieldset>
      <textarea id="deck-text" rows="18" spellcheck="false" autocomplete="off"
        placeholder="Legend&#10;1 Lady of Luminosity - Starter&#10;&#10;Champion&#10;1 Lux, Illuminated&#10;&#10;Main Deck&#10;3 Forge of the Future&#10;…&#10;&#10;or a deck code: CMAAAAAAAAAACAQAABM5MAIA…">${esc(draft.text)}</textarea>
      <p class="fine">Plain lists, Piltover Archive exports, TTS dumps and deck codes all work · ${esc(summary)}</p>
      <p class="notice">Nothing is written to your account until you press ${saved ? "Update" : "Save"}. There is no auto-save.</p>
      <div class="detail-acts">
        <button type="button" class="primary" data-act="save"${dirty ? "" : " disabled"}>${saved ? "Update" : "Save"}</button>
        <button type="button" class="ghost" data-act="analyze"${draft.text.trim() ? "" : " disabled"}>Analyze combos</button>
        <button type="button" class="ghost" data-act="export"${deck.legend || draft.text.trim() ? "" : " disabled"}>${copied ? "Copied" : "Export deck code"}</button>
        ${saved ? (confirmingDelete
          ? `<button type="button" class="linklike danger" data-act="delete-confirm">Delete for good</button>
             <button type="button" class="linklike" data-act="delete-cancel">Keep</button>`
          : `<button type="button" class="linklike danger" data-act="delete">Delete</button>`) : ""}
      </div>
      <p class="acct-msg" id="decks-msg">${esc(message)}</p>
    </section>
    <aside class="detail-check">
      <h2 class="plan-head">Construction</h2>
      <p class="build-badge ${report.legal ? "ok" : "bad"}">${report.legal ? "Legal" : "Illegal"}<span>${esc(draft.format === "2v2" ? "2v2" : "Constructed")}</span></p>
      <div class="build-rows">${report.rules.map(buildRow).join("")}</div>
      <p class="fine">Every row cites the paragraph it stands on, in Riftbound's Core Rules of 2026-07-16 and the Tournament Rules of the same date. A row marked <strong>unchecked</strong> is a rule this site states but cannot verify from Riot's card data.</p>
    </aside>
  </div>`;
}

const STATUS_WORD = { pass: "ok", fail: "fix", unknown: "unchecked" } as const;

function buildRow(r: { rule: string; label: string; status: "pass" | "fail" | "unknown"; detail: string }): string {
  return `<div class="build-row ${r.status}">
    <p class="build-label">${esc(r.label)}<span class="build-rule">${esc(r.rule)}</span></p>
    <p class="build-detail">${esc(r.detail)}</p>
    <span class="build-state">${STATUS_WORD[r.status]}</span>
  </div>`;
}
```

- [ ] **Step 2: Wire the detail's own events**

Extend `onClick` in `web/decks.ts` and add an `input`/`change` listener. Replace `initDecks`'s single
`host.addEventListener("click", onClick)` with all three:

```ts
  host.addEventListener("click", onClick);
  host.addEventListener("input", (ev) => {
    const t = ev.target as HTMLElement;
    if (!draft) return;
    if (t.id === "deck-name") { draft.name = (t as HTMLInputElement).value; refreshActions(); }
    if (t.id === "deck-text") { draft.text = (t as HTMLTextAreaElement).value; render(); restoreCaret(t as HTMLTextAreaElement); }
  });
  host.addEventListener("change", (ev) => {
    const t = ev.target as HTMLInputElement;
    if (draft && t.name === "deck-format") { draft.format = t.value as Format; render(); }
  });
```

Re-rendering on every keystroke would move the caret to the end of the textarea, so keep the caret:

```ts
/** Re-rendering replaces the textarea, so put the caret back where the typist left it. */
function restoreCaret(previous: HTMLTextAreaElement): void {
  const { selectionStart, selectionEnd } = previous;
  const next = document.querySelector<HTMLTextAreaElement>("#deck-text");
  if (!next) return;
  next.focus();
  next.setSelectionRange(selectionStart, selectionEnd);
}

/** Typing a name only changes whether Save is enabled; it must not rebuild the box being typed into. */
function refreshActions(): void {
  const saved = decks.find((d) => d.id === draft?.id);
  const dirty = !saved || !draft || saved.name !== draft.name.trim() || saved.deckText !== draft.text || saved.format !== draft.format;
  const btn = document.querySelector<HTMLButtonElement>('[data-act="save"]');
  if (btn) btn.disabled = !dirty;
}
```

Add the new cases to `onClick`:

```ts
    case "save": ev.preventDefault(); void guard(saveDraft); return;
    case "analyze": {
      ev.preventDefault();
      const saved = decks.find((d) => d.id === draft?.id);
      if (saved && draft && saved.deckText === draft.text) { hooks.analyze(saved); return; }
      // An unsaved edit is still worth analysing; hand Combos the text under the name being edited.
      if (draft) hooks.analyze({ id: draft.id ?? "", name: draft.name || "This list", deckText: draft.text, format: draft.format, createdAt: "", updatedAt: "" });
      return;
    }
    case "export": ev.preventDefault(); void guard(exportCode); return;
    case "delete": ev.preventDefault(); confirmingDelete = true; render(); return;
    case "delete-cancel": ev.preventDefault(); confirmingDelete = false; render(); return;
    case "delete-confirm": ev.preventDefault(); void guard(removeDraft); return;
```

and the three actions:

```ts
async function saveDraft(): Promise<void> {
  if (!account || !draft) return;
  const check = checkSave(draft.name, draft.text, decks, draft.id ?? undefined);
  if (!check.ok) { message = check.message; return; }
  if (draft.id) {
    const updated = await updateDeck(draft.id, { name: check.name, deckText: draft.text, format: draft.format });
    decks = sortSaved(decks.map((d) => (d.id === updated.id ? updated : d)));
    message = `Updated "${updated.name}".`;
  } else {
    const created = await createDeck(account.id, check.name, draft.text, draft.format);
    decks = sortSaved([created, ...decks]);
    draft = null;
    message = `Saved "${created.name}".`;
    go(`#/decks/${encodeURIComponent(created.id)}`);
  }
}

async function exportCode(): Promise<void> {
  if (!draft) return;
  const code = encodeDeckCode(loadDeck(draft.text, hooks.cards()));
  await navigator.clipboard.writeText(code);
  copied = true;
  message = "Deck code copied to the clipboard.";
}

async function removeDraft(): Promise<void> {
  if (!draft?.id) return;
  await deleteDeck(draft.id);
  decks = decks.filter((d) => d.id !== draft!.id);
  draft = null;
  confirmingDelete = false;
  go("#/decks");
}
```

Add `encodeDeckCode` to the `src/deck.js` import at the top of the file.

- [ ] **Step 3: Guard leaving with unsaved changes**

The spec asks that leaving the detail with unsaved changes asks first. Add to `initDecks`, after the
`onRoute` registration:

```ts
  // Leaving the detail with an unsaved edit asks once. The listener sits on the route rather than on
  // beforeunload, because switching views is the way out that a player actually takes.
  onRoute((r) => {
    if (!draft) return;
    const leaving = r.view !== "decks" || r.deckId !== (draft.id ?? "new");
    if (!leaving) return;
    const saved = decks.find((d) => d.id === draft!.id);
    const dirty = !saved ? Boolean(draft.text.trim() || draft.name.trim()) : saved.deckText !== draft.text || saved.name !== draft.name.trim() || saved.format !== draft.format;
    if (dirty && !confirm("This deck has changes you have not saved. Leave and lose them?")) {
      go(`#/decks/${encodeURIComponent(draft.id ?? "new")}`);
      return;
    }
    draft = null;
  });
```

- [ ] **Step 4: Style the detail**

Append to `web/styles.css`:

```css
.detail-back { font-size: 13px; }
.detail-back a { color: var(--muted); }
.detail-back a:hover { color: var(--accent); }
.detail { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 22px; align-items: start; }
.detail-edit { display: flex; flex-direction: column; gap: 10px; }
.detail-name { padding: 10px 12px; border: 1px solid var(--line-2); border-radius: 6px; background: var(--panel); color: var(--text); font: 600 16px var(--font); }
.detail-name:focus { outline: none; border-color: var(--accent); }
.detail-acts { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.detail-check { display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid var(--line); border-radius: 10px; background: var(--panel); }
.build-badge { display: flex; justify-content: space-between; align-items: baseline; margin: 0; font: 600 15px var(--font); }
.build-badge span { font: 500 11px var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.build-badge.ok { color: var(--ok); } .build-badge.bad { color: var(--danger); }
.build-rows { display: flex; flex-direction: column; }
.build-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; padding: 9px 0; border-top: 1px solid var(--line); }
.build-label { grid-column: 1; margin: 0; font-size: 13px; font-weight: 500; }
.build-rule { margin-left: 8px; font: 400 10.5px var(--mono); color: var(--faint); }
.build-detail { grid-column: 1 / -1; margin: 0; font-size: 11.5px; line-height: 1.5; color: var(--muted); }
.build-state { grid-column: 2; grid-row: 1; align-self: start; font: 500 10px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--faint); }
.build-row.pass .build-state { color: var(--ok); }
.build-row.fail .build-state { color: var(--danger); }
.build-row.fail .build-label { color: var(--text); }
@media (max-width: 860px) { .detail { grid-template-columns: minmax(0, 1fr); } }
```

- [ ] **Step 5: Verify**

Run: `npm test && npm run typecheck && npm run build:web`
Expected: all pass.

Then serve `public/` and walk it: New deck → paste the example from `web/main.ts`'s `EXAMPLE` constant →
the Construction panel goes from a wall of failures to `Legal` as the list fills in → name it → Save →
back to My decks → the card is there with a `Legal` badge → open it → Export deck code → paste the
clipboard into the textarea of a New deck and confirm it parses back to the same list.

- [ ] **Step 6: Commit**

```bash
git add web/decks.ts web/styles.css public
git commit -m "$(cat <<'EOF'
My decks: el detalle — editor a la izquierda, las nueve reglas a la derecha

Save cuando el mazo es nuevo, Update cuando cambió, y deshabilitado sin cambios.
Salir con cambios sin guardar pregunta. Nada se escribe sin pulsar el botón.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 13: Combos loses the `Your decks` panel and gains the `Analyzing` strip

**Files:**
- Modify: `web/account.ts`
- Modify: `web/index.html`
- Modify: `web/main.ts`
- Modify: `web/styles.css`

- [ ] **Step 1: Strip the saved-deck panel out of `web/account.ts`**

`web/account.ts` keeps `gate()`, the header identity, sign-out and delete-account. Delete from it: the
`decks`, `loadedId`, `renaming`, `confirming`, `nameTouched` state; `save`, `overwrite`, `rename`,
`remove`, `deckRow`, `signedIn`, `followDeck`, `accountDeckChanged`; and the `AccountHooks` members
`deckText`, `format`, `restore`, `cards` — the whole interface goes, since nothing is left in it.

What the file becomes, in full:

```ts
// The account layer (#31, #39): sign in with Google, and say who is signed in. Since #43 the saved lists
// live in their own view (web/decks.ts) rather than in a panel under the deck input, so this file is only
// the session: `gate()` marks <body data-auth> as soon as the session is known and the stylesheet shows
// either the entrance or the app; the header shows the name and the way out.

import { accountsEnabled, deleteAccount, onAccount, signIn, signOut, type Account } from "./supabase.js";

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;

let account: Account | null = null;
/** Deleting the account is two clicks, and it is never the default one. */
let closing = false;
let message = "";

export function gate(): void {
  if (!accountsEnabled) { document.body.dataset["auth"] = "open"; return; }
  $<HTMLButtonElement>("#gate-signin").addEventListener("click", () => void signIn());
  onAccount((next) => { document.body.dataset["auth"] = next ? "in" : "out"; });
}

export function initAccount(): void {
  if (!accountsEnabled) return;
  $<HTMLElement>("#account-top").hidden = false;
  $<HTMLButtonElement>("#acct-signout").addEventListener("click", () => void guard(signOut));
  $<HTMLElement>("#account-body").addEventListener("click", onPanelClick);
  onAccount((next) => { account = next; render(); });
  render();
}

async function guard(fn: () => Promise<void>): Promise<void> {
  try { message = ""; await fn(); }
  catch (err) { message = (err as Error).message; }
  render();
}

function onPanelClick(ev: Event): void {
  const el = (ev.target as Element).closest<HTMLElement>("[data-act]");
  if (!el) return;
  switch (el.dataset["act"]) {
    case "close": closing = true; render(); return;
    case "close-cancel": closing = false; render(); return;
    case "close-confirm": void guard(async () => { await deleteAccount(); closing = false; }); return;
  }
}

function render(): void {
  if (!accountsEnabled) return;
  $<HTMLElement>("#acct-who").hidden = account === null;
  $<HTMLElement>("#acct-label").textContent = account?.label ?? "";
  $<HTMLElement>("#account").hidden = account === null;
  $<HTMLElement>("#account-body").innerHTML = account
    ? (closing
      ? `<p class="acct-note">Deleting the account removes it and every deck saved to it at once, with nothing kept. <button type="button" class="linklike danger" data-act="close-confirm">Delete for good</button> · <button type="button" class="linklike" data-act="close-cancel">Keep it</button></p>`
      : `<p class="acct-foot"><button type="button" class="linklike" data-act="close">Delete account</button> · <a href="/privacy">Privacy</a></p>`)
    : "";
  $<HTMLElement>("#account-msg").textContent = message;
}
```

- [ ] **Step 2: Move the account section in the HTML and add the strip**

In `web/index.html`:

1. Move `<section class="plan account" id="account" hidden>…</section>` from the deck panel to the FOOT of
   the deck panel, immediately before `<p class="legal">`. Its heading changes from `Your decks` to
   `Account`, since it now holds only "Delete account".

2. Add the Analyzing strip and the Save button inside the deck panel, immediately after the closing
   `</form>` of `#deck-form`:

```html
      <p class="analyzing" id="analyzing" hidden></p>
      <p class="save-here" id="save-here" hidden>
        <button type="button" class="linklike" id="save-to-decks">Save to My decks</button>
      </p>
```

- [ ] **Step 3: Wire both in `web/main.ts`**

Change the `initAccount({…})` call to plain `initAccount()` and delete the `accountDeckChanged` import and
its three call sites (`run()`, the `input` listener, and nothing else). Replace them with:

```ts
/** The strip that says which saved list Combos is showing, and the way back to its detail. */
function renderAnalyzing(): void {
  const strip = $<HTMLElement>("#analyzing");
  const save = $<HTMLElement>("#save-here");
  const matches = analyzing !== null && analyzing.deckText === input.value;
  strip.hidden = !matches;
  if (matches) {
    strip.innerHTML = `Analyzing <strong>${esc(analyzing!.name)}</strong> · <a href="#/decks/${esc(encodeURIComponent(analyzing!.id))}">edit it</a>`;
  }
  save.hidden = matches || !input.value.trim() || !accountsEnabled;
}
```

Import `accountsEnabled` from `./supabase.js`, call `renderAnalyzing()` at the end of `render()` and in
the textarea's `input` listener, and wire the button:

```ts
$<HTMLButtonElement>("#save-to-decks").addEventListener("click", () => {
  // A list pasted into Combos becomes a new deck in the library, opened for naming rather than saved
  // behind the player's back — nothing is written until they press Save there.
  sessionStorage.setItem("riftcombo:draft", input.value);
  go("#/decks/new");
});
```

and in `web/decks.ts`'s `detailView`, seed a brand-new draft from that handoff:

```ts
  if (!draft || draft.id !== (saved?.id ?? null)) {
    const handoff = saved ? null : sessionStorage.getItem("riftcombo:draft");
    if (handoff) sessionStorage.removeItem("riftcombo:draft");
    draft = { id: saved?.id ?? null, name: saved?.name ?? "", text: saved?.deckText ?? handoff ?? "", format: saved?.format ?? "constructed" };
    confirmingDelete = false;
    copied = false;
  }
```

- [ ] **Step 4: Style the strip**

Append to `web/styles.css`:

```css
.analyzing { margin: 0; padding: 8px 11px; border-left: 2px solid var(--accent); font-size: 12.5px; color: var(--muted); }
.analyzing strong { color: var(--text); font-weight: 600; }
.analyzing a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.save-here { margin: 0; }
```

- [ ] **Step 5: Verify**

Run: `npm test && npm run typecheck && npm run build:web`
Expected: all pass. `test/headers.test.ts`'s panel-order test no longer mentions `#account`, which Task 10
already handled.

Serve `public/`, and check both directions: My decks → open a deck → **Analyze combos** lands on Combos
with the list loaded and the strip naming it; pasting a fresh list into Combos shows **Save to My decks**,
which opens `#/decks/new` with the text already in the editor.

- [ ] **Step 6: Commit**

```bash
git add web/account.ts web/decks.ts web/main.ts web/index.html web/styles.css public
git commit -m "$(cat <<'EOF'
Combos: fuera el panel "Your decks", y una franja que dice qué mazo se está viendo

Los mazos guardados viven en su propia vista; el panel lateral vuelve a ser
"la respuesta sobre esta lista" y nada más. account.ts queda con la sesión.

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 14: Guide and Sources copy

**Files:**
- Modify: `web/index.html`

- [ ] **Step 1: Rewrite the Guide step that describes the old panel**

In the Guide `<ol>`, the item beginning `<strong>Your decks</strong>, under the list,` describes a panel
that no longer exists. Replace that one `<li>` with these two:

```html
    <li><strong>My decks</strong> is your own library. Press <strong>New deck</strong> to write a list out, or paste a public Piltover Archive link to import one. Nothing is written to your account until you press Save or Update — there is no auto-save.</li>
    <li>Opening a deck shows the list on the left and <strong>Construction</strong> on the right: one row per deck-building rule, each citing the paragraph of Riot's Core Rules it stands on. A row marked <em>unchecked</em> is a rule this site can state but not verify from Riot's card data — the Signature cap is the one that matters, because the card gallery carries no Signature marker. <strong>Analyze combos</strong> hands the list to the Combos view; <strong>Export deck code</strong> copies a code any Riftbound deck site reads.</li>
```

- [ ] **Step 2: Say what a saved list is, in Sources**

In the `#data` footer, after the existing `<p id="data-note">`, add:

```html
  <p>Saving a deck stores the list text you typed, not the result of matching it, so an old list is re-read against today's catalogue and today's ban list every time you open it. Only you can read your own rows.</p>
```

- [ ] **Step 3: Verify**

Run: `npm test && npm run typecheck && npm run build:web`
Expected: all pass — including `test/headers.test.ts`'s disclaimer and inline-style checks, which read
this file.

- [ ] **Step 4: Commit**

```bash
git add web/index.html public
git commit -m "$(cat <<'EOF'
Guide y Sources: los pasos de My decks y qué guarda una lista guardada

Refs #43

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01T7MEvSThuUsQfoi9wjn2YG
EOF
)"
```

---

## Task 15: The walkthrough, the deploy, and closing #43

**Files:** none new — this task verifies and ships.

- [ ] **Step 1: Full local verification**

```bash
cd ~/proyectos/RiftCombo
npm test && npm run typecheck && npm run build:web
git status --short
```

Expected: every test passes, typecheck is silent, the build prints the two sizes, and `git status` shows
only `public/` artifacts if anything.

- [ ] **Step 2: Serve and walk it with Playwright**

```bash
cd public && python3 -m http.server 8788 &
```

The build reads `.env.local`, so the hosted Supabase project answers on `http://127.0.0.1:8788` — it is in
the redirect allow-list. Drive it with the Playwright MCP and confirm, in order:

1. `http://127.0.0.1:8788` shows only the entrance (`body[data-auth="out"]`), one sign-in button.
2. Sign in with Google → the app appears, the header shows the name.
3. `#/decks` → the library. If it is empty, the empty sentence and the two ways in.
4. **New deck** → the editor. Paste the example list (the `EXAMPLE` constant in `web/main.ts`).
5. The Construction panel goes from `Illegal` to `Legal` as the paste lands. Screenshot it.
6. Name it, press **Save** → the message says Saved, the route becomes `#/decks/<uuid>`.
7. Back to **My decks** → the card is there, `Legal` badge, the legend's two domain dots, "Edited just now".
8. Open it → **Analyze combos** → Combos, with the list loaded and the `Analyzing <name>` strip on screen.
9. Back to the detail → change one line → **Update** enables → press it → the message says Updated.
10. **Export deck code** → the button reads `Copied`; paste the clipboard into a New deck and confirm it
    parses to the same list.
11. **Delete** → two clicks → back to `#/decks`, the card is gone.
12. Browser Back and Forward move between the views without reloading.

Then stop the server — by port, never by pattern:

```bash
lsof -ti :8788 | xargs kill
```

- [ ] **Step 3: Look at it as a player, not as the author**

Open the four tabs and read them cold. The three things this project has been burned by, which no test
catches: a panel that suggests something illegal, a card text rendered wrong, and copy that promises
something the code no longer does. Check specifically that the privacy sentence in the deck panel is still
true (nothing stored without Save) and that no view shows an emoji, a gradient or a decorative shadow.

- [ ] **Step 4: Push**

```bash
gh auth switch --user GermanAbuArab
git fetch origin
git merge-base --is-ancestor origin/master HEAD && echo "fast-forward, safe to push" || echo "rebase first"
```

If it says rebase first and your tree is clean: `git pull --rebase origin master`, re-run
`npm test && npm run typecheck && npm run build:web`, then push. If the tree holds another session's
unstaged work, stop and report instead of rebasing over it.

```bash
git push origin master
```

- [ ] **Step 5: Verify the deploy**

Deploy is a push to master; Vercel builds from the committed tree.

```bash
npx vercel ls riftcombo | head -5
curl -s https://riftcombo.app/app.js | grep -c "checkBuild\|103.2.b" || true
curl -sI https://riftcombo.app | head -3
```

Then open `https://riftcombo.app` in the browser, sign in, and repeat steps 3–8 of the walkthrough against
production. A local pass is not a deploy.

- [ ] **Step 6: Close the issue**

Only when every checkbox in the spec's "Pruebas" section has actually run. Comment on #43 with what
shipped, what is deliberately not checked (103.2.d, and why), and the walk's path. Then:

```bash
gh issue close 43 --comment "…"
```

If anything from the spec is still missing, do NOT close it: comment with what is left and leave it open.

---

## Self-review against the spec

| Spec point | Task |
|---|---|
| 1. Four views in the hash, Back/Forward, legacy `#deck=` | 10 |
| 1. Initial view is My decks when the player has one saved | **Task 11, Step 3** — add to `initDecks`: after the first `listDecks()` resolves, `if (!location.hash && decks.length) go("#/decks")` |
| 2. Library grid, badge, domain dots, New deck, Import from Piltover, empty state | 11 |
| 3. Detail: name, format, textarea, Construction column, summary, Save/Update/Export/Analyze/Delete, unsaved-changes guard | 12 |
| 4. `checkBuild` with a row per rule and a test per rule | 2–8 |
| 5. `encodeDeckCode` round-trip | 9 |
| 6. `deckToText` + import in one step | 9, 11 |
| 7. Combos loses `Your decks`, gains `Save to My decks` and the `Analyzing` strip | 13 |
| 8. Guide and Sources become views with the new steps | 10, 14 |
| 9. Privacy copy unchanged in substance, nothing saved without Save | 12, 14 |
| Tests: `build.test.ts`, `deck.test.ts`, `headers.test.ts`, Playwright | 2–9, 10, 15 |

Two deviations from the spec, both deliberate and both stated in the walk:

- **103.2.d (Signature) cannot be computed.** Riot's gallery data carries no Signature marker. The row
  ships as `unknown` rather than being invented or dropped. This is why `BuildRule.status` is a
  three-valued string instead of the spec's `ok: boolean`.
- **103.2.a.2 cannot exclude a signature unit** used as a Chosen Champion (the rule's own Tibbers example),
  for the same reason. The row passes and says so in its own detail rather than claiming more than it knows.
