"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import LeaderboardLoadingPage from "./loading";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import PaginationMenuBar from "@/components/leaderboard/PaginationMenuBar";
import LeaderboardNavbar from "@/components/leaderboard/LeaderboardNavbar";

interface PlayerInfo {
  cur_head_icon_id: string;
  login_os: string;
  name: string;
  rank_season?: {
    diff_score: string;
    level: number;
    max_level: number;
    max_rank_score: string;
    protect_score: number;
    rank_game_id: number;
    rank_score: string;
    update_time: number;
    win_count: number;
  };
}

interface Player {
  player_uid: number;
  info: PlayerInfo;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  mvps: number;
  svps: number;
  play_time: string;
  total_damage_taken: string;
  total_hero_damage: string;
  total_hero_heal: string;
}

const Page = () => {
  const [hero, setHero] = useState("Winter Soldier");
  const [consoleType, setConsoletype] = useState("pc");
  const [heroLeaderboard, setHeroLeaderboard] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const playersPerPage = 100;
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = heroLeaderboard.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );
  const totalPages = Math.ceil(heroLeaderboard.length / playersPerPage);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchHeroLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/heroes/leaderboard/${hero}?platform=${consoleType}`,
          {
            headers: { "x-api-key": apiKey },
          }
        );

        console.log(response.data);
        setHeroLeaderboard(response.data.players);
        toast.success("Leaderboard data fetched successfuly!", {
          description: `Data for the top ${hero.toLocaleUpperCase()}
            players fetched on ${new Date().toLocaleString()}`,
        });
      } catch (error) {
        toast.error(`Could not load leaderboard.`);
        console.error("Error fetching player stats:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchHeroLeaderboard, 500);
    return () => clearTimeout(timeoutId);
  }, [hero, consoleType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [hero, consoleType]);

  return (
    <section className="py-3 px-5 flex flex-col justify-center items-center gap-5 mb-5">
      <LeaderboardHeader />

      <LeaderboardNavbar
        onHeroChange={setHero}
        onConsoleChange={setConsoletype}
      />

      {loading ? (
        <LeaderboardLoadingPage />
      ) : (
        <div className="flex flex-col gap-5 justify-center w-full items-center">
          <p className="text-[var(--secondary-text)] w-3/4">
            Top {heroLeaderboard.length} {hero} Players on{" "}
            {consoleType.toLocaleUpperCase()}
          </p>
          <LeaderboardTable
            players={currentPlayers}
            currentPage={currentPage}
            playersPerPage={playersPerPage}
          />
          <PaginationMenuBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Page;
