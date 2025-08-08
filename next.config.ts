import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["marvelrivalsapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;