// lib/astrology/macro/neptune-eras-data.ts

import { SIGNS } from "./zodiac-framework-data";

export type NeptuneEraElement = "earth" | "air" | "water" | "fire";
export type NeptuneEraStatus = "completed" | "active" | "upcoming";

export interface NeptuneEraTrigger {
  date: string;
  label: string;
  unlocks: string;
}

export interface NeptuneEra {
  sign: string;
  glyph: string;
  house: number;
  years: string;
  startYear: number;
  endYear: number;
  domain: string;
  ideal: string;
  // Cultural expressions of the ideal, across unrelated domains.
  manifestations: string[];
  archetype: string;
  archetypeNote: string;
  idealNote: string;
  majorEvent: {
    date: string;
    label: string;
  };
  // The opening: what makes the ideal possible.
  trigger: NeptuneEraTrigger;
  // Two-phase model: the ideal (dream) holds until an inflection makes its
  // contradiction visible; the disillusionment is what society learns about
  // the ideal. Both are absent until the evidence identifies them.
  inflection?: { year: number; date: string; label: string };
  disillusionment?: string;
  mantra: string;
  element: NeptuneEraElement;
  status: NeptuneEraStatus;
  expanded: string;
  question: string;
}

export const NEPTUNE_ERAS = [
  {
    sign: "Libra",
    glyph: "♎",
    house: 7,
    years: "~1942–1956",
    startYear: 1942,
    endYear: 1956,
    domain: SIGNS.libra.domain,
    ideal: "Shared order",
    manifestations: [
      "The United Nations",
      "Bretton Woods",
      "Universal human rights",
      "International diplomacy",
      "Postwar alliances",
      "The idealized nuclear family",
    ],
    archetype: "The Diplomat",
    archetypeNote: "The broker of a workable peace. Legitimacy comes from creating an order that opposing sides can recognize and enter.",
    question: "How do we live together?",
    idealNote: "Neptune idealizes relationships in Libra. After rupture, the collective dream becomes a shared order: a way for opposing sides to live together under mutually recognized rules.",
    majorEvent: { date: "1945 onward", label: "Post-WWII order" },
    trigger: {
      date: "1944–45",
      label: "Bretton Woods / UN",
      unlocks: "Negotiated international order",
    },
    inflection: { year: 1950, date: "1950", label: "Korean War" },
    disillusionment: "Shared order becomes divided order",
    mantra: "I want to build a shared order.",
    element: "air",
    status: "completed" as const,
    expanded: `
      This era opens inside global war and closes in the architecture built to prevent its return. The symbolic emphasis is not simply peace, but negotiated order: institutions whose authority comes from agreement among parties.

      The United Nations, Bretton Woods system, human-rights language, and postwar alliance structure all turn relationship into infrastructure. Even domestic culture projects an intensely curated image of partnership and social harmony.

      Neptune idealizes the Libran settlement. The promise is that a sufficiently elegant agreement can contain conflict — while the danger is that the image of balance can conceal who still carries the cost.
    `,
  },

  {
    sign: "Scorpio",
    glyph: "♏",
    house: 8,
    years: "~1956–1970",
    startYear: 1956,
    endYear: 1970,

    domain: SIGNS.scorpio.domain,
    ideal: "Hidden leverage",

    manifestations: [
      "Cold War intelligence",
      "Nuclear deterrence",
      "Spy culture",
      "Psychoanalysis",
      "Decolonization",
      "Civil-rights confrontation",
      "The sexual revolution",
    ],

    archetype: "The Rebel",

    archetypeNote:
      "The figure who confronts the forces hidden beneath the official order. Power comes from exposing secrets, finding pressure points, breaking taboos, and forcing irreversible change.",

    question: "What lies beneath the surface?",


    idealNote:
      "Neptune idealizes power in Scorpio, expressed here as hidden leverage. Beneath the negotiated order lies another layer of reality: secrets, pressure points, suppressed conflict, and the forces that actually determine who has power.",

    majorEvent: {
      date: "1962",
      label: "Cuban Missile Crisis",
    },

    trigger: {
      date: "1957",
      label: "Sputnik / Cold War escalation",
      unlocks: "Hidden technological + strategic power",
    },

    inflection: { year: 1962, date: "1962", label: "Cuban Missile Crisis" },
    disillusionment: "Hidden power creates existential danger",
    mantra: "I want to uncover what really holds power.",

    element: "water",
    status: "completed" as const,

    expanded: `
    The negotiated order of the postwar world remains in place, but attention shifts beneath its surface. The central question is no longer simply who has formal authority, but what actually gives one side power over another.

    Nuclear deterrence makes this logic explicit. Power comes from possessing a hidden capability whose existence changes the behavior of everyone else. Intelligence agencies, espionage, covert operations, and Cold War strategy similarly organize power around secrets, information, pressure points, and leverage.

    The same movement appears within society. Psychoanalysis looks beneath conscious behavior for buried motives. Civil-rights and decolonization movements expose power structures concealed beneath claims of social order. The sexual revolution challenges taboos that had governed private life without always being openly discussed.

    The Scorpio era therefore does not simply rebel against the Libran order. It reveals what that order cannot contain: suppressed conflict, unequal power, forbidden desire, and forces operating beneath official appearances.

    Neptune idealizes this search for hidden truth. Intensity can be mistaken for authenticity, suspicion for insight, and destruction for liberation. But the era leaves behind a powerful intuition: to understand the world, look beneath what it says about itself and find the leverage that actually moves it.
  `,
  },


  {
    sign: "Sagittarius",
    glyph: "♐",
    house: 9,
    years: "~1970–1984",
    startYear: 1970,
    endYear: 1984,
    domain: SIGNS.sagittarius.domain,
    ideal: "Expanded horizons",
    manifestations: [
      "Post-hippie counterculture",
      "Communes",
      "New Age spirituality",
      "Ecology",
      "Global travel",
      "Mass higher education",
      "Satellite broadcasting",
      "Self-help culture",
      "Early globalization",
    ],
    archetype: "The Seeker",
    archetypeNote: "The person who leaves the inherited map in search of a larger life. Freedom means travel, experiment, self-discovery, and exposure to unfamiliar ways of living.",
    question: "What else is out there?",
    idealNote: "Neptune idealizes expansion in Sagittarius. After liberation from the old order, the collective desire turns outward: what else is possible, and what else is out there?",
    majorEvent: { date: "1970s", label: "Counterculture" },
    trigger: {
      date: "1969",
      label: "Woodstock + Moon landing",
      unlocks: "Two expansions: spiritual and technological",
    },
    inflection: { year: 1973, date: "1973–74", label: "Oil shock & inflation" },
    disillusionment: "Freedom from boundaries creates instability",
    mantra: "I want to discover what else is out there.",
    element: "fire",
    status: "completed" as const,
    expanded: `
      The hippie movement peaks before this passage, but the 1970s are when its worldview disperses: into communes, New Age spirituality, ecology, global travel, alternative education, and self-help.

      The Scorpio era breaks through hidden systems; Sagittarius turns that liberation outward. Travel, spirituality, education, and alternative lifestyles become paths beyond inherited limits.

      Satellite media and cheaper travel widen the imaginable world. Ideas circulate across borders with new speed, while globalization begins to feel less like an abstraction and more like a lived horizon.

      Neptune idealizes the Sagittarian quest. The horizon becomes magnetic: sometimes genuinely liberating, sometimes merely escapist. By the end of the passage, the most persuasive visions are ready to harden into Capricornian institutions.
    `,
  },
  {
    sign: "Capricorn",
    glyph: "♑",
    house: 10,
    years: "~1984–1998",
    startYear: 1984,
    endYear: 1998,
    domain: SIGNS.capricorn.domain,
    ideal: "Institutional success",
    manifestations: [
      "Wall Street",
      "Finance",
      "Leveraged buyouts",
      "Shareholder value",
      "The rise of the investment bank",
      "Professional ambition",
    ],
    archetype: "The Financier",
    archetypeNote: "Master of the universe. Success means climbing a hierarchy and accumulating money, status, and institutional authority.",
    question: "How do I rise to the top?",
    idealNote:
      "Neptune idealizes structure in Capricorn, expressed here as institutional success. Success means entering the hierarchy, mastering its rules, and rising high enough to wield its power.",
    majorEvent: {
      date: "1980s onward",
      label: "Financialization / deregulation",
    },
    trigger: {
      date: "1980s",
      label: "Financial deregulation",
      unlocks: "Finance becomes a path to institutional power",
    },
    inflection: { year: 1989, date: "1989–91", label: "Old institutions and orders collapse" },
    disillusionment: "Institutions don’t guarantee security",
    mantra: "I want to be powerful.",
    element: "earth",
    status: "completed" as const,
    expanded: `
      1984 is almost uncannily appropriate as a starting point for the financialization story.

      Deregulation, leveraged buyouts, junk bonds, the rise of increasingly powerful investment banks — the 1980s brought the cultural elevation of the financier. Shareholder-value thinking expanded capital markets and made the corporate climb the dominant aspiration of a generation.

      Neptune idealizes the Capricornian structure. The institution doesn't just exist — it becomes mythologized, the arena in which the worthy compete for power.
    `,
  },
  {
    sign: "Aquarius",
    glyph: "♒",
    house: 11,
    years: "~1998–2012",
    startYear: 1998,
    endYear: 2012,
    domain: SIGNS.aquarius.domain,
    ideal: "Global connection",
    manifestations: [
      "Internet",
      "Google (1998)",
      "PayPal (1998)",
      "Napster (1999)",
      "Wikipedia (2001)",
      "Facebook (2004)",
      "YouTube (2005)",
      "Twitter (2006)",
      "Web 2.0",
    ],
    archetype: "The Technologist",
    archetypeNote: "The builder of the infrastructure connecting everyone. Value comes from who you know and what you can access — not who you report to.",
    question: "How do we connect everyone?",
    idealNote: "Neptune idealizes networks in Aquarius, expressed here as connection. Institutions no longer need to mediate every relationship; technical networks allow individuals, information, and communities to connect directly across traditional boundaries.",
    majorEvent: { date: "late 1990s onward", label: "Internet" },
    trigger: {
      date: "1998–99",
      label: "Dot-com boom",
      unlocks: "The internet becomes a network for people, information and exchange",
    },
    inflection: { year: 2008, date: "2008", label: "Global financial crisis" },
    disillusionment: "Connection also transmits instability",
    mantra: "I want to be connected.",
    element: "air",
    status: "completed" as const,
    expanded: `
      The internet already existed before 1998 — but around this period it transitions toward becoming the organizing infrastructure of society.

      The dominant idea shifts from hierarchy to network. The social graph is built almost precisely within this window: by ~2011–12, hundreds of millions are on Facebook, YouTube is established, Twitter exists, smartphones have arrived, and Instagram launches in 2010.

      The endpoint is almost perfect. Aquarius built the network.
    `,
  },
  {
    sign: "Pisces",
    glyph: "♓",
    house: 12,
    years: "~2012–2026",
    startYear: 2012,
    endYear: 2026,
    domain: SIGNS.pisces.domain,
    ideal: "Belonging",
    manifestations: [
      "Social media",
      "The creator economy",
      "The sharing economy",
      "Streaming",
      "Pride and LGBTQ+ inclusion",
      "DEI",
      "Crowdfunding",
      "Blockchain and crypto",
      "Online communities",
    ],
    archetype: "The Influencer",
    archetypeNote: "You don't need to build the network. You become an image inside it. The individual as collective projection: one figure the belonging dream produces, not the dream itself.",
    question: "Who are we?",
    idealNote: "Neptune idealizes unity in Pisces: the dream that everyone can be part of the collective. It appears across domains at once. Everyone can publish, build an audience, share their assets, fund a project, create money on a protocol, and belong openly. These are different phenomena expressing one proposed ideal: participation and belonging without gatekeepers.",
    majorEvent: { date: "2010s onward", label: "The participatory internet" },
    trigger: {
      date: "2012",
      label: "Digital monetization",
      unlocks: "Social and mobile platforms, creator monetization, sharing platforms",
    },
    inflection: { year: 2020, date: "2020", label: "COVID + political rupture" },
    disillusionment: "The collective splits into competing realities",
    mantra: "I want to belong.",
    element: "water",
    status: "completed" as const,
    expanded: `
      Aquarius connected everyone. Pisces asks everyone to belong. The dream spreads across media, work, assets, money, and identity at once: everyone can publish, build an audience, share what they own, fund a project together, participate in a monetary network without a bank, and belong openly.

      2012–19 is the dream phase. The network Aquarius built becomes a collective space, and participation, sharing, inclusion, visibility, and collective identity are idealized.

      2020 is the inflection. The same collective systems that enabled participation become the central arenas for disputes over authority, speech, identity, expertise, and belonging. Polarization predates 2020, but this is where the contradiction becomes hard to miss.

      2020–26 is the disillusionment. Once belonging matters, control over its boundaries becomes power, and the collective divides over what the collective should be: competing accounts of institutions, media, identity, and which sources can be trusted. These are presented as manifestations of the tension, not as a verdict on either side.

      Everyone should belong becomes we cannot agree on what belonging means, and that fragmentation sets up Aries: from "Who are we?" to "Who am I?"
    `,
  },
  {
    sign: "Aries",
    glyph: "♈",
    house: 1,
    years: "~2026–2039",
    startYear: 2026,
    endYear: 2039,
    domain: SIGNS.aries.domain,
    ideal: "Individual agency",
    // Empty until the era produces its manifestations.
    manifestations: [],
    archetype: "The Protagonist",
    archetypeNote: "Followers become downstream of the mission rather than the mission itself. The person is still visible — but the visibility serves the doing.",
    question: "What can I do?",
    idealNote: "Neptune idealizes initiation in Aries, expressed here as individual agency: the ability to act directly on the world. Capability matters because it expands what one person can accomplish, turning visibility from an end in itself into leverage for a mission.",
    majorEvent: { date: "mid-2020s onward", label: "AI" },
    trigger: {
      date: "2025–26",
      label: "AI agents",
      unlocks: "Individuals acquire organizational-scale capability",
    },
    mantra: "I want to act.",
    element: "fire",
    status: "active" as const,
    expanded: `
      If we say Aries = "individualism," it doesn't work. Pisces already produced hyper-individualized culture.

      The distinction is in what confers power. The internet let one person reach 10 million people. AI may let one person do the work previously requiring 100. Those are fundamentally different forms of empowerment — from reach to capability.

      The Aries archetype doesn't need to reject social media. But followers become downstream of the mission rather than the mission itself.

      Pisces celebrity: "Here is my life. Watch me."
      Aries protagonist: "Here is what I'm trying to accomplish. Watch me do it."
    `,
  },
] as const satisfies readonly NeptuneEra[];
