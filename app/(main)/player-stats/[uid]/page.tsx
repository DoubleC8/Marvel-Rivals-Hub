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
import TopRoles from "@/components/player-stats/FullPlayerStats/TopRoles";
import { Lock } from "lucide-react";
import Link from "next/link";

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

  if (!playerData || playerData.isPrivate) {
    return (
      <section className="min-h-[100vh] p-1 md:p-5">
        <div className="w-full h-[80vh] flex flex-col gap-5 text-[var(--secondary-text)] text-2xl font-bold justify-center items-center">
          <div className="border-[4px] p-5 rounded-full">
            <Lock size={35} />
          </div>
          <h1>This player's profile is private</h1>
          <Link
            href={"/"}
            className="md:w-2/10
            text-xl font-semibold bg-[var(--yellow)] text-[var(--black)] w-4/10 h-8 text-center border-[1px] border-[var(--secondary-background)] rounded-lg shadow-2xl"
          >
            Respawn
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5 min-h-[100vh] p-1 md:p-5">
      <PlayerStatsHeader
        name={playerData.player.name}
        uid={playerData.uid}
        player_icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        last_inserted_match={playerData.updates?.last_inserted_match ?? null}
      />

      <div className="playerStatsPageSectionContainer">
        <PlayerRankInfo playerData={playerData} />
        <PlayerStatsChart matchHistory={playerData.match_history ?? []} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <TopHeroes
          heroes_ranked={playerData.heroes_ranked ?? []}
          heroes_unranked={playerData.heroes_unranked ?? []}
        />
        <TopRoles />
        <TopTeammates team_mates={playerData.team_mates ?? []} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <PlayerMatchHistory playerUid={playerUid} />
      </div>
    </section>
  );
};

export default page;
