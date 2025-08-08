import React from "react";
import {
  formatPlayerImages,
  hexToRgba,
  formatWinLossRatio,
  getPercentColor,
} from "@/lib/utils";
import { PlayerInfo } from "@/types/playerInfo";
import { Ghost } from "lucide-react";

const PlayerRankInfo = ({ playerData }: { playerData: PlayerInfo }) => {
  if (playerData.player.rank.rank === "Invalid level") {
    return (
      <div className="playerStatsCard">
        <h1 className="font-extrabold text-xl">Current Rank</h1>
        <div className="font-bold text-xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data Yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="playerStatsCard !p-0">
      {/* Current Rank */}
      <div
        className="p-3 h-1/2 flex-col rounded-t-lg"
        style={{
          backgroundColor: hexToRgba(playerData.player.rank.color, 0.1),
        }}
      >
        <h1 className="text-xl font-extrabold">Current Rank</h1>
        <div className="h-8/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/**Rank image */}
            <img
              src={formatPlayerImages(playerData.player.rank.icon)}
              alt={`${playerData.name} Current Rank Icon`}
              className="xl:w-[100px] xl:h-[100px]
              w-[75px] h-[75px]"
            />

            {/**Rank and score */}
            <div>
              <h1
                className="xl:text-lg 
              text-md font-extrabold"
              >
                {playerData.player.rank.rank}
              </h1>
              <p
                className="xl:text-md 
              text-sm font-extrabold text-[var(--secondary-text)]"
              >
                {playerData.player.rank.score} Score
              </p>
            </div>
          </div>

          {/**Matches playes this season and win rate */}
          <div
            className="xl:text-md 
              text-sm font-extrabold text-[var(--secondary-text)] text-end"
          >
            <h1>
              {playerData.overall_stats.ranked.total_wins}W |{" "}
              {playerData.overall_stats.ranked.total_matches -
                playerData.overall_stats.ranked.total_wins}
              L
            </h1>
            <p
              style={{
                color: getPercentColor(
                  formatWinLossRatio(
                    playerData.overall_stats.ranked.total_wins,
                    playerData.overall_stats.ranked.total_matches
                  )
                ),
              }}
            >
              {playerData.overall_stats.ranked.total_matches > 0
                ? formatWinLossRatio(
                    playerData.overall_stats.ranked.total_wins,
                    playerData.overall_stats.ranked.total_matches
                  )
                : "0%"}{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Highest Rank */}
      <div className="p-3 h-1/2 flex-col">
        <h1 className="text-xl font-extrabold">Highest Rank</h1>
        <div className="h-8/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/**Rank image */}
            <img
              src={formatPlayerImages(playerData.player.rank.peak_rank.icon)}
              alt={`${playerData.name} Current Rank Icon`}
              className="xl:w-[100px] xl:h-[100px]
              w-[75px] h-[75px]"
            />

            {/**Rank and score */}
            <div>
              <h1
                className="xl:text-lg 
              text-md font-extrabold"
              >
                {playerData.player.rank.peak_rank.rank}
              </h1>
              <p
                className="xl:text-md 
              text-sm font-extrabold text-[var(--secondary-text)]"
              >
                {playerData.player.rank.peak_rank.score} Score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRankInfo;
