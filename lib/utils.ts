{/**USE ONLY FOR NON-ASYNC FUCNTIONS */}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const formatSearchedPlayerName = (playerName: string): string => {
  const formattedName = playerName.toLowerCase().split(' ');
  for (var i = 0; i < formattedName.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      formattedName[i] = formattedName[i].charAt(0).toUpperCase() + formattedName[i].substring(1);     
  }
  // Directly return the joined string
  return formattedName.join(' '); 
}

export const formatStats = (total_wins: number, total_matches: number): string => {
  return (
    (total_wins / total_matches) * 100
  ).toFixed(2) + "%";
};


const BASE_IMAGE_URL = 'https://marvelrivalsapi.com/rivals/ranked/'; // Define your base image URL

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
  const base = "py-2 rounded-xl text-[var(--black)]";

  if (rank === 1) return `${base} bg-[var(--gold)]`;
  if (rank === 2) return `${base} bg-[var(--silver)]`;
  if (rank === 3) return `${base} bg-[var(--bronze)]`;
}