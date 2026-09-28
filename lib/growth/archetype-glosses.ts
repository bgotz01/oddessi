/**
 * lib/growth/archetype-glosses.ts
 *
 * What each archetype actually means, as fragments a reader can scan.
 *
 * `ARCHETYPE` names the role and keeps the argument for it (`why`), but the
 * argument is about the house and the sign, not the role — and some roles are
 * opaque on their own. "Witness / Reconciler" says nothing until you know what
 * is being witnessed and what is being reconciled. These are the explanation.
 *
 *     terms       one fragment per word in the role, keyed exactly as it is
 *                 spelled there — what that role DOES, in this house
 *     inPractice  two concrete behaviours; what the role looks like on a
 *                 Tuesday
 *
 * The rule for every entry: term → function → observable behaviour. An
 * `inPractice` line demonstrates the role — something the person actually
 * does, that you could picture them doing — never a field, occupation, hobby
 * or topic associated with it. "Questioning claims before believing them",
 * not "Formal study and research"; "Being seen as fair", not "Management,
 * law, public relations".
 *
 * Fragments, not sentences: no trailing full stop, a term's fragment starts
 * lower-case because it follows the term and a dash. Written for the sign IN
 * the house, so "Explorer" in Aries/1 and Aries/9 do not share a gloss.
 */

export interface ArchetypeGloss {
  terms: Record<string, string>;
  inPractice: [string, string];
}

export const ARCHETYPE_GLOSS: Record<string, ArchetypeGloss> = {
  // ─── Aries ────────────────────────────────────────────────────────────────

  "Aries/1": {
    terms: {
      Explorer: "goes into unknown ground to find out who you are",
      Pioneer: "makes the first path where none existed",
    },
    inPractice: [
      "Starting before you feel ready",
      "Letting your first move define you, not your caution",
    ],
  },
  "Aries/2": {
    terms: {
      Owner: "treats what you earn and value as genuinely yours",
      Claimant: "names what you are owed instead of waiting to be offered it",
    },
    inPractice: [
      "Asking for the raise instead of hoping for it",
      "Naming your price and deciding where your resources go",
    ],
  },
  "Aries/3": {
    terms: {
      Challenger: "pushes back on an idea to see if it holds",
      Speaker: "says the direct thing out loud",
    },
    inPractice: [
      "Asking the blunt question in the meeting",
      "Arguing a point to learn what you think",
    ],
  },
  "Aries/4": {
    terms: {
      Founder: "starts a home or base from scratch",
      Homemaker: "shapes that base around your own needs",
    },
    inPractice: [
      "Moving out and building your own place",
      "Setting the house rules rather than inheriting them",
    ],
  },
  "Aries/5": {
    terms: {
      Creator: "makes things because you want them to exist",
      "Risk Taker": "puts yourself on the line for joy or love",
    },
    inPractice: [
      "Shipping the project before it is polished",
      "Asking the person out",
    ],
  },
  "Aries/6": {
    terms: {
      Doer: "acts on the task instead of planning it",
      "Problem Solver": "spots what is broken and fixes it directly",
    },
    inPractice: [
      "Fixing the issue while others are still discussing it",
      "Changing your routine the day it stops working",
    ],
  },
  "Aries/7": {
    terms: {
      Partner: "meets another person as an equal",
      Challenger: "disagrees openly rather than giving way",
    },
    inPractice: [
      "Saying what you want in the relationship",
      "Staying yourself during a conflict",
    ],
  },
  "Aries/8": {
    terms: {
      Instigator: "starts the hard conversation or change others avoid",
      Catalyst: "triggers the transformation that was waiting to happen",
    },
    inPractice: [
      "Raising the money or power issue in a shared situation",
      "Ending something that has been quietly dying",
    ],
  },
  "Aries/9": {
    terms: {
      Explorer: "goes out to find your own answers",
      Author: "writes and stands behind your own view",
    },
    inPractice: [
      "Taking a clear position instead of summarising others",
      "Choosing your own reading list over the assigned one",
    ],
  },
  "Aries/10": {
    terms: {
      Leader: "sets the direction in public",
      Commander: "makes the call and owns the result",
    },
    inPractice: [
      "Volunteering to lead the project",
      "Putting your name on a decision",
    ],
  },
  "Aries/11": {
    terms: {
      Initiator: "makes the first move on a shared idea",
      Mobilizer: "gets the group to actually act on it",
    },
    inPractice: [
      "Founding the club, chat or initiative",
      "Proposing the bold plan to your friends",
    ],
  },
  "Aries/12": {
    terms: {
      Explorer: "goes into inner or unseen territory",
      Pathfinder: "finds a way forward without a map",
    },
    inPractice: [
      "Acting on intuition before it can be explained",
      "Facing a private fear head-on",
    ],
  },

  // ─── Taurus ───────────────────────────────────────────────────────────────

  "Taurus/1": {
    terms: {
      Anchor: "steadies a room by being calm and present",
      Builder: "shapes yourself slowly and deliberately",
    },
    inPractice: [
      "Holding your ground without raising your voice",
      "Looking after your body as a foundation",
    ],
  },
  "Taurus/2": {
    terms: {
      Owner: "knows what is yours and what it is worth",
      Steward: "looks after resources so they last and grow",
    },
    inPractice: [
      "Repairing something instead of replacing it",
      "Buying fewer, better things",
    ],
  },
  "Taurus/3": {
    terms: {
      Thinker: "works an idea through properly",
      Pragmatist: "keeps only what is practical and usable",
    },
    inPractice: [
      "Turning a discussion into a concrete next step",
      "Learning one skill thoroughly instead of many loosely",
    ],
  },
  "Taurus/4": {
    terms: {
      Builder: "puts real work into your home",
      Homesteader: "makes a base that feeds and sustains you",
    },
    inPractice: [
      "Fixing up the place you live with your own hands",
      "Staying put long enough to put down roots",
    ],
  },
  "Taurus/5": {
    terms: {
      Creator: "makes things for pleasure",
      Artisan: "crafts them to be beautiful and lasting",
    },
    inPractice: [
      "Reworking something until it feels good to use",
      "Enjoying pleasures without rushing them",
    ],
  },
  "Taurus/6": {
    terms: {
      Worker: "shows up consistently",
      Craftsperson: "gets really good through steady practice",
    },
    inPractice: [
      "Keeping a pace you can hold for years",
      "Refining your work a little every day",
    ],
  },
  "Taurus/7": {
    terms: {
      Partner: "commits to one person over time",
      Loyalist: "stays steady when the relationship is tested",
    },
    inPractice: [
      "Being reliable when novelty wears off",
      "Building shared assets and habits together",
    ],
  },
  "Taurus/8": {
    terms: {
      Custodian: "keeps shared money and trust safe",
      Steward: "manages what is shared without claiming it",
    },
    inPractice: [
      "Handling joint finances or an inheritance carefully",
      "Staying calm through a crisis",
    ],
  },
  "Taurus/9": {
    terms: {
      Believer: "commits to a set of values",
      Builder: "turns those values into daily habits",
    },
    inPractice: [
      "Living what you believe rather than debating it",
      "Learning through hands-on experience",
    ],
  },
  "Taurus/10": {
    terms: {
      Builder: "builds a career brick by brick",
      Owner: "owns the work and the reputation it earns",
    },
    inPractice: [
      "Staying in a field long enough to master it",
      "Building your own business or body of work",
    ],
  },
  "Taurus/11": {
    terms: {
      Member: "stays in the group for the long haul",
      Sustainer: "keeps the group resourced after the hype fades",
    },
    inPractice: [
      "Being the one who still turns up in month six",
      "Funding or practically supporting a shared cause",
    ],
  },
  "Taurus/12": {
    terms: {
      Anchor: "stays calm when things feel uncertain",
      "Sanctuary Keeper": "creates a quiet, safe place to recover",
    },
    inPractice: [
      "Keeping restful rituals like walks, baths or sleep",
      "Being a steady presence for someone in distress",
    ],
  },

  // ─── Gemini ───────────────────────────────────────────────────────────────

  "Gemini/1": {
    terms: {
      Messenger: "leads with words and curiosity",
      Connector: "makes contact with people easily",
    },
    inPractice: [
      "Striking up conversations",
      "Letting your identity be flexible and evolving",
    ],
  },
  "Gemini/2": {
    terms: {
      Connector: "links people and resources",
      Broker: "earns by making useful introductions and deals",
    },
    inPractice: [
      "Turning a conversation into an opportunity",
      "Seeing value in information and contacts",
    ],
  },
  "Gemini/3": {
    terms: {
      Questioner: "asks lots of questions",
      Communicator: "passes what you learn on clearly",
    },
    inPractice: [
      "Passing on what you learned the same day",
      "Being the person others ask what is going on",
    ],
  },
  "Gemini/4": {
    terms: {
      Storyteller: "puts family experience into words",
      Storykeeper: "preserves the stories that explain where you came from",
    },
    inPractice: [
      "Asking relatives the questions nobody asked",
      "Making home a place of conversation",
    ],
  },
  "Gemini/5": {
    terms: {
      Creator: "makes things playfully",
      Improviser: "tries many versions and riffs",
    },
    inPractice: [
      "Trying five versions before picking one",
      "Flirting and play through wit",
    ],
  },
  "Gemini/6": {
    terms: {
      Coordinator: "connects the moving parts so work gets done",
      Dispatcher: "routes the right information to the right person, fast",
    },
    inPractice: [
      "Running the schedule, emails and handoffs",
      "Adapting quickly when plans change",
    ],
  },
  "Gemini/7": {
    terms: {
      Conversationalist: "keeps the relationship alive through talk and curiosity",
      Negotiator: "works out what things mean and what you agree to",
    },
    inPractice: [
      "Regular real talks with your partner",
      "Asking questions you think you already know the answer to",
    ],
  },
  "Gemini/8": {
    terms: {
      Questioner: "asks about the taboo or hidden thing",
      Investigator: "digs into how it really works",
    },
    inPractice: [
      "Asking how the money, contract or diagnosis actually works",
      "Talking openly about difficult subjects",
    ],
  },
  "Gemini/9": {
    terms: {
      Explorer: "samples many cultures and ideas",
      Translator: "explains big ideas in plain language",
    },
    inPractice: [
      "Explaining a foreign idea to someone at home",
      "Comparing beliefs rather than adopting one",
    ],
  },
  "Gemini/10": {
    terms: {
      Communicator: "is known for how you explain things",
      Spokesperson: "speaks for the work in public",
    },
    inPractice: [
      "Explaining the team's work to people outside it",
      "Being the voice of a team or brand",
    ],
  },
  "Gemini/11": {
    terms: {
      Networker: "knows lots of people across groups",
      Matchmaker: "introduces people who should meet",
    },
    inPractice: [
      "Sharing links, contacts and ideas freely",
      "Starting group chats and communities",
    ],
  },
  "Gemini/12": {
    terms: {
      Listener: "tunes into half-formed thoughts and hunches",
      Observer: "notices without rushing to explain",
    },
    inPractice: [
      "Writing down a hunch before it disappears",
      "Letting an idea stay unfinished for a while",
    ],
  },

  // ─── Cancer ───────────────────────────────────────────────────────────────

  "Cancer/1": {
    terms: {
      Empath: "senses how others feel right away",
      Protector: "steps in to shield what matters",
    },
    inPractice: [
      "Leading with care when you meet people",
      "Standing up for someone vulnerable",
    ],
  },
  "Cancer/2": {
    terms: {
      Provider: "makes sure there is enough for those you care for",
      "Security Builder": "builds a financial safety net",
    },
    inPractice: [
      "Keeping an emergency fund",
      "Spending on comfort and family needs first",
    ],
  },
  "Cancer/3": {
    terms: {
      Listener: "hears the feeling under the words",
      Confidant: "is someone people trust with the real story",
    },
    inPractice: [
      "Checking in on siblings and neighbours",
      "Creating space for honest talk",
    ],
  },
  "Cancer/4": {
    terms: {
      Carer: "looks after the people at home",
      Homemaker: "makes home warm and safe",
    },
    inPractice: [
      "Cooking for people so they feel at home",
      "Building a family, chosen or given",
    ],
  },
  "Cancer/5": {
    terms: {
      Creator: "makes things you feel attached to",
      Cultivator: "nurtures a creation or person until it grows",
    },
    inPractice: [
      "Staying with something you made through its awkward early stage",
      "Encouraging someone's talent",
    ],
  },
  "Cancer/6": {
    terms: {
      Carer: "tends to daily needs",
      Keeper: "keeps people and systems well through small routines",
    },
    inPractice: [
      "Looking after health, meals and rest",
      "Being the one who notices what needs doing",
    ],
  },
  "Cancer/7": {
    terms: {
      Partner: "builds a close bond",
      Protector: "keeps the relationship emotionally safe",
    },
    inPractice: [
      "Caring for a partner without controlling them",
      "Making space for both people's feelings",
    ],
  },
  "Cancer/8": {
    terms: {
      Confidant: "is trusted with someone's deepest secrets",
      Guardian: "protects that vulnerability without owning it",
    },
    inPractice: [
      "Supporting someone through grief or crisis",
      "Keeping what you were told private",
    ],
  },
  "Cancer/9": {
    terms: {
      Traditionalist: "honours inherited beliefs and customs",
      Keeper: "preserves the ones worth passing on",
    },
    inPractice: [
      "Asking elders what they believe and why",
      "Passing on what matters to the next generation",
    ],
  },
  "Cancer/10": {
    terms: {
      Leader: "takes responsibility in public",
      Protector: "uses position to look after people",
    },
    inPractice: [
      "Using authority to protect the people you lead",
      "Taking the heat so your team does not have to",
    ],
  },
  "Cancer/11": {
    terms: {
      Host: "welcomes people in",
      "Community Builder": "turns a group into a place to belong",
    },
    inPractice: [
      "Organising gatherings and dinners",
      "Making sure newcomers feel included",
    ],
  },
  "Cancer/12": {
    terms: {
      Witness: "stays present with someone's hidden pain",
      Comforter: "soothes without trying to fix",
    },
    inPractice: [
      "Sitting with someone in grief",
      "Listening without offering a fix",
    ],
  },

  // ─── Leo ──────────────────────────────────────────────────────────────────

  "Leo/1": {
    terms: {
      Performer: "is willing to be seen",
      Protagonist: "acts as the lead in your own life",
    },
    inPractice: [
      "Owning your choices out loud",
      "Letting yourself be visibly distinctive",
    ],
  },
  "Leo/2": {
    terms: {
      Creator: "earns through what you make",
      Proprietor: "is proud to own and run your thing",
    },
    inPractice: [
      "Putting your name on a product or business",
      "Valuing your talent enough to charge for it",
    ],
  },
  "Leo/3": {
    terms: {
      Speaker: "gives ideas a confident voice",
      Storyteller: "makes information engaging",
    },
    inPractice: [
      "Telling it your way rather than neutrally",
      "Telling stories people remember",
    ],
  },
  "Leo/4": {
    terms: {
      Homemaker: "creates a home with character",
      Pillar: "is the warm centre the family gathers around",
    },
    inPractice: [
      "Being the one who brings the family together",
      "Being proud of where you come from",
    ],
  },
  "Leo/5": {
    terms: {
      Creator: "makes something unmistakably yours",
      Performer: "shares it with an audience",
    },
    inPractice: [
      "Showing your work to an audience before it feels safe",
      "Playing and romancing wholeheartedly",
    ],
  },
  "Leo/6": {
    terms: {
      Craftsperson: "puts pride into everyday work",
      Master: "becomes known as excellent at it",
    },
    inPractice: [
      "Doing the ordinary task with flair",
      "Leading by example at work",
    ],
  },
  "Leo/7": {
    terms: {
      Counterpart: "meets a strong other as an equal",
      Protagonist: "stays fully yourself in the relationship",
    },
    inPractice: [
      "Celebrating each other generously",
      "Not shrinking to keep the peace",
    ],
  },
  "Leo/8": {
    terms: {
      Revealer: "brings hidden things into the light",
      Confessor: "shares what is personal and vulnerable",
    },
    inPractice: [
      "Being open about money, sex or fear",
      "Letting someone see the real you",
    ],
  },
  "Leo/9": {
    terms: {
      Teacher: "shares what you believe",
      Evangelist: "inspires others with conviction",
    },
    inPractice: [
      "Saying what you believe in front of a room",
      "Getting someone excited about what you love",
    ],
  },
  "Leo/10": {
    terms: {
      Leader: "takes the top role",
      Figurehead: "becomes the public face of the work",
    },
    inPractice: [
      "Putting your name and reputation on it",
      "Accepting recognition and scrutiny",
    ],
  },
  "Leo/11": {
    terms: {
      Ringleader: "is the visible centre people rally around",
      Organizer: "turns that energy into a shared effort",
    },
    inPractice: [
      "Being the one who says “let’s do this”",
      "Hyping your friends' ideas",
    ],
  },
  "Leo/12": {
    terms: {
      Dreamer: "creates from an inner vision",
      Visionary: "trusts it before anyone applauds",
    },
    inPractice: [
      "Making art in private",
      "Working on something nobody sees yet",
    ],
  },

  // ─── Virgo ────────────────────────────────────────────────────────────────

  "Virgo/1": {
    terms: {
      Practitioner: "builds yourself through practice",
      "Self-Editor": "revises how you show up based on what works",
    },
    inPractice: [
      "Tweaking one habit at a time",
      "Adjusting based on feedback",
    ],
  },
  "Virgo/2": {
    terms: {
      Analyst: "looks closely at money and resources",
      Appraiser: "judges what is actually worth it",
    },
    inPractice: [
      "Cancelling what you do not use",
      "Investing in useful skills and tools",
    ],
  },
  "Virgo/3": {
    terms: {
      Observer: "notices small details",
      Analyst: "sorts facts from noise",
    },
    inPractice: [
      "Catching the error others skimmed past",
      "Explaining things precisely",
    ],
  },
  "Virgo/4": {
    terms: {
      Fixer: "notices what is broken at home",
      Restorer: "patiently repairs it",
    },
    inPractice: [
      "Fixing what everyone at home has learned to work around",
      "Working through family patterns",
    ],
  },
  "Virgo/5": {
    terms: {
      Creator: "turns an idea into something that can be refined",
      Craftsperson: "polishes them through revision and practice",
    },
    inPractice: [
      "Drafting and redrafting until it is right",
      "Practising the hard part on its own",
    ],
  },
  "Virgo/6": {
    terms: {
      Worker: "handles the daily work with care and precision",
      Specialist: "knows the details deeply enough to diagnose and improve",
    },
    inPractice: [
      "Becoming the expert in your team",
      "Streamlining a process nobody questioned",
    ],
  },
  "Virgo/7": {
    terms: {
      Partner: "shows up practically",
      "Problem Solver": "sorts out mismatched expectations",
    },
    inPractice: [
      "Clarifying who does what in the relationship",
      "Helping partners and clients solve real problems",
    ],
  },
  "Virgo/8": {
    terms: {
      Examiner: "looks precisely at what is owed or hidden",
      Investigator: "untangles complex situations",
    },
    inPractice: [
      "Reading the fine print on shared money",
      "Naming exactly what was left unresolved",
    ],
  },
  "Virgo/9": {
    terms: {
      Student: "studies carefully",
      Scholar: "tests big ideas against the facts",
    },
    inPractice: [
      "Checking the source before quoting it",
      "Questioning claims before believing them",
    ],
  },
  "Virgo/10": {
    terms: {
      Specialist: "is known for expertise",
      Professional: "is trusted for reliability and standards",
    },
    inPractice: [
      "Being known for work that never needs redoing",
      "Becoming the person others trust for the difficult work",
    ],
  },
  "Virgo/11": {
    terms: {
      Planner: "turns group goals into steps",
      Organizer: "keeps the group running practically",
    },
    inPractice: [
      "Turning the group's wish list into a schedule",
      "Offering the practical skill the group lacks",
    ],
  },
  "Virgo/12": {
    terms: {
      Interpreter: "makes sense of vague feelings and signals",
      "Pattern Finder": "spots the pattern without forcing it",
    },
    inPractice: [
      "Noticing when a vague feeling keeps returning",
      "Giving structure to something others cannot yet articulate",
    ],
  },

  // ─── Libra ────────────────────────────────────────────────────────────────

  "Libra/1": {
    terms: {
      Advocate: "represents your own point of view",
      Diplomat: "stays open to other people while doing it",
    },
    inPractice: [
      "Stating your view graciously",
      "Making a good first impression",
    ],
  },
  "Libra/2": {
    terms: {
      Curator: "chooses carefully what to keep",
      Appraiser: "weighs quality and fairness in value",
    },
    inPractice: [
      "Comparing options before buying",
      "Pricing fairly for both sides",
    ],
  },
  "Libra/3": {
    terms: {
      Listener: "hears every side",
      Interpreter: "helps people understand each other",
    },
    inPractice: [
      "Paraphrasing what others mean",
      "Mediating between siblings or colleagues",
    ],
  },
  "Libra/4": {
    terms: {
      Mediator: "handles conflicting needs at home",
      Peacemaker: "finds terms everyone can live with",
    },
    inPractice: [
      "Settling family disputes",
      "Making home harmonious and beautiful",
    ],
  },
  "Libra/5": {
    terms: {
      Creator: "makes things",
      Curator: "arranges elements until they balance",
    },
    inPractice: [
      "Rearranging until everything sits right together",
      "Romance built on mutual delight",
    ],
  },
  "Libra/6": {
    terms: {
      Coordinator: "balances competing demands at work",
      Harmonizer: "keeps teamwork cooperative rather than tense",
    },
    inPractice: [
      "Sharing the workload fairly",
      "Smoothing workplace friction",
    ],
  },
  "Libra/7": {
    terms: {
      Partner: "commits to a real equal",
      Negotiator: "finds terms that work for both",
    },
    inPractice: [
      "Putting shared terms into words",
      "Holding two views at once without collapsing either",
    ],
  },
  "Libra/8": {
    terms: {
      Judge: "decides what is fair in shared money or power",
      Mediator: "negotiates it between the people involved",
    },
    inPractice: [
      "Dividing assets or debts fairly",
      "Rebalancing power in an intimate relationship",
    ],
  },
  "Libra/9": {
    terms: {
      Explorer: "looks at many worldviews",
      Interpreter: "compares them to find what is true",
    },
    inPractice: [
      "Reading the strongest case for a view you reject",
      "Debating fairly",
    ],
  },
  "Libra/10": {
    terms: {
      Diplomat: "represents many interests in public",
      Leader: "makes balanced decisions people accept",
    },
    inPractice: [
      "Making calls both sides can accept",
      "Being seen as fair",
    ],
  },
  "Libra/11": {
    terms: {
      Diplomat: "bridges groups",
      "Coalition Builder": "gets different people acting together",
    },
    inPractice: [
      "Getting rival groups into the same room",
      "Finding common ground in a community",
    ],
  },
  "Libra/12": {
    terms: {
      Witness: "sees inner contradictions without taking a side",
      Reconciler: "makes peace between parts of you, or old conflicts, that seemed incompatible",
    },
    inPractice: [
      "Forgiving what cannot be undone",
      "Accepting two opposite feelings at once",
    ],
  },

  // ─── Scorpio ──────────────────────────────────────────────────────────────

  "Scorpio/1": {
    terms: {
      Survivor: "comes through hard things",
      Transformer: "sheds old versions of yourself",
    },
    inPractice: [
      "Reinventing yourself after a crisis",
      "Being honest about what is no longer you",
    ],
  },
  "Scorpio/2": {
    terms: {
      Investigator: "looks beneath the surface of value",
      Investor: "commits resources where the hidden potential is",
    },
    inPractice: [
      "Finding value others have overlooked",
      "Putting everything into one serious bet",
    ],
  },
  "Scorpio/3": {
    terms: {
      Questioner: "asks what others avoid asking",
      Detective: "follows what does not add up to the truth",
    },
    inPractice: [
      "Asking the probing question",
      "Noticing what someone left out",
    ],
  },
  "Scorpio/4": {
    terms: {
      Detective: "uncovers family secrets",
      Excavator: "digs up buried patterns so they stop running you",
    },
    inPractice: [
      "Asking the family question nobody answers",
      "Breaking a pattern you inherited",
    ],
  },
  "Scorpio/5": {
    terms: {
      Creator: "makes intense, personal work",
      Alchemist: "turns pain into something alive",
    },
    inPractice: [
      "Making something out of what hurt",
      "Loving without holding back",
    ],
  },
  "Scorpio/6": {
    terms: {
      Detective: "finds the root cause",
      Healer: "treats it rather than the symptom",
    },
    inPractice: [
      "Asking why it broke, not just fixing it",
      "Addressing health issues at their source",
    ],
  },
  "Scorpio/7": {
    terms: {
      Lover: "goes deep in relationships",
      Confidant: "builds trust strong enough for real vulnerability",
    },
    inPractice: [
      "Honest conversations about power in the relationship",
      "Letting a partner fully see you",
    ],
  },
  "Scorpio/8": {
    terms: {
      Guardian: "holds what others entrust to you",
      "Power Holder": "holds leverage without abusing it",
    },
    inPractice: [
      "Managing shared money or secrets",
      "Staying steady when someone hands you their worst",
    ],
  },
  "Scorpio/9": {
    terms: {
      Questioner: "interrogates accepted beliefs",
      Heretic: "follows the truth even when it breaks doctrine",
    },
    inPractice: [
      "Challenging what you were taught",
      "Reading what your tradition told you not to",
    ],
  },
  "Scorpio/10": {
    terms: {
      Strategist: "reads where the power really sits",
      "Power Broker": "uses leverage to get things done",
    },
    inPractice: [
      "Knowing where decisions are really made",
      "Leading through a crisis or turnaround",
    ],
  },
  "Scorpio/11": {
    terms: {
      Observer: "reads the hidden dynamics in groups",
      Strategist: "acts on them",
    },
    inPractice: [
      "Knowing who really influences whom",
      "Building loyal alliances",
    ],
  },
  "Scorpio/12": {
    terms: {
      Diver: "descends into the unconscious",
      Excavator: "brings buried material up to the surface",
    },
    inPractice: [
      "Paying attention to recurring dreams",
      "Facing private fears",
    ],
  },

  // ─── Sagittarius ──────────────────────────────────────────────────────────

  "Sagittarius/1": {
    terms: {
      Seeker: "finds out who you are by exploring",
      Adventurer: "says yes to the unknown",
    },
    inPractice: [
      "Saying yes to the unfamiliar invitation",
      "Taking risks to grow",
    ],
  },
  "Sagittarius/2": {
    terms: {
      Investor: "puts money behind a bigger future",
      "Risk Taker": "accepts uncertainty for the upside",
    },
    inPractice: [
      "Paying for experiences that widen your world",
      "Backing a long-shot opportunity",
    ],
  },
  "Sagittarius/3": {
    terms: {
      Storyteller: "turns facts into a meaningful story",
      Commentator: "explains why it matters",
    },
    inPractice: [
      "Explaining what the news actually means",
      "Connecting local news to the bigger picture",
    ],
  },
  "Sagittarius/4": {
    terms: {
      Wanderer: "leaves home to explore",
      Wayfarer: "finds where you belong along the way",
    },
    inPractice: [
      "Living somewhere you were not born into",
      "Building a home that welcomes the wider world",
    ],
  },
  "Sagittarius/5": {
    terms: {
      Creator: "makes things with enthusiasm",
      Adventurer: "plays big",
    },
    inPractice: [
      "Throwing yourself into something new for the fun of it",
      "Starting a project bigger than you can finish alone",
    ],
  },
  "Sagittarius/6": {
    terms: {
      Teacher: "shows others how the work is done",
      Mentor: "explains why it matters",
    },
    inPractice: [
      "Explaining the why behind a task to a new colleague",
      "Finding purpose in daily tasks",
    ],
  },
  "Sagittarius/7": {
    terms: {
      Partner: "commits to someone",
      "Fellow Traveler": "grows alongside them through shared discovery",
    },
    inPractice: [
      "Planning a shared adventure",
      "Giving each other freedom",
    ],
  },
  "Sagittarius/8": {
    terms: {
      Investigator: "digs into life's hard realities",
      "Truth Seeker": "looks for the meaning in them",
    },
    inPractice: [
      "Asking what a loss has taught you",
      "Finding wisdom in a crisis",
    ],
  },
  "Sagittarius/9": {
    terms: {
      Student: "keeps learning",
      Philosopher: "builds a coherent worldview",
    },
    inPractice: [
      "Following a question across disciplines",
      "Writing down what you believe and why",
    ],
  },
  "Sagittarius/10": {
    terms: {
      Leader: "guides in public",
      "Standard-Bearer": "stands for a clear mission",
    },
    inPractice: [
      "Turning down work that conflicts with your mission",
      "Being known for your principles",
    ],
  },
  "Sagittarius/11": {
    terms: {
      Advocate: "champions a cause",
      Evangelist: "spreads a big idea through the group",
    },
    inPractice: [
      "Recruiting people to a vision",
      "Painting a picture of where the group could go",
    ],
  },
  "Sagittarius/12": {
    terms: {
      Seeker: "searches for meaning inwardly",
      Pilgrim: "keeps going without proof",
    },
    inPractice: [
      "Taking time alone to ask what it all means",
      "Continuing without proof",
    ],
  },

  // ─── Capricorn ────────────────────────────────────────────────────────────

  "Capricorn/1": {
    terms: {
      Planner: "sets long-term goals for yourself",
      Architect: "deliberately builds who you become",
    },
    inPractice: [
      "Doing what you said you would, on schedule",
      "Acting with maturity",
    ],
  },
  "Capricorn/2": {
    terms: {
      Owner: "takes responsibility for resources",
      Accumulator: "grows them steadily over time",
    },
    inPractice: [
      "Reinvesting instead of spending",
      "Buying tools that pay for themselves",
    ],
  },
  "Capricorn/3": {
    terms: {
      Planner: "structures information and decides what comes first",
      Strategist: "picks the practical route to the goal",
    },
    inPractice: [
      "Making clear plans and checklists",
      "Cutting a long message down to what matters",
    ],
  },
  "Capricorn/4": {
    terms: {
      Pillar: "holds the family together",
      Provider: "supplies structure and security",
    },
    inPractice: [
      "Taking on family responsibilities",
      "Setting boundaries that keep the household stable",
    ],
  },
  "Capricorn/5": {
    terms: {
      Creator: "has creative ideas",
      Producer: "makes them actually happen",
    },
    inPractice: [
      "Scheduling time for creative work",
      "Finishing and releasing projects",
    ],
  },
  "Capricorn/6": {
    terms: {
      Worker: "is disciplined at work",
      Manager: "sets up systems others can follow",
    },
    inPractice: [
      "Creating processes and standards",
      "Documenting how the work is done",
    ],
  },
  "Capricorn/7": {
    terms: {
      Partner: "makes serious commitments",
      Builder: "builds something lasting together",
    },
    inPractice: [
      "Writing down who is responsible for what",
      "Staying accountable when it gets hard",
    ],
  },
  "Capricorn/8": {
    terms: {
      Manager: "handles complex shared obligations",
      Trustee: "is trusted with others' assets",
    },
    inPractice: [
      "Settling an estate or shared obligation properly",
      "Keeping promises in hard situations",
    ],
  },
  "Capricorn/9": {
    terms: {
      Thinker: "works out principles",
      Lawgiver: "turns them into rules people can live by",
    },
    inPractice: [
      "Turning a principle into a rule you follow",
      "Setting your own code of conduct",
    ],
  },
  "Capricorn/10": {
    terms: {
      Leader: "takes charge",
      Authority: "earns respect through proven responsibility",
    },
    inPractice: [
      "Taking the responsibility no one else wants",
      "Being accountable for outcomes",
    ],
  },
  "Capricorn/11": {
    terms: {
      Organizer: "gives a group structure",
      "Institution Builder": "creates organisations that outlast you",
    },
    inPractice: [
      "Giving a loose group a formal structure",
      "Writing bylaws and long-term plans",
    ],
  },
  "Capricorn/12": {
    terms: {
      Servant: "does necessary work behind the scenes",
      Steward: "maintains things without credit",
    },
    inPractice: [
      "Doing necessary work nobody will thank you for",
      "Keeping a private practice without an audience",
    ],
  },

  // ─── Aquarius ─────────────────────────────────────────────────────────────

  "Aquarius/1": {
    terms: {
      Rebel: "refuses expected roles",
      Individualist: "defines yourself on your own terms",
    },
    inPractice: [
      "Dropping a role others expect you to play",
      "Not fitting in on purpose",
    ],
  },
  "Aquarius/2": {
    terms: {
      Investor: "backs new ideas",
      Innovator: "finds value where others see none",
    },
    inPractice: [
      "Earning in a way others have not tried",
      "Finding a use for what others discard",
    ],
  },
  "Aquarius/3": {
    terms: {
      Questioner: "asks the unexpected question",
      Disruptor: "breaks habitual ways of thinking",
    },
    inPractice: [
      "Offering the alternative view",
      "Experimenting with new tools",
    ],
  },
  "Aquarius/4": {
    terms: {
      Rebel: "breaks from family expectations",
      Exile: "gets enough distance to see what is really yours",
    },
    inPractice: [
      "Moving away from home",
      "Keeping only the traditions you actually believe in",
    ],
  },
  "Aquarius/5": {
    terms: {
      Creator: "experiments",
      Inventor: "makes something genuinely new",
    },
    inPractice: [
      "Building something that does not exist yet",
      "Loving on your own terms, not the script",
    ],
  },
  "Aquarius/6": {
    terms: {
      "Problem Solver": "fixes what does not work",
      "Systems Designer": "redesigns the whole process",
    },
    inPractice: [
      "Automating tasks",
      "Proposing a better workflow",
    ],
  },
  "Aquarius/7": {
    terms: {
      Individualist: "stays autonomous inside the relationship",
      Collaborator: "works together as an equal",
    },
    inPractice: [
      "Giving a partner room without feeling threatened",
      "Treating a partner as a friend first",
    ],
  },
  "Aquarius/8": {
    terms: {
      Reformer: "questions how power and money are shared",
      Redistributor: "rebalances it",
    },
    inPractice: [
      "Advocating fair shared finances",
      "Challenging control in relationships",
    ],
  },
  "Aquarius/9": {
    terms: {
      Visionary: "imagines what could be",
      Futurist: "builds ideas about where things are going",
    },
    inPractice: [
      "Asking what the world will look like in twenty years",
      "Updating your beliefs when the evidence changes",
    ],
  },
  "Aquarius/10": {
    terms: {
      Leader: "leads publicly",
      Reformer: "changes the system from inside",
    },
    inPractice: [
      "Changing how your field does things",
      "Being known as a change-maker",
    ],
  },
  "Aquarius/11": {
    terms: {
      Networker: "connects people around a shared vision",
      Architect: "designs the structure that lets them act together",
    },
    inPractice: [
      "Organising people who have never met",
      "Setting up how a group makes decisions",
    ],
  },
  "Aquarius/12": {
    terms: {
      Observer: "watches from the edge",
      Dissenter: "sees and names what insiders cannot",
    },
    inPractice: [
      "Stepping back from the group to see it clearly",
      "Quietly questioning hidden assumptions",
    ],
  },

  // ─── Pisces ───────────────────────────────────────────────────────────────

  "Pisces/1": {
    terms: {
      Actor: "can take on different roles",
      Chameleon: "adapts to each setting without losing yourself",
    },
    inPractice: [
      "Shifting how you come across to meet each person",
      "Empathising by stepping into others' shoes",
    ],
  },
  "Pisces/2": {
    terms: {
      Giver: "shares resources freely",
      Benefactor: "supports others with what you have",
    },
    inPractice: [
      "Giving without keeping score",
      "Valuing generosity over accumulation",
    ],
  },
  "Pisces/3": {
    terms: {
      Dreamer: "thinks in images",
      Poet: "communicates through metaphor and feeling",
    },
    inPractice: [
      "Saying it in an image when facts fall short",
      "Hearing what someone means before they say it",
    ],
  },
  "Pisces/4": {
    terms: {
      Harbor: "offers a place of rest",
      Caregiver: "accepts and looks after whoever arrives",
    },
    inPractice: [
      "Letting people stay without asking why",
      "Caring for family unconditionally",
    ],
  },
  "Pisces/5": {
    terms: {
      Dreamer: "imagines freely",
      Creator: "turns those images into art",
    },
    inPractice: [
      "Following an image until it becomes a piece",
      "Letting a daydream lead the project",
    ],
  },
  "Pisces/6": {
    terms: {
      Helper: "serves those in need",
      Healer: "brings compassion into the work",
    },
    inPractice: [
      "Helping when you cannot fix it",
      "Treating the person, not only the problem",
    ],
  },
  "Pisces/7": {
    terms: {
      Empath: "feels what your partner feels",
      Partner: "stays connected without losing yourself",
    },
    inPractice: [
      "Feeling a partner's mood before they speak",
      "Keeping boundaries while caring",
    ],
  },
  "Pisces/8": {
    terms: {
      Companion: "stays with people through endings",
      Witness: "holds experiences that cannot be explained",
    },
    inPractice: [
      "Staying with someone through an ending",
      "Being close without needing to explain it",
    ],
  },
  "Pisces/9": {
    terms: {
      Seeker: "searches for meaning",
      Mystic: "finds it through direct spiritual experience",
    },
    inPractice: [
      "Trusting an experience over a doctrine",
      "Reading symbols as meaningful",
    ],
  },
  "Pisces/10": {
    terms: {
      Vessel: "lets something larger work through you",
      Artist: "gives it public form",
    },
    inPractice: [
      "Choosing work because it feels like a calling",
      "Letting the work matter more than the credit",
    ],
  },
  "Pisces/11": {
    terms: {
      Empath: "feels for people beyond your circle",
      Humanitarian: "acts on it",
    },
    inPractice: [
      "Giving time to people you will never meet",
      "Speaking up for people outside your circle",
    ],
  },
  "Pisces/12": {
    terms: {
      Mystic: "experiences the transcendent",
      Contemplative: "cultivates stillness to stay with it",
    },
    inPractice: [
      "Sitting in silence without filling it",
      "Letting mystery stay a mystery",
    ],
  },
};
