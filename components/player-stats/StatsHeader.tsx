import { Search } from "lucide-react";
import React from "react";

const StatsHeader = () => {
  return (
    <div>
      <h1
        className="text-7xl flex gap-3"
        style={{ fontFamily: "var(--marvelFont)" }}
      >
        <Search size={60} color={`var(--secondary-text)`} />
        Look up Player Stats
      </h1>
      <p className="text-xl text-[var(--secondary-text)]">
        Check Marvel Rivals Player Stats
      </p>
    </div>
  );
};

export default StatsHeader;
