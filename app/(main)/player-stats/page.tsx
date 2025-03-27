"use client";

import axios from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";
import CardLoader from "./loading";
import SearchedPlayerCard from "@/components/cards/SearchedPlayerCard";
import { formatSearchedPlayerName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PlayerInfo {
  player: {
    name: string;
    level: string;
    uid: string;
    icon: { player_icon: string };
    info: { login_os: string };
    rank: { image: string; playerRank: string };
  };
  overall_stats: {
    ranked: { total_matches: number; total_wins: number };
    unranked: { total_matches: number; total_wins: number };
  };
}

const PlayerStatsPage = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>();
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawPlayerName = formData.get("playerInfo");

    if (!rawPlayerName || typeof rawPlayerName !== "string") {
      return;
    }

    const playerName = formatSearchedPlayerName(rawPlayerName);

    setPlayerInfo(undefined);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://marvelrivalsapi.com/api/v1/player/${playerName}`,
        {
          headers: { "x-api-key": apiKey },
        }
      );

      setPlayerInfo(response.data);

      toast.success(`Player stats loaded successfully!`, {
        description: `Fetched on ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      toast.error(`Couldn't find player stats.`, {
        description: "Please check the name or try using the UID.",
      });
      console.error("Error fetching player stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-[95vh] gap-20">
      <div className="flex flex-col gap-3 text-center justify-end h-[50%]">
        <h1
          className="text-7xl text-[var(--primary-text)]"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Look up Player Stats
        </h1>
        <p className="text-xl text-[var(--secondary-text)]">
          Check Marvel Rivals Stats
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            name="playerInfo"
            className="bg-[var(--white)] w-1/2 p-4 rounded-bl-2xl rounded-tl-2xl focus:outline-none focus:ring-0"
            placeholder="Enter In-Game Name or UID"
            required
          />
          <button
            type="submit"
            className="bg-[var(--yellow)] p-4 rounded-br-2xl rounded-tr-2xl hover:opacity-85"
            disabled={loading}
          >
            <Search />
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-start h-[45%]">
        {loading && <CardLoader />}
        {playerInfo && <SearchedPlayerCard playerInfo={playerInfo} />}
      </div>
    </section>
  );
};

export default PlayerStatsPage;
