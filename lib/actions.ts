"use server";

{/**ACTIONS.TS SHOULD ONLY BE USED FOR ASYNC FUNCTIONS 
  ASYNC FUYNCTIONS ARE USED FOR WHEN DOING SOMGTHING LIKE FETCHING DATA*/}

import { signIn, signOut } from "@/auth";

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
 
