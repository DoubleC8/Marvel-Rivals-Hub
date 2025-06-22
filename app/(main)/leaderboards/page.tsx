"use client";

import React, { useState, useEffect } from "react";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import SelectHeroButton from "@/components/leaderboard/SelectHeroButton";
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
import { LeaderboardPlayer } from "@/types/LeaderboardPlayer";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://marvelrivalsapi.com/api/v1/heroes/leaderboard/winter%20soldier",
          {
            headers: {
              "x-api-key":
                "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f", // Replace with a real key
            },
          }
        );
        setLeaderboard(response.data.players);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

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
          <SelectHeroButton />

          <Select>
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

      {leaderboard !== undefined ? (
        <Leaderboard leaderboard={leaderboard} />
      ) : (
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
