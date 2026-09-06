# Issue #62, sección 3 — las 24 candidatas sobre leyendas que ya tenían entrada

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16 · **Catálogo al empezar:** 156.

**Resultado: 21 entradas nuevas, las 21 `verified`; 2 filas descartadas y 2 fusionadas en una.**
Una **CHAIN**, una **ALT_WIN**, diecinueve ENGINE.

Los **38 códigos** de la sección fueron grepeados verbatim de `data/corpus_flat.txt`: los 38 existen y
**ninguno está baneado ni restringido**. Los **17 videos fueron bajados y leídos por esta sesión** con
`yt-dlp`. Doce cartas que **no aparecían en ninguna entrada** ahora lo hacen: `OGN-148`, `OGN-039`,
`OGN-112`, `UNL-152`, `UNL-179`, `OGN-221`, `OGN-099`, `OGN-186`, `SFD-042`, `OGN-199`, `OGN-088`,
`SFD-050`, `SFD-084`, `OGN-226`, `OGN-218`, `OGN-108`, `OGN-109`, `OGN-167`.

---

## Lo que no entra

| fila | motivo |
|---|---|
| `lillia-smoke-and-mirrors-sprite` (`UNL-082`+`UNL-083`) | **ya está catalogada**: `lillia-smoke-mirrors-sprite-relay` usa exactamente esas dos cartas |
| `pit-crew-multi-conquer` (`OGN-091` + "gear barato") | **no nombra un segundo componente**. `When you play a gear, ready me` sobre *cualquier* gear es un **patrón**, no un par — es material de `data/synergies.json` (ancla `OGN-091`, predicado `types: gear`), que es de otro dueño. La cita se verificó igual y está abajo |
| `convergent-mutation-ember-monk` | **fusionada** con `convergent-mutation-mundo` en `convergent-mutation-might-transfer`: es el mismo mecanismo con otro tanque de combustible, y la fuente los nombra en la misma oración. Separarlas hubiera duplicado una regla, que es la prueba que hizo caer a `danger-zone-marai-spire` en la sección 2.6 |

La cita de Pit Crew, verificada y sin usar:

> `[0:42] pit crew specifically, you are able to ready it off the fact that whenever you play a gear,
> it becomes ready. It's not conditional based on things that are happening on the board state.`
> — MoreThatMillGuy, *"The *BEST* Gear-Aggro Deck - Ornn Is Viable Again!"*, 2026-08-12,
> https://www.youtube.com/watch?v=UK2Tcr2-PWI

---

## Las dos que no son ENGINE

### `yasuo-windrider-ride-the-wind-chain` — **CHAIN**, y la clase se comprobó contra la definición

Tres puntos en un turno desde 5: conquer, gank-conquer, y el tercer move de Yasuo. La fuente lo camina
entero, incluida la cuenta:

> `[1:43] You are now on seven. Then you will play Ride the Wind at the end to move yourself back to the
> base and score a third point from your champion unit's ability. Now you've just scored three points
> in one turn and you go over to the eight mark, meaning that you won from five.`
> — Riftlab, 2025-09-18, https://www.youtube.com/watch?v=_3iGMGyKtrc

CHAIN es *"reaches 8 across several scoring events, without the opponent taking a turn in between"*.
Dos Conquers y un punto por habilidad, un turno. **No es BURST**: ningún evento único llega a 8. Es la
cuarta CHAIN del catálogo y la primera que no usa Time Warp ni un doble Conquer solo. R2 = A es lo que
hace que el tercer punto sume en vez de chocar contra 470.

### `keeper-of-masks-flurry-plaza-window` — **ALT_WIN**, y es AkeenaTV corrigiéndose a sí mismo

Ésta es la más interesante de toda la sección, porque el catálogo ya tenía **la mitad anterior de la
misma historia**. `flurry-of-feathers-grand-plaza-win` registra la línea vieja de AkeenaTV como
refutada por `383.2.a.1` más `335`: no se pueden agregar cuerpos en respuesta al disparo de la Plaza,
porque en la Beginning Phase con la cadena vacía **nadie tiene prioridad**.

> **335** — *"If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown, and it is
> **any other phase of the turn**, proceed to the next substep, step, phase, or turn."*

En el mismo video donde dice que le cambiaron las reglas (citado entero en el walk de la sección 5), la
reconstruye alrededor de lo único que **sí** pone un item en la cadena antes del scoring: un disparo de
`[Temporary]`.

> `[2:08] it's going to be Keeper of Masks and Flurry of Feathers. … So, these two by themselves have
> seven units… For four mana, we can get a sprite token, **which will then give us the necessary
> temporary trigger to actually have the window to react to it** with the hidden card and the reaction
> speed Flurry of Feathers to give us the seven units for the win.`

**Cada eslabón se abrió y se leyó:**

| regla | verbatim | qué sostiene |
|---|---|---|
| **816.1.b** | *"At the start of this permanent's controller's Beginning Phase, **before scoring**, kill this."* | el disparo cae **antes** del Scoring Step |
| **312.2.c** | *"When the turn is in a Closed State, all pending chain items finish being finalized, and they control the next item on the Chain."* | con la cadena ocupada **sí** hay prioridad |
| **813.1.c.1** | *"On Cards: 'This can be played during Closed States on any player's turn.'"* | Flurry of Feathers y el Keeper escondido (que gana `[Reaction]` por 811.1.b) se pueden jugar ahí |
| **816.1.c** | *"The Trigger Condition is the controller of the permanent's Beginning Phase starting."* | el `[Temporary]` del **propio Keeper** ya no puede dispararse ese turno: el instante pasó |
| **383.2.a.1** | la condición se mide al colocar el disparo | la Plaza cuenta 7 en el Scoring Step, **después** de la ventana |

Cuenta: Keeper + 2 Reflections + 4 Birds = **7 contra una barra de 7**. Y `811.1.d.1` obliga a jugar el
permanente escondido al battlefield donde se escondió, sus tokens dicen *"here"*, y Flurry of Feathers
no imprime destino, así que `355.2.a` los pone en un battlefield que controlás. **Todo cae en la
Plaza.**

Es la **única línea de Plaza del catálogo que usa `[Temporary]` como habilitador** en vez de gastar una
carta (LeBlanc) en apagarlo.

---

## Las diecinueve ENGINE, y lo que cada caminata agregó

| entrada | lo que la caminata agrega sobre la fuente |
|---|---|
| `gromp-arena-svellsongur-xp` | **la contradicción 5 de #62 queda resuelta**: 2 instancias × (3 hold + 3 arena) = **12**, exacto; el "16" que la fuente dice 18 segundos después no sale de ninguna combinación (dos Svellsongur darían 24) |
| `anivia-svellsongur-double-burn` | el "seis" de la fuente es exacto, y `383.4.e.2.a` cierra que cada instancia dispara **una** vez por combate |
| `kaisa-survivor-arena-draw` | el Arena convierte un disparo de conquer (una vez por battlefield) en uno de hold (todos los turnos); `[Accelerate]` es lo que evita el turno perdido de 143.4 |
| `kaisa-evolutionary-arena-spell` | el presupuesto es **tu propio puntaje**, y el Power **no** se perdona — la carta dice *"without paying its Energy cost"* |
| `karthus-black-rose-double-channel` | las runas entran **exhaustas**: es rampa para el turno siguiente, no Energía ahora. La misma cita corrobora dos entradas Karthus ya catalogadas |
| `karthus-rift-herald-double-play` | la fuente dice *"ignoring its cost"*; la carta dice *"ignoring its **Energy** cost"* y su recordatorio *"You must still pay its Power cost"* |
| `bellows-breath-imperial-decree-wipe` | son **seis** unidades y no tres (820.1.d.1), y `820.1.c.3` lo tapa ahí; y el Decree dice *"ANY unit"*, así que también mata lo tuyo |
| `aurora-elder-dragon-garbage-grabber` | **#59 mató a Garbage Grabber DENTRO de un loop y acá no aplica**: el uso es entre turnos, y `315.1.b` lo readea cada Awaken. Un veredicto de lente está acotado a la lente |
| `yasuo-stellacorn-svellsongur-draw` | cuatro robos = dos moves × dos instancias, y el techo es el mazo (431.1.a + 194.1.d) |
| `pack-of-wonders-treasure-trove` | la fuente dice *"not infinite"* y tiene razón por un motivo que no da: el coste del Pack lleva exhaust, así que es **uno por turno** pase lo que pase con la Energía |
| `jax-grandmaster-warmogs-buff` | la leyenda imprime **dos** habilidades y el motor corre sobre la gratis (la de Equipment **ya attacheado**, sin Energía); un buff es un status (124.2) y se queda cuando el arma se va |
| `jax-grandmaster-brutalizer-refresh` | el video se titula *"the infinite weapon hack"* y la entrada **no** dice INFINITE: el exhaust de la leyenda la deja en una vez por turno |
| `kharox-tornado-warrior-pack` | la fuente dice que hacen falta más copias del Tornado Warrior; **la cláusula "facedown card" del Pack of Wonders es la respuesta**, y ninguna de las dos entradas de Pack of Wonders catalogadas la usaba |
| `tideturner-mega-mech-swap` | **811.1.d.2 tiene una excepción explícita** (*"unless the ability explicitly restricts targeting in a way that makes this impossible"*) y esta carta la usa al decir *"at ANOTHER location"*. Segunda vez en este issue que leer una cláusula hasta el final cambia la respuesta |
| `azir-ascendant-stellacorn-draw` | el *"use only once per turn"* es lo que la deja en exactamente dos robos, y la lectura R32 se miró y **no se archivó** (ver `2026-09-06-issue62-r32-once-per-turn.md`) |
| `jayce-progress-vanguard-armory` | la Armory está **exactamente** en el tope del bracket de 7 de Jayce, el Power no se perdona, y la propia fuente la sacó de su mazo por inconsistente |
| `spectral-matron-vanguard-captain` | el Captain entra por **las dos barras al dígito** (E3 P1), y `[Legion]` se auto-satisface porque **la Matron es** la otra carta jugada ese turno |
| `convergent-mutation-might-transfer` | fusión de dos filas de #62; lee **Might actual** (710) y es `[Reaction]` (813.1.c.1), que es donde está el valor |
| `world-atlas-fiora-worthy-ready` | **709 es un evento, no un estado**, y su ejemplo trabajado lo dice: un cuerpo que ya está en 5 **no** vuelve a "become Mighty". El Atlas sólo dispara a Fiora yendo sobre algo por debajo de la línea |

---

## Reglas que hicieron trabajo nuevo en esta sección

- **335** y **312.2.c** juntas: fuera de la Main Phase con la cadena **vacía** nadie tiene prioridad,
  pero con un item en la cadena **sí**. Es lo que abre la ventana de la ALT_WIN y lo que la cerraba en
  la línea vieja de la misma fuente.
- **813.1.c.1** — *"On Cards: 'This can be played during Closed States on any player's turn.'"* La
  definición operativa de `[Reaction]`, usada dos veces acá.
- **816.1.c** — la Trigger Condition de `[Temporary]` es el **arranque** de la Beginning Phase, así que
  un permanente que entra después ya no puede dispararla ese turno.
- **811.1.d.2** y su cláusula final, que es una excepción real y no un adorno.
- **709** con su ejemplo trabajado: *"A Unit with Might 5 that gets +1 does not become Mighty, because
  it was already Mighty."*
- **124.2** — `Buffed` es un status, y `124.1` sólo lo limpia al cambiar de zona.

---

## Balance

| | |
|---|---|
| filas de la sección 3 | 24 |
| entradas nuevas `verified` | **21** |
| descartadas | 2 (`lillia-smoke-and-mirrors-sprite` ya catalogada; `pit-crew-multi-conquer` es sinergia) |
| fusionadas | 2 → 1 (`convergent-mutation-*`) |
| cartas que entran al catálogo por primera vez | 18 |

**Catálogo: 177 entradas, las 177 `verified`.** Cero readings nuevas.
