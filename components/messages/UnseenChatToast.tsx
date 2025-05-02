"use client";

import { chatHrefConstructor } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UnseenChatToastProps {
  t: string | number; // the toast ID
  sessionId: string;
  senderId: string;
  senderImg: string;
  senderName: string;
  senderMessage: string;
}

export const UnseenChatToast = ({
  t,
  sessionId,
  senderId,
  senderImg,
  senderName,
  senderMessage,
}: UnseenChatToastProps) => {
  const router = useRouter();

  return (
    <div
      className="w-[400px] bg-[var(--secondary-background)] border-[2px] 
      border-[var(--purple)] rounded-lg shadow-2xl text-[var(--primary-text)]
      flex py-2 px-3 justify-between"
    >
      <div className="flex gap-5 items-center">
        <img
          src={senderImg}
          alt={`${senderName} Profile Picture`}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-lg font-extrabold">{senderName}</h2>
          <p className="text-[var(--secondary-text)]">{senderMessage}</p>
        </div>
      </div>
      <button
        onClick={() => {
          router.push(
            `/messages/chat/${chatHrefConstructor(sessionId, senderId)}`
          );
          toast.dismiss(t);
        }}
        className="text-[var(--secondary-text)] hover:text-[var(--yellow)] ease-in-out duration-100"
      >
        View
      </button>
    </div>
  );
};
