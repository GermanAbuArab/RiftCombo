# La lectura R32 que #62 sugiere — Svellsongur contra *"Use only once per turn"*

**Fecha:** 2026-09-06 · **Reglas:** Core Rules 2026-07-16

**Recomendación: NO archivarla como lectura numerada.** Las dos lecturas están escritas abajo con su
evidencia, pero la pregunta **no bloquea nada**, tiene un alcance de **una sola carta en todo el pool**,
y hay **un ordenamiento legal que la evita por completo**. Si el usuario la quiere votar igual, acá está
el material; si no, este documento es el registro de que se miró y por qué se dejó.

---

## De dónde sale

Sección 6 de #62, item *"Fellsinger"*:

> `[10:12]` el creador pregunta si attachearla a `SFD-050 Azir, Ascendant` daría una segunda instancia
> usable de su habilidad *"Use only once per turn"*. — `ZXYCpYWX_dI`

#62 sospecha, y lo marca como sospecha propia, que *"Fellsinger"* es `SFD-059 Svellsongur` mal
transcrito. **Esa sospecha es razonable y la comparto**: es el mismo patrón fonético que ya se resolvió
dos veces en este issue (*"Spell Slinger"* → Svellsongur en #46, *"Telekinesis Hearter"* → Stellacorn
Herder en la sección 1 de esta caminata), y Svellsongur es la única carta del pool cuyo texto haría
sensata la pregunta. **No lo verifiqué contra el video**, porque la respuesta no cambia según qué carta
sea: la pregunta es sobre la cláusula, no sobre el Equipment.

---

## Los textos, verbatim

```
SFD-050 | Azir, Ascendant | Unit | Calm | E6 P1 M6 | :rb_rune_calm:: [Action] — Choose a unit you
         control. Move me to its location and it to my original location. If it's equipped, you may
         attach one of its Equipment to me. Use only once per turn. [Tags: Bird, Azir, Shurima]

SFD-059 | Svellsongur | Gear | Calm | E3 P1 M+0 | [Equip] :rb_energy_1::rb_rune_calm: ... As this is
         attached to a unit, copy that unit's text to this Equipment's effect text for as long as this
         is attached to it. [Tags: Equipment]
```

**`SFD-050` es la ÚNICA carta del pool con la cláusula `Use only once per turn`** — un solo hit sobre
las 935 cartas de `data/corpus_flat.txt`. Y **no aparece en ninguna entrada** de `data/combos.json` ni
en ninguna regla de `data/synergies.json` (0 ocurrencias en los dos archivos).

---

## Lo que ya está cerrado y no se re-deriva

- **R6 = A** y la composición de #45: `v` Svellsongur sobre una unidad dan **2^v instancias** de su
  texto, no `1+v` (434.1.c, 477.2.c, 479.1, 480.3, 476.1). Con una copia, Azir tiene su habilidad
  **dos veces**.
- **R30 = B**, votado el 2026-09-06: una cláusula del tipo *"Use my abilities only while I'm at a
  battlefield"* **viaja con la habilidad copiada**, porque **377.2.b** la vuelve una condición de la
  Activated Ability y **053.1** re-lee el *"I'm"* sobre quien ahora la tiene. El ejemplo trabajado de
  377.2.b es Ultrasoft Poro, con la oración **dentro** de la habilidad.

Así que la cláusula viaja. La pregunta que queda es **de quién es la cuenta**.

---

## Lectura A — cada instancia lleva su propia cuenta (dos usos por turno)

**377.2** — *"Card text will refer to activating Activated Abilities with the word **'use'** or
'play'."* Así que *"Use only once per turn"* es, literalmente, una condición sobre **usar** la
habilidad, y cae bajo:

**377.2.b** — *"If an Activated Ability has a condition on 'using' or 'playing' it, that condition must
be true in order to activate **the ability in question**."*

*"The ability in question"* es singular y señala a **una** habilidad concreta. Si hay dos habilidades
—la impresa y la que 477.2.c apendea desde el Effect Text del Equipment— entonces cada una es *"the
ability in question"* por separado, y la condición se evalúa sobre cada una.

Apoyo estructural: cuando el reglamento cuenta usos por turno lo hace **por habilidad**, no por objeto.

- **383.3.e.1** — *"**Such a Triggered Ability** will only be performed the specified number of times
  each turn."*
- **371.1** — *"**These Replacement Effects** may only be applied to the specified number of events each
  turn."*

Y cuando el reglamento quiere declarar que duplicar algo es inútil, **lo dice**: **810.2**, *"Multiple
instances of Ganking are redundant."* No hay ninguna oración equivalente para habilidades activadas con
tope por turno. Bajo **002** (*"Card text supersedes rules text"*) y el argumento que sostuvo R28 —una
lectura que vuelve letra muerta a un texto impreso es la lectura equivocada—, el silencio después de un
810.2 explícito pesa.

**Consecuencia:** un Svellsongur sobre Azir = dos swaps por turno; dos Svellsongur = cuatro (2^2).

---

## Lectura B — la cuenta es del objeto (un uso por turno, se copie o no)

*"Use only once per turn"* no nombra la habilidad; nombra al jugador que la usa. Leída así, es una
restricción sobre **el permanente que la ofrece**, y duplicar el texto no duplica el permiso, del mismo
modo que tener dos veces la misma habilidad de exhaust no da dos exhausts.

Apoyo: **476.1** — *"Layers are applied in sequence. Each effect in them is applied as soon as able, and
**only a single time across all sequences**."* Es la regla que CLAUDE.md ya usa para explicar por qué la
composición de Svellsongur **no** abre recursión.

**Contra-argumento, y es el que a mi juicio decide:** 476.1 gobierna la **aplicación de efectos en
capas**, no la **activación** de habilidades. Aplicar el Layer 2 una sola vez es lo que hace que Azir
termine con dos instancias en su texto; no dice nada sobre cuántas veces se puede activar cada una.
Traer 476.1 acá es usar la regla equivocada, que es exactamente el error que la auditoría de citas del
2026-09-04 encontró tres veces.

También hay un argumento de intención de diseño —el tope existe para que la habilidad no se repita— pero
la intención no es una regla, y **051** (*"Card text should be interpreted according to these rules"*)
manda leer *"use"* por 377.2, que es lo que hace la lectura A.

---

## Por qué recomiendo no archivarla

1. **No bloquea nada.** `SFD-050` no está en ninguna entrada ni en ninguna regla de sinergia. Ninguna
   línea del catálogo cambia de clase, de cantidad o de estado según cómo se resuelva.
2. **El alcance es una carta.** `Use only once per turn` aparece **una vez** en todo el pool. Una
   lectura numerada es una pregunta que el usuario tiene que contestar, y CLAUDE.md pide gastarlas en
   lo que decide algo.
3. **Hay un ordenamiento legal que la evita**, que es lo primero que el proyecto exige probar antes de
   archivar una lectura: **103.2.b permite tres copias de una carta en el Main Deck**, así que un mazo
   que quiera dos swaps de Azir en un turno juega **dos Azir**. Dos objetos distintos, dos cuentas
   distintas, sin ninguna pregunta de reglas. Es más caro en Energía y no necesita Svellsongur, pero
   funciona hoy sin votar nada.
4. **Riot puede reformular antes que nosotros.** Antes de archivar una lectura sobre un término impreso
   que las reglas no definen, CLAUDE.md pide grepear `data/errata.json` y los cuatro FAQ — es como murió
   R31. Hecho: **`data/errata.json` no toca `SFD-050`**.

**Si el usuario la quiere votar igual, mi voto sería A**, por 377.2 más 377.2.b (*"the ability in
question"*), por el paralelo per-habilidad de 383.3.e.1 y 371.1, y por el silencio del reglamento donde
en 810.2 sí supo declarar una redundancia. Y porque es la misma dirección que ya tomó R30: la cláusula
viaja **con** la habilidad, no se queda pegada al objeto.
