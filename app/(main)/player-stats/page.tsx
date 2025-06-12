"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchedPlayerCard from "@/components/cards/SearchedPlayerCard";
import { toast } from "sonner";
import { fetchPlayerData } from "@/lib/actions";
import PlayerCardLoader from "./loading";
import StatsHeader from "@/components/player-stats/StatsHeader";
import { PlayerInfo } from "@/types/playerInfo";
import PrivatePlayerCard from "@/components/cards/PrivatePlayerCard";

const PlayerStatsPage = () => {
  const [playerCardInfo, setPlayerCardInfo] = useState<PlayerInfo>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const playerIdentifier = formData.get("playerInfo") as string | null;

    if (!playerIdentifier) {
      return;
    }

    setPlayerCardInfo(undefined);
    setLoading(true);

    try {
      const data = await fetchPlayerData(playerIdentifier);

      console.log(data);
      setPlayerCardInfo(data);

      if ("isPrivate" in data && data.isPrivate) {
        toast.warning("This player's profile is private.");
      } else {
        toast.success(`${data.player.name}'s stats loaded successfully!`, {
          description: `Loaded on ${new Date().toLocaleString()}`,
        });
      }
    } catch (error) {
      toast.error(`Could not load player stats.`, {
        description: "Please check their name or use their UID.",
      });
      console.error("Error fetching player stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[100vh] h-[100vh] flex flex-col p-1 md:p-5">
      <div
        className="lg:h-1/2 lg:justify-end
      h-3/10 flex flex-col justify-center items-center gap-3"
      >
        <StatsHeader />

        <form
          onSubmit={handleSubmit}
          className="lg:w-[75%]
          w-[95%] flex justify-center shadow-2xl"
        >
          <input
            name="playerInfo"
            className="w-9/10 h-9 px-3 bg-[var(--white)] rounded-l-lg text-[var(--black)] outline-0"
            placeholder="Enter In-Game Name or UID"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-1/10 bg-[var(--yellow)] flex justify-center items-center rounded-r-lg"
          >
            <Search color={`var(--black)`} />
          </button>
        </form>
      </div>

      <div
        className="lg:h-1/2 lg:flex lg:flex-col lg:justify-center
        h-7/10"
      >
        {loading && <PlayerCardLoader />}
        {playerCardInfo?.isPrivate ? (
          <PrivatePlayerCard />
        ) : (
          playerCardInfo && (
            <SearchedPlayerCard playerCardInfo={playerCardInfo} />
          )
        )}
      </div>

      <p className="text-center text-[var(--secondary-text)] mt-auto text-sm md:text-md">
        IMPORTANT: Searching player stats by username is a new feature and is
        not always reliable. Searching player stats by player UID is more
        stable.
      </p>
    </section>
  );
};

export default PlayerStatsPage;
