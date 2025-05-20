import axios from "axios";
import React from "react";
import { PlayerInfo } from "@/types/playerInfo";
import {
  formatPlayerImages,
  formatWinLossRatio,
  get_rank,
  getCurrentSeasonMaxRankInfo,
  getCurrentSeasonRankInfo,
  getTopHeroes,
} from "@/lib/utils";
import { mockPlayerData } from "@/mockPlayerData";
import PlayerStatsHeader from "@/components/player-stats/PlayerStatsHeader";
import TopHeroes from "@/components/player-stats/FullPlayerStats/TopHeroes";
import TopTeammates from "@/components/player-stats/FullPlayerStats/TopTeammates";
import PlayerRank from "@/components/player-stats/FullPlayerStats/PlayerRank";

const page = async ({ params }: { params: { uid: string } }) => {
  const userUid = params.uid;
  const playerData = mockPlayerData;

  // let playerData: PlayerInfo | null = null;

  // try {
  //   const response = await axios.get(
  //     `https://marvelrivalsapi.com/api/v1/player/${userUid}`,
  //     {
  //       headers: {
  //         "x-api-key": process.env.API_KEY!,
  //       },
  //     }
  //   );
  //   playerData = response.data;
  //   console.log(playerData);
  // } catch (error) {
  //   console.error("Error fetching player data:", error);
  // }
  // if (!playerData) {
  //   return;
  // }

  const currRankInfo = getCurrentSeasonRankInfo(
    playerData.player.info.rank_game_season
  );
  const currMaxRankInfo = getCurrentSeasonMaxRankInfo(
    playerData.player.info.rank_game_season
  );

  console.log("current rnak image:", currRankInfo?.image);

  return (
    <section className="flex flex-col gap-5 h-[100vh] p-5">
      <PlayerStatsHeader
        name={playerData.name}
        uid={playerData.player.uid}
        icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        playerLastMatch={playerData.updates.last_inserted_match}
      />

      {/**TODO: Add drop down menu to change the season data
       *
       * <SelectSeasonButton />
       *
       */}

      <div className="w-9/10 h-4/10 flex justify-between mx-auto">
        <div
          className="w-[32%] flex flex-col bg-[var(--secondary-background)]
         rounded-lg p-3 overflow-y-scroll  border-[1px] border-[var(--accent-color)] shadow-2xl"
        >
          <h1 className="font-bold text-lg">Top Roles</h1>
        </div>

        <PlayerRank
          player_curr_rank_image={currRankInfo?.image ?? ""}
          player_curr_rank={currRankInfo?.rank ?? "Unknown"}
          player_curr_rank_score={currRankInfo?.rank_score ?? 0}
          player_max_rank_image={currMaxRankInfo?.image ?? ""}
          player_max_rank={currMaxRankInfo?.rank ?? "Unknown"}
          player_max_rank_score={currMaxRankInfo?.max_rank_score ?? 0}
          player_ranked_wins={playerData.overall_stats.ranked.total_wins}
          player_ranked_total_matches={
            playerData.overall_stats.ranked.total_matches
          }
        />

        <TopTeammates teamMates={playerData.team_mates} />
      </div>

      <div className="w-9/10 h-4/10 flex justify-between mx-auto">
        <TopHeroes
          heroes_unranked={getTopHeroes(playerData.heroes_unranked)}
          heroes_ranked={getTopHeroes(playerData.heroes_ranked)}
        />
      </div>

      <div className="w-9/10 h-fit mx-auto flex flex-col gap-3">
        {playerData.match_history.map((match, index) => (
          <div key={index}>
            <img
              src={formatPlayerImages(match.player_performance.hero_type)}
            ></img>
            <p>{match.map_id}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
