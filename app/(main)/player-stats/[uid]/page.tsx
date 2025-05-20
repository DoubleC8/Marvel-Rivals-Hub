import axios from "axios";
import React from "react";
import { PlayerInfo } from "@/types/playerInfo";
import { formatPlayerImages, get_rank, getTopHeroes } from "@/lib/utils";
import { mockPlayerData } from "@/mockPlayerData";
import PlayerStatsHeader from "@/components/player-stats/PlayerStatsHeader";
import TopHeroes from "@/components/player-stats/FullPlayerStats/TopHeroes";
import TopTeammates from "@/components/player-stats/FullPlayerStats/TopTeammates";
import SelectSeasonButton from "@/components/player-stats/FullPlayerStats/SelectSeasonButton";

const page = async ({ params }: { params: { uid: string } }) => {
  const userUid = params.uid;
  // const playerData = mockPlayerData;

  let playerData: PlayerInfo | null = null;

  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/player/${userUid}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );
    playerData = response.data;
    console.log(playerData);
  } catch (error) {
    console.error("Error fetching player data:", error);
  }
  if (!playerData) {
    return;
  }
  return (
    <section className="flex flex-col gap-5 h-[100vh] p-5">
      <PlayerStatsHeader
        name={playerData.name}
        uid={playerData.player.uid}
        icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        playerLastMatch={playerData.updates.last_inserted_match}
      />

      {/**TODO: Add drop down menu to change the season data
       *
       * <SelectSeasonButton />
       *
       */}

      <div className="w-9/10 h-4/10 flex justify-between mx-auto">
        <div className="w-[32%] h-full bg-[var(--secondary-background)] rounded-lg">
          <div className="h-1/2 rounded-t-lg p-3 bg-[var(--secondary-background)]">
            <h1 className="font-bold text-lg">Current Rank</h1>
            <div className="flex gap-1 items-center">
              <img src={formatPlayerImages(playerData.player.rank.image)} />
              <div>
                <h1 className="text-3xl font-extrabold">
                  {playerData.player.rank.rank}
                </h1>
                {/* <p className="text-md font-bold text-[var(--secondary-text)]">
                  {
                    playerData.player.info.rank_game_season[2001004]
                      .max_rank_score
                  }{" "}
                  Score
                </p> */}
              </div>
            </div>
          </div>
          <div className="h-1/2 rounded-b-lg p-3 bg-[var(--accent-color)]">
            <h1 className="font-bold text-lg">Highest Rank</h1>
          </div>
        </div>

        <div className="w-[32%] h-full bg-[var(--secondary-background)] rounded-lg p-3 border-t-[1px] border-[var(--accent-color)]">
          <h1 className="font-bold text-lg">Top Roles</h1>
        </div>

        <TopTeammates teamMates={playerData.team_mates} />
      </div>

      <div className="w-9/10 h-4/10 flex justify-between mx-auto">
        <TopHeroes
          heroes_unranked={getTopHeroes(playerData.heroes_unranked)}
          heroes_ranked={getTopHeroes(playerData.heroes_ranked)}
        />
      </div>
    </section>
  );
};

export default page;
