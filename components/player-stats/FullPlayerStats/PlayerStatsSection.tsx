"use client";

import React, { useEffect, useState } from "react";
import SelectSeasonButton from "@/components/buttons/SelectSeasonButton";
import PlayerRankInfo from "@/components/player-stats/FullPlayerStats/PlayerRankInfo";
import PlayerStatsChart from "@/components/player-stats/FullPlayerStats/PlayerStatsChart";
import TopHeroes from "@/components/player-stats/FullPlayerStats/TopHeroes";
import TopRoles from "@/components/player-stats/FullPlayerStats/TopRoles";
import TopTeammates from "@/components/player-stats/FullPlayerStats/TopTeammates";
import PlayerMatchHistory from "@/components/player-stats/FullPlayerStats/PlayerMatchHistory";
import { fetchPlayerData } from "@/lib/actions";
import { PlayerInfo } from "@/types/playerInfo";
import { LoaderCircle, Lock } from "lucide-react";
import Link from "next/link";

const PlayerStatsSection = ({ playerUid }: { playerUid: string }) => {
  const [season, setSeason] = useState("3");
  const [playerData, setPlayerData] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPlayerData = async () => {
    setLoading(true);
    try {
      const data = await fetchPlayerData(playerUid);
      setPlayerData(data);
    } catch (err) {
      console.error("Error loading player data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayerData();
  }, [playerUid, season]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-xl font-bold text-[var(--secondary-text)] gap-3">
        <LoaderCircle className="animate-spin" size={40} />
        <p>Loading Player Stats...</p>
      </div>
    );
  }

  if (!playerData || playerData.isPrivate) {
    return (
      <section className="min-h-[100vh] p-1 md:p-5">
        <div className="w-full h-[80vh] flex flex-col gap-5 text-[var(--secondary-text)] text-2xl font-bold justify-center items-center">
          <div className="border-[4px] p-5 rounded-full">
            <Lock size={35} />
          </div>
          <h1>This player&apos;s profile is private</h1>
          <Link
            href={"/"}
            className="md:w-2/10 text-xl font-semibold bg-[var(--yellow)] text-[var(--black)] w-4/10 h-8 text-center border-[1px] border-[var(--secondary-background)] rounded-lg shadow-2xl"
          >
            Respawn
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="playerStatsPageSectionContainer">
        <SelectSeasonButton
          selectedSeason={season}
          onSeasonChange={setSeason}
        />
      </div>

      <div className="playerStatsPageSectionContainer">
        <PlayerRankInfo playerData={playerData} />
        <PlayerStatsChart matchHistory={playerData.match_history ?? []} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <TopHeroes
          heroes_ranked={playerData.heroes_ranked ?? []}
          heroes_unranked={playerData.heroes_unranked ?? []}
        />
        <TopRoles top_roles={playerData.overall_stats?.roles_played ?? {}} />
        <TopTeammates team_mates={playerData.team_mates ?? []} />
      </div>

      <div className="playerStatsPageSectionContainer">
        <PlayerMatchHistory playerUid={playerUid} />
      </div>
    </>
  );
};

export default PlayerStatsSection;
