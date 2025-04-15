"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchedPlayerCard from "@/components/cards/SearchedPlayerCard";
// import { formatSearchedPlayerName } from "@/lib/utils";
import { toast } from "sonner";
import { fetchPlayerData } from "@/lib/actions";
import PlayerCardLoader from "./loading";
import StatsHeader from "@/components/player-stats/StatsHeader";

interface PlayerInfo {
  player: {
    name: string;
    level: string;
    uid: string;
    icon: { player_icon: string };
    info: { login_os: string };
    rank: { rank: string; image: string; playerRank: string };
    isPrivate: boolean;
  };
  overall_stats: {
    ranked: { total_matches: number; total_wins: number };
    unranked: { total_matches: number; total_wins: number };
  };
}

const PlayerStatsPage = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const playerIdentifier = formData.get("playerInfo") as string | null;

    if (!playerIdentifier) {
      return;
    }

    // const isUID = /^\d+$/.test(rawPlayerInput);
    // const playerIdentifier = isUID
    //   ? rawPlayerInput
    //   : formatSearchedPlayerName(rawPlayerInput);

    setPlayerInfo(undefined);
    setLoading(true);

    try {
      const data = await fetchPlayerData(playerIdentifier);

      console.log(data);
      setPlayerInfo(data);
      toast.success(`${data.player.name}'s stats loaded successfully!`, {
        description: `Loaded on ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      toast.error(`Could not load player stats.`, {
        description: "Please check their name or use their UID.",
      });
      console.error("Error fetching player stats:", error);
    } finally {
      setLoading(false); // ✅ this ensures loading state is cleared no matter what
    }
  };

  return (
    <section className="w-full h-[92vh] flex flex-col p-5 justify-center">
      <div className="w-full h-1/2 flex justify-between items-end">
        <div className="w-6/10 flex flex-col gap-5">
          <StatsHeader />

          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              name="playerInfo"
              className="bg-[var(--white)] text-[var(--black)] w-full p-4 
              rounded-bl-xl rounded-tl-xl 
              focus:outline-none focus:ring-0 placeholder:text-[var(--secondary-text)]"
              placeholder="Enter In-Game Name or UID"
              required
            />
            <button
              type="submit"
              className="bg-[var(--yellow)] p-4 rounded-br-xl rounded-tr-xl hover:opacity-85"
              disabled={loading}
            >
              <Search color={`var(--black)`} />
            </button>
          </form>
        </div>
      </div>

      <div className="h-1/2 flex flex-col justify-center">
        {loading && <PlayerCardLoader />}
        {playerInfo && <SearchedPlayerCard playerInfo={playerInfo} />}
      </div>
      <p className="text-center text-[var(--secondary-text)] mt-auto">
        IMPORTANT: Searching player stats by username is a new feature and is
        not always reliable. Searching player stats by player UID is more
        stable.
      </p>
    </section>
  );
};

export default PlayerStatsPage;
