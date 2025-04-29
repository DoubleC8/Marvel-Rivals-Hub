import { auth } from "@/auth";
import FriendRequests from "@/components/messages/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { notFound } from "next/navigation";
import React from "react";

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
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender) as User;

      return {
        senderId: senderParsed.id,
        senderEmail: senderParsed.email,
        senderImage: senderParsed.image,
      };
    })
  );

  return (
    <section className="w-full h-screen p-5 flex flex-col">
      <h1 className="text-6xl" style={{ fontFamily: "marvelFont" }}>
        Friend Requests
      </h1>
      <FriendRequests
        incomingFriendRequests={incomingFriendRequests}
        sessionId={session.user.id}
      />
    </section>
  );
};

export default page;
