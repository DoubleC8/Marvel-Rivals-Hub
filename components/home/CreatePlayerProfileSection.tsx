import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreatePlayerProfileSection = () => {
  return (
    <section className="pt-10 pb-5 flex justify-center items-center text-[var(--primary-text)]">
      <div
        className="flex flex-col gap-5 w-[40%] bg-[var(--secondary-background)]
       p-5 rounded-2xl border-[2px] border-[var(--purple)]"
      >
        <div className="flex flex-col">
          <span className="flex gap-3 items-baseline">
            <Users size={35} className="text-[var(--secondary-text)]" />
            <h1
              className="text-4xl"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              Looking for a Team?
            </h1>
          </span>
          <p className="text-lg">
            Let everyone know you're looking to team up in four easy steps:
          </p>
        </div>

        <ol className="space-y-6">
          <li className="text-2xl">
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
          </li>

          <li className="text-2xl">
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
          </li>

          <li className="text-2xl">
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
          </li>

          <li className="text-2xl">
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
          </li>
        </ol>

        <div>
          <h2 className="text-2xl" style={{ fontFamily: "var(--marvelFont)" }}>
            You're Done
          </h2>
          <p className="text-lg text-[var(--secondary-text)]">
            Your account and your Marvel Rivals Hub player profile are created.
            You're ready to find your new teammates!
          </p>
        </div>

        {/*TODO: Make this take you create a player profile page (different from login page) */}
        <div>
          <Link
            href="/"
            className="text-2xl tracking-wide bg-[var(--yellow)] 
                py-3 px-7 rounded-xl hover:opacity-85 
                hover:underline text-[var(--black)] shadow-2xl"
            style={{ fontFamily: "var(--marvelFont)" }}
          >
            Create Player Profile
          </Link>
        </div>
      </div>

      <div className="w-40%">
        <img src="/images/Winter-Solider.png" className="h-[700px]"></img>
      </div>
    </section>
  );
};

export default CreatePlayerProfileSection;
