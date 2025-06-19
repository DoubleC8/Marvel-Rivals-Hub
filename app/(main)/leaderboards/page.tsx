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

const Page = () => {
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

      <Leaderboard />

      <p className="text-center text-[var(--secondary-text)] mt-auto text-sm md:text-md">
        IMPORTANT: Leaderboards may appear limited at the start of the season.
        More player data will populate as the season progresses and players
        complete ranked matches.
      </p>
    </section>
  );
};

export default Page;
