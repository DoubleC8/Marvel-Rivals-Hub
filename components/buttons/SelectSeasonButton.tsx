"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { fetchSeasons } from "@/lib/actions";

interface SelectSeasonButtonProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const SelectSeasonButton = ({
  selectedSeason,
  onSeasonChange,
}: SelectSeasonButtonProps) => {
  const [seasons, setSeasons] = useState<number[]>([]);

  useEffect(() => {
    const getSeasons = async () => {
      const data = await fetchSeasons();
      setSeasons(data);
    };
    getSeasons();
  }, []);

  console.log("Seasons", seasons);
  return (
    <Select
      onValueChange={onSeasonChange}
      value={selectedSeason}
      disabled={seasons.length === 0}
    >
      <SelectTrigger className="leaderboardNavbarDropdown">
        <SelectValue placeholder="Select Season" />
      </SelectTrigger>

      <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
        {seasons.map((season) => (
          <SelectItem
            key={season}
            value={season.toString()}
            className="font-bold text-[var(--secondary-text)]"
          >
            Season {season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSeasonButton;
