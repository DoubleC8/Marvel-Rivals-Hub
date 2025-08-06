import { MessageCircle, MessageSquare, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import React from "react";

const ChatWithPlayersSection = () => {
  return (
    <section className="homeSectionChat">
      <div className="homeHeroImageCard">
        <img
          src="./images/Cloak_and_Dagger.webp"
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
          <p className="text-lg text-[var(--secondary-text)]">
            Connect and chat with online players and find the perfect teammate
            to dominate Marvel Rivals together!
          </p>
        </div>

        <Link href="/messages" className="homeSectionButton">
          Find Your Next Teammate
        </Link>
      </div>
    </section>
  );
};

export default ChatWithPlayersSection;
