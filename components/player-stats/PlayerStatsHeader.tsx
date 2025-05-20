import {
  formatPlayerImages,
  getLastMatchDay,
  getLoginOsImage,
} from "@/lib/utils";
import React from "react";
import UpdatePlayerButton from "./UpdatePlayerButton";

const PlayerStatsHeader = ({
  name,
  uid,
  icon,
  level,
  login_os,
  playerLastMatch,
}: {
  name: string;
  uid: number;
  icon: string;
  level: string;
  login_os: string;
  playerLastMatch: string;
}) => {
  return (
    <div
      className="w-9/10 mx-auto flex items-center justify-between 
    bg-[var(--accent-color)] border-[2px] border-[var(--secondary-background)] 
    p-3 rounded-lg shadow-2xl"
    >
      <div className="flex gap-3 items-center">
        <div className="relative w-[100px] h-[100px]">
          <img
            src={formatPlayerImages(icon)}
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

        <div className="flex flex-col justify-between tracking-wide h-[100px]">
          <p className="text-3xl font-extrabold">{name}</p>
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
            {getLastMatchDay(playerLastMatch) > 0
              ? getLastMatchDay(playerLastMatch) + " day ago"
              : "Today"}
          </p>
        </div>
      </div>

      <UpdatePlayerButton userUid={uid} name={name} />
    </div>
  );
};

export default PlayerStatsHeader;
