import { formatStats } from "@/lib/utils";
import React from "react";

interface PlayerInfo {
  player: {
    name: string;
    level: string;
    uid: string;
    icon: { player_icon: string };
    info: { login_os: string };
    rank: { image: string; playerRank: string };
  };
  overall_stats: {
    ranked: { total_matches: number; total_wins: number };
    unranked: { total_matches: number; total_wins: number };
  };
}

const SearchedPlayerCard = ({ playerInfo }: { playerInfo: PlayerInfo }) => {
  console.log(
    "Ranked tota matches: ",
    playerInfo?.overall_stats?.ranked?.total_matches
  );
  console.log(
    "Unranked tota matches: ",
    playerInfo?.overall_stats?.unranked?.total_matches
  );
  console.log("Player info", playerInfo);
  return (
    <div
      className="flex w-3/4 py-5 px-10 bg-[var(--secondary-background)] 
      border-[2px] border-[var(--purple)] rounded-2xl mx-auto text-[var(--white)] justify-between"
      style={{ fontFamily: "var(--marvelFont)" }}
    >
      <div className="flex gap-5 items-center">
        <img
          src={`https://marvelrivalsapi.com/rivals${playerInfo?.player?.icon?.player_icon}`}
          alt={`${playerInfo?.player?.name} Icon`}
          className="rounded-full"
          width={100}
          height={100}
        />
        <div className="flex flex-col tracking-wider justify-between h-[100px]">
          <h1>{playerInfo?.player?.name}</h1>
          <h2>Level: {playerInfo?.player?.level}</h2>
          <h2>UID: {playerInfo?.player?.uid}</h2>
        </div>
      </div>

      <div className="flex flex-col tracking-wider justify-between h-[100px] text-center">
        <h1 className="text-2xl">Win Percentage</h1>
        <h2>
          Ranked:{" "}
          {playerInfo?.overall_stats?.ranked?.total_matches
            ? formatStats(
                playerInfo?.overall_stats?.ranked?.total_wins,
                playerInfo?.overall_stats?.ranked?.total_matches
              )
            : "N/A"}
        </h2>
        <h2>
          Unranked:{" "}
          {playerInfo?.overall_stats?.unranked?.total_matches
            ? formatStats(
                playerInfo?.overall_stats?.unranked?.total_wins,
                playerInfo?.overall_stats?.unranked?.total_matches
              )
            : "N/A"}
        </h2>
      </div>

      <div className="flex flex-col tracking-wider justify h-[100px] text-center">
        <h1 className="text-2xl">Rank</h1>
        <h2 className="flex gap-1 items-center">
          Current Rank:{" "}
          <img
            src={`https://marvelrivalsapi.com/rivals${playerInfo?.player?.rank?.image}`}
            alt={`${playerInfo?.player?.name} Rank`}
            className="rounded-full"
            width={50}
            height={50}
          />
          {playerInfo?.player?.rank?.playerRank}
        </h2>
      </div>

      <div className="flex flex-col tracking-wider justify h-[100px] text-center">
        <h1 className="text-2xl">Console</h1>
        <h2>{playerInfo?.player?.info?.login_os}</h2>
      </div>
    </div>
  );
};

export default SearchedPlayerCard;
