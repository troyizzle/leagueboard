import { PlatformId, RiotAPI } from "@fightmegg/riot-api";
import { env } from "../../env/server.mjs";

export async function fetchSummonerData(summonerName: string) {
  const rAPI = new RiotAPI('RGAPI-60e8aca5-acc5-4c13-af92-b3f076f566bf');

  return await rAPI.summoner.getBySummonerName({
    region: PlatformId.NA1,
    summonerName: summonerName
  });
}

export async function fetchSummonerEntries(summonerId: string) {
  const rAPI = new RiotAPI(env.RIOT_API_KEY);

  return await rAPI.league.getEntriesBySummonerId({
    region: PlatformId.NA1,
    summonerId: summonerId
  })
}


