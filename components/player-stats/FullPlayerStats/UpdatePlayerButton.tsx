"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const UpdatePlayerButton = ({
  userUid,
  name,
}: {
  userUid: number;
  name: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdatePlayerProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/update-player", {
        uid: userUid,
      });

      const { error, message } = response.data;

      if (error) {
        toast.error(`Could not update ${name}'s stats.`, {
          description:
            message || "Please wait 30 minutes before requesting a new update.",
        });
        return;
      }

      toast.success(`${name}'s stats have successfully been updated!`, {
        description: `${name}'s stats were updated on ${new Date().toLocaleDateString()}`,
      });
      console.log("Player profile updated successfully: ", response.data);

      //refresh page after successfully updating player data
      refreshpage();
    } catch (error) {
      console.error("Error updating player's profile:", error);
      toast.error(`Could not update ${name}'s stats.`, {
        description:
          "Please try again later. Make sure at least 30 minutes have passed since the last update.",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshpage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <button
      onClick={handleUpdatePlayerProfile}
      title="Update Player Profile"
      className="updatePlayerButton"
    >
      {loading ? (
        <LoaderCircle className="animate-spin mx-auto" />
      ) : (
        <p className="font-semibold">Update</p>
      )}
    </button>
  );
};

export default UpdatePlayerButton;
