-- AlterTable
ALTER TABLE "birth_chart_data" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "birth_chart_data_profileId_sortOrder_idx" ON "birth_chart_data"("profileId", "sortOrder");
