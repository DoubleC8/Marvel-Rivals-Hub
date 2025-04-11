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
  return (
    <div
      className="flex w-3/4 h-[150px] p-5 bg-[var(--secondary-background)] 
      border-[2px] border-[var(--purple)] items-center rounded-xl mx-auto justify-between"
      style={{ fontFamily: "var(--marvelFont)" }}
    >
      <div className="flex gap-5 items-center">
        <img
          src={`https://marvelrivalsapi.com/rivals${playerInfo?.player?.icon?.player_icon}`}
          alt={`${playerInfo?.player?.name} Icon`}
          className="rounded-xl"
          width={100}
          height={100}
        />
        <div className="flex flex-col tracking-wide text-xl justify-between h-[100px]">
          <p>{playerInfo?.player?.name}</p>
          <p>Level {playerInfo?.player?.level}</p>
          <p>UID: {playerInfo?.player?.uid}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 h-[100px] text-center ">
        <h1 className="text-3xl tracking-wider">Win Percentage</h1>
        <div className="tracking-wide text-xl">
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
      </div>

      <div className="flex flex-col h-[100px] text-center">
        <h1 className="text-3xl tracking-wider">Rank</h1>
        <div className="flex justify-center h-[50px] ">
          <h2 className="flex flex-col justify-center tracking-wide text-xl">
            Current Rank: {playerInfo?.player?.rank?.playerRank}
          </h2>
          <img
            src={`https://marvelrivalsapi.com/rivals${playerInfo?.player?.rank?.image}`}
            alt={`${playerInfo?.player?.name} Rank`}
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 h-[100px] text-center ">
        <h1 className="text-3xl tracking-wider">Console</h1>
        <h2 className="text-xl tracking-wide">
          {playerInfo?.player?.info?.login_os}
        </h2>
      </div>
    </div>
  );
};

export default SearchedPlayerCard;
