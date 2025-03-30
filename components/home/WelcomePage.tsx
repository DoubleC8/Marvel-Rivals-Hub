import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <section className="homeHeader">
      <div className="homeHeaderGradient">
        <div className="flex flex-col items-center gap-10">
          <h1
            className="text-8xl text-[var(--yellow)] tracking-wider text-center"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Welcome to Marvel Rivals Hub
          </h1>
          <p className="text-[var(--white)] w-1/2 text-center text-xl font-extrabold">
            Marvel Rivals Hub is the ultimate platform for players to connect,
            team up, and stay informed about everything happening in the world
            of Marvel Rivals. Whether you’re looking for teammates that match
            your playstyle, chatting with other players to strategize, or
            tracking your in-game stats, this is the place for you. Stay up to
            date with the latest game news, balance changes, and meta shifts,
            all while building your network within the community. Join now and
            take your Marvel Rivals experience to the next level!
          </p>

          <Link href="/login" className="homeSignUpButton">
            SIGN UP
          </Link>
        </div>
        <ChevronsDown color="var(--white)" size={60} />
      </div>
    </section>
  );
};

export default WelcomePage;
