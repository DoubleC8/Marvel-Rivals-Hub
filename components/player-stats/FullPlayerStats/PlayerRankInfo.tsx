import React from "react";
import {
  formatPlayerImages,
  hexToRgba,
  formatWinLossRatio,
  getCurrentSeasonRankInfo,
  getCurrentSeasonMaxRankInfo,
} from "@/lib/utils";
import { PlayerInfo } from "@/types/playerInfo";

const PlayerRankInfo = ({ playerData }: { playerData: PlayerInfo }) => {
  const playerCurrentRankInfo = getCurrentSeasonRankInfo({
    rankSeasons: playerData.player.info.rank_game_season,
  });

  const playerCurrentMaxRankInfo = getCurrentSeasonMaxRankInfo({
    rankSeasons: playerData.player.info.rank_game_season,
  });

  return (
    <div className="playerStatsCard !p-0">
      {/* Current Rank */}
      <div
        className="p-3 h-1/2 flex-col"
        style={{
          backgroundColor: hexToRgba(playerData.player.rank.color, 0.1),
        }}
      >
        <h1 className="text-xl font-extrabold">Current Rank</h1>
        <div className="h-8/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/**Rank image */}
            <img
              src={formatPlayerImages(playerData.player.rank.image)}
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
                {playerCurrentRankInfo?.rank_score.toFixed(2)} Score
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
            <p>
              {playerData.overall_stats.ranked.total_matches > 0
                ? formatWinLossRatio(
                    playerData.overall_stats.ranked.total_wins,
                    playerData.overall_stats.ranked.total_matches
                  )
                : "0%"}{" "}
              Win Rate
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
              src={formatPlayerImages(playerData.player.rank.image)}
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
                {playerCurrentMaxRankInfo?.rank}
              </h1>
              <p
                className="xl:text-md 
              text-sm font-extrabold text-[var(--secondary-text)]"
              >
                {playerCurrentMaxRankInfo?.max_rank_score.toFixed(2)} Score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRankInfo;
