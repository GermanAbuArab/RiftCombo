# Listas de torneo publicadas por Riot

222 listas de mazo, tal como Riot las publicó en los seis artículos **"\<City\>'s Top Decks"** de
`playriftbound.com`. Son el corpus contra el que `test/tournament-lists.test.ts` mide el parser:
hasta el 2026-09-06 ningún test usaba listas reales, y por eso #86 y #87 (306 de 3567 grafías de
códigos que el parser tiraba, incluida la de la propia galería de Riot) sobrevivieron meses.

## De dónde salen

Los seis artículos, leídos enteros el **2026-09-06** con `r.jina.ai`:

| Ciudad | URL | Publicado | Listas |
|---|---|---|---:|
| Lille | https://playriftbound.com/en-us/news/organizedplay/lilles-top-decks | 2026-04-22 | 31 |
| Atlanta | https://playriftbound.com/en-us/news/organizedplay/atlantas-top-decks | 2026-05-01 | 30 |
| Sydney | https://playriftbound.com/en-us/news/organizedplay/sydneys-top-decks | 2026-05-21 | 42 |
| Vancouver | https://playriftbound.com/en-us/news/organizedplay/vancouvers-top-decks | 2026-06-04 | 42 |
| Utrecht | https://playriftbound.com/en-us/news/organizedplay/utrechts-top-decks | 2026-06-17 | 40 |
| Barcelona | https://playriftbound.com/en-us/news/organizedplay/barcelonas-top-decks | 2026-08-26 | 37 |

`Publicado` es el `Published Time` que sirve la propia página. Los seis artículos traen 256
encabezados de mazo, pero el carrusel repite el bloque de varios jugadores al final de cada uno: los
nombres distintos son exactamente 222 (+ un encabezado de Barcelona, "On the Best-Of Nomenclature",
que no es un mazo), y ése es el número de archivos acá.

## Qué NO se guarda

La postura legal del proyecto no registra resultados: **no hay posiciones, ni récords, ni play rates
ni win rates**, ni acá ni en ningún otro lado del repo. Los artículos publican un `Legend Rank` y un
`Overall Ranking` por mazo y una tabla de `% of Field` por leyenda; nada de eso está en estos
archivos. **El nombre del jugador tampoco se guarda**: el archivo se llama por ciudad y número de
orden de aparición, no por quién registró la lista.

Lo que sí queda es la lista de cartas: un hecho público que Riot publicó. Lo que prueba una lista acá
es que una carta o una línea del catálogo se registró en el evento X, nada más.

## Qué se les hizo al copiarlas

Dos transformaciones mecánicas, ninguna sobre los nombres de carta ni sobre las cantidades:

1. **Los rótulos de sección van en su propia línea.** El HTML de Riot los emite como un elemento
   aparte, pero la conversión a markdown los pega al último renglón de carta
   (`3 Vanguard Armory**Battlefields**:`). Sin despegarlos, cada lista perdería una carta y una
   sección enteras, que es un artefacto del lector, no del parser.
2. **Se quitaron los asteriscos de negrita del rótulo** (`**Main Deck:**` → `Main Deck:`), que es lo
   que ve un jugador que copia de la página. Riot escribe el rótulo de las dos formas dentro de la
   misma serie —`**Main Deck:**` en Lille y Utrecht, `**Legend**:` en Atlanta y Utrecht— y
   `parseDeckText` lee las dos; el archivo guarda una sola.

Nada más se tocó: las erratas de transcripción de Riot se conservan tal cual (ver abajo), porque son
justamente lo que el test tiene que poder distinguir de un bug del parser.

## Las cuatro erratas de transcripción de Riot

Cuatro listas están mal transcritas en el artículo. No son bugs del parser y el test las nombra una
por una:

| Archivo | Qué dice Riot | Qué pasa |
|---|---|---|
| `utrecht-06.txt` | `1 Trapping Ground` | La carta se llama **Trapping Grounds** (`UNL-217`), en plural. La lista queda con 2 battlefields. |
| `utrecht-19.txt` | `1 Trapping Ground` | Igual que la anterior. |
| `sydney-07.txt` | `x2 Adaptatron` | La `x` va adelante del número; el resto del artículo escribe `2 Adaptatron`. Está en el sideboard. |
| `sydney-30.txt` | `x` | La sección `Battlefields:` es literalmente una `x`: los tres battlefields no se publicaron. |

Y una quinta lista, `vancouver-06.txt`, parsea limpia pero está mal publicada: su **`Rune Pool:`
repite los tres battlefields** en lugar de las 12 runas. Por eso es la única que `checkBuild` declara
ilegal por sí misma (0 runas contra las 12 de 103.3.a.1, y dos battlefields del mismo nombre contra
103.4.c).

## Los mazos con cartas hoy baneadas

89 listas usan `Aspirant's Climb` o `The Arena's Greatest`, y `checkBuild(deck, cards,
"constructed")` las marca ilegales con la fila `103.2.e`. **No es un error del test ni del dato**:
las dos se banearon el **2026-07-24**
(`https://playriftbound.com/en-us/news/announcements/july-ban-list-updates/`, la fecha que registra
`data/legality.src.json`) y los cinco eventos que las traen —Lille, Atlanta, Sydney, Vancouver,
Utrecht— se jugaron antes. Barcelona, el único artículo posterior al baneo, no tiene **ninguna** de
esas filas. El test afirma las dos cosas: que las 89 vienen sólo de esos cinco eventos y que
Barcelona da 0.

## Cómo se regeneran

`/tmp` no es durable, así que el extractor no vive en el repo: son ~40 líneas que parten cada
artículo por sus encabezados `###`, aplican las dos transformaciones de arriba, tiran las líneas de
`Legend Rank` / `Overall Ranking` y deduplican por texto. Si hay que rehacerlo, la fuente es la tabla
de URLs de arriba leída con `r.jina.ai`, y el criterio de corte de cada bloque es el primer
`![Image`, `## `, `SHOW MORE` o item de lista numerada que aparezca después.
