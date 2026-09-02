"""
SEARCH — deterministic candidate-loop finder over extracted card primitives.

Formulation: every ability is a typed resource transaction (consumes -> produces).
A candidate loop is a small set of abilities whose combined production COVERS their
combined consumption, with a strict surplus in at least one resource.

No LLM here. This step cannot hallucinate; it can only over-generate, which is
exactly what the downstream VERIFY/REFUTE passes are for.
"""
import json
import glob
import itertools
from collections import defaultdict

# ---------------------------------------------------------------- resources

ENERGY = "ENERGY"          # generic energy in the rune pool
POWER = "POWER"            # domain power (domain tracked separately in notes)
RUNE_READY = "RUNE_READY"  # a readied rune == a future energy/power
UNIT_READY = "UNIT_READY"  # an untapped permanent == a future exhaust-activation
BODY = "BODY"              # a friendly permanent on board (sac fodder)
CARD_HAND = "CARD_HAND"
CARD_DECK = "CARD_DECK"    # cards returned to deck (recursion)
POINT = "POINT"
XP = "XP"
TURN = "TURN"
MIGHT = "MIGHT"

# Resources that, if net-positive in a closed loop, mean "unbounded".
# MIGHT is deliberately EXCLUDED: Riftbound has no life total, so unbounded Might
# is board presence, not a win condition, and it swamped the results as a payoff.
PAYOFF = {POINT: "points (WIN CONDITION)", TURN: "extra turns",
          RUNE_READY: "readied runes", ENERGY: "energy", POWER: "power",
          CARD_HAND: "cards", BODY: "bodies/tokens", XP: "XP"}


def eff_delta(e):
    """effect op -> {resource: qty}"""
    op = e.get("op")
    q = e.get("qty", 1)
    if not isinstance(q, int):
        q = 1
    if q == -1:
        # Extractors used -1 for BOTH "all"/"up to X" AND "variable amount".
        # Credit only 1 — the conservative reading. Over-crediting here manufactures
        # phantom loops that waste the (expensive) VERIFY/REFUTE budget.
        q = 1
    if op == "add_energy":
        return {ENERGY: q}
    if op == "add_power":
        return {POWER: q}
    if op == "channel_rune":
        return {RUNE_READY: q} if e.get("state") == "ready" else {}
    if op == "ready":
        t = (e.get("target") or "").lower()
        if "rune" in t:
            return {RUNE_READY: q}
        return {UNIT_READY: q}
    if op == "draw":
        return {CARD_HAND: q} if e.get("who") != "opponent" else {}
    if op == "recycle":
        return {CARD_DECK: q}
    if op == "create_token":
        return {BODY: q, UNIT_READY: q if e.get("state") == "ready" else 0}
    if op == "gain_point":
        return {POINT: q}
    if op == "gain_xp":
        return {XP: q}
    if op == "extra_turn":
        return {TURN: q}
    if op == "buff_might":
        return {MIGHT: q}
    if op == "play_free":
        return {BODY: 1, CARD_HAND: -1}
    if op == "win_game":
        return {POINT: 99}
    if op == "bounce":
        return {CARD_HAND: q, BODY: -q}
    return {}


def cost_delta(c):
    """cost object -> {resource: -qty}"""
    if not c:
        return {}
    d = defaultdict(int)
    if isinstance(c.get("energy"), int):
        d[ENERGY] -= c["energy"]
    p = c.get("power")
    if isinstance(p, list) and p:
        d[POWER] -= len(p)
    if c.get("exhaust_self"):
        d[UNIT_READY] -= 1
    if c.get("kill_self") or c.get("recycle_self") or c.get("banish_self"):
        d[BODY] -= 1
    if c.get("kill_friendly"):
        d[BODY] -= 1
    if isinstance(c.get("discard"), int):
        d[CARD_HAND] -= c["discard"]
    if isinstance(c.get("spend_xp"), int):
        d[XP] -= c["spend_xp"]
    return dict(d)


def load():
    cards = []
    for f in sorted(glob.glob("extract_out/chunk*.jsonl")):
        for line in open(f, encoding="utf-8"):
            line = line.strip()
            if line:
                try:
                    cards.append(json.loads(line))
                except json.JSONDecodeError:
                    pass
    return cards


def load_src():
    """original card records — needed for PLAY COSTS, which the extract schema omits for units/gear"""
    src = {}
    for f in glob.glob("extract_in/chunk*.jsonl"):
        for line in open(f, encoding="utf-8"):
            line = line.strip()
            if line:
                c = json.loads(line)
                src[c["code"]] = c
    return src


PLAY_TRIGGER = ("when you play", "when i enter", "as you play", "when this enters",
                "when i am played", "when played")


def is_play_triggered(ab):
    t = (ab.get("trigger") or "").lower()
    return any(p in t for p in PLAY_TRIGGER)


def repeatable(ab):
    """Can this ability be used more than once without re-paying a card from hand?

    Activated abilities are repeatable (if their cost is restorable).
    Play-triggered and death-triggered abilities require re-deploying the card,
    which the loop must pay for — they are not free repeat engines.
    """
    k = ab.get("kind")
    if k == "activated":
        return True
    if k in ("static", "replacement", "keyword"):
        return False
    return False


def abilities(cards):
    """flatten to (card_code, card_name, ability_index, delta, ability) tuples

    Modal handling: several extractors flagged modal cards ("choose one") by listing
    every mode as a sibling effect and writing "modal" into notes. Summing those
    credits a card with ALL modes at once, which is wrong and manufactures loops.
    For modal cards we credit only the single best mode.
    """
    src = load_src()
    out = []
    for c in cards:
        modal = "modal" in (c.get("notes") or "").lower()
        s = src.get(c["code"], {})
        for i, ab in enumerate(c.get("abilities") or []):
            d = defaultdict(int)
            for k, v in cost_delta(ab.get("cost")).items():
                d[k] += v
            # A play-triggered ability is NOT free: re-using it means re-deploying the
            # card, so charge the card's printed cost. Without this, "when you play me,
            # draw 1" reads as an infinite card engine.
            if is_play_triggered(ab) and not (ab.get("cost") or {}).get("energy"):
                if isinstance(s.get("energy"), int):
                    d[ENERGY] -= s["energy"]
                if isinstance(s.get("power"), int):
                    d[POWER] -= s["power"]
                d[CARD_HAND] -= 1  # the card itself has to come from somewhere
            effs = ab.get("effects") or []
            if modal and len(effs) > 1:
                # take the single most valuable mode rather than the sum
                best, best_score = {}, -1
                for e in effs:
                    dd = eff_delta(e)
                    sc = sum(v for v in dd.values() if v > 0)
                    if sc > best_score:
                        best, best_score = dd, sc
                for k, v in best.items():
                    d[k] += v
            else:
                for e in effs:
                    for k, v in eff_delta(e).items():
                        d[k] += v
            d = {k: v for k, v in d.items() if v}
            if d:
                out.append((c["code"], c.get("name", "?"), i, d, ab))
    return out


def is_cycle(deltas):
    """A genuine loop must CONSUME AND RESTORE at least one resource.

    Without this, any set of cost-free positive effects looks like an engine.
    The classic shape: ability A costs exhaust_self (-UNIT_READY) and makes a resource;
    ability B restores UNIT_READY. UNIT_READY is both produced and consumed => a cycle.
    """
    produced, consumed = set(), set()
    for d in deltas:
        for k, v in d.items():
            if v > 0:
                produced.add(k)
            elif v < 0:
                consumed.add(k)
    return bool(produced & consumed)


def combine(deltas):
    t = defaultdict(int)
    for d in deltas:
        for k, v in d.items():
            t[k] += v
    return {k: v for k, v in t.items() if v}


def is_loop(total):
    """Covering condition: nothing net-negative, at least one payoff net-positive."""
    if any(v < 0 for v in total.values()):
        return None
    gains = {k: v for k, v in total.items() if v > 0 and k in PAYOFF}
    if not gains:
        return None
    # prefer the strongest payoff for labelling
    for pref in (POINT, TURN, RUNE_READY, ENERGY, POWER, BODY, CARD_HAND, XP, MIGHT):
        if pref in gains:
            return pref
    return next(iter(gains))


def main():
    cards = load()
    abs_ = abilities(cards)
    print(f"cards loaded: {len(cards)}   abilities with resource deltas: {len(abs_)}")

    # index: which abilities PRODUCE each resource (to prune the pair/triple space)
    producers = defaultdict(set)
    for idx, (_, _, _, d, _) in enumerate(abs_):
        for k, v in d.items():
            if v > 0:
                producers[k].add(idx)

    consumers = defaultdict(set)
    for idx, (_, _, _, d, _) in enumerate(abs_):
        for k, v in d.items():
            if v < 0:
                consumers[k].add(idx)

    print("\nresource       producers  consumers")
    for r in sorted(set(producers) | set(consumers)):
        print(f"  {r:12} {len(producers[r]):>8}  {len(consumers[r]):>9}")

    results = []
    seen = set()

    def accept(idxs):
        """A candidate must (a) balance, (b) form a real cycle, (c) contain a repeatable engine."""
        deltas = [abs_[i][3] for i in idxs]
        t = combine(deltas)
        p = is_loop(t)
        if not p:
            return None
        if not is_cycle(deltas):
            return None
        if not any(repeatable(abs_[i][4]) for i in idxs):
            return None
        return t, p

    # --- singles: a self-sustaining ability (rare but real)
    for idx, (code, name, ai, d, ab) in enumerate(abs_):
        r = accept([idx])
        if r:
            results.append(([idx], r[0], r[1]))

    # --- pairs: only where one produces what the other consumes
    cand = set()
    for r, cons in consumers.items():
        for ci in cons:
            for pi in producers.get(r, ()):
                if pi != ci and abs_[pi][0] != abs_[ci][0]:
                    cand.add((min(pi, ci), max(pi, ci)))
    print(f"\npair candidates after resource-linkage pruning: {len(cand):,}")
    for pi, ci in cand:
        r = accept([pi, ci])
        if r:
            key = tuple(sorted({abs_[pi][0], abs_[ci][0]}))
            if key not in seen:
                seen.add(key)
                results.append(([pi, ci], r[0], r[1]))

    # --- triples: extend surviving *linked* pairs by one more linked ability
    linked = list(cand)
    trip = 0
    for pi, ci in linked:
        need = {k for k, v in combine([abs_[pi][3], abs_[ci][3]]).items() if v < 0}
        if not need:
            continue
        third = set()
        for r in need:
            third |= producers.get(r, set())
        for ti in third:
            if ti in (pi, ci):
                continue
            codes = {abs_[pi][0], abs_[ci][0], abs_[ti][0]}
            if len(codes) < 3:
                continue
            trip += 1
            r = accept([pi, ci, ti])
            if r:
                key = tuple(sorted(codes))
                if key not in seen:
                    seen.add(key)
                    results.append(([pi, ci, ti], r[0], r[1]))
    print(f"triple combinations evaluated: {trip:,}")

    # rank: point/turn payoffs first, then fewer cards
    rank = {POINT: 0, TURN: 1, RUNE_READY: 2, ENERGY: 3, POWER: 4,
            BODY: 5, CARD_HAND: 6, XP: 7, MIGHT: 8}
    results.sort(key=lambda r: (rank.get(r[2], 9), len(r[0])))

    out = []
    for idxs, total, payoff in results:
        out.append({
            "cards": [{"code": abs_[i][0], "name": abs_[i][1], "ability": abs_[i][2]} for i in idxs],
            "net": total,
            "payoff": payoff,
            "payoff_label": PAYOFF.get(payoff, payoff),
            "abilities": [abs_[i][4] for i in idxs],
        })
    json.dump(out, open("candidates.json", "w"), indent=1)

    print(f"\n{'='*64}\nCANDIDATE LOOPS: {len(out):,}")
    by = defaultdict(int)
    for o in out:
        by[o["payoff_label"]] += 1
    for k, v in sorted(by.items(), key=lambda x: -x[1]):
        print(f"  {v:>5}  {k}")
    print(f"\nby size: " + ", ".join(
        f"{n}-card: {sum(1 for o in out if len(o['cards'])==n)}" for n in (1, 2, 3)))


if __name__ == "__main__":
    main()
