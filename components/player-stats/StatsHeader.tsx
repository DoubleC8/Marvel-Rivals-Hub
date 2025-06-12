import { Search } from "lucide-react";
import React from "react";

const StatsHeader = () => {
  return (
    <div
      className="
    flex flex-col items-start justify-center"
    >
      <div
        className="
        lg:items-baseline-last
      flex gap-2 items-start"
      >
        <Search
          className="lg:w-[48px] lg:h-[48px]
        w-[30px] h-[30px]"
          color={`var(--secondary-text)`}
        />

        <h1
          className="lg:text-6xl
        text-3xl"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          Look up Player Stats
        </h1>
      </div>
      <p
        className="lg:mx-auto lg:text-xl
      text-md md:text-lg text-[var(--secondary-text)]"
      >
        Check Marvel Rivals Player Stats
      </p>
    </div>
  );
};

export default StatsHeader;
