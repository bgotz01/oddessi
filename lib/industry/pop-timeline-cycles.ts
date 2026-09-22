import { MUSIC_CYCLE_LANES } from "@/lib/industry/music-cycles";
import { PLUTO_MUSIC_ERAS } from "@/lib/industry/pluto-music-eras-data";
import { eraYears } from "@/lib/industry/era-years";
import { ELEMENT_COLOR, signGlyph, signMeta } from "@/lib/symbols";

export type PopCyclePlanet = "Pluto" | "Uranus" | "Neptune";
export type PopCycleSegment = {
  id: string;
  planet: PopCyclePlanet;
  sign: string;
  glyph: string;
  startYear: number;
  endYear: number;
  color: string;
  speculative: boolean;
  headline: string;
  shortLabel?: string;
  note: string;
};
export type PopCycleLane = {
  planet: PopCyclePlanet;
  glyph: string;
  role: string;
  segments: PopCycleSegment[];
};

const PLUTO_SHORT_LABELS: Record<string, string> = {
  Scorpio: "Scale",
};

const URANUS_SHORT_LABELS: Record<string, string> = {
  Leo: "Rock",
  Virgo: "Studio",
  Libra: "Festivals",
  Scorpio: "Synths",
  Sagittarius: "MTV",
  Capricorn: "Digital",
  Aquarius: "File sharing",
  Pisces: "Home studio",
  Aries: "Social",
  Taurus: "Platforms",
  Gemini: "AI teams",
};

// Adapt the existing readings without changing the two-clock page's domain.
export const POP_TIMELINE_CYCLES: PopCycleLane[] = [
  {
    planet: "Pluto", glyph: "♇︎", role: "Power & industry structure",
    segments: PLUTO_MUSIC_ERAS.map((era) => ({
      id: `pluto-${era.sign}`, planet: "Pluto", sign: era.sign,
      glyph: signGlyph(era.sign), ...eraYears(era.dates),
      color: ELEMENT_COLOR[signMeta(era.sign)!.element],
      speculative: era.model === null,
      headline: era.model ?? "Open question",
      shortLabel: PLUTO_SHORT_LABELS[era.sign],
      note: era.distinctiveDescription ?? era.question ?? era.principle,
    })),
  },
  ...["Uranus", "Neptune"].map((planet) => {
    const lane = MUSIC_CYCLE_LANES.find((item) => item.planet === planet)!;
    return {
      planet: lane.planet, glyph: lane.glyph, role: lane.role,
      segments: lane.segments.map((segment) => ({
        ...segment,
        shortLabel: planet === "Uranus" ? URANUS_SHORT_LABELS[segment.sign] : undefined,
      })),
    };
  }),
];
