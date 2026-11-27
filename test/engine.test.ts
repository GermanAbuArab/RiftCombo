// The combo engine (#736): tagger predicates, the search's classes, identity, dedup and recall
// marking, all on invented fixtures so `npm test` stays light. The full-pool run is `npm run engine`.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CardIndex } from "../src/cards.js";
import { EFFECT_PREDICATES, LIMITER_PREDICATES, TRIGGER_PREDICATES, abilitiesOf } from "../src/engine/tags.js";
import { identityCovers, search } from "../src/engine/search.js";
import { RECALL_FLOOR, markKnown, rank, recallExitCode, scores } from "../src/engine/rank.js";
import type { Card, Combo } from "../src/types.js";

const fixture = <T>(n: string): T => JSON.parse(readFileSync(new URL(`./fixtures/engine/${n}`, import.meta.url), "utf8")) as T;

type Raw = Pick<Card, "code" | "name" | "type" | "domains" | "energy" | "text">;
const card = (r: Partial<Raw> & { text: string | null }): Card => ({
  id: r.code ?? "ENG-999", code: r.code ?? "ENG-999", base: r.code ?? "ENG-999", variant: "", publicCode: r.code ?? "ENG-999",
  name: r.name ?? "Fixture", set: "ENG", collectorNumber: 1, type: r.type ?? ["unit"], token: false, rarity: null,
  domains: r.domains ?? [], energy: r.energy ?? null, power: null, might: null, mightBonus: null, text: r.text,
  effect: null, tags: [], orientation: "portrait", artist: null, image: null, signature: false,
});

describe("tagger", () => {
  const tags = fixture<{
    triggers: { kind: string; subject: string; type: Card["type"][number]; text: string }[];
    activated: { kind: string; type: Card["type"][number]; text: string }[];
    effects: { kind: string; type: Card["type"][number]; text: string; of?: string[] }[];
    limiters: { kind: string; type: Card["type"][number]; text: string }[];
  }>("tags.json");

  it("has one fixture for every trigger predicate, and each fixture tags its trigger", () => {
    for (const p of TRIGGER_PREDICATES) {
      expect(tags.triggers.some((f) => f.kind === p.kind && f.subject === p.subject), `${p.kind}:${p.subject}`).toBe(true);
    }
    for (const f of tags.triggers) {
      const got = abilitiesOf(card({ type: [f.type], text: f.text })).flatMap((a) => a.triggers);
      expect(got.some((t) => t.kind === f.kind && t.subject === f.subject), `${f.kind}:${f.subject} in "${f.text}"`).toBe(true);
    }
  });

  it("reads an activated ability's cost as the trigger that refills it", () => {
    for (const f of tags.activated) {
      const got = abilitiesOf(card({ type: [f.type], text: f.text })).flatMap((a) => a.triggers.map((t) => t.kind));
      expect(got, f.text).toContain(f.kind);
    }
  });

  it("has one fixture for every effect predicate, and each fixture tags its effect", () => {
    for (const p of EFFECT_PREDICATES) expect(tags.effects.some((f) => f.kind === p.kind), p.kind).toBe(true);
    for (const f of tags.effects) {
      const got = abilitiesOf(card({ type: [f.type], text: f.text })).flatMap((a) => a.effects);
      const hit = got.find((e) => e.kind === f.kind);
      expect(hit, `${f.kind} in "${f.text}"`).toBeDefined();
      if (f.of) expect(hit!.of).toEqual(f.of);
    }
  });

  it("has one fixture for every limiter predicate, and each fixture tags its limiter", () => {
    for (const p of LIMITER_PREDICATES) expect(tags.limiters.some((f) => f.kind === p.kind), p.kind).toBe(true);
    for (const f of tags.limiters) {
      expect(abilitiesOf(card({ type: [f.type], text: f.text })).flatMap((a) => a.limiters), f.text).toContain(f.kind);
    }
  });

  it("drops reminder text, so a keyword's parenthesis does not read as a second ability", () => {
    const [a, ...rest] = abilitiesOf(card({ text: "[Deathknell] — Draw 1. (When I die, get the effect.)" }));
    expect(rest).toHaveLength(0);
    expect(a!.triggers.map((t) => t.kind)).toEqual(["die"]);
  });
});

describe("search", () => {
  const f = fixture<{ cycle: Raw[]; boundedKiller: Raw; burst: Raw[]; disjoint: Raw[]; battlefields: Raw[]; legends: Raw[] }>("cards.json");
  const legends = f.legends.map(card);
  const codes = (c: { set: string[] }) => c.set.join(",");

  it("finds a 3-card cycle with no limiter as INFINITE, once although it is reachable from all three start cards", () => {
    const { candidates } = search([...f.cycle.map(card), ...legends], { maxCards: 3 });
    const loops = candidates.filter((c) => codes(c) === "ENG-001,ENG-002,ENG-003");
    expect(loops.map((c) => c.class)).toEqual(["INFINITE"]);
    expect(loops[0]!.edges.map((e) => `${e.effect}>${e.trigger}`).sort()).toEqual(["draw>draw", "kill>die", "return-to-hand>play"]);
    expect(loops[0]!.oneIdentity).toBe(true); // fury + mind, which ENG-090 covers
  });

  it("finds the same cycle with `the first time` as a bounded CHAIN, not INFINITE", () => {
    const pool = [f.cycle[0]!, f.cycle[1]!, f.boundedKiller].map(card);
    const loops = search([...pool, ...legends], { maxCards: 3 }).candidates.filter((c) => codes(c) === "ENG-001,ENG-002,ENG-004");
    expect(loops.map((c) => c.class)).toEqual(["CHAIN"]);
    expect(loops[0]!.limiters).toContain("the first time");
  });

  it("finds a path that ends in a point as BURST", () => {
    const burst = search([...f.burst.map(card), ...legends], { maxCards: 3 }).candidates;
    expect(burst.map((c) => `${c.class} ${c.cards.join(">")}`)).toEqual(["BURST ENG-010>ENG-011"]);
    expect(burst[0]!.energy).toBe(5);
  });

  it("flags two cards whose domains no one legend covers as not one identity", () => {
    const [hit] = search([...f.disjoint.map(card), ...legends], { maxCards: 2 }).candidates;
    expect(hit!.domains).toEqual(["calm", "fury"]);
    expect(hit!.oneIdentity).toBe(false);
    expect(identityCovers(legends, [card(f.cycle[0]!), card(f.cycle[2]!)])).toBe(true);
  });

  it("never puts two battlefields in one line (485.4.a: one of the three is used)", () => {
    const { candidates } = search([...f.battlefields.map(card), ...legends], { maxCards: 3 });
    expect(candidates.map((c) => `${c.class} ${c.cards.join(">")}`)).toEqual(["ALT_WIN ENG-032>ENG-031"]);
  });

  it("keeps the ordering of a card set that ends in a point, whichever ordering it visits first (#751)", () => {
    const pinger = card({ code: "ENG-020", domains: ["calm"], text: "When you draw, deal 3 to a unit at a battlefield and draw 1." });
    const scorer = card({ code: "ENG-021", domains: ["calm"], text: "When you draw, score 1 point and draw 1." });
    for (const pool of [[pinger, scorer], [scorer, pinger]]) {
      const bursts = search([...pool, ...legends], { maxCards: 2 }).candidates.filter((c) => c.class === "BURST");
      expect(bursts.map((c) => `${c.cards.join(">")} ${c.ends.join("+")}`)).toEqual(["ENG-020>ENG-021 gain-point"]);
    }
  });

  it("stops at the budget and keeps the depths it finished", () => {
    const r = search([...f.cycle.map(card), ...legends], { maxCards: 3, budget: 3 });
    expect(r.stoppedBy).toBe("budget");
    expect(r.completeDepth).toBeLessThan(3);
  });
});

describe("rank and recall", () => {
  const f = fixture<{ cycle: Raw[]; burst: Raw[]; legends: Raw[] }>("cards.json");
  const all = [...f.cycle, ...f.burst, ...f.legends].map(card);
  const index = new CardIndex(all, [], "2026-11-27");
  const entry = (id: string, cls: Combo["class"], cardsIn: string[]) => ({ id, class: cls, uses: cardsIn.map((c) => ({ card: c, quantity: 1, role: "engine" })) }) as unknown as Combo;

  it("puts the higher class first, then fewer cards, and marks a line that contains a catalogued entry as known", () => {
    const ranked = rank(search(all, { maxCards: 3 }).candidates);
    expect(ranked.findIndex((c) => c.class === "INFINITE")).toBeGreaterThan(ranked.findIndex((c) => c.class === "BURST"));
    const recall = markKnown(ranked, [entry("fixture-loop", "INFINITE", ["ENG-001", "ENG-003"]), entry("fixture-missing", "BURST", ["ENG-011", "ENG-090"]), entry("engine-row", "ENGINE", ["ENG-010"])], index);
    expect(recall.total).toBe(2); // ENGINE entries are not benchmarked
    expect(recall.found.map((x) => x.id)).toEqual(["fixture-loop"]);
    expect(recall.missed).toEqual(["fixture-missing"]);
    // The first line holding both cards is marked, whatever else it holds (here the BURST through ENG-011).
    const known = ranked.find((c) => c.known === "fixture-loop")!;
    expect(known.set).toEqual(expect.arrayContaining(["ENG-001", "ENG-003"]));
    expect(ranked.indexOf(known) + 1).toBe(recall.found[0]!.rank);
    expect(recall.medianRank).toBe(recall.found[0]!.rank);
  });

  it("ranks a BURST that ends in a point above one of the same class, card count and Energy that ends only in damage (#751)", () => {
    // ENG-005 sorts before ENG-011, so the card-set tie-break alone would put the damage line first.
    const pyro: Raw = { code: "ENG-005", name: "Pyro Scholar", type: ["unit"], domains: ["calm"], energy: 3, text: "When you draw, deal 3 to a unit at a battlefield." };
    const ranked = rank(search([...f.burst, pyro, ...f.legends].map(card), { maxCards: 2 }).candidates);
    expect(ranked.map((c) => `${c.class} ${c.set.join(",")} ${c.energy}E ${c.ends.join("+")}`)).toEqual([
      "BURST ENG-010,ENG-011 5E gain-point",
      "BURST ENG-005,ENG-010 5E deal-damage",
    ]);
    expect(ranked.map(scores)).toEqual([true, false]);
  });
});

describe("recall floor (#750)", () => {
  it("is the 18/92 #736 measured, and the --recall exit code is non-zero only below it", () => {
    expect(RECALL_FLOOR).toBe(18);
    expect(recallExitCode(17)).toBe(1);
    expect(recallExitCode(0)).toBe(1);
    expect(recallExitCode(18)).toBe(0);
    expect(recallExitCode(19)).toBe(0);
    expect(recallExitCode(4, 5)).toBe(1);
  });

  it("fails a fixture run whose recall is below the floor it is given", () => {
    const f = fixture<{ cycle: Raw[]; burst: Raw[]; legends: Raw[] }>("cards.json");
    const all = [...f.cycle, ...f.burst, ...f.legends].map(card);
    const index = new CardIndex(all, [], "2026-11-27");
    const entry = (id: string, cardsIn: string[]) => ({ id, class: "INFINITE", uses: cardsIn.map((c) => ({ card: c, quantity: 1, role: "engine" })) }) as unknown as Combo;
    const recall = markKnown(rank(search(all, { maxCards: 3 }).candidates), [entry("fixture-loop", ["ENG-001", "ENG-003"]), entry("fixture-missing", ["ENG-011", "ENG-090"])], index);
    expect(recall.found.length).toBe(1);
    expect(recallExitCode(recall.found.length, 2)).toBe(1);
    expect(recallExitCode(recall.found.length, 1)).toBe(0);
  });
});
