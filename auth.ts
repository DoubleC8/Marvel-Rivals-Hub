// lib/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { db } from "./lib/db";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UpstashRedisAdapter(db), 
  providers: [GitHub, Google],
  session: {
    strategy: "jwt", // Optional, but good for edge compatibility
  },
  pages: {
    signIn: "/login", // Optional: custom login page
  },
});