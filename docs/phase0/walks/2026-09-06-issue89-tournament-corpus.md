# Issue #89 — 8.307 listas de torneo: fuentes nuevas, 13 candidatas y la contradicción de 811.1.d.2

Caminata del 2026-09-06. Fuente: issue #89 (rc-mine3) y su comentario de corrección.
Texto de carta verbatim de `data/corpus_flat.txt`; cada número de regla abierto en
`data/Riftbound-Core-Rules-2026-07-16.txt`.

---

## 0. Qué se re-midió acá, y con qué

El issue reporta 8.307 listas leídas por un pipeline que vivía en `/tmp` y ya no existe. **Nada de
esta caminata se apoya en ese pipeline.** Lo que se hizo, con las herramientas del propio repo y con
las tres APIs abiertas a mano:

1. **Las 222 listas de Riot ya están en el repo** desde `0d75ff9` (#88), en
   `test/fixtures/tournament-lists/`. Se corrió sobre ellas el matcher del repo —
   `loadCardIndex` → `loadDeck` → `generateVariants` → `matchDeck` con
   `{format:"constructed", maxMissing:0, includeSideboard:false}` — y el resultado se leyó archivo
   por archivo. Es la verificación más fuerte disponible: mismo código que corre en producción,
   sobre listas que ya son fixtures versionadas.
2. **Piltover Archive** se abrió a mano con el header que el issue documenta
   (`Origin: https://piltoverarchive.com`). `api/external/v1/cards?limit=100&page=N` (13 páginas,
   1.238 impresiones, 941 cartas) da el mapa `cardId → variantNumber`, que es lo que le faltaba al
   issue para que un mazo de PA se pueda leer en códigos. Con ese mapa,
   `api/external/v1/decks/<uuid>` se imprime como decklist legible.
   **El parámetro de paginación es `page`, no `offset`**: con `offset` la API devuelve siempre la
   primera página y uno se queda con 86 cartas creyendo que las leyó todas.
3. **riftbound.gg** por `api.dotgg.gg/cgfw/gettournament` (metadata + standings) y
   `gettournament` → `standings[].slug` → `getdeck?slug=<slug>` (la lista). El campo del slug del
   mazo es `slug`, no `deck_slug`, y el objeto del standing **no** trae el mazo embebido. A 1 req/s
   no aparece el `error code: 1015`.

Las 17 URLs que el issue cita se abrieron una por una: **las 17 responden 200** (medido con
`curl -o /dev/null -w '%{http_code}'`, 2026-09-06).

### Postura legal, aplicada al pie

Las tres fuentes publican posición y nombre de jugador. Piltover Archive los mete en el **nombre**
del mazo (`【Regional Qualifier】Utrecht - Best of Lux (Sanan)`), riftbound.gg en la
`description` (`Place 4 on RiftBound - $1,000 Prize Pool`) y en `standings[].player_name`, y los
artículos de Riot imprimen `Legend Rank : #1/24` y `Overall Ranking : #28` arriba de cada lista.
**Ninguno de esos tres datos entra en una `Source` de este repo.** Cada `quote` dice el nombre del
evento, su fecha, y qué cartas de la entrada lleva la lista. Nada más. Lo que una lista prueba es
que la línea se registró en el evento X, no que ganó nada.

---

## 1. Las nueve fuentes de torneo

Cada fila se verificó carta por carta contra el `uses` de la entrada, leyendo la lista yo mismo.

### 1.1 El control del pipeline: la misma lista por tres caminos

La lista de Lux del RQ Utrecht se leyó **tres veces por rutas independientes** y las tres dan la
misma decklist carta por carta:

| Ruta | Qué se leyó |
|---|---|
| HTML del artículo de Riot | `curl` a `playriftbound.com/.../utrechts-top-decks/`, 318 KB, despojado de tags |
| Fixture del repo | `test/fixtures/tournament-lists/utrecht-27.txt` (#88) |
| API de Piltover Archive | `decks/4f6e842b-f481-4439-ab39-ca3cd8261a62` + el mapa `cardId → código` |

Las tres: `2 Forge of the Future` (OGN-212), `3 Ekko, Recurrent` (OGN-110), `3 Shadow's Call`
(UNL-165), `3 Sacrifice` (UNL-173), `2 Retreat` (OGN-104), `1 Lecturing Yordle` (OGN-087).
`lux-infinite-energy` pide 1/1/2/2 de los primeros cuatro y `lux-infinite-power` pide 1/1/1 de
OGN-212 / OGN-104 / OGN-087: **las dos entradas INFINITE están completas en la misma lista
registrada.**

### 1.2 Lo que dio el matcher del repo sobre las 222 listas de Riot

`maxMissing: 0`, `includeSideboard: false` — o sea, entradas COMPLETAS en el main deck + los tres
battlefields, sin contar sideboard:

```
lux-infinite-energy                  => utrecht-27
lux-infinite-power                   => utrecht-27
yasuo-windrider-ride-the-wind-chain  => atlanta-06, lille-22, sydney-07
gutter-palace                        => barcelona-20
brambleback-trinity-skyfall-conquer  => utrecht-07
flurry-of-feathers-grand-plaza-win   => sydney-12
renata-mastermind-points             => ninguna
grand-plaza-recruit-vanguard         => ninguna
ready-recruits-grand-plaza           => ninguna
TOTAL: 41 de las 186 entradas aparecen completas en alguna de las 222 listas de Riot.
```

`brambleback-trinity-skyfall-conquer` en `utrecht-07` es una fuente que **el issue no reporta**: lo
citaba sólo por riftbound.gg. La lista es de Lucian, Purifier y lleva `2 Red Brambleback` (UNL-029),
`3 Trinity Force` (SFD-115) y `3 Skyfall of Areion` (SFD-030) — la entrada pide 2/3/1.

### 1.3 Las tres que no salen de los artículos de Riot

- **`renata-mastermind-points`** — dos listas, leídas enteras:
  `RiftBound - $1,000 Prize Pool` (riftbound.gg, 2026-06-14) lleva `SFD-088A` ×1, `OGN-104` ×3,
  `SFD-180A` ×1 y `SFD-166` ×1, que son los cuatro `uses` (1/1/1/1). Y el
  `Regional Qualifier Hartford` de Piltover Archive (lista publicada el 2026-06-25) lleva SFD-088
  como Chosen Champion, `2 Retreat`, `1 Fiora, Worthy` y `1 Rally the Troops`. Esta segunda **el
  issue no la reporta**.
  Nota de datos: esa lista de riftbound.gg escribe sus runas `UNL-R03a` y `UNL-R06a`, que es
  exactamente el punto 1 de las contradicciones del issue — 12 de sus 40+ líneas no resuelven hoy.
- **`grand-plaza-recruit-vanguard`** — `City Challenge Shenzhen Station` (Piltover Archive, lista
  publicada el 2026-02-13): `1 The Grand Plaza` (OGN-293) entre los tres battlefields y
  `2 Recruit the Vanguard` (OGS-015). La entrada pide 1 y 2.
- **`ready-recruits-grand-plaza`** — `Season 2 Regional Open Fuzhou` (Piltover Archive, lista
  publicada el 2026-01-21): `SFD-171 Renata Glasc, Industrialist` como Chosen Champion y
  `1 The Grand Plaza`. La entrada pide 1 y 1.

### 1.4 Las dos de riftbound.gg, escaneadas evento entero

Se bajaron **todas** las listas publicadas de dos torneos y se corrió la comprobación de completitud
sobre cada una:

- `Weekly Riftbound CR - UNL` (2026-05-21, 8 listas con decklist) → 1 lista completa
  `brambleback-trinity-skyfall-conquer`.
- `Riftbound: Unleashed Win-A-Case @ Nexus` (2026-05-09, 8 listas con decklist) → 1 lista completa
  `flurry-of-feathers-grand-plaza-win`.

**Caveat que viaja con toda cita de riftbound.gg y que queda escrito en cada `quote`:** su API
entrega **un solo board**, sin separar sideboard, así que "la lista lleva estas cartas" ahí incluye
el sideboard. Para las listas de Riot y de Piltover Archive la separación existe y se respetó
(`includeSideboard: false`).

### 1.5 Fechas de las seis publicaciones de Riot

Leídas del `datePublished` de cada artículo: Lille 2026-04-22, Atlanta 2026-05-01, Sydney
2026-05-21, Vancouver 2026-06-04, Utrecht 2026-06-17, Barcelona 2026-08-26.
