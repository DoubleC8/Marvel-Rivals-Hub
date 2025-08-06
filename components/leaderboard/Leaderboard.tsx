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
  const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

  return (
    <>
      {leaderboard?.length !== 0 ? (
        <Table
          className="lg:w-[90%] mx-auto
    !bg-[var(--secondary-background)] !border-[var(--accent-color)]"
        >
          <TableHeader>
            <TableRow className="border-[var(--accent-color)]">
              <TableHead className="text-center font-bold rounded-tl-lg">
                Place
              </TableHead>

              <TableHead className="text-left font-bold">Player</TableHead>

              <TableHead className="font-bold text-left">Rank</TableHead>

              <TableHead
                className="lg:table-cell lg:text-center
          hidden font-bold"
              >
                Rank Score
              </TableHead>

              <TableHead
                className="lg:table-cell lg:text-center
          hidden font-bold"
              >
                Max Rank Score
              </TableHead>

              <TableHead className="text-center font-bold">Win Rate</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="!overflow-x-auto">
            {paginatedLeaderboard?.map((player, index) => {
              return (
                <TableRow key={index} className="border-[var(--accent-color)]">
                  {/**Contains place*/}
                  <TableCell>
                    <p className="text-md font-bold text-center">
                      {(currentPage - 1) * PLAYERS_PER_PAGE + index + 1}
                    </p>
                  </TableCell>

                  {/**Contains players name and image */}
                  {/**Contains players name and image */}
                  <TableCell>
                    <div className="lg:gap-3 flex items-center gap-2">
                      <img
                        src={formatPlayerImages(player.icon.player_icon)}
                        alt={`${player.name} Icon`}
                        className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-lg"
                      />

                      {/**Might change back to a link once i figure out how to check if profile is private */}
                      <p className="text-md font-bold hover:text-[var(--yellow)]">
                        {player.name}
                      </p>
                    </div>
                  </TableCell>

                  {/**Contains players rank and rank image */}
                  <TableCell>
                    {/**Displays if user has a privated their profile */}
                    {isEmptyObject(player.rank.rank) ? (
                      <div
                        className="lg:justify-normal
                      flex items-center justify-center gap-1"
                      >
                        <Ghost
                          className="lg:w-[35px] lg:h-[35px]
                      w-[30px] h-[30px] text-[var(--secondary-text)]"
                        />
                        <div
                          className="
                    md:flex md:flex-col
                    hidden"
                        >
                          <p
                            className="lg:text-lg
                      text-md font-bold text-[var(--secondary-text)]"
                          >
                            Private Data
                          </p>
                        </div>
                      </div>
                    ) : (
                      //Displays if users profile is public
                      <div className="flex items-center gap-1">
                        {player.rank.rank.image && (
                          <img
                            src={formatPlayerImages(player.rank.rank.image)}
                            alt={`${player.name} Rank`}
                            className="lg:w-[50px] lg:h-[50px]
                      w-[45px] h-[45px] rounded-lg"
                          />
                        )}
                        <div
                          className="
                    md:flex md:flex-col
                    hidden"
                        >
                          <p
                            className="lg:text-lg
                      text-md font-bold"
                            style={{
                              color: `${player.rank.rank.color}`,
                            }}
                          >
                            {player.rank.rank.rank}
                          </p>
                          <p
                            className="lg:hidden
                    text-md font-bold text-[var(--secondary-text)]"
                          >
                            {player.rank.rank_score.toFixed(2)} Score
                          </p>
                        </div>
                      </div>
                    )}
                  </TableCell>

                  {/**Contains players rank score. Only visible on large screens */}
                  <TableCell className="hidden lg:table-cell lg:text-center">
                    <p
                      className="
                text-md font-bold text-[var(--secondary-text)]"
                    >
                      {player.rank.rank_score.toFixed(2)}
                    </p>
                  </TableCell>

                  {/**Contains the max rank score*/}
                  <TableCell className="hidden lg:table-cell lg:text-center">
                    <p className="text-md font-bold">
                      {player.rank.max_rank_score.toFixed(2)}
                    </p>
                  </TableCell>

                  {/**Contains win rate */}
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
                    <p
                      className="md:block
                hidden text-md font-bold text-[var(--secondary-text)]"
                    >
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
        <div
          className="lg:w-[90%]
          w-full mx-auto bg-[var(--secondary-background)] shadow-2xl 
          min-h-[100vh] flex flex-col justify-center items-center text-xl font-bold gap-3 rounded-lg text-[var(--secondary-text)]"
        >
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
