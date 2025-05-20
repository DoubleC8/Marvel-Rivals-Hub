"use client";

import {
  formatName,
  formatPlayerImages,
  getPercentColor,
  TopHero,
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

const TopHeroes = ({
  heroes_unranked,
  heroes_ranked,
}: {
  heroes_unranked: TopHero[];
  heroes_ranked: TopHero[];
}) => {
  const [selectedType, setSelectedType] = useState<"unranked" | "ranked">(
    "unranked"
  );
  const topHeroes =
    selectedType === "ranked"
      ? heroes_ranked.sort((a, b) => b.kda - a.kda)
      : heroes_unranked.sort((a, b) => b.kda - a.kda);

  return (
    <div
      className="w-[32%] flex flex-col bg-[var(--secondary-background)]
         rounded-lg p-3 overflow-y-scroll  border-[1px] border-[var(--accent-color)] shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Top Heroes</h1>
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
                      className="w-[40px] rounded-lg bg-[var(--accent-color)]"
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
                      {hero.kills}/{hero.deaths}/{hero.assists}
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
        <div
          className="h-full flex justify-center gap-3 items-center text-[var(--secondary-text)]
         text-2xl font-extrabold "
        >
          <h1 className="">No Data Yet</h1>
          <Ghost />
        </div>
      )}
    </div>
  );
};

export default TopHeroes;
