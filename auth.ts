// lib/auth.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { db } from "./lib/db";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

function getGoogleCredentials() {
  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

function getGithubCredentials() {
  const clientId = process.env.AUTH_GITHUB_ID;
  const clientSecret = process.env.AUTH_GITHUB_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GITHUB_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GITHUB_SECRET");
  }

  return { clientId, clientSecret };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UpstashRedisAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    GitHubProvider(getGithubCredentials()),
    GoogleProvider(getGoogleCredentials()),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        const dbUser = (await db.get(`user:${user.id}`)) as User | null;

        if (!dbUser) {
          return {
            ...token,
            id: user.id,
          };
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.picture as string,
        };
      }
      return session;
    },
    redirect() {
      return '/';
    },
  },
});