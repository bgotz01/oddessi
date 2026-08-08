// Core astrology types for birth chart calculations

export interface BirthData {
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    timezone: string; // IANA timezone (e.g., "America/New_York")
    latitude: number;
    longitude: number;
    location?: string; // Optional location name
}

export interface PlanetPosition {
    planet: Planet;
    longitude: number; // 0-360 degrees
    latitude: number;
    speed: number;
    sign: ZodiacSign;
    degree: number; // 0-29
    minute: number; // 0-59
    house?: number; // 1-12
}

export interface Angles {
    ascendant: number;
    midheaven: number;
    descendant: number;
    imumCoeli: number;
}

export interface Houses {
    system: HouseSystem;
    cusps: number[]; // 12 house cusps (longitudes)
}

export interface Aspect {
    planet1: Planet;
    planet2: Planet;
    type: AspectType;
    angle: number;
    orb: number;
    exactness: number; // 0-100% (100 = exact)
}

export interface BirthChart {
    birthData: BirthData;
    planets: PlanetPosition[];
    angles: Angles;
    houses: Houses;
    aspects: Aspect[];
    julianDay: number;
}

export enum Planet {
    Sun = 'Sun',
    Moon = 'Moon',
    Mercury = 'Mercury',
    Venus = 'Venus',
    Mars = 'Mars',
    Jupiter = 'Jupiter',
    Saturn = 'Saturn',
    Uranus = 'Uranus',
    Neptune = 'Neptune',
    Pluto = 'Pluto',
    NorthNode = 'North Node',
    SouthNode = 'South Node',
    Chiron = 'Chiron',
}

// Core points for Big 3 analysis (Sun, Moon, Ascendant)
export type CorePoint = Planet | 'Ascendant';

export enum ZodiacSign {
    Aries = 'Aries',
    Taurus = 'Taurus',
    Gemini = 'Gemini',
    Cancer = 'Cancer',
    Leo = 'Leo',
    Virgo = 'Virgo',
    Libra = 'Libra',
    Scorpio = 'Scorpio',
    Sagittarius = 'Sagittarius',
    Capricorn = 'Capricorn',
    Aquarius = 'Aquarius',
    Pisces = 'Pisces',
}

export enum HouseSystem {
    Placidus = 'P',
    Koch = 'K',
    Equal = 'E',
    WholeSigns = 'W',
    Campanus = 'C',
    Regiomontanus = 'R',
}

export enum AspectType {
    Conjunction = 'Conjunction',
    Opposition = 'Opposition',
    Trine = 'Trine',
    Square = 'Square',
    Sextile = 'Sextile',
    Quincunx = 'Quincunx',
    Semisextile = 'Semisextile',
    Semisquare = 'Semisquare',
    Sesquisquare = 'Sesquisquare',
}

// Transit-specific types
export interface TransitPosition {
    planet: Planet;
    longitude: number;
    latitude: number;
    speed: number;
    sign: ZodiacSign;
    degree: number;
    minute: number;
    house?: number; // House in natal chart
}

export interface Transit {
    transitingPlanet: Planet;
    natalPlanet: Planet;
    aspectType: AspectType;
    angle: number;
    orb: number;
    exactness: number;
    isApplying: boolean; // true if aspect is getting closer
    exactDate?: Date; // when the aspect becomes exact
    duration?: {
        start: Date;
        end: Date;
    };
}

export interface TransitToHouse {
    transitingPlanet: Planet;
    house: number;
    sign: ZodiacSign;
    degree: number;
    minute: number;
    entryDate?: Date;
    exitDate?: Date;
}

export interface CurrentTransits {
    date: Date;
    transitPositions: TransitPosition[];
    planetaryTransits: Transit[];
    houseTransits: TransitToHouse[];
    significantTransits: Transit[]; // Major transits (outer planets, exact aspects)
}

// Re-export comprehensive transit types
export * from './comprehensive-transits';
