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

const CLASS_RANK: Record<ComboClass, number> = { ENGINE: 0, INFINITE: 1, BURST: 2, ALT_WIN: 3 };

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

  const expand = (combo: Combo, depth: number, seen: Set<string>): Partial[] => {
    const self: Partial = {
      comboIds: [combo.id],
      cards: Object.fromEntries(combo.uses.map((u) => [u.card, u.quantity])),
      produces: new Set(combo.produces),
      status: combo.status,
      cls: combo.class,
      legends: combo.legends,
    };
    let partials: Partial[] = [self];
    for (const need of combo.needs) {
      const options = (producers.get(need) ?? []).filter((p) => !seen.has(p.id) && p.id !== combo.id);
      if (options.length === 0 || depth >= maxDepth) return []; // unsatisfiable -> no variant
      const next: Partial[] = [];
      for (const p of partials) {
        if (p.produces.has(need)) { next.push(p); continue; }
        for (const opt of options) {
          for (const sub of expand(opt, depth + 1, new Set([...seen, combo.id]))) {
            const merged: Record<string, number> = { ...p.cards };
            for (const [k, v] of Object.entries(sub.cards)) merged[k] = Math.max(merged[k] ?? 0, v);
            next.push({
              comboIds: [...new Set([...p.comboIds, ...sub.comboIds])],
              cards: merged,
              produces: new Set([...p.produces, ...sub.produces]),
              status: worst(p.status, sub.status),
              cls: CLASS_RANK[p.cls] >= CLASS_RANK[sub.cls] ? p.cls : sub.cls,
              legends: p.legends ?? sub.legends,
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
      const domains = [...new Set(Object.keys(p.cards).flatMap((b) => cards.domainsOf(b)))] as Domain[];
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
