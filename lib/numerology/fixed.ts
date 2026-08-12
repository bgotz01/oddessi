/**
 * Fixed number interpretations — what each position means when a number holds
 * for a whole life rather than a chapter or a year.
 *
 * The four fixed numbers are structurally different from the moving ones: they
 * cannot be waited out and they do not take turns. The life path is the terrain;
 * the expression is the equipment; the soul urge is the want underneath the
 * pursuit; the personality is the edge the world sees first. Each position asks
 * something different about the same number, and the readings here are written
 * from inside those questions rather than from the number's general character.
 */

import type { CoreNumber } from "./numbers";

export interface FixedReading {
  /**
   * What the number means in this position for a whole life — the condition it
   * describes rather than the verdict it delivers.
   */
  reading: string;
  /**
   * What tends to be available to a person living with this number here —
   * the capacities or circumstances that come with it.
   */
  available: string;
  /**
   * What tends to be difficult — not a flaw, but the recurring friction
   * specific to this number in this position.
   */
  friction: string;
}

export const LIFE_PATH_READINGS: Record<CoreNumber, FixedReading> = {
  0: {
    reading:
      "An open terrain — no single condition is written in. The life is not handed a defining difficulty or a defining gift from the date, which is its own difficulty: nothing imposes a direction.",
    available: "Complete latitude in how the life is shaped.",
    friction: "No alibi. The absence of an imposed condition means the choices have to be made without the explanation that difficulty provides.",
  },
  1: {
    reading:
      "A life that keeps being handed a blank page and asked to write something on it. The terrain is originality — not as a talent, but as a recurring demand. The question is not whether the person is creative; it is whether they can act without waiting to be asked.",
    available:
      "Independence, the capacity for original work, and a native authority in situations that have no precedent.",
    friction:
      "The same independence that makes starting easy makes partnership hard. The life keeps generating situations where collaboration is necessary and the instinct is to go alone.",
  },
  2: {
    reading:
      "A life organised around relationship — not in the sense that romance is the subject, but in the sense that almost everything that matters here arrives through another person or leaves through the crack between two people. The terrain is attunement.",
    available:
      "Sensitivity to other people that operates as a genuine skill, and the patience to hold a situation without forcing it.",
    friction:
      "The same sensitivity makes conflict feel disproportionately costly. The life keeps asking the person to hold a position, and the holding keeps costing more than it should.",
  },
  3: {
    reading:
      "A life in which the work is always, in some form, making something and showing it. The terrain is expression — and the difficulty is not starting, which is easy, but the gap between what is felt and what the made thing actually contains.",
    available:
      "Fluency, charm, and the ability to reach people through the thing made or said.",
    friction:
      "Dispersal. The appetite for expression tends to scatter across many starts and few completions, and the pleasantness of the surface can substitute for the depth that is not yet there.",
  },
  4: {
    reading:
      "A life built in courses, each on the one beneath it. The terrain is construction — the slow, reliable making of things that hold. The difficulty is that the builder does not always know when to stop building.",
    available:
      "Staying power, structural clarity, and the ability to make something that outlasts the effort required to make it.",
    friction:
      "Rigidity. The same qualities that make the structure sound make it hard to dismantle when the structure has become the problem.",
  },
  5: {
    reading:
      "A life in motion — not as a failing but as the terrain. The question is not why the person keeps moving; it is what the movement is toward, and whether it has a direction or only a velocity.",
    available:
      "Range, adaptability, and the ability to learn fast from contact with the world.",
    friction:
      "Incompletion. The appetite for new experience makes the familiar feel like a trap, and the life can spend decades in motion without arriving anywhere.",
  },
  6: {
    reading:
      "A life organised around responsibility — the kind taken up before anyone assigns it. The terrain is care, and the difficulty is the line between what is freely given and what is owed.",
    available:
      "Genuine usefulness to other people, and the ability to hold a space that others need.",
    friction:
      "Overreach. The life keeps confusing responsibility with identity, and what began as care can calcify into obligation that is no longer chosen.",
  },
  7: {
    reading:
      "A life oriented toward depth rather than breadth, with the distance that requires. The terrain is understanding — real understanding, arrived at slowly, rather than the kind that comes from being in the room.",
    available:
      "Analytical clarity and the patience to follow a question all the way down.",
    friction:
      "Isolation. The withdrawal that makes thinking possible makes connection difficult, and what arrives as perspective can become suspicion.",
  },
  8: {
    reading:
      "A life of consequence — one in which what is done has weight, and the weight lands. The terrain is power in the material sense: resources, structures, authority, and the responsibility those carry.",
    available:
      "Executive capacity and the ability to move large things, sustain authority, and organise effort at scale.",
    friction:
      "The same capacity for consequence applies to failure as to success. The life also tends to measure everything — including things that resist measurement — long past the point where the measuring is useful.",
  },
  9: {
    reading:
      "A life with a wide view and a recurring pressure toward release. The terrain is completion — not endings imposed from outside, but the internal work of letting something that has run long enough come to an end.",
    available:
      "Breadth of perspective and a genuine capacity for generosity.",
    friction:
      "Resistance to the release the life keeps asking for. The person living this path will find, repeatedly, that they are holding on past the moment the terrain was asking them to let go.",
  },
  11: {
    reading:
      "A life under heightened signal — the 2's attunement running at a pitch where it stops being a social skill and becomes something closer to reception. The terrain is the gap between what is perceived and what can be named.",
    available:
      "Unusual perceptual clarity and the capacity to transmit or inspire something that matters.",
    friction:
      "The nervous system. What arrives as insight also arrives as sensitivity to everything, and the life tends to exhaust the person in ways that look like nothing from the outside.",
  },
  22: {
    reading:
      "A life at scale — the 4's building instinct pointed at something too large to finish alone. The terrain is the sustained commitment to a significant goal, across years in which the goal is not yet visible.",
    available:
      "The capacity to organise sustained effort around something that matters, and to attract the collaboration it requires.",
    friction:
      "The gap between the ambition and what is actually being done on any given day. The life asks for the discipline to keep working on something large enough that progress is rarely visible.",
  },
  33: {
    reading:
      "A life of unconditional service — the 6's responsibility extended past the household to whoever is in front of it. The terrain is the line between giving and disappearing.",
    available:
      "The capacity to give without keeping score, and to be genuinely present to other people's suffering.",
    friction:
      "Erasure. The life makes it possible to disappear into the needs of others and to mistake that disappearance for virtue.",
  },
};

export const EXPRESSION_READINGS: Record<CoreNumber, FixedReading> = {
  0: {
    reading: "No single capacity is announced by the name — which is not the absence of equipment, but the absence of a fixed one. The tools are chosen rather than given.",
    available: "Flexibility: no single channel is overdeveloped at the expense of the others.",
    friction: "The absence of a dominant capacity can make it hard to know which direction to develop.",
  },
  1: {
    reading:
      "The name announces someone equipped to initiate — to begin things, lead things, and stand at the front of whatever they are doing. The equipment is original rather than collaborative.",
    available: "The ability to act without precedent and to carry a room by going first.",
    friction: "The same equipment that makes starting easy makes sustaining a joint effort difficult. The expression tends to dominate rather than share.",
  },
  2: {
    reading:
      "The name announces someone equipped for partnership — the ability to read a situation accurately, to calibrate, and to make others feel met. The equipment is relational rather than originating.",
    available: "Diplomacy, attunement, and the ability to hold two positions without forcing a resolution.",
    friction: "The expression can absorb the room rather than add to it, and the diplomacy can tip into avoidance.",
  },
  3: {
    reading:
      "The name announces someone equipped to make and communicate — to turn what is felt into what can be shown. The expression is inherently outward: it completes itself in the showing.",
    available: "Fluency, charm, and the capacity to reach people through a made thing.",
    friction: "The equipment produces starts more readily than completions, and the social ease can substitute for the depth that is not yet there.",
  },
  4: {
    reading:
      "The name announces someone equipped to build — to take a plan and execute it steadily, without losing the thread over months and years. The expression is patient and structural.",
    available: "Reliability, organisation, and the ability to make things that hold up.",
    friction: "The expression can turn inflexible when the structure it built is the problem, and the discipline can become an end in itself.",
  },
  5: {
    reading:
      "The name announces someone equipped for range — the ability to move between contexts, learn fast, and remain useful in conditions that would strand a more fixed equipment.",
    available: "Adaptability and a genuine appetite for experience that other expressions treat as disruption.",
    friction: "The expression produces breadth more readily than depth, and the range can become a way of never finishing anything.",
  },
  6: {
    reading:
      "The name announces someone equipped for responsibility — the ability to hold a space, tend a relationship, and be genuinely useful in ways that require showing up consistently.",
    available: "Care that is substantive rather than performed, and the capacity to sustain it over time.",
    friction: "The expression can take on more than it was asked for, and the care can calcify into control when it is not examined.",
  },
  7: {
    reading:
      "The name announces someone equipped for depth — the ability to follow a question further than most people want to, and to stay with the thing until it yields.",
    available: "Analytical precision and the patience to understand rather than to conclude.",
    friction: "The expression can pull away from the room rather than toward it, and the depth can become a way of not being accountable to anyone.",
  },
  8: {
    reading:
      "The name announces someone equipped for authority — the ability to assess what things are worth, move resources, and sustain the kind of competence that does not require external validation.",
    available: "Executive capacity and a native understanding of how power and resources work.",
    friction: "The expression can reduce everything to its consequence, and the authority can become the measure of everything rather than the means to something.",
  },
  9: {
    reading:
      "The name announces someone equipped for breadth — the wide view, the ability to see across a situation rather than through it, and the generosity that comes from not needing to win.",
    available: "Perspective, inclusiveness, and the capacity for genuine generosity.",
    friction: "The expression can hold on privately while releasing publicly, and the breadth can become a way of never committing to anything in particular.",
  },
  11: {
    reading:
      "The name announces someone equipped with a heightened relational sensitivity — not a social skill exactly, but a kind of reception that picks up what others produce without meaning to.",
    available: "The ability to sense what is happening before it is said, and to transmit something that others recognise without knowing why.",
    friction: "The equipment can overwhelm the person carrying it, and the sensitivity is indiscriminate: it picks up everything, not only the signal.",
  },
  22: {
    reading:
      "The name announces someone equipped at scale — the 4's building capacity directed at something that will outlast any single effort or any single collaboration.",
    available: "The capacity to organise large, sustained effort and to hold the vision of it across years.",
    friction: "The equipment can produce more foundation than building, and the scale of the ambition can make the ordinary work feel insufficient.",
  },
  33: {
    reading:
      "The name announces someone equipped for service — care extended past the personal into something more like a vocation. The equipment is generous to the point of difficulty.",
    available: "The capacity to give without keeping score and to be present to others in ways they can feel.",
    friction: "The expression can disappear into the service, and what looks like generosity can be a way of not remaining for oneself.",
  },
};

export const SOUL_URGE_READINGS: Record<CoreNumber, FixedReading> = {
  0: {
    reading: "No single want is named beneath the surface — which is not the absence of desire, but the absence of a fixed one. What is wanted has to be found rather than followed.",
    available: "Freedom from a single overriding drive that would narrow everything else.",
    friction: "The want can be genuinely hard to locate, which makes it hard to move toward.",
  },
  1: {
    reading:
      "Underneath what is pursued: the want to act from one's own centre, without waiting for direction or permission. What is actually wanted is autonomy — the room to begin something that is entirely one's own.",
    available: "Clarity about direction when the external noise is removed.",
    friction: "The want for independence can make intimacy feel like a diminishment, even when it is not.",
  },
  2: {
    reading:
      "Underneath what is pursued: the want to be in genuine connection — to be met, understood, and to matter to another specific person. Not the want to be loved generally, but to be known.",
    available: "A real capacity for depth in relationship, when the connection is safe enough.",
    friction: "The want to be known can make the surface — the personality, the performance — feel like a betrayal of what is underneath it.",
  },
  3: {
    reading:
      "Underneath what is pursued: the want to express something — to make something that carries what is felt, and to have it reach the person it was made for. Not recognition exactly; arrival.",
    available: "A genuine creative appetite that does not require an audience to justify itself.",
    friction: "The gap between what is felt and what the made thing actually contains is felt more acutely here than anywhere else.",
  },
  4: {
    reading:
      "Underneath what is pursued: the want for stability — a ground that does not move. Not comfort necessarily, but the kind of security that comes from having built something solid enough to stand on.",
    available: "A patience and steadiness in building things that other wants find exhausting.",
    friction: "The want for stability can make change feel like a threat even when the structure is the problem.",
  },
  5: {
    reading:
      "Underneath what is pursued: the want for freedom — not from responsibility, but from the feeling that one is fixed. The actual want is for range: the ability to go somewhere new without asking.",
    available: "An appetite for experience that makes the person genuinely interesting to themselves.",
    friction: "The want for freedom can make commitment feel like a cage, even a commitment that was freely entered.",
  },
  6: {
    reading:
      "Underneath what is pursued: the want to be needed — not admired, not powerful, but genuinely needed by people who matter. The actual want is to be the person someone turns to.",
    available: "A real capacity for care that does not need to perform itself.",
    friction: "The want to be needed can make the relationship between care and control hard to examine.",
  },
  7: {
    reading:
      "Underneath what is pursued: the want to understand — not to be educated, but to actually know something, all the way down. The actual want is for a depth of comprehension that the surface of life rarely provides.",
    available: "The patience to follow a question until it yields, and to tolerate not knowing while it does.",
    friction: "The want for understanding can make the world of people and events feel shallow, and the withdrawal it requires can become the habit.",
  },
  8: {
    reading:
      "Underneath what is pursued: the want for mastery — not power over others, but the kind of authority that comes from genuinely knowing what something is worth. The actual want is competence in the fullest sense.",
    available: "A drive toward real excellence that does not settle for the appearance of it.",
    friction: "The want for mastery can turn the world into a set of measures, and the person into the thing being measured.",
  },
  9: {
    reading:
      "Underneath what is pursued: the want to matter in a wide sense — not to be recognised, but to have contributed something that outlasts the contribution. The actual want is significance.",
    available: "A genuine capacity for generosity that does not come from having enough.",
    friction: "The want for significance can make the ordinary moments of a life feel insufficient, even when they are the life.",
  },
  11: {
    reading:
      "Underneath what is pursued: the want for something that cannot quite be named — a quality of experience, a register of aliveness, that the ordinary world does not reliably provide. The actual want is intensity, in the direction of meaning.",
    available: "A sensitivity to what matters that bypasses most of the usual mediations.",
    friction: "The want is hard to satisfy because it is hard to name, and the person living with it can spend years in the wrong direction before finding the right one.",
  },
  22: {
    reading:
      "Underneath what is pursued: the want to build something that matters at scale — not a personal achievement, but a contribution large enough to require more than one life's worth of effort.",
    available: "A vision that can sustain effort across years in which the outcome is not yet visible.",
    friction: "The want can make the ordinary work feel inadequate, and the scale of the ambition can become a way of never beginning.",
  },
  33: {
    reading:
      "Underneath what is pursued: the want to give — not to be generous occasionally, but to be the kind of person for whom giving is the natural state. The actual want is to be of service in a way that costs something.",
    available: "A genuine selflessness that is not performed.",
    friction: "The want can make self-preservation feel like selfishness, and the giving can become a way of not remaining.",
  },
};

export const PERSONALITY_READINGS: Record<CoreNumber, FixedReading> = {
  0: {
    reading: "No single quality arrives in the room before anything is said — which means the first impression is a blank that others fill with their own projections.",
    available: "The ability to be whatever the situation calls for, without a fixed persona in the way.",
    friction: "The absence of a clear outer manner can make the person hard to place, and others often fill the gap incorrectly.",
  },
  1: {
    reading:
      "What arrives before anything is said: someone who is going to go first. The edge of the name is decisive, self-contained, and slightly ahead of where everyone else is standing.",
    available: "Authority that does not need to announce itself — it is already present in the bearing.",
    friction: "The manner can read as indifference to collaboration even when it is not, and people take it personally.",
  },
  2: {
    reading:
      "What arrives before anything is said: someone who is paying attention. The edge of the name is responsive, careful, and calibrated to the room rather than to itself.",
    available: "The ability to put people immediately at ease, and to read what is needed before it is asked.",
    friction: "The manner can read as without opinion, and people take the diplomacy for agreement when it is not.",
  },
  3: {
    reading:
      "What arrives before anything is said: warmth and fluency. The edge of the name is expressive, engaging, and slightly in motion — it communicates before any content has been offered.",
    available: "The ability to make a room receptive before anything real has been said.",
    friction: "The manner can read as all surface, and people discount what is underneath because the surface was so easy.",
  },
  4: {
    reading:
      "What arrives before anything is said: solidity. The edge of the name is measured, deliberate, and not in a hurry — it communicates that whatever follows has been thought through.",
    available: "Immediate credibility in situations where reliability is what is needed.",
    friction: "The manner can read as inflexible, and people sometimes stop asking before the person has had the chance to be otherwise.",
  },
  5: {
    reading:
      "What arrives before anything is said: restlessness and range. The edge of the name is alert, variable, and interested in more than one thing at once — it communicates appetite.",
    available: "An immediate liveliness that makes others want to be in the conversation.",
    friction: "The manner can read as uncommitted, and people sometimes do not take the depth seriously because the surface moves so fast.",
  },
  6: {
    reading:
      "What arrives before anything is said: warmth and care. The edge of the name is attentive, responsible, and oriented toward the other — it communicates that the person is going to show up.",
    available: "An immediate trustworthiness that others feel before they can account for it.",
    friction: "The manner invites need, and the person can find themselves responsible for things they did not offer to hold.",
  },
  7: {
    reading:
      "What arrives before anything is said: reserve. The edge of the name is contained, observant, and not immediately available — it communicates that it is watching before it is joining.",
    available: "An authority that comes from obvious depth — people sense that there is more being withheld than shown.",
    friction: "The manner can read as cold or dismissive before any content has been offered, and people give up before the person has had the chance to open.",
  },
  8: {
    reading:
      "What arrives before anything is said: competence. The edge of the name is assured, direct, and organised around outcome — it communicates that the person has already assessed the situation.",
    available: "Immediate credibility in any context where authority is relevant.",
    friction: "The manner can read as dominating even when it is not, and people sometimes position themselves in opposition before anything has been asked.",
  },
  9: {
    reading:
      "What arrives before anything is said: spaciousness. The edge of the name is wide, unhurried, and oriented toward the whole rather than the particular — it communicates that the person is not competing.",
    available: "An immediate sense of safety that makes others willing to say things they would not elsewhere.",
    friction: "The manner can read as diffuse, and people sometimes do not take the particulars seriously because the bearing is so general.",
  },
  11: {
    reading:
      "What arrives before anything is said: intensity. The edge of the name carries a charge that other people feel before they understand it — it communicates that what is underneath is not ordinary.",
    available: "An immediate presence that others find difficult to ignore or discount.",
    friction: "The intensity can be felt as pressure, and people sometimes pull back from what they cannot account for.",
  },
  22: {
    reading:
      "What arrives before anything is said: scale. The edge of the name communicates that the person is oriented toward something larger than the room — it reads as ambition, even when that is not what is being offered.",
    available: "An immediate seriousness that others take at its word.",
    friction: "The manner can read as remote or self-important, and people sometimes feel they cannot approach it.",
  },
  33: {
    reading:
      "What arrives before anything is said: generosity. The edge of the name is open, warm, and directed outward — it communicates that the person is going to give something before they are asked.",
    available: "An immediate sense of welcome that others feel as unusual.",
    friction: "The manner invites disclosure, and the person can find themselves holding more of other people's inner lives than they intended.",
  },
};
