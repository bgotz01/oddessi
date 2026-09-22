//components/western/compatibility/partner-picker.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePartner } from "@/components/partner-context";
import { formatBirth } from "@/lib/charts";
import Points from "./points";
import { T } from "./compatibility-ui";

/**
 * The second chart, chosen on the page rather than in the rail.
 *
 * The rail's selector means "the person this app is about" everywhere else, and
 * this control has to read as something different — a second party brought
 * alongside, not a change of subject. Hence its place in the page body, and
 * hence the arrow between the two names.
 */
export default function PartnerPicker({ subject }: { subject: string }) {
  const { partner, candidates, selectPartner } = usePartner();
  const [open, setOpen] = useState(false);

  if (candidates.length === 0) {
    return (
      <div>
        <p className={`${T.micro} text-ember`}>Only one chart stored</p>
        <Points
          className="mt-4 max-w-2xl"
          items={[
            "A compatibility reading needs two",
            "Nothing on this page can be computed from one chart",
            "Nothing here will be guessed from one",
          ]}
        />
        <Link
          href="/birth-chart"
          className={`${T.micro} mt-5 inline-block text-patina transition-colors hover:text-bone`}
        >
          Add a second chart ›
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
      <span className="inscription text-[1.0625rem] tracking-[0.1em] text-bone">
        {subject}
      </span>
      <span className="glyph text-patina-dim" aria-hidden>
        ↔
      </span>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onBlur={(e) => {
            if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
              setOpen(false);
            }
          }}
          className={`inscription flex items-baseline gap-2.5 border-b text-[1.0625rem] tracking-[0.1em] transition-colors ${
            partner
              ? "border-patina-dim text-bone hover:text-patina"
              : "border-ember-dim text-ember hover:text-bone"
          }`}
        >
          {partner ? partner.name : "Choose a second chart"}
          <span aria-hidden className="datum text-[0.625rem] text-bone-faint">
            ▾
          </span>
        </button>

        {open ? (
          <div
            role="listbox"
            aria-label="Select the second chart"
            className="absolute top-full left-0 z-50 mt-2 min-w-64 border border-rule bg-surface"
          >
            {candidates.map((candidate) => {
              const active = candidate.id === partner?.id;
              return (
                <button
                  key={candidate.id}
                  role="option"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    selectPartner(candidate.id);
                    setOpen(false);
                  }}
                  className={`flex w-full flex-col border-l-2 px-4 py-2.5 text-left transition-colors ${
                    active
                      ? "border-patina bg-surface-alt"
                      : "border-transparent hover:border-rule hover:bg-surface-alt"
                  }`}
                >
                  <span
                    className={`text-[0.9375rem] ${active ? "text-patina" : "text-bone-soft"}`}
                  >
                    {candidate.name}
                  </span>
                  <span className={`${T.tiny} mt-1 text-bone-faint`}>
                    {formatBirth(candidate.birth)}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
