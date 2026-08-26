//components/activation-method.tsx

"use client";

import { useEffect, useState } from "react";
import { INGREDIENT_LABEL, ACTIVATION_CAVEAT, SHARES, type Ingredient } from "@/lib/growth";
import { T } from "@/components/growth-ui";

/**
 * How the number is made, on request.
 *
 * Everything here used to be printed under the chart: a paragraph on the mean
 * node, a paragraph on what the index is and is not, a paragraph on what the
 * grades count. All of it true, none of it read — it is the small print of an
 * instrument, and small print under a chart is either scrolled past or, worse,
 * skimmed by someone who then believes the opposite of what it says.
 *
 * So it is a modal with one quiet way in. That is a real trade: a caveat
 * nobody opens protects nobody, and this page makes a measurement out of a sky
 * and owes the reader an account of how. The account is complete, it is one
 * click from the number it qualifies, and the two claims that matter most —
 * that the index measures pressure rather than alignment, and that a season is
 * classified rather than scored — are the first things in it.
 */
export default function ActivationMethod({
  feed,
}: {
  /** The cached span, which is the honest bound on everything here. */
  feed: { start: string; end: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ingredients = Object.keys(SHARES) as Ingredient[];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${T.tiny} text-bone-faint transition-colors hover:text-bone`}
      >
        How this is measured →
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-void/80"
          />
          <div className="relative max-h-[80vh] w-full max-w-xl overflow-y-auto border border-rule bg-surface px-10 py-9 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            <div className="flex items-start justify-between gap-6">
              <p className="inscription text-[1.5rem] leading-tight text-bone">
                How this is measured
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`${T.tiny} shrink-0 text-bone-faint transition-colors hover:text-bone`}
              >
                Close ✕
              </button>
            </div>

            <Section label="What the number is">
              A constructed index, 0–100, of how densely your growth direction
              is being activated at a moment. Not a probability, not a
              percentage of anything, and not a measure of how good, difficult
              or eventful a period will be.
            </Section>

            <Section label="Pressure, not alignment">
              {ACTIVATION_CAVEAT}
            </Section>

            <Section label="What it is built from">
              Six structural facts about the relationship between a transit and
              your growth axis, out of 100:{" "}
              {ingredients
                .map((k) => `${INGREDIENT_LABEL[k].toLowerCase()} ${SHARES[k]}`)
                .join(", ")}
              . Not one of them asks which planet it is — no planet is worth
              more than another here.
            </Section>

            <Section label="Seasons are classified, not scored">
              Quiet, Active, Convergence and Turning point count how many
              independent pressures converge and whether one of them lands on
              the axis itself. That is a fact about the chart, not a ranking: a
              dense convergence can implicate the direction more than a
              narrowly-defined turning point.
            </Section>

            <Section label="How precise it is">
              Cycle checkpoints use the mean node, about a month off the true
              one — read them as seasons, never as dates. Transits come from
              the cached ephemeris, which covers {feed.start.slice(0, 4)}–
              {feed.end.slice(0, 4)}; there is nothing outside those years
              whatever the sky is doing, so a quiet stretch at the edges is the
              data ending rather than your life.
            </Section>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p className={`${T.tiny} text-bone-faint`}>{label}</p>
      <p className={`${T.body} mt-2`}>{children}</p>
    </div>
  );
}
