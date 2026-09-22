// lib/astrology/macro/jupiter-eras-data.ts

import { SIGNS } from "./zodiac-framework-data";

export type JupiterEraElement = "earth" | "air" | "water" | "fire";
export type JupiterEraStatus = "completed" | "active" | "upcoming";

/**
 * One sign of Jupiter's current twelve-year loop, Aries 2022 → Pisces 2034.
 *
 * Unlike the outer-planet sequences, the status is not stored here: a Jupiter
 * era lasts about a year, so a hardcoded "active" would be stale by the next
 * ingress. The page derives it from `ingress` against today's date.
 *
 * `ingress` is the FIRST entry into the sign (Swiss Ephemeris, UTC). Where a
 * retrograde carries Jupiter back into the previous sign before it settles,
 * `reentry` says so rather than moving the boundary.
 */
export interface JupiterEra {
  sign: string;
  glyph: string;
  house: number;
  /** ISO date of first ingress. The era runs until the next era's ingress. */
  ingress: string;
  years: string;
  reentry?: string;
  element: JupiterEraElement;
  domain: string;
  /** What the collective is inclined to grow, in one word. */
  growth: string;
  question: string;
  archetype: string;
  archetypeNote: string;
  concept: string;
  conceptNote: string;
  structure: string;
  ideal: string;
  /** Past eras: what happened. Eras still ahead: where to look. */
  representative: string;
  excess: string;
  mantra: string;
  expanded: string;
}

/** Jupiter leaves Pisces for Aries on this date, closing the loop. */
export const JUPITER_CYCLE_END = "2034-04-21";

export const JUPITER_ERAS = [
  {
    sign: "Aries",
    glyph: "♈",
    house: 1,
    ingress: "2022-05-11",
    years: "May 2022 – May 2023",
    reentry: "Back in Pisces 28 Oct – 21 Dec 2022",
    element: "fire",
    domain: SIGNS.aries.domain,
    growth: "Initiative",
    question: "Who moves first?",
    archetype: "The Pioneer",
    archetypeNote:
      "The one who acts before the ground is mapped. Advantage belongs to whoever starts, stakes a claim, and forces everyone else to respond.",
    concept: "Beginning",
    conceptNote:
      "Aries opens the loop. Jupiter here rewards boldness, speed, and self-assertion — the confidence to begin something whose shape is not yet known.",
    structure: "First-mover advantage",
    ideal: "Growth through bold action",
    representative:
      "European rearmament and NATO enlargement (Finland joins, April 2023), the opening of the generative-AI race (GPT-4, March 2023), a rapid global rate-hiking cycle",
    excess: "Aggression mistaken for leadership; starting far more than can be sustained.",
    mantra: "I want to go first.",
    expanded: `
      A new twelve-year loop begins with a burst of assertion. States rearm, alliances enlarge, and the technology sector pivots almost overnight toward a race nobody wants to lose.

      The characteristic Aries gesture is the first move — not the best-planned one. Being early matters more than being finished, and the prize goes to whoever stakes the claim before the field is defined.

      Jupiter magnifies the impulse. The same confidence that launches a new era also launches fights, overreach, and projects that have no second act.
    `,
  },
  {
    sign: "Taurus",
    glyph: "♉",
    house: 2,
    ingress: "2023-05-17",
    years: "May 2023 – May 2024",
    element: "earth",
    domain: SIGNS.taurus.domain,
    growth: "Assets",
    question: "What is actually worth owning?",
    archetype: "The Holder",
    archetypeNote:
      "The one who owns the scarce, physical thing everyone else needs. Value comes from possession — land, metal, chips, capacity.",
    concept: "Value",
    conceptNote:
      "Taurus turns the Aries impulse into property. Jupiter here expands appetite for tangible, durable value: what can be held, stored, and built upon.",
    structure: "Ownership of scarce inputs",
    ideal: "Growth through accumulation",
    representative:
      "Nvidia passes $1 trillion (May 2023) and $2 trillion (Feb 2024), the data-centre and compute buildout, gold at record highs, rates held at their peak",
    excess: "Hoarding and asset inflation; price mistaken for value.",
    mantra: "I want to own what matters.",
    expanded: `
      The race that began in Aries needs material. Capital floods toward the physical substrate of the new era — chips, power, land, and the firms that control supply.

      Taurus asks a plain question of every narrative: what does it rest on? The answer, for a year, is hardware and hard assets. Scarcity becomes the story, and whoever holds the bottleneck holds the value.

      Jupiter's excess in Taurus is valuation itself. Ownership becomes so desirable that the price of holding outruns what the thing can produce.
    `,
  },
  {
    sign: "Gemini",
    glyph: "♊",
    house: 3,
    ingress: "2024-05-26",
    years: "May 2024 – Jun 2025",
    element: "air",
    domain: SIGNS.gemini.domain,
    growth: "Exchange",
    question: "Who controls the conversation?",
    archetype: "The Messenger",
    archetypeNote:
      "The one who carries information between worlds. Influence comes from framing, repetition, and being the channel everyone listens to.",
    concept: "Circulation",
    conceptNote:
      "Gemini multiplies. Jupiter here expands the volume and speed of talk, trade, and data — more channels, more voices, more signals, less settled meaning.",
    structure: "Many-channel communication",
    ideal: "Growth through exchange",
    representative:
      "The podcast-driven US election (2024), chat assistants in every product, reasoning models and the DeepSeek shock (January 2025), tariff policy announced and reversed in public posts",
    excess: "Noise mistaken for signal; speed of speech outrunning its accuracy.",
    mantra: "I want to be heard.",
    expanded: `
      The asset buildout of Taurus becomes a communication explosion. Machines learn to talk, campaigns move to long-form conversation, and trade itself is conducted as a stream of announcements.

      Gemini rewards the intermediary: whoever connects, translates, repackages, and circulates. Its question is less "what is true?" than "what is being said, and by whom?"

      Jupiter's distortion in Gemini is information inflation. There is more to read than ever, and less agreement about what any of it means.
    `,
  },
  {
    sign: "Cancer",
    glyph: "♋",
    house: 4,
    ingress: "2025-06-10",
    years: "Jun 2025 – Jun 2026",
    element: "water",
    domain: SIGNS.cancer.domain,
    growth: "Protection",
    question: "Who belongs, and who is protected?",
    archetype: "The Guardian",
    archetypeNote:
      "The one who keeps the household safe. Legitimacy comes from protecting one's own — family, homeland, food, shelter, borders.",
    concept: "Security",
    conceptNote:
      "Jupiter is exalted in Cancer. After a year of noise, appetite turns inward toward home, belonging, and the basic conditions of care — and toward defending them.",
    structure: "Protected domestic sphere",
    ideal: "Growth through safety and belonging",
    representative:
      "Cost of living and housing affordability at the centre of politics, border and immigration enforcement, reshoring and domestic supply chains, family-policy debates",
    excess: "Protection hardening into exclusion; nostalgia for a home that never quite existed.",
    mantra: "I want to be safe at home.",
    expanded: `
      The conversation of Gemini narrows to its most personal questions: can I afford a home, is my family secure, who is inside the circle and who is not.

      Cancer expands care, and care draws a boundary. The same impulse that funds housing, food security, and family support also funds walls, tariffs, and a politics of the homeland.

      Jupiter's exaltation here is real generosity toward one's own. Its shadow is how small "one's own" can become.
    `,
  },
  {
    sign: "Leo",
    glyph: "♌",
    house: 5,
    ingress: "2026-06-30",
    years: "Jun 2026 – Jul 2027",
    element: "fire",
    domain: SIGNS.leo.domain,
    growth: "Visibility",
    question: "Who gets to shine?",
    archetype: "The Performer",
    archetypeNote:
      "The one who commands the stage. Authority is conferred by presence, confidence, and the ability to make an audience feel something.",
    concept: "Expression",
    conceptNote:
      "Leo lifts what Cancer protected into public view. Jupiter here expands creativity, spectacle, leadership, and the need to be seen and celebrated.",
    structure: "Personality-led leadership",
    ideal: "Growth through visibility",
    representative:
      "Entertainment, sport, and creative industries attracting capital; personality-led brands and ventures; leadership judged on charisma; large public celebrations",
    excess: "Performance outrunning substance; prestige and personality inflated beyond what they deliver.",
    mantra: "I want to be seen.",
    expanded: `
      Having secured the home, the collective wants to celebrate. Leo turns attention to the stage — to creators, leaders, and moments big enough to share.

      Jupiter in Leo rewards generosity, courage, and play. Culture takes risks it would not take in a defensive year, and confidence becomes a form of capital.

      Its excess is the spotlight itself: visibility becomes the measure of worth, and those who command attention are trusted beyond their record.
    `,
  },
  {
    sign: "Virgo",
    glyph: "♍",
    house: 6,
    ingress: "2027-07-26",
    years: "Jul 2027 – Aug 2028",
    element: "earth",
    domain: SIGNS.virgo.domain,
    growth: "Competence",
    question: "What actually works?",
    archetype: "The Practitioner",
    archetypeNote:
      "The one who does the job well. Respect goes to skill, precision, and the quiet labour that makes systems function.",
    concept: "Refinement",
    conceptNote:
      "Virgo audits Leo's spectacle. Jupiter here expands appetite for usefulness — better processes, better health, better tools, measured results.",
    structure: "Operational excellence",
    ideal: "Growth through improvement",
    representative:
      "Productivity and workflow tools, health and wellness systems, labour and skills policy, quality and efficiency drives, practical adoption over announcement",
    excess: "Optimisation for its own sake; anxiety about imperfection; the audit that never ends.",
    mantra: "I want to be useful.",
    expanded: `
      After the performance, the reckoning with detail. Virgo asks whether the thing actually works — and rewards whoever can make it work reliably.

      Jupiter is in detriment here, and the expansion is of an unusual kind: not more of everything, but more precision. Growth comes from fixing, refining, and serving.

      Its excess is perfectionism at scale — a culture so busy measuring that it forgets what the measurement was for.
    `,
  },
  {
    sign: "Libra",
    glyph: "♎",
    house: 7,
    ingress: "2028-08-24",
    years: "Aug 2028 – Sep 2029",
    element: "air",
    domain: SIGNS.libra.domain,
    growth: "Alliance",
    question: "Who do we stand with?",
    archetype: "The Negotiator",
    archetypeNote:
      "The one who makes the deal both sides can sign. Advantage comes from relationship, fairness, and the terms of cooperation.",
    concept: "Balance",
    conceptNote:
      "Libra opens the second half of the loop and turns outward to the other. Jupiter here expands partnerships, agreements, and the search for fair terms.",
    structure: "Negotiated partnership",
    ideal: "Growth through cooperation",
    representative:
      "Alliances and trade agreements, mergers and joint ventures, courts and questions of fairness, design and aesthetics",
    excess: "Agreement for its own sake; indecision dressed as diplomacy.",
    mantra: "I want a fair deal.",
    expanded: `
      The first half of the loop builds the self; the second half meets everyone else. Libra asks who the partners are, and on what terms.

      Jupiter in Libra rewards those who can bring opposing parties to a table. Deals, treaties, and collaborations become the preferred vehicle for growth.

      Its excess is appeasement — a balance maintained by never deciding what matters.
    `,
  },
  {
    sign: "Scorpio",
    glyph: "♏",
    house: 8,
    ingress: "2029-09-24",
    years: "Sep 2029 – Oct 2030",
    element: "water",
    domain: SIGNS.scorpio.domain,
    growth: "Leverage",
    question: "Who holds the debt?",
    archetype: "The Insider",
    archetypeNote:
      "The one who knows where the real power sits. Influence comes from shared capital, hidden obligations, and the ability to move what others cannot see.",
    concept: "Depth",
    conceptNote:
      "Scorpio goes beneath Libra's agreements to the obligations they create. Jupiter here expands credit, joint wealth, and the stakes of trust.",
    structure: "Pooled capital and obligation",
    ideal: "Growth through leverage",
    representative:
      "Credit, debt, and insurance markets; inheritance and wealth transfer; investigations and exposures; taboo subjects entering the mainstream",
    excess: "Leverage turning into dependency; secrecy mistaken for depth.",
    mantra: "I want to know what lies beneath.",
    expanded: `
      Every partnership carries a balance sheet. Scorpio asks what is owed, who is exposed, and what has been kept out of view.

      Jupiter in Scorpio expands pooled resources — credit, investment, shared risk — and the power that comes with controlling them.

      Its excess is over-leverage: obligations that grow in the dark until something forces them into the open.
    `,
  },
  {
    sign: "Sagittarius",
    glyph: "♐",
    house: 9,
    ingress: "2030-10-23",
    years: "Oct 2030 – Nov 2031",
    element: "fire",
    domain: SIGNS.sagittarius.domain,
    growth: "Belief",
    question: "What do we believe?",
    archetype: "The Philosopher",
    archetypeNote:
      "The one who offers a bigger picture. Authority comes from meaning — a story that explains where things are going and why.",
    concept: "Horizon",
    conceptNote:
      "Jupiter is at home in Sagittarius. After Scorpio's depths, appetite turns to meaning, travel, law, education, and the stories that make growth feel justified.",
    structure: "Shared belief systems",
    ideal: "Growth through meaning",
    representative:
      "Higher education and publishing, travel and cross-border movement, religion and philosophy, law and international institutions",
    excess: "Dogma and self-righteousness; the story becoming bigger than the facts.",
    mantra: "I want it to mean something.",
    expanded: `
      Jupiter returns to its own sign, and expansion becomes explicitly philosophical. What had been leverage and obligation turns into a question of purpose.

      Sagittarius rewards vision, teaching, and exploration. Borders loosen in imagination if not always in law, and the collective reaches for a larger story about itself.

      Its excess is certainty — a worldview so confident it no longer checks whether it is true.
    `,
  },
  {
    sign: "Capricorn",
    glyph: "♑",
    house: 10,
    ingress: "2031-11-15",
    years: "Nov 2031 – Apr 2032",
    element: "earth",
    domain: SIGNS.capricorn.domain,
    growth: "Authority",
    question: "Who is in charge?",
    archetype: "The Executive",
    archetypeNote:
      "The one who turns vision into structure. Standing comes from responsibility, track record, and a seat in the hierarchy.",
    concept: "Structure",
    conceptNote:
      "Jupiter falls in Capricorn. Sagittarius's beliefs must now become institutions, and growth is measured by what can be governed and sustained.",
    structure: "Institutional authority",
    ideal: "Growth through structure",
    representative:
      "Government and corporate restructuring, regulation, infrastructure, reputation and status, long-horizon planning",
    excess: "Austerity mistaken for virtue; status climbing for its own sake.",
    mantra: "I want to build something that lasts.",
    expanded: `
      The meaning found in Sagittarius has to be organised. Capricorn asks who is responsible, what the rules are, and whether the structure can hold weight.

      Jupiter in fall expands carefully. Growth comes through discipline, credentials, and institutions that earn their authority.

      Its excess is rigidity — a hierarchy that protects its own position instead of the purpose it was built for.
    `,
  },
  {
    sign: "Aquarius",
    glyph: "♒",
    house: 11,
    ingress: "2032-04-12",
    years: "Apr 2032 – Apr 2033",
    reentry: "Back in Capricorn 27 Jun – 30 Nov 2032",
    element: "air",
    domain: SIGNS.aquarius.domain,
    growth: "Community",
    question: "What future are we building together?",
    archetype: "The Reformer",
    archetypeNote:
      "The one who organises peers around an idea of the future. Influence comes from networks, shared causes, and systems anyone can join.",
    concept: "Collective",
    conceptNote:
      "Aquarius opens Capricorn's structures to the group. Jupiter here expands networks, movements, science, and plans for a different social order.",
    structure: "Networked collective",
    ideal: "Growth through collaboration",
    representative:
      "Platforms and open networks, social movements and coalitions, science and technology policy, experiments in governance",
    excess: "Utopian abstraction; conformity inside a movement that calls itself free.",
    mantra: "I want to change the system.",
    expanded: `
      Institutions give way to networks. Aquarius asks what a group of peers could build that no hierarchy would allow.

      Jupiter in Aquarius rewards collaboration, invention, and ideals held in common. The future becomes a shared project rather than a career path.

      Its excess is abstraction — a plan for humanity that loses sight of actual humans.
    `,
  },
  {
    sign: "Pisces",
    glyph: "♓",
    house: 12,
    ingress: "2033-04-15",
    years: "Apr 2033 – Apr 2034",
    reentry: "Back in Aquarius 13 Sep – 2 Dec 2033",
    element: "water",
    domain: SIGNS.pisces.domain,
    growth: "Compassion",
    question: "What are we ready to let go of?",
    archetype: "The Mystic",
    archetypeNote:
      "The one who dissolves boundaries. Influence comes from imagination, empathy, and the capacity to hold what cannot be defined.",
    concept: "Release",
    conceptNote:
      "Jupiter is at home in Pisces and closes the loop. Appetite turns toward meaning beyond structure — art, faith, care, and the release of what the cycle has finished with.",
    structure: "Diffuse, shared meaning",
    ideal: "Growth through surrender",
    representative:
      "Film, music, and immersive media; spirituality and healing; humanitarian and care work; the unwinding of projects from earlier in the loop",
    excess: "Escapism and wishful thinking; boundaries dissolved where they were still needed.",
    mantra: "I want to dissolve into something larger.",
    expanded: `
      The twelfth sign completes the loop. What was begun in Aries, owned in Taurus, and organised in Capricorn is now dissolved, forgiven, or simply let go.

      Jupiter in Pisces expands compassion and imagination. It is a year for art, faith, and care — and for clearing ground before the next beginning.

      Its excess is the fog: hope floating free of evidence, and a reluctance to see what has already ended.
    `,
  },
] as const satisfies readonly JupiterEra[];

// ── Position in the loop ─────────────────────────────────────────────────────

const YEAR_MS = 365.2425 * 86_400_000;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

/** Each era's ingress, then the close of the loop: era i runs [i, i + 1). */
export const JUPITER_BOUNDARIES: readonly number[] = [
  ...JUPITER_ERAS.map((era) => utc(era.ingress)),
  utc(JUPITER_CYCLE_END),
];

export function jupiterEraStatus(index: number, at: number): JupiterEraStatus {
  if (at >= JUPITER_BOUNDARIES[index + 1]) return "completed";
  if (at >= JUPITER_BOUNDARIES[index]) return "active";
  return "upcoming";
}

/** The sign Jupiter is in at `at`, or -1 outside the 2022–2034 loop. */
export function activeJupiterEraIndex(at: number): number {
  return JUPITER_ERAS.findIndex((_, i) => jupiterEraStatus(i, at) === "active");
}

/** Years since the loop opened, and its whole length — both real time. */
export function jupiterCycleYears(at: number) {
  const start = JUPITER_BOUNDARIES[0];
  const end = JUPITER_BOUNDARIES[JUPITER_BOUNDARIES.length - 1];
  return {
    yearsIn: Math.min(Math.max(at - start, 0), end - start) / YEAR_MS,
    totalYears: (end - start) / YEAR_MS,
  };
}
