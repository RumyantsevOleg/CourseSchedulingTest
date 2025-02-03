/*
  Warnings:

  - Added the required column `endTime` to the `SectionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionSchedule" ADD COLUMN     "endTime" INTEGER NOT NULL;
