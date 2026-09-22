//components/western/compatibility/points.tsx
import type { ReactNode } from "react";
import { BULLET, T } from "./compatibility-ui";

/**
 * The page's one body-copy form.
 *
 * Everything readable on Compatibility is a list of points. That is a reading
 * decision rather than a style one: the page carries seven or so areas, two
 * activation directions, a dozen friction axes and a block of caveats, and
 * prose across that much surface gets skimmed — which on this page means
 * collecting an impression of a relationship without reading a single reason
 * for it. Points cannot be skimmed into a mood as easily. They also force the
 * copy to stop where the measurement stops, since there is nowhere for a
 * connective sentence to smuggle in a claim the engine never made.
 *
 * Prose survives in exactly two places, both deliberate: the code comments, and
 * the `framing` and `ask` strings handed to the council. Those are read by a
 * model, and a model given terse points fills the gaps between them itself,
 * which is the behaviour that text exists to prevent.
 */
export default function Points({
  items,
  tone = "body",
  color,
  className = "",
}: {
  items: readonly ReactNode[];
  tone?: "body" | "note" | "read";
  /** Overrides the marker colour. Used where the list itself carries a state. */
  color?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span
            aria-hidden
            className="datum shrink-0 select-none text-[0.75rem] leading-[1.6]"
            style={{ color: color ?? "var(--color-patina-dim)" }}
          >
            {BULLET}
          </span>
          <span className={T[tone]}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
