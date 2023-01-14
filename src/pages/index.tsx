import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import { MiniSeries, summonerWithData } from "../server/api/routers/summoner";
import { api } from "../utils/api";

type SummonerRowProps = {
  summoner: summonerWithData
}

function SummonerRow({ summoner }: SummonerRowProps) {
  return (
    <div
      className="flex flex-row items-center bg-slate-900 relative"
      style={{ width: "90% " }}
    >
      <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summoner.profileIconId}.png`} alt="profile icon" className="w-16 h-16" />
      <span className="text-sm md:text-lg font-bold ml-2">{summoner.name}</span>
      <a className="ml-2 text-xs hover:underline" target="_blank" href={`https://www.op.gg/summoners/na/${summoner.name}`}>op.gg</a>
      <div className="ml-auto flex flex-row items-center">
        {summoner.tier &&
          <div className="relative">
            {summoner.miniSeries && <MiniSeries {...summoner.miniSeries} />}
            <img title={`${summoner.leaguePoints} LP`} src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${summoner.tier.toLowerCase()}.png`} alt="rank" className="w-16 h-16" />
          </div>
        }
        {summoner.leaguePoints && <span style={{ minWidth: "3vmin" }} className="text-sm text-slate-400 text-right">{summoner.leaguePoints}</span>}
      </div>
    </div>
  )
}


function MiniSeries({ progress }: MiniSeries) {
  return (
    <div className="absolute flex flex-col top-0.5 text-center">
      {progress.split("").map((char, index) => (
        <div key={index} className={clsx("rounded-lg text-xs p-0.5 w-4 self-center", {
          ["bg-green-300"]: char == "W",
          ["bg-red-300"]: char == "L",
          ["bg-gray-300"]: char == "N"
        })}>{char}</div>
      )
      )}
    </div>
  )
}

const Home: NextPage = () => {
  const summoners = api.summoner.getSummoners.useQuery()

  return (
    <>
      <Head>
        <title>League</title>
        <meta name="description" content="league" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center text-white w-full mt-2">
        <div className="flex justify-center text-2xl md:text-3xl uppercase">
          Current solo/duo rankings
        </div>
        <div className="text-sm mb-3">
          Ranks are visible once placements are completed
        </div>
        {summoners.data && (
          <div id="leaderboard" className="flex flex-col space-y-2 items-center w-full">
            {summoners.data.map((summoner) => <SummonerRow key={summoner.name} summoner={summoner} />)}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
