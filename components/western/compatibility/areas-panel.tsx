//components/western/compatibility/areas-panel.tsx
"use client";

import { useState } from "react";
import { CELL, type Lens, type LensScore } from "@/lib/synastry";
import {
  EASE_BAND_GLOSS,
  EASE_BAND_LABEL,
  type Dimension,
  type DimensionId,
  type EaseBand,
} from "@/lib/synastry";
import ContactRow from "./contact-row";
import Drawer from "./drawer";
import Points from "./points";
import PanelHeading from "./panel-heading";
import {
  AMPLITUDE,
  BAND_COLOR,
  COLUMN_RULE,
  FLOW,
  GRIND,
  ROW_LABEL,
  T,
  easeLabel,
  signColor,
} from "./compatibility-ui";

/**
 * The areas this lens asks for, each with two numbers that are never averaged.
 *
 * The row gives the name, the two measurements and the band word, and stops —
 * everything that explains a number lives in the drawer. That split is load
 * bearing here rather than tidy: seven areas of prose would read as a verdict
 * delivered seven times, and the reader would take the words and never look at
 * what produced them.
 */

/**
 * One area's chemistry, as a bar against a visible scale.
 *
 * The track used to be `rule-faint`, which over the void is very nearly the
 * page itself — so the scale had no visible extent and a low value read as a
 * missing bar rather than a short one. Drive at 10 drew a 16px stub floating in
 * black with nothing behind it to be 10% *of*. The ease track beside it never
 * had this problem because its gradient always shows its whole length, which is
 * what made the difference obvious once the two were compared.
 *
 * The minimum width is for the bottom of the range. Chemistry is a percentile
 * clamped to 1–99, and 1% of a short column is a sub-pixel sliver that rounds
 * away to nothing — which would again read as absent rather than as very
 * little. Three pixels is small enough that nobody misreads it as a quantity
 * and large enough to say "present, barely"; the figure sits next to it either
 * way.
 */
function ChemistryBar({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-3">
      <span className="h-[3px] w-full min-w-16 bg-rule">
        <span
          className="block h-full"
          style={{
            width: `${value}%`,
            minWidth: value > 0 ? "3px" : 0,
            backgroundColor: AMPLITUDE,
          }}
        />
      </span>
      <span className="datum w-7 shrink-0 text-right text-[0.75rem] text-bone">
        {value}
      </span>
    </span>
  );
}

/**
 * Ease on its own short track, drawn from friction to flow with the centre
 * marked. Never a bar growing from the left: a bar would make −40 look like
 * less of something, when it is a great deal of something in the other
 * direction.
 *
 * The marker takes its colour from the area's BAND rather than from the value,
 * so the dot and the word at the end of the row can never disagree. They did at
 * first — the colour was thresholded at the signature's band edge and the word
 * at the area's, which are deliberately different numbers, and an area reading
 * +17 got a green marker beside the word "Mixed".
 */
function EaseTrack({ value, band }: { value: number | null; band: EaseBand }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className="relative h-[3px] w-full min-w-16"
        style={{
          background: `linear-gradient(90deg, ${GRIND}, var(--color-rule) 50%, ${FLOW})`,
          opacity: value === null ? 0.25 : 1,
        }}
      >
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 block h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-bone-faint"
        />
        {value === null ? null : (
          <span
            className="absolute top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-void"
            style={{
              left: `${(Math.max(-100, Math.min(100, value)) + 100) / 2}%`,
              backgroundColor: BAND_COLOR[band],
            }}
          />
        )}
      </span>
      <span
        className="datum w-7 shrink-0 text-right text-[0.75rem]"
        style={{ color: BAND_COLOR[band] }}
      >
        {easeLabel(value)}
      </span>
    </span>
  );
}

function AreaRow({
  area,
  onOpen,
}: {
  area: Dimension;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full grid-cols-[9rem_1fr] items-baseline gap-x-8 gap-y-3 border-t border-rule py-4 text-left transition-colors hover:bg-surface-alt sm:grid-cols-[9rem_1fr_1px_1fr_6rem]"
    >
      <span className={`${ROW_LABEL} text-bone transition-colors group-hover:text-patina`}>
        {area.label}
      </span>
      <ChemistryBar value={area.chemistry} />
      <span aria-hidden className={`${COLUMN_RULE} -my-4`} />
      <EaseTrack value={area.ease} band={area.band} />
      <span
        className={`${T.tiny} sm:text-right`}
        style={{ color: BAND_COLOR[area.band] }}
      >
        {EASE_BAND_LABEL[area.band]}
      </span>
    </button>
  );
}

function AreaDrawer({
  area,
  aName,
  bName,
  onAsk,
  onClose,
}: {
  area: Dimension;
  aName: string;
  bName: string;
  onAsk: () => void;
  onClose: () => void;
}) {
  return (
    <Drawer eyebrow="Area" title={area.label} onClose={onClose}>
      <Points className="mt-7" tone="note" items={[area.question]} />

      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 sm:grid-cols-4">
        {[
          { label: "Chemistry", value: String(area.chemistry), color: "var(--color-bone)" },
          { label: "Ease", value: easeLabel(area.ease), color: BAND_COLOR[area.band] },
          { label: "Contacts", value: String(area.contactCount), color: "var(--color-bone-soft)" },
          { label: "From houses", value: `${area.fromHouses}%`, color: "var(--color-bone-soft)" },
        ].map((stat) => (
          <div key={stat.label}>
            <dt className={`${T.tiny} text-bone-faint`}>{stat.label}</dt>
            <dd className="datum mt-1.5 text-[1.25rem]" style={{ color: stat.color }}>
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className={`${T.read} mt-6`} style={{ color: BAND_COLOR[area.band] }}>
        {EASE_BAND_LABEL[area.band]}
      </p>
      <Points
        className="mt-2"
        color={BAND_COLOR[area.band]}
        items={[EASE_BAND_GLOSS[area.band]]}
      />

      {area.fromHouses > 0 ? (
        <div className="mt-6 border-l-2 border-rule pl-4">
          <Points
            tone="note"
            items={[
              `${area.fromHouses}% of this chemistry comes from houses, not aspects`,
              "Houses say how much weight lands here",
              "Only aspects have a character — that share moved the ease not at all",
            ]}
          />
        </div>
      ) : null}

      <div className="mt-10 border-t border-rule pt-6">
        <p className={`${T.micro} text-patina`}>What it is built from</p>
        {area.contributors.length ? (
          <div className="mt-4">
            {area.contributors.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                aName={aName}
                bName={bName}
              />
            ))}
          </div>
        ) : (
          <Points
            className="mt-4"
            tone="note"
            items={[
              "No cross-chart aspect between the bodies this area reads",
              "Anything showing above came from house placement alone",
            ]}
          />
        )}
      </div>

      <button
        type="button"
        onClick={onAsk}
        className={`${T.micro} mt-10 cursor-pointer border border-rule px-4 py-2.5 text-bone-faint transition-colors hover:border-patina-dim hover:text-patina`}
      >
        Ask about this area ›
      </button>
    </Drawer>
  );
}

/**
 * The lens-scoped half of the page, with its own control at the top of it.
 *
 * The toggle used to live beside the two names, several sections up, and the
 * phrase it produces used to head the plot, which the lens cannot move. Both
 * were in the wrong place for the same reason: a control belongs next to the
 * thing it changes, and everything it changes is here — which areas are read,
 * the phrase drawn from the leading ones, and the summary drawn from those.
 * Press a toggle now and every pixel that moves is below the finger that
 * pressed it.
 *
 * The composed summary that used to sit under the phrase — "strongest in
 * attraction and commitment", and so on — is gone from the surface. It was a
 * sentence reporting what the table underneath it already shows better: which
 * areas carry the most, read off the bars in one pass rather than in prose. It
 * is still computed and still handed to the council, which cannot see bars.
 */
export default function AreasPanel({
  areas,
  lens,
  total,
  aName,
  bName,
  onAsk,
}: {
  areas: Dimension[];
  lens: Lens;
  /** The active lens scored over all its areas at once — the table's total. */
  total: LensScore;
  aName: string;
  bName: string;
  onAsk: (area: Dimension) => void;
}) {
  const [openId, setOpenId] = useState<DimensionId | null>(null);
  const open = areas.find((area) => area.id === openId) ?? null;

  return (
    <section>
      <PanelHeading
        aside={
          <span className="datum text-[0.6875rem] text-bone-faint">
            {lens.omits.length ? lens.omits[0] : "Chemistry · ease · never averaged"}
          </span>
        }
      >
        Metrics
      </PanelHeading>

      {/* The composed phrase — "Magnetic × Binding", the two leading areas
          crossed — used to headline this section and has been removed. Two
          abstract words joined by a multiplication sign is a construction the
          page never explains, and a reader meeting it before the table cannot
          tell whether it is a finding, a category or a brand. The table under
          it says the same thing in numbers that can be checked. The phrase is
          still computed and still handed to the council, where it arrives as
          plain prose. */}

      <div className="hidden grid-cols-[9rem_1fr_1px_1fr_6rem] gap-x-8 pb-2 sm:grid">
        <span className={`${T.tiny} text-bone-faint`}>Area</span>
        <span className={`${T.tiny} text-bone-faint`}>Chemistry</span>
        <span aria-hidden />
        <span className={`${T.tiny} text-bone-faint`}>Friction ↔ Flow</span>
        <span className={`${T.tiny} text-right text-bone-faint`}>Reads</span>
      </div>

      {/* The total, in the same shape as the rows under it.
          It replaces the four-lens comparison that used to sit here: that is a
          question about which reading to take, which belongs beside the chart
          selection at the top of the page, not inside the reading it produced.
          What this section wants is the one figure its own rows add up to. */}
      <div className="grid grid-cols-[9rem_1fr] items-baseline gap-x-8 gap-y-3 border-b-2 border-rule pb-4 sm:grid-cols-[9rem_1fr_1px_1fr_6rem]">
        <span className={`${ROW_LABEL} text-bone`}>{lens.label}</span>
        <ChemistryBar value={total.chemistry} />
        <span aria-hidden className={`${COLUMN_RULE} -my-1`} />
        <span className="flex items-center gap-3">
          <span className="h-[3px] w-full min-w-16" />
          <span
            className="datum w-7 shrink-0 text-right text-[0.75rem]"
            style={{ color: signColor(total.ease) }}
          >
            {easeLabel(total.ease)}
          </span>
        </span>
        <span className={`${T.tiny} text-bone-soft sm:text-right`}>
          {CELL[total.cell].label}
        </span>
      </div>

      <div className="border-b border-rule">
        {areas.map((area) => (
          <AreaRow key={area.id} area={area} onOpen={() => setOpenId(area.id)} />
        ))}
      </div>


      {open ? (
        <AreaDrawer
          area={open}
          aName={aName}
          bName={bName}
          onAsk={() => {
            onAsk(open);
            setOpenId(null);
          }}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </section>
  );
}
