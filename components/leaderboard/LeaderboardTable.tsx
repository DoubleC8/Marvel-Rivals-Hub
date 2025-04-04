import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_rank } from "@/lib/utils";

interface PlayerInfo {
  cur_head_icon_id: string;
  login_os: string;
  name: string;
  rank_season?: {
    diff_score: string;
    level: number;
    max_level: number;
    max_rank_score: string;
    protect_score: number;
    rank_game_id: number;
    rank_score: string;
    update_time: number;
    win_count: number;
  };
}

interface Player {
  player_uid: number;
  info: PlayerInfo;
  matches: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  mvps: number;
  svps: number;
  play_time: string;
  total_damage_taken: string;
  total_hero_damage: string;
  total_hero_heal: string;
}

interface LeaderboardTableProps {
  players: Player[]; // Correctly type the 'players' prop
}

const LeaderboardTable = ({ players }: LeaderboardTableProps) => {
  return (
    <Table>
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
      <TableBody>
        {players.map((player, index) => {
          const rankInfo = get_rank(player.info.rank_season?.level || 0);
          const losses = player.matches - player.wins;

          return (
            <TableRow
              className="bg-[var(--accent-color)] border-b-[2px] border-b-[#1A1B26] font-extrabold"
              key={player.player_uid}
            >
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                {player.info.cur_head_icon_id && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://marvelrivalsapi.com/rivals/players/heads/player_head_${player.info.cur_head_icon_id}.png`}
                      alt={`${rankInfo.rank} Icon`}
                      className="rounded-full"
                      width={36}
                      height={36}
                    />
                    <span className="font-semibold">{player.info.name}</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {rankInfo.image && (
                  <div className="flex items-center gap-2">
                    <img
                      src={rankInfo.image}
                      alt={`${rankInfo.rank} Icon`}
                      width={36}
                      height={36}
                    />
                    <span className="font-semibold">{rankInfo.rank}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-[var(--secondary-text)]">
                {player.info.rank_season?.rank_score}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <span className="text-[var(--yellow)]">
                    {player.matches > 0
                      ? ((player.wins / player.matches) * 100).toFixed(2) + "%"
                      : "0.00%"}
                  </span>
                  <span className="text-[var(--secondary-text)]">
                    <span className="text-[var(--blue)]">{player.wins}W</span> /{" "}
                    <span className="text-[var(--red)]">{losses}L </span>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
