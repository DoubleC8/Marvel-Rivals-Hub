"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey, chatHrefConstructor } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { UnseenChatToast } from "./messages/UnseenChatToast";

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

const GlobalSocketHandler = ({ sessionId }: { sessionId: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const playNotifcationSound = () => {
    const audio = new Audio("/sounds/message-notification.mp3");
    audio.play().catch((err) => {
      // Optional: handle autoplay restrictions
      console.warn("Autoplay prevented", err);
    });
  };

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));

    const messageHandler = (message: ExtendedMessage) => {
      const isOnChatPage =
        pathname ===
        `/messages/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!isOnChatPage) {
        playNotifcationSound();
        toast.custom(
          (t) => (
            <UnseenChatToast
              t={t}
              sessionId={sessionId}
              senderId={message.senderId}
              senderImg={message.senderImg}
              senderName={message.senderName}
              senderMessage={message.text}
            />
          ),
          {
            duration: 5000,
          }
        );
      }
    };

    pusherClient.bind("new_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unbind("new_message", messageHandler);
    };
  }, [pathname, sessionId]);

  return null; // doesn't render anything
};

export default GlobalSocketHandler;
