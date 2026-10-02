// Shapes shared by the Pluto Inversion route and its component.

export const INVERSION_COLUMNS = ["capricorn", "aquarius", "why"] as const;
export type InversionColumn = (typeof INVERSION_COLUMNS)[number];

export const COLUMN_LABELS: Record<InversionColumn, string> = {
  capricorn: "Capricorn",
  aquarius: "→ Aquarius",
  why: "Why it follows",
};

export type InversionRow = Record<InversionColumn, string>;

export type InversionResult = { rows: InversionRow[]; predictions: string[] };

export const VERDICTS = ["strong", "promising", "unconvincing"] as const;

export type InversionCritique = {
  // Index into the rows the critique was run against.
  row: number;
  verdict: (typeof VERDICTS)[number];
  objection: string;
  explanation: string;
  // Replacement text, only for the columns the critic wants changed.
  modification: Partial<Record<InversionColumn, string>>;
};
