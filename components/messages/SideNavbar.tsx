import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

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

const SideNavbar = () => {
  return (
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
    </nav>
  );
};

export default SideNavbar;
