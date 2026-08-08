/**
 * Alias for the Prisma client under the path arc uses (`@/lib/prisma`).
 *
 * The astrology calculation code in `lib/astrology/` is copied verbatim from
 * arc so it can be re-synced with a plain `cp`. This re-export lets those files
 * keep their original import paths while the client itself stays defined once
 * in `lib/db.ts` — same instance, two names, no second connection pool.
 */
export { prisma } from "@/lib/db";
