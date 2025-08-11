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
    <div
      className="sm:justify-start sm:hover:bg-[var(--accent-color)] 
      sm:ease-in-out sm:duration-[0.1s] sm:w-fit sm:py-2 sm:px-3 sm:rounded-lg
      h-[50px] flex items-center justify-center"
    >
      <Link
        href="/messages/requests"
        className="sm:flex sm:gap-1 relative inline-block"
      >
        <SmilePlus className="w-7 h-7" />
        <p
          className="sm:flex 
          hidden font-bold text-lg"
        >
          Friend Requests
        </p>
        {unseenRequestCount > 0 && (
          <span
            className="-left-1
            absolute -bottom-1  flex items-center justify-center
          w-4 h-4 rounded-full bg-[var(--red)] text-white text-xs font-bold"
          >
            {unseenRequestCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default FriendRequestsSidebarOptions;
