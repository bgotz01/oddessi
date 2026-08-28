/**
 * lib/growth/signs.ts
 * The sign vocabulary, read twice.
 *
 * A sign on the South Node is not a fault and must not be worded like one. It
 * is a competence — the move this person already makes well, reaches for first,
 * and can perform under pressure without thinking. The same sign on the North
 * Node is the move they have never practised. So one table, two faces, and the
 * nodal axis picks which face each end wears.
 *
 * ─── Why twelve entries is enough ───────────────────────────────────────────
 *
 * The nodes are always exactly opposite, so a chart never presents an arbitrary
 * sign-to-sign pairing: there are six axes read in two directions, which is
 * twelve conversion sets rather than a hundred and forty-four. That is the fact
 * that makes this computable at all, and it is why writing an entry means
 * writing what that sign converts *into* — its opposite is fixed and known.
 *
 * Pure data. Nothing here imports a chart or computes anything.
 */

export interface SignEntry {
  /**
   * The quality, as a standalone noun phrase — "Self-directed conviction".
   *
   * Separate from `movement` because a headline and a sentence fragment want
   * different grammar: "Toward what cannot be managed" is a direction, but it
   * cannot head a chapter, and "What cannot be managed" can.
   */
  quality: string;
  /**
   * The pole in one noun.
   *
   * Not a shortening of `quality` — that is a phrase and cannot head a column.
   * Used where something needs to name this sign as a destination in a single
   * word, which is how a body-derived conversion gets an `intoMode` without
   * borrowing the house's output and duplicating the macro arc above it.
   */
  mode: string;
  /** The developmental motion, as a headline. Sentence fragment, no verb. */
  movement: string;
  /** One paragraph. What this sign is asking for, in plain developmental terms. */
  asks: string;
  /**
   * The same claim as `asks`, as the list it has always been.
   *
   * All twelve are written "{Sign} asks {stem}: {a}, {b}, and {c}" — a
   * three-item list stored as a sentence, which is the only reason the panel
   * had to set it as a paragraph. Split here rather than at render time:
   * splitting prose in a component is the component choosing words, and it
   * breaks the first time an entry is written in a different shape.
   *
   * `asks` stays. The chat and the page context want the paragraph, and a
   * surface that sets running text should not have to reassemble one.
   *
   * Within an entry the three items are parallel — all gerunds, or all
   * imperatives, or all noun phrases — because they were authored as one
   * sentence. Keep it that way when editing: they are read as a set.
   */
  asking: { stem: string; items: string[] };
  /**
   * Questions that force the quality to develop, for when this sign is the
   * pole being moved TOWARD.
   */
  questions: string[];
  /**
   * Questions that catch the old reflex in the act, for when this sign is the
   * pole being moved FROM.
   *
   * A different job from `questions`, which is why it is a separate table
   * rather than the same one read backwards: a development question opens a
   * direction ("what do I actually think?"), and these close on a behaviour
   * that already happened today. Each set ends on the same move — "what am I
   * calling X?" — because the competence always arrives wearing a virtue's
   * name, and naming that is most of the work.
   */
  reflexQuestions: string[];
  /** What this sign does when it is the practised pole, as verbs. */
  competence: string[];
  /**
   * Existing abilities repurposed toward the opposite pole. Written as
   * `from → into`, because the whole point is that nothing is discarded.
   *
   * `fromMode` and `intoMode` are the same claim in one word each, and they
   * are what makes a row legible at a glance: COMPARISON → JUDGMENT reads as a
   * transformation, where "Comparing perspectives → reach an independent
   * conclusion" reads as advice. The sentence underneath is then the
   * explanation of the pair rather than the whole row.
   *
   * `into` is written as an imperative with no "use it to" preamble, because
   * the arrow between the columns already says "use it to".
   */
  conversions: {
    fromMode: string;
    intoMode: string;
    from: string;
    into: string;
  }[];
  /** The mechanism that returns the person to this pole under uncertainty. */
  pullback: string;
  /**
   * What the return actually looks like from the inside — the concrete moves a
   * person can catch themselves making.
   *
   * The `pullback` sentence explains the loop; these are how you notice it is
   * running, which is the only part that is any use in the moment. Written as
   * behaviours rather than traits: "one more perspective before deciding" is
   * something you can observe yourself doing on a Tuesday, "indecisive" is not.
   */
  tells: string[];
  /** One imperative beat, for the headline strapline. */
  beat: string;
  /**
   * What the trajectory sounds like on each side of the axis.
   *
   * Named by pole rather than by "less" and "more", because the old names hid
   * a direction and half this table got it wrong: `less` has to be the voice of
   * the OPPOSITE sign — the competence being moved away from — and six of the
   * twelve entries were written as this sign's own shadow instead. Aries read
   * correctly ("I'll wait and see what everyone else thinks" is Libra), Libra
   * did not ("I don't mind, whatever works for you" is Libra again).
   *
   * With the fields named for their poles the mistake is hard to make: an entry
   * for Virgo has to put Pisces in `oldPole`, and that is now visible in the
   * shape rather than only in the intent.
   */
  expression: {
    /** The opposite sign speaking — the developed competence. */
    oldPole: string;
    /** This sign speaking, as the direction being developed. */
    developedPole: string;
  };
}

export const SIGN: Record<string, SignEntry> = {
  Aries: {
    mode: "Conviction",
    quality: "Self-directed conviction",
    movement: "Toward self-directed conviction",
    asks: "Aries asks for autonomy of judgement and action: initiating without first establishing consensus, choosing without exhaustively comparing the alternatives, and becoming comfortable occupying a position that is distinctly your own.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Aries asks for autonomy of judgement and action",
      items: [
        "Initiating without first establishing consensus",
        "Choosing without exhaustively comparing the alternatives",
        "Becoming comfortable occupying a position that is distinctly your own",
      ],
    },
    questions: [
      "What do I actually think?",
      "What do I want, before anyone else weighs in?",
      "What am I willing to start without agreement?",
      "Where am I waiting for permission I could give myself?",
      "What position would I take if I could not hide inside “both sides”?",
    ],
    reflexQuestions: [
      "What did I decide before I understood it?",
      "Where did I move just to stop standing still?",
      "What am I calling decisiveness?",
    ],
    competence: ["initiate", "assert", "contest", "decide"],
    conversions: [
      {
        fromMode: "Initiative",
        intoMode: "Consideration",
        from: "Going first",
        into: "Make it a considered first move rather than a reflex",
      },
      {
        fromMode: "Autonomy",
        intoMode: "Partnership",
        from: "Acting alone",
        into: "Choose solitude for the work it protects, not to avoid negotiation",
      },
      {
        fromMode: "Appetite",
        intoMode: "Discernment",
        from: "Appetite",
        into: "Let it tell you what you actually want",
      },
      {
        fromMode: "Directness",
        intoMode: "Candour",
        from: "Directness",
        into: "Say the unpopular thing, not merely the quick one",
      },
    ],
    pullback:
      "Under pressure this returns to speed — settle it now, move first, deal with the consequences later. The trap is not aggression; it is treating momentum as a substitute for a decision.",
    tells: [
      "Deciding before the question is clear",
      "Moving first to end the discomfort of not moving",
      "Treating momentum as agreement",
    ],
    beat: "Take a position",
    expression: {
      oldPole: "“I’ll wait and see what everyone else thinks.”",
      developedPole: "“Here is where I stand. I’ll adjust if I’m shown wrong.”",
    },
  },

  Libra: {
    mode: "Balance",
    quality: "Genuine mutuality",
    movement: "Toward genuine mutuality",
    asks: "Libra asks for the other person to become real rather than managed: negotiating as an equal instead of accommodating in advance, tolerating the discomfort of an unresolved disagreement, and letting a relationship have terms rather than merely having peace.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Libra asks for the other person to become real rather than managed",
      items: [
        "Negotiating as an equal instead of accommodating in advance",
        "Tolerating the discomfort of an unresolved disagreement",
        "Letting a relationship have terms rather than merely having peace",
      ],
    },
    questions: [
      "What would I ask for if I were not managing their reaction?",
      "Where am I keeping the peace instead of making an agreement?",
      "Whose perspective have I never actually asked for?",
      "What disagreement am I smoothing over rather than having?",
      "What would fairness look like if it included me?",
    ],
    reflexQuestions: [
      "Whose agreement am I waiting for?",
      "What did I smooth over instead of saying?",
      "What am I calling fairness?",
    ],
    competence: ["compare", "balance", "mediate", "accommodate"],
    conversions: [
      {
        fromMode: "Comparison",
        intoMode: "Judgment",
        from: "Comparing perspectives",
        into: "Reach an independent conclusion",
      },
      {
        fromMode: "Balance",
        intoMode: "Position",
        from: "Seeing both sides",
        into: "Build a more robust position",
      },
      {
        fromMode: "Attunement",
        intoMode: "Agency",
        from: "Reading the room",
        into: "Know exactly whose agreement you were waiting for",
      },
      {
        fromMode: "Negotiation",
        intoMode: "Advocacy",
        from: "Negotiating",
        into: "Argue for something of your own",
      },
      {
        fromMode: "Flexibility",
        intoMode: "Conviction",
        from: "Flexibility",
        into: "Test a conviction rather than avoid having one",
      },
    ],
    pullback:
      "Under uncertainty this returns to another perspective, another opinion, another round of weighing. The trap is not indecision — it is treating fairness as a reason to postpone a position.",
    tells: [
      "One more perspective before deciding",
      "Checking who else has weighed in",
      "Calling a position premature",
    ],
    beat: "Meet them as an equal",
    expression: {
      oldPole: "“I’ll just decide it myself — it’s quicker.”",
      developedPole: "“Here’s what I need. What do you need?”",
    },
  },

  Taurus: {
    mode: "Ground",
    quality: "Steadiness you build",
    movement: "Toward steadiness that is built rather than proved",
    asks: "Taurus asks for enough: a worth that does not require another round of demonstration, a pace the body can actually keep, and the patience to let something accumulate instead of being restarted.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Taurus asks for enough",
      items: [
        "A worth that does not require another round of demonstration",
        "A pace the body can actually keep",
        "The patience to let something accumulate instead of being restarted",
      ],
    },
    questions: [
      "What is already enough that I keep treating as insufficient?",
      "What am I building that would collapse if I stopped proving it?",
      "What would I keep if I stopped trying to intensify it?",
      "Where would slowness serve me better than depth?",
      "What do I value when nobody is watching me value it?",
    ],
    reflexQuestions: [
      "What am I holding that has stopped growing?",
      "Where did I take the safe version?",
      "What am I calling patience?",
    ],
    competence: ["hold", "steady", "accumulate", "persist"],
    conversions: [
      {
        fromMode: "Constancy",
        intoMode: "Commitment",
        from: "Staying put",
        into: "Make it a chosen commitment rather than an inability to move",
      },
      {
        fromMode: "Retention",
        intoMode: "Completion",
        from: "Holding on",
        into: "Finish things rather than avoid losing them",
      },
      {
        fromMode: "Steadiness",
        intoMode: "Depth",
        from: "Physical steadiness",
        into: "Let it become a pace instead of a resistance",
      },
      {
        fromMode: "Preference",
        intoMode: "Investment",
        from: "Knowing what you like",
        into: "Build a life with it, not just defend a taste",
      },
    ],
    pullback:
      "Under pressure this returns to what is already secured — the known asset, the settled arrangement, the thing that cannot be taken. The trap is not laziness; it is mistaking not-losing for building.",
    tells: [
      "Waiting until it feels secure",
      "Returning to what already works",
      "Calling caution patience",
    ],
    beat: "Let it be enough",
    expression: {
      oldPole: "“If it isn’t intense, it isn’t real.”",
      developedPole: "“This is enough to build on. I’ll build.”",
    },
  },

  Scorpio: {
    mode: "Depth",
    quality: "Depth held in common",
    movement: "Toward depth held in common",
    asks: "Scorpio asks you to be implicated: to want something you cannot secure alone, to let another person hold what matters, and to stop managing your own exposure as though safety were the point.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Scorpio asks you to be implicated",
      items: [
        "Want something you cannot secure alone",
        "Let another person hold what matters",
        "Stop managing your own exposure as though safety were the point",
      ],
    },
    questions: [
      "What am I keeping to myself that would be lighter if shared?",
      "Where am I controlling exposure instead of choosing trust?",
      "What would I have to admit wanting?",
      "What have I survived that I have never let anybody see?",
      "Whose hands am I unwilling to put this in?",
    ],
    reflexQuestions: [
      "What did I keep to myself today?",
      "Where did I test someone instead of trusting them?",
      "What am I calling discretion?",
    ],
    competence: ["investigate", "penetrate", "endure", "withhold"],
    conversions: [
      {
        fromMode: "Guardedness",
        intoMode: "Discretion",
        from: "Controlling exposure",
        into: "Choose deliberately who gets to see, rather than nobody",
      },
      {
        fromMode: "Perception",
        intoMode: "Disclosure",
        from: "Reading what is hidden",
        into: "Name a thing out loud instead of holding it",
      },
      {
        fromMode: "Intensity",
        intoMode: "Devotion",
        from: "Intensity",
        into: "Let it become commitment rather than surveillance",
      },
      {
        fromMode: "Self-sufficiency",
        intoMode: "Trust",
        from: "Self-sufficiency in crisis",
        into: "Be the one who can afford to ask for help",
      },
    ],
    pullback:
      "Under threat this returns to containment — hold it closer, tell less, handle it alone. The trap is not secrecy; it is treating exposure and danger as the same thing.",
    tells: [
      "Telling less than you know",
      "Handling it alone rather than explaining it",
      "Testing people instead of trusting them",
    ],
    beat: "Let someone in on it",
    expression: {
      oldPole: "“Let’s not stir anything up.”",
      developedPole: "“This matters to me and I want you in it.”",
    },
  },

  Gemini: {
    mode: "Inquiry",
    quality: "The plainly asked question",
    movement: "Toward the plainly asked question",
    asks: "Gemini asks for curiosity without a thesis: asking instead of knowing, staying with the near and the specific, and letting an answer be provisional rather than defended.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Gemini asks for curiosity without a thesis",
      items: [
        "Asking instead of knowing",
        "Staying with the near and the specific",
        "Letting an answer be provisional rather than defended",
      ],
    },
    questions: [
      "What do I not actually know here?",
      "What am I explaining that I should be asking about?",
      "Which specific, unglamorous detail have I skipped past?",
      "Who is right in front of me that I have not talked to?",
      "What would I learn if I stopped needing to be interesting?",
    ],
    reflexQuestions: [
      "What did I look up instead of deciding?",
      "Where did I explain rather than commit?",
      "What am I calling curiosity?",
    ],
    competence: ["connect", "articulate", "circulate", "improvise"],
    conversions: [
      {
        fromMode: "Collection",
        intoMode: "Selection",
        from: "Collecting",
        into: "Notice what is missing rather than accumulate",
      },
      {
        fromMode: "Explanation",
        intoMode: "Understanding",
        from: "Explaining",
        into: "Check your own understanding out loud",
      },
      {
        fromMode: "Mobility",
        intoMode: "Direction",
        from: "Mobility",
        into: "Let it become access rather than escape",
      },
      {
        fromMode: "Quickness",
        intoMode: "Inquiry",
        from: "Quickness",
        into: "Ask the next question instead of closing the topic",
      },
    ],
    pullback:
      "Under pressure this returns to more input — another source, another angle, another conversation. The trap is not shallowness; it is letting breadth stand in for a conclusion.",
    tells: [
      "Opening another source",
      "Explaining instead of concluding",
      "Calling breadth thoroughness",
    ],
    beat: "Ask the plain question",
    expression: {
      oldPole: "“Let me give you the wider context first.”",
      developedPole: "“Actually — what am I missing here?”",
    },
  },

  Sagittarius: {
    mode: "Meaning",
    quality: "A conviction worth staking",
    movement: "Toward a conviction worth staking",
    asks: "Sagittarius asks for a direction with a wager in it: a belief you will act on before it is proved, a frame large enough to be wrong at scale, and the willingness to go somewhere you cannot see the end of.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Sagittarius asks for a direction with a wager in it",
      items: [
        "A belief you will act on before it is proved",
        "A frame large enough to be wrong at scale",
        "The willingness to go somewhere you cannot see the end of",
      ],
    },
    questions: [
      "What do I believe that I have not acted on?",
      "What would I say if I were not qualifying it?",
      "Which larger frame have I been avoiding committing to?",
      "Where has thoroughness become a way of not deciding?",
      "What is the wager I have not placed?",
    ],
    reflexQuestions: [
      "What did I zoom out from?",
      "Where did I add context instead of a position?",
      "What am I calling perspective?",
    ],
    competence: ["range", "frame", "expound", "wander"],
    conversions: [
      {
        fromMode: "Range",
        intoMode: "Choice",
        from: "Reaching for the horizon",
        into: "Pick one and go, rather than keeping all of them open",
      },
      {
        fromMode: "Overview",
        intoMode: "Claim",
        from: "Explaining the whole",
        into: "Commit to one claim inside the whole",
      },
      {
        fromMode: "Optimism",
        intoMode: "Risk",
        from: "Optimism",
        into: "Let it fund a risk instead of postponing one",
      },
      {
        fromMode: "Restlessness",
        intoMode: "Discrimination",
        from: "Restlessness",
        into: "Leave what is finished, not what is difficult",
      },
    ],
    pullback:
      "Under pressure this returns to the wider view — zoom out, add context, keep options open. The trap is not vagueness; it is treating a bigger frame as a substitute for a stake in this one.",
    tells: [
      "Zooming out when asked to commit",
      "Adding context instead of a claim",
      "Keeping the option open one more week",
    ],
    beat: "Stake the belief",
    expression: {
      oldPole: "“There are a lot of ways to look at it.”",
      developedPole: "“I think this is true, and I’m acting on it.”",
    },
  },

  Cancer: {
    mode: "Care",
    quality: "Belonging you admit to needing",
    movement: "Toward belonging you admit to needing",
    asks: "Cancer asks for a private life worth returning to: needing people out loud, letting yourself be tended rather than only tending, and building a base instead of only a record.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Cancer asks for a private life worth returning to",
      items: [
        "Needing people out loud",
        "Letting yourself be tended rather than only tending",
        "Building a base instead of only a record",
      ],
    },
    questions: [
      "What do I need that I have never said plainly?",
      "Who takes care of me?",
      "What am I achieving instead of feeling?",
      "Where is home, and when did I last go there?",
      "What would I do if there were nothing to prove this week?",
    ],
    reflexQuestions: [
      "Whose needs did I attend to before my own?",
      "Where did I say I was fine?",
      "What am I calling care?",
    ],
    competence: ["tend", "protect", "remember", "hold close"],
    conversions: [
      {
        fromMode: "Care",
        intoMode: "Self-regard",
        from: "Tending others",
        into: "Turn the same attention on your own needs",
      },
      {
        fromMode: "Protection",
        intoMode: "Structure",
        from: "Protectiveness",
        into: "Let it build a home rather than a perimeter",
      },
      {
        fromMode: "Memory",
        intoMode: "Discernment",
        from: "Emotional memory",
        into: "Know what actually nourishes you",
      },
      {
        fromMode: "Loyalty",
        intoMode: "Choice",
        from: "Loyalty",
        into: "Let it be chosen rather than owed",
      },
    ],
    pullback:
      "Under strain this returns to caretaking — be the one who copes, who holds it together, who needs nothing. The trap is not softness; it is using care for others as a way of never being cared for.",
    tells: [
      "Attending to someone else's problem first",
      "Saying you are fine",
      "Becoming the one who copes",
    ],
    beat: "Come home to it",
    expression: {
      oldPole: "“I’ll handle it. That’s what I’m here for.”",
      developedPole: "“I need something here, and I’m going to ask for it.”",
    },
  },

  Capricorn: {
    mode: "Authority",
    quality: "Authority you own",
    movement: "Toward authority you own rather than endure",
    asks: "Capricorn asks you to stand behind the work: to accept the position rather than merely the workload, to build something with your name on it, and to let responsibility be chosen instead of absorbed.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Capricorn asks you to stand behind the work",
      items: [
        "Accept the position rather than merely the workload",
        "Build something with your name on it",
        "Let responsibility be chosen instead of absorbed",
      ],
    },
    questions: [
      "What am I responsible for that I have never claimed?",
      "Where am I doing the work without taking the role?",
      "What would I build if I expected it to outlast me?",
      "Whose authority am I waiting for?",
      "What is the long thing I keep deferring?",
    ],
    reflexQuestions: [
      "What did I take on instead of claiming?",
      "Where did I carry rather than lead?",
      "What am I calling responsibility?",
    ],
    competence: ["carry", "structure", "endure", "deliver"],
    conversions: [
      {
        fromMode: "Duty",
        intoMode: "Ownership",
        from: "Carrying it",
        into: "Carry something of your own, on the record",
      },
      {
        fromMode: "Reliability",
        intoMode: "Creation",
        from: "Reliability",
        into: "Build with it rather than only hold the line",
      },
      {
        fromMode: "Discipline",
        intoMode: "Ambition",
        from: "Self-discipline",
        into: "Point it at a long project instead of daily survival",
      },
      {
        fromMode: "Seriousness",
        intoMode: "Authority",
        from: "Seriousness",
        into: "Let it become authority rather than only weight",
      },
    ],
    pullback:
      "Under pressure this returns to duty — take on more, complain less, stay standing. The trap is not overwork; it is letting the burden substitute for the position it should have earned.",
    tells: [
      "Taking on more instead of taking the role",
      "Doing it rather than claiming it",
      "Calling the burden humility",
    ],
    beat: "Put your name on it",
    expression: {
      oldPole: "“I don’t want to let anyone down.”",
      developedPole: "“This is mine. I’ll answer for it.”",
    },
  },

  Leo: {
    mode: "Presence",
    quality: "Authorship you are seen in",
    movement: "Toward authorship you are willing to be seen in",
    asks: "Leo asks for a signature: making something that is recognisably yours, being seen on purpose rather than by accident, and letting delight be a sufficient reason.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Leo asks for a signature",
      items: [
        "Making something that is recognisably yours",
        "Being seen on purpose rather than by accident",
        "Letting delight be a sufficient reason",
      ],
    },
    questions: [
      "What would I make if no one graded it?",
      "Where am I hiding inside the group?",
      "What do I want credit for?",
      "What did I enjoy before it had to be useful?",
      "What would carry my name if I let it?",
    ],
    reflexQuestions: [
      "What did I perform instead of showing?",
      "Where did I hold the room to avoid being seen?",
      "What am I calling generosity?",
    ],
    competence: ["perform", "warm", "dramatise", "lead"],
    conversions: [
      {
        fromMode: "Command",
        intoMode: "Craft",
        from: "Holding the room",
        into: "Show the work rather than the self",
      },
      {
        fromMode: "Generosity",
        intoMode: "Appetite",
        from: "Generosity",
        into: "Let it include what you want",
      },
      {
        fromMode: "Presence",
        intoMode: "Authorship",
        from: "Presence",
        into: "Stand behind a thing you made",
      },
      {
        fromMode: "Approval",
        intoMode: "Conviction",
        from: "Loyalty to the audience",
        into: "Let it become loyalty to the work",
      },
    ],
    pullback:
      "Under scrutiny this returns to performance — be the one who carries it, entertain, take up the room. The trap is not vanity; it is letting being seen substitute for making something worth seeing.",
    tells: [
      "Performing instead of showing the work",
      "Making it about the room",
      "Crediting the group to avoid the exposure",
    ],
    beat: "Sign the work",
    expression: {
      oldPole: "“It was a group effort, really.”",
      developedPole: "“I made this, and I’m glad I did.”",
    },
  },

  Aquarius: {
    mode: "Contribution",
    quality: "The shared project",
    movement: "Toward the shared project",
    asks: "Aquarius asks you to join something: to hold a principle above a preference, to let the group's work matter more than your position in it, and to be one of many rather than the one.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Aquarius asks you to join something",
      items: [
        "Hold a principle above a preference",
        "Let the group's work matter more than your position in it",
        "Be one of many rather than the one",
      ],
    },
    questions: [
      "What am I part of that is larger than my role in it?",
      "Where is my preference standing in for a principle?",
      "Who benefits if this works and I get no credit?",
      "What would I do differently if I were not the centre of it?",
      "Which room have I stayed out of because I could not run it?",
    ],
    reflexQuestions: [
      "What did I step back from?",
      "Where did I observe instead of joining?",
      "What am I calling objectivity?",
    ],
    competence: ["detach", "systematise", "dissent", "observe"],
    conversions: [
      {
        fromMode: "Detachment",
        intoMode: "Belonging",
        from: "Standing apart",
        into: "Use the distance to see what the group needs, then join it",
      },
      {
        fromMode: "Principle",
        intoMode: "Organisation",
        from: "Holding the principle",
        into: "Let it organise a shared effort rather than only a judgement",
      },
      {
        fromMode: "Independence",
        intoMode: "Contribution",
        from: "Independence",
        into: "Contribute something nobody else will",
      },
      {
        fromMode: "Observation",
        intoMode: "Participation",
        from: "Observation",
        into: "Turn it into participation on your own terms",
      },
    ],
    pullback:
      "Under pressure this returns to distance — step back, analyse, decline to be implicated. The trap is not coldness; it is treating detachment as clarity when it is mostly safety.",
    tells: [
      "Stepping back to analyse",
      "Declining to be implicated",
      "Calling distance clarity",
    ],
    beat: "Join the effort",
    expression: {
      oldPole: "“If I’m not the one carrying it, why bother?”",
      developedPole: "“I’m in, and here’s the part I’ll take.”",
    },
  },

  Virgo: {
    mode: "Craft",
    quality: "Craft that is finished",
    movement: "Toward craft that is actually finished",
    asks: "Virgo asks for the useful small thing done and handed over: discrimination rather than dissolution, a standard you can meet, and work that ends instead of work that recedes.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Virgo asks for the useful small thing done and handed over",
      items: [
        "Discrimination rather than dissolution",
        "A standard you can meet",
        "Work that ends instead of work that recedes",
      ],
    },
    questions: [
      "What is good enough to ship today?",
      "Where is refinement postponing delivery?",
      "What is the concrete next action, not the ideal outcome?",
      "What am I dissolving into vagueness because precision would commit me?",
      "Who actually needs this, and what do they need it to do?",
    ],
    reflexQuestions: [
      "What did I refine instead of finishing?",
      "Where did I find a flaw that bought me time?",
      "What am I calling standards?",
    ],
    competence: ["refine", "discriminate", "repair", "serve"],
    conversions: [
      {
        fromMode: "Correction",
        intoMode: "Sufficiency",
        from: "Fixing",
        into: "Fix the thing in front of you, then stop",
      },
      {
        fromMode: "Standards",
        intoMode: "Completion",
        from: "High standards",
        into: "Use them to finish rather than to defer",
      },
      {
        fromMode: "Usefulness",
        intoMode: "Craft",
        from: "Usefulness",
        into: "Let it be a craft rather than an apology for existing",
      },
      {
        fromMode: "Scrutiny",
        intoMode: "Mercy",
        from: "Noticing flaws",
        into: "Turn it on the work, not on yourself",
      },
    ],
    pullback:
      "Under pressure this returns to another pass — tidy it, check it, improve it once more. The trap is not perfectionism in the abstract; it is using refinement to avoid the moment of handing something over.",
    tells: [
      "One more pass before it ships",
      "Finding the flaw that delays it",
      "Calling deferral standards",
    ],
    beat: "Finish and hand it over",
    expression: {
      oldPole: "“It’ll come together somehow.”",
      developedPole: "“It does the job. Here it is.”",
    },
  },

  Pisces: {
    mode: "Openness",
    quality: "What cannot be managed",
    movement: "Toward what cannot be managed",
    asks: "Pisces asks you to stop optimising: to let a thing be ambiguous without resolving it, to trust something you cannot verify, and to allow yourself an experience that has no use.",
    /** The same claim as `asks`, as the list it is written as. */
    asking: {
      stem: "Pisces asks you to stop optimising",
      items: [
        "Let a thing be ambiguous without resolving it",
        "Trust something you cannot verify",
        "Allow yourself an experience that has no use",
      ],
    },
    questions: [
      "What am I trying to fix that only needs to be felt?",
      "Where is my competence protecting me from something?",
      "What would I do if it did not have to be useful?",
      "What am I refusing to not-know?",
      "Where could I let go without anything actually breaking?",
    ],
    reflexQuestions: [
      "What did I dissolve into?",
      "Where did I become what the room needed?",
      "What am I calling acceptance?",
    ],
    competence: ["dissolve", "absorb", "imagine", "surrender"],
    conversions: [
      {
        fromMode: "Absorption",
        intoMode: "Information",
        from: "Absorbing the room",
        into: "Use it as information rather than obligation",
      },
      {
        fromMode: "Imagination",
        intoMode: "Making",
        from: "Imagination",
        into: "Let it produce something rather than only relieve",
      },
      {
        fromMode: "Compassion",
        intoMode: "Self-care",
        from: "Compassion",
        into: "Extend it inward on the same terms",
      },
      {
        fromMode: "Formlessness",
        intoMode: "Openness",
        from: "Formlessness",
        into: "Let it become openness rather than avoidance",
      },
    ],
    pullback:
      "Under strain this returns to dissolution — merge, absorb, become whatever the room needs. The trap is not weakness; it is that disappearing feels like peace.",
    tells: [
      "Becoming whatever the room needs",
      "Letting the edges blur",
      "Calling disappearance peace",
    ],
    beat: "Let it be unresolved",
    expression: {
      oldPole: "“I just need to understand it better first.”",
      developedPole: "“I don’t know, and I’m going anyway.”",
    },
  },
};
