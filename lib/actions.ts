"use server";

{/**ACTIONS.TS SHOULD ONLY BE USED FOR ASYNC FUNCTIONS 
  ASYNC FUYNCTIONS ARE USED FOR WHEN DOING SOMGTHING LIKE FETCHING DATA*/}

import { signIn, signOut } from "@/auth";
import axios from "axios";

export const login = async ({ name }: {name: string}) => {
  await signIn(`${name}`, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/login", redirect:true });
};

export const formatEmail = async (email: string) => {
  const formattedEmail = email.substring(0, email.indexOf("@"));
  return "@" + formattedEmail;
}

export const getNewsData = async () => {
  const fetchOptions: RequestInit = {
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
    cache: "no-store",
  };

  const [balancesRes, patchesRes, devsRes] = await Promise.all([
    fetch("https://marvelrivalsapi.com/api/v1/balances?page=1&limit=10", fetchOptions),
    fetch("https://marvelrivalsapi.com/api/v1/patch-notes?page=1&limit=10", fetchOptions),
    fetch("https://marvelrivalsapi.com/api/v1/dev-diaries?page=1&limit=10", fetchOptions),
  ]);

  const [balancesJson, patchesJson, devsJson] = await Promise.all([
    balancesRes.json(),
    patchesRes.json(),
    devsRes.json(),
  ]);

  return {
    balances: balancesJson.balances || [],
    patchNotes: patchesJson.formatted_patches || [],
    devDiaries: devsJson.dev_diaries || [],
  };
};

export const fetchNewsPageData = async (newsType: string, newsId: string) => {
  console.log(`https://marvelrivalsapi.com/api/v1/${newsType}/${newsId}`)
  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/${newsType}/${newsId}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};


export const fetchPlayerData = async (playerUid: string) => {
  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v2/player/${playerUid}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );

    if (response.data?.error && response.data?.status === 403) {
      return {
        isPrivate: true,
        message: response.data.message || "This player's profile is private.",
      };
    }

    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching player data", error);

    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return {
        isPrivate: true,
        message: error.response.data?.message || "This player's profile is private.",
      };
    }

    throw error;
  }
};

export const fetchPlayerMatchHistory = async (playerUid: string) => {
  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v2/player/${playerUid}/match-history`,
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );

    return {
      match_history: response.data.match_history,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch match history", error);
    return { match_history: [], has_more: false };
  }
};

export const updatePlayerData = async (uid: number) => {
  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/player/${uid}/update`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating player data:", error);
    throw new Error("Failed to update player data");
  }
};

export const fetchLeaderBoard = async (season: string, device: string) => {
  try {
    const response = await axios.get(
      "https://marvelrivalsapi.com/api/v2/players/leaderboard",
      {
        params: {
          limit: 500,
          season,
          device,
        },
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Unknown error:", error instanceof Error ? error.message : String(error));
    }
    return null;
  }
};


export const fetchSeasons = async() =>{
  try{
    const response = await axios.get(
      "https://marvelrivalsapi.com/api/v1/seasons",
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );

    return response.data.seasons;
  }catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Unknown error:", error instanceof Error ? error.message : String(error));
    }
    return null;
  }
}