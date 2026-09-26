// lib/astrology/macro/zodiac-framework-data.ts
// Canonical zodiac definitions — planet-agnostic.
// Change here, change everywhere.

export type ElementKey = "fire" | "earth" | "air" | "water";
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

export interface CanonicalSign {
  glyph: string;
  label: string;       // display name
  element: ElementKey;
  domain: string;       // the sign's permanent territory
  // How this sign expresses its element's theme, so signs sharing an element
  // stay distinct (Libra: connection between two; Aquarius: among many).
  mode: string;
}

export const SIGNS: Record<SignKey, CanonicalSign> = {
  aries: { glyph: "♈", label: "Aries", element: "fire", domain: "Initiation", mode: "Action to begin" },
  taurus: { glyph: "♉", label: "Taurus", element: "earth", domain: "Stability", mode: "Material to hold" },
  gemini: { glyph: "♊", label: "Gemini", element: "air", domain: "Exchange", mode: "Connection through information" },
  cancer: { glyph: "♋", label: "Cancer", element: "water", domain: "Security", mode: "Integration through care" },
  leo: { glyph: "♌", label: "Leo", element: "fire", domain: "Expression", mode: "Action to express" },
  virgo: { glyph: "♍", label: "Virgo", element: "earth", domain: "Systems", mode: "Material to refine" },
  libra: { glyph: "♎", label: "Libra", element: "air", domain: "Relationships", mode: "Connection between two" },
  scorpio: { glyph: "♏", label: "Scorpio", element: "water", domain: "Power", mode: "Integration through intensity" },
  sagittarius: { glyph: "♐", label: "Sagittarius", element: "fire", domain: "Expansion", mode: "Action to expand" },
  capricorn: { glyph: "♑", label: "Capricorn", element: "earth", domain: "Structure", mode: "Material to structure" },
  aquarius: { glyph: "♒", label: "Aquarius", element: "air", domain: "Networks", mode: "Connection among many" },
  pisces: { glyph: "♓", label: "Pisces", element: "water", domain: "Unity", mode: "Integration of everything" },
};

/** Canonical sign order */
export const SIGN_ORDER: SignKey[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

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
