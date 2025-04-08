import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const PlayerStatsSection = () => {
  return (
    <section
      className="h-full w-full px-5 py-20 flex
   justify-center items-center gap-5"
    >
      <div
        className="flex flex-col gap-5 p-5 border-[2px] border-[var(--purple)] 
    rounded-lg w-[45%] h-fit bg-[var(--background)]"
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-stretch">
            <Search size={36} className="text-[var(--secondary-text)]" />
            <h1
              className="text-[36px]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Track Player Stats & Rankings!
            </h1>
          </div>
          <p className="text-[20px] text-[var(--secondary-text)]">
            Search for player profiles, compare stats, and find skilled
            teammates to dominate Marvel Rivals with!
          </p>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}
        <div>
          <Link href="/player-stats" className="homeSectionButton">
            Look up Player Stats
          </Link>
        </div>
      </div>
      <div className="w-[45%]  flex flex-col items-center">
        <img src="/images/Peni_Parker.webp" className="h-[700px]"></img>
      </div>
    </section>
  );
};

export default PlayerStatsSection;
