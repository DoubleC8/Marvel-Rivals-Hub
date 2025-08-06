import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const PlayerStatsSection = () => {
  return (
    <section className="homeSection">
      <div className="homeContextCard">
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
          <p className="text-lg text-[var(--secondary-text)]">
            Search for player profiles, compare stats, and find skilled
            teammates to dominate Marvel Rivals with!
          </p>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}

        <Link href="/player-stats" className="homeSectionButton">
          Look up Player Stats
        </Link>
      </div>
      <div className="homeHeroImageCard">
        <img src="./images/Peni_Parker.webp" className="homeHeroImage"></img>
      </div>
    </section>
  );
};

export default PlayerStatsSection;
