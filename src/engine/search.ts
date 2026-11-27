// The combo engine's search (#736): a graph whose nodes are card abilities and whose edges say "an
// effect of A satisfies a trigger of B", walked depth-first up to five cards. It finds where to look:
// cycles (INFINITE when nothing bounds them, CHAIN when a limiter does) and paths that end in a point,
// damage or a win (BURST / ALT_WIN). It proves nothing about legality or timing.
import type { CardIndex } from "../cards.js";
import type { Card, ComboClass, Domain } from "../types.js";
import type { Ability, Effect, EffectTag, Trigger, TriggerTag } from "./tags.js";
import { isTagged, tagCard } from "./tags.js";

/**
 * Which triggers each effect satisfies. `self` triggers ("When you play me") are fed only by an effect
 * that can put THAT card through the event again, which for `play` is a bounce or a replay from trash;
 * and a play edge needs the object to agree (a bounced unit never fires "when you play a spell").
 */
export const FEEDS: Record<Effect, Trigger[]> = {
  "ready-rune": ["spend"],
  "add-power": ["spend"],
  draw: ["draw"],
  "create-token": ["play", "unit-count"],
  "return-to-hand": ["play"],
  "play-from-trash": ["play"],
  recycle: ["recycle"],
  "ready-unit": ["ready", "attack", "move"],
  "gain-point": ["gain-point"],
  "deal-damage": ["die"],
  "buff-might": ["mighty"],
  move: ["move", "conquer", "unit-count"],
  kill: ["die"],
  channel: ["channel"],
  win: [],
  "extra-turn": ["hold", "turn-start"],
  retrigger: [], // its own `of` list, read in `feeds`
};
const FEEDS_SELF_PLAY: ReadonlySet<Effect> = new Set(["return-to-hand", "play-from-trash"]);

/** The effects that end a line, and the class a path ending in one is guessed as. */
export const TERMINAL: Partial<Record<Effect, ComboClass>> = { "gain-point": "BURST", "deal-damage": "BURST", win: "ALT_WIN" };

/** The effects a line can pay out in, for the ranker (#751): a point, a win, an extra turn, or damage. */
export const PAYOFF: readonly Effect[] = ["gain-point", "win", "extra-turn", "deal-damage"];

/** A line that ends in a point, a win or an extra turn (#751): damage alone wins no game in Riftbound. */
export const scores = (c: Pick<Candidate, "ends">): boolean => c.ends.some((e) => e !== "deal-damage");

export interface EdgeLink {
  from: string;
  to: string;
  effect: Effect;
  effectSpan: string;
  trigger: Trigger;
  triggerSpan: string;
}

export interface Candidate {
  /** Base codes in the order the chain visits them. */
  cards: string[];
  /** Sorted base codes: the dedup key. */
  set: string[];
  edges: EdgeLink[];
  class: ComboClass;
  /** Sum of the printed Energy; a card with none counts 0. */
  energy: number;
  domains: Domain[];
  /** One legend's domains cover every card (Domain Identity 103.1.b), and the line holds at most one legend. */
  oneIdentity: boolean;
  limiters: string[];
  /**
   * The payoff effects the line ends in (#751), out of `PAYOFF`: a path's last ability's, a cycle's from
   * every ability on it (a loop pays out wherever its payoff sits). Empty when it ends in none of them.
   */
  ends: Effect[];
  /** Set by the ranker: the id of a catalogued entry whose card set this one equals or contains. */
  known?: string;
}

interface Node { card: Card; ability: Ability }

export interface SearchOptions {
  /** Most distinct cards in a line. Default 5. */
  maxCards?: number;
  /**
   * Most node expansions across the whole search. Depths run shallow-first (iterative deepening), so
   * a budget that runs out keeps every line of the depths it finished. Default 40,000,000.
   */
  budget?: number;
  /** Most candidates kept; reaching it stops the search like the budget does. Default 2,000,000. */
  maxCandidates?: number;
}

export interface SearchResult {
  candidates: Candidate[];
  /** The deepest card count searched to the end; less than `maxCards` when a cap stopped the search. */
  completeDepth: number;
  /** What stopped the search before `maxCards`, or null when it ran to the end. */
  stoppedBy: "budget" | "maxCandidates" | null;
  expansions: number;
  nodes: number;
  edges: number;
}

/** One row per name, decklist cards only: the base printing, no tokens (the battlefield ones aside, as in `partnersOf`). */
export function deckablePool(cards: CardIndex): Card[] {
  const out = new Map<string, Card>();
  for (const c of cards.cards) {
    if (c.base !== c.code) continue;
    if (c.token && !c.type.includes("battlefield")) continue;
    const key = canonicalOf(cards, c.base);
    if (!out.has(key)) out.set(key, cards.get(key) ?? c);
  }
  return [...out.values()];
}

/** One key per name, so reprints under other numbers meet (the same key `partnersOf` uses). */
export const canonicalOf = (cards: CardIndex, base: string): string => {
  const c = cards.get(base);
  return (c && cards.resolveName(c.name)) ?? base;
};

export function feeds(effect: EffectTag, t: TriggerTag): boolean {
  if (effect.kind === "retrigger") return !!effect.of?.includes(t.kind);
  if (!FEEDS[effect.kind].includes(t.kind)) return false;
  if (t.kind === "play") {
    if (t.subject === "self" && !FEEDS_SELF_PLAY.has(effect.kind)) return false;
    const a = effect.object ?? "card", b = t.object ?? "card";
    return a === "card" || b === "card" || a === b;
  }
  return true;
}

/** The first effect of `a` that satisfies a trigger of `b`, with both spans, or null. */
function link(a: Node, b: Node): EdgeLink | null {
  for (const e of a.ability.effects) {
    for (const t of b.ability.triggers) {
      if (feeds(e, t)) {
        return { from: a.card.base, to: b.card.base, effect: e.kind, effectSpan: e.span, trigger: t.kind, triggerSpan: t.span };
      }
    }
  }
  return null;
}

/** `legendPool` is the pool's legends, filtered once by the caller: this runs once per candidate. */
export function identityCovers(legendPool: Card[], set: Card[]): boolean {
  const need = new Set<Domain>(set.flatMap((c) => c.domains));
  const legends = set.filter((c) => c.type.includes("legend"));
  const fits = (l: Card) => [...need].every((d) => l.domains.includes(d));
  if (legends.length > 1) return false;
  if (legends.length === 1) return fits(legends[0]!);
  return legendPool.some(fits);
}

const UNREACHABLE = 1 << 20;

export function search(pool: Card[], opts: SearchOptions = {}): SearchResult {
  const maxCards = opts.maxCards ?? 5;
  const budget = opts.budget ?? 40_000_000;
  const maxCandidates = opts.maxCandidates ?? 2_000_000;
  const nodes: Node[] = [];
  for (const card of pool) {
    const tags = tagCard(card);
    if (!isTagged(tags)) continue;
    for (const ability of tags.abilities) nodes.push({ card, ability });
  }
  const n = nodes.length;
  const cardOf = nodes.map((x) => x.card.base);
  // 485.4.a: each player provides three battlefields and only one is used, so no line holds two.
  const field = nodes.map((x) => x.card.type.includes("battlefield"));
  const adj: { to: number; link: EdgeLink }[][] = nodes.map(() => []);
  const radj: number[][] = nodes.map(() => []);
  let edgeCount = 0;
  nodes.forEach((a, i) => nodes.forEach((b, j) => {
    if (cardOf[i] === cardOf[j] || (field[i] && field[j])) return;
    const l = link(a, b);
    if (l) { adj[i]!.push({ to: j, link: l }); radj[j]!.push(i); edgeCount++; }
  }));

  // Pruning: a prefix is extended only while a line of the depth being run can still close from it,
  // at a terminal or back at its start. Both distances are shortest paths over abilities that ignore
  // the no-repeated-card rule, so they are lower bounds and the pruning drops no line.
  const backwardBfs = (seeds: number[]): Int32Array => {
    const d = new Int32Array(n).fill(UNREACHABLE);
    const queue = [...seeds];
    for (const s of seeds) d[s] = 0;
    for (let q = 0; q < queue.length; q++) {
      const v = queue[q]!;
      for (const u of radj[v]!) if (d[u]! > d[v]! + 1) { d[u] = d[v]! + 1; queue.push(u); }
    }
    return d;
  };
  const terminalOf = (i: number) => nodes[i]!.ability.effects.flatMap((e) => TERMINAL[e.kind] ?? []);
  const toTerminal = backwardBfs(nodes.map((_, i) => i).filter((i) => terminalOf(i).length > 0));

  const byBase = new Map(pool.map((c) => [c.base, c]));
  const legendPool = pool.filter((c) => c.type.includes("legend"));
  const found = new Map<string, Candidate>();
  let expansions = 0;
  let completeDepth = 1;
  let stoppedBy: SearchResult["stoppedBy"] = null;

  const limitersOf = (path: number[]) => [...new Set(path.flatMap((i) => nodes[i]!.ability.limiters))];
  const endsOf = (at: number[]) => PAYOFF.filter((p) => at.some((i) => nodes[i]!.ability.effects.some((e) => e.kind === p)));
  const record = (path: number[], edges: EdgeLink[], cls: ComboClass, ends: Effect[]) => {
    const cardsIn = path.map((i) => cardOf[i]!);
    const set = [...cardsIn].sort();
    const key = `${cls}|${set.join(",")}`;
    // One row per class and card set; another ordering of the same set replaces it only when it scores
    // and the kept one does not, so the visiting order never ranks a scoring line as damage-only (#751).
    const kept = found.get(key);
    if (kept && (scores(kept) || !scores({ ends }))) return;
    const members = set.map((b) => byBase.get(b)!);
    found.set(key, {
      cards: cardsIn,
      set,
      edges: [...edges],
      class: cls,
      energy: members.reduce((s, c) => s + (c.energy ?? 0), 0),
      domains: [...new Set(members.flatMap((c) => c.domains))].sort(),
      oneIdentity: identityCovers(legendPool, members),
      limiters: limitersOf(path),
      ends,
    });
  };

  // Visit the lines of exactly `depth` cards; false when a cap stopped it.
  const runDepth = (depth: number): boolean => {
    const path: number[] = [];
    const edges: EdgeLink[] = [];
    const onPath = new Set<string>();
    let fields = 0;
    let toStart: Int32Array = new Int32Array(0);
    const visit = (i: number): boolean => {
      const left = depth - path.length - 1; // cards still to add after this one
      if (toTerminal[i]! > left && toStart[i]! > left + 1) return true;
      if (++expansions > budget) { stoppedBy = "budget"; return false; }
      path.push(i);
      onPath.add(cardOf[i]!);
      if (field[i]) fields++;
      if (left === 0) {
        const back = link(nodes[i]!, nodes[path[0]!]!);
        if (back) record(path, [...edges, back], limitersOf(path).length ? "CHAIN" : "INFINITE", endsOf(path));
        for (const cls of new Set(terminalOf(i))) record(path, edges, cls, endsOf([i]));
        if (found.size >= maxCandidates) { stoppedBy = "maxCandidates"; return false; }
      } else {
        for (const { to, link: l } of adj[i]!) {
          if (onPath.has(cardOf[to]!) || (fields > 0 && field[to])) continue;
          edges.push(l);
          const ok = visit(to);
          edges.pop();
          if (!ok) return false;
        }
      }
      path.pop();
      onPath.delete(cardOf[i]!);
      if (field[i]) fields--;
      return true;
    };
    for (let s = 0; s < n; s++) {
      if (adj[s]!.length === 0) continue;
      toStart = backwardBfs([s]);
      if (!visit(s)) return false;
    }
    return true;
  };

  for (let depth = 2; depth <= maxCards; depth++) {
    if (!runDepth(depth)) break;
    completeDepth = depth;
  }
  return { candidates: [...found.values()], completeDepth, stoppedBy, expansions: Math.min(expansions, budget), nodes: n, edges: edgeCount };
}
