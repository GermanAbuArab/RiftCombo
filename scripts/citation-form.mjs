// The ONE form for counting a Core Rules citation in prose (#232). Both rules-vein scripts import
// it, so they cannot drift apart again. Six traps, each of which shipped once:
//  - a preceding HYPHEN          (OGN-304 is a collector number, not rule 304)
//  - a preceding "#"             (#153 is an issue number)
//  - a following sub-part        (419.4.a.1 must not count as 419.4.a)
//  - a trailing full stop        (a citation that ends a sentence must still count)
//  - a rule-pair slash after a DIGIT   (420.1/420.2.a must count 420.2.a)
//  - a rule-pair slash after a LETTER  (315.4.b/315.4.b.1 must count 315.4.b.1)
// The second lookbehind rejects a URL path only: a path segment ends in two or more letters
// ("issues/115"), a sub-rule ends in exactly one after a dot (".b/").
export const citeRe = (h, flags = "") =>
  new RegExp("(?<![-#=_0-9.A-Za-z])(?<![A-Za-z]{2}/)" + h.replace(/\./g, "\\.") + "(?![0-9a-z]|\\.[0-9a-z])", flags);

export const countCites = (h, s) => (s.match(citeRe(h, "g")) || []).length;
