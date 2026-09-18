"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import {
  LOVE_WINDOW_LABEL,
  interpretLoveWindow,
  type LoveProfile,
  type LoveTimeline,
  type LoveWindowKind,
} from "@/lib/love";
import {
  ROMANCE_T as T,
  bulletValue,
  sectionOf,
} from "./romance-ui";

const STATUSES = [
  { id: "single", label: "Single" },
  { id: "dating", label: "Dating" },
  { id: "relationship", label: "In a relationship" },
  { id: "transition", label: "In transition" },
  { id: "self", label: "Self-reflection" },
] as const;

type RelationshipStatus = (typeof STATUSES)[number]["id"];

const STATUS_FRAME: Record<RelationshipStatus, string> = {
  single: "Standards, availability and openness.",
  dating: "Pace, expectations and what interaction reveals.",
  relationship: "Habits, agreements and shared responsibility.",
  transition: "What ends here—and what you carry forward.",
  self: "Reflection, clearer language and different choices.",
};

const NOTICE: Record<LoveWindowKind, string> = {
  attraction: "What creates the pull. What it does not prove.",
  romance: "The balance between play and certainty.",
  partnership: "Where mutuality is welcome. Where distance protects.",
  commitment: "What needs a shape. What stays undefined.",
};

const ASK: Record<LoveWindowKind, string> = {
  attraction: "What value or unmet need does this attraction reveal?",
  romance: "What pace lets interest develop honestly?",
  partnership: "What stays individual? What becomes shared?",
  commitment: "What shape would be honest now?",
};

const PRACTICE: Record<LoveWindowKind, string> = {
  attraction: "Follow curiosity. Delay conclusions.",
  romance: "Create pleasure without demanding certainty.",
  partnership: "Name one need for closeness and one for independence.",
  commitment: "Name the decision being postponed.",
};

function natalAnchor(profile: LoveProfile, kind: LoveWindowKind): string {
  if (kind === "attraction") {
    return bulletValue(sectionOf(profile, "attraction"), "Drawn to");
  }
  if (kind === "romance") {
    return bulletValue(sectionOf(profile, "romance"), "Courtship reads as");
  }
  if (kind === "partnership") {
    return bulletValue(sectionOf(profile, "partnership"), "Needs");
  }
  return bulletValue(sectionOf(profile, "commitment"), "Commits given");
}

export default function CurrentSituation({
  profile,
  timeline,
}: {
  profile: LoveProfile;
  timeline: LoveTimeline;
}) {
  const [status, setStatus] = useState<RelationshipStatus | null>(null);
  const window = timeline.open[0] ?? timeline.next;
  const statusLabel = STATUSES.find((entry) => entry.id === status)?.label;

  return (
    <section className="mt-16">
      <SectionHeading compact>Current situation</SectionHeading>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Relationship status">
        {STATUSES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={status === entry.id}
            onClick={() => setStatus(entry.id)}
            className={`border px-4 py-2.5 ${T.tiny} transition-colors ${
              status === entry.id
                ? "border-patina bg-patina-deep text-bone"
                : "border-rule text-bone-faint hover:border-bone-faint hover:text-bone"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {!status ? (
        <p className={`${T.note} mt-7`}>Choose your current status.</p>
      ) : window ? (
        <div className="mt-9 border-y border-rule py-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="inscription text-[1.375rem] tracking-[0.08em] text-bone">
              {LOVE_WINDOW_LABEL[window.kind]} · {statusLabel}
            </h3>
            <p className={`${T.note}`}>{interpretLoveWindow(window).dates}</p>
          </div>

          <div className="mt-8 grid gap-px bg-rule-faint sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-void p-5">
              <p className={`${T.micro} text-patina`}>Your layer</p>
              <p className={`${T.read} mt-3`}>{natalAnchor(profile, window.kind)}</p>
              <p className={`${T.note} mt-3`}>{STATUS_FRAME[status]}</p>
            </div>
            <div className="bg-void p-5">
              <p className={`${T.micro} text-bone-faint`}>Notice</p>
              <p className={`${T.body} mt-3`}>{NOTICE[window.kind]}</p>
            </div>
            <div className="bg-void p-5">
              <p className={`${T.micro} text-bone-faint`}>Ask</p>
              <p className={`${T.read} mt-3`}>{ASK[window.kind]}</p>
            </div>
            <div className="bg-void p-5">
              <p className={`${T.micro} text-bone-faint`}>Practice</p>
              <p className={`${T.body} mt-3`}>{PRACTICE[window.kind]}</p>
            </div>
          </div>

          <p className={`${T.tiny} mt-5 text-bone-faint`}>
            No meeting, commitment or ending is guaranteed.
          </p>
        </div>
      ) : (
        <p className={`${T.note} mt-7`}>No active or upcoming window.</p>
      )}
    </section>
  );
}
