/**
 * A catalogue entry as HTML (#286): the section the combo drawer in `web/main.ts` draws for each entry
 * of a route, and the whole public page at /combos/<id> built around that same section.
 *
 * `comboSections` is the one definition of an entry's prose. The drawer calls it with h3 (its own
 * heading sits above), the page with h2 (under the page's h1). Everything else on the page — the
 * pieces with their card text, the payoff, the run plays — is page-only, because the drawer draws
 * those for a whole ROUTE and from the player's own list.
 *
 * The prose reaching here must already have gone through `stripInternalDeep`
 * (`scripts/web-combo-prose.mjs`): the bundle does it by plugin, the build by calling it, so the
 * pre-rendered pages carry no sentence the bundle would not.
 */
import { readableCardText } from "../cards.js";
import { CLASS_RANK, sourceHref } from "../combos.js";
import { esc } from "../html.js";
import { classLabel } from "../victory.js";
import type { Card, Combo, ComboClass, Feature } from "../types.js";
import { clip, renderDocument } from "./layout.js";

/**
 * The audit register speaks its own language, and the player is not expected to know it (#72). The
 * notes stay verbatim — they are the record this catalogue stands on and their precision is worth more
 * than their prose — so the four terms are translated beside them instead of being edited out of
 * `data/combos.json`.
 */
export const AUDIT_KEY = "REFUTE = a refutation pass, with its date and verdict · WOUNDED = the pass found a flaw and the entry was rewritten · BUDGETED = the pass checked the recycle-and-draw ledger · lens = the hunt that proposed it.";

/**
 * A source a reader can open elsewhere and a record of this project's own walk are two different
 * claims, and giving them the same accent link said they were one. The walk records are 63% of
 * the 862 sources, which is why they were the whole of the wall.
 */
const EXTERNAL = new Set(["article", "riot", "video", "tournament-report"]);

function sourcesOf(c: Combo, h: "h2" | "h3"): string {
  const ext = c.sources.filter((s) => s.url || EXTERNAL.has(s.kind));
  const own = c.sources.filter((s) => !ext.includes(s));
  const extLi = ext.map((s) => {
    const href = sourceHref(s);
    return `<li>${href ? `<a href="${esc(href)}" rel="noopener" target="_blank">${esc(s.title)}</a>` : esc(s.title)}${
      s.date ? ` <span class="csub">${esc(s.date)}</span>` : ""}</li>`;
  }).join("");
  // The title of a walk record ends in the repo path it names; the path is the link, not the label.
  const ownLi = own.map((s) => {
    const href = sourceHref(s);
    const label = s.title.replace(/\s*\((docs\/[^\s)]+\.md)\)\s*$/, "");
    return `<li>${esc(label)}${s.date ? ` <span class="csub">${esc(s.date)}</span>` : ""}${
      href ? ` <a class="record" href="${esc(href)}" rel="noopener" target="_blank">record</a>` : ""}</li>`;
  }).join("");
  return `<${h}>Sources</${h}>${
    ext.length ? `<p class="src-kind">Published elsewhere</p><ul class="sources">${extLi}</ul>` : ""}${
    own.length ? `<p class="src-kind">Walked here, in this project</p><ul class="sources own">${ownLi}</ul>` : ""}`;
}

/**
 * Stated whether or not a list is short of it: the check in `src/bodies.ts` only counts unit cards,
 * and the requirement it stands for is usually about WHERE a body is — so a reader holding ten units
 * still has to be told the line wants one at a battlefield besides the Apothecary.
 */
const bodiesOf = (c: Combo, h: string) => c.anyBodies
  ? `<${h}>Bodies no card supplies</${h}><p class="net">${esc(c.anyBodies.note)}</p>`
  : "";

/** An entry's prose: prerequisites, steps, how it ends, sources, the audit notes, the rules version. */
export function comboSections(c: Combo, h: "h2" | "h3" = "h3"): string {
  return `
    ${c.prerequisites.notable.length ? `<${h}>Prerequisites</${h}><ul>${c.prerequisites.notable.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
    ${bodiesOf(c, h)}
    <${h}>Steps</${h}><ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    ${c.netPerIteration ? `<${h}>Per iteration</${h}><p class="net">${esc(c.netPerIteration)}</p>` : ""}
    ${c.terminatesIn ? `<${h}>How it ends</${h}><p class="ends">${esc(c.terminatesIn)}</p>` : ""}
    ${sourcesOf(c, h)}
    ${c.notes ? `<details class="audit"><summary>How this entry was audited</summary>
      <p class="audit-key">${AUDIT_KEY}</p><p>${esc(c.notes)}</p></details>` : ""}
    <p class="rules-version">Walked against Core Rules ${esc(c.rulesVersion)}</p>`;
}

/**
 * The thin-content line (#272 §2). An entry whose authored text — steps, notes and prerequisites — is
 * under this many words gets `noindex` and stays out of the sitemap, so a future short entry cannot
 * ship as a thin page. Measured 2026-10-07: the shortest entry ran 287 words, so today it binds on none.
 */
export const THIN_WORDS = 200;

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** The words a person wrote for this entry, as the reader gets them (after the internal-prose strip). */
export const authoredWords = (c: Combo): number =>
  words([...c.steps, c.notes ?? "", ...c.prerequisites.easy, ...c.prerequisites.notable].join(" "));

/** What a combo page needs besides the entry: card text, feature names, the plays about it. */
export interface ComboContext {
  card: (base: string) => Card | undefined;
  feature: (id: string) => Feature | undefined;
  /** The run plays whose subject is this entry, as /plays/<slug> links. */
  playsAbout: (id: string) => { slug: string; title: string }[];
}

const cardName = (ctx: ComboContext, base: string) => ctx.card(base)?.name ?? base;

/** "Card A + Card B + Card C", the shape the drawer's title and the index both use. */
const pieceNames = (c: Combo, ctx: ComboContext) => c.uses.map((u) => cardName(ctx, u.card)).join(" + ");

function piece(u: Combo["uses"][number], ctx: ComboContext): string {
  const card = ctx.card(u.card);
  if (!card) return `<li class="piece"><span class="piece-name">${esc(u.card)}</span></li>`;
  const sub = [card.code, u.role, card.domains.join("/")].filter(Boolean).join(" · ");
  const text = [card.text, card.effect].filter((t): t is string => !!t).map((t) => `<p class="piece-text">${esc(readableCardText(t))}</p>`).join("");
  return `<li class="piece"><span class="piece-name">${esc(card.name)}</span> <span class="piece-qty">×${u.quantity}</span>
      <span class="csub">${esc(sub)}</span>${text}</li>`;
}

/** The body of /combos/<id>, h1 included. */
export function comboBody(c: Combo, ctx: ComboContext): string {
  const copies = c.uses.reduce((n, u) => n + u.quantity, 0);
  const domains = [...new Set(c.uses.flatMap((u) => ctx.card(u.card)?.domains ?? []))];
  const payoff = c.produces.map((f) => ctx.feature(f)).filter((f): f is Feature => !!f && f.status === "STANDALONE");
  const plays = ctx.playsAbout(c.id);
  return `<p class="eyebrow">Combo · ${esc(classLabel(c.class))}</p>
<h1>${esc(c.name)}</h1>
<p class="meta">${copies} card${copies === 1 ? "" : "s"} · ${esc(domains.join(" + ") || "any legend")} · ${esc(c.status)}</p>
<h2>Pieces</h2>
<ul class="pieces">${c.uses.map((u) => piece(u, ctx)).join("")}</ul>
${payoff.length ? `<h2>Payoff</h2><div class="pills">${payoff.map((f) => `<span class="pill">${esc(f.name)}</span>`).join("")}</div>` : ""}
${c.prerequisites.easy.length ? `<h2>Deck</h2><ul>${c.prerequisites.easy.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
${plays.length ? `<h2>Run play${plays.length === 1 ? "" : "s"}</h2><ul class="play-refs">${plays
    .map((p) => `<li><a href="/plays/${esc(p.slug)}">${esc(p.title)}</a></li>`).join("")}</ul>` : ""}
${comboSections(c, "h2")}
<p class="page-cta"><a href="/">Match a deck list against the whole catalogue</a></p>`;
}

export function comboPage(c: Combo, ctx: ComboContext): string {
  return renderDocument(
    {
      path: `/combos/${c.id}`,
      title: c.name,
      description: clip(`${classLabel(c.class)} Riftbound combo: ${pieceNames(c, ctx)}. ${c.steps.length} steps ${c.status === "verified" ? "walked by hand" : "proposed by an automated sweep, not yet walked by hand,"} against Core Rules ${c.rulesVersion}, with sources.`),
      section: "combos",
      noindex: authoredWords(c) < THIN_WORDS,
      ogType: "article",
      mainClass: "combo-page",
    },
    comboBody(c, ctx),
  );
}

/** Class order of the index: the lines that end the game first, ENGINE last, as the app sorts them. */
const CLASSES = (Object.keys(CLASS_RANK) as ComboClass[]).sort((a, b) => CLASS_RANK[b] - CLASS_RANK[a]);

export function combosIndexPage(combos: Combo[], ctx: ComboContext): string {
  const groups = CLASSES.map((cls) => ({ cls, entries: combos.filter((c) => c.class === cls).sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((g) => g.entries.length);
  const verified = combos.filter((c) => c.status === "verified").length;
  const walked = verified === combos.length ? `${combos.length} Riftbound combos walked by hand` : `${combos.length} Riftbound combos, ${verified} walked by hand`;
  const body = `<h1>Combos</h1>
<p>${combos.length} catalogued Riftbound lines${verified === combos.length ? ", every one walked by hand" : ` (${verified} walked by hand)`} against the card text and the Core Rules, with the paragraphs and sources behind each step. They are grouped by class, the ones that end the game first.</p>
${groups.map((g) => `<h2>${esc(classLabel(g.cls))} <span class="count">${g.entries.length}</span></h2>
<ul class="combo-index">${g.entries.map((c) => `<li><a href="/combos/${esc(c.id)}">${esc(c.name)}</a> <span class="csub">${esc(pieceNames(c, ctx))}</span></li>`).join("")}</ul>`).join("\n")}`;
  return renderDocument(
    {
      path: "/combos",
      title: "Combos",
      description: clip(`${walked} against the Core Rules: infinite loops, one-turn bursts, chains and engines, each with its pieces, steps and sources.`),
      section: "combos",
    },
    body,
  );
}
