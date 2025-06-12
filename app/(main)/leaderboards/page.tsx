"use client";

import React, { useState, useEffect } from "react";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import SelectHeroButton from "@/components/leaderboard/SelectHeroButton";

const Page = () => {
  return (
    <section className="w-full h-[100vh] gap-5 flex flex-col p-5 justify-between">
      <LeaderboardHeader />

      <div className="playerStatsPageSectionContainer !bg-red-500 items-center">
        <p className="text-[var(--secondary-text)] text-md">
          Top 500 players in Marvel Rivals
        </p>
        <SelectHeroButton />
      </div>

      <p className="text-center text-[var(--secondary-text)]">
        IMPORTANT: Leaderboards may appear limited at the start of the season.
        More player data will populate as the season progresses and players
        complete ranked matches.
      </p>
    </section>
  );
};

export default Page;
