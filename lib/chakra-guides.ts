/** lib/chakra-guides.ts
 * A signs → remedies guide for each chakra: patterns popular chakra practice
 * associates with an imbalanced centre, then the foods and practices it
 * associates with strengthening it.
 *
 * Kept apart from lib/chakras.ts on purpose. That file is the interpretive
 * model; this one is practice, and practice is where the framework is most
 * easily mistaken for medicine. Nothing here is a diagnosis or a treatment:
 * the signs are interpretive associations, the foods are colour-and-element
 * correspondences from modern Western chakra writing, and the practices are
 * ordinary, low-risk ones.
 *
 * Physical signs are written as patterns of posture, movement and attention —
 * never as symptoms. Fatigue, chest tightness, sleep changes and the like
 * have ordinary medical explanations and are deliberately absent.
 *
 * Signs come in three kinds, and each practice says which kinds it `suits`.
 * That is the whole of the matching: the drawer brings forward practices
 * whose kinds the reader has marked. It never scores the marks, and a match
 * is a suggestion, not a remedy for the sign.
 */

export type SignKind = "physical" | "emotional" | "behavioral";

export interface GuidePractice {
  name: string;
  /** How long, or how often — shown as secondary metadata. */
  duration: string;
  category: string;
  detail: string;
  /** The kinds of sign this practice is suggested for. */
  suits: SignKind[];
}

export interface GuideFood {
  group: string;
  examples: string;
}

export interface ChakraGuide {
  /** Chakra number, 1–7. */
  number: number;
  /** What strengthening this centre builds, for the step headings. */
  focus: string;
  signs: Record<SignKind, string[]>;
  foods: GuideFood[];
  practices: GuidePractice[];
}

export const GUIDE_DISCLAIMER =
  "These are interpretive associations within the chakra framework, not " +
  "medically validated signs. If physical or emotional symptoms persist, " +
  "speak to a doctor or therapist.";

export const SIGN_KINDS: { key: SignKind; label: string; gloss: string }[] = [
  { key: "physical", label: "Physical", gloss: "Posture, movement and attention to the body" },
  { key: "emotional", label: "Emotional", gloss: "Feelings, fears and reactions" },
  { key: "behavioral", label: "Behavioural", gloss: "Habits, decisions and actions" },
];

export const CHAKRA_GUIDES: ChakraGuide[] = [
  {
    number: 1,
    focus: "grounding",
    signs: {
      physical: [
        "Restless, hard to sit still",
        "Holding tension in the body",
        "Out of touch with bodily sensations",
      ],
      emotional: [
        "Insecure or fearful",
        "Worried about money or shelter",
        "Unsettled, never quite at home",
      ],
      behavioral: [
        "Can't keep routines",
        "Frequent changes of place or plan",
        "Avoids practical responsibilities",
      ],
    },
    foods: [
      { group: "Root vegetables", examples: "Potatoes, carrots, beets" },
      { group: "Protein-rich foods", examples: "Beans, lentils, eggs" },
      { group: "Whole grains", examples: "Oats, brown rice" },
    ],
    practices: [
      {
        name: "Mindful walking",
        duration: "15–30 min",
        category: "Movement",
        detail:
          "Walk slowly, outdoors if you can, and notice the contact between your feet and the ground.",
        suits: ["physical", "emotional"],
      },
      {
        name: "Standing poses",
        duration: "5–10 min",
        category: "Movement",
        detail:
          "Mountain Pose, then Warrior I and II, each held for five slow breaths a side. Feel your weight through the feet.",
        suits: ["physical"],
      },
      {
        name: "Grounding meditation",
        duration: "10 min",
        category: "Stillness",
        detail:
          "Sit with feet flat on the floor. Rest attention on the points of contact, and return there whenever worry pulls you away.",
        suits: ["emotional"],
      },
      {
        name: "Establishing routines",
        duration: "Daily",
        category: "Lifestyle",
        detail:
          "Choose consistent times for sleeping, eating and one essential task, and keep them for a week.",
        suits: ["behavioral", "emotional"],
      },
    ],
  },
  {
    number: 2,
    focus: "flow and pleasure",
    signs: {
      physical: [
        "Numb to physical sensation",
        "Holding the hips stiffly",
        "Little interest in touch or movement",
      ],
      emotional: [
        "Emotionally flat",
        "Ashamed of wanting",
        "Little joy in pleasure",
      ],
      behavioral: [
        "Avoids play",
        "Keeps rigidly to habit",
        "Withdraws from intimacy",
      ],
    },
    foods: [
      { group: "Orange foods", examples: "Oranges, mango, sweet potato" },
      { group: "Healthy fats", examples: "Nuts, seeds, coconut" },
      { group: "Hydrating foods", examples: "Melon, cucumber, water" },
    ],
    practices: [
      {
        name: "Hip-opening poses",
        duration: "10 min",
        category: "Movement",
        detail:
          "Bound Angle, Low Lunge and Pigeon, a minute or two each side. Let sensation lead rather than reaching for depth.",
        suits: ["physical"],
      },
      {
        name: "Free movement",
        duration: "10 min",
        category: "Movement",
        detail:
          "Put on music you like and move however feels good, alone, with no steps to get right.",
        suits: ["physical", "emotional"],
      },
      {
        name: "Feeling check-in",
        duration: "5 min, twice a day",
        category: "Reflection",
        detail:
          "Name what you are feeling and where you feel it, without trying to change it.",
        suits: ["emotional"],
      },
      {
        name: "Unplanned play",
        duration: "Weekly",
        category: "Lifestyle",
        detail:
          "Set aside an hour for something done purely for enjoyment — cook without a recipe, draw, swim.",
        suits: ["behavioral", "emotional"],
      },
    ],
  },
  {
    number: 3,
    focus: "confidence",
    signs: {
      physical: [
        "Slumped, collapsed posture",
        "Holds the breath under pressure",
        "Moves hesitantly",
      ],
      emotional: ["Low self-esteem", "Shame", "Feeling powerless"],
      behavioral: [
        "Procrastinates",
        "Lets others make decisions",
        "Can't say no",
      ],
    },
    foods: [
      { group: "Yellow foods", examples: "Bananas, corn, yellow peppers" },
      { group: "Complex carbohydrates", examples: "Quinoa, oats, brown rice" },
      { group: "Warming spices", examples: "Ginger, turmeric, cumin" },
    ],
    practices: [
      {
        name: "Core strengthening",
        duration: "10 min",
        category: "Movement",
        detail:
          "Plank for 20–30 seconds, then Boat Pose for five breaths. Repeat three times.",
        suits: ["physical"],
      },
      {
        name: "Standing tall",
        duration: "2 min",
        category: "Stillness",
        detail:
          "Feet apart, shoulders back, hands on hips. Take ten slow breaths into the belly.",
        suits: ["physical", "emotional"],
      },
      {
        name: "One small goal",
        duration: "Daily",
        category: "Lifestyle",
        detail:
          "Each morning choose one achievable task, and finish it before evening.",
        suits: ["behavioral", "emotional"],
      },
      {
        name: "Practising no",
        duration: "Daily",
        category: "Lifestyle",
        detail:
          "Decline one small request you would otherwise accept out of habit.",
        suits: ["behavioral"],
      },
    ],
  },
  {
    number: 4,
    focus: "connection",
    signs: {
      physical: [
        "Shoulders rounded forward",
        "Arms folded, closed posture",
        "Uneasy with touch or hugs",
      ],
      emotional: [
        "Lonely",
        "Lingering grief or resentment",
        "Hard to trust",
      ],
      behavioral: [
        "Withdraws from others",
        "Turns down help or gifts",
        "Keeps people at a distance",
      ],
    },
    foods: [
      { group: "Leafy greens", examples: "Spinach, kale, chard" },
      { group: "Green vegetables", examples: "Broccoli, peas, courgette" },
      { group: "Green herbs and tea", examples: "Basil, mint, green tea" },
    ],
    practices: [
      {
        name: "Chest-opening poses",
        duration: "5–10 min",
        category: "Movement",
        detail:
          "Cobra and Bridge, five slow breaths each, three rounds. Let the shoulders draw back.",
        suits: ["physical"],
      },
      {
        name: "Loving-kindness meditation",
        duration: "10 min",
        category: "Stillness",
        detail:
          "Silently wish well to yourself, someone close, and someone difficult — a few minutes each.",
        suits: ["emotional"],
      },
      {
        name: "Reaching out",
        duration: "Daily",
        category: "Connection",
        detail: "Message or call one person you have been meaning to contact.",
        suits: ["behavioral", "emotional"],
      },
      {
        name: "Receiving",
        duration: "Ongoing",
        category: "Lifestyle",
        detail:
          "When someone offers help or a compliment, accept it with a simple thank you.",
        suits: ["behavioral"],
      },
    ],
  },
  {
    number: 5,
    focus: "expression",
    signs: {
      physical: [
        "Clenched jaw",
        "Quiet or held-back voice",
        "Stiff neck and shoulders",
      ],
      emotional: [
        "Afraid to speak up",
        "Feeling unheard",
        "Anxious before conversations",
      ],
      behavioral: [
        "Swallows opinions",
        "Says yes when meaning no",
        "Avoids conflict",
      ],
    },
    foods: [
      { group: "Blue and purple fruit", examples: "Blueberries, blackberries, plums" },
      { group: "Soothing liquids", examples: "Herbal tea, broth, warm water and honey" },
      { group: "Juicy fruit", examples: "Pears, apples, peaches" },
    ],
    practices: [
      {
        name: "Singing or humming",
        duration: "5–10 min",
        category: "Expression",
        detail:
          "Sing along to music, or hum the seed syllable Ham on long out-breaths.",
        suits: ["physical", "emotional"],
      },
      {
        name: "Neck and jaw release",
        duration: "5 min",
        category: "Movement",
        detail:
          "Slow neck rolls and Cat–Cow, then gently open and close the jaw ten times.",
        suits: ["physical"],
      },
      {
        name: "Free writing",
        duration: "10 min",
        category: "Expression",
        detail:
          "Write without stopping or editing, then read one sentence of it aloud.",
        suits: ["emotional"],
      },
      {
        name: "One honest sentence",
        duration: "Daily",
        category: "Lifestyle",
        detail:
          "Say one true thing you would usually keep to yourself, kindly and plainly.",
        suits: ["behavioral", "emotional"],
      },
    ],
  },
  {
    number: 6,
    focus: "insight",
    signs: {
      physical: [
        "Furrowed brow while thinking",
        "Restless, darting gaze",
        "Rarely remembers dreams",
      ],
      emotional: [
        "Directionless",
        "Distrusts own intuition",
        "Uneasy with ambiguity",
      ],
      behavioral: [
        "Relies on others' opinions",
        "Repeats the same choices",
        "Fills every quiet moment with input",
      ],
    },
    foods: [
      { group: "Purple foods", examples: "Red grapes, aubergine, red cabbage" },
      { group: "Omega-3 sources", examples: "Walnuts, flaxseed, oily fish" },
      { group: "Dark chocolate", examples: "70% cocoa or higher, in moderation" },
    ],
    practices: [
      {
        name: "Candle gazing",
        duration: "5–10 min",
        category: "Stillness",
        detail:
          "Rest your gaze softly on a candle flame. When the eyes tire, close them and watch the afterimage.",
        suits: ["physical", "emotional"],
      },
      {
        name: "Child's Pose",
        duration: "3–5 min",
        category: "Movement",
        detail: "Rest the forehead on the floor or a block and breathe slowly.",
        suits: ["physical"],
      },
      {
        name: "Dream journal",
        duration: "Daily, on waking",
        category: "Reflection",
        detail:
          "Before reaching for your phone, write down whatever you remember.",
        suits: ["emotional", "physical"],
      },
      {
        name: "Input-free time",
        duration: "20 min",
        category: "Lifestyle",
        detail:
          "A walk or a sit with no screen, podcast or music. Notice what your mind turns to.",
        suits: ["behavioral", "emotional"],
      },
    ],
  },
  {
    number: 7,
    focus: "connection to something larger",
    signs: {
      physical: [
        "Restless in stillness",
        "Rarely pauses during the day",
        "Hard to settle into rest",
      ],
      emotional: [
        "Life feels meaningless",
        "Cynical",
        "Cut off from anything larger",
      ],
      behavioral: [
        "Constantly busy",
        "Avoids big questions",
        "Focused only on the material",
      ],
    },
    foods: [
      { group: "Light, simple meals", examples: "Fresh fruit, vegetables, soups" },
      { group: "Calming herbal teas", examples: "Chamomile, lavender, lemon balm" },
      { group: "Clean water", examples: "Drunk slowly and attentively" },
    ],
    practices: [
      {
        name: "Silent meditation",
        duration: "10–20 min",
        category: "Stillness",
        detail: "Sit without a technique and simply notice awareness itself.",
        suits: ["physical", "emotional"],
      },
      {
        name: "Corpse Pose",
        duration: "10 min",
        category: "Rest",
        detail:
          "Lie still at the end of the day and let the body go completely.",
        suits: ["physical"],
      },
      {
        name: "Contemplation",
        duration: "15 min",
        category: "Reflection",
        detail:
          "Sit with one large question — what matters, what connects you to others — and write what comes.",
        suits: ["emotional", "behavioral"],
      },
      {
        name: "Time in silence",
        duration: "Weekly",
        category: "Lifestyle",
        detail:
          "An hour without speech, media or input, ideally outdoors.",
        suits: ["behavioral"],
      },
    ],
  },
];

export const guideFor = (n: number) => CHAKRA_GUIDES.find((g) => g.number === n);
