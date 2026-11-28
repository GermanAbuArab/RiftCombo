# Issue #62, sección 5 — las siete contradicciones, contra el catálogo

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16 · **Catálogo al empezar:** 135 entradas, las 135 `verified`.

La sección 5 de #62 lista siete afirmaciones de fuentes de YouTube que el minero decidió **no propagar**.
Este documento hace la pregunta que falta: **¿alguna de ellas contradice una entrada `verified`?**
Respuesta corta: **ninguna refuta nada**, dos de ellas *confirman* una clasificación del catálogo,
una está mal descrita en el propio issue, y dos dejan un hecho de reglas que el proyecto no tenía escrito.

Las siete citas fueron **bajadas y leídas por mí** con
`yt-dlp --skip-download --write-auto-sub` (no contra los archivos de rc-mine2). Los timestamps de
abajo son los que da el subtítulo que yo bajé; en cuatro casos difieren de los del issue por unos
segundos y anoto el mío.

---

## Paso previo: las citas de reglas, abiertas en bloque

| regla | verbatim del archivo | para qué se usa acá |
|---|---|---|
| **186** | *"Tokens are Created on the board or the Chain and cannot exist elsewhere."* | contradicción 7 |
| **186.1** | *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist immediately after moving to its new zone."* | contradicción 7 |
| **416.1** | *"Recycling cards is the action in which a player takes one or more cards from a specific zone and then puts it on the bottom of the corresponding deck."* | contradicción 7 |
| **416.6** | *"That means to take X cards of the instructed player's choice from the relevant zone and recycle them."* | contradicción 7 (y el ledger de la §1) |
| **383.2.a** | *"The Condition is the clause with When, At, or the Nth Time."* | contradicción 4 |
| **383.2.a.1** | *"Any additional conditional statement immediately after the Condition must be true in order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger Condition and not the Effect."* | contradicción 4 |
| **190.6.a** | *"While a Battlefield is Controlled, its Controller controls its Abilities unless that ability indicates another player does."* | contradicción 3 |
| **416.5** | *"If 2 or more cards are Recycled to the Main Deck simultaneously, they are placed on the bottom of that deck in a random order."* | contradicción 7 |

Chequeo de bans en `data/corpus_flat.txt` para las cartas nombradas por las siete: la única marcada es
`OGN-276 Aspirant's Climb` — `[BANNED constructed:banned, 2v2:banned]` —, que es justamente la
contradicción 3. `OGN-067`, `OGN-190` y `UNL-199` están limpias.

---

## 1. Blitzcrank "infinito" — el catálogo ya lo tenía marcado, y esto es la tercera y cuarta fuente

```
OGN-067 | Blitzcrank, Impassive | Unit | Calm | E5 P1 M5 | [Tank] ... When you play me to a
battlefield, you may move an enemy unit to here. When I hold, return me to my owner's hand.
```

> `[6:43] the fact that it is infinitely recurable in theory and constantly able to pull units`
> — 50k Comics, *"Lee Sin Midrange Deck Profile & Beginner's Guide!"*, 2025-11-21,
> https://www.youtube.com/watch?v=O38zlFuo7Mk (mi timestamp: 6:43, el issue dice 6:26)

> `[5:27] you can just infinitely play the Blitzcrank over and chip away at the board`
> — Card Goblin, *"Everyone Is Sleeping on Ivern Green Father"*, 2026-06-26,
> https://www.youtube.com/watch?v=3b1jqCRkB0w (mi timestamp: 5:27, el issue dice 5:18)

**Ninguna entrada de `data/combos.json` usa `OGN-067`** (barrido programático sobre los 135 `uses`).
`data/synergies.json` lo tiene registrado como `excludes` en **tres** reglas, con la razón correcta en
cada una — *"«When I hold, return me to my owner's hand» — the second trigger finds him already in
hand and does nothing"*. Nada que cambiar.

**Precisión que las dos fuentes merecen, y que el issue no hace:** ninguna de las dos dice que
Blitzcrank sea un *combo* infinito. Las dos dicen que es **recurrente** — vuelve a la mano en cada
Hold y se puede volver a jugar. Eso es cierto y no es lo mismo. Lo que sería falso, y ninguna lo
afirma, es que el rebote **abarate** el redespliegue: cada vuelta cuesta E5 + P1 completos. La capa de
sinergias no está corrigiendo a estas fuentes; está evitando que un predicado de texto convierta
*"When I hold, …"* en un pago duplicable.

**Veredicto: sin impacto en el catálogo.**

---

## 2. Kog'Maw "loop de daño" — la contradicción está mal descrita en el propio issue

```
OGN-190 | Kog'Maw, Caustic | Unit | Chaos | E3 P1 M1 | [Deathknell] — Deal 4 to all units at my
battlefield. (When I die, get the effect.)
```

El issue dice que la fuente *"describe ganquear a Kog'Maw para repetir su daño"*. **Bajé el video y no
dice eso.** Dice:

> `[0:53] So when we're gaining these creatures back, we're playing Kog'ma straight to the field and
> then we're using our legend's ability giving Kog'ma ganking. So when he gets to an open field, we
> can just gank over, make him blow up, have a big hitter like Warick or even a few knocks there`
> — Happy_Raptor_TCG, *"Miss Fortune Deck Tech Riftbound! KABOOM DECK"*, 2025-11-18,
> https://www.youtube.com/watch?v=Podw8HhEGk0

O sea: el Ganking **reposiciona** el cuerpo y después lo matan para cobrar el Deathknell. Eso es
correcto. La recursión que describe es *"gaining these creatures back"* — volver a jugar Kog'Maw, no
repetir su disparo. En el video no aparece ni "loop" ni "over and over" ni "infinite" en ninguna línea
(grep sobre las 2.100 líneas del subtítulo).

**No propago la contradicción tal como está escrita en #62: la fuente no comete el error que se le
atribuye.** Lo que sí queda, y es lo útil, es el hecho de reglas: `[Deathknell]` es un disparo de
**muerte**, así que mover a Kog'Maw no repite nada — cada 4 de daño cuesta un Kog'Maw. **Ninguna
entrada usa `OGN-190`**, y ninguna trata un Deathknell como disparo de entrada o de move (barrido
programático). **Sin impacto en el catálogo.**

---

## 3. `OGN-276 Aspirant's Climb` recomendado estando baneado — desfase de fecha, confirmado

> `[1:31] Some strong battlefields to choose would be Aspirants Climb. This increases the points
> needed to win by one and grants you an additional turn in order to ramp your runes and draw that
> dazzling Aurora.`
> — Riftlab, *"Learn MISS FORTUNE in Riftbound | Full Deck Guide & Combos"*, **2025-09-11**,
> https://www.youtube.com/watch?v=ml2KhQs7qmo (mi timestamp: 1:31, el issue dice 1:26)

El video es de **septiembre de 2025**; el baneo es del 2026-07-24. No es un error de la fuente, es una
fuente vieja. `data/corpus_flat.txt` línea 282 la marca `[BANNED constructed:banned, 2v2:banned]`.

`OGN-276` **no aparece en `data/combos.json` ni en `data/synergies.json`** (0 ocurrencias en los dos
archivos). El mismo video es la fuente §4 de `dazzling-aurora-elder-dragon`; la cita que esa entrada
toma es de `[0:34]`, otra parte del video, y no toca el battlefield.

**Sin impacto en el catálogo.** Se registra el desfase, no se "corrige" la fuente.

---

## 4. El supuesto cambio de reglas sobre triggers condicionales — es `383.2.a.1`, y ya lo aplicamos

> `[0:01] Well, they did some updates and some erratas and some cards got banned and alongside those
> bans, some rules got changed which means our Grand Plaza combo doesn't really work as well as it
> used to. … [0:39] conditional triggers now only go on the stack if the uh following qualifier is
> active at the like point of the trigger. So, we need to have seven units before this whole trigger
> actually happens.`
> — AkeenaTV, *"Lillia Aggro Riftbound Deck"*, 2026-04-07,
> https://www.youtube.com/watch?v=QKxuI8enzI0

**Esto es la única de las siete que toca entradas `verified`: las once ALT_WIN del Grand Plaza.**

Lo que la fuente describe es palabra por palabra **383.2.a.1**, que está en nuestro archivo de reglas
del 2026-07-16 con dos ejemplos trabajados (Sona, Harmonious y Loose Cannon). Si fue un *cambio* en
abril de 2026 no lo puedo verificar y **no hace falta**: el proyecto ya lee la cuenta de 7+ como parte
de la Trigger Condition desde #48, y la fuente llega a la misma conclusión que nosotros (*"we need to
have seven units before this whole trigger actually happens"*).

Auditoría de las doce entradas que usan `OGN-293`:

| entrada | clase | ¿cita 383.2.a? |
|---|---|---|
| `grand-plaza-recruit-vanguard` | ALT_WIN | sí, con .a.1 |
| `grand-plaza-loop-time-warp` | ALT_WIN | sí, con .a.1 |
| `spiderling-swarm-grand-plaza` | ALT_WIN | sí, con .a.1 |
| `noxian-drummer-eye-svellsongur-plaza` | ALT_WIN | sí, con .a.1 |
| `arise-sand-soldiers-plaza` | ALT_WIN | sí, con .a.1 |
| `flurry-of-feathers-grand-plaza-win` | ALT_WIN | sí, con .a.1 |
| `corina-svellsongur-plaza` | ALT_WIN | sí, con .a.1 |
| `plaza-armory-miss-fortune` | ALT_WIN | sí, con .a.1 |
| `leblanc-bashful-bloom-trevor-plaza` | ALT_WIN | sí (383.2.a) |
| `karthus-machine-evangel-renata-plaza` | ALT_WIN | sí (383.2.a) |
| `zed-clone-eye-recruits` | ENGINE | no hace falta: gana con el Hold del turno siguiente y su cuenta está en el tablero desde el turno anterior |
| **`leblanc-temporary-plaza`** | ALT_WIN | **no lo citaba** |

`leblanc-temporary-plaza` era la única sin el ancla. **No cambia de clase ni de cantidades**: su cuenta
son 3 Keepers + 6 Reflections + LeBlanc = **10 cuerpos contra una barra de 7**, y los diez sobreviven
el turno del rival, así que la condición se cumple en el instante en que el disparo se coloca. La
edición añade la cita, no altera la línea.

**Lo mejor de esta cita es quién la dice:** AkeenaTV es el mismo creador cuya línea vieja está
registrada en `flurry-of-feathers-grand-plaza-win` como refutada por 383.2.a.1. Acá se corrige solo, en
video, tres meses antes de que el proyecto llegara a lo mismo. Se agrega como fuente de esa entrada en
la sección 4 de este mismo issue.

**Veredicto: confirma el catálogo. Una edición de refuerzo, cero refutaciones.**

---

## 5. `y37WbJbqM44` se contradice a sí mismo en la aritmética — no toca ninguna entrada

El desfase "12" vs "16" está en un video de GrappLr sobre Master Yi (*"This Master Yi Deck Levels TOO
FAST to Stop"*, 2026-04-02). Las dos candidatas que salen de él — `gromp-arena-svellsongur-xp` y
`anivia-svellsongur-double-burn` — están en la **sección 3** de #62 y **no están catalogadas**. Nada
que auditar acá; el desfase queda anotado para quien camine la sección 3, con la cuenta de 12 como la
que cierra (4 disparos × 3 XP).

**Sin impacto en el catálogo.**

---

## 6. Zed "infinito" desmentido en la propia fuente — y lo que desmiente no es lo que dice el issue

> `[10:03] Okay, so is that for the like to to get some recycle and go infinite here?`
> `[10:09] >> Yes. Yes. I mean, not going infinite, but this deck struggles a lot against the whole
> decks, the decks that likes to hold`
> — Frodan Riftbound, *"I Got Coached on Playing the Most Broken Zed Build Ft. xTacio"*, 2026-08-17,
> https://www.youtube.com/watch?v=HPopPjfG800 (mi timestamp: 10:09, el issue dice 9:50)

Leído en contexto, lo que xTacio niega **no es el swap de Zed**: la pregunta es sobre `OGN-036 Vi,
Destructive` en el sideboard (*"We have a Vi"*, `[10:03]`) y si está ahí para reciclar y hacer un
infinito. La respuesta es que Vi está para crecer y romper Holds, no para un loop.

Eso deja dos entradas cerca y **no refuta ninguna**:

- **`zed-clone-eye-recruits` ya es ENGINE**, y sus propias notas dicen por qué: *"ENGINE rather than
  INFINITE because the swap costs a rune each time — it is bounded by the 12-rune deck per turn"*. La
  fuente es un jugador de alto nivel del mismo mazo diciendo lo mismo. **Corrobora.**
- **`gemdragon-henge-vi-blind-fury` (INFINITE) también usa Vi + reciclado**, y podría parecer el
  blanco. No lo es: es un mazo Dragonstorm Body/Fury con Ancient Henge y Dancing Grenade, no el Zed
  Chaos del video, y el reciclado de Vi ahí paga un ledger que #46 caminó carta por carta bajo R15 = A.
  Una negativa hecha sobre otro mazo no es evidencia contra él.

**Veredicto: confirma `zed-clone-eye-recruits`.** Se agrega como fuente de esa entrada.

---

## 7. Especulación sobre reciclar tokens — y las reglas la contestan

> `[7:15] Uh you can't recycle it cuz it's a token, though. I think they ruled it to where you you
> can't recycle a token to do it. … [7:21] Interesting. I hope not because it's going to be insane the
> amount of mana you can make and you like maybe able to go pseudo infinite, but I don't know.`
> — BigChin Gaming, *"EKKO IS INSANE ll Renata Hook Riftbound Spiritforged Deck and Games"*,
> 2026-04-07, https://www.youtube.com/watch?v=ZQ7YayGO2PY (mi timestamp: 7:15, el issue dice 6:43)

El issue tiene razón en que **dos jugadores conversando no son una fuente**. Pero acá no hace falta una
fuente: **las reglas lo dicen, y el proyecto no lo tenía escrito en ningún lado**.

> **186** — *"Tokens are Created on the board or the Chain and cannot exist elsewhere."*
> **186.1** — *"If a token is put into any Non-Board Zone besides the chain, it ceases to exist
> immediately after moving to its new zone."*
> **416.1** — *"Recycling cards is the action in which a player takes one or more cards from a
> specific zone and then puts it on the bottom of the corresponding deck."*

El Main Deck es una Non-Board Zone. Un token reciclado **deja de existir al llegar ahí**: no queda
carta al fondo del mazo, así que reciclarlo no devuelve nada. Y hay una consecuencia más fuerte, que es
la que importa para caminar loops: **un token nunca llega al trash tampoco** (el trash también es
Non-Board), así que un coste del tipo `Recycle 1 from your trash` (Vi, `OGN-036`) **jamás puede elegir
un token**. No es que esté prohibido; es que no hay nada ahí para elegir.

**Impacto en el catálogo: ninguno, y lo verifiqué.** Barrido programático sobre los `steps` de las 135
entradas buscando "recycl" junto a un nombre de token: **un solo hit**, `battle-mistress-gold-refund`,
y lo que recicla ahí es una **runa** (164.2.b), no el Gold token que produce. Ninguna entrada recicla un
token.

Este hecho es **carga útil para la sección 1**: la cola Sand Soldier de la variante B de #62 recicla
`SFD-031 Desert's Call` con Vi, y hay que poder decir por qué el reciclado agarra el hechizo y no una
de las mil fichas. La respuesta son 186.1 (las fichas no están en el trash) y **416.6** (*"take X cards
of the instructed player's choice"* — el jugador elige, así que ni siquiera hace falta que el trash
esté vacío, como sí supone la fuente).

---

## Resumen

| # | afirmación | veredicto | cambio |
|---|---|---|---|
| 1 | Blitzcrank infinito | falso positivo ya registrado en `synergies.json`; las fuentes dicen "recurrente", no "combo" | ninguno |
| 2 | Kog'Maw loop de daño | **la fuente no lo dice**; el issue la describe mal | ninguno |
| 3 | Aspirant's Climb baneado | desfase de fecha (video de 2025-09, ban de 2026-07) | ninguno |
| 4 | "cambio de reglas" en triggers condicionales | es 383.2.a.1 y ya lo aplicamos; **la fuente confirma** | ancla 383.2.a.1 en `leblanc-temporary-plaza` |
| 5 | aritmética contradictoria 12 vs 16 | toca candidatas de §3, no el catálogo | ninguno |
| 6 | Zed "no infinito" | es sobre **Vi**, no sobre el swap; **confirma** `zed-clone-eye-recruits` | fuente nueva en esa entrada |
| 7 | no se pueden reciclar tokens | **cierto, y por 186 / 186.1 / 416.1**, no por un ruling | hecho de reglas registrado |

**Cero entradas refutadas. Cero cambios de clase. Cero cambios de cantidad.** Dos ediciones de
refuerzo y dos hechos de reglas nuevos (186/186.1 y 416.6) que la sección 1 usa.
