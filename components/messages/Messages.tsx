"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImg: string | null | undefined;
  chatPartner: User;
  chatId: string;
}

const Messages: React.FC<MessagesProps> = ({
  sessionImg,
  chatPartner,
  initialMessages,
  sessionId,
  chatId,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatId) return; // ⬅️ wait until chatId is defined

    const channelKey = toPusherKey(`chat:${chatId}`);

    pusherClient.subscribe(channelKey);

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unbind("incoming-message", messageHandler);
      pusherClient.unsubscribe(channelKey);
    };
  }, [chatId]);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "hh:mm a");
  };

  return (
    <div
      id="messages"
      className="flex min-h-full flex-1 flex-col-reverse gap-4 p-3 
      overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded 
      scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId == sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div
            className="chat-message"
            key={`${message.id}-${message.timestamp}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-gradient-to-bl from-violet-500 to-[var(--purple)]":
                      isCurrentUser,
                    "bg-[var(--border)] text-[var(--black)]": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs text-[var(--secondary-text)]">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>

              <div
                className={cn("relative w-9 h-9", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner.image
                  }
                  fill
                  alt="Profile Picture"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
