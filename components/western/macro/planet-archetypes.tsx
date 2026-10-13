// components/western/macro/planet-archetypes.tsx

"use client";

import { useState } from "react";
import { BODY } from "@/lib/bodies";
import {
  PERSONAL_ARCHETYPES,
  SLOW_ARCHETYPES,
  type Planet,
  type PlanetArchetype,
} from "@/lib/astrology/planet-archetypes-data";

/**
 * A static reference panel for the planets — what each one rules
 * archetypally, before any transit or era reading is applied. The five slow
 * outer planets by default; `bodies="all"` adds the personal five.
 *
 * The panel collapses each planet into a header row; expanding it reveals the
 * core meanings without leaving the page. This keeps the macro page from
 * bloating while still answering "wait, what does Uranus actually rule?"
 * inline.
 *
 * Glyph, colour and the one-line role come from `BODY` in `lib/bodies.ts`, the
 * same source the Planets and Cycles pages read, so they never drift apart.
 */

/** Glyph, colour and role for a planet, in the shape the three faces read. */
function planetMeta(name: Planet) {
  const { glyph = "·", color, role } = BODY[name];
  return { glyph, color, description: role };
}

/** Mercury and Venus each rule two houses. */
function houseWord(planet: PlanetArchetype) {
  return planet.house.includes("&") ? "Houses" : "House";
}

function ArchetypeRow({ planet }: { planet: PlanetArchetype }) {
  const [open, setOpen] = useState(false);
  const { glyph, color, description: role } = planetMeta(planet.name)!;

  return (
    <div className="border-b border-rule-faint last:border-b-0">
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-surface"
      >
        {/* Glyph */}
        <span
          className="glyph shrink-0 text-[2.25rem] leading-none"
          style={{ color }}
          aria-hidden
        >
          {glyph}
        </span>

        {/* Name + tagline */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <span
              className="inscription text-[1.125rem] tracking-[0.1em]"
              style={{ color }}
            >
              {planet.name}
            </span>
            <span className="whitespace-nowrap text-[0.9375rem] text-bone">{role}</span>
            <span className="datum hidden whitespace-nowrap text-[0.8125rem] text-bone-faint sm:block">
              {planet.house} {houseWord(planet)}
            </span>
          </div>
          <p className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">
            {planet.tagline}
          </p>
        </div>

        {/* Keywords — only when the row is wide enough to hold them */}
        <div className="hidden shrink-0 items-center gap-2 2xl:flex">
          {planet.keywords.map((kw) => (
            <span
              key={kw}
              className="datum rounded border px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] uppercase"
              style={{
                borderColor: `${color}40`,
                color: `${color}cc`,
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Chevron */}
        <span
          aria-hidden
          className="glyph ml-2 shrink-0 text-[0.6875rem] text-patina-dim transition-transform group-hover:text-patina"
          style={open ? { transform: "rotate(90deg)" } : undefined}
        >
          ▸
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-rule-faint px-6 pb-7 pt-5">
          {/* Keyword pills — visible on all screens when open */}
          <div className="mb-5 flex flex-wrap gap-2 2xl:hidden">
            {planet.keywords.map((kw) => (
              <span
                key={kw}
                className="datum rounded border px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] uppercase"
                style={{
                  borderColor: `${color}40`,
                  color: `${color}cc`,
                }}
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Core meanings */}
          <div className="grid gap-5 sm:grid-cols-2">
            {planet.meanings.map((m) => (
              <div key={m.label}>
                <p
                  className="datum mb-1.5 text-[0.75rem] tracking-[0.18em] uppercase"
                  style={{ color: `${color}99` }}
                >
                  {m.label}
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-bone-soft">
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          {/* House note */}
          <p className="datum mt-5 border-t border-rule-faint pt-4 text-[0.8125rem] text-bone-faint">
            Natural ruler of the{" "}
            <span className="text-bone">{planet.house} {houseWord(planet).toLowerCase()}</span> — the{" "}
            {houseWord(planet).toLowerCase()} of {planet.houseDesc}.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * The compact face of a planet for the column layout: name, role and tags.
 * The column is the control; everything else opens in the detail below.
 */
function ArchetypeColumn({
  planet,
  selected,
  onSelect,
}: {
  planet: PlanetArchetype;
  selected: boolean;
  onSelect: () => void;
}) {
  const { glyph, color, description: role } = planetMeta(planet.name)!;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={selected}
      className="row-span-3 grid grid-rows-subgrid content-start border-t-2 px-4 pb-5 pt-4 text-left transition-colors hover:bg-surface"
      style={{
        borderTopColor: color,
        backgroundColor: selected ? `${color}14` : undefined,
      }}
    >
      <span className="flex items-baseline gap-2.5">
        <span className="glyph text-[1.75rem] leading-none" style={{ color }} aria-hidden>
          {glyph}
        </span>
        <span className="inscription text-[1.0625rem] tracking-[0.1em]" style={{ color }}>
          {planet.name}
        </span>
      </span>
      <span className="text-[0.9375rem] leading-snug text-bone">{role}</span>
      <span className="mt-1 flex flex-col items-start gap-1.5">
        {planet.keywords.slice(0, 5).map((kw) => (
          <span
            key={kw}
            className="datum rounded border px-2 py-0.5 text-[0.625rem] tracking-[0.12em] uppercase"
            style={{ borderColor: `${color}40`, color: `${color}cc` }}
          >
            {kw}
          </span>
        ))}
      </span>
    </button>
  );
}

/** The full-width description of the selected planet, under the columns. */
function ArchetypeDetail({ planet }: { planet: PlanetArchetype }) {
  const { glyph, color, description: role } = planetMeta(planet.name)!;

  return (
    <div className="mt-3 border-t border-b border-rule-faint px-4 py-7">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="glyph text-[2rem] leading-none" style={{ color }} aria-hidden>
          {glyph}
        </span>
        <span className="inscription text-[1.25rem] tracking-[0.1em]" style={{ color }}>
          {planet.name}
        </span>
        <span className="text-[1rem] text-bone">{role}</span>
      </div>
      <p className="mt-3 max-w-3xl text-[1rem] leading-relaxed text-bone-soft">{planet.tagline}</p>

      <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {planet.meanings.map((m) => (
          <div key={m.label}>
            <p
              className="datum mb-1.5 text-[0.75rem] tracking-[0.18em] uppercase"
              style={{ color: `${color}99` }}
            >
              {m.label}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-bone-soft">{m.body}</p>
          </div>
        ))}
      </div>

      <p className="datum mt-6 border-t border-rule-faint pt-4 text-[0.8125rem] text-bone-faint">
        Natural ruler of the <span className="text-bone">{planet.house} {houseWord(planet).toLowerCase()}</span> — the{" "}
        {houseWord(planet).toLowerCase()} of {planet.houseDesc}.
      </p>
    </div>
  );
}

/**
 * `rows` is the stacked list; `columns` sets the five planets side by side,
 * with the selected one described full width beneath them.
 */
export default function PlanetArchetypes({
  layout = "rows",
  bodies = "slow",
}: {
  layout?: "rows" | "columns";
  /** `slow` is the five outer planets; `all` puts the personal five first. */
  bodies?: "slow" | "all";
}) {
  const [selected, setSelected] = useState<Planet | null>(null);
  const planets = bodies === "all" ? [...PERSONAL_ARCHETYPES, ...SLOW_ARCHETYPES] : SLOW_ARCHETYPES;

  if (layout === "columns") {
    const detail = planets.find((p) => p.name === selected);
    return (
      <div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-3 lg:grid-cols-5">
          {planets.map((planet) => (
            <ArchetypeColumn
              key={planet.name}
              planet={planet}
              selected={planet.name === selected}
              onSelect={() => setSelected((s) => (s === planet.name ? null : planet.name))}
            />
          ))}
        </div>
        {detail && <ArchetypeDetail planet={detail} />}
      </div>
    );
  }

  return (
    <div className="border-y border-rule">
      {planets.map((planet) => (
        <ArchetypeRow key={planet.name} planet={planet} />
      ))}
    </div>
  );
}
