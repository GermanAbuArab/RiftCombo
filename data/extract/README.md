# `data/extract/` — superseded phase-0 artifact, read by nothing

**Nothing in `src/`, `web/`, `scripts/` or `test/` opens these files.** Verified by grep on
2026-09-13; the only mention anywhere in the repo is `docs/.handoff-fable.md`, an old handoff.

Eight `.jsonl` chunks, 444 KB, committed on 2026-09-02 in `f882539` ("Phase 0 record correction +
Riot-sourced card data pipeline"). They are an early attempt at reducing every card to structured
primitives — `abilities`, `loop_roles`, hand-written `notes` — for a machine-readable combo hunt:

```json
{"code": "OGN-002/298", "name": "Brazen Buccaneer", "abilities": [{"kind": "additional_cost", ...}],
 "loop_roles": ["cost_reducer"], "notes": "..."}
```

**That approach was abandoned and the project went a different way.** Card text now comes only from
Riot's gallery content API through `scripts/build-cards.mjs` into `data/cards.json` and
`data/corpus_flat.txt`, which is the rule in `CLAUDE.md`: *"Card text comes ONLY from Riot's gallery
content API ... never from RiftScribe or other mirrors"*. These chunks are hand-derived
interpretations, not Riot text, so **they must never be used as a source for card text or for a
combo walk** — that is exactly the mirror problem the rule exists to prevent, and their `code` field
(`OGN-002/298`) is not even this project's base-code format.

Kept rather than deleted because `CLAUDE.md` says to mention dead weight rather than remove it, and
because the phase-0 record is history worth keeping. If a future session wants the space back, the
files are recoverable from `f882539`.
