# Hand walks — Zed's swap, LeBlanc's Zileans, and R27 retired

**Date:** 2026-09-04 · **Rules version:** Core Rules 2026-07-16 · **Both HOLD.** A third entry,
`power-nexus-sentinel`, turned out to be blocked by a different reading than its own notes claimed.

## R27 is settled, not open

R27 asked whether a Reflection copy keeps the token's printed 0 Might. Three places say it does:

- **477.1.a** lists the inherent traits a Trait-Altering effect touches — Name, Super Type, Type, Tags,
  Controller, Cost, Domain — with **no Might**. 477.1.a.1 then handles *"Assignment of Might"* separately,
  and only for effects that say a unit's Might **becomes** some number.
- **477.1.b.1.a** lists the copyable traits — Name, Super Type, Type, Tags, Cost, Domain, Rules Text —
  again **no Might**.
- **185.3.a.2's worked example is this exact card.** *"Deceiver's conquer effect creates a 0 [M]
  Reflection unit token and applies a copy effect to that token. The copy effect will append all copyable
  traits, **including the cost** of the unit to be copied."* If Might travelled with the copy, that — not
  cost — is what the example would have flagged.

And 187.6 defines the token as *"a domainless unit token with 0 Might"* in the first place. So a Reflection
copy carries the copied card's **Rules Text at 0 Might**. Retired like R9 and R29.

This is the same finding already recorded on the verified `leblanc-temporary-plaza`, where it costs
nothing because The Grand Plaza counts units rather than Might.

---

## 1. `zed-clone-eye-recruits` — two ready bodies per Chaos rune — **HOLDS**

**VEN-112 Zed, Without a Sound** (Unit, Chaos, E5 M5): "When I conquer, play a 0 Might Shadow Clone unit
token to your base." · **`[Action][>]` 1 Energy + 1 Chaos: "Move me and a Shadow Clone you control to each
other's locations."**
**SFD-153 Eye of the Herald** ×2 · **SFD-171 Renata Glasc, Industrialist** · **OGN-293 The Grand Plaza**

- **The swap has no exhaust and no once-per-turn** — confirmed against the printed text, which is the
  whole reason this entry exists. 381 only requires the controller's turn and an Open State.
- **187.11** makes the Shadow Clone a **unit** token, so it can carry the second Eye.
- **R9, retired above,** is what makes each swap worth two Recruits: 420.1/420.2.a make the effect move a
  Move, and 359.3.f.2 reads the Eye's "here" at execution, i.e. each end of the swap. One Recruit at the
  Plaza, one at base.
- **The cost is one rune, not two.** Exhaust a Chaos rune for the Energy, then recycle that same exhausted
  rune for the Power — recycling for Power has no exhaust in its cost. So **N Chaos runes buy N swaps and
  2N Recruits**, and the recycled runes are what bounds the turn, which is why the class is ENGINE and not
  INFINITE.
- **R25 = A** (Renata) makes the base-side Recruits enter ready, so they can Standard-Move to the Plaza
  the same turn. Recruits carry no `[Temporary]`, so they survive to the Hold.
- **Control never lapses.** The swap moves Zed out and the Clone in as one effect, and 190.4.a keeps
  control while you have any unit there. The Clone entering a battlefield you already control applies no
  Contested (190.3.a.1), so no showdown opens.
- **Domain:** Chaos (Zed) + Order (Eye, Renata) → VEN-155 Heart of the Tempest, the only Order/Chaos legend.

---

## 2. `leblanc-zilean-reflection-doubling` — the clone count doubles per score — **HOLDS**

**UNL-199 Deceiver** (Legend): "When you conquer or hold, you may discard 1 and **exhaust me** to play a
ready Reflection unit token there. Then do this: It becomes a copy of another unit there. Give it
`[Temporary]`."
**UNL-086 Zilean, Time Mage** ×2: "**Once each turn**, if you would play a token unit while I'm at a
battlefield, you may play that token **and an additional copy of it** instead."
**UNL-090 LeBlanc, Everywhere at Once** · **OGN-243 Darius, Executioner**

- **The recursion is 2N+1, not 2^N.** Each Zilean's replacement adds **one** copy and is capped at one
  event per turn, so N Zileans turn Deceiver's single Reflection into **N+1** tokens; the board goes from
  N to 2N+1. From one hard-cast Zilean: 3, 7, 15, 31, 63, 127 — five to six uncontested scoring turns to
  reach the 71 a real game reported.
- **Once per turn, whatever you score.** Deceiver **exhausts** to make the Reflection and readies only in
  your Awaken (315.1.b), so a second Conquer the same turn adds nothing.
- **R10 = A** is what keeps the board alive: every Reflection arrives with `[Temporary]`, and LeBlanc
  switches the kill off at her battlefield. Every clone dies the turn she leaves.
- **R27, retired above,** settles the shape of the board: the clones are **0 Might** carrying Zilean's
  Rules Text. The engine does not care — the doubling only needs the text — and the entry's closing turn
  already answers it by copying Darius instead, whose "Other friendly units have +1 Might here" stacks
  once per Darius.
- **Mirror Image's batch is not free.** It plays its Reflection to **your base**, outside LeBlanc's
  protection, so those have to Standard-Move to her battlefield the same turn or die at your Beginning
  Phase (816.1.b) — and until they arrive they do not count toward the next multiplier. The entry already
  says this; it checks out.

---

## 3. `power-nexus-sentinel` — stays candidate, but on **R8**, not R1

Its notes blamed *"the Blue Sentinel reading shared with every Hold line … arguable, hence candidate"*.
That reading is **R1, ruled A on 2026-09-03**, and R2 = A covers the Nexus's "score 1 point" as an ability
Gain. The stale note was hiding the real dependency.

**SFD-214 Power Nexus** is a **battlefield**, and Blue Sentinel multiplies *"**your** hold effects"*. So the
entry needs a battlefield's own Hold trigger to count as one of *your* hold effects — **R8**. 190.6.a is
suggestive (*"While a Battlefield is Controlled, its Controller controls its Abilities … takes
responsibility for adding them to the Chain … and makes all choices required by them"*) and 383.4.d.2.b
puts a "references the player Holding" ability on the Chain for the player who Held. But "your" as a
scoping word over an ability you merely control is exactly the kind of thing that needs ruling, and no
verified entry stands on it today — the verified `world-atlas-sentinel-gold` multiplies a **gear's**
Effect Text, which 136.2.c/718.3 make the unit's own.

Note corrected to name R8. The REFUTE finding stands too: the Power is paid in the Beginning Phase by
recycling runes, and at ~2 rune income a turn the sustainable rate is about one extra point per turn
unless World Atlas Gold funds it.
