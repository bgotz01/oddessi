import { Planet, AspectType } from '@/types/astrology';
import {
    HOUSE_TRANSIT_INTERPRETATIONS,
    getLifeCycleInterpretation
} from './life-cycles';
import { ASPECT_CYCLE_INTERPRETATIONS } from './aspect-cycles';
import { PLANETARY_RETURN_INTERPRETATIONS } from './planetary-returns';

// Legacy interface for backward compatibility
interface LegacyLifeCycleInterpretation {
    title: string;
    description?: string;
    keyThemes?: string[];
    opportunities?: string[];
    challenges?: string[];
    guidance?: string[];
    spiritualSignificance?: string;
    practicalManifestations?: string[];
}

export interface LifeCycleInterpretation {
    title: string;

    // Fields that match UI headers exactly
    overview?: string;                    // Overview paragraph (not a header, but the main description)
    coreLesson?: string;                 // "Core Lesson" - center of gravity
    keyThemes?: string[];                // "Key Themes" (Column 1)
    growthOpportunities?: string[];      // "Growth & Opportunities" (Column 2) 
    guidance?: string[];                 // "Guidance" (subsection in Daily Integration)
    watchFor?: string[];                 // "Watch For" (subsection in Daily Integration)
    howThisShowsUp?: string[];          // "How This Tends to Show Up"
    helpfulResources?: string[];         // "Helpful Resources"
    timingPhases?: string;              // "Timing & Phases"
}

/**
 * Get comprehensive interpretation - uses detailed hand-written interpretations where available,
 * falls back to generated interpretations for missing combinations
 */
export function getComprehensiveLifeCycleInterpretation(
    type: 'house-transit' | 'aspect-cycle' | 'planetary-return',
    planet: Planet,
    houseNumber?: number,
    natalPlanet?: Planet,
    aspectType?: AspectType,
    actualDuration?: string
): LifeCycleInterpretation | null {
    // First try to get the detailed hand-written interpretation
    let detailedInterpretation: LifeCycleInterpretation | null = null;

    switch (type) {
        case 'house-transit':
            detailedInterpretation = getLifeCycleInterpretation(type, planet, houseNumber, natalPlanet, aspectType?.toString());
            break;
        case 'aspect-cycle':
            if (natalPlanet && aspectType) {
                const key = `${planet}-${aspectType}-${natalPlanet}`;
                const legacyInterpretation = ASPECT_CYCLE_INTERPRETATIONS[key];
                if (legacyInterpretation) {
                    // Convert legacy format to new format
                    detailedInterpretation = {
                        title: legacyInterpretation.title,
                        overview: legacyInterpretation.description,
                        keyThemes: legacyInterpretation.keyThemes,
                        growthOpportunities: legacyInterpretation.opportunities,
                        guidance: legacyInterpretation.guidance,
                        watchFor: legacyInterpretation.challenges,
                        howThisShowsUp: legacyInterpretation.practicalManifestations
                    };
                }
            }
            break;
        case 'planetary-return':
            const key = `${planet}-Return`;
            const legacyReturnInterpretation = PLANETARY_RETURN_INTERPRETATIONS[key];
            if (legacyReturnInterpretation) {
                // Convert legacy format to new format
                detailedInterpretation = {
                    title: legacyReturnInterpretation.title,
                    overview: legacyReturnInterpretation.description,
                    keyThemes: legacyReturnInterpretation.keyThemes,
                    growthOpportunities: legacyReturnInterpretation.opportunities,
                    guidance: legacyReturnInterpretation.guidance,
                    watchFor: legacyReturnInterpretation.challenges,
                    howThisShowsUp: legacyReturnInterpretation.practicalManifestations
                };
            }
            break;
    }

    if (detailedInterpretation) {
        // Use the new field structure directly
        const interpretation: LifeCycleInterpretation = {
            ...detailedInterpretation
        };

        // Remove any duration references from the overview since duration is shown separately in the UI
        if (interpretation.overview) {
            const cleanedOverview = interpretation.overview.replace(
                /A \d+(\.\d+)?\s*years?\s+period\s+(where|of|that)/g,
                'A period $2'
            ).replace(
                /A \d+(\.\d+)?\s*years?\s+/g,
                'A '
            ).replace(
                /\d+(\.\d+)?\s*years?\s+/g,
                ''
            );
            interpretation.overview = cleanedOverview;
        }

        return interpretation;
    }

    // Fall back to generated interpretation for missing combinations
    try {
        switch (type) {
            case 'house-transit':
                if (!houseNumber || houseNumber < 1 || houseNumber > 12) return null;
                return generateHouseTransitInterpretation(planet, houseNumber, actualDuration);

            case 'aspect-cycle':
                if (!natalPlanet || !aspectType) return null;
                return generateAspectCycleInterpretation(planet, aspectType, natalPlanet, actualDuration);

            case 'planetary-return':
                return generatePlanetaryReturnInterpretation(planet);

            default:
                return null;
        }
    } catch (error) {
        console.error('Error generating life cycle interpretation:', error);
        return null;
    }
}

// ============================================================================
// HOUSE TRANSIT INTERPRETATIONS
// ============================================================================

function generateHouseTransitInterpretation(planet: Planet, house: number, actualDuration?: string): LifeCycleInterpretation {
    const planetName = getPlanetName(planet);
    const houseName = getHouseName(house);
    const houseThemes = getHouseThemes(house);
    const houseVerbs = getHouseVerbs(house);
    const planetEnergy = getPlanetEnergy(planet);

    // More human, descriptive title
    const title = `${planetName} in ${house}${getOrdinalSuffix(house)} House: ${planetEnergy.type.split(' ')[0].charAt(0).toUpperCase() + planetEnergy.type.split(' ')[0].slice(1)} ${houseName}`;

    // Overview: what's happening + arena + felt sense (pressure vs opportunity)
    const overview = `${planetName}'s ${planetEnergy.type} energy focuses on ${getHouseAreas(house)}. This cycle brings ${planetEnergy.effect}. You'll likely feel ${planetEnergy.pressures[0].toLowerCase()} alongside ${planetEnergy.opportunities[0].toLowerCase()}.`;

    // Key Themes: nouns and short phrases only, capped at 6
    const keyThemes = [
        ...houseThemes.slice(0, 3),
        ...planetEnergy.keywords.slice(0, 3)
    ].slice(0, 6);

    // Growth Opportunities: proactive verbs + concrete targets
    const growthOpportunities = [
        `${houseVerbs[0].charAt(0).toUpperCase() + houseVerbs[0].slice(1)} your approach to ${houseThemes[0].toLowerCase()}`,
        `${houseVerbs[1].charAt(0).toUpperCase() + houseVerbs[1].slice(1)} ${getHouseAreas(house).split(',')[0]}`,
        `Use ${planetName}'s energy to ${houseVerbs[2]} ${houseThemes[1]?.toLowerCase() || houseThemes[0].toLowerCase()}`,
        `Build capacity for ${planetEnergy.keywords[0].toLowerCase()} in ${houseName.toLowerCase()}`
    ];

    // Watch For: failure modes + what they look like in real life
    const watchFor = [
        `${planetEnergy.pressures[0]} showing up as ${getConcreteFailureMode(planet, house)}`,
        `${planetEnergy.pressures[1]} in ${houseThemes[0].toLowerCase()}`,
        `Avoiding necessary ${houseVerbs[0]}ing when ${planetName} demands it`,
        `${planetEnergy.pressures[2]} affecting your ${getHouseAreas(house).split(',')[0]}`
    ];

    // Guidance: 3-4 practical "do this" behaviors
    const guidance = [
        `${houseVerbs[0].charAt(0).toUpperCase() + houseVerbs[0].slice(1)} one specific thing in your ${houseThemes[0].toLowerCase()} this week`,
        `Track patterns in ${getHouseAreas(house).split(',')[0]} weekly, not daily`,
        `When ${planetEnergy.pressures[0].toLowerCase()} appears, ${houseVerbs[2]} rather than avoid`,
        `Focus on ${planetEnergy.keywords[0].toLowerCase()} in ${houseName.toLowerCase()} matters`
    ];

    // How This Shows Up: observable events, conversations, decisions, constraints
    const howThisShowsUp = [
        `Conversations about ${houseThemes[0].toLowerCase()} become more frequent or intense`,
        `Decisions required in ${getHouseAreas(house).split(',')[0]}`,
        `${planetEnergy.opportunities[0]} appearing in ${houseThemes[1]?.toLowerCase() || houseThemes[0].toLowerCase()}`,
        `Constraints or pressure around ${getHouseAreas(house).split(' and ')[0]}`
    ];

    return {
        title,
        overview,
        keyThemes,
        growthOpportunities,
        guidance,
        watchFor,
        howThisShowsUp
    };
}

// ============================================================================
// ASPECT CYCLE INTERPRETATIONS
// ============================================================================

function generateAspectCycleInterpretation(
    transitingPlanet: Planet,
    aspectType: AspectType,
    natalPlanet: Planet,
    actualDuration?: string
): LifeCycleInterpretation {
    const transitName = getPlanetName(transitingPlanet);
    const natalName = getPlanetName(natalPlanet);
    const aspectName = getAspectName(aspectType);
    const aspectEnergy = getAspectEnergy(aspectType);
    const transitEnergy = getPlanetEnergy(transitingPlanet);
    const natalThemes = getNatalPlanetThemes(natalPlanet);

    const title = `${transitName} ${aspectName} ${natalName}: ${getAspectCycleTitle(aspectType, natalPlanet)}`;

    // Overview: use planet-specific adjective, not "transformative" for all
    const overview = `Transiting ${transitName}'s ${transitEnergy.adjective} energy ${aspectEnergy.effect} with your natal ${natalName}, creating ${aspectEnergy.type} in ${natalThemes.areas}. ${aspectEnergy.instruction}.`;

    // Key Themes: cap at 6, blend planet + aspect
    const keyThemes = [
        ...natalThemes.themes.slice(0, 2),
        ...transitEnergy.keywords.slice(0, 2),
        ...aspectEnergy.keywords.slice(0, 2)
    ].slice(0, 6);

    const growthOpportunities = [
        `${aspectEnergy.guidanceVerb.charAt(0).toUpperCase() + aspectEnergy.guidanceVerb.slice(1)} ${transitName}'s energy with your ${natalThemes.themes[0].toLowerCase()}`,
        `Use this ${aspectName} to ${transitEnergy.action} your ${natalThemes.areas}`,
        `Develop new capacity in ${natalThemes.themes[0].toLowerCase()} through ${aspectEnergy.type.split(' ')[0]}`,
        `${transitEnergy.opportunities[0]} in ${natalThemes.areas}`
    ];

    // Watch For: aspect-specific failure modes
    const watchFor = [
        `${aspectEnergy.watchForPattern} in ${natalThemes.areas}`,
        `${transitEnergy.pressures[0]} affecting your ${natalThemes.themes[0].toLowerCase()}`,
        `${transitEnergy.pressures[1]} in how you express ${natalThemes.themes[0].toLowerCase()}`,
        `Resistance to ${aspectEnergy.type.split(' ')[0]} in ${natalThemes.areas}`
    ];

    // Guidance: aspect-specific instructions
    const guidance = [
        aspectEnergy.instruction,
        `Track how ${transitName} themes show up in your ${natalThemes.areas} weekly`,
        `${aspectEnergy.guidanceVerb.charAt(0).toUpperCase() + aspectEnergy.guidanceVerb.slice(1)} ${transitName}'s ${transitEnergy.keywords[0].toLowerCase()} with your natural ${natalThemes.themes[0].toLowerCase()}`,
        `Focus on one concrete behavior change in ${natalThemes.areas} this week`
    ];

    const howThisShowsUp = [
        `${aspectType === AspectType.Square || aspectType === AspectType.Opposition ? 'Tension' : 'Shifts'} in ${natalThemes.areas}`,
        `Conversations or decisions about ${natalThemes.themes[0].toLowerCase()}`,
        `${transitEnergy.opportunities[0]} or ${transitEnergy.pressures[0].toLowerCase()} in ${natalThemes.themes[1] || natalThemes.themes[0]}`,
        `Observable changes in how you handle ${natalThemes.areas}`
    ];

    return {
        title,
        overview,
        keyThemes,
        growthOpportunities,
        guidance,
        watchFor,
        howThisShowsUp
    };
}

// ============================================================================
// PLANETARY RETURN INTERPRETATIONS
// ============================================================================

function generatePlanetaryReturnInterpretation(planet: Planet): LifeCycleInterpretation {
    const planetName = getPlanetName(planet);
    const planetEnergy = getPlanetEnergy(planet);

    // Planet-specific return content
    const returnContent: Record<string, any> = {
        'Saturn': {
            flavor: 'consequences, adulthood, commitments, pruning',
            overview: 'marks a major life chapter where earlier choices show their results. This is about accepting adult responsibility and pruning what no longer serves.',
            keyThemes: ['Maturity', 'Consequences', 'Commitments', 'Pruning', 'Authority', 'Structure'],
            opportunities: [
                'Accept full responsibility for your direction',
                'Prune commitments that drain without return',
                'Build authority through demonstrated competence',
                'Commit to structures that support long-term goals'
            ],
            watchFor: [
                'Harsh self-judgment about past choices',
                'Overwork or rigid perfectionism as avoidance',
                'Isolation while rebuilding',
                'Ignoring health signals from accumulated stress'
            ],
            guidance: [
                'Review the last 29 years—what patterns are you ready to release?',
                'Choose one major commitment to honor this cycle',
                'Say no to roles that don\'t match your next chapter',
                'Build one sustainable structure per quarter'
            ]
        },
        'Jupiter': {
            flavor: 'doors opening, overreach, belief expansion',
            overview: 'brings a 12-year cycle of growth and opportunity to completion. This is about expanding horizons while avoiding overextension.',
            keyThemes: ['Growth', 'Opportunity', 'Expansion', 'Beliefs', 'Optimism', 'Wisdom'],
            opportunities: [
                'Expand into new territories or fields',
                'Update beliefs based on lived experience',
                'Take calculated risks on growth opportunities',
                'Share wisdom gained over the past 12 years'
            ],
            watchFor: [
                'Overcommitting to too many opportunities',
                'Optimism that ignores practical constraints',
                'Scattered energy across multiple directions',
                'Belief inflation without grounding'
            ],
            guidance: [
                'Choose 1-2 major growth opportunities, not 10',
                'Update one core belief based on recent experience',
                'Expand in areas where you have momentum',
                'Share what you\'ve learned with others'
            ]
        },
        'Uranus': {
            flavor: 'liberation, eccentricity, reinvention',
            overview: 'marks an 84-year cycle of awakening and authenticity. This is about breaking free from outdated patterns and embracing your unique path.',
            keyThemes: ['Liberation', 'Authenticity', 'Innovation', 'Freedom', 'Awakening', 'Reinvention'],
            opportunities: [
                'Break free from limiting patterns or roles',
                'Embrace your authentic, eccentric self',
                'Innovate in areas where you feel constrained',
                'Reinvent your approach to life'
            ],
            watchFor: [
                'Disruption for its own sake',
                'Burning bridges unnecessarily',
                'Nervous energy and scattered focus',
                'Rejecting all structure as limiting'
            ],
            guidance: [
                'Identify one major constraint to release this year',
                'Experiment with authentic self-expression',
                'Channel restlessness into innovation, not chaos',
                'Build freedom through strategic choices'
            ]
        },
        'Neptune': {
            flavor: 'surrender, meaning, spiritualization',
            overview: 'completes a 165-year cycle of spiritual development. This is about surrendering ego control and finding transcendent meaning.',
            keyThemes: ['Spirituality', 'Surrender', 'Meaning', 'Compassion', 'Transcendence', 'Dissolution'],
            opportunities: [
                'Deepen spiritual practice and connection',
                'Find meaning beyond material success',
                'Develop compassion for self and others',
                'Surrender control where it serves'
            ],
            watchFor: [
                'Escapism disguised as spirituality',
                'Boundary dissolution leading to confusion',
                'Idealization that ignores reality',
                'Victim narratives or martyrdom'
            ],
            guidance: [
                'Establish one grounding practice alongside spiritual work',
                'Notice where boundaries need strengthening',
                'Find meaning in ordinary moments',
                'Practice compassion with clear limits'
            ]
        },
        'Pluto': {
            flavor: 'legacy, power, metamorphosis',
            overview: 'marks a 248-year cycle of total transformation. This is about power, legacy, and irreversible change.',
            keyThemes: ['Transformation', 'Power', 'Legacy', 'Regeneration', 'Metamorphosis', 'Depth'],
            opportunities: [
                'Claim your power in areas where you\'ve given it away',
                'Transform at the deepest psychological level',
                'Build a legacy that outlasts you',
                'Regenerate through releasing what\'s dead'
            ],
            watchFor: [
                'Power struggles or control battles',
                'Compulsive behavior patterns',
                'Avoiding necessary endings',
                'Psychological overwhelm'
            ],
            guidance: [
                'Identify one area where you need to reclaim power',
                'Allow necessary endings without forcing',
                'Work with intensity, not against it',
                'Seek support for deep psychological work'
            ]
        }
    };

    const content = returnContent[planetName] || {
        flavor: 'cycle completion and renewal',
        overview: `marks the completion of a full ${planetName} cycle and the beginning of a new journey.`,
        keyThemes: ['Cycle Completion', 'New Beginnings', 'Integration', 'Fresh Start'],
        opportunities: [
            'Complete the previous cycle with awareness',
            'Set intentions for the new cycle ahead',
            'Integrate lessons from the past',
            'Begin fresh with greater wisdom'
        ],
        watchFor: [
            'Rushing into the new without honoring completion',
            'Repeating old patterns unconsciously',
            'Uncertainty about direction',
            'Pressure to make major changes'
        ],
        guidance: [
            'Review the previous cycle—what did you learn?',
            'Set one clear intention for the new cycle',
            'Honor both completion and beginning',
            'Move forward with integrated wisdom'
        ]
    };

    const title = `${planetName} Return: ${content.flavor.split(',')[0].charAt(0).toUpperCase() + content.flavor.split(',')[0].slice(1)} and Renewal`;

    const overview = `A ${planetName} return ${content.overview}`;

    const howThisShowsUp = [
        `Major life decisions that set direction for the next cycle`,
        `Completion of projects or phases from the previous cycle`,
        `Recognition or culmination of long-term development`,
        `New opportunities aligned with evolved understanding`
    ];

    return {
        title,
        overview,
        keyThemes: content.keyThemes,
        growthOpportunities: content.opportunities,
        guidance: content.guidance,
        watchFor: content.watchFor,
        howThisShowsUp
    };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getPlanetName(planet: Planet): string {
    return planet.toString();
}

function getHouseName(house: number): string {
    const names = [
        '', 'Identity & Self', 'Resources & Values', 'Communication & Learning',
        'Home & Family', 'Creativity & Romance', 'Work & Health',
        'Partnerships & Relationships', 'Transformation & Shared Resources',
        'Wisdom & Higher Learning', 'Career & Public Life', 'Networks & Collective',
        'Spirituality & Service'
    ];
    return names[house] || `${house}th House`;
}

function getHouseThemes(house: number): string[] {
    const themes = {
        1: ['Personal Identity', 'Self-Expression', 'Appearance', 'New Beginnings'],
        2: ['Financial Security', 'Personal Values', 'Material Possessions', 'Self-Worth'],
        3: ['Communication', 'Learning', 'Siblings', 'Local Community'],
        4: ['Family', 'Home', 'Emotional Security', 'Roots'],
        5: ['Creativity', 'Romance', 'Children', 'Self-Expression'],
        6: ['Daily Work', 'Health', 'Service', 'Routine'],
        7: ['Partnerships', 'Marriage', 'Cooperation', 'Legal Matters'],
        8: ['Transformation', 'Shared Resources', 'Intimacy', 'Psychology'],
        9: ['Higher Learning', 'Philosophy', 'Foreign Travel', 'Spirituality'],
        10: ['Career', 'Public Recognition', 'Authority', 'Reputation'],
        11: ['Networks', 'Groups', 'Future Goals', 'Community'],
        12: ['Spirituality', 'Hidden Service', 'Subconscious', 'Compassion']
    };
    return themes[house as keyof typeof themes] || ['Personal Growth', 'Life Changes'];
}

function getHouseAreas(house: number): string {
    const areas = {
        1: 'identity, appearance, and personal approach to life',
        2: 'money, possessions, values, and self-worth',
        3: 'communication, learning, and local relationships',
        4: 'home, family, and emotional foundations',
        5: 'creativity, romance, children, and joyful expression',
        6: 'daily work, health, service, and practical routines',
        7: 'partnerships, marriage, and one-on-one relationships',
        8: 'transformation, shared resources, and psychological depths',
        9: 'higher learning, philosophy, and spiritual exploration',
        10: 'career, public life, and professional reputation',
        11: 'networks, groups, and collective endeavors',
        12: 'spirituality, hidden service, and compassionate action'
    };
    return areas[house as keyof typeof areas] || 'personal growth and development';
}

function getHouseVerbs(house: number): string[] {
    const verbs = {
        1: ['assert', 'embody', 'initiate', 'present'],
        2: ['simplify', 'budget', 'value', 'stabilize'],
        3: ['communicate', 'study', 'clarify', 'connect'],
        4: ['stabilize', 'root', 'repair', 'nurture'],
        5: ['create', 'risk', 'perform', 'express'],
        6: ['systematize', 'train', 'audit', 'serve'],
        7: ['negotiate', 'commit', 'define', 'partner'],
        8: ['merge', 'purge', 'disclose', 'transform'],
        9: ['publish', 'travel', 'reframe', 'expand'],
        10: ['lead', 'deliver', 'define', 'achieve'],
        11: ['network', 'collaborate', 'organize', 'envision'],
        12: ['release', 'retreat', 'heal', 'surrender']
    };
    return verbs[house as keyof typeof verbs] || ['develop', 'change', 'grow', 'evolve'];
}

function getPlanetEnergy(planet: Planet): any {
    const energies: Record<string, any> = {
        'Sun': {
            type: 'vitalizing and centering',
            adjective: 'vitalizing',
            action: 'center',
            effect: 'brings focus, vitality, and conscious purpose',
            keywords: ['Purpose', 'Vitality', 'Identity', 'Leadership'],
            pressures: ['Ego demands', 'Need for recognition', 'Identity pressure'],
            opportunities: ['Clarity of purpose', 'Increased visibility', 'Leadership moments']
        },
        'Moon': {
            type: 'emotional and responsive',
            adjective: 'emotional',
            action: 'attune',
            effect: 'brings emotional awareness and instinctive responses',
            keywords: ['Emotions', 'Security', 'Habits', 'Intuition'],
            pressures: ['Emotional volatility', 'Security concerns', 'Mood fluctuations'],
            opportunities: ['Emotional intelligence', 'Intuitive insights', 'Nurturing capacity']
        },
        'Mercury': {
            type: 'communicating and connecting',
            adjective: 'mental',
            action: 'clarify',
            effect: 'brings mental activity, communication needs, and information flow',
            keywords: ['Communication', 'Learning', 'Thinking', 'Connections'],
            pressures: ['Mental overload', 'Communication breakdowns', 'Information overwhelm'],
            opportunities: ['Clear thinking', 'Effective communication', 'Learning breakthroughs']
        },
        'Venus': {
            type: 'harmonizing and attracting',
            adjective: 'harmonizing',
            action: 'attract',
            effect: 'brings desire for harmony, beauty, and connection',
            keywords: ['Values', 'Relationships', 'Beauty', 'Pleasure'],
            pressures: ['Relationship tensions', 'Value conflicts', 'Indecision'],
            opportunities: ['Improved relationships', 'Aesthetic refinement', 'Value clarity']
        },
        'Mars': {
            type: 'activating and asserting',
            adjective: 'activating',
            action: 'initiate',
            effect: 'brings drive, assertion, and the need for action',
            keywords: ['Action', 'Energy', 'Courage', 'Initiative'],
            pressures: ['Impatience', 'Conflict', 'Rushed decisions'],
            opportunities: ['Bold action', 'Courage to start', 'Energy for projects']
        },
        'Saturn': {
            type: 'structuring and testing',
            adjective: 'structuring',
            action: 'structure',
            effect: 'brings responsibility, limits, and delayed gratification',
            keywords: ['Discipline', 'Responsibility', 'Maturity', 'Structure'],
            pressures: ['Restrictions and delays', 'Increased responsibility', 'Tests of commitment'],
            opportunities: ['Lasting foundations', 'Mastery through practice', 'Mature authority']
        },
        'Jupiter': {
            type: 'expanding and amplifying',
            adjective: 'expanding',
            action: 'expand',
            effect: 'brings growth, opportunity, and amplification',
            keywords: ['Expansion', 'Growth', 'Opportunity', 'Optimism'],
            pressures: ['Overconfidence', 'Overextension', 'Scattered energy'],
            opportunities: ['Growth opportunities', 'Expanded horizons', 'Generous connections']
        },
        'Uranus': {
            type: 'disrupting and liberating',
            adjective: 'disruptive',
            action: 'revolutionize',
            effect: 'brings restlessness, disruption, and sudden exits or entries',
            keywords: ['Revolution', 'Innovation', 'Freedom', 'Authenticity'],
            pressures: ['Sudden disruptions', 'Instability', 'Nervous energy'],
            opportunities: ['Liberation from constraints', 'Innovative breakthroughs', 'Authentic expression']
        },
        'Neptune': {
            type: 'dissolving and idealizing',
            adjective: 'dissolving',
            action: 'spiritualize',
            effect: 'brings fog, idealization, and porous boundaries',
            keywords: ['Spirituality', 'Compassion', 'Transcendence', 'Creativity'],
            pressures: ['Confusion', 'Illusion', 'Boundary dissolution'],
            opportunities: ['Spiritual awakening', 'Creative inspiration', 'Compassionate connection']
        },
        'Pluto': {
            type: 'intensifying and purging',
            adjective: 'intensifying',
            action: 'transform',
            effect: 'brings compulsion, purging, and power dynamics',
            keywords: ['Transformation', 'Power', 'Regeneration', 'Psychology'],
            pressures: ['Intense crises', 'Power struggles', 'Psychological upheaval'],
            opportunities: ['Deep transformation', 'Psychological insight', 'Empowerment through release']
        }
    };
    return energies[planet.toString()] || {
        type: 'changing and developing',
        adjective: 'changing',
        action: 'change',
        effect: 'brings growth and development',
        keywords: ['Growth', 'Change', 'Development', 'Evolution'],
        pressures: ['Adjustment periods', 'Uncertainty', 'Growth pains'],
        opportunities: ['New perspectives', 'Growth potential', 'Fresh approaches']
    };
}

function getAspectEnergy(aspectType: AspectType): any {
    const energies: Record<string, any> = {
        'Conjunction': {
            type: 'merging and intensifying',
            effect: 'merges energies for new beginnings',
            keywords: ['Unity', 'New Beginnings', 'Intensity'],
            instruction: 'This is a new chapter—set clear intentions',
            watchForPattern: 'identity overwhelm or loss of boundaries',
            guidanceVerb: 'integrate'
        },
        'Square': {
            type: 'challenging and motivating',
            effect: 'creates tension that motivates growth',
            keywords: ['Challenge', 'Growth', 'Breakthrough'],
            instruction: 'Use friction as course correction, not failure',
            watchForPattern: 'avoidance or forcing solutions prematurely',
            guidanceVerb: 'work through'
        },
        'Opposition': {
            type: 'balancing and integrating',
            effect: 'creates awareness through contrast',
            keywords: ['Balance', 'Integration', 'Awareness'],
            instruction: 'Notice what others mirror back to you',
            watchForPattern: 'projection or either/or thinking',
            guidanceVerb: 'balance'
        },
        'Trine': {
            type: 'harmonizing and flowing',
            effect: 'brings ease and natural expression',
            keywords: ['Harmony', 'Flow', 'Natural Ability'],
            instruction: 'Use it or lose it—ease can breed complacency',
            watchForPattern: 'taking opportunities for granted',
            guidanceVerb: 'leverage'
        },
        'Sextile': {
            type: 'supporting and cooperating',
            effect: 'provides supportive opportunities',
            keywords: ['Opportunity', 'Support', 'Cooperation'],
            instruction: 'Act on weak signals—invitations require initiative',
            watchForPattern: 'waiting for perfect conditions',
            guidanceVerb: 'activate'
        }
    };
    return energies[aspectType.toString()] || {
        type: 'connecting and relating',
        effect: 'creates meaningful connections',
        keywords: ['Connection', 'Relationship', 'Growth'],
        instruction: 'Pay attention to how these energies interact',
        watchForPattern: 'missing the signals',
        guidanceVerb: 'work with'
    };
}

function getNatalPlanetThemes(planet: Planet): any {
    const themes: Record<string, any> = {
        'Sun': {
            themes: ['Identity', 'Purpose', 'Vitality', 'Leadership'],
            areas: 'core identity, life purpose, and creative self-expression'
        },
        'Moon': {
            themes: ['Emotions', 'Family', 'Security', 'Intuition'],
            areas: 'emotions, family relationships, and inner security'
        },
        'Mercury': {
            themes: ['Communication', 'Thinking', 'Learning', 'Travel'],
            areas: 'communication, thinking patterns, and learning processes'
        },
        'Venus': {
            themes: ['Love', 'Beauty', 'Values', 'Relationships'],
            areas: 'love, relationships, values, and artistic expression'
        },
        'Mars': {
            themes: ['Action', 'Energy', 'Courage', 'Sexuality'],
            areas: 'action, energy, courage, and assertiveness'
        }
    };
    return themes[planet.toString()] || {
        themes: ['Personal Growth', 'Self-Expression', 'Life Development'],
        areas: 'personal growth and self-expression'
    };
}

function getOrdinalSuffix(num: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

function getConcreteFailureMode(planet: Planet, house: number): string {
    // Planet-house specific failure modes
    const modes: Record<string, Record<number, string>> = {
        'Saturn': {
            1: 'harsh self-criticism or rigid self-image',
            2: 'hoarding or extreme frugality',
            4: 'emotional shutdown or family obligation overwhelm',
            7: 'cold distance or excessive control in partnerships',
            10: 'overwork or fear of public failure'
        },
        'Jupiter': {
            2: 'overspending or inflated sense of worth',
            5: 'overcommitting to creative projects',
            9: 'belief inflation without grounding',
            11: 'saying yes to every group invitation'
        },
        'Uranus': {
            1: 'identity chaos or constant reinvention',
            4: 'sudden moves or family disruption',
            7: 'relationship instability or fear of commitment',
            10: 'career changes without planning'
        },
        'Neptune': {
            2: 'financial confusion or unrealistic expectations',
            7: 'boundary dissolution in relationships',
            12: 'escapism or victim narratives'
        },
        'Pluto': {
            1: 'identity crisis or power struggles',
            8: 'control battles over shared resources',
            10: 'obsessive career focus or power plays'
        }
    };

    return modes[planet.toString()]?.[house] || 'avoidance or overwhelm';
}

function getAspectName(aspectType: AspectType): string {
    return aspectType.toString();
}

function getAspectCycleTitle(aspectType: AspectType, natalPlanet: Planet): string {
    const action = aspectType === AspectType.Conjunction ? 'Renewal' :
        aspectType === AspectType.Square ? 'Challenge' :
            aspectType === AspectType.Opposition ? 'Integration' :
                aspectType === AspectType.Trine ? 'Flow' : 'Opportunity';

    const area = getNatalPlanetThemes(natalPlanet).themes[0] || 'Personal';

    return `${area} ${action}`;
}