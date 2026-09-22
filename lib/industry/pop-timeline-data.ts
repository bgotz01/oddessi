export type PopArtist = {
  name: string;
  peaks: readonly (readonly [number, number | null])[];
  description: string;
};
export type PopEra = {
  decade: number;
  title: string;
  catalyst: string;
  /** Representative mainstream genres and crossover styles, not a ranking. */
  genres: string[];
  metric: string;
  description: string;
  artists: PopArtist[];
};

// Editorial peak windows supplied for this timeline, not full career spans.
// null denotes an ongoing peak rather than a predicted end year.
export const POP_ERAS: PopEra[] = [
  {
    genres: ["Beat / pop rock", "Soul / Motown", "Surf pop", "Folk rock", "Psychedelic pop"],
    decade: 1960, title: "The Dawn of Global Pop & Beatlemania", catalyst: "British Invasion / Motown", metric: "7-inch singles & radio saturation",
    description: "The British Invasion, Motown, and studio experimentation transformed radio hits into global cultural phenomena.",
    artists: [
      { name: "The Beatles", peaks: [[1963, 1969]], description: "Rewrote the rules of global fan hysteria, songwriting, and studio recording." },
      { name: "Elvis Presley", peaks: [[1960, 1962], [1968, 1973]], description: "A major chart presence after the army, revitalized by the ’68 Comeback Special." },
      { name: "The Supremes", peaks: [[1964, 1967]], description: "Motown’s crown jewel, combining a string of number-one singles with extraordinary crossover appeal." },
      { name: "The Rolling Stones", peaks: [[1965, 1972]], description: "Brought a gritty, blues-rock edge to the decade’s pop and counterculture." },
      { name: "The Beach Boys", peaks: [[1963, 1966]], description: "Pioneered complex vocal harmonies and intricate pop production on Pet Sounds." },
    ],
  },
  {
    genres: ["Disco", "Glam rock", "Soft rock", "Funk / soul", "Singer-songwriter pop"],
    decade: 1970, title: "Disco, Glam, and Stadium Anthem Pop", catalyst: "Disco & glam rock", metric: "LP album units & arena touring",
    description: "Disco, singer-songwriter pop, and theatrical glam became mass-market forces in an era of blockbuster albums.",
    artists: [
      { name: "Elton John", peaks: [[1972, 1976]], description: "Paired a remarkable run of multi-platinum albums with theatrical showmanship." },
      { name: "ABBA", peaks: [[1974, 1980]], description: "Built an international Euro-pop hit machine through meticulous studio production." },
      { name: "Bee Gees", peaks: [[1975, 1979]], description: "Reinvented their sound to lead the disco phenomenon with Saturday Night Fever." },
      { name: "Queen", peaks: [[1975, 1981]], description: "Blended operatic pop structures with arena-shaking stadium rock." },
      { name: "Fleetwood Mac", peaks: [[1975, 1979]], description: "Refined California soft rock into blockbuster pop with Rumours." },
    ],
  },
  {
    genres: ["Synth-pop", "Dance-pop", "New wave", "Contemporary R&B", "Pop rock"],
    decade: 1980, title: "The MTV Era & The Megastar Archetype", catalyst: "The birth of MTV", metric: "Music video rotation & global monoculture",
    description: "MTV made the music video central to pop, helping create a generation of visually distinctive global megastars.",
    artists: [
      { name: "Michael Jackson", peaks: [[1982, 1988]], description: "Broke racial barriers on music television and reached extraordinary commercial heights with Thriller and Bad." },
      { name: "Madonna", peaks: [[1984, 1990]], description: "Helped define the modern female pop star through provocative art, video imagery, and dance-pop." },
      { name: "Prince", peaks: [[1982, 1988]], description: "Married funk, rock, and pop, reaching a global breakthrough with Purple Rain." },
      { name: "Whitney Houston", peaks: [[1985, 1993]], description: "Set a benchmark for pop vocal power with a record-breaking run of early number-ones." },
      { name: "Phil Collins", peaks: [[1981, 1989]], description: "Shaped the decade’s radio and production sound, both solo and with Genesis." },
    ],
  },
  {
    genres: ["Teen pop", "Contemporary R&B", "Hip-hop", "Eurodance", "Adult contemporary"],
    decade: 1990, title: "Teen Pop Resurgence & The Vocal Divas", catalyst: "CD boom & teen pop", metric: "Physical CD sales & blockbuster soundtracks",
    description: "Grand vocal ballads shared the charts with a resurgent teen-pop movement and global girl- and boy-group mania.",
    artists: [
      { name: "Mariah Carey", peaks: [[1990, 1999]], description: "A defining chart force of the decade, pairing vocal virtuosity with pop and R&B songwriting." },
      { name: "Céline Dion", peaks: [[1993, 1998]], description: "Reached global vocal stardom, including the signature soundtrack moment of Titanic." },
      { name: "Backstreet Boys", peaks: [[1997, 2001]], description: "Led a multi-platinum boy-band wave that shaped global youth culture." },
      { name: "Britney Spears", peaks: [[1998, 2004]], description: "Reenergized teen pop and became a defining icon of the millennium." },
      { name: "Spice Girls", peaks: [[1996, 1998]], description: "Ignited global Spice Mania and renewed the cultural force of the pop group." },
    ],
  },
  {
    genres: ["Dance-pop", "Contemporary R&B", "Hip-hop", "Electropop", "Pop punk"],
    decade: 2000, title: "Digital Transition & Hip-Hop/R&B Crossover", catalyst: "MP3s & hip-hop/R&B crossover", metric: "Digital downloads & ringtone sales",
    description: "Producers such as Timbaland and The Neptunes reshaped mainstream pop as digital downloads began replacing CDs.",
    artists: [
      { name: "Eminem", peaks: [[1999, 2004]], description: "Turned raw hip-hop into a dominant mainstream commercial force." },
      { name: "Beyoncé", peaks: [[2003, 2009]], description: "Moved from Destiny’s Child to a defining solo career at the intersection of pop and R&B." },
      { name: "Justin Timberlake", peaks: [[2002, 2007]], description: "Bridged sleek R&B production and mainstream pop accessibility." },
      { name: "Rihanna", peaks: [[2007, 2012]], description: "Launched a sustained run of dance-pop and R&B anthems, with Umbrella as a turning point." },
      { name: "Lady Gaga", peaks: [[2008, 2011]], description: "Brought theatrical performance art and electronic synth-pop into the mainstream spotlight." },
    ],
  },
  {
    genres: ["EDM / dance-pop", "Trap / melodic rap", "Indie pop", "Reggaeton / Latin pop", "K-pop"],
    decade: 2010, title: "The Digital Boom", catalyst: "The digital boom", metric: "On-demand streams & stadium tours",
    description: "Streaming, smartphones, social platforms, and digital distribution reshaped how music was discovered, shared, and consumed, creating space for stadium singer-songwriters and playlist superstars.",
    artists: [
      { name: "Taylor Swift", peaks: [[2012, null]], description: "Pivoted from country into global pop, with 1989 marking a defining early peak." },
      { name: "Adele", peaks: [[2011, 2016]], description: "Defied declining physical sales with the blockbuster albums 21 and 25." },
      { name: "Drake", peaks: [[2015, 2021]], description: "United melodic rap, R&B, and dancehall in a defining sound of the streaming generation." },
      { name: "Bruno Mars", peaks: [[2010, 2018]], description: "Channeled retro funk, soul, and classic showmanship into major pop singles." },
      { name: "Ed Sheeran", peaks: [[2014, 2019]], description: "Turned acoustic songwriting and loop-pedal performance into global stadium pop." },
    ],
  },
  {
    genres: ["Synth-pop", "Disco-pop", "Alt-pop", "Dance-pop", "K-pop"],
    decade: 2020, title: "Algorithmic Pop & Cultural Renaissance", catalyst: "Short-form video & global pop", metric: "Algorithmic virality & global chart integration",
    description: "Short-form video, an ’80s synth revival, and increasingly international charts shape this chapter of pop.",
    artists: [
      { name: "Taylor Swift", peaks: [[2020, null]], description: "Reached a renewed career peak, with The Eras Tour becoming a landmark in global touring." },
      { name: "The Weeknd", peaks: [[2020, 2023]], description: "Turned cinematic ’80s synth revivalism into pop gold with Blinding Lights." },
      { name: "Billie Eilish", peaks: [[2019, null]], description: "Brought minimalist alt-pop and intimate vocals to the mainstream, with major Grammy and Oscar recognition." },
      { name: "Dua Lipa", peaks: [[2020, 2022]], description: "Reenergized lockdown-era pop with the bass-heavy disco of Future Nostalgia." },
      { name: "BTS", peaks: [[2020, 2022]], description: "Expanded K-pop’s reach on Western radio and global mainstream charts." },
    ],
  },
];

export function peakLabel(artist: PopArtist): string {
  return artist.peaks.map(([start, end]) => `${start}–${end ?? "Present"}`).join(" & ");
}

export const POP_ERA_COLORS = ["#c28a63", "#b1a86b", "#7eab91", "#71a5ba", "#8b98c3", "#ad8dab", "#c18c96"];
export const POP_ERA_SOUNDS = ["Beat & Motown", "Disco & glam", "MTV megastars", "Divas & teen pop", "Digital crossover", "Digital boom", "Global pop"];
