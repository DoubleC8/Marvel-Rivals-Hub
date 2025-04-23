import { auth } from "@/auth";
import FriendRequestsSidebarOptions from "@/components/messages/FriendRequestsSidebarOptions";
import { fetchRedis } from "@/helpers/redis";
import { UserPlus } from "lucide-react";
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
    href: "/messages",
    icon: UserPlus, // Pass the component, not an object
  },
];

export default async function MessagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session?.user?.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="flex w-full h-full">
      <nav className="h-screen w-1/4 p-5 border-r-[2px] border-[var(--accent-color)]">
        <h1
          className="text-4xl text-center tracking-wide"
          style={{ fontFamily: "marvelFont" }}
        >
          Conversations
        </h1>
        <div className="flex flex-col gap-3">
          {sidebarOptions.map(({ id, name, href, icon: Icon }) => (
            <Link
              href={href}
              key={id}
              className="flex items-center gap-3 w-fit py-2 px-3 justify-center 
  mx-auto rounded-lg hover:bg-[var(--accent-color)] ease-in-out duration-[0.1s] truncate"
            >
              <Icon />
              <p className="font-bold text-lg">{name}</p>
            </Link>
          ))}
        </div>
        <FriendRequestsSidebarOptions
          sessionId={session.user.id}
          initialUnseenRequestCount={unseenRequestCount}
        />
      </nav>
      {/* Main chat window */}
      {children}
    </div>
  );
}
