import { formatPlayerImages, getPercentColor } from "@/lib/utils";
import { Ghost } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TopTeammate {
  player_info: {
    nick_name: string;
    player_icon: string;
    player_uid: number;
  };
  matches: number;
  win_rate: string;
}

const TopTeammates = ({ team_mates }: { team_mates: TopTeammate[] }) => {
  if (team_mates.length === 0) {
    return (
      <div className="playerStatsCard">
        <h1 className="font-extrabold text-xl">Top Teammates</h1>
        <div className="font-bold text-xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data</p>
        </div>
      </div>
    );
  }
  return (
    <div className="playerStatsCard overflow-y-auto">
      <h1 className="text-xl font-extrabold">Top Teammates</h1>
      <table className="table-auto w-full">
        <thead className="h-10 border-b border-[var(--accent-color)]">
          <tr className="font-extrabold text-lg">
            <th className="text-left">Player</th>
            <th className="text-right">Matches</th>
            <th className="text-right">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {team_mates.map((teamMate, index) => (
            <tr key={index} className="border-b border-[var(--accent-color)]">
              <td className="py-2 flex items-center gap-3 font-extrabold">
                <img
                  src={formatPlayerImages(teamMate.player_info.player_icon)}
                  alt={`${teamMate.player_info.nick_name} Player Icon`}
                  className="w-[45px] h-[45px] rounded-lg bg-[var(--accent-color)]"
                />
                <Link
                  href={`/player-stats/${teamMate.player_info.player_uid}`}
                  className="font-extrabold text-md hover:cursor-pointer
                         hover:text-[var(--yellow)] ease-in-out duration-100"
                >
                  {teamMate.player_info.nick_name}
                </Link>
              </td>

              <td>
                <p className="font-extrabold text-md text-right">
                  {teamMate.matches}
                </p>
              </td>

              <td>
                <p
                  className="font-extrabold text-md text-right"
                  style={{
                    color: getPercentColor(teamMate.win_rate),
                  }}
                >
                  {teamMate.win_rate}%
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTeammates;
