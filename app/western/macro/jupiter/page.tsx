//western/macro/jupiter/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, SectionHeading } from "@/components/primitives";
import JupiterEraDrawer from "@/components/western/macro/jupiter-era-drawer";
import MacroPlanetNav from "@/components/western/macro/macro-planet-nav";
import {
  JUPITER_BOUNDARIES as BOUNDARIES,
  JUPITER_CYCLE_END,
  JUPITER_ERAS,
  activeJupiterEraIndex,
  jupiterEraStatus as statusOf,
} from "@/lib/astrology/macro/jupiter-eras-data";
import type {
  JupiterEra,
  JupiterEraElement,
} from "@/lib/astrology/macro/jupiter-eras-data";

const ERAS: readonly JupiterEra[] = JUPITER_ERAS;

const ELEMENT_COLOR: Record<JupiterEraElement, string> = {
  earth: "#8ebf7a",
  air: "#7dc0d8",
  water: "#7899d4",
  fire: "#e07a50",
};

const DAY_MS = 86_400_000;

// A Jupiter era lasts about a year, so "now" is read from the clock rather than
// hardcoded as the outer-planet pages do. Floored to the UTC day so the server
// render and the client hydrate to the same position.
const utcToday = () => Math.floor(Date.now() / DAY_MS) * DAY_MS;

/**
 * The axis is ordinal by sign, not linear in time: each sign gets an equal
 * column, and "now" is placed proportionally inside the active one. Retrograde
 * shuffles make a true time axis squeeze Capricorn to a sliver, which would
 * make its label unreadable without saying anything useful.
 */
function nowPct(today: number): number | null {
  const index = activeJupiterEraIndex(today);
  if (index < 0) return null;
  const through =
    (today - BOUNDARIES[index]) / (BOUNDARIES[index + 1] - BOUNDARIES[index]);
  return ((index + through) / ERAS.length) * 100;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "May ’22" — twelve ticks a column apart leave no room for a four-digit year. */
const monthYear = (iso: string) =>
  `${MONTHS[Number(iso.slice(5, 7)) - 1]} ’${iso.slice(2, 4)}`;


// ── Sub-components ────────────────────────────────────────────────────────────

function JupiterTimeline({
  today,
  selectedSign,
  onSelect,
}: {
  today: number;
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  const now = nowPct(today);
  const columnPct = 100 / ERAS.length;

  return (
    <div className="mb-2">
      {/* ── "now" label sits above the bar, aligned to the marker ─────── */}
      <div className="relative mb-1 h-5 w-full">
        {now !== null ? (
          <span
            className="datum absolute -translate-x-1/2 text-[0.75rem] text-bone"
            style={{ left: `${now}%` }}
          >
            now
          </span>
        ) : null}
      </div>

      {/* ── Colour bar ────────────────────────────────────────────────── */}
      <div className="relative flex h-10 w-full overflow-hidden rounded-[2px]">
        {ERAS.map((era, index) => {
          const status = statusOf(index, today);
          return (
            <button
              type="button"
              key={era.sign}
              onClick={() => onSelect(era.sign)}
              aria-label={`Open Jupiter in ${era.sign}, ${era.years}`}
              aria-pressed={selectedSign === era.sign}
              className="relative cursor-pointer transition-[filter] hover:brightness-110"
              style={{
                width: `${columnPct}%`,
                backgroundColor: ELEMENT_COLOR[era.element],
                opacity: status === "active" ? 0.95 : status === "upcoming" ? 0.55 : 0.82,
              }}
            >
              {era.reentry ? (
                <span
                  aria-hidden="true"
                  className="datum absolute right-1.5 bottom-1 text-[0.625rem] leading-none text-void/70"
                >
                  ℞
                </span>
              ) : null}
              <span className="absolute top-0 right-0 h-full w-px bg-void/30" />
            </button>
          );
        })}

        {now !== null ? (
          <div
            className="absolute top-0 h-full w-[2px] bg-bone/80"
            style={{ left: `${now}%` }}
          />
        ) : null}
      </div>

      {/* ── Ingress ticks ─────────────────────────────────────────────── */}
      <div className="relative mt-1.5 h-5 w-full">
        {ERAS.map((era, index) => (
          <span
            key={era.sign}
            className={`datum absolute text-[0.6875rem] whitespace-nowrap text-bone-faint ${index === 0 ? "" : "-translate-x-1/2"}`}
            style={{ left: `${index * columnPct}%` }}
          >
            {monthYear(era.ingress)}
          </span>
        ))}
        <span className="datum absolute right-0 text-[0.6875rem] whitespace-nowrap text-bone-faint">
          {monthYear(JUPITER_CYCLE_END)}
        </span>
      </div>

      {/* ── Per-segment label blocks ───────────────────────────────────── */}
      <div className="mt-6 grid w-full grid-cols-12 items-stretch">
        {ERAS.map((era, index) => {
          const color = ELEMENT_COLOR[era.element];
          const selected = selectedSign === era.sign;
          const status = statusOf(index, today);
          return (
            <button
              type="button"
              key={era.sign}
              onClick={() => onSelect(era.sign)}
              aria-pressed={selected}
              className={`grid min-w-0 cursor-pointer grid-cols-[minmax(0,1fr)] grid-rows-[4.5rem_2.5rem_5rem_minmax(5rem,1fr)] gap-2 px-1.5 py-3 text-center transition-colors hover:bg-surface-alt ${selected ? "bg-surface-alt" : ""} ${status === "upcoming" ? "opacity-80" : ""}`}
              style={{ borderLeft: `2px solid ${color}` }}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="glyph text-[1.125rem] leading-none" style={{ color }}>
                  {era.glyph}
                </span>
                <span className="inscription text-[0.6875rem] tracking-[0.01em] text-bone">
                  {era.sign}
                </span>
                <span className="text-[0.625rem] italic leading-none text-bone-faint">
                  House {era.house}
                </span>
                {status === "active" ? (
                  <span className="datum text-[0.5625rem] uppercase tracking-[0.14em] text-patina">
                    Active
                  </span>
                ) : null}
              </div>
              <span
                className="datum flex items-start justify-center break-words text-[0.625rem] leading-relaxed uppercase tracking-[0.12em]"
                style={{ color }}
              >
                {era.growth}
              </span>
              <span className="flex flex-col items-center justify-start gap-1 break-words text-[0.875rem] leading-snug text-bone-soft">
                <span className="datum text-[0.5rem] uppercase tracking-[0.12em] text-bone-faint/60">
                  Archetype
                </span>
                {era.archetype}
              </span>
              <span className="flex flex-col items-center justify-start gap-1 break-words border-t border-rule-faint pt-2.5 text-[0.875rem] leading-snug text-bone">
                <span className="datum text-[0.5rem] uppercase tracking-[0.12em] text-bone-faint/60">
                  Question
                </span>
                {era.question}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GrowthProgression({
  today,
  selectedSign,
  onSelect,
}: {
  today: number;
  selectedSign: string | null;
  onSelect: (sign: string) => void;
}) {
  return (
    <div className="mb-12">
      <p className="mx-auto mb-8 max-w-3xl text-center text-[1.25rem] italic leading-relaxed text-bone-soft">
        Where is the collective appetite for growth flowing this year?
      </p>

      <div className="-mx-2 overflow-x-auto px-2 pb-3">
        <div className="min-w-[1080px]">
          <JupiterTimeline today={today} selectedSign={selectedSign} onSelect={onSelect} />
        </div>
      </div>
      <p className="datum mt-3 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-bone-faint">
        One column per sign · ℞ marks a retrograde re-entry · select a sign to open its reading
      </p>
    </div>
  );
}


// ── Page ─────────────────────────────────────────────────────────────────────

export default function JupiterPage() {
  const [today] = useState(utcToday);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const selectedIndex = ERAS.findIndex((era) => era.sign === selectedSign);
  const selectedEra: JupiterEra | null =
    selectedIndex >= 0 ? ERAS[selectedIndex] : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-8 pb-24">
      <MacroPlanetNav />
      <div className="-mt-8">
        <PageTitle
          eyebrow="Collective · Jupiter"
          title="The Jupiter Sequence"
          lede="Jupiter marks where collective growth is flowing. Each sign identifies what a culture is inclined to expand, fund, and believe in for about a year — and where that appetite outruns judgment."
        />
      </div>

      {/* ── The primary instrument: progression + era index ──────────────── */}
      <section className="mb-20">
        <SectionHeading aside="12 signs · ~12 years">
          <span className="inline-flex items-center text-[1.1875rem] tracking-[0.16em]">
            <span
              aria-hidden="true"
              className="glyph mr-3 text-[1.5rem] leading-none text-patina"
            >
              ♃
            </span>
            <span>Jupiter</span>
            <span
              aria-hidden="true"
              className="mx-3 h-px w-8 bg-patina-dim"
            />
            <span className="text-patina">Growth</span>
          </span>
        </SectionHeading>
        <GrowthProgression
          today={today}
          selectedSign={selectedSign}
          onSelect={setSelectedSign}
        />
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="mt-16 grid gap-3 border-t border-rule pt-12 md:grid-cols-2">
        <Link
          href="/western/macro"
          className="inscription block border border-patina-dim px-8 py-7 text-center text-[1rem] leading-none text-patina transition-colors hover:border-patina hover:bg-patina-deep"
        >
          ← Macro Sky &amp; Cycles
        </Link>
        <Link
          href="/western/macro/neptune"
          className="inscription block border border-rule px-8 py-7 text-center text-[1rem] leading-none text-bone-soft transition-colors hover:border-patina-dim hover:bg-surface-alt hover:text-patina"
        >
          Neptune Sequence →
        </Link>
      </div>

      {selectedEra ? (
        <JupiterEraDrawer
          era={selectedEra}
          status={statusOf(selectedIndex, today)}
          color={ELEMENT_COLOR[selectedEra.element]}
          previous={selectedIndex > 0 ? ERAS[selectedIndex - 1] : null}
          next={selectedIndex < ERAS.length - 1 ? ERAS[selectedIndex + 1] : null}
          onNavigate={setSelectedSign}
          onClose={() => setSelectedSign(null)}
        />
      ) : null}
    </div>
  );
}
