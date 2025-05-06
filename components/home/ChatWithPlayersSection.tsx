import { MessageCircle, MessageSquare, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import React from "react";

const ChatWithPlayersSection = () => {
  return (
    <section
      className="h-full w-full px-5 py-20 flex
     justify-center items-center gap-5 bg-[var(--secondary-background)]"
    >
      <div className="hidden sm:w-[45%] sm:flex flex-col items-center">
        <img src="/images/Jeff_the_Land_Shark.webp" className="h-[700px]"></img>
      </div>

      <div
        className="flex flex-col gap-5 p-5 border-[2px] border-[var(--purple)] 
      rounded-lg w-[45%] h-fit bg-[var(--background)]"
      >
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
