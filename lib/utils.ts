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

export const formatText = (text: string = ""): string => {
  return text
    .replace(/\n{2,}/g, "</p><p>") // Convert double new lines to paragraphs
    .replace(/^\d+\.\s*(.*)$/gm, "<h2>$1</h2>") // Convert numbered sections into headers
    .replace(/-\s*(.*)$/gm, "<li>$1</li>") // Convert list items into bullets
    .replace(
      /(Discord|X|Facebook|Instagram|TikTok|YouTube|Twitch) \[(.*?)\]/g,
      '<a href="$2" target="_blank">$1</a>'
    ); // Convert links
};