export type MusicTechnology = {
  /** Display label for the approximate era, e.g. "1930s–40s" */
  era: string;
  /** Sortable start year used for ordering */
  startYear: number;
  /** Technology name */
  name: string;
  /** Compact label for timeline views. */
  shortLabel?: string;
  /** What the technology disrupted */
  disruption: string;
  /** Whether this is still emerging / not yet fully established */
  emerging?: boolean;
};

export const MUSIC_TECHNOLOGIES: MusicTechnology[] = [
  {
    era: "1930s–40s",
    startYear: 1930,
    name: "Electric guitar",
    disruption: "Guitar could compete with louder ensembles; eventually enabled entirely new guitar sounds",
  },
  {
    era: "1940s–50s",
    startYear: 1940,
    name: "Magnetic tape",
    disruption: "Recording became editable rather than simply captured live",
  },
  {
    era: "1950s",
    startYear: 1950,
    name: "Multitrack recording",
    disruption: "Performances no longer had to happen simultaneously",
  },
  {
    era: "1950s–60s",
    startYear: 1955,
    name: "Guitar effects / amplification",
    shortLabel: "Distortion",
    disruption: "Distortion, reverb and effects turn electronics into part of the instrument",
  },
  {
    era: "1960s",
    startYear: 1960,
    name: "Synthesizer",
    shortLabel: "Synths",
    disruption: "Sound could be electronically generated rather than acoustically produced",
  },
  {
    era: "1960s–70s",
    startYear: 1965,
    name: "Advanced multitracking / studio effects",
    shortLabel: "Multitracking",
    disruption: "Studio itself becomes a compositional instrument",
  },
  {
    era: "1970s",
    startYear: 1970,
    name: "Portable / polyphonic synthesizers",
    shortLabel: "Poly synths",
    disruption: "Electronic sounds become practical within bands and commercial recording",
  },
  {
    era: "1970s",
    startYear: 1972,
    name: "Sequencers",
    shortLabel: "Sequencers",
    disruption: "Musical patterns can be programmed and repeated automatically",
  },
  {
    era: "Late 1970s–80s",
    startYear: 1977,
    name: "Drum machines",
    shortLabel: "Drum machines",
    disruption: "Rhythm can be programmed without a drummer",
  },
  {
    era: "Late 1970s–80s",
    startYear: 1979,
    name: "Digital sampling",
    shortLabel: "Sampling",
    disruption: "Existing recorded sound becomes raw material for new music",
  },
  {
    era: "1981",
    startYear: 1981,
    name: "MTV / music television",
    shortLabel: "MTV",
    disruption: "Music videos become a major channel for artist discovery, promotion and visual identity",
  },
  {
    era: "1983",
    startYear: 1983,
    name: "MIDI",
    shortLabel: "MIDI",
    disruption: "Electronic instruments and computers can communicate through a common standard",
  },
  {
    era: "1980s",
    startYear: 1984,
    name: "Digital recording / CDs",
    shortLabel: "Digital / CDs",
    disruption: "Audio moves from analog toward digital infrastructure",
  },
  {
    era: "Late 1980s–90s",
    startYear: 1988,
    name: "Computer-based sequencing",
    shortLabel: "Sequencing",
    disruption: "Increasing portions of songs can be constructed inside computers",
  },
  {
    era: "1990s",
    startYear: 1991,
    name: "Digital audio workstations",
    shortLabel: "DAWs",
    disruption: "Recording, editing and arranging converge into software",
  },
  {
    era: "1990s",
    startYear: 1993,
    name: "Internet / web distribution",
    shortLabel: "Internet",
    disruption: "Websites and online networks create new paths for music discovery, fan communities and digital distribution",
  },
  {
    era: "1990s",
    startYear: 1995,
    name: "MP3 compression",
    shortLabel: "MP3s",
    disruption: "Music becomes a practical digital file",
  },
  {
    era: "1999",
    startYear: 1999,
    name: "Peer-to-peer file sharing",
    shortLabel: "File sharing",
    disruption: "Distribution can bypass physical media and centralized sellers",
  },
  {
    era: "2000s",
    startYear: 2000,
    name: "Software instruments / plugins",
    shortLabel: "Plugins",
    disruption: "Synths, effects and processors move from hardware into software",
  },
  {
    era: "2000s",
    startYear: 2002,
    name: "Affordable home recording",
    shortLabel: "Home studios",
    disruption: "Professional-capability production moves out of commercial studios",
  },
  {
    era: "2000s",
    startYear: 2004,
    name: "Digital DJ systems",
    shortLabel: "Digital DJ",
    disruption: "DJing becomes increasingly software/file based",
  },
  {
    era: "2000s–10s",
    startYear: 2005,
    name: "Online video / social platforms",
    shortLabel: "Online video",
    disruption: "Distribution and discovery can bypass traditional media gatekeepers",
  },
  {
    era: "2010s",
    startYear: 2010,
    name: "Smartphones",
    shortLabel: "Smartphones",
    disruption: "Recording, consumption, promotion and distribution become permanently mobile",
  },
  {
    era: "2010s",
    startYear: 2012,
    name: "Streaming",
    shortLabel: "Streaming",
    disruption: "Access replaces ownership as the dominant consumption model",
  },
  {
    era: "2010s",
    startYear: 2015,
    name: "Cloud distribution",
    shortLabel: "Cloud releases",
    disruption: "Essentially anyone can release globally without manufacturing inventory",
  },
  {
    era: "Late 2010s–20s",
    startYear: 2017,
    name: "Short-form algorithmic video",
    shortLabel: "Short-form video",
    disruption: "Discovery shifts toward clips, feeds and viral moments",
  },
  {
    era: "2020s",
    startYear: 2020,
    name: "Generative AI",
    shortLabel: "Generative AI",
    disruption: "Potential automation/generation of vocals, composition and production",
    emerging: true,
  },
];
