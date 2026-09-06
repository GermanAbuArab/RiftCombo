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

---

## 2. Las trece candidatas

Soporte estadístico no es evidencia de combo. Cada una se caminó con el texto verbatim de
`data/corpus_flat.txt`, con cada regla abierta en el reglamento, y con la aritmética hecha sobre las
cantidades que la propia entrada declara. Una candidata con 258 listas detrás que no cierra se
refuta igual que una con dos.

### 2.0 Bloque de reglas — abiertas una por una antes de escribir nada

La auditoría de citas de este proyecto encontró **tres entradas que citaban una regla que decía lo
contrario** de lo que afirmaban. Estas son las quince que sostienen las trece candidatas, copiadas
del reglamento:

| Regla | Texto |
|---|---|
| **429.2** | "Triggered and activated abilities that Add resources resolve as soon as they are finalized." |
| **429.2.a** | "Priority and Focus will not pass from Add abilities being finalized or resolving, and will resolve before any other outstanding items on the chain are finalized." |
| **424.1.a.1** | "Other cards, including the card being revealed, can reference the act of being Revealed." |
| **805.1.a** | "Accelerate is functionally short for 'As you play me, you may pay [1][C] as an additional cost. If you do, I enter ready.'" — y **805.1.a.1**: la parte de Power se paga sólo con un Power de uno de los dominios **de la unidad**. |
| **356.6** | "Energy and Power costs can't be reduced below 0." |
| **702.3** | "There can only be one Buff on a Unit at a time." |
| **808.1.d.1** | "If the Permanent with the effect is not sent to the Trash, for example because its 'killed' event was replaced with a recall, the triggered ability will be removed from the chain." |
| **422.1.a** | "The player who is performing the action chooses which cards to send to their Trash, and may use Private Information to do so." |
| **422.1.b** | "'When I am discarded' abilities or other Triggered Abilities that trigger on discarding are executed after discarding has occurred." |
| **709** | "A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5 or greater." + el ejemplo: "A Unit with Might 5 that gets +1 [M] does **not** become Mighty, because it was already Mighty." |
| **710** | "Units on the board are evaluated according to their current Might." |
| **423.1.b** | "A Stunned Unit does not contribute its might to damage in the combat damage step." |
| **423.1.c** | "A Stunned Unit must still have damage applied to it equal to, or greater than, its full might value to be killed." |
| **355.5** / **355.5.a** | "If a card requires you to specifically choose one or more Game Objects, that choice is made now." — y su ejemplo: "'Stun a unit at a battlefield' **is** a Choice." |
| **818.1** / **818.1.c.2** | "Equip is an Activated Ability keyword… functionally short for '[Cost]: Attach this gear to a unit you control.'" |
| **415.3.a** | "A player Readies all non-spell Game Objects they Control **during the Awakening Phase** on their turn." |
| **323.9** | "Mark a Combat as Staged at each Battlefield that Contested was applied to that have Units present controlled by **opposing** players." |
| **348.2.a.1** | "This results in a Conquer if that player has not yet scored that Battlefield this turn." |
| **466.5.d** | "Establishing Control results in a Conquer if that player has not yet scored this Battlefield this turn." |
| **810.1.c.3** | "It does not give additional abilities or activations of Movement, only new options for the Standard Move." |

**Chequeo de bans**: las 51 cartas de las trece candidatas se grepearon contra el marcador `[BANNED`
de `data/corpus_flat.txt`. **Ninguna está baneada ni restringida.** (Las doce líneas con el marcador
en el corpus son otras cartas; entre ellas `OGN-276 Aspirant's Climb` y `OGN-284 Obelisk of Power`,
que sí aparecen en varias de las listas de torneo citadas en la sección 1 — esas listas son de
eventos anteriores a la ban list actual, y eso no toca lo que una `Source` afirma.)

**Dos errores de datos del issue, corregidos acá:**

1. El issue escribe **`SFD-246 Blade Dancer`**. Blade Dancer es **`SFD-195`**.
2. El issue dice que **"415.3.a da un readying gratis por turno a Blade Dancer"**. 415.3.a no dice
   eso: es la regla que readea todos tus Game Objects que no son spells **en la Awakening Phase**.
   Lo que limita a Blade Dancer es su propio exhaust dentro del costo, más el readying del Awaken y
   su segunda mitad ("When you conquer, you may pay [E1] to ready me"). El techo que sale es el
   mismo, la razón no.

### 2.1 Veredictos, uno por uno

**Doce de las trece entran como `verified`. La decimotercera se refuta.** Ninguna cambió de clase
respecto de lo que la candidata declaraba: las trece se presentaron como motores y las doce que
entran son ENGINE. Ninguna llega a 8 y ninguna dice que ganás, así que ninguna se forzó a BURST,
CHAIN ni ALT_WIN.

| # | Entrada nueva | Listas | Veredicto |
|---|---|---:|---|
| 1 | `void-rush-undertitan-accelerate` | 51 | verified |
| 2 | `the-boss-showstopper-redeploy` | 258 | verified |
| 3 | `blade-dancer-irelia-defiant-dance` | 184 | verified |
| 4 | `flame-chompers-discard-recursion` | 130-156 | verified |
| 5 | `sky-splitter-volibear-free-removal` | 84-93 | verified |
| 6 | `grand-duelist-fiora-mighty-crossings` | 67 / 45 | verified |
| 7 | `leona-zealot-stun-might-collapse` | 64 | verified |
| 8 | `last-rites-lunar-boon-trash-recursion` | 61 | verified |
| 9 | `shurelya-requiem-ready-and-ganking` | 35 | verified |
| 10 | `vex-star-crossed-rebound-stun` | 84 | verified |
| 11 | `ahri-foxfire-might-threshold` | 104 | verified |
| 12 | `kayn-back-alley-bar-double-move` | 91 | verified |
| 13 | Seal of Discord + Battering Ram | 88 | **refutada** |

Lo que cada caminata le agregó o le corrigió a la candidata:

1. **Void Rush.** Las DOS preguntas que la candidata dejó abiertas se contestan, las dos a favor.
   El `[Add] [E2]` llega **antes** de pagar el costo reducido, porque **429.2** dice que una
   habilidad que Add "resuelve apenas se finaliza" y **429.2.a** que lo hace "antes de que
   cualquier otro item pendiente de la chain se finalice". Y la zona banish no es una mano, así que
   Rek'Sai Breacher sí le da `[Accelerate]`. **Precio corregido**: la candidata publicó "~4 Energía"
   contando la reducción y el Add y olvidando los dos costos de Power y el propio Accelerate;
   **805.1.a** lo tasa en E1 + 1 Power **del dominio de la unidad** (Order), y el total honesto es
   **5 Energía y 3 Power**. Void Hatchling filtra **una** carta de las dos, no las dos.
2. **The Boss (258 listas).** La tensión que la candidata planteó —"el mismo recurso paga las dos
   mitades"— la resuelve **702.3**: *"There can only be one Buff on a Unit at a time."* La munición
   no es una pila de buffs sino el **número de cuerpos buffeados**, así que cada salvada le cuesta a
   Sett, Kingpin exactamente 1 de Might, y Cithria of Cloudfield se planta en 2 de Might en vez de
   crecer. **808.1.d.1** y **455** muerden las dos y quedan declaradas, con una diferencia que
   importa frente a `soraka-fiora-loop-shield`: The Boss dice "you **may** pay", así que el
   Deathknell borrado es una decisión y no un impuesto. Y lo que la hace repetible no es una
   cláusula "once per turn" sino "When you conquer, ready me". Arena Bar es el re-armado gratis que
   la candidata listó sin conectar con el "exhaust it" del escudo.
3. **Blade Dancer + Irelia.** Verifica: 4 base + 2 (Defiant Dance) + 1 (el choose) + 1 (el ready) =
   **8 de Might y lista**, por 1 Energía y 2 Power. **355.5** y su ejemplo hacen que el "choose" sea
   real y **355.7** lo hace Target. Dos correcciones al issue: el código de Blade Dancer es
   **SFD-195**, no SFD-246; y **415.3.a no le da un readying gratis por turno** — es la regla de la
   Awakening Phase. Lo que la limita es el exhaust dentro de su propio costo.
4. **Flame Chompers.** **422.1.b** sostiene la línea, verbatim. Lo que la caminata agrega es el
   precio y el techo. El precio: Flame Chompers **no** imprime *"(You still pay its costs.)"* donde
   `SFD-150 Last Rites` sí lo hace — el contraste dentro del propio pool es la evidencia de que
   1 Fury Power es todo el costo de un cuerpo de E3. El techo: el disparo sólo sale de un
   **descarte**, que 422.1 define como mano → trash, y nada en la línea devuelve un Chompers del
   trash a la mano, así que las 3 copias de 103.2.b son un tope duro.
5. **Sky Splitter.** **356.6** frena la reducción en 0 y **no dice nada del Power**, así que el
   1 Power se paga en cada copia. Y la reducción es un cálculo de costo leído al jugar el hechizo,
   así que el "0 Energía" está condicionado a que el cuerpo de 9 siga vivo: la entrada lo dice en
   vez de asumirlo. La pregunta de la candidata sobre Stormbringer se contesta: el barrido y el
   movimiento son **una sola resolución**, así que nunca hay unidades de dos jugadores opuestos y
   **323.9** no stagea ningún Combat — por eso esa mitad pertenece a una entrada de Conquer y no a
   ésta. Y la tasa se mide contra el **piso gratis de 2 Power por turno**, no contra cero.
6. **Grand Duelist + Fiora.** *"becomes [Mighty]"* son **exactamente dos cartas** en el pool
   (`grep -i` sobre todo `corpus_flat.txt`: SFD-180 y SFD-205), como decía la candidata — verificado
   antes de escribirlo, por la regla de este proyecto sobre afirmaciones de unicidad. Lo que la
   candidata no vio es que **no son simétricas**: el costo de Fiora *no lleva exhaust*, así que
   cobra en **cada** cruce del turno y sólo la limita el Order Power, mientras el Duelist cobra una
   vez y espera al Awaken (o a un Conquer en Hall of Legends, que 485.4.a hace 1 de 3).
7. **Leona, Zealot.** La corrección a #61 es **más filosa que la del issue**. #61 anotó que *"lo que
   quita Might es 423.1.b"*, y 423.1.b no quita ningún Might: quita la **contribución** del stuneado
   al daño de combate. La regla sobre la que se para esta entrada es **423.1.c** — *"A Stunned Unit
   must still have damage applied to it equal to, or greater than, its **full might value** to be
   killed"* — leída junto con **710** (*"Units on the board are evaluated according to their current
   Might"*). Eso es lo que el -8 impreso de Zealot cambia: el umbral de muerte pasa a ser 1. Todo lo
   demás que concluyó #61 sigue en pie (423.1.a.1 y 423.1.a.2 encierran cualquier línea de stun en
   un turno).
8. **Last Rites.** La candidata citaba **823.1.b** junto a 383.4.c.1 / 383.4.d.1, y 823.1.b es la
   regla de **[Hunt]**: dice lo correcto sobre la carta equivocada. La entrada se para sólo en las
   dos reglas de redacción. Y el costo de `[Equip]` se chequea contra **185 / 186.1 / 416.1 /
   416.3**: *"Recycle 2 cards from your trash"* es impagable con tokens e impagable del todo con
   menos de dos cartas ahí, que es la compuerta que la candidata no tasó.
9. **Shurelya's Requiem.** **818.1** contesta lo que la candidata sospechaba: *"Equip is an
   Activated Ability keyword"*, y **818.1.c.2** lo hace *"[Cost]: Attach this gear to a unit you
   control"* — adjuntar nunca es jugar, así que ningún re-equip de `[Weaponmaster]` vuelve a
   disparar *"When you play this"*. También cierra el seguimiento de Jayce: **juega un gear desde la
   MANO**, y con `[Unique]` y la carta ya en el board, descuenta la primera copia y no la loopea.
   `grep -i "ready your units"` da exactamente dos cartas, SFD-192 y SFD-204.
10. **Vex + Star-Crossed.** La candidata afirmaba que 423.1.a.1 "no molesta porque el cuerpo vuelve
    a entrar nuevo" sin nombrar la regla que lo dice. Está en la primera oración de **423.1**:
    *"Stunning is the act of selecting one or more Units **on the Board**"*, así que una carta en la
    mano no lleva el estado — la misma forma que **705** para los buffs. Y el disparo de Vex se lee
    hasta el final: la cláusula *"at a battlefield"* es sobre **Vex**, no sobre la unidad jugada.
11. **Ahri + Fox-Fire.** La mecánica es real y ninguna lente la barrió: bajar Might para bajar el
    **umbral** de un barrido tasado por **suma**. Lo que la caminata agrega es el techo: los dos
    reductores imprimen *"to a minimum of 1 [M]"*, así que la suma nunca cae por debajo del número
    de unidades y **cuatro cuerpos a 1 de Might dan exactamente 4** — el barrido más grande que la
    línea puede hacer. Y el `[Hidden]`: **811.1.d.2** NO le da la excepción a Fox-Fire, porque la
    carta no nombra otra location, así que escondida barre el battlefield donde está; 811.3 es la
    salida, a precio completo.
12. **Kayn + Back-Alley Bar.** La candidata lo llamó "un payoff explícito del segundo movimiento"
    sin ver que el propio `[Ganking]` de Kayn **no puede ser** ese segundo movimiento
    (**810.1.c.3**), así que la entrada es Kayn más un mover y el mover es lo que cuesta. Y el Bar
    paga sobre *"moves **from** here"*, o sea **una** vez, no dos.

### 2.2 La refutada: Seal of Discord + Battering Ram (88 listas)

```
OGN-204 | Seal of Discord | Gear | Chaos | E0 P1 | [exhaust]: [Reaction] — [Add] [R Chaos].
SFD-012 | Battering Ram  | Unit | Fury  | E5 M5 | I cost [E1] less for each card you've played
                                                  this turn, to a minimum of [E1].
```

La candidata propone *"cartas jugadas este turno"* como una mecánica sin lente. **Medido:
`grep -in "played this turn"` sobre todo `data/corpus_flat.txt` devuelve DOS renglones, y uno de
ellos es otra cosa** — `SFD-166 Rally the Troops` dice *"When a friendly unit **is** played this
turn, buff it"*, que es un disparo, no un contador. El contador existe en **una sola carta del pool**,
SFD-012. Una lente de una carta no es una lente.

Y la mitad que sí es un motor **ya está catalogada**: `seal-power-faucet-bootstrap` corre los Sellos
(con `OGN-120 Seal of Insight`; los seis son la misma carta en seis dominios) y ya midió lo que
compran, incluido el piso gratis de 2 Power por turno contra el que hay que medirlos.

Lo que queda al restar esas dos cosas es un descuento: **103.2.b** topea Seal of Discord en 3, así
que el Ram baja de E5 a E2 como máximo y **356.6** ni siquiera hace falta porque la propia carta
imprime su piso (*"to a minimum of [E1]"*). Un 5/5 por E2 es un buen precio; no es un mecanismo que
el catálogo no tenga. **Refutada como entrada nueva**, sin que nada de la candidata sea falso.

---

## 3. Cobertura — dato, no veredicto

El issue reporta que **72 de 180 entradas aparecen completas en alguna de las 8.307 listas y 108 no
aparecen en ninguna**. Sobre el subcorpus que este repo puede volver a correr solo — las 222 listas
de Riot, con el matcher del repo — el número es **41 de 186**.

**Eso no refuta nada y no se tocó ninguna entrada por eso.** El catálogo no publica play rates ni
win rates (postura legal), y una línea correcta que nadie juega sigue siendo correcta: lo que una
lista registrada prueba es que alguien la llevó a un evento, y lo que su ausencia prueba es que
nadie la llevó a **estos** eventos. Los tres corpus están además dominados por un metajuego
regional (el Season 1 National Open solo son 1.992 de las 8.307 listas) y por un momento del
formato: varias de las listas citadas llevan `OGN-276 Aspirant's Climb` y `OGN-284 Obelisk of
Power`, que hoy están baneadas en constructed.

Queda anotado como medición y nada más.

---

## 4. Tarea extra: la contradicción de 811.1.d.2 — **la decide el reglamento, y por nombre**

Tres entradas del catálogo leían la misma cláusula de tres maneras:

- `tideturner-mega-mech-swap` **tomaba** la excepción para `OGN-199 Tideturner`.
- `lillia-smoke-mirrors-sprite-relay` la **rechazaba** para `UNL-083 Smoke and Mirrors` y cobraba
  costo base citando 811.1.d.
- `hwei-move-draw-ready-runes` la leía como aplicable a **los dos** targets de Smoke and Mirrors,
  y aun así cobraba costo base "por consistencia con la entrada más vieja".

**No hace falta una R33.** 811.1.d.2 y 811.1.d.2.a traen **dos ejemplos trabajados que nombran a
estas dos cartas**:

> **811.1.d.2.** If a hidden spell or a play effect of a hidden permanent chooses any targets, those
> targets must be chosen from among options at that battlefield, unless the ability explicitly
> restricts targeting in a way that makes this impossible.
>
> *Example: Blastcone Fae is a unit with Hidden and "When you play me, give a unit -2 [M] this turn,
> to a minimum of 1 [M]." Because this is a play effect, its target must be chosen from among units
> at the same battlefield if Blastcone Fae was played from Hidden.*
>
> *Example: **Tideturner** is a unit with Hidden and "When you play me, you may choose a unit you
> control at another location. Move me to its location and it to my original location." Because its
> play effect has a targeting restriction that can never be fulfilled by a unit at its battlefield,
> its target may be chosen freely from among the available options.*
>
> **811.1.d.2.a.** Each target is treated separately and individually when processing this rule.
>
> *Example: **Smoke and Mirrors** is a spell that reads in part "Choose a unit you control and
> another unit you control at a different location." If Smoke and Mirrors is played from hidden, the
> first unit chosen can be chosen at the battlefield Smoke and Mirrors was played from, so it must
> be. The second unit chosen explicitly restricts targeting in a way that makes this impossible, so
> it can be chosen from any location.*

**La excepción es POR TARGET, no por carta** (811.1.d.2.a). De ahí:

- **Tideturner tenía razón.** Su único target dice "at another location", y el reglamento lo trabaja
  por nombre: se elige libremente. La entrada no cambia de fondo; se le reemplazó la paráfrasis por
  el ejemplo que la nombra, que es evidencia mucho más fuerte.
- **Lillia estaba equivocada.** Su notable decía que el hechizo "está DEFINIDO por elegir dos
  unidades en locations DISTINTAS, así que una de sus dos elecciones está necesariamente fuera de
  ese battlefield" — y el ejemplo dice lo contrario: la **primera** elección *puede* hacerse en el
  battlefield donde se escondió, **así que debe** hacerse ahí; la **segunda** es libre. Una copia
  escondida es legal, y en este relevo la condición se cumple en cada paso porque uno de los dos
  socios del swap siempre está parado ahí.
- **Hwei leía la excepción demasiado ancha** (los dos targets) y difería a la entrada más vieja en
  vez de a la regla.

**Las tres dicen ahora la misma regla, con los dos ejemplos citados. No cambió ninguna clase ni
ninguna cantidad, y ninguna cifra declarada se movió**: el precio de costo base se mantiene en las
dos entradas de Smoke and Mirrors, pero ahora por las razones correctas y verdaderas — **811.1.b**
sólo permite jugar la copia escondida *"beginning on the next turn"*, permite **un facedown por
battlefield que controlás** (*"that doesn't already have a facedown card hidden there"*), **485.4**
pone sólo dos battlefields en la mesa de un Duel, y **323.7** manda al trash la carta escondida si
perdés ese battlefield. La cifra con descuento queda escrita al lado: el relevo de Lillia con una
copia escondida un turno antes es **8 Energía + 2 Power** en vez de 10 Energía + 1 Power.
