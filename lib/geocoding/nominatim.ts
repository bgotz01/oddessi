import { GeocodingResult, NominatimResult, GeocodingError } from './types';
// @ts-ignore - tz-lookup doesn't have TypeScript declarations
import tzlookup from 'tz-lookup';

/**
 * Geocoding service using OpenStreetMap Nominatim API
 * Free to use with proper attribution and rate limiting
 */

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'ArcBirthChartCalculator/1.0'; // Required by Nominatim

// Rate limiting: max 1 request per second
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

async function waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    lastRequestTime = Date.now();
}

/**
 * Search for a location by name
 */
export async function searchLocation(query: string): Promise<GeocodingResult[]> {
    if (!query || query.trim().length < 2) {
        throw {
            message: 'Search query must be at least 2 characters',
            code: 'INVALID_INPUT',
        } as GeocodingError;
    }

    await waitForRateLimit();

    try {
        const params = new URLSearchParams({
            q: query.trim(),
            format: 'json',
            addressdetails: '1',
            limit: '5',
        });

        const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
            headers: {
                'User-Agent': USER_AGENT,
            },
        });

        if (response.status === 429) {
            throw {
                message: 'Rate limit exceeded. Please wait a moment and try again.',
                code: 'RATE_LIMITED',
            } as GeocodingError;
        }

        if (!response.ok) {
            throw {
                message: `Geocoding service error: ${response.statusText}`,
                code: 'NETWORK_ERROR',
            } as GeocodingError;
        }

        const data: NominatimResult[] = await response.json();

        if (!data || data.length === 0) {
            throw {
                message: 'No results found for this location',
                code: 'NO_RESULTS',
            } as GeocodingError;
        }

        return data.map(result => convertNominatimResult(result));
    } catch (error) {
        if ((error as GeocodingError).code) {
            throw error;
        }

        throw {
            message: 'Failed to connect to geocoding service',
            code: 'NETWORK_ERROR',
        } as GeocodingError;
    }
}

/**
 * Get detailed information for a specific location
 */
export async function getLocationDetails(
    latitude: number,
    longitude: number
): Promise<GeocodingResult> {
    await waitForRateLimit();

    try {
        const params = new URLSearchParams({
            lat: latitude.toString(),
            lon: longitude.toString(),
            format: 'json',
            addressdetails: '1',
        });

        const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
            headers: {
                'User-Agent': USER_AGENT,
            },
        });

        if (!response.ok) {
            throw {
                message: `Geocoding service error: ${response.statusText}`,
                code: 'NETWORK_ERROR',
            } as GeocodingError;
        }

        const data: NominatimResult = await response.json();
        return convertNominatimResult(data);
    } catch (error) {
        if ((error as GeocodingError).code) {
            throw error;
        }

        throw {
            message: 'Failed to get location details',
            code: 'NETWORK_ERROR',
        } as GeocodingError;
    }
}

/**
 * Convert Nominatim result to our standard format
 */
function convertNominatimResult(result: NominatimResult): GeocodingResult {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);

    // Try to get timezone
    let timezone: string | undefined;
    try {
        timezone = tzlookup(latitude, longitude);
    } catch (error) {
        console.warn('Failed to lookup timezone:', error);
    }

    // Extract city name from address
    const city = result.address.city ||
        result.address.town ||
        result.address.village;

    return {
        name: city || result.display_name.split(',')[0],
        displayName: result.display_name,
        latitude,
        longitude,
        country: result.address.country || '',
        state: result.address.state,
        city,
        timezone,
    };
}

/**
 * Format location for display
 */
export function formatLocationDisplay(result: GeocodingResult): string {
    const parts = [result.name];

    if (result.state && result.state !== result.name) {
        parts.push(result.state);
    }

    if (result.country) {
        parts.push(result.country);
    }

    return parts.join(', ');
}