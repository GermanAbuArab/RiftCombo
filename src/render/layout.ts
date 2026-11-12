/**
 * The document every pre-rendered page sits in (#286).
 *
 * The public pages are built once at deploy time by `scripts/build-web.mjs`, from the same string
 * functions the browser imports, so a crawler and a reader get one definition of each page. This
 * module is the shell: head, header, footer. Nothing in it reads the catalogue.
 *
 * Three rules every page here obeys, and `test/render.test.ts` checks them over every page built:
 *   - exactly one `<h1>`, which is the page's own title. The brand in the header is a span here, not
 *     the h1 it is in `web/index.html`: there, one document holds every view and the brand is the only
 *     heading they share (#270); here, each page is its own document and names itself.
 *   - Riot's disclaimer, verbatim, in the footer (docs/plan.md §1).
 *   - a canonical URL on https://riftcombo.app, the address the sitemap lists.
 * No inline `style=` and no inline script anywhere: the CSP forbids the first and names the hash of
 * the one JSON-LD block it allows for the second, which lives in `web/index.html` only.
 */
import { esc } from "../html.js";

export const ORIGIN = "https://riftcombo.app";

/**
 * Riot's "Legal Jibber Jabber" sentence. Exact wording; never paraphrase it. Printed raw rather than
 * through `esc()`, which would turn its quotes into entities: it holds no `<`, `>` or `&`, and the
 * suites look for it byte for byte, the way every hand-written page carries it.
 */
export const DISCLAIMER =
  `RiftCombo was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.`;

/** Which nav entry a page belongs under, so the header can say which one is current. */
export type Section = "combos" | "plays" | "guide" | "sources" | "about" | null;

/**
 * The header's links. Every public page is a real path now; "My decks" is still the app's hash
 * route, because the router is #287's change and not this one.
 */
const NAV: { section: Section; href: string; label: string }[] = [
  { section: "combos", href: "/combos", label: "Combos" },
  { section: null, href: "/decks", label: "My decks" },
  { section: "plays", href: "/plays", label: "Run plays" },
  { section: "guide", href: "/guide", label: "Guide" },
  { section: "sources", href: "/sources", label: "Sources" },
];

export interface PageMeta {
  /** The path the page is served at and canonical for: "/combos/<id>", "/guide". */
  path: string;
  /** The page's own title, without the site name; the `<title>` appends it. */
  title: string;
  description: string;
  section: Section;
  /** Thin pages are kept out of search engines (and out of the sitemap). */
  noindex?: boolean;
  /** og:type. Articles are the combo and play pages; the indexes are websites. */
  ogType?: "website" | "article";
  /** Extra classes on `<main>` after `doc page`. */
  mainClass?: string;
}

/** A meta description that fits a search result: whole words, at most ~160 characters. */
export function clip(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  // At the last word boundary; a text with no space in reach is cut where it stands.
  const at = cut.lastIndexOf(" ");
  return `${(at > 0 ? cut.slice(0, at) : cut).replace(/[\s,;:.—–-]+$/, "")}…`;
}

const BRAND_MARK = `<svg class="brand-mark" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5 18.5 10 10 18.5 1.5 10Z"/><path d="M10 6.2 13.8 10 10 13.8 6.2 10Z"/></svg>`;

/** A whole HTML document. `body` must carry the page's one `<h1>`. */
export function renderDocument(meta: PageMeta, body: string): string {
  const url = `${ORIGIN}${meta.path}`;
  const title = `${meta.title} — RiftCombo`;
  const desc = esc(meta.description);
  const nav = NAV.map((n) =>
    `<a href="${n.href}"${n.section && n.section === meta.section ? ' aria-current="page"' : ""}>${n.label}</a>`).join("\n    ");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${desc}">
<meta name="color-scheme" content="dark">
${meta.noindex ? '<meta name="robots" content="noindex">\n' : ""}<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${meta.ogType ?? "website"}">
<meta property="og:site_name" content="RiftCombo">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${ORIGIN}/og.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The RiftCombo diamond mark and wordmark on a dark background, captioned Combo finder for the Riftbound TCG.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ORIGIN}/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="topbar">
  <a class="brand" href="/">
    ${BRAND_MARK}
    <span class="brand-name">RIFTCOMBO</span>
  </a>
  <nav class="topnav">
    ${nav}
  </nav>
  <div class="topbar-right"></div>
</header>

<main class="doc page${meta.mainClass ? ` ${meta.mainClass}` : ""}">
${body}
</main>

<footer class="doc colophon">
  <p><a href="/about"${meta.section === "about" ? ' aria-current="page"' : ""}>About</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
  <p>${DISCLAIMER}</p>
</footer>
</body>
</html>
`;
}
