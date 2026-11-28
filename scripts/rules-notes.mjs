// The project's carried rules: CLAUDE.md plus every notes file it points to (#274).
// CLAUDE.md was slimmed to the per-turn rules and the dated findings moved verbatim to
// docs/rules-notes/; any check that asks "does the project carry this rule?" reads both.
import fs from "fs";

const DIR = "docs/rules-notes";
export const rulesNotesFiles = () => [
  "CLAUDE.md",
  ...fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).sort().map((f) => `${DIR}/${f}`),
];
export const rulesNotesText = () => rulesNotesFiles().map((f) => fs.readFileSync(f, "utf8")).join("\n");
