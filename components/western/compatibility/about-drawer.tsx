//components/western/compatibility/about-drawer.tsx
"use client";

import type { Signature } from "@/lib/synastry";
import Drawer from "./drawer";
import Points from "./points";
import { T } from "./compatibility-ui";

/**
 * Everything the page used to explain about itself, in one place.
 *
 * Four intro points, a methodology block, a note about what a lens can and
 * cannot change, and a paragraph about overlapping areas were spread across the
 * surface — roughly a screen of type that a reader passes on the way to the
 * thing they came for, and reads once at most. It is all still here, because
 * none of it is optional if the numbers are to be trusted. It is just no longer
 * standing between the reader and the reading.
 */
export default function AboutDrawer({
  signature,
  onClose,
}: {
  signature: Signature;
  onClose: () => void;
}) {
  return (
    <Drawer eyebrow="Compatibility" title="How to read this" onClose={onClose}>
      <Points
        className="mt-7"
        tone="read"
        items={[
          "Two charts, read against each other",
          "Not a compatibility score",
          "How strongly these two activate each other, and how easily that runs, are different questions",
        ]}
      />

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-patina`}>The two axes</p>
        <Points
          className="mt-4"
          items={[
            "Chemistry — the eight strongest cross-chart contacts, weighted by aspect, by the bodies involved and by how exact each one is",
            "It says how much the two charts touch, and nothing about whether that is welcome",
            "Ease — trines and sextiles against squares and oppositions, across every counted contact rather than the loudest eight",
            "It says what the contact is like, and nothing about how much there is",
            "The cell is where they cross, never an average",
            "Chemistry is a percentile against unrelated pairings of these same charts, so 50 is typical",
          ]}
        />
      </div>

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-patina`}>What a lens changes</p>
        <Points
          className="mt-4"
          items={[
            "Which areas are read, and how the reading is framed",
            "And the headline, which is scored from those areas' contacts and nothing else",
            "So the four lenses give four different readings of the same two charts",
            "A high score is not a recommendation — it says which pairs of bodies these charts connect, not what anyone should do",
          ]}
        />
      </div>

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-patina`}>The areas</p>
        <Points
          className="mt-4"
          items={[
            "They overlap — one contact is evidence for more than one",
            "Readings of a single body of evidence, not slices of a whole",
            "They do not add up to anything",
            `This reading rests on ${signature.contactCount} counted contact${signature.contactCount === 1 ? "" : "s"}`,
          ]}
        />
      </div>

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-ember`}>What it does not measure</p>
        <Points
          className="mt-4"
          color="var(--color-ember)"
          items={[
            "How either person was raised, or what either wants",
            "How either behaves under pressure, or what they have already survived",
            "Whether they are kind to each other",
            "Most of what decides a relationship is not in a chart",
          ]}
        />
      </div>
    </Drawer>
  );
}
