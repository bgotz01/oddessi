"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Timeline from "@/components/timeline";
import HousePassage from "@/components/western/houses/house-passage";
import WesternCycleDrawer, {
  type CycleTarget,
} from "@/components/western/cycle-drawer";
import { PageTitle, SectionHeading } from "@/components/primitives";
import { useChart } from "@/components/chart-context";
import { useChat } from "@/components/chat-provider";
import { useJson } from "@/lib/use-json";
import {
  hasRetrograde,
  statusOfBand,
  type Band,
  type BandStatus,
} from "@/lib/band";
import { PLANETS } from "@/lib/planets";
import { Toggle, FilterRow } from "@/components/western/cycles/filter-controls";

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

/** Status tints match StatusMark, so a filter reads as the thing it filters. */
const STATUSES: { key: BandStatus; label: string; tint: string }[] = [
  { key: "active", label: "Active", tint: "var(--color-patina)" },
  { key: "upcoming", label: "Ahead", tint: "var(--color-ember)" },
  { key: "completed", label: "Closed", tint: "var(--color-bone-faint)" },
];

/** The decade a year belongs to: 2027 → 2020. */
function decadeOf(year: number): number {
  return Math.floor(year / 10) * 10;
}

/** Recovered from the subtitle, which is how a band encodes its kind. */
function typeOf(band: Band): string {
  if (band.subtitle === "Return") return "planetary-return";
  if (band.subtitle.startsWith("House ")) return "house-transit";
  return "aspect-cycle";
}

/**
 * How many bands travel with a message.
 *
 * The cache holds forty-five years across five planets and three kinds, which
 * is several hundred bands and far too much to attach to every question. The
 * cap bites only when someone selects the whole span; a decade — the default —
 * comes in well under it. When it does bite the block says so, so the model
 * reports a truncated view rather than a complete one.
 */
const CONTEXT_BAND_LIMIT = 200;

export default function CyclesExplorerPage() {
  const { chart } = useChart();
  const { setPageContext } = useChat();
  const state = useJson<AllResponse>(
    chart
      ? `/api/cycles?view=all&chartId=${encodeURIComponent(chart.id)}`
      : null,
  );

  // --- Passage filters (house transits, 5 outer planets) ---
  const [planets, setPlanets] = useState(
    () => new Set(PLANETS.map((p) => p.name)),
  );
  const [statuses, setStatuses] = useState<Set<BandStatus>>(
    () => new Set<BandStatus>(STATUSES.map((s) => s.key)),
  );
  // Forty-five years at once is a smear. Open on the decade you are in; the
  // rest of the cache is one click away.
  const [decades, setDecades] = useState<Set<number>>(
    () => new Set([decadeOf(new Date().getUTCFullYear())]),
  );

  // --- Expanded Axis filters (aspects, returns — everything else) ---
  const [axisPlanets, setAxisPlanets] = useState(
    () => new Set(PLANETS.map((p) => p.name)),
  );
  // Aspects and returns only — house transits belong to the Passage.
  const AXIS_TYPES = TYPES.filter((t) => t.key !== "house-transit");
  const [axisTypes, setAxisTypes] = useState<Set<string>>(
    () => new Set<string>(AXIS_TYPES.map((t) => t.key)),
  );
  const [axisStatuses, setAxisStatuses] = useState<Set<BandStatus>>(
    () => new Set<BandStatus>(STATUSES.map((s) => s.key)),
  );

  // Every band on its own row: the full reading, but a dense one. Closed until
  // asked for, so the page opens on the Passage.
  const [axisOpen, setAxisOpen] = useState(false);

  // Right-hand interpretation drawer — opened by clicking a house stint or the
  // standalone "Read a cycle" button.
  const [drawerTarget, setDrawerTarget] = useState<CycleTarget | null>(null);
  const [drawerTransit, setDrawerTransit] = useState<
    { start: string; end: string } | undefined
  >(undefined);

  function openDrawer(
    planet: string,
    house: number,
    transit?: { start: string; end: string },
  ) {
    setDrawerTarget({ planet, house });
    setDrawerTransit(transit);
  }

  /** All-or-nothing for a whole row. */
  function toggleAll<T>(set: Set<T>, all: T[], apply: (next: Set<T>) => void) {
    apply(set.size === all.length ? new Set<T>() : new Set(all));
  }

  const now = new Date();
  const nowMs = now.getTime();

  /** The decades the cache actually reaches, which is what can be offered. */
  const allDecades = useMemo(() => {
    if (state.status !== "ready") return [];
    const first = decadeOf(new Date(state.data.windowStart).getUTCFullYear());
    const last = decadeOf(new Date(state.data.windowEnd).getUTCFullYear());
    const out: number[] = [];
    for (let d = first; d <= last; d += 10) out.push(d);
    return out;
  }, [state]);

  /**
   * The visible window: the hull of the selected decades, clipped to the data.
   * A gap in the selection is spanned rather than cut out — both charts read a
   * single continuous axis, and punching holes in it would make every date
   * left of the hole land at the wrong pixel.
   */
  const span = useMemo(() => {
    if (state.status !== "ready") return null;
    const picked = allDecades.filter((d) => decades.has(d));
    if (picked.length === 0) return null;
    const start = `${picked[0]}-01-01`;
    const end = `${picked[picked.length - 1] + 10}-01-01`;
    return {
      windowStart:
        start > state.data.windowStart ? start : state.data.windowStart,
      windowEnd: end < state.data.windowEnd ? end : state.data.windowEnd,
    };
  }, [state, allDecades, decades]);

  // Fetched once unfiltered; narrowing from here is instant and client-side.
  // Expanded Axis excludes house transits — those belong to the Passage.
  const bands = useMemo(() => {
    if (state.status !== "ready" || !span) return [];
    const at = new Date(nowMs);
    return state.data.bands.filter(
      (b) =>
        axisPlanets.has(b.title) &&
        axisTypes.has(typeOf(b)) &&
        axisStatuses.has(statusOfBand(b, at)) &&
        b.end > span.windowStart &&
        b.start < span.windowEnd,
    );
  }, [state, axisPlanets, axisTypes, axisStatuses, span, nowMs]);

  // The Passage is house transits by definition, so the kind filter has
  // nothing to say about it. Planet, status and span all apply.
  const shownPlanets = PLANETS.filter((p) => planets.has(p.name));

  function toggle<T>(set: Set<T>, value: T, apply: (next: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    apply(next);
  }

  /**
   * Everything inside the selected span, for the chat.
   *
   * Scoped to the span rather than to the filters on purpose. The filters are
   * how you narrow what you are LOOKING at, and narrowing them mid-conversation
   * would silently retract cycles the model had already been told about — it
   * would answer "Saturn enters the tenth in 2029" and then, two toggles later,
   * deny knowing it. The span is the one filter that means "the period I am
   * asking about", so that is the one the context follows.
   */
  const contextBands = useMemo(() => {
    if (state.status !== "ready" || !span) return null;
    const inSpan = state.data.bands.filter(
      (b) => b.end > span.windowStart && b.start < span.windowEnd,
    );
    return {
      total: inSpan.length,
      bands: inSpan.slice(0, CONTEXT_BAND_LIMIT).map((b) => ({
        planet: b.title,
        what: b.subtitle,
        kind: typeOf(b),
        start: b.start,
        end: b.end,
        significance: b.significance,
      })),
    };
  }, [state, span]);

  useEffect(() => {
    if (!contextBands || !span) return;

    setPageContext({
      _description: "Cycles Explorer — every cached cycle in the selected span",
      _note:
        "This is the whole cache for the span shown, past and future: house " +
        "transits, aspect cycles and planetary returns. Houses are contiguous " +
        "sectors of the ecliptic in order, so a planet crosses them " +
        "consecutively, but the dates are not derivable from that — a " +
        "retrograde can hold a planet at a cusp and make two house transits " +
        "overlap. Read the dates, never infer them." +
        (contextBands.total > contextBands.bands.length
          ? ` Only the first ${contextBands.bands.length} of ${contextBands.total} bands are listed; say so rather than treating the list as complete.`
          : ""),
      asOf: now.toISOString(),
      spanStart: span.windowStart,
      spanEnd: span.windowEnd,
      bands: contextBands.bands,
    });

    return () => setPageContext(null);
    // `now` is a fresh Date every render and would loop; the span it sits in is
    // what actually decides the content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextBands, span, setPageContext]);

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
          href="/western/cycles"
          className="datum text-[0.6875rem] tracking-[0.18em] text-bone-soft uppercase transition-colors hover:text-patina"
        >
          ← Back to the five in force
        </Link>
      </p>

      <div className="mb-12 border-t border-rule">
        <FilterRow
          label="Planet"
          count={planets.size}
          total={PLANETS.length}
          onToggleAll={() =>
            toggleAll(
              planets,
              PLANETS.map((p) => p.name),
              setPlanets,
            )
          }
        >
          {PLANETS.map((p) => (
            <Toggle
              key={p.name}
              on={planets.has(p.name)}
              tint={p.color}
              glyph={p.glyph}
              label={p.name}
              onClick={() => toggle(planets, p.name, setPlanets)}
            />
          ))}
        </FilterRow>

        <FilterRow
          label="Status"
          count={statuses.size}
          total={STATUSES.length}
          onToggleAll={() =>
            toggleAll(
              statuses,
              STATUSES.map((s) => s.key),
              setStatuses,
            )
          }
        >
          {STATUSES.map((s) => (
            <Toggle
              key={s.key}
              on={statuses.has(s.key)}
              tint={s.tint}
              label={s.label}
              onClick={() => toggle(statuses, s.key, setStatuses)}
            />
          ))}
        </FilterRow>

        {allDecades.length > 0 ? (
          <FilterRow
            label="Span"
            count={allDecades.filter((d) => decades.has(d)).length}
            total={allDecades.length}
            tally={
              span
                ? `${span.windowStart.slice(0, 4)} – ${span.windowEnd.slice(0, 4)}`
                : "no span"
            }
            onToggleAll={() =>
              setDecades(
                allDecades.every((d) => decades.has(d))
                  ? new Set()
                  : new Set(allDecades),
              )
            }
          >
            {allDecades.map((d) => (
              <Toggle
                key={d}
                on={decades.has(d)}
                label={`${d}s`}
                onClick={() => toggle(decades, d, setDecades)}
              />
            ))}
          </FilterRow>
        ) : null}
      </div>

      {!chart ? (
        <p className="font-light text-bone-soft">No chart selected.</p>
      ) : state.status === "loading" ? (
        <p className="datum text-[0.75rem] text-bone-faint">Reading cycles…</p>
      ) : state.status === "error" ? (
        <p className="datum text-[0.75rem] text-ember">{state.error}</p>
      ) : !span ? (
        <p className="font-light text-bone-soft">
          No decades selected — pick a span to draw.
        </p>
      ) : (
        <div className="space-y-20">
          <section>
            <SectionHeading
              aside={
                <span className="flex items-baseline gap-5">
                  <span className="text-bone-faint">
                    {shownPlanets.length} of {PLANETS.length} planets
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      openDrawer(
                        drawerTarget?.planet ?? "Jupiter",
                        drawerTarget?.house ?? 1,
                      )
                    }
                    className="datum text-[0.625rem] tracking-[0.18em] text-bone-faint uppercase transition-colors hover:text-patina"
                  >
                    Read a cycle →
                  </button>
                </span>
              }
            >
              The Passage
            </SectionHeading>
            <p className="-mt-4 max-w-2xl text-[0.9375rem] font-light text-bone-soft">
              One row per planet — every house it crosses, end to end. The tone
              alternates at each change and the number is the house. Planet,
              status and span apply; kind does not, since this is house
              transits by definition.
            </p>
            <HousePassage
              bands={state.data.bands}
              planets={shownPlanets}
              statuses={statuses}
              now={now}
              windowStart={span.windowStart}
              windowEnd={span.windowEnd}
              onStintClick={(planet, house, start, end) =>
                openDrawer(planet, house, { start, end })
              }
            />
          </section>

          <section>
            <SectionHeading
              aside={`${bands.length} of ${state.data.bands.length} · ${bands.filter(hasRetrograde).length
                } ℞`}
              open={axisOpen}
              onToggle={() => setAxisOpen((was) => !was)}
            >
              Expanded Axis
            </SectionHeading>
            {!axisOpen ? null : (
              <>
                <div className="mb-8 border-t border-rule">
                  <FilterRow
                    label="Planet"
                    count={axisPlanets.size}
                    total={PLANETS.length}
                    onToggleAll={() =>
                      toggleAll(
                        axisPlanets,
                        PLANETS.map((p) => p.name),
                        setAxisPlanets,
                      )
                    }
                  >
                    {PLANETS.map((p) => (
                      <Toggle
                        key={p.name}
                        on={axisPlanets.has(p.name)}
                        tint={p.color}
                        glyph={p.glyph}
                        label={p.name}
                        onClick={() => toggle(axisPlanets, p.name, setAxisPlanets)}
                      />
                    ))}
                  </FilterRow>

                  <FilterRow
                    label="Kind"
                    count={axisTypes.size}
                    total={AXIS_TYPES.length}
                    onToggleAll={() =>
                      toggleAll(
                        axisTypes,
                        AXIS_TYPES.map((t) => t.key as string),
                        setAxisTypes,
                      )
                    }
                  >
                    {AXIS_TYPES.map((t) => (
                      <Toggle
                        key={t.key}
                        on={axisTypes.has(t.key)}
                        label={t.label}
                        onClick={() => toggle(axisTypes, t.key, setAxisTypes)}
                      />
                    ))}
                  </FilterRow>

                  <FilterRow
                    label="Status"
                    count={axisStatuses.size}
                    total={STATUSES.length}
                    onToggleAll={() =>
                      toggleAll(
                        axisStatuses,
                        STATUSES.map((s) => s.key),
                        setAxisStatuses,
                      )
                    }
                  >
                    {STATUSES.map((s) => (
                      <Toggle
                        key={s.key}
                        on={axisStatuses.has(s.key)}
                        tint={s.tint}
                        label={s.label}
                        onClick={() => toggle(axisStatuses, s.key, setAxisStatuses)}
                      />
                    ))}
                  </FilterRow>
                </div>

                {bands.length === 0 ? (
                  <p className="font-light text-bone-soft">
                    Nothing matches those filters.
                  </p>
                ) : (
                  <Timeline
                    bands={bands}
                    now={now}
                    windowStart={span.windowStart}
                    windowEnd={span.windowEnd}
                  />
                )}
              </>
            )}
          </section>
        </div>
      )}

      {drawerTarget ? (
        <WesternCycleDrawer
          target={drawerTarget}
          transitInfo={drawerTransit}
          onNavigate={(next) => {
            setDrawerTarget(next);
            // Clear transit info when the user navigates away from the
            // clicked stint — the dates only belong to that exact house.
            setDrawerTransit(undefined);
          }}
          onClose={() => {
            setDrawerTarget(null);
            setDrawerTransit(undefined);
          }}
        />
      ) : null}
    </div>
  );
}
