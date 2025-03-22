import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const PlayerStatsSection = () => {
  return (
    <section className="mt-5 pt-5 pb-5 flex items-center justify-center gap-10">
      <div className="flex flex-col gap-5 w-[40%]">
        <div className="flex flex-col">
          <span className="flex gap-3">
            <Search size={35} />
            <h1
              className="text-4xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Track Player Stats & Rankings!
            </h1>
          </span>
          <p className="text-lg">
            Search for player profiles, compare stats, and find skilled
            teammates to dominate Marvel Rivals with!
          </p>
        </div>

        {/*TODO: Make this take you player stats page */}
        <div>
          <Link
            href="/"
            className="text-2xl tracking-wide bg-[var(--yellow)] 
                py-3 px-7 rounded-xl hover:opacity-85 hover:underline"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Look up Player Stats
          </Link>
        </div>
      </div>
      <div className="w-40%">
        <img src="/images/Peni_Parker.webp" className="h-[700px]"></img>
      </div>
    </section>
  );
};

export default PlayerStatsSection;
