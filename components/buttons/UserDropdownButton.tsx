import { ChevronDown } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "./SignOutButton";

const UserDropdownButton = ({
  formattedEmail,
}: {
  formattedEmail: Promise<string>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="h-[40px] w-[200px] flex items-stretch justify-center pt-2 gap-1 px-3 rounded-lg bg-[var(--accent-color)]
       hover:cursor-pointer hover:bg-[var(--secondary-accent-color)] ease-in-out duration-100"
      >
        <p className="text-xl text-[var(--primary-text)] tracking-wide">
          {formattedEmail}
        </p>
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-[1px] border-[var(--secondary-accent-color)] bg-[var(--accent-color)] w-[200px]">
        {/* <DropdownMenuItem className="flex justify-center hover:bg-[var(--secondary-text)] ease-in-out duration-100"> */}
        {/**TODO: Make profile page where users can see their stats, friends, pending invitations, etc.. */}
        {/* <Link href="/" className="flex gap-1 font-extralight tracking-wider">
            <p className="tracking-wider text-[var(--white)] font-extrabold">
              Profile
            </p>
            <User
              color="var(--white)"
              fill="var(--white)"
              className="font-extrabold"
            />
          </Link>
        </DropdownMenuItem> */}

        {/**TODO: Make settings page where users can change their icon, claim an account, change thir theme, etc.. */}
        {/* <DropdownMenuItem className="flex justify-center hover:bg-[var(--secondary-text)]"> */}
        {/* <Link href="/" className="flex gap-1 font-extralight tracking-wider">
            <p className="tracking-wider text-[var(--white)] font-extrabold">
              Settings
            </p>
            <Settings color="var(--white)" className="font-extrabold" />
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem className="flex justify-center hover:bg-[var(--secondary-text)]">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownButton;
