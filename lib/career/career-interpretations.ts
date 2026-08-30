//lib/career/career-interpretations.ts
import type { CareerFactorReading } from "./snapshot";
import type { CareerSnapshotRole } from "./snapshot-architecture";

export interface CareerRoleInterpretation {
  headline: string;
  body: string;
  /** Concrete manifestations of the pattern, never prescribed professions. */
  examples: string[];
}

type BodyRoleInterpretation = Omit<CareerRoleInterpretation, "examples">;

export interface CareerSynthesisFragment {
  /** Short semantic proposition displayed in the formula. */
  concept: string;
}

interface CareerEngineSynthesisFragment extends CareerSynthesisFragment {
  /** Lowercase form used to compose the Engine force copy. */
  clause: string;
}

interface SignSynthesis {
  direction: CareerSynthesisFragment;
  engine: string;
  earning: string;
}

interface BodySynthesis {
  engine: CareerEngineSynthesisFragment;
  earning: string;
}

type SignRoleCopy = Record<CareerSnapshotRole, CareerRoleInterpretation>;

/**
 * Authored propositions at the useful unit of reuse: one sign answering one
 * career question. These are meaning, not placement descriptions and not
 * complete theses.
 */
const SIGN_ROLE_COPY: Record<string, SignRoleCopy> = {
  Aries: {
    direction: {
      headline: "Pioneer the unproven",
      body: "Move toward work that rewards initiative, speed, and the courage to begin before consensus arrives.",
      examples: ["Launching a venture", "Opening a new market", "Leading a turnaround", "Starting a new initiative"],
    },
    engine: {
      headline: "Work through decisive action",
      body: "You work best through direct moves, short feedback loops, and visible ownership of decisions.",
      examples: ["Rapid prototyping", "Crisis response", "Independent execution", "Short delivery cycles"],
    },
    earning: {
      headline: "Turn initiative into income",
      body: "Value becomes payable when you act first, remove delay, or take responsibility for getting something moving.",
      examples: ["Founder-led products", "Launch strategy", "Turnaround consulting", "Performance-based work"],
    },
    arena: {
      headline: "Be recognized for leadership",
      body: "Visibility grows in roles where decisiveness, independence, and willingness to enter new territory can be seen.",
      examples: ["Front-line leadership", "Venture building", "Competitive environments", "Owning key decisions"],
    },
  },
  Taurus: {
    direction: {
      headline: "Build what endures",
      body: "Move toward work that produces durable value, tangible results, and structures people can continue to rely on.",
      examples: ["Building a durable product", "Growing an asset over time", "Mastering a craft", "Creating dependable systems"],
    },
    engine: {
      headline: "Work through patient construction",
      body: "You work best through consistency, practical judgment, and enough time to make the result dependable.",
      examples: ["Long-cycle product work", "Operations management", "Quality control", "Hands-on craftsmanship"],
    },
    earning: {
      headline: "Monetize lasting value",
      body: "Income grows from assets, craft, quality, or stewardship that remains useful after the immediate effort is over.",
      examples: ["Asset management", "Premium craftsmanship", "Recurring-revenue products", "Property stewardship"],
    },
    arena: {
      headline: "Be recognized for reliability",
      body: "Visibility grows where steadiness, material competence, and the ability to preserve value are publicly legible.",
      examples: ["Product stewardship", "Operations leadership", "Investment management", "Mastery-based work"],
    },
  },
  Gemini: {
    direction: {
      headline: "Connect ideas and people",
      body: "Move toward work built around language, explanation, exchange, and movement between subjects or communities.",
      examples: ["Writing across disciplines", "Building a media platform", "Teaching complex ideas", "Connecting buyers and sellers"],
    },
    engine: {
      headline: "Work through language and range",
      body: "You work best through writing, speaking, learning quickly, and translating between different frames.",
      examples: ["Research and synthesis", "Editorial work", "Sales conversations", "Cross-functional communication"],
    },
    earning: {
      headline: "Monetize clarity and connection",
      body: "Income grows from explaining, brokering, informing, or making complex material easier to move and understand.",
      examples: ["Copywriting", "Research services", "Sales and brokerage", "Teaching and training"],
    },
    arena: {
      headline: "Be recognized for fluency",
      body: "Visibility grows in communicative roles where range, responsiveness, and intellectual agility are on display.",
      examples: ["Public speaking", "Media commentary", "Client presentations", "Publishing ideas"],
    },
  },
  Cancer: {
    direction: {
      headline: "Build trust and belonging",
      body: "Move toward work that protects continuity, understands human needs, and creates a dependable sense of belonging.",
      examples: ["Building a trusted community", "Leading a people-first company", "Creating hospitable spaces", "Protecting institutional memory"],
    },
    engine: {
      headline: "Work through care and memory",
      body: "You work best through attentiveness, loyalty, and an instinctive reading of what people need to feel secure.",
      examples: ["People leadership", "Customer care", "Community operations", "Team development"],
    },
    earning: {
      headline: "Monetize trust and stewardship",
      body: "Income grows where care, continuity, protection, or intimate knowledge makes you the person others return to.",
      examples: ["Hospitality services", "Care practices", "Membership communities", "Long-term client relationships"],
    },
    arena: {
      headline: "Be recognized as trusted",
      body: "Visibility grows in roles where protection, emotional intelligence, and responsibility for people are publicly felt.",
      examples: ["Culture leadership", "Community building", "Hospitality leadership", "Public-facing care work"],
    },
  },
  Leo: {
    direction: {
      headline: "Create work with your name on it",
      body: "Move toward authorship, visible responsibility, and work distinct enough to carry a personal signature.",
      examples: ["Founding a brand", "Directing a creative project", "Leading from the front", "Building signature work"],
    },
    engine: {
      headline: "Work through authored expression",
      body: "You work best when you claim the decision, shape the presentation, and stand visibly behind the result.",
      examples: ["Creative direction", "Founder-led execution", "Performance", "Editorial leadership"],
    },
    earning: {
      headline: "Monetize authorship and presence",
      body: "Income grows from distinctive judgment, creative ownership, or the confidence people place in your personal imprimatur.",
      examples: ["Licensing original work", "Personal-brand services", "Creative commissions", "Leadership retainers"],
    },
    arena: {
      headline: "Be recognized for authorship",
      body: "Visibility grows where leadership, creative identity, and the willingness to occupy the visible seat are required.",
      examples: ["Public leadership", "Performance and presentation", "Creative direction", "Founder-led work"],
    },
  },
  Virgo: {
    direction: {
      headline: "Make complex work precise",
      body: "Move toward craft, correction, and practical systems where careful judgment produces a measurably better result.",
      examples: ["Improving a clinical process", "Engineering a reliable system", "Editing complex material", "Raising quality standards"],
    },
    engine: {
      headline: "Work through exacting craft",
      body: "You work best through analysis, iteration, standards, and close attention to what others overlook.",
      examples: ["Data analysis", "Software engineering", "Technical editing", "Process improvement"],
    },
    earning: {
      headline: "Monetize precision",
      body: "Income grows from diagnosis, refinement, service, or the ability to make a process cleaner and more dependable.",
      examples: ["Specialist consulting", "Diagnostic work", "Quality assurance", "Technical services"],
    },
    arena: {
      headline: "Be recognized for competence",
      body: "Visibility grows where precision, discernment, and mastery of the actual task are impossible to substitute.",
      examples: ["Clinical leadership", "Engineering leadership", "Editorial authority", "Operational excellence"],
    },
  },
  Libra: {
    direction: {
      headline: "Shape better relationships and decisions",
      body: "Move toward work where judgment, negotiation, and collaboration materially improve the outcome.",
      examples: ["Negotiating better agreements", "Designing fair systems", "Building strategic partnerships", "Advising difficult decisions"],
    },
    engine: {
      headline: "Work through calibrated partnership",
      body: "You work best through dialogue, comparison, diplomacy, and a strong sense of how the arrangement should be balanced.",
      examples: ["Partnership development", "Mediation", "Design critique", "Client advisory"],
    },
    earning: {
      headline: "Monetize judgment and relationship",
      body: "Income grows from selection, mediation, design, or creating agreements people consider fair and worth entering.",
      examples: ["Legal advisory", "Design services", "Deal-making", "Relationship consulting"],
    },
    arena: {
      headline: "Be recognized for judgment",
      body: "Visibility grows in relational roles where taste, proportion, diplomacy, and social intelligence can be witnessed directly.",
      examples: ["Public negotiation", "Design leadership", "Partnership leadership", "Trusted advisory"],
    },
  },
  Scorpio: {
    direction: {
      headline: "Work where depth changes outcomes",
      body: "Move toward consequential problems involving power, risk, hidden structures, or realities other people prefer not to confront.",
      examples: ["Investigating hidden risk", "Restructuring a business", "Managing a crisis", "Making high-stakes investments"],
    },
    engine: {
      headline: "Work through depth and leverage",
      body: "You work best through investigation, strategic control, and concentration on what actually determines the result.",
      examples: ["Forensic research", "Investment analysis", "Strategic planning", "Crisis management"],
    },
    earning: {
      headline: "Monetize depth and leverage",
      body: "Income grows from specialist access, difficult judgment, transformation, or responsible control of consequential resources.",
      examples: ["Investment management", "Investigative services", "Restructuring advisory", "Risk strategy"],
    },
    arena: {
      headline: "Be recognized for depth",
      body: "Visibility grows where seriousness, strategic perception, and the ability to handle what is sensitive or high-stakes are unmistakable.",
      examples: ["Crisis leadership", "Strategic authority", "Investigative leadership", "High-stakes advisory"],
    },
  },
  Sagittarius: {
    direction: {
      headline: "Expand the frame",
      body: "Move toward work that opens territory, expands perspective, and connects present activity to a more ambitious horizon.",
      examples: ["Publishing a larger argument", "Teaching across cultures", "Expanding into new markets", "Building an international practice"],
    },
    engine: {
      headline: "Work through reach and synthesis",
      body: "You work best through teaching, exploration, conviction, and the ability to organize details inside a bigger picture.",
      examples: ["Consulting", "Teaching", "Publishing", "International strategy"],
    },
    earning: {
      headline: "Monetize perspective and reach",
      body: "Income grows from teaching, publishing, advising, expansion, or helping others see beyond their current field of view.",
      examples: ["Advisory services", "Courses and teaching", "Publishing", "Market expansion"],
    },
    arena: {
      headline: "Be recognized for perspective",
      body: "Visibility grows where conviction, breadth, and the ability to point beyond the immediate situation are publicly useful.",
      examples: ["Thought leadership", "Public teaching", "International leadership", "Strategic commentary"],
    },
  },
  Capricorn: {
    direction: {
      headline: "Build consequential authority",
      body: "Move toward responsibility, durable institutions, and work whose weight justifies a long climb toward mastery.",
      examples: ["Building an institution", "Leading a long-term enterprise", "Creating durable governance", "Managing significant capital"],
    },
    engine: {
      headline: "Work through structure and endurance",
      body: "You work best through planning, accountability, patience, and the willingness to carry difficult responsibility.",
      examples: ["Program management", "Institution building", "Financial planning", "Governance work"],
    },
    earning: {
      headline: "Monetize responsibility",
      body: "Income grows from governance, management, durable systems, or becoming accountable for outcomes others cannot casually hold.",
      examples: ["Executive management", "Financial oversight", "Governance advisory", "Long-term operations"],
    },
    arena: {
      headline: "Be recognized for authority",
      body: "Visibility grows where senior judgment, structure, and proven responsibility matter more than quick impression.",
      examples: ["Executive leadership", "Institutional leadership", "Board governance", "Public accountability"],
    },
  },
  Aquarius: {
    direction: {
      headline: "Build outside convention",
      body: "Move toward originality, systems thinking, and work that departs from inherited methods without losing structural rigor.",
      examples: ["Designing a new technology", "Reforming an institution", "Building an open system", "Researching an unconventional approach"],
    },
    engine: {
      headline: "Work through independent systems thinking",
      body: "You work best through conceptual distance, unconventional solutions, and freedom to redesign the underlying structure.",
      examples: ["Systems design", "Technology research", "Innovation labs", "Independent strategy"],
    },
    earning: {
      headline: "Monetize structural difference",
      body: "Income grows from ideas, systems, or methods that are future-facing, independent, and meaningfully unlike the standard option.",
      examples: ["Technology products", "Systems consulting", "Research licensing", "Innovation strategy"],
    },
    arena: {
      headline: "Be recognized for originality",
      body: "Visibility grows in roles where intellectual independence, reform, and the ability to see the system differently are evident.",
      examples: ["Technology leadership", "Research leadership", "Public-interest reform", "Systems thought leadership"],
    },
  },
  Pisces: {
    direction: {
      headline: "Give form to what others only sense",
      body: "Move toward imaginative, compassionate, or symbolic work that translates subtle perception into something others can enter.",
      examples: ["Making a film", "Building a healing practice", "Creating mission-driven work", "Turning intuition into art"],
    },
    engine: {
      headline: "Work through imagination and receptivity",
      body: "You work best through intuition, image, empathy, and room to follow connections that cannot be forced linearly.",
      examples: ["Film-making", "Music production", "Therapeutic work", "Creative development"],
    },
    earning: {
      headline: "Monetize imagination and resonance",
      body: "Income grows when sensitivity, creative perception, service, or symbolic understanding is given a clear and usable container.",
      examples: ["Creative commissions", "Healing services", "Film and music work", "Mission-driven programs"],
    },
    arena: {
      headline: "Be recognized for imagination",
      body: "Visibility grows where empathy, imagination, and the ability to articulate what others feel but cannot name are valued.",
      examples: ["Artistic direction", "Film and music", "Public healing work", "Mission-driven leadership"],
    },
  },
};

const ENGINE_BY_BODY: Record<string, BodyRoleInterpretation> = {
  Sun: {
    headline: "Create through visible authorship",
    body: "Work moves when you can own the central decision and stand personally behind what is made.",
  },
  Moon: {
    headline: "Create through responsive care",
    body: "Work moves through close attention to people, timing, atmosphere, and the need emerging in the room.",
  },
  Mercury: {
    headline: "Create through language and analysis",
    body: "Work moves through explanation, writing, negotiation, comparison, and the movement of information.",
  },
  Venus: {
    headline: "Create through relationship and taste",
    body: "Work moves through attraction, proportion, collaboration, and a precise sense of what people will value.",
  },
  Mars: {
    headline: "Create through decisive execution",
    body: "Work moves through direct action, contest, momentum, and the willingness to push a task across the line.",
  },
  Jupiter: {
    headline: "Create through expansion and synthesis",
    body: "Work moves through opportunity, teaching, scale, and the ability to place details inside a larger frame.",
  },
  Saturn: {
    headline: "Create through disciplined authority",
    body: "Work moves through sustained responsibility, strong constraints, and mastery accumulated slowly enough to defend.",
  },
  Uranus: {
    headline: "Create through independent reinvention",
    body: "Work moves through disruption, autonomy, and refusal of a standard method that no longer serves the problem.",
  },
  Neptune: {
    headline: "Create through imagination and calling",
    body: "Work moves through image, intuition, service, and sensitivity to purposes that resist a simple job description.",
  },
  Pluto: {
    headline: "Create through depth and transformation",
    body: "Work moves through strategic control, concentrated attention, and the willingness to rebuild what cannot be repaired superficially.",
  },
};

const EARNING_BY_BODY: Record<string, BodyRoleInterpretation> = {
  Sun: {
    headline: "Monetize authorship",
    body: "People pay for personal judgment, leadership, identity, and work whose value depends on your visible ownership.",
  },
  Moon: {
    headline: "Monetize responsiveness",
    body: "People pay for care, timing, trust, and the ability to understand and meet a changing human need.",
  },
  Mercury: {
    headline: "Monetize clarity",
    body: "People pay for language, analysis, negotiation, information, and the ability to make complexity intelligible.",
  },
  Venus: {
    headline: "Monetize taste and relationship",
    body: "People pay for selection, design, diplomacy, attraction, and an exact understanding of perceived value.",
  },
  Mars: {
    headline: "Monetize execution",
    body: "People pay for speed, courage, competition, and the ability to turn intention into decisive movement.",
  },
  Jupiter: {
    headline: "Monetize perspective and expansion",
    body: "People pay for teaching, advice, access, opportunity, and the ability to enlarge what is possible.",
  },
  Saturn: {
    headline: "Monetize specialized judgment",
    body: "People pay for discipline, governance, durability, and authority earned through responsibility and time.",
  },
  Uranus: {
    headline: "Monetize innovation",
    body: "People pay for independence, unconventional systems, and solutions that replace an obsolete standard.",
  },
  Neptune: {
    headline: "Monetize imagination and resonance",
    body: "People pay for creative perception, empathy, image, service, and the ability to give form to subtle needs.",
  },
  Pluto: {
    headline: "Monetize depth and transformation",
    body: "People pay for high-stakes judgment, reinvention, specialist access, and control of what materially changes the outcome.",
  },
};

/** Grammatical concepts for controlled cross-force thesis templates. */
const SYNTHESIS_BY_SIGN: Record<string, SignSynthesis> = {
  Aries: {
    direction: { concept: "New ground" },
    engine: "decisive action",
    earning: "initiative",
  },
  Taurus: {
    direction: { concept: "Lasting value" },
    engine: "patient construction",
    earning: "durable craft",
  },
  Gemini: {
    direction: { concept: "Knowledge and connection" },
    engine: "language and range",
    earning: "clarity and connection",
  },
  Cancer: {
    direction: { concept: "Trust and belonging" },
    engine: "care and memory",
    earning: "trust and stewardship",
  },
  Leo: {
    direction: { concept: "Authored work" },
    engine: "authored expression",
    earning: "authorship and presence",
  },
  Virgo: {
    direction: { concept: "Precise work" },
    engine: "exacting craft",
    earning: "precision",
  },
  Libra: {
    direction: { concept: "Judgment and partnership" },
    engine: "calibrated partnership",
    earning: "judgment and relationship",
  },
  Scorpio: {
    direction: { concept: "Consequential problems" },
    engine: "depth and leverage",
    earning: "depth and leverage",
  },
  Sagittarius: {
    direction: { concept: "Wider perspective" },
    engine: "reach and synthesis",
    earning: "perspective and reach",
  },
  Capricorn: {
    direction: { concept: "Durable authority" },
    engine: "structure and endurance",
    earning: "responsibility",
  },
  Aquarius: {
    direction: { concept: "Unconventional systems" },
    engine: "independent systems thinking",
    earning: "structural difference",
  },
  Pisces: {
    direction: { concept: "Imagination made tangible" },
    engine: "imagination and receptivity",
    earning: "imagination and resonance",
  },
};

const SYNTHESIS_BY_BODY: Record<string, BodySynthesis> = {
  Sun: {
    engine: { concept: "Visible authorship", clause: "visible authorship" },
    earning: "authorship",
  },
  Moon: {
    engine: { concept: "Responsive care", clause: "responsive care" },
    earning: "responsiveness",
  },
  Mercury: {
    engine: { concept: "Language and analysis", clause: "language and analysis" },
    earning: "clarity and communication",
  },
  Venus: {
    engine: { concept: "Relationship and taste", clause: "relationship and taste" },
    earning: "taste and relationship",
  },
  Mars: {
    engine: { concept: "Decisive execution", clause: "decisive execution" },
    earning: "execution",
  },
  Jupiter: {
    engine: { concept: "Expansive synthesis", clause: "expansive synthesis" },
    earning: "perspective and expansion",
  },
  Saturn: {
    engine: { concept: "Disciplined authority", clause: "disciplined authority" },
    earning: "specialized judgment",
  },
  Uranus: {
    engine: { concept: "Independent reinvention", clause: "independent reinvention" },
    earning: "innovation",
  },
  Neptune: {
    engine: { concept: "Imagination and intuition", clause: "imagination and intuition" },
    earning: "imagination and resonance",
  },
  Pluto: {
    engine: { concept: "Depth and transformation", clause: "depth and transformation" },
    earning: "depth and transformation",
  },
};

/** Resolve authored role copy for one chart signal. */
export function careerRoleInterpretation(
  factor: CareerFactorReading,
  role: CareerSnapshotRole,
): CareerRoleInterpretation | null {
  const signCopy = factor.sign
    ? SIGN_ROLE_COPY[factor.sign]?.[role] ?? null
    : null;

  const bodyCopy = factor.body
    ? role === "engine"
      ? ENGINE_BY_BODY[factor.body] ?? null
      : role === "earning"
        ? EARNING_BY_BODY[factor.body] ?? null
        : null
    : null;

  const signSynthesis = factor.sign
    ? SYNTHESIS_BY_SIGN[factor.sign] ?? null
    : null;
  const bodySynthesis = factor.body
    ? SYNTHESIS_BY_BODY[factor.body] ?? null
    : null;

  if (role === "engine" && bodySynthesis && signSynthesis) {
    return {
      headline: `Create through ${bodySynthesis.engine.clause} with ${signSynthesis.engine}`,
      body: `You work best through ${bodySynthesis.engine.clause}, expressed through ${signSynthesis.engine}.`,
      examples: signCopy?.examples ?? [],
    };
  }

  if (role === "earning" && bodySynthesis && signSynthesis) {
    return {
      headline: `Monetize ${bodySynthesis.earning} through ${signSynthesis.earning}`,
      body: `Income grows from ${bodySynthesis.earning}, expressed through ${signSynthesis.earning}.`,
      examples: signCopy?.examples ?? [],
    };
  }

  return bodyCopy ? { ...bodyCopy, examples: [] } : signCopy;
}

export function careerSynthesisFragment(
  factor: CareerFactorReading,
  role: CareerSnapshotRole,
): CareerSynthesisFragment | null {
  if (role === "direction") {
    return factor.sign ? SYNTHESIS_BY_SIGN[factor.sign]?.direction ?? null : null;
  }

  if (role === "engine") {
    return factor.body ? SYNTHESIS_BY_BODY[factor.body]?.engine ?? null : null;
  }

  return null;
}
