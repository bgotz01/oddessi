-- CreateTable
CREATE TABLE "scoring_preferences" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "preset" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scoring_preferences_pkey" PRIMARY KEY ("id")
);
