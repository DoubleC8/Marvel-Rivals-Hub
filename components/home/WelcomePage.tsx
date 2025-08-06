import { auth } from "@/auth";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const WelcomePage = async () => {
  const session = await auth();

  return (
    <section className="homeHeader">
      <div className="homeHeaderGradient">
        <div className="welcomeHeroContent">
          <h1 className="welcomeHeroTitle">Welcome to Marvel Rivals Hub</h1>
          <p className="welcomeHeroText">
            Marvel Rivals Hub is the ultimate platform for players to connect,
            team up, and stay informed about everything happening in the world
            of Marvel Rivals. Whether you’re looking for teammates that match
            your playstyle, chatting with other players to strategize, or
            tracking your in-game stats, this is the place for you. Stay up to
            date with the latest game news, balance changes, and meta shifts,
            all while building your network within the community. Join now and
            take your Marvel Rivals experience to the next level!
          </p>

          {!session && (
            <Link href="/login" className="welcomeHeroButton">
              SIGN UP
            </Link>
          )}
          <ChevronsDown color="var(--white)" size={60} />
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
