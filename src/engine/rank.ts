// The combo engine's ranker and recall benchmark (#736).
import type { CardIndex } from "../cards.js";
import { CLASS_RANK } from "../combos.js";
import type { Combo } from "../types.js";
import type { Candidate } from "./search.js";
import { canonicalOf, scores } from "./search.js";

export { scores };

/**
 * Order: class as `src/combos.ts` ranks it (higher `CLASS_RANK` first, the order `src/plan.ts` and the
 * route list sort by), then a line that `scores` above one that ends only in damage or in no payoff
 * (#751), then fewer cards, then one identity, then lower total Energy; the sorted card
 * set breaks the last tie so a run is reproducible.
 */
export function rank(candidates: Candidate[]): Candidate[] {
  return [...candidates].sort((a, b) =>
    CLASS_RANK[b.class] - CLASS_RANK[a.class] ||
    Number(scores(b)) - Number(scores(a)) ||
    a.set.length - b.set.length ||
    Number(b.oneIdentity) - Number(a.oneIdentity) ||
    a.energy - b.energy ||
    a.set.join(",").localeCompare(b.set.join(",")),
  );
}

/** The catalogued entries recall is measured against: every non-ENGINE entry, verified or candidate. */
export const benchmarkEntries = (combos: Combo[]): Combo[] => combos.filter((c) => c.class !== "ENGINE");

/**
 * The recall floor `npm run engine -- --recall` fails below (#750). Measured by #736 (PR #749, head
 * fbf5c0f) at default options: `recall: 18/92, median rank 101583.5`, `complete to 3 cards (stopped by
 * maxCandidates); 2000000 candidates`. Raise it when a change to `src/engine/` measures more.
 */
export const RECALL_FLOOR = 18;

/** The `--recall` exit code: 0 at or above the floor, 1 below it. */
export const recallExitCode = (found: number, floor = RECALL_FLOOR): number => (found < floor ? 1 : 0);

const entrySet = (cards: CardIndex, c: Combo) => [...new Set(c.uses.map((u) => canonicalOf(cards, u.card)))];

export interface RecallResult {
  total: number;
  found: { id: string; rank: number }[];
  missed: string[];
  /** Median 1-based rank of the found entries, or null when none was found. */
  medianRank: number | null;
}

/**
 * Mark each ranked candidate `known: <id>` when its card set equals or contains a catalogued entry's,
 * and measure recall: an entry is found when some candidate's set equals or contains its distinct
 * `uses[].card` set. Mutates `ranked` (the `known` field) and returns the benchmark.
 */
export function markKnown(ranked: Candidate[], combos: Combo[], cards: CardIndex): RecallResult {
  const byCard = new Map<string, number[]>();
  ranked.forEach((c, i) => { for (const b of c.set) { const l = byCard.get(b); if (l) l.push(i); else byCard.set(b, [i]); } });
  const entries = benchmarkEntries(combos);
  const found: { id: string; rank: number }[] = [];
  const missed: string[] = [];
  for (const e of entries) {
    const want = entrySet(cards, e);
    const lists = want.map((b) => byCard.get(b) ?? []);
    const shortest = lists.reduce((a, b) => (b.length < a.length ? b : a));
    const hit = shortest.find((i) => want.every((b) => ranked[i]!.set.includes(b)));
    if (hit === undefined) { missed.push(e.id); continue; }
    found.push({ id: e.id, rank: hit + 1 });
    for (const i of shortest) { const c = ranked[i]!; if (c.known === undefined && want.every((b) => c.set.includes(b))) c.known = e.id; }
  }
  const ranks = found.map((f) => f.rank).sort((a, b) => a - b);
  const mid = Math.floor(ranks.length / 2);
  const medianRank = ranks.length === 0 ? null : ranks.length % 2 ? ranks[mid]! : (ranks[mid - 1]! + ranks[mid]!) / 2;
  return { total: entries.length, found, missed, medianRank };
}
