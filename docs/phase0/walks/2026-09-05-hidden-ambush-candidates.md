# Hand walk — las 9 candidatas de la lente del escondite ([Hidden]/[Ambush]), issue #40

Fecha: 2026-09-05. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt` (935 cartas, gallery API 2026-09-04, errata aplicada).
Sesión: `rc-walk40`.

**Resultado: 9 de 9 verified. 0 refutadas. 4 reescritas** (candidatas 1, 2, 7 y 9).
**Ninguna resultó INFINITE.** El veredicto estructural D de #40 se vuelve a medir abajo, no se hereda.

Además de las nueve, este walk cierra las dos tareas que #40 dejó abiertas sobre `combos.json`:
el riesgo de **323.7** en las entradas que esconden cartas (bloque 3) y la corrección del Grand
Plaza aplicada a `spiderling-swarm-grand-plaza` (bloque 2, candidata 5).

---

## Bloque 0 — cada regla que estas entradas citan, abierta y pegada

Se hizo primero y en bloque. La auditoría de citas del proyecto encontró tres entradas que citaban
una regla que decía lo contrario de lo que afirmaban, así que ninguna cita de #40 se dio por buena.

### El escondite

- **811.1.b** — *"It is functionally short for \"While this card is in your hand or in your Champion
  Zone on your turn during an Open State, you may pay [A] to hide this facedown at a battlefield you
  control that doesn't already have a facedown card hidden there for as long as you control that
  battlefield. Beginning on the next turn, this gains [Reaction] and you may play this, ignoring its
  base cost.\""* → CONFIRMADA palabra por palabra como la cita #40 (líneas 6663-6667).
- **811.1.c.1** — *"Hide is not a subset of Play."*
- **811.1.c.2** — *"Hiding a card does not open a chain."*
- **811.1.c.3** — *"Playing a card from facedown (or \"from Hidden\") does open a chain."* → hace que
  *"from face down"* (Black Market Broker, Katarina) y *"from Hidden"* sean lo mismo.
- **811.1.d** — *"Some choices made while playing a card from Hidden are restricted to the battlefield
  where it was hidden. A card cannot be played from Hidden if it is a spell with no valid targets
  under these restrictions."*
- **811.1.d.1** — *"A hidden permanent must be played to that battlefield."*
- **811.1.d.2** — *"If a hidden spell or a play effect of a hidden permanent chooses any targets, those
  targets must be chosen from among options at that battlefield, unless the ability explicitly
  restricts targeting in a way that makes this impossible."*
- **811.1.d.3** — *"If a hidden spell or a play effect of a hidden permanent causes you to play a unit,
  you must choose to play that unit at that battlefield."*
- **811.2** — *"Abilities and instructions of hidden cards other than the choices listed above function
  as normal."*
- **811.3** — *"Instead of being hidden, a card with Hidden may be played for its cost as normal, at
  its normal timing with no restrictions on targeting."*
- **811.4** — *"Multiple instances of Hidden are redundant."* (de un mismo permanente)
- **811.6** — *"A card that is Hidden gains Reaction while facedown or played from facedown, and may be
  played any time a card with Reaction may be played as a result."*
- **421.1** — *"Hiding a card is the act of placing a card facedown at a Battlefield you control."*
- **421.2** — *"Hiding is a Discretionary Action."* → esconder NO es jugar; es lo que hace que el
  *"When you hide a card"* de Katarina sea un evento distinto del *"When you play a card from face down"*.
- **107.3.f** — *"Facedown Zones are Public Zones, though facedown cards located there are Private."*
  → una carta escondida no está en tu mano; alimenta el *"from anywhere other than your hand"* de
  Heart of the Tempest.

### 323.7 — el riesgo que ninguna entrada del catálogo tenía escrito

- **323.7** (paso 5 de un Cleanup) — *"Recall all Unattached non-Unit Gear and non-Unit Runes at
  Battlefields, and all Permanents and Runes in Bases other than their controller's. **Remove all
  Hidden cards from all Battlefields that are not controlled by the same player and place them in
  their owner's Trash.**"*
- **466.5.c** — *"Remove all Hidden cards from this Battlefield that do not share a controller with the
  Battlefield."* → lo mismo, en el instante en que alguien establece Control.

CONFIRMADAS las dos, y confirmada la lectura de #40: perder el battlefield no apaga el escondite, lo
**destruye**. Es un coste real, no un inconveniente. Bloque 3 lo escribe en las entradas.

### Ambush

- **822.1.b** — *"It is functionally short for \"I may be played to a battlefield where you control
  Units\" and \"I have [Reaction] as long as I'm being played to a battlefield where you control
  Units.\""*
- **822.1.c** — *"It is a passive ability that adds options to locations that are valid for a Unit to be
  played to during the Make Relevant Choices step of Playing a Card."*
- **822.3** — *"If there are no units at the location chosen before Finalization completes for any
  reason, then it is no longer a valid location by Ambush's reasoning and cannot be played there."*
- **813.3.a** — *"Playing Units with Reaction still has the inherent restrictions of playing Units
  without Reaction. It can only be played to the controlling player's base or a battlefield they
  control."*
- **355.2.a** — *"By default, Valid locations include the controller's Base or a Battlefield the
  controller controls."*
- **355.2.b** — *"Some Game Effects may grant players permission to play Units to locations that are
  not normally Valid. Such locations become Valid for the purposes of Playing the Unit."*

CONFIRMADO el hallazgo C de #40: `[Hidden]` (811.6) compra **timing**, `[Ambush]` (822.1.b) compra
**timing y lugar**. Un `[Hidden]` no puede entrar a un battlefield ajeno; un `[Ambush]` sí.

### El ambush dentro de un combate en curso

- **464.2.c.3** — *"The attacker and defender gain the Attacker or Defender designation now, as
  appropriate. Units at the Contested Battlefield controlled by the Attacker or Defender gain the
  Attacker or Defender designation now, as appropriate."*
- **464.2.c.3.a** — *"If a Unit controlled by the Attacker or Defender becomes present at this
  Battlefield after this moment, it will gain the Attacker or Defender designation during the Cleanup
  phase following the action that caused it to become present, as appropriate for its controller."*
- **319.6** — un Cleanup se vuelve Outstanding Task *"After any number of Game Objects enter or leave
  the Board"*.
- **320** — *"While a Cleanup is occurring, Chain Items cannot be Finalized or Resolved."*
- **383.4.e** — *"Attack Triggers are Triggered Abilities that trigger when a Unit or Player gains the
  Attacker designation for the first time during a combat."*
- **383.4.e.2.a** — *"These triggers will only have their condition checked once per combat, despite a
  Unit being able to gain and lose the Attacker designation multiple times in the same combat."*
- **465.2** — *"When the Showdown closes, Attackers and Defenders resolve Combat Damage at the
  Battlefield that was attacked, using their current Might."*

CONFIRMADO el hallazgo C entero: el ambush entra → Cleanup inmediato → designación de Attacker →
el trigger de ataque va a la chain → el daño todavía no se resolvió. Las cuatro citas de #40 dicen
lo que #40 dice que dicen.

### Combate, showdown y conquer

- **461** — *"Combat is considered Staged if there are units controlled by two opposing players at a
  Battlefield but the Steps of Combat have not been initiated."* → sin guarnición enemiga no hay
  combate y no hay Attacker designation (trampa 1 de `CLAUDE.md`).
- **462** — *"Combat can only occur between Units controlled by exactly two players."*
- **347.1** — durante un showdown un jugador con Focus puede *"Play a Card or Activated Ability that is
  legally timed"* → el showdown es una ventana real.
- **466.3.a** — *"A Player has won a combat if they received either the attacker or defender
  designation and are the only Player that has units remaining at this battlefield during this step."*
- **466.5** — *"If no Showdown or Combat is staged at this location, the player with Units remaining
  here Establishes Control if they didn't already control this Battlefield."*
- **466.5.d** — *"Establishing Control results in a Conquer if that player has not yet scored this
  Battlefield this turn."*
- **348.2.a / 348.2.a.1** — *"If only one player's Units remain at the Battlefield, and if that player
  does not already Control the Battlefield, that player establishes Control over the Battlefield."* /
  *"This results in a Conquer if that player has not yet scored that Battlefield this turn."*
- **469.1** Conquer, **469.2** Hold, **470** — *"A player may only Score, from either method, once per
  Battlefield per turn."*
- **471.1.b.1** — *"If the player has Scored every Battlefield this turn, that player Gains the Final
  Point. If the player has not Scored every Battlefield this turn, that player draws a card instead."*

### Daño, stun y excess damage

- **423.1.b** — *"A Stunned Unit does not contribute its might to damage in the combat damage step."*
- **423.1.c** — *"A Stunned Unit must still have damage applied to it equal to, or greater than, its
  full might value to be killed."* → el stun **no** abarata matarlo; sólo le quita su daño de salida.
- **423.1.a.2** — *"Stunned Units lose the Stunned status during step 3d of the end of turn cleanup."*
- **465.2.c** — *"Starting with the Attacker, each player assigns an amount of damage equal to their
  summed Might among the other's Units."*
- **465.2.c.4** — *"Units cannot have more damage assigned to them than the minimum required to
  constitute lethal damage unless no further units remain to have damage assigned to them."*
- **465.2.c.4.a** — *"If the damage assigned to a Unit is modified to or replaced by an amount of damage
  larger than the initial value, the assigning player must choose the minimum applied value such that
  the unit would take lethal damage."* Su ejemplo trabajado usa **el texto de Lotus Trap palabra por
  palabra** (*"Double all damage that would be dealt to it this turn"*) y concluye que a una unidad de
  3 Might se le asignan **2**, que se doblan a 4.
- **465.2.c.5** — su tercer ejemplo **nombra a Lotus Trap**: *"That unit has a prevent value of two
  being applied to it, as well as the effect of Lotus Trap, doubling the damage dealt to them."*
- `grep -in "excess damage"` sobre las Core Rules devuelve **0 líneas**. La frase está impresa en 6
  cartas (OGN-034, SFD-120, UNL-018, UNL-187, UNL-188, UNL-217) y definida en ninguna regla: por eso
  hizo falta **R28 = A** (ruleada 2026-09-04), *"attacking Might that never got assigned"*.

### Jugar cartas desde un efecto

- **419.3** — *"Game effects may result in cards being played as part of their resolution."*
- **419.3.a** — *"This treats Play as a Limited Action."*
- **419.3.b** — *"Treat all steps of Play as normal, except as noted by the game effect creating this
  Limited Play Effect."*
- **419.4.a** — *"Any such triggered abilities trigger when the act of playing the card has been
  completed by the resolution of the card."*
- **419.4.a.1** — si la carta es contrarrestada, los triggers de "cuando juegues" **no** disparan.
- **356.1.b.1** — *"If a card allows a player to play a card \"ignoring its cost,\" its base Energy cost
  and base Power cost are set to zero."*

**CORRECCIÓN a #40, candidata 3.** El issue no dice con qué regla Ava juega un hechizo que **no
imprime ni `[Action]` ni `[Reaction]`** en medio de un combate. `VEN-066 Temporal Breach` es una de
las **90 cartas de hechizo del pool sin palabra clave de timing** (medido: `awk` sobre el corpus), así
que su timing por defecto no alcanza para jugarla en un showdown. La viga es **419.3.a**: jugar por
instrucción de un efecto es una **Limited Action**, no la Discretionary Action que 419.2 y las palabras
de timing gobiernan. Las entradas 3 y 4 citan 419.3.a/419.3.b.

### Tokens, Oro y entrar listo

- **187.5** — *"A Gold gear token is a domainless gear token with \"[Reaction][>] Kill this, [E]: [Add]
  [A].\""* → el coste incluye **exhaust**, que es exactamente por qué R25 importa.
- **143.4** — *"Units enter the Board exhausted."*
- **315.1.b** — Awaken: *"The Turn Player readies all Game Objects they control that are able to be
  readied."*
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
  each player's turn."* El Oro es **gear**, no Power en la pool: se guarda entre turnos y 167 no lo toca.
- **144.2** — *"Exhausting the Unit is the Cost for this action"* (Standard Move).
- **R25 = A** (ruleada 2026-09-04): *"Your tokens enter ready"* de Renata Glasc, Industrialist gana al
  *"play a Gold gear token exhausted"* impreso en el generador.

### Battlefields

- **190.1** — *"Control is established over Battlefields through the course of play."*
- **190.6.d** — *"\"You\" in a battlefield's abilities refers to the battlefield's Controller... If the
  battlefield has no Controller, \"you\" refers to no one, and all such instructions are ignored."*
- **485.4** *Battlefield Count: 2* / **485.4.a** *"Each player provides three (3) Battlefields... Only 1
  will be used"* / **485.5** Duel *"randomly selects"* / **486.5** Match *"selects"* / **487.5** Skirmish
  *"randomly selects"*.
- **103.4.c** — *"Cannot include more than one of a Battlefield of the same name when there are more
  than one required for the deck."* + Tournament Rules **402.1**.

### Deckbuilding

- **103.1.b.4** — una carta multidominio *"is permitted only in a Domain Identity that contains all of
  the indicated Domains"*.
- **103.2** — *"A Main Deck of at least 40 cards"*.
- **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."*
- **002** (Golden Rule) — *"Card text supersedes rules text. Whenever a card fundamentally contradicts
  the rules, the card's indication is what is true."* → es la regla que hace legal el *"Your deck can
  have any number of cards named Spiderling"* contra 103.2.b, y el segundo slot del Bandle Tree contra
  el *"that doesn't already have a facedown card hidden there"* de 811.1.b.
- **383.2.a.1** — *"Any additional conditional statement immediately after the Condition must be true in
  order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger
  Condition and not the Effect."*
- **383.2.c** — *"The Condition of a Trigger is evaluated after a potentially inciting event has been
  processed."*

### El apilado, corrido de nuevo en esta sesión

`grep -n "redundant"` sobre las Core Rules devuelve **exactamente siete líneas**: 805.4 (Accelerate),
810.2 (Ganking), **811.4 (Hidden)**, 815.2 (Tank), 816.2 (Temporary), **822.2 (Ambush)**, 826.5
(Backline). Las siete son de keyword y hablan de **un mismo objeto** con la palabra clave repetida.
**No hay regla general de redundancia**, así que tres Black Market Broker distintos disparan tres
veces. Es el mismo cierre de #32 y #36, corrido otra vez y no heredado.

### Chequeo de bans

Las 22 cartas de estas nueve candidatas se grepearon contra el marcador `[BANNED` del corpus:
**ninguna aparece**. La única carta de la familia que sí está baneada es `OGN-168 Fight or Flight`
(`constructed:banned, 2v2:banned`), y no la usa ninguna candidata — pero sí achica el pool de
`[Hidden]` de Chaos de 11 a 10, lo que importa para el techo de las candidatas 1, 2 y 7 (abajo).

### Las cinco trampas de autoría, corridas contra las nueve

Leídas de `CLAUDE.md` (no de memoria):

1. **Entrar a un battlefield enemigo vacío no es un ataque** (807.1.d, 383.4.e, 461). Muerde en las
   candidatas 3, 4, 8 y 9: las cuatro exigen guarnición enemiga y las cuatro lo dicen en su
   `prerequisites`.
2. **Energy añadida en Awaken o en la Beginning Phase se pierde al empezar la Main Phase** (167).
   No muerde en ninguna: lo que producen es **Oro gear**, que no vive en la Rune Pool.
3. **Un Repeat no da ventana para re-exhaustar** (429.3, R21). No hay `[Repeat]` en ninguna candidata.
4. **Los tokens `[Temporary]` mueren antes del Scoring** (816.1.b). No muerde: el Sand Soldier de
   Guards!, los Spiderlings y las fichas de Oro no son `[Temporary]`. Es justamente lo que separa a la
   candidata 5 de `leblanc-temporary-plaza`.
5. **Un recall no es un move y no cambia estado** (456, 458). Toca la candidata 4: el *"Lose control of
   that unit and recall it at end of turn"* de Hostile Takeover pasa **después** del conquer y no
   devuelve el punto.

---

## Bloque 1 — el veredicto estructural D, medido de nuevo

#40 afirma que en esta lente **no hay INFINITE**, y que la razón es *"Beginning on the next turn"* en
811.1.b. Confirmado, y con la cuenta hecha:

- El techo de flips por turno es el **número de slots que controlás**, y un slot es *"a battlefield you
  control that doesn't already have a facedown card hidden there"*. En Duel hay **2 battlefields en
  total** (485.4), así que el máximo es 2 slots, o 3 con `OGN-278 Bandle Tree` bajo tu control y el
  battlefield rival conquistado.
- Cada flip **consume una carta**. No hay ningún efecto en el pool que devuelva una carta al estado
  escondido dentro del mismo turno: `OGN-181 Pack of Wonders` (*"Return another friendly gear, unit, or
  facedown card to its owner's hand"*) libera el slot pero la carta devuelta vuelve a esperar un turno
  entero por 811.1.b, y `OGN-264 Guerilla Warfare` (*"You can hide cards ignoring costs this turn"*)
  abarata el escondite, no lo acelera.
- Del lado `[Ambush]`, 822 no imprime ni reducción de coste ni repetición.

**Corrección de énfasis a #40.** El issue presenta el slot como *"el recurso escaso de la lente"*.
Medido, el recurso escaso es la **carta con `[Hidden]` en la mano**, igual que el ledger de la loop de
Lux (`docs/phase0/walks/2026-09-04-loop-budget-ledger.md`) encontró que el recurso escaso de un loop
son los draws y no los slots de reciclado. Con 2 slots gastás 2 cartas por turno; el pool entero de
`[Hidden]` legal para una identidad de dos dominios es de 15 a 20 nombres distintos, no infinito:

| identidad | cartas con `[Hidden]` legales | nota |
|---|---|---|
| Order/Chaos (VEN-155) | **15** | 16 con `[Hidden]` menos `OGN-168 Fight or Flight`, baneado |
| Mind/Chaos (OGN-263 y 3 más) | **18** | 20 hits menos Swift Scout y Guerilla Warfare, que sólo *mencionan* `[Hidden]`, menos Fight or Flight |
| mono-Order | **5** | OGN-213, OGN-220, SFD-154, VEN-117, VEN-135 |
| mono-Fury | **6** | incluye UNL-013 Lotus Trap |

Con 3 copias cada uno eso alcanza para muchos turnos, pero es un **techo de mazo**, y por eso ninguna
de las nueve es INFINITE. Ninguna se promueve de clase.

---

## Bloque 2 — las nueve, una por una

### 1. `black-market-broker-bandle-tree-gold` — ENGINE — **VERIFIED (reescrita)**

Texto verbatim (corpus, líneas 449, 499, 284, 482):

```
SFD-121 | Black Market Broker | Unit | Chaos | E3 M3 | When you play a card from face down, play a Gold gear token exhausted. [Tags: Zaun]
SFD-171 | Renata Glasc, Industrialist | Unit | Order | E4 P1 M4 | Your tokens enter ready. [Tags: Renata Glasc, Zaun]
OGN-278 | Bandle Tree | Battlefield | Colorless | - | You may hide an additional card here.
SFD-154 | Guards! | Spell | Order | E3 | [Hidden] (...) Play a 2 :rb_might: Sand Soldier unit token. Then do this: You may pay :rb_rune_order: to ready it.
```

Camino, paso a paso:

1. Controlás el Bandle Tree. Antes de controlarlo su texto **está apagado** (190.1 + 190.6.d) y además
   811.1.b sólo deja esconder *"at a battlefield you control"*: no hay medio slot, hay cero.
2. Con el Tree bajo control hay **2 slots ahí** — 811.1.b da uno, *"You may hide an additional card
   here"* da el segundo por 002. Un tercero existe sólo si además conquistaste el battlefield rival.
3. Turno N, Open State de tu turno: escondés 2 cartas con `[Hidden]`. Coste `[A]` cada una = **2 Power
   arcoíris**.
4. Turno N+1 (o ya en el turno del rival: 811.1.b dice *"Beginning on the next turn"* y 811.6 le da
   `[Reaction]`, así que la ventana se abre en el turno del rival): flipeás las dos, **ignorando su
   coste base**.
5. Cada flip es *"play a card from face down"*, que por 811.1.c.3 es lo mismo que *"from Hidden"*.
   Los **3 Brokers** son tres permanentes distintos con tres habilidades disparadas distintas — no hay
   regla de redundancia entre objetos (el grep de las siete cláusulas, arriba) — así que **2 flips × 3
   Brokers = 6 fichas de Oro**.
6. Renata Glasc, Industrialist: *"Your tokens enter ready"* pisa el *"exhausted"* impreso del Broker.
   **R25 = A**, ruleada 2026-09-04 sobre exactamente esta redacción. Las 6 fichas entran listas, y por
   187.5 cada una es *"Kill this, [E]: [Add] [A]"* = 1 Power arcoíris a demanda.
7. Volvés a esconder 2: **−2 Power**.

**Neto por turno: +4 fichas de Oro** (6 − 2), o sea +4 Power arcoíris **guardado**, porque el Oro es
gear y 167 vacía la Rune Pool pero no la mesa.

Valores vecinos, escritos: con **1** Broker el neto es **0** (2 Oro menos 2 escondites — el motor sólo
se paga a sí mismo); con **2** es **+2**; con 3 slots y 3 Brokers, **+6**. El salto está en el segundo
Broker.

El payload va encima y es gratis: `SFD-154 Guards!` flipeado cuesta 0 (811.1.b), y **811.1.d.3** manda
al Sand Soldier al battlefield donde estaba escondida la carta, o sea al Bandle Tree. Renata lo hace
entrar **ready**, así que la cláusula *"You may pay :rb_rune_order: to ready it"* nunca se paga.

**REESCRITA en tres puntos frente a #40:**

1. **El techo no es el slot, es la carta.** #40 escribe el ciclo como un estado estable perpetuo. No lo
   es: cada flip quema una carta con `[Hidden]`, y Order/Chaos tiene **15 nombres** legales (16 menos
   Fight or Flight, baneado). El motor corre mientras te queden; no es perpetuo.
2. **El flip puede caer en el turno del rival.** 811.1.b abre la ventana *"beginning on the next turn"*
   y 811.6 le da `[Reaction]`: no hace falta esperar a tu propio turno N+1. Con Renata el Oro entra
   listo igual, así que el efecto es tener el Power disponible un turno antes en la ventana del rival.
3. **Bandle Tree y The Grand Plaza se excluyen.** Los dos son battlefields tuyos y 485.4.a mete uno
   solo de tus tres: esta entrada y la candidata 5 no conviven. #40 ya lo decía; queda en `notable`.

**Qué la refutaría:** perder el Bandle Tree — 323.7 no apaga el motor, te **trashea** las dos cartas
escondidas. Renata muerta antes del flip manda el Oro a exhausted y el Power llega en tu Awaken
(315.1.b). Y en Duel el Tree sale al azar 1 de 3 (485.5).

**Clase: ENGINE.** No hay punto en ningún paso. No sube.

---

### 2. `swift-scout-guerilla-hide-cycle` — ENGINE — **VERIFIED (reescrita)**

```
OGN-263 | Swift Scout | Legend | Mind/Chaos | - | You may pay :rb_energy_1: to hide a card with [Hidden] instead of :rb_rune_rainbow:. :rb_energy_1:, :rb_exhaust:: Put a Teemo unit you own into your hand from your Champion Zone or the board. [Tags: Teemo]
OGN-264 | Guerilla Warfare | Spell | Mind/Chaos | E2 P1 | Return up to two cards with [Hidden] from your trash to your hand. You can hide cards ignoring costs this turn. [Tags: Teemo]
OGN-101 | Mushroom Pouch | Gear | Mind | E2 | At the start of your Beginning Phase, if you control a facedown card at a battlefield, draw 1.
```

Swift Scout reemplaza el `[A]` de 811.1.b por **1 Energy**. Eso es lo único que hace esta entrada y es
suficiente: convierte el ciclo en un **convertidor Energy → Power**. El ledger de la loop de Lux
(`docs/phase0/walks/2026-09-04-loop-budget-ledger.md`) cotiza el Power a **~9 Energy**; acá 1 Energy y
una carta compran 3 Power con 3 Brokers.

Sin Renata (es Order, y Mind/Chaos no la admite por 103.1.b.4) el Oro entra **exhausted**. Y acá está
la corrección que #40 no hizo:

**REESCRITA — el retraso es de un turno, no de dos, y sólo si flipeás en el turno del rival.** 315.1.b
readya en el Awaken **del turno del que readya**. Si escondés en tu turno N y flipeás en tu propio
turno N+1, el Oro entra exhausted en N+1 y no se readya hasta el Awaken de **N+2**. Lo que arregla eso
es 811.6: la carta escondida tiene `[Reaction]`, y 811.1.b abre la ventana *"beginning on the next
turn"*, que es el turno **del rival**. Flipeando ahí, el Oro entra exhausted durante el turno del rival
y se readya en **tu** Awaken de N+1. La entrada declara ese orden, no el de #40.

**Tasa declarada: 1 Energy + 1 carta con `[Hidden]` → 3 Power arcoíris disponibles al turno
siguiente**, por Broker-triplete. Con 2 slots, 2 Energy → 6 Power.

**REESCRITA — el segundo slot hay que decir de dónde sale.** #40 escribe *"2 slots, sin Bandle Tree"*
sin decir de dónde. Sólo hay dos fuentes: conquistar el battlefield rival (y entonces 323.7 te cobra
las cartas si lo perdés), o traer el Bandle Tree, que es Colorless y entra en este mazo igual que en el
de la candidata 1. Con un solo battlefield propio el slot es **uno**.

**Tensión real con Mushroom Pouch, que #40 no anota:** el Pouch pide *"if you control a facedown card at
a battlefield"* **al empezar tu Beginning Phase**. Si flipeaste todo en el turno del rival, el slot está
vacío y no robás. Con 2 slots se hacen las dos cosas: uno se flipea, el otro se queda hasta después de
tu Beginning Phase.

`OGN-264 Guerilla Warfare` es la única recursión de cartas escondidas del pool: devuelve **2 cartas con
`[Hidden]` del trash a la mano**, y ese turno los escondites salen 0. Sólo alcanza a los **hechizos**
flipeados: las unidades con `[Hidden]` se quedan en mesa y nunca pasan por el trash. Topeada en 3
copias (103.2.b) → 6 recursiones por partida.

Detalle que vale escribir, el mismo que `CLAUDE.md` registra para Renata Mastermind: la **primera**
habilidad de Swift Scout no lleva `:rb_exhaust:`, sólo la segunda. Las dos no compiten.

**Clase: ENGINE.**

---

### 3. `ava-achiever-temporal-breach-trove-golem` — ENGINE — **VERIFIED**

```
OGN-107 | Ava Achiever | Unit | Mind | E5 M4 | When I attack, you may pay :rb_rune_mind: to play a card with [Hidden] from your hand, ignoring its cost. If it's a unit, play it here. [Tags: Yordle]
VEN-066 | Temporal Breach | Spell | Mind | E2 P1 | [Hidden] (...) Banish a unit, then its owner plays it to the same location, ignoring its cost.
SFD-174 | Trove Golem | Unit | Order | E8 P2 M9 | When you play me, play four Gold gear tokens exhausted. [Tags: Freljord]
```

Ava es la única carta del pool que juega una carta con `[Hidden]` **desde la mano** ignorando su coste.
Eso saltea **811.1.d entero**: 811.1.d restringe *"choices made while playing a card **from Hidden**"*,
y Ava no juega desde el escondite. Por 811.3 la carta se juega normalmente *"with no restrictions on
targeting"*, y por 356.1.b.1 el *"ignoring its cost"* pone E y P en cero, Power incluido.

**La pieza que #40 no citó y que la entrada necesita**: Temporal Breach **no imprime `[Action]` ni
`[Reaction]`** (es una de las 90 cartas de hechizo del pool sin palabra de timing), así que por sí sola
no se juega en medio de un combate. La regla que lo permite es **419.3/419.3.a**: jugar por instrucción
de un efecto es una **Limited Action**, no la Discretionary Action que gobiernan 419.2 y las palabras
de timing.

Camino:

1. Trove Golem desplegado **en tu base** (E8 P2, una vez). Renata Glasc, Industrialist en mesa.
2. Los 3 Avas en el battlefield contestado. **Hace falta guarnición enemiga**: 461 exige unidades de
   dos jugadores, y sin combate no hay Attacker designation ni trigger (383.4.e).
3. Combate. **464.2.c.3** le da la designación de Attacker a las tres Avas **en el mismo combate** —
   no hacen falta tres combates. **383.4.e.2.a** las topea en un chequeo por combate cada una.
4. Cada trigger: pagás 1 Mind Power, jugás un Temporal Breach **de la mano**, coste 0. Como no viene
   del escondite, el objetivo es libre: el Golem **en tu base**. Se banishea y *"its owner plays it to
   the same location"* → vuelve a la base, coste 0.
5. **419.4.a**: el *"When you play me"* del Golem dispara cuando la jugada se completa al resolver.
   4 fichas de Oro por Breach.
6. Renata: las **fichas** entran ready (R25 = A). El **Golem** no — es una carta, no un token, y vuelve
   exhausted por 143.4.

**Aritmética con las cantidades declaradas:** 3 Avas × 1 Breach = 3 disparos × 4 Oro = **12 fichas de
Oro listas**, menos **3 Mind Power** de los triggers = **neto +9 Power arcoíris en un solo combate**.
Con 1 Ava, +3; con 2, +6.

**Techo honesto, que #40 se adelanta a decir y confirmo:** son **3 detonaciones por partida**, no un
motor por turno. Temporal Breach topea en 3 copias (103.2.b) y Mind/Order **no tiene recursión de
cartas escondidas** — Guerilla Warfare es Mind/**Chaos** (103.1.b.4). Leyenda: Mind/Order, cuatro
existen (OGN-265, OGS-021, SFD-201, UNL-199).

**Clase: ENGINE.** 12 Power no son 12 puntos.

---

### 4. `ava-achiever-hostile-takeover-conquer` — ENGINE — **VERIFIED**

```
SFD-202 | Hostile Takeover | Spell | Mind/Order | E5 P2 | [Hidden] (...) Take control of an enemy unit at a battlefield. Ready it. (Start a combat if other enemies are there. Otherwise, conquer.) Lose control of that unit and recall it at end of turn. (Send it to base. This isn't a move.) [Tags: Renata Glasc]
```

Es la carta con `[Hidden]` más cara del pool (E5 + 2 Power = 7 recursos) y Ava la paga con **1 Mind
Power**, por 356.1.b.1 y 419.3.a.

**Por qué desde la mano y no desde el escondite** (razonamiento de #40, verificado contra 811.1.d.2):
desde el escondite los objetivos *"must be chosen from among options at that battlefield"*, y 811.1.b
sólo deja esconder en battlefields **que controlás** — o sea que apuntaría a una unidad enemiga parada
en tu propio battlefield, donde robarla no conquista nada porque ya lo controlás.

Camino: Ava ataca el battlefield Y, guarnecido por **exactamente una** unidad enemiga. Su trigger juega
Hostile Takeover, le sacás esa unidad y la readyás. En Y ya no queda ninguna unidad del rival, así que
en el Resolution Step **466.3.a** te da el combate ganado (*"the only Player that has units remaining
at this battlefield"*) y **466.5** + **466.5.d** establecen Control y eso **es un Conquer**. El mismo
resultado por la vía del showdown está en 348.2.a / 348.2.a.1, que es lo que retiró R20.

El *"Lose control of that unit and recall it at end of turn"* pasa **después**: el punto no se devuelve,
y 456/458 confirman que un recall no es un move ni cambia estado.

**Qué la refutaría, escrito en la entrada:**

- **Si el rival tiene 2+ unidades en Y, el paréntesis abre un combate en vez de conquistar.** La línea
  exige guarnición de una sola unidad, y esa es una condición del rival.
- **470**: *"A player may only Score, from either method, once per Battlefield per turn."* Tres Avas no
  son tres puntos en el mismo battlefield, y en Duel hay 2 battlefields (485.4). Techo de 2 puntos por
  turno por scoring. **Por eso es ENGINE y no CHAIN.**
- **471.1.b.1**: a 7 puntos un Conquer sólo da el punto final *"If the player has Scored every
  Battlefield this turn"*; si no, **robás una carta en vez del punto**.

**Clase: ENGINE.**

---

### 5. `spiderling-swarm-grand-plaza` — ALT_WIN — **VERIFIED**

```
VEN-097 | Spiderling | Unit | Chaos | E3 M1 | [Hidden] (...) I have +1 :rb_might: for each other unit you control here with my name. Your deck can have any number of cards named Spiderling. [Tags: Shadow Isles, Spider]
OGN-293 | The Grand Plaza | Battlefield | Colorless | - | When you hold here, if you have 7+ units here, you win the game.
```

`grep -in "any number of cards named" data/corpus_flat.txt` devuelve **una sola línea**, la de
Spiderling. Es la única carta del pool que rompe 103.2.b, y lo hace por **002**: *"Card text supersedes
rules text. Whenever a card fundamentally contradicts the rules, the card's indication is what is
true."*

**La corrección de rc-walk36 aplicada acá, y juega a favor.** **383.2.a.1** pone el *"if you have 7+
units here"* dentro de la **Condición** del trigger (viene inmediatamente después del *"When you hold
here"*), y **383.2.c** la evalúa *"after a potentially inciting event has been processed"*, o sea **en
el instante del Hold** (469.2, en tu Beginning Phase). Los 7 cuerpos tienen que estar **antes**, no
después. Los Spiderlings no son `[Temporary]`, así que no hay ventana que probar — y ésa es la
diferencia con `leblanc-temporary-plaza`, que necesita a `UNL-090 LeBlanc, Everywhere at Once` para
apagar el kill de 816.1.b (R10 = A) y cuyas Reflections quedan en 0 Might (R27).

Aritmética: 7 Spiderlings en la Plaza → cada uno tiene `1 + 6 = 7` Might, 49 de Might en total.
Coste `7 × E3 = 21 Energy`, repartido en varios turnos, menos un flip gratis por turno desde el slot de
la propia Plaza (**811.1.d.1**: el permanente escondido se juega **a ese** battlefield). Los que no se
esconden entran por **355.2.a**, que hace de un battlefield que controlás un destino válido por defecto.

Coste de construcción: 7 copias en un mazo de **al menos 40** (103.2) es el 17,5% del mazo.

**Qué la refutaría:** la Plaza sale al azar 1 de 3 en Duel (485.5) y Skirmish (487.5) y se elige en
Match (486.5); no hay forma de traer dos copias (103.4.c + TR 402.1); arranca **sin controlador**
(190.1, 190.6.d) y hay que conquistarla antes de poder esconder ahí. Los Spiderlings aguantan daño
(7 Might cada uno con los siete puestos), no aguantan bounce ni un barrido. Y **excluye** al Bandle
Tree de la candidata 1 por 485.4.a.

**Clase: ALT_WIN.** La Plaza dice literalmente *"you win the game"*.

---

### 6. `guards-industrialist-ready-soldiers` — ENGINE — **VERIFIED**

`SFD-154 Guards!` + `SFD-171 Renata Glasc, Industrialist`, mono-Order. Flipeado desde el escondite el
hechizo cuesta **0** (811.1.b), el token va al battlefield donde se escondió (**811.1.d.3**) y Renata lo
hace entrar **ready**, así que la cláusula *"You may pay :rb_rune_order: to ready it"* nunca se paga.

Es el caso más limpio de R25 que queda: Guards! **no imprime** estado de entrada, así que ni siquiera
hay que apoyarse en el override de un texto contrario — el default es **143.4** (*"Units enter the
Board exhausted"*) y Renata pisa el default.

Aritmética: **un cuerpo de 2 Might ready por 1 Power arcoíris pagado el turno anterior**, y 0 el turno
del flip. Contra jugarlo de la mano son E3 + 1 Order Power.

**Techo honesto: 3 por partida.** 103.2.b topea Guards! en 3 copias y mono-Order **no tiene recursión
de cartas escondidas** (Guerilla Warfare es Mind/Chaos). Los 5 nombres con `[Hidden]` de Order son
OGN-213, OGN-220, SFD-154, VEN-117 y VEN-135, y sólo Guards! hace un token.

Es, a propósito, la mitad-payload de la candidata 1 sin el Broker: existe como entrada separada porque
**no pide Chaos**, así que entra en mazos donde la candidata 1 no.

**Clase: ENGINE.**

---

### 7. `katarina-reckless-hidden-burn` — ENGINE — **VERIFIED (reescrita)**

```
UNL-023 | Katarina, Reckless | Unit | Fury | E5 P1 M5 | When you hide a card, ready me. When you play a card from face down, deal 2 to an enemy unit. [Tags: Katarina, Noxus]
```

Es la única carta del pool que paga por el **acto de esconder**, que por **421.1/421.2** es una
Discretionary Action distinta de jugar (**811.1.c.1**: *"Hide is not a subset of Play"*). Y paga otra
vez por el flip.

**Precisión que la entrada escribe:** el *"deal 2 to an enemy unit"* es una habilidad **de Katarina**,
no del hechizo flipeado. **811.1.d.2** restringe *"a hidden spell or a play effect of a hidden
permanent"* — Katarina no es ninguna de las dos. **Pega a cualquier unidad enemiga, en cualquier
battlefield.**

**REESCRITA: el *"ready me"* es el pedazo fuerte, no el débil.** #40 lo cotiza como *"el pedazo débil"*
porque readyear a una unidad ya lista no hace nada. Cierto, pero el orden lo arregla: **144.2** hace del
exhaust el **coste** del Standard Move, y **811.1.b** deja esconder *"on your turn during an Open
State"* — la Main Phase lo es. Entonces: Standard Move de Katarina a un battlefield (queda exhausted),
**después** escondés una carta, y el trigger la readya. Resultado: **un cuerpo de 5 Might listo en un
battlefield el mismo turno que llega**, sin `[Accelerate]` y sin pagar nada extra. Cada escondite extra
la vuelve a readyar después de cada nuevo exhaust.

Aritmética honesta con 2 slots, Fury/Chaos (cinco leyendas: OGN-251, OGS-017, SFD-185, UNL-185,
VEN-143) y 3 Black Market Broker:

```
2 escondites  -> 2 Power arcoíris gastados, y Katarina readyada tras cada exhaust
2 flips       -> 4 de daño repartido libremente entre unidades enemigas, coste 0,
                 a velocidad de Reaction (811.6) -> en la ventana del rival
              -> 6 fichas de Oro con 3 Brokers (exhausted sin Renata: Order no entra en Fury/Chaos)
```

**419.4.a.1** es la letra chica: si el rival contrarresta el hechizo flipeado, ni el Broker ni la
segunda mitad de Katarina disparan, porque el trigger de "cuando juegues" espera la resolución.

**Clase: ENGINE.**

---

### 8. `vi-peacekeeper-ambush-stun` — ENGINE — **VERIFIED**

```
UNL-176 | Vi, Peacekeeper | Unit | Order | E5 P1 M5 | [Ambush] (You may play me as a [Reaction] to a battlefield where you have units.) When I attack, [Stun] an enemy unit here. (It doesn't deal combat damage this turn.) [Tags: Vi, Piltover]
```

La candidata que usa el hallazgo C, y el hallazgo C es correcto. Camino:

1. Abrís vos el combate en el battlefield rival Y con cuerpos baratos. **461** exige guarnición.
2. Showdown abierto: **347.1** deja jugar cartas con timing legal, y el rival gasta sus trucos primero.
3. Ambusheás a Vi a Y. **822.1.b** le da la permisión de lugar Y `[Reaction]` *"as long as I'm being
   played to a battlefield where you control Units"*. **813.3.a** sola no alcanzaría: *"It can only be
   played to the controlling player's base or a battlefield they control."* La entrada se para en
   822.1.b, no en 811.6 — un `[Hidden]` no puede entrar ahí.
4. **319.6** hace pendiente un Cleanup en cuanto Vi entra al Board; **320** congela la chain mientras
   corre.
5. **464.2.c.3.a**: Vi gana la designación de Attacker **durante ese Cleanup**.
6. **383.4.e**: su Attack Trigger va a la chain. **383.4.e.2.a** la topea en una vez por combate.
7. **423.1**: stuneás una unidad enemiga en Y. **423.1.b**: *"A Stunned Unit does not contribute its
   might to damage in the combat damage step."*
8. **465.2**: el daño recién se resuelve *"when the Showdown closes"*, con el Might actual. Vi suma
   sus 5 al ataque y el stuneado resta el suyo a la defensa.

**Precisión que #40 no escribe y la entrada sí: el stun no abarata matarlo.** **423.1.c** dice que un
Stunned Unit *"must still have damage applied to it equal to, or greater than, its full might value to
be killed"*. Lo que comprás es su **daño de salida**, no su vida. Y **423.1.a.2**: el stun se cae en el
paso 3d del cleanup de fin de turno, o sea dura un turno.

**Qué la refutaría:** **822.3** — *"If there are no units at the location chosen before Finalization
completes for any reason, then it is no longer a valid location by Ambush's reasoning and cannot be
played there."* Si el rival te barre los cuerpos en respuesta, Vi se queda sin lugar. Y es **tempo, no
puntos**.

**Clase: ENGINE.**

---

### 9. `lotus-trap-morgana-excess-damage` — ENGINE — **VERIFIED (reescrita)**

```
UNL-013 | Lotus Trap | Spell | Fury | E2 | [Hidden] (...) [Reaction] (...) Choose a unit. Double all damage that would be dealt to it this turn.
VEN-017 | Morgana, Vindictive | Unit | Fury | E5 P1 M5 | [Ambush] (...) When you play me, deal damage to a unit equal to the damage marked on it. [Tags: Demacia, Morgana]
UNL-018 | Yeti Brawler | Unit | Fury | E6 M6 | When I conquer, if you assigned 3 or more excess damage, play two Gold gear tokens exhausted. (They have "[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:.") [Tags: Noxus]
```

Es la única entrada de la lente que el propio reglamento cotiza con un ejemplo trabajado. **465.2.c.4.a**
usa el texto de Lotus Trap palabra por palabra y concluye que a una unidad de 3 Might se le asignan
**2**, que se doblan a 4; **465.2.c.5** la **nombra**. Lotus Trap no sobrekillea — 465.2.c.4.a obliga a
*"choose the minimum applied value such that the unit would take lethal damage"* — lo que hace es
**abaratar el objetivo a la mitad**: contra un defensor de Might `M` asignás `ceil(M/2)` en vez de `M`.

El Might que te ahorrás y no tiene a quién asignarse es **excess damage**, que es exactamente lo que
definió **R28 = A** (2026-09-04): *"attacking Might that never got assigned"*. La frase no aparece **ni
una vez** en las Core Rules (grep corrido en esta sesión) y está impresa en 6 cartas, así que sin R28 la
familia entera es letra muerta contra 002.

**REESCRITA — la corrección grande, que #40 no vio.** #40 dice *"Lotus Trap es gratis sólo desde el
escondite, o sea un turno después de esconderla"* y deja implícito que ése es el modo del combo. **No
lo es.** Desde el escondite, **811.1.d.2** obliga a elegir el objetivo *"from among options at that
battlefield"*, y **811.1.b** sólo deja esconder en un battlefield **que controlás**. O sea: el modo
gratis sólo puede apuntar a una unidad parada en **tu** battlefield, que es un modo **defensivo**. Y
defendiendo no se conquista — las seis cartas de excess damage disparan con *"When I conquer"* /
*"When you conquer"*, nunca al defender. Para alimentar al Yeti hay que jugar Lotus Trap **de la
mano**, y ahí sí funciona: **811.3** (*"may be played for its cost as normal, at its normal timing with
no restrictions on targeting"*) más su propio `[Reaction]` la ponen en el showdown por **E2**, apuntando
a la guarnición que estás atacando.

Aritmética con las cantidades declaradas: contra un defensor de 6 Might, asignás **3** en vez de 6 →
**3 de Might liberado** → la condición del Yeti (*"3 or more excess damage"*) se cumple → **2 fichas de
Oro**, exhausted (mono-Fury no tiene a Renata, que es Order). Contra un defensor de 3 Might asignás 2 en
vez de 3: ahorro **1**, y **no alcanza sola** — lo escribo porque la tentación es cotizar el caso grande
y callar el chico.

Morgana encima: una unidad con `k` de daño marcado recibe `k` más, doblado a `2k` por Lotus Trap, total
`3k`. Con 3 marcados: 9. Y llega a velocidad de Reaction por `[Ambush]` (822.1.b), a un battlefield
donde tengas cuerpos. Necesita daño **ya marcado**: el daño de combate recién se reparte al cerrar el
showdown (465.2), así que la marca viene de antes (quemar, un combate previo).

**Distinción obligatoria de `yeti-brambleback-renata-gold`**, que ya usa al Yeti: esa entrada saca el
excess damage de una **guarnición liviana** (*"any garrison summing under 11 Might"*) y lo multiplica
con Red Brambleback bajo R1 = A. Ésta lo **fabrica** con un replacement effect contra una guarnición
**pesada**, en mono-Fury y sin Renata. Mecanismo distinto, misma carta de payoff. Y hereda su
requisito duro: **383.4.c.2.a** exige que el Yeti esté presente cuando se gana el control, o sea que
tiene que **sobrevivir** el combate.

**Clase: ENGINE.** Dos fichas de Oro exhausted no son puntos.

---

## Bloque 3 — tarea extra 1: 323.7 en las entradas que esconden cartas

#40 nombra **siete** entradas. Las revisé una por una contra su propio `uses` y sus `steps`, y contra el
texto de carta:

| entrada | ¿esconde de verdad? | veredicto |
|---|---|---|
| `gutter-palace-keeper-time-warp` | sí — `UNL-081` Keeper of Masks escondida en un turno anterior | **nota agregada** |
| `leblanc-temporary-plaza` | sí — uno de los tres Keepers va escondido (su propio `notable` lo dice) | **nota agregada** |
| `jhin-emperors-divide-hidden` | sí — `SFD-043` Emperor's Divide escondida en X | **nota agregada** (ya citaba 323.7 sólo para una *segunda* escondida) |
| `sona-viktor-opponent-turn` | sí — el paso 3 vive de flipear cartas escondidas en el turno del rival | **nota agregada** |
| `renata-time-warp-ekko-refresh` | sí — `OGN-213` Hidden Blade escondida en un turno anterior | **nota agregada** |
| `tornado-warrior-matriarch-recursion` | sí — `VEN-099` Tornado Warrior, un ciclo por escondite | **nota agregada** |
| `ezreal-double-free-accelerate` | **NO** | **sin nota — 323.7 no aplica** |

`ezreal-double-free-accelerate` usa `SFD-149 Ezreal, Prodigy` ×2 y `UNL-127 Mister Root`. Ninguna de las
dos tiene `[Hidden]` (verificado en el corpus) y ningún paso esconde nada. La palabra aparece **una sola
vez** en la entrada, dentro del grep de las siete cláusulas de redundancia (*"811.4 Hidden"*). Es un
falso positivo de búsqueda de texto, exactamente la forma que `CLAUDE.md` manda registrar en vez de
arreglar en silencio. **Son 6 entradas, no 7.**

Barrí además todo `combos.json` por `hidden|hide|facedown|face down` para no fiarme de la lista de #40:
salieron 13 entradas. Las otras 6 tampoco esconden: `jhin-fiora-facebreaker-recall` y
`garen-fiora-malzahar-facebreaker-recruits` traen `OGN-220 Facebreaker` **en zona HAND**, jugada por su
coste (811.3); `jhin-virtuoso-ekko-malzahar-vi` trae `OGN-083 Consult the Past` también en HAND;
`pack-of-wonders-bewitching-discard` y `pack-of-wonders-fizz-spell-recursion` matchean por el
*"facedown"* impreso en `OGN-181 Pack of Wonders`, que devuelve una escondida pero no la crea; y
`draven-glorious-executioner-point` matchea por la palabra inglesa *"hidden"* en prosa.

La nota agregada, en `prerequisites.notable`, no toca cantidades ni clases.

---

## Bloque 4 — tarea extra 2: Spiderling contra el límite de copias, y el Plaza

1. `grep -in "any number of cards named" data/corpus_flat.txt` → **una línea**, `VEN-097 Spiderling`.
   Es la única carta del pool que lo dice.
2. **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."* Es el tope que el
   texto levanta.
3. Cómo se resuelve carta contra regla: **002**, la Golden Rule — *"Card text supersedes rules text.
   Whenever a card fundamentally contradicts the rules, the card's indication is what is true."* (La
   Silver Rule, 051, es la otra mitad y no aplica acá: gobierna la *terminología*, no un conflicto de
   permiso.) El texto de Spiderling gana.
4. La corrección de rc-walk36 sobre el Grand Plaza está aplicada en la candidata 5: **383.2.a.1** mete el
   *"if you have 7+ units here"* en la **Condición** y **383.2.c** la evalúa en el instante del Hold, así
   que los siete tienen que estar **antes**. Para esta entrada eso no es un problema sino su ventaja
   frente a las rutas `[Temporary]`, y así está escrito.

---

## Resumen

| # | id | clase | veredicto |
|---|---|---|---|
| 1 | `black-market-broker-bandle-tree-gold` | ENGINE | verified, reescrita (techo de cartas; flip en turno rival; excluye Plaza) |
| 2 | `swift-scout-guerilla-hide-cycle` | ENGINE | verified, reescrita (retraso real; de dónde sale el 2º slot; tensión con Mushroom Pouch) |
| 3 | `ava-achiever-temporal-breach-trove-golem` | ENGINE | verified (419.3.a agregada como viga) |
| 4 | `ava-achiever-hostile-takeover-conquer` | ENGINE | verified |
| 5 | `spiderling-swarm-grand-plaza` | ALT_WIN | verified |
| 6 | `guards-industrialist-ready-soldiers` | ENGINE | verified |
| 7 | `katarina-reckless-hidden-burn` | ENGINE | verified, reescrita (el "ready me" es el pedazo fuerte) |
| 8 | `vi-peacekeeper-ambush-stun` | ENGINE | verified (423.1.c: el stun no abarata matarlo) |
| 9 | `lotus-trap-morgana-excess-damage` | ENGINE | verified, reescrita (desde el escondite NO puede apuntar a la guarnición que atacás) |

**9 verified, 0 refutadas, 4 reescritas. Ninguna INFINITE.** Ninguna lectura de reglas nueva archivada:
las nueve se paran en reglas leídas y en R1, R10, R20, R25, R27 y R28, todas ya ruleadas o retiradas
en #11.
