# My decks: pestañas reales, biblioteca de mazos y editor con validación

Fecha: 2026-09-05 · Issue: #43 · Depende de #31 (cuentas) y #39 (login obligatorio), ambos cerrados.

## Por qué

Con sesión, los mazos guardados viven en un panel debajo del textarea de pegado, la única forma de
crear uno es pegar texto y pulsar Save, Load pisa lo que había sin avisar, y Save nunca dice si crea
o actualiza. La barra superior (Combos · Guide · Sources) parece pestañas y son anclas que hacen
scroll. El usuario pidió un perfil con sus mazos, poder armarlos o importarlos desde Piltover Archive,
y que las pestañas sean pestañas. Eligió, entre tres alcances, **My decks + editor de texto con
validación de construcción**; el constructor carta por carta con búsqueda e imágenes queda fuera de
esta spec (fase 2, si se pide).

## Decisiones

1. **Navegación por vistas.** La barra superior es un conmutador real de cuatro vistas: `Combos`,
   `My decks`, `Guide`, `Sources`. Una sola está visible en `main`; nada hace scroll a otra sección.
   La vista activa vive en el hash: `#/combos`, `#/decks`, `#/decks/<id>`, `#/guide`, `#/sources`.
   Atrás y Adelante del navegador funcionan (evento `hashchange`). El deep link existente `#deck=<lista>`
   sigue abriendo Combos con esa lista. Al entrar logueado, la vista inicial es `My decks` si el usuario
   tiene al menos un mazo guardado y `Combos` si no tiene ninguno.
2. **My decks (biblioteca).** Grilla de tarjetas, una por mazo guardado, ordenadas por última edición.
   Cada tarjeta: nombre, leyenda con sus dos dominios como puntos de color (colores de dominio
   reservados de CLAUDE.md), formato, cantidad de cartas del Main Deck, última edición relativa, y un
   badge `Legal` / `Illegal` calculado con el validador de construcción del punto 4. Arriba de la
   grilla: `New deck` (abre el detalle vacío) e `Import from Piltover Archive` (campo URL + botón; un
   click trae el mazo por `/api/deck-url`, lo serializa a texto y lo guarda con el título que trae
   Piltover, y abre su detalle). Vacío: una frase y los dos botones, sin ilustración.
3. **Detalle de un mazo (`#/decks/<id>` o `#/decks/new`).** Dos columnas. Izquierda: nombre editable,
   formato (Constructed / 2v2), y la lista como texto en el mismo textarea que acepta hoy listas,
   exports de Piltover, dumps de TTS y deck codes. Derecha: **Construcción**, una fila por regla, con su
   número de Core Rules y el estado (cumplida, o qué falta con la cifra): una leyenda (103.1); campeón
   elegido con el tag de la leyenda (103.2.a.2); Main Deck de 40 (103.2); hasta 3 copias por nombre
   (103.2.b) salvo texto de carta que lo permita (rule 002, Spiderling); hasta 3 Signature con el tag
   de la leyenda (103.2.d); 12 runas dentro de la identidad (103.3.a, 103.3.a.1); 3 battlefields de
   nombre distinto (103.4.a, 103.4.c); Domain Identity (103.1.b); banned y restricted del formato
   (`deckRestrictions`, ya existe). Debajo de la lista: el resumen que hoy da `savedSummary`.
   Botones: `Save` cuando el mazo es nuevo, `Update` cuando ya existe y el texto o el nombre cambiaron
   (nunca los dos a la vez; el botón se deshabilita sin cambios), `Export deck code` (copia al
   portapapeles el código Piltover-compatible), `Analyze combos` (pasa a Combos con este mazo cargado),
   `Delete` (dos clics, como hoy). Salir del detalle con cambios sin guardar pregunta antes de perderlos.
4. **Validador de construcción.** `src/build.ts` exporta `checkBuild(deck, cards, format)` que devuelve
   una lista de reglas, cada una con `rule` (número de Core Rules), `ok`, y `detail` (texto corto con la
   cifra). Un mazo es `Legal` cuando todas están `ok`. Cada regla tiene su test en `test/build.test.ts`
   contra fixtures pequeñas (mazo legal, uno con 39 cartas, uno con 4 copias, uno con dos battlefields
   del mismo nombre, Spiderling por encima de 3, etc.). Reutiliza `deckRestrictions` para bans y
   `inIdentity` para dominio. Las citas de reglas se abren en `data/Riftbound-Core-Rules-2026-07-16.txt`
   al escribir cada test y se pegan en el walk `docs/phase0/walks/2026-09-05-deck-construction-rules.md`.
5. **Deck codes en las dos direcciones.** `src/deck.ts` gana `encodeDeckCode(deck)` como wrapper de
   `getCodeFromDeck` de `@piltoverarchive/riftbound-deck-codes`, ya instalada y ya probada en
   `test/deck.test.ts`. Ida y vuelta pinned por test.
6. **Importar de Piltover y guardar en un paso.** `src/deck.ts` gana `deckToText(entries)` que serializa
   las `entries` de `/api/deck-url` a la lista de texto por sección (main, runas, battlefields, leyenda,
   campeón). La vista My decks encadena fetch, serialización y `createDeck`. Sin cambio de esquema: la
   fila sigue guardando `deck_text`, `name`, `format`.
7. **Combos.** Queda para el análisis rápido de una lista pegada, con el panel lateral en el orden
   fijado: Banned and restricted, status, What to add, Pairs in this deck. Cambia: el panel `Your decks`
   desaparece del lateral (vive en My decks); cuando la lista pegada no viene de un mazo guardado,
   el panel ofrece `Save to My decks` (nombre sugerido como hoy); cuando viene de `Analyze combos`, una
   franja arriba dice `Analyzing <nombre>` con un link de vuelta al detalle.
8. **Guide y Sources** pasan de secciones al pie a vistas propias, con el mismo contenido. La Guide gana
   los pasos de My decks y del editor; el texto sobre `candidate` sigue oculto mientras no haya ninguna.
9. **Privacidad.** Nada se guarda sin pulsar Save o Update; no hay auto-guardado. La copy de la
   textarea, la Guide y `/privacy` ya dicen eso y no cambian.

## Qué NO entra

Constructor carta por carta (búsqueda, filtros, galería con imágenes, botones +/-). Mazos públicos o
compartidos. Carpetas o tags. Sideboard en la validación (el matcher ya lo excluye; el validador lo
ignora). Estadísticas del mazo.

## Arquitectura

- `web/router.ts` (nuevo): lee y escribe el hash, expone `route()` y `onRoute(cb)`, y alterna
  `hidden` en los contenedores de vista. Es el único lugar que conoce los cuatro nombres de vista.
- `web/decks.ts` (nuevo): la vista My decks y el detalle. Usa `web/supabase.ts` para listar, crear,
  actualizar y borrar; `src/build.ts` para la validación; `src/deck.ts` para parsear, serializar y
  codificar. Reemplaza al panel `Your decks` de `web/account.ts`, que queda con sesión, header y
  `gate()`.
- `web/main.ts`: Combos. Pierde el panel Your decks, gana `Save to My decks` y la franja `Analyzing`.
  El estado "mazo cargado desde la biblioteca" (`loadedId`) se pasa por el hash: `#/combos?deck=<id>`.
- `src/build.ts` (nuevo) y `src/deck.ts` (dos funciones nuevas): lógica pura con tests.
- `web/index.html`: cuatro contenedores de vista bajo `main`; la barra superior con cuatro items.
- `web/styles.css`: grilla de tarjetas, dos columnas del detalle, filas de validación. Inter, un
  acento, esquinas 10 px contenedores y 6 px controles, sin sombras decorativas.

## Errores

- Fallo de red al listar o guardar: mensaje en la propia vista (como hoy `guard()`), sin perder el
  texto del editor.
- Import de Piltover que falla (URL privada, host no permitido): el mensaje del `/api/deck-url` se
  muestra junto al campo; nada se guarda.
- Un `#/decks/<id>` que no existe (borrado en otro navegador): vuelve a `#/decks` con un aviso.
- Sesión expirada en medio de una edición: el gate vuelve a mostrar la entrada; el texto del editor
  se conserva en memoria hasta recargar.

## Pruebas

- `test/build.test.ts`: una prueba por regla del punto 4 y una del badge `Legal`.
- `test/deck.test.ts`: `encodeDeckCode` ida y vuelta; `deckToText` sobre una respuesta real de
  `/api/deck-url` guardada como fixture.
- `test/headers.test.ts`: la barra superior no tiene anclas `#how`/`#data`; existen los cuatro
  contenedores de vista; un solo botón de sign-in.
- Playwright contra `public/` servido en local con el proyecto hosted: entrar, New deck, pegar el
  ejemplo, ver la validación pasar de Illegal a Legal, Save, volver a My decks, Analyze combos,
  Update, Export, Delete.

## Fuera de la spec pero anotado

- Fase 2: constructor con búsqueda e imágenes (tamaño L, según la factibilidad del 2026-09-05).
- `rarity` no viaja al navegador hoy; hará falta cuando exista el constructor.
