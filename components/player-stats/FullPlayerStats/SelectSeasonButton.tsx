import React from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectSeasonButton = async () => {
  let seasons: number[] = [];
  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/seasons`,
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );
    const seasons = response.data.season;
    console.log(seasons);
  } catch (error) {
    console.error("Error fetching player data:", error);
  }
  if (!seasons) {
    return;
  }

  return (
    <div className="w-9/10 mx-auto flex justify-end">
      <Select>
        <SelectTrigger className="h-8 w-35 bg-[var(--accent-color)] border-[var(--secondary-background)] text-xl font-extrabold">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
        <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
          {seasons.map((season, index) => (
            <SelectItem value={season.toString()} key={index}>
              Season {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSeasonButton;
