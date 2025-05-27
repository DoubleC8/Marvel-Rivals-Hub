import React from "react";
import UpdatePlayerButton from "./UpdatePlayerButton";
import {
  formatPlayerImages,
  getLastMatchDay,
  getLoginOsImage,
} from "@/lib/utils";

const PlayerStatsHeader = ({
  name,
  uid,
  player_icon,
  level,
  login_os,
  last_inserted_match,
}: {
  name: string;
  uid: number;
  player_icon: string;
  level: string;
  login_os: string;
  last_inserted_match: string;
}) => {
  return (
    <div className="w-9/10 mx-auto flex items-center justify-between bg-[var(--accent-color)] p-3 rounded-lg border-[2px] border-[var(--secondary-background)] shadow-2xl">
      <div className="flex gap-3 ">
        <div className="relative w-[125px] h-[125px]">
          <img
            src={formatPlayerImages(player_icon)}
            alt={`${name} Player Icon`}
            className="absolute rounded-lg border-[3px] border-[var(--purple)] w-full h-full"
          />
          <p
            className="text-[13px] font-bold
              absolute bottom-0 bg-[var(--black)] border-[var(--purple)] border-[2px] rounded-bl-lg
            w-fit h-fit px-3"
          >
            {level}
          </p>
        </div>

        <div className="h-[125px] flex flex-col justify-evenly">
          <p className="text-2xl font-extrabold">{name}</p>
          <div className="flex gap-2 items-center">
            <p className="text-xl font-bold text-[var(--secondary-text)]">
              {login_os}
            </p>
            {login_os !== "Unknown" ? (
              <img src={getLoginOsImage(login_os)} width={25} height={25}></img>
            ) : null}
          </div>
          <p className="text-lg text-[var(--secondary-text)] font-bold">
            Last Match:{" "}
            {getLastMatchDay(Number(last_inserted_match)) > 0
              ? getLastMatchDay(Number(last_inserted_match)) + " day ago"
              : "Today"}
          </p>
        </div>
      </div>
      <UpdatePlayerButton userUid={uid} name={name} />
    </div>
  );
};

export default PlayerStatsHeader;
