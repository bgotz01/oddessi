import { BirthData, BirthChart } from '@/types/astrology';

const ASTRO_SERVICE_URL = process.env.ASTRO_SERVICE_URL;
const ASTRO_API_KEY = process.env.ASTRO_API_KEY;

/**
 * Calculate a birth chart.
 *
 * - If ASTRO_SERVICE_URL is set, delegates to the external astro-service
 *   (DigitalOcean droplet running swisseph natively).
 * - Falls back to the local swisseph import for local development.
 */
export async function calculateBirthChart(birthData: BirthData): Promise<BirthChart> {
    if (ASTRO_SERVICE_URL) {
        return calculateViaService(birthData);
    }

    // Local dev fallback — swisseph runs fine on your machine
    try {
        const { calculateRealBirthChart } = await import('./real-calculator');
        return await calculateRealBirthChart(birthData);
    } catch (error) {
        console.error('Swiss Ephemeris calculation failed:', error);
        throw new Error(`Failed to calculate birth chart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

async function calculateViaService(birthData: BirthData): Promise<BirthChart> {
    const url = `${ASTRO_SERVICE_URL}/birth-chart`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (ASTRO_API_KEY) {
        headers['x-api-key'] = ASTRO_API_KEY;
    }

    const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(birthData),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Astro service error ${res.status}: ${body}`);
    }

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.error || 'Astro service returned failure');
    }

    return data.chart as BirthChart;
}

/**
 * Check if the calculation backend is available.
 */
export async function isSwissEphemerisAvailable(): Promise<boolean> {
    if (ASTRO_SERVICE_URL) {
        try {
            const res = await fetch(`${ASTRO_SERVICE_URL}/health`);
            return res.ok;
        } catch {
            return false;
        }
    }

    try {
        await import('swisseph-v2');
        return true;
    } catch {
        return false;
    }
}
