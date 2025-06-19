import { ChartNoAxesColumn } from "lucide-react";
import React from "react";

const LeaderboardHeader = () => {
  return (
    <div className="flex gap-1 items-start justify-center">
      <ChartNoAxesColumn
        color={`var(--secondary-text)`}
        className="lg:w-[48px] lg:h-[48px]
        w-[30px] h-[30px]"
      />
      <h1
        className="lg:text-6xl
        text-3xl"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        Leaderboards
      </h1>
    </div>
  );
};

export default LeaderboardHeader;
