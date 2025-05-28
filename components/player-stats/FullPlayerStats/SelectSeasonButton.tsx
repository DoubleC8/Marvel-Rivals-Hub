"use client"; // This must be the very first line

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectSeasonButton = () => {
  const [seasons, setSeasons] = useState<number[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get("/api/seasons");
        setSeasons(response.data);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }

      console.log("Seasons", seasons);
    };

    fetchSeasons();
  }, []);

  if (seasons.length === 0) return null;

  return (
    <Select
      value={selectedSeason}
      onValueChange={(value) => setSelectedSeason(value)}
    >
      <SelectTrigger className="h-8 w-35 bg-[var(--secondary-background)] border-[var(--accent-color)] text-lg font-extrabold">
        <SelectValue placeholder={`Season ${seasons[seasons.length - 1]}`} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
        {seasons.map((season) => (
          <SelectItem key={season} value={season.toString()}>
            Season {season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSeasonButton;
