import { DateTime } from 'luxon';
// @ts-ignore - tz-lookup doesn't have TypeScript declarations
import tzlookup from 'tz-lookup';
import { ZodiacSign } from '@/types/astrology';
import { ZODIAC_SIGNS } from './constants';

/**
 * Convert local birth time to UTC Julian Day using swisseph-v2
 */
export function convertToJulianDay(
    date: string,
    time: string,
    timezone: string
): number {
    const dateTime = DateTime.fromISO(`${date}T${time}`, { zone: timezone });

    if (!dateTime.isValid) {
        throw new Error(`Invalid date/time: ${dateTime.invalidReason}`);
    }

    const utc = dateTime.toUTC();

    // For now, use the simple conversion - we'll update this in the calculator
    // to use swisseph-v2's swe_utc_to_jd function
    const jd = utc.toJSDate().getTime() / 86400000 + 2440587.5;

    return jd;
}

/**
 * Get timezone for coordinates using tz-lookup
 */
export function getTimezoneForCoordinates(lat: number, lon: number): string {
    try {
        return tzlookup(lat, lon);
    } catch (error) {
        console.warn('Failed to lookup timezone, defaulting to UTC:', error);
        return 'UTC';
    }
}

/**
 * Convert longitude to zodiac sign and degree/minute
 */
export function longitudeToSign(longitude: number): {
    sign: ZodiacSign;
    degree: number;
    minute: number;
} {
    // Normalize longitude to 0-360 range
    const normalizedLon = ((longitude % 360) + 360) % 360;

    // Each sign is 30 degrees
    const signIndex = Math.floor(normalizedLon / 30);
    const degreeInSign = normalizedLon % 30;
    const degree = Math.floor(degreeInSign);
    const minute = Math.floor((degreeInSign - degree) * 60);

    return {
        sign: ZODIAC_SIGNS[signIndex],
        degree,
        minute,
    };
}

/**
 * Calculate the shortest angular distance between two longitudes
 */
export function angularDistance(lon1: number, lon2: number): number {
    let diff = Math.abs(lon1 - lon2);
    if (diff > 180) {
        diff = 360 - diff;
    }
    return diff;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
}

/**
 * Format degree/minute display
 */
export function formatDegreeMinute(degree: number, minute: number): string {
    return `${degree.toString().padStart(2, '0')}°${minute.toString().padStart(2, '0')}'`;
}

/**
 * Get house number for a given longitude based on house cusps
 */
export function getHouseForLongitude(longitude: number, houseCusps: number[]): number {
    const normalizedLon = normalizeAngle(longitude);

    for (let i = 0; i < 12; i++) {
        const currentCusp = normalizeAngle(houseCusps[i]);
        const nextCusp = normalizeAngle(houseCusps[(i + 1) % 12]);

        // Handle the case where the house crosses 0 degrees
        if (currentCusp > nextCusp) {
            if (normalizedLon >= currentCusp || normalizedLon < nextCusp) {
                return i + 1;
            }
        } else {
            if (normalizedLon >= currentCusp && normalizedLon < nextCusp) {
                return i + 1;
            }
        }
    }

    return 1; // Default to first house if calculation fails
}

/**
 * Validate birth data
 */
export function validateBirthData(data: {
    date: string;
    time: string;
    latitude: number;
    longitude: number;
}): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
        errors.push('Date must be in YYYY-MM-DD format');
    }

    // Validate time format (HH:mm)
    if (!/^\d{2}:\d{2}$/.test(data.time)) {
        errors.push('Time must be in HH:mm format');
    }

    // Validate coordinates
    if (data.latitude < -90 || data.latitude > 90) {
        errors.push('Latitude must be between -90 and 90 degrees');
    }

    if (data.longitude < -180 || data.longitude > 180) {
        errors.push('Longitude must be between -180 and 180 degrees');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}