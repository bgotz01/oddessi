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
    /**
     * What the aspect is made to. A planet, the north node, or one of the two
     * angles — which is why this is not `Planet`. The angles are real natal
     * targets and not a loosening of the type.
     */
    natalPlanet?: Planet | string;
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
    /**
     * Unused. The span runs from birth — see SPAN_YEARS.
     *
     * Kept only because callers still pass it; it was silently ignored before
     * this comment existed, which is how the window came to start at a
     * hardcoded year 2000 while three call sites believed they were setting it.
     */
    lookbackYears?: number;
    /** Floor for the end of the span, past today. The span may exceed it. */
    lookaheadYears?: number;
    includeJupiter?: boolean; // Include Jupiter cycles (default: true)
    includeMinorAspects?: boolean; // Include sextiles, trines (default: false)
    unlimitedUpcoming?: boolean; // Return all upcoming cycles without limit (default: false)
    unlimitedCompleted?: boolean; // Return all completed cycles without limit (default: false)
}

/**
 * How far past birth to compute, in years.
 *
 * Ninety, because the Activation page reads a life as eighty-four — the Uranus
 * return — and a transit running at the end of that grid needs room to finish.
 */
const SPAN_YEARS = 90;

/**
 * The angles, named as the rest of the app names them.
 *
 * `lib/charts.ts` already calls them "Ascendant" and "Midheaven" when it
 * synthesises placements for display, and these strings end up in the same
 * `natalPlanet` column the planet names do. Two spellings of the Midheaven in
 * one table would be indistinguishable from two different points.
 */
/**
 * How far past today the span must reach, whatever the birth date says.
 *
 * Only ever binds for someone old enough that birth + SPAN_YEARS has nearly
 * arrived; for everyone else the ninety-year span ends decades later and this
 * is not consulted. It is a floor, not the window — the window is a life.
 */
const LOOKAHEAD_FLOOR_YEARS = 25;

const ANGLE_ASCENDANT = 'Ascendant';
const ANGLE_MIDHEAVEN = 'Midheaven';
const ANGLES: string[] = [ANGLE_ASCENDANT, ANGLE_MIDHEAVEN];

/**
 * A point a transit can be measured against.
 *
 * Deliberately not `PlanetPosition`. Half of these are not planets and have no
 * sign, speed or house of their own — an angle is a longitude and a name, and
 * the scan needs nothing else.
 */
interface NatalPoint {
    planet: string;
    longitude: number;
}

/**
 * Calculate major life cycles - the long-term themes and periods that shape life chapters
 */
export async function calculateLifeCycles(options: LifeCycleOptions): Promise<LifeCyclePeriods> {
    const {
        natalChart,
        // `lookbackYears` is deliberately not bound. It is ignored — the span
        // starts at birth — and binding it with a plausible default made the
        // window look configurable at a glance when it is not. Reading `15`
        // here and concluding the cache only reaches back fifteen years is the
        // exact misreading the field invites.
        lookaheadYears = LOOKAHEAD_FLOOR_YEARS,
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

    // Major natal points for aspect cycles.
    //
    // The North Node earns its place here even though it is not a body. It is
    // the point the whole Growth model is read from, and without it the cache
    // could say a transit was crossing the node's HOUSE but never that it was
    // hitting the node itself — a much weaker claim, and the one the Timing
    // section was reduced to making.
    //
    // Only the north node is sampled. The nodes are an axis, so every aspect to
    // one is an aspect to the other: conjunct the north IS opposite the south,
    // and a square hits both at once. Adding the south node would double the
    // rows and every one of them would be a restatement.
    const majorNatalPoints: NatalPoint[] = natalChart.planets
        .filter(p =>
            [Planet.Sun, Planet.Moon, Planet.Mercury, Planet.Venus, Planet.Mars, Planet.NorthNode].includes(p.planet as Planet)
        )
        .map(p => ({ planet: p.planet as string, longitude: p.longitude }));

    // The angles.
    //
    // Two of the four, on exactly the argument the north node is sampled alone
    // on: an angle is one end of an axis, so every aspect to one end is an
    // aspect to the other. Conjunct the Midheaven IS opposite the Imum Coeli;
    // conjunct the Ascendant IS opposite the Descendant. Adding the other two
    // would double the rows and every added row would be a restatement.
    //
    // The Ascendant and the Midheaven are NOT one axis, which is why both are
    // here. They sit ninety degrees apart only in the equal-house fiction —
    // under Placidus the quadrants are unequal, which is the whole reason the
    // cusps are worth computing at all. So when a planet reaches the Midheaven
    // says nothing about when it reaches the Ascendant, and neither can be
    // derived from the other.
    //
    // These are the most birth-time-sensitive points in a chart. The Midheaven
    // moves about a degree every four minutes, so a chart saved with a rounded
    // or remembered birth time carries angles wrong by degrees and dates here
    // wrong by months. Nothing downstream can detect that, because a wrong
    // angle produces a perfectly well-formed transit.
    if (natalChart.angles) {
        const { ascendant, midheaven } = natalChart.angles;
        if (typeof ascendant === 'number') {
            majorNatalPoints.push({ planet: ANGLE_ASCENDANT, longitude: ascendant });
        }
        if (typeof midheaven === 'number') {
            majorNatalPoints.push({ planet: ANGLE_MIDHEAVEN, longitude: midheaven });
        }
    }

    // The span is BIRTH-RELATIVE, not a fixed stretch of calendar.
    //
    // It used to start at a hardcoded 1 January 2000 — `lookbackYears` was
    // destructured and then never read — and end a couple of decades past the
    // present, which gave every chart the same window regardless of when its
    // owner was born. For someone born in 1986 that covered ages 14 to 65: it
    // missed the first nodal return entirely and stopped two decades short of
    // the end. For someone born in 2001 it wasted eleven years computing a sky
    // nobody was alive under, and still ran out at 50.
    //
    // A life is the right unit. Ninety years from birth covers the whole
    // eighty-four-year grid the Activation page draws, for every chart, with
    // margin — and computes nothing before the person existed. The end is
    // floored at `lookaheadYears` past today so a chart whose owner is already
    // past ninety still gets a forward window instead of none.
    const now = new Date();
    const birth = new Date(`${natalChart.birthData.date}T12:00:00Z`);
    const startDate = Number.isFinite(birth.getTime())
        ? birth
        : new Date(2000, 0, 1);

    const endOfLife = new Date(startDate);
    endOfLife.setFullYear(endOfLife.getFullYear() + SPAN_YEARS);
    const endOfLookahead = new Date(now.getFullYear() + lookaheadYears, 11, 31);
    const endDate =
        endOfLife > endOfLookahead ? endOfLife : endOfLookahead;

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

    // Gap-fill pass: a gap ≤ 2× the sample interval (28 days) between consecutive
    // candidates is a sampling artefact — the planet crossed the cusp between two
    // sample points, not a real void. Extend the earlier candidate's end to meet
    // the next candidate's start so the cycle timeline has no holes.
    const GAP_FILL_MS = 2 * sampleInterval; // 28 days
    for (let i = 0; i < nonOverlapping.length - 1; i++) {
        const cur = nonOverlapping[i];
        const next = nonOverlapping[i + 1];
        const gap = next.start.getTime() - cur.end.getTime();
        if (gap > 0 && gap <= GAP_FILL_MS) {
            cur.end = next.start;
            // If this candidate had no retrograde periods its initialEnd was the
            // same as its end — keep them consistent.
            if (cur.retrogradePeriods.length === 0) {
                cur.initialEnd = cur.end;
            }
        }
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
    natalPoints: NatalPoint[],
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
            const passes = await calculateAspectPasses(
                transitingPlanet,
                natalPoint,
                aspectType,
                startDate,
                endDate,
                currentDate,
                sw
            );

            cycles.push(...passes);
        }
    }

    return cycles;
}

/**
 * Every pass a transiting planet makes of one aspect to one natal point.
 *
 * This used to return at most ONE cycle. The scan opened on first contact, and
 * the moment the planet left orb it `break`ed out of the loop — so a fifty-year
 * window recorded a single Jupiter square Venus and then went silent about the
 * four that followed. It was not visible as a bug because the row that survived
 * was always a real transit; what was missing was everything after it. The
 * symptom downstream was an ephemeris that appeared to run dry: Jupiter aspects
 * stopped in 2011 and Saturn's in 2028, which read like a row cap in the
 * generator and was actually the first pass being the only pass.
 *
 * It matters much more now than it did. A node aspect that is only ever
 * reported once is worth very little — the point of putting the nodes in the
 * cache is to catch Saturn crossing the axis at 29 AND at 58.
 *
 * Retrograde re-entries are merged rather than emitted as separate passes,
 * using the same envelope-plus-segments shape the house transits produce, so
 * the timeline draws one transit with gaps in it instead of three transits.
 */
async function calculateAspectPasses(
    transitingPlanet: Planet,
    natalPoint: NatalPoint,
    aspectType: AspectType,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
    sw: any
): Promise<LifeCycle[]> {
    const aspectAngle = ASPECT_DEFINITIONS[aspectType]?.angle;
    if (aspectAngle === undefined) return [];

    const orb = getAspectCycleOrb(transitingPlanet, aspectType, natalPoint.planet);

    // Sample weekly for aspect cycles
    const weeklyInterval = 7 * 24 * 60 * 60 * 1000;

    // 1. Every stretch the planet spends inside orb, with its most exact moment.
    type Window = { start: Date; end: Date; exact: Date; closestOrb: number };
    const windows: Window[] = [];
    let open: Window | null = null;
    let failureCount = 0;

    for (let time = startDate.getTime(); time <= endDate.getTime(); time += weeklyInterval) {
        const sampleDate = new Date(time);

        let planetPosition: { longitude: number } | null = null;
        try {
            planetPosition = await calculatePlanetPosition(sampleDate, transitingPlanet, sw);
        } catch (error) {
            console.warn(`Error calculating aspect cycle:`, error);
        }
        if (!planetPosition) {
            // Bail out of a dead ephemeris rather than walking fifty years of it.
            if (++failureCount > 10) break;
            continue;
        }
        failureCount = 0;

        const angle = angularDistance(planetPosition.longitude, natalPoint.longitude);
        const currentOrb = Math.abs(angle - aspectAngle);

        if (currentOrb <= orb) {
            if (!open) {
                open = { start: sampleDate, end: sampleDate, exact: sampleDate, closestOrb: currentOrb };
            } else {
                open.end = sampleDate;
                if (currentOrb < open.closestOrb) {
                    open.closestOrb = currentOrb;
                    open.exact = sampleDate;
                }
            }
        } else if (open) {
            windows.push(open);
            open = null;
        }
    }
    // Still in orb when the search window ran out — a real, ongoing transit.
    if (open) windows.push(open);

    // 2. Merge retrograde re-entries into the pass they belong to.
    //
    // The window is measured from the pass's start, exactly as house transits
    // do it. It is generous — years, for the outer planets — but it cannot
    // over-merge, because the NEXT pass of the same aspect is a large fraction
    // of an orbit away: Jupiter repeats a given aspect every twelve years
    // against a two-year window, Pluto every sixty-odd against twenty-five.
    const retrogradeWindowMonths = getRetrogradeWindowMonths(transitingPlanet);
    const MONTH_MS = 1000 * 60 * 60 * 24 * 30;

    type Pass = {
        start: Date;
        initialEnd: Date;
        end: Date;
        exact: Date;
        closestOrb: number;
        retrogradePeriods: Array<{ startDate: Date; endDate: Date }>;
    };
    const passes: Pass[] = [];

    for (const w of windows) {
        const last = passes[passes.length - 1];
        const withinWindow =
            last && (w.start.getTime() - last.start.getTime()) / MONTH_MS <= retrogradeWindowMonths;

        if (last && withinWindow) {
            last.retrogradePeriods.push({ startDate: w.start, endDate: w.end });
            last.end = w.end;
            // Exactitude belongs to whichever contact came closest, which is
            // often the middle one of a retrograde triple rather than the first.
            if (w.closestOrb < last.closestOrb) {
                last.closestOrb = w.closestOrb;
                last.exact = w.exact;
            }
        } else {
            passes.push({
                start: w.start,
                initialEnd: w.end,
                end: w.end,
                exact: w.exact,
                closestOrb: w.closestOrb,
                retrogradePeriods: [],
            });
        }
    }

    return passes.map(p => {
        const cycle = createAspectCycle(
            transitingPlanet,
            natalPoint.planet,
            aspectType,
            p.start,
            p.end,
            p.exact,
            currentDate
        );
        if (p.retrogradePeriods.length > 0) {
            cycle.retrogradePeriods = p.retrogradePeriods;
            cycle.initialEnd = p.initialEnd;
        }
        return cycle;
    });
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

    // A return is a conjunction to the planet's own natal position — every
    // one of them, not merely the first. Jupiter comes home roughly every
    // twelve years and Saturn twice in a long life; the single-pass scan this
    // used to share with the aspect cycles reported exactly one of each per
    // chart, which is why the cache held fourteen Saturn returns for fourteen
    // charts and no second return anywhere in it.
    const passes = await calculateAspectPasses(
        planet,
        natalPlanet,
        AspectType.Conjunction,
        startDate,
        endDate,
        currentDate,
        sw
    );

    const interpretation = getComprehensiveLifeCycleInterpretation('planetary-return', planet);

    for (const returnCycle of passes) {
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
    natalPlanet: Planet | string,
    aspectType: AspectType,
    startDate: Date,
    endDate: Date,
    peakDate: Date,
    currentDate: Date
): LifeCycle {
    const status = getCycleStatus(startDate, endDate, currentDate);
    const actualDuration = calculateActualDuration(startDate, endDate);
    // No hand-written table covers the angles, so this composes one from the
    // angle's own vocabulary rather than returning null — see
    // `getNatalPlanetThemes`. Writing thirty fixed paragraphs for five planets
    // by three aspects by two angles would put the same text in front of every
    // chart; the structure is computed and the model writes the detail.
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

/**
 * How tight a node aspect has to be to count.
 *
 * The standing orbs here are deliberately wide — eight degrees for a hard
 * aspect — because they are trying to capture a whole *period* of influence
 * rather than a hit. That is defensible for a body and wrong for the nodes.
 * The nodes are a computed point with no disc and no dignity, they are read
 * tightly by every tradition that uses them at all, and eight degrees of Pluto
 * is roughly eight years — a "transit" long enough to cover two nodal beats,
 * which would hand the Timing section exactly the kind of unfalsifiable window
 * it exists to avoid. Three degrees puts Pluto near three years, Saturn near
 * six months, and Jupiter inside a season.
 */
const NODE_ASPECT_ORB = 3.0;

/**
 * An angle's orb — a point's, not a body's.
 *
 * The wide orbs below stand for a planet's sphere of influence. An angle has no
 * body for one to be a sphere of, which is the same reason the nodes are held
 * to three degrees. The angles have a second reason the nodes do not: they are
 * the fastest-moving points in a natal chart, so their position already carries
 * whatever error the recorded birth time carries. A wide orb on top of that
 * yields a window too long to be wrong.
 */
const ANGLE_ASPECT_ORB = 3.0;

function getAspectCycleOrb(planet: Planet, aspectType: AspectType, natalPoint?: Planet | string): number {
    if (natalPoint === Planet.NorthNode || natalPoint === Planet.SouthNode) {
        return NODE_ASPECT_ORB;
    }

    if (natalPoint && ANGLES.includes(natalPoint)) {
        return ANGLE_ASPECT_ORB;
    }

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

/**
 * Transiting positions, memoised across the whole run.
 *
 * The aspect scan asks for the same position over and over: for each planet it
 * walks the span once per natal point per aspect — six points times three
 * aspects — so every position was computed eighteen times, and every one of
 * those was a Swiss Ephemeris call. Widening the span was therefore eighteen
 * times more expensive than it needed to be.
 *
 * Safe to keep between charts, which is what makes a bulk recache cheap: where
 * a planet is on a given date is a fact about the sky and has nothing to do
 * with whose chart is being computed. Only the natal points differ.
 */
const POSITIONS = new Map<string, { longitude: number } | null>();

/** Roughly a century of weekly samples for five planets, with room to spare. */
const POSITION_CACHE_LIMIT = 200_000;

async function calculatePlanetPosition(date: Date, planet: Planet, sw: any): Promise<{ longitude: number } | null> {
    const key = `${planet}:${date.getTime()}`;
    if (POSITIONS.has(key)) return POSITIONS.get(key)!;

    const value = await computePlanetPosition(date, planet, sw);
    if (POSITIONS.size < POSITION_CACHE_LIMIT) POSITIONS.set(key, value);
    return value;
}

async function computePlanetPosition(date: Date, planet: Planet, sw: any): Promise<{ longitude: number } | null> {
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

function getAspectCycleDescription(transitingPlanet: Planet, natalPlanet: Planet | string, aspectType: AspectType): string {
    return `A ${getAspectCycleDuration(transitingPlanet)} period where ${transitingPlanet}'s transformative energy ${aspectType === AspectType.Conjunction ? 'merges with' : aspectType === AspectType.Square ? 'challenges' : aspectType === AspectType.Opposition ? 'opposes' : 'harmonizes with'} your natal ${natalPlanet}, creating deep shifts in ${getPlanetTheme(natalPlanet)} areas of life.`;
}

function getAspectCycleThemes(transitingPlanet: Planet, natalPlanet: Planet | string, aspectType: AspectType): string[] {
    // The angles carry no interpretation table, so unlike the planets these
    // strings are not a fallback — they are the whole of what a reader gets
    // before the model writes over them. Worth being true rather than generic.
    const planetThemes: Record<string, string[]> = {
        [Planet.Sun]: ['Identity', 'Purpose', 'Vitality', 'Leadership'],
        [Planet.Moon]: ['Emotions', 'Family', 'Security', 'Intuition'],
        [Planet.Mercury]: ['Communication', 'Learning', 'Ideas', 'Travel'],
        [Planet.Venus]: ['Love', 'Beauty', 'Values', 'Creativity'],
        [Planet.Mars]: ['Action', 'Courage', 'Sexuality', 'Competition'],
        [ANGLE_ASCENDANT]: ['Self-presentation', 'Approach', 'Vitality', 'How others meet you'],
        [ANGLE_MIDHEAVEN]: ['Vocation', 'Public standing', 'Direction', 'What you are known for']
    };

    return planetThemes[natalPlanet] || ['Personal Growth', 'Life Changes'];
}

function getOrdinalHouse(house: number): string {
    const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    return ordinals[house] || `${house}th`;
}

function getPlanetTheme(planet: Planet | string): string {
    const themes: Record<string, string> = {
        [Planet.Sun]: 'identity and purpose',
        [Planet.Moon]: 'emotional and family',
        [Planet.Mercury]: 'communication and learning',
        [Planet.Venus]: 'love and creative',
        [Planet.Mars]: 'action and desire',
        [ANGLE_ASCENDANT]: 'self-presentation and approach',
        [ANGLE_MIDHEAVEN]: 'vocational and public'
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
