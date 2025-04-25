"use client";

import { SmilePlus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
  return (
    <Link
      href={"/messages/requests"}
      className="flex items-center gap-3 w-fit py-2 px-3
      rounded-lg hover:bg-[var(--accent-color)] ease-in-out duration-[0.1s] truncate"
    >
      <SmilePlus />
      <div className="flex gap-3 items-center">
        <p className="font-bold text-lg">Friend Requests</p>
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
