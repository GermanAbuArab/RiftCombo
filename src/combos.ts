import type { CardIndex } from "./cards.js";
import type { Combo, ComboClass, ComboStatus, Domain, Feature, Variant } from "./types.js";

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
    }
    for (const f of [...c.needs, ...c.produces, ...(c.removes ?? [])]) {
      if (!featureIds.has(f)) errors.push(`${c.id}: unknown feature ${f}`);
    }
    if (c.class === "INFINITE" && !c.steps.some((s) => /repeat/i.test(s))) {
      errors.push(`${c.id}: INFINITE combos must have a step that says "repeat"`);
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

  interface Partial { comboIds: string[]; cards: Record<string, number>; produces: Set<string>; status: ComboStatus; cls: ComboClass; legends?: string[] }

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
      const key = Object.entries(p.cards).sort().map(([k, v]) => `${k}x${v}`).join("+") + "|" + [...p.produces].sort().join(",");
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
