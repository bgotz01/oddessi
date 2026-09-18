// lib/industry/music-eras-data.ts

export type EraStatus = "completed" | "active" | "upcoming";

export type EvidenceItem = {
  name: string;
  examples?: string;
};

export type Evidence = {
  label: string;
  items: EvidenceItem[];
};

export type MusicEra = {
  sign: string;
  symbol: string;
  dates: string;
  startYear: number;
  endYear: number;
  color: string;
  status: EraStatus;
  // Concise editorial copy used by the overview table.
  comparison: {
    expression: string;
    examples: string[];
  };
  // Overview table dimensions
  archetype: string;
  element: string;
  culturalUnit: string;
  expression: string;
  audience: string;
  structure: string;
  examples: string;
  distribution: string;
  genres: (string | {
    name: string;
    artists: string[];
    demonstrates: string;
  })[];
  earlySignal: {
    artist: string;
    breakthrough: string;
    year: number;
  };
  pivotalMoment: {
    shift: string;
    effect: string;
  };
  // Drawer detail
  archetypeNote: string;
  musicCulture: string;
  evidence: Evidence;
  expanded: string;
};

export const MUSIC_ERAS: MusicEra[] = [
  {
    sign: "Sagittarius",
    earlySignal: { artist: "The Beatles", breakthrough: "Sgt. Pepper’s Lonely Hearts Club Band", year: 1967 },
    pivotalMoment: { shift: "Woodstock / festival culture", effect: "Music becomes a mass shared experience of exploration" },
    comparison: {
      expression: "Energy & experimentation",
      examples: ["David Bowie", "Bob Marley", "Led Zeppelin"],
    },
    genres: ["Rock", "Disco", "Punk", "Funk", "Reggae", "Early electronic"],
    distribution: "Albums, radio & live shows",
    symbol: "♐",
    dates: "1970–1984",
    startYear: 1970,
    endYear: 1984,
    color: "#e07a50",
    status: "completed",
    archetype: "The Explorers",
    element: "Fire",
    culturalUnit: "Experience",
    expression: "Energy",
    audience: "Experience",
    structure: "Expansion",
    examples: "Bowie · Pink Floyd · Marley",
    archetypeNote:
      "Sagittarius idealizes expansion and adventure. Music becomes a vehicle for freedom — from convention, from borders, from the previous generation's rules. The listener is a seeker; the artist is a guide to new territory.",
    musicCulture:
      "Rock, Disco, Punk, Funk, Reggae, and early electronic music all emerge or peak in this era. Genre boundaries are porous; what matters is energy and exploration. The music industry expands globally as album sales soar.",
    evidence: {
      label: "The Explorers",
      items: [
        { name: "Led Zeppelin" },
        { name: "Pink Floyd" },
        { name: "Queen" },
        { name: "ABBA" },
        { name: "Bee Gees" },
        { name: "David Bowie" },
        { name: "The Rolling Stones" },
        { name: "Bob Marley" },
        { name: "Parliament / Funkadelic" },
      ],
    },
    expanded: `
      Sagittarius's Neptune idealizes expansion, adventure, and the search for meaning beyond inherited structures. In music, this produces an era of restless genre exploration — rock, disco, punk, reggae, funk, and early electronics all bloom simultaneously, each promising a different kind of freedom.

      The music industry itself expands rapidly. Album sales grow through the 1970s as vinyl becomes the dominant format and stadium concerts become a business. But the culture isn't about the industry — it's about what the music opens up.

      The listener in this era is a seeker. Music isn't just entertainment; it's a passport to another way of being. David Bowie's constant reinvention and Bob Marley's spiritual reach — all point outward, toward new territory.

      The era ends as Capricorn's institutional logic arrives. The record industry consolidates, MTV launches in 1981, and the machinery of superstar culture begins to form.
    `,
  },
  {
    sign: "Capricorn",
    earlySignal: { artist: "Michael Jackson", breakthrough: "Thriller", year: 1982 },
    pivotalMoment: { shift: "MTV", effect: "Visual media and labels concentrate attention around superstars" },
    comparison: {
      expression: "Polish & spectacle",
      examples: ["Michael Jackson", "Madonna", "Prince"],
    },
    genres: ["Pop", "R&B", "Rock", "Hip-hop", "Grunge", "Heavy metal"],
    distribution: "Labels, MTV & mass-market CDs",
    symbol: "♑",
    dates: "1984–1998",
    startYear: 1984,
    endYear: 1998,
    color: "#8ebf7a",
    status: "completed",
    archetype: "The Hierarchy",
    element: "Earth",
    culturalUnit: "Star",
    expression: "Polish / Form",
    audience: "Admire",
    structure: "Concentration",
    examples: "Michael Jackson · Madonna · Prince",
    archetypeNote:
      "Power flows through institutional hierarchies. A small number of massive labels, MTV, and radio stations decide what gets heard. The star is a product of this system — polished, packaged, and distributed at scale.",
    musicCulture:
      "Superstar culture. Labels, MTV, radio, and CDs concentrate attention on a small number of mass-market artists. The goal is to become the biggest in the world.",
    evidence: {
      label: "The Stars",
      items: [
        { name: "Michael Jackson" },
        { name: "Madonna" },
        { name: "Prince" },
        { name: "Whitney Houston" },
        { name: "Mariah Carey" },
        { name: "Metallica" },
      ],
    },
    expanded: `
      Capricorn's Neptune idealizes institutional power. In music, the result is an unprecedented concentration of influence: a handful of major labels decide what gets made, MTV decides what gets seen, and radio decides what gets heard.

      The superstar is not just an artist but a product of this system — carefully constructed, expensively produced, and distributed at global scale. To make it means climbing the hierarchy and winning its approval.

    `,
  },
  {
    sign: "Aquarius",
    earlySignal: { artist: "Nirvana", breakthrough: "Nevermind", year: 1991 },
    pivotalMoment: { shift: "MP3 + Internet / Napster", effect: "Breaks centralized distribution; listeners find niche scenes" },
    comparison: {
      expression: "Lyrics & identity",
      examples: ["Eminem", "Kanye West", "Linkin Park"],
    },
    genres: ["Hip-hop", "Emo", "Nu-metal", "Indie rock"],
    distribution: "File-sharing, forums & blogs",
    symbol: "♒",
    dates: "1998–2012",
    startYear: 1998,
    endYear: 2012,
    color: "#7dc0d8",
    status: "completed",
    archetype: "The Tribes",
    element: "Air",
    culturalUnit: "Artist / Scene",
    expression: "Lyrics / Meaning",
    audience: "Listen",
    structure: "Fragmentation",
    examples: "Eminem · Kanye · Linkin Park",
    archetypeNote:
      "The internet fractures the monoculture. Listeners no longer share a single radio dial — they belong to scenes with their own aesthetics, values, and communities. Identity is tribal: which music you're into says who you are.",
    musicCulture:
      "Distinct scenes and identities. The internet fragments the monoculture into subcultures — emo, nu-metal, and indie rock. Listeners belong to particular musical communities with their own aesthetics and values.",
    evidence: {
      label: "Aquarius / Air — Expression · Idea / Identity",
      items: [
        { name: "Eminem", examples: "Words / persona / provocation" },
        { name: "Kanye West", examples: "Ideas / personality / commentary" },
        { name: "Green Day", examples: "Political / social content" },
        { name: "My Chemical Romance", examples: "Narrative / identity" },
        { name: "Linkin Park", examples: "Alienation articulated through lyrics" },
        { name: "The Strokes", examples: "Attitude / voice" },
      ],
    },
    expanded: `
      Aquarius builds networks, and Neptune idealizes connection. As the internet develops, listeners can find their people — communities organized around specific sounds rather than whatever the majors are pushing.

      Napster (1999) cracks the old distribution model wide open. File-sharing, forums, and blogs allow scenes to grow independently of label infrastructure. A band can build a devoted following before any industry attention arrives.

      The identity shift is significant. In the Capricorn era, aspiration was aspirational — you wanted to be as big as Michael Jackson. In Aquarius, authenticity means choosing a side. The question is which scene you belong to, and the answer says something about who you are.
    `,
  },
  {
    sign: "Pisces",
    earlySignal: { artist: "Daft Punk", breakthrough: "Discovery", year: 2001 },
    pivotalMoment: { shift: "Streaming + Bedroom production / DAW", effect: "Breaks the studio boundary; anyone can participate in a shared sonic language" },
    comparison: {
      expression: "Rhythm & atmosphere",
      examples: ["EDM", "Trap", "Reggaeton"],
    },
    genres: [
      {
        name: "EDM",
        artists: ["Avicii", "Calvin Harris", "David Guetta"],
        demonstrates: "Euphoria, festivals, producer/collaboration model",
      },
      {
        name: "Trap",
        artists: ["Future", "Travis Scott", "Metro Boomin"],
        demonstrates: "Mood, atmosphere, shared production grammar",
      },
      {
        name: "Reggaeton",
        artists: ["Bad Bunny", "J Balvin", "Daddy Yankee"],
        demonstrates: "Rhythm, movement, global collective sound",
      },
      "Tech house",
      "Afrobeats",
      "K-pop",
    ],
    distribution: "Streaming, playlists & festivals",
    symbol: "♓",
    dates: "2012–2026",
    startYear: 2012,
    endYear: 2026,
    color: "#7899d4",
    status: "completed",
    archetype: "The Collective",
    element: "Water",
    culturalUnit: "Sound / Genre",
    expression: "Rhythm / Feeling",
    audience: "Dance / Feel",
    structure: "Convergence",
    examples: "EDM · Reggaeton · Trap",
    archetypeNote:
      "Streaming collapses the tribal distinctions. Genre becomes a mood rather than an identity. The playlist is the new album. You don't pick a scene — you flow between sounds depending on what you feel right now.",
    musicCulture:
      "Genre boundaries dissolve. Streaming platforms and playlists create shared musical culture across formerly distinct audiences. The vibe of a moment matters more than genre loyalty.",
    evidence: {
      label: "Pisces / Water — Expression · Mood / Emotion",
      items: [
        { name: "EDM", examples: "Euphoria" },
        { name: "Trap", examples: "Mood / atmosphere" },
        { name: "Reggaeton", examples: "Sensuality / movement" },
        { name: "Tech House", examples: "Groove / physical state" },
        { name: "Afrobeats", examples: "Rhythm / warmth" },
      ],
    },
    expanded: `
      Pisces dissolves boundaries. Where Aquarius produced distinct scenes with real identity stakes, Pisces streaming culture flows across all of them. Spotify's algorithm doesn't care which scene you belong to — it just finds the next track that keeps you listening.

      The playlist replaces the album. The festival replaces the scene-specific show. Genre becomes a mood descriptor rather than a tribal marker.

      The primary unit is no longer the artist — it's the sound. Drake is the exception that proves the rule: genuinely impossible to genre-classify, optimized for streams, emotionally resonant without being particularly specific. He belongs everywhere and nowhere.

      The era also sees the global reach of previously regional sounds — reggaeton, Afrobeats, K-pop — absorbed into the same algorithm-driven mainstream. Boundaries dissolve not just within Western genres but across cultures.
    `,
  },
  {
    sign: "Aries",
    earlySignal: { artist: "Billie Eilish", breakthrough: "When We All Fall Asleep, Where Do We Go?", year: 2019 },
    pivotalMoment: { shift: "TBD", effect: "Presumably breaks the boundary around the collective" },
    comparison: {
      expression: "Identity & direction",
      examples: ["To be observed"],
    },
    genres: [],
    distribution: "Direct artist–audience connections?",
    symbol: "♈",
    dates: "2026–2040",
    startYear: 2026,
    endYear: 2040,
    color: "#c97fb0",
    status: "upcoming",
    archetype: "The Pioneer",
    element: "Fire",
    culturalUnit: "Artist / World",
    expression: "Identity / Direction",
    audience: "Follow",
    structure: "Differentiation",
    examples: "TBD",
    archetypeNote:
      "Hypothesis: the dissolution of genre identity and the collapse of scene culture eventually produces a counter-reaction. Individual distinctiveness returns as a value. The question shifts from 'what do I feel?' to 'who made this and why?'",
    musicCulture:
      "Emerging hypothesis: differentiation and individual identity return. As AI floods the zone with genre-fluid content, human distinctiveness and artistic mission become scarce and therefore valuable.",
    evidence: {
      label: "Unknown",
      items: [
        { name: "TBD", examples: "This era begins in 2026 — we don't yet know its defining artists" },
      ],
    },
    expanded: `
      This is a hypothesis, not a history.

      If Pisces dissolved all genre identity into algorithmic flow, the eventual reaction may be a return to distinctiveness. When AI can generate infinite genre-appropriate content on demand, the thing that becomes rare is an artist with a recognizable voice and a specific point of view.

      The Aries archetype is not the Capricorn superstar — that was about institutional scale. It's the protagonist: someone doing something specific, for a reason, in a way nobody else does.

      The question shifts. In Pisces: "play me something that feels like this." In Aries: "what is this artist actually about?"

      Whether this plays out as predicted remains to be seen.
    `,
  },
];

// ── Inversion tables ──────────────────────────────────────────────────────────

export type InversionRow = {
  axis: string;
  from: string;
  to: string;
};

export type ContrastRow = {
  from: string;
  to: string;
};

export type Inversion = {
  fromSign: string;
  toSign: string;
  tagline: string;
  rows: InversionRow[];
  contrast?: ContrastRow[];
};

export const INVERSIONS: Inversion[] = [
  {
    fromSign: "Sagittarius",
    toSign: "Capricorn",
    tagline: '"How far can we go?" → "How big can we get?"',
    rows: [
      { axis: "Cultural unit", from: "Experience", to: "Star" },
      { axis: "Expression", from: "Energy / Experimentation", to: "Polish / Spectacle" },
      { axis: "Audience", from: "Discover something new", to: "Admire the star" },
      { axis: "Structure", from: "Expansion", to: "Concentration" },
      { axis: "Identity", from: "Explore new territory", to: "Become a global icon" },
      { axis: "Direction", from: "Push creative boundaries", to: "Reach a mass audience" },
    ],
  },
  {
    fromSign: "Capricorn",
    toSign: "Aquarius",
    tagline: "Hierarchy → Network · Centralized distribution → Peer-to-peer",
    rows: [
      { axis: "Artist", from: "Superstar", to: "Outsider" },
      { axis: "Aesthetic", from: "Polished", to: "Distinctive" },
      { axis: "Culture", from: "Mainstream", to: "Subcultures" },
      { axis: "Structure", from: "Hierarchy", to: "Tribes" },
      { axis: "Gatekeeping", from: "Institutional", to: "Fragmented" },
      { axis: "Distribution", from: "Physical", to: "Digital" },
      { axis: "Audience", from: "Mass market", to: "Scenes" },
      { axis: "Belonging", from: "Aspiration", to: "Identity" },
      { axis: "Symbol", from: "Star", to: "Rebel" },
    ],
  },
  {
    fromSign: "Aquarius",
    toSign: "Pisces",
    tagline: 'Aquarius says: "Be different." · Pisces says: "Feel the same thing together."',
    rows: [
      { axis: "Focus", from: "Artist", to: "Sound" },
      { axis: "Value", from: "Difference", to: "Feeling" },
      { axis: "Structure", from: "Tribes", to: "Collective" },
      { axis: "Genres", from: "Identity markers", to: "Fluid environments" },
      { axis: "Listening", from: "Artist / scene", to: "Genre / mood" },
      { axis: "Discovery", from: "Communities", to: "Algorithms / playlists" },
      { axis: "Live", from: "Different shows", to: "Shared festivals" },
      { axis: "Audience", from: '"I\'m into ___."', to: '"I listen to everything."' },
      { axis: "Production", from: "Distinct aesthetics", to: "Shared sonic grammar" },
      { axis: "Belonging", from: "Find your tribe", to: "Join the experience" },
      { axis: "Symbol", from: "Outsider", to: "Crowd" },
    ],
  },
  {
    fromSign: "Pisces",
    toSign: "Aries",
    tagline: "The collective dissolves back into the individual — but now with a mission.",
    rows: [
      { axis: "Archetype", from: "The Collective", to: "The Pioneers" },
      { axis: "Cultural unit", from: "Sound / Genre", to: "Creator" },
      { axis: "Value", from: "Feeling", to: "Originality" },
      { axis: "Structure", from: "Convergence", to: "Differentiation" },
      { axis: "Artist role", from: "Participate in a sound", to: "Create a new sound" },
      { axis: "Identity", from: "Blended", to: "Distinct" },
    ],
    contrast: [
      { from: "Pick a sound", to: "Invent your world" },
      { from: '"I make tech house"', to: '"I make my music"' },
      { from: "Genre defines artist", to: "Artist defines sound" },
      { from: "Shared production grammar", to: "Signature production grammar" },
      { from: "Fit the playlist", to: "Playlist has to accommodate you" },
      { from: "Collaborate into ecosystem", to: "Build an ecosystem around yourself" },
      { from: "Audience follows genre", to: "Audience follows artist" },
    ],
  },
];

// ── Overview table dimensions ─────────────────────────────────────────────────

export type DimensionKey = keyof Pick<
  MusicEra,
  "archetype" | "element" | "culturalUnit" | "expression" | "audience" | "structure" | "examples"
>;

export const DIMENSIONS: { key: DimensionKey; label: string }[] = [
  { key: "archetype", label: "Archetype" },
  { key: "element", label: "Element" },
  { key: "culturalUnit", label: "Cultural unit" },
  { key: "expression", label: "Expression" },
  { key: "audience", label: "Audience" },
  { key: "structure", label: "Structure" },
  { key: "examples", label: "Examples" },
];
