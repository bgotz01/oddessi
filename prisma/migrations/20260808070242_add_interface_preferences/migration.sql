-- CreateTable
CREATE TABLE "interface_preferences" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "model" TEXT NOT NULL,
    "systemPrompt" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interface_preferences_pkey" PRIMARY KEY ("id")
);
