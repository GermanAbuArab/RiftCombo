// The combo engine's tagger (#736): what each card's text triggers on and what it does, as named
// regex predicates over `synergyText(card)`. It is a text reading, not a rules engine: a tag says
// "this text mentions X in the position a trigger (or an effect) takes", and every tag carries the
// span it matched so a reader can check it. The search (`search.ts`) only ever suggests where to
// look; `status: verified` still needs a hand walk (CLAUDE.md, "Combos").
import type { Card } from "../types.js";
import { synergyText } from "../synergies.js";

export const TRIGGERS = [
  "play", "attack", "defend", "conquer", "hold", "die", "draw", "discard", "recycle", "channel",
  "ready", "exhaust", "move", "gain-point", "spend",
  // Not in the issue's list, each added because a measured catalogue line needs it: "When a unit you
  // control becomes [Mighty]" (SFD-180 Fiora, Worthy) is what a buff satisfies; "if you have 7+ units
  // here" (OGN-293 The Grand Plaza) is a condition that tokens and moves fill; "At the start of your
  // Main Phase" (VEN-067 Bottled Constellation) fires again on an extra turn.
  "mighty", "unit-count", "turn-start",
] as const;
export type Trigger = (typeof TRIGGERS)[number];

export const EFFECTS = [
  "ready-rune", "add-power", "draw", "create-token", "return-to-hand", "play-from-trash", "recycle",
  "ready-unit", "gain-point", "deal-damage", "buff-might", "move", "kill",
  // Added beyond the issue's list, each because a trigger above would otherwise have no feeder or a
  // terminal would have no sink: `channel` feeds "when you channel"; `win` is the ALT_WIN terminal
  // ("win the game"); `retrigger` is "your hold effects ... trigger an additional time" and "my hold
  // effects are also conquer effects", which feed another card's hold or conquer trigger;
  // `extra-turn` is "Take a turn after this one" (OGN-122 Time Warp), which holds and starts a turn again.
  "channel", "win", "retrigger", "extra-turn",
] as const;
export type Effect = (typeof EFFECTS)[number];

export const LIMITERS = ["the first time", "once per turn", "this turn"] as const;
export type Limiter = (typeof LIMITERS)[number];

/** Whose event the trigger listens for: the card's own ("When you play me") or another's. */
export type Subject = "self" | "other";

/** What kind of card a play trigger listens for, or a bounce, replay or token puts back into play. */
export type PlayObject = "unit" | "spell" | "gear" | "card";

/** `object` is set on `play` triggers only: every kind of card the trigger listens for. */
export interface TriggerTag { kind: Trigger; subject: Subject; span: string; object?: PlayObject[] }
/**
 * `of` is set on `retrigger` only: the triggers whose effects it fires again. `object` is set on the
 * three effects that make a card be played again (`return-to-hand`, `play-from-trash`, `create-token`).
 */
export interface EffectTag { kind: Effect; span: string; of?: Trigger[]; object?: PlayObject[] }

/** The object a span names: a unit (or "me", "it" on a unit), a spell, a gear, or any card. */
export function objectOf(span: string, fallback: PlayObject[] = ["card"]): PlayObject[] {
  if (/\bspells?\b/i.test(span)) return ["spell"];
  if (/\b(?:gear|equipment)\b/i.test(span)) return ["gear"];
  if (/\bunits?\b|\btokens?\b|\b(?:mechs?|recruits?|sand soldiers?|birds?|cats?|dogs?|poros?)\b/i.test(span)) return ["unit"];
  return fallback;
}
const PLAYS_AGAIN: ReadonlySet<Effect> = new Set(["return-to-hand", "play-from-trash", "create-token"]);
// Every kind the card is: VEN-058 Patched Porobot prints UNIT GEAR, so playing it again is both (#692).
const cardObject = (card: Card): PlayObject[] => {
  const kinds = (["spell", "gear", "unit"] as const).filter((k) => card.type.includes(k));
  return kinds.length > 0 ? [...kinds] : ["card"];
};

/** One ability: a trigger (none for a static line), what it does, and what bounds it. */
export interface Ability {
  text: string;
  triggers: TriggerTag[];
  effects: EffectTag[];
  limiters: Limiter[];
}

export interface CardTags { base: string; abilities: Ability[] }

/** `condition` predicates read the whole sentence: "When you hold here, if you have 7+ units here" names its condition after the comma. */
interface TriggerPredicate { kind: Trigger; subject: Subject; re: RegExp; condition?: true }
interface EffectPredicate { kind: Effect; re: RegExp; of?: (m: RegExpMatchArray) => Trigger[] }

// Trigger predicates read the ability's HEAD (the "When ..." clause, or an activated ability's cost).
// Each is anchored to the words a trigger takes, so "kill" in an effect never reads as "die".
export const TRIGGER_PREDICATES: TriggerPredicate[] = [
  { kind: "play", subject: "self", re: /\b(?:when|as) you play (?:me|this)\b/i },
  { kind: "play", subject: "other", re: /\bwhen (?:you play (?:a|an|another|your)\b|(?:a|an|another) [\w ]+? (?:is|are) played)/i },
  { kind: "attack", subject: "self", re: /\bwhen I attack\b/i },
  { kind: "attack", subject: "other", re: /\bwhen (?:a|another) (?:friendly )?unit attacks\b|\bwhen you attack\b/i },
  { kind: "defend", subject: "self", re: /\bwhen I defend\b/i },
  { kind: "defend", subject: "other", re: /\bwhen (?:a|another) (?:friendly )?unit defends\b|\bwhen you defend\b/i },
  { kind: "conquer", subject: "self", re: /\bwhen I conquer\b|\bwhen I (?:hold or )?conquer\b|\bwhen I conquer or hold\b/i },
  { kind: "conquer", subject: "other", re: /\bwhen you conquer\b/i },
  { kind: "hold", subject: "self", re: /\bwhen I (?:conquer or )?hold\b/i },
  { kind: "hold", subject: "other", re: /\bwhen you hold\b/i },
  { kind: "die", subject: "self", re: /\[deathknell\]|\bwhen I die\b/i },
  { kind: "die", subject: "other", re: /\bwhen (?:a|an|another) [\w ]+? dies\b/i },
  { kind: "draw", subject: "other", re: /\bwhen you draw\b/i },
  { kind: "discard", subject: "other", re: /\bwhen you discard\b/i },
  { kind: "discard", subject: "self", re: /\bwhen you discard (?:me|this)\b/i },
  { kind: "recycle", subject: "other", re: /\bwhen (?:you recycle\b|[\w ]+? (?:is|are) recycled)/i },
  { kind: "channel", subject: "other", re: /\bwhen you channel\b/i },
  { kind: "ready", subject: "self", re: /\bwhen I (?:become )?ready\b|\bwhen you ready me\b/i },
  { kind: "ready", subject: "other", re: /\bwhen you ready\b/i },
  { kind: "exhaust", subject: "self", re: /\bwhen I (?:become )?exhaust/i },
  { kind: "move", subject: "self", re: /\bwhen I move\b|\bthe (?:first|second|third) time I move\b/i },
  { kind: "move", subject: "other", re: /\bwhen (?:a|another) (?:friendly )?unit moves\b/i },
  { kind: "gain-point", subject: "other", re: /\bwhen you score\b/i },
  { kind: "spend", subject: "other", re: /\bwhen you spend\b/i },
  { kind: "mighty", subject: "other", re: /\bbecomes? \[mighty\]/i },
  { kind: "unit-count", subject: "other", re: /\bif you (?:have|control) (?:\d+|seven|eight)\+? (?:[\w ]+ )?units\b/i, condition: true },
  { kind: "turn-start", subject: "other", re: /\bat the start of your (?:main phase|beginning phase|turn)\b/i },
];

// Effect predicates read the ability's BODY (and, for a cost, the cost too: "kill a friendly unit" as
// an additional cost still kills one).
export const EFFECT_PREDICATES: EffectPredicate[] = [
  { kind: "ready-rune", re: /\bready (?:up to \w+ |\w+ |all |your )*(?:friendly )?runes?\b/i },
  { kind: "add-power", re: /\[add\]|\badd :rb_(?:energy|rune)/i },
  { kind: "draw", re: /\bdraws? (?:\d+|a card|one|two|three)\b/i },
  { kind: "create-token", re: /\b(?:play|create)s? (?:a|an|one|two|three|four|five|six|seven|\d+) [^.]*?\btokens?\b/i },
  { kind: "return-to-hand", re: /\breturn [^.]*? to (?:its|their) owner'?s'? hands?\b|\breturn [^.]*? to your hand\b/i },
  { kind: "play-from-trash", re: /\bplay [^.]*? from (?:your|a|its owner's) trash\b/i },
  { kind: "recycle", re: /\brecycle (?:up to |\d+|a |an |it|me|this|that|your|those|all)/i },
  { kind: "ready-unit", re: /\bready (?:it|me|him|her|them|that unit|another|a (?:friendly )?unit|up to \w+ (?:friendly )?units|a friendly)\b|\benters? ready\b/i },
  { kind: "gain-point", re: /\bscores? (?:\d+|a|one) points?\b/i },
  // Riot writes "Deal 3 to a unit" with no word "damage", and "deals damage equal to its Might" without a number.
  { kind: "deal-damage", re: /\bdeals? (?:\d+\b|damage\b|[^.]*?\bdamage\b)/i },
  { kind: "buff-might", re: /\[buff\]|\bbuff (?:it|me|a|an|another|each|all|that)\b|\+\d+ :rb_might:/i },
  { kind: "move", re: /\bmove (?:it|me|a|an|another|that|up to|any number of|\w+ friendly)\b[^.]*?\bunits?\b|\bmove (?:it|me)\b/i },
  { kind: "kill", re: /\bkill (?:a|an|it|me|this|that|another|all|each|up to|\d+|any number of)\b/i },
  { kind: "channel", re: /\bchannels? (?:\d+|a|an|one|two)\b[^.]*?\brunes?\b/i },
  { kind: "win", re: /\bwin the game\b/i },
  { kind: "extra-turn", re: /\btake (?:a|an extra) turn after this one\b|\btake an extra turn\b/i },
  {
    kind: "retrigger",
    re: /\b(?:your|my) (hold|conquer) effects [^.]*?(?:trigger an additional time|are also (hold|conquer) effects)|\bactivate the (hold|conquer) effects\b/i,
    of: (m) => [...new Set([m[1], m[2], m[3]].filter(Boolean).map((s) => s!.toLowerCase() as Trigger))],
  },
];

export const LIMITER_PREDICATES: { kind: Limiter; re: RegExp }[] = [
  { kind: "the first time", re: /\bthe first time\b/i },
  { kind: "once per turn", re: /\bonce (?:per|each) turn\b/i },
  { kind: "this turn", re: /\bthis turn\b/i },
];

/** Reminder text sits in parentheses and restates keywords ("When I die, get the effect."): drop it. */
const stripReminders = (s: string) => s.replace(/\([^()]*\)/g, " ");

// An activated ability's cost ends in ":" right after rune or energy symbols, `:rb_exhaust:` or "Kill
// this" ("Kill this: Recycle up to 4 cards"). The symbols are themselves `:name:`, so the cost is a
// run of them followed by a bare colon.
const ACTIVATED = /^((?:[^.:]*?(?::rb_[a-z_0-9]+:)+[^.:]*?|kill this|exhaust this|spend [^.:]*?)):\s/i;
const TRIGGER_HEAD = /^(?:\[[^\]]+\]\s*[—-]?\s*)*(?:when|as you play|the (?:first|second|third) time|once per turn|at the start of)\b/i;

/** Sentence-split one card's text, then group sentences into abilities. */
export function abilitiesOf(card: Card): Ability[] {
  const lines = stripReminders(synergyText(card)).split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const out: Ability[] = [];
  const isSpell = card.type.includes("spell");
  for (const line of lines) {
    // Keywords with a dash introduce their ability: "[Deathknell] — Recycle me to ready your runes."
    const sentences = line.split(/(?<=[.!])\s+(?=[A-Z[])/);
    let current: Ability | null = null;
    for (const raw of sentences) {
      const s = raw.trim();
      const act = s.match(ACTIVATED);
      const startsNew = !!act || TRIGGER_HEAD.test(s) || /\[deathknell\]/i.test(s) || current === null;
      if (startsNew) {
        current = { text: s, triggers: [], effects: [], limiters: [] };
        out.push(current);
        const cost = act?.[1];
        const head = cost ?? s.split(/,(?![^[]*\])/)[0] ?? s;
        tagTriggers(current, head, s, card);
        // An activated ability fires again when what its cost spent comes back: a readied permanent
        // for :rb_exhaust:, Energy or Power for a rune cost.
        if (cost !== undefined) {
          if (/:rb_exhaust:|exhaust this/i.test(cost)) current.triggers.push({ kind: "ready", subject: "self", span: cost.trim() });
          if (/:rb_(?:energy|rune)_/i.test(cost)) current.triggers.push({ kind: "spend", subject: "self", span: cost.trim() });
        }
        // A spell's whole text happens when it is played; a line with no trigger on a permanent is static.
        if (isSpell && current.triggers.length === 0) current.triggers.push({ kind: "play", subject: "self", span: "(spell)", object: ["spell"] });
      } else {
        current!.text += " " + s;
      }
    }
  }
  for (const a of out) {
    for (const p of EFFECT_PREDICATES) {
      const m = a.text.match(p.re);
      if (!m) continue;
      const tag: EffectTag = { kind: p.kind, span: m[0] };
      if (p.of) tag.of = p.of(m);
      // A token is a unit unless the span names gear ("play a Gold gear token"); a bounce or replay
      // of "it" or "me" is of the card's own kind.
      if (PLAYS_AGAIN.has(p.kind)) tag.object = objectOf(m[0], p.kind === "create-token" ? ["unit"] : cardObject(card));
      a.effects.push(tag);
    }
    for (const p of LIMITER_PREDICATES) if (p.re.test(a.text)) a.limiters.push(p.kind);
  }
  return out;
}

function tagTriggers(a: Ability, head: string, sentence: string, card: Card) {
  for (const p of TRIGGER_PREDICATES) {
    const m = (p.condition ? sentence : head).match(p.re);
    if (!m || a.triggers.some((t) => t.kind === p.kind && t.subject === p.subject)) continue;
    const tag: TriggerTag = { kind: p.kind, subject: p.subject, span: m[0] };
    if (p.kind === "play") tag.object = p.subject === "self" ? cardObject(card) : objectOf(head);
    a.triggers.push(tag);
  }
}

export const tagCard = (card: Card): CardTags => ({ base: card.base, abilities: abilitiesOf(card) });

/** A card counts as tagged when any of its abilities carries a trigger other than a spell's implicit play, or any effect. */
export const isTagged = (t: CardTags): boolean =>
  t.abilities.some((a) => a.effects.length > 0 || a.triggers.some((x) => x.span !== "(spell)"));
