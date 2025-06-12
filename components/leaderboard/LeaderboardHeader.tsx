import { ChartNoAxesColumn } from "lucide-react";
import React from "react";

const LeaderboardHeader = () => {
  return (
    <div className="pageHeader">
      <ChartNoAxesColumn
        color={`var(--secondary-text)`}
        className="headerIcon"
      />
      <h1 style={{ fontFamily: "var(--marvelFont)" }}>Leaderboards</h1>
    </div>
  );
};

export default LeaderboardHeader;
