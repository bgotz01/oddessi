-- AlterTable
ALTER TABLE "interface_chat_sessions" ADD COLUMN     "chartId" TEXT,
ADD COLUMN     "chartName" TEXT;

-- CreateIndex
CREATE INDEX "interface_chat_sessions_chartId_idx" ON "interface_chat_sessions"("chartId");
