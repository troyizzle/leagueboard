import { prisma } from "../src/server/db";
import { fetchSummonerData, fetchSummonerEntries } from "../src/server/lib/fetchData";

async function main() {
  await prisma.summonerEntries.deleteMany()
  await prisma.summoner.deleteMany()

  const summonerNames = ['Austin', 'wrist x6', 'maLkaviAn', 'Обеспечить Гаджи', 'come outside', 'oxycontent']
  summonerNames.forEach(async (name) => {
    const summonerData = await fetchSummonerData(name)
    const entriesData = await fetchSummonerEntries(summonerData.id)
    const { id: summonerId, ...rest } = summonerData
    await prisma.summoner.create({
      data: {
        summonerId,
        ...rest,
        entries: {
          create: entriesData.map(({ summonerId, ...attrs }) => attrs)
        }
      }
    })

  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
