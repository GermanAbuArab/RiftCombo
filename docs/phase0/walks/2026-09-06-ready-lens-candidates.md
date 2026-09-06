# Hand walk — las 5 candidatas de la lente del ready (issue #56) y la afirmación falsa que arrastraban dos entradas verified

Fecha: 2026-09-06 · Reglamento: `data/Riftbound-Core-Rules-2026-07-16.txt` · Texto de carta: `data/corpus_flat.txt`
Catálogo al empezar: **123 entradas, las 123 `verified`**.

Orden de trabajo, tal como lo pidió el encargo: **primero la corrección** a
`hextech-disc-defender-mech-token`, que publica una uniqueness falsa dentro de una entrada `verified`;
después las cinco candidatas.

---

## Bloque 0 — cada regla citada, abierta y pegada

Se abrieron **antes** de escribir un solo veredicto, porque la auditoría de citas del 2026-09-06
encontró tres entradas que citaban una regla que decía lo contrario de lo que afirmaban.

### El board, la Legend Zone y el ready

- **107. The Board** — encabezado. Debajo cuelgan 107.1 Bases, 107.2 Battlefield Zone, 107.3 Facedown
  Zones y **107.4 Legend Zone**. **108. Non-Board Zones** arranca recién después (Chain, Trashes…).
  O sea: la Legend Zone **es** parte del Board.
- **107.4.b** — *"This is not a location."*
- **107.4.c** — *"The Champion Legend here is a Game Object."*
- **415.1** — *"Readying is an action that marks a non-spell Game Object on the board as available for
  action."*
- **415.1.b** — *"A Unit that is already Ready cannot be Readied again."*
- **415.1.c** — *"If a Unit is instructed to be Readied while it is already Ready, nothing additional
  happens."*
- **415.3** — *"This is a Limited Action."* y **410.2.b**: *"These actions can only be taken when a
  player is instructed to do so as the execution of an effect or during their specified occasion during
  the turn."* No es un tope: es la razón por la que un ready necesita una carta que lo ordene.
- **415.3.a** — *"A player Readies all non-spell Game Objects they Control during the Awakening Phase
  on their turn."*
- **355.10.a** — ejemplo trabajado del propio reglamento: *"e.g., 'Ready a legend' targets a legend,
  because the Legend Zone is Public."*
- **143.4** — *"Units enter the Board exhausted."* / **143.4.a**: *"This can be altered by Accelerate or
  similar game effects."*
- **149.1** — *"Gear enter play Ready."* / **149.2** — *"Gear can only be played to a player's Base
  unless an effect specifies otherwise."*
- **414.1.b** — *"A Game Object that is already Exhausted cannot be Exhausted again."*
- **414.4** — *"When Exhausting is listed as a Cost, then the Action must be able to be completed for the
  cost to be paid."*

**Conclusión del bloque, y es la que sostiene los hallazgos B y D del issue**: *board* y *location* no
son lo mismo. La leyenda **no** está en un location (107.4.b) — por eso Reckoner's Arena (`here`) y
Svellsongur (attach a units) no la alcanzan, que es el hallazgo A de #47 y sigue en pie — pero **sí**
está en el board y es un Game Object (107.4.c), así que 415.1 la alcanza. El reglamento cierra la
discusión solo, con su propio ejemplo en 355.10.a.

### Movimiento

- **144.1.a** — *"This action can be done any time during a player's Main Phase."*
- **144.2** — *"Exhausting the Unit is the Cost for this action."*
- **144.4.a** — *"Units may move from their Base to a Battlefield."* / **144.4.b** — *"…from a
  Battlefield to their Base."* / **144.4.c.1** — Ganking: *"Units with Ganking may use their Standard
  Move to Move from Battlefield to…"*
- **144.4.a.1** — *"Units cannot Move to a Battlefield that already has units from 2 other players"* —
  inerte en Duel, que tiene un solo oponente.

### Habilidades activadas

- **377** — *"Activated Abilities are repeatable effects with a cost."*
- **377.2.b** — *"If an Activated Ability has a condition on 'using' or 'playing' it, that condition must
  be true"* (ejemplo trabajado: Ultrasoft Poro).
- **381** — *"All Activated Abilities can only be activated on the Controlling Player's Turn and during
  an Open State."*
- **145.2** — *"The Activated Ability of Units may be executed at any time during the controlling
  player's Main Phase during an Open State, and not during a Showdown."*
- **411.1** — *"The player that performs the Game Action is responsible for it."*

### Battlefields, control, conquer

- **190.1** — *"Control is established over Battlefields through the course of play."*
- **190.6.a** — *"While a Battlefield is Controlled, its Controller controls its Abilities unless that
  ability indicates another player does."*
- **190.6.b** — *"While a Battlefield is Uncontrolled, its Abilities are also Uncontrolled unless that
  ability indicates a player controls it."*
- **190.6.d** — *"'You' in a battlefield's abilities refers to the battlefield's Controller, as does the
  implied 'you' in instructions that don't specify a player like 'draw 1.' If the battlefield has no
  Controller, 'you' refers to no one, and all such instructions are ignored."*
- **466.5** — *"…the player with Units remaining here Establishes Control **if they didn't already
  control this Battlefield**."*
- **466.5.d** — *"Establishing Control results in a Conquer if that player has not yet scored this
  Battlefield this turn."*
- **469.1** — *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."*
- **485.4** — *"Battlefield Count: 2"* / **485.4.a** — cada jugador aporta 3 y solo entra 1 /
  **485.5** y **487.5** — *"randomly selects"* / **486.5** — *"selects"*.
- **103.4.c** — *"Cannot include more than one of a Battlefield of the same name when there are more
  than one required for the deck."*

### Fases, puntos, recursos

- **315.1.b** — *"1. The Turn Player readies all Game Objects they control that are able to be readied."*
- **315.2.b.2** — *"1. The Turn Player Holds all Battlefields they Control."*
- **312.2.a** — priority *"When the turn is in a Neutral Open State during their Main Phase."*
- **383.2.a.1** — *"Any additional conditional statement immediately after the Condition must be true in
  order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition
  and not the Effect."* (ejemplo trabajado: Sona, Harmonious).
- **816.1.b** — [Temporary] mata al permanente *"At the start of this permanent's controller's Beginning
  Phase"*, antes del scoring.
- **187.1** — *"A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag."*
- **195** — *"A player also wins the game if an effect instructs them to do so…"*
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
  each player's turn."* / **167.1** — *"Any unspent Energy or Power are lost."*
- **161.2.a** — *"Exactly 12 Rune cards chosen during Deck Construction."*
- **135.2.e.5.a** — *"When required as a cost, [A] can be paid by Power of any Domain."* /
  **135.2.e.5.b** — *"When Added to a player's Rune Pool, [A] can be spent to pay a Power cost of any
  Domain."*
- **429.1** — *"Adding is the action of putting resources into a player's Rune Pool."*

### XP

- **730.2** — *"To Spend XP, reduce the value of XP marked on the Player spending it."*
- **731.1** — *"XP cannot be targeted, readied, or exhausted."*
- **824.1.b.1** — *"It is functionally short for 'While you have [N] or more XP, this card gains
  '[Text]'.'"*
- **824.1.d** — *"The Dependent Ability will be Inactive as soon as the controlling player has less than
  [N]…"*

### Identidad de dominio y copias

- **103.1.b.3** — un dominio: permitido en la identidad correspondiente.
- **103.1.b.4** — *"If a card has more than one Domain, then that card is permitted only in a Domain
  Identity that contains all of the indicated Domains on that card."*
- **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."*

### Empower

- **441.2** — *"'Empowered' is a state for Game Objects on the board that other game effects and
  abilities can reference."*
- **827.1.c.1** — *"Empower is functionally short for '[Cost]: Empower this. Play only if not…'"*

### Combate y estado ready — el negativo, dicho como negativo

**461** define Combat por la presencia de unidades de dos jugadores opuestos en un battlefield y **462**
por cuántos jugadores participan. Corrí `grep -i exhaust` cruzado con `attack|defend|combat` sobre el
reglamento entero: **cero líneas**. Nada ata participar en un combate al estado ready/exhausted. Es un
negativo medido, no una suposición: una unidad exhausteada sigue peleando; lo que perdió es su Standard
Move del turno (144.2).

---

## Bloque 1 — chequeo de bans

`grep -n "BANNED" data/corpus_flat.txt` devuelve 11 líneas. **Ninguna** de las cartas de este walk
aparece: OGN-293, SFD-168, OGN-162, VEN-149, VEN-087, VEN-150, VEN-068, SFD-221, VEN-142, UNL-026,
SFD-117, UNL-213, UNL-191, UNL-109, OGN-289, OGN-073, OGN-117, OGN-111, VEN-153. La única entrada
`restricted` del pool es `OGS-019 Wuju Bladesman - Starter` en 2v2, y no la usa ninguna candidata
(`wuju-master-blood-rose-level` corre `UNL-191`, que es otra carta).

---

## Bloque 2 — LA CORRECCIÓN: dos entradas `verified` publican una uniqueness falsa

### 2.1 `hextech-disc-defender-mech-token` — *"the ONLY card in the pool that readies gear"*

El `uses[VEN-149].note` dice, literal:

> *"The ONLY card in the pool that readies gear — grep -iE 'ready [0-9a-z]* ?gear' over all 935 cards
> returns this line and nothing else."*

Ese regex exige que entre `ready` y `gear` haya **una sola palabra sin espacios**. Se come cualquier
adjetivo. Grep honesto, abierto con `-i` y con la palabra pelada:

```
grep -inE "ready [^|]*gear|ready something" data/corpus_flat.txt
```

devuelve **nueve** líneas, de las que **cinco readean gear de verdad**:

```
VEN-149 | Defender of Tomorrow      | Legend      | Mind/Body | :rb_energy_1:, :rb_exhaust:: Ready a gear. [Empowered][>] … Ready 2 gear.
VEN-150 | Acceleration Gate         | Spell       | Mind/Body | Ready up to 4 units, gear, and/or runes.
SFD-221 | Veiled Temple             | Battlefield | Colorless | When you conquer here, you may ready a friendly gear. …
OGN-162 | Miss Fortune, Captain     | Unit        | Body      | The first time I move each turn, you may ready something else that's exhausted.
VEN-068 | Jayce, Brilliant Inventor | Unit        | Mind      | When you play me or the first time you play a non-token gear each turn, you may ready something besides me that's exhausted.
```

Las otras cuatro no son fuentes: `OGN-070 Mageseeker Warden` es un **hoser** (*"spells and abilities
can't ready enemy units and gear"*), `SFD-004 Bushwhack` y `UNL-078 Sprite Fountain` son *enters
ready* / *"play a ready … token"*, y `SFD-085 Ornn, Forge God` solo menciona gear.

**Tres de las cinco caben en la identidad Mind/Body de la entrada**: VEN-150 (Mind/Body), OGN-162
(Body) y VEN-068 (Mind). SFD-221 es Colorless y también entra, a costa del slot de battlefield. La
afirmación es falsa por partida triple y hay que reescribirla.

**Lo que NO cambia**: `VEN-149` sigue siendo la única **leyenda** Mind/Body del pool
(`grep "| Legend | Mind/Body |"` da una sola línea), así que la entrada tampoco puede cambiar de
leyenda. Y sigue siendo la única fuente de ready de gear **repetible y gratis en cartas** — el Gate
es un hechizo de un solo uso, el Temple es un battlefield atado a un conquer, y Miss Fortune y Jayce
readean **un** objeto, no dos.

### 2.2 La fórmula también estaba mal, y por una razón distinta

El `notable` dice:

> *"Mechs per turn = floor((#Discs + 2) / 2): one Disc gives 1, two give 2, **THREE STILL GIVE 2**."*

El `floor` por turno supone que **el estado no cruza el Awaken**. Sí lo cruza: 441.2 hace de
`Empowered` un estado del objeto en el board y nada lo apaga salvo la propia habilidad del Disc. Un
Disc que termina el turno **Empowered y exhausted** empieza el siguiente **Empowered y ready**, y
fabrica un Mech con **un solo** exhaust.

Camino a mano con **3 Discs** y `A = 1` activación de la leyenda (el estado de la entrada actual):

```
T1  Awaken: A,B,C ready, disempowered
    [Empower] A, B, C (3 exhausts)            -> los tres Empowered + exhausted
    Defender: 1E, exhaust, Ready 2 gear       -> A y B ready
    A: disempower+1E+exhaust -> Mech          | B: ídem -> Mech          = 2 Mechs
    fin de turno: A,B disempowered+exhausted  ; C EMPOWERED+exhausted
T2  Awaken: A,B,C ready.  C está Empowered    -> Mech inmediato (1 exhaust)
    [Empower] A, B (2 exhausts)
    Defender: Ready 2 gear -> A, B ready
    A -> Mech | B -> Mech                                                = 3 Mechs
    fin de turno: A,B,C disempowered+exhausted
T3  = T1                                                                 = 2 Mechs
```

**2, 3, 2, 3…** El ritmo amortizado con 3 Discs es **2.5 por turno**, no 2. El tercer Disc **sí**
compra algo (+0.5 Mech/turno por 4 Energy + 1 Power); lo que es cierto es que compra la mitad que el
segundo.

La forma correcta de la fórmula, contando exhausts en vez de aplicar un `floor` por turno:

```
exhausts de Disc por turno = D (Awaken 315.1.b)  +  A x min(2, D)   (los readies de la leyenda)
Mechs por turno            = exhausts / 2        (amortizado; cada Mech son 2 exhausts, 414.1.b + 414.4)

con D >= 2  ->  Mechs por turno = D/2 + A
```

Verificación contra los casos que la entrada ya declaraba: `D=1, A=1` → 1 exhaust del Awaken + 1
ready útil (la leyenda readea "2 gear" pero solo hay uno) = 2 exhausts = **1 Mech** ✓.
`D=2, A=1` → (2+2)/2 = **2 Mechs** ✓ (el ritmo publicado, correcto). `D=3, A=1` → (3+2)/2 = **2.5**
(la entrada decía 2). `D=2, A=2` → (2+4)/2 = **3** — que es la candidata 2.

`quantity` se deja en **2 Discs**: sigue siendo el número eficiente por Energy y por carta, y cambiar
cantidades de una entrada existente rompe tests pinneados. Lo que cambia es el texto que miente.

### 2.3 La misma uniqueness falsa, en una segunda entrada `verified`

`matriarch-of-war-empower-ready` (Body/Order) dice:

> *"The only untapper in the pool is SFD-210 Hall of Legends…"*

Grep honesto de todo lo que puede readear **una leyenda** (`ready … legend`, más los dos textos sin
restricción de tipo):

```
SFD-039 | Royal Entourage          | Unit        | Calm      | When you play me, ready or exhaust a legend.
SFD-210 | Hall of Legends          | Battlefield | Colorless | When you conquer here, you may pay :rb_energy_1: to ready your legend.
OGN-162 | Miss Fortune, Captain    | Unit        | Body      | The first time I move each turn, you may ready something else that's exhausted.
VEN-068 | Jayce, Brilliant Inventor| Unit        | Mind      | When you play me or the first time you play a non-token gear each turn, you may ready something besides me that's exhausted.
```

(`VEN-150 Acceleration Gate` **no** entra: enumera *"units, gear, and/or runes"* y una leyenda no es
ninguna de las tres. `SFD-195 Blade Dancer`, `SFD-203 Battle Mistress` y `OGN-269 The Boss` se readean
**a sí mismas**, así que solo sirven si son *tu* leyenda.)

En Body/Order son legales **SFD-210** (Colorless) y **OGN-162** (Body). Miss Fortune es además la
mejor de las dos: cobra todos los turnos, gratis, sin depender del sorteo del battlefield (485.5) ni
de conquistar. La Matriarca pasa de 1 ready por turno a **2**.

Se corrige el `notable`; **no** se toca `uses` ni `quantity` — Miss Fortune entra como rider nombrado,
igual que Renata Industrialist ya estaba ahí.

> **Nota para el CLAUDE.md** (no es mío editarlo): la sección "Ready lens (#56)" lista *"four cards
> ready your legend (SFD-039, SFD-210, OGN-111 via Heimerdinger's copy, OGN-162 Miss Fortune)"*.
> Falta **VEN-068 Jayce, Brilliant Inventor**, cuyo *"ready something besides me that's exhausted"*
> alcanza a la leyenda por la misma puerta que Miss Fortune.

---

## Candidata 1 — `plaza-armory-miss-fortune` · ALT_WIN · **VERIFIED**

`OGN-293` The Grand Plaza ×1, `SFD-168` Vanguard Armory ×2, `OGN-162` Miss Fortune, Captain ×1.
Identidad **Body/Order** (el Plaza es Colorless, el Armory es Order, Miss Fortune es Body).

Texto verbatim:

```
OGN-293 | The Grand Plaza       | Battlefield | Colorless | - | When you hold here, if you have 7+ units here, you win the game.
SFD-168 | Vanguard Armory       | Gear  | Order | E7 P1     | :rb_exhaust:: Play three 1 :rb_might: Recruit unit tokens. (You may play them to different locations.)
OGN-162 | Miss Fortune, Captain | Unit  | Body  | E5 P1 M5  | [Accelerate] … [Ganking] … The first time I move each turn, you may ready something else that's exhausted.
```

**El turno de remate, contado paso a paso:**

```
Awaken (315.1.b)      : los 2 Armory y Miss Fortune quedan ready
exhaust Armory A      : 3 Recruits al Plaza (355.2.a + el recordatorio impreso)   Plaza: 3
exhaust Armory B      : 3 Recruits al Plaza                                       Plaza: 6
Miss Fortune: Standard Move base -> Plaza (144.1.a, 144.4.a; coste 144.2 = exhaustearse)
   su disparo readea el Armory A                                                  Plaza: 7  (6 + ella)
exhaust Armory A      : 3 Recruits al Plaza                                       Plaza: 10
                                                                                  ----
                                                    10 >= 7, con 3 bajas de margen
COSTE DEL TURNO DE REMATE: 0 Energy, 0 Power.
```

Después: sobrevivir el turno del rival y **Hold** en tu Beginning Phase (315.2.b.2) → 195.

**Por qué cada paso es legal:**

- Los Recruits pueden ir al Plaza: **355.2.a** (*"the controller's Base or a Battlefield the controller
  controls"*) más el recordatorio del propio Armory. Exige **controlar el Plaza antes** de exhaustear
  el Armory; eso es parte del costo y va en `prerequisites`.
- El Armory dispara el mismo turno que baja: **149.1** *"Gear enter play Ready."*
- Miss Fortune tiene que estar **ready** para pagar el move: si baja el mismo turno necesita
  [Accelerate] (143.4 + 143.4.a), y **414.1.b** impide exhaustear lo ya exhausteado.
- Los Recruits **no** llevan [Temporary] (187.1 los define sin él), así que **816.1.b** no los toca y
  siguen ahí en el Scoring Step.
- El instante que cuenta: **383.2.a.1** hace del *"if you have 7+ units here"* parte de la **Condición
  del disparo**, medida cuando se cumple el Hold; y **312.2.a** solo da priority en la Main Phase, así
  que **no hay ventana para agregar un cuerpo en el instante del Hold**. Los siete tienen que
  sobrevivir el turno entero del rival. (Es exactamente lo que #48 fijó para los otros Plaza.)

**Aritmética con una sola copia del Armory** — la declaro porque cambia el veredicto de "holgado" a
"exacto": `3 + 3 = 6` Recruits + Miss Fortune = **7 clavados**, sin margen, y el turno de remate cuesta
7 Energy + 1 Power si el Armory baja ese turno. Por eso `quantity: 2`.

**Comparación honesta contra `grand-plaza-recruit-vanguard`** (OGN-293 + 2× OGS-015, ya `verified`):
esa línea son **2 cartas y 12 Energy en el turno de remate** para 8 Recruits. Ésta son **3 cartas y
19 Energy + 3 Power repartidos en turnos previos** para **0 Energy en el remate** y 10 cuerpos. El
costo total es mayor y el conteo de cartas también — se dice, no se esconde. Lo que compra es que el
Armory es un **permanente**: sigue produciendo 3 Recruits por turno después, y el remate no se
telegrafía con 12 Energy de mana abierto.

**Leyenda**: Body/Order tiene cinco, todas leídas del corpus — `OGN-269` The Boss, `OGS-023` Might of
Demacia, `SFD-205` Grand Duelist, `UNL-203` Keeper of the Hammer, `VEN-153` Matriarch of War.
`OGS-023` es la mejor: *"When you conquer, if you have 4+ units at that battlefield, draw 2"* cobra en
el mismo conquer que hace falta para poder poner los Recruits ahí.

**Qué la refuta, y no se esconde:**

1. Nueve de los diez cuerpos son Recruits de 1 Might. **`OGN-133 Flurry of Blades`** (Body, E1,
   [Reaction], *"Deal 1 to all units at battlefields"*) barre los nueve de una y deja uno.
   `arise-sand-soldiers-plaza` (Sand Soldiers de 2 Might) es inmune a eso; ésta no.
2. El Plaza es **1 de 3 al azar** en Duel (485.5) y Skirmish (487.5), elegido en Match (486.5), y
   103.4.c + TR 402.1 prohíben llevar dos con el mismo nombre.
3. El disparo dice *"the **first** time I move each turn"*: **un** ready por turno. Un tercer Armory no
   mejora nada, porque nada lo readea otra vez.
4. El Plaza es simétrico (*"When **you** hold here"*, 190.6.d): un rival con siete cuerpos ahí gana
   igual.

**VERIFIED** como ALT_WIN: `OGN-293` dice literalmente *"you win the game"* y 195 lo concede.

---

## Candidata 2 — `miss-fortune-defender-hextech-double` · ENGINE · **VERIFIED**

`VEN-149` Defender of Tomorrow (leyenda) ×1, `VEN-087` Hextech Disc ×2, `OGN-162` Miss Fortune ×1.
Identidad **Mind/Body** (VEN-149 es la leyenda y es Mind/Body; el Disc es Body; Miss Fortune es Body).
Legal por 103.1.b.3.

Es la aplicación del hallazgo B: **Miss Fortune readea la leyenda**, y la leyenda es la que readea el
gear. Con la fórmula del bloque 2.2, `A` pasa de 1 a 2:

```
D=2, A=1  ->  (2 + 2)/2 = 2 Mechs por turno,  coste 1 + 2 = 3 Energy   (la entrada existente)
D=2, A=2  ->  (2 + 4)/2 = 3 Mechs por turno,  coste 2 + 3 = 5 Energy   (esta entrada)
D=3, A=2  ->  (3 + 4)/2 = 3.5 Mechs por turno
```

**+50 % de throughput por una sola carta**, pagada una vez. El precio por Mech sube de 1.50 a 1.67
Energy: se dice.

Camino a mano (D=2, A=2, Defender ya Empowered), mostrando que el ciclo **alterna 2/4 y promedia 3**:

```
T1  Awaken: Discs A,B ready+disempowered; leyenda ready; Miss Fortune ready
    [Empower] A, [Empower] B            (2 exhausts de Disc; su coste es solo :rb_exhaust:)
    Defender #1 (1E, exhaust): Ready 2 gear -> A, B ready
    A y B: "Disempower this, 1E, exhaust" -> 2 Mechs
    Miss Fortune: Standard Move (144.2) -> readea LA LEYENDA (107.4.c + 415.1)
    Defender #2 (1E, exhaust): Ready 2 gear -> A, B ready (disempowered)
    [Empower] A, [Empower] B            (2 exhausts) -> terminan Empowered+exhausted
    T1 = 2 Mechs
T2  Awaken: A,B ready y EMPOWERED (441.2 conserva el estado)
    A y B -> 2 Mechs directo (2 exhausts)
    Defender #1 -> ready A,B ; [Empower] A,B (2 exhausts)
    Miss Fortune move -> ready leyenda ; Defender #2 -> ready A,B
    A y B -> 2 Mechs
    T2 = 4 Mechs
T3  = T1.   Promedio: 3 Mechs por turno.
```

**Qué la refuta:**

1. Miss Fortune tiene que **poder moverse todos los turnos**. En Duel hay 2 battlefields (485.4) y ella
   tiene [Ganking] (144.4.c.1); si no, alterna base↔battlefield (144.4.a / 144.4.b). Nunca se queda sin
   destino, pero queda **exhausteada todos los turnos** y entrar a un battlefield ocupado por el rival
   arma un Combat (461) que puede matarla. El destino seguro es un battlefield tuyo o vacío.
2. Readear la leyenda vale 2 gear; readear un Disc directo vale 1. Si algún turno la leyenda ya está
   ready, el ready se malgasta (415.1.c).
3. Es un motor de **cuerpos en la base** (VEN-087 dice *"to your base"*): sigue vigente el cuello de
   botella de #48 — los puntos se cobran en los battlefields, y solo `SFD-177 Azir, Sovereign` mueve
   tokens en masa.
4. Alternativa dentro de Mind/Body, dicha para que nadie la "descubra" después: **`VEN-068` Jayce,
   Brilliant Inventor** (Mind) hace el mismo trabajo *"the first time you play a non-token gear each
   turn"* — pero exige jugar un gear por turno, o sea una carta y su Energy cada vez. Miss Fortune
   cobra por moverse, que es gratis. Y **`VEN-150` Acceleration Gate** (Mind/Body) readea 4 objetos de
   una, pero es un hechizo: un uso por copia, no un motor.

**No es INFINITE y la razón es la misma que ya cerró la familia**: cada Mech consume dos exhausts del
Disc (414.1.b + 414.4) y los readies por turno son finitos (D + A×2). Nada en el ciclo se re-alimenta.
**ENGINE.**

---

## Candidata 3 — `dominus-xerath-henge-removal` · ENGINE · **VERIFIED**

`VEN-142` Dominus ×1, `UNL-026` Xerath, Freed ×1, `SFD-117` Ancient Henge ×1. Identidad **Fury/Body**.
Leyendas legales: `OGN-249` Relentless Storm, `SFD-183` Purifier, `UNL-183` Pridestalker, `VEN-141`
Butcher of the Sands.

```
VEN-142 | Dominus       | Spell | Fury/Body | E4    | [Action] … This turn, double a unit's Might and give it ":rb_rune_rainbow::rb_rune_rainbow:: Ready me."
UNL-026 | Xerath, Freed | Unit  | Fury      | E5 M5 | :rb_rune_fury:, :rb_exhaust:: Deal 3 to a unit. Use this ability only while I'm at a battlefield.
SFD-117 | Ancient Henge | Gear  | Body      | E2 P1 | :rb_exhaust:: [Reaction] — Pay any amount of Energy to [Add] that much :rb_rune_rainbow:.
```

**El hallazgo estructural (D del issue), re-medido carta por carta.** Recorrí las 16 cartas que readean
otro objeto más las que ya están catalogadas, buscando una cuyo coste **no** lleve `:rb_exhaust:` **ni**
una cláusula de tope. Todas lo llevan:

| carta | qué la topea |
|---|---|
| OGN-152 Mistfall | *"pay :rb_rune_body: and **exhaust this**"* |
| VEN-149 Defender of Tomorrow | `:rb_energy_1:, :rb_exhaust:` |
| VEN-153 Matriarch of War | `Disempower me, :rb_rune_rainbow:, :rb_exhaust:` |
| SFD-195 Blade Dancer | *"you may **exhaust me** and pay :rb_rune_rainbow:"* |
| UNL-109 Blood Rose | *"Spend 3 XP, :rb_exhaust:"* |
| VEN-125 Hungry Wolf | *"only once each turn"* |
| OGN-162 Miss Fortune | *"the **first** time I move each turn"* |
| VEN-068 Jayce | *"the **first** time you play a non-token gear each turn"* |
| UNL-009 Upstage Comedy | **820.1.c.3**, *"Each Repeat Cost can be paid only a single time"* (hallazgo de #32) |
| SFD-180 Fiora, Worthy | atada a un disparo (*becomes [Mighty]*) que ocurre una vez por cuerpo |

La habilidad que reparte Dominus no tiene ninguna de las dos cosas, y **377** dice qué significa eso:
*"Activated Abilities are repeatable effects with a cost."* **145.2** la abre en toda tu Main Phase en
Open State. Es un ready **ilimitado a 2 Power la vez**.

**Lo que hay que decir ANTES que la candidata: la ruta obvia no existe.** Dominus es **Fury/Body**;
por **103.1.b.4** un mazo con Dominus + `SFD-088 Renata Glasc, Mastermind` (Mind) exigiría
Fury+Body+Mind, y una leyenda tiene exactamente dos dominios. **"Ready ilimitado → puntos ilimitados"
es ilegal.** Queda como refutación escrita, abajo.

**El mejor sumidero legal en Fury/Body, medido y no supuesto.** `grep "| Unit | (Fury|Body) |"` cruzado
con `:rb_exhaust::` devuelve **cuatro** unidades en todo el pool:

```
UNL-001 Arena Kingpin    | Fury | :rb_exhaust:: Give a unit +3 :rb_might: this turn.
UNL-018 Yeti Brawler     | Fury | (el exhaust está en el token de Oro, no en él)
UNL-026 Xerath, Freed    | Fury | :rb_rune_fury:, :rb_exhaust:: Deal 3 to a unit.
UNL-093 Dragonsoul Sage  | Body | [Reaction][>] :rb_exhaust:: [Add] :rb_energy_1:.
```

Xerath es el único que convierte el ready en algo que gana la partida (removal). El Kingpin da Might,
que no puntúa. El Sage se refuta abajo.

**Aritmética con las cantidades declaradas (P = Power disponible en el turno):**

```
primer disparo          : 1 Fury Power                            -> 3 de daño
cada disparo siguiente  : 2 rainbow Power (ready) + 1 Fury Power  -> 3 de daño
disparos = 1 + floor((P - 1) / 3)
```

El rainbow del Henge paga el coste Fury de Xerath: **135.2.e.5.b**, *"When Added to a player's Rune
Pool, [A] can be spent to pay a Power cost of any Domain."*

Con el **suelo gratis de 2 Power por turno** (164.2.b, 161.2.b, 315.3.b/430.4.a) son `1 + floor(1/3)`
= **1 disparo**: sin motor de Power la carta no hace nada. Con el Henge convirtiendo X Energy en X
rainbow, `P = 2 + X`; con X = 12 → P = 14 → `1 + floor(13/3)` = **5 disparos = 15 de daño** en un
turno, repartidos entre objetivos distintos, más Xerath a 10 Might por el propio Dominus. El Henge
convierte **una vez por turno** (su coste es un exhaust) pero **sin tope por activación**, que es
exactamente la excepción que #46 registró.

**167 no muerde**: el Rune Pool se vacía al **empezar** la Main Phase y al terminar el turno; todo esto
se paga dentro de la Main Phase.

**Qué la refuta:**

1. Dominus dice *"This turn"*: el motor dura **un turno** y cuesta una carta de 4 Energy cada vez. No es
   INFINITE ni se le acerca. **ENGINE**, y el `terminatesIn` lo dice.
2. Xerath se puede matar en respuesta a Dominus y perdés las dos cartas.
3. `SFD-117` ya está en el catálogo (`gemdragon-henge-vi-blind-fury`): esta entrada lo comparte, no lo
   estrena.
4. **Dominus + `UNL-093` Dragonsoul Sage NO es infinito** — lo camino porque es la trampa obvia: el
   ready cuesta **2 Power** y el Sage devuelve **1 Energy**; el Henge convierte 1 Energy en 1 Power.
   Cada vuelta pierde 1 Power neto, y encima el Henge se exhaustea, o sea que convierte una sola vez por
   turno. Muere por aritmética, no por reglas.

---

## Candidata 4 — `gardens-becoming-wuju-xp-faucet` · ENGINE · **VERIFIED**

`UNL-213` Gardens of Becoming ×1, `UNL-191` Wuju Master (leyenda) ×1, `UNL-109` Blood Rose ×1.
Identidad **Calm/Body**.

```
UNL-213 | Gardens of Becoming | Battlefield | Colorless | - | Units here have ":rb_exhaust:: Gain 1 XP."
UNL-191 | Wuju Master | Legend | Calm/Body | - | [Level 6][>] Your units have +1 :rb_might:. [Level 11][>] Your units enter ready.
UNL-109 | Blood Rose | Gear | Body | E1 | When you play a unit, you may pay :rb_energy_1: to gain 1 XP. Spend 3 XP, :rb_exhaust:: Ready a unit.
```

**Qué es**: `UNL-213` es el **único sumidero de exhaust del pool que no cuesta nada y cobra por
cuerpo**. Censo de sumideros de exhaust del pool (los que un ready "paga"):

```
SFD-088 Renata Glasc, Mastermind  4E + 4 Mind Power, exhaust: Score 1 point   <- el único "exhaust: punto"
SFD-168 Vanguard Armory           exhaust: tres Recruits
UNL-160 Ultrasoft Poro            exhaust: dos Birds con [Deflect]
VEN-087 Hextech Disc              Disempower, 1E, exhaust: un Mech de 3 Might
UNL-026 Xerath, Freed             Fury Power, exhaust: 3 de daño
UNL-213 Gardens of Becoming       exhaust: Gain 1 XP                          <- coste CERO, y por cuerpo
```

**Ritmo, con las cantidades que declara (N = tus unidades paradas en el Gardens):**

```
Altar to Unity + Blood Rose (lo que el `notable` de wuju-master-blood-rose-level llama "cheapest ramp"):
   1 Recruit por hold -> 1 XP por 1 Energy por turno

Gardens of Becoming:
   N XP por turno, 0 Energy, 0 cartas
   N = 4  ->  11 XP en 3 turnos   vs   11 turnos y 11 Energy con el Altar
```

**Las reglas, y la única que hay que leer con cuidado:**

- **824.1.b.1** y **730.2** son la trampa que la entrada existente ya documenta: gastar XP baja el
  nivel. El Gardens **solo suma**, nunca gasta — por eso es estrictamente mejor que el propio ready de
  Blood Rose dentro de la banda 11-13 XP.
- **731.1** — *"XP cannot be targeted, readied, or exhausted."* Lo que se exhaustea es **la unidad**; el
  battlefield le da la habilidad al cuerpo.
- **143.4** — una unidad jugada este turno entra exhausteada y no puede pagar. El faucet cobra por
  cuerpos que ya estaban ahí… **hasta [Level 11]**: ahí *"Your units enter ready"* apaga 143.4 y **cada
  unidad que jugás al Gardens es +1 XP en el acto**. El motor se acelera solo justo cuando llega.
- **381** — la habilidad es activada, así que solo en **tu** turno. No hay faucet en el turno del rival.
- **¿Quién gana el XP?** El Gardens **no dice "you"**: dice *"Units here have '…: Gain 1 XP.'"*. La
  habilidad, una vez concedida, vive en la unidad; **381** solo deja activarla a su controlador y
  **411.1** lo hace responsable de la acción, así que el XP es de quien exhaustea su propio cuerpo.
  La lectura contraria — que **190.6.d** reescriba el *"you"* implícito de *"Gain 1 XP"* al controlador
  del battlefield — **daría el mismo número para esta entrada**, porque la entrada declara que **vos**
  controlás el Gardens y que los cuerpos son tuyos. Por eso **no se archiva ninguna lectura nueva**: el
  motor no depende de cuál de las dos gane.
- **190.6.b** — la cláusula *"Units here have…"* no nombra jugador, así que sigue en pie aunque el
  Gardens esté **sin controlador**, y también se la da a las unidades del rival. Va en `notable`.
- **485.4.a / 103.4.c** — Gardens y `OGN-275` Altar to Unity **no pueden estar los dos**: es un
  **reemplazo** de la rampa que la entrada existente propone, no un agregado.
- **461 / 462** — el bloque 0 lo midió: exhaustear tus cuerpos para XP **no los saca del combate**. Lo
  que pierden es el Standard Move del turno (144.2).

**Qué la refuta:**

1. **Es simétrico.** El rival exhaustea **sus** cuerpos ahí por XP, y el Gardens puede terminar siendo
   suyo (466.5).
2. Exige **N cuerpos parados en ese battlefield**, y llegar consumió su move del turno anterior (144.2):
   el faucet arranca un turno tarde.
3. No cambia la trampa central de la familia: bajar de 11 XP apaga *"Your units enter ready"* en el acto
   (824.1.d).
4. Cuesta el slot de battlefield y sale **1 de 3 al azar** en Duel (485.5) y Skirmish (487.5).

**ENGINE**: produce XP, y el XP no es un punto. No se fuerza a más.

---

## Candidata 5 — `targons-peak-sona-reaction-runes` · **REFUTADA como entrada; su hallazgo entra como corrección**

```
OGN-289 | Targon's Peak | Battlefield | Colorless | - | When you conquer here, ready up to 2 runes at the end of this turn.
```

La tesis del issue es correcta en la mitad que importa: un ready *"at the end of your turn"* **no es
redundante** frente al Awaken (315.1.b / 415.3.a), porque es la única forma de tener runas paradas
**durante el turno del rival**. Esa es exactamente la tesis de `sona-viktor-opponent-turn`, que ya está
`verified`.

**Pero el propio issue escribe el tope, y ese tope la mata como entrada**: **469.1** (*"A player gains
Control of a Battlefield they did not yet Score this turn"*) más **466.5** (*"Establishes Control **if
they didn't already control this Battlefield**"*) significan que el disparo **no se repite mientras lo
sigas controlando**. Es **+2 runas en el turno en que lo tomás**, y otra vez solo si el battlefield
cambia de manos.

Un evento no es un motor. Una entrada `ENGINE` cuyo propio `terminatesIn` tendría que decir "una vez
por cambio de control" sería exactamente el defecto que la auditoría de los once BURST castigó: la
clase declarada no coincide con lo que la fórmula produce.

Y hay una razón más fuerte: **`sona-viktor-opponent-turn` ya nombra el Targon's Peak en su `notes`** —
*"Targon's Peak (OGN-289) stacks: it readies up to 2 more at the end of a turn in which you conquered
there, for up to six."* Esa frase **omite el tope** y por eso está mal como está escrita. Lo correcto no
es duplicar la entrada: es **subir el rider de `notes` a `prerequisites.notable` con el tope escrito**,
más el slot de battlefield (485.4.a) y el techo del Rune Deck (161.2.a, *"Exactly 12 Rune cards"*).

**REFUTADA como entrada nueva. Aplicada como corrección a una entrada `verified`.**

---

## La refutación de dominio que #46 dejó abierta

`heimerdinger-vanguard-armory-recruits` dice, en su primer `notable`:

> *"SIX A TURN, NOT NINE. #46 conjectured nine by adding Acceleration Gate to ready both — but the Gate
> is Mind/Body and this pairing is Mind/Order, so 103.1.b keeps it out of the deck."*

El encargo pregunta si Miss Fortune la cierra. **No la cierra: la confirma.** `OGN-111` Heimerdinger es
**Mind**, `SFD-168` Vanguard Armory es **Order**, `OGN-162` Miss Fortune es **Body**. Mind + Order +
Body son **tres** dominios y una leyenda tiene exactamente dos: **103.1.b.4** deja el mazo fuera igual
que al Gate. Miss Fortune resuelve la **forma** del problema (un ready repetible y gratis del Armory)
pero en **otro mazo**: Body/Order, sin Heimerdinger — que es la candidata 1.

Lo que **sí** llega a nueve en Mind/Order, y no lo había visto nadie: **`VEN-068` Jayce, Brilliant
Inventor** es **Mind**. *"the first time you play a non-token gear each turn, you may ready something
besides me that's exhausted."* Readea el Armory (o a Heimerdinger) y son **3 + 3 + 3 = 9 Recruits**…
pero solo en un turno en que juegues un gear que no sea token, o sea pagando una carta y su Energy cada
vez. Es un rider real y condicionado, no el estado estacionario. Va al `notable`, no a `uses`.

Se escribe en **las dos entradas**: en la de Heimerdinger como el cierre de la refutación de #46, y en
`plaza-armory-miss-fortune` como la razón por la que las dos rutas del Armory **nunca comparten mazo**.

---

## Chequeo contra las trampas de autoría del CLAUDE.md, una por una

| trampa | dónde muerde |
|---|---|
| entrar a un battlefield vacío no es atacar (807.1.d, 383.4.e, 461) | ninguna candidata usa `When I attack` ni [Assault]. Miss Fortune **se mueve**, no ataca; su disparo es *"the first time I move"*. |
| Energy del Awaken / Beginning Phase se pierde al empezar la Main Phase (167) | candidata 3: todo se paga **dentro** de la Main Phase. Candidata 5 (refutada) guardaba **runas paradas**, no Energy. |
| un [Repeat] no da ventana para re-exhaustear (429.3, R21) | ninguna usa [Repeat]. `UNL-009 Upstage Comedy` queda refutada por 820.1.c.3, como en #32. |
| los [Temporary] mueren antes del Scoring (816.1.b) | candidata 1: los Recruits de `SFD-168` son **187.1**, sin [Temporary]. Verificado en el texto del token. |
| Gold entra exhausted salvo Renata Industrialist (R25) | ninguna candidata usa Gold. |
| reciclar una runa por Power la manda al Rune Deck (161.2.b) | ninguna recicla runas. |
| un recall no es un move (456 / 458) | el de Miss Fortune es un **Standard Move** (144.1.a, 144.2), no un recall. |
| escudo `would die` borra el Deathknell (808.1.d.1) | ninguna candidata usa escudos. |
| una leyenda no está en un *location* (107.4.b) | respetado: ninguna candidata pone a la leyenda "here" ni le attachea nada. El ready entra por *board* (107.4.c), que es otra puerta. |
| un battlefield que traés arranca **sin** controlador (190.1, 190.6.d) | candidatas 1 y 4 lo dicen en `prerequisites`: tomar el Plaza / el Gardens es parte del costo. |
| 1 de 3 al azar (485.5 / 487.5 / 486.5) y no se apilan copias (103.4.c, TR 402.1) | candidatas 1 y 4 lo llevan en el **primer** `notable`, con la fórmula del proyecto. |
| BURST tiene que llegar a 8 con sus propias cantidades | ninguna es BURST. La ALT_WIN llega a **10 ≥ 7** con las cantidades que declara, contado arriba. |
| `820.1.c.3` mató "Repeat a 0 = infinito" | no se resucita; se cita como refutación. |

---

## Estado final

| # | id | clase | veredicto |
|---|---|---|---|
| — | `hextech-disc-defender-mech-token` | ENGINE | **corregida** — uniqueness falsa (son 5 readers de gear) y `floor` mal aplicado (3 Discs dan 2.5, no 2) |
| — | `matriarch-of-war-empower-ready` | ENGINE | **corregida** — la misma uniqueness falsa: Miss Fortune también destapa a la leyenda, en Body/Order |
| — | `sona-viktor-opponent-turn` | ENGINE | **corregida** — el rider de Targon's Peak sube a `notable` con el tope de 469.1 / 466.5 |
| — | `heimerdinger-vanguard-armory-recruits` | ENGINE | **corregida** — cerrada la refutación de dominio de #46, más el rider `VEN-068` que sí llega a nueve |
| 1 | `plaza-armory-miss-fortune` | ALT_WIN | **verified** |
| 2 | `miss-fortune-defender-hextech-double` | ENGINE | **verified** |
| 3 | `dominus-xerath-henge-removal` | ENGINE | **verified** |
| 4 | `gardens-becoming-wuju-xp-faucet` | ENGINE | **verified** |
| 5 | `targons-peak-sona-reaction-runes` | — | **refutada** (469.1 + 466.5: un evento, no un motor); su hallazgo se aplica como corrección |

**Ninguna resultó INFINITE.** Ninguna lectura de reglas nueva archivada: las cuatro preguntas que
asomaron las contesta el propio reglamento — la de la leyenda con 107.4.c + 415.1 + el ejemplo de
355.10.a, la del tope del Targon's Peak con 466.5 + 469.1, la del XP del Gardens con 381 + 411.1 (y sin
que el motor dependa de cuál lectura gane), y la de "ready ilimitado" con 103.1.b.4.

**Catálogo: 127 entradas, las 127 `verified`.**
