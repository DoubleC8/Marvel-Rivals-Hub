import React from "react";
import Image from "next/image";
import { formatEmail } from "@/lib/actions/auth";
import Link from "next/link";
import UserDropdownButton from "../buttons/UserDropdownButton";

const TopNavbar = ({
  userEmail,
  userProfilePic,
}: {
  userEmail: string;
  userProfilePic: string;
}) => {
  const marevlRivalsIcon = "/images/marvel-rivals-icon-v2.webp";
  const defaultProfilePic = "/images/Default_pfp.png";

  return (
    <nav className="flex bg-[var(--black)] justify-between px-5 py-3 h-[70px] items-center">
      <div className="flex gap-3 text-[var(--white)]">
        <Link href="/">
          <Image
            src={marevlRivalsIcon}
            height={40}
            width={40}
            alt="Marvel Rivals Icon"
          />
        </Link>
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-5 rounded-xl"
          >
            Home
          </Link>
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-7 rounded-xl"
          >
            Messages
          </Link>
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-7 rounded-xl"
          >
            Find Teammates
          </Link>
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-7 rounded-xl"
          >
            Leaderboards
          </Link>
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-7 rounded-xl"
          >
            Look up Player Stats
          </Link>
          <Link
            href="/"
            className="font-extralight text-lg tracking-wider hover:bg-[var(--border)] py-1 px-7 rounded-xl"
          >
            News
          </Link>
        </div>
      </div>
      {userEmail !== "" ? (
        <div className="flex text-[var(--white)] items-center gap-3">
          <UserDropdownButton formattedEmail={formatEmail(userEmail)} />
          <Image
            src={userProfilePic}
            height={40}
            width={40}
            alt="User Profile Pic"
            className="rounded-full border-1px border-transparent hover:border-[1px] hover:border-[var(--yellow)]"
          />
        </div>
      ) : (
        <div className="flex gap-6 text-[var(--white)] items-center">
          <Link
            href="/login"
            className="text-lg font-extralight tracking-wider hover:text-[var(--yellow)] hover:cursor-pointer"
          >
            Sign in
          </Link>
          <p className="text-lg font-extralight tracking-wider">OR</p>
          <Link
            href="/login"
            className="text-lg font-extralight tracking-wider hover:text-[var(--yellow)] hover:cursor-pointer"
          >
            Sign Up
          </Link>
          <Image
            src={defaultProfilePic}
            height={40}
            width={40}
            alt="User Profile Pic"
            className="rounded-full"
          />
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
