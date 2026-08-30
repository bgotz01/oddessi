// lib/career/career-theses.ts

export type CareerDirectionSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export type CareerEngineBody =
  | "Sun"
  | "Moon"
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
  | "Pluto";

export interface CareerThesisInterpretation {
  statement: string;
}

export type CareerThesisMatrix = Record<
  CareerDirectionSign,
  Record<CareerEngineBody, CareerThesisInterpretation>
>;

const DIRECTION_SIGNS: readonly CareerDirectionSign[] = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const ENGINE_BODIES: readonly CareerEngineBody[] = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

/**
 * Authored Direction × Engine interpretations.
 *
 * Each statement describes the career value created by the interaction:
 * what the direction becomes when carried through this particular engine.
 *
 * Formula concepts live in `career-interpretations.ts`; keeping them separate
 * prevents the visible derivation and its conclusion from drifting together.
 */
export const CAREER_THESIS_MATRIX: CareerThesisMatrix = {
  Aries: {
    Sun: {
      statement: "Turn initiative into visible leadership.",
    },
    Moon: {
      statement: "Act quickly on emerging human needs.",
    },
    Mercury: {
      statement: "Turn new ideas into immediate movement.",
    },
    Venus: {
      statement: "Create momentum through attraction and alliance.",
    },
    Mars: {
      statement: "Break new ground through decisive action.",
    },
    Jupiter: {
      statement: "Turn bold beginnings into wider opportunity.",
    },
    Saturn: {
      statement: "Turn initiative into disciplined leadership.",
    },
    Uranus: {
      statement: "Open new territory by rejecting old rules.",
    },
    Neptune: {
      statement: "Give intuition the courage to act.",
    },
    Pluto: {
      statement: "Drive change where resistance is strongest.",
    },
  },

  Taurus: {
    Sun: {
      statement: "Put your name on value that lasts.",
    },
    Moon: {
      statement: "Build lasting value around real human needs.",
    },
    Mercury: {
      statement: "Turn practical knowledge into lasting value.",
    },
    Venus: {
      statement: "Create lasting value people genuinely want.",
    },
    Mars: {
      statement: "Turn steady effort into durable results.",
    },
    Jupiter: {
      statement: "Grow lasting value into wider opportunity.",
    },
    Saturn: {
      statement: "Build something strong enough to endure.",
    },
    Uranus: {
      statement: "Reinvent how lasting value gets created.",
    },
    Neptune: {
      statement: "Give imagination a useful, lasting form.",
    },
    Pluto: {
      statement: "Turn resources into durable power.",
    },
  },

  Gemini: {
    Sun: {
      statement: "Make connected ideas visible and memorable.",
    },
    Moon: {
      statement: "Turn human experience into shared understanding.",
    },
    Mercury: {
      statement: "Connect knowledge through clear communication.",
    },
    Venus: {
      statement: "Make ideas travel through people and taste.",
    },
    Mars: {
      statement: "Turn information into decisive movement.",
    },
    Jupiter: {
      statement: "Expand understanding through teaching and exchange.",
    },
    Saturn: {
      statement: "Turn intellectual range into structured expertise.",
    },
    Uranus: {
      statement: "Connect ideas in ways others haven't seen.",
    },
    Neptune: {
      statement: "Give subtle perceptions a shared language.",
    },
    Pluto: {
      statement: "Use information to reveal what really matters.",
    },
  },

  Cancer: {
    Sun: {
      statement: "Build belonging through visible leadership.",
    },
    Moon: {
      statement: "Turn care into dependable belonging.",
    },
    Mercury: {
      statement: "Give trusted communities a clear voice.",
    },
    Venus: {
      statement: "Create belonging people want to return to.",
    },
    Mars: {
      statement: "Protect what matters through decisive action.",
    },
    Jupiter: {
      statement: "Grow communities through trust and generosity.",
    },
    Saturn: {
      statement: "Turn care into dependable structure.",
    },
    Uranus: {
      statement: "Create new ways for people to belong.",
    },
    Neptune: {
      statement: "Give compassion a useful form.",
    },
    Pluto: {
      statement: "Turn inherited patterns into deeper trust.",
    },
  },

  Leo: {
    Sun: {
      statement: "Create work unmistakably your own.",
    },
    Moon: {
      statement: "Create visible work that genuinely moves people.",
    },
    Mercury: {
      statement: "Give original work a compelling voice.",
    },
    Venus: {
      statement: "Create distinctive work people are drawn to.",
    },
    Mars: {
      statement: "Drive original work into public view.",
    },
    Jupiter: {
      statement: "Turn authorship into wider influence.",
    },
    Saturn: {
      statement: "Turn creative authority into lasting work.",
    },
    Uranus: {
      statement: "Redefine what personal authorship can look like.",
    },
    Neptune: {
      statement: "Give imagination a recognizable signature.",
    },
    Pluto: {
      statement: "Create work with transformative presence.",
    },
  },

  Virgo: {
    Sun: {
      statement: "Make mastery visible through precise work.",
    },
    Moon: {
      statement: "Improve systems by noticing what people need.",
    },
    Mercury: {
      statement: "Turn analysis into exact, useful work.",
    },
    Venus: {
      statement: "Turn refinement into something people value.",
    },
    Mars: {
      statement: "Make complex work function under pressure.",
    },
    Jupiter: {
      statement: "Scale useful knowledge without losing precision.",
    },
    Saturn: {
      statement: "Build mastery through disciplined refinement.",
    },
    Uranus: {
      statement: "Redesign flawed systems with exacting insight.",
    },
    Neptune: {
      statement: "Give subtle insight a practical method.",
    },
    Pluto: {
      statement: "Transform systems by finding the real fault.",
    },
  },

  Libra: {
    Sun: {
      statement: "Make sound judgment visible through leadership.",
    },
    Moon: {
      statement: "Create fairer outcomes around real human needs.",
    },
    Mercury: {
      statement: "Improve agreements through language and analysis.",
    },
    Venus: {
      statement: "Create better outcomes through taste and relationship.",
    },
    Mars: {
      statement: "Turn negotiation into decisive agreement.",
    },
    Jupiter: {
      statement: "Open possibilities through partnership and perspective.",
    },
    Saturn: {
      statement: "Give fair decisions durable structure.",
    },
    Uranus: {
      statement: "Redesign how people collaborate and decide.",
    },
    Neptune: {
      statement: "Bring empathy and imagination into agreement.",
    },
    Pluto: {
      statement: "Transform relationships by exposing hidden power.",
    },
  },

  Scorpio: {
    Sun: {
      statement: "Take ownership of problems with real stakes.",
    },
    Moon: {
      statement: "Read hidden needs where stakes are high.",
    },
    Mercury: {
      statement: "Expose what matters through precise investigation.",
    },
    Venus: {
      statement: "Build trust around difficult value decisions.",
    },
    Mars: {
      statement: "Confront high-stakes problems with decisive force.",
    },
    Jupiter: {
      statement: "Turn deep insight into strategic advantage.",
    },
    Saturn: {
      statement: "Turn pressure into controlled authority.",
    },
    Uranus: {
      statement: "Reinvent systems others are afraid to touch.",
    },
    Neptune: {
      statement: "Give hidden realities an intelligible form.",
    },
    Pluto: {
      statement: "Transform what others would rather avoid.",
    },
  },

  Sagittarius: {
    Sun: {
      statement: "Give big ideas a visible voice.",
    },
    Moon: {
      statement: "Turn human understanding into wider perspective.",
    },
    Mercury: {
      statement: "Carry big ideas through clear language.",
    },
    Venus: {
      statement: "Open new possibilities through connection.",
    },
    Mars: {
      statement: "Turn conviction into decisive action.",
    },
    Jupiter: {
      statement: "Turn big ideas into wider opportunity.",
    },
    Saturn: {
      statement: "Turn broad vision into lasting structure.",
    },
    Uranus: {
      statement: "Open new territory through reinvention.",
    },
    Neptune: {
      statement: "Give imagination a larger purpose.",
    },
    Pluto: {
      statement: "Change the frame others take for granted.",
    },
  },

  Capricorn: {
    Sun: {
      statement: "Take visible ownership of consequential work.",
    },
    Moon: {
      statement: "Build responsible structures around real needs.",
    },
    Mercury: {
      statement: "Turn strategic thinking into durable systems.",
    },
    Venus: {
      statement: "Build authority through judgment and relationship.",
    },
    Mars: {
      statement: "Turn ambition into sustained execution.",
    },
    Jupiter: {
      statement: "Grow institutions without weakening their foundations.",
    },
    Saturn: {
      statement: "Build authority capable of carrying real weight.",
    },
    Uranus: {
      statement: "Reinvent institutions without losing structural rigor.",
    },
    Neptune: {
      statement: "Give a larger calling durable form.",
    },
    Pluto: {
      statement: "Rebuild authority around what truly matters.",
    },
  },

  Aquarius: {
    Sun: {
      statement: "Make unconventional systems visibly your own.",
    },
    Moon: {
      statement: "Build new systems around emerging human needs.",
    },
    Mercury: {
      statement: "Turn original ideas into clear systems.",
    },
    Venus: {
      statement: "Redesign value through relationship and taste.",
    },
    Mars: {
      statement: "Put unconventional ideas into action.",
    },
    Jupiter: {
      statement: "Scale ideas that challenge convention.",
    },
    Saturn: {
      statement: "Give unconventional systems lasting structure.",
    },
    Uranus: {
      statement: "Reinvent the system from first principles.",
    },
    Neptune: {
      statement: "Give visionary ideas a compelling form.",
    },
    Pluto: {
      statement: "Transform obsolete systems at their roots.",
    },
  },

  Pisces: {
    Sun: {
      statement: "Give imagination a visible personal form.",
    },
    Moon: {
      statement: "Turn sensitivity to people into useful work.",
    },
    Mercury: {
      statement: "Translate intuition into language people can use.",
    },
    Venus: {
      statement: "Give imagination a form people can feel.",
    },
    Mars: {
      statement: "Put compassionate imagination into action.",
    },
    Jupiter: {
      statement: "Turn imagination into wider possibility.",
    },
    Saturn: {
      statement: "Give subtle vision a durable container.",
    },
    Uranus: {
      statement: "Create new forms for needs others overlook.",
    },
    Neptune: {
      statement: "Give the unseen a form others can enter.",
    },
    Pluto: {
      statement: "Turn hidden feeling into transformative work.",
    },
  },
};

function isDirectionSign(value: string): value is CareerDirectionSign {
  return DIRECTION_SIGNS.some((sign) => sign === value);
}

function isEngineBody(value: string): value is CareerEngineBody {
  return ENGINE_BODIES.some((body) => body === value);
}

export function careerThesisInterpretation(
  directionSign: string,
  engineBody: string,
): CareerThesisInterpretation | null {
  if (!isDirectionSign(directionSign) || !isEngineBody(engineBody)) {
    return null;
  }

  return CAREER_THESIS_MATRIX[directionSign][engineBody];
}