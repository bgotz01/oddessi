/**
 * Shared vocabulary for the Career section.
 *
 * The grade tint lived in `career-strip`, which was fine while the strip was
 * the only thing that drew a grade. Four surfaces draw one now — the strip,
 * the tooltip, the reading panel and the scoring modal — and the tooltip is
 * rendered BY the strip, so importing the map back out of it made a cycle.
 * Nothing in this file imports a component, which is what keeps that from
 * happening again.
 */

import type { CareerWindowGrade } from "@/lib/career";

export const CAREER_GRADE_TINT: Record<CareerWindowGrade, string> = {
  active: "var(--color-patina-dim)",
  convergence: "var(--color-patina)",
  turningPoint: "var(--color-ember)",
};

/**
 * One height for every grade.
 *
 * The bars used to be 8, 17 and 28 pixels tall, ramping with the grade — which
 * is a magnitude encoding of the one thing on this page that is explicitly not
 * a magnitude. `windows.ts` spends its opening paragraph arguing that a grade
 * is a configuration with no size, and then the drawing said taller is bigger,
 * which is what a reader believes over any caption.
 *
 * Grade is carried by tint, and a turning point additionally by the tick above
 * the bar — a mark at a position rather than a difference in size.
 */
export const BAR = 14;
export const TICK = 3;
