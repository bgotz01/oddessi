import {
  CONTROLS,
  GENERATES,
  HIDDEN_STEMS,
  STEMS,
  type BranchIndex,
  type StemIndex,
} from "./almanac";

/**
 * 十神 — the Ten Gods.
 *
 * The grammar of the whole system. On its own a character is only an element;
 * the reading begins when it is put in relation to the Day Master, and there
 * are exactly five relations available in a five-phase cycle: it is your own
 * kind, it feeds you, you feed it, you control it, or it controls you.
 *
 * Each of those five then splits in two by polarity, which is where the count
 * of ten comes from. The split is not decoration. A relation between *opposite*
 * polarities is the orderly form of itself — earned wealth, legitimate
 * authority, orthodox support; between *like* polarities it is the same force
 * off the leash: the windfall, the raw threat, the unconventional teacher. A
 * chart under 正官 and a chart under 七殺 are both under authority, and they are
 * not living the same life.
 *
 * Three of the five pairs mark that split with 正 (proper) and 偏 (deviant) in
 * their names. Companion and Output do not — 比肩/劫財 and 食神/傷官 are named for
 * what they do — so the rule to hold is the polarity, not the character.
 *
 * Derived, never stored: everything here follows from two stems and the cycle.
 */

export type GodFamily =
  | "Companion"
  | "Output"
  | "Wealth"
  | "Authority"
  | "Resource";

export interface God {
  family: GodFamily;
  /**
   * True when this stem's polarity is *opposite* the Day Master's, which is the
   * orderly member of the pair — and, in three families of the five, the one
   * whose name begins 正.
   */
  opposedPolarity: boolean;
  han: string;
  pinyin: string;
  /** The traditional name, kept rather than translated into a job title. */
  name: string;
  /** One line: what this relation is, in the second person. */
  note: string;
}

interface Family {
  han: string;
  /** What the whole family is, before polarity splits it. */
  note: string;
  terms: string[];
  /** The member standing at the opposite polarity to the Day Master. */
  opposed: Omit<God, "family" | "opposedPolarity">;
  /** The member standing at the same polarity. */
  alike: Omit<God, "family" | "opposedPolarity">;
}

export const GOD_FAMILIES: Record<GodFamily, Family> = {
  Companion: {
    han: "比劫",
    note: "Your own element: peers, equals, rivals — everyone standing where you stand. Companions add force to the self, which helps a Day Master that is outnumbered and crowds one that is already strong.",
    terms: ["Peers", "Rivalry", "Self"],
    opposed: {
      han: "劫財",
      pinyin: "Jié Cái",
      name: "Rob Wealth",
      note: "A peer who wants what you want. Competition for the same resource, and a generosity that quietly costs you.",
    },
    alike: {
      han: "比肩",
      pinyin: "Bǐ Jiān",
      name: "Shoulder to Shoulder",
      note: "An equal at your side. Independence, self-assertion, and allies who work the way you do.",
    },
  },
  Output: {
    han: "食傷",
    note: "What you produce: expression, craft, children, anything that leaves you and stands on its own. Output drains the self to make something — which is the cost, and the point.",
    terms: ["Expression", "Craft", "Making"],
    opposed: {
      han: "傷官",
      pinyin: "Shāng Guān",
      name: "Hurting Officer",
      note: "Brilliant, unruly expression. Talent that will not be managed and has little patience for anyone's rules, including the useful ones.",
    },
    alike: {
      han: "食神",
      pinyin: "Shí Shén",
      name: "Eating God",
      note: "Production that feels like appetite rather than effort. Craft, enjoyment, and enough contentment to keep going.",
    },
  },
  Wealth: {
    han: "財",
    note: "What you control and turn into a result — money, but also assets, projects, anything you can put your hands on and shape. Wealth is worked for: it takes a Day Master with strength to spare.",
    terms: ["Results", "Assets", "Control"],
    opposed: {
      han: "正財",
      pinyin: "Zhèng Cái",
      name: "Direct Wealth",
      note: "Earned, steady, accounted for. The salary, the tended asset, the return that arrived because you did the work.",
    },
    alike: {
      han: "偏財",
      pinyin: "Piān Cái",
      name: "Indirect Wealth",
      note: "Opportunity rather than salary. Windfalls, ventures, wide circles — money that comes fast and does not stay unless made to.",
    },
  },
  Authority: {
    han: "官殺",
    note: "What controls you: rules, offices, standards, pressure. Authority is what a strong Day Master needs and what an outnumbered one is crushed by — the same force reads as discipline or as siege depending on who is carrying it.",
    terms: ["Pressure", "Standards", "Office"],
    opposed: {
      han: "正官",
      pinyin: "Zhèng Guān",
      name: "Direct Officer",
      note: "Legitimate authority, and a structure that fits. Rules you can respect, position you can hold, a reputation worth protecting.",
    },
    alike: {
      han: "七殺",
      pinyin: "Qī Shā",
      name: "Seven Killings",
      note: "Raw pressure with no manners. Danger, deadline, the demand that either forges you or breaks you — and rarely negotiates.",
    },
  },
  Resource: {
    han: "印",
    note: "What feeds you: teaching, protection, credentials, the people who back you. Resource strengthens the self, which is support when you are short and smothering when you are not.",
    terms: ["Support", "Learning", "Backing"],
    opposed: {
      han: "正印",
      pinyin: "Zhèng Yìn",
      name: "Direct Resource",
      note: "Orthodox support: the mother, the school, the qualification. Protection that arrives through proper channels.",
    },
    alike: {
      han: "偏印",
      pinyin: "Piān Yìn",
      name: "Indirect Resource",
      note: "The unconventional teacher and the sideways education. Intuition, obsession, knowledge nobody assigned you.",
    },
  },
};

/** Which of the five relations `other` stands in to the Day Master's element. */
function familyOf(dayMaster: StemIndex, other: StemIndex): GodFamily {
  const self = STEMS[dayMaster].element;
  const theirs = STEMS[other].element;

  if (self === theirs) return "Companion";
  if (GENERATES[theirs] === self) return "Resource";
  if (GENERATES[self] === theirs) return "Output";
  if (CONTROLS[self] === theirs) return "Wealth";
  return "Authority";
}

/**
 * The god one stem is to the Day Master.
 *
 * Opposite polarity gives the orderly member, like polarity the unruly one —
 * the single rule worth remembering, and the reason the Day Master's polarity
 * changes every reading on the page rather than only its element.
 */
export function godOf(dayMaster: StemIndex, other: StemIndex): God {
  const family = familyOf(dayMaster, other);
  const opposedPolarity =
    STEMS[dayMaster].polarity !== STEMS[other].polarity;
  const member = opposedPolarity
    ? GOD_FAMILIES[family].opposed
    : GOD_FAMILIES[family].alike;
  return { family, opposedPolarity, ...member };
}

/** The branch's god, read from the stem hiding at its root. */
export function godOfBranch(dayMaster: StemIndex, branch: BranchIndex): God {
  return godOf(dayMaster, HIDDEN_STEMS[branch][0].stem);
}

export interface GodShare {
  family: GodFamily;
  /** Percentage of the eight characters standing in this relation. */
  share: number;
}

/**
 * How the chart divides between the five relations, weighed exactly as the
 * elements are: each stem counts once, each branch spends its hundred on the
 * stems hidden inside it. The Day Master itself is left out — it is the thing
 * being related to, not one of the relations.
 */
export function weighGods(
  dayMaster: StemIndex,
  pillars: { stem: StemIndex; branch: BranchIndex }[],
): GodShare[] {
  const weight: Record<GodFamily, number> = {
    Companion: 0,
    Output: 0,
    Wealth: 0,
    Authority: 0,
    Resource: 0,
  };

  pillars.forEach((pillar, index) => {
    // index 2 is the day pillar, whose stem is the Day Master.
    if (index !== 2) weight[familyOf(dayMaster, pillar.stem)] += 100;
    for (const hidden of HIDDEN_STEMS[pillar.branch]) {
      weight[familyOf(dayMaster, hidden.stem)] += hidden.weight;
    }
  });

  const total = Object.values(weight).reduce((sum, w) => sum + w, 0);
  return (Object.keys(weight) as GodFamily[]).map((family) => ({
    family,
    share: total === 0 ? 0 : Math.round((weight[family] / total) * 1000) / 10,
  }));
}
