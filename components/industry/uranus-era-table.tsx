//components/industry/uranus-era-table.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/primitives";
import { ELEMENT_COLOR, signMeta } from "@/lib/symbols";
import {
  URANUS_MUSIC_ERAS,
  uranusEraStatus,
  type UranusAxis,
  type UranusEraOverview,
} from "@/lib/industry/uranus-music-eras-data";
import { useReadingYear } from "@/lib/industry/use-reading-year";
import UranusEraDrawer from "@/components/industry/uranus-era-drawer";

/**
 * Controlled when a caller passes `onSelect`, and self-contained otherwise.
 *
 * The Uranus page is the only page with this on it, so owning the selection
 * AND the drawer is right there. The combined chart is not: it has a bar for
 * the same eras and a drawer that carries the other clock alongside them, and
 * a second, thinner drawer of its own would give one page two readings of the
 * same era depending on where the reader clicked.
 *
 * A grid rather than the comparison table this used to be. Eleven eras across
 * three short rows needed 2440px of table, which put nine of them off-screen
 * and made reading the cycle an act of horizontal scrolling. The table earned
 * that width when the reader wanted to compare one row across every era; what
 * this page is actually for is following the eras in order, and three values
 * per era fit in a card. The Neptune table keeps its table shape because five
 * columns fit in a screen — the difference in form follows a real difference
 * in the data, not an inconsistency.
 */
export default function UranusEraTable({
  selectedSign: controlledSign,
  onSelect,
}: {
  selectedSign?: string | null;
  onSelect?: (sign: string) => void;
} = {}) {
  const [ownSign, setOwnSign] = useState<string | null>(null);
  const selectedSign = onSelect ? (controlledSign ?? null) : ownSign;
  const select = onSelect ?? setOwnSign;
  // The caller that drives the selection also draws the drawer.
  const selectedEra = onSelect
    ? undefined
    : URANUS_MUSIC_ERAS.find((era) => era.sign === selectedSign);

  const year = useReadingYear();

  return (
    <section className="mb-20">
      <SectionHeading aside="11 eras · Uranus">
        <span className="glyph text-patina" aria-hidden="true">♅</span> Uranus Eras
      </SectionHeading>
      <p className="mb-6 text-bone-soft">How music is made and how it reaches people.</p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {URANUS_MUSIC_ERAS.map((era) => (
          <EraCard
            key={era.sign}
            era={era}
            status={year === null ? null : uranusEraStatus(era, year)}
            selected={selectedSign === era.sign}
            onSelect={() => select(era.sign)}
          />
        ))}
      </ul>

      {selectedEra && (
        <UranusEraDrawer
          era={selectedEra}
          onNavigate={setOwnSign}
          onClose={() => setOwnSign(null)}
        />
      )}
    </section>
  );
}

/**
 * Production or distribution, in fill rather than in colour.
 *
 * Colour is spoken for twice over on this page — the element says which sign,
 * and the house keeps patina and ember for the present and for exactitude — so
 * a third meaning hung on a third hue would collide with both. Fill is a free
 * channel: solid for production, hollow for distribution, half for the era
 * that is honestly both.
 */
function AxisMark({ axis, color }: { axis: UranusAxis; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[7px] w-[7px] shrink-0 rounded-full align-baseline"
      style={{
        border: `1px solid ${color}`,
        background:
          axis === "Production"
            ? color
            : axis === "Both"
              ? `linear-gradient(90deg, ${color} 50%, transparent 50%)`
              : "transparent",
      }}
    />
  );
}

function axisName(era: UranusEraOverview): string | null {
  return era.axisDetail ?? era.axis;
}

function EraCard({
  era,
  status,
  selected,
  onSelect,
}: {
  era: UranusEraOverview;
  status: "completed" | "active" | "upcoming" | null;
  selected: boolean;
  onSelect: () => void;
}) {
  const meta = signMeta(era.sign);
  const color = meta ? ELEMENT_COLOR[meta.element] : "var(--color-patina)";

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-haspopup="dialog"
        aria-expanded={selected}
        aria-label={`Explore Uranus in ${era.sign}, ${era.dates}${status === "active" ? ", the era running now" : ""}`}
        className="group flex h-full w-full cursor-pointer flex-col items-center border border-rule-faint border-t-[3px] px-5 pt-5 pb-5 text-center transition-colors hover:border-rule focus-visible:outline-offset-[-3px]"
        style={{
          borderTopColor: color,
          backgroundColor: `${color}${selected ? "1A" : "08"}`,
        }}
      >
        <span className="text-[1.1875rem] leading-none" style={{ color }}>
          <span className="glyph" aria-hidden="true">{era.symbol}</span> {era.sign}
        </span>

        <span className="datum mt-2 text-[0.75rem] text-bone-faint">
          {era.dates}
          {status === "active" && (
            <span style={{ color }}> · Now</span>
          )}
        </span>

        <span className="my-4 h-px w-8" style={{ backgroundColor: `${color}55` }} aria-hidden="true" />

        <span className="text-[1.1875rem] leading-snug font-semibold" style={{ color }}>
          {era.manifestation ?? (
            <span className="font-normal italic text-bone-faint">To be observed</span>
          )}
        </span>

        {era.axisNote && (
          <span className="mt-2.5 text-[1.0625rem] leading-relaxed text-bone-soft">
            {era.axisNote}
          </span>
        )}

        <span className="datum mt-4 text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-bone-faint">
          {era.axis && (
            <>
              <AxisMark axis={era.axis} color={color} />{" "}
            </>
          )}
          {axisName(era) ?? "Not yet read"}
        </span>

        {/* The era's theme. The disruption it is drawn from is a pair of
            opposed terms, which needs the drawer's room to land. */}
        <span className="datum mt-auto pt-5 text-[0.75rem] leading-relaxed text-bone-faint">
          {era.principle}
        </span>

        <span
          aria-hidden="true"
          className="datum mt-3 text-[0.75rem] text-bone-faint transition-colors group-hover:text-bone"
        >
          Read →
        </span>
      </button>
    </li>
  );
}
