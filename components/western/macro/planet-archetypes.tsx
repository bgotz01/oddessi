// components/western/macro/planet-archetypes.tsx

"use client";

import { useState } from "react";
import { planetMeta, type SlowPlanet } from "@/lib/bodies";

/**
 * A static reference panel for the five slow outer planets — what each one
 * rules archetypally, before any transit or era reading is applied.
 *
 * The panel collapses each planet into a header row; expanding it reveals the
 * core meanings without leaving the page. This keeps the macro page from
 * bloating while still answering "wait, what does Uranus actually rule?"
 * inline.
 *
 * Glyph, colour and the one-line role come from `lib/bodies.ts`, the same
 * source the Cycles pages read, so the two never drift apart.
 */

interface PlanetArchetype {
  name: SlowPlanet;
  tagline: string;
  house: string;
  houseDesc: string;
  keywords: string[];
  meanings: { label: string; body: string }[];
}

const ARCHETYPES: PlanetArchetype[] = [
  {
    name: "Jupiter",
    tagline: "Expansion, luck, optimism, wisdom, and abundance.",
    house: "9th",
    houseDesc: "philosophy, travel, and higher mind",
    keywords: ["Expansion", "Wisdom", "Optimism", "Abundance", "Faith"],
    meanings: [
      {
        label: "Expansion and Growth",
        body: "Jupiter magnifies everything it touches, bringing wealth, prosperity, and a desire to broaden your horizons.",
      },
      {
        label: "Higher Learning and Philosophy",
        body: "It rules higher education, deep philosophies, wisdom, law, and cross-cultural travel.",
      },
      {
        label: "Optimism and Faith",
        body: "It governs your sense of hope, luck, generosity, and trust in the universe.",
      },
      {
        label: 'The "Teacher" Energy',
        body: "It acts as a spiritual guide or mentor, helping you see the bigger picture rather than getting bogged down in the details.",
      },
    ],
  },
  {
    name: "Saturn",
    tagline: "Discipline, structure, responsibility, boundaries, and time.",
    house: "10th",
    houseDesc: "career, public status, and authority",
    keywords: ["Discipline", "Structure", "Karma", "Boundaries", "Maturity"],
    meanings: [
      {
        label: "Discipline and Responsibility",
        body: "Saturn demands hard work, commitment, accountability, and maturity.",
      },
      {
        label: "Boundaries and Limitations",
        body: "It sets restrictions, defines rules, and reminds you of reality and your personal limits.",
      },
      {
        label: "Karma and Time",
        body: "It is the planet of long-term timing, endurance, and reaping what you sow over decades.",
      },
      {
        label: "The Saturn Return",
        body: "A major astrological milestone happening around ages 29 and 58, marking a period of intense personal maturity, reality checks, and life restructuring.",
      },
    ],
  },
  {
    name: "Uranus",
    tagline: "Rebellion, innovation, sudden change, liberation, and eccentricity.",
    house: "11th",
    houseDesc: "community, networks, and hopes for the future",
    keywords: ["Revolution", "Innovation", "Liberation", "Shock", "Individuality"],
    meanings: [
      {
        label: "Revolution and Rebellion",
        body: "Uranus disrupts the status quo, prompting you to break free from societal expectations and outdated traditions.",
      },
      {
        label: "Sudden Change and Shocks",
        body: "It brings lightning-fast transformations, sudden epiphanies, and unexpected twists of fate.",
      },
      {
        label: "Individuality and Eccentricity",
        body: "It rules your unique quirks, original thinking, genius-level intellect, and your desire to be authentically yourself.",
      },
      {
        label: "Technology and the Future",
        body: "It governs science, invention, humanitarian efforts, and collective progress toward the future.",
      },
    ],
  },
  {
    name: "Neptune",
    tagline: "Dreams, imagination, spirituality, illusion, and dissolution.",
    house: "12th",
    houseDesc: "the hidden, the collective unconscious, and endings",
    keywords: ["Spirituality", "Imagination", "Dreams", "Illusion", "Dissolution"],
    meanings: [
      {
        label: "Spirituality and Mysticism",
        body: "It connects you to the divine, universal love, and the collective unconscious.",
      },
      {
        label: "Imagination and Arts",
        body: "It rules inspiration, poetry, music, film, photography, and dance.",
      },
      {
        label: "Illusion and Escapism",
        body: "It clouds logical thinking, leading to dreams, fantasies, or deception and addictions.",
      },
    ],
  },
  {
    name: "Pluto",
    tagline: "Transformation, power, regeneration, rebirth, and the subconscious.",
    house: "8th",
    houseDesc: "shared resources, intimacy, and transformation",
    keywords: ["Transformation", "Power", "Rebirth", "Shadow", "Generations"],
    meanings: [
      {
        label: "Transformation and Rebirth",
        body: "Pluto governs cyclical change, similar to the myth of the phoenix rising from the ashes. It breaks things down completely so they can be rebuilt stronger.",
      },
      {
        label: "Power and Control",
        body: "It rules personal empowerment, shadow work, hidden motives, and the struggle between control and surrender.",
      },
      {
        label: "The Subconscious and Taboo",
        body: "It digs beneath the surface to uncover secrets, psychological truths, and things that are hidden or taboo.",
      },
      {
        label: "Generational Shifts",
        body: "Because it moves so slowly, Pluto shapes entire generations, driving massive cultural transformations, systemic collapses, and societal rebirths.",
      },
    ],
  },
];

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
              {planet.house} House
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
            <span className="text-bone">{planet.house} house</span> — the house
            of {planet.houseDesc}.
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
      <span className="mt-1 flex flex-wrap content-start gap-1.5">
        {planet.keywords.slice(0, 3).map((kw) => (
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
        Natural ruler of the <span className="text-bone">{planet.house} house</span> — the house
        of {planet.houseDesc}.
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
}: {
  layout?: "rows" | "columns";
}) {
  const [selected, setSelected] = useState<SlowPlanet | null>(null);

  if (layout === "columns") {
    const detail = ARCHETYPES.find((p) => p.name === selected);
    return (
      <div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-3 lg:grid-cols-5">
          {ARCHETYPES.map((planet) => (
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
      {ARCHETYPES.map((planet) => (
        <ArchetypeRow key={planet.name} planet={planet} />
      ))}
    </div>
  );
}
