// lib/industry/pluto-music-eras-data.ts

/**
 * The third music clock: which actor holds structural leverage.
 *
 * Deliberately not "who has power". Labels, artists, radio, retailers and
 * platforms all have some power in every era, so a reading that names a
 * powerful party has said nothing. The question this clock asks is narrower and
 * falsifiable: where is the bottleneck — what could no one route around?
 *
 * That test is what separates a Pluto reading from an industry history. An era
 * can be full of activity (specialization, globalization, the album era) with
 * the bottleneck sitting exactly where it sat before, and an era can look quiet
 * while the choke point moves. Each era therefore carries its bottleneck
 * QUESTION as data, so a proposed answer can be checked against it.
 *
 * Pluto is the slowest of the three clocks by a wide margin — twelve to twenty
 * years a sign against Uranus's seven — so the whole span of the modern record
 * business is six eras. That is the right granularity. Bottlenecks do not move
 * every seven years.
 */

/** The seven dimensions an era is read on, once its answer has been tested. */
export type PlutoEraReading = {
  powerSystem: string;
  industryStructure: string;
  scarceResource: string;
  gatekeepers: string;
  artistPosition: string;
  economicModel: string;
  coreTension: string;
};

/**
 * How well the proposal holds up AS A LEVERAGE CLAIM, which is a different
 * question from whether it has been tested on all seven dimensions.
 *
 * The failure mode this guards against is describing an industry development
 * and calling it a shift in power. Specialization, globalization and the album
 * era all happened; none of them is by itself a statement about where the
 * bottleneck moved.
 */
export type PlutoConfidence = "strong" | "promising" | "unconvinced";

export const PLUTO_CONFIDENCE_LABEL: Record<PlutoConfidence, string> = {
  strong: "Strong",
  promising: "Promising",
  unconvinced: "Unconvinced",
};

/**
 * How the era's structural position showed up in the market.
 *
 * The demand-side layer, kept strictly apart from the structural one. "Youth
 * pop" and "counterculture" are real and worth naming, but they answer what
 * music was being sold, not what could not be routed around — and an earlier
 * draft of this file let the two layers share a column, which quietly turned
 * two of the six eras into market descriptions wearing a power label.
 */
export type PlutoMarketExpression = {
  name: string;
  detail: string;
};

/**
 * The structural move, as a from → to.
 *
 * Restored, and on the structural layer where it does real work. This is the
 * only falsifiable thing on an untested era: if the "from" was already true
 * before the era opened, the era did not do what is claimed. A verb alone
 * ("concentrate investment") is a description and descriptions are always a
 * little bit true.
 */
export type PlutoShift = {
  from: string;
  to: string;
};

/**
 * An artist the era's power model can be read off.
 *
 * Five per era, on the card rather than in the drawer: six eras leave room for
 * them, and a reader placing an era by its acts is faster than one placing it
 * by an abstraction. `note` is for the few that are evidence rather than
 * illustration, and shows only in the drawer.
 */
export type PlutoArtist = {
  name: string;
  note?: string;
};

/**
 * The case that appears before the era opens.
 *
 * Kept separate from `artists` because an act that arrives early is evidence of
 * a different kind: it shows the mechanism working before the conditions were
 * general, which is what distinguishes a structural shift from a fashion. It
 * also stops the artist list quietly absorbing figures who span boundaries —
 * Thriller is Scorpio's proof and it was released before Scorpio began.
 */
export type PlutoEarlySignal = {
  name: string;
  year: number;
  note: string;
};

export type ContrastRow = {
  axis: string;
  before: string;
  after: string;
};

/**
 * A side-by-side against the preceding era.
 *
 * Present only where two adjacent eras look similar enough to be confused for
 * each other — the Scorpio superstar and the Sagittarius manufactured act are
 * both "the industry builds a huge star", and the difference between them is
 * the whole claim that they are separate eras.
 */
export type PlutoContrast = {
  /** The difference in one memorable line, before the rows that evidence it. */
  summary: string | null;
  /** The structural reading underneath it. */
  detail: string | null;
  beforeLabel: string;
  afterLabel: string;
  rows: ContrastRow[];
};

export type PlutoEra = {
  sign: string;
  symbol: string;
  dates: string;
  /** The sign principle, a fact about the sign rather than about Pluto. */
  principle: string;
  /** The bottleneck question this era has to answer. */
  question: string | null;
  /**
   * The scarce capability itself — what is in short supply and therefore what
   * confers leverage.
   *
   * Separate from `holder` because the two move independently, and that is the
   * whole point. A Pluto era does not have to hand the industry to a new
   * company; it has to change the scarce FUNCTION through which leverage runs.
   * Requiring a new corporate entity every era would misread every structural
   * transition the incumbents survived — which is most of them.
   */
  bottleneck: string | null;
  /**
   * Where leverage concentrates — the locus, not the letterhead.
   *
   * The middle rung of BOTTLENECK → HOLDER → INSTITUTION. The bottleneck is
   * the scarce function, the holder is the position that function confers, and
   * the institution is whoever occupied it. The three move at different rates,
   * which is the whole reason they are separate fields: Libra and Scorpio are
   * both the record industry, and the leverage inside it moved from A&R
   * judgement to capital without a single company changing hands.
   *
   * Read down the column, the KIND of thing leverage is keeps changing:
   *
   *   company → creative judgment → capital → production machine → platform
   *
   * Which is why the next era need not be another institution taking over. It
   * could be a change in the architecture of power itself, and that is an open
   * question rather than a prediction.
   */
  holder: string | null;
  /**
   * The named entities that occupied the holder position.
   *
   * The bottom rung, and the one that grounds the abstraction — "major-label
   * corporate capital" is an argument, "CBS, Warner, PolyGram, EMI" is a
   * thing you can check. Aquarius remains null because it is not yet clear
   * whether structural power moves to a new institution, remains with
   * platforms, or disperses into networks.
   */
  institution: string | null;
  /**
   * The structural model: what the era's holder could do that no one else
   * could. The card headline.
   */
  model: string | null;
  /**
   * The model in one word, for the run across the grid — distribute, diversify,
   * concentrate, manufacture, platform.
   *
   * Two rules, both learned the hard way.
   *
   * FIND THE HOLDER FIRST; THE VERB FOLLOWS. Every verb here is what the
   * HOLDER does: record companies distribute, labels diversify, capital
   * concentrates, the machine manufactures, platforms platform. So a verb is
   * an answer to "who holds this", wearing a verb's clothes — and picking an
   * era-flavoured one first means reverse-engineering a power structure to
   * justify it. An era with no holder gets no verb.
   *
   * EACH HAS TO BE UNREPEATABLE ACROSS ERAS. "Build" and "develop" both failed
   * that test: every era builds something and every label develops artists, so
   * a verb either names what only this era could do or it is not the verb.
   */
  verb: string | null;
  shift: PlutoShift | null;
  /**
   * The era in one sentence, written to be unmistakable for its neighbours.
   *
   * The guard against generic models. "Talent development" is something labels
   * do in every period, so naming it as an era's scarce function says nothing
   * on its own — the sentence has to carry what was different about this one.
   * If a description would read as true of an adjacent era, the model is wrong.
   */
  distinctiveDescription: string | null;
  marketExpression: PlutoMarketExpression | null;
  /** The separate claims the proposal makes. */
  points: string[];
  artists: PlutoArtist[];
  earlySignal: PlutoEarlySignal | null;
  /**
   * What made this bottleneck possible — the enabling conditions, not the
   * era's technology story.
   *
   * The distinction matters because the Uranus clock IS the technology story,
   * and the two would otherwise say the same things about the same decades.
   * MTV belongs to Uranus in Sagittarius as a disruption of how music reached
   * people; it belongs here for a different reason, because video budgets
   * created the capital requirement that put the leverage with capital. A
   * technology earns a place on this clock only by changing who holds the
   * bottleneck.
   */
  technologies: string[];
  /** The form an artist takes when this is the power model. */
  artistStructure: string | null;
  contrast: PlutoContrast | null;
  confidence: PlutoConfidence | null;
  /** What the proposal still has to prove. Null where the claim is clean. */
  challenge: string | null;
  /** Null until tested against all seven dimensions. */
  reading: PlutoEraReading | null;
};

export const PLUTO_MUSIC_ERAS: PlutoEra[] = [
  {
    sign: "Virgo",
    symbol: "♍︎",
    dates: "1957–72",
    principle: "Craft / technique / refinement",
    question: "Who can turn a recording into a mass-market product?",
    bottleneck: "Access to the mass audience",
    holder: "Record companies",
    institution: "Columbia, RCA, Capitol, Decca, Motown",
    model: "Mass distribution",
    verb: "Distribute",
    shift: {
      from: "Live and local access",
      to: "Mass recorded distribution",
    },
    distinctiveDescription:
      "Record companies turn recorded music into a mass youth-market product through radio, records and national distribution.",
    marketExpression: { name: "Youth pop", detail: "Sell to the youth." },
    points: [
      "Music becomes an increasingly organized business",
      "Functions specialize: A&R, production, promotion, radio, distribution",
      "Pressing, distribution and radio access are things only a label had",
    ],
    artists: [
      {
        name: "Elvis Presley",
        note: "RCA bought his contract from Sun in 1955 for $35,000. The recordings already existed; only a major's distribution could make them national.",
      },
      { name: "The Beatles" },
      {
        name: "The Supremes",
        note: "Motown ran writing, session playing, choreography and presentation as separate departments — the professional system at its most literal.",
      },
    ],
    earlySignal: {
      name: "Sun Records",
      year: 1955,
      note: "A regional label with the recordings and no way to make them national. It sold the contract, which is the bottleneck demonstrating itself.",
    },
    technologies: ["45 rpm single", "LP", "Top 40 radio", "Television", "National distribution networks"],
    artistStructure: "Pop star / band / label-developed act",
    contrast: null,
    confidence: "strong",
    challenge: null,
    reading: null,
  },
  {
    sign: "Libra",
    symbol: "♎︎",
    dates: "1971–84",
    principle: "Balance / relationship",
    question:
      "Who can discover, develop and sustain distinctive talent long enough to build an audience?",
    bottleneck: "Spreading resources across differentiated artists",
    holder: "A&R / record labels",
    institution: "Warner–Elektra–Atlantic, A&M, Asylum",
    model: "Distinctive talent",
    verb: "Diversify",
    shift: {
      from: "Adapt artists to a mass market",
      to: "Develop markets around distinctive artists",
    },
    distinctiveDescription:
      "Labels spread resources across differentiated artists, building markets around individual creative identities rather than a standardized pop formula.",
    marketExpression: {
      name: "Counterculture market",
      detail: "Sell individuality.",
    },
    points: [
      "The distribution machine built in the previous era is now established",
      "The scarce capability moves inside the same company, from distribution to A&R",
      "Labels sign, advance, finance and sustain acts they cannot themselves produce",
    ],
    artists: [
      {
        name: "Stevie Wonder",
        note: "Renegotiated with Motown in 1971 for creative control and ownership — the clearest single piece of evidence the era has.",
      },
      { name: "Led Zeppelin" },
      {
        name: "Eagles",
        note: "Asylum was founded to house singer-songwriters. The roster was the strategy, which is what diversifying looks like as a company.",
      },
    ],
    earlySignal: {
      name: "The Beatles — Sgt. Pepper",
      year: 1967,
      note: "Proved the album could be the artistic and commercial unit, which is what made backing a distinctive act rather than a formula worth doing.",
    },
    technologies: ["FM radio", "Album-oriented rock formats", "Multitrack studios", "The LP as the unit of sale"],
    artistStructure: "Self-directed band / songwriter / musician",
    contrast: null,
    confidence: "strong",
    challenge:
      "Well-formed now, and falsifiable: if 1970s labels were not unusually oriented toward signing, developing and sustaining differentiated acts relative to the 1960s, the hypothesis fails. That comparison has not been run.",
    reading: null,
  },
  {
    sign: "Scorpio",
    symbol: "♏︎",
    dates: "1983–95",
    principle: "Transformation / hidden forces",
    question:
      "Who can concentrate enough capital and promotion behind an artist to create a superstar?",
    bottleneck: "The capital required to create enormous stars",
    holder: "Major-label corporate capital",
    institution: "The major record companies — Sony/CBS, Warner, PolyGram, EMI, MCA",
    model: "Concentrated investment",
    verb: "Concentrate",
    shift: {
      from: "Portfolio of differentiated artists",
      to: "Concentrated superstar investment",
    },
    distinctiveDescription:
      "Corporate resources concentrate behind exceptional talent, turning them into visual icons at a magnitude the video era made both possible and necessary.",
    marketExpression: {
      name: "Superstar business",
      detail: "Make exceptional talent enormous.",
    },
    points: [
      "Catalogs, labels and stars become valuable assets",
      "Mergers and acquisitions accelerate",
    ],
    artists: [
      { name: "Madonna" },
      { name: "Whitney Houston" },
      {
        name: "Mariah Carey",
        note: "Launched inside the era by Columbia with resources committed up front — capital deciding in advance what a star would be.",
      },
    ],
    earlySignal: {
      name: "Michael Jackson — Thriller",
      year: 1982,
      note: "Released before the era opens, and the hardest artist in the sequence to place — he spans decades either side of it. As a signal he is unambiguous: Thriller proved what video could do, and the budgets that implied are what moved the leverage to capital.",
    },
    technologies: ["MTV", "Music video", "Cable television", "Compact disc", "Stadium touring infrastructure"],
    artistStructure: "Exceptional talent transformed into a visual icon",
    contrast: null,
    confidence: "strong",
    challenge: null,
    reading: null,
  },
  {
    sign: "Sagittarius",
    symbol: "♐︎",
    dates: "1995–2008",
    principle: "Expansion / reach",
    question:
      "Who controls the production, songwriting, image and marketing machinery capable of constructing a global pop act?",
    bottleneck: "Integrated capability to construct and market scalable acts",
    holder: "Production / marketing machine",
    institution: "Jive, Cheiron Studios, the major-label marketing divisions",
    model: "Star manufacturing",
    verb: "Manufacture",
    shift: {
      from: "Find exceptional stars",
      to: "Construct scalable stars",
    },
    distinctiveDescription:
      "Songwriting, production, image and marketing become a repeatable system for constructing and globally scaling pop acts.",
    marketExpression: {
      name: "Manufactured global pop",
      detail: "Construct and scale acts.",
    },
    points: [
      "Increasingly consolidated music companies operate at global scale",
      "Control concentrates in a shrinking number of multinationals",
    ],
    artists: [
      {
        name: "Backstreet Boys",
        note: "Assembled by a promoter to a specification — the model the era is named for.",
      },
      {
        name: "*NSYNC",
        note: "The same promoter's second act to the same specification. The repeat is the evidence: a system rather than a hit.",
      },
      { name: "Britney Spears" },
    ],
    earlySignal: {
      name: "New Kids on the Block",
      year: 1988,
      note: "Assembled to a specification by a producer years before the era opened — the prototype the later promoters worked from.",
    },
    technologies: ["CD at peak margin", "Global retail chains", "MTV international", "Satellite broadcasting", "Consolidated radio"],
    artistStructure: "Industry-constructed pop act + artist-driven exceptions",
    contrast: {
      summary: "Build the icon → industrialize the formula.",
      detail:
        "The system first assembles itself around exceptional talent, then learns to assemble talent around the system.",
      beforeLabel: "1980s–early 90s superstar",
      afterLabel: "Late-90s/2000s manufactured pop",
      rows: [
        { axis: "Artist model", before: "Exceptional individual", after: "Constructed act" },
        { axis: "Selection", before: "Talent / charisma becomes the asset", after: "Industry identifies talent that fits a concept" },
        { axis: "Creative center", before: "Artist often central to musical identity", after: "Producers, songwriters and A&R can be the creative center" },
        { axis: "Performance", before: "Individual ability and personality emphasized", after: "Choreography, image and spectacle emphasized" },
        { axis: "Songwriting", before: "Often artist-involved, though not always", after: "Frequently external songwriting teams" },
        { axis: "Production", before: "Built around the star", after: "Star can be one component of a production system" },
        { axis: "Replaceability", before: "Low", after: "Structurally higher" },
        { axis: "Power logic", before: "Back the star", after: "Build the star" },
      ],
    },
    confidence: "promising",
    challenge:
      "Internally coherent now, but untested in the same way Libra is: we have not checked whether star manufacturing became unusually scarce or decisive in 1995–2008 relative to Scorpio. Until that comparison is run this stays at promising.",
    reading: null,
  },
  {
    sign: "Capricorn",
    symbol: "♑︎",
    dates: "2008–24",
    principle: "Structure / institutions",
    question: "Who controls access to the listener?",
    bottleneck: "Digital access to, and measurement of, the audience",
    holder: "Digital platforms",
    institution: "Spotify, YouTube, TikTok, Apple Music",
    model: "Digital infrastructure",
    verb: "Platform",
    shift: {
      from: "Industry controls audience access",
      to: "Platforms provide direct, measurable audience access",
    },
    distinctiveDescription:
      "Streaming and social platforms become the infrastructure for distributing, discovering and measuring music and artists.",
    marketExpression: {
      name: "Attention economy",
      detail: "Discover, measure and distribute demand.",
    },
    points: [
      "Streaming and social platforms become institutional infrastructure",
      "Discovery and demand become measurable in real time",
    ],
    artists: [
      {
        name: "Justin Bieber",
        note: "Signed off the back of YouTube numbers that already existed.",
      },
      {
        name: "Billie Eilish",
        note: "Uploaded to SoundCloud before any label involvement.",
      },
      { name: "Drake" },
    ],
    earlySignal: {
      name: "Arctic Monkeys",
      year: 2006,
      note: "A fanbase assembled online ahead of the label, when that was still remarkable rather than the route.",
    },
    technologies: ["Smartphones", "Streaming subscription", "Recommendation algorithms", "Social platforms", "Real-time analytics"],
    artistStructure: "Artist can build and prove demand before institutional scaling",
    contrast: null,
    confidence: "strong",
    challenge:
      "Naming platforms alone, with the rights holders dropped, is the sharper and more contestable claim — the majors still own the catalogs and still take most of the revenue. It holds only if owning content without reach is weaker than holding reach without content. That is arguable, and it is the argument the era now rests on.",
    reading: {
      powerSystem: "Platforms + major rights holders",
      industryStructure: "Consolidation",
      scarceResource: "Attention / catalog",
      gatekeepers: "Streaming platforms, major labels, major promoters",
      artistPosition: "Accesses audiences through platforms",
      economicModel: "Scale",
      coreTension: "Creator ↔ infrastructure",
    },
  },
  {
    sign: "Aquarius",
    symbol: "♒︎",
    dates: "2024–44",
    principle: "Networks / decentralization",
    // Asks "who", like every other era's question. The earlier "what becomes
    // scarce" phrasing was the only one in the set that did not.
    question:
      "Who can distinguish and organize genuine allegiance once measurable attention is abundant?",
    // Deliberately all null. A market inversion has been identified; the
    // scarce function behind it has not, and the verb cannot be chosen before
    // the holder is. See the note on `verb`.
    bottleneck: null,
    holder: null,
    institution: null,
    model: null,
    verb: null,
    shift: null,
    distinctiveDescription: null,
    marketExpression: {
      name: "Depth over breadth",
      detail: "Committed audiences matter more than aggregate reach.",
    },
    points: [
      "Platform metrics increasingly struggle to distinguish genuine demand from manufactured scale",
      "Broad appeal no longer guarantees freedom from audience backlash; neutrality itself can carry a cost",
      "The emerging value may lie in the strength of an artist's relationship with a committed audience rather than the absolute size of that audience",
    ],
    artists: [],
    earlySignal: null,
    technologies: ["Generative AI", "Fan and community platforms", "Real-time fraud detection"],
    artistStructure: null,
    contrast: null,
    confidence: null,
    challenge:
      "Depth over breadth identifies a possible market inversion, not yet a structural bottleneck. The holder remains unknown. If platforms capture deeper fan relationships themselves, Capricorn's platform model may simply extend rather than give way to a new power structure. The strongest hypothesis to test is judgment rather than network: Capricorn made measurement abundant, so the scarce capability may be discriminating between real significance and mere scale — but that has to be argued, not assumed from the sign.",
    reading: null,
  },
];

export const PLUTO_DIMENSIONS: { key: keyof PlutoEraReading; label: string }[] = [
  { key: "powerSystem", label: "Power system" },
  { key: "industryStructure", label: "Industry structure" },
  { key: "scarceResource", label: "Scarce resource" },
  { key: "gatekeepers", label: "Gatekeepers" },
  { key: "artistPosition", label: "Artist position" },
  { key: "economicModel", label: "Economic model" },
  { key: "coreTension", label: "Core tension" },
];

/**
 * Libra and Aquarius are not in the same position and must not read as if they
 * are. Libra has a named dynamic that its own bottleneck question has not been
 * posed for; Aquarius has nothing yet because it has barely started. Keying
 * state off the power centre alone collapsed the two.
 */
export type PlutoEraState = "tested" | "proposed" | "unresolved" | "open";

/** How much is known about an era, which the page reports rather than hides. */
export function plutoEraState(era: PlutoEra): PlutoEraState {
  if (era.reading) return "tested";
  if (era.holder) return "proposed";
  if (era.model) return "unresolved";
  return "open";
}

const PLUTO_STATE_LABEL: Record<PlutoEraState, string> = {
  tested: "Read on all seven",
  proposed: "Proposed",
  unresolved: "Needs investigation",
  open: "Open question",
};

/**
 * One line for the card: how much is known, and how much it is worth.
 *
 * The two questions are separate — Capricorn is both tested AND strong, Libra
 * is untested AND unconvincing — but a card has room for one micro label, and
 * a reader scanning six eras needs the weaker answer of the two.
 */
export function plutoEraLabel(era: PlutoEra): string {
  const state = plutoEraState(era);
  const base = PLUTO_STATE_LABEL[state];
  if (state === "open" || state === "unresolved" || !era.confidence) return base;
  return `${base} · ${PLUTO_CONFIDENCE_LABEL[era.confidence]}`;
}

/**
 * A pattern under test, not a law: what each element appears to do on this
 * clock.
 *
 * Derived rather than stored, because element is a fact about the sign and
 * storing it per era would let the two drift. The sequence of elements across
 * six consecutive signs is guaranteed by the zodiac, so the pattern existing
 * is not evidence of anything — what is suggestive is that the FUNCTIONS line
 * up, and that Virgo and Capricorn, characterized separately and far apart,
 * both came out as infrastructure eras.
 *
 * Roughly 1.25 repetitions of a four-beat cycle is not enough to call it.
 * Its use is as a constraint on the Aquarius search: if it holds, Aquarius is
 * an Air era and should be about judgment exercised through the machine
 * Capricorn built, not about building another one.
 */
/**
 * One word per element, and "scale" is Fire's alone.
 *
 * Scorpio kept borrowing it to mean "very big", which blurred the one
 * distinction the Scorpio–Sagittarius contrast rests on: Scorpio piles
 * resources behind ONE artist (magnitude), Sagittarius repeats a model across
 * MANY (scale). Replaceability low → structurally higher is exactly that
 * difference, so Scorpio takes magnitude and size, Sagittarius takes scale,
 * scalable and scaling.
 */
export const PLUTO_ELEMENT_FUNCTION: Record<string, string> = {
  Earth: "Build the institution / infrastructure",
  Air: "Exercise creative / social judgment",
  Water: "Concentrate value / resources",
  Fire: "Expand / scale",
};

/** The order the pattern is read in, starting from the era the clock opens on. */
export const PLUTO_ELEMENT_ORDER = ["Earth", "Air", "Water", "Fire"] as const;

export function getPlutoEra(sign: string): PlutoEra | undefined {
  return PLUTO_MUSIC_ERAS.find((era) => era.sign === sign);
}
