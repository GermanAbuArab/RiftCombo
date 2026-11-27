/**
 * The one inline script of the ad surface (#290, #272 §5): `/combos/<id>`, `/plays/<slug>` and
 * `/guide`. Those paths get a hash-based strict CSP (`'sha256-<this script>' 'strict-dynamic'`), so
 * this is the only script the browser trusts there, and whatever it inserts is trusted through it.
 * A static page cannot carry a per-request nonce, which is why the policy names a hash.
 *
 * Its bytes are the same on every ad page and in every build, publisher id or none:
 * `scripts/build-headers.mjs` hashes them into the committed vercel.json, which Vercel reads before
 * any build runs, so the script reads the id from the page's `google-adsense-account` meta tag
 * (`withAdsenseAccount`, #291) rather than carrying it. With no tag (the dark launch) it does nothing.
 * With one it inserts, after the document is parsed:
 *   - `/privacy-choices.js`, the footer link's script (#293). On these pages it cannot be a plain
 *     `<script src>`: under 'strict-dynamic' a same-origin URL is not trusted by itself.
 *   - Google's `adsbygoogle.js` for that publisher, then one `adsbygoogle.push({})` per
 *     `<ins class="adsbygoogle">` on the page (#292's slots), so no slot needs a script of its own.
 *
 * Written as ES5 on purpose: it is shipped as it stands, never through esbuild, and the hash is of
 * these exact characters.
 */
export const AD_LOADER = `document.addEventListener("DOMContentLoaded",function(){var d=document,m=d.querySelector('meta[name="google-adsense-account"]');if(!m)return;function add(u,x){var s=d.createElement("script");s.src=u;s.async=true;if(x)s.crossOrigin="anonymous";d.head.appendChild(s)}add("/privacy-choices.js");add("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+encodeURIComponent(m.getAttribute("content")),1);var q=window.adsbygoogle=window.adsbygoogle||[],n=d.querySelectorAll("ins.adsbygoogle").length;while(n--)q.push({})});`;

export const AD_LOADER_SCRIPT = `<script>${AD_LOADER}</script>`;

/**
 * The ad surface as a regular expression over the path after its leading `/`, in the subset that
 * both a JavaScript RegExp and Vercel's header `source` (path-to-regexp 6, inside a `(...)` group)
 * read the same way: no capturing group, no `/` needing an escape. `scripts/build-headers.mjs` builds
 * the ad rule's source and the generic rule's exclusion from it, and the renderer uses it to choose
 * the pages that carry the loader, so the two cannot disagree on a path.
 */
export const AD_SURFACE = "(?:combos|plays)/[^/]+|guide";

const AD_PATH = new RegExp(`^/(?:${AD_SURFACE})$`);

/** Whether a page at `path` (as `BuiltPage.path` spells it) is on the ad surface. */
export const isAdPath = (path: string): boolean => AD_PATH.test(path);

/** `html` with the loader as the last line of its `<head>`. */
export function withAdLoader(html: string): string {
  if (!html.includes("</head>")) throw new Error("withAdLoader: document has no </head>");
  return html.replace("</head>", `${AD_LOADER_SCRIPT}\n</head>`);
}
