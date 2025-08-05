"use client";

import {
  formatName,
  formatPlayerImages,
  getPercentColor,
  getTopHeroes,
} from "@/lib/utils";
import { Ghost } from "lucide-react";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hero } from "@/types/Heroes";

const TopHeroes = ({
  heroes_unranked,
  heroes_ranked,
}: {
  heroes_unranked: Hero[];
  heroes_ranked: Hero[];
}) => {
  const [selectedType, setSelectedType] = useState<"unranked" | "ranked">(
    "unranked"
  );

  const topHeroes =
    selectedType === "ranked"
      ? getTopHeroes(heroes_ranked).sort((a, b) => b.kda - a.kda)
      : getTopHeroes(heroes_unranked).sort((a, b) => b.kda - a.kda);

  if (heroes_ranked.length === 0 && heroes_unranked.length === 0) {
    return (
      <div className="playerStatsCard">
        <h1 className="font-extrabold text-xl">Top Heroes</h1>
        <div className="font-bold text-xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playerStatsCard !overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold">Top Heroes</h1>

        <Select
          value={selectedType}
          onValueChange={(value) =>
            setSelectedType(value as "unranked" | "ranked")
          }
        >
          <SelectTrigger className="w-[150px] border-[var(--accent-color)] font-extrabold">
            <SelectValue placeholder="Unranked" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
            <SelectItem value="ranked">Ranked</SelectItem>
            <SelectItem value="unranked">Unranked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {topHeroes.length > 0 ? (
        <table className="table-auto w-full">
          <thead className="h-10 border-b border-[var(--accent-color)]">
            <tr className="font-extrabold text-lg">
              <th className="text-left">Hero</th>
              <th className="text-right">KDA</th>
              <th className="text-right">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {topHeroes.map((hero, index) => (
              <tr key={index} className="border-b border-[var(--accent-color)]">
                <td className="py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={formatPlayerImages(hero.hero_icon)}
                      className="w-[45px] h-[45px] rounded-lg bg-[var(--accent-color)]"
                    />
                    <p className="font-extrabold text-md">
                      {formatName(hero.hero_name)}
                    </p>
                  </div>
                </td>
                <td className="text-right">
                  <div className="flex flex-col items-end">
                    <h1 className="font-extrabold text-lg">{hero.kda}</h1>
                    <p className="text-[var(--secondary-text)] text-sm font-bold">
                      {hero.kills}/
                      <span className="text-[var(--red)]">{hero.deaths}</span>/
                      {hero.assists}
                    </p>
                  </div>
                </td>
                <td className="text-right">
                  <div className="flex flex-col items-end">
                    <h1
                      className="font-extrabold text-md"
                      style={{
                        color: getPercentColor(hero.winLossRatio),
                      }}
                    >
                      {hero.winLossRatio}%
                    </h1>
                    <p className="text-[var(--secondary-text)] text-sm font-bold">
                      {hero.numberOfMatches} games
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="font-extrabold text-2xl flex items-center justify-center gap-3 text-[var(--secondary-text)] h-full">
          <Ghost size={25} />
          <p>No Data Yet</p>
        </div>
      )}
    </div>
  );
};

export default TopHeroes;
