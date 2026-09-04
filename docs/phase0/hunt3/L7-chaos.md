# L7 — Chaos (lente por dominio)

> Estado: COMPLETA. Documento de caza, no ingesta. `data/combos.json` NO se toca aquí.
> Issue: #28. Fecha: 2026-09-04.

## Por qué esta lente
El pool está parejo por dominio (211–219 cartas) pero la cobertura del catálogo va de 29 combos
en Mind a 7 en Chaos. Las seis lentes previas (L1–L6) tienen forma de **mecánica**, y las
mecánicas que loopean más fuerte viven en Mind+Order. Esta es la primera lente con forma de
**dominio**.

Pares prioritarios (Domain Identity 103.1.b): `fury+chaos` (3), `body+chaos` (3), `calm+chaos` (4).

## Método
1. Sinergias verificadas (`data/synergies.json`) cuyo anchor o partners caen en Chaos.
2. Barrido del corpus filtrado a Chaos.
3. Cada candidato contra las trampas de autoría de CLAUDE.md.

---
## Lo que ya está catalogado (7 entradas que tocan Chaos)

| id | clase | par | cartas |
|---|---|---|---|
| `pursuer-herald-recruits` | INFINITE | chaos+order | OGN-177, SFD-153, SFD-171 |
| `gutter-palace-keeper-time-warp` | ALT_WIN | mind+chaos | UNL-088, UNL-081, OGN-201, OGN-122, OGN-110, OGN-113 |
| `bloodharbor-bewitching-discard` | ENGINE | fury+chaos | UNL-185, UNL-121 |
| `kharox-sanction-burn` | ENGINE | calm+chaos | VEN-114, VEN-035 |
| `zed-clone-eye-recruits` | ENGINE | chaos+order | VEN-112, SFD-153, SFD-171, OGN-293 |
| `treasure-hunter-industrialist-gold` | ENGINE | chaos+order | SFD-130, SFD-171, OGN-173 |
| `pack-of-wonders-bewitching-discard` | ENGINE | chaos | OGN-181, UNL-121 |

Observación estructural: **cuatro de las siete se apoyan en Order** (Renata Glasc Industrialist
SFD-171 aparece en tres). Eso es exactamente el sesgo que el issue #28 describe: cuando alguien
miró Chaos, lo miró desde Order. Los pares flacos (`fury+chaos`, `body+chaos`, `calm+chaos`)
tienen 1, 0 y 1 entrada respectivamente en esta tabla. Los 3/3/4 del issue #28 cuentan entradas
**jugables** bajo cada par (una línea mono-chaos es jugable bajo los tres); lo que mide esta tabla
es distinto y más duro: cuántas entradas **cruzan** los dos dominios del par. Con esa medida
**`body+chaos` es cero** — ninguna entrada del catálogo usa una carta Body junto a una Chaos.

## Patrones de sinergia con anchor en Chaos

De los 28 patrones verificados en `data/synergies.json`, tres tienen su anchor en Chaos:

- `ride-the-wind-move-triggers` — anchor **OGN-173** Ride the Wind
- `pack-of-wonders-replays-a-body` — anchor **OGN-181** Pack of Wonders
- `stargazer-flow-spells` — anchor **VEN-098** Stargazer

### Lo que dicen las listas de esos tres patrones

`ride-the-wind-move-triggers` (predicado `/When I move\b/`, 28 partners) tiene **ocho partners en
Chaos** y sólo uno de ellos está catalogado:

| código | carta | trigger de movimiento | ¿catalogado? |
|---|---|---|---|
| SFD-130 | Treasure Hunter | juega un Gold token exhausted | sí (`treasure-hunter-industrialist-gold`, vía Order) |
| SFD-125 | Fae Porter | pagá :chaos: y mové **otra** unidad al mismo battlefield | **no** |
| UNL-127 | Mister Root | ganás 2 XP | **no** |
| OGN-185 | Traveling Merchant | discard 1, draw 1 | no |
| SFD-123 | Corrupt Enforcer | discard 1 | no |
| SFD-137 | Harpoon Squad | +2 Might | no |
| VEN-111 | Minah Swiftfoot | cada jugador descarta 1 **o** roba 1 | no |
| VEN-095 | Shadow Order Disciple | Burn 1 → +1 Might | no |

`pack-of-wonders-replays-a-body` (16 partners) tiene **tres en Chaos**: SFD-140 Fizz Trickster,
OGN-196 Soulgorger, VEN-109 Illaoi. El combo catalogado con ese anchor usa UNL-121 Bewitching
Spirit, que es el cuerpo **más flojo** de los tres.

`stargazer-flow-spells` (15 partners) tiene **0 combos** en el catálogo — el único de los 28
patrones sin ninguno. Flow es un mecanismo de recursión entero que Chaos ancla (VEN-098 Stargazer
abarata todo Flow desde el trash) y que nadie caminó.

## Corrección al conteo del issue #28: Chaos no tiene 7 combos vivos, tiene 6

Cuatro cartas de Chaos están en la ban list de Riot (verificado contra `data/corpus_flat.txt`,
marca `[BANNED …]`):

- **OGN-177 Stealthy Pursuer** — `constructed:banned, 2v2:banned`
- OGN-168 Fight or Flight — `constructed:banned, 2v2:banned`
- OGN-182 Scrapheap — `constructed:banned, 2v2:banned`
- SFD-122 Called Shot — `constructed:banned, 2v2:banned`

`pursuer-herald-recruits` **se apoya en OGN-177**. Es la **única entrada INFINITE que toca Chaos**
y no es jugable en ningún formato. En la práctica Chaos no tiene ninguna línea infinita legal, y
las seis que quedan son cinco ENGINE + un ALT_WIN.

---

# Candidatos

Ninguno de estos entró a `data/combos.json`. Cada uno lleva su texto verbatim (verificado contra
`data/corpus_flat.txt`), sus pasos, su cota y contra qué trampas lo chequeé.

## C1 · `yasuo-syren-unforgiven-point` — 1 punto por turno sin gastar cartas · **calm+chaos** · ENGINE

**Cartas**

- **OGN-205** Yasuo, Windrider — Unit, Chaos, E5 P1 M4
  > `[Ganking]` (I can move from battlefield to battlefield.) **The third time I move in a turn, you score 1 point.**
- **OGN-259** Unforgiven — Legend, Calm/Chaos (Yasuo)
  > `:rb_energy_2:`, `:rb_exhaust:`: Move a friendly unit to or from its base.
- **OGN-184** The Syren — Gear, Chaos, E2
  > `:rb_energy_1:`, `:rb_exhaust:`: Move a friendly unit at a battlefield to its base.

**Pasos** (Yasuo en la base, ready; Syren en juego y ready; legend ready)

1. Unforgiven: pagás `2 Energy` y exhausteás el legend → mové a Yasuo **de** su base a un
   battlefield. **Movimiento 1.** Yasuo sigue ready: mover no exhaustea, sólo el Standard Move
   paga exhaust (144.2).
2. The Syren: pagás `1 Energy` y exhausteás el gear → mové a Yasuo **al** base. **Movimiento 2.**
3. Standard Move de Yasuo: base → battlefield, exhausteándolo (144.2, 144.4.a). **Movimiento 3**
   → *"The third time I move in a turn, you score 1 point."*

**Qué produce.** 1 punto por turno por **3 Energy y cero cartas**. Legend y gear se readean solos
en el Awaken, así que el motor se re-arma solo todos los turnos. Ocho puntos en ocho turnos.

**Qué lo acota.**

- El texto dice *"the third time"*, no *"every third time"*: es **exactamente una vez por turno**.
  Un cuarto, quinto y sexto movimiento no dan un segundo punto.
- Los tres movimientos son tres acciones distintas y el paso 3 deja a Yasuo **exhausted** en un
  battlefield. Variante que lo deja ready: cambiá el paso 3 por **OGN-173** Ride the Wind
  (Chaos, E2 P1, *"Move a friendly unit and ready it"*) — cuesta una carta más y `E2 P1` en vez de
  nada, pero Yasuo termina ready para defender.
- Necesita destinos legales: mover a un battlefield con unidades enemigas **stagea un Combat**
  (461). El orden de arriba mueve a un battlefield propio o vacío.

**Trampas chequeadas.**

- *Battlefield enemigo vacío no es un ataque* — irrelevante acá: la línea **no** usa ningún trigger
  de ataque. Sólo cuenta movimientos, y 446.1 dice que cualquier cambio de posición en el board es
  un Move (salvo recall correctivo o adjunto), así que los tres cuentan.
- *Un recall no es un move (456)* — ninguno de los tres efectos es un recall; los tres dicen "move".
- *Las unidades entran exhausted (143.4)* — por eso el motor arranca el turno **siguiente** al que
  jugás a Yasuo, y por eso el paso 1 usa el legend (que mueve sin exhaustear) y no un Standard Move.
- *R2 (ruled A)*: "you score 1 point" en el texto de una carta es un point Gain por ability
  (194.1.c), **no** un Score de 469, así que el cap de 470 ("once per Battlefield per turn") no
  aplica. Esto importa: el punto de Yasuo **se suma** al punto que ese mismo battlefield te dé por
  Hold en tu Beginning Phase.
- La Energía se paga en la Main Phase, no en Awaken, así que la trampa de 167 no aplica.

**Por qué es un hallazgo.** `calm+chaos` tiene 4 entradas y ninguna es una fuente de puntos. Esta
línea usa **el legend de Yasuo con la unidad de Yasuo** — la sinergia más obvia del dominio — y no
está en el catálogo.

## C2 · `tf-gambler-battle-mistress-gold` — el único reciclador de runas gratis del pool · **body+chaos** · ENGINE

`body+chaos` es el único par de los quince donde **ninguna entrada catalogada cruza los dos
dominios** (ver la tabla de arriba).

**Cartas**

- **SFD-203** Battle Mistress — Legend, Body/Chaos (Sivir)
  > **When you recycle a rune**, you may exhaust me to play a Gold gear token exhausted. When one
  > or more enemy units die, ready me.
- **OGN-200** Twisted Fate, Gambler — Unit, Chaos, E4 M4
  > When I attack, **reveal the top rune of your rune deck, then recycle it.** Do one of the
  > following based on its domain: • Fury — Deal 2 to an enemy unit here and 1 to all other enemy
  > units here. • Mind — Draw 1. • Order — Stun an enemy unit.

**La observación.** Grepeando `recycle.*rune` sobre las 935 cartas hay **exactamente tres** fuentes
de reciclado de runas en todo el pool:

| carta | qué recicla | costo real |
|---|---|---|
| **OGN-200** Twisted Fate, Gambler | **la runa de arriba del Rune Deck** | **ninguno** |
| OGN-287 Sigil of the Storm (battlefield) | *"you **must** recycle one of your runes"* al conquistar ahí | una runa **de tu board** |
| OGN-244 Divine Judgment (Order, E7 P2) | todo salvo 2 runas de cada jugador | catastrófico |

161.2.b: *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."* La runa que
Twisted Fate recicla **ya estaba en el Rune Deck**: sale de arriba y vuelve abajo. No perdés Power
en el board, no perdés una carta. Es el **único reciclado de runa neutral** del juego.

Por eso el trigger de Battle Mistress, que a primera vista parece letra muerta, tiene exactamente un
habilitador honesto — y está en su propio dominio.

**Pasos.** Twisted Fate ataca → revela y recicla la runa de arriba → dispara *"When you recycle a
rune"* de Battle Mistress → la exhausteás → Gold gear token exhausted. Además el modo de la runa
revelada te da daño / carta / stun gratis.

**Qué lo acota.**

- 383.4.e.2.a: *"These triggers will only have their condition checked **once per combat**, despite
  a Unit being able to gain and lose the Attacker designation multiple times in the same combat."*
  → **un reciclado por combate**, no por movimiento.
- Battle Mistress se exhaustea para el Gold, así que sin muertes enemigas es **un Gold por turno**.
  Su segunda línea (*"When one or more enemy units die, ready me"*) la readea, así que en un turno
  con dos combates y bajas enemigas salen dos o tres.
- El Gold entra **exhausted**, y su texto es `[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:`
  — necesita estar ready para exhaustearse. Se readea en el Awaken siguiente. **No** hay Renata
  Glasc, Industrialist acá (SFD-171 es Order): la excepción de R25 no está disponible en body+chaos,
  así que el Gold es Power **del turno siguiente**, no de éste.
- Es un motor de recursos, no una línea ganadora. Techo honesto: ~1 Power extra por turno.

**Trampas chequeadas.**

- *Reciclar una runa por Power la manda al Rune Deck (161.2.b)* — es justo la trampa que hace
  interesante a esta línea: Twisted Fate la esquiva porque recicla desde el Rune Deck, no desde el
  board. Sigil of the Storm **no** la esquiva y por eso queda descartado como habilitador.
- *Battlefield enemigo vacío no es atacar* (383.4.e, 461) — **muerde de lleno acá.** Twisted Fate
  necesita la designación de Attacker, que sólo existe dentro de un Combat, y 461 exige unidades de
  dos jugadores en el battlefield. Mover a un battlefield enemigo **vacío** no dispara nada y el
  motor no arranca. Cualquier entrada que se ingiera tiene que decirlo en `prerequisites`.
- *La Energía de Awaken se pierde (167)* — no aplica: el Gold se mata en la Main Phase.

## C3 · `tornado-warrior-matriarch-recursion` — empower gratis, unidad gratis del trash · **mono-chaos** · ENGINE

**Cartas**

- **VEN-104** Tail-Cloaked Matriarch — Unit, Chaos
  > `[Empower] :rb_energy_2::rb_rune_chaos:` … **When I become [Empowered]**, you may choose a unit
  > in your trash with Energy cost no more than `:rb_energy_3:` and Power cost no more than
  > `:rb_rune_rainbow:`. **Play it to your base, ignoring its cost.**
- **VEN-099** Tornado Warrior — Unit, Chaos, E3 M3
  > `[Hidden]` … **When you play me from face down, you may empower something here. Disempower it
  > at end of turn.**

**El truco.** La Matriarch cobra `2 Energy + 1 Power` por auto-empoderarse, y 827.1.c.1 le pone
*"Play only if not Empowered"*, así que su propia habilidad es de un solo uso. Pero su trigger dice
**"When I become [Empowered]"**, no "when you pay my Empower cost": 441.3.a permite empoderar por
cualquier Game Effect, y 441.2.a define el momento en que un objeto *becomes* Empowered. Tornado
Warrior empodera **gratis**, y su propia cláusula *"Disempower it at end of turn"* la **desempodera
al final del turno** — que es exactamente lo que 441.1.b (*"An Empowered Game Object can not be
Empowered"*) exige para poder volver a dispararlo el turno siguiente.

O sea: Tornado Warrior no es sólo un empoderador gratis, es un empoderador que **se limpia solo**.

**Qué lo acota.**

- *"empower something **here**"* — Tornado Warrior tiene que entrar a la misma location que la
  Matriarch. Es `[Hidden]`, se juega desde face down, así que se juega a donde estén tus unidades.
- El techo de la Matriarch es duro: unidad en el trash con `E≤3` **y** `P≤1`, y entra **a tu base**
  (o sea entra exhausted por 143.4, sin llegar a un battlefield ese turno).
- Un Tornado Warrior por vuelta: es una carta por empoderamiento. La versión sin gastar carta es
  pagar `2E + :chaos:` con la habilidad propia de la Matriarch, pero eso es un solo uso.
- Fuera de mono-chaos hay dos empoderadores gratis mejores, y ambos abren pares flacos:
  **VEN-082** Profiteer (Body, E4 M4 — *"When you play me, you may disempower something you control
  to empower a legend, unit, or gear"*) da **body+chaos**, y **VEN-035** Sanction (Calm, E3 P1,
  Reaction — *"Empower a unit. Disempower it at end of turn."*) da **calm+chaos**. Sanction ya es
  el anchor del patrón `sanction-empower-unit` y ya tiene un combo (`kharox-sanction-burn`, el mismo
  truco sobre VEN-114 Kharox); una entrada Sanction+Matriarch sería **la misma idea con otro
  payoff**, así que la versión que vale la pena ingerir es la de Tornado Warrior (mono-chaos, sin
  precedente) o la de Profiteer (body+chaos, el par vacío).

**Trampas chequeadas.**

- *`[Temporary]` muere antes de puntuar (816.1.b)* — no aplica: nada acá se marca Temporary.
- *Las unidades entran exhausted (143.4)* — sí aplica, y por eso el texto dice "to your base": la
  unidad revivida no puede hacer Standard Move ese turno.
- *La Energía de Awaken se pierde (167)* — no aplica.
- Cuidado con el falso positivo de "trigger que es un no-op": si tu trash no tiene ninguna unidad
  `E≤3 P≤1`, el trigger de la Matriarch resuelve en nada. La entrada tiene que declarar el
  contenido del trash como prerequisito, no asumirlo.

## C4 · `kennen-stargazer-arena-flow` — un hechizo gratis del trash todos los turnos · **mono-chaos** · ENGINE

Éste sale de cruzar dos patrones de `data/synergies.json` que **ninguno tiene combos**:
`stargazer-flow-spells` (0 combos, 15 partners) y `reckoners-arena-conquer-on-hold` (0 combos,
28 partners, y VEN-113 Kennen está en su lista).

**Cartas**

- **VEN-113** Kennen, Storm of Shuriken — Unit, Chaos, E3 P1 M4
  > When you play me, `[Burn 2]`. … **When I conquer, give a spell in your trash `[Flow]` equal to
  > its cost this turn.** (You may play it from your trash for its Flow cost. Then banish it.)
- **VEN-098** Stargazer — Unit, Chaos, E5 M4
  > **Spells with `[Flow]` you play from your trash cost `:rb_energy_2:` less, to a minimum of
  > `:rb_energy_1:`.**
- **OGN-286** Reckoner's Arena — Battlefield, **Colorless**
  > **When you hold here, activate the conquer effects of units here.**

**Por qué encaja.** Reckoner's Arena es colorless: entra en cualquier Domain Identity, incluida
mono-chaos. Kennen parado ahí convierte su trigger de conquista en un trigger de **Hold**, o sea
se dispara **todos tus Beginning Phases** mientras sostengas el battlefield, sin atacar, sin gastar
una carta y sin gastar Energía. Base de reglas: 383.4.g / 383.4.g.1 (la parte no-conquista de la
condición tiene que estar cumplida) y 383.4.c / 383.4.d (categorías de trigger). Kennen **no tiene
parte no-conquista**: su única exigencia es que haya un hechizo en el trash, así que llega a la
chain en un hold, a diferencia de Yone y Swain, que el patrón excluye por eso mismo.

Y el `[Flow]` que Kennen otorga es *"equal to its cost"* — el costo entero, o sea normalmente no
vale la pena. Stargazer lo baja `2 Energy`. Ejemplos reales del trash de un mazo Chaos:

| hechizo | costo impreso | Flow por Kennen | con Stargazer |
|---|---|---|---|
| **OGN-198** The Harrowing | E6 P2 | E6 P2 | **E4 P2** |
| **SFD-147** Downwell | E8 P2 | E8 P2 | **E6 P2** |
| **VEN-103** Shadows of the Past | E3 P1 | E3 P1 | **E1 P1** |
| **UNL-140** Conscription | E5 P2 | E5 P2 | **E3 P2** |

**Qué lo acota — y esto es lo que impide llamarlo INFINITE.**

- 829.1.b.1: el banish del Flow es un *delayed replacement effect*. El hechizo **se banishea al
  salir de la chain**, así que cada copia del trash se puede reflowear **exactamente una vez**. Con
  el límite de 3 copias por mazo, el motor tiene combustible finito y va a fondo.
- Stargazer descuenta **sólo Energy** (`to a minimum of :rb_energy_1:`); el Power se paga entero.
  Downwell sigue costando `P2` cada vez.
- Kennen tiene que estar **en** Reckoner's Arena y vos tenés que **sostenerlo**: si te lo sacan, el
  motor se apaga. Y Reckoner's Arena es un battlefield colorless, o sea el rival también puede
  llevarlo — 127.1 + 485.4.a dicen que el battlefield que controlás en un Duel es normalmente el que
  trajiste vos (mismo razonamiento que fijó R8).
- 829.1.b.2: jugar por Flow **no cambia el timing** del hechizo. Un hechizo sin `[Action]` ni
  `[Reaction]` sigue siendo de tu Main Phase aunque lo tires desde el trash.

**Trampas chequeadas.** No hay ataque involucrado (el trigger llega por Hold, no por Attacker), no
hay `[Temporary]`, no hay reciclado de runas, no hay Energía de Awaken — el hold ocurre en la
Beginning Phase pero el gasto es en la Main Phase, así que 167 no muerde. La duración *"this turn"*
del Flow otorgado cubre desde la Beginning Phase hasta el final del turno.

**Variante en el mismo battlefield.** **VEN-112** Zed, Without a Sound (Chaos) también está en la
lista de Reckoner's Arena: *"When I conquer, play a 0 `:rb_might:` Shadow Clone unit token to your
base."* Parado ahí, eso es **un Shadow Clone gratis por turno sin conquistar nada**. El catálogo
tiene `zed-clone-eye-recruits`, pero esa entrada llega a los clones por Order (SFD-153 Eye of the
Herald + SFD-171 Renata + OGN-293 The Grand Plaza). La versión Reckoner's Arena es **mono-chaos** y
no está catalogada.

## C5 · `draven-glorious-executioner-point` — el legend y la unidad del mismo campeón · **fury+chaos** · ENGINE

**Cartas**

- **SFD-148** Draven, Audacious — Unit, Chaos, E6 P1 M6
  > `[Deflect]` … **The first time I win a combat each turn, you score 1 point.** When I die in
  > combat, choose an opponent. **They score 1 point.**
- **SFD-185** / **SFD-242** Glorious Executioner — Legend, Fury/Chaos (Draven)
  > **When you win a combat, draw 1.** (You win if only your units remain after combat.)

**Qué produce.** Un punto y una carta por cada turno en que Draven gane un combate, sin gastar
nada más que el combate. `fury+chaos` tiene **una sola** entrada catalogada
(`bloodharbor-bewitching-discard`, un motor de descarte) y ninguna fuente de puntos.

**Qué lo acota.**

- *"The first time … each turn"* — **un punto por turno**, tope duro. Ganar tres combates con Draven
  en un turno sigue dando un punto (aunque el legend sí roba tres cartas: su texto no tiene el
  "first time").
- 6 Might y `[Deflect]` lo hacen difícil de matar con hechizos, pero su segunda cláusula es un
  **drawback real y simétrico**: si muere en combate, **el rival puntúa**. Cualquier entrada tiene
  que declararlo; es exactamente la forma "doubled drawback" que CLAUDE.md manda registrar.
- R2 (ruled A) otra vez: el punto de Draven es un Gain por ability (194.1.c), no un Score de 469, así
  que **no** consume el Score del battlefield y se suma al Hold.

**Trampas chequeadas.** *Ganar un combate exige un combate*: 461 pide unidades de dos jugadores en
el battlefield, y entrar a un battlefield enemigo vacío no genera ninguno. Este motor **depende del
rival**: si nadie guarnece, Draven no gana combates y no puntúa nada. Es la diferencia entre un
motor que corre solo (C1, C4) y uno que corre sólo si el rival coopera. Vale como entrada, pero la
clase honesta es ENGINE y el `terminatesIn` tiene que decir "depende de que el rival defienda".

## C6 · `pack-of-wonders-fizz-spell-recursion` — el mismo anchor, mucho mejor cuerpo · **mono-chaos** · ENGINE

El patrón `pack-of-wonders-replays-a-body` ya está verificado y tiene **un** combo
(`pack-of-wonders-bewitching-discard`, con UNL-121 Bewitching Spirit, cuyo efecto de entrada es
"un jugador descarta 1"). En la lista de 16 partners hay tres cartas de Chaos, y **la mejor no está
catalogada**:

- **OGN-181** Pack of Wonders — Gear, Chaos, E2
  > `:rb_exhaust:`: Return another friendly gear, unit, or facedown card to its owner's hand.
- **SFD-140** Fizz, Trickster — Unit, Chaos, E3 P1 M3
  > When you play me, you may **play a spell from your trash with Energy cost no more than
  > `:rb_energy_3:`, ignoring its Energy cost. Then recycle it.** (You must still pay its Power cost.)

Bucle por turno: exhausteás Pack of Wonders → devolvés a Fizz a la mano → rejugás a Fizz por
`E3 P1` → hechizo gratis del trash (`E≤3`), y **el hechizo se recicla, no se banishea** (416.1
manda al fondo del Main Deck), así que vuelve a estar disponible más tarde. Ese detalle es la
diferencia con C4: Flow banishea, Fizz recicla.

**Qué lo acota.** Pack of Wonders se exhaustea y **nada en Chaos readea gear** (grepeado: los
readers del pool readean *units* o *runes*; SFD-195 Blade Dancer dice explícitamente "ready **it**"
sobre una unidad elegida). Así que es **una vuelta por turno**, y el gear se readea solo en el
Awaken. Cuesta `E3 P1` por vuelta. Techo: un hechizo de `E≤3` gratis por turno, para siempre, sin
gastar cartas. Es un ENGINE limpio, no una línea infinita.

**Trampas chequeadas.** Fizz vuelve a entrar **exhausted** (143.4), así que no hace Standard Move el
turno que lo rejugás — la línea no depende de que se mueva. No hay `[Temporary]`, no hay ataque, no
hay reciclado de runas. El tercer partner de Chaos, **OGN-196** Soulgorger (*"When you play me, you
may play a unit from your trash, ignoring its Energy cost"*), es la misma estructura con unidades en
vez de hechizos y también está sin catalogar.

---

# Hallazgos negativos

Los negativos de abajo están argumentados, no supuestos. Cada uno cierra una pregunta.

## N1 · Por qué Chaos no tiene ninguna línea INFINITE legal — y no es casualidad

Chaos tiene la **mejor suite de rebote del juego**. Grepeando el pool: OGN-169 Gust, OGN-172
Rebuke, OGN-187 Whirlwind, OGN-188 Zaunite Bouncer, SFD-132 Beast Below, SFD-138 Windsinger,
SFD-147 Downwell, UNL-128 Star-Crossed, UNL-132 Angler Beast, VEN-106 Wind and Ghosts, VEN-115
Ocean Drake, OGN-181 Pack of Wonders, UNL-185 Bloodharbor Ripper. Devolver un cuerpo a la mano para
rejugar su efecto de entrada es *el* patrón de Chaos.

Un bucle de rebote necesita **dos** cosas: un rebotador repetible y una forma de readear al
rebotador. Chaos tiene la primera y **no tiene la segunda**. Grep sobre las 211 cartas del dominio:
todos los efectos de ready de Chaos apuntan a **unidades** o a **runas**, ninguno a **gear**.

| carta | qué readea |
|---|---|
| OGN-173 Ride the Wind | una unidad |
| OGN-260 Last Breath | una unidad |
| SFD-204 On the Hunt | tus unidades |
| OGN-202 Jinx, Rebel | a sí misma (unidad) |
| SFD-195 Blade Dancer | una unidad; y a sí misma al conquistar |
| SFD-203 Battle Mistress | a sí misma, cuando muere una unidad enemiga |
| OGS-017 Dark Child - Starter | hasta 2 **runas** |

Cero readers de gear. Y los dos motores de rebote repetibles del dominio son gear o legend:
**OGN-181 Pack of Wonders** (`:rb_exhaust:`) y **UNL-185 Bloodharbor Ripper** (`:rb_energy_1:`,
`:rb_exhaust:`). Los dos se topan a **una activación por turno**, readeándose recién en el Awaken.

Ésa es la explicación estructural del 1:30 del issue #28, y es una respuesta, no una excusa: **Chaos
no está mal explorado porque nadie miró, está tapado por una restricción real** — es el dominio que
mejor devuelve cuerpos a la mano y el único sin manera de readear el permanente que los devuelve.
Sus motores son honestamente ENGINE, uno por turno, y eso es lo que hay que catalogar. Las dos
excepciones legales que encontró esta lente (C1 Yasuo y C4 Kennen) **no rebotan nada**: una cuenta
movimientos y la otra vive de un trigger de Hold.

## N2 · El bucle de XP Voidreaver + Mister Root da exactamente cero

Parecía la línea evidente de `body+chaos`, y la aritmética la mata.

- **UNL-201** Voidreaver (Legend, Body/Chaos): *"Spend 2 XP, `:rb_exhaust:`: Move an exhausted
  friendly unit from a battlefield to its base."*
- **UNL-127** Mister Root (Chaos, E2 M1): *"When I move to a battlefield, gain **2 XP**."*

El ciclo: gastás 2 XP y exhausteás el legend para mandar a Mister Root a la base; después Mister Root
tiene que volver **a un battlefield** para cobrar sus 2 XP. **Neto: 0 XP**, más el legend exhausteado,
más el costo del viaje de vuelta — que no puede ser un Standard Move, porque Voidreaver sólo mueve
unidades **exhausted** y 144.2 exige exhaustear para el Standard Move: Mister Root llega a la base ya
exhausted y ahí se queda. Hay que pagar un efecto de movimiento (OGN-173 Ride the Wind, `E2 P1`, que
además lo readea) o esperar al Awaken. En todas las versiones el ciclo pierde.

La única canilla de XP honesta de Chaos es **SFD-125 Fae Porter** (*"When I move to a battlefield,
you may pay `:rb_rune_chaos:` to move a unit you control to the same battlefield"*), que por 1 Power
mueve a Mister Root y saca 2 XP netos — pero Fae Porter tiene que moverse primero, así que el
motor sigue costando un movimiento por vuelta. Vale como pieza, no como bucle.

## N3 · Sigil of the Storm no habilita a Battle Mistress: es una pérdida neta

OGN-287 Sigil of the Storm (*"When you conquer here, you **must** recycle one of your runes"*) es la
otra forma de disparar el trigger de SFD-203 Battle Mistress. No sirve: 161.2.b manda esa runa **de
tu board** al Rune Deck. Cambiás una runa —que da 1 Power por turno para siempre— por un Gold token
—que da 1 Power una vez—. Y el "must" no es opcional. Es la forma "doubled drawback" que CLAUDE.md
ya tiene registrada para esta carta. El único habilitador honesto es OGN-200 Twisted Fate (C2).

## N4 · La única INFINITE de Chaos está prohibida

Ya está arriba, pero conviene repetirlo porque cambia el conteo del issue: `pursuer-herald-recruits`
se apoya en **OGN-177 Stealthy Pursuer**, `constructed:banned` y `2v2:banned`. Chaos no tiene
ninguna línea infinita jugable, y el panel de "Banned and restricted" (#23) ya lo reporta a nivel de
mazo, pero el catálogo sigue mostrando la entrada como si fuera una opción.

---

# Lectura de reglas abierta que esta lente encontró

**VEN-109 Illaoi, Prophet of the Great Kraken** (Unit, Chaos, E6 M4):

> When you play me **or when I score**, play a 1 `:rb_might:` Tentacle unit token from Bilgewater.
> I have +1 `:rb_might:` for each token unit you control.

*"when I score"* es la **única aparición de esa redacción en las 935 cartas** (grep sobre
`corpus_flat.txt`). Y las Core Rules definen el Score **sólo para jugadores**: 469 dice *"A player
Scores in one of two ways: Conquer … Hold …"*, y 470/471 hablan de jugadores. No hay ninguna regla
que defina que una **unidad** puntúe.

Lecturas posibles: (A) el trigger es un Hold/Conquer trigger disfrazado y se dispara cuando el
jugador puntúa en el battlefield donde está Illaoi — que es como 383.4.d.2 trata las habilidades que
referencian al jugador que Holdea, y es el razonamiento que fijó R8; (B) se dispara cuando el
jugador puntúa por cualquier medio, esté Illaoi donde esté.

Antes de gastar un número de reading en esto conviene aplicar la regla del proyecto — buscar el
rule text primero. Yo no encontré ninguno; lo dejo **registrado, no ingerido**, porque ninguna de las
seis líneas de arriba depende de resolverlo. Si alguna entrada futura se para en Illaoi, ahí sí hay
que preguntarlo. (El otro rareza de esta carta —el glifo de Energy usado como el numeral `1` delante
del icono de Might— **ya está registrada** en `docs/data-anomalies.md`, fila `UNL-160`/`VEN-109`, así
que no es hallazgo nuevo.)

---

# Resumen

**Seis candidatos, ninguno ingerido.** `data/combos.json` quedó intacto — L8 (Body) está corriendo
en paralelo sobre el mismo archivo.

| # | id propuesto | par | clase | por qué importa |
|---|---|---|---|---|
| C1 | `yasuo-syren-unforgiven-point` | **calm+chaos** | ENGINE | 1 punto/turno por 3 Energy y **cero cartas**; usa el legend de Yasuo con la unidad de Yasuo |
| C2 | `tf-gambler-battle-mistress-gold` | **body+chaos** | ENGINE | el par **sin ninguna entrada**; TF es el único reciclador de runas neutral del pool |
| C3 | `tornado-warrior-matriarch-recursion` | mono-chaos | ENGINE | empower gratis que se limpia solo → unidad gratis del trash cada turno |
| C4 | `kennen-stargazer-arena-flow` | mono-chaos | ENGINE | cruza los **dos** patrones de sinergia con 0 combos; un hechizo del trash por turno vía Hold |
| C5 | `draven-glorious-executioner-point` | **fury+chaos** | ENGINE | 1 punto + 1 carta por combate ganado; legend y unidad del mismo campeón |
| C6 | `pack-of-wonders-fizz-spell-recursion` | mono-chaos | ENGINE | mismo anchor ya verificado, cuerpo mucho mejor que el catalogado |

Los tres pares flacos quedan cubiertos: **calm+chaos** (C1), **body+chaos** (C2), **fury+chaos**
(C5). Ninguno es INFINITE, y N1 explica por qué eso es un hecho del dominio y no una falla de la
búsqueda.

**Lo que cambia en el conteo del issue #28.** Chaos no tiene 7 líneas, tiene **6 jugables**: su
única INFINITE (`pursuer-herald-recruits`) se apoya en OGN-177 Stealthy Pursuer, prohibida en
constructed y en 2v2.

**Si sólo se ingiere una**, que sea **C4**: es la que se para sobre los dos únicos patrones
verificados sin ningún combo, corre sola todos los turnos sin gastar cartas, y su cota (829.1.b.1,
el banish del Flow) es limpia y computable.

