import React from "react";
import Image from "next/image";

import Link from "next/link";
import UserDropdownButton from "../buttons/UserDropdownButton";
import { formatEmail } from "@/lib/actions";

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
    <nav className="topNavbar-web">
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
          <Link href="/" className="navbarLink">
            Home
          </Link>
          <Link href="/" className="navbarLink">
            Messages
          </Link>
          <Link href="/find-teammates" className="navbarLink">
            Find Teammates
          </Link>
          <Link href="/leaderboards" className="navbarLink">
            Leaderboards
          </Link>
          <Link href="/player-stats" className="navbarLink">
            Player Stats
          </Link>
          <Link href="/news" className="navbarLink">
            News
          </Link>
        </div>
      </div>
      {userEmail !== "" ? (
        <div
          className="flex text-[var(--white)] items-center gap-5"
          style={{ fontFamily: "var(--marvelFont)" }}
        >
          <UserDropdownButton formattedEmail={formatEmail(userEmail)} />
          <Image
            src={userProfilePic}
            height={40}
            width={40}
            alt={`${userEmail} Profile Pic`}
            className="profile-pic"
          />
        </div>
      ) : (
        <div className="flex gap-2 text-[var(--white)] items-center">
          <Link href="/login" className="navbarLink">
            Sign in
          </Link>
          <p className="text-lg font-extralight tracking-wider">OR</p>
          <Link href="/login" className="navbarLink">
            Sign Up
          </Link>
          <Image
            src={defaultProfilePic}
            height={40}
            width={40}
            alt="Default Profile Pic"
            className="profile-pic"
          />
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
