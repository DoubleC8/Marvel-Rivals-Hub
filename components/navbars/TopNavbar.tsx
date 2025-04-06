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
    <nav className="topNavbar">
      <div className="flex items-center gap-5">
        <Link href="/" title="Home Page">
          <Image
            src={marevlRivalsIcon}
            height={40}
            width={40}
            alt="Marvel Rivals Icon"
          />
        </Link>
        <div className="flex gap-5">
          <Link href="/" className="navbarLink" title="Home Page">
            Home
          </Link>
          <Link href="/messages" className="navbarLink" title="Messages">
            Messages
          </Link>
          <Link
            href="/find-teammates"
            className="navbarLink"
            title="Find Teammates"
          >
            Find Teammates
          </Link>
          <Link
            href="/leaderboards"
            className="navbarLink"
            title="Leaderboards"
          >
            Leaderboards
          </Link>
          <Link
            href="/player-stats"
            className="navbarLink"
            title="Player Stats"
          >
            Player Stats
          </Link>
          <Link href="/news" className="navbarLink" title="News">
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
          <Link href={`/`} title="Go to Profile Page">
            <Image
              src={userProfilePic}
              height={40}
              width={40}
              alt={`${userEmail} Profile Pic`}
              className="rounded-xl"
            />
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-baseline gap-5">
            <Link href="/login" className="navbarLink" title="Sign in">
              Sign in
            </Link>
            <p
              className="text-xl tracking-wide"
              style={{ fontFamily: "var(--marvelFont)" }}
            >
              OR
            </p>
            <Link href="/login" className="navbarLink" title="Sign up">
              Sign Up
            </Link>
          </div>
          <Image
            src={defaultProfilePic}
            height={40}
            width={40}
            alt="Default Profile Pic"
            className="rounded-lg hover:cursor-pointer"
          />
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
