# Índice de caminatas

Cada archivo de este directorio es una **caminata a mano**: una sesión abrió cada regla que la
entrada cita en `data/Riftbound-Core-Rules-2026-07-16.txt` y cada texto de carta en
`data/corpus_flat.txt`, verbatim y con grep, y escribió lo que encontró. Una entrada de
`data/combos.json` no pasa a `status: "verified"` sin uno de estos documentos detrás.

La columna **entradas** es medida, no recordada: es el conteo de entradas `verified` en
`data/combos.json` justo antes y justo después del commit que agregó el archivo. El comando que la
produce, para cualquier caminata:

```
c=$(git log --diff-filter=A --format=%h -- docs/phase0/walks/<archivo>.md | tail -1)
for r in "$c^" "$c"; do git show "$r:data/combos.json" \
  | node -pe 'const a=JSON.parse(require("fs").readFileSync(0,"utf8")).combos; a.filter(e=>e.status==="verified").length+"/"+a.length'; done
```

Medido sobre el commit `d8e84f2` (2026-09-06). El total en ese punto es **245 entradas, las 245
`verified`**.

Tres cosas que la tabla no dice y conviene saber al leerla:

- **Las 21 caminatas del 2026-09-04 son la campaña del issue #11** (*"la base tiene 8 entradas y un
  deck real no matchea nada"*): llevar el catálogo de 8 entradas caminadas a 51. Sólo dos de sus
  commits lo escriben (`Refs #11`), por eso la columna *issue* dice `#11` sin que el documento lo
  nombre. En esa campaña el denominador se mueve poco y el numerador mucho: las entradas ya estaban
  en el archivo como `candidate` y la caminata las promovía.
- **Desde el 2026-09-05 cada caminata cierra la lente de un issue** y todas las entradas del archivo
  son `verified`, así que numerador y denominador coinciden.
- **Una caminata puede dejar cero entradas nuevas y seguir siendo trabajo.** Seis de ellas son
  auditorías o lecturas: verifican citas, corrigen notas, refutan afirmaciones de la comunidad o
  deciden si una lectura merece número, sin agregar filas.

## Tabla

| Documento | Fecha | Issue | Entradas (verified/total) | Qué hizo |
|---|---|---|---|---|
| `2026-09-04-jhin-fiora-facebreaker-recall.md` | 09-04 | #11 | 4/51 → 5/51 | El primer loop no acotado caminado paso a paso: +1 Energy por pasada, ningún recurso finito consumido. |
| `2026-09-04-ahri-blue-sentinel-hold.md` | 09-04 | #11 | 5/51 → 6/51 | HOLDS, pero la entrada declaraba un tablero que su propia fórmula resuelve a 7 puntos. Corregida al tablero más barato que gana. |
| `2026-09-04-three-alt-win-and-burst.md` | 09-04 | #11 | 6/51 → 9/51 | `gutter-palace`, `grand-plaza-recruit-vanguard` y `blue-sentinel-trinity-force-hold`, juntas porque comparten el esqueleto de tiempos de 315.2–315.4. |
| `2026-09-04-four-engines.md` | 09-04 | #11 | 10/51 → 14/51 | Cuatro ENGINE. Dos citas apuntaban a la sub-regla equivocada y una regla imponía una restricción que la entrada no declaraba. |
| `2026-09-04-skyfall-conquer-pair.md` | 09-04 | #11 | 14/51 → 16/51 | Los dos BURST de Skyfall of Areion, los únicos que la auditoría aritmética había dado por correctos tal como estaban. |
| `2026-09-04-divide-and-plaza.md` | 09-04 | #11 | 16/51 → 17/51 | Las dos entradas que quedaban a medio analizar. `grand-plaza-loop-time-warp` falló en la primera pasada y se rescató resecuenciando; la lectura R29 que habría necesitado quedó retirada sin usarse. |
| `2026-09-04-r6-r10-r28-batch.md` | 09-04 | #11 | 18/51 → 23/51 | Las cinco entradas que desbloquearon R6 = A, R10 = A y R28 = A, más el chequeo de 471.1.b (la restricción del punto final) común a las tres líneas de puntos. |
| `2026-09-04-two-industrialist-engines.md` | 09-04 | #11 | 23/51 → 25/51 | Los dos motores de Renata Glasc, Industrialist. En el camino, **R9 retirada**: las dos mitades están en el libro. |
| `2026-09-04-zed-zilean-and-r27.md` | 09-04 | #11 | 25/51 → 27/51 | El swap de Zed y los Zilean de LeBlanc. **R27 retirada**: la Might no es un rasgo copiable (477.1.a, 477.1.b.1.a, 185.3.a.2). |
| `2026-09-04-virtuoso-and-two-attach.md` | 09-04 | #11 | 27/51 → 30/51 | Virtuoso y los dos motores de attach de Aphelios. Para un ENGINE el techo que nombra la entrada *es* toda la afirmación. |
| `2026-09-04-jhin-fiora-gauntlets-pack.md` | 09-04 | #11 | 30/51 → 33/51 | Jhin bajo Fiora, los Gauntlets y la cinta de la Pack. |
| `2026-09-04-aurora-reksai-platewyrm.md` | 09-04 | #11 | 33/51 → 36/51 | Aurora, Rek'Sai y los Platewyrm Eggs. Dos entradas afirmaban cosas opuestas sobre la misma regla; el texto la zanja. |
| `2026-09-04-sprites-and-dragons.md` | 09-04 | #11 | 36/51 → 38/51 | Sprite Fountain y la rampa de Dragonstorm: dos entradas cuyo valor es ser honestas sobre lo que *no* funciona. La caminata confirma la refutación tanto como el motor. |
| `2026-09-04-garen-recruit-loop.md` | 09-04 | #11 | 38/51 → 39/51 | El único INFINITE del catálogo que no necesita el loop de Lux debajo (`needs: []`). |
| `2026-09-04-loop-budget-ledger.md` | 09-04 | #21 | 40/51 → 45/51 | El balance conjunto de los dos loops de Lux. **Cambia cuál es el recurso escaso**: no son los slots de reciclaje, son los draws. |
| `2026-09-04-jhin-pursuit-and-r20.md` | 09-04 | #11 | 46/51 → 47/51 | **R20 retirada**: 344.2 abre un Showdown y 348.2.a.1 dice literalmente que eso resulta en un Conquer. |
| `2026-09-04-the-three-chain-finishers.md` | 09-04 | #20 | 47/51 → 50/51 | **Nace la clase CHAIN**: llega a 8 en varios eventos de scoring sin que el oponente juegue en el medio. ENGINE habría sido falso — estas ganan. |
| `2026-09-04-power-nexus-r8.md` | 09-04 | #11 | 50/51 → 51/51 | La última candidata, y **R8 ruleada A**: el trigger de hold del propio battlefield es uno de "tus hold effects" (190.6.a/c/d + 383.4.d.2). |
| `2026-09-04-source-verification-tcgplayer.md` | 09-04 | #16 | 51/51 → 51/51 | Auditoría de fuentes: los dos artículos de TCGplayer abiertos enteros, **9 de 9 citas confirmadas**. Sin entradas nuevas. |
| `2026-09-04-reddit-mining-and-gutter-palace.md` | 09-04 | #16 | 51/51 → 52/52 | Minado de r/riftboundtcg. El mazo "Infinite Combo" de Viktor no era lo que decía el brief: leer la lista antes de creerle a la descripción. |
| `2026-09-04-nine-domain-lens-candidates.md` | 09-04 | #29 | 52/61 → 61/61 | Las nueve candidatas de la caza por dominio: 9 sostienen, 3 tras reescritura, 0 refutadas. **46 citas distintas abiertas antes de caminar nada.** |
| `2026-09-05-repeat-accelerate-add-candidates.md` | 09-05 | #32 | 61/61 → 67/67 | Lente de multiplicación de recursos (`[Repeat]`/`[Accelerate]`/`[Add]`): 6 sostienen, 3 reescritas. |
| `2026-09-05-death-and-return-candidates.md` | 09-05 | #36 | 67/67 → 78/78 | Lente de muerte y retorno: 7 de 7 verified, 3 reescritas. Ninguna resultó INFINITE. |
| `2026-09-05-escalation-empower-flow-candidates.md` | 09-05 | #34 | *(mismo commit que #36; 11 entradas entre las dos)* | Lente de escalada (`[Empower]`/`[Flow]`/`[Level N]`): 4 de 4 verified, 2 reescritas hacia arriba. |
| `2026-09-05-hidden-ambush-candidates.md` | 09-05 | #40 | 78/78 → 87/87 | Lente del escondite: 9 de 9 verified. Anota el riesgo de 323.7 (perder el battlefield trashea la carta escondida) en las siete entradas que esconden cartas. |
| `2026-09-05-equipment-lens-candidates.md` | 09-05 | #41 | 87/87 → 91/91 | Lente de equipo: 4 verified, 1 refutada. Aplica además **dos correcciones diagnosticadas y nunca aplicadas** dentro de entradas ya `verified`. |
| `2026-09-06-reaction-deflect-candidates.md` | 09-06 | #44 | 91/91 → 98/98 | Lente de la respuesta: 7 de 7 verified, 3 reescritas. Encuentra el **suelo gratis de 2 Power por turno** que todo mazo tiene (164.2.b, 161.2.b, 315.3.b/430.4.a). |
| `2026-09-06-notes-audit.md` | 09-06 | #11 | 98/98 → 98/98 | Auditoría de las **52 entradas con marcas** REFUTE/UNRESOLVED/unruled: 40 vigentes, 5 vencidas reescritas, 7 contradicciones. Una entrada citaba 429.3 para negar lo que 429.3 concede. Sin entradas nuevas. |
| `2026-09-06-issue45-two-boards.md` | 09-06 | #45 | 98/98 → 99/99 | Los dos tableros que las lecturas ruleadas dejaron mejores que los caminados. **Svellsongur compone, no suma**: v copias sobre una unidad dan 2^v instancias (476.1, 477.2.c, 479.1, 480.3). |
| `2026-09-06-deck-construction-rules.md` | 09-06 | #43 | 99/99 → 99/99 | Las nueve reglas de construcción que `checkBuild` puede afirmar, cada número abierto y citado. No toca el catálogo: define qué puede imprimir el editor de mazos. |
| `2026-09-06-issue46-mining-walk.md` | 09-06 | #46 | 99/99 → 111/111 | La minería de internet contrastada contra el reglamento: 12 entradas nuevas, 1 reescrita de raíz, 1 bajada de clase, 2 afirmaciones de la comunidad refutadas, 7 fuentes incorporadas y 5 no. |
| `2026-09-06-legend-lens-candidates.md` | 09-06 | #47 | 111/111 → 117/117 | Lente de las leyendas (30 de 49 sin ninguna entrada): 6 sostienen, 1 refutada, una promovida ENGINE → INFINITE. **Una leyenda no está en una location** (107.4.b), lo que mata toda la familia "leyenda + Reckoner's Arena". |
| `2026-09-06-token-lens-candidates.md` | 09-06 | #48 | 117/117 → 123/123 | Lente de los tokens: 6 verified, 4 refutaciones confirmadas. El cuello de botella es **llevar el token al battlefield**, no fabricarlo: una sola carta del pool los mueve en masa. |
| `2026-09-06-ready-lens-candidates.md` | 09-06 | #56 | 123/123 → 127/127 | Lente del ready: 4 verified, 4 reescritas. Corrige primero una **afirmación de unicidad falsa** publicada dentro de dos entradas `verified`. |
| `2026-09-06-movement-lens-candidates.md` | 09-06 | #58 | 127/127 → 135/135 | Lente del movimiento: 8 entradas. Eje nuevo — **vaciar la guarnición enemiga conquista sin daño**, y 323.10 des-marca un Combat si se evacúa antes de que abra. |
| `2026-09-06-issue62-contradictions.md` | 09-06 | #62 | 135/135 → 135/135 | Sección 5 de #62: las siete contradicciones de fuentes de YouTube contra el catálogo. **Ninguna refuta nada**; dos confirman una clasificación. Las siete citas bajadas y leídas de nuevo con `yt-dlp`. |
| `2026-09-06-issue62-sources.md` | 09-06 | #62 | 135/135 → 135/135 | Sección 4 de #62: las catorce fuentes nuevas abiertas una por una. 15 citas agregadas, 1 fuente rechazada, 4 timestamps corregidos, 2 atribuciones movidas. |
| `2026-09-06-issue62-combat-loop.md` | 09-06 | #62 | 135/135 → 138/138 | Sección 1 de #62: el loop de combate que no se puede ganar. Tres entradas nuevas (2 INFINITE, 1 ALT_WIN). |
| `2026-09-06-issue62-legends-without-entries.md` | 09-06 | #62 | 138/138 → 143/143 | Sección 2 de #62: cinco leyendas que estaban en cero. 5 verified, una refutada a medias y reescrita, una bajada de clase respecto de lo que declaraba el issue. |
| `2026-09-06-issue62-table-of-fourteen.md` | 09-06 | #62 | 143/143 → 156/156 | Sección 2.6 de #62: la tabla de catorce, fila por fila. 13 entradas nuevas, 1 fila descartada por duplicar una regla ya catalogada; las 13 son ENGINE y dos que el issue declaraba BURST se corrigieron a mano. |
| `2026-09-06-issue62-r32-once-per-turn.md` | 09-06 | #62 | 156/156 → 156/156 | La lectura R32 que #62 sugiere (Svellsongur contra *"Use only once per turn"*), mirada y **no archivada**: no bloquea nada, alcanza a una sola carta del pool y hay un ordenamiento legal que la evita. El documento es el registro de que se miró. |
| `2026-09-06-issue62-section3.md` | 09-06 | #62 | 156/156 → 177/177 | Section 3 of #62: the 38 codes across 24 candidates naming legends that already had an entry. 21 new entries (1 CHAIN, 1 ALT_WIN, 19 ENGINE), 2 rows dropped, 2 merged into one; all 17 videos re-downloaded and read with `yt-dlp`. |
| `2026-09-06-issue63-payoff-lens.md` | 09-06 | #63, #64 | 177/177 → 180/180 | The payoff lens: what converts an INFINITE engine's surplus into points. 3 new `verified` entries, 1 measured and not authored (dominated), 4 existing entries rewritten — including giving `gemdragon-henge-vi-blind-fury` a named scoring exit — and the `needs`/`produces` vocabulary unified for #64. |
| `2026-09-06-draw-lens-candidates.md` | 09-06 | #59 | 180/180 → 186/186 | The draw lens: all six candidates verified ENGINE, two rewritten (a Domain Identity fix on `jax-angle-shot-attach-draw`; the free Standard Move on `hwei-move-draw-ready-runes`), and Ivern, Nurturer's card-advantage claim corrected upward. |
| `2026-09-06-issue89-tournament-corpus.md` | 09-06 | #89 | 186/186 → 198/198 | 8,307 tournament lists measured against the repo's own matcher and 222 Riot fixtures (41/186 entries appear complete, no pipeline reused); 13 new candidates walked, 12 verified ENGINE and 1 refuted; the 811.1.d.2 Tideturner/Smoke-and-Mirrors contradiction resolved by citing its own named worked examples, no new R-number needed. |
| `2026-09-06-stun-lens-candidates.md` | 09-06 | #61 | 198/198 → 203/203 | The stun lens: all five candidates HOLD, all five only after a rewrite, 0 refuted. No INFINITE is possible in the lens (423.1.a.1/423.1.a.2), and no card in the pool pays points for a stun. |
| `2026-09-06-issue85-three-loose-ends.md` | 09-06 | #85 | 203/203 → 205/205 | The three loose ends #62 cited and never walked: 2 entries verified, 2 refuted, 0 rewrites. |
| `2026-09-06-discard-trash-lens.md` | 09-06 | #95 | 205/205 → 212/212 | Discard/trash lens: 7 candidates, all 7 HOLD (4 as written, 3 rewritten), 0 refuted, no INFINITE. 385.2's own worked example (Super Mega Death Rocket!) is the catalogue's first citation of an ability acting from the trash. |
| `2026-09-06-might-buff-lens.md` | 09-06 | #97 | 212/212 → 217/217 | Buff and Might lens: 5 candidates HOLD (1 as written, 4 rewritten). 143.2.b makes an unfloored reduction read as 0 without costing 0; no Might gate in the pool scores points. |
| `2026-09-06-this-turn-lens.md` | 09-06 | #98 | 217/217 → 220/220 | The "this turn" counter lens: 3 candidates HOLD (1 as written, 2 rewritten). 206 governs printed-cost thresholds and 166.2/203.1/356.4.b govern spent-this-turn thresholds — two different families, never both switched off by the same discount. |
| `2026-09-06-denial-lens-candidates.md` | 09-06 | #100 | 220/220 → 226/226 | Denial lens: 6 candidates HOLD (2 as written, 4 rewritten). The opponent never holds priority in a Neutral Open State on your turn, and no lock reaches your own Hold. `OGN-070 Mageseeker Warden` catalogued for the first time. |
| `2026-09-06-battlefield-lens-candidates.md` | 09-06 | #102 | 226/226 → 228/228 | Battlefield lens: 2 entries HOLD (both rewritten), 1 candidate refuted as a combo, 1 refutation of #102 confirmed (Navori Fighting Pit's buff cap, 702.3/702.3.a). |
| `2026-09-06-combat-keyword-lens.md` | 09-06 | #106 | 228/228 → 229/229 | Combat-keyword lens (`[Tank]`, `[Assault]`, `[Shield]`, `[Vision]`, `[Legion]`, `[Hunt]`, Mighty, `[Backline]`, `[Weaponmaster]`, `[Accelerate]`): 1 candidate verified ENGINE, rewritten — 702.3 caps the army at a fixed ceiling instead of growing it pass after pass. |
| `2026-09-06-gear-without-equipment-lens.md` | 09-06 | #107 | 229/229 → 231/231 | The gear-that-is-not-Equipment lens: 1 candidate HOLD after a rewrite of its arithmetic, plus a second entry the walk found on the same never-catalogued card (`UNL-174 Shard of Undoing`). |
| `2026-09-06-issue111-order-buff-economy.md` | 09-06 | #111 | 231/231 → 232/232 | Order buff economy: 1 ENGINE verified (`sett-kingpin-karma-army-might-wall`), 1 `notable` added to a verified entry (Lee Sin, Centered), and **#111's own Peak Guardian refutation overturned** — `355.2.a` already makes a battlefield you control a default play location, so `[Ambush]` was never what the card needed. |
| `2026-09-06-issue115-scoring-and-free-plays.md` | 09-06 | #115 | 232/232 → 234/234 | Scoring-text and free-play lens: 2 new entries verified; the Needlessly Large Yordle rider on `ahri-trinity-svellsongur-hold` is refuted as the issue computed it and recorded as a `notable` instead. |
| `2026-09-06-issue116-champion-progression.md` | 09-06 | #116 | 234/234 → 236/236 | Champion-progression lens (Level/XP/Flow/Champion Zone): both candidates verified ENGINE, no class changes; four corrections to the issue recorded. |
| `2026-09-06-issue117-deck-manipulation.md` | 09-06 | #117 | 236/236 → 238/238 | Deck-manipulation lens (Predict/Vision/look at/reveal/top of deck): 2 of 3 candidates verified (one as a `notable` on an existing entry), 1 refuted for a Might-1 fetch ceiling that isn't repeatable. |
| `2026-09-06-2v2-showdown-action-lens.md` | 09-06 | #118, #119 | 238/238 → 239/239 | 2v2 (§489) and the Combat-Showdown `[Action]` window: 1 new ENGINE entry (`possession-action-defender-flip`), 1 refutation, 4 entries amended with a `notable`. |
| `2026-09-06-issue141-teemo-strategist-reveal.md` | 09-06 | #141 | 239/239 → 242/242 | Teemo, Strategist's five-card reveal: 3 ENGINE verified, 0 refuted. Riot's own **715.4** worked example names the card. Three corrections to the issue: `SFD-191` is **Signature/Ornn**, so candidate 2's deck is forced onto the pool's one Ornn legend (103.2.d.2); the shuffled deck is **39**, not 36 (103.2 counts the Chosen Champion inside the 40, 103.2.a.1 removes it); and the [Hidden] density has no copy cap, because `VEN-097 Spiderling` prints its own exception and 002 makes it beat 103.2.b. New enabler the issue missed: **`UNL-141 Evelynn, Entrancing`** fires the Defend Trigger on YOUR turn (190.3.a.1 / 450 key Contested on the moved unit's controller). |
| `2026-09-06-chaos-units-lens.md` | 09-06 | #146 | 242/242 → 243/243 | Uncatalogued Chaos units: `snapjaws-xp-mill` refuted and folded into `voidreaver-khazix-xp-removal` as a notable; 1 new entry authored, `isolate-deckhand-open-conquer`, for the mono-Chaos version of the open-battlefield walk-in (two commits: the walk file first, the authored entry in a follow-up). |
| `2026-09-06-mind-units-lens.md` | 09-06 | #150 | 243/243 → 245/245 | Uncatalogued Mind units: both candidates verified ENGINE, both rewritten at the mechanism (Bashful Bloom supplies the repeating half candidate 1 lacked; candidate 2's Empower cost is dropped since the pool already prints the same trigger for free). |

Falta caminar: `#59` (draw), `#61` (stun), lo que queda de `#62`, `#63` (payoff).
