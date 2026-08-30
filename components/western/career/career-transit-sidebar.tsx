"use client";

import { bodyColor } from "@/lib/bodies";
import { bodyGlyph } from "@/lib/symbols";
import {
  CAREER_TARGET_LABEL,
  processOf,
  type CareerContact,
  type CareerTargetKind,
  type CareerWindow,
} from "@/lib/career";
import { T } from "@/components/western/growth/growth-ui";

interface PriorityGroup {
  id: "primary" | "secondary" | "background";
  label: string;
  title: string;
  description: string;
  kinds: CareerTargetKind[];
}

/** The target weights in the model, translated into a readable hierarchy. */
const PRIORITIES: PriorityGroup[] = [
  {
    id: "primary",
    label: "Primary",
    title: "Core career structure",
    description: "Direct contacts to the MC or the ruler of the 10th.",
    kinds: ["midheaven", "tenthRuler"],
  },
  {
    id: "secondary",
    label: "Secondary",
    title: "Career machinery",
    description: "Contacts to natal planets placed in the 10th house.",
    kinds: ["tenthTenant"],
  },
  {
    id: "background",
    label: "Background",
    title: "Public-life climate",
    description: "Slow planets moving through the 10th house itself.",
    kinds: ["tenthHouse"],
  },
];

function strength(contact: CareerContact): number {
  return contact.targetRelevance * contact.aspectRelevance;
}

function TransitRow({ contact }: { contact: CareerContact }) {
  const process = processOf(contact.planet);

  return (
    <li className="border-t border-rule/45 py-3 first:border-t-0 first:pt-0">
      <div className="flex gap-3">
        <span
          aria-hidden
          className="glyph mt-0.5 shrink-0 text-[1rem]"
          style={{ color: contact.color ?? bodyColor(contact.planet) }}
        >
          {bodyGlyph(contact.planet)}
        </span>
        <div className="min-w-0">
          <p className="text-[0.875rem] leading-snug text-bone">
            {contact.planet} {contact.aspect?.toLowerCase() ?? "through"}{" "}
            {contact.target}
          </p>
          <p className={`${T.micro} mt-1 text-bone-faint`}>
            {process.label} · {CAREER_TARGET_LABEL[contact.targetKind]}
          </p>
          <p className="datum mt-1 text-[0.625rem] tracking-[0.08em] text-bone-faint/60">
            {contact.start.slice(0, 7)} → {contact.end.slice(0, 7)}
            {contact.segments.length > 1
              ? ` · ${contact.segments.length} passes`
              : ""}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function CareerTransitSidebar({
  window: selectedWindow,
  pinned,
  onClear,
}: {
  window: CareerWindow | null;
  pinned: boolean;
  onClear: () => void;
}) {
  return (
    <aside
      className="border-t border-rule pt-5 xl:max-h-[34rem] xl:overflow-y-auto xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6"
      aria-labelledby="career-transits-title"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 id="career-transits-title" className={`${T.micro} text-bone`}>
          Window transits
        </h3>
        {pinned ? (
          <button
            type="button"
            onClick={onClear}
            className={`${T.micro} text-bone-faint transition-colors hover:text-bone`}
          >
            Clear
          </button>
        ) : null}
      </div>

      <p className={`${T.note} mt-2 text-bone-faint`}>
        Slow-planet contacts to the MC, the ruler and planets of the 10th, or
        the 10th house itself.
      </p>

      {!selectedWindow ? (
        <p className={`${T.note} mt-6 border-l border-rule pl-4`}>
          Click a window beneath the chart to inspect every transit in it.
        </p>
      ) : (
        <div aria-live="polite">
          <div className="mt-5 border-y border-rule py-3">
            <p className={`${T.tiny} text-bone-soft`}>
              {pinned ? "Selected window" : "Current window"} · ages{" "}
              {Math.round(selectedWindow.ageStart)}–{Math.round(selectedWindow.ageEnd)}
            </p>
            <p className="datum mt-1 text-[0.625rem] tracking-[0.08em] text-bone-faint/65">
              {selectedWindow.start.slice(0, 7)} → {selectedWindow.end.slice(0, 7)}
              {" · "}
              {selectedWindow.contacts.length}{" "}
              {selectedWindow.contacts.length === 1 ? "transit" : "transits"}
            </p>
          </div>

          <div className="mt-5 space-y-7">
            {PRIORITIES.map((priority) => {
              const contacts = selectedWindow.contacts
                .filter((contact) => priority.kinds.includes(contact.targetKind))
                .sort((a, b) => strength(b) - strength(a));

              if (!contacts.length) return null;

              return (
                <section key={priority.id} aria-labelledby={`career-${priority.id}-transits`}>
                  <p className={`${T.micro} text-patina/85`}>{priority.label}</p>
                  <h4
                    id={`career-${priority.id}-transits`}
                    className="mt-1 text-[0.9375rem] font-medium leading-snug text-bone-soft"
                  >
                    {priority.title}
                  </h4>
                  <p className={`${T.note} mt-1 text-bone-faint/70`}>
                    {priority.description}
                  </p>
                  <ul className="mt-3">
                    {contacts.map((contact) => (
                      <TransitRow key={contact.id} contact={contact} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
