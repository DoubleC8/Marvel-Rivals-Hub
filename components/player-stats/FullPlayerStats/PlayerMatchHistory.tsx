"use client";

import { Match } from "@/types/Match";
import React, { useState } from "react";
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

const PlayerMatchHistory = ({ match_history }: { match_history: Match[] }) => {
  const [selectedType, setSelectedType] = useState<
    "all" | "unranked" | "ranked"
  >("all");

  const filteredMatches = match_history.filter((match) => {
    if (selectedType === "all") {
      return true;
    }
    if (selectedType === "unranked") {
      return match.game_mode_id === 1;
    }
    if (selectedType === "ranked") {
      return match.game_mode_id === 2;
    }
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
                  borderColor: match.player_performance.is_win.is_win
                    ? "var(--green)"
                    : "var(--red)",
                  backgroundColor: match.player_performance.is_win.is_win
                    ? //This is the same green in my global variables
                      "rgba(50, 205, 50, .1)"
                    : "rgba(255, 49, 49, .1)",
                }}
              >
                <div className="flex gap-3 items-center min-w-[20%]">
                  <img
                    src={formatPlayerImages(match.player_performance.hero_type)}
                    className="w-[75px] h-[75px] rounded-l-lg bg-[var(--accent-color)]"
                  />
                  <div>
                    <p className="font-extrabold text-mg">
                      {formatName(match.player_performance.hero_name)}
                    </p>
                    {match.player_performance.is_win.is_win ? (
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
                      (match.mvp_uid === match.player_performance.player_uid
                        ? "var(--gold)"
                        : "") +
                      (match.svp_uid === match.player_performance.player_uid
                        ? "var(--silver)"
                        : ""),
                  }}
                >
                  {(match.mvp_uid === match.player_performance.player_uid
                    ? "MVP"
                    : "") +
                    (match.svp_uid === match.player_performance.player_uid
                      ? "SVP"
                      : "")}
                </p>

                <div className="flex text-center font-extrabold text-lg min-w-3/10 justify-between">
                  <div>
                    <p>Kills</p>
                    <p>{match.player_performance.kills}</p>
                  </div>
                  <div>
                    <p>Deaths</p>
                    <p className="text-[var(--red)]">
                      {match.player_performance.deaths}
                    </p>
                  </div>
                  <div>
                    <p>Assists</p>
                    <p>{match.player_performance.assists}</p>
                  </div>
                  <div>
                    <p>KDA</p>
                    <p>
                      {getKDA(
                        match.player_performance.kills,
                        match.player_performance.deaths,
                        match.player_performance.assists
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
    </div>
  );
};

export default PlayerMatchHistory;
