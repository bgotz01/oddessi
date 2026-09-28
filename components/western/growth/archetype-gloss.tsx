"use client";

import type { ArchetypeExplained } from "@/lib/growth/archetypes";
import { T } from "@/components/western/growth/growth-ui";

/**
 * What a pole's archetype means: each role word with what it does, then what
 * the role looks like in practice. Fragments, because a role like "Witness /
 * Reconciler" needs unpacking, not an argument.
 */
export default function ArchetypeGloss({
  gloss,
  color,
}: {
  gloss: ArchetypeExplained;
  color?: string;
}) {
  const dot = (
    <span
      aria-hidden
      className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-bone-faint"
      style={color ? { background: color } : undefined}
    />
  );
  const label = `${T.micro} ${color ? "" : "text-bone-soft"}`;
  const tint = color ? { color } : undefined;

  return (
    <div className="space-y-6">
      <div>
        <p className={label} style={tint}>
          What it means
        </p>
        <ul className="mt-4 space-y-2.5">
          {gloss.terms.map(({ term, means }) => (
            <li key={term} className={`flex gap-3 ${T.body}`}>
              {dot}
              <span>
                <span className="text-bone">{term}</span> — {means}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={label} style={tint}>
          In practice
        </p>
        <ul className="mt-4 space-y-2.5">
          {gloss.inPractice.map((item) => (
            <li key={item} className={`flex gap-3 ${T.body}`}>
              {dot}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
