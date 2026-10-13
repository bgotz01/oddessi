// lib/astrology/planet-archetypes-data.ts

/**
 * What each of the ten planets rules archetypally, before any chart, transit
 * or era is read against it. Read by the planet archetype panels (Overview,
 * Cycles) and the Framework guide, so the descriptions live in one place.
 */

export type Planet =
  | "Sun" | "Moon" | "Mercury" | "Venus" | "Mars"
  | "Jupiter" | "Saturn" | "Uranus" | "Neptune" | "Pluto";

export interface PlanetArchetype {
  name: Planet;
  tagline: string;
  house: string;
  houseDesc: string;
  keywords: string[];
  meanings: { label: string; body: string }[];
}

/**
 * The five fast, personal planets. Kept apart from the slow five because the
 * Cycles and Macro pages only ever read the slow ones; the guides on Overview
 * and Framework are the places that want all ten.
 */
export const PERSONAL_ARCHETYPES: PlanetArchetype[] = [
  {
    name: "Sun",
    tagline: "Identity, vitality, purpose, will, and self-expression.",
    house: "5th",
    houseDesc: "creativity, play, romance, and self-expression",
    keywords: ["Identity", "Vitality", "Purpose", "Will", "Expression"],
    meanings: [
      {
        label: "Core Identity",
        body: "The Sun is the centre of the chart — who you are becoming, the conscious self you grow into over a lifetime.",
      },
      {
        label: "Vitality and Will",
        body: "It rules life force, confidence, and the steady drive to direct your energy toward what matters to you.",
      },
      {
        label: "Purpose and Recognition",
        body: "It shows where you want to shine, be seen, and feel that your life means something.",
      },
    ],
  },
  {
    name: "Moon",
    tagline: "Emotion, instinct, memory, comfort, and belonging.",
    house: "4th",
    houseDesc: "home, family, roots, and inner foundations",
    keywords: ["Emotion", "Instinct", "Memory", "Comfort", "Belonging"],
    meanings: [
      {
        label: "Emotional Nature",
        body: "The Moon governs your feelings, moods, and the reactions that arrive before thought does.",
      },
      {
        label: "Needs and Security",
        body: "It shows what you need to feel safe, nourished, and at home — in a place and in yourself.",
      },
      {
        label: "Memory and the Past",
        body: "It rules habit, childhood, the mother, and the patterns you carry forward without noticing.",
      },
    ],
  },
  {
    name: "Mercury",
    tagline: "Thought, communication, learning, trade, and connection.",
    house: "3rd & 6th",
    houseDesc: "communication and learning, and of daily work and routine",
    keywords: ["Thought", "Communication", "Learning", "Trade", "Curiosity"],
    meanings: [
      {
        label: "Mind and Perception",
        body: "Mercury rules how you think, notice, sort, and make sense of what comes in.",
      },
      {
        label: "Communication",
        body: "It governs speech, writing, messages, and the way you explain yourself to others.",
      },
      {
        label: "Exchange and Movement",
        body: "It rules trade, short journeys, siblings, and the busy traffic of everyday life.",
      },
    ],
  },
  {
    name: "Venus",
    tagline: "Love, beauty, pleasure, value, and harmony.",
    house: "2nd & 7th",
    houseDesc: "money and possessions, and of partnership",
    keywords: ["Love", "Beauty", "Pleasure", "Value", "Harmony"],
    meanings: [
      {
        label: "Love and Attraction",
        body: "Venus shows what you are drawn to, how you love, and what you find beautiful in another.",
      },
      {
        label: "Values and Money",
        body: "It rules what you value, what you earn and spend, and your sense of worth.",
      },
      {
        label: "Art and Pleasure",
        body: "It governs taste, art, comfort, and the enjoyment of the senses.",
      },
    ],
  },
  {
    name: "Mars",
    tagline: "Drive, action, desire, courage, and conflict.",
    house: "1st",
    houseDesc: "the self, the body, and how you meet the world",
    keywords: ["Drive", "Action", "Desire", "Courage", "Conflict"],
    meanings: [
      {
        label: "Drive and Action",
        body: "Mars is the engine of the chart — the energy to start, push, and go after what you want.",
      },
      {
        label: "Courage and Conflict",
        body: "It rules competition, anger, self-defence, and the willingness to fight for something.",
      },
      {
        label: "Desire",
        body: "It governs physical drive, ambition, and the raw wanting behind your choices.",
      },
    ],
  },
];

/** The five slow planets — the set the Cycles and Macro pages read. */
export const SLOW_ARCHETYPES: PlanetArchetype[] = [
  {
    name: "Jupiter",
    tagline: "Expansion, exploration, opportunity, wisdom, and abundance.",
    house: "9th",
    houseDesc: "philosophy, travel, and higher mind",
    keywords: ["Expansion", "Exploration", "Opportunity", "Wisdom", "Faith"],
    meanings: [
      {
        label: "Expansion and Growth",
        body: "Jupiter magnifies everything it touches, bringing wealth, prosperity, and a desire to broaden your horizons.",
      },
      {
        label: "Higher Learning and Philosophy",
        body: "It rules higher education, deep philosophies, wisdom, law, and cross-cultural travel.",
      },
      {
        label: "Optimism and Faith",
        body: "It governs your sense of hope, luck, generosity, and trust in the universe.",
      },
      {
        label: 'The "Teacher" Energy',
        body: "It acts as a spiritual guide or mentor, helping you see the bigger picture rather than getting bogged down in the details.",
      },
    ],
  },
  {
    name: "Saturn",
    tagline: "Structure, discipline, responsibility, limitation, and maturity.",
    house: "10th",
    houseDesc: "career, public status, and authority",
    keywords: ["Structure", "Discipline", "Responsibility", "Limitation", "Maturity"],
    meanings: [
      {
        label: "Discipline and Responsibility",
        body: "Saturn demands hard work, commitment, accountability, and maturity.",
      },
      {
        label: "Boundaries and Limitations",
        body: "It sets restrictions, defines rules, and reminds you of reality and your personal limits.",
      },
      {
        label: "Karma and Time",
        body: "It is the planet of long-term timing, endurance, and reaping what you sow over decades.",
      },
      {
        label: "The Saturn Return",
        body: "A major astrological milestone happening around ages 29 and 58, marking a period of intense personal maturity, reality checks, and life restructuring.",
      },
    ],
  },
  {
    name: "Uranus",
    tagline: "Disruption, innovation, liberation, sudden change, and individuality.",
    house: "11th",
    houseDesc: "community, networks, and hopes for the future",
    keywords: ["Disruption", "Innovation", "Liberation", "Change", "Individuality"],
    meanings: [
      {
        label: "Revolution and Rebellion",
        body: "Uranus disrupts the status quo, prompting you to break free from societal expectations and outdated traditions.",
      },
      {
        label: "Sudden Change and Shocks",
        body: "It brings lightning-fast transformations, sudden epiphanies, and unexpected twists of fate.",
      },
      {
        label: "Individuality and Eccentricity",
        body: "It rules your unique quirks, original thinking, genius-level intellect, and your desire to be authentically yourself.",
      },
      {
        label: "Technology and the Future",
        body: "It governs science, invention, humanitarian efforts, and collective progress toward the future.",
      },
    ],
  },
  {
    name: "Neptune",
    tagline: "Idealization, imagination, spirituality, illusion, and dissolution.",
    house: "12th",
    houseDesc: "the hidden, the collective unconscious, and endings",
    keywords: ["Idealization", "Imagination", "Spirituality", "Illusion", "Dissolution"],
    meanings: [
      {
        label: "Spirituality and Mysticism",
        body: "It connects you to the divine, universal love, and the collective unconscious.",
      },
      {
        label: "Imagination and Arts",
        body: "It rules inspiration, poetry, music, film, photography, and dance.",
      },
      {
        label: "Illusion and Escapism",
        body: "It clouds logical thinking, leading to dreams, fantasies, or deception and addictions.",
      },
    ],
  },
  {
    name: "Pluto",
    tagline: "Transformation, power, destruction, rebirth, and regeneration.",
    house: "8th",
    houseDesc: "shared resources, intimacy, and transformation",
    keywords: ["Transformation", "Power", "Destruction", "Rebirth", "Shadow"],
    meanings: [
      {
        label: "Transformation and Rebirth",
        body: "Pluto governs cyclical change, similar to the myth of the phoenix rising from the ashes. It breaks things down completely so they can be rebuilt stronger.",
      },
      {
        label: "Power and Control",
        body: "It rules personal empowerment, shadow work, hidden motives, and the struggle between control and surrender.",
      },
      {
        label: "The Subconscious and Taboo",
        body: "It digs beneath the surface to uncover secrets, psychological truths, and things that are hidden or taboo.",
      },
      {
        label: "Generational Shifts",
        body: "Because it moves so slowly, Pluto shapes entire generations, driving massive cultural transformations, systemic collapses, and societal rebirths.",
      },
    ],
  },
];

export const ALL_ARCHETYPES: PlanetArchetype[] = [...PERSONAL_ARCHETYPES, ...SLOW_ARCHETYPES];

export function planetArchetype(name: string): PlanetArchetype | undefined {
  return ALL_ARCHETYPES.find((p) => p.name === name);
}
