import { Search } from "lucide-react";
import React from "react";

const StatsHeader = () => {
  return (
    <div className="text-center">
      <h1 className="playerStatsHeader">
        <Search
          className="playerStatsSearchIcon"
          color={`var(--secondary-text)`}
        />
        Look up Player Stats
      </h1>
      <p className="text-md md:text-xl text-[var(--secondary-text)]">
        Check Marvel Rivals Player Stats
      </p>
    </div>
  );
};

export default StatsHeader;
