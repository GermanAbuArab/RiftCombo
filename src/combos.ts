import { addCard, emptyDeck } from "./builder.js";
import type { CardIndex } from "./cards.js";
import { COMBO_KEYS, ZONES } from "./types.js";
import type { Combo, ComboClass, ComboStatus, Domain, Feature, Variant } from "./types.js";

/**
 * Copies an authored card set asks for that a legal deck could not hold (#216).
 *
 * `validateCombos` bounded `quantity` below and not above, so nothing stopped an entry declaring two
 * copies of a `[Unique]` card or four of a name — and `planDeck` would then price that for a player
 * as *copies to add*, on the panel `CLAUDE.md` describes as never recommending an illegal purchase.
 * It guards Domain Identity and banned cards and nothing else.
 *
 * THE CAPS ARE NOT RE-IMPLEMENTED HERE; the entry is REPLAYED through the builder's own `addCard`,
 * which already refuses an illegal click, and the question asked is whether it took every copy it
 * was offered. A flat `quantity <= 3` would be wrong in BOTH directions, because the caps are
 * ZONE-DEPENDENT: 103.3.a allows twelve runes and 103.4.c allows ONE battlefield of a name. Replay
 * gets 103.2.b with its `ANY_NUMBER` exemption, 825.3.a, 103.2.d, 103.3.a, 103.4.a and 103.4.c for
 * free, and stays correct the day any of them changes.
 *
 * LEGEND ROWS ARE SKIPPED ON PURPOSE AND CHECKED SEPARATELY. `addCard` on a legend SETS
 * `deck.legend`, and `identityCap` stands down only while that is null (`src/builder.ts:323`) — so
 * replaying a legend first would switch Domain Identity on and fail every off-domain row after it
 * with a message about the wrong rule. Identity is `planDeck`'s job and it already does it. What a
 * legend row owes instead is a quantity of exactly one, which 103.2.a.1 puts in the Champion Zone
 * before play; measured over the catalogue, all 115 legend rows are 1 today.
 */
function copyCapErrors(c: Combo, cards: CardIndex): string[] {
  const errors: string[] = [];
  const isLegend = (base: string) => cards.get(base)?.type.includes("legend") ?? false;
  const wanted = new Map<string, number>();
  for (const ing of c.uses) {
    // An unresolvable code already has its own error and `addCard` is a no-op for one, so replaying
    // it would report the same row twice under two different diagnoses. Caught by the existing
    // unknown-card test in `test/combos.test.ts`, which is what that test is for.
    if (!cards.get(ing.card)) continue;
    if (isLegend(ing.card)) {
      if (ing.quantity !== 1) errors.push(`${c.id}: ${ing.card} is a legend, so quantity must be 1 (103.2.a.1)`);
      continue;
    }
    wanted.set(ing.card, (wanted.get(ing.card) ?? 0) + ing.quantity);
  }
  let probe = emptyDeck();
  for (const [base, n] of wanted) for (let i = 0; i < n; i++) probe = addCard(probe, base, cards);
  for (const [base, n] of wanted) {
    const held = (probe.main[base] ?? 0) + (probe.battlefields[base] ?? 0) + (probe.runes[base] ?? 0);
    if (held < n) errors.push(`${c.id}: ${base} x${n} is more than a deck may hold (the builder took ${held})`);
  }
  return errors;
}

/** Sanity checks an authored combo file must pass before anything is generated from it. */
export function validateCombos(combos: Combo[], features: Feature[], cards: CardIndex): string[] {
  const errors: string[] = [];
  const featureIds = new Set(features.map((f) => f.id));
  const ids = new Set<string>();
  for (const c of combos) {
    if (ids.has(c.id)) errors.push(`${c.id}: duplicate id`);
    ids.add(c.id);
    for (const ing of c.uses) {
      const card = cards.get(ing.card);
      if (!card) errors.push(`${c.id}: unknown card ${ing.card}`);
      else if (card.base !== ing.card) errors.push(`${c.id}: ${ing.card} is not a base code (use ${card.base})`);
      if (ing.quantity < 1) errors.push(`${c.id}: ${ing.card} quantity must be >= 1`);
      // The compile-time union cannot see this file, so the runtime list does. ATTACHED was in use
      // on 24 rows while the type declared eight members and nothing anywhere noticed.
      if (ing.zone && !(ZONES as readonly string[]).includes(ing.zone)) {
        errors.push(`${c.id}: ${ing.card} has unknown zone ${ing.zone}`);
      }
    }
    for (const f of [...c.needs, ...c.produces, ...(c.removes ?? [])]) {
      if (!featureIds.has(f)) errors.push(`${c.id}: unknown feature ${f}`);
    }
    // An EXTRA key is the one shape an unchecked cast cannot notice: a missing field breaks a reader
    // eventually, a misplaced one sits there inert. See COMBO_KEYS for the case that produced this.
    for (const k of Object.keys(c)) {
      if (!(COMBO_KEYS as readonly string[]).includes(k)) errors.push(`${c.id}: unknown field ${k}`);
    }
    errors.push(...copyCapErrors(c, cards));
    if (c.class === "INFINITE" && !c.steps.some((s) => /repeat/i.test(s))) {
      errors.push(`${c.id}: INFINITE combos must have a step that says "repeat"`);
    }
    // An `anyBodies` with no count is a requirement that costs nothing, and one with no note is a
    // requirement a reader cannot check — either is the phrase-in-a-notable defect with a JSON key
    // on it, which is the thing this field exists to end.
    if (c.anyBodies) {
      if (!Number.isInteger(c.anyBodies.count) || c.anyBodies.count < 1) {
        errors.push(`${c.id}: anyBodies.count must be an integer >= 1`);
      }
      if (!c.anyBodies.note?.trim()) errors.push(`${c.id}: anyBodies.note must quote the requirement`);
    }
  }
  return errors;
}

const worst = (a: ComboStatus, b: ComboStatus): ComboStatus =>
  a === "refuted" || b === "refuted" ? "refuted" : a === "candidate" || b === "candidate" ? "candidate" : "verified";

/**
 * A deck has exactly one legend, so a composed variant only runs under the legends BOTH halves
 * allow. `undefined` means any legend; `null` means the restrictions do not overlap and the
 * composition is impossible.
 */
const bothLegends = (a?: string[], b?: string[]): string[] | undefined | null => {
  if (!a || !b) return a ?? b;
  const shared = a.filter((l) => b.includes(l));
  return shared.length > 0 ? shared : null;
};

export const CLASS_RANK: Record<ComboClass, number> = { ENGINE: 0, INFINITE: 1, BURST: 2, CHAIN: 3, ALT_WIN: 4 };

/**
 * Flatten the combo DAG into Variants. A combo that `needs` a feature is expanded with every
 * combination of combos that `produce` it (depth-limited); the card multisets are merged with
 * max() per card, since the same physical copies serve both halves within one turn.
 */
export function generateVariants(combos: Combo[], cards: CardIndex, maxDepth = 3): Variant[] {
  const producers = new Map<string, Combo[]>();
  for (const c of combos) for (const f of c.produces) {
    if (!producers.has(f)) producers.set(f, []);
    producers.get(f)!.push(c);
  }

  interface Partial { comboIds: string[]; cards: Record<string, number>; produces: Set<string>; status: ComboStatus; cls: ComboClass; legends?: string[]; anyBodies?: { count: number; notes: string[] } }

  /**
   * Merge two body requirements. `count` is the MAX, matching how the card multisets merge one
   * block down and for the same reason: the same physical bodies serve both halves of a line within
   * one turn, so summing would charge the deck twice for one board. `notes` keeps both sentences —
   * a reader has to be able to check each against the entry that wrote it.
   */
  const bothBodies = (a?: { count: number; notes: string[] }, b?: { count: number; notes: string[] }) => {
    if (!a || !b) return a ?? b;
    return { count: Math.max(a.count, b.count), notes: [...new Set([...a.notes, ...b.notes])] };
  };

  const domainsOfPool = (pool: Record<string, number>) =>
    [...new Set(Object.keys(pool).flatMap((b) => cards.domainsOf(b)))] as Domain[];

  /**
   * Domain Identity (103.1.b): a deck's identity is its Champion Legend's domains, and every legend
   * in the pool has exactly two, while 103.1.b.4 only admits a card into an identity that contains
   * all of that card's domains. So a card pool spanning three domains is one no deck can assemble.
   *
   * Composing merges card multisets with a union, so a pool's domains only ever grow: a partial
   * that already overflows can never come back inside two, and the branch is dropped here rather
   * than at the end. Before this, generateVariants built 280 variants over the 135-entry catalogue
   * of 2026-09-06 and `matchDeck` discarded 134 of them one by one.
   */
  const runnable = (pool: Record<string, number>) => domainsOfPool(pool).length <= 2;

  const expand = (combo: Combo, depth: number, seen: Set<string>): Partial[] => {
    const self: Partial = {
      comboIds: [combo.id],
      cards: Object.fromEntries(combo.uses.map((u) => [u.card, u.quantity])),
      produces: new Set(combo.produces),
      status: combo.status,
      cls: combo.class,
      legends: combo.legends,
      anyBodies: combo.anyBodies ? { count: combo.anyBodies.count, notes: [combo.anyBodies.note] } : undefined,
    };
    if (!runnable(self.cards)) return [];
    let partials: Partial[] = [self];
    for (const need of combo.needs) {
      const options = (producers.get(need) ?? []).filter((p) => !seen.has(p.id) && p.id !== combo.id);
      if (options.length === 0 || depth >= maxDepth) return []; // unsatisfiable -> no variant
      const next: Partial[] = [];
      for (const p of partials) {
        if (p.produces.has(need)) { next.push(p); continue; }
        for (const opt of options) {
          for (const sub of expand(opt, depth + 1, new Set([...seen, combo.id]))) {
            const legends = bothLegends(p.legends, sub.legends);
            if (legends === null) continue; // the two halves need different legends
            const merged: Record<string, number> = { ...p.cards };
            for (const [k, v] of Object.entries(sub.cards)) merged[k] = Math.max(merged[k] ?? 0, v);
            if (!runnable(merged)) continue; // no legend's two domains hold both halves
            next.push({
              comboIds: [...new Set([...p.comboIds, ...sub.comboIds])],
              cards: merged,
              produces: new Set([...p.produces, ...sub.produces]),
              status: worst(p.status, sub.status),
              cls: CLASS_RANK[p.cls] >= CLASS_RANK[sub.cls] ? p.cls : sub.cls,
              legends,
              anyBodies: bothBodies(p.anyBodies, sub.anyBodies),
            });
          }
        }
      }
      partials = next;
    }
    return partials;
  };

  const variants: Variant[] = [];
  const seenKeys = new Set<string>();
  for (const combo of combos) {
    if (combo.status === "refuted") continue;
    for (const p of expand(combo, 0, new Set())) {
      // The body requirement is part of what a variant IS: two flattenings over the same cards that
      // demand different numbers of spare bodies are different answers, and folding them together
      // would let the cheaper one hide the dearer one.
      const key = Object.entries(p.cards).sort().map(([k, v]) => `${k}x${v}`).join("+") + "|" + [...p.produces].sort().join(",")
        + "|" + (p.anyBodies ? `b${p.anyBodies.count}` : "");
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const domains = domainsOfPool(p.cards);
      variants.push({
        id: `${combo.id}${p.comboIds.length > 1 ? "+" + p.comboIds.slice(1).join("+") : ""}`,
        comboIds: p.comboIds,
        cards: p.cards,
        produces: [...p.produces],
        class: p.cls,
        status: p.status,
        domains,
        legends: p.legends,
        anyBodies: p.anyBodies,
      });
    }
  }
  return variants;
}

/** Where this repo is readable. The walks a combo cites are files in it. */
const REPO_BLOB = "https://github.com/GermanAbuArab/RiftCombo/blob/master/";

/**
 * The hand walk behind an entry, as a link a reader can actually open.
 *
 * Most sources carry a `url`. The ones that do not name a file of this repo inside their own title —
 * `Phase 0 hunt, entry A-01 (docs/phase0/hunt.md)` — and used to render as plain text, so the panel
 * offered a source and then handed over a path that led nowhere. The repo is public, so the path is
 * a URL; this turns it into one. Returns null when the title names no such file.
 */
export function sourceHref(source: { title: string; url?: string }): string | null {
  if (source.url) return source.url;
  const path = /\((docs\/[^\s)]+\.md)/.exec(source.title)?.[1];
  return path ? REPO_BLOB + path : null;
}
