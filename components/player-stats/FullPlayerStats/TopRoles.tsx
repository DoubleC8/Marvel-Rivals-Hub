import React from "react";
import { PlayerInfo } from "@/types/playerInfo";
import { Ghost } from "lucide-react";
import { getPercentColor } from "@/lib/utils";

interface TopRolesProps {
  top_roles: PlayerInfo["overall_stats"]["roles_played"];
}

const TopRoles: React.FC<TopRolesProps> = ({ top_roles }) => {
  const hasData =
    top_roles &&
    Object.values(top_roles).some((role) => role.matches_played > 0);

  if (!hasData) {
    return (
      <div className="playerStatsCard">
        <h1 className="font-extrabold text-xl">Top Roles</h1>
        <div className="font-bold text-xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data Yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playerStatsCard overflow-y-auto">
      <h1 className="font-extrabold text-xl flex items-center">Top Roles</h1>
      <div className="h-9/10 flex flex-col justify-evenly pt-3">
        {Object.entries(top_roles).map(([roleName, stats]) => (
          <div className="flex gap-5 items-center h-1/4 w-full" key={roleName}>
            <div className="w-1/3">
              <img
                src={`/images/${
                  roleName.charAt(0).toUpperCase() + roleName.slice(1)
                }v2.webp`}
                alt={`${roleName.charAt(0).toUpperCase} Icon`}
                className="w-[50px] h-[50px]
              bg-[var(--accent-color)] p-1 rounded-full
              hover:bg-[var(--gold)] ease-in-out duration-100"
              />
            </div>

            <div className="text-center w-1/3">
              <h1 className="text-md font-bold">
                {roleName.charAt(0).toLocaleUpperCase() +
                  String(roleName).slice(1)}
              </h1>
              <p
                className="text-sm font-extrabold"
                style={{
                  color: getPercentColor(stats.win_percentage.win_rate),
                }}
              >
                {stats.win_percentage.win_rate}
              </p>
              <p className="text-sm font-bold text-[var(--secondary-text)]">
                {stats.matches_won} W |{" "}
                {Math.max(
                  Number(stats.matches_played) - Number(stats.matches_won),
                  0
                ).toFixed(0)}{" "}
                L
              </p>
            </div>

            <div className="text-end w-1/3">
              <h1 className="text-md font-bold">KDA {stats.kda_ratio.kda}</h1>
              <p className="text-sm font-semibold text-[var(--secondary-text)]">
                {stats.kills}/
                <span className="text-[var(--red)]">{stats.deaths}</span>/
                {stats.assists}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRoles;
