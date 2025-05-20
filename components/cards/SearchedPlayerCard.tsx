import { formatWinLossRatio } from "@/lib/utils";
import { PlayerInfo } from "@/types/playerInfo";
import Link from "next/link";
import React from "react";

const SearchedPlayerCard = ({
  playerCardInfo,
}: {
  playerCardInfo: PlayerInfo;
}) => {
  return (
    <>
      <div className="searchedPlayerCard">
        <Link
          href={`/player-stats/${playerCardInfo.uid}`}
          className="flex gap-5 items-center
        hover:cursor-pointer hover:bg-[var(--accent-color)] hover:text-[var(--yellow)] ease-in-out duration-100 pr-3 rounded-lg"
          title="Go to Player Profile"
        >
          <img
            src={`https://marvelrivalsapi.com/rivals${playerCardInfo.player.icon.player_icon}`}
            alt={`${playerCardInfo.player.name} Icon`}
            className="rounded-lg"
            width={100}
            height={100}
          />
          <div className="flex flex-col tracking-wide text-lg lg:text-xl font-extrabold justify-between h-[100px]">
            <p>{playerCardInfo.player.name}</p>
            <p>Level {playerCardInfo.player.level}</p>
            <p>UID: {playerCardInfo.player.uid}</p>
          </div>
        </Link>

        <div className="flex flex-col items-center justify-between h-[100px]">
          <h1 className="text-xl lg:text-3xl font-extrabold tracking-wide">
            Win Percentage
          </h1>
          <div className="flex flex-col justify-center items-center font-bold text-lg lg:text-2xl">
            <h2>
              Ranked:{" "}
              {playerCardInfo.overall_stats.ranked.total_matches
                ? formatWinLossRatio(
                    playerCardInfo.overall_stats.ranked.total_wins,
                    playerCardInfo.overall_stats.ranked.total_matches
                  )
                : "N/A"}
            </h2>
            <h2>
              Unranked:{" "}
              {playerCardInfo?.overall_stats.unranked.total_matches
                ? formatWinLossRatio(
                    playerCardInfo.overall_stats.unranked.total_wins,
                    playerCardInfo.overall_stats.unranked.total_matches
                  )
                : "N/A"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between h-[100px]">
          <h1 className="text-xl lg:text-3xl font-extrabold tracking-wide">
            Rank
          </h1>
          {playerCardInfo?.player?.rank?.rank === "Invalid level" ? (
            <div className="flex justify-center items-center text-lg lg:text-2xl">
              <img
                src={`https://marvelrivalsapi.com/rivals/ranked/bronze.png`}
                alt={`${playerCardInfo.player.name} Rank`}
                width={50}
                height={50}
              />
              <p className="font-bold">Bronze III</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex justify-center items-center text-lg lg:text-2xl">
                <img
                  src={`https://marvelrivalsapi.com/rivals${playerCardInfo?.player?.rank?.image}`}
                  alt={`${playerCardInfo.player.name} Rank`}
                  width={50}
                  height={50}
                />
                <h2
                  className="flex flex-col justify-center tracking-wide font-bold text-lg lg:text-2xl"
                  style={{ color: playerCardInfo.player.rank.color }}
                >
                  {playerCardInfo.player.rank.rank}
                </h2>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-between h-[100px]">
          <h1 className="text-xl lg:text-3xl font-extrabold tracking-wide">
            Console
          </h1>
          <div className="flex flex-col justify-center items-center font-bold text-lg lg:text-2xl">
            <h2>{playerCardInfo?.player.info.login_os}</h2>
            <h2>{`${playerCardInfo.isPrivate ? "Private" : "Public"}`}</h2>
          </div>
        </div>
      </div>

      <div className="mobileSearchedPlayerCard">
        <div className="flex gap-5">
          <img
            src={`https://marvelrivalsapi.com/rivals${playerCardInfo.player.icon.player_icon}`}
            alt={`${playerCardInfo.player.name} Icon`}
            className="rounded-lg"
            width={100}
            height={100}
          />
          <div className="flex flex-col tracking-wide font-bold text-xl justify-between">
            <p>{playerCardInfo.player.name}</p>
            <p>Level {playerCardInfo.player.level}</p>
            <p>UID: {playerCardInfo.player.uid}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <h1 className="text-2xl font-extrabold tracking-wide">
            Win Percentage
          </h1>
          <div className="flex flex-col text-end font-bold text-xl">
            <h2>
              Ranked:{" "}
              {playerCardInfo.overall_stats.ranked.total_matches
                ? formatWinLossRatio(
                    playerCardInfo.overall_stats.ranked.total_wins,
                    playerCardInfo.overall_stats.ranked.total_matches
                  )
                : "N/A"}
            </h2>
            <h2>
              Unranked:{" "}
              {playerCardInfo?.overall_stats.unranked.total_matches
                ? formatWinLossRatio(
                    playerCardInfo.overall_stats.unranked.total_wins,
                    playerCardInfo.overall_stats.unranked.total_matches
                  )
                : "N/A"}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide text-center">
            Rank
          </h1>
          {playerCardInfo?.player?.rank?.rank === "Invalid level" ? (
            <div className="flex justify-center items-center">
              <img
                src={`https://marvelrivalsapi.com/rivals/ranked/bronze.png`}
                alt={`${playerCardInfo.player.name} Rank`}
                width={50}
                height={50}
              />
              <h2 className="flex flex-col justify-center tracking-wide font-bold text-xl">
                Bronze III
              </h2>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-xl">Current Rank:</h1>
              <div className="flex gap-1 items-center">
                <img
                  src={`https://marvelrivalsapi.com/rivals${playerCardInfo?.player?.rank?.image}`}
                  alt={`${playerCardInfo.player.name} Rank`}
                  width={50}
                  height={50}
                />
                <h2
                  className="flex flex-col justify-center tracking-wide font-bold text-xl"
                  style={{ color: playerCardInfo.player.rank.color }}
                >
                  {playerCardInfo.player.rank.rank}
                </h2>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide">Console</h1>
          <div className="flex flex-col justify-center items-center font-bold text-xl">
            <h2>{playerCardInfo?.player.info.login_os}</h2>
            <h2>{`${playerCardInfo.isPrivate ? "Private" : "Public"}`}</h2>
          </div>
        </div>

        <Link
          href={"/"}
          className="w-full bg-[var(--yellow)] text-[var(--black)] font-bold text-2xl text-center py-2 rounded-lg"
        >
          Go to Profile
        </Link>
      </div>
    </>
  );
};

export default SearchedPlayerCard;
