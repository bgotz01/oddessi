// components/western/macro/planet-archetypes.tsx

"use client";

import { useState } from "react";

/**
 * A static reference panel for the five slow outer planets — what each one
 * rules archetypally, before any transit or era reading is applied.
 *
 * The panel collapses each planet into a header row; expanding it reveals the
 * core meanings without leaving the page. This keeps the macro page from
 * bloating while still answering "wait, what does Uranus actually rule?"
 * inline.
 */

interface PlanetArchetype {
  name: string;
  glyph: string;
  color: string;
  tagline: string;
  house: string;
  houseDesc: string;
  keywords: string[];
  meanings: { label: string; body: string }[];
}

const ARCHETYPES: PlanetArchetype[] = [
  {
    name: "Jupiter",
    glyph: "♃",
    color: "#c9a84c",
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
    glyph: "♄",
    color: "#8a8a7a",
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
    glyph: "♅",
    color: "#7ec8c8",
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
    glyph: "♆",
    color: "#6b9fd4",
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
    glyph: "♇",
    color: "#b07aad",
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
          style={{ color: planet.color }}
          aria-hidden
        >
          {planet.glyph}
        </span>

        {/* Name + tagline */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <span
              className="inscription text-[1.125rem] tracking-[0.1em]"
              style={{ color: planet.color }}
            >
              {planet.name}
            </span>
            <span className="datum hidden text-[0.8125rem] text-bone-faint sm:block">
              {planet.house} House
            </span>
          </div>
          <p className="mt-1 text-[0.9375rem] leading-snug text-bone-soft">
            {planet.tagline}
          </p>
        </div>

        {/* Keywords — hidden on smallest screens */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {planet.keywords.map((kw) => (
            <span
              key={kw}
              className="datum rounded border px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] uppercase"
              style={{
                borderColor: `${planet.color}40`,
                color: `${planet.color}cc`,
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
          <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
            {planet.keywords.map((kw) => (
              <span
                key={kw}
                className="datum rounded border px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] uppercase"
                style={{
                  borderColor: `${planet.color}40`,
                  color: `${planet.color}cc`,
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
                  style={{ color: `${planet.color}99` }}
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

export default function PlanetArchetypes() {
  return (
    <div className="border-y border-rule">
      {ARCHETYPES.map((planet) => (
        <ArchetypeRow key={planet.name} planet={planet} />
      ))}
    </div>
  );
}
