/** lib/chakras.ts
 * The seven chakras of the modern Western system, root to crown.
 *
 * Three layers live in each record, and they should not be confused. Name,
 * place, element, seed syllable and petal count are drawn from the tantric
 * tradition the seven-chakra scheme is usually traced to — the
 * Ṣaṭ-cakra-nirūpaṇa (1577), as Woodroffe translated it in The Serpent Power
 * (1919) — not checked line by line against that one text. The rainbow colours
 * are a twentieth-century Western addition. The interpretation — theme,
 * question, function and the three expressions — is psychological, after
 * Anodea Judith's deficient / excessive scheme (Wheels of Life, 1987), and is
 * Oddessi's reading rather than the tradition's.
 *
 * There is deliberately no body field. Mapping centres onto organs reads as a
 * claim about anatomy and health, which this page does not make; the location
 * is the only bodily fact kept, and it is the tradition's.
 *
 * Read in order, the questions make a single vertical model of experience:
 * I exist safely → I want → I act → I connect → I express → I understand →
 * I transcend. Each centre is one function, and the three expressions are how
 * that function shows — too little, in proportion, too much.
 *
 * Neighbours are kept apart by what they do, not by mood: root is safety and
 * solar plexus is agency; sacral is wanting and heart is bonding; the third
 * eye is understanding and the crown is transcendence.
 */

export interface Chakra {
  /** 1 at the base of the spine, 7 at the crown. */
  number: number;
  /** The common English name. */
  name: string;
  /** IAST transliteration. */
  sanskrit: string;
  /** What the Sanskrit name means. */
  meaning: string;

  // Traditional
  location: string;
  /**
   * The five gross elements for the first five centres. For the last two the
   * value is an interpretive label, not an element in the same sense — the
   * tradition places them beyond the elements — so the drawer calls those
   * a principle. See `isElemental`.
   */
  element: string;
  /** The seed syllable, in Devanagari and in Latin letters. */
  bija: { glyph: string; latin: string } | null;
  petals: number;

  // Modern
  /** The modern rainbow colour, by name. */
  colour: string;
  /**
   * That colour as pigment, for accents. Pitched to sit with patina and ember
   * — muted, at roughly one lightness — rather than as a spectrum, so seven
   * hues read as a family on the void instead of a stage light.
   */
  hue: string;

  // Interpretation
  /** Two concepts, like the house titles. */
  theme: string;
  /** The question the centre asks, first person. */
  question: string;
  /** What the centre does, as one sentence. */
  function: string;
  description: string;

  // Expression — deficient ← balanced → excessive
  balanced: string[];
  deficient: string[];
  excessive: string[];
}

export const CHAKRAS: Chakra[] = [
  {
    number: 1,
    name: "Root",
    sanskrit: "Mūlādhāra",
    meaning: "Root support",
    location: "Base of the spine",
    element: "Earth",
    bija: { glyph: "लं", latin: "Lam" },
    petals: 4,
    colour: "Red",
    hue: "#c4594a",
    theme: "Security & Grounding",
    question: "Am I safe?",
    function: "Establishes safety and stability.",
    description:
      "The foundation. It holds the sense of having enough ground to stand on: shelter, food, money, a place among people. Everything above it builds on whether this one feels secure.",
    balanced: [
      "Feels safe and grounded",
      "Keeps steady routines",
      "Present and settled",
    ],
    deficient: [
      "Anxious about money or shelter",
      "Restless, unable to settle",
      "Ungrounded, lives in the head",
    ],
    excessive: [
      "Clings to possessions",
      "Rigid about security",
      "Resists all change",
    ],
  },
  {
    number: 2,
    name: "Sacral",
    sanskrit: "Svādhiṣṭhāna",
    meaning: "One's own seat",
    location: "Lower abdomen, below the navel",
    element: "Water",
    bija: { glyph: "वं", latin: "Vam" },
    petals: 6,
    colour: "Orange",
    hue: "#cc8247",
    theme: "Desire & Pleasure",
    question: "What do I want?",
    function: "Experiences desire, pleasure, and emotion.",
    description:
      "Where wanting lives. It governs appetite, sensuality and the flow of feeling, and the creative urge that comes from enjoying something rather than needing it.",
    balanced: [
      "Enjoys pleasure without guilt",
      "Feels emotions and lets them pass",
      "Plays and creates",
    ],
    deficient: [
      "Numb, flat",
      "Ashamed of wanting",
      "Difficulty experiencing pleasure",
    ],
    excessive: [
      "Compulsive appetites",
      "Flooded by emotion",
      "Seeks pleasure as escape",
    ],
  },
  {
    number: 3,
    name: "Solar Plexus",
    sanskrit: "Maṇipūra",
    meaning: "City of jewels",
    location: "Upper abdomen, above the navel",
    element: "Fire",
    bija: { glyph: "रं", latin: "Ram" },
    petals: 10,
    colour: "Yellow",
    hue: "#cdb55f",
    theme: "Will & Power",
    question: "What will I do?",
    function: "Turns desire into directed action.",
    description:
      "The engine. It turns wanting into doing and holds the sense of being the one who decides. Confidence, discipline and the capacity to say no all draw on it.",
    balanced: [
      "Decisive",
      "Confident",
      "Healthy boundaries",
    ],
    deficient: [
      "Passive",
      "Indecisive",
      "Waits for permission",
    ],
    excessive: [
      "Controlling",
      "Dominating",
      "Pushes beyond limits",
    ],
  },
  {
    number: 4,
    name: "Heart",
    sanskrit: "Anāhata",
    meaning: "Unstruck",
    location: "Centre of the chest",
    element: "Air",
    bija: { glyph: "यं", latin: "Yam" },
    petals: 12,
    colour: "Green",
    hue: "#72ac6e",
    theme: "Love & Connection",
    question: "How do I connect?",
    function: "Forms bonds while preserving the self.",
    description:
      "The capacity to form meaningful bonds — to love, befriend and be loved — while remaining yourself within them. It is also the bridge between the three lower centres, which are about the self, and the three upper ones, which reach beyond it. The name refers to a sound made without two things striking.",
    balanced: [
      "Gives and receives freely",
      "Allows closeness",
      "Maintains individuality",
    ],
    deficient: [
      "Guarded",
      "Isolated",
      "Unable to receive",
    ],
    excessive: [
      "Codependent",
      "Over-giving",
      "Loses the self in others",
    ],
  },
  {
    number: 5,
    name: "Throat",
    sanskrit: "Viśuddha",
    meaning: "Especially pure",
    location: "Throat",
    element: "Ether",
    bija: { glyph: "हं", latin: "Ham" },
    petals: 16,
    colour: "Blue",
    hue: "#5b95c4",
    theme: "Expression & Truth",
    question: "How do I express myself?",
    function: "Expresses inner experience.",
    description:
      "Where the inner life becomes speech. It governs saying what is true, listening as well as talking, and making things that carry meaning to others.",
    balanced: [
      "Speaks honestly",
      "Listens well",
      "Expresses clearly",
    ],
    deficient: [
      "Swallows words",
      "Afraid to speak",
      "Says what others want to hear",
    ],
    excessive: [
      "Talks over others",
      "Can't stop talking",
      "Overshares",
    ],
  },
  {
    number: 6,
    name: "Third Eye",
    sanskrit: "Ājñā",
    meaning: "Command, perception",
    location: "Between the eyebrows",
    element: "Mind",
    bija: { glyph: "ॐ", latin: "Om" },
    petals: 2,
    colour: "Indigo",
    hue: "#7478c8",
    theme: "Insight & Perception",
    question: "What do I see?",
    function: "Perceives patterns and meaning.",
    description:
      "The seat of understanding: seeing the world clearly, recognising the patterns in it, and telling a true perception from a projection. Its two petals are often read as the two halves of the mind brought to one point.",
    balanced: [
      "Trusts intuition and checks it",
      "Sees patterns",
      "Distinguishes insight from projection",
    ],
    deficient: [
      "Struggles to see alternatives",
      "Fixed beliefs",
      "No inner compass",
    ],
    excessive: [
      "Lost in fantasy",
      "Sees signs in everything",
      "Mistakes projection for insight",
    ],
  },
  {
    number: 7,
    name: "Crown",
    sanskrit: "Sahasrāra",
    meaning: "Thousand-petalled",
    location: "Top of the head",
    element: "Transcendent",
    bija: null,
    petals: 1000,
    colour: "Violet",
    hue: "#a27bc6",
    theme: "Meaning & Transcendence",
    question: "What is beyond me?",
    function: "Seeks unity and transcendent meaning.",
    description:
      "Less a centre than an opening. Where the third eye understands the world, the crown experiences connection to what lies beyond the individual self. In the tantric texts it sits just above the head, where the rising energy ends in union; its thousand petals stand for the uncountable.",
    balanced: [
      "Sense of unity",
      "Senses meaning",
      "Open to the unknown",
    ],
    deficient: [
      "Cynical",
      "Nothing seems to matter",
      "Closed to what can't be measured",
    ],
    excessive: [
      "Spiritual bypassing",
      "Detached from body and life",
      "Lost in abstraction",
    ],
  },
];

/** Earth, water, fire, air, ether — the third eye and crown lie beyond them. */
export const isElemental = (c: Chakra) => c.number <= 5;

export const CHAKRA_PROVENANCE =
  "The traditional attributes — name, place, element, seed syllable, petals — are " +
  "drawn from the tradition of the Ṣaṭ-cakra-nirūpaṇa (1577). The rainbow colours are a modern Western addition, and the " +
  "psychological reading follows Anodea Judith (1987).";
