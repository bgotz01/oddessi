// lib/industry/music-neptune-artists-data.ts

import type { MusicEra } from "@/lib/industry/music-eras-data";

/**
 * What each Neptune era's early, inflection and late thirds sounded like.
 *
 * Neptune on this site is the artist and the ideal, not the industry, so the
 * evidence is who the culture was idealizing and when. Each phase names the
 * genres that defined it, with their artists, and keeps mainstream pop in a
 * lane of its own — so a pop star is never read as the face of a genre they
 * only shared a chart with.
 *
 * Placement is editorial, by hand: an artist can recur across phases (pop
 * stars do), which a single computed window could not express. Peak years are
 * judgments of the run the artist is placed for, not chart data and not full
 * career spans.
 */

export type NeptunePhase = "early" | "inflection" | "late";

export const NEPTUNE_PHASES: { key: NeptunePhase; label: string }[] = [
  { key: "early", label: "Early" },
  { key: "inflection", label: "Inflection" },
  { key: "late", label: "Late" },
];

export type NeptuneArtist = {
  name: string;
  /** Peak window, inclusive. */
  peak: readonly [number, number];
};

export type NeptuneGenre = { name: string; artists: NeptuneArtist[] };

export type NeptunePhaseMusic = {
  /** The sounds that defined the phase. */
  genres: NeptuneGenre[];
  /** Mainstream pop running alongside them. */
  pop: NeptuneArtist[];
};

const a = (name: string, start: number, end: number): NeptuneArtist => ({ name, peak: [start, end] });

const EMPTY: NeptunePhaseMusic = { genres: [], pop: [] };

export const NEPTUNE_PHASE_MUSIC: Record<string, Record<NeptunePhase, NeptunePhaseMusic>> = {
  Scorpio: {
    early: {
      genres: [
        { name: "Rock & roll", artists: [a("Elvis Presley", 1956, 1958), a("Little Richard", 1955, 1958), a("Chuck Berry", 1955, 1959), a("Buddy Holly", 1957, 1959)] },
        { name: "R&B", artists: [a("Ray Charles", 1959, 1962), a("Fats Domino", 1955, 1957)] },
      ],
      pop: [a("Everly Brothers", 1957, 1960), a("Paul Anka", 1957, 1960), a("Connie Francis", 1958, 1962)],
    },
    inflection: {
      genres: [
        { name: "Merseybeat", artists: [a("The Beatles", 1963, 1966), a("Gerry & the Pacemakers", 1963, 1964)] },
        { name: "Folk revival", artists: [a("Bob Dylan", 1963, 1966), a("Peter, Paul and Mary", 1962, 1964)] },
      ],
      pop: [a("The Beach Boys", 1963, 1966), a("The Ronettes", 1963, 1964), a("Sam Cooke", 1960, 1964), a("The Supremes", 1964, 1967)],
    },
    late: {
      genres: [
        { name: "Psychedelic rock", artists: [a("Jimi Hendrix", 1967, 1970), a("The Doors", 1967, 1970), a("Janis Joplin", 1967, 1970)] },
        { name: "Soul", artists: [a("Aretha Franklin", 1967, 1969), a("James Brown", 1965, 1970), a("Otis Redding", 1965, 1967)] },
      ],
      pop: [a("The Monkees", 1966, 1968), a("Simon & Garfunkel", 1966, 1970), a("The Mamas & the Papas", 1966, 1967)],
    },
  },
  Sagittarius: {
    early: {
      genres: [
        { name: "Hard & glam rock", artists: [a("Led Zeppelin", 1969, 1975), a("David Bowie", 1972, 1975)] },
        { name: "Singer-songwriter", artists: [a("Joni Mitchell", 1970, 1975), a("Carole King", 1971, 1973)] },
      ],
      pop: [a("Elton John", 1972, 1976), a("Stevie Wonder", 1972, 1976), a("The Carpenters", 1970, 1975)],
    },
    inflection: {
      genres: [
        { name: "Disco", artists: [a("Bee Gees", 1975, 1979), a("Donna Summer", 1975, 1979)] },
        { name: "Punk", artists: [a("Sex Pistols", 1976, 1978), a("Ramones", 1976, 1978)] },
      ],
      pop: [a("Fleetwood Mac", 1975, 1979), a("ABBA", 1974, 1980), a("Queen", 1975, 1981)],
    },
    late: {
      genres: [
        { name: "New wave", artists: [a("Blondie", 1978, 1981), a("The Police", 1979, 1983), a("Talking Heads", 1978, 1983)] },
        { name: "Synth-pop", artists: [a("Duran Duran", 1981, 1985), a("The Human League", 1981, 1982)] },
      ],
      pop: [a("Hall & Oates", 1980, 1984), a("Olivia Newton-John", 1978, 1982), a("Lionel Richie", 1981, 1986)],
    },
  },
  Capricorn: {
    early: {
      genres: [
        { name: "Dance-pop", artists: [a("Madonna", 1984, 1990), a("Cyndi Lauper", 1983, 1986)] },
        { name: "Hip-hop", artists: [a("Run-DMC", 1984, 1988), a("Beastie Boys", 1986, 1987)] },
      ],
      pop: [a("Michael Jackson", 1982, 1988), a("Prince", 1982, 1988), a("Whitney Houston", 1985, 1988), a("George Michael", 1984, 1990)],
    },
    inflection: {
      genres: [
        { name: "Gangsta rap", artists: [a("N.W.A / Dr. Dre", 1988, 1993), a("Ice Cube", 1990, 1992)] },
        { name: "Grunge", artists: [a("Nirvana", 1991, 1994), a("Pearl Jam", 1991, 1994)] },
      ],
      pop: [a("Janet Jackson", 1989, 1993), a("Paula Abdul", 1988, 1991), a("Whitney Houston", 1990, 1992), a("New Kids on the Block", 1988, 1990)],
    },
    late: {
      genres: [
        { name: "East / West Coast rap", artists: [a("Tupac Shakur", 1993, 1996), a("The Notorious B.I.G.", 1994, 1997), a("Snoop Dogg", 1993, 1994)] },
        { name: "Britpop", artists: [a("Oasis", 1994, 1997), a("Blur", 1994, 1997)] },
      ],
      pop: [a("Mariah Carey", 1993, 1997), a("Céline Dion", 1993, 1998), a("Spice Girls", 1996, 1998), a("TLC", 1994, 1999)],
    },
  },
  Aquarius: {
    early: {
      genres: [
        { name: "Hip-hop", artists: [a("Eminem", 1999, 2004), a("OutKast", 2000, 2004)] },
        { name: "Nu metal", artists: [a("Linkin Park", 2000, 2004), a("Limp Bizkit", 1999, 2001)] },
        { name: "Garage rock revival", artists: [a("The Strokes", 2001, 2003), a("The White Stripes", 2001, 2003)] },
      ],
      pop: [a("Britney Spears", 1998, 2004), a("*NSYNC", 1998, 2001), a("Destiny’s Child", 1999, 2002), a("Christina Aguilera", 1999, 2002)],
    },
    inflection: {
      genres: [
        { name: "Pop rap", artists: [a("Kanye West", 2004, 2008), a("50 Cent", 2003, 2005)] },
        { name: "Emo & pop punk", artists: [a("Green Day", 2004, 2006), a("My Chemical Romance", 2004, 2007), a("Fall Out Boy", 2005, 2007)] },
        { name: "Indie rock", artists: [a("Arctic Monkeys", 2006, 2007), a("The Killers", 2004, 2006)] },
      ],
      pop: [a("Beyoncé", 2003, 2009), a("Justin Timberlake", 2002, 2007), a("Usher", 2004, 2005), a("Kelly Clarkson", 2004, 2005)],
    },
    late: {
      genres: [
        { name: "Electropop", artists: [a("Lady Gaga", 2008, 2011), a("Kesha", 2009, 2011)] },
        { name: "Mixtape rap", artists: [a("Lil Wayne", 2005, 2009), a("Nicki Minaj", 2010, 2012)] },
      ],
      pop: [a("Rihanna", 2007, 2012), a("Katy Perry", 2008, 2013), a("Taylor Swift", 2008, 2010), a("Justin Bieber", 2009, 2012)],
    },
  },
  Pisces: {
    early: {
      genres: [
        { name: "EDM", artists: [a("David Guetta", 2009, 2012), a("Swedish House Mafia", 2011, 2013), a("Skrillex", 2011, 2014), a("Avicii", 2011, 2015), a("Calvin Harris", 2012, 2016), a("The Chainsmokers", 2014, 2016)] },
      ],
      pop: [a("Adele", 2011, 2016), a("Taylor Swift", 2014, 2016), a("Bruno Mars", 2012, 2016)],
    },
    inflection: {
      genres: [
        { name: "Trap", artists: [a("Drake", 2015, 2021), a("Travis Scott", 2018, 2020), a("Migos", 2016, 2018), a("Post Malone", 2017, 2020), a("Kendrick Lamar", 2017, 2018)] },
        { name: "Reggaeton", artists: [a("Bad Bunny", 2018, 2023), a("J Balvin", 2017, 2019), a("Maluma", 2016, 2019), a("Luis Fonsi", 2017, 2017)] },
      ],
      pop: [a("Ed Sheeran", 2017, 2019), a("Ariana Grande", 2018, 2020), a("BTS", 2017, 2022)],
    },
    late: {
      genres: [
        { name: "Nu disco", artists: [a("Dua Lipa", 2020, 2022), a("The Weeknd", 2020, 2022), a("Doja Cat", 2020, 2023)] },
      ],
      pop: [a("Taylor Swift", 2020, 2024), a("Billie Eilish", 2019, 2024), a("Olivia Rodrigo", 2021, 2023), a("Sabrina Carpenter", 2024, 2025)],
    },
  },
  Aries: { early: EMPTY, inflection: EMPTY, late: EMPTY },
};

/** Thirds of the era, rounded to whole years; each owns [start, end). */
export function neptunePhaseSpans(era: MusicEra): Record<NeptunePhase, { start: number; end: number }> {
  const length = era.endYear - era.startYear;
  const first = era.startYear + Math.round(length / 3);
  const second = era.startYear + Math.round((2 * length) / 3);
  return {
    early: { start: era.startYear, end: first },
    inflection: { start: first, end: second },
    late: { start: second, end: era.endYear },
  };
}
