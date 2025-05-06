import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreatePlayerProfileSection = () => {
  return (
    <section className="h-full w-full px-5 py-20 flex justify-center gap-5">
      <div className="flex flex-col gap-5 p-5 border-[2px] border-[var(--purple)] rounded-lg w-8/10 sm:w-[45%] bg-[var(--secondary-background)]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-stretch">
            <Users size={36} className="text-[var(--secondary-text)]" />
            <h1
              className="text-[36px]"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Looking for a Team?
            </h1>
          </div>
          <p className="text-[20px]">
            Let everyone know you're looking to team up in four easy steps:
          </p>
          <div className="text-2xl">
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Introduce Yourself
            </h2>
            <p className="text-lg text-[var(--secondary-text)]">
              Let others know who you are! Share your gaming experience and
              interests to connect with like-minded players.
            </p>
          </div>

          <div className="text-2xl">
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Customize Your Profile
            </h2>
            <p className="text-lg text-[var(--secondary-text)]">
              Showcase your in-game stats, achievements, and playstyle to help
              find teammates that match your skill level.
            </p>
          </div>

          <div className="text-2xl">
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Choose Your Role
            </h2>
            <p className="text-lg text-[var(--secondary-text)]">
              Specify the role you play best, whether it's a tank, damage
              dealer, or support, to form the perfect squad.
            </p>
          </div>

          <div className="text-2xl">
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Join the Community
            </h2>
            <p className="text-lg text-[var(--secondary-text)]">
              Create your account and start engaging with other players, forming
              teams, and climbing the leaderboards!
            </p>
          </div>

          <div>
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              You're Done
            </h2>
            <p className="text-lg text-[var(--secondary-text)]">
              Your account and your Marvel Rivals Hub player profile are
              created. You're ready to find your new teammates!
            </p>
          </div>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}
        <div>
          <Link href="/" className="homeSectionButton">
            Create Player Profile
          </Link>
        </div>
      </div>

      <div className="hidden md:w-[45%]">
        <img src="/images/Winter-Solider.png" className="h-[700px]"></img>
      </div>
    </section>
  );
};

export default CreatePlayerProfileSection;
