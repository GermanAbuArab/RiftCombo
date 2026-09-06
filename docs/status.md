# RiftCombo — estado a 2026-09-06

Este es el documento de orientación. `docs/plan.md` y `docs/phase0-findings.md` son el plan y el
spike del 2026-09-02 y se conservan como historia: describen decisiones que ya se tomaron distinto.

Todos los números de abajo llevan al lado el comando que los produce, y fueron medidos sobre el
commit **`d8e84f2`** el 2026-09-06. El catálogo crece con cada caminata: si un número no coincide,
el comando es la verdad y esto es la foto.

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

| Qué | Valor | Comando |
|---|---:|---|
| Entradas en el catálogo | **245** | `node -pe 'require("./data/combos.json").combos.length'` |
| No verificadas | **0** | `node -pe 'require("./data/combos.json").combos.filter(e=>e.status!=="verified").length'` |
| Por clase | INFINITE 14 · BURST 12 · CHAIN 4 · ALT_WIN 17 · ENGINE 198 | `node -pe 'const a=require("./data/combos.json").combos,b={};for(const e of a)b[e.class]=(b[e.class]||0)+1;JSON.stringify(b)'` |
| Cartas distintas usadas por alguna entrada | **386** | `node -pe 'const a=require("./data/combos.json").combos,s=new Set();for(const e of a)for(const u of e.uses)s.add(u.card);s.size'` |
| Fuentes citadas | **862** | `node -pe 'require("./data/combos.json").combos.reduce((n,e)=>n+(e.sources\|\|[]).length,0)'` |
| Reglas de sinergia | **96** | `node -pe 'require("./data/synergies.json").synergies.length'` |
| Pares ancla–socio que producen | **2974** | `npm run synergies \| tail -1` |
| Printings en el pool | **1189** | `node -pe 'require("./data/cards.json").cards.length'` |
| Líneas del corpus plano | **947** | `wc -l < data/corpus_flat.txt` |
| Reemplazos de errata | **52** | `node -pe 'require("./data/errata.json").entries.length'` |
| Filas de legalidad (ban/restricted) | **21** | `node -pe 'require("./data/legality.json").entries.length'` |
| Caminatas a mano archivadas | **62** | `ls docs/phase0/walks/*.md \| grep -v README \| wc -l` |
| Tests | **388 en 27 archivos** | `npm test` |
| Typecheck | limpio | `npm run typecheck` |

Las 245 entradas son `verified`: alguien caminó el loop a mano contra el texto de carta y las Core
Rules, y dejó el documento de la caminata en `docs/phase0/walks/`. `candidate` sigue existiendo en
el esquema para lo que sale de una caza y todavía no se caminó, pero hoy no hay ninguna.

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
(el catálogo, cada entrada a mano con sus fuentes), `synergies.json` (96 reglas de patrón: la regla
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

**`test/` — 388 tests en 27 archivos** con vitest. `headers.test.ts` es el que vigila la postura:
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
to the whole account, and today's 130 commits already spent it once). This is why **production
currently lags master**: `npx vercel ls riftcombo` and `npx vercel inspect https://riftcombo.app --logs`
(run 2026-09-06 for this refresh) show the live alias still on commit `55e24f3` (234 combos, built
15:19 local time), while every deploy attempted since — up to master's current HEAD — fails at the
build step with `fatal: bad object <sha>`, because `${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}` (the #126 fix)
points at a commit Vercel's shallow clone no longer holds. Production is expected to catch up to
master by 2026-09-07 16:26.

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

## 6. Las 62 caminatas

El índice completo — fecha, issue, entradas que dejó — está en
[`docs/phase0/walks/README.md`](phase0/walks/README.md).

---

## 7. Qué está abierto hoy

| Issue | Qué |
|---|---|
| #137 | LOW: 10 of 20 external citations across 12 verified combos still carry no `accessed` date (the other 10 were dated 2026-09-06 in `0cf876a`; the rest are CAPTCHA/login walls with no readable route yet) |
| #143 | Combo hunt: the 145 uncatalogued spells — 22 dead, 121 already synergy-covered, 0 new candidates |

`gh issue list --state open` es la lista viva; esta tabla es la foto del 2026-09-06.

Las lentes por mecánica están todas barridas, y también las seis cazas por dominio de unidad
(Order/Fury/Chaos/Body/Calm/Mind) y la caza por leyenda, así que lo que queda abierto es residual:
un pendiente de fuentes y un hunt que no encontró nada nuevo.
