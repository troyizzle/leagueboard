import Image from "next/image";

type SummonerProfileIconProps = {
  profileIconId: number
  size: "lg" | "xl"
}

function SummonerProfileIcon({ profileIconId, size }: SummonerProfileIconProps) {
  const sizes = {
    "lg": 64,
    "xl": 84,
  }
  return (
    <Image width={sizes[size]} height={sizes[size]} src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`} alt="profile icon" />
  )
}

export default SummonerProfileIcon;
