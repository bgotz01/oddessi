import { prisma } from "@/lib/db";

/**
 * Charts come from the existing arc database (`birth_chart_data`), so Oddessi
 * studies the real charts rather than a copy. Read-only: nothing here writes.
 *
 * The stored JSON is shaped like this —
 *   planetPositions: [{ planet, sign, house, degree, minute, longitude, … }]
 *   angles:          { ascendant, midheaven, descendant, imumCoeli }  ecliptic °
 *   housePositions:  { cusps: number[12], system: "P" }
 * — and is normalised into `Placement[]` below.
 */

export interface BirthData {
  date: string;
  time: string;
  timezone: string;
  latitude: number;
  longitude: number;
  city: string;
  location: string;
}

export interface Placement {
  body: string;
  sign: string;
  degree: string;
  house: string;
  /** The same house as a number, for looking interpretations up. Null when unknown. */
  houseNumber: number | null;
  /** Ecliptic longitude, kept so placements can be ordered within a house. */
  longitude: number | null;
  /** Negative apparent speed. Angles and unknowns are never retrograde. */
  retrograde: boolean;
  /** Angles (Asc/MC) are derived, not planetary — rendered a shade differently. */
  isAngle?: boolean;
}

/** One of the twelve cusps: where a house begins, and in which sign. */
export interface HouseCusp {
  number: number;
  roman: string;
  sign: string;
  degree: string;
  longitude: number;
}

/** The four directions, as ecliptic longitudes. Null when not stored. */
export interface Angles {
  ascendant: number | null;
  midheaven: number | null;
}

/** A natal aspect as arc recorded it. `type` is free text ("Trine", "Square"). */
export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
}

export interface Chart {
  id: string;
  name: string;
  isDefault: boolean;
  birth: BirthData;
  big3: { sun: string; moon: string; rising: string };
  placements: Placement[];
  /** Empty when the stored chart has no house system on it. */
  houses: HouseCusp[];
  angles: Angles;
  /** Empty when the stored chart was calculated without them. */
  aspects: Aspect[];
}

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

/** Order placements the way a chart is read, not the way the JSON happens to sit. */
const BODY_ORDER = [
  "Ascendant",
  "Midheaven",
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "North Node",
  "South Node",
  "Chiron",
];

function formatDegree(degree: number, minute: number): string {
  return `${String(degree).padStart(2, "0")}°${String(minute).padStart(2, "0")}′`;
}

/** Ecliptic longitude → sign + degree/minute within that sign. */
function fromLongitude(longitude: number): { sign: string; degree: string } {
  const normalised = ((longitude % 360) + 360) % 360;
  const sign = SIGNS[Math.floor(normalised / 30)];
  const within = normalised % 30;
  const degree = Math.floor(within);
  const minute = Math.round((within - degree) * 60);
  return { sign, degree: formatDegree(degree, minute) };
}

/** Which house a longitude falls in (1–12), given the 12 cusps. */
function houseOf(longitude: number, cusps: number[] | null): number | null {
  if (!cusps || cusps.length !== 12) return null;
  const lon = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    const inHouse =
      start <= end ? lon >= start && lon < end : lon >= start || lon < end;
    if (inHouse) return i + 1;
  }
  return null;
}

function roman(house: number | null): string {
  return house === null ? "—" : (ROMAN[house - 1] ?? "—");
}

/** Read the 12 cusps out of the stored `housePositions` blob, if they're there. */
function readCusps(housePositions: unknown): number[] | null {
  if (!housePositions || typeof housePositions !== "object") return null;
  const cusps = (housePositions as { cusps?: unknown }).cusps;
  if (!Array.isArray(cusps) || cusps.length !== 12) return null;
  return cusps.every((c) => typeof c === "number") ? (cusps as number[]) : null;
}

function buildAngles(angles: unknown): Angles {
  const a = (angles ?? {}) as RawAngles;
  return {
    ascendant: typeof a.ascendant === "number" ? a.ascendant : null,
    midheaven: typeof a.midheaven === "number" ? a.midheaven : null,
  };
}

function buildAspects(aspects: unknown): Aspect[] {
  if (!Array.isArray(aspects)) return [];
  return aspects.flatMap((raw) => {
    const a = raw as Partial<Aspect>;
    if (typeof a?.planet1 !== "string" || typeof a?.planet2 !== "string") {
      return [];
    }
    return [
      {
        planet1: a.planet1,
        planet2: a.planet2,
        type: typeof a.type === "string" ? a.type : "Conjunction",
        orb: typeof a.orb === "number" ? a.orb : 0,
      },
    ];
  });
}

function buildHouses(cusps: number[] | null): HouseCusp[] {
  if (!cusps) return [];
  return cusps.map((longitude, i) => {
    const { sign, degree } = fromLongitude(longitude);
    return { number: i + 1, roman: ROMAN[i], sign, degree, longitude };
  });
}

interface RawPlanet {
  planet?: string;
  sign?: string;
  house?: number;
  degree?: number;
  minute?: number;
  longitude?: number;
  speed?: number;
}

interface RawAngles {
  ascendant?: number;
  midheaven?: number;
}

function buildPlacements(
  planetPositions: unknown,
  angles: unknown,
  cusps: number[] | null,
): Placement[] {
  const placements: Placement[] = [];

  // Angles first — they orient everything else.
  const a = (angles ?? {}) as RawAngles;
  if (typeof a.ascendant === "number") {
    const { sign, degree } = fromLongitude(a.ascendant);
    placements.push({
      body: "Ascendant",
      sign,
      degree,
      house: "I",
      houseNumber: 1,
      longitude: a.ascendant,
      retrograde: false,
      isAngle: true,
    });
  }
  if (typeof a.midheaven === "number") {
    const { sign, degree } = fromLongitude(a.midheaven);
    const house = houseOf(a.midheaven, cusps);
    placements.push({
      body: "Midheaven",
      sign,
      degree,
      house: roman(house),
      houseNumber: house,
      longitude: a.midheaven,
      retrograde: false,
      isAngle: true,
    });
  }

  if (Array.isArray(planetPositions)) {
    for (const raw of planetPositions as RawPlanet[]) {
      if (!raw?.planet) continue;
      // Prefer the house the calculator recorded; fall back to the cusps.
      const house =
        typeof raw.house === "number"
          ? raw.house
          : typeof raw.longitude === "number"
            ? houseOf(raw.longitude, cusps)
            : null;
      placements.push({
        body: raw.planet,
        sign: raw.sign ?? "—",
        degree:
          typeof raw.degree === "number"
            ? formatDegree(raw.degree, raw.minute ?? 0)
            : "—",
        house: roman(house),
        houseNumber: house,
        longitude: typeof raw.longitude === "number" ? raw.longitude : null,
        retrograde: typeof raw.speed === "number" && raw.speed < 0,
      });
    }
  }

  return placements.sort((x, y) => {
    const ix = BODY_ORDER.indexOf(x.body);
    const iy = BODY_ORDER.indexOf(y.body);
    return (ix === -1 ? 99 : ix) - (iy === -1 ? 99 : iy);
  });
}

/** Returns a clean city name from birthLocation, or empty string if it looks like raw coordinates. */
function cityFromLocation(location: string | null): string {
  if (!location) return "";
  // Looks like "28.4249771, -81.2843554" — raw coords, not a city name.
  if (/^-?\d+\.\d+\s*,\s*-?\d+\.\d+$/.test(location.trim())) return "";
  return location.split(",")[0].trim();
}

export async function fetchCharts(): Promise<Chart[]> {
  const rows = await prisma.birthChartData.findMany({
    orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
  });

  return rows.map((row) => {
    const cusps = readCusps(row.housePositions);
    return {
      id: row.id,
      name: row.name?.trim() || "Untitled chart",
      isDefault: row.isDefault,
      birth: {
        date: row.birthDate.toISOString().slice(0, 10),
        time: row.birthTime,
        timezone: row.birthTimezone,
        latitude: row.birthLatitude,
        longitude: row.birthLongitude,
        city: row.birthCity?.trim() || cityFromLocation(row.birthLocation),
        location: row.birthLocation?.trim() || "Unknown location",
      },
      big3: {
        sun: row.sunSign ?? "",
        moon: row.moonSign ?? "",
        rising: row.risingSign ?? "",
      },
      placements: buildPlacements(row.planetPositions, row.angles, cusps),
      houses: buildHouses(cusps),
      angles: buildAngles(row.angles),
      aspects: buildAspects(row.aspects),
    };
  });
}

export function formatBirth(birth: BirthData): string {
  const d = new Date(`${birth.date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${d} · ${birth.time}`;
}
