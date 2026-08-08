import { DateTime } from 'luxon';
import { Planet, AspectType, ZodiacSign, BirthChart } from '@/types/astrology';
import { SWISSEPH_PLANETS, ASPECT_DEFINITIONS } from './constants';
import { longitudeToSign, angularDistance, getHouseForLongitude } from './utils';
import { getComprehensiveLifeCycleInterpretation, LifeCycleInterpretation } from './interpretations/comprehensive-cycles';

export interface LifeCycle {
    id: string;
    type: 'house-transit' | 'aspect-cycle' | 'planetary-return' | 'sign-ingress';
    planet: Planet;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    peakDate?: Date; // For aspect cycles, when it's most exact
    status: 'completed' | 'active' | 'upcoming';
    significance: 'High' | 'Very High' | 'Life-Changing';
    themes: string[];
    houseNumber?: number; // For house transits
    natalPlanet?: Planet; // For aspect cycles
    aspectType?: AspectType; // For aspect cycles
    sign?: ZodiacSign; // For sign ingresses
    cycleLength: string; // "2.5 years", "12 years", etc.
    actualDuration?: string; // Calculated duration like "2 years 3 months"
    interpretation?: LifeCycleInterpretation; // Comprehensive interpretation
    retrogradePeriods?: Array<{ startDate: Date; endDate: Date }>; // Retrograde return sub-periods
    initialEnd?: Date; // End of the first (pre-retrograde) segment — only set when retrogradePeriods exist
}

export interface LifeCyclePeriods {
    completed: LifeCycle[];
    active: LifeCycle[];
    upcoming: LifeCycle[];
}

export interface LifeCycleOptions {
    natalChart: BirthChart;
    lookbackYears?: number; // How far back to look (default: 15)
    lookaheadYears?: number; // How far ahead to look (default: 10)
    includeJupiter?: boolean; // Include Jupiter cycles (default: true)
    includeMinorAspects?: boolean; // Include sextiles, trines (default: false)
    unlimitedUpcoming?: boolean; // Return all upcoming cycles without limit (default: false)
    unlimitedCompleted?: boolean; // Return all completed cycles without limit (default: false)
}

/**
 * Calculate major life cycles - the long-term themes and periods that shape life chapters
 */
export async function calculateLifeCycles(options: LifeCycleOptions): Promise<LifeCyclePeriods> {
    const {
        natalChart,
        lookbackYears = 15,
        lookaheadYears = 10,
        includeJupiter = true,
        includeMinorAspects = false,
        unlimitedUpcoming = false,
        unlimitedCompleted = false
    } = options;

    // Focus on the slowest-moving, most life-shaping planets
    const cyclePlanets: Planet[] = [
        Planet.Saturn,   // 29-year cycle, 2.5 years per house
        Planet.Uranus,   // 84-year cycle, 7 years per house
        Planet.Neptune,  // 165-year cycle, 14 years per house
        Planet.Pluto     // 248-year cycle, varies greatly per house
    ];

    if (includeJupiter) {
        cyclePlanets.push(Planet.Jupiter); // 12-year cycle, 1 year per house
    }

    // Major natal points for aspect cycles
    const majorNatalPoints = natalChart.planets.filter(p =>
        [Planet.Sun, Planet.Moon, Planet.Mercury, Planet.Venus, Planet.Mars].includes(p.planet as Planet)
    );

    // Add Ascendant and Midheaven if available
    if (natalChart.angles) {
        // Add angles as natal points for aspect cycles
    }

    const now = new Date();
    const startDate = new Date(2000, 0, 1); // Look back to 2000 to catch starts of long cycles
    const endDate = new Date(now.getFullYear() + lookaheadYears, 11, 31);

    console.log(`Life cycles calculation: ${startDate.getFullYear()} to ${endDate.getFullYear()}`);

    // Load swisseph once here so it isn't re-imported on every planet position call
    const swissephModule = await import('swisseph-v2');
    const sw = (swissephModule.default || swissephModule) as any;

    const allCycles: LifeCycle[] = [];

    // Calculate different types of cycles
    for (const planet of cyclePlanets) {
        // 1. House Transit Cycles
        const houseTransits = await calculateHouseTransitCycles(
            planet,
            natalChart,
            startDate,
            endDate,
            now,
            sw
        );
        allCycles.push(...houseTransits);

        // 2. Major Aspect Cycles
        const aspectCycles = await calculateAspectCycles(
            planet,
            majorNatalPoints,
            natalChart,
            startDate,
            endDate,
            now,
            includeMinorAspects,
            sw
        );
        allCycles.push(...aspectCycles);

        // 3. Planetary Returns (when applicable)
        if (planet === Planet.Jupiter || planet === Planet.Saturn) {
            const returns = await calculatePlanetaryReturns(
                planet,
                natalChart,
                startDate,
                endDate,
                now,
                sw
            );
            allCycles.push(...returns);
        }
    }

    // Sort by start date
    allCycles.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Categorize by status
    const completed = allCycles.filter(c => c.status === 'completed');
    const active = allCycles.filter(c => c.status === 'active');
    const upcoming = allCycles.filter(c => c.status === 'upcoming');

    // For completed cycles, prioritize significant long-term cycles over recent short ones
    const prioritizedCompleted = unlimitedCompleted
        ? completed.sort((a, b) => b.endDate.getTime() - a.endDate.getTime()) // All cycles, most recent first
        : completed
            .sort((a, b) => {
                // First, sort by significance (Life-Changing > Very High > High)
                const significanceOrder = { 'Life-Changing': 3, 'Very High': 2, 'High': 1 };
                const sigDiff = (significanceOrder[b.significance] || 0) - (significanceOrder[a.significance] || 0);
                if (sigDiff !== 0) return sigDiff;

                // Then by actual duration (longer cycles first)
                const aDuration = a.endDate.getTime() - a.startDate.getTime();
                const bDuration = b.endDate.getTime() - b.startDate.getTime();
                const durationDiff = bDuration - aDuration;
                if (durationDiff !== 0) return durationDiff;

                // Finally by end date (more recently completed first)
                return b.endDate.getTime() - a.endDate.getTime();
            })
            .slice(0, 12); // Show up to 12 most significant completed cycles

    return {
        completed: prioritizedCompleted,
        active: active, // All active cycles — no cap
        upcoming: unlimitedUpcoming
            ? upcoming.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()) // All cycles chronologically
            : upcoming
                .sort((a, b) => {
                    // For upcoming cycles, prioritize by significance and duration, not just chronological order
                    const significanceOrder = { 'Life-Changing': 3, 'Very High': 2, 'High': 1 };
                    const sigDiff = (significanceOrder[b.significance] || 0) - (significanceOrder[a.significance] || 0);
                    if (sigDiff !== 0) return sigDiff;

                    // Then by duration (longer cycles first)
                    const aDuration = a.endDate.getTime() - a.startDate.getTime();
                    const bDuration = b.endDate.getTime() - b.startDate.getTime();
                    const durationDiff = bDuration - aDuration;
                    if (durationDiff !== 0) return durationDiff;

                    // Finally by start date (sooner first)
                    return a.startDate.getTime() - b.startDate.getTime();
                })
                .slice(0, 15) // Next 15 most significant upcoming cycles for overview
    };
}

/**
 * Calculate house transit cycles - when planets move through natal houses
 */
async function calculateHouseTransitCycles(
    planet: Planet,
    natalChart: BirthChart,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
    sw: any
): Promise<LifeCycle[]> {
    const cycles: LifeCycle[] = [];

    // Sample every 14 days for better cusp accuracy (30-day gaps can misplace
    // a planet near a house boundary during retrograde)
    const sampleInterval = 14 * 24 * 60 * 60 * 1000;

    // Collect raw house samples in chronological order
    type Sample = { date: Date; house: number };
    const samples: Sample[] = [];
    let failureCount = 0;

    for (let time = startDate.getTime(); time <= endDate.getTime(); time += sampleInterval) {
        const sampleDate = new Date(time);
        try {
            const planetPosition = await calculatePlanetPosition(sampleDate, planet, sw);
            if (!planetPosition) {
                failureCount++;
                if (failureCount > 10) break;
                continue;
            }
            failureCount = 0;
            const house = getHouseForLongitude(planetPosition.longitude, natalChart.houses.cusps);
            samples.push({ date: sampleDate, house });
        } catch (error) {
            failureCount++;
            if (failureCount > 10) break;
        }
    }

    if (samples.length === 0) return cycles;

    // Build sequential house segments — consecutive samples in the same house
    type Segment = { house: number; start: Date; end: Date; count: number };
    const segments: Segment[] = [];

    for (const sample of samples) {
        const last = segments[segments.length - 1];
        if (last && last.house === sample.house) {
            last.end = sample.date;
            last.count++;
        } else {
            segments.push({ house: sample.house, start: sample.date, end: sample.date, count: 1 });
        }
    }

    // Convert segments to cycles. Re-entries into the same house within a
    // per-planet window (measured from the candidate's start date) are treated
    // as retrograde returns and merged into the original cycle.
    // Window = how long after a cycle starts can a re-entry still be "retrograde":
    //   Jupiter  2 years  (full orbit ~12 years, house transit ~1 year)
    //   Saturn   4 years  (full orbit ~29 years, house transit ~2.5 years)
    //   Uranus   12 years (full orbit ~84 years, house transit ~7 years)
    //   Neptune  20 years (full orbit ~165 years, house transit ~14 years)
    //   Pluto    25 years (full orbit ~248 years, house transit varies)
    const retrogradeWindowMonths = getRetrogradeWindowMonths(planet);

    type CandidateCycle = {
        house: number;
        start: Date;
        initialEnd: Date; // end of the first (pre-retrograde) segment
        end: Date;        // end of the full merged span
        retrogradePeriods: Array<{ startDate: Date; endDate: Date }>;
    };
    const candidates: CandidateCycle[] = [];

    for (const seg of segments) {
        // Check if this segment is a retrograde return: find the most recent
        // candidate for this house whose start date is within the retrograde window.
        let mergeTargetIdx = -1;
        for (let i = candidates.length - 1; i >= 0; i--) {
            if (candidates[i].house === seg.house) {
                const monthsSinceStart = (seg.start.getTime() - candidates[i].start.getTime()) / (1000 * 60 * 60 * 24 * 30);
                if (monthsSinceStart <= retrogradeWindowMonths) {
                    mergeTargetIdx = i;
                }
                break; // only check the most recent same-house candidate
            }
        }

        if (mergeTargetIdx >= 0) {
            // Within the retrograde window — merge into the existing candidate.
            // Only add as a retrograde period if it starts after the initial entry ended.
            const c = candidates[mergeTargetIdx];
            if (seg.start > c.initialEnd) {
                c.retrogradePeriods.push({ startDate: seg.start, endDate: seg.end });
            }
            c.end = seg.end;
        } else {
            // Outside the window or first visit — always a new cycle entry.
            candidates.push({ house: seg.house, start: seg.start, initialEnd: seg.end, end: seg.end, retrogradePeriods: [] });
        }
    } // end for (const seg of segments)

    // Remove overlapping candidates: if a candidate starts before the previous
    // one's initial entry ended, it's a premature cusp sample — drop it.
    // We compare against initialEnd (not the merged end) so that a candidate
    // which started during another candidate's retrograde gap isn't wrongly dropped.
    const nonOverlapping: typeof candidates = [];
    for (const c of candidates) {
        const prev = nonOverlapping[nonOverlapping.length - 1];
        if (prev && c.start < prev.initialEnd) {
            // Started before the previous candidate's initial entry ended — drop it.
            continue;
        }
        nonOverlapping.push(c);
    }

    for (const c of nonOverlapping) {
        const cycle = createHouseTransitCycle(planet, c.house, c.start, c.end, currentDate);
        if (c.retrogradePeriods.length > 0) {
            cycle.retrogradePeriods = c.retrogradePeriods;
            cycle.initialEnd = c.initialEnd;
        }
        cycles.push(cycle);
    }

    return cycles;
}

/**
 * Calculate major aspect cycles - long-term aspects that define life periods
 */
async function calculateAspectCycles(
    transitingPlanet: Planet,
    natalPoints: any[],
    natalChart: BirthChart,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
    includeMinorAspects: boolean,
    sw: any
): Promise<LifeCycle[]> {
    const cycles: LifeCycle[] = [];

    const majorAspects = [AspectType.Conjunction, AspectType.Square, AspectType.Opposition];
    const minorAspects = [AspectType.Trine, AspectType.Sextile];
    const aspectsToCheck = includeMinorAspects ? [...majorAspects, ...minorAspects] : majorAspects;

    for (const natalPoint of natalPoints) {
        for (const aspectType of aspectsToCheck) {
            const cycle = await calculateSingleAspectCycle(
                transitingPlanet,
                natalPoint,
                aspectType,
                startDate,
                endDate,
                currentDate,
                sw
            );

            if (cycle) {
                cycles.push(cycle);
            }
        }
    }

    return cycles;
}

/**
 * Calculate a single aspect cycle (e.g., "Pluto square Sun" period)
 */
async function calculateSingleAspectCycle(
    transitingPlanet: Planet,
    natalPoint: any,
    aspectType: AspectType,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
    sw: any
): Promise<LifeCycle | null> {
    const aspectAngle = ASPECT_DEFINITIONS[aspectType]?.angle;
    if (aspectAngle === undefined) return null;

    const orb = getAspectCycleOrb(transitingPlanet, aspectType);
    let inAspect = false;
    let cycleStart: Date | null = null;
    let cycleEnd: Date | null = null;
    let exactDate: Date | null = null;
    let closestOrb = Infinity;

    // Sample weekly for aspect cycles
    const weeklyInterval = 7 * 24 * 60 * 60 * 1000;

    for (let time = startDate.getTime(); time <= endDate.getTime(); time += weeklyInterval) {
        const sampleDate = new Date(time);

        try {
            const planetPosition = await calculatePlanetPosition(sampleDate, transitingPlanet, sw);
            if (!planetPosition) continue;

            const angle = angularDistance(planetPosition.longitude, natalPoint.longitude);
            const currentOrb = Math.abs(angle - aspectAngle);

            if (currentOrb <= orb) {
                if (!inAspect) {
                    // Entering aspect
                    inAspect = true;
                    cycleStart = sampleDate;
                }

                // Track the most exact moment
                if (currentOrb < closestOrb) {
                    closestOrb = currentOrb;
                    exactDate = sampleDate;
                }
            } else if (inAspect) {
                // Exiting aspect
                inAspect = false;
                cycleEnd = sampleDate;
                break; // We found a complete cycle
            }
        } catch (error) {
            console.warn(`Error calculating aspect cycle:`, error);
        }
    }

    // If we're still in aspect at the end, set end date to our search limit
    if (inAspect && !cycleEnd) {
        cycleEnd = endDate;
    }

    if (cycleStart && cycleEnd && exactDate) {
        return createAspectCycle(
            transitingPlanet,
            natalPoint.planet as Planet,
            aspectType,
            cycleStart,
            cycleEnd,
            exactDate,
            currentDate
        );
    }

    return null;
}

/**
 * Calculate planetary returns
 */
async function calculatePlanetaryReturns(
    planet: Planet,
    natalChart: BirthChart,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
    sw: any
): Promise<LifeCycle[]> {
    const cycles: LifeCycle[] = [];

    const natalPlanet = natalChart.planets.find(p => p.planet === planet);
    if (!natalPlanet) return cycles;

    // For returns, we look for conjunctions to the natal position
    const returnCycle = await calculateSingleAspectCycle(
        planet,
        natalPlanet,
        AspectType.Conjunction,
        startDate,
        endDate,
        currentDate,
        sw
    );

    if (returnCycle) {
        // Modify the cycle to be a "return" type and add comprehensive interpretation
        const interpretation = getComprehensiveLifeCycleInterpretation('planetary-return', planet);

        returnCycle.type = 'planetary-return';
        returnCycle.title = interpretation?.title || `${planet} Return`;
        returnCycle.description = interpretation?.overview || getReturnDescription(planet);
        returnCycle.significance = planet === Planet.Saturn ? 'Life-Changing' : 'Very High';
        returnCycle.themes = interpretation?.keyThemes || returnCycle.themes;
        returnCycle.interpretation = interpretation || undefined;
        cycles.push(returnCycle);
    }

    return cycles;
}

// Helper functions for creating cycles
function createHouseTransitCycle(
    planet: Planet,
    house: number,
    startDate: Date,
    endDate: Date,
    currentDate: Date
): LifeCycle {
    const status = getCycleStatus(startDate, endDate, currentDate);
    const actualDuration = calculateActualDuration(startDate, endDate);
    const interpretation = getComprehensiveLifeCycleInterpretation('house-transit', planet, house, undefined, undefined, actualDuration);

    return {
        id: `${planet}-house-${house}-${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
        type: 'house-transit',
        planet,
        title: interpretation?.title || `${planet} in ${getOrdinalHouse(house)} House`,
        description: interpretation?.overview || getHouseTransitDescription(planet, house),
        startDate,
        endDate,
        status,
        significance: getHouseTransitSignificance(planet, house),
        themes: interpretation?.keyThemes || getHouseTransitThemes(planet, house),
        houseNumber: house,
        cycleLength: getHouseTransitDuration(planet),
        actualDuration,
        interpretation: interpretation || undefined
    };
}

function createAspectCycle(
    transitingPlanet: Planet,
    natalPlanet: Planet,
    aspectType: AspectType,
    startDate: Date,
    endDate: Date,
    peakDate: Date,
    currentDate: Date
): LifeCycle {
    const status = getCycleStatus(startDate, endDate, currentDate);
    const actualDuration = calculateActualDuration(startDate, endDate);
    const interpretation = getComprehensiveLifeCycleInterpretation('aspect-cycle', transitingPlanet, undefined, natalPlanet, aspectType, actualDuration);

    return {
        id: `${transitingPlanet}-${aspectType}-${natalPlanet}-${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
        type: 'aspect-cycle',
        planet: transitingPlanet,
        title: interpretation?.title || `${transitingPlanet} ${aspectType} ${natalPlanet}`,
        description: interpretation?.overview || getAspectCycleDescription(transitingPlanet, natalPlanet, aspectType),
        startDate,
        endDate,
        peakDate,
        status,
        significance: getAspectCycleSignificance(transitingPlanet, aspectType),
        themes: interpretation?.keyThemes || getAspectCycleThemes(transitingPlanet, natalPlanet, aspectType),
        natalPlanet,
        aspectType,
        cycleLength: getAspectCycleDuration(transitingPlanet),
        actualDuration,
        interpretation: interpretation || undefined
    };
}

// Helper functions
function getCycleStatus(startDate: Date, endDate: Date, currentDate: Date): 'completed' | 'active' | 'upcoming' {
    // 45-day grace window: if a cycle starts within 45 days, treat it as active.
    // This compensates for the 30-day sampling interval which can push firstEntry
    // up to a month after the planet actually crossed the house cusp.
    const gracePeriodMs = 45 * 24 * 60 * 60 * 1000;
    if (currentDate < new Date(startDate.getTime() - gracePeriodMs)) return 'upcoming';
    if (currentDate > endDate) return 'completed';
    return 'active';
}

function calculateActualDuration(startDate: Date, endDate: Date): string {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0 && months > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
    } else {
        const weeks = Math.floor(diffDays / 7);
        return weeks > 0 ? `${weeks} week${weeks > 1 ? 's' : ''}` : `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
}

function getAspectCycleOrb(planet: Planet, aspectType: AspectType): number {
    // Wider orbs for cycles since we want to capture the entire period of influence
    const baseOrbs: Record<AspectType, number> = {
        [AspectType.Conjunction]: 8.0,
        [AspectType.Square]: 8.0,
        [AspectType.Opposition]: 8.0,
        [AspectType.Trine]: 6.0,
        [AspectType.Sextile]: 4.0,
        [AspectType.Quincunx]: 3.0,
        [AspectType.Semisextile]: 2.0,
        [AspectType.Semisquare]: 2.0,
        [AspectType.Sesquisquare]: 2.0
    };

    const planetModifiers: Partial<Record<Planet, number>> = {
        [Planet.Pluto]: 1.0,
        [Planet.Neptune]: 1.0,
        [Planet.Uranus]: 1.0,
        [Planet.Saturn]: 1.0,
        [Planet.Jupiter]: 0.8,
        [Planet.Mars]: 0.6,
        [Planet.Venus]: 0.6,
        [Planet.Mercury]: 0.5,
        [Planet.Sun]: 1.0,
        [Planet.Moon]: 0.8,
        [Planet.NorthNode]: 1.0,
        [Planet.SouthNode]: 1.0,
        [Planet.Chiron]: 0.8
    };

    return (baseOrbs[aspectType] || 6.0) * (planetModifiers[planet] || 1.0);
}

async function calculatePlanetPosition(date: Date, planet: Planet, sw: any): Promise<{ longitude: number } | null> {
    try {
        const utc = DateTime.fromJSDate(date).toUTC();
        const julianDay = sw.swe_julday(
            utc.year,
            utc.month,
            utc.day,
            utc.hour + utc.minute / 60.0 + utc.second / 3600.0,
            sw.SE_GREG_CAL
        );

        const planetId = SWISSEPH_PLANETS[planet as keyof typeof SWISSEPH_PLANETS];
        if (planetId === undefined) return null;

        const result = sw.swe_calc_ut(julianDay, planetId, sw.SEFLG_SPEED);

        if ('error' in result && result.error) {
            return null;
        }

        if ('longitude' in result) {
            return { longitude: result.longitude };
        }

        return null;
    } catch (error) {
        return null;
    }
}

// Description and theme functions
function getHouseTransitDescription(planet: Planet, house: number): string {
    const descriptions: Record<string, string> = {
        [`${Planet.Saturn}-1`]: 'A period of personal restructuring, taking on new responsibilities, and maturing your identity.',
        [`${Planet.Saturn}-7`]: 'Relationship commitments, partnerships tested, learning about cooperation and compromise.',
        [`${Planet.Saturn}-10`]: 'Career advancement, public recognition, taking on leadership roles and professional responsibility.',
        [`${Planet.Uranus}-1`]: 'Personal revolution, breaking free from old patterns, discovering your authentic self.',
        [`${Planet.Uranus}-4`]: 'Home and family changes, breaking from tradition, creating unconventional living situations.',
        [`${Planet.Neptune}-12`]: 'Spiritual awakening, dissolving ego boundaries, increased psychic sensitivity.',
        [`${Planet.Pluto}-8`]: 'Deep transformation through crisis, death and rebirth themes, psychological excavation.',
        [`${Planet.Jupiter}-9`]: 'Expansion of worldview, higher education, travel, philosophical growth.'
    };

    return descriptions[`${planet}-${house}`] || `${planet} brings its transformative energy to your ${getOrdinalHouse(house)} house themes.`;
}

function getHouseTransitThemes(planet: Planet, house: number): string[] {
    const themes: Record<string, string[]> = {
        [`${Planet.Saturn}-1`]: ['Identity Formation', 'Personal Responsibility', 'Maturity', 'Self-Discipline'],
        [`${Planet.Saturn}-7`]: ['Relationship Commitment', 'Partnership Tests', 'Cooperation', 'Legal Matters'],
        [`${Planet.Saturn}-10`]: ['Career Advancement', 'Public Recognition', 'Authority', 'Professional Growth'],
        [`${Planet.Uranus}-1`]: ['Personal Freedom', 'Authenticity', 'Innovation', 'Breaking Patterns'],
        [`${Planet.Neptune}-12`]: ['Spiritual Growth', 'Psychic Development', 'Compassion', 'Transcendence'],
        [`${Planet.Pluto}-8`]: ['Transformation', 'Psychological Depth', 'Shared Resources', 'Regeneration']
    };

    return themes[`${planet}-${house}`] || ['Personal Growth', 'Life Changes', 'New Perspectives'];
}

function getAspectCycleDescription(transitingPlanet: Planet, natalPlanet: Planet, aspectType: AspectType): string {
    return `A ${getAspectCycleDuration(transitingPlanet)} period where ${transitingPlanet}'s transformative energy ${aspectType === AspectType.Conjunction ? 'merges with' : aspectType === AspectType.Square ? 'challenges' : aspectType === AspectType.Opposition ? 'opposes' : 'harmonizes with'} your natal ${natalPlanet}, creating deep shifts in ${getPlanetTheme(natalPlanet)} areas of life.`;
}

function getAspectCycleThemes(transitingPlanet: Planet, natalPlanet: Planet, aspectType: AspectType): string[] {
    const planetThemes: Partial<Record<Planet, string[]>> = {
        [Planet.Sun]: ['Identity', 'Purpose', 'Vitality', 'Leadership'],
        [Planet.Moon]: ['Emotions', 'Family', 'Security', 'Intuition'],
        [Planet.Mercury]: ['Communication', 'Learning', 'Ideas', 'Travel'],
        [Planet.Venus]: ['Love', 'Beauty', 'Values', 'Creativity'],
        [Planet.Mars]: ['Action', 'Courage', 'Sexuality', 'Competition']
    };

    return planetThemes[natalPlanet] || ['Personal Growth', 'Life Changes'];
}

function getOrdinalHouse(house: number): string {
    const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    return ordinals[house] || `${house}th`;
}

function getPlanetTheme(planet: Planet): string {
    const themes: Partial<Record<Planet, string>> = {
        [Planet.Sun]: 'identity and purpose',
        [Planet.Moon]: 'emotional and family',
        [Planet.Mercury]: 'communication and learning',
        [Planet.Venus]: 'love and creative',
        [Planet.Mars]: 'action and desire'
    };
    return themes[planet] || 'personal';
}

function getHouseTransitDuration(planet: Planet): string {
    const durations: Partial<Record<Planet, string>> = {
        [Planet.Pluto]: '12-20 years',
        [Planet.Neptune]: '14 years',
        [Planet.Uranus]: '7 years',
        [Planet.Saturn]: '2.5 years',
        [Planet.Jupiter]: '1 year'
    };
    return durations[planet] || '1-2 years';
}

function getMinimumCycleDuration(planet: Planet): number {
    // Minimum duration in months for a cycle to be considered a "life cycle"
    // This filters out brief retrograde movements
    const minimumMonths: Partial<Record<Planet, number>> = {
        [Planet.Pluto]: 12,      // 1 year minimum (vs 12-20 year average)
        [Planet.Neptune]: 12,    // 1 year minimum (vs 14 year average)
        [Planet.Uranus]: 6,      // 6 months minimum (vs 7 year average)
        [Planet.Saturn]: 3,      // 3 months minimum (vs 2.5 year average)
        [Planet.Jupiter]: 2      // 2 months minimum (vs 1 year average)
    };
    return minimumMonths[planet] || 3; // Default 3 months minimum
}

/**
 * Window (months) from a cycle's start date within which any re-entry into
 * the same house is treated as a retrograde return and merged in.
 * Set to roughly 2× the planet's typical house-transit duration so all the
 * forward/retro/forward bouncing within one "visit" collapses into one cycle.
 */
function getRetrogradeWindowMonths(planet: Planet): number {
    const windowMonths: Partial<Record<Planet, number>> = {
        [Planet.Jupiter]: 24,   // 2 years  (house transit ~12 months)
        [Planet.Saturn]: 48,    // 4 years  (house transit ~30 months)
        [Planet.Uranus]: 144,   // 12 years (house transit ~84 months)
        [Planet.Neptune]: 240,  // 20 years (house transit ~168 months)
        [Planet.Pluto]: 300,    // 25 years (house transit varies)
    };
    return windowMonths[planet] ?? 48;
}

function getAspectCycleDuration(planet: Planet): string {
    const durations: Partial<Record<Planet, string>> = {
        [Planet.Pluto]: '3-5 year',
        [Planet.Neptune]: '2-3 year',
        [Planet.Uranus]: '1-2 year',
        [Planet.Saturn]: '6-12 month',
        [Planet.Jupiter]: '2-4 month'
    };
    return durations[planet] || '6-month';
}

function getHouseTransitSignificance(planet: Planet, house: number): 'High' | 'Very High' | 'Life-Changing' {
    if ([Planet.Pluto, Planet.Neptune, Planet.Uranus].includes(planet)) {
        return 'Life-Changing';
    }
    if (planet === Planet.Saturn) {
        return [1, 4, 7, 10].includes(house) ? 'Life-Changing' : 'Very High';
    }
    return 'High';
}

function getAspectCycleSignificance(planet: Planet, aspectType: AspectType): 'High' | 'Very High' | 'Life-Changing' {
    if ([Planet.Pluto, Planet.Neptune, Planet.Uranus].includes(planet)) {
        return aspectType === AspectType.Conjunction ? 'Life-Changing' : 'Very High';
    }
    if (planet === Planet.Saturn) {
        return [AspectType.Conjunction, AspectType.Square, AspectType.Opposition].includes(aspectType) ? 'Very High' : 'High';
    }
    return 'High';
}

function getReturnDescription(planet: Planet): string {
    const descriptions: Partial<Record<Planet, string>> = {
        [Planet.Saturn]: 'The Saturn Return marks a major life milestone, occurring approximately every 29.5 years (typically around ages 28-30 and 57-60). A time of maturation, taking responsibility, and building lasting foundations.',
        [Planet.Jupiter]: 'Jupiter Return occurs every 12 years, bringing opportunities for growth, expansion, and new adventures. A time of optimism and broadening horizons.'
    };
    return descriptions[planet] || `The ${planet} return brings a cycle of renewal and growth in ${planet} themes.`;
}
