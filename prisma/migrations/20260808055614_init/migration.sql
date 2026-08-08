-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_development_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "personal_development_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "birth_chart_data" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthTime" TEXT NOT NULL,
    "birthLocation" TEXT,
    "birthLatitude" DOUBLE PRECISION NOT NULL,
    "birthLongitude" DOUBLE PRECISION NOT NULL,
    "birthTimezone" TEXT NOT NULL,
    "gender" TEXT,
    "sunSign" TEXT,
    "moonSign" TEXT,
    "risingSign" TEXT,
    "planetPositions" JSONB,
    "housePositions" JSONB,
    "angles" JSONB,
    "aspects" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "birth_chart_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "life_cycle_cache" (
    "id" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "planet" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "peakDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "significance" TEXT NOT NULL,
    "themes" TEXT[],
    "houseNumber" INTEGER,
    "natalPlanet" TEXT,
    "aspectType" TEXT,
    "sign" TEXT,
    "cycleLength" TEXT NOT NULL,
    "actualDuration" TEXT,
    "interpretation" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "life_cycle_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "personal_development_profiles_userId_key" ON "personal_development_profiles"("userId");

-- CreateIndex
CREATE INDEX "birth_chart_data_profileId_idx" ON "birth_chart_data"("profileId");

-- CreateIndex
CREATE INDEX "birth_chart_data_profileId_isDefault_idx" ON "birth_chart_data"("profileId", "isDefault");

-- CreateIndex
CREATE INDEX "life_cycle_cache_chartId_idx" ON "life_cycle_cache"("chartId");

-- CreateIndex
CREATE INDEX "life_cycle_cache_chartId_status_idx" ON "life_cycle_cache"("chartId", "status");

-- CreateIndex
CREATE INDEX "life_cycle_cache_startDate_idx" ON "life_cycle_cache"("startDate");

-- CreateIndex
CREATE INDEX "life_cycle_cache_endDate_idx" ON "life_cycle_cache"("endDate");

-- CreateIndex
CREATE UNIQUE INDEX "life_cycle_cache_chartId_cycleId_key" ON "life_cycle_cache"("chartId", "cycleId");

-- AddForeignKey
ALTER TABLE "personal_development_profiles" ADD CONSTRAINT "personal_development_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "birth_chart_data" ADD CONSTRAINT "birth_chart_data_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "personal_development_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
