/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logoUrl",
DROP COLUMN "website";
