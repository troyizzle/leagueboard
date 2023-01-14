import { PlatformId, RiotAPI } from "@fightmegg/riot-api";
import { env } from "process";
import { z } from "zod";
import RiotClient from "../../../lib/riot";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getData: publicProcedure.input(z.object({ summonerName: z.string() }))
    .query(async ({ input }) => {
      (async () => {
        const rAPI = new RiotAPI('RGAPI-af144825-cb77-4d30-ae24-c485880e984b');

        const summoner = await rAPI.summoner.getBySummonerName({
          region: PlatformId.NA1,
          summonerName: "Austin",
        });

        console.log(summoner)
      })()
    }),
});
