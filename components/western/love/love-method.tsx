//components/western/love/love-method.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  LOVE_LAYER_LABEL,
  LOVE_LAYER_MEANING,
  LOVE_STRENGTH_LABEL,
  LOVE_STRENGTH_MEANING,
  LOVE_TIMELINE_MODEL,
  LOVE_WINDOW_KINDS,
  LOVE_WINDOW_LABEL,
  LOVE_WINDOW_MEANING,
  type LoveCoverage,
  type LoveLayer,
  type LoveStrength,
} from "@/lib/love";
import { T } from "@/components/western/growth/growth-ui";

/**
 * The terms the timeline is arguing from.
 *
 * Same reasoning as Career's scoring modal: a model documented only in its own
 * source is the worse half of both options — an instrument precise enough to
 * invite the argument with no way to inspect what it is arguing from. Every
 * figure below is read from `LOVE_TIMELINE_MODEL` at render rather than
 * retyped, so a reference describing a rule the code no longer applies is not
 * possible.
 *
 * The last tab is the one that matters most and is the least interesting to
 * write: which layers THIS chart can be read on. A layer that cannot fire
 * scores nothing forever and draws exactly like a layer that is quiet.
 */

const TABS = [
  { id: "model", label: "The model" },
  { id: "layers", label: "Layers" },
  { id: "windows", label: "Windows" },
  { id: "chart", label: "This chart" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-8">
      <p className={`${T.micro} text-bone-faint`}>{label}</p>
      <div className={`${T.body} mt-3 max-w-xl`}>{children}</div>
    </div>
  );
}

export default function LoveMethod({ coverage }: { coverage: LoveCoverage }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("model");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const partial = coverage.layers.filter((layer) => layer.partial);
  const flagged = partial.length + coverage.darkAddresses.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${T.tiny} shrink-0 border border-rule px-3.5 py-2 text-bone-soft transition-colors hover:border-bone-faint hover:bg-surface-alt hover:text-bone`}
      >
        How this is read
        {flagged ? <span className="ml-2 text-ember">{flagged} dark</span> : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-void/80"
          />
          <div className="relative flex max-h-[82vh] w-full max-w-2xl flex-col border border-rule bg-surface">
            <div className="shrink-0 px-10 pt-9">
              <div className="flex items-start justify-between gap-6">
                <p className="inscription text-[1.75rem] leading-tight text-bone">
                  How this is read
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`${T.micro} shrink-0 text-bone-faint transition-colors hover:text-bone`}
                >
                  Close ✕
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule">
                {TABS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setTab(entry.id)}
                    className={`${T.micro} -mb-px border-b pb-3 transition-colors ${
                      tab === entry.id
                        ? "border-bone text-bone"
                        : "border-transparent text-bone-faint hover:text-bone-soft"
                    }`}
                  >
                    {entry.label}
                    {entry.id === "chart" && flagged ? (
                      <span className="ml-1.5 text-ember">•</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 grow overflow-y-auto px-10 pt-1 pb-9">
              {tab === "model" ? (
                <>
                  <Section label="There is no score">
                    Career carries a 0–100 index and spends a page arguing that
                    it measures density of contact rather than outcome. That
                    argument is not winnable here. &ldquo;Your love life is at
                    78&rdquo; has no honest referent — nobody, the chart
                    included, knows whether a dense stretch is a marriage or a
                    separation — and a number is read as a verdict whatever the
                    caption says. So this page carries spans and categories and
                    nothing continuous.
                  </Section>
                  <Section label="What a window claims">
                    That a part of the relationship architecture is under
                    emphasis, for a span, from a named set of contacts. Not that
                    anything happened, not that anyone was met, and never which
                    way a period resolved.
                  </Section>
                  <Section label="Two halves, two questions">
                    The Profile reads the birth chart alone and describes a
                    disposition — relatively permanent, no date attached. The
                    Timeline reads transits and progressions and describes
                    periods. Neither predicts the other: a chart drawn toward
                    partnership does not get more partnership windows.
                  </Section>
                  <Section label="Before 16">
                    Windows ending before age{" "}
                    {LOVE_TIMELINE_MODEL.relationalFloorAge} are dropped. Jupiter
                    crosses the 7th when a chart is three and it is the same
                    transit; the noun is what fails. A run straddling the floor
                    is kept whole rather than clipped, so the first adult window
                    is not misdated.
                  </Section>
                </>
              ) : null}

              {tab === "layers" ? (
                <>
                  <Section label="Four, deliberately">
                    Every slow transit touches something. A model watching the
                    outer planets, Mars, every Venus transit, solar returns and
                    profections reports that a relationship season is
                    permanently in progress, which is the same as reporting
                    nothing.
                  </Section>
                  <ul className="mt-8 list-none space-y-6">
                    {(Object.keys(LOVE_LAYER_LABEL) as LoveLayer[]).map((layer) => (
                      <li key={layer}>
                        <p className={`${T.read} text-bone`}>
                          {LOVE_LAYER_LABEL[layer]}
                        </p>
                        <p className={`${T.body} mt-1.5 max-w-xl`}>
                          {LOVE_LAYER_MEANING[layer]}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Section label="Not built">
                    <ul className="list-none space-y-3">
                      {Object.entries(LOVE_TIMELINE_MODEL.deferred).map(
                        ([key, why]) => (
                          <li key={key}>
                            <span className="text-bone-soft">{why}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </Section>
                </>
              ) : null}

              {tab === "windows" ? (
                <>
                  <Section label="The kind is a combination">
                    Never the transiting body. It is the address a contact lands
                    on, crossed with what the contact does there — so Jupiter in
                    the 5th is Romance and Saturn on the Descendant is
                    Commitment, and neither is &ldquo;a Jupiter window&rdquo;.
                  </Section>
                  <ul className="mt-8 list-none space-y-6">
                    {LOVE_WINDOW_KINDS.map((kind) => (
                      <li key={kind}>
                        <p className={`${T.read} text-bone`}>
                          {LOVE_WINDOW_LABEL[kind]}
                        </p>
                        <p className={`${T.body} mt-1.5 max-w-xl`}>
                          {LOVE_WINDOW_MEANING[kind]}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Section label="Strength is structural">
                    Minor, Moderate and Major count independent evidence, not
                    magnitude of consequence.
                  </Section>
                  <ul className="mt-4 list-none space-y-4">
                    {(["major", "moderate", "minor"] as LoveStrength[]).map(
                      (strength) => (
                        <li key={strength}>
                          <p className={`${T.read} text-bone`}>
                            {LOVE_STRENGTH_LABEL[strength]}
                          </p>
                          <p className={`${T.body} mt-1 max-w-xl`}>
                            {LOVE_STRENGTH_MEANING[strength]}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                  <Section label="Bounds">
                    Windows shorter than{" "}
                    {LOVE_TIMELINE_MODEL.minimumWindowYears * 12} months are
                    contacts rather than seasons and are dropped. Windows are
                    capped at {LOVE_TIMELINE_MODEL.maximumWindowYears} years —
                    overlap chains, and without a cap one Saturn transit joined
                    to a progressed ingress joined to the next Jupiter return
                    draws as a single six-year band nobody can act on.
                  </Section>
                </>
              ) : null}

              {tab === "chart" ? (
                <>
                  <Section label="Layers">
                    <ul className="list-none space-y-3">
                      {coverage.layers.map((entry) => (
                        <li key={entry.layer}>
                          <span
                            className={
                              entry.partial ? "text-ember" : "text-bone-soft"
                            }
                          >
                            {LOVE_LAYER_LABEL[entry.layer]}
                          </span>
                          <span className={`${T.note} ml-3`}>
                            {entry.partial
                              ? "partial"
                              : entry.observed
                                ? "observed"
                                : "reachable, no contacts in span"}
                          </span>
                          {entry.why ? (
                            <p className={`${T.note} mt-1`}>{entry.why}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {coverage.darkAddresses.length ? (
                    <Section label="Addresses the transit feed cannot reach">
                      <p>
                        This chart&rsquo;s relationship architecture includes{" "}
                        {coverage.darkAddresses.join(" and ")}. The cached
                        cycles compute contacts against the personal planets,
                        the north node and the two angles only, so nothing
                        reaching{" "}
                        {coverage.darkAddresses.length > 1 ? "those" : "that"}{" "}
                        appears on the timeline. That part of the reading is
                        partial rather than quiet.
                      </p>
                    </Section>
                  ) : null}

                  {!coverage.housed ? (
                    <Section label="No birth time">
                      This chart has no houses and no angles, which removes the
                      5th, the 7th, the relationship axis and the entire
                      progressed-Moon layer. What remains is aspects to natal
                      Venus, and the timeline should be read as a fragment.
                    </Section>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
