import {
  formatPlayerImages,
  formatWinLossRatio,
  get_rank,
  getPercentColor,
} from "@/lib/utils";
import { LeaderboardPlayer } from "@/types/LeaderboardPlayer";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import PaginationMenuBar from "../navbars/PaginationMenuBar";
import { Ghost } from "lucide-react";

const Leaderboard = ({
  leaderboard,
  totalPlayers,
}: {
  leaderboard?: LeaderboardPlayer[];
  totalPlayers: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PLAYERS_PER_PAGE = 100;

  const paginatedLeaderboard = leaderboard?.slice(
    (currentPage - 1) * PLAYERS_PER_PAGE,
    currentPage * PLAYERS_PER_PAGE
  );

  return (
    <>
      {leaderboard?.length !== 0 ? (
        <Table className="lg:w-[90%] mx-auto !bg-[var(--secondary-background)] !border-[var(--accent-color)]">
          <TableHeader>
            <TableRow className="border-[var(--accent-color)]">
              <TableHead className="text-center font-bold rounded-tl-lg">
                Place
              </TableHead>
              <TableHead className="text-left font-bold">Player</TableHead>
              <TableHead className="font-bold text-left">Rank</TableHead>
              <TableHead className="lg:table-cell lg:text-center hidden font-bold">
                Rank Score
              </TableHead>
              <TableHead className="lg:table-cell lg:text-center hidden font-bold">
                Max Rank Score
              </TableHead>
              <TableHead className="text-center font-bold">Win Rate</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="!overflow-x-auto">
            {paginatedLeaderboard?.map((player, index) => {
              const hasDetailedRank = player.rank.rank?.rank !== undefined;
              const fallbackRank = get_rank(player.rank.level);

              return (
                <TableRow key={index} className="border-[var(--accent-color)]">
                  {/* Place */}
                  <TableCell>
                    <p className="text-md font-bold text-center">
                      {(currentPage - 1) * PLAYERS_PER_PAGE + index + 1}
                    </p>
                  </TableCell>

                  {/* Player image + name */}
                  <TableCell>
                    <div className="lg:gap-3 flex items-center gap-2">
                      <img
                        src={
                          player.icon?.player_icon
                            ? formatPlayerImages(player.icon.player_icon)
                            : formatPlayerImages(
                                `/players/heads/player_head_${player.cur_head_icon_id}.png`
                              )
                        }
                        alt={`${player.name} Icon`}
                        className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-lg"
                      />
                      <p className="text-md font-bold hover:text-[var(--yellow)] hover:cursor-pointer">
                        {player.name}
                      </p>
                    </div>
                  </TableCell>

                  {/* Rank */}
                  <TableCell>
                    {hasDetailedRank ? (
                      <div className="flex items-center gap-1">
                        {player.rank.rank?.image && (
                          <img
                            src={formatPlayerImages(player.rank.rank.image)}
                            alt={`${player.name} Rank`}
                            className="lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] rounded-lg"
                          />
                        )}
                        <div className="md:flex md:flex-col hidden">
                          <p
                            className="lg:text-lg text-md font-bold"
                            style={{
                              color: player.rank.rank?.color,
                            }}
                          >
                            {player.rank.rank?.rank}
                          </p>
                          <p className="lg:hidden text-md font-bold text-[var(--secondary-text)]">
                            {player.rank.rank_score.toFixed(2)} Score
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {fallbackRank.image && (
                          <img
                            src={fallbackRank.image}
                            alt={`${player.name} Rank`}
                            className="lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] rounded-lg"
                          />
                        )}
                        <div className="md:flex md:flex-col hidden">
                          <p
                            className="lg:text-lg text-md font-bold"
                            style={{
                              color:
                                fallbackRank.color ?? "var(--secondary-text)",
                            }}
                          >
                            {fallbackRank.rank}
                          </p>
                          <p className="lg:hidden text-md font-bold text-[var(--secondary-text)]">
                            {player.rank.rank_score.toFixed(2)} Score
                          </p>
                        </div>
                      </div>
                    )}
                  </TableCell>

                  {/* Rank Score */}
                  <TableCell className="hidden lg:table-cell lg:text-center">
                    <p className="text-md font-bold text-[var(--secondary-text)]">
                      {player.rank.rank_score.toFixed(2)}
                    </p>
                  </TableCell>

                  {/* Max Rank Score */}
                  <TableCell className="hidden lg:table-cell lg:text-center">
                    {player.rank.max_rank_score ? (
                      <p className="text-md font-bold">
                        {player.rank.max_rank_score.toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-md font-bold text-[var(--secondary-text)]">
                        No data
                      </p>
                    )}
                  </TableCell>

                  {/* Win Rate */}
                  <TableCell className="text-center">
                    <p
                      className="text-md font-bold"
                      style={{
                        color: getPercentColor(
                          formatWinLossRatio(
                            player.rank.win_count,
                            player.rank.battle_count
                          )
                        ),
                      }}
                    >
                      {formatWinLossRatio(
                        player.rank.win_count,
                        player.rank.battle_count
                      )}
                    </p>
                    <p className="md:block hidden text-md font-bold text-[var(--secondary-text)]">
                      {player.rank.win_count}W /{" "}
                      {player.rank.battle_count - player.rank.win_count}L
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto bg-[var(--secondary-background)] shadow-2xl min-h-[100vh] flex flex-col justify-center items-center text-xl font-bold gap-3 rounded-lg text-[var(--secondary-text)]">
          <Ghost size={50} />
          <p>No Data Yet</p>
        </div>
      )}

      <PaginationMenuBar
        currentPage={currentPage}
        totalPages={Math.ceil(totalPlayers / PLAYERS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Leaderboard;
