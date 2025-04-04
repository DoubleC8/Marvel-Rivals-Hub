import { ChartNoAxesColumn } from "lucide-react";
import React from "react";

const LeaderboardHeader = () => {
  return (
    <h1
      className="text-7xl text-[var(--primary-text)] flex align-middle gap-3 py-2 px-5"
      style={{ fontFamily: "var(--marvelFont)" }}
    >
      <ChartNoAxesColumn size={60} />
      Leaderboards
    </h1>
  );
};

export default LeaderboardHeader;
