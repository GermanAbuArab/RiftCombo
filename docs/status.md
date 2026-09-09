# RiftCombo — status as of 2026-09-09

Este es el documento de orientación. `docs/plan.md` y `docs/phase0-findings.md` son el plan y el
spike del 2026-09-02 y se conservan como historia: describen decisiones que ya se tomaron distinto.

Every number below carries the command that produces it, measured against commit **`849680b`**
on 2026-09-09 (master = work = this commit). The catalogue grows with every walk: if a number does not match, the command is the
truth and this is a photo.

---

## 1. Qué es el sitio

`https://riftcombo.app`. Pegás una lista de Riftbound (texto, deck code o link público de Piltover
Archive) y te dice qué combos conocidos ya contiene, cuáles le faltan por una o dos cartas, y qué
cartas de tu lista están baneadas o restringidas en el formato que elijas. El emparejamiento corre
entero en el navegador sobre un bundle estático; no hay servidor de matching.

**Todo el sitio está detrás del login** (#39, decisión del usuario del 2026-09-05, que revierte a
propósito el "anónimo idéntico" con el que se construyó #31). `<body data-auth>` lleva el estado —
`pending` (por defecto en el HTML, no muestra ningún lado, así que nada parpadea), `out` (sólo la
puerta de entrada con un botón), `in` (la aplicación) y `open` (un build sin `SUPABASE_URL`, que no
tiene puerta que abrir). El CSS decide qué se ve; `web/account.ts` pone el atributo.

Cuatro vistas, ruteadas por hash (`web/router.ts`, `VIEWS = ["combos","decks","guide","sources"]`):

- **Combos** (`#/combos`) — el panel del mazo y el diagrama. El panel, de arriba abajo: **Banned and
  restricted** (primero, porque una lista que va a un torneo quiere eso antes que cualquier combo),
  la status card, **What to add** (`src/plan.ts`, rankea por copias a agregar) y **Pairs in this
  deck** (las sinergias). El diagrama es SVG a mano, sin librería, con dos formas: `layered`
  (Pieces → Combos → Payoff en columnas) y `circular` (la leyenda como hub).
- **My decks** (`#/decks`) — biblioteca de mazos guardados, con un **editor visual** (`web/builder.ts`,
  #101: a card search with filters and click-to-add, not the raw textarea the Combos view still uses
  for pasting a list) y validación de construcción (`src/build.ts` → `checkBuild`, que reporta
  `pass | fail | unknown` por regla). La fila de Signature ya no es `unknown`: Riot's gallery ships no
  marker for it, but #103 resolved it from two independent mirrors that agree on 51 names
  (`data/signature.src.json` → `Card.signature`), so 103.2.d and 103.2.a.2 now report `pass`/`fail`
  like every other rule. Importación desde Piltover Archive y exportación a deck code.
- **Guide** (`#/guide`) — qué significan las clases (INFINITE, BURST, CHAIN, ALT WIN, ENGINE) y cómo
  leer una entrada.
- **Sources** (`#/sources`) — de dónde sale cada cosa: la API de galería de Riot, el Rules Hub, las
  Core Rules y las fuentes de cada combo.

---

## 2. Los números

| What | Value | Command |
|---|---:|---|
| Entries in the catalogue | **715** | `node -pe 'require("./data/combos.json").combos.length'` |
| Unverified | **0** | `node -pe 'require("./data/combos.json").combos.filter(e=>e.status!=="verified").length'` |
| By class | INFINITE 14 · BURST 17 · CHAIN 12 · ALT_WIN 26 · ENGINE 646 | `node -pe 'const a=require("./data/combos.json").combos,b={};for(const e of a)b[e.class]=(b[e.class]||0)+1;JSON.stringify(b)'` |
| Entries by card count (`uses.length`) | 1:25 · 2:436 · 3:181 · 4:49 · 5:16 · 6:5 · 8:2 · 11:1 | `node -pe 'const a=require("./data/combos.json").combos,b={};for(const e of a)b[e.uses.length]=(b[e.uses.length]\|\|0)+1;Object.keys(b).map(Number).sort((x,y)=>x-y).map(k=>k+":"+b[k]).join(" · ")'` |
| Distinct cards used by some entry | **891** | `node -pe 'const a=require("./data/combos.json").combos,s=new Set();for(const e of a)for(const u of e.uses)s.add(u.card);s.size'` |
| Sources cited | **2046** | `node -pe 'require("./data/combos.json").combos.reduce((n,e)=>n+(e.sources\|\|[]).length,0)'` |
| Synergy rules | **197** | `node -pe 'require("./data/synergies.json").synergies.length'` |
| Anchor–partner pairs produced | **5101** | `npm run synergies \| tail -1` |
| Printings in the pool | **1189** | `node -pe 'require("./data/cards.json").cards.length'` |
| Flat corpus lines | **947** | `wc -l < data/corpus_flat.txt` |
| Errata replacements | **52** | `node -pe 'require("./data/errata.json").entries.length'` |
| Legality rows (ban/restricted) | **21** | `node -pe 'require("./data/legality.json").entries.length'` |
| Hand walks archived | **80** | `ls docs/phase0/walks/*.md \| grep -v README \| wc -l` |
| Tests | **461 in 36 files** | `npm test` |
| Typecheck | clean | `npm run typecheck` |

All 715 entries are `verified`: someone walked the loop by hand against card text and the Core
Rules, and left the walk document in `docs/phase0/walks/`. `candidate` still exists in the schema
for what comes out of a hunt and has not been walked yet, but there is none today.

---

## 3. Arquitectura, una capa por párrafo

**`src/` — lógica pura, con tests.** Todo lo que se puede probar sin un navegador vive acá y por eso
sale de `web/`: `matcher.ts` (los seis buckets de emparejamiento: `included`,
`includedByChangingLegend`, `almostIncluded`, `almostIncludedByAddingDomains`, y las dos
combinaciones), `combos.ts` (carga del catálogo, `CLASS_RANK`, el generador de variantes que aplana
el DAG de `needs`/`produces`), `deck.ts` (parseo de listas en todos sus dialectos, deck codes,
`deckRestrictions(deck, cards, format)`), `plan.ts` (`planDeck`, el panel "What to add"),
`build.ts` (`checkBuild`, las nueve reglas de construcción), `synergies.ts` (evalúa los predicados de
`data/synergies.json` sobre el pool), `cards.ts` (`readableCardText`, que traduce los símbolos de
coste a texto legible), `saved.ts`, `load.ts`, `types.ts`, y dos CLIs (`cli.ts`, `cli-synergies.ts`).

**`web/` — la interfaz.** `main.ts` arma la vista Combos y el drawer de una entrada; `graph.ts` dibuja
el diagrama SVG a mano (dos layouts, trigonometría cerrada, sin simulación de fuerzas ni librería);
`decks.ts` es My decks entera; `router.ts` es el ruteo por hash y las cuatro vistas; `account.ts` y
`supabase.ts` son el login de Google y la puerta; `index.html`, `styles.css`, `privacy.html`,
`terms.html`. **`public/` es artefacto de build de `web/`** — nunca se edita a mano.

**`api/` — el único código de servidor.** `api/deck-url.ts`, una Vercel Edge Function, es un proxy
para las páginas de mazo de Piltover Archive, que el navegador no puede pedir por CORS. Lista blanca
de hosts, User-Agent honesto, caché corta. Nada más corre en un servidor.

**`data/` — cuatro archivos autorados y el resto generado o descargado.** Autorados: `combos.json`
(el catálogo, cada entrada a mano con sus fuentes), `synergies.json` (197 reglas de patrón: la regla
está verificada a mano, las instancias las encuentra un predicado de texto sobre el pool),
`legality.src.json` (la lista de bans transcrita del Rules Hub de Riot por nombre, resuelta a códigos
en el build) y `signature.src.json` (#103: las 51 cartas Signature, resueltas de dos espejos
independientes que la galería de Riot no marca, y llevadas a `Card.signature` en el build). Generados:
`cards.json` y `corpus_flat.txt`. Descargados una vez y committeados:
`Riftbound-Core-Rules-2026-07-16.txt`, `Riftbound-Tournament-Rules-2026-07-16.txt`,
`cards_full.json`. `errata.json` es un overlay fechado de find/replace cuyo build **falla** si un
find-string deja de matchear exactamente una vez por printing — ese fallo es el único mecanismo que
mantiene honesto el texto de carta.

**`scripts/` — los builds.** `build-cards.mjs` baja las 6 páginas de la API de galería de Riot,
aplica la errata, resuelve la legalidad y resuelve `signature.src.json` → `cards.json` (con
`Card.signature`) + `legality.json`; `build-corpus.mjs` →
`corpus_flat.txt`; `build-web.mjs` compila `web/` a `public/` con esbuild, horneando `SUPABASE_URL` y
`SUPABASE_ANON_KEY` con `define`; `build-headers.mjs` **genera `vercel.json`** (nunca se edita a
mano, porque Vercel lo lee antes de correr el build, así que va committeado); `check-rls.mjs` prueba
el aislamiento por fila con dos usuarios reales contra el proyecto hosteado.

**`test/` — 461 tests in 36 files** with vitest. `headers.test.ts` is the one that watches the posture:
falla si el nombre del `service_role` o el password de la base aparecen en cualquier lado bajo
`web/`, si hay más de un botón de sign-in, o si el default de `data-auth` deja de ser `pending`.
**#138 (HIGH, ultrareview 2026-09-06)** found the whole DOM layer of that day's features untested —
no DOM environment was installed at all, so nothing could mount `web/builder.ts`, the router, the
gate or `web/decks.ts`. Fixed by adding `happy-dom` as a `devDependency` and a per-file
`// @vitest-environment happy-dom` pragma, not a global config: six files under `test/dom/` opt in
(`combos-format`, `builder`, `router`, `gate`, `decks`, `builder-bar`) while every other test still
runs with no DOM and no per-test startup cost.

**`supabase/` — Auth y mazos guardados.** `config.toml` es la fuente de verdad de Auth (site URL,
lista de redirects permitidos, el proveedor Google con cliente y secreto como `env(...)`) y se aplica
con `supabase config push`; tocarlo desde el dashboard deja el repo y el proyecto fuera de sincronía.
Dos migraciones: `decks.sql` y `delete_account.sql`.

---

## 4. Cómo se despliega

**El deploy es un push a master.** El proyecto de Vercel está conectado a
`GermanAbuArab/RiftCombo` desde el 2026-09-05, así que cada push a master corre `npm run build:web`
en Vercel **sobre el árbol committeado** y sale a producción. Se comprueba con
`npx vercel ls riftcombo`. `npx vercel deploy --prod` sigue existiendo pero sube el árbol de trabajo,
que dos veces publicó archivos sin commitear de otra sesión: es fallback, no el camino normal.

**Since 2026-09-06, sessions push to `work` and only the orchestrator pushes `master`** — see
CLAUDE.md's "Deploy quota" bullet for the full rule (Vercel's Hobby cap is 100 deployments/day, scoped
to the whole account, and it has been spent more than once). The 2026-09-06/07 lag this section used
to describe is over: `npx vercel inspect https://riftcombo.app --logs` (run 2026-09-09 for this
refresh) shows the live deployment built from `Branch: master, Commit: 849680b` — the same commit as
`master` and `work` right now — so **production is caught up**. Re-run that command before trusting
this sentence; it is a photo, not a guarantee.

El dominio es **`riftcombo.app`**, comprado el 2026-09-05 vía Vercel (US$15/año, nameservers de
Vercel). `www.riftcombo.app` y `riftcombo.vercel.app` responden 308 al ápex, y ese redirect es un
**setting de dominio del proyecto**, no una regla en `vercel.json` — una entrada `redirects` con
`has: host` se probó primero y nunca matcheó en un deploy por Git.

El proyecto hosteado de Supabase es `bpbwsimgiyxzaorunqeo` en `us-east-1` (la región a la que
Vercel despliega). Su **anon key es pública por diseño** y viaja en `public/app.js`; lo que mantiene
las filas de un jugador lejos de otro es RLS, y eso se prueba con `node scripts/check-rls.mjs`
(14 comprobaciones, dos usuarios reales, contra el proyecto hosteado). El `service_role` y el
password viven en `.env.local` y no llegan a ninguna otra parte.

El sign-in es una **redirección de página completa**, y eso es estructural:
`Cross-Origin-Opener-Policy: same-origin` corta un popup de la ventana que lo abrió y el flujo nunca
vuelve, sin error en ninguna consola.

Verificación antes de decir que algo anda — los tres:

```
npm test && npm run typecheck && npm run build:web
```

`npm run dev` está **roto**: el Development Command del proyecto de Vercel es `npm run dev`, así que
`vercel dev` lo rechaza como invocación recursiva. Para mirar la UI, servir `public/` estático
(`cd public && python3 -m http.server 8788`), que alcanza para todo menos la ruta `/api/deck-url`.

---

## 5. El proceso

**Los issues de GitHub son el backlog.** Cada tarea nombrada se convierte en un issue en el momento,
con etiquetas `de-clone`, `ui`, `bug`, `data`, `legal` o `infra`. El cuerpo dice qué está mal, la
evidencia medida, los archivos y las dependencias. Los issues se cierran desde el mensaje de commit
(`Closes #N`); para trabajo parcial, `Refs #N` — calificar un `Closes` no lo acota, `Closes #23 for
web/main.ts` cerró todo el #23. `tasks/todo.md` es borrador de la sesión, no el backlog.

**Cómo entra un combo al catálogo**, en tres pasos que no se saltean:

1. **Caza por lente.** Se elige un eje del pool (una mecánica: `[Repeat]`, `[Hidden]`, `[Equip]`,
   tokens, movimiento, ready, draw, stun; o un eje de datos: dominio, leyenda; o minería de internet)
   y se barre el pool entero contra él. Una lente de keyword se abre con `grep -i <palabra>`, nunca
   con `[Keyword]`: la forma con corchetes se pierde cada carta que escribe la mecánica en prosa.
2. **Issue de candidatas.** La caza entrega un issue con las candidatas, las refutaciones y los
   hallazgos estructurales — como hipótesis, no como hechos.
3. **Caminata a mano.** Una sesión abre cada regla citada en
   `data/Riftbound-Core-Rules-2026-07-16.txt` y cada texto de carta en `data/corpus_flat.txt`, con
   grep y verbatim, y escribe el documento en `docs/phase0/walks/`. Recién ahí la entrada pasa a
   `verified`. Un veredicto estructural de un agente ("no existe X en el pool") no se acepta sin
   caminarlo: la primera caza dijo que no había infinitos y estaba mal.

Un solo dueño de `data/combos.json` a la vez, porque todas las sesiones comparten un working tree y
**un índice**: los commits se hacen con `git commit --only <rutas>`, nunca desde el área de staging.

**Las lecturas de reglas se numeran R1–R33 y se registran en el issue #11**, que es el registro
durable de cuál está ruleada, cuál sigue abierta y cuál se retiró por encontrar la regla en vez de
preguntar. Una lectura ruleada nunca promueve una entrada por sí sola: `verified` sigue exigiendo que
una persona camine el loop.

**Las sinergias son otra cosa y viven en otro archivo.** `data/synergies.json` es *regla verificada,
instancias por texto*: una carta ancla más un predicado sobre el pool, con `basis.rules` (párrafos de
las Core Rules), `basis.readings` (números R) y `basis.combos` (las entradas de las que se extrajo).
Se mantiene separado de `combos.json` a propósito, porque el valor de `combos.json` es que cada fila
fue caminada a mano, y una fila emparejada por texto ahí adentro destruye ese invariante. La UI lo
dice con sus propias palabras y nunca presenta un par como un combo.

---

## 6. The 80 walks

El índice completo — fecha, issue, entradas que dejó — está en
[`docs/phase0/walks/README.md`](phase0/walks/README.md).

**80 walk files exist on disk today (`ls docs/phase0/walks/*.md | grep -v README | wc -l`); that
README's own table lists 62 of them.** This session owns `docs/status.md`, not
`phase0/walks/README.md`, so the 18 missing rows are recorded here instead of merged into that file
— whoever next owns the README should fold this table in and delete it from here:

| Date | File | Issue | What it did |
|---|---|---|---|
| 09-06 | `2026-09-06-engine-payoff-walk.md` | #159 (candidates from #155, #154) | The engine × payoff candidates and the tournament cores: 8 entries authored, 6 refusals recorded, 1 reclass proposed, 2 hunt errors corrected, 1 open lead handed on. |
| 09-06 | `2026-09-06-finisher-feeders.md` | #161 | Mirror of #155's engine-side pass: for each of the catalogue's 36 finishers (18 ALT_WIN, 12 BURST, 4 CHAIN, plus two same-day Grand Plaza wins), asks which uncatalogued in-domain feeder changes the ledger rather than just restating it. |
| 09-06 | `2026-09-06-orphan-synergy-rules.md` | #153 | Of the then-96 hand-verified synergy patterns, 55 had an empty `basis.combos`; this walk asks, for each, whether the anchor plus a partner plus two or three more in-domain cards reaches a repeat step or a scoring event. |
| 09-06 | `2026-09-06-proven-rule-instances.md` | #160 | Of 66 synergy rules already proven to terminate in at least one combo (2,090 reviewed partner slots, only 180 pairs in `combos.json`), prices the unwalked remainder. |
| 09-07 | `2026-09-07-families-rows-6-18.md` | #169 | Second pass on rows 6–18 of the cause/trigger matrix (discard, stun, hide, choose-friendly families); adds the Nami exception to "a Hold-triggered ready is a no-op". |
| 09-07 | `2026-09-07-families-rows-19-47.md` | #168 | Second pass on rows 19–47 of the same matrix: several rows collapse into notables on existing entries by shared mechanism/arithmetic; three disempowerer partners refused because they hit enemy permanents or reset themselves. |
| 09-07 | `2026-09-07-orphan-remainder.md` | #193 | Successor slice to #180/#186/#188 (mono-Order, mono-Body, Calm/Mind closed); closes the remaining orphan cards and states the "does this engine's payoff need an enemy garrison?" test that bounds every Time-Warp-chained conquer engine. |
| 09-07 | `2026-09-07-rules-second-pass.md` | #170 | Second pass on the orphan and under-walked synergy rules; extensive rules citations (204.3.a, 416.1.c, 466.5 ordering) and the four-tag (Bird/Cat/Dog/Poro) population measurement (61 cards, none carrying two tags). |
| 09-07 | `2026-09-07-uncatalogued-body.md` | #186 | The uncatalogued mono-Body cards, successor to #180; closes the lane 137/137. |
| 09-07 | `2026-09-07-uncatalogued-calm-mind-order.md` | (lane split with `rc-walk-uncat`) | The uncatalogued Calm/Mind cards (plus any multi-domain card mixing Order with Calm or Mind); Order-only cards handed to the sibling walk. |
| 09-07 | `2026-09-07-uncatalogued-cards.md` | #171 | The deckable cards in no entry: battlefields first, then legends, then the rest; closes all 64 non-token battlefields and all 49 legend names catalogued, staged or refused by rule. |
| 09-07 | `2026-09-07-uncatalogued-fury-body-chaos.md` | #173 | The uncatalogued Fury/Body/Chaos cards; closes that slice (39 entries across batches plus ten orphan dual-domain Signature spells) and pins the base-code-vs-name+type census method. |
| 09-07 | `2026-09-07-uncatalogued-order.md` | #180 | The uncatalogued mono-Order cards, successor to #171; closes the lane 139/139. |
| 09-07 | `2026-09-07-uncited-rules-blocks.md` | #187 | Measures that 207 of the Core Rules' 385 top-level numbers are cited by nothing in `combos.json`/`synergies.json`, then walks the mechanically-rich blocks (432 Doubling, 433 Swapping, 465.2.c.6–.c.10 Backline/Tank ordering, 734–738 Additional Turns). |
| 09-07 | `2026-09-07-uncited-subrules-500-899.md` | #191 | Successor to #187, one level down: every `NNN.x.y` sub-rule heading in 500–899 with a worked `Example:` line that nothing cites; also the `grep "^NNN\."` form-feed trap (112 headings including 718 are invisible to a bare `^` anchor). |
| 09-09 | `2026-09-09-citation-audit.md` | #137 | Audits the 774 `riot`-type sources in `combos.json`: 1,358 quotes verbatim, 7 truncated, 7 paraphrased and repaired; confirms no Core Rules worked example is misattributed as the paragraph itself; 11 external-page quotes (ban-list posts, set FAQs) can't be checked from files this repo ships. |
| 09-09 | `2026-09-09-produces-tagging.md` | #157 | Tags the untagged ENGINE entries (measured at 102 of 714, then 715, all class ENGINE) with `produces` values — four reused, five new (`combat-might`, `board-protection`, `tempo-denial`, `unit-delivery`, `xp-engine`) — so the drawer and the diagram show a payoff for entries that previously showed none. |

---

## 7. Qué está abierto hoy

| Issue | Qué |
|---|---|
| #137 | LOW: 8 of 371 sourced citations still carry no `accessed` date — re-measured 2026-09-09 (`node -pe` walk over `combos.json`, see §2's command style); the rest are CAPTCHA/login walls with no readable route yet (9 old.reddit.com threads, 1 riftbound.gg/decks page) |
| #187 | Walk: the Core Rules blocks this catalogue has never cited (432 Doubling, 433 Swapping, 465.2.c.6–.c.10, 734–738, and more) |
| #191 | Walk: uncited Core Rules sub-rules 500–899, mined by worked example |
| #195 | Synergies, fifteenth batch: 17 rules (180 → 197) and 38 back-links — tracking issue for a merged batch |
| #196 | Cross-audit of the 86 entries written since #189/#192: one substantive defect (two linked halves) plus three minor findings, most already applied in `849680b` |

`gh issue list --state open` es la lista viva; esta tabla es la foto del 2026-09-09. #143 (el hunt de
las 145 spells sin catalogar) está cerrado.

Las lentes por mecánica están todas barridas, y también las seis cazas por dominio de unidad
(Order/Fury/Chaos/Body/Calm/Mind) y la caza por leyenda, así que lo que queda abierto es residual:
citas pendientes, dos vetas de reglas nunca citadas, y auditorías de calidad sobre los ~370 entries
más nuevos.
