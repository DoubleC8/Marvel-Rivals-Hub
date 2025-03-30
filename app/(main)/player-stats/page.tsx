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
    <section className="flex flex-col h-[95vh] py-3 px-5 justify-around">
      <div className="w-full h-3/5 flex justify-between items-end">
        <div className="w-6/10 flex flex-col gap-5">
          <div>
            <h1
              className="text-7xl text-[var(--primary-text)]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Look up Player Stats
            </h1>
            <p className="text-xl text-[var(--secondary-text)]">
              Check Marvel Rivals Stats
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              name="playerInfo"
              className="bg-[var(--white)] w-full p-4 rounded-bl-2xl rounded-tl-2xl focus:outline-none focus:ring-0"
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

        <div
          className="h-3/4 w-3/10 border-[2px] 
        rounded-2xl border-[var(--purple)] bg-[var(--secondary-background)]
        py-3 px-5 "
        >
          <h1
            className="text-3xl text-[var(--primary-text)] text-center border-b-[2px] border-b-[var(--purple)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Recent Searches
          </h1>

          {recentPlayers.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              {recentPlayers.map((recentPlayer, index) => (
                <div
                  className="w-full flex items-center justify-between py-3 px-5 rounded-2xl
        text-[var(--primary-text)] hover:bg-[var(--accent-color)] ease-in"
                  style={{ fontFamily: "var(--marvelFont)" }}
                  key={index}
                >
                  <img
                    src={`https://marvelrivalsapi.com/rivals${recentPlayer?.player?.icon?.player_icon}`}
                    alt={`${recentPlayer?.player?.name} Icon`}
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col tracking-wider justify-between">
                    <h1>{recentPlayer?.player?.name}</h1>
                    <h2>{recentPlayer?.player?.uid}</h2>
                  </div>
                  <img
                    src={`https://marvelrivalsapi.com/rivals${recentPlayer?.player?.rank?.image}`}
                    alt={`${recentPlayer?.player?.name} Rank`}
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <h2>{recentPlayer?.player?.info?.login_os}</h2>
                </div>
              ))}
            </div>
          ) : (
            <h1
              className="h-[50%] text-3xl text-[var(--primary-text)] text-center flex flex-col justify-end"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              No Recent Searches
            </h1>
          )}
        </div>
      </div>

      <div className="flex flex-col h-3/5 justify-center">
        {loading && <CardLoader />}
        {playerInfo && <SearchedPlayerCard playerInfo={playerInfo} />}
      </div>
    </section>
  );
};

export default PlayerStatsPage;
