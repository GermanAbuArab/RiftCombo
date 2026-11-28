# Issue #62, sección 1 — el loop del combate que no se puede ganar

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16 · **Catálogo al empezar la sección:** 135
entradas, las 135 `verified`.

**Resultado: 3 entradas nuevas, las 3 `verified`.** Dos INFINITE (`threshold-reveler-infinite-energy`,
`reveler-svellsongur-jhin-infinite-power`) y una ALT_WIN (`desert-call-vi-sand-soldier-plaza`).
**Ninguna entrada existente cambió de clase ni de cantidades**; `twilight-reveler-svellsongur-stellacorn-draw`
gana una hermana, no una reescritura, y en el camino su clasificación ENGINE queda **confirmada por el
propio autor de la línea, perdiendo en partida por Burn Out**.

---

## Paso 2 primero, en bloque: cada número de regla abierto

La auditoría de citas del 2026-09-04 encontró **tres entradas que citaban una regla que decía lo
contrario** de lo que afirmaban, así que antes de caminar nada saqué las 31 reglas que estas tres
entradas iban a citar y las leí en `data/Riftbound-Core-Rules-2026-07-16.txt`. **Las 31 dicen lo que
las entradas dicen que dicen.** Las que hacen el trabajo:

| regla | verbatim | qué decide |
|---|---|---|
| **466.1.a.1** | *"Insert '3c. Heal all Units.'"* | el daño acumulado **se borra en cada combate**; sin esto la segunda pasada sumaría 3+3=6 y mataría al defensor |
| **466.1.a.2** | *"Insert '3d. Recall Attackers present at the Battlefield if Defenders are still present.'"* | **es la limpieza de combate la que devuelve al atacante**, no una carta — por eso ninguna fuente puede nombrar el efecto que lo hace |
| **466.3.d** | *"There is 'No Result' if units were recalled during step 3d of the Combat Cleanup…"* | nadie gana el combate |
| **466.3.d.1** | *"If 'No Result' was reached, **and both players have units remaining**, stage a Showdown and a Combat"* | **no** se re-escena: el atacante ya no está ahí |
| **423.1.b** | *"A Stunned Unit does not contribute its might to damage in the combat damage step."* | el defensor pega 0 |
| **423.1.c** | *"A Stunned Unit must still have damage applied to it equal to, or greater than, its full might value to be killed."* | 3 no mata a un 4 |
| **423.1.a.2** | *"Stunned Units lose the Stunned status during step 3d of the end of turn cleanup."* | **un solo stun cubre el turno entero** |
| **465.2.c** | *"Starting with the Attacker, each player assigns an amount of damage equal to their **summed Might** among the other's Units."* | **la barra del defensor la fija la suma de tus atacantes**, no el mayor |
| **465.2.c.3** | *"Units must have lethal damage assigned to them in full before damage is assigned to a different Unit."* | no podés "repartir" para no matar |
| **458** | *"Recalls do not affect the state of the Permanent being recalled."* | el Reveler vuelve **exhausto** |
| **456 / 456.1** | *"Recalls are not Moves. They do not cause Triggered Abilities to trigger that are triggered by Move actions."* | la vuelta a casa no dispara nada |
| **144.2 / 420.3.a** | *"Exhausting the Unit is the Cost for this action." / "The Cost is Exhausting one or more Units."* | mover es gratis en Energía; el recurso es el ready |
| **144.4.a / 144.4.b** | *"Units may move from their Base to a Battlefield." / "Units may move from a Battlefield to their Base."* | Jhin puede rebotar sin Ganking |
| **144.1.c** | *"This action cannot be performed during a Showdown or Combat."* | los moves van entre combates, nunca dentro |
| **383.4.e** | *"Attack Triggers are Triggered Abilities that trigger when a Unit or Player gains the Attacker designation for the first time during a combat."* | *"When I attack"* necesita la designación |
| **464.2.c.1 / 464.2.c.3** | *"The Attacker is the player whose unit(s) applied the Contested status" / "Units at the Contested Battlefield controlled by the Attacker or Defender gain the … designation now"* | el que mueve es el atacante, y **todo lo suyo que esté ahí también** |
| **167** | *"Every player's Rune Pool empties at the start of each player's Main Phase and the end of each player's turn."* | la Energía muere con el turno — la tuya y la del rival |
| **190.6.a** | *"While a Battlefield is Controlled, its Controller controls its Abilities unless that ability indicates another player does."* | el Threshold lo dispara el rival y **te paga igual** |
| **811.1.b / 811.1.d.2** | *"…you may pay [A] to hide this facedown at **a battlefield you control**" / "those targets must be chosen from among options at that battlefield"* | **Back Off no se puede esconder para esto** |
| **355.2.a** | *"By default, Valid locations include the controller's Base or a Battlefield the controller controls."* | los Sand Soldiers **nacen en la Plaza**, no caminan |
| **186 / 186.1** | *"Tokens … cannot exist elsewhere." / "If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately"* | ningún token llega al trash, así que Vi nunca puede elegir uno |
| **416.6** | *"take X cards of the **instructed player's choice** from the relevant zone"* | Vi elige, el trash no tiene que estar vacío |
| **820.1.c.3 / 820.1.d.1** | *"Each Repeat Cost can be paid only a single time."* + el ejemplo trabajado, que **es Desert's Call** | 2 fichas por lanzamiento, tope duro |
| **431.1.a** | *"If a player must Draw cards in excess to the number of cards in their Main Deck, they will Draw as many as possible, perform this action"* | la pared de #59 |
| **485.5 / 486.5 / 487.5 / 103.4.c** | *"randomly selects one (1) of their three (3)"* … | el battlefield es azaroso y no se apila |

**Chequeo de bans:** las 11 cartas distintas de las tres entradas (`VEN-166`, `VEN-020`, `UNL-042`,
`SFD-059`, `UNL-022`, `SFD-048`, `OGN-036`, `SFD-031`, `OGN-293`, más `VEN-139` como leyenda)
grepeadas por `[BANNED` en `data/corpus_flat.txt`: **ninguna está baneada ni restringida en ningún
formato**.

---

## El esqueleto, y por qué nadie lo explica bien

Las tres fuentes describen el loop y **ninguna nombra la regla que lo hace repetir**. Es lógico: no es
una carta, es limpieza de combate.

```
VEN-020 | Twilight Reveler | Unit | Fury | E3 M3 | When I attack, ready another friendly unit. [Tags: Ionia]
UNL-042 | Back Off | Spell | Calm | E3 | [Hidden] ... [Action] ... [Stun] a unit. (It doesn't deal
         combat damage this turn.) If you played this from your hand, draw 1.
```

Un ciclo, con la regla al lado de cada paso:

1. El Reveler A hace un Standard Move de la base al battlefield del rival (144.1.a, 144.4.a). El coste
   es **exhaustarse y nada más** (144.2, 420.3.a).
2. 190.3.a.1 aplica Contested; el Cleanup escena el Combat (323.9) y 323.13 lo abre.
3. 464.2.c.1 hace atacante al que aplicó Contested; 464.2.c.3 le da la designación a A; 383.4.e pone
   *"When I attack"* en la cadena → **readea al otro Reveler**, que está exhausto en la base desde su
   propia pasada.
4. Daño: 465.2.c asigna la **Might sumada** de tus atacantes. 3 contra un defensor de 4 no es letal
   (423.1.c). El defensor aturdido asigna 0 (423.1.b).
5. Limpieza de combate: **466.1.a.1 cura a todos** (el daño no se acumula entre pasadas) y
   **466.1.a.2 devuelve a los atacantes** porque quedan defensores. 466.3.d: No Result. 466.3.d.1 no
   re-escena, porque *"both players have units remaining"* ya no es cierto — al atacante lo acaban de
   sacar.
6. A vuelve **exhausto** (458) y el viaje de vuelta no dispara nada (456.1).
7. Repetir con el Reveler que el disparo readeó. **Cero cartas, cero Energía, cero Power por pasada.**

El stun se paga **una sola vez en todo el turno** (423.1.a.2). Y no se puede esconder: `[Hidden]` sólo
deja esconder *"at a battlefield you control"* (811.1.b) y 811.1.d.2 confina los objetivos de un
hechizo escondido a ese battlefield — el defensor está en el del rival. **Back Off sale de la mano por
3 Energía**, y de paso roba 1.

### La barra del defensor la fija la SUMA, no el mayor

Es el punto que las fuentes se pierden y que decide la variante B. **465.2.c**: *"each player assigns
an amount of damage equal to their **summed Might**"*, y **465.2.c.3** obliga a poner daño letal
entero sobre una unidad antes de repartir. Entonces:

| quién ataca | Might sumada | Might mínima del defensor para que el loop siga |
|---|---|---|
| un Reveler solo | 3 | **4** |
| Reveler + el Recruit del Eye (`twilight-reveler-eye-facebreaker-recruits`) | 4 | 5 |
| Reveler + Jhin | 7 | **8** |

Por eso `twilight-reveler-eye-facebreaker-recruits` pide 5 y estas dos piden 4, y por eso el
*"at least five mights"* de Frobei **es falso para la versión en la que Jhin ataca**: 3+4=7 mata a un
defensor de 5, no queda defensor, no hay recall (466.1.a.2), y encima 466.5 te hace Establecer Control
— ganás el battlefield y perdés el motor.

---

## Variante A — `threshold-reveler-infinite-energy` (INFINITE)

```
VEN-166 | Threshold of the Gray | Battlefield | Colorless | - | When combat starts here, the attacker
         and defender each [Add] :rb_energy_1:.
```

> `[2:04] I've explained the infinite combo in a different video, but the premise of the combo is to
> have a stunned unit with at least four might on Threshold of Grey, and have two Twilight Revellers
> in base. You attack with the one Reveller and use her ability to ready the Reveller in base.
> Threshold of Grey will trigger and generate an energy, and because your opponent's unit is stunned,
> your Reveller goes to base. This creates an infinite energy loop.`
> — Ritualo, *"How To Combo And Master AKALI"*, 2026-07-22,
> https://www.youtube.com/watch?v=kHqq9jrCOuE (bajado y leído por esta sesión con yt-dlp)

El disparo del Threshold cae en **464.2.b** (*"Start of combat or showdown effects happen now"*), y
cada pasada es un combate nuevo, así que cada pasada es una Energía nueva. Su texto **no dice "you"**,
así que 190.6.d no lo apaga: el rival controla la habilidad (190.6.a) y te paga igual, porque el efecto
nombra explícitamente *"the attacker and defender"*.

### Ledger por pasada

| paso | Energía | Power | cartas | reglas |
|---|---|---|---|---|
| Standard Move base → Threshold | 0 | 0 | 0 | 144.1.a, 144.4.a, 144.2 |
| Threshold: *when combat starts here* | **+1** | 0 | 0 | 464.2.b |
| *When I attack* → readea al otro Reveler | 0 | 0 | 0 | 383.4.e, 464.2.c.3 |
| Daño 3 → defensor de 4+; 0 de vuelta | 0 | 0 | 0 | 465.2.c, 423.1.b/c |
| Cura + recall del atacante; No Result | 0 | 0 | 0 | 466.1.a.1/.a.2, 466.3.d |
| **Neto** | **+1** | **0** | **0** | |

Primera pasada solamente: Back Off desde la mano, **−3 Energía, +1 carta**.

**Repetir:** el Reveler que quedó ready es siempre el que tiene que moverse. Sin tope.

### Lo que ninguna fuente pesa, y que va escrito en la entrada

**El Threshold paga a los dos.** *"the attacker and defender each"*. El rival flota Energía sin tope
durante **tu** turno, y cada pasada le abre un Combat Showdown donde tiene prioridad (464.2, 347.1).
167 se la borra al final de tu turno, pero no antes. Contra una mano con remoción de `[Reaction]` esa
es la diferencia real entre esta línea y `twilight-reveler-eye-facebreaker-recruits`, que no le paga
nada al rival. **Es la entrada más barata de la familia** (tres cartas y un battlefield) y la que más
le regala al otro.

---

## Variante B — `reveler-svellsongur-jhin-infinite-power` (INFINITE)

```
SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] :rb_energy_1::rb_rune_calm: ... As this is
         attached to a unit, copy that unit's text to this Equipment's effect text ...
UNL-022 | Jhin, Murderous Artist | Unit | Fury | E4 P1 M4 | [Deflect] ... [Ganking] ... When I move,
         [Add] :rb_energy_1::rb_rune_rainbow:.
```

> `[4:06] So you're going to use J[h]in and go to the other battlefield or if the unit standing on the
> battlefield has more than four mights, so at least five mights, then you can also go with J[h]in.
> … [4:23] And what because he moves, you get one energy and one power, right? … [5:04] and you do
> that on repeat. So that's the first part of the loop. You have infinite power, infinite energy.`
> — Frobei - Riftbound, 2026-07-17, https://www.youtube.com/watch?v=HDnIw6NETTI

Svellsongur sobre el Reveler A le da **dos instancias** del disparo de ataque (434.1.c la vuelve a
pegar al Top-Most Card; #45 cerró que son 2^v, no 1+v). Entonces:

- **A ataca** (lleva el Svellsongur) → 2 readies: **el Reveler B y Jhin**.
- **Jhin se mueve** base ↔ tu battlefield (144.4.a / 144.4.b, cada tramo es un Move por 446.1) →
  **+1 Energía y +1 Power rainbow**.
- **B ataca** (sin Svellsongur) → 1 ready: **A**.
- Repetir.

### Ledger por ciclo (dos ataques)

| paso | Energía | Power | cartas | readies |
|---|---|---|---|---|
| A ataca (mueve, se exhausta) | 0 | 0 | 0 | **+2** (B, Jhin) |
| Jhin Standard Move (se exhausta) | **+1** | **+1** | 0 | −1 |
| B ataca (mueve, se exhausta) | 0 | 0 | 0 | **+1** (A) |
| los dos Revelers vuelven a estar listos | | | | −2 |
| **Neto por ciclo** | **+1** | **+1** | **0** | 0 |

Tres readies por dos ataques, dos se los llevan los Revelers, **uno sobra**. Con un segundo Svellsongur
en el otro Reveler son cuatro por dos ataques, dos sobran, y el ritmo se duplica. Una copia alcanza
para que sea infinito.

### Dos correcciones a la fuente

1. **Jhin no puede sumarse al ataque** con un defensor de 5 (arriba, 465.2.c/465.2.c.3): mataría al
   defensor y cortaría el loop. La frase que sí funciona es la primera que dice la propia fuente —
   *"go to the other battlefield"*.
2. **El battlefield al que rebota Jhin tiene que seguir siendo tuyo.** 323.6 te saca el Control en
   cuanto ninguna unidad tuya lo ocupa, y volver a entrar en uno sin controlador aplica Contested
   (190.3.a.1), lo que **escena y abre un Showdown en cada pasada** (323.8, 323.12) y le da al rival
   una ventana de prioridad cada vez. Con cualquier cuerpo amigo de guarnición, 190.3.a.1 no dispara
   nunca, porque ya lo controlás.

### Por qué es una entrada nueva y no una reescritura de otra

- **Contra `twilight-reveler-svellsongur-stellacorn-draw` (ENGINE):** mismo esqueleto de cuatro cartas
  con Jhin donde va el Stellacorn. El Stellacorn **paga una carta por pasada** y choca con 431.1.a más
  194.1.d — la fuente pierde una partida por eso a los `[23:40]` del mismo video: *"because I try to
  draw and I have no card and he goes to eight, I lose, right?"*. Jhin no paga nada, así que el techo
  desaparece. **La entrada vieja se queda ENGINE, confirmada, y gana una hermana.**
- **Contra `jhin-fiora-facebreaker-recall` (INFINITE):** aquella es **Fury + Order** (Facebreaker, Eye
  of the Herald, Fiora) y ésta es **Fury + Calm**, así que 103.1.b.1 hace que ninguna se pueda
  construir en el mazo de la otra. Allá Jhin **es** el atacante y Fiora lo readea al cruzar Mighty;
  acá Jhin no ataca nunca y lo readean los Revelers. La nota vieja de la entrada del Stellacorn
  (*"the Energy half is already catalogued as jhin-fiora-facebreaker-recall"*) es cierta como
  descripción del recurso y **falsa como razón para no catalogarla**: son dos mazos que no se pueden
  mezclar.

---

## La cola — `desert-call-vi-sand-soldier-plaza` (ALT_WIN)

Lo que la fuente hace con los recursos infinitos, y que ninguna entrada del catálogo toca.

```
SFD-048 | Stellacorn Herder | Unit | Calm | E4 M3 | When I move, draw 1.
OGN-036 | Vi, Destructive | Unit | Fury | E2 P1 M3 | [Ganking] ... Recycle 1 from your trash: Give me
         +1 :rb_might: this turn.
SFD-031 | Desert's Call | Spell | Calm | E2 | [Repeat] :rb_energy_2: ... Play a 2 :rb_might: Sand
         Soldier unit token.
OGN-293 | The Grand Plaza | Battlefield | Colorless | - | When you hold here, if you have 7+ units
         here, you win the game.
```

**"Telekinesis Hearter" queda resuelta.** #62 la anota como carta irresoluble en su sección 6. Bajando
el video completo se ve que el mismo hablante la llama después **"Stellar Core"** (`[5:56]`) y le
atribuye exactamente *"When I move, draw 1"*, y que la otra fuente de la misma línea (Ritualo,
`[2:32]`) la llama **"Stellarhorn Herder"**. Es `SFD-048 Stellacorn Herder`. Lo mismo con
*"Desert Scorcher"* / *"Desert Scroll"* = `SFD-031 Desert's Call`, y *"Vye"* = `OGN-036 Vi`.

### Ledger por pasada de fichas, con el mazo VACÍO

| paso | Energía | cartas en mazo | cartas en trash | fichas | reglas |
|---|---|---|---|---|---|
| entrada de la pasada | — | **0** | 0 | — | |
| Desert's Call + su [Repeat] | **−4** | 0 | +1 (el propio hechizo) | **+2** | 820.1.d.1, 820.1.c.3 |
| las fichas se juegan **directo a la Plaza** | 0 | 0 | 0 | — | **355.2.a** |
| Vi: *Recycle 1 from your trash* → Desert's Call | 0 | **+1** | −1 | — | 416.1.a, 416.6, 377/378 |
| Stellacorn se mueve **una vez** → roba 1 | 0 | **0** | 0 | — | 431.1.a no dispara |
| **Neto** | **−4** | **0** | **0** | **+2** | |

Los 4 de Energía los paga el loop de Jhin (cuatro moves). **Cero cartas netas, cero slack**: es la
pared de #59 respetada, no ensanchada — un segundo move del Stellacorn en la misma pasada roba sobre
mazo vacío, 431.1.a hace Burn Out y 194.1.d le da un punto al rival.

### Las tres cosas que la caminata agrega y la fuente no tiene

1. **Los Sand Soldiers no caminan.** `355.2.a`: *"Valid locations include the controller's Base **or a
   Battlefield the controller controls**"*, y Desert's Call no imprime destino. Nacen **en la Plaza**.
   Esto es lo que saca a la línea del cuello de botella que #48 midió (un Standard Move por cuerpo, y
   sólo Azir Sovereign los mueve en masa). Entran exhaustos (143.4) y da igual: la Plaza cuenta
   unidades presentes, no listas.
2. **El reciclado de Vi no puede agarrar una ficha aunque quisiera.** `186.1` — un token deja de
   existir al entrar en cualquier Non-Board Zone, así que **ningún Sand Soldier llega jamás al trash**.
   Y `416.6` da la elección al jugador, así que la cautela de la fuente (*"that's going to be the only
   card"*) no hace falta.
3. **El remate es de esta caminata, no de la fuente**, y la entrada lo dice. La fuente termina en
   *"infinite Sand Soldiers, infinite power, infinite energy"* (`[22:26]`) y cierra con
   *"I think the combo is not consistent enough right now"* (`[23:49]`). La Plaza la pone el walk.

Lo que **sí** es de la fuente y hay que conservar: su propio razonamiento de por qué la Energía
infinita **no** alcanza. `820.1.c.3` — *"Each Repeat Cost can be paid only a single time"* — y el
ejemplo trabajado de la regla **es esta misma carta**. Dos fichas por lanzamiento, tope duro. Por eso
hace falta el ciclo reciclar-robar. Una fuente que se auto-limita contra una regla que no cita es una
señal fuerte, y la familia *"reducí el Repeat a 0 y repetí para siempre"* sigue muerta.

---

## Trampas de autoría, una por una

| trampa (CLAUDE.md) | A | B | cola |
|---|---|---|---|
| battlefield enemigo VACÍO no es un ataque (807.1.d, 383.4.e, 461) | hay guarnición | hay guarnición | hay guarnición |
| Energía del Awaken se pierde en 167 | todo es Main Phase; **muere al final del turno**, dicho | ídem | ídem |
| un Repeat no da ventana para re-exhaustar (429.3, R21) | sin [Repeat] | sin [Repeat] | el [Repeat] se paga al lanzar, **820.1.c.3** |
| [Temporary] muere antes de Scoring (816.1.b) | ninguno | ninguno | los Sand Soldiers **no** son Temporary |
| Gold entra exhausto salvo Renata (R25) | sin Gold | sin Gold | sin Gold |
| reciclar una runa por Power la manda al Rune Deck (161.2.b) | no se paga Power | no se paga Power | no se paga Power |
| un recall no es un move (456) y no cambia el estado (458) | **carga útil**: vuelve exhausto y no dispara nada | ídem | ídem |
| escudo heal/exhaust/recall borra el Deathknell (808.1.d.1) | sin escudo | sin escudo | sin escudo |
| 323.7 trashea las cartas escondidas del battlefield ajeno | **por eso Back Off sale de la mano** | ídem | ídem |
| 103.4.c + TR 402.1: no se apilan battlefields | dicho por formato | n/a | dicho por formato |
| 190.1 / 190.6.d: el battlefield que traés arranca sin controlador | el Threshold es **del rival**, y su texto no dice "you" | tomar tu battlefield es parte del coste | ídem, y la Plaza hay que conquistarla |
| aritmética contra las cantidades declaradas | +1 E/pasada | +1 E +1 P/ciclo | +2 fichas/pasada, 0 cartas netas |

Las tres son **INFINITE/ALT_WIN por mecanismo**, no por llegar a 8 con una fórmula: A y B declaran un
recurso sin tope y lo demuestran con un paso "repetir"; la cola nombra la carta que dice literalmente
que ganás (`OGN-293`, rule 195).

---

## Balance de la sección 1

| entrada | clase | veredicto |
|---|---|---|
| `threshold-reveler-infinite-energy` | INFINITE | **nueva, verified** |
| `reveler-svellsongur-jhin-infinite-power` | INFINITE | **nueva, verified** |
| `desert-call-vi-sand-soldier-plaza` | ALT_WIN | **nueva, verified** |
| `twilight-reveler-svellsongur-stellacorn-draw` | ENGINE | **sin cambios**, y su clase queda confirmada por la fuente en partida |
| `twilight-reveler-eye-facebreaker-recruits` | INFINITE | sin cambios |
| `jhin-fiora-facebreaker-recall` | INFINITE | sin cambios |

**Catálogo: 138 entradas, las 138 `verified`.** Cero readings nuevas — todo lo que estas tres necesitan
está en el reglamento o ya estaba cerrado (#45 para el 2^v del Svellsongur).

Queda anotado de #62 §6 y **no afirmado**: `VEN-055 Applied Researchers` como forma de jugar Time Warp
sin Sellos (no caminé si mueve el ledger de #21), y la posible lectura Svellsongur vs *"Use only once
per turn"* sobre `SFD-050 Azir, Ascendant`.
