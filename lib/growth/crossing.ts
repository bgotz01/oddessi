/**
 * lib/growth/crossing.ts
 *
 * Interpretation vocabulary for bodies square the nodal axis.
 *
 * A nodal square is not treated as "more resistance". Resistance belongs to the
 * South Node side of the model: the developed strategy pulling the person back
 * toward what already works.
 *
 * A crossing is different. A body square the nodes stands across BOTH ends of
 * the axis. Neither continuing the old strategy nor simply moving toward the
 * North Node resolves what that body is asking for.
 *
 * So each crossing answers four questions:
 *
 *   DEMAND        What does this part of the psyche require?
 *   CONFLICT      Why does neither end of the axis resolve it?
 *   INTERRUPTION  What happens to the trajectory when it is not integrated?
 *   INTEGRATION   What capability has to enter the movement?
 *
 * This file deliberately contains no React and knows nothing about the page.
 * It is vocabulary. The chart decides which entry is relevant; the component
 * decides how to display it.
 */

export interface CrossingInterpretation {
    /**
     * Short derived headline.
     *
     * This should name the developmental capability, not the planet:
     * "Direct assertion", not "Mars".
     */
    demand: string;

    /**
     * Why this requirement sits across the nodal movement rather than neatly
     * belonging to either pole.
     */
    conflict: string;

    /**
     * The lived consequence of leaving this function outside the growth story.
     */
    interruption: string;

    /**
     * What it looks like to incorporate the function into the trajectory.
     */
    integration: string;
}

export const CROSSING_BY_BODY: Record<string, CrossingInterpretation> = {
    Sun: {
        demand: "A self you can stand behind",
        conflict:
            "Identity and visibility cannot remain consequences of the move — they have to become part of it. Neither staying with the old competence nor adopting the new direction answers the question of who is actually standing behind the choice.",
        interruption:
            "The trajectory stalls when the right move requires becoming someone you do not recognise, or when you can move only by hiding the part of you that wants to be seen in it.",
        integration:
            "Choose a direction you can inhabit openly. Let the move become part of who you are rather than something you perform while your identity remains somewhere else.",
    },

    Moon: {
        demand: "Emotional safety that can travel with you",
        conflict:
            "The trajectory asks for development, but the emotional system has needs that neither end of the axis automatically satisfies. Going forward does not erase the need for safety, belonging or regulation.",
        interruption:
            "When those needs remain unnamed, the trajectory repeatedly reorganises itself around restoring familiarity, reassurance or emotional equilibrium.",
        integration:
            "Build enough emotional safety into the move that development does not require abandoning what actually regulates you. Growth has to become somewhere the emotional system can live.",
    },

    Mercury: {
        demand: "A way to think and say the move clearly",
        conflict:
            "The trajectory cannot stabilise while thought, language or decision-making keeps running on a separate track. Neither pole resolves what must be understood, named or communicated.",
        interruption:
            "The move gets interrupted by second-guessing, contradictory explanations, reopening settled questions or being unable to say plainly what has actually been decided.",
        integration:
            "Give the movement language. Decide what you mean, say it clearly, and let communication serve the direction rather than continually reopen it.",
    },

    Venus: {
        demand: "Desire and relationship brought into the decision",
        conflict:
            "What you value, want or need from other people does not disappear simply because the developmental direction is clear. Neither pole automatically resolves attachment, attraction, approval or value.",
        interruption:
            "The trajectory bends when preserving approval, attachment, comfort or desirability quietly becomes more important than the movement itself.",
        integration:
            "Make desire explicit. Let relationships and values negotiate with the direction openly instead of steering it from underneath.",
    },

    Mars: {
        demand: "Direct assertion",
        conflict:
            "Neither the old competence nor the new direction resolves conflict, anger or the need to act. The trajectory still has to answer the question of what happens when something must be confronted directly.",
        interruption:
            "Pressure accumulates when confrontation is postponed. Action then arrives late, sideways or reactively, disrupting the movement and often throwing the person back toward the easier old strategy.",
        integration:
            "Confront deliberately. Say what you want, tolerate friction, and act before accumulated pressure has to act for you.",
    },

    Jupiter: {
        demand: "A belief large enough to act on",
        conflict:
            "Expansion, conviction and appetite for possibility can run across the developmental direction rather than neatly supporting it. A larger horizon is not necessarily the same horizon the axis is asking for.",
        interruption:
            "The trajectory gets replaced by a bigger promise, wider frame or new horizon whenever the present movement starts to feel too narrow, ordinary or costly.",
        integration:
            "Let expansion enlarge the actual direction rather than substitute for it. Choose the belief or opportunity that makes the real movement more possible.",
    },

    Saturn: {
        demand: "A structure that can carry the move",
        conflict:
            "The trajectory encounters limits, obligations and consequences that neither end of the axis can simply wish away. Development still has to survive contact with reality.",
        interruption:
            "Growth becomes delay when readiness, permission, duty or fear of getting it wrong is allowed to become a permanent prerequisite.",
        integration:
            "Give the movement a structure. Accept the real constraint, define the responsibility, and proceed inside actual limits rather than waiting for them to disappear.",
    },

    Uranus: {
        demand: "Freedom that is consciously owned",
        conflict:
            "The need for autonomy and disruption cuts across both the familiar strategy and the intended direction. Neither pole automatically gives enough room to remain genuinely free.",
        interruption:
            "The trajectory breaks whenever confinement becomes intolerable and rupture starts to matter more than where the rupture actually leads.",
        integration:
            "Make room for genuine independence inside the direction so freedom does not have to arrive as sabotage.",
    },

    Neptune: {
        demand: "Room for what cannot be controlled",
        conflict:
            "The movement encounters ambiguity, idealisation and permeability that neither pole can fully organise. Not everything required by the trajectory can be made certain first.",
        interruption:
            "The trajectory dissolves when the imagined version of the move becomes easier to inhabit than the concrete one, or when uncertainty itself becomes a reason not to commit.",
        integration:
            "Allow some uncertainty to remain without surrendering the direction. Keep the vision, but attach it to a concrete next movement.",
    },

    Pluto: {
        demand: "Power and control faced directly",
        conflict:
            "The trajectory activates questions of control, exposure and irreversible change that neither end of the axis resolves by itself.",
        interruption:
            "The movement becomes compulsive, secretive or all-or-nothing when maintaining control matters more than allowing the transformation itself to happen.",
        integration:
            "Name what you are trying to control. Use depth to transform the movement rather than to dominate, withhold or endlessly excavate it.",
    },

    /**
     * The angles are not bodies, and they square the nodal axis often — the
     * Ascendant does so in two of the four crossing charts on hand, where it
     * was silently taking the generic fallback. An angle has no will of its
     * own, so the demand is about orientation rather than appetite: it is the
     * shape you arrive in, and the shape a life is built around.
     */
    Ascendant: {
        demand: "A way of arriving that fits the move",
        conflict:
            "The manner you show up in was built for the old competence and is not neutral. Neither end of the axis resolves it, because it is the doorway both ends are entered through.",
        interruption:
            "The move gets undermined at the first impression: you set out in the new direction while still presenting as the person who does the old thing, and are met accordingly.",
        integration:
            "Let the approach change with the direction. Arriving differently is not performance — it is what lets other people meet the version of you that is actually moving.",
    },

    Midheaven: {
        demand: "A public shape the move can be seen in",
        conflict:
            "What you are known for answers to neither pole. The old competence built the reputation and the new direction has not yet earned one, so visibility itself becomes the sticking point.",
        interruption:
            "The trajectory stalls at exposure: progress made privately does not register publicly, and the record keeps describing who you were.",
        integration:
            "Let the outward record catch up deliberately. Say what you are doing now, rather than waiting for the work to speak for a direction nobody has been told about.",
    },

    /**
     * Not reachable with the charts currently stored — none of them carry
     * Chiron — but `BODY_VERBS` lists it, and a dictionary that covers a body
     * in one place and drops it in another is a trap for whoever adds Chiron to
     * the ephemeris later.
     */
    Chiron: {
        demand: "An injury that has to travel with you",
        conflict:
            "Neither staying nor moving heals it. The old competence was partly built to protect it, and the new direction asks for exactly the exposure it flinches from.",
        interruption:
            "The move stops wherever the sore place is touched, and the retreat afterwards looks like a considered decision rather than a flinch.",
        integration:
            "Carry it openly instead of routing around it. What was survived is usually the part other people most need taught, and teaching it is what turns the wound into a function.",
    },
};

export const FALLBACK_CROSSING: CrossingInterpretation = {
    demand: "A third demand that cannot be bypassed",
    conflict:
        "This part of the chart answers to neither end of the nodal axis, so changing direction does not make its demand disappear.",
    interruption:
        "When it remains outside the growth story, the trajectory repeatedly has to stop and deal with it anyway.",
    integration:
        "Bring this function into the movement deliberately rather than treating it as an obstacle that should disappear once you are going the right way.",
};

/**
 * Return the developmental interpretation for a body square the nodal axis.
 *
 * Kept as a function rather than exposing direct table access everywhere so
 * callers never have to implement fallback behaviour themselves.
 */
export function crossingInterpretation(
    body: string,
): CrossingInterpretation {
    return CROSSING_BY_BODY[body] ?? FALLBACK_CROSSING;
}


// ─── Where the demand keeps surfacing ────────────────────────────────────────

/**
 * The house layer.
 *
 * Without this, Mars square the nodes reads identically whether Mars is in the
 * second house or the twelfth — the body names the demand, and the demand alone
 * is the dictionary's entry rather than this chart's. The house answers the
 * question the body cannot: *where does this unresolved demand keep showing
 * up?*
 *
 * Deliberately about surfacing rather than meaning. The body says what is being
 * asked for; the house says the terrain it keeps being asked for in, which is
 * what makes a crossing recognisable to the person who has it.
 */
export interface CrossingArena {
  /** Where it keeps appearing, as a clause following "tends to surface …". */
  showsUpAs: string;
  /** What integrating it looks like in that specific terrain. */
  integrationArena: string;
}

export const CROSSING_ARENA: Record<number, CrossingArena> = {
  1: {
    showsUpAs:
      "in how you come across — the demand shows in your manner before you have decided anything about it",
    integrationArena:
      "Let it be visible on purpose rather than leaking into first impressions.",
  },
  2: {
    showsUpAs:
      "around what you own and what you are worth — it attaches itself to money, security and the question of whether you have enough standing to ask",
    integrationArena:
      "Give it a resource of its own rather than letting it argue through your sense of worth.",
  },
  3: {
    showsUpAs:
      "in conversation and in the immediate — it comes out sideways in how you explain, argue and answer",
    integrationArena:
      "Say it directly to the person in front of you, before it becomes a way of talking.",
  },
  4: {
    showsUpAs:
      "at home and in private — it stays out of public view and works on the foundations instead",
    integrationArena:
      "Deal with it where it lives rather than only where it is convenient to be seen doing so.",
  },
  5: {
    showsUpAs:
      "in what you make and who you are drawn to — it shows up in the risks taken for pleasure rather than the ones taken for a plan",
    integrationArena:
      "Put it into the work you make, where it can be both expressed and looked at.",
  },
  6: {
    showsUpAs:
      "in the daily round — it accumulates through routine, work and the body rather than arriving as an event",
    integrationArena:
      "Build it into the ordinary practice, since that is the only place it repeats.",
  },
  7: {
    showsUpAs:
      "in one-to-one relationships — it becomes something the other person seems to be doing rather than something being asked of you",
    integrationArena:
      "Name it as yours inside the relationship instead of negotiating around it.",
  },
  8: {
    showsUpAs:
      "wherever things are shared — it surfaces around trust, money held in common, and what cannot be controlled alone",
    integrationArena:
      "Let someone else hold part of it, which is the only terrain in which it can actually be settled.",
  },
  9: {
    showsUpAs:
      "in what you believe — it argues at the level of principle and worldview rather than in particulars",
    integrationArena:
      "Let it revise the frame rather than defending the frame against it.",
  },
  10: {
    showsUpAs:
      "in public — it turns up in your work, your standing and what you are held to",
    integrationArena:
      "Take responsibility for it on the record, where it is already visible anyway.",
  },
  11: {
    showsUpAs:
      "among friends and in groups — it emerges through alliances, shared projects and where you fit",
    integrationArena:
      "Let the group carry part of it, rather than being the one person it belongs to.",
  },
  12: {
    showsUpAs:
      "out of sight — pressure gathers privately and unconsciously until it acts for you rather than through you",
    integrationArena:
      "Notice it early, while it is still an impulse rather than an accumulation.",
  },
};

/** The arena, when the body's house is known. */
export function crossingArena(house: number | null): CrossingArena | null {
  return house ? (CROSSING_ARENA[house] ?? null) : null;
}

// ─── Derivation ──────────────────────────────────────────────────────────────

/**
 * A body square the nodal axis, with where it stands and what it asks for.
 *
 * The interpretation is resolved here rather than in the component, so the UI
 * never has to know that a nodal square is what produces a crossing.
 */
export interface CrossingBody {
  body: string;
  sign: string;
  degree: string;
  house: number | null;
  interpretation: CrossingInterpretation;
  /**
   * Where this particular crossing keeps surfacing. Null only when the body's
   * house is unknown — with it, Mars in the twelfth stops reading exactly like
   * Mars in the second.
   */
  arena: CrossingArena | null;
}

export interface Crossing {
  bodies: CrossingBody[];
  /**
   * True when a single body carries the crossing, which is the common case and
   * the only one where leading with one demand is honest.
   *
   * With several, no combined interpretation is manufactured: two bodies square
   * the axis for unrelated reasons and inventing a synthesis would be the model
   * asserting something it has not computed.
   */
  single: boolean;
}

export interface CrossingPlacement {
  body: string;
  sign: string;
  degree: string;
  house: number | null;
}

/**
 * Null when nothing squares the axis — which is most charts.
 *
 * Returning null rather than an empty list is the point: a crossing either
 * exists as a feature of the chart or it does not, and `t.crossing` reads as
 * that question. It replaces an earlier pair of fields — a boolean and a list —
 * that could in principle disagree with each other.
 */
export function deriveCrossing(placements: CrossingPlacement[]): Crossing | null {
  if (placements.length === 0) return null;
  return {
    bodies: placements.map((p) => ({
      ...p,
      interpretation: crossingInterpretation(p.body),
      arena: crossingArena(p.house),
    })),
    single: placements.length === 1,
  };
}
