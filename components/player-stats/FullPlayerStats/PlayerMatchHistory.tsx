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

const PlayerMatchHistory = ({ playerUid }: { playerUid: string }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [selectedType, setSelectedType] = useState<
    "all" | "unranked" | "ranked"
  >("all");

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      const { match_history, has_more } = await fetchPlayerMatchHistory(
        playerUid,
        1
      );
      setMatchHistory(match_history);
      setHasMore(has_more);
      setLoading(false);
    };

    fetchInitial();
  }, [playerUid]);

  const loadMoreMatches = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const { match_history, has_more } = await fetchPlayerMatchHistory(
      playerUid,
      nextPage
    );
    setMatchHistory((prev) => [...prev, ...match_history]);
    setHasMore(has_more);
    setPage(nextPage);
    setLoading(false);
  };

  const filteredMatches = matchHistory.filter((match) => {
    if (selectedType === "all") return true;
    if (selectedType === "ranked") return match.game_mode_id === 2;
    if (selectedType === "unranked") return match.game_mode_id === 1;
    return false;
  });

  return (
    <div className="playerStatsContainer !h-fit !w-full mx-auto flex flex-col gap-3">
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

      {filteredMatches.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredMatches.map((match, index) => {
            const matchType = getMatchType(match.game_mode_id);
            const daysAgo = getLastMatchDay(match.match_time_stamp);
            return (
              <div
                key={index}
                className="flex items-center justify-between border-[1px] rounded-lg"
                style={{
                  borderColor: match.match_player.is_win.is_win
                    ? "var(--green)"
                    : "var(--red)",
                  backgroundColor: match.match_player.is_win.is_win
                    ? //This is the same green in my global variables
                      "rgba(50, 205, 50, .1)"
                    : "rgba(255, 49, 49, .1)",
                }}
              >
                <div className="flex gap-3 items-center min-w-[20%]">
                  <img
                    src={formatPlayerImages(
                      match.match_player.player_hero.hero_type
                    )}
                    className="w-[75px] h-[75px] rounded-l-lg bg-[var(--accent-color)]"
                  />
                  <div>
                    <p className="font-extrabold text-mg">
                      {formatName(match.match_player.player_hero.hero_name)}
                    </p>
                    {match.match_player.is_win.is_win ? (
                      <p className="text-md font-bold text-[var(--green)]">
                        Win
                      </p>
                    ) : (
                      <p className="text-md font-bold text-[var(--red)]">
                        Loss
                      </p>
                    )}
                    <p className="text-sm font-bold text-[var(--secondary-text)]">
                      {daysAgo === 0
                        ? "Today"
                        : daysAgo === 1
                        ? "Yesterday"
                        : `${daysAgo} days ago`}
                    </p>
                  </div>
                </div>

                <div className="min-w-[10%]">
                  <p className="font-extrabold text-lg">{matchType}</p>
                </div>

                <p
                  className="min-w-[5%] text-center font-extrabold text-lg py-1 rounded-sm text-[var(--black)]"
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

                <div className="flex text-center font-extrabold text-lg min-w-3/10 justify-between">
                  <div>
                    <p>Kills</p>
                    <p>{match.match_player.kills}</p>
                  </div>
                  <div>
                    <p>Deaths</p>
                    <p className="text-[var(--red)]">
                      {match.match_player.deaths}
                    </p>
                  </div>
                  <div>
                    <p>Assists</p>
                    <p>{match.match_player.assists}</p>
                  </div>
                  <div>
                    <p>KDA</p>
                    <p>
                      {getKDA(
                        match.match_player.kills,
                        match.match_player.deaths,
                        match.match_player.assists
                      )}
                    </p>
                  </div>
                </div>

                <img
                  src={formatPlayerImages(match.map_thumbnail)}
                  className="w-[150px] h-[75px] rounded-r-lg bg-[var(--accent-color)] object-cover"
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
      {hasMore && (
        <button
          onClick={loadMoreMatches}
          className="self-center mt-4 px-4 py-2 font-bold bg-[var(--accent-color)] rounded-lg border border-[var(--border)]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More Matches"}
        </button>
      )}
    </div>
  );
};

export default PlayerMatchHistory;
