"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { SmilePlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FriendRequestsSidebarOptionsProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestsSidebarOptions: React.FC<
  FriendRequestsSidebarOptionsProps
> = ({ sessionId, initialUnseenRequestCount }) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  useEffect(() => {
    if (!sessionId) return;

    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCount((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("new_friend", addedFriendHandler);
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href={"/messages/requests"}
      className="flex items-center gap-3 w-fit sm:py-2 sm:px-3
      rounded-lg hover:bg-[var(--accent-color)] ease-in-out duration-[0.1s] truncate"
    >
      <SmilePlus />
      <div className="flex gap-3 items-center">
        <p className="hidden sm:block font-bold text-lg">Friend Requests</p>
        {unseenRequestCount > 0 ? (
          <p className="text-md font-bold rounded-full bg-[var(--red)] w-7 h-7 text-center flex items-center justify-center">
            {unseenRequestCount}
          </p>
        ) : null}
      </div>
    </Link>
  );
};

export default FriendRequestsSidebarOptions;
