"use client";

import React, { useState } from "react";
import {
  ChartNoAxesColumnIncreasing,
  Home,
  LogOut,
  Menu,
  MessageSquareText,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions";
import Image from "next/image";

const NavbarBurgerButton = ({
  userEmail,
  userProfilePic,
  userName,
}: {
  userEmail: string;
  userProfilePic: string;
  userName: string;
}) => {
  const formaNavbarEmail = userEmail.substring(0, userEmail.indexOf("@"));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsMenuOpen((prev) => !prev)}>
        <Menu size={40} />
      </button>
      <div className={`offScreenMenu ${isMenuOpen ? "active" : ""}`}>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-full flex  justify-end"
        >
          <X />
        </button>
        <div className="flex flex-col justify-evenly w-full h-full text-2xl">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Link
              href="/"
              className="flex items-center gap-3"
              title="Home Page"
            >
              <Home size={24} />
              Home
            </Link>
          </button>
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Link
              href="/messages"
              className="flex items-center gap-3"
              title="Messages"
            >
              <MessageSquareText size={24} />
              Messages
            </Link>
          </button>
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Link
              href="/leaderboards"
              className="flex items-center gap-3"
              title="Leaderboards"
            >
              <ChartNoAxesColumnIncreasing size={24} />
              Leaderboards
            </Link>
          </button>
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Link
              href="/player-stats"
              className="flex items-center gap-3"
              title="Player Stats"
            >
              <Search size={24} />
              Player Stats
            </Link>
          </button>
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Link href="/news" className="flex items-center gap-3" title="News">
              <Newspaper size={24} />
              News
            </Link>
          </button>
        </div>

        {userEmail !== "" ? (
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-3">
              <Image
                src={userProfilePic}
                width={30}
                height={30}
                className="rounded-lg object-cover"
                alt={`${userEmail} Profile Picture`}
              />
              <div className="flex flex-col justify-start">
                <p className="text-md text-[var(--primary-text)] tracking-wide">
                  {"@" + formaNavbarEmail}
                </p>
                <p className="text-sm text-[var(--secondary-text)]">
                  {userName}
                </p>
              </div>
            </div>
            <button onClick={() => logout()}>
              <LogOut />
            </button>
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
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarBurgerButton;
