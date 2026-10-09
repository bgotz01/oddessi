// lib/astrology/macro/zodiac-framework-data.ts
// Canonical zodiac definitions — planet-agnostic.
// Change here, change everywhere.

export type ElementKey = "fire" | "earth" | "air" | "water";
export type ModalityKey = "cardinal" | "fixed" | "mutable";
export type SignKey =
  | "aries" | "taurus" | "gemini" | "cancer"
  | "leo" | "virgo" | "libra" | "scorpio"
  | "sagittarius" | "capricorn" | "aquarius" | "pisces";

export const ELEMENT_COLOR: Record<ElementKey, string> = {
  fire: "#e07a50",
  earth: "#8ebf7a",
  air: "#a8b4c0",
  water: "#7899d4",
};

export const ELEMENTS: Record<ElementKey, { theme: string }> = {
  fire: { theme: "Action" },
  earth: { theme: "Material" },
  air: { theme: "Connection" },
  water: { theme: "Integration" },
};

/**
 * How a sign operates, independent of its element. Four elements by three
 * modalities gives the twelve signs exactly once each.
 */
export const MODALITIES: Record<ModalityKey, { principle: string }> = {
  cardinal: { principle: "Initiate" },
  fixed: { principle: "Sustain" },
  mutable: { principle: "Adapt" },
};

export const MODALITY_ORDER: ModalityKey[] = ["cardinal", "fixed", "mutable"];

export interface CanonicalSign {
  glyph: string;
  label: string;       // display name
  element: ElementKey;
  domain: string;       // the sign's permanent territory
  // How this sign expresses its element's theme, so signs sharing an element
  // stay distinct (Libra: connection between two; Aquarius: among many).
  mode: string;
  // Three words under the domain, filling in what the one word compresses.
  keywords: string[];
  modality: ModalityKey;
  // Not rendered. The sign's constructive face, its excess, and what joins
  // the two — handed to the chat through page context, never drawn as cards.
  strength: string;
  shadow: string;
  development: string;
}

export const SIGNS: Record<SignKey, CanonicalSign> = {
  aries: {
    glyph: "♈", label: "Aries", element: "fire", domain: "Initiation", mode: "Action to begin", keywords: ["Courage", "Impulse", "Independence"],
    modality: "cardinal",
    strength: "Courage to go first",
    shadow: "Impatience, aggression, starting without finishing",
    development: "Initiative that stays for the follow-through",
  },
  taurus: {
    glyph: "♉", label: "Taurus", element: "earth", domain: "Stability", mode: "Material to hold", keywords: ["Patience", "Comfort", "Persistence"],
    modality: "fixed",
    strength: "Patience and steady building",
    shadow: "Stubbornness, possessiveness, inertia",
    development: "Security that can still change",
  },
  gemini: {
    glyph: "♊", label: "Gemini", element: "air", domain: "Exchange", mode: "Connection through information", keywords: ["Curiosity", "Versatility", "Communication"],
    modality: "mutable",
    strength: "A quick, curious, connecting mind",
    shadow: "Scattered, superficial, inconsistent",
    development: "Curiosity that commits to depth",
  },
  cancer: {
    glyph: "♋", label: "Cancer", element: "water", domain: "Security", mode: "Integration through care", keywords: ["Nurture", "Belonging", "Protection"],
    modality: "cardinal",
    strength: "Care and protective loyalty",
    shadow: "Moodiness, clinging, defensiveness",
    development: "Care that does not need to control",
  },
  leo: {
    glyph: "♌", label: "Leo", element: "fire", domain: "Expression", mode: "Action to express", keywords: ["Confidence", "Creativity", "Generosity"],
    modality: "fixed",
    strength: "Warmth, creativity, generous presence",
    shadow: "Vanity, need for applause, pride",
    development: "Expression that does not depend on being seen",
  },
  virgo: {
    glyph: "♍", label: "Virgo", element: "earth", domain: "Systems", mode: "Material to refine", keywords: ["Analysis", "Service", "Craft"],
    modality: "mutable",
    strength: "Skill, discernment, useful service",
    shadow: "Criticism, worry, perfectionism",
    development: "Precision in service of what matters",
  },
  libra: {
    glyph: "♎", label: "Libra", element: "air", domain: "Relationships", mode: "Connection between two", keywords: ["Balance", "Harmony", "Diplomacy"],
    modality: "cardinal",
    strength: "Fairness, grace, diplomacy",
    shadow: "Indecision, people-pleasing, conflict avoided",
    development: "Balance that includes its own needs",
  },
  scorpio: {
    glyph: "♏", label: "Scorpio", element: "water", domain: "Power", mode: "Integration through intensity", keywords: ["Depth", "Intensity", "Transformation"],
    modality: "fixed",
    strength: "Depth, focus, emotional courage",
    shadow: "Control, suspicion, vindictiveness",
    development: "Power used to transform rather than to hold",
  },
  sagittarius: {
    glyph: "♐", label: "Sagittarius", element: "fire", domain: "Expansion", mode: "Action to expand", keywords: ["Adventure", "Belief", "Freedom"],
    modality: "mutable",
    strength: "Optimism, vision, the search for meaning",
    shadow: "Overreach, dogma, restlessness",
    development: "Belief tested against experience",
  },
  capricorn: {
    glyph: "♑", label: "Capricorn", element: "earth", domain: "Structure", mode: "Material to structure", keywords: ["Ambition", "Discipline", "Mastery"],
    modality: "cardinal",
    strength: "Discipline, responsibility, long-range building",
    shadow: "Rigidity, coldness, status over substance",
    development: "Authority earned and shared",
  },
  aquarius: {
    glyph: "♒", label: "Aquarius", element: "air", domain: "Networks", mode: "Connection among many", keywords: ["Originality", "Reform", "Community"],
    modality: "fixed",
    strength: "Originality and commitment to the collective",
    shadow: "Detachment, contrarianism, aloofness",
    development: "Independence that stays connected",
  },
  pisces: {
    glyph: "♓", label: "Pisces", element: "water", domain: "Unity", mode: "Integration of everything", keywords: ["Compassion", "Imagination", "Surrender"],
    modality: "mutable",
    strength: "Compassion, imagination, spiritual openness",
    shadow: "Escapism, confusion, self-sacrifice",
    development: "Sensitivity with boundaries",
  },
};

/**
 * The six oppositions, each a single theme seen from its two ends. Defined
 * once here; a sign's opposite is read off this list rather than stored on
 * the sign, so the two can never disagree.
 */
export interface SignAxis {
  signs: [SignKey, SignKey];
  /** The two ends of the theme, in the same order as `signs`. */
  tension: [string, string];
}

export const AXES: SignAxis[] = [
  { signs: ["aries", "libra"], tension: ["Independence", "Partnership"] },
  { signs: ["taurus", "scorpio"], tension: ["Possession", "Sharing"] },
  { signs: ["gemini", "sagittarius"], tension: ["Information", "Meaning"] },
  { signs: ["cancer", "capricorn"], tension: ["Private security", "Public responsibility"] },
  { signs: ["leo", "aquarius"], tension: ["Individual expression", "Collective participation"] },
  { signs: ["virgo", "pisces"], tension: ["Precision", "Surrender"] },
];

/** The axis a sign sits on, oriented so that sign comes first. */
export function axisOf(key: SignKey): SignAxis {
  const axis = AXES.find((a) => a.signs.includes(key))!;
  return axis.signs[0] === key
    ? axis
    : { signs: [axis.signs[1], axis.signs[0]], tension: [axis.tension[1], axis.tension[0]] };
}

/** Canonical sign order */
export const SIGN_ORDER: SignKey[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

/**
 * A sign by its display name ("Aries"), as charts and the house tables spell
 * it. Lets those pages borrow the canonical domain word instead of keeping
 * their own.
 */
export function signByLabel(label: string): CanonicalSign | undefined {
  return SIGNS[label.toLowerCase() as SignKey];
}

/** Signs grouped by element, in zodiac order */
export const SIGNS_BY_ELEMENT: Record<ElementKey, SignKey[]> = {
  fire: ["aries", "leo", "sagittarius"],
  earth: ["taurus", "virgo", "capricorn"],
  air: ["gemini", "libra", "aquarius"],
  water: ["cancer", "scorpio", "pisces"],
};

// ─── Planet framework type ────────────────────────────────────────────────────

export interface PlanetFramework {
  planet: string;
  principle: string;
  color: string;
  signs: Record<SignKey, { description: string }>;
}

// ─── Outer planet frameworks ──────────────────────────────────────────────────

export const URANUS_FRAMEWORK: PlanetFramework = {
  planet: "Uranus",
  principle: "Disruption",
  color: "#55b8f5",

  signs: {
    aries: { description: "New paths bypass established routes into the world." },
    taurus: { description: "Physical infrastructure and ownership models are overturned." },
    gemini: { description: "How information moves between minds and machines is remade." },
    cancer: { description: "What constitutes home, memory, and belonging is destabilized." },
    leo: { description: "New tools for creation and display emerge suddenly." },
    virgo: { description: "Process, craft, and operational method are restructured." },
    libra: { description: "How connection and agreement are formed changes." },
    scorpio: { description: "Concentrated control is broken open or radically compressed." },
    sagittarius: { description: "The mechanisms of reach, adoption, and belief are overturned." },
    capricorn: { description: "Institutions and standards are rebuilt from first principles." },
    aquarius: { description: "The architecture of collective participation is reinvented." },
    pisces: { description: "The boundaries between experience, identity, and medium collapse." },
  },
};

export const NEPTUNE_FRAMEWORK: PlanetFramework = {
  planet: "Neptune",
  principle: "Dream",
  color: "#7b8fe0",

  signs: {
    aries: { description: "Action becomes mythologized; the hero-pioneer archetype dominates." },
    taurus: { description: "Beauty, comfort, and value are aestheticized; ownership becomes aspiration." },
    gemini: { description: "Information becomes story; the medium blurs fact and fantasy." },
    cancer: { description: "Nostalgia saturates culture; home and belonging become romantic ideals." },
    leo: { description: "Celebrity and spectacle intensify; individual stardom becomes transcendent myth." },
    virgo: { description: "Craft and purity become spiritual; refinement turns to perfectionism." },
    libra: { description: "Relationships are idealized; partners become projections of perfection." },
    scorpio: { description: "Obsession, mysticism, and taboo intensify; depth becomes the source of meaning." },
    sagittarius: { description: "Belief systems dissolve borders; spiritual and philosophical movements spread." },
    capricorn: { description: "Institutions are mythologized; the state and tradition become sacred." },
    aquarius: { description: "Collective visions and utopian ideals form; the group becomes a spiritual force." },
    pisces: { description: "Boundaries between self and world dissolve; transcendence and surrender define the era." },
  },
};

export const PLUTO_FRAMEWORK: PlanetFramework = {
  planet: "Pluto",
  principle: "Transformation",
  color: "#c44060",

  signs: {
    aries: { description: "Individual will and the nature of agency are remade at the root." },
    taurus: { description: "Wealth, land, and material resources undergo deep structural change." },
    gemini: { description: "The nature of knowledge, language, and media are fundamentally remade." },
    cancer: { description: "Family structure, national identity, and the idea of home are uprooted." },
    leo: { description: "Power over narrative and spectacle is concentrated, then broken open." },
    virgo: { description: "Labor, health, and institutional process are dismantled and rebuilt." },
    libra: { description: "Power in partnership, law, and social contract is fundamentally renegotiated." },
    scorpio: { description: "The mechanisms of control, sexuality, and hidden capital are exposed and restructured." },
    sagittarius: { description: "Belief systems, religion, and the engines of globalization are uprooted." },
    capricorn: { description: "Governments, corporations, and the foundations of authority are broken down and rebuilt." },
    aquarius: { description: "Collective power, technology, and the basis of human organization are remade." },
    pisces: { description: "The unconscious, spirituality, and the boundaries of self are restructured at depth." },
  },
};
