import {
  formatPlayerImages,
  formatWinLossRatio,
  getPercentColor,
} from "@/lib/utils";
import React from "react";

const PlayerRank = ({
  player_curr_rank_image,
  player_curr_rank,
  player_curr_rank_score,
  player_max_rank_image,
  player_max_rank,
  player_max_rank_score,
  player_ranked_wins,
  player_ranked_total_matches,
}: {
  player_curr_rank_image: string;
  player_curr_rank: string;
  player_curr_rank_score: number;
  player_max_rank_image: string;
  player_max_rank: string;
  player_max_rank_score: number;
  player_ranked_wins: number;
  player_ranked_total_matches: number;
}) => {
  return (
    <div
      className="w-[32%] flex flex-col bg-[var(--secondary-background)]
         rounded-lg overflow-y-scroll  border-[1px] border-[var(--accent-color)] shadow-2xl"
    >
      <div className="h-1/2 rounded-t-lg p-3 bg-[var(--secondary-background)] shadow-2xl">
        <h1 className="font-bold text-lg">Current Rank</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={player_curr_rank_image} />
            <div>
              <h1 className="text-2xl font-extrabold">{player_curr_rank}</h1>
              <p className="text-md font-bold text-[var(--secondary-text)]">
                {player_curr_rank_score.toFixed(0)} Score
              </p>
            </div>
          </div>

          <div className="text-center text-md font-bold text-[var(--secondary-text)]">
            <p>
              {player_ranked_wins}W{" "}
              {player_ranked_total_matches - player_ranked_wins}L
            </p>
            <p
              style={{
                color: getPercentColor(
                  parseFloat(
                    formatWinLossRatio(
                      player_ranked_wins,
                      player_ranked_total_matches
                    )
                  )
                ),
              }}
            >
              {formatWinLossRatio(
                player_ranked_wins,
                player_ranked_total_matches
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="h-1/2 rounded-b-lg p-3 bg-[var(--accent-color)]">
        <h1 className="font-bold text-lg">Highest Rank</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={player_max_rank_image} />
            <div>
              <h1 className="text-2xl font-extrabold">{player_max_rank}</h1>
              <p className="text-md font-bold text-[var(--secondary-text)]">
                {player_max_rank_score.toFixed(0)} Score
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRank;
