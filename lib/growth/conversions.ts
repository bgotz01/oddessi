/**
 * lib/growth/conversions.ts
 * Conversions written for a whole axis — both signs and both houses at once.
 *
 * The sign table in `signs.ts` already knows what it converts into, because the
 * nodes are always opposite: every Libra South Node is moving toward Aries, so
 * "Comparison → Judgment" is true of all of them. What it cannot know is the
 * ARENA. Libra in the third moving to Aries in the ninth is a conversion of
 * gathered perspectives into a worldview; Libra in the eighth moving to Aries
 * in the second is a conversion of shared entanglement into something owned
 * outright. Same signs, same modes at the sign level, entirely different life.
 *
 * So this is an override layer, not a replacement. An entry here is a curated
 * reading of one axis; where none exists the sign's own conversions stand, and
 * they are complete — no chart renders an empty section waiting for this file
 * to catch up.
 *
 * Keyed departing-first, because that is the direction the reading runs:
 *
 *     "Libra/3>Aries/9"
 *
 * The North side is redundant in the key — the nodes are opposite, so the sign
 * is fixed and the house is six along — and it is written out anyway, because a
 * key you can read is worth more than a key you can derive. It also fails
 * closed on the irregular charts where the nodes are NOT in opposite houses:
 * the key simply does not match, and the sign layer takes over.
 */

export interface AxisConversion {
  /** The practised capacities being carried forward. */
  fromMode: string[];

  /** The developmental capacities those are being converted into. */
  intoMode: string[];

  /** What the person actually does now. */
  from: string;

  /** What doing it in the new arena looks like. Imperative. */
  into: string;
}

export const AXIS_CONVERSIONS: Record<string, AxisConversion[]> = {

  "Aries/1>Libra/7": [
    {
      fromMode: ["Selfhood", "Initiative"],
      intoMode: ["Partnership", "Reciprocity"],
      from: "Deciding from yourself and moving before anyone else does",
      into: "Bring another person's needs and position into the decision",
    },
    {
      fromMode: ["Assertion", "Independence"],
      intoMode: ["Dialogue", "Negotiation"],
      from: "Saying what you want and expecting the other person to respond",
      into: "Stay in the conversation long enough to discover terms that work for both",
    },
    {
      fromMode: ["Autonomy", "Directness"],
      intoMode: ["Equality", "Cooperation"],
      from: "Treating independence as proof that you are strong",
      into: "Build something with an equal without needing to control the whole arrangement",
    },
  ],

  "Aries/2>Libra/8": [
    {
      fromMode: ["Ownership", "Claim"],
      intoMode: ["Sharing", "Negotiation"],
      from: "Knowing what is yours and protecting it",
      into: "Learn what can be combined, shared, or entrusted without losing your own position",
    },
    {
      fromMode: ["Worth", "Self-Reliance"],
      intoMode: ["Exchange", "Fairness"],
      from: "Setting value entirely from your own needs",
      into: "Account for what each person contributes, risks, and receives",
    },
    {
      fromMode: ["Possession", "Control"],
      intoMode: ["Trust", "Interdependence"],
      from: "Keeping resources under your own control",
      into: "Let another person hold real influence over something that matters",
    },
  ],

  "Aries/3>Libra/9": [
    {
      fromMode: ["Argument", "Voice"],
      intoMode: ["Perspective", "Comparison"],
      from: "Testing ideas by arguing them directly",
      into: "Place your position beside other worldviews and see what each one reveals",
    },
    {
      fromMode: ["Question", "Challenge"],
      intoMode: ["Interpretation", "Understanding"],
      from: "Finding the weak point in what someone says",
      into: "Understand the larger framework that makes their position coherent",
    },
    {
      fromMode: ["Immediacy", "Opinion"],
      intoMode: ["Breadth", "Judgment"],
      from: "Speaking from what seems true right now",
      into: "Range widely enough that your judgment can account for more than one frame",
    },
  ],

  "Aries/4>Libra/10": [
    {
      fromMode: ["Autonomy", "Belonging"],
      intoMode: ["Representation", "Leadership"],
      from: "Building a private life around what you personally need",
      into: "Take responsibility for representing interests larger than your own",
    },
    {
      fromMode: ["Privacy", "Self-Definition"],
      intoMode: ["Standing", "Diplomacy"],
      from: "Defining yourself inside your own protected territory",
      into: "Carry that position into public life without treating every disagreement as a threat",
    },
    {
      fromMode: ["Foundation", "Independence"],
      intoMode: ["Responsibility", "Legitimacy"],
      from: "Creating a base that answers only to you",
      into: "Build public authority by earning the trust of people with competing needs",
    },
  ],

  "Aries/5>Libra/11": [
    {
      fromMode: ["Desire", "Authorship"],
      intoMode: ["Collaboration", "Coalition"],
      from: "Making what you want because it excites you",
      into: "Find the people whose different strengths can make the idea larger than you could alone",
    },
    {
      fromMode: ["Expression", "Visibility"],
      intoMode: ["Participation", "Network"],
      from: "Wanting the creation to carry your unmistakable signature",
      into: "Let other people contribute enough that the work becomes genuinely shared",
    },
    {
      fromMode: ["Play", "Personal Risk"],
      intoMode: ["Cause", "Common Interest"],
      from: "Following what personally energizes you",
      into: "Connect that energy to something a wider group has reason to care about",
    },
  ],

  "Aries/6>Libra/12": [
    {
      fromMode: ["Action", "Intervention"],
      intoMode: ["Surrender", "Acceptance"],
      from: "Fixing the problem as soon as you see it",
      into: "Recognize when the situation cannot be improved by pushing harder",
    },
    {
      fromMode: ["Practice", "Control"],
      intoMode: ["Receptivity", "Reflection"],
      from: "Relying on effort, repetition, and correction",
      into: "Leave enough space for what cannot be solved through method to show itself",
    },
    {
      fromMode: ["Usefulness", "Agency"],
      intoMode: ["Compassion", "Presence"],
      from: "Proving your value by doing something concrete",
      into: "Stay present with another person even when there is nothing useful to fix",
    },
  ],

  "Aries/7>Libra/1": [
    {
      fromMode: ["Assertion", "Encounter"],
      intoMode: ["Diplomacy", "Self-Presentation"],
      from: "Discovering yourself through confrontation with another strong person",
      into: "Learn to represent your own position without turning every encounter into a contest",
    },
    {
      fromMode: ["Challenge", "Directness"],
      intoMode: ["Perspective", "Proportion"],
      from: "Saying the thing plainly and letting the other person deal with it",
      into: "Notice how your position lands without abandoning the position itself",
    },
    {
      fromMode: ["Conflict", "Independence"],
      intoMode: ["Grace", "Reciprocity"],
      from: "Using disagreement to prove that you can stand alone",
      into: "Become someone who can remain distinct while also making room for the person opposite",
    },
  ],

  "Aries/8>Libra/2": [
    {
      fromMode: ["Exposure", "Intensity"],
      intoMode: ["Valuation", "Proportion"],
      from: "Going straight into the question of power, risk, and vulnerability",
      into: "Decide calmly what something is worth before becoming entangled in it",
    },
    {
      fromMode: ["Claim", "Leverage"],
      intoMode: ["Fairness", "Exchange"],
      from: "Taking the share you believe your risk entitles you to",
      into: "Weigh your claim against what the other side contributes and needs",
    },
    {
      fromMode: ["Entanglement", "Transformation"],
      intoMode: ["Ownership", "Balance"],
      from: "Letting value become defined inside intense shared arrangements",
      into: "Establish what is yours, what is theirs, and what exchange between the two is actually fair",
    },
  ],

  "Aries/9>Libra/3": [
    {
      fromMode: ["Conviction", "Authorship"],
      intoMode: ["Dialogue", "Interpretation"],
      from: "Forming a worldview and standing behind it",
      into: "Put the idea into conversation and learn how another mind understands it",
    },
    {
      fromMode: ["Declaration", "Principle"],
      intoMode: ["Question", "Comparison"],
      from: "Stating the larger truth as you see it",
      into: "Ask what changes when the principle is viewed from another position",
    },
    {
      fromMode: ["Belief", "Direction"],
      intoMode: ["Exchange", "Nuance"],
      from: "Using conviction to decide where to go",
      into: "Let conversation refine the belief without requiring you to abandon it",
    },
  ],

  "Aries/10>Libra/4": [
    {
      fromMode: ["Leadership", "Direction"],
      intoMode: ["Belonging", "Harmony"],
      from: "Taking responsibility for deciding where things should go",
      into: "Build a private foundation in which other people's needs also have a place",
    },
    {
      fromMode: ["Standing", "Visibility"],
      intoMode: ["Relationship", "Care"],
      from: "Being identified with your decisions in public",
      into: "Learn who you are when there is no audience and the relationship itself matters more than the role",
    },
    {
      fromMode: ["Authority", "Independence"],
      intoMode: ["Balance", "Home"],
      from: "Carrying responsibility by relying primarily on your own judgment",
      into: "Create a foundation where responsibility is shared rather than simply commanded",
    },
  ],

  "Aries/11>Libra/5": [
    {
      fromMode: ["Initiative", "Mobilization"],
      intoMode: ["Expression", "Beauty"],
      from: "Starting the project and getting everyone moving",
      into: "Develop the taste to make the result worth looking at, feeling, or enjoying",
    },
    {
      fromMode: ["Cause", "Action"],
      intoMode: ["Desire", "Creation"],
      from: "Putting energy behind what the group needs",
      into: "Make room for what you personally love, even when it serves no collective purpose",
    },
    {
      fromMode: ["Leadership", "Alliance"],
      intoMode: ["Play", "Romance"],
      from: "Relating to people through shared missions",
      into: "Relate through pleasure, attraction, and mutual enjoyment without needing a larger cause",
    },
  ],

  "Aries/12>Libra/6": [
    {
      fromMode: ["Instinct", "Solitude"],
      intoMode: ["Cooperation", "Routine"],
      from: "Following what feels true before it can be explained",
      into: "Build a daily structure that other people can reliably work with",
    },
    {
      fromMode: ["Retreat", "Autonomy"],
      intoMode: ["Service", "Reciprocity"],
      from: "Protecting what is yours by keeping it private",
      into: "Bring the work into ordinary life where it can actually help someone",
    },
    {
      fromMode: ["Surrender", "Inner Direction"],
      intoMode: ["Adjustment", "Practice"],
      from: "Waiting for the inner signal before acting",
      into: "Learn to adapt the work through repetition, feedback, and practical cooperation",
    },
  ],

  "Taurus/1>Scorpio/7": [
    {
      fromMode: ["Stability", "Self-Possession"],
      intoMode: ["Intimacy", "Vulnerability"],
      from: "Relying on your own steadiness to remain secure",
      into: "Let another person close enough to affect you",
    },
    {
      fromMode: ["Presence", "Consistency"],
      intoMode: ["Trust", "Depth"],
      from: "Showing people who you are through consistency",
      into: "Show them what normally stays protected beneath the surface",
    },
    {
      fromMode: ["Independence", "Grounding"],
      intoMode: ["Partnership", "Transformation"],
      from: "Keeping your footing by remaining self-contained",
      into: "Enter relationships that change you rather than only support who you already are",
    },
  ],

  "Taurus/2>Scorpio/8": [
    {
      fromMode: ["Ownership", "Stewardship"],
      intoMode: ["Sharing", "Trust"],
      from: "Building security through what you can own and protect",
      into: "Put something valuable into an arrangement you cannot control alone",
    },
    {
      fromMode: ["Accumulation", "Preservation"],
      intoMode: ["Risk", "Transformation"],
      from: "Keeping what has proven its value",
      into: "Risk existing value when deeper growth requires the arrangement to change",
    },
    {
      fromMode: ["Self-Reliance", "Security"],
      intoMode: ["Interdependence", "Power"],
      from: "Making sure you can stand on your own resources",
      into: "Learn how to share resources and power without surrendering responsibility for either",
    },
  ],

  "Taurus/3>Scorpio/9": [
    {
      fromMode: ["Practicality", "Grounding"],
      intoMode: ["Inquiry", "Conviction"],
      from: "Trusting ideas that can be demonstrated in ordinary life",
      into: "Follow the question beyond what can be immediately proven",
    },
    {
      fromMode: ["Simplicity", "Common Sense"],
      intoMode: ["Depth", "Interpretation"],
      from: "Reducing an idea to what is concrete and usable",
      into: "Investigate the assumptions beneath the worldview before deciding what it means",
    },
    {
      fromMode: ["Certainty", "Experience"],
      intoMode: ["Challenge", "Belief"],
      from: "Building your thinking from what experience has already confirmed",
      into: "Let a difficult truth overturn a belief that once felt secure",
    },
  ],

  "Taurus/4>Scorpio/10": [
    {
      fromMode: ["Foundation", "Security"],
      intoMode: ["Power", "Responsibility"],
      from: "Building a private base strong enough to protect what matters",
      into: "Step into public situations where power has to be understood and used",
    },
    {
      fromMode: ["Continuity", "Belonging"],
      intoMode: ["Strategy", "Change"],
      from: "Preserving the structures that keep life stable",
      into: "Recognize when the structure itself has become the thing that must change",
    },
    {
      fromMode: ["Protection", "Privacy"],
      intoMode: ["Exposure", "Influence"],
      from: "Keeping important matters inside the trusted circle",
      into: "Enter the consequential arena and learn what actually moves the outcome",
    },
  ],

  "Taurus/5>Scorpio/11": [
    {
      fromMode: ["Creation", "Craft"],
      intoMode: ["Strategy", "Influence"],
      from: "Making something valuable through your own sustained attention",
      into: "Read the network around the work and understand what will make it move",
    },
    {
      fromMode: ["Pleasure", "Expression"],
      intoMode: ["Commitment", "Cause"],
      from: "Following what feels personally rewarding to create",
      into: "Put your creative power behind a collective outcome that matters beyond personal enjoyment",
    },
    {
      fromMode: ["Ownership", "Pride"],
      intoMode: ["Alliance", "Leverage"],
      from: "Wanting the creation to remain recognisably yours",
      into: "Join forces with people whose power and resources can transform what the project can become",
    },
  ],

  "Taurus/6>Scorpio/12": [
    {
      fromMode: ["Routine", "Mastery"],
      intoMode: ["Surrender", "Depth"],
      from: "Trusting the methods that reliably keep things working",
      into: "Enter the problem that has no reliable procedure and stay with what emerges",
    },
    {
      fromMode: ["Maintenance", "Control"],
      intoMode: ["Exposure", "Release"],
      from: "Preventing problems through steady maintenance",
      into: "Notice what cannot be maintained anymore and allow it to end",
    },
    {
      fromMode: ["Practicality", "Embodiment"],
      intoMode: ["Intuition", "Investigation"],
      from: "Working with what can be observed, handled, and repaired",
      into: "Follow the hidden pattern even before you can explain exactly what you are seeing",
    },
  ],

  "Taurus/7>Scorpio/1": [
    {
      fromMode: ["Loyalty", "Partnership"],
      intoMode: ["Self-Exposure", "Transformation"],
      from: "Building identity through relationships that remain stable over time",
      into: "Confront what in you has to change even if the relationship cannot remain the same",
    },
    {
      fromMode: ["Constancy", "Trust"],
      intoMode: ["Intensity", "Agency"],
      from: "Proving commitment by staying",
      into: "Act on the truth when staying unchanged would cost you your own power",
    },
    {
      fromMode: ["Agreement", "Continuity"],
      intoMode: ["Boundaries", "Rebirth"],
      from: "Protecting the bond by preserving what already works",
      into: "Let an old version of yourself end rather than preserving it for the bond",
    },
  ],

  "Taurus/8>Scorpio/2": [
    {
      fromMode: ["Stewardship", "Shared Value"],
      intoMode: ["Investigation", "Investment"],
      from: "Protecting what has been entrusted or shared",
      into: "Look beneath apparent value and put your own resources behind what others have missed",
    },
    {
      fromMode: ["Preservation", "Responsibility"],
      intoMode: ["Risk", "Concentration"],
      from: "Managing shared assets so that nothing important is lost",
      into: "Concentrate resources where transformation could create disproportionate value",
    },
    {
      fromMode: ["Security", "Holding"],
      intoMode: ["Conviction", "Allocation"],
      from: "Keeping value safe once it is in your hands",
      into: "Decide what is worth risking your own capital on and commit to it",
    },
  ],

  "Taurus/9>Scorpio/3": [
    {
      fromMode: ["Belief", "Stability"],
      intoMode: ["Questioning", "Investigation"],
      from: "Living by principles that have proven sturdy enough to trust",
      into: "Question the detail that does not fit the worldview",
    },
    {
      fromMode: ["Conviction", "Continuity"],
      intoMode: ["Contradiction", "Inquiry"],
      from: "Preserving a coherent account of how things work",
      into: "Follow the contradiction even when it threatens the coherent account",
    },
    {
      fromMode: ["Wisdom", "Application"],
      intoMode: ["Evidence", "Exposure"],
      from: "Judging ideas by whether they produce a workable life",
      into: "Look for the missing fact that changes what you thought you knew",
    },
  ],

  "Taurus/10>Scorpio/4": [
    {
      fromMode: ["Building", "Ownership"],
      intoMode: ["Excavation", "Truth"],
      from: "Creating something substantial enough to establish your standing",
      into: "Investigate the private foundation beneath what you have built",
    },
    {
      fromMode: ["Reputation", "Durability"],
      intoMode: ["Exposure", "Healing"],
      from: "Protecting the work and reputation that took years to establish",
      into: "Expose the inherited pattern that keeps reproducing itself underneath the success",
    },
    {
      fromMode: ["Achievement", "Preservation"],
      intoMode: ["Roots", "Transformation"],
      from: "Making sure what you build can survive",
      into: "Change the foundation when survival would otherwise mean repeating the past",
    },
  ],

  "Taurus/11>Scorpio/5": [
    {
      fromMode: ["Sustaining", "Membership"],
      intoMode: ["Creation", "Transformation"],
      from: "Keeping the collective effort stable and resourced",
      into: "Take the intense private material and make something unmistakably your own from it",
    },
    {
      fromMode: ["Continuity", "Contribution"],
      intoMode: ["Risk", "Expression"],
      from: "Contributing what the group reliably needs",
      into: "Create the thing that feels dangerous enough to expose something real about you",
    },
    {
      fromMode: ["Support", "Belonging"],
      intoMode: ["Desire", "Alchemy"],
      from: "Finding value in being part of something durable",
      into: "Follow the desire that transforms difficult experience into creation",
    },
  ],

  "Taurus/12>Scorpio/6": [
    {
      fromMode: ["Grounding", "Acceptance"],
      intoMode: ["Diagnosis", "Repair"],
      from: "Creating enough steadiness to live with what cannot be controlled",
      into: "Identify the hidden cause when something concrete keeps failing",
    },
    {
      fromMode: ["Patience", "Endurance"],
      intoMode: ["Investigation", "Intervention"],
      from: "Waiting without forcing the situation to resolve",
      into: "Investigate the recurring symptom and intervene at its source",
    },
    {
      fromMode: ["Sanctuary", "Rest"],
      intoMode: ["Work", "Healing"],
      from: "Protecting a space where pressure can subside",
      into: "Bring what surfaced there into the practical work of repair",
    },
  ],

  "Gemini/1>Sagittarius/7": [
    {
      fromMode: ["Curiosity", "Adaptability"],
      intoMode: ["Partnership", "Exploration"],
      from: "Changing your approach as new people and possibilities appear",
      into: "Choose someone whose different world can genuinely expand your own",
    },
    {
      fromMode: ["Communication", "Connection"],
      intoMode: ["Honesty", "Commitment"],
      from: "Keeping relationships alive through conversation and exchange",
      into: "Say what you actually believe and let the relationship develop around the truth",
    },
    {
      fromMode: ["Variety", "Mobility"],
      intoMode: ["Direction", "Companionship"],
      from: "Keeping several relational possibilities open",
      into: "Travel far enough with one person to discover where the relationship can lead",
    },
  ],

  "Gemini/2>Sagittarius/8": [
    {
      fromMode: ["Exchange", "Opportunity"],
      intoMode: ["Risk", "Conviction"],
      from: "Creating value by spotting opportunities and moving between them",
      into: "Put meaningful resources behind the opportunity you actually believe in",
    },
    {
      fromMode: ["Information", "Negotiation"],
      intoMode: ["Trust", "Commitment"],
      from: "Using what you know to improve the terms of the exchange",
      into: "Commit beyond the point where better information can remove the uncertainty",
    },
    {
      fromMode: ["Flexibility", "Diversification"],
      intoMode: ["Concentration", "Growth"],
      from: "Keeping resources mobile so another option is always available",
      into: "Concentrate enough behind one possibility for it to materially change what you have",
    },
  ],

  "Gemini/3>Sagittarius/9": [
    {
      fromMode: ["Information", "Comparison"],
      intoMode: ["Meaning", "Synthesis"],
      from: "Gathering facts and comparing different explanations",
      into: "Decide what the pattern means and build a larger view from it",
    },
    {
      fromMode: ["Questioning", "Dialogue"],
      intoMode: ["Conviction", "Philosophy"],
      from: "Keeping an idea open by finding another question",
      into: "Follow the questions until you reach a principle you are willing to live by",
    },
    {
      fromMode: ["Breadth", "Curiosity"],
      intoMode: ["Direction", "Wisdom"],
      from: "Learning a little more whenever something catches your attention",
      into: "Take what you have learned far enough that it changes where you are going",
    },
  ],

  "Gemini/4>Sagittarius/10": [
    {
      fromMode: ["Story", "Interpretation"],
      intoMode: ["Vision", "Leadership"],
      from: "Understanding where you come from through many stories and explanations",
      into: "Turn what you have learned into a direction other people can follow",
    },
    {
      fromMode: ["Adaptation", "Belonging"],
      intoMode: ["Conviction", "Standing"],
      from: "Learning the language of the environment so you can belong within it",
      into: "Stand publicly for a principle even when your environment does not share it",
    },
    {
      fromMode: ["Memory", "Narrative"],
      intoMode: ["Purpose", "Example"],
      from: "Keeping the different accounts of the past alive",
      into: "Decide what the past taught you and embody that lesson where others can see it",
    },
  ],

  "Gemini/5>Sagittarius/11": [
    {
      fromMode: ["Improvisation", "Experiment"],
      intoMode: ["Cause", "Advocacy"],
      from: "Trying ideas because they are interesting to play with",
      into: "Put the idea that survives behind a cause worth spreading",
    },
    {
      fromMode: ["Expression", "Variety"],
      intoMode: ["Message", "Movement"],
      from: "Creating in whatever form feels interesting right now",
      into: "Give the work a message strong enough to gather people around it",
    },
    {
      fromMode: ["Play", "Curiosity"],
      intoMode: ["Belief", "Community"],
      from: "Following whatever captures your imagination",
      into: "Find the people who share the conviction and build momentum together",
    },
  ],

  "Gemini/6>Sagittarius/12": [
    {
      fromMode: ["Coordination", "Problem Solving"],
      intoMode: ["Trust", "Surrender"],
      from: "Managing the details until the situation makes sense",
      into: "Let the larger direction emerge before every detail can be explained",
    },
    {
      fromMode: ["Information", "Adjustment"],
      intoMode: ["Intuition", "Faith"],
      from: "Correcting your course whenever new information arrives",
      into: "Follow the inner direction when there is no new information left to gather",
    },
    {
      fromMode: ["Busyness", "Usefulness"],
      intoMode: ["Retreat", "Meaning"],
      from: "Keeping yourself useful by responding to whatever needs attention",
      into: "Step away long enough to ask what all the activity is actually for",
    },
  ],

  "Gemini/7>Sagittarius/1": [
    {
      fromMode: ["Dialogue", "Adaptation"],
      intoMode: ["Identity", "Conviction"],
      from: "Discovering your position through conversation with another person",
      into: "Know what you believe before someone else gives you a position to respond to",
    },
    {
      fromMode: ["Curiosity", "Partnership"],
      intoMode: ["Independence", "Exploration"],
      from: "Letting other people introduce the next interesting possibility",
      into: "Choose the horizon yourself and start moving toward it",
    },
    {
      fromMode: ["Exchange", "Flexibility"],
      intoMode: ["Honesty", "Direction"],
      from: "Keeping the relationship moving by staying open to both sides",
      into: "Say where you are actually going and let others decide whether they are coming",
    },
  ],

  "Gemini/8>Sagittarius/2": [
    {
      fromMode: ["Questioning", "Investigation"],
      intoMode: ["Conviction", "Investment"],
      from: "Digging into other people's motives, resources, and hidden information",
      into: "Use what you have learned to decide what deserves your own resources",
    },
    {
      fromMode: ["Complexity", "Negotiation"],
      intoMode: ["Value", "Principle"],
      from: "Understanding how every side of the arrangement fits together",
      into: "Decide what is worth backing without needing every variable resolved",
    },
    {
      fromMode: ["Information", "Leverage"],
      intoMode: ["Risk", "Expansion"],
      from: "Reducing uncertainty by knowing more than the other side",
      into: "Take the informed risk that can expand what you own",
    },
  ],

  "Gemini/9>Sagittarius/3": [
    {
      fromMode: ["Translation", "Comparison"],
      intoMode: ["Voice", "Conviction"],
      from: "Explaining how different cultures and worldviews understand the same question",
      into: "Say what you think the comparison actually shows",
    },
    {
      fromMode: ["Breadth", "Interpretation"],
      intoMode: ["Message", "Clarity"],
      from: "Moving between large frameworks without settling inside one",
      into: "Distill what you have learned into a message another person can carry away",
    },
    {
      fromMode: ["Learning", "Mobility"],
      intoMode: ["Teaching", "Direction"],
      from: "Moving on whenever another perspective becomes interesting",
      into: "Teach the principle that has remained true across what you have seen",
    },
  ],

  "Gemini/10>Sagittarius/4": [
    {
      fromMode: ["Communication", "Representation"],
      intoMode: ["Belief", "Foundation"],
      from: "Building a public role around explaining, connecting, and responding",
      into: "Build a private life around what you believe even when nobody is listening",
    },
    {
      fromMode: ["Adaptability", "Reputation"],
      intoMode: ["Conviction", "Belonging"],
      from: "Changing the message to meet the audience in front of you",
      into: "Choose the principles that define where and with whom you belong",
    },
    {
      fromMode: ["Visibility", "Information"],
      intoMode: ["Meaning", "Roots"],
      from: "Being known for knowing what is happening",
      into: "Decide what matters enough to become part of the foundation of your life",
    },
  ],

  "Gemini/11>Sagittarius/5": [
    {
      fromMode: ["Networking", "Connection"],
      intoMode: ["Creation", "Conviction"],
      from: "Connecting people and ideas across the wider network",
      into: "Take what excites you most and make a statement of your own from it",
    },
    {
      fromMode: ["Exchange", "Community"],
      intoMode: ["Expression", "Belief"],
      from: "Keeping information moving between people",
      into: "Create something that shows what you believe rather than everything you have heard",
    },
    {
      fromMode: ["Variety", "Collaboration"],
      intoMode: ["Risk", "Authorship"],
      from: "Finding stimulation through many people and projects",
      into: "Risk being identified with one creation that is unmistakably yours",
    },
  ],

  "Gemini/12>Sagittarius/6": [
    {
      fromMode: ["Listening", "Observation"],
      intoMode: ["Teaching", "Practice"],
      from: "Taking in the fragments that other people overlook",
      into: "Turn what you have understood into something you can teach through daily action",
    },
    {
      fromMode: ["Reflection", "Possibility"],
      intoMode: ["Principle", "Routine"],
      from: "Holding several interpretations without needing to choose between them",
      into: "Choose the principle worth practicing consistently",
    },
    {
      fromMode: ["Withdrawal", "Curiosity"],
      intoMode: ["Purpose", "Service"],
      from: "Following ideas privately wherever they happen to lead",
      into: "Put the knowledge to work in a way that gives the ordinary day direction",
    },
  ],

  "Cancer/1>Capricorn/7": [
    {
      fromMode: ["Sensitivity", "Protection"],
      intoMode: ["Commitment", "Responsibility"],
      from: "Reading what people need and adjusting yourself to protect the bond",
      into: "Define what each person is responsible for and hold the relationship to it",
    },
    {
      fromMode: ["Care", "Responsiveness"],
      intoMode: ["Partnership", "Structure"],
      from: "Showing commitment by responding whenever the other person needs you",
      into: "Build agreements that let the relationship carry responsibility without constant tending",
    },
    {
      fromMode: ["Instinct", "Self-Protection"],
      intoMode: ["Boundaries", "Accountability"],
      from: "Pulling close or withdrawing according to what feels safe",
      into: "State the boundary clearly and accept the consequences of keeping it",
    },
  ],

  "Cancer/2>Capricorn/8": [
    {
      fromMode: ["Provision", "Security"],
      intoMode: ["Management", "Stewardship"],
      from: "Using your resources to make sure the people you care about are safe",
      into: "Manage shared resources according to responsibility rather than immediate need",
    },
    {
      fromMode: ["Care", "Giving"],
      intoMode: ["Boundaries", "Obligation"],
      from: "Giving more when someone you care about needs more",
      into: "Define what is owed, by whom, and for how long",
    },
    {
      fromMode: ["Protection", "Possession"],
      intoMode: ["Trust", "Control"],
      from: "Keeping important resources close so they remain secure",
      into: "Build a structure that allows power and resources to be shared without becoming unmanaged",
    },
  ],

  "Cancer/3>Capricorn/9": [
    {
      fromMode: ["Listening", "Understanding"],
      intoMode: ["Principle", "Judgment"],
      from: "Understanding an idea through the experience of the person telling it",
      into: "Extract the principle that still holds when the personal story changes",
    },
    {
      fromMode: ["Memory", "Context"],
      intoMode: ["Framework", "Law"],
      from: "Remembering the circumstances that explain why people acted as they did",
      into: "Turn what you have learned into a standard that can guide future decisions",
    },
    {
      fromMode: ["Empathy", "Interpretation"],
      intoMode: ["Authority", "Position"],
      from: "Making room for every person's reasons",
      into: "Decide which principle should govern when those reasons conflict",
    },
  ],

  "Cancer/4>Capricorn/10": [
    {
      fromMode: ["Home", "Belonging"],
      intoMode: ["Leadership", "Standing"],
      from: "Building the private foundation where you and your people feel secure",
      into: "Carry responsibility beyond the private circle and become accountable for the outcome",
    },
    {
      fromMode: ["Protection", "Care"],
      intoMode: ["Authority", "Direction"],
      from: "Holding people together by responding to what they need",
      into: "Decide where things need to go even when the decision cannot please everyone",
    },
    {
      fromMode: ["Roots", "Continuity"],
      intoMode: ["Achievement", "Legacy"],
      from: "Preserving what gives you a sense of origin and belonging",
      into: "Build something substantial enough to become part of what you leave behind",
    },
  ],

  "Cancer/5>Capricorn/11": [
    {
      fromMode: ["Creation", "Cultivation"],
      intoMode: ["Organization", "Institution"],
      from: "Nurturing something personal until it develops a life of its own",
      into: "Build the structure and network that allow it to continue beyond your personal care",
    },
    {
      fromMode: ["Attachment", "Expression"],
      intoMode: ["Objectivity", "Strategy"],
      from: "Protecting the creation because of what it means to you",
      into: "Ask what the larger project requires even when it changes what you personally love about it",
    },
    {
      fromMode: ["Nurturing", "Growth"],
      intoMode: ["Scale", "Durability"],
      from: "Helping the thing grow through close attention",
      into: "Create systems that let many people carry the work without depending on you",
    },
  ],

  "Cancer/6>Capricorn/12": [
    {
      fromMode: ["Care", "Maintenance"],
      intoMode: ["Duty", "Solitude"],
      from: "Noticing what needs tending and quietly taking care of it",
      into: "Take responsibility for necessary work even when nobody sees or appreciates it",
    },
    {
      fromMode: ["Usefulness", "Responsiveness"],
      intoMode: ["Discipline", "Restraint"],
      from: "Responding whenever someone or something needs care",
      into: "Decide what is actually yours to carry and remain disciplined about the boundary",
    },
    {
      fromMode: ["Routine", "Tending"],
      intoMode: ["Endurance", "Stewardship"],
      from: "Keeping the small things functioning through daily attention",
      into: "Hold responsibility through long periods when there is no immediate reward",
    },
  ],

  "Cancer/7>Capricorn/1": [
    {
      fromMode: ["Bonding", "Partnership"],
      intoMode: ["Self-Authority", "Direction"],
      from: "Knowing yourself through the relationships you protect and maintain",
      into: "Decide what your life requires before asking whether the relationship supports it",
    },
    {
      fromMode: ["Care", "Accommodation"],
      intoMode: ["Boundaries", "Responsibility"],
      from: "Adjusting yourself to preserve emotional security between you",
      into: "Define what you will carry and what belongs to the other person",
    },
    {
      fromMode: ["Attachment", "Loyalty"],
      intoMode: ["Independence", "Purpose"],
      from: "Staying because the bond itself feels like something you must protect",
      into: "Build a direction strong enough that relationship becomes part of your life rather than its organizing principle",
    },
  ],

  "Cancer/8>Capricorn/2": [
    {
      fromMode: ["Trust", "Protection"],
      intoMode: ["Ownership", "Management"],
      from: "Protecting what other people have entrusted to you",
      into: "Build and manage resources that are clearly yours to be responsible for",
    },
    {
      fromMode: ["Intimacy", "Sharing"],
      intoMode: ["Value", "Boundaries"],
      from: "Letting emotional bonds determine what is shared",
      into: "Decide what you can afford to give and what must remain under your control",
    },
    {
      fromMode: ["Guardianship", "Loyalty"],
      intoMode: ["Accumulation", "Capacity"],
      from: "Holding resources safely for the people or bonds that matter",
      into: "Turn disciplined ownership into enough capacity to provide without becoming entangled",
    },
  ],

  "Cancer/9>Capricorn/3": [
    {
      fromMode: ["Tradition", "Belonging"],
      intoMode: ["Analysis", "Structure"],
      from: "Preserving beliefs because they carry the experience of the people who came before you",
      into: "Break the inherited framework into claims you can examine for yourself",
    },
    {
      fromMode: ["Faith", "Continuity"],
      intoMode: ["Reasoning", "Planning"],
      from: "Trusting the worldview that has given life coherence",
      into: "Work out how the principle operates in concrete decisions and consequences",
    },
    {
      fromMode: ["Inheritance", "Meaning"],
      intoMode: ["Definition", "Judgment"],
      from: "Carrying forward what feels too meaningful to lose",
      into: "State precisely what deserves to survive and why",
    },
  ],

  "Cancer/10>Capricorn/4": [
    {
      fromMode: ["Protection", "Leadership"],
      intoMode: ["Foundation", "Responsibility"],
      from: "Taking public responsibility by looking after the people who depend on you",
      into: "Build the private structure that makes responsibility sustainable",
    },
    {
      fromMode: ["Care", "Reputation"],
      intoMode: ["Boundaries", "Home"],
      from: "Being known as the person who will be there when others need something",
      into: "Protect the time, place, and commitments that your own foundation requires",
    },
    {
      fromMode: ["Responsiveness", "Duty"],
      intoMode: ["Structure", "Continuity"],
      from: "Responding personally whenever the responsibility calls",
      into: "Create a foundation that continues to hold even when you are not personally tending it",
    },
  ],

  "Cancer/11>Capricorn/5": [
    {
      fromMode: ["Community", "Belonging"],
      intoMode: ["Creation", "Discipline"],
      from: "Creating spaces where other people feel included and supported",
      into: "Choose the creation that is yours and give it the discipline required to finish it",
    },
    {
      fromMode: ["Hosting", "Connection"],
      intoMode: ["Authorship", "Production"],
      from: "Bringing people together and making sure everyone has a place",
      into: "Stop organizing the room long enough to produce something with your own name on it",
    },
    {
      fromMode: ["Care", "Collective"],
      intoMode: ["Standards", "Mastery"],
      from: "Measuring success by whether the group remains connected",
      into: "Measure the work by whether it meets the standard you committed yourself to",
    },
  ],

  "Cancer/12>Capricorn/6": [
    {
      fromMode: ["Compassion", "Witnessing"],
      intoMode: ["Work", "Management"],
      from: "Holding space for pain that cannot immediately be solved",
      into: "Identify the part that can be acted on and take responsibility for it",
    },
    {
      fromMode: ["Sensitivity", "Acceptance"],
      intoMode: ["Discipline", "Practice"],
      from: "Allowing yourself to feel what the situation carries",
      into: "Turn what you understand into a repeatable practice that improves the situation",
    },
    {
      fromMode: ["Retreat", "Care"],
      intoMode: ["Structure", "Execution"],
      from: "Creating refuge when the world becomes too demanding",
      into: "Build the routines that let you return to the world capable of carrying responsibility",
    },
  ],

  "Leo/1>Aquarius/7": [
    {
      fromMode: ["Presence", "Individuality"],
      intoMode: ["Partnership", "Collaboration"],
      from: "Entering the room as a distinct presence and expecting to be met as one",
      into: "Build with someone whose independence is as important as your own",
    },
    {
      fromMode: ["Confidence", "Self-Expression"],
      intoMode: ["Equality", "Exchange"],
      from: "Showing people clearly who you are",
      into: "Make enough room for the other person to surprise and change the arrangement",
    },
    {
      fromMode: ["Identity", "Recognition"],
      intoMode: ["Difference", "Cooperation"],
      from: "Knowing yourself through what makes you distinctive",
      into: "Let difference become the basis of partnership rather than a contest for attention",
    },
  ],

  "Leo/2>Aquarius/8": [
    {
      fromMode: ["Ownership", "Pride"],
      intoMode: ["Sharing", "Reallocation"],
      from: "Building value around what carries your personal stamp",
      into: "Put resources where they can create the greatest change, even when you do not control the result",
    },
    {
      fromMode: ["Creation", "Possession"],
      intoMode: ["Experiment", "Exchange"],
      from: "Wanting to own what your talent has produced",
      into: "Test what becomes possible when resources move between people in unconventional ways",
    },
    {
      fromMode: ["Worth", "Recognition"],
      intoMode: ["Leverage", "Collective Value"],
      from: "Measuring value through what your work can command",
      into: "Ask how the same resources could unlock value across a larger system",
    },
  ],

  "Leo/3>Aquarius/9": [
    {
      fromMode: ["Storytelling", "Voice"],
      intoMode: ["Vision", "Foresight"],
      from: "Making ideas compelling by giving them a strong personal voice",
      into: "Use that voice to describe a possibility people have not yet learned to see",
    },
    {
      fromMode: ["Expression", "Narrative"],
      intoMode: ["Systems Thinking", "Futurism"],
      from: "Organizing information into a story people can follow",
      into: "Look beyond the story to the larger system and where it may be heading",
    },
    {
      fromMode: ["Performance", "Persuasion"],
      intoMode: ["Experiment", "Possibility"],
      from: "Communicating in a way that captures attention",
      into: "Use attention to introduce the unconventional idea rather than merely strengthen the performance",
    },
  ],

  "Leo/4>Aquarius/10": [
    {
      fromMode: ["Centrality", "Belonging"],
      intoMode: ["Reform", "Leadership"],
      from: "Becoming the defining presence around which the private world gathers",
      into: "Use your public position to change the structure rather than simply occupy its center",
    },
    {
      fromMode: ["Pride", "Foundation"],
      intoMode: ["Objectivity", "Institution"],
      from: "Protecting the people and traditions that feel like part of you",
      into: "Judge the institution by whether it works, not by whether it preserves what feels familiar",
    },
    {
      fromMode: ["Identity", "Roots"],
      intoMode: ["Independence", "Impact"],
      from: "Drawing strength from being somebody within a particular circle",
      into: "Stand apart from the circle when the larger system needs to change",
    },
  ],

  "Leo/5>Aquarius/11": [
    {
      fromMode: ["Creation", "Expression"],
      intoMode: ["Collaboration", "Network"],
      from: "Creating something that carries your unmistakable signature",
      into: "Build with people whose contributions make the result impossible to attribute to one person",
    },
    {
      fromMode: ["Performance", "Audience"],
      intoMode: ["Participation", "Community"],
      from: "Gathering people around what you have made",
      into: "Turn the audience into participants who can shape what happens next",
    },
    {
      fromMode: ["Recognition", "Authorship"],
      intoMode: ["Distribution", "Collective Ownership"],
      from: "Wanting the work to be recognised as yours",
      into: "Design the project so its value can spread beyond your ownership of it",
    },
  ],

  "Leo/6>Aquarius/12": [
    {
      fromMode: ["Mastery", "Performance"],
      intoMode: ["Detachment", "Observation"],
      from: "Improving your craft until the quality of the work proves your ability",
      into: "Step outside the need to prove yourself and observe the larger pattern at work",
    },
    {
      fromMode: ["Skill", "Control"],
      intoMode: ["Experiment", "Surrender"],
      from: "Relying on practiced ability to produce the result",
      into: "Leave room for the strange solution that does not come from what you already know how to do",
    },
    {
      fromMode: ["Work", "Recognition"],
      intoMode: ["Solitude", "Independence"],
      from: "Taking pride in being the person who can do the job well",
      into: "Do the unconventional work even when nobody understands its value yet",
    },
  ],

  "Leo/7>Aquarius/1": [
    {
      fromMode: ["Partnership", "Recognition"],
      intoMode: ["Individuality", "Independence"],
      from: "Knowing yourself through the strong person standing opposite you",
      into: "Define what makes you different before the relationship reflects it back",
    },
    {
      fromMode: ["Loyalty", "Encounter"],
      intoMode: ["Autonomy", "Experiment"],
      from: "Investing deeply in relationships that make both people feel significant",
      into: "Follow the unconventional direction even when the other person does not come with you",
    },
    {
      fromMode: ["Presence", "Reciprocity"],
      intoMode: ["Originality", "Detachment"],
      from: "Wanting to be fully seen and met by the person beside you",
      into: "Let yourself be unusual without requiring another person to validate or understand it",
    },
  ],

  "Leo/8>Aquarius/2": [
    {
      fromMode: ["Exposure", "Expression"],
      intoMode: ["Innovation", "Value"],
      from: "Bringing hidden or emotionally charged material into the open",
      into: "Turn what you discovered into a new source of practical value",
    },
    {
      fromMode: ["Intensity", "Ownership"],
      intoMode: ["Experiment", "Resources"],
      from: "Making the difficult experience personally meaningful by claiming it as yours",
      into: "Ask what unconventional use can now be made of what the experience gave you",
    },
    {
      fromMode: ["Revelation", "Transformation"],
      intoMode: ["Independence", "Invention"],
      from: "Finding power in revealing what others keep hidden",
      into: "Build something from that insight that can stand independently of the original drama",
    },
  ],

  "Leo/9>Aquarius/3": [
    {
      fromMode: ["Conviction", "Teaching"],
      intoMode: ["Questioning", "Disruption"],
      from: "Communicating the worldview with enough conviction that others can believe in it",
      into: "Ask the question that the worldview itself does not know how to answer",
    },
    {
      fromMode: ["Belief", "Expression"],
      intoMode: ["Experiment", "Inquiry"],
      from: "Giving large ideas a clear and compelling form",
      into: "Treat the idea as something to test rather than something to defend",
    },
    {
      fromMode: ["Vision", "Persuasion"],
      intoMode: ["Originality", "Debate"],
      from: "Using your voice to make the larger meaning visible",
      into: "Introduce the strange alternative that changes what the conversation can contain",
    },
  ],

  "Leo/10>Aquarius/4": [
    {
      fromMode: ["Leadership", "Visibility"],
      intoMode: ["Independence", "Foundation"],
      from: "Taking the visible position and becoming identified with the outcome",
      into: "Build a private foundation that does not depend on status or recognition",
    },
    {
      fromMode: ["Recognition", "Authority"],
      intoMode: ["Difference", "Belonging"],
      from: "Knowing your place through the role others recognise you for",
      into: "Create a place where you can belong without having to perform the recognised role",
    },
    {
      fromMode: ["Representation", "Pride"],
      intoMode: ["Experiment", "Roots"],
      from: "Carrying an identity publicly and taking pride in what it represents",
      into: "Allow your private life to become the laboratory for a different way of living",
    },
  ],

  "Leo/11>Aquarius/5": [
    {
      fromMode: ["Leadership", "Organization"],
      intoMode: ["Invention", "Creation"],
      from: "Gathering people around a project and giving the group momentum",
      into: "Step away from managing the group and make the strange thing only you would make",
    },
    {
      fromMode: ["Community", "Recognition"],
      intoMode: ["Experiment", "Expression"],
      from: "Becoming visible through the role you play in the collective",
      into: "Create without first asking whether the community will understand or approve",
    },
    {
      fromMode: ["Mobilization", "Cause"],
      intoMode: ["Play", "Originality"],
      from: "Using your creative energy to rally people around a shared purpose",
      into: "Use some of that energy to experiment simply because the possibility fascinates you",
    },
  ],

  "Leo/12>Aquarius/6": [
    {
      fromMode: ["Vision", "Imagination"],
      intoMode: ["Design", "Function"],
      from: "Seeing possibilities privately before they can be explained to anyone else",
      into: "Turn the unusual possibility into a system that works in ordinary life",
    },
    {
      fromMode: ["Solitude", "Creation"],
      intoMode: ["Experiment", "Practice"],
      from: "Protecting the vision until it feels fully your own",
      into: "Test it repeatedly against reality and let the failures redesign it",
    },
    {
      fromMode: ["Inspiration", "Identity"],
      intoMode: ["Problem Solving", "Usefulness"],
      from: "Treating the private vision as an expression of who you are",
      into: "Ask what problem the vision can solve and build it so somebody else can use it",
    },
  ],

  "Virgo/1>Pisces/7": [
    {
      fromMode: ["Competence", "Self-Correction"],
      intoMode: ["Empathy", "Partnership"],
      from: "Working on yourself until you feel ready to meet the situation",
      into: "Let another person meet you before everything about you has been fixed",
    },
    {
      fromMode: ["Discernment", "Standards"],
      intoMode: ["Acceptance", "Intimacy"],
      from: "Noticing quickly what could work better in yourself or others",
      into: "Stay close enough to understand what does not need to be corrected",
    },
    {
      fromMode: ["Independence", "Usefulness"],
      intoMode: ["Receptivity", "Connection"],
      from: "Building identity around being capable and useful",
      into: "Let the relationship give something to you that you could not produce alone",
    },
  ],

  "Virgo/2>Pisces/8": [
    {
      fromMode: ["Appraisal", "Discernment"],
      intoMode: ["Trust", "Surrender"],
      from: "Determining value by examining what something can reliably provide",
      into: "Enter the exchange whose value cannot be known completely in advance",
    },
    {
      fromMode: ["Measurement", "Ownership"],
      intoMode: ["Sharing", "Permeability"],
      from: "Keeping clear account of what is yours and what it is worth",
      into: "Allow resources, support, and vulnerability to move between you without reducing everything to an account",
    },
    {
      fromMode: ["Prudence", "Control"],
      intoMode: ["Uncertainty", "Transformation"],
      from: "Protecting value by identifying the risks before committing",
      into: "Accept the uncertainty that comes with being deeply affected by what you share",
    },
  ],

  "Virgo/3>Pisces/9": [
    {
      fromMode: ["Analysis", "Evidence"],
      intoMode: ["Intuition", "Meaning"],
      from: "Breaking the question into parts you can examine",
      into: "Ask what the whole is saying that none of the parts can explain alone",
    },
    {
      fromMode: ["Precision", "Definition"],
      intoMode: ["Symbol", "Imagination"],
      from: "Trying to name exactly what something means",
      into: "Let metaphor, image, and intuition carry meanings that literal language cannot",
    },
    {
      fromMode: ["Reasoning", "Verification"],
      intoMode: ["Faith", "Mystery"],
      from: "Trusting the conclusion after you can show how you reached it",
      into: "Leave room for truths that can be encountered before they can be demonstrated",
    },
  ],

  "Virgo/4>Pisces/10": [
    {
      fromMode: ["Repair", "Foundation"],
      intoMode: ["Calling", "Contribution"],
      from: "Working privately to repair what prevents the foundation from functioning",
      into: "Let what you have learned through that repair become something you contribute publicly",
    },
    {
      fromMode: ["Order", "Protection"],
      intoMode: ["Receptivity", "Visibility"],
      from: "Keeping the private world manageable by putting everything in its place",
      into: "Allow a larger calling to take you somewhere that cannot be completely organized beforehand",
    },
    {
      fromMode: ["Improvement", "Roots"],
      intoMode: ["Compassion", "Purpose"],
      from: "Trying to make the place you come from healthier and more functional",
      into: "Carry that sensitivity outward in work that serves something larger than your own foundation",
    },
  ],

  "Virgo/5>Pisces/11": [
    {
      fromMode: ["Craft", "Refinement"],
      intoMode: ["Compassion", "Community"],
      from: "Reworking the creation until it meets the standard you can see for it",
      into: "Let the work connect people even when the connection matters more than perfection",
    },
    {
      fromMode: ["Authorship", "Control"],
      intoMode: ["Participation", "Surrender"],
      from: "Knowing exactly what belongs in the work and what does not",
      into: "Allow other people and unexpected influences to change what the project becomes",
    },
    {
      fromMode: ["Technique", "Expression"],
      intoMode: ["Inspiration", "Collective Feeling"],
      from: "Using skill to give your idea the right form",
      into: "Create for the feeling that can pass through the work and become shared by many people",
    },
  ],

  "Virgo/6>Pisces/12": [
    {
      fromMode: ["Work", "Correction"],
      intoMode: ["Rest", "Surrender"],
      from: "Responding to discomfort by finding the thing that needs fixing",
      into: "Let some things remain unresolved long enough for a different answer to emerge",
    },
    {
      fromMode: ["Routine", "Control"],
      intoMode: ["Stillness", "Receptivity"],
      from: "Keeping life manageable through useful habits and repeated effort",
      into: "Create empty space where nothing needs to be improved or produced",
    },
    {
      fromMode: ["Discernment", "Service"],
      intoMode: ["Compassion", "Acceptance"],
      from: "Helping by identifying what would make the situation better",
      into: "Stay with what hurts even when there is no practical solution to offer",
    },
  ],

  "Virgo/7>Pisces/1": [
    {
      fromMode: ["Problem Solving", "Partnership"],
      intoMode: ["Identity", "Intuition"],
      from: "Finding your role by noticing what the relationship needs you to improve",
      into: "Follow what feels true for you before deciding whether it is useful to someone else",
    },
    {
      fromMode: ["Discernment", "Adjustment"],
      intoMode: ["Fluidity", "Self-Trust"],
      from: "Constantly adjusting yourself to make the relationship function better",
      into: "Allow yourself to change shape because something inside you is changing, not because the relationship requires it",
    },
    {
      fromMode: ["Usefulness", "Reciprocity"],
      intoMode: ["Imagination", "Presence"],
      from: "Knowing your value through what you contribute to another person",
      into: "Let your presence have value before it has a function",
    },
  ],

  "Virgo/8>Pisces/2": [
    {
      fromMode: ["Investigation", "Discernment"],
      intoMode: ["Generosity", "Value"],
      from: "Examining shared arrangements until you understand exactly where the risks lie",
      into: "Let your resources support what feels meaningful even when the return cannot be measured precisely",
    },
    {
      fromMode: ["Accounting", "Boundaries"],
      intoMode: ["Flow", "Trust"],
      from: "Keeping careful track of what belongs to whom",
      into: "Learn when value grows by circulating rather than remaining perfectly divided",
    },
    {
      fromMode: ["Diagnosis", "Control"],
      intoMode: ["Compassion", "Provision"],
      from: "Finding the weakness before deciding what can safely be committed",
      into: "Give because you recognize the need, not only because the arrangement can be made efficient",
    },
  ],

  "Virgo/9>Pisces/3": [
    {
      fromMode: ["Study", "Scholarship"],
      intoMode: ["Poetry", "Expression"],
      from: "Studying a subject until you can explain its structure accurately",
      into: "Say what the subject evokes in language that does not need to explain everything",
    },
    {
      fromMode: ["Knowledge", "Precision"],
      intoMode: ["Imagination", "Association"],
      from: "Separating ideas carefully so their differences remain clear",
      into: "Let distant ideas touch each other and see what new meaning appears between them",
    },
    {
      fromMode: ["Expertise", "Interpretation"],
      intoMode: ["Listening", "Intuition"],
      from: "Approaching the question through what you already know about it",
      into: "Listen for the unexpected meaning before fitting it into the framework you know",
    },
  ],

  "Virgo/10>Pisces/4": [
    {
      fromMode: ["Professionalism", "Competence"],
      intoMode: ["Refuge", "Belonging"],
      from: "Building public standing by being reliable and capable",
      into: "Build a private life where you do not have to earn your place through competence",
    },
    {
      fromMode: ["Standards", "Achievement"],
      intoMode: ["Acceptance", "Home"],
      from: "Measuring yourself against the quality of what you produce",
      into: "Create a foundation where worth is not conditional on performance",
    },
    {
      fromMode: ["Responsibility", "Precision"],
      intoMode: ["Care", "Surrender"],
      from: "Holding yourself responsible for getting the details right",
      into: "Let the private world contain mess, emotion, and uncertainty without immediately organizing it",
    },
  ],

  "Virgo/11>Pisces/5": [
    {
      fromMode: ["Planning", "Organization"],
      intoMode: ["Imagination", "Creation"],
      from: "Seeing what the group needs and organizing the pieces to make it work",
      into: "Make something because the image, feeling, or idea wants expression",
    },
    {
      fromMode: ["Usefulness", "Contribution"],
      intoMode: ["Play", "Inspiration"],
      from: "Choosing projects according to where your skills are most useful",
      into: "Follow the creative impulse even when it serves no obvious practical purpose",
    },
    {
      fromMode: ["Coordination", "Standards"],
      intoMode: ["Dreaming", "Authorship"],
      from: "Improving the collective project by identifying what could work better",
      into: "Protect enough unstructured space for a creation to emerge before anyone evaluates it",
    },
  ],

  "Virgo/12>Pisces/6": [
    {
      fromMode: ["Interpretation", "Pattern Finding"],
      intoMode: ["Compassion", "Service"],
      from: "Privately noticing the hidden patterns behind what people struggle with",
      into: "Bring that understanding into ordinary acts that make someone's burden lighter",
    },
    {
      fromMode: ["Reflection", "Analysis"],
      intoMode: ["Intuition", "Practice"],
      from: "Trying to understand the problem completely before acting",
      into: "Let compassion tell you the first useful thing to do and begin there",
    },
    {
      fromMode: ["Solitude", "Discernment"],
      intoMode: ["Healing", "Presence"],
      from: "Working through complexity privately until you can make sense of it",
      into: "Bring what you have learned back into contact with the people and situations that need it",
    },
  ],



  "Libra/1>Aries/7": [
    {
      fromMode: ["Adaptation", "Diplomacy"],
      intoMode: ["Selfhood", "Directness"],
      from: "Becoming whoever the room needs",
      into: "Meet people as yourself and let them adjust",
    },
    {
      fromMode: ["Presentation", "Harmony"],
      intoMode: ["Assertion", "Encounter"],
      from: "Managing how you come across",
      into: "Say what you want from the person in front of you",
    },
    {
      fromMode: ["Charm", "Accommodation"],
      intoMode: ["Boundaries", "Terms"],
      from: "Being easy to be around",
      into: "Let the relationship have terms rather than only peace",
    },
  ],

  "Libra/2>Aries/8": [
    {
      fromMode: ["Comparison", "Valuation"],
      intoMode: ["Claim", "Exposure"],
      from: "Pricing yourself against what others get",
      into: "Name what the work is worth before the negotiation starts",
    },
    {
      fromMode: ["Fairness", "Accommodation"],
      intoMode: ["Risk", "Entitlement"],
      from: "Splitting it evenly to keep the peace",
      into: "Ask for the share the risk you carry actually earns",
    },
    {
      fromMode: ["Comfort", "Agreement"],
      intoMode: ["Conflict", "Exposure"],
      from: "Keeping the arrangement comfortable",
      into: "Open the entangled question — money, power, who owes whom",
    },
  ],

  "Libra/3>Aries/9": [
    {
      fromMode: ["Comparison", "Perspective"],
      intoMode: ["Conviction", "Position"],
      from: "Gathering and weighing perspectives",
      into: "Form a position you are willing to stand behind",
    },
    {
      fromMode: ["Interpretation", "Synthesis"],
      intoMode: ["Authorship", "Thesis"],
      from: "Explaining what different viewpoints mean",
      into: "Turn what you have learned into a thesis of your own",
    },
    {
      fromMode: ["Dialogue", "Exchange"],
      intoMode: ["Declaration", "Principle"],
      from: "Working ideas out through conversation",
      into: "State the principle clearly enough to put it into the world",
    },
  ],

  "Libra/4>Aries/10": [
    {
      fromMode: ["Harmony", "Belonging"],
      intoMode: ["Direction", "Leadership"],
      from: "Keeping the household in balance",
      into: "Decide the direction and let the disagreement happen",
    },
    {
      fromMode: ["Belonging", "Loyalty"],
      intoMode: ["Standing", "Independence"],
      from: "Being the one who holds it all together",
      into: "Take a position in public that is yours, not the family's",
    },
    {
      fromMode: ["Privacy", "Protection"],
      intoMode: ["Visibility", "Accountability"],
      from: "Doing the work where it never has to be defended",
      into: "Put your name on it where it can be judged",
    },
  ],

  "Libra/5>Aries/11": [
    {
      fromMode: ["Charm", "Expression"],
      intoMode: ["Initiative", "Mobilization"],
      from: "Making things people will like",
      into: "Start the thing the group has been waiting for",
    },
    {
      fromMode: ["Audience", "Approval"],
      intoMode: ["Alliance", "Action"],
      from: "Playing to the room",
      into: "Find the people who want it built, and go",
    },
    {
      fromMode: ["Taste", "Selection"],
      intoMode: ["Cause", "Commitment"],
      from: "Knowing what is good",
      into: "Put the judgement behind a shared effort",
    },
  ],

  "Libra/6>Aries/12": [
    {
      fromMode: ["Accommodation", "Service"],
      intoMode: ["Solitude", "Autonomy"],
      from: "Fitting your day around everyone else's",
      into: "Take the hours back for work nobody is watching",
    },
    {
      fromMode: ["Usefulness", "Responsiveness"],
      intoMode: ["Instinct", "Trust"],
      from: "Being useful on request",
      into: "Act on what you sense before you can justify it",
    },
    {
      fromMode: ["Routine", "Maintenance"],
      intoMode: ["Retreat", "Incubation"],
      from: "Keeping the machine running smoothly",
      into: "Let something stay private long enough to become yours",
    },
  ],

  "Libra/7>Aries/1": [
    {
      fromMode: ["Partnership", "Reflection"],
      intoMode: ["Selfhood", "Decision"],
      from: "Working out who you are through the other person",
      into: "Decide what you want before you check",
    },
    {
      fromMode: ["Mediation", "Balance"],
      intoMode: ["Position", "Assertion"],
      from: "Holding the space between two people",
      into: "Take one of the two sides — your own",
    },
    {
      fromMode: ["Agreement", "Consensus"],
      intoMode: ["Initiative", "Agency"],
      from: "Waiting for the terms to be settled",
      into: "Move first and negotiate afterwards",
    },
  ],

  "Libra/8>Aries/2": [
    {
      fromMode: ["Entanglement", "Sharing"],
      intoMode: ["Ownership", "Independence"],
      from: "Holding everything jointly",
      into: "Build something that is yours alone",
    },
    {
      fromMode: ["Negotiation", "Exchange"],
      intoMode: ["Worth", "Claim"],
      from: "Trading your position for a share",
      into: "Set your own price and hold it",
    },
    {
      fromMode: ["Exposure", "Sensitivity"],
      intoMode: ["Ground", "Self-Reliance"],
      from: "Reading what everyone else is protecting",
      into: "Put it into what you can stand on by yourself",
    },
  ],

  "Libra/9>Aries/3": [
    {
      fromMode: ["Perspective", "Breadth"],
      intoMode: ["Argument", "Voice"],
      from: "Holding every worldview in view at once",
      into: "Argue one of them out loud and see if it survives",
    },
    {
      fromMode: ["Doctrine", "Interpretation"],
      intoMode: ["Question", "Challenge"],
      from: "Explaining what the tradition says",
      into: "Ask the question that actually tests it",
    },
    {
      fromMode: ["Breadth", "Caution"],
      intoMode: ["Voice", "Experiment"],
      from: "Reading widely before speaking",
      into: "Say the unfinished thought while it is still yours",
    },
  ],

  "Libra/10>Aries/4": [
    {
      fromMode: ["Reputation", "Presentation"],
      intoMode: ["Ground", "Belonging"],
      from: "Being known as the reasonable one",
      into: "Build the base you actually want to live on",
    },
    {
      fromMode: ["Standing", "Recognition"],
      intoMode: ["Belonging", "Choice"],
      from: "Managing how the work looks",
      into: "Choose where you are from rather than inherit it",
    },
    {
      fromMode: ["Duty", "Expectation"],
      intoMode: ["Autonomy", "Need"],
      from: "Meeting what the role asks",
      into: "Say what your private life needs, first",
    },
  ],

  "Libra/11>Aries/5": [
    {
      fromMode: ["Consensus", "Coordination"],
      intoMode: ["Authorship", "Expression"],
      from: "Waiting for the group to agree",
      into: "Make the thing and show it",
    },
    {
      fromMode: ["Network", "Connection"],
      intoMode: ["Desire", "Creation"],
      from: "Keeping everyone connected",
      into: "Follow what you actually want to make",
    },
    {
      fromMode: ["Cause", "Contribution"],
      intoMode: ["Play", "Pleasure"],
      from: "Serving the shared project",
      into: "Spend some of it on what only pleases you",
    },
  ],

  "Libra/12>Aries/6": [
    {
      fromMode: ["Withdrawal", "Avoidance"],
      intoMode: ["Action", "Intervention"],
      from: "Retreating when the friction starts",
      into: "Do the one concrete thing the situation needs",
    },
    {
      fromMode: ["Absorption", "Sensitivity"],
      intoMode: ["Practice", "Routine"],
      from: "Carrying what you pick up from everyone",
      into: "Turn it into something you do every day",
    },
    {
      fromMode: ["Deferral", "Surrender"],
      intoMode: ["Agency", "Repair"],
      from: "Waiting for it to resolve itself",
      into: "Intervene while it is still small",
    },
  ],

  "Scorpio/1>Taurus/7": [
    {
      fromMode: ["Intensity", "Self-Protection"],
      intoMode: ["Partnership", "Stability"],
      from: "Reading people deeply before deciding whether they are safe",
      into: "Build trust through consistency rather than constant testing",
    },
    {
      fromMode: ["Transformation", "Survival"],
      intoMode: ["Loyalty", "Continuity"],
      from: "Knowing yourself through what you have survived and changed",
      into: "Let a relationship become valuable because it lasts, not because it transforms you",
    },
    {
      fromMode: ["Boundaries", "Control"],
      intoMode: ["Trust", "Steadiness"],
      from: "Protecting yourself by controlling how close another person can get",
      into: "Let reliability make some of that vigilance unnecessary",
    },
  ],

  "Scorpio/2>Taurus/8": [
    {
      fromMode: ["Investigation", "Investment"],
      intoMode: ["Stewardship", "Preservation"],
      from: "Looking beneath apparent value for the opportunity others have missed",
      into: "Protect and grow what has already proven worth holding",
    },
    {
      fromMode: ["Concentration", "Risk"],
      intoMode: ["Sharing", "Stability"],
      from: "Concentrating resources where you believe transformation can create outsized value",
      into: "Build shared arrangements that can remain valuable without another dramatic change",
    },
    {
      fromMode: ["Conviction", "Allocation"],
      intoMode: ["Trust", "Custody"],
      from: "Committing resources aggressively once you see hidden potential",
      into: "Become someone others can safely entrust value to over time",
    },
  ],

  "Scorpio/3>Taurus/9": [
    {
      fromMode: ["Questioning", "Investigation"],
      intoMode: ["Belief", "Stability"],
      from: "Following every contradiction until the presented account breaks open",
      into: "Decide which truths are sturdy enough to build a life around",
    },
    {
      fromMode: ["Evidence", "Suspicion"],
      intoMode: ["Wisdom", "Trust"],
      from: "Looking for the missing fact that changes the whole explanation",
      into: "Let what has repeatedly proven true become something you can trust",
    },
    {
      fromMode: ["Complexity", "Exposure"],
      intoMode: ["Simplicity", "Principle"],
      from: "Digging beneath the obvious answer for what is really happening",
      into: "Reduce what you discovered to a principle that remains useful in ordinary life",
    },
  ],

  "Scorpio/4>Taurus/10": [
    {
      fromMode: ["Excavation", "Truth"],
      intoMode: ["Building", "Durability"],
      from: "Investigating the buried patterns beneath your private foundation",
      into: "Build something public from what the excavation taught you",
    },
    {
      fromMode: ["Inheritance", "Transformation"],
      intoMode: ["Ownership", "Achievement"],
      from: "Working through what was inherited so it does not keep controlling the present",
      into: "Create something substantial that belongs to the life you are building now",
    },
    {
      fromMode: ["Exposure", "Healing"],
      intoMode: ["Stability", "Legacy"],
      from: "Opening what the family or private world preferred to leave buried",
      into: "Turn the recovered ground into something durable enough to outlast the original wound",
    },
  ],

  "Scorpio/5>Taurus/11": [
    {
      fromMode: ["Alchemy", "Creation"],
      intoMode: ["Contribution", "Sustaining"],
      from: "Turning intense personal experience into something creative",
      into: "Give the creation a stable place inside a community that can keep it alive",
    },
    {
      fromMode: ["Risk", "Expression"],
      intoMode: ["Support", "Continuity"],
      from: "Making work that exposes something difficult or personally consequential",
      into: "Build the relationships and resources that let the work continue after the intensity passes",
    },
    {
      fromMode: ["Desire", "Transformation"],
      intoMode: ["Membership", "Value"],
      from: "Following the creative desire that changes you through making it",
      into: "Ask what lasting value the creation can contribute to other people",
    },
  ],

  "Scorpio/6>Taurus/12": [
    {
      fromMode: ["Diagnosis", "Repair"],
      intoMode: ["Acceptance", "Rest"],
      from: "Searching for the hidden cause whenever something is wrong",
      into: "Recognize when nothing more needs to be investigated or repaired",
    },
    {
      fromMode: ["Investigation", "Intervention"],
      intoMode: ["Patience", "Grounding"],
      from: "Intervening at the source once you identify the underlying problem",
      into: "Let stability itself do some of the healing",
    },
    {
      fromMode: ["Healing", "Intensity"],
      intoMode: ["Sanctuary", "Peace"],
      from: "Working directly with what is painful, broken, or difficult to face",
      into: "Create a place where the system can simply settle and recover",
    },
  ],

  "Scorpio/7>Taurus/1": [
    {
      fromMode: ["Intimacy", "Vulnerability"],
      intoMode: ["Presence", "Self-Possession"],
      from: "Discovering yourself through relationships that expose what lies underneath",
      into: "Know who you are without needing another person to draw it out of you",
    },
    {
      fromMode: ["Trust", "Depth"],
      intoMode: ["Grounding", "Independence"],
      from: "Going deeply into another person's inner world",
      into: "Return to your own body, pace, and ground",
    },
    {
      fromMode: ["Transformation", "Partnership"],
      intoMode: ["Continuity", "Identity"],
      from: "Allowing intimate relationships to change who you are",
      into: "Develop an identity sturdy enough to remain yours through change",
    },
  ],

  "Scorpio/8>Taurus/2": [
    {
      fromMode: ["Shared Power", "Entanglement"],
      intoMode: ["Ownership", "Security"],
      from: "Working inside arrangements where resources and power are deeply intertwined",
      into: "Build resources that are clearly yours and can support you independently",
    },
    {
      fromMode: ["Risk", "Transformation"],
      intoMode: ["Accumulation", "Preservation"],
      from: "Using shared resources where a major change could create major value",
      into: "Keep enough of the value you create for it to compound steadily",
    },
    {
      fromMode: ["Leverage", "Intensity"],
      intoMode: ["Capacity", "Self-Reliance"],
      from: "Increasing what is possible through other people's resources and commitments",
      into: "Turn the gains into durable capacity you can stand on yourself",
    },
  ],

  "Scorpio/9>Taurus/3": [
    {
      fromMode: ["Challenge", "Belief"],
      intoMode: ["Practicality", "Communication"],
      from: "Following the truth even when it overturns the accepted worldview",
      into: "Explain what you discovered in terms another person can actually use",
    },
    {
      fromMode: ["Heretic", "Inquiry"],
      intoMode: ["Simplicity", "Grounding"],
      from: "Questioning the assumption everyone else treats as settled",
      into: "Reduce the insight to the simplest claim that still holds",
    },
    {
      fromMode: ["Depth", "Conviction"],
      intoMode: ["Experience", "Verification"],
      from: "Committing to the deeper explanation once you believe you have found it",
      into: "Test the idea repeatedly against ordinary experience",
    },
  ],

  "Scorpio/10>Taurus/4": [
    {
      fromMode: ["Power", "Strategy"],
      intoMode: ["Foundation", "Security"],
      from: "Reading the hidden forces that determine public outcomes",
      into: "Use what you know to build a private foundation that does not depend on those forces",
    },
    {
      fromMode: ["Influence", "Leverage"],
      intoMode: ["Home", "Ownership"],
      from: "Working through relationships and pressure points that can move the outcome",
      into: "Build something tangible that belongs to you and gives you somewhere stable to stand",
    },
    {
      fromMode: ["Exposure", "Control"],
      intoMode: ["Peace", "Continuity"],
      from: "Staying alert to what people are really protecting or pursuing",
      into: "Create a private life where not everything has to be strategic",
    },
  ],

  "Scorpio/11>Taurus/5": [
    {
      fromMode: ["Strategy", "Influence"],
      intoMode: ["Creation", "Craft"],
      from: "Reading the network to understand where influence actually moves",
      into: "Put that intelligence into making something tangible with your own hands and taste",
    },
    {
      fromMode: ["Alliance", "Leverage"],
      intoMode: ["Expression", "Ownership"],
      from: "Working through alliances to increase what the group can accomplish",
      into: "Create something whose value does not depend on the network around it",
    },
    {
      fromMode: ["Collective Power", "Transformation"],
      intoMode: ["Pleasure", "Durability"],
      from: "Putting energy into projects capable of changing the larger arrangement",
      into: "Make something you enjoy enough to keep developing slowly over time",
    },
  ],

  "Scorpio/12>Taurus/6": [
    {
      fromMode: ["Depth", "Investigation"],
      intoMode: ["Work", "Craft"],
      from: "Following hidden material until you understand what lies beneath the surface",
      into: "Turn what you discovered into a practical skill you can use repeatedly",
    },
    {
      fromMode: ["Surrender", "Transformation"],
      intoMode: ["Routine", "Stability"],
      from: "Allowing difficult inner material to change you in ways you cannot completely control",
      into: "Give the change a stable form through what you do every day",
    },
    {
      fromMode: ["Solitude", "Intensity"],
      intoMode: ["Embodiment", "Maintenance"],
      from: "Going inward when something demands deep processing",
      into: "Come back to the body, the work, and the ordinary things that keep life functioning",
    },
  ],

  "Sagittarius/1>Gemini/7": [
    {
      fromMode: ["Conviction", "Direction"],
      intoMode: ["Dialogue", "Curiosity"],
      from: "Knowing where you are going and moving toward it",
      into: "Let another person's questions change what you think the destination might be",
    },
    {
      fromMode: ["Independence", "Exploration"],
      intoMode: ["Partnership", "Exchange"],
      from: "Following the path that expands your own world",
      into: "Build a relationship through ongoing exchange rather than requiring a shared destination",
    },
    {
      fromMode: ["Honesty", "Certainty"],
      intoMode: ["Listening", "Flexibility"],
      from: "Saying what you believe as plainly as possible",
      into: "Stay curious about what the other person means before deciding where you disagree",
    },
  ],

  "Sagittarius/2>Gemini/8": [
    {
      fromMode: ["Conviction", "Investment"],
      intoMode: ["Questioning", "Investigation"],
      from: "Putting resources behind what you believe has room to grow",
      into: "Investigate the arrangement before assuming the larger thesis is enough",
    },
    {
      fromMode: ["Risk", "Expansion"],
      intoMode: ["Information", "Negotiation"],
      from: "Accepting uncertainty because the opportunity looks large",
      into: "Learn the details that determine who carries the risk and who receives the reward",
    },
    {
      fromMode: ["Value", "Belief"],
      intoMode: ["Complexity", "Exchange"],
      from: "Backing what fits your larger view of where value is going",
      into: "Understand the moving parts inside the deal and let new information change the terms",
    },
  ],

  "Sagittarius/3>Gemini/9": [
    {
      fromMode: ["Message", "Conviction"],
      intoMode: ["Comparison", "Translation"],
      from: "Communicating the principle you believe matters",
      into: "Compare how the same idea looks from another culture, framework, or worldview",
    },
    {
      fromMode: ["Teaching", "Direction"],
      intoMode: ["Learning", "Interpretation"],
      from: "Using communication to point people toward the larger meaning",
      into: "Become the student again and learn how other people organize the question",
    },
    {
      fromMode: ["Voice", "Belief"],
      intoMode: ["Curiosity", "Breadth"],
      from: "Speaking from a position you have already formed",
      into: "Collect perspectives without requiring them to resolve into one answer yet",
    },
  ],

  "Sagittarius/4>Gemini/10": [
    {
      fromMode: ["Belief", "Foundation"],
      intoMode: ["Communication", "Representation"],
      from: "Building your private life around principles that give it meaning",
      into: "Learn how to communicate those ideas to people who do not already share them",
    },
    {
      fromMode: ["Roots", "Worldview"],
      intoMode: ["Adaptability", "Public Voice"],
      from: "Knowing where you belong through the larger story you live inside",
      into: "Develop a public voice flexible enough to speak across different worlds",
    },
    {
      fromMode: ["Conviction", "Belonging"],
      intoMode: ["Information", "Relevance"],
      from: "Trusting the worldview that makes your private life coherent",
      into: "Pay attention to what is actually happening now and communicate what people need to know",
    },
  ],

  "Sagittarius/5>Gemini/11": [
    {
      fromMode: ["Creation", "Belief"],
      intoMode: ["Connection", "Network"],
      from: "Creating something that expresses what you believe",
      into: "Connect the work to people and ideas that can take it somewhere you did not plan",
    },
    {
      fromMode: ["Adventure", "Expression"],
      intoMode: ["Curiosity", "Collaboration"],
      from: "Following the creative possibility that feels most exciting",
      into: "Let other people's ideas open possibilities you would not have found alone",
    },
    {
      fromMode: ["Authorship", "Vision"],
      intoMode: ["Exchange", "Circulation"],
      from: "Giving the work a strong direction of your own",
      into: "Put it into circulation and let the network change what it becomes",
    },
  ],

  "Sagittarius/6>Gemini/12": [
    {
      fromMode: ["Teaching", "Practice"],
      intoMode: ["Listening", "Observation"],
      from: "Turning what you believe into something you practice and teach",
      into: "Listen for the fragments that do not fit what you already know",
    },
    {
      fromMode: ["Purpose", "Service"],
      intoMode: ["Curiosity", "Reflection"],
      from: "Organizing daily work around a larger sense of purpose",
      into: "Leave some space without a purpose and notice where the mind wanders",
    },
    {
      fromMode: ["Principle", "Routine"],
      intoMode: ["Possibility", "Openness"],
      from: "Building habits around the principles you have chosen",
      into: "Let an unfinished question remain open without immediately turning it into a rule",
    },
  ],

  "Sagittarius/7>Gemini/1": [
    {
      fromMode: ["Partnership", "Exploration"],
      intoMode: ["Curiosity", "Identity"],
      from: "Expanding your world through the person travelling beside you",
      into: "Follow your own curiosity even when nobody else finds the question interesting",
    },
    {
      fromMode: ["Honesty", "Commitment"],
      intoMode: ["Flexibility", "Self-Expression"],
      from: "Building relationships around a shared sense of truth and direction",
      into: "Let yourself change your mind without treating it as a betrayal of who you are",
    },
    {
      fromMode: ["Companionship", "Direction"],
      intoMode: ["Experiment", "Mobility"],
      from: "Going further because someone shares the journey",
      into: "Try the nearby possibility simply to discover what it teaches you",
    },
  ],

  "Sagittarius/8>Gemini/2": [
    {
      fromMode: ["Truth", "Risk"],
      intoMode: ["Information", "Value"],
      from: "Going deeply into the arrangement because you believe the underlying truth matters",
      into: "Gather the practical information that tells you what something is actually worth",
    },
    {
      fromMode: ["Conviction", "Entanglement"],
      intoMode: ["Options", "Exchange"],
      from: "Committing deeply once the larger meaning of the situation becomes clear",
      into: "Keep enough flexibility to trade, adjust, or change the arrangement as new facts appear",
    },
    {
      fromMode: ["Exposure", "Meaning"],
      intoMode: ["Opportunity", "Resourcefulness"],
      from: "Entering difficult territory in search of what it ultimately reveals",
      into: "Notice the useful opportunity hidden in the details rather than waiting for one grand revelation",
    },
  ],

  "Sagittarius/9>Gemini/3": [
    {
      fromMode: ["Philosophy", "Synthesis"],
      intoMode: ["Questioning", "Information"],
      from: "Organizing experience into a worldview that explains the larger pattern",
      into: "Break the worldview back into questions and see which claims still hold",
    },
    {
      fromMode: ["Wisdom", "Conviction"],
      intoMode: ["Curiosity", "Dialogue"],
      from: "Speaking from principles you have come to trust",
      into: "Ask what the person in front of you knows that your framework does not",
    },
    {
      fromMode: ["Meaning", "Direction"],
      intoMode: ["Detail", "Experiment"],
      from: "Using the larger meaning to decide where the story is going",
      into: "Test the idea against the small fact that could prove it wrong",
    },
  ],

  "Sagittarius/10>Gemini/4": [
    {
      fromMode: ["Leadership", "Vision"],
      intoMode: ["Story", "Listening"],
      from: "Giving people a larger direction to move toward",
      into: "Listen to the smaller stories that reveal what the vision looks like from inside people's lives",
    },
    {
      fromMode: ["Standing", "Conviction"],
      intoMode: ["Memory", "Interpretation"],
      from: "Being publicly identified with the principle you represent",
      into: "Return to the stories and experiences that formed the principle before it became a position",
    },
    {
      fromMode: ["Purpose", "Example"],
      intoMode: ["Belonging", "Conversation"],
      from: "Trying to embody the larger idea where others can see it",
      into: "Build belonging through ordinary conversation rather than always needing to provide direction",
    },
  ],

  "Sagittarius/11>Gemini/5": [
    {
      fromMode: ["Advocacy", "Cause"],
      intoMode: ["Experiment", "Creation"],
      from: "Using your voice to spread an idea you believe deserves a wider audience",
      into: "Play with the idea before deciding what message it needs to carry",
    },
    {
      fromMode: ["Movement", "Belief"],
      intoMode: ["Improvisation", "Expression"],
      from: "Gathering people around a shared conviction",
      into: "Make something light enough to change while you are making it",
    },
    {
      fromMode: ["Community", "Direction"],
      intoMode: ["Curiosity", "Authorship"],
      from: "Creating with the larger mission in mind",
      into: "Follow the strange personal idea even when it has nothing to contribute to the mission yet",
    },
  ],

  "Sagittarius/12>Gemini/6": [
    {
      fromMode: ["Faith", "Intuition"],
      intoMode: ["Information", "Coordination"],
      from: "Trusting the larger direction even when you cannot explain how you know",
      into: "Gather the concrete information needed to make the next step actually work",
    },
    {
      fromMode: ["Retreat", "Meaning"],
      intoMode: ["Practice", "Adjustment"],
      from: "Stepping away from ordinary demands to recover a sense of direction",
      into: "Bring the insight back into the day and adjust it through repeated use",
    },
    {
      fromMode: ["Surrender", "Possibility"],
      intoMode: ["Problem Solving", "Communication"],
      from: "Allowing the answer to emerge without forcing it",
      into: "Name the specific problem, ask the practical question, and work with the answer you get",
    },
  ],

  "Capricorn/1>Cancer/7": [
    {
      fromMode: ["Self-Authority", "Direction"],
      intoMode: ["Bonding", "Partnership"],
      from: "Deciding what your life requires and organizing yourself around it",
      into: "Let another person's emotional reality become part of how the direction is decided",
    },
    {
      fromMode: ["Independence", "Responsibility"],
      intoMode: ["Care", "Reciprocity"],
      from: "Carrying your own weight without expecting someone else to do it",
      into: "Let care move both ways instead of making self-sufficiency the condition of partnership",
    },
    {
      fromMode: ["Boundaries", "Control"],
      intoMode: ["Trust", "Vulnerability"],
      from: "Protecting yourself by defining clearly what belongs to you",
      into: "Let someone matter enough that their needs can sometimes cross the boundary",
    },
  ],

  "Capricorn/2>Cancer/8": [
    {
      fromMode: ["Ownership", "Management"],
      intoMode: ["Sharing", "Trust"],
      from: "Building resources you can manage and depend on yourself",
      into: "Let resources become part of a bond where not everything can remain separately controlled",
    },
    {
      fromMode: ["Accumulation", "Discipline"],
      intoMode: ["Provision", "Care"],
      from: "Growing capacity by controlling what is spent and preserving what is earned",
      into: "Use some of that capacity to protect someone through a period of genuine need",
    },
    {
      fromMode: ["Value", "Boundaries"],
      intoMode: ["Intimacy", "Support"],
      from: "Knowing what you can afford and where your responsibility ends",
      into: "Recognize when closeness asks you to carry something together rather than calculate it separately",
    },
  ],

  "Capricorn/3>Cancer/9": [
    {
      fromMode: ["Analysis", "Structure"],
      intoMode: ["Meaning", "Belonging"],
      from: "Breaking an idea into claims that can be examined and organized",
      into: "Ask what larger story makes those ideas meaningful to the people who live by them",
    },
    {
      fromMode: ["Definition", "Judgment"],
      intoMode: ["Tradition", "Memory"],
      from: "Deciding precisely what holds up and what does not",
      into: "Understand what the belief has carried across generations before deciding what should be discarded",
    },
    {
      fromMode: ["Planning", "Reasoning"],
      intoMode: ["Faith", "Continuity"],
      from: "Trusting the conclusion you can defend through a clear chain of reasoning",
      into: "Let lived experience and inherited wisdom contribute to what you are willing to trust",
    },
  ],

  "Capricorn/4>Cancer/10": [
    {
      fromMode: ["Foundation", "Responsibility"],
      intoMode: ["Care", "Leadership"],
      from: "Building a private structure capable of carrying its own weight",
      into: "Use your public position to protect and provide for the people who depend on the outcome",
    },
    {
      fromMode: ["Boundaries", "Home"],
      intoMode: ["Responsiveness", "Duty"],
      from: "Protecting the private life required to keep yourself functional",
      into: "Become responsive to the human consequences of the responsibility you hold publicly",
    },
    {
      fromMode: ["Structure", "Continuity"],
      intoMode: ["Protection", "Legacy"],
      from: "Creating a foundation designed to remain stable over time",
      into: "Make what you build remembered for the people it sheltered, not only for how long it lasted",
    },
  ],

  "Capricorn/5>Cancer/11": [
    {
      fromMode: ["Discipline", "Creation"],
      intoMode: ["Community", "Cultivation"],
      from: "Taking personal responsibility for bringing the creation to completion",
      into: "Create a community that can care for what you built and help it continue growing",
    },
    {
      fromMode: ["Production", "Authorship"],
      intoMode: ["Hosting", "Participation"],
      from: "Making the thing and taking responsibility for its standard",
      into: "Make room for other people to enter, contribute, and feel that some part of it belongs to them",
    },
    {
      fromMode: ["Standards", "Mastery"],
      intoMode: ["Belonging", "Support"],
      from: "Judging the work by whether it reaches the standard you set",
      into: "Also judge the larger project by whether the people inside it are supported enough to stay",
    },
  ],

  "Capricorn/6>Cancer/12": [
    {
      fromMode: ["Discipline", "Duty"],
      intoMode: ["Compassion", "Rest"],
      from: "Doing what needs to be done regardless of how you feel about it",
      into: "Recognize when exhaustion or pain needs care rather than another demand",
    },
    {
      fromMode: ["Management", "Control"],
      intoMode: ["Sensitivity", "Surrender"],
      from: "Keeping life functional by maintaining control over the moving parts",
      into: "Let yourself feel what the system has been asking you to suppress",
    },
    {
      fromMode: ["Endurance", "Work"],
      intoMode: ["Retreat", "Nurturing"],
      from: "Continuing because the responsibility still exists",
      into: "Withdraw long enough to restore the person who has been carrying it",
    },
  ],

  "Capricorn/7>Cancer/1": [
    {
      fromMode: ["Commitment", "Responsibility"],
      intoMode: ["Sensitivity", "Identity"],
      from: "Defining relationships through what each person has agreed to carry",
      into: "Notice what you personally feel and need before reducing it to an obligation",
    },
    {
      fromMode: ["Boundaries", "Accountability"],
      intoMode: ["Instinct", "Self-Protection"],
      from: "Keeping relationships workable through clear expectations",
      into: "Trust the immediate feeling that tells you when something is safe, nourishing, or wrong for you",
    },
    {
      fromMode: ["Structure", "Partnership"],
      intoMode: ["Care", "Selfhood"],
      from: "Building identity around being the dependable person in the relationship",
      into: "Become someone who can need, receive, and care for yourself as readily as you care for the commitment",
    },
  ],

  "Capricorn/8>Cancer/2": [
    {
      fromMode: ["Management", "Stewardship"],
      intoMode: ["Provision", "Security"],
      from: "Managing shared resources according to obligations and long-term consequences",
      into: "Use what you have to create immediate material safety for yourself and the people you care for",
    },
    {
      fromMode: ["Boundaries", "Obligation"],
      intoMode: ["Giving", "Care"],
      from: "Defining precisely what each person owes inside the arrangement",
      into: "Let generosity sometimes respond to need before it responds to the ledger",
    },
    {
      fromMode: ["Control", "Responsibility"],
      intoMode: ["Possession", "Protection"],
      from: "Taking responsibility for resources whose ownership is distributed between people",
      into: "Build a secure base of your own that you can protect and provide from",
    },
  ],

  "Capricorn/9>Cancer/3": [
    {
      fromMode: ["Principle", "Judgment"],
      intoMode: ["Listening", "Understanding"],
      from: "Applying the principle that should govern when different interests conflict",
      into: "Listen to the person's actual experience before deciding which principle fits",
    },
    {
      fromMode: ["Framework", "Law"],
      intoMode: ["Memory", "Context"],
      from: "Organizing experience through standards meant to apply beyond one case",
      into: "Notice the circumstances and history that make this particular case different",
    },
    {
      fromMode: ["Authority", "Position"],
      intoMode: ["Empathy", "Interpretation"],
      from: "Taking a position because someone eventually has to decide",
      into: "Understand how the decision will be experienced by the people living inside it",
    },
  ],

  "Capricorn/10>Cancer/4": [
    {
      fromMode: ["Leadership", "Standing"],
      intoMode: ["Home", "Belonging"],
      from: "Carrying responsibility where the outcome can be publicly judged",
      into: "Build a private place where you are valued without having to lead or achieve",
    },
    {
      fromMode: ["Authority", "Direction"],
      intoMode: ["Protection", "Care"],
      from: "Deciding where things need to go and accepting responsibility for the decision",
      into: "Use your strength to protect what is vulnerable rather than always directing what happens next",
    },
    {
      fromMode: ["Achievement", "Legacy"],
      intoMode: ["Roots", "Continuity"],
      from: "Building something substantial enough to survive your individual effort",
      into: "Invest equally in the people, memories, and bonds that make success feel like it belongs somewhere",
    },
  ],

  "Capricorn/11>Cancer/5": [
    {
      fromMode: ["Organization", "Institution"],
      intoMode: ["Creation", "Nurturing"],
      from: "Building structures that let many people carry the work",
      into: "Choose something personally meaningful and give it the close attention required to grow",
    },
    {
      fromMode: ["Strategy", "Objectivity"],
      intoMode: ["Attachment", "Expression"],
      from: "Making decisions according to what the larger project requires",
      into: "Let yourself care enough about one creation that objectivity is no longer the only criterion",
    },
    {
      fromMode: ["Scale", "Durability"],
      intoMode: ["Play", "Cultivation"],
      from: "Designing work to function beyond any one person's involvement",
      into: "Spend time nurturing something small simply because you love watching it develop",
    },
  ],

  "Capricorn/12>Cancer/6": [
    {
      fromMode: ["Duty", "Solitude"],
      intoMode: ["Care", "Maintenance"],
      from: "Carrying necessary responsibilities without expecting anyone to notice",
      into: "Bring that responsibility into daily acts that directly care for a person, body, or place",
    },
    {
      fromMode: ["Discipline", "Restraint"],
      intoMode: ["Responsiveness", "Service"],
      from: "Containing your own needs so the responsibility can continue",
      into: "Notice the small need in front of you and let yourself respond to it",
    },
    {
      fromMode: ["Endurance", "Stewardship"],
      intoMode: ["Tending", "Routine"],
      from: "Holding responsibility through long periods without immediate reward",
      into: "Turn endurance into the ordinary routines that keep life nourished and functioning",
    },
  ],

  "Aquarius/1>Leo/7": [
    {
      fromMode: ["Independence", "Originality"],
      intoMode: ["Presence", "Partnership"],
      from: "Defining yourself by what makes you different from the people around you",
      into: "Bring your full personality into a relationship and let yourself matter personally to someone",
    },
    {
      fromMode: ["Detachment", "Autonomy"],
      intoMode: ["Warmth", "Loyalty"],
      from: "Protecting your freedom by keeping enough distance to remain yourself",
      into: "Stay close enough for attachment, affection, and loyalty to become real",
    },
    {
      fromMode: ["Difference", "Observation"],
      intoMode: ["Recognition", "Encounter"],
      from: "Watching how people relate without needing to occupy the center of the exchange",
      into: "Let another person see you clearly and respond to who you actually are",
    },
  ],

  "Aquarius/2>Leo/8": [
    {
      fromMode: ["Innovation", "Value"],
      intoMode: ["Commitment", "Investment"],
      from: "Finding unconventional ways to create or use resources",
      into: "Put meaningful resources behind something you care enough about to risk losing",
    },
    {
      fromMode: ["Independence", "Resources"],
      intoMode: ["Sharing", "Loyalty"],
      from: "Keeping your material position flexible enough to preserve independence",
      into: "Commit resources to a bond or project whose value is personal, not merely rational",
    },
    {
      fromMode: ["Experiment", "Opportunity"],
      intoMode: ["Conviction", "Exposure"],
      from: "Testing possibilities without needing any one of them to define you",
      into: "Choose the one that matters enough to become personally identified with the outcome",
    },
  ],

  "Aquarius/3>Leo/9": [
    {
      fromMode: ["Questioning", "Disruption"],
      intoMode: ["Conviction", "Teaching"],
      from: "Finding the question that exposes what the accepted framework cannot explain",
      into: "Develop an answer strong enough that you are willing to teach it",
    },
    {
      fromMode: ["Experiment", "Inquiry"],
      intoMode: ["Belief", "Expression"],
      from: "Treating ideas as possibilities to test rather than positions to defend",
      into: "Decide what you believe and give the belief a compelling voice",
    },
    {
      fromMode: ["Originality", "Debate"],
      intoMode: ["Vision", "Persuasion"],
      from: "Introducing the strange alternative that changes the conversation",
      into: "Show people why the alternative matters and where it could lead",
    },
  ],

  "Aquarius/4>Leo/10": [
    {
      fromMode: ["Independence", "Foundation"],
      intoMode: ["Leadership", "Visibility"],
      from: "Building a private life that gives you freedom from other people's expectations",
      into: "Step into the visible role and let yourself become identified with the outcome",
    },
    {
      fromMode: ["Difference", "Belonging"],
      intoMode: ["Authority", "Recognition"],
      from: "Creating a place where you can belong without needing to fit the conventional role",
      into: "Take the public role and reshape it through the person you actually are",
    },
    {
      fromMode: ["Experiment", "Roots"],
      intoMode: ["Representation", "Pride"],
      from: "Using private life as a laboratory for a different way of living",
      into: "Stand publicly for what you have discovered and put your name behind it",
    },
  ],

  "Aquarius/5>Leo/11": [
    {
      fromMode: ["Invention", "Creation"],
      intoMode: ["Leadership", "Community"],
      from: "Making the strange thing because the possibility itself fascinates you",
      into: "Gather people around the creation and become willing to lead what forms around it",
    },
    {
      fromMode: ["Experiment", "Expression"],
      intoMode: ["Recognition", "Participation"],
      from: "Creating without first asking whether anyone will understand it",
      into: "Let yourself become visible enough for people to know who brought them together",
    },
    {
      fromMode: ["Originality", "Play"],
      intoMode: ["Cause", "Mobilization"],
      from: "Following unconventional ideas simply because they are interesting to explore",
      into: "Choose the one you care about enough to rally other people around",
    },
  ],

  "Aquarius/6>Leo/12": [
    {
      fromMode: ["Design", "Function"],
      intoMode: ["Vision", "Imagination"],
      from: "Turning unusual ideas into systems that solve practical problems",
      into: "Step away from usefulness long enough to discover what wants to be created",
    },
    {
      fromMode: ["Experiment", "Practice"],
      intoMode: ["Solitude", "Creation"],
      from: "Testing the work repeatedly and letting reality redesign it",
      into: "Protect the private creative space where the work does not yet have to function",
    },
    {
      fromMode: ["Problem Solving", "Usefulness"],
      intoMode: ["Inspiration", "Identity"],
      from: "Judging an idea by whether someone can actually use it",
      into: "Make something because it expresses a part of you that needs a form",
    },
  ],

  "Aquarius/7>Leo/1": [
    {
      fromMode: ["Equality", "Partnership"],
      intoMode: ["Presence", "Individuality"],
      from: "Relating through equality without needing either person to occupy the center",
      into: "Let yourself become the unmistakable protagonist of your own life",
    },
    {
      fromMode: ["Difference", "Cooperation"],
      intoMode: ["Confidence", "Self-Expression"],
      from: "Making room for everyone to remain distinct inside the relationship",
      into: "Show what makes you distinctive without waiting for another person to draw it out",
    },
    {
      fromMode: ["Detachment", "Exchange"],
      intoMode: ["Identity", "Recognition"],
      from: "Keeping enough distance to see the relationship objectively",
      into: "Risk caring how you are seen and show people who you want to be known as",
    },
  ],

  "Aquarius/8>Leo/2": [
    {
      fromMode: ["Reallocation", "Shared Value"],
      intoMode: ["Ownership", "Creation"],
      from: "Moving shared resources toward wherever they can create the greatest change",
      into: "Build something valuable that carries your own unmistakable signature",
    },
    {
      fromMode: ["Experiment", "Exchange"],
      intoMode: ["Possession", "Pride"],
      from: "Testing unconventional ways for resources to move between people",
      into: "Create something you are proud enough to own and protect",
    },
    {
      fromMode: ["Leverage", "Collective Value"],
      intoMode: ["Worth", "Recognition"],
      from: "Thinking about how resources can unlock value across a larger system",
      into: "Develop the personal talent whose value you are willing to claim as your own",
    },
  ],

  "Aquarius/9>Leo/3": [
    {
      fromMode: ["Vision", "Foresight"],
      intoMode: ["Voice", "Storytelling"],
      from: "Seeing possibilities that the existing worldview has not yet accounted for",
      into: "Tell the story vividly enough that another person can see what you see",
    },
    {
      fromMode: ["Systems Thinking", "Futurism"],
      intoMode: ["Narrative", "Expression"],
      from: "Understanding how larger systems may develop over time",
      into: "Give the idea a human voice and a story people can actually remember",
    },
    {
      fromMode: ["Possibility", "Experiment"],
      intoMode: ["Persuasion", "Performance"],
      from: "Keeping the future open by exploring unconventional possibilities",
      into: "Choose the possibility you believe in and communicate it with conviction",
    },
  ],

  "Aquarius/10>Leo/4": [
    {
      fromMode: ["Reform", "Leadership"],
      intoMode: ["Centrality", "Belonging"],
      from: "Using public responsibility to change systems that no longer work",
      into: "Become a warm, defining presence inside the private world you call home",
    },
    {
      fromMode: ["Objectivity", "Institution"],
      intoMode: ["Pride", "Foundation"],
      from: "Judging structures by whether they function rather than whether they feel familiar",
      into: "Build a foundation you love enough to protect for reasons that are personal",
    },
    {
      fromMode: ["Independence", "Impact"],
      intoMode: ["Identity", "Roots"],
      from: "Standing apart from the group when change requires it",
      into: "Let yourself become deeply identified with particular people, places, and traditions",
    },
  ],

  "Aquarius/11>Leo/5": [
    {
      fromMode: ["Collaboration", "Network"],
      intoMode: ["Creation", "Authorship"],
      from: "Building with people whose different contributions make the project collective",
      into: "Make something that could only have come from you",
    },
    {
      fromMode: ["Participation", "Community"],
      intoMode: ["Performance", "Expression"],
      from: "Creating spaces where everyone can participate in shaping what happens",
      into: "Take the stage yourself and show the group what you want to express",
    },
    {
      fromMode: ["Distribution", "Collective Ownership"],
      intoMode: ["Recognition", "Pride"],
      from: "Designing projects so their value can spread beyond any single owner",
      into: "Allow one creation to carry your name and let yourself be proud of being recognised for it",
    },
  ],

  "Aquarius/12>Leo/6": [
    {
      fromMode: ["Observation", "Detachment"],
      intoMode: ["Mastery", "Performance"],
      from: "Standing outside the situation long enough to see the pattern others miss",
      into: "Bring the insight into your hands and become visibly good at doing something with it",
    },
    {
      fromMode: ["Experiment", "Surrender"],
      intoMode: ["Skill", "Practice"],
      from: "Remaining open to strange solutions without needing to control how they arrive",
      into: "Choose the solution worth developing and practice it until it becomes a skill",
    },
    {
      fromMode: ["Solitude", "Independence"],
      intoMode: ["Work", "Pride"],
      from: "Doing unconventional work without needing anyone else to understand its value",
      into: "Develop the craft until the quality itself gives you something worth taking pride in",
    },
  ],

  "Pisces/1>Virgo/7": [
    {
      fromMode: ["Intuition", "Fluidity"],
      intoMode: ["Discernment", "Partnership"],
      from: "Following what feels true without needing to define yourself too rigidly",
      into: "Learn who you are in relationship by distinguishing your needs from the other person's",
    },
    {
      fromMode: ["Empathy", "Receptivity"],
      intoMode: ["Boundaries", "Reciprocity"],
      from: "Feeling what another person carries as though it were partly your own",
      into: "Separate what belongs to you from what belongs to them and build the relationship from there",
    },
    {
      fromMode: ["Presence", "Adaptability"],
      intoMode: ["Standards", "Commitment"],
      from: "Meeting the person where they are and becoming what the moment seems to need",
      into: "Define what a workable relationship requires and hold both people to it",
    },
  ],

  "Pisces/2>Virgo/8": [
    {
      fromMode: ["Generosity", "Flow"],
      intoMode: ["Accounting", "Boundaries"],
      from: "Letting resources move toward whatever feels meaningful or needed",
      into: "Know exactly what is being shared, what it costs, and who is responsible for what",
    },
    {
      fromMode: ["Trust", "Provision"],
      intoMode: ["Discernment", "Risk"],
      from: "Giving because you sense that something or someone needs support",
      into: "Examine the arrangement closely before deciding what should actually be committed",
    },
    {
      fromMode: ["Value", "Compassion"],
      intoMode: ["Investigation", "Stewardship"],
      from: "Valuing what moves or inspires you even when its return cannot be measured",
      into: "Trace where the resources go and make sure what you give can actually do the work",
    },
  ],

  "Pisces/3>Virgo/9": [
    {
      fromMode: ["Imagination", "Association"],
      intoMode: ["Study", "Scholarship"],
      from: "Letting distant ideas connect through image, feeling, and association",
      into: "Study the connection closely enough to determine whether it actually holds",
    },
    {
      fromMode: ["Poetry", "Expression"],
      intoMode: ["Knowledge", "Precision"],
      from: "Using language to evoke meanings that cannot be stated literally",
      into: "Define the idea precisely enough that another person can examine what you mean",
    },
    {
      fromMode: ["Listening", "Intuition"],
      intoMode: ["Expertise", "Interpretation"],
      from: "Receiving the meaning before you can explain why it feels significant",
      into: "Develop enough knowledge to distinguish genuine insight from a compelling impression",
    },
  ],

  "Pisces/4>Virgo/10": [
    {
      fromMode: ["Refuge", "Belonging"],
      intoMode: ["Professionalism", "Competence"],
      from: "Creating a private world where people can be accepted without having to perform",
      into: "Carry that sensitivity into public work and become skilled enough to make it useful",
    },
    {
      fromMode: ["Acceptance", "Home"],
      intoMode: ["Standards", "Achievement"],
      from: "Making room for imperfection because belonging matters more than performance",
      into: "Develop standards for the work and accept being judged by what you produce",
    },
    {
      fromMode: ["Care", "Surrender"],
      intoMode: ["Responsibility", "Precision"],
      from: "Responding compassionately to whatever enters the private world",
      into: "Define what you are responsible for and do that part exceptionally well",
    },
  ],

  "Pisces/5>Virgo/11": [
    {
      fromMode: ["Imagination", "Creation"],
      intoMode: ["Planning", "Organization"],
      from: "Following the image or feeling wherever the creative process wants to go",
      into: "Give the creation a plan that other people can understand and contribute to",
    },
    {
      fromMode: ["Inspiration", "Play"],
      intoMode: ["Usefulness", "Contribution"],
      from: "Creating because the experience itself feels meaningful",
      into: "Ask how the creation can contribute something useful to a wider group",
    },
    {
      fromMode: ["Dreaming", "Authorship"],
      intoMode: ["Coordination", "Standards"],
      from: "Protecting the work from definition while its possibilities are still emerging",
      into: "Define what the project needs and organize people around making it real",
    },
  ],

  "Pisces/6>Virgo/12": [
    {
      fromMode: ["Compassion", "Service"],
      intoMode: ["Discernment", "Solitude"],
      from: "Responding to suffering by helping wherever you sense a need",
      into: "Step away long enough to distinguish what is actually yours to help with",
    },
    {
      fromMode: ["Intuition", "Practice"],
      intoMode: ["Analysis", "Reflection"],
      from: "Acting on what feels like the compassionate thing to do",
      into: "Examine the recurring pattern and identify what your help is actually producing",
    },
    {
      fromMode: ["Healing", "Presence"],
      intoMode: ["Boundaries", "Understanding"],
      from: "Staying available to people while they move through difficulty",
      into: "Understand the problem without making yourself responsible for carrying it",
    },
  ],

  "Pisces/7>Virgo/1": [
    {
      fromMode: ["Empathy", "Partnership"],
      intoMode: ["Discernment", "Identity"],
      from: "Experiencing the relationship so deeply that the boundary between your needs can become unclear",
      into: "Define what is yours to want, choose, and improve independently",
    },
    {
      fromMode: ["Acceptance", "Intimacy"],
      intoMode: ["Standards", "Self-Correction"],
      from: "Making room for the other person as they are",
      into: "Apply that same attention to the person you are deliberately becoming",
    },
    {
      fromMode: ["Receptivity", "Connection"],
      intoMode: ["Competence", "Independence"],
      from: "Letting relationships reveal parts of yourself you could not find alone",
      into: "Develop those discoveries into capacities you can rely on yourself",
    },
  ],

  "Pisces/8>Virgo/2": [
    {
      fromMode: ["Trust", "Surrender"],
      intoMode: ["Appraisal", "Discernment"],
      from: "Entering exchanges whose full value cannot be known in advance",
      into: "Examine what the experience actually produced and decide what it is worth",
    },
    {
      fromMode: ["Sharing", "Permeability"],
      intoMode: ["Measurement", "Ownership"],
      from: "Allowing resources and support to flow across personal boundaries",
      into: "Separate what is yours, account for it accurately, and take responsibility for managing it",
    },
    {
      fromMode: ["Uncertainty", "Transformation"],
      intoMode: ["Prudence", "Capacity"],
      from: "Allowing deep involvement to change what you value",
      into: "Turn what you learned into practical resources and skills you can preserve",
    },
  ],

  "Pisces/9>Virgo/3": [
    {
      fromMode: ["Intuition", "Meaning"],
      intoMode: ["Analysis", "Evidence"],
      from: "Perceiving the larger meaning before you can explain how the pieces fit together",
      into: "Break the insight into claims and find the evidence for each one",
    },
    {
      fromMode: ["Symbol", "Imagination"],
      intoMode: ["Precision", "Definition"],
      from: "Understanding through images, metaphors, and patterns that carry several meanings at once",
      into: "Say exactly what you mean when the situation requires a literal answer",
    },
    {
      fromMode: ["Faith", "Mystery"],
      intoMode: ["Reasoning", "Verification"],
      from: "Leaving room for truths that cannot be demonstrated completely",
      into: "Test what can be tested and distinguish what you know from what you believe",
    },
  ],

  "Pisces/10>Virgo/4": [
    {
      fromMode: ["Calling", "Contribution"],
      intoMode: ["Repair", "Foundation"],
      from: "Following work that feels connected to something larger than personal ambition",
      into: "Bring that calling home and repair the concrete foundation that has to support your life",
    },
    {
      fromMode: ["Receptivity", "Visibility"],
      intoMode: ["Order", "Protection"],
      from: "Allowing public direction to emerge through inspiration and circumstance",
      into: "Create a private environment with enough order to protect your time, energy, and attention",
    },
    {
      fromMode: ["Compassion", "Purpose"],
      intoMode: ["Improvement", "Roots"],
      from: "Trying to make your public contribution meaningful to people beyond yourself",
      into: "Apply that same care to improving the actual conditions of your private life",
    },
  ],

  "Pisces/11>Virgo/5": [
    {
      fromMode: ["Compassion", "Community"],
      intoMode: ["Craft", "Refinement"],
      from: "Feeling connected to a wider group through shared hopes, suffering, or ideals",
      into: "Take one thing you personally want to make and refine it until it can carry the feeling properly",
    },
    {
      fromMode: ["Participation", "Surrender"],
      intoMode: ["Authorship", "Control"],
      from: "Allowing the collective project to become whatever the people inside it need",
      into: "Take responsibility for the creative decisions in the work that is specifically yours",
    },
    {
      fromMode: ["Collective Feeling", "Inspiration"],
      intoMode: ["Technique", "Expression"],
      from: "Absorbing what the wider group is feeling and imagining",
      into: "Develop the technique required to give that feeling a precise form",
    },
  ],

  "Pisces/12>Virgo/6": [
    {
      fromMode: ["Surrender", "Stillness"],
      intoMode: ["Work", "Correction"],
      from: "Allowing the answer to emerge without forcing yourself to resolve it",
      into: "Identify the concrete thing that can now be improved and begin working on it",
    },
    {
      fromMode: ["Receptivity", "Intuition"],
      intoMode: ["Routine", "Practice"],
      from: "Receiving impressions, feelings, and insights without demanding an immediate use for them",
      into: "Turn the insight that matters into something you practice consistently",
    },
    {
      fromMode: ["Compassion", "Acceptance"],
      intoMode: ["Discernment", "Service"],
      from: "Accepting the suffering or imperfection you cannot make disappear",
      into: "Distinguish the part you can actually help with and become skilled at helping there",
    },
  ],

};

/**
 * The curated conversions for this axis, or null.
 *
 * Null is the normal answer for most charts and is not a failure: the caller
 * falls back to the departing sign's own conversions, which cover all twelve
 * signs and carry the same four fields.
 */
export function axisConversionsFor(
  fromSign: string,
  fromHouse: number | null,
  toSign: string,
  toHouse: number | null,
): AxisConversion[] | null {
  if (fromHouse === null || toHouse === null) return null;

  return (
    AXIS_CONVERSIONS[`${fromSign}/${fromHouse}>${toSign}/${toHouse}`] ?? null
  );
}
