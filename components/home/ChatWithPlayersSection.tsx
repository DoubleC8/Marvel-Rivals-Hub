import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ChatWithPlayersSection = () => {
  return (
    <section
      className="mt-5 pt-5 pb-5 flex items-center justify-center 
    gap-10 bg-[var(--secondary-background)] text-[var(--primary-text)]"
    >
      <div className="w-40%">
        <img src="/images/Jeff_the_Land_Shark.webp" className="h-[700px]"></img>
      </div>
      <div
        className="flex flex-col gap-5 w-[40%] 
      p-5 border-[2px] rounded-2xl border-[var(--purple)] bg-[var(--background)]"
      >
        <div className="flex flex-col">
          <span className="flex gap-3">
            <MessageCircle size={35} className="text-[var(--secondary-text)]" />
            <h1
              className="text-4xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Chat with New Teammates Now!
            </h1>
          </span>
          <p className="text-lg text-[var(--secondary-text)]">
            Connect with online players and find the perfect teammate to
            dominate Marvel Rivals together!
          </p>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}
        <div>
          <Link
            href="/"
            className="text-2xl tracking-wide bg-[var(--yellow)] 
                py-3 px-7 rounded-xl hover:opacity-85 hover:underline text-[var(--black)]"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Find Your Next Teammate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatWithPlayersSection;
