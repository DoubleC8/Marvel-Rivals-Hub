import { formatPlayerImages } from "@/lib/utils";
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

const TopTeammates = ({ teamMates }: { teamMates: TopTeammate[] }) => {
  return (
    <div
      className="w-[32%] flex flex-col bg-[var(--secondary-background)]
         rounded-lg p-3 overflow-y-scroll  border-[1px] border-[var(--accent-color)] shadow-2xl"
    >
      <h1 className="font-bold text-xl">Top Teammates</h1>

      <table className="table-auto">
        <thead className="h-10 border-b border-[var(--accent-color)]">
          <tr className="font-extrabold text-lg">
            <th className="text-left">Player</th>
            <th className="text-right">Matches</th>
            <th className="text-right">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {teamMates.map((teamMate, index) => (
            <tr key={index} className="border-b border-[var(--accent-color)]">
              <td className="py-2">
                <div className="flex gap-3 items-center">
                  <img
                    src={formatPlayerImages(teamMate.player_info.player_icon)}
                    alt={`${teamMate.player_info.nick_name} Player Icon`}
                    className="w-[40px] rounded-lg"
                  />
                  <Link
                    href={`/player-stats/${teamMate.player_info.player_uid}`}
                    className="font-extrabold text-md hover:cursor-pointer
                         hover:text-[var(--yellow)] ease-in-out duration-100"
                  >
                    {teamMate.player_info.nick_name}
                  </Link>
                </div>
              </td>
              <td>
                <h1 className="font-extrabold text-right text-md">
                  {teamMate.matches}
                </h1>
              </td>
              <td>
                <h1
                  className="font-extrabold text-md text-right"
                  style={{
                    color:
                      parseFloat(teamMate.win_rate) < 25
                        ? "var(--red)"
                        : parseFloat(teamMate.win_rate) <= 50
                        ? "var(--yellow)"
                        : "var(--green)",
                  }}
                >
                  {teamMate.win_rate}%
                </h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTeammates;
