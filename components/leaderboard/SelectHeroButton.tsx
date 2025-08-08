import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatName } from "@/lib/utils";

const SelectHeroButton = () => {
  const [heroes, setHeroes] = useState<string[]>([]);
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "https://marvelrivalsapi.com/api/v1/heroes",
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            },
          }
        );
        console.log(response.data);
        const heroNames = response.data.map(
          (hero: { name: string }) => hero.name
        );
        setHeroes(heroNames);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };
    fetchHeroes();
  }, []);

  console.log(heroes);
  return (
    <Select>
      <SelectTrigger className="leaderboardNavbarDropdown">
        <SelectValue placeholder="Select a Hero" />
      </SelectTrigger>
      <SelectContent className="bg-[var(--secondary-background)] border-[var(--accent-color)]">
        <SelectGroup>
          <SelectLabel>Heroes</SelectLabel>
          {heroes.map((hero, index) => (
            <SelectItem key={index} value={hero}>
              {formatName(hero)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectHeroButton;
