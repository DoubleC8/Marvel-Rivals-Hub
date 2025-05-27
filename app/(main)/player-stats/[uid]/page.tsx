import React from "react";
import { mockPlayerData } from "@/mockPlayerData";
import PlayerStatsHeader from "@/components/player-stats/PlayerStatsHeader";
import TopHeroes from "@/components/player-stats/FullPlayerStats/TopHeroes";
import TopTeammates from "@/components/player-stats/FullPlayerStats/TopTeammates";

import PlayerStatsChart from "@/components/player-stats/FullPlayerStats/PlayerStatsChart";

import PlayerMatchHistory from "@/components/player-stats/FullPlayerStats/PlayerMatchHistory";
import PlayerRankInfo from "@/components/player-stats/FullPlayerStats/PlayerRankInfo";
import { PlayerInfo } from "@/types/playerInfo";
import { fetchPlayerData } from "@/lib/actions";

const page = async ({ params }: { params: { uid: string } }) => {
  const playerUid = params.uid;
  const playerData = mockPlayerData;

  // let playerData: PlayerInfo | null = null;

  // try {
  //   const playerDataResponse = await fetchPlayerData(playerUid);

  //   playerData = playerDataResponse;
  //   console.log("Player Data", playerData);
  // } catch (error) {
  //   console.error("Error fetching player data", error);
  // }
  // if (!playerData) {
  //   return;
  // }

  return (
    <section className="flex flex-col gap-5 min-h-[100vh] p-5">
      <PlayerStatsHeader
        name={playerData.name}
        uid={playerData.uid}
        player_icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        last_inserted_match={playerData.updates.last_inserted_match}
      />

      <div className="w-9/10 mx-auto flex justify-end">
        <div
          className="h-8 w-35 text-center bg-[var(--secondary-background)] border-[1px] border-[var(--accent-color)] text-xl rounded-lg
          font-extrabold hover:cursor-pointer hover:opacity-85 ease-in-out
          duration-100"
        >
          Season
        </div>
      </div>

      <div className="w-9/10 mx-auto flex justify-between">
        <PlayerRankInfo playerData={playerData} />

        <div className="playerStatsContainer !w-[66%] !p-0">
          <PlayerStatsChart matchHistory={playerData.match_history} />
        </div>
      </div>

      <div className="w-9/10 mx-auto flex justify-between">
        <TopHeroes
          heroes_ranked={playerData.heroes_ranked}
          heroes_unranked={playerData.heroes_unranked}
        />

        <div className="playerStatsContainer">
          <h1 className="font-extrabold text-xl">Top Roles</h1>
        </div>

        <TopTeammates team_mates={playerData.team_mates} />
      </div>

      <div className="w-9/10 mx-auto flex flex-col gap-3">
        <PlayerMatchHistory playerUid={playerUid} />
      </div>
    </section>
  );
};

export default page;
