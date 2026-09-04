# Verificación de las citas de TCGplayer — 2026-09-04

Nueve entradas `verified` del catálogo cuelgan de dos artículos de TCGplayer. Hasta hoy la
única lectura registrada era la del 2026-09-03 anotada en el issue #16, hecha por fragmentos y
con una retractación de por medio. Esta pasada abrió **los dos artículos completos**, en esta
sesión, y comprobó cada cita palabra por palabra.

## Método

`curl "https://r.jina.ai/<url>"`. TCGplayer bloquea WebFetch (devuelve solo "TCGplayer") y el
browser headless (body vacío, detección de automatización); el proxy de lectura devuelve el
markdown íntegro. Se pidió la página entera, sin prompt de keywords — el error del 2026-09-03,
que hizo declarar fabricada una cita real, fue justamente pedir un extracto por palabra clave.

| artículo | url leída | bytes | fecha de publicación |
|---|---|---|---|
| "Analyzing Infinite Combo Lux - Riftbound's Hottest New Deck!" | `www.tcgplayer.com/content/article/Analyzing-Infinite-Combo-Lux-Riftbound-s-Hottest-New-Deck/a9e37a44-4ae3-4708-8112-43b4d5389c17/` | 9 911 | 2026-06-10T04:32:14Z |
| "The Best Decks from Riftbound Regional Hartford" | `www.tcgplayer.com/content/article/The-Best-Decks-from-Riftbound-Regional-Hartford/715aa271-6096-4dd1-8279-cd47ed33fa13/` | 17 373 | 2026-06-25T10:00:00Z |

Ambos íntegros: el de Lux termina en su firma ("I've been HowlingMines, you've been amazing!"),
el de Hartford en su sección de cierre. Autor: los dos son de HowlingMines / Scott Mines — el de
Lux está firmado Scott Mines y se despide como HowlingMines, así que **son la misma persona**, no
dos fuentes independientes. Eso importa: seis entradas del catálogo tienen un solo autor detrás.

## Corrección de URL

Tres entradas citaban `https://infinite.tcgplayer.com/article/<slug>/<uuid>/`. Ese host responde
200 a un HEAD pero **sirve un muro de CAPTCHA**: a través del proxy devuelve 287 bytes con
"Warning: This page maybe requiring CAPTCHA". La forma legible, y la que se leyó, es
`https://www.tcgplayer.com/content/article/<slug>/<uuid>/`. No es una conjetura: el propio
artículo de Hartford enlaza al de Lux con esa forma ("we wrote a full-blown article about it").
Las tres URLs quedaron normalizadas a la forma que se abrió de verdad.

## Resultado: 9 de 9 confirmadas, 0 fabricadas

| entrada | veredicto | cita textual comprobada |
|---|---|---|
| `lux-infinite-energy` | CONFIRMADA | "Once your deck is empty, kill an in-play copy of Forge of the Future to recycle a Forge of the Future, a Shadow's Call and a Sacrifice … Repeat ad infinitum" · "it only costs eleven total energy and one power to loop" |
| `lux-infinite-power` | CONFIRMADA | "Recycle a rune to float one power … Play Retreat to return Lecturing Yordle to your hand and return the rune you recycled to play … Replay Lecturing Yordle to draw the remaining card" |
| `renata-mastermind-points` | CONFIRMADA | "Play Renata Glasc - Mastermind to your conquered battlefield. Thanks to Rally the Troops, she will enter as a Mighty unit. … Spend four energy and four power. Exhaust Renata Glasc to score a point. … Use Retreat to return Renata to your hand. … Repeat ad infinitum" |
| `ashe-retreat-hand-strip` | CONFIRMADA | "Ashe - Focused is here to save the day. Ashe will banish any problem card from the opposing hand and then be incorporated into a Retreat loop to repeatedly pick her up and replay her" |
| `promising-future-force-deck` | CONFIRMADA | "create a loop based on the above including Promising Future, which will allow you to force every card in the opponent's deck into play... _then_ you can blow them up with The Ruination for good measure." |
| `ruination-sprite-burst-clear` | CONFIRMADA | "Simply send everything into the abyss with a copy of The Ruination or by looping back Sprite Burst until you have enough might to challenge everything." |
| `bloodharbor-bewitching-discard` | CONFIRMADA | "There's a vicious Pyke - Bloodharbor Ripper control shell out there that cripples legends not named Master Yi - Wuju Bladesman with a never-ending stream of Bewitching Spirits" |
| `time-warp-hold-burst` | CONFIRMADA | "But in an ideal world, you're now closing the game by pressing The Ruination button, using Sprite Burst to get onto both battlefields, establishing some number of Soaring Scout/Ekko - Recurrent/Lux - Crownguard onto those battlefields, then firing off three copies of Time Warp to score the remaining six points needed in one fell swoop." |
| `pack-of-wonders-bewitching-discard` | CONFIRMADA (fuente **nueva**) | "It's easy to forget, but Pack of Wonders can easily bounce units too, so you've got at least nine ways (three of which are repeatable) to use Bewitching Spirits on-play ability multiple times in a game." |

La novena no estaba en la lista a auditar: la entrada colgaba solo de un hilo de Reddit y el
artículo de Hartford la respalda textualmente. Se le agregó la fuente.

Dos correcciones menores de transcripción, ya aplicadas en `data/combos.json`:

- `promising-future-force-deck` guardaba la cita con un corchete editorial —
  "force every card [in the opponent's deck into play]" — como si el final fuera reconstruido.
  No lo era: la frase está entera en el original. Corchete eliminado.
- `bloodharbor-bewitching-discard` citaba "legends not named Master Yi" sin marcar que el
  original dice "Master Yi - Wuju Bladesman". Elisión marcada.

## La discrepancia que sí importa: el orden de Shadow's Call

El artículo imprime el loop de Energy con **Sacrifice en respuesta** a Shadow's Call:

> "Play a copy of Shadow's Call. · Respond to your copy of Shadow's Call with a copy of Sacrifice"

`lux-infinite-energy` **no** hace eso, y es deliberado: resuelve Shadow's Call apuntando a Ekko y
recién después juega Sacrifice, para que la marca [Temporary] muera con Ekko en vez de quedar
pegada a un Recruit (816.1.b la mataría antes del Scoring). El orden del artículo dejaría a
Shadow's Call resolviendo sobre un objetivo muerto. Es la secuencia que encontró el usuario el
2026-09-04 revisando R29.

O sea: la entrada es **más correcta que su fuente**, y eso ahora está dicho en sus notas. No es un
defecto de la cita — es la razón por la que `verified` exige caminar el loop y no copiar el artículo.

## Lo que la lectura completa aporta de nuevo

- **La lista de Tianjin (19º de 640, 纸传.晓镜)** está impresa carta por carta en el artículo de
  Lux, y la de Hartford (Relivia) también. Las dos difieren: Hartford agrega 3 Time Warp,
  3 Seal of Insight y 3 Downstage Dramatics, y **manda Renata / Fiora al sideboard**. Es decir,
  la línea de `renata-mastermind-points` fue el plan viejo y Time Warp el nuevo — el artículo lo
  dice sin ambigüedad: "Previously, this was done by making Renata Glasc - Mastermind mighty with
  Rally the Troops … Funnily enough, this combo still exists in the sideboard of Relivia's list".
- **Seal of Insight** aparece como el costo de la línea de Time Warp ("so that you don't nuke your
  runes"). No está en el catálogo; candidato a nota, no a entrada.
- El artículo de Lux enumera seis salidas del loop, y las seis ya tienen entrada:
  infinite power, infinite energy, infinite recruits, limpiar cualquier battlefield, vaciar la
  mano rival, forzar a ambos a jugar el mazo entero.

## Links

- Issue #16 (minado de comunidad) — esta pasada cierra su punto "NO verificado por mí".
- `docs/phase0/walks/2026-09-04-loop-budget-ledger.md` — el presupuesto del loop (issue #21).
