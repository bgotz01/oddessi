// lib/industry/uranus-music-eras-data.ts

// ── Overview schema (table) ───────────────────────────────────────────────────

/**
 * Which half of the chain the era broke.
 *
 * The thing that separates this clock from the Neptune one beside it. Neptune
 * disrupts what music MEANS; Uranus disrupts how it is MADE and how it REACHES
 * people, which is a claim worth testing against all eleven eras rather than
 * asserting once in a lede. Leo is honestly "Both" — the star system is made
 * of amplification and broadcast at the same time — and forcing it either way
 * to tidy the pattern would be the one place this axis lied.
 */
export type UranusAxis = "Production" | "Distribution" | "Both";

export type UranusEraOverview = {
  sign: string;
  symbol: string;
  dates: string;
  principle: string;
  disruption: string | null;
  manifestation: string | null;
  description: string | null;
  axis: UranusAxis | null;
  /** The finer name, where the coarse one undersells it. Null falls back to `axis`. */
  axisDetail: string | null;
  /** What the era did to that half of the chain, in one clause. */
  axisNote: string | null;
};

export const URANUS_MUSIC_ERAS: UranusEraOverview[] = [
  { sign: "Leo", symbol: "♌︎", dates: "1956–62", principle: "Self-expression / performer", disruption: "Performer ↔ audience conventions", manifestation: "Rock 'n' roll star", description: "The charismatic performer becomes the event.", axis: "Both", axisDetail: null, axisNote: "Performer amplified and distributed through TV, radio and records" },
  { sign: "Virgo", symbol: "♍︎", dates: "1962–69", principle: "Craft / technique / refinement", disruption: "Performance ↔ production", manifestation: "Studio experimentation", description: "Recording becomes a process for constructing music, not merely capturing it.", axis: "Production", axisDetail: null, axisNote: "Studio becomes creative technology" },
  { sign: "Libra", symbol: "♎︎", dates: "1969–75", principle: "Balance / relationship", disruption: "Artist ↔ audience", manifestation: "Festival culture / mass gatherings", description: "The boundary between performer and crowd dissolves into communal, shared experience.", axis: "Distribution", axisDetail: "Live distribution", axisNote: "Performance scales to mass audiences" },
  { sign: "Scorpio", symbol: "♏︎", dates: "1975–81", principle: "Transformation / hidden forces", disruption: "Natural ↔ synthetic sound", manifestation: "Electronic production", description: "Synths, sequencers and drum machines transform the underlying material of music.", axis: "Production", axisDetail: null, axisNote: "Electronic instruments transform sound creation" },
  { sign: "Sagittarius", symbol: "♐︎", dates: "1981–88", principle: "Expansion / reach", disruption: "Sound ↔ image", manifestation: "Music video / MTV", description: "The musical artist becomes audiovisual and reaches a global audience.", axis: "Distribution", axisDetail: "Distribution / media", axisNote: "Music expands into video and MTV" },
  { sign: "Capricorn", symbol: "♑︎", dates: "1988–96", principle: "Structure / institutions", disruption: "Analog ↔ digital infrastructure", manifestation: "Digital production", description: "MIDI, sampling, digital recording and computerized workflows restructure professional production.", axis: "Production", axisDetail: null, axisNote: "Digital production infrastructure" },
  { sign: "Aquarius", symbol: "♒︎", dates: "1996–2003", principle: "Networks / decentralization", disruption: "Industry ↔ listener", manifestation: "File sharing", description: "Centralized distribution gives way to peer-to-peer access.", axis: "Distribution", axisDetail: null, axisNote: "Internet and peer-to-peer distribution" },
  { sign: "Pisces", symbol: "♓︎", dates: "2003–11", principle: "Dissolution / boundarylessness", disruption: "Studio ↔ home", manifestation: "Home production", description: "Professional production escapes the dedicated studio.", axis: "Production", axisDetail: null, axisNote: "Studio moves to the home" },
  { sign: "Aries", symbol: "♈︎", dates: "2011–19", principle: "Independence / initiation", disruption: "Gatekeeper ↔ artist", manifestation: "Social media", description: "Artists can initiate attention and build audiences themselves.", axis: "Distribution", axisDetail: "Distribution / promotion", axisNote: "Artist can reach audience directly" },
  { sign: "Taurus", symbol: "♉︎", dates: "2019–26", principle: "Value / ownership / material resources", disruption: "Alternative ↔ infrastructure", manifestation: "Digital-first industry", description: "The digital tools pioneered outside the traditional industry become its foundation.", axis: "Distribution", axisDetail: "Distribution / infrastructure", axisNote: "Digital system becomes the industry" },
  // The one era with a thesis rather than a record. Read as a PRODUCTION
  // disruption about headcount, not about tools: every earlier production era
  // changed what the work was done with, and this one changes how many people
  // it takes. That is what keeps it distinct from Pisces, which moved the
  // studio into the house but left the roles intact.
  { sign: "Gemini", symbol: "♊︎", dates: "2026–33", principle: "Communication / multiplicity / exchange", disruption: "Specialist team ↔ creator", manifestation: "Micro-team production", description: "AI and increasingly automated production tools allow one or two creators to perform roles once distributed across a larger production team.", axis: "Production", axisDetail: "Production / labour", axisNote: "One or two creators cover roles once spread across a team" },
];

// ── Reading schema (drawer) ───────────────────────────────────────────────────

/**
 * One beat of the three-beat sequence a reading closes on: the era before this
 * one, this one, and the era after. The sign is carried rather than derived
 * from the table order because the first reading reaches back to Cancer, which
 * the table does not run to.
 */
export type EraLogicStep = {
  sign: string;
  line: string;
};

export type BeforeAfterRow = {
  axis: string;
  before: string;
  after: string;
};

export type UranusEraReading = {
  sign: string;
  headline: string;
  keyShifts: string[];
  beforeSign: string;
  afterSign: string;
  beforeAfter: BeforeAfterRow[];
  keyTechnologies: string[];
  industryImpact: string[];
  eraLogic: EraLogicStep[];
};

export const URANUS_ERA_READINGS: UranusEraReading[] = [
  {
    sign: "Taurus",
    headline: "Digital becomes infrastructure",
    keyShifts: [
      "Digital distribution becomes the industry standard",
      "Streaming becomes the dominant consumption model",
      "Social media becomes standard promotion infrastructure",
      "Algorithmic feeds become a primary discovery mechanism",
      '"Internet artist" stops being a separate category',
    ],
    beforeSign: "Aries",
    afterSign: "Taurus",
    beforeAfter: [
      { axis: "Digital role", before: "Alternative", after: "Infrastructure" },
      { axis: "Reach", before: "Build an audience", after: "Reach beyond your audience" },
      { axis: "Discovery", before: "Social discovery", after: "Algorithmic discovery" },
      { axis: "Distribution", before: "Follower graph", after: "Algorithmic feed" },
      { axis: "Breakthrough", before: "Build momentum", after: "Go viral" },
      { axis: "Posture", before: "Pioneer the system", after: "Establish the system" },
    ],
    keyTechnologies: [
      "Spotify / streaming",
      "TikTok",
      "Reels / Shorts",
      "Recommendation algorithms",
      "Streaming analytics",
    ],
    industryImpact: [
      "Attention becomes measurable",
      "Virality becomes a discovery signal",
      "Labels scout social metrics",
      "Promotion becomes platform-native",
      "Catalog becomes continuously accessible",
      "Digital performance influences investment",
    ],
    eraLogic: [
      { sign: "Aries", line: "Pioneer the digital model" },
      { sign: "Taurus", line: "Establish the digital foundation" },
      { sign: "Gemini", line: "Multiply what the system can create and circulate" },
    ],
  },
  {
    sign: "Aries",
    headline: "Artists become their own launchpad",

    keyShifts: [
      "Artists can build audiences before industry backing",
      "Social platforms become launch channels",
      "Direct artist-to-fan communication becomes normal",
      "Independent releases can generate mainstream attention",
      "Audience growth can begin outside traditional media",
    ],

    beforeSign: "Pisces",
    afterSign: "Aries",

    beforeAfter: [
      { axis: "Access", before: "Make music at home", after: "Launch music yourself" },
      { axis: "Gatekeeper", before: "Industry", after: "Artist" },
      { axis: "Audience", before: "Reach through channels", after: "Build directly" },
      { axis: "Discovery", before: "Music platforms", after: "Social platforms" },
      { axis: "Identity", before: "Musician", after: "Online artist profile" },
      { axis: "Posture", before: "Participate", after: "Initiate" },
    ],

    keyTechnologies: [
      "YouTube",
      "SoundCloud",
      "Instagram",
      "Twitter",
      "Direct digital distribution",
    ],

    industryImpact: [
      "Audience can precede record deal",
      "Online traction becomes an industry signal",
      "Independent releases gain visibility",
      "Artists control their public identity",
      "Promotion becomes continuous",
      "Labels increasingly discover artists online",
    ],

    eraLogic: [
      { sign: "Pisces", line: "Move production outside the studio" },
      { sign: "Aries", line: "Move initiation outside the industry" },
      { sign: "Taurus", line: "Establish the digital model as infrastructure" },
    ],
  },
  {
    sign: "Pisces",
    headline: "The studio moves home",

    keyShifts: [
      "Professional production becomes possible on a personal computer",
      "Home studios become viable creative spaces",
      "Software replaces large amounts of studio hardware",
      "Recording and production increasingly merge",
      "Producers can create complete tracks independently",
      "The boundary between amateur and professional production weakens",
    ],

    beforeSign: "Aquarius",
    afterSign: "Pisces",

    beforeAfter: [
      { axis: "Access", before: "Access music anywhere", after: "Make music anywhere" },
      { axis: "Production", before: "Professional studio", after: "Home studio" },
      { axis: "Tools", before: "Dedicated hardware", after: "Software" },
      { axis: "Workspace", before: "Physical facility", after: "Laptop / bedroom" },
      { axis: "Cost", before: "Capital intensive", after: "Accessible" },
      { axis: "Posture", before: "Download and share", after: "Create and produce" },
    ],

    keyTechnologies: [
      "Ableton Live",
      "Logic Pro",
      "FL Studio",
      "GarageBand",
      "Software instruments / plugins",
      "Affordable audio interfaces",
    ],

    industryImpact: [
      "Production costs fall",
      "Bedroom producers become commercially viable",
      "Professional studios lose their production monopoly",
      "Independent producers can finish records themselves",
      "Electronic production expands rapidly",
      "More music can be created outside industry infrastructure",
    ],

    eraLogic: [
      { sign: "Aquarius", line: "Decentralize access to music" },
      { sign: "Pisces", line: "Decentralize production" },
      { sign: "Aries", line: "Decentralize the launch of the artist" },
    ],
  },
  {
    sign: "Aquarius",
    headline: "Distribution becomes a network",

    keyShifts: [
      "Music becomes a digital file",
      "Listeners can copy and share music directly",
      "Peer-to-peer networks bypass physical distribution",
      "Access expands beyond stores and radio",
      "Individual tracks circulate independently of albums",
      "Scarcity gives way to abundance",
    ],

    beforeSign: "Capricorn",
    afterSign: "Aquarius",

    beforeAfter: [
      { axis: "Distribution", before: "Centralized", after: "Peer-to-peer" },
      { axis: "Format", before: "Physical media", after: "Digital files" },
      { axis: "Access", before: "Buy from industry", after: "Download from network" },
      { axis: "Control", before: "Distributor", after: "Listener" },
      { axis: "Unit", before: "Album", after: "Track" },
      { axis: "Supply", before: "Scarcity", after: "Abundance" },
    ],

    keyTechnologies: [
      "MP3",
      "Napster",
      "Kazaa",
      "LimeWire",
      "BitTorrent",
      "Broadband internet",
    ],

    industryImpact: [
      "Physical distribution loses its monopoly",
      "Recorded music becomes infinitely reproducible",
      "Listeners gain access to enormous catalogs",
      "Album bundling begins to weaken",
      "Piracy disrupts recorded-music revenues",
    ],

    eraLogic: [
      { sign: "Capricorn", line: "Build the digital production infrastructure" },
      { sign: "Aquarius", line: "Network the distribution of music" },
      { sign: "Pisces", line: "Move production outside the studio" },
    ],
  },
  {
    sign: "Capricorn",
    headline: "Production becomes digital",

    keyShifts: [
      "Digital tools enter professional production",
      "MIDI connects instruments and computers",
      "Sampling becomes a core production technique",
      "Digital recording replaces analog workflows",
      "Computerized editing expands control over recordings",
    ],

    beforeSign: "Sagittarius",
    afterSign: "Capricorn",

    beforeAfter: [
      { axis: "Infrastructure", before: "Analog", after: "Digital" },
      { axis: "Recording", before: "Tape", after: "Digital recording" },
      { axis: "Editing", before: "Physical", after: "Computerized" },
      { axis: "Instrumentation", before: "Standalone instruments", after: "Connected systems" },
      { axis: "Composition", before: "Performed", after: "Programmed / sequenced" },
      { axis: "Workflow", before: "Hardware chain", after: "Digital workflow" },
    ],

    keyTechnologies: [
      "MIDI",
      "Digital audio workstations",
      "Digital multitrack recording",
      "Samplers",
      "Digital synthesizers",
      "Computer sequencing",
    ],

    industryImpact: [
      "Studios adopt digital workflows",
      "Editing becomes faster and more precise",
      "Sampling reshapes music production",
      "Production becomes increasingly computer-based",
      "Digital tools become professional infrastructure",
      "Music is prepared for digital distribution",
    ],

    eraLogic: [
      { sign: "Sagittarius", line: "Expand music through audiovisual media" },
      { sign: "Capricorn", line: "Build the digital production infrastructure" },
      { sign: "Aquarius", line: "Network the distribution of music" },
    ],
  },
  {
    sign: "Sagittarius",
    headline: "Music becomes audiovisual",

    keyShifts: [
      "Artists become visual as well as musical identities",
      "Television expands music beyond radio",
      "Image becomes part of the musical product",
      "Major releases become multimedia events",
      "Artists reach international audiences simultaneously",
    ],

    beforeSign: "Scorpio",
    afterSign: "Sagittarius",

    beforeAfter: [
      { axis: "Medium", before: "Sound", after: "Sound + image" },
      { axis: "Broadcast", before: "Radio", after: "Music television" },
      { axis: "Artist", before: "Performer", after: "Audiovisual star" },
      { axis: "Promotion", before: "Song / performance", after: "Music video" },
      { axis: "Reach", before: "National markets", after: "Global audience" },
      { axis: "Experience", before: "Listen", after: "Watch + listen" },
    ],

    keyTechnologies: [
      "MTV",
      "Music video",
      "Cable television",
      "Satellite broadcasting",
      "VHS",
      "Compact disc",
    ],

    industryImpact: [
      "Music video becomes a major marketing channel",
      "Visual identity becomes commercially important",
      "Video budgets expand",
      "Television creates global music exposure",
      "Superstars scale across international markets",
      "Music becomes increasingly multimedia",
    ],

    eraLogic: [
      { sign: "Scorpio", line: "Transform the material of sound" },
      { sign: "Sagittarius", line: "Expand music into visual media" },
      { sign: "Capricorn", line: "Build the digital production infrastructure" },
    ],
  },
  {
    sign: "Scorpio",
    headline: "Sound becomes synthetic",

    keyShifts: [
      "Synthesizers move into mainstream production",
      "Electronic sounds replace acoustic instruments",
      "Sequencers automate musical patterns",
      "Drum machines reshape rhythm",
      "Sound can be designed rather than performed",
    ],

    beforeSign: "Libra",
    afterSign: "Scorpio",

    beforeAfter: [
      { axis: "Sound", before: "Natural / acoustic", after: "Synthetic / electronic" },
      { axis: "Instrument", before: "Played", after: "Programmed" },
      { axis: "Rhythm", before: "Live drummer", after: "Drum machine" },
      { axis: "Sequence", before: "Human performance", after: "Automation" },
      { axis: "Production", before: "Capture sound", after: "Design sound" },
      { axis: "Material", before: "Physical instruments", after: "Electronic signals" },
    ],

    keyTechnologies: [
      "Analog synthesizers",
      "Polyphonic synthesizers",
      "Sequencers",
      "Drum machines",
      "Electronic effects",
      "Early digital sampling",
    ],

    industryImpact: [
      "Electronic production enters mainstream music",
      "New sounds become possible without acoustic equivalents",
      "Producers gain greater control over timbre",
      "Programmed rhythm becomes commercially important",
      "Electronic instruments reshape studio workflows",
      "The foundations of synth-pop and electronic dance music emerge",
    ],

    eraLogic: [
      { sign: "Libra", line: "Turn music into a shared mass experience" },
      { sign: "Scorpio", line: "Transform the material of sound" },
      { sign: "Sagittarius", line: "Expand music into audiovisual media" },
    ],
  },
  {
    sign: "Libra",
    headline: "Live music becomes a mass gathering",

    keyShifts: [
      "Festivals bring enormous audiences together",
      "Concerts scale into mass gatherings",
      "Live sound systems expand dramatically",
      "Festival culture becomes a major live format",
      "The artist-audience relationship becomes more immediate",
    ],


    beforeSign: "Virgo",
    afterSign: "Libra",

    beforeAfter: [
      { axis: "Setting", before: "Studio / venue", after: "Mass gathering" },
      { axis: "Audience", before: "Spectator", after: "Participant" },
      { axis: "Scale", before: "Concert", after: "Festival / stadium" },
      { axis: "Experience", before: "Performance", after: "Shared event" },
      { axis: "Relationship", before: "Artist → audience", after: "Artist ↔ audience" },
      { axis: "Focus", before: "Recorded work", after: "Collective experience" },
    ],

    keyTechnologies: [
      "Large-scale PA systems",
      "Festival sound systems",
      "Concert amplification",
      "Stage lighting",
      "Outdoor staging",
      "Stadium touring infrastructure",
    ],

    industryImpact: [
      "Festivals become major cultural events",
      "Concert audiences scale dramatically",
      "Touring infrastructure becomes more sophisticated",
      "Live performance becomes increasingly spectacular",
      "Large-scale concerts become commercially viable",
      "Promoters and artists build infrastructure for mass audiences",
    ],

    eraLogic: [
      { sign: "Virgo", line: "Transform recording into a creative process" },
      { sign: "Libra", line: "Transform performance into a shared experience" },
      { sign: "Scorpio", line: "Transform the material of sound" },
    ],
  },
  {
    sign: "Virgo",
    headline: "The studio becomes an instrument",

    keyShifts: [
      "Recording becomes part of composition",
      "Multitrack recording expands creative control",
      "Overdubbing separates recording from live performance",
      "Tape manipulation creates new sounds",
      "Records become impossible to reproduce exactly on stage",
    ],

    beforeSign: "Leo",
    afterSign: "Virgo",

    beforeAfter: [
      { axis: "Recording", before: "Capture performance", after: "Construct recording" },
      { axis: "Studio", before: "Recording space", after: "Creative instrument" },
      { axis: "Performance", before: "Recorded together", after: "Layered separately" },
      { axis: "Editing", before: "Limited", after: "Integral" },
      { axis: "Sound", before: "Performed", after: "Manipulated" },
      { axis: "Role", before: "Performer-led", after: "Performer + producer" },
    ],

    keyTechnologies: [
      "Multitrack recording",
      "Overdubbing",
      "Tape loops",
      "Tape editing",
      "Studio effects",
      "Mixing consoles",
    ],

    industryImpact: [
      "Studio time becomes part of the creative process",
      "Producers gain greater artistic influence",
      "Albums become more technically elaborate",
      "Recorded music separates from live reproduction",
      "Layered arrangements become increasingly complex",
      "Production technique becomes part of artistic identity",
    ],

    eraLogic: [
      { sign: "Leo", line: "Make the performer the event" },
      { sign: "Virgo", line: "Refine the recording into a constructed work" },
      { sign: "Libra", line: "Expand performance into a shared mass experience" },
    ],
  },
  {
    sign: "Leo",
    headline: "The performer becomes the star",

    keyShifts: [
      "Performer identity moves to the center",
      "Stage presence becomes part of the product",
      "Youth culture forms around individual stars",
      "Fans identify directly with performers",
    ],

    beforeSign: "Cancer",
    afterSign: "Leo",

    beforeAfter: [
      { axis: "Cultural unit", before: "Band / orchestra", after: "Individual star" },
      { axis: "Focus", before: "Song / arrangement", after: "Performer" },
      { axis: "Identity", before: "Bandleader / vocalist", after: "Rock 'n' roll star" },
      { axis: "Performance", before: "Musical presentation", after: "Physical spectacle" },
      { axis: "Audience", before: "Listener / dancer", after: "Fan" },
      { axis: "Image", before: "Supporting", after: "Central" },
    ],

    eraLogic: [
      { sign: "Cancer", line: "Music centers on songs, bands and orchestras" },
      { sign: "Leo", line: "The individual performer becomes the event" },
      { sign: "Virgo", line: "The recording itself becomes the creative work" },
    ],

    keyTechnologies: [
      "Television",
      "45 rpm single",
      "Electric guitar",
      "Amplification",
      "Portable transistor radio",
      "Mass-market record players",
    ],

    industryImpact: [
      "Rock 'n' roll creates a new star system",
      "Performers become youth-culture icons",
      "Television accelerates national exposure",
      "Artist image becomes commercially important",
      "Fan culture expands around individual performers",
      "Personality becomes part of music marketing",
    ],


  },
];

/**
 * "1956–62" → 1962, "1996–2003" → 2003.
 *
 * The table is written the way a historian writes a date range, with the
 * century dropped when it is obvious. Obvious to a reader; not to an axis, and
 * not to the rule that decides which era is the one running now. A two-digit
 * end takes its start's century and rolls forward one when that would put the
 * end before the beginning.
 */
function expandEndYear(startYear: number, token: string): number {
  const value = Number(token);
  if (token.length === 4) return value;
  const century = Math.floor(startYear / 100) * 100;
  const candidate = century + value;
  return candidate >= startYear ? candidate : candidate + 100;
}

/** Boundaries are half-open: an era owns [startYear, endYear). */
export function uranusEraYears(dates: string): { startYear: number; endYear: number } {
  const [from, to] = dates.split(/[–—-]/).map((part) => part.trim());
  const startYear = Number(from);
  return { startYear, endYear: expandEndYear(startYear, to) };
}

export type UranusEraStatus = "completed" | "active" | "upcoming";

/**
 * Where an era sits relative to the reader, which is not the same question as
 * whether it has been written up. Uranus in Gemini is running now and has no
 * reading; that pairing is normal for the era you are standing in, and the two
 * facts are reported separately rather than collapsed into one dashed edge.
 */
export function uranusEraStatus(era: UranusEraOverview, year: number): UranusEraStatus {
  const { startYear, endYear } = uranusEraYears(era.dates);
  if (year >= endYear) return "completed";
  if (year >= startYear) return "active";
  return "upcoming";
}

/**
 * What the readings on either side say this era is for.
 *
 * Every reading closes by naming the era before it and the era after it, so an
 * era with no reading of its own is still spoken about by its neighbours. It
 * is the only thing an unread era has to offer, and it is already written.
 */
export function forwardLine(sign: string): string | null {
  for (const reading of URANUS_ERA_READINGS) {
    if (reading.sign === sign) continue;
    const step = reading.eraLogic.find((s) => s.sign === sign);
    if (step) return step.line;
  }
  return null;
}

/** Returns the full reading for a sign, or null if not yet written. */
export function getEraReading(sign: string): UranusEraReading | null {
  return URANUS_ERA_READINGS.find((r) => r.sign === sign) ?? null;
}

// Keep the old type alias so existing imports of `UranusMusicEra` don't break.
export type UranusMusicEra = UranusEraOverview;
