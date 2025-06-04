"use client";

import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpdatePlayerButton = ({
  userUid,
  name,
}: {
  userUid: number;
  name: string;
}) => {
  const handleUpdatePlayerProfile = async () => {
    try {
      const response = await axios.post("/api/update-player", {
        uid: userUid,
      });

      console.log(response.data);
      window.location.reload();

      toast.success(`${name}'s stats have successfully been updated!`, {
        description: `${name}'s stats were updated on ${new Date().toLocaleDateString()}`,
      });
    } catch (error) {
      console.error("Error updating player's profile:", error);
      toast.error(`Could not update ${name}'s stats.`, {
        description:
          "Please try again later. Make sure at least 30 minutes have passed since the last update.",
      });
    }
  };

  return (
    <button
      className="updatePlayerButton"
      onClick={handleUpdatePlayerProfile}
      title="Update Player Profile"
    >
      Update
    </button>
  );
};

export default UpdatePlayerButton;
