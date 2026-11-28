# Issue #62, sección 2 — cinco leyendas que no tenían ninguna entrada

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16 · **Catálogo al empezar la sección:** 138.

Camino las **cinco candidatas desarrolladas** de la sección 2 (2.1 a 2.5). Las 14 filas de la tabla 2.6
quedan sin caminar y están anotadas al final con lo que ya verifiqué de ellas.

**Resultado: 5 entradas nuevas, las 5 `verified`. Una refutada a medias y reescrita en su motor
(2.3), una bajada de clase respecto de lo que declaraba el issue (2.2), y una a la que la caminata le
encontró un defecto que ninguna fuente menciona (2.4).**

Cinco leyendas que estaban en cero: `VEN-147` Eye of Twilight, `VEN-141` Butcher of the Sands,
`SFD-181` Mechanized Menace, `SFD-189` Fire Below the Mountain, `VEN-151` Soul's Reflection. Y una
carta que no aparecía en **ninguna** entrada: `VEN-092` Renekton, Brute.

---

## Paso 2 primero: las reglas, y la que decide dos candidatas

**Chequeo de bans:** las 17 cartas de la sección grepeadas por `[BANNED` en `data/corpus_flat.txt`:
**ninguna baneada ni restringida en ningún formato.**

| regla | verbatim | qué decide |
|---|---|---|
| **185** | ***"Tokens are not cards."*** | mata la mitad de 2.3 |
| **416.1** | *"Recycling cards is the action in which a player takes one or more **cards** from a specific zone…"* | ídem |
| **416.3** | *"When Recycling is listed as a Cost, the action must be able to be completed for the cost to be paid."* | ídem |
| **455** | *"A Recall is when a Permanent is relocated **from anywhere to its Base** without it being a Move."* | el defecto de 2.4 |
| **383.2.a.1** | *"Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled."* | el precio de 2.1 |
| **194.1.c** | *"Spells, Triggered Abilities and Activated Abilities that instruct them to gain one or more points."* | R2 = A en 2.1 |
| **470** | *"A player may only Score, from either method, once per Battlefield per turn."* | el techo de 2.2 |
| **469.1 / 469.2** | *"Conquer: A player gains Control of a Battlefield they did not yet Score this turn." / "Hold: A player maintains Control…"* | 2.1 y 2.2 |
| **315.2.b.2** | *"The Turn Player Holds all Battlefields they Control."* | 2.1 |
| **710** | *"Units on the board are evaluated according to their current Might."* | el orden de 2.2 |
| **709** | *"A Unit 'becomes Mighty' at the moment its Might changes from being less than 5 to being 5 or greater."* | el umbral análogo, con ejemplo trabajado |
| **377 / 378** | *"Activated Abilities are repeatable effects with a cost." / "The controlling player chooses when and whether to activate"* | el *Ready me* de 2.2 y el +1 Might de Renekton |
| **808.1.d.1** | escudo heal/exhaust/recall borra el Deathknell | comprobado en 2.4: **no** muerde |
| **315.1.b** | *"The Turn Player readies **all** Game Objects they control that are able to be readied."* | 2.4 y 2.5 |

---

## 2.1 `shen-duo-mutual-hold` — la cláusula que castiga es la que habilita · ENGINE

```
VEN-138 | Shen, Leader of the Kinkou Order | Unit | Order | E6 P2 M7 | [Shield] ... When I hold, if
         there is exactly one other unit you control here, you score 1 point.
VEN-042 | Shen, Scourge of Shadows | Unit | Calm | E5 P1 M6 | When I hold, if there is exactly one
         other unit you control here, draw 1.
VEN-147 | Eye of Twilight | Legend | Calm/Order | - | [Action] :rb_exhaust:: Give a friendly unit [Tank] this turn.
```

Order + Calm → `VEN-147`, exacto. **Cada Shen es el *"exactly one other unit"* del otro**, así que
los dos disparan.

> `[1:41] he's not as powerful as uh Shen, Leader of the Kinkou Order. However, if both Shens are
> holding together, you'll draw an extra card and score an extra point every turn. When combined with
> strong battlefields like Grove of the God Willow, this Shen duo can really spiral out of control.`
> — Riftlab, *"How to Play SHEN"*, 2026-07-29, https://www.youtube.com/watch?v=MU0JNWKwZ50

**La cuenta por turno**, contra las cantidades que la entrada declara: el Hold en sí puntúa 1
(315.2.b.2 → 469.2 → 471.1), el `VEN-138` suma 1 más **por habilidad** (194.1.c, R2 = A, así que 470 no
lo tapa) y el `VEN-042` roba 1. **2 puntos y una carta, por 0 de coste continuo.**

**El precio, que la fuente no nombra:** *"exactly one"* es una cláusula condicional inmediatamente
posterior a la Condición, y **383.2.a.1** la vuelve parte de la Trigger Condition. Un tercer cuerpo
tuyo ahí no diluye el premio: **borra los dos disparos**. La guarnición tiene que ser de dos, y de
dos nada más. Que sobrevivan depende de que sean 7 y 6 de Might (8 el Leader defendiendo, por su
`[Shield]`), que es exactamente por qué la restricción es soportable.

**Veredicto: entra, ENGINE.**

---

## 2.2 `renekton-dominus-double-conquer` — el orden es todo, y son dos puntos, no ocho · ENGINE

```
VEN-092 | Renekton, Brute | Unit | Body | E5 M4 | :rb_energy_1:: Give me +1 :rb_might: this turn.
         When my Might becomes 10 or more, empower me. [Empowered] I have [Deflect] and [Ganking].
VEN-142 | Dominus | Spell | Fury/Body | E4 | [Action] This turn, double a unit's Might and give it
         ":rb_rune_rainbow::rb_rune_rainbow:: Ready me."
```

> `[0:50] Renekton Brute, which has a repeatable effect of one energy to give plus one might this
> turn. And when his might becomes 10 or more, you can empower him. … [1:16] You pay one to make him
> a five. Then you play Dominus to make him a 10. And then you can even ready him to go for both
> battlefields on a single turn.`
> — Turn 'em Sideways!, 2026-08-11, https://www.youtube.com/watch?v=oVU14RDZklg

**El orden no es reversible y vale escribirlo:** 4 → +1 → **5** → doble → **10**, y el umbral se cruza.
Al revés es 4 → doble → 8 → +1 → **9**, y no pasa nada. 710 evalúa por Might actual, y 709 es el
umbral análogo con ejemplo trabajado.

**La clase la bajo, a propósito.** #62 la archiva como *"BURST/CHAIN (clase a decidir)"*. Un BURST
tiene que llegar a **8 en un solo evento de scoring** y un CHAIN a 8 repartido sin turno del rival en
el medio. Esto llega a **dos**: 470 tapa el Score en uno por battlefield por turno y un Duelo tiene dos
battlefields (485.4). Y **no es repetible por turno**: Dominus es un hechizo y su regalo dura *"this
turn"*, así que son tres veces por partida. **ENGINE**, y la entrada lo dice con esas palabras.

Lo que sí es exacto y se verificó contra las cantidades propias: 5 Energía y 2 Power por dos puntos, y
perder el primer battlefield al ganquear no devuelve el punto (471.1 ya lo cobró; 323.6 sólo saca el
Control).

**Veredicto: entra, ENGINE, con la clase corregida.**

---

## 2.3 `rumble-forerunner-mech-recursion` — **la fuente recicla un token, y las reglas no la dejan** · ENGINE

```
SFD-026 | Rumble, Hotheaded | Unit | Fury | E4 M4 | Your Mechs each have [Assault]. When I conquer,
         you may recycle another friendly unit to play a Mech from your trash. Reduce its Energy cost
         by the Might of the unit you recycled.
SFD-021 | Ferrous Forerunner | Unit | Fury | E6 P1 M6 | [Deathknell] — Play two 3 :rb_might: Mech unit
         tokens to your base.
```

> `[9:32] then for three you can just replay a forrunner and you can just do this like basically
> infinitely **and you can even use the tokens if you want to replay the runner like you can just
> recycle a token and then like you reduce its cost by three**`
> — Katchouze - Riftbound, 2025-12-27, https://www.youtube.com/watch?v=I8ZplUz7Jmg

**Esa mitad no funciona, y son tres reglas en fila:**

> **185** — *"Tokens are not cards."*
> **416.1** — *"Recycling cards is the action in which a player takes one or more **cards** from a
> specific zone and then puts it on the bottom of the corresponding deck."*
> **416.3** — *"When Recycling is listed as a Cost, the action must be able to be completed for the
> cost to be paid."*

Reciclar está definido **sólo sobre cartas**. Un Mech token no es una carta, así que *"recycle another
friendly unit"* no puede tomarlo y el coste no se puede pagar con él. **El issue repite el error**
(*"Los dos tokens de 3 Might del Deathknell son el combustible del reciclado"*).

Es la **segunda vez en el mismo issue** que una fuente choca contra esto: la contradicción 7 de la
sección 5 son dos jugadores adivinando que no se puede reciclar un token y diciendo *"but I don't
know"*. El reglamento lo contesta en una oración.

**Lo que sobrevive es real y es lo que la entrada declara:** un conquer compra de vuelta al Forerunner
barato, y cada muerte suya paga dos cuerpos. El combustible tiene que ser una **carta** de unidad, y el
descuento es su Might. Con eso el ciclo cuesta un cuerpo por pasada, necesita una muerte del Forerunner
cada vez y un conquer cada vez — el *"basically infinitely"* de la fuente es falso, como el propio #62
ya decía.

**Veredicto: entra reescrita en su motor, ENGINE.**

---

## 2.4 `tianna-guardian-angel-forge-god-lock` — el escudo que la salva es el que apaga el candado · ENGINE

```
SFD-060 | Tianna Crownguard | Unit | Calm | E7 P2 M4 | [Deflect] ... While I'm at a battlefield,
         opponents can't gain points.
SFD-051 | Guardian Angel | Gear | Calm | E2 M+1 | [Equip] :rb_rune_calm: ... [Effect] If I would die,
         kill Guardian Angel instead. Heal me, exhaust me, and recall me.
SFD-085 | Ornn, Forge God | Unit | Mind | E6 M4 | [Deflect 2] [Weaponmaster] I have +1 :rb_might: for
         each friendly gear.
```

> `[1:09] let's hearken back to Orn[n] in the days of old. Before Sprite Fountain existed, Orn[n]
> players would stack up a forge god with [Svellsongur] and Ornn's shields, plop a Ti[a]na on that
> battlefield with a guardian angel, and lock your opponents out of scoring points for the rest of the
> game. But assembling that combo cost 13 energy that you'd have to assemble over two turns`
> — Poro Party TCG, 2026-08-20, https://www.youtube.com/watch?v=cdXSpMuP9D4

**#62 revisa la trampa correcta y se le pasa la más grande.** La que revisa es `808.1.d.1` — el escudo
de la familia heal/exhaust/recall **borra el Deathknell** de lo que salva. No muerde: Tianna no tiene
Deathknell. Correcto.

La que se le pasa: la misma reposición **la manda a la base**.

> **455** — *"A Recall is when a Permanent is relocated **from anywhere to its Base** without it being
> a Move."*

Y el candado dice ***"While I'm AT A BATTLEFIELD"***. Entonces la carta que la mantiene viva es la que
la apaga. Vuelve además **exhausta**, así que no puede caminar de vuelta el mismo turno: la readea el
Awaken siguiente (315.1.b) y recién ahí hace su Standard Move (144.1.a). **El escudo compra su vida al
precio de un turno entero de candado.** Eso no la refuta — sigue valiendo el espacio — pero una entrada
que no lo dijera estaría vendiendo un candado que no puede sostener.

**Aritmética propia contra la de la fuente:** Tianna E7 P2 + Ornn E6 + Guardian Angel E2 + su `[Equip]`
de 1 Calm = **15 Energía y 3 Power**. La fuente dice 13. Anoto la diferencia en la entrada en vez de
repetir su número.

**Contra `tianna-wildclaw-point-lock`, que ya está en el catálogo:** cartas distintas y sostén distinto
— aquélla usa la ininvocabilidad de Alpha Wildclaw y dos Galio y nunca sale del battlefield; ésta usa
una reposición de muerte y un cuerpo `[Deflect 2]` y sobrevive a lo que la otra no.

**Veredicto: entra, ENGINE, con el defecto escrito.**

---

## 2.5 `mel-matriarch-fizz-removal-chain` — tres pagos de un Empower, pero sólo uno se repite · ENGINE

```
VEN-104 | Tail-Cloaked Matriarch | Unit | Chaos | E4 M4 | [Empower] :rb_energy_2::rb_rune_chaos: ...
         When I become [Empowered], you may choose a unit in your trash with Energy cost no more than
         :rb_energy_3: and Power cost no more than :rb_rune_rainbow:. Play it to your base, ignoring its cost.
SFD-140 | Fizz, Trickster | Unit | Chaos | E3 P1 M3 | When you play me, you may play a spell from your
         trash with Energy cost no more than :rb_energy_3:, ignoring its Energy cost. Then recycle it.
VEN-151 | Soul's Reflection | Legend | Mind/Chaos | - | When you empower something else, empower me.
         Disempower me, :rb_exhaust:: Give a unit at a battlefield -2 :rb_might: this turn.
```

> `[10:46] Tail-Clo[ake]d Matriarch. … if you empower it, your legend gets empowered, you then play out
> Fizz, and then with Fizz, you can combo off any of these decks. So, you can use your legend Mel to
> give something on a battlefield minus two, and maybe now it's in range of a gust.`
> — GG Haven, *"Everyone Underestimated Mel... Until Now"*, 2026-07-24,
> https://www.youtube.com/watch?v=C1ISYwpVGvA

**Fizz entra por las dos barras al dígito:** *"no more than 3 Energy and no more than 1 rainbow Power"*
contra E3 P1. Un punto más en cualquiera de los dos ejes y la Matriarch no lo puede elegir.

**Y "ignoring its cost" es más ancho que la propia redacción de Fizz**, que es una diferencia real: la
Matriarch dice *"ignoring its **cost**"* y por eso el Power de Fizz también se perdona, mientras que
Fizz dice *"ignoring its **Energy** cost"* y su recordatorio aclara *"You must still pay its Power
cost"*.

**Lo que la caminata acota:** la Matriarch imprime *"Use only if not Empowered"*, y nada en estos
dominios la des-empodera — la leyenda se des-empodera a **sí misma**. Así que su tres-por-uno es
**una vez por copia**, no un motor. Lo que sí se repite es la remoción: cualquier Empower que pagues en
cualquier lado re-empodera a la leyenda gratis, y el exhaust de su coste se resetea en el Awaken
(315.1.b). Una remoción por turno. Vender el paquete entero como repetible sería el mismo error que #34
corrigió en `matriarch-of-war-empower-ready`, donde *"seis en toda la partida"* se estaba presentando
como motor.

**Veredicto: entra acotada, ENGINE.**

---

## Lo que queda de la sección 2, sin caminar

Las 14 filas de la tabla 2.6 (`dunebreaker-trinity-force-hold`, `boneshiver-skyfall-hold-channel`,
`lucian-skyfinity-double-conquer`, `vilemaw-grove-double-draw`, `vi-ride-the-wind-double-conquer`,
`confront-vi-stormbringer`, `annie-stubborn-star-crossed-lock`, `apothecary-pridestalker-buff`,
`faefolk-star-spring-drag`, `darius-trifarian-thrill`, `sett-first-mate-windswept-hillock`,
`sprite-fountain-aspiring-engineer`, `danger-zone-marai-spire`, `poppy-confront-blood-rose`).

Lo que **ya está hecho** para quien las siga: los **36 códigos** de esas filas están grepeados verbatim
de `data/corpus_flat.txt` y **los 36 existen**; **ninguno está baneado**. Tres cosas que saltan de esa
lectura y que hay que llevar puestas:

- **`lucian-skyfinity-double-conquer` declara "0 a 4 puntos en un turno".** `SFD-113 Lucian, Merciless`
  dice *"The first time I conquer **each turn**, ready me"* — una sola vez por turno, no una por
  conquer. Con 470 tapando el Score en uno por battlefield y dos battlefields en un Duelo, 4 puntos
  necesita que `SFD-115 Trinity Force` (*"When I hold, score 1 point"*) y `SFD-030 Skyfall of Areion`
  (*"My hold effects are also conquer effects, and vice versa"*) los pongan por habilidad (194.1.c,
  R2 = A). La cuenta hay que hacerla; la clase declarada por la fuente no alcanza.
- **`danger-zone-marai-spire` y `sprite-fountain-aspiring-engineer` chocan con avisos ya escritos.**
  `SFD-211 Marai Spire` dice *"**While you control this battlefield**, friendly [Repeat] costs cost 1
  Energy less"*, y 190.1 más 190.6.d segunda oración hacen que un battlefield que vos aportás arranque
  **sin controlador** — tomarlo es parte del coste, como ya dice `ezreal-marai-spire-free-repeat`.
- **`apothecary-pridestalker-buff` no es una leyenda sin entrada:** `UNL-183 Pridestalker` ya está en
  `pridestalker-mighty-draw`. La fila lo admite en su propia columna.

---

## Balance de la sección 2

| entrada | clase | leyenda que estaba en cero | veredicto |
|---|---|---|---|
| `shen-duo-mutual-hold` | ENGINE | `VEN-147` Eye of Twilight | **nueva, verified** |
| `renekton-dominus-double-conquer` | ENGINE | `VEN-141` Butcher of the Sands | **nueva, verified**, clase bajada de BURST/CHAIN |
| `rumble-forerunner-mech-recursion` | ENGINE | `SFD-181` Mechanized Menace | **nueva, verified**, reescrita en su motor |
| `tianna-guardian-angel-forge-god-lock` | ENGINE | `SFD-189` Fire Below the Mountain | **nueva, verified**, con el defecto escrito |
| `mel-matriarch-fizz-removal-chain` | ENGINE | `VEN-151` Soul's Reflection | **nueva, verified**, acotada |

**Catálogo: 143 entradas, las 143 `verified`.** Cero readings nuevas.
