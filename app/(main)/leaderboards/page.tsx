"use client";

import React, { useState, useEffect, useActionState } from "react";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import axios from "axios";
import { LeaderboardResponse } from "@/types/LeaderboardPlayer";
import { LoaderCircle } from "lucide-react";
import SelectSeasonButton from "@/components/buttons/SelectSeasonButton";
import { fetchLeaderBoard } from "@/lib/actions";

const Page = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse>();
  const [season, setSeason] = useState<string>("3");
  const [device, setDevice] = useState<string>("pc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchLeaderBoard(season, device);
      setLeaderboardData(data);
      setLoading(false);
    };
    getData();
  }, [season, device]);

  console.log("Season: " + season + " Console: " + device + " leaderboard: ");
  console.log(leaderboardData);
  return (
    <section
      className="lg:gap-5
    w-full min-h-screen gap-2 flex flex-col py-5 px-1"
    >
      <LeaderboardHeader />

      <div className="leaderboardNavbarSection">
        <p
          className="lg:w-1/2
        text-[var(--secondary-text)] text-md"
        >
          Top 500 players in Marvel Rivals
        </p>
        <div
          className="lg:w-1/2 lg:justify-end lg:gap-2
        w-full flex items-center justify-evenly"
        >
          {/* <SelectSeasonButton /> */}
          <Select onValueChange={setSeason} defaultValue={season}>
            <SelectTrigger className="leaderboardNavbarDropdown">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
              <SelectGroup>
                <SelectLabel>Seasons</SelectLabel>
                <SelectItem value="0">Season 0</SelectItem>
                <SelectItem value="1">Season 1</SelectItem>
                <SelectItem value="1.5">Season 1.5</SelectItem>
                <SelectItem value="2">Season 2</SelectItem>
                <SelectItem value="2.5">Season 2.5</SelectItem>
                <SelectItem value="3">Season 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setDevice} defaultValue={device}>
            <SelectTrigger className="leaderboardNavbarDropdown">
              <SelectValue placeholder="Select a Platform" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
              <SelectGroup>
                <SelectLabel>Platforms</SelectLabel>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="ps">Playstation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading || !leaderboardData ? (
        <div
          className="lg:w-[90%]
          w-full mx-auto bg-[var(--secondary-background)] shadow-2xl 
          min-h-[100vh] flex flex-col justify-center items-center text-xl font-bold gap-3 rounded-lg text-[var(--secondary-text)]"
        >
          <LoaderCircle
            size={50}
            color="var(--purple)"
            className="animate-spin"
          />
          <p>Loading Leaderboard</p>
        </div>
      ) : (
        <Leaderboard
          leaderboard={leaderboardData.players}
          totalPlayers={leaderboardData.total_players}
        />
      )}

      <p className="text-center text-[var(--secondary-text)] mt-auto text-sm md:text-md">
        IMPORTANT: Leaderboards may appear limited at the start of the season.
        More player data will populate as the season progresses and players
        complete ranked matches.
      </p>
    </section>
  );
};

export default Page;
