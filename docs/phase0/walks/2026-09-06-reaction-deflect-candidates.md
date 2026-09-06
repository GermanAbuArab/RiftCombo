# Hand walk — las 7 candidatas de la lente de la respuesta ([Reaction] / [Deflect]), issue #44

Fecha: 2026-09-06. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt` (935 cartas, gallery API 2026-09-04, errata aplicada).
Sesión: `rc-walk44`.

**Resultado: 7 de 7 verified, 0 refutadas, 3 reescritas** (candidatas 1, 3 y 5).
**Ninguna resultó INFINITE** — el veredicto D de #44 se sostiene, y abajo se vuelve a medir en vez de
heredarse.

Los dos hallazgos que #44 marcó como capaces de cambiar una regla escrita del proyecto:

- **C (los Sellos rompen el precio del Power del ledger de #21): la CONCLUSIÓN se sostiene, la PREMISA
  es falsa.** El número de `CLAUDE.md` (~9 Energía por Power, ~10 Energía por carta extra) **sigue en
  pie sin tocar** — los Sellos dan Power **por turno** y el ledger mide Power **por pasada**, así que
  no se cruzan. Pero la premisa con la que #44 justificó el hallazgo — *"el Power de un mazo normal
  está topeado por 12 reciclados en toda la partida"* — **es falsa**: 315.3.b y 430.4.a canalizan
  **2 runas por turno** desde el Rune Deck, y 161.2.b devuelve la runa reciclada **a ese mismo Rune
  Deck**. El techo real es de **2 Power por turno, sostenible para siempre y gratis**. Bloque C.
- **E (el precio del draw se puede bajar 2,5x): se sostiene, con una restricción que #44 no midió.**
  4 Energía contra 10, sí — pero sólo contando los **2 slots libres de la pasada de Power**, porque en
  la pasada de Energía la Forge tope de 4 no alcanza para reciclar la carta objetivo *y* el hechizo de
  draw. Bloque E.

Y **A** y **B** se abrieron regla por regla: las dos CONFIRMADAS palabra por palabra.

---

## Bloque 0 — cada regla que estas entradas citan, abierta y pegada

Se hizo primero y en bloque, antes de mirar ninguna candidata. Ninguna cita de #44 se dio por buena.
Dos salieron mal y están marcadas.

### Add, Reaction y el sistema de recursos (hallazgo A)

- **429.3** — *"Activated abilities that Add resources and have the Reaction tag can be activated at
  any time that spells or abilities require resources be paid."* Con sus dos ejemplos, el segundo
  literal: *"A player moves two units to a battlefield where their opponent controls a Mageseeker
  Investigator. **Although they have no window of priority**, they may activate Add Reactions to pay
  for the applied cost from Mageseeker Investigator, and those abilities finalize and resolve
  immediately."* → CONFIRMADA (línea 4406).
- **429.3.a** — *"When an Add ability is activated in this way, it immediately finalizes and resolves,
  even during the resolution of spells and abilities."* → CONFIRMADA (línea 4417).
- **164.2** — *"A Basic Rune always has the following two Abilities:"* seguido de **164.2.a**
  *"[E]: [Reaction] — Add [1]."* y **164.2.b** *"Recycle this: [Reaction] — Add [C]."* → CONFIRMADAS.
- **135.2.e.5 / 135.2.e.5.a** — *"Power of any Domain is represented by a swirling rainbow symbol. Its
  shorthand is [A]. … When required as a cost, [A] can be paid by Power of any Domain."*
- **135.2.e.6** — *"Power of a domain corresponding to a card's own Domain … Its shorthand is [C]."*
  → el `Add [C]` de una runa produce Power **del dominio de esa runa**.
- **163.2 / 163.2.a** — *"Power is used to pay Domain-associated Power Costs. … Power has a Domain."*
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
  each player's turn."*
- **316.3** — *"Each player's Rune Pool empties. Any unspent Energy and Power are lost."* (primer Task
  de la Main Phase).
- **356.6** — *"Energy and Power costs can't be reduced below 0."*
- **357.1** — *"In total, pay the combined Energy cost (if any) and Power cost (if any)."*

### Deflect (hallazgo B)

- **809.1.c** — *"It is functionally short for 'Spells and abilities an opponent controls that target
  [me/this] cost an amount of Power equal to [Deflect Value] more to play as an additional cost **for
  each time they choose [me/this]**.'"* → CONFIRMADA.
- **809.1.c.1** — *"The Power used to pay this cost may always be of any Domain."* Con su ejemplo.
- **809.2** — *"If a Game Object has Deflect, or has been granted Deflect, and is granted Deflect by an
  additional source, the Deflect Value of all **granted** Deflect keywords is summed."* → CONFIRMADA,
  y sigue sin decir si el valor IMPRESO entra en la suma. **Ninguna entrada de este walk necesita esa
  pregunta**: la candidata 3 se reescribió justamente para no depender de ella (bloque 3).
- **356.2.a.2** — *"The cost imposed by the Deflect keyword is a Mandatory Additional Cost."*
- **355.7** — *"When a card Chooses one or more specific Game Objects to affect, it is Targeted unless
  indicated otherwise by the rules in this section."* → en Riftbound *choose* **es** *target*, que es lo
  que hace legítimo citar 359.3.e.5 y 809.1.c para un efecto que dice "choose". **355.12** lo repite
  para el caso opcional: *"all choices are considered targeted and chosen independently of the decision
  to perform the Game Action."*

### Tank y asignación de daño

- **815.1.b** — *"It is functionally short for 'I must be assigned lethal damage before any other unit
  with the same controller as me that does not have [Tank] during the Combat Damage step.'"*
- **815.1.c.1** — *"Players must still assign lethal damage to a unit before moving to the next when
  assigning their damage."*
- **815.2** — *"Multiple instances of Tank are redundant."* → redundantes **en el mismo objeto**; dos
  unidades distintas con Tank son dos muros.
- **465.2.c.3** — *"Units must have lethal damage assigned to them in full before damage is assigned to
  a different Unit."*
- **465.2.c.4** — *"Units cannot have more damage assigned to them than the minimum required to
  constitute lethal damage unless no further units remain to have damage assigned to them."*
- **142.4.b** — *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit's
  Might."*

### Entrar en juego, exhaustear, readear

- **149.1** — *"Gear enter play Ready."*
- **359.2.d** — *"If it is a Non-Unit Gear, it enters the Board Ready at the player's Base."*
- **143.4** — *"Units enter the Board exhausted."*
- **414.1.c** — *"If a Game Object is instructed to be Exhausted while it is already Exhausted, nothing
  additional happens."*
- **414.4** — *"When Exhausting is listed as a Cost, then the Action must be able to be completed for
  the cost to be paid."*
- **415.3.a** — *"A player Readies all non-spell Game Objects they Control during the Awakening Phase
  on their turn."*
- **315.1.b** — *"The Turn Player readies all Game Objects they control that are able to be readied."*

> **CITA MAL PUESTA EN #44 — la primera de dos.** La candidata 1 citaba **415.3** para sostener que
> *"exhausted no apaga una habilidad cuyo coste no lleva exhaust"*. **415.3 dice literalmente
> "This is a Limited Action."** y no habla de eso. La cita correcta es **414.4** (el exhaust sólo pesa
> cuando está listado COMO coste) más **414.1.c**. Corregido en la entrada.

### Recall, muerte y reemplazo (candidatas 1 y 7)

- **456** — *"Recalls are not Moves."* **456.1** — *"They do not cause Triggered Abilities to trigger
  that are triggered by Move actions."*
- **458.1** — *"Unless otherwise stated by the source of the Recall, Damage and statuses of a permanent
  will all remain unaffected by a Recall."*
- **373.1.a** — *"When executing Replacement Effects, the Game Actions that comprise their instructions
  are performed before any simultaneous unmodified events."* Su ejemplo es exactamente esta familia:
  *"One of those units has their death replaced by being healed, exhausted, and recalled."*
- **373.2** — *"When applying Replacement Effects to events that occur simultaneously, each Replacement
  Effect may only be applied in one sequence, to any number of events that are qualified to be
  replaced."* **Y su ejemplo trabajado es Soraka, Wanderer**, que es la carta que reescribe la
  candidata 1 — ver bloque 1.
- **373.2.a** — *"A sequence of Replacement Effects is an uninterrupted series of applications to a set
  of simultaneous events."* → dos muertes NO simultáneas son dos secuencias: un reemplazo estático se
  vuelve a aplicar.
- **808.1.d.1** — *"If the Permanent with the effect is not sent to the Trash, for example because its
  'killed' event was replaced with a recall, the triggered ability will be removed from the chain."*
  → **un escudo de esta familia BORRA el Deathknell de lo que salva.** No estaba escrito en ningún
  lado del repo.
- **428.1.a.1** — *"Active Kill is when the action is taken when instructed by a game effect or as a
  cost for a card or ability."*
- **428.1.a.1.b** — *"When a unit with a Deathknell … is to be put in the Trash due to a Kill
  Instruction, it first has any such ability added to the chain as a Pending Item."*
- **359.3.e.5** — *"If any of the spell's targets are no longer legal, those game objects, players, or
  zones are unaffected by the spell as it resolves. Any instructions related to an illegal target can't
  be followed."*
- **186.1** — *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist"* → un
  token nunca está en el trash.

### Costes adicionales, Repeat, Ambush, Reaction

- **356.2.a.1** — *"Some Additional Costs … are Mandatory … They use the phrase 'as an additional cost'
  and don't include the word 'may'."*
- **356.2.b.1** — *"Some Optional Costs … use the phrase 'as an additional cost' and the word 'may'."*
- **820.1.c.1** — *"The Cost is an Additional Cost to be paid during the steps of playing the spell or
  ability."*
- **820.1.c.3** — *"Each Repeat Cost can be paid only a single time."*
- **813.1.b** — *"Reaction grants the corresponding card or effect all abilities and permissions of
  Action."*
- **813.3.a** — *"Playing Units with Reaction still has the inherent restrictions of playing Units
  without Reaction. It can only be played to the controlling player's base or a battlefield they
  control."*
- **822.1.b** — *"It is functionally short for 'I may be played to a battlefield where you control
  Units'…"*
- **822.1.c** — *"It is a passive ability that **adds options to locations that are valid** for a Unit
  to be played to during the Make Relevant Choices step of Playing a Card."*
- **355.2.a** — *"By default, Valid locations include the controller's Base or a Battlefield the
  controller controls."*
- **464.2.c.3.a** — un cuerpo que aparece después gana la designación de Attacker/Defender en el
  Cleanup siguiente.

### Puntos, runas y turno

- **194.1** — *"Players can gain points a number of ways:"* con **194.1.a** Holding, **194.1.b**
  Conquering, **194.1.c** *"Spells, Triggered Abilities and Activated Abilities that instruct them to
  gain one or more points"* y **194.1.d** Burn Out. **Las cuatro son "gain points".**
- **194.2** — *"A player wins the game if, in a cleanup, they have points greater than or equal to the
  Victory Score"* → un efecto de 195 (*"you win the game"*) **no es** ganar puntos.
- **161.2.a** — *"Exactly 12 Rune cards chosen during Deck Construction."*
- **161.2.b** — *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*
- **416.1** — el reciclado va **al fondo** del mazo correspondiente.
- **430.1** — *"Channeling is the action of taking one or more Runes from the top of a player's Rune
  Deck and putting them on the board."* **430.2.a** — *"By default, runes are channeled readied."*
- **430.4.a** y **315.3.b** — *"A player Channels **two** Runes during the Channel Phase on their
  turn."* / *"1. The Turn Player channels 2 runes from their Rune Deck."*
- **103.1.b.1** — *"Cards included in your deck must abide by your Domain Identity."*
- **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."*

> **CITA MAL PUESTA EN #44 — la segunda.** #44 escribió *"con 161.2.a (Exactly 12 Rune cards), el Power
> de un mazo normal está topeado por 12 reciclados en toda la partida"*. Falso: **161.2.b devuelve la
> runa al Rune Deck** y **315.3.b / 430.4.a canalizan 2 por turno de vuelta**. Bloque C.

### Chequeo de bans

`grep -n "BANNED" data/corpus_flat.txt` da 12 líneas. Ninguna de las 19 cartas que este walk toca
(`UNL-175 SFD-180 SFD-173 OGN-023 OGN-040 OGN-081 OGN-120 OGN-163 OGN-204 OGN-245 UNL-049 SFD-060
UNL-171 UNL-041 UNL-057 OGN-231 UNL-160 UNL-153 UNL-166 UNL-142 UNL-061`) aparece en ella, ni en
`data/legality.src.json`. Ninguna es battlefield, así que **ninguna entrada de este walk depende de
485.4.a / 485.5 / 486.5 / 487.5 ni de 103.4.c**: las candidatas 3 y 6 piden *"un"* battlefield
cualquiera, no uno con nombre.

---

## Bloque A — `[Reaction]` + `[Add]` se activa sin ventana de prioridad: CONFIRMADO

429.3 y 429.3.a están pegados arriba palabra por palabra, y el segundo ejemplo del propio reglamento
dice *"Although they have no window of priority"*. 164.2 lo vuelve estructural: **las dos habilidades
de toda runa básica son Add Reactions**, así que el sistema de recursos entero del juego corre sobre
esta permisión. La consecuencia que #44 sacó — que **el impuesto de Deflect siempre se puede pagar**
(356.2.a.2 lo hace Mandatory Additional Cost, y 429.3 permite fabricar el Power sin ventana) — se
sostiene.

## Bloque B — `[Deflect]` es un impuesto, no un candado: CONFIRMADO

809.1.c dice *"for each time they choose"*: se paga **por elección**, no por hechizo. 809.1.c.1 lo hace
pagable en cualquier dominio. Y **no hay nada en 809 sobre daño**: el daño de combate no elige, así que
Deflect no lo toca. Los dos outs impresos son `VEN-158 Heisho, Shell of the World` (battlefield) y
`VEN-061 Decree of Insight`, y a esa lista este walk le agrega un tercero que #44 no vio:

```
VEN-004 | Dune Surfer | Unit | Fury | E3 M3 | You ignore [Tank] while assigning combat damage here.
```

No apaga Deflect: apaga **Tank**, que es la otra mitad del muro de la candidata 3. Está en su refutación.

## Bloque C — los seis Sellos: la conclusión se sostiene, la premisa de #44 no

### El texto, verbatim

```
OGN-040 | Seal of Rage     | Gear | Fury  | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_fury:.  (Abilities that add resources can't be reacted to.)
OGN-081 | Seal of Focus    | Gear | Calm  | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_calm:.  (…)
OGN-120 | Seal of Insight  | Gear | Mind  | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_mind:.  (…)
OGN-163 | Seal of Strength | Gear | Body  | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_body:.  (…)
OGN-204 | Seal of Discord  | Gear | Chaos | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_chaos:. (…)
OGN-245 | Seal of Unity    | Gear | Order | E0 P1 | :rb_exhaust:: [Reaction] — [Add] :rb_rune_order:. (…)
UNL-049 | Honeyfruit | Gear | Calm | E2 | This enters exhausted. [Reaction][>] :rb_exhaust:: [Add] :rb_rune_rainbow:. (…) [Level 6][>] [>>][Reaction][>] :rb_exhaust:: [Add] :rb_energy_1::rb_rune_rainbow:. (Use this ability only while you have 6+ XP.)
```

La familia medida por #44 (`grep '\[Add\]' | grep rb_rune` → 20 cartas) se volvió a correr y da las
mismas 20. Las **fuentes permanentes, repetibles y sin condición** son las siete de arriba; las otras
trece son condicionales (`OGN-113`, `UNL-018`, `UNL-087`, `UNL-145`, `UNL-073`), de un solo uso
(`UNL-T05 Gold`: *"Kill this"*), de uso restringido (`OGN-247`, `SFD-189`, `VEN-141`, `UNL-022`,
`UNL-185`) o **convertidores 1:1** (`SFD-117 Ancient Henge` Energía→Power, `SFD-083 Hextech Anomaly`
Power→Energía), que no producen nada neto. **Cero de las siete estaba en el catálogo** (verificado
contra los 91 `uses`).

### Lo que #44 dijo mal

> *"161.2.b: la runa reciclada sale del board. Con 161.2.a (Exactly 12 Rune cards), el Power de un mazo
> normal está topeado por 12 reciclados en toda la partida."*

**161.2.b dice que la runa vuelve al Rune Deck**, y el Rune Deck es de donde se canaliza:

- **315.3.b**: *"1. The Turn Player channels **2** runes from their Rune Deck."*
- **430.4.a**: *"A player Channels **two** Runes during the Channel Phase on their turn."*
- **430.2.a**: *"By default, runes are channeled readied."*
- Y el orden del turno (315.1 Awakening → 315.2 Beginning → **315.3 Channel** → 315.4 Draw → 316 Main)
  pone la canalización **antes** de la Main Phase.

Además, la propia caminata verificada de `lux-infinite-energy` ya usaba el hecho de que **`Recycle
this` (164.2.b) no lleva exhaust en su coste**: una runa ya exhausteada para Energía **todavía** se
puede reciclar para Power. Vale 1 Energía **y después** 1 Power, en el mismo turno.

### El estado estable, medido

```
Main Phase del turno N, 12 runas en el board
  exhaustear las 12 (164.2.a)                    -> +12 Energia
  reciclar 2 de esas 12 ya exhausteadas (164.2.b) -> +2 Power   | board 10, Rune Deck 2
turno N+1
  315.1.b readea las 10
  315.3.b canaliza 2 desde el Rune Deck, ready    -> board 12 otra vez
  Main Phase: identico al turno N
```

**2 Power por turno, sostenible para siempre, gratis, en cualquier mazo, sin gastar una sola carta del
Main Deck.** Reciclar 3 en un turno erosiona el board (sólo vuelven 2), así que **la tasa sostenible es
exactamente 2**. Ése es el techo real, y no es 12 en toda la partida.

### Lo que sí valen los Sellos, entonces

No "escapar del techo de 12": **subir la tasa sostenible por encima de 2 sin encoger el board de
runas.** Y son casi gratis, porque **se pagan entre ellos**:

```
Main Phase, con 12 runas y ninguna carta invertida
  exhaustear una runa Mind -> +1 Energia; reciclar esa misma runa (164.2.b) -> +1 Mind Power
  jugar Seal of Insight #1 (E0 P1) con ese Power
     149.1 / 359.2.d: entra READY -> exhaustear -> [Add] 1 Mind Power
  jugar Seal of Insight #2 con ese Power -> entra ready -> exhaustear -> +1 Mind Power
  jugar Seal of Insight #3 con ese Power -> entra ready -> exhaustear -> +1 Mind Power   <- queda flotando
turno N+1 en adelante: 315.1.b readea los tres -> +3 Mind Power por turno, ademas de los 2 de runas
```

Coste total de los tres Sellos: **una runa reciclada, que 315.3.b devuelve en la Channel Phase del
turno siguiente**, y **cero Energía**. Y al final del turno de instalación **todavía queda 1 Power
flotando**. #44 lo había contado como *"3 Sellos = 3 runas recicladas"*: son **una**.

El bootstrap no depende de resolver si el símbolo de coste de un Sello es de su propio dominio o
rainbow: **el Add de un Sello y el coste del Sello de al lado son la misma carta**, así que cualquiera
de las dos lecturas cierra igual. (163.2 y 135.2.e.6 hacen que el caso normal sea el propio dominio.)

### El límite honesto, que es lo que impide que esto sea INFINITE

Los Sellos readean **una vez por turno** (415.3.a) y los loops del catálogo consumen Power **por
pasada**, y una pasada dura un instante. Tres Seal of Insight siguen siendo 3 Mind Power en todo el
turno. **Los Sellos alimentan un mazo normal, no un loop**, y va escrito en el `notable` de la entrada.
Además, 167 y 316.3 vacían el Rune Pool al empezar la Main Phase: **exhaustear un Sello en la Awakening
Phase tira el Power**. Se exhaustea en Main Phase o después.

### Veredicto sobre `CLAUDE.md`

**El número de `CLAUDE.md` sigue en pie, sin cambios.** El párrafo del *"Recycle budget"* habla del
**Main Deck** dentro de una pasada (draws, slots de la Forge, ~9 Energía por Power, ~10 Energía por
carta extra) y los Sellos operan en otra escala (por turno). No se tocan. Lo que sí falta escrito en
algún lado del repo es la tasa gratis de **2 Power por turno vía reciclado de runas + Channel Phase**,
porque es el suelo contra el que hay que medir cualquier "fuente de Power" nueva. **No edité
`CLAUDE.md`**: queda para el manager con esta evidencia.

## Bloque D — no hay INFINITE en esta lente: CONFIRMADO, y por qué

Las tres razones de #44, vueltas a medir:

| lo que haría falta | lo que hay |
|---|---|
| un Add Reaction que se reactive dentro del turno | los siete llevan `:rb_exhaust:` y **415.3.a / 315.1.b** sólo readean en TU Awakening Phase |
| un convertidor con ganancia | `SFD-117` (Energía→rainbow) y `SFD-083` (rainbow→Energía) son estrictamente 1:1 y opuestos; el ciclo es un lavado |
| un Reaction que se repita | **820.1.c.3**: *"Each Repeat Cost can be paid only a single time."* |

Y del lado de los cuerpos, **813.3.a** cierra la puerta ofensiva: Reaction da **momento**, nunca
**lugar**. Ninguna de las siete candidatas produce nada no acotado; las siete entran **ENGINE**.

---

## Bloque 1 — candidata 1, REESCRITA: el escudo de Fiora no es Tactical Retreat, es Soraka

### Lo que la candidata afirmaba y cómo cierra la parte mecánica

```
UNL-175 | Tactical Retreat | Spell | Order | E2 | [Reaction] (Play any time, even before spells and
abilities resolve.) Choose a friendly unit. The next time it would die this turn, heal it, exhaust it,
and recall it instead. (Send it to base. This isn't a move.)

SFD-180 | Fiora, Worthy | Unit | Order | E3 M3 | When a unit you control becomes [Mighty], you may pay
:rb_rune_order: to ready it. (A unit is Mighty while it has 5+ :rb_might:.) [Tags: Fiora, Demacia]
```

Los tres jinetes del reemplazo, uno por uno, sobre Fiora:

- *"heal it"* — irrelevante, Fiora no está en combate.
- *"exhaust it"* — **gratis**, y la cita correcta es **414.4** (*"When Exhausting is listed as a Cost…"*)
  más **414.1.c**, no 415.3: la habilidad de Fiora es un disparo cuyo coste es `pay :rb_rune_order:`
  y **no lleva `:rb_exhaust:`**, al revés que la habilidad de Score de Renata Mastermind, que sí lo
  lleva — la misma distinción que usó el ledger de #21 para probar que su draw es ilimitado.
- *"recall it… (Send it to base. This isn't a move.)"* — **cero cambio**: `jhin-fiora-facebreaker-recall`
  declara *"Fiora in base"* y `renata-mastermind-points` sólo pide *"Fiora, Worthy in play"*; 456 /
  456.1 hacen que el recall no dispare nada y 458.1 que no cambie estado.

Todo eso es cierto. **Lo que es falso es la última sección de la candidata**, la que dice:

> *"**No hay alternativa en dominio.** Los otros anti-remoción a velocidad de Reaction del pool son
> `SFD-045 Not So Fast` (Calm), `UNL-106 Repulse` (Body), `OGS-020 Highlander` (Calm/Body) y
> `SFD-206 Riposte` (Body/Order): ninguno entra en Fury/Order ni en Mind/Order. Tactical Retreat es la
> única respuesta legal."*

`grep -i "would die" data/corpus_flat.txt` devuelve **nueve** cartas, y dos de ellas sí entran:

```
SFD-173 | Soraka, Wanderer | Unit | Order | E4 P1 M4 | I must be assigned combat damage last. If
another unit you control here would die, if it has less Might than me, instead heal it, exhaust it,
and recall it. (Send it to base. This isn't a move.) [Tags: Soraka, Mount Targon]

OGN-023 | Unlicensed Armory | Gear | Fury | E2 | Discard 1, :rb_exhaust:: Choose a friendly unit. The
next time it would die this turn, you may pay :rb_rune_fury: to heal it, exhaust it, and recall it
instead. (Send it to base. This isn't a move.)
```

**`SFD-173 Soraka, Wanderer` es Order**, o sea que entra en los cuatro pares que sostienen a Fiora
(`renata-mastermind-points` Mind/Order, `jhin-fiora-facebreaker-recall` Fury/Order,
`garen-fiora-malzahar-facebreaker-recruits` Mind/Order, `fiora-vault-breaker-jhin` Fury/Order).
`OGN-023 Unlicensed Armory` es Fury y entra en los dos pares Fury/Order.

### La pregunta que decide: ¿"here" incluye la base?

Fiora está **en base** en la línea de Jhin. Soraka dice *"another unit you control **here**"*. La
contesta el **ejemplo trabajado del propio reglamento en 373.2**, que además está escrito sobre esta
misma carta:

> *"Example: Soraka, Wanderer reads 'If another unit you control here would die, if it has less Might
> than me, instead heal it, exhaust it, and recall it.' Soraka dies simultaneously with two 1 [M]
> Recruit tokens at the same battlefield and two 1 [M] Recruit tokens in base. … If Soraka's
> Replacement Effect is applied first, it saves the Recruits at the same battlefield as her but not
> the Recruits in base. … If the Replacement Effect appended by Guardian Angel is applied first, it
> saves Soraka and recalls her — then when Soraka's Replacement Effect is applied, **it can only save
> the Recruits in base**."*

O sea: **"here" es donde esté Soraka, y la base cuenta.** Soraka en base cubre a Fiora en base. No hace
falta archivar ninguna lectura: lo contesta un ejemplo del reglamento.

### La comparación, con las cantidades que cada carta declara

| | `UNL-175` Tactical Retreat ×3 | `SFD-173` Soraka, Wanderer ×1 | `OGN-023` Unlicensed Armory ×1 |
|---|---|---|---|
| coste de instalación | 6 Energía, 0 Power | 4 Energía + 1 Order Power | 2 Energía |
| coste por salvada | ya pagado | **0** | descartar 1 + exhaustear + 1 Fury Power |
| salvadas disponibles | **3, y sólo este turno** | **ilimitadas** | **1 por turno** (`:rb_exhaust:` + 415.3.a) |
| límite sobre el protegido | ninguno | *"less Might than me"* → **Fiora M3 < M4 ✓** | ninguno |
| dominio | Order (los 4 pares) | Order (los 4 pares) | Fury (sólo los 2 pares Fury/Order) |
| velocidad | Reaction | permanente, estático | activada, no Reaction |

Un loop infinito abre un Showdown **cada pasada** y corre un número no acotado de pasadas. Tres
salvadas de un solo turno contra un reemplazo **ilimitado y sin coste por uso** no es una preferencia:
es la diferencia entre acotado y no acotado. **La entrada se re-ancla en Soraka.** Tactical Retreat
queda nombrado en el `notable` con las dos cosas que sí hace mejor: cuesta **0 Power**, y **no tiene el
tope de Might** — si Fiora sube a 4+ (o si hay que salvar a Jhin, que en base es M4 y no es *menos* que
los 4 de Soraka), Soraka no llega y Tactical Retreat sí.

### La contraindicación que ninguna de las dos versiones tenía escrita

**808.1.d.1** — *"If the Permanent with the effect is not sent to the Trash, for example because its
'killed' event was replaced with a recall, the triggered ability will be removed from the chain."*

**Un escudo de esta familia BORRA el Deathknell de lo que salva.** Sobre Fiora da igual (no tiene). Pero
el reemplazo de Soraka **no es opcional** (*"instead heal it…"*, sin *"may"*, contra el *"you may pay"*
de Unlicensed Armory), así que en una base con Soraka de M4 se apaga solo el Deathknell de cualquier
cuerpo de menos de 4 Might que muera ahí — y `UNL-153 Carrion Dredger` (Order, M1, Deathknell) es
exactamente eso, y es la carta de la candidata 4. Va escrito en el `notable`.

### Qué refuta la entrada

El reemplazo dice *"would **die**"*: no hace nada contra banish, contra bounce ni contra robo de
control. `UNL-128 Star-Crossed` (Chaos, E3 P1, Reaction, *"Return a friendly unit and an enemy unit to
their owners' hands"*) y `OGN-169 Gust` (Chaos, E1, Reaction, unidades de 3 Might o menos **en un
battlefield** — Fiora en base no es alcanzable por Gust) son los ejemplos. Y Soraka es ella misma un
blanco de remoción sin Deflect: matarla a ella devuelve el loop a su punto de falla original.

**VEREDICTO: verified, reescrita.** `soraka-fiora-loop-shield`, 2 cartas.

---

## Bloque 2 — candidata 2, verified con la aritmética corregida

Todo el trabajo está en el bloque C. La entrada queda anclada en **`OGN-120 Seal of Insight` ×3**
(Mind es el dominio más frecuente del catálogo: 37 de 91 entradas lo tocan, contra 35 de Order), y el
`notable` lista los seis códigos porque la línea es idéntica en los seis dominios y **la carta que hay
que jugar es la del dominio que el mazo ya corre**.

Lo que la entrada declara y su chequeo:

```
instalacion (un turno):  1 runa reciclada, 0 Energia, y sobra 1 Power flotando
la runa vuelve:          315.3.b, Channel Phase del turno siguiente (2 por turno)
rendimiento:             +3 Mind Power por turno, desde el turno siguiente, para siempre
suelo contra el que se mide: 2 Power por turno gratis via reciclado de runas
lo que NO hace:          alimentar un loop (1 Power por TURNO, no por pasada)
```

`UNL-049 Honeyfruit` no entra en `uses` — es una alternativa de Calm, no un ingrediente: 3 copias son
**6 Energía, 0 Power, 0 runas** y dan **rainbow** (pagable en cualquier dominio, 135.2.e.5.a), a cambio
de *"This enters exhausted"*, que retrasa el primer Power un turno y **rompe el bootstrap** (un
Honeyfruit no puede pagar al siguiente). Va en el `notable`, no en la lista de ingredientes, porque
`uses` es un requisito de multiconjunto y meter una alternativa ahí obligaría al mazo a llevar las dos.

**VEREDICTO: verified.** `seal-power-faucet-bootstrap`, 1 carta ×3.

---

## Bloque 3 — candidata 3, REESCRITA: Allay no hace nada y Alpha Wildclaw hace todo

### El texto

```
SFD-060 | Tianna Crownguard | Unit | Calm | E7 P2 M4 | [Deflect] (…) While I'm at a battlefield,
opponents can't gain points. [Tags: Elite, Demacia]

UNL-171 | Galio, Indefatigable | Unit | Order | E3 P1 M6 | [Deflect] (…) [Tank] (I must be assigned
combat damage first.) I don't deal combat damage. [Tags: Demacia, Galio]

UNL-041 | Allay, Eager Admirer | Unit | Calm | E3 M3 | [Deflect] (…) While I'm at a battlefield, your
other units here have [Deflect]. [Tags: Yordle, Bandle City]

UNL-057 | Alpha Wildclaw | Unit | Calm | E6 P2 M7 | [Tank] (I must be assigned combat damage first.)
Your units here with less Might than me can't be chosen by enemy spells and abilities.
[Tags: Cat, Freljord]
```

`grep -i "can't gain points"` sobre las 935 devuelve **una sola** carta: Tianna. Confirmado.
194.1.a–d hacen que *"can't gain points"* corte **las cuatro** vías; 194.2 deja claro que **no** corta
un efecto de 195 (*"you win the game"*), que es como ganan las 5 entradas ALT_WIN del catálogo — va en
el `notable`.

### Por qué se cae Allay

Tianna, Galio y Galio **ya tienen `[Deflect]` impreso**. Lo único que Allay les podría agregar es
**valor sumado**, y eso es exactamente la pregunta que 809.2 no contesta (*"the Deflect Value of all
**granted** Deflect keywords is summed"* — no dice si el impreso entra en la suma). Así que Allay, en
esta lista, o no hace nada o hace algo que exigiría archivar una lectura. **Se corta**: −3 Energía,
−1 carta, −1 pregunta para el usuario.

### Qué entra en su lugar, y por qué es otra cosa

`UNL-057 Alpha Wildclaw` no grava: **apaga**. *"Your units here with less Might than me can't be chosen
by enemy spells and abilities."* Con M7, cubre a Tianna (M4) y a los dos Galios (M6). Y es además un
**Tank de 7 Might**. Con 355.7 (*"When a card Chooses one or more specific Game Objects to affect, it is Targeted"*), eso deja fuera de juego a
Star-Crossed, Gust y Smoke Screen sobre el muro entero, que eran las tres refutaciones que #44 le puso
a su propia candidata.

### La aritmética, con las cantidades declaradas

```
POR COMBATE  (Deflect no aplica: el dano de combate no elige)
  815.1.b   : los 3 Tanks (Wildclaw 7, Galio 6, Galio 6) reciben letal ANTES que la no-Tank Tianna
  465.2.c.3 : letal completo a una antes de pasar a la siguiente
  465.2.c.4 : y nunca mas del minimo letal
  -> 7 + 6 + 6 + 4 = 23 de Might atacante EN UN SOLO COMBATE para llegar a Tianna
  -> y Galio "I don't deal combat damage": el muro no devuelve nada, sale barato de mantener

POR HECHIZO O HABILIDAD
  mientras Alpha Wildclaw viva : Tianna y los Galios NO SE PUEDEN ELEGIR  (UNL-057)
  Alpha Wildclaw misma         : M7, sin Deflect -> es el punto de entrada, y cuesta una carta
  si cae Wildclaw              : 809.1.c + 356.2.a.2 -> +1 Power por CADA eleccion, en cualquier dominio

COSTE DE MONTARLO
  Tianna 7E+2P (Calm) · Wildclaw 6E+2P (Calm) · Galio 3E+1P x2 (Order) = 19 Energia + 6 Power
  143.4: las cuatro entran exhausted, asi que el muro tarda un turno en estar operativo
```

Leyendas Calm/Order verificadas contra el corpus: `OGN-261 Radiant Dawn`, `SFD-247 Emperor of the
Sands`, `UNL-195 Green Father`, `VEN-147 Eye of Twilight`. La última **regala un Tank por turno**
(`[Action] exhaust: Give a friendly unit [Tank] this turn`), así que con ella un Galio de más es
opcional — va en `easy`.

### Qué la refuta

- **El daño en área ignora Deflect y también a Alpha Wildclaw**, porque no elige unidades:
  `OGN-268 Bullet Time` (Body/Chaos, E1, *"Pay any amount of :rb_rune_rainbow: to deal that much damage
  to all enemy units at a battlefield"*) mata los cuatro cuerpos por 23 Power — caro, pero sin pagar un
  solo Power de Deflect y sin que Wildclaw lo impida.
- **`VEN-004 Dune Surfer`** (Fury, E3 M3): *"You ignore [Tank] while assigning combat damage here."*
  Un cuerpo de 3 Energía convierte los 23 de Might en **4**: se asigna letal directo a Tianna.
- **`VEN-158 Heisho, Shell of the World`** apaga Deflect en su propio battlefield (y por 485.4.a/485.5
  ni siquiera es seguro que aparezca).
- Y Tianna sólo apaga puntos *"While I'm at a battlefield"*: un bounce o un move la desactivan sin
  matarla — con Wildclaw en pie eso exige primero matar a Wildclaw.

**La entrada NO se describe como un candado.** Es un muro caro que compra turnos, y así está escrito.

**VEREDICTO: verified, reescrita.** `tianna-wildclaw-point-lock`, 3 cartas (4 copias).

---

## Bloque 4 — candidata 4, verified con la aritmética reordenada

```
OGN-231 | Commander Ledros | Unit | Order | E6 P4 M8 | As you play me, you may kill any number of
friendly units as an additional cost. Reduce my cost by :rb_rune_order: for each killed this way.
[Deflect] (…) [Ganking] (I can move from battlefield to battlefield.) [Tags: Spirit, Shadow Isles]

UNL-160 | Ultrasoft Poro | Unit | Order | E5 M5 | :rb_exhaust:: Play two :rb_energy_1: :rb_might: Bird
unit tokens with [Deflect]. Use this ability only while I'm at a battlefield. (…) [Tags: Poro, Freljord]

UNL-153 | Carrion Dredger | Unit | Order | E2 M1 | [Deathknell][>] Play a 1 :rb_might: Bird unit token
with [Deflect] to your base. (…) [Tags: Mech, Zaun]
```

**356.2.b.1** confirma que *"you may kill any number … as an additional cost"* es **opcional**
(lleva *"may"*), y **356.6** (*"Energy and Power costs can't be reduced below 0"*) confirma el tope:
**el descuento no pasa de los 4 Power impresos**, matar un quinto cuerpo no da nada.

La aritmética de #44 se saltaba el turno en que se juega el Poro. Corregida:

```
turno N   : jugar Ultrasoft Poro (5E) a un battlefield que controlas -> entra EXHAUSTED (143.4)
turno N+1 : 315.1.b lo readea -> exhaustear -> 2 Birds        (una activacion por turno)
turno N+2 : exhaustear otra vez -> 2 Birds mas  = 4 Birds
turno N+2 : jugar Ledros matando los 4 Birds
            coste impreso   6 Energia + 4 Order Power
            descuento       -4 Order Power   (356.6 lo topea ahi)
            coste real      6 Energia + 0 Power  -> un cuerpo de 8 Might con [Deflect] y [Ganking]
```

Con Dredgers en vez de dos Birds: **428.1.a.1** hace que matar como coste sea un Kill Instruction y
**428.1.a.1.b** mete el Deathknell en la cadena *antes* de completarlo, así que **cada Dredger
sacrificado devuelve un Bird**. 2 Dredgers (4E) + 2 Birds = 4 muertes, y quedan 2 Birds nuevos en base.

**Los Birds sólo pueden ir a tu base o a un battlefield que controlás** (355.2.a, la habilidad no nombra
lugar) y **entran exhausted** (143.4), lo cual da igual: son combustible.

### Lo que hay que dejar de decir

#44 escribió que ahorrar 4 Power son *"4 runas que no salen del board"*. Con el bloque C: son **dos
turnos enteros de la renta gratis de runas** (2 Power/turno sostenibles), o cuatro reciclados en un
turno, de los cuales la Channel Phase sólo devuelve dos. Real, pero hay que decirlo así.

### Qué la refuta

El Poro tiene que estar **en un battlefield** y entra exhausted, así que la primera camada llega recién
al turno siguiente; los Birds son de 1 Might y `OGN-133 Flurry of Blades` (Body, E1, Reaction, *"Deal 1
to all units at battlefields"*) barre los que estén en un battlefield sin pagar Deflect (no elige) por
**142.4.b**; y el descuento es de **Power**, no de Energía, así que los 6 de Energía se pagan siempre.
Comparación honesta: `OGN-113 Malzahar, Fanatic` (Mind) da **2 Power por cuerpo, en cualquier momento**
y no sólo al jugar una carta — mejor conversión, pero es `[Action]`, es Mind, y ya está catalogada.

**VEREDICTO: verified.** `ledros-bird-power-discount`, 3 cartas (4 copias).

---

## Bloque 5 — candidata 5, REESCRITA: el 4 contra 10 se sostiene, pero sólo en la pasada de Power

```
UNL-061 | Downstage Dramatics | Spell | Mind | E2 | [Reaction] (…) [Repeat] :rb_energy_2: (You may pay
the additional cost to repeat this spell's effect.) Draw 1.
```

**820.1.c.1** (el Repeat es un Additional Cost pagado al jugar) y **820.1.c.3** (*"Each Repeat Cost can
be paid only a single time"*) fijan el techo: **4 Energía → Draw 2, nunca Draw 3.**
Y **el Repeat es obligatorio para que la entrada exista**: sin pagarlo son 2 Energía y Draw 1, y ese
único draw se lo come el propio hechizo para volver a la mano → **neto 0**. Esto no estaba medido.

### Los dos ledgers, releídos (`docs/phase0/walks/2026-09-04-loop-budget-ledger.md`)

| por pasada | pasada de Energía | pasada de Power |
|---|---|---|
| slots de la Forge usados | 3 de 4 (Forge, Shadow's Call, Sacrifice) | 2 de 4 (Forge, Retreat) |
| **slots libres** | **1** | **2** |
| cartas que entran al mazo | 4 (esas 3 + Ekko que se recicla solo) | 2 |
| draws | 4 (Shadow's Call 2 + Sacrifice 2) | 2 (Lecturing Yordle ×2) |
| **draws libres** | **0** | **0** |

Y el texto de la Forge, verbatim: `OGN-212 | Forge of the Future | Gear | Order | E2 | … Kill this:
**Recycle up to 4 cards from trashes.**` — **cuatro es un tope duro por activación.**

### La identidad contable

Sobre cualquier ciclo cerrado, **cartas dibujadas = cartas recicladas al mazo**. Una carta extra
ciclada necesita entonces **un slot Y un draw**, las dos cosas. Eso es lo que #44 no separó.

```
PASADA DE ENERGIA, con Downstage Dramatics en la rotacion
  slots: 4 de la Forge + 1 de Ekko = 5 disponibles
         usados 4 por el loop + 1 por DD  ->  0 slots libres
  draws: 4 del loop + 2 de DD = 6
         necesarios 4 (loop) + 1 (redibujar DD)  ->  +1 draw libre
  => DD CONVIERTE el unico slot libre EN un draw libre. Neto para "una carta extra ciclada": CERO.
     La carta objetivo se queda sin slot. En la pasada de Energia, DD NO reemplaza al draw de Renata.

PASADA DE POWER, que tiene 2 slots libres
  Forge recicla: Forge, Retreat, la carta objetivo X, y DD  = 4 de 4
  draws: 2 (Lecturing Yordle) + 2 (DD) = 4 ; cartas que entran = 4  -> cuadra
  coste extra: 4 Energia (DD con Repeat), CERO Power
```

Contra el precio del ledger para lo mismo — *"an extra cycled card costs 1 Energy + 1 Mind Power ≈ 10
Energy"*, vía la habilidad de Renata Mastermind que **no lleva exhaust** y por eso es ilimitada —
**4 contra 10 se sostiene**, y lo que de verdad importa no es el 4: es que **DD no gasta Power**, y el
Power es justo lo que el motor tiene que fabricar a 9 Energía la unidad.

### Por qué el mazo alcanza para que vuelva

`lux-infinite-energy` declara *"Main Deck EMPTY"* en sus prerequisites: durante el loop el mazo tiene
4 o 5 cartas. **416.1** manda el reciclado al fondo, pero un fondo de 5 cartas se vuelve a levantar en
la misma pasada. Y hay que **secuenciar** para no tocar Burn Out: la pasada de Power termina con 1
carta en el mazo, que es la que absorbe el sexto draw de la pasada de Energía siguiente.

**103.1.b.1**: Mind entra en Mind/Order, que es la identidad del motor. La entrada `needs`
`infinite-energy` **y** `infinite-power`, porque la derivación se apoya en los 2 slots libres de la
pasada de Power.

**VEREDICTO: verified, reescrita.** `downstage-dramatics-lux-draws`, 1 carta.

Nota fuera de la lente, para el manager: la frase de `CLAUDE.md` sobre los ~10 Energía **no está mal**
— es el precio de la ruta **sin slot**. Lo que le falta es la cláusula *"y 4 Energía si hay un slot
libre de la Forge, que sólo la pasada de Power garantiza"*. **No la edité.**

---

## Bloque 6 — candidata 6, verified con el argumento cambiado

```
UNL-166 | Stalking Wolf | Unit | Order | E4 P1 M6 | [Ambush] (You may play me as a [Reaction] to a
battlefield where you have units.) As an additional cost to play me, kill a Bird, Cat, Dog, or Poro you
control. You may [Ambush] me to its battlefield, even if you don't have other units there.
[Tags: Dog, Freljord]
```

**356.2.a.1** (*"as an additional cost"* sin *"may"*) hace que matar la ficha sea **obligatorio**: el
Wolf es **injugable** sin un Bird, Cat, Dog o Poro en juego. Ésa es la dependencia que hace de esto un
par y no una carta suelta.

**El combustible es exactamente el tag**, verificado contra el corpus:
`UNL-T02 | Bird | Unit | Colorless | M1 | [Deflect] … [Tags: Bird]` sirve;
`UNL-160 Ultrasoft Poro` sirve por sí mismo (`[Tags: Poro, Freljord]`);
**`UNL-153 Carrion Dredger` NO sirve** — es `[Tags: Mech, Zaun]`, aunque **el Bird que fabrica sí**.

### El argumento de #44 estaba mal aunque la conclusión sirva

#44 cerró la puerta al battlefield enemigo con **355.2.a** (*"las fichas sólo pueden haberse jugado a
tu base o a un battlefield que controlás, así que nunca hay una ficha tuya donde no tenés presencia"*).
**355.2.a habla de dónde se JUEGA una ficha, no de dónde puede estar**: una ficha se mueve, y moverse a
un battlefield enemigo es exactamente cómo se ataca. El argumento no cierra.

El que sí cierra es **813.3.a**: *"Playing Units with Reaction still has the inherent restrictions of
playing Units without Reaction. It can only be played to the controlling player's base or a battlefield
they control."* Y **822.1.c** dice que Ambush *"adds options to locations that are valid"*, o sea que
lo que la cláusula final del Wolf levanta es el requisito **propio de Ambush** (822.1.b, *"where you
control Units"*), no la restricción de 813.3.a.

**La entrada se escribe sin necesitar resolverlo**: declara sólo la línea que ningún par de reglas
discute — Ambush a un battlefield **que controlás** donde ya no te queda ninguna unidad, porque tu
última ficha ahí es justamente la que sacrificás. Si alguna vez hiciera falta el caso del battlefield
enemigo, la pregunta queda localizada acá (822.1.c contra 813.3.a) y **no se archivó como lectura**,
igual que #44 hizo con 809.2.

### Lo que hace, acotado, y la aritmética

```
6 Might a velocidad de Reaction, en el battlefield donde estaba la ficha, DESPUES de que el rival gasto su turno
Ultrasoft Poro: 2 Birds por turno (una activacion, 415.3.a) -> sostiene 1 Wolf por turno
cada Wolf: 4 Energia + 1 Order Power + 1 ficha ; 3 copias (103.2.b) = 3 cuerpos a destiempo
143.4: el Wolf entra EXHAUSTED -> no ataca ni se mueve el turno que llega
464.2.c.3.a: pero gana la designacion de Defender en el Cleanup siguiente, que es todo su valor
```

**VEREDICTO: verified.** `stalking-wolf-bird-ambush`, 2 cartas (4 copias).

---

## Bloque 7 — candidata 7, verified y más fuerte de lo que #44 escribió

```
UNL-142 | Heedless Resurrection | Spell | Chaos | E2 P1 | [Reaction] (…) As an additional cost to play
this, kill a friendly unit. Play a unit from your trash that costs no more Energy and no more Power
than the killed unit, ignoring its cost.
```

La secuencia:

```
1. el rival juega una remocion ELIGIENDO tu unidad X (y paga el impuesto de Deflect si X lo tiene)
2. en respuesta, Heedless Resurrection matando a X como coste adicional (356.2.a.1: obligatorio)
   428.1.a.1 / 428.1.a.1.b: si X tiene [Deathknell], entra en la cadena antes de completarse el kill
3. la remocion resuelve sobre un blanco que ya no existe
   359.3.e.5: "those game objects … are unaffected by the spell as it resolves"
   355.7: en Riftbound "choose" ES "target", asi que 359.3.e.5 aplica
```

### Lo que #44 no vio: X se reanima a sí misma

El coste se paga en el paso de pagar costes, **antes** de que el hechizo quede en la cadena; cuando
Heedless Resurrection resuelve, **X ya está en el trash**. Y el filtro es *"costs no more Energy and no
more Power than the killed unit"*: **X cuesta exactamente lo que X**, así que **X califica**. El texto
no dice *"another unit"*.

O sea que la carta no es *"cambiá un cuerpo por otro más barato"*: es **"tu unidad esquiva la remoción y
vuelve al board, ignorando su coste"**, por 2 Energía + 1 Power. Vuelve **exhausted** (143.4) y como
objeto nuevo.

### Qué la refuta

- *"no more Energy **and** no more Power"* son **dos** topes a la vez: matar algo barato no trae nada
  caro.
- **186.1** (*"If a token is put into any Non-Board Zone besides the chain, it ceases to exist"*): un
  token **nunca** llega al trash y no tiene coste, así que matar un Bird no reanima nada. Hay que gastar
  una unidad real.
- Contra remoción que **no elige** (`OGN-133 Flurry of Blades`, `OGN-268 Bullet Time`) el truco del
  blanco ilegal no existe; queda sólo el intercambio de cuerpos.
- Y si X tiene Deathknell, éste sí dispara (428.1.a.1.b) — al revés que bajo un escudo de recall
  (808.1.d.1, bloque 1). Las dos cartas resuelven el mismo problema por caminos opuestos.

**VEREDICTO: verified.** `heedless-resurrection-removal-blank`, 1 carta ×3.

---

## Resumen

| # | id final | clase | estado | cambio |
|---|---|---|---|---|
| 1 | `soraka-fiora-loop-shield` | ENGINE | verified | **reescrita** — Soraka (Order, ilimitada) reemplaza a Tactical Retreat ×3; 415.3 → 414.4; +808.1.d.1 |
| 2 | `seal-power-faucet-bootstrap` | ENGINE | verified | aritmética corregida: 1 runa, no 3; y el techo de 12 no existe |
| 3 | `tianna-wildclaw-point-lock` | ENGINE | verified | **reescrita** — Allay fuera (no hace nada + 809.2 sin resolver), Alpha Wildclaw dentro |
| 4 | `ledros-bird-power-discount` | ENGINE | verified | turno del Poro corregido; el ahorro se re-precia contra el bloque C |
| 5 | `downstage-dramatics-lux-draws` | ENGINE | verified | **reescrita** — el 4 contra 10 sólo cierra en la pasada de Power; el Repeat es obligatorio |
| 6 | `stalking-wolf-bird-ambush` | ENGINE | verified | conclusión igual, argumento cambiado (813.3.a, no 355.2.a) |
| 7 | `heedless-resurrection-removal-blank` | ENGINE | verified | más fuerte: X se reanima a sí misma |

**7 verified, 0 refutadas, 3 reescritas. Ninguna INFINITE.** Ninguna lectura de reglas nueva archivada:
la pregunta de "here" la contesta el ejemplo trabajado de 373.2, la de Ambush contra battlefield enemigo
se evitó escribiendo la entrada sin ella, y la de 809.2 se evitó cortando Allay.
