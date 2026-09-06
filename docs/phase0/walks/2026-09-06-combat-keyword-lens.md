# Issue #106 — la lente de las keywords de combate: una sola candidata caminada

**Date:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16 · **Corpus:** `data/corpus_flat.txt`
(Riot gallery, 2026-09-04, errata aplicada)

La caza de #106 barrió las diez keywords de combate (`[Tank]`, `[Assault]`, `[Shield]`, `[Vision]`,
`[Legion]`, `[Hunt]`, `Mighty`, `[Backline]`, `[Weaponmaster]`, `[Accelerate]`) y dejó **una** candidata:
`karma-lux-recycle-buff-army`, Karma Channeler apilada sobre el loop verificado `lux-infinite-energy`.
Todo el texto de carta de abajo está grepeado verbatim de `data/corpus_flat.txt`; todos los números de
regla fueron abiertos en `data/Riftbound-Core-Rules-2026-07-16.txt` y se citan como se leen ahí.

**Resultado: 1 entrada `verified` (ENGINE), 0 refutadas, 0 reescritas.** Ninguna entrada existente
cambió de clase ni de `quantity`. La candidata sobrevive pero **su aritmética se reescribió**: la caza
insinuaba un ejército que se agranda pasada tras pasada y 702.3 lo prohíbe. El producto real es un techo
fijo, no una acumulación.

---

## 0. Ban check

`grep '\[BANNED' ` sobre cada printing usado abajo: **OGN-235 Karma Channeler, OGN-212 Forge of the
Future, OGN-110 Ekko Recurrent, UNL-165 Shadow's Call, UNL-173 Sacrifice, OGN-265 Herald of the Arcane,
OGS-021 Lady of Luminosity - Starter, SFD-201 Chem-Baroness, UNL-199 Deceiver** — las nueve limpias en
constructed y en 2v2. La lista de baneos del corpus (12 filas marcadas `[BANNED`) no toca ninguna.

## 0.1 El bloque de reglas, abierto primero

| regla | lo que dice, textual |
|---|---|
| **416.1** | "Recycling cards is the action in which a player takes one or more cards from a specific zone and then puts it on the bottom of the corresponding deck." |
| **416.1.a** | "Main Deck cards are Recycled to the Main Deck." |
| **416.1.b** | "Runes are Recycled to the Rune Deck." |
| **416.1.c** | "Each player Recycles cards to their own Main Deck and Rune Deck, regardless of which player is instructed to perform the Recycle action." |
| **416.5** | "If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the bottom of that deck in a random order." |
| **416.6** | "'Recycle X from [Zone].' … take X cards of the instructed player's choice from the relevant zone and recycle them. Such an instruction does not target the recycled cards." |
| **161.2.b** | "When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck." |
| **164.2.b** | Toda Basic Rune tiene "Recycle this: [Reaction] — Add [C]." |
| **702** | "Buffs are counters placed on Units." |
| **702.2.a** | "To Buff a Unit, a player chooses a Unit and then places a buff on it. That Unit is Buffed for as long as the buff remains on it." |
| **702.2.b** | "Spending a Buff removes a single Buff counter from a Unit." |
| **702.3** | **"There can only be one Buff on a Unit at a time."** |
| **702.3.a** | **"If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is not placed instead."** |
| **703** | "Each Buff individually contributes +1 Might to a Unit." |
| **704.1** | "Buffs are counters, and thus are not targeted by spells and abilities." |
| **705** | "If a Unit leaves play, remove all Buffs from it." |
| **185.2.b** | "Token units have a Might." |
| **143.4** | "Units enter the Board exhausted." |
| **817.1.b** | Vision "is functionally short for 'When this is played, predict.'" |
| **817.1.c** | "The trigger is the permanent entering the Board." |
| **436.1** | "Predicting a card is the act of looking at a single card from the top of the Main Deck and choosing whether or not to Recycle it." |
| **436.4 / 436.4.a** | predecir con menos cartas de las pedidas se hace "as many as possible instead"; "The Player will not perform a Burn Out as a result of Predicting with too few cards in their deck." |
| **431.1.c** | mirar o revelar de más "looks at or Reveals as many as possible, but does not Burn Out, then proceeds with the rest of the instruction." |
| **808.1.c** | Deathknell "is functionally short for 'When I die, [Effect].'" |
| **808.1.d.2** | el trigger entra a la chain como Pending Item "before the card with an ability that triggers on its own death is moved to the trash". |
| **103.1.b.1 / 103.1.b.2** | "Cards included in your deck must abide by your Domain Identity." / "Your deck's Domain Identity is dictated by the domains of your Champion Legend." |
| **103.1.b.3** | "If a card has a single Domain, then that card is permitted in the Domain Identity that corresponds to the same Domain." |
| **103.2.b** | tope de 3 copias por nombre en el Main Deck. |
| **377.1** | "Activated Abilities are recognized by the presence of a ':' in the text of the card, preceded by a cost and succeeded by an effect." |
| **340.1** | la chain resuelve el ítem más nuevo primero. |
| **383.3.c** | un Triggered Ability se pone en la chain apenas su condición se cumple. |
| **315.1.b** | Awaken paso 1: "The Turn Player readies all Game Objects they control that are able to be readied." |

---

## 1. Texto verbatim de las cinco cartas

```
OGN-235 | Karma, Channeler | Unit | Order | E6 P1 M6 | [Vision] (When you play me, look at the top
card of your Main Deck. You may recycle it.) When you recycle one or more cards to your Main Deck,
buff a friendly unit. (If it doesn't have a buff, it gets a +1 :rb_might: buff. Runes aren't cards.)
[Tags: Vi, Ionia]

OGN-212 | Forge of the Future | Gear | Order | E2 | When you play this, play a 1 :rb_might: Recruit
unit token at your base. Kill this: Recycle up to 4 cards from trashes.

OGN-110 | Ekko, Recurrent | Unit | Mind | E5 P1 M5 | [Accelerate] (You may pay
:rb_energy_1::rb_rune_mind: as an additional cost to have me enter ready.) [Deathknell] — Recycle me
to ready your runes. (When I die, get the effect.) [Tags: Ekko, Zaun]

UNL-165 | Shadow's Call | Spell | Order | E2 | Choose a friendly unit without [Temporary]. Give it
[Temporary]. Draw 2. (Kill it at the start of its controller's Beginning Phase, before scoring.)

UNL-173 | Sacrifice | Spell | Order | E1 | [Reaction] (Play any time, even before spells and
abilities resolve.) As an additional cost to play this, kill a friendly [Mighty] unit. (A unit is
Mighty while it has 5+ :rb_might:.) Draw 2 and channel 1 rune exhausted.
```

---

## 2. ¿Karma dispara con los reciclados del loop? Sí, con dos de los tres, y el tercero es el que su
propio recordatorio explica

Karma pide **"when you recycle one or more cards to your Main Deck"**. La condición es de zona de
DESTINO, no de origen, y 416.1.a la resuelve: *"Main Deck cards are Recycled to the Main Deck."*
Recorriendo los ocho pasos de `lux-infinite-energy` uno por uno:

| paso del loop | ¿recicla? | ¿a dónde? | ¿dispara Karma? |
|---|---|---|---|
| 1. Forge `Kill this: Recycle up to 4 cards from trashes` → Forge + Shadow's Call + Sacrifice | sí, 3 cartas, **un** evento | Main Deck (416.1.a) | **SÍ — disparo 1** |
| 2. pagar 1 Mind Power reciclando una runa exhausta (164.2.b) | sí, 1 runa | **Rune Deck** (416.1.b, 161.2.b) | **NO** |
| 3. Shadow's Call sobre Ekko (draw 2) | no | — | no |
| 4. exhaustar runas para Energía | no | — | no |
| 5. Sacrifice; su costo adicional mata a Ekko | no | — | no |
| 6. Deathknell de Ekko: `Recycle me to ready your runes` | sí, 1 carta (Ekko) | Main Deck (416.1.a) | **SÍ — disparo 2** |
| 7. Sacrifice resuelve: draw 2, **channel** 1 runa exhausta | no (channel ≠ recycle) | — | no |
| 8. rejugar Forge (2 Energy) → 1 Recruit token en la base | no | — | no |

**Dos disparos por pasada, ni uno más.** Tres detalles que hay que dejar escritos porque cada uno pudo
haber cambiado el número:

- **El paso 1 es UN disparo, no tres.** Karma lee *"one or more cards"*: el evento de reciclado es uno
  solo aunque mueva tres cartas (416.5 confirma que las varias cartas van al fondo *simultáneamente*, en
  orden aleatorio — un solo movimiento).
- **La runa del paso 2 no cuenta**, y es exactamente lo que el recordatorio de Karma anuncia (*"Runes
  aren't cards"*). 416.1.b y 161.2.b lo dicen dos veces: la runa reciclada vuelve al **Rune Deck**.
- **El reciclado de Ekko sale del trash y sigue contando.** 808.1.d.2 pone el trigger en la chain antes
  de que Ekko llegue al trash, pero el Deathknell resuelve con Ekko ya ahí; 416.1 define el reciclado
  sobre *"a specific zone"* cualquiera y 416.1.a lo manda al Main Deck igual.

El reciclado del Forge es el **efecto** de una Activated Ability (377.1: el `:` separa costo `Kill this`
de efecto `Recycle up to 4…`), y el de Ekko es parte del efecto de un Deathknell (808.1.c). A Karma le
da lo mismo: su condición no distingue costo de efecto.

**Un cuarto disparo que no está en el loop:** el propio `[Vision]` de Karma. 817.1.c pone el trigger *"the
permanent entering the Board"*, así que Karma ya está en mesa cuando el predict resuelve; si elige
reciclar la carta de arriba (436.1), eso es un reciclado al Main Deck y **su propia segunda habilidad se
dispara**, buffeándola a M7 al entrar. Es un one-off previo al loop, no un recurso. Y si el Main Deck ya
está vacío, 436.4.a y 431.1.c garantizan que no hay Burn Out: se predice "as many as possible", cero.

---

## 3. La aritmética, y por qué 702.3 la reescribe

La caza describía el resultado como *"el ejército de Recruits termina, en algún número finito de pasadas,
enteramente buffeado a +1 Might cada uno"*. Eso es correcto, pero la lectura tentadora — dos buffs por
pasada, pasadas ilimitadas, luego Might ilimitado — está muerta antes de empezar:

> **702.3.** "There can only be one Buff on a Unit at a time."
> **702.3.a.** "If a Buff is added, or instructed to be added, on a Unit that already has a Buff, it is
> not placed instead."

Y **703**: *"Each Buff individually contributes +1 Might to a Unit."* Un cuerpo buffeado vale +1 y nada
más, para siempre.

**Cuerpos nuevos por pasada: exactamente 1.** El paso 8 rejuega el Forge, cuyo trigger de play hace *un*
Recruit token. El paso 1 mata ese mismo Forge en la pasada siguiente. No hay segunda fuente de cuerpos
dentro de la pasada — se revisaron las tres que el shell Mind/Order tiene a mano y ninguna sirve:

- `OGN-265 Herald of the Arcane` (legend Mind/Order) — *":rb_energy_1:, :rb_exhaust:: Play a 1
  :rb_might: Recruit unit token."* Lleva exhaust, y 315.1.b la readea recién en el Awaken siguiente: **1
  cuerpo por TURNO**, no por pasada.
- `UNL-199 Deceiver` (legend Mind/Order) — su Reflection pide conquer/hold, un discard y su propio
  exhaust: 1 por turno como mucho.
- `SFD-201 Chem-Baroness` (legend Mind/Order) — su token de Oro es **gear**, y 702 pone los buffs sobre
  **Units**.

Y la segunda pasada del shell, `lux-infinite-power` (INFINITE, verificada), es peor para esto: su paso 2
mata el Forge para reciclar Forge + Retreat — **un** disparo de Karma — y no crea ningún token.

**Por lo tanto: 2 intentos de buff por pasada, 1 cuerpo nuevo por pasada, 1 buff colocado y 1 descartado
por 702.3.a.** El excedente es estructural, no un accidente de secuenciación: no se arregla con más
Karmas (dos Karmas dan 4 intentos contra el mismo cuerpo único) y por eso la entrada declara
`quantity: 1` pese a que 103.2.b permite tres.

**El desfase de una pasada.** Los dos disparos de una pasada (pasos 1 y 6) ocurren **antes** del paso 8,
que es el que crea el Recruit de esa pasada. Así que el Recruit nacido en la pasada *k* recibe su buff en
el disparo 1 de la pasada *k+1*. Tras N pasadas completas hay N Recruits y **N−1** buffeados; el último
queda en 1 Might hasta que se haga un paso 1 más (activar el Forge, reciclar del trash, cobrar el
disparo) — gratis, porque el Forge está en mesa al terminar el paso 8.

**Producto honesto de la entrada:** *cada Recruit que el loop fabrica sale a 2 Might en vez de 1, sin
tope de cantidad*, más Karma misma a M7 una vez. No es Might acumulativo y no es un recurso gastable.

### 3.1 ¿Se puede reciclar el buff sobrante? No, no en dominio

Si existiera un gastador de buffs repetible desde el tablero, el segundo disparo dejaría de perderse
(702.2.b: gastar quita el counter, y el cuerpo vuelve a ser buffeable). Se leyó la lista entera de
`grep -in "spend.*buff\|buff.*spend"` sobre el corpus — 14 filas — y **ninguna sirve bajo una leyenda
Mind/Order**:

| carta | dominio | por qué no |
|---|---|---|
| `OGN-146 Wallop`, `OGN-147 Wildclaw Shaman`, `OGN-150 Kraken Hunter`, `OGN-153 Overt Operation`, `OGN-157 Udyr Wildman`, `OGN-164 Sett Brawler`, `SFD-101 Fae Dragon` | Body | fuera de identidad (103.1.b.1) |
| `OGN-269 The Boss` | Body/Order (**legend**) | una leyenda es la leyenda: no se puede llevar además de una Mind/Order |
| `UNL-201 Voidreaver` | Body/Chaos (legend) | ídem |
| `UNL-102 Crowd Favorite` (Body), `UNL-162 Enthralling Protector` (Order) | — | gastan XP para buffarse **a sí mismas**: 702.3 las tapa en el primer buff |
| `OGN-207 Call to Glory` | **Order** | sirve — pero es un spell, y el ledger del loop tiene **0 draws libres** por pasada (`docs/phase0/walks/2026-09-04-loop-budget-ledger.md`): meterlo en el ciclo cuesta una carta reciclada y su draw |
| `OGN-230 Albus Ferros` | **Order** | *"When you play me, spend any number of buffs. For each buff spent, channel 1 rune exhausted."* — es un `when you play`, un solo disparo por copia jugada, y rejugarlo por pasada tiene el mismo costo de draw |
| `OGN-282 Monastery of Hirana` | Colorless (battlefield) | *"When you conquer here, you may spend a buff to draw 1."* — uno por conquer, no por pasada, y 485.4.a lo hace aleatorio |

Las dos filas Order que "sirven" (Call to Glory, Albus Ferros) chocan con la pared del ledger, no con una
regla: no son refutaciones, son entradas distintas que habría que caminar con su propio presupuesto de
draws. Quedan anotadas, no autoradas.

---

## 4. Las trampas de autoría, una por una

Se recorrió la lista de `CLAUDE.md` § Combos entera contra esta entrada:

1. **"Entrar a un battlefield enemigo vacío no es un ataque"** — la entrada no ataca ni conquista. No aplica.
2. **"La Energía añadida en Awaken o en la Beginning Phase se pierde al empezar la Main Phase (167)"** — la entrada no añade recursos. No aplica.
3. **"Un Repeat no da ventana para re-exhaustar (429.3, R21)"** — no hay `[Repeat]`. No aplica.
4. **"Los tokens Temporary mueren antes del Scoring (816.1.b)"** — **aplica y está resuelta por la entrada base**: `lux-infinite-energy` apunta Shadow's Call a **Ekko**, nunca a un Recruit, y Sacrifice mata a Ekko con la marca puesta. Los Recruits nunca reciben `[Temporary]`, así que sobreviven entre turnos y sus buffs con ellos (705 sólo los quita si el cuerpo deja el tablero). Karma tampoco recibe la marca.
5. **"Los tokens de Oro entran exhaustos salvo Renata Industrialist (R25)"** — no hay Oro. No aplica.
6. **"Reciclar una runa por Power la manda al Rune Deck (161.2.b)"** — **aplica, y es el corazón de la sección 2**: por eso el paso 2 no dispara a Karma.
7. **"Un recall no es un move (456) y no cambia estado (458)"** — no hay recalls. No aplica.
8. **"Un escudo heal/exhaust/recall borra el Deathknell (808.1.d.1)"** — **aplica en negativo y hay que decirlo**: si alguna vez se agrega `OGN-269 The Boss` a este shell para gastar buffs, su reemplazo (*"heal it, exhaust it, and recall it instead"*) sobre un cuerpo buffeado **apagaría el Deathknell de Ekko** y el loop moriría. The Boss ya está fuera por ser leyenda; queda anotado igual.
9. **"Un token nunca llega al trash (185, 186.1, 416.1)"** — **aplica**: ningún Recruit es combustible de reciclado, y la entrada no lo pretende. Los reciclados que disparan a Karma son cartas (Forge, Shadow's Call, Sacrifice, Ekko), las cuatro cartas de verdad.
10. **"Un Recall viene de cualquier lado (455)"** — no aplica.
11. **"709 es un evento, no un estado"** — **aplica y cierra una lectura tentadora**: un Recruit de 1 Might buffeado queda en 2, muy lejos de los 5 de 708, así que ningún buff de Karma hace que nada *"becomes Mighty"*. Y a la inversa: `UNL-173 Sacrifice` pide matar un `[Mighty]` friendly; Karma es M6 (M7 buffeada) y por lo tanto es combustible legal de Sacrifice — hay que elegir a Ekko, no a ella, en cada pasada. Es una elección del costo, no una restricción de reglas, pero es la única manera de que la entrada se rompa por error humano.
12. **"Buffear es CHOOSING (702.2.a)"** — **aplica**: el buff de Karma elige. En este shell no hay `Blade Dancer` ni `Irelia Fervent` (Body los dos) que se disparen con eso, pero la elección es obligatoria: *"buff a friendly unit"* no lleva `you may`, y siempre hay al menos un candidato legal (la propia Karma), así que 055 nunca entra en juego. Cuando todos los amigos ya están buffeados, se elige igual y 702.3.a simplemente no coloca el counter.
13. **"103.1.b.1 antes de meter una carta en un shell existente"** — **aplica, sección 5**.

---

## 5. Dominio

`OGN-235 Karma, Channeler` tiene un solo dominio, **Order**. 103.1.b.3: *"If a card has a single Domain,
then that card is permitted in the Domain Identity that corresponds to the same Domain."*
`lux-infinite-energy` exige que la leyenda cubra Mind y Order, y las cuatro leyendas Mind/Order del pool
son las únicas que lo hacen:

```
OGN-265 | Herald of the Arcane      | Legend | Mind/Order
OGS-021 | Lady of Luminosity - Starter | Legend | Mind/Order
SFD-201 | Chem-Baroness             | Legend | Mind/Order
UNL-199 | Deceiver                  | Legend | Mind/Order
```

Order ⊆ {Mind, Order} en las cuatro. **Karma entra sin tocar la identidad del mazo.** No hay refutación
por dominio.

Costo: E6 + 1 Order Power, pagados **una vez**, antes de que el loop arranque. No es un costo por pasada.

---

## 6. Interferencia con el loop: ninguna

El trigger de Karma es un Triggered Ability que va a la chain apenas se cumple la condición (383.3.c) y
resuelve colocando un counter. En el paso 6 la chain tiene a Sacrifice todavía pendiente; el trigger de
Karma es más nuevo y 340.1 lo resuelve primero. No mueve cartas, no toca zonas, no gasta recursos:
Sacrifice resuelve después exactamente igual (draw 2, channel 1 runa). Y 704.1 (*"Buffs are counters, and
thus are not targeted"*) hace que nada del trigger pueda mistargetear.

**Ledger de draws.** Karma vive en el tablero (`zone: BOARD`), no en el mazo ni en la mano, así que **no
consume ninguno de los 4 draws por pasada** ni ocupa uno de los slots de reciclado del Forge. Las 4
cartas que vuelven por pasada siguen siendo Forge, Shadow's Call, Sacrifice y Ekko, contra 4 draws (2 de
Shadow's Call + 2 de Sacrifice). El balance del ledger de #21 queda intacto. Lo único que Karma cambia en
la fase previa es que hay una carta más que hay que sacar del Main Deck antes de vaciarlo — y hay que
**jugarla**, no sólo robarla: en la mano no hace nada.

---

## 7. Veredicto

`karma-lux-recycle-buff-army` entra como **ENGINE `verified`**, con la aritmética corregida:

- **2 disparos de Karma por pasada** (Forge y Deathknell de Ekko), no 3 — la runa del paso 2 va al Rune
  Deck.
- **1 buff colocado por pasada**, no 2 — 702.3 / 702.3.a, y el cuello es el cuerpo nuevo, no el trigger.
- **Producto: Recruits de 2 Might sin tope de cantidad**, con un desfase de una pasada; no hay Might
  acumulativo y no hay conversión a puntos.

No es INFINITE: el loop que sí lo es ya está catalogado (`lux-infinite-energy`) y esta entrada es un
rider sobre él, exactamente la forma de `azir-sovereign-token-gather`. No es BURST ni ALT_WIN: nada aquí
puntúa. No hay lectura de reglas nueva que archivar — las tres que la entrada pudo necesitar (702.3,
416.1.b, 436.4.a) están escritas en el reglamento.

---

## 8. Lo que NO se caminó, y por qué

### 8.1 La forma de SINERGIA de `[Hunt]` — para `synergies.json`, no para el catálogo

#106 registró que las 12 cartas `[Hunt]` sin combo repiten sin cambios el patrón que
`gromp-arena-svellsongur-xp` ya explota sobre `UNL-100 Voracious Gromp`: **823.1.b** hace que Hunt sea a
la vez Conquer Effect y Hold Effect, así que Reckoner's Arena lo cobra dos veces en un Hold. Eso es un
patrón — un `anchor` (la Arena) más un predicado sobre el pool — no doce combos. **No se camina acá.**
Queda para un `syn6`: la regla ya está verificada por el walk de #45 y `basis.combos` sería
`gromp-arena-svellsongur-xp`.

**Corrección de medición para quien la escriba:** la keyword se imprime en tres formas — `[Hunt]`,
`[Hunt 2]` y `[Hunt 3]` — así que `grep '\[Hunt\]'` devuelve **7** filas y no las 13 cartas de la tabla
de #106. El predicado tiene que abrir con `\[Hunt` (o con la prosa `When I conquer or hold, gain`), que es
la misma lección que ya está en `CLAUDE.md`: *"A keyword lens opens with `grep -i <word>`, never with
`[Keyword]`."*

### 8.2 Dos gastadores de buffs Order que chocan contra el ledger, no contra una regla

`OGN-207 Call to Glory` y `OGN-230 Albus Ferros` (§3.1) convertirían el buff sobrante en algo — un
Reaction gratis y runas canalizadas respectivamente — y son legales en Mind/Order. Los dos exigen una
carta más ciclando por pasada, y el ledger tiene 0 draws libres. Es una entrada futura con su propio
presupuesto, no una parte de ésta.

### 8.3 `OGN-240 Sett, Kingpin`

Order, E4 P1 M5, `[Tank]`, *"I get +1 :rb_might: for each buffed friendly unit at my battlefield."* Con
Karma buffeando cada Recruit, Sett escala con el ejército. Pero llevar los Recruits al battlefield es el
cuello de botella medido en #48 (sólo `SFD-177 Azir, Sovereign` los mueve en masa, y Azir necesita
guarnición enemiga), y #97 ya midió que el tamaño de Might no se convierte en puntos en dominio
Mind/Order. Es una caminata propia, no un apéndice de ésta.
