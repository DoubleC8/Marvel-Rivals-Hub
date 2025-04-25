import { auth } from "@/auth";
import FriendRequestsSidebarOptions from "@/components/messages/FriendRequestsSidebarOptions";
import SidebarChatList from "@/components/messages/SidebarChatList";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { Handshake, UserPlus, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Messages",
  description: "Chat with your friends on Marvel Rivals",
};

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  icon: React.ElementType; // or `icon: JSX.Element` if you want to render directly
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/messages/add-friend",
    icon: UserPlus, // Pass the component, not an object
  },
];

export default async function MessagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session?.user?.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="flex w-full h-full">
      <nav className="flex flex-col gap-5 h-screen w-1/4 p-5 border-r-[2px] border-[var(--accent-color)]">
        <Link
          href={"/messages"}
          className="text-5xl text-center tracking-wide"
          style={{ fontFamily: "marvelFont" }}
        >
          Messages
        </Link>

        <div className="flex flex-col gap-3">
          <span className="flex gap-3 items-center text-lg font-bold">
            <Users />
            <h1>Friends</h1>
          </span>
          <SidebarChatList sessionId={session.user.id} friends={friends} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex gap-3 items-center text-lg font-bold">
            <Handshake />
            <h1>Actions</h1>
          </span>
          {sidebarOptions.map(({ id, name, href, icon: Icon }) => (
            <Link
              href={href}
              key={id}
              className="flex items-center gap-3 w-fit py-2 px-3 justify-center 
                 rounded-lg hover:bg-[var(--accent-color)] ease-in-out duration-[0.1s] truncate"
            >
              <Icon />
              <p className="font-bold text-lg">{name}</p>
            </Link>
          ))}

          <FriendRequestsSidebarOptions
            sessionId={session.user.id}
            initialUnseenRequestCount={unseenRequestCount}
          />
        </div>
      </nav>
      {/* Main chat window */}
      {children}
    </div>
  );
}
