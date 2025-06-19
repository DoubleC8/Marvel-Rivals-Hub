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
              "x-api-key":
                "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f",
            },
          }
        );
        console.log(response.data);
        const heroNames = response.data.map((hero: any) => hero.name);
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
