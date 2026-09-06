# Auditoría de marcas en las notas — 2026-09-06

**Sesión**: rc-audit. **Alcance**: las 52 entradas de `data/combos.json` (98 en total, las 98
`verified`) cuyo `notes`, `prerequisites.notable` o `steps` contienen
`UNRESOLVED | open reading | REFUTE | unruled | pending ruling | if R<n> = A|B`.

**El patrón que se caza** (regla del `CLAUDE.md`): *"A REFUTE verdict in notes is not a fix — grep
for corrections that were diagnosed and never applied."* rc-walk41 encontró dos el 2026-09-05
(`skyfall-ahri-conquer`, `svellsongur-copy-hold`). Esta pasada barre las 52.

## Medición

```
$ python3 -c "<grep de las marcas sobre notes+notable+steps>"
MATCHING ENTRIES: 52
```

Reproducida exactamente. Después de los arreglos el grep **sigue dando 52**, y eso es lo correcto:
un `REFUTE 2026-09-03: SURVIVES` fechado es el registro de lo que se probó, no una deuda. Lo que
sí queda en cero es el marcador de lectura viva:

```
residual live-open markers (UNRESOLVED | is an open reading | unruled sequencing | "(unruled"): 1
```

y ese 1 es mi propia frase en `ivern-sentinel-hold` diciendo que **ya no** está UNRESOLVED.

## Bloque de verificación — hecho primero, en bloque

**Reglas abiertas y leídas en `data/Riftbound-Core-Rules-2026-07-16.txt`** (no citadas de memoria):
136.2.b, 136.2.c, 136.2.d, 144.4 (a/b/c.1), 185.3.a.2, 190.4, 190.6.a, 190.6.b, 190.6.c, 190.6.d,
315.2.a, 315.2.b, 344.2, 348.2.a, 348.2.a.1, 383.2.a, 383.2.a.1, 383.2.b, 383.2.c, 383.3.d,
383.4.d.2 (a/b/c), 429.3, 429.3.a, 434.1.c, 477.1.a, 477.1.a.1, 477.1.b.1.a, 477.1.b.1.b, 718.3,
816.1 (a/b/c), 820.1.c.3, 820.1.d, 820.1.d.1.

Verbatim de los que sostienen un reescrito:

- **144.4.a** "Units may move from their Base to a Battlefield." · **144.4.b** "Units may move from
  a Battlefield to their Base." · **144.4.c.1** "Units with Ganking may use their Standard Move to
  Move from Battlefield to Battlefield."
- **348.2.a.1** "This results in a Conquer if that player has not yet scored that Battlefield this
  turn."
- **383.2.a.1** "Any additional conditional statement immediately after the Condition must be true
  in order for the Condition to be fulfilled. Such a conditional statement is part of the Trigger
  Condition and not the Effect." Ejemplo propio: Sona, Harmonious — *"If she is removed in reaction
  to the triggered ability, it will still resolve."*
- **383.4.d.2.b** "The Hold Abilities of anything that references the player Holding is put on the
  Chain as a Pending Item when the Condition that the player that controls the triggering source has
  performed a Hold and gained 1 Victory Point."
- **190.6.d** "'You' in a battlefield's abilities refers to the battlefield's Controller…"
- **429.3** "Activated abilities that Add resources and have the Reaction tag can be activated **at
  any time that spells or abilities require resources be paid**." · **429.3.a** "…it immediately
  finalizes and resolves, even during the resolution of spells and abilities."
- **477.1.b.1.a** Copyable traits: *Name, Super Type, Type, Tags, Cost, Domain, Rules Text*. Might
  no está. **477.1.a.1** "Assignment of Might is dealt with in this layer."
- **820.1.d** "…execute the instructions of this chain item one additional time during resolution."
  · **820.1.c.3** "Each Repeat Cost can be paid only a single time."

**Texto de carta, verbatim de `data/corpus_flat.txt`** (líneas 76, 292, 299, 319, 358, 387, 406,
443, 636, 726, 850):

| Código | Texto |
|---|---|
| OGN-066 Ahri, Alluring | Unit Calm **E5 P1 M4** — "When I hold, you score 1 point." |
| UNL-087 Blue Sentinel | Unit Mind **E4 P1 M4** — "[Shield 2] … Your hold effects for holding here trigger an additional time." |
| SFD-059 Svellsongur | Gear Calm **E3 P1**, [Equip] 1 Energy + 1 Calm — "As this is attached to a unit, copy that unit's text to this Equipment's effect text for as long as this is attached to it." |
| SFD-030 Skyfall of Areion | Gear Fury — "[Effect] My hold effects are also conquer effects, and vice versa." |
| SFD-115 Trinity Force | Gear Body **E4 M+2** — "[Effect] When I hold, score 1 point." |
| OGN-286 Reckoner's Arena | **Battlefield** — "When you hold here, activate the conquer effects of units here." |
| OGN-293 The Grand Plaza | **Battlefield** — "When you hold here, if you have 7+ units here, you win the game." |
| UNL-088 Gutter Palace | Gear Mind — "At the start of your Beginning Phase, if you have exactly 4 cards in hand and exactly 4 units at battlefields, you win the game." |
| VEN-075 Platewyrm Egg | Gear Body — "This enters exhausted. [Empower] … **[Reaction][>] exhaust: [Add] 1 Energy.** If this is [Empowered], [Add] 2 instead." |
| SFD-078 Temporal Portal | Gear Mind — "rainbow, exhaust: Give the next spell you play this turn [Repeat] equal to its cost." |
| UNL-177 Ivern, Friend to All | Unit Order **E6 M6** — "When I conquer or hold, score 1 point if your units have all of the following tags…" |

**Chequeo de bans**: `grep "<código>.*\[BANNED"` sobre las once cartas → **0 en las once**. (El corpus
tiene 12 marcadores `BANNED`; ninguno toca este material.)

**Trampas de autoría de `CLAUDE.md`**, abiertas y pasadas una por una sobre los reescritos: batalla
vacía ≠ ataque (807.1.d/383.4.e/461) — no aplica, ningún reescrito toca un trigger de ataque;
Energy de Awaken perdida en 167 — la cita de `platewyrm` ya la lleva y no se tocó; Repeat sin
ventana (429.3, R21) — **es exactamente lo que se corrigió, ver abajo**; [Temporary] muere antes de
Scoring (816.1.b) salvo cuando 383.3.d ordena — es lo de `gutter-palace`; Gold entra ready bajo R25;
reciclar runa la manda al Rune Deck (161.2.b); recall no es move (456/458). Y la de hoy, 808.1.d.1
(el escudo borra el Deathknell): ninguna de las 52 marcas la toca.

## Tabla de las 52

Veredictos: **1** = marca vigente, no se toca · **2** = marca vencida, reescrita · **3** =
contradicción interna, arreglada.

| # | id | Marca | V | Qué cambió |
|---|---|---|---|---|
| 1 | ahri-blue-sentinel-hold | `notable[4]`: "unruled Svellsongur reading" | **3** | R6 = A está ruleada desde 2026-09-04 y la aritmética del notable nunca se actualizó: decía **10 puntos por 18 Energy**, cuando `svellsongur-copy-hold` camina ese mismo tablero en **11** (N=2, K=4, 1+2×5) y cuesta **21** (5 + 4 + 3×(3+1)). El 18 era el costo del tablero de 2 Ahri que la propia entrada ya había abandonado por valer 7. Reescrito; techo 26 confirmado contra `CLAUDE.md`. |
| 2 | tryndamere-brambleback-conquer | REFUTE | 1 | La corrección T=2, K=3 = 9 ya está aplicada en `uses`. |
| 3 | grand-plaza-recruit-vanguard | REFUTE SURVIVES | 1 | Marca vigente. Aparte: re-auditoría del Plaza (abajo) — se le **agregó** la cita 383.2.a.1/383.2.c al `notable[3]`; no corrige nada, precisa el instante. |
| 4 | gutter-palace | `notes` abre con "Temporary units are NOT settled either way" | **3** | La misma nota dice después "SETTLED 2026-09-04 … no longer an open reading". Tres estratos superpuestos; se colapsó el primero. Verificado: UNL-088 dispara "At the start of your Beginning Phase" y 816.1.c fija la condición de [Temporary] en el mismo instante → 383.3.d te da el orden. |
| 5 | gutter-palace-keeper-time-warp | "open reading" | 1 | Falso positivo: la frase dice "This is settled, **not** an open reading". |
| 6 | blue-sentinel-trinity-force-hold | REFUTE | 1 | Corrección aplicada (Trinity Force a 3, 10 puntos). |
| 7 | brambleback-trinity-skyfall-conquer | "Open question… That reading is arguable and is why this stays a candidate" | **2** | La entrada está `verified` y la pregunta la contesta el texto de reglas, no una lectura: 136.2.c + 718.3 + 434.1.c pegan el Effect Text de **ambos** Equipment al mismo Top-Most Card y 136.2.d hace que "I"/"my" sea ese Top-Most Card. Reescrito como SETTLED sin archivar lectura. Se borró la frase "stays a candidate", que la propia nota se contradice dos oraciones después. |
| 8 | skyfall-ahri-conquer | REFUTE | 1 | Ya arreglada por rc-walk41 el 2026-09-05 (SETTLED, R6 = A). |
| 9 | world-atlas-sentinel-gold | REFUTE | 1 | R1 = A, dicho. |
| 10 | gauntlets-enforcer-conquer | REFUTE WOUNDED | 1 | Corrección aplicada; R28 = A. |
| 11 | azir-aphelios-attach | REFUTE WOUNDED | 1 | "Depends on no unruled reading". |
| 12 | ashe-retreat-hand-strip | REFUTE WOUNDED | 1 | BUDGETED #21, cierra. |
| 13 | promising-future-force-deck | REFUTE WOUNDED | 1 | BUDGETED #21, cierra. |
| 14 | ruination-sprite-burst-clear | "R7 applies only if…" ×3 | **2** | R7 fue **RETIRADA** el 2026-09-04 como aritmética (ledger #21) y la nota la nombraba tres veces sin decirlo. Añadida la disposición. El veredicto sustantivo no cambia. |
| 15 | bloodharbor-bewitching-discard | REFUTE SURVIVES | 1 | — |
| 16 | time-warp-hold-burst | REFUTE | 1 | Reclase BURST→CHAIN aplicada (#20). |
| 17 | renata-bubble-bot-ready | `notes` abre con "UNRESOLVED per the lens" | **3** | El cierre de la misma nota dice "The Heimerdinger question (R12) is **not a dependency** - Heimerdinger is not in uses". R12 sigue abierta y legítimamente, así que **no se retira**: se reescribió el encabezado como "Open but NOT a dependency, filed as R12". |
| 18 | swain-double-conquer | "Still a candidate… the entry's step 3 covers both routes" | **3** | El `step[1]` de la propia entrada ya elige una ruta y cita 144.4.c. Verificado verbatim: 144.4.a/b sólo base↔battlefield, battlefield→battlefield **sólo con [Ganking]** (144.4.c.1), y Swain, Visionary no lo tiene. Frase vencida borrada. |
| 19 | bottled-constellation-time-warp | REFUTE SURVIVES | 1 | — |
| 20 | power-nexus-sentinel | "The real and only blocker **is** R8 … no verified entry stands on that scoping **today**" | **2** | R8 se ruleó A ese mismo día y hoy `nasus-ascended-sentinel-arena-hold` está construida sobre ese scoping. Pasado a pretérito y cerrado el bloqueo. |
| 21 | ivern-sentinel-hold | "whether Sentinel multiplies the Arena's own trigger is **UNRESOLVED**" + "Arguable, hence candidate" | **2** | OGN-286 Reckoner's Arena **es un Battlefield** (corpus, línea 292), así que la pregunta es literalmente R8 → **ruleada A el 2026-09-04**. Reescrito con los cuatro referentes (190.6.a, 190.6.c, 190.6.d, 383.4.d.2.b) y el puntero a la entrada verificada que sí lo usa. "Arguable, hence candidate" → "R1, ruled A". **No se tocaron cantidades ni clase**: meter el Arena en este tablero es una caminata. |
| 22 | kharox-sanction-burn | REFUTE con step fix | 1 | Aplicado; 828.1.d verificado. |
| 23 | grand-plaza-loop-time-warp | REFUTE void | 1 | Ya lleva la corrección 383.2. |
| 24 | zed-clone-eye-recruits | REFUTE + R9 | 1 | R9 declarada retirada correctamente. |
| 25 | jayce-mesmerize-renata | REFUTE | 1 | Corrección hacia abajo aplicada. |
| 26 | jhin-relentless-pursuit-wallop | `notable[1]`: "(190.4; **unruled sequencing, R20**)" | **3** | El `notes` de la MISMA entrada dice "R20 RETIRED 2026-09-04 as settled by rules text". Reescrito el notable con 344.2 / 348.2.a / 348.2.a.1 verbatim. |
| 27 | jhin-emperors-divide-hidden | "no unruled reading" | 1 | Falso positivo del grep. |
| 28 | platewyrm-egg-defender-gate | `steps[4]`: "(unruled, R21)" **y cita 429.3 al revés** | **3** | Dos cosas. (a) El `notes` dice que 820.1.d es *explícito* y 820.1.c.3 tapa el pago — no es "unruled". (b) **429.3 dice lo contrario de lo que la step le hacía decir**: es una *permiso* ("can be activated at any time that spells or abilities require resources be paid") y 429.3.a lo deja resolver *even during the resolution of spells and abilities*. El Egg VEN-075 lleva justamente "[Reaction][>] exhaust: [Add] 1", así que la cita importaba. La conclusión **se sostiene** pero por el motivo correcto: el permiso está acotado a los momentos de pago de costo, 820.1.d mete las dos ejecuciones en UNA resolución y 820.1.c.3 permite un solo pago, así que no hay segundo Pay Costs entre ellas. Reescritos `steps[4]` y la nota de `uses[3]`. R21 **no** se retira: sigue abierta y la entrada toma su lectura conservadora. |
| 29 | sprite-fountain-malzahar-jayce | "no unruled reading" | 1 | Falso positivo. |
| 30 | sona-viktor-opponent-turn | "no unruled reading" | 1 | Falso positivo. |
| 31 | reksai-undertitan-reveal | R22 | 1 | R22 abierta y explícitamente no mueve el número. |
| 32 | treasure-hunter-industrialist-gold | "no unruled reading - R9 is settled" | 1 | — |
| 33 | fiora-vault-breaker-jhin | REFUTE + R13/R14 | 1 | R13 textual; R14 sólo capea. |
| 34 | fae-dragon-wallop-industrialist | "no unruled reading" | 1 | Recalibración de Overt Operation ya aplicada. |
| 35 | aphelios-jax-quickdraw-attach | "no unruled reading" | 1 | — |
| 36 | virtuoso-banish-channel | REFUTE | 1 | R26 = B, dicho. |
| 37 | renata-time-warp-ekko-refresh | REFUTE | 1 | La reclase BURST→ENGINE del audit 2026-09-04 **está aplicada** (`class: ENGINE`). |
| 38 | dazzling-aurora-elder-dragon | "no unruled reading" | 1 | — |
| 39 | jhin-fiora-facebreaker-recall | "no unruled reading" | 1 | — |
| 40 | garen-fiora-malzahar-facebreaker-recruits | "no unruled reading" + R11 | 1 | R11 abierta, sólo elige el buff. |
| 41 | jhin-virtuoso-ekko-malzahar-vi | `notable[2]` encabeza "Draw budget (**R7**)" | **2** | R7 retirada el 2026-09-04; el encabezado la nombraba como si estuviera viva. Añadida la disposición. |
| 42 | gemdragon-henge-vi-blind-fury | "open reading (R15)" | 1 | R15 **está** abierta (R11–R19) y la nota ya dice que sólo aparece dentro de la recursión ya refutada. Marca vigente. |
| 43 | leblanc-zilean-reflection-doubling | REFUTE: "R27 **may** leave every clone at 0 Might" | **3** | La misma entrada dice en otro campo "R27 RETIRED 2026-09-04 … the clones are all 0 Might". Verificado: 477.1.b.1.a lista los copyable traits y Might no está; 477.1.a.1 lo maneja en otra capa. "may" → "does", con la cita y el puntero al step 3 (Darius) que ya lo paga. |
| 44 | pack-of-wonders-bewitching-discard | "no unruled reading" | 1 | — |
| 45 | ezreal-marai-spire-free-repeat | `notable[5]`: "unruled question (820.3.a / 820.2)" | 1 | Legítima y **no archivada**: la entrada se para en la ruta de dos hechizos justamente para no necesitarla. Es el patrón que `CLAUDE.md` pide. |
| 46 | yeti-brambleback-renata-gold | "does NOT stand on any open reading" | 1 | Falso positivo. |
| 47 | reksai-sarcophagus-accelerated-recursion | `notable[2]`: "unruled question" evitada | 1 | Igual que 45: la entrada elige la carta que no la plantea. |
| 48 | swift-scout-guerilla-hide-cycle | "no unruled reading" | 1 | — |
| 49 | spiderling-swarm-grand-plaza | "no unruled reading" | 1 | Ya aplica la corrección 383.2 de rc-walk36. |
| 50 | katarina-reckless-hidden-burn | "no unruled reading" | 1 | — |
| 51 | noxian-drummer-eye-svellsongur-plaza | REFUTE citado | 1 | Cita legítima al REFUTE de otra entrada. |
| 52 | arise-sand-soldiers-plaza | REFUTE citado | 1 | Igual. |

## Re-auditoría del Grand Plaza — el cabo suelto del handoff

rc-walk36 dejó la corrección **383.2.a.1 + 383.2.c**: el "if you have 7+ units here" del Plaza es
**Condición**, no Efecto, y se mide **en el instante del Hold**. El handoff decía que obligaba a
re-auditar las entradas viejas del Plaza. Hecho: nueve entradas llevan OGN-293, cinco ya cargan la
corrección, y las cuatro que no son `grand-plaza-recruit-vanguard`, `zed-clone-eye-recruits`,
`leblanc-temporary-plaza` y `pursuer-herald-recruits`.

**Resultado: la corrección es confirmatoria en las cuatro y no tumba ninguna.** El motivo es que
todas ponen cuerpos **no-[Temporary]** (o suprimen el kill con LeBlanc bajo R10 = A) que siguen ahí
cuando llega el Hold, que es exactamente lo que 383.2.a.1 exige. `grand-plaza-recruit-vanguard` ya
lo decía sin el número de regla ("still there for the Scoring Step (315.2.b)"); se le agregó la
cita. A `leblanc-temporary-plaza` y `pursuer-herald-recruits` **no se las tocó**: no hay corrección
que aplicar, y editarlas sería ruido. Ninguna cantidad, clase ni `terminatesIn` cambia.

## Conteo

- **52** entradas con marca, las 52 revisadas.
- **40** veredicto 1 — marca vigente. Desglose medido, no estimado (se le resta al texto el modismo
  benigno "no unruled reading" y se mira qué marca queda): **6** son sólo ese falso positivo del
  grep, **31** son registros `REFUTE` fechados cuya corrección ya está aplicada, y **3** nombran una
  lectura genuinamente abierta que la entrada declara y esquiva — `gemdragon-henge-vi-blind-fury`
  (R15, dentro de una recursión ya refutada), `ezreal-marai-spire-free-repeat` y
  `reksai-sarcophagus-accelerated-recursion` (dos preguntas sin número que la entrada evita eligiendo
  otra ruta o otra carta).
- **5** veredicto 2 — marca vencida y reescrita: 7, 14, 20, 21, 41.
- **7** veredicto 3 — contradicción interna arreglada: 1, 4, 17, 18, 26, 28, 43.
- **13** entradas tocadas en total (las 12 anteriores + la cita 383.2 en la 3).
- **0** entradas refutadas. **0** cambios de `class`, `quantity`, `uses`, `needs`, `produces` o
  `terminatesIn`. Ninguna ENGINE resultó INFINITE.
- **1** error de cita encontrado, del tipo que el `CLAUDE.md` avisa: `platewyrm-egg-defender-gate`
  citaba **429.3** para negar una ventana que 429.3 en realidad *concede* (acotada). La conclusión
  aguanta; el argumento no era el que estaba escrito.
- **0** lecturas nuevas archivadas. Todo lo que apareció se cerró con texto de reglas o con una
  lectura ya ruleada, que es lo que pide `CLAUDE.md`.

## Lo que queda para una caminata, no para una auditoría

1. **`ivern-sentinel-hold` + Reckoner's Arena.** Con R8 = A el doble dip que la entrada dejaba
   afuera por "UNRESOLVED" es legal, y `nasus-ascended-sentinel-arena-hold` ya lo camina en otra
   forma. Meterlo acá cambia el tablero declarado y su aritmética → caminata.
2. **`ahri-blue-sentinel-hold` + Svellsongur.** El tablero de `svellsongur-copy-hold` es más barato
   (21 vs 23 Energy) y más fuerte (11 vs 10 puntos) con R6 = A. Son dos entradas distintas a
   propósito; fusionarlas o rebalancear cantidades es caminata (y `test/matcher.test.ts` fija las
   cantidades de esta entrada).

## Verificación

```
npm test        → 9 files, 117 tests passed
npm run typecheck → limpio
npm run build:web → public/app.js 780 KB
```
