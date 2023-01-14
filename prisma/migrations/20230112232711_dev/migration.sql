-- CreateTable
CREATE TABLE "Summoner" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "summonerId" TEXT,
    "puuid" TEXT,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SummonerEntries" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueId" TEXT NOT NULL,
    "summonerName" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "miniSeries" JSONB NOT NULL,

    CONSTRAINT "SummonerEntries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_name_key" ON "Summoner"("name");

-- AddForeignKey
ALTER TABLE "SummonerEntries" ADD CONSTRAINT "SummonerEntries_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "Summoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
