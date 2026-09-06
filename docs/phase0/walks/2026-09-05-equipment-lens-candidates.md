# Hand walk — las 5 candidatas de la lente de equipo ([Equip] / tag Equipment), issue #41

Fecha: 2026-09-05. Core Rules `data/Riftbound-Core-Rules-2026-07-16.txt`.
Texto de carta: `data/corpus_flat.txt` (935 cartas, gallery API 2026-09-04, errata aplicada).
Sesión: `rc-walk41`.

**Resultado: 4 de 5 verified, 1 refutada. 2 de las 4 reescritas** (candidatas 2 y 4).
**Ninguna resultó INFINITE**, y el veredicto estructural B de #41 se vuelve a medir abajo en vez de
heredarse.

Además de las cinco, este walk aplica **una corrección diagnosticada y nunca aplicada** que estaba
dentro de dos entradas ya `verified`: la nota de `skyfall-ahri-conquer` seguía llamando UNRESOLVED a
una pregunta que R6 = A contestó el 2026-09-04, y el segundo `notable` de `svellsongur-copy-hold`
seguía publicando el número pre-R6 (K=3, 9 puntos) que sus propios `steps` y `notes` contradicen
(K=4, 11 puntos). Bloque 3.

---

## Bloque 0 — cada regla que estas entradas citan, abierta y pegada

Se hizo primero y en bloque, antes de mirar ninguna candidata. Ninguna cita de #41 se dio por buena.

### Attach: qué texto termina en la unidad

- **434.1.c** — *"The Top-Most card has all Effect Text of all cards Attached to it appended to its
  Rules Text."* → CONFIRMADA palabra por palabra (línea 4576).
- **136.2.c** — *"The abilities in the Effect Text section of a card are appended to the Rules Text of
  the card to which the card with the Effect Text is Attached."* (línea 760).
- **718.3** — *"While in this state, Abilities in the card's Effect Text are appended to the Rules Text
  of the Top-Most Card."* (línea 6016).
- **434.1.e** — *"Attaching one or more cards will cause those cards' **printed** Rules Text to become
  Inactive for as long as they remain Attached."*
- **718.2** — *"While in this state, the card's **printed** Rules Text is Inactive."*
- **136.2.d** — *"Effect Text may refer to \"this\" or to the name of the Attached game object that
  appended the Effect Text. Doing so refers to the Attached game object and not the Top-Most Card,
  even if the Top-Most Card shares a name with the Attached game object."* Los dos ejemplos del propio
  reglamento son Guardian Angel (*"If I would die, kill Guardian Angel instead. Heal me, exhaust me,
  and recall me."*) y Brutalizer. → *"this"* y el nombre son el gear; *"I"/"me"* son la unidad.
- **136.2.b** — *"Effect Text is inactive unless the card with the Effect Text is Attached to another
  card."* Y **724** — *"Effect Text is Inactive unless the card with the Effect Text is Attached."*
- **434.1.b.1** — *"In the situation where there is more than one card attached to the Top-Most card,
  they should be stacked in such a way that all Effect Text boxes and Might Bonuses are readable. The
  order of the Attached cards has no bearing on the application of effects."* → cuatro Equipment sobre
  un cuerpo es legal, y el orden físico no cambia nada.
- **434.1.d / 718.4** — el Might Bonus de cada Attached modula el Might del Top-Most.
- **434.1.f** — *"Attaching a card to a new Top-Most Card will cause it to Detach from the card to
  which it is currently Attached."*  **434.1.g** — *"Attaching a card to its current Top-Most Card will
  not have any effect."*
- **718.5.a** — *"Attached cards still have all Types and Tags while Attached."* → un Equipment
  attacheado sigue contando como Equipment para *"each Equipment you control"*.
- **718.5.d** — *"A card may be Attached only to a single Top-Most card at a time."*
- **725.1** — *"If an Attached card has a Passive or Replacement ability that applies during the process
  of Attaching or a Triggered ability that triggers off of Attaching, that text exists and can be
  processed as it Attaches."* → **ésta es la regla que hace existir a Svellsongur**: su cláusula está
  en Rules Text, no en Effect Text (el corpus no le pone marcador `[Effect]`), y 718.2 apaga el Rules
  Text impreso de lo attacheado. 725.1 es la excepción exacta.
- **721.1 / 721.2 / 722.1** — qué significa Inactive y qué sobrevive de ello.

### Equip

- **818.1.a** — *"Equip is present on Gear with the tag Equipment."*
- **818.1.b** — *"Equip has a cost to activate and Attaches the card with Equip to a chosen Unit when
  the cost is paid."*  **818.1.b.1** — *"Equip's choice is a Target."*
- **818.1.c.2** — *"Equip is functionally short for \"[Cost]: Attach this gear to a unit you control.\""*
- **818.2.a** — *"This is an event other Game Effects and Triggered Abilities can reference."*
- **818.4** — *"Multiple instances of Equip are equivalent to multiple Activated Abilities and can each
  be activated separately by paying the corresponding costs."* → CONFIRMADA como la cita #41; sin
  exhaust y sin tope por turno en el keyword mismo.

### Score, Hold y puntos por habilidad

- **469.1** — *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn."*
- **469.2** — *"Hold: A player maintains Control of a Battlefield they did not yet Score this turn
  during their Beginning Phase."*
- **470** — *"A player may only Score, from either method, once per Battlefield per turn."*
- **471.1.a.1** — *"Notably, points Gained from sources that are not Conquer are not beholden to these
  restrictions."*
- **471.2.b** — *"Hold abilities trigger at a Battlefield that was Held."*  **471.2.c** — *"These will
  only trigger when the Battlefield is Scored; I.E. These cannot be triggered more than once per turn
  for a player."*
- **383.4.d.2.a** — *"The Hold Abilities of Units are put on the Chain as Pending Items after the Unit
  these effects correspond to are present at a Battlefield when a player maintains control of it and
  Gains 1 Victory Point during their Beginning Phase from Holding."*
- **194.1.c** — *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or
  more points."* → la base de **R2 = A**.
- **194.3** — *"The Victory Score is 8 points by default."*, **485.3** — *"Victory Score: 8"* en Duelo.
- **472** — *"When a cleanup occurs and a player has accrued Points greater than or equal to the
  Victory Score for their Mode of Play, and if they have more points than any opponent, they Win the
  Game."*  **195** — *"A player also wins the game if an effect instructs them to do so."*
- **315.2.b.2** — el Scoring Step: *"The Turn Player Holds all Battlefields they Control."*

### Conquer, showdown y control

- **190.1** — *"Control is established over Battlefields through the course of play."*
- **190.3.a.1** — *"Units moving to or being played to a battlefield apply Contested status if that
  battlefield is not already Contested and that Unit's controller does not already control that
  battlefield."* → **entrar a un battlefield que YA controlás no aplica Contested**. Es la regla sobre
  la que se para el reordenamiento de la candidata 2.
- **344.2** — *"If Control of a Battlefield is Contested, there aren't units controlled by different
  players there, and the turn is in a Neutral Open State, a Showdown is opened during the next
  Cleanup."*
- **348.2.a** — *"If only one player's Units remain at the Battlefield, and if that player does not
  already Control the Battlefield, that player establishes Control over the Battlefield."*
  **348.2.a.1** — *"This results in a Conquer if that player has not yet scored that Battlefield this
  turn."*
- **466.5** — *"If no Showdown or Combat is staged at this location, the player with Units remaining
  here Establishes Control if they didn't already control this Battlefield."*

### Jugar, mover y crear cuerpos

- **355.2** — *"For Units, choose a valid Location where that Unit will enter upon being Played."*
  **355.2.a** — *"By default, Valid locations include the controller's Base or a Battlefield the
  controller controls."*  **355.2.b** — *"Some Game Effects may grant players permission to play Units
  to locations that are not normally Valid."*
- **439.2.b.1** — *"Permanents will be Created at any location on the Board that they can be played
  to."*  **439.2.c** — *"The zone a Game Object is created to can be specified implicitly by the Game
  Action being performed."*
- **359.3.f.1** — *"Some information used by abilities is referenced from the source of those abilities
  ... This can usually be recognized by the presence of words like \"here,\" \"my,\" or \"its.\""*
  **359.3.f.2** — *"Information referenced in an instruction in this way will be checked on execution
  of the instruction."*
- **144.1.a** — *"This action can be done any time during a player's Main Phase."*  **144.2** —
  *"Exhausting the Unit is the Cost for this action."*
- **143.4** — *"Units enter the Board exhausted."*
- **187.1** — *"A 1 [M] Recruit token is a domainless unit token with 1 Might and the Recruit tag."*
  **187.3** — *"A 2 [M] Sand Soldier token is a domainless unit token with 2 Might and the Shurima
  tag."* → **ninguno de los dos lleva [Temporary]** (187.2 lo dice explícitamente para el Sprite, y no
  lo dice para éstos), así que 816.1.b no los toca.
- **142.4.b** — *"Lethal Damage for a Unit is a non-zero amount greater than or equal to that Unit's
  Might."*

### Runas, Energía y reciclado

- **161.2.a** — *"Exactly 12 Rune cards chosen during Deck Construction."*
  **161.2.b** — *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck."*
- **430.1** — *"Channeling is the action of taking one or more Runes from the top of a player's Rune
  Deck and putting them on the board."*
- **430.2** — el ejemplo del propio reglamento es literalmente *"Channel 1 rune exhausted."*, y
  **430.2.a** — *"By default, runes are channeled readied."*
- **430.3** — *"If there aren't sufficient runes in the Rune Deck, channel as many as possible."*
  → **el techo duro de la candidata 4.**
- **430.4.a / 315.3.b** — *"A player Channels two Runes during the Channel Phase on their turn."*
- **315.1.b** — *"The Turn Player readies all Game Objects they control that are able to be readied."*
- **167** — *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of
  each player's turn."*  **167.1** — *"Any unspent Energy or Power are lost."*
- **416.1** — *"Recycling cards is the action in which a player takes one or more cards from a specific
  zone and then puts it on the bottom of the corresponding deck."*

### Battlefields y deckbuilding

- **485.4.a** — *"Each player provides three (3) Battlefields, included in their deck during deck
  building. Only 1 will be used, chosen during setup."*
- **485.5** (Duelo) y **487.5** (Skirmish) — *"randomly selects"*; **486.5** (Match) — sólo *"selects"*.
- **103.4.c** — *"Cannot include more than one of a Battlefield of the same name when there are more
  than one required for the deck."*  Y Tournament Rules 402.1.
- **103.1.b.2** — *"Your deck's Domain Identity is dictated by the domains of your Champion Legend."*
- **103.2.b** — *"Your Main Deck can include up to 3 copies of the same named card."*

### Chequeo de bans

Las 12 líneas con marcador `[BANNED` de `data/corpus_flat.txt` están enumeradas y ninguna es de estas
entradas. Corridas una por una, las 14 cartas citadas por #41 salen limpias:

```
clean: OGN-066 SFD-115 SFD-059 SFD-193 SFD-153 OGN-293 SFD-150
clean: SFD-118 UNL-029 SFD-198 SFD-033 UNL-039 SFD-030 SFD-051
```

Más las que este walk agrega: `OGN-222 Noxian Drummer`, limpia. La única carta de la lente con
marcador es **`OGS-019 Wuju Bladesman - Starter`, `[BANNED 2v2:restricted]`**, y por eso no se nombra
como leyenda de la candidata 1: hay tres Calm/Body limpias (Grandmaster at Arms, Blind Monk, Wuju
Master).

### Las cinco trampas de autoría, corridas contra las cinco

Abiertas en `CLAUDE.md`, no de memoria.

1. **Battlefield vacío no es un ataque** (807.1.d, 383.4.e, 461). Ninguna de las cinco necesita la
   designación de Attacker: la 1 es un Hold, la 2 y la 5 son un Hold del Plaza, la 4 es un Conquer por
   showdown (348.2.a, sin combate), la 3 quedó refutada.
2. **167**: nada de estas entradas añade Energía en Awaken ni en la Beginning Phase para gastarla en la
   Main Phase. En la candidata 3 la trampa sí muerde y es parte de su refutación.
3. **429.3 / R21, el Repeat**: ninguna de las cinco usa `[Repeat]`.
4. **816.1.b, [Temporary]**: 187.1 y 187.3 confirman que ni el Recruit ni el Sand Soldier lo llevan.
5. **456 / 161.2.b, recall y runa reciclada**: no hay recall en ninguna. La candidata 4 sí toca
   161.2.b, y a favor: reciclar una runa por Power la devuelve al Rune Deck, que es de dónde
   Boneshiver channelea. Está contabilizado abajo.

---

## Bloque 1 — el hallazgo estructural de #41, abierto y medido

#41 afirma que Svellsongur copia el Rules Text de la unidad **incluyendo el Effect Text de los otros
Equipment attacheados**, y que eso *"no necesita lectura nueva"*.

**El argumento de texto se sostiene.** 434.1.c dice *"its Rules Text"* sin calificador, mientras
434.1.e y 718.2 escriben *"printed"* justo cuando quieren decir impreso. Svellsongur dice *"that
unit's text"*, también sin calificador.

**Pero la parte que importa es que esto no es nuevo: el catálogo ya se para en ello.** El paso 3 de
`svellsongur-copy-hold`, `verified` desde el 2026-09-04, dice literalmente:

> *"Attach Svellsongur C to the same Sentinel. Under R6 = A it copies the Sentinel's CURRENT text,
> which already carries B's copy, so it adds two more: K = 4."*

La copia de B vive en el **Effect Text de B**, y llega al Rules Text del Sentinel por 434.1.c / 718.3.
O sea: C copia texto que le llegó a la unidad desde OTRO Equipment. Es exactamente el paso que #41
presenta como hallazgo. **R6 = A ya lo ruleó** y una entrada verificada ya lo usa. No se archiva
lectura nueva, y las candidatas 1 y 2 no introducen ningún paso que el catálogo no haya dado.

Lo que sí encontré es que **`skyfall-ahri-conquer` no se enteró**: su `notes` sigue diciendo
*"UNRESOLVED, and it is why this is a candidate: adding SFD-059 Svellsongur would raise the count, but
only if Svellsongur copies a unit's CURRENT rules text including appended Effect Text (434.1.c)"*.
Eso es una corrección diagnosticada y nunca aplicada. Bloque 3.

### La autorreferencia, y por qué las entradas de este walk la esquivan en vez de resolverla

Hay un problema real que #41 nombra de refilón (*"encadenado entre Svellsongurs — lo evité"*) y que
conviene dejar escrito, porque es la razón por la que estas entradas declaran **S = 1** y no S = 2.

Svellsongur attacheado a Ahri copia *"that unit's text"* al Effect Text de Svellsongur, y ese Effect
Text vuelve al Rules Text de Ahri por 434.1.c. Si la copia se incluyera a sí misma, la lectura no
converge. `svellsongur-copy-hold` ya resolvió eso por la vía obvia en su paso 1 (A copia sólo la
línea impresa de Ahri: N = 2, no un número indefinido): **una copia no se incluye a sí misma.** Con
S = 1 eso alcanza y el número queda cerrado.

Con **S = 2 sobre el mismo cuerpo** aparece la recursión mutua: B copiaría la copia de C y C la de B.
El catálogo la resuelve por orden de attach (B copia lo que había antes de C; C copia lo que había
después de B), que es lo que hace `svellsongur-copy-hold`. Ese tratamiento está ruleado y no lo
relitigo, **pero ninguna entrada nueva de este walk se para en él**: las dos que usan Svellsongur
declaran S = 1.

Y hay una segunda razón por la que la candidata 1 no depende de nada de esto: **si los Trinity Force
se attachean ANTES y Svellsongur último**, el número es el mismo bajo las dos lecturas posibles.
Bajo la lectura literal de 725.1 (*"can be processed as it Attaches"*) Svellsongur mide el texto de
Ahri en el instante en que entra: impreso + 3 Trinity Force = 4. Bajo R6 = A (continua, sin
autoinclusión) mide lo mismo: 4. **Ordenar el attach convierte una pregunta de reglas en una decisión
de juego**, que es exactamente lo que pide `CLAUDE.md` antes de archivar una lectura. Está escrito en
los `steps` de la entrada.

---

## Bloque 2 — el veredicto estructural B ("en esta lente no hay INFINITE"), medido de nuevo

#41 dice que no hay INFINITE y da una tabla. La volví a correr contra el corpus:

- **Un `[Equip]` que cueste 0**: no existe. El piso medido es 1 Power (`SFD-033`, `UNL-039`,
  `SFD-153`, `SFD-009`, `SFD-064`, `SFD-073`, `SFD-108`, `SFD-124`, `SFD-134`, todos E1 + 1 Power).
- **Un disparo por attach que devuelva más de lo que costó**: `SFD-119 Jax, Unrelenting` paga en
  cartas (*"When you attach an Equipment to me, you may pay :rb_energy_1: to draw 1"*), no en Power;
  `SFD-049 Aphelios, Exalted` trae su propio tope. Ninguno devuelve Power.
- **Multiplicadores de disparo en todo el pool**: el grep de *"trigger an additional time"* da
  **exactamente tres cartas** — `OGN-236 Karthus, Eternal` (sólo [Deathknell]), `UNL-029 Red
  Brambleback` (conquer) y `UNL-087 Blue Sentinel` (hold). Ninguno de los tres es un multiplicador de
  attach.

**Confirmado: la lente no da INFINITE.** Da un BURST, dos ALT_WIN y un ENGINE.

Un dato que sale de la misma medición y que vale para el catálogo entero: **las nueve BURST del
catálogo usan Blue Sentinel o Red Brambleback**, sin excepción. La candidata 1 es la primera que llega
a 8 sin ninguno de los dos, y la primera entrada BURST o ALT_WIN en identidad **Calm/Body** (la unión
de dominios de las 17 entradas BURST/ALT_WIN existentes no incluye ese par).

---

## Bloque 3 — las cinco, una por una

### 1. `ahri-trinity-svellsongur-hold` — BURST — **VERIFIED**

Texto verbatim, grepeado:

```
OGN-066 | Ahri, Alluring | Unit | Calm | E5 P1 M4 | When I hold, you score 1 point. [Tags: Ahri, Ionia]
SFD-115 | Trinity Force | Gear | Body | E4 M+2 | [Equip] :rb_rune_body: (...) [Effect] When I hold, score 1 point. [Tags: Equipment]
SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] :rb_energy_1::rb_rune_calm: (...) As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it. [Tags: Equipment]
```

**Cadena de existencia.** Svellsongur no lleva marcador `[Effect]`: su cláusula está en Rules Text, y
718.2 apaga el Rules Text impreso de lo attacheado. La excepción es **725.1**, que es exactamente
*"a Passive ... that applies during the process of Attaching"*. Es la misma cadena que ya sostiene a
`svellsongur-copy-hold`.

**Cadena de texto.** Cada Trinity Force appendea *"When I hold, score 1 point"* al Rules Text de Ahri
(434.1.c, 136.2.c, 718.3), y 136.2.d hace que ese *"I"* sea Ahri, con Guardian Angel y Brutalizer como
ejemplos trabajados del propio reglamento. Svellsongur copia el texto de Ahri, que es impreso + los
tres appendeados.

**Aritmética, con las cantidades que la entrada declara (T = 3, S = 1):**

```
instancias de "score 1 point" sobre Ahri = (1 + T) x (1 + S) = 4 x 2 = 8
puntos en el Hold = 1 (el Victory Point de 469.2 / 471.1) + 8 = 9  >= 8   ✓
```

Vecinos, para que quede escrito: T=3,S=0 → 5 (no llega). T=2,S=1 → 7 (no llega). **T=3,S=1 → 9.**
La declarada es la mínima que cierra, y cierra desde 0 puntos.

**Independiente de la lectura de copia.** Los `steps` fijan el orden: los tres Trinity Force primero,
Svellsongur último. Bajo 725.1 literal y bajo R6 = A el número es el mismo (bloque 1).

**Coste**: Ahri E5 P1; 3 Trinity Force E4 = 12 Energy + 3 Power de Body para attachear; Svellsongur E3
P1 más E1 + 1 Power de Calm. **21 Energy y 6 Power**, repartidos en varios turnos. El turno del Hold no
cuesta nada. Ahri queda en 4 + 2+2+2 + 0 = **10 Might**.

**No nombra battlefield**, así que 485.4.a / 485.5 / 103.4.c no la tocan — es su ventaja real contra
los remates de Grand Plaza del catálogo.

**Leyenda**: Calm/Body. Las limpias son `SFD-193 Grandmaster at Arms` (y su `:rb_exhaust:` reattachea
gratis mientras montás el board), `OGN-257 Blind Monk` y `UNL-191 Wuju Master`. `OGS-019` queda fuera
por `restricted` en 2v2.

**Depende de R2 = A** y **no depende de R1** (no hay Sentinel ni Brambleback en la identidad).
**Punto único de falla**: cuatro Equipment sobre un cuerpo. 435.4.b deja los Equipment en la locación
cuando el portador se va. `SFD-051 Guardian Angel` (Calm, E2 M+1) es el seguro dentro de la identidad.

**VERIFIED tal como la declaró #41.** Ni un número cambió.

---

### 2. `noxian-drummer-eye-svellsongur-plaza` — ALT_WIN — **VERIFIED (reescrita)**

#41 la llamó `eye-svellsongur-plaza-recruits`. Se reescribió por **tres defectos**, dos de ellos
graves.

**Defecto 1 — el `uses` no tenía cuerpo.** Listaba 3 Eye of the Herald, 2 Svellsongur y el Plaza, y
ningún Equipment se attachea al aire (818.1.b: *"Attaches the card with Equip to a chosen Unit"*). La
entrada no era jugable como estaba escrita.

**Defecto 2 — los Recruits nacían en un battlefield que no controlás.** #41 hace que el portador entre
al Plaza y que los Eyes disparen en ese mismo movimiento. Pero 355.2.a limita las locaciones válidas
a *"the controller's Base or a Battlefield the controller controls"*, y por 190.3.a.1 entrar a un
battlefield que no controlás aplica Contested — o sea, en ese instante no lo controlás. Que el *"here"*
del Eye cuente como el permiso de 355.2.b es **una lectura**, y el catálogo evita justamente ésa: el
REFUTE de `grand-plaza-recruit-vanguard` dice *"the Plaza must already be yours"*, y
`zed-clone-eye-recruits` pone a Zed *"at The Grand Plaza after conquering it"*.

**Hay un orden legal que la borra, y es el mismo turno.** Un cuerpo barato entra al Plaza vacío →
190.3.a.1 aplica Contested → 344.2 abre el Showdown en el siguiente Cleanup → 348.2.a: sólo quedan tus
unidades, establecés Control → 348.2.a.1: *"This results in a Conquer"*. Ahora el Plaza es tuyo, en tu
propia Main Phase. **Recién ahí** el portador cargado hace su Standard Move desde tu base al Plaza
(144.1.a, 144.2): por 190.3.a.1 no aplica Contested, y los Recruits nacen en un battlefield que
controlás, por default de 355.2.a. Cero lecturas.

**Defecto 3 — S = 2 apoyaba la entrada en la recursión mutua entre Svellsongurs** (bloque 1). Se baja
a S = 1, y para no perder cuerpos el portador pasa a ser una unidad que **ya trae el disparo impreso**:

```
OGN-222 | Noxian Drummer | Unit | Order | E3 M3 | When I move to a battlefield, play a 1 :rb_might: Recruit unit token here. (It is also at the battlefield.) [Tags: Trifarian, Noxus]
SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] :rb_rune_order: (...) [Effect] When I move, play a 1 :rb_might: Recruit unit token here. [Tags: Equipment]
```

**Aritmética (T = 3 Eye, S = 1 Svellsongur, portador con disparo impreso):**

```
instancias de "when I move -> Recruit here" = (1 + T) x (1 + S) = 4 x 2 = 8
un Standard Move -> 8 Recruits en el Plaza + el propio Drummer + el cuerpo que conquistó = 10 unidades
la barra de OGN-293 es 7  ->  margen de 3
```

Contra los 6 Recruits + portador = 7 justos que daba la versión de #41 con S=1, y sin tocar la
recursión mutua que necesitaba su S=2.

**Coste**: Drummer E3; 3 Eye E1 = 3 Energy + 3 Power de Order; Svellsongur E3 P1 más E1 + 1 Power de
Calm. **10 Energy y 5 Power**, más el cuerpo barato que conquista el Plaza. Es la más barata de las
dos ALT_WIN de este walk.

**Reglas del remate**: los Recruits no son [Temporary] (187.1), entran exhausted (143.4) y eso da igual
para holdear; el *"if you have 7+ units here"* del Plaza es Condición y se mide **en el instante del
Hold** (383.2.a.1, 383.2.c), y las 10 unidades están paradas desde tu Main Phase anterior; 359.3.f.2
lee el *"here"* en la ejecución, y en la ejecución el Drummer está en el Plaza; 195 concede la victoria.

**Lo que la mata**: los Recruits son de 1 Might, y **`OGN-133 Flurry of Blades` (Body, E1, [Reaction],
*"Deal 1 to all units at battlefields"*)** es letal para los ocho por 142.4.b, por 1 de Energía. Hay que
sobrevivir un turno rival entero con eso en el pool. Va escrito en la entrada.

**Battlefield por formato**: random 1 de 3 en Duelo (485.5) y Skirmish (487.5), elegido en Match
(486.5), y 103.4.c + TR 402.1 prohíben llevar dos con el mismo nombre. Primer `notable`, como cerró #35.

**Leyenda**: Calm/Order — `SFD-247 Emperor of the Sands`, `OGN-261 Radiant Dawn`, `UNL-195 Green
Father`, `VEN-147 Eye of Twilight`. Ninguna con marcador de ban.

**Convive con `zed-clone-eye-recruits`** (Order/Chaos, 2 cuerpos por activación, bounded por runas de
Chaos): distinta identidad y distinto mecanismo — ésta resuelve en **un** movimiento.

---

### 3. `last-rites-svellsongur-recursion` — ENGINE — **REFUTADA**

```
SFD-150 | Last Rites | Gear | Chaos | E3 M+2 | [Equip] — :rb_rune_chaos:, Recycle 2 cards from your trash (Pay the cost: Attach this to a unit you control.) [Effect] When I conquer or hold, you may play a unit from your trash. (You still pay its costs.) [Tags: Equipment]
```

La cadena de texto funciona: 3 Last Rites × (1 + 2 Svellsongur) = **9 permisos** por conquer y otros 9
por hold. El problema no es la cadena, es que **el multiplicador multiplica lo que no era el cuello de
botella**, y eso se puede medir.

**1. Los 9 permisos son impagables, por aritmética del pool.** *"(You still pay its costs.)"*. En todo
el corpus hay **exactamente dos unidades de E1** (`UNL-111 Determined Sentry`, Body;
`VEN-043 Steel Paws`, Calm) y 65 de E2. En identidad Calm/Chaos la única E1 es Steel Paws, y 103.2.b
la topea en 3 copias. El piso absoluto de 9 replays es entonces `3 x E1 + 6 x E2 = 15 Energy`, en una
sola resolución. La Energía máxima disponible en una fase es el número de runas listas en mesa, y
**161.2.a fija el Rune Deck en 12 runas en total**. 15 > 12. **Los 9 permisos no se pueden pagar
nunca**, ni con la mesa perfecta.

**2. La mitad del payoff dispara con el Rune Pool vacío.** *"When I conquer or hold"*: el Hold ocurre en
el Scoring Step de la Beginning Phase (315.2.b.2), y por **167** el Rune Pool se vació al final de tu
turno anterior. Financiar un replay ahí obliga a exhaustear runas antes de tu Main Phase, y **167.1**
tira lo que no gastaste al empezarla. El motor no crea recursos: **re-temporiza los mismos**.

**3. El coste de montarlo se come el combustible.** El `[Equip]` de Last Rites es *"Recycle 2 cards from
your trash"*, y **416.1** las manda al fondo del Main Deck. Tres copias = **6 cartas fuera del trash**,
que es la única zona de la que el payoff lee. Con menos de 2 cartas en el trash el coste ni siquiera
se puede pagar.

**4. Y por lo tanto las cantidades declaradas no hacen trabajo.** Con la Energía realista de un
Conquer en tu Main Phase pagás 1 o 2 replays. Un solo Last Rites ya da 1 permiso; el segundo, el
tercero y los dos Svellsongur (6 Energy, 2 Power y 2 cartas más) compran permisos que no se pueden
financiar. La entrada no cumple la barra ENGINE del proyecto — *produce lo que dice* — con las
cantidades que declara.

**Existe una forma honesta y no es un combo**: 1 Last Rites + 1 Svellsongur = 2 permisos por evento de
scoring, pagables. Eso es una carta con un gear encima, no una línea que valga una entrada; el
catálogo ya tiene el patrón "Svellsongur duplica un Effect Text" en `svellsongur-copy-hold`,
`svellsongur-ornn-hold` y `guardian-passage-svellsongur`. **No entra al catálogo.**

---

### 4. `boneshiver-brambleback-channel` — ENGINE — **VERIFIED (reescrita)**

```
SFD-118 | Boneshiver | Gear | Body | E3 M+2 | [Equip] :rb_energy_1::rb_rune_body: (...) [Effect] When I conquer, channel 1 rune exhausted. [Tags: Equipment]
UNL-029 | Red Brambleback | Unit | Fury | E4 P1 M4 | [Accelerate] (...) Your conquer effects for conquering here trigger an additional time. When I conquer, [Buff] a friendly unit. (...) [Tags: Ionia]
```

**El defecto: los 9 channels que declara #41 no existen, y la regla que lo dice es la que la propia
entrada cita.** 430.3 — *"If there aren't sufficient runes in the Rune Deck, channel as many as
possible"* — y 161.2.a fija el Rune Deck en **12 runas en total**. El Rune Deck no es una reserva
aparte: es el complemento de lo que tenés en mesa.

Medido. Channeleás 2 por turno (315.3.b) y cada Power que pagás recicla una runa de la mesa **de vuelta
al Rune Deck** (161.2.b). Al turno T, con R reciclajes acumulados, la mesa tiene `2T - R` runas y el
Rune Deck `12 - (2T - R)`. La Energía acumulada disponible es la suma de las mesas de cada turno.

El board de #41 (3 Boneshiver + 2 Brambleback) pide **20 Energy y 5 Power**. Con los 5 reciclajes
repartidos lo antes posible:

| turno | mesa tras channel | Energía del turno | acum. | recicla | mesa final | Rune Deck |
|---|---|---|---|---|---|---|
| 1 | 2 | 2 | 2 | 0 | 2 | 10 |
| 2 | 4 | 4 | 6 | 1 | 3 | 9 |
| 3 | 5 | 5 | 11 | 1 | 4 | 8 |
| 4 | 6 | 6 | 17 | 1 | 5 | 7 |
| 5 | 7 | 7 | 24 | 2 | 5 | **7** |

Recién en el turno 5 la Energía acumulada (24) cubre los 20, y en ese momento **el Rune Deck tiene 7
runas**, no 9. Los 9 disparos existen; 430.3 convierte los dos últimos en nada. Y eso es el escenario
optimista: no cuenta el coste del portador ni el de perder el showdown.

**La reescritura.** Se declaran **6 channels**, que es lo que el Rune Deck puede entregar de verdad, y
los Boneshiver van **sobre los propios Bramblebacks** — con lo que desaparece el portador extra que
#41 nunca nombró:

```
2 Boneshiver, uno en cada Red Brambleback  ->  2 conquer effects
2 Red Brambleback presentes                ->  cada conquer effect dispara 1 + K = 3 veces   (R1 = A con stacking)
                                              -----------------------------------------------
                                              2 x 3 = 6 channels en UN Conquer
```

**Coste**: 2 Brambleback E4 P1 = 8 Energy + 2 Power de Fury; 2 Boneshiver E3 = 6 Energy; 2 attaches a
E1 + 1 Power de Body = 2 Energy + 2 Power. **16 Energy y 4 Power**, en dos cuerpos y sin portador
aparte. Cuatro Energy y un Power más baratos que el board de #41, y entregan lo mismo que él entrega
de verdad.

**Qué produce, dicho con precisión**: 6 runas del Rune Deck a la mesa **exhausted** (430.2, y el
ejemplo del reglamento es literalmente esa frase). Se readyan en tu Awaken siguiente (315.1.b). En el
turno 5 de la tabla eso lleva la mesa de 5 runas a 11 — de la mitad del Rune Deck a casi todo él, un
turno después de un solo Conquer. Es rampa real, y **es ENGINE, no INFINITE**: 430.3 la topea en el
Rune Deck y 161.2.a fija ese techo en 12.

**Riders declarados y NO multiplicados**: el segundo disparo del propio Brambleback (*"When I conquer,
[Buff] a friendly unit"*) sí es un conquer effect y sí se multiplica ×3 — son buffs, no recursos, y
está anotado. `SFD-030 Skyfall of Areion` (Fury, entra en la identidad) haría que el disparo de
Boneshiver fuese **también** un hold effect; **no entra en `uses` y no se multiplica**, porque
Brambleback dice *"your conquer effects **for conquering here**"* y en un Hold no estás conquistando.

**Svellsongur no entra**: es Calm y la identidad es Fury/Body (103.1.b.2). Leyendas limpias:
`SFD-183 Purifier` (*"Your Equipment each give [Assault]"*, ayuda a ganar el combate que lleva al
conquer), `OGN-249 Relentless Storm`, `UNL-183 Pridestalker`, `VEN-141 Butcher of the Sands`.

---

### 5. `arise-sand-soldiers-plaza` — ALT_WIN — **VERIFIED**

```
SFD-198 | Arise! | Spell | Calm/Order | E6 P1 | Play a 2 :rb_might: Sand Soldier unit token for each Equipment you control. Then do this: Ready up to two of them. [Tags: Azir]
SFD-033 | Doran's Shield | Gear | Calm | E1 M+1 | [Equip] :rb_rune_calm: (...) [Effect] [Tank] (...) [Tags: Equipment]
UNL-039 | Soul Sword | Gear | Calm | E1 M+1 | [Equip] :rb_rune_calm: (...) [Effect] [Level 3][>] I have an additional +1 :rb_might:. [Tags: Equipment]
SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] :rb_rune_order: (...) [Effect] When I move, play a 1 :rb_might: Recruit unit token here. [Tags: Equipment]
```

**Aritmética**: 9 Equipment controlados → 9 Sand Soldiers de 2 Might. La barra del Plaza es 7, más el
cuerpo que ya lo controla = **10 unidades, margen de 3**. Verificado que esos tres son **los tres
Equipment más baratos de la identidad Calm/Order**: la lista completa de Equipment del pool por dominio
da, en Calm y Order, sólo `SFD-033`, `UNL-039` y `SFD-153` a E1; el siguiente escalón es E2.

**718.5.a** — *"Attached cards still have all Types and Tags while Attached"* — hace que cuenten tanto
los attacheados como los que están sueltos en tu base. *"each Equipment you control"* no pide attach.

**Dónde nacen.** Arise! no nombra locación, así que por 439.2.b.1 y 355.2.a los Sand Soldiers van a tu
base o a **un battlefield que controlás**. Como el resto de las líneas de Plaza del catálogo, **hay que
controlarlo antes de resolver el hechizo, no después** — es exactamente la nota del REFUTE de
`grand-plaza-recruit-vanguard`. Cada token elige su locación por separado (355.2), así que los nueve
pueden ir al Plaza.

**Coste**: 9 Energy en Equipment repartidos en turnos previos, y **E6 + 1 Power el turno del remate**.
No hace falta attachear ninguno, así que no hay Power de attach. Entran exhausted (143.4) y Arise!
readya dos; para holdear da igual.

**Por qué existe teniendo `grand-plaza-recruit-vanguard` en el pool.** `OGS-015 Recruit the Vanguard`
(Order, E6, cuatro Recruits de 1 Might) está dentro de esta misma identidad, así que la entrada tiene
que ganarle en algo medible. Le gana en dos cosas:

1. **2 Might contra 1, y hay una respuesta concreta a E1 que lo decide.** `OGN-133 Flurry of Blades`
   (Body, E1, [Reaction], *"Deal 1 to all units at battlefields"*): por **142.4.b** es letal para los
   ocho Recruits de la línea de Vanguard y **no toca** a ninguno de los nueve Sand Soldiers. Un turno
   rival entero con esa carta en el pool separa las dos líneas.
2. **El turno del remate cuesta 6 Energy y 1 Power**, contra los 12 Energy de dos Vanguard. Los 9
   Equipment se pagan de a 1 en el early game y no son cartas muertas mientras esperan.

Le pierde en **slots**: 10 cartas contra 2. Va escrito en la entrada; el proyecto ya decidió que el
número honesto se muestra aunque sea caro.

**Battlefield por formato**: mismo `notable` que la candidata 2 (485.5 / 487.5 / 486.5, 103.4.c + TR
402.1). **Leyenda**: `SFD-247 Emperor of the Sands` es la natural — sus Sand Soldiers tienen
[Weaponmaster], así que cada uno que entra puede equipar uno de tus Equipment sueltos por 1 Power
menos — pero cualquiera de las cuatro Calm/Order sirve.

**Comparte shell con la candidata 2**: sus 3 Eye of the Herald son 3 de los 9 Equipment que Arise!
cuenta.

---

## Bloque 4 — la corrección diagnosticada y nunca aplicada, dentro de dos entradas verified

Ninguna de las dos cambia `uses`, `class` ni `quantity`: son notas que quedaron contando un estado del
mundo anterior a R6.

**1. `skyfall-ahri-conquer`.** Su `notes` decía *"UNRESOLVED, and it is why this is a candidate: adding
SFD-059 Svellsongur would raise the count, but only if Svellsongur copies a unit's CURRENT rules text
including appended Effect Text (434.1.c) rather than its printed text."* Eso lo contestó **R6 = A** el
2026-09-04, y `svellsongur-copy-hold` ya se para en ello (bloque 1). Se reescribe la frase. **Su
aritmética y su clase no cambian**: los 10 puntos que declara con A=3, K=2 ya pasan la barra de 8, así
que el board conservador es una elección, no un error.

**2. `svellsongur-copy-hold`.** Su segundo `notable` publicaba *"one Sentinel with two counts as K=3:
2 × (1 + 3) + 1 = 9 from two bodies"*, que es el número **pre-R6** y que sus propios `steps` y `notes`
contradicen desde el 2026-09-04 (*"Under R6 = A ... K = 4"*, *"the board is worth 11, not the 9 a
snapshot reading would give"*). Se corrige el `notable` a K = 4 y 11 puntos. Ninguna cantidad se toca.

---

## Resumen

| # | id | clase | veredicto |
|---|---|---|---|
| 1 | `ahri-trinity-svellsongur-hold` | BURST | **VERIFIED** tal cual |
| 2 | `noxian-drummer-eye-svellsongur-plaza` | ALT_WIN | **VERIFIED (reescrita)** — portador nombrado, S 2→1, conquer antes del move |
| 3 | `last-rites-svellsongur-recursion` | ENGINE | **REFUTADA** — 9 permisos piden ≥15 Energy y el Rune Deck son 12 runas |
| 4 | `boneshiver-brambleback-channel` | ENGINE | **VERIFIED (reescrita)** — 9 channels → 6 por 430.3 + 161.2.a; sin portador extra |
| 5 | `arise-sand-soldiers-plaza` | ALT_WIN | **VERIFIED** tal cual |

**Ninguna resultó INFINITE.** **Ninguna lectura de reglas nueva archivada**: las tres que asomaron se
cerraron con reglas ya escritas o reordenando el juego — la de texto impreso contra texto actual con
R6 = A y el precedente de `svellsongur-copy-hold`; la de la autorreferencia declarando S = 1 y fijando
el orden de attach; y la del *"here"* sobre un battlefield ajeno conquistando el Plaza **antes** de
mover al portador, en la misma Main Phase (344.2 → 348.2.a.1 → 190.3.a.1).

Catálogo: **87 → 91 entradas, las 91 `verified`.**
