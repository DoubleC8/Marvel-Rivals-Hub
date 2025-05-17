import { Ghost } from "lucide-react";
import React from "react";

const PrivatePlayerCard = () => {
  return (
    <div className="privatePlayerCard">
      <div className="flex gap-5 items-center">
        <Ghost width={100} height={100} />
      </div>
      <div className="text-center mx-auto">
        <h1
          className="tracking-wide text-3xl"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          This player’s profile is private. Stats and rank data are not publicly
          available.
        </h1>
        <p className="text-2xl font-bold text-[var(--secondary-text)]">
          Please try searching another player.
        </p>
      </div>
    </div>
  );
};

export default PrivatePlayerCard;
