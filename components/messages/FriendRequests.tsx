"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { Frown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IncomingFriendRequest {
  senderId: string;
  senderEmail: string;
  senderImage: string;
}

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
      senderImage, // <-- Add this here
    }: IncomingFriendRequest) => {
      console.log("function got called");
      setFriendRequests((prev) => [
        ...prev,
        { senderId, senderEmail, senderImage },
      ]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, []);

  const acceptFriend = async (senderId: string) => {
    await axios.post(`/api/friends/accept`, { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post(`/api/friends/deny`, { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <div className="h-3/4 flex flex-col gap-5 text-[var(--secondary-text)] font-extrabold items-center justify-center">
          <Frown className="size-40" />
          <p className="text-4xl">No Friend Request yet.</p>
        </div>
      ) : (
        friendRequests.map((request) => (
          <div
            key={request.senderId}
            className="max-w-3/4 p-3 rounded-lg bg-[var(--accent-color)] flex gap-3 items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              {" "}
              <Image
                src={request.senderImage}
                height={40}
                width={40}
                alt={`${request.senderEmail} Profile Pic`}
                className="rounded-lg"
              />
              <p className="font-bold text-lg">{request.senderEmail}</p>{" "}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => acceptFriend(request.senderId)}
                aria-label="Accept Friend Request"
                className="min-w-[100px] bg-[var(--yellow)] text-[var(--black)] 
              px-3 py-0.5 rounded-lg text-lg font-bold
              hover:opacity-85 ease-in-out hover:cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => denyFriend(request.senderId)}
                aria-label="Deny Friend Request"
                className="min-w-[100px] bg-[var(--red)] 
              px-3 py-0.5 rounded-lg text-lg font-bold
              hover:opacity-85 ease-in-out hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
