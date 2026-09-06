# Caminata de #46 — la minería de internet, contrastada contra el reglamento

**Fecha:** 2026-09-06 · **Rules version:** Core Rules 2026-07-16 · **Issue:** #46
**Resultado: 12 entradas nuevas verified, 1 candidata reescrita de raíz, 1 bajada de clase,
2 afirmaciones de la comunidad refutadas, 7 fuentes nuevas incorporadas y 5 no incorporadas.**

Orden de trabajo pedido: §5 contradicciones → §4 fuentes → §2/§3 candidatas → §1 Heimerdinger.
El voto del usuario sobre la lectura de §1.3 llegó a mitad de la caminata: **R30 = B**.

---

## 0. Método: qué se pudo abrir y qué no

### 0.1 YouTube sí. `yt-dlp` baja subtítulos sin login, confirmado hoy

14 videos bajados con `yt-dlp --write-auto-subs --write-subs --sub-langs "en.*,es.*,fr.*"
--skip-download --sub-format vtt`. Cada cita de abajo se leyó en el `.vtt` aplanado a
`[mm:ss] texto`, con su contexto de ±20 segundos. Los timestamps que publico son los que están
en el archivo, que a veces difieren en 1–3 segundos de los de #46 porque la pista `en` (limpia)
y la `en-orig` (auto) cortan distinto. **Ninguna cita de #46 sobre YouTube resultó falsa.**
Dos salieron mal atribuidas y las corrijo abajo (§0.3).

### 0.2 Reddit NO. La técnica de #46 §0(a) murió en horas

#46 documentó esta misma mañana que se podía leer Reddit cargando `www.reddit.com` en un
navegador real y pidiendo el JSON con el request context. **Hoy ya no.** Cinco vías probadas,
las cinco fallan:

| vía | resultado |
|---|---|
| `curl` con UA de Chrome a `www.reddit.com/.../.json` | **403** |
| `r.jina.ai` sobre `www.reddit.com` | **403** — *"You've been blocked by network security. To continue, log in to your Reddit account or use your developer token"* |
| Playwright headless, perfil nuevo, `context.request.get` | **403** |
| Playwright **headed** con Chrome real, perfil nuevo | página 200, body de 240 caracteres: *"Prove your humanity — We're committed to safety and security. But not for bots."* |
| Playwright headed con una **copia del perfil del MCP** (`~/.personal-claude/playwright-data`, con sus cookies) | idéntico: **CAPTCHA** |
| `old.reddit.com/.../.json` | **302** |
| mirrors `redlib.catsarch.com` / `safereddit.com` | **403** y muro Anubis |

CAPTCHA es la excepción donde Playwright no sigue. **Consecuencia dura: las cinco citas de
Reddit de #46 NO entran como `sources`** — una URL que no abrí no es una cita. Lo que sí hice
fue verificar su **contenido** contra las Core Rules y el corpus por mi cuenta, que es evidencia
más fuerte que la cita; está en §5.

### 0.3 Dos atribuciones de #46 corregidas, y una carta fantasma identificada

- Las citas de **Elder Dragon / Flurry of Blades** (`[10:50]`) y **Karthus Eternal** (`[6:15]`)
  no son del video de Zelonius: son de **`Ns_hcbulnIs`** — *"The Best Unleashed Combos You Don't
  Know About!"*, **MoreThatMillGuy**, 2026-04-15, 1.205 vistas. Verificado abriendo ambos.
- La **"Val'mar"** que #46 dejó como *"ese nombre no existe en el corpus. No la ingiero"* es
  **`UNL-060 Vilemaw`**. El subtítulo automático la destroza, pero la descripción hablada la
  identifica sin ambigüedad: `[2:59] Val'mar being eight recycle two for an eight might unit. It
  has ambush. […] enemy units here with less might than me don't deal combat damage when I hold
  draw one.` Contra el corpus:
  ```
  UNL-060 | Vilemaw | Unit | Calm | E8 P2 M8 | [Ambush] (You may play me as a [Reaction] to a battlefield where you have units.) Enemy units here with less Might than me don't deal combat damage. When I hold, draw 1. [Tags: Shadow Isles, Spider]
  ```
  E8, P2 ("recycle two" = pagar 2 Power reciclando runas), M8, [Ambush], y las dos frases
  palabra por palabra. **No se ingiere igual**, porque la línea que describe (Bone Skewer
  `UNL-139` mete un bicho del rival en un battlefield y lo stunea, Vilemaw le impide devolver
  daño) es una interacción de tempo, no un motor: no produce nada repetible ni acumulable. Queda
  registrada acá para que la próxima caza no la vuelva a buscar como carta inexistente.

---

## Bloque de reglas, hecho primero y en bloque

Como en el walk de las nueve, **todas** las citas que estas entradas usan se abrieron en
`data/Riftbound-Core-Rules-2026-07-16.txt` antes de caminar nada. **41 citas distintas, las 41
dicen lo que la entrada dice que dicen.** Las que hicieron el trabajo pesado:

| regla | verbatim | qué decidió |
|---|---|---|
| **335** | *"If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown or Combat, and it is the Main Phase, the Turn Player receives priority. If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown, and it is **any other phase of the turn, proceed to the next substep, step, phase, or turn**."* | **Nadie recibe prioridad en la Beginning Phase si el chain está vacío.** Es la regla que faltaba detrás de la cita del Gutter Palace y la que refuta la línea del video de Flurry of Feathers |
| **423.1.a.2** | *"Stunned Units lose the Stunned status during step 3d of the end of turn cleanup."* | **Un Facebreaker dura TODO el turno.** Disuelve la objeción de presupuesto que #46 puso sobre Twilight Reveler |
| **466.1.a.2** | *"Insert '3d. Recall Attackers present at the Battlefield if Defenders are still present.'"* | El número real detrás del `444.1.a.2` que cita el OP de Reddit — que en este reglamento es *"Pay is an action that interacts with Energy and Power"* |
| **464.2.c.3** | *"Units at the Contested Battlefield controlled by the Attacker or Defender gain the Attacker or Defender designation now, as appropriate."* | El Recruit recién nacido **también ataca**: sube el umbral del defensor de 4 a 5 Might, un escalón por encima de lo que dice la fuente |
| **466.5** | *"the player with Units remaining here Establishes Control **if they didn't already control this Battlefield**"* | Por qué el battlefield tiene que ser YA del rival: si no, cada pasada le regala un Conquer |
| **383.2.a.1** | *"Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled."* | El `if you have 7+ units here` del Plaza es Condición: si no se cumple, la habilidad **nunca llega al chain** y no hay nada a lo que responder |
| **477.1.b.1.a** | los rasgos copiables son *Name, Super Type, Type, Tags, Cost, Domain, Rules Text* | **Might no se copia** — mata la lectura ingenua de Shady Spectacles |
| **356.1.c** | *"Effects that refer to the Base Cost of the card refer to the Printed or Copied Base Cost […] and not the modified Base Cost"* | Confirma sola la afirmación de Reddit sobre el coste de `[Repeat]` (§5.4), sin necesitar el hilo |
| **103.3.a** | *"12 Rune Cards"* | El Rune Deck es de 12. Es el techo que refuta el número publicado del OTK de Heimerdinger (§1) |

**Chequeo de baneos, misma pasada.** Las **25 cartas distintas** de estas 12 entradas se
grepearon contra el marcador `[BANNED` del corpus. La lista de baneados del corpus son 11
printings (`OGN-168`, `OGN-177`, `OGN-182`, `OGN-276`, `OGN-284`, `OGN-285`, `OGN-290`,
`OGN-292`, `SFD-020`, `SFD-122` y `OGS-019` restringida en 2v2). **Ninguna de las 25 está en
esa lista.**

---

# §5 — Las cinco contradicciones

Se caminaron primero, como pidió el encargo: una fuente que dice que una entrada `verified` no
funciona es lo más caro del issue.

## 5.1 "Lux gana bloqueando las 12 runas" — NO es una contradicción

Frodan, `t7o9_0X2oI0` — leído en el archivo, el pasaje es `[9:53] of you who don't know what Lux
is, Lux [9:54] is infinite combo deck that kind of [9:56] revolves around them getting to 12
[9:58] runes.` (#46 lo cita en `[9:49]`, que es donde arranca la frase anterior sobre Divine
Judgment.)

#46 la marca como contradictoria con el cierre del #44 (*"el techo de 12 runas no existe"*,
commit 3c62917). **Son dos afirmaciones distintas y las dos son verdad.**

- Lo que #44 retiró fue *"la producción de Power de un mazo normal está topeado por **12
  reciclados en toda la partida**"* — un techo de **producción de Power**, que es falso porque
  161.2.b devuelve la runa al Rune Deck y 315.3.b/430.4.a la canalizan de vuelta.
- Lo que dice Frodan es que el mazo **quiere las 12 runas en el board**, que es exactamente lo
  que `lux-infinite-energy` ya pone en sus propios prerequisites: *"12 runes in play (the deck's
  whole Rune Deck channeled)"*.
- Y **103.3.a** fija el Rune Deck en *"12 Rune Cards"*, así que "llegar a 12 runas" es
  literalmente "canalizar el Rune Deck entero".

**Veredicto: sin cambios en el catálogo.** La cita de Frodan no se ingiere como source porque no
aporta nada que la entrada no diga mejor, y es un comentario al aire en un video de coaching.

## 5.2 Tianna Crownguard — la comunidad cita mal la carta, y el error la debilita

Texto verbatim, grepeado:
```
SFD-060 | Tianna Crownguard | Unit | Calm | E7 P2 M4 | [Deflect] (...) While I'm at a battlefield, opponents can't gain points. [Tags: Elite, Demacia]
```

El hilo `1tz60cl` (que **no pude abrir**, §0.2) trae según #46 a u/MrPopCorner diciendo
*"Tianna states: while I'm on a battlefield, opponents can't gain points **this turn**"*. La
carta **no dice `this turn`**. La restricción es continua mientras Tianna esté en un
battlefield, no de un turno.

`tianna-wildclaw-point-lock` ya está del lado correcto: su `uses` cita la frase exacta y su
`terminatesIn` dice *"the opponent's score is frozen **for as long as Tianna stands** at a
battlefield"*. **Sin cambios.** La cita de Reddit no entra (no abrí el hilo) y además no
haría falta: la evidencia es el corpus.

## 5.3 `[Temporary]` sobre Equipment — la errata que dos comentaristas creen recordar NO existe

#46 registra que en `psOFlmsfvNM` dos comentaristas creen que se errateó *"literally a day ago"*
para que `[Temporary]` funcione sobre Equipment, y que no lo resuelven en cámara.

**Abrí la página de errata de Riot del set más nuevo** —
`https://playriftbound.com/en-us/news/announcements/vendetta-errata-updates`, la misma URL que
`data/errata.json` cita como fuente de sus entradas del 2026-07-23. Nombra **ocho cartas**:
Draven Vanquisher, Emperor's Dais, Fizz Trickster, Diana Lunari, Stalking Wolf, **Astral Heron**,
Gangplank Naval y Resonating Strike. **Ninguna toca `[Temporary]` ni la interacción con
Equipment / gear attacheado.**

**Veredicto: la creencia de la fuente no está respaldada por la propia página de errata de Riot.
`data/errata.json` NO se toca.** Es además exactamente lo que manda CLAUDE.md: el fallo de la
find-string de ese overlay es el único mecanismo que mantiene honesto nuestro texto, y gastarlo
en una errata que nadie puede mostrar lo rompería.

**Beneficio colateral:** esa misma página confirma que nuestro corpus está al día en la carta
que sí importa para §3. Astral Heron fue erratada de *"your next card"* a *"the next card you
play this turn"*, y el corpus ya trae la forma nueva:
`VEN-044 | Astral Heron | ... the next card you play this turn costs :rb_energy_2::rb_rune_rainbow::rb_rune_rainbow: less.`

## 5.4 El coste de `[Repeat]` mira el coste original — verificado sin el hilo, y no toca nada

#46 pide chequear que `ava-achiever-hostile-takeover-conquer` no asuma lo contrario. **No lo
asume: en esa entrada no hay ningún `[Repeat]`.** Hostile Takeover (`SFD-202`) no lo tiene y Ava
(`OGN-107`) tampoco.

Y la afirmación de fondo la contesta el reglamento solo, sin el hilo:

> **356.1.c** — *"Effects that refer to the Base Cost of the card refer to the Printed or Copied
> Base Cost of said card, and not the modified Base Cost that is used when determining the total
> cost of the card."*

Un grep de `data/combos.json` por supuestos sobre coste reducido de Repeat da tres menciones de
"Repeat cost", todas en `platewyrm-egg-defender-gate` y `ezreal-marai-spire-free-repeat`, y
ninguna afirma lo contrario de 356.1.c. **Sin cambios.**

## 5.5 Los títulos mienten, y no hay infinito mono-azul

Las dos son notas de método, no cambios de catálogo, y las dos las confirmo:

- `TGTyb49Uprs` se llama *"Ornn Infinite Loop…"* y su combo es Malzahar + Heimerdinger + Ekko.
  Es la misma trampa que CLAUDE.md ya registra para nombres de mazo, ahora para **títulos de
  video**. Se generaliza a: **el título de un video no es una afirmación caminable**, igual que
  el nombre de un mazo.
- `iNmJNV9IXWY` `[6:52] We have tried to make many, many versions of mono blue infinite work.`
  Negativo medido de la comunidad. **No se ingiere como hecho** — CLAUDE.md dice explícitamente
  que no se aceptan veredictos estructurales ("no existe X en el pool") sin caminar el set de
  validación, y la primera caza ya se equivocó así. Queda como pista para acotar cazas futuras,
  nada más.

---

# §4 — Las nueve fuentes nuevas: siete entran, dos no

Regla aplicada: entra la que **yo** abrí. Video = URL + timestamp + la frase del subtítulo
leída en el archivo.

| entrada | fuente | estado |
|---|---|---|
| `gemdragon-henge-vi-blind-fury` | YT `8FMsltx5Id4` | **ENTRA, y no es una cita: REFUTA la clase de la entrada.** Ver §4.1 |
| `pursuer-herald-recruits` | YT `GWWmYzWZQTY` + `X-ZZ0KzShFA` | **ENTRAN las dos** — `[9:34] The max you can score on that turn is two points. You It's not a OTK.` y `[3:10] combo does not immediately win the game.` |
| `jhin-fiora-facebreaker-recall` | YT `YFCh8GPYwVo` | **ENTRA** — `[19:44] pretty cool to see like a true infinite in the game. Uh and this isn't like very consistent` |
| `time-warp-hold-burst` | YT `iWt-ZBZqiIo` (español) | **ENTRA** — `[15:36] pasado de cero a cinco con un time war y con el segundo time war pasas de cinco a ocho y ganas la partida.` |
| `lux-infinite-energy` | YT `Lz08x8QOGtY` | **ENTRA** — `[45:40] happen, you need two sacrifices in your trash. You need a forge in your trash.` |
| `gutter-palace` y `gutter-palace-keeper-time-warp` | YT `OML3sV9JnC4` | **ENTRA en las dos** — `[19:23] This deck does not go infinite.` … `[19:31] take a max of four turns in a row.` y `[12:14] respond in that beginning step to get it on the chain. It just triggers at the start. It needs to be the condition.` |
| `karthus-leblanc-fragmented-temporary-draw` | YT `Ns_hcbulnIs` | **ENTRA** — `[6:27] to be drawing you four cards. Trigger an additional time.` |
| `brambleback-trinity-skyfall-conquer` | Reddit `1u3pe3n` | **NO ENTRA** — hilo inaccesible (§0.2). La entrada ya dice 3/2 y no necesita el hilo |
| `ava-achiever-hostile-takeover-conquer` | Reddit `1rmrh4p` | **NO ENTRA** — inaccesible; y la afirmación la contesta 356.1.c sola (§5.4) |

## 4.1 La fuente de `gemdragon-henge-vi-blind-fury` no es una cita: es una REFUTACIÓN de nuestra propia entrada

Ésta salió de §4 y terminó siendo lo más caro del issue, y no estaba en §5.

**Lo que dice el `notes` de la entrada, hoy:** *"the only full walkthrough is a video YouTube's bot
wall kept out of reach, so the recursion was reconstructed from the community's description and then
walked"* — y por eso se la **reclasificó INFINITE → ENGINE el 2026-09-03**, con el argumento *"a pass
is +1 Energy and −4 Power"*.

**Ese video es `8FMsltx5Id4` (Laggy, 2026-05-06, 11.298 vistas) y hoy se lee entero.** `yt-dlp` baja
sus subtítulos sin login. Son 85 líneas y las leí todas.

### Los tres puntos en que la reconstrucción del 2026-09-03 se equivocó

1. **Contó UN dragón por pasada. El autor juega SEIS.** De ahí sale el `+1 Energy` en vez de `+30`.
2. **Dijo que *"every Power costs a rune off the board (161.2.b) that nothing channels back"*.** En
   esta línea el Power **no** sale de reciclar runas: sale del **Ancient Henge**, que paga **Energy**.
   *"Pay **any amount** of Energy to [Add] that much rainbow"* — **una** activación convierte sin
   tope. Ésa es la pieza que la reconstrucción no tenía, y la que borra la escasez de Power.
3. **Citó Endless Riches (VEN-022) como prohibición de la recursión de Vi.** Esa carta está en la
   lista de **Rengar** que llegó 12ª; el walkthrough es la de **Volibear** que el propio video
   recomienda, y no la lleva.

**Lo que SÍ sobrevive de la refutación vieja:** el final con Blind Fury no es un deck-out (431.2
recicla el trash entero del rival por un solo punto). Eso queda.

### El ledger real, verificado carta por carta

Los seis que ciclan son los de **E5/M5**: 3× `OGN-001 Blazing Scorcher` (Fury) + 3× `OGN-131 Dune
Drake` (Body). **356.4.e** — *"If a discount applies a minimum cost, that minimum applies only to
that discount"* — hace que los dos Heralds apliquen: 5 − 2 = 3, 3 − 2 = **1 Energy**. El
**Gentle Gemdragon es E8 y baja a 4**, y **no es uno de los seis**: los tres se quedan en mesa para
siempre, porque Dancing Grenade **elige blanco** (*"Deal 2 to a unit"*) y nunca se apunta a un M8.
Por eso sus readies son siempre 3 × 2 = **6 por dragón jugado**, y no un conteo creciente.

| concepto | Energy | Power |
|---|---|---|
| 6 dragones × (+6 runas readeadas − 1 de coste) | **+30** | |
| Dancing Grenade (8 lanzamientos) | −2 | −8 |
| Detonate | −1 | −1 |
| Show of Strength | −2 | −1 |
| Ancient Henge re-jugado | −2 | −1 |
| Confront | −2 | |
| **subtotal** | **+21** | **−11** |
| el Henge convierte 11 Energy → 11 Power, 1:1, en una activación | −11 | +11 |
| **NETO POR PASADA** | **+10** | **0** |

### El ledger de CARTAS, que es el que el proyecto exige — y cierra EXACTO

**Consumidas por pasada: 11.** Seis dragones + Dancing Grenade + Detonate + Show of Strength +
Confront + Ancient Henge.

**Robadas por pasada: 11.** Detonate 2, Show of Strength 1 por unidad Mighty, Confront 1.

En el instante en que resuelve Show of Strength el mazo tiene **8 cartas** — Vi recicló, antes del
Detonate, los seis dragones + la Grenade + el **Confront que quedó en el trash de la pasada
anterior**, y después el Detonate y el Henge. Así que Show of Strength tiene que robar **exactamente
8**, o sea que el conteo de Mighty tiene que ser **exactamente 8**: tres Gemdragon (M8), Vi, los dos
dragones rejugados antes, y **exactamente DOS dragones residentes de 5 Might** que la Grenade nunca
apunta. Los Heralds son M3 y no cuentan nunca.

**Dos residentes no es una preferencia, es una restricción**, y nadie la había escrito: Show of
Strength es obligatorio, y si el conteo de Mighty supera el tamaño del mazo el robo hace **Burn Out
(431)** y le regala un punto al rival (194.1.d).

**Por qué el reciclado de Vi no es el de Garbage Grabber:**
> **416.5** — *"If **2 or more** cards are Recycled to the Main Deck **simultaneously**, they are
> placed on the bottom of that deck in a **random order**."* — y su ejemplo trabajado **es** Garbage
> Grabber, que recicla 3 de una.

Vi recicla **de a una**, sin exhaust y sin tope (*"Recycle 1 from your trash: Give me +1 Might this
turn"*). Una carta nunca son "2 or more simultaneously", así que **416.5 no se activa y el orden del
fondo es suyo** — que es exactamente lo que permite que Confront encuentre el Show of Strength que Vi
acaba de poner bajo un mazo vacío.

**Timing del Power:** el Henge nuevo entra **después** de que la Grenade gastó sus 8 Power, así que
cada pasada la paga la conversión del final de la anterior. **143.4** dice *"**Units** enter the
Board exhausted"* — sólo unidades, así que el gear entra ready y convierte el turno que cae. Y
**167** vacía el Rune Pool sólo al inicio de la Main Phase y al final del turno, así que todo flota
durante el turno de combo. La primera pasada hay que cebarla con 11 Power.

### El bloqueante era R15 — y el usuario la ruleó A el mismo día

Todo el ledger de Energy cuelga de **R15, que está ABIERTA** en #11.

- **R15 = A** (el contador de Dancing Grenade es por carta y por turno y sobrevive al trash): los
  lanzamientos hacen 2, 3, 4, 5, 6, 7, 8, 9 y ocho matan seis dragones de 5 Might por **2 Energy + 8
  Power** — el ledger de arriba, **+10 Energy por pasada, INFINITE**.
- **R15 = B** (124/383.1: cada lanzamiento es objeto nuevo y el contador se reinicia): cada
  lanzamiento hace 2, cada dragón necesita 3, los seis necesitan **18** — Power sale 21 contra 21
  Energy convertible, y la pasada neta **exactamente 0. ENGINE**.

La fila de R15 en #11 registraba su dependencia como *"ninguno (el Dragonstorm murió por otra vía)"*.
**Había dejado de ser cierto**, porque esa otra vía era esta reconstrucción, y la reconstrucción
estaba mal. Se la pasé al usuario con el ledger de las dos lecturas y **la ruleó A el 2026-09-06**: el
contador es por carta y por turno y sobrevive al trash entre relanzamientos; bajo B la cláusula sería
letra muerta, que es el mismo argumento con el que se cerró R28.

**Probé el escape por orden legal antes de escalarla, como manda CLAUDE.md, y no hay:** el único otro
modo de devolver a la mano un dragón ya jugado en Fury/Body es `UNL-021 Grim Apothecary`, que devuelve
una unidad *"at a battlefield"* mientras los dragones están en base, cuesta una carta por rebote y no
agrega ningún robo. Estrictamente peor.

### La ley general del ciclo, que ninguna fuente escribe

Con `D` dragones ciclando, el mazo tiene `D+2` cartas cuando resuelve Show of Strength y el conteo de
Mighty es `6+R`. Igualarlos da **`R = D − 4`**. Y las cartas cierran solas para cualquier `D`: se
gastan `D+5` y se roban `2 + (D+2) + 1 = D+5`.

| D (dragones por pasada) | R (residentes) | neto |
|---|---|---|
| 4 | **0** | +2 Energy — la versión mínima, sin residentes |
| 6 | 2 | **+10 Energy** — la del video |
| 8 | 4 | más, si el tablero lo aguanta |

**Veredicto: `gemdragon-henge-vi-blind-fury` vuelve a INFINITE**, con sus once cartas reales, el
ledger de Energy y el de cartas publicados, los dos Kadregrin como ingrediente y no como adorno, y un
paso de repetición explícito. Su refutación vieja queda reescrita en los tres puntos falsos, y lo
único que sobrevive de ella —que Blind Fury no es un deck-out— se queda en los notables.

**Y deja una pregunta para CLAUDE.md, que no toco yo:** *"the ~9 Energy per Power rate for a loop
stands"*. El Ancient Henge es una excepción impresa en una carta — convierte **1:1 y sin tope por
activación** — y un loop que lo re-juega cada pasada deja de tener al Power como moneda escasa.

---

Dos observaciones que valen más que la cita:

- **El video del Gutter Palace es una entrevista al jugador que la llevó a Top 32 en RQ Hartford
  y ACOTA nuestras dos entradas hacia abajo, no hacia arriba.** Ninguna de las dos reclama
  infinito (las dos son ALT_WIN con `terminatesIn: "win the game"`), así que la cita las
  corrobora. Su `[12:14]` es además la formulación en palabras de un jugador de lo que **335**
  dice en reglas, y es la misma razón por la que se refuta la línea de Flurry of Feathers.
- **`YFCh8GPYwVo` es la única fuente en video de un infinito de este catálogo jugado en cámara**,
  y el propio comentarista lo acota: *"this isn't like very consistent"*, que es exactamente lo
  que el `notes` de la entrada ya decía.

---

# §2 — Twilight Reveler: la objeción de presupuesto de #46 no se sostiene

## 2.1 `twilight-reveler-eye-facebreaker-recruits` — **SOSTIENE como INFINITE**

Texto verbatim de las cuatro cartas:
```
VEN-020 | Twilight Reveler | Unit | Fury | E3 M3 | When I attack, ready another friendly unit. [Tags: Ionia]
SFD-153 | Eye of the Herald | Gear | Order | E1 M+0 | [Equip] :rb_rune_order: (...) [Effect] When I move, play a 1 :rb_might: Recruit unit token here. [Tags: Equipment]
OGN-220 | Facebreaker | Spell | Order | E2 | [Hidden] (...) [Action] (...) Stun a friendly unit and an enemy unit at the same battlefield. (They don't deal combat damage this turn.)
```

### Las dos fuentes, abiertas

> `ZCBig0lDOvw` (GrappLr, 2026-07-28, 14.102 vistas) `[1:21] because they have an infinite combo. It
> [1:23] is a threecard infinite combo. [1:26] You'll see it in game. Basically, you [1:29] equip one
> of these with this. You attack [1:32] with it. You stun it and the unit you're [1:35] attacking. It
> gets bounced back and then [1:38] you keep using the second Twilight [1:40] Reveler to ready it and
> it's infinite`

> `Rxp5Gfl0fq8` (Dokgebi, 2026-07-18) `[4:19] We only need four cards now.` — el conteo de cartas que
> hace a esta línea una carta más barata que `jhin-fiora-facebreaker-recall`.

### La objeción de #46, y por qué cae

#46 escribe, correctamente citando la regla de presupuesto de CLAUDE.md: *"Facebreaker se
consume cada pasada y el tope es 3 copias (103.2.b). Sin nombrar el hueco de reciclado Y el robo
que la trae de vuelta, esto NO es INFINITE"*.

**Facebreaker no se consume cada pasada. Se consume UNA vez en todo el turno.**

> **423.1.a.2** — *"Stunned Units lose the Stunned status during step 3d of the **end of turn**
> cleanup."*

El Stun es un estado binario (423.1.a) que dura hasta el cleanup de **fin de turno**, no hasta
el fin del combate. Un solo Facebreaker deja al defensor enemigo stuneado para **todas** las
pasadas del turno, y 423.1.b (*"A Stunned Unit does not contribute its might to damage in the
combat damage step"*) le apaga el daño en cada una. Es exactamente el mecanismo que
`jhin-fiora-facebreaker-recall` ya tiene escrito y verificado — *"so one Facebreaker lasts the
whole loop"*. **El coste en cartas por pasada es CERO.** No hay hueco de reciclado que nombrar
porque no hay nada que reciclar.

### La pasada, paso a paso, con cada permiso abierto

Estado inicial: los dos Reveler en base y ready, el Eye of the Herald attacheado a uno de ellos
(llamémoslo A), un battlefield que **ya controla el rival**, con **exactamente un** defensor de
**5+ Might**, ya stuneado por el Facebreaker de la primera pasada.

1. **A hace un Standard Move a ese battlefield.** 144.1.a: *"This action can be done any time
   during a player's Main Phase."* 144.4.a: *"Units may move from their Base to a Battlefield."*
   144.2: *"Exhausting the Unit is the Cost for this action."* → A queda exhausted.
2. **El Eye dispara.** 446.1 hace del cambio de posición un Move; el Eye es Equipment attacheado
   y 434.1.c (*"The Top-Most card has all Effect Text of all cards Attached to it appended to its
   Rules Text"*) pone su `When I move` sobre A. Entra **un Recruit de 1 Might** en ese
   battlefield.
3. **Se stagea el combate.** 461: *"Combat is considered Staged if there are units controlled by
   two opposing players at a Battlefield…"* y 462: *"Combat can only occur between Units
   controlled by exactly two players."* Con el defensor enemigo presente, hay combate — que es la
   trampa de CLAUDE.md (*"entering an EMPTY enemy battlefield is not an attack"*) resuelta, no
   esquivada.
4. **A recibe la designación de Atacante** (464.2.c.3) y **`When I attack` va al chain**
   (383.4.e.1: *"These are commonly structured as 'When I attack…'"*; 383.4.e.2). **Readea al
   otro Reveler (B).**
5. **Damage step.** 465.2.c: cada jugador asigna daño igual a su Might sumado. Los atacantes son
   A (3) y el Recruit (1) = **4**. El defensor stuneado asigna **0** (423.1.b). Por eso el
   defensor tiene que tener **5+ Might**: con 4 o menos, 465.2.c.3/c.4 lo matan y la pasada se
   corta (ver "Lo que la mata").
6. **Combat Cleanup.** 466.1.a.1 inserta *"3c. Heal all Units"* — el daño no se acumula entre
   pasadas. 466.1.a.2 inserta *"3d. Recall Attackers present at the Battlefield if Defenders are
   still present."* → **A y el Recruit vuelven a base.**
7. **La vuelta no dispara nada.** 456: *"Recalls are not Moves."* 456.1: *"They do not cause
   Triggered Abilities to trigger that are triggered by Move actions."* El Eye **no** hace un
   segundo Recruit en el viaje de vuelta. Es exactamente la autocorrección que el OP de la lista
   de infinitos de Reddit se hizo a sí mismo, con los números correctos de este reglamento.
8. **458**: *"Recalls do not affect the state of the Permanent being recalled."* A vuelve
   **exhausted**, y stuneado si lo estaba.
9. **No Result, y el rival no puntúa.** 466.3.d: *"There is 'No Result' if units were recalled
   during step 3d of the Combat Cleanup."* 466.3.d.1 sólo re-stagea si **ambos** jugadores tienen
   unidades, y acá sólo quedan las del rival. 466.5 hace que el rival *"Establishes Control **if
   they didn't already control this Battlefield**"* — y ya lo controlaba, así que 466.5.d no
   dispara ningún Conquer.

**Pasada siguiente: le toca a B**, que está ready (paso 4). B mueve, exhausta, dispara su propio
`When I attack` y **readea a A**. B es recalled exhausted. Y así.

### El balance, con las cantidades que la entrada declara

| recurso | por pasada |
|---|---|
| Energy | **0** (el Standard Move no cuesta Energy, 144.2) |
| cartas de la mano | **0** |
| Power | **0** |
| ready disponibles | −1 (el que mueve) **+1** (el trigger del que ataca) = **0 neto** |
| Recruits en base | **+1** cada vez que mueve el Reveler que carga el Eye, o sea **+1 cada dos pasadas** |

**Nada decrece.** Los dos Reveler alternan perfectamente: siempre hay exactamente uno ready, y
es siempre el que tiene que mover. Es unbounded, y es **más barato** que
`jhin-fiora-facebreaker-recall`, que gasta 1 Power por pasada en Fiora y necesita una fuente de
Assault. Cuatro cartas contra cinco.

### Lo que la mata, escrito en la entrada

- **Depende del tablero del rival**, y eso es lo que hundió a `sona-viktor-opponent-turn`: hace
  falta **exactamente un** defensor (Facebreaker stunea **un** enemigo) de **5+ Might** en un
  battlefield que **ya sea del rival**. Las tres condiciones son suyas, no tuyas. La propia
  fuente lo admite: `HDnIw6NETTI` `[1:16] cannot go infinite. If the unit has [1:19] units but
  lower than four might, you [1:21] cannot win uh this way either. [1:24] Uh you cannot make the
  infinite combo.`
  **Y su umbral es uno menos que el nuestro, a propósito.** La fuente dice *4 Might* porque sólo
  cuenta al Reveler. Nosotros contamos también al Recruit, porque **464.2.c.3** dice *"Units at
  the Contested Battlefield controlled by the Attacker or Defender gain the Attacker or Defender
  designation now"*: el Recruit que acaba de entrar es una unidad tuya en ese battlefield, así que
  **también es atacante**, asigna su 1 de daño y también es recalled en 3d. Con el Eye puesto son
  4 de daño por pasada, no 3, y el defensor necesita **5+ Might**.
- **Cada pasada abre una ventana en la que el rival tiene prioridad** (el Showdown de combate,
  347.1). Los Reveler son 3 Might sin Deflect. Matar a cualquiera de los dos corta el bucle. Es
  riesgo de interacción, no rotura de reglas — la misma nota que lleva la entrada de Jhin sobre
  Fiora.
- El propio autor: `HDnIw6NETTI` `[24:00] I think the combo is not consistent enough right now`.

### Clase: INFINITE, y lo que produce

Produce **Recruits sin cota en base** y nada más: Twilight Reveler no tiene `[Add]`, así que a
diferencia de la línea de Jhin **no hace Energy**. Se cobra igual que la de Jhin: `Azir,
Sovereign`, o un hold del Grand Plaza con 7+ cuerpos al turno siguiente.

**Veredicto: verified, INFINITE.** La objeción de presupuesto de #46 era razonable y estaba
mal: la contesta 423.1.a.2, que ya estaba escrita en el catálogo.

## 2.2 `twilight-reveler-svellsongur-stellacorn-draw` — **BAJA de INFINITE a ENGINE**

```
SFD-048 | Stellacorn Herder | Unit | Calm | E4 M3 | When I move, draw 1. [Tags: Mount Targon]
SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] :rb_energy_1::rb_rune_calm: (...) As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it.
UNL-042 | Back Off | Spell | Calm | E3 | [Hidden] (...) [Action] (...) [Stun] a unit. (It doesn't deal combat damage this turn.) If you played this from your hand, draw 1.
```

### La carta que #46 no nombró, y sin la cual la entrada sería ILEGAL

#46 lista esta candidata como `VEN-020` x2 + `SFD-059` + `SFD-048` y no dice con qué se stunea al
defensor. **Con Facebreaker no se puede.** Facebreaker es **Order**, el Reveler es **Fury** y
Svellsongur y Stellacorn son **Calm**: son **tres dominios**, y 103.1.b exige que la Identidad de
Dominio del mazo sea subconjunto de los **dos** de la leyenda. La entrada, escrita como la
proponía #46, no es construible.

La fuente sí nombra la carta, y es **`UNL-042 Back Off`** — Calm, `[Stun] a unit`, con un robo de
regalo si se juega desde la mano. Verificado en el archivo:
`Rxp5Gfl0fq8` `[7:30] a back off, which I'll hold there for [7:32] now. Two twilight revelers`
… `[8:02] we're going to back off their five might unit um to [8:05] stun it.`

Con Back Off los dominios son **Fury + Calm**, y la única leyenda `calm/fury` del pool es
**`VEN-139 Rogue Assassin`**. Es construible, por un solo camino.

Y Back Off stunea **una** unidad, que es todo lo que hace falta (el defensor); Facebreaker
obliga a stunear también a una unidad tuya. El recordatorio *"It doesn't deal combat damage this
turn"* coincide con 423.1.a.2: **un solo Back Off cubre el turno entero**, igual que el
Facebreaker de §2.1.

**La identificación de #46 es correcta y la confirmo.** Los subtítulos de `Rxp5Gfl0fq8` dicen
"Spell Slinger" y el video francés `gXlY9dtWPwQ` dice "Svelongur"/"Zvel Songer"; la descripción
—*doblar el efecto de la unidad a la que está attacheado*— es `SFD-059 Svellsongur` sin
ambigüedad.

### Por qué hace falta Svellsongur, y por qué uno alcanza

Sin él el bucle se corta en dos robos: un `When I attack` readea **una sola** unidad, y con dos
Reveler los dos readies se consumen en los propios Reveler.

Con un Svellsongur encima de un Reveler, **#45 ya cerró la aritmética y no se re-deriva**:
477.2.c apendea el Effect Text del gear attacheado en la Layer 2; 476.1 lo aplica *"only a
single time across all sequences"* (no hay recursión); 479.1 no encuentra dependencia y 480.3
resuelve por Timestamp. **`v` Svellsongur sobre una unidad dan `2^v` instancias**, así que
`v = 1` da **dos** instancias de `When I attack, ready another friendly unit`: una readea al otro
Reveler, la otra al Stellacorn.

**Ciclo en régimen** (defensor de 5+ Might ya stuneado por el único Back Off del turno)**:** A ataca → readea B y al Stellacorn. El Stellacorn hace su Standard Move
(exhausta, **draw 1**). B ataca → readea A y al Stellacorn. El Stellacorn mueve otra vez
(**draw 1**). **Un robo por ataque de Reveler**, sin coste en Energy ni en cartas.

### Por qué NO es INFINITE

El mecanismo es unbounded; **el mazo no**. Robar sin cota en Riftbound no es un recurso, es una
cuenta regresiva:

> **194.1.d** — un jugador gana un punto *"When an opponent Burns Out and picks that player to
> gain 1 point."*

Y `431.3` deja claro que un Main Deck vacío **vuelve a hacer Burn Out** en cada intento
posterior, con 431.3.b/431.3.c encadenando los puntos que eso le regala al rival. La propia
fuente lo dice sin darse cuenta de que es el techo: `Rxp5Gfl0fq8` `[8:20] this gives us infinite
draw allowing us to draw through our entire deck.` **Robar el mazo entero es exactamente el
final del recurso, no su ausencia de límite.** Por eso baja a **ENGINE**, con
`terminatesIn` diciendo el número honesto: robás hasta vaciar el Main Deck y ahí el bucle te
mata a vos.

CLAUDE.md ya lo tenía escrito en una línea —*"infinite draw is a liability (Burn Out)"*— y esta
es la primera entrada del catálogo donde esa línea decide la clase.

**Veredicto: verified como ENGINE, no INFINITE.** La clase que declaraba #46 no sobrevive, y la
razón está escrita.

Nota de dominio, ya justificada arriba: con Back Off en lugar de Facebreaker los dominios son
**Fury + Calm** y la única leyenda del pool que los cubre es **`VEN-139 Rogue Assassin`**. Una
sola. Se escribe en los prerequisites.

Un dato más de la fuente que la entrada recoge: el propio Dokgebi fija el umbral del defensor en
**cinco**, no en cuatro — `[6:50] our opponent to be holding with one five [6:53] might unit or
greater` — que es el mismo número al que llega el conteo de §2.1 por 464.2.c.3, y una
confirmación independiente de que el umbral de "4 Might" de `HDnIw6NETTI` es el de la versión sin
cuerpo extra en el battlefield.

---

# §3 — Las candidatas menores

## 3.1 `flurry-of-feathers-grand-plaza-win` — **REESCRITA. La línea del video es ilegal**

```
UNL-044 | Flurry of Feathers | Spell | Calm | E4 P2 | [Reaction] Choose one — • Counter a spell. • Play four 1 :rb_might: Bird unit tokens with [Deflect]. (...)
OGN-293 | The Grand Plaza | Battlefield | Colorless | - | When you hold here, if you have 7+ units here, you win the game.
```

### Lo que hace el video, y por qué no funciona

AkeenaTV, `WgrJVlUstXk`, es explícito sobre su secuencia:

> `[3:39] three creatures here, but in response to this battlefield trigger, we can actually dig
> a little bit deeper` … `[4:09] this battlefield trigger, uh since we're doing this all in
> response to the battlefield trigger, will resolve. We've got seven creatures. Third turn, we
> won the game. At instant speed.`

**Responder al trigger del Plaza no puede funcionar, por dos reglas independientes:**

1. **383.2.a.1** — *"Any additional conditional statement immediately after the Condition must be
   true in order for the Condition to be fulfilled. Such a conditional statement is part of the
   Trigger Condition and not the Effect."* El `if you have 7+ units here` va inmediatamente
   después de `When you hold here`. Si al momento del Hold hay 3 unidades, **la habilidad ni
   siquiera llega al chain**: no hay trigger al que responder. Es la misma regla que
   `grand-plaza-recruit-vanguard` ya lleva escrita y que la caminata de #36 confirmó.
2. **335** — *"If there are no Outstanding Tasks, no pending Chain Items, no ongoing Showdown or
   Combat, and it is the Main Phase, the Turn Player receives priority. If […] it is **any other
   phase of the turn, proceed to the next substep, step, phase, or turn**."* En la Beginning
   Phase, con el chain vacío, **nadie recibe prioridad**: no hay ventana para jugar nada. Es
   palabra por palabra lo que dice el jugador entrevistado en `OML3sV9JnC4`: `[12:14] You can't
   respond in that beginning step to get it on the chain. It just triggers at the start. It needs
   to be the condition.`

**El video muestra un juego ilegal.** (Está jugando en TCG Arena; no es una afirmación sobre el
cliente, es que la secuencia narrada no es legal bajo estas reglas.)

### Lo que SÍ funciona, y por qué la entrada vale igual

Antes de archivar una lectura, CLAUDE.md manda probar otro **orden legal de las mismas cartas**.
Hay dos, y el primero es bueno:

- **Jugar Flurry en el turno del RIVAL.** 813.1.c.1: en cartas, `[Reaction]` es *"This can be
  played during Closed States on any player's turn."* Y 331.1/309.1: *"The turn is said to be in
  a Closed State if a Chain exists."* O sea: en cuanto el rival juega **cualquier** carta o
  dispara **cualquier** trigger, hay chain, hay Closed State, y los cuatro Birds entran. Después
  el rival **no tiene otro turno**: viene tu Beginning Phase y el Hold mide 7.
  **Eso es estrictamente mejor que `grand-plaza-recruit-vanguard`**, cuyo propio `notable` tiene
  que decir *"Survive one opponent turn with 7+ units on it"*.
- Jugarla en tu Main Phase el turno anterior (159.2.b.1 + 806.2 le dan los timings de Action).
  Legal, pero le regala al rival el turno entero para bajar el conteo debajo de 7.

Los Birds llegan al Plaza: **355.2** *"For Units, choose a valid Location where that Unit will
enter upon being Played"* y **355.2.a** *"By default, Valid locations include the controller's
Base or a Battlefield the controller controls."* La refutación que #46 puso —*"Flurry no dice
`here`, si entran a la base la candidata muere entera"*— **cae**: el default ya permite un
battlefield que controlás, y para hacer Hold tenés que controlarlo. `OGS-015` explicita lo mismo
en su reminder porque es reminder, no porque sea una permiso extra.

### Qué aporta sobre las nueve entradas de Plaza que ya hay

Dominio **Calm** en vez de Order; **velocidad de Reaction** en vez de Action; cuerpos con
**[Deflect]** (809.1.c: el rival paga un rainbow por cada elección); y **4 Energy + 2 Power**
contra los 6 Energy de Recruit the Vanguard. Necesita 3 unidades propias ya en el Plaza.

**Veredicto: verified, ALT_WIN, reescrita.** La clase que declaraba #46 sobrevive; su secuencia
no.

**Contrapunto honesto que va en la entrada** (viene del hilo `1umoaek`, que no pude abrir, así
que lo escribo como razonamiento propio y no como cita): el Plaza es simétrico y visible, y
bajar el conteo debajo de 7 es más fácil que conquistarlo. Con [Deflect] cada remoción cuesta un
rainbow extra, que es precisamente lo que aporta Flurry sobre Recruit the Vanguard.

## 3.2 `astral-heron-premonition-draw` — **SOSTIENE, ENGINE**

```
VEN-044 | Astral Heron | Unit | Calm | E7 M7 | When you play your first card each turn, if I'm at a battlefield, the next card you play this turn costs :rb_energy_2::rb_rune_rainbow::rb_rune_rainbow: less.
SFD-087 | Premonition | Spell | Mind | E2 P3 | [Reaction] Draw 3.
```

Aritmética contra las cantidades declaradas: Premonition cuesta **2 Energy + 3 Power**; el
descuento es **2 Energy + 2 rainbow Power** (356.4: *"Apply discounts"*); queda **0 Energy +
1 Power**. **Robás 3 por 1 Power.** La cita se sostiene palabra por palabra:
`ftJBJZFevI0` `[3:08] Astral Heron, you can play this card for one power. You can draw three cards for one power.`

Tres cosas que la fuente no dice y que van en la entrada:

- **El descuento es para la SEGUNDA carta del turno, no la primera.** El trigger es *"When you
  play your **first** card each turn"* y su efecto es *"the **next** card you play this turn"*.
  Hay que gastar una carta barata primero.
- **`if I'm at a battlefield` es Condición, no Efecto** (383.2.a.1, mismo razonamiento que el
  Plaza y el mismo ejemplo trabajado de Sona, Harmonious que trae la regla): si el Heron no está
  en un battlefield **cuando jugás la primera carta**, no hay descuento. Y un cuerpo de 7 Might
  parado en un battlefield es un blanco.
- **El descuento se aplica una vez por turno**, no por carta.

Dominio: Heron es Calm, Premonition es Mind → leyendas `calm/mind` (OGN-255, SFD-189, UNL-189,
VEN-145). **Veredicto: verified, ENGINE.**

## 3.3 `shady-spectacles-baron-copy` — **SOSTIENE, ENGINE, con una corrección grande a la fuente**

```
VEN-137 | Shady Spectacles | Gear | Order | E4 M+0 | [Equip] :rb_energy_1::rb_rune_order: (...) As this is attached to a unit, choose another friendly unit. The equipped unit becomes a copy of that unit for as long as this is attached to it. [Effect] (I am a copy of the chosen unit.) [Tags: Equipment]
UNL-147 | Baron Nashor | Unit | Chaos | E10 P3 M12 | As you play me, add the Baron Pit battlefield token to the board if it's not there already. If you do, I enter there. (...) I can't be chosen by enemy spells and abilities. Other friendly units have +2 :rb_might:. [Tags: The Void]
```

La fuente da el ejemplo y acierta la mitad:

> `ftJBJZFevI0` `[1:31] changing a recruit to Baron.` … `[1:34] This card then gets all of the
> effects of that card. The only thing it won't get is the on play effect.`

**Lo del on-play es correcto**: `As you play me, add the Baron Pit…` sólo ocurre al jugar la
carta, y acá nadie juega nada.

**Lo que la fuente no dice, y es lo que decide si vale la pena: el Might NO se copia.**

> **477.1.b.1.a** — *"Copyable traits are: Name, Super Type, Type, Tags, Cost, Domain, Rules
> Text"*

Might no está en la lista, y eso ya es **R27, retirado el 2026-09-04 por encontrar la regla en
vez de preguntarla**. Así que un Recruit con Shady Spectacles que copia a Baron Nashor es un
Baron Nashor de **1 Might**, no de 12. El ejemplo trabajado de 477.1.b.1.b confirma de paso que
los nombres repetidos no son problema: *"That player will have three units named Honest Broker in
play"*.

**Lo que sí se copia y es lo que hace la entrada:** el Rules Text entero. O sea *"I can't be
chosen by enemy spells and abilities"* (intocable por hechizos, en un cuerpo de 1 Might que costó
un token) y *"Other friendly units have +2 :rb_might:"* — un **segundo anthem**, que se apila con
el del Baron original y le da +2 al propio Baron.

**Coste medido, contando el [Equip] y el Power como manda CLAUDE.md:** Shady Spectacles 4 Energy,
más su `[Equip]` de 1 Energy + 1 Order Power = **5 Energy + 1 Order Power**, contra los 10 Energy
+ 3 Power que cuesta un segundo Baron. Requiere el Baron ya en mesa, que es su límite real.

Dominio: Spectacles es Order, Baron es Chaos → la **única** leyenda `chaos/order` del pool es
**`VEN-155 Heart of the Tempest`**. Se escribe.

**Veredicto: verified, ENGINE.** La entrada existe sobre todo por la corrección: es la
contracara de Svellsongur (Layer 1 Copy contra Layer 2 Ability-Altering) y la distinción se
publica.

## 3.4 `steel-paws-svellsongur-might` — **SOSTIENE, ENGINE, y el número de la fuente es exacto**

```
VEN-043 | Steel Paws | Unit | Calm | E1 M0 | [Deflect] (...) [Empower] :rb_energy_7: (...) [Empowered][>] I have +7 :rb_might:. [Tags: Cat, Piltover]
```

**828.1.b.1** — *"[Empowered][>] [Text]"* es funcionalmente *"While I have the Empowered status,
this card gains '[Text]'."* Y **827.2**: al completarse el Empower, la fuente *"becomes
Empowered"*.

Svellsongur copia **ese texto** al Effect Text del gear, y 434.1.c se lo devuelve a la unidad.
Con la composición de #45 (`2^v`, `v = 1`) hay **dos** instancias de `[Empowered][>] I have +7
:rb_might:` → **0 + 7 + 7 = 14 Might**. La cifra de la fuente es exacta:
`ftJBJZFevI0` `[8:31] Steel Paws went from a one energy zero might card to a 14 might card out of nowhere.`

**Aquí R27 no aplica, y decirlo importa**: no se está copiando el rasgo Might (que no es
copiable), se está copiando **texto de reglas que otorga Might**. Son cosas distintas y la
entrada lo dice para que nadie la "corrija" mal después. Con dos Svellsongur son `2^2 = 4`
instancias → **28 Might**.

**Coste total, con el Equip y el Power:** 1 (Steel Paws) + 7 (Empower) + 3 (Svellsongur) + 1
(su Equip) = **12 Energy**, más **1 Calm Power** (jugar Svellsongur) + **1 Calm Power** (su
Equip) = **12 Energy + 2 Calm Power**. Mono-Calm: cualquier leyenda con Calm.

Lo que la entrada **no** reclama: el `[Deflect]` también se copia, y si esa segunda instancia
suma su valor al impreso lo decide **809.2**, que es la pregunta sin resolver que ya hizo cortar
`UNL-041 Allay` de `tianna-wildclaw-point-lock`. **La entrada no se para en eso**: el Deflect
vale 1 rainbow en las dos lecturas.

**Veredicto: verified, ENGINE.** Produce un cuerpo Mighty (709: 5+ Might) con Deflect por 12
Energy, que es lo que alimenta a Fiora, Worthy y a los payoffs de Might.

## 3.5 `nocturne-stacked-deck-cheat` — **SOSTIENE, ENGINE**

```
OGN-194 | Nocturne, Horrifying | Unit | Chaos | E4 P1 M4 | [Ganking] (...) As you look at or reveal me from the top of your deck, you may banish me. If you do, you may play me for :rb_rune_rainbow:. [Tags: Nocturne]
OGN-183 | Stacked Deck | Spell | Chaos | E1 | [Action] (...) Look at the top 3 cards of your Main Deck. Put 1 into your hand and recycle the rest.
VEN-156 | Lightning Rush | Spell | Order/Chaos | E1 | Look at the top 3 cards of your Main Deck. You may choose a card from among them and draw it. Put the rest into your trash. [Flow] :rb_energy_2::rb_rune_rainbow: (...)
```

El mecanismo es literal en la carta: `As you look at […] me from the top of your deck, you may
banish me. If you do, you may play me for :rb_rune_rainbow:` — y **Stacked Deck dice `Look at`**,
que es el verbo exacto que Nocturne pide. Un cuerpo de 4 Might con [Ganking] por **1 rainbow
Power** en vez de 4 Energy + 1 Power. La fuente lo reporta desde la mesa:
`ftJBJZFevI0` `[10:33] I've seen two Nocturnes turn one and had two Nocturnes in base.`

Tres precisiones que van en la entrada:

- **Es probabilístico, no determinista.** Stacked Deck mira 3 de un mazo de 40 (103.2.a). Con 3
  Nocturnes la chance de verlo en un mirar-3 al principio es baja; la fuente misma dice
  `[10:07] unless you get unlucky`. **No es un motor: es una lotería con muchos billetes**, y
  por eso la clase es ENGINE y no otra cosa.
- **Si Nocturne se roba normal es una carta muerta a 4 Energy + 1 Power.** La fuente lo dice:
  `[10:54] If you just draw Nocturne naturally, that is quite a brick.`
- **Lightning Rush es OPCIONAL y caro en identidad.** Es Order/Chaos, así que exige leyenda
  `chaos/order`, y de ésas hay **una sola** (`VEN-155 Heart of the Tempest`). Sin ella, Stacked
  Deck solo (mono-Chaos) ya hace el trabajo con cualquier leyenda Chaos. La entrada lo escribe
  así en vez de encadenar el mazo a una leyenda.

**Veredicto: verified, ENGINE.**

## 3.6 `decree-sabotage-hand-strip` — **SOSTIENE, ENGINE**

```
VEN-085 | Decree of Strength | Spell | Body | E1 | Choose an opponent. They reveal their hand and you choose a Mind (:rb_rune_mind:) card from it. They recycle that card.
OGN-156 | Sabotage | Spell | Body | E1 P1 | Choose an opponent. They reveal their hand. Choose a non-unit card from it, and recycle that card.
```

Aritmética contra las cantidades declaradas: **2× Decree + 1× Sabotage = 3 Energy + 1 Power por
tres cartas de la mano del rival**, exactamente la cuenta que hace la fuente:
`ftJBJZFevI0` `[13:55] So, if their hand is five cards, all of a sudden, for five for three energy and one power, their hand`
(el `[13:52] their hand went from five to two` de #46 es paráfrasis del mismo pasaje; publico la
frase que está en el archivo).

Lo que va en la entrada y la fuente no dice:

- **Los dos son condicionales sobre la mano ajena**, y en direcciones distintas: Decree sólo ve
  cartas **Mind**, Sabotage sólo cartas **no-unidad**. Contra un mazo sin Mind, Decree es un
  cantrip de información y nada más.
- **Reciclar no es descartar**: 416.1 manda la carta **al fondo del Main Deck**, no al trash. No
  la sacás de la partida, la retrasás ~40 turnos. Contra un mazo que se roba entero (Lux, Jayce)
  el efecto se diluye.
- Es **distinto** de `ashe-retreat-hand-strip`, que **banishea** y vive dentro del loop de Lux.
  Éste es un par mono-Body de turno 2, sin motor.

**Veredicto: verified, ENGINE.**

## 3.7 `elder-dragon-flurry-of-blades-wipe` — **SOSTIENE, ENGINE, y corrige el encuadre de una entrada vieja**

```
UNL-118 | Elder Dragon | Unit | Body | E12 P4 M10 | Any amount of your damage is enough to kill enemy units. When you play me, choose up to one enemy unit at each location. Deal 1 to them. [Tags: Dragon, Demacia]
OGN-133 | Flurry of Blades | Spell | Body | E1 | [Reaction] (Play any time, even before spells and abilities resolve.) Deal 1 to all units at battlefields.
```

Verificado en su fuente real (§0.3): `Ns_hcbulnIs` `[10:47] deal one damage to all units on the
battlefield.` `[10:50] Um and it's at a battlefields in general, not even a battlefield, all
battlefields. So you just got a full wipe across the board.`

**La composición es real y es simétricamente asimétrica**, que es lo bueno: la estática del
Dragon dice *"Any amount of **your** damage is enough to kill **enemy** units"*. Flurry of Blades
es daño tuyo y pega a **todas** las unidades en battlefields. Resultado: **todas las unidades
enemigas en todos los battlefields mueren; las tuyas apenas reciben 1 de daño.** Por 1 Energy.

Dos límites que la entrada escribe:

- **`at battlefields` no incluye las bases.** 198.1 define Locations como *"the Battlefields and
  the Bases"* y Flurry nombra sólo battlefields, así que lo que el rival tenga en base sobrevive.
  "Full wipe across the board" es una exageración de la fuente: es un wipe de battlefields.
- **El Dragon tiene que estar en mesa.** A 12 Energy + 4 Power no se juega a mano: la vía es
  `OGN-160 Dazzling Aurora`, que es exactamente la entrada `dazzling-aurora-elder-dragon`.

**Corrección al catálogo, que es la mitad del valor de esta entrada.** El `notes` de
`dazzling-aurora-elder-dragon` dice *"'board wipe' was wrong: one kill per location, three at
most in a 1v1"*. **Eso sigue siendo cierto y no se toca**: es sobre el trigger **on-play** del
Dragon (*"choose up to one enemy unit at each location"*). Lo que esta entrada agrega es que su
**estática** sí produce un wipe cuando la alimenta otra fuente de daño masivo, y Flurry of Blades
es la que existe en el pool y en dominio. Se le agrega un `notable` de referencia cruzada a la
entrada vieja; **no se cambia su clase, ni su `quantity`, ni su veredicto.**

Mono-Body las dos. **Veredicto: verified, ENGINE.**

---

# §1 — Heimerdinger, bajo R30 = B

**El usuario votó B el 2026-09-06.** La restricción `Use my abilities only while I'm at a
battlefield` **viaja con la habilidad** (377.2.b y su ejemplo trabajado, que es literalmente esta
redacción sobre Ultrasoft Poro) y **053.1** la relee sobre quien la tiene: **Heimerdinger tiene
que estar en un battlefield.** Renata puede quedarse en base.

Las tres entradas se escriben en la forma B. La lectura A —la de las seis fuentes de la
comunidad— se cita como fuente **con la nota de que el catálogo sigue B**, que es lo que pidió
el manager.

## 1.1 `heimerdinger-renata-remote-score` — **SOSTIENE como ENGINE. Y el número publicado de la comunidad NO se sostiene**

```
OGN-111 | Heimerdinger, Inventor | Unit | Mind | E3 P1 M3 | I have all :rb_exhaust: abilities of all friendly legends, units, and gear. [Tags: Yordle, Heimerdinger, Piltover]
SFD-088 | Renata Glasc, Mastermind | Unit | Mind | E5 M4 | :rb_energy_1::rb_rune_mind:: Draw 1. :rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1 point. Use my abilities only while I'm at a battlefield.
VEN-150 | Acceleration Gate | Spell | Mind/Body | E3 P1 | Ready up to 4 units, gear, and/or runes. [Tags: Jayce]
```

**Lo que la entrada afirma bajo B:** Heimerdinger toma la habilidad de exhaust de Renata; la
restricción viaja, así que **Heimerdinger** debe estar en un battlefield; **Renata no**. Ella se
queda en base, fuera de combate y fuera del alcance de todo lo que pide "en un battlefield". Eso
sigue siendo una ruta **cualitativamente nueva**: las tres rutas de Renata del catálogo
(`renata-mastermind-points`, `renata-bubble-bot-ready`, `jayce-mesmerize-renata`) dicen las tres
en sus `uses` *"Only while at a battlefield"*, y las tres exponen a Renata.

Y el cuerpo expuesto pasa a ser **más barato**: Heimerdinger es E3 P1 M3 contra E5 M4.

**R2 = A es load-bearing acá y está bien aplicado:** el texto de carta dice `Score 1 point`, que
por 194.1.c es un **Gain por habilidad**, no un Score de 469, así que el tope de 470 (*"only
Score […] once per Battlefield per turn"*) no aplica y Heimerdinger puede tapear varias veces en
el mismo turno si algo lo readea.

### El número de la comunidad, medido — y no llega

`8m0x3wFBXZQ` `[11:18] We're going to rack up 36 energy and 36 power because that's how much we
need to activate this ability eight times.` Ocho activaciones son **32 Energy + 32 Mind Power**,
más los readies.

**32 Mind Power en un turno no es alcanzable en el shell que ese video muestra.** La cuenta, con
las reglas abiertas:

- **103.3.a** — el Rune Deck son *"12 Rune Cards"*. Doce, no más.
- **164.2.b** — la segunda habilidad impresa de toda runa básica es `Recycle this: [Reaction] —
  [Add] [C]`: **una runa reciclada da exactamente 1 Power**.
- **161.2.b** — *"When a Rune is Recycled it is returned to the Rune Deck, not the Main Deck"*,
  y **315.3.b** canaliza **2 por turno**. Ése es el suelo gratis de 2 Power/turno que #44 midió.
- Ergo el techo de Power en **un** turno, vaciando el board de runas, es del orden de **12**, no
  de 32.

Para llegar a 32 hace falta un motor de Power **sin cota**, y los que el catálogo tiene
verificados (`lux-infinite-power`) son **Mind/Order**, mientras que Acceleration Gate es
**Mind/Body** — y `103.1.b` (Domain Identity, subconjunto de la leyenda) no deja tener las dos.
La única leyenda `mind/body` del pool es **`VEN-149 Defender of Tomorrow`**.

**Y el motor Mind/Body que ese mazo usa ya está en el catálogo, y está acotado:**
`platewyrm-egg-defender-gate` — *"Bounded by Gates (3), Portals (3) and the once-per-turn legend
exhaust; never closes"*. Su propio `notes` ya anticipaba esta entrada: *"Mind/Body also holds
Renata Glasc, Mastermind (SFD-088): a Gate that readies Renata and three Eggs is one point plus
+6E — that is the point-loop lens"*.

**Techo real por turno en el shell Mind/Body:** Heimerdinger empieza ready (1 activación) y cada
Acceleration Gate lo readea una vez, con 3 copias por 103.2.b → **4 activaciones**, o sea 16
Energy + 16 Mind Power + 9 Energy + 3 Power de los Gates = **25 Energy + 19 Power**. El Power lo
corta antes: con ~12 del Rune Deck más los 2 gratis, salen **2 o 3 puntos por turno**, no ocho.

**Por eso la clase es ENGINE y no BURST ni CHAIN**, aunque la fuente lo llame OTK. Y la nota va
escrita en la entrada, porque es el tipo de cifra publicada que CLAUDE.md manda re-medir: *"two
published '18 Energy' figures had counted neither"*.

**La entrada también dice lo otro que es verdad:** Heimerdinger puede sustituir a Renata como
blanco de tapeo dentro de cualquiera de las tres rutas INFINITE existentes (Mind/Order, con
Fiora / Bubble Bot / Jayce readeándolo a él). En ese caso hereda su clase, y compite por el
**mismo hueco de reciclado** que CLAUDE.md ya identificó, así que es una **cuarta alternativa,
no un cuarto payoff apilable**.

Refutación que la fuente sí trae y va escrita: **`SFD-060 Tianna Crownguard`** apaga esta ruta
igual que las otras tres, porque puntuar por habilidad es un *gain* (194.1.c) y ella dice
*"opponents can't gain points"*. Ya está catalogada como `tianna-wildclaw-point-lock`.

**Veredicto: verified, ENGINE, forma B.**

## 1.2 `heimerdinger-vanguard-armory-recruits` — **SOSTIENE, ENGINE**

```
SFD-168 | Vanguard Armory | Gear | Order | E7 P1 | :rb_exhaust:: Play three 1 :rb_might: Recruit unit tokens. (You may play them to different locations.)
```

Acá **R30 no muerde**: el Armory no lleva ninguna cláusula de restricción, así que Heimerdinger
copia su habilidad de exhaust y la usa **desde la base**. `I have all :rb_exhaust: abilities of
all friendly legends, units, and **gear**` — el Armory es gear, y el texto lo nombra.

**Seis Recruits por turno con un solo Armory** (tres del Armory, tres de Heimerdinger). Cruza
directo con `grand-plaza-recruit-vanguard` y `spiderling-swarm-grand-plaza`: siete unidades en
`OGN-293` es ganar. La diferencia con `OGS-015 Recruit the Vanguard` es que el Armory es
**repetible todos los turnos**, no un hechizo de un uso.

**Lo que #46 marcó para chequear, chequeado:** Armory es **Order**, Heimerdinger es **Mind** →
leyenda `mind/order` (OGN-265, OGS-021, SFD-201, UNL-199). Y ahí **Acceleration Gate ya no
entra** (Mind/Body, 103.1.b), así que los nueve Recruits que #46 conjeturaba **no ocurren**: son
seis. La entrada escribe seis.

Dos notas más:

- **143.4** — los Recruits entran exhausted, así que no defienden ni mueven el turno que
  aparecen.
- El Armory cuesta **7 Energy + 1 Power** y Heimerdinger **3 Energy + 1 Power**: es un armado de
  dos turnos, no un turno 3.

**Veredicto: verified, ENGINE.**

## 1.3 `heimerdinger-malzahar-double-power` — **SOSTIENE, ENGINE**

```
OGN-113 | Malzahar, Fanatic | Unit | Mind | E4 M3 | Kill a friendly unit or gear, :rb_exhaust:: [Action] — [Add] :rb_rune_rainbow::rb_rune_rainbow:. (Use on your turn or in showdowns. Abilities that add resources can't be reacted to.)
```

El exhaust está en el coste, así que la habilidad entra en `all :rb_exhaust: abilities`.
Heimerdinger la usa exhaustándose **a sí mismo** y matando **un cuerpo o gear propio**: una
segunda activación de Malzahar sin un segundo Malzahar. Verificado en la fuente:
`_a8Osr36BX0` (gyroseanplays, 2026-08-14) `[3:57] going to use Heimerdinger's uh effect to
[3:59] tap him and copy Malzahar's tap ability, [4:03] which says kill a friendly unit, add two
[4:05] power. I'm going to kill the Bubblebot, [4:08] adding two power.` — y su `[3:53]
Heimerdinger needs to be a mech` es de su propio mazo de Mel, no una condición de esta entrada.

**El techo es el combustible, no la habilidad**, y eso es lo que la entrada dice: cada activación
come un permanente propio, así que **+2 rainbow Power por cuerpo**, dos veces por turno en vez de
una. Mono-Mind: cualquier leyenda con Mind.

**167** va escrito: *"Every player's Rune Pool empties at the start of each player's Main Phase
and the end of each player's turn"*, así que el Power sale en la Main Phase o no sirve.

Cruce con el catálogo: `sprite-fountain-malzahar-jayce` ya usa a Malzahar como convertidor de
cuerpos en Power; ésta duplica su tasa.

**Veredicto: verified, ENGINE.**

---

# Resumen

| # | entrada | clase declarada por #46 | veredicto |
|---|---|---|---|
| 1 | `twilight-reveler-eye-facebreaker-recruits` | INFINITE | **verified, INFINITE** — la objeción de presupuesto cae por 423.1.a.2 |
| 2 | `twilight-reveler-svellsongur-stellacorn-draw` | INFINITE | **verified, ENGINE** — bajada: el techo es el Main Deck (194.1.d, 431.3); y el stun tiene que ser `UNL-042 Back Off`, con Facebreaker la entrada sería de tres dominios |
| 3 | `flurry-of-feathers-grand-plaza-win` | ALT_WIN | **verified, ALT_WIN, REESCRITA** — la secuencia del video es ilegal (383.2.a.1 + 335) |
| 4 | `astral-heron-premonition-draw` | ENGINE | **verified** |
| 5 | `shady-spectacles-baron-copy` | ENGINE | **verified** — el Might no se copia (477.1.b.1.a / R27) |
| 6 | `steel-paws-svellsongur-might` | ENGINE | **verified** — 14 Might exacto, por composición 2^v |
| 7 | `nocturne-stacked-deck-cheat` | ENGINE | **verified** — Lightning Rush pasa a opcional |
| 8 | `decree-sabotage-hand-strip` | ENGINE | **verified** |
| 9 | `elder-dragon-flurry-of-blades-wipe` | ENGINE | **verified** — y corrige el encuadre de `dazzling-aurora-elder-dragon` sin tocar su veredicto |
| 10 | `heimerdinger-renata-remote-score` | INFINITE | **verified, ENGINE, forma B** — el "36 power" publicado no es alcanzable (103.3.a + 164.2.b) |
| 11 | `heimerdinger-vanguard-armory-recruits` | ENGINE | **verified** — seis Recruits, no nueve |
| 12 | `heimerdinger-malzahar-double-power` | ENGINE | **verified** |

Y una entrada vieja tocada, que no estaba en el encargo y resultó lo más caro del issue:

| — | `gemdragon-henge-vi-blind-fury` | ya `verified` como ENGINE | **ENGINE → INFINITE**, con la refutación reescrita. Sus tres argumentos eran falsos (§4.1); el ledger cierra en cartas (11 = 11) y da +10 Energy por pasada. **R15 = A, ruleada por el usuario el 2026-09-06** |

**12 entradas nuevas verified, 0 refutadas, 1 reescrita de raíz, 1 bajada de clase, y 1 entrada
existente promovida de ENGINE a INFINITE con su refutación reescrita.** Catálogo: 99 → **112**, los
112 verified.

Ninguna de las candidatas ENGINE nuevas resultó INFINITE. **La que sí resultó INFINITE es una entrada
que ya estaba en el catálogo**, y no porque apareciera una carta nueva sino porque el video que su
propia nota daba por inalcanzable hoy se puede leer.

**Cero lecturas nuevas archivadas.** Las dos que parecían necesarias las contestó el reglamento
—**335** y **423.1.a.2**— y las dos que sí se usaron ya existían y el usuario las votó el mismo día:
**R30 = B** (Heimerdinger) y **R15 = A** (Dancing Grenade). R15 no era nueva, pero su fila en #11
decía que no dependía de nada, y eso dejó de ser cierto en cuanto la reconstrucción que la había
dejado sin uso resultó equivocada.

**Cero lecturas nuevas archivadas.** Las dos que parecían necesitarse las contestó el reglamento:
**335** la del Plaza en la Beginning Phase, y **423.1.a.2** la del presupuesto del Facebreaker.
La única lectura de este issue —R30— la votó el usuario antes de escribir nada.

**Refutado de la comunidad:** la secuencia "respondo al trigger del Plaza" (§3.1) y el "36 energy
and 36 power" del OTK de Heimerdinger (§1.1). **Confirmado de la comunidad:** todo lo demás.
