/**
 * The reserved ad slot (#292, #272 §6). Fixed-size manual units only: no Auto ads, no
 * `data-ad-format`, no fluid or in-feed unit, because a slot whose size the ad decides is a layout
 * shift. The box's width and height come from `web/styles.css` alone (`.ad-slot`, 760px breakpoint),
 * so they are in place before any script runs and an unfilled box keeps them.
 *
 *   in-content  336 x 280 from 760px, 300 x 250 under it
 *   end         728 x 90  from 760px, 320 x 100 under it
 *
 * At most two per page, on the ad surface only (`isAdPath`), and none while the publisher id is "":
 * the dark launch (#291) renders no slot at all, so nothing changes on the page before launch. The
 * `<ins class="adsbygoogle">` is inert until the ad surface's loader (#290) pushes it.
 */
import { esc } from "../html.js";

export type AdKind = "in-content" | "end";

/** The label above the box, outside it, so the box keeps its reserved size. Plain text, not a link. */
export const AD_LABEL = "Advertisement";

/** One slot for the bare publisher id `id` (`pub-…`), or "" when there is none. */
export function adSlot(kind: AdKind, id: string): string {
  if (!id) return "";
  return `<aside class="ad" aria-label="${AD_LABEL}"><p class="ad-label">${AD_LABEL}</p>`
    + `<div class="ad-slot ad-slot-${kind}"><ins class="adsbygoogle" data-ad-client="ca-${esc(id)}"></ins></div></aside>`;
}
