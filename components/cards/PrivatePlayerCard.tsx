import { Frown, Lock } from "lucide-react";
import React from "react";

const PrivatePlayerCard = () => {
  return (
    <div
      className="flex w-3/4 h-[150px] p-3 bg-[var(--secondary-background)] 
  border-[2px] border-[var(--purple)] items-center rounded-xl mx-auto justify-evenly"
      style={{ fontFamily: "var(--marvelFont)" }}
    >
      <div className="flex gap-5 items-center">
        <Frown width={100} height={100} />
      </div>
      <span className="flex gap-3 items-stretch">
        <h1 className="tracking-wide text-3xl">
          This player’s profile is private. Stats and rank data are not publicly
          available.
        </h1>
        <Lock width={30} height={30} />
      </span>
    </div>
  );
};

export default PrivatePlayerCard;
