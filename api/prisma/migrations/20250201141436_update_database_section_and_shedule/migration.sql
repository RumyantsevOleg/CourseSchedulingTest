/*
  Warnings:

  - You are about to drop the column `endTime` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Section` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SectionSchedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sectionId" UUID NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,

    CONSTRAINT "SectionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SectionSchedule_sectionId_idx" ON "SectionSchedule"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionSchedule_sectionId_startTime_key" ON "SectionSchedule"("sectionId", "startTime");

-- AddForeignKey
ALTER TABLE "SectionSchedule" ADD CONSTRAINT "SectionSchedule_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
