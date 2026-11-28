/**
 * The one HTML escape in the project (#130).
 *
 * It was copy-pasted into `web/main.ts`, `web/decks.ts` and `web/builder.ts`, character for
 * character, so a fix to one would have left the other two behind — and its class was `[&<>"]`,
 * which is only safe for as long as every attribute it feeds is double-quoted. Every call site was
 * traced when this moved and every one of them was, so nothing was broken; what was missing was
 * anything stopping the next edit from writing `value='${esc(x)}'` and handing a player who names a
 * deck `x' onmouseover='…` an attribute of their own. The apostrophe is in the class now, which
 * closes that whole shape permanently and costs one entity on the few names that carry one.
 *
 * It lives in `src/` rather than `web/` for the same reason `planDeck` and `readableCardText` do:
 * that is where a test can reach it.
 */
const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ENTITIES[c]!);
