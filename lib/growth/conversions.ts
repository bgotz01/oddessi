/**
 * lib/growth/conversions.ts
 * Conversions written for a whole axis — both signs and both houses at once.
 *
 * The sign table in `signs.ts` already knows what it converts into, because the
 * nodes are always opposite: every Libra South Node is moving toward Aries, so
 * "Comparison → Judgment" is true of all of them. What it cannot know is the
 * ARENA. Libra in the third moving to Aries in the ninth is a conversion of
 * gathered perspectives into a worldview; Libra in the eighth moving to Aries
 * in the second is a conversion of shared entanglement into something owned
 * outright. Same signs, same modes at the sign level, entirely different life.
 *
 * So this is an override layer, not a replacement. An entry here is a curated
 * reading of one axis; where none exists the sign's own conversions stand, and
 * they are complete — no chart renders an empty section waiting for this file
 * to catch up.
 *
 * Keyed departing-first, because that is the direction the reading runs:
 *
 *     "Libra/3>Aries/9"
 *
 * The North side is redundant in the key — the nodes are opposite, so the sign
 * is fixed and the house is six along — and it is written out anyway, because a
 * key you can read is worth more than a key you can derive. It also fails
 * closed on the irregular charts where the nodes are NOT in opposite houses:
 * the key simply does not match, and the sign layer takes over.
 */

export interface AxisConversion {
  /** The practised capacity, in one word. */
  fromMode: string;
  /** What it becomes, in one word. */
  intoMode: string;
  /** What the person actually does now. */
  from: string;
  /** What doing it in the new arena looks like. Imperative. */
  into: string;
}

/**
 * Twelve entries so far, all of them the Libra→Aries axis.
 *
 * Not an arbitrary starting point: that axis covers every chart born across a
 * whole nodal return, so it is where a curated layer earns its keep first. The
 * other eleven axes fall back to the sign layer until they are written, and the
 * fallback is the reason this file can be filled in one axis at a time instead
 * of needing all 144 keys before any of it is useful.
 */
export const AXIS_CONVERSIONS: Record<string, AxisConversion[]> = {
  "Libra/1>Aries/7": [
    {
      fromMode: "Adaptation",
      intoMode: "Selfhood",
      from: "Becoming whoever the room needs",
      into: "Meet people as yourself and let them adjust",
    },
    {
      fromMode: "Diplomacy",
      intoMode: "Directness",
      from: "Managing how you come across",
      into: "Say what you want from the person in front of you",
    },
    {
      fromMode: "Charm",
      intoMode: "Terms",
      from: "Being easy to be around",
      into: "Let the relationship have terms rather than only peace",
    },
  ],

  "Libra/2>Aries/8": [
    {
      fromMode: "Comparison",
      intoMode: "Valuation",
      from: "Pricing yourself against what others get",
      into: "Name what the work is worth before the negotiation starts",
    },
    {
      fromMode: "Fairness",
      intoMode: "Claim",
      from: "Splitting it evenly to keep the peace",
      into: "Ask for the share the risk you carry actually earns",
    },
    {
      fromMode: "Accommodation",
      intoMode: "Exposure",
      from: "Keeping the arrangement comfortable",
      into: "Open the entangled question — money, power, who owes whom",
    },
  ],

  "Libra/3>Aries/9": [
    {
      fromMode: "Comparison",
      intoMode: "Conviction",
      from: "Gathering and weighing perspectives",
      into: "Form a position you are willing to stand behind",
    },
    {
      fromMode: "Interpretation",
      intoMode: "Authorship",
      from: "Explaining what different viewpoints mean",
      into: "Turn what you have learned into a thesis of your own",
    },
    {
      fromMode: "Dialogue",
      intoMode: "Declaration",
      from: "Working ideas out through conversation",
      into: "State the principle clearly enough to put it into the world",
    },
  ],

  "Libra/4>Aries/10": [
    {
      fromMode: "Harmony",
      intoMode: "Direction",
      from: "Keeping the household in balance",
      into: "Decide the direction and let the disagreement happen",
    },
    {
      fromMode: "Belonging",
      intoMode: "Standing",
      from: "Being the one who holds it all together",
      into: "Take a position in public that is yours, not the family's",
    },
    {
      fromMode: "Privacy",
      intoMode: "Record",
      from: "Doing the work where it never has to be defended",
      into: "Put your name on it where it can be judged",
    },
  ],

  "Libra/5>Aries/11": [
    {
      fromMode: "Charm",
      intoMode: "Initiative",
      from: "Making things people will like",
      into: "Start the thing the group has been waiting for",
    },
    {
      fromMode: "Audience",
      intoMode: "Alliance",
      from: "Playing to the room",
      into: "Find the people who want it built, and go",
    },
    {
      fromMode: "Taste",
      intoMode: "Cause",
      from: "Knowing what is good",
      into: "Put the judgement behind a shared effort",
    },
  ],

  "Libra/6>Aries/12": [
    {
      fromMode: "Accommodation",
      intoMode: "Solitude",
      from: "Fitting your day around everyone else's",
      into: "Take the hours back for work nobody is watching",
    },
    {
      fromMode: "Service",
      intoMode: "Instinct",
      from: "Being useful on request",
      into: "Act on what you sense before you can justify it",
    },
    {
      fromMode: "Routine",
      intoMode: "Retreat",
      from: "Keeping the machine running smoothly",
      into: "Let something stay private long enough to become yours",
    },
  ],

  "Libra/7>Aries/1": [
    {
      fromMode: "Partnership",
      intoMode: "Selfhood",
      from: "Working out who you are through the other person",
      into: "Decide what you want before you check",
    },
    {
      fromMode: "Mediation",
      intoMode: "Position",
      from: "Holding the space between two people",
      into: "Take one of the two sides — your own",
    },
    {
      fromMode: "Agreement",
      intoMode: "Initiative",
      from: "Waiting for the terms to be settled",
      into: "Move first and negotiate afterwards",
    },
  ],

  "Libra/8>Aries/2": [
    {
      fromMode: "Entanglement",
      intoMode: "Ownership",
      from: "Holding everything jointly",
      into: "Build something that is yours alone",
    },
    {
      fromMode: "Negotiation",
      intoMode: "Worth",
      from: "Trading your position for a share",
      into: "Set your own price and hold it",
    },
    {
      fromMode: "Exposure",
      intoMode: "Ground",
      from: "Reading what everyone else is protecting",
      into: "Put it into what you can stand on by yourself",
    },
  ],

  "Libra/9>Aries/3": [
    {
      fromMode: "Perspective",
      intoMode: "Argument",
      from: "Holding every worldview in view at once",
      into: "Argue one of them out loud and see if it survives",
    },
    {
      fromMode: "Doctrine",
      intoMode: "Question",
      from: "Explaining what the tradition says",
      into: "Ask the question that actually tests it",
    },
    {
      fromMode: "Breadth",
      intoMode: "Voice",
      from: "Reading widely before speaking",
      into: "Say the unfinished thought while it is still yours",
    },
  ],

  "Libra/10>Aries/4": [
    {
      fromMode: "Reputation",
      intoMode: "Ground",
      from: "Being known as the reasonable one",
      into: "Build the base you actually want to live on",
    },
    {
      fromMode: "Standing",
      intoMode: "Belonging",
      from: "Managing how the work looks",
      into: "Choose where you are from rather than inherit it",
    },
    {
      fromMode: "Duty",
      intoMode: "Autonomy",
      from: "Meeting what the role asks",
      into: "Say what your private life needs, first",
    },
  ],

  "Libra/11>Aries/5": [
    {
      fromMode: "Consensus",
      intoMode: "Authorship",
      from: "Waiting for the group to agree",
      into: "Make the thing and show it",
    },
    {
      fromMode: "Network",
      intoMode: "Desire",
      from: "Keeping everyone connected",
      into: "Follow what you actually want to make",
    },
    {
      fromMode: "Cause",
      intoMode: "Play",
      from: "Serving the shared project",
      into: "Spend some of it on what only pleases you",
    },
  ],

  "Libra/12>Aries/6": [
    {
      fromMode: "Withdrawal",
      intoMode: "Action",
      from: "Retreating when the friction starts",
      into: "Do the one concrete thing the situation needs",
    },
    {
      fromMode: "Absorption",
      intoMode: "Practice",
      from: "Carrying what you pick up from everyone",
      into: "Turn it into something you do every day",
    },
    {
      fromMode: "Deferral",
      intoMode: "Agency",
      from: "Waiting for it to resolve itself",
      into: "Intervene while it is still small",
    },
  ],
};

/**
 * The curated conversions for this axis, or null.
 *
 * Null is the normal answer for most charts and is not a failure: the caller
 * falls back to the departing sign's own conversions, which cover all twelve
 * signs and carry the same four fields.
 */
export function axisConversionsFor(
  fromSign: string,
  fromHouse: number | null,
  toSign: string,
  toHouse: number | null,
): AxisConversion[] | null {
  if (fromHouse === null || toHouse === null) return null;

  return (
    AXIS_CONVERSIONS[`${fromSign}/${fromHouse}>${toSign}/${toHouse}`] ?? null
  );
}
