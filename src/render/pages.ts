/**
 * The three prose pages — Guide, Sources, About — as HTML (#286).
 *
 * The Guide and Sources used to be written into `web/index.html`; they live here now, and the build
 * writes the public pages at /guide and /sources from them. The app shell's own Guide and Sources
 * views went with #575 (#287 had made them unreachable). About exists only as a page (#289's verify
 * lines; it is linked from every footer).
 *
 * Each is a page of its own, so its title is the h1 (the app's views that drew 2 are gone, #575).
 */
import { esc } from "../html.js";
import { renderDocument } from "./layout.js";

export interface ProseSurface {
  /** Whether the catalogue holds an unwalked entry; the word "candidate" is explained only then. */
  candidates: boolean;
}

/** The word "candidate" only means something while the catalogue holds one. */
const when = (s: ProseSurface, html: string) => (s.candidates ? html : "");

/** "Card data as of 2026-09-06: 1189 printings, 779 combos (768 verified)." */
export function cardDataNote(resultsUpdatedAt: string, printings: number, combos: { status: string }[]): string {
  const verified = combos.filter((c) => c.status === "verified").length;
  const tally = verified === combos.length ? `${combos.length} combos, every one walked by hand` : `${combos.length} combos (${verified} verified)`;
  return `Card data as of ${resultsUpdatedAt.slice(0, 10)}: ${printings} printings, ${tally}.`;
}

const title = (text: string) => `<h1 class="doc-title">${esc(text)}</h1>`;

export function guideBody(s: ProseSurface): string {
  return `${title("Guide")}
  <ol>
    <li>Paste a deck list (any common export), a deck code, or a public Piltover Archive link, then press <strong>Find combos</strong>.</li>
    <li><strong>Complete</strong> shows combos your list already has every piece of. <strong>Near misses</strong> shows combos within a few cards, with the missing pieces outlined.</li>
    <li><strong>What to add</strong>, under your list, prices every catalogued line that fits inside your legend's two domains and names the cheapest way to complete one. It never suggests a card your legend could not play.</li>
    <li><strong>Pairs in this deck</strong>, below that, is a different kind of claim and says so. A combo is walked by hand card by card; a pair is a <em>rule</em> walked by hand once — "Blue Sentinel doubles any hold effect" — whose instances are then found by matching card text. Open one to read the rule, the Core Rules paragraphs behind it, and the verified combo it was taken from.</li>
    <li>Every combo carries a <strong>class</strong>, and the list is ordered by it — the ones that end the game come first. <strong>INFINITE</strong> was walked to a step that repeats with no bound on how often. <strong>BURST</strong> reaches the Victory Score in a single scoring event, and <strong>CHAIN</strong> reaches it across several with no turn of the opponent's in between. That score is <strong>8</strong> in Constructed (Core Rules 194.3, “The Victory Score is 8 points by default”) and <strong>11</strong> in 2v2 (489.3) — every line in the catalogue was walked against 8, so under the 2v2 toggle each BURST and CHAIN says how far short of 11 it stops. <strong>ALT WIN</strong> is a card that says outright that you win. <strong>ENGINE</strong> is repeatable advantage that does not close the game on its own — most of the catalogue, and the pieces the other four are built out of.</li>
    <li>Click a combo or a card to isolate it. The side panel lists the pieces, what has to be true before it works, the steps, and where each claim comes from.</li>
    <li>Click a card's picture in the side panel, or double-click a card in the diagram, to read it at full size with its rules text.</li>
    <li><strong>My decks</strong> is your own library. Press <strong>New deck</strong> to write a list out, or paste a public Piltover Archive link to import one. Nothing is written to your account until you press Save or Update — there is no auto-save, and until then nothing about a list leaves your browser.</li>
    <li>Opening a deck shows the list on the left and <strong>Construction</strong> on the right: one row per deck-building rule, each citing the paragraph of Riot's Core Rules it stands on, including the Signature cap (at most 3 Signature cards, all carrying your legend's champion tag, and none of them your Chosen Champion). A row marked <em>unchecked</em> is a rule this site can state but not verify without more of the list filled in — mainly the ones scoped to a legend that has not been named yet. <strong>Analyze combos</strong> hands the list to the Combos tab; <strong>Export deck code</strong> copies a code any Riftbound deck site reads.</li>
    <li><strong>Run plays</strong> asks a different question from the rest of the site. A combo entry prices a line — which cards, which rules, how many points. A run play prices a game: turn by turn, with the mana, against an opponent who is doing something, and it says plainly when the answer is that the line is fine and the deck around it is not. Where a play covers a catalogued line, that line's panel names it.</li>
    ${when(s, `<li>Combos marked <strong>candidate</strong> were proposed by an automated sweep and have not been walked by a human yet. Treat them as leads, not facts.</li>`)}
  </ol>`;
}

/**
 * Sources. `note` is `cardDataNote(…)`, which the build computes from the card index. The page
 * footer carries the disclaimer and the Privacy · Terms links.
 */
export function sourcesBody(s: ProseSurface & { note?: string }): string {
  return `${title("Sources")}
  <p id="data-note">Card text and art come from Riot's official card gallery, with Riot's published errata applied. Legality follows the official Rules Hub. Combos are walked by hand against the Core Rules, card text and rule numbers cited.${when(s, ` Entries marked <em>candidate</em> were proposed by an automated sweep and not yet reviewed.`)} Pairs are a separate file with a weaker guarantee: the rule is walked once and cites its paragraphs, the instances are text matches, and every rule's whole match list was read card by card before it shipped.${s.note ? ` ${esc(s.note)}` : ""}</p>
  <p>Saving a deck stores the list text you typed, not the result of matching it, so an old list is read again against today's catalogue and today's ban list every time you open it. Only you can read your own rows.</p>
  <p>No advertising, no donations, no play-rate or win-rate data. RiftCombo describes combos; it never plays them for you.</p>`;
}

const REPO = "https://github.com/GermanAbuArab/RiftCombo";

export function aboutBody(): string {
  return `<h1 class="doc-title">About RiftCombo</h1>
  <p>RiftCombo is an independent fan project for the Riftbound trading card game. It holds a catalogue of combos — lines of cards that loop, burst to the Victory Score, chain points or build advantage — and matches a deck list against it, so a player can see which lines a list already holds and which it is a card or two short of.</p>
  <h2>How the catalogue is checked</h2>
  <p>Each entry is walked by hand against the card text and Riot's Core Rules, step by step, with the rule paragraphs cited and the sources listed. Card text comes only from Riot's official card gallery, with Riot's published errata applied; legality is transcribed from the official Rules Hub. An entry proposed by an automated sweep is marked <em>candidate</em> until a person has walked it. The <a href="/sources">Sources</a> page says what each part of the site rests on.</p>
  <h2>What it is not</h2>
  <p>RiftCombo describes combos; it never plays them for you. It carries no play-rate or win-rate data and asks for no donations.</p>
  <h2>Source code and contact</h2>
  <p>The site is open source at <a href="${REPO}" rel="noopener noreferrer" target="_blank">github.com/GermanAbuArab/RiftCombo</a>. A wrong step, a missing ruling or a card read the wrong way is best reported as an <a href="${REPO}/issues" rel="noopener noreferrer" target="_blank">issue on that repository</a>, with the entry and the card text it concerns.</p>`;
}

export const guidePage = (candidates: boolean) => renderDocument(
  {
    path: "/guide",
    title: "Guide",
    description: "How to find Riftbound combos in a deck list: complete lines, near misses, what to add, pairs, combo classes and the Victory Score, and how run plays price a game.",
    section: "guide",
  },
  guideBody({ candidates }),
);

export const sourcesPage = (candidates: boolean, note: string) => renderDocument(
  {
    path: "/sources",
    title: "Sources",
    description: "Where RiftCombo's card text, errata, legality and combo walks come from, and what each part of the site rests on.",
    section: "sources",
  },
  sourcesBody({ candidates, note }),
);

export const aboutPage = () => renderDocument(
  {
    path: "/about",
    title: "About",
    description: "RiftCombo is an independent, open-source fan project that catalogues Riftbound combos walked by hand against the card text and the Core Rules.",
    section: "about",
  },
  aboutBody(),
);
