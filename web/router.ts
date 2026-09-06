// The four views (#43). Before this, "Combos · Guide · Sources" were anchors that scrolled to two
// sections at the foot of the page: they looked like tabs and were not. This is the only file that knows
// the view names, so adding a fifth is one entry in VIEWS and one container in the HTML.
//
// Routes:  #/combos  #/combos?deck=<id>  #/decks  #/decks/new  #/decks/<id>  #/guide  #/sources
// Legacy:  #deck=<list>  — a deck code shared before this existed still opens Combos with it.

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

/**
 * What the browser tab says on each route (#79). Combos keeps the whole descriptive title because it
 * is the title of the site itself — it is what `/` is bookmarked and indexed under. The other three
 * are named, so history, the window switcher and a screen reader all report the view change that the
 * hash alone makes silent.
 */
const TITLES: Record<ViewName, string> = {
  combos: "RiftCombo — Riftbound combo finder",
  decks: "My decks — RiftCombo",
  guide: "Guide — RiftCombo",
  sources: "Sources — RiftCombo",
};

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  if (raw.startsWith("deck=")) return { ...DEFAULT, legacyDeck: decodeURIComponent(raw.slice(5)) };
  const [path = "", query = ""] = raw.replace(/^\//, "").split("?");
  const [head = "", tail = ""] = path.split("/");
  const view = (VIEWS as readonly string[]).includes(head) ? (head as ViewName) : "combos";
  const params = new URLSearchParams(query);
  return {
    view,
    deckId: view === "decks" && tail ? decodeURIComponent(tail) : null,
    analyzing: view === "combos" ? params.get("deck") : null,
    legacyDeck: null,
  };
}

export const route = (): Route => parseHash(location.hash);

/**
 * Write a route into the hash and switch to it NOW. Setting `location.hash` alone is not enough: the
 * browser fires `hashchange` on a later task, so code that runs on the next line would still be looking
 * at the old view — which is how the combo diagram came to measure a hidden container and draw itself
 * with a NaN viewBox. Assigning the hash is still what puts an entry in the history, so Back and Forward
 * keep working; `applied` stops the later `hashchange` from doing the same work twice.
 */
export function go(hash: string): void {
  if (location.hash !== hash) location.hash = hash;
  apply(true);
}

const listeners: ((r: Route) => void)[] = [];
let applied: string | null = null;

function apply(force = false): void {
  if (!force && applied === location.hash) return;
  applied = location.hash;
  const r = route();
  // The page says which view it is on, so a control that only means something on one of them — the
  // format toggle belongs to the combo matcher — can be hidden where it would do nothing.
  document.body.dataset["view"] = r.view;
  for (const name of VIEWS) {
    const el = document.querySelector<HTMLElement>(`#view-${name}`);
    if (el) el.hidden = name !== r.view;
  }
  document.title = TITLES[r.view];
  for (const a of document.querySelectorAll<HTMLAnchorElement>(".topnav a")) {
    const here = a.getAttribute("href") === `#/${r.view}`;
    a.classList.toggle("active", here);
    // The orange underline says which tab you are on to everyone who can see it; this says it to
    // everyone else. Removed rather than set to "false", which is not a value aria-current takes.
    if (here) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  }
  for (const cb of listeners) cb(r);
}

/** Register a listener. `startRouter` runs every one of them for the route the page opened on. */
export function onRoute(cb: (r: Route) => void): void {
  listeners.push(cb);
}

export function startRouter(): void {
  window.addEventListener("hashchange", () => apply());
  apply();
}
