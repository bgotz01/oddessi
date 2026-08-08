import { BirthChart } from '@/types/astrology';
import { prisma } from '@/lib/prisma';
import { getComprehensiveLifeCycleInterpretation } from './interpretations/comprehensive-cycles';
import { Planet, AspectType } from '@/types/astrology';

type LifeCycle = Awaited<ReturnType<typeof import('./life-cycles-calculator').calculateLifeCycles>>['completed'][0];

/**
 * Calculate and cache life cycles for a birth chart.
 * - When ASTRO_SERVICE_URL is set (production/Vercel), delegates to the
 *   external astro-service droplet which has swisseph available.
 * - Falls back to local swisseph import for local development.
 */
export async function cacheLifeCyclesForChart(
    chartId: string,
    natalChart: BirthChart,
    options?: {
        lookbackYears?: number;
        lookaheadYears?: number;
        includeJupiter?: boolean;
        includeMinorAspects?: boolean;
    }
) {
    const ASTRO_SERVICE_URL = process.env.ASTRO_SERVICE_URL;
    const ASTRO_API_KEY = process.env.ASTRO_API_KEY;

    try {
        console.log(`Calculating and caching life cycles for chart ${chartId}...`);

        let allCycles: LifeCycle[];

        if (ASTRO_SERVICE_URL) {
            // Production: delegate to the droplet
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (ASTRO_API_KEY) headers['x-api-key'] = ASTRO_API_KEY;

            const res = await fetch(`${ASTRO_SERVICE_URL}/life-cycles`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ natalChart, options }),
            });

            if (res.status === 404) {
                // Endpoint not yet deployed on droplet — skip caching, serve from existing cache
                console.warn(`Astro service /life-cycles not available yet (404). Serving from existing cache.`);
                return { success: false, reason: 'endpoint-not-available' };
            }

            if (!res.ok) {
                const body = await res.text();
                throw new Error(`Astro service error ${res.status}: ${body}`);
            }

            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Astro service returned failure');
            allCycles = data.cycles;
        } else {
            // Local dev: run swisseph directly
            const { calculateLifeCycles } = await import('./life-cycles-calculator');
            const lifeCycles = await calculateLifeCycles({
                natalChart,
                lookbackYears: options?.lookbackYears || 35,
                lookaheadYears: options?.lookaheadYears || 35,
                includeJupiter: options?.includeJupiter ?? true,
                includeMinorAspects: options?.includeMinorAspects ?? false,
                unlimitedUpcoming: true,
                unlimitedCompleted: true,
            });
            allCycles = [
                ...lifeCycles.completed,
                ...lifeCycles.active,
                ...lifeCycles.upcoming,
            ];
        }

        console.log(`Caching ${allCycles.length} life cycles for chart ${chartId}...`);

        // Delete any existing rows first, then insert fresh.
        // skipDuplicates on createMany handles the race where two parallel
        // requests both delete+insert — the second writer just skips conflicts.
        await prisma.lifeCycleCache.deleteMany({ where: { chartId } });

        const cacheRecords = allCycles.map(cycle => ({
            chartId,
            cycleId: cycle.id,
            type: cycle.type,
            planet: cycle.planet,
            startDate: cycle.startDate,
            endDate: cycle.endDate,
            peakDate: cycle.peakDate || null,
            status: cycle.status,
            significance: cycle.significance,
            houseNumber: cycle.houseNumber || null,
            natalPlanet: cycle.natalPlanet || null,
            aspectType: cycle.aspectType || null,
            sign: cycle.sign || null,
            cycleLength: cycle.cycleLength,
            actualDuration: cycle.actualDuration || null,
            title: '',
            description: '',
            themes: [],
            interpretation: (cycle.retrogradePeriods?.length || cycle.initialEnd)
                ? { retrogradePeriods: cycle.retrogradePeriods, initialEnd: cycle.initialEnd } as any
                : undefined,
        }));

        await prisma.lifeCycleCache.createMany({
            data: cacheRecords,
            skipDuplicates: true,
        });

        console.log(`Successfully cached ${cacheRecords.length} life cycles for chart ${chartId}`);

        return { success: true, cachedCount: cacheRecords.length };
    } catch (error) {
        console.error('Error caching life cycles:', error);
        throw error;
    }
}

/**
 * Retrieve cached life cycles for a chart.
 * Only returns cycles visible from 2010 onward (cycles that ended before 2010 are hidden).
 */
export async function getCachedLifeCycles(
    chartId: string,
    options?: {
        lookbackYears?: number;
        lookaheadYears?: number;
    }
) {
    try {
        const now = new Date();
        const lookaheadYears = options?.lookaheadYears || 35;

        const displayCutoff = new Date(2010, 0, 1);
        const endDate = new Date(now.getFullYear() + lookaheadYears, 11, 31);

        const cachedCycles = await prisma.lifeCycleCache.findMany({
            where: {
                chartId,
                endDate: { gte: displayCutoff },
                startDate: { lte: endDate },
            },
            orderBy: { startDate: 'asc' },
        });

        const cycles: LifeCycle[] = cachedCycles.map(cached => {
            let interpretation = null;
            let title = '';
            let description = '';
            let themes: string[] = [];

            if (cached.type === 'house-transit' && cached.houseNumber) {
                interpretation = getComprehensiveLifeCycleInterpretation(
                    'house-transit',
                    cached.planet as Planet,
                    cached.houseNumber,
                    undefined,
                    undefined,
                    cached.actualDuration || undefined
                );
            } else if (cached.type === 'aspect-cycle' && cached.natalPlanet && cached.aspectType) {
                interpretation = getComprehensiveLifeCycleInterpretation(
                    'aspect-cycle',
                    cached.planet as Planet,
                    undefined,
                    cached.natalPlanet as Planet,
                    cached.aspectType as AspectType,
                    cached.actualDuration || undefined
                );
            } else if (cached.type === 'planetary-return') {
                interpretation = getComprehensiveLifeCycleInterpretation(
                    'planetary-return',
                    cached.planet as Planet
                );
            }

            if (interpretation) {
                title = interpretation.title;
                description = interpretation.overview || '';
                themes = interpretation.keyThemes || [];
            } else {
                if (cached.type === 'house-transit' && cached.houseNumber) {
                    title = `${cached.planet} in ${cached.houseNumber}${getOrdinalSuffix(cached.houseNumber)} House`;
                } else if (cached.type === 'aspect-cycle') {
                    title = `${cached.planet} ${cached.aspectType} ${cached.natalPlanet}`;
                } else if (cached.type === 'planetary-return') {
                    title = `${cached.planet} Return`;
                }
            }

            return {
                id: cached.cycleId,
                type: cached.type as any,
                planet: cached.planet as any,
                title,
                description,
                startDate: cached.startDate,
                endDate: cached.endDate,
                peakDate: cached.peakDate || undefined,
                status: determineCurrentStatus(cached.startDate, cached.endDate, now),
                significance: cached.significance as any,
                themes,
                houseNumber: cached.houseNumber || undefined,
                natalPlanet: cached.natalPlanet as any,
                aspectType: cached.aspectType as any,
                sign: cached.sign as any,
                cycleLength: cached.cycleLength,
                actualDuration: cached.actualDuration || undefined,
                interpretation: interpretation || undefined,
                retrogradePeriods: (cached.interpretation as any)?.retrogradePeriods || undefined,
                initialEnd: (cached.interpretation as any)?.initialEnd
                    ? new Date((cached.interpretation as any).initialEnd)
                    : undefined,
            };
        });

        return {
            completed: cycles.filter(c => c.status === 'completed'),
            active: cycles.filter(c => c.status === 'active'),
            upcoming: cycles.filter(c => c.status === 'upcoming'),
        };
    } catch (error) {
        console.error('Error retrieving cached life cycles:', error);
        throw error;
    }
}

/**
 * Determine current status based on dates.
 * 45-day grace window so cycles starting within ~45 days show as active.
 */
function determineCurrentStatus(
    startDate: Date,
    endDate: Date,
    now: Date
): 'completed' | 'active' | 'upcoming' {
    const gracePeriodMs = 45 * 24 * 60 * 60 * 1000;
    if (now < new Date(startDate.getTime() - gracePeriodMs)) return 'upcoming';
    if (now > endDate) return 'completed';
    return 'active';
}

function getOrdinalSuffix(num: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

export async function hasCachedLifeCycles(chartId: string): Promise<boolean> {
    const count = await prisma.lifeCycleCache.count({ where: { chartId } });
    return count > 0;
}

/**
 * Recalculate cycles for all charts (maintenance function)
 */
export async function recalculateAllChartCycles() {
    const charts = await prisma.birthChartData.findMany({
        select: {
            id: true,
            birthDate: true,
            birthTime: true,
            birthTimezone: true,
            birthLatitude: true,
            birthLongitude: true,
            birthLocation: true,
            planetPositions: true,
            housePositions: true,
            angles: true,
        },
    });

    console.log(`Recalculating cycles for ${charts.length} charts...`);

    let successCount = 0;
    let errorCount = 0;

    for (const chart of charts) {
        try {
            const natalChart: BirthChart = {
                birthData: {
                    date: (chart.birthDate instanceof Date ? chart.birthDate.toISOString() : String(chart.birthDate)).split('T')[0],
                    time: chart.birthTime,
                    timezone: chart.birthTimezone,
                    latitude: chart.birthLatitude,
                    longitude: chart.birthLongitude,
                    location: chart.birthLocation || 'Unknown',
                },
                planets: chart.planetPositions as any[],
                angles: chart.angles as any,
                houses: chart.housePositions as any,
                aspects: [],
                julianDay: 0,
            };

            await cacheLifeCyclesForChart(chart.id, natalChart);
            successCount++;
        } catch (error) {
            console.error(`Error recalculating cycles for chart ${chart.id}:`, error);
            errorCount++;
        }
    }

    console.log(`Recalculation complete: ${successCount} success, ${errorCount} errors`);

    return { total: charts.length, success: successCount, errors: errorCount };
}
