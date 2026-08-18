-- Fix CouncilMemory: drop old unique on category, add chartId column + new indexes
-- (These changes already exist in the live DB; this migration records them for Prisma's history.)

-- Drop the old single-column unique index if it still exists
DROP INDEX IF EXISTS "CouncilMemory_category_key";

-- Add chartId column if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'CouncilMemory' AND column_name = 'chartId'
  ) THEN
    ALTER TABLE "CouncilMemory" ADD COLUMN "chartId" TEXT;
  END IF;
END$$;

-- Add composite unique index if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'CouncilMemory' AND indexname = 'CouncilMemory_chartId_category_key'
  ) THEN
    CREATE UNIQUE INDEX "CouncilMemory_chartId_category_key" ON "CouncilMemory"("chartId", "category");
  END IF;
END$$;

-- Add chartId index if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'CouncilMemory' AND indexname = 'CouncilMemory_chartId_idx'
  ) THEN
    CREATE INDEX "CouncilMemory_chartId_idx" ON "CouncilMemory"("chartId");
  END IF;
END$$;

-- Add monthly_summaries table
CREATE TABLE "monthly_summaries" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "primaryProject" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_summaries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "monthly_summaries_year_month_key" ON "monthly_summaries"("year", "month");
CREATE INDEX "monthly_summaries_year_idx" ON "monthly_summaries"("year");
