"use client";

import axios from "axios";
import { ChartNoAxesColumn } from "lucide-react";
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

const page = () => {
  const [hero, setHero] = useState("winter soldier");
  const [consoleType, setConsoletype] = useState("ps");
  const [heroLeaderboard, setHeroLeaderboard] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

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

        setHeroLeaderboard(response.data.players.slice(0, 100));
        toast.success("Leaderboard data fetched successfuly!", {
          description: `Data for the top ${hero.toLocaleUpperCase()}
            players on ${consoleType} fetched on ${new Date().toLocaleString()}`,
        });
        console.log(heroLeaderboard);
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
    console.log(heroLeaderboard);
  }, [heroLeaderboard]);

  return (
    <section className="py-3 px-5 flex flex-col justify-center items-center gap-5">
      <h1
        className="text-7xl text-[var(--primary-text)] flex align-middle gap-3 py-2 px-5"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        <ChartNoAxesColumn size={60} />
        Leaderboards
      </h1>

      <nav className="w-full flex justify-center gap-5 h-9">
        <Select onValueChange={setHero}>
          <SelectTrigger
            className="w-1/3 bg-[var(--secondary-background)] 
          border-[var(--purple)] text-[var(--primary-text)] font-extrabold text-xl"
          >
            <SelectValue placeholder="Select a Hero" />
          </SelectTrigger>
          <SelectContent
            className="bg-[var(--secondary-background)] 
          text-[var(--primary-text)] border-[var(--purple)]"
          >
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
          <SelectTrigger
            className="w-1/3 bg-[var(--secondary-background)] 
          border-[var(--purple)] text-[var(--primary-text)] font-extrabold text-xl"
          >
            <SelectValue placeholder="Select a Console" />
          </SelectTrigger>
          <SelectContent
            className="bg-[var(--secondary-background)] 
          text-[var(--primary-text)] border-[var(--purple)]"
          >
            <SelectGroup>
              <SelectLabel className="text-xl font-bold">Consoles</SelectLabel>
              {consoles.map((console, index) => (
                <SelectItem
                  key={index}
                  value={console}
                  className="track-widest text-xl hover:bg-[var(--accent-color)] ease-in hover:cursor-pointer"
                  style={{ fontFamily: "var(--marvelFont)" }}
                >
                  {console}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </nav>

      {loading ? (
        <LeaderboardLoadingPage />
      ) : heroLeaderboard &&
        Array.isArray(heroLeaderboard) &&
        heroLeaderboard.length > 0 ? (
        <LeaderboardTable players={heroLeaderboard} /> // Pass the data here!
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
};

export default page;
