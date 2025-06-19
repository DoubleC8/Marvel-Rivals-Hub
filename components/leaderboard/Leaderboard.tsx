import { formatWinLossRatio, get_rank, getPercentColor } from "@/lib/utils";
import { LeaderboardPlayer } from "@/types/LeaderboardPlayer";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const PLAYERS_PER_PAGE = 100;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://marvelrivalsapi.com/api/v1/heroes/leaderboard/winter%20soldier",
          {
            headers: {
              "x-api-key":
                "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f", // Replace with a real key
            },
          }
        );
        setLeaderboard(response.data.players);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  console.log("Leaderboard", leaderboard);

  const paginatedLeaderboard = leaderboard?.slice(
    (currentPage - 1) * PLAYERS_PER_PAGE,
    currentPage * PLAYERS_PER_PAGE
  );

  return (
    <>
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
              MVP's
            </TableHead>

            <TableHead className="text-center font-bold">Win Rate</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="!overflow-x-auto">
          {paginatedLeaderboard?.map((player, index) => {
            //getting player rank, so we can get the image, the score, and the rank itself
            const level = player.info.rank_season.level;
            const playerRank = get_rank(level);

            return (
              <TableRow key={index} className="border-[var(--accent-color)]">
                {/**Contains place*/}
                <TableCell>
                  <p className="text-md font-bold text-center">{index + 1}</p>
                </TableCell>

                {/**Contains players name and name */}
                <TableCell>
                  <div
                    className="lg:gap-3
                flex items-center gap-2"
                  >
                    <img
                      src={`https://marvelrivalsapi.com/rivals/players/heads/player_head_${player.info.cur_head_icon_id}.png`}
                      alt={`${player.info.name} Icon`}
                      className="lg:w-[50px] lg:h-[50px]
                    w-[40px] h-[40px] rounded-lg"
                    />
                    <Link
                      href={`/player-stats/${player.player_uid}`}
                      className="text-md font-bold hover:text-[var(--yellow)]"
                    >
                      {player.info.name}
                    </Link>
                  </div>
                </TableCell>

                {/**Contains players rank and rank image */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    {playerRank.image && (
                      <img
                        src={playerRank.image}
                        alt={`${player.info.name} Rank`}
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
                          color: `${playerRank.color}`,
                        }}
                      >
                        {playerRank.rank}
                      </p>
                      <p
                        className="lg:hidden
                    text-md font-bold text-[var(--secondary-text)]"
                      >
                        {player.info.rank_season.rank_score} Score
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/**Contains players rank score. Only visible on large screens */}
                <TableCell className="hidden lg:table-cell lg:text-center">
                  <p
                    className="
                text-md font-bold text-[var(--secondary-text)]"
                  >
                    {player.info.rank_season.rank_score}
                  </p>
                </TableCell>

                {/**Contains the number of times the player has gotten mvp's*/}
                <TableCell className="hidden lg:table-cell lg:text-center">
                  <p className="text-md font-bold">{player.mvps}</p>
                </TableCell>

                {/**Contains win rate */}
                <TableCell className="text-center">
                  <p
                    className="text-md font-bold"
                    style={{
                      color: getPercentColor(
                        formatWinLossRatio(player.wins, player.matches)
                      ),
                    }}
                  >
                    {formatWinLossRatio(player.wins, player.matches)}
                  </p>
                  <p
                    className="md:block
                hidden text-md font-bold text-[var(--secondary-text)]"
                  >
                    {player.wins}W/{player.matches - player.wins}L
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PaginationMenuBar
        currentPage={currentPage}
        totalPages={Math.ceil((leaderboard?.length || 0) / PLAYERS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Leaderboard;
