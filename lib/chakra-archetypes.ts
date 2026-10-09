/** lib/chakra-archetypes.ts
 * Archetypes of imbalance between chakras: what a life looks like when one
 * centre runs strong and another weak.
 *
 * Each is defined only by which centres are strong and which weak, by
 * number. The pattern line, the colours and the figure on the card are all
 * read from that, so an archetype cannot drift from the centres it names.
 *
 * These are interpretive patterns, not types a person is. Most lives show
 * several at different times, and none is a finding about anyone.
 */

export interface ChakraArchetype {
  name: string;
  /** "X without Y" — what is present, and what is missing. */
  pattern: string;
  /** Chakra numbers running strong. */
  strong: number[];
  /** Chakra numbers running weak. */
  weak: number[];
  dynamic: string;
}

export const ARCHETYPE_NOTE =
  "Interpretive patterns, not types a person is. Most lives show several at " +
  "different times.";

export const CHAKRA_ARCHETYPES: ChakraArchetype[] = [
  {
    name: "The Dreamer",
    pattern: "Desire without action",
    strong: [2],
    weak: [3],
    dynamic: "Wants things but struggles to act.",
  },
  {
    name: "The Striver",
    pattern: "Action without desire",
    strong: [3],
    weak: [2],
    dynamic: "Highly driven but disconnected from enjoyment.",
  },
  {
    name: "The Giver",
    pattern: "Love without boundaries",
    strong: [4],
    weak: [3],
    dynamic: "Connects deeply but loses themselves.",
  },
  {
    name: "The Silent Seer",
    pattern: "Insight without expression",
    strong: [6],
    weak: [5],
    dynamic: "Sees clearly but struggles to communicate it.",
  },
  {
    name: "The Broadcaster",
    pattern: "Expression without insight",
    strong: [5],
    weak: [6],
    dynamic: "Expresses readily without enough reflection.",
  },
  {
    name: "The Mystic",
    pattern: "Vision without grounding",
    strong: [6, 7],
    weak: [1],
    dynamic: "Rich inner and spiritual life, weak practical foundation.",
  },
  {
    name: "The Realist",
    pattern: "Grounding without openness",
    strong: [1],
    weak: [6, 7],
    dynamic: "Stable and practical but closed to abstraction or transcendence.",
  },
  {
    name: "The Ascetic",
    pattern: "Meaning without embodiment",
    strong: [7],
    weak: [1],
    dynamic: "Oriented toward transcendence while neglecting ordinary life.",
  },
  {
    name: "The Settler",
    pattern: "Security without desire",
    strong: [1],
    weak: [2],
    dynamic: "Life is stable but lacks vitality and wanting.",
  },
  {
    name: "The Hedonist",
    pattern: "Desire without connection",
    strong: [2],
    weak: [4],
    dynamic: "Pursues pleasure without deeper attachment.",
  },
  {
    name: "The Withholder",
    pattern: "Connection without expression",
    strong: [4],
    weak: [5],
    dynamic: "Feels deeply but doesn't communicate it.",
  },
  {
    name: "The Controller",
    pattern: "Will without heart",
    strong: [3],
    weak: [4],
    dynamic: "Strong direction with weak relational sensitivity.",
  },
];
