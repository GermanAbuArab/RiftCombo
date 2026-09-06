# Hand walk — los dos tableros del issue #45

Fecha: 2026-09-06. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt` (935 cartas, gallery API 2026-09-04, errata aplicada).
Sesión: `rc-walk45`.

**Resultado: 1 entrada nueva verified (`ivern-arena-sentinel-hold`), 1 entrada reescrita
(`svellsongur-copy-hold`: 11 → 17 puntos al mismo precio), 0 refutadas.** Ninguna resultó INFINITE:
las dos son BURST y se quedan BURST — llegan a 8 en un solo evento de scoring con las cantidades que
declaran, y ninguna repite.

El hallazgo que no estaba en el issue: **la aritmética de dos Svellsongur sobre la misma unidad estaba
publicada de dos maneras contradictorias dentro del catálogo**, y la lectura continua de R6 = A abría
una recursión que nadie había resuelto. La resuelve el reglamento, no una lectura nueva: bloque 0.4.

---

## Bloque 0 — cada regla que estas dos entradas citan, abierta y pegada

Se hizo primero y en bloque, antes de tocar ninguna entrada. Ninguna cita heredada se dio por buena.
**Ninguna salió mal esta vez**; las tres que el issue nombraba de memoria (190.6.a–d, 383.4.d.2,
136.2.c/718.3/434.1.c) dicen literalmente lo que se les atribuía.

### 0.1 — Control de un battlefield y de sus habilidades

- **190.1** (línea 1401) — *"Control is established over Battlefields through the course of play."*
- **190.6.a** (1447) — *"While a Battlefield is Controlled, its Controller controls its Abilities unless
  that ability indicates another player does. The controlling player takes responsibility for adding
  them to the Chain if applicable, and makes all choices required by them unless otherwise specified."*
- **190.6.c** (1461) — *"If an Ability of a Battlefield indicates that a specific player makes a choice,
  that player is the Ability's controller. … They and only they control the ability, regardless of who
  controls the Battlefield."* Reckoner's Arena no nombra a otro jugador, así que 190.6.c no la desvía.
- **190.6.d** (1471) — *"'You' in a battlefield's abilities refers to the battlefield's Controller, as
  does the implied 'you' in instructions that don't specify a player like 'draw 1.' **If the battlefield
  has no Controller, 'you' refers to no one, and all such instructions are ignored.**"* La segunda
  oración es el costo real del tablero 1: la Arena que traés arranca Uncontrolled (190.1) y su texto
  está apagado hasta que la tomás.

Los cuatro referentes de **R8 = A** ("el hold trigger propio de un battlefield es uno de *your hold
effects*") están abiertos y dicen lo que R8 dice. R8 fue ruleado A el 2026-09-04.

### 0.2 — Hold Effects, Conquer Effects y la activación de la Arena

- **383.4.d** (3488) — *"Hold Effects are Triggered Abilities whose Condition includes a Unit being
  present at a Battlefield during the Beginning phase when a player scores Victory Points from Holding."*
- **383.4.d.2.a** (3497) — *"The Hold Abilities of Units are put on the Chain as Pending Items after the
  Unit these effects correspond to are **present** at a Battlefield when a player maintains control of it
  and Gains 1 Victory Point during their Beginning Phase from Holding."* Presencia es toda la condición:
  ni readiness ni haber entrado ready aparecen.
- **383.4.d.2.b** (3502) — *"The Hold Abilities of **anything that references the player Holding** is put
  on the Chain as a Pending Item when the Condition that the player that controls the triggering source
  has performed a Hold and gained 1 Victory Point."* Este es el que mete el trigger de la Arena.
- **383.4.c** (3468) — *"Conquer Effects are Triggered Abilities whose Condition includes a Unit
  participating in, and successfully Conquering a Battlefield."* con **383.4.c.1**: *"These are commonly
  structured as 'When I conquer…' and 'When you conquer…'"*
- **383.4.g.1** (3549) — *"To do so, that player checks the condition of all of the specified effects, as
  if they had fulfilled the named part of the condition."* Y su ejemplo, que nombra la carta:
  > *"Example: **Reckoner's Arena** reads 'When you hold here, activate the conquer effects of units
  > here.' For each unit at the battlefield, you will check the trigger condition of their conquer
  > effects to see if the condition has been fulfilled, treating the conquer portion of the condition as
  > having been fulfilled. If all of the conditions are fulfilled for a conquer effect, it is placed on
  > the chain **as if it had just triggered**. If any of the non-conquer parts of the condition are not
  > fulfilled, it will not be placed on the chain."*
- **823.1.b** (7114) — *"Hunt is both a Conquer and a Hold effect."* con **823.1.c.1** (7118): *"Hunt is
  functionally short for: 'When I Conquer or Hold, my controller gains X XP.'"* → **Riot establece por
  escrito que la forma "When I conquer or hold" pertenece a las dos categorías a la vez.** Ivern está
  escrito con esa forma exacta. No hace falta ninguna lectura para que cuente doble.

Chequeo de la única regla del reglamento que limita un disparo a uno solo, para descartarla:
**383.1.b** (3312) — *"If an ability triggers 'the [Nth] time' something happens and that trigger
condition is met multiple times simultaneously … The ability triggers only once."* Es específica de
"the [Nth] time". Ivern no usa esa forma. **No aplica.** Tampoco 383.4.e.2.a / 383.4.f.2.a, que son
"once per combat" para attack y defend triggers, y aquí no hay combate.

### 0.3 — Score, cap y puntos por habilidad

- **469.2** (5354) — *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn
  during their Beginning Phase."*
- **470** (5357) — *"A player may only Score, from either method, once per Battlefield per turn."*
- **194.1.c** (1532) — *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain
  one or more points."* — la lista de fuentes de puntos que no son un Score. Base de **R2 = A**.
- **471.1.a.1** (5365) — *"Notably, points Gained from sources that are not Conquer are not beholden to
  these restrictions."* → el Final Point no tapa nada de esto.
- **471.2.c** (5381) — *"These will only trigger when the Battlefield is Scored; I.E. These cannot be
  triggered more than once per turn for a player."* → base de **R1 = A con stacking**: topea cuántas
  veces dispara el battlefield, no cuántas instancias produce un disparo.
- **002** (10) — *"Card text supersedes rules text."*

### 0.4 — Texto copiado, texto apendeado, y la recursión que no existe

Este bloque no estaba pedido por el issue. Salió al enumerar los repartos de Svellsongur.

- **SFD-059 Svellsongur**, verbatim (línea 387 del corpus): *"[Equip] 1 Energy + 1 Calm (1 Energy +
  1 Calm: Attach this to a unit you control.) **As this is attached to a unit, copy that unit's text to
  this Equipment's effect text for as long as this is attached to it.**"*
- **718.2** — *"While in this state, the card's **printed** Rules Text is Inactive."*
- **725.1** — *"If an Attached card has a Passive or Replacement ability that applies during the process
  of Attaching … that text exists and can be processed as it Attaches."* (= **R5**, ya ruleada)
- **136.2.c** — *"The abilities in the Effect Text section of a card are appended to the Rules Text of the
  card to which the card with the Effect Text is Attached."*
- **718.3** — *"While in this state, Abilities in the card's Effect Text are appended to the Rules Text of
  the Top-Most Card."*
- **434.1.c** (4576) — *"The Top-Most card has **all** Effect Text of **all** cards Attached to it appended
  to its Rules Text."* → el "texto de la unidad" que un Svellsongur copia incluye el effect text de los
  otros Equipment ya attacheados. Es el hallazgo de #41, y aquí queda pegado literal.
- **136.2.d** — *"Effect Text may refer to 'this' or to the name of the Attached game object … Doing so
  refers to the Attached game object and not the Top-Most Card."* Con los ejemplos del propio reglamento
  (Guardian Angel, Brutalizer). → el "I" del texto copiado es **Ahri**, no el gear, así que dispara como
  Hold Ability de una **unidad** bajo 383.4.d.2.a.

**R6 = A** dice que la copia sigue el texto **actual** de la unidad, no una foto del impreso. Leída sin
más, con dos Svellsongur en la misma unidad cada uno copiaría un texto que ya contiene al otro, y el
conteo no cerraría. **El reglamento cierra el bucle, y por eso esto no es una lectura nueva:**

- **477.2.c** (5489) — *"Abilities of Effect Text of Attached cards are appended **in this layer**."* La
  layer es la 2, **477.2 Ability-Altering Effects**, cuya lista (477.2.a) incluye literalmente
  *"Appending rules text"*.
- **476.1** (5399) — *"Layers are applied in sequence. Each effect in them is applied as soon as able,
  and **only a single time across all sequences**."* → **cada Svellsongur copia una sola vez. No hay
  recursión.**
- **478** (5537) — *"If more than one effect applies to the same Game Object in the Same Layer, or to each
  other in the same layer, then both effects will apply but their order may be determined by Dependency."*
- **479.1** — *"If **both** effects are altered by the application of the other, no Dependency can be
  established."* → es exactamente el caso: aplicar B primero cambia lo que copia C, y aplicar C primero
  cambia lo que copia B. **Sin dependencia.**
- **480** (5578) y **480.3** (5594) — *"If more than one effect applies in the same layer but no dependency
  is established, then **Timestamp order** is applied"* … *"Effects are applied such that the earliest
  Timestamp within each Layer and Sublayer applies first."*

**Conclusión, que es aritmética y no interpretación:** los Svellsongur sobre una misma unidad se aplican
en el orden en que se attachearon. El primero copia el texto que hay (1 instancia), el segundo copia el
texto ya aumentado (2), el tercero el aumentado dos veces (4). El conteo de instancias de una unidad con
`v` Svellsongur encima es **2^v**, no `1 + v`.

| Svellsongur sobre una misma unidad | instancias del trigger en esa unidad |
|---|---|
| 0 | 1 (la impresa) |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |

Esto **confirma** la cuenta que `svellsongur-copy-hold` ya usaba para el Sentinel (K = 4 con dos gears) y
**refuta** la que el mismo catálogo publicaba para Ahri en tres lugares — el comentario de R6 en el issue
#11, el `notable[2]` de `svellsongur-copy-hold` y el `notable[4]` de `ahri-blue-sentinel-hold` — donde
"dos Svellsongur sobre Ahri" se sumaba como N = 3 en vez de componerse como N = 4. La entrada se
contradecía a sí misma: su `notable[1]` y sus `steps` ya usaban la composición.

### 0.5 — Battlefields: cuántos hay y cuántos podés llevar

- **485.4** (5642) — *"Battlefield Count: 2"* (Duel), con **485.4.a** (5644): *"Each player provides three
  (3) Battlefields, included in their deck during deck building. Only …"*
- **485.5** (5647) — *"Setup: Each player **randomly selects** one (1) of their three (3) Battlefields."*
- **487.5** (5710) — *"Each player **randomly selects** one (1) of their three (3) Battlefields."* (Skirmish)
- **486.5** (5670) — *"Setup: Each player **selects** one (1) of their three (3) Battlefields."* (Match, sin
  "randomly")
- **103.4.c** (145) — *"Cannot include more than one of a Battlefield of the same name when there are more
  than one required for the deck."*

### 0.6 — Deckbuilding

- **103.1.b.2** (67) — *"Your deck's Domain Identity is dictated by the domains of your Champion Legend."*
- **103.2.b** (106) — *"Your Main Deck can include up to 3 copies of the same named card."*

---

## Chequeo de bans

`grep '\[BANNED' `, carta por carta contra `data/corpus_flat.txt` y contra `data/legality.src.json`:

| código | carta | ban |
|---|---|---|
| UNL-177 | Ivern, Friend to All | limpia |
| UNL-087 | Blue Sentinel | limpia |
| OGN-286 | Reckoner's Arena | limpia |
| OGN-066 | Ahri, Alluring | limpia |
| SFD-059 | Svellsongur | limpia |

Trampa de nombres, verificada: el battlefield **baneado en los dos formatos es OGN-290 "The Arena's
Greatest"**, no OGN-286 "Reckoner's Arena". Son cartas distintas y sólo la primera está en la ban list
(`legality.src.json`, junto a Aspirant's Climb, The Dreaming Tree, Obelisk of Power y Reaver's Row).

---

## Tablero 1 — `ivern-sentinel-hold` + Reckoner's Arena → **entrada nueva, VERIFIED**

### Texto verbatim

```
UNL-177 | Ivern, Friend to All | Unit | Order | E6 M6 | As you play me, choose Bird, Cat, Dog, or Poro.
  I gain that tag. When I conquer or hold, score 1 point if your units have all of the following tags
  among them — Bird, Cat, Dog, and Poro. [Tags: Ivern, Ionia]
UNL-087 | Blue Sentinel | Unit | Mind | E4 P1 M4 | [Shield 2] (+2 Might while I'm a defender.) Your hold
  effects for holding here trigger an additional time. When I hold, [Add] 1 rainbow Power at the start of
  your next Main Phase. […] [Tags: Mount Targon]
OGN-286 | Reckoner's Arena | Battlefield | Colorless | - | When you hold here, activate the conquer
  effects of units here.
```

### La caminata

1. Controlás la Arena (190.1) con `N` Iverns y `K` Blue Sentinel presentes ahí, y los cuatro tags
   Bird/Cat/Dog/Poro repartidos entre tus unidades. Ivern dice *"your units"*, **no "units here"**: los
   portadores de tags que no sean Ivern pueden quedarse en tu base y no hacen falta en la Arena.
2. Beginning Phase: mantenés el control y Scoreás por Hold (469.2). **1 punto**, y 470 lo topea ahí.
3. **Vía A — el hold trigger de Ivern.** Cada Ivern presente pone su ability en la Chain por 383.4.d.2.a.
   La parte condicional (los cuatro tags, 383.2.a.1) está cumplida. Blue Sentinel hace correr cada hold
   effect `1 + K` veces (R1 = A con stacking). → **N × (1 + K)** puntos.
4. **Vía B — el hold trigger de la Arena.** *"When you hold here"* referencia al jugador que holdea, y
   190.6.a/c/d hacen que ese jugador seas vos, así que 383.4.d.2.b lo pone en la Chain **como uno de tus
   hold effects** (R8 = A). Blue Sentinel también lo multiplica: corre `1 + K` veces.
5. Cada corrida de la Arena activa los conquer effects de las unidades ahí (383.4.g.1). La ability de
   Ivern **es** un conquer effect además de un hold effect — 823.1.b y 823.1.c.1 establecen esa doble
   pertenencia para la forma "When I conquer or hold", que es la forma exacta que Ivern usa. Su parte
   no-conquer son los tags, que siguen cumplidos, así que **no** cae en la cláusula final de 383.4.g.1.
   → cada corrida pone `N` conquer effects más en la Chain: **N × (1 + K)** puntos otra vez.
6. Los puntos de 3 y 5 son Ganancias por habilidad (194.1.c), así que 470 no los topea (R2 = A) y
   471.1.a.1 los deja pasar el Final Point.

**Fórmula: `1 + 2 × N × (1 + K)`.** El factor 2 es Ivern cobrando por sus dos caras, y es lo que la
entrada sin Arena no tiene.

### Aritmética con las cantidades declaradas, y sus vecinos

Escritos para que nadie repita el error que la auditoría de BURST del 2026-09-04 encontró cuatro veces:

| N (Ivern) | K (Sentinel) | puntos | ¿llega a 8? |
|---|---|---|---|
| 1 | 1 | 5 | no |
| 1 | 2 | 7 | no |
| **2** | **1** | **9** | **sí — el declarado** |
| 1 | 3 | 9 | sí, pero 7 cuerpos |
| 2 | 2 | 13 | sí |
| 3 | 3 | 25 | techo |

**Declarado: N = 2, K = 1 → 1 + 2 × 2 × 2 = 9 puntos**, contra el Victory Score de 8. La clase BURST se
sostiene: los 9 caen en **un solo** evento de scoring, el Hold de una Beginning Phase.

### Costo

- 2 × Ivern: **12 Energy** (UNL-177 es `E6 M6`, **no lleva Power**)
- 1 × Blue Sentinel: **4 Energy + 1 Power**
- 2 portadores de tags externos, porque cada Ivern elige uno solo al jugarse y hacen falta cuatro. Los
  dos Iverns cubren Dog y Poro; los otros dos salen a 2 Energy cada uno dentro de Mind+Order:
  **OGN-216 Soaring Scout** (`E2 M1`, Bird, Order) y **VEN-132 Fallen Feline** (`E2 P1 M3`, Cat, Order).
  → **4 Energy + 1 Power**

**Total: 20 Energy + 2 Power**, contra los 28 Energy + 2 Power que la entrada sin Arena necesita (3 Ivern
+ 2 Sentinel + 1 tagger) para un punto más. Y sólo **tres** cuerpos tienen que sobrevivir en el
battlefield — 2 Ivern + 1 Sentinel — contra los seis de la otra, porque los taggers se quedan en la base.

### Trampas de autoría de `CLAUDE.md`, una por una

Abiertas del archivo, no de memoria:

- **Battlefield vacío ≠ ataque** (807.1.d, 383.4.e, 461): no aplica, esto es un Hold sin combate y sin
  designación de Attacker. Es la misma razón por la que existe la cara Hold de Nasus.
- **Energy en Awaken/Beginning Phase se pierde en la Main Phase (167)**: no aplica, no se añade Energy.
  El `[Add]` del Sentinel es un bonus que esta entrada no cuenta.
- **Repeat no da ventana (429.3, R21) y 820.1.c.3**: no hay Repeat.
- **[Temporary] muere antes del Scoring (816.1.b)**: ninguna pieza es Temporary.
- **Gold tokens entran exhausted (R25)**: no hay Gold.
- **Reciclar una runa por Power la manda al Rune Deck (161.2.b)**: no se recicla nada.
- **Un recall no es un move (456, 458)**: no hay recalls.
- **Un escudo would-die borra el Deathknell (808.1.d.1)**: no hay escudos de esa familia. El `[Shield 2]`
  del Sentinel es un bonus de Might defendiendo, no un reemplazo de muerte.
- **Un battlefield propio arranca sin Controller (190.1 / 190.6.d segunda oración)**: **aplica**, y va
  escrito en el `notable`. Tomar la Arena es parte del costo.
- **1 de 3 battlefields (485.4.a / 485.5 / 487.5 / 486.5) y 103.4.c**: **aplica**, y va en el primer
  `notable` con la fórmula que el proyecto fijó en #35.
- **Las unidades entran exhausted (143.4, R11)**: no molesta — 383.4.d.2.a pide presencia, no readiness.

### Ordenamientos alternativos probados antes de archivar cualquier lectura

Ninguna lectura nueva hizo falta, así que no hay nada que archivar. Los dos puntos donde podía hacer
falta una los contestó una regla que ya existía: 823.1.b/823.1.c.1 para el doble cobro de Ivern, y
383.1.b (leída y descartada por ser específica de "the [Nth] time") para la objeción de que una ability
no puede entrar dos veces por el mismo evento.

### Decisión: **entrada nueva, `ivern-sentinel-hold` queda intacta**

Motivo, escrito porque el issue lo pide:

1. **La Arena es un battlefield y sale 1 de 3 al azar** en Duel (485.5) y Skirmish (487.5). Un tablero
   que no depende de ningún battlefield propio está online siempre; éste no. Esa diferencia es un valor
   real que se perdería si se reescribiera la entrada vieja encima.
2. **No es el mismo mazo con un extra.** El tablero nuevo pide 2 Ivern + 1 Sentinel + 2 taggers; el viejo
   pide 3 Ivern + 2 Sentinel + 1 tagger. Cambian las cantidades de dos cartas y la cuenta de taggers, así
   que "What to add" (`planDeck`) tiene dos rutas de compra distintas que ofrecer, no una.
3. **El catálogo ya tiene ese precedente exacto**: `nasus-ascended-sentinel-arena-hold` convive con
   `nasus-ascended-brambleback-conquer`, y su propio `notable` dice por qué — una gana con battlefield
   propio, la otra sin él.

`ivern-sentinel-hold` sólo recibe un puntero al hermano nuevo en `notes`, sin tocar `class`, `uses`,
`quantity` ni su aritmética.

---

## Tablero 2 — `ahri-blue-sentinel-hold` + Svellsongur → **`svellsongur-copy-hold` reescrita, VERIFIED**

### Texto verbatim

```
OGN-066 | Ahri, Alluring | Unit | Calm | E5 P1 M4 | When I hold, you score 1 point. [Tags: Ahri, Ionia]
UNL-087 | Blue Sentinel | Unit | Mind | E4 P1 M4 | [Shield 2] … Your hold effects for holding here
  trigger an additional time. …
SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] 1 Energy + 1 Calm (…: Attach this to a unit
  you control.) As this is attached to a unit, copy that unit's text to this Equipment's effect text for
  as long as this is attached to it. [Tags: Equipment]
```

### Lo que la caminata cambia

El issue pedía comprobar que la versión con Svellsongur (11 puntos por 21 Energy) le gana al tablero
declarado por `ahri-blue-sentinel-hold` (10 por 23). Le gana — pero **11 no es el número correcto**, y el
tablero con Svellsongur no está siendo declarado en su mejor reparto.

Con la composición del bloque 0.4 (`2^v` instancias por unidad, orden por Timestamp bajo 480.3),
enumerando los cuatro repartos posibles de 3 Svellsongur sobre 1 Ahri + 1 Sentinel — **los cuatro cuestan
exactamente lo mismo**, porque las cinco cartas son las mismas y sólo cambia a qué cuerpo se equipa:

| Svellsongur en Ahri | en el Sentinel | N | K | `1 + N × (1 + K)` |
|---|---|---|---|---|
| 0 | 3 | 1 | 8 | 10 |
| 1 | 2 | 2 | 4 | **11 ← lo que la entrada declaraba** |
| 2 | 1 | 4 | 2 | 13 |
| **3** | **0** | **8** | **1** | **17 ← el máximo, mismo precio** |

El reparto declarado era el **peor menos uno** de los cuatro. La razón es aritmética simple: N multiplica
a `(1 + K)`, y componer sobre Ahri crece `1→2→4→8` mientras componer sobre el Sentinel crece el factor
`1→2→3→5→9` desde una base de 1. Poner todo en el multiplicando gana.

### Aritmética con las cantidades declaradas, y los vecinos

- **Declarado: 1 Ahri + 1 Sentinel + 3 Svellsongur, los tres sobre Ahri → N = 8, K = 1 → 1 + 8 × 2 =
  17 puntos**, contra el Victory Score de 8. Sigue siendo **BURST**: los 17 caen en un solo Hold.
- Vecinos, en la tabla de arriba. El más chico de los cuatro repartos ya da 10, así que el tablero
  llega a 8 se reparta como se reparta — pero el declarado tiene que ser el que la entrada camina.
- **Techo con el cap de 3 copias (103.2.b)**: 3 Ahri + 3 Sentinel + 3 Svellsongur, los tres gears sobre
  un mismo Ahri → N = 8 + 1 + 1 = 10, K = 3 → `1 + 10 × 4` = **41 puntos**. Los otros repartos del techo
  dan menos: los tres sobre un Sentinel → N = 3, K = 10 → 34; dos y uno → 31; uno y dos → 29. El techo
  publicado era **26**, calculado con la suma aditiva que 0.4 refuta.

### Costo, contado entero

- Ahri: **5 Energy + 1 Power**
- Blue Sentinel: **4 Energy + 1 Power**
- 3 × Svellsongur: jugarlo `E3 P1` **y** equiparlo `[Equip] 1 Energy + 1 Calm` → 4 Energy + 1 Power +
  1 Calm Power cada uno → **12 Energy + 6 Power**

**Total: 21 Energy + 8 Power.** El "18 Energy" que el catálogo publicaba en dos lugares no contaba los
tres `[Equip]`, y ningún número publicado contaba el Power.

### Trampas de autoría, una por una

Mismo barrido que el tablero 1. Las únicas que rozan esta entrada:

- **[Temporary]**, **Repeat**, **recall**, **Gold**, **reciclado de runas**, **escudo would-die**,
  **battlefield enemigo vacío**: ninguna aplica; no hay ninguna de esas piezas.
- **Un battlefield propio arranca sin Controller**: **no aplica**, esta entrada no nombra battlefield.
  Sirve cualquiera que puedas holdear, tuyo o del rival, y por eso no lleva la nota de "1 de 3".
- **Las unidades entran exhausted (143.4)**: no molesta, presencia es toda la condición (383.4.d.2.a).
- **167 (el Rune Pool se vacía)**: sí importa para *pagar*, no para el combo: los 8 Power no se pagan en
  un turno. Es un armado de varios turnos, como el tablero sin gear.

### Decisión: **reescribir `svellsongur-copy-hold`; `ahri-blue-sentinel-hold` queda intacta**

Motivo, escrito porque el issue lo pide:

1. **El tablero con Svellsongur ya es una entrada del catálogo.** `svellsongur-copy-hold` declara
   exactamente las mismas cinco cartas en las mismas cantidades (1 OGN-066 + 1 UNL-087 + 3 SFD-059). Una
   entrada nueva sería la misma lista de compra dos veces, y "What to add" ofrecería una ruta duplicada.
   Lo que la caminata cambia no es el mazo: es **dónde se attachean los tres gears**, que no toca `uses`
   ni ninguna `quantity`. Eso es una reescritura de los `steps` y la aritmética, no una entrada.
2. **`ahri-blue-sentinel-hold` conserva un valor propio que no es el mismo argumento del tablero 1, y
   hay que decirlo con precisión.** No es "sale 1 de 3": ninguna de las dos usa battlefield nombrado.
   Es el precio en **Power** y la superficie de remoción. El tablero sin gear cuesta 23 Energy + **5**
   Power; el de Svellsongur cuesta 21 Energy + **8** Power, tres de ellos Calm específicamente, y pone
   17 de sus puntos sobre **un solo cuerpo**: matar a Ahri o quitarle los gears derrumba todo el tablero,
   mientras que en el de cinco cuerpos hay que matar a más de uno. Menos Energy no es "domina".
3. **Con el arreglo, la contradicción interna desaparece.** El `notable[2]` de `svellsongur-copy-hold`
   publicaba "N=3, K=2, 10 points for 18 Energy" mientras su propio `notable[1]` y sus `steps` usaban la
   composición. Las dos cuentas no podían ser verdad a la vez; 0.4 dice cuál es.

`ahri-blue-sentinel-hold` sólo recibe la corrección del número en su `notable[4]` (17, no 11; 21 Energy
+ 8 Power; techo 41, no 26) y un puntero. **Su `class`, sus `uses` y sus `quantity` no se tocan**, así
que `test/matcher.test.ts` sigue afirmando lo mismo sin relajarse.

---

## Resumen

| entrada | qué pasó | clase | puntos |
|---|---|---|---|
| `ivern-arena-sentinel-hold` | **nueva, verified** | BURST | 9 por 20 Energy + 2 Power |
| `svellsongur-copy-hold` | **reescrita, sigue verified** | BURST | 11 → **17**, mismo precio; techo 26 → **41** |
| `ivern-sentinel-hold` | intacta; sólo un puntero en `notes` | BURST | 10 |
| `ahri-blue-sentinel-hold` | intacta; corregido el número cruzado del `notable[4]` | BURST | 10 |

**Ninguna resultó INFINITE.** Las dos caminadas terminan en un único Hold y no se repiten: no hay paso
"repeat" en ninguna, que es lo que la clase INFINITE exige.

**Ninguna lectura nueva archivada.** Las dos preguntas que parecían pedir una — el doble cobro de una
ability "conquer or hold" bajo la Arena, y la recursión de dos Svellsongur sobre la misma unidad — las
contestó el reglamento: **823.1.b/823.1.c.1** la primera, **476.1 + 477.2.c + 479.1 + 480.3** la segunda.
