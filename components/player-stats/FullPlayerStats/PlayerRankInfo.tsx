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
    <div className="playerStatsContainer !p-0">
      {/* Current Rank */}
      <div
        className="p-3 h-1/2"
        style={{
          backgroundColor: hexToRgba(playerData.player.rank.color, 0.1),
        }}
      >
        <h1 className="font-extrabold text-xl">Current Rank</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={formatPlayerImages(playerData.player.rank.image)}
              alt={`${playerData.name} Current Rank Icon`}
              className="w-[100px] h-[100px]"
            />
            <div>
              <h1 className="font-extrabold text-2xl">
                {playerData.player.rank.rank}
              </h1>
              <p className="font-bold text-md text-[var(--secondary-text)]">
                {playerCurrentRankInfo?.rank_score.toFixed(2)} Score
              </p>
            </div>
          </div>

          <div className="font-bold text-md text-[var(--secondary-text)]">
            <h1>
              {playerData.overall_stats.ranked.total_wins}W |{" "}
              {playerData.overall_stats.ranked.total_matches -
                playerData.overall_stats.ranked.total_wins}
              L
            </h1>
            <p>
              {formatWinLossRatio(
                playerData.overall_stats.ranked.total_wins,
                playerData.overall_stats.ranked.total_matches
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Highest Rank */}
      <div className="p-3 h-1/2">
        <h1 className="font-extrabold text-xl">Highest Rank</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={playerCurrentMaxRankInfo?.image ?? undefined}
              alt={`${playerData.name} Highest Rank Icon`}
              className="w-[100px] h-[100px]"
            />
            <div>
              <h1 className="font-extrabold text-2xl">
                {playerCurrentMaxRankInfo?.rank}
              </h1>
              <p className="font-bold text-md text-[var(--secondary-text)]">
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
