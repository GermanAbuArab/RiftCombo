# Hand walk — las 7 candidatas de la lente de muerte y retorno (issue #36)

Fecha: 2026-09-05. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt` (935 cartas, gallery API 2026-09-04, errata aplicada).
Sesión: `rc-walk36`.

**Resultado: 7 de 7 verified. 0 refutadas. 3 reescritas** (candidatas 3, 6 y 7).
**Ninguna resultó INFINITE** — el verdicto estructural de #36 se confirma abajo, con la razón medida
de nuevo y no heredada.

---

## Bloque 0 — cada regla que estas entradas citan, abierta y pegada

Se hizo primero y en bloque, como el walk de las nueve del 2026-09-04, porque la auditoría de citas
encontró tres entradas que citaban una regla que decía lo contrario de lo que afirmaban.

### Deathknell y matar como coste

- **808.1.b.1** — *"[Effect] is the rules text for the specific instance of Deathknell. This is referred to as the Deathknell effect."*
  → *"your [Deathknell] effects"* de Karthus tiene un referente en el reglamento; no es prosa.
- **808.1.c** — *"It is functionally short for \"When I die, [Effect].\""*
- **808.1.d.2** — *"The trigger will be added to the chain as a Pending Item before the card with an ability that triggers on its own death is moved to the trash due to a Kill instruction or a Cleanup."*
- **808.1.d.3** — *"Before the card is moved to the Trash, note its location, its attributes, and any other details related to the effect of its triggered ability to process the trigger after it has been Finalized."*
- **808.2** — *"Each instance of Deathknell a Permanent may have will trigger separately."*
- **428.1.a.1** — *"Active Kill is when the action is taken when instructed by a game effect **or as a cost** for a card or ability."*
- **428.1.a.1.b** — *"When a unit with a Deathknell or other ability that triggers on its own death is to be put in the Trash due to a Kill Instruction, it first has any such ability added to the chain as a Pending Item."*
- **365.1** — *"Passive Abilities of Permanents are typically only active while on the Board."* → Karthus tiene que estar en mesa en el instante del kill.

### El apilado de Karthus, corrido de nuevo

`grep -n "redundant"` sobre las Core Rules da **exactamente siete líneas**, y las siete son de keyword:
805.4 (Accelerate), 810.2 (Ganking), 811.4 (Hidden), 815.2 (Tank), 816.2 (Temporary), 822.2 (Ambush),
826.5 (Backline). **No hay regla general de redundancia para pasivas repetidas.** El apilado no
necesita lectura nueva: **R1 = A con stacking** (ruleado 2026-09-03) ya cubre la redacción
*"trigger an additional time"* palabra por palabra, sobre Blue Sentinel.

Karthus **no es `[Unique]`**: 2–3 copias son legales (103.2.b, *"Your Main Deck can include up to 3
copies of the same named card"*).

### Equip como outlet de sacrificio repetible

- **377** — *"Activated Abilities are **repeatable effects** with a cost."* ← **ésta es la viga**, no 818.4.
- **378** — *"The controlling player chooses when and whether to activate an Activated Ability."*
- **381** — *"All Activated Abilities can only be activated on the Controlling Player's Turn and during an Open State."*
- **818.1.c.2** — *"Equip is functionally short for \"[Cost]: Attach this gear to a unit you control.\""*
- **818.1.c.3** — *"Equip costs may include both resource costs and non-resource costs."*
- **434.1.f** — *"Attaching a card to a new Top-Most Card will cause it to Detach from the card to which it is currently Attached."*
- **434.1.g** — *"Attaching a card to its current Top-Most Card will not have any effect."*
- **434.1.h** — *"If a Game Effect instructs a player to Attach a card to its current Top-Most Card, nothing additional happens."*
- **151.2** — la habilidad activada de un gear se ejecuta en la Main Phase del controlador.

**CORRECCIÓN a #36.** El issue apoyaba el "sin tope por turno" en **818.4** (*"Multiple instances of
Equip are equivalent to multiple Activated Abilities and can each be activated separately"*). Abrí
818.4 y **habla de un gear que imprime VARIAS instancias de Equip**, no de repetir una. La regla que
sí dice lo que la entrada necesita es **377**: las habilidades activadas son repetibles por
definición, y el Blade no imprime exhaust ni "once per turn" en su coste. Las entradas citan 377.

434.1.g/h además hacen que re-equipar al MISMO portador sea legal pero inútil, así que el Blade se
alterna entre dos cuerpos y cada activación es un attach real.

### Equipment que presta texto, y qué pasa cuando el portador muere

- **434.1.c** — *"The Top-Most card has all Effect Text of all cards Attached to it appended to its Rules Text."*
- **435.4.a** — *"If the Detached card was a Gear and this causes it to become present at a Battlefield, it will be Recalled during the next Cleanup."*
- **435.4.b** — *"If the Attached card was Detached because the Top-Most Card changed zones from a board zone to a non-board zone, then the location that the Attached Card will Detach to is the last location the Top-Most Card was at before changing from a board zone to a non-board zone."*
- **149.3** — *"If an unattached non-Unit Gear is at a Battlefield for any reason during a cleanup, then it is recalled to its controller's Base as a corrective action."*

### Timing del turno (candidata 1)

- **315.1.b** — Awaken: *"The Turn Player readies all Game Objects they control that are able to be readied."*
- **315.2.a.1** — *"At the start of Beginning Phase game effects take place."*
- **315.2.b.2** — Scoring Step: *"The Turn Player Holds all Battlefields they Control."*
- **315.3.b** — Channel Phase: *"The Turn Player channels 2 runes from their Rune Deck."*
- **315.4.b** — Draw Phase: *"The Turn Player draws 1."*
- **316.3** — Main Phase: *"Each player's Rune Pool empties. Any unspent Energy and Power are lost."*
- **816.1.b** — *"It is functionally short for \"At the start of this permanent's controller's Beginning Phase, before scoring, kill this.\""*
- **816.3** — *"Temporary, and whether or not a permanent has Temporary, is a characteristic of the permanent and may be checked or referenced by other Game Effects."*
- **431.1.a** — *"If a player must Draw cards in excess to the number of cards in their Main Deck, they will Draw as many as possible, perform this action, then Draw the remaining amount instructed."*

El orden queda fijado: **Awaken → Beginning (Beginning Step, Scoring Step) → Channel → Draw → Main.**
La muerte por `[Temporary]` y su Deathknell caen en el Beginning Step, **antes** del Draw Phase.

### Exhaust, tokens y Power arcoíris (candidata 2)

- **414.1.b** — *"A Game Object that is already Exhausted cannot be Exhausted again."*
- **414.4** — *"When Exhausting is listed as a Cost, then the Action must be able to be completed for the cost to be paid."*
- **813.1.b** — *"Reaction grants the corresponding card or effect all abilities and permissions of Action."*
- **135.2.e.5.b** — *"When Added to a player's Rune Pool, [A] can be spent to pay a Power cost of any Domain."* ← el Power del Gold paga el coste de **Order** del Blade.
- **163.2.b** — *"Some Power is Universal and can be used to pay for costs of any Domain."*
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."*

### Cuerpos, ubicación y The Grand Plaza (candidatas 4 y 6)

- **143.4** — *"Units enter the Board exhausted."*
- **144.1.a** — el Standard Move *"can be done any time during a player's Main Phase."*
- **144.2** — *"Exhausting the Unit is the Cost for this action."*
- **355.2.a** — *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."*
- **439.2.b.1** — *"Permanents will be Created at any location on the Board that they can be played to."*
- **190.3.a.1** — *"Units moving to or being played to a battlefield apply Contested status if that battlefield is not already Contested and that Unit's controller does not already control that battlefield."* → mover a un battlefield que YA controlás no aplica Contested.
- **190.1** — *"Control is established over Battlefields through the course of play."*
- **190.6.d** — *"'You' in a battlefield's abilities refers to the battlefield's Controller"*, y sin Controller *"all such instructions are ignored"*.
- **195** — *"A player also wins the game if an effect instructs them to do so."*
- **485.4** — Duelo: **Battlefield Count: 2**. **485.4.a** — *"Each player provides three (3) Battlefields... Only 1 will be used, chosen during setup."*
- **485.5 / 487.5** — *"Each player **randomly selects** one (1) of their three (3) Battlefields."*
- **486.5** — *"Each player **selects** one (1) of their three (3) Battlefields."*
- **103.4.c** — *"Cannot include more than one of a Battlefield of the same name when there are more than one required for the deck."*
- **103.3.a** — Rune Deck: **12 Rune Cards.**

### La condición del Grand Plaza — el hallazgo que reescribió la candidata 6

**383.2.a**, ejemplo trabajado de Loose Cannon:

> *"Loose Cannon reads 'At the start of your Beginning Phase, draw 1 if you have one or fewer cards
> in your hand.' The 'if you have one or fewer cards in your hand' conditional statement is **not
> immediately after the trigger condition, so it is part of the effect and not the condition**."*

En The Grand Plaza (*"When you hold here, **if you have 7+ units here**, you win the game"*) el `if`
**sí** está inmediatamente después de la condición de disparo, así que por el contraste del propio
ejemplo **es parte de la Condición**. Y **383.2.c**: *"The Condition of a Trigger is evaluated after a
potentially inciting event has been processed."* → **la cuenta de 7 se mide en el instante del Hold**,
no cuando el disparo resuelve.

Consecuencia práctica: un cuerpo que llega en el MISMO Hold (el Sprite de Trevor Snoozebottom) **no
suma para ese Hold**. La candidata 6 se recontó con eso y se salva por otra vía (ver abajo). No hizo
falta archivar ninguna lectura ni apoyarse en 383.3.d.

### El reflexive trigger de Death from Below (candidata 7)

- **387.1** — *"Reflexive Triggers can be recognized by the phrase 'Do this:' or 'Do one of the following:'."*
- **388.1** — *"A new ability is created and added to the chain as a Pending Item."*
- **359.3.d** — *"execute the game effect of the spell, from top to bottom of the rules text of the card **and then place the card in the Trash of the owning player**."*
- **428.5.b** — *"A spell or ability that contains a Kill instruction is responsible for Killing the Unit or Gear."*
- **383.2.c.1**, ejemplo trabajado, **por nombre**:
  > *"Immortal Phoenix says 'When you kill a unit with a spell, you may pay [1][C] to play me from your
  > trash.' This ability triggers if Immortal Phoenix is in your trash immediately after you kill a unit
  > with a spell, **even if the unit you killed with a spell was that Immortal Phoenix**."*

**Esto reescribe la candidata 7 hacia arriba.** El issue dijo *"la lectura que evité a propósito"*:
matar al propio Phoenix con Death from Below y preguntarse si su disparo funciona desde el trash
contra 141.1.b.2. **No hay nada que evitar: Riot contesta esa pregunta exacta, con la carta nombrada.**
La entrada la usa y no archiva lectura.

### Chequeo de bans

Las **33 cartas** citadas por las once candidatas de #36 y #34 se grepearon una por una contra el
marcador `[BANNED` de `data/corpus_flat.txt`. **Cero coincidencias.** (El corpus lleva 11 marcadores
en total; ninguno cae en esta lente.)

---

## Bloque 1 — los dos verdictos estructurales de #36, re-medidos

### A. Los dos outlets de sacrificio repetibles: CONFIRMADO, con la cita corregida

`SFD-178 Blade of the Ruined King` — `[Equip] — :rb_rune_order:, Kill a friendly unit`. Sin exhaust,
sin tope impreso. La regla que lo sostiene es **377** (habilidades activadas son repetibles), no 818.4.
`UNL-186 Death from Below` — ver candidata 7.

### B. No hay INFINITE en la familia: CONFIRMADO, y por una vía que #36 no había corrido

El issue leyó las 65 líneas de `trash`. Yo corrí el corte que de verdad importaba para las candidatas
de Karthus, que son **mono-Order**:

```
grep -iE 'from your trash|from the trash' data/corpus_flat.txt | awk -F'|' '$4 ~ /Order/'
```

Nueve cartas, leídas enteras:

| carta | por qué no loopea |
|---|---|
| `OGN-226` Spectral Matron | `When you play me` — una vez por copia |
| `SFD-165` Glasc Mixologist | Deathknell — una vez por copia (es la candidata 5) |
| `UNL-167` Starhound | `When you play me` — una vez por copia |
| `UNL-168` Undying Loyalty | hechizo, se consume |
| `VEN-116`, `VEN-127`, `VEN-148`, `VEN-154`, `VEN-156` | `[Flow]` — **829.1.b.1** los banishea; segundo uso y se acabó |

**Ninguna recursión gratis y repetible en Order.** El pool no tiene con qué realimentar la
candidata 2.

**El caso límite que sí perseguí, porque era el único que podía dar INFINITE.** Con `SFD-201
Chem-Baroness` de leyenda (Mind/Order), *"While your score is within 3 points of the Victory Score,
your Gold [Add] an additional :rb_energy_1:"*, la candidata 2 pasa a ser **Energy-positiva**. El pase
más barato que encontré:

```
-2 Energy -1 Power   Undying Loyalty: juega un Honest Broker gratis desde el trash
-1 Power             [Equip] del Blade, coste = matar al Broker
+3 Power +3 Energy   Deathknell x3 -> 3 Gold ready (Renata) -> 3 rainbow + 3 Energy (Chem-Baroness)
---------------------------------------------------------------------------------
NETO: +1 Energy, +1 Power, y -1 CARTA (Undying Loyalty se consume)
```

Cuesta **una carta por pase** y devuelve 1 Energy + 1 Power. Contra el ledger de #21
(`docs/phase0/walks/2026-09-04-loop-budget-ledger.md`), donde el recurso escaso es el **draw** y una
carta extra cuesta 1 Energy + 1 Mind Power, el pase es **a lo sumo empate y sin motor de reciclado que
lo recupere**: Undying Loyalty no se recicla sola y hay 3 copias (103.2.b). **No cierra. Confirmado
bounded.** Queda escrito para que nadie lo re-derive.

---

## Bloque 2 — el multiplicador: `OGN-236 Karthus, Eternal`

```
OGN-236 | Karthus, Eternal | Unit | Order | E3 P1 M3 | Your [Deathknell] effects trigger an
additional time. [Tags: Spirit, Karthus, Shadow Isles]
```

Cero apariciones en `combos.json` antes de hoy. Con **2 Karthus cada Deathknell corre 3 veces**
(R1 = A con stacking; el grep de `redundant` cierra que no hay regla general que lo impida). Karthus
tiene que estar en mesa en el instante del kill (365.1) — con el Blade, que mata de a uno, sobrevive.

---

## Candidata 1 — `karthus-leblanc-fragmented-temporary-draw` · ENGINE · **VERIFIED**

`OGN-236` ×2, `UNL-172` LeBlanc Fragmented ×1, `UNL-165` Shadow's Call ×1. Mono-Order.

`UNL-172` es el único Deathknell del pool con un bonus condicionado a *"If it's your Beginning
Phase"*, y `[Temporary]` es exactamente el efecto que mata ahí. La trampa 4 de `CLAUDE.md` (los
Temporary mueren antes del Scoring, 816.1.b) **es la condición de pago**, no el problema.

La condición se cumple literalmente: 816.1.b mata *"at the start of this permanent's controller's
Beginning Phase"*, 315.2.a.1 pone los efectos de inicio dentro del Beginning Step y 315.2.b es el
Scoring Step **después**, ambos dentro del Beginning Phase (315.2). Cuando el Deathknell resuelve,
es tu Beginning Phase.

```
Turno N   : LeBlanc, Fragmented   -3 Energy -1 Power
            Shadow's Call sobre ella   -2 Energy    ->  +2 cartas
Turno N+1 : Beginning Step: 816.1.b la mata antes de scorear
            Deathknell x (1 + 2 Karthus) = 3 instancias
            cada una "draw 2 instead"                ->  +6 cartas
            ------------------------------------------------------
            BRUTO 8 cartas por 5 Energy + 1 Power
            NETO  +6 cartas (gastaste 2: LeBlanc y Shadow's Call)
```

**El neto es el número honesto y el issue sólo daba el bruto.** Vecinos: 1 Karthus ⇒ 4 del Deathknell
(neto +4); 0 Karthus ⇒ 2 (neto 0, la línea no existe). El salto está en el segundo Karthus.

Refutaciones que la entrada declara: `UNL-090` LeBlanc, Everywhere at Once en el mismo battlefield la
apaga entera (R10 = A) — son dos LeBlanc distintas y son **anti-sinergia**; 431.1.a Burn Out, porque
las 6 cartas caen **antes** del Draw Phase (315.4.b); y si se reabriera R1 el multiplicador cae a ×1.

Trampas: sin ataque, sin `[Repeat]`, sin recall, sin runa reciclada; la Energía se gasta en Main
Phase (167); `[Temporary]` se usa al derecho.

**VERIFIED.**

---

## Candidata 2 — `karthus-honest-broker-blade-gold` · ENGINE · **VERIFIED**

`SFD-178` ×1, `OGN-236` ×2, `SFD-171` Renata Industrialist ×1, `SFD-155` Honest Broker ×3. Mono-Order.

Renata es **mecanismo, no descuento**: el Gold entra *exhausted* y su propia habilidad cobra un
exhaust, así que sin ella 414.1.b + 414.4 lo dejan **sin producir nada**. Es **R25 = A** (ruleado
2026-09-04 para Treasure Hunter, misma redacción *"play a Gold gear token exhausted"*).

```
-2 Energy            jugar Honest Broker
-1 Power de Order    [Equip] del Blade (attach a otro cuerpo), coste = matar al Broker
+3 Power rainbow     Deathknell x3 -> 3 Gold ready -> "Kill this, exhaust: [Add] 1 rainbow"
-----------------------------------------------------------------------------------
NETO por Broker: -2 Energy, +2 Power     con 3 Brokers: -6 Energy, +6 Power
```

El Power rainbow paga el coste de **Order** del Blade por **135.2.e.5.b**, así que el Blade se
autofinancia después del primer Power de siembra. 1 Karthus ⇒ +1 Power; 0 Karthus ⇒ 0 y no hay línea.

Contra el catálogo: `yeti-brambleback-renata-gold` da 6 Power **una vez por battlefield por turno**
(466.5.d/470); `treasure-hunter-industrialist-gold` da 1 Gold por movimiento. **Ésta no tiene tope de
evento**: el límite son las 3 copias del Broker y el Power de siembra.

Setup, que el issue no sumaba: Blade E3 P1 + Renata E4 P1 + 2 Karthus E3 P1 c/u = **13 Energy + 4
Power** de permanentes antes del primer Broker, y el Rune Deck son 12 runas (103.3.a), así que el
armado se reparte en varios turnos.

**VERIFIED.**

---

## Candidata 3 — `karthus-sacred-shears-blade-draw` · ENGINE · **VERIFIED, REESCRITA**

`SFD-172` Sacred Shears ×1, `SFD-178` ×1, `OGN-236` ×2. Mono-Order.

El `[Effect]` de un Equipment se **anexa al texto del portador** (434.1.c), así que cualquier unidad
tuya pasa a tener `[Deathknell] — Draw 1`, y Karthus la multiplica. Las Shears sobreviven al portador
por 435.4.b + 149.3 y se re-equipan por 1 Power de Order.

**La reescritura.** El issue declaraba *"2 Power de Order → 3 cartas, sin tope por turno"* y lo dejaba
ahí. Contra el ledger de #21, el Power vale ~9 Energy, así que **3 cartas por 2 Power es una tasa
mala** y hay que decirlo. Dos precisiones que el issue no traía:

1. **El primer cuerpo del turno cuesta 1 Power, no 2**, si las Shears ya venían puestas de un turno
   anterior. El 2 es la tasa de la SEGUNDA vuelta en adelante.
2. **El cuerpo natural es el Honest Broker de la candidata 2**, y ahí la tasa se da vuelta: un Broker
   con Shears muerto por el Blade da 3 Gold **y** 3 cartas por 1 Power (Blade) + 1 Power (re-equip),
   o sea **+1 Power neto, +3 cartas, −2 Energy**. Va en `prerequisites`, no en `uses`: el mecanismo
   de esta entrada es 434.1.c, no el Gold.

**El attach del Blade tiene que apuntar a un cuerpo distinto del que matás**: el objetivo se elige en
355.5 y el coste se paga después, así que apuntar al mismo lo vuelve ilegal en la resolución
(359.3.e.2) y perdés el attach. Alternar el Blade entre dos cuerpos lo resuelve sin preguntarle nada
al reglamento (434.1.f/g).

**VERIFIED** con la tasa corregida.

---

## Candidata 4 — `karthus-machine-evangel-renata-plaza` · ALT_WIN · **VERIFIED**

`OGN-293` The Grand Plaza ×1, `OGN-239` Machine Evangel ×1, `OGN-236` ×2, `SFD-171` ×1, `SFD-178` ×1.

```
-1 Power de Order   [Equip] del Blade matando a Machine Evangel
Deathknell x3 x 3 Recruits = 9 Recruits en tu base
Renata: entran READY (143.4 queda sobrescrito)
cada uno hace su Standard Move a la Plaza (144.1.a en tu Main Phase, 144.2 se exhaustea)
-> 9 cuerpos en la Plaza por 1 Power de Order, con el Evangel ya pagado (E5 + 1 Power)
   la barra es 7: sobran dos
```

Como la Plaza ya es tuya, mover ahí **no aplica Contested** (190.3.a.1). Los Recruits llegan
exhausted (144.2) pero el Awaken del turno siguiente (315.1.b) los readya antes del Hold, y la
condición del Plaza mide **presencia**, no estado.

Con la lectura del bloque 0 (la cuenta de 7 se mide en el instante del Hold, 383.2.a + 383.2.c) esta
candidata no cambia: los 9 cuerpos llegan en tu Main Phase, un turno **antes** del Hold.

Contra `grand-plaza-recruit-vanguard` (8 Recruits exhausted por 12 Energy en un turno): ésta pone
**9 ready por 1 Power** una vez que el Evangel está en mesa. Misma victoria, otra ruta, más barata en
el turno clave y más cara en el armado.

Fragilidad declarada: hay que sobrevivir el turno rival con 7+ cuerpos de 1 Might, y la Plaza es
simétrica. Battlefield: 485.4.a + 485.5/487.5/486.5 + 103.4.c, en el primer `notable`.

**VERIFIED.**

---

## Candidata 5 — `karthus-glasc-mixologist-double-reanimate` · ENGINE · **VERIFIED**

`SFD-165` ×1, `OGN-236` ×2, `SFD-178` ×1. Mono-Order.

1 Power de Order (Blade) ⇒ **3 unidades gratis desde el trash** (≤E3 y ≤1 Power). Con 1 Karthus, 2.

**Corrección al issue:** decía que los cuerpos entran a la base. El Mixologist **no nombra ubicación**,
así que 355.2.a deja elegir *"the controller's Base or a Battlefield the controller controls"*. Entran
**exhausted** igual (143.4) — Renata sólo alcanza a **tokens**, y estos son cartas.

No se le puede colgar `[Accelerate]`: *"ignoring its cost"* choca con 356.5.a, que es el razonamiento
por el que `reksai-sarcophagus-accelerated-recursion` eligió Cursed Sarcophagus y descartó a este
Mixologist. **Esta entrada es cuerpos, no tempo, y lo dice.**

Una sola vez por Mixologist (E5 + 1 Power cada uno, 3 copias ⇒ 9 cuerpos por partida).

**VERIFIED.**

---

## Candidata 6 — `leblanc-bashful-bloom-trevor-plaza` · ALT_WIN · **VERIFIED, REESCRITA**

`UNL-189` Bashful Bloom (leyenda) ×1, `UNL-090` LeBlanc Everywhere at Once ×1, `UNL-048` Trevor
Snoozebottom ×1, `OGN-293` ×1. Calm/Mind.

**La viga, y es una regla que el proyecto no había usado:** LeBlanc apaga el *disparo* de
`[Temporary]` (R10 = A), **no le saca el keyword**, y **816.3** dice que tener `[Temporary]` *"is a
characteristic of the permanent and may be checked or referenced by other Game Effects"*. Así que cada
Sprite que LeBlanc mantiene vivo **sigue contando** para el descuento de Bashful Bloom.

**La reescritura.** El issue cerraba la Plaza al 3er Hold **contando el Sprite que Trevor pone en ese
mismo Hold**. Por 383.2.a (ejemplo de Loose Cannon) + 383.2.c la cuenta de 7 es parte de la
**Condición** y se mide en el instante del Hold, así que ese Sprite **no suma para ese Hold**.
Recontado sin él:

```
antes del Hold k:  LeBlanc + Trevor  = 2
                 + Sprites de Trevor de los k-1 Holds anteriores
                 + Sprites de Bashful Bloom de las k Main Phases anteriores (T0..T(k-1))
                 = 2 + (k-1) + k = 2k + 1

k=1 -> 3   k=2 -> 5   k=3 -> 7   ->  GANA EN EL TERCER HOLD
```

**El número del issue sobrevive por otra vía** — no por ordenar disparos (383.3.d), que era la salida
que hubiera hecho falta y que ya no hace falta, sino porque el Sprite de Bloom de la Main Phase de
setup entra a la cuenta. La entrada no se apoya en ninguna lectura.

Coste en Energy, con el descuento aplicado en cada activación (*"costs 1 Energy less for each friendly
unit with [Temporary]"*):

```
T0 Main : LeBlanc E4 + Trevor E3 + Bloom E4 (0 Temporary amigos)   = 11 Energy
T1 Main : Bloom E2  (2 Temporary amigos: 1 de Bloom + 1 de Trevor) =  2 Energy
T2 Main : Bloom E0  (4 Temporary amigos)                           =  0 Energy
T3 Beginning : Hold con 7 -> ganás (195)                     TOTAL = 13 Energy
```

Dónde aparecen los Sprites: la habilidad de Bloom no nombra locación, así que 439.2.b.1 + 355.2.a los
dejan entrar directo a la Plaza (que controlás). El de Trevor entra *"here"*, donde él hace el Hold.

Contra `leblanc-temporary-plaza`: aquella llega a 10 unidades **en un turno**, pero seis son
Reflections de **0 Might** y su propio `notable` dice que *"any single point of damage removes one"*.
Ésta es más lenta y **todos los cuerpos son de 3 Might**, con Trevor en `[Shield]` y LeBlanc en
`[Backline]`. Es el mismo remate por otra vía de fabricación.

Refutaciones declaradas: si LeBlanc muere o se mueve, todos los Sprites mueren en tu siguiente
Beginning Phase; **NO combinar con `UNL-208` Black Flame Altar** (485.4.a: sólo uno de tus tres
battlefields entra en juego — es el error que arregló #33); y el sorteo del battlefield.

**VERIFIED.**

---

## Candidata 7 — `death-from-below-recurring-kill` · ENGINE · **VERIFIED, REESCRITA HACIA ARRIBA**

`UNL-186` Death from Below ×1, `OGN-037` Immortal Phoenix ×1. Fury/Chaos.

El *"do this"* es un Reflexive Trigger (387.1) que crea un ítem nuevo en la chain (388.1). El hechizo
mientras tanto termina de resolver y **se va al trash** (359.3.d, literal: *"and then place the card in
the Trash of the owning player"*). Cuando el trigger reflexivo resuelve, *"play this from your trash"*
la encuentra. Es la misma forma de timing que **R26 = B**; no es lectura nueva.

**1 Power rainbow por repetición, sin tope de evento**, mientras cada objetivo tuviera ≤3 Might. Es
removal repetible **y** outlet de sacrificio: *"Kill a unit at a battlefield"* no dice enemiga. El
techo real son las 12 runas del Rune Deck (103.3.a) — misma forma que `zed-clone-eye-recruits`, que ya
está catalogada como ENGINE por estar acotada por runas. **No es INFINITE.**

El Phoenix vuelve por E1 + 1 Fury: **428.5.b** ya alcanza, porque el kill está en el texto del propio
hechizo (*"A spell or ability that contains a Kill instruction is responsible for Killing the Unit"*).

**La reescritura hacia arriba.** El issue evitó a propósito matar al **propio Phoenix** con Death from
Below (es M3, entra en la condición) por miedo a 141.1.b.2 (*"cannot take actions"*). **No hay nada
que evitar**: el ejemplo trabajado de **383.2.c.1** es esa carta, por nombre, y dice *"even if the unit
you killed with a spell was that Immortal Phoenix"*. La entrada lo usa y no archiva lectura.

**Dominios — esto parte la lente en dos:** Death from Below es Fury/Chaos y Karthus es Order. Una
leyenda tiene exactamente dos dominios (103.1.b), así que **el multiplicador de Karthus y este outlet
no pueden convivir en ningún mazo.**

**VERIFIED.**

---

## Estado final

| # | id | clase | veredicto |
|---|---|---|---|
| 1 | `karthus-leblanc-fragmented-temporary-draw` | ENGINE | verified |
| 2 | `karthus-honest-broker-blade-gold` | ENGINE | verified |
| 3 | `karthus-sacred-shears-blade-draw` | ENGINE | verified, reescrita (tasa) |
| 4 | `karthus-machine-evangel-renata-plaza` | ALT_WIN | verified |
| 5 | `karthus-glasc-mixologist-double-reanimate` | ENGINE | verified (corrección de ubicación) |
| 6 | `leblanc-bashful-bloom-trevor-plaza` | ALT_WIN | verified, reescrita (383.2.a) |
| 7 | `death-from-below-recurring-kill` | ENGINE | verified, reescrita hacia arriba (383.2.c.1) |

- **Ninguna resultó INFINITE.** El verdicto B de #36 se confirma, y además se cerró el único caso
  límite que podía darlo (Chem-Baroness + Undying Loyalty) con aritmética escrita.
- **Ninguna lectura de reglas nueva archivada.** Las tres que asomaban se cerraron con regla
  existente: el apilado de Karthus con R1 y el grep de `redundant`; el descuento de Bashful Bloom con
  816.3; y el Phoenix matándose a sí mismo con el ejemplo trabajado de 383.2.c.1.
- **Una cita del issue corregida**: el "sin tope por turno" del Blade se apoya en **377**, no en 818.4.
