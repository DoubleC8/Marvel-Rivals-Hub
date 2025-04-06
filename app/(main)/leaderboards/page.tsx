"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LeaderboardLoadingPage from "./loading";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import PaginationMenuBar from "@/components/leaderboard/PaginationMenuBar";

//list of all heroes in marvel rivals
const heroes = [
  "Adam Warlock",
  "Black Panther",
  "Black Widow",
  "Captain America",
  "Cloak and Dagger",
  "Doctor Strange",
  "Groot",
  "Hawkeye",
  "Hela",
  "Hulk",
  "Human Torch",
  "Invisible Woman",
  "Iron Fist",
  "Iron Man",
  "Jeff the Land Shark",
  "Loki",
  "Luna Snow",
  "Magik",
  "Magneto",
  "Mantis",
  "Mister Fantastic",
  "Moon Knight",
  "Namor",
  "Peni Parker",
  "Psylocke",
  "The Punisher",
  "The Thing",
  "Rocket Raccoon",
  "Scarlet Witch",
  "Squirrel Girl",
  "Spider-Man",
  "Star-Lord",
  "Storm",
  "Thor",
  "Venom",
  "Winter Soldier",
  "Wolverine",
];

//list of consoles
const consoles = ["pc", "ps", "xbox"];

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

      <nav className="w-3/4 flex justify-between h-9">
        <Select onValueChange={setHero}>
          <SelectTrigger className="w-[45%] bg-[var(--secondary-background)] border-[var(--purple)] border-[2px] text-[var(--primary-text)] font-extrabold text-xl">
            <SelectValue
              placeholder="Select a Hero"
              style={{ fontFamily: "var(--marvelFont)" }}
            />
          </SelectTrigger>
          <SelectContent className="bg-[var(--secondary-background)] text-[var(--primary-text)] border-[var(--purple)]">
            <SelectGroup>
              <SelectLabel className="text-xl font-bold">Heroes</SelectLabel>
              {heroes.map((hero, index) => (
                <SelectItem
                  key={index}
                  value={hero}
                  className="track-widest text-xl hover:bg-[var(--accent-color)] ease-in hover:cursor-pointer"
                  style={{ fontFamily: "var(--marvelFont)" }}
                >
                  {hero}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setConsoletype}>
          <SelectTrigger className="w-[45%] bg-[var(--secondary-background)] border-[var(--purple)] border-[2px] text-[var(--primary-text)] font-extrabold text-xl">
            <SelectValue placeholder="Select a Console" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--secondary-background)] text-[var(--primary-text)] border-[var(--purple)]">
            <SelectGroup>
              <SelectLabel className="text-xl font-bold">Consoles</SelectLabel>
              {consoles.map((console, index) => (
                <SelectItem
                  key={index}
                  value={console}
                  className="track-widest text-xl hover:bg-[var(--accent-color)] ease-in hover:cursor-pointer"
                >
                  {console.toLocaleUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </nav>

      {loading ? (
        <LeaderboardLoadingPage />
      ) : (
        <div className="flex flex-col gap-5 justify-center w-full items-center">
          <p className="text-[var(--secondary-text)] w-3/4">
            Top 500 {hero} Players on {consoleType.toLocaleUpperCase()}
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
