import { PrismaClient } from "@prisma/client";

/**
 * Single Prisma client, cached across dev-server hot reloads so we don't
 * exhaust the Neon connection pool.
 *
 * This points at the same database arc uses. Oddessi only ever reads from it.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
