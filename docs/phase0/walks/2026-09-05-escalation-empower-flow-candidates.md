# Hand walk — las 4 candidatas de la lente de escalada Empower/Flow/Level (issue #34)

Fecha: 2026-09-05. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt`. Sesión: `rc-walk36`.

**Resultado: 4 de 4 verified. 0 refutadas. 2 reescritas** (candidatas 3 y 4, las dos hacia arriba).
**Ninguna resultó INFINITE.** Los tres verdictos estructurales de #34 se confirmaron abriendo las
reglas, no heredándolos.

---

## Bloque 0 — cada regla citada, abierta y pegada

### Empower / Empowered

- **827.1** — *"Empower is an Activated Ability keyword."*
- **827.1.b** — *"Empower has a cost to activate and Empowers the source of the ability when the cost is paid."*
- **827.1.c.1** — *"Empower is functionally short for '[Cost]: Empower this. Play only if not Empowered.'"*
- **828.1.b.1** — *"It is functionally short for 'While I have the Empowered status, this card gains \"[Text]\".'"*
- **828.1.c** — *"As long as the Game Object has the Empowered status, then the Dependent Ability will be active."*
- **441.1.a** — *"Empowered is a binary state. A Game Object is Empowered or it isn't."*
- **441.1.b** — *"An Empowered Game Object can not be Empowered."*
- **441.1.c.1** — *"Some effects may grant a Game Object permission to be Empowered multiple times. Such an effect ignores this restriction."*
- **441.2** — *"'Empowered' is a state for Game Objects on the board that other game effects and abilities can reference."*
- **441.2.a** — *"When a Game Object becomes Empowered as a result of the Empower game action, that is an event that can similarly be referenced by game effects and abilities."*
- **441.3.a** — *"Players may only Empower Game Objects when directed to by Game Effects."*

### Conquer y Hold effects — y el ejemplo trabajado que nombra a Reckoner's Arena

- **383.4.c** — *"Conquer Effects are Triggered Abilities whose Condition includes a Unit participating in, and successfully Conquering a Battlefield."*
- **383.4.c.1** — *"These are commonly structured as 'When I conquer…' and 'When you conquer…'"*
- **383.4.c.2.a** — *"The Conquer Abilities of Units are put on the Chain as Pending Items after the Unit(s) these effects correspond to are present at a Battlefield when a player gains control of it and gains 1 Victory Point from Conquering."*
- **383.4.c.2.c** — *"If the act of gaining one point from Conquering is negated or replaced in any way, the Conquer Effect will still trigger."*
- **383.4.d.1** — *"These are commonly structured as 'When I hold…' or 'When you hold…'"*
- **383.4.g.1**, **ejemplo trabajado, por nombre**:
  > *"Reckoner's Arena reads 'When you hold here, activate the conquer effects of units here.' For each
  > unit at the battlefield, you will check the trigger condition of their conquer effects to see if the
  > condition has been fulfilled, **treating the conquer portion of the condition as having been
  > fulfilled**. If all of the conditions are fulfilled for a conquer effect, it is placed on the chain as
  > if it had just triggered. If any of the non-conquer parts of the condition are not fulfilled, it will
  > not be placed on the chain."*

  Es la cita más fuerte posible para las candidatas 1 y 2: Riot escribe la interacción con la carta por
  nombre. Nasus no tiene partes no-conquer en su condición, así que siempre entra a la chain.

### Puntos

- **194.1.c** — *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more points."*
- **469.2** — *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn during their Beginning Phase."*
- **470** — *"A player may only Score, from either method, once per Battlefield per turn."*
- **471.1.a.1** — *"Notably, points Gained from sources that are not Conquer are not beholden to these restrictions."*
- **471.1.b.1** — *"If the player has Scored every Battlefield this turn, that player Gains the Final Point. If the player has not Scored every Battlefield this turn, that player draws a card instead."*
- **472** — *"When a cleanup occurs and a player has accrued Points greater than or equal to the Victory Score for their Mode of Play, and if they have more points than any opponent, they Win the Game."*
- **485.3** — Duelo: **Victory Score: 8**. **485.4** — **Battlefield Count: 2**.

Las readings ya ruleadas que estas dos entradas heredan sin abrir nada nuevo: **R1 = A con stacking**
(2026-09-03), **R2 = A** (2026-09-03), **R8 = A** (2026-09-04).

### Flow y Level

- **829.1.b** — *"It is functionally short for 'You may play this from your trash for its flow cost. Then banish it.'"*
- **829.1.b.1** — *"Banishing the spell in this way is a delayed replacement effect. If the spell would leave the chain after becoming a finalized chain item, and leaving the chain wasn't instructed by its own execution, banish it instead."*
- **824.1.b.1** — *"It is functionally short for 'While you have [N] or more XP, this card gains \"[Text]\".'"*
- **824.1.d** — *"The Dependent Ability will be Inactive as soon as the controlling player has less than [N] XP."*
- **730.2** — *"To Spend XP, reduce the value of XP marked on the Player spending it."*

### Exhaust, ready y estructura del turno

- **414.1.b** — *"A Game Object that is already Exhausted cannot be Exhausted again."*
- **414.4** — *"When Exhausting is listed as a Cost, then the Action must be able to be completed for the cost to be paid."*
- **315.1.b** — Awaken: *"The Turn Player readies all Game Objects they control that are able to be readied."*
- **143.4** — *"Units enter the Board exhausted."*
- **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."*
- **103.3.a** — Rune Deck: **12 Rune Cards.**
- **103.1.b** — el mazo hereda la Domain Identity de la leyenda.

### Battlefield

- **485.4.a**, **485.5**, **486.5**, **487.5**, **103.4.c** — igual que en el walk de #36.
- **190.1** / **190.6.d** — un battlefield que traés arranca sin Controller y su *"While you control"* está apagado.

### Ban check

Las 33 cartas de las once candidatas, grepeadas una por una contra `[BANNED` en el corpus:
**cero coincidencias**. `VEN-046 Nasus, Ascended` tampoco es `[Unique]` — el pool tiene exactamente
tres cartas `[Unique]` (SFD-190, SFD-191, SFD-192), así que 2 Nasus son legales por 103.2.b.

---

## Bloque 1 — los tres verdictos estructurales de #34, re-medidos

### A. No hay INFINITE en Empower — **CONFIRMADO**

441.1.a + 441.1.b cierran la puerta por texto: el estado es binario y un objeto Empowered no puede
volver a serlo. Todo motor tiene que **disempowerear** para volver a cobrar.

Corrí `grep -i disempower` de nuevo: **12 resultados**, con dominios:

| carta | tipo | dominio |
|---|---|---|
| VEN-035 Sanction | Spell | Calm |
| VEN-037 Tomb-Raider Barbara | Unit | Calm |
| VEN-054 Questionable Tome | Gear | Mind |
| VEN-082 Profiteer | Unit | Body |
| VEN-087 Hextech Disc | Gear | Body |
| VEN-099 Tornado Warrior | Unit | Chaos |
| VEN-127 Lacerate | Spell | Order |
| VEN-133 Glowstone | Gear | Order |
| VEN-143 Master of Shadows | Legend | Fury/Chaos |
| VEN-151 Soul's Reflection | Legend | Mind/Chaos |
| VEN-153 Matriarch of War | Legend | Body/Order |
| VEN-155 Heart of the Tempest | Legend | Order/Chaos |

Las siete que se auto-disempowerean como parte de un coste activado **llevan `:rb_exhaust:` en ese
mismo coste**, así que el techo es 1 por turno por carta (315.1.b sólo las readya en tu Awaken). Y la
única excepción impresa, `VEN-134 Kayle, Justified` (*"I can be [Empowered] up to three times"*, que es
el permiso de 441.1.c.1), **está topeada en tres por su propio texto**. Confirmado: no hay INFINITE.

### B. `[Flow]` no se repite — **CONFIRMADO, con una corrección al grep del issue**

829.1.b.1 hace del banish un replacement effect demorado, así que no se esquiva mandándolo al trash.

El issue corrió `grep -i 'from your banish\|from banishment\|in your banish'` y midió **0**. Corrí ese
mismo grep (**0**, confirmado) **y uno más ancho que el issue no corrió**, `banished with`, que da
**3 cartas**:

```
SFD-090 The Zero Drive   : "Play all units banished with this"
UNL-148 Cursed Sarcophagus: "Play a unit banished with this"
UNL-181 Virtuoso          : "if there are four spells banished with me, put each in its trash"
```

Las tres recuperan **sólo lo que ellas mismas banishearon**. Un hechizo `[Flow]` lo banishea el
replacement effect de 829.1.b.1, no ellas. **Ninguna lo trae de vuelta.** El verdicto B se sostiene y
ahora tiene el grep que lo prueba en serio.

### C. `[Level N]` se pelea con gastar XP — **CONFIRMADO**

824.1.b.1 + 824.1.d + 730.2, verbatim arriba. Gastar XP apaga los Level ya encendidos. No es tensión
de diseño blanda: es 824.1.d aplicándose.

---

## Candidata 1 — `nasus-ascended-sentinel-arena-hold` · BURST · **VERIFIED**

`VEN-046` Nasus, Ascended ×2, `UNL-087` Blue Sentinel ×3, `OGN-286` Reckoner's Arena ×1. Calm/Mind.

Nasus dispara `When I conquer`, no `When I hold`. Reckoner's Arena es el puente y **383.4.g.1 lo
ejemplifica por nombre**. R8 = A hace del propio trigger del Arena uno de *"your hold effects"*, así
que Blue Sentinel lo multiplica; R1 = A con stacking da 1+K corridas; R2 = A saca los puntos de Nasus
del tope de 470.

```
puntos por Hold = 1 + N x (1 + K)
                  ^   ^^^^^^^^^^
                  |   el trigger del Arena corre 1+K veces (R1), y cada corrida
                  |   activa el conquer effect de cada uno de los N Nasus
                  el Score del Hold en si (469.2), topeado por 470

N=2, K=3  ->  1 + 2 x 4 = 9
```

Vecinos, escritos para no repetir el error que la auditoría del 2026-09-04 encontró en cuatro BURSTs:
**N=2, K=2 da 7** y N=1, K=3 da 5.

**Un margen que el issue no declaró y que vale la pena:** `N x (1+K) = 8` **por sí solo**. Los 8 puntos
llegan de los Gains por habilidad de Nasus aunque el punto del Hold no llegue nunca, y 471.1.a.1 los
exime de las restricciones del Final Point. La entrada no depende del punto del battlefield.

Coste: 2 Nasus (16E + 2P) + 2 Empower (16E) + 3 Sentinel (12E + 3P) = **44 Energy + 5 Power**. Con
12 runas (103.3.a) el techo es ~12 Energy por turno, así que **es un armado de seis turnos**, no un
turno caro; **441.2** hace que Empowered persista y por eso el gasto se reparte.

Contra `ahri-blue-sentinel-hold`, que ya está en el catálogo con la misma fórmula: lo que cambia es la
**fragilidad**, que es literalmente lo que el `notable` de Ahri se marca a sí mismo. `OGN-066` Ahri es
**M4 pelada**; `VEN-046` Nasus es **M8 con [Deflect 2]** (el rival paga 2 Power por cada spell o
habilidad que quiera apuntarle). Nasus es la versión cara y dura de la BURST frágil catalogada — y hay
que decir el precio: 44E contra 23E.

Contra la candidata 2: ésta gana en un **Hold**, sin combate. Ésa gana en un **Conquer**. El catálogo
ya lleva las dos caras del paquete Ahri (`ahri-blue-sentinel-hold` y `skyfall-ahri-conquer`), así que
las dos conviven por el mismo motivo.

Leyenda: Calm/Mind. Cuatro existen (OGN-255, SFD-189, UNL-189, VEN-145). **`VEN-145` Curator of the
Sands** es la del paquete: tag Nasus, y *"When you play a unit, gear, or activated ability with Energy
cost 7 or more, you may exhaust me to ready up to 2 runes"* — el cuerpo de Nasus (E8) **y su Empower
(E8, Activated Ability por 827.1)** califican los dos.

Battlefield: el Arena es uno de tus tres (485.4.a), sorteado 1 de 3 en Duelo (485.5) y Skirmish
(487.5), elegido en Match (486.5), y 103.4.c prohíbe llevar dos del mismo nombre. Va en el primer
`notable`.

**VERIFIED.**

---

## Candidata 2 — `nasus-ascended-brambleback-conquer` · BURST · **VERIFIED**

`VEN-046` ×2, `UNL-029` Red Brambleback ×3. Fury/Calm.

Misma fórmula, **1 + N × (1 + K) = 9**, y sin R8 ni battlefield: Brambleback dobla conquer effects
directamente y el de Nasus ya es uno. 383.4.c.2.a pone la habilidad de cada unidad presente en la
chain cuando el jugador gana control y el punto del Conquer.

**383.4.c.2.c es un regalo que el issue no usó:** *"If the act of gaining one point from Conquering is
negated or replaced in any way, the Conquer Effect will still trigger."* Así que aunque 471.1.b.1
convierta el punto del Conquer en un robo (cuando ya estás a 1 de la victoria), **los 8 de Nasus
siguen llegando**, y 471.1.a.1 los exime por ser Gains no-Conquer.

Contra `skyfall-ahri-conquer`, que ya está catalogada: aquella necesita `SFD-030` Skyfall of Areion
para convertir el hold effect de Ahri en conquer effect, y son **3 cartas distintas (3+3+2 copias)**.
Nasus **no lo necesita**: su trigger ya es `When I conquer`. **2 cartas distintas, 5 copias.** Como
`planDeck` rankea por *copias a agregar*, la diferencia se ve en el panel.

Lo que sí paga y la candidata 1 no: hay que **conquistar**, o sea establecer Control de un battlefield
que no controlás con las cinco unidades presentes. Coste 2 Nasus (16E + 2P) + 2 Empower (16E) +
3 Brambleback (12E + 3P) = **44 Energy + 5 Power**.

Leyenda: **`VEN-139` Rogue Assassin es la única Fury/Calm del pool** (verificado por grep sobre las 94
leyendas) — mismo cierre que ya usa `skyfall-ahri-conquer`.

**VERIFIED.**

---

## Candidata 3 — `matriarch-of-war-empower-ready` · ENGINE · **VERIFIED, REESCRITA**

`VEN-153` Matriarch of War (leyenda) ×1, `VEN-087` Hextech Disc ×2. Body/Order.

**La reescritura, y es de fondo.** El issue proponía a la Matriarca con `VEN-074` Legion Marauder y
`VEN-124` Escaped Grayback como fuentes de Empower. Los abrí: los dos son **`[Empower]` de una sola
vez por copia** — 827.1.c.1, *"Play only if not Empowered"*, y nada los disempowerea. Con 3 copias de
cada uno son **6 empowers en toda la partida**, o sea 6 readies y se acabó. Eso no es un motor.

La fuente sostenible en Body/Order la da el propio corte de disempower del bloque 1: **`VEN-087`
Hextech Disc es Body, su `[Empower]` cuesta sólo `:rb_exhaust:` y su otra habilidad se
auto-disempowerea.** Eso arma un ciclo de dos tiempos:

```
Turno impar (Disc A): Awaken readya A (disempowered).  [Empower] de A: exhaust -> A queda Empowered.
                      La Matriarca: "When you empower something else, empower me" -> se Empowera GRATIS.
                      Su habilidad: Disempower me, 1 rainbow, exhaust -> READY A UNIT.
Turno par   (Disc A): Awaken readya A (Empowered). "Disempower this, 1 Energy, exhaust: Mech token."
                      -> 3 Might Mech a tu base. A vuelve a estar disempowered y exhausted.
```

Con **dos Discs desfasados**, cada turno tenés uno en cada mitad del ciclo:

```
por turno: 1 unidad readyada  +  1 token Mech de 3 Might
coste    : 1 Energy (habilidad del Disc) + 1 Power rainbow (la Matriarca)
setup    : 2 Hextech Disc = 8 Energy + 2 Power.  La Matriarca es la leyenda: gratis.
```

**Techo honesto: una vez por turno, y no se destapa.** El pago de la Matriarca lleva `:rb_exhaust:`
sobre la leyenda, y *"Ready a unit"* **no la alcanza a ella** — una leyenda no es de tipo `unit`
(`Legend` es su propio tipo en el corpus y en `src/types.ts`). El único destapador del pool es
`SFD-210` Hall of Legends (*"When you conquer here, you may pay 1 Energy to ready your legend"*) y va
atado a conquistar y a que ese battlefield sea el sorteado. Por eso ENGINE y no más.

Qué compra el ready: un cuerpo que ya gastó su exhaust — un segundo Standard Move en el turno (144.2
cobra el exhaust como coste) o un segundo uso de una habilidad con exhaust.

Rider fuera de `uses`: **`SFD-171` Renata Glasc, Industrialist es una UNIT de Order** (no una leyenda),
así que entra en Body/Order y hace que los Mech entren **ready** (R25 = A), listos para moverse el
mismo turno. `SFD-089` Rumble, Scrapper **no** entra: es Mind.

**VERIFIED** con el motor reescrito.

---

## Candidata 4 — `hextech-disc-defender-mech-token` · ENGINE · **VERIFIED, REESCRITA HACIA ARRIBA**

`VEN-087` Hextech Disc ×2, `VEN-149` Defender of Tomorrow (leyenda) ×1. Mind/Body.

El issue la marcó *"confianza baja"* y midió **1 token por turno por 2 Energy**. Conté el ciclo entero
y **el ritmo real es el doble**, con la cantidad de Discs corregida.

Cada Mech cuesta **dos readies** del Disc: uno para pagar el `[Empower]` (exhaust) y otro para pagar la
habilidad del token (`Disempower this, 1 Energy, exhaust`), porque 414.1.b + 414.4 impiden exhaustear
lo ya exhausteado. Los readies disponibles por turno son:

```
readies por turno = (1 por Disc, del Awaken 315.1.b)  +  2  (Defender of Tomorrow [Empowered])
Mechs por turno   = floor( (#Discs + 2) / 2 )

#Discs = 1 -> 1 Mech    #Discs = 2 -> 2 Mechs    #Discs = 3 -> 2 Mechs
```

**Dos Discs es el número eficiente** y el tercero no compra nada — eso es lo que el issue no contó.
El turno estacionario:

```
Awaken   : ambos Discs ready y disempowered
Main     : [Empower] de A (exhaust) y [Empower] de B (exhaust)   -> los dos Empowered y exhausted
           Defender [Empowered]: 1 Energy, exhaust: Ready 2 gear -> A y B ready otra vez
           A: disempower + 1 Energy + exhaust -> Mech
           B: disempower + 1 Energy + exhaust -> Mech
TOTAL    : 2 tokens Mech de 3 Might por 3 Energy, todos los turnos
```

`VEN-062` Hextech Formula (*"exhaust: Empower another gear"*) mueve uno de los exhausts a otra carta
pero **no lo elimina**, así que no cambia el techo; queda como nota, no en `uses`.

**`VEN-149` Defender of Tomorrow es la ÚNICA carta del pool que readya gear** — corrí
`grep -iE 'ready [0-9a-z]* ?gear'` sobre las 935 y devuelve exactamente esa línea. Sin ella no hay
entrada: el Awaken solo da 1 Mech cada dos turnos por Disc. Hay que Empowerearla primero (E2 +
2 Power rainbow, una vez).

Los tokens entran a tu base **exhausted** (143.4): Renata Industrialist es Order y **no** entra en
Mind/Body. `SFD-089` Rumble, Scrapper (Mind) **sí** entra y les da +1 Might, o sea Mechs de 4 — rider
en `prerequisites`, no en `uses`.

Contra `SFD-089` Rumble, Scrapper solo, que fabrica 1 Mech **por Hold**: ésta no depende de scorear ni
de un battlefield.

**VERIFIED** con el ritmo corregido hacia arriba.

---

## Estado final

| # | id | clase | veredicto |
|---|---|---|---|
| 1 | `nasus-ascended-sentinel-arena-hold` | BURST | verified |
| 2 | `nasus-ascended-brambleback-conquer` | BURST | verified |
| 3 | `matriarch-of-war-empower-ready` | ENGINE | verified, reescrita (motor) |
| 4 | `hextech-disc-defender-mech-token` | ENGINE | verified, reescrita hacia arriba (ritmo) |

- **Ninguna resultó INFINITE**; 441.1.a/b lo cierran por texto y el corte de las 12 cartas de
  disempower lo confirma carta por carta.
- **Ninguna lectura de reglas nueva archivada.** Las dos entradas de puntos se paran enteras sobre
  R1/R2/R8, ya ruleadas, más el ejemplo trabajado de 383.4.g.1.
- **Una corrección al grep del issue** (`banished with` faltaba, da 3 cartas, y las tres son de alcance
  propio) y **dos correcciones de aritmética** (candidatas 3 y 4).
