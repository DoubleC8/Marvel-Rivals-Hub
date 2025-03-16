import { ChevronDown, Settings, User } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

const UserDropdownButton = ({
  formattedEmail,
}: {
  formattedEmail: Promise<string>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-1 py-1 px-2 rounded-lg bg-[var(--border)]">
        <p className="text-lg font-extralight tracking-wider">
          {formattedEmail}
        </p>
        <ChevronDown size={23} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-[1px] border-[var(--border)] bg-[var(--border)] w-[200px]">
        <DropdownMenuItem className="flex justify-center">
          <Link href="/" className="flex gap-1 font-extralight tracking-wider">
            <p className="tracking-wider text-[var(--white)] ">Profile</p>
            <User color="var(--white)" fill="var(--white)" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex justify-center">
          <Link href="/" className="flex gap-1 font-extralight tracking-wider">
            <p className="tracking-wider text-[var(--white)]">Settings</p>
            <Settings color="var(--white)" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex justify-center">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownButton;

{
  /* <button className="flex items-center gap-3 justify-center">
      <p className="text-lg font-extralight tracking-wider">{formattedEmail}</p>
      <ChevronDown />
    </button> */
}
