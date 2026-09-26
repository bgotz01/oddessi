/**
 * Developmental arcs — a slow planet's house transit read as a process with a
 * beginning, middle and end rather than one theme that holds for its length.
 *
 * Neptune takes about fourteen years to cross a house, and "Neptune in the
 * 8th" does not mean the same thing in year two as in year twelve. Each planet
 * gets one MODEL — the named phases, where they fall in the transit, and what
 * the planet is doing in each — and then one arc per house that fills the
 * model in for that territory.
 *
 * To add a house: append to `houses`. To add a planet: export another
 * `DevelopmentalArc` and list it in `ARCS`. The guide page reads nothing but
 * this file, so the shapes below are the whole contract.
 *
 * The Neptune geometry: the IDEAL goes low → high →
 * low, while BOUNDARY DISSOLUTION goes low → steadily high and does not come
 * back. The ideal weakens precisely as the boundary it changed stays
 * dissolved — dissolution is not loss of the territory but loss of the
 * fantasy about it. It is the same shape as the macro reading: when Neptune
 * leaves Capricorn the ideal of hierarchy fades, but the cultural change made
 * while it held does not reverse.
 *
 * Each phase has its own kind of evidence, asked as its own question — what
 * attracts you (`fascinations`), what boundaries blur (`blurs`), what illusion
 * breaks (`revisions`). The page shows only those three levels: name,
 * interpretation, evidence. `signs`, `remains` and each period's prose stay
 * here for the chat's richer personal readings, not for the page.
 *
 * These are a model, not a finding. The phase boundaries are proportions of
 * the transit, not events in a chart.
 */

export type NeptunePhase = "dream" | "immersion" | "dissolution";

export interface ArcPhaseDef<K extends string = string> {
  key: K;
  /** The phase's name — "Dream". */
  name: string;
  /** One word for the chain summary — "Dream". */
  verb: string;
  /** What the planet is doing to the territory in this phase. */
  action: string;
  /** The question this phase's evidence answers — part of the theory, not decoration. */
  question: string;
  /** Where the phase sits in the transit, as fractions of it: [start, end). */
  span: [number, number];
}

/**
 * One period in one house, as bullets. Fragments, never sentences — the page
 * lays all three periods side by side and reads across them.
 */
export interface HouseArcPhase {
  /** The period as a clause — no full stop. */
  summary: string;
  /**
   * The period as prose. Not drawn on the page; kept for the chat, which reads
   * the whole house through the page context.
   */
  detail: string;
  /** What the period looks like when it is happening. */
  signs: string[];
}

export interface HouseArc<K extends string = string> {
  house: number;
  /** Short name for the house tab. */
  name: string;
  /** What the house covers — rendered as micro labels. */
  territory: string[];
  /** The underlying wish the planet brings in, in the first person. */
  impulse: string;
  /**
   * What attracts you in the opening phase. Best first — the page shows four.
   *
   * The standard for this and the two below: each item should be
   * understandable without knowing astrology. "Shared ownership = shared
   * interests", "More information = clarity" and "Everyone wants the same
   * thing" are the bar.
   */
  fascinations: string[];
  /** Boundaries that blur in the middle — rendered "A ⟷ B". Best first; four shown. */
  blurs: [string, string][];
  /** Beliefs brought in at the start, and what they become — as fragments. */
  revisions: { from: string; to: string }[];
  /**
   * What stays dissolved after the assumption breaks. The territory is not
   * lost and the boundary does not re-form — this is the proof of that.
   */
  remains: string;
  phases: Record<K, HouseArcPhase>;
}

export interface DevelopmentalArc<K extends string = string> {
  planet: string;
  title: string;
  /** Typical years in one house. Real transits vary with house size. */
  years: number;
  /** A note beside `years` saying why it varies. */
  yearsNote: string;
  phases: ArcPhaseDef<K>[];
  houses: HouseArc<K>[];
}

// ─── Neptune ─────────────────────────────────────────────────────────────────

export const NEPTUNE_ARC: DevelopmentalArc<NeptunePhase> = {
  planet: "Neptune",
  title: "Neptune through the houses",
  years: 14,
  yearsNote:
    "About fourteen years on average — 164 years round twelve houses — but a " +
    "wide house can hold Neptune for twenty and a narrow one for eight.",
  phases: [
    {
      key: "dream",
      name: "Dream",
      verb: "Dream",
      action:
        "Projects an ideal onto the territory. The possibility looks larger than the practical reality.",
      question: "What attracts you?",
      span: [0, 0.3],
    },
    {
      key: "immersion",
      name: "Immersion",
      verb: "Merge",
      action:
        "Boundaries blur as you enter the ideal. You experiment with it rather than only imagining it.",
      question: "What boundaries blur?",
      span: [0.3, 0.7],
    },
    {
      key: "dissolution",
      name: "Dissolution",
      verb: "Dissolve",
      action:
        "The ideal becomes impossible to maintain. What dissolves is less the territory than the assumption you brought into it.",
      question: "What illusion breaks?",
      span: [0.7, 1],
    },
  ],
  houses: [
    {
      house: 1,
      name: "Self",
      territory: [
        "Identity",
        "Body",
        "Appearance",
        "First impressions",
        "How you meet the world",
      ],
      impulse: "I could be someone other than who I have been.",
      fascinations: [
        "Reinvention",
        "A truer or more spiritual self",
        "Being seen as an image",
        "Fluid identity",
        "Merging with a role, look or aesthetic",
      ],
      blurs: [
        ["Who I am", "who I am seen as"],
        ["My wants", "others' projections"],
        ["Presence", "performance"],
        ["Body", "mood"],
      ],
      revisions: [
        {
          from: "One true self to find",
          to: "There was never one final self to find",
        },
        { from: "Adaptable = free", to: "Adapting everywhere = no shape" },
      ],
      remains: "Permeability — the old fixed self doesn't return",
      phases: {
        dream: {
          summary: "A truer self waiting to be found",
          detail:
            "Neptune on the ascendant makes the self feel unfinished in an exciting way. Old descriptions of who you are start to seem too small, and a more beautiful, more sensitive or more spiritual version of you becomes the goal.",
          signs: [
            "New look, name or style",
            "Old self-descriptions feel too small",
            "Pull toward a more spiritual self",
          ],
        },
        immersion: {
          summary: "The edges of the self go soft",
          detail:
            "You try on the new self in earnest — new look, new circles, new ways of presenting. Others read you as whatever they need you to be, and for a while that feels like freedom. Moods and atmospheres pass through you more easily than they used to.",
          signs: [
            "Absorbing others' moods",
            "Read differently by everyone",
            "Heightened sensitivity to substances",
          ],
        },
        dissolution: {
          summary: "The image stops holding",
          detail:
            "What dissolves is not the self but the belief that there is one ideal version of it to arrive at. The image you were reaching for turns out to be partly yours and partly other people's, and being endlessly reflective of the room stops feeling like freedom.",
          signs: [
            "“Who am I?” confusion",
            "Crowd-pleasing choices feel foreign",
            "An absence behind the image",
          ],
        },
      },
    },
    {
      house: 2,
      name: "Resources",
      territory: ["Money", "Income", "Possessions", "Values", "Self-worth"],
      impulse: "What I value cannot be measured the way I was taught.",
      fascinations: [
        "Earning from inspiration",
        "Money as energy or flow",
        "Wealth that isn't material",
        "Freedom from possessions",
        "A calling that pays",
      ],
      blurs: [
        ["Worth", "net worth"],
        ["Income", "inspiration"],
        ["Generosity", "leakage"],
        ["Value", "price"],
      ],
      revisions: [
        {
          from: "Follow love and money follows",
          to: "Love and payment need separate tending",
        },
        {
          from: "Not attached to money",
          to: "Detachment can become avoidance",
        },
      ],
      remains: "Worth and net worth stay separate",
      phases: {
        dream: {
          summary: "Value beyond the material",
          detail:
            "Conventional ideas of security start to look thin. You are drawn to earning through something you believe in, or to a lighter relationship with possessions, and the practical question of how it will pay is easy to postpone.",
          signs: [
            "Offers to earn from passion",
            "Values shifting ahead of income",
            "Pull toward owning less",
          ],
        },
        immersion: {
          summary: "Money in and out like water",
          detail:
            "Income may become irregular, creative or hard to pin down. You give more freely, spend on meaning, let things go. The line between being generous with resources and simply not tracking them is genuinely hard to see from inside.",
          signs: [
            "Irregular or creative income",
            "Giving and spending on meaning",
            "Blurry prices and fees",
          ],
        },
        dissolution: {
          summary: "The fog around money lifts",
          detail:
            "Money does not necessarily go; the belief that value and money would sort themselves out does. The arrangement you idealized shows its real terms — an inspired income that does not cover the rent, a detachment that was partly avoidance.",
          signs: [
            "The arrangement's real terms show",
            "A shortfall or quiet drain surfaces",
          ],
        },
      },
    },
    {
      house: 3,
      name: "Mind",
      territory: [
        "Thinking",
        "Speech",
        "Learning",
        "Siblings",
        "Neighbourhood",
        "Information",
      ],
      impulse: "There is a truer language beneath ordinary talk.",
      fascinations: [
        "Intuitive and symbolic thinking",
        "Poetry, music, image",
        "The perfect conversation partner",
        "Information that reveals everything",
        "Unspoken closeness with a sibling",
      ],
      blurs: [
        ["Fact", "interpretation"],
        ["What was said", "what was meant"],
        ["Intuition", "assumption"],
        ["Signal", "noise"],
      ],
      revisions: [
        {
          from: "Intuition needs no details",
          to: "Intuition asks, details answer",
        },
        {
          from: "More information = clarity",
          to: "More information was the fog",
        },
      ],
      remains: "The symbolic mind — literal-only thinking doesn't return",
      phases: {
        dream: {
          summary: "A language beneath language",
          detail:
            "Plain, literal communication starts to seem flat. You are drawn to symbolic, poetic or intuitive ways of knowing, and to people who seem to understand you without explanation.",
          signs: [
            "Symbol and intuition over argument",
            "Drawn to people who “just get it”",
            "Poetry, music, image",
          ],
        },
        immersion: {
          summary: "Thinking in currents",
          detail:
            "Learning becomes absorptive; you pick things up by osmosis. Conversations run on implication. Information arrives in quantity and from everywhere, and the difference between what you read and what you inferred softens.",
          signs: [
            "Learning by osmosis",
            "Information overload",
            "Implied agreements piling up",
          ],
        },
        dissolution: {
          summary: "The understood turns out assumed",
          detail:
            "Communication does not fail; the assumption that it needed no checking does. Misunderstandings surface where both sides were sure they had been clear, and a source you trusted turns out to be partial.",
          signs: [
            "Misunderstandings where both felt clear",
            "A trusted source proves partial",
          ],
        },
      },
    },
    {
      house: 4,
      name: "Home",
      territory: [
        "Home",
        "Family",
        "Roots",
        "Ancestry",
        "Private life",
        "Inner foundation",
      ],
      impulse: "Somewhere there is a home where I fully belong.",
      fascinations: [
        "The ideal home or sanctuary",
        "Family reconciliation",
        "Ancestral roots",
        "An idealized parent",
        "Living near water, or in retreat",
      ],
      blurs: [
        ["Family's needs", "my own"],
        ["Home", "hiding place"],
        ["Memory", "history"],
        ["Caretaking", "self-erasure"],
      ],
      revisions: [
        { from: "The right home = belonging", to: "Belonging isn't a place" },
        {
          from: "Family story = memory",
          to: "Memory kept the version I needed",
        },
      ],
      remains: "A softer line between your life and the family's",
      phases: {
        dream: {
          summary: "Belonging somewhere, waiting",
          detail:
            "The inner foundation feels porous, and the wish for a place of perfect belonging grows. It can attach to a house, a town, the idea of family, or an ancestral line.",
          signs: [
            "Longing for an ideal home or place",
            "Interest in ancestry and roots",
            "A softer view of a parent",
          ],
        },
        immersion: {
          summary: "Home and family absorb you",
          detail:
            "You pour yourself into the home or the family system — moving, renovating, caring for a parent, tracing roots. The line between your life and theirs, and between the past and the present, grows faint.",
          signs: [
            "Moving, renovating, caregiving",
            "Family needs merged with yours",
            "The past bleeding into the present",
          ],
        },
        dissolution: {
          summary: "Ideal home and family come apart",
          detail:
            "Home and family are not lost; the expectation that they would produce the feeling of belonging is. The perfect place still does not settle you, and family memories are revised by facts that surface late.",
          signs: [
            "The place doesn't settle you",
            "Family history revised",
            "A parent seen plainly",
          ],
        },
      },
    },
    {
      house: 5,
      name: "Creation",
      territory: [
        "Creativity",
        "Romance",
        "Pleasure",
        "Children",
        "Play",
        "Self-expression",
      ],
      impulse: "Something wants to be made through me.",
      fascinations: [
        "Inspired art",
        "A muse",
        "Fated romance",
        "Recognition for what you make",
        "Play as transcendence",
      ],
      blurs: [
        ["Artist", "work"],
        ["The lover", "the fantasy of the lover"],
        ["Inspiration", "discipline"],
        ["Pleasure", "escape"],
      ],
      revisions: [
        {
          from: "Inspiration shouldn't need effort",
          to: "Inspiration needs a practice to land in",
        },
        {
          from: "The one who completes me",
          to: "In love with what they let me imagine",
        },
      ],
      remains: "Expression stays personal — never a pastime again",
      phases: {
        dream: {
          summary: "Touched by something beyond you",
          detail:
            "Art, romance, children or play take on a sacred glow. You are drawn to the idea of inspired work and of a love that feels destined, and self-expression starts to look like a path rather than a pastime.",
          signs: [
            "Easy inspiration",
            "Romance that feels fated",
            "High ideals for children or projects",
          ],
        },
        immersion: {
          summary: "Lost in the work or the person",
          detail:
            "Creative flow can be real and deep here. So can romantic merging. You identify with what you make and with whom you love, and pleasure shades into escape without a clear line between them.",
          signs: [
            "Deep creative flow",
            "Merging with a lover",
            "Identity riding on the work",
          ],
        },
        dissolution: {
          summary: "Muse and romance turn human",
          detail:
            "Creativity and love do not end; the fantasy that they would arrive whole does. The lover turns out to be a person rather than the image, and the work that was meant to come effortlessly needs drafts.",
          signs: [
            "The lover as a person",
            "The work as a draft",
            "Creative disappointment",
          ],
        },
      },
    },
    {
      house: 6,
      name: "Work",
      territory: [
        "Daily work",
        "Routine",
        "Health",
        "Service",
        "Craft",
        "Colleagues",
      ],
      impulse: "My work could be an act of service, not just a job.",
      fascinations: [
        "Meaningful vocation",
        "Healing or caring work",
        "Holistic health",
        "A devoted team",
        "The perfect routine",
      ],
      blurs: [
        ["Helping", "over-giving"],
        ["Work", "identity"],
        ["Symptom", "stress"],
        ["Routine", "drift"],
      ],
      revisions: [
        {
          from: "Meaningful work, conditions don't matter",
          to: "Meaning still needs hours, pay, limits",
        },
        { from: "The body will tell me", to: "Some signals need a test" },
      ],
      remains: "Work stays tied to meaning",
      phases: {
        dream: {
          summary: "Daily work as devotion",
          detail:
            "Ordinary jobs start to feel empty, and the idea of service — healing, helping, craft done for its own sake — becomes compelling. Health becomes something spiritual as well as physical.",
          signs: [
            "Ordinary jobs feel empty",
            "Pull toward healing or service",
            "Interest in holistic health",
          ],
        },
        immersion: {
          summary: "Giving yourself to the work",
          detail:
            "Routines loosen or become ritual. You absorb colleagues' moods and take on more than the role asks. Health can be sensitive and hard to read, with symptoms that track stress more than cause.",
          signs: [
            "Doing more than the role asks",
            "Absorbing colleagues' moods",
            "Vague, stress-linked symptoms",
          ],
        },
        dissolution: {
          summary: "Service without limits runs out",
          detail:
            "The work and the devotion do not dissolve; the belief that meaning makes conditions irrelevant does. Exhaustion, a vague ailment or a workplace that leaned on the devotion shows what the ideal cost.",
          signs: [
            "Burnout or a vague ailment",
            "A workplace leaning on your devotion",
          ],
        },
      },
    },
    {
      house: 7,
      name: "Partnership",
      territory: [
        "Partnership",
        "Marriage",
        "Contracts",
        "Clients",
        "One-to-one",
        "Open rivals",
      ],
      impulse: "With the right other, I would be complete.",
      fascinations: [
        "A soulmate",
        "The perfect business partner",
        "Unconditional acceptance",
        "Rescuing, or being rescued",
      ],
      blurs: [
        ["Me", "us"],
        ["Their feelings", "mine"],
        ["Compromise", "self-abandonment"],
        ["Agreement", "assumption"],
      ],
      revisions: [
        {
          from: "A true partner understands untold",
          to: "Untold understanding was projection",
        },
        {
          from: "Love requires self-sacrifice",
          to: "Losing myself doesn't create intimacy",
        },
      ],
      remains: "“Us” stays a real unit",
      phases: {
        dream: {
          summary: "The other who completes me",
          detail:
            "Partnership becomes the stage for the ideal. You are drawn to people who seem to promise total understanding — or who need rescuing — and to agreements founded on shared feeling rather than terms.",
          signs: [
            "Promise of total understanding",
            "Pull to rescue or be rescued",
            "Agreements on feeling, not terms",
          ],
        },
        immersion: {
          summary: "Two people, one blurred shape",
          detail:
            "You merge into a relationship or a partnership, adapting, accommodating, reading needs before they are spoken. Contracts stay vague because saying things out loud feels unnecessary.",
          signs: [
            "Adapting and accommodating",
            "“Us” absorbing “me”",
            "Vague terms with clients too",
          ],
        },
        dissolution: {
          summary: "Seen partner and real partner part",
          detail:
            "The partnership does not necessarily end; the projection does. It becomes visible from both sides, and an unstated agreement turns out not to have been agreed. Someone you rescued does not want rescuing, or someone rescuing you has their own reasons.",
          signs: [
            "Projection visible on both sides",
            "An agreement that wasn't agreed",
            "Rescue refused",
          ],
        },
      },
    },
    {
      house: 8,
      name: "Merging",
      territory: [
        "Shared resources",
        "Debt and investment",
        "Inheritance",
        "Intimacy",
        "Trust",
        "Power",
        "Psychological merging",
      ],
      impulse:
        "There is something powerful beyond what I can build or possess alone.",
      fascinations: [
        "Shared wealth",
        "Investors and other people's capital",
        "Deep partnership",
        "Complete intimacy and surrender",
        "Financial freedom through collaboration",
        "Hidden systems",
        "Transformative investment",
      ],
      blurs: [
        ["Your money", "their money"],
        ["My project", "our project"],
        ["Ownership", "participation"],
        ["Trust", "dependence"],
        ["Individual resources", "pooled resources"],
      ],
      revisions: [
        {
          from: "Combined resources = shared incentives",
          to: "Shared ownership ≠ shared interests",
        },
        {
          from: "External capital = freedom",
          to: "External capital = another dependency",
        },
      ],
      remains: "The pooling — entangled, without the fantasy",
      phases: {
        dream: {
          summary: "Something greater through merging",
          detail:
            "Something in shared territory acquires a magnetic ideal — pooled capital, deep partnership, total intimacy, a system that multiplies what you have. Neptune makes the possibility look larger than the practical reality.",
          signs: [
            "Magnetism of shared capital and investors",
            "Deep partnership and intimacy",
            "Hidden systems, transformative investment",
          ],
        },
        immersion: {
          summary: "Boundaries go porous",
          detail:
            "You actually try the arrangement rather than just imagining it: taking investment, sharing finances, entering a partnership, surrendering in intimacy. Whose money, whose project and who owns what grow genuinely hard to answer.",
          signs: [
            "Your money and their money blurring",
            "Investment, pooling, joint ventures",
            "Intimacy as surrender",
          ],
        },
        dissolution: {
          summary: "The fantasy around the merger breaks",
          detail:
            "What dissolves is not necessarily the shared resource but the idealized distinction you brought to it. The late transit exposes where the original ideal was partly illusion — about incentives, about freedom, about trust.",
          signs: ["Incentives diverging", "Capital revealing its strings"],
        },
      },
    },
    {
      house: 9,
      name: "Belief",
      territory: [
        "Beliefs",
        "Philosophy",
        "Higher learning",
        "Travel",
        "Faith",
        "Publishing",
        "Law",
      ],
      impulse: "There is a teaching that explains everything.",
      fascinations: [
        "A teacher or guru",
        "Faith or a spiritual path",
        "A faraway place",
        "A grand theory",
        "Pilgrimage",
      ],
      blurs: [
        ["Belief", "knowledge"],
        ["The teacher", "the truth"],
        ["Meaning", "wish"],
        ["Travel", "escape"],
      ],
      revisions: [
        {
          from: "This explains everything",
          to: "It can't tell me when it's wrong",
        },
        {
          from: "The teacher embodies the teaching",
          to: "The teaching outlived the teacher",
        },
      ],
      remains: "A widened horizon — the provincial view doesn't return",
      phases: {
        dream: {
          summary: "Somewhere there is the answer",
          detail:
            "Meaning becomes the thing you are hungry for. A tradition, a teacher, a country or a body of thought seems to hold the key, and your existing beliefs feel provincial next to it.",
          signs: [
            "A teacher, tradition or theory that explains all",
            "Travel with spiritual weight",
            "Old beliefs feel provincial",
          ],
        },
        immersion: {
          summary: "Given over to a way of seeing",
          detail:
            "You study, travel, convert, commit. The framework becomes the lens through which everything is read, and the difference between what you believe and what you know softens.",
          signs: [
            "One framework for everything",
            "Long journeys, conversion, degrees",
            "Belief treated as knowledge",
          ],
        },
        dissolution: {
          summary: "The answer turns out to be an answer",
          detail:
            "Meaning does not dissolve; the belief that one system held all of it does. The teacher proves human, the doctrine has gaps, the faraway place is a place.",
          signs: [
            "The teacher proves human",
            "The doctrine shows gaps",
            "The faraway place is a place",
          ],
        },
      },
    },
    {
      house: 10,
      name: "Vocation",
      territory: [
        "Career",
        "Reputation",
        "Public role",
        "Authority",
        "Vocation",
        "A parent",
      ],
      impulse: "My work in the world could be a calling.",
      fascinations: [
        "A true vocation",
        "Recognition or fame",
        "An institution worth serving",
        "An idealized mentor or boss",
        "Work in art, healing or media",
      ],
      blurs: [
        ["Role", "self"],
        ["Reputation", "reality"],
        ["Ambition", "calling"],
        ["Authority", "charisma"],
      ],
      revisions: [
        {
          from: "Finding my calling = finding my career",
          to: "A calling doesn't guarantee a career path",
        },
        { from: "Public image = me", to: "A screen for others' projections" },
      ],
      remains: "Work stays about purpose, not only position",
      phases: {
        dream: {
          summary: "Work as a calling",
          detail:
            "Career stops being enough as a ladder. You want a vocation — something that expresses a larger purpose — and a public role that reflects who you really are.",
          signs: [
            "The ladder no longer enough",
            "An idealized mentor or institution",
            "Pull to art, media, healing, causes",
          ],
        },
        immersion: {
          summary: "Becoming the role",
          detail:
            "You follow the calling, change direction, step into a more visible position. Reputation becomes something that others shape as much as you do, and the line between your role and yourself thins.",
          signs: [
            "Role and self thinning",
            "Rising visibility",
            "Reputation partly out of your hands",
          ],
        },
        dissolution: {
          summary: "Career and calling don't quite match",
          detail:
            "The career does not necessarily collapse; the assumption that calling and career would be the same thing does. An institution disappoints, a mentor proves ordinary, or the public image drifts away from the person behind it.",
          signs: [
            "An institution or mentor disappoints",
            "The public image drifts from you",
            "A calling without a route",
          ],
        },
      },
    },
    {
      house: 11,
      name: "Collective",
      territory: [
        "Friends",
        "Groups",
        "Networks",
        "Causes",
        "Audiences",
        "Hopes for the future",
      ],
      impulse: "Together we could build something better.",
      fascinations: [
        "A utopian community",
        "A cause or movement",
        "A chosen tribe",
        "A shared vision of the future",
        "An audience",
      ],
      blurs: [
        ["My goals", "the group's"],
        ["Friend", "follower"],
        ["Cause", "identity"],
        ["Belonging", "conformity"],
      ],
      revisions: [
        {
          from: "Everyone wants the same thing",
          to: "Same vision, different motives",
        },
        {
          from: "The group is who I am",
          to: "A place I stood, not what I was",
        },
      ],
      remains:
        "Bound to a wider collective — private ambition alone won't satisfy",
      phases: {
        dream: {
          summary: "Together, something better",
          detail:
            "You are drawn to a group, a cause or a vision of the future that seems to transcend individual ambition. Friendship becomes something close to spiritual kinship.",
          signs: [
            "A cause or movement that compels",
            "Friendship as kinship",
            "Audiences that feel like community",
          ],
        },
        immersion: {
          summary: "Dissolving into the collective",
          detail:
            "You join, commit, organize, follow. Your hopes and the group's become hard to tell apart. Friendships multiply and grow looser at the same time.",
          signs: [
            "Group hopes replacing yours",
            "Friendships multiplying and loosening",
            "Time and money flowing to causes",
          ],
        },
        dissolution: {
          summary: "The shared vision fractures",
          detail:
            "The group and the friendships need not break; the belief that a shared vision meant shared motives does. Factions form, a movement disappoints, a friend turns out to have been more follower than friend.",
          signs: [
            "Factions",
            "A movement disappoints",
            "A follower mistaken for a friend",
          ],
        },
      },
    },
    {
      house: 12,
      name: "Surrender",
      territory: [
        "Solitude",
        "The unconscious",
        "Retreat",
        "Institutions",
        "Hidden things",
        "Endings",
      ],
      impulse: "Beyond all of this is a stillness I could dissolve into.",
      fascinations: [
        "Spiritual transcendence",
        "Retreat and withdrawal",
        "Sacrifice for something larger",
        "Dreams and the unconscious",
        "Hidden support",
      ],
      blurs: [
        ["Rest", "escape"],
        ["Surrender", "avoidance"],
        ["Compassion", "martyrdom"],
        ["Solitude", "isolation"],
      ],
      revisions: [
        {
          from: "Letting go = peace",
          to: "Some things were being avoided",
        },
        {
          from: "Sacrifice serves something higher",
          to: "Some of it served not being seen",
        },
      ],
      remains: "An open door to the inner world — carried into the 1st",
      phases: {
        dream: {
          summary: "Letting go looks like peace",
          detail:
            "Neptune is in its own house, and the pull is toward stillness, spirituality and the unseen. Withdrawal from the noise of the world feels like the answer to it.",
          signs: [
            "Pull to retreat and stillness",
            "Vivid dreams and intuition",
            "The world's noise feels unbearable",
          ],
        },
        immersion: {
          summary: "Going under",
          detail:
            "Solitude, retreat, dreams, caring for others behind the scenes, or time inside an institution. The inner world opens wide, and the distinction between resting and hiding becomes hard to hold.",
          signs: [
            "Solitude, retreat, therapy",
            "Behind-the-scenes caregiving",
            "Hospitals, retreats, charities",
          ],
        },
        dissolution: {
          summary: "What was avoided surfaces",
          detail:
            "The inner life does not close; the belief that letting go was always peace does. Things kept hidden, including from yourself, come up, and the surrender that looked spiritual turns out to have contained some avoidance.",
          signs: [
            "Hidden things coming up",
            "Surrender revealed as partly avoidance",
            "Sacrifice as not wanting to be seen",
          ],
        },
      },
    },
  ],
};

/** Every arc the guide can show, in page order. */
export const ARCS: DevelopmentalArc[] = [NEPTUNE_ARC];

/** Which phase a point in the transit (0–1) falls in. */
export function phaseAt<K extends string>(
  arc: DevelopmentalArc<K>,
  t: number,
): ArcPhaseDef<K> {
  return (
    arc.phases.find((p) => t >= p.span[0] && t < p.span[1]) ??
    arc.phases[arc.phases.length - 1]
  );
}
