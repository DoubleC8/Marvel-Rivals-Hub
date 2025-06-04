import React from "react";
import {
  formatPlayerImages,
  getLastMatchDay,
  getLoginOsImage,
} from "@/lib/utils";
import UpdatePlayerButton from "./UpdatePlayerButton";

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
    <div className="playerStatsHeader">
      <div className="flex gap-3">
        <div className="relative w-[100px] h-[100px] md:w-[125px] md:h-[125px]">
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

        <div
          className="h-[100px] md:h-[125px] 
        flex flex-col justify-evenly"
        >
          <p
            className="md:text-2xl md:font-extrabold
          text-xl font-bold"
          >
            {name}
          </p>
          <div className="flex gap-2 items-center">
            <p
              className="md:text-xl md:font-bold 
            text-lg font-semibold
            text-[var(--secondary-text)]"
            >
              {login_os}
            </p>
            {login_os !== "Unknown" ? (
              <img src={getLoginOsImage(login_os)} width={25} height={25}></img>
            ) : null}
          </div>
          <p
            className="md:text-lg  font-bold 
          text-md
          text-[var(--secondary-text)]"
          >
            Last Match: {getLastMatchDay(last_inserted_match)}
          </p>
        </div>
      </div>

      <UpdatePlayerButton userUid={uid} name={name} />
    </div>
  );
};

export default PlayerStatsHeader;
