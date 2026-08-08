"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Timeline from "@/components/timeline";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useJson } from "@/lib/use-json";
import {
  hasRetrograde,
  statusOfBand,
  type Band,
  type BandStatus,
} from "@/lib/band";
import { PLANETS } from "@/lib/planets";

interface AllResponse {
  bands: Band[];
  windowStart: string;
  windowEnd: string;
}

const TYPES = [
  { key: "house-transit", label: "House transits" },
  { key: "aspect-cycle", label: "Aspects" },
  { key: "planetary-return", label: "Returns" },
] as const;

const STATUSES: BandStatus[] = ["active", "upcoming", "completed"];

/** Recovered from the subtitle, which is how a band encodes its kind. */
function typeOf(band: Band): string {
  if (band.subtitle === "Return") return "planetary-return";
  if (band.subtitle.startsWith("House ")) return "house-transit";
  return "aspect-cycle";
}

function Toggle({
  on,
  onClick,
  children,
  color,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`px-4 py-2.5 transition-colors ${
        on
          ? "bg-surface text-bone"
          : "bg-void text-bone-faint hover:bg-surface-alt"
      }`}
      style={on && color ? { color } : undefined}
    >
      <span className="datum text-[0.6875rem] tracking-[0.18em] uppercase">
        {children}
      </span>
    </button>
  );
}

export default function CyclesExplorerPage() {
  const { chart } = useChart();
  const state = useJson<AllResponse>(
    chart
      ? `/api/cycles?view=all&chartId=${encodeURIComponent(chart.id)}`
      : null,
  );

  const [planets, setPlanets] = useState(
    () => new Set(PLANETS.map((p) => p.name)),
  );
  const [types, setTypes] = useState<Set<string>>(
    () => new Set(TYPES.map((t) => t.key)),
  );
  const [statuses, setStatuses] = useState<Set<BandStatus>>(
    () => new Set<BandStatus>(["active", "upcoming"]),
  );

  const now = new Date();
  const nowMs = now.getTime();

  // Fetched once unfiltered; narrowing from here is instant and client-side.
  const bands = useMemo(() => {
    if (state.status !== "ready") return [];
    const at = new Date(nowMs);
    return state.data.bands.filter(
      (b) =>
        planets.has(b.title) &&
        types.has(typeOf(b)) &&
        statuses.has(statusOfBand(b, at)),
    );
  }, [state, planets, types, statuses, nowMs]);

  function toggle<T>(set: Set<T>, value: T, apply: (next: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    apply(next);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <PageTitle
        eyebrow={chart ? chart.name : "No chart"}
        title="Cycles Explorer"
        lede="Every cached cycle for this chart — house transits, aspects and
              returns across five planets. Filter it down to the question you
              are actually asking."
      />

      <p className="mb-10">
        <Link
          href="/astro/cycles"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          ← Back to the five in force
        </Link>
      </p>

      <div className="mb-10 space-y-4">
        <div>
          <p className="eyebrow mb-2">Planet</p>
          <div className="flex flex-wrap gap-px bg-rule">
            {PLANETS.map((p) => (
              <Toggle
                key={p.name}
                on={planets.has(p.name)}
                color={p.color}
                onClick={() => toggle(planets, p.name, setPlanets)}
              >
                {p.glyph} {p.name}
              </Toggle>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-2">Kind</p>
          <div className="flex flex-wrap gap-px bg-rule">
            {TYPES.map((t) => (
              <Toggle
                key={t.key}
                on={types.has(t.key)}
                onClick={() => toggle(types, t.key, setTypes)}
              >
                {t.label}
              </Toggle>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-2">Status</p>
          <div className="flex flex-wrap gap-px bg-rule">
            {STATUSES.map((s) => (
              <Toggle
                key={s}
                on={statuses.has(s)}
                onClick={() => toggle(statuses, s, setStatuses)}
              >
                {s}
              </Toggle>
            ))}
          </div>
        </div>
      </div>

      {!chart ? (
        <p className="font-light text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : (
        <section>
          <SectionHeading
            aside={`${bands.length} of ${state.data.bands.length} · ${
              bands.filter(hasRetrograde).length
            } ℞`}
          >
            The Axis
          </SectionHeading>
          {bands.length === 0 ? (
            <p className="font-light text-bone-soft">
              Nothing matches those filters.
            </p>
          ) : (
            <Timeline
              bands={bands}
              now={now}
              windowStart={state.data.windowStart}
              windowEnd={state.data.windowEnd}
            />
          )}
        </section>
      )}
    </div>
  );
}
