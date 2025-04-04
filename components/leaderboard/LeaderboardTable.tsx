import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { get_rank } from "@/lib/utils";
import LeaderboardTableHeader from "./leaderboard-table/LeaderboardTableHeader";

interface PlayerInfo {
  cur_head_icon_id: string;
  login_os: string;
  name: string;
  rank_season?: {
    diff_score: string;
    level: number;
    max_level: number;
    max_rank_score: string;
    protect_score: number;
    rank_game_id: number;
    rank_score: string;
    update_time: number;
    win_count: number;
  };
}

interface Player {
  player_uid: number;
  info: PlayerInfo;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  mvps: number;
  svps: number;
  play_time: string;
  total_damage_taken: string;
  total_hero_damage: string;
  total_hero_heal: string;
}

interface LeaderboardTableProps {
  players: Player[];
  currentPage: number;
  playersPerPage: number;
}

const LeaderboardTable = ({
  players,
  currentPage,
  playersPerPage,
}: LeaderboardTableProps) => {
  return (
    <Table>
      <LeaderboardTableHeader />
      <TableBody>
        {players.map((player, index) => {
          const rankInfo = get_rank(player.info.rank_season?.level || 0);
          const losses = player.matches - player.wins;
          const globalRank = (currentPage - 1) * playersPerPage + index + 1;

          return (
            <TableRow
              className="bg-[var(--accent-color)] border-b-[2px] border-b-[#1A1B26] font-extrabold hover:opacity-85 ease-in hover:cursor-pointer"
              key={player.player_uid}
            >
              <TableCell className="text-center text-lg">
                {globalRank}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://marvelrivalsapi.com/rivals/players/heads/player_head_${player.info.cur_head_icon_id}.png`}
                    alt="Player Icon"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <span className="font-extrabold text-md">
                    {player.info.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={rankInfo.image || ""}
                    alt="Rank Icon"
                    width={50}
                    height={50}
                  />
                  <span className="font-extrabold text-md">
                    {rankInfo.rank}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-[var(--secondary-text)]">
                {player.info.rank_season?.rank_score}
              </TableCell>

              <TableCell>
                <div className="flex gap-2 justify-center items-center">
                  <span className="text-[var(--yellow)]">
                    {player.matches > 0
                      ? ((player.wins / player.matches) * 100).toFixed(2) + "%"
                      : "0.00%"}
                  </span>
                  <span className="text-[var(--secondary-text)]">
                    <span className="text-[var(--blue)]">{player.wins}W</span> /{" "}
                    <span className="text-[var(--red)]">{losses}L</span>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default LeaderboardTable;
