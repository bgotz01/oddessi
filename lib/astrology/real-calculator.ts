import * as swisseph from 'swisseph-v2';
import { DateTime } from 'luxon';
import {
    BirthData,
    BirthChart,
    PlanetPosition,
    Angles,
    Houses,
    Aspect,
    Planet,
    HouseSystem,
    AspectType,
} from '@/types/astrology';
import {
    SWISSEPH_PLANETS,
    ASPECT_DEFINITIONS,
    PLANET_ORB_MODIFIERS,
} from './constants';
import {
    longitudeToSign,
    angularDistance,
    getHouseForLongitude,
    validateBirthData,
} from './utils';

/**
 * Real birth chart calculator using Swiss Ephemeris
 */
export class RealBirthChartCalculator {
    private julianDay: number = 0;
    private latitude: number = 0;
    private longitude: number = 0;

    /**
     * Calculate complete birth chart
     */
    async calculateChart(birthData: BirthData): Promise<BirthChart> {
        // Validate input data
        const validation = validateBirthData(birthData);
        if (!validation.isValid) {
            throw new Error(`Invalid birth data: ${validation.errors.join(', ')}`);
        }

        // Convert to Julian Day using the correct API
        const dateTime = DateTime.fromISO(`${birthData.date}T${birthData.time}`, { zone: birthData.timezone });
        if (!dateTime.isValid) {
            throw new Error(`Invalid date/time: ${dateTime.invalidReason}`);
        }

        const utc = dateTime.toUTC();

        // Use the correct swe_julday function
        this.julianDay = swisseph.swe_julday(
            utc.year,
            utc.month,
            utc.day,
            utc.hour + utc.minute / 60.0 + utc.second / 3600.0,
            swisseph.SE_GREG_CAL
        );

        this.latitude = birthData.latitude;
        this.longitude = birthData.longitude;

        // Calculate all components
        const planets = await this.calculatePlanets();
        const angles = await this.calculateAngles();
        const houses = await this.calculateHouses(HouseSystem.Placidus);

        // Add house positions to planets
        const planetsWithHouses = this.addHousesToPlanets(planets, houses.cusps);

        // Calculate aspects
        const aspects = this.calculateAspects(planetsWithHouses, angles);

        return {
            birthData,
            planets: planetsWithHouses,
            angles,
            houses,
            aspects,
            julianDay: this.julianDay,
        };
    }

    /**
     * Calculate planet positions
     */
    private async calculatePlanets(): Promise<PlanetPosition[]> {
        const planets: PlanetPosition[] = [];
        const flag = swisseph.SEFLG_SPEED;

        for (const [planetName, planetId] of Object.entries(SWISSEPH_PLANETS)) {
            try {
                const result = swisseph.swe_calc_ut(this.julianDay, planetId, flag);

                // Check if result has error property (indicates failure)
                if ('error' in result && result.error) {
                    console.warn(`Failed to calculate ${planetName}:`, result.error);
                    continue;
                }

                // Swiss Ephemeris returns different coordinate systems
                let longitude: number;
                let latitude: number;
                let speed: number;

                if ('longitude' in result) {
                    // Ecliptic coordinates (what we want)
                    longitude = result.longitude;
                    latitude = result.latitude;
                    speed = result.longitudeSpeed;
                } else {
                    console.warn(`Unexpected coordinate system for ${planetName}`);
                    continue;
                }

                if (longitude === undefined) {
                    console.warn(`No longitude data for ${planetName}`);
                    continue;
                }

                const signInfo = longitudeToSign(longitude);

                planets.push({
                    planet: planetName as Planet,
                    longitude,
                    latitude,
                    speed,
                    sign: signInfo.sign,
                    degree: signInfo.degree,
                    minute: signInfo.minute,
                });
            } catch (error) {
                console.warn(`Error calculating ${planetName}:`, error);
            }
        }

        // Calculate South Node (opposite of North Node)
        const northNode = planets.find(p => p.planet === Planet.NorthNode);
        if (northNode) {
            const southNodeLon = (northNode.longitude + 180) % 360;
            const signInfo = longitudeToSign(southNodeLon);

            planets.push({
                planet: Planet.SouthNode,
                longitude: southNodeLon,
                latitude: -northNode.latitude,
                speed: -northNode.speed,
                sign: signInfo.sign,
                degree: signInfo.degree,
                minute: signInfo.minute,
            });
        }

        return planets;
    }

    /**
     * Calculate angles (ASC, MC, DESC, IC)
     */
    private async calculateAngles(): Promise<Angles> {
        try {
            const result = swisseph.swe_houses(
                this.julianDay,
                this.latitude,
                this.longitude,
                'P' // Placidus system
            );

            if ('error' in result && result.error) {
                throw new Error(`Failed to calculate houses: ${result.error}`);
            }

            if ('ascendant' in result) {
                return {
                    ascendant: result.ascendant,
                    midheaven: result.mc,
                    descendant: (result.ascendant + 180) % 360,
                    imumCoeli: (result.mc + 180) % 360,
                };
            } else {
                throw new Error('Invalid houses result format');
            }
        } catch (error) {
            throw new Error(`Error calculating angles: ${error}`);
        }
    }

    /**
     * Calculate house cusps
     */
    private async calculateHouses(system: HouseSystem): Promise<Houses> {
        try {
            const result = swisseph.swe_houses(
                this.julianDay,
                this.latitude,
                this.longitude,
                'P' // Placidus system
            );

            if ('error' in result && result.error) {
                throw new Error(`Failed to calculate houses: ${result.error}`);
            }

            if ('house' in result) {
                return {
                    system,
                    cusps: result.house || [],
                };
            } else {
                throw new Error('Invalid houses result format');
            }
        } catch (error) {
            throw new Error(`Error calculating houses: ${error}`);
        }
    }

    /**
     * Add house positions to planets
     */
    private addHousesToPlanets(
        planets: PlanetPosition[],
        houseCusps: number[]
    ): PlanetPosition[] {
        return planets.map(planet => ({
            ...planet,
            house: getHouseForLongitude(planet.longitude, houseCusps),
        }));
    }

    /**
     * Calculate aspects between planets and angles
     */
    private calculateAspects(
        planets: PlanetPosition[],
        angles: Angles
    ): Aspect[] {
        const aspects: Aspect[] = [];
        const allPoints = [
            ...planets,
            // Add angles as pseudo-planets for aspect calculation
            {
                planet: 'Ascendant' as Planet,
                longitude: angles.ascendant,
            },
            {
                planet: 'Midheaven' as Planet,
                longitude: angles.midheaven,
            },
        ];

        // Calculate aspects between all combinations
        for (let i = 0; i < allPoints.length; i++) {
            for (let j = i + 1; j < allPoints.length; j++) {
                const point1 = allPoints[i];
                const point2 = allPoints[j];

                const aspect = this.findAspect(point1, point2);
                if (aspect) {
                    aspects.push(aspect);
                }
            }
        }

        return aspects.sort((a, b) => a.orb - b.orb);
    }

    /**
     * Find aspect between two points
     */
    private findAspect(
        point1: { planet: Planet; longitude: number },
        point2: { planet: Planet; longitude: number }
    ): Aspect | null {
        const distance = angularDistance(point1.longitude, point2.longitude);

        for (const [aspectType, definition] of Object.entries(ASPECT_DEFINITIONS)) {
            const targetAngle = definition.angle;
            const baseOrb = definition.orb;

            // Apply planet-specific orb modifiers
            const modifier1 = PLANET_ORB_MODIFIERS[point1.planet] || 1;
            const modifier2 = PLANET_ORB_MODIFIERS[point2.planet] || 1;
            const avgModifier = (modifier1 + modifier2) / 2;
            const adjustedOrb = baseOrb * avgModifier;

            const orbDifference = Math.abs(distance - targetAngle);

            if (orbDifference <= adjustedOrb) {
                const exactness = Math.max(0, 100 - (orbDifference / adjustedOrb) * 100);

                return {
                    planet1: point1.planet,
                    planet2: point2.planet,
                    type: aspectType as AspectType,
                    angle: distance,
                    orb: orbDifference,
                    exactness: Math.round(exactness),
                };
            }
        }

        return null;
    }
}

/**
 * Convenience function to calculate a birth chart
 */
export async function calculateRealBirthChart(birthData: BirthData): Promise<BirthChart> {
    const calculator = new RealBirthChartCalculator();
    return calculator.calculateChart(birthData);
}