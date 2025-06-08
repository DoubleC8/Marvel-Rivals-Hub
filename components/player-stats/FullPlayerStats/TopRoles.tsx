import React from "react";

const TopRoles = () => {
  return (
    <div className="playerStatsCard overflow-y-auto">
      <h1 className="font-extrabold text-xl flex items-center">Top Roles</h1>

      <div className="h-9/10 flex flex-col justify-evenly">
        <div className="flex gap-5 items-center h-1/4 w-full justify-between ">
          <img
            src="/images/Duelistv2.webp"
            alt="Duelist Icon"
            className="w-[50px] h-[50px]
              bg-[var(--accent-color)] p-1 rounded-full"
          />
          <div className="text-center">
            <h1 className="text-md font-bold">Duelist</h1>
            <p>Win Percentage</p>
            <p>Wins | Losses</p>
          </div>

          <div>
            <h1 className="text-md font-bold">KDA</h1>
            <p className="text-sm text-[var(--secondary-text)]">K/D/A</p>
          </div>
        </div>

        <div className="flex gap-5 items-center h-1/4 w-full justify-between ">
          <img
            src="/images/Strategistv2.webp"
            alt="Strategist Icon"
            className="w-[50px] h-[50px]
              bg-[var(--accent-color)] p-1 rounded-full"
          />
          <div className="text-center">
            <h1 className="text-md font-bold">Strategist</h1>
            <p>Win Percentage</p>
            <p>Wins | Losses</p>
          </div>

          <div>
            <h1 className="text-md font-bold">KDA</h1>
            <p className="text-sm text-[var(--secondary-text)]">K/D/A</p>
          </div>
        </div>

        <div className="flex gap-5 items-center h-1/4 w-full justify-between ">
          <img
            src="/images/Vanguardv2.webp"
            alt="Vanguard Icon"
            className="w-[50px] h-[50px]
              bg-[var(--accent-color)] p-1 rounded-full"
          />
          <div className="text-center">
            <h1 className="text-md font-bold">Vanguard</h1>
            <p>Win Percentage</p>
            <p>Wins | Losses</p>
          </div>

          <div>
            <h1 className="text-md font-bold">KDA</h1>
            <p className="text-sm text-[var(--secondary-text)]">K/D/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRoles;
