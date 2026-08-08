-- CreateTable
CREATE TABLE "CouncilSession" (
    "id" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "agentModels" TEXT[],
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouncilSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilTurn" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouncilTurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilMessage" (
    "id" TEXT NOT NULL,
    "turnId" TEXT NOT NULL,
    "agentIndex" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "cost" DOUBLE PRECISION,

    CONSTRAINT "CouncilMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilPreferences" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "agentModels" TEXT[],
    "agentPrompts" TEXT[],
    "globalModel" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouncilPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilMemory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouncilMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model_prices" (
    "id" TEXT NOT NULL,
    "inputCost" DOUBLE PRECISION NOT NULL,
    "outputCost" DOUBLE PRECISION NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CouncilTurn_sessionId_idx" ON "CouncilTurn"("sessionId");

-- CreateIndex
CREATE INDEX "CouncilMessage_turnId_idx" ON "CouncilMessage"("turnId");

-- CreateIndex
CREATE UNIQUE INDEX "CouncilMemory_category_key" ON "CouncilMemory"("category");

-- AddForeignKey
ALTER TABLE "CouncilTurn" ADD CONSTRAINT "CouncilTurn_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CouncilSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouncilMessage" ADD CONSTRAINT "CouncilMessage_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "CouncilTurn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
