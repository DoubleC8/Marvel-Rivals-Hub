import { auth } from "@/auth";
import FriendRequests from "@/components/messages/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { SmilePlus } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

//NOT USING THIS ROUTE

const page = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  // Get IDs of users who sent friend requests
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  // Get sender details from Redis
  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as
        | string
        | null;

      // Skip if sender doesn't exist in Redis
      if (!sender) {
        return null;
      }

      try {
        const senderParsed = JSON.parse(sender) as User;

        return {
          senderId: senderParsed.id,
          senderEmail: senderParsed.email,
          senderImage: senderParsed.image,
        };
      } catch (error) {
        console.error(
          `Error parsing user data for senderId ${senderId}:`,
          error
        );
        return null;
      }
    })
  );

  // Filter out null values (users that don't exist or have invalid data)
  const validFriendRequests = incomingFriendRequests.filter(
    (request): request is NonNullable<typeof request> => request !== null
  );

  return (
    <section className="w-full h-full flex flex-col p-5">
      <div>
        <h1
          className="text-3xl flex gap-3"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          <SmilePlus size={30} color={`var(--secondary-text)`} />
          Friend Requests
        </h1>
      </div>
      <FriendRequests
        incomingFriendRequests={validFriendRequests}
        sessionId={session.user.id}
      />
    </section>
  );
};

export default page;
