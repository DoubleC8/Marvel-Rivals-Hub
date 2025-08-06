import { Trophy, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreatePlayerProfileSection = () => {
  return (
    <section className="homeSection">
      <div className="homeContextCard">
        <div className="flex flex-col">
          <div className="flex gap-3 items-stretch">
            <Trophy size={36} className="text-[var(--secondary-text)]" />
            <h1
              className="text-4xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Climb the Leaderboard
            </h1>
          </div>
          <p className="text-lg">
            Track the top 500 players across all platforms and heroes in Marvel
            Rivals. See who's dominating each role and rising through the ranks.
          </p>
        </div>

        <div className="h-full flex flex-col gap-3 text-2xl">
          <div>
            <h2 style={{ fontFamily: "var(--marvelFont)" }}>
              Hero-Based Rankings
            </h2>
            <p className="text-base text-[var(--secondary-text)]">
              Filter by your favorite hero to see who's the best in the field.
              Whether you're chasing Winter Soldier dominance or top-tier Storm
              plays, it's all here.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--marvelFont)" }}>
              Platform Breakdown
            </h2>
            <p className="text-base text-[var(--secondary-text)]">
              Sort players by PC, PlayStation, or Xbox to compare rankings.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--marvelFont)" }}>Updated Live</h2>
            <p className="text-base text-[var(--secondary-text)]">
              Our leaderboard pulls real-time data so you’re always viewing the
              most accurate stats as players win, lose, and grind ranked.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: "var(--marvelFont)" }}>
              Your Spot Awaits
            </h2>
            <p className="text-base  text-[var(--secondary-text)]">
              Think you’ve got what it takes? Keep playing, improving, and your
              name might be the next to show up.
            </p>
          </div>
        </div>
        <Link href={`/leaderboards`} className="homeSectionButton">
          Go to Leaderboard
        </Link>
      </div>

      <div>
        <img src="/images/Winter-Solider.png" className="homeHeroImage" />
      </div>
    </section>
  );
};

export default CreatePlayerProfileSection;
