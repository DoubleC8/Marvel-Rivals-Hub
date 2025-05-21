import axios from "axios";
import React from "react";
import { mockPlayerData } from "@/mockPlayerData";
import {
  formatPlayerImages,
  getLastMatchDay,
  getLoginOsImage,
} from "@/lib/utils";
import UpdatePlayerButton from "@/components/player-stats/UpdatePlayerButton";
import { PlayerInfo } from "@/types/playerInfo";
import PlayerStatsHeader from "@/components/player-stats/PlayerStatsHeader";

const page = async ({ params }: { params: { uid: string } }) => {
  const userUid = params.uid;
  //const playerData = mockPlayerData;

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
    console.log("Succesfuly got data");
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
        uid={playerData.uid}
        player_icon={playerData.player.icon.player_icon}
        level={playerData.player.level}
        login_os={playerData.player.info.login_os}
        last_inserted_match={playerData.updates.last_inserted_match}
      />
    </section>
  );
};

export default page;
