import { auth } from "@/auth";
import ChatInput from "@/components/messages/ChatInput";
import Messages from "@/components/messages/Messages";
import { fetchRedis } from "@/helpers/redis";
import { formatEmail } from "@/lib/actions";
import { db } from "@/lib/db";
import { formatPlayerName } from "@/lib/utils";
import { messageArrayValidator } from "@/lib/validations/message";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reversedDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = await params;
  const session = await auth();

  if (!session) {
    notFound();
  }

  const { user } = session;
  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="flex flex-col w-full h-full justify-between">
      {/* Top bar */}
      <div className="flex sm:items-center justify-between py-3 border-b-[2px] border-[var(--accent-color)] px-5 sticky">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10">
            <Image
              src={chatPartner.image}
              alt={`${chatPartner.name} profile picture`}
              className="rounded-xl"
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              {formatPlayerName(chatPartner.name)}
            </span>
            <span className="text-sm text-[var(--secondary-text)]">
              {formatEmail(chatPartner.email)}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <Messages
          chatPartner={chatPartner}
          sessionImg={session.user.image}
          initialMessages={initialMessages}
          sessionId={session.user.id}
          chatId={chatId}
        />
      </div>

      {/* Chat Input */}
      <ChatInput chatId={chatId} chatPartner={chatPartner} />
    </div>
  );
};

export default Page;
