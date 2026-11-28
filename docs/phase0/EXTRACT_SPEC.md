# Card primitive extraction spec (RiftCombo Phase 0)

Convert Riftbound card rules text into structured primitives. Output is consumed by a
deterministic loop-search step, so **consistency matters more than nuance**. Two different
cards with the same mechanical effect MUST produce the same op.

## Output format

JSONL — exactly one JSON object per line, one line per input card, **same order as input**.
No markdown fences, no commentary, no blank lines.

```json
{"code":"OGN-212/298","name":"Forge of the Future","abilities":[...],"loop_roles":[...],"notes":""}
```

## Ability object

```json
{
  "kind": "triggered|activated|static|additional_cost|replacement|keyword",
  "trigger": "<verbatim trigger condition, or null>",
  "cost": { ... },        // null if free
  "effects": [ ... ],
  "limiter": "<'once each turn' / 'only while at a battlefield' / etc, or null>",
  "speed": "action|reaction|sorcery"   // sorcery = default (own turn, open state only)
}
```

`speed`: the card has [Action] -> "action"; [Reaction] -> "reaction"; otherwise "sorcery".
Runes' inherent abilities are "reaction".

## Cost vocabulary (use ONLY these keys)

```
energy: int              power: ["Fury"|"Calm"|"Mind"|"Body"|"Chaos"|"Order"|"Any"|"Same"]
exhaust_self: bool       kill_self: bool
kill_friendly: str       // constraint text, e.g. "unit or gear", "Mighty unit"
recycle_self: bool       discard: int        spend_xp: int
banish_self: bool        move_self: bool     other: str
```

## Effect op vocabulary (use ONLY these ops)

Resources / engine:
```
{"op":"add_energy","qty":N}
{"op":"add_power","qty":N,"domain":"Fury|...|Any|Same"}
{"op":"ready","target":"self|unit|units|rune|runes|gear|token","qty":N}     // N=-1 means "all"
{"op":"exhaust","target":"..."}
{"op":"channel_rune","qty":N,"state":"ready|exhausted"}
{"op":"cost_reduction","qty":N,"scope":"..."}
```

Cards / recursion:
```
{"op":"draw","qty":N,"who":"self|opponent"}
{"op":"recycle","from":"trash|hand|board","qty":N}       // N=-1 means "all"/"up to X" -> use X
{"op":"play_free","what":"...","from":"hand|trash|deck"}
{"op":"search","zone":"deck|trash"}
{"op":"discard","qty":N,"who":"self|opponent"}
{"op":"copy","what":"..."}
```

Board:
```
{"op":"create_token","token":"Recruit|...","qty":N,"state":"ready|exhausted"}
{"op":"kill","target":"..."}          {"op":"banish","target":"..."}
{"op":"bounce","target":"...","to":"hand"}
{"op":"move","target":"..."}          {"op":"attach","target":"..."}
{"op":"buff_might","qty":N,"target":"...","duration":"turn|permanent"}
{"op":"damage","qty":N,"target":"..."} {"op":"heal","target":"..."}
```

Win / tempo:
```
{"op":"gain_point","qty":N}       // ability-granted points — NOT capped by rule 470
{"op":"score"}                    // Conquer/Hold — IS capped once per battlefield per turn
{"op":"gain_xp","qty":N}
{"op":"extra_turn","qty":N}
{"op":"win_game"}
```

If an effect genuinely has no matching op, use `{"op":"other","text":"<verbatim>"}`.
Prefer an existing op over `other`.

## loop_roles (tag each card with every role that applies)

```
resource_generator   produces energy/power/runes
resource_resetter    readies runes, or otherwise refills resources
action_resetter      readies units/gear (resets exhaust-cost abilities)
recursion            returns cards from trash, or recycles
sac_outlet           can repeatedly kill your own permanents
fodder               cheaply replaces a killed permanent (tokens etc.)
card_flow            draws or digs
cost_reducer
threshold_trigger    triggers on "becomes Mighty" / Empowered / Level N — RE-ARMS, oscillator risk
payoff_points        grants points (the actual win condition)
payoff_turns         extra turns
payoff_damage        board control only — NOT a win condition in Riftbound
bounce               returns permanents to hand (resets object identity, rule 124)
enabler_other
```

## Rules context you MUST apply

- **Units enter exhausted** (143.4). Gear enters ready (149.1). Tokens enter exhausted unless stated.
- **Might is a body stat, never a cost.** Energy = numeral cost; Power = domain symbols.
- **Mighty = Might >= 5** (708). "Becomes Mighty" is a *threshold crossing* (709) — it re-arms.
- **Rune Pool empties** at start of Main Phase and end of turn (167) — resource floats are turn-scoped.
- **Recycle goes to the BOTTOM of the deck** (416.5), not to hand.
- **Drawing from an empty deck = Burn Out**, which gives an OPPONENT a point (431.2.c).
- **Score is capped once per battlefield per turn** (470); ability-granted `gain_point` is NOT.
- Symbols: `:rb_energy_N:` = N generic energy. `:rb_rune_X:` = one Power of domain X.
  `:rb_rune_rainbow:` = Any domain. `:rb_exhaust:` = exhaust self as a cost. `:rb_might:` = Might.
- Text in parentheses is **reminder text** — do not extract it as a separate ability.

## Worked examples (follow these exactly)

Input:
```json
{"code":"OGN-212/298","name":"Forge of the Future","type":"Gear","energy":2,
 "text":"When you play this, play a 1 :rb_might: Recruit unit token at your base.Kill this: Recycle up to 4 cards from trashes."}
```
Output:
```json
{"code":"OGN-212/298","name":"Forge of the Future","abilities":[{"kind":"triggered","trigger":"when you play this","cost":null,"effects":[{"op":"create_token","token":"Recruit","qty":1,"state":"exhausted"}],"limiter":null,"speed":"sorcery"},{"kind":"activated","trigger":null,"cost":{"kill_self":true},"effects":[{"op":"recycle","from":"trash","qty":4}],"limiter":null,"speed":"sorcery"}],"loop_roles":["recursion","fodder","sac_outlet"],"notes":"self-killing recursion engine"}
```

Input:
```json
{"code":"OGN-110/298","name":"Ekko, Recurrent","type":"Unit","energy":5,"might":5,
 "keywords":["accelerate","deathknell"],
 "text":"[Accelerate] (You may pay :rb_energy_1::rb_rune_mind: as an additional cost to have me enter ready.)[Deathknell] — Recycle me to ready your runes."}
```
Output:
```json
{"code":"OGN-110/298","name":"Ekko, Recurrent","abilities":[{"kind":"additional_cost","trigger":"as you play me","cost":{"energy":1,"power":["Mind"]},"effects":[{"op":"ready","target":"self","qty":1}],"limiter":null,"speed":"sorcery"},{"kind":"triggered","trigger":"when I die","cost":{"recycle_self":true},"effects":[{"op":"ready","target":"runes","qty":-1}],"limiter":null,"speed":"sorcery"}],"loop_roles":["resource_resetter","recursion"],"notes":"5 Might so he is natively Mighty; dying readies all runes"}
```

Input:
```json
{"code":"UNL-173/219","name":"Sacrifice","type":"Spell","energy":1,"keywords":["reaction"],
 "text":"[Reaction] As an additional cost to play this, kill a friendly [Mighty] unit. Draw 2 and channel 1 rune exhausted."}
```
Output:
```json
{"code":"UNL-173/219","name":"Sacrifice","abilities":[{"kind":"activated","trigger":null,"cost":{"energy":1,"kill_friendly":"Mighty unit"},"effects":[{"op":"draw","qty":2,"who":"self"},{"op":"channel_rune","qty":1,"state":"exhausted"}],"limiter":null,"speed":"reaction"}],"loop_roles":["sac_outlet","card_flow"],"notes":"requires a Mighty (5+ Might) friendly unit"}
```

Input:
```json
{"code":"SFD-088/221","name":"Renata Glasc, Mastermind","type":"Unit","energy":5,"might":4,
 "text":":rb_energy_1::rb_rune_mind:: Draw 1.:rb_energy_4::rb_rune_mind::rb_rune_mind::rb_rune_mind::rb_rune_mind:, :rb_exhaust:: Score 1 point.Use my abilities only while I'm at a battlefield."}
```
Output:
```json
{"code":"SFD-088/221","name":"Renata Glasc, Mastermind","abilities":[{"kind":"activated","trigger":null,"cost":{"energy":1,"power":["Mind"]},"effects":[{"op":"draw","qty":1,"who":"self"}],"limiter":"only while I'm at a battlefield","speed":"sorcery"},{"kind":"activated","trigger":null,"cost":{"energy":4,"power":["Mind","Mind","Mind","Mind"],"exhaust_self":true},"effects":[{"op":"gain_point","qty":1}],"limiter":"only while I'm at a battlefield","speed":"sorcery"}],"loop_roles":["payoff_points","card_flow"],"notes":"card says Score but this is an ability-granted point, not rule-470 Scoring"}
```

## Rules

1. One line per input card, same order. 921 in, 921 out.
2. Never invent text. If unclear, extract conservatively and explain in `notes`.
3. Do NOT extract reminder text (parentheses) as its own ability.
4. `limiter` is load-bearing for loop refutation — always capture "once each turn",
   "only while...", "if you haven't...".
5. A card with only vanilla keywords and no other text still gets a line, with
   `abilities` reflecting those keywords (or `[]`) and `loop_roles: []`.
