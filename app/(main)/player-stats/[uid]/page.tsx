import axios from "axios";
import React from "react";
import { PlayerInfo } from "@/types/playerInfo";
import { fetchPlayerData } from "@/lib/actions";
import { toast } from "sonner";

const page = async ({ params }: { params: { uid: string } }) => {
  const userUid = params.uid;

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
  } catch (error) {
    console.error("Error fetching player data:", error);
  }

  if (!playerData) {
    return (
      <section className="p-5">
        <p className="text-red-500 font-bold">
          Player data could not be loaded.
        </p>
      </section>
    );
  }

  return <section className="p-5"></section>;
};

export default page;
