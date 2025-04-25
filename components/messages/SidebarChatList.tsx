"use client";

import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: React.FC<SidebarChatListProps> = ({
  friends,
  sessionId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);
  return (
    <ul
      role="list"
      className="max-h-[25rem] overflow-y-auto flex flex-col gap-3"
    >
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              href={`/messages/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="flex gap-3 items-center py-2 px-3
              rounded-lg hover:bg-[var(--accent-color)] 
              ease-in-out duration-[0.1s] truncate"
            >
              <Image
                src={friend.image}
                height={30}
                width={30}
                alt={`${friend.email} Profile Pic`}
                className="rounded-lg"
              />
              <p className="font-bold text-lg">{friend.email}</p>{" "}
              {unseenMessagesCount > 0 ? (
                <div
                  className="text-md font-bold rounded-full 
                bg-[var(--red)] w-7 h-7 text-center flex items-center justify-center"
                >
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
