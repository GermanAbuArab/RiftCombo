# L8 — Body (lente por dominio)

Issue #28. Documento único; **no toca `data/combos.json`** (la ingesta es un paso aparte, y
L7—Chaos corre en paralelo sobre el mismo archivo).

Body: **216 cartas** en el pool (161 líneas distintas en `corpus_flat.txt` con `Body` en su
columna de dominios: 127 mono-Body, 10 Body/Order, 8 Calm/Body, 8 Fury/Body, 6 Body/Chaos,
2 Mind/Body), y **8 combos** catalogados. Pares prioritarios: `body+chaos` (3), `fury+body` (5),
`calm+body` (5), `body+order` (5).

Todo texto de carta de este documento está copiado verbatim de `data/corpus_flat.txt`
(gallery API de Riot, 2026-09-04, con errata aplicada) y todo número de regla verificado por
`grep` contra `data/Riftbound-Core-Rules-2026-07-16.txt`.

## Método

1. Los 28 patrones verificados de `data/synergies.json` — cuáles tienen anchor o partners en Body.
2. Barrido dirigido del corpus por mecánica de Body, en tajadas, con `grep`/`awk`.
3. Cada candidato contra las trampas de autoría de `CLAUDE.md` y contra el texto verbatim del corpus.

## Paso 1 — qué patrones verificados viven en Body

Tres de los 28 tienen su **anchor** en Body:

| patrón | anchor | dominio | partners | combos que lo citan |
|---|---|---|---|---|
| `wallop-buff-spend` | OGN-146 Wallop | Body | 33 | 2 |
| `blood-rose-level` | UNL-109 Blood Rose | Body | 15 | **0** |
| `relentless-pursuit-move-triggers` | SFD-184 Relentless Pursuit | Fury/Body | 28 | 1 |

`blood-rose-level` es literalmente el caso que describe el issue #28: **un patrón verificado, con
15 partners enumerados, y CERO combos catalogados detrás**. Uno de esos 15 partners es
UNL-191 Wuju Master, el techo mecánico del dominio (§B4). Nadie lo caminó.

Los 8 combos que hoy tocan Body, para no repetirlos:

```
blue-sentinel-trinity-force-hold   BURST   Mind+Body   UNL-087 · SFD-115
brambleback-trinity-skyfall-conquer BURST  Fury+Body   UNL-029 · SFD-115 · SFD-030
jhin-relentless-pursuit-wallop     ENGINE  Fury+Body   UNL-022 · SFD-184 · SFD-108 · OGN-146
platewyrm-egg-defender-gate        ENGINE  Body+Mind   VEN-075 · VEN-149 · VEN-150 · SFD-078
fae-dragon-wallop-industrialist    ENGINE  Body+Order  SFD-101 · SFD-171 · OGN-146 · OGS-014
aphelios-jax-quickdraw-attach      ENGINE  Calm+Body   SFD-049 · SFD-054 · SFD-033 · SFD-193
dazzling-aurora-elder-dragon       ENGINE  Body        OGN-160 · UNL-118
gemdragon-henge-vi-blind-fury      ENGINE  Body        UNL-104 · OGN-140 · SFD-117
```

Dos de los ocho (`blue-sentinel-trinity-force-hold`, `brambleback-trinity-skyfall-conquer`) sólo
tocan Body porque usan **SFD-115 Trinity Force**, y sus shells son Mind y Fury. Ninguno de los ocho
usa OGN-153, OGN-152, OGN-124, UNL-109, UNL-191, SFD-203, SFD-204, OGN-230 ni OGN-269, que es
donde está la máquina del dominio.

## Paso 2 — la identidad mecánica de Body, medida sobre el corpus

Body no es "cartas grandes". Sus tres motores, en orden de densidad:

- **Buff / spend-buff.** El buff es un contador de un solo uso pegado a una unidad. Techo de **uno
  por unidad** (702.3: *"There can only be one Buff on a Unit at a time"*; 702.3.a: si se añade a
  una unidad que ya tiene uno, **no se coloca**), con una sola excepción impresa en todo el pool
  (§B1). Gastarlo es lo que paga: OGN-146 Wallop lo cambia por un **ready gratis**, SFD-101 Fae
  Dragon por un **Gold gear token**, OGN-150 Kraken Hunter por **1 Power de descuento cada uno**,
  OGN-230 Albus Ferros por **1 runa channeled cada uno**, OGN-164 Sett por +4 Might.
- **Ready de unidades.** Body es el dominio del ready barato: OGN-146 Wallop (ready por 0 con un
  buff), OGN-153 Overt Operation (**ready masivo** y re-buff), OGN-152 Mistfall (ready al buffear),
  OGN-147 Wildclaw Shaman, UNL-109 Blood Rose, SFD-204 On the Hunt ("Ready your units", E1 P2).
- **XP / Level.** [Hunt], [Hunt 2] y [Hunt 3] pueblan Body, y UNL-109 Blood Rose **compra XP sin
  conquistar**. El techo del dominio es UNL-191 Wuju Master {Calm/Body}: **[Level 11][>] Your units
  enter ready**, la única carta del pool que apaga 143.4 de forma permanente y gratuita.

Ninguna de las tres fue el eje de L1–L6. L3 (ready/resource) miró el ready **de runas y gears**,
que es Mind/Order. El ready **de unidades pagado con buffs** es Body y quedó sin barrer.

---

# Hallazgos

## B1 — Lee Sin, Ascetic es el único banco de buffs del pool (Calm+Body) · POSITIVO

**Cartas.** OGN-078 Lee Sin, Ascetic (Calm, E5 P1 M5) · OGN-152 Mistfall (Body, gear, E3) ·
OGN-257 Blind Monk (Calm/Body, legend) · OGN-146 Wallop (Body, spell, E2) ·
SFD-101 Fae Dragon (Body, unit, E7 P1 M7) · OGN-150 Kraken Hunter (Body, unit, E3 P2 M5).

**Texto verbatim.**
- OGN-078: *"[Shield] (+1 :rb_might: while I'm a defender.) :rb_exhaust:: Buff me. (I get a +1
  :rb_might: buff.) **I can have any number of buffs.**"*
- OGN-152: *"When you buff a friendly unit, you may pay :rb_rune_body: and exhaust this to ready it."*
- OGN-257: *":rb_energy_1:, :rb_exhaust:: Buff a friendly unit."*
- OGN-146: *"As you play this, you may spend a buff as an additional cost. If you do, ignore this
  spell's cost. Ready a unit."*
- OGN-150: *"As you play me, you may spend any number of buffs as an additional cost. Reduce my
  cost by :rb_rune_body: for each buff you spend."*

**El hallazgo.** 702.3 dice que una unidad tiene como máximo un buff a la vez, y 702.3.a dice que
un buff añadido sobre una unidad ya buffeada **no se coloca** (no se pierde en otro lado: no
existe). Eso convierte a todo el motor de buffs de Body en un recurso que **no se puede acumular** —
salvo sobre OGN-078. Su texto es exactamente el permiso que 426.1.b.2 contempla
(*"Some effects may grant a Game Object permission to be Buffed multiple times"*).

Barrido completo del pool por `any number of buffs|another buff|additional buff|second buff`:
**una sola carta, OGN-078**. Es el único sitio del juego donde "buffear" es "guardar".

**Pasos (un turno, Calm+Body).**
1. Lee Sin listo en el board. `:rb_exhaust:: Buff me.` → buff #1.
2. Mistfall dispara sobre ese buff: pagás :rb_rune_body:, exhausteás Mistfall, **readyás a Lee Sin**
   (el "it" de Mistfall es la unidad buffeada). Mistfall no gasta el buff — 702.2.b define gastar
   como *"removes a single Buff counter"*, y Mistfall no lo dice.
3. Lee Sin exhaustea otra vez → buff #2.
4. Blind Monk (legend, siempre disponible): E1 + exhaust → buff #3.
5. Cualquier otro efecto "buff a friendly unit" del mazo apunta a Lee Sin y se apila: OGN-136 Pit
   Rookie, OGN-141 Kinkou Monk, OGN-063 Spirit's Refuge, OGN-053 Stand United,
   OGN-153 Overt Operation ("Then buff all friendly units"), SFD-101 Fae Dragon.
   **Uno cada uno**, aunque el efecto buffee a varias unidades: Kinkou Monk buffea *"up to two
   other friendly units"* y Fae Dragon *"up to four"*, pero cada efecto elige unidades distintas,
   así que Lee Sin recibe un solo contador por resolución. El apilado viene de la **cantidad de
   efectos**, no del tamaño de cada uno.

**Qué produce.** Cada buff guardado es, a elección:
- un **Wallop gratis** (ready de una unidad por 0 Energy, 0 Power), o
- **1 :rb_rune_body: de descuento** en Kraken Hunter (2 buffs le sacan todo el coste de Power), o
- con Fae Dragon en mesa, **un Gold gear token extra por cada gasto**, porque su disparador es
  *"When you spend a buff"* sin once-per-turn y sin excepción para gastos hechos como coste — la
  misma lectura sobre la que ya se sostiene la entrada verificada
  `fae-dragon-wallop-industrialist`.

**Qué lo acota.**
- Mistfall se exhaustea: **un ready extra por turno**, a 1 Power. Es un conversor Power→buff, no un loop.
- 103.2.b limita a 3 Wallop por mazo.
- **705**: *"If a Unit leaves play, remove all Buffs from it."* Todo el banco vive en un solo cuerpo;
  matar a Lee Sin (M5, con [Shield] sólo mientras defiende) borra la pila entera. Es la debilidad
  estructural de la línea y hay que escribirla en la entrada.
- Lee Sin es Calm y Mistfall/Wallop/Fae Dragon son Body ⇒ Domain Identity 103.1.b obliga a un
  legend Calm/Body: OGN-257 Blind Monk, UNL-191 Wuju Master o SFD-193 Grandmaster at Arms.
  Blind Monk es el que además genera un buff por turno.

**Clase: ENGINE.** No es INFINITE y no debe etiquetarse así: el único ready gratuito de la cadena
(Mistfall) necesita a su vez un ready, y no hay "buff → ready → buff" cerrado (ver §B7).

**Trampas chequeadas.** No hay battlefield enemigo vacío ni designación de Atacante. No hay Energía
de Awaken. No hay tokens [Temporary]. No se recicla ninguna runa por Power salvo el pago explícito
de Mistfall. Los buffs son contadores y 704.1 dice que **no son targeteados**, así que [Deflect] no
protege contra ellos — a favor de la línea, no en contra.

---

## B2 — Kraken Hunter pagado en buffs, con Fae Dragon detrás (mono-Body) · POSITIVO

**Cartas.** OGN-150 Kraken Hunter (Body, E3 P2 M5) · SFD-101 Fae Dragon (Body, E7 P1 M7).

**Texto verbatim.**
- OGN-150: *"[Accelerate] (You may pay :rb_energy_1::rb_rune_body: as an additional cost to have me
  enter ready.) [Assault] (+1 :rb_might: while I'm an attacker.) As you play me, you may spend any
  number of buffs as an additional cost. Reduce my cost by :rb_rune_body: for each buff you spend."*
- SFD-101: *"When you play me, buff up to four friendly units. (Give each a +1 :rb_might: buff if it
  doesn't have one.) **When you spend a buff, play a Gold gear token exhausted.**"*
- UNL-T05 Gold: *"[Reaction][>] Kill this, :rb_exhaust:: [Add] :rb_rune_rainbow:."* (rule 187.5).

**Pasos.** Fae Dragon entra y buffea hasta cuatro unidades. Jugás Kraken Hunter gastando 2 de esos
buffs: su coste de Power baja de :rb_rune_body::rb_rune_body: a **cero**, y cada gasto dispara Fae
Dragon → **2 Gold gear tokens**. Kraken Hunter queda en mesa por E3 y dos buffs, y quedan 2 Golds.

**Por qué importa.** Es el único descuento de **Power** del pool pagado con buffs. En Riftbound cada
Power cuesta una runa: 164.2.b, *"Recycle this: [Reaction] — Add [C]"*, y 161.2.b/416.1.b mandan esa
runa **al Rune Deck**, fuera del board para siempre. Un descuento de 2 Power son dos runas que se
quedan en la mesa produciendo Energy todos los turnos.

**Qué lo acota.**
- Los Golds entran **exhausted** por texto propio de Fae Dragon. No son [Temporary] (UNL-T05 no lo
  lleva), así que **sobreviven y se readyan en tu Beginning Phase siguiente**: son Power diferido,
  no Power perdido. Pero hay que matarlos en la **Main Phase**, no en Awaken ni en la Beginning
  Phase: 167 vacía el Rune Pool al empezar la Main Phase y 167.1 dice que lo no gastado se pierde.
- Con SFD-171 Renata Glasc, Industrialist (Order) entran **ready** y son Power inmediato — R25 = A,
  ya ruleado. Eso lo mueve a **Body+Order** y lo solapa con la entrada verificada existente.
- 702.3 limita a un buff por unidad, así que "any number of buffs" en la práctica es "tantos buffs
  como unidades buffeadas tengas", salvo que el banco sea Lee Sin (§B1).

**Clase: ENGINE.** Candidato de ingesta claro para el par mono-Body / Body+Order.

**Trampas chequeadas.** [Accelerate] es la que resuelve 143.4 para el propio Kraken Hunter; sin
pagarla entra exhausted y **no puede hacer Standard Move**. Sin tokens [Temporary]. Sin runa
reciclada. Sin battlefield vacío.

---

## B3 — Overt Operation: la nota de `fae-dragon-wallop-industrialist` está mal calibrada · CORRECCIÓN

La entrada verificada `fae-dragon-wallop-industrialist` dice en sus `prerequisites.notable`:

> *"Overt Operation (OGN-153, 5E+2P) spends every buff at once and re-buffs all friendly units with
> no cap — a refuel, and **a net loss as a Gold converter**."*

Texto verbatim de OGN-153 Overt Operation (Body, spell, **E5 P2**):
*"[Action] (Play on your turn or in showdowns.) For each friendly unit, you may spend its buff to
ready it. Then buff all friendly units."*

Con **K** unidades amigas buffeadas, un Overt Operation produce en una sola resolución:
K readies de unidad + K disparos de Fae Dragon (K Golds) + re-buff de **todas** las unidades amigas.
Con Renata Industrialist esos K Golds entran ready = **K Power**. Contra un coste de 2 Power:

| K | Power neto | readies | buffs al final |
|---|---|---|---|
| 1 | −1 | 1 | todas |
| 2 | **0** | 2 | todas |
| 3 | **+1** | 3 | todas |
| 5 | **+3** | 5 | todas |

Empata en K=2 y es **Power-positivo desde K=3**, además de readyar K unidades y dejar el tablero
re-buffeado para el siguiente ciclo. "Net loss as a Gold converter" sólo es cierto con una o dos
unidades buffeadas. No propone una entrada nueva — propone **corregir esa frase** cuando se toque
la entrada, porque hoy desaconseja la carta que mejor explota el motor.

Ojo con el orden: los Golds aparecen **después** de pagar el hechizo, así que los 2 Power de coste
hay que tenerlos antes; el saldo positivo queda disponible recién dentro del mismo Main Phase.

---

## B4 — Wuju Master [Level 11] es el único "Your units enter ready" del pool, y la economía de XP de Body se pelea consigo misma · POSITIVO + TRAMPA NUEVA

**Cartas.** UNL-191 Wuju Master (Calm/Body, **legend**) · UNL-109 Blood Rose (Body, gear, E1).

**Texto verbatim.**
- UNL-191: *"[Level 6][>] Your units have +1 :rb_might:. (While you have 6+ XP, get the effect.)
  **[Level 11][>] Your units enter ready.**"*
- UNL-109: *"When you play a unit, you may pay :rb_energy_1: to gain 1 XP. Spend 3 XP,
  :rb_exhaust:: Ready a unit."*

**Por qué es el techo del dominio.** 143.4 dice *"Units enter the Board exhausted"*, y esa regla es
la que impide que una unidad recién jugada mueva, ataque o use su habilidad de exhaust. Barrido
completo del pool por `units? .{0,25}enter ready`: sólo hay siete efectos que la apaguen, y **seis
son de un turno o de un solo cuerpo** — OGN-129 Confront (*"Units you play this turn enter ready"*),
SFD-004 Bushwhack (*"Friendly units enter ready this turn"*), OGN-011 Magma Wurm (*"Other friendly
units enter ready"*, unidad de E8 P1 que puede morir), y los "I enter ready" individuales
(OGN-159, OGS-009, OGS-016, SFD-006, SFD-094, UNL-001, UNL-008, VEN-013, VEN-091). El séptimo es
UNL-191, y es **un legend**: no se dibuja, no se puede matar, no cuesta una carta. Es Renata
Industrialist (*"Your tokens enter ready"*) pero para **todas** tus unidades.

**La trampa nueva, que ningún documento del proyecto registra todavía.**
824.1.b.1 hace que `[Level N]` sea literalmente *"While you have N or more XP, this card gains
'[Text]'"*, y **824.1.d**: *"The Dependent Ability will be Inactive as soon as the controlling
player has less than [N] XP."* Combinado con **730.2**: *"To Spend XP, reduce the value of XP
marked on the Player spending it."*

⇒ **El XP gastado baja tu Level.** No es un umbral histórico, es el saldo actual. Y Body reparte sus
cartas de XP en dos mitades que se pelean:

| acumulan XP | gastan XP |
|---|---|
| UNL-109 Blood Rose (1 XP por unidad jugada, 1 Energy) | UNL-109 Blood Rose (3 XP: ready a unit) |
| [Hunt]/[Hunt 2]/[Hunt 3] — UNL-094, UNL-102, UNL-113, UNL-100, UNL-117, UNL-119, UNL-096 (Equipment) | UNL-102 Crowd Favorite (2 XP: buff me) |
| UNL-092 (al jugarla), UNL-107 (al mover enemigos), UNL-095 (al ganar combate) | UNL-119 Kha'Zix (3 XP al atacar) |
| UNL-115 Nilah (*"When I move, gain 1 XP"*) | UNL-203 Keeper of the Hammer (3 XP: draw 1) |
| UNL-201 Voidreaver (*"When you win a combat, gain 1 XP"*) | UNL-201 Voidreaver (1 XP buff / 2 XP move) |

Una lista que llega a 11 XP y después gasta 3 en el ready de Blood Rose cae a 8 y **pierde "your
units enter ready"** hasta volver a subir. Cualquier candidato que junte `[Level]` con gasto de XP
está mal salvo que declare el margen. Es exactamente el mismo tipo de error que la auditoría de
BURSTs del 2026-09-04 encontró cuatro veces: la entrada no cierra con las cantidades que declara.

**Ritmo de subida, medido.** UNL-109 Blood Rose paga 1 Energy por unidad jugada, y **185.2.a**
(*"Tokens can be played by their owner if their card type is played"*) hace que los **tokens de
unidad cuenten**: cada Recruit / Sand Soldier / Bird token jugado es un XP por 1 Energy. En
Calm+Body los generadores legales son UNL-044 Flurry of Feathers (**cuatro** Bird tokens, E4 P2),
UNL-033 Frisky Hunter, SFD-031 Desert's Call y los battlefields colorless OGN-275 Altar to Unity y
UNL-217 Trapping Grounds.

**Contra-trampa que hay que registrar con esto**: SFD-031 Desert's Call **no** es una bomba de XP
escalable. **820.1.c.3**: *"Each Repeat Cost can be paid only a single time."* Su `[Repeat]
:rb_energy_2:` da **dos** Sand Soldiers, no N. (A favor, 429.3 sí permite activar Add-Reactions en
mitad del pago, así que la Energy de Blood Rose se puede levantar sobre la marcha.)

**Clase: ENGINE.** El payoff es real y permanente, el camino es un reloj de varios turnos y el
riesgo es la caída de nivel. Una entrada honesta tiene que declarar el XP objetivo (11), el margen
que mantiene, y que Blood Rose es a la vez la rampa y el sumidero.

**Trampas chequeadas.** [Hunt] es Conquer y Hold a la vez (823.1.b, 823.1.c.1), así que un
`[Hunt]` sí puede subir XP sin atacar — pero holdear necesita **estar** en el battlefield en tu
Beginning Phase, y un token [Temporary] muere antes de puntuar (816.1.b) y no holdea. Ningún token
de esta lista lleva [Temporary] salvo el Sprite de UNL-048 Trevor Snoozebottom, que queda excluido
por eso. La Energía gastada en Blood Rose sale de la Main Phase, no de Awaken (167).

---

## B5 — Dominus regala un "2 Power: Ready me" ilimitado y aun así NO cierra un loop · NEGATIVO ARGUMENTADO

**Carta.** VEN-142 Dominus (**Fury/Body**, spell, E4):
*"[Action] (Play on your turn or in showdowns.) This turn, double a unit's Might and give it
':rb_rune_rainbow::rb_rune_rainbow:: Ready me.'"*

Un ready **sin exhaust en el coste y sin límite por turno**, por 2 Power, es exactamente la forma de
un INFINITE: basta una unidad cuyo exhaust produzca 2 o más Power.

**Barrido del pool completo** (`awk` sobre las 935 cartas, unidades cuyo texto contiene
`:rb_exhaust::` y `[Add]`):

| carta | dominio | lo que añade |
|---|---|---|
| OGN-113 Malzahar, Fanatic | Mind | :rb_rune_rainbow::rb_rune_rainbow: — **el único ≥2 Power** |
| OGS-014 Lux, Crownguard | Order | 2 **Energy**, *"Use only to play spells"* |
| UNL-093 Dragonsoul Sage | Body | 1 Energy |
| UNL-018 Yeti Brawler | Fury | Golds, y sólo al conquistar |
| UNL-145 Pyke, Returned | Chaos | once each turn |

Y un `grep` sobre todo el corpus por `[Add] :rb_rune_rainbow::rb_rune_rainbow:` devuelve **una sola
línea en todo el juego**: OGN-113.

Dos razones independientes lo cierran:
1. **Domain Identity 103.1.b**: Dominus es Fury/Body y Malzahar es Mind. No existe un legend que
   cubra Fury/Body y Mind — cada legend tiene exactamente dos dominios. No hay mazo que pueda tener
   las dos cartas.
2. Aunque lo hubiera: el coste de Malzahar es *"**Kill a friendly unit or gear**, :rb_exhaust::"*.
   Cada ejecución se come un permanente propio, así que el "loop" tiene un combustible finito por
   construcción, igual que en las líneas de Ekko ya catalogadas.

Además, *"This turn"* hace que la habilidad regalada **caduque al final del turno**, así que ni
siquiera es un motor entre turnos.

**Veredicto: no hay INFINITE por acá, y la pregunta queda cerrada.** Dominus es un pump de Might con
un sumidero de maná pegado. Vale registrarlo justamente porque su texto invita al error.

---

## B6 — Battle Mistress convierte cada pago de Power en un Gold (Body+Chaos) · POSITIVO, y es el par más pobre del catálogo

**Cartas.** SFD-203 Battle Mistress (**Body/Chaos**, legend) · SFD-204 On the Hunt (Body/Chaos,
spell, E1 P2).

**Texto verbatim.**
- SFD-203: *"When you recycle a rune, you may exhaust me to play a Gold gear token exhausted.
  When one or more enemy units die, ready me."*
- SFD-204: *"Ready your units."*

**Por qué el disparador es mucho más ancho de lo que parece.** 164.2.b dice que la segunda habilidad
impresa en toda runa básica es *"Recycle this: [Reaction] — Add [C]"*: **reciclar una runa es la
única forma de producir Power**. O sea que *"When you recycle a rune"* no es un disparador de nicho:
salta **cada vez que pagás un coste de Power**. Y 161.2.b/416.1.b mandan esa runa al Rune Deck, así
que el pago es una pérdida permanente de board.

Battle Mistress **devuelve parte de esa pérdida**: por cada runa reciclada (mientras esté ready) te
da un Gold, que es 1 Power más tarde (UNL-T05, rule 187.5). Y su segunda mitad la re-arma sin
límite: *"When one or more enemy units die, ready me"* — en Chaos, el dominio del removal, eso es
una vez por oleada, no una vez por turno.

**Qué lo acota, y es lo honesto de la línea.**
- Es un **refund parcial y diferido**, no ganancia neta: la runa que reciclaste habría dado 1 Energy
  todos los turnos; el Gold da 1 Power una sola vez. Battle Mistress abarata el reciclado, no lo
  vuelve gratis. La trampa de `CLAUDE.md` ("reciclar una runa por Power la saca del board") aplica
  entera y la entrada tiene que decirlo.
- El Gold entra **exhausted**, y SFD-171 Renata Glasc, Industrialist es **Order** — fuera de la
  identidad Body/Chaos. En este mazo los Golds son siempre Power del turno siguiente.
- Necesita muertes enemigas para re-armarse: sin removal es un Gold por turno.

**Clase: ENGINE.** `body+chaos` es el par con **3 combos**, el más pobre de los doce, y esta es la
carta con la que ese par está construido. Candidato de ingesta prioritario, y el punto de costura
con **L7 — Chaos**: la mitad "mueren unidades enemigas" es material de Chaos y esa lente debería
mirar SFD-203 desde el otro lado.

**Trampas chequeadas.** El Gold no es [Temporary]. La runa reciclada sale del board — declarado
arriba, no escondido. No hay battlefield vacío ni designación de Atacante en ninguna mitad.
SFD-204 "Ready your units" (E1 P2) es el otro huérfano del par: cero combos lo usan.

---

## B7 — El loop "buff → ready → buff" está cerrado por diseño · NEGATIVO ARGUMENTADO

Es la primera línea que uno intenta en Body y no existe. La demostración es corta y vale
registrarla para que ninguna lente futura la vuelva a intentar:

- **ready al buffear**: existe. OGN-152 Mistfall, *"When you buff a friendly unit, you may pay
  :rb_rune_body: and exhaust this to ready it."*
- **buff al readyar**: no existe. Dos greps sobre todo el corpus:
  `When (you|I) (ready|readies|am readied|'m readied)` devuelve **una sola carta**, OGN-143
  Pirate's Haven (Body, gear, E3), *"When you ready a friendly unit, give it +1 :rb_might: this
  turn."*; y `become(s)? ready` devuelve **dos**, ambas Body y ambas sobre sí mismas — VEN-071
  Fretful Feline (*"give me +2 :rb_might: this turn"*) y VEN-088 Jayce, Hammer in Hand (*"choose
  one to give me this turn — [Assault 2] / [Deflect 2] / [Ganking]"*). Ninguna de las tres coloca
  un buff.

**+1 Might this turn no es un buff.** 703 dice *"Each Buff individually contributes +1 Might to a
Unit"*, pero 702 define el buff como un **contador**, 426.1.a dice que *"A Buff is also an object"*
y 426.2.a dice que *"Players may only Buff units when Game Effects direct them to do so"*. Un
modificador de Might temporal no coloca contador, así que Pirate's Haven no alimenta a Wallop, ni a
Kraken Hunter, ni a Fae Dragon, ni a Mistfall.

⇒ **La mitad de vuelta del ciclo no está impresa.** Todo ready en Body se paga con un buff que vino
de otra parte, y por eso §B1 (acumular buffs) es el ángulo correcto y no "cerrar el ciclo".

---

## B8 — Seams que quedan abiertos

Cosas medidas pero no caminadas hasta el final en esta lente, con lo que hace falta para cerrarlas:

1. **OGN-230 Albus Ferros** (Order, E4 M3): *"When you play me, spend any number of buffs. For each
   buff spent, channel 1 rune exhausted."* Es el conversor buff→**runa** (no Gold, no Power puntual:
   una runa permanente en el board). Con el banco de §B1 y Fae Dragon detrás, cada buff gastado da
   una runa **y** un Gold. Es **Body+Order** y no lo usa ningún combo. Falta: verificar el texto de
   "channel" contra las reglas (¿la runa entra exhausted y se readya en tu Beginning Phase?) y
   contar el neto contra el coste de reunir K buffs.
2. **OGN-269 The Boss** (Body/Order, legend): *"If a buffed unit you control would die, you may pay
   :rb_rune_rainbow:, exhaust me, and spend its buff to heal it, exhaust it, and recall it instead.
   (Send it to base. This isn't a move.) **When you conquer, ready me.**"* Un legend que gasta buffs
   para negar muertes y se re-arma al conquistar. Cero combos. Falta: comprobar si "recall" a base
   habilita algún replay (**456** dice que un recall **no** es un move, así que no dispara "When I
   move" — eso ya cierra la lectura optimista) y si el ciclo conquer→ready→salvar cierra contra un
   sacrificio propio.
3. **SFD-115 Trinity Force** (*"[Effect] When I hold, score 1 point"*) es **Body** y sus dos entradas
   catalogadas son shells Mind y Fury. Un shell **mono-Body** con [Hunt] (UNL-096 Hunter's Machete
   es Equipment con [Hunt], mismo dominio y mismo requisito de hold) no está en el catálogo. Falta:
   una lista concreta de holds sostenibles en Body y el chequeo de R8/R2 sobre el conteo de puntos.
4. **VEN-153 Matriarch of War** (Body/Order): *"When you empower something else, empower me.
   Disempower me, :rb_rune_rainbow:, :rb_exhaust:: Ready a unit."* + VEN-082 Profiteer (Body):
   *"When you play me, you may disempower something you control to empower a legend, unit, or gear."*
   El eje Empower/Disempower de Body es nuevo (set VEN) y `sanction-empower-unit` /
   `hextech-formula-empower-gear` lo tocan sólo desde Calm y Mind. Cero combos en Body.
5. **SFD-204 On the Hunt** (Body/Chaos, E1 P2, *"Ready your units"*) — mass ready barato, cero
   combos, y el par `body+chaos` es el más pobre. Falta: un payoff que valga N readies simultáneos
   dentro de Body/Chaos.

---

## Resumen

**Positivos para ingesta (candidatos, no entradas):** B1 (Lee Sin como banco de buffs, Calm+Body),
B2 (Kraken Hunter pagado en buffs + Fae Dragon, mono-Body / Body+Order), B4 (Wuju Master
[Level 11] + Blood Rose, Calm+Body), B6 (Battle Mistress, Body+Chaos — el par más pobre del
catálogo). Los cuatro son **ENGINE**; ninguno alcanza INFINITE, BURST, CHAIN ni ALT_WIN y ninguno
debe etiquetarse así.

**Negativos argumentados que cierran preguntas:** B5 (Dominus no cierra ningún loop — barrido
completo del pool: un solo generador de ≥2 Power por exhaust, y Domain Identity lo pone fuera de
alcance) y B7 (el ciclo buff↔ready no está impreso: sólo existe la mitad de ida).

**Corrección a una entrada verificada:** B3 — la nota de `fae-dragon-wallop-industrialist` llama a
Overt Operation "a net loss as a Gold converter", y su propia aritmética dice que empata en K=2 y
gana desde K=3.

**Trampa nueva para `CLAUDE.md`:** **el XP gastado baja el Level** (824.1.d + 730.2), y la mitad de
las cartas de XP de Body son sumideros. Y **cada coste de Repeat se paga una sola vez**
(820.1.c.3), así que un `[Repeat]` da dos ejecuciones, no N.

**Verdicto sobre la pregunta del issue #28 para Body:** el desbalance **no** es que Body no tenga
material. Es que sus tres motores (buff/spend-buff, ready de unidades, XP/Level) no eran el eje de
ninguna de las seis lentes mecánicas, y quedaron sin barrer. Nueve cartas centrales del dominio
— OGN-153, OGN-152, OGN-124, OGN-150, OGN-078 (vía Calm), UNL-109, UNL-191, SFD-203, SFD-204 —
no aparecen en un solo combo del catálogo.
