import { Prisma } from "@prisma/client";
import { fetchSummonerEntries } from "../../lib/fetchData";
import { createTRPCRouter, publicProcedure } from "../trpc";

export type MiniSeries = {
  wins: number
  losses: number
  target: number
  progress: string
}


export type summonerWithData = {
  name: string,
  rank?: string,
  tier?: string,
  leaguePoints?: number,
  profileIconId: number,
  miniSeries?: MiniSeries
}

export const summonerRouter = createTRPCRouter({
  getSummoners: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.$queryRaw<summonerWithData[]>(
      Prisma.sql`SELECT "Summoner"."name", "se"."tier", "se"."rank", "Summoner"."profileIconId", "se"."leaguePoints", "se"."miniSeries"
FROM "Summoner"  LEFT JOIN
     (SELECT se.*
      FROM "SummonerEntries" as se
      WHERE se."id" = (SELECT "id"
                           FROM "SummonerEntries" as se2
                           WHERE se2."summonerId" = se."summonerId"
                             AND se2."queueType" = 'RANKED_SOLO_5x5'
                           ORDER BY se2."createdAt" DESC
                           LIMIT 1
                          )
     ) as "se"
     ON "se"."summonerId" = "Summoner"."id"
ORDER BY
  CASE WHEN "se"."tier" = 'CHALLENGER' THEN 1
WHEN "se"."tier" = 'GRANDMASTER' THEN 2
  WHEN "se"."tier" = 'MASTER' THEN 3
  WHEN "se"."tier" = 'DIAMOND' THEN 4
  WHEN "se"."tier" = 'PLATINUM' THEN 5
  WHEN "se"."tier" = 'GOLD' THEN 6
  WHEN "se"."tier" = 'SILVER' THEN 7
  WHEN "se"."tier" = 'BRONZE' THEN 8
    ELSE 9
  end
,"se"."rank","se"."leaguePoints" DESC`
    )
  }),
  updateSummoners: publicProcedure.query(async ({ ctx }) => {
    const summoners = await ctx.prisma.summoner.findMany()
    summoners.forEach(async (summoner) => {
      if (!summoner.summonerId) return; // TODO: Just query for those that have summonerId?
      const entries = await fetchSummonerEntries(summoner.summonerId)
      // @ts-ignore
      const data = entries.map(({ summonerId, ...attrs }) => ({...attrs, summonerId: summoner.id}))
      // @ts-ignore
      await ctx.prisma.summonerEntries.createMany({ data: data })
    })
  })
})






