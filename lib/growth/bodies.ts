/**
 * lib/growth/bodies.ts
 * What a body does to whatever ground it is standing on.
 *
 * Used for the deep-pattern layer, where a planet sitting in one of the nodal
 * houses says the territory is not generic. A third house with Pluto in it is
 * not "casual exchange of information", it is investigation that does not stop
 * until it reaches the bottom — and the whole developmental story changes.
 *
 * Deliberately NOT the same dictionary as `crossing.ts`. A body standing on
 * nodal ground and a body square the axis answer different questions, and one
 * table serving both would have to blur them.
 *
 * Pure data.
 */

/**
 * What a body does to whatever ground it is standing on.
 *
 * Used only for the deep-pattern layer, where a planet sitting in one of the
 * nodal houses says the territory is not generic. A third house with Pluto in
 * it is not "casual exchange of information", it is investigation that does not
 * stop until it reaches the bottom, and the whole developmental story changes.
 */
export const BODY_VERBS: Record<
  string,
  { verbs: string[]; beat: string; charge: string; noun: string }
> = {
  Sun: { verbs: ["illuminate", "centre", "claim"], beat: "Own it plainly", charge: "identity is staked on this ground", noun: "identity" },
  Moon: { verbs: ["feel", "tend", "remember"], beat: "Feel your way in", charge: "this ground is where you go for safety", noun: "attachment" },
  Mercury: { verbs: ["name", "link", "explain"], beat: "Work it out in words", charge: "this ground is worked through language", noun: "inquiry" },
  Venus: { verbs: ["value", "attract", "harmonise"], beat: "Find what is worth it", charge: "this ground is where pleasure and worth are decided", noun: "taste" },
  Mars: { verbs: ["push", "cut", "contest"], beat: "Push at it", charge: "this ground is fought over", noun: "contest" },
  Jupiter: { verbs: ["enlarge", "believe", "range"], beat: "Let it get bigger", charge: "this ground keeps expanding beyond its brief", noun: "expansion" },
  Saturn: { verbs: ["hold", "endure", "structure"], beat: "Do the slow work", charge: "this ground has cost something and is defended", noun: "endurance" },
  Uranus: { verbs: ["break", "invert", "free"], beat: "Break the pattern", charge: "this ground will not stay conventional", noun: "disruption" },
  Neptune: { verbs: ["dissolve", "imagine", "merge"], beat: "Let it blur", charge: "this ground resists having firm edges", noun: "immersion" },
  Pluto: { verbs: ["investigate", "expose", "deconstruct"], beat: "Investigate deeply", charge: "this ground is dug at until it gives way", noun: "investigation" },
  Chiron: { verbs: ["wound", "tend", "teach"], beat: "Turn the injury outward", charge: "this ground is where the injury and the skill are the same", noun: "the injury" },
};
