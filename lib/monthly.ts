import { prisma } from "@/lib/prisma";
import type { MonthlySummary } from "@prisma/client";

export type { MonthlySummary };

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function monthName(month: number): string {
  return MONTH_NAMES[month - 1] ?? String(month);
}

export async function listMonthlySummaries(year?: number): Promise<MonthlySummary[]> {
  return prisma.monthlySummary.findMany({
    where: year !== undefined ? { year } : undefined,
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });
}

export async function upsertMonthlySummary(data: {
  year: number;
  month: number;
  primaryProject: string;
  projects: string;
  body: string;
}): Promise<MonthlySummary> {
  return prisma.monthlySummary.upsert({
    where: { year_month: { year: data.year, month: data.month } },
    update: {
      primaryProject: data.primaryProject,
      projects: data.projects,
      body: data.body,
    },
    create: data,
  });
}
