/**
 * Position-specific monikers for valid number × position combinations.
 *
 * A number supplies the character; a position determines how that character
 * is being read. These phrases are therefore not alternate definitions of the
 * numbers. They are compact applications of the canonical definition in
 * lexicon.ts through the question asked by each position.
 *
 * Position rules:
 *
 * - Life Path:
 *   The recurring terrain of the life. Phrase what the person is repeatedly
 *   called into or required to encounter. Do not turn the number's distortion
 *   into the Life Path itself; that belongs to the Challenge.
 *
 * - Expression:
 *   What the person is equipped to do. Phrase the number as an available
 *   capacity, ability, or way of acting.
 *
 * - Soul Urge:
 *   What is wanted underneath outward pursuit. Phrase the number as an inward
 *   desire rather than a visible behaviour or social role.
 *
 * - Personality:
 *   What others encounter first. Phrase the number as an outward impression,
 *   without implying that the impression describes the whole person.
 *
 * - Personal Year:
 *   The emphasis of one calendar year. Phrase the number as what the year
 *   favours, brings forward, or asks to be done.
 *
 * - Pinnacle:
 *   The standing condition of a long chapter. Phrase the number as the kind of
 *   chapter being entered, not as a personality trait or isolated event.
 *
 * - Challenge:
 *   The recurring friction within a chapter. Phrase the number as the capacity
 *   that becomes difficult to exercise cleanly.
 *
 * - Essence:
 *   What is temporarily active through the name. Phrase the number as a
 *   quality or capacity currently coming forward.
 *
 * Editorial rules:
 *
 * - Every phrase must be deducible from NUMBERS plus the relevant Position
 *   definition in lexicon.ts.
 * - Do not introduce a trait merely because it is traditionally associated
 *   with the number if it is absent from the canonical definition.
 * - Keep the core character and its distortion separate. A Life Path 4 is
 *   repeatedly called to build; rigidity is a possible difficulty of 4, not
 *   the definition of the Life Path itself.
 * - Master numbers extend their reductions rather than becoming unrelated
 *   archetypes: 11 extends 2, 22 extends 4, and 33 extends 6.
 * - Monikers should be short, concrete, and position-specific. Prefer a clear
 *   action or condition over an abstract personality label.
 * - Only combinations that can actually occur in this system are listed.
 * 
 * - Avoid repeating the canonical title or either action verb in the moniker
 *   when a more concrete positional expression is available. The title says
 *   what the number is; the verbs say what it does; the moniker should say
 *   what that means here.
 *
 * Validity:
 *
 * - 0 occurs only as a Challenge.
 * - Personal Years run from 1 through 9.
  * - Pinnacles cannot be 0 and preserve master numbers when they occur.
 * - Challenges use 0 through 9.
  * - Fixed name and birth numbers, and Essence, may preserve master numbers.
 *
 * The generic moniker on NumberEntry remains the fallback if a valid
  * combination has no specific phrase here.
 *
 * Format: `${number}:${position}` → phrase.
 */

import type { CoreNumber } from "./numbers";
import type { Position } from "./lexicon";
import { NUMBERS } from "./lexicon";

const DATA: Partial<Record<string, string>> = {
  // ─── 0 ────────────────────────────────────────────────────────────────────
  "0:challenge": "Struggle to define what must be worked through",

  // ─── 1 ────────────────────────────────────────────────────────────────────
  "1:lifePath": "Called to go first",
  "1:expression": "Equipped to act without waiting",
  "1:soulUrge": "Wants freedom to act independently",
  "1:personality": "Appears self-directed",
  "1:personalYear": "Time to begin something new",
  "1:pinnacle": "Chapter of new beginnings",
  "1:challenge": "Struggle to act independently",
  "1:essence": "Initiative currently active",

  // ─── 2 ────────────────────────────────────────────────────────────────────
  "2:lifePath": "Called into relationship",
  "2:expression": "Equipped to cooperate",
  "2:soulUrge": "Wants mutual understanding",
  "2:personality": "Appears receptive",
  "2:personalYear": "Time to cultivate partnership",
  "2:pinnacle": "Chapter of attunement",
  "2:challenge": "Struggle to hold a position",
  "2:essence": "Attunement currently active",

  // ─── 3 ────────────────────────────────────────────────────────────────────
  "3:lifePath": "Called to give inner material a form",
  "3:expression": "Equipped to create and communicate",
  "3:soulUrge": "Wants inner life expressed",
  "3:personality": "Appears lively and communicative",
  "3:personalYear": "Time to create and share",
  "3:pinnacle": "Chapter of expression",
  "3:challenge": "Struggle to carry expression to completion",
  "3:essence": "Creativity currently active",

  // ─── 4 ────────────────────────────────────────────────────────────────────
  "4:lifePath": "Called to make something that holds",
  "4:expression": "Equipped to build and sustain",
  "4:soulUrge": "Wants solid ground",
  "4:personality": "Appears reliable",
  "4:personalYear": "Time to lay foundations",
  "4:pinnacle": "Chapter of steady construction",
  "4:challenge": "Struggle to establish workable structure",
  "4:essence": "Structure currently active",

  // ─── 5 ────────────────────────────────────────────────────────────────────
  "5:lifePath": "Called into change",
  "5:expression": "Equipped to explore and adapt",
  "5:soulUrge": "Wants freedom to move",
  "5:personality": "Appears adaptable",
  "5:personalYear": "Time to move and explore",
  "5:pinnacle": "Chapter of movement and variety",
  "5:challenge": "Struggle to give freedom a direction",
  "5:essence": "Freedom currently active",

  // ─── 6 ────────────────────────────────────────────────────────────────────
  "6:lifePath": "Called to answer for what depends on you",
  "6:expression": "Equipped to care and sustain",
  "6:soulUrge": "Wants to care for what matters",
  "6:personality": "Appears dependable",
  "6:personalYear": "Time to tend what needs sustained care",
  "6:pinnacle": "Chapter of responsibility and care",
  "6:challenge": "Struggle to know what to answer for",
  "6:essence": "Responsibility currently active",

  // ─── 7 ────────────────────────────────────────────────────────────────────
  "7:lifePath": "Called to look beneath the surface",
  "7:expression": "Equipped to analyse and discern",
  "7:soulUrge": "Wants to know what is really there",
  "7:personality": "Appears reserved",
  "7:personalYear": "Time to study and look inward",
  "7:pinnacle": "Chapter of depth and reflection",
  "7:challenge": "Struggle to engage without certainty",
  "7:essence": "Introspection currently active",

  // ─── 8 ────────────────────────────────────────────────────────────────────
  "8:lifePath": "Called to make decisions that carry weight",
  "8:expression": "Equipped to take charge",
  "8:soulUrge": "Wants to achieve",
  "8:personality": "Appears in command",
  "8:personalYear": "Time to act on ambition",
  "8:pinnacle": "Chapter of consequence",
  "8:challenge": "Struggle to use power cleanly",
  "8:essence": "Power currently active",

  // ─── 9 ────────────────────────────────────────────────────────────────────
  "9:lifePath": "Called to make peace with endings",
  "9:expression": "Equipped to see the whole",
  "9:soulUrge": "Wants resolution",
  "9:personality": "Appears broad-minded",
  "9:personalYear": "Time to close what is finished",
  "9:pinnacle": "Chapter of endings and integration",
  "9:challenge": "Struggle to let go",
  "9:essence": "The long view currently active",

  // ─── 11 ───────────────────────────────────────────────────────────────────
  "11:lifePath": "Called to trust what arrives before explanation",
  "11:expression": "Equipped to notice what others miss",
  "11:soulUrge": "Wants to follow what is sensed",
  "11:personality": "Appears unusually perceptive",
  "11:pinnacle": "Chapter of heightened reception",
  "11:challenge": "Struggle to carry the signal without strain",
  "11:essence": "Intuition currently active",

  // ─── 22 ───────────────────────────────────────────────────────────────────
  "22:lifePath": "Called to make the large vision concrete",
  "22:expression": "Equipped to turn scale into structure",
  "22:soulUrge": "Wants to build something lasting",
  "22:personality": "Appears capable of large undertakings",
  "22:pinnacle": "Chapter of building beyond the individual",
  "22:challenge": "Struggle to match effort to vision",
  "22:essence": "Scale currently active",

  // ─── 33 ───────────────────────────────────────────────────────────────────
  "33:lifePath": "Called to serve beyond oneself",
  "33:expression": "Equipped to care beyond the immediate circle",
  "33:soulUrge": "Wants to uplift others",
  "33:personality": "Appears deeply caring",
  "33:pinnacle": "Chapter of care extending outward",
  "33:challenge": "Struggle to give without disappearing",
  "33:essence": "Far-reaching care currently active",
};

/**
 * Returns the position-specific moniker for a number.
 *
 * Falls back to the generic NumberEntry moniker when no specific phrase has
 * been defined. Callers should still ensure that the number × position
 * combination is valid for the calculation being displayed.
 */
export function getMoniker(n: CoreNumber, position: Position): string {
  return DATA[`${n}:${position}`] ?? NUMBERS[n].moniker;
}