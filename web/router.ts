// The app shell's two views (#43). This is the only file that knows the view names, so adding one
// is an entry in VIEWS and a container in the HTML — and `test/a11y.test.ts` reads VIEWS from here
// rather than repeating the list. Run plays, Guide and Sources were views too until #287 made them
// public pages the shell only links to; #575 removed their dead containers.
//
// #287 moved the router from the hash to the History API (#272 design §2). The app is the shell at
//   /app  /app?deck=<id>  /app#deck=<code>  /decks  /decks/new  /decks/<id>
// and `/` while it still serves that shell (#288 gives `/` its own landing). Every other path —
// /combos/<id>, /plays/<slug>, /guide, /sources, /about, /privacy — is a pre-rendered public page
// (#286), and crossing between the two surfaces is a FULL navigation, never a pushState, so the
// browser applies the destination's own headers (its CSP above all, #272 §5).
//
// Old hash links (`#/plays/x`, `#/combos?deck=<id>`, `#deck=<code>`, every other `#/<view>`) still
// work: the server never sees a fragment, so `redirectLegacyHash` turns them into paths on boot.

export const VIEWS = ["combos", "decks"] as const;
export type ViewName = (typeof VIEWS)[number];

export interface Route {
  view: ViewName;
  /** The saved deck id in `/decks/<id>`, or the literal "new". Null on every other route. */
  deckId: string | null;
  /** `/app?deck=<id>`: which saved deck the Combos view is showing. */
  analyzing: string | null;
  /** `/app#deck=<code>`: a list or deck code carried in the fragment, so it never reaches a server log. */
  legacyDeck: string | null;
}

const DEFAULT: Route = { view: "combos", deckId: null, analyzing: null, legacyDeck: null };

/** Where each view lives: both are in-app paths. */
export const VIEW_PATHS: Record<ViewName, string> = { combos: "/app", decks: "/decks" };

/** What the browser tab says on each route (#79). */
const TITLES: Record<ViewName, string> = {
  combos: "RiftCombo — Riftbound combo finder",
  decks: "My decks — RiftCombo",
};

/** The paths the app shell serves; everything else on the origin is a public page. */
export function isAppPath(pathname: string): boolean {
  return pathname === "/" || pathname === "/app" || pathname === "/decks" || pathname.startsWith("/decks/");
}

const decode = (s: string): string => {
  try { return decodeURIComponent(s); } catch { return s; }
};

/** Read a route from a path with its query and fragment. Pure, so `test/router.test.ts` can pin it. */
export function parseUrl(url: string): Route {
  const { pathname, searchParams, hash } = new URL(url, "https://riftcombo.app");
  const legacyDeck = hash.startsWith("#deck=") ? decode(hash.slice(6)) : null;
  const [head = "", tail = ""] = pathname.replace(/^\//, "").split("/");
  const view: ViewName = head === "decks" ? "decks" : "combos";
  return {
    view,
    deckId: view === "decks" && tail ? decode(tail) : null,
    analyzing: view === "combos" ? searchParams.get("deck") : null,
    legacyDeck: view === "combos" ? legacyDeck : null,
  };
}

/**
 * The path an old hash link means, or null when the fragment is not a route (`#stage`, empty). The
 * old router read any `#/<unknown>` as Combos, so this does too.
 */
export function legacyTarget(hash: string): string | null {
  const raw = hash.replace(/^#/, "");
  if (raw.startsWith("deck=")) return `/app#${raw}`;
  if (!raw.startsWith("/")) return null;
  const [path = "", query = ""] = raw.slice(1).split("?");
  const [head = "", tail = ""] = path.split("/");
  switch (head) {
    case "decks": case "plays": return tail ? `/${head}/${tail}` : `/${head}`;
    case "guide": case "sources": return `/${head}`;
    default: {
      const deck = new URLSearchParams(query).get("deck");
      return deck ? `/app?deck=${encodeURIComponent(deck)}` : "/app";
    }
  }
}

/** How a full navigation happens. A seam so a test can see one requested without leaving the page. */
export const navigate = {
  load: (url: string): void => { location.assign(url); },
  replace: (url: string): void => { location.replace(url); },
};

/**
 * Turn an old hash link into its path, before anything reads the route. An in-app target is
 * rewritten in place; a public one is a full navigation. Returns true when the page is leaving.
 */
export function redirectLegacyHash(): boolean {
  const target = legacyTarget(location.hash);
  if (!target) return false;
  if (isAppPath(target.replace(/[?#].*$/, ""))) {
    history.replaceState(history.state, "", target);
    return false;
  }
  navigate.replace(target);
  return true;
}

export const route = (): Route => parseUrl(location.pathname + location.search + location.hash);

/**
 * Switch to a route NOW. `pushState` fires nothing, so the view is applied on this line: code on the
 * next line must not be looking at the old view, which is how the combo diagram once measured a
 * hidden container and drew itself with a NaN viewBox (#57). A destination outside the app shell, or
 * a page that is not the shell, gets a full navigation instead.
 */
export function go(url: string): void {
  const next = new URL(url, location.href);
  if (next.origin !== location.origin || !isAppPath(next.pathname) || !isAppPath(location.pathname)) {
    navigate.load(next.href);
    return;
  }
  if (next.href !== location.href) history.pushState(null, "", next.href);
  apply(true);
}

const listeners: ((r: Route) => void)[] = [];
let applied: string | null = null;

/** What makes two addresses the same route: an in-page fragment like `#stage` is not part of it. */
const routeKey = (): string =>
  location.pathname + location.search + (location.hash.startsWith("#deck=") ? location.hash : "");

function apply(force = false): void {
  if (!force && applied === routeKey()) return;
  applied = routeKey();
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
    const here = a.getAttribute("href") === VIEW_PATHS[r.view];
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

/**
 * Register a check for work that a full load would lose. A route listener can stop a pushState, but
 * a link to a public page leaves the document (#287), so that way out only gets the browser's own
 * leave prompt, raised while any check says yes.
 */
const leaveChecks: (() => boolean)[] = [];
export function onLeave(unsaved: () => boolean): void {
  leaveChecks.push(unsaved);
}

function onBeforeUnload(ev: Event): void {
  if (leaveChecks.some((unsaved) => unsaved())) ev.preventDefault();
}

/**
 * A plain left click on a link from the shell to the shell stays in the page. Anything else — a
 * modified click, a new tab, another origin, a public page on either end, a bare in-page fragment —
 * is left to the browser, which is what makes public → app a full load.
 */
function onClick(ev: MouseEvent): void {
  if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
  const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
  const next = new URL(a.href, location.href);
  if (next.origin !== location.origin || !isAppPath(next.pathname) || !isAppPath(location.pathname)) return;
  const samePage = next.pathname === location.pathname && next.search === location.search;
  if (samePage && next.hash && !next.hash.startsWith("#deck=")) return;
  ev.preventDefault();
  go(next.href);
}

/** Returns the way to detach it again, so a test that loads a fresh router leaves no old one listening. */
export function startRouter(): () => void {
  const stop = new AbortController();
  window.addEventListener("popstate", () => apply(), { signal: stop.signal });
  document.addEventListener("click", onClick, { signal: stop.signal });
  window.addEventListener("beforeunload", onBeforeUnload, { signal: stop.signal });
  apply();
  return () => stop.abort();
}
