import {
  formatName,
  formatPlayerImages,
  formatWinLossRatio,
  getLoginOsImage,
  getPercentColor,
  getTopHeroes,
} from "@/lib/utils";
import { PlayerInfo } from "@/types/playerInfo";
import Link from "next/link";
import React from "react";

const SearchedPlayerCard = ({
  playerCardInfo,
}: {
  playerCardInfo: PlayerInfo;
}) => {
  const topHero = getTopHeroes(playerCardInfo.heroes_ranked)[0];
  return (
    <div className="searchedPlayerCard">
      <div
        className="lg:items-center
      flex gap-3"
      >
        <img
          src={`https://marvelrivalsapi.com/rivals${playerCardInfo.player.icon.player_icon}`}
          alt={`${playerCardInfo.player.name} Icon`}
          className="lg:w-[125px] lg:h-[125px] lg:border-[var(--secondary-background)]
          w-[100px] h-[100px] rounded-lg border-[2px] border-[var(--purple)]"
        />
        <div className="h-[100px] flex flex-col font-bold text-lg justify-between">
          <p>{playerCardInfo.player.name}</p>
          <p className="text-[var(--secondary-text)]">
            Level {playerCardInfo.player.level}
          </p>
          <div className="flex gap-2 items-center">
            <p
              className="md:text-xl md:font-bold 
                        text-lg font-semibold
                        text-[var(--secondary-text)]"
            >
              {playerCardInfo.player.info.login_os}
            </p>
            {playerCardInfo.player.info.login_os !== "Unknown" ? (
              <img
                src={getLoginOsImage(playerCardInfo.player.info.login_os)}
                width={25}
                height={25}
              ></img>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="lg:flex-col lg:justify-start lg:h-[125px]
      flex items-center justify-between gap-5"
      >
        <h1
          className="lg:text-xl lg:font-extrabold
        text-lg font-bold"
        >
          Favorite Hero
        </h1>
        <div
          className="lg:text-xl lg:font-extrabold 
        flex items-center gap-3 text-end text-lg font-bold"
        >
          <img
            src={formatPlayerImages(topHero.hero_icon)}
            alt={`${playerCardInfo.player.name} Rank`}
            className="
            w-[50px] h-[50px] bg-[var(--secondary-background)] rounded-lg"
          />
          <h2>{formatName(topHero.hero_name)}</h2>
        </div>
      </div>

      <div
        className="lg:flex-col lg:justify-start lg:h-[125px]
      flex items-center justify-between gap-5"
      >
        <h1
          className="lg:text-xl lg:font-extrabold
        text-lg font-bold"
        >
          Win Percentage
        </h1>
        <div
          className="lg:text-xl lg:font-extrabold
        flex flex-col text-end text-lg font-bold"
        >
          {/* Ranked */}
          <h2>
            Ranked:{" "}
            {playerCardInfo?.overall_stats?.ranked?.total_matches > 0 ? (
              <span
                style={{
                  color: getPercentColor(
                    formatWinLossRatio(
                      playerCardInfo.overall_stats.ranked.total_wins,
                      playerCardInfo.overall_stats.ranked.total_matches
                    )
                  ),
                }}
              >
                {formatWinLossRatio(
                  playerCardInfo.overall_stats.ranked.total_wins,
                  playerCardInfo.overall_stats.ranked.total_matches
                )}
              </span>
            ) : (
              <span className="text-[var(--secondary-text)]">N/A</span>
            )}
          </h2>

          {/* Unranked */}
          <h2>
            Unranked:{" "}
            {playerCardInfo?.overall_stats?.unranked?.total_matches > 0 ? (
              <span
                style={{
                  color: getPercentColor(
                    formatWinLossRatio(
                      playerCardInfo.overall_stats.unranked.total_wins,
                      playerCardInfo.overall_stats.unranked.total_matches
                    )
                  ),
                }}
              >
                {formatWinLossRatio(
                  playerCardInfo.overall_stats.unranked.total_wins,
                  playerCardInfo.overall_stats.unranked.total_matches
                )}
              </span>
            ) : (
              <span className="text-gray-400">N/A</span>
            )}
          </h2>
        </div>
      </div>

      <div
        className="lg:flex-col lg:justify-start lg:h-[125px]
      flex items-center justify-between gap-5"
      >
        <h1
          className="lg:text-xl lg:font-extrabold
        text-lg font-bold"
        >
          Rank
        </h1>
        <div
          className="lg:text-xl lg:font-extrabold
        flex items-center gap-1 text-end text-lg font-bold"
        >
          <img
            src={formatPlayerImages(playerCardInfo.player.rank.image)}
            alt={`${playerCardInfo.player.name} Rank`}
            className="
            w-[50px] h-[50px]"
          />
          <h2>
            {playerCardInfo?.player.rank ? (
              <span
                style={{
                  color: playerCardInfo.player.rank.color,
                }}
              >
                {playerCardInfo.player.rank.rank}
              </span>
            ) : (
              <span className="text-[var(--secondary-text)]">N/A</span>
            )}
          </h2>
        </div>
      </div>

      <Link
        href={`/player-stats/${playerCardInfo.uid}`}
        className="lg:w-[15%] lg:my-auto lg:hover:opacity-85
        w-full h-8 font-bold text-lg text-[var(--black)] bg-[var(--yellow)] flex items-center justify-center rounded-lg"
      >
        Go to Profile
      </Link>
    </div>
  );
};

export default SearchedPlayerCard;
