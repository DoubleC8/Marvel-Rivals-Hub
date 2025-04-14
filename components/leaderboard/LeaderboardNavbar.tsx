"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const heroes = [
  "Adam Warlock",
  "Black Panther",
  "Black Widow",
  "Captain America",
  "Cloak and Dagger",
  "Doctor Strange",
  "Groot",
  "Hawkeye",
  "Hela",
  "Hulk",
  "Human Torch",
  "Invisible Woman",
  "Iron Fist",
  "Iron Man",
  "Jeff the Land Shark",
  "Loki",
  "Luna Snow",
  "Magik",
  "Magneto",
  "Mantis",
  "Mister Fantastic",
  "Moon Knight",
  "Namor",
  "Peni Parker",
  "Psylocke",
  "The Punisher",
  "The Thing",
  "Rocket Raccoon",
  "Scarlet Witch",
  "Squirrel Girl",
  "Spider-Man",
  "Star-Lord",
  "Storm",
  "Thor",
  "Venom",
  "Winter Soldier",
  "Wolverine",
];

const consoles = ["pc", "ps", "xbox"];

interface LeaderboardNavbarProps {
  onHeroChange: (value: string) => void;
  onConsoleChange: (value: string) => void;
}

const LeaderboardNavbar = ({
  onHeroChange,
  onConsoleChange,
}: LeaderboardNavbarProps) => {
  return (
    <nav className="w-3/4 flex justify-between h-9">
      <Select onValueChange={onHeroChange}>
        <SelectTrigger className="w-[45%] bg-[var(--secondary-background)] border-[var(--purple)] border-[2px] text-[var(--primary-text)] font-extrabold text-xl">
          <SelectValue
            placeholder="Select a Hero"
            style={{ fontFamily: "var(--marvelFont)" }}
          />
        </SelectTrigger>
        <SelectContent className="bg-[var(--secondary-background)] text-[var(--primary-text)] border-[var(--purple)]">
          <SelectGroup>
            <SelectLabel className="text-xl font-bold">Heroes</SelectLabel>
            {heroes.map((hero, index) => (
              <SelectItem
                key={index}
                value={hero}
                className="track-widest text-xl hover:bg-[var(--accent-color)] ease-in hover:cursor-pointer"
                style={{ fontFamily: "var(--marvelFont)" }}
              >
                {hero}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={onConsoleChange}>
        <SelectTrigger className="w-[45%] bg-[var(--secondary-background)] border-[var(--purple)] border-[2px] text-[var(--primary-text)] font-extrabold text-xl">
          <SelectValue placeholder="Select a Console" />
        </SelectTrigger>
        <SelectContent className="bg-[var(--secondary-background)] text-[var(--primary-text)] border-[var(--purple)]">
          <SelectGroup>
            <SelectLabel className="text-xl font-bold">Consoles</SelectLabel>
            {consoles.map((console, index) => (
              <SelectItem
                key={index}
                value={console}
                className="track-widest text-xl hover:bg-[var(--accent-color)] ease-in hover:cursor-pointer"
              >
                {console.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </nav>
  );
};

export default LeaderboardNavbar;
