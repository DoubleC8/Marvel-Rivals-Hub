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

const page = async ({ params }: PageProps) => {
  const { chatId } = params;

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
    <div className="flex-1 justify-between flex flex-col max-h-[100vh - 7rem]">
      <div className="felx sm:items-center justify-between py-3 border-b-[2px] border-[var(--accent-color)]">
        <div className="relative flex items-center space-x-4">
          <div className="ml-3 relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className="rounded-xl"
                fill
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="mr-3 font-semibold">
                {formatPlayerName(chatPartner.name)}
              </span>
            </div>

            <span className="text-sm text-[var(--secondary-text)]">
              {formatEmail(chatPartner.email)}
            </span>
          </div>
        </div>
      </div>

      <Messages initialMessages={initialMessages} sessionId={session.user.id} />
      <ChatInput chatId={chatId} chatPartner={chatPartner} />
    </div>
  );
};

export default page;
