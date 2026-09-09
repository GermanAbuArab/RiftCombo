# Architecture artifacts

Two explorable diagrams of this repository, generated with the **archify** skill from typed JSON
specifications. Both are **documentation only**: they are never linked from the site, never served
from `public/`, and nothing under `web/` imports them. Their rendered HTML uses motion and gradients
that this project's own UI rules forbid on `riftcombo.app`; as a document that is fine, on the site
it would not be.

Open either `.html` directly in a browser. Both are self-contained — no network, no assets, no build.

| Artifact | What it answers |
|---|---|
| `riftcombo-architecture.json` / `.html` | How a decklist becomes matched combos: the card pool, the authored catalogue, the four `src/` layers, the browser app, the deploy target, and the tests attached to the edges they protect. |
| `riftcombo-card-pipeline.json` / `.html` | How a Riot card becomes matchable data: the gallery API, the three hand-authored overlays and which of them fail the build, the generated files, and who reads which projection. |

The `.json` files are the source of truth. The `.html` files are generated from them and are committed
so a future session can open the map without having to reproduce the toolchain.

## Regenerating

The skill lives **outside this repository**, at `~/.personal-claude/skills/archify`, and is
deliberately not vendored: it is ~8 MB of assets and renderers that have nothing to do with shipping
the site. It has no dependencies beyond Node.

```sh
ARCHIFY=~/.personal-claude/skills/archify/bin/archify.mjs

# architecture — --repo-root verifies every components[].sources path, line and end_line
# against the blob at meta.repository.revision, independently of the working tree
node $ARCHIFY validate architecture docs/architecture/riftcombo-architecture.json \
  --quality showcase --repo-root .
node $ARCHIFY deliver  architecture docs/architecture/riftcombo-architecture.json \
  docs/architecture/riftcombo-architecture.html --quality showcase --repo-root .

# card pipeline — dataflow rejects --repo-root, so this one carries no source links
node $ARCHIFY validate dataflow docs/architecture/riftcombo-card-pipeline.json --quality showcase
node $ARCHIFY deliver  dataflow docs/architecture/riftcombo-card-pipeline.json \
  docs/architecture/riftcombo-card-pipeline.html --quality showcase

# optional browser evidence; writes *.visual-check.* beside the artifact, which is gitignored
node $ARCHIFY visual-check docs/architecture/riftcombo-architecture.html --json
```

`visual-check` drives a real Chrome at 1440x900, 1600x1000, 1920x1080 and 2048x1320 in both themes
and writes PNGs, a receipt and a contact sheet. That output is ~1.7 MB of regenerable QA and is
excluded by `docs/architecture/*.visual-check.*` in `.gitignore`.

## What was true when these were drawn

Pinned at `849680b88a3dadb6bf6964f41ef2489c609b9135`: 1,189 card printings, 715 combo entries,
197 synergy rules, 19 features, 81 walk documents, 36 test files. `meta.repository.revision` in the
architecture specification is that commit, and its 32 source links were verified against blobs at it.
Re-running `validate --repo-root .` after the tree moves will still verify against that commit; bump
the revision when a cited line number has actually moved.
