"use client";

import { logout } from "@/lib/actions";
import { LogOut } from "lucide-react";
import React from "react";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => logout()}
      className="flex gap-1 font-extralight tracking-wider"
    >
      <p className="tracking-wider text-[var(--white)] font-extrabold">
        Sign Out
      </p>
      <LogOut color="var(--white)" className="font-extrabold" />
    </button>
  );
};
export default SignOutButton;
