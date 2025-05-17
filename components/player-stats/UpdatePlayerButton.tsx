"use client";

import React from "react";
import axios from "axios";
import { toast } from "sonner";

const UpdatePlayerButton = ({
  userUid,
  name,
}: {
  userUid: string;
  name: string;
}) => {
  const handleUpdatePlayerProfile = async () => {
    try {
      const response = await axios.get(
        `https://marvelrivalsapi.com/api/v1/player/${userUid}/update`,
        {
          headers: {
            "x-api-key":
              "19fb1c19789bf850f690e30ef8c660bc95ea8e8a40dd64d8bd7cbe486e35156f",
          },
        }
      );
      console.log(response.data);

      window.location.reload();

      toast.success(`${name}'s stats have successfully been updated!`, {
        description: `${name}'s stats were updated on ${new Date().toLocaleDateString()}`,
      });
    } catch (error) {
      console.error("Error updating players profile:", error);
      toast.error(`Could not update ${name}'s players stats.`, {
        description:
          "Please try again later. Please allow 30 minutes between updates.",
      });
    }
  };
  return (
    <button
      className="text-xl 
        font-bold text-[var(--black)] 
        bg-[var(--yellow)] h-fit w-fit px-5 py-1 rounded-lg shadow-2xl 
        hover:cursor-pointer hover:opacity-85 ease-in-out duration-100"
      onClick={() => handleUpdatePlayerProfile()}
      title="Update Player Profile"
    >
      Update
    </button>
  );
};

export default UpdatePlayerButton;
