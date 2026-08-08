import { Planet, ZodiacSign, AspectType } from '@/types/astrology';

// Swiss Ephemeris planet constants
export const SWISSEPH_PLANETS = {
    [Planet.Sun]: 0,
    [Planet.Moon]: 1,
    [Planet.Mercury]: 2,
    [Planet.Venus]: 3,
    [Planet.Mars]: 4,
    [Planet.Jupiter]: 5,
    [Planet.Saturn]: 6,
    [Planet.Uranus]: 7,
    [Planet.Neptune]: 8,
    [Planet.Pluto]: 9,
    [Planet.NorthNode]: 11,
    [Planet.Chiron]: 15,

} as const;

// Zodiac signs with their degree ranges
export const ZODIAC_SIGNS = [
    ZodiacSign.Aries,
    ZodiacSign.Taurus,
    ZodiacSign.Gemini,
    ZodiacSign.Cancer,
    ZodiacSign.Leo,
    ZodiacSign.Virgo,
    ZodiacSign.Libra,
    ZodiacSign.Scorpio,
    ZodiacSign.Sagittarius,
    ZodiacSign.Capricorn,
    ZodiacSign.Aquarius,
    ZodiacSign.Pisces,
] as const;

// Aspect definitions with their angles and default orbs
export const ASPECT_DEFINITIONS = {
    [AspectType.Conjunction]: { angle: 0, orb: 8 },
    [AspectType.Opposition]: { angle: 180, orb: 8 },
    [AspectType.Trine]: { angle: 120, orb: 8 },
    [AspectType.Square]: { angle: 90, orb: 8 },
    [AspectType.Sextile]: { angle: 60, orb: 6 },
    [AspectType.Quincunx]: { angle: 150, orb: 3 },
    [AspectType.Semisextile]: { angle: 30, orb: 2 },
    [AspectType.Semisquare]: { angle: 45, orb: 2 },
    [AspectType.Sesquisquare]: { angle: 135, orb: 2 },
} as const;

// Planet-specific orb modifiers (multipliers for default orbs)
export const PLANET_ORB_MODIFIERS = {
    [Planet.Sun]: 1.2,
    [Planet.Moon]: 1.2,
    [Planet.Mercury]: 0.8,
    [Planet.Venus]: 0.8,
    [Planet.Mars]: 0.8,
    [Planet.Jupiter]: 1.0,
    [Planet.Saturn]: 1.0,
    [Planet.Uranus]: 0.6,
    [Planet.Neptune]: 0.6,
    [Planet.Pluto]: 0.6,
    [Planet.NorthNode]: 0.5,
    [Planet.SouthNode]: 0.5,
    [Planet.Chiron]: 0.5,

} as const;

// Planet symbols for display
export const PLANET_SYMBOLS = {
    [Planet.Sun]: '☉',
    [Planet.Moon]: '☽',
    [Planet.Mercury]: '☿',
    [Planet.Venus]: '♀',
    [Planet.Mars]: '♂',
    [Planet.Jupiter]: '♃',
    [Planet.Saturn]: '♄',
    [Planet.Uranus]: '♅',
    [Planet.Neptune]: '♆',
    [Planet.Pluto]: '♇',
    [Planet.NorthNode]: '☊',
    [Planet.SouthNode]: '☋',
    [Planet.Chiron]: '⚷',

} as const;

// Zodiac sign symbols
export const SIGN_SYMBOLS = {
    [ZodiacSign.Aries]: '♈',
    [ZodiacSign.Taurus]: '♉',
    [ZodiacSign.Gemini]: '♊',
    [ZodiacSign.Cancer]: '♋',
    [ZodiacSign.Leo]: '♌',
    [ZodiacSign.Virgo]: '♍',
    [ZodiacSign.Libra]: '♎',
    [ZodiacSign.Scorpio]: '♏',
    [ZodiacSign.Sagittarius]: '♐',
    [ZodiacSign.Capricorn]: '♑',
    [ZodiacSign.Aquarius]: '♒',
    [ZodiacSign.Pisces]: '♓',
} as const;

// Custom zodiac emoji image paths (700x700 PNGs)
export const SIGN_EMOJI_PATHS: Record<string, string> = {
    [ZodiacSign.Aries]: '/emoji/zodiacs/aries-emoji.png',
    [ZodiacSign.Taurus]: '/emoji/zodiacs/taurus-emoji.png',
    [ZodiacSign.Gemini]: '/emoji/zodiacs/gemini-emoji.png',
    [ZodiacSign.Cancer]: '/emoji/zodiacs/cancer-emoji.png',
    [ZodiacSign.Leo]: '/emoji/zodiacs/leo-emoji.png',
    [ZodiacSign.Virgo]: '/emoji/zodiacs/virgo-emoji.png',
    [ZodiacSign.Libra]: '/emoji/zodiacs/libra-emoji.png',
    [ZodiacSign.Scorpio]: '/emoji/zodiacs/scorpio-emoji.png',
    [ZodiacSign.Sagittarius]: '/emoji/zodiacs/sag-emoji.png',
    [ZodiacSign.Capricorn]: '/emoji/zodiacs/capricorn-emoji.png',
    [ZodiacSign.Aquarius]: '/emoji/zodiacs/aquarius-emoji.png',
    [ZodiacSign.Pisces]: '/emoji/zodiacs/pisces-emoji.png',
};

// Aspect symbols for display
export const ASPECT_SYMBOLS = {
    [AspectType.Conjunction]: '☌',
    [AspectType.Opposition]: '☍',
    [AspectType.Trine]: '△',
    [AspectType.Square]: '□',
    [AspectType.Sextile]: '⚹',
    [AspectType.Quincunx]: '⚻',
    [AspectType.Semisextile]: '⚺',
    [AspectType.Semisquare]: '∠',
    [AspectType.Sesquisquare]: '⚼',
} as const;