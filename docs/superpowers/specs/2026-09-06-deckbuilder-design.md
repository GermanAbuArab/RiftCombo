# Deckbuilder visual en My decks (#101)

Estado: aprobado por el usuario el 2026-09-06 (tres decisiones de UX elegidas sobre mockups: dos columnas fijas,
mazo en filas de texto, Construction como checklist). Investigación de referencia:
`docs/design/deckbuilder-ux-research-2026-09-06.md` (Piltover Archive, riftbound.gg, RiftScribe; inventario, no diseño).

## Qué reemplaza

El editor de `#/decks/<id>` (y `#/decks/new`) deja de ser un textarea con un panel de nueve filas al lado. Pasa a ser
un builder de dos columnas. **Nada cambia en lo persistido**: un mazo guardado sigue siendo `text` + `name` + `format`
en Supabase, y el builder produce ese texto con `deckToText` y lo lee con `loadDeck`. Pegar una lista, un deck code o
una URL de Piltover sigue funcionando, detrás de un botón **Import** que abre el textarea de hoy en un diálogo.

## Layout (escritorio, ≥ 900px)

```
┌─ Pool ──────────────────────┬─ Deck ────────────────────┐
│ [Search…]  ● ● ● ● ● ●      │ Legend    <fila>           │
│ Zone: All Legend Champion   │ Champion  <fila>           │
│       Main Battlefields     │ Battlefields 2/3           │
│       Runes                 │ Runes 12/12        [Auto]  │
│ Type ▾  Set ▾  Cost ▾  Sort │ Main deck 34/40  ▂▅▇▃▁     │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │  E2 Forge of the Future ×3 │
│ │img │ │img │ │img │ │img │ │  E3 Time Warp          ×2 │
│ │ ×2 │ │ +  │ │ ×3 │ │ +  │ │  …                         │
│ └────┘ └────┘ └────┘ └────┘ │ Construction · 2 to fix   │
│  …                          │ [Save] [Analyze] [Export]  │
└─────────────────────────────┴────────────────────────────┘
```

- La columna del mazo es `position: sticky` con su propio scroll; la del pool scrollea con la página.
- Bajo 900px: dos pestañas **Pool | Deck** arriba del editor (segmented control como el de formato) y una barra fija
  abajo con `Main 34/40 · Runes 12/12 · BF 2/3` y **Save**. Nunca un hamburger (#49).

## Pool (columna izquierda)

- **Search**: nombre y texto de reglas, sin distinguir mayúsculas; usa `readableCardText` para el texto. Debounce 150ms.
- **Dominios**: seis chips-círculo con el color reservado de cada dominio (`#ce212d` Fury, `#15ac72` Calm, `#22799c` Mind,
  `#e4720c` Body, `#6c4993` Chaos, `#d0ab01` Order). Al elegir leyenda, se preseleccionan sus dos dominios (Domain
  Identity, 103.1.b) y un chip **All domains** los libera; las cartas fuera de identidad se muestran atenuadas y con
  "+" deshabilitado, nunca ocultas sin aviso (misma regla que "What to add": no esconder la respuesta).
- **Zone**: segmented `All · Legend · Champion · Main · Battlefields · Runes`. `Champion` filtra por el champion tag de
  la leyenda elegida (derivado como en `src/build.ts`); `Runes` muestra las seis runas de Origins (las de VEN son
  reimpresiones: `RUNE_ALIAS`). `Legend` muestra los 94 legends.
- **Type** (unit / spell / gear / equipment = gear con tag Equipment), **Set** (OGN, OGS, SFD, UNL, VEN, VEN-SP), **Cost**
  (Energy 0…7+, chips), **Sort** (name, cost, code).
- **Grilla**: `thumb(image, 200)`; battlefields en `orientation: landscape` (66 printings). Cada celda es un `<button>`
  con nombre accesible `"<name>, E<energy> P<power> M<might>, ×N in deck"`. Click = agregar (respeta topes); el contador
  ×N se pinta sobre la miniatura; con el tope alcanzado el botón queda `aria-disabled` y la celda dice "3 of 3". Un
  segundo control pequeño ("i" o clic derecho no: un botón **View**) abre el modal de carta que ya existe.
- Marcas: `[S]` Signature (dato de #103) y **Banned** / **Restricted** según `deckRestrictions` para el formato activo;
  se marcan, no se bloquean (el panel Banned and restricted sigue siendo quien avisa al analizar).
- Tokens y las dos cartas sin tipo nunca aparecen (`domains.length === 0 && !battlefield`, como en synergies).
- Alt-arts: el pool muestra una celda por **base** (`Card.base`), nunca por printing.

## Deck (columna derecha)

- Zonas en orden: **Legend** (1), **Champion** (1), **Battlefields** (3, nombres únicos: 103.4.c), **Runes** (12),
  **Main deck** (40). Cada zona lleva `n/objetivo`.
- Filas de texto: `E<cost>  <name>  [S]  ×N  −  +`. Click en el nombre abre el modal de carta. `−` en ×1 quita la fila.
  Ordenadas por coste y nombre dentro de la zona.
- **Runes [Auto]**: rellena 12 runas repartidas entre los dominios de la leyenda (6/6 con dos dominios); editable con
  −/+ después. Sin leyenda, Auto está deshabilitado y lo dice.
- **Curva de coste**: barras de texto/SVG mínimo (0…7+) sobre el Main deck; sin librería.
- **Construction**: checklist de una línea por regla (`✓`/`✗`/`–` para pass/fail/unknown), con contador a la derecha
  cuando la regla lo tiene (34/40, 2/3, 1/3). Cabecera `Construction · <formato> · N to fix` o `· Legal`. Cada fila es
  un `<details>`: al abrir muestra el párrafo citado (103.x, TR 402.1) y la explicación de hoy. **Mazo vacío** (sin
  leyenda y 0 cartas): una sola frase, "A legal list needs a legend, a champion, 40 main-deck cards, 12 runes and 3
  battlefields", sin las nueve filas. `checkBuild` no cambia; solo la presentación.
- **Acciones**: `Save` (primario), `Analyze combos`, `Export deck code`, `Import` (diálogo con el textarea actual:
  lista, deck code, TTS, URL de Piltover). Sigue la regla "nada se escribe hasta Save" y el aviso de cambios sin guardar
  al navegar (`guardUnsaved`).

## Lógica en `src/` (con tests), DOM en `web/`

- `src/builder.ts`: `filterPool(cards, filters)`, `addCard(deck, base, zone)` / `removeCard` con los topes (1 legend,
  1 champion, 3 por nombre en main 103.2.b, 3 battlefields de nombre único, 12 runas), `autoRunes(legendDomains)`,
  `costCurve(deck, cards)`, `zoneOf(card)`. Todo puro y sobre `Deck` de `src/types.ts`; el texto sale por `deckToText`.
- `web/decks.ts` conserva biblioteca, rutas, guardado, import y `guardUnsaved`; el editor pasa a `web/builder.ts`.
- Tests nuevos en `test/builder.test.ts`: topes, auto-runas 6/6 y con un dominio, filtro por identidad, curva, ida y
  vuelta `Deck → text → Deck` sin pérdida para un mazo completo (usar una lista de `test/fixtures/tournament-lists/`).

## Identidad y límites

- Paleta y tokens de `web/styles.css`; Inter; esquinas 10/6px; un acento; sin sombras, gradientes ni emojis; los colores
  de dominio solo para dominio. Contraste AA de todo texto nuevo (`test/a11y.test.ts` lo mide desde los tokens).
- Foco visible en cada control; la grilla es navegable por teclado; contadores con `aria-live="polite"`.
- Ningún string copiado de Piltover Archive, riftbound.gg, RiftScribe ni LOOPLINE. Etiquetas propias: Pool, Deck,
  Zone, Add, View, Auto, Import, Export deck code.
- No hay Stats/Sample hand/Playtest en esta entrega. Se pueden proponer como issue aparte.

## Fuera de alcance

Guardar en el servidor sin Save, imágenes propias de cartas (siguen viniendo del CDN de Riot vía `thumb`), colección
u ownership, precios.

## Links

- Issue #101; #43 (My decks), #103 (Signature), #92/#93 (legalidad y badges en la grilla de My decks).
- `docs/design/deckbuilder-ux-research-2026-09-06.md`
