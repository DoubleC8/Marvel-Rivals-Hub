import React from "react";
import { mockPlayerData } from "@/mockPlayerData";
import TopHeroes from "@/components/player-stats/FullPlayerStats/TopHeroes";
import TopTeammates from "@/components/player-stats/FullPlayerStats/TopTeammates";

import PlayerStatsChart from "@/components/player-stats/FullPlayerStats/PlayerStatsChart";

import PlayerMatchHistory from "@/components/player-stats/FullPlayerStats/PlayerMatchHistory";
import PlayerRankInfo from "@/components/player-stats/FullPlayerStats/PlayerRankInfo";
import { PlayerInfo } from "@/types/playerInfo";
import { fetchPlayerData } from "@/lib/actions";
import SelectSeasonButton from "@/components/player-stats/FullPlayerStats/SelectSeasonButton";
import PlayerStatsHeader from "@/components/player-stats/FullPlayerStats/PlayerStatsHeader";

const page = async ({ params }: { params: { uid: string } }) => {
  const playerUid = await params.uid;
  //const playerData: PlayerInfo | null = mockPlayerData;

  let playerData: PlayerInfo | null = null;

  try {
    const playerDataResponse = await fetchPlayerData(playerUid);

    playerData = playerDataResponse;
    console.log("Player Data", playerData);
  } catch (error) {
    console.error("Error fetching player data", error);
  }
  if (!playerData) {
    return;
  }

  console.log("Player Data", playerData);

  return (
    <section className="flex flex-col gap-5 min-h-[100vh] p-1 md:p-5">
      <PlayerStatsHeader
        name={playerData.name}
        uid={playerData.uid}
        player_icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        last_inserted_match={playerData.updates.last_inserted_match}
      />

      <div className="playerStatsPageSectionContainer">
        <PlayerRankInfo playerData={playerData} />
        <PlayerStatsChart matchHistory={playerData.match_history} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <TopHeroes
          heroes_ranked={playerData.heroes_ranked}
          heroes_unranked={playerData.heroes_unranked}
        />

        <div className="playerStatsCard overflow-y-auto">
          <h1 className="font-extrabold text-xl flex items-center">
            Top Roles
          </h1>
        </div>

        <TopTeammates team_mates={playerData.team_mates} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <PlayerMatchHistory playerUid={playerUid} />
      </div>
    </section>
  );
};

export default page;
