# Issue #62, sección 2.6 — la tabla de catorce, fila por fila

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16 · **Catálogo al empezar:** 143.

**Resultado: 13 entradas nuevas, las 13 `verified`; 1 fila descartada por duplicar una regla ya
catalogada.** Ninguna llegó a BURST ni a CHAIN: las 13 son **ENGINE**, y dos de las que #62 declaraba
como BURST se corrigieron a mano.

Cinco leyendas más que estaban en cero: `OGN-255` Nine-Tailed Fox, `OGN-249` Relentless Storm,
`OGN-269` The Boss, `UNL-203` Keeper of the Hammer, y `SFD-183` Purifier (tres entradas de una).

Los **36 códigos** de la tabla fueron grepeados verbatim de `data/corpus_flat.txt`: los 36 existen y
**ninguno está baneado ni restringido**. Los **14 videos fueron bajados y leídos por esta sesión** con
`yt-dlp`; **cuatro timestamps de #62 estaban corridos** y se corrigieron contra el subtítulo real.

---

## Correcciones a la tabla de #62

| fila | lo que decía #62 | lo que dice la evidencia |
|---|---|---|
| `lucian-skyfinity-double-conquer` | *"0 a 4 puntos en un turno"* | la fuente dice *"zero points to eight points in a matter of **two turns**"*. Las dos cuentas son la misma vista sobre una ventana distinta y las dos son correctas; la clase no es BURST ni CHAIN, porque 8 llega con el turno del rival en el medio |
| `vi-ride-the-wind-double-conquer` | **BURST** (2 puntos de la mano) | dos puntos no son ocho en un evento de scoring → **ENGINE**. Las dos fuentes lo describen como un cierre desde 6, no como un combo desde 0 |
| `confront-vi-stormbringer` | *"three-card combo, double conquer win"* | la fuente que cita habla de un **wipe de tablero** y no menciona dos battlefields. El segundo conquer es de esta caminata, y es legal por #58 (guarnición vacía = Conquer sin combate) |
| `darius-trifarian-thrill` | leyenda `OGN-253` Hand of Noxus | **ilegal**: Hand of Noxus es Fury/**Order** y `UNL-184 Thrill of the Hunt` es Fury/**Body**, así que 103.1.b.1 no la deja en ese mazo. El shell tiene que ser Fury/Body, que es el que la fuente juega |
| `apothecary-pridestalker-buff` | *"— (`UNL-183` sí está)"* | correcto, y se cataloga igual porque el mecanismo no comparte ninguna carta con `pridestalker-mighty-draw` |
| `danger-zone-marai-spire` | descuento de `[Repeat]` | **no entra**: es la misma regla que ya cataloga `ezreal-marai-spire-free-repeat`, cuyo propio `terminatesIn` la enuncia sobre *"every E2 [Repeat] spell in the deck (and Bellows Breath's Energy+Power one)"* |

---

## La fila que NO entra, y por qué

**`danger-zone-marai-spire`.** La cita se verificó y es correcta:

> `[3:51] Marai Spire. This card is absolutely broken and I love it. While you control it, friendly
> repeat costs cost one less. Remember danger zone? Its repeat cost is one rune and one power. With
> Marai Spire, the repeat cost becomes only one power.`
> — GG Haven, *"STOP Playing Rumble Wrong!"*, 2026-01-16, https://www.youtube.com/watch?v=6F7DACkuVKM

La aritmética también: `SFD-182 Danger Zone` tiene `[Repeat] 1 Energy + 1 rainbow` y Marai Spire baja
*"friendly [Repeat] costs"* en 1 Energía, así que queda en 1 rainbow. (La fuente le dice "rune" a la
Energía; el número es el mismo.)

**Pero el mecanismo ya está catalogado.** `ezreal-marai-spire-free-repeat` no es una entrada sobre un
hechizo: su propio `terminatesIn` dice *"every E2 [Repeat] spell in the deck (and Bellows Breath's
Energy+Power one) executes twice for its printed base cost, for as long as you hold Marai Spire;
820.1.c.3 caps it at one extra execution each, so it never loops"*. Danger Zone es una instancia de esa
frase, no una línea distinta. El único argumento a favor de una entrada aparte es que el shell es
Fury/Mind bajo `SFD-181` Mechanized Menace en vez de Calm/Mind — y eso no cambia el mecanismo, que es
la prueba que este catálogo pide. **Se registra acá y no se duplica.**

El aviso de `ezreal-marai-spire-free-repeat` aplica igual: **190.1** más la segunda oración de
**190.6.d** hacen que un battlefield que vos aportás arranque **sin controlador**, así que
*"While you control this battlefield"* está apagado hasta que lo tomás — tomarlo es parte del coste.

---

## Las trece que entran

Cada una lleva su cita verificada, su leyenda comprobada contra 103.1.b.1 y su chequeo de trampas en la
propia entrada de `data/combos.json`. Acá va lo que **cada caminata agregó por encima de la fuente**:

| entrada | clase | lo que la caminata agrega |
|---|---|---|
| `dunebreaker-trinity-force-hold` | ENGINE | las dos cláusulas del Dunebreaker se pelean: *"two or fewer cards in your hand, I enter ready"* contra *"When I hold, draw 2"* |
| `boneshiver-skyfall-hold-channel` | ENGINE | Skyfall **no** duplica el disparo en un conquer: lo mete en las dos categorías, y cada evento lo resuelve una vez. La forma que sí paga dos veces necesita Reckoner's Arena (823.1.b) |
| `lucian-skyfinity-double-conquer` | ENGINE | *"the first time I conquer **each turn**"* es el techo: dos battlefields, cuatro puntos, y ocho recién en dos turnos |
| `vilemaw-grove-double-draw` | ENGINE | el battlefield es azaroso (485.5) y dos robos por turno sobre un mazo finito es la responsabilidad de 431.1.a, no ganancia pura |
| `vi-ride-the-wind-double-conquer` | ENGINE | 416.3 (trash vacío = no hay Might) y 185 (ningún token tuyo puede ser esa carta); clase bajada de BURST |
| `confront-vi-stormbringer` | ENGINE | Vi tiene que estar **en tu base** cuando se lanza Stormbringer, y el wipe es lo que hace el conquer gratis (#58) |
| `annie-stubborn-star-crossed-lock` | ENGINE | nada está descontado: 7 Energía y 2 Power por ciclo, **todos** los ciclos — la misma aritmética que sostiene el `excludes` de Blitzcrank |
| `apothecary-pridestalker-buff` | ENGINE | hace falta un **tercer** cuerpo; los dos Apothecary no se rebotan entre sí (lo dice la propia fuente) |
| `faefolk-star-spring-drag` | ENGINE | 190.3.a.1 keyea Contested en el controlador de la unidad movida, así que el rival es el **Atacante en tu turno** (#58); y Star Spring pide una unidad **no-token**, que 185 vuelve una restricción real |
| `darius-trifarian-thrill` | ENGINE | leyenda corregida a Fury/Body; y **no** relanzar a Darius con el propio Thrill, porque eso abre el nudo de tiempo por el que se abrió R26 — con cualquier otra unidad da los mismos 8 sin ninguna lectura |
| `sett-first-mate-windswept-hillock` | ENGINE | el orden es forzado: *"Units **here** have [Ganking]"*, así que el Hillock tiene que ser el primer conquer; y 810.1.c.3 lo vuelve un destino nuevo, no un move extra |
| `sprite-fountain-aspiring-engineer` | ENGINE | 816.1.b: los Sprites son atacantes y **jamás** pueden Holdear; y *"enters ready"* no es un ready (415.1), la distinción que fijó la lente #56 |
| `poppy-confront-blood-rose` | ENGINE | los dos readies **no** son redundantes: 383.2.a.1 vuelve condicional el de Poppy (*"if an opponent's score is within 3 points"*) y el de Confront no lo es, así que el par cubre los dos estados de tablero |

---

## Reglas que hicieron trabajo acá y que no estaban usadas así antes

- **185** *"Tokens are not cards."* — decide tres entradas: la fuente del Apothecary, el `Recycle 1 from
  your trash` de Vi (`vi-ride-the-wind`, `confront-vi-stormbringer`) y el *"non-token unit"* de Star
  Spring. Es la misma regla que refutó media candidata en la sección 2.3.
- **416.3** *"When Recycling is listed as a Cost, the action must be able to be completed for the cost
  to be paid."* — el trash vacío es un tope duro para la Might de Vi, no una molestia.
- **383.2.a.1** — aparece tres veces (Shen, Poppy, y el 7+ de la Plaza en la sección 5). Cada vez que
  una carta dice *"if …"* pegado al *"When …"*, eso es Trigger Condition.
- **810.1.c.3** *"It does not give additional abilities or activations of Movement, only new options for
  the Standard Move."* — por qué Sett cruza **una** vez y no dos.
- **455** — un retorno **a la mano** no es un Recall (`annie-stubborn-star-crossed-lock`), y un Recall sí
  manda a la base (la sección 2.4).

---

## Balance

| | |
|---|---|
| filas de la tabla 2.6 | 14 |
| entradas nuevas `verified` | **13** |
| descartadas por duplicar mecanismo | 1 (`danger-zone-marai-spire`) |
| clases corregidas respecto de #62 | 2 (las dos BURST → ENGINE) |
| leyendas corregidas | 1 (`darius-trifarian-thrill`, ilegal como la declaraba #62) |
| timestamps corregidos | 4 |

**Catálogo: 156 entradas, las 156 `verified`.** Cero readings nuevas.
