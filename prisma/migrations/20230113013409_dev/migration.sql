/*
  Warnings:

  - Added the required column `accountId` to the `Summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileIconId` to the `Summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revisionDate` to the `Summoner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerLevel` to the `Summoner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summoner" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "profileIconId" INTEGER NOT NULL,
ADD COLUMN     "revisionDate" INTEGER NOT NULL,
ADD COLUMN     "summonerLevel" INTEGER NOT NULL;
