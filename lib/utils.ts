{/**USE ONLY FOR NON-ASYNC FUCNTIONS */}


import { Hero } from "@/types/Heroes";
import { Match } from "@/types/Match";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toPusherKey = (key: string) => {
  return key.replace(/:/g, "__");
}

export const formatDate = (dateString: string) => {
  const [year, month] = dateString.split("/");
  return `${month}/${year}`;
}

export const formatNewsPageDate = (dateString: string) => {
  const [year, day, month] = dateString.split("/");
  return `${day}/${month}/${year}`
}

export const formatText = (text: string = ""): string => {
  return text
    .replace(/\n{2,}/g, "</p><p>") // Convert double new lines to paragraphs
    .replace(/^\d+\.\s*(.*)$/gm, "<h2>$1</h2>") // Convert numbered sections into headers
    .replace(/-\s*(.*)$/gm, "<li>$1</li>") // Convert list items into bullets
    .replace(
      /(Discord|X|Facebook|Instagram|TikTok|YouTube|Twitch) \[(.*?)\]/g,
      '<a  href="$2" target="_blank">$1</a>'
    ); // Convert links
};

export const formatName = (playerName: string): string => {
  const formattedName = playerName.toLowerCase().split(' ');
  for (var i = 0; i < formattedName.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      formattedName[i] = formattedName[i].charAt(0).toUpperCase() + formattedName[i].substring(1);     
  }
  // Directly return the joined string
  return formattedName.join(' '); 
}

export const formatWinLossRatio = (total_wins: number, total_matches: number): string => {
  return (
    (total_wins / total_matches) * 100
  ).toFixed(2) + "%";
};

export const formatPlayerImages = (playerImageData?: string) => {
  if (!playerImageData) return "/images/fallback_image.png"; // or return null / empty string if you prefer

  return playerImageData.includes("/rivals")
    ? `https://marvelrivalsapi.com${playerImageData}`
    : `https://marvelrivalsapi.com/rivals${playerImageData}`;
};


export const hexToRgba = (hex: string | null | undefined, opacity: number) => {
  if (!hex || typeof hex !== "string" || !/^#([A-Fa-f0-9]{6})$/.test(hex)) {
    return "rgba(0, 0, 0, " + opacity + ")"; // fallback color
  }

  const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

  return opacity != null
    ? `rgba(${r}, ${g}, ${b}, ${opacity})`
    : `rgb(${r}, ${g}, ${b})`;
};

const BASE_IMAGE_URL = 'https://marvelrivalsapi.com/rivals/ranked'; // Define your base image URL

export const getLoginOsImage = (loginOs: string) => {
  const playstationLogo = "/images/playstation_logo.png";
  const xboxLogo = "/images/Xbox_one_logo.png";
  const steamLogo = "/images/Steam_icon_logo.png"

  switch(loginOs){
    case "Playstation":
      return playstationLogo;
    case "Xbox" :
      return xboxLogo;
    case "PC":
       return steamLogo;
  }
}

export const getLastMatchDay = (timestamp: number | string): string => {
  
  let matchDate: Date;

  if (typeof timestamp === "number") {
    matchDate = new Date(timestamp * 1000); // UNIX timestamp to ms
  } else {
    matchDate = new Date(timestamp); // assumes ISO string
  }

  const today = new Date();
  const diffTime = today.getTime() - matchDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffDays <= 0) {
    if (diffHours <= 1){
      return "Moments ago"
    } else {
      return `${diffHours} hours ago`
    }
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
};

export interface TopHero {
  hero_name: string, 
  hero_icon: string, //TEMP FIX, API WILL BE FIXED LATER
  numberOfMatches: number,
  numberOfWins: number,
  winLossRatio: number,
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  mvps: number
}

export const getTopHeroes = (heroes: Hero[]): TopHero[] => {
  return heroes
    .filter((hero) => hero.matches > 0)
    .map((hero) => {
      const winRate = parseFloat(
        ((hero.wins / hero.matches) * 100).toFixed(2)
      );

      return {
        hero_name: hero.hero_name,
        hero_icon: hero.hero_thumbnail,
        numberOfMatches: hero.matches,
        numberOfWins: hero.wins,
        winLossRatio: winRate, // ✅ You missed this line
        kills: hero.kills,
        deaths: hero.deaths,
        assists: hero.assists,
        kda: getKDA(hero.kills, hero.deaths, hero.assists),
        mvps: hero.mvp,
      };
    });
};

export const getKDA = (kills: number, deaths: number, assists: number): number => {
  if (!deaths || deaths === 0) return kills + assists; // avoid division by zero
  return parseFloat(((kills + assists) / deaths).toFixed(2));
};



export const getPercentColor = (percentage: number | string) => {
  const percentNum = typeof percentage === "string" ? parseFloat(percentage) : percentage;

  if (isNaN(percentNum)) return "var(--white)";
  if (percentNum >= 60) return "var(--green)";
  if (percentNum >= 50) return "var(--gold)";
  return "var(--red)";
};

export const getMatchType = (matchGameModeId: number): string => {
  const gameModes: Record<number, string> = { 
    1: "Quick Play",
    2: "Competitive",
    3: "Custom",
    4: "Arcade",
    7: "Practice vs AI",
    9: "Tournament",
  }

  return gameModes[matchGameModeId] ?? "Other";
} 

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export const get_rank = (level: number): { rank: string; image: string | null; color: string | null } => {
  const ranked_images = [
    '/bronze.png',
    '/silver.png',
    '/gold.png',
    '/platinum.png',
    '/diamond.png',
    '/grandmaster.png',
    '/celestial.png',
    '/eternity.png',
    '/one_above_all.png',
  ];
  const ranked_colors = [
    '#A7693F',
    '#7B9196',
    '#FFDA57',
    '#58E1E8',
    '#1680FF',
    '#EB46FF',
    '#FE5A1D',
    '#FF4F4D',
    '#FF4F4D',
  ];
  const ranks: [string, number[]][] = [
    ['Bronze', range(1, 4)],
    ['Silver', range(4, 7)],
    ['Gold', range(7, 10)],
    ['Platinum', range(10, 13)],
    ['Diamond', range(13, 16)],
    ['Grandmaster', range(16, 19)],
    ['Celestial', range(19, 22)],
    ['Eternity', [22]],
    ['One Above All', [23]],
  ];

  const tiers: { [key: number]: string } = { 0: 'III', 1: 'II', 2: 'I' };

  for (let i = 0; i < ranks.length; i++) {
    const [rank, levels] = ranks[i];
    if (levels.includes(level)) {
      if (rank === 'Eternity' || rank === 'One Above All') {
        return { rank: rank, image: BASE_IMAGE_URL + ranked_images[i], color: ranked_colors[i] };
      }
      const tier = tiers[(level - Math.min(...levels)) % 3];
      return { rank: `${rank} ${tier}`, image: BASE_IMAGE_URL + ranked_images[i], color: ranked_colors[i] };
    }
  }

  return { rank: 'Invalid level', image: null, color: null };
};

export const getRankClass = (rank: number) => {
  const base = "py-2 rounded-xl text-[var(--primary-text)]";

  if (rank === 1) return `${base} !text-[var(--black)] bg-[var(--gold)]`;
  if (rank === 2) return `${base} bg-[var(--silver)]`;
  if (rank === 3) return `${base} bg-[var(--bronze)]`;
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}


export const getCurrentSeasonRankInfo = (
  //A record type is a object type that has a key and a type.Record<Keys, Type> is a utility type used to
  //  define an object structure where the keys are of type Keys and the values are of type Type.
  { rankSeasons }: { rankSeasons: Record<string, { level: number; rank_score: number }> }
 ): { rank: string; rank_score: number; image: string | null } | null => {

 const entries = Object.entries(rankSeasons)
    .filter(([key]) => /^\d{7}$/.test(key))
    .sort((a, b) => parseInt(b[0].slice(-1)) - parseInt(a[0].slice(-1))); // sort by season desc

  if (entries.length === 0) return null;

  const [_, latestSeasonData] = entries[0];
  const { rank, image } = get_rank(latestSeasonData.level);

  return {
    rank,
    rank_score: latestSeasonData.rank_score,
    image,
  };
}


export const getCurrentSeasonMaxRankInfo = ({
  rankSeasons,
}: {
  rankSeasons: Record<string, { max_level: number; max_rank_score: number }>;
}): { rank: string; max_rank_score: number; image: string | null } | null => {
  const entries = Object.entries(rankSeasons)
    .filter(([key]) => /^\d{7}$/.test(key))
    .sort((a, b) => parseInt(b[0].slice(-1)) - parseInt(a[0].slice(-1)));

  if (entries.length === 0) return null;

  const [_, latestSeasonData] = entries[0];
  const { rank, image } = get_rank(latestSeasonData.max_level);

  return {
    rank,
    max_rank_score: latestSeasonData.max_rank_score,
    image,
  };
};