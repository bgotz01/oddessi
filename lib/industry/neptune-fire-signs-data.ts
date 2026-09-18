// lib/industry/neptune-fire-signs-data.ts

export type FireSignRow = {
  axis: string;
  sagittarius: string;
  aries: string;
};

export type FireSignColumn = {
  sign: string;
  symbol: string;
  archetype: string;
  color: string;
};

export const FIRE_SIGN_COLUMNS: FireSignColumn[] = [
  {
    sign: "Sagittarius",
    symbol: "♐",
    archetype: "Explorers",
    color: "#e07a50",
  },
  {
    sign: "Aries",
    symbol: "♈",
    archetype: "Pioneers",
    color: "#c97fb0",
  },
];

export const FIRE_SIGN_ROWS: FireSignRow[] = [
  {
    axis: "Archetype",
    sagittarius: "Explorers",
    aries: "Pioneers",
  },
  {
    axis: "Cultural unit",
    sagittarius: "Experience",
    aries: "Creator / World",
  },
  {
    axis: "Value",
    sagittarius: "Discovery",
    aries: "Originality",
  },
  {
    axis: "Structure",
    sagittarius: "Expansion",
    aries: "Differentiation",
  },
  {
    axis: "Artist role",
    sagittarius: "Explore new territory",
    aries: "Create new territory",
  },
  {
    axis: "Identity",
    sagittarius: "Experimental",
    aries: "Distinct",
  },
  {
    axis: "Audience",
    sagittarius: "Explore",
    aries: "Follow",
  },
  {
    axis: "Direction",
    sagittarius: "Outward",
    aries: "Forward",
  },
  {
    axis: "Symbol",
    sagittarius: "Explorer",
    aries: "Pioneer",
  },
];

// ── Pisces → Aries inversion ──────────────────────────────────────────────────

export type PiscesAriesRow = {
  axis: string;
  pisces: string;
  aries: string;
};

export const PISCES_COLUMN = {
  sign: "Pisces",
  symbol: "♓",
  archetype: "The Collective",
  color: "#7899d4",
} as const;

export const ARIES_COLUMN = {
  sign: "Aries",
  symbol: "♈",
  archetype: "The Pioneers",
  color: "#c97fb0",
} as const;

export const PISCES_ARIES_ROWS: PiscesAriesRow[] = [
  { axis: "Archetype", pisces: "The Collective", aries: "The Pioneers" },
  { axis: "Core impulse", pisces: "Merge", aries: "Initiate" },
  { axis: "Culture", pisces: "Shared culture", aries: "Pioneering communities" },
  { axis: "Artist", pisces: "Participates in the collective", aries: "Breaks away from the collective" },
  { axis: "Sound", pisces: "Shared sonic language", aries: "Signature sonic language" },
  { axis: "Genres", pisces: "Boundaries dissolve", aries: "New boundaries form" },
  { axis: "Identity", pisces: "Fluid / blended", aries: "Distinct / self-defined" },
  { axis: "Discovery", pisces: '"What is everyone listening to?"', aries: '"Who is doing something new?"' },
  { axis: "Audience", pisces: "Moves between sounds", aries: "Gathers around creators" },
  { axis: "Direction", pisces: "Convergence", aries: "Differentiation" },
  { axis: "Symbol", pisces: "Crowd", aries: "Pioneer" },
];
