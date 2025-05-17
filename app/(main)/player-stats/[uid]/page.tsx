import axios from "axios";
import React from "react";
import { PlayerInfo } from "@/types/playerInfo";
import {
  formatPlayerImages,
  getLastMatchDay,
  getLoginOsImage,
} from "@/lib/utils";
import UpdatePlayerButton from "@/components/player-stats/UpdatePlayerButton";
import { mockPlayerData } from "@/mockPlayerData";
import Link from "next/link";

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

  console.log(playerData.team_mates);
  return (
    <section className="flex flex-col gap-5 h-[100vh] p-5">
      <div className="w-9/10 mx-auto flex items-center justify-between bg-[var(--accent-color)] border-[2px] border-[var(--secondary-background)] p-3 rounded-lg">
        <div className="flex gap-3 items-center">
          <div className="relative w-[100px] h-[100px]">
            <img
              src={formatPlayerImages(playerData.player.icon.player_icon)}
              alt={`${playerData.name} Player Icon`}
              className="absolute rounded-lg border-[3px] border-[var(--purple)] w-full h-full"
            />
            <p
              className="text-[13px] font-bold
              absolute bottom-0 bg-[var(--black)] border-[var(--purple)] border-[2px] rounded-bl-lg
            w-fit h-fit px-3"
            >
              {playerData.player.level}
            </p>
          </div>

          <div className="flex flex-col justify-between tracking-wide h-[100px]">
            <p className="text-3xl font-extrabold">{playerData.player.name}</p>
            <div className="flex gap-2 items-center">
              <p className="text-xl font-bold text-[var(--secondary-text)]">
                {playerData.player.info.login_os}
              </p>
              {playerData.player.info.login_os !== "Unknown" ? (
                <img
                  src={getLoginOsImage(playerData.player.info.login_os)}
                  width={25}
                  height={25}
                ></img>
              ) : null}
            </div>
            <p className="text-lg text-[var(--secondary-text)] font-bold">
              Last Match:{" "}
              {getLastMatchDay(playerData.updates.last_inserted_match) > 0
                ? getLastMatchDay(playerData.updates.last_inserted_match) +
                  " day ago"
                : "Today"}
            </p>
          </div>
        </div>

        <UpdatePlayerButton userUid={userUid} name={playerData.name} />
      </div>

      <div className="w-9/10 h-4/10 flex justify-between mx-auto">
        <div className="w-[32%] h-full bg-[var(--secondary-background)] rounded-lg p-3">
          <h1 className="font-bold text-lg">Top Heroes</h1>
        </div>

        <div className="w-[32%] h-full bg-[var(--secondary-background)] rounded-lg p-3">
          <h1 className="font-bold text-lg">Top Roles</h1>
        </div>

        <div className="w-[32%] h-full flex flex-col bg-[var(--secondary-background)] rounded-lg p-3 overflow-y-scroll">
          <h1 className="font-bold text-lg">Top Teammates</h1>

          <table className="table-auto">
            <thead className="h-10 sticky border-b border-[var(--accent-color)]">
              <tr className="font-extrabold text-lg ">
                <th className="text-left">Player</th>
                <th className="text-right">Matches</th>
                <th className="text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {playerData.team_mates.map((teamMate, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--accent-color)]"
                >
                  <td className="py-2">
                    <div className="flex gap-3 items-center">
                      <img
                        src={formatPlayerImages(
                          teamMate.player_info.player_icon
                        )}
                        className="w-[40px] rounded-lg"
                      />
                      <Link
                        href={`/player-stats/${teamMate.player_info.player_uid}`}
                        className="font-extrabold text-md hover:cursor-pointer hover:text-[var(--yellow)] ease-in-out duration-100"
                      >
                        {teamMate.player_info.nick_name}
                      </Link>
                    </div>
                  </td>
                  <td>
                    <h1 className="font-extrabold text-right text-md">
                      {teamMate.matches}
                    </h1>
                  </td>
                  <td>
                    <h1
                      className="font-extrabold text-md text-right"
                      style={{
                        color:
                          parseFloat(teamMate.win_rate) < 25
                            ? "var(--red)"
                            : parseFloat(teamMate.win_rate) <= 50
                            ? "var(--yellow)"
                            : "var(--green)",
                      }}
                    >
                      {teamMate.win_rate}%
                    </h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default page;
