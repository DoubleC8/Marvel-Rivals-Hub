"use server";

{/**ACTIONS.TS SHOULD ONLY BE USED FOR ASYNC FUNCTIONS 
  ASYNC FUYNCTIONS ARE USED FOR WHEN DOING SOMGTHING LIKE FETCHING DATA*/}

import { signIn, signOut } from "@/auth";
import axios from "axios";

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};

export const formatEmail = async (email: string) => {
  const formattedEmail = email.substring(0, email.indexOf("@"));
  return "@" + formattedEmail;
}

export const getNewsData = async () => {
  // ✅ Define fetch options correctly
  const fetchOptions: RequestInit = {
    headers: {
      "x-api-key": process.env.API_KEY || "",
    },
    cache: "no-store", // ✅ Moved this to the correct level
  };

  // ✅ Fetch all three endpoints in parallel
  const [balancesRes, patchesRes, devsRes] = await Promise.all([
    fetch("https://marvelrivalsapi.com/api/v1/balances?page=1&limit=10", fetchOptions),
    fetch("https://marvelrivalsapi.com/api/v1/patch-notes?page=1&limit=10", fetchOptions),
    fetch("https://marvelrivalsapi.com/api/v1/dev-diaries?page=1&limit=10", fetchOptions),
  ]);

  // ✅ Parse the JSON responses
  const [balancesJson, patchesJson, devsJson] = await Promise.all([
    balancesRes.json(),
    patchesRes.json(),
    devsRes.json(),
  ]);

  // ✅ Return structured data
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

export const fetchPlayerData = async(playerIdentifier:string) => {

  try {
    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/player/${playerIdentifier}`,
      {
        headers: { "x-api-key": process.env.API_KEY },
      }
    );

    return response.data;
  } catch(error){
    console.error("Error fetching player data: ", error);
  }

}


// https://marvelrivalsapi.com/api/v1/player/Sypeh