import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatWinLossRatio, get_rank, getRankClass } from "@/lib/utils";
import LeaderboardTableHeader from "./leaderboard-table/LeaderboardTableHeader";
import PaginationMenuBar from "./PaginationMenuBar";

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
  totalPlayers: number;
  hero: string;
  consoleType: string;
  onPageChange: (page: number) => void;
}

const LeaderboardTable = ({
  players,
  currentPage,
  playersPerPage,
  totalPlayers,
  hero,
  consoleType,
  onPageChange,
}: LeaderboardTableProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center w-full items-center">
      <p className="text-[var(--secondary-text)] w-3/4">
        Top {totalPlayers} {hero} Players on {consoleType.toUpperCase()}
      </p>

      <Table>
        <LeaderboardTableHeader />
        <TableBody>
          {players.map((player, index) => {
            const rankInfo = get_rank(player.info.rank_season?.level || 0);
            const losses = player.matches - player.wins;
            const globalRank = (currentPage - 1) * playersPerPage + index + 1;

            return (
              <TableRow
                className="bg-[var(--accent-color)] border-b-[2px] border-b-[var(--secondary-accent-color)] font-extrabold hover:opacity-85 ease-in hover:cursor-pointer"
                key={player.player_uid}
              >
                <TableCell className="text-center text-lg">
                  <p className={getRankClass(globalRank)}>{globalRank}</p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-5">
                    <img
                      src={`https://marvelrivalsapi.com/rivals/players/heads/player_head_${player.info.cur_head_icon_id}.png`}
                      alt="Player Icon"
                      className="rounded-lg"
                      width={50}
                      height={50}
                    />
                    <span className="font-extrabold text-xl">
                      {player.info.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    {rankInfo.rank === "Invalid level" ? (
                      <>
                        <img
                          src={`https://marvelrivalsapi.com/rivals/ranked/bronze.png`}
                          alt={`${player.info.name} Rank`}
                          width={50}
                          height={50}
                        />
                        <h2 className="flex flex-col justify-center tracking-wide text-xl">
                          Bronze I
                        </h2>
                      </>
                    ) : (
                      <>
                        {rankInfo.image && (
                          <img
                            src={rankInfo.image}
                            alt="Rank Icon"
                            width={50}
                            height={50}
                          />
                        )}
                        <h2 className="font-extrabold text-xl">
                          {rankInfo.rank}
                        </h2>
                      </>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-[var(--secondary-text)] text-lg text-center">
                  {player.info.rank_season?.rank_score
                    ? player.info.rank_season?.rank_score
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 justify-center items-center text-lg">
                    <span className="text-[var(--yellow)]">
                      {player.matches > 0
                        ? formatWinLossRatio(player.wins, player.matches)
                        : "0.00%"}
                    </span>
                    <span className="text-[var(--secondary-text)]">
                      <span className="text-[var(--blue)]">{player.wins}W</span>{" "}
                      / <span className="text-[var(--red)]">{losses}L</span>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <PaginationMenuBar
        currentPage={currentPage}
        totalPages={Math.ceil(totalPlayers / playersPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default LeaderboardTable;
