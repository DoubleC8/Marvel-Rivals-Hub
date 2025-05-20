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
        const response = await axios.get(
          `https://marvelrivalsapi.com/api/v1/seasons`,
          {
            headers: {
              "x-api-key": process.env.API_KEY!,
            },
          }
        );
        setSeasons(response.data);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };

    fetchSeasons();
  }, []);

  if (seasons.length === 0) return null;

  return (
    <div className="w-9/10 mx-auto flex justify-end">
      <Select
        value={selectedSeason}
        onValueChange={(value) => setSelectedSeason(value)}
      >
        <SelectTrigger className="h-8 w-35 bg-[var(--accent-color)] border-[var(--secondary-background)] text-xl font-extrabold">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
        <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
          {seasons.map((season) => (
            <SelectItem key={season} value={season.toString()}>
              Season {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSeasonButton;
