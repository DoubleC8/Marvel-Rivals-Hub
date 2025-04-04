import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LeaderboardTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="font-extrabold text-center w-[10%]">
          Rank
        </TableHead>
        <TableHead className="font-extrabold w-[40%]">Player</TableHead>
        <TableHead className="font-extrabold">Tier</TableHead>
        <TableHead className="font-extrabold">Score</TableHead>
        <TableHead className="font-extrabold text-center w-[20%]">
          Win Rate
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LeaderboardTableHeader;
