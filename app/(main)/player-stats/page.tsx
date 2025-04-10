"use client";

import axios from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";
import CardLoader from "./loading";
import SearchedPlayerCard from "@/components/cards/SearchedPlayerCard";
import { formatSearchedPlayerName } from "@/lib/utils";
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
  const [recentPlayers, setRecentPlayers] = useState<Array<PlayerInfo>>([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawPlayerInput = formData.get("playerInfo") as string | null;

    if (!rawPlayerInput) {
      return;
    }

    const isUID = /^\d+$/.test(rawPlayerInput);
    const playerIdentifier = isUID
      ? rawPlayerInput
      : formatSearchedPlayerName(rawPlayerInput);

    setPlayerInfo(undefined);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://marvelrivalsapi.com/api/v1/player/${playerIdentifier}`,
        {
          headers: { "x-api-key": apiKey },
        }
      );

      setPlayerInfo(response.data);

      //Recent searches should only be the three most recent players
      setRecentPlayers((prev) => {
        const updatedList = [response.data, ...prev].slice(0, 3); //adding the new search at the beggining of the array
        return updatedList;
      });

      toast.success(`${response.data.name}'s stats loaded successfully!`, {
        description: `Feteched on ${new Date().toLocaleString()}`,
      });
    } catch (error) {
      toast.error(`Could not load player stats.`, {
        description: "Please check the name or try using their UID.",
      });
      console.error("Error fetching player stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5">
      <div className="w-full flex justify-between items-end">
        <div className="w-6/10 flex flex-col gap-5">
          <div>
            <h1
              className="text-7xl flex gap-3"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              <Search size={60} color={`var(--secondary-text)`} />
              Look up Player Stats
            </h1>
            <p className="text-xl text-[var(--secondary-text)]">
              Check Marvel Rivals Player Stats
            </p>
          </div>

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
    </section>
  );
};

export default PlayerStatsPage;
