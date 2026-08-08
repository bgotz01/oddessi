// Enhanced transit types for comprehensive transit system
import { Planet, AspectType, ZodiacSign, BirthChart } from './astrology';

// Core comprehensive transit interfaces
export interface ComprehensiveTransit {
    id: string;
    transitingPlanet: Planet;
    natalPlanet: Planet;
    aspectType: AspectType;
    exactDate: Date;
    orb: number;
    isApplying: boolean;
    transitPosition: {
        longitude: number;
        sign: ZodiacSign;
        degree: number;
        minute: number;
    };
    natalPosition: {
        longitude: number;
        sign: ZodiacSign;
        degree: number;
        minute: number;
    };
    significance: TransitSignificance;
    tags: TransitTag[];
    educationalLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: TransitDuration;
    keyPeriods: KeyPeriod[];
    relatedTransits: string[]; // IDs of related transits
}

export interface SignTransit {
    id: string;
    planet: Planet;
    sign: ZodiacSign;
    entryDate: Date;
    exitDate: Date;
    stationDates: Date[]; // Retrograde stations within this sign
    keyThemes: string[];
    duration: string; // Human-readable duration
    isRetrograde: boolean;
    passes: SignTransitPass[]; // Multiple passes due to retrograde
}

export interface SignTransitPass {
    passNumber: number; // 1, 2, 3 for multiple passes
    entryDate: Date;
    exitDate: Date;
    isRetrograde: boolean;
    stationDates: Date[];
}

export interface HouseTransit {
    id: string;
    planet: Planet;
    house: number;
    entryDate: Date;
    exitDate: Date;
    lifeAreas: string[];
    keyEvents: string[];
    duration: string;
    passes: HouseTransitPass[];
}

export interface HouseTransitPass {
    passNumber: number;
    entryDate: Date;
    exitDate: Date;
    isRetrograde: boolean;
}

export interface TransitSignificance {
    overallRating: 1 | 2 | 3 | 4 | 5;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Once in Lifetime';
    lifeImpact: 'Minor' | 'Moderate' | 'Major' | 'Life-Changing';
    urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface TransitTag {
    category: 'Career' | 'Relationships' | 'Health' | 'Spirituality' | 'Finance' | 'Family' | 'Education';
    subcategory?: string;
    intensity: 'Light' | 'Moderate' | 'Strong' | 'Intense';
}

export interface TransitDuration {
    totalDays: number;
    approachPhase: {
        startDate: Date;
        endDate: Date;
        days: number;
    };
    exactPhase: {
        startDate: Date;
        endDate: Date;
        days: number;
    };
    separatingPhase: {
        startDate: Date;
        endDate: Date;
        days: number;
    };
}

export interface KeyPeriod {
    date: Date;
    type: 'Approach' | 'Exact' | 'Station' | 'Peak Influence';
    description: string;
    significance: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface RetrogradePeriod {
    planet: Planet;
    stationRetrogradeDate: Date;
    stationDirectDate: Date;
    sign: ZodiacSign;
    degreeRange: {
        start: number;
        end: number;
    };
    duration: number; // days
    significance: string;
}

// Multi-year calculation types
export interface MultiYearTransitOptions {
    natalChart: BirthChart;
    startYear: number;
    endYear: number;
    includedPlanets: Planet[];
    aspectTypes: AspectType[];
    minimumOrb: number;
    includeSignTransits: boolean;
    includeHouseTransits: boolean;
    includeRetrogradePeriods: boolean;
    significanceThreshold: 1 | 2 | 3 | 4 | 5; // Minimum significance rating
}

export interface TransitYearData {
    year: number;
    majorTransits: ComprehensiveTransit[];
    signTransits: SignTransit[];
    houseTransits: HouseTransit[];
    retrogradePeriods: RetrogradePeriod[];
    yearlyThemes: string[];
    significanceRating: 'Low' | 'Medium' | 'High' | 'Very High';
    totalTransitCount: number;
    highImpactTransitCount: number;
}

// Calculation result types
export interface MultiYearTransitResult {
    options: MultiYearTransitOptions;
    yearData: TransitYearData[];
    summary: {
        totalYears: number;
        totalTransits: number;
        mostSignificantYear: number;
        overallThemes: string[];
        majorLifeEvents: string[];
    };
    calculationMetadata: {
        calculatedAt: Date;
        calculationTime: number; // milliseconds
        swissEphemerisVersion: string;
        cacheHit: boolean;
    };
}

// Batch calculation types
export interface BatchTransitRequest {
    id: string;
    natalChart: BirthChart;
    options: MultiYearTransitOptions;
    priority: 'Low' | 'Medium' | 'High';
}

export interface BatchTransitResponse {
    requestId: string;
    result: MultiYearTransitResult;
    status: 'Success' | 'Error' | 'Partial';
    error?: string;
    processingTime: number;
}

// Transit calculation context
export interface TransitCalculationContext {
    natalChart: BirthChart;
    currentDate: Date;
    calculationPrecision: 'Fast' | 'Standard' | 'Precise';
    includeMinorAspects: boolean;
    customOrbSettings?: Record<AspectType, number>;
}

// Enhanced orb calculation
export interface OrbConfiguration {
    planet: Planet;
    aspectType: AspectType;
    baseOrb: number;
    modifier: number;
    maxOrb: number;
    minOrb: number;
}

// Station calculation types
export interface PlanetaryStation {
    planet: Planet;
    date: Date;
    longitude: number;
    sign: ZodiacSign;
    degree: number;
    minute: number;
    type: 'Retrograde' | 'Direct';
    significance: string;
    duration: number; // days of stationary period
}

export interface StationPeriod {
    planet: Planet;
    startDate: Date;
    endDate: Date;
    stationType: 'Retrograde' | 'Direct';
    stationaryDegree: number;
    stationarySign: ZodiacSign;
    shadowPeriod: {
        preStation: { start: Date; end: Date };
        postStation: { start: Date; end: Date };
    };
}