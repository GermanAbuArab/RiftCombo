# RiftCombo

Pegá una lista de Riftbound — texto, deck code o link público de Piltover Archive — y ves qué combos
conocidos ya contiene, cuáles le faltan por una o dos cartas, y qué cartas están baneadas o
restringidas en el formato que elijas, dibujado como un mapa de piezas, combos y remates.

**Live:** https://riftcombo.app · **Estado del proyecto:** [`docs/status.md`](docs/status.md)

Riftbound no tiene una base pública de combos. Este repositorio es una: cada entrada de
`data/combos.json` está escrita a mano contra el texto de carta de Riot y las Core Rules, con sus
fuentes adjuntas. Las **156 entradas de hoy son `verified`**: alguien caminó el loop paso a paso y
dejó el documento de la caminata en [`docs/phase0/walks/`](docs/phase0/walks/README.md).

## Qué hace

- Empareja por código de carta (`OGN-212`), nunca por nombre, así que una reimpresión o una errata
  nunca parte un combo en dos.
- Compone combos en un grafo de dependencias: una línea que necesita Energía infinita se muestra
  junto al loop que la produce.
- Muestra los casi-aciertos: combos a una, dos o tres cartas, con las piezas que faltan marcadas.
- Reporta legalidad por formato desde el Rules Hub de Riot, y aplica la errata publicada como un
  overlay fechado.
- **My decks**: biblioteca de mazos, editor con validación de construcción, importación desde
  Piltover Archive y exportación a deck code.
- Empareja entero en el navegador. Una lista se guarda sólo si iniciás sesión y apretás Save, y
  entonces se guarda el texto que pegaste — así una lista vieja se vuelve a emparejar contra el
  catálogo de hoy en vez de quedar como un resultado rancio.

## Verificar

Los tres, antes de decir que algo anda:

```
npm test && npm run typecheck && npm run build:web
```

## Correrlo

```
npm install
npm run build:data   # baja la galería de Riot -> data/cards.json, aplica errata, resuelve legalidad
```

`npm run dev` está roto (el Development Command del proyecto de Vercel es `npm run dev`, así que
`vercel dev` lo rechaza como invocación recursiva). Para mirar la UI: `cd public && python3 -m
http.server 8788`, que alcanza para todo menos la ruta `/api/deck-url`.

**El deploy es un push a master**: Vercel está conectado al repo y construye desde el árbol
committeado. `public/` es artefacto de build de `web/` — no se edita a mano.

## Cuentas

Todo el sitio está detrás del login con Google. Dos valores públicos lo configuran, desde
`.env.local` localmente y desde las variables de entorno de Vercel en producción:

```
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_ANON_KEY=<la anon key del proyecto>
```

Las dos son públicas por diseño: la anon key viaja en cada bundle del navegador, y lo que mantiene
las filas de un jugador lejos de otro es row-level security en la base. `scripts/build-web.mjs` las
hornea en el bundle, y `npm run headers` regenera `vercel.json` para que el mismo origen aparezca
literal en `connect-src` — corrélo después de cambiar `SUPABASE_URL` y committeá el resultado,
porque Vercel lee `vercel.json` antes de correr el build.

El sign-in es una redirección de página completa, no un popup: el sitio manda
`Cross-Origin-Opener-Policy: same-origin`, bajo la cual un popup queda cortado de la página que lo
abrió y el flujo nunca vuelve, sin nada en la consola que lo diga.

```
supabase db push                    # aplica supabase/migrations/ al proyecto linkeado
npm run check:rls                   # dos usuarios reales; ninguno puede tocar las filas del otro
```

`npm run check:rls` necesita además `SUPABASE_SERVICE_ROLE_KEY`, que es una clave de servidor:
saltea RLS, la lee ese script y nada más, y no aparece en `web/` ni en un commit.

## Datos

| archivo | qué | fuente |
|---|---|---|
| `data/cards.json` | cada printing, con el texto de reglas y el `effect` de Equipment que la mayoría de los mirrors pierde | API de galería de Riot, vía `scripts/build-cards.mjs` |
| `data/errata.json` | overlay fechado de find/replace; el build **falla** si un find-string deja de matchear | anuncios de errata de Riot |
| `data/legality.src.json` | lista de bans por formato | Rules Hub de Riot, transcrita a mano |
| `data/combos.json` | el catálogo, autorado | ver las `sources` de cada entrada |
| `data/synergies.json` | 50 reglas de patrón: regla verificada a mano, instancias por texto | ver `basis` de cada regla |
| `docs/status.md` | **el estado del proyecto** | medido |
| `docs/phase0/walks/` | las 41 caminatas a mano, con su índice | — |

## Aportar un combo

Abrí un issue con las cartas (códigos, no sólo nombres), el texto exacto que importa, el estado de
juego que necesita, los pasos numerados con la aritmética por iteración, los números de regla en los
que se apoya y dónde lo encontraste. Todo lo que llegue a 8 puntos, loopee sin cota, gane por
condición alternativa o produzca valor repetible entra acá. "Se siente fuerte" no.

## Legal

El descargo va literal, sin parafrasear (`docs/plan.md` §1):

> RiftCombo was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot
> Games. Riot Games does not endorse or sponsor this project.

Sin publicidad, sin donaciones, sin datos de play-rate ni win-rate. RiftCombo describe combos; nunca
los juega por vos.
