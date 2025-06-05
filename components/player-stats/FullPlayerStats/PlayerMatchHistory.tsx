"use client";

import { Match } from "@/types/Match";
import React, { useEffect, useState } from "react";
import {
  formatName,
  formatPlayerImages,
  getKDA,
  getLastMatchDay,
  getMatchType,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ghost } from "lucide-react";
import { fetchPlayerMatchHistory } from "@/lib/actions";
import PaginationMenuBar from "@/components/ui/PaginationMenuBar";

const MATCHES_PER_PAGE = 20;

const PlayerMatchHistory = ({ playerUid }: { playerUid: string }) => {
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<
    "all" | "unranked" | "ranked"
  >("all");

  useEffect(() => {
    const fetchInitial = async () => {
      const { match_history } = await fetchPlayerMatchHistory(playerUid, 1);
      setMatchHistory(match_history);
      setIsLoading(false);
    };

    fetchInitial();
  }, [playerUid]);

  console.log("Match History", matchHistory);

  const filteredMatches = matchHistory.filter((match) => {
    if (selectedType === "all") return true;
    if (selectedType === "ranked") return match.game_mode_id === 2;
    if (selectedType === "unranked") return match.game_mode_id === 1;
    return false;
  });

  const totalPages = Math.ceil(filteredMatches.length / MATCHES_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredMatches.length]);

  if (matchHistory.length === 0) {
    return <p>no data availablr</p>;
  }

  return (
    <>
      <div className="playerMatchHistoryStatCard">
        <div className="flex w-full justify-between">
          <h1 className="font-extrabold text-xl">Match History</h1>
          <Select
            value={selectedType}
            onValueChange={(value) =>
              setSelectedType(value as typeof selectedType)
            }
          >
            <SelectTrigger className="w-[150px] border-[var(--accent-color)] font-extrabold">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ranked">Ranked</SelectItem>
              <SelectItem value="unranked">Unranked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            <p className="text-md font-bold text-[var(--secondary-text)]">
              Loading Matches
            </p>
          </div>
        ) : filteredMatches.length > 0 ? (
          <div
            className="lg:gap-3
          gap-2 flex flex-col"
          >
            {filteredMatches
              .slice(
                (currentPage - 1) * MATCHES_PER_PAGE,
                currentPage * MATCHES_PER_PAGE
              )
              .map((match, index) => {
                const matchType = getMatchType(match.game_mode_id);
                const daysAgo = getLastMatchDay(match.match_time_stamp);
                return (
                  <div
                    key={index}
                    className="max-h-fit flex items-center justify-between border-[1px] rounded-lg"
                    style={{
                      borderColor: match.match_player.is_win.is_win
                        ? "var(--green)"
                        : "var(--red)",
                      backgroundColor: match.match_player.is_win.is_win
                        ? "rgba(50, 205, 50, .1)"
                        : "rgba(255, 49, 49, .1)",
                    }}
                  >
                    <div
                      className="md:gap-3 md:w-2/10
                      w-1/2 flex gap-1 items-center"
                    >
                      <img
                        src={formatPlayerImages(
                          match.match_player.player_hero.hero_type
                        )}
                        className="w-[75px] h-[75px] rounded-l-lg bg-[var(--accent-color)]"
                      />

                      <div>
                        <p
                          className="lg:text-lg lg:font-bold
                        text-xs font-extrabold"
                        >
                          {formatName(match.match_player.player_hero.hero_name)}
                        </p>
                        <p
                          className={`lg:text-md 
                        text-xs font-bold ${
                          match.match_player.is_win.is_win
                            ? "text-[var(--green)]"
                            : "text-[var(--red)]"
                        }`}
                        >
                          {match.match_player.is_win.is_win ? "Win" : "Loss"}
                        </p>
                        <p
                          className="lg:text-md 
                        text-xs font-bold text-[var(--secondary-text)]"
                        >
                          {daysAgo}
                        </p>
                      </div>
                    </div>

                    <div
                      className="md:w-1/10 md:block
                    hidden"
                    >
                      <p
                        className="
                      text-md font-bold"
                      >
                        {matchType}
                      </p>
                    </div>

                    <div
                      className="sm:w-1/10 md:flex md:items-center md:justify-center
                    hidden"
                    >
                      <p
                        className="lg:w-1/2
                    w-full text-center font-extrabold text-lg py-1 rounded-sm text-[var(--black)] shadow-2xl"
                        style={{
                          backgroundColor:
                            (match.mvp_uid === match.match_player.player_uid
                              ? "var(--gold)"
                              : "") +
                            (match.svp_uid === match.match_player.player_uid
                              ? "var(--silver)"
                              : ""),
                        }}
                      >
                        {(match.mvp_uid === match.match_player.player_uid
                          ? "MVP"
                          : "") +
                          (match.svp_uid === match.match_player.player_uid
                            ? "SVP"
                            : "")}
                      </p>
                    </div>
                    {/**Md devices and bigger */}
                    <div
                      className="md:flex md:w-3/10 md:text-md
                    hidden text-center font-extrabold text-sm justify-between"
                    >
                      <div>
                        <p className="text-[var(--secondary-text)]">Kills</p>
                        <p>{match.match_player.kills}</p>
                      </div>
                      <div>
                        <p className="text-[var(--secondary-text)]">Deaths</p>
                        <p className="text-[var(--red)]">
                          {match.match_player.deaths}
                        </p>
                      </div>
                      <div>
                        <p className="text-[var(--secondary-text)]">Assists</p>
                        <p>{match.match_player.assists}</p>
                      </div>
                      <div>
                        <p className="text-[var(--secondary-text)]">KDA</p>
                        <p>
                          {getKDA(
                            match.match_player.kills,
                            match.match_player.deaths,
                            match.match_player.assists
                          )}
                        </p>
                      </div>
                    </div>

                    {/**Only shown on mobile KDA */}
                    <div
                      className="md:hidden
                    flex flex-col justify-center items-center text-xs font-bold w-1/4"
                    >
                      <p className="font-extrabold">{matchType}</p>
                      <p>
                        {match.match_player.kills} /{" "}
                        <span className="text-[var(--red)]">
                          {match.match_player.deaths}
                        </span>{" "}
                        / {match.match_player.assists}
                      </p>
                      <p className="text-[var(--secondary-text)] font-semibold">
                        {getKDA(
                          match.match_player.kills,
                          match.match_player.deaths,
                          match.match_player.assists
                        )}{" "}
                        KDA
                      </p>
                    </div>

                    <img
                      src={formatPlayerImages(match.map_thumbnail)}
                      className="sm:block sm:w-[15%]
                      hidden w-[150px] h-[75px] rounded-r-lg bg-[var(--accent-color)]"
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="font-extrabold text-2xl flex items-center justify-center gap-3 text-[var(--secondary-text)]">
            <Ghost size={25} />
            <p>No Data Yet</p>
          </div>
        )}

        <PaginationMenuBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default PlayerMatchHistory;
