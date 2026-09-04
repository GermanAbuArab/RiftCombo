# Minado de r/riftboundtcg y el ensamblado de Gutter Palace — 2026-09-04

Cuarta pasada de comunidad, hecha con browser real sobre `old.reddit.com` (Reddit responde 403 a
fetch plano; desde dentro de la página, `old.reddit.com/r/<sub>/comments/<id>.json` sí devuelve el
hilo completo, que es la vía barata para leer varios de una). Cierra los candidatos #9 y #11 del
issue #16, corrige una entrada `verified` y agrega una nueva.

---

## 1. Candidato #9 — el deck "Infinite Combo" de Viktor NO es lo que decía el brief

`https://riftmana.com/decks/infinite-combo-fpbglm/` — SpicyMcChicken, publicado **2026-02-19**,
1.186 vistas, 0 likes. Página abierta a mano por `r.jina.ai` (riftmana devuelve 403 directo).

El brief del issue lo describía como "Herald of the Arcane + Eye of the Herald + Renata Glasc,
Industrialist, **sin** la baneada Stealthy Pursuer", como si fuera el cascarón de un loop al que le
sacaron el motor. **Es incorrecto en los dos extremos.** La decklist real es:

- Legend: Viktor, Herald of the Arcane (OGN-265) · Champion: Viktor, Innovator (OGN-117)
- 3× Eye of the Herald (SFD-153), 3× Renata Glasc, Industrialist (SFD-171)
- **3× Facebreaker (OGN-220), 3× Fiora, Worthy (SFD-180), 3× Garen, Commander (OGS-013),
  3× Malzahar, Fanatic (OGN-113), 3× Stupefy (OGN-095), 3× Rally the Troops (SFD-166)**
- Battlefields: The Papertree (SFD-219), Aspirant's Climb (OGN-276), **Trifarian War Camp (OGN-294)**
- 9 Mind Rune + 3 Order Rune

Eso es, **carta por carta, `garen-fiora-malzahar-facebreaker-recruits`** — que el catálogo ya tiene
como INFINITE verificada desde el 2026-09-04, sacada de otro sitio (el hilo "Bring this incredible
7 card combo", 333 puntos). Garen, Fiora, Malzahar, Stupefy, Facebreaker, Trifarian War Camp y los
dos Eyes: los siete componentes de la entrada están en el mazo.

Y **Stealthy Pursuer nunca estuvo**: el mazo es del 2026-02-19 y el ban es del 2026-07-24, cinco
meses después. El deck no perdió su motor; siempre fue el loop de Facebreaker.

El autor no escribió una sola línea de prosa: el `deck-description` de la página está vacío
(contiene solo `&#160;`) y el `description` del JSON-LD es `""`. La única cosa que afirma que es
infinito es el nombre del deck — y resulta que, esta vez, tiene razón.

**Veredicto: #9 no es un candidato nuevo. Es una segunda fuente, independiente y anterior, para una
entrada que ya está verificada.** Agregada a sus `sources`.

### Lo que sí aporta: el deck usa un buff que nuestra entrada había descartado

La entrada dice, sobre cómo Malzahar llega a Mighty:

> "El buff tiene que venir de una carta Mind u Order que pegue a una unidad ya en el board: Bonds of
> Strength (SFD-151). Rally the Troops solo buffea unidades jugadas después de que resuelve, lo que
> obligaría a rejugar a Malzahar y entraría exhausted (143.4)."

El deck publicado lleva **3× Rally the Troops y cero Bonds of Strength**. Y la objeción se responde
sola con una pieza que el combo ya usa:

- **Rally the Troops (SFD-166)**: "When a friendly unit is played this turn, buff it." El mecanismo
  de la objeción es correcto — solo alcanza a unidades jugadas después.
- Pero **"entra exhausted" no importa**: Malzahar jugado bajo Rally queda en 3 + 1 = 4 Might, y con
  el aura de Garen en base (OGS-013, "Other friendly units have +1 Might here") llega a 5 →
  **becomes Mighty** → **Fiora, Worthy lo readya por 1 Order Power**, que es exactamente el disparo
  que el loop usa en cada pasada de vuelta. El cebado se paga con la misma pieza.
- Y encima el buff de Rally es **mejor** para el loop: la regla **702** dice "Buffs are counters
  placed on Units" y **705** solo los quita si la unidad deja el juego, así que es permanente,
  mientras que Bonds of Strength da "+1 Might **this turn**".

Corregido en las notas de la entrada. No cambia la clase ni el conteo: sigue siendo INFINITE con
Power neutro.

---

## 2. Candidato #11 — el "primer infinito" de Spiritforged es el loop baneado

Hilo: `old.reddit.com/r/riftboundtcg/comments/1qx2bsr/prerift_event_infinite/`, **2026-02-06** — un
día antes de los videos que el issue databa 2026-02-07/09. Texto del OP, textual:

> "So I just saw that there is an infinite combo in purple and yellow domain using Stealthy Pursuer,
> Renata, Industrial & Eye of the Herald."

Es decir: el "primer infinito" es **exactamente `pursuer-herald-recruits`**, que el catálogo ya
tiene verificada y anotada como baneada. No es una línea nueva.

El hilo además responde su propia pregunta, y en contra: el OP quería jugarlo en un Pre-Rift event
de Spiritforged, y la comunidad le contesta unánime que no se podía —

> "You wouldn't be able to use stealthy pursuer because it's a ogn card. You can only use the cards
> that you get in the pre release box." (Tight_Negotiation909, 7 puntos)

— y el propio OP edita el post: *"Update: I have just seen that stealthy is in origins! Forgive me!"*
Un comentario anticipa el legend que lo habilitaría: *"There will be an order+chaos legend in set 4"*
(amhran_na_huaignis) — Heart of the Tempest, que es el que nuestra entrada ya nombra.

**Veredicto: #11 cerrado, negativo. Ni combo nuevo ni loop escrito nuevo; es el mismo loop baneado,
y ni siquiera era legal en el formato del que hablaba el hilo.** Agregado como fuente a la entrada.

---

## 3. `jhin-fiora-facebreaker-recall` — corroborado, incluida su corrección

Hilo "Infinites (All Current Ones) - Tokens, Energy, & Power"
(`comments/1ryj4fw/`, 109 puntos, 2026-03-20, badfeelingabout_this). Es un flowchart en imagen, sin
texto, pero los comentarios contienen la misma corrección que nuestra entrada ya aplica — y la hace
el propio autor del post:

> "You made me double check the rules on how units move back. I was thinking the Jhin moving back to
> base is a move. But 444.1.a.2 - specifies that its a recall (during combat cleanups) - not a move,
> and Rule 432 says that recalls are not 'moves' and do not trigger move abilities. So it would still
> be infinite energy (and tokens) as you don't need that, but your 1 power from moving to the
> battlefield and then being recalled is spent on readying him."

Coincide con el balance de nuestra entrada tras el REFUTE (+1 Energy, ±0 Power, +1 Recruit por
pasada). También coincide el refute del mill de Draven que ya teníamos anotado: un comentarista
propone ganarle a Draven por Burn Out forzándole robar en cada combate ganado, que es la línea que
este catálogo ya había descartado.

Nada que cambiar. Agregado como corroboración.

---

## 4. NUEVO: `gutter-palace-keeper-time-warp` — el ensamblado concreto del Gutter Palace

Hilo "Ezreal (blue/purple) OTK from 1 point" (`comments/1ud54d0/`, 2026-06-23). El autor publica una
lista de 7 cartas y una secuencia paso a paso. El catálogo tenía `gutter-palace` como ALT_WIN
genérica — la carta sola y su propia habilidad de ajuste (mano −1, unidades +1, una vez por turno).
Lo que faltaba era **cómo se llega a 4/4 en un solo turno**, y el hilo lo tiene:

- **Invert Timelines (OGN-201, Chaos, 3E 1P)**: "Each player discards their hand, then draws 4."
  Fija la mano en **exactamente 4** de una carta. Es el afinador de la mitad de la condición.
- **Keeper of Masks (UNL-081, Mind, 2E, 1 Might)**: "[Hidden] … When you play me, play two Reflection
  unit tokens here. Then do this: They become copies of me." Una carta, **tres cuerpos** en el
  battlefield. Es el afinador de la otra mitad.

### La cuenta

Prerequisito: una unidad tuya en un battlefield que controlás, Keeper of Masks ya escondida, 12 runas.

| paso | costo | mano | unidades en battlefields |
|---|---|---|---|
| Jugar Ekko, Recurrent (OGN-110) | 5E + 1P | — | — |
| Jugar Gutter Palace (UNL-088) | 4E | — | — |
| Malzahar (OGN-113) mata a Ekko, exhaust: **+2 Power**. Deathknell de Ekko: readya tus runas | 0 | — | — |
| Jugar Time Warp (OGN-122) | 10E + 4P | — | — |
| Jugar Invert Timelines (OGN-201) | 3E + 1P | **= 4** | — |
| Revelar Keeper of Masks desde Hidden | **0E** | 4 | 1 + 3 = **4** |

22 Energy y 6 Power con 12 runas: exhaustás las 12 (12E), reciclás una para el Power de Ekko,
Malzahar mata a Ekko y su Deathknell readya las 11 que quedan (11E más = 23E en total), y los 6
Power salen de reciclar runas exhausted (reciclar no pide ready). Cierra con 1 Energy de sobra.
Revelar una Hidden cuesta 0 Energy, así que Keeper entra gratis y **no sale de la mano** — la mano
queda en los 4 que dejó Invert Timelines.

### Las tres comprobaciones que la sostienen

1. **Los Reflections cuentan aunque valgan 0 Might.** 187.6 los define como "domainless unit token
   with 0 Might" — son unidades legales, y Gutter Palace cuenta unidades, no Might. Que sigan en 0 es
   correcto: 477.1.b.1.a lista los traits copiables (Name, Super Type, Type, Tags, Cost, Domain,
   Rules Text) y **Might no está** — es R27, ya retirada en este proyecto por esa misma lista.
2. **No hay loop escondido.** UNL-T06 imprime "I don't get that card's play effects", así que las
   copias de Keeper no vuelven a disparar "play two Reflection unit tokens".
3. **[Temporary] no rompe la cuenta, y esto ya no es una lectura abierta.** Keeper trae [Temporary] y
   sus copias lo heredan porque Rules Text sí es copiable — el ejemplo trabajado de Riot en
   477.1.b.1.b lo dice con todas las letras ("two of which are token Copies with Temporary"). Así que
   3 de las 4 unidades mueren al empezar tu Beginning Phase. Pero:
   - **816.1**: "Temporary is a Triggered Ability keyword", y **816.1.c** fija su condición de
     disparo en "the controller of the permanent's Beginning Phase starting".
   - Gutter Palace dispara en el mismo instante ("At the start of your Beginning Phase…").
   - **383.3.d**: "If more than one Triggered Ability is Triggered simultaneously, then the player
     that controls the Abilities selects the order to place them on the Chain."
   - Las dos son tuyas. Vos elegís el orden, y la victoria resuelve antes que las muertes.
   - El "before scoring" de 816.1.b no fuerza nada en contra: el Scoring Step (315.2.b) es
     **posterior** al Beginning Step (315.2.a), donde disparan las dos.

   La entrada `gutter-palace` decía "si un cuerpo Temporary puede contarse queda abierto, y favorece
   al jugador". **No queda abierto**: 816.1 lo hace habilidad disparada y 383.3.d entrega el orden.
   Corregido.

### Y Time Warp borra la exposición

La debilidad que `gutter-palace` siempre tuvo anotada es que pasás el turno en 4/4 y el rival tiene
un turno entero para romper la cuenta matando una unidad. Time Warp da el turno extra, así que el
Beginning Phase llega **sin turno rival en el medio**. La ventana de interacción se reduce a un Open
State dentro de tu propio turno. El autor del hilo lo dice sin adornos: *"assuming ALL THE STARS
ALIGN … your opponent had no removal/kill spells/counterspells/units in base the turn before"*.

Burn Out no interfiere: el chequeo de victoria es el Beginning Step (315.2.a) y la Draw Phase es
315.4, dos pasos después.

Dominio: Mind + Chaos (Invert Timelines y Heedless Resurrection son Chaos). Legends posibles:
Ezreal, Prodigal Explorer (SFD-199) o Soul's Reflection (VEN-151).

---

## Lo que se miró y no dio nada

- **"Lux infinite combo — ruling already exists!"** (149 puntos, 2026-06-07): el título promete un
  ruling; el cuerpo no cita ninguna regla ni ningún fallo de Riot. No sirve como fuente.
- **"Explanation for Ancient Henge infinite power combo"** (96 puntos, 2026-05-16): es el stream de
  Sydney R1 que ya respalda `gemdragon-henge-vi-blind-fury`. Los comentarios son sobre el ritmo de
  juego, no sobre el loop. Un comentario pide banear a Vi "porque el reciclado infinito es lo que lo
  hace posible", coherente con nuestra entrada.
- **"5 Turns or BUST! Jayce Infinite Combo Decklist and Gameplay"**: el post es un link a YouTube
  (`09bb3L-SjLA`), sin texto y con un solo comentario. Sigue necesitando las cookies del usuario.

## Links

- Issue #16 — minado de comunidad.
- `docs/phase0/walks/2026-09-04-source-verification-tcgplayer.md` — verificación de fuentes del mismo día.
