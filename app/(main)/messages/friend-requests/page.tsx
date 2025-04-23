import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import { notFound } from "next/navigation";
import React from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

const page = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  try {
    // Get IDs of people who sent friend requests
    const incomingSenderIds = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    console.log("Incoming sender IDs:", incomingSenderIds);

    // Fetch sender details for each friend request
    const incomingFriendRequests = await Promise.all(
      incomingSenderIds.map(async (senderId) => {
        try {
          const sender = (await fetchRedis(
            "get",
            `user:${senderId}`
          )) as string;
          if (!sender) {
            console.error(`No user found for ID: ${senderId}`);
            return null;
          }

          const parsedSender = JSON.parse(sender) as User;
          return {
            id: parsedSender.id,
            email: parsedSender.email,
            name: parsedSender.name,
          };
        } catch (error) {
          console.error(`Error fetching user ${senderId}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values from failed fetches
    const validFriendRequests = incomingFriendRequests.filter(
      (request): request is NonNullable<typeof request> => request !== null
    );

    console.log("Valid friend requests:", validFriendRequests);

    return (
      <section className="w-3/4 h-screen p-5 flex flex-col gap-3">
        <h1 className="text-6xl" style={{ fontFamily: "marvelFont" }}>
          Friend Requests
        </h1>
        {validFriendRequests.length > 0 ? (
          <div className="flex flex-col gap-4">
            {validFriendRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-[var(--accent-color)] rounded-lg"
              >
                <div>
                  <p className="text-xl font-bold">{request.name}</p>
                  <p className="text-[var(--secondary-text)]">
                    {request.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-[var(--secondary-text)]">
            No pending friend requests
          </p>
        )}
      </section>
    );
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return (
      <section className="w-3/4 h-screen p-5 flex flex-col gap-3">
        <h1 className="text-6xl" style={{ fontFamily: "marvelFont" }}>
          Friend Requests
        </h1>
        <p className="text-xl text-red-500">
          Error loading friend requests. Please try again later.
        </p>
      </section>
    );
  }
};

export default page;
