import { MessageCircle, MessageSquare, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import React from "react";

const ChatWithPlayersSection = () => {
  return (
    <section className="homeSectionChat">
      <div className="homeHeroImageCard">
        <img
          src="/images/Jeff_the_Land_Shark.webp"
          className="homeHeroImage"
        ></img>
      </div>

      <div className="homeContextCard !bg-[var(--background)]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <MessageSquareMore
              size={36}
              className="text-[var(--secondary-text)]"
            />
            <h1
              className="text-[36px]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Chat with New Teammates Now!
            </h1>
          </div>
          <p className="text-[20px] text-[var(--secondary-text)]">
            Connect and chat with online players and find the perfect teammate
            to dominate Marvel Rivals together!
          </p>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}
        <div>
          <Link href="/messages" className="homeSectionButton">
            Find Your Next Teammate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatWithPlayersSection;
